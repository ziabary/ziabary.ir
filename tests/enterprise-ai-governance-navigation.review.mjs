import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {readFileSync,existsSync} from 'node:fs';
import {mkdtemp,rm,writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {browserSession} from '../services/community/test/cdp.mjs';

// Run after npm run build, with the site available at SITE_TEST_URL (default localhost:5173).
const base=process.env.SITE_TEST_URL??'http://localhost:5173';
const collection=JSON.parse(readFileSync('content/guides/fa/collections.json','utf8'))
 .find(item=>item.slug==='enterprise-ai-governance');
const lessons=collection.items.filter(item=>existsSync(`build/articles/${item.id}/index.html`));
assert(lessons.length>0);
const selected=lessons[Math.floor(lessons.length/2)];
const coursePath=`/guides/${collection.slug}/`;
const profile=await mkdtemp(join(tmpdir(),'governance-navigation-'));
const port=9335;
const chrome=spawn('/usr/bin/google-chrome',['--headless=new','--no-sandbox','--disable-gpu',
 `--remote-debugging-port=${port}`,`--user-data-dir=${profile}`],{stdio:'ignore'});
let browser;
try{
 for(let attempt=0;attempt<100;attempt++){
  try{await fetch(`http://127.0.0.1:${port}/json/version`);break;}
  catch{await new Promise(resolve=>setTimeout(resolve,100));}
 }
 browser=await browserSession(port);
 const {call,evaluate:E,wait,pause}=browser;
 const allOpen="[...document.querySelectorAll('.chapter-details')].every(node=>node.open)";
 await call('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});
 await call('Page.navigate',{url:base+coursePath});
 await wait(`document.querySelectorAll('.guide-entry').length===${lessons.length}`);
 await E('document.fonts.ready');await pause(500);
 assert(await E("[...document.querySelectorAll('.chapter-details')].every(node=>!node.open)"));
 for(const [index,item] of [lessons[0],selected,lessons.at(-1)].entries()){
  const selector=`#${item.id} > header h2 a`;
  assert.equal(await E(`document.querySelector('${selector}').getAttribute('href')`),`#${item.id}`);
  await E(`document.querySelector('${selector}').scrollIntoView({block:'center',behavior:'instant'});document.querySelector('${selector}').focus()`);
  if(index===1){
   await call('Input.dispatchKeyEvent',{type:'keyDown',key:'Enter',code:'Enter',windowsVirtualKeyCode:13});
   await call('Input.dispatchKeyEvent',{type:'keyUp',key:'Enter',code:'Enter',windowsVirtualKeyCode:13});
  }else await E(`document.querySelector('${selector}').click()`);
  await wait(`document.querySelector('#${item.id} .chapter-details').open`);
  assert.equal(await E('location.pathname'),coursePath);
 }
 await call('Page.navigate',{url:`${base}/articles/${selected.id}/`});
 await wait("!!document.querySelector('.series-reading-link')");
 await E('document.fonts.ready');await pause(500);
 const href=await E("document.querySelector('.series-reading-link').getAttribute('href')");
 const target=new URL(href,base);
 assert.equal(target.pathname,coursePath);
 assert.equal(target.searchParams.get('view'),'continuous');
 assert.equal(target.hash,`#${selected.id}`);
 assert(!target.searchParams.has('show-drafts'));
 for(const width of [390,1440])for(const theme of ['light','dark']){
  await call('Emulation.setDeviceMetricsOverride',{width,height:1000,deviceScaleFactor:1,mobile:width<700});
  await E(`document.documentElement.dataset.theme='${theme}';window.scrollTo({top:0,behavior:'instant'})`);await pause(100);
  assert(await E('document.documentElement.scrollWidth<=innerWidth'));
  const shot=await call('Page.captureScreenshot',{format:'png'});
  await writeFile(`/tmp/ziabary-course-navigation-${width}-${theme}.png`,Buffer.from(shot.data,'base64'));
 }
 await E("document.querySelector('.series-reading-link').click()");
 await wait(`document.querySelectorAll('.chapter-details').length===${lessons.length}&&${allOpen}`);
 await E('document.fonts.ready');await pause(600);
 assert.equal(await E('location.pathname'),coursePath);
 assert.equal(await E("document.querySelector('.continuous-toggle').getAttribute('aria-pressed')"),'true');
 const position=await E(`document.getElementById('${selected.id}').getBoundingClientRect().top`);
 assert(position>-30&&position<250,`Selected lesson landing is offscreen: ${position}`);
 await E("document.querySelector('.continuous-toggle').click()");
 await wait("[...document.querySelectorAll('.chapter-details')].every(node=>!node.open)");
 await E("document.querySelector('.continuous-toggle').click()");await wait(allOpen);
 await pause(400);assert(await E(allOpen));
 await call('Page.navigate',{url:`${base}/articles/${selected.id}/?show-drafts=true`});
 await wait("document.querySelector('.series-reading-link')?.getAttribute('href').includes('show-drafts=true')");
 await E('document.fonts.ready');await pause(300);
 await E("document.querySelector('.series-reading-link').click()");
 await wait(`!!document.querySelector('.preview-notice')&&document.querySelectorAll('.chapter-details').length>=${lessons.length}&&${allOpen}`);
 await E('document.fonts.ready');await pause(600);
 assert(await E(allOpen));
 assert.equal(await E("new URLSearchParams(location.search).get('show-drafts')"),'true');
 assert.equal(await E("new URLSearchParams(location.search).get('view')"),'continuous');
 assert(await E("document.querySelector('meta[name=robots]')?.content.includes('noindex')"));
 assert.equal(browser.events.filter(event=>event.method==='Runtime.exceptionThrown').length,0);
 console.log(`${lessons.length} lessons: titles open in place by click and keyboard; standalone links open continuous reading at the selected lesson; collapse and draft preview work; mobile/desktop themes have no horizontal overflow.`);
}finally{
 if(browser)await browser.call('Browser.close').catch(()=>{});
 chrome.kill();
 await rm(profile,{recursive:true,force:true,maxRetries:5,retryDelay:100});
}
