---
title: "From CUDA to CANN: where does migrating a PyTorch project become difficult?"
slug: cuda-to-cann-pytorch-migration-en
translationGroup: cuda-to-cann-pytorch-migration
lang: en
date: "2026-10-25"
faDate: "25 October 2026"
draft: false
cover: /images/articles/cuda-to-cann-pytorch-migration-en/cover.svg
coverCredit: "Conceptual diagram of the migration from CUDA to CANN."
category: AI infrastructure
excerpt: "Moving a PyTorch project from CUDA to Ascend: device changes, operator compatibility, NCCL-to-HCCL communication and recovering service quality and capacity, using Qwen2.5-1.5B as a reference."
readTime: "16 min"
author: Mehran Ziabary
toc: auto
related:
  - cuda-nvidia-lock-in-exit-cost-en
  - ascend-vs-nvidia-real-performance-gap-en
  - gpu-inference-latency-throughput-en
tags:
  - AI infrastructure
  - CUDA
  - CANN
  - PyTorch
  - Ascend
  - Software migration
---

**Changing devices, adapting operators, moving communications and recovering performance when training and serving a language model**

In the [previous article](/en/articles/cuda-nvidia-lock-in-exit-cost-en/), I asked which parts of our system would break if we removed NVIDIA tomorrow. The discussion showed that model weights, kernels, inter-accelerator communication and serving engines carry different migration costs. Now I want to follow the same question through a specific project: what needs to change to move a model that we train with PyTorch, run on CUDA and offer as a service to Ascend?

The main difficulties often appear after the first successful run. A model may load and produce output, yet fail on long inputs, stall during multi-device training or lose serving capacity as requests increase. Estimating migration costs requires distinguishing three tasks from the outset: adapting the API, establishing a correct computational path and bringing the service to the required quality and performance.

## Define the reference project

