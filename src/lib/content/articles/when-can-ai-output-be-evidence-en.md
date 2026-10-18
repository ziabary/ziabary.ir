---
title: "When can AI output be treated as reliable evidence?"
slug: when-can-ai-output-be-evidence-en
translationGroup: when-can-ai-output-be-evidence
lang: en
date: "2026-10-17"
faDate: "17 October 2026"
draft: true
category: AI governance
excerpt: "Authentic data does not guarantee a trustworthy AI conclusion. Input authenticity, method reliability and the defensibility of a particular result are separate links in the chain of evidence."
readTime: "9 min"
author: Mehran Ziabary
toc: auto
related:
  - what-does-95-percent-accuracy-mean-for-a-factory-en
  - ai-contract-deliverables-en
tags:
  - AI governance
  - Evidence reliability
  - AI auditing
  - Data provenance
  - Accountability
---

*If an AI system draws a conclusion from an image, a case file, industrial data or financial records, can we accept that conclusion as reliable evidence? Authentic source data is only part of the answer. We also need to establish that the analytical method is dependable and that this particular conclusion follows properly from those inputs.*

Until recently, the question of a document's authenticity seemed relatively straightforward: establish that an image had not been manipulated, a file came from the claimed time and source, a signature was valid, or data had been extracted from a trustworthy system. Generative AI has complicated the problem because it can be used both to fabricate the underlying material and to produce an apparently expert analysis of entirely genuine material that is unreliable in its method or conclusion. These problems are closely related, but answering one does not resolve the other.

A video can be genuine while a vision system misinterprets it. A medical image can be authentic while the diagnostic model lacks adequate validation for the relevant population. Factory sensor data can be recorded without manipulation while a predictive-maintenance model draws a conclusion whose error is unacceptable for the industrial application. In each case, the input can be authentic while the inference remains unvalidated.

