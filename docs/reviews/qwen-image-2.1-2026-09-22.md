# Qwen-Image-2.1 catalog review — 2026-09-22

Added `model:qwen-image-2-1` to the shared model catalog and the FA/EN/ES editions.
The earlier family inventory contained Qwen-Image names, but no Qwen-Image-2.1
catalog row existed.

Sources are captured under `data/llm/sources/qwen-image-2.1-2026-09-22/`:

- Official Hugging Face revision: `790c92633540aa0cb11d9abf19eb46d861714758`.
- Official implementation README revision: `fb7ae1d1f9611cd91524d03c53c5246b36ac8577`.
- Release: 2026-09-20; review: 2026-09-22.

The publisher's 7B figure is scoped to the image-generating DiT. The separate
Qwen3-VL-8B encoder and VAE are included in the downloadable pipeline. No whole-
pipeline parameter count or language-model context limit is inferred. The seven
weight files total 33,115,613,408 bytes (30.8413183391 GiB); this is download size,
not an execution-memory measurement. Optional 9B prompt-rewriting models are not
included in this file inventory.

The row has an explicit image-generation kind and filter, RGBA/multi-reference
capabilities, Diffusers/vLLM-Omni/ComfyUI run links and the research license.
Commercial use requires a separate Qwen license. No benchmark, Persian-quality
result, GPU recommendation or ordinary autoregressive KV-memory estimate was
created. The existing image-input language models remain separately classified.

Validation: canonical dataset/schema and three-language checks passed; 238 tests
passed; Svelte check reported zero errors/warnings; production build, sitemap and
short-link validation passed. Browser checks in all three editions confirmed the
filtered row and model-profile dialog open, with no runtime errors or Persian
fallback in the English/Spanish dialog. No model inference or deployment ran.
