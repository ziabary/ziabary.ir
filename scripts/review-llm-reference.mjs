/** Read-only browser review of the local static build, using the project's dedicated CDP browser. */
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import {call,pause,events,socket} from './browser-session.mjs';
const origin=process.env.LLM_REVIEW_ORIGIN ?? 'http://127.0.0.1:5193';
const out='docs/content-reviews/llm-reference-2026-09-19';await fs.mkdir(out,{recursive:true});
const results=[];
async function evaluate(expression){const r=await call('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw new Error(JSON.stringify(r.exceptionDetails));return r.result?.value;}
async function waitFor(expression){for(let n=0;n<160;n++){if(await evaluate(expression))return;await pause(150);}throw new Error('Timed out: '+expression);}
async function visit(path,ready){await call('Page.navigate',{url:origin+path});await waitFor(ready);await pause(350);}
await call('Emulation.setDeviceMetricsOverride',{width:1440,height:1100,deviceScaleFactor:1,mobile:false});
try {
for(const locale of ['fa','en','es']){
 const base=locale==='fa'?'':`/${locale}`;
 await visit(`${base}/guides/llm/?show-drafts=true`,"!!document.querySelector('.llm-guide #reference-comparisons select')");
 const initial=await evaluate(`({direction:getComputedStyle(document.querySelector('.llm-guide')).direction, language:document.querySelector('#reference-comparisons .filters label:nth-child(2) select').value, groupCount:document.querySelector('#reference-comparisons .filters select').options.length, rows:document.querySelectorAll('[data-reference-result]').length, noindex:document.querySelector('meta[name=robots]')?.content})`);
 assert.equal(initial.direction,locale==='fa'?'rtl':'ltr');assert.equal(initial.language,locale);assert.equal(initial.groupCount,8);assert.equal(initial.rows,8);assert.match(initial.noindex,/noindex/);
 await evaluate(`(()=>{const s=document.querySelector('#reference-comparisons .filters label:nth-child(3) select');s.value='nDCG@10';s.dispatchEvent(new Event('change',{bubbles:true}));})()`);
 await waitFor("document.querySelectorAll('[data-reference-result]').length===4");
 const metric=await evaluate(`({text:document.querySelector('#reference-comparisons').innerText,sources:[...document.querySelectorAll('#reference-comparisons td details a')].map(a=>a.href)})`);
 assert.ok(metric.sources.every(s=>s==='https://arxiv.org/html/2402.05672v1'));assert.ok(!metric.text.includes('5370'));
 if(locale!=='fa')assert.doesNotMatch(metric.text,/[\u0600-\u06ff]/);
 await evaluate("document.querySelector('#reference-comparisons').scrollIntoView({block:'start',behavior:'instant'})");await pause(200);
 await waitFor("Math.abs(document.querySelector('#reference-comparisons').getBoundingClientRect().top)<200");
 const screenshot=await call('Page.captureScreenshot',{format:'png'});await fs.writeFile(`${out}/${locale}-miracl.png`,Buffer.from(screenshot.data,'base64'));
 await evaluate(`(()=>{const s=document.querySelector('#reference-comparisons .filters label:nth-child(3) select');s.value='Recall@100';s.dispatchEvent(new Event('change',{bubbles:true}));})()`);
 await waitFor("document.querySelector('#reference-comparisons h4')?.textContent.includes('Recall@100')");
 assert.equal(await evaluate("document.querySelectorAll('[data-reference-result]').length"),4);
 // Exercise the real catalog and software search controls, not only repository lookups.
 for(const [query,count] of [['Salamandra',2],['MiniCPM5',1],['LFM2.5',1],['granite-4.2-3b',1]]) {
  await evaluate(`(()=>{const input=document.querySelector('#model-catalog input[type=search]');input.value=${JSON.stringify(query)};input.dispatchEvent(new Event('input',{bubbles:true}));})()`);
  await waitFor(`document.querySelectorAll('#model-catalog [data-row-id]').length===${count}`);
 }
 await evaluate("(()=>{const input=document.querySelector('#model-catalog input[type=search]');input.value='';input.dispatchEvent(new Event('input',{bubbles:true}));const software=document.querySelector('#software-products input[type=search]');software.value='MLX LM';software.dispatchEvent(new Event('input',{bubbles:true}));})()");
 await waitFor("document.querySelectorAll('#software-products [data-row-id]').length===1");
 assert.match(await evaluate("document.querySelector('#software-products [data-row-id]').innerText"),/MLX LM/);
 // The same central shortlist drives an existing model-selection control and article inserts.
 await evaluate("document.querySelector('.task-start').open=true;document.querySelector('.reference-guidance details').open=true;document.querySelector('.reference-guidance nav a').click()");
 await waitFor("!!document.querySelector('dialog.model-profile[open]')");
 const model=await evaluate("({title:document.querySelector('dialog .profile-title').textContent,url:location.href})");assert.match(model.url,/model=/);assert.match(model.title,/e5/);
 await evaluate("document.querySelector('.close-profile').click()");await waitFor("!document.querySelector('dialog.model-profile[open]')");
 await evaluate("document.querySelector('.reference-guidance nav:nth-of-type(2) a').click()");
 await waitFor("new URL(location.href).searchParams.has('reference-group') && !!document.querySelector('#reference-comparisons')");
 const navigated=await evaluate("({hash:location.hash,group:document.querySelector('#reference-comparisons select').value})");assert.equal(navigated.hash,'#reference-comparisons');
 // A result with an unspecified language must not become English in an English edition.
 await visit(`${base}/guides/llm/?show-drafts=true&reference-group=comparison%3Aminicpm-small-model-tasks&reference-language=unspecified`,"!!document.querySelector('[data-reference-result]')");
 assert.equal(await evaluate("document.querySelector('#reference-comparisons .filters label:nth-child(2) select').value"),'unspecified');
 for(const id of ['liquidai-lfm2-5-1-2b-instruct','ibm-granite-granite-4-2-3b']){
  await visit(`${base}/guides/llm/?show-drafts=true&model=model%3A${id}`,"!!document.querySelector('dialog.model-profile[open]')");
  const text=await evaluate("document.querySelector('dialog.model-profile').innerText");
  assert.ok(id.startsWith('liquid') ? text.includes('128')||text.includes('۱۲۸') : text.includes('512K'));
  if(id.startsWith('liquid')) assert.match(text,/LFM Open License/);
  if(locale!=='fa')assert.doesNotMatch(text,/[\u0600-\u06ff]/);
 }
 await call('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});
 await visit(`${base}/guides/llm/?show-drafts=true&reference-group=comparison%3Ae5-miracl-by-language&reference-language=${locale}&reference-metric=nDCG%4010#reference-comparisons`,"document.querySelectorAll('[data-reference-result]').length===4");
 await evaluate("document.querySelector('#reference-comparisons').scrollIntoView({block:'start',behavior:'instant'})");
 const overflow=await evaluate("({width:innerWidth,scroll:document.documentElement.scrollWidth})");assert.equal(overflow.width,390,JSON.stringify(overflow));assert.ok(overflow.scroll<=391,JSON.stringify(overflow));
 const mobile=await call('Page.captureScreenshot',{format:'png'});await fs.writeFile(`${out}/${locale}-miracl-mobile.png`,Buffer.from(mobile.data,'base64'));
 await call('Emulation.setDeviceMetricsOverride',{width:1440,height:1100,deviceScaleFactor:1,mobile:false});
 await visit(`${base}/guides/llm/`,"!!document.querySelector('.preview-gate')");assert.equal(await evaluate("!!document.querySelector('.llm-guide')"),false);
 results.push({locale,initial,metric:'nDCG@10 and Recall@100 separately; four models each',source:'E5 paper v1',newModelFilters:true,mlxFilter:true,modelLinks:true,comparisonLinks:navigated,unknownLanguage:true,lfmAndGranite:true,mobile:overflow,draftGate:true});
}
for(const [lang,slug] of [['en','evaluating-llms-for-your-language-and-workload'],['es','evaluar-llm-idioma-y-tarea'],['en','true-llm-cost-buy-rent-or-api-en'],['es','true-llm-cost-buy-rent-or-api-es']]){
 await visit(`/${lang}/articles/${slug}/?show-drafts=true`,"!!document.querySelector('h1') && document.querySelector('main')?.innerText.length>10000");
 const r=await evaluate("({text:document.querySelector('main').innerText,canonical:document.querySelector('link[rel=canonical]')?.href,noindex:document.querySelector('meta[name=robots]')?.content,languages:[...document.querySelectorAll('link[hreflang]')].map(a=>a.hreflang)})");
 assert.equal(r.text.split('\n').filter(line=>/[\u0600-\u06ff]/.test(line)).join('\n'),'',slug);assert.match(r.noindex,/noindex/);assert.ok(r.canonical.endsWith(`/${lang}/articles/${slug}/`));
 results.push({article:slug,characters:r.text.length,canonical:r.canonical,noindex:r.noindex,hreflang:r.languages});
}
const exceptions=events.filter(e=>e.method==='Runtime.exceptionThrown');assert.deepEqual(exceptions,[]);
await fs.writeFile(`${out}/browser-review.json`,JSON.stringify({origin,results,exceptions},null,2)+'\n');
console.log(JSON.stringify({passed:results.length,output:out}));
} finally {socket.end();}
