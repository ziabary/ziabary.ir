---
title: "An AI contract: what exactly should we receive?"
slug: ai-contract-deliverables-en
translationGroup: ai-contract-deliverables
lang: en
date: "2026-09-26"
faDate: "26 September 2026"
category: Product and business
excerpt: "A model or a working demo is not a complete AI project deliverable. A practical guide to acceptance criteria, data, testing, security, operations, version changes and the ability to leave a supplier."
readTime: "12 min read"
cover: /images/articles/ai-contract-deliverables/cover.png
author: "Mehran Ziabary"
toc: auto
related: []
draft: false
---

The system has been delivered. The demo works. The project manager asks the chatbot a few questions and receives acceptable answers. The acceptance record is signed, and a few weeks later the first disputes begin:

- Answers on real data are less accurate than they appeared in the demonstration.
- Waiting times increase as more users arrive.
- The model version changes, and performance on some tasks declines.
- Service costs exceed the original estimate.
- Nobody is quite sure which of these problems is a supplier defect and which falls outside the supplier's commitments.

The problem is not necessarily a poor model or a supplier doing too little. Sometimes, nobody established what **“delivering an AI project”** actually meant. Phrases such as “high accuracy,” “intelligent responses,” “support for the target language,” “scalable” or even “95% accuracy” are not acceptance criteria until they are defined against data, users, operating conditions and the cost of errors. They are closer to promises than measurable commitments.

The legal contract should be drafted with appropriate legal expertise and reflect the organization's applicable laws, industry and risks. This article concerns the technical and management package that must be defined before signature. That package allows legal counsel to express obligations precisely, managers to decide whether to continue or stop, and technical teams to test the result.

## The model is not the finished product

Even in a conventional software project, handing over code without documentation, tests, configuration and a way to operate it is insufficient. The gap is wider in AI. A model may perform well on test data and fail in a real process. An answer may be correct but arrive too late; average accuracy may look reasonable while errors concentrate in the most costly cases. A system may work on delivery day and behave differently after a change to its model, data or prompt.

The contract should therefore cover more than “a model” or “a chatbot.” The purchase is a service within a real process. That service receives data, produces decisions or recommendations, connects to other systems, sometimes refers cases to people, incurs costs and changes over time. The delivery package needs to cover that entire lifecycle.

