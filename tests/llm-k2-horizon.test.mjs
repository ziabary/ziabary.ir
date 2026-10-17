import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { loadLlmModules } from './helpers/llm-modules.mjs';

const read = path => JSON.parse(fs.readFileSync(path, 'utf8'));
const data = read('data/llm/v0.3.0/repository.json');
const m = await loadLlmModules();
const input = { task:'coding', codingMode:'assistant', sourceLanguage:'en', outputLanguage:'en',
  deployment:'self', hardware:'gpu', vram:'24', gpuName:'RTX 4090', upgrade:'existing', audience:'personal',
  inputTokens:'512', outputTokens:'128', concurrency:'1', loadDefinition:'active', mode:'interactive', licenseUse:'research' };
function edition(locale) {
  const i18n = m['i18n/runtime'].createLlmI18n(locale, read(`data/llm/locales/messages.${locale}.json`),
    m['i18n/runtime'].resolveRecordTranslations(read(`data/llm/locales/records.${locale}.json`)));
  const repo = m['i18n/runtime'].localizeLlmRepository(data, i18n);
  return { repo, research:m.research.createLlmResearch(i18n),
    views:m.views.createLlmViews(i18n), adapters:m.adapters.createLlmAdapters(i18n),
    filters:m.filtering.createLlmFiltering(i18n), researchViews:m['research-views'].createLlmResearchViews(i18n) };
}

test('five K2 models appear in family, format and engine filters across all editions', () => {
  assert.equal(data.models.length, 141);
  for (const locale of ['fa','en','es']) {
    const { repo, views, adapters, filters } = edition(locale);
    const models = repo.models.filter(model => model.familyId === 'family:k2-horizon');
    assert.equal(models.length, 5);
    assert.ok(!models.some(model => /375B/.test(model.exactName)));
    const rows = adapters.buildLlmViewRows(repo)['model-catalog'];
    const config = views.llmViewConfigs.find(view => view.id === 'model-catalog');
    assert.ok(config.filters.find(filter => filter.id === 'family').options.some(option => option.value === 'K2 Horizon'));
    for (const format of ['gguf','safetensors'])
      assert.equal(filters.filterLlmRows(rows, config.filters, {family:['K2 Horizon'],'download-format':[format]}, '').length, 5);
    for (const engine of ['llama.cpp','vLLM','SGLang','Ollama'])
      assert.equal(filters.filterLlmRows(rows, config.filters, {family:['K2 Horizon'],'run-engine':[engine]}, '').length, 5);
    for (const model of models) {
      assert.equal(model.releasedOn, '2026-09-03');
      assert.equal(model.license.name.value, 'Apache-2.0');
      assert.equal(model.persianEvidenceStatus, 'not-evaluated');
      assert.equal(model.evaluatedContext.state, 'not-measured');
      assert.ok(!repo.publishedEvaluations.some(result => result.modelVersionId === model.id));
      if (locale !== 'fa') assert.doesNotMatch(JSON.stringify([model,
        repo.modelProfiles.find(profile => profile.modelVersionId === model.id)]), /[\u0600-\u06ff]/);
    }
    const release = repo.softwareReleases.find(release => release.id === 'software-release:llama-cpp-b11454');
    const mova = models.find(model => model.exactName === 'K2-Horizon-MoVA-36B-A4B');
    assert.equal(mova.totalParametersB.value, 36);
    assert.equal(mova.activeParametersB.value, 4);
    assert.ok(mova.parameterCounts[0].value.value > mova.totalParametersB.value);
    const enriched = edition(locale).research.enrichResearchRepository(repo);
    assert.ok(enriched.artifactListings.filter(artifact => artifact.modelVersionId.startsWith('model:ifm-k2-horizon-'))
      .every(artifact => artifact.verifiedOn === '2026-10-07'));
    assert.equal(release.releaseChannel, 'prerelease');
    assert.equal(release.releasedOn, '2026-10-06');
    const software = adapters.buildLlmViewRows(repo)['software-products'];
    const softwareConfig = views.llmViewConfigs.find(view => view.id === 'software-products');
    assert.deepEqual(filters.filterLlmRows(software, softwareConfig.filters,
      {'software-product':['llama-cpp'],'software-version':'b11454'}, '').map(row => row.id), [release.id]);
  }
});

