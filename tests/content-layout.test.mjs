import assert from 'node:assert/strict';
import { test } from 'node:test';
import { existsSync, mkdirSync, readFileSync, rmdirSync, unlinkSync, writeFileSync } from 'node:fs';
import { dirname, relative } from 'node:path';
import { compile } from 'mdsvex';
import { articleFiles, articleFile, projectRoot } from '../scripts/content-files.mjs';
import markdownArticleAssets, { articleAssetUrl } from '../scripts/article-assets.mjs';
import { readArticleMetadata } from '../scripts/article-metadata-plugin.mjs';

test('article directories match their explicit edition and slug without duplicate identities', async () => {
  const identities = new Set();
  for (const file of articleFiles()) {
    const metadata = await readArticleMetadata(readFileSync(file, 'utf8'), file);
    const directory = relative(projectRoot, dirname(file)).replaceAll('\\', '/');
    assert.equal(directory, `content/articles/${metadata.lang}/${metadata.slug}`);
    const identity = `${metadata.lang}:${metadata.slug}`;
    assert.ok(!identities.has(identity), identity);
    identities.add(identity);
    assert.equal(articleFile(metadata.slug, metadata.lang), file);
  }
  assert.ok(identities.size > 190);
  assert.equal(existsSync('src/lib/content/articles'), false);
});

test('relative article assets preserve mapped legacy URLs and reject directory escapes', () => {
  const file = articleFile('kazan-travelogue', 'fa');
  assert.equal(articleAssetUrl(file, './images/airport.webp'), '/images/articles/kazan-travelogue/airport.webp');
  assert.equal(articleAssetUrl(file, '/images/original.webp'), '/images/original.webp');
  assert.equal(articleAssetUrl(file, 'https://example.com/photo.webp'), 'https://example.com/photo.webp');
  assert.equal(articleAssetUrl(file, './files/report.pdf#page=2'), '/downloads/articles/kazan-travelogue/report.pdf#page=2');
  assert.throws(() => articleAssetUrl(file, './images/../private.webp'), /escapes/);
  assert.throws(() => articleAssetUrl(file, './images/%2e%2e/private.webp'), /escapes/);
});

test('both Markdown and figure HTML resolve images while comments remain inert', async () => {
  const filename = articleFile('kazan-travelogue', 'fa');
  const result = await compile('![تصویر](./images/one.webp)\n\n<figure>\n<img src="./images/two.webp" alt="تصویر" />\n<figcaption>شرح</figcaption>\n</figure>\n\n<!-- <img src="./images/later.webp" /> -->', {
    filename, extensions: ['.md'], remarkPlugins: [markdownArticleAssets]
  });
  assert.match(result.code, /\/images\/articles\/kazan-travelogue\/one.webp/);
  assert.match(result.code, /\/images\/articles\/kazan-travelogue\/two.webp/);
  assert.match(result.code, /<!-- <img src="\.\/images\/later.webp"/);
});

test('metadata-only cover resolution follows the same article asset mapping', async () => {
  const metadata = await readArticleMetadata('---\ntitle: Cover\ncover: ./images/cover.webp\n---\nText', articleFile('kazan-travelogue', 'fa'));
  assert.equal(metadata.cover, '/images/articles/kazan-travelogue/cover.webp');
});

test('all three editions resolve the same shared original without locale copies', () => {
  for (const locale of ['fa', 'en', 'es']) {
    const slug = `choosing-gpu-for-ai${locale === 'fa' ? '' : `-${locale}`}`;
    const file = articleFile(slug, locale);
    assert.equal(articleAssetUrl(file, './images/cover.png'), '/images/articles/choosing-gpu-for-ai/cover.png');
    assert.equal(existsSync(`${dirname(file)}/images/cover.png`), false);
  }
  assert.ok(existsSync('content/articles/shared/choosing-gpu-for-ai/images/cover.png'));
});

test('a new local override gets a separate URL and cannot replace a shared original', () => {
  const file = articleFile('choosing-gpu-for-ai-en', 'en');
  const directory = `${dirname(file)}/images`;
  const existed = existsSync(directory);
  mkdirSync(directory, { recursive: true });
  const resource = `locale-override-${process.pid}.webp`;
  const image = `${directory}/${resource}`;
  try {
    writeFileSync(image, 'test', { flag: 'wx' });
    assert.equal(articleAssetUrl(file, `./images/${resource}`), `/images/articles/en/choosing-gpu-for-ai-en/${resource}`);
    assert.equal(articleAssetUrl(file, './images/cover.png'), '/images/articles/choosing-gpu-for-ai/cover.png');
  } finally {
    unlinkSync(image);
    if (!existed) rmdirSync(directory);
  }
});
