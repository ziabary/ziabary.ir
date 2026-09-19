---
title: 'The real cost of running an LLM: buy hardware, rent a GPU or use an API?'
slug: true-llm-cost-buy-rent-or-api-en
translationGroup: true-llm-cost-buy-rent-or-api
lang: en
date: '2026-09-16'
faDate: '2026-09-16'
draft: true
math: false
category: Language models
excerpt: A worked USD scenario for API usage, GPU rental and ownership, including retries, accepted answers, operations, energy and conditional break-even calculations.
readTime: 13 min
cover: /images/articles/true-llm-cost-buy-rent-or-api/cover.webp
related:
- single-user-to-enterprise-llm-serving-en
- right-model-size-for-the-task-en
- llms-on-rtx-4090-24gb-vs-48gb-en
- enterprise-rag-model-embedding-reranker-en
- ollama-vllm-sglang-or-llama-cpp-en
updated: "2026-09-19"
author: Mehran Ziabary
---

A low API price, an inexpensive GPU rental and a powerful workstation are three different purchases. The financial comparison becomes useful only after defining the work: which answers must be accepted, how quickly they must arrive, and what capacity must survive a failure. Otherwise, the cheapest line in a price table can describe a service that does not meet the requirement.

This international edition uses a **worked educational scenario in USD**, prepared on 17 September 2026. Every price below is an explicitly chosen calculation input, not a current vendor quotation or a conversion of Iranian prices. The [Persian edition](/articles/true-llm-cost-buy-rent-or-api/) separately examines dated Iranian offers. Using USD here does not assume where the reader lives, which providers they can buy from, or their tax and electricity regime.

## Count accepted work, not just calls

Suppose a document assistant receives 100,000 user tasks in a month. One task may invoke the model several times: retrieval reformulates the question, generation answers it, a validator rejects the format, and the application retries. A coding agent may make many more calls while using external tools. An API call, a user task and an accepted result are different accounting units.

The useful denominator is the number of tasks meeting the agreed quality and response-time requirements. The numerator includes all charged attempts and the service costs assigned to that workload. Human correction belongs there when one route needs more of it. A low-cost answer that requires an employee to reconstruct the result may be expensive in practice.

[Evaluation for your language and workload](/en/articles/evaluating-llms-for-your-language-and-workload/) describes how to define that acceptance gate. Token counts should come from the chosen model's tokenizer and usage records. Equal character counts across languages, or across two tokenizers, do not establish equal billed usage.

| Cost boundary | Purchased infrastructure | Rented GPU server | Model API |
|---|---|---|---|
| Initial commitment | System, installation and site preparation | Environment and model preparation | Integration and any account commitment |
| Recurring processing cost | Energy, hosting, upkeep and capital | Allocated resources and attached services | Billed model usage and plan fees |
| During quiet periods | Capital and fixed operations remain | Allocated machines may still be charged | Usage falls if calls stop |
| Who operates inference? | The organization's team | Usually the team for a raw server rental | The model service provider |
| Application, documents and retrieval | Still needed | Still needed | Still needed unless included in a managed product |
| Failure coverage | Additional resources and routing | Deployment design and contract | Provider and tested fallback path |

Keep this boundary stable. Comparing a fully managed document product with only the electricity used by a local GPU omits most of the local service.

## An explicit API scenario

Assume a hypothetical text API charges **USD 0.50 per million input tokens and USD 2.00 per million output tokens**. These are educational rates, not the price of a named model. We assume no cache discount, batch discount, tool charge or separate subscription. Output means all billed output tokens under the hypothetical contract, including any chargeable reasoning tokens.

Use two workloads:

| Educational workload | Input tokens per call | Output tokens per call | Cost per call | Cost for 100,000 calls |
|---|---:|---:|---:|---:|
| Short question | 2,000 | 500 | USD 0.002 | USD 200 |
| Document question | 8,000 | 1,000 | USD 0.006 | USD 600 |

For the short question, input costs `2,000 / 1,000,000 × 0.50 = 0.001` dollars. Output costs another `500 / 1,000,000 × 2.00 = 0.001`. For the document question, the two components are USD 0.004 and USD 0.002.

The same number of calls now costs three times as much. Sending entire conversation histories or many irrelevant document chunks can move a service toward the second row without improving answers. The [embedding and reranker choices in a RAG stack](/en/articles/enterprise-rag-model-embedding-reranker-en/) affect how much useful evidence reaches the generator.

A five-call agent is another workload. If each of its calls had the short pattern above, 100,000 tasks would consume USD 1,000 in model usage, before tools. Real agent turns usually have different lengths because the history grows. The [completion, assistant and agent distinction](/en/articles/code-completion-assistant-and-agent-en/) explains why one user action need not mean one inference call.

## Retries and quality change the denominator

