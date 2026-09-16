// Generated from data/llm/v0.3.0/repository.json by scripts/generate-llm-dataset.py.
import type { LlmGuideRepository } from '../schema';

export const softwareReleases: LlmGuideRepository['softwareReleases'] = [];
softwareReleases.push({
  "id": "software-release:ollama-v0-34-0",
  "productId": "software-product:ollama",
  "version": "v0.34.0",
  "releasedOn": "2026-09-05",
  "lastReviewedOn": "2026-09-15",
  "roles": [
    "inference-engine-library",
    "api-server",
    "model-manager"
  ],
  "environments": [
    "desktop",
    "workstation",
    "server"
  ],
  "operatingSystems": [
    "Linux",
    "macOS",
    "Windows"
  ],
  "hardwareKinds": [
    "CPU",
    "GPU"
  ],
  "localOrCloud": [
    "local",
    "cloud"
  ],
  "offlineOperation": {
    "state": "known",
    "value": true,
    "evidenceIds": [
      "evidence:v03-b5ce2f9cd14541cc7d"
    ],
    "note": "وزن‌ها و وابستگی‌ها از پیش محلی باشند؛ مسیرهای ابری، دریافت مدل و ابزارهای شبکه‌ای نیاز به اتصال دارند."
  },
  "license": {
    "name": {
      "state": "known",
      "value": "MIT",
      "evidenceIds": [
        "evidence:software-ollama-license"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://github.com/ollama/ollama/blob/v0.34.0/LICENSE",
      "evidenceIds": [
        "evidence:software-ollama-license"
      ]
    },
    "commercialUse": {
      "state": "known",
      "value": "allowed",
      "evidenceIds": [
        "evidence:software-ollama-license"
      ]
    },
    "restrictions": [],
    "evidenceIds": [
      "evidence:software-ollama-license"
    ]
  },
  "maintenanceStatus": "active",
  "evidenceIds": [
    "evidence:software-ollama-release",
    "evidence:software-ollama-overview",
    "evidence:software-ollama-license",
    "evidence:v03-caea475103b5d65313",
    "evidence:v03-b6b9e3c01f164f962d",
    "evidence:v03-a29655d5a6c4508a30",
    "evidence:v03-87a9107234a6210cfe",
    "evidence:v03-e8ee1d44dc907013d4",
    "evidence:v03-ebe487d69f0dc2388f",
    "evidence:v03-b5ce2f9cd14541cc7d"
  ],
  "targetScenario": {
    "state": "known",
    "value": "دریافت، مدیریت و اجرای محلی مدل‌ها با API",
    "evidenceIds": [
      "evidence:software-ollama-overview"
    ]
  },
  "backendSummary": {
    "state": "known",
    "value": "runtime داخلی Ollama؛ انتخاب مدل‌های سازگار",
    "evidenceIds": [
      "evidence:software-ollama-overview"
    ]
  },
  "selectionCaveat": "فراخوانی ابزار و خروجی ساختاریافته به مدل و قالب پیام وابسته‌اند.",
  "documentedBackends": [
    "Ollama runtime",
    "llama.cpp"
  ]
});
softwareReleases.push({
  "id": "software-release:vllm-v0-29-0",
  "productId": "software-product:vllm",
  "version": "v0.29.0",
  "releasedOn": "2026-09-09",
  "lastReviewedOn": "2026-09-15",
  "roles": [
    "inference-engine-library",
    "api-server"
  ],
  "environments": [
    "server",
    "container"
  ],
  "operatingSystems": [
    "Linux",
    "macOS"
  ],
  "hardwareKinds": [
    "CPU",
    "GPU",
    "TPU",
    "NPU"
  ],
  "localOrCloud": [
    "local"
  ],
  "offlineOperation": {
    "state": "unknown",
    "note": "اجرای بدون شبکه با وابستگی‌ها و مدل محلی برای این نسخه بررسی نشده است."
  },
  "license": {
    "name": {
      "state": "known",
      "value": "Apache-2.0",
      "evidenceIds": [
        "evidence:software-vllm-license"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://github.com/vllm-project/vllm/blob/v0.29.0/LICENSE",
      "evidenceIds": [
        "evidence:software-vllm-license"
      ]
    },
    "commercialUse": {
      "state": "known",
      "value": "allowed",
      "evidenceIds": [
        "evidence:software-vllm-license"
      ]
    },
    "restrictions": [],
    "evidenceIds": [
      "evidence:software-vllm-license"
    ]
  },
  "maintenanceStatus": "active",
  "evidenceIds": [
    "evidence:software-vllm-release",
    "evidence:software-vllm-overview",
    "evidence:software-vllm-license",
    "evidence:v03-8032a82b94bcbed4da",
    "evidence:v03-a482c73bfb13ead199",
    "evidence:v03-e4af0f3dc91b9ee33e",
    "evidence:v03-74e9b6f3f8607e565c",
    "evidence:v03-35033e16a1d60d3c67"
  ],
  "targetScenario": {
    "state": "known",
    "value": "سرویس‌دهی مدل‌ها و پردازش درخواست‌های هم‌زمان",
    "evidenceIds": [
      "evidence:software-vllm-overview"
    ]
  },
  "backendSummary": {
    "state": "known",
    "value": "موتور vLLM؛ kernel و افزونهٔ سخت‌افزار طبق پلتفرم",
    "evidenceIds": [
      "evidence:software-vllm-overview"
    ]
  },
  "selectionCaveat": "parser، precision و روش موازی‌سازی باید با مدل و سخت‌افزار سازگار باشند. پشتیبانی TPU/NPU و Apple Silicon به backend یا افزونه و سیستم‌عامل همان مسیر وابسته است؛ بستهٔ GPU لینوکس برای همهٔ این سخت‌افزارها یکسان نیست.",
  "documentedNeeds": [
    "high-throughput"
  ],
  "documentedBackends": [
    "vLLM",
    "PyTorch"
  ]
});
softwareReleases.push({
  "id": "software-release:sglang-v0-5-19",
  "productId": "software-product:sglang",
  "version": "v0.5.19",
  "releasedOn": "2026-09-05",
  "lastReviewedOn": "2026-09-15",
  "roles": [
    "inference-engine-library",
    "api-server"
  ],
  "environments": [
    "server",
    "container"
  ],
  "operatingSystems": [
    "Linux"
  ],
  "hardwareKinds": [
    "CPU",
    "GPU",
    "TPU",
    "NPU"
  ],
  "localOrCloud": [
    "local"
  ],
  "offlineOperation": {
    "state": "unknown",
    "note": "اجرای بدون شبکه با وابستگی‌ها و مدل محلی برای این نسخه بررسی نشده است."
  },
  "license": {
    "name": {
      "state": "known",
      "value": "Apache-2.0",
      "evidenceIds": [
        "evidence:software-sglang-license"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://github.com/sgl-project/sglang/blob/v0.5.19/LICENSE",
      "evidenceIds": [
        "evidence:software-sglang-license"
      ]
    },
    "commercialUse": {
      "state": "known",
      "value": "allowed",
      "evidenceIds": [
        "evidence:software-sglang-license"
      ]
    },
    "restrictions": [],
    "evidenceIds": [
      "evidence:software-sglang-license"
    ]
  },
  "maintenanceStatus": "active",
  "evidenceIds": [
    "evidence:software-sglang-release",
    "evidence:software-sglang-overview",
    "evidence:software-sglang-license",
    "evidence:v03-47593e78ba908b6af0",
    "evidence:v03-58023cc39d2cfa4581",
    "evidence:v03-d893b03330e0b793dd"
  ],
  "targetScenario": {
    "state": "known",
    "value": "سرویس‌دهی مدل زبانی و چندرسانه‌ای روی یک GPU یا خوشه",
    "evidenceIds": [
      "evidence:software-sglang-overview"
    ]
  },
  "backendSummary": {
    "state": "known",
    "value": "SGLang runtime؛ backend متناسب با GPU / CPU / TPU",
    "evidenceIds": [
      "evidence:software-sglang-overview"
    ]
  },
  "selectionCaveat": "کش پیشوند و رمزگشایی حدسی به مدل، مسیر اجرا و تنظیمات وابسته‌اند. پشتیبانی TPU/NPU و Apple Silicon به backend یا افزونه و سیستم‌عامل همان مسیر وابسته است؛ بستهٔ GPU لینوکس برای همهٔ این سخت‌افزارها یکسان نیست.",
  "documentedNeeds": [
    "high-throughput"
  ],
  "documentedBackends": [
    "SGLang",
    "PyTorch",
    "JAX"
  ]
});
softwareReleases.push({
  "id": "software-release:llama-cpp-v0-4-1",
  "productId": "software-product:llama-cpp",
  "version": "v0.4.1",
  "releasedOn": "2026-09-14",
  "lastReviewedOn": "2026-09-15",
  "roles": [
    "inference-engine-library",
    "api-server"
  ],
  "environments": [
    "desktop",
    "workstation",
    "server"
  ],
  "operatingSystems": [
    "Linux",
    "macOS",
    "Windows"
  ],
  "hardwareKinds": [
    "CPU",
    "GPU"
  ],
  "localOrCloud": [
    "local"
  ],
  "offlineOperation": {
    "state": "unknown",
    "note": "اجرای بدون شبکه با وابستگی‌ها و مدل محلی برای این نسخه بررسی نشده است."
  },
  "license": {
    "name": {
      "state": "known",
      "value": "MIT",
      "evidenceIds": [
        "evidence:software-llama-cpp-license"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://github.com/ggml-org/llama.cpp/blob/v0.4.1/LICENSE",
      "evidenceIds": [
        "evidence:software-llama-cpp-license"
      ]
    },
    "commercialUse": {
      "state": "known",
      "value": "allowed",
      "evidenceIds": [
        "evidence:software-llama-cpp-license"
      ]
    },
    "restrictions": [],
    "evidenceIds": [
      "evidence:software-llama-cpp-license"
    ]
  },
  "maintenanceStatus": "active",
  "evidenceIds": [
    "evidence:software-llama-cpp-release",
    "evidence:software-llama-cpp-overview",
    "evidence:software-llama-cpp-license",
    "evidence:v03-fd884576e2e1de6762",
    "evidence:v03-e1b7613c9eb17ac3b5",
    "evidence:v03-ec0e3cc03ba69e5003"
  ],
  "targetScenario": {
    "state": "known",
    "value": "اجرای GGUF روی CPU، GPU یا ترکیب آن‌ها",
    "evidenceIds": [
      "evidence:software-llama-cpp-overview"
    ]
  },
  "backendSummary": {
    "state": "known",
    "value": "ggml؛ CPU / Metal / CUDA / HIP / Vulkan / SYCL",
    "evidenceIds": [
      "evidence:software-llama-cpp-overview"
    ]
  },
  "selectionCaveat": "offload به CPU هزینهٔ انتقال و RAM دارد؛ ابزارها به مدل و قالب وابسته‌اند.",
  "documentedBackends": [
    "ggml",
    "CUDA",
    "Metal",
    "HIP",
    "Vulkan",
    "SYCL"
  ]
});
softwareReleases.push({
  "id": "software-release:tensorrt-llm-v1-2-1",
  "productId": "software-product:tensorrt-llm",
  "version": "v1.2.1",
  "releasedOn": "2026-04-20",
  "lastReviewedOn": "2026-09-15",
  "roles": [
    "inference-engine-library",
    "api-server"
  ],
  "environments": [
    "server",
    "container"
  ],
  "operatingSystems": [
    "Linux"
  ],
  "hardwareKinds": [
    "GPU"
  ],
  "localOrCloud": [
    "local"
  ],
  "offlineOperation": {
    "state": "unknown",
    "note": "اجرای بدون شبکه با وابستگی‌ها و مدل محلی برای این نسخه بررسی نشده است."
  },
  "license": {
    "name": {
      "state": "known",
      "value": "Apache-2.0",
      "evidenceIds": [
        "evidence:software-tensorrt-llm-license"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://github.com/NVIDIA/TensorRT-LLM/blob/v1.2.1/LICENSE",
      "evidenceIds": [
        "evidence:software-tensorrt-llm-license"
      ]
    },
    "commercialUse": {
      "state": "known",
      "value": "allowed",
      "evidenceIds": [
        "evidence:software-tensorrt-llm-license"
      ]
    },
    "restrictions": [],
    "evidenceIds": [
      "evidence:software-tensorrt-llm-license"
    ]
  },
  "maintenanceStatus": "active",
  "evidenceIds": [
    "evidence:software-tensorrt-llm-release",
    "evidence:software-tensorrt-llm-overview",
    "evidence:software-tensorrt-llm-license",
    "evidence:v03-8c67ac93e0e9871a4d"
  ],
  "targetScenario": {
    "state": "known",
    "value": "ساخت و سرویس‌دهی اجرای مدل روی GPUهای NVIDIA",
    "evidenceIds": [
      "evidence:software-tensorrt-llm-overview"
    ]
  },
  "backendSummary": {
    "state": "known",
    "value": "TensorRT-LLM؛ مسیر PyTorch و موتورهای TensorRT طبق نسخه",
    "evidenceIds": [
      "evidence:software-tensorrt-llm-overview"
    ]
  },
  "selectionCaveat": "معماری GPU، نوع داده و مدل باید در ماتریس پشتیبانی نسخه باشند.",
  "documentedBackends": [
    "TensorRT-LLM",
    "TensorRT",
    "PyTorch"
  ],
  "documentedNeeds": [
    "high-throughput"
  ]
});
softwareReleases.push({
  "id": "software-release:triton-v2-72-0",
  "productId": "software-product:triton",
  "version": "v2.72.0",
  "releasedOn": "2026-08-31",
  "lastReviewedOn": "2026-09-15",
  "roles": [
    "api-server",
    "deployment-manager"
  ],
  "environments": [
    "server",
    "container"
  ],
  "operatingSystems": [
    "Linux"
  ],
  "hardwareKinds": [
    "CPU",
    "GPU"
  ],
  "localOrCloud": [
    "local"
  ],
  "offlineOperation": {
    "state": "unknown",
    "note": "اجرای بدون شبکه با وابستگی‌ها و مدل محلی برای این نسخه بررسی نشده است."
  },
  "license": {
    "name": {
      "state": "known",
      "value": "BSD-3-Clause",
      "evidenceIds": [
        "evidence:software-triton-license"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://github.com/triton-inference-server/server/blob/v2.72.0/LICENSE",
      "evidenceIds": [
        "evidence:software-triton-license"
      ]
    },
    "commercialUse": {
      "state": "known",
      "value": "allowed",
      "evidenceIds": [
        "evidence:software-triton-license"
      ]
    },
    "restrictions": [],
    "evidenceIds": [
      "evidence:software-triton-license"
    ]
  },
  "maintenanceStatus": "active",
  "evidenceIds": [
    "evidence:software-triton-release",
    "evidence:software-triton-overview",
    "evidence:software-triton-license",
    "evidence:v03-8c96f25dcb8de25541",
    "evidence:v03-bb574636acd9b4e368",
    "evidence:v03-a71753d8d7dd85a324",
    "evidence:audit-20260916-triton-272"
  ],
  "targetScenario": {
    "state": "known",
    "value": "میزبانی چند مدل و چند framework از طریق سرویس مشترک",
    "evidenceIds": [
      "evidence:software-triton-overview"
    ]
  },
  "backendSummary": {
    "state": "known",
    "value": "TensorRT / PyTorch / ONNX / OpenVINO / Python و backendهای دیگر",
    "evidenceIds": [
      "evidence:software-triton-overview"
    ]
  },
  "selectionCaveat": "انتشار ۲٫۷۲٫۰ کانتینر backendِ TensorRT-LLM را همراه ندارد؛ تصویر مناسب باید جدا انتخاب شود.",
  "documentedNeeds": [
    "high-throughput"
  ],
  "documentedBackends": [
    "TensorRT",
    "ONNX Runtime",
    "PyTorch",
    "OpenVINO",
    "Python"
  ]
});
softwareReleases.push({
  "id": "software-release:tei-v1-9-3",
  "productId": "software-product:tei",
  "version": "v1.9.3",
  "releasedOn": "2026-03-23",
  "lastReviewedOn": "2026-09-15",
  "roles": [
    "inference-engine-library",
    "api-server"
  ],
  "environments": [
    "server",
    "container",
    "offline-air-gapped"
  ],
  "operatingSystems": [
    "Linux",
    "macOS"
  ],
  "hardwareKinds": [
    "CPU",
    "GPU"
  ],
  "localOrCloud": [
    "local"
  ],
  "offlineOperation": {
    "state": "known",
    "value": true,
    "evidenceIds": [
      "evidence:software-tei-overview"
    ],
    "note": "پس از آماده‌سازی مدل‌ها و وابستگی‌ها؛ اتصال به API یا ابزار خارجی مستلزم شبکه است."
  },
  "license": {
    "name": {
      "state": "known",
      "value": "Apache-2.0",
      "evidenceIds": [
        "evidence:software-tei-license"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://github.com/huggingface/text-embeddings-inference/blob/v1.9.3/LICENSE",
      "evidenceIds": [
        "evidence:software-tei-license"
      ]
    },
    "commercialUse": {
      "state": "known",
      "value": "allowed",
      "evidenceIds": [
        "evidence:software-tei-license"
      ]
    },
    "restrictions": [],
    "evidenceIds": [
      "evidence:software-tei-license"
    ]
  },
  "maintenanceStatus": "active",
  "evidenceIds": [
    "evidence:software-tei-release",
    "evidence:software-tei-overview",
    "evidence:software-tei-license",
    "evidence:v03-c69b5931b9c6978a2b",
    "evidence:v03-7f22b7486a7c9fe23c",
    "evidence:v03-532d89c93c12ced68c"
  ],
  "targetScenario": {
    "state": "known",
    "value": "سرویس embedding، reranking و دسته‌بندی متن",
    "evidenceIds": [
      "evidence:software-tei-overview"
    ]
  },
  "backendSummary": {
    "state": "known",
    "value": "Candle / cuBLASLt / ONNX؛ Metal برای Mac طبق مدل",
    "evidenceIds": [
      "evidence:software-tei-overview"
    ]
  },
  "selectionCaveat": "نوع وظیفه و pooling به معماری پشتیبانی‌شدهٔ مدل وابسته است.",
  "documentedBackends": [
    "Candle",
    "ONNX Runtime",
    "cuBLASLt"
  ],
  "documentedNeeds": [
    "high-throughput"
  ]
});
softwareReleases.push({
  "id": "software-release:airllm-v4-0-0",
  "productId": "software-product:airllm",
  "version": "v4.0.0",
  "releasedOn": "2026-09-05",
  "lastReviewedOn": "2026-09-15",
  "roles": [
    "inference-engine-library"
  ],
  "environments": [
    "workstation",
    "server"
  ],
  "operatingSystems": [
    "Linux",
    "macOS"
  ],
  "hardwareKinds": [
    "CPU",
    "GPU"
  ],
  "localOrCloud": [
    "local"
  ],
  "offlineOperation": {
    "state": "unknown",
    "note": "اجرای بدون شبکه با وابستگی‌ها و مدل محلی برای این نسخه بررسی نشده است."
  },
  "license": {
    "name": {
      "state": "known",
      "value": "Apache-2.0",
      "evidenceIds": [
        "evidence:software-airllm-license"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://github.com/lyogavin/airllm/blob/v4.0.0/LICENSE",
      "evidenceIds": [
        "evidence:software-airllm-license"
      ]
    },
    "commercialUse": {
      "state": "known",
      "value": "allowed",
      "evidenceIds": [
        "evidence:software-airllm-license"
      ]
    },
    "restrictions": [],
    "evidenceIds": [
      "evidence:software-airllm-license"
    ]
  },
  "maintenanceStatus": "active",
  "evidenceIds": [
    "evidence:software-airllm-release",
    "evidence:software-airllm-overview",
    "evidence:software-airllm-license",
    "evidence:v03-55078582a5779272d8"
  ],
  "targetScenario": {
    "state": "known",
    "value": "اجرای لایه‌به‌لایهٔ مدل وقتی وزن کامل در VRAM جا نمی‌شود",
    "evidenceIds": [
      "evidence:software-airllm-overview"
    ]
  },
  "backendSummary": {
    "state": "known",
    "value": "بارگذاری لایه‌ها از دیسک با وابستگی‌های مدل و Transformers",
    "evidenceIds": [
      "evidence:software-airllm-overview"
    ]
  },
  "selectionCaveat": "بارگذاری لایه‌ای VRAM را کاهش می‌دهد و انتقال دیسک/RAM را وارد مسیر اجرا می‌کند؛ نسخهٔ ۴ مسیر آموزش آداپتر نیز دارد. شرط حافظهٔ کم به معنای سرعت مناسب سرویس نیست.",
  "documentedBackends": [
    "Transformers",
    "PyTorch",
    "MLX"
  ]
});
softwareReleases.push({
  "id": "software-release:transformers-v5-17-0",
  "productId": "software-product:transformers",
  "version": "v5.17.0",
  "releasedOn": "2026-09-09",
  "lastReviewedOn": "2026-09-15",
  "roles": [
    "inference-engine-library",
    "api-server"
  ],
  "environments": [
    "desktop",
    "workstation",
    "server"
  ],
  "operatingSystems": [
    "Linux",
    "macOS",
    "Windows"
  ],
  "hardwareKinds": [
    "CPU",
    "GPU"
  ],
  "localOrCloud": [
    "local"
  ],
  "offlineOperation": {
    "state": "known",
    "value": true,
    "evidenceIds": [
      "evidence:v03-6991cb837dcc3e0456"
    ],
    "note": "وزن‌ها و وابستگی‌ها از پیش محلی باشند؛ مسیرهای ابری، دریافت مدل و ابزارهای شبکه‌ای نیاز به اتصال دارند."
  },
  "license": {
    "name": {
      "state": "known",
      "value": "Apache-2.0",
      "evidenceIds": [
        "evidence:software-transformers-license"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://github.com/huggingface/transformers/blob/v5.17.0/LICENSE",
      "evidenceIds": [
        "evidence:software-transformers-license"
      ]
    },
    "commercialUse": {
      "state": "known",
      "value": "allowed",
      "evidenceIds": [
        "evidence:software-transformers-license"
      ]
    },
    "restrictions": [],
    "evidenceIds": [
      "evidence:software-transformers-license"
    ]
  },
  "maintenanceStatus": "active",
  "evidenceIds": [
    "evidence:software-transformers-release",
    "evidence:software-transformers-overview",
    "evidence:software-transformers-license",
    "evidence:v03-e57136d79a4b6a1205",
    "evidence:v03-1ed805fdece03bf36c",
    "evidence:v03-e05f6e1814f7385330",
    "evidence:v03-6991cb837dcc3e0456"
  ],
  "targetScenario": {
    "state": "known",
    "value": "بارگذاری مدل و ساخت گردش‌کار استنتاج در Python",
    "evidenceIds": [
      "evidence:software-transformers-overview"
    ]
  },
  "backendSummary": {
    "state": "known",
    "value": "PyTorch و کلاس‌های مدل Transformers؛ serve طبق نسخه",
    "evidenceIds": [
      "evidence:software-transformers-overview"
    ]
  },
  "selectionCaveat": "نوع وظیفه، حافظه و قابلیت سرویس به کلاس مدل و backend وابسته‌اند.",
  "documentedBackends": [
    "PyTorch"
  ]
});
softwareReleases.push({
  "id": "software-release:litellm-v1-101-0",
  "productId": "software-product:litellm",
  "version": "v1.101.0",
  "releasedOn": "2026-09-15",
  "lastReviewedOn": "2026-09-15",
  "roles": [
    "gateway",
    "api-server"
  ],
  "environments": [
    "server",
    "container",
    "cloud-service"
  ],
  "operatingSystems": [
    "Linux",
    "macOS",
    "Windows"
  ],
  "hardwareKinds": [
    "CPU"
  ],
  "localOrCloud": [
    "local",
    "cloud"
  ],
  "offlineOperation": {
    "state": "unknown",
    "note": "اجرای بدون شبکه با وابستگی‌ها و مدل محلی برای این نسخه بررسی نشده است."
  },
  "license": {
    "name": {
      "state": "known",
      "value": "MIT",
      "evidenceIds": [
        "evidence:software-litellm-license"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://github.com/BerriAI/litellm/blob/v1.101.0/LICENSE",
      "evidenceIds": [
        "evidence:software-litellm-license"
      ]
    },
    "commercialUse": {
      "state": "known",
      "value": "allowed",
      "evidenceIds": [
        "evidence:software-litellm-license"
      ]
    },
    "restrictions": [
      "MIT مربوط به بخش عمومی مخزن است؛ enterprise/ مجوز جدا دارد. قابلیت تجاری خودکار به هسته نسبت داده نمی‌شود."
    ],
    "evidenceIds": [
      "evidence:software-litellm-license"
    ]
  },
  "maintenanceStatus": "active",
  "evidenceIds": [
    "evidence:software-litellm-release",
    "evidence:software-litellm-overview",
    "evidence:software-litellm-license",
    "evidence:v03-421cc0229394f7d0f4",
    "evidence:v03-ceec510b23b3c3f5f2"
  ],
  "targetScenario": {
    "state": "known",
    "value": "درگاه مشترک برای چند ارائه‌دهنده و سرویس مدل",
    "evidenceIds": [
      "evidence:software-litellm-overview"
    ]
  },
  "backendSummary": {
    "state": "known",
    "value": "اتصال به API ارائه‌دهندگان و سرورهای مدل",
    "evidenceIds": [
      "evidence:software-litellm-overview"
    ]
  },
  "selectionCaveat": "تولید متن در سرویس متصل انجام می‌شود؛ قابلیت APIها یکسان نیست.",
  "documentedBackends": [
    "OpenAI-compatible API",
    "Ollama API",
    "provider APIs"
  ]
});
softwareReleases.push({
  "id": "software-release:open-webui-v0-11-3",
  "productId": "software-product:open-webui",
  "version": "v0.11.3",
  "releasedOn": "2026-08-31",
  "lastReviewedOn": "2026-09-15",
  "roles": [
    "user-interface"
  ],
  "environments": [
    "server",
    "container",
    "kubernetes",
    "offline-air-gapped"
  ],
  "operatingSystems": [
    "Linux",
    "macOS",
    "Windows"
  ],
  "hardwareKinds": [
    "CPU"
  ],
  "localOrCloud": [
    "local",
    "hybrid"
  ],
  "offlineOperation": {
    "state": "known",
    "value": true,
    "evidenceIds": [
      "evidence:v03-7348870d91adea4269"
    ],
    "note": "وزن‌ها و وابستگی‌ها از پیش محلی باشند؛ مسیرهای ابری، دریافت مدل و ابزارهای شبکه‌ای نیاز به اتصال دارند."
  },
  "license": {
    "name": {
      "state": "known",
      "value": "Open WebUI License",
      "evidenceIds": [
        "evidence:software-open-webui-license"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://github.com/open-webui/open-webui/blob/v0.11.3/LICENSE",
      "evidenceIds": [
        "evidence:software-open-webui-license"
      ]
    },
    "commercialUse": {
      "state": "known",
      "value": "restricted",
      "evidenceIds": [
        "evidence:software-open-webui-license"
      ],
      "note": "شرایط برند و استثناهای متن مجوز اعمال می‌شود."
    },
    "restrictions": [
      "شرط حفظ برند و استثناهای آن در LICENSE؛ این نسخه نباید MIT یا BSD بدون شرط معرفی شود."
    ],
    "evidenceIds": [
      "evidence:software-open-webui-license"
    ]
  },
  "maintenanceStatus": "active",
  "evidenceIds": [
    "evidence:software-open-webui-release",
    "evidence:software-open-webui-overview",
    "evidence:software-open-webui-license",
    "evidence:v03-a14db468251e3265c3",
    "evidence:v03-7348870d91adea4269"
  ],
  "targetScenario": {
    "state": "known",
    "value": "رابط گفتگو برای Ollama و APIهای سازگار",
    "evidenceIds": [
      "evidence:software-open-webui-overview"
    ]
  },
  "backendSummary": {
    "state": "known",
    "value": "Ollama یا سرویس سازگار با OpenAI API",
    "evidenceIds": [
      "evidence:software-open-webui-overview"
    ]
  },
  "selectionCaveat": "برای تولید متن به موتور یا سرویس مدل متصل نیاز دارد.",
  "documentedBackends": [
    "Ollama API",
    "OpenAI-compatible API"
  ]
});
softwareReleases.push({
  "id": "software-release:tgi-v3-3-7",
  "productId": "software-product:tgi",
  "version": "v3.3.7",
  "releasedOn": "2025-12-19",
  "lastReviewedOn": "2026-09-16",
  "roles": [
    "inference-engine-library",
    "api-server"
  ],
  "environments": [
    "server",
    "container"
  ],
  "operatingSystems": [
    "Linux"
  ],
  "hardwareKinds": [
    "GPU"
  ],
  "localOrCloud": [
    "local"
  ],
  "offlineOperation": {
    "state": "unknown",
    "note": "اجرای بدون شبکه با وابستگی‌ها و مدل محلی برای این نسخه بررسی نشده است."
  },
  "license": {
    "name": {
      "state": "known",
      "value": "Apache-2.0",
      "evidenceIds": [
        "evidence:software-tgi-license"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://github.com/huggingface/text-generation-inference/blob/v3.3.7/LICENSE",
      "evidenceIds": [
        "evidence:software-tgi-license"
      ]
    },
    "commercialUse": {
      "state": "known",
      "value": "allowed",
      "evidenceIds": [
        "evidence:software-tgi-license"
      ]
    },
    "restrictions": [],
    "evidenceIds": [
      "evidence:software-tgi-license"
    ]
  },
  "maintenanceStatus": "archived",
  "evidenceIds": [
    "evidence:software-tgi-release",
    "evidence:software-tgi-overview",
    "evidence:software-tgi-license",
    "evidence:software-tgi-maintenance",
    "evidence:v03-aa776ce8230ee5e3f6",
    "evidence:audit-20260916-tgi-archive"
  ],
  "targetScenario": {
    "state": "known",
    "value": "نگه‌داری سرویس تولید متن برای مدل‌های پشتیبانی‌شده",
    "evidenceIds": [
      "evidence:software-tgi-overview"
    ]
  },
  "backendSummary": {
    "state": "known",
    "value": "backendهای TGI طبق مدل و پلتفرم",
    "evidenceIds": [
      "evidence:software-tgi-overview"
    ]
  },
  "selectionCaveat": "مخزن از ۲۱ مارس ۲۰۲۶ آرشیو و فقط‌خواندنی است.",
  "documentedNeeds": [
    "high-throughput"
  ],
  "documentedBackends": [
    "TGI",
    "PyTorch"
  ]
});
softwareReleases.push({
  "id": "software-release:lm-studio-0-4-24-build-1",
  "productId": "software-product:lm-studio",
  "version": "0.4.24 Build 1",
  "releasedOn": "2026-09-09",
  "lastReviewedOn": "2026-09-15",
  "roles": [
    "user-interface",
    "model-manager",
    "api-server"
  ],
  "environments": [
    "desktop",
    "workstation"
  ],
  "operatingSystems": [
    "Linux",
    "macOS",
    "Windows"
  ],
  "hardwareKinds": [
    "CPU",
    "GPU"
  ],
  "localOrCloud": [
    "local"
  ],
  "offlineOperation": {
    "state": "known",
    "value": true,
    "evidenceIds": [
      "evidence:v03-d27918c77da6df22ee"
    ],
    "note": "وزن‌ها و وابستگی‌ها از پیش محلی باشند؛ مسیرهای ابری، دریافت مدل و ابزارهای شبکه‌ای نیاز به اتصال دارند."
  },
  "license": {
    "name": {
      "state": "known",
      "value": "LM Studio Terms of Use",
      "evidenceIds": [
        "evidence:software-lm-studio-license"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://lmstudio.ai/terms",
      "evidenceIds": [
        "evidence:software-lm-studio-license"
      ]
    },
    "commercialUse": {
      "state": "unknown",
      "note": "شرایط هسته، خدمات پولی و ارائه به اشخاص ثالث باید جدا بررسی شوند."
    },
    "evidenceIds": [
      "evidence:software-lm-studio-license"
    ]
  },
  "maintenanceStatus": "active",
  "evidenceIds": [
    "evidence:software-lm-studio-release",
    "evidence:software-lm-studio-docs",
    "evidence:software-lm-studio-license",
    "evidence:v03-9754f0e86952a04baa",
    "evidence:v03-550d178c89abe4b32a",
    "evidence:v03-d27918c77da6df22ee"
  ],
  "targetScenario": {
    "state": "known",
    "value": "دریافت مدل، گفتگو و راه‌اندازی API محلی",
    "evidenceIds": [
      "evidence:software-lm-studio-docs"
    ]
  },
  "backendSummary": {
    "state": "known",
    "value": "llama.cpp برای GGUF؛ MLX روی Apple Silicon طبق runtime",
    "evidenceIds": [
      "evidence:software-lm-studio-docs"
    ]
  },
  "selectionCaveat": "قابلیت و قالب مدل به runtime انتخاب‌شده وابسته است.",
  "documentedBackends": [
    "llama.cpp",
    "MLX"
  ]
});
softwareReleases.push({
  "id": "software-release:ktransformers-v0-7-1",
  "productId": "software-product:ktransformers",
  "version": "v0.7.1",
  "releasedOn": "2026-09-15",
  "lastReviewedOn": "2026-09-16",
  "roles": [
    "inference-engine-library"
  ],
  "environments": [
    "workstation",
    "server"
  ],
  "operatingSystems": [
    "Linux"
  ],
  "hardwareKinds": [
    "CPU",
    "GPU"
  ],
  "localOrCloud": [
    "local"
  ],
  "offlineOperation": {
    "state": "unknown"
  },
  "license": {
    "name": {
      "state": "known",
      "value": "Apache-2.0",
      "evidenceIds": [
        "evidence:audit-20260916-ktransformers-license"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://github.com/kvcache-ai/ktransformers/blob/main/LICENSE",
      "evidenceIds": [
        "evidence:audit-20260916-ktransformers-license"
      ]
    },
    "commercialUse": {
      "state": "known",
      "value": "allowed",
      "evidenceIds": [
        "evidence:audit-20260916-ktransformers-license"
      ]
    },
    "evidenceIds": [
      "evidence:audit-20260916-ktransformers-license"
    ]
  },
  "maintenanceStatus": "active",
  "targetScenario": {
    "state": "known",
    "value": "اجرای ترکیبی CPU و GPU برای مدل‌های MoE",
    "evidenceIds": [
      "evidence:audit-20260916-ktransformers-release",
      "evidence:audit-20260916-ktransformers-docs",
      "evidence:audit-20260916-ktransformers-license"
    ]
  },
  "backendSummary": {
    "state": "known",
    "value": "کرنل‌های CPU برای expertها و GPU برای بخش‌های متراکم",
    "evidenceIds": [
      "evidence:audit-20260916-ktransformers-release",
      "evidence:audit-20260916-ktransformers-docs",
      "evidence:audit-20260916-ktransformers-license"
    ]
  },
  "selectionCaveat": "نسخهٔ بسته، کرنل و فهرست معماری‌های پشتیبانی‌شده باید با مدل MoE انتخابی منطبق باشند.",
  "documentedBackends": [
    "CPU kernels",
    "CUDA"
  ],
  "evidenceIds": [
    "evidence:audit-20260916-ktransformers-release",
    "evidence:audit-20260916-ktransformers-docs",
    "evidence:audit-20260916-ktransformers-license"
  ]
});
softwareReleases.push({
  "id": "software-release:sentence-transformers-v6-0-1",
  "productId": "software-product:sentence-transformers",
  "version": "v6.0.1",
  "releasedOn": "2026-08-31",
  "lastReviewedOn": "2026-09-16",
  "roles": [
    "inference-engine-library"
  ],
  "environments": [
    "workstation",
    "server"
  ],
  "operatingSystems": [
    "Linux",
    "macOS",
    "Windows"
  ],
  "hardwareKinds": [
    "CPU",
    "GPU"
  ],
  "localOrCloud": [
    "local"
  ],
  "offlineOperation": {
    "state": "unknown"
  },
  "license": {
    "name": {
      "state": "known",
      "value": "Apache-2.0",
      "evidenceIds": [
        "evidence:audit-20260916-sentence-transformers-license"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://github.com/huggingface/sentence-transformers/blob/main/LICENSE",
      "evidenceIds": [
        "evidence:audit-20260916-sentence-transformers-license"
      ]
    },
    "commercialUse": {
      "state": "known",
      "value": "allowed",
      "evidenceIds": [
        "evidence:audit-20260916-sentence-transformers-license"
      ]
    },
    "evidenceIds": [
      "evidence:audit-20260916-sentence-transformers-license"
    ]
  },
  "maintenanceStatus": "active",
  "targetScenario": {
    "state": "known",
    "value": "ساخت بردار، بازرتبه‌بندی و آموزش مدل‌های بازیابی",
    "evidenceIds": [
      "evidence:audit-20260916-sentence-transformers-release",
      "evidence:audit-20260916-sentence-transformers-docs",
      "evidence:audit-20260916-sentence-transformers-license"
    ]
  },
  "backendSummary": {
    "state": "known",
    "value": "SentenceTransformer و CrossEncoder روی PyTorch",
    "evidenceIds": [
      "evidence:audit-20260916-sentence-transformers-release",
      "evidence:audit-20260916-sentence-transformers-docs",
      "evidence:audit-20260916-sentence-transformers-license"
    ]
  },
  "selectionCaveat": "نوع prompt و pooling با مدل embedding تغییر می‌کند؛ برای Qwen3-Reranker خروجی raw logits لازم است.",
  "documentedBackends": [
    "PyTorch"
  ],
  "evidenceIds": [
    "evidence:audit-20260916-sentence-transformers-release",
    "evidence:audit-20260916-sentence-transformers-docs",
    "evidence:audit-20260916-sentence-transformers-license"
  ]
});
softwareReleases.push({
  "id": "software-release:flagembedding-v1-4-2",
  "productId": "software-product:flagembedding",
  "version": "v1.4.2",
  "releasedOn": "2026-08-24",
  "lastReviewedOn": "2026-09-16",
  "roles": [
    "inference-engine-library"
  ],
  "environments": [
    "workstation",
    "server"
  ],
  "operatingSystems": [
    "Linux"
  ],
  "hardwareKinds": [
    "CPU",
    "GPU"
  ],
  "localOrCloud": [
    "local"
  ],
  "offlineOperation": {
    "state": "unknown"
  },
  "license": {
    "name": {
      "state": "known",
      "value": "MIT",
      "evidenceIds": [
        "evidence:audit-20260916-flagembedding-license"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://github.com/FlagOpen/FlagEmbedding/blob/master/LICENSE",
      "evidenceIds": [
        "evidence:audit-20260916-flagembedding-license"
      ]
    },
    "commercialUse": {
      "state": "known",
      "value": "allowed",
      "evidenceIds": [
        "evidence:audit-20260916-flagembedding-license"
      ]
    },
    "evidenceIds": [
      "evidence:audit-20260916-flagembedding-license"
    ]
  },
  "maintenanceStatus": "active",
  "targetScenario": {
    "state": "known",
    "value": "اجرای خانوادهٔ BGE و بازرتبه‌بندها",
    "evidenceIds": [
      "evidence:audit-20260916-flagembedding-release",
      "evidence:audit-20260916-flagembedding-docs",
      "evidence:audit-20260916-flagembedding-license"
    ]
  },
  "backendSummary": {
    "state": "known",
    "value": "خروجی‌های dense، sparse و چندبرداری BGE-M3",
    "evidenceIds": [
      "evidence:audit-20260916-flagembedding-release",
      "evidence:audit-20260916-flagembedding-docs",
      "evidence:audit-20260916-flagembedding-license"
    ]
  },
  "selectionCaveat": "سه خروجی BGE-M3 مصرف و ساخت نمایهٔ متفاوت دارند؛ فقط dense را نمی‌توان جای هر سه خروجی استفاده کرد.",
  "documentedBackends": [
    "PyTorch"
  ],
  "evidenceIds": [
    "evidence:audit-20260916-flagembedding-release",
    "evidence:audit-20260916-flagembedding-docs",
    "evidence:audit-20260916-flagembedding-license"
  ]
});
