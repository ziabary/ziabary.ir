---
title: Code completion, assistants and coding agents need different selection criteria
slug: code-completion-assistant-and-agent-en
translationGroup: code-completion-assistant-and-agent
lang: en
date: '2026-08-24'
faDate: '2026-08-24'
draft: true
math: false
category: Language models
excerpt: 'Choose models by role: responsive FIM suggestions, correct guided repairs or accepted repository tasks. Compare candidate checkpoints, benchmark scope, tool environments and cost per completed task.'
readTime: 11 min
cover: /images/articles/code-completion-assistant-and-agent/cover.webp
related:
- enterprise-rag-model-embedding-reranker-en
- llms-on-rtx-4090-24gb-vs-48gb-en
- four-bit-model-quantization-en
updated: "2026-09-19"
author: Mehran Ziabary
---

<script>
  import LlmReferenceGuidance from '$lib/components/LlmReferenceGuidance.svelte';
</script>

A development team may use “AI for coding” for three different requests: suggest the next lines while someone types, explain and repair a function, or take an issue through repository search, edits and tests. Those jobs do not need the same model, memory or quality measure. Choosing a large model for all three can increase latency and cost without proportionately increasing completed work.

A small code specialist is a serious starting point for completion and bounded assistance. As the task moves toward dependencies across files, uncertain causes and repeated tool use, reasoning and recovery become more important. The [model-size guide](/en/articles/right-model-size-for-the-task-en/) explains the general selection logic; here the roles get separate acceptance criteria.

## Three roles behind the same editor window

| Role | Example request | Expected output | Main selection criterion |
| --- | --- | --- | --- |
| Completion | Suggest the rest of this expression or function | Short code compatible with the cursor's surroundings | Time to a useful suggestion and code accepted and retained |
| Assistant | Explain this failure and fix this section | A correct explanation or bounded change under developer direction | Correct repair and reduced understanding/review time |
| Coding agent | Find this issue, fix it and run the tests | A reviewable patch after search, editing and execution | Accepted tasks, completion time and cost per success |

These are different jobs, not a progression from inferior to superior. A multi-step agent is unnecessary for completing a variable name. A fast completion model has not demonstrated repository-level reasoning merely by generating several correct functions. One product may use different models for these modes.

<!-- reference:coding-evidence:start -->

### Read evidence for the intended coding workflow

