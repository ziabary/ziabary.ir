import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {call,pause,events,socket} from '../scripts/browser-session.mjs';
const origin=process.env.LLM_REVIEW_ORIGIN??'http://127.0.0.1:4189';
const output=process.env.LLM_REVIEW_OUTPUT??'docs/reviews/local-2026-09-15/llm-profiles';
const report={origin,checks:[],screenshots:[]};
async function E(expression){const r=await call('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value;}
async function wait(expression){for(let i=0;i<60;i++){if(await E(expression))return;await pause(150);}throw Error('Timed out: '+expression);}
async function nav(path){await call('Page.navigate',{url:origin+path});await pause(1200);}
async function click(selector){await E(`{const e=document.querySelector(${JSON.stringify(selector)});if(!e)throw Error('Missing selector');e.focus();e.click();}`);await pause(300);}
async function frame(selector){await E(`document.querySelector(${JSON.stringify(selector)}).scrollIntoView({block:'start',behavior:'instant'});scrollBy(0,-110)`);await pause(250);}
async function search(id,text){await E(`{const e=document.querySelector('#${id} .search-row input[type="search"]');e.value=${JSON.stringify(text)};e.dispatchEvent(new Event('input',{bubbles:true}));}`);await pause(180);}
async function shot(name){await pause(200);const r=await call('Page.captureScreenshot',{format:'png'});await fs.writeFile(`${output}/${name}.png`,Buffer.from(r.data,'base64'));report.screenshots.push(name+'.png');}
async function close(){await call('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});await call('Input.dispatchKeyEvent',{type:'keyUp',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});await wait(`!document.querySelector('dialog').open`);}
const base='/guides/llm/?show-drafts=true&view=model-suitability&preset=task-first';
try{
 await fs.mkdir(output,{recursive:true});await call('Page.enable');await call('Runtime.enable');
 await call('Emulation.setDeviceMetricsOverride',{width:1600,height:1100,deviceScaleFactor:1,mobile:false});
 await nav(base);await wait(`document.querySelectorAll('#model-catalog tbody tr[data-row-id]').length===59`);
 await E(`document.documentElement.dataset.theme='dark'`);
 await frame('.guide-overview');await shot('desktop-hero');
 const hero=await E(`(()=>{const c=document.querySelector('.collection-cover').getBoundingClientRect(),o=document.querySelector('.guide-overview #start').getBoundingClientRect(),w=document.querySelector('.guide-overview').getBoundingClientRect();return {width:c.width,container:w.width,sameRow:Math.abs(c.top-o.top)<2};})()`);
 assert.ok(hero.sameRow&&hero.width<hero.container*.65);report.hero=hero;
 for(const id of ['model-catalog','model-suitability','software-products','specialized-models']){await frame('#'+id+' .table-shell');await shot('desktop-'+id);}
 await search('model-suitability','bge-m3');await frame('#model-suitability .table-shell');
 const trigger='#model-suitability .profile-link';await click(trigger);await wait(`document.querySelector('dialog').open`);
 assert.match(await E(`document.querySelector('dialog').innerText`),/متراکم، تنک و چندبرداری/);
 assert.equal(await E(`document.querySelector('dialog').scrollWidth <= document.querySelector('dialog').clientWidth+1`),true);
 assert.equal(await E(`document.activeElement.classList.contains('profile-title')`),true);
 assert.equal(await E(`new URL(location.href).searchParams.get('preset')`),'task-first');
 await shot('desktop-bge-profile');
 await click('.profile-tabs button:nth-child(2)');await wait(`document.querySelectorAll('.download-card').length>0`);
 await E(`document.querySelector('.model-profile').scrollTop=0`);await shot('desktop-bge-downloads');
 assert.match(await E(`document.querySelector('dialog').innerText`),/شخص ثالث/);
 await call('Browser.grantPermissions',{origin,permissions:['clipboardReadWrite','clipboardSanitizedWrite']});await call('Page.bringToFront');await click('dialog footer button:nth-of-type(2)');await wait(`document.querySelector('dialog [role="status"]').innerText.includes('کپی شد')`);assert.equal(await E('navigator.clipboard.readText()'),await E('location.href'));
 const deepLink=await E('location.href');report.profileUrl=deepLink;
 await close();assert.equal(await E(`document.activeElement===document.querySelector(${JSON.stringify(trigger)})`),true);
 assert.equal(await E(`document.querySelector('#model-suitability .search-row input[type="search"]').value`),'bge-m3');
 assert.equal(await E(`new URL(location.href).searchParams.has('model')`),false);
 report.checks.push('shared profile, Escape, focus return and filters/preset preserved');
 await search('model-suitability','');
 await E(`{const e=[...document.querySelectorAll('#model-suitability [data-filter-id="application"] label')].find(e=>e.innerText.includes('RAG'));e.querySelector('input').click();}`);await pause(250);
 const rag=await E(`Array.from(document.querySelectorAll('#model-suitability tbody tr[data-row-id]')).map(r=>r.innerText).join(' | ')`);
 assert.match(rag,/bge-m3/);assert.match(rag,/reranker/);assert.match(rag,/تولید پاسخ از سند/);
 await shot('desktop-rag-roles');report.checks.push('RAG retrieval, reranking and grounded generation coexist with explicit roles');
 await nav(base+'&usage=matrix');await wait(`document.querySelector('#model-suitability th[data-column="document-vision"]')`);
 assert.equal(await E(`document.querySelectorAll('#model-suitability tbody tr[data-row-id]').length`),50);
 await frame('#model-suitability .table-shell');await shot('desktop-use-matrix');
 await search('model-suitability','gemma-3-1b');
 assert.match(await E(`document.querySelector('#model-suitability tbody').innerText`),/ورودی متنی/);
 report.checks.push('matrix contains 50 generators, text-only limitation is explicit');
 await nav('/guides/llm/?show-drafts=true&view=model-catalog');await wait(`document.querySelector('#model-catalog [data-filter-id="download-format"]')`);
 await E(`Array.from(document.querySelectorAll('#model-catalog [data-filter-id="download-format"] label')).find(e=>e.innerText.trim()==='gguf').querySelector('input').click()`);await pause(250);
 const count=await E(`document.querySelectorAll('#model-catalog tbody tr[data-row-id]').length`);assert.equal(count,19);report.ggufModels=count;
 await search('model-catalog','Qwen3-8B');await frame('#model-catalog .table-shell');await shot('desktop-gguf-qwen');
 await click('#model-catalog .model-start button');await wait(`document.querySelector('dialog').open`);
 const downloads=await E(`document.querySelector('dialog').innerText`);assert.match(downloads,/Q4_K_M/);assert.match(downloads,/Q8_0/);await shot('desktop-qwen-downloads');await close();
 for(const name of ['SmolLM2-360M','Qwen3-Coder-30B']){
  await nav(base);await wait(`document.querySelector('#model-catalog .profile-link')`);await search('model-catalog',name);await click('#model-catalog .model-start button:last-child');await wait(`document.querySelector('dialog').open`);
  assert.match(await E(`document.querySelector('dialog pre').innerText`),/apply_chat_template/);await shot('desktop-run-'+(name.includes('Smol')?'slm':'coder'));await close();
 }
 await nav(deepLink.replace(origin,''));await wait(`document.querySelector('dialog')?.open`);assert.match(await E(`document.querySelector('dialog').innerText`),/bge-m3/);await close();report.checks.push('profile deep link and verified download/run panels');
 for(const theme of ['dark','light']){
  await call('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});await nav(base);await wait(`document.querySelector('#model-catalog .profile-link')`);await E(`document.documentElement.dataset.theme='${theme}'`);
  assert.equal(await E(`document.documentElement.scrollWidth<=innerWidth+1`),true);
  for(const id of ['model-catalog','model-suitability','software-products','specialized-models']){await frame('#'+id+' .table-shell');await shot('mobile-'+theme+'-'+id);}
  await click('#specialized-models .profile-link');await wait(`document.querySelector('dialog').open`);assert.equal(await E(`document.querySelector('dialog').scrollWidth<=document.querySelector('dialog').clientWidth+1`),true);assert.equal(await E(`getComputedStyle(document.querySelector('.profile-tabs')).flexDirection`),'row');assert.equal(await E(`document.querySelector('.profile-header .profile-logo').getBoundingClientRect().width`),38);await shot('mobile-'+theme+'-bge-profile');await close();
 }
 await nav('/guides/llm/?model=model%3Abaai-bge-m3&panel=downloads');await pause(500);assert.equal(await E(`!!document.querySelector('.llm-guide')`),false);
 await nav('/guides/');assert.equal(await E(`!!document.querySelector('a[href*="/guides/llm/"]')`),false);report.checks.push('draft page and card remain gated');
 await nav(base);await wait(`document.querySelectorAll('.branded-name img').length>50`);await E(`Promise.all([...document.querySelectorAll('.branded-name img')].map(i=>{i.loading='eager';return i.decode().catch(()=>{});} ))`);
 const logos=await E(`Array.from(document.querySelectorAll('.branded-name img')).map(i=>({src:i.getAttribute('src'),loaded:i.naturalWidth>0,width:i.getBoundingClientRect().width,height:i.getBoundingClientRect().height}))`);
 assert.ok(logos.every(i=>i.src.startsWith('/images/')&&i.loaded&&i.width===34&&i.height===34));report.logoCount=logos.length;
 assert.equal(await E(`Array.from(document.querySelectorAll('.llm-guide a[href^="https://"]')).every(a=>a.target==='_blank')`),true);
 report.checks.push('local logos load at equal dimensions; external links use new tabs; desktop/mobile have no page overflow');
 const errors=events.filter(e=>e.method==='Runtime.exceptionThrown');assert.equal(errors.length,0,JSON.stringify(errors));report.runtimeErrors=errors;
 await fs.writeFile(output+'/browser-review.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));
}finally{await call('Page.close');socket.end();}
