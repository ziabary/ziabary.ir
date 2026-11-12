import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createAnalytics,analyticsDay} from '../src/analytics.mjs';
import {openStore} from '../src/store.mjs';
import {fixture,posts} from './helpers.mjs';
import {trustedNetworks} from '../src/security.mjs';

async function visitsFixture(t,config={}) {
  const f=await fixture({config:{trusted:trustedNetworks(['127.0.0.0/8']),...config}});t.after(f.cleanup);
  async function visit(post,fingerprint='a',ip='203.0.113.1',extra={}) {
    const headers={'X-Forwarded-For':ip};
    const ticket=await f.call('/api/public/visit-ticket',{body:{post},headers});assert.equal(ticket.status,200);f.advance(1700);
    return f.call('/api/public/visits',{headers,body:{post,fingerprint:fingerprint.repeat(64),ticket:ticket.data.ticket,language:'fa-IR',timezone:'Asia/Tehran',referrer:'https://example.org/path',...extra}});
  }
  const stats=async(query='')=>{const auth=await f.login();const response=await f.call('/api/admin/stats'+query,{cookie:auth.cookie});assert.equal(response.status,200);return response.data;};
  return {f,visit,stats};
}

test('daily summaries deduplicate visitors across posts and days without summing daily uniques',async t=>{
  const {f,visit,stats}=await visitsFixture(t);
  assert.equal((await visit(posts[1].path)).data.counted,true);
  assert.equal((await visit(posts[1].path)).data.counted,false);
  f.advance(1800001);assert.equal((await visit(posts[1].path)).data.counted,true);
  assert.equal((await visit(posts[2].path)).data.counted,true);
  assert.equal((await visit(posts[1].path,'b','203.0.113.2',{language:'en-US'})).data.counted,true);
  f.advance(86400000);
  assert.equal((await visit(posts[1].path)).data.counted,true);
  assert.equal((await visit(posts[2].path,'b','203.0.113.2')).data.counted,true);
  const result=await stats('?days=2');
  assert.deepEqual(result.summary,{views:6,visitors:2,ips:2});
  assert.deepEqual(result.daily.map(day=>({views:day.views,visitors:day.visitors})),[{views:4,visitors:2},{views:2,visitors:2}]);
  assert.equal(result.posts.find(p=>p.path===posts[1].path).periodViews,4);
  assert.equal(result.browsers[0].count,6);assert.equal(result.systems[0].count,6);assert.equal(result.referrers[0].label,'https://example.org');
  assert.equal(result.languages.find(row=>row.label==='en-US').count,1);
  const selected=await stats('?days=2&post='+posts[1].path);assert.deepEqual(selected.summary,{views:4,visitors:2,ips:2});
  const oneDay=await stats('?days=1');assert.deepEqual(oneDay.summary,{views:2,visitors:2,ips:2});
  assert.equal(oneDay.firstDay,oneDay.lastDay);
});

test('dashboard and breakdowns use only summaries, even when the raw visit table is unavailable',async t=>{
  const {f,visit,stats}=await visitsFixture(t);await visit(posts[1].path);
  const expected=await stats();
  f.app.store.db.exec('DROP TABLE visits');
  const actual=await stats();assert.deepEqual(actual,expected);
  const plan=f.app.store.all("EXPLAIN QUERY PLAN SELECT day,views,visitors FROM analytics_daily WHERE scope=? AND day>=? AND day<=? ORDER BY day",'',actual.firstDay,actual.lastDay);
  assert(plan.some(row=>/SEARCH.*PRIMARY KEY/.test(row.detail)));
});

test('summaries outlive raw retention and expire independently without changing lifetime counters',async t=>{
  const {f,visit,stats}=await visitsFixture(t,{retentionDays:1,analyticsRetentionDays:1095});await visit(posts[1].path);
  const oldDay=analyticsDay(f.now());
  f.advance(91*86400000);f.app.analytics.maintain(f.now());f.app.store.prune(f.now(),1);
  assert.equal(f.app.store.get('SELECT count(*) AS n FROM visits').n,0);
  assert.equal(f.app.store.get('SELECT count(*) AS n FROM analytics_day_identities').n,0);
  const result=await stats('?days=365');assert.equal(result.detailsRetentionDays,1);assert.equal(result.retentionDays,1095);
  assert.deepEqual(result.summary,{views:1,visitors:1,ips:1});assert.equal(result.daily.find(row=>row.day===oldDay).views,1);
  assert.equal(result.browsers[0].count,1);assert.equal(result.posts.find(p=>p.path===posts[1].path).periodViews,1);
  assert.equal(result.daily.length,365);assert.equal(result.daily.filter(row=>row.views===0).length,364);
  f.advance(1100*86400000);assert.equal(f.app.analytics.maintain(f.now()),true);assert.equal(f.app.analytics.maintain(f.now()),false);
  const expired=await stats('?days=3650');assert.equal(expired.days,1095);assert.deepEqual(expired.summary,{views:0,visitors:0,ips:0});assert.equal(expired.lifetime.views,1);
  assert.equal(f.app.store.get('SELECT count(*) AS n FROM analytics_dimensions').n,0);
  assert.equal(f.app.store.get('SELECT count(*) AS n FROM analytics_identities').n,0);
});

