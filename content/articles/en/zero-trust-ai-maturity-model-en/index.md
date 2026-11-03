---
title: "A maturity model for Zero Trust AI"
slug: zero-trust-ai-maturity-model-en
lang: en
date: 2025-05-13
faDate: "13 May 2025"
category: Security
cover: "/images/articles/zero-trust-ai-maturity-model/cover.png"
excerpt: "From manual model development to controlled automated processing: five stages for building the operational foundations of ZTAI and reducing access to sensitive data."
readTime: "10 min read"
draft: false
related: ["mlops-foundation-of-zero-trust-ai-en", "zero-trust-ai-principles-and-controls-en", "from-zero-trust-to-zero-trust-ai-en", "ztai-indirect-data-access-en"]
---

An organization cannot move from scattered notebooks and manually copied datasets to a controlled AI lifecycle in a single step. It first needs to know how models are built and released, then make that process repeatable, and finally enforce who can use sensitive information at each stage.

The model below describes that progression through five levels, from 0 to 4. Its operational foundation is [MLOps](/en/articles/mlops-foundation-of-zero-trust-ai-en/). The additional ZTAI objective is to redesign routine processing so that people can define a task and evaluate its results without repeatedly seeing, moving or manipulating raw sensitive data.

This is the architectural interpretation used in this collection. It draws on the staged thinking of the [CISA Zero Trust Maturity Model](https://www.cisa.gov/zero-trust-maturity-model) and on [Microsoft's MLOps maturity model](https://learn.microsoft.com/en-us/azure/architecture/ai-ml/guide/mlops-maturity-model). The five ZTAI stages below are not an official CISA scale or a certification scheme. In particular, the data-access restrictions proposed at level 4 are an additional security design objective, not something that an MLOps maturity rating guarantees.

Levels 0 through 3 establish progressively better operational control. They are useful foundations for zero trust, but none proves that the system already enforces it. An organization may also have capabilities from several levels at once: automated training in one team, manual deployment in another and an uncontrolled maintenance path across both.

## Level 0: isolated, manual work

At level 0, data scientists, data engineers and software engineers work largely in isolation. Collaboration takes the form of files and instructions passed from one person to another. There is no dependable shared process connecting data preparation to the production application.

Data is collected manually, and the compute environment may be a workstation or an unmanaged server. Experiments are not consistently recorded. A successful experiment produces a model file, often without a complete account of its data, parameters, dependencies and environment.

Release is also manual. A scoring script may be written after experimentation and remain outside version control. A single person can become responsible for deciding that the model is ready, handing it over and explaining how to run it. The application team depends heavily on that person's knowledge.

<figure>
  <img src="/images/articles/zero-trust-ai-maturity-model/maturity-level-0.png" alt="Level 0: manually loaded data, preprocessing and training in a manually created environment, followed by manual deployment" />
  <figcaption>Level 0: an experiment can produce a model, but the lifecycle depends on manual work and individual knowledge.</figcaption>
</figure>

Reproducing results is difficult. Different tools and undocumented settings make comparisons unreliable, and changes in data may not be distinguishable from changes in code. Sensitive data can spread across personal environments without a clear record. Shared GPUs and other scarce resources are also hard to coordinate.

The immediate improvement is to make the work visible: version code, record inputs and experiments, define a repeatable handover and establish responsibility for a release. Adding a security product around an undocumented workflow will not supply that missing evidence.

## Level 1: software delivery improves, but model work remains separate

At level 1, parts of the data and software process become automated. Data collection may follow a pipeline, and code is placed in a repository. Software engineers have a clearer handover from the data team and can automate application builds, tests and packaging.

Model development still depends on manual experiments and partially managed environments. Data preparation and training may not be reproducible from a single recorded specification. The team creates evaluation or scoring scripts manually, although it now versions them. Releasing a new model still requires direct involvement from the data team.

<figure>
  <img src="/images/articles/zero-trust-ai-maturity-model/maturity-level-1.png" alt="Level 1: a data pipeline and catalog feed model development, with code capture and tests but manual model deployment" />
  <figcaption>Level 1: version control and software delivery practices improve coordination, while the model lifecycle remains partly manual.</figcaption>
</figure>

This reduces some release friction, but application tests do not establish model quality. The software may start correctly and accept requests while the model performs poorly on real inputs. Feedback from production is still limited, and experiment history may not explain why one model replaced another.

Security remains dependent on people handling data carefully. Uncontrolled data copies, broad access and informal GPU allocation can persist even when application builds are automated. The next step is to bring training and its evidence into a managed process.

## Level 2: automated, traceable training

At level 2, data engineers and data scientists collaborate through an automated training pipeline. Data ingestion and processing run in a managed environment. Experiments have recorded parameters, results and artifacts, and the model registry provides a stable handover to the application team.

Code, data references, model versions and application versions can be associated with one another. Evaluation results are stored with the model rather than living in a separate document or a person's notebook. A model can be reproduced much more reliably, and a change can be traced to its inputs.

<figure>
  <img src="/images/articles/zero-trust-ai-maturity-model/maturity-level-2.png" alt="Level 2: a data catalog feeds an automated training pipeline, with captured experiment metadata and a model registry" />
  <figcaption>Level 2: training becomes repeatable and its artifacts acquire a traceable history.</figcaption>
</figure>

Release can still be manual. Software engineers may receive a model through a reliable interface without being closely involved in the training process. That is an improvement over file exchanges, but the connection between model evaluation and the quality of the complete product can remain weak.

A well-managed training environment also does not settle all governance questions. Who can change the training code? Who can inspect the dataset, download a checkpoint or approve deployment? Resource scheduling and deployment across several machines may still require separate work. Traceability makes these questions easier to answer; it does not answer them automatically.

## Level 3: automated model deployment

At level 3, data science, data engineering and software engineering operate as parts of a connected delivery process. Training uses managed data and compute, experiments and evaluations are versioned, and releases follow an automated deployment pipeline.

A model is packaged with its environment and the evidence needed for release. Tests cover code and model integration, while quality assurance has a defined role in deciding what can reach production. Evaluation may combine automated checks with human review for the criteria that cannot yet be assessed reliably by machine.

<figure>
  <img src="/images/articles/zero-trust-ai-maturity-model/maturity-level-3.png" alt="Level 3: a registered model is packaged, assessed by quality assurance and released through an automated delivery process" />
  <figcaption>Level 3: deployment becomes a controlled part of the lifecycle instead of a separate manual handover.</figcaption>
</figure>

The organization can trace a deployed model back to the process that created it. It can also make release criteria explicit and apply them consistently. This improves the ability to investigate a failure and return to an earlier version.

The remaining gap is often the feedback loop. A deployment can pass its tests without delivering the desired user experience, and the pipeline may not yet turn production evidence into a validated replacement model. Automated delivery does not guarantee uninterrupted service, effective GPU sharing or confidentiality. Broad administrator access and permissive output channels can remain unchanged beneath an efficient release process.

## Level 4: a connected lifecycle with enforced boundaries

At level 4, data, training, evaluation, deployment and monitoring form a connected operational cycle. Relevant changes can trigger a new training run. The resulting model passes through validation and release policy before replacing a production version. Feedback is recorded and used to improve later decisions.

Continuous integration, delivery and training—CI/CD/CT—support this cycle. Unit tests, integration tests and tests of externally observable behavior provide different kinds of evidence. Human oversight remains responsible for the purpose of the system, the criteria it must meet and the exceptions it may accept.

<figure>
  <img src="/images/articles/zero-trust-ai-maturity-model/maturity-level-4.png" alt="Level 4: monitored data changes trigger training, validation and deployment, with feedback from the production application" />
  <figcaption>Level 4 connects production feedback to training and release. Automation still operates within validation and authorization rules.</figcaption>
</figure>

For ZTAI, the important additional step is to remove unnecessary human handling of sensitive data. Developers define and test a process; approved execution uses the real data within a controlled environment. The organization must enforce the separation rather than relying on a request that developers avoid looking at the records.

This is a design target, not a claim of maximum security. An automated job can leak information through logs, model files or API responses. An infrastructure administrator may still be able to inspect memory. The controls needed to address those paths are developed in [When people cannot see the data, has their access really been removed?](/en/articles/ztai-indirect-data-access-en/).

### Separate development from sensitive production processing

A useful level 4 arrangement gives developers public, synthetic or appropriately de-identified data for ordinary development. The production pipeline uses sensitive data inside a separately governed environment. Synthetic and de-identified datasets still need a disclosure assessment; those labels alone do not make a copy safe to release.

<figure>
  <img src="/images/articles/zero-trust-ai-maturity-model/maturity-level-4-separated-environments.png" alt="Development experiments and source control separated from production training, model registration, deployment and monitoring" />
  <figcaption>Development defines the processing. Production executes the accepted version against controlled data and retains the required evidence.</figcaption>
</figure>

The separation can be organized around four boundaries:

1. **Data preparation.** Developers define the transformations. Approved execution collects and prepares the real data under access and provenance controls.
2. **Training.** A specified version of the code and its parameters runs in an authorized environment. Artifacts enter a controlled registry, and monitoring records the conditions that may justify retraining.
3. **Evaluation.** Automated and, where required, human review assess the results through approved interfaces. Evaluation does not become an unrestricted route to raw samples.
4. **Deployment.** An accepted model is exposed through the intended service. The application team consumes that service without automatically receiving its training data or weight files.

These are related boundaries. A policy that governs the training input but ignores the evaluation report or model download leaves an indirect access path open. Release permissions must apply to every result that someone can receive.

### A constrained variant for isolated environments

Some sensitive or mission-critical workloads cannot support an always-connected platform or a complete CI/CD/CT stack. Network restrictions, operational constraints and cost may require a smaller arrangement: develop with non-sensitive data, move an accepted processing specification across a controlled boundary and perform final training inside an isolated environment.

<figure>
  <img src="/images/articles/zero-trust-ai-maturity-model/military-ztai-architecture.png" alt="Public-data development separated from protected-data training, with controlled transfer, management and deployment targets" />
  <figcaption>A conceptual variant for isolated or tightly controlled environments. Its suitability depends on the required data flows and threat model.</figcaption>
</figure>

The architectural objective can survive a reduction in automation. Routine development should not require the sensitive dataset to leave its protected environment. But isolation, a one-way transfer mechanism or an automated training job does not by itself protect plaintext from every privileged administrator. The design must state which administrators are trusted, what their privileges permit and what evidence supports any stronger claim.

The same discipline applies to maintenance. If every difficult failure requires exporting a memory dump or granting unrestricted access, the separation will disappear in practice. Development, diagnostics and recovery tools are part of the security architecture.

## Comparing the levels

| Level | Main capability | Typical activities | Remaining concerns |
|---|---|---|---|
| 0 | Manual, isolated model work | Individual experiments and file-based handovers | Poor reproducibility, unclear ownership, uncontrolled copies and resource use |
| 1 | Software delivery practices | Versioned code, application tests and more organized releases | Model development and feedback remain dependent on people |
| 2 | Automated training | Managed environments, experiment tracking and model registration | Manual release, incomplete product feedback and unresolved access policy |
| 3 | Automated deployment | Connected teams, release tests and traceable promotion | Feedback, continuity and confidentiality still require explicit design |
| 4 | Connected lifecycle with a ZTAI separation goal | Controlled CI/CD/CT, monitored feedback and separated development and sensitive processing | Indirect access, administrator privileges, output release and exceptions must be enforced and audited |

Human responsibility does not disappear as the level increases. People still decide what the system is for, which risks are acceptable and when it must stop. The aim is to reduce unnecessary contact with raw data while making those decisions clearer and more accountable.

Use the model to identify the next missing capability in an actual workflow. A higher label is less useful than evidence that a previously uncontrolled path is now governed. The next article maps that work to [ZTAI principles and practical controls](/en/articles/zero-trust-ai-principles-and-controls-en/); the [collection page](/en/guides/zero-trust-ai/) keeps the full sequence together.
