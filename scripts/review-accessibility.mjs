import fs from 'node:fs/promises';import {call,pause,socket} from './browser-session.mjs';
const evaluate=async expression=>(await call('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true})).result.value;
const results=[];const origin='http://127.0.0.1:4186';
await call('Emulation.setDeviceMetricsOverride',{width:390,height:900,deviceScaleFactor:1,mobile:false});
for(const theme of ['light','dark'])for(const [path,selectors] of [['/articles/',['.archive-row p','.row-meta','.text-link']],['/media/',['.media-row p','.entry-actions a']]]){
 await call('Page.navigate',{url:origin+path});await pause(500);await evaluate(`document.documentElement.dataset.theme='${theme}'`);
 if(path==='/articles/')await evaluate("(()=>{const select=document.querySelector('.archive-view select');select.value='list';select.dispatchEvent(new Event('change',{bubbles:true}));})()");
 const ratios=await evaluate(`(()=>{const pixel=color=>{const c=document.createElement('canvas');c.width=c.height=1;const x=c.getContext('2d');x.fillStyle=color;x.fillRect(0,0,1,1);return [...x.getImageData(0,0,1,1).data]};const lum=rgb=>rgb.slice(0,3).map(v=>v/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4).reduce((s,v,i)=>s+v*[.2126,.7152,.0722][i],0);const background=pixel(getComputedStyle(document.documentElement).getPropertyValue('--bg'));return ${JSON.stringify(selectors)}.map(selector=>{const el=document.querySelector(selector);const color=getComputedStyle(el).color;const a=lum(pixel(color)),b=lum(background);return {selector,color,ratio:Number(((Math.max(a,b)+.05)/(Math.min(a,b)+.05)).toFixed(2))}})})()`);
 results.push({theme,path,ratios});
}
await call('Page.navigate',{url:origin+'/guides/gpu-selection/#gpu-comparison-table'});await pause(600);
const keyboard=[];
for(const id of ['gpu-comparison-table','server-comparison-table']){
 const before=await evaluate(`(()=>{const table=document.querySelector('#${id} .table-shell');table.focus();return {left:table.scrollLeft,width:table.clientWidth,scrollWidth:table.scrollWidth,focused:document.activeElement===table}})()`);
 await call('Input.dispatchKeyEvent',{type:'keyDown',key:'ArrowLeft',code:'ArrowLeft',windowsVirtualKeyCode:37});await call('Input.dispatchKeyEvent',{type:'keyUp',key:'ArrowLeft',code:'ArrowLeft',windowsVirtualKeyCode:37});await pause(200);
 const after=await evaluate(`document.querySelector('#${id} .table-shell').scrollLeft`);keyboard.push({id,...before,after,passed:before.focused&&after!==before.left});
}
await evaluate("window.__csv=[];const create=URL.createObjectURL;URL.createObjectURL=blob=>{blob.text().then(text=>window.__csv.push(text));return create(blob)};const click=HTMLAnchorElement.prototype.click;HTMLAnchorElement.prototype.click=function(){if(!this.download)click.call(this)}");
const csv=[];
for(const id of ['gpu-comparison-table','server-comparison-table']){
 await evaluate(`window.__csv=[];document.querySelector('#${id} .export').click()`);await pause(100);
 await evaluate(`document.querySelector('#${id} .filters').open=true;document.querySelector('#${id} .show-all').click()`);
 await evaluate(`document.querySelector('#${id} .export').click()`);await pause(100);
 csv.push({id,...await evaluate("({count:window.__csv.length,equal:window.__csv[0]===window.__csv[1],length:window.__csv[0]?.length,rows:window.__csv[0]?.split('\\n').length})")});
}
const report={contrastSamples:results,keyboard,csv};await fs.writeFile('docs/reviews/local-2026-09-09/accessibility.json',JSON.stringify(report,null,2)+'\n');console.log(report);await call('Page.close');socket.end();process.exitCode=keyboard.some(r=>!r.passed)||csv.some(r=>!r.equal)||results.some(r=>r.ratios.some(x=>x.ratio<4.5))?1:0;
