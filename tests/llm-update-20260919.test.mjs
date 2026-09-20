import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {loadLlmModules} from './helpers/llm-modules.mjs';
const m=await loadLlmModules(),repo=m.research.enrichResearchRepository(m.guide.llmRepository),w=m.wizard,s=m['score-scope'];
const json=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const input={task:'documents',sources:'archive',format:'text',inputSize:'retrieved',sourceLanguage:'fa',outputLanguage:'fa',policy:'internal',deployment:'self',hardware:'gpu',vram:'12',ram:'32',upgrade:'existing',capex:'0',mode:'interactive',concurrency:'2',loadDefinition:'active',inputTokens:'4096',outputTokens:'512',licenseUse:'commercial'};
const memory=(model,a)=>w.wizardMemory(model,a,m.research.research.artifacts,m.research.calculateMemory);
test('task branches actually change candidates; technical and contractor consume one plan',()=>{
 const documents=w.buildWizardResult(repo,input,'fa',memory);
 assert.equal(documents.candidates.length,3);assert.ok(!documents.candidates[0].model.id.includes('tiny-aya'));
 const coding=w.buildWizardResult(repo,{...input,task:'coding',codingMode:'agent',sources:'provided'},'fa',memory);
 assert.notDeepEqual(coding.candidates.map(c=>c.model.id),documents.candidates.map(c=>c.model.id));assert.equal(coding.specialists.length,0);
 const extraction=w.buildWizardResult(repo,{...input,task:'extraction',sources:'provided'},'fa',memory);
 assert.ok(extraction.decisions.some(d=>d.id==='schema'));assert.ok(!documents.decisions.some(d=>d.id==='schema'));
 const writing=w.buildWizardResult(repo,{...input,task:'writing',sources:'provided'},'fa',memory);assert.equal(writing.specialists.length,0);
 assert.equal(documents.specialists.length,1);assert.equal(documents.specialists[0].model.kind,'embedding');
 const ranking=w.buildWizardResult(repo,{...input,existing:'yes',failure:'ranking'},'fa',memory);assert.equal(ranking.specialists.length,2);
 assert.equal(w.buildWizardResult(repo,{...input,task:'unknown'},'fa',memory).candidates.length,0);
 for(const c of documents.candidates){assert.ok(repo.models.includes(c.model));assert.ok(c.source.includes(c.model.version));assert.ok(c.reason);if(c.status==='conditional')assert.ok(c.limit);}
});
test('unknown is not zero or permission; hidden branches are excluded and languages persist',()=>{
 assert.equal(w.cleanWizard({...input,policy:'unknown',deployment:'api'},'fa').deployment,undefined);
 const changed=w.changeWizard(input,'task','writing');assert.equal(changed.sources,'archive');assert.equal(changed.sourceLanguage,'fa');assert.equal(changed.vram,'12');
 const api=w.cleanWizard({...input,policy:'public',deployment:'api'},'fa');assert.equal(api.hardware,undefined);assert.equal(api.vram,undefined);
 const unknown=w.buildWizardResult(repo,{...input,inputTokens:'unknown',concurrency:'unknown'},'fa',memory);assert.ok(unknown.candidates.every(c=>!c.memory));assert.ok(unknown.unknowns.length<=3);
 assert.equal(w.cleanWizard({capex:'0',monthly:'unknown',concurrency:'0'},'fa').capex,'0');assert.equal(w.cleanWizard({capex:'0',monthly:'unknown',concurrency:'0'},'fa').concurrency,undefined);
 assert.equal(w.cleanWizard({inputTokens:'۴۰۹۶'},'fa').inputTokens,'4096');
 const batch=w.cleanWizard({...input,mode:'batch',batchCount:'100',deadline:'8'},'fa');assert.equal(batch.concurrency,undefined);assert.equal(batch.batchCount,'100');
 const q=id=>w.wizardQuestions.find(q=>q.id===id);assert.equal(w.visibleQuestion(q('failure'),{sources:'archive',existing:'no'},'fa'),false);assert.equal(w.visibleQuestion(q('codeScope'),{task:'coding'},'fa'),true);
});
test('load, input and equipment change memory and test targets without users or budget becoming model size',()=>{
 const base=w.buildWizardResult(repo,input,'fa',memory);const model=base.reviews.find(c=>c.status!=='excluded'&&c.memory&&c.model.declaredContext.state==='known'&&c.model.declaredContext.value>=16384).model;
 const a=memory(model,input),b=memory(model,{...input,concurrency:'5'}),c=memory(model,{...input,inputTokens:'8192'});assert.ok(b.budgetGiB>a.budgetGiB);assert.ok(c.budgetGiB>a.budgetGiB);
 const moreUsers=w.buildWizardResult(repo,{...input,users:'200',monthly:'100000000'},'fa',memory);assert.deepEqual(moreUsers.candidates.map(c=>c.model.id),base.candidates.map(c=>c.model.id));
 const moreLoad=w.buildWizardResult(repo,{...input,concurrency:'20',fullResponse:'10'},'fa',memory);assert.notDeepEqual(moreLoad.decisions.filter(d=>d.area==='capacity'),base.decisions.filter(d=>d.area==='capacity'));assert.ok(moreLoad.candidates.every(c=>!c.memory||c.memory.budgetGiB<=12));
 assert.equal(w.wizardCandidates(repo,{...input,vram:'0.01'},'fa',memory).length,0);
 const long=w.wizardCandidates(repo,{...input,maxTokens:'65536',upgrade:'possible',capex:'unknown'},'fa');assert.ok(long.every(c=>c.model.declaredContext.state!=='known'||c.model.declaredContext.value>=65536+512));
 const batch=w.buildWizardResult(repo,{...input,mode:'batch',batchCount:'100',deadline:'8'},'fa',memory);assert.equal(batch.batch.itemsPerHour,12.5);assert.ok(batch.candidates.every(c=>!c.memory));
});
test('exact candidate links replace stale states, keep edition and draft access and filter real rows',()=>{
 const current=new URL('http://localhost/es/guides/llm/?show-drafts=true&s_model-catalog=stale&r_hardware-feasibility=stale&model=old&view=benchmarks');
 const ids=w.wizardCandidates(repo,input,'fa',memory).map(c=>c.model.id),url=new URL(w.wizardTableHref(current,ids),current);
 assert.equal(url.searchParams.get('show-drafts'),'true');assert.equal(url.pathname,current.pathname);assert.equal(url.searchParams.get('model'),null);assert.equal(url.searchParams.get('r_hardware-feasibility'),null);
 const config=m['research-views'].enrichExistingConfig(m.views.llmViewConfigs.find(c=>c.id==='model-catalog')),rows=m.adapters.buildLlmViewRows(repo)['model-catalog'];
 const state=m.selection.readTableSelection(url.searchParams.get('s_model-catalog'),config,rows);assert.deepEqual(state.ids,ids);assert.equal(state.onlySelected,true);assert.equal(rows.filter(r=>state.ids.includes(r.id)).length,ids.length);assert.equal(JSON.parse(m.selection.encodeTableSelection(state)).onlySelected,true);
});
test('Persian ignores licenses; English and Spanish use the explicitly selected use case',()=>{
 const altered=structuredClone(repo);for(const model of altered.models)model.license.commercialUse={state:'known',value:'prohibited'};
 assert.deepEqual(w.wizardCandidates(repo,input,'fa').map(c=>c.model.id),w.wizardCandidates(altered,input,'fa').map(c=>c.model.id));
 for(const locale of ['en','es']){assert.equal(w.wizardCandidates(altered,input,locale).length,0);assert.ok(w.wizardCandidates(altered,{...input,licenseUse:'research'},locale).length);assert.equal(w.visibleQuestion(w.wizardQuestions.find(q=>q.id==='licenseUse'),input,locale),true);}
 assert.equal(w.visibleQuestion(w.wizardQuestions.find(q=>q.id==='licenseUse'),input,'fa'),false);
 const aya=repo.models.find(m=>m.id==='model:coherelabs-aya-expanse-8b');assert.equal(w.wizardLicense(aya,'fa'),'ignored');assert.equal(w.wizardLicense(aya,'en'),'noncommercial');
});
test('result scope uses exact language, metric and cutoff without substituting Recall or zero',()=>{
 const scope=s.readScoreScope(null,'fa');
 for(const [name,value] of [['small',53.3],['base',57.4],['large',59],['large-instruct',59.4]]){
  const rows=s.scopedModelResults(repo.publishedEvaluations,'model:intfloat-multilingual-e5-'+name,scope);assert.equal(rows.length,1);assert.equal(rows[0].value,value);assert.equal(rows[0].metric,'nDCG@10');
  assert.deepEqual(s.scopedModelResults(rows,rows[0].modelVersionId,{...scope,cutoff:'100'}),[]);
 }
 assert.equal(s.benchmarkLabel('AIME2025'),s.benchmarkLabel('AIME 2025'));
 assert.notEqual(s.benchmarkLabel('Terminal Bench 2.0'),s.benchmarkLabel('Terminal Bench 2.1'));assert.notEqual(s.benchmarkLabel('Terminal Bench 2.1'),s.benchmarkLabel('Terminal Bench 3.0'));
 const scores=repo.publishedEvaluations.filter(x=>x.id.startsWith('published-evaluation:update0919-'));assert.equal(scores.length,16);assert.equal(m.evaluation.qualityComparison(scores.slice(0,2)).rank,false);
});
test('new records preserve counts, task contexts, unknowns and separate MLX artifacts',()=>{
 assert.equal(repo.models.length,115);assert.equal(repo.publishedEvaluations.length,1267);assert.equal(new Set(repo.models.map(x=>x.id)).size,115);
 const glm=repo.models.find(m=>m.id==='model:zai-org-glm-5-1');assert.equal(glm.activeParametersB.state,'unknown');assert.equal(glm.totalParametersB.state,'unknown');
 for(const model of repo.models.filter(m=>/qwen3-vl-(embedding|reranker)/.test(m.id))){assert.equal(model.declaredContext.value,32768);assert.equal(model.configurationContext.value,262144);assert.ok(repo.specializedAssessments.some(a=>a.modelVersionId===model.id));}
 const routes=m['research-views'].compatibilityRows(repo,false);assert.ok(routes.filter(r=>r.cells.engine?.display==='MLX LM').length>=2);assert.ok(!routes.some(r=>/^(publisher|Publisher documentation)$/i.test(r.facets.engine?.display??'')));
 assert.ok(!JSON.stringify(repo).includes('mergeNote'));
});
test('RAM substitution recalculates ownership examples while preserving historical dates',()=>{
 const d=json('data/llm/cost-example.fa.json'),sum=d.parts.reduce((a,p)=>a+p.amountToman,0),gpu=d.parts.find(p=>p.component==='gpu').amountToman;
 assert.equal(sum,1116100000);assert.equal(sum-gpu,587100000);assert.equal(Math.round(sum/d.amortizationMonths),46504167);assert.equal((sum/d.historicalFxAssumptionTomanPerUsd).toFixed(2),'4852.61');
 assert.equal((gpu/sum*100).toFixed(2),'47.40');assert.equal((235000000/sum*100).toFixed(2),'21.06');
 for(const p of d.parts)assert.equal(p.sourcePriceDate,p.component==='ram'?'2026-09-19':'2026-09-16');
 assert.deepEqual(d.rentComparisons.map(r=>(r.monthlyToman??r.monthlyEquivalentToman)*24-sum),[1067900000,849500000,254204000]);
 const article=fs.readFileSync('src/lib/content/articles/true-llm-cost-buy-rent-or-api.md','utf8');assert.match(article,/۱٬۱۱۶٬۱۰۰٬۰۰۰/);assert.match(article,/V-Color/);assert.doesNotMatch(article,/۱٬۲۸۱٬۱۰۰٬۰۰۰/);
});

