import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { sitemapPages, sitemapXml } from '../scripts/sitemap.mjs';
import { verifySitemap } from '../scripts/verify-sitemap.mjs';

async function fixture(t) {
  const directory = await mkdtemp(join(tmpdir(), 'ziabary-sitemap-'));
  t.after(() => rm(directory, { recursive: true, force: true }));
  const put = async (path, text = '<html><head></head><body>Published</body></html>') => {
    await mkdir(dirname(join(directory, path)), { recursive: true });
    await writeFile(join(directory, path), text);
  };
  await put('index.html');
  await put('robots.txt', 'User-agent: *\nSitemap: https://ziabary.ir/sitemap.xml\n');
  const generate = async () => put('sitemap.xml', sitemapXml(await sitemapPages(directory)));
  return { directory, put, generate };
}

test('indexes published language routes and excludes admin, errors and noindex pages', async t => {
  const { directory, put, generate } = await fixture(t);
  for (const path of ['en/index.html', 'es/articles/ejemplo/index.html', 'articles/example/index.html', 'admin/index.html', 'admin/edit/index.html', '404/index.html', '404.html']) await put(path);
  await put('es/guides/draft/index.html', '<meta content="noindex,nofollow" name="robots">');
  await put('preview/index.html', "<META NAME='Googlebot' CONTENT='NONE'>");
  await put('unlisted/index.html', '<meta name=robots content=noindex>');
  const pages = await sitemapPages(directory);
  assert.deepEqual(pages.map(page => page.path), ['/', '/articles/example/', '/en/', '/es/articles/ejemplo/']);
  await generate();
  await verifySitemap(directory);
});

test('rejects missing maps and detects added, removed and newly noindex pages', async t => {
  const { directory, put, generate } = await fixture(t);
  await assert.rejects(verifySitemap(directory), { code: 'ENOENT' });
  await generate();
  await put('new/index.html');
  await assert.rejects(verifySitemap(directory), /stale or invalid/);
  await generate();
  await rm(join(directory, 'new'), { recursive: true });
  await assert.rejects(verifySitemap(directory), /stale or invalid/);
  await generate();
  await put('article/index.html');
  await generate();
  await put('article/index.html', '<meta name="robots" content="noindex">');
  await assert.rejects(verifySitemap(directory), /stale or invalid/);
});

test('rejects corrupted XML, duplicates and a missing robots sitemap directive', async t => {
  const { directory, put, generate } = await fixture(t);
  await generate();
  const xml = await readFile(join(directory, 'sitemap.xml'), 'utf8');
  await put('sitemap.xml', xml.replace('</urlset>', '<url><loc>https://ziabary.ir/</loc></url></urlset>'));
  await assert.rejects(verifySitemap(directory), /stale or invalid/);
  await put('sitemap.xml', xml.replace('</urlset>', ''));
  await assert.rejects(verifySitemap(directory), /stale or invalid/);
  await generate();
  await put('robots.txt', 'User-agent: *\n');
  await assert.rejects(verifySitemap(directory), /robots.txt/);
});

test('encodes URLs and XML characters without generating build-time modification dates', async t => {
  const { directory, put } = await fixture(t);
  await put('articles/نمونه & more/index.html');
  const xml = sitemapXml(await sitemapPages(directory));
  assert.ok(xml.includes('/articles/%D9%86%D9%85%D9%88%D9%86%D9%87%20&amp;%20more/'));
  assert.doesNotMatch(xml, /<lastmod>/);
});

test('rejects an empty or incomplete build', async t => {
  const { directory } = await fixture(t);
  await rm(join(directory, 'index.html'));
  await assert.rejects(sitemapPages(directory), /indexable home page/);
});

const articleHtml = (published, modified) => `<html><head><meta property="article:published_time" content="${published}">${modified === undefined ? '' : `<meta content='${modified}' property='article:modified_time'>`}</head><body></body></html>`;

test('uses each edition’s editorial dates and stays stable across rebuilds', async t => {
  const { directory, put, generate } = await fixture(t);
  const original = articleHtml('2020-01-02', '2025-02-03');
  await put('articles/example/index.html', original);
  await put('en/articles/example/index.html', articleHtml('2020-01-02'));
  await generate();
  const before = await readFile(join(directory, 'sitemap.xml'), 'utf8');
  assert.match(before, /\/articles\/example\/<\/loc><lastmod>2025-02-03<\/lastmod>/);
  assert.match(before, /\/en\/articles\/example\/<\/loc><lastmod>2020-01-02<\/lastmod>/);
  assert.match(before, /<loc>https:\/\/ziabary.ir\/<\/loc><\/url>/);
  assert.doesNotMatch(before, /changefreq|priority/);
  // Rewriting build output and changing presentation must not refresh dates.
  await put('articles/example/index.html', original.replace('<body>', '<body class="rebuilt">'));
  await generate();
  assert.equal(await readFile(join(directory, 'sitemap.xml'), 'utf8'), before);
  await put('articles/example/index.html', articleHtml('2020-01-02', '2025-03-04'));
  await assert.rejects(verifySitemap(directory), /stale or invalid/);
  await generate();
  await verifySitemap(directory);
});

test('rejects invalid or reversed editorial dates instead of inventing lastmod', async t => {
  const { directory, put } = await fixture(t);
  for (const modified of ['2025-02-30', 'today', '', '2019-12-31']) {
    await put('articles/example/index.html', articleHtml('2020-01-02', modified));
    await assert.rejects(sitemapPages(directory), /Invalid editorial date|precedes publication/);
  }
});

test('ignores dates inside article body examples and noindex pages', async t => {
  const { directory, put } = await fixture(t);
  await put('example/index.html', '<html><head></head><body><meta property="article:modified_time" content="2025-01-01"></body></html>');
  await put('draft/index.html', articleHtml('invalid').replace('<head>', '<head><meta name="robots" content="noindex">'));
  assert.doesNotMatch(sitemapXml(await sitemapPages(directory)), /lastmod/);
});
