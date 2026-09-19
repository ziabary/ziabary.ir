# Ziabary LLM research supplement v0.2.0

**Historical import documentation.** The supplement has since been reviewed and
edited. Its archived manifest/checksums and `validate.py` are not the current
integration validator. Run `npm run verify:llm` from the project root; see
[the current data contract](../README.md).


Research snapshot: 2026-09-15. This package supplements the earlier model/software catalog. It is **not** a replacement for `repository.v1.json`, a site patch, or a publication request.

Start with `llm-research-report.fa.md` for findings and `CODEX-IMPORT.fa.md` for implementation instructions. `manifest.json` lists record counts. Every empirical/specification record links to `data/sources.json` through `sourceIds`.

The data contains published observations, exact artifact metadata, explicit planning calculations, and editorial starting points. Their meanings are separate. Published observations do not require a fabricated tested checkpoint revision. Artifact repository revisions identify downloaded-file metadata; they do not identify someone else's evaluated weights.

| Files under `data/` | Purpose |
|---|---|
| `artifacts`, `hardware`, `workloads`, `memory-policy` | Inputs to memory planning |
| `memory-scenarios`, `hardware-fit-matrix` | Calculated full-GPU capacity screening, including per-device reserve |
| `cpu-profiles`, `cpu-fit-matrix`, `slm-cpu-planning` | CPU RAM planning; no implied CPU speed |
| `published-performance` | Reported throughput, latency and memory, grouped by publication/protocol |
| `published-quality` | Published task scores, with dataset, mode and comparison group |
| `compatibility`, `quantization-hardware-support` | Documented deployment routes, reported runs and kernel support |
| `software-guidance` | User-facing differences between 11 software components |
| `specialized-models` | Embedding/reranking facts and vector-storage calculations |
| `airllm-observations`, `published-memory-claims` | Reported memory scopes that should not be collapsed into one generic VRAM minimum |
| `task-starting-points` | Source-supported editorial starting models |
| `model-aliases`, `internal-links` | Identity joins and verified internal routes |
| `sources`, `source-review-notes` | Citation records and editorial exclusions/corrections |

All listed data files use `.json`. The policy file is an object; the others are arrays. Numeric values use decimal points. Units are in field names or adjacent metadata. No currency conversion is implicit. IDs are package-local stable keys; map them to the current site schema during import.

Run `python3 validate.py` in this directory. It uses the standard library, resolves references and independently recomputes memory formulas and benchmark token/duration checks. `validation-result.json` records the delivered run. `checksums.json` hashes the data, manifest and documentation. Validation does not rerun model inference.

A matrix cell is a derived view, not a separate experiment. The 1,620 GPU cells come from 108 memory scenarios × 15 hardware profiles. The 540 CPU cells use the same scenarios × 5 RAM classes. There are 40 published performance observations and 64 individual quality scores, not 104 independent research studies.

Full third-party articles and model weights are not redistributed. Citation URLs, source locators, revisions where available, and capture hashes are retained. Hashes describe the captured document or metadata object; they are not proof of an evaluation run.

Local revision (2026-09-15): rental rates, economic scenarios, token-cost examples and the exclusive pricing source were removed at the site owner’s request. Remaining performance and memory data are unchanged. The Trooper source remains only as evidence of the modified RTX 4090’s memory capacity.
