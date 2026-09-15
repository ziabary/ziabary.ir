import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';
import { loadLlmModules } from './helpers/llm-modules.mjs';
import { hasDraftPreview, withDraftPreview } from '../src/lib/draft-preview.mjs';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');
const moduleUrl = (source) => `data:text/javascript;base64,${Buffer.from(source).toString('base64')}`;
const transpile = (source) => ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 }
}).outputText;

const { guide, views, adapters, filtering, comparison, presentation } = await loadLlmModules();
const dataset = guide.llmRepository;
const fixture = await import(moduleUrl(transpile(await read('tests/fixtures/llm-synthetic.ts'))));

test('draft preview accepts only the exact true query value', () => {
  for (const value of [null, '', 'false', '1', 'TRUE', ' true']) {
    const params = new URLSearchParams();
    if (value !== null) params.set('show-drafts', value);
    assert.equal(hasDraftPreview(params), false, String(value));
  }
  assert.equal(hasDraftPreview(new URLSearchParams('show-drafts=true')), true);
  assert.equal(withDraftPreview('/guides/llm/#model-catalog'), '/guides/llm/?show-drafts=true#model-catalog');
});

test('the draft has six sections, seven data views, versioned research rows and the required taxonomies', () => {
  assert.equal(guide.llmGuideCollection.status, 'draft');
  assert.equal(views.llmGuideSections.length, 6);
  assert.equal(views.llmViewConfigs.length, 7);
  assert.equal(views.llmGuideSections.find((section) => section.id === 'serving-software').views.length, 2);
  const productionRows = adapters.buildLlmViewRows(guide.llmRepository);
  assert.deepEqual(Object.keys(productionRows), views.llmViewConfigs.map((view) => view.id));
  assert.deepEqual(Object.fromEntries(Object.entries(productionRows).map(([id, rows]) => [id, rows.length])), {
    'model-catalog': 87, 'model-suitability': 87, 'hardware-feasibility': 0, 'software-products': 13,
    'deployment-compatibility': 0, benchmarks: 0, 'specialized-models': 20
  });

  for (const name of ['vLLM', 'SGLang', 'llama.cpp', 'Transformers', 'AirLLM']) assert.ok(guide.engineCandidates.includes(name));
  for (const name of ['Ollama', 'vLLM', 'SGLang', 'llama.cpp / llama-server', 'LM Studio', 'TensorRT-LLM', 'Triton Inference Server', 'Text Embeddings Inference', 'AirLLM', 'Hugging Face Transformers', 'LiteLLM', 'Open WebUI', 'Text Generation Inference']) {
    assert.ok(guide.softwareProductCandidates.some((candidate) => candidate.name === name), name);
  }
  assert.equal(guide.softwareProductCandidates.find((item) => item.id === 'tgi').maintenanceHint.status, 'maintenance');
  assert.ok(guide.softwareProductCandidates.every((item) => item.officialUrl.startsWith('https://')));

  for (const id of ['nvidia-rtx3090', 'nvidia-rtx4090', 'nvidia-rtx4090-modified-48gb', 'nvidia-rtx5090', 'nvidia-rtx-a6000', 'nvidia-rtx6000-ada', 'nvidia-rtx-pro-6000-server', 'nvidia-h100-pcie-80', 'nvidia-h100-sxm', 'nvidia-h200-nvl', 'nvidia-h200-sxm', 'cpu-ram', 'multi-gpu']) {
    assert.ok(views.hardwareTargets.some((target) => target.id === id), id);
  }
  assert.match(readFileSync('src/lib/llm/views.ts', 'utf8'), /gpuRecords\.find/);
});

test('all three general start presets begin without hidden exclusions', () => {
  const software = views.llmViewConfigs.find((view) => view.id === 'software-products');
  const suitability = views.llmViewConfigs.find((view) => view.id === 'model-suitability');
  const deployment = views.llmViewConfigs.find((view) => view.id === 'deployment-compatibility');
  assert.deepEqual(software.filters.filter((item) => item.level === 'main').map((item) => item.id), ['need-type', 'environment', 'software-role']);
  assert.deepEqual(software.presets.find((item) => item.id === 'software-choice').selections, {});
  assert.deepEqual(suitability.presets.find((item) => item.id === 'task-first').selections, {});
  assert.deepEqual(deployment.presets.find((item) => item.id === 'memory-constrained').selections, {});
  assert.equal(views.llmViewConfigs.find((view) => view.id === 'model-catalog').presets, undefined);
  for (const id of ['queueing', 'concurrency', 'batching', 'admission-control', 'model-load-unload', 'multi-model', 'cold-start', 'prefix-caching', 'speculative-decoding', 'offload', 'multi-gpu-sharding', 'independent-replicas', 'streaming', 'structured-output', 'tool-use', 'reasoning-control', 'model-template', 'parser', 'monitoring', 'metrics', 'health-check', 'authentication', 'rate-limiting', 'software-license', 'maintenance']) {
    assert.ok(software.filters.some((item) => item.id === id && item.level === 'advanced'), id);
  }
});

test('writing plans retain fourteen entries and available manuscripts remain drafts', () => {
  assert.equal(guide.plannedArticles.length, 14);
  assert.deepEqual(guide.plannedArticles.map((article) => article.order), Array.from({ length: 14 }, (_, index) => index + 1));
  assert.equal(new Set(guide.plannedArticles.map((article) => article.id)).size, 14);
  assert.equal(new Set(guide.plannedArticles.map((article) => article.slug)).size, 14);
  assert.match(guide.plannedArticles[12].title, /^Ollama، vLLM، SGLang یا llama\.cpp/);
  assert.match(guide.plannedArticles[13].title, /^مدل، موتور اجرا، API و رابط چت/);
  const existingIds = new Set(guide.existingContentLinks.map((item) => item.id));
  for (const article of guide.plannedArticles) {
    assert.equal(article.status, 'planned');
    // A planned article may have no directly relevant published predecessor.
    assert.ok(Array.isArray(article.relatedContentIds));
    assert.ok(article.relatedContentIds.every((id) => existingIds.has(id)), article.id);
    for (const forbidden of ['body', 'excerpt', 'date', 'readTime', 'href']) assert.equal(article[forbidden], undefined, `${article.id}.${forbidden}`);
    const manuscript = `src/lib/content/articles/${article.slug}.md`;
    if (existsSync(manuscript)) assert.match(readFileSync(manuscript, 'utf8'), /^draft:\s*true\s*$/m, article.slug);
  }
});

