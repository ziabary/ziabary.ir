import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { call, pause, events, socket } from '../scripts/browser-session.mjs';
const origin = process.env.LLM_REVIEW_ORIGIN ?? 'http://127.0.0.1:4189';
const output = 'docs/reviews/local-2026-09-15/llm-visual';
const report = { origin, columns: [], mobile: [] };
const ids = ['model-catalog', 'model-suitability', 'software-products', 'specialized-models'];
async function evaluate(expression) {
  const r = await call('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
  if (r.exceptionDetails) throw Error(JSON.stringify(r.exceptionDetails));
  return r.result.value;
}
async function nav(path) { await call('Page.navigate', { url: origin + path }); await pause(1800); }
async function shot(name) {
  const r = await call('Page.captureScreenshot', { format: 'png' });
  await fs.writeFile(`${output}/after-${name}.png`, Buffer.from(r.data, 'base64'));
}
async function frame(selector) {
  await evaluate(`document.querySelector(${JSON.stringify(selector)}).scrollIntoView({behavior:'instant',block:'start'});scrollBy(0,-125)`);
  await pause(150);
}
async function search(id, text) {
  await evaluate(`(()=>{const input=document.querySelector('#${id} input[type=search]');input.value=${JSON.stringify(text)};input.dispatchEvent(new Event('input',{bubbles:true}));})()`);
  await pause(120);
}
try {
  await fs.mkdir(output, { recursive: true });
  await call('Emulation.setDeviceMetricsOverride', { width: 1600, height: 1000, deviceScaleFactor: 1, mobile: false });
  await nav('/guides/?show-drafts=true');
  report.card = await evaluate(`(()=>{const c=document.querySelector('a[href*="/guides/llm/"]'),g=document.querySelector('a[href="/guides/gpu-selection/"]');return {width:c.clientWidth,gpuWidth:g.clientWidth,title:c.querySelector('h2').textContent,overflow:c.scrollWidth>c.clientWidth}})()`);
  assert.equal(report.card.width, report.card.gpuWidth); assert.equal(report.card.overflow, false);
  assert.equal(report.card.title, 'راهنمای انتخاب مدل زبانی');
  await frame('a[href*="/guides/llm/"]'); await shot('card');
  await nav('/guides/llm/?show-drafts=true');
  report.hero = await evaluate(`(()=>{const i=document.querySelector('.collection-cover');return {loaded:i.complete&&i.naturalWidth>0,src:i.currentSrc,width:i.clientWidth,parent:i.parentElement.clientWidth}})()`);
  assert.equal(report.hero.loaded, true); assert.equal(report.hero.width, report.hero.parent); await shot('hero');
  report.reading = await evaluate(`(()=>{const groups=[...document.querySelectorAll('[data-reading-for]')];return groups.map(g=>({id:g.dataset.readingFor,planned:g.querySelectorAll('.planned-reading a').length,broken:[...g.querySelectorAll('.planned-reading a')].filter(a=>!document.getElementById(decodeURIComponent(a.hash.slice(1)))).length,irrelevant:g.innerText.includes('ترگمان'),unwritten:[...g.querySelectorAll('a')].some(a=>a.pathname.startsWith('/articles/')&&a.textContent.includes('در برنامهٔ نگارش'))}))})()`);
  assert.equal(report.reading.length, 7); assert.ok(report.reading.every(r => r.planned > 0 && !r.broken && !r.irrelevant && !r.unwritten));
  for (const [id, key] of [['model-catalog','license'],['model-suitability','coding-assistant'],['software-products','maintenance'],['specialized-models','features']]) {
    const selector = `#${id} th[data-column="${key}"] .hide-column`;
    await evaluate(`document.querySelector(${JSON.stringify(selector)}).click()`); await pause(80);
    assert.equal(await evaluate(`!!document.querySelector('#${id} th[data-column="${key}"]')`), false);
    await search(id, 'Qwen');
    assert.equal(await evaluate(`!!document.querySelector('#${id} .restore-column[data-column="${key}"]')`), true);
    await search(id, '');
    await evaluate(`document.querySelector('#${id} .restore-column[data-column="${key}"]').click()`); await pause(80);
    assert.equal(await evaluate(`!!document.querySelector('#${id} th[data-column="${key}"]')`), true);
    report.columns.push({ id, hiddenAndRestored: key });
  }
  // Empty optional columns can be explicitly restored and survive filters.
  await evaluate(`document.querySelector('#specialized-models .restore-column[data-column="work-rate"]').click()`);await search('specialized-models','Qwen3-Embedding');
  assert.equal(await evaluate(`document.querySelectorAll('#specialized-models [data-column="work-rate"]').length`), 4);
  await search('specialized-models','');await evaluate(`document.querySelector('#specialized-models .reset-columns').click()`);
  await frame('#model-catalog .column-toolbar');await shot('columns');
  const rows = await evaluate(`[...document.querySelectorAll('#model-catalog td[data-column="size-architecture"]')].map(x=>x.textContent)`);
  assert.ok(rows.every(text => !/[۰-۹]B/.test(text)));assert.ok(rows.some(text => text.includes('۸ میلیارد')));
  await search('model-suitability','bge-m3');
  report.rowHeightBefore = await evaluate(`document.querySelector('#model-suitability [data-row-id]').clientHeight`);
  await evaluate(`document.querySelector('#model-suitability .matrix-trigger').click()`);await pause(120);
  report.details = await evaluate(`(()=>{const v=document.querySelector('#model-suitability'),r=v.querySelector('[data-row-id]'),d=v.querySelector('.application-detail'),b=r.querySelector('.detail button');return {rowHeight:r.clientHeight,width:d.clientWidth,shell:v.querySelector('.table-shell').clientWidth,buttonWidth:b.clientWidth,buttonText:b.textContent.trim(),text:d.innerText,sources:d.querySelectorAll('.source-url').length}})()`);
  assert.equal(report.details.rowHeight, report.rowHeightBefore);assert.ok(report.details.width >= report.details.shell - 4);
  assert.ok(report.details.buttonWidth>=28);assert.equal(report.details.buttonText,'');assert.ok(report.details.sources>0);
  assert.ok(report.details.text.includes('سازنده'));assert.ok(report.details.text.includes('اندازه‌گیری نشده'));
  await frame('#model-suitability .table-shell');await shot('matrix-details');
  // All four tables: source controls remain icons and the page itself never overflows.
  for (const id of ids) {await frame(`#${id} .table-shell`);await shot(id);}
  await frame('[data-reading-for="model-suitability"]');await shot('reading');
  await evaluate(`document.querySelector('[data-reading-for="model-suitability"] .planned-reading a').click()`);await pause(150);
  assert.equal(await evaluate(`document.querySelector(':target')?.closest('.planned')?.id`),'planned-articles');
  for (const theme of ['light','dark']) {
    await call('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: false });
    await nav('/guides/llm/?show-drafts=true');await evaluate(`document.documentElement.dataset.theme='${theme}'`);
    await shot(`mobile-${theme}-hero`);
    for (const id of ids) {
      await frame(`#${id} .table-shell`);
      const result = await evaluate(`({id:'${id}',theme:'${theme}',page:document.documentElement.scrollWidth,viewport:innerWidth,icon:document.querySelector('#${id} .detail button').clientWidth})`);
      assert.ok(result.page<=result.viewport); assert.ok(result.icon>=28);report.mobile.push(result);
    }
    await search('model-suitability','bge-m3');await evaluate(`document.querySelector('#model-suitability .matrix-trigger').click()`);await pause(150);
    await frame('#model-suitability .application-detail');await shot(`mobile-${theme}-details`);
    assert.ok(await evaluate(`document.documentElement.scrollWidth<=innerWidth`));
    await nav('/guides/?show-drafts=true');await evaluate(`document.documentElement.dataset.theme='${theme}'`);await frame('a[href*="/guides/llm/"]');await shot(`mobile-${theme}-card`);
    assert.ok(await evaluate(`(()=>{const card=document.querySelector('a[href*="/guides/llm/"]'),title=card.querySelector('h2').getBoundingClientRect(),r=card.getBoundingClientRect();return document.documentElement.scrollWidth<=innerWidth&&title.left>=r.left&&title.right<=r.right&&title.bottom<=r.bottom})()`));
  }
  assert.equal(events.filter(e=>e.method==='Runtime.exceptionThrown').length,0);
  await fs.writeFile(`${output}/browser-review.json`,JSON.stringify(report,null,2)+'\n');
  console.log(JSON.stringify(report,null,2));
}finally{await call('Page.close').catch(()=>{});socket.end();}
