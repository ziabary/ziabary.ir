import { gpuRecords } from '$lib/gpu-data';
import { createLlmPresentation } from './presentation';
import { createLlmGuide } from './guide';
import type { MissingReason, PublishedEvaluation } from './schema';
export type LlmViewId =
  | 'model-catalog'
  | 'model-suitability'
  | 'hardware-feasibility'
  | 'software-products'
  | 'deployment-compatibility'
  | 'benchmarks'
  | 'specialized-models';
export type ViewValue =
  | {
      state: 'known';
      display: string;
      brandId?: string;
      note?: string;
      /** Must stay visible in the compact row because it changes selection. */
      caveat?: string;
      badge?: string;
      copyText?: string;
      dateRange?: { start: number; end: number; precision: 'day' | 'month' | 'year' };
      href?: string;
      raw?: string | number | boolean;
      sortValue?: string | number;
      canonicalNumber?: number;
      canonicalUnit?: string;
      evidenceIds?: string[];
    }
  | { state: MissingReason; note?: string; evidenceIds?: string[] };
export interface LlmMatrixCell {
  value: ViewValue;
  details?: Array<{ label: string; value: ViewValue }>;
  sourceIds?: string[];
  /** Preserves every independently sourced result when a logical cell has more than one. */
  results?: LlmMatrixCellResult[];
}
export interface LlmMatrixCellResult {
  id: string;
  deploymentConfigId?: string;
  value: ViewValue;
  details?: Array<{ label: string; value: ViewValue }>;
  sourceIds?: string[];
}
export type ComparisonMode = 'side-by-side' | 'controlled-experiment' | 'solution-selection';
export type CalculationReadiness = 'ready' | 'needs-more-data' | 'invalid';
export interface LlmRowComparisonContext {
  /** Explicit semantic conditions; not a single opaque equality signature. */
  dimensions: Record<string, ViewValue>;
  calculation: { status: CalculationReadiness; reason?: string };
  limitations: string[];
}
export interface LlmViewRow {
  /** Scenario details stay inline; the name still opens the shared model profile. */
  inlineDetails?: boolean;
  id: string;
  modelId?: string;
  modelUrl?: string;
  downloadLinks?: Array<{ label: string; href: string }>;
  brandId?: string;
  label: string;
  searchText: string;
  cells: Record<string, ViewValue>;
  matrixCells?: Record<string, ViewValue | LlmMatrixCell>;
  facets: Record<string, ViewValue | ViewValue[]>;
  details: Record<string, ViewValue>;
  sourceIds: string[];
  publishedResults?: PublishedEvaluation[];
  comparison: LlmRowComparisonContext;
  /** Numerical ordering must stay within compatible report/metric/currency groups. */
  sortGroup?: string;
}
export type FilterControl = 'text' | 'select' | 'multi' | 'number-range' | 'date-range' | 'boolean';
export interface FilterOption {
  value: string;
  label: string;
  note?: string;
  count?: number;
}
export interface LlmFilterConfig {
  id: string;
  label: string;
  control: FilterControl;
  level: 'main' | 'advanced';
  options?: FilterOption[];
  canonicalUnit?: string;
  placeholder?: string;
}
export interface LlmColumnConfig {
  key: string;
  label: string;
  sortable?: boolean;
  numeric?: boolean;
}
export interface MatrixColumn {
  id: string;
  label: string;
  note?: string;
}
export interface ControlledComparisonAxis {
  id: string;
  label: string;
  differenceDimensions: string[];
  sharedDimensions: string[];
}
export interface ComparisonPolicy {
  /** Numeric ordering is separate from ratios and statistical superiority. */
  numericMetric?: { direction: 'higher' | 'lower'; ratioScale: boolean };
  summary: string;
  dimensionLabels: Record<string, string>;
  controlledAxes: ControlledComparisonAxis[];
  solutionSharedDimensions: string[];
  calculationRequiredDimensions: string[];
  examples: {
    allowed: string;
    invalidCalculation: string;
    needsMoreData: string;
  };
}
export interface LlmViewPreset {
  id: string;
  label: string;
  selections: Record<string, string | string[] | { min: string; max: string }>;
}
export interface LlmViewConfig {
  layoutKey?: string;
  id: LlmViewId;
  presentation?: 'guidance' | 'matrix';
  sectionId: string;
  sectionNumber: number;
  subviewNumber?: number;
  title: string;
  shortTitle: string;
  description: string;
  referenceLinks?: Array<{ label: string; href: string }>;
  tableLabel: string;
  defaultColumns: LlmColumnConfig[];
  optionalColumns?: LlmColumnConfig[];
  detailColumns: LlmColumnConfig[];
  matrixColumns?: MatrixColumn[];
  compact?: boolean;
  hideEmptyColumns?: boolean;
  filters: LlmFilterConfig[];
  presets?: LlmViewPreset[];
  comparison: ComparisonPolicy;
  comparisonLimit: number;
  noDataMessage: string;
}
import type { LlmI18n } from './i18n/runtime';

