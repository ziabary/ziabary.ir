import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import {gzipSync} from 'node:zlib';
import {call,pause,events,socket} from '../scripts/browser-session.mjs';
const origin=process.env.REVIEW_ORIGIN??'http://127.0.0.1:5193';
const folder='docs/content-reviews/llm-three-editions-2026-09-17/browser';
const report={articles:[],checks:[],loading:[]};
const E=async expression=>{const r=await call('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value;};
async function wait(expression){for(let i=0;i<200;i++){if(await E(expression))return;await pause(150);}throw Error('Timed out: '+expression);}
async function nav(url,selector){await E('window.__oldDocument=true');await call('Page.navigate',{url});await wait(`!window.__oldDocument && document.querySelector(${JSON.stringify(selector)})?.getClientRects().length>0`);await E('document.fonts.ready');await pause(500);}
async function change(selector,value){await E(`(()=>{const el=document.querySelector(${JSON.stringify(selector)});el.value=${JSON.stringify(value)};el.dispatchEvent(new Event('input',{bubbles:true}));el.dispatchEvent(new Event('change',{bubbles:true}));})()`);await pause(500);}
async function capture(name,clip){const result=await call('Page.captureScreenshot',{format:'png',captureBeyondViewport:true,...clip?{clip}:{}});await fs.writeFile(folder+'/'+name+'.png',Buffer.from(result.data,'base64'));}
try{
 await call('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});
 await call('Page.addScriptToEvaluateOnNewDocument',{source:"localStorage.setItem('ziabary-theme','dark')"});
 const params=new URLSearchParams({'show-drafts':'true','benchmark-view':'performance',view:'benchmarks',s_benchmarks:JSON.stringify({ids:['performance:gpustack-qwen14-h100-1','performance:gpustack-qwen14-h100-2'],mode:'controlled-experiment',axis:'execution-path'})});
 await nav(origin+'/en/guides/llm/?'+params,'#benchmark-performance');
 await wait("!!document.querySelector('[data-view-id=benchmarks] .comparison-audit.valid')");
 await E("document.querySelector('[data-view-id=benchmarks] .compare-panel').scrollIntoView({block:'center',behavior:'instant'})");await capture('en-performance-valid');
 params.set('s_benchmarks',JSON.stringify({ids:['performance:gpustack-qwen14-h100-1','performance:gpustack-qwen14-h100-4'],mode:'controlled-experiment',axis:'execution-path'}));
 await nav(origin+'/en/guides/llm/?'+params,'#benchmark-performance');
 await wait("!!document.querySelector('[data-view-id=benchmarks] .comparison-audit.invalid')");report.checks.push('Real browser: same-protocol BF16 engine comparison valid; BF16/FP8 intervention mismatch invalid.');
 await nav(origin+'/es/guides/llm/?show-drafts=true','#model-catalog');
 const context='#hardware-feasibility .control-row>label:nth-child(2) select';
 await change(context,'32768');await change('#hardware-feasibility .control-row input[type=number]','4');
 const scenario=await E("JSON.parse(new URL(location.href).searchParams.get('r_hardware-feasibility'))");assert.equal(scenario.context,32768);assert.equal(scenario.active,4);
 const url=await E('location.href');await nav(url,'#model-catalog');assert.equal(await E(`document.querySelector('${context}').value`),'32768');assert.equal(await E("document.querySelector('#hardware-feasibility .control-row input[type=number]').value"),'4');
 await E('history.back()');await wait("document.querySelector('#hardware-feasibility .control-row input[type=number]').value==='1'");await E('history.forward()');await wait("document.querySelector('#hardware-feasibility .control-row input[type=number]').value==='4'");
 await E("document.querySelector('.language-control summary').click()");await E("document.querySelector('.language-menu a[href^=\"/en/guides/llm/\"]').click()");await wait("document.documentElement.lang==='en' && !!document.querySelector('#hardware-feasibility .control-row')");await wait(`document.querySelector('${context}').value==='32768'`);assert.equal(await E("document.querySelector('#hardware-feasibility .control-row input[type=number]').value"),'4');
 report.checks.push('Memory context/concurrency persist through reload, history and ES→EN.');
 const invalid=new URLSearchParams({'show-drafts':'true','target-language':'deleted',quality:'{invalid','s_model-catalog':'{invalid','r_hardware-feasibility':JSON.stringify({context:-1,active:1.5,method:'deleted',hardwareIds:['deleted']})});
 await nav(origin+'/en/guides/llm/?'+invalid,'#model-catalog');assert.equal(await E(`document.querySelector('${context}').value`),'8192');assert.equal(await E("document.querySelector('#hardware-feasibility .control-row input[type=number]').value"),'1');assert.equal(await E("document.querySelectorAll('#hardware-feasibility .hardware-options input:checked').length"),0);
 await E("(()=>{const el=document.querySelector('#model-catalog .search-row input');el.value='no-model-with-this-identifier';el.dispatchEvent(new Event('input',{bubbles:true}));})()");await pause(500);assert.equal(await E("document.querySelectorAll('#model-catalog tbody tr[data-row-id]').length"),0);
 await E("(()=>{const el=document.querySelector('#model-catalog .search-row input');el.value='';el.dispatchEvent(new Event('input',{bubbles:true}));})()");await wait("document.querySelectorAll('#model-catalog tbody tr[data-row-id]').length===95");report.checks.push('Malformed/removed/negative selection values, empty result and clearing search are usable.');
 await E("document.querySelector('.task-start summary').click()");await change('.task-start select','embedding');
 const taskUrl=await E('location.href');assert.equal(new URL(taskUrl).searchParams.get('task'),'embedding');await nav(taskUrl,'#model-catalog');assert.equal(await E("document.querySelector('.task-start select').value"),'embedding');
 await call('Browser.grantPermissions',{origin,permissions:['clipboardReadWrite','clipboardSanitizedWrite']});await call('Page.bringToFront');
 await E("document.querySelector('.benchmark-section .copy-selection').click()");await pause(250);assert.equal(await E('navigator.clipboard.readText()'),await E('location.href'));
 report.checks.push('Task shortlist survives reload; copy-selection button writes the actual reconstructible URL to the clipboard.');
 // All international articles are actual static routes with full local preview bodies.
 const groups=JSON.parse(await fs.readFile('src/lib/translation-groups.json','utf8'));
 const source=await fs.readFile('src/lib/llm/edition-manifest.ts','utf8');
 const topics=[...source.matchAll(/\{ id: '([^']+)', fa: '([^']+)', en: '([^']+)', es: '([^']+)' \}/g)];
 assert.equal(topics.length,10);
 for(const [locale,index] of [['en',3],['es',4]])for(const topic of topics){
  const slug=topic[index],route='/'+locale+'/articles/'+slug+'/';
  assert.equal((await fetch(origin+route)).status,200);
  await nav(origin+route+'?show-drafts=true','.article-body');
  const info=await E(`({lang:document.documentElement.lang,dir:document.documentElement.dir,chars:document.querySelector('.article-body').innerText.length,title:document.querySelectorAll('head title').length,description:document.querySelectorAll('meta[name=description]').length,canonical:document.querySelector('link[rel=canonical]').href,robots:document.querySelector('meta[name=robots]').content,alternates:[...document.querySelectorAll('link[hreflang]')].map(a=>a.href),body:[...document.querySelectorAll('.article-body a')].map(a=>({url:a.href,text:a.textContent}))})`);
  assert.equal(info.lang,locale);assert.equal(info.dir,'ltr');assert.ok(info.chars>8000,slug);assert.equal(info.title,1);assert.equal(info.description,1);assert.equal(info.canonical,'https://ziabary.ir'+route);assert.match(info.robots,/noindex/);assert.ok(info.alternates.every(link=>!link.includes('/'+locale+'/articles/'+slug)));
  const allIds=await E("[...document.querySelectorAll('.article-body [id]')].map(e=>e.id)");assert.equal(new Set(allIds).size,allIds.length);
  for(const link of info.body){const u=new URL(link.url);if(u.origin!==origin)continue;const file=path.join('build',decodeURIComponent(u.pathname),u.pathname.endsWith('/')?'index.html':'');assert.ok(await fs.stat(file).catch(()=>false),`${slug}: ${u.pathname}`);}
  report.articles.push({locale,slug,characters:info.chars,canonical:info.canonical});
 }
 // Cold-load requests from built files; no production API lookup is needed for a table.
 await call('Network.setCacheDisabled',{cacheDisabled:true});
 for(const [label,host,root,locales] of [['before','http://127.0.0.1:5194','/tmp/ziabary-llm-baseline-20260917/build',['fa']],['after',origin,'build',['fa','en','es']]])for(const locale of locales){
  const route=(locale==='fa'?'':'/'+locale)+'/guides/llm/?show-drafts=true';await nav(host+route,'#model-catalog');await pause(1500);
  const requests=await E("performance.getEntriesByType('resource').map(e=>({url:e.name,bytes:e.decodedBodySize,transfer:e.transferSize,type:e.initiatorType}))");
  const scripts=requests.filter(r=>new URL(r.url).origin===host&&new URL(r.url).pathname.endsWith('.js'));
  let bytes=0,gzip=0;for(const r of scripts){const data=await fs.readFile(path.join(root,new URL(r.url).pathname));bytes+=data.length;gzip+=gzipSync(data).length;}
  const external=requests.filter(r=>new URL(r.url).origin!==host);assert.deepEqual(external.filter(r=>r.transfer>0),[]);
  report.loading.push({label,locale,javascriptRequests:scripts.length,javascriptBytes:bytes,gzipBytes:gzip,totalRequests:requests.length,requests});
  if(label==='after'){
   const messages=JSON.parse(await fs.readFile('.svelte-kit/output/client/.vite/manifest.json','utf8'));
   const articleChunks=Object.entries(messages).filter(([key,entry])=>key.endsWith('.md') && scripts.some(r=>r.url.endsWith(entry.file))).map(([key])=>key);
   assert.equal(articleChunks.length,10,`Only the ten ${locale} chapter bodies should load`);
   const editionSlugs=topics.map(topic=>topic[locale==='fa'?2:locale==='en'?3:4]);
   assert.ok(articleChunks.every(key=>editionSlugs.some(slug=>key.endsWith('/'+slug+'.md'))));
   report.loading.at(-1).articleChunks=articleChunks;
   for(const other of ['fa','en','es'].filter(x=>x!==locale))for(const name of [`data/llm/locales/messages.${other}.json`,`data/llm/locales/records.${other}.json`]){const entry=messages[name];if(entry)assert.ok(!scripts.some(r=>r.url.endsWith(entry.file)),`Unrelated locale loaded: ${locale}/${name}`);}
   for(const width of [1440,390]){await call('Emulation.setDeviceMetricsOverride',{width,height:1000,deviceScaleFactor:1,mobile:width===390});await E("scrollTo({top:0,behavior:'instant'})");await pause(200);const end=await E("document.querySelector('#model-catalog').getBoundingClientRect().top+scrollY");await capture(locale+'-opening-'+width,{x:0,y:0,width,height:Math.ceil(end),scale:1});}
   await call('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});
  }
 }
 assert.deepEqual(events.filter(e=>e.method==='Runtime.exceptionThrown'),[]);
 await fs.writeFile(folder+'/static-review.json',JSON.stringify(report,null,2));console.log('PASS: 20 static articles, comparison and memory URLs, cold-load measurements.');
}finally{await fs.writeFile(folder+'/static-partial-review.json',JSON.stringify(report,null,2));await call('Page.close').catch(()=>{});socket.end();}
