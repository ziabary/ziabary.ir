import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';
import { compile } from 'mdsvex';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');
const urlFor = (source) => `data:text/javascript;base64,${Buffer.from(source).toString('base64')}`;
const transpile = (source) => ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
const gpuUrl = urlFor(transpile(await read('src/lib/gpu-data.ts')));
const serverUrl = urlFor(transpile(await read('src/lib/server-data.ts')));
const originalGpus = await import(gpuUrl);
const originalServers = await import(serverUrl);
let localizedSource = await read('src/lib/i18n/gpu.ts');
for (const match of localizedSource.matchAll(/import (\w+) from '\.\/(gpu-(?:data|ui)\.(?:en|es)\.json)';/g)) {
  localizedSource = localizedSource.replace(match[0], `const ${match[1]} = ${await read(`src/lib/i18n/${match[2]}`)};`);
}
const code = transpile(localizedSource)
  .replaceAll("'$lib/gpu-data'", JSON.stringify(gpuUrl))
  .replaceAll("'$lib/server-data'", JSON.stringify(serverUrl));
const { hardwareText, hardwareGpus, hardwareServers, hardwareGpuProfiles } = await import(urlFor(code));

function visit(value, path, callback) {
  if (value && typeof value === 'object') {
    for (const [key, child] of Object.entries(value)) visit(child, `${path}.${key}`, callback);
  } else callback(value, path);
}

test('Persian data is returned unchanged and neither localization mutates it', () => {
  const before = JSON.stringify([originalGpus.gpuRecords, originalServers.serverRecords, originalServers.serverGpuProfiles]);
  assert.equal(hardwareGpus('fa'), originalGpus.gpuRecords);
  assert.equal(hardwareServers('fa'), originalServers.serverRecords);
  assert.equal(hardwareGpuProfiles('fa'), originalServers.serverGpuProfiles);
  for (const locale of ['en', 'es']) {
    hardwareGpus(locale); hardwareServers(locale); hardwareGpuProfiles(locale);
  }
  assert.equal(JSON.stringify([originalGpus.gpuRecords, originalServers.serverRecords, originalServers.serverGpuProfiles]), before);
});

