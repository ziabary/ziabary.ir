---
title: "Zero Trust AI: principles and practical controls"
slug: zero-trust-ai-principles-and-controls-en
lang: en
date: 2025-05-13
faDate: "13 May 2025"
category: Security
cover: "/images/articles/zero-trust-ai-principles-and-controls/cover.png"
excerpt: "Turn ZTAI principles into controls for identity, data, models, outputs and infrastructure, with explicit limits on what each control can establish."
readTime: "8 min read"
draft: false
related: ["zero-trust-ai-maturity-model-en", "from-zero-trust-to-zero-trust-ai-en", "mlops-foundation-of-zero-trust-ai-en", "ztai-indirect-data-access-en"]
---

The [ZTAI maturity model](/en/articles/zero-trust-ai-maturity-model-en/) describes how an organization can move toward a controlled AI lifecycle. That progression needs specific controls: what is verified, which action is authorized, where a decision is enforced and what happens when the required conditions no longer hold.

Zero Trust AI, as developed in this collection, applies zero trust to the data, models and workflows of AI. The principles below should be interpreted against an explicit threat model. A control that limits a developer does not necessarily limit the infrastructure administrator, and a control that verifies an artifact's origin does not establish that its behavior is safe.

## Verify explicitly and reassess access

Every request to use a dataset, model or compute resource should be tied to a verified identity and an authorized purpose. Being inside the network, belonging to the development team or running as an internal service is not enough.

Verification continues through the lifecycle. Data changes, models are replaced, dependencies evolve and user or workload behavior can change. A decision made when an account was created cannot serve as permanent approval for every later use.

The identity of the requester is only part of the decision. The relevant context may include the dataset, operation, software version, execution environment, destination of the result and duration of access. A training job authorized for one dataset and output location should not inherit permission to process another dataset or write results anywhere it chooses.

## Grant only the access required for the task

Least privilege applies to people, services, training jobs and inference workloads. Roles provide a starting point, but the decision may also depend on attributes such as data sensitivity, current risk and the particular operation requested.

A data scientist does not necessarily need unrestricted access to every raw record. Schemas, distributions, approved statistics and carefully selected development samples can support substantial work. Developers can define preprocessing and training parameters while an authorized pipeline performs the sensitive processing elsewhere.

<figure>
  <img src="/images/articles/zero-trust-ai-maturity-model/maturity-level-4-separated-environments.png" alt="Development and production separated so that code and experiments can be prepared without routine access to production data" />
  <figcaption>Separating development from sensitive processing reduces the need for direct access. The code, output and administrator paths still need their own controls.</figcaption>
</figure>

This arrangement requires a usable development process. If developers cannot inspect a schema, reproduce a failure or evaluate a model through approved interfaces, they will repeatedly need exceptions. The operational capabilities described in [MLOps as the foundation for ZTAI](/en/articles/mlops-foundation-of-zero-trust-ai-en/) help make least privilege practical.

Permission to define processing also needs limits. Someone who can run arbitrary code against sensitive data and receive arbitrary output may be able to reconstruct the access that the architecture intended to remove. [Indirect data access](/en/articles/ztai-indirect-data-access-en/) examines that combination in detail.

## Assume a component can be compromised

Design for a compromised account, a tampered dataset, an unsafe dependency or a malicious model artifact. The system needs to contain the effect, preserve useful evidence and support recovery.

Sensitive data should remain behind controlled interfaces and explicit processing boundaries. Engineers and administrators should not acquire unrestricted access simply because their role is operational. Where an administrator remains trusted, state that assumption; where the design intends to exclude them, the underlying technology must support that stronger boundary.

Segmentation limits how far a compromised component can reach. Separate authorization for changing policy, running a job and releasing a result also makes it harder for one compromised role to remove its own restrictions. These protections must survive routine changes and failures, rather than applying only to the ideal path through a diagram.

## Review outputs according to their consequences

Model outputs need different levels of verification depending on their use. An internal summary with limited consequences may be suitable for lightweight automated checks. A recommendation that influences a staff decision may need human review. Customer-facing, financial, clinical or operational decisions can require stronger validation, traceability and explicit approval.

The relevant questions include who will act on the output, what could go wrong and whether the decision can be reversed. The source data, model version and review history should be available at the level required by that risk.

A fluent answer is not evidence of accuracy, and an accurate answer may still disclose information that its recipient is not authorized to receive. Quality review and confidentiality controls address related but different properties.

## Improve the review process through feedback

Review decisions can reveal recurring failure patterns. Recording those patterns helps teams improve tests, refine policies and reduce repetitive manual work. Some low-risk checks may eventually be automated, while difficult or consequential cases remain subject to human judgment.

