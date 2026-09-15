import assert from 'node:assert/strict';
import { test } from 'node:test';
import { existsSync, readFileSync } from 'node:fs';
import { compile } from 'mdsvex';
import { isPublished } from '../src/lib/publication.mjs';
import { draftReadingHref } from '../src/lib/draft-preview.mjs';

const drafts = [
  ['llms-on-rtx-4090-24gb-vs-48gb', '2026-08-26', '۴ شهریور ۱۴۰۵'],
  ['right-model-size-for-the-task', '2026-08-31', '۹ شهریور ۱۴۰۵']
];
const slugs = drafts.map(([slug]) => slug);

test('preview links preserve filters and fragments and replace an existing draft flag', () => {
  assert.equal(draftReadingHref('/guides/llm/?view=hardware-feasibility#hardware-feasibility', slugs), '/guides/llm/?view=hardware-feasibility&show-drafts=true#hardware-feasibility');
  assert.equal(draftReadingHref(`https://ziabary.ir/articles/${slugs[1]}/?show-drafts=false#example`, slugs), `/articles/${slugs[1]}/?show-drafts=true#example`);
  assert.equal(draftReadingHref(draftReadingHref(`/articles/${slugs[0]}/`, slugs), slugs), `/articles/${slugs[0]}/?show-drafts=true`);
});

test('preview navigation leaves external, published, unwritten and fragment links alone', () => {
  for (const href of ['https://example.com/guides/llm/', '//example.com/guides/llm/', '/articles/airllm-layer-wise-inference/', '/articles/rag-cag-kag-fine-tuning-instruction-tuning/', '/guides/gpu-selection/', '#reading-section', 'mailto:example@example.com']) {
    assert.equal(draftReadingHref(href, slugs), href);
  }
});

test('the two backdated articles remain drafts even after their dates have passed', async () => {
  for (const [slug, date, faDate] of drafts) {
    const result = await compile(readFileSync(`src/lib/content/articles/${slug}.md`, 'utf8'));
    const metadata = result.data.fm;
    assert.equal(metadata.slug, slug);
    assert.equal(metadata.date, date);
    assert.equal(metadata.faDate, faDate);
    assert.equal(metadata.draft, true);
    assert.equal(isPublished(metadata, '2026-09-15'), false);
    assert.equal(isPublished(metadata, '2027-09-15'), false);
    assert.ok(existsSync(`static${metadata.cover}`));
  }
});

test('built draft routes expose a noindex gate instead of the article body', { skip: !slugs.every(slug => existsSync(`build/articles/${slug}/index.html`)) }, () => {
  for (const slug of slugs) {
    const html = readFileSync(`build/articles/${slug}/index.html`, 'utf8');
    assert.match(html, /name="robots" content="noindex,follow"/);
    assert.match(html, /این یادداشت هنوز منتشر نشده است/);
    assert.doesNotMatch(html, /class="prose article-body"/);
    assert.doesNotMatch(html, /"@type":"BlogPosting"/);
    assert.equal([...html.matchAll(/rel="canonical"/g)].length, 1);
  }
});

test('drafts stay out of public sitemap, search, short links and archive HTML', { skip: !existsSync('build/sitemap.xml') }, () => {
  const files = ['build/sitemap.xml', 'build/short-links.json', 'build/search/fa.json', 'build/articles/index.html', 'build/index.html'];
  for (const file of files) {
    const text = readFileSync(file, 'utf8');
    for (const slug of slugs) assert.ok(!text.includes(`/articles/${slug}/`), `${file} contains ${slug}`);
  }
});
