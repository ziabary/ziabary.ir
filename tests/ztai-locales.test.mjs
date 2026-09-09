import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { compile } from 'mdsvex';
import ts from 'typescript';

const root = new URL('../', import.meta.url);
const read = name => readFile(new URL(name, root), 'utf8');
const slugs = ['from-zero-trust-to-zero-trust-ai', 'mlops-foundation-of-zero-trust-ai', 'zero-trust-ai-maturity-model', 'zero-trust-ai-principles-and-controls', 'ztai-indirect-data-access'];
const metadata = {};
for (const locale of ['en', 'es']) for (const slug of slugs) {
  const { data: { fm } } = await compile(await read(`src/lib/content/articles/${slug}-${locale}.md`));
  metadata[fm.slug] = fm;
}
const source = await read('src/lib/localized-guide-collections.ts');
async function collectionsFor(records) {
  const js = ts.transpileModule(source.replace("import { getArticle } from '$lib/content';", `const records = ${JSON.stringify(records)}; const getArticle = slug => records[slug]?.draft ? undefined : records[slug];`), { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
  return import(`data:text/javascript;base64,${Buffer.from(js).toString('base64')}`);
}

for (const locale of ['en', 'es']) {
test(`${locale} ZTAI has five published articles in manual reading order`, async () => {
  const { getLocalizedGuideCollection, getLocalizedGuideCollections } = await collectionsFor(metadata);
  const collection = getLocalizedGuideCollection(locale, 'zero-trust-ai');
  assert.deepEqual(collection.items.map(item => item.id), slugs.map(slug => `${slug}-${locale}`));
  for (const item of collection.items) {
    assert.equal(item.href, `/${locale}/articles/${item.id}/`);
    assert.equal(metadata[item.id].draft, false);
    assert.equal(metadata[item.id].lang, locale);
  }
});

test('missing, draft or wrong-language articles cannot expose a collection link or count', async () => {
  const altered = structuredClone(metadata);
  delete altered[`${slugs[0]}-${locale}`];
  altered[`${slugs[1]}-${locale}`].draft = true;
  altered[`${slugs[2]}-${locale}`].lang = 'fa';
  const partial = await collectionsFor(altered);
  assert.deepEqual(partial.getLocalizedGuideCollection(locale, 'zero-trust-ai').items.map(item => item.id), slugs.slice(3).map(slug => `${slug}-${locale}`));
  const empty = await collectionsFor({});
  assert.deepEqual(empty.getLocalizedGuideCollections(locale), []);
});

test('translated articles retain local figures, valid internal destinations and original external references', async () => {
  for (const slug of slugs) {
    const original = await read(`src/lib/content/articles/${slug}.md`);
    const translated = await read(`src/lib/content/articles/${slug}-${locale}.md`);
    const originalMeta = (await compile(original)).data.fm;
    assert.equal(String(metadata[`${slug}-${locale}`].date), String(originalMeta.date), `${slug}: retain original publication date`);
    assert.doesNotMatch(translated, /[\u0600-\u06ff]/u, slug);
    assert.doesNotMatch(translated, /\b(?:Iran(?:ian)?|Irán|iraní(?:es)?)\b/i, slug);
    for (const related of metadata[`${slug}-${locale}`].related) assert.ok(metadata[related], related);
    for (const match of translated.matchAll(/\]\(\/((?:en|es)\/)?articles\/([^/]+)\/\)/g)) {
      const target = await read(`src/lib/content/articles/${match[2]}.md`);
      const { data: { fm } } = await compile(target);
      assert.ok(!fm.draft, match[2]);
      assert.equal(fm.lang, match[1] ? locale : 'fa');
    }
    for (const match of translated.matchAll(/(?:cover: "|src=")(\/images\/[^"\s]+)/g)) {
      const asset = await readFile(new URL(`static${match[1]}`, root));
      if (match[1].endsWith('.svg')) assert.doesNotMatch(asset.toString(), /[\u0600-\u06ff]/u);
    }
    for (const match of original.matchAll(/https?:\/\/[^\s)"<>]+/g)) assert.ok(translated.includes(match[0]), match[0]);
    const originalImages = [...original.matchAll(/src="([^"\s]+)"/g)].map(match => match[1].replace(/-fa\.svg$/, `-${locale}.svg`));
    for (const image of originalImages) assert.ok(translated.includes(image), image);
  }
});

}

test('Spanish retains English references, figures and editorial relationships', async () => {
  for (const slug of slugs) {
    const en = await read(`src/lib/content/articles/${slug}-en.md`);
    const es = await read(`src/lib/content/articles/${slug}-es.md`);
    assert.deepEqual(metadata[`${slug}-es`].related, metadata[`${slug}-en`].related.map(id => id.replace(/-en$/, '-es')));
    const urls = text => [...text.matchAll(/https?:\/\/[^\s)"<>]+/g)].map(match => match[0]).sort();
    assert.deepEqual(urls(es), urls(en), slug);
    const images = text => [...text.matchAll(/src="([^"\s]+)"/g)].map(match => match[1].replace(/-en\.svg$/, '-es.svg'));
    assert.deepEqual(images(es), images(en), slug);
  }
});
