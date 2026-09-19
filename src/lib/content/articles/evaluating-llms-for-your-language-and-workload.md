---
title: Evaluating LLMs for your language and workload
slug: evaluating-llms-for-your-language-and-workload
translationGroup: evaluating-llms-for-your-language-and-workload
lang: en
date: '2026-09-02'
faDate: '2026-09-02'
draft: true
math: false
category: Language models
excerpt: Choose task-relevant benchmarks, preserve language and protocol scope, build representative examples, and compare quality, tools, latency and cost without mistaking fluency or a multilingual average for task success.
readTime: 12 min
cover: /images/articles/evaluating-llms-for-your-language-and-workload/cover.webp
related:
- enterprise-rag-model-embedding-reranker-en
- code-completion-assistant-and-agent-en
- four-bit-model-quantization-en
updated: "2026-09-19"
author: Mehran Ziabary
---

A fluent answer is the easiest part of a language-model demonstration to notice. Selection requires a closer look: did the model preserve a condition, keep the amount and unit, distinguish an unknown answer from a plausible invention, and finish within the service's time budget? “Good at a language” becomes useful only when it names the work and audience.

This article describes how a team can evaluate candidates for its own workload. It reports no experiments conducted by this site. The [LLM guide](/en/guides/llm/) distinguishes publisher or third-party results from calculated memory requirements; the [model-size article](/en/articles/right-model-size-for-the-task-en/) explains how to build an initial shortlist. The separate [Persian evaluation article](/articles/evaluating-language-models-for-persian/) focuses on Persian resources and is related reading, not another language edition of this general methodology.

## Start with the decision the test must support

A useful target might be: “Short answers to product-document questions, in the user's language, preserving amounts and identifiers and citing the supporting passage.” That definition tells us what examples to collect and which errors make an answer unusable.

Fluency, correctness, instruction following and audience fit should remain separate. Rewriting a letter, extracting fields, retrieving a passage and reconciling conflicting documents do not reward the same behavior. An application's interface can be English while its requests are Arabic, Spanish or multilingual; interface locale does not define evaluation language.

Specify the actual linguistic scope: formal or conversational text, domain terminology, scripts, regional conventions and mixed-language material. English-speaking users are not necessarily in the United States, and Spanish-speaking users are not necessarily in Spain. Currency, dates, names and acceptable tone should come from the intended audience, not an assumption attached to the language code.

## What kind of evidence answers the question?

| Evidence | What it can help compare | Boundary to preserve |
| --- | --- | --- |
| Knowledge or multiple-choice benchmark | Performance on its questions and scoring rule | It may not test source-grounded answering or free-form output |
| Instruction-following test | Compliance with the tested constraints | Following a format does not establish factual correctness |
| Retrieval benchmark | Finding relevant documents under its collection and metric | It is not a generator-quality score |
| Coding problem benchmark | Executable problem solutions under a stated budget | It does not directly measure editor latency or an autonomous repository agent |
| Agent benchmark | The model–scaffold–tool combination on those tasks | Different tools and attempt budgets change what is being compared |
| Team workload sample | Acceptance on the represented tasks | Its composition determines where the conclusion applies |

