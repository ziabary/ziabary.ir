import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {access} from 'node:fs/promises';
import {createPageRegistry, pageMetadata} from '../src/pages.mjs';
import {fixture, pageHtml} from './helpers.mjs';

const post={path:'/articles/new/',title:'Fresh & published',locale:'en',commentable:true};
const response=html=>new Response(html,{headers:{'Content-Type':'text/html; charset=utf-8'}});

test('new publications, title changes and withdrawal work over HTTP without build files or restart',async t=>{
  const pages=new Map();let reads=0;
  const website=createServer((request,res)=>{reads++;const html=pages.get(request.url);res.writeHead(html?200:404,{'Content-Type':'text/html'});res.end(html||'Not found');});
  await new Promise(resolve=>website.listen(0,'127.0.0.1',resolve));
  t.after(()=>new Promise(resolve=>website.close(resolve)));
  const origin='http://127.0.0.1:'+website.address().port;
  const f=await fixture({fetchPage:fetch,config:{origins:[origin],siteOrigin:origin}});t.after(f.cleanup);
  assert.equal((await f.call('/health')).status,200);assert.equal(reads,0);
  assert.equal(f.app.store.get('SELECT count(*) AS n FROM posts').n,0);
  await assert.rejects(access(f.dir+'/posts.json'));
  pages.set(post.path,pageHtml(post));
  assert.equal((await f.call('/api/public/comments?post='+post.path)).status,200);
  assert.equal(reads,1);
  assert.equal((await f.call('/api/public/comments',{body:f.comment({post:post.path})})).status,202);
  const auth=await f.login();
  assert.equal((await f.call('/api/admin/comments/1/moderate',{admin:true,cookie:auth.cookie,csrf:auth.csrf,body:{status:'approved'}})).status,200);
  const ticket=await f.call('/api/public/visit-ticket',{body:{post:post.path}});f.advance(1700);
  assert.equal((await f.call('/api/public/visits',{body:{post:post.path,ticket:ticket.data.ticket,fingerprint:'a'.repeat(64)}})).data.counted,true);
  assert.equal(reads,1);
  pages.set(post.path,pageHtml({...post,title:'Updated title'}));f.advance(60001);
  assert.equal((await f.call('/api/public/comments?post='+post.path)).data.comments.length,1);
  assert.equal(f.app.store.get('SELECT title FROM posts WHERE path=?',post.path).title,'Updated title');
  pages.set(post.path,pageHtml(post).replace('</head>','<meta content="noindex, follow" name="robots"></head>'));f.advance(60001);
  assert.equal((await f.call('/api/public/comments?post='+post.path)).status,404);
  assert.equal((await f.call('/api/public/comments',{body:f.comment({post:post.path})})).status,404);
  const stats=await f.call('/api/admin/stats',{cookie:auth.cookie});
  assert.equal(stats.data.lifetime.views,1);assert.equal(stats.data.posts[0].enabled,0);
  assert.equal(f.app.store.get('SELECT count(*) AS n FROM comments').n,1);
  pages.set(post.path,pageHtml(post));f.advance(10001);
  const restored=await f.call('/api/public/comments?post='+post.path);
  assert.equal(restored.status,200);assert.equal(restored.data.views,1);assert.equal(restored.data.comments.length,1);
  const second={...post,path:'/es/articles/second/',title:'Otra publicación'};pages.set(second.path,pageHtml(second));
  assert.equal((await f.call('/api/public/comments?post='+second.path)).status,200);
  assert.equal(f.app.store.get('SELECT locale FROM posts WHERE path=?',second.path).locale,'es');
});

test('publication checks reject noindex, noncanonical pages and fake markers in comments or scripts',()=>{
  assert.deepEqual(pageMetadata(pageHtml(post),post.path),{...post,locale:'fa'});
  for(const meta of ['<meta name="robots" content="noindex,follow">',"<META CONTENT='none' NAME='Googlebot'>"]){
    assert.throws(()=>pageMetadata(pageHtml(post).replace('</head>',meta+'</head>'),post.path),{status:404});
  }
  assert.throws(()=>pageMetadata(pageHtml(post),post.path,new Headers({'X-Robots-Tag':'googlebot: noindex'})),{status:404});
  assert.throws(()=>pageMetadata(pageHtml(post).replace(post.path,'/different/'),post.path),{status:404});
  assert.throws(()=>pageMetadata(pageHtml(post).replace(/<link[^>]+>/,''),post.path),{status:404});
  const empty=pageHtml({...post,commentable:false});
  const marker=`<div data-community-slot data-post="${post.path}"></div>`;
  assert.equal(pageMetadata(empty.replace('</body>',`<!-- ${marker} --><script>${JSON.stringify(marker)}</script></body>`),post.path).commentable,false);
  assert.equal(pageMetadata(empty.replace('</head>','<script>const text="<meta name=robots content=noindex>";</script></head>'),post.path).commentable,false);
});

