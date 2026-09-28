import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {loadLlmModules} from './helpers/llm-modules.mjs';
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const canonical=read('data/llm/v0.3.0/repository.json'),m=await loadLlmModules();
const ids=canonical.models.filter(x=>/^model:qwen-qwen3-(vl-)?reranker-/.test(x.id)).map(x=>x.id);
function edition(locale){
 const i=m['i18n/runtime'].createLlmI18n(locale,read(`data/llm/locales/messages.${locale}.json`),m['i18n/runtime'].resolveRecordTranslations(read(`data/llm/locales/records.${locale}.json`)));
 const repo=m.research.createLlmResearch(i).enrichResearchRepository(m['i18n/runtime'].localizeLlmRepository(canonical,i));
 return {repo,rows:m['research-views'].createLlmResearchViews(i).enrichExistingRows(repo,m.adapters.createLlmAdapters(i).buildLlmViewRows(repo),'all')};
}
test('b11223 is a separately scoped experimental note with official release evidence',()=>{
 const source=read('data/llm/sources/llama-rank-2026-09-28/verification.json');
 assert.equal(source.release.prerelease,true);assert.equal(source.release.published_at,'2026-09-27T22:03:23Z');
 assert.equal(source.pullRequest.merged,true);assert.equal(source.release.target_commitish,source.pullRequest.merge_commit_sha);
 assert.equal(source.runtimeTested,false);
 assert.ok(!canonical.softwareReleases.some(x=>x.version==='b11223'));
 for(const locale of ['fa','en','es']){
  const {rows}=edition(locale),row=rows['software-products'].find(x=>x.id==='software-release:llama-cpp-v0-5-0');
  assert.match(row.cells['research-benefit'].display,/b11223/);assert.match(row.cells['research-benefit'].display,/Qwen3-VL/);
  const condition=row.cells['research-condition'].display;
  for(const term of ['b11223','n_ubatch','/rerank','/embedding','#28876','b11160','b11182'])assert.ok(condition.includes(term));
  for(const id of ['evidence:llama-cpp-b11223-release','evidence:llama-cpp-rank-28876'])assert.ok(row.sourceIds.includes(id));
  if(locale!=='fa')assert.doesNotMatch(JSON.stringify([row.cells,row.details]),/[\u0600-\u06ff]/);
 }
});
test('all five rerankers expose version conditions in both catalog and specialist details',()=>{
 assert.equal(ids.length,5);
 for(const locale of ['fa','en','es']){
  const {rows}=edition(locale);
  for(const id of ids){
   const catalog=rows['model-catalog'].find(x=>x.modelId===id);
   const specialist=rows['specialized-models'].find(x=>x.modelId===id);
   assert.ok(catalog);assert.ok(specialist);
   assert.match(catalog.cells['use-condition'].display,/b11223/);
   assert.match(specialist.details.limitations.display,/b11223/);
   if(locale!=='fa')assert.doesNotMatch(JSON.stringify([catalog.cells,specialist.details]),/[\u0600-\u06ff]/);
  }
 }
});
test('current reranker execution guides cannot select the prerelease as a production default',()=>{
 const answers={task:'documents',sources:'archive',archiveRole:'search',failure:'ranking',sourceLanguage:'en',outputLanguage:'en',inputSize:'long',deployment:'self',phase:'production',hardware:'gpu',gpuName:'NVIDIA H100',vram:'80',ram:'128',owner:'experienced'};
 for(const locale of ['fa','en','es']){
  const {repo}=edition(locale);
  for(const hardware of ['cpu','gpu']){
   const reviewed=m.wizard.assessWizardCatalog(repo,{...answers,hardware},locale,undefined,'reranker').filter(x=>ids.includes(x.model.id));
   assert.equal(reviewed.length,5);
   for(const candidate of reviewed)assert.notEqual(candidate.runtime,'llama.cpp');
   const result=m.wizard.buildWizardResult(repo,{...answers,hardware},locale);
   for(const candidate of [...result.candidates,...result.specialists])assert.doesNotMatch(candidate.runtime??'',/b11223/);
  }
 }
});
