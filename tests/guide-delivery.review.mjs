import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {call,pause,events,socket} from '../scripts/browser-session.mjs';
const out='docs/reviews/local-2026-09-20/guide-delivery',origin='http://127.0.0.1:5195';
const manifest=JSON.parse(await fs.readFile('.svelte-kit/output/client/.vite/manifest.json'));
const modulePaths=new Map(Object.entries(manifest).filter(([key])=>key.startsWith('src/lib/content/articles/')).map(([key,value])=>[key,origin+'/'+value.file]));
const E=async expression=>{const r=await call('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value};
async function wait(expression){for(let i=0;i<160;i++){if(await E(expression))return;await pause(125)}throw Error('Timeout: '+expression)}
async function nav(path){await call('Page.navigate',{url:'about:blank'});await wait("location.href==='about:blank'");await call('Page.navigate',{url:origin+path});await wait('!!document.querySelector("main")');await pause(1200)}
const count=url=>events.filter(e=>e.method==='Network.requestWillBeSent'&&e.params.request.url===url).length;
const loaded=slug=>`document.getElementById(${JSON.stringify(slug)})?.querySelector('[data-loaded="true"]')`;
async function click(selector,trusted=false){await E(`document.querySelector(${JSON.stringify(selector)}).scrollIntoView({block:'center',behavior:'instant'})`);await pause(80);if(trusted){const r=await E(`{const b=document.querySelector(${JSON.stringify(selector)}).getBoundingClientRect();({x:b.x+b.width/2,y:b.y+b.height/2})}`);await call('Input.dispatchMouseEvent',{type:'mousePressed',button:'left',clickCount:1,...r});await call('Input.dispatchMouseEvent',{type:'mouseReleased',button:'left',clickCount:1,...r});}else await E(`document.querySelector(${JSON.stringify(selector)}).click()`);await pause(180)}
async function capture(name){const r=await call('Page.captureScreenshot',{format:'png'});await fs.writeFile(out+'/'+name+'.png',Buffer.from(r.data,'base64'))}
try{
 await call('Page.bringToFront');
 for(const locale of ['fa','en','es']){
  const base=locale==='fa'?'':'/'+locale,slug=locale==='fa'?'llms-on-rtx-4090-24gb-vs-48gb':'gpu-inference-latency-throughput-'+locale,path=base+'/guides/llm/';
  await call('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});
  const before=new Map([...modulePaths.values()].map(url=>[url,count(url)]));await nav(path);
  assert.equal(await E("document.querySelectorAll('.llm-chapter [data-loaded=true]').length"),0);
  for(const url of modulePaths.values())assert.equal(count(url),before.get(url),'No chapter requested initially: '+url);
  await click('#'+slug+' summary');await wait(loaded(slug));
  assert.equal(await E("document.querySelectorAll('.llm-chapter [data-loaded=true]').length"),1);
  const module=modulePaths.get('src/lib/content/articles/'+slug+'.md');assert.equal(count(module)-before.get(module),1,JSON.stringify({module,requests:events.filter(e=>e.method==='Network.requestWillBeSent'&&e.params.type==='Script').map(e=>e.params.request.url)}));
  for(const url of modulePaths.values())if(url!==module)assert.equal(count(url),before.get(url),'Opening one article fetched another: '+url);
  assert.ok(await E(`document.getElementById(${JSON.stringify(slug)}).querySelector('.katex')`));assert.ok(await E(`document.getElementById(${JSON.stringify(slug)}).querySelector('table')`));
  const n=count(module);await click('#'+slug+' summary');await click('#'+slug+' summary');assert.equal(count(module),n);
  const heading=await E(`document.getElementById(${JSON.stringify(slug)}).querySelector('.prose h2[id]').id`);
  await nav(path+'#'+encodeURIComponent(heading));await wait(loaded(slug));await wait(`document.getElementById(${JSON.stringify(heading)})?.getBoundingClientRect().top<160`);
  assert.ok(await E(`document.getElementById(${JSON.stringify(heading)}).getBoundingClientRect().top>=70`),'Heading remains below fixed site header');
  await pause(350);assert.equal(decodeURIComponent(await E('location.hash.slice(1)')),heading);
  await E(`document.getElementById(${JSON.stringify(heading)}).scrollIntoView({block:'start'})`);await wait(`!!document.querySelector('nav a[aria-current="location"][href="#${heading}"]')`);
  await capture(locale+'-deep-link');
  await call('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});await pause(180);assert.ok(await E('document.documentElement.scrollWidth<=390'));
  await click('[data-contact-placement="llm-guide"] button',true);
  const email=await E("document.querySelector('[data-contact-placement=llm-guide] input').value");assert.equal(email,'sales@targoman.com');
  await E("document.querySelector('[data-contact-placement=llm-guide] a').addEventListener('click',e=>e.preventDefault())");
  await click('[data-contact-placement="llm-guide"] a',true);
  const tracked=await E("dataLayer.map(x=>Array.from(x)).filter(x=>x[0]==='event'&&x[1].startsWith('contact_'))");assert.deepEqual(tracked.map(x=>x[1]),['contact_reveal','contact_email_click']);assert.ok(tracked.every(x=>x[2].contact_placement==='llm-guide'&&x[2].content_language===locale));assert.ok(!JSON.stringify(tracked).includes(email));assert.ok(!JSON.stringify(tracked).includes('generate_lead'));
  await capture(locale+'-contact-mobile');
  console.log(locale+': no initial chapter imports; one module on open; cached reopen; deep link, math, table, TOC, mobile and contact events passed');
 }
 // Interrupt a never-loaded module, then retry with a fresh document and the same article open.
 const slug='airllm-layer-wise-inference',module=modulePaths.get('src/lib/content/articles/'+slug+'.md');
 await nav('/guides/llm/');await call('Network.setBlockedURLs',{urls:['*googletagmanager.com*','*google-analytics.com*',module]});
 await click('#'+slug+' summary');await wait(`document.getElementById('${slug}').querySelector('[role=alert]')`);
 assert.equal(await E(`!!document.getElementById('${slug}').querySelector('[data-loaded=true]')`),false);
 await call('Network.setBlockedURLs',{urls:['*googletagmanager.com*','*google-analytics.com*']});await click('#'+slug+' .load-error button');await wait(loaded(slug));
 console.log('Interrupted chapter request recovered using retry');
 // GPU Persian uses the same lazy loader, including prefixed direct links.
 const gpuSlug='gpu-inference-latency-throughput';
 const html=await fs.readFile('build/articles/'+gpuSlug+'/index.html','utf8');const anchor=/<h2[^>]* id="([^"]+)"/.exec(html)[1];
 await nav('/guides/gpu-selection/#'+encodeURIComponent(gpuSlug+'--'+anchor));await wait(loaded(gpuSlug));assert.ok(await E(`document.getElementById('${gpuSlug}').querySelector('.katex')`));
 await E(`document.querySelector('#${gpuSlug} summary').focus()`);await call('Input.dispatchKeyEvent',{type:'keyDown',key:'Enter',code:'Enter',windowsVirtualKeyCode:13,text:'\r',unmodifiedText:'\r'});await call('Input.dispatchKeyEvent',{type:'keyUp',key:'Enter',code:'Enter',windowsVirtualKeyCode:13});await pause(150);assert.equal(await E(`document.querySelector('#${gpuSlug} details').open`),false);
 console.log('GPU direct link and keyboard collapse passed');
 // Compiled Markdown retains embedded interactive components.
 const rag='enterprise-rag-model-embedding-reranker';
 await nav('/guides/llm/#'+rag);await wait(loaded(rag));
 await click('#'+rag+' .reference-guidance summary');
 assert.equal(await E(`document.querySelector('#${rag} .reference-guidance details').open`),true);
 assert.ok(await E(`document.querySelector('#${rag} .reference-guidance a[href]')`));
 // Site search still finds article text and offers real standalone links.
 await click('.nav-tools button');await wait('!!document.querySelector(".search-results[aria-busy=false]")');
 await E(`{const input=document.querySelector('input[type=search]');input.value='4090';input.dispatchEvent(new Event('input',{bubbles:true}))}`);await pause(200);
 assert.ok(await E("[...document.querySelectorAll('.search-results a')].some(a=>a.getAttribute('href').includes('/articles/llms-on-rtx-4090-24gb-vs-48gb/'))"));
 await call('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});
 await call('Input.dispatchKeyEvent',{type:'keyUp',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});await pause(100);
 assert.equal(await E("!!document.querySelector('.search-panel')"),false);
 console.log('Embedded interactive article component, search and keyboard dismissal passed');
 // No-JS discovery and full independent page remain available.
 await call('Emulation.setScriptExecutionDisabled',{value:true});await call('Page.navigate',{url:origin+'/guides/llm/'});await pause(800);assert.ok((await E("document.querySelectorAll('.llm-chapter a.standalone-link').length"))>=14);assert.equal(await E("document.querySelectorAll('.llm-chapter .prose').length"),0);
 await call('Page.navigate',{url:origin+'/articles/llms-on-rtx-4090-24gb-vs-48gb/'});await pause(800);assert.ok((await E("document.querySelectorAll('.article-body h2').length"))>2);await call('Emulation.setScriptExecutionDisabled',{value:false});
 console.log('No-JS discovery and standalone full article passed');
 await nav('/en/guides/llm/?show-drafts=true#enterprise-rag-model-embedding-reranker-en');
 await wait(loaded('enterprise-rag-model-embedding-reranker-en'));
 assert.ok(await E("document.querySelector('meta[name=robots]').content.includes('noindex')"));
 assert.equal(await E("document.querySelectorAll('.llm-chapter [data-loaded=true]').length"),1);
 console.log('Draft preview direct link loads only its article and retains noindex');
 assert.deepEqual(events.filter(e=>e.method==='Runtime.exceptionThrown').map(e=>e.params.exceptionDetails),[]);
}finally{socket.end()}
