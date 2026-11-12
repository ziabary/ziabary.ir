import test from 'node:test';
import assert from 'node:assert/strict';
import { createServer, request } from 'node:http';
import requestNormalization, { normalizedRequestTarget, normalizeRequest } from '../scripts/normalize-request.mjs';

test('collapses path slashes in one redirect, preserving query bytes and fragments', () => {
  const cases = [
    ['//guides/enterprise-ai-governance/?show-drafts=true', '/guides/enterprise-ai-governance/?show-drafts=true'],
    ['///en//articles///example//?a=1&a=2#heading', '/en/articles/example/?a=1&a=2#heading'],
    ['//es/guides/?next=https://example.org//a&value=%2f+%20', '/es/guides/?next=https://example.org//a&value=%2f+%20'],
    ['///?t=ggsiofrgs', '/?t=ggsiofrgs'],
    ['/images//%D8%B9%DA%A9%D8%B3%2Fname.webp?', '/images/%D8%B9%DA%A9%D8%B3%2Fname.webp?']
  ];
  for (const [input, expected] of cases) {
    assert.equal(normalizedRequestTarget(input), expected);
    assert.equal(normalizedRequestTarget(expected), null, 'redirect must not loop');
    assert.equal(new URL(expected, 'https://ziabary.ir').origin, 'https://ziabary.ir');
  }
});

test('canonical paths and slashes in query values never redirect', () => {
  for (const path of ['/', '/en/', '/s/ggsiofrgs/', '/guides/?next=https://example.org//a', '/articles/a%2F%2Fb/']) {
    assert.equal(normalizedRequestTarget(path), null);
  }
});

test('rejects unsafe redirect targets and does not interpret a leading // as an authority', () => {
  for (const path of ['https://evil.example//a', '*', '//\\evil.example/', '//a\r\nLocation: https://evil.example', '//a b/']) {
    assert.equal(normalizedRequestTarget(path), null);
  }
  assert.equal(normalizedRequestTarget('//evil.example///a'), '/evil.example/a');
});

test('development and Vite preview register the same early middleware', () => {
  const plugin = requestNormalization();
  for (const hook of ['configureServer', 'configurePreviewServer']) {
    const registered = [];
    plugin[hook]({ middlewares: { use: handler => registered.push(handler) } });
    assert.deepEqual(registered, [normalizeRequest]);
  }
});

test('HTTP redirect precedes routing and preserves GET, HEAD and POST targets', async () => {
  const server = createServer((req, res) => normalizeRequest(req, res, () => res.writeHead(404).end()));
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const send = (method, path) => new Promise((resolve, reject) => {
    const req = request({ host: '127.0.0.1', port: server.address().port, method, path }, res => {
      res.resume();
      res.on('end', () => resolve({ status: res.statusCode, location: res.headers.location }));
    });
    req.on('error', reject);
    req.end();
  });
  try {
    for (const method of ['GET', 'HEAD', 'POST']) {
      assert.deepEqual(await send(method, '//guides//enterprise-ai-governance/?show-drafts=true'), {
        status: 308, location: '/guides/enterprise-ai-governance/?show-drafts=true'
      });
    }
    assert.deepEqual(await send('GET', '/missing/?next=https://example.org//a'), { status: 404, location: undefined });
  } finally { await new Promise(resolve => server.close(resolve)); }
});
