import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {call,pause,events,socket} from '../scripts/browser-session.mjs';
const origin=process.env.LLM_REVIEW_ORIGIN??'http://127.0.0.1:4189';
const output=process.env.LLM_REVIEW_OUTPUT??'docs/reviews/local-2026-09-15/llm-v03';
const report={origin,checks:[],screenshots:[]};
async function E(expression){const result=await call('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(result.exceptionDetails)throw Error(JSON.stringify(result.exceptionDetails));return result.result.value;}
async function wait(expression){for(let i=0;i<80;i++){if(await E(expression))return;await pause(150);}throw Error('Timed out: '+expression);}
async function nav(path=''){await call('Page.navigate',{url:origin+'/guides/llm/?show-drafts=true'+path});await wait(`document.querySelectorAll('#model-catalog tr[data-row-id]').length===87`);await E(`document.documentElement.style.scrollBehavior='auto'`);await pause(400);}
async function frame(selector){await E(`window.scrollTo({top:document.querySelector(${JSON.stringify(selector)}).getBoundingClientRect().top+scrollY-100,behavior:'instant'})`);await pause(250);}
async function shot(name){await pause(200);const result=await call('Page.captureScreenshot',{format:'png'});await fs.writeFile(output+'/'+name+'.png',Buffer.from(result.data,'base64'));report.screenshots.push(name+'.png');}
async function select(selector,value){await E(`{const e=document.querySelector(${JSON.stringify(selector)});e.value=${JSON.stringify(String(value))};e.dispatchEvent(new Event('change',{bubbles:true}));}`);await pause(250);}
async function input(selector,value){await E(`{const e=document.querySelector(${JSON.stringify(selector)});e.value=${JSON.stringify(String(value))};e.dispatchEvent(new Event('input',{bubbles:true}));}`);await pause(250);}
async function click(selector){await E(`document.querySelector(${JSON.stringify(selector)}).click()`);await pause(300);}
const count=id=>E(`document.querySelectorAll('#${id} tr[data-row-id]').length`);
const text=selector=>E(`document.querySelector(${JSON.stringify(selector)}).innerText`);
const control=(id,index)=>`#${id} .control-row select:nth-of-type(1)`; // labels scoped below for unambiguous control selection
const memory='#hardware-feasibility';
const memSelect=index=>memory+` .control-row label:nth-child(${index}) select`;
try{
 await fs.mkdir(output,{recursive:true});await call('Page.enable');await call('Runtime.enable');await call('Page.bringToFront');
 await call('Emulation.setDeviceMetricsOverride',{width:1600,height:1050,deviceScaleFactor:1,mobile:false});await nav();
 assert.equal(await count('hardware-feasibility'),56);assert.equal(await count('benchmarks'),4);
 assert.equal(await E(`!!document.querySelector('#economics, [data-cost-tool], [data-controls-for="economics"]')`),false);
 assert.equal(await E(`document.querySelectorAll('.desktop-paths a').length`),4);
 assert.match(await text('.start footer'),/۷ جدول تعاملی/);
 const menuTargets=await E(`Array.from(document.querySelectorAll('.desktop-toc nav a')).map(a=>({href:a.getAttribute('href'),exists:!!document.getElementById(new URL(a.href).hash.slice(1))}))`);
 assert.ok(menuTargets.every(item=>item.exists),JSON.stringify(menuTargets.filter(item=>!item.exists)));
 assert.equal(await E(`/RunPod|ساعات صورتحساب|هزینهٔ اجاره و سناریوهای پردازش/i.test(document.querySelector('.llm-guide').innerText)`),false);
 report.checks.push('Rental table, calculators and their entry path are absent; four start links, seven tables and valid navigation targets remain.');

 await E(`document.documentElement.dataset.theme='dark'`);await frame('.guide-overview');await shot('desktop-start');
 assert.equal(await count('specialized-models'),20);assert.equal(await count('model-suitability'),87);
 const chip=(id,filter,label)=>E(`(()=>{const labels=[...document.querySelectorAll('#${id} [data-filter-id="${filter}"] label')];const option=labels.find(e=>e.innerText.trim().toLowerCase().startsWith(${JSON.stringify(label.toLowerCase())}));if(!option)throw Error('Missing option');option.querySelector('input').click();})()`);
 const chipCount=(filter,label)=>E(`(()=>{const e=[...document.querySelectorAll('#model-catalog [data-filter-id="${filter}"] label')].find(e=>e.innerText.trim().toLowerCase().startsWith(${JSON.stringify(label.toLowerCase())}));return e?.querySelector('small')?.innerText})()`);
 assert.equal(await chipCount('download-format','ollama'),'(۶۲)');assert.equal(await chipCount('download-format','gguf'),'(۸۵)');assert.equal(await chipCount('download-format','onnx'),'(۱۵)');
 await chip('model-catalog','download-format','ollama');await wait(`document.querySelectorAll('#model-catalog tr[data-row-id]').length===62`);
 await frame('#model-catalog');await shot('desktop-ollama-filter');
 await input('#model-catalog input[type=search]','qwen');const qwenCount=await count('model-catalog');assert.ok(qwenCount>0&&qwenCount<62);const chipQwen=await chipCount('download-format','ollama');assert.equal(chipQwen,'('+new Intl.NumberFormat('fa-IR').format(qwenCount)+')');
 await chip('model-catalog','download-format','ollama');await input('#model-catalog input[type=search]','');await chip('model-catalog','download-format','gguf');assert.equal(await count('model-catalog'),85);await chip('model-catalog','download-format','gguf');
 await chip('model-catalog','run-engine','Ollama');assert.equal(await count('model-catalog'),62);await chip('model-catalog','run-engine','Ollama');
 const bge=await E(`[...document.querySelectorAll('#specialized-models tr[data-row-id]')].find(e=>e.querySelector('.profile-link bdi')?.innerText.trim()==='bge-m3')?.innerText`);assert.match(bge,/MIRACL/);assert.match(bge,/۵۷٫۷/);assert.match(bge,/Dense/);assert.match(bge,/فارسی/);await frame('#specialized-models .column-toolbar');await shot('desktop-specialized-quality');
 report.checks.push('Download and execution-route filters count 62 Ollama models and 85 GGUF models; ONNX counts 15; counts update with Qwen search and Persian numerals.');
 await input('#model-catalog input[type=search]','Kimi-K2.5');assert.equal(await count('model-catalog'),1);await E(`document.querySelector('#model-catalog tr[data-row-id] img').decode()`);
 await click('#model-catalog .profile-link');await wait(`document.querySelector('dialog').open`);await E(`Array.from(document.querySelectorAll('.profile-tabs button')).find(e=>e.innerText==='دریافت مدل').click()`);await pause(250);assert.ok(await E(`document.querySelectorAll('.download-card').length>1`));await shot('desktop-kimi-downloads');await click('.close-profile');await input('#model-catalog input[type=search]','');
 await select(memSelect(1),'weights');assert.equal(await count('hardware-feasibility'),257);await frame(memory+' .column-toolbar');await shot('desktop-file-footprint');assert.match(await text(memory+' tbody'),/فقط اندازهٔ فایل/);await select(memSelect(1),'gpu');assert.equal(await count('hardware-feasibility'),56);
 report.checks.push('87 models, 20 specialized models, 257 file footprints and 56 default GPU planning rows render; new Kimi profile has a local logo and exact downloads.');

 await frame(memory);await shot('desktop-memory-controls');
 await input(memory+' input[type=search]','Qwen3-32B');await select(memory+' [data-filter-id=quant] select','Q4_K_M');assert.equal(await count('hardware-feasibility'),1);
 const rowText=await text(memory+' tr[data-row-id]');assert.match(rowText,/۲۲٫۴ GiB/);assert.match(rowText,/حاشیهٔ کم/);assert.match(rowText,/نیازمند تقسیم مدل/);
 await frame(memory+' .column-toolbar');await shot('desktop-memory-8k');
 await select(memSelect(2),32768);assert.match(await text(memory+' tr[data-row-id]'),/۲۸٫۴ GiB/);assert.match(await text(memory+' tr[data-row-id]'),/بیش از بودجه/);
 await select(memSelect(2),8192);await input(memory+' input[aria-label="درخواست فعال هم‌زمان"]',8);assert.match(await text(memory+' tr[data-row-id]'),/۳۶٫۴ GiB/);report.checks.push('context and concurrent requests change the budget and fit classification');
 await click(memory+' td.detail button');assert.equal(await E(`document.querySelector('dialog').open`),false);assert.equal(await E(`!!document.querySelector('#hardware-feasibility .detail-row')`),true);
 await frame(memory+' .detail-row');await shot('desktop-memory-details');await click(memory+' td.detail button');
 await click(memory+' .profile-link');await wait(`document.querySelector('dialog').open`);await E(`Array.from(document.querySelectorAll('.profile-tabs button')).find(e=>e.innerText==='حافظه و اجرا').click()`);await pause(400);assert.match(await text('.model-profile'),/بودجه با یک GPU/);await shot('desktop-model-memory');
 await E(`Array.from(document.querySelectorAll('.profile-tabs button')).find(e=>e.innerText==='دریافت مدل').click()`);await pause(300);assert.match(await text('.model-profile'),/Q4_K_M/);await click('.close-profile');report.checks.push('scenario details stay inline and model opens the shared profile with memory and pinned downloads');
 await input('#model-catalog input[type=search]','Qwen3-8B');await click('#model-catalog .profile-link');await wait(`document.querySelector('dialog').open`);await E(`Array.from(document.querySelectorAll('.profile-tabs button')).find(e=>e.innerText==='حافظه و اجرا').click()`);await pause(200);await click('.research-profile .links a');await wait(`!document.querySelector('dialog').open`);assert.equal(await count('hardware-feasibility'),2);assert.equal(await E(`document.querySelector('#hardware-feasibility input[type=search]').value`),'');report.checks.push('client navigation from a different model clears stale table search and leaves unrelated views unfiltered');
 await input(memory+' input[type=search]','');await select(memory+' [data-filter-id=quant] select','');await input(memory+' input[aria-label="درخواست فعال هم‌زمان"]',1);await select(memSelect(1),'cpu');assert.equal(await count('hardware-feasibility'),59);
 await input(memory+' input[type=search]','SmolLM2');assert.equal(await count('hardware-feasibility'),7);await frame(memory+' .column-toolbar');await shot('desktop-cpu');
 await input(memory+' input[type=search]','');await select(memSelect(1),'layerwise');assert.equal(await count('hardware-feasibility'),3);assert.match(await text(memory+' tbody'),/۳۶۰GB/);await frame(memory+' .column-toolbar');await shot('desktop-airllm');
 await select(memSelect(1),'publisher');assert.equal(await count('hardware-feasibility'),2);report.checks.push('CPU FP32, AirLLM and GPT-OSS publisher claims have distinct routes');
 await nav('&view=deployment-compatibility#serving-software');await wait(`document.querySelector('#deployment-compatibility')`);assert.equal(await count('deployment-compatibility'),305);
 await select('#deployment-compatibility [data-filter-id=task] select','embedding');assert.ok(await count('deployment-compatibility')>3);await frame('#deployment-compatibility .column-toolbar');await shot('desktop-embedding-route');
 await select('#deployment-compatibility .control-row select','kernels');assert.equal(await count('deployment-compatibility'),12);await select('#deployment-compatibility [data-filter-id=architecture] select','Ampere');assert.equal(await count('deployment-compatibility'),4);await frame('#deployment-compatibility .column-toolbar');await shot('desktop-kernel-support');report.checks.push('deployment task/engine scope and architecture kernel filters return actual rows');
 await frame('#benchmarks .column-toolbar');await shot('desktop-performance');
 await select('#benchmarks [data-filter-id=engine] select','vLLM');await select('#benchmarks .control-row label:first-child select','qwen-transformers-h20-6144-2048');assert.equal(await count('benchmarks'),14);assert.match(await text('#benchmarks tbody'),/مجموع ورودی و خروجی/);assert.ok(!(await E(`[...document.querySelectorAll('#benchmarks .control-row label:nth-child(2) option')].map(e=>e.value)`)).includes('outputTokensPerSecond'));
 await select('#benchmarks .control-row label:first-child select','llamacpp-llama2-7b-q4-fa');await select('#benchmarks .control-row label:nth-child(2) select','decode128TokensPerSecond');assert.match(await text('#benchmarks tbody'),/tg128/);
 await select('#benchmarks .control-row label:first-child select','main-horse-gpt-fast-synthetic');assert.equal(await count('benchmarks'),3);assert.equal(await E(`document.querySelectorAll('#benchmarks .profile-link').length`),0);await frame('#benchmarks .column-toolbar');await shot('desktop-synthetic-scope');report.checks.push('prefill/decode/combined/aggregate metrics are separate; synthetic architectures have no false model profile');
 await nav('&view=benchmarks&research-model=model%3Aqwen-qwen3-32b#benchmarks');assert.equal(await E(`document.querySelector('#benchmarks .control-row select').value`),'qwen-transformers-h20-6144-2048');assert.ok(await count('benchmarks')>0);assert.equal(await count('hardware-feasibility'),56);
 await nav('&research-model=model%3Ahuggingfacetb-smollm2-135m-instruct#hardware-feasibility');assert.equal(await E(`document.querySelector('#hardware-feasibility .control-row select').value`),'gpu');assert.equal(await count('hardware-feasibility'),2);report.checks.push('profile-to-table deep links select the matching model and research group/CPU route');
 for(const width of [390,320]){
  await call('Emulation.setDeviceMetricsOverride',{width,height:900,deviceScaleFactor:1,mobile:true});await nav('&view=deployment-compatibility');await wait(`document.querySelector('#deployment-compatibility')`);
  for(const theme of ['dark','light']){
   await E(`document.documentElement.dataset.theme='${theme}'`);assert.equal(await E(`document.documentElement.scrollWidth<=${width}+1`),true);
   for(const id of ['hardware-feasibility','deployment-compatibility','benchmarks']){await frame('#'+id+' .column-toolbar');await shot(`mobile-${width}-${theme}-${id}`);const bounds=await E(`(()=>{const e=document.querySelector('#${id} .table-shell');return {w:e.clientWidth,s:e.scrollWidth,p:document.documentElement.scrollWidth}})()`);assert.ok(bounds.w<=width&&bounds.s>=bounds.w&&bounds.p<=width+1,JSON.stringify({id,width,bounds}));}
  }
  await click('#hardware-feasibility .profile-link');await wait(`document.querySelector('dialog').open`);await E(`Array.from(document.querySelectorAll('.profile-tabs button')).find(e=>e.innerText==='حافظه و اجرا').click()`);await pause(200);assert.equal(await E(`document.querySelector('dialog').scrollWidth<=document.querySelector('dialog').clientWidth+1`),true);await shot(`mobile-${width}-profile`);await click('.close-profile');
 }
 report.checks.push('three research tables and model research profile fit 390px/320px in both themes; horizontal scrolling is confined to tables');
 await nav();await E(`Promise.all([...document.querySelectorAll('.llm-guide img')].map(i=>{i.loading='eager';return i.decode().catch(()=>{});} ))`);
 const logos=await E(`[...document.querySelectorAll('.llm-guide img')].map(i=>({src:i.getAttribute('src'),loaded:i.naturalWidth>0}))`);assert.ok(logos.every(i=>i.src.startsWith('/images/')&&i.loaded));report.localImages=logos.length;
 assert.equal(await E(`[...document.querySelectorAll('.llm-guide a[href^="https://"]')].every(a=>a.target==='_blank')`),true);
 const links=await E(`[...document.querySelectorAll('.view-reading a, .hardware-picker a, .related a')].map(a=>a.href)`);const broken=[];
 for(const href of [...new Set(links)]){const url=new URL(href);if(url.origin!==origin)continue;const response=await fetch(url);if(!response.ok)broken.push(href);else if(url.hash&&!url.pathname.includes('/guides/llm')){const html=await response.text();if(!html.includes('id="'+decodeURIComponent(url.hash.slice(1))+'"'))broken.push(href);}}
 assert.deepEqual(broken,[]);report.internalLinksChecked=links.length;
 await call('Page.navigate',{url:origin+'/guides/llm/?research-model=model:qwen-qwen3-8b'});await pause(700);assert.equal(await E(`!!document.querySelector('.llm-guide')`),false);
 report.checks.push('local logos, external-link targets, internal article fragments and strict draft gate remain correct');
 report.runtimeErrors=events.filter(e=>e.method==='Runtime.exceptionThrown');assert.deepEqual(report.runtimeErrors,[]);
 await fs.writeFile(output+'/browser-review.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
}finally{await call('Page.close');socket.end();}
