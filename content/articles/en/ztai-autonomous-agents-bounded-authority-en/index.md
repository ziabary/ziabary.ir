---
title: "ZTAI for autonomous agents: bounded authority throughout execution"
slug: ztai-autonomous-agents-bounded-authority-en
translationGroup: ztai-autonomous-agents-bounded-authority
lang: en
date: '2026-09-18'
faDate: '18 September 2026'
category: Security
draft: false
cover: /images/articles/ztai-autonomous-agents-bounded-authority/cover.webp
excerpt: "Removing direct human access to confidential data must not hand unlimited authority to an agent. How can task permissions, RAG, memory, MCP, tool execution, shutdown and independent evaluation keep that authority bounded and testable?"
readTime: '24 min'
related: ["ztai-indirect-data-access-en", "zero-trust-ai-principles-and-controls-en", "zero-trust-ai-maturity-model-en", "mlops-foundation-of-zero-trust-ai-en"]
---

An agent is assigned to review a factory's maintenance reports and create inspection requests for high-risk equipment. In one report it encounters a sentence instructing it to send the records to an external address to complete the analysis. The model might treat the sentence as a valid instruction, or it might disregard it. The security architecture cannot leave the entire burden of protection to that judgment. A more important question is: even if the agent tries, does it have the tool, credential and route needed to do it?

[“When people cannot see the data, has their access really been removed?”](/en/articles/ztai-indirect-data-access-en/) examined how access can be reconstructed through code changes, outputs and infrastructure administration. [“Data and model engineering without viewing confidential data” (in Persian)](/articles/ztai-data-model-engineering-without-raw-access/) described how engineering can continue through data contracts, protected execution and authorized evidence. Now there is another component: a system that does more than follow a fixed pipeline. During execution, it decides what to read, which tool to invoke and what to delegate to another agent.

In the process-oriented formulation used by this [ZTAI collection](/en/guides/zero-trust-ai/), Zero Trust AI means redesigning and automating data workflows to eliminate the need for direct human access to, and intervention in, confidential data. People remain policy setters, designers and reviewers of evidence. This is the collection's architectural goal, not a claim that a separate standard exists under this exact name and definition. Delegating execution to an agent serves that goal only if it does not open another route to unrestricted observation or modification of the data.

**Authority removed from people should not be transferred wholesale to an agent. Work that previously required broad access must become a set of limited operations that can be controlled and evaluated.**

## The agent proposes; the environment authorizes execution

The distinction between a [coding assistant and a programming agent (in Persian)](/articles/code-completion-assistant-and-agent/) illustrates the boundary between producing an answer and making a change. A model can generate text resembling a database command; the runtime turns it into a real operation. Policy belongs at that boundary: model output proposes an action but does not authorize it.

