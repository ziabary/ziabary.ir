import type { LlmGuideRepository } from './schema';
import type { LlmViewRow, LlmViewConfig, LlmViewId, ViewValue, LlmFilterConfig, LlmMatrixCell } from './views';
import { llmViewConfigs } from './views';
import { research, researchEvidenceId, researchModel, calculateMemory, memoryStatus, faNumber, type ReportedPerformance } from './research';

type Known = Extract<ViewValue, { state: 'known' }>;
export const textValue = (display: string, options: Omit<Partial<Known>, 'state' | 'display'> = {}): Known => ({ state: 'known', display, ...options });
const number = (value: number, unit: string, display = `${faNumber(value)} ${unit}`): Known => textValue(display, { canonicalNumber: value, canonicalUnit: unit, raw: value });
const missing: ViewValue = { state: 'not-measured' };
const evidenceIds = (ids: string[]) => [...new Set(ids.map(researchEvidenceId))];
const source = (ids: string[]) => {
  const item = research.sources.find(source => source.id === ids[0]);
  return item ? textValue(item.publisher ?? 'مخزن فایل', { href: item.url }) : missing;
};
function row(repository: LlmGuideRepository, id: string, label: string, modelName: string | undefined, sourceIds: string[]): LlmViewRow {
  const model = researchModel(repository, modelName);
  return { id, label, ...(model ? { modelId: model.id, modelUrl: `https://huggingface.co/${modelName}` } : {}), inlineDetails: true,
    brandId: modelName ?? label, searchText: [label, modelName].filter(Boolean).join(' '), cells: { model: textValue(label) }, facets: {}, details: {}, sourceIds: evidenceIds(sourceIds),
    comparison: { dimensions: {}, calculation: { status: 'needs-more-data', reason: 'مقایسهٔ عددی فقط در یک پروتکل، واحد و دامنهٔ مشترک معنا دارد.' }, limitations: [] } };
}
const cols = (...pairs: Array<[string, string]>) => pairs.map(([key, label]) => ({ key, label }));
const numericCol = (key: string, label: string) => ({ key, label, numeric: true, sortable: true });
const selectFilter = (id: string, label: string, values: Array<[string, string]>, advanced = false): LlmFilterConfig => ({ id, label, control: 'select', level: advanced ? 'advanced' : 'main', options: values.map(([value, label]) => ({ value, label })) });
const uniqueOptions = (values: string[]) => [...new Set(values)].map(value => [value, value] as [string, string]);
const quantLabel = (value: string) => value.replace('publisher checkpoint default (BF16)', 'BF16 · وزن اصلی ناشر')
  .replace('publisher checkpoint default; FP8/mixed', 'FP8 / مختلط · وزن ناشر')
  .replace('backend-appropriate checkpoint/quantization', 'متناسب موتور؛ نسخهٔ منتخب بررسی شود')
  .replace('16-bit; FP16/BF16 not distinguished in report', '۱۶ بیت؛ FP16/BF16 تفکیک نشده');

export const performanceGroups: Record<string, { label: string; note: string }> = {
  'gpustack-qwen14-h100-sharegpt': { label: 'Qwen3-14B · H100 · GPUStack', note: 'بار اشباع ShareGPT؛ throughput خروجی کل سرویس است. زمان اولین توکن را هم بررسی کنید.' },
  'gpustack-qwen32-h100-sharegpt': { label: 'Qwen3-32B · H100 · GPUStack', note: 'بار اشباع ShareGPT؛ این گزارش با آزمون ۱۴ میلیاردی گروه جدا دارد.' },
  'gpustack-deepseek-h200-sharegpt': { label: 'DeepSeek-V3.2 · هشت H200 · GPUStack', note: 'مدل V3.2 با هشت کارت SXM؛ نوع تقسیم مدل و داده در هر ردیف متفاوت است.' },
  'llamacpp-llama2-7b-q4-fa': { label: 'Llama 2 · llama-bench · کارت‌های مختلف', note: 'آزمون‌های جداگانهٔ pp512 و tg128. نسخهٔ ساخت و میزبان متفاوت‌اند؛ رتبه‌بندی عمومی GPU نیست.' },
  'qwen-transformers-h20-6144-2048': { label: 'Qwen3 · Transformers · H20', note: 'نرخ گزارش‌شده مجموع توکن ورودی و خروجی بر زمان است؛ سرعت تولید خروجی نیست.' },
  'dbmart-4090-offline-100-600': { label: 'DeepSeek تقطیرشده · 4090 · پردازش دسته‌ای', note: 'آزمون آفلاین میزبان: ۳۰۰ درخواست، ۱۰۰ توکن ورودی و ۶۰۰ توکن خروجی برای هر درخواست؛ شاهد تجربهٔ چت نیست.' },
  'main-horse-gpt-fast-synthetic': { label: 'آزمون فنی معماری · وزن تصادفی', note: 'وزن‌ها تصادفی‌اند؛ عددها به سرعت یا کیفیت مدل آموزش‌دیده نسبت داده نمی‌شوند.' }
};
export const performanceMetrics: Record<string, { label: string; unit: string }> = {
  outputTokensPerSecond: { label: 'نرخ تجمیعی خروجی', unit: 'توکن خروجی/ثانیه' },
  prefill512TokensPerSecond: { label: 'پردازش ورودی · pp512', unit: 'توکن ورودی/ثانیه' },
  decode128TokensPerSecond: { label: 'تولید خروجی · tg128', unit: 'توکن خروجی/ثانیه' },
  combinedInputOutputTokensPerSecond: { label: 'نرخ مجموع ورودی و خروجی', unit: 'توکن ورودی و خروجی/ثانیه' },
  decodeTokensPerSecond: { label: 'تولید با وزن تصادفی', unit: 'توکن/ثانیه' },
  meanTtftMs: { label: 'میانگین زمان اولین توکن', unit: 'میلی‌ثانیه' },
  p99TtftMs: { label: 'صدک ۹۹ زمان اولین توکن', unit: 'میلی‌ثانیه' },
  meanTpotMs: { label: 'میانگین زمان هر توکن بعدی', unit: 'میلی‌ثانیه' },
  requestsPerSecond: { label: 'نرخ درخواست', unit: 'درخواست/ثانیه' }
};
export const protocolLabels: Record<string, string> = { inputTokens: 'توکن ورودی', outputTokens: 'توکن خروجی', generatedTokens: 'توکن تولیدی', prefillTokens: 'توکن پردازش ورودی', batchSize: 'اندازهٔ دسته', submittedRequests: 'درخواست ارسال‌شده', inputTokensPerRequest: 'ورودی هر درخواست', outputTokensPerRequest: 'خروجی هر درخواست', mode: 'روش', requestMode: 'نوع بار', dataset: 'دادهٔ آزمون', benchmarkTool: 'ابزار آزمون', speedDefinition: 'تعریف نرخ', memoryUnitAsPrinted: 'واحد حافظه در منبع', torch: 'PyTorch', flashAttention: 'Flash Attention', autoAwq: 'AutoAWQ', autoAwqKernels: 'کرنل AutoAWQ' };

