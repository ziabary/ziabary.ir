import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { loadLlmModules } from './helpers/llm-modules.mjs';

const read = file => JSON.parse(fs.readFileSync(file, 'utf8'));
const source = read('data/llm/v0.3.0/repository.json');
const modules = await loadLlmModules();
const answers = { task:'coding', codingMode:'assistant', sourceLanguage:'en', outputLanguage:'en',
  deployment:'self', hardware:'gpu', vram:'24', gpuName:'RTX 4090', upgrade:'existing', audience:'personal',
  inputTokens:'512', outputTokens:'128', concurrency:'1', loadDefinition:'active', mode:'interactive', licenseUse:'research' };
function edition(locale) {
  const i18n = modules['i18n/runtime'].createLlmI18n(locale, read(`data/llm/locales/messages.${locale}.json`),
    modules['i18n/runtime'].resolveRecordTranslations(read(`data/llm/locales/records.${locale}.json`)));
  return { i18n, repo:modules['i18n/runtime'].localizeLlmRepository(source, i18n),
    adapters:modules.adapters.createLlmAdapters(i18n), views:modules.views.createLlmViews(i18n),
    filters:modules.filtering.createLlmFiltering(i18n) };
}

test('software version filtering preserves historical Clef limits and exposes the stable image route in all editions', () => {
  for (const locale of ['fa','en','es']) {
    const {repo, adapters, views, filters, i18n} = edition(locale);
    const rows = adapters.buildLlmViewRows(repo)['software-products'];
    const config = views.llmViewConfigs.find(view => view.id === 'software-products');
    const selected = filters.filterLlmRows(rows, config.filters, {'software-product':['llama-cpp'],'software-version':'v0.6.0'}, '');
    assert.deepEqual(selected.map(row=>row.id), ['software-release:llama-cpp-v0-6-0']);
    assert.equal(repo.softwareReleases.find(row=>row.id===selected[0].id).releaseChannel, 'stable');
    assert.equal(repo.softwareReleases.find(row=>row.id==='software-release:llama-cpp-b11424').releaseChannel, 'prerelease');
    assert.match(repo.softwareReleases.find(row=>row.id==='software-release:llama-cpp-b11371').selectionCaveat, /v0\.6\.0/);
    for (const id of ['model:cloudflare-clef','model:cloudflare-clef-flash']) {
      const profile = repo.modelProfiles.find(row=>row.modelVersionId===id);
      assert.ok(profile.runGuides.some(guide=>guide.engine==='llama.cpp' && /v0\.6\.0/.test(guide.label)));
      assert.ok(profile.runGuides.some(guide=>guide.engine==='Ollama'));
      const route=modules['research-views'].createLlmResearchViews(i18n).compatibilityRows(repo)
        .find(row=>row.id===`route:${id}:llama.cpp`);
      assert.match(route.cells.engine.display,/v0\.6\.0/);
      assert.equal(route.facets.task.display,'classification');
      if (locale!=='fa') assert.doesNotMatch(JSON.stringify(profile), /[\u0600-\u06ff]/);
    }
    if (locale!=='fa') assert.doesNotMatch(JSON.stringify(selected), /[\u0600-\u06ff]/);
  }
});

test('Beam is an announcement with no effective Apache license or ready local recommendation', () => {
  for (const locale of ['fa','en','es']) {
    const {repo, adapters, views, filters} = edition(locale);
    const model = repo.models.find(row=>row.id==='model:reflection-beam');
    assert.equal(model.releaseStatus, 'announced');
    assert.equal(model.announcedOn, '2026-10-05');
    assert.equal(model.releasedOn, undefined);
    assert.equal(model.license.name.state, 'unknown');
    assert.equal(model.license.commercialUse.state, 'unknown');
    assert.match(model.license.name.note, /Apache-2\.0/);
    assert.equal(repo.modelProfiles.find(row=>row.modelVersionId===model.id).runGuides.length, 0);
    for (const collection of ['artifacts','artifactListings','executionFeasibility','benchmarkRuns'])
      assert.ok(!repo[collection].some(row=>row.modelVersionId===model.id));
    const rows=adapters.buildLlmViewRows(repo)['model-catalog'];
    const config=views.llmViewConfigs.find(view=>view.id==='model-catalog');
    assert.ok(filters.filterLlmRows(rows,config.filters,{'review-status':['announced']},'').some(row=>row.id===model.id));
    assert.ok(!filters.filterLlmRows(rows,config.filters,{'review-status':['available']},'').some(row=>row.id===model.id));
    assert.ok(!filters.filterLlmRows(rows,config.filters,{'license':'Apache-2.0'},'').some(row=>row.id===model.id));
    for (const vram of ['24','48']) {
      const input={...answers,vram};
      const review=modules.wizard.assessWizardCatalog(repo,input,locale).find(row=>row.model.id===model.id);
      assert.equal(review.status,'excluded');
      assert.equal(review.memory,undefined);
      assert.ok(!modules.wizard.wizardCandidates(repo,input,locale).some(row=>row.model.id===model.id));
    }
    if(locale!=='fa') assert.doesNotMatch(JSON.stringify([model,repo.modelProfiles.find(row=>row.modelVersionId===model.id)]),/[\u0600-\u06ff]/);
  }
});

test('GPU llama.cpp recommendations carry a conditional Vulkan fix warning, with no warning for CPU or API-only plans', () => {
  for (const locale of ['fa','en','es']) {
    const {repo}=edition(locale);
    const result=modules.wizard.buildWizardResult(repo,answers,locale);
    assert.ok(result.candidates.some(row=>row.runtime==='llama.cpp'));
    const warning=result.decisions.find(row=>row.id==='llama-vulkan-flash-attention-bounds');
    assert.ok(warning);
    assert.match(warning.conclusion,/b11424/);
    assert.match(warning.conclusion,/v0\.6\.0/);
    assert.match(warning.conclusion,/#29988/);
    assert.ok(warning.evidenceIds.includes('https://github.com/ggml-org/llama.cpp/pull/29988'));
    for(const input of [{...answers,hardware:'cpu',ram:'48'},{...answers,deployment:'api'}])
      assert.ok(!modules.wizard.buildWizardResult(repo,input,locale).decisions.some(row=>row.id===warning.id));
  }
});
