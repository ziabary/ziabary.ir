import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {loadLlmModules} from './helpers/llm-modules.mjs';

const read = path => JSON.parse(fs.readFileSync(path, 'utf8'));
const canonical = read('data/llm/v0.3.0/repository.json');
const modules = await loadLlmModules();
const versions = ['b12171', 'b12180', 'b12182', 'b12191', 'b12192', 'b12195'];
const freshModels = ['model:bytedance-seed-cola2', 'model:kanana-2-v-decide-3b-2611', 'model:nemotron-3.5-parse', 'model:nemotron-3.5-parse-dflash2'];
const answers = {task:'writing', writingTask:'summary', sourceLanguage:'en', outputLanguage:'en', format:'text', policy:'internal', deployment:'self', hardware:'gpu', vram:'192', ram:'256', upgrade:'existing', inputTokens:'512', outputTokens:'128', concurrency:'1', loadDefinition:'active'};

function edition(locale) {
  const i = modules['i18n/runtime'].createLlmI18n(locale, read(`data/llm/locales/messages.${locale}.json`),
    modules['i18n/runtime'].resolveRecordTranslations(read(`data/llm/locales/records.${locale}.json`)));
  const repo = modules.research.createLlmResearch(i).enrichResearchRepository(
    modules['i18n/runtime'].localizeLlmRepository(canonical, i));
  const view = modules['research-views'].createLlmResearchViews(i);
  return {repo, rows:view.enrichExistingRows(repo, modules.adapters.createLlmAdapters(i).buildLlmViewRows(repo), 'all')};
}

test('runtime fixes remain prereleases and do not replace the stable runtime default', () => {
  for (const version of versions) {
    const source = read(`data/llm/sources/tables-2026-11-08/release-${version}.json`);
    const release = canonical.softwareReleases.find(x => x.version === version);
    assert.equal(release.releasedOn, source.published_at.slice(0, 10));
    assert.equal(source.prerelease, true);
    assert.equal(release.releaseChannel, 'prerelease');
    assert.equal(release.isLatest, false);
  }
  assert.ok(!canonical.benchmarkRuns.some(x => /b121(71|80|82|91|92|95)/.test(JSON.stringify(x))));
});

for (const locale of ['fa', 'en', 'es']) {
  test(`new records render through the real table adapters without untranslated copy (${locale})`, () => {
    const {repo, rows} = edition(locale);
    const selected = [...rows['model-catalog'].filter(x => freshModels.includes(x.id)),
      ...rows['software-products'].filter(x => versions.includes(x.cells['software-version']?.raw ?? x.cells['software-version']?.display))];
    for (const id of freshModels) assert.ok(rows['model-catalog'].some(x => x.id === id), id);
    for (const version of versions) {
      const row = rows['software-products'].find(x => x.id === `software-release:llama-cpp-${version}`);
      assert.ok(row); selected.push(row);
      assert.match(row.cells['software-version'].display, /Pre|pre|پیش/);
    }
    for (const id of freshModels) {
      const profile = repo.modelProfiles.find(x => x.modelVersionId === id);
      if (locale !== 'fa') assert.doesNotMatch(JSON.stringify(profile), /[\u0600-\u06ff]/);
    }
    if (locale !== 'fa') assert.doesNotMatch(JSON.stringify(selected.map(x => [x.cells, x.details])), /[\u0600-\u06ff]/);
  });

  test(`research, decision and dependent models stay out of free-text recommendations (${locale})`, () => {
    const {repo} = edition(locale);
    const reviews = modules.wizard.assessWizardCatalog(repo, answers, locale);
    for (const id of ['model:bytedance-seed-cola2', 'model:kanana-2-v-decide-3b-2611', 'model:nemotron-3.5-parse-dflash2']) {
      assert.equal(reviews.find(x => x.model.id === id).status, 'excluded', id);
    }
    const kanana = repo.models.find(x => x.id === 'model:kanana-2-v-decide-3b-2611');
    assert.deepEqual(kanana.outputModalities, ['structured-data']);
    assert.equal(kanana.license.commercialUse.value, 'restricted');
    const companion = reviews.find(x => x.model.id === 'model:nemotron-3.5-parse-dflash2');
    assert.equal(companion.memory, undefined);
    const cyber = read('data/llm/api-models.json').find(x => x.id === 'gpt-6-cyber');
    assert.equal(cyber.availability, 'restricted-access');
    assert.ok(cyber.catalogOnly);
    assert.ok(!modules.wizard.buildWizardResult(repo, {...answers, deployment:'api', policy:'public'}, locale).apiCandidates.some(x => x.id === cyber.id));
  });

  test(`model-specific runtime conditions retain their exact scope (${locale})`, () => {
    const {repo} = edition(locale);
    const mage = repo.modelProfiles.find(x => x.modelVersionId === 'model:mage-vl-cowork');
    const route = mage.runGuides.find(x => x.engine === 'llama.cpp');
    assert.equal(route.softwareReleaseId, 'software-release:llama-cpp-b12192');
    assert.match(route.conditions.join(' '), /Metal/);
    assert.match(route.conditions.join(' '), /set_prec/);
    const parse = repo.modelProfiles.find(x => x.modelVersionId === 'model:nemotron-3.5-parse');
    assert.match(parse.runGuides.find(x => x.engine === 'vLLM').conditions.join(' '), /0\.32\.1rc1\.dev505\+g00b6c4c56/);
    for (const p of repo.modelProfiles.filter(x => /granite-switch-4-1-(8b|30b)$/.test(x.id))) {
      assert.match(p.distinguishingFeatures.join(' '), /4\.1\.1/);
      assert.ok(!repo.models.some(x => /granite-switch-4-1-1/.test(x.id)));
    }
  });

  test(`GPU allocation and CPU expert guidance follow the selected engine (${locale})`, () => {
    const {repo} = edition(locale);
    const personal = modules.wizard.buildWizardResult(repo, {...answers, audience:'personal'}, locale);
    const guard = personal.decisions.find(x => x.id === 'llama-gpu-allocation-1108');
    assert.ok(guard);
    for (const token of ['Vulkan', 'ReBAR', 'b12171', 'SYCL', 'b12195', 'GGML_SYCL_BMG_VRAM_CHECK=1']) assert.ok(guard.conclusion.includes(token));
    const shared = modules.wizard.buildWizardResult(repo, {...answers, audience:'team'}, locale);
    assert.ok(shared.candidates.every(x => x.runtime === 'vLLM'));
    assert.ok(!shared.decisions.some(x => x.id === 'llama-gpu-allocation-1108'));
    const moe = {...repo, models:repo.models.filter(x => x.id === 'model:qwen-qwen3-30b-a3b')};
    const hybrid = modules.wizard.buildWizardResult(moe, {...answers, audience:'personal'}, locale);
    const tuning = hybrid.decisions.find(x => x.id === 'llama-moe-cpu-share');
    assert.ok(tuning);
    assert.match(tuning.conclusion, /--moe-cache-cpu-share F/);
    assert.match(tuning.conclusion, /scripts\/moe-cache-tune\.py/);
    if (locale !== 'fa') assert.doesNotMatch(guard.conclusion + tuning.conclusion, /[\u0600-\u06ff]/);
  });
}