export interface ResearchControls {
  context: number; active: number; method: 'gpu' | 'cpu' | 'layerwise' | 'publisher' | 'weights';
  hardwareIds: string[]; ram: number[]; group: string; metric: string;
  deploymentMode: 'routes' | 'kernels'; model: string;
}
export const defaultResearchControls: ResearchControls = { context: 8192, active: 1, method: 'gpu', hardwareIds: ['hardware:rtx4090-24', 'hardware:rtx4090-mod-48', 'hardware:2x-rtx4090-24'], ram: [8, 16, 32], group: 'gpustack-qwen14-h100-sharegpt', metric: 'outputTokensPerSecond', deploymentMode: 'routes', model: '' };

/** File-footprint view covers all verified packages without pretending that
 * free memory after weights is a full inference feasibility calculation.
 */
export function weightFootprintRows(repository: LlmGuideRepository, controls: ResearchControls): LlmViewRow[] {
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
    result.cells = { ...result.cells, quant: textValue(artifact.format === 'gguf' ? artifact.variant : artifact.format), weight: number(weightGiB, 'GiB'), condition: textValue(model.kind === 'embedding' || model.kind === 'reranker' || model.kind === 'encoder-classifier' ? 'وزن + حافظهٔ ورودی و batch؛ مدل تخصصی' : 'وزن + KV/state + حافظهٔ موقت؛ اجزای تصویر و صوت مطابق بسته'), source: textValue(artifact.publisher, { href: artifact.filesUrl }) };
    result.facets = { quant: result.cells.quant, weight: result.cells.weight };
    result.details = { scope: textValue('اندازهٔ واقعی فایل‌های انتخاب‌شده روی دیسک؛ حافظهٔ اجرا می‌تواند با بارگذاری، تبدیل و repacking تغییر کند. این نما حداقل VRAM یا سرعت را تعیین نمی‌کند.'), files: textValue(artifact.files.map(file => file.path).join(' · '), { href: artifact.filesUrl }), revision: textValue(artifact.repositoryRevision ?? artifact.variant), method: textValue('مقایسهٔ اندازهٔ فایل وزن با ظرفیت اسمی حافظه') };
    result.matrixCells = Object.fromEntries(research.hardware.filter(device => controls.hardwareIds.includes(device.id)).map(device => {
      const delta = device.nominalAggregateVramGB - weightGiB;
      return [device.id, { value: textValue(delta < 0 ? `وزن: ${faNumber(-delta)} GiB بیشتر از ظرفیت` : `پس از وزن: ${faNumber(delta)} GiB`, { badge: 'فقط اندازهٔ فایل' }), details: [{ label: 'تفسیر', value: textValue(delta < 0 ? 'ظرفیت اسمی برای نگه‌داری بایت‌های همین بسته کافی نیست؛ کوانت دیگر یا offload مسیر متفاوتی است.' : `فضای باقی‌مانده باید هزینهٔ cache/state و runtime را پوشش دهد.${device.gpuCount > 1 ? ' جمع ظرفیت چند کارت به معنی حافظهٔ یکپارچه نیست.' : ''}`) }], sourceIds: [...artifact.evidenceIds, ...evidenceIds(device.sourceIds)] }];
    }));
    result.searchText += ` ${artifact.format} ${artifact.variant}`;
    return result;
  });
}

