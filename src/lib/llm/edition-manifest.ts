import llmTopicsContent from '../../../content/relationships/llm-topics.json';
import type { LlmLocale } from './i18n/runtime';
/** Manual editorial map. The general evaluation article is not a translation of the Persian specialist article. */
// Include articles that directly explain LLM concepts or inform model selection.
// Reading order: choice and evaluation → applications → memory and execution → capacity and cost.
// General security, confidentiality and infrastructure articles belong to their own collections.
// A missing edition stays absent; it must not silently load a Persian chapter.
export const llmTopics = llmTopicsContent as Array<{ id: string; fa: string | null; en: string | null; es: string | null }>;
export const llmBase = (locale: LlmLocale) => locale === 'fa' ? '' : `/${locale}`;
export const llmPath = (locale: LlmLocale) => `${llmBase(locale)}/guides/llm/`;
export const llmEditionSlugs = (locale: LlmLocale) => llmTopics.flatMap(topic => {
  const slug = topic[locale];
  return slug ? [slug] : [];
});
export function llmTopicSlug(slug: string, locale: LlmLocale) {
  return llmTopics.find(topic => Object.values(topic).includes(slug as never))?.[locale];
}
export const llmEditionPolicy = {
  fa: { targetLanguage: 'fa', locale: 'fa', direction: 'rtl' },
  en: { targetLanguage: 'en', locale: 'en', direction: 'ltr' },
  es: { targetLanguage: 'es', locale: 'es', direction: 'ltr' }
} as const;
