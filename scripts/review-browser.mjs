import fs from 'node:fs/promises';
import { call, pause, events, socket } from './browser-session.mjs';
const phase=process.argv[2]||'before';
const origin=process.argv[3]||'http://127.0.0.1:4185';
const destination=`docs/reviews/local-2026-09-09/${phase}`;
await fs.mkdir(destination,{recursive:true});
const paths=[['home','/'],['archive','/articles/'],['article-fa','/articles/national-ai-organization-from-law-to-impact/'],['article-en','/en/articles/apache-mod-jk-log-lock/'],['translation','/en/articles/ztai-indirect-data-access-en/'],['planned','/guides/ai-operator/'],['gpu','/guides/gpu-selection/'],['media','/media/'],['presentation','/slides/enterprise-ai-governance-dba/'],['resume','/resume/']];
if(phase==='after')paths.push(['archive-page-2','/articles/page/2/']);
const results=[];
for(const width of [390,768,1280,1440]) {
 await call('Emulation.setDeviceMetricsOverride',{width,height:1000,deviceScaleFactor:1,mobile:false});
 for(const [name,path] of paths) {
  await call('Page.navigate',{url:origin+path}); await pause(700);
  await call('Runtime.evaluate',{expression:'document.fonts.ready',awaitPromise:true});
  await call('Runtime.evaluate',{expression:"document.documentElement.dataset.theme='light'"});
  const info=await call('Runtime.evaluate',{returnByValue:true,expression:`({title:document.title,path:location.pathname,overflow:document.documentElement.scrollWidth>innerWidth+1,brokenImages:[...document.images].filter(img=>img.complete&&!img.naturalWidth).map(img=>img.src),bytes:document.documentElement.outerHTML.length,headings:document.querySelectorAll('h2').length})`});
  results.push({width,name,...info.result.value});
  const shot=await call('Page.captureScreenshot',{format:'png',fromSurface:true,captureBeyondViewport:false});
  await fs.writeFile(`${destination}/${name}-${width}.png`,Buffer.from(shot.data,'base64'));
  if(width===1440){const html=await call('Runtime.evaluate',{expression:'document.documentElement.outerHTML',returnByValue:true});await fs.writeFile(`${destination}/${name}.html`,html.result.value);}
  if(width===390||width===1440){
   await call('Runtime.evaluate',{expression:"document.documentElement.dataset.theme='dark'"});
   const dark=await call('Page.captureScreenshot',{format:'png',fromSurface:true,captureBeyondViewport:false});
   await fs.writeFile(`${destination}/${name}-${width}-dark.png`,Buffer.from(dark.data,'base64'));
  }
 }
}
await fs.writeFile(`${destination}/browser.json`,JSON.stringify({results,events},null,2)+'\n');
console.log(JSON.stringify({phase,pages:results.length,overflows:results.filter(r=>r.overflow),events:events.filter(event => event.method === 'Runtime.exceptionThrown').length}));
await call('Page.close');socket.end();
