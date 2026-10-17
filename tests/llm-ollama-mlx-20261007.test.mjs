import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { loadLlmModules } from './helpers/llm-modules.mjs';

const read = file => JSON.parse(fs.readFileSync(file, 'utf8'));
const canonical = read('data/llm/v0.3.0/repository.json');
const modules = await loadLlmModules();
const id = 'software-release:ollama-v0-40-2';
const embedding = 'model:google-embeddinggemma-2';
const qwen = 'model:qwen-qwen3-6-27b';
const decisions = ['model:cloudflare-clef', 'model:cloudflare-clef-flash', 'model:bespokelabs-bespoke-nimble-9b'];
const input = { task:'extraction', decisionTask:'classify', output:'fields', sourceLanguage:'en', outputLanguage:'en', sources:'provided', format:'text', deployment:'self', hardware:'gpu', gpuName:'Apple M5 Max', vram:'64', upgrade:'existing', inputTokens:'512', outputTokens:'16', concurrency:'1', loadDefinition:'active' };
function edition(locale) {
  const i = modules['i18n/runtime'].createLlmI18n(locale,read(`data/llm/locales/messages.${locale}.json`),modules['i18n/runtime'].resolveRecordTranslations(read(`data/llm/locales/records.${locale}.json`)));
  const repo = modules['i18n/runtime'].localizeLlmRepository(canonical,i);
  return {repo,i,adapters:modules.adapters.createLlmAdapters(i),views:modules.views.createLlmViews(i),filters:modules.filtering.createLlmFiltering(i),researchViews:modules['research-views'].createLlmResearchViews(i)};
}

test('current Ollama is stable Latest with a distinct review date and preserved SystemOne milestone', () => {
  const release = canonical.softwareReleases.find(r=>r.id===id);
  const source = read('data/llm/sources/runtime-fixes-2026-10-10/ollama-v0.40.2-release.json');
  assert.equal(release.version,source.tag_name);
  assert.equal(release.releasedOn,source.published_at.slice(0,10));
  assert.equal(release.releasedOn,'2026-10-08');
  assert.equal(release.lastReviewedOn,'2026-10-10');
  assert.equal(release.releaseChannel,'stable');
  assert.equal(release.isLatest,true);
  assert.equal(canonical.softwareReleases.find(r=>r.id==='software-release:ollama-v0-40-0').isLatest,false);
  assert.equal(source.prerelease,false);
  assert.ok(release.documentedBackends.includes('MLX'));
  assert.ok(!canonical.softwareReleases.some(r=>r.id==='software-release:ollama-v0-34-0'));
  assert.equal(canonical.softwareReleases.find(r=>r.id==='software-release:ollama-v0-35-1').version,'v0.35.1');
  assert.equal(canonical.models.length,141);
  assert.deepEqual(canonical.models.filter(m=>m.id.startsWith('model:google-gemma-4-')).map(m=>m.id).sort(),['model:google-gemma-4-26b-a4b-it','model:google-gemma-4-e2b-it']);
  assert.ok(canonical.models.every(m=>!m.evidenceIds.includes('evidence:ollama-v0-40-0-release')), 'The engine release supplies no model-card facts');
  assert.equal(canonical.artifactListings.length,553);
  assert.deepEqual(canonical.artifactListings.find(a=>a.modelVersionId===embedding).runtimeEngines,['Transformers','Sentence Transformers']);
  assert.equal(canonical.benchmarkRuns.length,0);
});

