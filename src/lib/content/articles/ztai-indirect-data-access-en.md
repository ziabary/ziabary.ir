---
title: "When people cannot see the data, has their access really been removed?"
slug: ztai-indirect-data-access-en
lang: en
date: 2026-09-09
faDate: "9 September 2026"
category: Security
cover: "/images/articles/ztai-indirect-data-access/cover.png"
excerpt: "Removing direct access to confidential data also requires control over code changes, output release and infrastructure administration. ZTAI must address those indirect paths."
readTime: "14 min read"
draft: false
related: ["zero-trust-ai-maturity-model-en", "zero-trust-ai-principles-and-controls-en", "mlops-foundation-of-zero-trust-ai-en"]
---

Imagine an organization that keeps sensitive training data in a separate environment. The development team has no database account, real files are not copied to staff computers, and training runs through an automated pipeline. At first glance, the problem seems solved: people cannot see the data, and machines do the necessary work.

But what if a developer can change the training program and place a few records in an error report? What if the team may download the model, and that model reveals information from its training data? And if an infrastructure administrator can read the execution environment's memory or obtain its decryption key, what has removing a database account actually guaranteed?

An earlier note on [data confidentiality and authorized processing (in Persian)](/articles/ai-data-confidentiality-safe-processing/) distinguished the right to process information from the right to receive the raw data. Making that distinction real is an architectural problem: a particular computation must be possible without giving its operator information beyond the permission granted. This article examines the conditions needed to do that.

## Removing people from the data path is an architectural goal

In this collection's formulation of Zero Trust AI, an important goal is to design and automate data workflows so that routine execution does not require people to inspect, move or manipulate raw sensitive data. People define the problem and its permitted uses, build the process and examine evidence of its performance. Sensitive data stays in a controlled path.

[Level 4 of the ZTAI maturity model](/en/articles/zero-trust-ai-maturity-model-en/) introduces this goal through the separation of development and production. The next question is which powers remain after separation, and whether combining them recreates access to the data.

