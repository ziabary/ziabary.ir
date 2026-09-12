import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { compile } from 'mdsvex';
import { dateOnly, formatDate, isPublished, collectionState, compareArticles } from '../src/lib/publication.mjs';
import { translationIndex, articlePath } from '../src/lib/translations.mjs';
import { searchItems } from '../src/lib/search.mjs';
import { archivePath, pageCount, validPage } from '../src/lib/archive.mjs';
import markdownHeadings from '../scripts/markdown-headings.mjs';

test('optional translations: independent, two editions, distinct slugs, draft/future, conflicts', () => {
  const records = [
    { slug: 'fa-work', lang: 'fa', date: '2020-01-01' },
    { slug: 'different-en', lang: 'en', date: '2020-01-01' },
    { slug: 'es-draft', lang: 'es', date: '2020-01-01', draft: true },
    { slug: 'en-alone', lang: 'en', date: '2020-01-01' },
    { slug: 'es-future', lang: 'es', date: '2030-01-01', translationGroup: 'work' }
  ];
  const groups = { work: { fa: 'fa-work', en: 'different-en', es: 'es-draft' } };
  assert.deepEqual(translationIndex(records, groups, '2026-09-09').get('work').map(articlePath), ['/articles/fa-work/', '/en/articles/different-en/']);
  assert.equal(translationIndex([records[3]], {}, '2026-09-09').size, 0);
  records[2].draft = false;
  assert.equal(translationIndex(records, groups, '2026-09-09').get('work').length, 3);
  assert.throws(() => translationIndex([...records, { ...records[1], slug: 'another', translationGroup: 'work' }], groups), /Duplicate published language/);
  assert.throws(() => translationIndex(records, { ...groups, wrong: { fa: 'fa-work' } }), /Conflicting translation/);
});

test('publication state changes card discovery and usable count from one decision', () => {
  const item = { id: 'chapter', kind: 'article', href: '/articles/chapter/' };
  assert.deepEqual(collectionState({ status: 'planned', items: [item] }, () => true), { status: 'planned', items: [item] });
  assert.equal(collectionState({ status: 'published', items: [item] }, () => undefined).status, 'planned');
  assert.equal(collectionState({ status: 'published', items: [item] }, () => true).status, 'published');
  assert.equal(isPublished({ date: '2030-01-01' }, '2026-09-09'), false);
  assert.equal(isPublished({ date: '2020-01-01', draft: true }), false);
});

test('calendar date and local display do not depend on server/reader timezone', () => {
  for (const date of ['2024-02-29', '2026-03-20', '2026-12-31', '2027-01-01']) {
    const outputs = ['UTC', 'Asia/Tehran', 'Pacific/Honolulu', 'Pacific/Kiritimati'].map(TZ => execFileSync(process.execPath, ['--input-type=module', '-e', `import {formatDate} from './src/lib/publication.mjs'; console.log(JSON.stringify(['fa','en','es'].map(l=>formatDate('${date}',l))));`], { env: { ...process.env, TZ }, encoding: 'utf8' }));
    assert.equal(new Set(outputs).size, 1);
    assert.equal(dateOnly(date), date);
  }
  assert.throws(() => dateOnly('2026-02-30'));
  assert.ok(formatDate('2026-09-09', 'fa').includes('۱۴۰۵'));
});

test('archive edge cases and same-date stable ordering', () => {
  assert.equal(pageCount(0), 1); assert.equal(pageCount(25), 3);
  for (const page of ['0', '-1', '1.5', '99', '01']) assert.equal(validPage(page, 25), false);
  assert.equal(validPage('2', 25), true);
  assert.equal(archivePath('en', 1), '/en/articles/'); assert.equal(archivePath('es', 2), '/es/articles/page/2/');
  assert.deepEqual([{slug:'b',date:'2026-01-01'},{slug:'a',date:'2026-01-01'}].sort(compareArticles).map(a=>a.slug), ['a','b']);
});

test('equivalent Persian spellings find the same real published articles', () => {
  const records = JSON.parse(readFileSync('static/search/fa.json', 'utf8'));
  for (const [a,b,expected] of [
    ['عیار','عيار','ayar-hoomas-assistant-for-startups-and-investors'],
    ['کار','كار','noafarin-plan'],
    ['هوش مصنوعی','هوش‌مصنوعی','national-ai-organization-from-law-to-impact'],
    ['FP8','fp8','int8-or-fp8-real-gpu-support']
  ]) {
    const results = query => searchItems(records, query).map(item => item.href);
    assert.deepEqual(results(a), results(b));
    assert.ok(results(a).some(href => href.includes(expected)), `${a}: ${expected}`);
  }
  for (const [a,b] of [['۲۰۰','200'],['۲۰۰','٢٠٠'],['هُوش   مـصنوعی','هوش مصنوعی']]) {
    assert.ok(searchItems(records,a).length);
    assert.deepEqual(searchItems(records,a).map(r=>r.href),searchItems(records,b).map(r=>r.href));
  }
  assert.equal(searchItems([{title:'C++',href:'cpp'},{title:'C#',href:'csharp'}], 'C++')[0].href,'cpp');
  assert.equal(searchItems([{title:'Other',body:'Exact title',href:'body'},{title:'Exact title',href:'title'}], 'Exact title')[0].href,'title');
});

test('Markdown IDs: repeated Persian headings, explicit old anchors and collection namespaces', async () => {
  const result = await compile('## هوش‌مصنوعی\n\n### بخش فرعی\n\n## هوش‌مصنوعی\n\n## C++ {#cpp}\n\n[link](#cpp)\n\n<span id="legacy"></span>', { remarkPlugins: [markdownHeadings] });
  assert.deepEqual(result.data.fm.headings.map(h=>h.id), ['هوش-مصنوعی','بخش-فرعی','هوش-مصنوعی-2','cpp']);
  assert.match(result.code, /id="\{headingPrefix\}cpp"/);
  assert.match(result.code, /href="#\{headingPrefix\}cpp"/);
  assert.match(result.code, /id="\{headingPrefix\}legacy"/);
  await assert.rejects(() => compile('## One {#same}\n\n## Two {#same}', { remarkPlugins:[markdownHeadings] }), /Duplicate explicit/);
});
