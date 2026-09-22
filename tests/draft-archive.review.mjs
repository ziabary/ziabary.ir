import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { compile } from 'mdsvex';
import { call, pause, events, socket } from '../scripts/browser-session.mjs';

const origin = process.env.REVIEW_ORIGIN ?? 'http://127.0.0.1:4186';
async function evaluate(expression) {
  const result = await call('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
  if (result.exceptionDetails) throw Error(JSON.stringify(result.exceptionDetails));
  return result.result.value;
}
async function wait(expression) {
  for (let i = 0; i < 150; i++) {
    if (await evaluate(expression)) return;
    await pause(100);
  }
  throw Error(`Timed out: ${expression}`);
}
async function navigate(path) {
  await call('Page.navigate', { url: 'about:blank' });
  await call('Page.navigate', { url: origin + path });
}
try {
  await call('Page.bringToFront');
  for (const [locale, slug] of [
    ['fa', 'secure-rag-agent'],
    ['en', 'airllm-layer-wise-inference-en'],
    ['es', 'cuando-un-otp-por-sms-reduce-la-seguridad']
  ]) {
    const metadata = (await compile(readFileSync(`src/lib/content/articles/${slug}.md`, 'utf8'))).data.fm;
    const base = locale === 'fa' ? '' : `/${locale}`;
    const articlePath = `${base}/articles/${slug}/`;
    const query = encodeURIComponent(metadata.title);
    await call('Emulation.setDeviceMetricsOverride', { width: locale === 'es' ? 390 : 1440, height: 900, deviceScaleFactor: 1, mobile: locale === 'es' });
    for (const flag of ['', '?show-drafts=false']) {
      await navigate(articlePath + flag);
      await wait("!!document.querySelector('.draft-gate')");
      assert.equal(await evaluate("!!document.querySelector('.article-body')"), false);
    }
    await navigate(`${base}/articles/?show-drafts=true&q=${query}`);
    await wait(`!!document.querySelector('#archive-items a[href*="${slug}"]')`);
    assert.equal(await evaluate("document.querySelector('meta[name=robots]').content.includes('noindex')"), true);
    assert.equal(await evaluate(`document.querySelector('#archive-items a[href*="${slug}"]').search`), '?show-drafts=true');
    assert.ok(await evaluate("[...document.querySelectorAll('.language-menu section:first-child a')].every(a => a.search.includes('show-drafts=true'))"));
    await evaluate("document.querySelector('.archive-view button[value=list]').click()");
    await wait("!!document.querySelector('.archive-row .row-meta strong')");
    await evaluate(`document.querySelector('#archive-items h2 a[href*="${slug}"]').click()`);
    await wait("!!document.querySelector('.article-body')");
    assert.equal(await evaluate("document.querySelector('.article-header h1').textContent"), metadata.title);
    assert.ok(await evaluate("document.querySelector('.article-body').textContent.length > 100"));
    assert.equal(await evaluate("document.querySelector('meta[name=robots]').content.includes('noindex')"), true);
    await evaluate("document.querySelector('.archive-back').click()");
    await wait("!!document.querySelector('.archive-view button:not([disabled])')");
    assert.ok(await evaluate("location.search.includes('show-drafts=true')"));
    await evaluate("document.querySelector('.archive-view button[value=grid]').click()");
    await evaluate("document.querySelector('.archive-controls input').value = 'test'; document.querySelector('.archive-controls input').dispatchEvent(new Event('input', {bubbles:true}))");
    await wait("new URL(location.href).searchParams.get('q') === 'test'");
    assert.ok(await evaluate("location.search.includes('show-drafts=true')"));
    await evaluate("document.querySelector('.archive-controls input').value = ''; document.querySelector('.archive-controls input').dispatchEvent(new Event('input', {bubbles:true}))");
    await wait("!!document.querySelector('.archive-pagination a[aria-label]') && !new URL(location.href).searchParams.has('q')");
    await evaluate("[...document.querySelectorAll('.archive-pagination a[aria-label]')].at(-1).click()");
    await wait("Number(new URL(location.href).searchParams.get('p')) > 1");
    assert.equal(await evaluate('location.pathname'), `${base}/articles/`);
    assert.ok(await evaluate("document.querySelector('#archive-items').children.length > 0"));
    await navigate(`${base}/articles/?q=${query}`);
    await wait("!!document.querySelector('.archive-empty')");
    assert.equal(await evaluate(`!!document.querySelector('#archive-items a[href*="${slug}"]')`), false);
    console.log(`PASS ${locale}: opt-in, grid/list, filters, pagination, body, return link, noindex and default exclusion`);
  }
  assert.deepEqual(events.filter(event => event.method === 'Runtime.exceptionThrown'), []);
} finally {
  await call('Page.close').catch(() => {});
  socket.end();
}
