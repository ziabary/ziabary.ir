import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { call, pause, events, socket } from '../scripts/browser-session.mjs';
const origin=process.env.LLM_REVIEW_ORIGIN ?? 'http://127.0.0.1:4189';
const output=process.env.LLM_REVIEW_OUTPUT ?? 'docs/reviews/local-2026-09-15/llm-four-tables';
const ids=['model-catalog','model-suitability','software-products','specialized-models'];
const report={origin,checks:{},views:{},gate:[],mobile:[]};
async function evaluate(expression){const r=await call('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value;}
async function nav(path){await call('Page.navigate',{url:origin+path});await pause(1400);}
async function shot(name){const r=await call('Page.captureScreenshot',{format:'png'});await fs.writeFile(`${output}/${name}.png`,Buffer.from(r.data,'base64'));}
async function frame(id){await evaluate(`(()=>{const t=document.querySelector('#${id} .table-shell');t.scrollTop=0;t.scrollIntoView({behavior:'instant',block:'start'});window.scrollBy({top:-125,behavior:'instant'});})()`);await pause(180);}
try {
 await call('Emulation.setDeviceMetricsOverride',{width:1600,height:1000,deviceScaleFactor:1,mobile:false});
 for(const query of ['', '?show-drafts=false','?show-drafts=1','?show-drafts=TRUE']){
  await nav('/guides/llm/'+query);
  const result=await evaluate(`({query:location.search,views:document.querySelectorAll('.llm-view').length,robots:document.querySelector('meta[name=robots]')?.content})`);
  assert.equal(result.views,0);assert.ok(result.robots.includes('noindex'));report.gate.push(result);
 }
 await nav('/guides/?show-drafts=true');assert.equal(await evaluate(`!!document.querySelector('a[href*="/guides/llm/"]')`),true);
 await nav('/guides/?show-drafts=1');assert.equal(await evaluate(`!!document.querySelector('a[href*="/guides/llm/"]')`),false);
 await nav('/guides/llm/?show-drafts=true');
 assert.equal(await evaluate(`(document.body.innerText.match(/آخرین به‌روزرسانی راهنما:/g)||[]).length`),1);
 for(const id of ids){
  await frame(id);
  report.views[id]=await evaluate(`(()=>{const v=document.getElementById('${id}');return {rows:v.querySelectorAll('[data-row-id]').length,headers:[...v.querySelectorAll('.table-shell thead th')].map(x=>x.textContent.trim()),bodyOverflow:document.documentElement.scrollWidth>innerWidth,tableWidth:v.querySelector('.table-shell').clientWidth}})()`);
  assert.equal(report.views[id].bodyOverflow,false);
  await shot('after-table-'+id);
 }
 assert.equal(report.views['model-catalog'].rows,59);assert.equal(report.views['software-products'].rows,13);assert.equal(report.views['specialized-models'].rows,9);
 assert.ok(!report.views['model-suitability'].headers.some(x=>/نسخهٔ ارزیابی/.test(x)));
 assert.ok(!report.views['specialized-models'].headers.some(x=>/نرخ کار/.test(x)));
 // Published Qwen scores show their language caveat in the main table.
 report.checks.qwen=await evaluate(`(()=>{const rows=[...document.querySelectorAll('#specialized-models [data-row-id]')].filter(r=>r.dataset.rowId.includes('qwen3-embedding'));return rows.map(r=>r.innerText)})()`);
 assert.equal(report.checks.qwen.length,3);assert.ok(report.checks.qwen.every(x=>x.includes('امتیاز فارسی نیست')&&x.includes('گزارش ناشر')));
 await evaluate(`document.querySelector('#specialized-models [data-row-id="specialized-assessment:qwen-qwen3-embedding-0-6b"] .detail button').click()`);await pause(100);
 await evaluate(`(()=>{const result=document.querySelector('#specialized-models .published-result');result.open=true;result.scrollIntoView({behavior:'instant',block:'start'});window.scrollBy({top:-130,behavior:'instant'});})()`);await pause(150);
 const resultText=await evaluate(`document.querySelector('#specialized-models .published-result').innerText`);assert.ok(resultText.includes('commit وزن آزموده‌شده'));assert.ok(resultText.includes('گونهٔ نام‌گذاری‌شده'));await shot('after-published-evaluation-details');
 // User-selected empty column survives filtering and has the correct missing state.
 await evaluate(`document.querySelector('#specialized-models .restore-column[data-column="work-rate"]').click()`);await pause(100);
 assert.equal(await evaluate(`document.querySelectorAll('#specialized-models td[data-column="work-rate"]').length`),9);
 assert.equal(await evaluate(`[...document.querySelectorAll('#specialized-models td[data-column="work-rate"]')].every(c=>c.textContent.trim()==='—')`),true);
 await evaluate(`(()=>{const input=document.querySelector('#specialized-models input[type=search]');input.value='Qwen3-Embedding';input.dispatchEvent(new Event('input',{bubbles:true}));})()`);await pause(100);
 assert.equal(await evaluate(`document.querySelectorAll('#specialized-models td[data-column="work-rate"]').length`),3);
 // Hash copy uses the complete identifier.
 await nav('/guides/llm/?show-drafts=true');
 await evaluate(`document.querySelector('#model-catalog [data-row-id="model:qwen-qwen3-8b"] .detail button').click()`);await pause(100);
 await call('Page.bringToFront');
 await call('Browser.grantPermissions',{origin,permissions:['clipboardReadWrite','clipboardSanitizedWrite']});
 await evaluate(`(()=>{const dl=document.querySelector('#model-catalog .detail-grid');const field=[...dl.children].find(x=>x.querySelector('dt')?.textContent==='revision مدل در شناسنامه');field.querySelector('button').click()})()`);await pause(120);
 const copied=await evaluate(`navigator.clipboard.readText()`);assert.match(copied,/^[a-f0-9]{40}$/);report.checks.copiedRevision=copied;
 assert.equal(await evaluate(`[...document.querySelectorAll('#model-catalog .detail-grid a')].filter(a=>/^https?:/.test(a.href)).every(a=>a.target==='_blank')`),true);
 // Phone-sized view, both themes; each table scrolls locally, never the entire page.
 for(const theme of ['light','dark']){
  await nav('/guides/llm/?show-drafts=true');
  await call('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:false});
  await evaluate(`document.documentElement.dataset.theme='${theme}'`);
  for(const id of ids){await frame(id);const metrics=await evaluate(`({view:'${id}',theme:'${theme}',body:document.documentElement.scrollWidth,viewport:innerWidth,table:document.querySelector('#${id} .table-shell').scrollWidth})`);assert.ok(metrics.body<=metrics.viewport);report.mobile.push(metrics);await shot('after-mobile-'+theme+'-'+id);}
 }
 report.checks.noRuntimeErrors=events.filter(e=>e.method==='Runtime.exceptionThrown').length===0;assert.equal(report.checks.noRuntimeErrors,true);
 await fs.writeFile(`${output}/browser-acceptance.json`,JSON.stringify(report,null,2)+'\n');
 console.log(JSON.stringify({gate:report.gate.length,views:report.views,mobile:report.mobile.length,checks:report.checks},null,2));
} finally {await call('Page.close').catch(()=>{});socket.end();}
