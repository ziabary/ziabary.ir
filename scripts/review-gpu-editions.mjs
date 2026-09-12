import fs from 'node:fs/promises';import {call,pause,events,socket} from './browser-session.mjs';
const results=[];
await call('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});
for(const locale of ['en','es']){
 await call('Page.navigate',{url:`http://127.0.0.1:5180/${locale}/guides/gpu-selection/`});await pause(4000);
 const result=await call('Runtime.evaluate',{returnByValue:true,expression:"({title:document.title,language:document.documentElement.lang,text:document.body.innerText.slice(0,120),articleLinks:[...new Set([...document.querySelectorAll('a[href]')].map(a=>a.getAttribute('href')).filter(h=>h.includes('/articles/')))],overflow:document.documentElement.scrollWidth>innerWidth+1,brokenImages:[...document.images].filter(i=>i.complete&&!i.naturalWidth).map(i=>i.src),tables:document.querySelectorAll('table').length})"});
 const data=result.result.value;for(const path of data.articleLinks){const response=await fetch('http://127.0.0.1:4186'+path);if(response.status!==200)(data.invalidProductionLinks??=[]).push(path);}
 results.push({locale,...data});const screenshot=await call('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});await fs.writeFile(`docs/reviews/local-2026-09-09/after/gpu-${locale}-preview-1440.png`,Buffer.from(screenshot.data,'base64'));
}
const exceptions=events.filter(e=>e.method==='Runtime.exceptionThrown');await fs.writeFile('docs/reviews/local-2026-09-09/gpu-editions.json',JSON.stringify({results,exceptions},null,2)+'\n');console.log({results,exceptions});await call('Page.close');socket.end();