This is the architectural approach discussed in this collection, not the definition of an independently approved ZTAI standard. [NIST's zero trust architecture](https://csrc.nist.gov/pubs/sp/800/207/final) already covers resources, services and workflows. The emphasis here is on redesigning a process to remove unnecessary direct human involvement with sensitive data.

The claim also needs a stated threat model. Does it restrict developers, infrastructure operators, cloud providers or some combination of them? Does it consider collusion between roles? Which hardware and software components remain trusted? Without those assumptions, “no human access” is too broad to evaluate.

## The ability to change code can recreate the ability to read

A program authorized to process raw data necessarily receives some access to it. If a developer can change that program and receive unrestricted results, the developer can potentially instruct it to place the data in an output file. The database account is absent, but an indirect reading mechanism exists.

The same problem can arise without malicious intent. Debugging may record real inputs, error handlers may include a failing record, and telemetry may send samples to a system that the development team can inspect.

<figure>
  <img src="/images/articles/ztai-indirect-data-access/indirect-access-path-en.svg" alt="Direct viewing is blocked, but a developer can change an authorized program and receive a report containing sensitive data" />
  <figcaption>Removing read permission is effective only if the combination of code changes and output access cannot recreate the same access through another route.</figcaption>
</figure>

A processing request therefore needs more than a program name or the requester's identity. It should specify the code version, authorized data, operation, output destination, validity period and resource limits. Permission to train on one dataset must not become permission to execute any program with any output against it.

Signatures and provenance records are necessary evidence, but they do not answer every question. A signature establishes the identity and integrity of an admitted package; it does not prove good behavior. Security scanning and review contribute to admission evidence. For arbitrary general-purpose code, a few preliminary checks cannot establish that every disclosure path is closed. Runtime restrictions and output controls must remain effective after admission.

## Separate three kinds of authority

Separation of duties means more than writing three names in a table. Three powers need to be independently enforced: **defining the processing, admitting it for execution and authorizing release of its results.**

The development team can construct a proposed computation. An admission authority checks whether its specific version fits the task, environment and restrictions. A release authority decides which result may reach which recipient, and at what level of detail. Routine decisions can be automated; independence does not require three manual approvals for every job.

The processing workload must not be able to change its own governing policy, add another output destination or stop the recording of evidence. Likewise, the authority to change processing code must not also allow the developer to bypass output controls. If one administrator can still change all those restrictions, trust in that administrator remains part of the architecture and must be stated explicitly.

A policy engine is part of this problem. Deploying it as a separate service does not establish independence. Its policy-change authority, signing key, deployment path and administrator accounts all matter. A control is independent only to the extent that the component it controls cannot redefine it.

[Versioning and reproducibility in MLOps](/en/articles/mlops-foundation-of-zero-trust-ai-en/) provide the foundation. Without knowing which code version ran under which policy against which data, the separation of powers cannot be meaningfully examined.

## The output boundary crosses every pipeline

The maturity model describes boundaries around data preparation, training, evaluation and deployment. Output control must run across all four. A data-cleaning report, evaluation metric and model file can each leave the confidential environment; each needs an appropriate release rule.

Blocking internet connectivity is not enough. If reports go to an internal experiment dashboard visible to the development team, information can cross the intended boundary there. Confidentiality depends on what the recipient is authorized to receive, not simply on whether the destination is internal.

| Output path | What it might reveal | Appropriate controls |
|---|---|---|
| Error reports and logs | Real inputs, identifiers or record contents | Restricted schemas, removal of sensitive content before recording and access limits |
| Temporary files and debug artifacts | Data fragments or process memory | Retention within the protected boundary and prevention of automatic download |
| Metrics and statistical reports | An individual's characteristics, a small group's data or sensitive organizational conditions | Limits on detail, combined-output assessment and repeated-request controls |
| Weights, adapters and checkpoints | Information extractable from a model, or data deliberately inserted into a file | Structural checks, disclosure assessment and separate model-release authorization |
| Embeddings and retrieval indexes | Information derived from sensitive documents | Inherited classification and permissions, user separation and download controls |
| Synthetic data | Reproduction or inference of information from the source dataset | Assessment of the generation method and disclosure risk before release |
| Backups and snapshots | Copies of data, secrets or captured memory | Encryption, key separation and policy enforcement during restoration |

These paths do not all have the same risk, and their existence does not mean disclosure has occurred. The table helps complete the threat model. Removing names or changing a file format is not, by itself, permission to cross a boundary.

In a conservative design, a workload cannot send an arbitrary file to a recipient. It submits a defined result to an independent component with release authority. That component may check output type and size, value ranges, permitted detail and request history. As processing freedom and output diversity increase, demonstrating the adequacy of that control becomes harder.

The release component handles information that has not yet been approved for disclosure. Its own execution environment and connection to the workload must therefore receive protection appropriate to that sensitivity. Sending decrypted information from a confidential environment to an external filter visible to the host administrator defeats the original protection goal.

Word filters, regular expressions and sensitive-data classifiers provide only part of the defense. Code can encode information as numbers, split it across small outputs or disguise it as innocuous content. Highly sensitive workloads may therefore need limits on what can be computed and returned. In some cases, approved operations are a better fit than arbitrary submitted code.

## Releasing a model is a separate decision from training it

Permission to train on confidential data does not decide whether someone may download the weights. An organization may permit the trained model to run as a service inside the environment while prohibiting export of its artifact. The service's responses still need control; keeping weights inside does not automatically prevent disclosure through inference.

Two risks need to be distinguished. An untrusted program may deliberately insert information into an output file. Separately, legitimate training can produce a model that retains information about its training examples and reveals it under some conditions. File-format checks only partly constrain the first risk. Behavioral disclosure assessment addresses the second.

[SACRO-ML](https://arxiv.org/abs/2212.01233) provides tools for assessing model disclosure risk before and after training in trusted research environments. This approach adds evidence to a release decision. Failure of the tested attacks is not a mathematical guarantee of non-disclosure, and a tool's coverage should not be generalized to every model architecture.

Synthetic data needs the same care. Information generated from a sensitive dataset may reveal information about that dataset. [NIST SP 800-226, Guidelines for Evaluating Differential Privacy Guarantees](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-226.pdf), published in March 2025, discusses the limits of such guarantees. In suitable applications, differential privacy can limit the influence of one person or other defined protected unit on released results. Its guarantee depends on that unit, the parameters and the implementation; it does not cover every operational secret an organization holds.

## Small results can reveal a great deal together

Output control cannot assess every request as though it were the first. Suppose two precise, permitted reports return sums for groups that differ by one member. Subtracting the results can reveal that member's value, even though neither report contains a name or a raw record.

Authorization therefore needs to consider request history, group overlap, repetition and combinations of released information. Minimum group sizes and request limits can contribute to protection, but they do not provide a universal guarantee. Differentially private systems also need cumulative privacy accounting across releases, rather than restarting the budget with each request; see [NIST SP 800-226](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-226.pdf).

This has an architectural consequence. The release authority needs the state required to assess related requests. If every short-lived job applies policy without knowledge of earlier jobs, a restriction that works within one execution may fail across the sequence.

## When the infrastructure administrator must also be excluded

Removing development-team access leaves the host administrator question unresolved. In many conventional systems, sufficient control over the operating system or virtualization layer permits interference with processes and memory. Disk encryption alone does not solve that problem: ordinary processing requires decryption somewhere.

As discussed in [Containers are not independent security boundaries (in Persian)](/articles/containers-are-not-security-boundaries/), isolating an application from its development environment is different from protecting it against the host administrator. If that administrator is included in the threat model, the execution environment must support the assumption.

Confidential computing can provide part of this protection through hardware-backed trusted execution environments, or TEEs. The general pattern keeps data and models encrypted until execution-environment evidence is accepted, then releases a key to an environment that satisfies admission policy. [NVIDIA's confidential computing guidance](https://docs.nvidia.com/ai-enterprise/planning-resource/ai-factory-white-paper/latest/confidential-computing-for-ai.html) describes the combination of confidential CPU and GPU environments, attestation and conditional key release.

This changes the trust boundary; it does not remove every trusted component. Protection against the host administrator does not necessarily constrain an administrator inside the guest or an authorized malicious program within the protected environment. Hardware and software vulnerabilities, side channels and denial of service must be considered according to the technology selected. Adding “TEE” to a diagram does not settle them.

For an AI workload, protection may need to extend from CPU memory to GPU memory and the transfer path between them. Chip support alone is insufficient: the server, firmware, drivers and deployment mode must work together. That connection is explored in [AI infrastructure security from the kernel to the GPU (in Persian)](/articles/ai-infrastructure-security-starts-with-kernel-and-gpu/). The English [GPU server platform overview](/en/articles/gpu-server-platform-components-en/) provides the broader hardware context.

## Attestation must drive an enforcement decision

Attestation helps restrict access when its result changes an effective decision—for example, whether a specific execution receives a decryption key. A report that is only archived does not prevent an unacceptable environment from processing data.

<figure>
  <img src="/images/articles/ztai-indirect-data-access/controlled-processing-boundaries-en.svg" alt="Controlled processing architecture with code admission, confidential execution, evidence-based key release and an independently governed protected output gate" />
  <figcaption>A conceptual design: code, environment, keys and outputs each have acceptance conditions. Output controls cover logs, files, models and service responses.</figcaption>
</figure>

In the proposed design, evidence must relate to the intended environment and execution, and its freshness must be checked. Policy defines acceptable measurements and the identity and protected channel to which the key is delivered. Changes to the reference policy must also be controlled. Otherwise, the person who changes the environment can simply declare its new state acceptable.

Protection must continue after key delivery. If the process can load new code, alter admitted files or transmit its key, acceptance of its initial state is insufficient. Conversely, refusing future key requests does not necessarily erase a key already delivered or data already decrypted. Termination policy, credential lifetime and cleanup must reflect that fact.

Attestation has a limited scope: measuring a component does not establish the semantic correctness of every computation. The related note on [configuration drift, attestation and rollback (in Persian)](/articles/configuration-drift-attestation-and-rollback/) develops this distinction. Valid evidence needs a reference state, an enforcement decision and a practical response when conditions change.

## Maintenance must not create a permanent access route

Maintenance exceptions can be more powerful than ordinary operations. Temporary access is opened for debugging, a snapshot is moved elsewhere for investigation, or a memory dump is sent to a contractor. Some of that access may survive after the incident is resolved.

An architecture intended to reduce human access must design diagnostics from the start: structured and restricted logs, failure reproduction with test data, diagnostic execution inside the boundary and recovery from an accepted version. A repair request must not automatically become permission to receive raw data.

Where human inspection is unavoidable, treat it as a bounded exception. Record the problem, the authorized person, the data scope and the expiry. Afterward, restore the restrictions and review the effects of the access. This is more accurate than claiming complete removal of access, and it provides evidence for reducing future exceptions.

Automation must also stop when required conditions are invalid. A system that disables its output controls or falls back to a less protected path to keep running abandons its restrictions at a critical moment. Workloads requiring continuity need a fallback designed and tested in advance with explicit protection limits.

## What evidence shows that access has actually been restricted?

An architectural claim should lead to testable questions. The absence of a human database account does not account for every route to information. An audit must examine powers that can be combined and outputs that can be received.

| Audit question | Evidence to look for | What is insufficient on its own |
|---|---|---|
| Can a developer run arbitrary code against the data? | Admission of a specific version, runtime restrictions and attempted-bypass tests | A Git repository or package signature |
| Can results leave by another path? | An inventory of output paths and tests covering logs, files and communication | No internet connection |
| Can the workload change its own restrictions? | Separation of policy, key and release authority from processing | A policy engine in a separate service |
| Can the host administrator observe data? | An explicit threat model and evidence that the protection configuration supports it | Disk encryption or container deployment |
| Can repeated outputs defeat the limit? | Related-request assessment and appropriate cumulative accounting | Independent approval of each output |
| Has debugging created a lasting access path? | Exception history, expiry and verified restoration of controls | A support ticket |

Tests have limits. Passing a set of scenarios provides evidence about those scenarios, not proof that every possible attack is closed. Timing, output size and error patterns may themselves be communication channels in stricter threat models. The strength of the claim must match what was designed and tested.

Track two measures separately: how much of the workflow is automated, and how much human access has been reduced. A fully automated pipeline may still allow many people to obtain its data, memory or unrestricted outputs. Count direct and indirect paths, privileged powers that bypass controls and the use of exceptions alongside automation metrics.

## Keep authorized use of data possible

The purpose is to make authorized processing feasible. Shutting down every computation may prevent disclosure, but it does not meet the development need. Granting new access whenever development becomes difficult also makes the boundary unsustainable. Good development and diagnostic tools are part of the architecture's feasibility.

[OpenSAFELY](https://www.opensafely.org/os-in-brief/) provides a practical example in this direction: research code goes to the data, development can use dummy data, and researchers receive aggregate results. The example has a defined scope. The project excludes data-centre owners from its no-access claim. It demonstrates development without unrestricted researcher access, rather than every assumption of the stronger architecture discussed here.

In ZTAI, removing human access becomes meaningful when direct viewing, processing changes, information release and infrastructure administration are considered together. People remain responsible for the purpose, permitted authority and accepted risk. Routine execution should continue within those limits without repeatedly returning to raw data.

The final test is not only who can see the data today. It is who can obtain information after a code change, during a failure and when receiving a result—and which control preserves the intended limit in each case.

Return to the [ZTAI technical collection](/en/guides/zero-trust-ai/) or review the [principles and controls](/en/articles/zero-trust-ai-principles-and-controls-en/) behind these boundaries.
