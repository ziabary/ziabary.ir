---
contentKey: language-evidence
locale: en
suggestedSlug: choosing-models-with-language-specific-evidence
replacesRegionalArticleKey: evaluating-language-models-for-persian
status: ready-for-editorial-integration
---

# Choosing models with language-specific evidence

A multilingual model can be a sensible candidate without having a published result for your language and task. The useful distinction is between a declared language, a measured task in that language, and a result that transfers to the workflow you plan to run. This guide collects published evidence; it does not present new experiments by this site.

## Start with the task, then the language

For document search, look for retrieval evidence with the relevant query and document languages. For classification, look for the intended type of label. For a writing assistant, neither retrieval accuracy nor a classification result establishes the quality of a conversation. A language tag helps find candidates; it is not a score.

The E5 report makes this distinction concrete. Its MIRACL results describe retrieval within each language. Spanish queries over Spanish documents are a different use case from Spanish queries over an English document collection. A result for the first does not establish the second. [E5 technical report](https://arxiv.org/html/2402.05672v1).

## Read the language slice before the average

The same E5 comparison produces different preferences depending on language. These are the paper’s MIRACL development-set nDCG@10 scores, displayed on its 0–100 scale:

| Model | English | Spanish |
|---|---:|---:|
| multilingual-e5-small | 48.0 | 51.2 |
| multilingual-e5-base | 51.2 | 51.5 |
| multilingual-e5-large | 52.9 | 52.9 |
| multilingual-e5-large-instruct | 51.5 | 53.7 |

Large-Instruct has the highest Spanish score among these four, while Large leads on the English slice. The table does not establish statistical significance or an all-purpose ranking. It does show why the Instruct label and a multilingual average cannot replace task-specific evidence. [Source: Table 6](https://arxiv.org/html/2402.05672v1).

Keep Recall@100 separate from nDCG@10. The former helps describe coverage within a larger candidate pool; the latter rewards useful ranking near the top. Neither is the percentage of correct answers a complete RAG assistant will produce.

## Keep classification results in the right category

The E5 model cards also include language-specific classification results, with dataset splits and revision identifiers. These can inform an intent-classification shortlist. They should not populate a retrieval leaderboard just because the underlying model creates embeddings. A classifier’s setup is part of the evaluated system, and matching dataset revisions does not prove every setting matched. [Base model card](https://huggingface.co/intfloat/multilingual-e5-base), [Large-Instruct model card](https://huggingface.co/intfloat/multilingual-e5-large-instruct).

## Compare pipelines when the decision concerns a pipeline

If the decision is whether to add reranking, prefer a report that holds the initial candidate pool constant. Qwen’s reranker evaluation uses the top 100 candidates from Qwen3-Embedding-0.6B. On MTEB-R, the reported baseline is 61.82 and the 0.6B reranker reaches 65.80. That is a 3.98-point difference in this metric and experiment; it is not a measured improvement in answer correctness or response speed. [Qwen report, Table 4](https://arxiv.org/html/2506.05176v3).

For production search, separately identify the first-stage retriever, candidate count, reranker, chunking policy and generator. A stronger reranker cannot recover a document that never enters its candidate pool.

## Distinguish a benchmark task from conversation quality

SpanishBench includes tasks for inference, paraphrasing, question answering, translation and other abilities. Published Salamandra instruction-model results provide specific Spanish-language comparison points. They do not establish the best Spanish chatbot, nor do they cover every regional variety or specialist vocabulary. [SpanishBench task definitions](https://github.com/EleutherAI/lm-evaluation-harness/tree/main/lm_eval/tasks/spanish_bench), [Salamandra 7B card](https://huggingface.co/BSC-LT/salamandra-7b-instruct).

This distinction applies to English too. A coding benchmark is not a writing benchmark, and a general knowledge result does not establish tool-use reliability. Build a shortlist from the closest available evidence, then identify what the published results leave unresolved.

## What this reference records

Each published result should retain the exact model name, reporter, benchmark and version where known, language, metric, score scale and reported settings. A model-card commit identifies the document snapshot; unless explicitly linked by the evaluator, it does not identify the weights used in the experiment.

Unknown information stays unknown. “No recorded evaluation” is different from “language unsupported.” Likewise, two rows from different reports can be useful to inspect without forming a defensible ranking. The purpose of the reference is to make those distinctions visible enough to support a decision.
