---
title: Choosing the generator, embedding model and reranker for enterprise RAG
slug: enterprise-rag-model-embedding-reranker-en
translationGroup: enterprise-rag-model-embedding-reranker
lang: en
date: '2026-08-12'
faDate: '2026-08-12'
draft: true
math: false
category: Language models
excerpt: 'A practical three-part model stack for document assistants: small-model candidates, retrieval quality, vector and KV budgets, document preparation and a diagnostic table for finding the failing component.'
readTime: 12 min
cover: /images/articles/enterprise-rag-model-embedding-reranker/cover.webp
related:
- rag-cag-kag-fine-tuning-instruction-tuning-en
- right-model-size-for-the-task-en
- four-bit-model-quantization-en
updated: "2026-09-19"
author: Mehran Ziabary
---

<script>
  import LlmReferenceGuidance from '$lib/components/LlmReferenceGuidance.svelte';
</script>

An employee asks who must approve a contract renewal. A support specialist needs a repair procedure. A new colleague wants the steps for a travel request. The answers usually exist in organizational documents. The assistant must find the valid source, read the relevant conditions and give an answer whose support can be inspected. That workflow does not automatically require a very large generator.

For predominantly direct, bounded document questions, compare a 3–4B instruction model with a 7–8B candidate before committing to a larger deployment. The purpose is to discover whether additional generator capacity fixes a real error. Embedding, reranking and answer generation have different responsibilities, so enlarging one does not repair the others. The [model-size article](/en/articles/right-model-size-for-the-task-en/) develops the shortlist; the [LLM guide](/en/guides/llm/) provides exact model, artifact and execution evidence.

<!-- document-routes:start -->

## Text documents, scans and live records need different paths

For a text PDF, retain headings, page references and document versions during extraction and indexing. When charts, layout or table relationships matter, compare OCR and visual retrieval on your own document samples. A visual retriever finds relevant pages; the answering step still needs inspectable evidence. Totals and current inventory should come from authorized queries and calculations over authoritative records, rather than a few retrieved passages.

| Data | Starting path | Evidence in the answer |
| --- | --- | --- |
| Text PDFs, letters and policies | Extract headings, pages and versions; lexical search, adding vectors if useful | The valid clause and page |
| Scans, charts and image tables | Layout-preserving OCR; compare visual retrieval on representative pages | Extracted text or an inspectable page region |
| Live CRM and ERP records | Authorized queries through a restricted connector | Source record and retrieval time |
| Totals, counts and tabular reports | SQL, BI or code over all relevant records; generation for explanation | A reproducible calculation and its data scope |

