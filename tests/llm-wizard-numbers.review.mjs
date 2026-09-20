import assert from 'node:assert/strict';
import {call,pause,socket} from '../scripts/browser-session.mjs';
const root=process.env.REVIEW_ORIGIN??'http://127.0.0.1:5196';
const E=async expression=>{const r=await call('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value;};
async function nav(locale='fa'){await E('window.__leaving=true');await call('Page.navigate',{url:root+(locale==='fa'?'':'/'+locale)+'/guides/llm/?show-drafts=true'});for(let i=0;i<180;i++){if(await E('window.__leaving===undefined&&!!document.querySelector(".organization-start")')){await pause(700);return;}await pause(150);}throw Error('Page timeout');}
async function seed(answers,step,locale='fa'){await E(`localStorage.setItem('llm-wizard-state-v2',JSON.stringify({version:'2026-09-19.2',answers:${JSON.stringify(answers)},step:${step},statuses:{},finished:false}))`);await nav(locale);}
const field=id=>`[data-question="${id}"] input[type=text]`;
async function enter(id,value){await E(`(()=>{const el=document.querySelector(${JSON.stringify(field(id))});el.value=${JSON.stringify(value)};el.dispatchEvent(new Event('input',{bubbles:true}));})()`);await pause(100);}
async function click(selector){await E(`document.querySelector(${JSON.stringify(selector)}).click()`);await pause(120);}
const stored=()=>E('JSON.parse(localStorage.getItem("llm-wizard-state-v2")).answers');
try{
 await call('Runtime.enable');await call('Page.enable');await nav();
 await seed({task:'documents',mode:'interactive',audience:'organization',phase:'pilot',users:'40',concurrency:'2',requests:'200',hours:'8',firstResponse:'2',fullResponse:'10'},2);
 for(const value of ['25','-1','abc','0','24.01']){await enter('hours',value);assert.equal(await E(`document.querySelector('${field('hours')}').getAttribute('aria-invalid')`),'true');assert.equal((await stored()).hours,undefined);assert.equal(await E('document.querySelector(".step-actions .primary").disabled'),true);}
 await enter('hours','۲۴');assert.equal((await stored()).hours,'24');assert.equal(await E('document.querySelector(".step-actions .primary").disabled'),false);
 await enter('hours','۰٫۵');assert.equal((await stored()).hours,'0.5');
 await enter('users','1.5');assert.equal((await stored()).users,undefined);await enter('users','۴۰');assert.equal((await stored()).users,'40');
 await enter('fullResponse','1');assert.ok(await E('!!document.querySelector("#error-fullResponse")'));await enter('firstResponse','0.5');assert.equal((await stored()).fullResponse,'1');assert.equal(await E('document.querySelector(".step-actions .primary").disabled'),false);
 await seed({task:'documents',currency:'usd',capex:'100',monthly:'10',months:'3',owner:'provider'},4);
 await click('input[name=wizard-currency][value="million-toman"]');assert.ok(await E('!!document.querySelector("[data-question=usdRate]")'));assert.equal((await stored()).capex,undefined);
 await enter('usdRate','0');assert.ok(await E('!!document.querySelector("#error-usdRate")'));await enter('usdRate','۲۳۰۰۰۰');await enter('capex','۲۳۰');await enter('monthly','۲۳');assert.equal((await stored()).usdRate,'230000');assert.equal(await E('document.querySelector(".step-actions .primary").disabled'),false);
 assert.match(await E('document.querySelector("[data-question=capex]").textContent'),/میلیون تومان/);
 await nav();assert.equal((await stored()).capex,'230');assert.equal(await E(`document.querySelector('${field('usdRate')}').value`),'230000');
 await click('input[name=wizard-currency][value=eur]');assert.equal(await E('!!document.querySelector("[data-question=usdRate]")'),false);assert.equal((await stored()).capex,undefined);assert.equal((await stored()).usdRate,undefined);
 for(const locale of ['en','es']){
  await seed({task:'writing',currency:'million-toman',capex:'500',monthly:'20',usdRate:'230000',months:'3'},4,locale);
  assert.deepEqual(await E('[...document.querySelectorAll("input[name=wizard-currency]")].map(i=>i.value)'),['usd','eur']);assert.equal((await stored()).capex,undefined);assert.equal(await E('!!document.querySelector("[data-question=usdRate]")'),false);
  await click('[data-question=currency] button[aria-expanded]');assert.doesNotMatch(await E('document.querySelector("#help-currency .help-text").textContent'),/toman|tomán|rial/i);await click('input[name=wizard-currency][value=usd]');await enter('capex','-1');assert.ok(await E('!!document.querySelector("#error-capex")'));await enter('capex','0');assert.equal((await stored()).capex,'0');
 }
 console.log('Passed: numeric ranges, integer counts, Persian decimals, cross-field errors, immediate persistence validation, FX question, million-toman units, currency reset and EN/ES currencies.');
}finally{socket.end();}