test('only fixed-origin canonical paths are fetched; private notes and redirects cannot register pages',async t=>{
  const requests=[];
  const f=await fixture({fetchPage:async(url,options)=>{requests.push({url:String(url),options});return new Response(null,{status:302,headers:{Location:'http://169.254.169.254/latest/meta-data/'}});}});t.after(f.cleanup);
  for(const path of ['https://attacker.test/','//attacker.test/','/articles/../','/%2e%2e/','/articles/new/?show-drafts=true','/articles/kazan-investment-reality/','/en/articles/kazan-investment-reality/']){
    const result=await f.call('/api/public/comments?post='+encodeURIComponent(path));assert.ok([400,404].includes(result.status));
  }
  assert.equal(requests.length,0);
  assert.equal((await f.call('/api/public/comments?post='+post.path)).status,503);
  assert.equal(requests[0].url,f.config.origins[0]+post.path);
  assert.equal(requests[0].options.redirect,'manual');
  assert.equal(f.app.store.get('SELECT count(*) AS n FROM posts').n,0);
});

test('indexable non-article pages can collect visits but cannot accept comments',async t=>{
  const f=await fixture();t.after(f.cleanup);
  assert.equal((await f.call('/api/public/visit-ticket',{body:{post:'/'}})).status,200);
  assert.equal((await f.call('/api/public/comments?post=/')).status,404);
  f.pages.set(post.path,pageHtml({...post,commentable:false}));
  assert.equal((await f.call('/api/public/visit-ticket',{body:{post:post.path}})).status,200);
  assert.equal((await f.call('/api/public/comments',{body:f.comment({post:post.path})})).status,404);
});

test('verification coalesces requests and bounds concurrency, body sizes and negative caching',async()=>{
  let calls=0,release;const waiting=new Promise(resolve=>release=resolve),verified=[];let time=0;
  const registry=createPageRegistry({siteOrigin:'https://example.com',now:()=>time,onVerified:p=>verified.push(p),onMissing:()=>{},fetchPage:async url=>{calls++;await waiting;return response(pageHtml({...post,path:url.pathname}));}});
  const same=Array.from({length:10},()=>registry.resolve(post.path));
  const other=['/a/','/b/','/c/'].map(path=>registry.resolve(path));
  await assert.rejects(registry.resolve('/d/'),{status:503});assert.equal(calls,4);
  release();await Promise.all([...same,...other]);assert.equal(verified.length,4);
  await registry.resolve(post.path);assert.equal(calls,4);
  time=60001;await registry.resolve(post.path);assert.equal(calls,5);registry.close();
  for(const reply of [new Response('x',{headers:{'Content-Type':'application/json'}}),new Response('x',{headers:{'Content-Type':'text/html','Content-Length':String(4*1024*1024+1)}}),response('x'.repeat(4*1024*1024+1))]){
    let count=0;const r=createPageRegistry({siteOrigin:'https://example.com',onVerified:()=>assert.fail('oversized or invalid page registered'),onMissing:()=>{},fetchPage:async()=>{count++;return reply;}});
    await assert.rejects(r.resolve(post.path),{status:404});await assert.rejects(r.resolve(post.path),{status:404});assert.equal(count,1);r.close();
  }
});

test('transient website failures fail closed and recover without restarting the service',async t=>{
  let online=false;
  const f=await fixture({fetchPage:async()=>{if(!online)throw Error('website offline');return response(pageHtml(post));}});t.after(f.cleanup);
  assert.equal((await f.call('/health')).status,200);
  assert.equal((await f.call('/api/public/comments?post='+post.path)).status,503);
  online=true;f.advance(3001);
  assert.equal((await f.call('/api/public/comments?post='+post.path)).status,200);
});

test('CLI verification retains network causes while the public API exposes only its error code',async t=>{
  const network=new TypeError('fetch failed',{cause:Object.assign(new Error('DNS lookup failed'),{code:'ENOTFOUND'})});
  const registry=createPageRegistry({siteOrigin:'https://example.com',onVerified:()=>{},onMissing:()=>{},fetchPage:async()=>{throw network;}});
  await assert.rejects(registry.resolve(post.path),error=>error.status===503&&error.cause===network&&error.cause.cause.code==='ENOTFOUND');registry.close();
  const f=await fixture({fetchPage:async()=>{throw network;}});t.after(f.cleanup);
  const response=await f.call('/api/public/comments?post='+post.path);assert.equal(response.status,503);
  assert.equal(response.data.error,'page_verification_unavailable');assert.deepEqual(Object.keys(response.data).sort(),['error','requestId']);assert(!JSON.stringify(response.data).includes('DNS'));
});

test('a slow website does not block health checks or other API requests',async t=>{
  let release,started;
  const fetching=new Promise(resolve=>started=resolve);
  const waiting=new Promise(resolve=>release=()=>resolve(response(pageHtml(post))));
  const f=await fixture({fetchPage:async()=>{started();return waiting;}});t.after(f.cleanup);
  const comments=f.call('/api/public/comments?post='+post.path);
  await fetching;
  try { assert.equal((await f.call('/health')).status,200); }
  finally { release(); }
  assert.equal((await comments).status,200);
});

test('website verification has a three-second deadline', {timeout:6000},async()=>{
  const registry=createPageRegistry({siteOrigin:'https://example.com',onVerified:()=>assert.fail('timeout registered'),onMissing:()=>assert.fail('timeout disabled history'),
    fetchPage:async(url,{signal})=>new Promise((resolve,reject)=>signal.addEventListener('abort',()=>reject(signal.reason),{once:true}))});
  await assert.rejects(registry.resolve(post.path),{status:503});registry.close();
});
