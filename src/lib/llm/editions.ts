import { resolveRecordTranslations } from './i18n/runtime';
import type { LlmLocale } from './i18n/runtime';
import { llmGuideCollection } from './collection';
export * from './edition-manifest';
import { llmEditionSlugs } from './edition-manifest';
const editorial = {
  en: { title: 'Choosing a language model: large or small?', subtitle: 'Compare models, inference software and memory requirements for your workload, with published results and practical guides.', eyebrow: 'Models and inference', imageAlt: 'Language models of different sizes connected to chat, coding and document applications', intro: 'A guide based on primary documentation, published results and explicit memory calculations.' },
  es: { title: 'Cómo elegir un modelo de lenguaje grande o pequeño', subtitle: 'Compara modelos, software de inferencia y requisitos de memoria según tu tarea, con resultados publicados y guías prácticas.', eyebrow: 'Modelos e inferencia', imageAlt: 'Modelos de lenguaje de distintos tamaños conectados a aplicaciones de conversación, programación y documentos', intro: 'Una guía basada en documentación primaria, resultados publicados y cálculos explícitos de memoria.' }
};
export function llmCollection(locale: LlmLocale) {
  return { ...llmGuideCollection, ...(locale === 'fa' ? {} : editorial[locale]), articleCount: llmEditionSlugs(locale).length };
}
export async function loadLlmTranslations(locale: LlmLocale) {
  if (locale === 'en') return { messages: (await import('../../../data/llm/locales/messages.en.json')).default, records: resolveRecordTranslations((await import('../../../data/llm/locales/records.en.json')).default) };
  if (locale === 'es') return { messages: (await import('../../../data/llm/locales/messages.es.json')).default, records: resolveRecordTranslations((await import('../../../data/llm/locales/records.es.json')).default) };
  return { messages: (await import('../../../data/llm/locales/messages.fa.json')).default, records: {} };
}

/** Published editions render their published chapters at build time; draft bodies stay behind preview. */
export async function loadLlmEdition(locale: LlmLocale) {
  const translations = await loadLlmTranslations(locale);
  if (llmCollection(locale).status !== 'published') return { locale, ...translations };
  const { getArticle, getArticleModule } = await import('../content');
  const initialChapters = Object.fromEntries(await Promise.all(llmEditionSlugs(locale)
    .filter(slug => getArticle(slug, locale))
    .map(async slug => [slug, (await getArticleModule(slug, locale))!.default])));
  return { locale, ...translations, initialChapters };
}
