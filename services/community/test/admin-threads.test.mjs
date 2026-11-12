import {test} from 'node:test';
import assert from 'node:assert/strict';
import {fixture,posts} from './helpers.mjs';

async function setup(t) {
  const f=await fixture();t.after(f.cleanup);
  for(const post of posts.slice(1))assert.equal((await f.call('/api/public/comments?post='+post.path)).status,200);
  const auth=await f.login();let sequence=0;
  function insert({post=posts[1].path,parent=null,depth=0,status='approved',updated=f.now(),isAdmin=false,body='متن آزمایشی گفتگو'}={}) {
    const row=f.app.store.run('INSERT INTO comments(post,parent,depth,author,body,status,created,updated,ip_hash,ip,request_key,payload_hash,is_admin) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)',post,parent,depth,isAdmin?'مدیر':'خواننده',body,status,updated,updated,'private-ip-hash','private-encrypted-ip','request-'+(++sequence),'private-payload-hash',Number(isAdmin));
    return Number(row.lastInsertRowid);
  }
  const list=async(query='')=>f.call('/api/admin/comments'+query,{cookie:auth.cookie});
  return {f,auth,insert,list};
}

test('a matching reply returns its complete thread once, with mixed statuses and no private fields',async t=>{
  const {insert,list}=await setup(t);
  const root=insert(),pending=insert({parent:root,depth:1,status:'pending'}),admin=insert({parent:pending,depth:2,isAdmin:true});
  const sibling=insert({parent:root,depth:1,status:'deleted'}),leaf=insert({parent:admin,depth:3,status:'rejected'});
  const unrelated=insert();
  const response=await list('?status=pending');assert.equal(response.status,200);
  assert.equal(response.data.threads.length,1);const thread=response.data.threads[0];
  assert.equal(thread.id,root);assert.equal(thread.count,5);assert.equal(thread.title,posts[1].title);
  assert.deepEqual(thread.comments.map(c=>c.id),[root,pending,admin,leaf,sibling]);
  assert.equal(thread.comments.find(c=>c.id===admin).is_admin,1);
  for(const comment of thread.comments)for(const field of ['ip','ip_hash','request_key','payload_hash'])assert(!Object.hasOwn(comment,field));
  assert(!JSON.stringify(response.data).includes('private-'));
  const all=await list('?status=all');assert.equal(all.data.threads.length,2);
  assert(all.data.threads.some(thread=>thread.id===unrelated));
  const approved=await list('?status=approved');assert.equal(approved.data.threads.length,2);
  assert.equal(approved.data.threads.find(thread=>thread.id===root).comments.length,5);
  assert.equal((await list('?status=spam')).data.threads.length,0);
});

test('a new reply and moderation both move an older thread ahead of newer roots',async t=>{
  const {f,auth,insert,list}=await setup(t);
  const old=insert({updated:f.now()-2000}),newer=insert({updated:f.now()-1000});
  assert.deepEqual((await list('?status=all')).data.threads.map(t=>t.id),[newer,old]);
  f.advance(1000);
  const reply=await f.call(`/api/admin/comments/${old}/reply`,{admin:true,cookie:auth.cookie,csrf:auth.csrf,body:{body:'پاسخ تازهٔ مدیر'}});
  assert.equal(reply.status,200);
  const updated=(await list('?status=approved')).data.threads;
  assert.deepEqual(updated.map(t=>t.id),[old,newer]);assert.equal(updated[0].updated,f.now());
  assert.equal(updated[0].comments.at(-1).is_admin,1);
  f.advance(1000);
  assert.equal((await f.call(`/api/admin/comments/${newer}/moderate`,{admin:true,cookie:auth.cookie,csrf:auth.csrf,body:{status:'spam'}})).status,200);
  assert.deepEqual((await list('?status=all')).data.threads.map(t=>t.id),[newer,old]);
});

test('thread pagination is bounded, stable on tied times and never splits a 101-comment thread',async t=>{
  const {insert,list}=await setup(t);const roots=[];
  for(let n=0;n<21;n++)roots.push(insert());
  const full=roots.at(-1);for(let n=0;n<100;n++)insert({parent:full,depth:1,isAdmin:true});
  const visited=[];let cursor='',page=0;
  do {
    const response=await list('?status=all'+(cursor?'&cursor='+encodeURIComponent(cursor):''));assert.equal(response.status,200);
    const data=response.data;assert.equal(data.threads.length,page<2?10:1);
    if(page===0){assert.equal(data.threads[0].id,full);assert.equal(data.threads[0].comments.length,101);}
    visited.push(...data.threads.map(t=>t.id));cursor=data.nextCursor;page++;
  } while(cursor&&page<5);
  assert.equal(page,3);assert.deepEqual(visited,roots.reverse());assert.equal(new Set(visited).size,21);
});

test('post filters include child matches, retain archived context and validate the cursor',async t=>{
  const {f,insert,list}=await setup(t);
  const first=insert(),second=insert({post:posts[2].path});
  insert({parent:first,depth:1,status:'pending'});
  insert({post:posts[2].path,parent:second,depth:1,status:'pending'});
  f.app.store.run('UPDATE posts SET enabled=0 WHERE path=?',posts[2].path);
  const result=await list('?status=pending&post='+encodeURIComponent(posts[2].path));
  assert.equal(result.status,200);assert.deepEqual(result.data.threads.map(t=>t.id),[second]);assert.equal(result.data.threads[0].comments.length,2);
  for(const value of ['NaN','123','not!base64','x'.repeat(101),Buffer.from('[0,0]').toString('base64url'),Buffer.from('[1.5,1]').toString('base64url'),Buffer.from('[1,1,1]').toString('base64url')])assert.equal((await list('?cursor='+encodeURIComponent(value))).status,400);
  assert.equal((await list('?status=unknown')).status,400);
});
