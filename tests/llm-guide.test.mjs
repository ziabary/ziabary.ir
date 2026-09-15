import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';
import { hasDraftPreview, withDraftPreview } from '../src/lib/draft-preview.mjs';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');
const moduleUrl = (source) => `data:text/javascript;base64,${Buffer.from(source).toString('base64')}`;
const transpile = (source) => ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 }
}).outputText;

const guideUrl = moduleUrl(transpile(await read('src/lib/llm/guide.ts')));
const guide = await import(guideUrl);
const filtering = await import(moduleUrl(transpile(await read('src/lib/llm/filtering.ts'))));
const comparison = await import(moduleUrl(transpile(await read('src/lib/llm/comparison.ts'))));

let viewSource = transpile(await read('src/lib/llm/views.ts'));
const gpuUrl = moduleUrl(transpile(await read('src/lib/gpu-data.ts')));
viewSource = viewSource
  .replaceAll("'$lib/gpu-data'", JSON.stringify(gpuUrl))
  .replaceAll("'./guide'", JSON.stringify(guideUrl));
const views = await import(moduleUrl(viewSource));

let adapterSource = transpile(await read('src/lib/llm/adapters.ts'));
adapterSource = adapterSource.replaceAll("'./guide'", JSON.stringify(guideUrl));
const adapters = await import(moduleUrl(adapterSource));
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

test('the draft has seven sections, eight data views, empty production rows and the required taxonomies', () => {
  assert.equal(guide.llmGuideCollection.status, 'draft');
  assert.equal(views.llmGuideSections.length, 7);
  assert.equal(views.llmViewConfigs.length, 8);
  assert.equal(views.llmGuideSections.find((section) => section.id === 'serving-software').views.length, 2);
  const productionRows = adapters.buildLlmViewRows(guide.llmRepository);
  assert.deepEqual(Object.keys(productionRows), views.llmViewConfigs.map((view) => view.id));
  for (const rows of Object.values(productionRows)) assert.deepEqual(rows, []);

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

test('planned metadata has fourteen titles and mappings but no publishable article fields or routes', () => {
  assert.equal(guide.plannedArticles.length, 14);
  assert.deepEqual(guide.plannedArticles.map((article) => article.order), Array.from({ length: 14 }, (_, index) => index + 1));
  assert.equal(new Set(guide.plannedArticles.map((article) => article.id)).size, 14);
  assert.equal(new Set(guide.plannedArticles.map((article) => article.slug)).size, 14);
  assert.match(guide.plannedArticles[12].title, /^Ollama، vLLM، SGLang یا llama\.cpp/);
  assert.match(guide.plannedArticles[13].title, /^مدل، موتور اجرا، API و رابط چت/);
  const existingIds = new Set(guide.existingContentLinks.map((item) => item.id));
  for (const article of guide.plannedArticles) {
    assert.equal(article.status, 'planned');
    assert.ok(article.relatedContentIds.length);
    assert.ok(article.relatedContentIds.every((id) => existingIds.has(id)), article.id);
    for (const forbidden of ['body', 'excerpt', 'date', 'readTime', 'href']) assert.equal(article[forbidden], undefined, `${article.id}.${forbidden}`);
    assert.equal(existsSync(`src/lib/content/articles/${article.slug}.md`), false, article.slug);
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

test('economics separates observation dates from calculation basis and preserves registered users vs concurrency', () => {
  const rows = adapters.buildLlmViewRows(fixture.syntheticLlmRepository).economics;
  const config = views.llmViewConfigs.find((view) => view.id === 'economics');
  assert.notEqual(fixture.syntheticLlmRepository.costScenarios[0].priceInputs[0].observedOn, fixture.syntheticLlmRepository.costScenarios[1].priceInputs[0].observedOn);
  assert.equal(fixture.syntheticLlmRepository.costScenarios[0].calculationBasisDate, fixture.syntheticLlmRepository.costScenarios[1].calculationBasisDate);
  assert.equal(comparison.evaluateComparison(rows, config.comparison, 'solution-selection').calculationStatus, 'valid');
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
  assert.match(unreviewedRow.cells['service-features'].display, /not-reviewed/);
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