This is consistent with [NIST SP 800-207, published in August 2020](https://csrc.nist.gov/pubs/sp/800/207/final): being on an internal network or belonging to an organization does not by itself establish trust. The architecture proposed here applies that principle to agent identity, tools and the state of each task. What follows is a design interpretation for this application, not a ready-made blueprint quoted from the standard.

The model and planner may choose their path flexibly, but they must not set the limits of their own authority. The policy engine, credential issuer, tool executor and evidence system must be separated so that an agent cannot remove a restriction by editing a configuration file. Running two separate services is not enough if the agent's credentials can modify both.

The model itself must also run in an authorized processing environment. If confidential data is sent to an unauthorized external API, controls on later tool calls do not solve the problem. Here we assume that inference and supporting components, including logging and monitoring, comply with the data policy. If the host administrator is part of the threat model, protection requires [kernel, GPU and runtime security controls](/en/articles/ai-infrastructure-security-starts-with-kernel-and-gpu-en/). Restricting the agent does not replace them.

## Separate identity, task-specific authority

A shared account named “enterprise assistant” makes auditing difficult. We need to identify which agent, program and model version acted, in which execution, and under whose authority. Service identity, task-run identity and requester identity are different concepts. A permanent account for every run is unnecessary, but credentials and evidence must preserve the distinction.

Task authority is more than a list of tool names. “Access to the maintenance system” is too broad for the maintenance agent. Its assignment might permit reading reports within a defined scope, analyzing them in a protected environment and creating a limited number of draft inspection requests. It need not permit equipment reconfiguration, external messaging or purchase orders.

The execution contract must translate the permitted purpose into enforceable constraints: resources, operations, output destinations, time window, spending and action limits, stopping conditions and delegation rights. A prompt saying “for maintenance only” cannot make linguistic intent detection the sole security control.

A subtle distinction matters in ZTAI. A user may be authorized to request a statistical analysis without being allowed to see its input records. The processing service then accesses the data through its own independent, limited authorization, while the user receives only the permitted output. In a personal document assistant, by contrast, the agent must not exceed the user's access. These patterns cannot be collapsed into “always use the user's permissions.”

In both cases, effective authority is constrained by organizational policy, task authorization, service authority, resource policy and the current execution state. Permission to process, permission to see the result and permission to act on it must be defined separately.

## Delegation must not manufacture permissions

A lead agent may delegate text analysis, document retrieval and inventory checks. Giving every child the parent's full credentials only multiplies the holders of broad authority.

A child should receive only the necessary subset of authority that the parent is allowed to delegate. Delegation depth, credential lifetime, audience and resources must be specified. Children's combined budgets must not exceed the task budget: creating ten agents must not turn a ten-request ceiling into one hundred requests. Shared accounting outside the agents' control must enforce the limits.

[RFC 8693, OAuth 2.0 Token Exchange](https://www.rfc-editor.org/rfc/rfc8693), distinguishes delegation that retains the actor's identity from impersonation and can represent a delegation chain. It does not, by itself, guarantee reduced authority or automatic revocation of every derived token. Issuance policy and revocation propagation remain implementation responsibilities.

Cancelling a task must therefore affect every branch: no new tokens, renewed checks on queued requests, and no new execution by a child using an earlier credential. Short-lived credentials reduce the exposure window but do not replace revocation controls. Sensitive operations need authorization revalidated close to the point where they take effect.

## Every operation is controlled outside the model

The tool-execution gateway must check identity, task, operation, resource, parameters and current state. An allowed tool with forbidden parameters remains dangerous. Permission to read one file is not permission to read any path; creating a draft does not authorize sending it to any recipient.

The tools themselves should be narrow. “Create an inspection-request draft” can expose a clear input schema and fixed destination. A general shell or arbitrary SQL gives the same task a much larger scope. When code execution is needed, file, network, process and resource restrictions must be enforced by the runtime. Leaving a tool out of the model's list does not prevent generated code from reaching the same capability.

Checks must precede effects. Inspecting output after an email or money transfer does not undo the action. For sensitive operations, first prepare an action plan and bind resource identifiers and state versions. At final commit, recheck authorization and preconditions. If the recipient, amount or document version changes, the earlier approval is no longer valid. This reduces the time-of-check/time-of-use gap; distributed systems also need a clear commit point and an explicit statement of what that point guarantees.

The following boundaries turn the design into testable acceptance criteria, rather than model settings alone.

| Execution boundary | Control outside the model | Required failure test |
| --- | --- | --- |
| Task start | Separate identity, valid contract, restricted credential | Reject the same request under an expired task |
| Delegation | Narrower scope, depth limit, shared budget | A child cannot create authority or extra budget |
| Retrieval | Resource and chunk authorization before context entry | A similar but unauthorized document never reaches an unauthorized model or reranker |
| Memory and cache | Provenance, permission version, use-time checks | Cached answers become unusable after permission revocation |
| Tool call | Operation, parameter, destination and precondition validation | An allowed tool cannot act on a forbidden identifier or destination |
| Information release | Content, recipient and related-release controls | Splitting output across requests does not bypass the limit |
| Consumption and effects | Atomic budget reservation across the task tree | Parallel calls, retries and new agents cannot exceed the ceiling |
| Stop | Block new operations, cancel queues, contain running work | Detached children and delayed messages cannot revive the task |
| Evaluation and feedback | Independent criteria, trusted provenance, separate acceptance path | The agent cannot label its own result as correct or authorize its release |

## In RAG, permissions must stay with the document

An [enterprise document assistant (in Persian)](/articles/enterprise-rag-model-embedding-reranker/) typically searches, retrieves chunks, reranks, assembles context and generates a response. If an unauthorized chunk has already reached a model or reranker outside the permitted boundary, removing it from the final answer does not undo that disclosure. Controls must precede each unauthorized disclosure in the chain. If a search engine needs to inspect a broader candidate set inside the secure boundary, that processing requires its own authorization.

The [Azure AI Search document-level access-control documentation](https://learn.microsoft.com/en-us/azure/search/search-document-level-access-overview) distinguishes maintaining permission metadata from enforcing it at query time. Some native features use the `2026-08-01-preview` API. Query-time enforcement compares the user's permissions with metadata stored in the index. Until a source permission change reaches that index, the check uses old state. Permission synchronization is part of effective revocation latency.

In this design, identity and access filters come from trusted execution context, not a username or group string supplied by the model. Missing permission metadata must not mean “public.” Titles, result counts, download links and even the existence of a file may be sensitive.

A synthesized answer creates no new permission. Summarizing confidential documents does not automatically remove their confidentiality. If only a limited statistic may be released, the transformation must follow an approved release path; the model's claim that it has “anonymized” the data is insufficient.

## Memory must not turn yesterday's access into today's entitlement

An agent might legitimately read a document yesterday and lose permission to use it today. The issue extends beyond answer caches: conversation summaries, persistent memory, temporary files, checkpoints, active context and some inference caches may retain its information.

Derived memory should preserve the provenance and dependencies needed to enforce policy. Cache keys must account for the tenant boundary, access context and relevant policy/data versions. Sharing cached output between users is acceptable only when their authorization for that output is equivalent. Identical questions do not establish that equivalence.

Permission changes require both invalidation of known derivatives and checks when they are used. Background cleanup alone may miss copies. If a revoked document influenced active context, continuing the session may be invalid. Sensitive applications should stop that run and rebuild clean context from authorized sources, rather than merely remove the document from a citation list.

Not every derivative can be traced to one document. A summary without reliable provenance may need to be discarded entirely. Keeping less memory for less time simplifies revocation. Persistent memory should not be every agent's default.

Revocation cannot erase the past. Changing an ACL does not retrieve information already delivered to an authorized person or external system. Removing a document from an index also does not prove its influence has been removed from trained model weights. Protection claims and retention policy must acknowledge those limits.

## MCP standardizes connectivity, not trust

MCP gives agents a common interface to tools and resources. Successfully connecting to a server does not authorize every operation it exposes, and a tool's name or description is not a security credential.

The [Authorization section of the MCP specification dated 28 July 2026](https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization) covers HTTP-based transport and requires attention to token validity for the intended server. It should not be indiscriminately applied to local `stdio` execution. The official [Security Best Practices](https://modelcontextprotocol.io/docs/2025-11-25/tutorials/security/security_best_practices) also discusses token passthrough to downstream services, confused-deputy risks and local execution with excessive authority.

Server identity and tool versions need a controlled acceptance path. Changes to the tool list or parameter semantics must not automatically expand an active task's permissions. Labels such as “read-only” cannot replace enforcement. The [Tools specification](https://modelcontextprotocol.io/specification/2026-07-28/server/tools) says tool annotations should not be assumed trustworthy unless they come from a trusted server.

Prompt injection also arrives through documents, tool descriptions, errors, web results and saved memory. Received content must be distinguished from trusted policy, but textual delimiters and the model's judgment are not a complete defense. Even [Anthropic's report on prompt-injection defenses](https://www.anthropic.com/research/prompt-injection-defenses), which describes improved browser-agent resistance, does not present the problem as solved.

The practical assumption is that the model will sometimes be deceived. Even then, the maintenance agent must not be able to create a new destination, build an exfiltration tool or expand its authority. A tool's “more permission required” response does not authorize the agent to acquire that permission automatically. An increase must pass through policy and a competent authority; otherwise the task stops within its existing limits.

## Budgets must limit effects, not just tokens

An agent with legitimate data access can still consume resources or make permitted but harmful changes. Token and time limits do not necessarily limit purchase requests, message recipients, modified rows or total spending.

Each task needs a compute budget and an effect budget. The first covers execution time, calls, memory and processing cost. The second covers mutable objects, contacts, released data and financial commitments. The scope of the effect matters too: ten internal drafts are not equivalent to ten official letters sent.

Accounting must be shared across the task and all its branches. Reserve capacity before parallel execution so that simultaneous requests cannot all spend the same remaining balance. Retries must depend on the previous outcome and use an idempotency key where the operation supports it. A timeout does not prove that an external operation failed.

Small releases can collectively reveal substantial information. Disclosure limits and checks on related requests must not reset with every new session. Depending on the threat, this accounting may extend beyond one task to related agents or requesters.

## Stop, revoke and undo are different capabilities

Turning off the planner does not necessarily stop the work. A tool may have started a long-running job, a message may be queued, a child may continue independently, or a later retry may reactivate an operation.

The stop path must lie outside the agent's authority and cover the whole execution tree. First, block admission of new operations. Then revoke or suspend permissions and queues, and contain running work according to each tool's contract. Finally, reconcile actual effects with the destination service: what completed, what was rejected and what remains uncertain. A task-generation identifier or equivalent mechanism can prevent old requests from executing after a restart.

Undo is not always possible. Drafts can be deleted and some data changes can be reversed with concurrency controls. A sent email, disclosed information or physical effect on machinery cannot be undone by restoring the agent system's snapshot. These cases require compensating actions and an incident process, with stronger controls before irreversible effects where possible.

In an industrial setting, a safe stop does not necessarily mean instantly cutting off every component. Equipment may need an orderly shutdown sequence. A language-model agent must not bypass independent safety interlocks or industrial controls. The process owner must define the safe state beforehand, not leave the model to invent it during a crisis.

If an essential policy or evidence service becomes unavailable, sensitive operations cannot continue uncontrolled. Continuity arrangements need a predefined fallback with limited authority and duration. Keeping work moving must not become a permanent exemption from the protection boundary.

## Review evidence without exposing all the data

Removing routine data inspection does not remove human responsibility. A reviewer must be able to examine the task, policy version, authority, rejected events, resource use and operation outcomes. That usually does not require putting complete prompts, retrieved documents and raw tool responses into a general-purpose dashboard.

Audit logs are themselves data outputs. This design records controlled identifiers, reason codes, component versions and minimal evidence. Sensitive content stays within its authorized domain under an appropriate retention policy. Even a plain hash of a low-entropy value may be identifiable by guessing; hashing does not replace a confidentiality design for logs.

Human approval must be based on the precise proposed effect and authorized evidence, not just the agent's persuasive explanation. If a responsible judgment genuinely needs limited data inspection, treat it as an exception: identify the subject, authorized person, scope, duration and end of access. A process that still depends on such inspection cannot accurately claim to have eliminated human intervention entirely.

## Independent evaluation: the agent does not judge its own success

“Task completed successfully” is not sufficient evidence. Quality criteria must connect to externally verifiable state: was the right request created without duplication? Did an unauthorized source enter the context? Did an effect occur after a stop? Was the result delivered only to an authorized recipient?

Evaluation is independent when the acting agent cannot change the criteria, test data, recorded result or release authorization. A second model can help, but two models are not necessarily independent of the same poisoned input or shared error. Deterministic tests, actual tool-state checks and policy controls must accompany semantic judgment.

[AgentDojo, version 3 published on 24 November 2024](https://arxiv.org/abs/2406.13352v3), provides an environment for evaluating tool-using agents exposed to untrusted data. Its useful lesson here is to measure both task completion and attack resistance. A system that rejects everything may avoid unauthorized disclosure while failing its purpose.

Acceptance tests should cover prompt injection, mid-task ACL changes, stale caches, changed tools, parent revocation while children are active, retries after timeouts and policy-service failure. Results need claims of appropriate scope: passing the available attacks does not prove universal immunity.

## Feedback is untrusted input to the next cycle

When agent executions feed future training or memory, another loop appears. An agent that calls its own work correct must not turn that claim into a ground-truth label. User feedback also needs provenance and context; one user or coordinated accounts can distort it.

In the proposed path, execution events are recorded with provenance and versions, then validated and quarantined before acceptance. Only accepted data reaches persistent memory, retrieval indexes or training sets. Writing memory is itself an authorized operation. A tool must not turn a sentence about acquiring more authority into an agent's permanent rule.

Generated outputs, human feedback and independent evaluation results need distinct labels. A held-out test set must not return to training after every cycle. Changes to models, prompts or indexes should first be evaluated within a limited scope, with promotion to production governed by independent criteria. Automation does not conflict with independence; the producer simply must not own its acceptance criteria.

The [NIST AI 100-2 E2025 adversarial machine learning taxonomy, published in March 2025](https://csrc.nist.gov/pubs/ai/100/2/e2025/final), can help distinguish attack origins, affected lifecycle stages and attacker capabilities. It is not a reason to label every incorrect piece of feedback “poisoning” without examining it.

## From the maintenance scenario to acceptance criteria

Return to the opening assignment. In a hypothetical implementation, the agent may process the previous thirty days of reports for one production line inside an authorized environment and create at most five draft inspection requests. It cannot send data outside, buy parts or change equipment settings.

If a retrieved report instructs it to export data, a detection layer can flag the instruction. Even if the model fails, the tool gateway rejects the external destination. Delegated children draw from the same five-action budget. If access to a source is revoked, dependent derivatives are excluded and analysis resumes only from clean, authorized context. Final submission also checks the current asset state and task authorization.

A reviewer can inspect draft counts, reason categories, rejected actions and stop status without reading every confidential report. An independent evaluator checks that the drafts actually exist and no out-of-scope action occurred. If detection quality is inadequate, improvement begins with controlled evidence, not unrestricted delivery of all data to the developer.

This is the connection to ZTAI: retain the ability to perform the work while reducing direct human observation and intervention, and keep processing authority limited as well. Without adequate diagnosis, debugging and evaluation, the architecture will revert to broad human access at its first serious failure.

## What do recent developments support?

The [OWASP Top 10 for Agentic Applications 2026, published on 9 December 2025](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/), treats the security of planning and acting agents as a distinct subject. On 1 September 2026, the OWASP [Agent Control Standard, or ACS, page](https://genai.owasp.org/resource/agent-control-standard-acs/) also appeared, focusing on control hooks and runtime policy enforcement. These developments show technical attention to agent control. They do not certify this process-oriented definition of ZTAI or guarantee a product's security.

Together with MCP specifications and retrieval access-control features, they point toward tool connectivity accompanied by enforceable, testable authority boundaries. A feature in a document, extension or preview API is still not equivalent to a complete implementation in our own system. Actual versions, configuration and behavior must be tested.

## Automation must not mean unbounded authority

Autonomous agents help ZTAI when they reduce a process's dependence on direct human inspection and manipulation without reconstructing that access through tools, memory or outputs. Completed-task counts and staffing reductions are not sufficient measures of success.

Measure outcome quality, reduced need to view data, human exceptions, unauthorized effects, effective revocation and stop latency, and the cost of maintaining the controls. Authority and responsibility belong together, but that does not require giving the executor unlimited power.

The final test is what happens when the agent makes a mistake, the data changes or permission is withdrawn. Can the system still enforce its limits? The answer must come from execution evidence, not the model's promise to follow instructions.
