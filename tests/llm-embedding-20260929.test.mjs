import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {loadLlmModules} from './helpers/llm-modules.mjs';
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const canonical=read('data/llm/v0.3.0/repository.json'),m=await loadLlmModules();
for(const locale of ['fa','en','es'])test(`b11240 routes, filter and scoped wizard option (${locale})`,()=>{
 const i=m['i18n/runtime'].createLlmI18n(locale,read(`data/llm/locales/messages.${locale}.json`),m['i18n/runtime'].resolveRecordTranslations(read(`data/llm/locales/records.${locale}.json`)));
 const repo=m.research.createLlmResearch(i).enrichResearchRepository(m['i18n/runtime'].localizeLlmRepository(canonical,i));
 const rows=m.adapters.createLlmAdapters(i).buildLlmViewRows(repo);
 const software=m['research-views'].createLlmResearchViews(i).enrichExistingRows(repo,rows,'all')['software-products'].find(x=>x.id==='software-release:llama-cpp-v0-5-0');
 assert.match(software.cells['research-benefit'].display,/b11240/);
 assert.match(software.cells['research-condition'].display,/KV prefix reuse/);
 assert.ok(software.sourceIds.includes('evidence:llama-cpp-b11240-release'));
 for(const size of ['2b','8b']){
  const id=`model:qwen-qwen3-vl-embedding-${size}`;
  assert.equal(repo.models.filter(x=>x.id===id).length,1);
  const profile=repo.modelProfiles.find(x=>x.modelVersionId===id);
  const route=profile.runGuides.find(x=>x.engine==='llama.cpp');
  assert.match(route.label,/b11240/);assert.match(route.instructions,/KV prefix reuse/);
  assert.match(route.instructions,/content/);assert.match(route.conditions.join(' '),/GGUF/);
  const row=Object.values(rows).flat().find(x=>x.id===id&&x.facets?.['run-engine']);
  assert.ok(row, 'model row with deployment filter');
  assert.ok(JSON.stringify(row.facets['run-engine']).includes('llama.cpp'));
  assert.ok(repo.artifactListings.filter(x=>x.modelVersionId===id).every(x=>x.format!=='gguf'));
  assert.ok(!repo.modelProfiles.find(x=>x.modelVersionId===`model:qwen-qwen3-vl-reranker-${size}`).runGuides.some(x=>x.evidenceIds.includes('evidence:llama-cpp-b11240-release')));
  if(locale!=='fa')assert.doesNotMatch(JSON.stringify(route),/[\u0600-\u06ff]/);
 }
 const base={task:'documents',sources:'archive',format:'media',mediaType:'image',deployment:'self',sourceLanguage:'fa',outputLanguage:'fa'};
 const option=a=>m.wizard.buildWizardResult(repo,a,locale).decisions.find(x=>x.id==='multimodal-embedding-llama');
 for(const mediaType of ['image','video'])assert.equal(option({...base,mediaType})?.status,'conditional');
 for(const changes of [{format:'text'},{mediaType:'audio'},{deployment:'api'},{sources:'provided'},{task:'unknown'}])assert.equal(option({...base,...changes}),undefined);
});