export function memoryRows(repository: LlmGuideRepository, controls: ResearchControls): LlmViewRow[] {
  if (controls.method === 'weights') return weightFootprintRows(repository, controls);
  if (controls.method === 'layerwise') return research.airllm.map(item => {
    const result = row(repository, item.id, item.modelRepository.split('/')[1], item.modelRepository, item.sourceIds);
    result.cells = { ...result.cells, engine: textValue('AirLLM 4.0.0', { brandId: 'airllm' }), budget: number(item.reportedVramGB, 'GB'), method: textValue('بارگذاری لایه‌ای', { badge: 'گزارش ناشر' }), condition: textValue(item.userSummaryFa), hardware: item.hardwareAsReported ? textValue(item.hardwareAsReported, { brandId: 'nvidia' }) : missing, source: source(item.sourceIds) };
    result.details = { dependencies: textValue(item.dependenciesAsReported), scope: textValue('کل بار کاری گزارش نشده؛ RAM و دیسک در این مسیر بخشی از اجرا هستند. عدد VRAM را با بودجهٔ بارگذاری همهٔ وزن‌ها مقایسه نکنید.'), 'reported-on': textValue(item.reportedOn) };
    return result;
  });
  if (controls.method === 'publisher') return research.memoryClaims.map(item => {
    const result = row(repository, item.id, item.modelRepository.split('/')[1], item.modelRepository, item.sourceIds);
    result.cells = { ...result.cells, budget: number(item.reportedMemoryGB, 'GB'), method: textValue('وزن بومی MXFP4 / مختلط', { badge: 'گزارش ناشر' }), condition: textValue('حد حافظهٔ اعلامی معرفی مدل؛ زمینه و هم‌زمانی سناریوی ما به آن اعمال نشده است.'), source: source(item.sourceIds) };
    result.details = { scope: textValue('این عدد ادعای حافظهٔ ناشر است و نتیجهٔ فرمول GGUF نیست.') }; return result;
  });
  const cpu = controls.method === 'cpu';
  const rows: LlmViewRow[] = [];
  for (const artifact of research.artifacts) {
    const plan = calculateMemory(artifact, controls.context, controls.active, 1, cpu);
    if (!plan) continue;
    const result = row(repository, artifact.id, artifact.modelRepository.split('/')[1], artifact.modelRepository, artifact.sourceIds);
    result.cells = { ...result.cells, quant: textValue(artifact.quantization), budget: number(plan.budgetGiB, 'GiB'), weight: number(plan.weightGiB, 'GiB'), kv: number(plan.kvGiB, 'GiB') };
    result.facets = { quant: textValue(artifact.quantization), budget: result.cells.budget };
    result.details = { method: textValue(cpu ? 'GGUF روی CPU؛ KV از نوع FP16' : 'GGUF با تمام وزن‌ها در GPU؛ KV از نوع FP16'), scope: textValue('حجم فایل وزن + KV + ذخیرهٔ اجرایی؛ ظرفیت اسمی کارت به‌عنوان بودجهٔ GiB فرض شده است. حافظهٔ آزاد واقعی می‌تواند کمتر باشد.'), workload: textValue(`${faNumber(controls.context, 0)} توکن شامل ورودی، تاریخچه و خروجی؛ ${faNumber(controls.active, 0)} درخواست فعال`), reserve: number(plan.reserveGiB, 'GiB'), limit: number(artifact.artifactContextLimitTokens, 'token', `${faNumber(artifact.artifactContextLimitTokens, 0)} توکن`), revision: textValue(artifact.repositoryRevision, { copyText: artifact.repositoryRevision }), files: textValue(`${faNumber(artifact.files.length)} فایل · ${faNumber(artifact.weightFileBytes, 0)} بایت`, { href: `https://huggingface.co/${artifact.repository}/tree/${artifact.repositoryRevision}` }), authority: textValue(artifact.authority === 'model-publisher' ? 'فایل سازندهٔ مدل' : `فایل شخص ثالث: ${artifact.repository.split('/')[0]}`), formula: textValue('KV bytes = 2 × layers × KV heads × head dimension × context × active sequences × 2') };
    result.matrixCells = {};
    if (cpu) for (const ram of controls.ram) result.matrixCells[`ram-${ram}`] = fitCell(plan.budgetGiB, ram, 1, result.sourceIds);
    else for (const device of research.hardware.filter(item => controls.hardwareIds.includes(item.id))) {
      const targetPlan = calculateMemory(artifact, controls.context, controls.active, device.gpuCount)!;
      const cell = fitCell(targetPlan.budgetGiB, device.nominalAggregateVramGB, device.gpuCount, [...result.sourceIds, ...evidenceIds(device.sourceIds)]);
      cell.details?.push({ label: 'معماری GPU و اتصال', value: textValue(`${device.architecture} · ${device.interconnect}`) });
      result.matrixCells[device.id] = cell;
    }
    result.details.architecture = textValue(`${artifact.architecture} · ${faNumber(artifact.layers)} لایه · ${faNumber(artifact.kvHeads)} سر KV · بُعد هر سر ${faNumber(artifact.headDim)}`);
    result.details['architecture-basis'] = textValue(artifact.architectureBasis.includes('config') ? 'معماری از پیکربندی مدل نام‌گذاری‌شده؛ فرض حفظ معماری در GGUF رسمی ناشر.' : 'معماری از سربرگ فایل GGUF منتخب.');
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
    result.details = { method: textValue('CPU؛ وزن و KV از نوع FP32؛ مسیر مستقل از GGUF'), workload: textValue(`${faNumber(controls.context)} توکن؛ ${faNumber(controls.active)} درخواست فعال`), scope: textValue('دو برابر حجم فایل BF16 به‌عنوان برآورد وزن FP32؛ سربار فایل نیز دو بار شمرده شده است. این برآورد سرعت پاسخ نیست.'), reserve: number(4, 'GiB'), revision: textValue(item.repositoryRevision) };
    result.matrixCells = Object.fromEntries(controls.ram.map(ram => [`ram-${ram}`, fitCell(budget, ram, 1, result.sourceIds)])); rows.push(result);
  }
  return rows;
}
function fitCell(required: number, capacity: number, devices: number, sources: string[]): LlmMatrixCell {
  const status = memoryStatus(required, capacity, devices);
  return { value: textValue(status.label, { badge: status.id === 'over-budget' ? `کمبود ${faNumber(required - capacity)} GiB` : `حاشیه ${faNumber(capacity - required)} GiB` }), sourceIds: sources,
    details: [{ label: 'حافظهٔ مورد نیاز', value: number(required, 'GiB') }, ...(status.note ? [{ label: 'نکتهٔ اجرایی', value: textValue(status.note) }] : []), { label: 'تعداد دستگاه', value: number(devices, 'device', faNumber(devices, 0)) }] };
}

