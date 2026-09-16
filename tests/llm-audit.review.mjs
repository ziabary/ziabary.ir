import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { call, pause, events, socket } from '../scripts/browser-session.mjs';
const out='docs/reviews/local-2026-09-16/llm-audit';
const base='http://127.0.0.1:4189/guides/llm/';
async function E(expression) { const r=await call('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true}); if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails)); return r.result.value; }
async function wait(expression) { for(let i=0;i<200;i++){if(await E(expression))return;await pause(100);}throw Error(expression); }
async function search(id,value) {await E(`(()=>{const input=document.querySelector('#${id} input[type=search]');input.value=${JSON.stringify(value)};input.dispatchEvent(new Event('input',{bubbles:true}));})()`);await pause(250);}
try {
 await call('Runtime.enable');await call('Page.enable');
 await call('Emulation.setDeviceMetricsOverride',{width:1600,height:1000,deviceScaleFactor:1,mobile:false});
 await call('Page.navigate',{url:base});await wait('document.readyState === "complete"');await pause(300);
 assert.equal(await E("!!document.querySelector('section#model-catalog')"),false);
 await call('Page.navigate',{url:base+'?show-drafts=true'});await wait("!!document.querySelector('#model-catalog tbody tr[data-row-id]')");await E('document.fonts.ready');
 const report={draftGate:true,checks:[],viewports:[]};
 await search('model-catalog','Tooka');
 assert.equal(await E("document.querySelectorAll('#model-catalog tbody tr[data-row-id]').length"),2);
 await E("document.querySelector('#model-catalog tbody').scrollIntoView({behavior:'instant'})");
 await wait("[...document.querySelectorAll('#model-catalog tbody img')].every(img=>img.complete&&img.naturalWidth>0)");
 assert.ok(await E("[...document.querySelectorAll('#model-catalog tbody img')].every(img=>new URL(img.src).origin===location.origin)"));
 report.checks.push('Tooka: two catalog rows, local loaded logos');
 await search('model-catalog','Qwen3.5-35B-A3B');
 const qwen=await E("document.querySelector('#model-catalog tbody').innerText");assert.match(qwen,/MoE/);assert.match(qwen,/۳ میلیارد فعال/);report.checks.push('Qwen3.5: MoE and 3 billion active parameters');
 await search('hardware-feasibility','Qwen2.5-Coder-32B');
 const budget=await E("[...document.querySelectorAll('#hardware-feasibility tbody tr[data-row-id]')].find(row=>row.innerText.includes('Q4_K_M'))?.querySelector('[data-column=budget]')?.innerText");assert.match(budget,/۲۲[٫.]۴۹/);report.checks.push('Coder 32B Q4: 22.49 GiB at 8192 tokens, one request');
 await search('specialized-models','Tooka');assert.equal(await E("document.querySelectorAll('#specialized-models tbody tr[data-row-id]').length"),2);
 await search('specialized-models','bge-m3');const bge=await E("document.querySelector('#specialized-models tbody').innerText");assert.match(bge,/MIRACL/);assert.match(bge,/۵۷[٫.]۷/);report.checks.push('specialized rows retain MIRACL Persian dense 57.7');
 await search('software-products','Text Generation Inference');assert.match(await E("document.querySelector('#software-products tbody').innerText"),/آرشیو|بایگانی/);report.checks.push('TGI archive visible');
 await search('software-products','FlagEmbedding');assert.equal(await E("document.querySelectorAll('#software-products tbody tr[data-row-id]').length"),1);report.checks.push('new runtime library is visible');
 for(const [width,theme] of [[1600,'dark'],[390,'dark'],[390,'light']]){
  await call('Emulation.setDeviceMetricsOverride',{width,height:1000,deviceScaleFactor:1,mobile:width<600});
  await E(`document.documentElement.dataset.theme='${theme}';document.querySelector('#specialized-models .table-shell').scrollIntoView({behavior:'instant'})`);await pause(300);
  const overflow=await E('document.documentElement.scrollWidth>innerWidth');assert.equal(overflow,false);
  const shot=await call('Page.captureScreenshot',{format:'png'});await fs.writeFile(`${out}/specialized-${width}-${theme}.png`,Buffer.from(shot.data,'base64'));
  report.viewports.push({width,theme,pageOverflow:false});
 }
 assert.deepEqual(events.filter(e=>e.method==='Runtime.exceptionThrown'),[]);report.runtimeErrors=0;
 await fs.writeFile(out+'/browser-review.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report));
} finally {await call('Page.close').catch(()=>{});socket.end();}
