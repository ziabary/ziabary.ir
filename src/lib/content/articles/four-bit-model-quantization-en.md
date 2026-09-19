---
title: What four-bit quantization saves—and what it changes
slug: four-bit-model-quantization-en
translationGroup: four-bit-model-quantization
lang: en
date: '2026-07-13'
faDate: '2026-07-13'
draft: true
math: false
category: Language models
excerpt: Real Qwen3-8B file sizes, a worked KV-memory budget and the differences between quantization methods, precision, quality and serving speed.
readTime: 11 min
cover: /images/articles/four-bit-model-quantization/cover.webp
related:
- llms-on-rtx-4090-24gb-vs-48gb-en
- right-model-size-for-the-task-en
- rag-cag-kag-fine-tuning-instruction-tuning-en
updated: "2026-09-19"
author: Mehran Ziabary
---

The same model name can appear on a download larger than fifteen GiB and another smaller than five. “Four-bit” explains the change in weight representation, but leaves the deployment questions open: what happens to GPU cost, answer quality, speed and the number of requests the service can handle?

Quantizing weights can make local execution practical and leave more memory for active requests. It changes the numerical representation, however, and its benefit depends on the conversion method and execution path. Keep parameter count, weight precision and total serving memory separate. The [language-model guide](/en/guides/llm/) connects exact artifacts with their compatible software and memory assumptions.

## What changes when weights become four-bit?

