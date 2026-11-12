import {test} from 'node:test';
import assert from 'node:assert/strict';
import {fixture,pageHtml} from './helpers.mjs';

test('all three editions count public pages while accepting comments only on published articles',async t=>{
 const catalog=[];
 for(const locale of ['fa','en','es']){
  const base=locale==='fa'?'':`/${locale}`;
  for(const suffix of ['/','/guides/','/guides/llm/','/media/','/resume/','/slides/','/articles/','/articles/page/2/','/articles/test/'])catalog.push({path:base+suffix,title:locale+' '+suffix,locale,commentable:suffix==='/articles/test/'});
 }
 const f=await fixture({config:{posts:catalog}});t.after(f.cleanup);
 for(let index=0;index<catalog.length;index++){
  const post=catalog[index];if(index&&index%12===0)f.advance(60001);
  const before=await f.call('/api/public/stats?post='+encodeURIComponent(post.path));assert.equal(before.status,200);assert.equal(before.data.views,0);
  const ticket=await f.call('/api/public/visit-ticket',{body:{post:post.path}});assert.equal(ticket.status,200);f.advance(1700);
  const visit=await f.call('/api/public/visits',{body:{post:post.path,ticket:ticket.data.ticket,fingerprint:'a'.repeat(64)}});assert.equal(visit.data.counted,true);
  const after=await f.call('/api/public/stats?post='+encodeURIComponent(post.path));assert.deepEqual(after.data,{views:1,visitors:1,observedVisitors:1,historicalVisitors:0});
  assert(!JSON.stringify(after.data).includes('ip'));assert(!Object.hasOwn(after.data,'comments'));
  assert.equal((await f.call('/api/public/comments?post='+encodeURIComponent(post.path))).status,post.commentable?200:404);
  assert.equal(f.app.store.get('SELECT locale FROM posts WHERE path=?',post.path).locale,post.locale);
 }
 const auth=await f.login();const stats=await f.call('/api/admin/stats',{cookie:auth.cookie});
 assert.equal(stats.data.lifetime.views,catalog.length);assert.equal(stats.data.lifetime.visitors,1);assert.equal(stats.data.summary.visitors,1);
 for(const post of catalog.filter(post=>!post.commentable)){
  f.advance(60001);assert.equal((await f.call('/api/public/comments',{body:f.comment({post:post.path})})).status,404);
 }
});

test('the public counter cannot register drafts, missing pages, aliases or noncanonical paths',async t=>{
 const f=await fixture();t.after(f.cleanup);
 const hidden={path:'/articles/unpublished/',title:'Hidden',locale:'fa',commentable:true};
 f.pages.set(hidden.path,pageHtml(hidden).replace('</head>','<meta name="robots" content="noindex"></head>'));
 for(const path of [hidden.path,'/articles/kazan-investment-reality/','/missing/','/guides/?view=1','https://attacker.example/']){
  const response=await f.call('/api/public/stats?post='+encodeURIComponent(path));assert([400,404].includes(response.status));
 }
 assert.equal(f.app.store.get('SELECT count(*) AS n FROM posts').n,0);
});
