import test from 'node:test';
import assert from 'node:assert/strict';
import { runInNewContext } from 'node:vm';
import { renderShortLinkBootstrap } from '../src/lib/server/short-link-bootstrap.mjs';

const target = '/guides/gpu-selection/#int8-or-fp8-real-gpu-support';
const registry = { ggsiofrgs: target };
function execute(search, pathname = '/') {
  const attributes = new Map();
  const head = [];
  const body = [];
  const listeners = new Map();
  const navigations = [];
  const canonical = { setAttribute: (name, value) => { canonical[name] = value; } };
  const element = () => ({
    setAttribute(name, value) { this[name] = value; },
    append(...children) { this.children = children; }
  });
  const document = {
    readyState: 'loading', body: null,
    documentElement: { setAttribute: (name, value) => attributes.set(name, value) },
    head: { appendChild: node => head.push(node) },
    createElement: element,
    addEventListener: (event, callback) => listeners.set(event, callback),
    querySelectorAll: () => [canonical]
  };
  runInNewContext(renderShortLinkBootstrap(registry).replace(/^<script[^>]*>|<\/script>$/g, ''), {
    document, URLSearchParams, URL,
    location: { search, pathname, origin: 'https://ziabary.ir', replace: path => navigations.push(path) }
    // No fetch, timers, modules, body or load event is available.
  });
  const loadBody = () => {
    document.body = { prepend: node => body.unshift(node) };
    listeners.get('DOMContentLoaded')?.();
  };
  return { attributes, head, body, listeners, navigations, canonical, loadBody };
}

test('redirect begins before the body exists, without a network request or load event', () => {
  const page = execute('?utm_source=review&t=ggsiofrgs');
  assert.deepEqual(page.navigations, [target]);
  assert.equal(page.attributes.get('data-short-link'), 'redirecting');
  assert.match(page.head[0].textContent, /display: none !important/);
  page.loadBody();
  assert.equal(page.body[0].children[1].href, target);
  assert.equal(page.canonical.href, 'https://ziabary.ir/guides/gpu-selection/');
});

test('normal home and other paths receive no hiding, notices or navigation', () => {
  for (const [search, path] of [['', '/'], ['?utm_source=review', '/'], ['?t=ggsiofrgs', '/en/'], ['?t=ggsiofrgs', '/articles/']]) {
    const page = execute(search, path);
    assert.deepEqual(page.navigations, []);
    assert.equal(page.head.length, 0);
    assert.equal(page.attributes.size, 0);
    assert.equal(page.listeners.size, 0);
  }
});

test('unknown, empty, duplicate and malicious codes show an accessible error and noindex', () => {
  for (const query of ['?t=missing', '?t=', '?t=ggsiofrgs&t=ggsiofrgs', '?t=constructor', '?t=__proto__', '?t=https://evil.example', '?t=GGsiofrgs']) {
    const page = execute(query);
    assert.deepEqual(page.navigations, []);
    assert.equal(page.attributes.get('data-short-link'), 'invalid');
    assert.equal(page.head.find(node => node.name === 'robots').content, 'noindex, follow');
    page.loadBody();
    assert.equal(page.body[0].role, 'alert');
    assert.equal(page.body[0].children[1].href, '/');
  }
});

test('the inline registry cannot close the script element or add an external destination', () => {
  const injected = '/articles/example/#</script><script>alert(1)</script>';
  const html = renderShortLinkBootstrap({ safe: new URL(injected, 'https://ziabary.ir').pathname + new URL(injected, 'https://ziabary.ir').hash });
  assert.equal((html.match(/<\/script>/g) || []).length, 1);
  for (const unsafe of [injected, '//evil.example/', '/\\evil.example/', '/?t=loop']) {
    assert.throws(() => renderShortLinkBootstrap({ bad: unsafe }));
  }
});
