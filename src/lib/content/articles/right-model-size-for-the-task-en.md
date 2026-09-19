---
title: How large a language model does your task actually need?
slug: right-model-size-for-the-task-en
translationGroup: right-model-size-for-the-task
lang: en
date: '2026-06-18'
faDate: '2026-06-18'
draft: true
math: false
category: Language models
excerpt: Choose between specialized models, small generators and larger LLMs by separating task quality, language evidence, retrieval, memory and serving capacity—with published comparisons and a worked memory example.
readTime: 13 min
cover: /images/articles/right-model-size-for-the-task/cover.png
related:
- rag-cag-kag-fine-tuning-instruction-tuning-en
- choosing-gpu-for-ai-en
- gpu-server-platform-components-en
updated: "2026-09-19"
author: Mehran Ziabary
---

<script>
  import LlmReferenceGuidance from '$lib/components/LlmReferenceGuidance.svelte';
</script>

Routing customer messages to a department, extracting an order number and answering a question from a product manual all involve language. Their outputs are quite different: a label, a few fields and an answer supported by a document. Starting with “Which 30 or 70 billion parameter model should we install?” settles part of the infrastructure decision before identifying the task. A classifier, a specialized model or a smaller generator may do the work with fewer resources.

The useful comparison is between configurations that meet an explicit acceptance criterion: correct fields, a grounded answer or working code, delivered within the required time. The [language-model guide](/en/guides/llm/) connects those tasks to model evidence, downloadable artifacts, execution software and memory estimates.

## Specialized and small describe different properties

