import test from 'node:test';
import assert from 'node:assert/strict';
import { allocateShortLinks, resolveShortLink, shortLinkFor, shortLinkInitials } from '../src/lib/short-links.mjs';

const target = '/guides/gpu-selection/#int8-or-fp8-real-gpu-support';
test('codes use the first letter of every path and fragment word', () => {
  assert.equal(shortLinkInitials(target), 'ggsiofrgs');
  assert.equal(shortLinkInitials('/articles/gpu-inference-latency-throughput/'), 'agilt');
});
test('collisions never overwrite or reassign an existing or retired code', () => {
  const first = allocateShortLinks(['/articles/alpha-beta/']);
  const second = allocateShortLinks(['/articles/another-book/'], first.reservations);
  assert.equal(second.active.aab2, '/articles/another-book/');
  assert.equal(second.active.aab, undefined);
  const restored = allocateShortLinks(['/articles/alpha-beta/', '/articles/another-book/'], second.reservations);
  assert.equal(restored.active.aab, '/articles/alpha-beta/');
  assert.equal(restored.active.aab2, '/articles/another-book/');
});
test('resolver accepts one registered code and preserves the exact fragment', () => {
  const registry = allocateShortLinks([target]).active;
  assert.equal(resolveShortLink('?t=ggsiofrgs', registry), target);
  assert.equal(resolveShortLink('?utm_source=test&t=ggsiofrgs', registry), target);
  for (const query of ['?t=missing', '?t=', '?t=ggsiofrgs&t=ggsiofrgs', '?t=constructor', '?t=https://evil.example', '?t=GGsiofrgs']) assert.equal(resolveShortLink(query, registry), undefined);
  assert.equal(shortLinkFor('https://ziabary.ir' + target, registry), 'https://ziabary.ir/?t=ggsiofrgs');
});
test('unregistered anchors retain the full link and external destinations are rejected', () => {
  const registry = allocateShortLinks([target]).active;
  const url = 'https://ziabary.ir/guides/gpu-selection/#unregistered';
  assert.equal(shortLinkFor(url, registry), url);
  for (const destination of ['https://evil.example/', '//evil.example/', '/\\evil.example/', '/articles/a/?t=loop', '/articles/../', '/articles/a']) assert.throws(() => allocateShortLinks([destination]));
});
