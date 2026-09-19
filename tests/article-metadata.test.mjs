import test from 'node:test';
import assert from 'node:assert/strict';
import metadataPlugin, { readArticleMetadata } from '../scripts/article-metadata-plugin.mjs';

test('metadata-only modules retain publication data and stable heading IDs without article prose', async () => {
  const source = `---\ntitle: Example\nslug: example\nlang: en\ndate: '2026-06-18'\ndraft: true\nmath: true\nrelated: [earlier]\n---\n## Repeated title\nPrivate draft body, loaded only with the article.\n## Repeated title\n### Explicit title {#stable}\n<span id="legacy"></span>\n`;
  const result = await readArticleMetadata(source);
  assert.equal(result.date, '2026-06-18');assert.equal(result.draft,true);assert.deepEqual(result.related,['earlier']);
  assert.deepEqual(result.headings.map(x=>x.id),['repeated-title','repeated-title-2','stable']);
  assert.ok(result.legacyAnchors.includes('legacy'));
  assert.ok(!JSON.stringify(result).includes('Private draft body'));
});

test('virtual metadata resolution is distinct from the lazily loaded Markdown body and participates in HMR', async () => {
  const plugin=metadataPlugin();
  const context={resolve:async()=>({id:'/project/article.md'})};
  const id=await plugin.resolveId.call(context,'/project/article.md?article-metadata');
  assert.ok(id.startsWith('\0'));assert.ok(id.endsWith('.js'));
  assert.equal(await plugin.resolveId.call(context,'/project/article.md'),undefined);
  const meta={id};const body={id:'/project/article.md'};
  assert.deepEqual(plugin.handleHotUpdate({file:'/project/article.md',server:{moduleGraph:{getModuleById:x=>x===id?meta:undefined}},modules:[body]}),[body,meta]);
});
