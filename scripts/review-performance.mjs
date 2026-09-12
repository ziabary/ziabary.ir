import fs from 'node:fs/promises';import {call,pause,socket} from './browser-session.mjs';
await call('Network.setCacheDisabled',{cacheDisabled:true});
await call('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});
await call('Page.addScriptToEvaluateOnNewDocument',{source:"window.__lcp=0;new PerformanceObserver(l=>{for(const e of l.getEntries())window.__lcp=e.startTime}).observe({type:'largest-contentful-paint',buffered:true})"});
const results=[];
for(const [phase,origin] of [['before','http://127.0.0.1:4185'],['after','http://127.0.0.1:4186']])for(const path of ['/','/articles/','/guides/gpu-selection/']){
 await call('Page.navigate',{url:origin+path});await pause(1800);
 const result=await call('Runtime.evaluate',{returnByValue:true,expression:`(()=>{const resources=performance.getEntriesByType('resource'); const totals={};for(const r of resources){if(!r.name.startsWith(location.origin))continue; const category=/\\.(woff2?|ttf)(\\?|$)/.test(r.name)?'fonts':/\\.(png|jpe?g|webp|svg)(\\?|$)/.test(r.name)?'images':/\\.js(\\?|$)/.test(r.name)?'javascript':'other';totals[category]??={requests:0,decodedBytes:0,transferredBytes:0};totals[category].requests++;totals[category].decodedBytes+=r.decodedBodySize;totals[category].transferredBytes+=r.transferSize;}const n=performance.getEntriesByType('navigation')[0];return{totals,htmlBytes:n.decodedBodySize,domContentLoadedMs:Math.round(n.domContentLoadedEventEnd),fcpMs:Math.round(performance.getEntriesByName('first-contentful-paint')[0]?.startTime??0),lcpMs:Math.round(window.__lcp),resources:resources.filter(r=>r.name.startsWith(location.origin)).map(r=>({url:r.name.replace(location.origin,''),bytes:r.decodedBodySize}))}})()`});
 results.push({phase,path,...result.result.value});
}
await fs.writeFile('docs/reviews/local-2026-09-09/performance.json',JSON.stringify({environment:'Same Chrome, 1440×1000, local static HTTP, cache disabled, analytics blocked, single run; timings are indicative, not Lighthouse scores.',results},null,2)+'\n');
console.log(results.map(({resources,...r})=>r));await call('Page.close');socket.end();
