import assert from 'node:assert/strict';
import { after, test } from 'node:test';
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { join } from 'node:path';
import { compile } from 'svelte/compiler';
import { render } from 'svelte/server';

const scratchRoot = fileURLToPath(new URL('../.svelte-kit/', import.meta.url));
await mkdir(scratchRoot, { recursive: true });
const temporary = await mkdtemp(join(scratchRoot, 'page-seo-test-'));
after(() => rm(temporary, { recursive: true, force: true }));
const filename = fileURLToPath(new URL('../src/lib/components/PageSeo.svelte', import.meta.url));
const source = await readFile(filename, 'utf8');
const compiled = compile(source, { filename, generate: 'server' });
const modulePath = join(temporary, 'PageSeo.mjs');
await writeFile(modulePath, compiled.js.code);
const { default: PageSeo } = await import(pathToFileURL(modulePath).href);

const baseProps = {
  title: 'راهنمای GPU', description: 'مقایسهٔ پردازنده‌ها',
  path: '/guides/gpu-selection/', image: '/images/guides/gpu-selection.webp'
};
function seo(props = {}) {
  const { head } = render(PageSeo, { props: { ...baseProps, ...props } });
  const blocks = [...head.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  assert.equal(blocks.length, 1);
  return { head, data: JSON.parse(blocks[0][1]) };
}

test('guide SSR emits real WebPage JSON with its canonical URL', () => {
  const { data } = seo();
  assert.equal(data['@type'], 'WebPage');
  assert.equal(data.name, baseProps.title);
  assert.equal(data.url, 'https://ziabary.ir/guides/gpu-selection/');
});

test('article SSR includes BlogPosting dates, author and image', () => {
  const { data } = seo({ type: 'article', path: '/articles/example/', publishedDate: '2026-08-10', updatedDate: '2026-09-08' });
  assert.equal(data['@type'], 'BlogPosting');
  assert.equal(data.datePublished, '2026-08-10');
  assert.equal(data.dateModified, '2026-09-08');
  assert.equal(data.author.name, 'Mehran Ziabary');
  assert.equal(data.mainEntityOfPage['@id'], data.url);
  assert.deepEqual(data.image, ['https://ziabary.ir/images/guides/gpu-selection.webp']);
});

test('home SSR emits the Person, WebSite and WebPage graph', () => {
  const { data } = seo({ path: '/' });
  assert.deepEqual(data['@graph'].map(node => node['@type']), ['Person', 'WebSite', 'WebPage']);
});

test('quotes, Persian text and closing script strings round-trip without HTML injection', () => {
  const description = 'توضیح "آزمون" </script><script id="injected">alert(1)</script> & <!--';
  const { head, data } = seo({ description });
  assert.equal(data.description, description);
  assert(!head.includes('<script id="injected">'));
  assert.equal([...head.matchAll(/<script\b/g)].length, 1);
});
