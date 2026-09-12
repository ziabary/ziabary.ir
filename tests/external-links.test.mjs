import test from 'node:test';
import assert from 'node:assert/strict';
import { compile } from 'mdsvex';
import markdownLinks from '../scripts/markdown-links.mjs';
import { externalLinkAttributes, externalLinksHtml } from '../src/lib/external-links.mjs';

test('external HTTP, HTTPS and protocol-relative links use a new tab; site links and mail keep their behavior', () => {
  for (const href of ['https://example.com/', 'http://example.com/', '//example.com/', 'https://ziabary.ir.example.com/']) {
    assert.equal(externalLinkAttributes(href).target, '_blank');
  }
  for (const href of ['/articles/', '#section', '../resume/', 'https://ziabary.ir/articles/', 'https://www.ziabary.ir/', 'mailto:editor@example.com', 'tel:+1234567', 'blob:example', 'https://[invalid']) {
    assert.deepEqual(externalLinkAttributes(href), {}, href);
  }
});

test('literal HTML keeps attributes, link destinations and rel metadata while replacing existing targets', () => {
  const html = `<a class="source" href='https://example.org/?a=1&amp;b=2' title="a > b; target='_self'" target='_self' rel='nofollow sponsored'>Source</a>`;
  const result = externalLinksHtml(html);
  assert.ok(result.includes(`href='https://example.org/?a=1&amp;b=2'`));
  assert.ok(result.includes(`title="a > b; target='_self'"`));
  assert.ok(result.includes('target="_blank" rel="nofollow sponsored noopener noreferrer"'));
  assert.equal(externalLinksHtml(result), result);
  assert.match(externalLinksHtml('<A HREF=//example.org REL=nofollow>Source</A>'), /target="_blank" rel="nofollow noopener noreferrer"/);
  const internal = '<a href="/articles/" rel="next">Next</a><code>&lt;a href="https://example.com"&gt;</code>';
  assert.equal(externalLinksHtml(internal), internal);
});

test('the real Markdown pipeline covers inline links, references, autolinks and raw HTML, but leaves code alone', async () => {
  const source = '[Inline](https://example.com)\n\n[Reference][ref]\n\n[ref]: https://example.org\n\n<https://example.net>\n\n<figure><figcaption><a href="https://example.edu">Source</a></figcaption></figure>\n\n[Internal](/articles/)\n\n```html\n<a href="https://example.com">Sample</a>\n```';
  const { code } = await compile(source, { rehypePlugins: [markdownLinks] });
  assert.equal([...code.matchAll(/target="_blank"/g)].length, 4);
  assert.match(code, /href="\/articles\/"[^>]*>Internal<\/a>/);
  assert.doesNotMatch(code.match(/<pre[\s\S]*?<\/pre>/)?.[0] ?? '', /target="_blank"/);
});
