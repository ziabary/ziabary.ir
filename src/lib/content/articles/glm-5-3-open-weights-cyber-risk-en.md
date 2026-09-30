---
title: "When an open-weight model builds exploits: where does defense become attack infrastructure?"
slug: glm-5-3-open-weights-cyber-risk-en
translationGroup: glm-5-3-open-weights-cyber-risk
lang: en
date: "2026-09-29"
draft: false
category: Language models
excerpt: "What do the NIST and Anthropic assessments of GLM-5.3 tell us, and what should change when a team gives a coding agent access to tools?"
readTime: "7 min"
cover: "/images/articles/glm-5-3-open-weights-cyber-risk/cover-v2.png"
coverCredit: "AI-generated conceptual illustration: a model builds an exploit that crosses the browser boundary to access files."
related: ["ztai-autonomous-agents-bounded-authority-en", "ai-infrastructure-security-starts-with-kernel-and-gpu-en", "zero-trust-ai-principles-and-controls-en"]
---

A coding agent needs access to be useful: it must read files, make changes and run tests. But those permissions take on a different significance when the model can discover vulnerabilities and build exploits for them. A choice once framed mainly in terms of productivity becomes a decision about software authority. For a team running GLM-5.3 on its own infrastructure, the question starts here: what have we allowed the agent to do, and what stops it if it moves beyond the intended task?

Anthropic's September 29 report makes that question harder to postpone. On ExploitBench, the company reports 50 successful end-to-end exploits in 410 attempts for GLM-5.3, compared with 56 for Claude Mythos Preview. The evaluation covers 41 V8 tasks. The roughly 12% figure is therefore the share of attempts that succeeded in this evaluation, not the probability of success against any browser or system found on the internet. [Anthropic report](https://www.anthropic.com/research/glm-5-3-and-the-spread-of-advanced-cyber-capabilities)

![Share of successful ExploitBench attempts: GLM-5.2 near zero, GLM-5.3 about 12%, and Claude Mythos Preview about 14%.](/images/articles/glm-5-3-open-weights-cyber-risk/exploitbench.svg)

*Chart based on Anthropic's report: GLM-5.3 succeeded in 50 of 410 attempts and Mythos Preview in 56 of 410. GLM-5.2 is shown approximately as “near zero.” Claude was evaluated with cyber safeguards disabled; this is not a comparison of public services with their default settings.*

## What is actually new?

GLM-5.3 was not released on the day Anthropic published its report. According to [NIST's CAISI assessment](https://www.nist.gov/news-events/news/2026/09/caisis-assessment-zais-glm-53-cyber-capabilities), the model was released on August 14, with public weights following two weeks later, around August 28. On September 17, NIST had already identified it as the most cyber-capable open-weight model in its evaluations, while noting that it remained about four months behind the US frontier on the center's aggregate capability measure.

Those findings do not contradict the similar GLM-5.3 and Mythos Preview results in the chart. NIST's frontier comparison spans multiple evaluations and models, including models with restricted access. The chart above shows one specific measure. Even the ExploitBench score in NIST's table should not be placed directly alongside the 12% figure: CAISI uses the best of three attempts on the benchmark's scoring scale, whereas the chart shows the share of attempts that reached the final outcome.

Anthropic's new contribution is its examination of fragile behavioral safeguards. In a simulated environment, a deceptive cover story induced engagement with malicious instructions in 64% of samples, prefilled reasoning in 92%, and a modified-weight version in 100%. These are rates of engagement with the request. They do not mean that the same percentages of real-world attacks would succeed. [Test design and limitations](https://www.anthropic.com/research/glm-5-3-and-the-spread-of-advanced-cyber-capabilities)

## Model refusal is not an execution boundary

For an engineering team, two controls need to be distinguished. A model may decide not to comply with a request; the execution environment can make access to a file or network destination unavailable in the first place. The first is model behavior. The second is a restriction enforced outside the model. If the security design depends entirely on a sentence in the system prompt, we are asking the very software we want to constrain to maintain its own limits.

That dependency becomes more consequential with open weights. Someone holding the weights is not merely a consumer of responses: they can also change the model's behavior. For defenders, that freedom supports research and independent deployment. For attackers, it removes the need to go through a controlled service. Publicly available weights do not, however, make running the model free or costless, nor do they establish that an attack has occurred.

The practical boundary between defense and attack lies in authorization, purpose and scope of access. Reviewing a product's code with the owner's permission, on an isolated copy and through a defined vulnerability reporting process, is work that can be specified and reviewed. Applying the same capability to someone else's systems without permission is a different activity. Calling something a “security agent” or a “research exercise” does not establish that boundary.

## What should change in organizational use?

My operational recommendation is to run GLM-5.3 and its connected agents in a sandbox without real credentials or unrestricted network access. The environment should contain only the files and tools needed for the assigned work. SSH keys, production tokens and a developer's personal sessions should not become available to an agent simply because that makes setup easier. Permission to read code should not automatically confer permission to publish, deploy or contact network destinations.

Operation logs should make it possible to reconstruct what happened: which tool the agent called, with what input, which file it changed and which result informed its next decision. Human review must also occur while the effect of a change can still be stopped. Approval after a change reaches the production environment does not serve the same purpose as approval before execution.

These are this article's recommendations for limiting an agent's authority, not a claim that a sandbox eliminates every risk. Isolation needs to be tested, and the research environment must not become a back door to real data and accounts. Choosing a model, choosing its runtime and setting the agent's permissions are connected decisions that should be considered together. The [language model selection guide](/en/guides/llm/) provides a starting point.

## How much confidence should we place in the findings?

Anthropic also reports a researcher-guided experiment in which the model chained several previously unknown browser vulnerabilities and read a file from the test system. The report states that the browser vulnerabilities were disclosed to the maintainer. This goes beyond a benchmark score, but it remains an experiment with a particular environment and level of human involvement. [Experiment report](https://www.anthropic.com/research/glm-5-3-and-the-spread-of-advanced-cyber-capabilities)

There is substantial evidence of a capability jump and of weaknesses in the safeguards tested. The extent of the real-world threat calls for more caution. Anthropic competes commercially with the model's developer; some evaluations are private, and the malicious-instruction engagement test used a simulation. NIST offers separate evidence of cyber capability, but does not independently confirm all of Anthropic's behavioral-safeguard findings.

We do not need proof of the worst-case scenario before improving access controls. A team granting an agent permission to execute code today can define the scope of that authority today. The question it can answer is concrete: if the model goes beyond our instructions, how far can it get in the environment we have built?
