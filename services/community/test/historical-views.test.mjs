import {test} from 'node:test';
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {createServer} from 'node:http';
import {openStore} from '../src/store.mjs';
import {parseViewReport,verifyViewReport,applyViewReport,existingViewImport,existingVisitorReport} from '../src/historical-views.mjs';
import {fixture,posts,pageHtml} from './helpers.mjs';

const csv=(rows,dates=['20260801','20261108'])=>`\uFEFF# Fecha de inicio: ${dates[0]}\r\n# Fecha de finalización: ${dates[1]}\r\nRuta de página y clase de pantalla,Vistas,Usuarios activos\r\n${rows}\r\n`;

test('GA4 views use Vistas, combine trailing-slash variants, and ignore listings and other sections',()=>{
  const report=parseViewReport(csv('/articles/test/,12,2\r\n/articles/test,3,1\r\n/en/articles/test-en/,4,1\r\n/articles/,900,8\r\n/articles/page/2/,600,1\r\n/guides/llm/,999,2\r\n/es/articles/zero/,0,1'),3);
  assert.equal(report.start,'2026-08-01');assert.equal(report.end,'2026-11-08');assert.equal(report.ignored,3);
  assert.deepEqual(report.entries,[{path:'/articles/test/',views:45,visitors:9},{path:'/en/articles/test-en/',views:12,visitors:3},{path:'/es/articles/zero/',views:0,visitors:3}]);
  assert.equal(parseViewReport(csv('"/articles/test/",12,2,"two\nlines, with ""quotes"""').replace('Usuarios activos','Usuarios activos,Note'),3).entries[0].views,36);
  assert.equal(parseViewReport(csv('/articles/test,3,1\n/articles/test/,12,2\n/en/articles/test-en/,4,1\n/es/articles/zero/,0,1'),3).fingerprint,report.fingerprint);
});

test('malformed counts, dates, quoting, duplicate paths and unsafe multipliers fail before import',()=>{
  for(const rows of ['/articles/test/,-1,1','/articles/test/,1.5,1','/articles/test/,NaN,1','/articles/test/,9007199254740991,1','/articles/test/,1,1\n/articles/test/,2,1','"/articles/test/,1,1','/articles/test/,1','"/articles/test/"oops,1,1'])assert.throws(()=>parseViewReport(csv(rows),3));
  for(const multiplier of [undefined,0,-1,1.5,101])assert.throws(()=>parseViewReport(csv('/articles/test/,1,1'),multiplier));
  for(const dates of [['20260230','20261108'],['20261108','20260801']])assert.throws(()=>parseViewReport(csv('/articles/test/,1,1',dates),3));
});

test('only verified public articles import; private drafts never trigger a fetch and transient failures abort',async()=>{
  const requests=[];
  const report=parseViewReport(csv('/articles/test/,10,1\n/articles/kazan-investment-reality/,500,1\n/articles/missing/,9,1\n/articles/noindex/,8,1\n/articles/markerless/,7,1'),3);
  const verified=await verifyViewReport(report,{siteOrigin:'https://ziabary.ir',fetchPage:async url=>{
    requests.push(String(url));const path=url.pathname;
    if(path.includes('missing'))return new Response('',{status:404});
    let html=pageHtml({...posts[1],path,commentable:!path.includes('markerless')});
    if(path.includes('noindex'))html=html.replace('</head>','<meta name="robots" content="noindex"></head>');
    return new Response(html,{headers:{'Content-Type':'text/html'}});
  }});
  assert.equal(verified.entries.length,1);assert.equal(verified.views,30);assert.equal(verified.skipped.length,4);
  assert(!requests.some(url=>url.includes('kazan-investment-reality')));
  await assert.rejects(verifyViewReport(report,{siteOrigin:'https://ziabary.ir',fetchPage:async()=>new Response('',{status:503})}),/no counts imported/);
});

test('imports retry fresh requests after transient failures but do not retry redirects or forbidden pages',async()=>{
  const report=parseViewReport(csv('/articles/test/,10,1'),3),retry=[];let requests=0;
  const verified=await verifyViewReport(report,{siteOrigin:'https://ziabary.ir',onRetry:event=>retry.push(event),fetchPage:async()=>{
    requests++;if(requests===1)throw Object.assign(new Error('connection reset'),{code:'ECONNRESET'});
    if(requests===2)return new Response('',{status:503});
    return new Response(pageHtml(posts[1]),{headers:{'Content-Type':'text/html'}});
  }});
  assert.equal(requests,3);assert.equal(verified.views,30);assert.deepEqual(retry.map(event=>event.attempt),[2,3]);
  for(const status of [301,403]){
    let count=0;await assert.rejects(verifyViewReport(report,{siteOrigin:'https://ziabary.ir',fetchPage:async()=>{count++;return new Response('',{status});}}),/no counts imported/);assert.equal(count,1);
  }
});

