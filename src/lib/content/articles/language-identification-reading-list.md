---
title: Language identification — a 2011 reading list
slug: language-identification-reading-list
lang: en
date: 2011-02-26
faDate: February 26, 2011
category: NLP
excerpt: A restored research bibliography from the development of an early language-detection tool, covering n-gram ranking, Markov processes, string kernels, short-text identification, speech and multilingual web collections.
readTime: 7 min read
related:
  - htm-papers-and-books
  - install-nupic-opensuse
external: "https://web.archive.org/web/20120525095211id_/http://blog.mohammadzadeh.info/index.php/language-detection-related-documents"
source: Internet Archive
---

<div class="archive-note"><strong>Archive note.</strong> I compiled this list in 2011 while writing about a language-detection tool. It is a historical research trail, not a current systematic review. The original blog mirrored many PDFs; this version preserves bibliographic information without republishing third-party files.</div>

Language identification looks deceptively simple when the input is a full, clean document in a well-represented language. The interesting cases begin when the sample is short, noisy, transliterated, drawn from similar languages, or mixed with names, URLs and markup. The reading list I built therefore ranged from classic character statistics to speech features and web-specific signals.

## Core text-identification methods

- J. King and J. Dehdari, “An N-gram Based Language Identification System” (2000).
- P. Poutsma, “Applying Monte Carlo Techniques to Language Identification” (2001).
- M. Padró and L. Padró, “Comparing Methods for Language Identification” (2004).
- C. Kruengkrai, P. Srichaivattana, V. Sornlertlamvanich and H. Isahara, “Language Identification Based on String Kernels” (2005).
- S. Kranig, *Evaluation of Language Identification Methods* (2005).
- P. Vojtek and M. Bieliková, “Comparing Natural Language Identification Methods Based on Markov Processes” (2007).
- L. Grothe, E. W. de Luca and A. Nürnberger, “A Comparative Study on Language Identification Methods” (2008).
- T. Gottron and N. Lipka, “A Comparison of Language Identification Approaches on Short Query-Style Texts” (2010).

## Speech and segment-level identification

- W. Zue and T. J. Hazen, “Automatic Language Identification Using a Segment-Based Approach” (Eurospeech, 1993).
- M. A. Zissman, “Comparison of Four Approaches to Automatic Language Identification of Telephone Speech” (1996).
- P. A. Torres-Carrasquillo, E. Singer, M. A. Kohler, R. J. Greene, D. A. Reynolds and J. R. Deller, “Approaches to Language Identification Using Gaussian Mixture Models and Shifted Delta Cepstral Features” (2002).

## The web, short text and multilingual collections

- B. Pouliquen, R. Steinberger and C. Ignat, “Automatic Identification of Document Translations in Large Multilingual Document Collections” (2003).
- G. R. Botha and E. Barnard, “Factors That Affect the Accuracy of Text-Based Language Identification” (2007).
- “Language Identification of Short Text Segments with N-gram Models.”
- “Language Identification on the Web: Extending the Dictionary Method.”
- “Language Identification in Web Pages.”
- “Web Page Language Identification Based on URLs.”
- “Feature Selection Method of Web Page Language Identification.”
- “Language Identification for Person Names Based on Statistical Methods.”
- “Language Identification: How to Distinguish Similar Languages.”
- “Mining the Web for Bilingual Text.”

## Model and feature comparisons

The original collection also included work on n-gram frequency ranking, optimising n-gram order, decision-tree models, distance measures for joint language and encoding identification, neural-network approaches and score fusion. Together these papers made one point clear: “language detection” is not one problem with one best classifier. Input length, domain, script, similarity between candidate languages and tolerance for unknown classes all change the answer.

That observation shaped the tool I was building. A benchmark on long news articles can hide the failures that matter in production. Product names, person names, search queries and fragments copied from a multilingual page demand different evidence and often a calibrated “unknown” result rather than a confident guess.

This bibliography predates modern multilingual transformers, but the evaluation questions remain current: What exactly counts as a language sample? Which languages are allowed? How short can the text be? How does the system behave when its closed-world assumption is false?

