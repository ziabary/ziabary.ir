import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { loadLlmModules } from './helpers/llm-modules.mjs';
const read = path => JSON.parse(fs.readFileSync(path, 'utf8'));
const canonical = read('data/llm/v0.3.0/repository.json');
const m = await loadLlmModules();
const base = { task:'writing', writingTask:'summary', sources:'provided', sourceLanguage:'en', outputLanguage:'en', inputSize:'short', mode:'interactive', policy:'internal', deployment:'self', hardware:'gpu', ram:'64', vram:'24', audience:'personal', owner:'none', concurrency:'16', loadDefinition:'active' };
for (const locale of ['fa','en','es']) {
  const i = m['i18n/runtime'].createLlmI18n(locale,read(`data/llm/locales/messages.${locale}.json`),m['i18n/runtime'].resolveRecordTranslations(read(`data/llm/locales/records.${locale}.json`)));
  const repo = m.research.createLlmResearch(i).enrichResearchRepository(m['i18n/runtime'].localizeLlmRepository(canonical,i));
  const result = changes => m.wizard.buildWizardResult(repo,{...base,...changes},locale);
  const warning = (r,id) => r.decisions.find(d=>d.id===id);
  test(`October runtime notes render with limits and prerelease status (${locale})`,()=>{
    const rows = m['research-views'].createLlmResearchViews(i).enrichExistingRows(repo,m.adapters.createLlmAdapters(i).buildLlmViewRows(repo),'all')['software-products'];
    for (const [version,tokens] of [['b11310',['b11310+','IQ4_NL','QK4_NL','QK_K','CUDA','HIP','MUSA','CVE']],['b11307',['b11307+','DFlash2','tensor split','SPEED-Bench','Q4_K_M','3.3531','3.9211','16.94%']]]) {
      const id=`software-release:llama-cpp-${version}`, row=rows.find(r=>r.id===id);
      assert.ok(row); assert.ok(row.cells['software-version'].display.includes(i.t('software.prerelease')));
      for (const token of tokens) assert.ok(row.cells['research-condition'].display.includes(token),`${locale}: ${token}`);
      assert.ok(row.sourceIds.includes(`evidence:llama-cpp-${version}-fix`));
      if(locale!=='fa') assert.doesNotMatch(JSON.stringify([row.cells,row.details]),/[\u0600-\u06ff]/);
      assert.equal(canonical.softwareReleases.find(r=>r.id===id).releasedOn,'2026-10-01');
    }
  });
  test(`only declared affected execution paths get warnings (${locale})`,()=>{
    const iq='llama-iq4nl-memory-safety',df='llama-dflash-batch-order';
    assert.equal(warning(result({}),iq),undefined);assert.equal(warning(result({}),df),undefined);
    assert.match(warning(result({llamaIq4NlGpu:'yes'}),iq).conclusion,/b11310\+/);
    assert.match(warning(result({llamaDflash:'yes'}),df).conclusion,/b11307\+/);
    for(const key of ['llamaIq4NlGpu','llamaDflash']) for(const value of ['no','unknown','']) assert.equal(warning(result({[key]:value}),key==='llamaDflash'?df:iq),undefined);
    for(const changes of [{hardware:'cpu'},{hardware:'none'},{deployment:'api',policy:'public'},{task:'unknown'}]) assert.equal(warning(result({llamaIq4NlGpu:'yes',...changes}),iq),undefined);
    for(const changes of [{concurrency:'1'},{concurrency:'unknown'},{concurrency:'-1'},{loadDefinition:'queued'},{loadDefinition:'unknown'},{mode:'batch'},{deployment:'api',policy:'public'},{task:'unknown'},{hardware:'none'}]) assert.equal(warning(result({llamaDflash:'yes',...changes}),df),undefined,JSON.stringify(changes));
    assert.ok(warning(result({llamaDflash:'yes',hardware:'cpu',loadDefinition:'machines'}),df));
    const cleaned=m.wizard.cleanWizard({...base,llamaIq4NlGpu:'yes',llamaDflash:'yes',deployment:'api',policy:'public'},locale);
    assert.equal(cleaned.llamaIq4NlGpu,undefined);assert.equal(cleaned.llamaDflash,undefined);
  });
  test(`warnings preserve ranking and memory estimates (${locale})`,()=>{
    const baseline=result({}), affected=result({llamaIq4NlGpu:'yes',llamaDflash:'yes'});
    assert.deepEqual(affected.candidates,baseline.candidates);
    assert.deepEqual(affected.reviews,baseline.reviews);
    const estimate=(model,a)=>({budgetGiB:24,weightGiB:10,kvGiB:2,reserveGiB:2,artifactId:model.id,quantization:'Q4_K_M',context:Number(a.maxTokens),active:Number(a.concurrency)});
    const before=m.wizard.buildWizardResult(repo,base,locale,estimate);
    const after=m.wizard.buildWizardResult(repo,{...base,llamaIq4NlGpu:'yes',llamaDflash:'yes'},locale,estimate);
    assert.deepEqual(after.candidates,before.candidates);assert.deepEqual(after.memoryScenarios,before.memoryScenarios);
  });
}
