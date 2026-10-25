import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {loadLlmModules} from './helpers/llm-modules.mjs';

const read = path => JSON.parse(fs.readFileSync(path, 'utf8'));
const canonical = read('data/llm/v0.3.0/repository.json');
const source = read('data/llm/sources/runtime-2026-10-21/official-evidence.json');
const m = await loadLlmModules();
const embedIds = ['1b','8b'].map(size => `model:nvidia-nemotron-3-5-embed-${size}-bf16`);
const lfmId = 'model:liquidai-lfm2-5-vl-3b';
const historical = ['b11160','b11182','b11223','b11224','b11240','b11279'];

function edition(locale) {
  const i = m['i18n/runtime'].createLlmI18n(locale, read(`data/llm/locales/messages.${locale}.json`),
    m['i18n/runtime'].resolveRecordTranslations(read(`data/llm/locales/records.${locale}.json`)));
  const repo = m.research.createLlmResearch(i).enrichResearchRepository(m['i18n/runtime'].localizeLlmRepository(canonical,i));
  const rows = m['research-views'].createLlmResearchViews(i).enrichExistingRows(repo,m.adapters.createLlmAdapters(i).buildLlmViewRows(repo),'all');
  return {repo, rows, configs:m.views.createLlmViews(i).llmViewConfigs, filtering:m.filtering.createLlmFiltering(i)};
}

test('new releases retain prerelease dates and distinguish implementation agreement from model quality', () => {
  assert.equal(source.releases.b11774.published_at,'2026-10-21T02:32:09Z');
  assert.equal(source.releases.b11778.published_at,'2026-10-21T03:37:03Z');
  assert.equal(source.comparison.status,'ahead');
  assert.equal(source.comparison.behind_by,0);
  for (const version of ['b11774','b11778']) {
    assert.equal(source.releases[version].prerelease,true);
    assert.equal(canonical.softwareReleases.find(r=>r.version===version).releaseChannel,'prerelease');
  }
  assert.match(source.embeddingVerification[0].body,/Hello world today/);
  assert.match(source.embeddingVerification[0].body,/0\.999847/);
  for (const id of embedIds) {
    assert.equal(canonical.specializedAssessments.find(a=>a.modelVersionId===id).metricValue.state,'not-measured');
    assert.equal(canonical.models.find(model=>model.id===id).persianEvidenceStatus,'not-evaluated');
    assert.ok(!canonical.publishedEvaluations.some(run=>run.modelVersionId===id));
    assert.ok(!canonical.artifacts.some(artifact=>artifact.modelVersionId===id));
  }
});

