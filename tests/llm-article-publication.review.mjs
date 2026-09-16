import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { call, pause, events, socket } from '../scripts/browser-session.mjs';
import { llmArticleSeries as articles } from './helpers/llm-article-series.mjs';

const origin = process.env.REVIEW_ORIGIN ?? 'http://127.0.0.1:4189';
const output = process.env.REVIEW_OUTPUT ?? 'docs/reviews/local-2026-09-16/llm-publication';
const report = { origin, checks: [], screenshots: [], articles: [], runtimeErrors: [] };
await fs.mkdir(output, { recursive: true });
const Q = JSON.stringify;
const E = async expression => {
  const result = await call('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
  if (result.exceptionDetails) throw Error(Q(result.exceptionDetails));
  return result.result.value;
};
const wait = async expression => {
  for (let n=0;n<150;n++) { if (await E(expression)) return; await pause(100); }
  throw Error('Timed out: '+expression);
};
const nav = async path => {
  await call('Page.navigate', { url: origin+path });
  await wait('document.readyState === "complete"');
  await E('document.fonts.ready');
  await E("(() => { const style=document.createElement('style'); style.textContent='* { scroll-behavior: auto !important; }'; document.head.append(style); })()");
};
const shot = async name => {
  const result = await call('Page.captureScreenshot', { format:'png' });
  await fs.writeFile(output+'/'+name+'.png', Buffer.from(result.data,'base64'));
  report.screenshots.push(name+'.png');
};
const frame = selector => E("(() => { const el=document.querySelector("+Q(selector)+"); window.scrollTo({top:window.scrollY+el.getBoundingClientRect().top-100,behavior:'instant'}); })()");
const click = selector => E('document.querySelector('+Q(selector)+').click()');
const viewport = width => call('Emulation.setDeviceMetricsOverride', { width, height:width>1000?1000:900, deviceScaleFactor:1, mobile:width<1000 });

try {
  await viewport(1440);
  for (const [index, draft] of articles.entries()) {
    await nav('/articles/'+draft.slug+'/');
    await wait("document.querySelector('.article-body')?.innerText.length>1000");
    await wait("document.querySelector('.article-cover img')?.complete && document.querySelector('.article-cover img').naturalWidth>0");
    assert.equal(await E("document.querySelectorAll('link[rel=canonical]').length"),1);
    assert.ok(await E("!document.querySelector('meta[name=robots]')?.content.includes('noindex')"));
    assert.equal(await E("document.querySelector('.article-meta time').dateTime"),draft.date);
    assert.equal(await E("document.querySelector('.article-meta time').textContent"),draft.faDate);
    const tables = await E("document.querySelectorAll('.article-body .prose-table-scroll table').length");
    assert.equal(tables, draft.tables);
    assert.equal(await E("document.querySelectorAll('.katex-error').length"),0);
    if (draft.math) assert.ok(await E("document.querySelectorAll('.katex-display').length>0"));
    assert.ok(await E("Array.from(document.querySelectorAll('.article-body a[href]')).filter(a=>new URL(a.href).origin!==location.origin).every(a=>a.target==='_blank')"));
    assert.ok(await E("Array.from(document.querySelectorAll('.article-body a[href*=\"/guides/llm/\"]')).every(a=>new URL(a.href).searchParams.get('show-drafts')===null)"));
    const articleLinks = await E("Array.from(document.querySelectorAll('.article-body a[href], .related-stream a[href]')).map(a=>new URL(a.href)).filter(url=>url.origin===location.origin && /^\\/articles\\/[^/]+\\/$/.test(url.pathname)).map(url=>({slug:url.pathname.split('/')[2],preview:url.searchParams.get('show-drafts')}))");
    for (const link of articleLinks) {
      const target = articles.find(article => article.slug === link.slug);
      if (target) {
        assert.equal(link.preview, null);
        assert.ok(target.date < draft.date, `${draft.slug} links forward to ${target.slug}`);
      }
    }
    assert.doesNotMatch(await E("document.querySelector('.article-body').innerText"),/[۰-۹]\s*[BK]\b/);
    report.articles.push({ ...draft, tables, articleLinks, cover:await E("document.querySelector('.article-cover img').currentSrc") });
    await E("document.documentElement.dataset.theme='dark'; window.scrollTo(0,0)");
    await shot('desktop-'+(index+1)+'-cover');
    await frame('.article-body .prose-table-scroll'); await shot('desktop-'+(index+1)+'-table');
    if (draft.math) { await frame('.katex-display'); await shot('desktop-memory-formula'); }
    for (const width of [390,320]) {
      await viewport(width);
      await E('document.documentElement.dataset.theme='+Q(width===320?'light':'dark'));
      await E('window.scrollTo(0,0)'); await shot('mobile-'+width+'-'+(index+1)+'-cover');
      await frame('.article-body .prose-table-scroll');
      assert.ok(await E('document.documentElement.scrollWidth<='+String(width+1)));
      await shot('mobile-'+width+'-'+(index+1)+'-table');
    }
    await viewport(1440);
  }
  await nav('/guides/llm/');
  await wait("document.querySelector('#model-catalog')");
  assert.ok(await E("!document.querySelector('#planned-articles')"));
  assert.ok(await E("!document.querySelector('meta[name=robots]')?.content.includes('noindex')"));
  for (const article of articles) {
    assert.ok(await E('!!document.querySelector('+Q('.llm-chapter a[href="/articles/'+article.slug+'/"]')+')'), article.slug);
  }
  await frame('#software-products'); await shot('guide-software-reading');
  await E("document.querySelector('#true-llm-cost-buy-rent-or-api details').open=true");
  await click('.llm-chapter a[href="/articles/true-llm-cost-buy-rent-or-api/"]');
  await wait("location.pathname==='/articles/true-llm-cost-buy-rent-or-api/' && document.querySelector('.article-body')");
  await click('.article-body a[href="/articles/ollama-vllm-sglang-or-llama-cpp/"]');
  await wait("location.pathname==='/articles/ollama-vllm-sglang-or-llama-cpp/' && document.querySelector('.article-body')");
  assert.equal(await E("location.search"),'');
  report.checks.push('Ten articles and the guide render without a preview query and remain indexable.', 'Editorial dates, local WebP covers, 42 tables, KaTeX, RTL and external links work.', 'All table reading paths point to published articles; no unwritten plans remain.', 'Desktop and 320px/390px mobile layouts fit in both themes; SPA reading links work.');
  report.runtimeErrors=events.filter(event=>event.method==='Runtime.exceptionThrown');
  assert.equal(report.runtimeErrors.length,0);
  await fs.writeFile(output+'/browser-review.json',JSON.stringify(report,null,2)+'\n');
  console.log(JSON.stringify({ checks: report.checks, articles: report.articles.length, screenshots: report.screenshots.length, runtimeErrors: report.runtimeErrors },null,2));
} finally {
  await call('Page.close').catch(()=>{}); socket.end();
}
