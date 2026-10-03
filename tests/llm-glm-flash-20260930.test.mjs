import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { loadLlmModules } from './helpers/llm-modules.mjs';
const read = path => JSON.parse(fs.readFileSync(path, 'utf8'));
const canonical = read('data/llm/v0.3.0/repository.json');
const modules = await loadLlmModules();

test('Flash prerelease note and later fix are visible in every software-table edition', () => {
  for (const locale of ['fa', 'en', 'es']) {
    const i = modules['i18n/runtime'].createLlmI18n(locale, read(`data/llm/locales/messages.${locale}.json`), modules['i18n/runtime'].resolveRecordTranslations(read(`data/llm/locales/records.${locale}.json`)));
    const repo = modules.research.createLlmResearch(i).enrichResearchRepository(modules['i18n/runtime'].localizeLlmRepository(canonical, i));
    const rows = modules['research-views'].createLlmResearchViews(i).enrichExistingRows(repo, modules.adapters.createLlmAdapters(i).buildLlmViewRows(repo), 'all')['software-products'];
    const row = rows.find(row => row.id === 'software-release:llama-cpp-v0-5-0');
    const condition = row.cells['research-condition'].display;
    for (const token of ['b11279', 'GLM-5.3-Flash', 'GLM-5.3-BF16', '#29745', 'ThreadSanitizer']) assert.ok(condition.includes(token), `${locale}: ${token}`);
    assert.match(row.cells['research-benefit'].display, /b11279/);
    assert.ok(row.sourceIds.includes('evidence:llama-cpp-glm-flash-race-29745'));
    if (locale !== 'fa') assert.doesNotMatch(JSON.stringify([row.cells, row.details]), /[\u0600-\u06ff]/);
  }
});

test('initial Flash support is not promoted to a runtime, model compatibility or measurement', () => {
  assert.ok(!canonical.softwareReleases.some(release => release.version === 'b11279'));
  for (const key of ['models', 'modelProfiles', 'softwareCapabilities', 'deploymentCompatibility', 'executionFeasibility', 'benchmarkRuns', 'publishedEvaluations', 'selectionGuidance']) {
    assert.doesNotMatch(JSON.stringify(canonical[key]), /b11279|glm-flash-27773|glm-flash-race-29745/);
  }
});
