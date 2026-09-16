import test from 'node:test';
import assert from 'node:assert/strict';
import { validateArtifactManifest } from '../scripts/llm-artifact-manifest.mjs';
import { loadLlmModules } from './helpers/llm-modules.mjs';
const m = await loadLlmModules();
const base = m.guide.llmRepository, repository = m.research.enrichResearchRepository(base);
const view = m['research-views'];
test('artifact manifest rejects alternate complete file, incomplete shards and duplicate paths', () => {
  const complete = {path: 'model-q4.gguf'}, first = {path: 'model-q4-00001-of-00002.gguf'}, last = {path: 'model-q4-00002-of-00002.gguf'};
  assert.throws(() => validateArtifactManifest([complete, first, last]), /equivalent/);
  assert.throws(() => validateArtifactManifest([first]), /incomplete/);
  assert.throws(() => validateArtifactManifest([complete, complete]), /duplicate/);
  assert.doesNotThrow(() => validateArtifactManifest([first, last]));
  assert.doesNotThrow(() => validateArtifactManifest([complete]));
});
test('six Coder GGUF packages use the complete file once across download, GPU and CPU views', () => {
  const artifacts = m.research.research.artifacts.filter(a => a.id.includes('qwen2-5-coder-'));
  assert.equal(artifacts.length, 6);
  const expected = {'7B:Q4_K_M':4683073536,'7B:Q8_0':8098525184,'14B:Q4_K_M':8988110272,'14B:Q8_0':15701597632,'32B:Q4_K_M':19851335872,'32B:Q8_0':34820884672};
  const gpu = view.memoryRows(repository, view.defaultResearchControls), cpu = view.memoryRows(repository, {...view.defaultResearchControls, method:'cpu'});
  for (const a of artifacts) {
    const size = a.modelRepository.match(/Coder-(\d+B)-/)[1];
    assert.equal(a.weightFileBytes, expected[size+':'+a.quantization]);
    assert.equal(a.files.length, 1);
    assert.equal(gpu.find(row => row.id===a.id).cells.weight.canonicalNumber, a.weightFileBytes / 2**30);
    assert.equal(cpu.find(row => row.id===a.id).cells.weight.canonicalNumber, a.weightFileBytes / 2**30);
    const listings = repository.artifactListings.filter(row => row.baseModelRepository===a.modelRepository && row.variant===a.quantization && row.publisher==='Qwen');
    assert.ok(listings.length); assert.ok(listings.every(row => row.totalBytes===a.weightFileBytes));
  }
  const q4 = artifacts.find(a => a.modelRepository.includes('32B') && a.quantization==='Q4_K_M');
  assert.ok(Math.abs(m.research.calculateMemory(q4,8192,1).budgetGiB - 22.487997233867645) < 1e-8);
});
test('multiple cards do not imply mandatory sharding when one card fits', () => {
  assert.equal(m.research.memoryStatus(14,48,2).id,'single-device-sufficient');
  assert.equal(m.research.memoryStatus(25,48,2).id,'single-device-sufficient');
  assert.equal(m.research.memoryStatus(46,48,2).id,'requires-sharding');
  assert.equal(m.research.memoryStatus(50,48,2).id,'over-budget');
});
test('hybrid attention no longer hides dense and MoE checkpoints in architecture filters', () => {
  const rows = m.adapters.adaptModelCatalog(repository);
  assert.equal(rows.find(r => r.id==='model:qwen-qwen3-5-35b-a3b').facets.architecture.raw,'moe');
  assert.equal(rows.find(r => r.id==='model:qwen-qwen3-5-4b').facets.architecture.raw,'dense');
  assert.equal(repository.models.find(r => r.id==='model:qwen-qwen3-5-35b-a3b').activeParametersB.value,3);
});
test('small SmolLM2 has no native tool claim and direct-response Qwen has no thinking budget', () => {
  for (const size of ['135m','360m']) {
    const id=`model:huggingfacetb-smollm2-${size}-instruct`;
    assert.ok(!repository.models.find(m=>m.id===id).applications.includes('agents-tools'));
    assert.ok(!repository.modelUseGuidance.some(g=>g.modelVersionId===id&&g.role==='tool-use'));
  }
  for (const id of ['model:qwen-qwen3-coder-30b-a3b-instruct','model:qwen-qwen3-coder-480b-a35b-instruct','model:qwen-qwen3-235b-a22b-instruct-2507'])
    assert.ok(!repository.modelUseGuidance.filter(g=>g.modelVersionId===id).some(g=>g.conditions.some(c=>c.includes('توکن‌های تفکر'))));
});
test('specialized quality never substitutes Polish retrieval or Persian intent F1 for Persian retrieval', () => {
  const rows=view.enrichExistingRows(repository,m.adapters.buildLlmViewRows(repository))['specialized-models'];
  for (const row of rows) assert.ok(!/ArguAna|MassiveIntent|MTEB.Code/.test(row.cells['published-quality'].display));
  for (const row of rows) assert.ok(!row.cells['vector-memory'].display?.includes('میلیون سند'));
});
test('audit additions resolve to specialized rows, official downloads and local logos', () => {
  const rows=view.enrichExistingRows(repository,m.adapters.buildLlmViewRows(repository))['specialized-models'];
  for(const id of ['model:intfloat-multilingual-e5-large-instruct','model:partai-tooka-sbert-v2-small','model:partai-tooka-sbert-v2-large','model:hooshvarelab-bert-base-parsbert-uncased']) {
    assert.ok(rows.some(row=>row.modelId===id));
    assert.ok(repository.artifactListings.some(a=>a.modelVersionId===id&&a.authority==='official'&&a.files.length));
    assert.ok(m.brands.llmBrand(id)?.startsWith('/images/'));
  }
  for(const key of ['ktransformers','sentence-transformers','flagembedding']) assert.ok(repository.softwareProducts.some(p=>p.id==='software-product:'+key));
  assert.equal(repository.softwareReleases.find(r=>r.productId==='software-product:tgi').maintenanceStatus,'archived');
});
test('benchmark summaries retain TP, DP and context changes rather than presenting identical setups', () => {
  for(const run of m.research.research.performance.filter(run=>run.servingCommandAsPublished?.includes('DeepSeek-V3.2'))) {
    const metric=Object.keys(run.metrics).find(key=>view.performanceMetrics[key]);
    const row=view.performanceRows(repository,run.publicationGroup,metric).find(row=>row.id===run.id);
    assert.match(row.cells.configuration.display, /-tp(?:-size)? 8/);
    if(run.servingCommandAsPublished.includes('--dp-size')) assert.match(row.cells.configuration.display,/--dp-size 8/);
  }
  const paired=m.research.research.performance.filter(r=>r.publicationGroup==='qwen-transformers-h20-6144-2048');
  assert.equal(paired.filter(r=>r.engine==='SGLang').length,14);
  assert.ok(paired.every(r=>r.metrics.outputTokensPerSecond===undefined&&r.metrics.combinedInputOutputTokensPerSecond>0));
});
