import editorialContent from '../../../content/guides/llm-editions.json';
import { resolveRecordTranslations } from './i18n/runtime';
import type { LlmLocale } from './i18n/runtime';
import { llmGuideCollection } from './collection';
export * from './edition-manifest';
import { llmEditionSlugs } from './edition-manifest';
const editorial = editorialContent;
export function llmCollection(locale: LlmLocale) {
  return { ...llmGuideCollection, ...(locale === 'fa' ? {} : editorial[locale]), articleCount: llmEditionSlugs(locale).length };
}
export async function loadLlmTranslations(locale: LlmLocale) {
  if (locale === 'en') return { messages: (await import('../../../data/llm/locales/messages.en.json')).default, records: resolveRecordTranslations((await import('../../../data/llm/locales/records.en.json')).default) };
  if (locale === 'es') return { messages: (await import('../../../data/llm/locales/messages.es.json')).default, records: resolveRecordTranslations((await import('../../../data/llm/locales/records.es.json')).default) };
  return { messages: (await import('../../../data/llm/locales/messages.fa.json')).default, records: {} };
}

/** Guide routes carry metadata/translations only; chapter bodies load on opening. */
export async function loadLlmEdition(locale: LlmLocale) {
  return { locale, ...await loadLlmTranslations(locale) };
}
