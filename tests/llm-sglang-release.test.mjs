import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {loadLlmModules} from './helpers/llm-modules.mjs';
const m=await loadLlmModules();
const read=path=>JSON.parse(fs.readFileSync(path,'utf8'));
const canonical=read('data/llm/v0.3.0/repository.json');
const oldId='software-release:sglang-v0-5-19',newId='software-release:sglang-v0-5-20';
test('SGLang release notes stay with their own version in every edition',()=>{
 for(const locale of ['fa','en','es']){
  const i=m['i18n/runtime'].createLlmI18n(locale,read(`data/llm/locales/messages.${locale}.json`),m['i18n/runtime'].resolveRecordTranslations(read(`data/llm/locales/records.${locale}.json`)));
  const repository=m['i18n/runtime'].localizeLlmRepository(canonical,i);
  const research=m.research.createLlmResearch(i),views=m['research-views'].createLlmResearchViews(i),adapters=m.adapters.createLlmAdapters(i);
  const r=research.enrichResearchRepository(repository);
  const rows=views.enrichExistingRows(r,adapters.buildLlmViewRows(r),'all')['software-products'];
  const old=rows.find(x=>x.id===oldId),latest=rows.find(x=>x.id===newId);
  assert.ok(old&&latest);
  assert.match(latest.cells['research-condition'].display,/CUDA 12/);
  assert.match(latest.cells['research-condition'].display,/0\.5\.19/);
  assert.match(latest.cells['research-condition'].display,/--enable-response-store/);
  assert.doesNotMatch(old.cells['research-condition'].display,/--enable-response-store/);
  assert.equal(old.details['research-version'].display,'v0.5.19');
  assert.notEqual(latest.details['research-version']?.display,'v0.5.19');
  assert.equal(latest.facets['software-version'].display,'v0.5.20');
  assert.equal(old.facets['software-version'].display,'v0.5.19');
  assert.match(latest.details['api-compatibility'].display,/previous_response_id/);
  assert.match(latest.details['api-compatibility'].display,/PD/);
  if(locale!=='fa')assert.doesNotMatch(JSON.stringify([latest.cells,latest.details]),/[\u0600-\u06ff]/);
  assert.ok(latest.sourceIds.includes('evidence:sglang-v0-5-20-cuda12'));
 }
});
test('new Responses compatibility is conditional and scoped to the new release',()=>{
 const claim=canonical.apiCompatibility.find(x=>x.id==='api-compatibility:sglang-v0-5-20-responses');
 assert.equal(claim.status,'conditional');assert.equal(claim.scope.softwareReleaseId,newId);
 assert.match(claim.statusReason,/--enable-response-store/);assert.match(claim.limitations[0],/store=true/);
 assert.ok(canonical.softwareReleases.some(x=>x.id===newId&&x.releasedOn==='2026-09-18'&&x.lastReviewedOn==='2026-09-21'));
 assert.ok(!canonical.benchmarkRuns.some(x=>JSON.stringify(x).includes(newId)));
});
