/** Read-only local review. No inference benchmark or deployment. */
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import {call,pause,events,socket} from './browser-session.mjs';
const origin=process.env.LLM_REVIEW_ORIGIN??'http://127.0.0.1:4186';
const out='docs/content-reviews/llm-2026-09-26';await fs.mkdir(out,{recursive:true});
const results=[];
async function evaluate(expression){const r=await call('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw new Error(JSON.stringify(r.exceptionDetails));return r.result?.value;}
async function waitFor(expression){for(let n=0;n<120;n++){if(await evaluate(expression))return;await pause(150);}throw new Error('Timed out: '+expression);}
async function visit(path,ready){await call('Page.navigate',{url:origin+path});await waitFor(ready);await pause(300);}
try {
 await call('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});
 for(const locale of ['fa','en','es']){
  const base=locale==='fa'?'':`/${locale}`;
  for(const model of ['model:liquidai-lfm2-5-vl-3b','model:liquidai-lfm2-5-vl-3b-dspark']){
   await visit(`${base}/guides/llm/?model=${encodeURIComponent(model)}`,"!!document.querySelector('dialog.model-profile[open]')");
   const text=await evaluate("document.querySelector('dialog.model-profile').innerText");
   assert.match(text,/LFM2\.5-VL-3B/);assert.match(text,/LFM Open License/);
   if(model.endsWith('-dspark')){assert.match(text,/279|۲۷۹/);}
   if(locale!=='fa')assert.doesNotMatch(text,/[\u0600-\u06ff]/);
   results.push({locale,model,profile:true,localized:true});
   if(model.endsWith('-dspark')){
    await evaluate("document.querySelectorAll('.profile-tabs button')[2].click()");
    await waitFor("document.querySelector('dialog.model-profile').innerText.includes('0.5.19')");
    const run=await evaluate("document.querySelector('dialog.model-profile').innerText");assert.match(run,/0\.7\.2/);assert.match(run,/F16/);
   }
  }
  const controls={group:'liquid-dspark-vl',metric:'endToEndSpeedup'};
  await visit(`${base}/guides/llm/?view=benchmarks&benchmark-view=performance&r_benchmarks=${encodeURIComponent(JSON.stringify(controls))}#benchmarks`,"document.querySelectorAll('#benchmarks [data-row-id]').length===18");
  const perf=await evaluate("document.querySelector('#benchmarks').innerText");assert.match(perf,/DSpark/);assert.match(perf,/×/);assert.match(perf,/TTFT/);
  if(locale!=='fa')assert.doesNotMatch(perf,/[\u0600-\u06ff]/);
  results.push({locale,relativePerformanceRows:18});
  await visit(`${base}/guides/llm/?view=software-products&s_software-products=${encodeURIComponent(JSON.stringify({q:'llama.cpp'}))}#serving-software`,"!!document.querySelector('#software-products [data-row-id]')");
  const software=await evaluate("document.querySelector('#software-products').innerText");assert.match(software,/b11182/);assert.match(software,/b11160/);assert.match(software,/RPC/);
  if(locale!=='fa')assert.doesNotMatch(software,/[\u0600-\u06ff]/);
  results.push({locale,scopedPrerelease:true});
  await visit(`${base}/guides/gpu-selection/`,"!!document.querySelector('#fp4-activation-policy')");
  const gpu=await evaluate("document.querySelector('#fp4-activation-policy').innerText");assert.match(gpu,/W4A8/);assert.match(gpu,/b11182/);assert.match(gpu,/Blackwell/);
  if(locale!=='fa')assert.doesNotMatch(gpu,/[\u0600-\u06ff]/);
  results.push({locale,gpuPrecisionNote:true});
  await call('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});
  await visit(`${base}/guides/llm/?model=model%3Aliquidai-lfm2-5-vl-3b-dspark`,"!!document.querySelector('dialog.model-profile[open]')");
  const size=await evaluate("({width:innerWidth,scroll:document.documentElement.scrollWidth,dir:getComputedStyle(document.querySelector('dialog.model-profile')).direction})");
  assert.ok(size.scroll<=391,JSON.stringify(size));assert.equal(size.dir,locale==='fa'?'rtl':'ltr');
  const shot=await call('Page.captureScreenshot',{format:'png'});await fs.writeFile(`${out}/${locale}-dspark-mobile.png`,Buffer.from(shot.data,'base64'));
  results.push({locale,mobile:size});
  await call('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});
 }
 await visit('/articles/rag-retrieval-access-control-compass/?show-drafts=true',"document.body.innerText.includes('HighFinance')");
 const draft=await evaluate("({noindex:document.querySelector('meta[name=robots]')?.content,text:document.body.innerText})");assert.match(draft.noindex,/noindex/);assert.match(draft.text,/private beta/);
 const sitemap=await fs.readFile('build/sitemap.xml','utf8');assert.ok(!sitemap.includes('rag-retrieval-access-control-compass'));
 const errors=events.filter(e=>e.method==='Runtime.exceptionThrown');assert.deepEqual(errors,[]);
 results.push({draftNoindex:true,draftAbsentSitemap:true,browserExceptions:0});
 await fs.writeFile(`${out}/browser.json`,JSON.stringify(results,null,2)+'\n');console.log(JSON.stringify(results,null,2));
} finally {await call('Page.close');socket.end();}
