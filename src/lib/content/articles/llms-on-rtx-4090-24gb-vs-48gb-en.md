---
title: 'LLMs on RTX 4090: what changes between 24 and 48 GB?'
slug: llms-on-rtx-4090-24gb-vs-48gb-en
translationGroup: llms-on-rtx-4090-24gb-vs-48gb
lang: en
date: '2026-07-02'
faDate: '2026-07-02'
draft: true
math: true
category: Language models
excerpt: Exact weight files, a worked KV-cache budget, replicas versus model splitting, and the point at which professional or datacenter GPUs become useful for inference and adaptation.
readTime: 12 min
cover: /images/articles/llms-on-rtx-4090-24gb-vs-48gb/cover.png
related:
- right-model-size-for-the-task-en
- pcie-gpu-server-selection-en
- rag-cag-kag-fine-tuning-instruction-tuning-en
updated: "2026-09-19"
author: Mehran Ziabary
---

A GPU purchase for an organizational assistant often begins with H100 or H200 before anyone has specified the model, input length, request rate or response-time target. For document questions, extraction, internal chat and some coding tasks, a small or medium quantized model on an RTX 4090 can be a practical starting point. Higher-end hardware becomes useful when it removes an identified memory, throughput or operational constraint.

The comparison has three parts: quality for the task, memory for the exact configuration and capacity to serve requests. Moving from 24 to 48 GB changes the memory budget; it does not automatically double token generation speed. The [language-model guide](/en/guides/llm/) separates these questions instead of turning a successful model load into a performance promise.

## What does a 48 GB RTX 4090 mean?

