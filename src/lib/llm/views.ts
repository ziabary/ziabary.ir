import { gpuRecords } from '$lib/gpu-data';
import { llmLabel } from './presentation';
import {
  applications,
  engineCandidates,
  executionMethodCandidates,
  guideParameterBands,
  modelFamilyCandidates,
  parallelismCandidates,
  softwareProductCandidates
} from './guide';
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

const option = (value: string, label = llmLabel(value), note?: string): FilterOption => ({ value, label, ...(note ? { note } : {}) });
const options = (values: readonly string[]) => values.map((value) => option(value));
const applicationOptions = applications.map((item) => option(item.id, item.label));
const stageOptions = [
  option('base', 'پایه'), option('instruct', 'دستورپذیر'), option('reasoning', 'استدلالی'),
  option('distilled', 'تقطیرشده'), option('other', 'سایر')
];
const kindOptions = [
  option('generative', 'مولد'), option('embedding', 'بردارساز'), option('reranker', 'بازرتبه‌بند'),
  option('encoder-classifier', 'رمزگذار / دسته‌بند'), option('vision-language', 'چندوجهی'), option('other', 'سایر')
];
const evidenceOptions = [
  option('direct-measurement', 'اندازه‌گیری مستقیم'),
  option('publisher-report', 'گزارش سازنده یا منتشرکننده'),
  option('calculated-from-specifications', 'محاسبه از مشخصات'),
  option('editorial-analysis', 'قضاوت تحلیلی'),
  option('unknown-needs-review', 'نامعلوم یا نیازمند بررسی'),
  option('missing', 'بدون شاهد ثبت‌شده')
];
const methodOptions = executionMethodCandidates.map((item) => option(item.id, item.label));
const parallelOptions = parallelismCandidates.map((item) => option(item.id, item.label));
const sizeBandOptions = guideParameterBands.map((item) => option(item.id, item.label, 'رده‌بندی همین راهنما'));
const supportOptions = [
  option('supported', 'پشتیبانی‌شده'), option('conditional', 'مشروط'),
  option('not-supported', 'پشتیبانی‌نشده'), option('not-reviewed', 'بررسی‌نشده'),
  option('not-applicable', 'نامرتبط')
];
const provisionOptions = [
  option('native', 'داخلی'), option('plugin', 'افزونه'),
  option('external-component', 'جزء بیرونی'), option('not-applicable', 'نامرتبط')
];
const softwareRoleOptions = [
  option('inference-engine-library', 'موتور / کتابخانهٔ استنتاج'), option('api-server', 'سرور API'),
  option('model-manager', 'مدیریت مدل'), option('gateway', 'درگاه مدل‌ها'),
  option('user-interface', 'رابط کاربری'), option('deployment-manager', 'مدیریت استقرار')
];
const capabilityFilters: Array<[string, string]> = [
  ['tasks', 'وظیفه‌ها و چندوجهی'], ['queueing', 'صف درخواست'], ['concurrency', 'هم‌زمانی'],
  ['batching', 'Batching'], ['admission-control', 'پذیرش بار'], ['model-load-unload', 'بارگذاری / خروج مدل'],
  ['multi-model', 'چندمدلی'], ['cold-start', 'Cold start'], ['prefix-caching', 'Prefix caching'],
  ['speculative-decoding', 'Speculative decoding'], ['offload', 'CPU/GPU و KV offload'],
  ['multi-gpu-sharding', 'تقسیم مدل روی چند GPU'], ['independent-replicas', 'نسخه‌های مستقل'],
  ['streaming', 'Streaming'], ['structured-output', 'خروجی ساختاریافته'], ['tool-use', 'Tool calling'],
  ['reasoning-control', 'کنترل reasoning'], ['model-template', 'قالب پیام / مدل'], ['parser', 'Parser'],
  ['monitoring', 'پایش'], ['metrics', 'Metrics'], ['health-check', 'Health check'],
  ['authentication', 'احراز هویت'], ['rate-limiting', 'محدودیت نرخ']
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

/** Labels and base specifications reuse gpu-data.ts; there is no parallel GPU catalog. */
export const hardwareTargets: MatrixColumn[] = [
  { id: 'cpu-ram', label: 'CPU و RAM', note: 'پیکربندی دقیق در رکورد سخت‌افزار ثبت می‌شود.' },
  { id: 'low-memory-gpu', label: 'GPU کم‌حافظه / اقتصادی', note: 'ردهٔ توسعه‌پذیر؛ بدون نتیجهٔ ازپیش‌تعیین‌شده.' },
  ...selectedGpus.map((gpu) => ({
    id: gpu.id,
    label: `${gpu.model} · ${new Intl.NumberFormat('fa-IR').format(gpu.memoryGB)} GB`,
    note: `${gpu.formFactor}؛ مشخصات پایه از جدول GPU`
  })),
  {
    id: 'nvidia-rtx4090-modified-48gb', label: 'RTX 4090 اصلاح‌شدهٔ ۴۸GB',
    note: 'غیراستاندارد؛ کارت، firmware و اصلاح دقیق باید در شاهد مشخص باشد.'
  },
  { id: 'multi-gpu', label: 'چند GPU', note: 'تعداد، توپولوژی و شاردینگ یا replica باید صریح باشد.' }
];

const comparison = (
  summary: string,
  dimensionLabels: Record<string, string>,
  controlledAxes: ControlledComparisonAxis[],
  solutionSharedDimensions: string[],
  calculationRequiredDimensions: string[],
  examples: ComparisonPolicy['examples']
): ComparisonPolicy => ({ summary, dimensionLabels, controlledAxes, solutionSharedDimensions, calculationRequiredDimensions, examples });

export const llmViewConfigs: LlmViewConfig[] = [
  {
    id: 'model-catalog', sectionId: 'model-catalog', sectionNumber: 1,
    shortTitle: 'شناسنامهٔ مدل‌ها', title: 'شناسنامهٔ مدل‌ها',
    description: 'اندازه، معماری، طول متن و مجوز مدل‌ها را مقایسه کنید.',
    tableLabel: 'جدول شناسنامهٔ مدل‌های زبانی',
    compact: true, hideEmptyColumns: true,
    optionalColumns: [{ key: 'released-on', label: 'تاریخ انتشار', sortable: true }],
    defaultColumns: [
      { key: 'model', label: 'مدل', sortable: true },
      { key: 'family-publisher', label: 'خانواده / ناشر', sortable: true },
      { key: 'size-architecture', label: 'اندازه و معماری', sortable: true },
      { key: 'modalities', label: 'ورودی ← خروجی' },
      { key: 'context', label: 'حداکثر طول متن', sortable: true, numeric: true },
      { key: 'applications', label: 'کاربردهای شاخص' },
      { key: 'downloads', label: 'دریافت و اجرای مدل' }
    ],
    detailColumns: [
      { key: 'model-id', label: 'شناسهٔ داخلی' }, { key: 'revision', label: 'revision مدل در شناسنامه' },
      { key: 'kind-stage', label: 'نوع و مرحله' }, { key: 'lineage', label: 'مدل پایه / تقطیر از' },
      { key: 'total-parameters', label: 'شمار کل پارامترها' }, { key: 'active-parameters', label: 'پارامترهای فعال' },
      { key: 'parameter-scope', label: 'دامنهٔ شمارش پارامتر' },
      { key: 'declared-context', label: 'حداکثر طول متن (اعلام ناشر)' }, { key: 'context-extension', label: 'افزایش ظرفیت متن و تنظیم لازم' },
      { key: 'evaluated-context', label: 'طول متن در آزمون' },
      { key: 'languages', label: 'زبان و نوع شاهد' },
      { key: 'weight-files', label: 'حجم فایل وزن روی دیسک' }, { key: 'weight-caveat', label: 'حافظهٔ اجرای مدل' },
      { key: 'license-url', label: 'متن مجوز' }, { key: 'commercial-use', label: 'استفادهٔ تجاری' }, { key: 'license-restrictions', label: 'شروط مجوز' },
      { key: 'released-on', label: 'تاریخ انتشار مدل', sortable: true }, { key: 'last-reviewed', label: 'تاریخ بازبینی رکورد' },
      { key: 'sources', label: 'منابع و محل شاهد' }
    ],
    filters: [
      { id: 'download-format', label: 'نسخهٔ قابل دریافت', control: 'multi', level: 'main', options: options(['gguf', 'safetensors', 'pytorch', 'onnx', 'ollama']) },
      { id: 'run-engine', label: 'مسیر راه‌اندازی مستند', control: 'multi', level: 'main', options: options(['Ollama', 'llama.cpp', 'vLLM', 'SGLang', 'Transformers', 'Sentence Transformers', 'FlagEmbedding']) },
      { id: 'download-authority', label: 'ناشر فایل', control: 'multi', level: 'advanced', options: [option('official', 'سازندهٔ مدل'), option('third-party', 'شخص ثالث')] },
      { id: 'family', label: 'خانواده', control: 'multi', level: 'main', options: options(modelFamilyCandidates) },
      { id: 'publisher', label: 'ناشر', control: 'text', level: 'main' },
      { id: 'model-version', label: 'مدل و نسخهٔ دقیق', control: 'select', level: 'advanced', options: [] },
      { id: 'model-kind', label: 'نوع مدل', control: 'multi', level: 'main', options: kindOptions },
      { id: 'model-stage', label: 'مرحلهٔ مدل', control: 'multi', level: 'main', options: stageOptions },
      { id: 'model-size', label: 'اندازهٔ اعلامی مدل', control: 'number-range', level: 'main', canonicalUnit: 'B', placeholder: 'شمار کل، یا اندازهٔ اسمی با دامنهٔ مشخص در جزئیات' },
      { id: 'active-parameters', label: 'پارامتر فعال', control: 'number-range', level: 'advanced', canonicalUnit: 'B' },
      { id: 'size-band', label: 'رده‌بندی اندازهٔ این راهنما', control: 'select', level: 'advanced', options: sizeBandOptions },
      { id: 'architecture', label: 'معماری', control: 'multi', level: 'advanced', options: options(['dense', 'moe', 'hybrid', 'other']) },
      { id: 'input-modality', label: 'ورودی', control: 'multi', level: 'advanced', options: options(['text', 'image', 'audio', 'video', 'structured-data']) },
      { id: 'output-modality', label: 'خروجی', control: 'multi', level: 'advanced', options: options(['text', 'embedding', 'structured-data']) },
      { id: 'application', label: 'کاربرد', control: 'multi', level: 'advanced', options: applicationOptions },
      { id: 'language', label: 'زبان', control: 'text', level: 'advanced' },
      { id: 'persian-evidence', label: 'وضعیت شاهد فارسی', control: 'select', level: 'advanced', options: options(['independently-evaluated', 'publisher-claimed', 'not-evaluated', 'unknown']) },
      { id: 'context-length', label: 'حداکثر طول متن', control: 'number-range', level: 'advanced', canonicalUnit: 'token' },
      { id: 'license', label: 'مجوز (اختیاری)', control: 'text', level: 'advanced' },
      { id: 'review-status', label: 'وضعیت انتشار', control: 'multi', level: 'advanced', options: options(['announced', 'available', 'deprecated', 'withdrawn', 'needs-review']) },
      { id: 'released-on', label: 'تاریخ انتشار', control: 'date-range', level: 'advanced' },
      { id: 'last-reviewed', label: 'تاریخ بازبینی', control: 'date-range', level: 'advanced' }
    ],
    comparison: comparison(
      'مشاهدهٔ کنارهم همیشه مجاز است؛ محاسبه فقط برای فیلدهای هم‌واحد و انتساب نسخه‌مند معتبر است.',
      { model: 'مدل', 'model-kind': 'نوع مدل', stage: 'مرحله', metric: 'فیلد عددی', unit: 'واحد' },
      [{ id: 'model-size', label: 'اندازهٔ مدل', differenceDimensions: ['model'], sharedDimensions: ['model-kind', 'stage', 'metric', 'unit'] }],
      ['need', 'workload', 'quality-floor', 'latency-target'], ['metric', 'unit'],
      { allowed: 'مدل‌های کوچک و بزرگ کنار هم.', invalidCalculation: 'نسبت‌دادن کیفیت یک artifact به artifact دیگر.', needsMoreData: 'پارامتر یا واحد یکی از ردیف‌ها نامعلوم است.' }
    ),
    comparisonLimit: 4, noDataMessage: 'هنوز شناسنامهٔ تأییدشده‌ای وارد نشده است.'
  },
  {
    id: 'model-suitability', sectionId: 'model-suitability', sectionNumber: 2,
    shortTitle: 'راهنمای کاربرد', title: 'تناسب مدل با کاربرد',
    description: 'مدل مناسب برای گفت‌وگو، برنامه‌نویسی، جست‌وجو و کار با اسناد.',
    tableLabel: 'ماتریس تناسب مدل با کاربرد',
    compact: true, hideEmptyColumns: true,
    optionalColumns: [],
    defaultColumns: [
      { key: 'model-artifact', label: 'مدل', sortable: true }
    ],
    matrixColumns: applications.map((item) => ({ id: item.id, label: item.label })),
    detailColumns: [
      { key: 'revision', label: 'revision مدل در شناسنامه' },
      { key: 'assessment-basis', label: 'نوع شاهد کاربرد' }, { key: 'subapplication', label: 'زیرکاربرد' },
      { key: 'language', label: 'زبان آزمون' }, { key: 'quality-evaluation', label: 'ارزیابی دقیق مرتبط' },
      { key: 'limitations', label: 'محدودیت نتیجه' }, { key: 'sources', label: 'منابع' }
    ],
    filters: [
      { id: 'application', label: 'کاربرد', control: 'multi', level: 'main', options: applicationOptions },
      { id: 'assessment-basis', label: 'نوع ارزیابی', control: 'multi', level: 'main', options: [option('declared-capability', 'معرفی سازنده'), option('measured-success', 'موفقیت اندازه‌گیری‌شده'), option('editorial-recommendation', 'پیشنهاد تحلیلی نویسنده'), option('insufficient-evidence', 'فاقد شواهد کافی')] },
      { id: 'model-size', label: 'اندازهٔ اعلامی مدل', control: 'number-range', level: 'main', canonicalUnit: 'B', placeholder: 'شمار کل، یا اندازهٔ اسمی با دامنهٔ مشخص در جزئیات' },
      { id: 'model-kind', label: 'نوع مدل', control: 'multi', level: 'advanced', options: kindOptions },
      { id: 'subapplication', label: 'زیرکاربرد', control: 'text', level: 'advanced' },
      { id: 'language', label: 'زبان ارزیابی', control: 'text', level: 'advanced' },
      { id: 'tested-version', label: 'نسخهٔ آزمون', control: 'text', level: 'advanced' },
      { id: 'evidence-kind', label: 'نوع شاهد', control: 'multi', level: 'advanced', options: evidenceOptions }
    ],
    presets: [{ id: 'task-first', label: 'انتخاب از کاربرد، بدون حذف نوع‌های مدل', selections: {} }],
    comparison: comparison(
      'محور مدل می‌تواند متفاوت باشد؛ کاربرد، زبان، داده، نسخهٔ آزمون، معیار و واحد باید کنترل یا افشا شوند.',
      { model: 'مدل / artifact', application: 'کاربرد', language: 'زبان', dataset: 'داده', 'test-version': 'نسخهٔ آزمون', metric: 'معیار', unit: 'واحد' },
      [{ id: 'model', label: 'مدل / artifact', differenceDimensions: ['model'], sharedDimensions: ['application', 'language', 'dataset', 'test-version', 'metric', 'unit'] }],
      ['need', 'workload', 'quality-floor', 'latency-target'], ['application', 'metric', 'unit'],
      { allowed: 'دو مدل روی یک آزمون فارسی.', invalidCalculation: 'میانگین‌گیری ستاره‌ای از ادعا و اندازه‌گیری.', needsMoreData: 'نسخه یا زبان آزمون یکی ثبت نشده است.' }
    ),
    comparisonLimit: 4, noDataMessage: 'هنوز ارزیابی تناسب مدل و کاربرد ثبت نشده است.'
  },
  {
    id: 'hardware-feasibility', sectionId: 'hardware-feasibility', sectionNumber: 3,
    shortTitle: 'اجرا روی سخت‌افزار', title: 'امکان اجرا روی سخت‌افزار',
    description: 'حافظهٔ لازم برای مدل را با ظرفیت سخت‌افزار مقایسه کنید.',
    tableLabel: 'ماتریس امکان اجرای artifact روی پیکربندی سخت‌افزار',
    defaultColumns: [
      { key: 'artifact-execution', label: 'Artifact / اجرای دقیق', sortable: true },
      { key: 'workload', label: 'سناریوی بار کاری', sortable: true }
    ],
    matrixColumns: hardwareTargets,
    detailColumns: [
      { key: 'gpu-memory', label: 'VRAM هر GPU / مجموع' }, { key: 'system-memory', label: 'RAM در دسترس' },
      { key: 'storage', label: 'checkpoint / فضای اضافه / اوج موقت' },
      { key: 'context-concurrency', label: 'زمینه / batch / همزمانی' },
      { key: 'offload', label: 'مسیر و هزینهٔ offload' }, { key: 'limitations', label: 'حدود نتیجه' },
      { key: 'sources', label: 'شاهد و نسخه‌ها' }
    ],
    filters: [
      { id: 'hardware', label: 'سخت‌افزار', control: 'multi', level: 'main', options: hardwareTargets.map((item) => option(item.id, item.label, item.note)) },
      { id: 'gpu-count', label: 'تعداد GPU', control: 'number-range', level: 'main', canonicalUnit: 'card' },
      { id: 'feasibility', label: 'وضعیت امکان اجرا', control: 'multi', level: 'main', options: options(['full-gpu', 'hybrid', 'layer-wise', 'insufficient-for-scenario', 'not-reviewed']) },
      { id: 'vram-per-gpu', label: 'VRAM هر کارت', control: 'number-range', level: 'advanced', canonicalUnit: 'GiB' },
      { id: 'ram', label: 'RAM در دسترس', control: 'number-range', level: 'advanced', canonicalUnit: 'GiB' },
      { id: 'storage', label: 'فضای ذخیره‌سازی', control: 'number-range', level: 'advanced', canonicalUnit: 'GiB' },
      { id: 'execution-method', label: 'روش اجرا', control: 'multi', level: 'advanced', options: methodOptions },
      { id: 'engine', label: 'backend واقعی', control: 'multi', level: 'advanced', options: options(engineCandidates) },
      { id: 'quantization', label: 'کوانت وزن', control: 'text', level: 'advanced' },
      { id: 'context-length', label: 'طول کل متن', control: 'number-range', level: 'advanced', canonicalUnit: 'token' },
      { id: 'concurrency', label: 'همزمانی', control: 'number-range', level: 'advanced' },
      { id: 'offload-allowed', label: 'اجازهٔ offload', control: 'boolean', level: 'advanced' },
      { id: 'evidence-kind', label: 'وضعیت شاهد', control: 'multi', level: 'advanced', options: evidenceOptions }
    ],
    presets: [{ id: 'existing-hardware', label: 'شروع از سخت‌افزار موجود', selections: {} }],
    comparison: comparison(
      'ماتریس سخت‌افزار را داخل یک ردیف هم‌شرط نشان می‌دهد؛ مقایسهٔ ردیف‌ها فقط با کنترل همهٔ شرایط غیرسخت‌افزاری معتبر است.',
      { hardware: 'پوشش سخت‌افزار', artifact: 'artifact', stack: 'ServingStack', backend: 'backend', method: 'روش اجرا', quantization: 'کوانت', 'kv-cache': 'KV cache', parallelism: 'موازی‌سازی', settings: 'تنظیمات مؤثر', workload: 'بار کاری', context: 'زمینه', batch: 'batch', concurrency: 'هم‌زمانی', unit: 'واحد' },
      [{ id: 'hardware', label: 'سخت‌افزار', differenceDimensions: ['hardware'], sharedDimensions: ['artifact', 'stack', 'backend', 'method', 'quantization', 'kv-cache', 'parallelism', 'settings', 'workload', 'context', 'batch', 'concurrency', 'unit'] }],
      ['need', 'workload', 'quality-floor', 'latency-target'], ['artifact', 'workload', 'unit'],
      { allowed: 'یک artifact و workload روی دو GPU.', invalidCalculation: 'نسبت سرعت میان workloadهای متفاوت.', needsMoreData: 'وضعیت بررسی‌نشده یا VRAM نامعلوم.' }
    ),
    comparisonLimit: 4, noDataMessage: 'هنوز نتیجهٔ تأییدشده‌ای برای امکان اجرا ثبت نشده است.'
  },
  {
    id: 'software-products', sectionId: 'serving-software', sectionNumber: 4, subviewNumber: 1,
    shortTitle: 'مقایسهٔ نرم‌افزارها', title: 'مقایسهٔ نرم‌افزارها',
    description: 'نرم‌افزارهای اجرای محلی و سرویس‌دهی مدل‌ها را مقایسه کنید.',
    tableLabel: 'جدول مقایسهٔ محصول و نسخهٔ نرم‌افزارهای اجرا و سرویس‌دهی',
    compact: true, hideEmptyColumns: true,
    optionalColumns: [{ key: 'released-on', label: 'تاریخ انتشار', sortable: true }],
    defaultColumns: [
      { key: 'software-version', label: 'نام و نسخه', sortable: true },
      { key: 'roles', label: 'نقش', sortable: true },
      { key: 'scenario', label: 'سناریوی هدف مستند' },
      { key: 'service-features', label: 'قابلیت‌های شاخص' },
      { key: 'platform', label: 'پلتفرم' },
      { key: 'backend-summary', label: 'وابستگی مهم اجرا' },
      { key: 'start-docs', label: 'شروع کار' }
    ],
    detailColumns: [
      { key: 'released-on', label: 'تاریخ انتشار نسخه', sortable: true }, { key: 'last-reviewed', label: 'تاریخ بازبینی رکورد' },
      { key: 'backends', label: 'backendهای مستند' },
      { key: 'os-hardware', label: 'سیستم‌عامل و سخت‌افزار' }, { key: 'local-cloud-offline', label: 'محلی، ابری و بدون اتصال' },
      { key: 'all-capabilities', label: 'همهٔ قابلیت‌ها و وضعیت پشتیبانی' },
      { key: 'tasks', label: 'وظیفه‌ها' }, { key: 'request-control', label: 'صف، هم‌زمانی، batching و پذیرش' },
      { key: 'model-lifecycle', label: 'بارگذاری، خروج و چندمدلی' }, { key: 'inference-optimizations', label: 'بهینه‌سازی استنتاج و offload' },
      { key: 'multi-gpu', label: 'تقسیم مدل / نسخه‌های مستقل' }, { key: 'output-tools', label: 'خروجی، ابزار و استدلال' },
      { key: 'model-scopes', label: 'شرایط قابلیت، مدل، قالب پیام و تجزیه‌گر' },
      { key: 'operations-security', label: 'پایش، سلامت و کنترل دسترسی' }, { key: 'api-compatibility', label: 'endpointها و سازگاری API' },
      { key: 'license', label: 'مجوز' }, { key: 'license-url', label: 'متن مجوز' }, { key: 'commercial-use', label: 'استفادهٔ تجاری' },
      { key: 'license-restrictions', label: 'شروط مجوز' }, { key: 'sources', label: 'منابع' }
    ],
    filters: [
      { id: 'need-type', label: 'نوع نیاز', control: 'multi', level: 'main', options: [option('local-interactive', 'اجرای محلی تعاملی'), option('team-api', 'API تیمی'), option('high-throughput', 'سرویس پرترافیک'), option('specialized-task', 'وظیفهٔ تخصصی'), option('composite-service', 'سرویس چندجزئی')] },
      { id: 'environment', label: 'محیط اجرا', control: 'multi', level: 'main', options: options(['desktop', 'workstation', 'server', 'container', 'kubernetes', 'cloud-service', 'offline-air-gapped', 'other']) },
      { id: 'software-role', label: 'نقش نرم‌افزار', control: 'multi', level: 'main', options: softwareRoleOptions },
      { id: 'software-product', label: 'محصول', control: 'multi', level: 'advanced', options: softwareProductCandidates.map((item) => option(item.id, item.name, 'نامزد taxonomy؛ نه ردیف تأییدشده')) },
      { id: 'software-version', label: 'نسخه', control: 'text', level: 'advanced' },
      { id: 'backend', label: 'backend واقعی و نسخه', control: 'text', level: 'advanced' },
      { id: 'operating-system', label: 'سیستم‌عامل', control: 'text', level: 'advanced' },
      { id: 'hardware-family', label: 'خانوادهٔ سخت‌افزار', control: 'text', level: 'advanced' },
      { id: 'local-cloud', label: 'محلی / ابری', control: 'multi', level: 'advanced', options: options(['local', 'cloud', 'hybrid']) },
      { id: 'offline', label: 'کار بدون اتصال بیرونی', control: 'select', level: 'advanced', options: [option('true', 'بله'), option('false', 'خیر'), option('missing', 'نامعلوم')] },
      ...capabilityFilters.map(([id, label]) => ({ id, label, control: 'multi' as const, level: 'advanced' as const, options: supportOptions })),
      { id: 'provision', label: 'شیوهٔ تأمین قابلیت', control: 'multi', level: 'advanced', options: provisionOptions },
      { id: 'software-license', label: 'مجوز نرم‌افزار', control: 'text', level: 'advanced' },
      { id: 'maintenance', label: 'وضعیت نگه‌داری', control: 'multi', level: 'advanced', options: options(['active', 'maintenance', 'deprecated', 'unknown']) },
      { id: 'released-on', label: 'تاریخ انتشار', control: 'date-range', level: 'advanced' },
      { id: 'last-reviewed', label: 'تاریخ بازبینی', control: 'date-range', level: 'advanced' }
    ],
    presets: [{ id: 'software-choice', label: 'انتخاب نرم‌افزار از نوع نیاز، محیط و نقش', selections: {} }],
    comparison: comparison(
      'نسخه‌ها آزادانه کنار هم دیده می‌شوند؛ محور رابط backend را ثابت نگه می‌دارد و محور کل ترکیب اجازهٔ تفاوت backend می‌دهد.',
      { software: 'محصول / نسخه', need: 'نیاز', environment: 'محیط', role: 'نقش', backend: 'backend', workload: 'بار کاری', model: 'مدل / artifact', metric: 'معیار', unit: 'واحد' },
      [
        { id: 'service-layer', label: 'رابط یا لایهٔ سرویس با backend ثابت', differenceDimensions: ['software'], sharedDimensions: ['need', 'environment', 'role', 'backend', 'workload', 'model', 'metric', 'unit'] },
        { id: 'software-stack', label: 'کل ترکیب نرم‌افزاری / موتور', differenceDimensions: ['software', 'backend'], sharedDimensions: ['need', 'environment', 'role', 'workload', 'model', 'metric', 'unit'] }
      ],
      ['need', 'workload', 'quality-floor', 'latency-target'], ['metric', 'unit'],
      { allowed: 'Ollama و vLLM بدون مدل منتخب کنار هم.', invalidCalculation: 'رتبه‌بندی از روی فهرست قابلیت‌های ناهم‌دامنه.', needsMoreData: 'نسخه یا scope قابلیت بررسی نشده است.' }
    ),
    comparisonLimit: 4, noDataMessage: 'هنوز ردیف نسخه‌مند و تأییدشدهٔ نرم‌افزار وارد نشده است.'
  },
  {
    id: 'deployment-compatibility', sectionId: 'serving-software', sectionNumber: 4, subviewNumber: 2,
    shortTitle: 'سازگاری استقرار', title: 'سازگاری مدل و پیکربندی اجرا',
    description: 'پشتیبانی نرم‌افزار از مدل، قالب وزن و سخت‌افزار.',
    tableLabel: 'جدول سازگاری مدل و پیکربندی اجرای دقیق',
    referenceLinks: [{ label: 'مخزن رسمی AirLLM', href: 'https://github.com/lyogavin/airllm' }],
    defaultColumns: [
      { key: 'model-revision', label: 'مدل / revision', sortable: true },
      { key: 'artifact', label: 'Artifact', sortable: true },
      { key: 'serving-stack', label: 'ترکیب نرم‌افزاری / نسخه‌ها', sortable: true },
      { key: 'hardware-workload', label: 'سخت‌افزار / workload', sortable: true },
      { key: 'execution-method', label: 'روش / کوانت / موازی‌سازی', sortable: true },
      { key: 'compatibility', label: 'وضعیت سازگاری', sortable: true }
    ],
    detailColumns: [
      { key: 'backend-settings', label: 'backend واقعی و تنظیمات مؤثر' }, { key: 'kv-cache', label: 'دقت KV cache' },
      { key: 'memory', label: 'VRAM و RAM اوج' }, { key: 'storage', label: 'checkpoint، فضای اضافه و موقت' },
      { key: 'airllm-scope', label: 'AirLLM / معماری / نسخهٔ مدل و نرم‌افزار' },
      { key: 'preparation', label: 'آماده‌سازی و راه‌اندازی' }, { key: 'latency-throughput', label: 'TTFT، سرعت و زمان کل' },
      { key: 'workload-settings', label: 'کاربرد، batch و هم‌زمانی' },
      { key: 'limitations', label: 'شرایط و محدودیت نتیجه' }, { key: 'sources', label: 'نوع و محل شاهد' }
    ],
    filters: [
      { id: 'model', label: 'مدل / artifact', control: 'text', level: 'main' },
      { id: 'software-product', label: 'نرم‌افزار', control: 'multi', level: 'main', options: softwareProductCandidates.map((item) => option(item.id, item.name)) },
      { id: 'compatibility', label: 'وضعیت سازگاری', control: 'multi', level: 'main', options: supportOptions },
      { id: 'hardware', label: 'سخت‌افزار', control: 'multi', level: 'advanced', options: hardwareTargets.map((item) => option(item.id, item.label)) },
      { id: 'workload', label: 'بار کاری', control: 'text', level: 'advanced' },
      { id: 'backend', label: 'backend واقعی / نسخه', control: 'text', level: 'advanced' },
      { id: 'execution-method', label: 'روش اجرا', control: 'multi', level: 'advanced', options: methodOptions },
      { id: 'quantization', label: 'کوانت وزن', control: 'text', level: 'advanced' },
      { id: 'kv-cache', label: 'دقت KV cache', control: 'text', level: 'advanced' },
      { id: 'parallelism', label: 'موازی‌سازی', control: 'multi', level: 'advanced', options: parallelOptions },
      { id: 'context-length', label: 'طول کل متن', control: 'number-range', level: 'advanced', canonicalUnit: 'token' },
      { id: 'concurrency', label: 'هم‌زمانی', control: 'number-range', level: 'advanced' },
      { id: 'peak-vram', label: 'VRAM اوج', control: 'number-range', level: 'advanced', canonicalUnit: 'GiB' },
      { id: 'peak-ram', label: 'RAM اوج', control: 'number-range', level: 'advanced', canonicalUnit: 'GiB' },
      { id: 'peak-storage', label: 'فضای موقت اوج', control: 'number-range', level: 'advanced', canonicalUnit: 'GiB' },
      { id: 'provision', label: 'شیوهٔ تأمین', control: 'multi', level: 'advanced', options: provisionOptions },
      { id: 'evidence-kind', label: 'نوع شاهد', control: 'multi', level: 'advanced', options: evidenceOptions }
    ],
    presets: [{ id: 'memory-constrained', label: 'بررسی مدل، کوانت و همهٔ مسیرهای اجرای کم‌حافظه', selections: {} }],
    comparison: comparison(
      'سازگاری به استقرار دقیق محدود است؛ محور stack یا سخت‌افزار می‌تواند متفاوت باشد و بقیهٔ شرایط افشا می‌شود.',
      { model: 'مدل / revision', artifact: 'artifact', stack: 'ServingStack', backend: 'backend', hardware: 'سخت‌افزار', workload: 'بار کاری', method: 'روش', quantization: 'کوانت', 'kv-cache': 'KV cache', parallelism: 'موازی‌سازی', context: 'زمینه', batch: 'batch', concurrency: 'هم‌زمانی', settings: 'تنظیمات مؤثر', unit: 'واحد' },
      [
        { id: 'service-layer', label: 'رابط یا wrapper با backend ثابت', differenceDimensions: ['stack'], sharedDimensions: ['backend', 'model', 'artifact', 'hardware', 'workload', 'method', 'quantization', 'kv-cache', 'parallelism', 'context', 'batch', 'concurrency', 'settings', 'unit'] },
        { id: 'software-stack', label: 'کل stack / backend', differenceDimensions: ['stack', 'backend'], sharedDimensions: ['model', 'artifact', 'hardware', 'workload', 'method', 'quantization', 'kv-cache', 'parallelism', 'context', 'batch', 'concurrency', 'settings', 'unit'] },
        { id: 'hardware', label: 'سخت‌افزار', differenceDimensions: ['hardware'], sharedDimensions: ['model', 'artifact', 'stack', 'backend', 'workload', 'method', 'quantization', 'kv-cache', 'parallelism', 'context', 'batch', 'concurrency', 'settings', 'unit'] }
      ],
      ['need', 'workload', 'quality-floor', 'latency-target'], ['model', 'artifact', 'workload', 'unit'],
      { allowed: 'یک artifact روی دو stack یا دو GPU.', invalidCalculation: 'تعمیم بارگذاری AirLLM به سرویس چت.', needsMoreData: 'RAM، دیسک یا نسخهٔ وابستگی گزارش نشده است.' }
    ),
    comparisonLimit: 4, noDataMessage: 'هنوز سازگاری استقرار نسخه‌مند ثبت نشده است.'
  },
  {
    id: 'benchmarks', sectionId: 'benchmarks', sectionNumber: 5,
    shortTitle: 'بنچمارک و شواهد', title: 'بنچمارک و شواهد',
    description: 'نتایج سرعت و تأخیر، همراه با سخت‌افزار و تنظیمات آزمون.',
    tableLabel: 'جدول اجرای بنچمارک مدل‌های زبانی',
    defaultColumns: [
      { key: 'run-model', label: 'اجرا / مدل / artifact', sortable: true },
      { key: 'stack-hardware', label: 'ServingStack / سخت‌افزار', sortable: true },
      { key: 'workload', label: 'داده / زبان / workload', sortable: true },
      { key: 'ttft', label: 'TTFT', sortable: true, numeric: true },
      { key: 'tpot', label: 'TPOT / ITL', sortable: true, numeric: true },
      { key: 'throughput', label: 'خروجی هر درخواست / کل', sortable: true, numeric: true },
      { key: 'goodput', label: 'Goodput / SLO', sortable: true, numeric: true }
    ],
    detailColumns: [
      { key: 'revisions', label: 'revisionها، stack، backend و کوانت' }, { key: 'hardware', label: 'GPU، توپولوژی، CPU، RAM و دیسک' },
      { key: 'length-distributions', label: 'توزیع ورودی و خروجی' }, { key: 'load', label: 'زمینه، batch، هم‌زمانی و نرخ ورود' },
      { key: 'reasoning', label: 'reasoning و بودجه' }, { key: 'optimizations', label: 'Cache، speculative و تنظیمات' },
      { key: 'statistics', label: 'آماره و پراکندگی' }, { key: 'outcomes', label: 'خطا، timeout و موفق' },
      { key: 'resources', label: 'حافظه و انرژی' }, { key: 'run-state', label: 'warm-up، cold start و پایداری' },
      { key: 'quality', label: 'کیفیت مرتبط' }, { key: 'provenance', label: 'تاریخ، منتشرکننده، خروجی خام و منبع' }
    ],
    filters: [
      { id: 'model', label: 'مدل / artifact', control: 'text', level: 'main' },
      { id: 'hardware', label: 'سخت‌افزار', control: 'multi', level: 'main', options: hardwareTargets.map((item) => option(item.id, item.label)) },
      { id: 'workload', label: 'بار کاری', control: 'text', level: 'main' },
      { id: 'software-product', label: 'جزء نرم‌افزاری', control: 'multi', level: 'advanced', options: softwareProductCandidates.map((item) => option(item.id, item.name)) },
      { id: 'backend', label: 'backend و نسخه', control: 'text', level: 'advanced' },
      { id: 'quantization', label: 'کوانت', control: 'text', level: 'advanced' },
      { id: 'language', label: 'زبان', control: 'text', level: 'advanced' },
      { id: 'context-length', label: 'طول کل متن', control: 'number-range', level: 'advanced', canonicalUnit: 'token' },
      { id: 'batch-size', label: 'Batch', control: 'number-range', level: 'advanced' },
      { id: 'concurrency', label: 'همزمانی', control: 'number-range', level: 'advanced' },
      { id: 'arrival-rate', label: 'نرخ ورود', control: 'number-range', level: 'advanced', canonicalUnit: 'request/s' },
      { id: 'reasoning-mode', label: 'حالت reasoning', control: 'select', level: 'advanced', options: options(['off', 'on', 'adaptive']) },
      { id: 'prefix-caching', label: 'Prefix caching', control: 'boolean', level: 'advanced' },
      { id: 'speculative-decoding', label: 'Speculative decoding', control: 'boolean', level: 'advanced' },
      { id: 'statistic', label: 'نوع آماره', control: 'multi', level: 'advanced', options: options(['single', 'mean', 'median', 'p50', 'p90', 'p95', 'p99']) },
      { id: 'tested-on', label: 'تاریخ آزمون', control: 'date-range', level: 'advanced' },
      { id: 'evidence-kind', label: 'نوع شاهد', control: 'multi', level: 'advanced', options: evidenceOptions }
    ],
    comparison: comparison(
      'برای آزمایش کنترل‌شده محور نرم‌افزار، سخت‌افزار یا مدل انتخاب می‌شود؛ workload، معیار، واحد و تنظیمات غیرمحور کنترل یا افشا می‌شوند.',
      { model: 'مدل / artifact', stack: 'ServingStack', backend: 'backend', hardware: 'سخت‌افزار', workload: 'بار کاری', method: 'روش', quantization: 'کوانت', 'kv-cache': 'KV cache', context: 'زمینه', batch: 'batch', concurrency: 'هم‌زمانی', 'arrival-rate': 'نرخ ورود', 'reasoning-mode': 'حالت reasoning', 'reasoning-budget': 'بودجهٔ reasoning', 'prefix-caching': 'Prefix caching', 'speculative-decoding': 'Speculative decoding', settings: 'تنظیمات مؤثر', metric: 'معیار', statistic: 'آماره', unit: 'واحد' },
      [
        { id: 'service-layer', label: 'رابط یا wrapper با backend ثابت', differenceDimensions: ['stack'], sharedDimensions: ['backend', 'model', 'hardware', 'workload', 'method', 'quantization', 'kv-cache', 'context', 'batch', 'concurrency', 'arrival-rate', 'reasoning-mode', 'reasoning-budget', 'prefix-caching', 'speculative-decoding', 'settings', 'metric', 'statistic', 'unit'] },
        { id: 'software', label: 'کل نرم‌افزار / backend', differenceDimensions: ['stack', 'backend'], sharedDimensions: ['model', 'hardware', 'workload', 'method', 'quantization', 'kv-cache', 'context', 'batch', 'concurrency', 'arrival-rate', 'reasoning-mode', 'reasoning-budget', 'prefix-caching', 'speculative-decoding', 'settings', 'metric', 'statistic', 'unit'] },
        { id: 'hardware', label: 'سخت‌افزار', differenceDimensions: ['hardware'], sharedDimensions: ['model', 'stack', 'backend', 'workload', 'method', 'quantization', 'kv-cache', 'context', 'batch', 'concurrency', 'arrival-rate', 'reasoning-mode', 'reasoning-budget', 'prefix-caching', 'speculative-decoding', 'settings', 'metric', 'statistic', 'unit'] },
        { id: 'model', label: 'مدل', differenceDimensions: ['model'], sharedDimensions: ['stack', 'backend', 'hardware', 'workload', 'method', 'quantization', 'kv-cache', 'context', 'batch', 'concurrency', 'arrival-rate', 'reasoning-mode', 'reasoning-budget', 'prefix-caching', 'speculative-decoding', 'settings', 'metric', 'statistic', 'unit'] }
      ],
      ['need', 'workload', 'quality-floor', 'latency-target'], ['workload', 'metric', 'statistic', 'unit'],
      { allowed: 'دو موتور با workload و سخت‌افزار مشترک.', invalidCalculation: 'نسبت TTFT به throughput کل یا workload دیگر.', needsMoreData: 'آماره، واحد یا تنظیم مؤثر گزارش نشده است.' }
    ),
    comparisonLimit: 4, noDataMessage: 'هنوز اجرای بنچمارک تأییدشده‌ای وارد نشده است.'
  },
  {
    id: 'specialized-models', sectionId: 'specialized-models', sectionNumber: 6,
    shortTitle: 'مدل‌های تخصصی مکمل', title: 'مدل‌های کوچک و تخصصی مکمل',
    description: 'وظیفه، ورودی و خروجی مدل‌های تخصصی؛ امتیازهای منتشرشده با نام گزارش‌دهنده و معیار همان آزمون.',
    tableLabel: 'جدول مدل‌های کوچک و تخصصی مکمل',
    compact: true, hideEmptyColumns: true,
    optionalColumns: [{ key: 'released-on', label: 'تاریخ انتشار', sortable: true }, { key: 'work-rate', label: 'نرخ کار اندازه‌گیری‌شده', sortable: true, numeric: true }],
    defaultColumns: [
      { key: 'model-kind', label: 'مدل', sortable: true },
      { key: 'task', label: 'وظیفهٔ دقیق' },
      { key: 'parameters', label: 'اندازه', sortable: true },
      { key: 'input-limit', label: 'سقف ورودی', sortable: true },
      { key: 'output', label: 'نوع / ابعاد خروجی' },
      { key: 'features', label: 'ویژگی کاربردی' },
      { key: 'downloads', label: 'دریافت و راه‌اندازی' }
    ],
    detailColumns: [
      { key: 'pooling', label: 'روش pooling / scoring' }, { key: 'dimensions', label: 'ابعاد پیش‌فرض / حداکثر embedding' },
      { key: 'adjustable-dimensions', label: 'ابعاد قابل تنظیم و شرط محاسبهٔ حافظه' },
      { key: 'languages', label: 'زبان‌های مستند' }, { key: 'parameter-scope', label: 'دامنهٔ شمار پارامترها' },
      { key: 'artifact-execution', label: 'revision مدل / artifact دقیق' }, { key: 'released-on', label: 'تاریخ انتشار مدل', sortable: true },
      { key: 'language-dataset', label: 'زبان آزمون اختصاصی' }, { key: 'workload', label: 'برنامهٔ آزمون اختصاصی' },
      { key: 'generative-alternative', label: 'نسبت با گزینهٔ مولد' }, { key: 'limitations', label: 'محدودیت نتیجه' }, { key: 'sources', label: 'منابع' }
    ],
    filters: [
      { id: 'kind', label: 'نوع مدل', control: 'multi', level: 'main', options: [option('embedding', 'بردارساز'), option('reranker', 'بازرتبه‌بند'), option('encoder-classifier', 'رمزگذار / دسته‌بند'), option('other', 'سایر')] },
      { id: 'application', label: 'کاربرد', control: 'multi', level: 'main', options: applicationOptions },
      { id: 'model-size', label: 'اندازهٔ اعلامی مدل', control: 'number-range', level: 'main', canonicalUnit: 'B', placeholder: 'شمار کل، یا اندازهٔ اسمی با دامنهٔ مشخص در جزئیات' },
      { id: 'size-band', label: 'رده‌بندی اندازهٔ این راهنما', control: 'select', level: 'advanced', options: sizeBandOptions },
      { id: 'subapplication', label: 'وظیفهٔ تخصصی', control: 'text', level: 'advanced' },
      { id: 'metric', label: 'معیار وظیفه', control: 'text', level: 'advanced' },
      { id: 'metric-unit', label: 'واحد معیار', control: 'text', level: 'advanced', placeholder: 'مثلاً document/s' },
      { id: 'language', label: 'زبان', control: 'text', level: 'advanced' },
      { id: 'evidence-kind', label: 'نوع شاهد', control: 'multi', level: 'advanced', options: evidenceOptions }
    ],
    comparison: comparison(
      'معیار و واحد باید متناسب با یک وظیفه باشند؛ document/s هیچ‌گاه ضمنی به token/s تبدیل نمی‌شود.',
      { model: 'مدل / artifact', task: 'وظیفه', dataset: 'داده', language: 'زبان', metric: 'معیار', unit: 'واحد', workload: 'بار کاری' },
      [{ id: 'model', label: 'مدل تخصصی', differenceDimensions: ['model'], sharedDimensions: ['task', 'dataset', 'language', 'metric', 'unit', 'workload'] }],
      ['need', 'workload', 'quality-floor', 'latency-target'], ['task', 'metric', 'unit'],
      { allowed: 'دو reranker روی داده و معیار مشترک.', invalidCalculation: 'رتبه‌بندی embedding با token/s مدل مولد.', needsMoreData: 'داده یا واحد معیار گزارش نشده است.' }
    ),
    comparisonLimit: 4, noDataMessage: 'هنوز ارزیابی مدل تخصصی ثبت نشده است.'
  }
];

export const llmGuideSections = Array.from(
  new Map(llmViewConfigs.map((view) => [view.sectionId, {
    id: view.sectionId,
    number: view.sectionNumber,
    title: view.sectionNumber === 4 ? 'نرم‌افزارهای اجرا و سرویس‌دهی' : view.title,
    views: llmViewConfigs.filter((candidate) => candidate.sectionId === view.sectionId)
  }])).values()
);

/** Use the complete snapshot, never the filtered subset, to keep columns stable. */
export function defaultLlmColumns(config: LlmViewConfig, rows: LlmViewRow[]) {
  return config.hideEmptyColumns && rows.length
    ? config.defaultColumns.filter(column => rows.some(row => row.cells[column.key]?.state === 'known'))
    : config.defaultColumns;
}

/** The matrix is an optional presentation within the same usage view. */
export function modelUseViewConfig(matrix = false): LlmViewConfig {
  const base = llmViewConfigs.find(view => view.id === 'model-suitability')!;
  return { ...base, presentation: matrix ? 'matrix' : 'guidance',
    tableLabel: matrix ? 'ماتریس مقایسهٔ کاربرد مدل‌های مولد' : 'جدول راهنمای کاربرد مدل‌ها',
    defaultColumns: matrix ? base.defaultColumns : [
      { key: 'model', label: 'مدل', sortable: true },
      { key: 'role', label: 'نقش در سامانه' },
      { key: 'primary-use', label: 'کاربرد اصلی' },
      { key: 'introduction', label: 'ویژگی و دلیل بررسی' },
      { key: 'use-condition', label: 'شرط مهم استفاده' },
      { key: 'downloads', label: 'شروع کار' }
    ],
    matrixColumns: matrix ? base.matrixColumns : undefined,
    filters: base.filters.filter(filter => !['assessment-basis', 'tested-version', 'evidence-kind', 'subapplication', 'language'].includes(filter.id)).concat([
      { id: 'use-role', label: 'نقش در سامانه', control: 'multi', level: 'main', options: [
        option('retrieval', 'بازیابی سند'), option('reranking', 'بازرتبه‌بندی'), option('grounded-generation', 'تولید پاسخ از سند'),
        option('text-generation', 'تولید متن'), option('coding', 'برنامه‌نویسی'), option('tool-use', 'فراخوانی ابزار'), option('vision', 'درک تصویر'), option('reasoning', 'استدلال')
      ] }
    ])
  };
}
