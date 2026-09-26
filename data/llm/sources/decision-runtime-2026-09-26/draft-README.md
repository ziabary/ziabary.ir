---
library_name: sglang
base_model: LiquidAI/LFM2.5-VL-3B
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

# LFM2.5-VL-3B-DSpark

**LFM2.5-VL-3B-DSpark** is an experimental speculative-decoding draft model that brings DSpark to
vision-language models. It allows [`LiquidAI/LFM2.5-VL-3B`](https://huggingface.co/LiquidAI/LFM2.5-VL-3B)
to decode substantially faster without changing its output, for a minimal increase in memory footprint.

This is a drafter for [`LiquidAI/LFM2.5-VL-3B`](https://huggingface.co/LiquidAI/LFM2.5-VL-3B). In SGLang on a single H100, decoding runs up to 2.66× faster. On Apple silicon, it reaches up to 3.13× with MLX-VLM on an M5 Max and up to 2.14× with llama.cpp on an M3 Ultra.

Find more information about LFM2.5-VL-3B-DSpark in our [blog post](https://www.liquid.ai/blog/lfm2-5-vl-dspark).

## 🗒️ Model Details

LFM2.5-VL-3B-DSpark is a DSpark speculative-decoding draft model with the following features:

- **Target model**: [`LiquidAI/LFM2.5-VL-3B`](https://huggingface.co/LiquidAI/LFM2.5-VL-3B)
- **Draft parameters**: **279.5M** (BF16)
- **Backbone**: 4 full attention layers, `hidden_size=2048`, `intermediate_size=6144` with SiLU/SwiGLU, GQA with `num_attention_heads=32` / `num_key_value_heads=8`, `head_dim=64`
- **Extra heads**: Markov head (rank 256) + confidence head
- **Block size**: 9 during training; 8 or 9 at inference, depending on hardware
- **Vocabulary**: 128,000

> [!NOTE]
> On Apple silicon the drafter is run at block size 8 rather than 9.

Use each drafter checkpoint with its corresponding target model:

| Drafter                                                                              | Target                                                                 |
| ------------------------------------------------------------------------------------ | ---------------------------------------------------------------------- |
| [LFM2.5-VL-3B-DSpark](https://huggingface.co/LiquidAI/LFM2.5-VL-3B-DSpark)           | [LFM2.5-VL-3B](https://huggingface.co/LiquidAI/LFM2.5-VL-3B)           |
| [LFM2.5-VL-3B-DSpark-GGUF](https://huggingface.co/LiquidAI/LFM2.5-VL-3B-DSpark-GGUF) | [LFM2.5-VL-3B-GGUF](https://huggingface.co/LiquidAI/LFM2.5-VL-3B-GGUF) |

## 📊 Performance

### Benchmarks

Speculative decoding is **exact under greedy decoding**: the target verifies every proposed token, so the generated text is what the target would have produced on its own. Under matched sampling settings at non-zero temperatures, speculative decoding preserves the target model's output distribution. You get the speedup, not a different model.

See [`LiquidAI/LFM2.5-VL-3B`](https://huggingface.co/LiquidAI/LFM2.5-VL-3B) for quality benchmarks.

### Draft acceptance

This table reports the mean number of draft tokens accepted per target verification pass at batch size 1 and temperature 0. Higher acceptance generally enables greater acceleration, but the measured speedup also depends on hardware and runtime overhead.

Following [MMSpec](https://arxiv.org/abs/2603.14989), the evaluation covers General VQA, Text VQA, Image Captioning, Chart VQA, Complex Reasoning, and Multi-turn Conversation.

| Benchmark  | 1×H100 (SGLang, block 9) | Apple M5 Max (MLX-VLM, block 8) | Apple M3 Ultra (llama.cpp, block 8) |
| ---------- | ------------------------ | ------------------------------- | ----------------------------------- |
| MMMU-Pro   | 4.11                     | 4.07                            | 4.19                                |
| Multi-turn | 3.46                     | 3.24                            | 3.31                                |
| COCO       | 4.57                     | 4.21                            | 4.50                                |
| CharXiv    | 4.11                     | 4.34                            | 4.04                                |
| TextVQA    | 3.74                     | 4.08                            | 3.58                                |
| GQA        | 4.14                     | 3.77                            | 3.93                                |

### Measured inference speedup

This table reports the resulting runtime performance relative to the same target model without DSpark. Each cell is formatted as **decode / end-to-end**.

| Dataset    | 1×H100 (SGLang) | Apple M5 Max (MLX-VLM) | Apple M3 Ultra (llama.cpp) |
| ---------- | ---------------- | ---------------------- | -------------------------- |
| MMMU-Pro   | 2.43× / 1.97×    | 2.93× / 2.62×          | 2.03× / 1.74×              |
| Multi-turn | 2.04× / 1.83×    | 2.30× / 1.91×          | 1.57× / 1.37×              |
| COCO       | 2.66× / 2.27×    | 3.13× / 2.59×          | 2.14× / 1.77×              |
| CharXiv    | 2.39× / 1.97×    | 2.94× / 1.71×          | 1.87× / 1.56×              |
| TextVQA    | 2.14× / 1.64×    | 2.69× / 1.56×          | 1.64× / 1.33×              |
| GQA        | 2.35× / 1.77×    | 2.67× / 1.93×          | 1.77× / 1.30×              |

All measurements use 16-bit processing for both the vision encoder and language backbone. The H100 results use SGLang on one H100 80GB in BF16 at batch size 1, temperature 0, and block size 9. The Apple results use FP16 weights at batch size 1, temperature 0, block size 8, and up to 2,048 output tokens. Measurements were collected with [Pipette](https://pipette.liquid.ai/).

## 🏃 Inference

LFM2.5-VL-3B-DSpark is supported by SGLang for NVIDIA GPUs and MLX-VLM for Apple silicon. For llama.cpp, use the [GGUF checkpoint](https://huggingface.co/LiquidAI/LFM2.5-VL-3B-DSpark-GGUF).

### SGLang

Requires [SGLang v0.5.19 or newer](https://github.com/sgl-project/sglang/releases/tag/v0.5.19). Launch the target with the draft attached:

```bash
python -m sglang.launch_server \
  --model-path LiquidAI/LFM2.5-VL-3B \
  --speculative-algorithm DSPARK \
  --speculative-draft-model-path LiquidAI/LFM2.5-VL-3B-DSpark \
  --speculative-draft-attention-backend flashinfer \
  --speculative-dspark-block-size 9 \
  --disable-radix-cache --mem-fraction-static 0.8 --port 30000
```

Then query the OpenAI-compatible endpoint at `http://localhost:30000/v1`. The baseline is the same command without the `--speculative-*` flags.

### MLX-VLM

On Apple silicon, use [MLX-VLM](https://github.com/Blaizzy/mlx-vlm) v0.7.2 or newer. The drafter is detected automatically when passed with `--draft-model`:

```bash
python -m mlx_vlm.generate \
  --model LiquidAI/LFM2.5-VL-3B \
  --draft-model LiquidAI/LFM2.5-VL-3B-DSpark \
  --draft-block-size 8 \
  --image /path/to/image.jpg \
  --prompt "Describe this image." \
  --max-tokens 256 \
  --temperature 0
```

DSpark decoding in MLX-VLM currently uses greedy sampling, so set `--temperature 0`.

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
