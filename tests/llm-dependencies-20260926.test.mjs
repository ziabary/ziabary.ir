import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {loadLlmModules} from './helpers/llm-modules.mjs';
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const canonical=read('data/llm/v0.3.0/repository.json'),m=await loadLlmModules();
const baseId='model:liquidai-lfm2-5-vl-3b',draftId=baseId+'-dspark';
const answers={task:'extraction',sourceLanguage:'en',outputLanguage:'en',sources:'provided',format:'media',mediaType:'image',deployment:'self',hardware:'gpu',gpuName:'RTX 4090',vram:'24',ram:'64',inputTokens:'512',outputTokens:'256',concurrency:'1',inputSize:'short',audience:'personal',licenseUse:'research'};
function edition(locale){
 const i=m['i18n/runtime'].createLlmI18n(locale,read(`data/llm/locales/messages.${locale}.json`),m['i18n/runtime'].resolveRecordTranslations(read(`data/llm/locales/records.${locale}.json`)));
 return {i,repo:m.research.createLlmResearch(i).enrichResearchRepository(m['i18n/runtime'].localizeLlmRepository(canonical,i))};
}
test('dependent drafter is excluded before memory estimation even when task/kind look eligible',()=>{
 for(const locale of ['fa','en','es']){
  const {repo}=edition(locale),drafter=repo.models.find(x=>x.id===draftId);
  assert.equal(drafter.dependency.targetModelId,baseId);assert.deepEqual(drafter.languages,[]);
  // Challenge the explicit dependency guard, rather than relying on kind=other to exclude it.
  const challenged=structuredClone(repo),candidate=challenged.models.find(x=>x.id===draftId);
  Object.assign(candidate,{kind:'vision-language',stage:'instruct',applications:['structured-extraction'],inputModalities:['text','image']});
  const estimated=[];const estimate=model=>{estimated.push(model.id);return undefined;};
  const review=m.wizard.assessWizardCatalog(challenged,answers,locale,estimate).find(x=>x.model.id===draftId);
  assert.equal(review.status,'excluded');assert.equal(review.memory,undefined);assert.equal(review.memoryStatus,'unsupported');assert.ok(!estimated.includes(draftId));
  for(const task of ['extraction','writing','documents','general','coding'])assert.ok(!m.wizard.buildWizardResult(challenged,{...answers,task},locale,estimate).candidates.some(x=>x.model.id===draftId));
  assert.ok(!repo.artifacts.some(x=>x.modelVersionId===draftId));
 }
});
test('catalog exposes runtime dependency and restricted licenses in all editions',()=>{
 for(const locale of ['fa','en','es']){
  const {i,repo}=edition(locale),adapter=m.adapters.createLlmAdapters(i);
  const rows=adapter.buildLlmViewRows(repo)['model-catalog'];
  const base=rows.find(x=>x.id===baseId),draft=rows.find(x=>x.id===draftId);
  assert.match(draft.cells['kind-stage'].display,/LFM2\.5-VL-3B/);assert.notEqual(base.cells['kind-stage'].display,draft.cells['kind-stage'].display);
  for(const id of [baseId,draftId]){
   const model=repo.models.find(x=>x.id===id),row=rows.find(x=>x.id===id);
   assert.equal(model.license.commercialUse.value,'restricted');assert.equal(row.facets['commercial-use'].raw,'restricted');
   const filtering=m.filtering.createLlmFiltering(i),filters=m['research-views'].createLlmResearchViews(i).enrichExistingConfig(m.views.createLlmViews(i).llmViewConfigs.find(x=>x.id==='model-catalog')).filters;
   assert.ok(filters.some(x=>x.id==='commercial-use'));
   assert.ok(filtering.filterLlmRows(rows,filters,{'commercial-use':'restricted'},'').some(x=>x.id===id));
   assert.ok(!filtering.filterLlmRows(rows,filters,{'commercial-use':'allowed'},'').some(x=>x.id===id));
   assert.match(model.license.restrictions[0],/Legal Entity/);assert.match(model.license.url.value,/LICENSE/);
   if(locale!=='fa')assert.doesNotMatch(JSON.stringify([row.cells,row.details,repo.modelProfiles.find(x=>x.modelVersionId===id)]),/[\u0600-\u06ff]/);
  }
  const broken=structuredClone(repo);broken.models.find(x=>x.id===draftId).dependency.targetModelId='model:missing';assert.ok(adapter.validateLlmRepository(broken).some(x=>x.includes('dependency.targetModelId')));
 }
});
test('publisher relative speedup stays separate from throughput, TTFT and quality',()=>{
 for(const locale of ['fa','en','es']){
  const {i,repo}=edition(locale),view=m['research-views'].createLlmResearchViews(i);
  const rows=view.performanceRows(repo,'liquid-dspark-vl','endToEndSpeedup');assert.equal(rows.length,18);
  assert.equal(view.performanceRows(repo,'liquid-dspark-vl','outputTokensPerSecond').length,0);
  assert.equal(view.performanceRows(repo,'liquid-dspark-vl','meanTtftMs').length,0);
  for(const row of rows){assert.equal(row.cells.value.canonicalUnit,'×');assert.equal(row.cells.ttft.state,'not-measured');assert.notEqual(row.comparison.calculation.status,'ready');if(locale!=='fa')assert.doesNotMatch(JSON.stringify([row.cells,row.details]),/[\u0600-\u06ff]/);}
  for(const [hardware,low,high] of [['H100',1.64,2.27],['M5 Max',1.56,2.62],['M3 Ultra',1.30,1.77]]){
   const values=rows.filter(x=>x.cells.hardware.display.includes(hardware)).map(x=>x.cells.value.canonicalNumber);assert.equal(Math.min(...values),low);assert.equal(Math.max(...values),high);
  }
  assert.ok(!repo.publishedEvaluations.some(x=>x.modelVersionId===draftId));
 }
});
test('prerelease is a scoped visible note and cannot become a wizard runtime default',()=>{
 const release=read('data/llm/sources/decision-runtime-2026-09-26/release.json');assert.equal(release.prerelease,true);assert.match(release.published_at,/^2026-09-25/);
 for(const locale of ['fa','en','es']){
  const {i,repo}=edition(locale),view=m['research-views'].createLlmResearchViews(i);
  const rows=view.enrichExistingRows(repo,m.adapters.createLlmAdapters(i).buildLlmViewRows(repo),'all')['software-products'];
  const row=rows.find(x=>x.id==='software-release:llama-cpp-v0-5-0');
  assert.match(row.cells['research-condition'].display,/b11182/);assert.match(row.cells['research-condition'].display,/b11160/);assert.match(row.cells['research-condition'].display,/GGML_CUDA_MMQ_PREC/);assert.match(row.cells['research-benefit'].display,/RPC/);
  assert.ok(!repo.softwareReleases.some(x=>x.version==='b11182'));
  for(const hardware of ['gpu','cpu']){const result=m.wizard.buildWizardResult(repo,{...answers,task:'writing',hardware},locale);assert.doesNotMatch(JSON.stringify(result.candidates),/b11182|GGML_CUDA_MMQ_PREC/);}
 }
});
