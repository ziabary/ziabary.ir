import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { loadLlmModules } from './helpers/llm-modules.mjs';
const modules = await loadLlmModules();
const r = modules.research, v = modules['research-views'], base = modules.guide.llmRepository;
const repository = r.enrichResearchRepository(base);
const data = name => JSON.parse(fs.readFileSync(`data/llm/v0.2.0/data/${name}.json`,'utf8'));
const close = (a,b) => assert.ok(Math.abs(a-b)<1e-8,`${a} != ${b}`);

test('supplement preserves the base, exact identities, independent evidence and deduplicated quality',()=>{
  assert.equal(base.models.length,124);assert.equal(base.publishedEvaluations.length,1209);assert.equal(base.artifactListings.length,535);
  // Similar scores remain distinct when language/protocol identity is not established.
  assert.equal(repository.models,base.models);assert.equal(repository.publishedEvaluations.length,1267);
  assert.equal(repository.evidence.length,base.evidence.length+127);
  assert.equal(r.researchModel(base,'CohereForAI/aya-expanse-32b').id,'model:coherelabs-aya-expanse-32b');
  assert.equal(r.researchModel(base,'deepseek-ai/DeepSeek-V3'),undefined);
  assert.equal(r.researchModel(base,'Qwen/Qwen3.8-Flash-Next'),undefined);
  assert.equal(repository.publishedEvaluations.filter(x=>x.benchmark==='Codeforces').length,10);
  assert.ok(repository.publishedEvaluations.filter(x=>x.benchmark==='Codeforces').every(x=>x.unit==='rating'&&!x.evaluatedRevision));
  assert.equal(repository.publishedEvaluations.filter(x=>x.benchmark==='MTEB Multilingual').length,6);
  const smol=repository.publishedEvaluations.filter(x=>x.modelVersionId==='model:huggingfacetb-smollm3-3b'&&x.benchmark==='IFEval');
  assert.deepEqual(new Set(smol.map(x=>x.mode).filter(Boolean)),new Set(['non-thinking','extended-thinking']));
  const qwen=repository.publishedEvaluations.find(x=>x.modelVersionId==='model:qwen-qwen3-4b'&&x.reporter==='HuggingFaceTB');assert.equal(qwen.reportingRelationship,'third-party');
  assert.ok(repository.publishedEvaluations.filter(x=>x.benchmark==='MTEB-R').every(x=>x.languageScope?.kind==='single' && x.languageScope.language==='en'));
  assert.ok(repository.publishedEvaluations.filter(x=>x.benchmark==='MLDR').every(x=>x.applicationIds.includes('enterprise-rag')));
});
test('all planning weight versions resolve to a model profile and pinned exact download files',()=>{
  for(const artifact of r.research.artifacts){
    const model=r.researchModel(repository,artifact.modelRepository);assert.ok(model);
    const download=repository.artifactListings.find(x=>x.modelVersionId===model.id&&x.repositoryUrl==='https://huggingface.co/'+artifact.repository&&x.variant===artifact.quantization);assert.ok(download,artifact.id);
    assert.equal(download.totalBytes,artifact.weightFileBytes);assert.equal(download.baseRevision,undefined);
    assert.ok(download.files.every(x=>x.url.includes(artifact.repositoryRevision)));
    assert.ok(download.scopeNote.includes(r.faNumber(artifact.artifactContextLimitTokens,0)));
  }
  const issues=modules.adapters.validateLlmRepository(repository);assert.deepEqual(issues,[]);
});
test('all supplied GPU and CPU planning cells recompute from real weight bytes, KV and per-device reserve',()=>{
  const scenarios=new Map(data('memory-scenarios').map(x=>[x.id,x]));const workloads=new Map(data('workloads').map(x=>[x.id,x]));
  for(const name of ['hardware-fit-matrix','cpu-fit-matrix']) for(const cell of data(name)){
    const scenario=scenarios.get(cell.memoryScenarioId), artifact=r.research.artifacts.find(x=>x.id===scenario.artifactId), workload=workloads.get(scenario.workloadId);
    const cpu=name==='cpu-fit-matrix',hardware=r.research.hardware.find(x=>x.id===cell.hardwareId);
    const plan=r.calculateMemory(artifact,workload.contextTokens,workload.activeSequences,hardware?.gpuCount??1,cpu);
    close(plan.budgetGiB,cpu?cell.plannedRamGiB:cell.plannedGiB);
  }
});
test('context, concurrent requests, CPU dtype and multi-GPU conditions change the actual budget',()=>{
  const a=r.research.artifacts.find(x=>x.modelRepository==='Qwen/Qwen3-32B'&&x.quantization==='Q4_K_M');
  const small=r.calculateMemory(a,8192,1), long=r.calculateMemory(a,32768,1), concurrent=r.calculateMemory(a,8192,8);
  assert.equal(r.memoryStatus(small.budgetGiB,24).id,'tight');assert.equal(r.memoryStatus(long.budgetGiB,24).id,'over-budget');assert.ok(concurrent.budgetGiB>long.budgetGiB);
  assert.equal(r.memoryStatus(46.1,48,2).id,'requires-sharding');
  assert.equal(r.calculateMemory(a,8192,0),undefined);assert.equal(r.calculateMemory(a,8192,1.5),undefined);
  const aya=r.research.artifacts.find(x=>x.modelRepository==='CohereLabs/aya-expanse-32b');assert.equal(r.calculateMemory(aya,32768,1),undefined);
  const cpu=v.memoryRows(repository,{...v.defaultResearchControls,method:'cpu'});assert.equal(cpu.length,59);
  const native=cpu.find(x=>x.label==='SmolLM2-1.7B-Instruct'&&x.facets.quant.display==='FP32');close(native.cells.budget.canonicalNumber,13.37542074918747);
});
test('all 54 performances stay in their report groups and metrics retain distinct units and scope',()=>{
  assert.equal(r.research.performance.length,54);
  for(const run of r.research.performance){
    const metric=Object.keys(run.metrics).find(key=>v.performanceMetrics[key]);
    const result=v.performanceRows(repository,run.publicationGroup,metric).find(x=>x.id===run.id);assert.ok(result);
    close(result.cells.value.canonicalNumber,run.metrics[metric]);
    assert.equal(result.sortGroup,run.publicationGroup+':'+metric);
    if(run.weightInitialization)assert.equal(result.modelId,undefined);
  }
  assert.equal(v.performanceRows(repository,'qwen-transformers-h20-6144-2048','outputTokensPerSecond').length,0);
  const h=v.performanceRows(repository,'gpustack-qwen14-h100-sharegpt','outputTokensPerSecond')[0];close(h.cells.ttft.canonicalNumber,22.14121);
});
test('real filters narrow model, quant, engine, task, GPU architecture, provider and currency',()=>{
  const f=(id,controls,selection)=>{const view=v.researchView(repository,id,{...v.defaultResearchControls,...controls});return modules.filtering.filterLlmRows(view.rows,view.config.filters,selection,'');};
  assert.equal(f('hardware-feasibility',{}, {quant:'Q4_K_M'}).length,27);
  assert.equal(f('hardware-feasibility',{model:'model:qwen-qwen3-8b'},{}).length,2);
  const embedding = f('deployment-compatibility',{}, {task:'embedding'});
  assert.ok(embedding.length > 3);
  assert.ok(embedding.every(row => repository.models.find(model => model.id === row.modelId)?.kind === 'embedding'));
  assert.equal(f('deployment-compatibility',{deploymentMode:'kernels'}, {architecture:'Ampere',status:'unsupported'}).length,1);
  assert.equal(f('deployment-compatibility',{deploymentMode:'kernels',model:'model:qwen-qwen3-32b'},{}).length,12);
});