[MTEB's repository](https://github.com/embeddings-benchmark/mteb) and the [MMTEB paper](https://arxiv.org/abs/2502.13595) are useful for embedding evaluation across tasks and languages. Select the relevant retrieval task, dataset revision and language subset. An average over classification, similarity and retrieval is not the answer to a retrieval-only question; a multilingual average is not an individual language's score.

For coding, [LiveCodeBench](https://livecodebench.github.io/) and [SWE-bench](https://www.swebench.com/) answer different questions. A result belongs to its benchmark version, problem range and execution setup. The [coding-role article](/en/articles/code-completion-assistant-and-agent-en/) connects those distinctions to completion, assistance and agents.

## A multilingual label can hide several different experiments

A single-language result, a multilingual aggregate and a directed language pair should not share one meaning. English-to-Spanish translation differs from Spanish-to-English. A query in Spanish retrieving English documents differs from a Spanish query over Spanish documents. A dataset configuration called `default` does not establish English as its language.

Separate three kinds of evidence: the publisher lists a language; a reported evaluation measures a task in that language; an independent report evaluates a relevant configuration. Missing evidence means no recorded result, not documented lack of support. Likewise, naming a language in a model card does not establish the quality of every task in it.

Translated tasks are useful for cross-language comparisons, but can carry the source task's cultural assumptions and translation artifacts. Native material tests a different part of the problem. Keep native, translated and aggregated results identifiable rather than treating one as a replacement for the others.

For Spanish, [IberoBench](https://aclanthology.org/2025.coling-main.699/) covers Iberian languages, explicitly including European Spanish and European Portuguese alongside Basque, Catalan and Galician. Its 62 tasks and 179 subtasks, evaluated with zero- and five-shot settings, are not a claim of coverage of every Spanish-speaking community.

The [pinned SpanishBench task definitions](https://github.com/EleutherAI/lm-evaluation-harness/blob/f2131517dc2e00e6f6a062e254fa126f9e4426da/lm_eval/tasks/spanish_bench/README.md) separate reading, grammatical acceptability, mathematics, translation and other tasks. Version 1.2 changed a stop condition for its Spanish MGSM task. Even a harness detail can therefore change the interpretation of a score; record task and revision, not just “Spanish benchmark.”

<!-- reference:language-evidence:start -->

## What language-specific results change in a shortlist

[Table 6 of the E5 report](https://arxiv.org/html/2402.05672v1) gives the following MIRACL development-set nDCG@10 results on the report’s 0–100 scale:

| Model | English | Spanish |
|---|---:|---:|
| multilingual-e5-small | 48.0 | 51.2 |
| multilingual-e5-base | 51.2 | 51.5 |
| multilingual-e5-large | 52.9 | 52.9 |
| multilingual-e5-large-instruct | 51.5 | 53.7 |

Large-Instruct has the highest Spanish score among these four, while Large leads on English. The language slice changes the shortlist; the result does not establish statistical significance or conversational quality. Recall@100 describes coverage in a larger candidate pool and remains a separate metric. Neither measure tests Spanish queries retrieving an English collection.

The [Base](https://huggingface.co/intfloat/multilingual-e5-base) and [Large-Instruct](https://huggingface.co/intfloat/multilingual-e5-large-instruct) cards also publish classification results with dataset splits and revisions. They can inform intent-classification choices, but must not become a retrieval leaderboard. Two cards naming the same dataset revision do not establish the same classifier setup.

A pipeline comparison answers another question. In [Qwen’s reranker study](https://arxiv.org/html/2506.05176v3), every reranker receives the top 100 candidates from Qwen3-Embedding-0.6B. MTEB-R changes from 61.82 for the baseline to 65.80 with the 0.6B reranker: 3.98 score points within this experiment. The report does not turn those points into faster responses or a measured gain in generated-answer correctness.

The Spanish task results on the [Salamandra 2B](https://huggingface.co/BSC-LT/salamandra-2b-instruct) and [7B](https://huggingface.co/BSC-LT/salamandra-7b-instruct) cards add specific generation candidates to this evidence map. These separate cards do not establish a common evaluation protocol or coverage of every regional variety of Spanish.

[Labeled language and task comparisons](/en/guides/llm/?show-drafts=true&reference-group=comparison%3Ae5-miracl-by-language#reference-comparisons) retain the metric, source and settings behind each result.

<!-- reference:language-evidence:end -->

## Build a small sample that reveals errors

An initial collection of roughly 100–200 cases can help find failure patterns and remove unsuitable candidates. It is a practical starting scale, not a statistically sufficient sample for every conclusion. A sensitive decision or a small difference needs more evidence than an obvious mismatch.

Collect examples from real work, removing unnecessary confidential details. Before viewing outputs, record the input, permitted evidence, acceptance requirements and costly errors. If a question is ambiguous, either clarify it or explicitly test whether the model asks for clarification.

Keep two collections distinguishable: a representative mix approximating ordinary traffic, and targeted difficult cases. Deliberately oversampling rare failures is useful for diagnosis, but its average is not an estimate of everyday service success.

The following are **authored educational examples**, not benchmark items or measured results:

| Property | Example input or task | Acceptance requirement |
| --- | --- | --- |
| Negation and workflow stages | “Incomplete applications are registered, but not reviewed until documents arrive.” Ask whether they are never registered. | Distinguish registration from review and correct the premise |
| Amount and unit | Extract amount and currency from “The fee is 250.00 EUR.” | Preserve both fields; no unrequested conversion |
| Date ambiguity | A source says `03/04/2026` without a locale convention. Ask for an unambiguous date. | Ask or retain ambiguity rather than inventing day/month order |
| Identifier integrity | Summarize a message containing `REQ-0142` and `v2.3.1`. | Keep the exact identifier and version |
| Missing evidence | A document specifies response hours but no price. Ask for the price. | State that the price is not supplied; do not fabricate an amount |
| Conversation state | The user specifies Linux, then later asks where to place a configuration file. | Retain the platform and ask for missing software details |
| Output contract | Produce two sentences or a specified JSON schema without losing an exception. | Meet both the format and semantic requirement |

Use the actual input quality: fragments, OCR, mixed terminology and informal messages if those occur in service. Attribute extraction errors separately from generator errors. A model receiving a corrupted amount has not been tested on the correct original document.

## Acceptance gates before a combined score

For exact outputs, check identifiers, amounts, required fields and citation targets directly. For open answers, define a rubric precise enough for reviewers to explain disagreement. A zero-to-two scale can be useful if examples anchor each level:

| Dimension | 2 | 1 | 0 |
| --- | --- | --- | --- |
| Correctness and completion | Required result is correct and complete | Partly correct with a material omission | Core result wrong or task unperformed |
| Evidence support, when applicable | Required claims supported and uncertainty clear | Incomplete support for a needed claim | Central claim invented or contradicted |
| Instruction following | Required scope, length and format respected | Repairable deviation | Essential constraint violated |
| Language and audience fit | Clear, natural and appropriate | Understandable but needs editing | Wording or tone obstructs use |

This is an example rubric, not a validated universal standard. Evidence support is not applicable to every task; marking it zero for an unrelated task would distort the result. A wrong amount or omitted exception should not be compensated by polished prose. Define mandatory gates, then compare style, time and cost among usable answers.

If an overall score is useful, set category weights before seeing the winner and publish the component results. Multiple correct paraphrases should be accepted when wording itself is not the task.

## Normalize presentation without deleting meaning

Exact match is appropriate for an identifier but can be too strict for a natural-language answer. Controlled normalization may ignore extra spaces or an equivalent digit representation. It must not erase minus signs, units, version punctuation, negation or distinctions inside an identifier.

Semantic similarity has the opposite weakness: two almost identical sentences can give opposite permission because one contains “not.” Combine semantic review with direct checks for sensitive fields. A regional wording preference should not become the only definition of correct language unless that style is an explicit product requirement.

## Human review and model judges have different jobs

Present answers without model names and vary their order. Have two reviewers independently score part of the sample before resolving disagreement. Language fluency and domain knowledge are both needed; a reviewer can judge prose well without being qualified to validate a specialist answer.

An LLM judge can expand coverage, but compare it with human judgments on the same language and task. The [MT-Bench and Chatbot Arena judge study](https://arxiv.org/abs/2306.05685v4) examines effects including answer order and verbosity. Clear rubrics, anchored examples, ties and swapped answer positions help expose such effects.

Review a random sample of all outputs as well as disputed and high-impact cases. Looking only at cases the judge itself flags misses confident judging errors. Use deterministic checks for arithmetic, schemas and executable behavior where available; do not ask a language judge to guess what a calculator or test suite can establish exactly.

Reference answers should not come solely from one competitor's unchecked outputs. Otherwise the evaluation can reward resemblance to that model instead of successful work.

## Evaluate the model and the pipeline separately

For document answering, first provide correct evidence directly to each generator. Then run the same questions through the complete retrieval pipeline. If direct evidence fixes the answer, inspect document extraction, retrieval, reranking and context selection before replacing the generator. The [RAG component guide](/en/articles/enterprise-rag-model-embedding-reranker-en/) explains the relevant measurements.

For retrieval, measure whether all necessary evidence appears in the first k results and survives reranking. For generation, measure support and citation correctness. For coding, execute the patch within the required environment. For an agent, record the scaffold, tool set, permissions, stopping conditions and attempts. A knowledge score or a code-answer score is not evidence that the full agent completes a repository task.

## Make the comparison reproducible and appropriately scoped

Hold questions, permitted evidence, acceptance criteria and work budget comparable. Use each model's correct chat template rather than imposing a broken common format. Record examples in the prompt, reasoning mode, token budget, temperature, tool access and the rule for selecting an answer after repeated attempts.

Keep prompt-development cases separate from the final evaluation. Near-duplicate questions or several questions from one source document can leak across a naive random split. Repeatedly adjusting the prompt after looking at test failures turns that test into development material. Public benchmark overlap with training is a design concern, but a high score by itself does not prove contamination.

Suppose, **hypothetically**, one model answers 81 of 100 items correctly and another 78. The three-item gap alone does not establish general superiority. Which items differ, how cases were sampled and whether several come from one document all matter. The [guide to statistical significance in NLP](https://aclanthology.org/P18-1128/) discusses choosing methods according to the task and design. Report uncertainty around the relevant comparison rather than treating every small score change as a ranking.

For a stochastic generator or agent, define repetitions and answer selection in advance. Best-of-many for one model versus first-attempt for another compares different budgets. For hosted APIs, retain the reported model version and execution date; for local models, identify the artifact and quantization. A source-document commit is not automatically the tested-weight revision.

## Add serving time and cost after defining useful output

Use the same required text and task across models, then count each tokenizer's actual tokens. Tokens are not a language-independent unit of user experience. Record time to the first useful response, whole-task time, output truncation and retries alongside token rate.

Evaluate the deployable variant: exact model, quantization, engine, context and concurrent load. A source checkpoint's quality score does not validate every four-bit conversion, and one completed request does not establish multi-user capacity. The [quantization article](/en/articles/four-bit-model-quantization-en/) and [GPU memory comparison](/en/articles/llms-on-rtx-4090-24gb-vs-48gb-en/) separate those effects.

Cost per accepted task should include failed attempts and human correction under the same acceptance conditions. A smaller model can serve the routine route while difficult cases go elsewhere, but routing quality needs its own evidence. Confident language is not a reliable escalation signal.

## A report that can guide the next change

| Report section | Information needed for a decision |
| --- | --- |
| Work and audience | Task, target language/variety, domain and expected output |
| Configuration | Checkpoint/artifact, engine, prompt, reasoning, quantization and tools |
| Evaluation data | Source/revision, category counts, development split and difficult-case set |
| Scoring | Acceptance gates, normalization, rubric and human/judge contribution |
| Quality result | Category results, accepted outputs, recurring errors and uncertainty |
| Service result | Input/output lengths, demand, latency, completion time and attempt costs |

The conclusion should name the boundary: this configuration meets these requirements for these represented tasks, while identified classes need another route. That is more useful than declaring a universal language winner. It also identifies what must be revisited when documents, prompts, models, execution software or the user population change.
