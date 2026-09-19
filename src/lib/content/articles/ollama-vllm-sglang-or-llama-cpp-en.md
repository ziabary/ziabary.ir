---
title: 'Ollama, vLLM, SGLang or llama.cpp: choosing an inference engine'
slug: ollama-vllm-sglang-or-llama-cpp-en
translationGroup: ollama-vllm-sglang-or-llama-cpp
lang: en
date: '2026-09-15'
faDate: '2026-09-15'
updated: "2026-09-19"
draft: false
math: false
category: Language models
excerpt: How scheduling, KV cache, model formats and operational controls change the choice of inference engine, with a worked memory example and a reproducible comparison method.
readTime: 13 min
cover: /images/articles/ollama-vllm-sglang-or-llama-cpp/cover.webp
related:
- single-user-to-enterprise-llm-serving
- four-bit-model-quantization
- llms-on-rtx-4090-24gb-vs-48gb
- enterprise-rag-model-embedding-reranker
author: Mehran Ziabary
---

The first answer from a model rarely exposes the difficult part of serving it. The difficulty arrives when one user sends a long document, another expects immediate code completion, and several conversations are generating at once. The inference engine decides how those requests share memory and execution time. A model that fits on a GPU can still make an unsatisfactory service.

For a shared API with explicit latency targets, vLLM and SGLang are useful starting candidates because scheduling, memory management and service metrics are central to their design. For local development and heterogeneous hardware, Ollama and llama.cpp offer different practical advantages. This is an architectural shortlist, not a measured speed ranking. The discussion below reflects the documentation reviewed in September 2026 and identifies the releases and execution paths behind the comparison.

## Separate the model, engine, API and interface

Model weights, an inference engine, an HTTP server and a chat interface are distinct layers. A friendly interface can remain in place while the engine behind it changes. Conversely, putting an API gateway in front of an engine does not change the engine's memory requirements.

| Tool | Useful starting point | What it makes easier | Work that remains outside it |
|---|---|---|---|
| Ollama | Local development and bounded internal tools | Downloading, managing and running models through an API | Admission policy, resource budgets and service operations |
| vLLM | A shared model API with concurrent demand | Scheduling, KV memory management and execution controls | Deployment topology, quality gates and workload tuning |
| SGLang | Serving with repeated prefixes and more demanding scheduling | Prefix reuse, execution backends and distributed serving paths | Cache policy, routing and operational complexity |
| llama.cpp | GGUF on CPU, Apple Silicon or mixed CPU/GPU systems | Broad hardware support with relatively few dependencies | Backend configuration, slot capacity and external service management |

The projects' [Ollama](https://github.com/ollama/ollama), [vLLM](https://github.com/vllm-project/vllm), [SGLang](https://docs.sglang.io/) and [llama.cpp](https://github.com/ggml-org/llama.cpp) documentation supports these capabilities. The application choices in the table are editorial recommendations. Neither vLLM nor SGLang requires a multi-GPU deployment, and llama.cpp is more than a command-line demonstration.

## Connections, queued requests and active sequences

A server can keep 100 HTTP connections open while executing only a few requests. Some clients are waiting in a queue; others have active sequences whose KV cache occupies memory. Concurrent requests can share one loaded set of weights. They do not necessarily require 100 copies of the model.