export function compatibilityRows(repository: LlmGuideRepository, kernels = false): LlmViewRow[] {
  if (kernels) return research.kernels.map(item => {
    const result = row(repository, item.id, item.implementation, undefined, item.sourceIds);
    result.brandId = item.engine;
    result.cells = { ...result.cells, engine: textValue(`${item.engine} ${item.engineVersion}`, { brandId: item.engine }), format: textValue(item.implementation), architecture: textValue(item.architecture, { brandId: 'nvidia' }), status: textValue(item.supported ? 'پشتیبانی در این پیاده‌سازی' : 'پشتیبانی ندارد'), condition: textValue('پشتیبانی کرنل؛ معماری مدل و فایل منتخب جدا بررسی شود.'), source: source(item.sourceIds) };
    result.facets = { engine: textValue(item.engine), architecture: textValue(item.architecture), status: textValue(item.supported ? 'supported' : 'unsupported') };
    result.details = { scope: textValue('جدول پشتیبانی پیاده‌سازی vLLM 0.29.0؛ به معنی پشتیبانی همهٔ قالب‌ها برای همهٔ معماری‌های مدل نیست.') }; return result;
  });
  const existing = research.compatibility.map(item => {
    const result = row(repository, item.id, item.modelScope.split('/')[1] ?? item.modelScope, item.modelScope, item.sourceIds);
    const run = research.performance.find(run => run.id === item.performanceId);
    const status = item.status === 'published-run' ? 'اجرای گزارش‌شده' : 'مسیر مستند';
    const condition = item.conditionsFa?.join('؛ ') || (item.task === 'reranking' ? 'قالب ویژهٔ امتیازدهی پرسش و سند' : '');
    result.cells = { ...result.cells, engine: textValue([item.engine, item.engineVersion].filter(Boolean).join(' '), { brandId: item.engine }), format: textValue(quantLabel(item.weightFormat)), status: textValue(status), condition: condition ? textValue(condition) : missing, hardware: item.hardwareLabel ? textValue(`${faNumber(item.gpuCount ?? 1)} × ${item.hardwareLabel}`, { brandId: 'nvidia' }) : textValue(item.userSummaryFa), source: source(item.sourceIds) };
    result.facets = { engine: textValue(item.engine), task: textValue(item.task ?? 'generation'), format: textValue(item.artifactId ? 'GGUF' : item.weightFormat.includes('safetensors') ? 'safetensors' : 'checkpoint'), status: textValue(item.status), deployment: textValue(item.engine === 'llama.cpp' || item.engine === 'Ollama' ? 'local' : 'service') };
    result.details = { scope: textValue(item.userSummaryFa), condition: condition ? textValue(condition) : missing, ...(run?.servingCommandAsPublished ? { command: textValue(run.servingCommandAsPublished, { copyText: run.servingCommandAsPublished }) } : {}) };
    result.searchText += ` ${item.engine} ${item.weightFormat} ${item.hardwareLabel ?? ''}`; return result;
  });
  const added: LlmViewRow[] = [];
  const approved = new Set(['Ollama','llama.cpp','vLLM','SGLang','Transformers','Sentence Transformers','FlagEmbedding','KTransformers']);
  for (const profile of repository.modelProfiles) {
    const model = repository.models.find(model => model.id === profile.modelVersionId)!;
    for (const guide of profile.runGuides) {
      if (!approved.has(guide.engine) || existing.some(item => item.modelId === model.id && (item.facets.engine as Known)?.display.toLowerCase() === guide.engine.toLowerCase())) continue;
      const result = row(repository, `route:${model.id}:${guide.engine}`, model.exactName, model.aliases?.[0], []);
      const local = ['Ollama','llama.cpp'].includes(guide.engine);
      const task = model.kind === 'embedding' ? 'embedding' : model.kind === 'reranker' ? 'reranking' : model.kind === 'encoder-classifier' ? 'classification' : 'generation';
      const format = guide.engine === 'Ollama' ? 'Ollama package' : guide.engine === 'llama.cpp' ? 'GGUF' : 'checkpoint';
      result.sourceIds = guide.evidenceIds;
      result.cells = { ...result.cells, engine: textValue(guide.engine, { brandId: guide.engine }), format: textValue(format), status: textValue('مسیر مستند'), condition: guide.conditions.length ? textValue(guide.conditions.join('؛ ')) : missing, hardware: guide.instructions ? textValue(guide.instructions) : missing, source: textValue('راهنمای همین مدل', { href: guide.href }) };
      result.facets = { engine: textValue(guide.engine), task: textValue(task), format: textValue(format), status: textValue('documented-route'), deployment: textValue(local ? 'local' : 'service') };
      result.details = { ...(guide.instructions ? { scope: textValue(guide.instructions) } : {}), ...(guide.conditions.length ? { condition: textValue(guide.conditions.join('؛ ')) } : {}), ...(guide.code ? { command: textValue(guide.code, { copyText: guide.code }) } : {}) };
      result.searchText += ` ${guide.engine} ${format} ${task}`;
      added.push(result);
    }
  }
  return [...existing, ...added];
}

