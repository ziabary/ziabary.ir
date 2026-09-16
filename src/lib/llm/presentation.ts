import type { ViewValue } from './views';
import type { ModelProfile, ModelUseGuidance } from './schema';

const textKey = (value: string) => value.trim().replace(/[.؛،\s]+$/u, '');

/** A model introduction is shown once, not repeated for every use of that model. */
export function profileUseCards(profile: ModelProfile, uses: ModelUseGuidance[]) {
  const seen = new Set([textKey(profile.introduction), textKey(profile.roleSummary)]);
  return uses.map(use => {
    const key = textKey(use.description);
    const description = seen.has(key) || key === textKey(use.summary) ? undefined : use.description;
    seen.add(key);
    return { ...use, description };
  });
}

/** Repeated run conditions retain the exact engine scope in a single shared note. */
export function profileRunCards(profile: ModelProfile) {
  const occurrences = new Map<string, { text: string; indices: number[] }>();
  profile.runGuides.forEach((guide, index) => {
    for (const text of new Set(guide.conditions)) {
      const key = textKey(text);
      const entry = occurrences.get(key) ?? { text, indices: [] };
      entry.indices.push(index);
      occurrences.set(key, entry);
    }
  });
  const shared = [...occurrences.values()].filter(item => item.indices.length > 1);
  const sharedKeys = new Set(shared.map(item => textKey(item.text)));
  return {
    guides: profile.runGuides.map(guide => ({ ...guide, conditions: guide.conditions.filter(text => !sharedKeys.has(textKey(text))) })),
    shared: shared.map(item => ({ text: item.text, engines: [...new Set(item.indices.map(index => profile.runGuides[index].engine))] }))
  };
}