Autoregressive outputs also finish at different times. Iteration-level scheduling, described in [Orca](https://www.usenix.org/conference/osdi22/presentation/yu), allows completed requests to leave and new ones to enter the working batch. The practical benefit depends on scheduling policy and the mix of prompt and output lengths.

| Mechanism | Resource or stage it addresses | Boundary of the benefit |
|---|---|---|
| Continuous batching | Utilization as requests enter and finish | Higher aggregate throughput can still mean slower individual responses |
| PagedAttention | Block-based allocation of KV cache | It reduces allocation waste; it does not create unlimited memory |
| Prefix caching | Repeated computation over shared input prefixes | Output generation still has to run |
| Chunked prefill | Long input processing alongside ongoing generation | Chunk size changes the latency trade-off |
| FlashAttention | Data movement within attention computation | It does not replace a request scheduler or replica manager |

The underlying [PagedAttention](https://arxiv.org/abs/2309.06180) and [FlashAttention](https://arxiv.org/abs/2205.14135) papers address different layers. A product listing both features is not evidence that it will achieve another product's published throughput.

## Ollama: convenient operation has real value

Ollama is useful when changing models and connecting a local application should take little effort. Its [import paths](https://docs.ollama.com/import) include GGUF and supported Safetensors models. A file extension alone does not establish support for an architecture, tokenizer or multimodal component.

The [Ollama FAQ](https://docs.ollama.com/faq) describes parallel requests, multiple loaded models and distributing a model across GPUs. It prefers a single GPU when the model fits there. Describing Ollama as inherently single-request or unaware of multiple GPUs therefore misses the actual decision: how much scheduling control and operational visibility the service needs.

Defaults matter. In the [v0.34.1 configuration source](https://github.com/ollama/ollama/blob/v0.34.1/envconfig/config.go), `OLLAMA_NUM_PARALLEL` defaults to 1. `OLLAMA_MAX_LOADED_MODELS` controls loaded models, while `OLLAMA_MAX_QUEUE` controls waiting requests. Increasing the second variable is not a request to create that many independent replicas of one model.

Model switching can introduce loading delays when memory is tight. The `keep_alive` setting and `ollama ps` help manage residency and inspect CPU/GPU placement. Keeping several models warm consumes memory even when requests are infrequent. Migration becomes worth considering when the surrounding queue, metrics and routing machinery costs more to maintain than adopting an engine designed around those requirements.

## vLLM: make capacity a configurable property

vLLM's block-based KV management addresses the gap between loading weights and accommodating growing conversations. Its controls distinguish maximum sequence length, active sequences and a scheduler's token budget. Those are three separate constraints.

The [V1 optimization guidance](https://docs.vllm.ai/en/stable/configuration/optimization/) explains chunked prefill and the interaction between prefill and decode. A larger token budget can help one part of the workload while delaying another. Memory pressure can cause preemption and repeated computation, so a high concurrency limit is not automatically productive capacity.

A small model on one GPU can benefit from this scheduling. Conversely, an occasional local request may gain little from adopting a more involved deployment. The relevant comparison includes dependency management and upgrades as well as delivered throughput.

In the [Targoman operational report, in Persian](/articles/targoman-300-concurrent-requests-one-rtx-4090/), the service used an NVIDIA-distributed vLLM version and limited changes around its API. Requests that had not started responding within 20 seconds were cancelled in the engine as well as at the client-facing layer. This illustrates control of request lifetime; it is not a benchmark proving vLLM faster than the other engines.

## SGLang: reuse and routing belong in the design

The original [SGLang work](https://arxiv.org/abs/2312.07104) introduced RadixAttention for managing shared prefixes. Repeated instructions, multi-turn conversations and agents returning with overlapping histories can make reuse valuable. Similar-looking text is not enough: the reusable prefix must match at the token and execution level required by the implementation.

[HiCache](https://docs.sglang.io/docs/advanced_features/hicache_design) extends cache management across GPU, host and storage tiers. The [Model Gateway](https://docs.sglang.io/docs/advanced_features/sgl_model_gateway) adds routing that can account for workers and cache locality. These introduce transfers and operational components of their own; they are not mandatory additions to every small server.

vLLM also supports [automatic prefix caching](https://docs.vllm.ai/en/stable/features/automatic_prefix_caching/). The comparison is therefore about the supported model, backend and workload, not possession of a feature name. Sending all similar requests to one worker can preserve cache hits while creating an unacceptable queue.

## llama.cpp: a small dependency footprint can include a server

llama.cpp supports CPU execution and backends including Metal, CUDA and Vulkan. Mixed CPU/GPU execution can make a model accessible when GPU memory alone is insufficient. That changes data movement and latency; it does not turn host memory into GPU memory with identical bandwidth.

The documented [`llama-server` in v0.4.1](https://github.com/ggml-org/llama.cpp/blob/v0.4.1/tools/server/README.md) includes parallel slots, continuous batching, prompt caching, metrics and a router mode for multiple models. A GGUF service can therefore be a deliberate deployment choice. Multi-host operations and the capacity remaining after a failure still require surrounding infrastructure.

For an intermittently used local tool, accepting a longer response in exchange for smaller GPU requirements may be attractive. For an interactive shared service, that same exchange can create a queue. [Layer-wise inference and AirLLM (in Persian)](/articles/airllm-layer-wise-inference/) develops the transfer-cost side of this decision.

<!-- reference:mac-path:start -->

### Apple silicon: the MLX LM route

For local Apple silicon use, [MLX LM](https://github.com/ml-explore/mlx-lm) provides text generation, streaming, prompt caching, quantization and fine-tuning for compatible models. Include it as a direct runtime route even though it is not a graphical model manager. Documented features are not measured speed guarantees. The macOS 15 note in the Large Models section concerns memory wiring; it should not be presented as the universal minimum for every feature.

<!-- reference:mac-path:end -->

## File format is not precision or execution support

[GGUF](https://github.com/ggml-org/ggml/blob/master/docs/gguf.md) packages tensors and metadata; it is not a synonym for four-bit weights. [Safetensors](https://huggingface.co/docs/safetensors/index) is also a storage format. AWQ, GPTQ and FP8 describe different aspects of representation and execution. The [quantization article (in Persian)](/articles/four-bit-model-quantization/) separates these decisions.

llama.cpp and Ollama provide established GGUF paths. The reviewed [vLLM GGUF documentation](https://docs.vllm.ai/en/stable/features/quantization/gguf/) describes an experimental path requiring `vllm-gguf-plugin`. It is inaccurate both to say vLLM cannot run GGUF and to assume this path has every capability of its main execution routes. SGLang's [quantization support](https://docs.sglang.io/docs/advanced_features/quantization) likewise needs to match the checkpoint and hardware backend.

Comparing Q4 in one engine with BF16 in another changes more than the engine. A controlled engine comparison should hold those choices fixed where supported. A complete-solution comparison may choose a different acceptable configuration for each tool, but its result belongs to those configurations.

## A memory calculation that changes the choice

Consider an **educational full-attention model**, not a benchmark result: 32 layers, 8 KV heads per layer, head dimension 128 and two-byte KV elements. Raw KV storage per token is:

`2 × 32 × 8 × 128 × 2 = 131,072 bytes = 128 KiB`

The first factor represents keys and values. In grouped-query attention, use the KV-head count rather than the query-head count. For 8,192 retained tokens, one sequence needs exactly 1 GiB of raw KV.

| Active sequences | Retained tokens per sequence | Raw KV in this example |
|---:|---:|---:|
| 1 | 8,192 | 1 GiB |
| 8 | 8,192 | 8 GiB |
| 16 | 8,192 | 16 GiB |
| 8 | 32,768 | 32 GiB |

These tokens include accumulated input and output. The table excludes prefix sharing, cache quantization, allocation overhead, model weights and workspaces. It assumes each sequence has actually reached the stated length; a dynamically allocating engine need not reserve every request's maximum immediately. MLA, hybrid attention and sliding-window layers require their own treatment.

The last row exceeds 24 GiB before loading any weights. A model running successfully for one user therefore says little about eight long conversations. [Choosing model size (in Persian)](/articles/right-model-size-for-the-task/) and [24 versus 48 GB on an RTX 4090 (in Persian)](/articles/llms-on-rtx-4090-24gb-vs-48gb/) connect this budget to actual choices.

## Configuration names are not interchangeable units

| Goal | Ollama | vLLM | SGLang | llama-server |
|---|---|---|---|---|
| Context limit | `num_ctx`, `OLLAMA_CONTEXT_LENGTH` | `--max-model-len` | `--context-length` | `--ctx-size`, interpreted with slot/KV mode |
| Parallel execution | `OLLAMA_NUM_PARALLEL` | `--max-num-seqs` | `--max-running-requests` | `--parallel` |
| Memory allocation | Model, context and parallelism budgets | `--gpu-memory-utilization` or explicit KV budget | `--mem-fraction-static` | KV settings, GPU layers and model splitting |
| Scheduler input work | Service-level admission | `--max-num-batched-tokens` | `--chunked-prefill-size` | Batch and micro-batch controls |
| Observability | `ollama ps`, API timings | `/metrics` | `--enable-metrics` | `--metrics` and slot status |

The [vLLM argument reference](https://docs.vllm.ai/en/stable/cli/serve/) and [SGLang tuning guide](https://docs.sglang.io/docs/advanced_features/hyperparameter_tuning) define different memory fractions. Neither is a percentage limit on GPU compute utilization. High reserved memory in a system monitor can coexist with an idle model. In llama-server, inspect the reported per-slot capacity rather than assuming every slot receives the entire `ctx-size` value.

## Multiple GPUs: replicas or one distributed model?

If a model and its working memory fit on each GPU, independent replicas can process independent requests. Tensor or pipeline parallelism divides one model instance instead. Communication topology and architecture constraints influence whether that division is feasible and useful; a tensor-parallel degree of three is not valid for every model.

Three replicas on one host also do not survive loss of that host. [Enterprise serving (in Persian)](/articles/single-user-to-enterprise-llm-serving/) separates replica count, failure domains and spare capacity. On GPUs without NVLink, the [vLLM parallelism guide](https://docs.vllm.ai/en/stable/serving/parallelism_scaling/) includes pipeline parallelism among the paths to consider. More cards alone do not establish a throughput multiplier.

## API compatibility and operational control

An API-compatible endpoint reduces client changes, but chat templates, sampling defaults, stop conditions and streaming behaviour can still differ. Tool calls require the model, template, parser and client to agree; JSON that parses successfully is not necessarily a correct tool invocation. The [vLLM tool-calling documentation](https://docs.vllm.ai/en/stable/features/tool_calling/) makes those parser choices explicit.

Embedding and reranking should be checked separately. Pooling, normalization and output dimension must match the index already built. A generation engine's token rate is not a retrieval-quality measure. The [RAG stack article (in Persian)](/articles/enterprise-rag-model-embedding-reranker/) explains when separating these services prevents document ingestion from disrupting interactive generation.

For operations, collect queue time, time to first token, inter-token latency, completion time, error rate and accepted work. The [vLLM metrics](https://docs.vllm.ai/en/stable/usage/metrics/) and [SGLang metrics](https://docs.sglang.io/docs/references/production_metrics) provide engine-side observations; network, retrieval and tool time still need application measurements.

| Symptom | Useful first distinction |
|---|---|
| Slow first answer after inactivity | Loading and warm-up versus generation |
| First-token delay rises under load | Queue, prefill or an upstream retrieval stage |
| High total token rate but unhappy users | Aggregate throughput versus individual latency |
| Memory failures with long documents | KV growth versus prefill workspace |
| Repeated preemption | Memory pressure and recomputation |
| Worse cache reuse after adding replicas | Routing locality versus balanced load |

An exposed inference port is not a complete access boundary. [Ollama's local API authentication policy](https://docs.ollama.com/api/authentication) and [vLLM's security guidance](https://docs.vllm.ai/en/stable/usage/security/) warrant explicit proxy, network and endpoint policies. A cloud-enabled product also needs a verified local execution path when data must remain on premises. Logging, cancellation propagation and request limits belong in the deployment configuration.

## Make the comparison reproducible

Use the same accepted task categories: short and long inputs, short and long outputs, required languages and tool calls. Distinguish cold starts, warm execution and warm prefix caches. Control arrival rate as well as concurrent clients; a client that slows down with the server can hide the backlog an external demand spike would create.

Record weight and tokenizer revisions, engine version, quantization, template, backend and dependency versions. Inspect startup logs for fallback kernels. Report latency distributions and failures alongside accepted throughput. The projects provide [vLLM](https://docs.vllm.ai/en/stable/cli/bench/serve/) and [SGLang](https://docs.sglang.io/docs/developer_guide/bench_serving) load-testing tools; none of the numerical examples in this article is a test run by this site.

Start with Ollama for straightforward model management, llama.cpp for an appropriate local GGUF path, and vLLM or SGLang when shared-service scheduling and control dominate the decision. Keep the interface users need while changing the layer that is actually constrained. The successful migration is the one that improves accepted capacity or operational cost with the same quality and response target.
