import test from 'node:test';
import assert from 'node:assert/strict';
import {loadLlmModules} from './helpers/llm-modules.mjs';
const m=await loadLlmModules(),w=m.wizard,repo=m.research.enrichResearchRepository(m.guide.llmRepository);
const base={task:'writing',writingTask:'translation',sourceLanguage:'en',outputLanguage:'fa',sources:'provided',format:'text',inputSize:'short',mode:'interactive',policy:'internal',deployment:'self',hardware:'none'};
const result=(a={},locale='fa')=>w.buildWizardResult(repo,{...base,...a},locale);
const decision=(r,id)=>r.decisions.find(d=>d.id===id);
test('F1 operation survives long inputs and archives; retrieval and tools compose independently',()=>{
 for(const locale of ['fa','en','es']){
  const long=result({inputSize:'long'},locale);assert.ok(decision(long,'translation-route'));assert.ok(!decision(long,'summary-route'));assert.ok(long.candidates.some(c=>c.specialty==='translation'));
  const files=result({sources:'archive',archiveRole:'process'},locale);assert.equal(files.retrieval,false);assert.ok(decision(files,'archive-files'));assert.equal(files.specialists.length,0);assert.ok(files.candidates.some(c=>c.specialty==='translation'));
  const references=result({sources:'archive',archiveRole:'reference'},locale);assert.equal(references.retrieval,true);assert.ok(references.specialists.length);assert.ok(references.candidates.some(c=>c.specialty==='translation'));
  const summary=result({writingTask:'summary',sources:'archive'},locale);assert.ok(decision(summary,'summary-route'));assert.equal(summary.retrieval,false);
  const docs=result({task:'documents',sources:'archive',inputSize:'short'},locale);assert.equal(docs.retrieval,true);
  const tools=result({task:'operations',sources:'archive|live',inputSize:'long'},locale);assert.ok(decision(tools,'connected'));assert.ok(decision(tools,'archive'));assert.ok(!decision(tools,'summary-route'));
 }
});
test('F2 expanded and mixed languages have completable, source-backed paths',()=>{
 assert.deepEqual(w.workloadLanguages({sourceLanguage:'mixed',outputLanguage:'fa'}),['fa','en']);
 for(const locale of ['fa','en','es']){
  const a={sourceLanguage:'multi',sourceLanguages:'ar|de|zh',outputLanguage:'other',outputLanguages:'fa'};
  const r=result(a,locale);assert.equal(r.answers.sourceLanguages,'ar|de|zh');assert.deepEqual(w.workloadLanguages(r.answers),['ar','de','zh','fa']);assert.ok(r.candidates.some(c=>c.specialty==='translation'));assert.ok(!r.followups.some(x=>x.id==='languages'));
  for(const c of r.candidates.filter(c=>c.specialty==='translation'))assert.ok(w.workloadLanguages(r.answers).every(l=>c.model.taskSpecializations.find(s=>s.task==='translation').languages.includes(l)));
 }
 const pending=result({sourceLanguage:'other'});assert.ok(pending.followups.some(x=>x.id==='languages'));assert.ok(pending.candidates.every(c=>c.status==='conditional'));
 const changed=w.changeWizard(result({sourceLanguage:'multi',sourceLanguages:'ar|de'}).answers,'sourceLanguage','en');assert.equal(changed.sourceLanguages,undefined);
});
test('F3 precise new revisions, directional training evidence and input limits remain separate',()=>{
 for(const name of ['Hy-MT2-1.8B','Hy-MT2-7B','Hy-MT2-30B-A3B','translategemma-4b-it','translategemma-12b-it','translategemma-27b-it','madlad400-3b-mt','nllb-200-distilled-600M']){
  const model=repo.models.find(x=>x.exactName===name);assert.ok(model,name);assert.match(model.version,/^[a-f0-9]{40}$/);assert.ok(repo.artifactListings.some(a=>a.modelVersionId===model.id&&a.files.length&&a.totalBytes));assert.ok(repo.modelProfiles.find(p=>p.modelVersionId===model.id).runGuides.length);
 }
 const tg=repo.models.find(x=>x.exactName==='translategemma-4b-it');assert.equal(tg.inputTokenLimit.value,2048);assert.notEqual(tg.declaredContext.state,'known');
 assert.ok(result({maxTokens:'3000'}).reviews.filter(c=>c.model.exactName.startsWith('translategemma')).every(c=>c.status==='excluded'));
 const reverse=result({sourceLanguage:'fa',outputLanguage:'en'});assert.ok(reverse.reviews.filter(c=>c.model.exactName.startsWith('translategemma')).every(c=>c.status==='excluded'));
 assert.ok(result().reviews.find(c=>c.model.researchOnly).status==='excluded');
});
test('F4 exact compact package changes eligibility without claiming full runtime memory',()=>{
 const r=result({hardware:'cpu',ram:'2',upgrade:'existing',inputTokens:'512',outputTokens:'512',concurrency:'1'});
 const c=r.reviews.find(c=>c.model.exactName==='HY-MT1.5-1.8B');assert.equal(c.runtime,'llama.cpp');assert.ok(c.weightGiB<2);assert.equal(c.memory,undefined);assert.equal(c.status,'conditional');assert.ok(c.artifactUrl.includes('GGUF'));
 const gpu=result({hardware:'gpu',vram:'12',phase:'production'}).reviews.find(c=>c.model.exactName==='Hy-MT2-7B');assert.equal(gpu.runtime,'vLLM');assert.ok(gpu.format.includes('fp8'));assert.ok(gpu.runtimeUrl.includes('FP8'));assert.equal(gpu.memory,undefined);
});
test('F5 API services identify provider, alias/snapshot, region and access separately from weights',()=>{
 const a={policy:'public',deployment:'api',serviceAccess:'confirmed',apiService:'qwen',apiRegion:'singapore'};
 const r=result(a);assert.equal(r.candidates.length,0);assert.deepEqual(r.apiCandidates.map(c=>c.id),['qwen-mt-flash','qwen-mt-plus']);assert.ok(r.apiCandidates.every(c=>c.provider&&c.snapshot&&c.endpoint&&c.accessConfirmed));
 assert.ok(result({...a,serviceAccess:'unknown'}).apiCandidates.every(c=>c.status==='conditional'&&!c.accessConfirmed));
 assert.equal(result({...a,serviceAccess:'unknown',apiService:'unknown',apiRegion:'unknown'}).followups[0].id,'api-selection');
 assert.equal(result({...a,serviceAccess:'limited'}).apiCandidates.length,0);assert.equal(result({...a,apiService:'other'}).apiCandidates.length,0);assert.equal(result({...a,apiRegion:'other'}).apiCandidates.length,0);
 const both=result({...a,deployment:'compare'});assert.ok(both.candidates.length&&both.apiCandidates.length);
 assert.ok(result({...a,writingTask:'summary'}).apiCandidates.some(c=>c.id==='qwen3.7-plus'));
 assert.equal(result({...a,maxTokens:'9000'}).apiCandidates.length,0);
});
test('F6 coding mode and conditional languages are available in the quick path',()=>{
 assert.ok(w.QUICK_QUESTIONS.includes('codingMode'));for(const mode of ['completion','assistant','agent']){const r=result({task:'coding',codingMode:mode});assert.ok(r.candidates[0].specialty.startsWith('cod'));}
});
test('F7 repetition changes monthly work; active throughput stays per batch and GPUs are not pooled',()=>{
 const a={mode:'batch',batchCount:'1000',deadline:'8',averageInputTokens:'100',averageOutputTokens:'50',workdays:'20'};
 const daily=result({...a,batchFrequency:'daily'}),monthly=result({...a,batchFrequency:'monthly'}),weekly=result({...a,batchFrequency:'weekly'});
 assert.equal(daily.monthlyTokens.input,2000000);assert.equal(monthly.monthlyTokens.input,100000);assert.equal(daily.batch.itemsPerHour,monthly.batch.itemsPerHour);assert.ok(decision(weekly,'batch-volume').assumptions.length);
 assert.equal(w.cleanWizard({...base,...a,batchFrequency:'daily'},'fa').averageInputTokens,'100');
 const monthlyDefault=result({...a,workdays:undefined,batchFrequency:'monthly'});assert.equal(monthlyDefault.monthlyTokens.assumedDays,false);assert.equal(decision(monthlyDefault,'token-volume').assumptions.length,0);
 const one=result({hardware:'gpu',gpuCount:'1',vram:'12'}),four=result({hardware:'gpu',gpuCount:'4',vram:'12'});assert.notEqual(decision(one,'gpu-topology').conclusion,decision(four,'gpu-topology').conclusion);assert.deepEqual(one.candidates.map(c=>c.model.id),four.candidates.map(c=>c.model.id));
});
test('F8 audio and images retain separate input paths',()=>{
 const audio=result({format:'media',mediaType:'audio'});assert.ok(decision(audio,'audio-transcription'));assert.ok(audio.candidates.some(c=>c.model.inputModalities.length===1));
 const image=result({format:'media',mediaType:'image'});assert.ok(!decision(image,'audio-transcription'));assert.ok(image.candidates.every(c=>c.model.inputModalities.includes('image')));
 assert.ok(decision(result({format:'media'}),'media-type'));
});
test('F9 card reasons retain operation and limitation; filesize is never total memory',()=>{
 const r=result({task:'operations',sources:'live'});for(const c of r.candidates){assert.match(c.reason,/ابزار/);assert.ok(c.limit);assert.doesNotMatch(c.difference??'',/حافظهٔ کمتری می‌خواهد/);}
 assert.ok(r.candidates.some(c=>c.taskReport));
});