For a visual pilot, [Qwen3-VL-Embedding-2B](https://huggingface.co/Qwen/Qwen3-VL-Embedding-2B) retrieves relevant pages and [Qwen3-VL-Reranker-2B](https://huggingface.co/Qwen/Qwen3-VL-Reranker-2B) rescores candidates; neither generates the answer. The 8B variants offer a comparison path, not a mandatory starting point. The documented task context is 32K tokens. Quantization support in the embedding card concerns **output vectors**, not a Q4 weight release. MMEB and ViDoRe aggregates do not establish quality in a particular language.

Exact amounts, identifiers and contractual clauses need a link to extracted text or an inspectable page region. Compare indexing time, index size and query latency alongside retrieval quality. A 2B visual model need not have the execution cost of a 2B text model.

<!-- document-routes:end -->

## Three components, three responsibilities

A common RAG pipeline prepares and chunks documents, computes their representations, retrieves candidate passages for a query, optionally reranks them and asks a generator to answer from selected evidence. Not every request needs the entire pipeline. An exact circular number may be best served by identifier search and a source excerpt, without newly generated prose.

| Component | Responsibility | Output for the next stage |
| --- | --- | --- |
| Embedding model and search index | Represent text for retrieval, often alongside lexical search | Candidate passages |
| Reranker | Score each query–passage pair more closely | A reordered candidate set |
| Generator | Read evidence, preserve conditions and answer with source support | A usable, traceable answer |

A typical embedding encoder represents query and document separately, allowing document vectors to be computed in advance. A cross-encoder reranker processes the pair together, repeating work for each candidate. That explains the usual separation between searching a large collection and reranking a smaller set, as in the [Sentence Transformers retrieve-and-rerank guide](https://sbert.net/examples/sentence_transformer/applications/retrieve_rerank/README.html).

## Archive size does not determine generator size

The generator does not have to memorize the entire archive in its weights. Relevant evidence arrives with the request. A million-page collection initially changes index capacity, retrieval difficulty and version management; it does not necessarily require a larger generator than a ten-thousand-page collection. The difficult part is interpreting and combining the evidence needed for an answer.

“Who approves renewal under this policy?” may be answered from one explicit clause. “Do three contracts and two amendments permit renewal without a new approval?” requires version precedence, relationships and exceptions. Both are document-assistant questions, but their reasoning demands differ.

The authors of [Pleias-RAG](https://arxiv.org/html/2504.18225v1) report competitive results for specialized 350M and 1B models against some larger general models on particular RAG tests, including HotPotQA and 2Wiki. That finding concerns their training and evaluated tasks, not every language or document workflow. It gives a reason to consider evidence-grounded specialization alongside parameter count.

| Request type | Initial generator choice | What would justify greater capability? |
| --- | --- | --- |
| Locate a document, clause or exact identifier | Search and show the source; generation may be unnecessary | Ambiguity or a need for explanation |
| Answer directly from explicit passages | An instruction model around 3–8B | Persistent errors with specialist language or combined conditions |
| Extract fields into a fixed format | Rules or a specialist, then a 1–4B generator for bounded inputs | Diverse layouts or information requiring inference |
| Short summary or limited comparison | Compare 4B and 8B models | Losing details, exceptions or required coverage |
| Reconcile conflicting documents | Compare 8–14B with a stronger candidate such as 32B | Incorrect reasoning despite complete evidence |
| Count, total or report across an entire archive | Structured queries and complete processing; generation for explanation | Extracting structure or more difficult analysis, not merely a larger model |

These are starting comparisons, not tested thresholds or a claim that every model in a range performs alike.

## Choose embeddings against the search problem

The first question is whether the required passage enters the candidate list. Internal terminology, equipment codes, form names and cross-language queries can behave differently from a public leaderboard's average. Include those cases in the retrieval evaluation. [MIRACL](https://huggingface.co/datasets/miracl/miracl) provides language-specific retrieval collections, including English and Spanish, but organizational documents remain a separate domain.

Semantic similarity helps connect informal wording with a formal policy term. Contract numbers, part identifiers and versions also need exact matching. Hybrid retrieval combining vectors and a lexical method such as BM25 is therefore worth comparing. [Reciprocal rank fusion](https://www.elastic.co/docs/reference/elasticsearch/rest-apis/reciprocal-rank-fusion) combines ranks; adding raw BM25 and cosine scores without dealing with their scales is a different, uncalibrated operation.

Input formatting is part of the model. [multilingual-e5-small](https://huggingface.co/intfloat/multilingual-e5-small#faq) uses `query:` and `passage:` prefixes for asymmetric retrieval and truncates beyond its input limit. [Qwen3-Embedding](https://huggingface.co/Qwen/Qwen3-Embedding-0.6B#usage) uses its own query-instruction format. Pooling, normalization and tokenizer limits must follow the selected checkpoint. Equal vector dimensions do not make two unrelated encoders share a compatible embedding space.

Dimensions also affect storage. One million 384-dimensional float32 vectors occupy **1.536 GB**, about 1.54 GB, before text, metadata and index structures. At 1,024 dimensions, raw vectors occupy **4.096 GB**, about 4.10 GB. The calculation is vector count × dimensions × four bytes; these vectors need not reside in VRAM. Dimension reduction should use a method the model supports, not arbitrary truncation assumed to work for any encoder.

Changing the embedding model normally requires rebuilding document vectors and the compatible index. Changing chunk boundaries may do the same. Replacing the generator or reranker generally does not require re-embedding if document representations and chunks stay unchanged. Record the encoder and preprocessing version as part of the index configuration.

<!-- reference:retrieval-language:start -->

### Match retrieval evidence to language and task

The [E5 report](https://arxiv.org/html/2402.05672v1) gives English MIRACL nDCG@10 scores of 48.0, 51.2, 52.9 and 51.5 for Small, Base, Large and Large-Instruct. The instruction-tuned variant is not the highest-scoring one on this English task. For Spanish, the corresponding values are 51.2, 51.5, 52.9 and 53.7. Show each language separately and retain Recall@100 as a different metric: it helps assess whether relevant documents enter the pool a reranker will receive. These results do not measure the generated answer or cross-language query/document pairs.

<LlmReferenceGuidance locale="en" ids={["guidance:rag-fa", "guidance:rag-en", "guidance:rag-es"]} />

<!-- reference:retrieval-language:end -->

## Reranking improves a candidate set, not a missing document

Several retrieved clauses may discuss contract renewal while referring to different agreement types or obsolete versions. A reranker can examine the query and text together to refine relevance. Validity dates, document type and authority still need metadata and rules; relevance is not the same as legal or organizational validity.

A reranker cannot recover evidence absent from its candidate list. It also adds computation proportional to the pairs examined and influenced by their lengths and batching. Thirty to fifty candidates can be an initial experiment, not a universal setting. The useful target is retaining sufficient evidence within the latency and context budget.

If an exact identifier already finds the correct document, reranking may add little. Similar clauses and near-duplicate documents give it more work to do. The [BGE reranker card](https://huggingface.co/BAAI/bge-reranker-v2-m3) describes relevance scoring; even a score transformed into the zero-to-one interval is not the probability that the final generated answer is correct.

<!-- reference:reranker-measured-context:start -->

### Reranking with a common candidate pool

[Qwen’s comparison](https://arxiv.org/html/2506.05176v3) sends the same 100 candidates from Qwen3-Embedding-0.6B to each reranker. MTEB-R rises from 61.82 for the retriever baseline to 65.80 with the 0.6B reranker: a 3.98-point score difference, not a 3.98% improvement in answer quality. The 4B reranker scores 69.76 versus 69.02 for 8B on this metric, while 8B leads slightly on MMTEB-R. Choose according to task and second-stage resources; the table does not measure response latency.

<LlmReferenceGuidance locale="en" ids={["guidance:reranker"]} />

<!-- reference:reranker-measured-context:end -->

## Concrete candidates for a small initial comparison

| Model | Role | Specific property | Reason to include it |
| --- | --- | --- | --- |
| [multilingual-e5-small](https://huggingface.co/intfloat/multilingual-e5-small) | Embedding | About 118M parameters, 384 dimensions, 512-token limit | A small baseline for short chunks and possible CPU execution |
| [BGE-M3](https://huggingface.co/BAAI/bge-m3) | Embedding/retrieval | 1,024-dimensional dense vectors, up to 8,192 input tokens, sparse and multi-vector paths | Compare multilingual retrieval and representation choices |
| [Qwen3-Embedding-0.6B](https://huggingface.co/Qwen/Qwen3-Embedding-0.6B) | Embedding | About 0.6B parameters, up to 1,024 dimensions and 32,768 input tokens | An instruction-aware candidate with configurable output dimensions |
| [bge-reranker-v2-m3](https://huggingface.co/BAAI/bge-reranker-v2-m3) | Reranking | About 568M parameters; multilingual pair scoring | A sub-billion-parameter reranking baseline |
| [Qwen3-Reranker-0.6B](https://huggingface.co/Qwen/Qwen3-Reranker-0.6B) | Reranking | About 0.6B parameters, instruction support and 32,768-token input | Compare a Qwen-based reranker before its 4B/8B variants |

An input limit is not a recommended chunk size. A 32K passage can contain several unrelated topics and cost substantial computation. Query, instruction and candidate must fit together for a reranker. BGE-M3's additional representations also require the matching execution path; a generic embedding API may expose only dense vectors. The [BGE-M3 paper](https://arxiv.org/html/2402.03216v3) distinguishes those capabilities.

For generation, [Qwen3-4B-Instruct-2507](https://huggingface.co/Qwen/Qwen3-4B-Instruct-2507) and [Qwen3-8B](https://huggingface.co/Qwen/Qwen3-8B) make a concrete initial comparison. The former is a non-thinking instruction checkpoint; the latter supports thinking and non-thinking modes. Long reasoning output should not become an unexamined default for a direct document answer. Keep that mode visible in latency and quality comparisons.

All three components need not share a model family. The required vector-space compatibility concerns query and document encoders; it does not require the reranker and generator to come from the same publisher. The [specialized-model view](/en/guides/llm/?view=specialized-models#specialized-models) and [execution software table](/en/guides/llm/#serving-software) provide the relevant evidence and routes.

## Document preparation determines what the generator can know

If extraction detaches a table header from its rows, drops an exception into another chunk or reads “10” as “1”, the generator receives damaged evidence. Preserve section titles, clause numbers, table headers, document identifiers and source locations where possible. Tools such as [Docling](https://docling-project.github.io/docling/) address document structure and layout; language-specific OCR and the actual file types still need evaluation.

A scanned page with no extractable text needs OCR or a suitable visual path. That does not require sending every text-only request through a large vision-language model. In our Targoman file-chat deployment, an adapted Aya 8B generator used Qdrant and multilingual-e5-large-instruct for retrieval, sharing the GPU with embedding. The reported path did not include OCR, so scanned PDFs without extractable text were outside its input coverage. The [original Persian deployment report](/articles/targoman-300-concurrent-requests-one-rtx-4090/) is an example of why extraction and shared-resource budgets belong in the model decision.

More retrieved text is not automatically more useful evidence. Six passages of 700 generator tokens total about **4,200 tokens**; fifty total **35,000**. Instructions, history, question and output allowance are additional. This is a generator-budget example, not a chunking prescription: E5 models with a 512-token limit can truncate such passages, and each component has its own tokenizer. Check embedding and reranker limits separately.

Version, validity and permissions must travel with the passage. Obsolete text should not displace the current policy merely because it is more similar. Unauthorized passages must be excluded before reaching a generator or a reranker outside the allowed data boundary. Retrieved document content is evidence, not authority to replace the system's instructions.

## Budget the whole serving pipeline

Three models do not necessarily require three dedicated GPUs. Initial document embedding is separate from online answering; subsequently, new and changed documents require processing. A small encoder may run adequately on CPU for limited demand, while batched GPU embedding can serve larger ingestion jobs. Reranker and generator can share a GPU when memory and latency permit, or run as separate services. [Text Embeddings Inference](https://huggingface.co/docs/text-embeddings-inference/index) is an example of an embedding-serving engine; verify the exact model and role supported.

A small generator still has a context budget. From [Qwen3-4B-Instruct-2507's configuration](https://huggingface.co/Qwen/Qwen3-4B-Instruct-2507/blob/main/config.json), 36 layers, 8 KV heads and head dimension 128 imply about **1.125 GiB** of raw sixteen-bit KV for 8,192 retained tokens. Four independent sequences need **4.5 GiB**, before weights, activations and workspace. An inexpensive resident model does not create unlimited concurrency.

If the model meets quality requirements, replicas on separate GPUs can increase independent serving capacity. Splitting one larger model is a different deployment. The [24/48 GB comparison](/en/articles/llms-on-rtx-4090-24gb-vs-48gb-en/) and [quantization article](/en/articles/four-bit-model-quantization-en/) connect these choices to memory without assuming a throughput gain from file size.

## Locate the failure before buying more generator capacity

For a failed answer, manually provide the correct and sufficient passages to the same small model. If it now succeeds, retrieval or context selection is implicated for that example. If it still fails, investigate instructions, language, output processing and generator capability. This diagnostic does not explain every error, but it avoids replacing the wrong component by default.

| Symptom | First component to inspect | Intervention before enlarging the generator |
| --- | --- | --- |
| Required evidence absent from initial candidates | Extraction, chunks, embedding and search | Repair text, preserve identifiers, compare hybrid retrieval and candidate count |
| Evidence retrieved but excluded from final context | Reranker and evidence selection | Correct pair formatting, diversify evidence and revise token allocation |
| Answer uses an obsolete or irrelevant document | Metadata and validity rules | Version, date, type and permission filters |
| Complete evidence present but a direct answer is wrong | Generator, instruction and output handling | Improve the contract, then compare another small or stronger model |
| Correct evidence but failed exception handling or reasoning | Workflow design and reasoning capability | Decompose the task, use tools or route to a stronger model |

Build representative questions with reference evidence and answers, including unanswerable, ambiguous, obsolete-document and unauthorized cases. Keep a held-out portion out of prompt and threshold tuning. For retrieval, measure whether the necessary evidence appears within the first k results; one relevant passage is insufficient when the answer requires several. For generation, check factual correctness, source support, citation accuracy and behavior without evidence.

Measure queueing and response timing alongside quality. If terminology causes retrieval failure, adapting an encoder or reranker with relevant/irrelevant pairs may be appropriate. If retrieval works but the generator violates output behavior, instruction or adapter tuning addresses another problem. A routine policy revision normally calls for updating sources and the index rather than retraining every component; the [RAG/tuning comparison](/en/articles/rag-cag-kag-fine-tuning-instruction-tuning-en/) explains that boundary.

A small encoder, an optional small reranker and a 3–8B generator form a serious starting system for direct document questions. Add a stronger route for identified difficult cases using an evaluated routing rule. Neither similarity score nor the model's confident tone alone establishes when escalation is needed. The deciding result is the least costly combination that supplies correct, grounded answers within the required time.
