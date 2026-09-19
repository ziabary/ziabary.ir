# Supplemental content contract, version 1

This package is a semantic research handoff, not a replacement repository or a database migration. Keep the implementation's current schema. Map this contract to the canonical editable data and generate any derived TypeScript using the project's own mechanism.

## Files and relationships

| File under `data/` | Meaning | Identity / merge key |
|---|---|---|
| `source-register.json` | Actually retrieved source documents, capture hashes, document revisions | Canonical URL plus document revision; record capture hash |
| `model-additions.json` | Five proposed catalogue additions, sourced facts and localized profiles | Publisher repository; reconcile existing aliases first |
| `software-additions.json` | MLX LM entry, capabilities and dated release snapshot | Project URL; distinguish MLX LM from MLX |
| `published-evaluations.json` | Selected reported benchmark observations | Underlying experiment, exact model variant, benchmark/version, language, metric, unit, protocol, source |
| `comparison-groups.json` | Eight editorial collections of related observations | Stable ID; membership alone does not authorize numeric comparison |
| `quantization-study.json` | Twelve observations from six ParetoQ variants | Study model name plus metric; separate research example, not six main catalogue additions |
| `selection-guidance.json` | Eight localized decision guides | Stable ID, task and locale applicability |
| `article-inserts.json` | Eight localized sections to merge semantically | Section ID plus logical article key |
| `editorial-methodology.json` | Ready localized methodology and evidence labels | Field key and locale |
| `locale-plan.json` | Deliberate regional adaptation | Locale, logical article identity |
| `coverage-review.json` | Supplied, partial, blocked and intentionally open coverage | Coverage ID; retain unresolved items in the import report |
| `retrieval-status.json` | Failed source requests | Audit-only; not published claims about models |
| `baseline-model-index.json` | 95 model IDs from the uploaded snapshot | Mapping aid, not a list that replaces current models |
| `baseline-fingerprints.json` | Source archive and data/article hashes | Three-way comparison aid; a mismatch is expected after user edits |

## Evaluation semantics

`value` is numeric and `reportedValueText` preserves the extracted representation. `score-points` does not assert accuracy, nDCG or a ratio-scale measurement. In particular, PTEB aggregates retain the publisher's aggregate label. The E5 MIRACL values use `score-points-0-100`; normalize to 0–1 only if the target schema requires it, retaining the original value and scale.

`language: null` means the source material inspected here did not establish the evaluation language. Do not turn it into English from the page locale or benchmark popularity. `multilingual` is an aggregate, not a per-language result.

`sourceDocumentRevision` is a document snapshot. `evaluatedWeightRevision` is null throughout this package because these particular transcribed results did not establish it. Do not fill it with a model card's current Git SHA. The model addition's `repositoryRevision` identifies the inspected repository separately.

`reportingRelationship` describes the reporter relative to the evaluated model. Qwen reporting a competitor is `third-party`, not automatically an independent audit. `settings.scoreOrigin` identifies relayed leaderboard results where relevant. Preserve this extra distinction when your schema has only a smaller relationship enum.

`baselineSameModelAndValueCandidates` is a search hint. It is neither a complete list of duplicates nor a decision to delete a row. Values may have been rescaled, rounded or renamed in either version. Inspect semantics and the source before merging. Two sources reproducing one experiment should not count as two independent experiments.

## Comparisons

A comparison group can contain several metrics and languages. Before any numeric difference, partition by benchmark, benchmark version, metric, unit and language. Preserve reported mode and experiment settings as well. An unknown protocol field does not become a known match because it is null in two rows.

The groups permit side-by-side inspection. Some permit a difference inside the identified publisher report. None authorize universal quality rankings, claims of statistical significance, quality ratios or causal attribution. The common top-100 reranker study documents its candidate pool; it still does not establish local latency or hardware cost.

For the E5 separate-card classification group, Salamandra separate-card group and Qwen embedding collection with relayed baselines, automated deltas remain disabled. The supplied prose can discuss named reported values with its qualifications.

## Localization and content

All localized prose objects contain `fa`, `en`, `es`. The `locales` field controls where a section or selection guide should appear; unused translations are not instructions to promote the item in every edition. Language of interface and language of evaluation are independent fields.

The four Markdown articles in `content/` are complete editorial drafts for the two regional replacements. Their frontmatter is a handoff format. Adapt it to the existing content loader rather than adding a second loader just for this package. Preserve source links and the hypothetical label on the cost example.

Do not feed `quantization-study.json` into generic deployment-memory or speed tables: it contains quality observations for trained variants, not runtime tests. Do not treat raw parameter count × precision as measured RAM or VRAM.

## Validation

Run `python3 validate.py` from any directory. It checks references, locale triads, conservative comparison flags, selected transcription fixtures, article presence, arithmetic and manifest hashes without network access. Its pass result is not a site build or independent model-quality verification. The receiving Codex must also run the actual project's checks after integration.
