import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {loadLlmModules} from './helpers/llm-modules.mjs';

const read = path => JSON.parse(fs.readFileSync(path, 'utf8'));
const canonical = read('data/llm/v0.3.0/repository.json');
const sourceFolder = 'data/llm/sources/runtime-2026-10-25';
const versions = ['b11858', 'b11865', 'b11870'];
const target = 'model:deepseek-ai-deepseek-v4-1-flash-1017';
const modules = await loadLlmModules();

function edition(locale) {
  const i = modules['i18n/runtime'].createLlmI18n(locale, read(`data/llm/locales/messages.${locale}.json`),
    modules['i18n/runtime'].resolveRecordTranslations(read(`data/llm/locales/records.${locale}.json`)));
  const repo = modules.research.createLlmResearch(i).enrichResearchRepository(
    modules['i18n/runtime'].localizeLlmRepository(canonical, i));
  const view = modules['research-views'].createLlmResearchViews(i);
  return {repo, view, rows: view.enrichExistingRows(repo, modules.adapters.createLlmAdapters(i).buildLlmViewRows(repo), 'all'),
    filtering: modules.filtering.createLlmFiltering(i), configs: modules.views.createLlmViews(i).llmViewConfigs};
}

test('release dates and prerelease status come from source snapshots; RDMA and tensor-split fixes retain their scope', () => {
  for (const version of versions) {
    const release = canonical.softwareReleases.find(row => row.id === `software-release:llama-cpp-${version}`);
    const source = read(`${sourceFolder}/release-${version}.json`);
    assert.equal(source.prerelease, true);
    assert.equal(release.releaseChannel, 'prerelease');
    assert.equal(release.releasedOn, source.published_at.slice(0, 10));
    assert.ok(!release.isLatest);
  }
  assert.equal(read(`${sourceFolder}/release-b11865.json`).published_at, '2026-10-24T19:30:51Z');
  assert.equal(read(`${sourceFolder}/release-b11870.json`).published_at, '2026-10-25T02:15:14Z');
  const rdma = fs.readFileSync(`${sourceFolder}/pr-30399.patch`, 'utf8');
  assert.ok(rdma.indexOf('if (got > rem)') < rdma.indexOf('memcpy(dst,'));
  assert.match(rdma, /post_rx\(slot\)/);
  assert.match(rdma, /return false/);
  const split = fs.readFileSync(`${sourceFolder}/pr-31081.patch`, 'utf8');
  assert.match(split, /\+.*LLM_ARCH_MELLUM/);
  assert.match(split, /\+.*LLM_ARCH_FLINT/);
  assert.doesNotMatch(split, /\+.*LLM_ARCH_MISTRAL4/);
  assert.ok(!canonical.softwareReleases.some(row => row.id === 'software-release:llama-cpp-b11861'));
});

for (const locale of ['fa', 'en', 'es']) {
  test(`three release rows and compatibility labels are selectable without untranslated copy (${locale})`, () => {
    const {rows, filtering, configs} = edition(locale);
    const filters = configs.find(config => config.id === 'software-products').filters;
    for (const version of versions) {
      const selected = filtering.filterLlmRows(rows['software-products'], filters, {'software-version': version}, '');
      assert.equal(selected.length, 1);
      assert.match(selected[0].cells['software-version'].display, /Pre|pre|پیش/);
      if (locale !== 'fa') assert.doesNotMatch(JSON.stringify([selected[0].cells, selected[0].details]), /[\u0600-\u06ff]/);
    }
    const rdma = rows['software-products'].find(row => row.id === 'software-release:llama-cpp-b11865');
    assert.match(JSON.stringify([rdma.cells, rdma.details]), /RPC\/RDMA/);
    assert.match(rdma.cells['research-condition'].display, /HTTP/);
    assert.match(rdma.cells['research-condition'].display, /API/);
    const split = rows['software-products'].find(row => row.id === 'software-release:llama-cpp-b11858');
    for (const token of ['mellum', 'flint', 'mistral4', '--split-mode tensor']) assert.ok(JSON.stringify(split).includes(token), token);
  });

  test(`DeepSeek route is visible while default local deployment and download claims remain unverified (${locale})`, () => {
    const {repo, view} = edition(locale);
    const model = repo.models.find(row => row.id === target);
    assert.equal(model.localExecutionStatus, 'requires-validation');
    assert.equal(model.persianEvidenceStatus, 'not-evaluated');
    const profile = repo.modelProfiles.find(row => row.modelVersionId === target);
    const guide = profile.runGuides.find(row => row.engine === 'llama.cpp');
    assert.equal(guide.softwareReleaseId, 'software-release:llama-cpp-b11870');
    for (const token of ['BF16', 'MXFP8', 'Safetensors', 'GGUF']) assert.ok(guide.conditions.join(' ').includes(token), token);
    assert.ok(repo.artifactListings.filter(row => row.modelVersionId === target).every(row => row.format === 'safetensors'));
    const route = view.compatibilityRows(repo).find(row => row.id === `route:${target}:llama.cpp`);
    assert.ok(route);
    assert.equal(route.facets.status.display, 'documented-route');
    if (locale !== 'fa') assert.doesNotMatch(JSON.stringify([route.cells, route.details]), /[\u0600-\u06ff]/);
    const answers = {task:'writing', writingTask:'summary', sourceLanguage:'en', outputLanguage:'en', format:'text', deployment:'self', hardware:'gpu', vram:'192', upgrade:'existing', inputTokens:'512', outputTokens:'128', concurrency:'1', loadDefinition:'active'};
    const review = modules.wizard.assessWizardCatalog(repo, answers, locale).find(row => row.model.id === target);
    assert.equal(review.status, 'excluded');
    assert.equal(review.memory, undefined);
  });
}