export function performanceRows(repository: LlmGuideRepository, group: string, metric: string): LlmViewRow[] {
  return research.performance.filter(item => (!group || item.publicationGroup === group) && item.metrics[metric] !== undefined).map(item => {
    const definition = performanceMetrics[metric];
    if (!definition) throw new Error(`Unknown performance metric: ${metric}`);
    const result = row(repository, item.id, item.modelRepository?.split('/')[1] ?? item.modelLabel ?? '', item.modelRepository, item.sourceIds);
    result.sortGroup = `${item.publicationGroup}:${metric}`;
    result.cells = { ...result.cells, engine: textValue([item.engine, item.engineVersion ?? item.engineRevision].filter(Boolean).join(' '), { brandId: item.engine }), hardware: textValue(`${faNumber(item.gpuCount)} × ${item.hardwareLabel}`, { brandId: 'nvidia' }), metric: textValue(definition.label), value: number(item.metrics[metric], definition.unit), ttft: item.metrics.meanTtftMs !== undefined ? number(item.metrics.meanTtftMs / 1000, 'ثانیه') : missing, format: textValue(quantLabel(item.weightFormat)), conditions: textValue(performanceGroups[item.publicationGroup].note), source: source(item.sourceIds) };
    result.facets = { engine: textValue(item.engine), format: textValue(item.weightFormat), hardware: textValue(item.hardwareLabel) };
    result.details = { group: textValue(performanceGroups[item.publicationGroup].label), scope: textValue(performanceGroups[item.publicationGroup].note), ...(item.servingCommandAsPublished ? { command: textValue(item.servingCommandAsPublished, { copyText: item.servingCommandAsPublished }) } : {}), ...(item.sourceLocator ? { locator: textValue(item.sourceLocator) } : {}), ...(item.engineRevisionUrl ? { revision: textValue(item.engineRevision ?? 'نسخهٔ ساخت', { href: item.engineRevisionUrl }) } : {}) };
    result.details.protocol = textValue(Object.entries(item.protocol).map(([key, value]) => `${protocolLabels[key] ?? key}: ${typeof value === 'number' ? faNumber(value, 0) : value}`).join('\n'));
    const otherMetricLabels: Record<string,string> = { successfulRequests: 'درخواست موفق', durationSeconds: 'مدت آزمون؛ ثانیه', totalInputTokens: 'کل توکن ورودی', totalOutputTokens: 'کل توکن خروجی', observedPeakConcurrency: 'اوج درخواست فعال؛ بار آزمون، نه ظرفیت SLA', prefillReportedPlusMinus: '± پردازش ورودی طبق گزارش', decodeReportedPlusMinus: '± تولید خروجی طبق گزارش', reportedGpuMemoryMB: 'حافظهٔ GPU؛ MB عین منبع', reportedMemoryGB: 'حافظهٔ گزارش‌شده؛ GB', inputTokensPerSecond: 'توکن ورودی/ثانیه' };
    result.details.metrics = textValue(Object.entries(item.metrics).map(([key, value]) => `${performanceMetrics[key]?.label ?? otherMetricLabels[key] ?? key}: ${faNumber(value)} ${performanceMetrics[key]?.unit ?? ''}`).join('\n'));
    if (item.artifactName) result.details.artifact = textValue(item.artifactName);
    if (item.reporter) result.details.reporter = textValue(item.reporter);
    if (item.flashAttention !== undefined || item.gpuLayers !== undefined) result.details.optimizations = textValue([item.flashAttention !== undefined ? `Flash Attention: ${item.flashAttention ? 'فعال' : 'غیرفعال'}` : '', item.gpuLayers !== undefined ? `پارامتر لایه‌های GPU: ${faNumber(item.gpuLayers)}` : ''].filter(Boolean).join('؛ '));
    if (item.weightInitialization) result.details.weights = textValue('وزن تصادفی؛ مدل آموزش‌دیده نیست.');
    if (item.metrics.reportedGpuMemoryMB !== undefined) result.details.memory = number(item.metrics.reportedGpuMemoryMB, 'MB', `${faNumber(item.metrics.reportedGpuMemoryMB)} MB؛ واحد عین منبع، تبدیل به GiB نشده`);
    if (item.metrics.reportedMemoryGB !== undefined) result.details.memory = number(item.metrics.reportedMemoryGB, 'GB');
    result.searchText += ` ${item.engine} ${item.hardwareLabel} ${item.weightFormat}`;
    result.comparison.dimensions = { group: textValue(item.publicationGroup), metric: textValue(metric), unit: textValue(definition.unit) };
    return result;
  });
}

