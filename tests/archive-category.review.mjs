import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {call,pause,events,socket} from '../scripts/browser-session.mjs';
const output='docs/reviews/local-2026-09-16/archive-category';
async function E(expression){const r=await call('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value}
async function wait(expression){for(let i=0;i<120;i++){if(await E(expression))return;await pause(100)}throw Error(expression)}
async function click(selector,touch=false){
 await E(`document.querySelector(${JSON.stringify(selector)}).scrollIntoView({block:'center'})`);await pause(80);
 const p=await E(`(()=>{const r=document.querySelector(${JSON.stringify(selector)}).getBoundingClientRect();return{x:r.x+r.width/2,y:r.y+r.height/2}})()`);
 if(touch){await call('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[p]});await call('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});}
 else{await call('Input.dispatchMouseEvent',{type:'mousePressed',...p,button:'left',clickCount:1});await call('Input.dispatchMouseEvent',{type:'mouseReleased',...p,button:'left',clickCount:1});}
 await pause(150);
}
async function key(key,code){await call('Input.dispatchKeyEvent',{type:'keyDown',key,code:key,windowsVirtualKeyCode:code});await call('Input.dispatchKeyEvent',{type:'keyUp',key,code:key,windowsVirtualKeyCode:code});await pause(80)}
const trigger='.category-trigger';
const isOpen="document.querySelector('.category-trigger').getAttribute('aria-expanded')==='true'";
const results=[];
try{
 await fs.mkdir(output,{recursive:true});
 for(const locale of ['fa','en','es'])for(const mobile of [false,true]){
  console.log('Reviewing category picker',locale,mobile?'touch':'mouse');
  await call('Emulation.setDeviceMetricsOverride',{width:mobile?390:1440,height:900,deviceScaleFactor:1,mobile});
  await call('Emulation.setTouchEmulationEnabled',{enabled:mobile});
  const path=(locale==='fa'?'':'/'+locale)+'/articles/';
  await call('Page.navigate',{url:'http://127.0.0.1:4189'+path});
  await wait("!!document.querySelector('.archive-view button:not([disabled])')");await pause(400);
  await click(trigger,mobile);await pause(500);assert.ok(await E(isOpen),'single click/tap remains open after release');
  assert.ok(await E("(()=>{const r=document.querySelector('.category-options').getBoundingClientRect();return r.left>=0&&r.right<=innerWidth})()"));
  const selected=await E("document.querySelector('.category-options button:nth-child(2) span').textContent");
  await click('[data-option-index="1"]',mobile);
  await wait("!!new URL(location.href).searchParams.get('category')");
  assert.equal(await E(isOpen),false);assert.equal(await E("document.querySelector('.category-trigger span').textContent"),selected);
  const category=await E("new URL(location.href).searchParams.get('category')");
  await call('Page.reload');await wait("!!document.querySelector('.archive-view button:not([disabled])')");await pause(250);
  assert.equal(await E("document.querySelector('.category-trigger span').textContent"),selected,'URL selection survives reload');
  await click(trigger,mobile);await key('Escape',27);assert.equal(await E(isOpen),false);
  assert.ok(await E("document.activeElement.matches('.category-trigger')"));
  await click(trigger,mobile);await click('.archive-controls input',mobile);assert.equal(await E(isOpen),false);
  await click(trigger,mobile);await key('Tab',9);assert.equal(await E(isOpen),false);
  await E("document.querySelector('.category-trigger').focus()");await key('ArrowDown',40);assert.ok(await E(isOpen));
  await key('End',35);await key('Enter',13);await pause(300);assert.equal(await E(isOpen),false);
  await click(trigger,mobile);await key('Home',36);await key('Enter',13);await wait("!new URL(location.href).searchParams.has('category')");
  await click(trigger,mobile);await click(trigger,mobile);assert.equal(await E(isOpen),false,'second click toggles closed');
  await click(trigger,mobile);
  const screenshot=await call('Page.captureScreenshot',{format:'png'});await fs.writeFile(`${output}/${locale}-${mobile?'mobile':'desktop'}.png`,Buffer.from(screenshot.data,'base64'));
  results.push({locale,mobile,category,clickRelease:true,selection:true,reload:true,escape:true,outside:true,tab:true,arrows:true,clear:true});
 }
 assert.deepEqual(events.filter(e=>e.method==='Runtime.exceptionThrown'),[]);
 await fs.writeFile(output+'/browser-review.json',JSON.stringify({cases:results,runtimeErrors:0},null,2));
 console.log('PASS: category picker stays open after mouse/touch release; selection, URL, keyboard and dismissal work in all languages.');
}finally{await call('Page.close').catch(()=>{});socket.end()}
