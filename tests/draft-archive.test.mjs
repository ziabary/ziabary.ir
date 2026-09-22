import assert from 'node:assert/strict';
import { test } from 'node:test';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { compile } from 'mdsvex';
import { archiveDestination } from '../src/lib/archive.mjs';
import { hasDraftPreview, draftReadingHref } from '../src/lib/draft-preview.mjs';

test('draft archive pagination remains on a prerendered route and preserves preview and filters', () => {
  for (const locale of ['fa', 'en', 'es']) {
    const base = locale === 'fa' ? '' : `/${locale}`;
    assert.equal(archiveDestination(locale, 2), `${base}/articles/page/2/`);
    const target = new URL(archiveDestination(locale, 999, {
      preview: true, query: 'هوش مصنوعی', category: 'topic:ai'
    }), 'https://ziabary.ir');
    assert.equal(target.pathname, `${base}/articles/`);
    assert.equal(target.searchParams.get('p'), '999');
    assert.equal(target.searchParams.get('q'), 'هوش مصنوعی');
    assert.equal(target.searchParams.get('category'), 'topic:ai');
    assert.equal(hasDraftPreview(target.searchParams), true);
    const cleared = new URL(archiveDestination(locale, 1, { preview: true }), target);
    assert.equal(cleared.search, '?show-drafts=true');
  }
});

test('only the explicit true flag opts in, without persisted consent', () => {
  for (const query of ['', 'show-drafts=false', 'show-drafts', 'show-drafts=1', 'show-drafts=True']) {
    assert.equal(hasDraftPreview(new URLSearchParams(query)), false);
  }
  assert.equal(hasDraftPreview(new URLSearchParams('show-drafts=true')), true);
  assert.equal(draftReadingHref('/es/articles/example/#section', ['example']), '/es/articles/example/?show-drafts=true#section');
});

test('all draft editions have static noindex gates and stay out of public discovery', {
  skip: !existsSync('build/sitemap.xml')
}, async () => {
  const sitemap = readFileSync('build/sitemap.xml', 'utf8');
  const shortLinks = readFileSync('build/short-links.json', 'utf8');
  for (const file of readdirSync('src/lib/content/articles').filter(file => file.endsWith('.md'))) {
    const metadata = (await compile(readFileSync(`src/lib/content/articles/${file}`, 'utf8'))).data.fm;
    if (metadata.draft !== true) continue;
    const base = metadata.lang === 'fa' ? '' : `/${metadata.lang}`;
    const path = `${base}/articles/${metadata.slug}/`;
    assert.ok(existsSync(`build${path}index.html`), `Missing preview gate: ${path}`);
    const gate = readFileSync(`build${path}index.html`, 'utf8');
    assert.match(gate, /name="robots" content="noindex/);
    assert.doesNotMatch(gate, /class="prose article-body/);
    assert.ok(!sitemap.includes(path), `Draft in sitemap: ${path}`);
    assert.ok(!shortLinks.includes(path), `Draft in short links: ${path}`);
    assert.ok(!readFileSync(`build/search/${metadata.lang}.json`, 'utf8').includes(path), `Draft in public search: ${path}`);
    const archivePaths = [`build${base}/articles/index.html`];
    const paginated = `build${base}/articles/page`;
    if (existsSync(paginated)) archivePaths.push(...readdirSync(paginated).map(page => `${paginated}/${page}/index.html`));
    for (const archive of archivePaths) {
      assert.ok(!readFileSync(archive, 'utf8').includes(`href="${path}`), `Draft link in public archive: ${path}`);
    }
  }
});