export function researchView(repository: LlmGuideRepository, id: LlmViewId, controls: ResearchControls): { config: LlmViewConfig; rows: LlmViewRow[] } {
  const base = llmViewConfigs.find(view => view.id === id)!;
  let config: LlmViewConfig = { ...base, layoutKey: id === 'hardware-feasibility' ? [controls.method,...controls.hardwareIds,...controls.ram].join(':') : id === 'deployment-compatibility' ? controls.deploymentMode : id, compact: true, hideEmptyColumns: true, matrixColumns: undefined, optionalColumns: [], presets: base.presets?.map(preset => ({ ...preset, selections: {} })), filters: [], detailColumns: [], defaultColumns: [] };
  let rows: LlmViewRow[] = [];
  if (id === 'hardware-feasibility') {
    rows = memoryRows(repository, controls);
    config.description = controls.method === 'gpu' || controls.method === 'cpu' ? 'حافظهٔ لازم برای وزن‌ها، KV و اجرای مدل با تنظیمات انتخاب‌شده.' : 'گزارش حافظهٔ ناشر، با روش و مدل مشخص؛ مستقل از محاسبهٔ GGUF.';
    config.defaultColumns = controls.method === 'gpu' || controls.method === 'cpu' ? [...cols(['model', 'مدل'], ['quant', 'نسخهٔ وزن']), numericCol('budget', controls.method === 'cpu' ? 'RAM مورد نیاز' : 'حافظهٔ لازم با یک GPU'), numericCol('weight', 'وزن'), numericCol('kv', 'KV')] : [...cols(['model', 'مدل'], ['method', 'روش'], ['hardware', 'سخت‌افزار گزارش']), numericCol('budget', 'حافظهٔ اعلامی'), ...cols(['condition', 'شرط مهم'], ['source', 'منبع'])];
    config.matrixColumns = controls.method === 'gpu' ? research.hardware.filter(item => controls.hardwareIds.includes(item.id)).map(item => ({ id: item.id, label: item.name })) : controls.method === 'cpu' ? controls.ram.map(ram => ({ id: `ram-${ram}`, label: `${faNumber(ram)} GiB RAM` })) : undefined;
    config.filters = controls.method === 'gpu' || controls.method === 'cpu' ? [selectFilter('quant', 'نسخهٔ وزن', [['Q4_K_M', 'Q4_K_M'], ['Q8_0', 'Q8_0'], ...(controls.method === 'cpu' ? [['FP32', 'FP32 · Transformers'] as [string, string]] : [])]), { id: 'budget', label: 'حافظهٔ مورد نیاز', canonicalUnit: 'GiB', control: 'number-range', level: 'advanced' }] : [];
    config.detailColumns = cols(['method', 'روش'], ['scope', 'روش برآورد'], ['workload', 'بار کاری'], ['reserve', 'ذخیرهٔ اجرایی'], ['limit', 'حداکثر طول متن فایل'], ['architecture', 'ورودی‌های معماری در محاسبه'], ['architecture-basis', 'مبنای مشخصات معماری'], ['authority', 'ناشر فایل'], ['files', 'فایل‌های وزن'], ['revision', 'نسخهٔ مخزن فایل'], ['formula', 'فرمول KV'], ['dependencies', 'وابستگی‌ها'], ['reported-on', 'ماه انتشار گزارش']);
    if (controls.method === 'weights') {
      config.title = 'اندازهٔ فایل وزن و ظرفیت کارت‌ها';
      config.description = 'حجم فایل نسخهٔ اصلی و کوانت‌های منتخب؛ فضای باقی‌مانده پس از وزن، تأیید اجرای مدل نیست.';
      config.defaultColumns = [...cols(['model','مدل'],['quant','قالب / کوانت']), numericCol('weight','اندازهٔ فایل وزن'), ...cols(['condition','حافظهٔ تکمیلی'],['source','دریافت فایل'])];
      config.matrixColumns = research.hardware.filter(item => controls.hardwareIds.includes(item.id)).map(item => ({ id: item.id, label: item.name }));
      config.filters = [selectFilter('quant','قالب / کوانت',uniqueOptions(rows.map(row => (row.facets.quant as Known).display))), { id: 'weight', label: 'اندازهٔ فایل وزن', control: 'number-range', level: 'advanced', canonicalUnit: 'GiB' }];
      config.detailColumns = cols(['scope','دامنهٔ اندازه'],['files','فایل‌ها'],['revision','نسخهٔ فایل']);
    }
  } else if (id === 'deployment-compatibility') {
    rows = compatibilityRows(repository, controls.deploymentMode === 'kernels');
    config.title = controls.deploymentMode === 'kernels' ? 'پشتیبانی کرنل‌های کوانت' : 'سازگاری مدل و مسیر اجرا';
    config.description = 'مسیر مستند و اجرای گزارش‌شده جدا هستند؛ پشتیبانی موتور به معنی سازگاری همهٔ فایل‌های یک خانواده نیست.';
    config.defaultColumns = cols(['model', controls.deploymentMode === 'kernels' ? 'پیاده‌سازی' : 'مدل'], ['engine', 'موتور و نسخه'], ...(controls.deploymentMode === 'kernels' ? [['architecture', 'معماری GPU'] as [string, string]] : [['format', 'قالب / روش'] as [string, string], ['hardware', 'مسیر / سخت‌افزار'] as [string, string]]), ['status', 'مبنای سازگاری'], ['condition', 'شرط مهم'], ['source', 'منبع']);
    config.filters = [selectFilter('engine', 'موتور', uniqueOptions(rows.map(row => (row.facets.engine as Known).display)))];
    config.filters.push(...(controls.deploymentMode === 'kernels' ? [selectFilter('architecture', 'معماری GPU', uniqueOptions(research.kernels.map(item => item.architecture))), selectFilter('status', 'پشتیبانی', [['supported', 'پشتیبانی‌شده'], ['unsupported', 'پشتیبانی‌نشده']])] : [selectFilter('task', 'وظیفه', [['generation', 'تولید متن'], ['embedding', 'بردارسازی'], ['reranking', 'بازرتبه‌بندی'], ['classification', 'دسته‌بندی / رمزگذار']]), selectFilter('format', 'قالب فایل', [['GGUF','GGUF'],['safetensors','safetensors'],['checkpoint','وزن متناسب موتور'],['Ollama package','بستهٔ Ollama']], true), selectFilter('deployment', 'نوع اجرا', [['local','محلی / سبک'],['service','سرویس / کتابخانه']], true), selectFilter('status', 'نوع شاهد', [['documented-route','مسیر مستند'],['published-run','اجرای گزارش‌شده']], true)]));
    config.detailColumns = cols(['scope', 'دامنهٔ مسیر'], ['condition', 'شروط'], ['command', 'فرمان گزارش‌شده در منبع']);
  } else if (id === 'benchmarks') {
    rows = performanceRows(repository, controls.group, controls.metric);
    config.title = 'کارایی در آزمون‌های منتشرشده'; config.description = performanceGroups[controls.group]?.note ?? 'گروه‌های گزارش مستقل‌اند؛ مرتب‌سازی عددی در هر گروه انجام می‌شود.';
    config.defaultColumns = [...cols(['model', 'مدل / معماری'], ['engine', 'موتور و نسخه'], ['hardware', 'سخت‌افزار'], ['format', 'قالب وزن'], ['metric', 'معیار']), numericCol('value', 'نتیجه'), numericCol('ttft', 'اولین توکن · میانگین'), ...cols(['source', 'منبع'])];
    config.filters = [selectFilter('engine', 'موتور', uniqueOptions(rows.map(row => (row.facets.engine as Known).display))), selectFilter('hardware', 'سخت‌افزار', uniqueOptions(rows.map(row => (row.facets.hardware as Known).display))), selectFilter('format', 'قالب وزن', [...new Set(rows.map(row => (row.facets.format as Known).display))].map(value => [value, quantLabel(value)]), true)];
    config.detailColumns = cols(['group','گروه گزارش'], ['scope','دامنهٔ مقایسه'], ['artifact','فایل نام‌گذاری‌شده در گزارش'], ['reporter','گزارش‌دهنده'], ['protocol','پروتکل و بار کاری'], ['optimizations','تنظیمات اجرا'], ['metrics','معیارها و آمار همین آزمون'], ['memory','حافظهٔ گزارش‌شده'], ['weights','وزن‌ها'], ['command','فرمان اجرای منبع'], ['revision','نسخهٔ ساخت'], ['locator','محل نتیجه در گزارش']);
    config.comparison = { ...base.comparison, dimensionLabels: { group: 'گروه گزارش', metric: 'معیار', unit: 'واحد' }, controlledAxes: [], calculationRequiredDimensions: ['group', 'metric', 'unit'], solutionSharedDimensions: ['group', 'metric', 'unit'] };
  }
  if (controls.model && !(id === 'deployment-compatibility' && controls.deploymentMode === 'kernels')) rows = rows.filter(row => row.modelId === controls.model);
  return { config, rows };
}

