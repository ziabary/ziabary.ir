import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {call,pause,events,socket} from '../scripts/browser-session.mjs';
const output='docs/reviews/local-2026-09-16/article-sharing-media';
const E=async expression=>{const r=await call('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value};
async function wait(expression){for(let i=0;i<150;i++){if(await E(expression))return;await pause(100)}throw Error(expression)}
const cases=[
 ['fa','/articles/true-llm-cost-buy-rent-or-api/','.article-body','true-llm-cost-buy-rent-or-api'],
 ['en','/en/articles/gpu-inference-latency-throughput-en/','.article-body','gpu-inference-latency-throughput'],
 ['es','/es/articles/gpu-inference-latency-throughput-es/','.article-body','gpu-inference-latency-throughput'],
 ['gpu','/guides/gpu-selection/','#gpu-types-for-ai .guide-prose','gpu-types-for-ai'],
 ['ztai','/guides/zero-trust-ai/','#from-zero-trust-to-zero-trust-ai .guide-prose','from-zero-trust-to-zero-trust-ai'],
 ['llm','/guides/llm/?show-drafts=true','#llms-on-rtx-4090-24gb-vs-48gb .guide-prose','llms-on-rtx-4090-24gb-vs-48gb']
];
const report=[];
try{
 await fs.mkdir(output,{recursive:true});
 await call('Page.addScriptToEvaluateOnNewDocument',{source:`
 Object.defineProperty(navigator,'canShare',{configurable:true,value:data=>data.files?.[0]?.type==='image/jpeg'});
 Object.defineProperty(navigator,'share',{configurable:true,value:async data=>{
  const file=data.files?.[0];window.__shared={title:data.title,text:data.text,url:data.url,file:file?{name:file.name,type:file.type,size:file.size,magic:[...new Uint8Array(await file.slice(0,2).arrayBuffer())]}:null};
 }});
 Object.defineProperty(navigator,'clipboard',{configurable:true,value:{write:async items=>{
  window.__clipboard=Object.fromEntries(await Promise.all(items[0].types.map(async type=>[type,await(await items[0].getType(type)).text()])));
 },writeText:async text=>window.__plain=text}});`});
 for(const [name,path,body,slug] of cases){
  console.log('Reviewing cover sharing',name);
  await call('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});
  await call('Page.navigate',{url:'http://127.0.0.1:4189'+path});
  const selector=JSON.stringify(body+' .reading-share-end button:first-of-type');
  await wait(`!!document.querySelector(${selector})`);await pause(900);
  await E(`{const button=document.querySelector(${selector});const details=button.closest('details');if(details)details.open=true;button.click()}`);
  await wait("!!document.querySelector('dialog[open] .share-image-download')?.href.startsWith('blob:')");
  const cover=await E("document.querySelector('dialog[open] .share-cover').getAttribute('src')");
  assert.ok(await E("!document.querySelector('dialog[open] img.zoomable-article-image')"));
  assert.ok(cover.includes(slug),`${name}: article cover rather than collection cover (${cover})`);
  const payload=await E(`(async()=>{
   const d=document.querySelector('dialog[open]'),a=d.querySelector('.share-image-download');
   const image=new Image();image.src=a.href;await image.decode();const r=d.getBoundingClientRect();
   return {text:d.querySelector('textarea').value,url:d.querySelector('input').value,w:image.naturalWidth,h:image.naturalHeight,download:a.download,native:d.querySelector('[data-share-destination=native]').textContent,fit:r.left>=0&&r.right<=innerWidth&&r.top>=0&&r.bottom<=innerHeight};
  })()`);
  assert.ok(payload.fit);assert.ok(payload.w>0&&payload.h>0&&Math.max(payload.w,payload.h)<=1600);
  assert.match(payload.download,/\.jpg$/);assert.match(payload.url,/^https:\/\/ziabary\.ir\/\?t=/);
  assert.match(payload.native,/تصویر|image|imagen/);
  await E("document.querySelector('dialog[open] [data-share-destination=copy]').click()");
  await wait('!!window.__clipboard');
  const clipboard=await E('window.__clipboard');assert.equal(clipboard['text/plain'],payload.text);assert.match(clipboard['text/html'],/<strong>✍️ /);assert.ok(clipboard['text/html'].includes(payload.url));
  if(name==='fa'){
   for(const [width,height,theme] of [[390,844,'dark'],[320,740,'dark'],[1440,1000,'light']]){
    await call('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:width<600});await E(`document.documentElement.dataset.theme='${theme}'`);await pause(250);
    assert.ok(await E("(()=>{const d=document.querySelector('dialog[open]'),r=d.getBoundingClientRect();return r.left>=0&&r.right<=innerWidth&&r.height<=innerHeight&&d.scrollWidth<=d.clientWidth})()"));
    const shot=await call('Page.captureScreenshot',{format:'png'});await fs.writeFile(`${output}/share-${width}-${theme}.png`,Buffer.from(shot.data,'base64'));
   }
  }
  await E("document.querySelector('dialog[open] [data-share-destination=native]').click()");await wait('!!window.__shared');
  const shared=await E('window.__shared');assert.equal(shared.text,payload.text);assert.equal(shared.url,undefined);assert.equal(shared.file.type,'image/jpeg');assert.ok(shared.file.size>10000);assert.deepEqual(shared.file.magic,[255,216]);
  assert.equal(shared.text.split(payload.url).length,2);
  report.push({name,cover,dimensions:[payload.w,payload.h],jpegBytes:shared.file.size,richClipboard:true});
 }
 // A failed image request keeps ordinary text sharing usable.
 await call('Page.addScriptToEvaluateOnNewDocument',{source:`const originalFetch=window.fetch;window.fetch=(resource,...args)=>String(resource).includes('/images/articles/')?Promise.reject(Error('Test image failure')):originalFetch(resource,...args)`});
 await call('Page.navigate',{url:'http://127.0.0.1:4189/articles/true-llm-cost-buy-rent-or-api/'});
 await wait("!!document.querySelector('.reading-share-end button')");await pause(900);
 await E("document.querySelector('.reading-share-end button').click()");
 await wait("document.querySelector('dialog[open] .share-status')?.textContent.includes('تصویر آماده نشد')");
 assert.ok(await E("document.querySelector('dialog[open] .share-image-download').href.includes('/images/articles/')"));
 await E("document.querySelector('dialog[open] [data-share-destination=native]').click()");await wait('!!window.__shared');
 assert.equal(await E('window.__shared.file'),null);assert.match(await E('window.__shared.url'),/\?t=/);
 assert.deepEqual(events.filter(e=>e.method==='Runtime.exceptionThrown'),[]);
 await fs.writeFile(output+'/browser-review.json',JSON.stringify({cases:report,imageFailureFallback:true,runtimeErrors:0,shareApi:'Mocked; real JPEG conversion and rich ClipboardItems tested. Delivery/rendering in destination apps requires device testing.'},null,2));
 console.log('PASS: article covers, JPEG file payloads, rich clipboard, compact responsive dialog and image failure fallback.');
}finally{await call('Page.close').catch(()=>{});socket.end()}
