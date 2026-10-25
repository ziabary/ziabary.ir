import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {loadLlmModules} from './helpers/llm-modules.mjs';

const read = file => JSON.parse(fs.readFileSync(file, 'utf8'));
const canonical = read('data/llm/v0.3.0/repository.json');
const review = read('docs/content-reviews/tables-2026-10-24.json');
const modules = await loadLlmModules();
const boltId = 'model:nvidia-nemotron-3-5-bolt-e4b';
const rerankId = 'model:nvidia-nemotron-3-5-rerank-8b-bf16';
const decisions = review.modelsAdded.filter(id => id.startsWith('model:vllm-sr-'));

function edition(locale) {
  const i18n = modules['i18n/runtime'].createLlmI18n(locale, read(`data/llm/locales/messages.${locale}.json`),
    modules['i18n/runtime'].resolveRecordTranslations(read(`data/llm/locales/records.${locale}.json`)));
  const repo = modules.research.createLlmResearch(i18n).enrichResearchRepository(
    modules['i18n/runtime'].localizeLlmRepository(canonical, i18n));
  const researchViews = modules['research-views'].createLlmResearchViews(i18n);
  return {
    repo,
    compatibility: researchViews.compatibilityRows(repo),
    rows: researchViews.enrichExistingRows(repo,
      modules.adapters.createLlmAdapters(i18n).buildLlmViewRows(repo), 'all'),
    filtering: modules.filtering.createLlmFiltering(i18n),
    configs: modules.views.createLlmViews(i18n).llmViewConfigs
  };
}

test('download manifests distinguish targets, projectors, companions and rounded runtime packages', () => {
  const bolt = canonical.artifactListings.find(a => a.id === 'artifact-listing:nvidia-nemotron-3-5-bolt-e4b-q4-k-m');
  assert.equal(bolt.totalBytes, 6180446208);
  assert.equal(bolt.files.length, 1);
  assert.ok(!canonical.models.some(m => m.dependency?.targetModelId === boltId));
  for (const listing of canonical.artifactListings.filter(a => a.id.startsWith('artifact-listing:minicpm-v-4-7') && a.format === 'gguf')) {
    assert.equal(listing.files.filter(file => file.path.startsWith('mmproj-')).length, 1);
    assert.equal(listing.files.length, 2);
    assert.ok(listing.files.every(file => !file.path.startsWith('dspark-')));
    assert.equal(listing.totalBytes, listing.files.reduce((sum, file) => sum + file.bytes, 0));
  }
  for (const id of review.modelsAdded) {
    const model = canonical.models.find(m => m.id === id);
    assert.match(model.version, /^[0-9a-f]{40}$/);
    assert.ok(!canonical.artifacts.some(a => a.modelVersionId === id), 'file inventory must not invent a measured execution artifact');
  }
  for (const listing of canonical.artifactListings.filter(a => review.modelsAdded.includes(a.modelVersionId) && a.format === 'ollama')) {
    assert.equal(listing.totalBytes, undefined, 'rounded registry size is not exact bytes');
    assert.deepEqual(listing.files, []);
    assert.equal(listing.inventoryStatus, 'not-recorded');
  }
});

test('conflicting notices produce one local E4B, one API service and one latest Ollama', () => {
  assert.equal(canonical.models.filter(m => m.id === boltId).length, 1);
  const bolt = canonical.models.find(m => m.id === boltId);
  assert.deepEqual(bolt.inputModalities, ['text']);
  assert.equal(bolt.declaredContext.value, 65536);
  assert.equal(bolt.activeParametersB.state, 'not-applicable');
  assert.equal(bolt.parameterCounts.find(p => p.scope === 'effective').value.value, 4);
  const api = read('data/llm/api-models.json').filter(m => m.id === 'nvidia-nemotron-3.5-bolt-e4b');
  assert.equal(api.length, 1);
  assert.equal(api[0].catalogOnly, true);
  assert.equal(api[0].availability, 'prototype-free-endpoint');
  assert.equal(api[0].selfHosting, 'public-weights-available-separately');
  assert.ok(['fa', 'en', 'es'].every(locale => api[0].notes[locale].includes('66K')));
  const latest = canonical.softwareReleases.filter(r => r.productId === 'software-product:ollama' && r.isLatest);
  assert.deepEqual(latest.map(r => r.version), ['v0.40.10']);
  const small = canonical.models.find(m => m.id === 'model:minicpm-v-4-7-1b');
  assert.equal(small.totalParametersB.state, 'unknown');
  assert.equal(small.parameterCounts.find(p => p.scope === 'stored').value.value, 1.554476272);
  const reranker = canonical.models.find(m => m.id === rerankId);
  assert.equal(reranker.declaredContext.value, 32768);
  assert.equal(reranker.configurationContext.value, 262144);
  assert.equal(reranker.persianEvidenceStatus, 'publisher-claimed');
});

