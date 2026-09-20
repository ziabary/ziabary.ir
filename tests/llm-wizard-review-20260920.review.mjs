// Run against npm run preview on 5195 with a Chromium CDP session on 9334.
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {call,pause,events,socket} from '../scripts/browser-session.mjs';
const out='docs/reviews/local-2026-09-20/wizard-review';
const origin=process.env.WIZARD_REVIEW_ORIGIN??'http://127.0.0.1:5195';
const E=async expression=>{const r=await call('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value};
async function wait(expression){for(let i=0;i<120;i++){if(await E(expression))return;await pause(150)}throw Error('Timeout: '+expression)}
async function nav(locale){await E('window.__leaving=true');await call('Page.navigate',{url:origin+(locale==='fa'?'':'/'+locale)+'/guides/llm/'});await wait('window.__leaving===undefined && !!document.querySelector(".organization-start")');await pause(800);if(await E("!!JSON.parse(localStorage.getItem('llm-wizard-state-v2')??'null')?.answers?.task"))await wait("!!document.querySelector('.organization-start .progress, .organization-start .finished')")}
const click=async selector=>{assert.ok(await E(`!!document.querySelector(${JSON.stringify(selector)})`),selector);await E(`document.querySelector(${JSON.stringify(selector)}).click()`);await pause(160)};
async function search(id,value){await E(`{const el=document.querySelector('[data-question=${id}] .language-search');el.value=${JSON.stringify(value)};el.dispatchEvent(new Event('input',{bubbles:true}))}`);await pause(160)}
async function save(locale,answers){await E(`localStorage.setItem('llm-wizard-state-v2',${JSON.stringify(JSON.stringify({version:'2026-09-20.2',answers,statuses:{},step:0,finished:false,detailed:false}))})`);await nav(locale)}
async function screenshot(name){const r=await call('Page.captureScreenshot',{format:'png'});await fs.writeFile(`${out}/${name}.png`,Buffer.from(r.data,'base64'))}
const base={task:'writing',writingTask:'translation',sourceLanguage:'en',outputLanguage:'fa',sources:'archive',archiveRole:'process',format:'text',inputSize:'long',mode:'interactive',policy:'internal',deployment:'self',hardware:'none'};
try{
 await fs.mkdir(out,{recursive:true});
 for(const locale of ['fa','en','es']){
  await call('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});await nav(locale);
  await E("localStorage.removeItem('llm-wizard-state-v2');sessionStorage.removeItem('llm-wizard-session-v2')");await save(locale,{task:'coding'});
  await click('input[name=wizard-task][value=writing]');await click('input[name=wizard-writingTask][value=translation]');
  await search('sourceLanguage','German');assert.deepEqual(await E("[...document.querySelectorAll('input[name=wizard-sourceLanguage]')].map(x=>x.value)"),['de']);await click('input[name=wizard-sourceLanguage][value=de]');await search('sourceLanguage','');await click('input[name=wizard-sourceLanguage][value=multi]');
  await search('sourceLanguages','Arabic');await click('input[name=wizard-sourceLanguages][value=ar]');await search('sourceLanguages','Chinese');await click('input[name=wizard-sourceLanguages][value=zh]');
  await search('outputLanguage','Persian');await click('input[name=wizard-outputLanguage][value=fa]');await nav(locale);
  assert.equal(await E("JSON.parse(localStorage.getItem('llm-wizard-state-v2')).answers.sourceLanguages"),'ar|zh');
  await save(locale,{task:'coding'});assert.ok(await E("!!document.querySelector('input[name=wizard-codingMode][value=completion]')"));await click('input[name=wizard-codingMode][value=completion]');
  await save(locale,base);await click('.step-actions .primary');await wait('!!document.querySelector("dialog[open]")');
  assert.ok((await E("[...document.querySelectorAll('dialog [data-model] h4')].map(x=>x.textContent)")).some(x=>x.includes('Hy-MT')));
  assert.equal(await E("document.querySelectorAll('dialog .specialists').length"),0);
  await screenshot(`${locale}-translation-desktop`);
  await click('dialog .close');assert.ok(await E("!!document.querySelector('.finished .primary')"));await click('.finished .primary');await click('dialog .close');
  await save(locale,{...base,sources:'provided',policy:'public',deployment:'api',serviceAccess:'unknown',apiService:'unknown',apiRegion:'unknown'});await click('.step-actions .primary');
  assert.equal(await E("document.querySelectorAll('dialog [data-model]').length"),0);assert.equal(await E("document.querySelectorAll('dialog [data-api-model]').length"),2);
  await call('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});await pause(150);
  assert.ok(await E('document.documentElement.scrollWidth<=390'));assert.ok(await E("document.querySelector('.result-dialog').scrollWidth<=document.querySelector('.result-dialog').clientWidth+1"));
  await screenshot(`${locale}-api-mobile`);
  const refine=await E("[...document.querySelectorAll('dialog button')].find(b=>/دقیق‌تر|Refine|Afinar/.test(b.textContent))?.textContent");assert.ok(refine);
  await E("[...document.querySelectorAll('dialog button')].find(b=>/دقیق‌تر|Refine|Afinar/.test(b.textContent)).click()");await pause(200);
  assert.ok(await E("['serviceAccess','apiService','apiRegion'].includes(document.activeElement.closest('[data-question]')?.dataset.question)"),JSON.stringify(await E("({active:document.activeElement.outerHTML.slice(0,300),questions:[...document.querySelectorAll('[data-question]')].map(e=>e.dataset.question),saved:JSON.parse(localStorage.getItem('llm-wizard-state-v2'))})")));
  assert.equal(await E("document.querySelectorAll('.organization-start input:not(.fa-num)').length"),0);
  console.log(`${locale}: searchable/multiple languages, persistence, quick coding, translation archive, API-only cards, refine focus, dialog reopen, mobile overflow passed`);
 }
 assert.deepEqual(events.filter(e=>e.method==='Runtime.exceptionThrown').map(e=>e.params.exceptionDetails),[]);
}finally{socket.end()}
