import type { PublishedEvaluation } from './schema';

type Locale = 'fa' | 'en' | 'es';
/** Presentation only: unknown values remain in the records and comparison rules. */
export function hasReportedValue(value: unknown): boolean {
  if (value === null || value === undefined) return false;
  if (typeof value !== 'string') return true; // Zero and false are real settings.
  return !/^(?:\s*|—|-|n\/?a|unknown|unspecified|not[- ]reported|not[- ]specified|not available|publisher-rating-method-unspecified|نامشخص|گزارش نشده|ثبت نشده|no informado|no especificado)$/i.test(value.trim());
}

export function evaluationMetricLabel(metric: string, locale: Locale): string {
  if (/^(?:(?:publisher[- ]reported|published)(?: retrieval)? score|score)$/i.test(metric)) {
    return { fa: 'امتیاز', en: 'Score', es: 'Puntuación' }[locale];
  }
  return metric;
}

export function evaluationUnitLabel(unit: string, locale: Locale): string {
  if (unit === 'percent') return '%';
  if (unit === 'score-points-0-100') return {fa:'از ۱۰۰',en:'/ 100',es:'/ 100'}[locale];
  if (['score','score-points'].includes(unit)) return {fa:'امتیاز',en:'points',es:'puntos'}[locale];
  return unit;
}

const settingLabels: Record<string, [string, string, string]> = {
  datasetConfig: ['زیرمجموعهٔ داده', 'Dataset configuration', 'Configuración de datos'],
  datasetSplit: ['بخش داده‌ها', 'Dataset split', 'Partición de datos'],
  datasetId: ['مجموعهٔ داده', 'Dataset', 'Conjunto de datos'],
  datasetRepository: ['مجموعهٔ داده', 'Dataset repository', 'Repositorio de datos'],
  datasetRevision: ['نسخهٔ داده‌ها', 'Dataset revision', 'Revisión de datos'],
  task: ['کاربرد آزمون', 'Task', 'Tarea'],
  harness: ['ابزار اجرای آزمون', 'Evaluation tool', 'Herramienta de evaluación'],
  harnessVersion: ['نسخهٔ ابزار آزمون', 'Evaluation tool version', 'Versión de la herramienta'],
  initialRetriever: ['مدل جست‌وجوی اولیه', 'Initial retriever', 'Recuperador inicial'],
  candidateCount: ['تعداد نتایج اولیه', 'Candidate count', 'Número de candidatos'],
  fewShot: ['تعداد مثال در ورودی', 'Few-shot examples', 'Ejemplos en la entrada'],
  applyChatTemplate: ['استفاده از قالب گفت‌وگو', 'Chat template applied', 'Plantilla de chat aplicada'],
  mode: ['حالت پاسخ', 'Response mode', 'Modo de respuesta'],
  modelRole: ['نقش مدل', 'Model role', 'Función del modelo'],
  pipelineRole: ['مرحلهٔ پردازش', 'Pipeline stage', 'Etapa de procesamiento'],
  testedContextTokens: ['تعداد توکن در آزمون', 'Tested context tokens', 'Tokens de contexto probados'],
  scoreScale: ['مقیاس امتیاز', 'Score scale', 'Escala de puntuación'],
  baselineLeaderboardSnapshot: ['تاریخ جدول مبنا', 'Baseline snapshot', 'Fecha de la tabla de referencia'],
  presencePenalty: ['جریمهٔ تکرار موضوع', 'Presence penalty', 'Penalización de presencia'],
  datasetSubsampleFraction: ['سهم داده‌های آزموده‌شده', 'Dataset sample fraction', 'Fracción de datos evaluada'],
  panAndScan: ['برش تصویر برای پردازش', 'Pan and scan', 'Recortes de imagen'],
  reportedVariant: ['گونهٔ مدل', 'Model variant', 'Variante del modelo'],
  scale: ['مقیاس', 'Scale', 'Escala'],
  sourceMetric: ['معیار آزمون', 'Metric', 'Métrica'],
  category: ['دستهٔ آزمون', 'Test category', 'Categoría de prueba'],
  setting: ['تنظیم آزمون', 'Test setting', 'Configuración de prueba'],
  evaluationAccess: ['روش دسترسی به مدل', 'Model access', 'Acceso al modelo'],
  editFormat: ['قالب ویرایش کد', 'Code edit format', 'Formato de edición de código'],
  reportingMethod: ['روش محاسبهٔ نتیجه', 'Reporting method', 'Método de cálculo'],
  maxInputTokens: ['حداکثر توکن ورودی', 'Maximum input tokens', 'Máximo de tokens de entrada'],
  maxSequenceLength: ['حداکثر طول متن', 'Maximum sequence length', 'Longitud máxima'],
  stage: ['مرحلهٔ آزمون', 'Test stage', 'Etapa de prueba'],
  samples: ['تعداد نمونه‌ها', 'Samples', 'Muestras'],
  chainOfThought: ['استفاده از زنجیرهٔ استدلال', 'Chain of thought', 'Cadena de razonamiento'],
  resultType: ['نوع نتیجه', 'Result type', 'Tipo de resultado'],
  dataset: ['داده‌های آزمون', 'Test data', 'Datos de prueba'],
  thinking: ['حالت تفکر', 'Thinking mode', 'Modo de razonamiento'],
  protocol: ['روش اجرای آزمون', 'Test protocol', 'Protocolo de prueba'],
  datasetCount: ['تعداد مجموعه‌های داده', 'Dataset count', 'Número de conjuntos de datos'],
  direction: ['جهت ترجمه', 'Translation direction', 'Dirección de traducción'],
  implementation: ['پیاده‌سازی', 'Implementation', 'Implementación'],
  maxFrames: ['حداکثر تعداد فریم', 'Maximum frames', 'Máximo de fotogramas']
};
export function evaluationSettingLabel(key: string, locale: Locale, fallback?: string): string {
  return settingLabels[key]?.[{fa:0,en:1,es:2}[locale]] ?? fallback ?? key;
}
const provenanceKeys = new Set(['scoreOrigin','protocolSourceId','sourceModelIndexName','hubMetricVerified','tableModelLabel','reportedModelColumn','reportedModelRow','modelColumn','table']);
export function reportedSettings(settings: Record<string, unknown>): [string, unknown][] {
  return Object.entries(settings).filter(([key,value]) => !provenanceKeys.has(key) && hasReportedValue(value));
}
export function hasNumericResult(result: PublishedEvaluation): boolean {
  return Number.isFinite(result.value) && hasReportedValue(result.benchmark);
}
