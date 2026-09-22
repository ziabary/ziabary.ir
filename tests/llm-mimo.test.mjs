import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {loadLlmModules} from './helpers/llm-modules.mjs';
const m = await loadLlmModules();
const read = path => JSON.parse(fs.readFileSync(path, 'utf8'));
const canonical = read('data/llm/v0.3.0/repository.json');
const id = 'model:mimo-v2-6-pro-rl';

test('MiMo is searchable in all editions with total/active parameters and translated deployment conditions', () => {
  for (const locale of ['fa','en','es']) {
    const i = m['i18n/runtime'].createLlmI18n(locale, read(`data/llm/locales/messages.${locale}.json`), m['i18n/runtime'].resolveRecordTranslations(read(`data/llm/locales/records.${locale}.json`)));
    const repo = m['i18n/runtime'].localizeLlmRepository(canonical,i);
    const rows = m.adapters.createLlmAdapters(i).buildLlmViewRows(repo)['model-catalog'];
    const config = m.views.createLlmViews(i).llmViewConfigs.find(v => v.id === 'model-catalog');
    const filtered = m.filtering.createLlmFiltering(i).filterLlmRows(rows, config.filters, {}, 'MiMo-V2.6-Pro');
    assert.deepEqual(filtered.map(r => r.id), [id]);
    const model = repo.models.find(x => x.id === id);
    assert.equal(model.totalParametersB.value,1020);
    assert.equal(model.activeParametersB.value,42);
    assert.equal(model.declaredContext.value,1048576);
    assert.equal(model.persianEvidenceStatus,'not-evaluated');
    assert.ok(filtered[0].downloadLinks.some(l => l.href === 'https://huggingface.co/XiaomiMiMo/MiMo-V2.6-Pro-RL'));
    const profile = repo.modelProfiles.find(x => x.modelVersionId === id);
    assert.deepEqual(profile.runGuides.map(g => g.engine),['vLLM','SGLang','API']);
    if (locale !== 'fa') assert.doesNotMatch(JSON.stringify([filtered[0].cells, filtered[0].details,profile]), /[\u0600-\u06ff]/);
  }
});

test('MiMo download footprint includes auxiliary weights; it is not a measured runtime memory figure', () => {
  const listing = canonical.artifactListings.find(x => x.modelVersionId === id);
  const api = read('data/llm/sources/mimo-v2.6-pro-2026-09-22/api.json');
  const config = read('data/llm/sources/mimo-v2.6-pro-2026-09-22/config.json');
  assert.equal(listing.repositoryRevision, api.sha);
  assert.equal(listing.files.length,133);
  assert.equal(listing.totalBytes,573457375642);
  assert.equal(listing.totalBytes,listing.files.reduce((n,f) => n+f.bytes,0));
  assert.ok(listing.files.some(f => f.path === 'dflash/mask_embedding.pt'));
  assert.ok(listing.files.some(f => f.path.startsWith('audio_tokenizer/')));
  assert.equal(config.quantization_config.store_dtype,'mxfp4');
  assert.equal(canonical.models.find(x => x.id === id).attentionArchitecture,'hybrid');
  assert.ok(!canonical.benchmarkRuns.some(x => x.modelVersionId === id));
});

test('independent API results and publisher benchmark claims retain separate attribution', () => {
  const results = canonical.publishedEvaluations.filter(x => x.modelVersionId === id);
  assert.equal(results.length,3);
  const aa = results.find(x => x.reporter === 'Artificial Analysis');
  assert.equal(aa.reportingRelationship,'independent');
  assert.equal(aa.benchmarkVersion,'4.3.2');
  assert.equal(aa.value,46);
  assert.equal(aa.evaluatedRevision,undefined);
  assert.ok(aa.limitations.length > 0);
  assert.ok(results.filter(x => x.reporter === 'Xiaomi MiMo').every(x => x.reportingRelationship === 'publisher'));
  assert.ok(results.every(x => x.language !== 'fa'));
});
