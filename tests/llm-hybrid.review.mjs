import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { call, pause, events, socket } from '../scripts/browser-session.mjs';
const origin='http://127.0.0.1:4189';
const output=process.env.REVIEW_OUTPUT || 'docs/reviews/local-2026-09-16/llm-hybrid';
const report={checks:[],screenshots:[],runtimeErrors:[]};
const Q=JSON.stringify;
async function E(expression){const r=await call('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(Q(r.exceptionDetails));return r.result.value;}
async function wait(expression){for(let i=0;i<120;i++){if(await E(expression))return;await pause(100);}throw Error(expression);}
async function frame(selector){await E(`(()=>{const el=document.querySelector(${Q(selector)});window.scrollTo({top:el.getBoundingClientRect().top+scrollY-110,behavior:'instant'})})()`);await pause(200);}
async function shot(name){const r=await call('Page.captureScreenshot',{format:'png'});await fs.writeFile(`${output}/${name}.png`,Buffer.from(r.data,'base64'));report.screenshots.push(`${name}.png`);}
async function nav(hash=''){await call('Page.navigate',{url:origin+'/guides/llm/?show-drafts=true'+hash});await wait("document.querySelectorAll('.llm-chapter').length===10");await E('document.fonts.ready');await pause(400);}
try {
 await fs.mkdir(output,{recursive:true});await call('Page.enable');await call('Runtime.enable');
 await call('Emulation.setDeviceMetricsOverride',{width:1600,height:1050,deviceScaleFactor:1,mobile:false});await nav();
 assert.equal(await E("document.querySelectorAll('.llm-chapter details[open]').length"),0);
 assert.equal(await E("document.querySelectorAll('.llm-chapter .prose table').length"),42);
 assert.equal(await E("document.querySelectorAll('.katex-error').length"),0);
 assert.equal(await E("document.querySelectorAll('.llm-chapter .chapter-cover').length"),10);
 assert.equal(await E("document.querySelectorAll('.llm-chapter .chapter-title').length"),10);
 assert.ok(await E("[...document.querySelectorAll('.llm-chapter')].every(c=>c.querySelector('.chapter-title').textContent===c.querySelector('summary h3').textContent)"));
 await E("Promise.all([...document.querySelectorAll('.llm-chapter .chapter-thumb,.llm-chapter .chapter-cover')].map(img=>{img.loading='eager';return img.decode().catch(()=>{})}))");
 assert.ok(await E("[...document.querySelectorAll('.llm-chapter .chapter-thumb,.llm-chapter .chapter-cover')].every(img=>img.complete&&img.naturalWidth>0)"));

 assert.equal(await E("document.querySelectorAll('#related-content').length"),0);
 assert.ok(await E("!!document.querySelector('[data-reading-for=\"model-suitability\"] .reading-card[href=\"/articles/rag-cag-kag-fine-tuning-instruction-tuning/\"]')"));

 assert.ok(await E("document.querySelector('#specialized-models').getBoundingClientRect().top < document.querySelector('#llm-notes').getBoundingClientRect().top"));
 assert.equal(await E("(()=>{const ids=[...document.querySelectorAll('[id]')].map(el=>el.id);return ids.length-new Set(ids).size})()"),0);
 await E("document.documentElement.dataset.theme='dark'");
 await call('Emulation.setDeviceMetricsOverride',{width:1920,height:1080,deviceScaleFactor:1,mobile:false});await frame('.guide-overview');
 assert.ok(await E("document.querySelector('.guide-main').getBoundingClientRect().width>1400"));
 assert.ok(await E("Math.abs(document.querySelector('.collection-cover').getBoundingClientRect().top-document.querySelector('.start').getBoundingClientRect().top)<2"));
 assert.equal(await E("getComputedStyle(document.querySelector('.guide-layout')).display"),'grid');
 await shot('desktop-wide-overview');
 await frame('#model-catalog');await shot('desktop-wide-table');
 await frame('[data-reading-for="model-suitability"]');await pause(400);await shot('desktop-compact-cards');
 assert.ok(await E("[...document.querySelectorAll('.reading-card img')].every(el=>el.getBoundingClientRect().width<=112)"));
 assert.equal(await E("getComputedStyle(document.querySelector('[data-reading-for=\"model-suitability\"] .reading-cards')).gridTemplateColumns.split(' ').length"),3);

 await call('Emulation.setDeviceMetricsOverride',{width:1600,height:1050,deviceScaleFactor:1,mobile:false});
 await frame('#llm-notes');await shot('desktop-notes');
 await frame('[data-reading-for="hardware-feasibility"]');await wait("[...document.querySelectorAll('[data-reading-for=\"hardware-feasibility\"] .reading-card img')].every(i=>i.complete&&i.naturalWidth>0)");
 assert.equal(await E("document.querySelectorAll('[data-reading-for=\"hardware-feasibility\"] .reading-card').length"),5);
 assert.ok(await E("[...document.querySelectorAll('.reading-card')].every(a=>a.querySelector('h4')?.textContent&&a.querySelector('p')?.textContent&&a.querySelector('img'))"));
 await shot('desktop-table-actions');
 await frame('[data-reading-for="hardware-feasibility"] .reading-card:nth-child(3)');await pause(400);await shot('desktop-integrated-articles');
 const brokenCards=await E(`(async()=>{const urls=[...new Set([...document.querySelectorAll('.reading-card[href^="/articles/"]')].map(a=>a.getAttribute('href')))];const broken=[];for(const url of urls){const response=await fetch(url);const doc=new DOMParser().parseFromString(await response.text(),'text/html');const hash=new URL(url,location.origin).hash.slice(1);if(!response.ok||(hash&&!doc.getElementById(decodeURIComponent(hash))))broken.push(url)}return broken})()`);
 assert.deepEqual(brokenCards,[]);
 report.checks.push('Related concept articles share the table cards; the separate site-related list is removed and all article destinations and fragments resolve.');

 const href=await E("document.querySelector('[data-reading-for=\"hardware-feasibility\"] a').getAttribute('href')");
 await E("document.querySelector('[data-reading-for=\"hardware-feasibility\"] a').click()");
 await wait(`document.querySelector(${Q(href+' details')}).open`);await pause(400);
 await wait(`Math.abs(document.querySelector(${Q(href)}).getBoundingClientRect().top-100)<80`);
 await frame(href);
 await E(`document.querySelector(${Q(href+' .chapter-cover')}).decode()`);
 assert.ok(await E(`(()=>{const c=document.querySelector(${Q(href)});return c.querySelector('.chapter-title').getBoundingClientRect().top>=c.querySelector('.chapter-cover').getBoundingClientRect().bottom})()`));
 await shot('desktop-open-note');
 assert.ok(await E(`(()=>{const el=document.querySelector(${Q(href+' .chapter-chevron')});const a=el.getBoundingClientRect(),b=el.querySelector('svg').getBoundingClientRect();return Math.abs(a.left+a.width/2-b.left-b.width/2)<1&&Math.abs(a.top+a.height/2-b.top-b.height/2)<1})()`));

 const heading=await E(`document.querySelector(${Q(href+' .prose h2[id]')}).id`);
 await nav('#'+encodeURIComponent(heading));await wait(`document.querySelector(${Q(href+' details')}).open`);
 await frame('#'+heading);
 await wait(`!!document.querySelector('.desktop-toc a[aria-current="location"][href="#'+${Q(heading)}+'"]')`);
 await shot('desktop-heading-navigation');
 report.checks.push('Tables precede ten initially collapsed articles; 42 embedded tables and math render without duplicate IDs.', 'Article cards open and scroll to the correct note; direct heading URLs reveal their note and highlight the contents entry.');
 for(const width of [390,320]){
  await call('Emulation.setDeviceMetricsOverride',{width,height:900,deviceScaleFactor:1,mobile:true});await nav();
  await E(`document.documentElement.dataset.theme=${Q(width===320?'light':'dark')}`);await frame('#llm-notes');await shot('mobile-'+width+'-notes');
  assert.ok(await E(`document.documentElement.scrollWidth<=${width+1}`));
  assert.ok(await E("document.querySelector('.mobile-navigation').getBoundingClientRect().top>=document.querySelector('.guide-overview').getBoundingClientRect().bottom-1"));
  await frame('.guide-overview');await shot('mobile-'+width+'-overview');
  await frame('[data-reading-for="hardware-feasibility"]');await pause(500);await shot('mobile-'+width+'-related-cards');
  assert.ok(await E("[...document.querySelectorAll('.reading-card h4,.reading-card p')].every(el=>el.scrollWidth<=el.clientWidth+1)"));
  assert.ok(await E(`document.documentElement.scrollWidth<=${width+1}`));
  await E("document.querySelector('#four-bit-model-quantization summary').click()");await frame('#four-bit-model-quantization .prose-table-scroll');
  assert.ok(await E(`document.documentElement.scrollWidth<=${width+1}`));await shot('mobile-'+width+'-open-table');
  await E("document.querySelector('.mobile-toc').open=true");await frame('.mobile-toc');await shot('mobile-'+width+'-contents');
 }
 report.checks.push('390px dark and 320px light layouts keep closed cards, open article tables and grouped contents inside the viewport.');
 report.runtimeErrors=events.filter(e=>e.method==='Runtime.exceptionThrown');assert.deepEqual(report.runtimeErrors,[]);
 await fs.writeFile(output+'/browser-review.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));
}finally{await call('Page.close').catch(()=>{});socket.end();}
