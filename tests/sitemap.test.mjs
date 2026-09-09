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
