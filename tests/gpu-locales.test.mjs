import { inlineJsonImports } from './helpers/json-imports.mjs';
import { articleFile } from '../scripts/content-files.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';
import { compile } from 'mdsvex';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');
const urlFor = (source) => `data:text/javascript;base64,${Buffer.from(source).toString('base64')}`;
const transpile = (source) => ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
const gpuUrl = urlFor(transpile(inlineJsonImports(await read('src/lib/gpu-data.ts'), 'src/lib/gpu-data.ts')));
const serverUrl = urlFor(transpile(inlineJsonImports(await read('src/lib/server-data.ts'), 'src/lib/server-data.ts')));
const originalGpus = await import(gpuUrl);
const originalServers = await import(serverUrl);
let localizedSource = inlineJsonImports(await read('src/lib/i18n/gpu.ts'), 'src/lib/i18n/gpu.ts');
for (const match of localizedSource.matchAll(/import (\w+) from '\.\/(gpu-(?:data|ui)\.(?:en|es)\.json)';/g)) {
  localizedSource = localizedSource.replace(match[0], `const ${match[1]} = ${await read(`src/lib/i18n/${match[2]}`)};`);
}
const code = transpile(localizedSource)
  .replaceAll("'$lib/gpu-data'", JSON.stringify(gpuUrl))
  .replaceAll("'$lib/server-data'", JSON.stringify(serverUrl));
const { hardwareText, hardwareGpus, hardwareServers, hardwareGpuProfiles } = await import(urlFor(code));

test('the unofficial 48 GB RTX 4090 X remains an available local-AI option', () => {
  const card = originalGpus.gpuRecords.find((gpu) => gpu.id === 'nvidia-rtx4090x');
  assert.ok(card);
  assert.equal(card.status, 'unofficial');
  assert.equal(card.memoryGB, 48);
  assert.ok(card.bandwidthTBs > 0);
  assert.ok(card.workloads.includes('هوش مصنوعی محلی'));
  assert.match(card.bestFit, /پیشنهادی/);
  assert.match(card.caution, /RTX 4090 D/);
  assert.match(card.sourceUrl, /perceptasolutions\.com/);
});

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

test(`the ${locale} collection and its reviewed articles are published`, async () => {
  const collection = JSON.parse(await read(`content/guides/${locale}/gpu-selection.json`));
  assert.equal(collection.draft, false);
  const articleItems = collection.items.filter((item) => item.kind === 'article');
  assert.ok(articleItems.length >= 9);
  assert.equal(collection.items.filter((item) => item.kind === 'interactive').length, 2);
  const ids = new Set(articleItems.map((item) => item.id));
  for (const item of articleItems) {
    const source = await read(articleFile(`${item.id}`));
    const { data: { fm } } = await compile(source);
    assert.equal(fm.draft, false, item.id);
    assert.equal(fm.lang, locale, item.id);
    assert.equal(fm.slug, item.id);
    const original = await compile(await read(articleFile(`${item.id.replace(/-(en|es)$/, '')}`)));
    assert.equal(String(fm.date), String(original.data.fm.date), `${item.id}: retain original publication date`);
    assert.ok(fm.related.length > 0);
    for (const related of fm.related) {
      const target = (await compile(await read(articleFile(`${related}`)))).data.fm;
      assert.equal(target.lang, locale, `${item.id} → ${related}`);
      assert.equal(target.draft, false, `${item.id} → ${related}`);
    }
    for (const match of source.matchAll(/\]\(\/(en|es)\/articles\/([^/]+)\/\)/g)) {
      assert.equal(match[1], locale);
      const target = (await compile(await read(articleFile(`${match[2]}`)))).data.fm;
      assert.equal(target.lang, locale); assert.equal(target.draft, false, match[2]);
    }
    // A source URL can contain a Persian section fragment; visible prose must still be translated.
    const visibleSource = source.replace(/\]\([^\s)]+\)/g, '](source)').replace(/\bhref=["'][^"']+["']/g, 'href="source"');
    assert.doesNotMatch(visibleSource, /[\u0600-\u06ff]/u);
    assert.doesNotMatch(source, /\b(?:Iran(?:ian)?|Irán|iraní(?:es)?)\b/i);
    for (const match of source.matchAll(/(?:cover: "|src="|\]\()(\/images\/[^"\s)]+)/g)) {
      await readFile(new URL(`.build/public${match[1]}`, root));
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
    const en = JSON.parse(await read(name === 'data' ? 'data/gpu/locales/en.json' : 'src/lib/i18n/gpu-ui.en.json'));
    const es = JSON.parse(await read(name === 'data' ? 'data/gpu/locales/es.json' : 'src/lib/i18n/gpu-ui.es.json'));
    assert.deepEqual(Object.keys(es).sort(), Object.keys(en).sort());
    for (const [key, value] of Object.entries(es)) {
      assert.ok(value.trim(), key);
      assert.doesNotMatch(value, /[\u0600-\u06ff]/u, key);
    }
  }
});

test('Spanish preserves the reviewed English sources, figures and editorial relationships', async () => {
  const en = JSON.parse(await read('content/guides/en/gpu-selection.json'));
  const es = JSON.parse(await read('content/guides/es/gpu-selection.json'));
  const spanishSlug = (slug) => slug.replace(/-en$/, '-es');
  assert.deepEqual(es.items.map(item => item.id), en.items.map(item => spanishSlug(item.id)));
  for (const item of en.items.filter(item => item.kind === 'article')) {
    const original = await read(articleFile(`${item.id}`));
    const translation = await read(articleFile(`${spanishSlug(item.id)}`));
    const { data: { fm: originalMeta } } = await compile(original);
    const { data: { fm: translatedMeta } } = await compile(translation);
    assert.deepEqual(translatedMeta.related, originalMeta.related.map(spanishSlug), item.id);
    assert.ok([originalMeta.cover, originalMeta.cover.replace(/-en\//g, '-es/')].includes(translatedMeta.cover), item.id);
    const urls = (source) => [...source.matchAll(/https?:\/\/[^\s)"<>]+/g)].map(match => match[0]).sort();
    const images = (source) => [...source.matchAll(/(?:src="|\]\()(\/images\/[^"\s)]+)/g)].map(match => match[1]).sort();
    assert.deepEqual(urls(translation), urls(original), item.id);
    const translatedImages = images(original).map(path => path.replace(/-en\.(svg|mmd)$/, '-es.$1'));
    assert.deepEqual(images(translation), translatedImages, item.id);
  }
});
