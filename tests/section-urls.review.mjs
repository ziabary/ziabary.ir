import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { call, pause, events, socket } from '../scripts/browser-session.mjs';
import { articleShareUrl } from '../src/lib/article-sharing.mjs';
const registry=JSON.parse(await fs.readFile('src/lib/generated/short-links.json','utf8'));
const output='docs/reviews/local-2026-09-16/section-urls';
const origin='http://127.0.0.1:4189';
const Q=JSON.stringify;
async function E(expression){const r=await call('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value}
async function wait(expression){for(let i=0;i<120;i++){if(await E(expression))return;await pause(100)}throw Error(expression)}
async function shot(name){const r=await call('Page.captureScreenshot',{format:'png'});await fs.writeFile(output+'/'+name+'.png',Buffer.from(r.data,'base64'))}
const cases=[
 ['fa','/articles/targoman-300-concurrent-requests-one-rtx-4090/','.article-body'],
 ['en','/en/articles/gpu-inference-latency-throughput-en/','.article-body'],
 ['es','/es/articles/gpu-inference-latency-throughput-es/','.article-body'],
 ['gpu','/guides/gpu-selection/','#gpu-types-for-ai .guide-prose'],
 ['ztai','/guides/zero-trust-ai/','#from-zero-trust-to-zero-trust-ai .guide-prose'],
 ['gpu-en','/en/guides/gpu-selection/','.article-entry .review-prose'],
 ['gpu-es','/es/guides/gpu-selection/','.article-entry .review-prose'],
 ['llm','/guides/llm/?show-drafts=true&view=hardware-feasibility','#llms-on-rtx-4090-24gb-vs-48gb .guide-prose']
];
const report=[];
try{
 await call('Page.addScriptToEvaluateOnNewDocument',{source:"Object.defineProperty(navigator,'canShare',{configurable:true,value:()=>false});Object.defineProperty(navigator,'share',{configurable:true,value:async data=>window.__shared=data})"});
 await fs.mkdir(output,{recursive:true});
 for(const [name,path,body] of cases.filter(item=>!process.env.REVIEW_CASE||item[0]===process.env.REVIEW_CASE)){
  console.log('Reviewing',name);
  await call('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});
  await call('Page.navigate',{url:origin+path});await wait(`!!document.querySelector(${Q(body)})`);await E('document.fonts.ready');await pause(800);
  assert.equal(await E('location.hash'),'');
  await E(`{const d=document.querySelector(${Q(body)}).closest('details');if(d)d.open=true}`);await pause(300);
  const targets=await E(`(()=>{const headings=[...document.querySelector(${Q(body)}).querySelectorAll('h2[id],h3[id]')];return [headings[0],headings.find(h=>h.tagName==='H3')??headings[1]].map(h=>h.id)})()`);
  const historyBefore=await call('Page.getNavigationHistory');
  await E('window.__sectionSentinel=42');
  for(const id of targets){
   await E(`{const t=document.getElementById(${Q(id)});scrollTo({top:scrollY+t.getBoundingClientRect().top-120,behavior:'instant'})}`);
   await wait(`decodeURIComponent(location.hash.slice(1))===${Q(id)}`);
   assert.equal(await E('location.search'),new URL(origin+path).search);
   assert.equal(await E('window.__sectionSentinel'),42);
   await wait(`[...document.querySelectorAll('[data-reading-navigation] a[aria-current="location"]')].some(a=>decodeURIComponent(new URL(a.href).hash.slice(1))===${Q(id)})`);
  }
  const historyAfter=await call('Page.getNavigationHistory');
  assert.equal(historyAfter.entries.length,historyBefore.entries.length);assert.equal(historyAfter.currentIndex,historyBefore.currentIndex);
  const deepLink=await E('location.href');
  const articleHref=await E(`document.querySelector(${Q(body+' .article-open')})?.getAttribute('href') ?? location.pathname`);
  const expected=articleShareUrl(articleHref,registry);
  await E("Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async text=>window.__copied=text}});Object.defineProperty(navigator,'canShare',{configurable:true,value:()=>false});Object.defineProperty(navigator,'share',{configurable:true,value:async data=>window.__shared=data})");
  await E(`document.querySelector(${Q(body+' .reading-share-end button:last-of-type')}).click()`);assert.equal(await E('window.__copied'),expected);
  await E(`document.querySelector(${Q(body+' .reading-share-end button:first-of-type')}).click()`);await wait("!document.querySelector('dialog[open] [data-share-destination=native]')?.disabled");await E("document.querySelector('dialog[open] [data-share-destination=native]').click()");assert.equal(await E('window.__shared.url'),expected);
  if(name==='fa'||name==='llm')await shot(name+'-subsection');
  if(name==='fa'||name==='llm'){
   await E(`[...document.querySelectorAll('[data-reading-navigation] a')].find(a=>decodeURIComponent(new URL(a.href).hash.slice(1))===${Q(targets[0])}).click()`);
   await wait(`decodeURIComponent(location.hash.slice(1))===${Q(targets[0])}`);await pause(350);
   const clickedHistory=await call('Page.getNavigationHistory');
   assert.equal(clickedHistory.currentIndex,historyAfter.currentIndex+1);
   await call('Page.navigateToHistoryEntry',{entryId:historyAfter.entries[historyAfter.currentIndex].id});
   await wait(`decodeURIComponent(location.hash.slice(1))===${Q(targets[1])}`);await pause(350);
   assert.equal(await E('window.__sectionSentinel'),42);
  }

  await call('Page.reload');await wait('window.__sectionSentinel!==42');await wait(`!!document.getElementById(${Q(targets[1])})`);await E('document.fonts.ready');await pause(1600);
  assert.equal(await E('decodeURIComponent(location.hash.slice(1))'),targets[1],name+' reload fragment');
  const landing=await E(`(()=>{const t=document.getElementById(${Q(targets[1])});return {closed:!!t.closest('details:not([open])'),top:t.getBoundingClientRect().top,scroll:scrollY}})()`);
  console.log(name,'landing',landing);
  if(landing.closed||landing.top<60||landing.top>=180)await shot(name+'-landing');
  assert.ok(!landing.closed&&landing.top>=60&&landing.top<180,name+' reload opens section');
  if(name==='fa'||name==='llm'){
   await call('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});
   await E(`{const t=document.getElementById(${Q(targets[0])});scrollTo({top:scrollY+t.getBoundingClientRect().top-120,behavior:'instant'})}`);
   await wait(`decodeURIComponent(location.hash.slice(1))===${Q(targets[0])}`);
   assert.equal(await E('location.search'),new URL(origin+path).search);
  }
  await E("scrollTo({top:0,behavior:'instant'})");await wait("location.hash===''");
  report.push({name,deepLink,subsection:targets[1],historyStable:true,reload:true,copyAndShare:true});
 }
 assert.deepEqual(events.filter(e=>e.method==='Runtime.exceptionThrown'),[]);
 await fs.writeFile(output+'/review.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report));
}finally{await call('Page.close').catch(()=>{});socket.end()}
