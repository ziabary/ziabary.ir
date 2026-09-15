import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {call,pause,socket} from '../scripts/browser-session.mjs';
const origin=process.env.LLM_REVIEW_ORIGIN ?? 'http://127.0.0.1:4188';const report={};
async function ev(expression){const r=await call('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value;}
async function nav(path){await call('Page.navigate',{url:origin+path});await pause(900)}
await call('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});
await nav('/guides/llm/?show-drafts=true');
for(const [family,count] of [['SmolLM',4],['BGE',2],['E5',1]]){
 await ev(`(()=>{const labels=[...document.querySelectorAll('#model-catalog [data-filter-id="family"] label')];labels.find(l=>l.innerText.trim()===${JSON.stringify(family)}).querySelector('input').click()})()`);await pause(80);
 const n=await ev(`document.querySelectorAll('#model-catalog tr[data-row-id]').length`);assert.equal(n,count);report[family]=n;
 await ev(`document.querySelector('#model-catalog .filter-actions button').click()`);await pause(60);
}
await ev(`(()=>{const f=document.querySelector('#model-catalog [data-filter-id="total-parameters"] input:last-of-type');const inputs=document.querySelectorAll('#model-catalog [data-filter-id="total-parameters"] input');inputs[1].value='1';inputs[1].dispatchEvent(new Event('input',{bubbles:true}));})()`);await pause(80);
report.small=await ev(`document.querySelectorAll('#model-catalog tr[data-row-id]').length`);assert.ok(report.small>0&&report.small<59);
await ev(`document.querySelector('#model-catalog .filter-actions button').click()`);await pause(60);
report.versions=await ev(`({models:document.querySelectorAll('#model-catalog [data-filter-id="model-version"] option').length,software:document.querySelectorAll('#software-products [data-filter-id="software-version"] option').length})`);assert.ok(report.versions.models>50);assert.equal(report.versions.software,14);
for (const [view, field] of [['model-catalog', 'model-version'], ['software-products', 'software-version']]) {
 await ev(`(()=>{const select=document.querySelector('#${view} [data-filter-id="${field}"] select');select.selectedIndex=1;select.dispatchEvent(new Event('change',{bubbles:true}))})()`);await pause(100);
 const count=await ev(`document.querySelectorAll('#${view} tr[data-row-id]').length`);assert.equal(count,1);report[field+'-filtered']=count;
 await ev(`document.querySelector('#${view} .filter-actions button').click()`);await pause(100);
}
await ev(`(()=>{const v=document.querySelector('#model-suitability');[...v.querySelectorAll('tr[data-row-id] .pick input')].slice(0,2).forEach(i=>i.click());v.querySelector('input[value="solution-selection"]').click()})()`);await pause(80);
report.comparison=await ev(`document.querySelector('#model-suitability .comparison-audit').innerText`);assert.ok(report.comparison.includes('نیازمند اطلاعات بیشتر'));assert.ok(report.comparison.includes('ادعای برتری: غیرفعال'));
await nav('/guides/llm/?show-drafts=true&view=deployment-compatibility#serving-software');report.deployment=await ev(`document.querySelectorAll('#deployment-compatibility tr[data-row-id]').length`);assert.equal(report.deployment,0);
await nav('/guides/');report.cardWithout=await ev(`document.querySelectorAll('a[href*="/guides/llm"]').length`);assert.equal(report.cardWithout,0);
await nav('/guides/?show-drafts=true');report.cardLinks=await ev(`Array.from(document.querySelectorAll('a[href*="/guides/llm"]')).map(a=>a.href)`);assert.ok(report.cardLinks.length);assert.ok(report.cardLinks.every(u=>u.includes('show-drafts=true')));
await fs.writeFile('docs/reviews/local-2026-09-15/llm-filter-review.json',JSON.stringify(report,null,2)+'\n');console.log(report);await call('Page.close').catch(()=>{});socket.end();