test('Tehran midnight rolls daily uniqueness forward and restart preserves today deduplication',async t=>{
  const {f,visit,stats}=await visitsFixture(t);
  assert.equal(analyticsDay(Date.UTC(2026,10,8,20,29,59)),'2026-11-08');
  assert.equal(analyticsDay(Date.UTC(2026,10,8,20,30,0)),'2026-11-09');
  f.setTime(Date.UTC(2026,10,8,20,29,55));await visit(posts[1].path);
  f.advance(10000);await visit(posts[1].path);
  f.app.analytics.maintain(f.now());
  const reopened=createAnalytics(f.app.store,{now:f.now});
  f.advance(1800001);await visit(posts[1].path);
  const result=await stats('?days=2');assert.deepEqual(result.daily.map(row=>row.views),[1,2]);assert.deepEqual(result.daily.map(row=>row.visitors),[1,1]);assert.equal(result.summary.visitors,1);
  assert.equal(reopened.maintain(f.now()),false);
  assert(f.app.store.all('SELECT DISTINCT day FROM analytics_day_identities').every(row=>row.day==='2026-11-09'));
});

test('legacy migration runs once, preserves expired-day totals and leaves unavailable unique counts unknown',()=>{
  const store=openStore(':memory:');
  try{
    for(const post of posts.slice(1))store.run('INSERT INTO posts(path,title,locale,views) VALUES(?,?,?,1000)',post.path,post.title,post.locale);
    store.db.exec('CREATE TABLE daily(post TEXT,day TEXT,views INTEGER,PRIMARY KEY(post,day))');
    for(const [post,day,views] of [[posts[1].path,'2026-01-01',10],[posts[1].path,'2026-11-07',6],[posts[1].path,'2026-11-08',1],[posts[2].path,'2026-11-08',1]])store.run('INSERT INTO daily VALUES(?,?,?)',post,day,views);
    let id=0;const raw=(post,day)=>store.run('INSERT INTO visits(post,visitor,ip_hash,ip,created,day,browser,os,language,timezone,screen,referrer,window) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)',post,'visitor-a','ip-a','encrypted',++id,day,'Chrome','Linux','fa-IR','Asia/Tehran','1000x800','',id);
    for(let n=0;n<4;n++)raw(posts[1].path,'2026-11-07');raw(posts[1].path,'2026-11-08');raw(posts[2].path,'2026-11-08');
    const now=()=>Date.UTC(2026,10,8,10),analytics=createAnalytics(store,{now});
    assert.equal(store.get("SELECT name FROM sqlite_master WHERE name='daily'"),undefined);
    const full=analytics.stats({timestamp:now(),days:365});assert.equal(full.summary.views,18);assert.equal(full.summary.visitors,null);assert.equal(full.summary.ips,null);assert.equal(full.breakdownsComplete,false);
    const today=analytics.stats({timestamp:now(),days:1});assert.deepEqual(today.summary,{views:2,visitors:1,ips:1});assert.equal(today.breakdownsComplete,true);
    const before=JSON.stringify(analytics.stats({timestamp:now(),days:365}));createAnalytics(store,{now});assert.equal(JSON.stringify(analytics.stats({timestamp:now(),days:365})),before);
    store.transaction(()=>analytics.record({post:posts[1].path,day:'2026-11-08',visitor:'visitor-a',ipHash:'ip-a',browser:'Chrome',os:'Linux',language:'fa-IR',referrer:''}));
    assert.deepEqual(analytics.stats({timestamp:now(),days:1}).summary,{views:3,visitors:1,ips:1});
    assert.equal(store.get('SELECT sum(views) AS n FROM posts').n,2000);
  }finally{store.close();}
});

test('a summary write failure rolls back the raw visit, identities, total and spent ticket together',async t=>{
  const {f}=await visitsFixture(t);
  const issued=await f.call('/api/public/visit-ticket',{body:{post:posts[1].path}});f.advance(1700);
  f.app.store.db.exec("CREATE TRIGGER fail_summary BEFORE INSERT ON analytics_dimensions WHEN NEW.dimension='language' BEGIN SELECT RAISE(ABORT,'test rollback'); END");
  const body={post:posts[1].path,ticket:issued.data.ticket,fingerprint:'a'.repeat(64)};
  assert.equal((await f.call('/api/public/visits',{body})).status,500);
  for(const table of ['visits','visitors','post_visitors','analytics_daily','analytics_dimensions','analytics_identities','analytics_day_identities','spent_tokens'])assert.equal(f.app.store.get(`SELECT count(*) AS n FROM ${table}`).n,0);
  assert.equal(f.app.store.get('SELECT views FROM posts').views,0);
  f.app.store.db.exec('DROP TRIGGER fail_summary');assert.equal((await f.call('/api/public/visits',{body})).data.counted,true);
});
