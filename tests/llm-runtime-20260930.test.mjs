import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {loadLlmModules} from './helpers/llm-modules.mjs';
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const canonical=read('data/llm/v0.3.0/repository.json'),m=await loadLlmModules();
const cpuId='software-release:llama-cpp-b11262',ollamaId='software-release:ollama-v0-35-1-rc0';
test('prerelease correctness and SystemOne conditions render in all three editions',()=>{
 for(const locale of ['fa','en','es']){
  const i=m['i18n/runtime'].createLlmI18n(locale,read(`data/llm/locales/messages.${locale}.json`),m['i18n/runtime'].resolveRecordTranslations(read(`data/llm/locales/records.${locale}.json`)));
  const repo=m.research.createLlmResearch(i).enrichResearchRepository(m['i18n/runtime'].localizeLlmRepository(canonical,i));
  const rows=m['research-views'].createLlmResearchViews(i).enrichExistingRows(repo,m.adapters.createLlmAdapters(i).buildLlmViewRows(repo),'all')['software-products'];
  for(const [id,tokens] of [[cpuId,['AVX512-FP16','FP32','b11262+']],[ollamaId,['CAPABILITY decision','/v1/systemone','GGUF-only scoring','MLX','Nimble','Tev1','Safetensors']]]){
   const row=rows.find(x=>x.id===id);assert.ok(row);
   for(const token of tokens)assert.ok(row.cells['research-condition'].display.includes(token),`${locale} ${id}: ${token}`);
   assert.ok(row.cells['software-version'].display.includes(i.t('software.prerelease')));
   if(locale!=='fa')assert.doesNotMatch(JSON.stringify([row.cells,row.details]),/[\u0600-\u06ff]/);
   const release=canonical.softwareReleases.find(x=>x.id===id);assert.equal(release.releaseChannel,'prerelease');assert.equal(release.releasedOn,'2026-09-29');
   assert.ok(!canonical.benchmarkRuns.some(x=>JSON.stringify(x).includes(id)));
  }
  assert.match(rows.find(x=>x.id==='software-release:llama-cpp-v0-5-0').cells['research-condition'].display,/b11262/);
 }
});
test('CPU warning needs a declared AVX512-FP16 path and llama.cpp candidate',()=>{
 const repo=m.research.enrichResearchRepository(m.guide.llmRepository);
 const base={task:'writing',writingTask:'summary',sources:'provided',sourceLanguage:'en',outputLanguage:'en',inputSize:'short',mode:'interactive',policy:'internal',deployment:'self',hardware:'cpu',ram:'32',audience:'personal',owner:'none',cpuAvx512Fp16:'yes'};
 const has=r=>r.decisions.some(d=>d.id==='llama-avx512-fp16-correctness');
 for(const locale of ['fa','en','es']){
  const result=m.wizard.buildWizardResult(repo,base,locale);
  assert.ok(result.candidates.some(c=>c.runtime==='llama.cpp'));assert.ok(has(result));
  for(const change of [{cpuAvx512Fp16:'no'},{cpuAvx512Fp16:'unknown'},{cpuAvx512Fp16:''},{hardware:'gpu',vram:'24'},{deployment:'api',policy:'public'},{task:'unknown'}])assert.ok(!has(m.wizard.buildWizardResult(repo,{...base,...change},locale)),JSON.stringify(change));
  assert.equal(m.wizard.cleanWizard({...base,hardware:'gpu'},locale).cpuAvx512Fp16,undefined);
  const noLlama={...repo,modelProfiles:repo.modelProfiles.map(p=>({...p,runGuides:p.runGuides.filter(g=>g.engine!=='llama.cpp')}))};
  assert.ok(!has(m.wizard.buildWizardResult(noLlama,base,locale)));
 }
});