/** Preserve the four established tables and enrich only their relevant cells. */
export function enrichExistingRows(repository: LlmGuideRepository, all: Record<LlmViewId, LlmViewRow[]>) {
  const rows = { ...all };
  rows['specialized-models'] = all['specialized-models'].map(item => {
    const extra = research.specialized.find(extra => researchModel(repository, extra.modelRepository)?.id === item.modelId);
    if (!extra) {
      const model = repository.models.find(model => model.id === item.modelId);
      const dimension = model?.specializedSpecs?.embeddingDimensions;
      if (model?.kind === 'embedding' && dimension?.state === 'known') {
        const gib = dimension.value * 4 * 1_000_000 / 2 ** 30;
        return { ...item, sourceIds: [...new Set([...item.sourceIds, ...(dimension.evidenceIds ?? [])])], cells: { ...item.cells, 'vector-memory': number(gib, 'GiB', `${faNumber(gib)} GiB / یک میلیون سند`) }, details: { ...item.details, 'vector-scope': textValue(`${dimension.value} بُعد × ۴ بایت FP32 × یک میلیون بردار؛ مستقل از مدل و ANN. در صورت کاهش بُعد، اندازه دوباره محاسبه شود.`) } };
      }
      return { ...item, cells: { ...item.cells, 'vector-memory': textValue('بردار ثابت ذخیره نمی‌کند') }, details: { ...item.details, 'vector-scope': textValue('خروجی این مسیر امتیاز زوج یا بازنمایی وظیفه است؛ حافظهٔ ورودی و batch جدا محاسبه می‌شود.') } };
    }
    return { ...item, sourceIds: [...new Set([...item.sourceIds, ...evidenceIds(extra.sourceIds)])], cells: { ...item.cells, 'vector-memory': extra.denseFloat32VectorGiBPerMillionDocuments !== undefined ? number(extra.denseFloat32VectorGiBPerMillionDocuments, 'GiB', `${faNumber(extra.denseFloat32VectorGiBPerMillionDocuments)} GiB / یک میلیون سند`) : textValue('بردار ثابت ذخیره نمی‌کند') }, details: { ...item.details, 'vector-scope': textValue('فقط بردار خام FP32؛ ساختار ANN، فراداده، وزن مدل و حافظهٔ اجرا جدا هستند.') } };
  });
  rows['software-products'] = all['software-products'].map(item => {
    const extra = research.software.find(extra => item.label.toLowerCase().includes(extra.name.toLowerCase()) || (extra.name === 'Text Embeddings Inference' && /text.*embeddings/i.test(item.label)));
    if (!extra) return { ...item, cells: { ...item.cells, 'research-use': item.cells.scenario, 'research-benefit': item.cells['service-features'], 'research-condition': item.cells['backend-summary'] } };
    return { ...item, cells: { ...item.cells, 'research-use': textValue(extra.startingUseFa), 'research-benefit': textValue(extra.usefulFeatureFa), 'research-condition': textValue(extra.selectionConditionFa.replace('۱۴B', '۱۴ میلیاردی').replace('۳۲B', '۳۲ میلیاردی')) }, details: { ...item.details, 'research-version': textValue(extra.versionScope) }, sourceIds: [...new Set([...item.sourceIds, ...evidenceIds(extra.sourceIds)])] };
  });
  for (const id of ['model-catalog', 'model-suitability', 'specialized-models'] as const) rows[id] = rows[id].map(item => {
    const scores = repository.publishedEvaluations.filter(score => score.modelVersionId === item.modelId);
    // Choose a useful, scoped example, never the largest raw score across tasks.
    const selected = scores.find(score => score.language === 'fa' && score.settings.representation === 'Dense')
      ?? scores.find(score => score.language === 'fa') ?? scores[0];
    let quality: ViewValue;
    if (selected) {
      const modes: Record<string, string> = { thinking: 'با تفکر افزوده', 'non-thinking': 'بدون تفکر افزوده', low: 'تلاش کم', medium: 'تلاش متوسط', high: 'تلاش زیاد', max: 'تلاش حداکثر' };
      const metric = selected.metric === 'published score' ? 'امتیاز' : selected.metric === 'published retrieval score' ? 'امتیاز بازیابی' : selected.metric;
      const conditions = [selected.language === 'fa' ? 'فارسی' : selected.language,
        selected.mode ? modes[selected.mode] ?? selected.mode : undefined,
        selected.settings.representation ? String(selected.settings.representation) : undefined,
        selected.settings.embeddingDimensions ? `${faNumber(Number(selected.settings.embeddingDimensions))} بُعد` : undefined,
        selected.settings.candidateCount ? `${faNumber(Number(selected.settings.candidateCount))} نامزد` : undefined,
        selected.settings.retrievalModel ? String(selected.settings.retrievalModel) : undefined,
        selected.settings.sourceScale ? String(selected.settings.sourceScale) : undefined].filter(Boolean);
      quality = textValue(`${selected.benchmark} · ${metric}: ${faNumber(selected.value)}${selected.unit === 'percent' ? '٪' : ''}`, {
        caveat: conditions.join('؛ ') || undefined, badge: `${faNumber(scores.length)} نتیجه؛ جزئیات و منابع`, evidenceIds: selected.evidenceIds
      });
    } else {
      const model = repository.models.find(model => model.id === item.modelId);
      quality = textValue(model?.exactName === 'ModernBERT-base'
        ? 'پایهٔ آموزش تخصصی؛ نتایج مقاله پس از آموزش روی وظیفه'
        : model?.exactName === 'Mistral-7B-Instruct-v0.3' ? 'دستورپذیری و فراخوانی ابزار' : 'کارت مدل و گزارش فنی', { href: item.modelUrl });
    }
    return { ...item, cells: { ...item.cells, 'published-quality': quality } };
  });
  return rows;
}

