# Primary-source review — 2026-09-26

`capture.json` records URLs, access date and SHA-256 hashes of captured official
sources. Hugging Face README, LICENSE and config files were fetched again at the
API-reported exact revision; their hashes matched the initial captures. API
responses retain the checkpoint SHA and tensor metadata. A captured source SHA
is not evidence of the weight revision used in a publisher benchmark.

- Target: `LiquidAI/LFM2.5-VL-3B`, launch 2026-08-12 (base-blog.html),
  revision `35a118d938ce6d123ac2d371649f24a8efb69058`.
- Drafter: `LiquidAI/LFM2.5-VL-3B-DSpark`, announced 2026-09-24,
  revision `af77e9306a26e8625fde74d2a3051ab6d21bd955`.
- Official drafter GGUF: revision `5ff73699214238467e230f40bf12b4a5ffa445be`;
  F16 conversion. File bytes were not independently inventoried; the model-card
  rounded MB figure is not an exact download or deployment-memory measurement.
- Three LICENSE files were reviewed independently: sections 1, 4 and 5,
  commercial restriction, individual/entity scope, control including 50% or
  more ownership, and the qualified nonprofit exception. No definitive
  interpretation of the exactly-$10-million boundary was added.
- Runtime performance imports use ONLY the 18 end-to-end ratios from the model
  card's six-task table. No decode ratio, throughput, TTFT or quality result was
  imported. Engine support minimums are not tested benchmark engine versions.
- `release.json`: official b11182 release API, prerelease=true,
  published_at=2026-09-25T16:46:05Z. `commit.json` records
  e9f824d8c0f011662a742c9d15d4aa18a41e32c0, especially docs/build.md and
  ggml/src/ggml-cuda/mmq.cu. This is a separate note alongside stable v0.5.0,
  not a new default engine recommendation.
- `compass.html`: Cohere's 2026-09-25 managed private-beta announcement;
  used in a Persian draft, not an atlas model/runtime entry. Reported retrieval
  results are internal and involve different document-processing paths.
- `live-pages.json`: all six requested public guide fetches returned HTTP 504.
  Local rendered-page checks are recorded separately under
  `docs/content-reviews/llm-2026-09-26/`.

No GPU inference or retrieval experiment was run. See
`docs/experiments/dspark-retrieval-2026-09-26.md` for the unexecuted protocol.
