---
title: "Choosing a PCIe GPU server: fit, topology, power and cooling"
slug: pcie-gpu-server-selection-en
lang: en
date: 2025-05-19
faDate: "19 May 2025"
draft: false
category: AI infrastructure
excerpt: "Check the exact GPU and server configuration, then verify sustained performance before accepting the system."
readTime: "8 min"
cover: "/images/articles/pcie-gpu-server-selection/cover.png"
related: ["gpu-server-platform-components-en", "pcie-vs-sxm-for-ai-en", "dgx-and-standard-gpu-servers-en"]
---

An “eight-GPU server” is a starting point for an inquiry, not a compatibility statement. The number may apply only to particular cards, power limits, risers and cooling kits. A suitable purchase specifies the exact server bill of materials and the exact GPU part numbers that will operate together.

### Identify the card before choosing the chassis

Product-family names conceal important differences. H100 PCIe, H100 NVL and H100 SXM are not interchangeable. Consumer cards built around the same GPU can also vary in length, width, cooler design and connector placement. These differences affect whether the card fits, whether adjacent slots remain usable and whether the server can remove its heat.

Passive cards rely on the server to force air through their heatsinks. Many consumer cards use open-air coolers designed to circulate air inside a desktop case. An active cooler does not automatically make a card suitable for a densely packed rack chassis. Check the airflow path, inlet conditions, connector clearance and the space needed for safe cable routing.

A card occupying three or four slots may block both another GPU position and an essential network adapter. The [GPU types guide](/en/articles/gpu-types-for-ai-en/) explains the broader product categories, but physical compatibility is always a question about the actual part number.

### Read the PCIe topology

PCIe devices can generally negotiate a common supported link generation, but that does not establish OEM qualification for a particular card and server. A physically x16 slot may also have fewer electrical lanes, or may be available only with a certain CPU or riser installed.

Ask how each GPU connects to the CPUs and whether it shares an upstream link through a PCIe switch. In a dual-socket server, record which CPU owns each GPU and NIC. This matters when the application transfers data between GPUs, performs CPU offload or uses storage and networking paths that depend on PCIe traffic.

Vendor block diagrams provide the intended topology. On a configured NVIDIA system, `nvidia-smi topo -m` helps inspect the visible relationships between devices. Compare that output with the proposed design and test the transfers the application actually performs. The [PCIe/SXM comparison](/en/articles/pcie-vs-sxm-for-ai-en/) discusses when a faster GPU fabric becomes valuable.

### Size power for the complete operating condition

Adding GPU power ratings is not enough to size a server. CPUs, memory, disks, NICs and fans also consume power. Include the intended operating limits, transient demand, power-supply efficiency and the redundancy policy.

An advertised redundant PSU arrangement may not preserve full compute capacity after a supply or input feed fails. Ask whether the quoted configuration maintains the required load in the specified failure condition, or whether it must reduce GPU power. The electrical provision at the rack must support the same assumptions.

Power cables and GPU enablement kits are part of the configuration. Their connectors, ratings and routing should appear in the bill of materials. Treat them as required components of the system, not accessories to resolve after the cards arrive.

### Cooling must work under sustained load

Check the OEM's supported cooling kit, ambient-temperature limits and card population rules. A configuration may support a given GPU only below a particular inlet temperature, or only with a certain fan, heatsink or blanking arrangement.

Liquid cooling introduces its own integration work: coolant distribution or radiators, pumps, maintenance and failure handling. Cooling the GPU package does not remove the need to cool memory, voltage regulators and other server components. The chosen arrangement must support the complete system.

Acceptance testing should establish that the server can sustain the intended workload without unacceptable thermal or power throttling. A short demonstration that loads the model and produces an answer does not establish stable production performance.

### Provide the host resources the application uses

There is no fixed CPU-core or RAM-to-GPU ratio that fits every workload. Tokenization, image decoding, augmentation, retrieval, caching and CPU offload can each change host requirements. Start with a representative application run and measure the resources used by the planned number of concurrent jobs.

Storage needs a similar distinction between the operating system, local scratch space and persistent datasets or checkpoints. The network must then support the actual movement of that data. Choosing 10, 100 or 400 Gb/s networking by habit leaves the most important question unanswered: what traffic must cross it, and when? Distributed execution may also require an appropriate RDMA configuration and an acceptable level of network oversubscription. These components are covered in more detail in [the server platform guide](/en/articles/gpu-server-platform-components-en/).

### Treat comparison tables as a shortlist

A vendor's maximum GPU count or a comparison table can narrow the field. Neither certifies the final configuration. Programs such as [NVIDIA-Certified Systems](https://www.nvidia.com/en-us/data-center/products/certified-systems/) are useful references, but the supported combination may depend on CPU choice, firmware, risers, GPU bridges, storage adapters, power supplies and cooling kits.

| Before placing the order | Evidence to request |
|---|---|
| Exact hardware configuration | Server and GPU part numbers, enablement kits, cables, risers and PSU arrangement |
| Official compatibility | The OEM's supported configuration or a written confirmation covering the proposed bill of materials |
| Device topology | CPU/GPU/NIC block diagram, PCIe lane widths and any shared switch uplinks |
| Software and firmware | Proposed BIOS, BMC, GPU driver and runtime versions |
| Sustained operation | Expected power limits, inlet conditions and the acceptance workload |
| Future expansion | The additional parts and supported population rules needed for the planned upgrade |

The same standard should apply when comparing [DGX, HGX and conventional PCIe systems](/en/articles/dgx-and-standard-gpu-servers-en/). A product family is not a complete bill of materials.

### Agree on acceptance tests before delivery

A practical acceptance run may last 24–72 hours, depending on the deployment and support agreement. Use the actual application alongside targeted hardware checks. Record temperature, clock behavior, power limits, negotiated PCIe links and any PCIe AER, NVIDIA Xid or relevant ECC errors. Where the workload spans GPUs, include its communication pattern and collective operations in the test.

If the system is designed to maintain service after a PSU or feed failure, include a controlled test of that condition under the agreed operating procedure. Verify that usable performance and power behavior match the promise in the quote.

Define what constitutes a pass before the server is delivered. The important result is a stable, supported configuration that meets the workload's targets. That agreement makes integration responsibility explicit and prevents a buyer from discovering, after installation, that a nominally compatible set of parts still needs substantial engineering work.
