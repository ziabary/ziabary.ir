import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {loadLlmModules} from './helpers/llm-modules.mjs';
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const canonical=read('data/llm/v0.3.0/repository.json'),m=await loadLlmModules();
const id='model:zai-org-glm-5-3-bf16';
test('GLM security conditions and sources survive localization and table adaptation',()=>{
 for(const locale of ['fa','en','es']){
  const i=m['i18n/runtime'].createLlmI18n(locale,read(`data/llm/locales/messages.${locale}.json`),m['i18n/runtime'].resolveRecordTranslations(read(`data/llm/locales/records.${locale}.json`)));
  const repo=m['i18n/runtime'].localizeLlmRepository(canonical,i);
  const row=m.adapters.createLlmAdapters(i).buildLlmViewRows(repo)['model-catalog'].find(x=>x.id===id);
  assert.match(row.cells['use-condition'].display,/NIST.*Anthropic/);
  assert.match(row.cells['use-condition'].display,/sandbox/);
  assert.ok(row.sourceIds.includes('evidence:glm53-anthropic-cyber-20260929'));
  if(locale!=='fa')assert.doesNotMatch(row.cells['use-condition'].display,/[\u0600-\u06ff]/);
 }
});
test('wizard warning requires GLM shortlist and an agent or security task',()=>{
 const full=m.research.enrichResearchRepository(m.guide.llmRepository);
 // Isolate candidate selection, keeping real model metadata and selection logic.
 const repo={...full,models:full.models.filter(x=>x.id===id)};
 const base={task:'coding',codingMode:'agent',sourceLanguage:'en',outputLanguage:'en',sources:'provided',format:'text',deployment:'self',hardware:'none',policy:'internal',owner:'experienced'};
 for(const locale of ['fa','en','es']){
  for(const codingMode of ['agent','security']){
   const result=m.wizard.buildWizardResult(repo,{...base,codingMode},locale);
   assert.ok(result.candidates.some(c=>c.model.id===id),JSON.stringify(result.reviews));
   assert.equal(result.decisions.find(d=>d.id==='glm53-cyber-security')?.status,'conditional');
  }
  for(const answers of [{...base,codingMode:'assistant'},{...base,task:'writing'},{...base,deployment:'api',policy:'public'}])assert.ok(!m.wizard.buildWizardResult(repo,answers,locale).decisions.some(d=>d.id==='glm53-cyber-security'));
  assert.ok(!m.wizard.buildWizardResult({...full,models:full.models.filter(x=>x.id!==id)},base,locale).decisions.some(d=>d.id==='glm53-cyber-security'));
 }
});
