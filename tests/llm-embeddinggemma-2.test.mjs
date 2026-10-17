import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { loadLlmModules } from './helpers/llm-modules.mjs';
const m = await loadLlmModules();
const read = file => JSON.parse(fs.readFileSync(file, 'utf8'));
const canonical = read('data/llm/v0.3.0/repository.json');
const id = 'model:google-embeddinggemma-2';
function edition(locale) {
  const i = m['i18n/runtime'].createLlmI18n(locale, read(`data/llm/locales/messages.${locale}.json`), m['i18n/runtime'].resolveRecordTranslations(read(`data/llm/locales/records.${locale}.json`)));
  return { repo:m['i18n/runtime'].localizeLlmRepository(canonical,i), adapters:m.adapters.createLlmAdapters(i), views:m.views.createLlmViews(i), filters:m.filtering.createLlmFiltering(i) };
}

test('multimodal filtering includes embedders without changing their task or losing the old model', () => {
  for (const locale of ['fa','en','es']) {
    const {repo,adapters,views,filters} = edition(locale);
    const rows = adapters.buildLlmViewRows(repo)['model-catalog'];
    const config = views.llmViewConfigs.find(view => view.id === 'model-catalog');
    assert.equal(rows.length, 141);
    assert.deepEqual(filters.filterLlmRows(rows,config.filters,{family:['EmbeddingGemma']},'').map(row=>row.id).sort(), ['model:google-embeddinggemma-300m',id].sort());
    const populated = filters.populateLlmFilterOptions(rows,config.filters,{},'');
    assert.equal(populated.find(filter=>filter.id==='family').options.find(option=>option.value==='EmbeddingGemma').count,2);
    for (const selection of [{'model-kind':['embedding']},{'model-kind':['multimodal']},{'input-modality':['audio']},{'input-modality':['video']},{'download-format':['safetensors']},{'run-engine':['Sentence Transformers']},{'run-engine':['Transformers']}])
      assert.deepEqual(filters.filterLlmRows(rows,config.filters,selection,'google/embeddinggemma-2').map(row=>row.id),[id]);
    assert.equal(filters.filterLlmRows(rows,config.filters,{'model-kind':['vision-language']},'google/embeddinggemma-2').length,0);
    assert.equal(filters.filterLlmRows(rows,config.filters,{'download-format':['gguf']},'google/embeddinggemma-2').length,0);
    const row=rows.find(row=>row.id===id);
    assert.equal(row.facets['total-parameters'].canonicalNumber,.74);
    assert.match(row.cells.parameters.display,/0[.,]27|۰٫۲۷/);
    if(locale!=='fa')assert.doesNotMatch(JSON.stringify([row.cells,row.details]),/[\u0600-\u06ff]/);
  }
});

test('aggregate MTEB results cannot become Persian evidence or a firm Persian RAG recommendation', () => {
  const input={task:'rag',sourceLanguage:'fa',outputLanguage:'fa',mode:'interactive',users:'5',concurrency:'1',deployment:'self',hardware:'gpu',vram:'24',upgrade:'existing',capex:'0',policy:'internal',licenseUse:'commercial',inputTokens:'4096',outputTokens:'512'};
  for(const locale of ['fa','en','es']) {
    const {repo}=edition(locale),model=repo.models.find(model=>model.id===id);
    assert.equal(m.evaluation.modelLanguageEvidence(repo,model,'fa','enterprise-rag'),'not-recorded');
    const evaluations=repo.publishedEvaluations.filter(result=>result.modelVersionId===id);
    assert.equal(evaluations.length,3);
    assert.ok(evaluations.every(result=>result.languageScope.kind==='aggregate'));
    const review=m.wizard.assessWizardCatalog(repo,input,locale,()=>assert.fail('Specialist memory must not use the generative calculator'),'embedding').find(review=>review.model.id===id);
    assert.equal(review.status,'conditional');
    assert.equal(review.language,'not-recorded');
    assert.equal(review.memory,undefined);
    assert.match(review.reasons.join(' '),/768|۷۶۸/);
    assert.match(review.reasons.join(' '),/256|۲۵۶/);
  }
});

test('checkpoint footprint and text-component size do not create GPU or Pixel memory estimates', () => {
  const model=canonical.models.find(model=>model.id===id);
  const metadata=read('data/llm/sources/embeddinggemma-2-2026-10-07/metadata.json');
  assert.equal(model.version,metadata.sha);
  assert.equal(model.kind,'embedding');
  assert.equal(model.activeParametersB.state,'not-applicable');
  assert.equal(model.parameterCounts.find(count=>count.scope==='language-component').value.value,.27);
  assert.equal(model.license.name.value,'Apache-2.0');
  assert.equal(model.declaredContext.value,8192);
  assert.equal(model.specializedSpecs.embeddingDimensions.value,768);
  const listing=canonical.artifactListings.find(listing=>listing.modelVersionId===id);
  assert.equal(listing.totalBytes,metadata.siblings.find(file=>file.rfilename==='model.safetensors').size);
  assert.equal(listing.totalBytes,listing.files.reduce((sum,file)=>sum+file.bytes,0));
  assert.ok(!canonical.artifacts.some(artifact=>artifact.modelVersionId===id));
  assert.ok(!m.research.research.artifacts.some(artifact=>artifact.modelRepository==='google/embeddinggemma-2'));
  assert.ok(!canonical.benchmarkRuns.some(run=>run.modelVersionId===id));
  const profile=canonical.modelProfiles.find(profile=>profile.modelVersionId===id);
  assert.equal(profile.runGuides.find(guide=>guide.engine==='Sentence Transformers').engineLabel,'Sentence Transformers ≥6.1');
});
