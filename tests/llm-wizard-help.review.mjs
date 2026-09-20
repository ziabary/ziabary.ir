import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {call,pause,events,socket} from '../scripts/browser-session.mjs';
const root=process.env.REVIEW_ORIGIN??'http://127.0.0.1:5196',out='docs/reviews/local-2026-09-19/wizard-help';
const E=async expression=>{const r=await call('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value};
async function wait(expression){for(let i=0;i<140;i++){if(await E(expression))return;await pause(150)}throw Error('Timeout: '+expression)}
async function nav(locale='fa',extra=''){await E('window.__leaving=true');await call('Page.navigate',{url:root+(locale==='fa'?'':'/'+locale)+'/guides/llm/?show-drafts=true'+extra});await wait('window.__leaving===undefined && !!document.querySelector(".organization-start")');await pause(800);await E('document.fonts.ready');}
async function click(selector){await E(`document.querySelector(${JSON.stringify(selector)}).click()`);await pause(150)}
async function shot(name){await fs.writeFile(out+'/'+name+'.png',Buffer.from((await call('Page.captureScreenshot',{format:'png'})).data,'base64'))}
let second;
try{
 await fs.mkdir(out,{recursive:true});await call('Runtime.enable');await call('Page.enable');
 for(const locale of ['fa','en','es']){
  await call('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});await nav(locale);
  await E("localStorage.removeItem('llm-wizard-state-v2');sessionStorage.removeItem('llm-wizard-session-v2');localStorage.setItem('ziabary-theme','dark')");await nav(locale);
  assert.equal(await E("localStorage.getItem('llm-wizard-state-v2')"),null);
  if(locale==='fa'){assert.equal(await E('document.querySelector(".organization-start>header p").textContent'),'در حداکثر شش مرحله، LLM مناسب نیازتان تعیین می‌شود');assert.equal(await E('document.querySelector(".question-help a").textContent.trim()'),'مقاله مرتبط ↗');}
  assert.equal(await E('document.querySelectorAll(".help-article").length'),0);
  await click('[data-question=task] .question-help button[aria-expanded]');
  await E('document.querySelector(".help-reading").scrollIntoView({block:"center",behavior:"instant"})');
  await wait('[...document.querySelectorAll(".help-article img")].every(i=>i.complete&&i.naturalWidth>0)');
  const cards=await E('[...document.querySelectorAll(".help-article")].map(a=>({href:a.href,title:a.querySelector("h5").textContent,excerpt:a.querySelector("p").textContent,image:!!a.querySelector("img"),target:a.target}))');
  assert.ok(cards.length>=1&&cards.length<=2);for(const c of cards){assert.ok(c.title&&c.excerpt&&c.image);assert.equal(c.target,'_blank');assert.equal((await fetch(c.href)).status,200);assert.ok(c.href.includes(locale==='fa'?'/articles/':'/'+locale+'/articles/'));}
  if(locale!=='fa')assert.doesNotMatch(await E('document.querySelector(".help-reading").textContent'),/[\u0600-\u06ff]/);
  await shot(locale+'-help-1440');await call('Emulation.setDeviceMetricsOverride',{width:390,height:1000,deviceScaleFactor:1,mobile:true});await E('document.querySelector(".help-reading").scrollIntoView({block:"center",behavior:"instant"})');await pause(200);assert.ok(await E('document.documentElement.scrollWidth<=390'));await shot(locale+'-help-390');
  await click('input[name=wizard-task][value=documents]');await click(`input[name=wizard-sourceLanguage][value=${locale}]`);await click(`input[name=wizard-outputLanguage][value=${locale}]`);await click('.step-actions .primary');
  await wait('JSON.parse(localStorage.getItem("llm-wizard-state-v2"))?.step===1');
  const stored=await E('JSON.parse(localStorage.getItem("llm-wizard-state-v2"))');assert.equal(stored.answers.task,'documents');assert.equal(stored.answers.sourceLanguage,locale);assert.equal(await E('[...new URL(location).searchParams.keys()].some(k=>k.startsWith("w-"))'),false);
  await E("sessionStorage.clear()");await nav(locale);assert.ok(await E('!!document.querySelector("[data-question=sources]")'));
  await click('.step-actions .text-button');await wait('localStorage.getItem("llm-wizard-state-v2")===null');assert.equal(await E("sessionStorage.getItem('llm-wizard-session-v2')"),null);assert.equal(await E("localStorage.getItem('ziabary-theme')"),'dark');await nav(locale);assert.equal(await E('document.querySelectorAll(".question input:checked").length'),0);
 }
 // A previous session copy migrates without losing the current step.
 await E("sessionStorage.setItem('llm-wizard-session-v2',JSON.stringify({version:'2026-09-19.2',answers:{task:'writing',sourceLanguage:'fa',outputLanguage:'fa'},statuses:{},step:1,finished:false}))");await nav();
 assert.equal(await E('JSON.parse(localStorage.getItem("llm-wizard-state-v2")).answers.task'),'writing');assert.equal(await E("sessionStorage.getItem('llm-wizard-session-v2')"),null);
 // A fresh tab has no session copy but restores the persistent state.
 second=await import('../scripts/browser-session.mjs?wizard-help-second-tab');await second.call('Page.navigate',{url:root+'/guides/llm/?show-drafts=true'});let restored=false;for(let i=0;i<120;i++){const r=await second.call('Runtime.evaluate',{expression:'!!document.querySelector("[data-question=sources]")',returnByValue:true});if(r.result.value){restored=true;break;}await pause(150);}assert.ok(restored,'restore in a new tab');second.socket.end();second=null;
 await click('.step-actions .text-button');
 // Legacy wizard query parameters move into storage; preview access remains intact.
 await nav('fa','&w-task=extraction&w-sourceLanguage=fa&w-outputLanguage=fa');await wait('!new URL(location).searchParams.has("w-task")');assert.equal(await E('new URL(location).searchParams.get("show-drafts")'),'true');assert.equal(await E('JSON.parse(localStorage.getItem("llm-wizard-state-v2")).answers.task'),'extraction');
 await click('.step-actions .text-button');await nav();assert.equal(await E('localStorage.getItem("llm-wizard-state-v2")'),null);
 assert.deepEqual(events.filter(e=>e.method==='Runtime.exceptionThrown').map(e=>e.params.exceptionDetails),[]);
 console.log('Passed: localized article cards/images, 1440/390 layouts, persistent answers/step, new-tab restore, reset deletion, session migration and legacy-URL cleanup.');
}finally{second?.socket.end();socket.end()}
