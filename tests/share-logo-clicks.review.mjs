import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { call, pause, events, socket } from '../scripts/browser-session.mjs';
const output='docs/reviews/local-2026-09-16/share-logo-clicks';
async function E(expression){const r=await call('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value}
async function wait(expression){for(let i=0;i<120;i++){if(await E(expression))return;await pause(100)}throw Error(expression)}
const cases=[
 ['fa','/articles/true-llm-cost-buy-rent-or-api/','.article-body'],
 ['en','/en/articles/gpu-inference-latency-throughput-en/','.article-body'],
 ['es','/es/articles/gpu-inference-latency-throughput-es/','.article-body'],
 ['gpu','/guides/gpu-selection/','#gpu-types-for-ai .guide-prose'],
 ['ztai','/guides/zero-trust-ai/','#from-zero-trust-to-zero-trust-ai .guide-prose'],
 ['llm','/guides/llm/?show-drafts=true','#llms-on-rtx-4090-24gb-vs-48gb .guide-prose']
];
const report=[];
try{
 await fs.mkdir(output,{recursive:true});
 // Observe after the document's lightbox handler, then suppress external navigation.
 await call('Page.addScriptToEvaluateOnNewDocument',{source:`window.__logoClicks=[];window.addEventListener('click',event=>{
  const link=event.target.closest?.('a.share-service');if(!link)return;
  window.__logoClicks.push({id:link.dataset.shareDestination,href:link.href,prevented:event.defaultPrevented});event.preventDefault();
 });`});
 for(const [name,path,body] of cases){
  console.log('Checking logo clicks',name);
  await call('Emulation.setDeviceMetricsOverride',{width:name==='fa'?390:1440,height:1000,deviceScaleFactor:1,mobile:name==='fa'});
  await call('Page.navigate',{url:'http://127.0.0.1:4189'+path});
  const button=JSON.stringify(body+' .reading-share-end button:first-of-type');
  await wait(`!!document.querySelector(${button})`);await pause(800);
  await E(`{const b=document.querySelector(${button});const d=b.closest('details');if(d)d.open=true;b.click()}`);
  await wait("!!document.querySelector('dialog[open]')");await pause(300);
  const services=await E("[...document.querySelectorAll('dialog[open] .share-service')].map(a=>a.dataset.shareDestination)");
  assert.equal(services.length,name==='en'||name==='es'?5:7);
  assert.equal(await E("document.querySelectorAll('dialog[open] img.zoomable-article-image,dialog[open] img[role=button],dialog[open] img[tabindex]').length"),0);
  for(const id of services){
   const selector=JSON.stringify(`dialog[open] .share-service[data-share-destination="${id}"]`);
   const point=await E(`(()=>{const a=document.querySelector(${selector}),r=a.getBoundingClientRect();return{x:r.x+r.width/2,y:r.y+r.height/2,cursor:getComputedStyle(a.querySelector('img')||a).cursor}})()`);
   assert.notEqual(point.cursor,'zoom-in');
   await call('Input.dispatchMouseEvent',{type:'mousePressed',x:point.x,y:point.y,button:'left',clickCount:1});
   await call('Input.dispatchMouseEvent',{type:'mouseReleased',x:point.x,y:point.y,button:'left',clickCount:1});
   assert.equal(await E('window.__logoClicks.at(-1)?.id'),id);assert.equal(await E('window.__logoClicks.at(-1)?.prevented'),false);
   assert.equal(await E("!!document.querySelector('.lightbox')"),false);
   // Directly target the image as well, to exercise the guard independently of CSS.
   await E(`document.querySelector(${selector}).querySelector('img')?.click()`);
   assert.equal(await E('window.__logoClicks.at(-1)?.prevented'),false);
   assert.equal(await E("!!document.querySelector('.lightbox')"),false);
   await E(`document.querySelector(${selector}).focus()`);
   await call('Input.dispatchKeyEvent',{type:'keyDown',key:'Enter',code:'Enter',windowsVirtualKeyCode:13});
   await call('Input.dispatchKeyEvent',{type:'keyUp',key:'Enter',code:'Enter',windowsVirtualKeyCode:13});
   assert.equal(await E('window.__logoClicks.at(-1)?.id'),id);assert.equal(await E('window.__logoClicks.at(-1)?.prevented'),false);
  }
  await E("document.querySelector('dialog[open]').close()");
  const image=await E(`(()=>{const root=document.querySelector(${JSON.stringify(body)});const img=root.querySelector('img.zoomable-article-image')||document.querySelector('img.zoomable-article-image:not(dialog img)');if(!img)return false;img.click();return true})()`);
  assert.ok(image,name+' has a real zoomable article image');
  await wait("!!document.querySelector('.lightbox')");
  await E("document.querySelector('.lightbox .close').click()");
  assert.equal(await E("!!document.querySelector('.lightbox')"),false);
  report.push({name,services,mouse:true,keyboard:true,directImageClick:true,articleImageZoom:true});
 }
 assert.deepEqual(events.filter(e=>e.method==='Runtime.exceptionThrown'),[]);
 await fs.writeFile(output+'/browser-review.json',JSON.stringify({cases:report,externalNavigation:'Suppressed at window after checking the document handler did not cancel it.',runtimeErrors:0},null,2));
 console.log('PASS: every logo follows its share link by mouse and keyboard; real article images still zoom.');
}finally{await call('Page.close').catch(()=>{});socket.end()}
