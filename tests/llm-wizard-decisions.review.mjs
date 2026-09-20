import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {call,pause,events,socket} from '../scripts/browser-session.mjs';
const root=process.env.REVIEW_ORIGIN??'http://127.0.0.1:5195',out='docs/reviews/local-2026-09-20/wizard-decisions';
const E=async expression=>{const r=await call('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value};
async function wait(expression){for(let i=0;i<120;i++){if(await E(expression))return;await pause(150)}throw Error('Timeout: '+expression)}
async function nav(locale){await E('window.__leaving=true');await call('Page.navigate',{url:root+(locale==='fa'?'':'/'+locale)+'/guides/llm/'});await wait('window.__leaving===undefined && !!document.querySelector(".organization-start")');await E('document.fonts.ready');await pause(700)}
async function click(selector){await E(`document.querySelector(${JSON.stringify(selector)}).click()`);await pause(150)}
async function shot(name){await fs.writeFile(out+'/'+name+'.png',Buffer.from((await call('Page.captureScreenshot',{format:'png'})).data,'base64'))}
try{
 await fs.mkdir(out,{recursive:true});await call('Runtime.enable');await call('Page.enable');
 for(const locale of ['fa','en','es']){
  await call('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});await nav(locale);await E("localStorage.removeItem('llm-wizard-state-v2');sessionStorage.removeItem('llm-wizard-session-v2');localStorage.setItem('ziabary-theme','dark')");await nav(locale);
  assert.equal(await E('document.querySelectorAll("h1").length'),1);
  await click('input[name=wizard-task][value=writing]');await click('input[name=wizard-writingTask][value=summary]');await click('input[name=wizard-sourceLanguage][value=en]');await click('input[name=wizard-outputLanguage][value=en]');
  assert.ok(await E('document.querySelectorAll(".question").length<=4'));
  await click('.step-actions .primary');await wait('document.querySelector("dialog")?.open');
  assert.equal(await E('document.querySelector("details.basis").open'),false);assert.ok(await E('document.querySelectorAll(".candidate[data-model]").length>0'));
  const ids=await E('[...document.querySelectorAll(".candidate[data-model]")].map(x=>x.dataset.model)');
  assert.ok(await E('document.querySelector(".brief textarea").value.includes('+JSON.stringify(ids[0])+')'));
  const href=await E('document.querySelector(".table-result").href');assert.deepEqual(JSON.parse(new URL(href).searchParams.get('s_model-catalog')).ids,ids);
  if(locale!=='fa')assert.doesNotMatch(await E('document.querySelector("dialog").innerText'),/[\u0600-\u06ff]/);
  const top=await E('document.querySelector(".dialog-bar").getBoundingClientRect().top');await E('document.querySelector(".result-dialog").scrollTop=10000');assert.equal(await E('document.querySelector(".dialog-bar").getBoundingClientRect().top'),top);
  await E('document.querySelector(".result-dialog").scrollTop=0');await shot(locale+'-result-1440');
  await click('.close');await wait('!document.querySelector("dialog")?.open');await nav(locale);assert.ok(await E('document.querySelector(".finished .primary")'));await click('.finished .primary');
  await call('Emulation.setDeviceMetricsOverride',{width:390,height:900,deviceScaleFactor:1,mobile:true});await pause(200);assert.ok(await E('document.querySelector("dialog").scrollWidth<=document.querySelector("dialog").clientWidth+1'));await shot(locale+'-result-390');
  await click('.table-result');await wait('!document.querySelector("dialog")?.open && !!document.querySelector(".wizard-shortlist")');await pause(500);
  assert.equal(await E('document.querySelector("#model-catalog .result-count b").textContent.replace(/[۰-۹]/g,d=>"۰۱۲۳۴۵۶۷۸۹".indexOf(d))'),String(ids.length));
  assert.ok(await E('document.documentElement.scrollWidth<=390'));
  await E('document.querySelector("#model-catalog .wizard-shortlist button").click()');await pause(200);
  await E('const input=document.querySelector("#model-catalog input[type=search]");input.value="Qwen3.7";input.dispatchEvent(new Event("input",{bubbles:true}))');await pause(350);
  assert.equal(await E('document.querySelectorAll("#model-catalog .api-models article").length'),2);assert.equal(await E('document.querySelector("#model-catalog .api-models").open'),true);
  await E('localStorage.removeItem("llm-wizard-state-v2")');await nav(locale);
 }
 // Previous state migrates without discarding valid details; refine handles validation and reset.
 await nav('fa');await E(`localStorage.setItem('llm-wizard-state-v2',JSON.stringify({version:'2026-09-19.2',answers:{task:'documents',sources:'archive',sourceLanguage:'fa',outputLanguage:'fa',mode:'interactive',hours:'8',policy:'internal',deployment:'self',hardware:'none',concurrency:'100',users:'5'},statuses:{users:'measured'},step:2,finished:false}))`);await nav('fa');
 assert.equal(await E('document.querySelector("[data-question=hours] input").value'),'8');
 await E('(()=>{const i=document.querySelector("[data-question=hours] input");i.value="25";i.dispatchEvent(new Event("input",{bubbles:true}));})()');await pause(150);assert.equal(await E('document.querySelector(".step-actions .primary").disabled'),true);
 await E('(()=>{const i=document.querySelector("[data-question=hours] input");i.value="8";i.dispatchEvent(new Event("input",{bubbles:true}));})()');await pause(150);await click('.step-actions .primary');await wait('document.querySelector("dialog").open');
 assert.match(await E('document.querySelector("dialog").innerText'),/صف/);
 await call('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});await call('Input.dispatchKeyEvent',{type:'keyUp',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});await wait('!document.querySelector("dialog").open');
 await E('document.querySelector(".finished button:last-child").click()');await pause(200);assert.equal(await E('localStorage.getItem("llm-wizard-state-v2")'),null);assert.equal(await E('document.querySelectorAll(".question").length'),1);
 assert.deepEqual(events.filter(x=>x.method==='Runtime.exceptionThrown').map(x=>x.params.exceptionDetails),[]);
 console.log('PASS: three public editions; quick result without details; shared model IDs; themed scroll/fixed header; 1440/390 layouts; persistence/migration/edit/reset; number validation; API search; exact filtered links; Escape/reopen.');
}finally{await call('Page.close').catch(()=>{});socket.end()}
