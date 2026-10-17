import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';

const source = await readFile(new URL('../src/lib/presentations.ts', import.meta.url), 'utf8');
const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } }).outputText;
const { presentations, localizePresentation, presentationStructuredData } = await import(`data:text/javascript;base64,${Buffer.from(code).toString('base64')}`);

test('all locales use the Persian archive order, counts and original assets', () => {
  const shared = ({ slug, slideCount, cover, pdf, date, eventUrl, language, coverWidth, coverHeight }) => ({ slug, slideCount, cover, pdf, date, eventUrl, language, coverWidth, coverHeight });
  const originals = presentations.map(shared);
  for (const locale of ['fa', 'en', 'es']) {
    const localized = presentations.map(item => localizePresentation(item, locale));
    assert.deepEqual(localized.map(shared), originals);
  }
});

test('every presentation has complete English and Spanish descriptions and metadata', () => {
  const fields = ['title', 'subtitle', 'summary', 'description', 'presentedAt', 'venue', 'event', 'organizer', 'audience', 'duration', 'version'];
  for (const original of presentations) {
    for (const locale of ['en', 'es']) {
      const localized = localizePresentation(original, locale);
      for (const field of fields) {
        if (original[field]) assert.ok(localized[field]?.trim(), `${original.slug}: ${locale}.${field}`);
      }
      assert.equal(localized.topics.length, original.topics.length, `${original.slug}: ${locale} topics`);
      assert.ok(localized.topics.every(topic => topic.trim()));
      if (original.presenter) assert.ok(localized.presenter?.name);
      if (original.preparedBy) assert.equal(localized.preparedBy?.length, original.preparedBy.length);
      const text = [localized.kind, ...fields.map(field => localized[field] ?? ''), localized.presenter?.name ?? '', ...(localized.preparedBy ?? []), ...localized.topics].join(' ');
      assert.ok(!/[\u0600-\u06ff]/u.test(text), `${original.slug}: untranslated ${locale} text`);
    }
  }
});

test('the conference document credits both scientific authors and only Farhad Nili as presenter', () => {
  const original = presentations.find(item => item.slug === 'the-firm-trapped-by-good-decisions');
  assert.ok(original);
  assert.equal(original.slideCount, 23);
  assert.equal(original.date, '2026-10-11');
  for (const locale of ['fa', 'en', 'es']) {
    const item = localizePresentation(original, locale);
    const data = presentationStructuredData(item, locale, { presenter: 'Presenter', preparedBy: 'Scientific preparation' });
    assert.equal(data['@type'], 'PresentationDigitalDocument');
    assert.deepEqual(data.author.map(person => person.name), item.preparedBy);
    assert.equal(data.contributor['@type'], 'Role');
    assert.equal(data.contributor.roleName, 'Presenter');
    assert.equal(data.contributor.contributor.name, item.preparedBy[0]);
    assert.notEqual(data.contributor.contributor.name, item.preparedBy[1]);
    assert.ok(item.description.includes(item.preparedBy[0]));
    assert.ok(item.description.includes(item.preparedBy[1]));
    assert.equal(data.datePublished, '2026-10-11');
    assert.equal(data.inLanguage, 'fa');
    assert.equal(data.encoding.inLanguage, 'fa');
    assert.equal(data.encoding.contentUrl, `https://ziabary.ir${original.pdf}`);
    assert.equal(data.name, item.title);
    assert.ok(!('performer' in data), 'presenter is expressed through a contributor Role, not an Event-only property');
  }
  assert.equal(presentationStructuredData(localizePresentation(presentations.find(item => !item.preparedBy), 'en'), 'en', { presenter: 'Presenter', preparedBy: 'Scientific preparation' }), undefined);
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