Feedback should enter a controlled improvement process. A reviewer action is not automatically a trustworthy training label, and a production correction should not silently change a model or release policy. Changes need evaluation before they affect later decisions. Automation should make review more consistent without turning an unexamined feedback loop into a new source of error.

## Protect data throughout its lifecycle

Protecting storage and network traffic is necessary, but sensitive information may also be exposed while it is being processed. Encryption at rest and in transit addresses different threats from protection during execution. Confidential computing and cryptographic approaches such as homomorphic encryption have different capabilities, performance costs and trust assumptions; the choice must fit the workload.

Development and testing should use data whose disclosure risk has been assessed. Masking, de-identification and synthetic generation can reduce exposure, but their effectiveness depends on the transformation and the information retained. Treating every transformed dataset as public would undermine the separation between development and production.

Provenance and integrity records help establish where data came from and whether it changed. Signed artifacts, hashes and protected audit records support that evidence. They cannot establish that the original source was truthful or that a correctly signed dataset contains no poisoning.

Classification must also follow derived artifacts. An output should retain the relevant restrictions of its inputs unless a controlled release decision justifies a different treatment. That includes statistics, embeddings, synthetic datasets, checkpoints and models—not only files containing recognizable records.

## Protect the model and its loading path

Model artifacts need access control, integrity verification and, where appropriate, encryption. Their APIs need authenticated, authorized access and monitoring for misuse or extraction attempts. Evaluation should include the adversarial conditions relevant to the intended application.

Adversarial training and limiting a model's operating domain can improve robustness against particular threats. Neither establishes resistance to every attack. The system must still constrain what the model can access and what actions its outputs can cause.

Model ingestion deserves particular attention. Downloading a weight file can also introduce an unsafe deserialization path, custom code or unreviewed dependencies. A controlled admission process should inspect the package, restrict execution and accept only the formats and capabilities that the deployment needs.

Converting an artifact to a format such as SafeTensors can remove a later dependency on executable serialization, but conversion is not safe if it first loads an untrusted executable format in a privileged environment. Treat inspection and conversion as isolated, resource-limited processing of untrusted input. A safer weight format also does not prove the model's behavior benign or make accompanying code trustworthy.

Moving-target techniques, including changes intended to make a model harder to probe, require evidence of their benefit and their effect on quality. They should not replace established access controls or be presented as a general solution to model theft and adversarial attack.

## Secure the infrastructure and operational process

Separate development, training and serving environments according to their access needs and consequences of compromise. Monitor network activity, API use and model behavior for signs of extraction, misuse or unapproved AI services. Those records themselves may contain sensitive information and need controlled access and retention.

Use strong authentication, including multifactor authentication where appropriate for people. Automated services need verifiable workload identities and narrowly scoped credentials, preferably with limited lifetimes. Human authentication mechanisms should not be treated as a substitute for properly designed machine identity.

A policy engine such as Open Policy Agent can make authorization rules explicit and consistently enforceable. Its independence depends on who can modify the policy, deploy the engine or obtain its signing and administrative credentials. Running the engine in a separate service does not help if the processing workload can rewrite its rules.

Security work belongs inside CI/CD: dependency review, patching, static and dynamic analysis, artifact checks and tested incident procedures. Threat modeling should account for the boundaries between the organization, its platform operators and external providers. Each party needs a clear responsibility for the controls it actually operates.

AI-assisted monitoring and incident analysis may help identify patterns or prioritize work. Their recommendations still need suitable validation and access limits. Giving a security assistant broad action privileges creates another workload whose authority must be governed.

The hardware and platform choices matter too. The [English GPU and server articles](/en/articles/gpu-server-platform-components-en/) explain why a server's operating environment, interfaces and supported configuration need to be assessed together with its accelerators.

## Introducing the controls into an existing organization

The difficulties are not limited to selecting tools. Teams may lack the required expertise, legacy systems may not expose useful policy boundaries, and established working habits may rely on unrestricted access to real data. Rebuilding pipelines and providing safe development environments takes time and money.

A staged introduction should start with a concrete workflow and its most consequential access paths. Establish the evidence needed to understand it, then reduce broad privileges, control release paths and test how the restrictions behave during maintenance. Existing systems may need architectural changes before stronger claims become realistic.

ZTAI is an ongoing combination of policy, engineering, operations and review. A useful test is whether the organization can explain a specific access decision, show where it was enforced and demonstrate what happens when the required conditions fail. The final article in the [collection](/en/guides/zero-trust-ai/) applies that test to the difficult claim that [people no longer have access to sensitive data](/en/articles/ztai-indirect-data-access-en/).
