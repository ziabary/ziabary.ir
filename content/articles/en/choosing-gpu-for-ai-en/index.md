---
title: "Choosing a GPU for AI: performance, cost and the actual workload"
slug: choosing-gpu-for-ai-en
lang: en
date: 2025-05-19
faDate: "19 May 2025"
draft: false
category: AI infrastructure
excerpt: "Compare useful performance against the full cost of deployment, including memory, software, the host server and the way the service will be used."
readTime: "6 min"
cover: "/images/articles/choosing-gpu-for-ai/cover.png"
related: ["gpu-types-for-ai-en", "int8-or-fp8-real-gpu-support-en", "pcie-gpu-server-selection-en"]
---

When this guide was first developed, the RTX 6000 Ada, A100 and H100 were prominent options for deep learning infrastructure. H200 and Blackwell have since expanded the choices. The decision principle has stayed the same: a newer or more powerful GPU is worthwhile only if the intended workload can use what it offers.

Buying a high-end accelerator without evaluating the application creates three common problems:

- The GPU and its required server platform can cost far more than the useful performance justifies.
- Small or poorly parallelized tasks may leave much of the compute capacity idle.
- Software designed for a single GPU may need substantial changes before it benefits from a multi-GPU system.

For a budget-constrained development team, an inference service or a shared research facility, [consumer and workstation cards](/en/articles/gpu-types-for-ai-en/) therefore belong on the shortlist alongside data center accelerators. The question is how much usable capacity the complete investment buys.

### What historical benchmarks can teach us

The chart below comes from [Tim Dettmers' 2023 analysis of GPUs for deep learning](https://timdettmers.com/2023/01/30/which-gpu-for-deep-learning/). In the workloads and prices considered there, cards such as the RTX 4090 offered attractive performance per cost relative to the A100. Those results illustrate a comparison method; they are not current prices or a ranking for every model.

<figure>
  <img src="/images/articles/choosing-gpu-for-ai/100000010000063C000005D17A54F86E.png" alt="Historical 2023 comparison of relative training and inference performance per US dollar across GPUs" loading="lazy" />
  <figcaption>Historical performance per cost, from Tim Dettmers' analysis. Recalculate with the hardware, software and prices available for the proposed deployment.</figcaption>
</figure>

The following snapshots from [TensorDock's benchmarks](https://www.tensordock.com/benchmarks.html) show the same point for particular language-model workloads. Lower-cost cards can compare favorably in one test, while another workload changes the order. These are snapshots retained from the original article: rental prices, drivers and execution engines have changed since they were captured.

<figure>
  <img src="/images/articles/choosing-gpu-for-ai/10000001000004620000024FADFE4917.png" alt="Historical TensorDock Mistral 7B inference throughput per dollar comparison" loading="lazy" />
  <figcaption>Mistral 7B inference: a historical comparison of throughput per dollar.</figcaption>
</figure>

<figure>
  <img src="/images/articles/choosing-gpu-for-ai/10000001000004620000024F5C538DDA.png" alt="Historical TensorDock OPT-125M inference throughput per dollar comparison" loading="lazy" />
  <figcaption>OPT-125M inference: changing the model changes the relative results.</figcaption>
</figure>

<figure>
  <img src="/images/articles/choosing-gpu-for-ai/100000010000046200000249EA59A2F7.png" alt="Historical TensorDock Mistral 7B FP16 training batch latency and cost comparison, with lower values preferred" loading="lazy" />
  <figcaption>Mistral 7B training: the displayed metric is batch latency relative to cost, with lower values preferred. It should not be read as another inference-throughput chart.</figcaption>
</figure>

Training and inference place different demands on the hardware. In inference, the questions often concern whether the weights and KV cache fit, how many requests can run concurrently and how quickly each user receives an answer. Training also needs gradients, activations and optimizer state. Distributed training adds recurring communication between GPUs.

An inference result cannot therefore be carried over to training. Even within either category, model size, batch size, numerical precision and available memory can change the result. The distinction between a format listed on a specification sheet and the format actually used by the runtime is covered in [INT8 or FP8: real GPU support](/en/articles/int8-or-fp8-real-gpu-support-en/).

### Compare the complete deployment

NVIDIA supplies some consumer cards as reference designs, while board partners such as ASUS, MSI and Gigabyte offer their own versions. Their prices reflect more than the processor: cooler design, dimensions, power delivery, noise and other features can differ. A feature useful in a desktop gaming system may have little value in a machine dedicated to AI.

Build quality, price and integration requirements deserve more attention than decorative features. Many RTX 4090 variants are too large, or use an unsuitable airflow pattern, for dense server deployment. A compact or blower-cooled card must still be checked by its exact part number. A descriptive reseller name is not a substitute for an official specification or an OEM-supported configuration. See [PCIe GPU server selection](/en/articles/pcie-gpu-server-selection-en/) for the mechanical, thermal and electrical checks.

The cost comparison should include the host server, cooling and power provision, software preparation and expected utilization. A cheap GPU that requires extensive integration work may not be cheap to operate. Conversely, a costly integrated system may add little value if each job runs independently on one card.

### A small, deliberate hardware portfolio

A shared compute service does not necessarily need one uniform GPU model for every customer. A limited set of configurations can serve different memory and performance requirements while keeping operations manageable. Standardize where it reduces support work, and introduce another card type when a distinct workload justifies it.

Performance-per-cost comparisons have a long history. For example, [Lambda's comparison of the RTX 2080 Ti, V100 and contemporary GPUs](https://lambda.ai/blog/best-gpu-tensorflow-2080-ti-vs-v100-vs-titan-v-vs-1080-ti-benchmark) divided throughput by total system cost. Its numbers are historical, but the method remains useful.

For a purchase today, run the intended model with its actual input lengths, batch sizes and service targets. Compare the cost of the capacity that passes those tests. The strongest card on paper may be the right choice, but it should earn that position through the workload rather than its product name.
