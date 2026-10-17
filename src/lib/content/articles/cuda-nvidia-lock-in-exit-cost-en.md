---
title: "What breaks if we remove NVIDIA tomorrow?"
slug: cuda-nvidia-lock-in-exit-cost-en
translationGroup: cuda-nvidia-lock-in-exit-cost
lang: en
date: "2026-10-17"
faDate: "17 October 2026"
draft: false
math: true
cover: /images/articles/cuda-nvidia-lock-in-exit-cost-en/cover.png
coverCredit: "Conceptual illustration generated with AI and localized into English."
category: AI infrastructure
excerpt: "CUDA is more than a library. Kernels, multi-GPU communication, inference engines, operations and team expertise all contribute to the cost of moving an NVIDIA-based service to Ascend."
readTime: "14 min"
author: Mehran Ziabary
toc: auto
related:
  - ascend-vs-nvidia-real-performance-gap-en
  - int8-or-fp8-real-gpu-support-en
  - gpu-inference-latency-throughput-en
tags:
  - AI infrastructure
  - CUDA
  - NVIDIA
  - Ascend
  - PyTorch
  - Vendor lock-in
---

*CUDA is more than a library: where does the cost of leaving NVIDIA hide?*

In the [first article in this series, published in Persian](/articles/ai-infrastructure-beyond-nvidia/), my argument was that the issue is not whether NVIDIA is good or bad. It is that building an entire AI infrastructure around one supplier gradually limits the choices available later. In the [second article](/en/articles/ascend-vs-nvidia-real-performance-gap-en/), I moved from policy to the technical comparison: hardware specifications, memory, interconnects, kernels and actual model execution on Ascend and NVIDIA. The responses raised another question that may be even closer to the infrastructure decisions we face today: if an Ascend server with sufficient capacity were placed next to our NVIDIA server tomorrow, could we move both the model and the service we have built onto it?

