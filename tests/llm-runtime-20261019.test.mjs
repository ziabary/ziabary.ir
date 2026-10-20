import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { loadLlmModules } from './helpers/llm-modules.mjs';

const read = path => JSON.parse(fs.readFileSync(path, 'utf8'));
const canonical = read('data/llm/v0.3.0/repository.json');
const evidence = read('data/llm/sources/runtime-2026-10-19/official-evidence.json');
const review = read('docs/content-reviews/runtime-2026-10-19.json');
const modules = await loadLlmModules();
const releases = ['v0.5.22', 'b11722', 'b11727'];

test('all three release rows are selectable and translated, with notes scoped to their release', () => {
  for (const locale of ['fa', 'en', 'es']) {
    const i = modules['i18n/runtime'].createLlmI18n(locale, read(`data/llm/locales/messages.${locale}.json`),
      modules['i18n/runtime'].resolveRecordTranslations(read(`data/llm/locales/records.${locale}.json`)));
    const repo = modules['i18n/runtime'].localizeLlmRepository(canonical, i);
    const enriched = modules.research.createLlmResearch(i).enrichResearchRepository(repo);
    const rows = modules['research-views'].createLlmResearchViews(i).enrichExistingRows(enriched,
      modules.adapters.createLlmAdapters(i).buildLlmViewRows(enriched), 'all')['software-products'];
    const filters = modules.views.createLlmViews(i).llmViewConfigs.find(view => view.id === 'software-products').filters;
    const filtering = modules.filtering.createLlmFiltering(i);
    for (const version of releases) {
      const selected = filtering.filterLlmRows(rows, filters, {'software-version':version}, '');
      assert.equal(selected.length, 1, `${locale}/${version}`);
      if (version.startsWith('b')) assert.match(selected[0].cells['software-version'].display, /Pre|pre|پیش/);
      if (locale !== 'fa') assert.doesNotMatch(JSON.stringify(selected[0]), /[\u0600-\u06ff]/);
      assert.ok(selected[0].sourceIds.length >= 2);
    }
    const sglang = rows.find(row => row.id === 'software-release:sglang-v0-5-22');
    const migration = sglang.details.backends.display;
    for (const token of ['3.11', '3.10', '--attn-dp-size N', '--enable-dp-attention', '--dp-size', 'DeepSeek CP',
      '--disaggregation-decode-host-receive-threshold', '1=', '0=', 'tc_piecewise', 'tc_compiler']) assert.ok(migration.includes(token), token);
    const caveat = sglang.cells['research-condition'].display.replace(/[۰-۹]/g, digit => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(digit)));
    for (const token of ['PyPI', 'GitHub', '02:55 UTC', 'Mamba', '#43029', 'Dumper', 'eval()', 'BOM/QPL']) assert.ok(caveat.includes(token), token);
    const hexagon = rows.find(row => row.id === 'software-release:llama-cpp-b11722');
    assert.match(hexagon.details.backends.display, /--no-kv-unified/);
    for (const token of ['IQ-9075', 'Hexagon v73', 'Llama-3.2-1B', 'Qwen3.5-2B', 'Q4_0', 'Snapdragon']) assert.ok(hexagon.cells['research-condition'].display.includes(token), token);
    const gguf = rows.find(row => row.id === 'software-release:llama-cpp-b11727');
    assert.match(gguf.details.backends.display, /gguf-split.*export-lora/);
    assert.match(gguf.cells['research-condition'].display, /checksum/);
    for (const id of ['software-release:sglang-v0-5-20', 'software-release:sglang-v0-5-21', 'software-release:llama-cpp-b11552']) {
      const historical = rows.find(row => row.id === id);
      assert.ok(historical);
      assert.doesNotMatch(JSON.stringify(historical), /#43029|#30497|IQ-9075|runtime1019/);
    }
  }
});

test('official evidence separates package upload, stable release and prereleases and verifies both final read checks', () => {
  assert.equal(evidence.releases['sglang-release'].published_at, '2026-10-19T02:55:19Z');
  assert.equal(evidence.releases['sglang-release'].prerelease, false);
  assert.equal(evidence.pypi.requires_python, '>=3.11');
  assert.ok(evidence.pypi.files.every(file => file.upload_time_iso_8601.startsWith('2026-10-16')));
  for (const version of ['b11722', 'b11727']) {
    assert.equal(evidence.releases[`llama-${version}`].prerelease, true);
    const release = canonical.softwareReleases.find(item => item.version === version);
    assert.equal(release.releaseChannel, 'prerelease');
    assert.equal(release.releasedOn, '2026-10-19');
  }
  assert.equal(canonical.softwareReleases.find(item => item.version === 'v0.5.22').releaseChannel, 'stable');
  assert.deepEqual(evidence.ggufFinalPatch.map(file => file.filename).sort(),
    ['tools/export-lora/export-lora.cpp', 'tools/gguf-split/gguf-split.cpp']);
  for (const file of evidence.ggufFinalPatch) assert.match(file.patch, /\+.*if \(!f_in\)/);
  assert.match(JSON.stringify(evidence.taggedSourceChecks['sglang-dumper.py']), /eval\(filter_expr/);
  assert.equal(review.runtimeTested, false);
});