test('an import timeout gets a fresh deadline on retry and a permanent failure remains atomic',async()=>{
  const report=parseViewReport(csv('/articles/test/,10,1'),3);let requests=0;
  const verified=await verifyViewReport(report,{siteOrigin:'https://ziabary.ir',timeoutMs:30,retries:1,fetchPage:async(_url,{signal})=>{
    requests++;if(requests===1)return new Promise((_resolve,reject)=>signal.addEventListener('abort',()=>reject(signal.reason),{once:true}));
    return new Response(pageHtml(posts[1]),{headers:{'Content-Type':'text/html'}});
  }});
  assert.equal(requests,2);assert.equal(verified.entries.length,1);
  requests=0;await assert.rejects(verifyViewReport(report,{siteOrigin:'https://ziabary.ir',fetchPage:async()=>{requests++;return new Response('',{status:503});}}),/no counts imported/);assert.equal(requests,3);
});

test('baseline adds to live totals exactly once, survives reopening, and never fabricates visitor details',async t=>{
  const f=await fixture();t.after(f.cleanup);
  const visit=async fingerprint=>{
    const ticket=await f.call('/api/public/visit-ticket',{body:{post:posts[1].path}});f.advance(1700);
    assert.equal((await f.call('/api/public/visits',{body:{post:posts[1].path,ticket:ticket.data.ticket,fingerprint}})).data.counted,true);
  };
  await visit('a'.repeat(64));
  assert.equal((await f.call('/api/public/comments',{body:f.comment()})).status,202);
  const auth=await f.login();
  const parsed=parseViewReport(csv('/articles/test/,12,2\n/en/articles/test-en/,3,1'),3);
  const verified=await verifyViewReport(parsed,{siteOrigin:f.config.origins[0],fetchPage:f.fetchPage});
  const secondConnection=openStore(f.config.database);t.after(()=>secondConnection.close());
  assert.deepEqual(applyViewReport(secondConnection,verified,f.now()),{applied:true,viewsAlreadyImported:false,posts:2,views:45,visitorEstimates:9});
  await visit('b'.repeat(64));
  assert.deepEqual(applyViewReport(f.app.store,verified,f.now()),{applied:false,posts:2,views:45,visitorEstimates:9});
  assert.equal((await f.call('/api/public/comments?post='+posts[1].path)).data.views,38);
  const stats=await f.call('/api/admin/stats',{cookie:auth.cookie});
  assert.equal(stats.status,200);assert.equal(stats.data.lifetime.views,47);assert.equal(stats.data.lifetime.historicalViews,45);
  assert.equal(stats.data.summary.views,2);assert.equal(stats.data.lifetime.visitors,2);assert.equal(stats.data.lifetime.pending,1);
  assert.equal(stats.data.daily.reduce((n,row)=>n+row.views,0),2);
  assert.equal(stats.data.posts.find(p=>p.path===posts[1].path).historicalViews,36);assert.equal(stats.data.posts.find(p=>p.path===posts[1].path).historicalVisitors,6);assert.equal(stats.data.posts.find(p=>p.path===posts[1].path).visitors,8);assert.equal((await f.call('/api/public/comments?post='+posts[1].path)).data.visitors,8);
  assert.equal(f.app.store.get('SELECT count(*) AS n FROM audit WHERE action=?','import_historical_views').n,1);
  assert.equal(f.app.store.get('SELECT count(*) AS n FROM visits').n,2);
  assert.throws(()=>existingViewImport(f.app.store,parseViewReport(csv('/articles/test/,13,1'),3)),/different counts/);
  assert.throws(()=>existingViewImport(f.app.store,parseViewReport(csv('/articles/test/,12,1'),2)),/different counts/);
  assert.throws(()=>existingViewImport(f.app.store,parseViewReport(csv('/articles/test/,1,1',['20261101','20261130']),3)),/overlap/);
});

test('a failed import rolls back the baseline, ledger, totals and audit together',async t=>{
  const f=await fixture();t.after(f.cleanup);
  const parsed=parseViewReport(csv('/articles/test/,12,2\n/en/articles/test-en/,3,1'),3);
  const verified=await verifyViewReport(parsed,{siteOrigin:f.config.origins[0],fetchPage:f.fetchPage});
  // Fail after the first post has been processed to exercise transaction rollback.
  verified.entries[1].title=null;
  assert.throws(()=>applyViewReport(f.app.store,verified));
  for(const table of ['posts','historical_views','historical_imports','audit'])assert.equal(f.app.store.get(`SELECT count(*) AS n FROM ${table}`).n,0);
});

