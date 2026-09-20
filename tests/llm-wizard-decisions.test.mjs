import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {loadLlmModules} from './helpers/llm-modules.mjs';
const m=await loadLlmModules(),w=m.wizard,repo=m.research.enrichResearchRepository(m.guide.llmRepository);
const memory=(model,a)=>w.wizardMemory(model,a,m.research.research.artifacts,m.research.calculateMemory);
const base={task:'writing',writingTask:'summary',sources:'provided',sourceLanguage:'en',outputLanguage:'en',inputSize:'long',mode:'interactive',users:'5',concurrency:'1',policy:'internal',deployment:'self',hardware:'none',currency:'million-toman',usdRate:'230000'};
const result=(changes={},locale='fa')=>w.buildWizardResult(repo,{...base,...changes},locale,memory);
const get=(r,id)=>r.decisions.find(d=>d.id===id);
test('no equipment differs from unspecified equipment; zero budgets expose a real funding conflict',()=>{
 assert.ok(get(result(),'provision-pilot'));assert.ok(get(result({hardware:'unknown'}),'inspect-equipment'));
 assert.equal(get(result({capex:'0',monthly:'0'}),'no-procurement-budget').status,'not-feasible');
 assert.ok(!result().unknowns.some(x=>/حافظهٔ آزاد تجهیزات/.test(x)));
});
test('concurrency is distinct from users and queues, no silent clamp; calculator overflow is explicit',()=>{
 const r=result({concurrency:'100'});assert.equal(r.answers.concurrency,'100');assert.ok(get(r,'load-definition'));assert.ok(get(r,'central-service'));
 assert.ok(!get(result({concurrency:'100',loadDefinition:'machines'}),'load-definition'));
 assert.ok(get(result({concurrency:'100',loadDefinition:'queued'}),'central-service').conclusion.includes('صف'));
 const outside=result({hardware:'gpu',vram:'24',ram:'64',inputTokens:'4096',outputTokens:'512',concurrency:'129',loadDefinition:'active',upgrade:'existing'});
 assert.ok(get(outside,'memory-domain'));assert.ok(outside.candidates.every(c=>c.memoryStatus==='outside-calculator'&&c.status==='conditional'));
 assert.ok(get(result({users:'5000'}),'user-management'));assert.ok(!get(result(),'user-management'));
});
test('positive budgets affect procurement feasibility without inventing workload costs',()=>{
 const low=result({capex:'5'}),high=result({capex:'5000'});assert.equal(low.costComparison.withinBudget,false);assert.equal(high.costComparison.withinBudget,true);
 assert.ok(get(low,'purchase-example-shortfall'));assert.ok(get(high,'purchase-example-covered'));assert.equal(high.costComparison.exampleToman,1116100000);
 assert.equal(result({currency:'usd',capex:'5000'},'en').costComparison,undefined);
});
test('ownership, latency and acceptance materially change delivery',()=>{
 assert.ok(get(result({owner:'none'}),'managed-operations'));assert.ok(get(result({owner:'experienced'}),'internal-operations'));
 assert.ok(get(result({fullResponse:'5'}),'tight-latency'));assert.ok(get(result({fullResponse:'300'}),'latency-headroom'));
 assert.ok(get(result({risk:'review'}),'review-workflow'));assert.ok(get(result({risk:'direct'}),'release-gate'));
 assert.ok(get(result({success:'editing'}),'success-editing'));assert.ok(get(result({success:'exact'}),'success-exact'));
});
test('long-document processing differs from archive retrieval even with short queries',()=>{
 const long=result(),archive=result({task:'documents',sources:'archive',inputSize:'short'});
 assert.ok(get(long,'summary-route'));assert.equal(long.specialists.length,0);
 assert.ok(get(archive,'archive'));assert.equal(archive.specialists[0].model.kind,'embedding');
 assert.equal(archive.specialists.some(s=>s.model.kind==='reranker'),false);
 const ranked=result({task:'documents',sources:'archive',existing:'yes',failure:'ranking',inputSize:'short'});
 assert.ok(ranked.specialists.some(s=>s.model.kind==='reranker'));
});
test('archive scale, freshness and permissions alter ingestion and retrieval',()=>{
 const small=result({task:'documents',sources:'archive',archiveSize:'10',freshness:'rare'}),large=result({task:'documents',sources:'archive',archiveSize:'1000000',freshness:'daily',access:'roles'});
 assert.notEqual(get(small,'index').conclusion,get(large,'index').conclusion);
 assert.ok(get(small,'refresh-rare'));assert.ok(get(large,'refresh-daily'));assert.ok(get(large,'permissions'));assert.ok(!get(small,'permissions'));
});
test('agent connections and action authority determine components and acceptance',()=>{
 const read=result({task:'operations',connection:'api',authority:'read'}),write=result({task:'operations',connection:'ui',authority:'approval'});
 assert.ok(get(read,'tool-connection-api'));assert.ok(get(write,'tool-connection-ui'));assert.ok(get(read,'authority-read'));assert.ok(get(write,'authority-approval'));
});
test('batch rate is calculated from volume and deadline, not fabricated benchmark performance',()=>{
 const r=result({mode:'batch',batchCount:'1000',deadline:'4'});assert.equal(r.batch.itemsPerHour,250);assert.equal(r.batch.secondsPerCompletion,14.4);
 assert.equal(result({mode:'batch',batchCount:'1000',deadline:'24'}).batch.itemsPerHour,1000/24);
});
test('monthly tokens use means, not maxima; assumptions remain separate from answers',()=>{
 const r=result({requests:'100',averageInputTokens:'500',averageOutputTokens:'100',outputTokens:'9999'});
 assert.equal(r.monthlyTokens.input,1100000);assert.equal(r.monthlyTokens.output,220000);assert.equal(r.answers.workdays,undefined);
 assert.ok(get(r,'token-volume').assumptions.length);assert.equal(result({requests:'100',inputTokens:'500',outputTokens:'100'}).monthlyTokens,undefined);
 const declared=w.buildWizardResult(repo,{...base,requests:'100'},'fa',memory,{requests:'measured'});assert.equal(declared.provenance.requests.status,'measured');
});
test('new metadata-backed model is assessed and selectable without a name list',()=>{
 const starting=result().candidates[0];assert.ok(starting);const copy=structuredClone(repo),old=starting.model.id,newId='model:test-future-release';
 const model={...structuredClone(starting.model),id:newId,exactName:'Future test release',version:'a'.repeat(40)};copy.models.push(model);
 for(const key of ['modelProfiles','modelUseGuidance','applicationAssessments','publishedEvaluations','artifacts','artifactListings'])copy[key].push(...copy[key].filter(x=>x.modelVersionId===old).map((x,i)=>({...structuredClone(x),id:`${key}:future-${i}`,modelVersionId:newId,...(key==='artifactListings'?{totalBytes:1024}:{} )})));
 const r=w.buildWizardResult(copy,base,'fa');assert.ok(r.reviews.find(c=>c.model.id===newId));assert.ok(r.candidates.some(c=>c.model.id===newId));
});
test('Qwen3.6 has pinned artifacts, hybrid attention and native/extended context; all models have a review',()=>{
 const r=result();assert.equal(r.reviews.length,repo.models.length);
 for(const name of ['Qwen3.6-27B','Qwen3.6-35B-A3B']){const model=repo.models.find(m=>m.exactName===name);assert.ok(model);assert.match(model.version,/^[a-f0-9]{40}$/);assert.equal(model.declaredContext.value,262144);assert.equal(model.contextExtension.capacity.value,1010000);assert.equal(model.attentionArchitecture,'hybrid');assert.ok(repo.artifactListings.some(a=>a.modelVersionId===model.id&&a.totalBytes>40e9));assert.ok(r.reviews.find(c=>c.model.id===model.id));}
 const api=JSON.parse(fs.readFileSync('data/llm/api-models.json'));assert.equal(api.length,4);assert.ok(api.every(a=>a.availability==='api-available'&&a.selfHosting==='not-verified'));assert.ok(!r.candidates.some(c=>c.model.exactName.startsWith('Qwen3.7')));
});
test('mixed language is not Persian; same logic across locales and existing license policy retained',()=>{
 assert.deepEqual(w.workloadLanguages({...base,sourceLanguage:'mixed',outputLanguage:'multi'}),['fa','en']);
 const ids=l=>result({},l).decisions.filter(d=>d.area!=='model').map(d=>d.id);assert.deepEqual(ids('fa'),ids('en'));assert.deepEqual(ids('en'),ids('es'));
 const denied={...repo.models[0],license:{...repo.models[0].license,commercialUse:{state:'known',value:'prohibited',evidenceIds:[]}}};assert.equal(w.wizardLicense(denied,'fa'),'ignored');assert.equal(w.wizardLicense(denied,'en'),'noncommercial');
});
test('quick result needs task, not all details; valid child answers survive changes',()=>{
 assert.equal(w.wizardComplete({task:'writing'},'fa'),true);assert.ok(w.QUICK_QUESTIONS.includes('codingMode')); assert.ok(w.QUICK_QUESTIONS.includes('sourceLanguages'));
 const changed=w.changeWizard({...base,writingTask:'summary',sources:'archive',freshness:'daily'},'task','extraction');assert.equal(changed.writingTask,undefined);assert.equal(changed.sources,'archive');assert.equal(changed.freshness,'daily');
 const noarchive=w.changeWizard({...base,sources:'archive',freshness:'daily'},'sources','provided');assert.equal(noarchive.freshness,undefined);
});
test('one result drives technical handoff and filtered links; calculations carry traceable evidence',()=>{
 const r=result(),ids=r.candidates.map(c=>c.model.id);const url=new URL(w.wizardTableHref(new URL('https://example.test/en/guides/llm/?show-drafts=true&model=stale'),ids),'https://example.test');assert.deepEqual(JSON.parse(url.searchParams.get('s_model-catalog')).ids,ids);
 assert.ok(r.candidates.every(c=>r.decisions.some(d=>d.id===c.model.id&&d.evidenceIds.length)));
 for(const d of r.decisions){assert.ok(d.id&&d.area&&d.status);assert.ok(Array.isArray(d.answerIds)&&Array.isArray(d.assumptions));}
});
test('API estimate uses explicit dated regional tariff and billed means, with independent budget comparison',()=>{
 const a={task:'writing',writingTask:'translation',policy:'public',deployment:'api',serviceAccess:'confirmed',apiCostExample:'qwen37-plus-singapore',mode:'interactive',requests:'100',workdays:'20',averageInputTokens:'500',averageOutputTokens:'100',maxTokens:'1000',currency:'usd',monthly:'1'};
 const r=w.buildWizardResult(repo,a,'en');assert.equal(r.apiCost.usd,0.72);assert.equal(r.apiCost.tariff.region,'Singapore / International');assert.ok(get(r,'api-within-budget'));
 assert.ok(get(w.buildWizardResult(repo,{...a,monthly:'0.5'},'en'),'api-over-budget'));
 assert.equal(w.buildWizardResult(repo,{...a,maxTokens:'unknown'},'en').apiCost,undefined);
 assert.equal(w.buildWizardResult(repo,{...a,averageOutputTokens:'unknown',outputTokens:'2000'},'en').apiCost,undefined);
 assert.equal(w.buildWizardResult(repo,{...a,policy:'internal'},'en').apiCost,undefined);
});
test('scan compares OCR and vision; multilingual answers remain explicit and translation has its own acceptance',()=>{
 assert.ok(get(result({format:'scan'}),'scan-routes'));
 const translation=result({writingTask:'translation'});assert.ok(get(translation,'translation'));assert.ok(!get(translation,'summary'));
});
test('memory scenarios are tagged assumptions, never overwrite unknown input or claim hybrid KV',()=>{
 const r=result({hardware:'gpu',vram:'24',ram:'64',inputTokens:'unknown',maxTokens:'unknown',outputTokens:'512',concurrency:'unknown'});
 assert.equal(r.answers.inputTokens,'unknown');assert.equal(r.answers.concurrency,'unknown');
 for(const s of r.memoryScenarios){assert.equal(s.basis,'estimate');assert.ok(s.assumptions);assert.ok(s.memory.budgetGiB>0);}
 const hybrid=repo.models.find(m=>m.exactName==='Qwen3.6-27B');assert.equal(memory(hybrid,{...base,hardware:'gpu',inputTokens:'4096',outputTokens:'512',concurrency:'1'}),undefined);
});
test('short simple Persian work starts with Aya Expanse 8B without overriding feasibility or other tasks',()=>{
 const id='model:coherelabs-aya-expanse-8b';
 const a={...base,task:'writing',writingTask:'rewriting',inputSize:'short',format:'text',sourceLanguage:'fa',outputLanguage:'fa',inputTokens:'1024',outputTokens:'512',licenseUse:'research'};
 for(const locale of ['fa','en','es']){
  for(const task of ['writing','extraction','general']){
   const r=w.buildWizardResult(repo,{...a,task},locale,memory);
   assert.equal(r.candidates[0].model.id,id);assert.ok(r.candidates[0].startingPreference);
   assert.ok(get(r,id).answerIds.includes('inputSize'));
   assert.deepEqual(w.wizardCandidates(repo,{...a,task},locale,memory).map(c=>c.model.id),r.candidates.map(c=>c.model.id));
  }
 }
 for(const patch of [{sourceLanguage:'en'},{outputLanguage:'en'},{sourceLanguage:'mixed'},{inputSize:'long'},{inputSize:'unknown'},{maxTokens:'8000'},{outputTokens:'4096'},{task:'coding',codingMode:'assistant'},{task:'operations'},{sources:'archive'},{format:'scan'},{output:'long'}]){
  const r=w.buildWizardResult(repo,{...a,...patch},'fa',memory);
  assert.ok(!r.reviews.find(c=>c.model.id===id).startingPreference,JSON.stringify(patch));
 }
 const constrained=w.buildWizardResult(repo,{...a,hardware:'gpu',vram:'1',ram:'16',upgrade:'existing',capex:'0'},'fa',memory);
 assert.equal(constrained.reviews.find(c=>c.model.id===id).status,'excluded');
 assert.ok(!constrained.candidates.some(c=>c.model.id===id));
});
test('professional GPU serving prefers documented vLLM with native weights, not smaller MLX or GGUF files',()=>{
 const a={...base,phase:'production',audience:'organization',hardware:'gpu',vram:'24',ram:'64',upgrade:'existing',inputSize:'short',inputTokens:'1024',outputTokens:'512',concurrency:'2',loadDefinition:'active'};
 for(const locale of ['fa','en','es']){
  const r=w.buildWizardResult(repo,a,locale,memory);
  const q=r.reviews.find(c=>c.model.id==='model:qwen-qwen3-4b');
  assert.equal(q.runtime,'vLLM');assert.ok(q.weightGiB>7&&q.weightGiB<8);assert.equal(q.memory,undefined);
  assert.ok(q.runtimeUrl.includes('Qwen3-4B'));assert.ok(q.artifactUrl.includes('Qwen/Qwen3-4B/'));
  const instruct=r.reviews.find(c=>c.model.id==='model:qwen-qwen3-4b-instruct-2507');
  assert.equal(instruct.runtime,'vLLM');assert.ok(instruct.weightGiB>7);assert.ok(!instruct.artifactUrl.includes('mlx-community'));
  assert.ok(r.candidates.some(c=>c.runtime==='vLLM'));assert.ok(get(r,'serving-runtime'));
  assert.ok(r.candidates.every(c=>c.runtime!=='vLLM'||!c.memory));
  const unknown=w.buildWizardResult(repo,{...a,inputTokens:'unknown',maxTokens:'unknown'},locale,memory);
  assert.ok(unknown.memoryScenarios.every(s=>unknown.candidates.find(c=>c.model.id===s.modelId)?.runtime!=='vLLM'));
 }
});
test('CPU, fixed VRAM and absent model support keep explicit runtime exceptions',()=>{
 const a={...base,phase:'production',hardware:'gpu',vram:'6',upgrade:'existing',inputSize:'short',inputTokens:'1024',outputTokens:'512',concurrency:'1'};
 const limited=w.buildWizardResult(repo,a,'fa',memory).reviews.find(c=>c.model.id==='model:qwen-qwen3-4b');
 assert.equal(limited.runtime,'llama.cpp');assert.ok(limited.weightGiB<3);assert.match(limited.runtimeReason,/حافظه/);assert.notEqual(limited.status,'excluded');
 const cpu=w.buildWizardResult(repo,{...a,hardware:'cpu',ram:'32'},'en',memory).reviews.find(c=>c.model.id==='model:qwen-qwen3-4b');
 assert.equal(cpu.runtime,'llama.cpp');assert.match(cpu.runtimeReason,/CPU/);
 const apple=w.buildWizardResult(repo,{...a,gpuName:'Apple M4',vram:'32'},'en',memory).reviews.find(c=>c.model.id==='model:qwen-qwen3-4b');assert.equal(apple.runtime,'llama.cpp');assert.match(apple.runtimeReason,/Apple Silicon/);
 const personal=w.buildWizardResult(repo,{...a,phase:'pilot',audience:'personal',hardware:'gpu',vram:'24',users:'1'},'fa',memory).reviews.find(c=>c.model.id==='model:qwen-qwen3-4b');
 assert.equal(personal.runtime,'llama.cpp');assert.equal(personal.runtimeReason,'');
 const copy=structuredClone(repo);const p=copy.modelProfiles.find(p=>p.modelVersionId==='model:qwen-qwen3-4b');p.runGuides=p.runGuides.filter(g=>g.engine!=='vLLM');
 const fallback=w.buildWizardResult(copy,{...a,vram:'24'},'en',memory).reviews.find(c=>c.model.id===p.modelVersionId);
 assert.equal(fallback.runtime,'SGLang');assert.ok(fallback.runtimeReason);assert.equal(fallback.memory,undefined);
 const tiny=w.buildWizardResult(repo,{...a,vram:'1'},'fa',memory).reviews.find(c=>c.model.id===p.modelVersionId);assert.equal(tiny.status,'excluded');
});
test('Persian document Q&A starts with Aya in the initial result and retains retrieval and feasibility limits',()=>{
 const id='model:coherelabs-aya-expanse-8b';
 const a={task:'documents',sourceLanguage:'fa',outputLanguage:'fa'};
 const quick=w.buildWizardResult(repo,a,'fa',memory);
 assert.equal(quick.candidates[0].model.id,id);
 assert.equal(quick.candidates[0].status,'conditional');
 assert.match(quick.candidates[0].limit,/۸٬۱۹۲/);
 assert.equal(quick.answers.inputSize,undefined);
 assert.equal(quick.answers.inputTokens,undefined);
 const detailed={...a,sources:'archive',inputSize:'retrieved',format:'text',inputTokens:'2048',outputTokens:'512',policy:'internal',deployment:'self',hardware:'gpu',vram:'24',ram:'64',upgrade:'existing',mode:'interactive',concurrency:'1',licenseUse:'research'};
 for(const locale of ['fa','en','es']){
  const r=w.buildWizardResult(repo,detailed,locale,memory);
  assert.equal(r.candidates[0].model.id,id);
  assert.equal(r.candidates[0].runtime,'vLLM');
  assert.ok(r.specialists.some(c=>c.model.kind==='embedding'));
  assert.ok(get(r,'archive'));
  assert.deepEqual(w.wizardCandidates(repo,detailed,locale,memory).map(c=>c.model.id),r.candidates.map(c=>c.model.id));
 }
 for(const patch of [{inputSize:'long'},{inputSize:'history'},{sourceLanguage:'en'},{outputLanguage:'en'},{sources:'archive|live'},{format:'scan'},{output:'long'},{maxTokens:'8192'},{risk:'decision'}]){
  const r=w.buildWizardResult(repo,{...detailed,...patch},'fa',memory);
  assert.ok(!r.reviews.find(c=>c.model.id===id).startingPreference,JSON.stringify(patch));
 }
 const tooLong=w.buildWizardResult(repo,{...detailed,inputTokens:'8192'},'fa',memory);
 assert.equal(tooLong.reviews.find(c=>c.model.id===id).status,'excluded');
 const tooSmall=w.buildWizardResult(repo,{...detailed,vram:'1'},'fa',memory);
 assert.equal(tooSmall.reviews.find(c=>c.model.id===id).status,'excluded');
 assert.ok(!tooSmall.candidates.some(c=>c.model.id===id));
 // The Persian editorial preference does not waive commercial-license filtering in translations.
 assert.ok(!w.buildWizardResult(repo,{...a,licenseUse:'commercial'},'en',memory).candidates.some(c=>c.model.id===id));
});
test('translation starts with dedicated models for documented language pairs and keeps a general baseline',()=>{
 for(const locale of ['fa','en','es'])for(const [sourceLanguage,outputLanguage] of [['en','fa'],['fa','en'],['en','es'],['es','fa']]){
  const r=w.buildWizardResult(repo,{task:'writing',writingTask:'translation',sourceLanguage,outputLanguage},locale,memory);
  assert.deepEqual(r.candidates.slice(0,2).map(c=>c.specialty),['translation','translation']);
  assert.equal(r.candidates[0].model.exactName,'Hy-MT2-1.8B');assert.ok(!r.candidates[2].specialty);
  assert.ok(r.candidates[0].specialtyReason);assert.equal(r.candidates[0].model.declaredContext.state,'unknown');
 }
 for(const a of [{task:'writing',writingTask:'summary'},{task:'writing',writingTask:'rewriting'},{task:'documents'},{task:'writing',writingTask:'translation',sourceLanguage:'fa',outputLanguage:'fa'}]){
  const r=w.buildWizardResult(repo,a,'fa');assert.ok(r.candidates.every(c=>!c.model.taskSpecializations?.some(s=>s.task==='translation')));
 }
 const unknown=w.buildWizardResult(repo,{task:'writing',writingTask:'translation',sourceLanguage:'other',outputLanguage:'fa'},'fa');assert.ok(get(unknown,'specialist-fallback'));assert.ok(unknown.candidates.every(c=>!c.specialty));
 const low=w.buildWizardResult(repo,{task:'writing',writingTask:'translation',sourceLanguage:'en',outputLanguage:'fa',policy:'internal',deployment:'self',hardware:'gpu',vram:'1',upgrade:'existing'},'fa');assert.ok(low.candidates.every(c=>!c.specialty));assert.ok(get(low,'specialist-fallback'));
});
test('coding specialties distinguish completion, assistance and agents without bypassing hardware',()=>{
 for(const [codingMode,task] of [['completion','code-completion'],['assistant','coding-assistant'],['agent','coding-agent']]){
  const a={task:'coding',codingMode,sourceLanguage:'fa',outputLanguage:'fa'};
  const r=w.buildWizardResult(repo,a,'fa');assert.equal(r.candidates[0].specialty,task);assert.ok(r.candidates[0].specialtyReason);
  if(codingMode==='completion')assert.ok(r.candidates.every(c=>c.specialty==='code-completion'));
  else assert.ok(r.candidates.every(c=>c.model.stage!=='base'));
  const low=w.buildWizardResult(repo,{...a,policy:'internal',deployment:'self',hardware:'gpu',vram:'12',upgrade:'existing'},'fa',memory);
  assert.ok(low.candidates.every(c=>!c.weightGiB||c.weightGiB<=12));
 }
 // Names are not a classifier: a renamed specialist retains priority, a renamed general model does not acquire it.
 const copy=structuredClone(repo);copy.models.find(c=>c.id==='model:qwen-qwen3-coder-30b-a3b-instruct').exactName='Renamed specialist';
 const a={task:'coding',codingMode:'agent'};const r=w.buildWizardResult(copy,a,'fa');assert.equal(r.candidates[0].model.exactName,'Renamed specialist');
});

