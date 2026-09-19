import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { loadLlmModules } from './helpers/llm-modules.mjs';
import { validateLlmReference } from '../scripts/validate-llm-reference.mjs';
const m=await loadLlmModules(),base=m.guide.llmRepository,repo=m.research.enrichResearchRepository(base);
const {referenceRows,referenceDifference,referencePartition}=m.reference;
const group=id=>repo.referenceComparisons.find(g=>g.id===`comparison:${id}`);
test('all report observations resolve once after legacy enrichment, with captured sources and model identities',()=>{
 assert.deepEqual(validateLlmReference(repo),[]);
 const observations=repo.publishedEvaluations.flatMap(e=>e.referenceObservations??[]);
 assert.equal(observations.length,132);assert.equal(new Set(observations.map(r=>r.id)).size,132);
 assert.equal(new Set(repo.publishedEvaluations.map(r=>r.id)).size,repo.publishedEvaluations.length);
 const broken=structuredClone(repo);broken.selectionGuidance[0].candidateModelRefs.push('model:absent');assert.ok(validateLlmReference(broken).some(e=>e.includes('absent')));
 const duplicate=structuredClone(repo);duplicate.publishedEvaluations.push(structuredClone(duplicate.publishedEvaluations.find(e=>e.referenceObservations?.length)));assert.ok(validateLlmReference(duplicate).some(e=>e.includes('Duplicate')));
});
test('MIRACL partitions language and metric, retaining 0–100 score points',()=>{
 const g=group('e5-miracl-by-language'),rows=referenceRows(repo,g).map(r=>r.report);
 const es=rows.find(r=>r.modelRef.endsWith('large-instruct') && r.language==='es' && r.metric==='nDCG@10');
 assert.equal(es.value,53.7);assert.equal(es.unit,'score-points-0-100');
 const baseEs=rows.find(r=>r.modelRef.endsWith('e5-base') && r.language==='es' && r.metric===es.metric);
 assert.equal(referenceDifference(g,baseEs,es),2.2);
 const recall=rows.find(r=>r.modelRef===es.modelRef && r.language==='es' && r.metric!==es.metric);
 assert.notEqual(referencePartition(es),referencePartition(recall));assert.equal(referenceDifference(g,es,recall),null);
 const en=rows.find(r=>r.modelRef===es.modelRef && r.language==='en' && r.metric===es.metric);assert.equal(referenceDifference(g,en,es),null);
 assert.equal(referenceDifference(g,{...baseEs,sourceDocumentRevision:null,sourceCaptureSha256:undefined},{...es,sourceDocumentRevision:null,sourceCaptureSha256:undefined}),null);
});
test('reranker differences require the documented shared top-100 pool and preserve the baseline role',()=>{
 const g=group('qwen-reranking-top100'),rows=referenceRows(repo,g).map(r=>r.report).filter(r=>r.benchmark==='MTEB-R');
 const baseline=rows.find(r=>r.settings.pipelineRole==='retriever-only baseline');const reranker=rows.find(r=>r.modelRef==='model:qwen-qwen3-reranker-0-6b');
 assert.equal(referenceDifference(g,baseline,reranker),3.98);
 assert.equal(referenceDifference(g,baseline,{...reranker,settings:{...reranker.settings,candidateCount:50}}),null);
 assert.equal(repo.publishedEvaluations.filter(e=>e.modelVersionId===reranker.modelRef && e.benchmark==='MTEB-R' && e.value===65.8).length,1);
});
test('separate cards and relayed leaderboard scores cannot yield automatic differences or rankings',()=>{
 for(const id of ['e5-classification-es-fa','salamandra-spanish','qwen-embedding-task-scope']) {
  const g=group(id),rows=referenceRows(repo,g);assert.equal(referenceDifference(g,rows[0].report,rows[1].report),null);
  assert.equal(m.evaluation.qualityComparison(rows.slice(0,2).map(r=>r.result)).rank,false);
 }
});
test('unknown language, context conflicts and custom commercial restrictions remain explicit',()=>{
 const unknown=repo.publishedEvaluations.find(e=>e.referenceObservations?.some(r=>r.language===null));assert.equal(m.evaluation.resultMatchesLanguage(unknown,'en'),false);
 const lfm=repo.models.find(m=>m.id==='model:liquidai-lfm2-5-1-2b-instruct');assert.equal(lfm.declaredContext.value,32768);assert.equal(lfm.configurationContext.value,128000);assert.equal(lfm.license.commercialUse.value,'restricted');assert.equal(lfm.evaluatedContext.state,'not-measured');
 const granite=repo.models.find(m=>m.id==='model:ibm-granite-granite-4-2-3b');assert.equal(granite.totalParametersB.value,3.6597376);assert.equal(granite.declaredContext.value,131072);assert.notEqual(granite.evaluatedContext.state,'known');
 assert.equal(repo.quantizationStudies.length,12);assert.equal(new Set(repo.quantizationStudies.map(q=>q.reportedModelName)).size,6);assert.ok(!repo.models.some(m=>m.id.toLowerCase().includes('paretoq')));
});
test('localized semantic inserts retain existing full articles, dates and connected destinations',()=>{
 for(const section of repo.articleSections)for(const lang of section.locales) {
  const slug=section.articleKey+(lang==='fa'?'':`-${lang}`),text=fs.readFileSync(`src/lib/content/articles/${slug}.md`,'utf8');
  assert.equal(text.split(`<!-- reference:${section.id.split(':')[1]}:start -->`).length,2);
  assert.ok(text.length>10000,slug);if(lang!=='fa')assert.doesNotMatch(text,/[\u0600-\u06ff]/);
 }
 for(const slug of ['evaluating-llms-for-your-language-and-workload','evaluar-llm-idioma-y-tarea','true-llm-cost-buy-rent-or-api-en','true-llm-cost-buy-rent-or-api-es']) {
  const text=fs.readFileSync(`src/lib/content/articles/${slug}.md`,'utf8');assert.ok(text.length>12000);assert.match(text,/draft: true/);assert.match(text,/<!-- reference:/);
 }
});
