import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { compactSearch, searchItems } from '../src/lib/search.mjs';

const hrefs = (records, query) => searchItems(records, query).map(item => item.href);
test('Persian letter, hamza, diacritic and whitespace variants are equivalent', () => {
  const groups = [
    ['حکمرانی', 'حكمراني', 'حُکْم‌رانی', 'حک مرانی', 'حک\u00a0مرانی', 'حک\u200fمرانی'],
    ['سیاستگذاری', 'سیاست گذاری', 'سياست‌گذاري'],
    ['تامین', 'تأمین', 'تأمین'],
    ['ارائه', 'ارایه', 'ارايه'],
    ['مسئولیت', 'مسؤولیت', 'مسوولیت', 'مسءولیت'],
    ['مسئله', 'مسأله', 'مساله'],
    ['هیئت', 'هیأت', 'هیات'],
    ['خانهٔ', 'خانۀ', 'خانه'],
    ['GPU ۲۰۰', 'gpu٢٠٠', 'GPU200']
  ];
  for (const variants of groups) {
    const canonical = compactSearch(variants[0]);
    const records = [{ title: variants[0], href: 'title' }, { title: 'Other', body: variants[0], href: 'body' }];
    for (const variant of variants) {
      assert.equal(compactSearch(variant), canonical, variant);
      assert.deepEqual(hrefs(records, variant), ['title', 'body'], variant);
    }
  }
});
test('category, topic, summary and full-text matches are searchable with title ranked first', () => {
  const records = [
    { title: 'یک مقاله', body: 'بحث حکمرانی', href: 'body' },
    { title: 'عنوان متفاوت', category: 'حکمرانی داده', href: 'category' },
    { title: 'عنوان دیگر', tags: 'حکمرانی و سیاست‌گذاری', href: 'topic' },
    { title: 'حکمرانی', href: 'title' },
    { title: 'یادداشت', excerpt: 'درباره حکمرانی', href: 'excerpt' }
  ];
  assert.deepEqual(hrefs(records, 'حکمرانی'), ['title', 'category', 'topic', 'excerpt', 'body']);
});
test('spaces do not change matches or ranking, and field boundaries do not create words', () => {
  const records = [
    { title: 'هوش مصنوعی', href: 'title' },
    { title: 'Other', body: 'هوشمصنوعی', href: 'joined' },
    { title: 'حک', excerpt: 'مرانی', href: 'boundary' }
  ];
  assert.deepEqual(hrefs(records, 'هوشمصنوعی'), hrefs(records, 'هوش‌ مصنوعی'));
  assert.deepEqual(hrefs(records, 'حکمرانی'), []);
  assert.equal(searchItems(records, ' \u200c ').length, records.length);
  assert.deepEqual(hrefs([{ title: 'C++', href: 'cpp' }, { title: 'C#', href: 'csharp' }], 'C#'), ['csharp']);
});
test('real governance articles match through their full text and category/topic index', () => {
  const records = JSON.parse(readFileSync('static/search/fa.json', 'utf8')).filter(item => item.href.startsWith('/articles/'));
  const results = hrefs(records, 'حکمرانی');
  assert.ok(results.length > 1);
  assert.ok(records.some(item => results.includes(item.href) && !compactSearch(item.title + item.excerpt).includes('حکمرانی')), 'includes articles missed by title/summary search');
  for (const item of records.filter(item => compactSearch(item.tags ?? '').includes('حکمرانی'))) assert.ok(results.includes(item.href), item.href);
  for (const variant of ['حكمراني', 'حک مرانی', 'حک‌مرانی', 'حُکْمِرانی']) assert.deepEqual(hrefs(records, variant), results, variant);
});