Weights are learned numerical values. Common source checkpoints store them in BF16 or FP16, with sixteen bits per value. Quantization maps a larger set of possible values into a smaller representation. Four bits provide sixteen codes; scales and sometimes other metadata determine what those codes represent in a group of weights. The [Transformers quantization guide](https://huggingface.co/docs/transformers/main/quantization/concept_guide) explains this distinction between codes and reconstructed values.

Think of measuring components with a less precise instrument: nearby measurements may become identical. The resulting difference matters when it changes the finished product. Quantization methods try to distribute approximation error so that it has less effect on useful model behavior; sophisticated methods do more than round every weight by one uniform rule.

Ordinary weight quantization preserves the layers and parameter count. An 8B model stays an 8B model. Pruning and distillation are different interventions. Expanding a quantized weight back into a sixteen-bit container does not restore the information lost during conversion; comparison with the original requires the original checkpoint.

## Four-bit storage does not describe every computation

Weights, intermediate activations and KV cache have separate precision choices. W4A16 describes four-bit weights and sixteen-bit activations for the covered operations; accumulation depends on the kernel. A file named Q4 can still use FP16 KV. The [bitsandbytes configuration](https://huggingface.co/docs/transformers/main/quantization/bitsandbytes#compute-data-type) explicitly separates storage from compute dtype.

| Label | What it identifies | What remains to check |
| --- | --- | --- |
| GGUF | A container for weights and model metadata | Tensor precision and compatible engine |
| Q4_K_M | A mixed quantization preset in the GGUF/llama.cpp ecosystem | Actual file size and mixed tensor types |
| GPTQ | Post-training weight quantization using calibration and an approximation of output sensitivity | Checkpoint layout, calibration and execution kernel |
| AWQ | Weight quantization informed by activation behavior | Supported weight format; activations are not necessarily four-bit |
| NF4 | A four-bit representation with levels designed for a normal distribution | The execution or adaptation workflow; it is not INT4 |
| MXFP4 / NVFP4 | Different block-scaled FP4 representations | Block/scaling details, engine and hardware support |
| W4A16 | A weight/activation precision description | File format, KV precision and affected operations |

The [GGUF specification](https://github.com/ggml-org/ggml/blob/master/docs/gguf.md) and [llama.cpp quantization guide](https://github.com/ggml-org/llama.cpp/blob/master/tools/quantize/README.md) describe the container and presets. [GPTQ](https://arxiv.org/abs/2210.17323) and [AWQ](https://arxiv.org/abs/2306.00978) describe different error-reduction methods. [QLoRA](https://arxiv.org/abs/2305.14314) introduces NF4 in its adaptation workflow, while [NVIDIA's FP4 explanation](https://developer.nvidia.com/blog/introducing-nvfp4-for-efficient-and-accurate-low-precision-inference/) distinguishes NVFP4 from MXFP4. These labels are not interchangeable names for one file type.

## The first saving is in stored weights

A pure sixteen-to-four-bit conversion would reduce raw weight storage to one quarter. Real files also carry scales, metadata and tensors at other precisions, and the parameter count in a model name is rounded. Use the published file sizes when planning storage and downloads.

For **Qwen3-8B**, the BF16 row below sums the weight files in the [pinned original repository](https://huggingface.co/Qwen/Qwen3-8B/tree/b968826d9c46dd6066d109eabc6255188de91218). The other rows come from its [pinned official GGUF repository](https://huggingface.co/Qwen/Qwen3-8B-GGUF/tree/7c41481f57cb95916b40956ab2f0b139b296d974). A GiB is 2³⁰ bytes; reductions are relative to BF16 weight files, not measured VRAM.

| Weight artifact | Weight-file size | Reduction from BF16 |
| --- | ---: | ---: |
| BF16 / Safetensors | 15.26 GiB | Reference |
| Q8_0 / GGUF | 8.11 GiB | 46.8% |
| Q6_K / GGUF | 6.26 GiB | 58.9% |
| Q5_K_M / GGUF | 5.45 GiB | 64.3% |
| Q4_K_M / GGUF | 4.68 GiB | 69.3% |

Here the BF16 package is about **3.26 times** the Q4_K_M package size. Download volume and stored compressed weights fall accordingly. Loading time also depends on conversion and runtime preparation. A particularly valuable change occurs when the whole model now fits on one GPU, removing repeated RAM transfers or the need to split weights across cards.

## Total serving memory falls by a different percentage

Weights are only one allocation. KV cache, workspace, buffers and request management still consume memory. Quantizing weights does not automatically quantize the context state.

Qwen3-8B's [configuration](https://huggingface.co/Qwen/Qwen3-8B/blob/b968826d9c46dd6066d109eabc6255188de91218/config.json) has 36 layers, 8 KV heads and head dimension 128. With two-byte KV values and 32,768 retained tokens, raw cache for one request is:

`2 × 36 × 8 × 128 × 2 × 32,768 bytes = 4.5 GiB`

For this **planning example**, use weight-file size as an approximation of resident weights and reserve an assumed 2 GiB for workspace. Every active request retains the full 32,768 tokens; there is no shared prefix or KV quantization.

| Configuration | Weights | Raw KV | Total with assumed 2 GiB workspace |
| --- | ---: | ---: | ---: |
| BF16, one request | 15.26 GiB | 4.5 GiB | 21.76 GiB |
| Q4_K_M, one request | 4.68 GiB | 4.5 GiB | 11.18 GiB |
| Q4_K_M, four requests | 4.68 GiB | 18 GiB | 24.68 GiB |

The single-request total falls by approximately **49%**, rather than the 69% reduction in weight files. Four long requests exceed a nominal 24 GB card's budget even with Q4 weights. Adjusting context, active-request count, replicas or KV precision addresses different parts of this problem. [vLLM's quantized KV documentation](https://docs.vllm.ai/en/stable/features/quantization/quantized_kvcache/) describes that separate optimization; the [24 versus 48 GB article](/en/articles/llms-on-rtx-4090-24gb-vs-48gb-en/) develops the hardware implications.

These numbers are memory arithmetic. They do not measure simultaneous users or establish acceptable latency, and actual engine workspace can differ from the assumed reserve.

## Does four-bit mean faster?

Smaller weights can reduce memory traffic, which helps when token generation is limited by memory bandwidth. A suitable kernel must consume that representation efficiently. Unpacking, rescaling or rearranging weights can erode the gain; some paths fuse reconstruction into the computation. [Marlin](https://github.com/IST-DASLab/marlin) is an example of kernel work aimed at making four-bit weights useful for speed. Its results belong to its tested kernel and workload, not automatically to an entire application.

Reading the prompt, or prefill, differs from generating successive tokens, or decode. Long inputs and larger batches change weight reuse and the amount of computation. Long contexts also increase KV traffic. A method that improves one user's decode rate may not improve time to first token or total service throughput by the same factor.

Record input and output lengths, active requests and engine configuration. Compare first-token latency, continuation speed and successfully completed requests separately. W4A16 may read compressed weights but perform arithmetic at higher precision; native low-precision hardware instructions are another route. The [vLLM hardware support matrix](https://docs.vllm.ai/en/stable/features/quantization/#supported-hardware) illustrates why model, numeric format, kernel and engine version must be matched.

## Quality changes are task-specific

There is no universal four-bit quality-loss percentage. Architecture, model size, quantization method, affected tensors and the task all influence the result. [Evaluating Quantized Large Language Models](https://arxiv.org/html/2402.18158v2) examines weights, activations and KV across several families and finds uneven sensitivity. It does not establish one loss figure for every subsequent model or conversion.

Two variants may sound equally fluent while differing on an identifier, a contractual exception or a tool argument. The useful comparison therefore scores task completion: field values for extraction, support from the document for RAG, executed tests for code, and correct tool/argument selection for agents. Valid JSON establishes syntax, not correct values. Different wording alone is not deterioration, especially with stochastic generation.

Evaluate the language actually used by the service. English results or a multilingual average do not answer how a particular quantized checkpoint handles local names, number formats or specialist terminology. Keep representative difficult examples alongside common ones, so that rare expensive errors remain visible.

## A larger four-bit model or a smaller higher-precision one?

Quantization can put a larger model within the same memory budget. That helps when the smaller candidate lacks the required capability and the quantized larger one retains it. But more parameters can still mean more work per token, and compression does not erase that computational difference.

Compare two deployable configurations on the same task and hardware, rather than comparing file sizes alone. If a specialist or small model already passes the quality threshold, spare memory can support more requests or other pipeline components. If the task requires stronger reasoning, a larger quantized model may be worthwhile. The [model-size guide](/en/articles/right-model-size-for-the-task-en/) explains how to form that comparison without assuming a universal size ranking.

<!-- reference:quant-not-conversion:start -->

### Trained quantization and file conversion differ

[ParetoQ](https://github.com/facebookresearch/ParetoQ) reports HellaSwag scores of 53.3 for MobileLLM-350M BF16 and 53.5 for its 4-bit variant; reported Wiki perplexity falls from 10.5 to 10.3. These are trained and fine-tuned ParetoQ variants. The result does not show that converting an arbitrary checkpoint to 4-bit GGUF improves its quality. Compare the training recipe and quantization method alongside architecture and bit width; the study is not a measured memory or speed guarantee for a desktop runtime.

| Trained ParetoQ variant | HellaSwag (higher is better) | Wiki perplexity (lower is better) |
|---|---:|---:|
| MobileLLM-ParetoQ-350M-BF16 | 53.3 | 10.5 |
| MobileLLM-ParetoQ-350M-2-bit | 47.3 | 12.5 |
| MobileLLM-ParetoQ-350M-4-bit | 53.5 | 10.3 |
| MobileLLM-ParetoQ-600M-BF16 | 59.5 | 9.1 |
| MobileLLM-ParetoQ-600M-2-bit | 53.9 | 10.5 |
| MobileLLM-ParetoQ-600M-4-bit | 59.5 | 8.9 |


<!-- reference:quant-not-conversion:end -->

## PTQ, QAT and QLoRA solve different problems

**Post-training quantization, or PTQ**, converts an already trained model. It may use a small calibration collection to select a better numerical approximation; GPTQ and AWQ are examples. Calibration data are not equivalent to teaching the model the organization's knowledge. If a suitable published artifact exists, a deployer need not repeat the conversion.

**Quantization-aware training, or QAT**, includes the effect of reduced precision during training or adaptation so that parameters can adjust. [PyTorch's QAT explanation](https://pytorch.org/blog/quantization-aware-training/) presents an implementation and evaluation. Simulating quantization error does not mean every training operation and optimizer state is four-bit.

**QLoRA** keeps quantized base weights frozen and trains a limited set of adapters. It targets cheaper adaptation, rather than full training of all parameters in four-bit arithmetic. Decide first whether the remaining error requires training or whether retrieval and better inputs address it; the [RAG and tuning comparison](/en/articles/rag-cag-kag-fine-tuning-instruction-tuning-en/) separates those cases.

## Choose a variant that removes the actual constraint

Start with a credible artifact whose base checkpoint, quantization, publisher, license and execution path are identifiable. Its tokenizer and chat template must match the model. If converting again, use an appropriate original checkpoint: successive conversions from one lossy representation to another can carry earlier errors forward.

| Project condition | Useful first comparison | Reason |
| --- | --- | --- |
| Weights do not fit or consume most VRAM | A supported ready-made four-bit artifact | Full residency and request headroom may change the deployment |
| Q4 misses quality targets and some memory is available | Q5/Q6, eight-bit or another four-bit method | Intermediate precision or a different method may preserve the needed behavior |
| Higher precision fits comfortably and demand is low | Keep the reference or eight-bit until Q4 has a concrete benefit | File reduction alone may not improve service value |
| Weights fit but active contexts exhaust memory | KV precision, prefix reuse and request limits | Context state is the bottleneck |
| Demand is high and memory is not the main limit | Supported FP8/BF16 and Q4 paths under the intended load | The smallest file need not provide the greatest throughput |

The [catalog](/en/guides/llm/#model-catalog) identifies artifacts, while the [software table](/en/guides/llm/#serving-software) covers execution. A controlled quality comparison should hold inputs and generation settings steady; a final system comparison can tune each route separately if it reports those differences.

The economic benefit comes from using fewer resources for accepted work, or completing more accepted work with the same resources. Conversion effort, maintaining artifacts, engineering time and failed answers also contribute. A smaller file is valuable when the released memory or reduced traffic produces a usable improvement while preserving the task's quality requirement.
