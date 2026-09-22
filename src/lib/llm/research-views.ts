import { llmSelectionHref } from './selection';
import { benchmarkScope, readScoreScope, scopedModelResults, type ScoreScope } from './score-scope';
import { resultMatchesLanguage, modelLanguageEvidence, evaluationLanguage, languageScopeKey } from './evaluation';
import { reviewedPerformanceProtocol } from './performance-policy';
import type { LlmGuideRepository } from './schema';
import type { LlmViewRow, LlmViewConfig, LlmViewId, ViewValue, LlmFilterConfig, LlmMatrixCell } from './views';
import { createLlmViews } from './views';
import type { ReportedPerformance } from './research';
import { createLlmResearch } from './research';
type Known = Extract<ViewValue, { state: 'known' }>;
export interface ResearchControls {
  context: number; active: number; method: 'gpu' | 'cpu' | 'layerwise' | 'publisher' | 'weights';
  hardwareIds: string[]; ram: number[]; group: string; metric: string;
  deploymentMode: 'routes' | 'kernels'; model: string;
}
import type { LlmI18n } from './i18n/runtime';

/** Text and formatting are edition-scoped; no mutable global locale. */
export function createLlmResearchViews(i18n: LlmI18n) {
const { t, locale, numberFormat } = i18n;
const { llmViewConfigs } = createLlmViews(i18n);
const { research, researchEvidenceId, researchModel, calculateMemory, memoryStatus, faNumber } = createLlmResearch(i18n);
const textValue = (display: string, options: Omit<Partial<Known>, 'state' | 'display'> = {}): Known => ({ state: 'known', display, ...options });
const number = (value: number, unit: string, display = `${faNumber(value)} ${unit}`): Known => textValue(display, { canonicalNumber: value, canonicalUnit: unit, raw: value });
const missing: ViewValue = { state: 'not-measured' };
const evidenceIds = (ids: string[]) => [...new Set(ids.map(researchEvidenceId))];
const source = (ids: string[]) => {
  const item = research.sources.find(source => source.id === ids[0]);
  return item ? textValue(item.publisher ?? t('research-views.0666'), { href: item.url }) : missing;
};
function row(repository: LlmGuideRepository, id: string, label: string, modelName: string | undefined, sourceIds: string[]): LlmViewRow {
  const model = researchModel(repository, modelName);
  return { id, label, ...(model ? { modelId: model.id, modelUrl: `https://huggingface.co/${modelName}` } : {}), inlineDetails: true,
    brandId: modelName ?? label, searchText: [label, modelName].filter(Boolean).join(' '), cells: { model: textValue(label) }, facets: {}, details: {}, sourceIds: evidenceIds(sourceIds),
    comparison: { dimensions: {}, calculation: { status: 'needs-more-data', reason: t('research-views.0667') }, limitations: [] } };
}
const cols = (...pairs: Array<[string, string]>) => pairs.map(([key, label]) => ({ key, label }));
const numericCol = (key: string, label: string) => ({ key, label, numeric: true, sortable: true });
const selectFilter = (id: string, label: string, values: Array<[string, string]>, advanced = false): LlmFilterConfig => ({ id, label, control: 'select', level: advanced ? 'advanced' : 'main', options: values.map(([value, label]) => ({ value, label })) });
const uniqueOptions = (values: string[]) => [...new Set(values)].map(value => [value, value] as [string, string]);
const quantLabel = (value: string) => value.replace('publisher checkpoint default (BF16)', t('research-views.0668'))
  .replace('publisher checkpoint default; FP8/mixed', t('research-views.0669'))
  .replace('backend-appropriate checkpoint/quantization', t('research-views.0670'))
  .replace('16-bit; FP16/BF16 not distinguished in report', t('research-views.0671'));
const performanceGroups: Record<string, { label: string; note: string }> = {
  'gpustack-qwen14-h100-sharegpt': { label: 'Qwen3-14B · H100 · GPUStack', note: t('research-views.0672') },
  'gpustack-qwen32-h100-sharegpt': { label: 'Qwen3-32B · H100 · GPUStack', note: t('research-views.0673') },
  'gpustack-deepseek-h200-sharegpt': { label: t('research-views.0674'), note: t('research-views.0675') },
  'llamacpp-llama2-7b-q4-fa': { label: t('research-views.0676'), note: t('research-views.0677') },
  'qwen-transformers-h20-6144-2048': { label: t('research-views.0678'), note: t('research-views.0679') },
  'dbmart-4090-offline-100-600': { label: t('research-views.0680'), note: t('research-views.0681') },
  'main-horse-gpt-fast-synthetic': { label: t('research-views.0682'), note: t('research-views.0683') }
};
const performanceMetrics: Record<string, { label: string; unit: string }> = {
  outputTokensPerSecond: { label: t('research-views.0684'), unit: 'output-token/s/aggregate' },
  prefill512TokensPerSecond: { label: t('research-views.0686'), unit: 'input-token/s' },
  decode128TokensPerSecond: { label: t('research-views.0688'), unit: 'output-token/s/aggregate' },
  combinedInputOutputTokensPerSecond: { label: t('research-views.0689'), unit: 'input-output-token/s' },
  decodeTokensPerSecond: { label: t('research-views.0691'), unit: 'token/s' },
  meanTtftMs: { label: t('research-views.0693'), unit: 'ms' },
  p99TtftMs: { label: t('research-views.0695'), unit: 'ms' },
  meanTpotMs: { label: t('research-views.0696'), unit: 'ms' },
  requestsPerSecond: { label: t('research-views.0697'), unit: 'request/s' }
};
const protocolLabels: Record<string, string> = { inputTokens: t('research-views.0699'), outputTokens: t('research-views.0700'), generatedTokens: t('research-views.0701'), prefillTokens: t('research-views.0702'), batchSize: t('research-views.0703'), submittedRequests: t('research-views.0704'), inputTokensPerRequest: t('research-views.0705'), outputTokensPerRequest: t('research-views.0706'), mode: t('research-views.0707'), requestMode: t('research-views.0708'), dataset: t('research-views.0709'), benchmarkTool: t('research-views.0710'), speedDefinition: t('research-views.0711'), memoryUnitAsPrinted: t('research-views.0712'), torch: 'PyTorch', flashAttention: 'Flash Attention', autoAwq: 'AutoAWQ', autoAwqKernels: t('research-views.0713') };
const defaultResearchControls: ResearchControls = { context: 8192, active: 1, method: 'gpu', hardwareIds: ['hardware:rtx4090-24', 'hardware:rtx5090-32', 'hardware:rtx6000-ada-48'], ram: [8, 16, 32], group: 'gpustack-qwen14-h100-sharegpt', metric: 'outputTokensPerSecond', deploymentMode: 'routes', model: '' };
function weightFootprintRows(repository: LlmGuideRepository, controls: ResearchControls): LlmViewRow[] {
  const selected = new Map<string, LlmGuideRepository['artifactListings'][number]>();
  for (const artifact of repository.artifactListings) {
    if (artifact.totalBytes === undefined || !['gguf','safetensors','pytorch'].includes(artifact.format)) continue;
    if (artifact.format === 'gguf' && !['Q4_K_M','Q8_0','MXFP4'].includes(artifact.variant.toUpperCase())) continue;
    const key = `${artifact.modelVersionId}:${artifact.format}:${artifact.format === 'gguf' ? artifact.variant.toUpperCase() : 'native'}`;
    const old = selected.get(key);
    if (!old || (old.authority !== 'official' && artifact.authority === 'official')) selected.set(key, artifact);
  }
  return [...selected.values()].map(artifact => {
    const model = repository.models.find(model => model.id === artifact.modelVersionId)!;
    const weightGiB = artifact.totalBytes! / 2 ** 30;
    const result = row(repository, `footprint:${artifact.id}`, model.exactName, model.aliases?.[0], []);
    result.sourceIds = artifact.evidenceIds;
    result.cells = { ...result.cells, quant: textValue(artifact.format === 'gguf' ? artifact.variant : [artifact.format, artifact.precision].filter(Boolean).join(' · '), { caveat: artifact.scopeNote }), weight: number(weightGiB, 'GiB'), condition: textValue(model.kind === 'embedding' || model.kind === 'reranker' || model.kind === 'encoder-classifier' ? t('research-views.0714') : t('research-views.0715')), source: textValue(artifact.publisher, { href: artifact.filesUrl }) };
    result.facets = { quant: result.cells.quant, weight: result.cells.weight };
    result.details = { scope: textValue(t('research-views.0716')), files: textValue(artifact.files.map(file => file.path).join(' · '), { href: artifact.filesUrl }), revision: textValue(artifact.repositoryRevision ?? artifact.variant), method: textValue(t('research-views.0717')) };
    result.matrixCells = Object.fromEntries(research.hardware.filter(device => controls.hardwareIds.includes(device.id)).map(device => {
      const delta = device.nominalAggregateVramGB - weightGiB;
      return [device.id, { value: textValue(delta < 0 ? t('research-views.0718', faNumber(-delta)) : t('research-views.0719', faNumber(delta)), { badge: t('research-views.0720') }), details: [{ label: t('research-views.0721'), value: textValue(delta < 0 ? t('research-views.0722') : t('research-views.0724', device.gpuCount > 1 ? t('research-views.0723') : '')) }], sourceIds: [...artifact.evidenceIds, ...evidenceIds(device.sourceIds)] }];
    }));
    result.searchText += ` ${artifact.format} ${artifact.variant}`;
    return result;
  });
}
function memoryRows(repository: LlmGuideRepository, controls: ResearchControls): LlmViewRow[] {
  if (controls.method === 'weights') return weightFootprintRows(repository, controls);
  if (controls.method === 'layerwise') return research.airllm.map(item => {
    const result = row(repository, item.id, item.modelRepository.split('/')[1], item.modelRepository, item.sourceIds);
    result.cells = { ...result.cells, engine: textValue('AirLLM 4.0.0', { brandId: 'airllm' }), budget: number(item.reportedVramGB, 'GB'), method: textValue(t('research-views.0725'), { badge: t('research-views.0726') }), condition: textValue(item.userSummaryFa), hardware: item.hardwareAsReported ? textValue(item.hardwareAsReported, { brandId: 'nvidia' }) : missing, source: source(item.sourceIds) };
    result.details = { dependencies: textValue(item.dependenciesAsReported), scope: textValue(t('research-views.0727')), 'reported-on': textValue(item.reportedOn) };
    return result;
  });
  if (controls.method === 'publisher') return research.memoryClaims.map(item => {
    const result = row(repository, item.id, item.modelRepository.split('/')[1], item.modelRepository, item.sourceIds);
    result.cells = { ...result.cells, budget: number(item.reportedMemoryGB, 'GB'), method: textValue(t('research-views.0728'), { badge: t('research-views.0726') }), condition: textValue(t('research-views.0729')), source: source(item.sourceIds) };
    result.details = { scope: textValue(t('research-views.0730')) }; return result;
  });
  const cpu = controls.method === 'cpu';
  const rows: LlmViewRow[] = [];
  for (const artifact of research.artifacts) {
    const plan = calculateMemory(artifact, controls.context, controls.active, 1, cpu);
    if (!plan) continue;
    const result = row(repository, artifact.id, artifact.modelRepository.split('/')[1], artifact.modelRepository, artifact.sourceIds);
    result.cells = { ...result.cells, quant: textValue(artifact.quantization), budget: number(plan.budgetGiB, 'GiB'), weight: number(plan.weightGiB, 'GiB'), kv: number(plan.kvGiB, 'GiB') };
    result.facets = { quant: textValue(artifact.quantization), budget: result.cells.budget };
    result.details = { method: textValue(cpu ? t('research-views.0731') : t('research-views.0732')), scope: textValue(t('research-views.0733')), workload: textValue(t('research-views.0734', faNumber(controls.context, 0), faNumber(controls.active, 0))), reserve: number(plan.reserveGiB, 'GiB'), limit: number(artifact.artifactContextLimitTokens, 'token', t('research-views.0735', faNumber(artifact.artifactContextLimitTokens, 0))), revision: textValue(artifact.repositoryRevision, { copyText: artifact.repositoryRevision }), files: textValue(t('research-views.0736', faNumber(artifact.files.length), faNumber(artifact.weightFileBytes, 0)), { href: `https://huggingface.co/${artifact.repository}/tree/${artifact.repositoryRevision}` }), authority: textValue(artifact.authority === 'model-publisher' ? t('research-views.0737') : t('research-views.0738', artifact.repository.split('/')[0])), formula: textValue('KV bytes = 2 × layers × KV heads × head dimension × context × active sequences × 2') };
    result.matrixCells = {};
    if (cpu) for (const ram of controls.ram) result.matrixCells[`ram-${ram}`] = fitCell(plan.budgetGiB, ram, 1, result.sourceIds);
    else for (const device of research.hardware.filter(item => controls.hardwareIds.includes(item.id))) {
      const targetPlan = calculateMemory(artifact, controls.context, controls.active, device.gpuCount)!;
      const cell = fitCell(targetPlan.budgetGiB, device.nominalAggregateVramGB, device.gpuCount, [...result.sourceIds, ...evidenceIds(device.sourceIds)]);
      cell.details?.push({ label: t('research-views.0739'), value: textValue(`${device.architecture} · ${device.interconnect}`) });
      result.matrixCells[device.id] = cell;
    }
    result.details.architecture = textValue(t('research-views.0740', artifact.architecture, faNumber(artifact.layers), faNumber(artifact.kvHeads), faNumber(artifact.headDim)));
    result.details['architecture-basis'] = textValue(artifact.architectureBasis.includes('config') ? t('research-views.0741') : t('research-views.0742'));
    result.searchText += ` ${artifact.quantization} ${artifact.repository}`;
    rows.push(result);
  }
  if (cpu && [4096, 8192].includes(controls.context) && Number.isInteger(controls.active) && controls.active > 0) for (const item of research.slmCpu.filter(item => item.contextTokens === controls.context)) {
    const weight = item.nativeWeightFileBytes * 2 / 2 ** 30;
    const kv = (item.plannedRamGiB - weight - item.reserveGiB) * controls.active;
    const budget = weight + kv + item.reserveGiB;
    const result = row(repository, item.id, item.modelRepository.split('/')[1], item.modelRepository, item.sourceIds);
    result.cells = { ...result.cells, quant: textValue('FP32 · Transformers'), budget: number(budget, 'GiB'), weight: number(weight, 'GiB'), kv: number(kv, 'GiB') };
    result.facets = { quant: textValue('FP32'), budget: result.cells.budget };
    result.details = { method: textValue(t('research-views.0743')), workload: textValue(t('research-views.0744', faNumber(controls.context), faNumber(controls.active))), scope: textValue(t('research-views.0745')), reserve: number(4, 'GiB'), revision: textValue(item.repositoryRevision) };
    result.matrixCells = Object.fromEntries(controls.ram.map(ram => [`ram-${ram}`, fitCell(budget, ram, 1, result.sourceIds)])); rows.push(result);
  }
  return rows;
}
function fitCell(required: number, capacity: number, devices: number, sources: string[]): LlmMatrixCell {
  const status = memoryStatus(required, capacity, devices);
  return { value: textValue(status.label, { badge: status.id === 'over-budget' ? t('research-views.0746', faNumber(required - capacity)) : t('research-views.0747', faNumber(capacity - required)) }), sourceIds: sources,
    details: [{ label: t('research-views.0748'), value: number(required, 'GiB') }, ...(status.note ? [{ label: t('research-views.0749'), value: textValue(status.note) }] : []), { label: t('research-views.0750'), value: number(devices, 'device', faNumber(devices, 0)) }] };
}
function compatibilityRows(repository: LlmGuideRepository, kernels = false): LlmViewRow[] {
  if (kernels) return research.kernels.map(item => {
    const result = row(repository, item.id, item.implementation, undefined, item.sourceIds);
    result.brandId = item.engine;
    result.cells = { ...result.cells, engine: textValue(`${item.engine} ${item.engineVersion}`, { brandId: item.engine }), format: textValue(item.implementation), architecture: textValue(item.architecture, { brandId: 'nvidia' }), status: textValue(item.supported ? t('research-views.0751') : t('research-views.0752')), condition: textValue(t('research-views.0753')), source: source(item.sourceIds) };
    result.facets = { engine: textValue(item.engine), architecture: textValue(item.architecture), status: textValue(item.supported ? 'supported' : 'unsupported') };
    result.details = { scope: textValue(t('research-views.0754')) }; return result;
  });
  const existing = research.compatibility.map(item => {
    const engine = /^(publisher|Publisher documentation|unknown)$/i.test(item.engine) ? '' : item.engine;
    const result = row(repository, item.id, item.modelScope.split('/')[1] ?? item.modelScope, item.modelScope, item.sourceIds);
    const run = research.performance.find(run => run.id === item.performanceId);
    const status = item.status === 'published-run' ? t('research-views.0755') : t('research-views.0756');
    const profile = repository.modelProfiles.find(profile => profile.modelVersionId === result.modelId);
    const route = profile?.runGuides.find(guide => guide.engine === item.engine);
    const condition = [...new Set([...(item.conditionsFa ?? []), ...(route?.conditions ?? []), ...(run && runConfiguration(run) ? [runConfiguration(run)] : [])])].join(t('research-views.0757'));
    result.sourceIds = [...new Set([...result.sourceIds, ...(route?.evidenceIds ?? [])])];
    result.cells = { ...result.cells, engine: engine ? textValue([engine, item.engineVersion].filter(Boolean).join(' '), { brandId: engine }) : missing, format: textValue(quantLabel(item.weightFormat)), status: textValue(status), condition: condition ? textValue(condition) : { state: 'unknown' }, hardware: item.hardwareLabel ? textValue(`${faNumber(item.gpuCount ?? 1)} × ${item.hardwareLabel}`, { brandId: 'nvidia' }) : textValue(item.userSummaryFa), source: source(item.sourceIds) };
    result.facets = { engine: engine ? textValue(engine) : missing, task: textValue(item.task ?? 'generation'), format: textValue(item.artifactId ? 'GGUF' : item.weightFormat.includes('safetensors') ? 'safetensors' : 'checkpoint'), status: textValue(item.status), deployment: textValue(item.engine === 'llama.cpp' || item.engine === 'Ollama' ? 'local' : 'service') };
    result.details = { scope: textValue(item.userSummaryFa), condition: condition ? textValue(condition) : { state: 'unknown' }, ...(run?.servingCommandAsPublished ? { command: textValue(run.servingCommandAsPublished, { copyText: run.servingCommandAsPublished }) } : {}) };
    result.searchText += ` ${item.engine} ${item.weightFormat} ${item.hardwareLabel ?? ''}`; return result;
  });
  const added: LlmViewRow[] = [];
  const approved = new Set(['Ollama','llama.cpp','vLLM','SGLang','Transformers','Sentence Transformers','FlagEmbedding','KTransformers','MLX LM']);
  for (const profile of repository.modelProfiles) {
    const model = repository.models.find(model => model.id === profile.modelVersionId)!;
    for (const guide of profile.runGuides) {
      if (!approved.has(guide.engine) || existing.some(item => item.modelId === model.id && (item.facets.engine as Known)?.display.toLowerCase() === guide.engine.toLowerCase())) continue;
      const result = row(repository, `route:${model.id}:${guide.engine}`, model.exactName, model.aliases?.[0], []);
      const local = ['Ollama','llama.cpp','MLX LM'].includes(guide.engine);
      const task = model.kind === 'embedding' ? 'embedding' : model.kind === 'reranker' ? 'reranking' : model.kind === 'encoder-classifier' ? 'classification' : 'generation';
      const format = guide.engine === 'Ollama' ? 'Ollama package' : guide.engine === 'llama.cpp' ? 'GGUF' : guide.engine === 'MLX LM' ? 'MLX 4-bit safetensors' : 'checkpoint';
      result.sourceIds = guide.evidenceIds;
      result.cells = { ...result.cells, engine: textValue(guide.engine, { brandId: guide.engine }), format: textValue(format), status: textValue(t('research-views.0756')), condition: guide.conditions.length ? textValue(guide.conditions.join(t('research-views.0757'))) : { state: 'unknown' }, hardware: guide.instructions ? textValue(guide.instructions) : { state: 'unknown' }, source: textValue(t('research-views.0758'), { href: guide.href }) };
      result.facets = { engine: textValue(guide.engine), task: textValue(task), format: textValue(format), status: textValue('documented-route'), deployment: textValue(local ? 'local' : 'service') };
      result.details = { ...(guide.instructions ? { scope: textValue(guide.instructions) } : {}), ...(guide.conditions.length ? { condition: textValue(guide.conditions.join(t('research-views.0757'))) } : {}), ...(guide.code ? { command: textValue(guide.code, { copyText: guide.code }) } : {}) };
      result.searchText += ` ${guide.engine} ${format} ${task}`;
      added.push(result);
    }
  }
  return [...existing, ...added];
}
function runConfiguration(item: ReportedPerformance): string {
  const command = item.servingCommandAsPublished ?? '';
  const flags = command.match(/--?(?:tp(?:-size)?|tensor-parallel-size|dp(?:-size)?|data-parallel-size|max_seq_len|enable-dp-attention|enable_chunked_prefill|chunked-prefill-size|mem-fraction-static)(?:[= ]+\d+(?:\.\d+)?)?/g) ?? [];
  return flags.length ? flags.join(' · ') : item.engine === 'SGLang' && item.protocol.contextLength ? t('research-views.0759', faNumber(Number(item.protocol.contextLength)), item.protocol.memoryFractionStatic) : '';
}
function performanceRows(repository: LlmGuideRepository, group: string, metric: string): LlmViewRow[] {
  return research.performance.filter(item => (!group || item.publicationGroup === group) && item.metrics[metric] !== undefined).map(item => {
    const definition = performanceMetrics[metric];
    if (!definition) throw new Error(`Unknown performance metric: ${metric}`);
    const result = row(repository, item.id, item.modelRepository?.split('/')[1] ?? item.modelLabel ?? '', item.modelRepository, item.sourceIds);
    result.sortGroup = `${item.publicationGroup}:${metric}`;
    result.cells = { ...result.cells, engine: textValue([item.engine, item.engineVersion ?? item.engineRevision].filter(Boolean).join(' '), { brandId: item.engine }), hardware: textValue(`${faNumber(item.gpuCount)} × ${item.hardwareLabel}`, { brandId: 'nvidia' }), metric: textValue(definition.label), value: number(item.metrics[metric], definition.unit), ttft: item.metrics.meanTtftMs !== undefined ? number(item.metrics.meanTtftMs / 1000, 's') : missing, format: textValue(quantLabel(item.weightFormat)), configuration: runConfiguration(item) ? textValue(runConfiguration(item)) : missing, conditions: textValue(performanceGroups[item.publicationGroup].note), source: source(item.sourceIds) };
    result.facets = { engine: textValue(item.engine), format: textValue(item.weightFormat), hardware: textValue(item.hardwareLabel) };
    result.details = { group: textValue(performanceGroups[item.publicationGroup].label), scope: textValue(performanceGroups[item.publicationGroup].note), ...(item.servingCommandAsPublished ? { command: textValue(item.servingCommandAsPublished, { copyText: item.servingCommandAsPublished }) } : {}), ...(item.sourceLocator ? { locator: textValue(item.sourceLocator) } : {}), ...(item.engineRevisionUrl ? { revision: textValue(item.engineRevision ?? t('research-views.0761'), { href: item.engineRevisionUrl }) } : {}) };
    result.details.protocol = textValue(Object.entries(item.protocol).map(([key, value]) => `${protocolLabels[key] ?? key}: ${typeof value === 'number' ? faNumber(value, 3) : value}`).join('\n'));
    const otherMetricLabels: Record<string,string> = { successfulRequests: t('research-views.0762'), durationSeconds: t('research-views.0763'), totalInputTokens: t('research-views.0764'), totalOutputTokens: t('research-views.0765'), observedPeakConcurrency: t('research-views.0766'), prefillReportedPlusMinus: t('research-views.0767'), decodeReportedPlusMinus: t('research-views.0768'), reportedGpuMemoryMB: t('research-views.0769'), reportedMemoryGB: t('research-views.0770'), inputTokensPerSecond: t('research-views.0687') };
    result.details.metrics = textValue(Object.entries(item.metrics).map(([key, value]) => `${performanceMetrics[key]?.label ?? otherMetricLabels[key] ?? key}: ${faNumber(value)} ${performanceMetrics[key]?.unit ?? ''}`).join('\n'));
    if (item.artifactName) result.details.artifact = textValue(item.artifactName);
    if (item.reporter) result.details.reporter = textValue(item.reporter);
    if (item.flashAttention !== undefined || item.gpuLayers !== undefined) result.details.optimizations = textValue([item.flashAttention !== undefined ? `Flash Attention: ${item.flashAttention ? t('research-views.0771') : t('research-views.0772')}` : '', item.gpuLayers !== undefined ? t('research-views.0773', faNumber(item.gpuLayers)) : ''].filter(Boolean).join(t('research-views.0757')));
    if (item.weightInitialization) result.details.weights = textValue(t('research-views.0774'));
    if (item.metrics.reportedGpuMemoryMB !== undefined) result.details.memory = number(item.metrics.reportedGpuMemoryMB, 'MB', t('research-views.0775', faNumber(item.metrics.reportedGpuMemoryMB)));
    if (item.metrics.reportedMemoryGB !== undefined) result.details.memory = number(item.metrics.reportedMemoryGB, 'GB');
    result.searchText += ` ${item.engine} ${item.hardwareLabel} ${item.weightFormat}`;
    result.comparison.dimensions = { group: textValue(item.publicationGroup), metric: textValue(metric), unit: textValue(definition.unit),
      model: item.modelRepository ? textValue(item.modelRepository) : missing,
      hardware: textValue(`${item.gpuCount}:${item.hardwareLabel}`), format: textValue(item.weightFormat),
      protocol: textValue(JSON.stringify(item.protocol)),
      execution: textValue(`${item.engine}:${item.engineVersion ?? ''}:${item.servingCommandAsPublished ?? ''}`)
    };
    if (reviewedPerformanceProtocol(item)) {
      result.comparison.calculation = {status:'ready'};
      result.comparison.limitations = [t('performance.scope')];
    }
    return result;
  });
}
function researchView(repository: LlmGuideRepository, id: LlmViewId, controls: ResearchControls): { config: LlmViewConfig; rows: LlmViewRow[] } {
  const base = llmViewConfigs.find(view => view.id === id)!;
  let config: LlmViewConfig = { ...base, layoutKey: id === 'hardware-feasibility' ? [controls.method,...controls.hardwareIds,...controls.ram].join(':') : id === 'deployment-compatibility' ? controls.deploymentMode : id, compact: true, hideEmptyColumns: true, matrixColumns: undefined, optionalColumns: [], presets: base.presets?.map(preset => ({ ...preset, selections: {} })), filters: [], detailColumns: [], defaultColumns: [] };
  let rows: LlmViewRow[] = [];
  if (id === 'hardware-feasibility') {
    rows = memoryRows(repository, controls);
    config.description = controls.method === 'gpu' || controls.method === 'cpu' ? t('research-views.0776') : t('research-views.0777');
    config.defaultColumns = controls.method === 'gpu' || controls.method === 'cpu' ? [...cols(['model', t('research-views.0778')], ['quant', t('research-views.0779')]), numericCol('budget', controls.method === 'cpu' ? t('research-views.0780') : t('research-views.0781')), numericCol('weight', t('research-views.0782')), numericCol('kv', 'KV')] : [...cols(['model', t('research-views.0778')], ['method', t('research-views.0707')], ['hardware', t('research-views.0783')]), numericCol('budget', t('research-views.0784')), ...cols(['condition', t('research-views.0785')], ['source', t('research-views.0786')])];
    config.matrixColumns = controls.method === 'gpu' ? research.hardware.filter(item => controls.hardwareIds.includes(item.id)).map(item => ({ id: item.id, label: item.name })) : controls.method === 'cpu' ? controls.ram.map(ram => ({ id: `ram-${ram}`, label: `${faNumber(ram)} GiB RAM` })) : undefined;
    config.filters = controls.method === 'gpu' || controls.method === 'cpu' ? [selectFilter('quant', t('research-views.0779'), [['Q4_K_M', 'Q4_K_M'], ['Q8_0', 'Q8_0'], ...(controls.method === 'cpu' ? [['FP32', 'FP32 · Transformers'] as [string, string]] : [])]), { id: 'budget', label: t('research-views.0748'), canonicalUnit: 'GiB', control: 'number-range', level: 'advanced' }] : [];
    config.detailColumns = cols(['method', t('research-views.0707')], ['scope', t('research-views.0787')], ['workload', t('research-views.0788')], ['reserve', t('research-views.0789')], ['limit', t('research-views.0790')], ['architecture', t('research-views.0791')], ['architecture-basis', t('research-views.0792')], ['authority', t('research-views.0793')], ['files', t('research-views.0794')], ['revision', t('research-views.0795')], ['formula', t('research-views.0796')], ['dependencies', t('research-views.0797')], ['reported-on', t('research-views.0798')]);
    if (controls.method === 'weights') {
      config.title = t('research-views.0799');
      config.description = t('research-views.0800');
      config.defaultColumns = [...cols(['model',t('research-views.0778')],['quant',t('research-views.0801')]), numericCol('weight',t('research-views.0802')), ...cols(['condition',t('research-views.0803')],['source',t('research-views.0804')])];
      config.matrixColumns = research.hardware.filter(item => controls.hardwareIds.includes(item.id)).map(item => ({ id: item.id, label: item.name }));
      config.filters = [selectFilter('quant',t('research-views.0801'),uniqueOptions(rows.map(row => (row.facets.quant as Known).display))), { id: 'weight', label: t('research-views.0802'), control: 'number-range', level: 'advanced', canonicalUnit: 'GiB' }];
      config.detailColumns = cols(['scope',t('research-views.0805')],['files',t('research-views.0806')],['revision',t('research-views.0807')]);
    }
  } else if (id === 'deployment-compatibility') {
    rows = compatibilityRows(repository, controls.deploymentMode === 'kernels');
    config.title = controls.deploymentMode === 'kernels' ? t('research-views.0808') : t('research-views.0809');
    config.description = t('research-views.0810');
    config.defaultColumns = cols(['model', controls.deploymentMode === 'kernels' ? t('research-views.0811') : t('research-views.0778')], ['engine', t('research-views.0812')], ...(controls.deploymentMode === 'kernels' ? [['architecture', t('research-views.0813')] as [string, string]] : [['format', t('research-views.0814')] as [string, string], ['hardware', t('research-views.0815')] as [string, string]]), ['status', t('research-views.0816')], ['condition', t('research-views.0785')], ['source', t('research-views.0786')]);
    config.filters = [selectFilter('engine', t('research-views.0817'), uniqueOptions(rows.flatMap(row => !Array.isArray(row.facets.engine) && row.facets.engine?.state === 'known' ? [row.facets.engine.display] : [])))];
    config.filters.push(...(controls.deploymentMode === 'kernels' ? [selectFilter('architecture', t('research-views.0813'), uniqueOptions(research.kernels.map(item => item.architecture))), selectFilter('status', t('research-views.0818'), [['supported', t('research-views.0819')], ['unsupported', t('research-views.0820')]])] : [selectFilter('task', t('research-views.0821'), [['generation', t('research-views.0822')], ['embedding', t('research-views.0823')], ['reranking', t('research-views.0824')], ['classification', t('research-views.0825')]]), selectFilter('format', t('research-views.0826'), [['GGUF','GGUF'],['safetensors','safetensors'],['checkpoint',t('research-views.0827')],['Ollama package',t('research-views.0828')]], true), selectFilter('deployment', t('research-views.0829'), [['local',t('research-views.0830')],['service',t('research-views.0831')]], true), selectFilter('status', t('research-views.0832'), [['documented-route',t('research-views.0756')],['published-run',t('research-views.0755')]], true)]));
    config.detailColumns = cols(['scope', t('research-views.0833')], ['condition', t('research-views.0834')], ['command', t('research-views.0835')]);
  } else if (id === 'benchmarks') {
    rows = performanceRows(repository, controls.group, controls.metric);
    config.title = t('research-views.0836'); config.description = performanceGroups[controls.group]?.note ?? t('research-views.0837');
    config.defaultColumns = [...cols(['model', t('research-views.0838')], ['engine', t('research-views.0812')], ['hardware', t('research-views.0839')], ['format', t('research-views.0840')], ['configuration', t('research-views.0841')], ['metric', t('research-views.0842')]), numericCol('value', t('research-views.0843')), numericCol('ttft', t('research-views.0844')), ...cols(['source', t('research-views.0786')])];
    config.defaultColumns = config.defaultColumns.filter(column => rows.some(row => row.cells[column.key]?.state === 'known'));
    config.filters = [selectFilter('engine', t('research-views.0817'), uniqueOptions(rows.flatMap(row => !Array.isArray(row.facets.engine) && row.facets.engine?.state === 'known' ? [row.facets.engine.display] : []))), selectFilter('hardware', t('research-views.0839'), uniqueOptions(rows.map(row => (row.facets.hardware as Known).display))), selectFilter('format', t('research-views.0840'), [...new Set(rows.map(row => (row.facets.format as Known).display))].map(value => [value, quantLabel(value)]), true)];
    config.detailColumns = cols(['group',t('research-views.0845')], ['scope',t('research-views.0846')], ['artifact',t('research-views.0847')], ['reporter',t('research-views.0848')], ['protocol',t('research-views.0849')], ['optimizations',t('research-views.0841')], ['metrics',t('research-views.0850')], ['memory',t('research-views.0851')], ['weights',t('research-views.0852')], ['command',t('research-views.0853')], ['revision',t('research-views.0761')], ['locator',t('research-views.0854')]);
    const shared = ['group','model','hardware','format','protocol','metric','unit'];
    config.comparison = { ...base.comparison,
      summary: t('performance.scope'),
      dimensionLabels: { group:t('research-views.0845'), metric:t('research-views.0842'), unit:t('research-views.0855'), model:t('research-views.0838'), hardware:t('research-views.0839'), format:t('research-views.0840'), protocol:t('research-views.0849'), execution:t('performance.execution') },
      controlledAxes: rows.filter(row=>row.comparison.calculation.status==='ready').length > 1 ? [{id:'execution-path',label:t('performance.execution'),differenceDimensions:['execution'],sharedDimensions:shared}] : [],
      calculationRequiredDimensions: shared, solutionSharedDimensions: [],
      numericMetric: {direction: /Ttft|Tpot/.test(controls.metric) ? 'lower' : 'higher',ratioScale:true}
    };
  }
  if (controls.model && !(id === 'deployment-compatibility' && controls.deploymentMode === 'kernels')) rows = rows.filter(row => row.modelId === controls.model);
  return { config, rows };
}
function enrichExistingRows(repository: LlmGuideRepository, all: Record<LlmViewId, LlmViewRow[]>, targetLanguage = locale === 'en' ? 'all' : locale, scoreScope: ScoreScope = readScoreScope(null, locale), currentUrl?: URL) {
  const rows = { ...all };
  rows['specialized-models'] = all['specialized-models'].map(item => {
    const extra = research.specialized.find(extra => researchModel(repository, extra.modelRepository)?.id === item.modelId);
    if (!extra) {
      const model = repository.models.find(model => model.id === item.modelId);
      const dimension = model?.specializedSpecs?.embeddingDimensions;
      if (model?.kind === 'embedding' && dimension?.state === 'known') {
        const gib = dimension.value * 4 * 1_000_000 / 2 ** 30;
        return { ...item, sourceIds: [...new Set([...item.sourceIds, ...(dimension.evidenceIds ?? [])])], cells: { ...item.cells, 'vector-memory': number(gib, 'GiB', t('research-views.0856', faNumber(gib))) }, details: { ...item.details, 'vector-scope': textValue(t('research-views.0857', dimension.value)) } };
      }
      return { ...item, cells: { ...item.cells, 'vector-memory': textValue(t('research-views.0858')) }, details: { ...item.details, 'vector-scope': textValue(t('research-views.0859')) } };
    }
    return { ...item, sourceIds: [...new Set([...item.sourceIds, ...evidenceIds(extra.sourceIds)])], cells: { ...item.cells, 'vector-memory': extra.denseFloat32VectorGiBPerMillionDocuments !== undefined ? number(extra.denseFloat32VectorGiBPerMillionDocuments, 'GiB', t('research-views.0856', faNumber(extra.denseFloat32VectorGiBPerMillionDocuments))) : textValue(t('research-views.0858')) }, details: { ...item.details, 'vector-scope': textValue(t('research-views.0860')) } };
  });
  rows['software-products'] = all['software-products'].map(item => {
    const release = repository.softwareReleases.find(release => release.id === item.id);
    const extra = research.software.find(extra => extra.versionScope === release?.version && (item.label.toLowerCase().includes(extra.name.toLowerCase()) || (extra.name === 'Text Embeddings Inference' && /text.*embeddings/i.test(item.label))));
    if (!extra) return { ...item, cells: { ...item.cells, 'research-use': item.cells.scenario, 'research-benefit': item.cells['service-features']?.state === 'known' ? item.cells['service-features'] : item.cells['backend-summary'], 'research-condition': textValue(repository.softwareReleases.find(release => release.id === item.id)?.selectionCaveat ?? '') } };
    return { ...item, cells: { ...item.cells, 'research-use': textValue(extra.startingUseFa), 'research-benefit': textValue(extra.usefulFeatureFa), 'research-condition': textValue(extra.selectionConditionFa) }, details: { ...item.details, 'research-version': textValue(extra.versionScope) }, sourceIds: [...new Set([...item.sourceIds, ...evidenceIds(extra.sourceIds)])] };
  });
  for (const id of ['model-catalog', 'model-suitability', 'specialized-models'] as const) rows[id] = rows[id].map(item => {
    const scores = repository.publishedEvaluations.filter(score => score.modelVersionId === item.modelId);
    const scoped = scopedModelResults(scores, item.modelId ?? '', scoreScope);
    const selected = scoreScope.benchmark && scoreScope.metric && scoped.length === 1 ? scoped[0] : undefined;
    let quality: ViewValue;
    if (selected) {
      const modes: Record<string, string> = { thinking: t('research-views.0865'), 'non-thinking': t('research-views.0866'), low: t('research-views.0867'), medium: t('research-views.0868'), high: t('research-views.0869'), max: t('research-views.0870') };
      const metric = selected.metric === 'published score' ? t('research-views.0871') : selected.metric === 'published retrieval score' ? t('research-views.0872') : selected.metric;
      const conditions = [selected.language === 'fa' ? t('research-views.0873') : selected.language,
        selected.mode ? modes[selected.mode] ?? selected.mode : undefined,
        selected.settings.representation ? String(selected.settings.representation) : undefined,
        selected.settings.embeddingDimensions ? t('research-views.0874', faNumber(Number(selected.settings.embeddingDimensions))) : undefined,
        selected.settings.candidateCount ? t('research-views.0875', faNumber(Number(selected.settings.candidateCount))) : undefined,
        selected.settings.retrievalModel ? String(selected.settings.retrievalModel) : undefined,
        selected.settings.sourceScale ? String(selected.settings.sourceScale) : undefined].filter(Boolean);
      quality = textValue(`${benchmarkScope(selected)} · ${metric}: ${faNumber(selected.value)}${selected.unit === 'percent' ? t('research-views.0876') : ''}`, {
        caveat: conditions.join(t('research-views.0757')) || undefined, badge: t('research-views.0877', faNumber(scores.length)), evidenceIds: selected.evidenceIds
      });
    } else if (scoped.length) {
      quality = textValue({fa:'دیدن نتایج به تفکیک آزمون',en:'View results by test',es:'Ver resultados por prueba'}[locale], {badge:faNumber(scoped.length), href: currentUrl ? llmSelectionHref(currentUrl,{model:item.modelId??null,panel:'quality'},id) : undefined});
    } else {
      quality = {state:'unknown', note:{fa:'نتیجه‌ای برای این آزمون، زبان و معیار ثبت نشده است.',en:'No result is recorded for this test, language and metric.',es:'No hay resultado para esta prueba, idioma y métrica.'}[locale]};
    }
    const model = repository.models.find(model => model.id === item.modelId);
    const evidenceStatus = model && targetLanguage !== 'all' ? modelLanguageEvidence(repository, model, targetLanguage) : 'not-recorded';
    const language = textValue(model?.languages.filter(item => item.declared.state === 'known' && item.declared.value).map(item => item.language).join(', ') || '—', {
      caveat: targetLanguage === 'all' ? undefined : `${targetLanguage}: ${t('language.evidence.' + evidenceStatus)}`
    });
    const license = model?.license.name.state === 'known' ? textValue(model.license.name.value, { href: model.license.url.state === 'known' ? model.license.url.value : undefined, caveat: locale !== 'fa' && model.license.commercialUse.state === 'known' && model.license.commercialUse.value !== 'allowed' ? t('research-views.0886') : undefined }) : { state: 'unknown' as const };
    return { ...item, cells: { ...item.cells, 'published-quality': quality, ...(id === 'specialized-models' ? {'quality-metric': quality} : {}), 'target-language': language, license }, facets: { ...item.facets, 'language-evidence': textValue(evidenceStatus, {raw: evidenceStatus}) } };
  });
  return rows;
}
function enrichExistingConfig(config: LlmViewConfig): LlmViewConfig {
  if (locale === 'fa') config = { ...config, filters: config.filters.filter(filter => !['commercial-use','license'].includes(filter.id)) };
  if (['model-catalog','model-suitability'].includes(config.id)) config = { ...config, filters: [
    ...config.filters.filter(filter => filter.id !== 'persian-evidence'),
    selectFilter('language-evidence', t('language.evidence-filter'), ['independently-evaluated','published-result','publisher-claimed','not-recorded'].map(status => [status,t('language.evidence.'+status)]), true)
  ] };
  if (config.id === 'software-products') return { ...config,
    defaultColumns: [config.defaultColumns[0], config.defaultColumns[1], ...cols(['research-use',t('research-views.0887')], ['research-benefit',t('research-views.0888')], ['research-condition',t('research-views.0889')], ['start-docs',t('research-views.0890')])],
    optionalColumns: [...(config.optionalColumns ?? []), ...config.defaultColumns.filter(column => ['platform','backend-summary'].includes(column.key))],
    detailColumns: [...config.detailColumns, ...cols(['research-version',t('research-views.0891')])]
  };
  if (config.id === 'specialized-models') return { ...config,
    description: t('research-views.0892'),
    filters: [...config.filters, selectFilter('language-evidence', t('research-views.0893'), [['independently-evaluated', t('language.evidence.independently-evaluated')], ['published-result', t('research-views.0894')], ['publisher-claimed', t('research-views.0882')], ['not-recorded', t('research-views.0895')]])],
    defaultColumns: [...config.defaultColumns.filter(column => !['features','downloads'].includes(column.key)), ...cols(['target-language',t('research-views.0896')], ['license',t('research-views.0897')], ['published-quality',t('research-views.0898')]), numericCol('vector-memory', t('research-views.0899')), config.defaultColumns.at(-1)!],
    optionalColumns: [...(config.optionalColumns ?? []), ...cols(['features',t('research-views.0900')])],
    detailColumns: [...config.detailColumns, ...cols(['vector-scope',t('research-views.0901')])]
  };
  if (config.id === 'model-catalog' || config.id === 'model-suitability') return { ...config, optionalColumns: [...(config.optionalColumns ?? []), ...cols(['published-quality',t('research-views.0902')])] };
  return config;
}
return { textValue, performanceGroups, performanceMetrics, protocolLabels, defaultResearchControls, weightFootprintRows, memoryRows, compatibilityRows, performanceRows, researchView, enrichExistingRows, enrichExistingConfig };
}
