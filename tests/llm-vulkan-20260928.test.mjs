import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {loadLlmModules} from './helpers/llm-modules.mjs';
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const canonical=read('data/llm/v0.3.0/repository.json'),m=await loadLlmModules();
const releaseId='software-release:llama-cpp-b11224';
test('Vulkan correctness warning and old-build retest condition survive all localized table adapters',()=>{
 for(const locale of ['fa','en','es']){
  const i=m['i18n/runtime'].createLlmI18n(locale,read(`data/llm/locales/messages.${locale}.json`),m['i18n/runtime'].resolveRecordTranslations(read(`data/llm/locales/records.${locale}.json`)));
  const repo=m.research.createLlmResearch(i).enrichResearchRepository(m['i18n/runtime'].localizeLlmRepository(canonical,i));
  const rows=m['research-views'].createLlmResearchViews(i).enrichExistingRows(repo,m.adapters.createLlmAdapters(i).buildLlmViewRows(repo),'all')['software-products'];
  const row=rows.find(x=>x.id===releaseId),condition=row.cells['research-condition'].display;
  for(const token of ['b11224','SheetSage2','Qwen3 AR','--no-fa','CPU/CUDA','b11160'])assert.ok(condition.includes(token),`${locale}: ${token}`);
  assert.match(row.cells['research-benefit'].display,/mul_mat_id/);
  assert.match(rows.find(x=>x.id==='software-release:llama-cpp-b11160').cells['research-condition'].display,/b11224\+/);
  assert.doesNotMatch(rows.find(x=>x.id==='software-release:llama-cpp-v0-5-0').cells['research-condition'].display,/SheetSage2|Qwen3 AR/);
  assert.ok(row.sourceIds.includes('evidence:llama-cpp-b11224-release'));
  assert.ok(row.sourceIds.includes('evidence:llama-cpp-vulkan-28956'));
  if(locale!=='fa')assert.doesNotMatch(JSON.stringify([row.cells,row.details]),/[\u0600-\u06ff]/);
 }
});
test('upstream prerelease is evidence of a fix, not a measured performance run or runtime default',()=>{
 const verified=read('data/llm/sources/llama-vulkan-2026-09-28/verification.json');
 assert.equal(verified.release.prerelease,true);
 assert.equal(verified.release.published_at,'2026-09-28T07:06:08Z');
 assert.equal(verified.pullRequest.merged,true);
 assert.equal(verified.release.target_commitish,verified.pullRequest.merge_commit_sha);
 assert.equal(verified.runtimeTested,false);
 assert.equal(canonical.softwareReleases.find(x=>x.version==='b11224').releaseChannel,'prerelease');
 for(const collection of ['benchmarkRuns','publishedEvaluations','softwareCapabilities','modelProfiles','hardwareConfigurations'])assert.doesNotMatch(JSON.stringify(canonical[collection]),/b11224|vulkan-28956/);
});
