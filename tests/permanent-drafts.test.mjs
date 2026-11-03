import assert from 'node:assert/strict';
import { test } from 'node:test';
import { applyPermanentDraftPolicy, isPublished } from '../src/lib/publication.mjs';

test('permanent draft cannot become published through frontmatter changes', () => {
  for (const draft of [true, false, undefined]) {
    const source = { slug: 'kazan-investment-reality', date: '2026-11-03', draft, status: 'published' };
    const metadata = applyPermanentDraftPolicy(source);
    assert.equal(metadata.draft, true);
    assert.equal(isPublished(source, '2099-01-01'), false);
    assert.equal(isPublished(metadata, '2099-01-01'), false);
    assert.equal(source.draft, draft);
  }
});

test('normal articles keep their editorial publication state', () => {
  const source = { slug: 'another-article', date: '2026-11-03', draft: false };
  assert.equal(applyPermanentDraftPolicy(source), source);
  assert.equal(isPublished(source, '2026-11-03'), true);
  assert.equal(isPublished({ ...source, draft: true }, '2026-11-03'), false);
});
