---
title: 'From one user to enterprise LLM serving: when to change the model, replicas or GPU'
slug: single-user-to-enterprise-llm-serving-en
translationGroup: single-user-to-enterprise-llm-serving
lang: en
date: '2026-09-08'
faDate: '2026-09-08'
draft: true
math: false
category: Language models
excerpt: Diagnose queues, memory and availability separately. Worked replica and cloud-capacity examples show how to grow a service while preserving quality, latency and failure tolerance.
readTime: 14 min
cover: /images/articles/single-user-to-enterprise-llm-serving/cover.webp
related:
- evaluating-llms-for-your-language-and-workload
- llms-on-rtx-4090-24gb-vs-48gb-en
- airllm-layer-wise-inference-en
updated: '2026-09-17'
author: Mehran Ziabary
---

An organizational assistant often starts with a promising demonstration: a model runs on one GPU and answers the team's document questions. The problem changes when more people arrive, conversations grow and maintenance can no longer take the service offline. A more expensive card is tempting, but incorrect answers, long queues, exhausted memory and outages are different failures.

There are three separate expansion decisions: change the model, add complete serving replicas or change the hardware supporting each replica. A suitable small model replicated across ordinary hosts can provide more independent capacity and a maintenance path. Other workloads genuinely need a stronger model, more memory or faster communication between GPUs. The [LLM guide](/en/guides/llm/) helps separate these decisions before procurement.

## Count work, not employees

A thousand employees do not imply a particular GPU count. Many may ask only a few short questions; one automated process may keep issuing model calls. A person reading a response and a request actively generating tokens also consume different resources. Measure request arrival, input/output lengths and calls per completed task.

Define a service-level objective, or SLO, that can be tested. An **illustrative** target is “95% of interactive requests start responding within two seconds under the specified load.” The number is not a universal recommendation; it turns “fast” into an observable condition. A nightly extraction job may instead need a given number of correct documents completed by morning.

| Observation | Decision it informs |
| --- | --- |
| Normal and peak arrivals, including bursts | Replica count and temporary capacity |
| Input/output length distributions, history and documents | Memory and how long each request occupies the service |
| First-token, total-response and inter-token latency at p95/p99 | Experience of slower requests |
| Queue depth and age, errors and cancellations | Admission policy and capacity shortfall |
| Correctly completed tasks | Model capability versus infrastructure failure |
| Required service during a host outage | Spare capacity and placement |

