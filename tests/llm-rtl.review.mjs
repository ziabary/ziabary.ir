import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { call, pause, events, socket } from '../scripts/browser-session.mjs';
const origin=process.env.LLM_REVIEW_ORIGIN??'http://127.0.0.1:4189';
const phase=process.env.LLM_REVIEW_PHASE??'after';
const output='docs/reviews/local-2026-09-15/llm-rtl';
const report={phase,checks:[],screenshots:[]};
async function E(expression){const r=await call('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value;}
async function wait(expression){for(let i=0;i<100;i++){if(await E(expression))return;await pause(120);}throw Error('Timeout: '+expression);}
async function frame(selector){await E(`{const el=document.querySelector(${JSON.stringify(selector)});window.scrollTo({top:el.getBoundingClientRect().top+scrollY-100,behavior:'instant'});}`);await pause(200);}
async function shot(name){await pause(180);const r=await call('Page.captureScreenshot',{format:'png'});const file=phase+'-'+name+'.png';await fs.writeFile(output+'/'+file,Buffer.from(r.data,'base64'));report.screenshots.push(file);}
async function nav(){await call('Page.navigate',{url:origin+'/guides/llm/?show-drafts=true'});await wait(`document.querySelectorAll('#model-catalog tr[data-row-id]').length===87`);await E(`document.fonts.ready`);await E(`document.documentElement.dataset.theme='dark';document.documentElement.style.scrollBehavior='auto'`);await pause(200);}
async function click(selector){await E(`document.querySelector(${JSON.stringify(selector)}).click()`);await pause(180);}
const header='#model-catalog thead th[data-column="context"]';
async function assertControls(){
 const geometry=await E(`Array.from(document.querySelectorAll('.hide-column,.close-profile')).filter(b=>b.getBoundingClientRect().width && (b.classList.contains('hide-column') || b.closest('dialog')?.open)).map(b=>{const box=b.getBoundingClientRect(),glyph=b.querySelector('svg')?.getBoundingClientRect();return {label:b.getAttribute('aria-label'),width:box.width,height:box.height,dx:glyph?Math.abs(glyph.x+glyph.width/2-box.x-box.width/2):Infinity,dy:glyph?Math.abs(glyph.y+glyph.height/2-box.y-box.height/2):Infinity,overflow:b.scrollWidth>b.clientWidth+1};})`);
 assert.ok(geometry.length>10);
 for(const g of geometry){assert.ok(g.dx<1&&g.dy<1,JSON.stringify(g));assert.ok(!g.overflow,JSON.stringify(g));assert.ok(g.width>=24&&g.height>=24,JSON.stringify(g));}
}
try{
 await fs.mkdir(output,{recursive:true});await call('Page.enable');await call('Runtime.enable');await call('Page.bringToFront');await call('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});await nav();
 await E(`document.querySelector('#model-catalog .table-shell').scrollLeft=-10000`);await frame('#model-catalog .column-toolbar');await shot('desktop-table');
 if(phase==='after'){
  assert.match(await E(`document.querySelector(${JSON.stringify(header)}).innerText`),/حداکثر طول متن/);
  assert.match(await E(`document.querySelector('#model-catalog th[data-column="downloads"]').innerText`),/دریافت و اجرای مدل/);
  assert.equal(await E(`getComputedStyle(document.querySelector(${JSON.stringify(header)})).direction`),'rtl');
  const tokens=await E(`Array.from(document.querySelectorAll('#model-catalog td[data-column="context"] .token-value')).slice(0,12).map(e=>{const text=e.firstChild,numberEnd=e.textContent.indexOf(' '),wordStart=e.textContent.indexOf('توکن');const n=document.createRange(),u=document.createRange();n.setStart(text,0);n.setEnd(text,numberEnd);u.setStart(text,wordStart);u.setEnd(text,wordStart+4);const nr=n.getBoundingClientRect(),ur=u.getBoundingClientRect(),cell=e.closest('td').getBoundingClientRect();return {text:e.textContent,rtl:getComputedStyle(e).direction,numberOnRight:nr.left>=ur.right,inline:Math.abs(nr.top-ur.top)<1,inCell:nr.left>=cell.left&&nr.right<=cell.right&&ur.left>=cell.left&&ur.right<=cell.right};})`);
  assert.equal(tokens.length,12);for(const t of tokens){assert.equal(t.rtl,'rtl');assert.ok(t.numberOnRight&&t.inline&&t.inCell,JSON.stringify(t));}report.tokens=tokens;
  await assertControls();
  const contextAlignment=await E(`(()=>{const title=document.querySelector('#model-catalog th[data-column="context"] .column-label').getBoundingClientRect(),value=document.querySelector('#model-catalog td[data-column="context"] .token-value').getBoundingClientRect();return Math.abs(title.right-value.right)})()`);assert.ok(contextAlignment<2,String(contextAlignment));
  const clip=await E(`(()=>{const th=document.querySelector('#model-catalog th[data-column="context"]').getBoundingClientRect(),last=document.querySelectorAll('#model-catalog td[data-column="context"]')[2].getBoundingClientRect();return {x:th.x+scrollX-2,y:th.y+scrollY-20,width:th.width+4,height:Math.min(last.bottom,innerHeight)-th.y+20,scale:2}})()`);
  const detail=await call('Page.captureScreenshot',{format:'png',clip,captureBeyondViewport:true});await fs.writeFile(output+'/after-context-detail.png',Buffer.from(detail.data,'base64'));report.screenshots.push('after-context-detail.png');
  const order=await E(`(()=>{const h=document.querySelector(${JSON.stringify(header)}),label=h.querySelector('.column-label').getBoundingClientRect(),hide=h.querySelector('.hide-column').getBoundingClientRect();return hide.right<=label.left})()`);assert.ok(order);
  await click(header+' .sort-column');assert.equal(await E(`document.querySelector(${JSON.stringify(header+' .sort-indicator')}).innerText`),'↑');await click(header+' .sort-column');assert.equal(await E(`document.querySelector(${JSON.stringify(header+' .sort-indicator')}).innerText`),'↓');
  await click(header+' .hide-column');assert.equal(await E(`!!document.querySelector(${JSON.stringify(header)})`),false);await click('#model-catalog .restore-column[data-column="context"]');assert.ok(await E(`!!document.querySelector(${JSON.stringify(header)})`));
  await E(`document.querySelector('#model-catalog .table-shell').scrollLeft=-10000`);await frame('#model-catalog .column-toolbar');await shot('desktop-table-sorted');
  report.checks.push('Persian headers use RTL; 12 token values have the number on the right and the Persian unit on the left on one line; SVG close icons are centered. Sorting, hide and restore work.');
 }
 await E(`document.querySelector('#model-catalog .table-shell').scrollLeft=0`);await click('#model-catalog tr[data-row-id="model:baai-bge-m3"] .profile-link');await wait(`document.querySelector('.model-profile')?.open`);await shot('desktop-profile');
 if(phase==='after'){
  await assertControls();assert.match(await E(`document.querySelector('.profile-body').innerText`),/حداکثر طول متن \(اعلام ناشر\)/);
  await call('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});await shot('mobile-profile');await assertControls();
  await E(`document.querySelector('.close-profile').focus()`);await call('Input.dispatchKeyEvent',{type:'keyDown',key:'Enter',code:'Enter',windowsVirtualKeyCode:13,text:'\r'});await call('Input.dispatchKeyEvent',{type:'keyUp',key:'Enter',code:'Enter',windowsVirtualKeyCode:13});await wait(`!document.querySelector('.model-profile').open`);
  await E(`document.querySelector('#model-catalog .table-shell').scrollLeft=-10000`);await frame('#model-catalog .column-toolbar');await shot('mobile-table');assert.equal(await E(`document.documentElement.scrollWidth<=innerWidth`),true);
  await E(`document.documentElement.dataset.theme='light'`);await shot('mobile-table-light');await assertControls();
  await call('Emulation.setDeviceMetricsOverride',{width:320,height:720,deviceScaleFactor:1,mobile:true});await frame('#model-catalog .column-toolbar');assert.equal(await E(`document.documentElement.scrollWidth<=innerWidth`),true);await assertControls();await shot('mobile-320-table-light');
  const tableHeader=await E(`Array.from(document.querySelectorAll('#model-catalog .th-inner')).map(e=>({width:e.clientWidth,scroll:e.scrollWidth}))`);assert.ok(tableHeader.every(e=>e.scroll<=e.width+1),JSON.stringify(tableHeader));
  report.checks.push('390px and 320px layouts have no page/header overflow; dark/light themes pass; Enter closes the focused dialog button.');
  assert.equal(events.filter(e=>e.method==='Runtime.exceptionThrown').length,0);report.checks.push('No browser runtime exceptions.');
 }
 await fs.writeFile(output+'/'+phase+'-report.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));
}finally{await call('Page.close').catch(()=>{});socket.end();}