/** Text and formatting are edition-scoped; no mutable global locale. */
export function createLlmViews(i18n: LlmI18n) {
const { t, locale, numberFormat } = i18n;
const { llmLabel } = createLlmPresentation(i18n);
const { applications, engineCandidates, executionMethodCandidates, guideParameterBands, modelFamilyCandidates, parallelismCandidates, softwareProductCandidates } = createLlmGuide(i18n);
const option = (value: string, label = llmLabel(value), note?: string): FilterOption => ({ value, label, ...(note ? { note } : {}) });
const options = (values: readonly string[]) => values.map((value) => option(value));
const applicationOptions = applications.map((item) => option(item.id, item.label));
const stageOptions = [
  option('base', t('views.0286')), option('instruct', t('views.0287')), option('reasoning', t('views.0288')),
  option('distilled', t('views.0289')), option('other', t('views.0290'))
];
const kindOptions = [
  option('generative', t('views.0291')), option('embedding', t('views.0292')), option('reranker', t('views.0293')),
  option('encoder-classifier', t('views.0294')), option('vision-language', t('views.0295')), option('other', t('views.0290'))
];
const evidenceOptions = [
  option('direct-measurement', t('views.0296')),
  option('publisher-report', t('views.0297')),
  option('third-party-report', t('views.0298')),
  option('documented-specification', t('views.0299')),
  option('calculated-from-specifications', t('views.0300')),
  option('editorial-analysis', t('views.0301')),
  option('unknown-needs-review', t('views.0302')),
  option('missing', t('views.0303'))
];
const methodOptions = executionMethodCandidates.map((item) => option(item.id, item.label));
const parallelOptions = parallelismCandidates.map((item) => option(item.id, item.label));
const sizeBandOptions = guideParameterBands.map((item) => option(item.id, item.label, t('views.0304')));
const supportOptions = [
  option('supported', t('views.0305')), option('conditional', t('views.0306')),
  option('not-supported', t('views.0307')), option('not-reviewed', t('views.0308')),
  option('not-applicable', t('views.0309'))
];
const provisionOptions = [
  option('native', t('views.0310')), option('plugin', t('views.0311')),
  option('external-component', t('views.0312')), option('not-applicable', t('views.0309'))
];
const softwareRoleOptions = [
  option('inference-engine-library', t('views.0313')), option('api-server', t('views.0314')),
  option('model-manager', t('views.0315')), option('gateway', t('views.0316')),
  option('user-interface', t('views.0317')), option('deployment-manager', t('views.0318'))
];
const capabilityFilters: Array<[string, string]> = [
  ['tasks', t('views.0319')], ['queueing', t('views.0320')], ['concurrency', t('views.0321')],
  ['batching', 'Batching'], ['admission-control', t('views.0322')], ['model-load-unload', t('views.0323')],
  ['multi-model', t('views.0324')], ['cold-start', 'Cold start'], ['prefix-caching', 'Prefix caching'],
  ['speculative-decoding', 'Speculative decoding'], ['offload', t('views.0325')],
  ['multi-gpu-sharding', t('views.0326')], ['independent-replicas', t('views.0327')],
  ['streaming', 'Streaming'], ['structured-output', t('views.0328')], ['tool-use', 'Tool calling'],
  ['reasoning-control', t('views.0329')], ['model-template', t('views.0330')], ['parser', 'Parser'],
  ['monitoring', t('views.0331')], ['metrics', 'Metrics'], ['health-check', 'Health check'],
  ['authentication', t('views.0332')], ['rate-limiting', t('views.0333')]
];
const gpuTargetIds = [
  'nvidia-rtx3090', 'nvidia-rtx4090', 'nvidia-rtx5090', 'nvidia-rtx-a6000',
  'nvidia-rtx6000-ada', 'nvidia-rtx-pro-6000-server', 'nvidia-h100-pcie-80',
  'nvidia-h100-nvl', 'nvidia-h100-sxm', 'nvidia-h200-nvl', 'nvidia-h200-sxm'
] as const;
const selectedGpus = gpuTargetIds.map((id) => {
  const record = gpuRecords.find((item) => item.id === id);
  if (!record) throw new Error(`Missing canonical GPU record: ${id}`);
  return record;
});
const hardwareTargets: MatrixColumn[] = [
  { id: 'cpu-ram', label: t('views.0334'), note: t('views.0335') },
  { id: 'low-memory-gpu', label: t('views.0336'), note: t('views.0337') },
  ...selectedGpus.map((gpu) => ({
    id: gpu.id,
    label: `${gpu.model} · ${new Intl.NumberFormat(numberFormat).format(gpu.memoryGB)} GB`,
    note: t('views.0338', gpu.formFactor)
  })),
  {
    id: 'nvidia-rtx4090-modified-48gb', label: t('views.0339'),
    note: t('views.0340')
  },
  { id: 'multi-gpu', label: t('views.0341'), note: t('views.0342') }
];
const comparison = (
  summary: string,
  dimensionLabels: Record<string, string>,
  controlledAxes: ControlledComparisonAxis[],
  solutionSharedDimensions: string[],
  calculationRequiredDimensions: string[],
  examples: ComparisonPolicy['examples']
): ComparisonPolicy => ({ summary, dimensionLabels, controlledAxes, solutionSharedDimensions, calculationRequiredDimensions, examples });
const llmViewConfigs: LlmViewConfig[] = [
  {
    id: 'model-catalog', sectionId: 'model-catalog', sectionNumber: 1,
    shortTitle: t('views.0343'), title: t('views.0343'),
    description: t('views.0344'),
    tableLabel: t('views.0345'),
    compact: true, hideEmptyColumns: true,
    optionalColumns: [{ key: 'released-on', label: t('views.0346'), sortable: true }],
    defaultColumns: [
      { key: 'model', label: t('views.0347'), sortable: true },
      { key: 'family-publisher', label: t('views.0348'), sortable: true },
      { key: 'size-architecture', label: t('views.0349'), sortable: true },
      { key: 'modalities', label: t('views.0350') },
      { key: 'context', label: t('views.0351'), sortable: true, numeric: true },
      { key: 'applications', label: t('views.0352') },
      { key: 'license', label: t('views.0353') },
      { key: 'downloads', label: t('views.0354') }
    ],
    detailColumns: [
      { key: 'model-id', label: t('views.0355') }, { key: 'revision', label: t('views.0356') },
      { key: 'kind-stage', label: t('views.0357') }, { key: 'lineage', label: t('views.0358') },
      { key: 'total-parameters', label: t('views.0359') }, { key: 'active-parameters', label: t('views.0360') },
      { key: 'parameter-scope', label: t('views.0361') },
      { key: 'declared-context', label: t('views.0362') }, { key: 'context-extension', label: t('views.0363') },
      { key: 'evaluated-context', label: t('views.0364') },
      { key: 'languages', label: t('views.0365') },
      { key: 'weight-files', label: t('views.0366') }, { key: 'weight-caveat', label: t('views.0367') },
      { key: 'license-url', label: t('views.0368') }, { key: 'commercial-use', label: t('views.0369') }, { key: 'license-restrictions', label: t('views.0370') },
      { key: 'released-on', label: t('views.0371'), sortable: true }, { key: 'last-reviewed', label: t('views.0372') },
      { key: 'sources', label: t('views.0373') }
    ],
    filters: [
      { id: 'download-format', label: t('views.0374'), control: 'multi', level: 'main', options: options(['gguf', 'safetensors', 'pytorch', 'onnx', 'ollama']) },
      { id: 'run-engine', label: t('views.0375'), control: 'multi', level: 'main', options: options(['Ollama', 'llama.cpp', 'vLLM', 'SGLang', 'Transformers', 'Sentence Transformers', 'FlagEmbedding']) },
      { id: 'download-authority', label: t('views.0376'), control: 'multi', level: 'advanced', options: [option('official', t('views.0377')), option('third-party', t('views.0378'))] },
      { id: 'family', label: t('views.0379'), control: 'multi', level: 'main', options: options(modelFamilyCandidates) },
      { id: 'publisher', label: t('views.0380'), control: 'text', level: 'main' },
      { id: 'model-version', label: t('views.0381'), control: 'select', level: 'advanced', options: [] },
      { id: 'model-kind', label: t('views.0382'), control: 'multi', level: 'main', options: kindOptions },
      { id: 'model-stage', label: t('views.0383'), control: 'multi', level: 'main', options: stageOptions },
      { id: 'model-size', label: t('views.0384'), control: 'number-range', level: 'main', canonicalUnit: 'B', placeholder: t('views.0385') },
      { id: 'active-parameters', label: t('views.0386'), control: 'number-range', level: 'advanced', canonicalUnit: 'B' },
      { id: 'size-band', label: t('views.0387'), control: 'select', level: 'advanced', options: sizeBandOptions },
      { id: 'architecture', label: t('views.0388'), control: 'multi', level: 'advanced', options: options(['dense', 'moe', 'hybrid', 'other']) },
      { id: 'attention-architecture', label: t('views.0389'), control: 'select', level: 'advanced', options: [option('hybrid', t('views.0390'))] },
      { id: 'commercial-use', label: t('views.0369'), control: 'select', level: 'advanced', options: [option('allowed', t('views.0391')), option('restricted', t('views.0306')), option('prohibited', t('views.0392'))] },
      { id: 'input-modality', label: t('views.0393'), control: 'multi', level: 'advanced', options: options(['text', 'image', 'audio', 'video', 'structured-data']) },
      { id: 'output-modality', label: t('views.0394'), control: 'multi', level: 'advanced', options: options(['text', 'embedding', 'structured-data']) },
      { id: 'application', label: t('views.0395'), control: 'multi', level: 'advanced', options: applicationOptions },
      { id: 'language', label: t('views.0396'), control: 'text', level: 'advanced' },
      { id: 'persian-evidence', label: t('views.0397'), control: 'select', level: 'advanced', options: options(['independently-evaluated', 'publisher-claimed', 'not-evaluated', 'unknown']) },
      { id: 'context-length', label: t('views.0351'), control: 'number-range', level: 'advanced', canonicalUnit: 'token' },
      { id: 'license', label: t('views.0398'), control: 'text', level: 'advanced' },
      { id: 'review-status', label: t('views.0399'), control: 'multi', level: 'advanced', options: options(['announced', 'available', 'deprecated', 'withdrawn', 'needs-review']) },
      { id: 'released-on', label: t('views.0346'), control: 'date-range', level: 'advanced' },
      { id: 'last-reviewed', label: t('views.0400'), control: 'date-range', level: 'advanced' }
    ],
    comparison: comparison(
      t('views.0401'),
      { model: t('views.0347'), 'model-kind': t('views.0382'), stage: t('views.0402'), metric: t('views.0403'), unit: t('views.0404') },
      [{ id: 'model-size', label: t('views.0405'), differenceDimensions: ['model'], sharedDimensions: ['model-kind', 'stage', 'metric', 'unit'] }],
      ['need', 'workload', 'quality-floor', 'latency-target'], ['metric', 'unit'],
      { allowed: t('views.0406'), invalidCalculation: t('views.0407'), needsMoreData: t('views.0408') }
    ),
    comparisonLimit: 4, noDataMessage: t('views.0409')
  },
  {
    id: 'model-suitability', sectionId: 'model-suitability', sectionNumber: 2,
    shortTitle: t('views.0410'), title: t('views.0411'),
    description: t('views.0412'),
    tableLabel: t('views.0413'),
    compact: true, hideEmptyColumns: true,
    optionalColumns: [],
    defaultColumns: [
      { key: 'model-artifact', label: t('views.0347'), sortable: true }
    ],
    matrixColumns: applications.map((item) => ({ id: item.id, label: item.label })),
    detailColumns: [
      { key: 'revision', label: t('views.0356') },
      { key: 'assessment-basis', label: t('views.0414') }, { key: 'subapplication', label: t('views.0415') },
      { key: 'language', label: t('views.0416') }, { key: 'quality-evaluation', label: t('views.0417') },
      { key: 'limitations', label: t('views.0418') }, { key: 'sources', label: t('views.0419') }
    ],
    filters: [
      { id: 'application', label: t('views.0395'), control: 'multi', level: 'main', options: applicationOptions },
      { id: 'assessment-basis', label: t('views.0420'), control: 'multi', level: 'main', options: [option('declared-capability', t('views.0421')), option('measured-success', t('views.0422')), option('editorial-recommendation', t('views.0423')), option('insufficient-evidence', t('views.0424'))] },
      { id: 'model-size', label: t('views.0384'), control: 'number-range', level: 'main', canonicalUnit: 'B', placeholder: t('views.0385') },
      { id: 'model-kind', label: t('views.0382'), control: 'multi', level: 'advanced', options: kindOptions },
      { id: 'subapplication', label: t('views.0415'), control: 'text', level: 'advanced' },
      { id: 'language', label: t('views.0425'), control: 'text', level: 'advanced' },
      { id: 'tested-version', label: t('views.0426'), control: 'text', level: 'advanced' },
      { id: 'evidence-kind', label: t('views.0427'), control: 'multi', level: 'advanced', options: evidenceOptions }
    ],
    presets: [{ id: 'task-first', label: t('views.0428'), selections: {} }],
    comparison: comparison(
      t('views.0429'),
      { model: t('views.0430'), application: t('views.0395'), language: t('views.0396'), dataset: t('views.0431'), 'test-version': t('views.0426'), metric: t('views.0432'), unit: t('views.0404') },
      [{ id: 'model', label: t('views.0430'), differenceDimensions: ['model'], sharedDimensions: ['application', 'language', 'dataset', 'test-version', 'metric', 'unit'] }],
      ['need', 'workload', 'quality-floor', 'latency-target'], ['application', 'metric', 'unit'],
      { allowed: t('views.0433'), invalidCalculation: t('views.0434'), needsMoreData: t('views.0435') }
    ),
    comparisonLimit: 4, noDataMessage: t('views.0436')
  },
  {
    id: 'hardware-feasibility', sectionId: 'hardware-feasibility', sectionNumber: 3,
    shortTitle: t('views.0437'), title: t('views.0438'),
    description: t('views.0439'),
    tableLabel: t('views.0440'),
    defaultColumns: [
      { key: 'artifact-execution', label: t('views.0441'), sortable: true },
      { key: 'workload', label: t('views.0442'), sortable: true }
    ],
    matrixColumns: hardwareTargets,
    detailColumns: [
      { key: 'gpu-memory', label: t('views.0443') }, { key: 'system-memory', label: t('views.0444') },
      { key: 'storage', label: t('views.0445') },
      { key: 'context-concurrency', label: t('views.0446') },
      { key: 'offload', label: t('views.0447') }, { key: 'limitations', label: t('views.0448') },
      { key: 'sources', label: t('views.0449') }
    ],
    filters: [
      { id: 'hardware', label: t('views.0450'), control: 'multi', level: 'main', options: hardwareTargets.map((item) => option(item.id, item.label, item.note)) },
      { id: 'gpu-count', label: t('views.0451'), control: 'number-range', level: 'main', canonicalUnit: 'card' },
      { id: 'feasibility', label: t('views.0452'), control: 'multi', level: 'main', options: options(['full-gpu', 'hybrid', 'layer-wise', 'insufficient-for-scenario', 'not-reviewed']) },
      { id: 'vram-per-gpu', label: t('views.0453'), control: 'number-range', level: 'advanced', canonicalUnit: 'GiB' },
      { id: 'ram', label: t('views.0444'), control: 'number-range', level: 'advanced', canonicalUnit: 'GiB' },
      { id: 'storage', label: t('views.0454'), control: 'number-range', level: 'advanced', canonicalUnit: 'GiB' },
      { id: 'execution-method', label: t('views.0455'), control: 'multi', level: 'advanced', options: methodOptions },
      { id: 'engine', label: t('views.0456'), control: 'multi', level: 'advanced', options: options(engineCandidates) },
      { id: 'quantization', label: t('views.0457'), control: 'text', level: 'advanced' },
      { id: 'context-length', label: t('views.0458'), control: 'number-range', level: 'advanced', canonicalUnit: 'token' },
      { id: 'concurrency', label: t('views.0459'), control: 'number-range', level: 'advanced' },
      { id: 'offload-allowed', label: t('views.0460'), control: 'boolean', level: 'advanced' },
      { id: 'evidence-kind', label: t('views.0461'), control: 'multi', level: 'advanced', options: evidenceOptions }
    ],
    presets: [{ id: 'existing-hardware', label: t('views.0462'), selections: {} }],
    comparison: comparison(
      t('views.0463'),
      { hardware: t('views.0464'), artifact: 'artifact', stack: 'ServingStack', backend: 'backend', method: t('views.0455'), quantization: t('views.0465'), 'kv-cache': 'KV cache', parallelism: t('views.0466'), settings: t('views.0467'), workload: t('views.0468'), context: t('views.0469'), batch: 'batch', concurrency: t('views.0321'), unit: t('views.0404') },
      [{ id: 'hardware', label: t('views.0450'), differenceDimensions: ['hardware'], sharedDimensions: ['artifact', 'stack', 'backend', 'method', 'quantization', 'kv-cache', 'parallelism', 'settings', 'workload', 'context', 'batch', 'concurrency', 'unit'] }],
      ['need', 'workload', 'quality-floor', 'latency-target'], ['artifact', 'workload', 'unit'],
      { allowed: t('views.0470'), invalidCalculation: t('views.0471'), needsMoreData: t('views.0472') }
    ),
    comparisonLimit: 4, noDataMessage: t('views.0473')
  },
  {
    id: 'software-products', sectionId: 'serving-software', sectionNumber: 4, subviewNumber: 1,
    shortTitle: t('views.0474'), title: t('views.0474'),
    description: t('views.0475'),
    tableLabel: t('views.0476'),
    compact: true, hideEmptyColumns: true,
    optionalColumns: [{ key: 'released-on', label: t('views.0346'), sortable: true }],
    defaultColumns: [
      { key: 'software-version', label: t('views.0477'), sortable: true },
      { key: 'roles', label: t('views.0478'), sortable: true },
      { key: 'scenario', label: t('views.0479') },
      { key: 'service-features', label: t('views.0480') },
      { key: 'platform', label: t('views.0481') },
      { key: 'backend-summary', label: t('views.0482') },
      { key: 'start-docs', label: t('views.0483') }
    ],
    detailColumns: [
      { key: 'released-on', label: t('views.0484'), sortable: true }, { key: 'last-reviewed', label: t('views.0372') },
      { key: 'backends', label: t('views.0485') },
      { key: 'os-hardware', label: t('views.0486') }, { key: 'local-cloud-offline', label: t('views.0487') },
      { key: 'all-capabilities', label: t('views.0488') },
      { key: 'tasks', label: t('views.0489') }, { key: 'request-control', label: t('views.0490') },
      { key: 'model-lifecycle', label: t('views.0491') }, { key: 'inference-optimizations', label: t('views.0492') },
      { key: 'multi-gpu', label: t('views.0493') }, { key: 'output-tools', label: t('views.0494') },
      { key: 'model-scopes', label: t('views.0495') },
      { key: 'operations-security', label: t('views.0496') }, { key: 'api-compatibility', label: t('views.0497') },
      { key: 'license', label: t('views.0353') }, { key: 'license-url', label: t('views.0368') }, { key: 'commercial-use', label: t('views.0369') },
      { key: 'license-restrictions', label: t('views.0370') }, { key: 'sources', label: t('views.0419') }
    ],
    filters: [
      { id: 'need-type', label: t('views.0498'), control: 'multi', level: 'main', options: [option('local-interactive', t('views.0499')), option('team-api', t('views.0500')), option('high-throughput', t('views.0501')), option('specialized-task', t('views.0502')), option('composite-service', t('views.0503'))] },
      { id: 'environment', label: t('views.0504'), control: 'multi', level: 'main', options: options(['desktop', 'workstation', 'server', 'container', 'kubernetes', 'cloud-service', 'offline-air-gapped', 'other']) },
      { id: 'software-role', label: t('views.0505'), control: 'multi', level: 'main', options: softwareRoleOptions },
      { id: 'software-product', label: t('views.0506'), control: 'multi', level: 'advanced', options: softwareProductCandidates.map((item) => option(item.id, item.name, t('views.0507'))) },
      { id: 'software-version', label: t('views.0508'), control: 'text', level: 'advanced' },
      { id: 'backend', label: t('views.0509'), control: 'text', level: 'advanced' },
      { id: 'operating-system', label: t('views.0510'), control: 'text', level: 'advanced' },
      { id: 'hardware-family', label: t('views.0511'), control: 'text', level: 'advanced' },
      { id: 'local-cloud', label: t('views.0512'), control: 'multi', level: 'advanced', options: options(['local', 'cloud', 'hybrid']) },
      { id: 'offline', label: t('views.0513'), control: 'select', level: 'advanced', options: [option('true', t('views.0514')), option('false', t('views.0515')), option('missing', t('views.0516'))] },
      ...capabilityFilters.map(([id, label]) => ({ id, label, control: 'multi' as const, level: 'advanced' as const, options: supportOptions })),
      { id: 'provision', label: t('views.0517'), control: 'multi', level: 'advanced', options: provisionOptions },
      { id: 'software-license', label: t('views.0518'), control: 'text', level: 'advanced' },
      { id: 'maintenance', label: t('views.0519'), control: 'multi', level: 'advanced', options: options(['active', 'maintenance', 'archived', 'deprecated', 'unknown']) },
      { id: 'released-on', label: t('views.0346'), control: 'date-range', level: 'advanced' },
      { id: 'last-reviewed', label: t('views.0400'), control: 'date-range', level: 'advanced' }
    ],
    presets: [{ id: 'software-choice', label: t('views.0520'), selections: {} }],
    comparison: comparison(
      t('views.0521'),
      { software: t('views.0522'), need: t('views.0523'), environment: t('views.0524'), role: t('views.0478'), backend: 'backend', workload: t('views.0468'), model: t('views.0430'), metric: t('views.0432'), unit: t('views.0404') },
      [
        { id: 'service-layer', label: t('views.0525'), differenceDimensions: ['software'], sharedDimensions: ['need', 'environment', 'role', 'backend', 'workload', 'model', 'metric', 'unit'] },
        { id: 'software-stack', label: t('views.0526'), differenceDimensions: ['software', 'backend'], sharedDimensions: ['need', 'environment', 'role', 'workload', 'model', 'metric', 'unit'] }
      ],
      ['need', 'workload', 'quality-floor', 'latency-target'], ['metric', 'unit'],
      { allowed: t('views.0527'), invalidCalculation: t('views.0528'), needsMoreData: t('views.0529') }
    ),
    comparisonLimit: 4, noDataMessage: t('views.0530')
  },
  {
    id: 'deployment-compatibility', sectionId: 'serving-software', sectionNumber: 4, subviewNumber: 2,
    shortTitle: t('views.0531'), title: t('views.0532'),
    description: t('views.0533'),
    tableLabel: t('views.0534'),
    referenceLinks: [{ label: t('views.0535'), href: 'https://github.com/lyogavin/airllm' }],
    defaultColumns: [
      { key: 'model-revision', label: t('views.0536'), sortable: true },
      { key: 'artifact', label: 'Artifact', sortable: true },
      { key: 'serving-stack', label: t('views.0537'), sortable: true },
      { key: 'hardware-workload', label: t('views.0538'), sortable: true },
      { key: 'execution-method', label: t('views.0539'), sortable: true },
      { key: 'compatibility', label: t('views.0540'), sortable: true }
    ],
    detailColumns: [
      { key: 'backend-settings', label: t('views.0541') }, { key: 'kv-cache', label: t('views.0542') },
      { key: 'memory', label: t('views.0543') }, { key: 'storage', label: t('views.0544') },
      { key: 'airllm-scope', label: t('views.0545') },
      { key: 'preparation', label: t('views.0546') }, { key: 'latency-throughput', label: t('views.0547') },
      { key: 'workload-settings', label: t('views.0548') },
      { key: 'limitations', label: t('views.0549') }, { key: 'sources', label: t('views.0550') }
    ],
    filters: [
      { id: 'model', label: t('views.0430'), control: 'text', level: 'main' },
      { id: 'software-product', label: t('views.0551'), control: 'multi', level: 'main', options: softwareProductCandidates.map((item) => option(item.id, item.name)) },
      { id: 'compatibility', label: t('views.0540'), control: 'multi', level: 'main', options: supportOptions },
      { id: 'hardware', label: t('views.0450'), control: 'multi', level: 'advanced', options: hardwareTargets.map((item) => option(item.id, item.label)) },
      { id: 'workload', label: t('views.0468'), control: 'text', level: 'advanced' },
      { id: 'backend', label: t('views.0552'), control: 'text', level: 'advanced' },
      { id: 'execution-method', label: t('views.0455'), control: 'multi', level: 'advanced', options: methodOptions },
      { id: 'quantization', label: t('views.0457'), control: 'text', level: 'advanced' },
      { id: 'kv-cache', label: t('views.0542'), control: 'text', level: 'advanced' },
      { id: 'parallelism', label: t('views.0466'), control: 'multi', level: 'advanced', options: parallelOptions },
      { id: 'context-length', label: t('views.0458'), control: 'number-range', level: 'advanced', canonicalUnit: 'token' },
      { id: 'concurrency', label: t('views.0321'), control: 'number-range', level: 'advanced' },
      { id: 'peak-vram', label: t('views.0553'), control: 'number-range', level: 'advanced', canonicalUnit: 'GiB' },
      { id: 'peak-ram', label: t('views.0554'), control: 'number-range', level: 'advanced', canonicalUnit: 'GiB' },
      { id: 'peak-storage', label: t('views.0555'), control: 'number-range', level: 'advanced', canonicalUnit: 'GiB' },
      { id: 'provision', label: t('views.0556'), control: 'multi', level: 'advanced', options: provisionOptions },
      { id: 'evidence-kind', label: t('views.0427'), control: 'multi', level: 'advanced', options: evidenceOptions }
    ],
    presets: [{ id: 'memory-constrained', label: t('views.0557'), selections: {} }],
    comparison: comparison(
      t('views.0558'),
      { model: t('views.0536'), artifact: 'artifact', stack: 'ServingStack', backend: 'backend', hardware: t('views.0450'), workload: t('views.0468'), method: t('views.0559'), quantization: t('views.0465'), 'kv-cache': 'KV cache', parallelism: t('views.0466'), context: t('views.0469'), batch: 'batch', concurrency: t('views.0321'), settings: t('views.0467'), unit: t('views.0404') },
      [
        { id: 'service-layer', label: t('views.0560'), differenceDimensions: ['stack'], sharedDimensions: ['backend', 'model', 'artifact', 'hardware', 'workload', 'method', 'quantization', 'kv-cache', 'parallelism', 'context', 'batch', 'concurrency', 'settings', 'unit'] },
        { id: 'software-stack', label: t('views.0561'), differenceDimensions: ['stack', 'backend'], sharedDimensions: ['model', 'artifact', 'hardware', 'workload', 'method', 'quantization', 'kv-cache', 'parallelism', 'context', 'batch', 'concurrency', 'settings', 'unit'] },
        { id: 'hardware', label: t('views.0450'), differenceDimensions: ['hardware'], sharedDimensions: ['model', 'artifact', 'stack', 'backend', 'workload', 'method', 'quantization', 'kv-cache', 'parallelism', 'context', 'batch', 'concurrency', 'settings', 'unit'] }
      ],
      ['need', 'workload', 'quality-floor', 'latency-target'], ['model', 'artifact', 'workload', 'unit'],
      { allowed: t('views.0562'), invalidCalculation: t('views.0563'), needsMoreData: t('views.0564') }
    ),
    comparisonLimit: 4, noDataMessage: t('views.0565')
  },
  {
    id: 'benchmarks', sectionId: 'benchmarks', sectionNumber: 5,
    shortTitle: t('views.0566'), title: t('views.0566'),
    description: t('views.0567'),
    tableLabel: t('views.0568'),
    defaultColumns: [
      { key: 'run-model', label: t('views.0569'), sortable: true },
      { key: 'stack-hardware', label: t('views.0570'), sortable: true },
      { key: 'workload', label: t('views.0571'), sortable: true },
      { key: 'ttft', label: 'TTFT', sortable: true, numeric: true },
      { key: 'tpot', label: 'TPOT / ITL', sortable: true, numeric: true },
      { key: 'throughput', label: t('views.0572'), sortable: true, numeric: true },
      { key: 'goodput', label: 'Goodput / SLO', sortable: true, numeric: true }
    ],
    detailColumns: [
      { key: 'revisions', label: t('views.0573') }, { key: 'hardware', label: t('views.0574') },
      { key: 'length-distributions', label: t('views.0575') }, { key: 'load', label: t('views.0576') },
      { key: 'reasoning', label: t('views.0577') }, { key: 'optimizations', label: t('views.0578') },
      { key: 'statistics', label: t('views.0579') }, { key: 'outcomes', label: t('views.0580') },
      { key: 'resources', label: t('views.0581') }, { key: 'run-state', label: t('views.0582') },
      { key: 'quality', label: t('views.0583') }, { key: 'provenance', label: t('views.0584') }
    ],
    filters: [
      { id: 'model', label: t('views.0430'), control: 'text', level: 'main' },
      { id: 'hardware', label: t('views.0450'), control: 'multi', level: 'main', options: hardwareTargets.map((item) => option(item.id, item.label)) },
      { id: 'workload', label: t('views.0468'), control: 'text', level: 'main' },
      { id: 'software-product', label: t('views.0585'), control: 'multi', level: 'advanced', options: softwareProductCandidates.map((item) => option(item.id, item.name)) },
      { id: 'backend', label: t('views.0586'), control: 'text', level: 'advanced' },
      { id: 'quantization', label: t('views.0465'), control: 'text', level: 'advanced' },
      { id: 'language', label: t('views.0396'), control: 'text', level: 'advanced' },
      { id: 'context-length', label: t('views.0458'), control: 'number-range', level: 'advanced', canonicalUnit: 'token' },
      { id: 'batch-size', label: 'Batch', control: 'number-range', level: 'advanced' },
      { id: 'concurrency', label: t('views.0459'), control: 'number-range', level: 'advanced' },
      { id: 'arrival-rate', label: t('views.0587'), control: 'number-range', level: 'advanced', canonicalUnit: 'request/s' },
      { id: 'reasoning-mode', label: t('views.0588'), control: 'select', level: 'advanced', options: options(['off', 'on', 'adaptive']) },
      { id: 'prefix-caching', label: 'Prefix caching', control: 'boolean', level: 'advanced' },
      { id: 'speculative-decoding', label: 'Speculative decoding', control: 'boolean', level: 'advanced' },
      { id: 'statistic', label: t('views.0589'), control: 'multi', level: 'advanced', options: options(['single', 'mean', 'median', 'p50', 'p90', 'p95', 'p99']) },
      { id: 'tested-on', label: t('views.0590'), control: 'date-range', level: 'advanced' },
      { id: 'evidence-kind', label: t('views.0427'), control: 'multi', level: 'advanced', options: evidenceOptions }
    ],
    comparison: comparison(
      t('views.0591'),
      { model: t('views.0430'), stack: 'ServingStack', backend: 'backend', hardware: t('views.0450'), workload: t('views.0468'), method: t('views.0559'), quantization: t('views.0465'), 'kv-cache': 'KV cache', context: t('views.0469'), batch: 'batch', concurrency: t('views.0321'), 'arrival-rate': t('views.0587'), 'reasoning-mode': t('views.0588'), 'reasoning-budget': t('views.0592'), 'prefix-caching': 'Prefix caching', 'speculative-decoding': 'Speculative decoding', settings: t('views.0467'), metric: t('views.0432'), statistic: t('views.0593'), unit: t('views.0404') },
      [
        { id: 'service-layer', label: t('views.0560'), differenceDimensions: ['stack'], sharedDimensions: ['backend', 'model', 'hardware', 'workload', 'method', 'quantization', 'kv-cache', 'context', 'batch', 'concurrency', 'arrival-rate', 'reasoning-mode', 'reasoning-budget', 'prefix-caching', 'speculative-decoding', 'settings', 'metric', 'statistic', 'unit'] },
        { id: 'software', label: t('views.0594'), differenceDimensions: ['stack', 'backend'], sharedDimensions: ['model', 'hardware', 'workload', 'method', 'quantization', 'kv-cache', 'context', 'batch', 'concurrency', 'arrival-rate', 'reasoning-mode', 'reasoning-budget', 'prefix-caching', 'speculative-decoding', 'settings', 'metric', 'statistic', 'unit'] },
        { id: 'hardware', label: t('views.0450'), differenceDimensions: ['hardware'], sharedDimensions: ['model', 'stack', 'backend', 'workload', 'method', 'quantization', 'kv-cache', 'context', 'batch', 'concurrency', 'arrival-rate', 'reasoning-mode', 'reasoning-budget', 'prefix-caching', 'speculative-decoding', 'settings', 'metric', 'statistic', 'unit'] },
        { id: 'model', label: t('views.0347'), differenceDimensions: ['model'], sharedDimensions: ['stack', 'backend', 'hardware', 'workload', 'method', 'quantization', 'kv-cache', 'context', 'batch', 'concurrency', 'arrival-rate', 'reasoning-mode', 'reasoning-budget', 'prefix-caching', 'speculative-decoding', 'settings', 'metric', 'statistic', 'unit'] }
      ],
      ['need', 'workload', 'quality-floor', 'latency-target'], ['workload', 'metric', 'statistic', 'unit'],
      { allowed: t('views.0595'), invalidCalculation: t('views.0596'), needsMoreData: t('views.0597') }
    ),
    comparisonLimit: 4, noDataMessage: t('views.0598')
  },
  {
    id: 'specialized-models', sectionId: 'specialized-models', sectionNumber: 6,
    shortTitle: t('views.0599'), title: t('views.0600'),
    description: t('views.0601'),
    tableLabel: t('views.0602'),
    compact: true, hideEmptyColumns: true,
    optionalColumns: [{ key: 'released-on', label: t('views.0346'), sortable: true }, { key: 'work-rate', label: t('views.0603'), sortable: true, numeric: true }],
    defaultColumns: [
      { key: 'model-kind', label: t('views.0347'), sortable: true },
      { key: 'task', label: t('views.0604') },
      { key: 'parameters', label: t('views.0605'), sortable: true },
      { key: 'input-limit', label: t('views.0606'), sortable: true },
      { key: 'output', label: t('views.0607') },
      { key: 'features', label: t('views.0608') },
      { key: 'downloads', label: t('views.0609') }
    ],
    detailColumns: [
      { key: 'pooling', label: t('views.0610') }, { key: 'dimensions', label: t('views.0611') },
      { key: 'adjustable-dimensions', label: t('views.0612') },
      { key: 'languages', label: t('views.0613') }, { key: 'parameter-scope', label: t('views.0614') },
      { key: 'artifact-execution', label: t('views.0615') }, { key: 'released-on', label: t('views.0371'), sortable: true },
      { key: 'language-dataset', label: t('views.0616') }, { key: 'workload', label: t('views.0617') },
      { key: 'generative-alternative', label: t('views.0618') }, { key: 'limitations', label: t('views.0418') }, { key: 'sources', label: t('views.0419') }
    ],
    filters: [
      { id: 'kind', label: t('views.0382'), control: 'multi', level: 'main', options: [option('embedding', t('views.0292')), option('reranker', t('views.0293')), option('encoder-classifier', t('views.0294')), option('other', t('views.0290'))] },
      { id: 'application', label: t('views.0395'), control: 'multi', level: 'main', options: applicationOptions },
      { id: 'model-size', label: t('views.0384'), control: 'number-range', level: 'main', canonicalUnit: 'B', placeholder: t('views.0385') },
      { id: 'size-band', label: t('views.0387'), control: 'select', level: 'advanced', options: sizeBandOptions },
      { id: 'subapplication', label: t('views.0502'), control: 'text', level: 'advanced' },
      { id: 'metric', label: t('views.0619'), control: 'text', level: 'advanced' },
      { id: 'metric-unit', label: t('views.0620'), control: 'text', level: 'advanced', placeholder: t('views.0621') },
      { id: 'language', label: t('views.0396'), control: 'text', level: 'advanced' },
      { id: 'evidence-kind', label: t('views.0427'), control: 'multi', level: 'advanced', options: evidenceOptions }
    ],
    comparison: comparison(
      t('views.0622'),
      { model: t('views.0430'), task: t('views.0623'), dataset: t('views.0431'), language: t('views.0396'), metric: t('views.0432'), unit: t('views.0404'), workload: t('views.0468') },
      [{ id: 'model', label: t('views.0624'), differenceDimensions: ['model'], sharedDimensions: ['task', 'dataset', 'language', 'metric', 'unit', 'workload'] }],
      ['need', 'workload', 'quality-floor', 'latency-target'], ['task', 'metric', 'unit'],
      { allowed: t('views.0625'), invalidCalculation: t('views.0626'), needsMoreData: t('views.0627') }
    ),
    comparisonLimit: 4, noDataMessage: t('views.0628')
  }
];
const llmGuideSections = Array.from(
  new Map(llmViewConfigs.map((view) => [view.sectionId, {
    id: view.sectionId,
    number: view.sectionNumber,
    title: view.sectionNumber === 4 ? t('views.0629') : view.title,
    views: llmViewConfigs.filter((candidate) => candidate.sectionId === view.sectionId)
  }])).values()
);
function defaultLlmColumns(config: LlmViewConfig, rows: LlmViewRow[]) {
  return config.hideEmptyColumns && rows.length
    ? config.defaultColumns.filter(column => rows.some(row => row.cells[column.key]?.state === 'known'))
    : config.defaultColumns;
}
function modelUseViewConfig(matrix = false): LlmViewConfig {
  const base = llmViewConfigs.find(view => view.id === 'model-suitability')!;
  return { ...base, presentation: matrix ? 'matrix' : 'guidance',
    tableLabel: matrix ? t('views.0630') : t('views.0631'),
    defaultColumns: matrix ? base.defaultColumns : [
      { key: 'model', label: t('views.0347'), sortable: true },
      { key: 'role', label: t('views.0632') },
      { key: 'primary-use', label: t('views.0633') },
      { key: 'introduction', label: t('views.0634') },
      { key: 'use-condition', label: t('views.0635') },
      { key: 'use-basis', label: t('views.0636') },
      { key: 'downloads', label: t('views.0483') }
    ],
    matrixColumns: matrix ? base.matrixColumns : undefined,
    filters: base.filters.filter(filter => !['assessment-basis', 'tested-version', 'evidence-kind', 'subapplication'].includes(filter.id)).concat([
      { id: 'use-basis', label: t('views.0636'), control: 'multi', level: 'main', options: [option('publisher-summary', t('views.0421')), option('editorial-analysis', t('views.0637'))] },
      { id: 'use-role', label: t('views.0632'), control: 'multi', level: 'main', options: [
        option('retrieval', t('views.0638')), option('reranking', t('views.0639')), option('grounded-generation', t('views.0640')),
        option('text-generation', t('views.0641')), option('code-completion', t('views.0642')), option('coding', t('views.0643')), option('tool-use', t('views.0644')), option('vision', t('views.0645')), option('reasoning', t('views.0646'))
      ] }
    ])
  };
}
return { hardwareTargets, llmViewConfigs, llmGuideSections, defaultLlmColumns, modelUseViewConfig };
}
