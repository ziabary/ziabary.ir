---
title: "RAG, CAG, KAG, fine-tuning and instruction tuning: how do they differ, and which should you choose?"
slug: rag-cag-kag-fine-tuning-instruction-tuning-en
translationGroup: rag-cag-kag-fine-tuning-instruction-tuning
lang: en
date: '2026-06-15'
faDate: 15 June 2026
author: Mehran Ziabary
category: Technical guide
topic: infrastructure
cover: /images/articles/rag-cag-kag-fine-tuning-instruction-tuning/cover.webp
coverAlt: A foundation model at the center, connected to different paths for retrieval, caching, structured knowledge and model training
excerpt: "When a model gives an unsatisfactory answer, does it need more training, or simply access to the right information? Through practical analogies, this article compares RAG, CAG and KAG with fine-tuning and instruction tuning: retrieving documents, caching knowledge, reasoning over relationships and changing model behavior. A comparison table and real project scenarios help distinguish missing knowledge from unsuitable behavior before committing to training, and identify the method or combination that fits the task."
readTime: 17 min
tags:
  - Large language models
  - RAG
  - CAG
  - KAG
  - Fine-tuning
  - Instruction tuning
related:
  - mlops-foundation-of-zero-trust-ai-en
  - gpu-inference-latency-throughput-en
draft: false
---

When a language model's answer falls short on a specialized task, one of the first suggestions is often: “Let's fine-tune the model.” Sometimes that is the right answer, but in many projects, further training does not solve the actual problem. The model may behave appropriately but lack the document it needs. The required knowledge may be small enough to fit entirely in its context. A question may require connecting several relationships and reasoning through multiple steps. Or the knowledge may be sufficient, while the model still struggles to follow instructions.

RAG, CAG, KAG, fine-tuning and instruction tuning are five common terms for addressing these problems, but they are not five options at the same level. The first three generally supply knowledge or context from outside the model when it answers. The last two belong to the training family and change trainable parameters in the model or its added components. Crucially, instruction tuning is itself a type of fine-tuning, rather than a completely separate alternative.

> In RAG, CAG and KAG, we put something alongside the model for it to use when answering. In fine-tuning, we encode the effects of training in the trainable parameters of the model or its added components.

## The foundation model: educated, but not all-knowing

As a mental model, a foundation model can be compared to a person who has read a vast amount of text and learned language, patterns, concepts and some general or specialized knowledge. With some caution, model size and parameter count can also be compared to mental capacity and the breadth of that education. However, parameter count is not a direct equivalent of years of study or experience. Training data quality and diversity, architecture, training methods, context length and post-training evaluations all shape what a model can actually do. A larger model is not necessarily more accurate, more current or more trustworthy on every task.

