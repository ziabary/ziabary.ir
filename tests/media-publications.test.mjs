import test from 'node:test';
import assert from 'node:assert/strict';
import { mediaPublications } from '../src/lib/media-publications.mjs';

const article = (overrides = {}) => ({
  slug: 'new-authored-note', title: 'New authored note', lang: 'fa',
  date: '2026-10-03', faDate: '۱۱ مهر ۱۴۰۵', category: 'امنیت',
  excerpt: 'Summary', readTime: '۵ دقیقه', related: [],
  external: 'https://publisher.example/note', source: 'Publisher',
  showInMedia: true, cover: '/own-cover.webp',
  mediaCover: '/publisher-cover.png', mediaCoverAlt: 'Publisher illustration',
  ...overrides
});
const coverage = (overrides = {}) => ({
  title: 'Interview', source: 'News', kind: 'گفت‌وگو', summary: 'Summary',
  url: 'https://news.example/interview', date: '2026-09-22', faDate: '۳۱ شهریور',
  coverImage: null, coverImageAlt: null, editorialNote: null, ...overrides
});

test('latest three include authored media and reports in publication order', () => {
  const reports = [coverage(), coverage({ date: '2026-10-05', title: 'Latest interview' })];
  const notes = [article(), article({ slug: 'second-note', date: '2026-10-01', updated: '2026-10-06' })];
  const feed = mediaPublications(notes, reports, '2026-10-06');
  assert.deepEqual(feed.slice(0, 3).map(item => item.date), ['2026-10-05', '2026-10-03', '2026-10-01']);
  assert.equal(feed[1].coverImage, '/publisher-cover.png');
  assert.equal(feed[1].coverImageAlt, 'Publisher illustration');
  assert.equal(feed[1].url, notes[0].external);
  assert.equal(feed[1].internalUrl, '/articles/new-authored-note/');
  assert.equal(reports[0].date, '2026-09-22');
});

test('exclude drafts, future publications, other editions and notes without media permission', () => {
  const notes = [
    article({ draft: true }), article({ status: 'planned' }),
    article({ date: '2026-10-07' }), article({ lang: 'en' }),
    article({ showInMedia: false }), article({ external: undefined })
  ];
  assert.deepEqual(mediaPublications(notes, [coverage({ date: '2026-10-07' })], '2026-10-06'), []);
});

test('use article cover and default source and kind when media overrides are absent', () => {
  const [item] = mediaPublications([article({ mediaCover: undefined, mediaCoverAlt: undefined, source: undefined })], [], '2026-10-06');
  assert.equal(item.coverImage, '/own-cover.webp');
  assert.equal(item.coverImageAlt, 'New authored note');
  assert.equal(item.kind, 'یادداشت');
  assert.equal(item.source, 'منبع اصلی');
});
