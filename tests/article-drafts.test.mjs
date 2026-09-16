import assert from 'node:assert/strict';
import { test } from 'node:test';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { compile } from 'mdsvex';
import { dateOnly, isPublished } from '../src/lib/publication.mjs';
import { draftReadingHref } from '../src/lib/draft-preview.mjs';
import { llmArticleSeries } from './helpers/llm-article-series.mjs';

const drafts = llmArticleSeries.map(({ slug, date, faDate }) => [slug, date, faDate]);
const slugs = drafts.map(([slug]) => slug);

test('preview links preserve filters and fragments and replace an existing draft flag', () => {
  assert.equal(draftReadingHref('/guides/llm/?view=hardware-feasibility#hardware-feasibility', slugs), '/guides/llm/?view=hardware-feasibility&show-drafts=true#hardware-feasibility');
  assert.equal(draftReadingHref(`https://ziabary.ir/articles/${slugs[1]}/?show-drafts=false#example`, slugs), `/articles/${slugs[1]}/?show-drafts=true#example`);
  assert.equal(draftReadingHref(draftReadingHref(`/articles/${slugs[0]}/`, slugs), slugs), `/articles/${slugs[0]}/?show-drafts=true`);
});

test('preview navigation leaves external, published, unwritten and fragment links alone', () => {
  for (const href of ['https://example.com/guides/llm/', '//example.com/guides/llm/', '/articles/not-written-example/', '/articles/rag-cag-kag-fine-tuning-instruction-tuning/', '/guides/gpu-selection/', '#reading-section', 'mailto:example@example.com']) {
    assert.equal(draftReadingHref(href, slugs), href);
  }
});

test('the completed LLM series is published with its editorial dates and local covers', async () => {
  for (const [slug, date, faDate] of drafts) {
    const result = await compile(readFileSync(`src/lib/content/articles/${slug}.md`, 'utf8'));
    const metadata = result.data.fm;
    assert.equal(metadata.slug, slug);
    assert.equal(metadata.date, date);
    assert.equal(metadata.faDate, faDate);
    assert.equal(metadata.draft, false);
    assert.equal(isPublished(metadata, '2026-09-16'), true);
    assert.equal(isPublished(metadata, '2027-09-15'), true);
    assert.ok(existsSync(`static${metadata.cover}`));
  }
});

test('LLM article body links and manual related reading only reference existing, no-later articles', async () => {
  const cache = new Map();
  const readArticle = async slug => {
    if (!cache.has(slug)) {
      const path = `src/lib/content/articles/${slug}.md`;
      assert.ok(existsSync(path), `Unwritten article: ${slug}`);
      const source = readFileSync(path, 'utf8');
      cache.set(slug, { source, metadata: (await compile(source)).data.fm });
    }
    return cache.get(slug);
  };
  const foundations = ['', '-en', '-es'].map(suffix => `rag-cag-kag-fine-tuning-instruction-tuning${suffix}`);
  for (const slug of [...slugs, ...foundations]) {
    const { source, metadata } = await readArticle(slug);
    const body = source.split('---').slice(2).join('---');
    const hrefs = [...body.matchAll(/\]\(([^\s)]+)\)|\bhref=["']([^"']+)["']/g)].map(match => match[1] ?? match[2]);
    const targets = new Set(metadata.related ?? []);
    for (const href of hrefs) {
      const url = new URL(href, 'https://ziabary.ir');
      if (url.origin !== 'https://ziabary.ir') continue;
      const article = /^\/(?:en\/|es\/)?articles\/([^/]+)\/?$/.exec(url.pathname);
      if (article) targets.add(article[1]);
    }
    for (const target of targets) {
      assert.notEqual(target, slug, `Self-reference in ${slug}`);
      const { metadata: linked } = await readArticle(target);
      assert.ok(dateOnly(linked.date) <= dateOnly(metadata.date), `${slug} (${dateOnly(metadata.date)}) links forward to ${target} (${dateOnly(linked.date)})`);
      assert.notEqual(linked.draft, true, `${slug} links to unpublished ${target}`);
      assert.equal(linked.lang, metadata.lang, `Unexpected edition in ${slug}: ${target}`);
    }
    if (slugs.includes(slug)) {
      assert.ok(hrefs.some(href => href.startsWith('/guides/llm/')), `${slug} needs a relevant LLM table/guide link`);
      assert.ok(targets.size >= 3, `${slug} needs a substantive reading path`);
      assert.equal(metadata.related.length, new Set(metadata.related).size);
      if (slug !== slugs[0]) assert.ok([...targets].some(target => slugs.includes(target)), `${slug} is disconnected from the LLM series`);
    } else {
      assert.equal(dateOnly(metadata.date), '2026-06-15');
      assert.equal(metadata.draft, false);
    }
  }
});

test('published LLM routes prerender the body, canonical and article schema', { skip: !slugs.every(slug => existsSync(`build/articles/${slug}/index.html`)) }, () => {
  for (const slug of slugs) {
    const html = readFileSync(`build/articles/${slug}/index.html`, 'utf8');
    assert.doesNotMatch(html, /name="robots" content="noindex/);
    assert.doesNotMatch(html, /این یادداشت هنوز منتشر نشده است/);
    assert.match(html, /class="prose article-body(?:\s[^"]*)?"/);
    assert.match(html, /"@type":"BlogPosting"/);
    assert.equal([...html.matchAll(/rel="canonical"/g)].length, 1);
  }
});

test('published LLM articles enter sitemap, search, short links and archive', { skip: !existsSync('build/sitemap.xml') }, () => {
  for (const file of ['build/sitemap.xml', 'build/short-links.json', 'build/search/fa.json']) {
    const text = readFileSync(file, 'utf8');
    for (const slug of slugs) assert.ok(text.includes(`/articles/${slug}/`), `${file} omits ${slug}`);
    assert.ok(!text.includes('/articles/secure-rag-agent/'), `${file} exposes an unrelated draft`);
  }
  const archive = ['build/articles/index.html', ...readdirSync('build/articles/page').map(page => `build/articles/page/${page}/index.html`)].map(file => readFileSync(file, 'utf8')).join('');
  for (const slug of slugs) assert.ok(archive.includes(`/articles/${slug}/`), `Archive omits ${slug}`);
});
