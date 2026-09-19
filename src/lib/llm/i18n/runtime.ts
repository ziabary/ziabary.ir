import recordBindings from '../../../../data/llm/locales/record-bindings.json';
export type LlmLocale = 'fa' | 'en' | 'es';
export interface LlmI18n {
  locale: LlmLocale;
  numberFormat: string;
  direction: 'rtl' | 'ltr';
  t: (id: string, ...values: unknown[]) => string;
  records: <T>(namespace: string, data: T) => T;
}
export type RecordTranslations = Record<string, Record<string, string>>;
/** Field paths belong to entity IDs, never to text used as a lookup key. */
export function createLlmI18n(locale: LlmLocale, messages: Record<string, string>, records: RecordTranslations = {}): LlmI18n {
  return {
    locale, numberFormat: locale === 'fa' ? 'fa-IR' : locale === 'es' ? 'es' : 'en', direction: locale === 'fa' ? 'rtl' : 'ltr',
    t(id, ...values) {
      const template = messages[id];
      if (template === undefined) throw new Error(`Missing LLM translation: ${locale}/${id}`);
      return template.replace(/\{(\d+)\}/g, (_, index) => String(values[Number(index)] ?? ''));
    },
    records<T>(namespace: string, data: T): T {
      if (locale === 'fa') return data;
      const copy = structuredClone(data);
      const localize = (entity: Record<string, unknown>, entityId: string) => {
        const fields = records[namespace + '/' + entityId];
        if (!fields) return;
        for (const [path, value] of Object.entries(fields)) {
          const segments = path.split('/');
          let cursor: any = entity;
          for (const segment of segments.slice(0, -1)) cursor = cursor?.[segment];
          if (cursor === undefined) throw new Error(`Stale LLM translation field ${entityId}/${path}`);
          cursor[segments.at(-1)!] = value;
        }
      };
      if (Array.isArray(copy)) for (const entity of copy) localize(entity, entity.id);
      else if (copy && typeof copy === 'object') localize(copy as Record<string, unknown>, 'root');
      return copy;
    }
  };
}

export function resolveRecordTranslations(texts: Record<string, string>): RecordTranslations {
  return Object.fromEntries(Object.entries(recordBindings).map(([entity, bindings]) => [entity, Object.fromEntries(Object.entries(bindings).map(([path, key]) => {
    const text = texts[key];
    if (text === undefined) throw new Error(`Missing LLM editorial translation ${entity}/${path}: ${key}`);
    return [path, text];
  }))]));
}
export function localizeLlmRepository<T extends object>(data: T, i18n: LlmI18n): T {
  return Object.fromEntries(Object.entries(data).map(([collection, rows]) => [collection, Array.isArray(rows) ? i18n.records(`repository.${collection}`, rows) : rows])) as T;
}
