// Generated from data/llm/v0.3.0/repository.json by scripts/generate-llm-dataset.py.
import type { LlmGuideRepository } from '../schema';

export const artifacts: LlmGuideRepository['artifacts'] = [];
artifacts.push({
  "id": "artifact:baai-bge-m3-official-checkpoint",
  "modelVersionId": "model:baai-bge-m3",
  "baseRevision": "5617a9f61b028005a4858fdac845db406aefb181",
  "publisher": "BAAI",
  "repositoryUrl": "https://huggingface.co/BAAI/bge-m3",
  "repositoryRevision": "5617a9f61b028005a4858fdac845db406aefb181",
  "format": "pytorch",
  "quantization": {
    "state": "not-applicable"
  },
  "weightPrecision": "fp32",
  "activationPrecision": {
    "state": "unknown",
    "note": "dtype ذخیره‌شده، دقت activation اجرای واقعی را تعیین نمی‌کند."
  },
  "size": {
    "state": "known",
    "value": 2.117129,
    "evidenceIds": [
      "evidence:baai-bge-m3-weight-files"
    ],
    "unit": "GiB",
    "note": "فقط فایل‌های وزن منتخب؛ اندازهٔ حافظهٔ اجرا نیست."
  },
  "authority": "official",
  "evidenceIds": [
    "evidence:baai-bge-m3-metadata",
    "evidence:baai-bge-m3-weight-files",
    "evidence:baai-bge-m3-config"
  ]
});
artifacts.push({
  "id": "artifact:baai-bge-reranker-v2-m3-official-checkpoint",
  "modelVersionId": "model:baai-bge-reranker-v2-m3",
  "baseRevision": "953dc6f6f85a1b2dbfca4c34a2796e7dde08d41e",
  "publisher": "BAAI",
  "repositoryUrl": "https://huggingface.co/BAAI/bge-reranker-v2-m3",
  "repositoryRevision": "953dc6f6f85a1b2dbfca4c34a2796e7dde08d41e",
  "format": "safetensors",
  "quantization": {
    "state": "not-applicable"
  },
  "weightPrecision": "fp32",
  "activationPrecision": {
    "state": "unknown",
    "note": "dtype ذخیره‌شده، دقت activation اجرای واقعی را تعیین نمی‌کند."
  },
  "size": {
    "state": "known",
    "value": 2.1151,
    "evidenceIds": [
      "evidence:baai-bge-reranker-v2-m3-weight-files"
    ],
    "unit": "GiB",
    "note": "فقط فایل‌های وزن منتخب؛ اندازهٔ حافظهٔ اجرا نیست."
  },
  "authority": "official",
  "evidenceIds": [
    "evidence:baai-bge-reranker-v2-m3-metadata",
    "evidence:baai-bge-reranker-v2-m3-weight-files",
    "evidence:baai-bge-reranker-v2-m3-config"
  ]
});
artifacts.push({
  "id": "artifact:coherelabs-aya-expanse-32b-official-checkpoint",
  "modelVersionId": "model:coherelabs-aya-expanse-32b",
  "baseRevision": "b306ea27e360683b50c005d7fcbad6a242317910",
  "publisher": "Cohere Labs",
  "repositoryUrl": "https://huggingface.co/CohereLabs/aya-expanse-32b",
  "repositoryRevision": "b306ea27e360683b50c005d7fcbad6a242317910",
  "format": "safetensors",
  "quantization": {
    "state": "not-applicable"
  },
  "weightPrecision": "fp16",
  "activationPrecision": {
    "state": "unknown",
    "note": "dtype ذخیره‌شده، دقت activation اجرای واقعی را تعیین نمی‌کند."
  },
  "size": {
    "state": "known",
    "value": 60.15691,
    "evidenceIds": [
      "evidence:coherelabs-aya-expanse-32b-weight-files"
    ],
    "unit": "GiB",
    "note": "فقط فایل‌های وزن منتخب؛ اندازهٔ حافظهٔ اجرا نیست."
  },
  "authority": "official",
  "evidenceIds": [
    "evidence:coherelabs-aya-expanse-32b-metadata",
    "evidence:coherelabs-aya-expanse-32b-weight-files"
  ]
});
artifacts.push({
  "id": "artifact:coherelabs-aya-expanse-8b-official-checkpoint",
  "modelVersionId": "model:coherelabs-aya-expanse-8b",
  "baseRevision": "5062468bf9bc0c6035fd64e06274333ec127d980",
  "publisher": "Cohere Labs",
  "repositoryUrl": "https://huggingface.co/CohereLabs/aya-expanse-8b",
  "repositoryRevision": "5062468bf9bc0c6035fd64e06274333ec127d980",
  "format": "safetensors",
  "quantization": {
    "state": "not-applicable"
  },
  "weightPrecision": "fp16",
  "activationPrecision": {
    "state": "unknown",
    "note": "dtype ذخیره‌شده، دقت activation اجرای واقعی را تعیین نمی‌کند."
  },
  "size": {
    "state": "known",
    "value": 14.953404,
    "evidenceIds": [
      "evidence:coherelabs-aya-expanse-8b-weight-files"
    ],
    "unit": "GiB",
    "note": "فقط فایل‌های وزن منتخب؛ اندازهٔ حافظهٔ اجرا نیست."
  },
  "authority": "official",
  "evidenceIds": [
    "evidence:coherelabs-aya-expanse-8b-metadata",
    "evidence:coherelabs-aya-expanse-8b-weight-files"
  ]
});
artifacts.push({
  "id": "artifact:coherelabs-tiny-aya-global-official-checkpoint",
  "modelVersionId": "model:coherelabs-tiny-aya-global",
  "baseRevision": "00590ff258ccd84a805f13efcd1c34c2a542654f",
  "publisher": "Cohere Labs",
  "repositoryUrl": "https://huggingface.co/CohereLabs/tiny-aya-global",
  "repositoryRevision": "00590ff258ccd84a805f13efcd1c34c2a542654f",
  "format": "safetensors",
  "quantization": {
    "state": "not-applicable"
  },
  "weightPrecision": "bf16",
  "activationPrecision": {
    "state": "unknown",
    "note": "dtype ذخیره‌شده، دقت activation اجرای واقعی را تعیین نمی‌کند."
  },
  "size": {
    "state": "known",
    "value": 6.238454,
    "evidenceIds": [
      "evidence:coherelabs-tiny-aya-global-weight-files"
    ],
    "unit": "GiB",
    "note": "فقط فایل‌های وزن منتخب؛ اندازهٔ حافظهٔ اجرا نیست."
  },
  "authority": "official",
  "evidenceIds": [
    "evidence:coherelabs-tiny-aya-global-metadata",
    "evidence:coherelabs-tiny-aya-global-weight-files"
  ]
});
artifacts.push({
  "id": "artifact:huggingfacetb-smollm2-1-7b-instruct-official-checkpoint",
  "modelVersionId": "model:huggingfacetb-smollm2-1-7b-instruct",
  "baseRevision": "31b70e2e869a7173562077fd711b654946d38674",
  "publisher": "Hugging Face",
  "repositoryUrl": "https://huggingface.co/HuggingFaceTB/SmolLM2-1.7B-Instruct",
  "repositoryRevision": "31b70e2e869a7173562077fd711b654946d38674",
  "format": "safetensors",
  "quantization": {
    "state": "not-applicable"
  },
  "weightPrecision": "bf16",
  "activationPrecision": {
    "state": "unknown",
    "note": "dtype ذخیره‌شده، دقت activation اجرای واقعی را تعیین نمی‌کند."
  },
  "size": {
    "state": "known",
    "value": 3.18771,
    "evidenceIds": [
      "evidence:huggingfacetb-smollm2-1-7b-instruct-weight-files"
    ],
    "unit": "GiB",
    "note": "فقط فایل‌های وزن منتخب؛ اندازهٔ حافظهٔ اجرا نیست."
  },
  "authority": "official",
  "evidenceIds": [
    "evidence:huggingfacetb-smollm2-1-7b-instruct-metadata",
    "evidence:huggingfacetb-smollm2-1-7b-instruct-weight-files",
    "evidence:huggingfacetb-smollm2-1-7b-instruct-config"
  ]
});
artifacts.push({
  "id": "artifact:huggingfacetb-smollm2-135m-instruct-official-checkpoint",
  "modelVersionId": "model:huggingfacetb-smollm2-135m-instruct",
  "baseRevision": "12fd25f77366fa6b3b4b768ec3050bf629380bac",
  "publisher": "Hugging Face",
  "repositoryUrl": "https://huggingface.co/HuggingFaceTB/SmolLM2-135M-Instruct",
  "repositoryRevision": "12fd25f77366fa6b3b4b768ec3050bf629380bac",
  "format": "safetensors",
  "quantization": {
    "state": "not-applicable"
  },
  "weightPrecision": "bf16",
  "activationPrecision": {
    "state": "unknown",
    "note": "dtype ذخیره‌شده، دقت activation اجرای واقعی را تعیین نمی‌کند."
  },
  "size": {
    "state": "known",
    "value": 0.250582,
    "evidenceIds": [
      "evidence:huggingfacetb-smollm2-135m-instruct-weight-files"
    ],
    "unit": "GiB",
    "note": "فقط فایل‌های وزن منتخب؛ اندازهٔ حافظهٔ اجرا نیست."
  },
  "authority": "official",
  "evidenceIds": [
    "evidence:huggingfacetb-smollm2-135m-instruct-metadata",
    "evidence:huggingfacetb-smollm2-135m-instruct-weight-files",
    "evidence:huggingfacetb-smollm2-135m-instruct-config"
  ]
});
artifacts.push({
  "id": "artifact:huggingfacetb-smollm2-360m-instruct-official-checkpoint",
  "modelVersionId": "model:huggingfacetb-smollm2-360m-instruct",
  "baseRevision": "a10cc1512eabd3dde888204e902eca88bddb4951",
  "publisher": "Hugging Face",
  "repositoryUrl": "https://huggingface.co/HuggingFaceTB/SmolLM2-360M-Instruct",
  "repositoryRevision": "a10cc1512eabd3dde888204e902eca88bddb4951",
  "format": "safetensors",
  "quantization": {
    "state": "not-applicable"
  },
  "weightPrecision": "bf16",
  "activationPrecision": {
    "state": "unknown",
    "note": "dtype ذخیره‌شده، دقت activation اجرای واقعی را تعیین نمی‌کند."
  },
  "size": {
    "state": "known",
    "value": 0.673975,
    "evidenceIds": [
      "evidence:huggingfacetb-smollm2-360m-instruct-weight-files"
    ],
    "unit": "GiB",
    "note": "فقط فایل‌های وزن منتخب؛ اندازهٔ حافظهٔ اجرا نیست."
  },
  "authority": "official",
  "evidenceIds": [
    "evidence:huggingfacetb-smollm2-360m-instruct-metadata",
    "evidence:huggingfacetb-smollm2-360m-instruct-weight-files",
    "evidence:huggingfacetb-smollm2-360m-instruct-config"
  ]
});
artifacts.push({
  "id": "artifact:huggingfacetb-smollm3-3b-official-checkpoint",
  "modelVersionId": "model:huggingfacetb-smollm3-3b",
  "baseRevision": "a07cc9a04f16550a088caea529712d1d335b0ac1",
  "publisher": "Hugging Face",
  "repositoryUrl": "https://huggingface.co/HuggingFaceTB/SmolLM3-3B",
  "repositoryRevision": "a07cc9a04f16550a088caea529712d1d335b0ac1",
  "format": "safetensors",
  "quantization": {
    "state": "not-applicable"
  },
  "weightPrecision": "bf16",
  "activationPrecision": {
    "state": "unknown",
    "note": "dtype ذخیره‌شده، دقت activation اجرای واقعی را تعیین نمی‌کند."
  },
  "size": {
    "state": "known",
    "value": 5.727853,
    "evidenceIds": [
      "evidence:huggingfacetb-smollm3-3b-weight-files"
    ],
    "unit": "GiB",
    "note": "فقط فایل‌های وزن منتخب؛ اندازهٔ حافظهٔ اجرا نیست."
  },
  "authority": "official",
  "evidenceIds": [
    "evidence:huggingfacetb-smollm3-3b-metadata",
    "evidence:huggingfacetb-smollm3-3b-weight-files",
    "evidence:huggingfacetb-smollm3-3b-config"
  ]
});
artifacts.push({
  "id": "artifact:qwen-qwen3-0-6b-official-checkpoint",
  "modelVersionId": "model:qwen-qwen3-0-6b",
  "baseRevision": "c1899de289a04d12100db370d81485cdf75e47ca",
  "publisher": "Qwen / Alibaba Cloud",
  "repositoryUrl": "https://huggingface.co/Qwen/Qwen3-0.6B",
  "repositoryRevision": "c1899de289a04d12100db370d81485cdf75e47ca",
  "format": "safetensors",
  "quantization": {
    "state": "not-applicable"
  },
  "weightPrecision": "bf16",
  "activationPrecision": {
    "state": "unknown",
    "note": "dtype ذخیره‌شده، دقت activation اجرای واقعی را تعیین نمی‌کند."
  },
  "size": {
    "state": "known",
    "value": 1.400058,
    "evidenceIds": [
      "evidence:qwen-qwen3-0-6b-weight-files"
    ],
    "unit": "GiB",
    "note": "فقط فایل‌های وزن منتخب؛ اندازهٔ حافظهٔ اجرا نیست."
  },
  "authority": "official",
  "evidenceIds": [
    "evidence:qwen-qwen3-0-6b-metadata",
    "evidence:qwen-qwen3-0-6b-weight-files",
    "evidence:qwen-qwen3-0-6b-config"
  ]
});
artifacts.push({
  "id": "artifact:qwen-qwen3-1-7b-official-checkpoint",
  "modelVersionId": "model:qwen-qwen3-1-7b",
  "baseRevision": "70d244cc86ccca08cf5af4e1e306ecf908b1ad5e",
  "publisher": "Qwen / Alibaba Cloud",
  "repositoryUrl": "https://huggingface.co/Qwen/Qwen3-1.7B",
  "repositoryRevision": "70d244cc86ccca08cf5af4e1e306ecf908b1ad5e",
  "format": "safetensors",
  "quantization": {
    "state": "not-applicable"
  },
  "weightPrecision": "bf16",
  "activationPrecision": {
    "state": "unknown",
    "note": "dtype ذخیره‌شده، دقت activation اجرای واقعی را تعیین نمی‌کند."
  },
  "size": {
    "state": "known",
    "value": 3.784444,
    "evidenceIds": [
      "evidence:qwen-qwen3-1-7b-weight-files"
    ],
    "unit": "GiB",
    "note": "فقط فایل‌های وزن منتخب؛ اندازهٔ حافظهٔ اجرا نیست."
  },
  "authority": "official",
  "evidenceIds": [
    "evidence:qwen-qwen3-1-7b-metadata",
    "evidence:qwen-qwen3-1-7b-weight-files",
    "evidence:qwen-qwen3-1-7b-config"
  ]
});
artifacts.push({
  "id": "artifact:qwen-qwen3-14b-official-checkpoint",
  "modelVersionId": "model:qwen-qwen3-14b",
  "baseRevision": "40c069824f4251a91eefaf281ebe4c544efd3e18",
  "publisher": "Qwen / Alibaba Cloud",
  "repositoryUrl": "https://huggingface.co/Qwen/Qwen3-14B",
  "repositoryRevision": "40c069824f4251a91eefaf281ebe4c544efd3e18",
  "format": "safetensors",
  "quantization": {
    "state": "not-applicable"
  },
  "weightPrecision": "bf16",
  "activationPrecision": {
    "state": "unknown",
    "note": "dtype ذخیره‌شده، دقت activation اجرای واقعی را تعیین نمی‌کند."
  },
  "size": {
    "state": "known",
    "value": 27.508163,
    "evidenceIds": [
      "evidence:qwen-qwen3-14b-weight-files"
    ],
    "unit": "GiB",
    "note": "فقط فایل‌های وزن منتخب؛ اندازهٔ حافظهٔ اجرا نیست."
  },
  "authority": "official",
  "evidenceIds": [
    "evidence:qwen-qwen3-14b-metadata",
    "evidence:qwen-qwen3-14b-weight-files",
    "evidence:qwen-qwen3-14b-config"
  ]
});
artifacts.push({
  "id": "artifact:qwen-qwen3-30b-a3b-official-checkpoint",
  "modelVersionId": "model:qwen-qwen3-30b-a3b",
  "baseRevision": "ad44e777bcd18fa416d9da3bd8f70d33ebb85d39",
  "publisher": "Qwen / Alibaba Cloud",
  "repositoryUrl": "https://huggingface.co/Qwen/Qwen3-30B-A3B",
  "repositoryRevision": "ad44e777bcd18fa416d9da3bd8f70d33ebb85d39",
  "format": "safetensors",
  "quantization": {
    "state": "not-applicable"
  },
  "weightPrecision": "bf16",
  "activationPrecision": {
    "state": "unknown",
    "note": "dtype ذخیره‌شده، دقت activation اجرای واقعی را تعیین نمی‌کند."
  },
  "size": {
    "state": "known",
    "value": 56.87268,
    "evidenceIds": [
      "evidence:qwen-qwen3-30b-a3b-weight-files"
    ],
    "unit": "GiB",
    "note": "فقط فایل‌های وزن منتخب؛ اندازهٔ حافظهٔ اجرا نیست."
  },
  "authority": "official",
  "evidenceIds": [
    "evidence:qwen-qwen3-30b-a3b-metadata",
    "evidence:qwen-qwen3-30b-a3b-weight-files",
    "evidence:qwen-qwen3-30b-a3b-config"
  ]
});
artifacts.push({
  "id": "artifact:qwen-qwen3-32b-official-checkpoint",
  "modelVersionId": "model:qwen-qwen3-32b",
  "baseRevision": "9216db5781bf21249d130ec9da846c4624c16137",
  "publisher": "Qwen / Alibaba Cloud",
  "repositoryUrl": "https://huggingface.co/Qwen/Qwen3-32B",
  "repositoryRevision": "9216db5781bf21249d130ec9da846c4624c16137",
  "format": "safetensors",
  "quantization": {
    "state": "not-applicable"
  },
  "weightPrecision": "bf16",
  "activationPrecision": {
    "state": "unknown",
    "note": "dtype ذخیره‌شده، دقت activation اجرای واقعی را تعیین نمی‌کند."
  },
  "size": {
    "state": "known",
    "value": 61.024286,
    "evidenceIds": [
      "evidence:qwen-qwen3-32b-weight-files"
    ],
    "unit": "GiB",
    "note": "فقط فایل‌های وزن منتخب؛ اندازهٔ حافظهٔ اجرا نیست."
  },
  "authority": "official",
  "evidenceIds": [
    "evidence:qwen-qwen3-32b-metadata",
    "evidence:qwen-qwen3-32b-weight-files",
    "evidence:qwen-qwen3-32b-config"
  ]
});
artifacts.push({
  "id": "artifact:qwen-qwen3-4b-official-checkpoint",
  "modelVersionId": "model:qwen-qwen3-4b",
  "baseRevision": "1cfa9a7208912126459214e8b04321603b3df60c",
  "publisher": "Qwen / Alibaba Cloud",
  "repositoryUrl": "https://huggingface.co/Qwen/Qwen3-4B",
  "repositoryRevision": "1cfa9a7208912126459214e8b04321603b3df60c",
  "format": "safetensors",
  "quantization": {
    "state": "not-applicable"
  },
  "weightPrecision": "bf16",
  "activationPrecision": {
    "state": "unknown",
    "note": "dtype ذخیره‌شده، دقت activation اجرای واقعی را تعیین نمی‌کند."
  },
  "size": {
    "state": "known",
    "value": 7.492473,
    "evidenceIds": [
      "evidence:qwen-qwen3-4b-weight-files"
    ],
    "unit": "GiB",
    "note": "فقط فایل‌های وزن منتخب؛ اندازهٔ حافظهٔ اجرا نیست."
  },
  "authority": "official",
  "evidenceIds": [
    "evidence:qwen-qwen3-4b-metadata",
    "evidence:qwen-qwen3-4b-weight-files",
    "evidence:qwen-qwen3-4b-config"
  ]
});
artifacts.push({
  "id": "artifact:qwen-qwen3-8b-official-checkpoint",
  "modelVersionId": "model:qwen-qwen3-8b",
  "baseRevision": "b968826d9c46dd6066d109eabc6255188de91218",
  "publisher": "Qwen / Alibaba Cloud",
  "repositoryUrl": "https://huggingface.co/Qwen/Qwen3-8B",
  "repositoryRevision": "b968826d9c46dd6066d109eabc6255188de91218",
  "format": "safetensors",
  "quantization": {
    "state": "not-applicable"
  },
  "weightPrecision": "bf16",
  "activationPrecision": {
    "state": "unknown",
    "note": "dtype ذخیره‌شده، دقت activation اجرای واقعی را تعیین نمی‌کند."
  },
  "size": {
    "state": "known",
    "value": 15.256476,
    "evidenceIds": [
      "evidence:qwen-qwen3-8b-weight-files"
    ],
    "unit": "GiB",
    "note": "فقط فایل‌های وزن منتخب؛ اندازهٔ حافظهٔ اجرا نیست."
  },
  "authority": "official",
  "evidenceIds": [
    "evidence:qwen-qwen3-8b-metadata",
    "evidence:qwen-qwen3-8b-weight-files",
    "evidence:qwen-qwen3-8b-config"
  ]
});
artifacts.push({
  "id": "artifact:qwen-qwen3-coder-30b-a3b-instruct-official-checkpoint",
  "modelVersionId": "model:qwen-qwen3-coder-30b-a3b-instruct",
  "baseRevision": "b2cff646eb4bb1d68355c01b18ae02e7cf42d120",
  "publisher": "Qwen / Alibaba Cloud",
  "repositoryUrl": "https://huggingface.co/Qwen/Qwen3-Coder-30B-A3B-Instruct",
  "repositoryRevision": "b2cff646eb4bb1d68355c01b18ae02e7cf42d120",
  "format": "safetensors",
  "quantization": {
    "state": "not-applicable"
  },
  "weightPrecision": "bf16",
  "activationPrecision": {
    "state": "unknown",
    "note": "dtype ذخیره‌شده، دقت activation اجرای واقعی را تعیین نمی‌کند."
  },
  "size": {
    "state": "known",
    "value": 56.87268,
    "evidenceIds": [
      "evidence:qwen-qwen3-coder-30b-a3b-instruct-weight-files"
    ],
    "unit": "GiB",
    "note": "فقط فایل‌های وزن منتخب؛ اندازهٔ حافظهٔ اجرا نیست."
  },
  "authority": "official",
  "evidenceIds": [
    "evidence:qwen-qwen3-coder-30b-a3b-instruct-metadata",
    "evidence:qwen-qwen3-coder-30b-a3b-instruct-weight-files",
    "evidence:qwen-qwen3-coder-30b-a3b-instruct-config"
  ]
});
artifacts.push({
  "id": "artifact:qwen-qwen3-embedding-0-6b-official-checkpoint",
  "modelVersionId": "model:qwen-qwen3-embedding-0-6b",
  "baseRevision": "97b0c614be4d77ee51c0cef4e5f07c00f9eb65b3",
  "publisher": "Qwen / Alibaba Cloud",
  "repositoryUrl": "https://huggingface.co/Qwen/Qwen3-Embedding-0.6B",
  "repositoryRevision": "97b0c614be4d77ee51c0cef4e5f07c00f9eb65b3",
  "format": "safetensors",
  "quantization": {
    "state": "not-applicable"
  },
  "weightPrecision": "bf16",
  "activationPrecision": {
    "state": "unknown",
    "note": "dtype ذخیره‌شده، دقت activation اجرای واقعی را تعیین نمی‌کند."
  },
  "size": {
    "state": "known",
    "value": 1.109751,
    "evidenceIds": [
      "evidence:qwen-qwen3-embedding-0-6b-weight-files"
    ],
    "unit": "GiB",
    "note": "فقط فایل‌های وزن منتخب؛ اندازهٔ حافظهٔ اجرا نیست."
  },
  "authority": "official",
  "evidenceIds": [
    "evidence:qwen-qwen3-embedding-0-6b-metadata",
    "evidence:qwen-qwen3-embedding-0-6b-weight-files",
    "evidence:qwen-qwen3-embedding-0-6b-config"
  ]
});
artifacts.push({
  "id": "artifact:qwen-qwen3-embedding-4b-official-checkpoint",
  "modelVersionId": "model:qwen-qwen3-embedding-4b",
  "baseRevision": "5cf2132abc99cad020ac570b19d031efec650f2b",
  "publisher": "Qwen / Alibaba Cloud",
  "repositoryUrl": "https://huggingface.co/Qwen/Qwen3-Embedding-4B",
  "repositoryRevision": "5cf2132abc99cad020ac570b19d031efec650f2b",
  "format": "safetensors",
  "quantization": {
    "state": "not-applicable"
  },
  "weightPrecision": "bf16",
  "activationPrecision": {
    "state": "unknown",
    "note": "dtype ذخیره‌شده، دقت activation اجرای واقعی را تعیین نمی‌کند."
  },
  "size": {
    "state": "known",
    "value": 7.491179,
    "evidenceIds": [
      "evidence:qwen-qwen3-embedding-4b-weight-files"
    ],
    "unit": "GiB",
    "note": "فقط فایل‌های وزن منتخب؛ اندازهٔ حافظهٔ اجرا نیست."
  },
  "authority": "official",
  "evidenceIds": [
    "evidence:qwen-qwen3-embedding-4b-metadata",
    "evidence:qwen-qwen3-embedding-4b-weight-files",
    "evidence:qwen-qwen3-embedding-4b-config"
  ]
});
artifacts.push({
  "id": "artifact:qwen-qwen3-embedding-8b-official-checkpoint",
  "modelVersionId": "model:qwen-qwen3-embedding-8b",
  "baseRevision": "1d8ad4ca9b3dd8059ad90a75d4983776a23d44af",
  "publisher": "Qwen / Alibaba Cloud",
  "repositoryUrl": "https://huggingface.co/Qwen/Qwen3-Embedding-8B",
  "repositoryRevision": "1d8ad4ca9b3dd8059ad90a75d4983776a23d44af",
  "format": "safetensors",
  "quantization": {
    "state": "not-applicable"
  },
  "weightPrecision": "bf16",
  "activationPrecision": {
    "state": "unknown",
    "note": "dtype ذخیره‌شده، دقت activation اجرای واقعی را تعیین نمی‌کند."
  },
  "size": {
    "state": "known",
    "value": 14.095227,
    "evidenceIds": [
      "evidence:qwen-qwen3-embedding-8b-weight-files"
    ],
    "unit": "GiB",
    "note": "فقط فایل‌های وزن منتخب؛ اندازهٔ حافظهٔ اجرا نیست."
  },
  "authority": "official",
  "evidenceIds": [
    "evidence:qwen-qwen3-embedding-8b-metadata",
    "evidence:qwen-qwen3-embedding-8b-weight-files",
    "evidence:qwen-qwen3-embedding-8b-config"
  ]
});
artifacts.push({
  "id": "artifact:qwen-qwen3-reranker-0-6b-official-checkpoint",
  "modelVersionId": "model:qwen-qwen3-reranker-0-6b",
  "baseRevision": "e61197ed45024b0ed8a2d74b80b4d909f1255473",
  "publisher": "Qwen / Alibaba Cloud",
  "repositoryUrl": "https://huggingface.co/Qwen/Qwen3-Reranker-0.6B",
  "repositoryRevision": "e61197ed45024b0ed8a2d74b80b4d909f1255473",
  "format": "safetensors",
  "quantization": {
    "state": "not-applicable"
  },
  "weightPrecision": "bf16",
  "activationPrecision": {
    "state": "unknown",
    "note": "dtype ذخیره‌شده، دقت activation اجرای واقعی را تعیین نمی‌کند."
  },
  "size": {
    "state": "known",
    "value": 1.109753,
    "evidenceIds": [
      "evidence:qwen-qwen3-reranker-0-6b-weight-files"
    ],
    "unit": "GiB",
    "note": "فقط فایل‌های وزن منتخب؛ اندازهٔ حافظهٔ اجرا نیست."
  },
  "authority": "official",
  "evidenceIds": [
    "evidence:qwen-qwen3-reranker-0-6b-metadata",
    "evidence:qwen-qwen3-reranker-0-6b-weight-files",
    "evidence:qwen-qwen3-reranker-0-6b-config"
  ]
});
artifacts.push({
  "id": "artifact:qwen-qwen3-reranker-4b-official-checkpoint",
  "modelVersionId": "model:qwen-qwen3-reranker-4b",
  "baseRevision": "22e683669bc0f0bd69640a1354a6d0aebcfeede5",
  "publisher": "Qwen / Alibaba Cloud",
  "repositoryUrl": "https://huggingface.co/Qwen/Qwen3-Reranker-4B",
  "repositoryRevision": "22e683669bc0f0bd69640a1354a6d0aebcfeede5",
  "format": "safetensors",
  "quantization": {
    "state": "not-applicable"
  },
  "weightPrecision": "bf16",
  "activationPrecision": {
    "state": "unknown",
    "note": "dtype ذخیره‌شده، دقت activation اجرای واقعی را تعیین نمی‌کند."
  },
  "size": {
    "state": "known",
    "value": 7.4912,
    "evidenceIds": [
      "evidence:qwen-qwen3-reranker-4b-weight-files"
    ],
    "unit": "GiB",
    "note": "فقط فایل‌های وزن منتخب؛ اندازهٔ حافظهٔ اجرا نیست."
  },
  "authority": "official",
  "evidenceIds": [
    "evidence:qwen-qwen3-reranker-4b-metadata",
    "evidence:qwen-qwen3-reranker-4b-weight-files",
    "evidence:qwen-qwen3-reranker-4b-config"
  ]
});
artifacts.push({
  "id": "artifact:qwen-qwen3-reranker-8b-official-checkpoint",
  "modelVersionId": "model:qwen-qwen3-reranker-8b",
  "baseRevision": "77d193c791ed757ca307ee72715aa132723da912",
  "publisher": "Qwen / Alibaba Cloud",
  "repositoryUrl": "https://huggingface.co/Qwen/Qwen3-Reranker-8B",
  "repositoryRevision": "77d193c791ed757ca307ee72715aa132723da912",
  "format": "safetensors",
  "quantization": {
    "state": "not-applicable"
  },
  "weightPrecision": "bf16",
  "activationPrecision": {
    "state": "unknown",
    "note": "dtype ذخیره‌شده، دقت activation اجرای واقعی را تعیین نمی‌کند."
  },
  "size": {
    "state": "known",
    "value": 15.252402,
    "evidenceIds": [
      "evidence:qwen-qwen3-reranker-8b-weight-files"
    ],
    "unit": "GiB",
    "note": "فقط فایل‌های وزن منتخب؛ اندازهٔ حافظهٔ اجرا نیست."
  },
  "authority": "official",
  "evidenceIds": [
    "evidence:qwen-qwen3-reranker-8b-metadata",
    "evidence:qwen-qwen3-reranker-8b-weight-files",
    "evidence:qwen-qwen3-reranker-8b-config"
  ]
});
artifacts.push({
  "id": "artifact:qwen-qwen3-vl-8b-instruct-official-checkpoint",
  "modelVersionId": "model:qwen-qwen3-vl-8b-instruct",
  "baseRevision": "0c351dd01ed87e9c1b53cbc748cba10e6187ff3b",
  "publisher": "Qwen / Alibaba Cloud",
  "repositoryUrl": "https://huggingface.co/Qwen/Qwen3-VL-8B-Instruct",
  "repositoryRevision": "0c351dd01ed87e9c1b53cbc748cba10e6187ff3b",
  "format": "safetensors",
  "quantization": {
    "state": "not-applicable"
  },
  "weightPrecision": "bf16",
  "activationPrecision": {
    "state": "unknown",
    "note": "dtype ذخیره‌شده، دقت activation اجرای واقعی را تعیین نمی‌کند."
  },
  "size": {
    "state": "known",
    "value": 16.330126,
    "evidenceIds": [
      "evidence:qwen-qwen3-vl-8b-instruct-weight-files"
    ],
    "unit": "GiB",
    "note": "فقط فایل‌های وزن منتخب؛ اندازهٔ حافظهٔ اجرا نیست."
  },
  "authority": "official",
  "evidenceIds": [
    "evidence:qwen-qwen3-vl-8b-instruct-metadata",
    "evidence:qwen-qwen3-vl-8b-instruct-weight-files",
    "evidence:qwen-qwen3-vl-8b-instruct-config"
  ]
});
artifacts.push({
  "id": "artifact:qwen-qwen3-5-2b-official-checkpoint",
  "modelVersionId": "model:qwen-qwen3-5-2b",
  "baseRevision": "15852e8c16360a2fea060d615a32b45270f8a8fc",
  "publisher": "Qwen / Alibaba Cloud",
  "repositoryUrl": "https://huggingface.co/Qwen/Qwen3.5-2B",
  "repositoryRevision": "15852e8c16360a2fea060d615a32b45270f8a8fc",
  "format": "safetensors",
  "quantization": {
    "state": "not-applicable"
  },
  "weightPrecision": "mixed",
  "activationPrecision": {
    "state": "unknown",
    "note": "dtype ذخیره‌شده، دقت activation اجرای واقعی را تعیین نمی‌کند."
  },
  "size": {
    "state": "known",
    "value": 4.235861,
    "evidenceIds": [
      "evidence:qwen-qwen3-5-2b-weight-files"
    ],
    "unit": "GiB",
    "note": "فقط فایل‌های وزن منتخب؛ اندازهٔ حافظهٔ اجرا نیست."
  },
  "authority": "official",
  "evidenceIds": [
    "evidence:qwen-qwen3-5-2b-metadata",
    "evidence:qwen-qwen3-5-2b-weight-files",
    "evidence:qwen-qwen3-5-2b-config"
  ]
});
artifacts.push({
  "id": "artifact:qwen-qwen3-5-35b-a3b-official-checkpoint",
  "modelVersionId": "model:qwen-qwen3-5-35b-a3b",
  "baseRevision": "59d61f3ce65a6d9863b86d2e96597125219dc754",
  "publisher": "Qwen / Alibaba Cloud",
  "repositoryUrl": "https://huggingface.co/Qwen/Qwen3.5-35B-A3B",
  "repositoryRevision": "59d61f3ce65a6d9863b86d2e96597125219dc754",
  "format": "safetensors",
  "quantization": {
    "state": "not-applicable"
  },
  "weightPrecision": "mixed",
  "activationPrecision": {
    "state": "unknown",
    "note": "dtype ذخیره‌شده، دقت activation اجرای واقعی را تعیین نمی‌کند."
  },
  "size": {
    "state": "known",
    "value": 66.965705,
    "evidenceIds": [
      "evidence:qwen-qwen3-5-35b-a3b-weight-files"
    ],
    "unit": "GiB",
    "note": "فقط فایل‌های وزن منتخب؛ اندازهٔ حافظهٔ اجرا نیست."
  },
  "authority": "official",
  "evidenceIds": [
    "evidence:qwen-qwen3-5-35b-a3b-metadata",
    "evidence:qwen-qwen3-5-35b-a3b-weight-files",
    "evidence:qwen-qwen3-5-35b-a3b-config"
  ]
});
artifacts.push({
  "id": "artifact:qwen-qwen3-5-4b-official-checkpoint",
  "modelVersionId": "model:qwen-qwen3-5-4b",
  "baseRevision": "851bf6e806efd8d0a36b00ddf55e13ccb7b8cd0a",
  "publisher": "Qwen / Alibaba Cloud",
  "repositoryUrl": "https://huggingface.co/Qwen/Qwen3.5-4B",
  "repositoryRevision": "851bf6e806efd8d0a36b00ddf55e13ccb7b8cd0a",
  "format": "safetensors",
  "quantization": {
    "state": "not-applicable"
  },
  "weightPrecision": "mixed",
  "activationPrecision": {
    "state": "unknown",
    "note": "dtype ذخیره‌شده، دقت activation اجرای واقعی را تعیین نمی‌کند."
  },
  "size": {
    "state": "known",
    "value": 8.679766,
    "evidenceIds": [
      "evidence:qwen-qwen3-5-4b-weight-files"
    ],
    "unit": "GiB",
    "note": "فقط فایل‌های وزن منتخب؛ اندازهٔ حافظهٔ اجرا نیست."
  },
  "authority": "official",
  "evidenceIds": [
    "evidence:qwen-qwen3-5-4b-metadata",
    "evidence:qwen-qwen3-5-4b-weight-files",
    "evidence:qwen-qwen3-5-4b-config"
  ]
});
artifacts.push({
  "id": "artifact:qwen-qwen3-5-9b-official-checkpoint",
  "modelVersionId": "model:qwen-qwen3-5-9b",
  "baseRevision": "c202236235762e1c871ad0ccb60c8ee5ba337b9a",
  "publisher": "Qwen / Alibaba Cloud",
  "repositoryUrl": "https://huggingface.co/Qwen/Qwen3.5-9B",
  "repositoryRevision": "c202236235762e1c871ad0ccb60c8ee5ba337b9a",
  "format": "safetensors",
  "quantization": {
    "state": "not-applicable"
  },
  "weightPrecision": "mixed",
  "activationPrecision": {
    "state": "unknown",
    "note": "dtype ذخیره‌شده، دقت activation اجرای واقعی را تعیین نمی‌کند."
  },
  "size": {
    "state": "known",
    "value": 17.980403,
    "evidenceIds": [
      "evidence:qwen-qwen3-5-9b-weight-files"
    ],
    "unit": "GiB",
    "note": "فقط فایل‌های وزن منتخب؛ اندازهٔ حافظهٔ اجرا نیست."
  },
  "authority": "official",
  "evidenceIds": [
    "evidence:qwen-qwen3-5-9b-metadata",
    "evidence:qwen-qwen3-5-9b-weight-files",
    "evidence:qwen-qwen3-5-9b-config"
  ]
});
artifacts.push({
  "id": "artifact:qwen-qwen3-8-27b-official-checkpoint",
  "modelVersionId": "model:qwen-qwen3-8-27b",
  "baseRevision": "1d4bf0f2ff6012fd82039f2fa52739d0dd7c60c0",
  "publisher": "Qwen / Alibaba Cloud",
  "repositoryUrl": "https://huggingface.co/Qwen/Qwen3.8-27B",
  "repositoryRevision": "1d4bf0f2ff6012fd82039f2fa52739d0dd7c60c0",
  "format": "safetensors",
  "quantization": {
    "state": "not-applicable"
  },
  "weightPrecision": "bf16",
  "activationPrecision": {
    "state": "unknown",
    "note": "dtype ذخیره‌شده، دقت activation اجرای واقعی را تعیین نمی‌کند."
  },
  "size": {
    "state": "known",
    "value": 51.747083,
    "evidenceIds": [
      "evidence:qwen-qwen3-8-27b-weight-files"
    ],
    "unit": "GiB",
    "note": "فقط فایل‌های وزن منتخب؛ اندازهٔ حافظهٔ اجرا نیست."
  },
  "authority": "official",
  "evidenceIds": [
    "evidence:qwen-qwen3-8-27b-metadata",
    "evidence:qwen-qwen3-8-27b-weight-files",
    "evidence:qwen-qwen3-8-27b-config"
  ]
});
artifacts.push({
  "id": "artifact:allenai-olmo-3-7b-instruct-official-checkpoint",
  "modelVersionId": "model:allenai-olmo-3-7b-instruct",
  "baseRevision": "6e5971d9eba42665f5bd5a0fcf047f299ce1dccc",
  "publisher": "Allen Institute for AI",
  "repositoryUrl": "https://huggingface.co/allenai/Olmo-3-7B-Instruct",
  "repositoryRevision": "6e5971d9eba42665f5bd5a0fcf047f299ce1dccc",
  "format": "safetensors",
  "quantization": {
    "state": "not-applicable"
  },
  "weightPrecision": "bf16",
  "activationPrecision": {
    "state": "unknown",
    "note": "dtype ذخیره‌شده، دقت activation اجرای واقعی را تعیین نمی‌کند."
  },
  "size": {
    "state": "known",
    "value": 13.593644,
    "evidenceIds": [
      "evidence:allenai-olmo-3-7b-instruct-weight-files"
    ],
    "unit": "GiB",
    "note": "فقط فایل‌های وزن منتخب؛ اندازهٔ حافظهٔ اجرا نیست."
  },
  "authority": "official",
  "evidenceIds": [
    "evidence:allenai-olmo-3-7b-instruct-metadata",
    "evidence:allenai-olmo-3-7b-instruct-weight-files",
    "evidence:allenai-olmo-3-7b-instruct-config"
  ]
});
artifacts.push({
  "id": "artifact:deepseek-ai-deepseek-r1-0528-qwen3-8b-official-checkpoint",
  "modelVersionId": "model:deepseek-ai-deepseek-r1-0528-qwen3-8b",
  "baseRevision": "6e8885a6ff5c1dc5201574c8fd700323f23c25fa",
  "publisher": "DeepSeek",
  "repositoryUrl": "https://huggingface.co/deepseek-ai/DeepSeek-R1-0528-Qwen3-8B",
  "repositoryRevision": "6e8885a6ff5c1dc5201574c8fd700323f23c25fa",
  "format": "safetensors",
  "quantization": {
    "state": "not-applicable"
  },
  "weightPrecision": "bf16",
  "activationPrecision": {
    "state": "unknown",
    "note": "dtype ذخیره‌شده، دقت activation اجرای واقعی را تعیین نمی‌کند."
  },
  "size": {
    "state": "known",
    "value": 15.256476,
    "evidenceIds": [
      "evidence:deepseek-ai-deepseek-r1-0528-qwen3-8b-weight-files"
    ],
    "unit": "GiB",
    "note": "فقط فایل‌های وزن منتخب؛ اندازهٔ حافظهٔ اجرا نیست."
  },
  "authority": "official",
  "evidenceIds": [
    "evidence:deepseek-ai-deepseek-r1-0528-qwen3-8b-metadata",
    "evidence:deepseek-ai-deepseek-r1-0528-qwen3-8b-weight-files",
    "evidence:deepseek-ai-deepseek-r1-0528-qwen3-8b-config"
  ]
});
artifacts.push({
  "id": "artifact:deepseek-ai-deepseek-r1-distill-llama-70b-official-checkpoint",
  "modelVersionId": "model:deepseek-ai-deepseek-r1-distill-llama-70b",
  "baseRevision": "b1c0b44b4369b597ad119a196caf79a9c40e141e",
  "publisher": "DeepSeek",
  "repositoryUrl": "https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Llama-70B",
  "repositoryRevision": "b1c0b44b4369b597ad119a196caf79a9c40e141e",
  "format": "safetensors",
  "quantization": {
    "state": "not-applicable"
  },
  "weightPrecision": "bf16",
  "activationPrecision": {
    "state": "unknown",
    "note": "dtype ذخیره‌شده، دقت activation اجرای واقعی را تعیین نمی‌کند."
  },
  "size": {
    "state": "known",
    "value": 131.416598,
    "evidenceIds": [
      "evidence:deepseek-ai-deepseek-r1-distill-llama-70b-weight-files"
    ],
    "unit": "GiB",
    "note": "فقط فایل‌های وزن منتخب؛ اندازهٔ حافظهٔ اجرا نیست."
  },
  "authority": "official",
  "evidenceIds": [
    "evidence:deepseek-ai-deepseek-r1-distill-llama-70b-metadata",
    "evidence:deepseek-ai-deepseek-r1-distill-llama-70b-weight-files",
    "evidence:deepseek-ai-deepseek-r1-distill-llama-70b-config"
  ]
});
artifacts.push({
  "id": "artifact:deepseek-ai-deepseek-r1-distill-qwen-1-5b-official-checkpoint",
  "modelVersionId": "model:deepseek-ai-deepseek-r1-distill-qwen-1-5b",
  "baseRevision": "ad9f0ae0864d7fbcd1cd905e3c6c5b069cc8b562",
  "publisher": "DeepSeek",
  "repositoryUrl": "https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Qwen-1.5B",
  "repositoryRevision": "ad9f0ae0864d7fbcd1cd905e3c6c5b069cc8b562",
  "format": "safetensors",
  "quantization": {
    "state": "not-applicable"
  },
  "weightPrecision": "bf16",
  "activationPrecision": {
    "state": "unknown",
    "note": "dtype ذخیره‌شده، دقت activation اجرای واقعی را تعیین نمی‌کند."
  },
  "size": {
    "state": "known",
    "value": 3.31012,
    "evidenceIds": [
      "evidence:deepseek-ai-deepseek-r1-distill-qwen-1-5b-weight-files"
    ],
    "unit": "GiB",
    "note": "فقط فایل‌های وزن منتخب؛ اندازهٔ حافظهٔ اجرا نیست."
  },
  "authority": "official",
  "evidenceIds": [
    "evidence:deepseek-ai-deepseek-r1-distill-qwen-1-5b-metadata",
    "evidence:deepseek-ai-deepseek-r1-distill-qwen-1-5b-weight-files",
    "evidence:deepseek-ai-deepseek-r1-distill-qwen-1-5b-config"
  ]
});
artifacts.push({
  "id": "artifact:deepseek-ai-deepseek-r1-distill-qwen-14b-official-checkpoint",
  "modelVersionId": "model:deepseek-ai-deepseek-r1-distill-qwen-14b",
  "baseRevision": "1df8507178afcc1bef68cd8c393f61a886323761",
  "publisher": "DeepSeek",
  "repositoryUrl": "https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Qwen-14B",
  "repositoryRevision": "1df8507178afcc1bef68cd8c393f61a886323761",
  "format": "safetensors",
  "quantization": {
    "state": "not-applicable"
  },
  "weightPrecision": "bf16",
  "activationPrecision": {
    "state": "unknown",
    "note": "dtype ذخیره‌شده، دقت activation اجرای واقعی را تعیین نمی‌کند."
  },
  "size": {
    "state": "known",
    "value": 27.511394,
    "evidenceIds": [
      "evidence:deepseek-ai-deepseek-r1-distill-qwen-14b-weight-files"
    ],
    "unit": "GiB",
    "note": "فقط فایل‌های وزن منتخب؛ اندازهٔ حافظهٔ اجرا نیست."
  },
  "authority": "official",
  "evidenceIds": [
    "evidence:deepseek-ai-deepseek-r1-distill-qwen-14b-metadata",
    "evidence:deepseek-ai-deepseek-r1-distill-qwen-14b-weight-files",
    "evidence:deepseek-ai-deepseek-r1-distill-qwen-14b-config"
  ]
});
artifacts.push({
  "id": "artifact:deepseek-ai-deepseek-r1-distill-qwen-32b-official-checkpoint",
  "modelVersionId": "model:deepseek-ai-deepseek-r1-distill-qwen-32b",
  "baseRevision": "711ad2ea6aa40cfca18895e8aca02ab92df1a746",
  "publisher": "DeepSeek",
  "repositoryUrl": "https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Qwen-32B",
  "repositoryRevision": "711ad2ea6aa40cfca18895e8aca02ab92df1a746",
  "format": "safetensors",
  "quantization": {
    "state": "not-applicable"
  },
  "weightPrecision": "bf16",
  "activationPrecision": {
    "state": "unknown",
    "note": "dtype ذخیره‌شده، دقت activation اجرای واقعی را تعیین نمی‌کند."
  },
  "size": {
    "state": "known",
    "value": 61.027558,
    "evidenceIds": [
      "evidence:deepseek-ai-deepseek-r1-distill-qwen-32b-weight-files"
    ],
    "unit": "GiB",
    "note": "فقط فایل‌های وزن منتخب؛ اندازهٔ حافظهٔ اجرا نیست."
  },
  "authority": "official",
  "evidenceIds": [
    "evidence:deepseek-ai-deepseek-r1-distill-qwen-32b-metadata",
    "evidence:deepseek-ai-deepseek-r1-distill-qwen-32b-weight-files",
    "evidence:deepseek-ai-deepseek-r1-distill-qwen-32b-config"
  ]
});
artifacts.push({
  "id": "artifact:deepseek-ai-deepseek-r1-distill-qwen-7b-official-checkpoint",
  "modelVersionId": "model:deepseek-ai-deepseek-r1-distill-qwen-7b",
  "baseRevision": "916b56a44061fd5cd7d6a8fb632557ed4f724f60",
  "publisher": "DeepSeek",
  "repositoryUrl": "https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Qwen-7B",
  "repositoryRevision": "916b56a44061fd5cd7d6a8fb632557ed4f724f60",
  "format": "safetensors",
  "quantization": {
    "state": "not-applicable"
  },
  "weightPrecision": "bf16",
  "activationPrecision": {
    "state": "unknown",
    "note": "dtype ذخیره‌شده، دقت activation اجرای واقعی را تعیین نمی‌کند."
  },
  "size": {
    "state": "known",
    "value": 14.185227,
    "evidenceIds": [
      "evidence:deepseek-ai-deepseek-r1-distill-qwen-7b-weight-files"
    ],
    "unit": "GiB",
    "note": "فقط فایل‌های وزن منتخب؛ اندازهٔ حافظهٔ اجرا نیست."
  },
  "authority": "official",
  "evidenceIds": [
    "evidence:deepseek-ai-deepseek-r1-distill-qwen-7b-metadata",
    "evidence:deepseek-ai-deepseek-r1-distill-qwen-7b-weight-files",
    "evidence:deepseek-ai-deepseek-r1-distill-qwen-7b-config"
  ]
});
artifacts.push({
  "id": "artifact:deepseek-ai-deepseek-v3-2-official-checkpoint",
  "modelVersionId": "model:deepseek-ai-deepseek-v3-2",
  "baseRevision": "a7e62ac04ecb2c0a54d736dc46601c5606cf10a6",
  "publisher": "DeepSeek",
  "repositoryUrl": "https://huggingface.co/deepseek-ai/DeepSeek-V3.2",
  "repositoryRevision": "a7e62ac04ecb2c0a54d736dc46601c5606cf10a6",
  "format": "safetensors",
  "quantization": {
    "state": "known",
    "value": {
      "method": "fp8 (mixed checkpoint; see config)",
      "weightPrecision": "mixed",
      "activationPrecision": {
        "state": "unknown",
        "note": "الگوی اجرای runtime باید جداگانه بررسی شود."
      },
      "evidenceIds": [
        "evidence:deepseek-ai-deepseek-v3-2-config"
      ]
    },
    "evidenceIds": [
      "evidence:deepseek-ai-deepseek-v3-2-config"
    ]
  },
  "weightPrecision": "mixed",
  "activationPrecision": {
    "state": "unknown",
    "note": "dtype ذخیره‌شده، دقت activation اجرای واقعی را تعیین نمی‌کند."
  },
  "size": {
    "state": "known",
    "value": 642.131128,
    "evidenceIds": [
      "evidence:deepseek-ai-deepseek-v3-2-weight-files"
    ],
    "unit": "GiB",
    "note": "فقط فایل‌های وزن منتخب؛ اندازهٔ حافظهٔ اجرا نیست."
  },
  "authority": "official",
  "evidenceIds": [
    "evidence:deepseek-ai-deepseek-v3-2-metadata",
    "evidence:deepseek-ai-deepseek-v3-2-weight-files",
    "evidence:deepseek-ai-deepseek-v3-2-config"
  ]
});
artifacts.push({
  "id": "artifact:deepseek-ai-deepseek-v4-1-flash-official-checkpoint",
  "modelVersionId": "model:deepseek-ai-deepseek-v4-1-flash",
  "baseRevision": "dba1be0a40aa45a94ad051997016db3960a90277",
  "publisher": "DeepSeek",
  "repositoryUrl": "https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash",
  "repositoryRevision": "dba1be0a40aa45a94ad051997016db3960a90277",
  "format": "safetensors",
  "quantization": {
    "state": "known",
    "value": {
      "method": "fp8 (mixed checkpoint; see config)",
      "weightPrecision": "mixed",
      "activationPrecision": {
        "state": "unknown",
        "note": "الگوی اجرای runtime باید جداگانه بررسی شود."
      },
      "evidenceIds": [
        "evidence:deepseek-ai-deepseek-v4-1-flash-config"
      ]
    },
    "evidenceIds": [
      "evidence:deepseek-ai-deepseek-v4-1-flash-config"
    ]
  },
  "weightPrecision": "mixed",
  "activationPrecision": {
    "state": "unknown",
    "note": "dtype ذخیره‌شده، دقت activation اجرای واقعی را تعیین نمی‌کند."
  },
  "size": {
    "state": "known",
    "value": 475.250844,
    "evidenceIds": [
      "evidence:deepseek-ai-deepseek-v4-1-flash-weight-files"
    ],
    "unit": "GiB",
    "note": "فقط فایل‌های وزن منتخب؛ اندازهٔ حافظهٔ اجرا نیست."
  },
  "authority": "official",
  "evidenceIds": [
    "evidence:deepseek-ai-deepseek-v4-1-flash-metadata",
    "evidence:deepseek-ai-deepseek-v4-1-flash-weight-files",
    "evidence:deepseek-ai-deepseek-v4-1-flash-config"
  ]
});
artifacts.push({
  "id": "artifact:google-gemma-3-12b-it-official-checkpoint",
  "modelVersionId": "model:google-gemma-3-12b-it",
  "baseRevision": "96b6f1eccf38110c56df3a15bffe176da04bfd80",
  "publisher": "Google DeepMind",
  "repositoryUrl": "https://huggingface.co/google/gemma-3-12b-it",
  "repositoryRevision": "96b6f1eccf38110c56df3a15bffe176da04bfd80",
  "format": "safetensors",
  "quantization": {
    "state": "not-applicable"
  },
  "weightPrecision": "bf16",
  "activationPrecision": {
    "state": "unknown",
    "note": "dtype ذخیره‌شده، دقت activation اجرای واقعی را تعیین نمی‌کند."
  },
  "size": {
    "state": "known",
    "value": 22.700795,
    "evidenceIds": [
      "evidence:google-gemma-3-12b-it-weight-files"
    ],
    "unit": "GiB",
    "note": "فقط فایل‌های وزن منتخب؛ اندازهٔ حافظهٔ اجرا نیست."
  },
  "authority": "official",
  "evidenceIds": [
    "evidence:google-gemma-3-12b-it-metadata",
    "evidence:google-gemma-3-12b-it-weight-files"
  ]
});
artifacts.push({
  "id": "artifact:google-gemma-3-1b-it-official-checkpoint",
  "modelVersionId": "model:google-gemma-3-1b-it",
  "baseRevision": "dcc83ea841ab6100d6b47a070329e1ba4cf78752",
  "publisher": "Google DeepMind",
  "repositoryUrl": "https://huggingface.co/google/gemma-3-1b-it",
  "repositoryRevision": "dcc83ea841ab6100d6b47a070329e1ba4cf78752",
  "format": "safetensors",
  "quantization": {
    "state": "not-applicable"
  },
  "weightPrecision": "bf16",
  "activationPrecision": {
    "state": "unknown",
    "note": "dtype ذخیره‌شده، دقت activation اجرای واقعی را تعیین نمی‌کند."
  },
  "size": {
    "state": "known",
    "value": 1.862469,
    "evidenceIds": [
      "evidence:google-gemma-3-1b-it-weight-files"
    ],
    "unit": "GiB",
    "note": "فقط فایل‌های وزن منتخب؛ اندازهٔ حافظهٔ اجرا نیست."
  },
  "authority": "official",
  "evidenceIds": [
    "evidence:google-gemma-3-1b-it-metadata",
    "evidence:google-gemma-3-1b-it-weight-files"
  ]
});
artifacts.push({
  "id": "artifact:google-gemma-3-27b-it-official-checkpoint",
  "modelVersionId": "model:google-gemma-3-27b-it",
  "baseRevision": "005ad3404e59d6023443cb575daa05336842228a",
  "publisher": "Google DeepMind",
  "repositoryUrl": "https://huggingface.co/google/gemma-3-27b-it",
  "repositoryRevision": "005ad3404e59d6023443cb575daa05336842228a",
  "format": "safetensors",
  "quantization": {
    "state": "not-applicable"
  },
  "weightPrecision": "bf16",
  "activationPrecision": {
    "state": "unknown",
    "note": "dtype ذخیره‌شده، دقت activation اجرای واقعی را تعیین نمی‌کند."
  },
  "size": {
    "state": "known",
    "value": 51.096995,
    "evidenceIds": [
      "evidence:google-gemma-3-27b-it-weight-files"
    ],
    "unit": "GiB",
    "note": "فقط فایل‌های وزن منتخب؛ اندازهٔ حافظهٔ اجرا نیست."
  },
  "authority": "official",
  "evidenceIds": [
    "evidence:google-gemma-3-27b-it-metadata",
    "evidence:google-gemma-3-27b-it-weight-files"
  ]
});
artifacts.push({
  "id": "artifact:google-gemma-3-4b-it-official-checkpoint",
  "modelVersionId": "model:google-gemma-3-4b-it",
  "baseRevision": "093f9f388b31de276ce2de164bdc2081324b9767",
  "publisher": "Google DeepMind",
  "repositoryUrl": "https://huggingface.co/google/gemma-3-4b-it",
  "repositoryRevision": "093f9f388b31de276ce2de164bdc2081324b9767",
  "format": "safetensors",
  "quantization": {
    "state": "not-applicable"
  },
  "weightPrecision": "bf16",
  "activationPrecision": {
    "state": "unknown",
    "note": "dtype ذخیره‌شده، دقت activation اجرای واقعی را تعیین نمی‌کند."
  },
  "size": {
    "state": "known",
    "value": 8.009633,
    "evidenceIds": [
      "evidence:google-gemma-3-4b-it-weight-files"
    ],
    "unit": "GiB",
    "note": "فقط فایل‌های وزن منتخب؛ اندازهٔ حافظهٔ اجرا نیست."
  },
  "authority": "official",
  "evidenceIds": [
    "evidence:google-gemma-3-4b-it-metadata",
    "evidence:google-gemma-3-4b-it-weight-files"
  ]
});
artifacts.push({
  "id": "artifact:google-gemma-4-26b-a4b-it-official-checkpoint",
  "modelVersionId": "model:google-gemma-4-26b-a4b-it",
  "baseRevision": "4d7ae4984b7db7de8f8457170b3f1a419ee76d52",
  "publisher": "Google DeepMind",
  "repositoryUrl": "https://huggingface.co/google/gemma-4-26B-A4B-it",
  "repositoryRevision": "4d7ae4984b7db7de8f8457170b3f1a419ee76d52",
  "format": "safetensors",
  "quantization": {
    "state": "not-applicable"
  },
  "weightPrecision": "bf16",
  "activationPrecision": {
    "state": "unknown",
    "note": "dtype ذخیره‌شده، دقت activation اجرای واقعی را تعیین نمی‌کند."
  },
  "size": {
    "state": "known",
    "value": 48.06743,
    "evidenceIds": [
      "evidence:google-gemma-4-26b-a4b-it-weight-files"
    ],
    "unit": "GiB",
    "note": "فقط فایل‌های وزن منتخب؛ اندازهٔ حافظهٔ اجرا نیست."
  },
  "authority": "official",
  "evidenceIds": [
    "evidence:google-gemma-4-26b-a4b-it-metadata",
    "evidence:google-gemma-4-26b-a4b-it-weight-files",
    "evidence:google-gemma-4-26b-a4b-it-config"
  ]
});
artifacts.push({
  "id": "artifact:google-gemma-4-e2b-it-official-checkpoint",
  "modelVersionId": "model:google-gemma-4-e2b-it",
  "baseRevision": "3e22461f65e89153144f8adb70e3b8c2cc9845a7",
  "publisher": "Google DeepMind",
  "repositoryUrl": "https://huggingface.co/google/gemma-4-E2B-it",
  "repositoryRevision": "3e22461f65e89153144f8adb70e3b8c2cc9845a7",
  "format": "safetensors",
  "quantization": {
    "state": "not-applicable"
  },
  "weightPrecision": "bf16",
  "activationPrecision": {
    "state": "unknown",
    "note": "dtype ذخیره‌شده، دقت activation اجرای واقعی را تعیین نمی‌کند."
  },
  "size": {
    "state": "known",
    "value": 9.54291,
    "evidenceIds": [
      "evidence:google-gemma-4-e2b-it-weight-files"
    ],
    "unit": "GiB",
    "note": "فقط فایل‌های وزن منتخب؛ اندازهٔ حافظهٔ اجرا نیست."
  },
  "authority": "official",
  "evidenceIds": [
    "evidence:google-gemma-4-e2b-it-metadata",
    "evidence:google-gemma-4-e2b-it-weight-files",
    "evidence:google-gemma-4-e2b-it-config"
  ]
});
artifacts.push({
  "id": "artifact:ibm-granite-granite-3-3-2b-instruct-official-checkpoint",
  "modelVersionId": "model:ibm-granite-granite-3-3-2b-instruct",
  "baseRevision": "707f574c62054322f6b5b04b6d075f0a8f05e0f0",
  "publisher": "IBM",
  "repositoryUrl": "https://huggingface.co/ibm-granite/granite-3.3-2b-instruct",
  "repositoryRevision": "707f574c62054322f6b5b04b6d075f0a8f05e0f0",
  "format": "safetensors",
  "quantization": {
    "state": "not-applicable"
  },
  "weightPrecision": "bf16",
  "activationPrecision": {
    "state": "unknown",
    "note": "dtype ذخیره‌شده، دقت activation اجرای واقعی را تعیین نمی‌کند."
  },
  "size": {
    "state": "known",
    "value": 4.719125,
    "evidenceIds": [
      "evidence:ibm-granite-granite-3-3-2b-instruct-weight-files"
    ],
    "unit": "GiB",
    "note": "فقط فایل‌های وزن منتخب؛ اندازهٔ حافظهٔ اجرا نیست."
  },
  "authority": "official",
  "evidenceIds": [
    "evidence:ibm-granite-granite-3-3-2b-instruct-metadata",
    "evidence:ibm-granite-granite-3-3-2b-instruct-weight-files",
    "evidence:ibm-granite-granite-3-3-2b-instruct-config"
  ]
});
artifacts.push({
  "id": "artifact:intfloat-multilingual-e5-small-official-checkpoint",
  "modelVersionId": "model:intfloat-multilingual-e5-small",
  "baseRevision": "614241f622f53c4eeff9890bdc4f31cfecc418b3",
  "publisher": "intfloat / multilingual E5 authors",
  "repositoryUrl": "https://huggingface.co/intfloat/multilingual-e5-small",
  "repositoryRevision": "614241f622f53c4eeff9890bdc4f31cfecc418b3",
  "format": "safetensors",
  "quantization": {
    "state": "not-applicable"
  },
  "weightPrecision": "fp32",
  "activationPrecision": {
    "state": "unknown",
    "note": "dtype ذخیره‌شده، دقت activation اجرای واقعی را تعیین نمی‌کند."
  },
  "size": {
    "state": "known",
    "value": 0.438319,
    "evidenceIds": [
      "evidence:intfloat-multilingual-e5-small-weight-files"
    ],
    "unit": "GiB",
    "note": "فقط فایل‌های وزن منتخب؛ اندازهٔ حافظهٔ اجرا نیست."
  },
  "authority": "official",
  "evidenceIds": [
    "evidence:intfloat-multilingual-e5-small-metadata",
    "evidence:intfloat-multilingual-e5-small-weight-files",
    "evidence:intfloat-multilingual-e5-small-config"
  ]
});
artifacts.push({
  "id": "artifact:meta-llama-llama-3-1-70b-instruct-official-checkpoint",
  "modelVersionId": "model:meta-llama-llama-3-1-70b-instruct",
  "baseRevision": "1605565b47bb9346c5515c34102e054115b4f98b",
  "publisher": "Meta",
  "repositoryUrl": "https://huggingface.co/meta-llama/Llama-3.1-70B-Instruct",
  "repositoryRevision": "1605565b47bb9346c5515c34102e054115b4f98b",
  "format": "safetensors",
  "quantization": {
    "state": "not-applicable"
  },
  "weightPrecision": "bf16",
  "activationPrecision": {
    "state": "unknown",
    "note": "dtype ذخیره‌شده، دقت activation اجرای واقعی را تعیین نمی‌کند."
  },
  "size": {
    "state": "known",
    "value": 131.416598,
    "evidenceIds": [
      "evidence:meta-llama-llama-3-1-70b-instruct-weight-files"
    ],
    "unit": "GiB",
    "note": "فقط فایل‌های وزن منتخب؛ اندازهٔ حافظهٔ اجرا نیست."
  },
  "authority": "official",
  "evidenceIds": [
    "evidence:meta-llama-llama-3-1-70b-instruct-metadata",
    "evidence:meta-llama-llama-3-1-70b-instruct-weight-files"
  ]
});
artifacts.push({
  "id": "artifact:meta-llama-llama-3-1-8b-instruct-official-checkpoint",
  "modelVersionId": "model:meta-llama-llama-3-1-8b-instruct",
  "baseRevision": "0e9e39f249a16976918f6564b8830bc894c89659",
  "publisher": "Meta",
  "repositoryUrl": "https://huggingface.co/meta-llama/Llama-3.1-8B-Instruct",
  "repositoryRevision": "0e9e39f249a16976918f6564b8830bc894c89659",
  "format": "safetensors",
  "quantization": {
    "state": "not-applicable"
  },
  "weightPrecision": "bf16",
  "activationPrecision": {
    "state": "unknown",
    "note": "dtype ذخیره‌شده، دقت activation اجرای واقعی را تعیین نمی‌کند."
  },
  "size": {
    "state": "known",
    "value": 14.957559,
    "evidenceIds": [
      "evidence:meta-llama-llama-3-1-8b-instruct-weight-files"
    ],
    "unit": "GiB",
    "note": "فقط فایل‌های وزن منتخب؛ اندازهٔ حافظهٔ اجرا نیست."
  },
  "authority": "official",
  "evidenceIds": [
    "evidence:meta-llama-llama-3-1-8b-instruct-metadata",
    "evidence:meta-llama-llama-3-1-8b-instruct-weight-files"
  ]
});
artifacts.push({
  "id": "artifact:meta-llama-llama-3-2-1b-instruct-official-checkpoint",
  "modelVersionId": "model:meta-llama-llama-3-2-1b-instruct",
  "baseRevision": "9213176726f574b556790deb65791e0c5aa438b6",
  "publisher": "Meta",
  "repositoryUrl": "https://huggingface.co/meta-llama/Llama-3.2-1B-Instruct",
  "repositoryRevision": "9213176726f574b556790deb65791e0c5aa438b6",
  "format": "safetensors",
  "quantization": {
    "state": "not-applicable"
  },
  "weightPrecision": "bf16",
  "activationPrecision": {
    "state": "unknown",
    "note": "dtype ذخیره‌شده، دقت activation اجرای واقعی را تعیین نمی‌کند."
  },
  "size": {
    "state": "known",
    "value": 2.301899,
    "evidenceIds": [
      "evidence:meta-llama-llama-3-2-1b-instruct-weight-files"
    ],
    "unit": "GiB",
    "note": "فقط فایل‌های وزن منتخب؛ اندازهٔ حافظهٔ اجرا نیست."
  },
  "authority": "official",
  "evidenceIds": [
    "evidence:meta-llama-llama-3-2-1b-instruct-metadata",
    "evidence:meta-llama-llama-3-2-1b-instruct-weight-files"
  ]
});
artifacts.push({
  "id": "artifact:meta-llama-llama-3-2-3b-instruct-official-checkpoint",
  "modelVersionId": "model:meta-llama-llama-3-2-3b-instruct",
  "baseRevision": "0cb88a4f764b7a12671c53f0838cd831a0843b95",
  "publisher": "Meta",
  "repositoryUrl": "https://huggingface.co/meta-llama/Llama-3.2-3B-Instruct",
  "repositoryRevision": "0cb88a4f764b7a12671c53f0838cd831a0843b95",
  "format": "safetensors",
  "quantization": {
    "state": "not-applicable"
  },
  "weightPrecision": "bf16",
  "activationPrecision": {
    "state": "unknown",
    "note": "dtype ذخیره‌شده، دقت activation اجرای واقعی را تعیین نمی‌کند."
  },
  "size": {
    "state": "known",
    "value": 5.98424,
    "evidenceIds": [
      "evidence:meta-llama-llama-3-2-3b-instruct-weight-files"
    ],
    "unit": "GiB",
    "note": "فقط فایل‌های وزن منتخب؛ اندازهٔ حافظهٔ اجرا نیست."
  },
  "authority": "official",
  "evidenceIds": [
    "evidence:meta-llama-llama-3-2-3b-instruct-metadata",
    "evidence:meta-llama-llama-3-2-3b-instruct-weight-files"
  ]
});
artifacts.push({
  "id": "artifact:microsoft-phi-4-mini-instruct-official-checkpoint",
  "modelVersionId": "model:microsoft-phi-4-mini-instruct",
  "baseRevision": "cfbefacb99257ffa30c83adab238a50856ac3083",
  "publisher": "Microsoft",
  "repositoryUrl": "https://huggingface.co/microsoft/Phi-4-mini-instruct",
  "repositoryRevision": "cfbefacb99257ffa30c83adab238a50856ac3083",
  "format": "safetensors",
  "quantization": {
    "state": "not-applicable"
  },
  "weightPrecision": "bf16",
  "activationPrecision": {
    "state": "unknown",
    "note": "dtype ذخیره‌شده، دقت activation اجرای واقعی را تعیین نمی‌کند."
  },
  "size": {
    "state": "known",
    "value": 7.145168,
    "evidenceIds": [
      "evidence:microsoft-phi-4-mini-instruct-weight-files"
    ],
    "unit": "GiB",
    "note": "فقط فایل‌های وزن منتخب؛ اندازهٔ حافظهٔ اجرا نیست."
  },
  "authority": "official",
  "evidenceIds": [
    "evidence:microsoft-phi-4-mini-instruct-metadata",
    "evidence:microsoft-phi-4-mini-instruct-weight-files",
    "evidence:microsoft-phi-4-mini-instruct-config"
  ]
});
artifacts.push({
  "id": "artifact:mistralai-devstral-small-2-24b-instruct-2512-official-checkpoint",
  "modelVersionId": "model:mistralai-devstral-small-2-24b-instruct-2512",
  "baseRevision": "55c5b41e98c2dbd21b0c8afffc540dcfc9eb5128",
  "publisher": "Mistral AI",
  "repositoryUrl": "https://huggingface.co/mistralai/Devstral-Small-2-24B-Instruct-2512",
  "repositoryRevision": "55c5b41e98c2dbd21b0c8afffc540dcfc9eb5128",
  "format": "safetensors",
  "quantization": {
    "state": "known",
    "value": {
      "method": "fp8 (mixed checkpoint; see config)",
      "weightPrecision": "mixed",
      "activationPrecision": {
        "state": "unknown",
        "note": "الگوی اجرای runtime باید جداگانه بررسی شود."
      },
      "evidenceIds": [
        "evidence:mistralai-devstral-small-2-24b-instruct-2512-config"
      ]
    },
    "evidenceIds": [
      "evidence:mistralai-devstral-small-2-24b-instruct-2512-config"
    ]
  },
  "weightPrecision": "mixed",
  "activationPrecision": {
    "state": "unknown",
    "note": "dtype ذخیره‌شده، دقت activation اجرای واقعی را تعیین نمی‌کند."
  },
  "size": {
    "state": "known",
    "value": 24.021658,
    "evidenceIds": [
      "evidence:mistralai-devstral-small-2-24b-instruct-2512-weight-files"
    ],
    "unit": "GiB",
    "note": "فقط فایل‌های وزن منتخب؛ اندازهٔ حافظهٔ اجرا نیست."
  },
  "authority": "official",
  "evidenceIds": [
    "evidence:mistralai-devstral-small-2-24b-instruct-2512-metadata",
    "evidence:mistralai-devstral-small-2-24b-instruct-2512-weight-files",
    "evidence:mistralai-devstral-small-2-24b-instruct-2512-config"
  ]
});
artifacts.push({
  "id": "artifact:mistralai-ministral-3-3b-instruct-2512-official-checkpoint",
  "modelVersionId": "model:mistralai-ministral-3-3b-instruct-2512",
  "baseRevision": "b35d4dfe56c142746f54dbd64f579faab2744308",
  "publisher": "Mistral AI",
  "repositoryUrl": "https://huggingface.co/mistralai/Ministral-3-3B-Instruct-2512",
  "repositoryRevision": "b35d4dfe56c142746f54dbd64f579faab2744308",
  "format": "safetensors",
  "quantization": {
    "state": "known",
    "value": {
      "method": "fp8 (mixed checkpoint; see config)",
      "weightPrecision": "mixed",
      "activationPrecision": {
        "state": "unknown",
        "note": "الگوی اجرای runtime باید جداگانه بررسی شود."
      },
      "evidenceIds": [
        "evidence:mistralai-ministral-3-3b-instruct-2512-config"
      ]
    },
    "evidenceIds": [
      "evidence:mistralai-ministral-3-3b-instruct-2512-config"
    ]
  },
  "weightPrecision": "mixed",
  "activationPrecision": {
    "state": "unknown",
    "note": "dtype ذخیره‌شده، دقت activation اجرای واقعی را تعیین نمی‌کند."
  },
  "size": {
    "state": "known",
    "value": 4.351231,
    "evidenceIds": [
      "evidence:mistralai-ministral-3-3b-instruct-2512-weight-files"
    ],
    "unit": "GiB",
    "note": "فقط فایل‌های وزن منتخب؛ اندازهٔ حافظهٔ اجرا نیست."
  },
  "authority": "official",
  "evidenceIds": [
    "evidence:mistralai-ministral-3-3b-instruct-2512-metadata",
    "evidence:mistralai-ministral-3-3b-instruct-2512-weight-files",
    "evidence:mistralai-ministral-3-3b-instruct-2512-config"
  ]
});
artifacts.push({
  "id": "artifact:mistralai-mistral-7b-instruct-v0-3-official-checkpoint",
  "modelVersionId": "model:mistralai-mistral-7b-instruct-v0-3",
  "baseRevision": "c170c708c41dac9275d15a8fff4eca08d52bab71",
  "publisher": "Mistral AI",
  "repositoryUrl": "https://huggingface.co/mistralai/Mistral-7B-Instruct-v0.3",
  "repositoryRevision": "c170c708c41dac9275d15a8fff4eca08d52bab71",
  "format": "safetensors",
  "quantization": {
    "state": "not-applicable"
  },
  "weightPrecision": "bf16",
  "activationPrecision": {
    "state": "unknown",
    "note": "dtype ذخیره‌شده، دقت activation اجرای واقعی را تعیین نمی‌کند."
  },
  "size": {
    "state": "known",
    "value": 13.500527,
    "evidenceIds": [
      "evidence:mistralai-mistral-7b-instruct-v0-3-weight-files"
    ],
    "unit": "GiB",
    "note": "فقط فایل‌های وزن منتخب؛ اندازهٔ حافظهٔ اجرا نیست."
  },
  "authority": "official",
  "evidenceIds": [
    "evidence:mistralai-mistral-7b-instruct-v0-3-metadata",
    "evidence:mistralai-mistral-7b-instruct-v0-3-weight-files",
    "evidence:mistralai-mistral-7b-instruct-v0-3-config"
  ]
});
artifacts.push({
  "id": "artifact:mistralai-mistral-small-3-1-24b-instruct-2503-official-checkpoint",
  "modelVersionId": "model:mistralai-mistral-small-3-1-24b-instruct-2503",
  "baseRevision": "68faf511d618ef198fef186659617cfd2eb8e33a",
  "publisher": "Mistral AI",
  "repositoryUrl": "https://huggingface.co/mistralai/Mistral-Small-3.1-24B-Instruct-2503",
  "repositoryRevision": "68faf511d618ef198fef186659617cfd2eb8e33a",
  "format": "safetensors",
  "quantization": {
    "state": "not-applicable"
  },
  "weightPrecision": "bf16",
  "activationPrecision": {
    "state": "unknown",
    "note": "dtype ذخیره‌شده، دقت activation اجرای واقعی را تعیین نمی‌کند."
  },
  "size": {
    "state": "known",
    "value": 44.724718,
    "evidenceIds": [
      "evidence:mistralai-mistral-small-3-1-24b-instruct-2503-weight-files"
    ],
    "unit": "GiB",
    "note": "فقط فایل‌های وزن منتخب؛ اندازهٔ حافظهٔ اجرا نیست."
  },
  "authority": "official",
  "evidenceIds": [
    "evidence:mistralai-mistral-small-3-1-24b-instruct-2503-metadata",
    "evidence:mistralai-mistral-small-3-1-24b-instruct-2503-weight-files",
    "evidence:mistralai-mistral-small-3-1-24b-instruct-2503-config"
  ]
});
artifacts.push({
  "id": "artifact:nvidia-nvidia-nemotron-nano-9b-v2-official-checkpoint",
  "modelVersionId": "model:nvidia-nvidia-nemotron-nano-9b-v2",
  "baseRevision": "6533e8de2c68e4536bf7c411d7a3ce5734111476",
  "publisher": "NVIDIA",
  "repositoryUrl": "https://huggingface.co/nvidia/NVIDIA-Nemotron-Nano-9B-v2",
  "repositoryRevision": "6533e8de2c68e4536bf7c411d7a3ce5734111476",
  "format": "safetensors",
  "quantization": {
    "state": "not-applicable"
  },
  "weightPrecision": "bf16",
  "activationPrecision": {
    "state": "unknown",
    "note": "dtype ذخیره‌شده، دقت activation اجرای واقعی را تعیین نمی‌کند."
  },
  "size": {
    "state": "known",
    "value": 16.555649,
    "evidenceIds": [
      "evidence:nvidia-nvidia-nemotron-nano-9b-v2-weight-files"
    ],
    "unit": "GiB",
    "note": "فقط فایل‌های وزن منتخب؛ اندازهٔ حافظهٔ اجرا نیست."
  },
  "authority": "official",
  "evidenceIds": [
    "evidence:nvidia-nvidia-nemotron-nano-9b-v2-metadata",
    "evidence:nvidia-nvidia-nemotron-nano-9b-v2-weight-files",
    "evidence:nvidia-nvidia-nemotron-nano-9b-v2-config"
  ]
});
artifacts.push({
  "id": "artifact:openai-gpt-oss-120b-official-checkpoint",
  "modelVersionId": "model:openai-gpt-oss-120b",
  "baseRevision": "b5c939de8f754692c1647ca79fbf85e8c1e70f8a",
  "publisher": "OpenAI",
  "repositoryUrl": "https://huggingface.co/openai/gpt-oss-120b",
  "repositoryRevision": "b5c939de8f754692c1647ca79fbf85e8c1e70f8a",
  "format": "safetensors",
  "quantization": {
    "state": "known",
    "value": {
      "method": "mxfp4 (mixed checkpoint; see config)",
      "weightPrecision": "mixed",
      "activationPrecision": {
        "state": "unknown",
        "note": "الگوی اجرای runtime باید جداگانه بررسی شود."
      },
      "evidenceIds": [
        "evidence:openai-gpt-oss-120b-config"
      ]
    },
    "evidenceIds": [
      "evidence:openai-gpt-oss-120b-config"
    ]
  },
  "weightPrecision": "mixed",
  "activationPrecision": {
    "state": "unknown",
    "note": "dtype ذخیره‌شده، دقت activation اجرای واقعی را تعیین نمی‌کند."
  },
  "size": {
    "state": "known",
    "value": 60.767767,
    "evidenceIds": [
      "evidence:openai-gpt-oss-120b-weight-files"
    ],
    "unit": "GiB",
    "note": "فقط فایل‌های وزن منتخب؛ اندازهٔ حافظهٔ اجرا نیست."
  },
  "authority": "official",
  "evidenceIds": [
    "evidence:openai-gpt-oss-120b-metadata",
    "evidence:openai-gpt-oss-120b-weight-files",
    "evidence:openai-gpt-oss-120b-config"
  ]
});
artifacts.push({
  "id": "artifact:openai-gpt-oss-20b-official-checkpoint",
  "modelVersionId": "model:openai-gpt-oss-20b",
  "baseRevision": "6cee5e81ee83917806bbde320786a8fb61efebee",
  "publisher": "OpenAI",
  "repositoryUrl": "https://huggingface.co/openai/gpt-oss-20b",
  "repositoryRevision": "6cee5e81ee83917806bbde320786a8fb61efebee",
  "format": "safetensors",
  "quantization": {
    "state": "known",
    "value": {
      "method": "mxfp4 (mixed checkpoint; see config)",
      "weightPrecision": "mixed",
      "activationPrecision": {
        "state": "unknown",
        "note": "الگوی اجرای runtime باید جداگانه بررسی شود."
      },
      "evidenceIds": [
        "evidence:openai-gpt-oss-20b-config"
      ]
    },
    "evidenceIds": [
      "evidence:openai-gpt-oss-20b-config"
    ]
  },
  "weightPrecision": "mixed",
  "activationPrecision": {
    "state": "unknown",
    "note": "dtype ذخیره‌شده، دقت activation اجرای واقعی را تعیین نمی‌کند."
  },
  "size": {
    "state": "known",
    "value": 12.816225,
    "evidenceIds": [
      "evidence:openai-gpt-oss-20b-weight-files"
    ],
    "unit": "GiB",
    "note": "فقط فایل‌های وزن منتخب؛ اندازهٔ حافظهٔ اجرا نیست."
  },
  "authority": "official",
  "evidenceIds": [
    "evidence:openai-gpt-oss-20b-metadata",
    "evidence:openai-gpt-oss-20b-weight-files",
    "evidence:openai-gpt-oss-20b-config"
  ]
});
artifacts.push({
  "id": "artifact:zai-org-glm-4-7-flash-official-checkpoint",
  "modelVersionId": "model:zai-org-glm-4-7-flash",
  "baseRevision": "7dd20894a642a0aa287e9827cb1a1f7f91386b67",
  "publisher": "Z.ai",
  "repositoryUrl": "https://huggingface.co/zai-org/GLM-4.7-Flash",
  "repositoryRevision": "7dd20894a642a0aa287e9827cb1a1f7f91386b67",
  "format": "safetensors",
  "quantization": {
    "state": "not-applicable"
  },
  "weightPrecision": "mixed",
  "activationPrecision": {
    "state": "unknown",
    "note": "dtype ذخیره‌شده، دقت activation اجرای واقعی را تعیین نمی‌کند."
  },
  "size": {
    "state": "known",
    "value": 58.15567,
    "evidenceIds": [
      "evidence:zai-org-glm-4-7-flash-weight-files"
    ],
    "unit": "GiB",
    "note": "فقط فایل‌های وزن منتخب؛ اندازهٔ حافظهٔ اجرا نیست."
  },
  "authority": "official",
  "evidenceIds": [
    "evidence:zai-org-glm-4-7-flash-metadata",
    "evidence:zai-org-glm-4-7-flash-weight-files",
    "evidence:zai-org-glm-4-7-flash-config"
  ]
});