test('numeric wizard answers enforce physical limits, whole counts and localized digits',()=>{
 for(const q of w.wizardQuestions.filter(q=>q.kind==='number')){
  for(const invalid of ['-1','NaN','Infinity','1e4','text','1,000','1.0001','100000000000000'])assert.ok(w.wizardNumberError(q.id,invalid,'fa'),`${q.id}: ${invalid}`);
  assert.equal(w.wizardNumberError(q.id,'۱۲','fa'),'');
 }
 for(const id of ['users','concurrency','requests','inputTokens','outputTokens','gpuCount','months'])assert.ok(w.wizardNumberError(id,'1.5','en'));
 assert.equal(w.wizardNumberError('hours','۲۴','fa'),'');assert.ok(w.wizardNumberError('hours','24.001','en'));
 assert.equal(w.wizardNumberError('hours','۰٫۵','fa'),'');assert.equal(w.wizardNumberError('vram','0.01','en'),'');
 assert.equal(w.cleanWizard({...input,hours:'25',users:'2.5',inputTokens:'garbage'},'fa').hours,undefined);
 assert.equal(w.cleanWizard({...input,hours:'٢٣٫٥'},'fa').hours,'23.5');
 assert.equal(w.wizardNumberError('capex','0','fa'),'');assert.equal(w.wizardNumberError('monthly','0','fa'),'');
 assert.ok(w.wizardNumberError('usdRate','0','fa'));assert.ok(w.wizardNumberError('hours','0','fa'));
 const invalid={...input,maxTokens:'100',firstResponse:'10',fullResponse:'5'};
 assert.deepEqual(Object.keys(w.wizardAnswerErrors(invalid,'en')),['maxTokens','fullResponse']);
 assert.equal(w.cleanWizard(invalid,'en').fullResponse,undefined);assert.equal(w.cleanWizard(invalid,'en').maxTokens,undefined);
});
test('budget currency, exchange basis and legacy saved amounts remain unambiguous',()=>{
 const q=w.wizardQuestions.find(q=>q.id==='currency'),fx=w.wizardQuestions.find(q=>q.id==='usdRate');
 for(const locale of ['en','es']){
  assert.deepEqual(w.wizardOptions(q,locale).map(o=>o.value),['usd','eur']);
  const clean=w.cleanWizard({currency:'million-toman',capex:'100',monthly:'20',usdRate:'230000'},locale);
  for(const id of ['currency','capex','monthly','usdRate'])assert.equal(clean[id],undefined);
  assert.equal(w.visibleQuestion(fx,{currency:'million-toman'},locale),false);
 }
 assert.equal(w.visibleQuestion(fx,{currency:'million-toman'},'fa'),true);
 assert.equal(w.visibleQuestion(fx,{currency:'usd'},'fa'),false);
 const legacy=w.cleanWizard({currency:'toman',capex:'۵۰۰۰۰۰۰۰۰',monthly:'۲۳۰۰۰۰۰۰'},'fa');
 assert.equal(legacy.currency,'million-toman');assert.equal(legacy.capex,'500');assert.equal(legacy.monthly,'23');
 const changed=w.changeWizard({...legacy,usdRate:'230000'},'currency','usd','fa');
 for(const id of ['capex','monthly','usdRate'])assert.equal(changed[id],undefined);
 const plan=w.buildWizardResult(repo,{...input,currency:'million-toman',capex:'230',monthly:'23',usdRate:'230000'},'fa');
 assert.ok(plan.decisions.some(d=>d.id==='budget-conversion'));assert.match(plan.costPlan,/۲۳۰٬۰۰۰ تومان/);assert.match(plan.costPlan,/۱٬۰۰۰ دلار/);assert.match(plan.costPlan,/۱۰۰ دلار/);
 const noRate=w.buildWizardResult(repo,{...input,currency:'million-toman',usdRate:'unknown'},'fa');assert.ok(!noRate.decisions.some(d=>d.id==='budget-conversion'));
});
