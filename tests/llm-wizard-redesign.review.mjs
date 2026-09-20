import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {call,pause,events,socket} from '../scripts/browser-session.mjs';
const root=process.env.REVIEW_ORIGIN??'http://127.0.0.1:5196',out='docs/reviews/local-2026-09-19/wizard-redesign';
const E=async expression=>{const r=await call('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value};
async function wait(expression){for(let i=0;i<150;i++){if(await E(expression))return;await pause(150)}throw Error('Timeout: '+expression)}
async function nav(path){await E('window.__leaving=true');await call('Page.navigate',{url:root+path});await wait('window.__leaving===undefined && !!document.querySelector(".organization-start")');await E('document.fonts.ready');await pause(700)}
async function click(selector){await E(`document.querySelector(${JSON.stringify(selector)}).click()`);await pause(130)}
async function shot(name){await fs.writeFile(out+'/'+name+'.png',Buffer.from((await call('Page.captureScreenshot',{format:'png'})).data,'base64'))}
const path=locale=>(locale==='fa'?'':'/'+locale)+'/guides/llm/?show-drafts=true';
const base={task:'documents',sources:'archive',format:'text',archiveSize:'1000',freshness:'weekly',access:'roles',existing:'yes',failure:'ranking',inputSize:'retrieved',inputTokens:'4096',maxTokens:'4096',output:'cited',outputTokens:'512',mode:'interactive',audience:'organization',phase:'pilot',users:'40',concurrency:'2',requests:'200',hours:'8',firstResponse:'2',fullResponse:'10',policy:'internal',deployment:'self',hardware:'gpu',ram:'32',gpuName:'RTX 3060',gpuCount:'1',vram:'12',shared:'dedicated',upgrade:'existing',currency:'million-toman',usdRate:'230000',capex:'0',monthly:'unknown',months:'3',owner:'provider',success:'cited|latency',threshold:'unknown',risk:'review'};
async function seed(answers,locale){const questions=JSON.parse(await fs.readFile('data/llm/wizard-questions.json','utf8'));answers={...Object.fromEntries(questions.map(q=>[q.id,'unknown'])),...answers,currency:locale==='fa'?answers.currency:'usd'};await E(`localStorage.setItem('llm-wizard-state-v2',JSON.stringify({version:'2026-09-19.2',answers:${JSON.stringify(answers)},statuses:{},step:5,finished:true}))`);await nav(path(locale));await click('.finished .primary');await wait('document.querySelector("dialog")?.open');}
try{
 await fs.mkdir(out,{recursive:true});await call('Runtime.enable');await call('Page.enable');
 for(const locale of ['fa','en','es']){
  await call('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});await nav(path(locale));await E("sessionStorage.removeItem('llm-wizard-session-v2');localStorage.removeItem('llm-wizard-state-v2');localStorage.setItem('ziabary-theme','dark')");await nav(path(locale));
  assert.equal(await E('document.querySelectorAll("h1").length'),1);assert.ok(await E('document.querySelector("h1").compareDocumentPosition(document.querySelector(".organization-start")) & Node.DOCUMENT_POSITION_FOLLOWING'));
  assert.ok(await E('document.querySelector("aside.guide-navigation").getBoundingClientRect().top<300'));assert.equal(await E('!!document.querySelector(".organization-start [href^=mailto]")'),false);
  await shot(locale+'-opening-1440');await E('document.querySelector(".organization-start").scrollIntoView({block:"start",behavior:"instant"})');await shot(locale+'-entry-1440');
  // One full flow uses actual inputs, including unknown controls, rather than a seeded result.
  if(locale==='fa'){
   await click('input[name=wizard-task][value=documents]');await click('input[name=wizard-sourceLanguage][value=fa]');await click('input[name=wizard-outputLanguage][value=fa]');await click('.step-actions .primary');
   for(let stage=1;stage<6;stage++){
    for(let guard=0;guard<60;guard++){
     const action=await E(`(()=>{for(const q of document.querySelectorAll('.question')){const id=q.dataset.question;if(q.dataset.reviewFilled)continue;const desired=${JSON.stringify(base)}[id];let option=q.querySelector('input[value="'+desired+'"]');if(option){option.click();q.dataset.reviewFilled='1';return id;}const text=q.querySelector('input[type=text]');if(text&&desired&&desired!=='unknown'){text.value=desired;text.dispatchEvent(new Event('input',{bubbles:true}));q.dataset.reviewFilled='1';return id;}q.querySelector('.question-help button').click();q.dataset.reviewFilled='1';return id;}return null;})()`);if(!action)break;await pause(70);
    }
    assert.equal(await E('document.querySelector(".step-actions .primary").disabled'),false,'stage '+stage);await click('.step-actions .primary');
   }
   await wait('document.querySelector("dialog")?.open');assert.equal(await E('document.querySelectorAll(".candidate[data-model]").length'),3);
   await click('.close');await wait('!document.querySelector("dialog")?.open');assert.ok(await E('!!document.querySelector(".finished .primary")'));
  }
  await seed({...base,currency:locale==='fa'?'million-toman':'usd',sourceLanguage:locale,outputLanguage:locale,licenseUse:'commercial'},locale);
  const models=await E('[...document.querySelectorAll(".candidate[data-model]")].map(x=>x.dataset.model)');assert.ok(models.length>0&&models.length<=3);assert.ok(!models[0].includes('tiny-aya'));
  assert.ok(await E('document.querySelector(".brief textarea").value.includes('+JSON.stringify(models[0])+')'));
  const href=await E('document.querySelector(".table-result").href'),state=JSON.parse(new URL(href).searchParams.get('s_model-catalog'));assert.deepEqual(state.ids,models);assert.equal(state.onlySelected,true);
  const links=await E('[...document.querySelectorAll(".further-reading a")].map(x=>x.href)');assert.ok(links.length>=3);for(const link of links)assert.equal((await fetch(link)).status,200,link);
  if(locale!=='fa')assert.doesNotMatch(await E('document.querySelector("dialog").innerText'),/[\u0600-\u06ff]/);
  await shot(locale+'-result-1440');
  if(locale==='fa'){
   await E("document.querySelector('.brief').open=true;Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:()=>Promise.reject(new Error('denied'))}})");await click('.brief button');assert.ok(await E("document.querySelector('.brief textarea').selectionEnd>0"));
   await E("document.querySelector('.consultation button').focus()");await call('Input.dispatchKeyEvent',{type:'rawKeyDown',key:'Enter',code:'Enter',windowsVirtualKeyCode:13});await call('Input.dispatchKeyEvent',{type:'char',text:'\r',key:'Enter',windowsVirtualKeyCode:13});await call('Input.dispatchKeyEvent',{type:'keyUp',key:'Enter',code:'Enter',windowsVirtualKeyCode:13});await wait("document.querySelector('.contact-actions input')");await click('.contact-actions button');assert.ok(await E("document.querySelector('.contact-actions input').selectionEnd>0"));
   await E("document.querySelector('.brief').open=false;document.querySelector('.result-dialog').scrollTo(0,0)");
  }

  await call('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});await call('Input.dispatchKeyEvent',{type:'keyUp',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});await wait('!document.querySelector("dialog")?.open');await click('.finished .primary');
  await call('Emulation.setDeviceMetricsOverride',{width:390,height:900,deviceScaleFactor:1,mobile:true});await pause(250);assert.ok(await E('document.querySelector("dialog").scrollWidth<=document.querySelector("dialog").clientWidth+1'),'dialog overflow '+locale);await shot(locale+'-result-390');
  await click('.table-result');await wait('!document.querySelector("dialog")?.open && document.querySelector(".wizard-shortlist")');await pause(500);assert.equal(await E('document.querySelector("#model-catalog .result-count b").textContent.replace(/[۰-۹]/g,d=>"۰۱۲۳۴۵۶۷۸۹".indexOf(d))'),String(models.length));assert.ok(await E('document.documentElement.scrollWidth<=390'),'page overflow '+locale);
  await E("sessionStorage.removeItem('llm-wizard-session-v2');localStorage.removeItem('llm-wizard-state-v2')");await nav(path(locale));await E('document.querySelector(".organization-start").scrollIntoView({block:"start",behavior:"instant"})');await shot(locale+'-entry-390');
 }
 // External-service mode must not retain hardware, and switching tasks removes retrieval.
 await seed({...base,task:'writing',sources:'provided',policy:'public',deployment:'api',serviceAccess:'review',sourceLanguage:'en',outputLanguage:'en',licenseUse:'commercial'},'en');
 assert.equal(await E('document.querySelectorAll(".specialists .candidate").length'),0);assert.equal(await E('!!document.querySelector("dialog a[href*=gpu-selection]")'),false);
 await seed({...base,task:'coding',codingMode:'agent',codeScope:'files',codeLanguages:'Python',sourceLanguage:'en',outputLanguage:'en',licenseUse:'commercial'},'en');
 assert.ok(await E('[...document.querySelectorAll(".candidate[data-model]")].some(e=>/coder|devstral/.test(e.dataset.model))'));
 // Published editions expose the guide and wizard without a preview flag.
 for(const locale of ['fa','en','es']){await E('window.__leaving=true');await call('Page.navigate',{url:root+path(locale).split('?')[0]});await wait('window.__leaving===undefined && document.readyState==="complete"');assert.equal(await E('!!document.querySelector(".organization-start")'),true);}
 assert.deepEqual(events.filter(x=>x.method==='Runtime.exceptionThrown').map(x=>x.params.exceptionDetails),[]);
 console.log('Wizard review passed: 3 locales, real six-stage flow, exact shortlist filtering, localStorage restore, Escape/reopen, local article links, 1440/390 layouts.');
}finally{socket.end()}
