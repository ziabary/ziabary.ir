// Run against the local site (5173) and community container (8787); keeps both running.
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {mkdtemp,mkdir,rm,writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {browserSession} from './cdp.mjs';

const site='http://localhost:5173',api='http://localhost:8787',port=9335;
const profile=await mkdtemp(join(tmpdir(),'all-pages-chrome-'));
const output=new URL('../test-results/',import.meta.url);await mkdir(output,{recursive:true});
const chrome=spawn(process.env.CHROME_BIN||'/usr/bin/google-chrome',['--headless=new','--no-sandbox','--disable-gpu','--no-first-run','--no-default-browser-check',`--remote-debugging-port=${port}`,`--user-data-dir=${profile}`],{stdio:'ignore'});
let browser;
try{
 for(let n=0;n<100;n++){try{await fetch(`http://127.0.0.1:${port}/json/version`);break;}catch{await new Promise(resolve=>setTimeout(resolve,100));}}
 browser=await browserSession(port);const {call,evaluate:E,wait,pause,events}=browser;
 await call('Network.setUserAgentOverride',{userAgent:'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36'});
 let blocked=false;await call('Fetch.enable',{patterns:[{urlPattern:api+'/*'}]});
 browser.on('Fetch.requestPaused',event=>void call(blocked?'Fetch.failRequest':'Fetch.continueRequest',blocked?{requestId:event.requestId,errorReason:'ConnectionRefused'}:{requestId:event.requestId}));
 const visitRequests=()=>events.filter(event=>event.method==='Network.requestWillBeSent'&&event.params.request.method==='POST'&&event.params.request.url===api+'/api/public/visits');
 const results=[];
 for(const locale of ['fa','en','es']){
  const prefix=locale==='fa'?'':`/${locale}`;
  for(const suffix of ['/','/guides/','/articles/']){
   const path=prefix+suffix,start=events.length,visits=visitRequests().length;
   if(!results.length)await call('Page.navigate',{url:site+path});
   else await E(`(()=>{const a=document.createElement('a');a.href=${JSON.stringify(path)};a.textContent='Review navigation';document.body.append(a);a.click();a.remove();})()`);
   await wait(`location.pathname===${JSON.stringify(path)}&&!!document.querySelector('[data-community-counter]:not([hidden])')`);
   for(let n=0;n<70&&visitRequests().length===visits;n++)await pause(100);
   assert.equal(visitRequests().length,visits+1,path+' records one visit');await pause(150);
   const ui=await E(`(()=>{const counter=document.querySelector('[data-community-counter]');return {text:counter.textContent,dir:counter.dir,lang:counter.lang,forms:document.querySelectorAll('.community-form').length,widgets:document.querySelectorAll('.community-widget').length,beforeFooter:!!(counter.compareDocumentPosition(document.querySelector('footer'))&Node.DOCUMENT_POSITION_FOLLOWING)};})()`);
   assert.equal(ui.forms,0);assert.equal(ui.widgets,0);assert.equal(ui.lang,locale);assert.equal(ui.dir,locale==='fa'?'rtl':'ltr');assert(ui.beforeFooter);
   assert(ui.text.includes({fa:'بازدید',en:'views',es:'visitas'}[locale]),ui.text);
   const requests=events.slice(start).filter(event=>event.method==='Network.requestWillBeSent').map(event=>event.params.request.url);
   const unexpected=requests.filter(url=>url===api+'/widget.css'||url.includes('/api/public/comments')||/(?:^|\.)arcaptcha\./.test(new URL(url).hostname));
   assert.equal(unexpected.length,0,JSON.stringify(unexpected));
   results.push({path,...ui});
  }
  for(const width of [390,1440])for(const theme of ['light','dark']){
   await call('Emulation.setDeviceMetricsOverride',{width,height:900,deviceScaleFactor:1,mobile:width<700});
   await E(`document.documentElement.dataset.theme='${theme}';document.querySelector('[data-community-counter]').scrollIntoView({block:'center',behavior:'instant'})`);await pause(80);
   assert(await E(`(()=>{const r=document.querySelector('[data-community-counter]').getBoundingClientRect();return r.left>=0&&r.right<=innerWidth;})()`));
   const shot=await call('Page.captureScreenshot',{format:'png'});await writeFile(new URL(`page-counter-${locale}-${width}-${theme}.png`,output),Buffer.from(shot.data,'base64'));
  }
 }
 const beforeRecovery=visitRequests().length;blocked=true;await E("window.dispatchEvent(new Event('offline'));window.dispatchEvent(new Event('online'))");
 await wait("document.querySelector('[data-community-counter]').hidden");await pause(600);
 blocked=false;await E("window.dispatchEvent(new Event('online'))");await wait("!document.querySelector('[data-community-counter]').hidden");await pause(250);
 assert.equal(visitRequests().length,beforeRecovery,'recovery does not duplicate a completed visit');
 for(const [locale,path] of [['fa','/articles/int8-or-fp8-real-gpu-support/'],['en','/en/articles/int8-or-fp8-real-gpu-support-en/'],['es','/es/articles/int8-or-fp8-real-gpu-support-es/']]){
  await call('Page.navigate',{url:site+path});await wait("!!document.querySelector('[data-community-slot]:not([hidden]) .community-form')");
  assert.equal(await E("document.querySelector('[data-community-counter]').hidden"),true);
  assert.equal(await E("document.querySelector('.community-widget').dir"),locale==='fa'?'rtl':'ltr');
  assert.equal(await E("document.querySelector('.community-widget h2').textContent"),{fa:'گفت‌وگو درباره این نوشته',en:'Join the conversation',es:'Conversación sobre este artículo'}[locale]);
  await pause(2100);results.push({path,commentForm:true});
 }
 const exceptions=events.filter(event=>event.method==='Runtime.exceptionThrown');assert.equal(exceptions.length,0,JSON.stringify(exceptions));
 const report={status:'passed',pages:results,outageRecovery:true,recoveryDeduplication:true,nonArticleCaptchaRequests:0,viewports:[390,1440],themes:['light','dark']};
 await writeFile(new URL('all-pages.json',output),JSON.stringify(report,null,2));console.log(JSON.stringify(report));
}finally{
 if(browser)await browser.call('Browser.close').catch(()=>{});chrome.kill();await rm(profile,{recursive:true,force:true,maxRetries:5,retryDelay:200});
}
