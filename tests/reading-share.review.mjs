import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { call, pause, events, socket } from '../scripts/browser-session.mjs';
import { articleShareUrl } from '../src/lib/article-sharing.mjs';
const registry=JSON.parse(await fs.readFile('src/lib/generated/short-links.json','utf8'));
const output='docs/reviews/local-2026-09-16/reading-share', origin='http://127.0.0.1:4189';
const report=[];
const Q=JSON.stringify;
async function E(expression){const r=await call('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value}
async function wait(expression){for(let i=0;i<100;i++){if(await E(expression))return;await pause(100)}throw Error(expression)}
async function scroll(selector,fraction=0){await E(`(()=>{const r=document.querySelector(${Q(selector)}).getBoundingClientRect();window.scrollTo({top:scrollY+r.top+r.height*${fraction}-innerHeight*.45,behavior:'instant'})})()`);await pause(250)}
async function shot(name){const r=await call('Page.captureScreenshot',{format:'png'});await fs.writeFile(output+'/'+name+'.png',Buffer.from(r.data,'base64'))}
async function assertPlacement(body, label){
 const geometry=await E(`(()=>{
  const b=document.querySelector(${Q(body)}).getBoundingClientRect(),el=document.querySelector('.reading-share-float'),f=el.getBoundingClientRect();
  const menus=[...document.querySelectorAll('[data-reading-navigation]')].map(n=>n.getBoundingClientRect()).filter(r=>r.width&&r.height&&(r.right<=b.left+1||r.left>=b.right-1));
  return {docked:el.classList.contains('docked'),inViewport:f.left>=0&&f.right<=innerWidth,
   beside:Math.abs(b.left-f.right-16)<2||Math.abs(f.left-b.right-16)<2,
   clear:menus.every(r=>f.right<=r.left||f.left>=r.right||f.bottom<=r.top||f.top>=r.bottom),
   opposite:menus.every(r=>r.right<=b.left+1?f.left>=b.right: f.right<=b.left)};
 })()`);
 assert.ok(geometry.inViewport,label+' inside viewport');
 assert.ok(geometry.clear,label+' does not overlap contents');
 if(!geometry.docked){assert.ok(geometry.beside,label+' beside text');assert.ok(geometry.opposite,label+' opposite contents');}
}
const cases=[
 ['fa','/articles/gpu-inference-latency-throughput/','.article-body'],
 ['cost','/articles/true-llm-cost-buy-rent-or-api/','.article-body'],
 ['en','/en/articles/gpu-inference-latency-throughput-en/','.article-body'],
 ['es','/es/articles/gpu-inference-latency-throughput-es/','.article-body'],
 ['gpu','/guides/gpu-selection/','#gpu-types-for-ai .guide-prose'],
 ['ztai','/guides/zero-trust-ai/','#from-zero-trust-to-zero-trust-ai .guide-prose'],
 ['gpu-en','/en/guides/gpu-selection/','.article-entry .review-prose'],
 ['gpu-es','/es/guides/gpu-selection/','.article-entry .review-prose'],
 ['llm','/guides/llm/?show-drafts=true','#llms-on-rtx-4090-24gb-vs-48gb .guide-prose']
];
try{
 await call('Page.addScriptToEvaluateOnNewDocument',{source:"Object.defineProperty(navigator,'canShare',{configurable:true,value:()=>false});Object.defineProperty(navigator,'share',{configurable:true,value:async data=>window.__shared=data})"});
 await fs.mkdir(output,{recursive:true});await call('Page.enable');await call('Runtime.enable');
 for(const [name,path,body] of cases){
  console.log('Reviewing',name);
  await call('Emulation.setDeviceMetricsOverride',{width:1600,height:1000,deviceScaleFactor:1,mobile:false});
  await call('Page.navigate',{url:origin+path});await wait(`!!document.querySelector(${Q(body+' .reading-share-end')})`);await E('document.fonts.ready');await pause(1000);
  await E(`{const el=document.querySelector(${Q(body)});const d=el.closest('details');if(d)d.open=true}`);
  await pause(200);await scroll(body);
  await wait("document.querySelectorAll('.reading-share-float').length===1");
  await assertPlacement(body,name+' start');
  await shot(name+'-start');
  const articleHref=await E(`document.querySelector(${Q(body+' .article-open')})?.getAttribute('href') ?? location.pathname`);
  const expected=articleShareUrl(articleHref,registry);
  const href=await E(`document.querySelector(${Q(body+' .reading-share-end')}).dataset.shareHref`);
  await E("Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async(text)=>window.__copied=text}});Object.defineProperty(navigator,'share',{configurable:true,value:async(data)=>window.__shared=data})");
  await scroll(body,.55);
  await wait("document.querySelectorAll('.reading-share-float').length===1");
  assert.equal(await E("document.querySelector('.reading-share-float').dataset.shareHref"),href);
  await E("document.querySelector('.reading-share-float .article-actions button:last-of-type').click()");
  assert.equal(await E('window.__copied'),expected);
  await E("document.querySelector('.reading-share-float .article-actions button:first-of-type').click()");
  await wait("!document.querySelector('dialog[open] [data-share-destination=native]')?.disabled");
  await E("document.querySelector('dialog[open] [data-share-destination=native]').click()");
  assert.equal(await E('window.__shared.url'),expected);
  assert.ok(await E('window.__shared.text.length>window.__shared.title.length')); 
  if(name==='fa'||name==='llm')await shot(name+'-midpoint');
  {
   for(const width of [2200,1306,1200,1199,900]){
    await call('Emulation.setDeviceMetricsOverride',{width,height:1000,deviceScaleFactor:1,mobile:false});
    await scroll(body,.55);
    await assertPlacement(body,name+' width '+width);
   }
   await call('Emulation.setDeviceMetricsOverride',{width:1600,height:1000,deviceScaleFactor:1,mobile:false});
  }
  await scroll(body+' .reading-share-end');await wait("document.querySelectorAll('.reading-share-float').length===0");
  if(name==='fa')await shot('article-end');
  await E(`document.querySelector(${Q(body+' .reading-share-end button:last-of-type')}).click()`);
  assert.equal(await E('window.__copied'),expected);
  if(name==='llm'){
   await scroll(body,.55);await wait("!!document.querySelector('.reading-share-float')");
   await E(`document.querySelector(${Q(body)}).closest('details').open=false`);
   await wait("document.querySelectorAll('.reading-share-float').length===0");
  }
  if(['fa','en','es'].includes(name)){
   await call('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});
   await scroll(body);await wait("!!document.querySelector('.share-toggle')");
   assert.equal(await E("getComputedStyle(document.querySelector('.floating-actions')).display"),'none');
   await shot(name+'-mobile-collapsed');
   await E("document.querySelector('.share-toggle').click()");
   assert.equal(await E("document.querySelector('.share-toggle').getAttribute('aria-expanded')"),'true');
   await E("document.querySelector('.reading-share-float .article-actions button:last-of-type').click()");
   assert.equal(await E('window.__copied'),expected);
   assert.ok(await E("(()=>{const r=document.querySelector('.reading-share-float').getBoundingClientRect();return r.left>=0&&r.right<=innerWidth&&r.bottom<=innerHeight})()"));
   await shot(name+'-mobile-expanded');
   await E("window.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape'}))");
   await wait("document.querySelector('.share-toggle').getAttribute('aria-expanded')==='false'");
  }
  report.push({name,href,startVisible:true,besideText:true,noMenuOverlap:true,midpointVisible:true,endControls:true,copyAndShare:true});
 }
 assert.deepEqual(events.filter(e=>e.method==='Runtime.exceptionThrown'),[]);
 await fs.writeFile(output+'/browser-review.json',JSON.stringify({cases:report,runtimeErrors:0},null,2));
 console.log(JSON.stringify(report));
}finally{await call('Page.close').catch(()=>{});socket.end()}