export function enrichExistingConfig(config: LlmViewConfig): LlmViewConfig {
  if (config.id === 'software-products') return { ...config,
    defaultColumns: [config.defaultColumns[0], config.defaultColumns[1], ...cols(['research-use','برای چه کاری؟'], ['research-benefit','مزیت کاربردی'], ['research-condition','شرط انتخاب'], ['start-docs','شروع کار'])],
    optionalColumns: [...(config.optionalColumns ?? []), ...config.defaultColumns.filter(column => ['platform','backend-summary'].includes(column.key))],
    detailColumns: [...config.detailColumns, ...cols(['research-version','نسخهٔ مستندات راهنمای انتخاب'])]
  };
  if (config.id === 'specialized-models') return { ...config,
    defaultColumns: [...config.defaultColumns.filter(column => !['features','downloads'].includes(column.key)), ...cols(['published-quality','کیفیت منتشرشده']), numericCol('vector-memory', 'حافظهٔ بردارهای خام'), config.defaultColumns.at(-1)!],
    optionalColumns: [...(config.optionalColumns ?? []), ...cols(['features','ویژگی کاربردی'])],
    detailColumns: [...config.detailColumns, ...cols(['vector-scope','دامنهٔ حافظهٔ بردارها'])]
  };
  if (config.id === 'model-catalog' || config.id === 'model-suitability') return { ...config, optionalColumns: [...(config.optionalColumns ?? []), ...cols(['published-quality','آزمون‌های کیفیت'])] };
  return config;
}
