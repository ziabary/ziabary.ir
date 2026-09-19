# Sources, coverage and editorial decisions

Review date: 2026-09-17. This is a review of published documentation and the
existing site evidence, not a report of model execution. Existing pinned source
records retain their access dates and commits; checking a current card did not
turn its document revision into a tested-weight revision.

## Changes to the meaning of evidence

| Area | Primary evidence / locator | Decision |
|---|---|---|
| DeepSeek R1 distills | [Official README](https://huggingface.co/deepseek-ai/DeepSeek-R1), **Evaluation Results → Distilled Model Evaluation** and evaluation settings | A common publisher table supports scoped numerical ordering for a matched metric; it does not establish statistical superiority. MATH-500 pass@1 and AIME cons@64 remain distinct. |
| GPUStack engine comparison | Existing source `gpustack-qwen14-h100`, **Experiment Results §1** and the recorded serving commands in `published-performance.json` | The three BF16/Qwen3-14B/H100-SXM baselines share workload and protocol. FP8 changes another factor and is rejected from that controlled comparison. Successful requests and input tokens are checked, not inferred from the group name. |
| Language semantics | Model cards and the individual evaluation protocol in `repository.json` | A missing/default language is unspecified. A multilingual aggregate is not a per-language score. Translation directions remain pairs. No new language-specific scores were invented. |
| SmolLM3 | [Official model card](https://huggingface.co/HuggingFaceTB/SmolLM3-3B), language metadata and multilingual capability prose | The metadata/prose discrepancy is retained explicitly; eight metadata labels are not silently converted into eight verified language results. Thinking and non-thinking evaluations are separate. |
| GPT-OSS memory | [Official gpt-oss-20b card](https://huggingface.co/openai/gpt-oss-20b), model introduction / efficient deployment | The publisher’s 16 GB claim is scoped to its supported execution representation. It is not a universal promise for a GGUF file, arbitrary context or any engine. The Persian 4090 article and international versions now preserve that distinction. |
| Memory calculation | Exact artifacts/configs in `planning-artifacts.json`, `planning-sources.json` and the supplement’s `memory-policy.json` | Conventional KV requires a supported architecture and valid artifact context; hybrid/MLA/unknown architectures are not forced into that formula. File size, modeled budget and reported memory remain separate. |
| Evidence prose | Explicit `presentationNotes` in canonical evidence and localized entity-field records | Stock warnings are omitted by editorial choice. Source-specific limitations and hosting-provider disclosures remain explicit. Runtime wording matching has been removed. |

## Coverage decisions

No new model was added merely to raise the count. The 95-model catalog already
covers dense/MoE generators, code, vision-language, embedding, reranking and
encoder/classifier roles. Separate quantizations remain artifacts of a model.

| Candidate / family checked | Distinct decision it covers | Outcome |
|---|---|---|
| [Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) | Recent dense FFN with hybrid attention, native image/video input, 262,144 native context and conditional extension | Already present. Current model overview was checked against the recorded separation of attention/FFN and component/stored parameter counts. Two attributable evaluations already exist; no blanket speed claim was added. |
| [DeepSeek-V4.1-Flash](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash) | CED/CSA2, separate 8B prefill and 16B decode activation, backbone versus Engram | Already present with seven recorded evaluations. The card’s 552B backbone and 196B conditional memory are not flattened into an unsupported total; conventional KV remains excluded. |
| [Gemma 4 E2B](https://huggingface.co/google/gemma-4-E2B-it) | Small multimodal model with effective counts and per-layer embeddings | Already present with eight evaluations. Effective 2.3B, language-component 5.1B and stored elements remain separately labeled. |
| SmolLM3 / Aya Expanse | Small general chat candidates; published multilingual scope and license differ | Retained as conditional starting candidates, with target-language evidence status shown. Aya’s noncommercial terms are not hidden. |
| Qwen3 4B/8B | RAG generator sizes with documented engine routes | Retained; a starting shortlist, not a claim of Spanish/Persian superiority. |
| multilingual-e5-small / multilingual-e5-large-instruct | Compact embeddings versus instruction-aware retrieval | Retained as separate models with different input contracts. Plain E5 instructions are not imposed on E5-instruct. |
| BGE reranker / Qwen3 reranker | Dedicated reranking and generator-tokenizer/context constraints | Retained with profile/download/run links and task-specific evidence. |
| Qwen2.5-Coder / StarCoder2 / Qwen3-Coder | Completion versus repository agents and sparse activation | Different roles retained; code benchmark scores are not presented as agent success. |
| CPU / Apple Silicon / AMD | Deployment alternatives to CUDA | Existing documented software/backends retained. No matched speed comparison across all platforms is claimed. The new coverage note makes the NVIDIA concentration explicit. |

Spanish starting points do not depend on the publisher’s nationality. They show
claimed-language coverage separately from task-specific results. Aggregate
MMTEB/MTEB numbers are not relabeled as Spanish measurements.

## Article review

All ten existing Persian articles were read and retained where the earlier audit
had already corrected the issue. The additional substantive Persian edit is the
GPT-OSS memory qualification in the 4090 article. Publication dates and published
states were retained. The 20 international articles are full editorial versions,
not short summaries or links back to untranslated Persian prose.

- **Model size:** SmolLM3 thinking modes, DeepSeek distill metric differences and
  Qwen reranker results stay in their own reported scopes. Educational KV examples
  identify their assumed architecture and reserve.
- **24/48 GB:** [NVIDIA 4090 specifications](https://www.nvidia.com/en-us/geforce/graphics-cards/40-series/rtx-4090/)
  anchor the official 24 GB card; the modified 48 GB card remains nonstandard.
  The existing nine pinned GGUF artifacts, total/active MoE distinction and
  Qwen coder KV calculations were reconciled with the shared data.
- **Four-bit:** Qwen3-8B file sizes are exact artifact observations; quality,
  execution memory and speed are not scaled by the file-size reduction.
- **AirLLM:** [source at reviewed revision](https://github.com/lyogavin/airllm/tree/8f423a5adb04783617e0fd7bd3571aedddf12e57)
  scopes LoRA, compression and prefetch behavior. [FlexGen’s paper](https://arxiv.org/abs/2303.06865)
  is a separate reported system, not an AirLLM benchmark. Transfer arithmetic is
  an explicit bound, not measured token speed.
- **RAG:** English, Spanish and multilingual retrieval evidence are separated.
  [MIRACL](https://huggingface.co/datasets/miracl/miracl) language splits and
  embedding/reranker cards support dimensions, context and input contracts.
  The Targoman source is short and explicitly identified as Persian.
- **Coding:** [SWE-bench](https://www.swebench.com/) Verified/Bash Only scope and
  [OpenAI’s Verified audit](https://openai.com/index/why-we-no-longer-evaluate-swe-bench-verified/)
  remain attributed. The [8 July 2026 follow-up](https://openai.com/index/separating-signal-from-noise-coding-evaluations/)
  was separately verified; EN/ES now also mention the retraction of the earlier
  SWE-bench Pro recommendation, without adopting it as the site’s own finding.
- **Evaluation:** [IberoBench, COLING 2025](https://aclanthology.org/2025.coling-main.699/)
  has European-Spanish scope. [SpanishBench’s pinned README](https://github.com/EleutherAI/lm-evaluation-harness/blob/f2131517dc2e00e6f6a062e254fa126f9e4426da/lm_eval/tasks/spanish_bench/README.md)
  defines the actual tasks; [MMTEB](https://arxiv.org/abs/2502.13595) averages do
  not replace language subsets. New original examples preserve negation, dates,
  identifiers and numeric output; they are not reported experimental results.
- **Serving:** Request concurrency, active sequences, queueing and failover are
  separated. Numerical replica examples are educational assumptions, not a
  service capacity measured by this site.
- **Software:** Four-engine focus is preserved. [vLLM GGUF documentation](https://docs.vllm.ai/en/stable/features/quantization/gguf/),
  [Ollama environment configuration](https://github.com/ollama/ollama/blob/v0.34.1/envconfig/config.go),
  [llama.cpp server](https://github.com/ggml-org/llama.cpp/tree/v0.4.1/tools/server)
  and [SGLang settings](https://docs.sglang.ai/advanced_features/hyperparameter_tuning.html)
  were read for the relevant capability/version claims.
- **Cost, Persian:** The existing [price evidence and arithmetic report](../../reviews/local-2026-09-16/llm-cost-iran/README.md)
  and `verify-prices.py` were rechecked successfully. Current Arvan and Iranserver
  tables still showed the quoted API/monthly/hourly figures; the Teccaf RAM page
  still displayed 400 million toman. The article preserves its September 16
  snapshot. Ferdowsi’s interactive selected-GPU evidence is in the saved snapshot;
  the generic text fetch did not expose that selection, so it is not claimed as
  a fresh September 17 tariff verification.
- **Cost, EN/ES:** Independent educational USD assumptions; no market price is
  invented and no Iranian rate is converted into a global tariff. Component sum,
  token accounting, electricity, 36-month ownership, accepted-work cost and
  conditional cash-recovery arithmetic are explicit. No interactive cost view
  was restored.

## Limits that affect selection

A missing evaluation is not unsupported-language evidence. Model-card claims are
not independent measurements. Many sources omit exact tested-weight revisions,
per-language subsets or complete serving settings; those comparisons remain
side-by-side only. GPU performance coverage is not universal, and no model was
run, GPU rented or API purchased for this work. These gaps are visible in the
site rather than filled with plausible-looking numbers.
