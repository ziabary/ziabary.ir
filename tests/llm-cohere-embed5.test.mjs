import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {loadLlmModules} from './helpers/llm-modules.mjs';
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const canonical=read('data/llm/v0.3.0/repository.json'),m=await loadLlmModules();
const ids=['model:cohere-embed-v5-pro','model:cohere-embed-v5-fast'];
for(const locale of ['fa','en','es']){
 const i=m['i18n/runtime'].createLlmI18n(locale,read(`data/llm/locales/messages.${locale}.json`),m['i18n/runtime'].resolveRecordTranslations(read(`data/llm/locales/records.${locale}.json`)));
 const repo=m.research.createLlmResearch(i).enrichResearchRepository(m['i18n/runtime'].localizeLlmRepository(canonical,i));
 test(`Embed 5 specialist rows preserve declared versus measured data (${locale})`,()=>{
  const rows=m.adapters.createLlmAdapters(i).buildLlmViewRows(repo)['specialized-models'];
  for(const id of ids){
   const model=repo.models.find(x=>x.id===id),assessment=repo.specializedAssessments.find(x=>x.modelVersionId===id),row=rows.find(x=>x.id===assessment.id);
   assert.ok(row);assert.equal(model.accessMode,'commercial-service');
   assert.equal(model.releasedOn,'2026-09-30');assert.equal(model.declaredContext.value,128000);
   assert.equal(model.persianEvidenceStatus,'publisher-claimed');assert.equal(assessment.metricValue.state,'not-measured');
   assert.ok(model.languages.some(l=>l.language==='fa'&&l.declared.value));
   assert.equal(model.specializedSpecs.embeddingDimensions.value,2048);
   for(const token of ['float','int8','binary'])assert.ok(row.cells.output.display.includes(token));
   assert.ok(row.cells.features.display.includes('Model Vault'));
   assert.ok(row.cells.features.display.includes('Pro/Fast'));
   assert.ok(!repo.artifacts.some(x=>x.modelVersionId===id));assert.ok(!repo.artifactListings.some(x=>x.modelVersionId===id));
   assert.ok(!repo.publishedEvaluations.some(x=>x.modelVersionId===id));
   if(locale!=='fa')assert.doesNotMatch(JSON.stringify([row.cells,row.details]),/[\u0600-\u06ff]/);
  }
 });
 const base={task:'documents',sources:'archive',format:'text',mode:'interactive',policy:'public',deployment:'api',sourceLanguage:'fa',outputLanguage:'fa',serviceAccess:'review'};
 const option=changes=>m.wizard.buildWizardResult(repo,{...base,...changes},locale).decisions.find(d=>d.id==='cohere-embed5-api-rag');
 test(`shared-index option is restricted to compatible API RAG (${locale})`,()=>{
  for(const changes of [{},{format:'scan'},{format:'media',mediaType:'image'},{deployment:'compare',hardware:'gpu',vram:'24'}]){
   const d=option(changes);assert.equal(d?.status,'conditional');assert.match(d.conclusion,/embed-v5.0-pro/);assert.match(d.conclusion,/embed-v5.0-fast/);assert.match(d.conclusion,/search_document/);assert.match(d.conclusion,/search_query/);
  }
  for(const changes of [{deployment:'self'},{deployment:'managed'},{policy:'internal'},{policy:'dedicated'},{policy:'mixed'},{serviceAccess:'limited'},{sources:'provided'},{task:'unknown'},{format:'media',mediaType:'audio'},{format:'media',mediaType:'video'},{format:'media',mediaType:'both'}])assert.equal(option(changes),undefined,JSON.stringify(changes));
 });
 test(`commercial models never enter local ranking or memory estimation (${locale})`,()=>{
  for(const vram of ['24','48']){
   const calls=[];const estimate=(model)=>{calls.push(model.id);return undefined;};
   const answers={...base,deployment:'self',hardware:'gpu',vram,ram:'64'};
   const result=m.wizard.buildWizardResult(repo,answers,locale,estimate);
   for(const items of [result.candidates,result.specialists,result.reviews])assert.ok(items.every(x=>!ids.includes(x.model.id)));
   assert.ok(calls.every(id=>!ids.includes(id)));
   const before={...repo,models:repo.models.filter(x=>!ids.includes(x.id))};
   const baseline=m.wizard.buildWizardResult(before,answers,locale,estimate);
   assert.deepEqual(result.candidates,baseline.candidates);assert.deepEqual(result.specialists,baseline.specialists);
  }
 });
}
