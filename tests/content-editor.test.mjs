import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync } from 'node:fs';
import ts from 'typescript';
import { compile } from 'mdsvex';

const code = ts.transpileModule(readFileSync('src/lib/content/editor.ts', 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 }
}).outputText;
const { articleMarkdown, retainArticleFrontmatter } = await import(`data:text/javascript;base64,${Buffer.from(code).toString('base64')}`);
const draft = { title: 'عنوان', slug: 'editor-test', lang: 'fa', date: '2026-11-03', faDate: '۱۲ آبان ۱۴۰۵', updated: '', faUpdated: '', category: 'یادداشت', excerpt: 'خلاصه', readTime: '۸ دقیقه', related: ['second', 'first'], external: '', draft: true, body: 'متن اولیه', retainedFrontmatter: '' };

test('saving uses the current form values, body and relative image references', async () => {
  const initial = articleMarkdown(draft);
  const changed = articleMarkdown({ ...draft, title: 'عنوان تازه', lang: 'en', body: 'متن تازه\n\n![عکس](./images/photo.webp)' });
  assert.notEqual(initial, changed);
  const result = await compile(changed);
  assert.equal(result.data.fm.title, 'عنوان تازه');
  assert.equal(result.data.fm.lang, 'en');
  assert.deepEqual(result.data.fm.related, ['second', 'first']);
  assert.match(changed, /\.\/images\/photo.webp/);
  assert.doesNotMatch(changed, /متن اولیه/);
});

test('editing preserves guest authors, covers, tags, legacy anchors and permanent-draft metadata', async () => {
  const original = 'title: Old\nauthor: "نویسنده مهمان"\ncover: ./images/cover.webp\nmath: true\ntags:\n  - برچسب\nlegacyAnchors:\n  - stable-link\nrelated:\n  - previous\npublish: never\ndraft: true';
  const retainedFrontmatter = retainArticleFrontmatter(original);
  const result = await compile(articleMarkdown({ ...draft, retainedFrontmatter }));
  assert.equal(result.data.fm.author, 'نویسنده مهمان');
  assert.equal(result.data.fm.cover, './images/cover.webp');
  assert.deepEqual(result.data.fm.tags, ['برچسب']);
  assert.deepEqual(result.data.fm.legacyAnchors, ['stable-link']);
  assert.equal(result.data.fm.math, true);
  assert.equal(result.data.fm.publish, 'never');
  assert.equal(result.data.fm.draft, true);
  assert.deepEqual(result.data.fm.related, ['second', 'first']);
});
