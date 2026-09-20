import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {call,pause,events,socket} from '../scripts/browser-session.mjs';
const origin=process.env.REVIEW_ORIGIN??'http://127.0.0.1:5195';
async function E(expression){const r=await call('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value;}
async function wait(expression){for(let i=0;i<150;i++){if(await E(expression))return;await pause(100);}throw Error(expression);}
async function nav(path){await E('window.__leaving=true');await call('Page.navigate',{url:origin+path});await wait("window.__leaving===undefined&&document.readyState==='complete'");await pause(500);}
try{
 await call('Page.enable');await call('Runtime.enable');
 const images=JSON.parse(await fs.readFile('src/lib/generated/image-sources.json','utf8'));
 for(const locale of ['fa','en','es']){
  const base=locale==='fa'?'':'/'+locale,href=base+'/guides/llm/';
  await nav(base+'/guides/');
  const selector=`a[href="${href}"]`;
  await wait(`!!document.querySelector(${JSON.stringify(selector)})`);
  await E(`document.querySelector(${JSON.stringify(selector)}).scrollIntoView({block:'center'})`);
  await wait(`document.querySelector(${JSON.stringify(selector+' img')}).complete`);
  assert.ok((await E(`document.querySelector(${JSON.stringify(selector+' img')}).currentSrc`)).includes(images['/images/guides/llm.png'].base));
  for(const query of ['', '?show-drafts=false', '?show-drafts=true']){
   await nav(href+query);await wait('!!document.querySelector(".organization-start")');
   assert.ok(await E('!!document.querySelector(".llm-guide #model-catalog")'));
   assert.equal(/noindex/.test(await E('document.querySelector("meta[name=robots]")?.content??""')),query==='?show-drafts=true');
   assert.equal(await E('document.querySelector("link[rel=canonical]").href'),'https://ziabary.ir'+href);
  }
  await nav(href);await E('document.querySelector(".desktop-paths .path-button").click()');await pause(300);
  assert.equal(await E('new URL(location).searchParams.has("show-drafts")'),false);
 }
 assert.deepEqual(events.filter(e=>e.method==='Runtime.exceptionThrown'),[]);
 assert.deepEqual(events.filter(e=>e.method==='Runtime.consoleAPICalled'&&e.params.args?.some(a=>String(a.value).includes('hydration_'))),[]);
 console.log('Passed: all three LLM editions public, indexable, linked from guide cards with original image, and navigable without preview; no hydration/runtime errors.');
}finally{socket.end();}