[vLLM's metrics](https://docs.vllm.ai/en/stable/usage/metrics/) include queue, latency, token and KV observations in supported versions. Combine engine metrics with whole-application timing, since the user waits through retrieval, authorization and other stages too.

## Locate the waiting time

In a document assistant, authentication, search, reranking and prompt construction precede generation. A slow database or excessive retrieved context may be the bottleneck. Record stages separately before spending on the GPU stage.

Prefill processes the input; decode produces successive output tokens. A long prompt and a long answer with the same total token count need not behave alike. Removing irrelevant passages and budgeting output for the task can release capacity without changing the model, provided the necessary evidence and answer remain intact.

Continuous batching schedules work during generation rather than requiring every request in a batch to finish before new work enters. [Orca](https://www.usenix.org/conference/osdi22/presentation/yu) is a foundational reference. Greater aggregate output still needs to be evaluated alongside interactive latency. The [software table](/en/guides/llm/#serving-software) identifies compatible execution paths.

[Prefix caching in vLLM](https://docs.vllm.ai/en/stable/features/automatic_prefix_caching/) reuses computed common prefixes. Its main saving is prefill, not a general acceleration of new-token decoding. It also differs from storing and reusing a finished answer. Either cache must respect the application's data and access boundaries.

## Change the model when capability is the constraint

If answers are correct in quiet periods but slow during peaks, enlarging the model may add pressure. Examine scheduling, distribution and replicas first. Change the model when quality, input modality, required context or reasoning no longer fits the current choice.

Bounded extraction or classification can begin with a specialist or a 2–4B candidate; a direct document assistant can compare an approximately 8B model with smaller and stronger alternatives. These are shortlist sizes, not quality guarantees. The [model-size guide](/en/articles/right-model-size-for-the-task-en/) and [RAG stack article](/en/articles/enterprise-rag-model-embedding-reranker-en/) explain how to diagnose the task.

A smaller resident model can simplify replication and leave room for active contexts. Quantizing its weights does not reduce every memory component proportionately: KV remains a separate budget. Successful loading is therefore different from stable serving at the target load.

Routing can reserve a stronger model for identified difficult cases. Include the entire path's success, latency and cost: trying a small model and then retrying on a large one pays for both. Confident phrasing is not a validated classifier of request difficulty.

## Replication and model partitioning are different

Here a **replica** means a complete serving instance, not a new weight release. Four GPUs each running a complete model can offer four serving units. Four GPUs needed jointly for one partitioned model may offer only one such unit.

[vLLM's parallelism guide](https://docs.vllm.ai/en/stable/serving/parallelism_scaling/) separates multi-GPU execution from scaling instances. Tensor or pipeline parallelism may solve model fit; data-parallel arrangements distribute work. Actual process dependencies determine whether two apparent units are independent.

| Architecture change | Potential benefit | What does not follow automatically |
| --- | --- | --- |
| Complete replicas on separate GPUs | Distribute independent requests | Each single request becomes proportionately faster |
| One model split across GPUs | Memory and compute for that model | Multiple replacement instances |
| Several replicas in one host | More capacity and some process/card fault tolerance | Survival of host failure |
| Replicas on independent hosts | Maintenance or host-outage capacity | Independence of shared power, storage or networking |
| Temporary cloud replicas | Follow variable demand | Instant, guaranteed availability of new capacity |

Independent requests need not exchange layer outputs continuously across hosts, although document access and routing still use a network. A partitioned model can be sensitive to interconnect latency and bandwidth. This is why inference replication and a tightly coupled training cluster have different infrastructure economics.

## A worked capacity example

Assume one replica handles **40 requests/minute** within the required quality and latency on the team's specified workload. This is an **educational input**, not a measured claim about RTX 4090 or any model. Peak demand is **90 requests/minute**, each replica has its own independent host and shared components are not limiting. The 40-request figure is a usable operating rate, not an unstable saturation point.

| Ready replicas | Capacity under the assumption | After losing one replica | Result at 90 requests/minute |
| --- | ---: | ---: | --- |
| 2 | 80 | 40 | Insufficient even when healthy |
| 3 | 120 | 80 | Healthy capacity sufficient; outage capacity insufficient |
| 4 | 160 | 120 | Arithmetic covers loss of one replica |

The initial equal-capacity calculation is `ceil(target load / capacity per replica)`. Add one for loss of one independent replica. Load imbalance, smaller batches after distribution, cold caches and retry bursts can make measured total capacity differ from this arithmetic.

Now put the four GPUs two per host on two hosts. Losing one host removes two replicas and leaves 80 requests/minute: the target fails. Under the same assumptions, three two-replica hosts leave four replicas after one host is lost. Plan against the **largest capacity group removed by the failure being designed for**. A zone-outage objective requires enough capacity outside that zone.

## Availability starts with the capacity left over

A second model helps only if routing reaches it and its dependencies work. Authentication, document retrieval, conversation storage, load balancing and networking can be shared failure points. Conversation state needed after failover should not exist solely in one model process's memory.

Our Targoman deployment used two active hosts with one RTX 4090 each. During model reload on one host, the other continued translation, summarization and chat, but waiting and some cancellations increased. The [original Persian account](/articles/targoman-300-concurrent-requests-one-rtx-4090/) illustrates the difference between remaining reachable and preserving the same service objective. It is not a quantified availability guarantee.

[Kubernetes topology spread constraints](https://kubernetes.io/docs/concepts/scheduling-eviction/topology-spread-constraints/) can implement placement across hosts or zones. [PodDisruptionBudget](https://kubernetes.io/docs/concepts/workloads/pods/disruptions/) helps limit voluntary disruptions; it does not prevent sudden host failure. Capacity and application behavior must make the placement useful.

For planned replacement, load and warm the new instance before admitting traffic, then drain the old one. Sudden failure can interrupt an in-progress stream. Retrying an agent operation must not duplicate an external payment, document creation or other side effect; operation identities and duplicate handling belong in the application. Request-path availability is not uninterrupted continuation of every generated response.

## When a larger GPU addresses the actual problem

More VRAM matters when the required model, context or KV cannot fit. More per-instance capability matters when an isolated request is already too slow; replicas alone do not fix that latency. A professional platform can also reduce rack space, energy per useful job or operating effort for sustained demand.

The [GPU guide](/en/guides/gpu-selection/) compares memory, interconnect and platform requirements. Compare the complete architecture at the same quality and latency, including the additional host needed for availability. One powerful card does not create a second independent instance. Two 24 GB cards also do not automatically become one unified 48 GB memory space; the [24/48 GB article](/en/articles/llms-on-rtx-4090-24gb-vs-48gb-en/) explains the distinction.

## Billing flexibility is different from autoscaling

Temporary capacity is useful while demand and model choice are uncertain, for experiments or for periodic peaks. Once the pattern is known, baseline demand can use an appropriate purchase, reservation or rental arrangement while variable work uses another route.

**Pay as you go describes billing; autoscaling describes capacity control.** Closing an application need not stop a rented machine's bill. [EC2's lifecycle documentation](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-lifecycle.html) distinguishes running instances from stopped ones and separately billed resources. Other services meter worker startup, execution or an idle timeout. Compare the actual billable unit and when it starts and stops.

GPU sharing is another allocation choice: services can receive managed portions rather than each reserving a whole card. For modest or variable demand, this may avoid paying for unused exclusive capacity. Memory allocation, interference, isolation and response time under simultaneous demand remain part of the comparison. Sharing is not synonymous with an interruptible instance, nor does it necessarily require the same virtualization mechanism on every platform.

| Capacity arrangement | Useful for | Cost or operational condition to include |
| --- | --- | --- |
| Always-ready GPU instance | Baseline interactive demand | Idle time, spare capacity and management |
| Managed shared GPU resources | Lower or variable demand | Memory share, concurrent-use rules and busy-period latency |
| Temporary replicas beside a baseline | Predictable or seasonal peaks | Provisioning time, GPU availability and data transfer |
| Scale-to-zero service | Infrequent work that tolerates waiting | Cold start and resources still billed after shutdown |
| Interruptible/Spot capacity | Restartable or resumable queued jobs | Interruption and recovery work |
| Hosted model API | Limited demand or a specialized route | Quality, latency, limits and all calls per task |

[AWS Spot interruptions](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/spot-interruptions.html) are one documented example of reclaimable capacity. Such a service needs recovery or an alternative path if the workload cannot simply wait. Shared allocation alone does not imply reclaimability; the service contract determines that property.

## A worked example of following the peak

Return to the assumed 40 requests/minute per replica. Suppose normal load is 30, so two ready independent replicas preserve sufficient capacity after losing one. The 90-request peak needs four replicas for the same failure objective.

In an **illustrative 720-hour month**, keeping four replicas ready continuously uses **2,880 replica-hours**. Keeping two ready continuously and adding two for **60 hours each**, including preparation and idle shutdown time, uses:

`2 × 720 + 2 × 60 = 1,560 replica-hours`

That is about **46% fewer replica-hours**. In this example each replica has one GPU, so GPU-hours happen to match. A shared GPU or multi-GPU replica changes the unit. It is not automatically a 46% reduction in the whole bill: tariffs, storage, networking and management can differ between capacity types.

Extra replicas must be ready before the peak and placed to preserve the assumed failure tolerance. Starting them only after a queue forms adds provisioning, weight download, loading and warm-up to the wait. [Ray Serve's autoscaling guidance](https://docs.ray.io/en/latest/serve/advanced-guides/advanced-autoscaling.html) discusses cold starts; infrastructure scaling is another layer. Removing model processes does not necessarily release cloud machines or their billed resources.

For predictable peaks, prewarm capacity. For sudden bursts, retain appropriate ready headroom and admission limits. Queue age and latency approaching the objective, together with memory and in-flight work, can be more informative than GPU utilization alone. Scale-down cooldowns reduce oscillation; minimum fault-tolerant capacity and cost ceilings still apply.

A hybrid local/cloud fallback needs compatible weights, templates, permitted data access and networking prepared in advance. Autoscaling cannot create unavailable regional capacity or quota, and an instance downloading everything during an outage is not equivalent to a warm spare.

## An unlimited queue is not a scaling strategy

Separate short interactive work, long analysis and background jobs where necessary. Set input, output and runtime budgets appropriate to each. When capacity is exhausted, bounded waiting or asynchronous completion can be preferable to an ever-growing queue. A lower-quality model should follow an explicit product policy, not silently replace sensitive analysis.

Retries can amplify overload. Limit attempts and use increasing delays with jitter; propagate cancellation to the engine when supported so abandoned work stops consuming capacity. [Google's overload-handling guidance](https://sre.google/sre-book/handling-overload/) connects admission, retries and load balancing.

Evaluate bursts, long inputs, replica loss, cold-cache recovery and dependency failures. Record late, cancelled and failed requests alongside successful output. Useful capacity counts tasks meeting quality and timing conditions, not every token generated.

## Match the change to the symptom

| Observed symptom | Change to examine | Decision criterion |
| --- | --- | --- |
| Wrong answers even without load | Retrieval, prompts, a better-suited model or specialist route | More accepted tasks on representative examples |
| Good answers but queues during peaks | Scheduling and additional independent replicas | More capacity within quality and latency targets |
| A single isolated request is too slow | Input, application path, model or per-instance hardware | Lower latency for that request |
| Context/KV exhausts memory | Input selection, placement, cache strategy or more VRAM | Preserve required evidence without memory instability |
| Host loss disrupts the service | Ready capacity in another failure domain | Sufficient surviving capacity and healthy dependencies |
| Mostly low demand with peaks | Smaller baseline plus timely temporary capacity | Lower actual total cost while meeting the peak |
| Stable demand with expensive rental | Purchase, capacity agreement or continued rental | Complete operating, spare-capacity and change costs |

Use [workload evaluation](/en/articles/evaluating-llms-for-your-language-and-workload/) to define accepted outputs. Divide the period's complete costs—including idle readiness, failures and escalation paths—by accepted work in that period. This makes the comparison between ordinary replicas and higher-end hardware meaningful.

A small initial service does not need all future hardware on day one. Reproducible serving units, observable expansion thresholds and separate failure domains make gradual growth possible. A larger GPU enters the design when memory, latency or complete-system cost gives it a specific job to do.
