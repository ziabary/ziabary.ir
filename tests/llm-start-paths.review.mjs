import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {call,pause,events,socket} from '../scripts/browser-session.mjs';
const out='docs/reviews/local-2026-09-16/llm-start-paths';
async function E(expression){const r=await call('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value}
async function wait(expression){for(let i=0;i<100;i++){if(await E(expression))return;await pause(100)}throw Error(expression)}
async function nav(){await call('Page.navigate',{url:'http://127.0.0.1:4189/guides/llm/?show-drafts=true'});await wait("document.querySelectorAll('.desktop-paths .article-path').length===4");await E('document.fonts.ready');await pause(300)}
async function shot(name){const r=await call('Page.captureScreenshot',{format:'png'});await fs.writeFile(out+'/'+name+'.png',Buffer.from(r.data,'base64'))}
try {
 await fs.mkdir(out,{recursive:true});await call('Page.enable');await call('Runtime.enable');
 await call('Emulation.setDeviceMetricsOverride',{width:1920,height:1080,deviceScaleFactor:1,mobile:false});
 await nav();
 await E("document.querySelector('.guide-overview').scrollIntoView({behavior:'instant',block:'start'})");await shot('desktop');
 for(let i=0;i<4;i++){
  const target=await E(`document.querySelectorAll('.desktop-paths .article-path')[${i}].getAttribute('href')`);
  await E(`document.querySelectorAll('.desktop-paths .article-path')[${i}].click()`);
  await wait(`document.querySelector(${JSON.stringify(target+' details')}).open`);
  assert.ok(await E("location.search.includes('show-drafts=true')"));
 }
 await call('Emulation.setDeviceMetricsOverride',{width:390,height:1000,deviceScaleFactor:1,mobile:true});
 await nav();await E("document.querySelector('.mobile-paths').open=true;document.querySelector('#start').scrollIntoView({behavior:'instant',block:'start'})");await shot('mobile');
 assert.ok(await E("document.documentElement.scrollWidth<=390"));
 await E("document.querySelector('.mobile-paths .article-path').click()");
 await wait("document.querySelector('#right-model-size-for-the-task details').open");
 assert.deepEqual(events.filter(e=>e.method==='Runtime.exceptionThrown'),[]);
 console.log('Four article paths open matching notes; preview flag retained; mobile fits and opens article; no runtime errors.');
}finally{await call('Page.close').catch(()=>{});socket.end()}
