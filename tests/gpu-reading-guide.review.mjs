import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { call, pause, events, socket } from '../scripts/browser-session.mjs';
const output = 'docs/reviews/local-2026-09-16/gpu-reading-guide';
const url = 'http://127.0.0.1:4189/guides/gpu-selection/';
async function E(expression) { const r = await call('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true }); if (r.exceptionDetails) throw Error(JSON.stringify(r.exceptionDetails)); return r.result.value; }
async function wait(expression) { for (let i = 0; i < 150; i++) { if (await E(expression)) return; await pause(100); } throw Error(expression); }
async function checkDestination(id) {
  await pause(1400);
  const result = await E(`(() => { const el = document.getElementById(${JSON.stringify(id)}); const rect = el.getBoundingClientRect(); const details = el.querySelector('.chapter-details'); return {hash: location.hash, top: rect.top, open: !details || details.open}; })()`);
  assert.equal(result.hash, '#' + id);
  assert.ok(result.top >= 100 && result.top < 260 && result.open, JSON.stringify({id, ...result}));
}
const report = [];
try {
  await fs.mkdir(output, { recursive: true });
  await call('Emulation.setDeviceMetricsOverride', { width: 1600, height: 1000, deviceScaleFactor: 1, mobile: false });
  await call('Page.navigate', { url });
  await wait("document.querySelectorAll('.reading-guide tbody tr').length === 6");
  await E('document.fonts.ready'); await pause(1200);
  assert.equal(await E("document.querySelector('h1').textContent"), 'کارت گرافیک مناسب هوش مصنوعی؛ مقایسه و راهنمای انتخاب');
  assert.equal(await E("document.querySelectorAll('.reading-guide thead th').length"), 2);
  assert.equal(await E("document.querySelectorAll('.guide-start, .practice, .quick-selection, .reading-guide details').length"), 0);
  assert.equal(await E("document.querySelectorAll('.opening-intro p').length"), 2);
  assert.ok(await E("!!(document.querySelector('.reading-guide').compareDocumentPosition(document.querySelector('#gpu-comparison-table')) & Node.DOCUMENT_POSITION_FOLLOWING)"));
  assert.ok(await E("document.querySelector('.opening-image').naturalWidth > 0"));
  const ids = await E("[...document.querySelectorAll('.reading-guide a')].map(a => a.hash.slice(1))");
  assert.equal(ids.length, 9);
  for (const id of ids) {
    await E(`document.querySelector('.reading-guide a[href="#${id}"]').click()`);
    await checkDestination(id);
  }
  // Reopening a collapsed article must work even when its hash has not changed.
  const article = 'pcie-gpu-server-selection';
  await E(`document.querySelector('.reading-guide a[href="#${article}"]').click()`);
  await checkDestination(article);
  await E(`document.querySelector('#${article} .chapter-details').open = false; document.querySelector('.reading-guide a[href="#${article}"]').click()`);
  await checkDestination(article);
  await call('Page.navigate', { url: url + '#int8-or-fp8-real-gpu-support' });
  await wait("document.querySelector('#int8-or-fp8-real-gpu-support .chapter-details')?.open");
  await E('document.fonts.ready'); await pause(1000); await checkDestination('int8-or-fp8-real-gpu-support');
  for (const [width, theme] of [[1600, 'light'], [1600, 'dark'], [768, 'light'], [390, 'dark'], [320, 'light']]) {
    await call('Emulation.setDeviceMetricsOverride', { width, height: 1000, deviceScaleFactor: 1, mobile: width < 600 });
    await E(`document.documentElement.dataset.theme = '${theme}'; document.querySelector('.reading-guide').scrollIntoView({behavior: 'instant'})`); await pause(300);
    const layout = await E("(() => { const t = document.querySelector('.reading-table'), a = t.querySelector('tbody th').getBoundingClientRect(), b = t.querySelector('tbody td').getBoundingClientRect(); return {pageOverflow: document.documentElement.scrollWidth > innerWidth, tableOverflow: t.scrollWidth > t.clientWidth, twoColumns: Math.abs(a.top - b.top) < 1 && b.right <= a.left + 1, stacked: b.top >= a.bottom, height: t.getBoundingClientRect().height}; })()");
    assert.ok(!layout.pageOverflow && !layout.tableOverflow && (width <= 600 ? layout.stacked : layout.twoColumns), JSON.stringify({width, ...layout}));
    const shot = await call('Page.captureScreenshot', { format: 'png' });
    await fs.writeFile(`${output}/reading-${width}-${theme}.png`, Buffer.from(shot.data, 'base64'));
    if (width === 1600) {
      await E('scrollTo({top: 0, behavior: "instant"})'); await pause(200);
      const hero = await call('Page.captureScreenshot', { format: 'png' });
      await fs.writeFile(`${output}/intro-${width}-${theme}.png`, Buffer.from(hero.data, 'base64'));
    }
    if (width < 600) {
      await E("document.querySelector('.reading-guide a[href=\"#gpu-types-for-ai\"]').click()"); await checkDestination('gpu-types-for-ai');
    }
    report.push({width, theme, ...layout});
  }
  assert.deepEqual(events.filter(e => e.method === 'Runtime.exceptionThrown'), []);
  await fs.writeFile(output + '/browser-review.json', JSON.stringify({rows: 6, columns: 2, destinations: ids, repeatedLink: true, directUrl: true, viewports: report, runtimeErrors: 0}, null, 2));
  console.log('PASS: six-row reading guide, all nine in-page links, collapsed chapters, sticky-header offset, direct URLs and responsive reading table.');
} finally { await call('Page.close').catch(() => {}); socket.end(); }