test('CLI streams CSV into the container workflow; preview is read-only and retry needs no website',async t=>{
  const f=await fixture();t.after(f.cleanup);
  let requests=0;
  const site=createServer((request,response)=>{
    requests++;if(requests===1){response.writeHead(503);response.end();return;}
    const send=()=>{response.writeHead(200,{'Content-Type':'text/html'});response.end(pageHtml(posts[1]));};
    // A cold CDN page can exceed the public widget's three-second budget.
    if(requests===2)setTimeout(send,3200);else send();
  });
  await new Promise(resolve=>site.listen(0,'127.0.0.1',resolve));
  t.after(()=>new Promise(resolve=>site.close(resolve)));
  const run=args=>new Promise((resolve,reject)=>{
    const child=spawn(process.execPath,['tools/import-views.mjs','-','--multiplier','3',...args],{env:{...process.env,DATABASE_FILE:f.config.database,SITE_URL:'http://127.0.0.1:'+site.address().port}});
    let stdout='',stderr='';child.stdout.on('data',chunk=>stdout+=chunk);child.stderr.on('data',chunk=>stderr+=chunk);
    child.on('error',reject);child.on('close',code=>code===0?resolve(JSON.parse(stdout)):reject(Error(stderr)));
    child.stdin.end(csv('/articles/test/,12,2'));
  });
  const preview=await run([]);assert.equal(preview.applied,false);assert.equal(preview.views,36);assert.equal(preview.visitorEstimates,6);assert.equal(requests,2);
  assert.equal(f.app.store.get('SELECT count(*) AS n FROM posts').n,0);
  assert.equal((await run(['--apply'])).applied,true);
  site.removeAllListeners('request');site.on('request',(_request,response)=>{response.writeHead(503);response.end();});
  const retry=await run(['--apply']);assert.equal(retry.alreadyImported,true);
  assert.equal(f.app.store.get('SELECT views FROM posts').views,36);
});

test('legacy view-only imports gain tripled active users once without changing views or fabricating identities',async t=>{
  const f=await fixture();t.after(f.cleanup);
  const csvText=csv('/articles/test/,12,5\n/en/articles/test-en/,3,2\n/articles/missing/,1,1');
  const parsed=parseViewReport(csvText,3);
  // Reproduce the previous import format, which fingerprinted only view counts.
  const {createHash}=await import('node:crypto');
  const legacyFingerprint=createHash('sha256').update(JSON.stringify({start:parsed.start,end:parsed.end,multiplier:3,entries:parsed.entries.map(({path,views})=>({path,views}))})).digest('hex');
  assert.equal(parsed.fingerprint,legacyFingerprint);
  f.app.store.run('INSERT INTO historical_imports VALUES(?,?,?,?,?,?,?,?)',parsed.id,legacyFingerprint,parsed.start,parsed.end,3,f.now(),2,45);
  for(const [post,views] of [[posts[1],36],[posts[2],9]]){
    f.app.store.run('INSERT INTO posts(path,title,locale,views) VALUES(?,?,?,?)',post.path,post.title,post.locale,views);
    f.app.store.run('INSERT INTO historical_views VALUES(?,?,?)',parsed.id,post.path,views);
  }
  const prepared=existingVisitorReport(f.app.store,parsed);assert.equal(prepared.entries.length,2);assert.equal(prepared.visitorEstimates,21);
  assert.equal(existingViewImport(f.app.store,parsed).visitorsImported,false);
  assert.equal(applyViewReport(f.app.store,prepared,f.now()).viewsAlreadyImported,true);
  assert.equal((await f.call('/api/public/comments?post='+posts[1].path)).data.visitors,15);
  assert.equal((await f.call('/api/public/comments?post='+posts[2].path)).data.visitors,6);
  assert.equal(f.app.store.get('SELECT sum(views) AS n FROM posts').n,45);
  assert.equal(f.app.store.get('SELECT count(*) AS n FROM posts').n,2);
  for(const table of ['visitors','post_visitors','visits','analytics_daily'])assert.equal(f.app.store.get(`SELECT count(*) AS n FROM ${table}`).n,0);
  assert.equal(applyViewReport(f.app.store,prepared,f.now()).applied,false);
  assert.equal(f.app.store.get('SELECT sum(visitors) AS n FROM historical_visitors').n,21);
  assert.throws(()=>existingViewImport(f.app.store,parseViewReport(csvText.replace('12,5','12,6'),3)),/different visitor counts/);
});

test('invalid active-user values fail and visitor-enrichment failure rolls back without touching views',async t=>{
  for(const value of ['-1','1.5','NaN','9007199254740991'])assert.throws(()=>parseViewReport(csv('/articles/test/,12,'+value),3));
  const f=await fixture();t.after(f.cleanup);
  const report=await verifyViewReport(parseViewReport(csv('/articles/test/,12,5'),3),{siteOrigin:f.config.origins[0],fetchPage:f.fetchPage});
  applyViewReport(f.app.store,report,f.now());
  f.app.store.run('DELETE FROM historical_visitors');f.app.store.run('DELETE FROM historical_visitor_imports');
  const audit=f.app.store.get('SELECT count(*) AS n FROM audit').n;
  f.app.store.db.exec("CREATE TRIGGER fail_visitors BEFORE INSERT ON historical_visitors BEGIN SELECT RAISE(ABORT,'test rollback'); END");
  assert.throws(()=>applyViewReport(f.app.store,report,f.now()));
  assert.equal(f.app.store.get('SELECT views FROM posts').views,36);assert.equal(f.app.store.get('SELECT count(*) AS n FROM historical_visitor_imports').n,0);assert.equal(f.app.store.get('SELECT count(*) AS n FROM audit').n,audit);
});
