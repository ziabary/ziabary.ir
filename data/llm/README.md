# LLM research dataset

The imported snapshot lives in `v0.1.0/data/repository.v1.json`. It is the editable data source; `src/lib/llm/data/*.v1.ts` are generated typed modules.

From the repository root:

```sh
npm run generate:llm
npm run verify:llm
npm run check
npm test
npm run build
```

The generator writes into the site's `src/lib/llm/data/`, and the validator compares those modules to the canonical JSON, checks strict schema compatibility, references, field claims and artifact byte sums. Record later enrichments in `research/four-tables-review.json`; the upstream manifest and CSV exports describe the original archive, not the enriched canonical data. Generation alone does not update these ancillary files.

`v0.1.0/docs/`, `research/`, `manifest.json`, `validation/` and `checksums.sha256.json` preserve upstream research/provenance. The supplied import instructions and original checksum manifest describe the original ZIP, not a fresh validation of later edits or the integrated repository. Use the root commands above for this repository. Current integration results and screenshots are under `docs/reviews/local-2026-09-15/`.

Archive: `ziabary-llm-dataset-v0.1.0.zip`
SHA-256: `db9427c8d28d0a1ffbeb58abfe3241fcc945bb2ab64d57d9ef0de01fd4fdba28`
All 45 checksummed members of the archive matched before import. The schema, guide, adapter and view hashes also matched the package's expected inputs. The installer was reviewed and used with its hash guards intact.

Only the typed repository is consumed by the draft guide. The four-table revision adds 37 `PublishedEvaluation` records: 30 DeepSeek-R1-Distill scores, three Qwen3 embedding task means, three Qwen3 reranker MTEB Code results, and one E5 MIRACL result. An exact tested-weight commit is optional for these named-model reports. Source-document commits and the catalog's weight snapshot never stand in for that missing commit. These reports have no deployment/artifact binding and do not populate `BenchmarkRun` or exact-execution comparisons.

The revision also restores 136 documented applications independently of their unmeasured outcomes, adds 55 sourced release dates (including month/year precision), nine specialized model specification blocks, and 13 software target scenarios. The software's release date remains distinct from its review date. Unknown logical parameter totals stay unknown when only a component or serialized-element count is available.

Unverified quantized candidates and hypothetical memory calculations remain in research files. No measured hardware recommendation or generated article was added. The guide remains gated by the exact `show-drafts=true` parameter and excluded from the sitemap. The current review, column inventory, coverage measurements and screenshots are under `docs/reviews/local-2026-09-15/llm-four-tables/`.