Consider another **educational accounting example**: 100,000 submitted tasks produce 120,000 short calls after retries. Model usage is USD 240. If 90,000 tasks meet the acceptance gate, model usage per accepted task is `240 / 90,000`, or about **USD 0.002667**. Dividing by submitted tasks would produce USD 0.0024; dividing by calls would reproduce the tariff-derived USD 0.002. Neither is the accepted-task figure.

If 1,000 of those accepted tasks require one minute of correction, and the explicitly assumed labor rate is USD 24 per hour, that correction adds **USD 400**. Usage plus correction becomes USD 640, or about **USD 0.007111 per accepted task**. These are invented counts illustrating the method, not evaluation results for any model.

For a real comparison, measure retries and correction for each candidate under the same acceptance rule. Do not assign identical success rates to a smaller local model and a larger hosted model merely to make their prices comparable. A route that fails a mandatory privacy, language or latency requirement is not made eligible by a lower bill.

## Rental: allocated time is a concrete unit

Assume a compatible single-GPU server is offered in two **hypothetical educational plans**: USD 1.20 per allocated hour, or USD 600 for a 30-day month. Both plans are assumed to include the same CPU, RAM, GPU and local disk. We add USD 50 monthly for the storage/network items excluded from both plans.

| Allocated time | Hourly plan, compute only | Monthly plan, compute only |
|---|---:|---:|
| 50 hours | USD 60 | USD 600 |
| 300 hours | USD 360 | USD 600 |
| 500 hours | USD 600 | USD 600 |
| 720 hours | USD 864 | USD 600 |

The compute-only payment crossover is `600 / 1.20 = 500 hours`. It says nothing about token throughput. Downloading weights, warming kernels and failed runs can consume allocated time too. A program that is idle inside a running machine has not necessarily released the billable resource.

The distinction is real even though these rates are educational. The [Amazon EC2 lifecycle documentation](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-lifecycle.html) distinguishes instance states and associated charging, including storage that can remain after compute stops. For another supplier, use its corresponding lifecycle and billing definition rather than importing EC2's terms.

