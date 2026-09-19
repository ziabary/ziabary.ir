import type { LlmLocale } from './i18n/runtime';
/** Manual editorial map. The general evaluation article is not a translation of the Persian specialist article. */
// Include articles that directly explain LLM concepts or inform model selection.
// Reading order: choice and evaluation → applications → memory and execution → capacity and cost.
// General security, confidentiality and infrastructure articles belong to their own collections.
// A missing edition stays absent; it must not silently load a Persian chapter.
export const llmTopics = [
  { id: 'model-size', fa: 'right-model-size-for-the-task', en: 'right-model-size-for-the-task-en', es: 'right-model-size-for-the-task-es' },
  { id: 'evaluation', fa: 'evaluating-language-models-for-persian', en: 'evaluating-llms-for-your-language-and-workload', es: 'evaluar-llm-idioma-y-tarea' },
  { id: 'adaptation', fa: 'rag-cag-kag-fine-tuning-instruction-tuning', en: 'rag-cag-kag-fine-tuning-instruction-tuning-en', es: 'rag-cag-kag-fine-tuning-instruction-tuning-es' },
  { id: 'rag', fa: 'enterprise-rag-model-embedding-reranker', en: 'enterprise-rag-model-embedding-reranker-en', es: 'enterprise-rag-model-embedding-reranker-es' },
  { id: 'coding', fa: 'code-completion-assistant-and-agent', en: 'code-completion-assistant-and-agent-en', es: 'code-completion-assistant-and-agent-es' },
  { id: 'gpu-memory', fa: 'llms-on-rtx-4090-24gb-vs-48gb', en: 'llms-on-rtx-4090-24gb-vs-48gb-en', es: 'llms-on-rtx-4090-24gb-vs-48gb-es' },
  { id: 'quantization', fa: 'four-bit-model-quantization', en: 'four-bit-model-quantization-en', es: 'four-bit-model-quantization-es' },
  { id: 'precision', fa: 'int8-or-fp8-real-gpu-support', en: 'int8-or-fp8-real-gpu-support-en', es: 'int8-or-fp8-real-gpu-support-es' },
  { id: 'layerwise', fa: 'airllm-layer-wise-inference', en: 'airllm-layer-wise-inference-en', es: 'airllm-layer-wise-inference-es' },
  { id: 'software', fa: 'ollama-vllm-sglang-or-llama-cpp', en: 'ollama-vllm-sglang-or-llama-cpp-en', es: 'ollama-vllm-sglang-or-llama-cpp-es' },
  { id: 'latency', fa: 'gpu-inference-latency-throughput', en: 'gpu-inference-latency-throughput-en', es: 'gpu-inference-latency-throughput-es' },
  { id: 'serving', fa: 'single-user-to-enterprise-llm-serving', en: 'single-user-to-enterprise-llm-serving-en', es: 'single-user-to-enterprise-llm-serving-es' },
  { id: 'field-report', fa: 'targoman-300-concurrent-requests-one-rtx-4090', en: null, es: null },
  { id: 'cost', fa: 'true-llm-cost-buy-rent-or-api', en: 'true-llm-cost-buy-rent-or-api-en', es: 'true-llm-cost-buy-rent-or-api-es' },
] as const;
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
