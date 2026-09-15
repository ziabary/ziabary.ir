import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {call,pause,events,socket} from '../scripts/browser-session.mjs';
const origin=process.env.LLM_REVIEW_ORIGIN ?? 'http://127.0.0.1:4188';
const report={};
async function evaluate(expression){const r=await call('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value;}
async function nav(path){await call('Page.navigate',{url:origin+path});await pause(1200);}
await call('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});
for(const value of ['', '?show-drafts=false','?show-drafts=1','?show-drafts=TRUE']){
 await nav('/guides/llm/'+value);const s=await evaluate(`({views:document.querySelectorAll('.llm-view').length,title:document.querySelector('h1')?.textContent,robots:document.querySelector('meta[name="robots"]')?.content})`);assert.equal(s.views,0);assert.ok(s.robots.includes('noindex'));report[value||'absent']=s;
}
await nav('/guides/llm/?show-drafts=true');
report.counts=await evaluate(`Object.fromEntries([...document.querySelectorAll('.llm-view')].map(v=>[v.id,v.querySelectorAll('tr[data-row-id]').length]))`);
assert.equal(report.counts['model-catalog'],59);assert.equal(report.counts['model-suitability'],59);assert.equal(report.counts['software-products'],13);assert.equal(report.counts['specialized-models'],9);
report.catalog=await evaluate(`(()=>{const v=document.querySelector('#model-catalog');const row=v.querySelector('[data-row-id="model:qwen-qwen3-8b"]');row.querySelector('.detail button').click();return {query:v.querySelector('input[type=search]').placeholder,overflow:document.documentElement.scrollWidth>innerWidth}})()`);
await pause(200);
report.details=await evaluate(`(()=>{const d=document.querySelector('#model-catalog .detail-row');return {text:d.innerText,links:[...d.querySelectorAll('.source-url')].map(a=>({url:a.href,target:a.target})),notes:[...d.querySelectorAll('.value-note')].map(n=>n.textContent)}})()`);
assert.ok(report.details.links.length>0);assert.ok(report.details.links.every(l=>l.target==='_blank'));assert.ok(report.details.notes.length>0);assert.ok(report.details.text.includes('قابل‌اعمال نیست'));
await evaluate(`(()=>{const view=document.querySelector('#model-catalog');const input=view.querySelector('input[type=search]');input.value='Qwen3-8B';input.dispatchEvent(new Event('input',{bubbles:true}));view.scrollIntoView({behavior:'instant',block:'start'})})()`);await pause(200);
report.searchCount=await evaluate(`document.querySelectorAll('#model-catalog tr[data-row-id]').length`);assert.ok(report.searchCount >= 1 && report.searchCount < 59);
const dir='docs/reviews/local-2026-09-15/';
async function shot(name){const img=await call('Page.captureScreenshot',{format:'png'});await fs.writeFile(dir+name+'.png',Buffer.from(img.data,'base64'));}
await evaluate(`document.querySelector('#model-catalog .table-shell').scrollIntoView({behavior:'instant',block:'center'})`);await pause(700);await evaluate(`window.scrollBy({top:-120,behavior:'instant'})`);await shot('llm-catalog');
await evaluate(`(()=>{const d=document.querySelector('#model-catalog .detail-row');const e=d.querySelector('[data-evidence-id="evidence:qwen-qwen3-8b-weight-files"]');e.open=true;e.scrollIntoView({behavior:'instant',block:'start'});d.closest('.table-shell').scrollTop-=70})()`);await pause(200);await shot('llm-evidence');
await evaluate(`document.querySelector('#software-products .table-shell').scrollIntoView({behavior:'instant',block:'start'})`);await pause(200);await evaluate(`window.scrollBy({top:-120,behavior:'instant'})`);await shot('llm-software');
await call('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:false});await pause(300);await evaluate(`(()=>{const shell=document.querySelector('#software-products .table-shell');shell.scrollTop=0;shell.scrollIntoView({block:'start',behavior:'instant'});window.scrollBy({top:-100,behavior:'instant'})})()`);await pause(100);
report.mobile=await evaluate(`({overflow:document.documentElement.scrollWidth>innerWidth,tableScroll:[...document.querySelectorAll('.table-shell')].map(t=>t.scrollWidth>t.clientWidth)})`);assert.equal(report.mobile.overflow,false);await shot('llm-mobile');
await fs.writeFile(dir+'llm-browser-review.json',JSON.stringify(report,null,2));console.log(JSON.stringify({counts:report.counts,search:report.searchCount,links:report.details.links.length,notes:report.details.notes.length,mobile:report.mobile}));await call('Page.close').catch(()=>{});socket.end();
