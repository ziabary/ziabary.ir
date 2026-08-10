---
title: "Building Targoman without patronage"
slug: building-targoman-without-patronage
lang: en
date: 2019-05-06
faDate: "6 May 2019"
category: "AI · Field notes"
excerpt: "An eight-year account of turning a Persian machine-translation research project into a public service—through changing paradigms, difficult contracts, scarce infrastructure and no privileged connections."
readTime: "18 min read"
cover: "/images/articles/targoman-without-rent/cover.png"
external: "https://virgool.io/targoman/%D9%82%D8%B5%D9%87-%D8%AA%D8%B1%DA%AF%D9%85%D8%A7%D9%86-%D8%A8%D8%AF%D9%88%D9%86-%D8%B1%D8%A7%D9%86%D8%AA-%D9%87%D9%85-%D9%85%DA%AF%D8%B1-%D9%85%DB%8C-%D8%B4%D9%88%D8%AF-rqbt1zut3uri"
source: "Virgool (Persian original)"
related:
  - sms-otp-security-design
  - install-nupic-opensuse
draft: false
---

> **About this edition.** This is a translated and lightly edited international edition of a Persian article first published in 2019. Dates, institutions and financial details are retained because they are part of the evidence; short explanations have been added where the Iranian context would otherwise obscure the larger lesson.