The reference is the open-source **Transformers** project and its causal language-model training script, `examples/pytorch/language-modeling/run_clm.py`. I use **Qwen2.5-1.5B** as the example: a real model with published weights and a Transformers implementation, at a size suitable for studying migration. This is an engineering case study; its suitability for a Persian-language application requires a separate assessment. [Model page](https://huggingface.co/Qwen/Qwen2.5-1.5B)

Our scenario continues training the model on a text corpus and then serves that model for text generation. This examines training on text; building a conversational assistant also requires suitable data, conversation formatting and training design. On the source platform, training may use several GPUs with DDP, and the service may have an optimized model implementation.

**What follows is an analysis of this project’s migration path based on code and official documentation. No measurements were performed on Ascend hardware for this article, and no performance figures are presented as experimental results.** Nor do I attribute a custom CUDA kernel to the original script; I examine that dependency separately in optimized versions of the project.

## Establish a comparable version before changing code

Changing the model version, quantization method, context length and execution engine simultaneously makes differences hard to diagnose. Start with a fixed checkpoint, the same tokenizer, identical preprocessing and a shared test set. First compare that checkpoint on both platforms; only then continue training on the destination.

This distinction matters. Different outputs from fixed weights concern inference execution. Differences between two separately trained models may also arise from data order, numerical computation, distributed communications and optimization. Combining those tests needlessly complicates diagnosis.

The destination environment must also be reproducible. For Ascend, select PyTorch, `torch_npu`, CANN, Python, driver and firmware versions using the compatibility matrix. Installing the latest release of each does not guarantee compatibility. Record and test Transformers, Accelerate and any operator extensions in the same environment. [Compatibility matrix](https://github.com/Ascend/pytorch/blob/master/COMPATIBILITY.en.md)

The reference project’s dependency map looks roughly like this:

| Project component | What exists on the source? | What needs checking on the destination? |
|---|---|---|
| Weights and tokenizer | Standard model files | Loading the same revision and preserving preprocessing |
| Device selection | `cuda` and `torch.cuda` calls | The `npu` device and corresponding interfaces |
| Model computation | PyTorch operators and the chosen attention path | Supported shapes, data types, masks and computation paths |
| Distributed training | DDP with the NCCL communication backend | DDP with the HCCL communication backend |
| Added optimizations | Custom kernels, extensions or graph execution | Existing equivalents, rewrites or retuning |
| Serving | Batching, cache, queues and execution engine | Support and tuning for the same capabilities |
| Operations | Deployment image, monitoring and failure recovery | Reproducible environment and tested maintenance procedures |

Complete this table using the repository’s actual dependencies. Seeing PyTorch in a technology list does not provide enough information to estimate a migration.

## What an interface change really solves

For single-device execution, the initial change can be small. Device-dependent code in a simple CUDA script might look like this:

```python
torch.cuda.set_device(0)
device = torch.device("cuda:0")
model = model.to(device)
batch = {name: value.to(device) for name, value in batch.items()}
```

Using TorchNPU explicitly changes that section to:

```python
import torch_npu

torch.npu.set_device(0)
device = torch.device("npu:0")
model = model.to(device)
batch = {name: value.to(device) for name, value in batch.items()}
```

Here, `model` and `batch` already exist and the batch values are tensors. The snippet shows only device selection and data movement. TorchNPU is the extension that enables PyTorch execution on Ascend NPUs; provided the operators are supported, much of the model logic can therefore remain. [TorchNPU repository](https://github.com/Ascend/pytorch)

In a project using Trainer and Accelerate, the framework handles some device selection and distributed initialization. The Transformers documentation lists Ascend with the `npu` device and `torch-npu` package. Before rewriting the training loop, establish what the selected framework versions already support. [Transformers hardware documentation](https://huggingface.co/docs/transformers/main/hardware)

CUDA dependencies extend beyond `.cuda()`. Review CUDA Event timing, streams, synchronization, mixed precision, memory management and conditions such as `torch.cuda.is_available()`. A program that silently falls back to CPU when CUDA is unavailable may appear to run successfully without computing on the NPU at all. Logging model and data devices at startup is a simple, necessary check.

TorchNPU also offers automatic migration through `from torch_npu.contrib import transfer_to_npu`. It can map some calls, but has documented limitations, including incompatibilities with some uses of `torch.jit.script`. This can shorten adaptation work, but does not replace testing program behavior. [Migration guide](https://www.hiascend.com/document/detail/zh/Pytorch/720/ptmoddevg/trainingmigrguide/PT_LMTMOG_0020.html)

To connect this change to a concrete test of the same model, begin with a simple forward pass. Here, `device` was selected earlier and the local directory contains the fixed Qwen revision or a checkpoint produced by training it:

```python
import torch
from transformers import AutoModelForCausalLM, AutoTokenizer

checkpoint = "/models/qwen-reference"
tokenizer = AutoTokenizer.from_pretrained(checkpoint, local_files_only=True)
model = AutoModelForCausalLM.from_pretrained(
    checkpoint,
    local_files_only=True,
    torch_dtype=torch.bfloat16,
    attn_implementation="eager",
).to(device).eval()

batch = tokenizer("زیرساخت هوش مصنوعی به", return_tensors="pt")
batch = {name: value.to(device) for name, value in batch.items()}

with torch.inference_mode():
    logits = model(**batch, use_cache=False).logits

torch.save(logits.float().cpu(), f"logits-{device.type}.pt")
```

This test assumes compatible software versions and BF16 support. The saved output is for numerical comparison; moving it to CPU is part of correctness testing and must not enter model-speed measurements. Extend the comparison to several inputs, different lengths and generation with a KV cache. To assess training migration, also take a fixed batch with identical labels through loss computation and backward execution in training mode, controlling dropout.

## At which layer is the operator missing?

Suppose Qwen’s weights load but the first model execution stops. “This operator is unsupported” is not a sufficient diagnosis. The operator itself may be absent; only a particular data type, shape or memory layout may be unsupported; or eager execution may work while the compiled path lacks the required conversion.

Another possibility is that a general operator exists but the application directly calls a CUDA-specific extension. First separate that extension dependency from the computation required. The absence of a usable extension package does not necessarily mean CANN cannot perform the computation. OpPlugin provides part of the connection between PyTorch operators, TorchNPU-specific operators and CANN’s computational interfaces. [OpPlugin repository](https://github.com/Ascend/op-plugin)

Attention is a useful example in the reference model. Its computational path depends on sequence length, causal masks, padding, data type and KV-cache use. One short input without padding does not test all these combinations. In particular, test prefill and cached token generation separately: their computation shapes differ.

Where the model permits it, I first use a more general path such as `eager` as the correctness reference. Then I enable the destination’s optimized path and compare again. This is an engineering choice for diagnosis: once the simple path works, differences in the optimized implementation can be isolated more narrowly.

| Observation | Appropriate action |
|---|---|
| A CUDA extension will not load | Examine the general model path or a compatible extension implementation |
| An operator fails for only one data type | Check support boundaries and test a limited conversion while controlling numerical error |
| Only certain lengths or layouts fail | Build a small reproducible case and check that combination’s limitations |
| Eager execution works but graph execution fails | Examine the backend and operator conversion in the graph path |
| Execution succeeds but is slower | Profile kernels, data movement and synchronization |

Moving a computation to CPU can help diagnosis or a rarely executed component. If it repeats in every layer for every token, however, transfer and waiting costs may dominate the service. Establish where fallback occurs and how often; successful execution alone does not justify it.

## How should a custom kernel be replaced?

Now consider an optimized version in which the team replaced RMSNorm or part of attention with a custom CUDA kernel. Renaming the device is insufficient: the target needs an implementation of the required computation.

My first choice is to examine existing operators in the destination stack. If one meets the computational contract and performance requirements, maintaining another kernel adds cost. The next option is to express the calculation using standard PyTorch operators to establish a comparable reference. For RMSNorm, for example, preserve precisely where epsilon is added, the accumulation data type and when the output is cast. Similar function names do not establish equivalent behavior.

Developing a destination-specific kernel becomes meaningful if profiling shows that this component prevents the system from meeting its target. **Ascend C** is an official route, and OpPlugin documents connecting such operators to PyTorch. Computation partitioning, data movement, local memory and stage overlap must be tuned to the destination architecture. Porting an algorithm does not preserve CUDA’s execution design automatically. [OpPlugin documentation](https://github.com/Ascend/op-plugin)

**Triton-Ascend** is another route, particularly for a project with kernels already written in Triton. It supplies a Triton backend and adaptation for Ascend, but supported APIs, data types and launch parameters still need checking. A kernel may run with small changes while requiring further tuning for adequate performance. [Triton-Ascend repository](https://github.com/Ascend/triton-ascend)

For kernels used in training, a correct forward pass is not the finish line. Test backward execution, gradients and boundary inputs too. Graph execution also requires operator registration and output-shape and data-type information. Estimates counting only kernel-writing time overlook integration and maintenance costs.

## How does NCCL move to HCCL?

In DDP training, each process has a model copy and gradients are synchronized across processes. When an application uses the general `torch.distributed` interface, switching from NCCL to HCCL may involve only a small part of initialization. A standalone script launched with `torchrun` can begin like this:

```python
import os
import torch
import torch_npu
import torch.distributed as dist

local_rank = int(os.environ["LOCAL_RANK"])
torch.npu.set_device(local_rank)
device = torch.device("npu", local_rank)
dist.init_process_group(backend="hccl")
```

This snippet only initializes communications. For Trainer-based scripts, use the framework’s own configuration: `ddp_backend="hccl"` is a defined option, and Accelerate also selects HCCL for NPUs. Adding a second manual initialization alongside framework management creates another problem. [Transformers training arguments](https://github.com/huggingface/transformers/blob/main/src/transformers/training_args.py)

Preserving names such as `all_reduce` and `all_gather` covers only part of migration. Test the collectives actually used, data types, call order across all processes, per-process device assignment and asynchronous behavior. NCCL environment settings and algorithm choices are not portable HCCL settings; tune the destination network and topology separately.

Keep global batch size, data order, gradient accumulation and the learning-rate schedule fixed in training tests. Measure step time and the share spent in communication. If single-device execution is adequate but efficiency falls as devices are added, examine communication and its overlap with computation. Poor scaling cannot immediately be attributed to the chip’s compute capability.

Another distinction is essential: **training DDP does not partition the model across devices for serving.** If each request uses a complete model copy, several independent replicas are possible. If the model is partitioned, the inference engine needs a supported tensor-parallel path or another suitable method. Changing the training backend does not perform that separate design and testing work.

## Do not judge quality by two similar answers

For the first comparison, run a fixed checkpoint with fixed inputs on both platforms. Match the tokenizer, token IDs, masks, position IDs and generation settings. Disabling sampling removes one source of variability, although it does not guarantee bitwise equivalence between stacks.

Numerically, compare loss, logits and, where necessary, selected layer outputs. When a difference appears, find the first point of divergence. Tools such as **msProbe** document collecting data and comparing computational accuracy between GPUs and NPUs. [msProbe documentation](https://github.com/Ascend/msprobe/blob/master/README_EN.md)

At application level, use criteria relevant to the actual task. English-only tests are insufficient for a Persian service: include Persian inputs, numbers and dates, bilingual text, long inputs and the required output format. Set acceptable thresholds before inspecting results so that differences are not simply accepted afterward as “normal.”

If retraining on the destination, also examine loss trends, gradient behavior and final results over repeated runs. The objective is required quality and stable training; identical final weights from two different runs are not a suitable criterion for every project.

## Compare performance across three versions

To avoid premature conclusions, I keep three versions side by side: production CUDA, the initial compatible NPU implementation and the tuned destination version. The first-to-second gap shows the initial migration cost; the second-to-third gap shows how much degradation engineering and tuning can recover.

This requires profiling. Locate the time spent in tokenization and data preparation, transfers, compute kernels, memory allocation, synchronization and inter-device communication. Startup and initial compilation can distort a short run, so record startup time separately from steady-state performance.

Graph execution is another independent stage. TorchAir provides facilities for converting PyTorch graphs and running them through Ascend’s graph path, but successful eager execution does not prove support for all graph paths. Check dynamic shapes, graph breaks and recompilation against the real input-length distribution. [TorchAir repository](https://github.com/Ascend/torchair)

Every tuning change should have an observable effect: batch tuning, length grouping, reducing unnecessary transfers, choosing kernels or changing model partitioning. If input or output lengths were reduced to improve a benchmark, report that alongside the result: it creates a different workload.

## Service capacity differs from the speed of one model execution

Calling `generate()` directly helps test correctness, but does not fully represent a busy service. Queues, scheduling, batching, KV caches, memory limits and cancellation also affect results. If the source uses a specialized engine, evaluate the destination using its appropriate production path too.

**vLLM Ascend** is one serving option. Check the model, hardware generation and required features in the matrix for the exact version. Listing a model family does not establish support for every quantization method, context length and parallelism mode. [Supported models](https://docs.vllm.ai/projects/ascend/en/main/user_guide/support_matrix/supported_models.html)

The reference project’s service acceptance report should include at least these dimensions:

| Dimension | What we measure |
|---|---|
| Quality | Results on a fixed test set and application-sensitive cases |
| Response startup latency | User-perceived TTFT, including queuing |
| Continued generation | Inter-token latency and completion time |
| Capacity | Successful requests per unit time within latency limits |
| Resources | Memory consumption and peak usage for realistic input/output combinations |
| Stability | Errors, OOMs, timeouts, cancellations and sustained-load behavior |
| Recovery | Restart time and time until the service is ready again |

Mean latency is insufficient; percentiles such as P95 and P99 describe the experience of slower requests. Measure capacity against arrival rates and real input/output-length distributions. “One hundred concurrent users” without these specifications is not yet a defined workload.

For me, a useful capacity measure is the number of requests completed **at the required quality and within the accepted time limit**. Raising throughput by extending queues beyond users’ acceptable waiting time does not necessarily recover service capacity.

## When is migration complete?

Once the model runs, the environment must still be reproducible, failures diagnosable and the next version deployable with confidence. Deployment images, recorded dependencies, correctness and load tests, memory and communication monitoring, and recovery procedures are all migration deliverables. If operations require installation with limited internet access, test that in practice too.

For custom kernels or local patches, identify maintenance responsibility and the upgrade path. If every Transformers or TorchNPU update requires manual changes across several repositories, include that in the infrastructure decision. Even a successful performance migration may impose maintenance demands beyond the team’s capacity.

This project’s CUDA-to-CANN migration involves specific tasks: changing device-dependent calls, replacing incompatible operators and kernels, moving communications from NCCL to HCCL and retuning model execution. Some code stays; some needs rewriting. These tasks determine the cost: development and testing time, resources needed for real demand and the ongoing work of maintaining the new version.

The work is complete when the model preserves the required quality, requests meet their deadlines and the technical team can deploy, monitor and update the service. Reaching that point turns infrastructure choice into a practical capability. The organization can then run part of its workload on Ascend and has a second path for expanding or replacing infrastructure, with costs and capacity measured against its own project.