for (const locale of ['fa','en','es']) {
  test(`release filtering and historical-note separation remain readable (${locale})`, () => {
    const {rows,configs,filtering} = edition(locale);
    const filters = configs.find(config=>config.id==='software-products').filters;
    for (const version of ['b11774','b11778',...historical]) {
      const selected = filtering.filterLlmRows(rows['software-products'],filters,{'software-version':version},'');
      assert.equal(selected.length,1,version);
      assert.match(selected[0].cells['software-version'].display,/Pre|pre|پیش/);
      if (locale!=='fa') assert.doesNotMatch(JSON.stringify(selected[0]),/[\u0600-\u06ff]/);
    }
    const stable = rows['software-products'].find(row=>row.id==='software-release:llama-cpp-v0-5-0');
    assert.match(stable.cells['research-benefit'].display,/RPC/);
    assert.doesNotMatch(JSON.stringify([stable.cells,stable.details]),/b11\d{3}|ThreadSanitizer|SheetSage2|GGML_CUDA/);
    assert.ok(stable.cells['research-condition'].display.length < 500);
    const lfm = rows['software-products'].find(row=>row.id==='software-release:llama-cpp-b11774');
    for (const token of ['processor_config.json','mmproj','b11767']) assert.ok(lfm.details.backends.display.includes(token),token);
    assert.match(lfm.cells['research-condition'].display,/DSpark/);
    const embed = rows['software-products'].find(row=>row.id==='software-release:llama-cpp-b11778');
    for (const token of ['0.999847','PyTorch','8B','NVFP4','Rerank-8B']) assert.ok(embed.cells['research-condition'].display.includes(token),token);
  });

  test(`BF16 model routes filter as llama.cpp without an official GGUF badge (${locale})`, () => {
    const {repo,rows,configs,filtering} = edition(locale);
    for (const view of ['model-catalog','specialized-models']) {
      const filters = configs.find(config=>config.id===view).filters;
      const selected = filtering.filterLlmRows(rows[view],filters,{'run-engine':['llama.cpp']},'Nemotron-3.5-Embed');
      assert.deepEqual(selected.map(row=>row.modelId).sort(),[...embedIds].sort(),view);
      for (const row of selected) {
        assert.ok(row.downloadLinks.every(link=>!link.label.includes('GGUF')));
        if (locale!=='fa') assert.doesNotMatch(JSON.stringify([row.cells,row.details]),/[\u0600-\u06ff]/);
      }
    }
    for (const id of embedIds) {
      const listings = repo.artifactListings.filter(listing=>listing.modelVersionId===id);
      assert.ok(listings.every(listing=>listing.format==='safetensors' && listing.authority==='official'));
      const route = repo.modelProfiles.find(profile=>profile.modelVersionId===id).runGuides.find(guide=>guide.engine==='llama.cpp');
      assert.match(route.instructions,/--outtype f16/);
      assert.match(route.instructions,/llama-embedding/);
      assert.match(route.conditions.join(' '),/0.999847/);
      const metadata = read(`data/llm/sources/runtime-2026-10-21/embed-${id.includes('-1b-')?'1b':'8b'}-metadata.json`);
      assert.equal(repo.models.find(model=>model.id===id).version,metadata.sha);
      assert.equal(listings[0].totalBytes,listings[0].files.reduce((sum,file)=>sum+file.bytes,0));
    }
    const target = repo.modelProfiles.find(profile=>profile.modelVersionId===lfmId);
    const route = target.runGuides.find(guide=>guide.engine==='llama.cpp');
    assert.equal(route.softwareReleaseId,'software-release:llama-cpp-b11774');
    assert.match(route.instructions,/processor_config.json/);
    assert.ok(target.runGuides.some(guide=>guide.engine==='Transformers'));
    assert.ok(!repo.modelProfiles.find(profile=>profile.modelVersionId===lfmId+'-dspark').runGuides.some(guide=>guide.softwareReleaseId==='software-release:llama-cpp-b11774'));
  });

  test(`new experimental routes do not change general wizard recommendations (${locale})`, () => {
    const {repo} = edition(locale);
    const baseline = {...repo,
      models:repo.models.filter(model=>!embedIds.includes(model.id)),
      modelProfiles:repo.modelProfiles.filter(profile=>!embedIds.includes(profile.modelVersionId)).map(profile=>profile.modelVersionId===lfmId
        ? {...profile,runGuides:profile.runGuides.filter(guide=>guide.softwareReleaseId!=='software-release:llama-cpp-b11774')} : profile)};
    const summarize = result => ({candidates:result.candidates,specialists:result.specialists,decisions:result.decisions});
    for (const task of ['writing','documents']) for (const hardware of ['cpu','gpu']) {
      const answers = {task,writingTask:'summary',sources:task==='documents'?'archive':'provided',archiveRole:'search',failure:'retrieval',format:'text',sourceLanguage:'fa',outputLanguage:'fa',inputSize:'short',mode:'interactive',policy:'internal',deployment:'self',hardware,vram:'24',ram:'64',owner:'none',audience:'personal',users:'1'};
      assert.deepEqual(summarize(m.wizard.buildWizardResult(repo,answers,locale)),summarize(m.wizard.buildWizardResult(baseline,answers,locale)),`${task}/${hardware}`);
    }
  });
}
