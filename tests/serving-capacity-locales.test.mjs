import test, { after } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { createServer } from 'vite';
import { compile } from 'mdsvex';
const server = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' });
after(() => server.close());
const { servingCapacityCopy } = await server.ssrLoadModule('/src/lib/llm/serving-capacity-copy.ts');
const { capacityGpus } = await server.ssrLoadModule('/src/lib/llm/serving-capacity.ts');
const { hardwareText } = await server.ssrLoadModule('/src/lib/i18n/gpu.ts');
const { llmEditionSlugs, llmTopicSlug } = await server.ssrLoadModule('/src/lib/llm/edition-manifest.ts');
const stem = 'what-does-100-concurrent-users-mean-for-an-ai-assistant';
const fm = async slug => (await compile(await fs.readFile(`src/lib/content/articles/${slug}.md`, 'utf8'))).data.fm;

test('each calculator edition has complete UI/status copy and translated hardware, without Persian fallback', () => {
  for (const locale of ['fa', 'en', 'es']) {
    assert.deepEqual(Object.keys(servingCapacityCopy[locale]).sort(), Object.keys(servingCapacityCopy.fa).sort());
    assert.deepEqual(Object.keys(servingCapacityCopy[locale].status).sort(), Object.keys(servingCapacityCopy.fa.status).sort());
    assert.ok(servingCapacityCopy[locale].replicaNote.includes('{active}'));
    if (locale !== 'fa') {
      assert.doesNotMatch(JSON.stringify(servingCapacityCopy[locale]), /[\u0600-\u06ef]/u);
      for (const gpu of capacityGpus) {
        for (const field of ['model', 'formFactor', 'cooling', 'hostInterface']) {
          assert.doesNotMatch(hardwareText(gpu[field], locale), /[\u0600-\u06ef]/u, `${locale}/${gpu.id}/${field}`);
        }
      }
    }
  }
});

test('the guide’s manual reading manifest includes the active article in each language with the original date', async () => {
  for (const locale of ['fa', 'en', 'es']) {
    const slug = llmTopicSlug(stem, locale);
    assert.ok(slug);
    const list = llmEditionSlugs(locale);
    assert.equal(list.filter(item => item === slug).length, 1);
    const meta = await fm(slug);
    assert.equal(meta.lang, locale);
    assert.equal(meta.date, '2026-10-13');
    assert.equal(meta.translationGroup, 'concurrent-users-capacity');
    assert.equal(meta.draft, false);
    for (const related of meta.related) {
      const target = await fm(related);
      assert.equal(target.lang, locale);
      assert.equal(target.draft, false);
    }
  }
});

test('translated articles preserve reference calculations and route links to existing published editions', async () => {
  for (const locale of ['en', 'es']) {
    const source = await fs.readFile(`src/lib/content/articles/${stem}-${locale}.md`, 'utf8');
    assert.match(source, new RegExp(`locale="${locale}"`));
    for (const formula of ['\\boxed{\\bar I=4300}', '\\boxed{\\bar O=330}', 'm_{\\text{KV/token}}=131072', '\\lambda_{\\text{LLM}}=4']) {
      assert.ok(source.includes(formula), `${locale}: ${formula}`);
    }
    assert.ok(source.includes(locale === 'en' ? '**71.25 GiB**' : '**71,25 GiB**'));
    for (const match of source.matchAll(/\]\(\/(en|es)\/articles\/([^/]+)\//g)) {
      assert.equal(match[1], locale);
      const meta = await fm(match[2]);
      assert.equal(meta.lang, locale);
      assert.equal(meta.draft, false);
    }
  }
});
