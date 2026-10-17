import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { loadLlmModules } from './helpers/llm-modules.mjs';

const read = file => JSON.parse(fs.readFileSync(file, 'utf8'));
const canonical = read('data/llm/v0.3.0/repository.json');
const reports = read('data/llm/v0.2.0/data/published-performance.json');
const modules = await loadLlmModules();
function edition(locale) {
  const i = modules['i18n/runtime'].createLlmI18n(locale, read(`data/llm/locales/messages.${locale}.json`),
    modules['i18n/runtime'].resolveRecordTranslations(read(`data/llm/locales/records.${locale}.json`)));
  const repo = modules['i18n/runtime'].localizeLlmRepository(canonical, i);
  return { repo, adapters: modules.adapters.createLlmAdapters(i), views: modules.views.createLlmViews(i),
    filters: modules.filtering.createLlmFiltering(i), research: modules.research.createLlmResearch(i),
    researchViews: modules['research-views'].createLlmResearchViews(i) };
}

test('release filters distinguish fixed prereleases and the new stable Ollama in all three editions', () => {
  for (const locale of ['fa', 'en', 'es']) {
    const e = edition(locale);
    const repo = e.research.enrichResearchRepository(e.repo);
    const rows = e.researchViews.enrichExistingRows(repo, e.adapters.buildLlmViewRows(repo), 'all')['software-products'];
    const filters = e.views.llmViewConfigs.find(v => v.id === 'software-products').filters;
    for (const version of ['b11537', 'b11540', 'v0.40.2']) {
      const selected = e.filters.filterLlmRows(rows, filters, { 'software-version': version }, '');
      assert.equal(selected.length, 1, `${locale}: ${version}`);
      assert.match(selected[0].cells['software-version'].display, version === 'v0.40.2' ? /Latest/ : /Pre|pre|پیش/);
      if (locale !== 'fa') assert.doesNotMatch(JSON.stringify(selected[0]), /[\u0600-\u06ff]/);
    }
    const current = rows.find(r => r.id === 'software-release:ollama-v0-40-2');
    assert.match(current.cells['research-condition'].display, /v0\.40\.1\+/);
    const historical = rows.find(r => r.id === 'software-release:ollama-v0-40-0');
    assert.doesNotMatch(historical.cells['software-version'].display, /Latest/);
  }
  const latest = canonical.softwareReleases.filter(r => r.productId === 'software-product:ollama' && r.isLatest);
  assert.deepEqual(latest.map(r => r.version), ['v0.40.2']);
  assert.equal(canonical.softwareReleases.find(r => r.version === 'b11537').releasedOn, '2026-10-09');
  assert.equal(canonical.softwareReleases.find(r => r.version === 'b11540').releasedOn, '2026-10-10');
});

test('reported PR results retain original model, platform, repetition and version scope without adding planning hardware', () => {
  const qwen = reports.filter(r => r.publicationGroup === 'qwen38-b70-regression');
  assert.deepEqual(qwen.map(r => [r.metrics.prefillTokensPerSecond, r.metrics.decodeTokensPerSecond]), [[365, 24], [582.23, 32.75]]);
  assert.ok(qwen.every(r => r.gpuCount === 2 && r.protocol.operatingSystem === 'Linux' && r.protocol.minimumFixedVersion === 'b11537'));
  const sycl = reports.filter(r => r.publicationGroup === 'sycl-mxfp4-b70-windows');
  assert.deepEqual(sycl.map(r => r.metrics.decodeTokensPerSecond), [55.84, 106.64, 33.27, 67.14]);
  assert.deepEqual(sycl.map(r => [r.gpuCount, r.protocol.repetitions]), [[1, 5], [1, 5], [2, 2], [2, 2]]);
  assert.ok(sycl.every(r => r.flashAttention && r.protocol.operatingSystem === 'Windows 11' && r.protocol.oneAPI === '2026.0' && r.protocol.minimumFixedVersion === 'b11540'));
  assert.equal(canonical.benchmarkRuns.length, 0);
  assert.ok(!canonical.models.some(r => r.exactName.includes('Flash-Next')));
  assert.ok(!read('data/llm/v0.2.0/data/hardware.json').some(r => /B70/.test(JSON.stringify(r))));
  for (const locale of ['fa', 'en', 'es']) {
    const e = edition(locale);
    const rows = e.researchViews.performanceRows(e.repo, 'sycl-mxfp4-b70-windows', 'decodeTokensPerSecond');
    assert.equal(rows.length, 4);
    assert.ok(rows.every(r => r.cells.hardware.brandId === 'intel'));
    assert.ok(rows.every(r => /Windows 11/.test(r.cells.conditions.display)));
    if (locale !== 'fa') assert.doesNotMatch(JSON.stringify(rows), /[\u0600-\u06ff]/);
    const prefill = e.researchViews.performanceRows(e.repo, 'qwen38-b70-regression', 'prefillTokensPerSecond');
    assert.equal(prefill.length, 2);
    assert.ok(prefill.every(r => /b11537/.test(r.cells.conditions.display)));
  }
});