test('localized version/backend filters and scoped deployment rows expose MLX without certifying artifacts', () => {
  for(const locale of ['fa','en','es']) {
    const {repo,i,adapters,views,filters,researchViews} = edition(locale);
    const researchRepo = modules.research.createLlmResearch(i).enrichResearchRepository(repo);
    const rows = researchViews.enrichExistingRows(researchRepo,adapters.buildLlmViewRows(researchRepo),'all')['software-products'];
    const current = rows.find(r=>r.id===id);
    assert.match(current.cells['software-version'].display,/v0\.40\.2.*Latest/);
    assert.match(current.cells['research-condition'].display,/Apple Silicon/);
    assert.match(current.cells['research-condition'].display,/OLLAMA_NO_CLOUD=1/);
    assert.doesNotMatch(current.cells['research-condition'].display,/rc0/);
    const config = views.llmViewConfigs.find(v=>v.id==='software-products');
    assert.deepEqual(filters.filterLlmRows(rows,config.filters,{'software-version':'v0.40.2'},'').map(r=>r.id),[id]);
    assert.equal(filters.filterLlmRows(rows,config.filters,{'software-version':'v0.34.0'},'').length,0);
    assert.ok(filters.filterLlmRows(rows,config.filters,{backend:'MLX'},'').some(r=>r.id===id));
    const routes = researchViews.compatibilityRows(researchRepo);
    assert.equal(new Set(routes.map(r=>r.id)).size,routes.length);
    for(const mid of [qwen,embedding,...decisions]) {
      const route = routes.find(r=>r.id===`route:${mid}:Ollama:apple-silicon`);
      assert.ok(route,mid);
      assert.match(route.cells.engine.display,/v0\.40\.0.*MLX.*Apple Silicon/);
      if(locale!=='fa')assert.doesNotMatch(JSON.stringify([route.cells,route.details,current.cells,current.details]),/[\u0600-\u06ff]/);
    }
    assert.equal(repo.modelProfiles.find(p=>p.modelVersionId===qwen).runGuides.find(g=>g.hardwareTarget==='apple-silicon').compatibilityScope,'family');
  }
});

test('wizard offers MLX only on explicit local Apple Silicon, with no borrowed weight file or memory estimate', () => {
  for(const locale of ['fa','en','es']) {
    const {repo} = edition(locale);
    const assess = (answers,kind) => modules.wizard.assessWizardCatalog(repo,answers,locale,undefined,kind);
    for(const mid of [qwen,...decisions]) {
      const review = assess(input).find(c=>c.model.id===mid);
      assert.notEqual(review.status,'excluded',mid);
      assert.equal(review.runtime,'Ollama');
      assert.equal(review.runtimeBackend,'MLX');
      assert.equal(review.memoryStatus,'unsupported');
      assert.equal(review.artifactUrl,undefined);
      assert.equal(review.weightGiB,undefined);
      assert.equal(review.format,undefined);
      assert.equal(review.memory,undefined);
      assert.match(review.runtimeReason,/v0\.40\.0.*MLX/);
      assert.equal(review.runtimeUrl,'https://github.com/ollama/ollama/releases/tag/v0.40.0');
      for(const patch of [{gpuName:'NVIDIA RTX 4090'},{gpuName:'Intel Mac Metal'},{gpuName:'Apple Intel Mac'},{gpuName:'unknown'},{hardware:'cpu'},{deployment:'api'}])
        assert.notEqual(assess({...input,...patch}).find(c=>c.model.id===mid).runtimeBackend,'MLX',JSON.stringify(patch));
    }
    const embed = assess({...input,task:'rag',sourceLanguage:'fa',outputLanguage:'fa'},'embedding').find(c=>c.model.id===embedding);
    assert.equal(embed.runtimeBackend,'MLX');
    assert.equal(embed.status,'conditional');
    assert.equal(embed.language,'not-recorded');
    assert.equal(embed.memory,undefined);
    assert.ok(assess(input).every(c=>c.runtimeBackend!=='MLX'||repo.modelProfiles.find(p=>p.modelVersionId===c.model.id).runGuides.some(g=>g.hardwareTarget==='apple-silicon')));
    assert.notEqual(assess(input).find(c=>c.model.id==='model:qwen-qwen3-8b').runtimeBackend,'MLX');
    for(const mid of decisions)assert.equal(assess({...input,task:'writing'}).find(c=>c.model.id===mid).status,'excluded');
    const result = modules.wizard.buildWizardResult(repo,{...input,inputTokens:'unknown',maxTokens:'unknown'},locale,()=>undefined);
    assert.ok(result.memoryScenarios.every(s=>result.candidates.find(c=>c.model.id===s.modelId)?.runtimeBackend!=='MLX'));
  }
});