test('official bytes, FP16 KV cache and reserve stay separate; long contexts can exceed 24/48 GB', () => {
  const { research } = edition('en');
  const artifact = research.research.artifacts.find(artifact => artifact.modelRepository === 'IFM/K2-Horizon-32B');
  assert.equal(artifact.weightFileBytes, 21075778656);
  const plan = research.calculateMemory(artifact, 4096, 1);
  assert.equal(plan.weightGiB, 21075778656 / 2**30);
  assert.equal(plan.kvGiB, 1);
  assert.equal(plan.reserveGiB, 2);
  assert.equal(plan.budgetGiB, plan.weightGiB + plan.kvGiB + plan.reserveGiB);
  assert.ok(plan.budgetGiB < 24);
  assert.ok(research.calculateMemory(artifact, 32768, 1).budgetGiB > 24);
  assert.ok(research.calculateMemory(artifact, 524288, 1).budgetGiB > 48);
  assert.equal(research.calculateMemory(artifact, 4096, 1, 2), undefined);
  const small = research.research.artifacts.find(artifact => artifact.modelRepository === 'IFM/K2-Horizon-7B');
  assert.equal(small.weightFileBytes, 5592217984);
  assert.ok(research.calculateMemory(small, 4096, 1).budgetGiB < 24);
  const mova = research.research.artifacts.find(artifact => artifact.modelRepository === 'IFM/K2-Horizon-MoVA-36B-A4B');
  assert.equal(research.calculateMemory(mova, 4096, 1).kvGiB, .75);
  const low = research.research.artifacts.find(artifact => artifact.modelRepository === 'IFM/K2-Horizon-0.9B');
  assert.equal(research.calculateMemory(low, 131073, 1), undefined);
});

test('wizard keeps 32B conditional and rejects loads beyond capacity; multi-GPU matrix stays unknown', () => {
  for (const locale of ['fa','en','es']) {
    const { repo, research, researchViews } = edition(locale);
    const estimate = (model, answers) => m.wizard.wizardMemory(model, answers, research.research.artifacts, research.calculateMemory);
    for (const vram of ['24','48']) {
      const review = m.wizard.assessWizardCatalog(repo, {...input,vram}, locale, estimate)
        .find(review => review.model.id === 'model:ifm-k2-horizon-32b');
      assert.equal(review.status, 'conditional');
      assert.equal(review.runtime, 'llama.cpp');
      assert.ok(review.memory);
      assert.match(review.reasons.join(' '), /b11454/);
      assert.match(review.reasons.join(' '), /-sm tensor/);
      assert.match(review.reasons.join(' '), vram === '24' ? /۲۴|24/ : /۴۸|48/);
    }
    const large = m.wizard.assessWizardCatalog(repo, {...input,inputTokens:'32768'}, locale, estimate)
      .find(review => review.model.id === 'model:ifm-k2-horizon-32b');
    assert.equal(large.status, 'excluded');
    const rows = researchViews.memoryRows(repo, {...researchViews.defaultResearchControls,context:4096,active:1,
      method:'gpu',hardwareIds:research.research.hardware.map(device => device.id)});
    const row = rows.find(row => row.title === 'K2-Horizon-32B' || row.id.includes('ifm-k2-horizon-32b'));
    assert.ok(row);
    for (const device of research.research.hardware.filter(device => device.gpuCount > 1))
      assert.equal(row.matrixCells[device.id].state, 'unknown');
    assert.equal(researchViews.weightFootprintRows(repo, {...researchViews.defaultResearchControls,hardwareIds:[]})
      .filter(row => row.id.includes('ifm-k2-horizon-')).length, 10);
  }
});
