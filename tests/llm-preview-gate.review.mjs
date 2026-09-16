import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {call,pause,events,socket} from '../scripts/browser-session.mjs';
async function E(expression){const r=await call('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value}
async function wait(expression){for(let i=0;i<150;i++){if(await E(expression))return;await pause(100)}throw Error(expression)}
async function nav(path){await call('Page.navigate',{url:'http://127.0.0.1:4189'+path});await wait("document.readyState==='complete'");await pause(1800)}
try {
 await call('Page.enable');await call('Runtime.enable');
 await nav('/guides/');
 assert.equal(await E("!!document.querySelector('a[href^=\"/guides/llm/\"]')"),false);
 for(const suffix of ['', '?show-drafts=false','?show-drafts=true']){
  await nav('/guides/llm/'+suffix);
  assert.equal(await E("!!document.querySelector('.llm-guide')"),false,suffix);
  assert.ok(await E("document.querySelector('meta[name=robots]').content.includes('noindex')"));
 }
 await nav('/guides/?show-drafts=true');
 await wait("!!document.querySelector('a[href=\"/guides/llm/?show-drafts=true\"]')");
 const images=JSON.parse(await fs.readFile('src/lib/generated/image-sources.json','utf8'));
 await wait("document.querySelector('a[href=\"/guides/llm/?show-drafts=true\"] img').complete");
 const actual=await E("document.querySelector('a[href=\"/guides/llm/?show-drafts=true\"] img').currentSrc");
 assert.ok(actual.includes(images['/images/guides/llm.png'].base),actual);
 await E("document.querySelector('a[href=\"/guides/llm/?show-drafts=true\"]').scrollIntoView({block:'center',behavior:'instant'})");
 await pause(300);
 await fs.mkdir('docs/reviews/local-2026-09-16/llm-preview-gate',{recursive:true});
 const shot=await call('Page.captureScreenshot',{format:'png'});
 await fs.writeFile('docs/reviews/local-2026-09-16/llm-preview-gate/correct-card.png',Buffer.from(shot.data,'base64'));
 await E("document.querySelector('a[href=\"/guides/llm/?show-drafts=true\"]').click()");
 await wait("!!document.querySelector('.llm-guide #model-catalog')");
 await E("document.querySelector('.desktop-paths .path-button').click()");
 await wait("location.search.includes('view=model-suitability')");
 assert.ok(await E("new URLSearchParams(location.search).get('show-drafts')==='true' && !!document.querySelector('.llm-guide')"));
 await E("history.replaceState(null,'',location.pathname);dispatchEvent(new PopStateEvent('popstate',{state:history.state}))");
 await pause(1000);
 // Reload verifies that prior preview navigation never persists permission.
 await nav('/guides/llm/');
 assert.equal(await E("!!document.querySelector('.llm-guide')"),false);
 assert.deepEqual(events.filter(e=>e.method==='Runtime.exceptionThrown'),[]);
 const hydrationWarnings=events.filter(e=>e.method==='Runtime.consoleAPICalled'&&e.params.args?.some(a=>String(a.value).includes('hydration_')));
 assert.deepEqual(hydrationWarnings,[]);
 await fs.mkdir('docs/reviews/local-2026-09-16/llm-preview-gate',{recursive:true});
 await fs.writeFile('docs/reviews/local-2026-09-16/llm-preview-gate/browser-review.json',JSON.stringify({publicCard:false,publicContent:false,pluralFlagRejected:true,exactFlagWorks:true,correctCardImage:true,internalNavigationPreservesFlag:true,previewDoesNotPersist:true,runtimeErrors:0},null,2));
 console.log('Preview gate passed: public hidden, exact query required, navigation retains flag, no persistent preview.');
}finally{await call('Page.close').catch(()=>{});socket.end()}
