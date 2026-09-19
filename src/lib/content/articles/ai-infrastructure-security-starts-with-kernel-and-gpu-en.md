---
title: "AI infrastructure security starts with the kernel and GPU"
slug: ai-infrastructure-security-starts-with-kernel-and-gpu-en
translationGroup: ai-infrastructure-security-starts-with-kernel-and-gpu
lang: en
date: 2026-02-26
faDate: "26 February 2026"
category: Security
excerpt: "The AI stack connects the kernel, drivers, runtimes, containers, data, models and accelerators. A compatibility or trust failure in one layer can compromise the entire workload."
readTime: "8 min read"
cover: "/images/articles/ai-infrastructure-security-starts-with-kernel-and-gpu/ai-compute-stack.png"
draft: false
related: ["containers-are-not-security-boundaries", "from-zero-trust-to-zero-trust-ai-en", "zero-trust-ai-principles-and-controls-en", "gpu-server-platform-components-en", "pcie-gpu-server-selection-en"]
---

In AI and high-performance computing, the operating system does more than provide a place to run an application. It participates in data movement, compute scheduling, memory access and the system's operational correctness. Changing a kernel, driver or low-level library can alter performance, memory consumption, stability and even reproducibility without changing the model's code.

Infrastructure security follows the same chain. When the kernel, GPU driver, container runtime and resource-allocation tools are incompatible or cannot be audited together, model-level controls rest on a fragile foundation. AI security starts with the kernel and GPU, although it extends well beyond them.

## Silent incompatibility can be more dangerous than an obvious failure

Binary incompatibility does not always begin with a crash. The system boots, the service starts and the workload runs, but scheduling, memory management or interrupt handling behaves slightly differently. In a long training run or HPC simulation, that difference can cause a performance regression, an intermittent failure or a result that cannot be reproduced.

The binary interface between the kernel and its modules is an invisible contract. Some ecosystems preserve it over a long support cycle by maintaining a stable ABI and backporting patches. Others accept changes and manage them through module packaging, testing and rollback procedures. Neither approach is inherently superior. The organization needs to know what has remained stable, what has changed and how it will validate the result.

An offline environment makes this harder. A driver that needs a local build after a kernel upgrade brings a compiler, headers, source code and development tools into the production system. This expands the attack surface and makes a compilation failure capable of cutting off GPU access altogether. A prebuilt, tested package can reduce that risk, provided its build and signing chain is trustworthy.

## A GPU is not an ordinary peripheral

In a conventional workload, losing an accelerator may merely reduce performance. In AI, the GPU may be what makes running the model possible. Memory capacity and bandwidth constrain what the system can accommodate; the interconnect topology affects training scale; and the driver and runtime control every workload's access to this resource.

Hardware selection requires distinguishing card families, form factors, power requirements, interconnects and workloads. The [GPU selection guide](/en/guides/gpu-selection/) examines those deployment decisions. Security depends on the resulting bill of materials too: the actual card model and part number, firmware, driver version, supported server and update path should be validated as one configuration.

Features such as MIG on certain data-center GPUs divide a physical GPU into separate hardware instances with defined shares of compute, cache and memory. For a multi-tenant environment, this provides stronger separation than software time-slicing, but enabling and maintaining it depends on coordination between the kernel, driver, management tools and container runtime. A MIG configuration that disappears after a reboot or changes with a driver upgrade is not a persistent control.

## Containers do not remove the GPU's dependency on the host

NVIDIA Container Toolkit and similar tools let an application inside a container access the host GPU. User-space libraries can live inside the image, but the kernel driver remains on the host. The image, libnvidia-container, runtime and driver versions therefore need to be compatible.

This is where the assumption that a container has fixed the entire environment breaks down. The application image may be immutable while the host and driver continue to change. If those two lifecycles are managed separately without joint testing, a kernel security patch can break GPU access, and a driver upgrade can change the environment in which the model was validated.

Record the model and software image, driver, kernel, firmware and GPU configuration as an approved execution profile. Acceptance testing should go beyond checking that `nvidia-smi` can see the card: test the actual workload, memory allocation, multi-tenant execution, reboot and rollback. [Containers are not independent security boundaries (in Persian)](/articles/containers-are-not-security-boundaries/) examines the host's role in more detail.

## Data, models and GPUs are connected assets

Traditional architectures treated data as something in a database, software as code and hardware as the platform beneath them. AI makes these divisions less useful. Data shapes model behavior, the model embodies investment in data and computation, and GPUs enable training or inference at the required scale.

- **Data** may be classified, unique or collected through real operations. Poisoning it can alter the system's decisions; leaking it exposes the underlying information.
- **The model** is more than an executable file. Its weights and architecture are intellectual and operational assets. Theft can transfer the organization's investment to an attacker.
- **The GPU** is a scarce, costly resource dependent on its supply chain. Unauthorized computation, service disruption or driver failure can remove operational capacity without destroying any data.

Access policy needs to treat these assets together. Permission to run a job does not necessarily imply direct access to raw data or weight files. A service that loads a model should not be able to change the host image or driver. An infrastructure administrator does not necessarily need to see training data. This separation connects infrastructure security to the [principles of Zero Trust AI](/en/articles/zero-trust-ai-principles-and-controls-en/).

<figure>
  <img src="/images/articles/ai-infrastructure-security-starts-with-kernel-and-gpu/ai-threats.png" alt="Data poisoning, adversarial examples and model theft as threats to an AI system" />
  <figcaption>Secure execution does not prevent every AI attack: data and models have attack surfaces of their own.</figcaption>
</figure>

## An attack need not involve a conventional intrusion

In traditional software, behavior is largely expressed in explicit code. In AI, some of the logic resides in training data and model weights. An attacker can poison data, infer information from outputs, redirect a decision with an adversarial example or target a model update without installing malware or breaking out of a container.

Securing execution therefore does not by itself secure decisions. The kernel and GPU must be secure and stable, but data preparation, training, evaluation, deployment and outputs also require provenance, authorization and supporting evidence. [From Zero Trust Architecture to Zero Trust AI](/en/articles/from-zero-trust-to-zero-trust-ai-en/) explains the distinction between those scopes.

## Include the hardware supply chain in the threat model

High-end GPUs pass through complex supply chains and are subject to export restrictions. A sensitive organization should assess firmware authenticity, sourcing, previous ownership, update availability and dependence on the manufacturer's services. This is not an allegation of a hidden mechanism in a particular product. It means considering tampering, withdrawn support and restricted access as possible threats.

Supplier diversity, hardware testing before deployment, management-network isolation, firmware-version records and monitoring for abnormal behavior can reduce these risks. Consumer and data-center cards are not complete substitutes for each other. Diversification needs to meet actual memory, reliability and scale requirements rather than simply add more brands to a purchasing list.

## Stability does not mean freezing the stack forever

Freezing kernel and driver versions offers short-term reproducibility while accumulating vulnerabilities and incompatibilities with new hardware. Constant updates can destabilize a validated environment. A controlled change cycle needs version profiles, an internal repository, a matching staging environment, real test workloads, snapshots, staged rollout and a predefined rollback path.

AI infrastructure security neither ends with buying a GPU nor begins with installing its driver. It depends on a verifiable chain from firmware and kernel through data, model and output. An uncontrolled change anywhere in that chain can invalidate the organization's AI capability as a whole.
