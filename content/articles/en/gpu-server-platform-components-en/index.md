---
title: "Beyond the GPU: CPU, memory, storage and networking"
slug: gpu-server-platform-components-en
lang: en
date: 2025-05-19
faDate: "19 May 2025"
draft: false
category: AI infrastructure
excerpt: "Size the rest of a GPU server around data preparation, memory use, storage traffic and the application's communication pattern."
readTime: "6 min"
cover: "/images/articles/gpu-server-platform-components/cover.png"
related: ["pcie-gpu-server-selection-en", "dgx-and-standard-gpu-servers-en", "choosing-gpu-for-ai-en"]
---

A multi-GPU server can accelerate one parallel job or run several independent jobs at once. The second use is valuable even when the application cannot distribute a single task across GPUs: users can share the chassis, power provision and rack space. In both cases, the host platform must supply data and services fast enough to make the GPUs useful.

This article covers CPU, system memory, storage and networking. For the physical installation of particular cards, use the [PCIe server selection guide](/en/articles/pcie-gpu-server-selection-en/).

### CPU capacity and topology

Although GPUs perform much of the computation in many AI workloads, CPUs still prepare data, schedule work and collect results. Tokenization, decoding, augmentation and parts of a retrieval pipeline may consume significant CPU time. Work that does not need a GPU can sometimes run on conventional servers, keeping scarce accelerator capacity available for the tasks that benefit from it.

There is no universal CPU brand or minimum clock speed for a GPU server. In a multi-GPU configuration, the number of PCIe lanes, the attachment of slots to each CPU, memory channels and bandwidth can matter more than nominal core count. The processor must also be supported in the selected chassis configuration.

NUMA topology deserves particular attention in a dual-socket server. A GPU, its data-loading process and its network adapter may not all be attached to the same CPU. The resulting traffic paths can affect performance even when the headline specifications appear sufficient. Evaluate the proposed topology with the application, rather than treating the CPU as an isolated purchase.

### System memory

RAM requirements depend on how the application uses the host. A well-optimized inference workload may keep the model and active working set on the GPU and need relatively little host memory. Data loaders, caches, preprocessing, CPU offload and concurrent users can change that requirement considerably.

A fixed ratio between system RAM and total GPU memory is only a rough planning shortcut. It does not replace measurement. The amount of data retained in memory, the number of workers and the application's allocation behavior are more useful inputs.

In one deployment I examined, a team used more than a terabyte of host memory and concluded that the server needed an upgrade. Debugging reduced the requirement to roughly 64 GB. That observation is not a sizing recommendation for other workloads; it shows how a software defect can present itself as a hardware shortage. Profile memory use before turning every out-of-memory incident into a procurement request.

### Three storage roles

Storage design is easier to reason about when three roles are separated:

- **Operating system and essential tools.** Size these disks for the OS, drivers and management software. Use reliable devices and define the recovery procedure. Mirroring may help availability, but the appropriate design depends on how quickly the machine must return to service.
- **Containers, logs, caches and scratch space.** Capacity and I/O performance depend on the workload and its read/write pattern. Choose the drive layout and any RAID scheme with failure tolerance and rebuild time in mind; a fixed number of disks or a particular RAID level is not a universal AI configuration.
- **Models, datasets and checkpoints.** These may be local or shared. Calculate capacity from data volume, growth, retained versions and retention policy. A dataset or checkpoint that cannot be reproduced needs both suitable redundancy and an independent backup.

Shared storage also introduces a network requirement. A large local SSD does not solve a bottleneck caused by repeatedly reading training data from an overloaded shared service. Measure the complete path used during startup, steady execution and checkpoint writes.

### Separate network responsibilities

Independent jobs may place modest demands on the compute network, although data access can still be substantial. A job distributed across several servers is different: the network becomes part of the computation itself.

Distinguish three responsibilities when designing the system:

- **Out-of-band management.** Isolate management access from application traffic, using a dedicated network where required by the operating model. Size it for the management tools and recovery procedures.
- **User and service access.** Design this around data transfers, security policy and the location of clients and datasets. It need not share the management or compute network.
- **Communication between compute nodes.** Choose bandwidth and latency targets from the parallelism strategy, GPU count, collective operations and use of RDMA or GPUDirect. A familiar Ethernet speed is not enough to establish suitability.

NVIDIA's [NCCL documentation](https://docs.nvidia.com/deeplearning/nccl/user-guide/docs/overview.html) describes multi-GPU communication within and across nodes using PCIe, NVLink, InfiniBand and IP networking. A framework being able to use those transports does not establish how well a particular application scales. Test the intended code and configuration.

In [H100 and H200 HGX/DGX systems](/en/articles/dgx-and-standard-gpu-servers-en/), NVSwitch connects the GPUs inside a server. It does not replace the network between servers. The [DGX SuperPOD reference architecture](https://docs.nvidia.com/dgx-superpod/reference-architecture-scalable-infrastructure-h100/latest/dgx-superpod-architecture.html) separately specifies compute nodes, networks, management and storage. An internal NVLink bandwidth figure should therefore never be written into a purchase request as the available bandwidth between two servers.

A balanced platform is one whose components support the intended workload together. Start with a representative run, identify where the GPUs wait, and size the CPU, memory, storage and network to address those waits. The [GPU selection article](/en/articles/choosing-gpu-for-ai-en/) applies the same reasoning to the accelerator itself.
