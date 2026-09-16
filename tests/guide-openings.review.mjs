import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {call,pause,events,socket} from '../scripts/browser-session.mjs';
const out='docs/reviews/local-2026-09-16/guide-openings';
const origin=process.env.REVIEW_ORIGIN??'http://127.0.0.1:5190';
async function E(expression){const r=await call('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value;}
async function wait(expression){for(let i=0;i<400;i++){if(await E(expression))return;await pause(150);}throw Error(expression);}
const pages=[['gpu','/guides/gpu-selection/','#gpu-comparison-table'],['llm','/guides/llm/?show-drafts=true','#model-catalog']];
const report=[];
try{
 await call('Page.enable');await call('Runtime.enable');await call('Page.addScriptToEvaluateOnNewDocument',{source:"localStorage.setItem('ziabary-theme','dark')"});
 for(const [name,path,table] of pages)for(const width of [1440,390]){
  await call('Emulation.setDeviceMetricsOverride',{width,height:1000,deviceScaleFactor:1,mobile:width<600});
  await call('Page.navigate',{url:origin+path});
  await wait("document.querySelector('.opening-image')?.naturalWidth>0 && !!document.querySelector('"+table+"')");
  await wait("document.querySelector('button[aria-label=\"تغییر حالت روشن و تیره\"]')?.textContent.includes('☀')");
  await E("document.querySelector('.opening-image').decode()");
  await E("document.fonts.ready");await E("document.documentElement.dataset.theme='dark';scrollTo({top:0,behavior:'instant'})");await pause(500);
  const layout=await E(`(()=>{const box=e=>{const r=e.getBoundingClientRect();return {left:r.left,right:r.right,top:r.top,bottom:r.bottom,width:r.width,height:r.height}};const hero=document.querySelector('.guide-opening'),text=hero.querySelector('.opening-copy'),image=hero.querySelector('img'),table=document.querySelector('${table}');return {clientWidth:document.documentElement.clientWidth,hero:box(hero),text:box(text),image:box(image),naturalRatio:image.naturalWidth/image.naturalHeight,titleSize:getComputedStyle(hero.querySelector('h1')).fontSize,table:box(table),overflow:document.documentElement.scrollWidth>innerWidth,h1:document.querySelectorAll('h1').length};})()`);
  assert.equal(layout.overflow,false);assert.equal(layout.h1,1);assert.ok(layout.hero.width<=1280);assert.ok(Math.abs(layout.hero.left-(layout.clientWidth-layout.hero.width)/2)<1);
  assert.ok(Math.abs(layout.image.width/layout.image.height-layout.naturalRatio)<.01);
  if(width===1440){assert.ok(Math.abs(layout.text.width/layout.image.width-1.5)<.02);assert.ok(Math.abs(layout.text.top-layout.image.top)<1);assert.ok(Math.abs(layout.text.left-layout.image.right-40)<1);assert.equal(layout.titleSize,'38px');}
  else {assert.ok(layout.text.bottom<layout.image.top);assert.ok(layout.image.width<=480);}
  if(name==='gpu'){
   const rows=await E("[...document.querySelectorAll('.reading-table tbody tr')].map(row=>{const a=row.querySelector('th').getBoundingClientRect(),b=row.querySelector('td').getBoundingClientRect();return {questionBottom:a.bottom,linksTop:b.top,sameTop:Math.abs(a.top-b.top)<1}})");assert.equal(rows.length,6);assert.ok(rows.every(r=>width===390?r.linksTop>=r.questionBottom:r.sameTop));
   assert.equal(await E("document.querySelectorAll('.reading-guide a').length"),9);
  }else{
   const cards=await E("[...document.querySelectorAll('.start-paths li')].map(e=>({top:e.getBoundingClientRect().top,left:e.getBoundingClientRect().left}))");assert.equal(cards.length,4);assert.equal(new Set(cards.map(c=>Math.round(c.top))).size,width===1440?2:4);
   assert.equal(await E("document.querySelectorAll('.start-paths .path-button').length"),4);
   assert.equal(await E("document.querySelectorAll('.start-paths .article-path').length"),4);
   assert.ok(await E("document.querySelector('.collection-stats').getBoundingClientRect().top>=document.querySelector('.start').getBoundingClientRect().bottom"));
  }
  // Include the whole opening and the start of the first specialist table.
  const height=Math.ceil(layout.table.top+160);
  const shot=await call('Page.captureScreenshot',{format:'png',captureBeyondViewport:true,clip:{x:0,y:0,width,height,scale:1}});
  await fs.writeFile(`${out}/${name}-${width}.png`,Buffer.from(shot.data,'base64'));
  report.push({name,width,screenshotHeight:height,...layout});
 }
 // In-page chapter links still open the chapter below the sticky site header.
 await call('Page.navigate',{url:origin+'/guides/gpu-selection/'});await wait("!!document.querySelector('.reading-guide') && document.querySelector('button[aria-label=\"تغییر حالت روشن و تیره\"]')?.textContent.includes('☀')");
 for(const id of await E("[...document.querySelectorAll('.reading-guide a')].map(a=>a.hash.slice(1))")){
  await E(`document.querySelector('.reading-guide a[href="#${id}"]').click()`);await wait(`document.querySelector('#${id} .chapter-details')?.open ?? true`);await pause(600);
  assert.ok(await E(`(()=>{const target=document.getElementById('${id}'),chapter=target.querySelector('.chapter-details');return (!chapter||chapter.open)&&target.getBoundingClientRect().top>=document.querySelector('.site-header').getBoundingClientRect().bottom-2})()`),id);
 }
 assert.deepEqual(events.filter(e=>e.method==='Runtime.exceptionThrown'),[]);
 await fs.writeFile(out+'/review.json',JSON.stringify({layouts:report,gpuDestinations:9,runtimeErrors:0},null,2));console.log('PASS: both openings, 1440/390, ratios, mobile order, cards, six reading rows, and nine GPU links.');
}finally{await call('Page.close').catch(()=>{});socket.end();}
