---
library_name: llama.cpp
base_model: LiquidAI/LFM2.5-VL-3B-DSpark
license: other
license_name: lfm1.0
license_link: LICENSE
pipeline_tag: image-text-to-text
tags:
- speculative-decoding
- dspark
- lfm2
- lfm2-vl
- draft-model
- gguf
---

<div align="center">
  <img 
    src="https://cdn-uploads.huggingface.co/production/uploads/61b8e2ba285851687028d395/2b08LKpev0DNEk6DlnWkY.png" 
    alt="Liquid AI" 
    style="width: 100%; max-width: 100%; height: auto; display: inline-block; margin-bottom: 0.5em; margin-top: 0.5em;"
  />
  <div style="display: flex; justify-content: center; gap: 0.5em; margin-bottom: 1em;">
    <a href="https://playground.liquid.ai/"><strong>Try LFM</strong></a> • 
    <a href="https://docs.liquid.ai/lfm/getting-started/welcome"><strong>Docs</strong></a> • 
    <a href="https://discord.com/invite/liquid-ai"><strong>Discord</strong></a>
  </div>
</div>

# LFM2.5-VL-3B-DSpark-GGUF

GGUF build of [`LiquidAI/LFM2.5-VL-3B-DSpark`](https://huggingface.co/LiquidAI/LFM2.5-VL-3B-DSpark) for **llama.cpp**.

This is a standalone **draft sidecar**: it carries only the drafter (4 attention layers, a Markov head, a confidence head, and block size 9.) Token embeddings and the LM head are shared from the target model at load time, so it must be paired with a [`LFM2.5-VL-3B-GGUF`](https://huggingface.co/LiquidAI/LFM2.5-VL-3B-GGUF) target file.

Find more information about LFM2.5-VL-DSpark in our [blog post](https://www.liquid.ai/blog/lfm2-5-vl-dspark).

## 📦 Files


| file                            | size   | notes                                                                                                                  |
| ------------------------------- | ------ | ---------------------------------------------------------------------------------------------------------------------- |
| `LFM2.5-VL-3B-DSpark-F16.gguf` | 567 MB | Standalone F16 drafter; pair with the target model and vision projector from `LiquidAI/LFM2.5-VL-3B-GGUF`. |


All inference numbers for this release use 16-bit processing for both the vision encoder and language backbone. 

## 🏃 How to run (llama.cpp)

Run the target model with the DSpark drafter:

```bash
llama-server -hf LiquidAI/LFM2.5-VL-3B-GGUF:F16 \
  -hfd LiquidAI/LFM2.5-VL-3B-DSpark-GGUF:F16 \
  --spec-type draft-dspark --spec-draft-n-max 8 --spec-draft-n-min 0 \
  -ngl 99 -ngld 99 -fa on
```

The drafter was trained with block size 9. For Apple silicon, we recommend block size 8 through `--spec-draft-n-max 8`.

Speculative decoding is **exact** under greedy decoding: the target verifies every proposed token, so the generated output equals the target model running alone. The llama.cpp timing logs report the draft acceptance rate.

Other LFM2.5-VL-3B-DSpark formats:


| Draft                                                                                | Target                                                                 |
| ------------------------------------------------------------------------------------ | ---------------------------------------------------------------------- |
| [LFM2.5-VL-3B-DSpark](https://huggingface.co/LiquidAI/LFM2.5-VL-3B-DSpark)           | [LFM2.5-VL-3B](https://huggingface.co/LiquidAI/LFM2.5-VL-3B)           |
| [LFM2.5-VL-3B-DSpark-GGUF](https://huggingface.co/LiquidAI/LFM2.5-VL-3B-DSpark-GGUF) | [LFM2.5-VL-3B-GGUF](https://huggingface.co/LiquidAI/LFM2.5-VL-3B-GGUF) |




## 📊 Acceptance and benchmarks

See [`LiquidAI/LFM2.5-VL-3B-DSpark`](https://huggingface.co/LiquidAI/LFM2.5-VL-3B-DSpark) for model details and acceptance-length and throughput benchmarks across six vision-language tasks on NVIDIA H100 and Apple silicon, including MLX-VLM, llama.cpp, and SGLang results.

## 📬 Contact

- Got questions or want to connect? [Join our Discord community](https://discord.com/invite/liquid-ai)
- If you are interested in custom solutions with edge deployment, please contact [our sales team](https://www.liquid.ai/connect).



## Citation

```bibtex
@article{liquidAI2026VL3B,
  author  = {Liquid AI},
  title   = {LFM2.5-VL-3B: A Better and Faster Vision-Language Model for the Edge},
  journal = {Liquid AI Blog},
  year    = {2026},
  note    = {www.liquid.ai/blog/lfm2-5-vl-3b},
}
```

```bibtex
@article{liquidAI2026vldspark,
  author = {Liquid AI},
  title = {LFM2.5-VL-DSpark: Accelerating vision-language models on edge and beyond},
  journal = {Liquid AI Blog},
  year = {2026},
  note = {www.liquid.ai/blog/lfm2-5-vl-dspark},
}
```