const labels: Record<string, string> = {
  generative: 'مولد', embedding: 'بردارساز', reranker: 'بازرتبه‌بند', 'encoder-classifier': 'رمزگذار / دسته‌بند',
  'vision-language': 'بینایی و زبان', other: 'سایر', dense: 'متراکم', moe: 'ترکیب متخصصان (MoE)', hybrid: 'ترکیبی',
  base: 'پایه', instruct: 'دستورپذیر', reasoning: 'استدلالی', distilled: 'تقطیرشده',
  text: 'متن', image: 'تصویر', audio: 'صوت', video: 'ویدیو', score: 'امتیاز', 'similarity-score': 'امتیاز شباهت', archived: 'آرشیوشده', 'structured-data': 'دادهٔ ساختاریافته',
  'inference-engine-library': 'موتور / کتابخانهٔ استنتاج', 'api-server': 'سرور API',
  'model-manager': 'مدیر مدل', gateway: 'درگاه مدل‌ها', 'user-interface': 'رابط گفتگو', 'deployment-manager': 'مدیر استقرار',
  desktop: 'رایانهٔ شخصی', workstation: 'ایستگاه کاری', server: 'سرور', container: 'کانتینر', kubernetes: 'Kubernetes',
  'cloud-service': 'سرویس ابری', 'offline-air-gapped': 'محیط بدون اتصال', local: 'محلی', cloud: 'ابری',
  active: 'فعال', maintenance: 'نگه‌داری', deprecated: 'منسوخ', unknown: 'نامعلوم',
  available: 'منتشرشده', announced: 'معرفی‌شده', withdrawn: 'جمع‌آوری‌شده', 'needs-review': 'نیازمند بازبینی',
  supported: 'پشتیبانی‌شده', conditional: 'مشروط', 'not-supported': 'پشتیبانی‌نشده', 'not-reviewed': 'بررسی‌نشده',
  'not-applicable': 'نامرتبط', native: 'داخلی', plugin: 'با افزونه', 'external-component': 'با جزء بیرونی',
  'declared-capability': 'معرفی سازنده', 'measured-success': 'نتیجهٔ آزمون',
  'editorial-recommendation': 'پیشنهاد راهنما', 'insufficient-evidence': 'شاهد کافی ثبت نشده',
  meets: 'مطابق معیار آزمون', 'partially-meets': 'تا حدی مطابق معیار آزمون', 'does-not-meet': 'پایین‌تر از معیار آزمون',
  'task-generation': 'تولید متن', 'task-embedding': 'ساخت embedding', 'task-reranking': 'بازرتبه‌بندی', 'task-classification': 'دسته‌بندی',
  queueing: 'صف درخواست', concurrency: 'درخواست‌های هم‌زمان', 'continuous-batching': 'بسته‌بندی پیوستهٔ درخواست‌ها',
  'admission-control': 'کنترل پذیرش بار', 'model-load-unload': 'بارگذاری و تخلیهٔ مدل', 'multi-model': 'مدیریت چند مدل',
  'cold-start-control': 'کنترل شروع سرد', 'prefix-caching': 'کش پیشوند', 'speculative-decoding': 'رمزگشایی حدسی',
  'cpu-gpu-offload': 'انتقال بخشی از اجرا به CPU', 'kv-cache-offload': 'انتقال KV cache', 'layer-wise-loading': 'بارگذاری لایه‌به‌لایه',
  'multi-gpu-sharding': 'تقسیم مدل میان GPUها', 'independent-replicas': 'نسخه‌های اجرایی مستقل', streaming: 'خروجی جریانی',
  'structured-output': 'خروجی ساختاریافته', 'tool-use': 'فراخوانی ابزار', 'reasoning-control': 'کنترل حالت استدلال',
  'model-template-selection': 'انتخاب قالب پیام', 'parser-selection': 'انتخاب تجزیه‌گر', monitoring: 'پایش',
  metrics: 'سنجه‌های سرویس', 'health-check': 'بررسی سلامت', authentication: 'احراز هویت', 'rate-limiting': 'محدودیت نرخ',
  'publisher-report': 'گزارش ناشر', 'third-party-report': 'گزارش شخص ثالث', 'documented-specification': 'مستندات فنی', 'direct-measurement': 'اندازه‌گیری مستقیم',
  'calculated-from-specifications': 'محاسبه از مشخصات', 'editorial-analysis': 'تحلیل راهنما',
  'independently-evaluated': 'ارزیابی مستقل ثبت شده', 'publisher-claimed': 'اعلام ناشر', 'not-evaluated': 'ارزیابی ثبت نشده'
};
export const llmLabel = (value: string) => labels[value] ?? value;

/** Inclusive UTC bounds preserve the precision actually given by a source. */
export function sourceDateRange(value: string) {
  const match = /^(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?$/.exec(value);
  if (!match) return undefined;
  const year = Number(match[1]), month = Number(match[2] ?? 1), day = Number(match[3] ?? 1);
  const start = Date.UTC(year, month - 1, day);
  const date = new Date(start);
  if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) return undefined;
  const precision = match[3] ? 'day' : match[2] ? 'month' : 'year';
  const end = (precision === 'day' ? start + 86400000 : precision === 'month' ? Date.UTC(year, month, 1) : Date.UTC(year + 1, 0, 1)) - 1;
  return { start, end, precision } as const;
}

export function sourceDateValue(value?: string, evidenceIds: readonly string[] = []): ViewValue {
  const range = value ? sourceDateRange(value) : undefined;
  if (!range || !value) return { state: 'unknown' };
  // Gregorian month/year is retained for partial dates; converting it into a
  // single Persian month would falsely increase the source's precision.
  const display = value.replace(/\d/g, digit => '۰۱۲۳۴۵۶۷۸۹'[Number(digit)]).replaceAll('-', '/');
  return { state: 'known', display: `${display} میلادی`, raw: value, dateRange: range,
    note: range.precision === 'day' ? undefined : `دقت منبع: ${range.precision === 'month' ? 'ماه' : 'سال'}؛ روز مشخص نشده است.`, evidenceIds: [...evidenceIds] };
}
