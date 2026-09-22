# MiMo-V2.6-Pro review — 2026-09-22

Decision: include the released RL checkpoint in the three LLM catalog editions. The release has downloadable weights and configuration, MIT license metadata, deployment recipes, and an independent Artificial Analysis evaluation of the corresponding API model. Do not repeat the publisher's universal superiority or 20–60× cost claims.

## Sources and scope

- Pinned weights/card/config: https://huggingface.co/XiaomiMiMo/MiMo-V2.6-Pro-RL/tree/73875d00b30a89ef8cc353a0b60b0e9f9561952d
- Official release: https://mimo.mi.com/docs/en-US/news/latest/v2-6 (September 22; repository creation on September 21 is not used as publication date).
- Independent API evaluation: https://artificialanalysis.ai/models/mimo-v2-6-pro
- API pricing: https://mimo.mi.com/models/en-US/mimo-v2.6-pro
- Captures and hashes: `data/llm/sources/mimo-v2.6-pro-2026-09-22/` and the corresponding evidence records. Webpage captures retain parsed visible text, excluding scripts and styles.

## Recorded facts

- Approximate architectural counts: 1.02T total, 42B active; text/image/audio/video input and text output.
- Configured context: 1,048,576 tokens. Hybrid global/sliding-window attention; no conventional full-attention KV estimate introduced.
- MIT declaration comes from the pinned model card's metadata. The repository does not contain a separate LICENSE file; its URL is not invented.
- Mixed MXFP4 storage, FP8 and BF16 components. Hugging Face's 524B stored-element count is not the architectural parameter count, because packed weights are included.
- 132 safetensors files plus `dflash/mask_embedding.pt`: **573,457,375,642 bytes (534.0738 GiB)**, including the audio tokenizer and speculative decoder. This is download size, not measured VRAM or a serving configuration.
- Card deployment recipes: vLLM TP=8; SGLang two nodes with TP=16/EP=16. No GPU model, throughput or successful deployment is inferred from those command lines. vLLM's older MiMo-V2.5 recipe/image reference remains explicit.
- API prices per million tokens: uncached input $0.435; cached input $0.0036; output $0.87. These are dated provider prices, not an assertion of availability or payment access in Iran. No new tariff is inserted into the region-specific wizard calculator.
- AA Intelligence Index v4.3.2 score 46 is recorded separately from Xiaomi's DeepSWE v1.1 score 71.9 and Terminal Bench 4.0 score 34.9. Exact tested checkpoint revisions are not supplied, so no result is stamped with the downloaded RL revision. No API speed is presented as local GPU throughput.
- The card declares English and Chinese; no Persian quality evidence or automatic Persian recommendation is added.

## Validation

- Dataset generation and locale/data validation.
- Catalog discovery in fa/en/es, total-vs-active counts, auxiliary weight coverage, and separate publisher/independent benchmark attribution.
- Browser review of filtered catalog, model overview and deployment/API tabs in all three editions.
- Type check, static production build, sitemap/structured-data/short-link validation and repository tests.
- Model inference was not run.

Unrelated local edits to the Peivast article and the user's `Archive.zip` were left untouched. No commit, push or deployment was requested for this update.
