---
title: "From Zero Trust Architecture to Zero Trust AI"
slug: from-zero-trust-to-zero-trust-ai-en
lang: en
date: 2026-02-26
faDate: "26 February 2026"
category: Security
cover: "/images/articles/from-zero-trust-to-zero-trust-ai/cover.png"
excerpt: "Applying zero trust to the data, models and workflows of AI: why network access controls alone cannot protect the entire lifecycle."
readTime: "6 min read"
draft: false
related: ["mlops-foundation-of-zero-trust-ai-en", "zero-trust-ai-maturity-model-en", "zero-trust-ai-principles-and-controls-en"]
---

The rapid adoption of AI has brought sensitive data, valuable intellectual property and consequential decisions into systems that are difficult to secure with perimeter defenses alone. An AI service is rarely just a model behind an API. It includes data preparation, training code, external dependencies, model artifacts, deployment infrastructure and people with different kinds of access.

Traditional security designs often treated the internal network as a relatively trusted space. That assumption is especially weak in distributed AI workflows. Alongside familiar cybersecurity threats, these workflows face data poisoning, model inversion and adversarial inputs. An attacker may undermine a decision without taking over a server, or extract information through an otherwise legitimate model interface.

In this collection, **Zero Trust AI (ZTAI)** means applying zero trust principles to the specific engineering problems of AI. It is the architectural approach developed here, rather than the name of a separate, approved security standard. Its scope includes the data pipeline, model lifecycle and operational workflow, as well as identities and access.

## Why perimeter security fell short

Earlier network architectures commonly divided the world into a trusted inside and an untrusted outside. Isolated networks and controls at their entry and exit points formed the main defensive boundary. Web application firewalls, intrusion detection and prevention systems, and data loss prevention tools added further layers.

<figure>
  <img src="/images/articles/from-zero-trust-to-zero-trust-ai/traditional-perimeter-security.png" alt="A perimeter-oriented network divided into LAN, DMZ and internet segments" />
  <figcaption>A conventional network layout built around internal and external boundaries.</figcaption>
</figure>

Those layers did not eliminate information leaks or compromised servers. A staff member could disclose data; an apparently legitimate connection could carry an attack. Cloud infrastructure, remote work and personal devices also made the distinction between inside and outside increasingly unreliable.

John Kindervag introduced the zero trust model at Forrester in 2010. Its familiar shorthand is “never trust, always verify”: a user, device or application should not receive access simply because it is inside an organizational network. Identity must be established, the requested action authorized, and access limited to what the task needs. Authentication is the beginning of that decision, not permission to use every resource.

Strong identity controls, least privilege, segmentation, device posture assessment and ongoing monitoring support this approach. Decisions need to account for changes in the user, device, workload and operating conditions throughout a session.

The NIST architecture separates policy decisions from their enforcement. A policy engine evaluates access; a policy administrator establishes or terminates the communication path; and a policy enforcement point applies that decision. Identity information, asset state, threat intelligence, access policies and activity records inform the process.

<figure>
  <img src="/images/articles/from-zero-trust-to-zero-trust-ai/nist-zero-trust-model.png" alt="Zero trust logical components: policy engine, policy administrator and policy enforcement point, with supporting identity and security information" />
  <figcaption>Logical components of zero trust architecture. See <a href="https://csrc.nist.gov/pubs/sp/800/207/final">NIST SP 800-207</a>.</figcaption>
</figure>

NIST already treats resources, services and workflows as part of zero trust. The AI-specific discussion here makes the controls concrete for a model's lifecycle; it does not imply that zero trust was originally limited to protecting network traffic.

## What AI changes

The first difference is the workflow. Developing and operating a machine learning service involves several teams, frameworks and technologies. A weakness can enter through a dataset, a notebook, a training dependency, a model registry or a serving configuration. Securing the application endpoint leaves much of that chain untouched.

The second difference is the data. A model can consume large quantities of sensitive information during collection, preprocessing, training and inference. Protection must continue while that information is being transformed. A processed dataset, an embedding index or a trained model is not automatically safe to share merely because it no longer looks like the original records.

AI development is also unevenly integrated with software engineering and DevSecOps. Outsourced projects can expose gaps in ownership, review and release responsibilities. Open-source packages are essential to the workflow, but their rapid evolution makes dependency risks harder to track. Security tools designed for conventional applications may not inspect model artifacts or data transformations adequately.

A model is not an ordinary software artifact. Teams need to understand how it was produced, how it is loaded and what execution capabilities its format or dependencies require. Operations teams unfamiliar with that chain can introduce vulnerabilities through otherwise routine deployment choices.

Finally, model behavior depends on data and is often probabilistic. A successful build and an authenticated caller do not establish that an output is correct, appropriate or free of confidential information. Those are additional properties that require their own evidence.

## Threats specific to AI

**Data poisoning** manipulates data used to train or update a model, changing its behavior or introducing a targeted failure. **Model inversion** attempts to infer sensitive information about the data behind a model from its behavior or outputs. The information recovered depends on the attack and model; it should not be assumed to reproduce every training record.

**Model theft** includes unauthorized acquisition or replication of a trained model. **Adversarial examples** are inputs constructed to mislead a model, sometimes with changes that are difficult for a person to notice.

A **poisoned update** can introduce malicious code or alter a model's behavior through a compromised update path. **Information leakage** occurs when an output exposes sensitive input or training information. These risks make the integrity of data, models and processes an ongoing concern, rather than a one-time check at network admission.

## Applying zero trust to the AI lifecycle

| Area | General zero trust concern | AI-specific application in this collection |
|---|---|---|
| Core principle | No implicit trust based on location or ownership | Do not assume data, models or outputs are trustworthy because they came from an internal pipeline |
| Protected resources | Assets, services, identities and workflows | Datasets, training jobs, model artifacts, retrieval stores and inference services |
| Authorization | Give a verified identity only the access needed | Bind a workload to an approved dataset, operation, execution environment and output destination |
| Trust assumptions | Reassess access as context changes | Reassess changed data, dependencies, models and deployment conditions |
| Supporting controls | Identity, segmentation, least privilege and monitoring | Add data provenance, model integrity checks, adversarial evaluation and output review appropriate to risk |
| Threats | Unauthorized access, lateral movement and insider misuse | Also consider poisoning, extraction, adversarial inputs, unsafe updates, disclosure and unapproved AI use |
| Operational lifecycle | Apply policy to the resource and its use | Integrate controls into collection, training, evaluation, deployment, monitoring and retraining |

The practical question is not only who may call a model. It is also who may change its processing, what information it can use and what its outputs can reveal. [MLOps as the foundation for Zero Trust AI](/en/articles/mlops-foundation-of-zero-trust-ai-en/) explains how a traceable lifecycle makes those controls implementable. The complete reading sequence is available in the [ZTAI technical collection](/en/guides/zero-trust-ai/).