test('workload language options are independent of the three interface editions',()=>{
 const codes=['fa','en','ar','de','fr','ru','zh','es'];
 for(const locale of ['fa','en','es'])for(const id of ['sourceLanguage','outputLanguage']){
  const q=w.wizardQuestions.find(q=>q.id===id),options=w.wizardOptions(q,locale);
  for(const code of codes)assert.ok(options.some(o=>o.value===code),`${locale}/${id}/${code}`);
  assert.ok(options.some(o=>o.value==='other'));
 }
 for(const code of codes){
  const a={task:'writing',writingTask:'translation',sourceLanguage:code,outputLanguage:'en'};
  for(const locale of ['fa','en','es'])assert.equal(w.cleanWizard(a,locale).sourceLanguage,code);
  assert.deepEqual(w.workloadLanguages(a),[...new Set([code,'en'])]);
 }
 assert.deepEqual(w.workloadLanguages({sourceLanguage:'other',outputLanguage:'unknown'}),[]);
});

test('translation supports documented Arabic, German, French, Russian and Chinese pairs',()=>{
 for(const locale of ['fa','en','es'])for(const code of ['ar','de','fr','ru','zh']){
  const a={task:'writing',writingTask:'translation',sourceLanguage:code,outputLanguage:'en'};
  const r=w.buildWizardResult(repo,a,locale);
  assert.equal(r.answers.sourceLanguage,code);
  assert.equal(r.candidates[0].specialty,'translation',`${locale}/${code}`);
  assert.ok(r.candidates[0].model.taskSpecializations.some(s=>s.languages?.includes(code)));
  assert.ok(!get(r,'specialist-fallback'));
  const same=w.buildWizardResult(repo,{...a,outputLanguage:code},locale);
  assert.ok(same.candidates.every(c=>!c.model.taskSpecializations?.some(s=>s.task==='translation')));
 }
 // An available UI option alone must never invent a model's support for that pair.
 const copy=structuredClone(repo);
 for(const model of copy.models)for(const s of model.taskSpecializations??[])if(s.task==='translation')s.languages=['en','es','fa'];
 const unsupported=w.buildWizardResult(copy,{task:'writing',writingTask:'translation',sourceLanguage:'ar',outputLanguage:'en'},'fa');
 assert.ok(unsupported.candidates.every(c=>!c.specialty));
 assert.equal(get(unsupported,'specialist-fallback').status,'conditional');
 assert.ok(unsupported.reviews.filter(c=>c.model.taskSpecializations?.some(s=>s.task==='translation')).every(c=>c.status==='excluded'));
});