function headingId(title) {
  return title.normalize('NFC').toLowerCase().replace(/[\s\u200c]+/g, '-').replace(/[^\p{L}\p{N}_-]/gu, '').replace(/-+/g, '-').replace(/^-|-$/g, '') || 'section';
}

test('every internal URL and stored anchor maps to an existing published Persian article', async () => {
  for (const item of guide.existingContentLinks) {
    const match = /^\/articles\/([^/]+)\/$/.exec(item.href);
    assert.ok(match, item.href);
    const source = await read(`src/lib/content/articles/${match[1]}.md`);
    assert.match(source, /^lang:\s*fa$/m, item.id);
    assert.doesNotMatch(source, /^draft:\s*true$/m, item.id);
    const headings = [...source.matchAll(/^#{2,3}\s+(.+)$/gm)].map((result) => headingId(result[1].replace(/\s*\{#[^}]+\}\s*$/, '')));
    for (const anchor of item.anchors ?? []) assert.ok(headings.includes(anchor.id), `${item.id}#${anchor.id}`);
  }
  for (const relations of Object.values(guide.viewRelatedContent)) for (const relation of relations) {
    const item = guide.existingContentLinks.find((candidate) => candidate.id === relation.contentId);
    assert.ok(item, relation.contentId);
    if (relation.anchorId) assert.ok(item.anchors?.some((anchor) => anchor.id === relation.anchorId), `${relation.contentId}#${relation.anchorId}`);
  }
});

const known = (display, raw, canonicalNumber, canonicalUnit) => ({ state: 'known', display, raw, canonicalNumber, canonicalUnit });
const row = (id, parameter, state = 'known') => ({
  id, label: id, searchText: id === 'a' ? 'Qwen مدل فارسی' : id,
  cells: { parameter: state === 'known' ? known(String(parameter), parameter, parameter, 'B') : { state } },
  facets: { parameter: state === 'known' ? known(String(parameter), parameter, parameter, 'B') : { state }, family: known(id === 'a' ? 'Qwen' : 'Other', id === 'a' ? 'Qwen' : 'Other') },
  details: {}, sourceIds: [], comparison: { dimensions: { metric: known('parameter', 'parameter'), unit: known('B', 'B') }, calculation: { status: state === 'known' ? 'ready' : 'needs-more-data' }, limitations: [] }
});

test('filtering normalizes Persian, composes AND/OR, handles missing and sorts real zero correctly', () => {
  const rows = [row('a', 8), row('zero', 0), row('unknown', 0, 'unknown'), row('two', 2)];
  const filters = [
    { id: 'parameter', label: 'پارامتر', control: 'number-range', level: 'main', canonicalUnit: 'B' },
    { id: 'family', label: 'خانواده', control: 'multi', level: 'main' }
  ];
  assert.equal(filtering.filterLlmRows(rows, filters, {}, 'qwen').length, 1);
  assert.equal(filtering.filterLlmRows(rows, filters, {}, 'فارسي').length, 1);
  assert.deepEqual(filtering.filterLlmRows(rows, filters, { parameter: { min: '۰', max: '۰' } }, '').map((item) => item.id), ['zero']);
  assert.deepEqual(filtering.filterLlmRows(rows, filters, { family: ['Qwen', 'Other'], parameter: { min: '2', max: '8' } }, '').map((item) => item.id), ['a', 'two']);
  assert.deepEqual(filtering.sortLlmRows(rows, 'parameter', 'asc').map((item) => item.id), ['zero', 'two', 'a', 'unknown']);
  assert.deepEqual(filtering.sortLlmRows(rows, 'parameter', 'desc').map((item) => item.id), ['a', 'two', 'zero', 'unknown']);
  assert.equal(filtering.missingLabel({ state: 'not-measured' }), 'اندازه‌گیری نشده');
  assert.equal(filtering.missingLabel({ state: 'not-applicable' }), 'قابل‌اعمال نیست');
});

test('side-by-side accepts differences while calculations obey axis and common-condition rules', () => {
  const rows = [row('first', 1), row('second', 2)];
  assert.deepEqual(filtering.updateComparison(['first'], rows[1], rows, 4).ids, ['first', 'second']);
  const policy = {
    summary: 'test', dimensionLabels: { metric: 'معیار', unit: 'واحد' },
    controlledAxes: [{ id: 'row', label: 'ردیف', differenceDimensions: ['row'], sharedDimensions: ['metric', 'unit'] }],
    solutionSharedDimensions: ['metric', 'unit'], calculationRequiredDimensions: ['metric', 'unit'],
    examples: { allowed: '', invalidCalculation: '', needsMoreData: '' }
  };
  assert.equal(comparison.evaluateComparison(rows, policy, 'side-by-side').calculationStatus, 'display-only');
  assert.equal(comparison.evaluateComparison(rows, policy, 'controlled-experiment').calculationStatus, 'needs-more-data');
  assert.equal(comparison.evaluateComparison(rows, policy, 'controlled-experiment', 'row').calculationStatus, 'valid');
});

test('test-only fixture validates and canonical adapters populate all eight views with scoped sources', () => {
  assert.deepEqual(adapters.validateLlmRepository(fixture.syntheticLlmRepository), []);
  const rows = adapters.buildLlmViewRows(fixture.syntheticLlmRepository);
  assert.deepEqual(Object.keys(rows), views.llmViewConfigs.map((view) => view.id));
  for (const [view, items] of Object.entries(rows)) {
    assert.ok(items.length > 0, view);
    assert.ok(items.every((item) => item.sourceIds.length > 0), view);
  }
  assert.ok(rows['model-suitability'][0].matrixCells['text-work'].sourceIds.length);
  const hardwareRows = rows['hardware-feasibility'];
  const sharedHardwareRow = hardwareRows.find((item) => item.matrixCells['nvidia-rtx3090'] && item.matrixCells['nvidia-rtx4090'] && item.facets['execution-method'].raw === 'full-gpu');
  assert.ok(sharedHardwareRow, 'two like-for-like hardware deployments must share one matrix row');
  assert.equal(sharedHardwareRow.matrixCells['nvidia-rtx3090'].results.length, 2, 'multiple results in one cell must not overwrite');
  assert.equal(sharedHardwareRow.matrixCells['nvidia-rtx4090'].results.length, 1);
  assert.equal(sharedHardwareRow.matrixCells['nvidia-rtx4090'].results[0].deploymentConfigId, 'deployment:synthetic-a-hardware-b');
  assert.deepEqual(sharedHardwareRow.matrixCells['nvidia-rtx4090'].results[0].sourceIds, ['evidence:synthetic-direct']);
  assert.ok(sharedHardwareRow.matrixCells['nvidia-rtx4090'].results[0].details.some((item) => item.value.display === 'deployment:synthetic-a-hardware-b'));
  const offloadRow = hardwareRows.find((item) => item.facets['execution-method'].raw === 'cpu-gpu-offload');
  assert.ok(offloadRow);
  assert.notEqual(offloadRow.id, sharedHardwareRow.id, 'a materially different method must not merge into the common row');
  const deployments = fixture.syntheticLlmRepository.deploymentConfigurations;
  assert.equal(adapters.hardwareFeasibilityGroupKey(deployments.find((item) => item.id === 'deployment:synthetic-a-hardware-a')), adapters.hardwareFeasibilityGroupKey(deployments.find((item) => item.id === 'deployment:synthetic-a-hardware-b')));
  assert.notEqual(adapters.hardwareFeasibilityGroupKey(deployments.find((item) => item.id === 'deployment:synthetic-a-hardware-b')), adapters.hardwareFeasibilityGroupKey(deployments.find((item) => item.id === 'deployment:synthetic-a-hardware-b-offload')));
  const hardwareConfig = views.llmViewConfigs.find((view) => view.id === 'hardware-feasibility');
  assert.equal(filtering.filterLlmRows(hardwareRows, hardwareConfig.filters, { hardware: ['nvidia-rtx4090'] }, '').length, 2);
  assert.equal(filtering.filterLlmRows(hardwareRows, hardwareConfig.filters, { hardware: ['nvidia-rtx3090'], 'execution-method': ['cpu-gpu-offload'] }, '').length, 0);
  assert.equal(filtering.updateComparison([sharedHardwareRow.id], offloadRow, hardwareRows, 4).ids.length, 2);
  assert.match(rows['deployment-compatibility'][0].cells['serving-stack'].display, /Gateway مصنوعی 1\.0-test \+ موتور مصنوعی [AB]/);
  assert.match(rows['software-products'].find((item) => item.id.includes('engine-a')).details['api-compatibility'].display, /\/synthetic\/chat/);
  assert.equal(fixture.syntheticLlmRepository.executionFeasibility.find((item) => item.id === 'feasibility:synthetic-a-ha').additionalStorage.value, 0);
  assert.equal(fixture.syntheticLlmRepository.executionFeasibility.find((item) => item.id === 'feasibility:synthetic-b-ha').additionalStorage.state, 'not-applicable');
  assert.equal(fixture.syntheticLlmRepository.executionFeasibility.find((item) => item.id === 'feasibility:synthetic-b-ha').peakTemporaryStorage.state, 'not-measured');
  assert.equal(fixture.syntheticLlmRepository.executionFeasibility.find((item) => item.id === 'feasibility:synthetic-a-hb').additionalStorage.state, 'unknown');
});

test('engine and hardware controlled comparisons work; incompatible conditions block calculations only', () => {
  const rows = adapters.buildLlmViewRows(fixture.syntheticLlmRepository).benchmarks;
  const config = views.llmViewConfigs.find((view) => view.id === 'benchmarks');
  const engineA = rows.find((item) => item.id === 'benchmark:synthetic-a-hardware-a');
  const engineB = rows.find((item) => item.id === 'benchmark:synthetic-b-hardware-a');
  const hardwareB = rows.find((item) => item.id === 'benchmark:synthetic-a-hardware-b');
  const engines = comparison.evaluateComparison([engineA, engineB], config.comparison, 'controlled-experiment', 'software');
  assert.equal(engines.calculationStatus, 'valid');
  assert.ok(engines.differences.some((item) => item.dimension === 'stack'));
  assert.ok(engines.differences.some((item) => item.dimension === 'backend'));
  const fixedBackend = comparison.evaluateComparison([engineA, engineB], config.comparison, 'controlled-experiment', 'service-layer');
  assert.equal(fixedBackend.calculationStatus, 'invalid');
  assert.ok(fixedBackend.mismatchedSharedDimensions.includes('backend'));
  const changedWorkload = structuredClone(engineB);
  changedWorkload.comparison.dimensions.workload = known('different-workload', 'different-workload');
  const workloadMismatch = comparison.evaluateComparison([engineA, changedWorkload], config.comparison, 'controlled-experiment', 'software');
  assert.equal(workloadMismatch.calculationStatus, 'invalid');
  assert.ok(workloadMismatch.mismatchedSharedDimensions.includes('workload'));
  const missingWorkload = structuredClone(engineB);
  missingWorkload.comparison.dimensions.workload = { state: 'unknown' };
  assert.equal(comparison.evaluateComparison([engineA, missingWorkload], config.comparison, 'controlled-experiment', 'software').calculationStatus, 'needs-more-data');
  const hardware = comparison.evaluateComparison([engineA, hardwareB], config.comparison, 'controlled-experiment', 'hardware');
  assert.equal(hardware.calculationStatus, 'valid');
  assert.ok(hardware.differences.some((item) => item.dimension === 'hardware'));
  const wrongAxis = comparison.evaluateComparison([engineA, hardwareB], config.comparison, 'controlled-experiment', 'software');
  assert.equal(wrongAxis.calculationStatus, 'invalid');
  assert.equal(wrongAxis.rankingAllowed, false);
  assert.equal(comparison.evaluateComparison([engineA, hardwareB], config.comparison, 'side-by-side').calculationStatus, 'display-only');
});

test('registered user population remains separate from active concurrency', () => {
  assert.notEqual(fixture.syntheticLlmRepository.workloads[0].registeredUsers.value, fixture.syntheticLlmRepository.workloads[0].concurrency.value);
});

test('provenance validation catches artifact attribution and missing precise locators', () => {
  const badAttribution = structuredClone(fixture.syntheticLlmRepository);
  badAttribution.qualityEvaluations[0].artifactRevision = 'wrong-revision';
  assert.ok(adapters.validateLlmRepository(badAttribution).some((error) => /exact artifact revision|attribution/.test(error)));

  const badLocator = structuredClone(fixture.syntheticLlmRepository);
  badLocator.evidence[0].locator = '';
  assert.ok(adapters.validateLlmRepository(badLocator).some((error) => /locator is empty/.test(error)));

  const noCapabilityEvidence = structuredClone(fixture.syntheticLlmRepository);
  noCapabilityEvidence.softwareCapabilities[0].evidenceIds = [];
  assert.ok(adapters.validateLlmRepository(noCapabilityEvidence).some((error) => /factual capability\/API claim has no evidence/.test(error)));

  const unreviewedWithoutEvidence = structuredClone(fixture.syntheticLlmRepository);
  assert.equal(unreviewedWithoutEvidence.softwareCapabilities.find((item) => item.status === 'not-reviewed').evidenceIds.length, 0);
  assert.deepEqual(adapters.validateLlmRepository(unreviewedWithoutEvidence), []);

  const unexplainedNotApplicable = structuredClone(fixture.syntheticLlmRepository);
  delete unexplainedNotApplicable.softwareCapabilities.find((item) => item.status === 'not-applicable').statusReason;
  assert.ok(adapters.validateLlmRepository(unexplainedNotApplicable).some((error) => /not-applicable status has no reason/.test(error)));

  const softwareRows = adapters.buildLlmViewRows(fixture.syntheticLlmRepository)['software-products'];
  const unreviewedRow = softwareRows.find((item) => item.id === 'software-release:synthetic-engine-b-v1');
  assert.doesNotMatch(unreviewedRow.cells['service-features'].display, /not-reviewed|بررسی‌نشده/);
  assert.match(unreviewedRow.details['all-capabilities'].display, /بررسی‌نشده/);
  const noApiRecord = softwareRows.find((item) => item.id === 'software-release:synthetic-gateway-v1').details['api-compatibility'];
  assert.equal(noApiRecord.state, 'unknown');
  assert.match(filtering.missingLabel(noApiRecord), /رکورد بررسی ثبت نشده؛ نتیجهٔ مثبت یا منفی ندارد/);
});

test('the synthetic fixture is test-only and has no import path from production source', async () => {
  const productionFiles = ['src/lib/llm/guide.ts', 'src/lib/llm/adapters.ts', 'src/lib/llm/views.ts', 'src/lib/components/LlmGuidePage.svelte'];
  for (const path of productionFiles) assert.doesNotMatch(await read(path), /llm-synthetic|Synthetic Test Lab|مدل مولد مصنوعی/);
});

test('prerendered public HTML contains only the noindex gate, never draft content', { skip: !existsSync('build/guides/llm/index.html') }, () => {
  const guidesHtml = readFileSync('build/guides/index.html', 'utf8');
  const llmHtml = readFileSync('build/guides/llm/index.html', 'utf8');
  const sitemap = readFileSync('build/sitemap.xml', 'utf8');
  const search = JSON.parse(readFileSync('build/search/fa.json', 'utf8'));
  for (const text of [guide.llmGuideCollection.title, guide.plannedArticles[0].title, guide.plannedArticles[13].title]) {
    assert.doesNotMatch(guidesHtml, new RegExp(text));
    assert.doesNotMatch(llmHtml, new RegExp(text));
  }
  assert.match(llmHtml, /<meta name="robots" content="noindex,follow"/);
  assert.match(llmHtml, /صفحه پیدا نشد/);
  assert.doesNotMatch(sitemap, /\/guides\/llm\//);
  assert.ok(!search.some((item) => item.href === '/guides/llm/'));
});


test('dataset preserves numeric semantics, known notes, N/A and source provenance', () => {
  const rows = adapters.adaptModelCatalog(guide.llmRepository);
  const qwen = rows.find(row => row.label === 'Qwen3-8B');
  assert.ok(qwen);
  assert.equal(qwen.details['declared-context'].canonicalNumber, 32768);
  assert.ok(qwen.details['declared-context'].note);
  assert.equal(qwen.details['evaluated-context'].state, 'not-measured');
  assert.equal(qwen.details['active-parameters'].state, 'not-applicable');
  assert.doesNotMatch(qwen.cells['size-architecture'].display, /قابل‌اعمال نیست/);
  assert.ok(qwen.sourceIds.some(id => guide.llmRepository.evidence.find(e => e.id === id)?.derivation));
  assert.ok(qwen.details['license-url'].href.startsWith('https://'));
  assert.ok(qwen.details['weight-caveat'].display.includes('VRAM'));
  assert.ok(rows.find(row => row.label.includes('aya-expanse')).details['license-restrictions'].display);
});

test('unreviewed capabilities and unknown or false language claims do not grant suitability', () => {
  const repository = structuredClone(guide.llmRepository);
  const model = repository.models[0];
  model.languages = [{ language: 'fa', declared: { state: 'unknown' } }, { language: 'es', declared: { state: 'known', value: false } }];
  const row = adapters.adaptModelCatalog(repository).find(r => r.id === model.id);
  assert.deepEqual(row.facets.language, []);
  for (const capability of repository.softwareCapabilities) capability.status = 'not-reviewed';
  const rows = adapters.adaptSoftwareProducts(repository);
  assert.ok(rows.every(row => !row.facets['need-type'].some(v => v.raw === 'specialized-task')));
});

test('real snapshot family, size and evidence filters retain unknown semantics', () => {
  const config = views.llmViewConfigs.find(v => v.id === 'model-catalog');
  const rows = adapters.buildLlmViewRows(guide.llmRepository)['model-catalog'];
  for (const family of ['SmolLM', 'BGE', 'E5']) {
    assert.ok(config.filters.find(f => f.id === 'family').options.some(o => o.value === family));
    assert.ok(filtering.filterLlmRows(rows, config.filters, { family: [family] }, '').length > 0);
  }
  const small = filtering.filterLlmRows(rows, config.filters, { 'model-size': { min: '0', max: '1' } }, '');
  assert.ok(small.length > 0);
  assert.ok(small.every(row => row.facets['model-size'].canonicalNumber <= 1));
  const suitability = adapters.adaptModelSuitability(guide.llmRepository);
  assert.equal(suitability.reduce((n, row) => n + Object.values(row.matrixCells).filter(cell => cell.value.state === 'known').length, 0), 136);
  assert.ok(guide.llmRepository.applicationAssessments.every(a => a.outcome.state === 'not-measured'));
});

test('documented applications survive an unknown outcome but never survive missing evidence', () => {
  const repo = structuredClone(guide.llmRepository);
  const assessment = repo.applicationAssessments[0];
  assessment.outcome = { state: 'unknown', note: 'No task-specific test' };
  assert.equal(adapters.documentedAssessmentValue(assessment, repo).state, 'known');
  assert.notEqual(adapters.documentedAssessmentValue(assessment, repo).raw, 'meets');
  const generic = { ...assessment, summary: undefined };
  assert.match(adapters.documentedAssessmentValue(generic, repo).display, /سازنده/);
  assessment.evidenceIds = [];
  assert.equal(adapters.documentedAssessmentValue(assessment, repo).state, 'unknown');
  assessment.evidenceIds = ['evidence:does-not-exist'];
  assert.equal(adapters.documentedAssessmentValue(assessment, repo).state, 'unknown');
});

test('table reading plans point to planned entries and do not invent published article routes', () => {
  const slugs = new Set(guide.plannedArticles.map(article => article.slug));
  for (const view of views.llmViewConfigs) {
    const links = guide.viewPlannedArticles[view.id];
    assert.ok(links?.length, view.id);
    assert.ok(links.every(slug => slugs.has(slug)), view.id);
    assert.equal(new Set(links).size, links.length);
  }
  assert.deepEqual(guide.viewRelatedContent['model-suitability'], [{ contentId: 'rag-cag-kag-fine-tuning-instruction-tuning' }]);
  assert.deepEqual(guide.viewRelatedContent['specialized-models'], []);
  assert.ok(guide.viewPlannedArticles['specialized-models'].includes('enterprise-rag-model-embedding-reranker'));
  assert.ok(guide.viewPlannedArticles['software-products'].includes('ollama-vllm-sglang-or-llama-cpp'));
});

test('Persian parameter sizes retain numeric filtering values and unambiguous units', () => {
  const row = adapters.adaptModelCatalog(guide.llmRepository).find(row => row.label === 'Qwen3-8B');
  assert.match(row.cells['size-architecture'].display, /۸٫۲ میلیارد/);
  assert.equal(row.cells['size-architecture'].canonicalNumber, 8.2);
  assert.equal(row.facets['total-parameters'].raw, 8.2);
  for (const model of adapters.adaptModelCatalog(guide.llmRepository)) {
    assert.doesNotMatch(model.cells['size-architecture'].display, /[۰-۹]B/);
  }
  assert.ok(guide.guideParameterBands.every(band => band.label.includes('میلیارد')));
});

test('editorial suggestions require both a reason and a source; primary purpose is separately justified', () => {
  const repo = structuredClone(guide.llmRepository);
  const assessment = repo.applicationAssessments[0];
  assessment.basis = 'editorial-recommendation';
  delete assessment.rationale;
  assert.equal(adapters.documentedAssessmentValue(assessment, repo).state, 'unknown');
  assessment.rationale = 'The cited model card documents semantic retrieval for this model.';
  assert.equal(adapters.documentedAssessmentValue(assessment, repo).badge, 'پیشنهاد راهنما');
  assessment.evidenceIds = [];
  assert.equal(adapters.documentedAssessmentValue(assessment, repo).state, 'unknown');
});

test('every positive matrix cell has an explicitly sourced assessment and empty applications stay empty', () => {
  const repo = guide.llmRepository;
  const rows = adapters.adaptModelSuitability(repo);
  const columns = views.llmViewConfigs.find(view => view.id === 'model-suitability').matrixColumns;
  let positive = 0, empty = 0;
  for (const row of rows) for (const column of columns) {
    const value = row.matrixCells[column.id]?.value;
    if (value?.state !== 'known') { empty++; continue; }
    positive++;
    const model = repo.models.find(model => model.exactName === row.label);
    assert.ok(model, row.label);
    assert.ok(repo.applicationAssessments.some(a => a.modelVersionId === model.id && a.applicationId === column.id && a.evidenceIds.some(id => repo.evidence.some(e => e.id === id))));
  }
  assert.equal(positive, 136);
  assert.equal(empty, rows.length * columns.length - positive);
});

test('publisher scores without tested commits stay with named models and cannot populate exact executions', () => {
  const repo = structuredClone(guide.llmRepository);
  const before = adapters.buildLlmViewRows({ ...repo, publishedEvaluations: [] });
  const result = repo.publishedEvaluations[0];
  assert.equal(result.evaluatedRevision, undefined);
  assert.ok(result.sourceDocumentRevision);
  assert.equal(adapters.validateLlmRepository(repo).length, 0);
  const after = adapters.buildLlmViewRows(repo);
  for (const id of ['hardware-feasibility', 'deployment-compatibility', 'benchmarks']) assert.deepEqual(after[id], before[id]);
  const named = after['model-catalog'].find(row => row.id === result.modelVersionId);
  assert.ok(named.publishedResults.some(item => item.id === result.id));
  assert.ok(named.publishedResults.every(item => item.reportedModelName === named.label));
  const ownAssessment = repo.applicationAssessments.find(a => a.modelVersionId === result.modelVersionId);
  ownAssessment.artifactId = repo.artifacts.find(a => a.modelVersionId === result.modelVersionId).id;
  const artifactRow = adapters.adaptModelSuitability(repo).find(row => row.id.includes(ownAssessment.artifactId));
  assert.deepEqual(artifactRow.publishedResults, []);
});

test('published-result validator rejects wrong model names, missing evidence and fabricated deployment attribution', () => {
  for (const mutate of [
    result => { result.reportedModelName = 'A different quantized variant'; },
    result => { result.evidenceIds = []; },
    result => { result.deploymentConfigId = 'deployment:invented'; },
    result => { result.artifactRevision = 'invented'; },
    result => { result.value = NaN; }
  ]) {
    const repo = structuredClone(guide.llmRepository);
    mutate(repo.publishedEvaluations[0]);
    assert.ok(adapters.validateLlmRepository(repo).length > 0);
  }
});

test('Qwen scores, dimensions and provenance preserve the publisher table without inventing an evaluation date', () => {
  const repo = guide.llmRepository;
  for (const [name, dim, score] of [['Qwen3-Embedding-0.6B', 1024, 64.33], ['Qwen3-Embedding-4B', 2560, 69.45], ['Qwen3-Embedding-8B', 4096, 70.58]]) {
    const model = repo.models.find(m => m.exactName === name);
    const result = repo.publishedEvaluations.find(r => r.modelVersionId === model.id && r.benchmark === 'MTEB Multilingual');
    assert.equal(model.declaredContext.value, 32768);
    assert.equal(model.specializedSpecs.embeddingDimensions.value, dim);
    assert.equal(result.value, score);
    assert.equal(result.metric, 'Mean (Task)');
    assert.equal(result.unit, 'score');
    assert.equal(result.evaluatedOn, undefined);
    assert.equal(result.evaluatedRevision, undefined);
    assert.match(result.language, /فارسی نیست/);
    assert.match(model.specializedSpecs.adjustableDimensions.value, /انتخاب‌شده/);
  }
  const distill = repo.publishedEvaluations.filter(r => r.id.startsWith('published-evaluation:deepseek-distill'));
  assert.equal(distill.length, 30);
  assert.equal(new Set(distill.map(r => r.modelVersionId)).size, 5);
  for (const r of distill.filter(r => r.metric === 'rating')) {
    assert.notEqual(r.unit, 'percent');
    assert.equal(r.settings['پاسخ نمونه برای هر پرسش'], undefined);
  }
});

test('component counts are visible but do not enter logical-total filters; context keeps raw numeric data', () => {
  const repo = structuredClone(guide.llmRepository);
  const model = repo.models.find(model => model.exactName === 'Qwen3.5-2B');
  model.totalParametersB = { state: 'unknown' };
  model.parameterCounts = model.parameterCounts.filter(count => count.scope === 'language-component');
  const rows = adapters.adaptModelCatalog(repo);
  const config = views.llmViewConfigs.find(v => v.id === 'model-catalog');
  const component = rows.find(row => row.label === 'Qwen3.5-2B');
  assert.match(component.cells['size-architecture'].display, /جزء زبانی/);
  assert.equal(component.facets['total-parameters'].state, 'unknown');
  assert.ok(!filtering.filterLlmRows(rows, config.filters, { 'model-size': { min: '0', max: '3' } }, '').includes(component));
  const qwen = rows.find(row => row.label === 'Qwen3-8B');
  assert.equal(qwen.cells.context.raw, 32768);
  assert.equal(qwen.cells.context.canonicalNumber, 32768);
  assert.equal(qwen.cells.context.canonicalUnit, 'token');
  assert.match(qwen.cells.context.caveat, /YaRN/);
  assert.equal(qwen.details.revision.copyText.length, 40);
  assert.ok(!config.defaultColumns.some(c => /revision|hash/.test(c.key)));
});

test('release, review and partial dates are distinct in rendering, filtering and sorting', async () => {
  const { sourceDateValue, sourceDateRange } = presentation;
  const ollama = adapters.adaptSoftwareProducts(guide.llmRepository).find(row => row.label.startsWith('Ollama'));
  assert.equal(ollama.details['released-on'].raw, '2026-09-05');
  assert.equal(ollama.details['last-reviewed'].raw, '2026-09-15');
  const month = sourceDateValue('2025-02'), year = sourceDateValue('2023');
  assert.equal(month.raw, '2025-02');
  assert.equal(month.dateRange.precision, 'month');
  assert.equal(year.dateRange.precision, 'year');
  assert.equal(sourceDateRange('2025-02-30'), undefined);
  assert.equal(sourceDateRange('2025-13'), undefined);
  assert.equal(sourceDateValue(undefined).state, 'unknown');
  const make = (id, date) => ({ id, label: id, searchText: '', cells: { date }, facets: { date } });
  const rows = [make('month', month), make('day', sourceDateValue('2025-02-15')), make('missing', sourceDateValue())];
  const filter = [{ id: 'date', control: 'date-range' }];
  assert.deepEqual(filtering.filterLlmRows(rows, filter, { date: { min: '2025-02-20', max: '2025-02-28' } }, '').map(r => r.id), ['month']);
  assert.deepEqual(filtering.sortLlmRows(rows, 'date', 'asc').map(r => r.id), ['month', 'day', 'missing']);
  assert.deepEqual(filtering.sortLlmRows(rows, 'date', 'desc').map(r => r.id), ['day', 'month', 'missing']);
});

test('empty columns are hidden from the whole snapshot and remain selectable, without moving filtered layouts', () => {
  const config = { hideEmptyColumns: true, defaultColumns: [{ key: 'name' }, { key: 'unknown' }, { key: 'sometimes' }] };
  const all = [{ cells: { name: { state: 'known', display: 'a' }, unknown: { state: 'unknown' }, sometimes: { state: 'known', display: 'b' } } }, { cells: { name: { state: 'known', display: 'c' }, sometimes: { state: 'unknown' } } }];
  assert.deepEqual(views.defaultLlmColumns(config, all).map(c => c.key), ['name', 'sometimes']);
  assert.ok(config.defaultColumns.some(c => c.key === 'unknown'));
  const specialized = views.llmViewConfigs.find(v => v.id === 'specialized-models');
  assert.ok(!specialized.defaultColumns.some(c => c.key === 'work-rate'));
  assert.ok(specialized.optionalColumns.some(c => c.key === 'work-rate'));
  const component = readFileSync('src/lib/components/LlmDataView.svelte', 'utf8');
  assert.match(component, /defaultLlmColumns\(config, rows\)/);
  assert.doesNotMatch(component, /defaultLlmColumns\(config, (?:filtered|visible)/);
});

test('software keeps conditional support and needs explicit throughput scenario evidence', () => {
  const repo = structuredClone(guide.llmRepository);
  assert.ok(repo.softwareCapabilities.some(c => c.status === 'supported'));
  assert.ok(repo.softwareCapabilities.filter(c => c.status === 'conditional').every(c => c.scope.conditions.length));
  for (const release of repo.softwareReleases) delete release.documentedNeeds;
  const rows = adapters.adaptSoftwareProducts(repo);
  assert.ok(rows.every(row => !row.facets['need-type'].some(v => v.raw === 'high-throughput')));
  for (const row of rows) {
    const summary = row.cells['service-features'];
    if (summary.state === 'known') {
      assert.ok(summary.display.split('، ').length <= 4);
      assert.doesNotMatch(summary.display, /conditional|native|task-generation/);
    }
  }
});

test('model release-date filtering uses release evidence, including month-only and year-only precision', () => {
  const rows = adapters.adaptModelCatalog(guide.llmRepository);
  const filters = views.llmViewConfigs.find(v => v.id === 'model-catalog').filters;
  const february = filtering.filterLlmRows(rows, filters, { 'released-on': { min: '2025-02-10', max: '2025-02-20' } }, '');
  assert.ok(february.some(row => row.label === 'Phi-4-mini-instruct'));
  assert.ok(!february.some(row => row.label.startsWith('SmolLM2')));
  const e5 = filtering.filterLlmRows(rows, filters, { 'released-on': { min: '2023-06-01', max: '2023-06-30' } }, '');
  assert.ok(e5.some(row => row.label === 'multilingual-e5-small'));
});

test('all catalog models have distinct sourced profiles, practical guidance, downloads and run paths', () => {
  assert.equal(dataset.modelProfiles.length, 87);
  assert.equal(new Set(dataset.modelProfiles.map(profile => profile.introduction)).size, 87);
  for (const model of dataset.models) {
    const profile = dataset.modelProfiles.find(item => item.modelVersionId === model.id);
    assert.ok(profile?.introduction.trim(), model.id);
    assert.ok(profile.runGuides.length && profile.runGuides.every(run => run.engine.trim() && run.label.trim() && run.href.startsWith('https://') && run.evidenceIds.length));
    assert.ok(dataset.modelUseGuidance.some(item => item.modelVersionId === model.id && item.description.trim() && item.evidenceIds.length));
    assert.ok(dataset.artifactListings.some(item => item.modelVersionId === model.id && item.authority === 'official'));
  }
});

test('default usage guide explains all RAG roles without an experimental outcome', () => {
  const rows = adapters.adaptModelUseGuidance(dataset);
  assert.equal(rows.length, 87);
  const config = views.modelUseViewConfig();
  assert.equal(config.matrixColumns, undefined);
  const rag = filtering.filterLlmRows(rows, config.filters, { application: ['enterprise-rag'] }, '');
  assert.ok(rag.some(row => row.modelId === 'model:baai-bge-m3'));
  assert.ok(rag.some(row => row.modelId === 'model:baai-bge-reranker-v2-m3'));
  assert.ok(rag.some(row => row.modelId === 'model:ibm-granite-granite-3-3-2b-instruct'));
  for (const item of dataset.modelUseGuidance) assert.ok(!('outcome' in item));
  const bge = rows.find(row => row.modelId === 'model:baai-bge-m3');
  assert.match(bge.cells.role.display, /بازیابی سند/);
  assert.match(bge.cells.introduction.display, /چندبرداری/);
});

test('optional usage matrix contains only generators and retains known text-only limitations', () => {
  const rows = adapters.adaptModelUseMatrix(dataset);
  assert.equal(rows.length, 67);
  assert.ok(!rows.some(row => /bge-m3|reranker|embedding|e5-small/.test(row.modelId)));
  const gemma = rows.find(row => row.modelId === 'model:google-gemma-3-1b-it');
  assert.equal(gemma.matrixCells['document-vision'].value.display, 'ورودی متنی');
  assert.match(gemma.matrixCells['document-vision'].details[0].value.display, /OCR/);
  assert.equal(gemma.matrixCells['coding-assistant'].value.badge, 'برنامه‌نویسی');
  assert.ok(gemma.matrixCells['coding-assistant'].details.some(detail => detail.value.display?.includes('برنامهٔ میزبان')));
  const qwen = rows.find(row => row.modelId === 'model:qwen-qwen3-8b');
  assert.ok(!qwen.matrixCells['enterprise-rag'].details.some(detail => /آزمون|حد قبولی/.test(detail.label)));
});

test('verified GGUF download links work without a base revision and preserve exact experimental artifacts', () => {
  const qwen = dataset.artifactListings.filter(item => item.modelVersionId === 'model:qwen-qwen3-8b' && item.format === 'gguf');
  for (const variant of ['Q4_K_M', 'Q8_0']) {
    const item = qwen.find(item => item.variant === variant);
    assert.ok(item && !item.baseRevision && item.authority === 'official');
    assert.equal(item.baseModelRepository, 'Qwen/Qwen3-8B');
    assert.ok(item.files[0].url.includes(item.repositoryRevision));
    assert.equal(item.totalBytes, item.files.reduce((total, file) => total + file.bytes, 0));
  }
  assert.equal(dataset.artifacts.length, 59);
  assert.ok(dataset.artifacts.every(item => item.baseRevision));
  const config = views.llmViewConfigs.find(view => view.id === 'model-catalog');
  const rows = adapters.buildLlmViewRows(dataset)['model-catalog'];
  const filtered = filtering.filterLlmRows(rows, config.filters, {'download-format':['gguf']}, '');
  assert.equal(filtered.length, new Set(dataset.artifactListings.filter(item => item.format === 'gguf').map(item => item.modelVersionId)).size);
  assert.ok(filtered.some(row => row.modelId === 'model:baai-bge-m3'));
  assert.ok(filtered.some(row => row.modelId === 'model:google-gemma-3-1b-it'));
});

test('BGE download authority and execution paths do not conflate embedding with chat or all M3 outputs', () => {
  const list = dataset.artifactListings.filter(item => item.modelVersionId === 'model:baai-bge-m3');
  assert.ok(list.some(item => item.publisher === 'gpustack' && item.authority === 'third-party'));
  assert.ok(list.some(item => item.format === 'ollama' && item.authority === 'third-party'));
  const profile = dataset.modelProfiles.find(item => item.modelVersionId === 'model:baai-bge-m3');
  const ollama = profile.runGuides.find(run => run.engine === 'Ollama');
  assert.match(ollama.code, /\/api\/embed/); assert.doesNotMatch(ollama.code, /ollama run|chat\/completions/);
  assert.match(profile.runGuides[0].code, /return_sparse=True, return_colbert_vecs=True/);
  const reranker = dataset.modelProfiles.find(item => item.modelVersionId === 'model:baai-bge-reranker-v2-m3');
  assert.match(reranker.runGuides[0].code, /compute_score/);
});

test('download and use-guidance validators reject wrong identity, broken sums and fake outcomes', () => {
  const invalid = structuredClone(dataset);
  invalid.artifactListings[0].baseModelRepository = 'Qwen/Qwen3-8B';
  invalid.artifactListings[1].totalBytes += 5;
  invalid.modelUseGuidance[0].outcome = 'good';
  const errors = adapters.validateLlmRepository(invalid);
  assert.ok(errors.some(error => error.includes('base model identity')));
  assert.ok(errors.some(error => error.includes('inconsistent file sizes')));
  assert.ok(errors.some(error => error.includes('experimental outcome')));
});

test('Persian context display never mixes Persian digits with K', () => {
  for (const row of adapters.adaptModelCatalog(dataset)) {
    if (row.cells.context.state === 'known') assert.doesNotMatch(row.cells.context.display, /[۰-۹]K/);
  }
  assert.match(adapters.adaptModelCatalog(dataset).find(row => row.id === 'model:baai-bge-m3').cells.context.display, /۸٬۱۹۲ توکن/);
});

test('profile presentation removes repeated introductions without dropping task conditions or sources', () => {
  let duplicatesRemoved = 0;
  for (const profile of dataset.modelProfiles) {
    const uses = dataset.modelUseGuidance.filter(use => use.modelVersionId === profile.modelVersionId);
    const cards = presentation.profileUseCards(profile, uses);
    const descriptions = cards.map(card => card.description).filter(Boolean);
    assert.equal(new Set(descriptions).size, descriptions.length);
    assert.ok(!descriptions.includes(profile.introduction));
    cards.forEach((card, index) => {
      assert.equal(card.id, uses[index].id);
      assert.deepEqual(card.conditions, uses[index].conditions);
      assert.deepEqual(card.evidenceIds, uses[index].evidenceIds);
      if (!card.description) duplicatesRemoved++;
    });
  }
  assert.ok(duplicatesRemoved > 100);
});

test('shared run notes preserve engine scope, commands and engine-specific restrictions', () => {
  let sharedCount = 0;
  for (const profile of dataset.modelProfiles) {
    const result = presentation.profileRunCards(profile);
    assert.equal(result.guides.length, profile.runGuides.length);
    result.guides.forEach((guide, index) => {
      const original = profile.runGuides[index];
      assert.equal(guide.code, original.code);
      assert.equal(guide.href, original.href);
      assert.deepEqual(guide.evidenceIds, original.evidenceIds);
      for (const condition of original.conditions) {
        assert.ok(guide.conditions.includes(condition) || result.shared.some(note => note.text === condition && note.engines.includes(guide.engine)), profile.id);
      }
    });
    for (const note of result.shared) {
      sharedCount++;
      assert.ok(!result.guides.some(guide => guide.conditions.includes(note.text)));
      assert.deepEqual(note.engines, [...new Set(profile.runGuides.filter(guide => guide.conditions.includes(note.text)).map(guide => guide.engine))]);
    }
  }
  assert.ok(sharedCount > 40);
  const bge = dataset.modelProfiles.find(profile => profile.modelVersionId === 'model:baai-bge-m3');
  assert.match(presentation.profileRunCards(bge).guides[0].code, /return_colbert_vecs=True/);
});

test('an official run link needs identity and evidence, but no placeholder instruction paragraph', () => {
  const sample = structuredClone(dataset);
  const run = sample.modelProfiles[0].runGuides[0];
  delete run.instructions; run.conditions = [];
  assert.deepEqual(adapters.validateLlmRepository(sample), []);
  for (const key of ['href', 'engine', 'label']) {
    const value = run[key]; run[key] = '';
    assert.ok(adapters.validateLlmRepository(sample).some(error => error.includes('incomplete run path')));
    run[key] = value;
  }
  run.evidenceIds = [];
  assert.ok(adapters.validateLlmRepository(sample).some(error => error.includes('incomplete run path')));
});

test('usage matrix leaves unsupported editorial suggestions empty while keeping known input limits', () => {
  const model = dataset.models.find(model => !dataset.modelUseGuidance.some(use => use.modelVersionId === model.id && use.applicationId === 'agents-tools') && model.kind === 'generative');
  assert.ok(model);
  const row = adapters.adaptModelUseMatrix(dataset).find(row => row.modelId === model.id);
  assert.equal(row.matrixCells['agents-tools'], undefined);
  assert.equal(row.matrixCells['document-vision'].value.display, 'ورودی متنی');
});
