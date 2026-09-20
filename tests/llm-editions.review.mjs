import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {call,pause,events,socket} from '../scripts/browser-session.mjs';
const origin=process.env.REVIEW_ORIGIN??'http://127.0.0.1:5191';
const out='docs/content-reviews/llm-three-editions-2026-09-17/browser';
const repository=JSON.parse(await fs.readFile('data/llm/v0.3.0/repository.json','utf8'));
const report={editions:[],checks:[],screenshots:[]};
const E=async expression=>{const r=await call('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value;};
async function wait(expression){for(let i=0;i<200;i++){if(await E(expression))return;await pause(150);}throw Error('Timed out: '+expression);}
async function nav(path,selector='.llm-guide'){await call('Page.navigate',{url:origin+path});await wait(`document.querySelector(${JSON.stringify(selector)})?.getClientRects().length>0`);await E('document.fonts.ready');await pause(250);}
async function click(selector){await E(`(()=>{const e=document.querySelector(${JSON.stringify(selector)});if(!e)throw Error('Missing '+${JSON.stringify(selector)});e.focus();e.click();})()`);await pause(350);}
async function set(selector,value){await E(`(()=>{const e=document.querySelector(${JSON.stringify(selector)});e.value=${JSON.stringify(value)};e.dispatchEvent(new Event(e.tagName==='SELECT'?'change':'input',{bubbles:true}));})()`);await pause(450);}
async function frame(selector){await E(`document.querySelector(${JSON.stringify(selector)}).scrollIntoView({block:'start',behavior:'instant'});scrollBy(0,-110)`);await pause(200);}
async function shot(name){const r=await call('Page.captureScreenshot',{format:'png'});await fs.writeFile(out+'/'+name+'.png',Buffer.from(r.data,'base64'));report.screenshots.push(name+'.png');}
async function close(){await call('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});await call('Input.dispatchKeyEvent',{type:'keyUp',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});await wait("!document.querySelector('.model-profile').open");}
const guide=locale=>(locale==='fa'?'':'/'+locale)+'/guides/llm/';
const rowCount=id=>E(`document.querySelectorAll('[data-view-id="${id}"] tbody tr[data-row-id]').length`);
const visiblePersian=`[...document.querySelectorAll('.llm-view,.quality-view,.start,.guide-opening')].flatMap(root=>[...root.querySelectorAll('h1,h2,h3,h4,p,th,td,label,button,summary')].filter(e=>e.getClientRects().length && !e.closest('code,pre')).map(e=>e.innerText)).filter(t=>/[\\u0600-\\u06ff]/.test(t)).slice(0,12)`;
try{
 await fs.mkdir(out,{recursive:true});await call('Page.enable');await call('Runtime.enable');await call('Network.enable');
 await call('Page.addScriptToEvaluateOnNewDocument',{source:"localStorage.setItem('ziabary-theme','dark')"});
 for(const locale of ['fa','en','es']){
  await call('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});
  await nav(guide(locale)+'?show-drafts=true','#model-catalog');
  const result={locale,views:{},profiles:[],leaks:[]};
  assert.equal(await E('document.documentElement.lang'),locale);assert.equal(await E('document.documentElement.dir'),locale==='fa'?'rtl':'ltr');
  assert.equal(await E("document.querySelectorAll('head title').length"),1);assert.equal(await E("document.querySelectorAll('head meta[name=description]').length"),1);
  assert.equal(await E("document.querySelector('link[rel=canonical]').href"),'https://ziabary.ir'+guide(locale));
  assert.match(await E("document.querySelector('meta[name=robots]')?.content??''"),/noindex/);
  assert.equal(await E("document.querySelectorAll('.llm-chapter').length"),10);
  await wait("document.querySelector('.opening-image')?.naturalWidth>0");await E("scrollTo({top:0,behavior:'instant'})");await shot(locale+'-1440-dark');
  for(const id of ['model-catalog','model-suitability','hardware-feasibility','software-products','specialized-models']){assert.ok(await rowCount(id)>0,id);result.views[id]=await rowCount(id);await frame('#'+id);assert.equal(await E('document.documentElement.scrollWidth>innerWidth+1'),false,id);}
  assert.ok(await E("document.querySelectorAll('.quality-view tbody tr').length>0"));result.quality=await E("document.querySelectorAll('.quality-view tbody tr').length");
  if(locale!=='fa')result.leaks=await E(visiblePersian);
  await click('.benchmark-section .subview-tabs button:nth-child(2)');await wait("!!document.querySelector('#benchmark-performance')");result.views.benchmarks=await rowCount('benchmarks');await frame('#benchmark-performance');await shot(locale+'-performance');
  await click('.serving-section .subview-tabs a[href*="deployment-compatibility"]');await wait("!!document.querySelector('[data-view-id=deployment-compatibility]')");result.views['deployment-compatibility']=await rowCount('deployment-compatibility');
  for(const id of ['model:qwen-qwen3-8b','model:baai-bge-m3',repository.models.find(m=>!repository.publishedEvaluations.some(r=>r.modelVersionId===m.id))?.id].filter(Boolean)){
   await set('#model-catalog .search-row input[type=search]',id);const trigger='#model-catalog .profile-link';await click(trigger);await wait("document.querySelector('.model-profile').open");assert.equal(await E("document.activeElement.classList.contains('profile-title')"),true);
   const profile={id,panels:[],leaks:[]};
   for(let index=1;index<=6;index++){await click('.profile-tabs button:nth-child('+index+')');const text=await E("document.querySelector('.profile-body').innerText");assert.ok(text.length>20);profile.panels.push(text.length);if(locale!=='fa'&&/[\u0600-\u06ff]/.test(text))profile.leaks.push(text.match(/.{0,35}[\u0600-\u06ff].{0,65}/g)?.slice(0,6));}
   assert.equal(await E("document.querySelector('.model-profile').scrollWidth>document.querySelector('.model-profile').clientWidth+1"),false);
   await close();assert.equal(await E(`document.activeElement===document.querySelector(${JSON.stringify(trigger)})`),true);result.profiles.push(profile);
  }
  await set('#model-catalog .search-row input[type=search]','');
  // Mobile page, tables and a full chapter remain inside the viewport in both themes.
  await call('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});
  for(const theme of ['dark','light']){await E(`document.documentElement.dataset.theme='${theme}';scrollTo({top:0,behavior:'instant'})`);await pause(250);assert.equal(await E('document.documentElement.scrollWidth>innerWidth+1'),false);await shot(locale+'-390-'+theme);}
  await click('.llm-chapter summary');await frame('.llm-chapter[open], .llm-chapter:has(details[open])');
  assert.equal(await E('document.documentElement.scrollWidth>innerWidth+1'),false);await shot(locale+'-390-chapter');
  result.brokenImages=await E("[...document.images].filter(i=>i.complete&&!i.naturalWidth).map(i=>i.src)");assert.deepEqual(result.brokenImages,[]);assert.deepEqual(result.leaks,[]);for(const profile of result.profiles)assert.deepEqual(profile.leaks,[],profile.id);
  report.editions.push(result);console.log('Reviewed',locale,JSON.stringify(result.views),'leaks',result.leaks.length);
 }
 // Deterministic same-source quality pair and an incompatible extra result.
 const pair=repository.publishedEvaluations.filter(r=>r.protocolEvidenceId==='evidence:deepseek-r1-common-table'&&r.benchmark==='MATH-500').slice(0,2);
 const state={task:'',benchmark:'MATH-500',language:'en',metric:pair[0].metric,subset:'',ids:pair.map(r=>r.id)};
 const params=new URLSearchParams({'show-drafts':'true','target-language':'en',quality:JSON.stringify(state)});
 await call('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});await nav(guide('en')+'?'+params,'.quality-view');
 await wait("document.querySelectorAll('.quality-comparison li').length===2");assert.match(await E("document.querySelector('.quality-comparison').innerText"),/can be ordered/);
 await frame('.quality-view');await shot('en-quality-valid');
 // A checkbox change, reload and back/forward must reconstruct exactly the selected rows.
 const before=await E('location.href');await click('.quality-view tbody input[type=checkbox]');const selectedCount=await E("document.querySelectorAll('.quality-comparison li').length");const after=await E('location.href');assert.notEqual(after,before);await E('window.__reviewReloadToken=42');await call('Page.reload');await wait("typeof window.__reviewReloadToken==='undefined' && !!document.querySelector('.quality-view')");await wait(`document.querySelectorAll('.quality-comparison li').length===${selectedCount}`);assert.equal(await E("document.querySelectorAll('.quality-comparison li').length"),selectedCount);
 await E('history.back()');await wait("document.querySelectorAll('.quality-comparison li').length===2");await E('history.forward()');await wait(`document.querySelectorAll('.quality-comparison li').length===${selectedCount}`);
 state.ids.push(repository.publishedEvaluations.find(r=>r.benchmark==='IFEval').id);params.set('quality',JSON.stringify(state));await nav(guide('en')+'?'+params,'.quality-view');assert.match(await E("document.querySelector('.quality-comparison').innerText"),/Side by side only/);await frame('.quality-view');await shot('en-quality-incompatible');
 // Table selection, hidden column and search persist into a real language switch.
 await set('#model-catalog .search-row input[type=search]','Qwen3-8B');await click('#model-catalog tbody input[type=checkbox]');const selectedUrl=await E('location.href');assert.ok(new URL(selectedUrl).searchParams.get('s_model-catalog'));
 await click('.language-control summary');await click('.language-menu a[href^="/es/guides/llm/"]');await wait("document.documentElement.lang==='es' && !!document.querySelector('.llm-view#model-catalog')");assert.equal(await E("document.querySelector('#model-catalog .search-row input[type=search]').value"),'Qwen3-8B');assert.ok(await E("document.querySelector('#model-catalog tbody input[type=checkbox]').checked"));assert.equal(await E("new URL(location.href).searchParams.get('target-language')"),'en');
 report.checks.push('quality valid/incompatible; checkbox, reload, back/forward; table selection and target language survive EN→ES');
 // Static preview policy and direct translated chapter links.
 for(const locale of ['fa','en','es']){await nav(guide(locale),'#model-catalog');assert.equal(await E("!!document.querySelector('.llm-view#model-catalog')"),true);}
 for(const [locale,slug] of [['en','right-model-size-for-the-task-en'],['es','right-model-size-for-the-task-es']]){
  const path='/'+locale+'/articles/'+slug+'/';await nav(path,'.draft-gate');assert.equal(await E("!!document.querySelector('.article-body')"),false);
  await nav(path+'?show-drafts=true','.article-body');assert.ok(await E("document.querySelector('.article-body').innerText.length>8000"));assert.equal(await E("document.querySelectorAll('head title').length"),1);assert.match(await E("document.querySelector('meta[name=robots]').content"),/noindex/);
  const draftLinks=await E("[...document.querySelectorAll('.article-body a[href*="+JSON.stringify('/articles/')+"]')].filter(a=>a.pathname.includes('llms-on-')||a.pathname.includes('four-bit-')).map(a=>a.search)");assert.ok(draftLinks.every(q=>q.includes('show-drafts=true')));
  await nav(guide(locale)+'?show-drafts=true#'+slug,'#model-catalog');await wait(`document.getElementById('${slug}').querySelector('details').open`);
 }
 report.checks.push('three hidden default guides; independent EN/ES draft routes, localized bodies and direct chapter opening');
 report.runtimeErrors=events.filter(e=>e.method==='Runtime.exceptionThrown');assert.deepEqual(report.runtimeErrors,[]);
 await fs.writeFile(out+'/review.json',JSON.stringify(report,null,2));console.log('PASS: three editions reviewed.');
}finally{await fs.writeFile(out+'/partial-review.json',JSON.stringify(report,null,2));await call('Page.close').catch(()=>{});socket.end();}
