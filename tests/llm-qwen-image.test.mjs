import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { loadLlmModules } from './helpers/llm-modules.mjs';
const m = await loadLlmModules();
const read = file => JSON.parse(fs.readFileSync(file, 'utf8'));
const canonical = read('data/llm/v0.3.0/repository.json');
const id = 'model:qwen-image-2-1';

test('image model is discoverable in all editions with component counts and commercial restriction', () => {
  for (const locale of ['fa', 'en', 'es']) {
    const i = m['i18n/runtime'].createLlmI18n(locale, read(`data/llm/locales/messages.${locale}.json`), m['i18n/runtime'].resolveRecordTranslations(read(`data/llm/locales/records.${locale}.json`)));
    const repo = m['i18n/runtime'].localizeLlmRepository(canonical, i);
    const rows = m.adapters.createLlmAdapters(i).buildLlmViewRows(repo)['model-catalog'];
    const config = m.views.createLlmViews(i).llmViewConfigs.find(view => view.id === 'model-catalog');
    const filtered = m.filtering.createLlmFiltering(i).filterLlmRows(rows, config.filters, {'model-kind':['image-generation']}, 'Qwen-Image-2.1');
    assert.deepEqual(filtered.map(row => row.id), [id]);
    const row = filtered[0];
    assert.equal(row.facets['commercial-use'].raw, 'restricted');
    assert.equal(row.facets['total-parameters'].state, 'unknown');
    assert.match(row.cells.parameters.display, /DiT/);
    assert.match(row.cells.parameters.display, /Qwen3-VL/);
    assert.ok(row.downloadLinks.some(link => link.href === 'https://huggingface.co/Qwen/Qwen-Image-2.1'));
    assert.ok(row.sourceIds.includes('evidence:qwen-image-2-1-license'));
    if (locale !== 'fa') assert.doesNotMatch(JSON.stringify([row.cells,row.details]), /[\u0600-\u06ff]/);
  }
});

test('download contains all three components; no 7B whole-model memory estimate or inherited benchmark', () => {
  const model = canonical.models.find(model => model.id === id);
  assert.deepEqual(model.outputModalities, ['image']);
  assert.equal(model.declaredContext.state, 'not-applicable');
  assert.equal(model.totalParametersB.state, 'unknown');
  assert.deepEqual(model.parameterCounts.map(count => count.value.value), [7, 8]);
  const listing = canonical.artifactListings.find(item => item.modelVersionId === id);
  assert.equal(listing.files.length, 7);
  assert.deepEqual([...new Set(listing.files.map(file => file.path.split('/')[0]))].sort(), ['text_encoder','transformer','vae']);
  assert.equal(listing.totalBytes, listing.files.reduce((sum, file) => sum + file.bytes, 0));
  assert.ok(listing.totalBytes / 2**30 > 30);
  assert.ok(!canonical.benchmarkRuns.some(run => run.modelVersionId === id));
  assert.ok(!canonical.publishedEvaluations.some(run => run.modelVersionId === id));
});

test('image generator is excluded from language and RAG recommendations even with a permissive license', () => {
  const repo = structuredClone(canonical);
  // Isolate task-role filtering from the separate commercial-license constraint.
  repo.models.find(model => model.id === id).license.commercialUse.value = 'allowed';
  for (const task of ['writing', 'documents']) {
    const reviews = m.wizard.assessWizardCatalog(repo, {task,sourceLanguage:'fa',outputLanguage:'fa',sources:'provided',format:'text',inputSize:'short',mode:'interactive',policy:'internal',deployment:'self',hardware:'none'}, 'fa');
    assert.equal(reviews.find(review => review.model.id === id)?.status, 'excluded');
  }
});
