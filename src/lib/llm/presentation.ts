import type { ViewValue } from './views';
import type { ModelProfile, ModelUseGuidance } from './schema';
import type { LlmI18n } from './i18n/runtime';

/** Text and formatting are edition-scoped; no mutable global locale. */
export function createLlmPresentation(i18n: LlmI18n) {
const { t, locale, numberFormat } = i18n;

const textKey = (value: string) => value.trim().replace(/[.؛،\s]+$/u, '');
function profileUseCards(profile: ModelProfile, uses: ModelUseGuidance[]) {
  const seen = new Set([textKey(profile.introduction), textKey(profile.roleSummary)]);
  return uses.map(use => {
    const key = textKey(use.description);
    const description = seen.has(key) || key === textKey(use.summary) ? undefined : use.description;
    seen.add(key);
    return { ...use, description };
  });
}
function profileRunCards(profile: ModelProfile) {
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
    shared: shared.map(item => ({ text: item.text, engines: [...new Set(item.indices.map(index => profile.runGuides[index].engineLabel ?? profile.runGuides[index].engine))] }))
  };
}
const labels: Record<string, string> = {
  generative: t('presentation.0077'), embedding: t('presentation.0078'), reranker: t('presentation.0079'), 'encoder-classifier': t('presentation.0080'),
  'image-generation': t('model-kind.image-generation'),
  'vision-language': t('presentation.0081'), other: t('presentation.0082'), dense: t('presentation.0083'), moe: t('presentation.0084'), hybrid: t('presentation.0085'),
  base: t('presentation.0086'), instruct: t('presentation.0087'), reasoning: t('presentation.0088'), distilled: t('presentation.0089'),
  text: t('presentation.0090'), image: t('presentation.0091'), audio: t('presentation.0092'), video: t('presentation.0093'), score: t('presentation.0094'), 'similarity-score': t('presentation.0095'), archived: t('presentation.0096'), 'structured-data': t('presentation.0097'),
  'inference-engine-library': t('presentation.0098'), 'api-server': t('presentation.0099'),
  'model-manager': t('presentation.0100'), gateway: t('presentation.0101'), 'user-interface': t('presentation.0102'), 'deployment-manager': t('presentation.0103'),
  desktop: t('presentation.0104'), workstation: t('presentation.0105'), server: t('presentation.0106'), container: t('presentation.0107'), kubernetes: 'Kubernetes',
  'cloud-service': t('presentation.0108'), 'offline-air-gapped': t('presentation.0109'), local: t('presentation.0110'), cloud: t('presentation.0111'),
  active: t('presentation.0112'), maintenance: t('presentation.0113'), deprecated: t('presentation.0114'), unknown: t('presentation.0115'),
  available: t('presentation.0116'), announced: t('presentation.0117'), withdrawn: t('presentation.0118'), 'needs-review': t('presentation.0119'),
  supported: t('presentation.0120'), conditional: t('presentation.0121'), 'not-supported': t('presentation.0122'), 'not-reviewed': t('presentation.0123'),
  'not-applicable': t('presentation.0124'), native: t('presentation.0125'), plugin: t('presentation.0126'), 'external-component': t('presentation.0127'),
  'declared-capability': t('presentation.0128'), 'measured-success': t('presentation.0129'),
  'editorial-recommendation': t('presentation.0130'), 'insufficient-evidence': t('presentation.0131'),
  meets: t('presentation.0132'), 'partially-meets': t('presentation.0133'), 'does-not-meet': t('presentation.0134'),
  'task-generation': t('presentation.0135'), 'task-embedding': t('presentation.0136'), 'task-reranking': t('presentation.0137'), 'task-classification': t('presentation.0138'),
  queueing: t('presentation.0139'), concurrency: t('presentation.0140'), 'continuous-batching': t('presentation.0141'),
  'admission-control': t('presentation.0142'), 'model-load-unload': t('presentation.0143'), 'multi-model': t('presentation.0144'),
  'cold-start-control': t('presentation.0145'), 'prefix-caching': t('presentation.0146'), 'speculative-decoding': t('presentation.0147'),
  'cpu-gpu-offload': t('presentation.0148'), 'kv-cache-offload': t('presentation.0149'), 'layer-wise-loading': t('presentation.0150'),
  'multi-gpu-sharding': t('presentation.0151'), 'independent-replicas': t('presentation.0152'), streaming: t('presentation.0153'),
  'structured-output': t('presentation.0154'), 'tool-use': t('presentation.0155'), 'reasoning-control': t('presentation.0156'),
  'model-template-selection': t('presentation.0157'), 'parser-selection': t('presentation.0158'), monitoring: t('presentation.0159'),
  metrics: t('presentation.0160'), 'health-check': t('presentation.0161'), authentication: t('presentation.0162'), 'rate-limiting': t('presentation.0163'),
  'publisher-report': t('presentation.0164'), 'third-party-report': t('presentation.0165'), 'documented-specification': t('presentation.0166'), 'direct-measurement': t('presentation.0167'),
  'calculated-from-specifications': t('presentation.0168'), 'editorial-analysis': t('presentation.0169'),
  'independently-evaluated': t('presentation.0170'), 'publisher-claimed': t('presentation.0171'), 'not-evaluated': t('presentation.0172')
};
const llmLabel = (value: string) => labels[value] ?? value;
function sourceDateRange(value: string) {
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
function sourceDateValue(value?: string, evidenceIds: readonly string[] = []): ViewValue {
  const range = value ? sourceDateRange(value) : undefined;
  if (!range || !value) return { state: 'unknown' };
  // Gregorian month/year is retained for partial dates; converting it into a
  // single Persian month would falsely increase the source's precision.
  const display = locale === 'fa' ? value.replace(/\d/g, digit => '۰۱۲۳۴۵۶۷۸۹'[Number(digit)]).replaceAll('-', '/') : value;
  return { state: 'known', display: t('presentation.0173', display), raw: value, dateRange: range,
    note: range.precision === 'day' ? undefined : t('presentation.0176', range.precision === 'month' ? t('presentation.0174') : t('presentation.0175')), evidenceIds: [...evidenceIds] };
}
return { profileUseCards, profileRunCards, llmLabel, sourceDateRange, sourceDateValue };
}