[NVIDIA specifies 24 GB of GDDR6X for the RTX 4090](https://www.nvidia.com/en-us/geforce/graphics-cards/40-series/rtx-4090/). A 48 GB version is a third-party hardware modification, not the standard NVIDIA configuration. A [first-hand examination of a modified card](https://main-horse.github.io/posts/4090-48gb/) describes one such implementation.

More memory can remove a capacity limit without changing the GPU architecture or adding compute units. A purchase decision for a modified card therefore includes the usable memory actually exposed, sustained-load stability, memory cooling and the supplier's support terms. Different modified products need not have identical behavior. These details become harder to address after several cards have been packed into a server chassis.

## Which models fit?

The examples below identify particular downloadable files, rather than applying a parameter-count formula to every artifact. File sizes use **GiB: 2³⁰ bytes**. They describe stored weights, not total execution memory. The Q4_K_M estimates assume one active request, about 8,000 tokens including output, 16-bit KV cache, GPU-resident weights and KV, and a provisional 2 GiB reserve for the engine. A larger runtime reserve can invalidate a marginal fit.

| Model | Selected GGUF file and size | 24 GB | 48 GB | Starting use |
| --- | --- | --- | --- | --- |
| [Qwen3-4B](https://huggingface.co/Qwen/Qwen3-4B) | [Q4_K_M](https://huggingface.co/Qwen/Qwen3-4B-GGUF/tree/bc640142c66e1fdd12af0bd68f40445458f3869b); 2.33 GiB | Fits; substantial headroom | Fits; extra service headroom | Bounded chat, extraction, direct RAG |
| [Llama-3.1-8B-Instruct](https://huggingface.co/meta-llama/Llama-3.1-8B-Instruct) | [Q4_K_M](https://huggingface.co/bartowski/Meta-Llama-3.1-8B-Instruct-GGUF/tree/bf5b95e96dac0462e2a09145ec66cae9a3f12067); 4.58 GiB | Fits | Fits; more room for active requests | General assistant and RAG |
| [Aya Expanse 8B](https://huggingface.co/CohereLabs/aya-expanse-8b) | [Q4_K_M](https://huggingface.co/bartowski/aya-expanse-8b-GGUF/tree/f9d62ed0c58e6f2ae17975df990b1b8a4013b596); 4.71 GiB | Fits | Fits; model context remains about 8K | Multilingual tasks; check licensing |
| [Qwen3-14B](https://huggingface.co/Qwen/Qwen3-14B) | [Q4_K_M](https://huggingface.co/Qwen/Qwen3-14B-GGUF/tree/530227a7d994db8eca5ab5ced2fb692b614357fd); 8.38 GiB | Fits | Fits; more context and concurrency headroom | General tasks and moderate analysis |
| [DeepSeek-R1-Distill-Qwen-14B](https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Qwen-14B) | [Q4_K_M](https://huggingface.co/bartowski/DeepSeek-R1-Distill-Qwen-14B-GGUF/tree/9f5d77d401799416e0702290a691038b44012e0c); 8.37 GiB | Fits; include reasoning tokens | Fits; more room for long requests | Reasoning tasks |
| [gpt-oss-20b](https://huggingface.co/openai/gpt-oss-20b) | [MXFP4](https://huggingface.co/bartowski/openai_gpt-oss-20b-GGUF/tree/e39ba3aa000c47c83dacdc9e1ca2c9dd0808c205); 11.28 GiB | Publisher reports a compatible 16 GB execution path | More headroom; engine-specific | Reasoning and tools |
| [Qwen3-Coder-30B-A3B-Instruct](https://huggingface.co/Qwen/Qwen3-Coder-30B-A3B-Instruct) | [Q4_K_M](https://huggingface.co/unsloth/Qwen3-Coder-30B-A3B-Instruct-GGUF/tree/b17cb02dd882d5b6ab62fc777ad2995f19668350); 17.28 GiB | Fits; budget active contexts | Fits; more room for long code requests | Coding and tool workflows |
| [Qwen3-32B](https://huggingface.co/Qwen/Qwen3-32B) | [Q4_K_M](https://huggingface.co/Qwen/Qwen3-32B-GGUF/tree/938a7432affaec9157f883a87164e2646ae17555); 18.40 GiB | Fits with limited runtime margin | Fits with more service headroom | Tasks where smaller models fall short |
| [Llama-3.1-70B-Instruct](https://huggingface.co/meta-llama/Llama-3.1-70B-Instruct) | [Q4_K_M](https://huggingface.co/bartowski/Meta-Llama-3.1-70B-Instruct-GGUF/tree/83fb6e83d0a8aada42d499259bc929d922e9a558); 39.60 GiB | Full GPU residency does not fit | Fits this scenario with limited margin | Difficult tasks at low concurrency |

These are memory estimates, not measured speeds. Q4_K_M uses mixed quantization; the file is not simply the parameter count multiplied by half a byte. The linked revisions make the examples reproducible even if a repository later adds different files.

The gpt-oss row is a separate execution case. Its publisher describes operation within 16 GB using a compatible MXFP4 path, but that is not a validation of every GGUF conversion, engine or context setting. The model's attention arrangement also requires its own memory accounting. MXFP4 weight storage on a 4090 must not be confused with native FP4 compute support in newer GPU generations. Check the [model and engine compatibility view](/en/guides/llm/?view=deployment-compatibility#serving-software) for the exact route.

Model identity matters just as much. The DeepSeek entry is a distilled 14B checkpoint, not the full DeepSeek-R1 model. Qwen3-Coder has about 30.5 billion total parameters and 3.3 billion active per token; all resident weights still consume memory. Licensing is another separate decision: Aya Expanse's public weights carry a noncommercial license, unlike some of the other downloadable models in the table.

<!-- reference:context-not-fit:start -->

### Separate context claims from memory fit

[Qwen3-4B-Instruct-2507](https://huggingface.co/Qwen/Qwen3-4B-Instruct-2507) declares a native 262,144-token context, while its deployment instructions suggest reducing the length to 32,768 after an out-of-memory error. Architectural context support does not guarantee that weights, KV cache and workspace fit one GPU. A 24GB-versus-48GB comparison must hold weight format, input/output lengths, concurrency and backend constant. Without them, a single “required VRAM” number is not transferable.

<!-- reference:context-not-fit:end -->

## The important difference appears after loading the weights

At least three allocations compete for VRAM: weights, KV cache and runtime workspace. Weight memory stays broadly fixed for one loaded replica, while the context state grows with active sequences and their retained tokens. Doubling total memory can therefore more than double the space left for requests without doubling compute capacity.

For a concrete calculation, [Qwen3-Coder-30B-A3B-Instruct's pinned configuration](https://huggingface.co/Qwen/Qwen3-Coder-30B-A3B-Instruct/blob/b2cff646eb4bb1d68355c01b18ae02e7cf42d120/config.json) has 48 layers, 4 KV heads and a head dimension of 128. With two bytes per FP16 or BF16 KV value, T retained tokens per request and N equal-length active requests:

$$
M_{KV}=2\times48\times4\times128\times2\times T\times N\quad\text{bytes}
$$

| Retained input and output tokens per request | Raw KV for one request | Raw KV for four active requests |
| --- | ---: | ---: |
| 8,192 | 0.75 GiB | 3 GiB |
| 32,768 | 3 GiB | 12 GiB |
| 65,536 | 6 GiB | 24 GiB |

This arithmetic assumes no KV quantization or shared prefixes. Workspace is separate. At four requests of 32,768 tokens, the 17.28 GiB weight file plus raw KV already reaches approximately **29.28 GiB**, before execution overhead. Full GPU residency exceeds a 24 GB card's capacity; a 48 GB card provides room to investigate this configuration. It still has to meet the response-time target.

KV quantization, prefix reuse and request limits change the budget; the [Ollama FAQ](https://docs.ollama.com/faq) documents examples of concurrency and KV settings. More VRAM does not extend the model's own supported context: Aya Expanse 8B's approximately 8K context does not become 32K merely because a larger card is installed. Model limit, artifact limit and available memory must all permit the request.

## Two 24 GB cards are not one 48 GB card

Two cards provide two processors and separate memory spaces. Splitting one model requires an engine to partition work and move data between them. The RTX 4090 has no NVLink, and [NVIDIA's technical response](https://forums.developer.nvidia.com/t/standard-nvidia-cuda-tests-fail-with-dual-rtx-4090-linux-box/233202/16) also states that P2P is unsupported. PCIe slots alone therefore do not establish a direct GPU-to-GPU transfer path.

The alternative is replication. If an 8B model fits on each card, run one complete copy per GPU and distribute independent requests. Each request can generate its tokens on one GPU without exchanging layer outputs with the other. [vLLM's data-parallel documentation](https://docs.vllm.ai/en/stable/serving/data_parallel_deployment/) distinguishes that arrangement from [splitting a model across devices](https://docs.vllm.ai/en/stable/serving/parallelism_scaling/).

A single 48 GB card is attractive when one model or its KV budget is too large for 24 GB. Two 24 GB cards may offer more independent compute for replicas of a smaller model. Neither arrangement promises a twofold service gain: request lengths, load distribution and other components can limit scaling.

Two GPUs in one host also share the host's failure domain. Surviving a host outage requires capacity elsewhere, plus routing and recovery that work when that host disappears. The [PCIe GPU server guide](/en/articles/pcie-gpu-server-selection-en/) connects topology, chassis and service design.

## Match the workload before choosing the card

The following ranges are a starting design map, not measured acceptance results:

| Workload | Initial candidate | Hardware implication |
| --- | --- | --- |
| Classification, routing and clear field extraction | A specialist or roughly 1–4B generator | A CPU or smaller GPU may be sufficient for light demand |
| Internal chat and direct document RAG | Roughly 4–14B with suitable retrieval and reranking | 24 GB is worth evaluating; replicas can serve additional demand |
| Translation, rewriting and ordinary summaries | A suitable multilingual model around 8–14B | Target language and document length matter; long contexts increase KV |
| Coding and tool use | A small code specialist through to a 30B MoE code model | Some configurations fit 24 GB; longer active requests favor more VRAM |
| Difficult reasoning across several documents | Compare stronger reasoning and larger models | Quality may require a larger model before throughput is considered |

The [model-size article](/en/articles/right-model-size-for-the-task-en/) explains how to form this shortlist. In RAG, improve the component causing the failure: a missing passage points to retrieval; an available passage interpreted incorrectly points toward instructions or the generator. Enlarging the generator cannot substitute for access control, correct document extraction or a current index. The [comparison of RAG and tuning methods](/en/articles/rag-cag-kag-fine-tuning-instruction-tuning-en/) helps separate these interventions.

## Serving adds queues, deadlines and failures

A terminal response proves one execution path works. A service must also handle queueing, time to first token, continuation speed and cancellations. A company with many registered users may have only a few active requests; one automated process may keep a GPU continuously occupied. The word “enterprise” does not determine the card count.

Our published Targoman deployment report describes translation, summarization and chat sharing a tuned Aya-based model on a 24 GB RTX 4090. During a server reload, the remaining server saw about 300 concurrent system requests, slower replies and cancellation of requests whose response had not started after 20 seconds. That observation is useful as an operational example of the distinction between outstanding demand and successful service; it is not a claim of 300 simultaneous successful generations. The [original Persian report](/articles/targoman-300-concurrent-requests-one-rtx-4090/) contains the local deployment account.

[llama.cpp](https://github.com/ggml-org/llama.cpp) supports important GGUF and mixed CPU/GPU paths; [Ollama](https://docs.ollama.com/faq) simplifies obtaining and serving models; serving engines such as vLLM expose scheduling and scaling choices. Compare the actual checkpoint, quantization, request pattern and engine in the [software table](/en/guides/llm/#serving-software). A feature supported by one engine version is not evidence for every format it can download.

Offloading weights to RAM or loading them layer by layer can expand the runnable model range. [AirLLM](https://github.com/lyogavin/airllm/blob/v4.0.0/README.md) is one such approach, with storage and transfers added to execution time. That trade can suit offline work even when it misses an interactive latency target.

## When higher-end hardware earns its place

Large resident weights, long contexts and sustained concurrent work can turn additional memory and bandwidth into useful capacity. [NVIDIA lists 141 GB of HBM3e and 4.8 TB/s for H200](https://www.nvidia.com/en-us/data-center/h200/), with NVLink in relevant configurations. Those capabilities can matter for inference as well as training, particularly when a model must be split or the service keeps a large KV working set.

There are intermediate options. [RTX 6000 Ada](https://www.nvidia.com/en-us/products/workstations/rtx-6000/) provides 48 GB with ECC; [RTX PRO 6000 Blackwell Workstation](https://www.nvidia.com/en-us/products/workstations/professional-desktop-gpus/rtx-pro-6000/) provides 96 GB with ECC. Generation and product variant matter: “6000” is not a complete specification, and a professional workstation card does not automatically inherit datacenter interconnect features.

Several 4090s also require slots, PCIe lanes, power delivery and cooling. The reference card's 450 W total graphics power is a specification, not a measurement of application power or complete-server consumption. Compare the entire [GPU server platform](/en/articles/gpu-server-platform-components-en/), including rack space and maintenance. Better cost per useful response can come from high utilization and simpler operations, or from avoiding expensive idle capacity.

## Training is a different memory problem

A 4090 can support training of smaller models and parameter-efficient adaptation. LoRA trains adapters; QLoRA keeps base weights quantized and frozen while training added parameters. Sequence length, batch size and activations still matter. The [QLoRA paper](https://arxiv.org/abs/2305.14314) reports adapting a 65B model on one 48 GB GPU under its experimental conditions; that is not full-weight training of a 65B model on a standard 4090.

Full training adds gradients, optimizer state and activations to weight storage. Repeated training, long sequences and substantial cross-device communication may make a different platform worthwhile. An occasional small-model adaptation may instead suit the existing card or a temporary rental. The [PEFT quantization guide](https://huggingface.co/docs/peft/main/developer_guides/quantization) explains this class of workflow; compare completion time and recurrence of the job, not just whether the model loads.

## Compare useful answers over the same period

Include the system purchase or rental, hosting, electricity, cooling, maintenance and service downtime over a defined period. Divide by outputs meeting both quality and timing requirements. For workloads with very different response lengths, cost per completed task can be more informative than cost per token.

As an **educational ratio**, suppose the complete H200-based solution costs four times the complete 4090-based solution over the comparison period. With equally valuable accepted outputs, it needs more than four times as many of them to have a lower cost per output. This is not a market-price claim. It may be achievable under sufficient demand, or H200 may be the only option meeting the task's requirements; unused potential throughput does not produce that economic gain.

Choose the model that passes the task's quality threshold, budget its context, then evaluate service behavior under the intended demand. A memory bottleneck points toward larger VRAM or a different placement strategy. A compute, communication or operational bottleneck points toward a different platform. The [hardware feasibility table](/en/guides/llm/#hardware-feasibility) helps with the first calculation while keeping it separate from measured speed.