The rental must also satisfy host-memory and storage requirements. A low-cost GPU with too little RAM to load the intended artifact, or too little disk for original and converted weights, is not the same configuration. The [hardware feasibility view](/en/guides/llm/#hardware-feasibility) helps separate weight size from the complete deployment budget.

## Purchase: a complete educational budget

Now assume a complete single-GPU installation with an upfront budget of **USD 6,000**. The allocation below is deliberately a cost model, not a shopping list or an assertion that a particular GPU can be bought at the stated amount. A real bill of materials must satisfy physical, electrical and software compatibility before replacing these inputs.

| Educational budget item | USD |
|---|---:|
| GPU | 3,000 |
| CPU | 700 |
| Motherboard | 400 |
| Host memory | 600 |
| Storage | 300 |
| Power supply | 250 |
| Case | 200 |
| Cooling | 150 |
| Assembly and installation | 400 |
| **Upfront total** | **6,000** |

The GPU accounts for half of this budget. Treating its price as the price of the service would omit USD 3,000 even before monthly operation. A rack installation, redundant power or a different memory requirement would require a different bill of materials, not a percentage added without explanation.

Use a 36-month comparison period and no assumed resale proceeds. Straight-line allocation of the upfront budget is **USD 166.67 per month**, rounded for display. This is an accounting allocation for the example; it is not the monthly cash payment on a loan.

For continuous operation, assume average IT power measured at the system input is **0.45 kW**, a facility energy multiplier of **1.20**, electricity at **USD 0.20/kWh**, and 720 hours per month. The multiplier represents the additional facility energy assigned to this system; it is not a claim about the reader's site.

`0.45 × 720 × 1.20 × 0.20 = USD 77.76 per month`

The 0.45 kW input is an assumed whole-system average, not the GPU's TDP. Substituting maximum GPU board power would leave out the host and would not establish average consumption.

## Compare monthly totals with the same operations boundary

We additionally assume USD 50 per month for the purchased system's site/network allocation, USD 30 for hardware upkeep, and six hours of inference operations at USD 40 per hour. For raw rental, the same six operations hours remain, while the provider covers hardware upkeep within the assumed rental price. Application development, document management and retrieval are excluded from all three totals here because they are assumed common and identical; any actual difference must be added.

| Monthly item, educational scenario | Purchase | Monthly rental | Hourly rental for 720 hours |
|---|---:|---:|---:|
| Capital allocation or compute rental | USD 166.67 | USD 600 | USD 864 |
| Energy | USD 77.76 | Included | Included |
| Site/network or excluded storage/network | USD 50 | USD 50 | USD 50 |
| Hardware upkeep | USD 30 | Included | Included |
| Inference operations | USD 240 | USD 240 | USD 240 |
| **Monthly total** | **USD 564.43** | **USD 890** | **USD 1,154** |

Unrounded arithmetic gives **USD 20,319.36** for purchase over 36 months and **USD 32,040** for monthly rental: a difference of **USD 11,720.64** under these assumptions. Rates remain constant, no tax or financing is included, and neither configuration includes a second server for failure coverage. Those choices define this calculation; they are not a forecast of three years of market conditions.

A cash-payback calculation answers a different question. Purchased operation without capital allocation costs USD 397.76 per month. Its monthly difference from the USD 890 rental is USD 492.24. Recovering the USD 6,000 initial payment at that constant difference takes approximately **12.19 months**. Do not add the USD 166.67 allocation again in that cash calculation; doing so counts the acquisition twice.

For a low-utilization illustration, let the machine be powered down outside 50 hours monthly and let facility energy scale with those hours. Energy becomes USD 5.40. Keeping the other assumptions fixed gives purchased allocation and operation of **USD 492.07**, versus **USD 350** for hourly rental including USD 60 compute, USD 50 ancillary services and USD 240 operations. A service that must stay ready around the clock cannot use this powered-down scenario.

## Where the API and server totals cross

First make a strong, explicit assumption: the API and the server deliver the **same accepted task with one call, the same latency and sufficient capacity**, with no correction or retry difference. Assume the API has no additional fixed inference-operations cost in this simplified comparison. Using the totals above:

| Workload | Purchase/API arithmetic crossover | Monthly rental/API arithmetic crossover |
|---|---:|---:|
| Short call at USD 0.002 | About 282,213 calls/month | 445,000 calls/month |
| Document call at USD 0.006 | About 94,071 calls/month | About 148,333 calls/month |

These thresholds divide the server total by the assumed per-call price. They are not a buying recommendation, because the stated equivalence and capacity have not been measured. An API integration with additional fixed operations cost changes the denominator comparison; use `server fixed cost − API fixed cost` before dividing by the difference in variable cost.

Capacity is particularly easy to overlook. In a 30-day month, 100,000 tasks average only about **2.31 tasks per minute**. If 60% arrive within 60 busy hours, those busy periods average **16.67 tasks per minute**, with possible peaks above that. A monthly crossover can demand more peak capacity than the chosen server delivers. [From one user to enterprise serving](/en/articles/single-user-to-enterprise-llm-serving-en/) explains why queue length and failure capacity must accompany the financial model.

<!-- reference:cost-choice:start -->

### Context and the second retrieval stage change the feasible budget

[Qwen3-4B-Instruct-2507’s deployment instructions](https://huggingface.co/Qwen/Qwen3-4B-Instruct-2507) describe a native context of 262,144 tokens and suggest reducing it to 32,768 after an out-of-memory error. The context limit is not a promise that weights, KV cache and concurrent requests fit a quoted machine. The [24 GB versus 48 GB comparison](/en/articles/llms-on-rtx-4090-24gb-vs-48gb-en/) separates those memory components.

[Qwen’s reranker evaluation](https://arxiv.org/html/2506.05176v3) fixes a pool of 100 candidates. Its quality scores do not supply the processing time of that extra stage for the workload priced here. A cost comparison that adds reranking on only one route must include its resources and assess the resulting accepted answers.

<!-- reference:cost-choice:end -->

## Reliability and data boundaries have a price

If the service must retain full capacity after losing a host, one purchased machine and one raw rental instance are incomplete designs. Add the necessary replicas, hosting and routing to both alternatives. If the API route requires a second supplier, account for its integration, minimum commitments and any capacity reservation. Two resellers reaching the same upstream model do not establish independent failure paths.

The [Targoman report, in Persian](/articles/targoman-300-concurrent-requests-one-rtx-4090/) describes continued operation on local infrastructure during external connectivity disruption, and reduced service after losing a server. Its useful lesson is the distinction between continuing to answer and preserving full capacity. It does not supply a universal availability percentage or a hardware price for this example.

Data-location and access requirements can remove an option before price comparison. [Data confidentiality and public APIs](/en/articles/data-confidentiality-public-apis-en/) examines that boundary. Buying hardware does not itself implement access control or safe logs; using a managed model does not automatically include document permissions and audit trails.

## Spend less by changing the work that reaches the model

A deterministic order-status lookup does not need a generated answer at every step. Shortlisting relevant passages before generation can reduce input tokens and KV memory. A smaller model that meets the acceptance gate can free capacity for more concurrent work. These are architectural changes with measurable effects, not a universal promise of savings.

[Model sizing](/en/articles/right-model-size-for-the-task-en/), [four-bit quantization](/en/articles/four-bit-model-quantization-en/) and [engine selection](/en/articles/ollama-vllm-sglang-or-llama-cpp-en/) affect different parts of the cost. Quantization may reduce memory without a proportional latency reduction. Cancelling abandoned requests can recover work that would otherwise produce no accepted result.

For uncertain demand, metered API access or a short rental gives useful evidence before a capital commitment. For a stable workload, a compatible small model and an experienced operations team may make ownership attractive. Retain the actual token distribution, accepted-task count, peak capacity and complete invoice boundary when replacing the educational inputs. Those records turn a price comparison into a decision that another person can check.