The [UK government's guidelines for AI procurement](https://www.gov.uk/government/publications/guidelines-for-ai-procurement/guidelines-for-ai-procurement) recommend defining needs through the problem and intended outcomes, assessing data before procurement, considering technical and ethical limitations, and including lifecycle management from the outset. The [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework) likewise treats design, development, use and evaluation as a continuous lifecycle. These frameworks do not replace a contract, but they convey a shared warning: buying AI does not end with purchasing a capability that works in a demonstration.

## First define the problem the service must address

Before discussing models, GPUs or architecture, answer three questions without vague terms:

1. Who uses the system, and at what stage of their work?
2. Exactly which decision or activity does it make better, faster or less expensive?
3. What is the current baseline if the system does not exist?

“Build an intelligent HR assistant,” for example, does not define an acceptable delivery. “Answer employees' questions about leave policy using the latest approved documents, cite the relevant clause and refer uncertain cases to a specialist” comes much closer to a testable service. That sentence identifies the user, the source, the type of answer, the limits of confidence and the exception path.

The baseline matters too. If a specialist currently answers correctly in 80% of cases but takes two days, the project's value may lie in reducing response time. If a simple rule solves the same problem more cheaply with predictable errors, using a complex model is not an advantage. The article on [investment in AI (in Persian)](/articles/investment-in-ai/) discusses the value of the problem and the suitability of the investment. The contract needs to turn that reasoning into measurable indicators.

## Turn “accuracy” into a test set and a cost of error

An accuracy figure means very little without defined examples, a data distribution and a description of the errors. Acceptance requires an agreed test set covering routine, borderline, difficult and out-of-scope cases. Preferably, part of that set should remain unavailable to the developer until final evaluation, so the system is not optimized only for familiar examples.

For each example, record at least:

- The input and test conditions.
- The acceptable answer or behavior.
- The type and severity of an error.
- The evaluation method and the person or role responsible for judging it.
- The versions of the data, model, prompt and software.
- The results of the baseline and the proposed system.

Errors do not all carry the same weight. Missing a dangerous equipment fault is different from generating an extra alert. Disclosing a document a user is not authorized to see is different from giving an incomplete answer. The aggregate score must be read alongside critical error rates, referrals to people and the cost of human review. A forthcoming article in this series, “What does 95% accuracy mean for a factory?”, examines this issue through an industrial scenario.

For generative systems, the test set is more than a few questions with reference answers. Evaluation must check whether the right document was retrieved, the response stayed faithful to its source, citations actually support the claims, the system behaves appropriately when no answer is available, and formatting and operational constraints are respected. [How should we evaluate a good model for Persian? (in Persian)](/articles/evaluating-language-models-for-persian/) distinguishes model quality from the quality of the complete system. The contract should preserve that distinction.

## Data is part of the delivery

Many disputes emerge once a project depends on organizational data for training, retrieval or evaluation. The following questions need clear answers:

- Who supplies the initial data, and who is responsible for its quality?
- Which data versions were used for training, evaluation and operation?
- What are the provenance, permissions, consent and usage restrictions for each dataset?
- Where is the data processed and stored, and who can access it?
- Who owns derived data, labels, error examples and user feedback?
- Which versions must be handed over, returned or deleted when the contract ends?

“Data is not used for training” does not answer all of these questions. Data may still be transferred to other systems for response generation, logging, caching, support or evaluation. [Preserving data confidentiality when using public APIs](/en/articles/data-confidentiality-public-apis-en/) examines processing boundaries and the limitations of common approaches. The contract should describe the actual data flow, not just the supplier's general intentions.

## Obtain a technical inventory of the system

A model's brand name is insufficient. An AI service consists of many components, each of which can change its results. The delivery inventory should include at least:

- Exact names and versions of models, weights and adapters.
- The embedding model and reranker in retrieval systems.
- Prompt templates, system policies and their versions.
- Versions of code, libraries and the execution engine, together with relevant settings.
- Methods for chunking, indexing and selecting documents.
- External dependencies and APIs in use.
- Configuration of development, test and production environments.
- Known limitations and out-of-scope cases.

This list is not a demand to disclose every trade secret. Its purpose is to establish what was tested and which component changes require testing again. If a supplier can change the model without notice, today's acceptance result provides no guarantee of tomorrow's behavior. Requiring formal approval for every small change, however, can paralyze operations. The solution is to classify changes: which are routine operational patches, which require regression testing, and which need renewed acceptance?

## Security, access control and logging are deliverables

In a document assistant, a correct answer given to an unauthorized user is still a failure. For an agent, correctly performing an action that was never authorized is not a success. The contract should specify how user identity is passed through the system, where access is checked before retrieval or execution, which events are logged, how sensitive data is handled in logs and memory, and who is responsible for stopping the service, investigating and notifying the relevant parties during a security incident.

Security testing should also go beyond software vulnerability scanning. Prompt injection through documents, bypassing access boundaries, leaking information between sessions, repeated tool execution, abuse of long inputs and behavior when dependent services fail are examples of tests specific to this architecture. Their scope must match the system's actual authority. [Jev and Laya: when AI makes decisions instead of producing text (in Persian)](/articles/jev-laya-llm-decision-governance/) shows why decision records and limits on authority matter increasingly as a system moves from recommendation to execution.

## Quality is incomplete without capacity and cost

A system that performs well in a single-user demo may create long queues or unacceptable costs under real load. Delivery should document the conditions of load testing:

- The number of concurrent users and requests.
- Typical and maximum input and output lengths.
- Time to the start of a response, completion time and error rate.
- Queue behavior, request cancellation and capacity limits.
- Cost per request or acceptable output.
- Infrastructure consumption and dependence on external suppliers' capacity.
- System behavior under saturation or failure.

Averages alone are insufficient; response-time percentiles and agreed worst-case conditions matter as well. Cost should also be measured per acceptable output, rather than only per thousand tokens or GPU-hour. If a cheap output requires lengthy review, part of its cost has simply moved to human labor. [The real cost of running an LLM: buy hardware, rent a GPU or use an API? (in Persian)](/articles/true-llm-cost-buy-rent-or-api/) provides a framework for that calculation.

## Document human review and exception handling

“Human oversight” is meaningful when people have the time, information and authority to intervene. The delivery package should make clear:

- Which outputs may be used without human approval?
- Which cases must be referred to a reviewer?
- What evidence does the reviewer see?
- When can they reject or correct the system's decision?
- How are corrections recorded and used for subsequent improvement?
- What is the system's safe behavior if no reviewer is available?

If a specialist must recheck every answer from scratch, the project may have added only a new interface to the old workload. If no high-risk outputs are reviewed, the organization has effectively delegated authority to the system. Acceptance criteria need to measure the time and cost of human oversight too.

## Operations begin the day after delivery

Models and data do not stand still. Users' language, the mix of requests, internal rules, threats and external services all change. The contract therefore needs answers for the operational period:

- Which indicators are monitored, and what triggers an alert?
- How are error examples recorded, prioritized and resolved?
- Who is authorized to change the model, data or prompt?
- How is the previous version retained or restored?
- Which test set is used for regression testing, and how often is it run?
- How are incidents, quality degradation and significant changes reported?
- How long do support, updates and maintenance continue?

[ISO/IEC 42001](https://www.iso.org/standard/42001) approaches AI through a management system that includes ongoing maintenance and improvement. Even without pursuing certification, that perspective is useful for a contract. Operations are part of the system itself and must be planned within the project.

## Assess the exit before entering the agreement

The final deliverable is the ability to continue without the current supplier. This does not mean every arrangement must include all proprietary code or model weights; business models and intellectual property arrangements can differ. The organization does, however, need to know what it retains at the end of the contract and what switching suppliers will cost.

An exit package may include cleaned and versioned data, data schemas, evaluation questions and results, organization-owned settings and prompts, interface documentation, incident reports, dependency inventories, backup procedures and an agreed period of migration assistance. If evaluation history, user feedback and business rules remain only in the supplier's system, the organization loses project knowledge even if it receives the raw data.

The UK government's AI procurement guidelines also identify avoiding vendor lock-in, considering open standards and intellectual property, transferring knowledge and planning for maintenance as important procurement concerns. These questions should not wait until the contract ends. The opportunity to negotiate an exit is stronger before entering the agreement.

## Link payments to evidence, not just dates

In projects with substantial uncertainty, payments and decisions to continue should depend on reviewable milestones. Each milestone needs a defined deliverable and a question the evidence must answer.

| Stage | Main deliverable | Decision question |
|---|---|---|
| Problem discovery | Service definition, baseline, available data, risks and a simpler alternative | Is the problem worth pursuing? |
| Prototype | A limited, repeatable technical workflow using sample data | Is the proposed approach feasible in principle? |
| Pilot | Testing on a limited real workflow, an independent test set, costs and human oversight | Does the solution create value in practice? |
| Production | Security, capacity, monitoring, support, recovery and responsibilities | Is the system ready for controlled operation? |
| Exit or transition | Data, documentation, evaluation history and migration assistance | Can the organization continue the service? |

A successful prototype is not production acceptance. A pilot involving a few cooperative users and handpicked data should not be presented as a substitute for real testing either. Each stage should reduce a specific uncertainty while preserving the ability to stop or change direction.

## A minimum AI project delivery checklist

To condense the discussion to one page, obtain written answers to these twelve questions before signing. They establish the minimum basis for deciding what has actually been delivered.

1. What are the problem, the user and the expected outcome?
2. What are the baseline and the non-AI alternative?
3. What is in scope, and what is excluded?
4. What are the acceptance test set and evaluation method?
5. How are errors classified by cost and severity?
6. Where does the data come from, what rights govern it, which versions are used and where is it processed?
7. What is the inventory of models, software, prompts and configuration?
8. How are security, access control and logging tested?
9. Under what conditions are capacity, response time and cost measured?
10. Where do people intervene, and with what authority?
11. How are version changes, monitoring, incidents and retesting managed?
12. What is handed over at the end of the contract, and what is the exit process?

This checklist does not replace a detailed technical schedule, security assessment, service-level agreement or legal contract. Its value is in preventing a project from starting with a phrase such as “a highly accurate intelligent system,” only for buyer and supplier to discover on delivery day that they had two different things in mind.

## A good contract makes the subject of a dispute clear

No contract anticipates every technological change or every behavior of a model. Even the most comprehensive test set cannot represent the entire future. A realistic goal is for both parties to understand what they have built, how they measure it, which changes require retesting, who is responsible during operation, and how to correct or stop the work if the result is insufficient.

The model may change during the contract. The data may improve. A simpler method may replace the original architecture. These changes are not contractual failures when the problem, acceptance criteria and change process are clear. The real failure is accepting a good demo in place of a measurable service, leaving everyone to negotiate what “success” means only after signing.

## Sources and further reading

- [Guidelines for AI procurement — UK government](https://www.gov.uk/government/publications/guidelines-for-ai-procurement/guidelines-for-ai-procurement)
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)
- [NIST AI 600-1: Generative AI Profile](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence)
- [ISO/IEC 42001:2023 — AI management systems](https://www.iso.org/standard/42001)
- [Enterprise AI governance guide (in Persian)](/slides/enterprise-ai-governance-dba/)