[StarCoder2-3B’s card](https://huggingface.co/bigcode/starcoder2-3b) reports pass@1 of 31.7 on HumanEval and 27.4 on HumanEval+. Keep this base model in the completion category; those scores do not measure multi-file agent success or chat usefulness. For instruction assistants, [Qwen’s](https://huggingface.co/Qwen/Qwen3-4B-Instruct-2507) different ordering on LiveCodeBench and Aider-Polyglot is a useful counterexample to a single coding rank. If tools, attempt budgets or agent harnesses differ, a shared benchmark name is insufficient for a combined leaderboard.

<LlmReferenceGuidance locale="en" ids={["guidance:coding"]} />

<!-- reference:coding-evidence:end -->

## Completion has to arrive before the developer moves on

A suggestion that appears after the user has typed the expression or moved the cursor loses much of its value. Measure the time from the editor request to a usable suggestion, including context preparation, network transit, queueing and generation. Busy-period behavior and the 95th percentile reveal delays hidden by an average token rate.

Fill-in-the-middle, or FIM, provides both the prefix and suffix around the insertion point using the model's special format. A proposed body must fit an existing function signature and the code after the cursor. [Qwen2.5-Coder-1.5B](https://huggingface.co/Qwen/Qwen2.5-Coder-1.5B) documents FIM for its base checkpoint and does not recommend that checkpoint as a chat replacement. [StarCoder2-3B](https://huggingface.co/bigcode/starcoder2-3b) is also FIM-trained rather than instruction-tuned.

An initial comparison can include roughly 1–3B specialists and a 7B candidate. This is a shortlist, not a performance guarantee. [Continue's completion configuration](https://docs.continue.dev/ide-extensions/autocomplete/model-setup) illustrates role-specific model selection rather than using one chat choice everywhere.

Acceptance rate alone can mislead: developers may accept a suggestion and immediately delete most of it. Track retained code after a defined interval, latency and disruption. Cancelling obsolete requests when typing continues and limiting suggestion length are part of the product design; a larger checkpoint does not supply them automatically.

## Assistance is valuable when the repair is correct

For explanations, tests and bounded changes, an Instruct or Chat checkpoint is usually a better starting point than a base completion model. Compare a 3–8B code model with a stronger candidate for the difficult task categories, rather than averaging all work into one score.

Context often determines whether an answer is useful. A stack trace alone can lead to an invented API or type assumption. The same model given the function signature, relevant types, dependency version and failing test has a more concrete problem. A large context limit is helpful only when the necessary information is included; many unrelated files do not replace the correct definition.

A JSON transformation with a fixed schema is different from diagnosing a concurrency bug across services. The latter involves event ordering, side effects and incomplete evidence. For deterministic renames or formatting, existing refactoring and formatter tools should remain candidates.

Evaluate real errors and changes from the team's work: does the patch compile, pass relevant tests, preserve required behavior and take less effort to review? Fluency in the developer's natural language, code correctness and framework knowledge are separate properties. Include the actual mixture of natural-language requests, code and documentation used by the team.

## An agent is a model plus an execution system

A coding agent chooses its next action from the previous result. It may search the repository, read files, form a hypothesis, edit code, run tests and revise after a failure. Tool selection, retaining relevant state and recovering from a wrong path all affect success.

The agent framework or scaffold defines tools, error feedback, history handling and stopping conditions. [mini-SWE-agent](https://mini-swe-agent.com/latest/) demonstrates a simple bash-based interaction loop and linear history; a dedicated structured tool-calling interface is not the only way to build an agent. What matters is that the model follows the actual interaction contract.

For structured tool calls, the chat template, argument representation and output parser must agree. [vLLM's tool-calling documentation](https://docs.vllm.ai/en/stable/features/tool_calling/) describes model-specific parsers and settings. An OpenAI-compatible HTTP response does not establish correct tool execution or continuation of an agent loop.

Small models remain candidates for bounded repairs. Ambiguous issues, dependent files, library migrations and repeated debugging justify including models trained for agentic coding. A cheaper individual call can still produce a more expensive task if it triggers irrelevant edits, many retries or constant human intervention.

## Specific candidates by role

The table is an editorial shortlist illustrating role differences, not an exhaustive market ranking. Parameter counts refer to the linked checkpoints.

| Model | Published size | Initial role | Decisive distinction |
| --- | --- | --- | --- |
| [Qwen2.5-Coder-1.5B](https://huggingface.co/Qwen/Qwen2.5-Coder-1.5B) | 1.54B | FIM completion | Base checkpoint, not a direct chat replacement |
| [StarCoder2-3B](https://huggingface.co/bigcode/starcoder2-3b) | 3B | Completion and local suggestions | FIM training; not instruction-tuned |
| [Qwen2.5-Coder-7B-Instruct](https://huggingface.co/Qwen/Qwen2.5-Coder-7B-Instruct) | 7.61B | Explanations, bounded debugging and guided edits | Assistant success does not establish multi-step agent success |
| [Qwen3-Coder-30B-A3B-Instruct](https://huggingface.co/Qwen/Qwen3-Coder-30B-A3B-Instruct) | 30.5B total; 3.3B active | Advanced assistance and agent tasks | MoE, model-specific tool format; storage follows total weights |
| [Devstral-Small-2-24B-Instruct-2512](https://huggingface.co/mistralai/Devstral-Small-2-24B-Instruct-2512) | 24B | Repository changes and coding agents | “Small” is a family label, not a few-billion parameter count |
| [Qwen3-Coder-Next](https://huggingface.co/Qwen/Qwen3-Coder-Next) | 80B total; 3B active | Agent work with sufficient deployment memory | Hybrid attention and MoE; not the footprint of a dense 3B model |

The listed Qwen and Devstral cards identify Apache-2.0, while StarCoder2 uses BigCode OpenRAIL-M. Quantized artifacts also need an identifiable publisher, base checkpoint and supported engine path. A GGUF file alone does not show that the editor extension uses its FIM or tool template correctly. The [model catalog](/en/guides/llm/#model-catalog) links identities and artifacts.

## Match the benchmark to the job

[LiveCodeBench](https://livecodebench.github.io/) evaluates programming problems with identifiable publication periods, including code generation and related tasks. It informs problem-solving comparisons, but does not directly measure the delay of an editor suggestion or the quality of an organizational repository patch. Benchmark version and problem time range belong with the score.

[SWE-bench](https://www.swebench.com/) concerns repository issue resolution. Verified is a human-filtered set of 500 tasks; the Bash Only view holds the mini-SWE-agent environment common. To attribute a difference to the model, control the scaffold and environment. To choose a final product, evaluate the entire combination.

Benchmark design itself needs scrutiny. [OpenAI's audit of SWE-bench Verified](https://openai.com/index/why-we-no-longer-evaluate-swe-bench-verified/) reports problematic tests and contamination in its analysis. In a [follow-up audit on 8 July 2026](https://openai.com/index/separating-signal-from-noise-coding-evaluations/), OpenAI also withdrew its earlier recommendation to adopt SWE-bench Pro after finding problems in its tasks. These are attributed critiques of evaluation evidence, not substitute scores for the team's work. Representative issues and review of the final patch remain necessary when public tests miss local requirements.

| Role | Evaluation close to actual use | What to record | What it does not prove |
| --- | --- | --- | --- |
| Completion | Replay insertion points, then observe real editor use | Useful-suggestion latency, acceptance, retention, language and file type | Algorithmic problem scores do not guarantee fast typing support |
| Assistant | Team questions, bugs and bounded edits with execution tests | Correctness, preserved behavior, review time and dependency version | Compiling or sounding convincing is not behavioral correctness |
| Agent | Repository tasks with acceptance criteria, alongside public benchmarks | Model, scaffold, tools, environment, time/attempt budget, success and cost | Different systems' success rates do not isolate weight quality |

Passing tests written only by the agent is insufficient. Existing relevant tests and task requirements must survive. Deleting a failing test or weakening its assertion does not resolve the issue. Conversely, a test can itself be incomplete or overspecific, which is why the acceptance criteria and patch review must accompany the automated result.

## Relevant code before fine-tuning

Symbol search, language-server definitions and references, compiler errors and version-correct documentation can supply project knowledge at request time. Semantic search helps find concepts, but exact function names, paths and error messages need exact tools too. The [RAG stack article](/en/articles/enterprise-rag-model-embedding-reranker-en/) separates retrieval from generation; code adds symbols and dependency structure.

If the model misses a new internal API definition, supplying that definition is more direct than retraining. If it repeatedly violates a fixed output convention despite adequate information, adaptation becomes a different, potentially useful intervention. The [RAG and tuning comparison](/en/articles/rag-cag-kag-fine-tuning-instruction-tuning-en/) explains that distinction.

## A shared service needs workload-aware scheduling

Completion produces many short, latency-sensitive requests. An agent may use long inputs, several generation rounds and pauses for tools. A common undifferentiated queue can allow long agent work to delay short suggestions. Separate queues or resources can therefore matter more than a uniform model upgrade.

| Team workload | Deployment to examine | Main constraint |
| --- | --- | --- |
| Suggestions for many editors | A ready small FIM model, short queue and replicas if needed | Network/queue latency and bursts of short generation |
| Code discussion and bounded repairs | Small or medium Instruct model with relevant context and escalation | Repair quality, input length and active-context memory |
| Agents for multi-file tasks | Tool-suitable model, isolated execution per task and defined resource limits | Task success, retries, tests and CPU/RAM/GPU use |

Ollama, vLLM, SGLang and llama.cpp provide model execution or serving paths. The editor extension and agent framework provide completion behavior, conversation and the tool loop. Compare checkpoint, format, FIM, tool handling and load behavior in the [software table](/en/guides/llm/#serving-software), rather than inferring supported users from an engine name.

## Memory and cost belong to the completed task

A 24 GB card such as RTX 4090 is worth examining for small completion models and many bounded assistant configurations. Actual fit depends on weights, runtime, context and active requests. It does not imply maximum context or a particular user count; the [24/48 GB article](/en/articles/llms-on-rtx-4090-24gb-vs-48gb-en/) distinguishes those budgets and multi-card arrangements.

MoE active counts are particularly easy to misread. Using publisher-rounded totals of 30.5B for Qwen3-Coder-30B-A3B and 80B for Qwen3-Coder-Next, an **idealized raw four-bit calculation** gives **15.25 GB** and **40 GB** respectively. These decimal values exclude scales, higher-precision tensors, KV and workspace. They are neither real artifact sizes nor minimum VRAM. Similar active counts do not erase the storage difference.

Quantization must be assessed in the chosen role: retained suggestions for completion, correct changes for assistance and whole-task success for an agent. The [four-bit article](/en/articles/four-bit-model-quantization-en/) explains why smaller files do not automatically deliver faster or equally accurate service.

For agents, use total execution, failed attempts and human review cost divided by accepted tasks under the same quality criterion. Report the time/resource ceiling and success rate too; dropping difficult tasks must not make one system appear artificially cheaper. A stronger model can be economical by finishing in fewer attempts, while a smaller one can deliver equivalent bounded work with fewer resources.

A GPU upgrade cannot shorten every stage. Dependency installation, builds, browser tests and long test suites also use CPU, RAM, storage and external resources. Inspect where time goes before assigning the bottleneck to generation.

## Build a role-specific comparison

Separate actual team requests into the three roles and define representative tasks with acceptance criteria. Compare a small FIM model for completion, a small or medium code Instruct model for assistance and two model–environment combinations for agent work. Exercise the agent's full read–edit–execute–observe loop; exercise completion during actual typing. Failure in one role does not disqualify a model from every other role.

The agent's tool and repository scope also belong to the product: isolated task environments and reviewable changes limit the effect of mistakes. Repository text is data to inspect, not automatic authority to expand access. The final design may use two shared models or three separate ones, provided each role meets its own quality, time and cost requirements.