The first answer is usually that CUDA is the problem, but treating CUDA as a library, or even just an API, leaves much of the issue unexplained. As [NVIDIA's introduction to the CUDA platform](https://docs.nvidia.com/cuda/cuda-programming-guide/01-introduction/cuda-platform.html) describes, it encompasses the programming model, runtime, driver interface, compiler, PTX virtual instruction set, computational libraries and development tools. In a production system built on that platform, inter-GPU communication, the inference engine, profiling tools and deployment practices may also depend on the same hardware. Counting CUDA calls is therefore not enough to understand migration cost; we need to identify how many layers assume that the target hardware will be NVIDIA.

## Dependence does not always begin with a bad decision

Before going further, I should clarify that vendor lock-in does not necessarily mean a supplier has deliberately designed a trap. Much of the dependence on NVIDIA follows naturally from optimization. Suppose a general-purpose PyTorch kernel on H100 is too slow for our workload, so the team rewrites it in CUDA. It then adopts CUDA Graph to reduce latency, uses NCCL to connect eight GPUs, and chooses TensorRT or TensorRT-LLM for inference. If deployment packages are built from CUDA container images and performance analysis relies on NVIDIA tools, each step can be reasonable and even necessary in its own context.

The consequences become apparent when, a few years later, we try to move the result to another accelerator. The model weights may transfer easily, while the optimized kernel, inference engine, communication tuning and operational tools do not. **Model portability and service portability are different properties.** If we treat them as equivalent, our estimate of the cost of changing infrastructure will be incomplete from the outset.

## What do we mean when we call a model portable?

Migration discussions often begin and end with the question, “Did the model run on the new hardware?” Running is necessary, but it does not settle an infrastructure decision. A model may produce output while its quality changes, latency exceeds the permitted limit, or maintenance becomes difficult for the operations team. At least four aspects of portability need to be assessed separately:

| Aspect of portability | Main question |
|---|---|
| Functional | Does the model execute on the other hardware, with support for the operations it needs? |
| Numerical | Do the outputs and model quality remain within acceptable limits? |
| Performance | Are time to first token (TTFT), time per output token (TPOT), throughput and memory consumption still suitable? |
| Operational | Can we deploy, monitor, scale, recover and maintain the service? |

Reaching the first level might take a day, while recovering the previous performance could take weeks or months. In that situation, “the model ran on Ascend” describes only part of the journey. It does not yet establish that the system can serve users within the required service-level agreement. The real migration cost includes all four aspects.

## Model weights are usually not where the problem starts

In many systems, the weights are among the least hardware-dependent components. A standard PyTorch checkpoint or a Safetensors file is not inherently an NVIDIA artifact, and Llama or Qwen weights do not belong to CUDA. They can be loaded if the target execution environment supports the model architecture, data types and required operators. That condition matters: sharing a model file format does not mean every layer needed to execute it is ready.

Quantization introduces further dependencies. As I explained in the [article on INT8 and FP8](/en/articles/int8-or-fp8-real-gpu-support-en/), the label “FP8” alone does not specify the computational path used to run a model. The [TensorRT-LLM quantization documentation](https://nvidia.github.io/TensorRT-LLM/latest/features/quantization.html) likewise shows that support for formats and methods such as FP8, MXFP8, NVFP4, AWQ and GPTQ depends on the hardware generation and execution path. The original weights may therefore be portable even when the version quantized and optimized for a particular accelerator cannot be used in the same form on the destination.

## A PyTorch program is not necessarily a CUDA program

An important distinction here is that using PyTorch does not automatically make a program dependent on CUDA. PyTorch provides mechanisms for other accelerators, and its [accelerator integration guide](https://docs.pytorch.org/docs/main/accelerator/index.html) describes facilities such as `PrivateUse1` and `torch.accelerator` in that context. These mechanisms let developers add support for new hardware, although having an integration path is different from supporting every model and feature completely.

The effect of this choice is visible in application code. In the following example, device selection is separated from moving the model and data. Provided that the required operators are supported, the main application does not need to know the hardware vendor:

```python
device = get_device()
model = model.to(device)
x = x.to(device)
```

The next version embeds the CUDA choice directly in the application. During migration, that assumption must be found and changed wherever it appears:

```python
torch.cuda.set_device(0)
model.cuda()
x = x.cuda()
```

This looks like a small difference, but repeated throughout a project it determines the boundary between model code and hardware-dependent code. The [PyTorch documentation for backend registration](https://docs.pytorch.org/docs/main/generated/torch.utils.backend_registration.generate_methods_for_privateuse1_backend.html) also recommends general interfaces such as `to(device=...)` wherever possible. Using standard operators and keeping device selection separate from the main logic can reduce migration work. As we move below that general interface to obtain more performance, however, we take on more responsibility for portability ourselves.

## Custom kernels and CUDA Graph: optimization in the lower layers

When a general-purpose kernel is too slow, we may rewrite an operator in CUDA C++, introduce a `.cu` file and compile it with NVCC. At that point we are doing more than using a general PyTorch capability: part of the application has been written specifically for NVIDIA's platform. If the service depends on that kernel for its performance, moving the model to Ascend requires finding an equivalent implementation or rewriting it for the target hardware.

PTX does not remove this requirement. As the [CUDA platform documentation on code compatibility](https://docs.nvidia.com/cuda/cuda-programming-guide/01-introduction/cuda-platform.html) explains, PTX is NVIDIA's virtual instruction set, which the driver compiles into executable code for the target GPU. It helps provide forward compatibility within the CUDA family; it is not a vendor-neutral intermediate representation that will also execute on Ascend. Even compatibility of a `cubin` binary across major NVIDIA compute-capability generations should not be assumed.

PyTorch allows different implementations of a custom operator to be registered and dispatched according to the device, but that mechanism must be distinguished from the existence of a ready implementation. The [PyTorch operator integration guide](https://docs.pytorch.org/docs/stable/accelerator/operators.html) explains the responsibility of a new accelerator backend to cover the necessary operators and variants. If a project-specific operator is missing, the framework's generality does not do the implementation work for the team.

Dependence is not limited to writing kernels. In small-batch inference with fast kernels, the CPU-side overhead of preparing and launching operations can become significant. The mechanism described in the [CUDA Graph guide](https://docs.nvidia.com/cuda/cuda-programming-guide/04-special-topics/cuda-graphs.html) lets operations and their dependencies be defined and prepared once, then replayed with less overhead. If our service meets its latency target because of that capability, the destination needs more than operator coverage: it also needs an adequately performing graph-execution mechanism. This is where the distinction between running a model and running it at the required performance becomes concrete.

## Communication between accelerators: renaming NCCL to HCCL is not enough

On a single GPU, much of the complexity of distributed communication remains invisible. Once we partition a model or its data across several processors, the communication library becomes part of the critical execution path. As [NVIDIA's NCCL overview](https://docs.nvidia.com/deeplearning/nccl/user-guide/docs/overview.html) describes, the library supports collectives such as AllReduce, AllGather, ReduceScatter and AllToAll, as well as send and receive operations, with optimizations that account for the connection topology. In distributed training and mixture-of-experts (MoE) models, time spent in this layer can have a substantial effect on the overall result.

Suppose the application initializes its process group as follows:

```python
dist.init_process_group(backend="nccl")
```

Replacing `nccl` with `hccl` does not look like a large source-code change, and the [Ascend multi-device migration guide](https://www.hiascend.com/document/detail/en/Pytorch/2600/ptmoddevg/trainingmigrguide/FrameworkPTAdapter/26.0.0/en/pytorch_model_migration_fine_tuning/mig_methods_comp.md) identifies replacing NCCL with HCCL as a required adjustment. Distributed performance, however, depends on much more than the library name. Topology, process count, tensor sizes, overlap between communication and computation, expert placement and collective algorithms all affect execution time. The principal code change may fit on one line, while recovering the previous performance requires reviewing and retuning the communication pattern as a whole.

## Inference engines and containers are part of the dependency too

An important layer of inference dependence appears when we turn a model into an optimized execution engine. TensorRT optimizes the network, selects execution tactics and can serialize the resulting engine to a file. That file is different from a checkpoint containing the model weights. The [TensorRT support matrix](https://docs.nvidia.com/deeplearning/tensorrt/latest/getting-started/support-matrix.html) explains platform, version and hardware compatibility restrictions, while the [engine compatibility guide](https://docs.nvidia.com/deeplearning/tensorrt/latest/inference-library/engine-compatibility.html) makes clear that an engine file contains compiled CUDA tactics. Hardware and version compatibility features can relax some restrictions, but their supported scope and possible performance effects still need to be evaluated.

Portable Llama weights therefore do not imply a portable TensorRT engine built from those weights. The closer a deployment artifact gets to the hardware, the more of its optimization may be tied to that hardware. Keeping the original model alongside the optimized engine is consequently important for retaining the option to migrate.

Packaging a service in a container does not eliminate this dependence either. Containers provide a useful boundary for bundling applications and dependencies, but a CUDA container still relies on the host driver. The [NVIDIA Container Toolkit release notes](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/release-notes.html) discuss driver and compatibility-library behavior, and constraints such as `NVIDIA_REQUIRE_CUDA` can prevent a container from starting when the host driver does not meet its requirements. Saying that “everything is in Docker” is not, by itself, evidence of hardware independence. It makes dependencies easier to manage and version; the execution environment for a different vendor still has to be prepared.

## Which layers determine the cost of leaving?

Once the layers are considered together, two projects described identically as “running on NVIDIA” can have very different migration costs. The following table is not a benchmark and does not estimate engineering hours or money. It outlines what needs to be reconsidered as the dependency becomes deeper.

| Application design | Dependence on NVIDIA | Likely migration cost |
|---|---|---|
| Standard weights, general PyTorch operators and `to(device)` | Low | Low, provided the destination supports the operators |
| PyTorch with `torch.compile` and general optimizations | Low to medium | Low to medium, depending on the destination's compilation support |
| A serving-specific execution environment without custom kernels | Medium | Medium |
| Custom CUDA extensions and kernels | High | High |
| CUDA Graph and GPU-specific optimization | High | High |
| Multi-GPU execution with deep NCCL and NVLink tuning | High | High |
| TensorRT or TensorRT-LLM engine with custom kernels and communication tuning | Very high | Very high |
| All of the above, plus NVIDIA-dependent integration, deployment, profiling and monitoring | Structural | Changes to both software and operating practices |

The same idea can be written as a sum of costs: changing the code, rewriting kernels, redesigning communication, replacing the engine, preparing operations, training the team and recovering performance.

$$
\begin{aligned}
C_{\mathrm{exit}} ={}& C_{\mathrm{code}} + C_{\mathrm{kernel}} \\
&+ C_{\mathrm{communication}} + C_{\mathrm{engine}} \\
&+ C_{\mathrm{operations}} + C_{\mathrm{skills}} \\
&+ C_{\mathrm{performance-recovery}}
\end{aligned}
$$

This is not a numerical model for calculating a migration budget. It is a reminder that counting changed source lines is insufficient. A model may run in the first hour with almost no code changes, yet require weeks of kernel and communication tuning to recover the previous latency. The reverse is also possible: a substantial code change may be followed by a quick return to acceptable performance. Purchasing and architecture decisions need to consider the combined cost.

## Is this dependence unique to NVIDIA?

One criticism of the first article was that vendor dependence is hardly new in technology. That is correct: Cisco, Oracle, VMware, HPE, AWS and Microsoft all have ecosystems that can be expensive to leave. The depth of dependence, however, differs between domains. Replacing an HPE x86 server with another supplier's x86 server does not normally require redesigning the application binary, compiler, numerical libraries and threading model, even though management and operational dependencies may remain.

In accelerated computing, the supplier can be present much further down the execution stack. Instruction sets, compilers, runtimes, kernels, communication libraries and inference engines may all assume particular hardware capabilities. My argument is therefore not that NVIDIA has created a unique phenomenon or that this dependence necessarily results from anticompetitive behavior. It is that changing such a stack cannot be costed as if it were an ordinary change of server supplier.

## What do PyTorch, Ascend and vLLM actually solve?

General-purpose frameworks can reduce part of this dependence. For example, the [guide to custom `torch.compile` backends](https://docs.pytorch.org/docs/main/user_guide/torch_compiler/torch.compiler_custom_backends.html) explains how alternative compilation and execution paths, including implementations outside the PyTorch core, can be registered. The more an application uses the framework's general interfaces, the more hardware adaptation can happen underneath it without changing the main model code. Choosing a custom kernel or runtime to obtain more performance transfers part of that portability responsibility back to the project. That can be entirely justified, provided the cost is understood.

On Ascend, TorchNPU sits between PyTorch and CANN and connects framework operators to NPU kernels. Huawei's [TorchNPU overview](https://www.hiascend.com/document/detail/en/Pytorch/2610/userguide/torchnpuoverview/docs/en/overview/product_overview.md) describes preserving many PyTorch programming patterns and changing device-transfer calls, for example from `.cuda()` to `.npu()`, as a straightforward migration route in simpler cases. Its [automatic migration tool guide](https://www.hiascend.com/document/detail/en/CANNCommunityEdition/900/devaids/migrationtools/msfmktransplt/README_EN.md) also documents the limitations: not every CUDA API is supported, NCCL must be replaced by HCCL, and an incompatible operator may require adaptation or implementation. Migration cannot always be reduced to renaming a few calls, but neither does every project need to be rewritten from scratch. The answer depends on the layers where the application relies on CUDA.

The architecture of vLLM Ascend provides another example. The [project introduction](https://docs.vllm.ai/projects/ascend/en/latest/) describes an Ascend hardware plugin that keeps hardware integration separate from the vLLM core. An application can use the common serving interface while hardware-specific behavior is implemented in the plugin. This moves part of the migration work from application logic to an adapter layer; it does not guarantee performance parity or complete feature coverage. As the [vLLM Ascend release notes](https://docs.vllm.ai/projects/ascend/en/main/user_guide/release_notes.html) illustrate, model support, KV cache behavior, context parallelism and other capabilities still need to be checked for the chosen version and hardware.

## Using CUDA while preserving the next choice

The conclusion should not be that we must avoid CUDA to preserve portability. If it is the fastest and most mature route for today's problem, giving up that advantage may be a poor engineering decision. The task is to maintain a deliberate boundary between general application code and vendor-specific implementations, so that each local optimization does not quietly tie the entire service to the same hardware.

| Design principle | Effect on migration |
|---|---|
| Keep model code as device-independent as practical | Changing the execution target requires fewer changes to model logic |
| Put custom kernels behind a defined interface | The hardware-dependent implementation can be replaced separately |
| Maintain a reference implementation for custom operators | The new implementation's results can be checked for correctness |
| Preserve the original model separately from the optimized engine | A hardware-specific artifact does not become the only copy of the model |
| Keep communication libraries out of the main application logic | Replacing NCCL or HCCL becomes more contained and explicit |
| Define benchmarks around service-level requirements | Successful execution is not confused with suitability for serving users |
| Periodically run on a second hardware backend in the integration process | Portability is measured in practice rather than remaining an architecture claim |

Another part of the cost is hidden in team expertise. Even portable code will not remove the learning curve for a team that has spent years working with NVIDIA drivers, `nvidia-smi`, CUDA out-of-memory errors, NCCL debugging, Nsight, TensorRT and NVIDIA's Kubernetes plugins. Troubleshooting tools, profilers, memory management and even the way errors are interpreted will change. That work is absent from a source diff. A team with repeatable benchmarks, regular profiling and a clear boundary between the application and its hardware starts from a better position when learning a new environment. Organizational knowledge is part of the infrastructure and belongs in the migration estimate.

## What future constraints have we accepted for today's performance?

CUDA's advantage goes well beyond a programming interface. Over many years, NVIDIA has brought compilers, runtimes, computational libraries, communication, development tools and inference engines together into an integrated platform. That integration is one reason for its success and can also increase the cost of leaving. The degree of dependence is not uniform: moving a model built on general PyTorch operators and moving a service built around custom CUDA kernels, graph execution, deep NCCL tuning and a TensorRT engine are different engineering problems.

The question I think we should answer before purchasing and optimizing is what future constraints we are accepting in exchange for today's performance, and whether the immediate benefit justifies them. Many hardware-specific optimizations are worth that trade. An informed decision, however, requires knowing which parts would need only retuning if circumstances changed, and which would require rewriting, team training and a lengthy recovery of performance.

In the next article, I want to follow this discussion through a real PyTorch project: which parts of a CUDA-to-CANN migration are API changes, where missing operators become a problem, how NCCL communication moves to HCCL, and what options exist for custom kernels. The final criterion will be more than whether the model runs. We need to establish how quality, latency, serving capacity and maintainability can be brought back to the required level after migration.