If we ask such a person about a subject without providing a new source, they draw on what they have already learned. Similarly, a language model used directly generates an answer from patterns encoded in its parameters. The answer may be correct, its knowledge may be insufficient or outdated, or it may confidently produce something untrue. A foundation model is, by definition, adaptable to different domains, but it is not automatically a complete and reliable product for every application. Moreover, most models we now use as assistants or chatbots are not raw foundation models: they have already undergone instruction tuning and usually other alignment training. The [Stanford CRFM report on foundation models](https://crfm.stanford.edu/report) also emphasizes this combination of broad applicability and incompleteness.

## Two main families: adding context or changing parameters

Before turning to examples, it helps to consider two dimensions. The first is whether adding knowledge or a capability requires changing trainable parameters. With RAG, CAG and a conventional form of KAG, external knowledge can be supplied through context without retraining the main model. Fine-tuning and instruction tuning involve a training process that changes all parameters, some of them, or added parameters such as LoRA adapters. Components such as the retriever, reranker or even the generator in a RAG or KAG system can also be trained separately. The distinction here is that adding and updating external knowledge in these architectures does not inherently depend on changing the foundation model's weights.

The second dimension is how that external knowledge reaches the model. Should a few relevant passages be retrieved for each question? Is there a small, relatively stable knowledge base that can be placed in context once, with its computations cached? Or does the question require explicit relationships, rules, calculation and multistep reasoning? These three situations point toward RAG, CAG and KAG, respectively.

## RAG: find the relevant index cards in the library each time

Suppose we ask an entomologist to give a lecture on green-winged flies in Uganda. The specialist knows entomology in general but may lack sufficient information about this particular species. We therefore provide a library of specialist books and papers. These sources have already been divided into smaller sections, each with something like an index card or semantic index. Once the lecture topic is known, a search system finds several cards relevant to it and places them in front of the specialist, together with the question. The specialist prepares the lecture using both prior knowledge and these retrieved cards.

This analogy captures the logic of retrieval-augmented generation, or RAG. In a typical implementation, documents are chunked and indexed; the user's question is sent to semantic, keyword or hybrid search; the best passages are retrieved, possibly reranked, and placed in the model's context; and the model produces an answer using the question and those passages. The [original RAG paper](https://arxiv.org/abs/2005.11401) framed the method as a combination of a model's parametric memory and external, non-parametric memory.

RAG suits large document collections that change and need updating. Organizational policies, technical documentation, support knowledge bases, contracts and current news are examples where every small update should generally not require a change to model weights. Documents can be updated, answer sources can be shown, and user permissions can be enforced before retrieval. RAG does not, however, guarantee correctness: the right passage may not be retrieved, a passage may be selected without its context, or the model may misuse a document despite receiving it. Chunking, indexing, reranking, access control and answer evaluation are therefore integral parts of the system, rather than secondary details.

## CAG: put the small library on the desk once

Now suppose our collection on African flies is small, well-defined, relatively stable and fits within the model's context window. In that case, searching the index cards again for every lecture may be unnecessary. We can place the relevant collection on the specialist's desk from the start, bring the entire collection into the session once, and retain the computations for the shared portion. For next week's lecture on red-winged flies in Ethiopia, that prepared collection remains available and only the new question needs processing. If an essential new source has been added, the cache must also be updated.

In this article, CAG means **cache-augmented generation**. The core idea is to preload a limited body of knowledge into a model's long context and reuse its computational state, usually the KV cache, for subsequent requests. This removes the real-time retrieval stage and reduces the risk of selecting an irrelevant passage. The [paper introducing CAG](https://arxiv.org/abs/2412.15605) proposes this approach for bounded, manageable knowledge bases that can be preloaded into the model's context. The term is newer and less established than RAG, and not every use of caching or long context should automatically be called CAG.

This is different from learning or permanently remembering the material. Once the cache is removed or invalidated, the model has not retained that collection as new knowledge in its weights. Nor is CAG simply reusing a few passages retrieved during an earlier conversation. Its defining feature is preparing shared knowledge and reusing its computations instead of retrieving material again for each question. If the document collection is large, changes frequently, has different permissions for different users, or contains much that is irrelevant to each question, the costs of filling the context, storing the cache and invalidating it can outweigh the benefits. Some writing also uses CAG to mean something else, such as context-augmented generation, so project designs and contracts should state the intended definition explicitly.

## KAG: build a knowledge map and a reasoning path, not just a set of index cards

After several successful lectures, our specialist is asked to analyze relationships among habitats, disease vectors, climate conditions and the distribution of different fly species across several African countries. A few passages with similar vocabulary are no longer enough. The specialist's students examine the sources, record species, countries, habitats, diseases and their relationships in a defined structure, connect each claim to its original source, and formulate the necessary rules. When a question arrives, it is broken into subquestions. The answer is then assembled by following relationships, consulting the original text and, where necessary, performing calculations or inference.

This example is closer to knowledge-augmented generation, or KAG. KAG is not a completely uniform name for a single standard. In the framework introduced in the [KAG paper](https://arxiv.org/abs/2409.13731), however, it combines a knowledge graph, text passages, mutual indexing, a logical representation of the question and a hybrid reasoning engine. The aim is to address the limits of retrieval based solely on vector similarity, particularly for temporal and numerical relationships, domain rules and multistep questions. Architecturally, KAG can be seen as a more structured, reasoning-oriented member of the broader family of knowledge-augmented systems, rather than an entirely separate world from RAG.

KAG should therefore not be reduced to “RAG with more documents” or “sending several agents to do research.” A major part of the approach is structuring knowledge and directing retrieval and reasoning through relationships and rules. It is appealing in areas such as interconnected regulations, specialized medical knowledge, supply chains and troubleshooting complex systems, where the answer cannot be found in a single passage. That capability also carries substantial costs: designing schemas or ontologies, extracting and aligning knowledge, retaining links to sources, updating the graph and evaluating reasoning paths require more engineering than simple RAG. The core model can remain unchanged at answer time, although some KAG frameworks may also train models or auxiliary components to improve performance.

## Fine-tuning: change the model's skills or behavior through training

We now move to a different family. Imagine our foundation model as a general practitioner: it has broad medical knowledge but needs to perform differently on a specialized, recurring task. A doctor trains in cardiac surgery and may then receive further training in a narrower field, such as aortic valve procedures. Afterward, the doctor does not need every training textbook placed on the desk again for each patient; the effects of training remain in their skills and decision-making patterns. Similarly, fine-tuning continues a language model's training on target data, changing its parameters or parameters added to it.

Fine-tuning is not a single method. Full fine-tuning changes all or a large share of the model's weights. Parameter-efficient methods such as LoRA keep the original weights fixed while training small matrices or adapters. Even though LoRA leaves the base weights unchanged, the resulting system still has newly learned behavior because the added trainable parameters are active during inference. The [LoRA paper](https://arxiv.org/abs/2106.09685) showed that a model can be adapted to downstream tasks by training far fewer parameters.

This approach is valuable when we want a stable pattern of behavior: specialized classification, structured extraction, adherence to an output format, correct use of domain terminology, imitation of a particular style, or a task that prompting and a few examples have not made sufficiently reliable. The medical analogy should not mislead us, however. Fine-tuning alone does not guarantee the competence, judgment or scientific accuracy of a human specialist. The model learns the statistical patterns in its training data more effectively; incomplete, biased or contradictory data can carry those same weaknesses into its new behavior.

For information that changes frequently, requires precise citations or must be selected according to user permissions, fine-tuning is generally not a suitable substitute for RAG. Updating a policy in a document collection is easier than producing a new model version, and removing a fact from weights is not as simple as deleting a document from an index. Training costs, overfitting or loss of previous capabilities, sensitive-data leakage, version management and rigorous evaluation all need consideration before choosing this route.

## Instruction tuning: fine-tuning to understand and follow instructions

Our doctor may be an excellent specialist but struggle to explain a subject in a way that suits the audience. A first-year student needs an introduction, a fellow surgeon needs technical detail, and a patient needs clear, cautious language. Practicing with instructions and examples of desirable answers, such as “explain this concept to an undergraduate,” “organize the answer into three sections” or “state explicitly when there is insufficient information,” can improve how the doctor responds to instructions.

Instruction tuning is usually a form of supervised fine-tuning on examples consisting of an instruction, an input and a desired response. Its goal is not merely to add subject knowledge: the model should recognize the instruction's intent, respect its format and constraints, and generalize what it has learned to unseen instructions. The [FLAN study](https://arxiv.org/abs/2109.01652) showed that training on tasks expressed as natural-language instructions can improve zero-shot performance on unseen tasks.

The relationship is straightforward: every instance of instruction tuning is a form of fine-tuning, but not every instance of fine-tuning is instruction tuning. Training a model solely to identify a document type or predict a particular label is fine-tuning. Training it on diverse instructions and example responses so that it follows commands better is instruction tuning. Many models with “Instruct” or “Chat” in their names are trained versions of a foundation model. Instruction tuning does not automatically supply live information, new organizational documents or citation capabilities, and it is commonly used alongside RAG, CAG or KAG.

## Comparison at a glance

| Method | Does adding knowledge require model training? | Where does the knowledge or capability come from? | Best-suited application | Main limitation |
| --- | --- | --- | --- | --- |
| RAG | No, although system components can be trained | A few passages retrieved from an external source for each question | Large, changing document collections requiring citations and access control | Retrieval errors, search latency and irrelevant passages |
| CAG | No | A limited knowledge base preloaded into context, with its computations cached | A small, relatively stable knowledge base serving frequent questions | Context capacity, cache memory, prefill cost and cache invalidation |
| KAG | No; auxiliary components may be trained | A knowledge graph, source text, rules and guided reasoning | Complex relationships, multistep questions, and temporal or numerical rules | Higher construction and maintenance costs, and more complex evaluation |
| Fine-tuning | Yes: model weights or adapters | Domain- or task-specific training examples | Consistent behavior, output formats, terminology and recurring specialized tasks | Training and versioning costs, difficulty correcting knowledge, and risks of degradation or leakage |
| Instruction tuning | Yes: it is a subset of fine-tuning | Instruction–response examples from one or more tasks | Following instructions, generalizing to new commands and adapting responses | Does not replace fresh knowledge, source retrieval or access control |

## Which method should you choose?

A sound choice begins by diagnosing the failure, rather than selecting a technology name. If the model does not know the answer or must respond using the latest documents, the problem concerns knowledge. If it has the information but does not produce the required format, tone or approach, the problem is more about behavior and skill. Mixing these two problems usually makes a project more expensive and its evaluation less clear.

For a knowledge problem, the size, rate of change and structure of the sources are decisive. RAG is a more natural starting point when documents are numerous, continuously updated or need precise attribution in the answer. CAG can remove real-time retrieval and reduce latency when the collection is small, stable, shared, fits in the context window and serves many questions, but only after measuring prefill costs and memory usage and evaluating the cache invalidation policy. If the answer depends on connecting facts, explicit relationships, domain rules, calculations or multistep reasoning, KAG or similar architectures built around knowledge graphs and reasoning deserve consideration.

For a behavioral problem, first establish a baseline using a clear prompt, structured output and a few carefully chosen examples. If that approach remains unreliable, verbose or costly at real deployment scale, and high-quality training examples are available, fine-tuning can make sense. If the principal goal is following diverse instructions and generalizing how responses are produced, instruction tuning is the more specific version of that choice. In either case, an independent evaluation set should be ready before training. Otherwise, improvement on training examples can be mistaken for improvement in the product.

A few practical examples make the choice clearer:

- An assistant answering from the latest organizational policies and circulars: **RAG**, with access control and citations to the relevant source passages.
- Frequent questions about a short, stable technical manual that fits entirely in context: **CAG**, after comparing actual cost and latency with RAG.
- Analysis of regulations involving cross-references among articles, clauses, validity dates and exceptions: **KAG**, or a combination of RAG, a knowledge graph and a rules engine.
- Converting large volumes of support requests into a fixed JSON structure when prompting and few-shot examples have not achieved sufficient consistency: **fine-tuning**, or a parameter-efficient method such as LoRA.
- Creating a version of a foundation model that understands diverse instructions better and adapts answers to different audiences: **instruction tuning**.

In real projects, the answer is often a combination. We might adapt an Instruct model with LoRA for more specialized behavior, then use RAG to give it access to current documents. We might cache a small body of stable knowledge, retrieve changing documents and use a knowledge graph for a few complex questions. Such combinations are useful when each component addresses a specific failure. Adding layers without evaluation criteria merely makes the system more complicated.

## Five common misconceptions

First, putting a document in context does not mean the model has learned it. RAG and CAG do not add permanent knowledge to the model's parameters; removing the context or cache also removes access to that temporary knowledge. Second, RAG does not eliminate hallucinations. It increases the opportunity to rely on external evidence, but retrieval or generation errors can still produce incorrect answers.

Third, fine-tuning is not a suitable way to “pour all the company's documents into the model.” Knowledge that changes, must be removable or requires citations should generally remain outside the weights. Fourth, CAG does not provide unlimited or free memory. The context window, prefill time, KV cache memory and update policy remain real constraints. Fifth, KAG is not simply a new name for advanced RAG or agent-led research. Without structured knowledge, relationships and guided reasoning, a more precise name should be used for the architecture.

## Conclusion: identify the problem before choosing the method

RAG, CAG and KAG are principally three ways to provide external knowledge to a model whose parameters remain fixed: retrieve relevant passages for each request, prepare and cache a limited collection, or structure knowledge and guide reasoning through relationships and rules. Fine-tuning is a family of training methods for changing a model's behavior or skills. Instruction tuning is its subset for improving instruction-following.

If the model “does not have the necessary information,” first consider how to supply that knowledge. If it “has the information but does not perform the task correctly,” training or behavioral adaptation becomes relevant. This simple distinction prevents one of the most costly mistakes in language-model projects: choosing an appealing technology before establishing exactly which problem it needs to solve.

## Sources and further reading

- [On the Opportunities and Risks of Foundation Models](https://crfm.stanford.edu/report)
- [Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks](https://arxiv.org/abs/2005.11401)
- [Don't Do RAG: When Cache-Augmented Generation is All You Need for Knowledge Tasks](https://arxiv.org/abs/2412.15605)
- [KAG: Boosting LLMs in Professional Domains via Knowledge Augmented Generation](https://arxiv.org/abs/2409.13731)
- [Finetuned Language Models Are Zero-Shot Learners](https://arxiv.org/abs/2109.01652)
- [LoRA: Low-Rank Adaptation of Large Language Models](https://arxiv.org/abs/2106.09685)
