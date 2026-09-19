import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { loadLlmModules } from './helpers/llm-modules.mjs';
const m = await loadLlmModules();
const { createLlmI18n, resolveRecordTranslations, localizeLlmRepository } = m['i18n/runtime'];
const evaluation = m.evaluation;
const json = file => JSON.parse(fs.readFileSync(file,'utf8'));
const base = m.guide.llmRepository;
const editions = Object.fromEntries(['fa','en','es'].map(locale => {
  const messages=json(`data/llm/locales/messages.${locale}.json`), texts=json(`data/llm/locales/records.${locale}.json`);
  const i18n=createLlmI18n(locale,messages,resolveRecordTranslations(texts));
  const research=m.research.createLlmResearch(i18n);
  return [locale,{i18n,research,repository:research.enrichResearchRepository(localizeLlmRepository(base,i18n)), views:m['research-views'].createLlmResearchViews(i18n), adapters:m.adapters.createLlmAdapters(i18n)}];
}));

test('each edition resolves all message and entity-field translations without a silent fallback',()=>{
  for(const lang of ['en','es']) for(const kind of ['messages','records']) {
    const fa=json(`data/llm/locales/${kind}.fa.json`), d=json(`data/llm/locales/${kind}.${lang}.json`);
    assert.deepEqual(Object.keys(d).sort(),Object.keys(fa).sort());
    for(const [key,value] of Object.entries(d)) {
      assert.ok(value.trim(),`${lang}/${key}`);
      assert.deepEqual((value.match(/\{\d+\}/g)||[]).sort(),(fa[key].match(/\{\d+\}/g)||[]).sort(),key);
      assert.doesNotMatch(value,/[\u0600-\u06ff]/,`${lang}/${key}`);
    }
  }
  assert.throws(()=>createLlmI18n('es',{}).t('absent'),/Missing LLM translation/);
  assert.throws(()=>resolveRecordTranslations({}),/Missing LLM editorial translation/);
});

test('the same technical identities, units, results and memory scenarios survive all editions',()=>{
  const numeric = repo => repo.publishedEvaluations.map(r=>({id:r.id,model:r.modelVersionId,value:r.value,unit:r.unit,language:r.languageScope,mode:r.mode,settings:r.settings}));
  for(const lang of ['en','es']) {
    const e=editions[lang];
    assert.deepEqual(e.repository.models.map(x=>x.id),base.models.map(x=>x.id));
    assert.deepEqual(numeric(e.repository),numeric(editions.fa.repository));
    const controls=e.views.defaultResearchControls;
    const cells=e.views.memoryRows(e.repository,controls).map(r=>[r.id,r.cells.budget.canonicalNumber,r.cells.budget.canonicalUnit,r.cells.kv.canonicalNumber]);
    const expected=editions.fa.views.memoryRows(editions.fa.repository,controls).map(r=>[r.id,r.cells.budget.canonicalNumber,r.cells.budget.canonicalUnit,r.cells.kv.canonicalNumber]);
    assert.deepEqual(cells,expected);
    for(const metric of Object.keys(e.views.performanceMetrics)) assert.equal(e.views.performanceMetrics[metric].unit,editions.fa.views.performanceMetrics[metric].unit);
  }
});

test('international table displays and profile editorial copy contain no Persian fallback',()=>{
  const check=(value,path)=>{if(typeof value==='string')assert.doesNotMatch(value,/[\u0600-\u06ff]/,path);};
  for(const lang of ['en','es']) {
    const e=editions[lang];
    const rows=e.views.enrichExistingRows(e.repository,e.adapters.buildLlmViewRows(e.repository),lang==='en'?'all':'es');
    for(const [view,list] of Object.entries(rows))for(const row of list){
      for(const [key,raw] of Object.entries({...row.cells,...row.details}))for(const value of Array.isArray(raw)?raw:[raw]){
        if(!value||value.copyText)continue;
        for(const field of ['display','note','badge'])check(value[field],`${lang}/${view}/${row.id}/${key}/${field}`);
      }
    }
    for(const profile of e.repository.modelProfiles){
      check(profile.introduction,`${lang}/${profile.id}/introduction`);check(profile.roleSummary,profile.id);
      for(const run of profile.runGuides){check(run.label,profile.id);check(run.instructions,profile.id);for(const c of run.conditions)check(c,profile.id);}
    }
  }
});

test('language evidence preserves unspecified values, aggregate results and pair direction',()=>{
  assert.deepEqual(evaluation.evaluationLanguage('default'),{kind:'unspecified'});
  assert.deepEqual(evaluation.evaluationLanguage('multilingual'),{kind:'aggregate'});
  assert.deepEqual(evaluation.evaluationLanguage('eng-spa'),{kind:'pair',source:'en',target:'es'});
  assert.equal(evaluation.languageCode('español'),'es');
  const result={languageScope:{kind:'pair',source:'en',target:'es'}};
  assert.equal(evaluation.resultMatchesLanguage(result,'es'),false);
  assert.equal(evaluation.resultMatchesLanguage({languageScope:{kind:'aggregate',languages:['es']}},'es'),false);
  assert.equal(evaluation.resultMatchesLanguage({languageScope:{kind:'single',language:'es'}},'Spanish'),true);
});