People often ask how [Targoman](https://targoman.ir/), our Persian machine-translation system, was born, how much public support it received, and why. I believe that when public money is involved, transparency is not a favour. It is an obligation. We should not wait to be questioned before explaining what happened.

This is therefore not a polished startup legend. It is the less convenient story: research contracts that changed after work had begun, months without payment, infrastructure that never arrived, a technical paradigm that became obsolete days before we were due to sign, and a team that repeatedly chose to rebuild rather than defend yesterday's plan.

It is also an answer to two persistent myths. The first is that winning a public R&D project necessarily requires political connections. The second is that public funding is effortless money. Our experience was the opposite on both counts.

<figure>
<img src="/images/articles/targoman-without-rent/cover.png" alt="The Targoman machine-translation service" />
<figcaption>The Targoman machine-translation service</figcaption>
</figure>

## Act one: proposing the wrong technology—on purpose

The story began at Amirkabir University of Technology in Tehran in September 2009. I had already spent six years working in network security and artificial intelligence when I returned to university for graduate study in AI. In my second semester I took natural-language processing with Dr Saeid Khadivi, a young faculty member who had recently completed his doctorate in machine translation at RWTH Aachen University.

Iran's Telecommunications Research Center had issued calls for outsourced university projects, including a web search engine and a machine-translation engine. The translation request for proposals specified a rule-based system. Dr Khadivi believed that statistical machine translation—the approach Google had already deployed—was the future. Neither of us had the profile the procurement process appeared to reward: I was new to machine translation, and he was young and unfamiliar with government contracting.

Could we submit a proposal that contradicted the RFP? We did. The first section explained, technically and in detail, why building another rule-based engine was the wrong decision. We compared statistical translation with its predecessors and argued that the requested architecture was approaching extinction.

Predictably, we did not win. The University of Tehran received the rule-based contract. But we kept meeting experts and managers at the research center, presenting evidence and defending the alternative. Roughly twenty months after the original call, the center agreed to fund a parallel research project at Amirkabir: an English–Persian statistical machine-translation engine. That decision produced the first Iranian statistical engine for this language pair.

The contract was worth 210 million tomans in the currency of the time. Thirty percent went to university overhead, 50 million funded the creation of a ten-million-word bilingual corpus, and 10 million bought equipment. The actual research budget left for one year was about 137 million tomans—around 11 million per month for the whole project.

The first API was delivered in January 2012. In the evaluations used at the time, it achieved a BLEU score roughly 15 percent better than the other available systems, including Google. By the end of the contract, the reported gap had reached 25 percent. Parsijoo, an Iranian search engine, selected our engine from the three domestic alternatives.

<figure>
<img src="/images/articles/targoman-without-rent/image-01-20b69d.png" alt="The first interface of the machine-translation system, then called Dilmāj" />
<figcaption>The first interface of the system, then called Dilmāj</figcaption>
</figure>

We then proposed something that irritated parts of the local market. Competing rule-based systems required a largely separate effort for Persian-to-English translation, estimated at nearly one billion tomans over three years. We said we could make ours bidirectional in three months, using less than the contract's permitted 25 percent extension. The research center accepted; by July 2012 Dilmāj translated in both directions, and Persian-to-English was actually the stronger side.

We were accused of “ruining the market” by doing too much for too little. That criticism revealed a difference that would follow the project for years: were we optimising the size of a contract, or the usefulness of a system?

## Act two: twenty-one unpaid months

The research contract ended in August 2012. We could have delivered the servers and walked away. Instead, we kept the service alive and improved it for another twenty-one months without a support contract.

It needed the work. The system ran on three servers. Its open-source research components had never been designed as a reliable public service, and under fewer than 500,000 translated words a day the engine could crash more than twenty times. Translation accounted for a significant share of Parsijoo's traffic, and demand kept growing. Six months later it was approaching 800,000 words a day. A laboratory prototype had found users; now it needed to become an engineered product.

Negotiations for that transition moved slowly through institutional restructuring and a change of government. Eventually, in January 2014, a new two-year contract was signed for 400 million tomans. After university overhead, equipment and later insurance charges, about 243 million remained to execute twenty-four months of work—again, roughly 10 million tomans a month.

The first phase was accepted in June, but even the advance payment had not arrived. A competitor argued that contracting through a university harmed the private sector and sought to have the project cancelled. The agreement was subsequently rewritten across technical scope, intellectual property, open-source licensing and user-growth obligations. A research project became a product contract expected to quadruple both users and translated words.

We could not preserve everything, but we protected three points. The name **Targoman**, which we had chosen and registered independently, would not be appropriated. Core code could be released under LGPLv3 and BSD licences, allowing the work to survive even if the project changed hands. And we retained temporary commercial rights to the bilingual corpus created in the first project.

Payment for phase one arrived almost a year after the project began, by which time phase two had already been delivered.

The contract also promised thirty servers. We received five. A proposed migration to a domestic virtualisation platform consumed four months and ultimately failed; we returned to the same five physical machines and carried the growing traffic on them. By January 2016, however, the redesigned Targoman—now engineered locally rather than assembled as a research prototype—was released with major quality improvements, particularly on literary text.

## Act three: when institutions encounter an unfamiliar contract

In August 2015 we incorporated Targoman Intelligent Processing. A new national-search programme preferred companies rather than universities, so we partnered with the team behind Farazin, a rule-based translator. Our proposal was to combine their system with Targoman's statistical engine.

The two young companies agreed to share the project equally. The approved budget, however, was less than half the amount requested. Unlike university research contracts, the company agreement also carried payroll insurance, contract insurance, value-added tax, annual tax, bank guarantees and other deductions.

Then came an unexpectedly revealing obstacle: the contracting office did not know how to contract with two companies jointly. I spent almost two months studying consortium and civil-partnership structures with the institute's legal department. We eventually designed a joint-liability agreement, only to discover that banks were equally unfamiliar with a shared corporate account. With help from Bank Mellat's central administration, a new form and procedure had to be created. Four months later we opened what may have been the bank's first joint account for two legal entities. Every cheque—with two seals and four signatures—still became a story of its own.

<figure>
<img src="/images/articles/targoman-without-rent/image-06-d1b043.png" alt="The shared corporate bank account created for the partnership" />
<figcaption>A legal structure existed on paper; operational procedures had to be invented</figcaption>
</figure>

This administrative episode is not a side note. Innovation is often described as a technical problem, while the contracts, banking procedures and institutional categories around it are treated as neutral. They are not. A technically sound collaboration can fail simply because the surrounding system has no box for it.

## Act four: returning the unsigned contract

We received the final draft on 29 September 2016. Two days earlier, Google had announced production neural machine translation for Chinese-to-English, with results that surprised the field. Research on neural translation had been under way for years, but most of us had not expected a commercial service at that scale so soon. Google said other language pairs would follow.

Our approved proposal was for a statistical–rule-based hybrid. Signing it unchanged would have meant spending public money and our time on a system that had become obsolete before the ink dried.

So we refused to sign.

Every other project in the programme was moving forward; the budget existed and the paperwork was complete. The programme's managers understandably asked what would happen to the domestic translator if we walked away. Our answer was that we would sign only if the technical proposal changed: extend the statistical service long enough to meet existing obligations, but direct the research toward neural translation. We accepted the original quality and adoption targets even though the new path carried much greater risk.

Five months later the revised proposal was approved at the same price and with significantly expanded commitments.

<figure>
<img src="/images/articles/targoman-without-rent/image-07-5d0da1.png" alt="Google's 2016 neural machine-translation announcement" />
<figcaption>The announcement that made our already-approved architecture obsolete</figcaption>
</figure>

## Act five: Targoman becomes neural

We had begun the research before signing, so the first phase arrived forty-five days early. Payment was delayed again while an external panel re-evaluated the national-search projects. Some projects were reduced; two, to my knowledge, were cancelled. Our first payment arrived in September. In the meantime, cash-flow pressure and unpaid costs had already forced valued colleagues to leave.

On 11 July 2017 the team put a neural Targoman engine into service. The contract had required only a research prototype. Google was still serving English–Persian with its statistical engine, and for a brief period Targoman's quality was dramatically better. We upgraded our Telegram translation bot, sent previews to technology journalists and public figures—and received almost no reaction. Two weeks later Google switched English–Persian to neural translation and our short celebration ended.

The answer was not to defend the old engine or the contract wording. We persuaded the supervisors that continued investment in statistical translation would waste money, accepted the operational risk of a young neural system, transferred every contractual commitment to it, and retired the statistical engine.

Demand rose sharply. The contract had required throughput to increase from 120 to 240 words per second; the third-phase delivery reached 1,600. Translation quality also exceeded the contractual targets. The Academic Center for Education, Culture and Research contributed a thirty-million-word corpus of translated research papers, enabling a specialised model for our Tarjomyar writing assistant and bringing a significant increase in use.

<figure>
<img src="/images/articles/targoman-without-rent/image-11-eac59c.png" alt="Growth in use after Targoman moved to neural translation" />
<figcaption>Usage grew sharply after the neural engine entered service</figcaption>
</figure>

## The bill after the last delivery

The final phase was delivered in March 2018, but settlement required a social-insurance clearance. Although we had paid about 58 million tomans in employee insurance during the year, the Social Security Organization initially demanded another 64 million for the clearance. After appeal, that demand fell to 30 million.

Of our company's 350-million-toman share of the joint project, direct deductions included 88 million in social-insurance payments, 31 million in value-added tax, about 20 million for corpora that the contract required us to purchase and release, around 11 million in phase deductions, close to 5 million for bank guarantees, and an estimated 9–15 million in annual tax. Rent, salaries and ordinary operating costs are not included in that list. The final payment for a project approved in 2015 arrived in December 2018.

Afterward, we did not wait for another public contract. Targoman continued to improve, signed international development agreements, and expanded to nine languages. We also proposed that the company assume the cost of running the public service. Our position was—and remains—that public support makes sense for research and development whose risk is beyond a young company's capacity. It should not become permanent dependence.

## What the project proved to me

I do not tell this story to claim that every decision was correct. I tell it because public projects should be auditable, including their mistakes, and because the simplified stories told about them hide the useful lessons.

- Public R&D can produce more than reports and laboratory demos.
- A contractor's duty is to maximise public value, not the size or duration of the contract.
- An approved architecture is not sacred. When the underlying reality changes, returning an unsigned contract may be more responsible than delivering exactly what it asks for.
- Open licensing and ownership terms are architectural decisions: they determine whether knowledge survives a change of contractor.
- Infrastructure, procurement, banking and legal procedures are part of the product environment, not administrative background noise.
- A local product does not need its foreign competitor to be blocked. If users retain a real choice, quality has a chance to prove itself.
- Competing with a global technology company does not always require a global-company budget. It does require focus, evidence, endurance and the freedom to change the model.

For eight years we did not offer a bribe—not even a promotional pen—to anyone at any level. We relied on the work and its measurable output to earn continued support. That path was slow, expensive and frequently exhausting, but it was possible.

Fighting corruption cannot be reduced to condemning it from a safe distance. Honest work has to enter the same difficult systems, make its costs visible, and turn on the lights.

