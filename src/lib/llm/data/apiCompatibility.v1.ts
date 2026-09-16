// Generated from data/llm/v0.3.0/repository.json by scripts/generate-llm-dataset.py.
import type { LlmGuideRepository } from '../schema';

export const apiCompatibility: LlmGuideRepository['apiCompatibility'] = [];
apiCompatibility.push({
  "id": "api-compatibility:ollama-api-generate-text-generation",
  "protocol": "HTTP JSON / Ollama native",
  "endpoint": "/api/generate",
  "capability": "text generation",
  "status": "supported",
  "provision": "native",
  "scope": {
    "softwareReleaseId": "software-release:ollama-v0-34-0",
    "endpoints": [
      "/api/generate"
    ],
    "conditions": []
  },
  "limitations": [
    "آزمون سرتاسری API انجام نشده است."
  ],
  "evidenceIds": [
    "evidence:api-ollama-api-generate-text-generation"
  ]
});
apiCompatibility.push({
  "id": "api-compatibility:ollama-api-chat-chat",
  "protocol": "HTTP JSON / Ollama native",
  "endpoint": "/api/chat",
  "capability": "chat",
  "status": "supported",
  "provision": "native",
  "scope": {
    "softwareReleaseId": "software-release:ollama-v0-34-0",
    "endpoints": [
      "/api/chat"
    ],
    "conditions": []
  },
  "limitations": [
    "آزمون سرتاسری API انجام نشده است."
  ],
  "evidenceIds": [
    "evidence:api-ollama-api-chat-chat"
  ]
});
apiCompatibility.push({
  "id": "api-compatibility:ollama-api-embed-embeddings",
  "protocol": "HTTP JSON / Ollama native",
  "endpoint": "/api/embed",
  "capability": "embeddings",
  "status": "supported",
  "provision": "native",
  "scope": {
    "softwareReleaseId": "software-release:ollama-v0-34-0",
    "endpoints": [
      "/api/embed"
    ],
    "conditions": []
  },
  "limitations": [
    "آزمون سرتاسری API انجام نشده است."
  ],
  "evidenceIds": [
    "evidence:api-ollama-api-embed-embeddings"
  ]
});
apiCompatibility.push({
  "id": "api-compatibility:llama-cpp-v1-chat-completions-chat",
  "protocol": "HTTP JSON / OpenAI-style",
  "endpoint": "/v1/chat/completions",
  "capability": "chat",
  "status": "supported",
  "provision": "native",
  "scope": {
    "softwareReleaseId": "software-release:llama-cpp-v0-4-1",
    "endpoints": [
      "/v1/chat/completions"
    ],
    "conditions": []
  },
  "limitations": [
    "آزمون سرتاسری API انجام نشده است."
  ],
  "evidenceIds": [
    "evidence:api-llama-cpp-v1-chat-completions-chat"
  ]
});
apiCompatibility.push({
  "id": "api-compatibility:llama-cpp-v1-embeddings-embeddings",
  "protocol": "HTTP JSON / OpenAI-style",
  "endpoint": "/v1/embeddings",
  "capability": "embeddings",
  "status": "supported",
  "provision": "native",
  "scope": {
    "softwareReleaseId": "software-release:llama-cpp-v0-4-1",
    "endpoints": [
      "/v1/embeddings"
    ],
    "conditions": []
  },
  "limitations": [
    "آزمون سرتاسری API انجام نشده است."
  ],
  "evidenceIds": [
    "evidence:api-llama-cpp-v1-embeddings-embeddings"
  ]
});
apiCompatibility.push({
  "id": "api-compatibility:llama-cpp-rerank-reranking",
  "protocol": "HTTP JSON / OpenAI-style",
  "endpoint": "/rerank",
  "capability": "reranking",
  "status": "conditional",
  "provision": "native",
  "scope": {
    "softwareReleaseId": "software-release:llama-cpp-v0-4-1",
    "endpoints": [
      "/rerank"
    ],
    "conditions": []
  },
  "limitations": [
    "آزمون سرتاسری API انجام نشده است."
  ],
  "evidenceIds": [
    "evidence:api-llama-cpp-rerank-reranking"
  ]
});
apiCompatibility.push({
  "id": "api-compatibility:tei-embed-embedding-vectors",
  "protocol": "HTTP JSON / TEI native",
  "endpoint": "/embed",
  "capability": "embedding vectors",
  "status": "supported",
  "provision": "native",
  "scope": {
    "softwareReleaseId": "software-release:tei-v1-9-3",
    "endpoints": [
      "/embed"
    ],
    "conditions": []
  },
  "limitations": [
    "آزمون سرتاسری API انجام نشده است."
  ],
  "evidenceIds": [
    "evidence:api-tei-embed-embedding-vectors"
  ]
});
apiCompatibility.push({
  "id": "api-compatibility:tei-rerank-reranking-scores",
  "protocol": "HTTP JSON / TEI native",
  "endpoint": "/rerank",
  "capability": "reranking scores",
  "status": "conditional",
  "provision": "native",
  "scope": {
    "softwareReleaseId": "software-release:tei-v1-9-3",
    "endpoints": [
      "/rerank"
    ],
    "conditions": []
  },
  "limitations": [
    "آزمون سرتاسری API انجام نشده است."
  ],
  "evidenceIds": [
    "evidence:api-tei-rerank-reranking-scores"
  ]
});
apiCompatibility.push({
  "id": "api-compatibility:tei-predict-sequence-classification",
  "protocol": "HTTP JSON / TEI native",
  "endpoint": "/predict",
  "capability": "sequence classification",
  "status": "conditional",
  "provision": "native",
  "scope": {
    "softwareReleaseId": "software-release:tei-v1-9-3",
    "endpoints": [
      "/predict"
    ],
    "conditions": []
  },
  "limitations": [
    "آزمون سرتاسری API انجام نشده است."
  ],
  "evidenceIds": [
    "evidence:api-tei-predict-sequence-classification"
  ]
});
apiCompatibility.push({
  "id": "api-compatibility:tgi-v1-chat-completions-chat",
  "protocol": "HTTP JSON / OpenAI-style",
  "endpoint": "/v1/chat/completions",
  "capability": "chat",
  "status": "supported",
  "provision": "native",
  "scope": {
    "softwareReleaseId": "software-release:tgi-v3-3-7",
    "endpoints": [
      "/v1/chat/completions"
    ],
    "conditions": []
  },
  "limitations": [
    "آزمون سرتاسری API انجام نشده است."
  ],
  "evidenceIds": [
    "evidence:api-tgi-v1-chat-completions-chat"
  ]
});
apiCompatibility.push({
  "id": "api-compatibility:lm-studio-native-chat",
  "protocol": "HTTP JSON / LM Studio native",
  "endpoint": "/api/v1/chat",
  "capability": "chat with text and image input",
  "status": "conditional",
  "provision": "native",
  "scope": {
    "softwareReleaseId": "software-release:lm-studio-0-4-24-build-1",
    "endpoints": [
      "/api/v1/chat"
    ],
    "conditions": [
      "مدل چندوجهی و backend سازگار برای تصویر؛ قالب ورودی همین API."
    ]
  },
  "limitations": [
    "شاهد changelog انتشار است؛ تطابق کامل API یا نرخ توکن آزموده نشده است."
  ],
  "evidenceIds": [
    "evidence:software-lm-studio-release"
  ]
});
apiCompatibility.push({
  "id": "api-compatibility:vllm-v1-chat-completions-chat",
  "protocol": "HTTP JSON / OpenAI-style",
  "endpoint": "/v1/chat/completions",
  "capability": "chat",
  "status": "supported",
  "provision": "native",
  "scope": {
    "softwareReleaseId": "software-release:vllm-v0-29-0",
    "endpoints": [
      "/v1/chat/completions"
    ],
    "conditions": []
  },
  "limitations": [
    "آزمون سرتاسری API انجام نشده است."
  ],
  "evidenceIds": [
    "evidence:api-vllm-v1-chat-completions-chat"
  ]
});
apiCompatibility.push({
  "id": "api-compatibility:vllm-v1-embeddings-embedding-vectors",
  "protocol": "HTTP JSON / OpenAI-style",
  "endpoint": "/v1/embeddings",
  "capability": "embedding vectors",
  "status": "supported",
  "provision": "native",
  "scope": {
    "softwareReleaseId": "software-release:vllm-v0-29-0",
    "endpoints": [
      "/v1/embeddings"
    ],
    "conditions": []
  },
  "limitations": [
    "آزمون سرتاسری API انجام نشده است."
  ],
  "evidenceIds": [
    "evidence:api-vllm-v1-embeddings-embedding-vectors"
  ]
});
apiCompatibility.push({
  "id": "api-compatibility:sglang-v1-chat-completions-chat",
  "protocol": "HTTP JSON / OpenAI-style",
  "endpoint": "/v1/chat/completions",
  "capability": "chat",
  "status": "supported",
  "provision": "native",
  "scope": {
    "softwareReleaseId": "software-release:sglang-v0-5-19",
    "endpoints": [
      "/v1/chat/completions"
    ],
    "conditions": []
  },
  "limitations": [
    "آزمون سرتاسری API انجام نشده است."
  ],
  "evidenceIds": [
    "evidence:api-sglang-v1-chat-completions-chat"
  ]
});
apiCompatibility.push({
  "id": "api-compatibility:transformers-v1-chat-completions-chat",
  "protocol": "HTTP JSON / OpenAI-style",
  "endpoint": "/v1/chat/completions",
  "capability": "chat",
  "status": "supported",
  "provision": "native",
  "scope": {
    "softwareReleaseId": "software-release:transformers-v5-17-0",
    "endpoints": [
      "/v1/chat/completions"
    ],
    "conditions": []
  },
  "limitations": [
    "آزمون سرتاسری API انجام نشده است."
  ],
  "evidenceIds": [
    "evidence:api-transformers-v1-chat-completions-chat"
  ]
});
apiCompatibility.push({
  "id": "api-compatibility:tensorrt-llm-v1-chat-completions-chat",
  "protocol": "HTTP JSON / OpenAI-style",
  "endpoint": "/v1/chat/completions",
  "capability": "chat",
  "status": "supported",
  "provision": "native",
  "scope": {
    "softwareReleaseId": "software-release:tensorrt-llm-v1-2-1",
    "endpoints": [
      "/v1/chat/completions"
    ],
    "conditions": []
  },
  "limitations": [
    "آزمون سرتاسری API انجام نشده است."
  ],
  "evidenceIds": [
    "evidence:api-tensorrt-llm-v1-chat-completions-chat"
  ]
});
apiCompatibility.push({
  "id": "api-compatibility:audit-ollama-chat",
  "protocol": "OpenAI-compatible HTTP JSON",
  "endpoint": "/v1/chat/completions",
  "capability": "chat",
  "status": "conditional",
  "provision": "native",
  "scope": {
    "softwareReleaseId": "software-release:ollama-v0-34-0",
    "endpoints": [
      "/v1/chat/completions"
    ],
    "conditions": [
      "پشتیبانی قابلیت به مدل و endpoint وابسته است؛ هم‌ارزی کامل با API اصلی ادعا نشده است."
    ]
  },
  "limitations": [
    "مستندات بررسی‌شده در ۲۰۲۶-۰۹-۱۶؛ آزمون سرتاسری انجام نشده است."
  ],
  "evidenceIds": [
    "evidence:audit-20260916-ollama-openai-api"
  ]
});
apiCompatibility.push({
  "id": "api-compatibility:audit-ollama-embeddings",
  "protocol": "OpenAI-compatible HTTP JSON",
  "endpoint": "/v1/embeddings",
  "capability": "embeddings",
  "status": "conditional",
  "provision": "native",
  "scope": {
    "softwareReleaseId": "software-release:ollama-v0-34-0",
    "endpoints": [
      "/v1/embeddings"
    ],
    "conditions": [
      "پشتیبانی قابلیت به مدل و endpoint وابسته است؛ هم‌ارزی کامل با API اصلی ادعا نشده است."
    ]
  },
  "limitations": [
    "مستندات بررسی‌شده در ۲۰۲۶-۰۹-۱۶؛ آزمون سرتاسری انجام نشده است."
  ],
  "evidenceIds": [
    "evidence:audit-20260916-ollama-openai-api"
  ]
});
apiCompatibility.push({
  "id": "api-compatibility:audit-ollama-responses",
  "protocol": "OpenAI-compatible HTTP JSON",
  "endpoint": "/v1/responses",
  "capability": "responses",
  "status": "conditional",
  "provision": "native",
  "scope": {
    "softwareReleaseId": "software-release:ollama-v0-34-0",
    "endpoints": [
      "/v1/responses"
    ],
    "conditions": [
      "پشتیبانی قابلیت به مدل و endpoint وابسته است؛ هم‌ارزی کامل با API اصلی ادعا نشده است."
    ]
  },
  "limitations": [
    "مستندات بررسی‌شده در ۲۰۲۶-۰۹-۱۶؛ آزمون سرتاسری انجام نشده است."
  ],
  "evidenceIds": [
    "evidence:audit-20260916-ollama-openai-api"
  ]
});
apiCompatibility.push({
  "id": "api-compatibility:audit-lm-studio-chat",
  "protocol": "OpenAI-compatible HTTP JSON",
  "endpoint": "/v1/chat/completions",
  "capability": "chat",
  "status": "conditional",
  "provision": "native",
  "scope": {
    "softwareReleaseId": "software-release:lm-studio-0-4-24-build-1",
    "endpoints": [
      "/v1/chat/completions"
    ],
    "conditions": [
      "پشتیبانی قابلیت به مدل و endpoint وابسته است؛ هم‌ارزی کامل با API اصلی ادعا نشده است."
    ]
  },
  "limitations": [
    "مستندات بررسی‌شده در ۲۰۲۶-۰۹-۱۶؛ آزمون سرتاسری انجام نشده است."
  ],
  "evidenceIds": [
    "evidence:audit-20260916-lm-studio-openai-api"
  ]
});
apiCompatibility.push({
  "id": "api-compatibility:audit-lm-studio-embeddings",
  "protocol": "OpenAI-compatible HTTP JSON",
  "endpoint": "/v1/embeddings",
  "capability": "embeddings",
  "status": "conditional",
  "provision": "native",
  "scope": {
    "softwareReleaseId": "software-release:lm-studio-0-4-24-build-1",
    "endpoints": [
      "/v1/embeddings"
    ],
    "conditions": [
      "پشتیبانی قابلیت به مدل و endpoint وابسته است؛ هم‌ارزی کامل با API اصلی ادعا نشده است."
    ]
  },
  "limitations": [
    "مستندات بررسی‌شده در ۲۰۲۶-۰۹-۱۶؛ آزمون سرتاسری انجام نشده است."
  ],
  "evidenceIds": [
    "evidence:audit-20260916-lm-studio-openai-api"
  ]
});
apiCompatibility.push({
  "id": "api-compatibility:audit-lm-studio-responses",
  "protocol": "OpenAI-compatible HTTP JSON",
  "endpoint": "/v1/responses",
  "capability": "responses",
  "status": "conditional",
  "provision": "native",
  "scope": {
    "softwareReleaseId": "software-release:lm-studio-0-4-24-build-1",
    "endpoints": [
      "/v1/responses"
    ],
    "conditions": [
      "پشتیبانی قابلیت به مدل و endpoint وابسته است؛ هم‌ارزی کامل با API اصلی ادعا نشده است."
    ]
  },
  "limitations": [
    "مستندات بررسی‌شده در ۲۰۲۶-۰۹-۱۶؛ آزمون سرتاسری انجام نشده است."
  ],
  "evidenceIds": [
    "evidence:audit-20260916-lm-studio-openai-api"
  ]
});
