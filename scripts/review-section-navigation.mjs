import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { call, pause, events, socket } from './browser-session.mjs';

const origin = process.argv[2] ?? 'http://127.0.0.1:4186';
const output = 'docs/reviews/local-2026-09-12';
const results = [];
const evaluate = async expression => {
  const result = await call('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.exception?.description ?? result.exceptionDetails.text);
  return result.result.value;
};
const navigate = async path => {
  await call('Page.navigate', { url: origin + path });
  await pause(650);
  await evaluate('document.fonts.ready.then(() => true)');
  await evaluate(`new Promise(resolve => {
    let last = window.scrollY, stable = 0, started = performance.now();
    const settled = () => {
      stable = Math.abs(window.scrollY - last) < 1 ? stable + 1 : 0;
      last = window.scrollY;
      if (stable >= 6 || performance.now() - started > 2500) resolve(true);
      else requestAnimationFrame(settled);
    };
    requestAnimationFrame(settled);
  })`);
};
const scrollToHeading = async id => {
  await evaluate(`window.scrollTo({top:window.scrollY+document.getElementById(${JSON.stringify(id)}).getBoundingClientRect().top-110,behavior:'instant'})`);
  await pause(180);
};
const activeId = async nav => evaluate(`document.querySelector(${JSON.stringify(nav)})?.querySelector('[aria-current="location"]')?.getAttribute('href')`);
const screenshot = async name => {
  const shot = await call('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
  await fs.writeFile(`${output}/section-navigation-${name}.png`, Buffer.from(shot.data, 'base64'));
};
const check = async (name, work) => {
  try { await work(); results.push({ name, passed: true }); }
  catch (error) { results.push({ name, passed: false, error: String(error) }); }
};

await call('Network.setCacheDisabled', { cacheDisabled: true });
await call('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });
try {
  for (const locale of ['fa', 'en', 'es']) await check(`article H2/H3 tracking, reverse scroll and direct fragment: ${locale}`, async () => {
    const path = `${locale === 'fa' ? '' : `/${locale}`}/articles/zero-trust-ai-maturity-model${locale === 'fa' ? '' : `-${locale}`}/`;
    await navigate(path);
    const headings = await evaluate("[...document.querySelectorAll('.article-body h2[id],.article-body h3[id]')].map(h=>({id:h.id,depth:h.tagName}))");
    const children = headings.filter(h => h.depth === 'H3');
    assert.ok(children.length >= 2);
    const before = await evaluate('location.hash + history.length');
    for (const heading of [children[0], children[1], headings.at(-1), children[0], headings[0]]) {
      await scrollToHeading(heading.id);
      assert.equal(await activeId('.desktop-toc nav'), '#' + heading.id);
      assert.equal(await evaluate("document.querySelectorAll('.desktop-toc [aria-current]').length"), 1);
    }
    assert.equal(await evaluate('location.hash + history.length'), before);
    await navigate(path + '#' + encodeURIComponent(children[1].id));
    assert.equal(await activeId('.desktop-toc nav'), '#' + children[1].id);
    assert.ok(await evaluate("(() => {const nav=document.querySelector('.desktop-toc nav').getBoundingClientRect(),link=document.querySelector('.desktop-toc a[aria-current]').getBoundingClientRect();return link.top>=nav.top && link.bottom<=nav.bottom})()"));
    if (locale === 'fa') { await evaluate("document.documentElement.dataset.theme='dark'"); await pause(250); }
    await screenshot(`article-${locale}-1440`);
  });

  await check('article navigation refreshes the observed heading elements', async () => {
    await navigate('/articles/zero-trust-ai-maturity-model/');
    await evaluate("document.querySelector('.related-stream a[href=\"/articles/from-zero-trust-to-zero-trust-ai/\"],a[href=\"/articles/from-zero-trust-to-zero-trust-ai/\"]').click()");
    await pause(650);
    const id = await evaluate("document.querySelectorAll('.article-body h2[id]')[2].id");
    await scrollToHeading(id);
    assert.equal(await activeId('.desktop-toc nav'), '#' + id);
  });

  await check('a standalone article with H3-only sections has a working contents menu', async () => {
    await navigate('/en/articles/choosing-gpu-for-ai-en/');
    const id = await evaluate("document.querySelectorAll('.article-body h3[id]')[1].id");
    await scrollToHeading(id);
    assert.equal(await activeId('.desktop-toc nav'), '#' + id);
  });

  await check('collapsible guide tracks H2/H3, ignores closed chapters and reopens the same fragment', async () => {
    const path = '/guides/zero-trust-ai/';
    await navigate(path);
    const child = await evaluate("document.querySelector('#zero-trust-ai-maturity-model .guide-prose h3[id]').id");
    await navigate(path + '#' + encodeURIComponent(child));
    assert.equal(await evaluate("document.querySelector('#zero-trust-ai-maturity-model details').open"), true);
    assert.equal(await activeId('.guide-desktop-toc nav'), '#' + child);
    await screenshot('guide-fa-1440');
    await evaluate("document.querySelector('#zero-trust-ai-maturity-model details').open=false");
    await pause(200);
    assert.notEqual(await activeId('.guide-desktop-toc nav'), '#' + child);
    await navigate(path + '#zero-trust-ai-maturity-model');
    await evaluate("document.querySelector('#zero-trust-ai-maturity-model details').open=false");
    await pause(150);
    await evaluate("document.querySelector('.guide-desktop-toc a[href=\"#zero-trust-ai-maturity-model\"]').click()");
    await pause(500);
    assert.equal(await evaluate("document.querySelector('#zero-trust-ai-maturity-model details').open"), true);
    await evaluate("document.querySelector('.continuous-toggle').click()");
    const ids = await evaluate("[...document.querySelectorAll('.guide-prose h2[id],.guide-prose h3[id]')].map(h=>h.id)");
    const hash = await evaluate('location.hash');
    for (const id of [ids.at(-1), child, ids[0]]) {
      await scrollToHeading(id);
      assert.equal(await activeId('.guide-desktop-toc nav'), '#' + id);
    }
    assert.equal(await evaluate('location.hash'), hash);
  });

  for (const locale of ['fa', 'en', 'es']) await check(`GPU collection subsection tracking and article boundaries: ${locale}`, async () => {
    await navigate(`${locale === 'fa' ? '' : `/${locale}`}/guides/gpu-selection/`);
    if (locale === 'fa') await evaluate("document.querySelector('.continuous-toggle').click()");
    const headings = await evaluate("[...document.querySelectorAll('.guide-prose h2[id],.guide-prose h3[id],.review-prose h2[id],.review-prose h3[id]')].map(h=>h.id)");
    assert.ok(headings.length);
    const nav = locale === 'fa' ? '.guide-desktop-toc nav' : '.collection-nav';
    for (const id of [headings[0], headings.at(-1), headings[0]]) {
      await scrollToHeading(id);
      assert.equal(await activeId(nav), '#' + id);
    }
    await screenshot(`gpu-${locale}-1440`);
    await scrollToHeading('gpu-comparison-table');
    assert.equal(await activeId(nav), '#gpu-comparison-table');
  });

  await check('mobile menus retain their closed default and track the current subsection', async () => {
    await call('Emulation.setDeviceMetricsOverride', { width: 390, height: 900, deviceScaleFactor: 1, mobile: false });
    await navigate('/articles/zero-trust-ai-maturity-model/');
    assert.equal(await evaluate("document.querySelector('.mobile-toc').open"), false);
    const child = await evaluate("document.querySelector('.article-body h3[id]').id");
    await scrollToHeading(child);
    assert.equal(await activeId('.mobile-toc nav'), '#' + child);
    await navigate('/guides/zero-trust-ai/');
    assert.equal(await evaluate("document.querySelector('.guide-mobile-toc').open"), false);
    const guideChild = await evaluate("document.querySelector('#zero-trust-ai-maturity-model .guide-prose h3[id]').id");
    await navigate('/guides/zero-trust-ai/#' + encodeURIComponent(guideChild));
    assert.equal(await activeId('.guide-mobile-toc nav'), '#' + guideChild);
    await screenshot('guide-fa-390');
  });
  const exceptions = events.filter(e => e.method === 'Runtime.exceptionThrown');
  await fs.writeFile(`${output}/section-navigation.json`, JSON.stringify({ results, exceptions }, null, 2) + '\n');
  console.log(JSON.stringify({ passed: results.filter(r => r.passed).length, failed: results.filter(r => !r.passed), exceptions: exceptions.length }));
  process.exitCode = results.some(r => !r.passed) || exceptions.length ? 1 : 0;
} finally {
  await call('Page.close');
  socket.end();
}
