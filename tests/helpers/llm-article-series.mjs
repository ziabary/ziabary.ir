import { formatDate } from '../../src/lib/publication.mjs';

// The editorial sequence continues the already-published RAG comparison (15 June).
export const llmArticleSeries = [
  { slug: 'right-model-size-for-the-task', date: '2026-06-18', tables: 2 },
  { slug: 'llms-on-rtx-4090-24gb-vs-48gb', date: '2026-07-02', tables: 3, math: true },
  { slug: 'four-bit-model-quantization', date: '2026-07-13', tables: 4 },
  { slug: 'airllm-layer-wise-inference', date: '2026-07-29', tables: 4 },
  { slug: 'enterprise-rag-model-embedding-reranker', date: '2026-08-12', tables: 4 },
  { slug: 'code-completion-assistant-and-agent', date: '2026-08-24', tables: 4 },
  { slug: 'evaluating-language-models-for-persian', date: '2026-09-02', tables: 4 },
  { slug: 'single-user-to-enterprise-llm-serving', date: '2026-09-08', tables: 5 },
  { slug: 'ollama-vllm-sglang-or-llama-cpp', date: '2026-09-15', tables: 6 },
  { slug: 'true-llm-cost-buy-rent-or-api', date: '2026-09-16', tables: 6 }
].map(article => ({ ...article, faDate: formatDate(article.date) }));