test('reviewed common quality table permits scoped numerical order, never statistical superiority',()=>{
  const results=base.publishedEvaluations.filter(r=>r.protocolEvidenceId==='evidence:deepseek-r1-common-table'&&r.benchmark==='MATH-500');
  assert.ok(results.length>=2);
  const pair=results.slice(0,2), valid=evaluation.qualityComparison(pair);
  assert.equal(valid.rank,true);assert.equal(valid.direction,'higher');assert.equal(valid.superiority,false);
  assert.equal(evaluation.qualityComparison([]).rank,false);assert.equal(evaluation.qualityComparison(pair.slice(0,1)).rank,false);
  for(const patch of [{benchmark:'Other'},{benchmarkVersion:'v2'},{metric:'cons@64'},{unit:'rating'},{languageScope:{kind:'unspecified'}},{settings:{...pair[1].settings,datasetSplit:'train'}},{settings:{...pair[1].settings,temperature:0.9}}]) {
    assert.equal(evaluation.qualityComparison([pair[0],{...pair[1],...patch}]).rank,false,JSON.stringify(patch));
  }
  const rating=pair.map(r=>({...r,metric:'Codeforces rating',unit:'rating'}));
  assert.equal(evaluation.qualityComparison(rating).rank,true);assert.equal(evaluation.qualityComparison(rating).ratio,false);
  assert.equal(evaluation.qualityComparison(pair.map(r=>({...r,protocolEvidenceId:undefined}))).rank,false);
  assert.equal(evaluation.metricSemantics('latency','ms').direction,'lower');
});

test('similar values cannot collapse observations with unknown or different provenance',()=>{
  const source=base.publishedEvaluations.find(r=>r.protocolEvidenceId==='evidence:deepseek-r1-common-table');
  const same={...source,id:'separate-observation'};
  assert.equal(evaluation.samePublishedResult(source,same),true);
  for(const patch of [{languageScope:{kind:'unspecified'}},{sourceDocumentRevision:undefined},{benchmarkVersion:'new'},{settings:{...source.settings,shots:5}},{languageScope:{kind:'single',language:'es'}}])assert.equal(evaluation.samePublishedResult(source,{...same,...patch}),false);
});

test('a reviewed performance comparison varies the execution path while retaining workload and hardware',()=>{
  const e=editions.en, v=e.views.researchView(e.repository,'benchmarks',e.views.defaultResearchControls);
  const ready=v.rows.filter(r=>r.comparison.calculation.status==='ready');assert.equal(ready.length,3);
  const compare=m.comparison.createLlmComparison(e.i18n).evaluateComparison;
  const result=compare(ready.slice(0,2),v.config.comparison,'controlled-experiment','execution-path');
  assert.equal(result.rankingAllowed,true);assert.equal(result.superiorityClaimAllowed,false);
  const other={...ready[1],comparison:{...ready[1].comparison,dimensions:{...ready[1].comparison.dimensions,hardware:{state:'known',display:'different',raw:'different'}}}};
  assert.equal(compare([ready[0],other],v.config.comparison,'controlled-experiment','execution-path').rankingAllowed,false);
  const fp8=v.rows.find(r=>r.cells.format.display==='FP8');assert.ok(fp8);
  assert.equal(compare([ready[0],fp8],v.config.comparison,'controlled-experiment','execution-path').rankingAllowed,false);
});

test('selection parsing rejects removed IDs and invalid numeric inputs and survives a round trip',()=>{
  const e=editions.en,config=m.views.createLlmViews(e.i18n).llmViewConfigs.find(c=>c.id==='model-catalog');
  const rows=e.adapters.buildLlmViewRows(e.repository)['model-catalog'];
  const state=m.selection.readTableSelection(JSON.stringify({q:'Qwen',ids:[rows[0].id,'removed'],filters:{'model-size':{min:'2',max:'8'}},columns:['model','removed'],mode:'controlled-experiment',axis:'absent'}),config,rows);
  assert.deepEqual(state.ids,[rows[0].id]);assert.equal(state.mode,'side-by-side');assert.equal(state.columns.includes('removed'),false);
  assert.deepEqual(m.selection.readTableSelection(m.selection.encodeTableSelection(state),config,rows),state);
  const allowed={hardware:e.research.research.hardware.map(x=>x.id),ram:[8,16,32],groups:Object.keys(e.views.performanceGroups),metrics:Object.keys(e.views.performanceMetrics),models:e.repository.models.map(x=>x.id)};
  const parsed=m.selection.readResearchSelection('{"context":-1,"active":1.5,"hardwareIds":["deleted"],"group":"deleted"}',e.views.defaultResearchControls,allowed);
  assert.equal(parsed.context,8192);assert.equal(parsed.active,1);assert.deepEqual(parsed.hardwareIds,[]);assert.equal(parsed.group,e.views.defaultResearchControls.group);
});