for (const locale of ['en', 'es']) {
test(`${locale} retains every numeric value, null, boolean and source URL`, () => {
  for (const getRecords of [hardwareGpus, hardwareServers, hardwareGpuProfiles]) {
    const before = new Map();
    visit(getRecords('fa'), '', (value, path) => before.set(path, value));
    visit(getRecords(locale), '', (value, path) => {
      const source = before.get(path);
      if (typeof source !== 'string' || source.startsWith('https://') || /\.(id|status|gpuClass|acceleratorForm|gpuTopology)$/.test(path)) {
        assert.equal(value, source, path);
      }
    });
    assert.deepEqual(getRecords(locale).map((record) => record.id), getRecords('fa').map((record) => record.id));
  }
});

test(`${locale} translates all hardware strings, including internal enum labels`, () => {
  for (const getRecords of [hardwareGpus, hardwareServers, hardwareGpuProfiles]) {
    visit(getRecords(locale), '', (value, path) => {
      if (typeof value !== 'string') return;
      assert.doesNotMatch(hardwareText(value, locale), /[\u0600-\u06ff]/u, path);
    });
  }
  assert.equal(hardwareText('۲۵۶ GB', locale), '256 GB');
});

test(`${locale} rejects missing translations instead of leaking Persian text`, () => {
  assert.throws(() => hardwareText('شرح تازه و ترجمه‌نشده', locale), /Missing (English|Spanish) hardware translation/);
  assert.equal(hardwareText('شرح فارسی', 'fa'), 'شرح فارسی');
});

test(`the ${locale} collection and its eight articles are published`, async () => {
  const collection = JSON.parse(await read(`docs/drafts/gpu-selection-${locale}/collection.json`));
  assert.equal(collection.draft, false);
  const articleItems = collection.items.filter((item) => item.kind === 'article');
  assert.equal(articleItems.length, 8);
  assert.equal(collection.items.filter((item) => item.kind === 'interactive').length, 2);
  const ids = new Set(articleItems.map((item) => item.id));
  for (const item of articleItems) {
    const source = await read(`src/lib/content/articles/${item.id}.md`);
    const { data: { fm } } = await compile(source);
    assert.equal(fm.draft, false, item.id);
    assert.equal(fm.lang, locale, item.id);
    assert.equal(fm.slug, item.id);
    const original = await compile(await read(`src/lib/content/articles/${item.id.replace(/-(en|es)$/, '')}.md`));
    assert.equal(String(fm.date), String(original.data.fm.date), `${item.id}: retain original publication date`);
    assert.ok(fm.related.length > 0);
    for (const related of fm.related) assert.ok(ids.has(related), `${item.id} → ${related}`);
    for (const match of source.matchAll(/\]\(\/(en|es)\/articles\/([^/]+)\/\)/g)) {
      assert.equal(match[1], locale);
      assert.ok(ids.has(match[2]), match[2]);
    }
    assert.doesNotMatch(source, /[\u0600-\u06ff]/u);
    assert.doesNotMatch(source, /\b(?:Iran(?:ian)?|Irán|iraní(?:es)?)\b/i);
    for (const match of source.matchAll(/(?:cover: "|src="|\]\()(\/images\/[^"\s)]+)/g)) {
      await readFile(new URL(`static${match[1]}`, root));
    }
  }
  for (const path of collection.paths) assert.ok(collection.items.some((item) => item.id === path.id));
  assert.equal(collection.imageReview.length, 1);
  assert.equal(collection.imageReview[0].article, `pcie-gpu-server-selection-${locale}`);
});
}

test('localization caches and dictionaries are independent for English and Spanish', async () => {
  for (const getRecords of [hardwareGpus, hardwareServers, hardwareGpuProfiles]) {
    assert.notEqual(getRecords('en'), getRecords('es'));
    assert.equal(getRecords('en'), getRecords('en'));
    assert.equal(getRecords('es'), getRecords('es'));
  }
  assert.equal(hardwareText('سازنده', 'en'), 'Manufacturer');
  assert.equal(hardwareText('سازنده', 'es'), 'Fabricante');
  for (const name of ['data', 'ui']) {
    const en = JSON.parse(await read(`src/lib/i18n/gpu-${name}.en.json`));
    const es = JSON.parse(await read(`src/lib/i18n/gpu-${name}.es.json`));
    assert.deepEqual(Object.keys(es).sort(), Object.keys(en).sort());
    for (const [key, value] of Object.entries(es)) {
      assert.ok(value.trim(), key);
      assert.doesNotMatch(value, /[\u0600-\u06ff]/u, key);
    }
  }
});

test('Spanish preserves the reviewed English sources, figures and editorial relationships', async () => {
  const en = JSON.parse(await read('docs/drafts/gpu-selection-en/collection.json'));
  const es = JSON.parse(await read('docs/drafts/gpu-selection-es/collection.json'));
  const spanishSlug = (slug) => slug.replace(/-en$/, '-es');
  assert.deepEqual(es.items.map(item => item.id), en.items.map(item => spanishSlug(item.id)));
  for (const item of en.items.filter(item => item.kind === 'article')) {
    const original = await read(`src/lib/content/articles/${item.id}.md`);
    const translation = await read(`src/lib/content/articles/${spanishSlug(item.id)}.md`);
    const { data: { fm: originalMeta } } = await compile(original);
    const { data: { fm: translatedMeta } } = await compile(translation);
    assert.deepEqual(translatedMeta.related, originalMeta.related.map(spanishSlug), item.id);
    assert.equal(translatedMeta.cover, originalMeta.cover, item.id);
    const urls = (source) => [...source.matchAll(/https?:\/\/[^\s)"<>]+/g)].map(match => match[0]).sort();
    const images = (source) => [...source.matchAll(/(?:src="|\]\()(\/images\/[^"\s)]+)/g)].map(match => match[1]).sort();
    assert.deepEqual(urls(translation), urls(original), item.id);
    const translatedImages = images(original).map(path => path.replace(/-en\.(svg|mmd)$/, '-es.$1'));
    assert.deepEqual(images(translation), translatedImages, item.id);
  }
});