The [materials for the US federal Advisory Committee on Evidence Rules meeting of 15 October 2026](https://www.uscourts.gov/sites/default/files/document/2026-10-evidence-rules-agenda-book.pdf#page=5) address these issues separately: authenticating material that may have been fabricated with AI, and determining when AI-generated analysis can be admitted as evidence. The texts under discussion are proposals and working drafts, not final rules in force. Their relevance here lies less in the details of US procedure than in how they clarify a wider AI governance problem.

## Authenticity and analytical reliability are different questions

The [working draft of Rule 901(c)](https://www.uscourts.gov/sites/default/files/document/2026-10-evidence-rules-agenda-book.pdf#page=150) proposes a two-stage approach to an authenticity challenge alleging AI fabrication. The challenger must first offer enough evidence to warrant an inquiry; simply saying that the material could be fake is insufficient. Once that threshold is met, the party offering the material must establish that it is more likely than not authentic. The design seeks to address both the admission of fabricated evidence and the risk that genuine evidence can be dismissed merely by suggesting that AI might have created it.

The [working draft of Rule 707](https://www.uscourts.gov/sites/default/files/document/2026-10-evidence-rules-agenda-book.pdf#page=173) addresses a different situation: AI output is offered without an expert witness, although equivalent testimony from a witness would fall under the expert-evidence requirements of Rule 702. The proponent must establish an adequate factual basis, reliable methods and their reliable application to the particular case. An expert's explanation is ordinarily contemplated to establish admissibility, with other proof possible in exceptional circumstances. These are proposed requirements for a specific judicial setting. Applying their logic to public administration, hospitals or factories is a governance argument, not an automatic extension of a legal rule to those domains.

Outside court, the underlying questions are still whether the data is genuine and whether the conclusion drawn from it is trustworthy. We may be able to answer the first positively without having sufficient evidence to answer the second.

## Overall model accuracy does not validate this particular result

In [“What does 95% accuracy mean for a factory?”](/en/articles/what-does-95-percent-accuracy-mean-for-a-factory-en/), my argument was that a headline performance number has limited meaning without the distribution of errors, their cost and the operating conditions. The distinction becomes even more important when assessing a particular output. Even a valid laboratory accuracy figure of 95% cannot establish that result number 2745, produced today, is sound. The benchmark describes statistical behavior across a sample, while the actual decision concerns an individual case.

Three levels need to be separated before relying on the output: input authenticity, meaning that the analyzed data is genuine and unaltered; model or method validity, meaning that it has been adequately evaluated under comparable conditions; and the validity of the particular inference, meaning that this result can be examined, reconstructed and defended in light of the model version, data, settings and process. These questions need not have the same answer, and evidence for one does not replace the evidence required for the others.

## An output is the product of a process

A common mistake is to treat an AI-generated report as a standalone file. The report has been produced, converted to PDF and placed on the desk, so the review may stop at the document itself. Its evidentiary value, however, depends on the process that produced it. Examining a conclusion may require the exact model and version, the input data, preprocessing steps, user and system instructions, and the tools invoked. If the system uses retrieval-augmented generation (RAG), the retrieved sources and their versions are also part of that evidence.

Even recording these details does not always make a word-for-word reproduction possible. When execution is nondeterministic, we must distinguish regenerating an identical sentence from testing the stability of the conclusion under controlled conditions. What matters is that the production chain can be inspected, that its reproducible parts are identified, and that statistical evaluation or additional tests address the remaining uncertainty.

In [“AI contracts: what exactly should we receive?”](/en/articles/ai-contract-deliverables-en/), I approached the same issue as an engineering requirement: the model, data, instructions, evaluation criteria, versions and execution records are part of the actual deliverable because they allow results to be examined again. Here, that requirement has a further implication. Without those records, an important output may be difficult to defend as evidence at all.

## Who should demonstrate that the output is trustworthy?

If a public agency, bank, hospital or insurer makes an AI-supported decision and someone challenges it, who should provide the evidence? Should the affected person have to prove from the outside that the model failed, or should the organization demonstrate that it used a suitable system and a defensible process? The proposed Rule 707 places the responsibility for establishing reliability on the party offering the AI output as evidence. I think that direction of responsibility is also useful when designing organizational accountability beyond the courtroom.

The evidence demanded must still be proportionate to the decision's impact. An internal drafting suggestion does not justify the same burden as a loan refusal, medical diagnosis, denial of a service or expensive industrial decision. For consequential decisions, however, it is unreasonable to place the entire investigative burden on a person who lacks access to the organization's data, model and execution records. The greater the impact, the stronger the organization's responsibility to demonstrate the system's suitability and the process's validity should be.

## When does human oversight make a difference?

A simple response is to call the AI output “only a recommendation” and leave final approval to a person. But if a doctor, specialist or operator merely accepts the output, their presence does not by itself improve the supporting evidence. Human oversight is meaningful when the person has sufficient information, genuine authority and enough time to review the conclusion independently. Otherwise, their involvement may further obscure the boundary between human judgment and an algorithmic result.

Suppose a system reports an 87% risk and the specialist copies that number into a report. Is this an independent expert opinion, or an algorithmic output carrying a human signature? If the analytical basis comes from the model, signing the report cannot replace validation of that basis. The discussion of the [relationship between the working Rule 707 draft and expert-evidence Rule 702](https://www.uscourts.gov/sites/default/files/document/2026-10-evidence-rules-agenda-book.pdf#page=173) also highlights the need to distinguish an expert explaining the system's reliability from a person merely accompanying its output. The issue is to make the responsibility and foundation of the opinion clear.

## A model's explanation is not an audit trail

We may ask a model why it reached a conclusion. Its answer can be clear and coherent without accurately representing the mechanism that produced the decision. The explanation may therefore be useful supporting information, but it cannot substitute for recorded, auditable evidence of the process. Inspectable records typically include inputs, the model version, retrieved sources, tool calls, inference settings, recordable intermediate outputs, applied policies and validation results.

The distinction is especially apparent with autonomous agents. “I selected this tool because it was the most suitable option” is weaker evidence than a record showing which tool was invoked, when, with which parameters, and under which identity and permissions. Recording identity and authorization does not mean storing passwords or secret keys in logs; the relevant evidence concerns the action and the authority under which it occurred. Auditing requires a way to compare the system's account with what was actually recorded during execution.

## Data provenance is part of making the conclusion defensible

So far, we have assumed authentic input, although AI has made that assumption harder to sustain. Images, audio, video and text can be fabricated, while the availability of fabrication also makes genuine records easier to deny. The proposed Rule 901(c) tries to balance those risks. System designers face a related problem: if a model derives an apparently logical conclusion from fabricated material, sound analytical steps alone cannot validate the overall result.

Data provenance is consequently more than a security or information-management concern; it is part of the basis for defending a conclusion. Sensitive applications may require evidence of where data originated, when it was recorded, what transformations it underwent and who had access along the way. The logic of a chain of custody can help inform that capability in AI systems, although its implementation and level of detail should be proportionate to the application and its risks.

## Reliable evidence must be open to challenge

If an organization says, “Our system produced this result, and the algorithm is proprietary,” it has not yet provided an independent way to assess its claim. Requiring all source code and intellectual property in every case is not necessarily proportionate either. Effective auditing needs enough access for verification. That access may be provided through methodological documentation, relevant data, version details, error rates, validation conditions and opportunities for independent testing.

Challenging an output does not require making every model detail public, but it does require a route to examine the organization's claim and respond to objections. An output with no independent path for criticism or testing offers weak governance support for a consequential decision, however precise or professional it looks. Intellectual-property protection and meaningful audit access need to be considered together when designing access arrangements.

## The required evidence should match the decision's impact

Not every AI output warrants the same scrutiny. If a model produces an incorrect email summary, a full provenance and validation review may cost more than the problem itself. A legal report, medical diagnosis, financial assessment or factory control command has different consequences. As the impact grows, stronger evidence can be justified: recorded data and versions, independent tests, substantive human review, a right to challenge, retained audit trails and, in more sensitive cases, independent specialist assessment.

Rather than asking whether AI output is valid in general, we should ask what evidence is needed to justify relying on it for this particular decision. That change moves the discussion from general trust in a model to risk governance in an actual application. It allows the organization to determine the depth of review according to the consequences of use.

## From an output to a chain of evidence

AI inserts an inferential layer between data and decisions, and that layer must itself be open to examination. In many applications, demonstrating that the original file is genuine is no longer enough. Three claims need separate support: the data is authentic, the analytical method is reliable, and this particular conclusion follows validly from those data and that method. A missing link can leave a polished, professional output with limited evidentiary value.

The legal drafts discussed here are not final rules. Their value for this argument is in separating authenticity from reliability and clarifying responsibility for providing evidence. The question is more visible in a courtroom, but it is not confined to one. Wherever AI output supports a serious decision, someone must be responsible for showing why it can be trusted and what evidence supports that assessment. “The model said so” cannot be the whole answer.

In my view, AI output approaches dependable evidence when it is supported by an inspectable chain running from the original data to the conclusion, allowing the decision to be challenged, reconstructed and defended. Delivering the report is not the end of the process; the path that produced it must remain answerable to questions and objections.
