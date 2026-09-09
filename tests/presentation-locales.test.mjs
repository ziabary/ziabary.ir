import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';

const source = await readFile(new URL('../src/lib/presentations.ts', import.meta.url), 'utf8');
const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } }).outputText;
const { presentations, localizePresentation } = await import(`data:text/javascript;base64,${Buffer.from(code).toString('base64')}`);

test('all locales use the Persian archive order, counts and original assets', () => {
  const shared = ({ slug, slideCount, cover, pdf }) => ({ slug, slideCount, cover, pdf });
  const originals = presentations.map(shared);
  for (const locale of ['fa', 'en', 'es']) {
    const localized = presentations.map(item => localizePresentation(item, locale));
    assert.deepEqual(localized.map(shared), originals);
  }
});

test('every presentation has complete English and Spanish descriptions and metadata', () => {
  const fields = ['title', 'summary', 'description', 'presentedAt', 'venue', 'event', 'organizer', 'audience', 'duration', 'version'];
  for (const original of presentations) {
    for (const locale of ['en', 'es']) {
      const localized = localizePresentation(original, locale);
      for (const field of fields) {
        if (original[field]) assert.ok(localized[field]?.trim(), `${original.slug}: ${locale}.${field}`);
      }
      assert.equal(localized.topics.length, original.topics.length, `${original.slug}: ${locale} topics`);
      assert.ok(localized.topics.every(topic => topic.trim()));
      const text = [localized.kind, ...fields.map(field => localized[field] ?? ''), ...localized.topics].join(' ');
      assert.ok(!/[\u0600-\u06ff]/u.test(text), `${original.slug}: untranslated ${locale} text`);
    }
  }
});

test('localization preserves the Persian source and cannot replace shared assets', () => {
  const snapshot = JSON.stringify(presentations);
  for (const original of presentations) {
    assert.equal(localizePresentation(original, 'fa'), original);
    for (const locale of ['en', 'es']) localizePresentation(original, locale);
  }
  assert.equal(JSON.stringify(presentations), snapshot);
  const original = presentations[0];
  const overridden = {
    ...original,
    translations: { ...original.translations, en: { ...original.translations.en, pdf: '/wrong.pdf', cover: '/wrong.jpg', slideCount: 0, slug: 'wrong' } }
  };
  const result = localizePresentation(overridden, 'en');
  for (const field of ['pdf', 'cover', 'slideCount', 'slug']) assert.equal(result[field], original[field]);
});
