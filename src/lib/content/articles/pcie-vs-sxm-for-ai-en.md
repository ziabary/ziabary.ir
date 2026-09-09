---
title: "PCIe or SXM: choosing a GPU platform for AI"
slug: pcie-vs-sxm-for-ai-en
lang: en
date: 2025-05-19
faDate: "19 May 2025"
draft: false
category: AI infrastructure
excerpt: "How memory, interconnects, power and expansion requirements affect the choice between PCIe cards and integrated SXM platforms."
readTime: "7 min"
cover: "/images/articles/pcie-vs-sxm-for-ai/cover.png"
related: ["gpu-types-for-ai-en", "dgx-and-standard-gpu-servers-en", "pcie-gpu-server-selection-en"]
---

Two systems can carry GPUs with the same family name and still behave very differently. The difference may come from the GPU variant itself, its power limit, its memory or the links connecting it to other GPUs. Comparing PCIe and SXM therefore means comparing complete configurations, not just connectors.

### A card versus an integrated platform

A PCIe GPU is an add-in card installed in a compatible server or workstation. SXM is NVIDIA's module form factor for GPUs mounted on a dedicated baseboard. An SXM module cannot be inserted into a PCIe slot; it requires a platform built for that module, including its power delivery and cooling.

In H100 and H200 eight-GPU HGX systems, SXM GPUs communicate through NVLink and NVSwitch. This provides a high-bandwidth fabric inside the server. The value of that fabric depends on whether the workload actually moves substantial amounts of data between GPUs.

Some PCIe GPU variants also support NVLink bridges. The supported number of GPUs and bridge arrangement are specific to the product and server configuration. Do not assume that every PCIe card supports NVLink, or that a bridged pair provides the same topology as an eight-GPU HGX baseboard. For GPUs communicating over PCIe, the CPU attachment, PCIe switches and NUMA layout also matter.

### When fast GPU-to-GPU communication pays off

A large model divided across multiple GPUs may require frequent communication during training or inference. In those conditions, reducing communication time can materially improve the usefulness of each additional GPU. An integrated SXM platform is worth evaluating when that communication is a measured bottleneck.

Independent jobs are different. If eight users each run a model on a separate GPU, their work may share little or no data across the GPU fabric. They can benefit from a dense server without benefiting much from NVSwitch. The [DGX, HGX and PCIe server comparison](/en/articles/dgx-and-standard-gpu-servers-en/) separates the value of the interconnect from the value of the complete system and its support services.

<figure>
  <img src="/images/articles/pcie-vs-sxm-for-ai/10000000000006400000031AF9F958DF.png" alt="Historical comparison of A100 and H100 DGX SuperPOD network arrangements and bandwidth" loading="lazy" />
  <figcaption>A historical A100/H100 system comparison retained from the original article. The figures describe the illustrated configurations, not a general scaling guarantee.</figcaption>
</figure>

The boundary of the fabric is important. In the H100/H200 systems discussed here, NVSwitch connects GPUs **within a node**. Communication between servers also requires a compute network, suitable NICs and the software configuration to use them. NVIDIA's [DGX SuperPOD reference architecture](https://docs.nvidia.com/dgx-superpod/reference-architecture-scalable-infrastructure-h100/latest/dgx-superpod-architecture.html) describes the compute, storage and management networks separately. Rack-scale NVLink systems in other generations must be assessed against their own architecture; their topology should not be inferred from this eight-GPU example.

### Expansion and utilization

A compatible PCIe server can often be purchased with fewer GPUs and expanded later. That flexibility is useful when demand grows gradually, when users need different card types or when the workload is still being characterized. Expansion still depends on the approved server configuration: power supplies, risers, cooling kits and supported GPU combinations may need to be specified at the start.

An integrated SXM system commits more of the investment at once. Standardization can simplify fleet operations, but idle GPUs and unused interconnect capacity remain real costs. Before selecting it, measure whether the target application scales effectively from one or two GPUs to four and eight.

<figure>
  <img src="/images/articles/pcie-vs-sxm-for-ai/10000001000003950000025042D71F05.png" alt="Historical vendor comparison of A100, H100 and H100 with an NVLink network across selected HPC and AI workloads" loading="lazy" />
  <figcaption>Relative results vary by workload and system configuration. This historical illustration is not a direct, controlled PCIe-versus-SXM benchmark and should not be used as a purchase forecast.</figcaption>
</figure>

### Memory and power: compare the exact variants

The original 80 GB H100 PCIe uses **HBM2e**, as specified in NVIDIA's [H100 PCIe product brief](https://www.nvidia.com/content/dam/en-zz/Solutions/gtcs22/data-center/h100/PB-11133-001_v01.pdf). The 80 GB H100 SXM uses HBM3. The [H100 datasheet](https://resources.nvidia.com/en-us-gpu-resources/h100-datasheet-24306) lists nominal memory bandwidth of approximately 2 TB/s and 3.35 TB/s respectively. H100 NVL is another configuration again; its specifications should not be substituted for those of the 80 GB PCIe card.

The power envelope also differs: the 80 GB H100 PCIe is rated up to 350 W, while H100 SXM configurations can reach 700 W per GPU. The server must be designed for the selected operating point. These figures do not establish energy efficiency on their own. A higher-power GPU may finish a suitable task sooner, while an underutilized one may consume more energy without shortening execution enough to justify it. Measure energy and cost per completed task alongside elapsed time.

Memory capacity, memory bandwidth and compute capability can all change between variants and generations. Numerical-format support adds another layer: [INT8 and FP8 support in practice](/en/articles/int8-or-fp8-real-gpu-support-en/) explains why a hardware specification does not guarantee a usable runtime path.

### Match the platform to the communication pattern

| Workload characteristic | What to evaluate first |
|---|---|
| Independent inference, development or analytics jobs | PCIe cards with sufficient memory and a suitable host configuration |
| A model that fits on one or two GPUs | The simplest supported configuration that meets latency and throughput targets |
| Training or inference with heavy communication between several GPUs | SXM/HGX alongside measured PCIe alternatives |
| Distributed scientific computing | The application's actual communication pattern, numerical requirements and scaling efficiency |
| A job spanning several servers | The complete network and storage architecture, in addition to the GPU fabric |

Application labels alone are too broad to decide the platform. Medical imaging, language models and scientific computing can each include both independent and tightly coupled jobs. Start with the model and execution pattern, measure the bottleneck, and then price the hardware that removes it. For a PCIe shortlist, continue with [selecting the right server for the card](/en/articles/pcie-gpu-server-selection-en/).