A specialized model has a particular role: translation, entity recognition, classification, embedding text or scoring the relevance of a document. Size describes its parameter count. The B in names such as 8B normally means billion parameters. Specialization does not imply a particular size, and “small language model” has no universal cutoff; the [survey of small language models](https://arxiv.org/html/2410.20011v1) discusses how that category changes with context.

The distinction becomes concrete with [BGE-M3](https://huggingface.co/BAAI/bge-m3), which supports dense, sparse and multi-vector retrieval, and [BGE-Reranker-v2-M3](https://huggingface.co/BAAI/bge-reranker-v2-m3), which scores a query together with a candidate passage. Neither replaces the generator that writes the final answer. A document assistant may need all three roles, and their sizes should be selected separately.

For a fixed set of categories, a rules-based or conventional text classifier is also a useful baseline. For scanned documents, decide whether OCR plus a text model preserves the information or whether a model accepting images is needed. Adding parameters to a text-only model does not give it image input.

## A bounded answer is different from open-ended analysis

A short support reply usually requires understanding the request, following a few instructions and expressing a limited answer. Direct retrieval-augmented generation, or RAG, supplies the knowledge in the input. Clear evidence, a narrow domain and short answers make a smaller model a reasonable starting point. [SmolLM2-1.7B-Instruct](https://huggingface.co/HuggingFaceTB/SmolLM2-1.7B-Instruct), for example, is an English-oriented candidate for bounded rewriting and instruction-following tasks; its small size is not evidence of equal suitability in other languages.

Comparing exceptions across several contracts requires a different combination of skills: preserving intermediate conclusions, resolving conflicts and distinguishing an explicit rule from an assumption. A stronger reasoning model deserves a place in that comparison. “Analysis” itself is too broad a category: assigning a topic to a message or asking SQL for a sales total need not require a general-purpose analyst model.

This distinction also applies to code. Completing a function is a narrower task than changing several files, executing tests and deciding what to do after a failure. Model size should follow the difficult part of that workflow, rather than the fact that both applications have a chat interface.

## A starting map for model sizes

This table is **editorial guidance for forming a shortlist**, not a benchmark. The ranges describe dense generative models with suitable language and task training and a manageable context. MoE models need separate accounting for total and active parameters.

| Task | Around 1–4 billion | Around 7–14 billion | Around 24–72 billion or more | First comparison |
| --- | --- | --- | --- | --- |
| Classification and clear field extraction | Good candidate for bounded inputs | Useful for ambiguity and variation | Lower priority for a fixed schema | Rules or a specialist, then a small generator |
| Simple chat and FAQs | Economical candidate for a narrow domain | Broader conversations | Extra capacity needs a concrete benefit | A small instruction model in the target language |
| Rewriting and short summaries | Simple text and instructions | More details and constraints | Difficult text and combined requirements | A 3–4B model against an 8B model |
| Direct RAG answers from a few passages | Plausible with explicit evidence | A balanced starting range for varied documents | Harder to justify for direct extraction | Retrieval plus a 4–8B generator |
| Multi-document RAG with exceptions | Bounded subtasks | Reasoning evaluation needed | Stronger candidate for complex relationships | Compare 14B and 32B reasoning models |
| Code completion and local repairs | A specialized code model | More varied code and instructions | Difficult dependencies or larger changes | A 3–8B code model |
| Coding agent across files and tools | Simple components of the workflow | Bounded tasks with defined tools | A serious candidate for complex work | A stronger code or agent-oriented model |
| Open analysis and multi-step reasoning | A weaker general starting point | A reasoning baseline | A serious candidate for difficult, varied problems | Quality and cost per completed task |

Embedding and reranking start with models for those roles, such as [Qwen3-Embedding-0.6B](https://huggingface.co/Qwen/Qwen3-Embedding-0.6B). The [task suitability table](/en/guides/llm/#model-suitability) narrows specific candidates; the [catalog](/en/guides/llm/#model-catalog) identifies exact versions and files.

## Published scores help when their scope is preserved

The non-thinking results in the [SmolLM3 model card](https://huggingface.co/HuggingFaceTB/SmolLM3-3B) illustrate why a single size ranking is insufficient:

| Model | IFEval | LiveCodeBench v4 |
| --- | ---: | ---: |
| SmolLM3-3B | 76.7 | 15.2 |
| Qwen3-4B | 68.9 | 24.9 |

The smaller model leads on the instruction-following test and trails on the coding test. These are publisher-reported results, not a controlled experiment isolating parameter count: the models also differ in training and design.

The [DeepSeek-R1 report](https://huggingface.co/deepseek-ai/DeepSeek-R1) gives its Qwen-based 14B and 32B distilled models MATH-500 pass@1 scores of 93.9 and 94.3, a difference of 0.4 points. Their GPQA Diamond scores are 59.1 and 62.1. The larger gap belongs to a different task; neither difference can be turned directly into a percentage improvement for a document assistant.

Specialists show the same issue. In [Table 4 of the Qwen3 Embedding paper](https://arxiv.org/html/2506.05176v1), the 4B and 8B rerankers score 69.76 and 69.02 on English MTEB-R, but 72.74 and 72.94 on multilingual MMTEB-R. The experiment reranks 100 candidates retrieved by Qwen3-Embedding-0.6B. The reversal concerns those collections and that retrieval setup, not every language or candidate pool.

Use such evidence to decide which models merit a task-specific comparison. A small average difference can matter for an expensive error, while an impressive overall score may not address the failure causing trouble in the application.

<!-- reference:task-order:start -->

### Choose size after choosing the task

[Qwen](https://huggingface.co/Qwen/Qwen3-4B-Instruct-2507) reports 35.1 on LiveCodeBench v6 for Qwen3-4B-Instruct-2507 and 29.0 for non-thinking Qwen3-30B-A3B. On Aider-Polyglot, the order reverses: 12.9 versus 24.4. Coding problems and code editing in the Aider workflow support different choices. A single “best coding model” label would discard that distinction. Preserve the exact model variant, generation mode and task when interpreting these results.

<LlmReferenceGuidance locale="en" ids={["guidance:small-model"]} />

<!-- reference:task-order:end -->

## In RAG, diagnose retrieval before replacing the generator

A document assistant must find relevant material, rank it and produce an answer supported by it. If the return-policy clause never reaches the model, a larger generator cannot recover the missing evidence reliably. If the clause was retrieved but ranked below the context cutoff, inspect retrieval and reranking. If the correct clause is present but its exception is misread, the prompt or generator becomes a more plausible bottleneck.

A useful diagnostic is to supply the correct passage manually. An improved answer points toward the retrieval pipeline. A continued failure focuses attention on instruction following, context use and reasoning. This separates expenditure on a larger generator from expenditure on better indexing or document processing.

The total number of documents does not directly determine generator size. Millions of documents may produce only three relevant passages for one query; a handful of contracts may require difficult comparison across several versions. Index capacity, retrieved context and reasoning difficulty are distinct budgets.

## Supply knowledge or change learned behavior?

Private data does not automatically justify fine-tuning. First distinguish missing information from unsuitable behavior when the right information is available.

[RAG](https://arxiv.org/abs/2005.11401) retrieves relevant external information for the current question. It suits changing or extensive collections and answers that must remain connected to sources. Connecting a pretrained instruction model to retrieval does not inherently require changing its weights.

Here, [CAG means Cache-Augmented Generation](https://arxiv.org/html/2412.15605v2): a bounded knowledge collection is loaded into context and its computed state, typically KV cache, is reused. This can avoid repeated retrieval and prefix computation, but documents, question and output allowance must fit the usable context. Updating the collection can invalidate cached state; caching is not training.

[KAG in the OpenSPG framework](https://arxiv.org/abs/2409.13731) connects structured knowledge, text and reasoning guided by logical forms. It is relevant when relationships and rules are central, with the additional work of constructing and maintaining that structure. It is not a general guarantee against hallucination.

Fine-tuning continues training a pretrained model for a domain, behavior or task. [Instruction tuning](https://arxiv.org/abs/2109.01652) is a form of fine-tuning using instructions and desired responses. A ready-made Instruct model may already meet the requirement. Further training is more compelling when representative examples exist and the model still mishandles field mappings, output contracts or tool use despite having the evidence.

Current prices, order status and revised procedures usually require access to the current source. Training alone does not ensure their freshness. Combinations are possible: a small model adapted for extraction can retrieve current information and reuse a stable cached prefix. The [comparison of RAG, CAG, KAG and tuning](/en/articles/rag-cag-kag-fine-tuning-instruction-tuning-en/) develops these choices in more detail.

## Evaluate the language of the work

The interface language is not the evaluation language. A model can have an English UI and process Spanish documents, or receive a question in one language and retrieve documents in another. Publisher language lists identify candidates; a multilingual average does not establish quality for each language and task.

[Aya Expanse 8B](https://huggingface.co/CohereLabs/aya-expanse-8b), for example, lists 23 supported languages. Its public weights have a noncommercial license, so deployment suitability includes licensing as well as language evidence. A result for an adapted deployment also belongs to that adapted model, not automatically to the public checkpoint.

Representative inputs should include local date and number formats, identifiers, negation, product names, informal wording and mixed-language text. Preserving an amount or an exception can matter more than producing fluent paragraphs. Token counts also vary between tokenizers: compare the same required task and output, then account for each model's actual tokenization.

## Parameters, file size and execution memory are different

An 8B model remains an 8B model after quantization. In an idealized calculation, eight billion weights stored in exactly four bits occupy four billion bytes. Quantization metadata, tensors kept at higher precision, temporary buffers and KV cache make that figure different from the VRAM needed for a service.

[GGUF](https://huggingface.co/docs/hub/en/gguf) is a file format, not a precision or a model size. Identify the base checkpoint, artifact publisher, quantization and compatible engine. The [deployment compatibility view](/en/guides/llm/?view=deployment-compatibility#serving-software) separates these choices.

For MoE, active parameters describe only part of the work. [Qwen3-Coder-30B-A3B-Instruct](https://huggingface.co/Qwen/Qwen3-Coder-30B-A3B-Instruct) lists about 30.5 billion total and 3.3 billion active parameters. Keeping all weights resident still involves the total model. The active count does not turn its memory footprint into that of a dense 3.3B model.

## One successful request is not a serving capacity

A server can share one set of weights across many requests while managing their context states separately. It does not need a model copy per user. Independent replicas are another choice: they duplicate weights but process separate request streams, as in [vLLM data-parallel deployment](https://docs.vllm.ai/en/latest/serving/data_parallel_deployment/). Batching and memory management, including [PagedAttention](https://arxiv.org/abs/2309.06180), determine how efficiently a single replica serves requests.

Consider an **educational memory example**, with 24 GiB available and 4 GiB reserved for execution overhead:

| Weight allocation | Memory left for KV | Active requests at 1 GiB KV each | Active requests at 4 GiB KV each |
| --- | ---: | ---: | ---: |
| 4 GiB | 16 GiB | 16 | 4 |
| 16 GiB | 4 GiB | 4 | 1 |

These are memory-only ceilings under the stated assumptions. Actual KV use depends on architecture, precision and context, and fitting a request does not establish its response time. Registered users, queued requests and requests actively being processed are three different counts.

System instructions, conversation history, retrieved passages and output all consume the context budget. Reducing that budget to admit more requests may remove information the product needs. Conversely, accepting a long input does not prove that the model uses it accurately; [RULER](https://arxiv.org/abs/2404.06654) examines that distinction. Track time to first token, time between generated tokens and completed requests separately.

## Execution strategy can change the practical shortlist

[AirLLM's layer-wise approach](https://github.com/lyogavin/airllm/blob/v4.0.0/README.md) moves weights so that the whole model need not reside on the GPU simultaneously. It expands what can run on limited VRAM, while storage and transfers enter the latency budget. A useful overnight experiment may therefore be an unsuitable interactive service.

Engine choice also matters: [Ollama](https://docs.ollama.com/) emphasizes convenient model management and application access; [vLLM](https://docs.vllm.ai/en/latest/) offers serving-oriented execution. Compare the actual model, format, batching and memory configuration through the [software table](/en/guides/llm/#serving-software), rather than treating the tool name as a capacity guarantee.

## Make the final comparison explain a decision

Start with a simple or specialized baseline, a suitable small model and a stronger candidate. Reserve representative examples that were not used to choose prompts or settings. Separate common cases from expensive failures so that a good average cannot hide the latter.

For extraction, score field values and their assignment, not just valid JSON. For grounded answers, check whether the cited passage supports the claim and whether missing information leads to an appropriate refusal. For code, execute relevant tests and check required behavior. Record the checkpoint, chat template, quantization, context, reasoning mode and output budget for each run.

Then attribute errors: OCR, retrieval, tool output and generator reasoning require different interventions. Include retries, human corrections and latency in cost per usable output. A small model that needs repeated long attempts can consume more than a stronger model completing the task once.

Routing is a further option: send bounded work to a specialist and identified difficult cases to a stronger model. [RouteLLM](https://arxiv.org/abs/2406.18665) studies such quality–cost tradeoffs, but the routing decision also needs evaluation. A model's confident wording is not a reliable escalation policy.

A defensible choice names the workload, accepted quality, response-time target and serving capacity, then states where the smaller alternative fails and what the larger one improves. That comparison turns parameter count into a deployment decision.
