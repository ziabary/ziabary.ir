import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { call, pause, events, socket } from '../scripts/browser-session.mjs';

const origin = process.env.REVIEW_ORIGIN ?? 'http://127.0.0.1:4189';
const output = 'docs/reviews/local-2026-09-15/llm-article-drafts';
const drafts = [
  { slug: 'llms-on-rtx-4090-24gb-vs-48gb', date: '2026-08-26', faDate: '۴ شهریور ۱۴۰۵', math: true },
  { slug: 'right-model-size-for-the-task', date: '2026-08-31', faDate: '۹ شهریور ۱۴۰۵', math: false }
];
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
  for (const [index, draft] of drafts.entries()) {
    for (const query of ['', '?show-drafts=false', '?show-drafts=1']) {
      await nav('/articles/'+draft.slug+'/'+query);
      await wait("document.querySelector('.draft-gate')");
      assert.equal(await E("document.querySelector('.article-body')===null"),true);
      assert.match(await E("document.querySelector('meta[name=robots]').content"),/noindex/);
    }
    await nav('/articles/'+draft.slug+'/?show-drafts=true');
    await wait("document.querySelector('.article-body')?.innerText.length>1000");
    await wait("document.querySelector('.article-cover img')?.complete && document.querySelector('.article-cover img').naturalWidth>0");
    assert.equal(await E("document.querySelectorAll('link[rel=canonical]').length"),1);
    assert.equal(await E("document.querySelectorAll('meta[name=robots]').length"),1);
    assert.match(await E("document.querySelector('meta[name=robots]').content"),/noindex/);
    assert.equal(await E("document.querySelector('.article-meta time').dateTime"),draft.date);
    assert.equal(await E("document.querySelector('.article-meta time').textContent"),draft.faDate);
    const tables = await E("document.querySelectorAll('.article-body .prose-table-scroll table').length");
    assert.equal(tables, draft.math ? 3 : 2);
    assert.equal(await E("document.querySelectorAll('.katex-error').length"),0);
    if (draft.math) assert.ok(await E("document.querySelectorAll('.katex-display').length>0"));
    assert.ok(await E("Array.from(document.querySelectorAll('.article-body a[href]')).filter(a=>new URL(a.href).origin!==location.origin).every(a=>a.target==='_blank')"));
    assert.ok(await E("Array.from(document.querySelectorAll('.article-body a[href*=\"/guides/llm/\"]')).every(a=>new URL(a.href).searchParams.get('show-drafts')==='true')"));
    assert.doesNotMatch(await E("document.querySelector('.article-body').innerText"),/[۰-۹]\s*[BK]\b/);
    report.articles.push({ ...draft, tables, cover:await E("document.querySelector('.article-cover img').currentSrc") });
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
  await nav('/guides/llm/?show-drafts=true#planned-articles');
  await wait("document.querySelector('#planned-articles')");
  for (const draft of drafts) {
    const selector='#planned-'+draft.slug+' a[href="/articles/'+draft.slug+'/?show-drafts=true"]';
    assert.ok(await E('!!document.querySelector('+Q(selector)+')'));
    assert.match(await E('document.querySelector('+Q('#planned-'+draft.slug)+').innerText'),/پیش‌نویس/);
  }
  await frame('#planned-articles'); await shot('guide-draft-links');
  await click('#planned-'+drafts[0].slug+' a');
  await wait('location.pathname==='+Q('/articles/'+drafts[0].slug+'/')+" && document.querySelector('.article-body')");
  await click('.article-body a[href*="/articles/right-model-size-for-the-task/"]');
  await wait('location.pathname==='+Q('/articles/'+drafts[1].slug+'/')+" && document.querySelector('.article-meta time')?.dateTime==="+Q(drafts[1].date));
  assert.equal(await E("new URL(location.href).searchParams.get('show-drafts')"),'true');
  await click('.article-body a[href="/articles/rag-cag-kag-fine-tuning-instruction-tuning/"]');
  await wait("location.pathname==='/articles/rag-cag-kag-fine-tuning-instruction-tuning/' && document.querySelector('.article-body')");
  assert.equal(await E("document.querySelector('meta[name=robots]')?.content?.includes('noindex') ?? false"),false);
  report.checks.push('Only exact show-drafts=true reveals either article; canonical and noindex are unique.', 'Both editorial dates, local WebP covers, tables, KaTeX and external links work.', 'LLM reading plans open the drafts; client navigation between drafts preserves preview; published RAG stays indexable.', '320px and 390px tables scroll within the page in both themes.');
  report.runtimeErrors=events.filter(event=>event.method==='Runtime.exceptionThrown');
  assert.equal(report.runtimeErrors.length,0);
  await fs.writeFile(output+'/browser-review.json',Q(report,null,2));
  console.log(Q(report,null,2));
} finally {
  await call('Page.close').catch(()=>{}); socket.end();
}
