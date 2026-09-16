import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {call,pause,events,socket} from '../scripts/browser-session.mjs';
const output='docs/reviews/local-2026-09-16/article-sharing-icons';
const E=async expression=>{const r=await call('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value};
async function wait(expression){for(let i=0;i<120;i++){if(await E(expression))return;await pause(100)}throw Error(expression)}
const reports=[];
try{
 await fs.mkdir(output,{recursive:true});await call('Page.enable');await call('Runtime.enable');
 await call('Page.addScriptToEvaluateOnNewDocument',{source:"Object.defineProperty(navigator,'share',{configurable:true,value:async data=>{window.__shared=data}});Object.defineProperty(navigator,'canShare',{configurable:true,value:()=>false});Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async text=>window.__copied=text}})"});
 for(const [lang,path]of [['fa','/articles/true-llm-cost-buy-rent-or-api/'],['en','/en/articles/gpu-inference-latency-throughput-en/'],['es','/es/articles/gpu-inference-latency-throughput-es/']]){
  console.log('Reviewing share dialog',lang);
  await call('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});
  await call('Page.navigate',{url:'http://127.0.0.1:4189'+path});
  await wait("!!document.querySelector('.reading-share-end .article-actions')");await E('document.fonts.ready');await pause(1200);
  await E("document.querySelector('.reading-share-end button:first-of-type').focus();document.querySelector('.reading-share-end button:first-of-type').click()");
  await wait("!!document.querySelector('dialog[open]')");
  await wait("!document.querySelector('dialog[open] [data-share-destination=native]')?.disabled");
  const payload=await E(`(()=>{const d=document.querySelector('dialog[open]');const r=d.getBoundingClientRect();return {text:d.querySelector('textarea').value,links:Object.fromEntries([...d.querySelectorAll('a[data-share-destination]')].map(a=>[a.dataset.shareDestination,a.href])),fits:r.left>=0&&r.right<=innerWidth&&r.top>=0&&r.bottom<=innerHeight,dir:d.dir}})()`);
  assert.ok(payload.fits);
  assert.ok(await E("(()=>{const d=document.querySelector('dialog[open]');const title=d.querySelector('.share-title').getBoundingClientRect(),buttons=d.querySelector('.share-destinations').getBoundingClientRect(),link=d.querySelector('.share-link-row').getBoundingClientRect();return title.bottom<=buttons.top&&buttons.bottom<=link.top&&!d.querySelector('details').open&&d.getBoundingClientRect().height<500})()"),'compact dialog without overlap or open preview');
  assert.equal(payload.dir,lang==='fa'?'rtl':'ltr');
  const icons=await E("[...document.querySelectorAll('dialog[open] .share-service')].map(a=>({label:a.getAttribute('aria-label'),width:a.getBoundingClientRect().width,height:a.getBoundingClientRect().height,loaded:!a.querySelector('img')||(a.querySelector('img').complete&&a.querySelector('img').naturalWidth>0),local:!a.querySelector('img')||a.querySelector('img').getAttribute('src').startsWith('/images/social/')}))");
  assert.ok(icons.every(i=>i.label&&i.width>=44&&i.height>=44&&i.loaded&&i.local));
  assert.equal(icons.length,lang==='fa'?7:5);
  if(lang==='fa')for(const id of ['bale','eitaa']){const params=new URL(payload.links[id]).searchParams;assert.equal(params.get('text')+'\n\n'+params.get('url'),payload.text)}
  else assert.ok(!payload.links.bale&&!payload.links.eitaa);
  const shot=await call('Page.captureScreenshot',{format:'png'});await fs.writeFile(output+'/share-'+lang+'-mobile.png',Buffer.from(shot.data,'base64'));
  await E("document.querySelector('dialog[open] .share-link-copy').click()");await wait('window.__copied!==undefined');assert.equal(await E('window.__copied'),payload.text.split('\n\n').at(-1));
  const url=payload.text.split('\n\n').at(-1);assert.match(url,/^https:\/\/ziabary\.ir\/\?t=[a-z0-9]+$/);
  assert.equal(payload.text.split('\n\n').length,3);
  const tg=new URL(payload.links.telegram).searchParams;
  assert.equal(tg.get('url'),url);assert.equal(tg.get('text')+'\n\n'+url,payload.text);
  assert.equal(new URL(payload.links.whatsapp).searchParams.get('text').replace(/^✍️ \*(.*?)\*/u,'✍️ $1'),payload.text);
  assert.equal(new URL(payload.links.x).searchParams.get('url'),url);
  assert.equal(new URL(payload.links.linkedin).searchParams.get('url'),url);
  assert.ok(new URL(payload.links.email).searchParams.get('body').includes(payload.text.split('\n\n')[1]));
  await E("document.querySelector('dialog[open] [data-share-destination=copy]').click()");await wait('window.__copied!==undefined');assert.equal(await E('window.__copied'),payload.text);
  if(lang==='fa'){
   for(const [width,height,theme] of [[320,740,'dark'],[1440,1000,'light']]){
    await call('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:width<600});
    await E(`document.documentElement.dataset.theme='${theme}'`);await pause(200);
    assert.ok(await E("(()=>{const d=document.querySelector('dialog[open]'),r=d.getBoundingClientRect();return r.left>=0&&r.right<=innerWidth&&r.height<=innerHeight&&d.scrollWidth<=d.clientWidth&&[...d.querySelectorAll('.share-service')].every(a=>{const b=a.getBoundingClientRect();return b.left>=r.left&&b.right<=r.right})})()"));
    const image=await call('Page.captureScreenshot',{format:'png'});await fs.writeFile(output+`/share-fa-${width}-${theme}.png`,Buffer.from(image.data,'base64'));
   }
   await call('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});
   await E("document.documentElement.dataset.theme='dark'");await pause(150);
   const shot=await call('Page.captureScreenshot',{format:'png'});await fs.writeFile(output+'/share-mobile.png',Buffer.from(shot.data,'base64'));
   await E("navigator.clipboard.writeText=async()=>{throw Error('denied')};document.execCommand=()=>false");
   await E("document.querySelector('dialog[open] [data-share-destination=copy]').click()");await pause(100);
   assert.ok(await E("document.querySelector('dialog[open] .share-status').textContent.includes('انجام نشد')"));
   assert.ok(await E("document.querySelector('dialog[open] details').open"));
   await E("document.execCommand=()=>{window.__fallbackText=document.querySelector('dialog[open] textarea[readonly]:not(.share-preview)').value;return true}");
   await E("document.querySelector('dialog[open] [data-share-destination=copy]').click()");await pause(100);
   assert.equal(await E('window.__fallbackText'),payload.text);
   await E("Object.defineProperty(navigator,'share',{configurable:true,value:async()=>{throw new DOMException('cancelled','AbortError')}})");
   await E("document.querySelector('dialog[open] [data-share-destination=native]').click()");await pause(100);assert.ok(await E("!!document.querySelector('dialog[open]')"));
   await E("Object.defineProperty(navigator,'share',{configurable:true,value:async data=>window.__shared=data})");
  }
  await E("document.querySelector('dialog[open] [data-share-destination=native]').click()");await wait("!document.querySelector('dialog[open]')");
  assert.equal(await E("window.__shared.text+String.fromCharCode(10,10)+window.__shared.url"),payload.text);
  assert.ok(await E('document.activeElement.matches(".article-actions button:first-of-type")'));
  reports.push({lang,url,destinations:true,summary:true,mobileDialogFits:true,localLogos:true,collapsedPreview:true,native:true});
 }
 // A native API that disappears after mount is handled without losing the dialog.
 await E("Object.defineProperty(navigator,'share',{configurable:true,value:undefined})");
 await E("document.querySelector('.reading-share-end button:first-of-type').focus();document.querySelector('.reading-share-end button:first-of-type').click()");
 await E("document.querySelector('dialog[open] [data-share-destination=native]').click()");await pause(100);
 assert.ok(await E("!!document.querySelector('dialog[open]')"));
 assert.ok(await E("document.querySelector('dialog[open] .share-status').textContent.length>0"));
 for(const [width,height,theme] of [[320,740,'dark'],[1440,1000,'light']]){
  await call('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:width<600});
  await E(`document.documentElement.dataset.theme='${theme}'`);await pause(200);
  const box=await E("(()=>{const d=document.querySelector('dialog[open]'),r=d.getBoundingClientRect();return {fits:r.left>=0&&r.right<=innerWidth&&r.height<=innerHeight,overflow:d.scrollWidth>d.clientWidth}})()");
  assert.ok(box.fits&&!box.overflow);
 }
 assert.deepEqual(events.filter(e=>e.method==='Runtime.exceptionThrown'),[]);
 await fs.writeFile(output+'/browser-review.json',JSON.stringify({cases:reports,clipboardFailure:true,clipboardFallback:true,nativeCancel:true,nativeFailure:true,runtimeErrors:0},null,2));
 console.log('PASS: FA/EN/ES short links, destination payloads, mobile dialog, clipboard failure/fallback, native cancel/failure and focus restoration.');
}finally{await call('Page.close').catch(()=>{});socket.end()}
