// Standalone browser review: node test/admin-threads.review.mjs (Chrome required).
// Uses a disposable service/database and its own Chrome profile; leaves preview services alone.
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {mkdtemp,mkdir,rm,writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {fixture,password,posts} from './helpers.mjs';
import {browserSession} from './cdp.mjs';

const origin='http://127.0.0.1:8789',port=9335;
const f=await fixture({port:8789,config:{origin,siteOrigin:'http://localhost:5173'}});
const profile=await mkdtemp(join(tmpdir(),'admin-threads-chrome-'));
const output=new URL('../test-results/',import.meta.url);await mkdir(output,{recursive:true});
const chrome=spawn(process.env.CHROME_BIN||'/usr/bin/google-chrome',['--headless=new','--no-sandbox','--disable-gpu','--no-first-run','--no-default-browser-check',`--remote-debugging-port=${port}`,`--user-data-dir=${profile}`],{stdio:'ignore'});
let browser;
try {
  await f.call('/api/public/comments?post='+posts[1].path);
  let sequence=0;
  const insert=(parent=null,depth=0,status='approved',admin=false,body='متن نمونه برای مرور گفتگوها')=>Number(f.app.store.run('INSERT INTO comments(post,parent,depth,author,body,status,created,updated,ip_hash,request_key,payload_hash,is_admin) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)',posts[1].path,parent,depth,admin?'مدیر':'خواننده',body,status,f.now(),f.now(),'hash','browser-'+(++sequence),'hash',Number(admin)).lastInsertRowid);
  const roots=Array.from({length:21},()=>insert());
  let parent=roots[0];for(let depth=1;depth<=4;depth++){f.advance(1000);parent=insert(parent,depth,'approved',true,'پاسخ مدیر در عمق '+depth);}
  f.advance(1000);const pending=insert(roots[0],1,'pending',false,'<script>window.threadXSS=true</script> متن پاسخ در انتظار بررسی');
  let ready=false;for(let n=0;n<100;n++){try{await fetch(`http://127.0.0.1:${port}/json/version`);ready=true;break;}catch{await new Promise(resolve=>setTimeout(resolve,100));}}
  assert(ready,'Chrome did not start');browser=await browserSession(port);
  const {call,evaluate:E,wait,pause}=browser;
  await call('Page.navigate',{url:origin+'/admin/'});await wait('!document.querySelector("#login-panel").hidden');
  await E(`document.querySelector('#username').value='admin';document.querySelector('#password').value=${JSON.stringify(password)};document.querySelector('#login').requestSubmit()`);
  await wait('document.querySelectorAll(".comment-thread").length===1');
  assert.equal(await E('document.querySelectorAll(".admin-comment").length'),6);
  assert.equal(await E('document.querySelectorAll(".admin-badge").length'),4);
  assert.equal(await E('document.querySelectorAll(".matches-filter").length'),1);
  assert.equal(await E('Boolean(window.threadXSS)||Boolean(document.querySelector(".comment-body script"))'),false);
  f.advance(1000);
  await E(`[...document.querySelector('[data-comment-id="${pending}"]').querySelectorAll('button')].find(b=>b.textContent==='تأیید و انتشار').click()`);
  await wait('document.querySelector("#comments-list").textContent.includes("گفت‌وگویی با این وضعیت")');
  await E(`document.querySelector('#status').value='all';document.querySelector('#status').dispatchEvent(new Event('change'))`);
  await wait('document.querySelectorAll(".comment-thread").length===10');
  assert.equal(await E('document.querySelector(".comment-thread").dataset.threadId'),String(roots[0]));
  await E(`document.querySelector('[data-comment-id="${roots[0]}"] summary').click();document.querySelector('#reply-${roots[0]}').value='پاسخ تازه برای آزمون نمایش یکپارچهٔ گفتگو'`);f.advance(1000);
  await E(`document.querySelector('#reply-${roots[0]}').closest('form').requestSubmit()`);
  await wait('document.querySelector(".comment-thread").querySelectorAll(".admin-comment").length===7');
  const changed=roots.at(-1);f.advance(1000);
  await E(`[...document.querySelector('[data-comment-id="${changed}"]').querySelectorAll('button')].find(b=>b.textContent==='رد نظر').click()`);
  await wait(`document.querySelector('.comment-thread').dataset.threadId==='${changed}'`);
  for(const count of [20,21]){await E('document.querySelector("#more-comments").click()');await wait(`document.querySelectorAll('.comment-thread').length===${count}`);}
  assert.equal(await E('new Set([...document.querySelectorAll(".comment-thread")].map(t=>t.dataset.threadId)).size'),21);
  assert.equal(await E('document.querySelector("#more-comments").hidden'),true);
  assert.equal(await E(`document.querySelector('[data-thread-id="${roots[0]}"]').querySelectorAll('.admin-comment').length`),7);
  for(const width of [1440,390])for(const theme of ['light','dark']){
    await call('Emulation.setDeviceMetricsOverride',{width,height:1100,deviceScaleFactor:1,mobile:width<700});
    await E(`document.documentElement.dataset.theme='${theme}';document.querySelector('[data-thread-id="${roots[0]}"]').scrollIntoView({block:'start',behavior:'instant'})`);await pause(100);
    assert((await E('document.documentElement.scrollWidth'))<=width);
    const indents=await E(`[...document.querySelector('[data-thread-id="${roots[0]}"]').querySelectorAll('.admin-comment')].map(card=>({id:Number(card.dataset.commentId),right:card.getBoundingClientRect().right,parent:card.parentElement.parentElement.parentElement.querySelector(':scope > .admin-comment')?.dataset.commentId}))`);
    assert(indents.filter(entry=>entry.parent).length>=4,'Nested replies must keep their DOM ancestry: '+JSON.stringify(indents));
    for(const entry of indents)if(entry.parent){const ancestor=indents.find(card=>card.id===Number(entry.parent));assert(ancestor&&entry.right<ancestor.right,'Replies must indent in RTL: '+JSON.stringify(indents));}
    const shot=await call('Page.captureScreenshot',{format:'png'});await writeFile(new URL(`admin-threads-${width}-${theme}.png`,output),Buffer.from(shot.data,'base64'));
  }
  assert.equal(browser.events.filter(e=>e.method==='Runtime.exceptionThrown').length,0);
  const report={status:'passed',completeThread:true,adminReplies:4,pendingContext:true,moderationAndReply:true,latestActivityOrder:true,pagination:[10,20,21],noDuplicateThreads:true,viewports:[1440,390],themes:['light','dark'],xssRenderedAsText:true};
  await writeFile(new URL('admin-threads.json',output),JSON.stringify(report,null,2));console.log(JSON.stringify(report));
} finally {
  if(browser){await browser.call('Browser.close').catch(()=>{});}
  chrome.kill();await f.cleanup();await rm(profile,{recursive:true,force:true,maxRetries:5,retryDelay:200});
}
