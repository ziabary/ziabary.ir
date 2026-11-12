// Standalone: node test/analytics.review.mjs. Uses a disposable service and Chrome profile.
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {mkdtemp,mkdir,rm,writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {fixture,password,posts} from './helpers.mjs';
import {browserSession} from './cdp.mjs';
import {parseViewReport,verifyViewReport,applyViewReport} from '../src/historical-views.mjs';

const origin='http://127.0.0.1:8789',port=9335;
const f=await fixture({port:8789,config:{origin,siteOrigin:'http://localhost:5173',retentionDays:1}});
const profile=await mkdtemp(join(tmpdir(),'analytics-chrome-'));
const output=new URL('../test-results/',import.meta.url);await mkdir(output,{recursive:true});
const chrome=spawn(process.env.CHROME_BIN||'/usr/bin/google-chrome',['--headless=new','--no-sandbox','--disable-gpu','--no-first-run','--no-default-browser-check',`--remote-debugging-port=${port}`,`--user-data-dir=${profile}`],{stdio:'ignore'});
let browser;
try {
  async function visit(post,fingerprint){
    const ticket=await f.call('/api/public/visit-ticket',{body:{post}});f.advance(1700);
    assert.equal((await f.call('/api/public/visits',{body:{post,ticket:ticket.data.ticket,fingerprint:fingerprint.repeat(64),language:'fa-IR',referrer:'https://example.org'}})).data.counted,true);
  }
  await visit(posts[1].path,'a');await visit(posts[2].path,'a');f.advance(86400000);await visit(posts[1].path,'a');await visit(posts[1].path,'b');
  f.advance(91*86400000);f.app.analytics.maintain(f.now());f.app.store.prune(f.now(),1);
  assert.equal(f.app.store.get('SELECT count(*) AS n FROM visits').n,0);
  const csv=`# Fecha de inicio: 20260801\n# Fecha de finalización: 20261108\nRuta de página y clase de pantalla,Vistas,Usuarios activos\n${posts[1].path},12,5\n${posts[2].path},3,2\n`;
  applyViewReport(f.app.store,await verifyViewReport(parseViewReport(csv,3),{siteOrigin:f.config.origins[0],fetchPage:f.fetchPage}),f.now());
  assert.equal((await f.call('/api/public/comments?post='+posts[1].path)).data.visitors,17);
  let ready=false;for(let n=0;n<100;n++){try{await fetch(`http://127.0.0.1:${port}/json/version`);ready=true;break;}catch{await new Promise(resolve=>setTimeout(resolve,100));}}
  assert(ready);browser=await browserSession(port);const {call,evaluate:E,wait,pause}=browser;
  await call('Page.navigate',{url:origin+'/admin/'});await wait('!document.querySelector("#login-panel").hidden');
  await E(`document.querySelector('#username').value='admin';document.querySelector('#password').value=${JSON.stringify(password)};document.querySelector('#login').requestSubmit()`);
  await wait('!document.querySelector("#dashboard").hidden');await E('document.querySelector("[data-tab=analytics]").click()');
  await wait('document.querySelectorAll(".metric").length===7');
  await E("document.querySelector('#days').value='365';document.querySelector('#days').dispatchEvent(new Event('change'))");
  await wait('document.querySelectorAll("#daily .bar").length===365');
  assert.equal(await E('document.querySelector(".metric strong").textContent'),'۴');
  assert.equal(await E('document.querySelectorAll(".metric strong")[1].textContent'),'۲');
  assert.equal(await E('document.querySelectorAll("#daily .bar").length'),365);
  assert.equal(await E('document.querySelectorAll("#breakdowns .breakdown-row").length'),4);
  assert.equal(await E('document.querySelector("#analytics-note").hidden'),true);
  assert((await E('document.querySelector("#details-retention").textContent')).includes('۱٬۰۹۵'));
  assert.equal(await E('document.querySelector("#posts-table tr").children[3].textContent'),'۱۷');
  assert.equal(await E('document.querySelector("#posts-table tr").children[4].textContent'),'۱۵');
  await E(`document.querySelector('#post').value=${JSON.stringify(posts[1].path)};document.querySelector('#post').dispatchEvent(new Event('change'))`);
  await wait('document.querySelector(".metric strong").textContent==="۳"');
  await E("document.querySelector('#post').value='';document.querySelector('#post').dispatchEvent(new Event('change'))");
  await wait('document.querySelector(".metric strong").textContent==="۴"');
  await call('Emulation.setTimezoneOverride',{timezoneId:'America/Los_Angeles'});
  for(const width of [1440,390])for(const theme of ['light','dark']){
    await call('Emulation.setDeviceMetricsOverride',{width,height:1100,deviceScaleFactor:1,mobile:width<700});
    await E(`document.documentElement.dataset.theme='${theme}'`);
    for(const days of [7,30,90,365]){
      await E(`document.querySelector('#days').value='${days}';document.querySelector('#days').dispatchEvent(new Event('change'))`);
      await wait(`document.querySelectorAll('#daily .bar').length===${days}`);
      const chart=await E(`(()=>{const host=document.querySelector('#daily'),bars=[...host.querySelectorAll('.bar')],first=bars[0],last=bars.at(-1),axis=[...document.querySelectorAll('#daily-axis time')],bounds=host.getBoundingClientRect();return {pageWidth:document.documentElement.scrollWidth,fits:host.scrollWidth<=host.clientWidth,direction:getComputedStyle(host).direction,firstLeft:first.getBoundingClientRect().left,lastRight:last.getBoundingClientRect().right,left:bounds.left,right:bounds.right,today:last.classList.contains('is-today'),todayDate:last.dataset.day,labels:axis.map(n=>({text:n.textContent,datetime:n.dateTime})),tooltip:last.title,shortDate:last.querySelector('time').textContent,axisDirection:getComputedStyle(document.querySelector('#daily-axis')).direction};})()`);
      assert(chart.pageWidth<=width);assert(chart.fits);assert.equal(chart.direction,'ltr');assert.equal(chart.axisDirection,'ltr');
      assert(chart.firstLeft<chart.lastRight);assert(chart.firstLeft>=chart.left-1);assert(chart.lastRight<=chart.right+1);assert(chart.today);
      assert.equal(chart.todayDate,chart.labels.at(-1).datetime);
      for(const label of chart.labels){assert(/^۱۴[۰-۹]{2}\/[۰-۹]{2}\/[۰-۹]{2}$/.test(label.text),label.text);assert(!/[0-9]/.test(label.text));}
      assert(chart.tooltip.includes(chart.labels.at(-1).text));assert(chart.tooltip.includes('امروز'));assert(/^[۰-۹]{2}\/[۰-۹]{2}$/.test(chart.shortDate));
    }
    await E("document.querySelector('#daily').closest('.card').scrollIntoView({block:'center',behavior:'instant'})");await pause(100);
    const shot=await call('Page.captureScreenshot',{format:'png'});await writeFile(new URL(`analytics-${width}-${theme}.png`,output),Buffer.from(shot.data,'base64'));
  }
  assert.equal(browser.events.filter(event=>event.method==='Runtime.exceptionThrown').length,0);
  const report={status:'passed',rawVisits:0,aggregateViews:4,uniqueVisitors:2,yearChartDays:365,postFilter:true,persianChartDates:true,chronologicalLeftToRight:true,todayVisible:true,fullRangeFits:[7,30,90,365],browserTimezone:'America/Los_Angeles',themes:['light','dark'],viewports:[1440,390]};
  await writeFile(new URL('analytics.json',output),JSON.stringify(report,null,2));console.log(JSON.stringify(report));
}finally{
  if(browser)await browser.call('Browser.close').catch(()=>{});
  chrome.kill();await f.cleanup();await rm(profile,{recursive:true,force:true,maxRetries:5,retryDelay:200});
}
