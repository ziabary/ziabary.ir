import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {call,pause,events,socket} from '../scripts/browser-session.mjs';
const out='docs/reviews/local-2026-09-16/llm-editorial';
async function evaluate(expression){const r=await call('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value}
async function wait(expression){for(let i=0;i<100;i++){if(await evaluate(expression))return;await pause(100)}throw Error(expression)}
try{
 await fs.mkdir(out,{recursive:true});await call('Page.enable');await call('Runtime.enable');
 await call('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});
 await call('Page.navigate',{url:'http://127.0.0.1:4189/guides/llm/?show-drafts=true'});
 await wait("!!document.querySelector('#model-catalog .profile-link')");
 await evaluate("document.fonts.ready");await pause(1500);
 await evaluate("document.querySelector('#model-catalog .profile-link').click()");
 await wait("!!document.querySelector('dialog[open]')");
 await evaluate("[...document.querySelectorAll('.profile-tabs button')].find(b=>b.textContent==='منابع و مجوز').click()");
 await wait("document.querySelectorAll('dialog .evidence-item').length>0");
 await evaluate("document.querySelectorAll('dialog .evidence-item').forEach(el=>el.open=true)");
 const text=await evaluate("document.querySelector('dialog').textContent");
 for(const removed of ['ذی‌نفع تجاری','این منبع چه چیزی را بررسی می‌کند؟','نوع منبع','ناشر مدل یا نرم‌افزار؛ ارزیابی مستقل محسوب نمی‌شود.','شناسنامه و کاربرد اعلام‌شده، بدون تأیید مستقل.']) assert.ok(!text.includes(removed),removed);
 assert.ok(await evaluate("document.querySelectorAll('dialog .source-url[target=_blank]').length>0"));
 await evaluate('document.fonts.ready');
 const shot=await call('Page.captureScreenshot',{format:'png'});
 await fs.writeFile(out+'/model-sources.png',Buffer.from(shot.data,'base64'));
 assert.deepEqual(events.filter(e=>e.method==='Runtime.exceptionThrown'),[]);
 await fs.writeFile(out+'/browser-review.json',JSON.stringify({removedStockText:true,sourceLinksPreserved:true,runtimeErrors:0},null,2));
 console.log('Source panel: stock labels removed, source links preserved, no runtime errors.');
}finally{await call('Page.close').catch(()=>{});socket.end()}