for (const locale of ['fa', 'en', 'es']) {
  test(`d3 remains a typed-decision candidate with no generative memory estimate (${locale})`, () => {
    const {repo} = edition(locale);
    const input = {task:'extraction', decisionTask:'classify', output:'fields', sourceLanguage:'en', outputLanguage:'en', sources:'provided', format:'text', deployment:'self', hardware:'gpu', gpuName:'NVIDIA H100', vram:'80', upgrade:'existing', inputTokens:'512', outputTokens:'16', concurrency:'1', loadDefinition:'active'};
    const assess = answers => modules.wizard.assessWizardCatalog(repo, answers, locale);
    const choices = assess(input);
    const freeText = assess({...input, task:'writing', writingTask:'summary', output:'short'});
    for (const id of decisions) {
      const choice = choices.find(row => row.model.id === id);
      assert.ok(choice, id);
      assert.notEqual(choice.status, 'excluded', id);
      assert.equal(choice.memoryStatus, 'unsupported');
      assert.equal(choice.memory, undefined);
      assert.equal(freeText.find(row => row.model.id === id).status, 'excluded');
    }
  });

  test(`new models and scoped releases render and filter without untranslated text (${locale})`, () => {
    const {rows, filtering, configs, compatibility} = edition(locale);
    for (const id of review.modelsAdded) {
      const row = rows['model-catalog'].find(row => row.modelId === id);
      assert.ok(row, id);
      assert.ok(row.downloadLinks.length, id);
      if (locale !== 'fa') assert.doesNotMatch(JSON.stringify([row.cells, row.details]), /[\u0600-\u06ff]/, id);
    }
    const rerank = rows['specialized-models'].find(row => row.modelId === rerankId);
    assert.ok(rerank, 'reranker must appear in the specialized table as well as the catalog');
    assert.notEqual(rerank.cells['quality-metric'].state, 'known');
    assert.equal(canonical.specializedAssessments.find(a => a.modelVersionId === rerankId).metricValue.state, 'not-measured');
    if (locale !== 'fa') assert.doesNotMatch(JSON.stringify([rerank.cells, rerank.details]), /[\u0600-\u06ff]/);
    const modelFilters = configs.find(config => config.id === 'model-catalog').filters;
    const ollama = filtering.filterLlmRows(rows['model-catalog'], modelFilters, {'run-engine': ['Ollama']}, 'vllm-sr/d3');
    assert.deepEqual(ollama.map(row => row.modelId).sort(), [...decisions].sort());
    const softwareFilters = configs.find(config => config.id === 'software-products').filters;
    for (const id of review.softwareReleasesAdded) {
      const release = canonical.softwareReleases.find(r => r.id === id);
      const filtered = filtering.filterLlmRows(rows['software-products'], softwareFilters, {'software-version': release.version}, '');
      assert.equal(filtered.length, 1, id);
      assert.equal(filtered[0].id, id);
      if (locale !== 'fa') assert.doesNotMatch(JSON.stringify([filtered[0].cells, filtered[0].details]), /[\u0600-\u06ff]/, id);
    }
    const routes = compatibility.filter(row => row.id.startsWith(`route:${rerankId}:`));
    assert.ok(routes.some(row => JSON.stringify(row).includes('/classify')));
    assert.ok(routes.every(row => !JSON.stringify(row).includes('b11778')));
    const hip = rows['software-products'].find(row => row.id === 'software-release:llama-cpp-b11847');
    assert.match(JSON.stringify([hip.cells, hip.details]), /gfx1151/);
    const dflash = rows['software-products'].find(row => row.id === 'software-release:llama-cpp-b11822');
    assert.match(JSON.stringify([dflash.cells, dflash.details]), /DFlash/);
  });
}
