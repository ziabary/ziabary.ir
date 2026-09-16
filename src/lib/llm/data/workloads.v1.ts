// Generated from data/llm/v0.3.0/repository.json by scripts/generate-llm-dataset.py.
import type { LlmGuideRepository } from '../schema';

export const workloads: LlmGuideRepository['workloads'] = [];
workloads.push({
  "id": "workload:baai-bge-m3-retrieval-evaluation-pending",
  "name": "بازیابی ترکیبی سند در RAG — الگوی وظیفه",
  "applicationId": "enterprise-rag",
  "inputLength": {
    "state": "not-measured"
  },
  "outputLength": {
    "state": "not-measured"
  },
  "contextLength": {
    "state": "not-measured"
  },
  "batchSize": {
    "state": "not-measured"
  },
  "concurrency": {
    "state": "not-measured"
  },
  "arrivalRate": {
    "state": "not-measured"
  },
  "reasoningMode": {
    "state": "not-applicable"
  },
  "reasoningBudget": {
    "state": "not-applicable"
  },
  "subapplicationId": "retrieval"
});
workloads.push({
  "id": "workload:baai-bge-reranker-v2-m3-retrieval-evaluation-pending",
  "name": "مرتب‌کردن دوبارهٔ اسناد بازیابی‌شده — الگوی وظیفه",
  "applicationId": "enterprise-rag",
  "inputLength": {
    "state": "not-measured"
  },
  "outputLength": {
    "state": "not-measured"
  },
  "contextLength": {
    "state": "not-measured"
  },
  "batchSize": {
    "state": "not-measured"
  },
  "concurrency": {
    "state": "not-measured"
  },
  "arrivalRate": {
    "state": "not-measured"
  },
  "reasoningMode": {
    "state": "not-applicable"
  },
  "reasoningBudget": {
    "state": "not-applicable"
  },
  "subapplicationId": "reranking"
});
workloads.push({
  "id": "workload:qwen-qwen3-embedding-0-6b-retrieval-evaluation-pending",
  "name": "بازیابی برداری با کوچک‌ترین Qwen3 Embedding — الگوی وظیفه",
  "applicationId": "enterprise-rag",
  "inputLength": {
    "state": "not-measured"
  },
  "outputLength": {
    "state": "not-measured"
  },
  "contextLength": {
    "state": "not-measured"
  },
  "batchSize": {
    "state": "not-measured"
  },
  "concurrency": {
    "state": "not-measured"
  },
  "arrivalRate": {
    "state": "not-measured"
  },
  "reasoningMode": {
    "state": "not-applicable"
  },
  "reasoningBudget": {
    "state": "not-applicable"
  },
  "subapplicationId": "retrieval"
});
workloads.push({
  "id": "workload:qwen-qwen3-embedding-4b-retrieval-evaluation-pending",
  "name": "نمایه‌سازی چندزبانه با بردار قابل تنظیم — الگوی وظیفه",
  "applicationId": "enterprise-rag",
  "inputLength": {
    "state": "not-measured"
  },
  "outputLength": {
    "state": "not-measured"
  },
  "contextLength": {
    "state": "not-measured"
  },
  "batchSize": {
    "state": "not-measured"
  },
  "concurrency": {
    "state": "not-measured"
  },
  "arrivalRate": {
    "state": "not-measured"
  },
  "reasoningMode": {
    "state": "not-applicable"
  },
  "reasoningBudget": {
    "state": "not-applicable"
  },
  "subapplicationId": "retrieval"
});
workloads.push({
  "id": "workload:qwen-qwen3-embedding-8b-retrieval-evaluation-pending",
  "name": "بازیابی سند با بزرگ‌ترین Qwen3 Embedding فهرست — الگوی وظیفه",
  "applicationId": "enterprise-rag",
  "inputLength": {
    "state": "not-measured"
  },
  "outputLength": {
    "state": "not-measured"
  },
  "contextLength": {
    "state": "not-measured"
  },
  "batchSize": {
    "state": "not-measured"
  },
  "concurrency": {
    "state": "not-measured"
  },
  "arrivalRate": {
    "state": "not-measured"
  },
  "reasoningMode": {
    "state": "not-applicable"
  },
  "reasoningBudget": {
    "state": "not-applicable"
  },
  "subapplicationId": "retrieval"
});
workloads.push({
  "id": "workload:qwen-qwen3-reranker-0-6b-retrieval-evaluation-pending",
  "name": "بازرتبه‌بندی سبک‌تر در خانوادهٔ Qwen3 — الگوی وظیفه",
  "applicationId": "enterprise-rag",
  "inputLength": {
    "state": "not-measured"
  },
  "outputLength": {
    "state": "not-measured"
  },
  "contextLength": {
    "state": "not-measured"
  },
  "batchSize": {
    "state": "not-measured"
  },
  "concurrency": {
    "state": "not-measured"
  },
  "arrivalRate": {
    "state": "not-measured"
  },
  "reasoningMode": {
    "state": "not-applicable"
  },
  "reasoningBudget": {
    "state": "not-applicable"
  },
  "subapplicationId": "reranking"
});
workloads.push({
  "id": "workload:qwen-qwen3-reranker-4b-retrieval-evaluation-pending",
  "name": "بازرتبه‌بندی دستورپذیر اسناد نامزد — الگوی وظیفه",
  "applicationId": "enterprise-rag",
  "inputLength": {
    "state": "not-measured"
  },
  "outputLength": {
    "state": "not-measured"
  },
  "contextLength": {
    "state": "not-measured"
  },
  "batchSize": {
    "state": "not-measured"
  },
  "concurrency": {
    "state": "not-measured"
  },
  "arrivalRate": {
    "state": "not-measured"
  },
  "reasoningMode": {
    "state": "not-applicable"
  },
  "reasoningBudget": {
    "state": "not-applicable"
  },
  "subapplicationId": "reranking"
});
workloads.push({
  "id": "workload:qwen-qwen3-reranker-8b-retrieval-evaluation-pending",
  "name": "بازرتبه‌بندی با نسخهٔ هشت‌میلیاردی Qwen3 — الگوی وظیفه",
  "applicationId": "enterprise-rag",
  "inputLength": {
    "state": "not-measured"
  },
  "outputLength": {
    "state": "not-measured"
  },
  "contextLength": {
    "state": "not-measured"
  },
  "batchSize": {
    "state": "not-measured"
  },
  "concurrency": {
    "state": "not-measured"
  },
  "arrivalRate": {
    "state": "not-measured"
  },
  "reasoningMode": {
    "state": "not-applicable"
  },
  "reasoningBudget": {
    "state": "not-applicable"
  },
  "subapplicationId": "reranking"
});
workloads.push({
  "id": "workload:intfloat-multilingual-e5-small-retrieval-evaluation-pending",
  "name": "بازیابی چندزبانه با بردار کم‌بُعد — الگوی وظیفه",
  "applicationId": "enterprise-rag",
  "inputLength": {
    "state": "not-measured"
  },
  "outputLength": {
    "state": "not-measured"
  },
  "contextLength": {
    "state": "not-measured"
  },
  "batchSize": {
    "state": "not-measured"
  },
  "concurrency": {
    "state": "not-measured"
  },
  "arrivalRate": {
    "state": "not-measured"
  },
  "reasoningMode": {
    "state": "not-applicable"
  },
  "reasoningBudget": {
    "state": "not-applicable"
  },
  "subapplicationId": "retrieval"
});
workloads.push({
  "id": "workload:v03-sentence-transformers-all-minilm-l6-v2-retrieval",
  "name": "بردارساز سبک انگلیسی برای جست‌وجو و خوشه‌بندی",
  "applicationId": "enterprise-rag",
  "subapplicationId": "retrieval",
  "inputLength": {
    "state": "not-measured"
  },
  "outputLength": {
    "state": "not-applicable"
  },
  "contextLength": {
    "state": "known",
    "value": 256,
    "evidenceIds": [
      "evidence:v03-9c825c8b7ff67b8e2e"
    ],
    "unit": "token",
    "note": "حد ورودی مسیر مصرف مدل در کارت رسمی؛ برای مدل‌های زوجی، طول پرسش و سند با هم محاسبه می‌شود."
  },
  "batchSize": {
    "state": "not-measured"
  },
  "concurrency": {
    "state": "not-measured"
  },
  "arrivalRate": {
    "state": "not-applicable"
  },
  "reasoningMode": {
    "state": "not-applicable"
  },
  "reasoningBudget": {
    "state": "not-applicable"
  }
});
workloads.push({
  "id": "workload:v03-intfloat-multilingual-e5-base-retrieval",
  "name": "بردارساز چندزبانه با پیشوند مجزای پرسش و سند",
  "applicationId": "enterprise-rag",
  "subapplicationId": "retrieval",
  "inputLength": {
    "state": "not-measured"
  },
  "outputLength": {
    "state": "not-applicable"
  },
  "contextLength": {
    "state": "known",
    "value": 512,
    "evidenceIds": [
      "evidence:v03-647a6dc4d6b4cce867"
    ],
    "unit": "token",
    "note": "حد ورودی مسیر مصرف مدل در کارت رسمی؛ برای مدل‌های زوجی، طول پرسش و سند با هم محاسبه می‌شود."
  },
  "batchSize": {
    "state": "not-measured"
  },
  "concurrency": {
    "state": "not-measured"
  },
  "arrivalRate": {
    "state": "not-applicable"
  },
  "reasoningMode": {
    "state": "not-applicable"
  },
  "reasoningBudget": {
    "state": "not-applicable"
  }
});
workloads.push({
  "id": "workload:v03-intfloat-multilingual-e5-large-retrieval",
  "name": "بردارساز چندزبانه برای جست‌وجوی معنایی",
  "applicationId": "enterprise-rag",
  "subapplicationId": "retrieval",
  "inputLength": {
    "state": "not-measured"
  },
  "outputLength": {
    "state": "not-applicable"
  },
  "contextLength": {
    "state": "known",
    "value": 512,
    "evidenceIds": [
      "evidence:v03-c8765fd75612ce9bda"
    ],
    "unit": "token",
    "note": "حد ورودی مسیر مصرف مدل در کارت رسمی؛ برای مدل‌های زوجی، طول پرسش و سند با هم محاسبه می‌شود."
  },
  "batchSize": {
    "state": "not-measured"
  },
  "concurrency": {
    "state": "not-measured"
  },
  "arrivalRate": {
    "state": "not-applicable"
  },
  "reasoningMode": {
    "state": "not-applicable"
  },
  "reasoningBudget": {
    "state": "not-applicable"
  }
});
workloads.push({
  "id": "workload:v03-baai-bge-small-en-v1-5-retrieval",
  "name": "بردارساز کوچک انگلیسی برای بازیابی اسناد",
  "applicationId": "enterprise-rag",
  "subapplicationId": "retrieval",
  "inputLength": {
    "state": "not-measured"
  },
  "outputLength": {
    "state": "not-applicable"
  },
  "contextLength": {
    "state": "known",
    "value": 512,
    "evidenceIds": [
      "evidence:v03-f20cf032d0b3ba91f5"
    ],
    "unit": "token",
    "note": "حد ورودی مسیر مصرف مدل در کارت رسمی؛ برای مدل‌های زوجی، طول پرسش و سند با هم محاسبه می‌شود."
  },
  "batchSize": {
    "state": "not-measured"
  },
  "concurrency": {
    "state": "not-measured"
  },
  "arrivalRate": {
    "state": "not-applicable"
  },
  "reasoningMode": {
    "state": "not-applicable"
  },
  "reasoningBudget": {
    "state": "not-applicable"
  }
});
workloads.push({
  "id": "workload:v03-baai-bge-reranker-base-reranking",
  "name": "بازرتبه‌بند انگلیسی و چینی برای نتایج جست‌وجو",
  "applicationId": "enterprise-rag",
  "subapplicationId": "reranking",
  "inputLength": {
    "state": "not-measured"
  },
  "outputLength": {
    "state": "not-applicable"
  },
  "contextLength": {
    "state": "known",
    "value": 512,
    "evidenceIds": [
      "evidence:v03-59ea9a6b606782ac4a"
    ],
    "unit": "token",
    "note": "حد ورودی مسیر مصرف مدل در کارت رسمی؛ برای مدل‌های زوجی، طول پرسش و سند با هم محاسبه می‌شود."
  },
  "batchSize": {
    "state": "not-measured"
  },
  "concurrency": {
    "state": "not-measured"
  },
  "arrivalRate": {
    "state": "not-applicable"
  },
  "reasoningMode": {
    "state": "not-applicable"
  },
  "reasoningBudget": {
    "state": "not-applicable"
  }
});
workloads.push({
  "id": "workload:v03-google-embeddinggemma-300m-retrieval",
  "name": "بردارساز چندزبانه کوچک برای اجرا روی دستگاه",
  "applicationId": "enterprise-rag",
  "subapplicationId": "retrieval",
  "inputLength": {
    "state": "not-measured"
  },
  "outputLength": {
    "state": "not-applicable"
  },
  "contextLength": {
    "state": "known",
    "value": 2048,
    "evidenceIds": [
      "evidence:v03-4fc4be5e247f489a27"
    ],
    "unit": "token",
    "note": "حد ورودی مسیر مصرف مدل در کارت رسمی؛ برای مدل‌های زوجی، طول پرسش و سند با هم محاسبه می‌شود."
  },
  "batchSize": {
    "state": "not-measured"
  },
  "concurrency": {
    "state": "not-measured"
  },
  "arrivalRate": {
    "state": "not-applicable"
  },
  "reasoningMode": {
    "state": "not-applicable"
  },
  "reasoningBudget": {
    "state": "not-applicable"
  }
});
workloads.push({
  "id": "workload:v03-jinaai-jina-embeddings-v3-retrieval",
  "name": "بردارساز چندزبانه با آداپترهای وابسته به وظیفه",
  "applicationId": "enterprise-rag",
  "subapplicationId": "retrieval",
  "inputLength": {
    "state": "not-measured"
  },
  "outputLength": {
    "state": "not-applicable"
  },
  "contextLength": {
    "state": "known",
    "value": 8192,
    "evidenceIds": [
      "evidence:v03-133e75dac7f5e254f9"
    ],
    "unit": "token",
    "note": "حد ورودی مسیر مصرف مدل در کارت رسمی؛ برای مدل‌های زوجی، طول پرسش و سند با هم محاسبه می‌شود."
  },
  "batchSize": {
    "state": "not-measured"
  },
  "concurrency": {
    "state": "not-measured"
  },
  "arrivalRate": {
    "state": "not-applicable"
  },
  "reasoningMode": {
    "state": "not-applicable"
  },
  "reasoningBudget": {
    "state": "not-applicable"
  }
});
workloads.push({
  "id": "workload:v03-jinaai-jina-reranker-v2-base-multilingual-reranking",
  "name": "بازرتبه‌بند چندزبانه برای اسناد بلندتر",
  "applicationId": "enterprise-rag",
  "subapplicationId": "reranking",
  "inputLength": {
    "state": "not-measured"
  },
  "outputLength": {
    "state": "not-applicable"
  },
  "contextLength": {
    "state": "known",
    "value": 1024,
    "evidenceIds": [
      "evidence:v03-d6e73357bf96ab362e"
    ],
    "unit": "token",
    "note": "حد ورودی مسیر مصرف مدل در کارت رسمی؛ برای مدل‌های زوجی، طول پرسش و سند با هم محاسبه می‌شود."
  },
  "batchSize": {
    "state": "not-measured"
  },
  "concurrency": {
    "state": "not-measured"
  },
  "arrivalRate": {
    "state": "not-applicable"
  },
  "reasoningMode": {
    "state": "not-applicable"
  },
  "reasoningBudget": {
    "state": "not-applicable"
  }
});
workloads.push({
  "id": "workload:v03-mixedbread-ai-mxbai-embed-large-v1-retrieval",
  "name": "بردارساز انگلیسی برای بازیابی با دستور پرسش",
  "applicationId": "enterprise-rag",
  "subapplicationId": "retrieval",
  "inputLength": {
    "state": "not-measured"
  },
  "outputLength": {
    "state": "not-applicable"
  },
  "contextLength": {
    "state": "known",
    "value": 512,
    "evidenceIds": [
      "evidence:v03-27b58c9e3c734925b5"
    ],
    "unit": "token",
    "note": "حد پیکربندی منتشرشده؛ ورودی و خروجی و نشانه‌های ویژه از همین بودجه استفاده می‌کنند."
  },
  "batchSize": {
    "state": "not-measured"
  },
  "concurrency": {
    "state": "not-measured"
  },
  "arrivalRate": {
    "state": "not-applicable"
  },
  "reasoningMode": {
    "state": "not-applicable"
  },
  "reasoningBudget": {
    "state": "not-applicable"
  }
});
workloads.push({
  "id": "workload:v03-nomic-ai-nomic-embed-text-v1-5-retrieval",
  "name": "بردارساز انگلیسی با زمینهٔ بلند و ابعاد قابل کاهش",
  "applicationId": "enterprise-rag",
  "subapplicationId": "retrieval",
  "inputLength": {
    "state": "not-measured"
  },
  "outputLength": {
    "state": "not-applicable"
  },
  "contextLength": {
    "state": "known",
    "value": 8192,
    "evidenceIds": [
      "evidence:v03-934bd541e054349d80"
    ],
    "unit": "token",
    "note": "حد ورودی مسیر مصرف مدل در کارت رسمی؛ برای مدل‌های زوجی، طول پرسش و سند با هم محاسبه می‌شود."
  },
  "batchSize": {
    "state": "not-measured"
  },
  "concurrency": {
    "state": "not-measured"
  },
  "arrivalRate": {
    "state": "not-applicable"
  },
  "reasoningMode": {
    "state": "not-applicable"
  },
  "reasoningBudget": {
    "state": "not-applicable"
  }
});
workloads.push({
  "id": "workload:v03-answerdotai-modernbert-base-classification",
  "name": "رمزگذار پایه برای آموزش دسته‌بندی و استخراج موجودیت",
  "applicationId": "structured-extraction",
  "subapplicationId": "classification",
  "inputLength": {
    "state": "not-measured"
  },
  "outputLength": {
    "state": "not-applicable"
  },
  "contextLength": {
    "state": "known",
    "value": 8192,
    "evidenceIds": [
      "evidence:v03-d718589d95531a0aef"
    ],
    "unit": "token",
    "note": "حد پیکربندی منتشرشده؛ ورودی و خروجی و نشانه‌های ویژه از همین بودجه استفاده می‌کنند."
  },
  "batchSize": {
    "state": "not-measured"
  },
  "concurrency": {
    "state": "not-measured"
  },
  "arrivalRate": {
    "state": "not-applicable"
  },
  "reasoningMode": {
    "state": "not-applicable"
  },
  "reasoningBudget": {
    "state": "not-applicable"
  }
});
workloads.push({
  "id": "workload:audit-intfloat-multilingual-e5-large-instruct",
  "name": "multilingual-e5-large-instruct · بازیابی متن",
  "applicationId": "enterprise-rag",
  "language": "fa",
  "evidenceIds": [
    "evidence:audit-20260916-intfloat-multilingual-e5-large-instruct",
    "evidence:audit-20260916-intfloat-multilingual-e5-large-instruct-config",
    "evidence:audit-20260916-intfloat-multilingual-e5-large-instruct-files"
  ],
  "inputLength": {
    "state": "not-measured"
  },
  "outputLength": {
    "state": "not-measured"
  },
  "contextLength": {
    "state": "not-measured"
  },
  "batchSize": {
    "state": "not-measured"
  },
  "concurrency": {
    "state": "not-measured"
  },
  "arrivalRate": {
    "state": "not-measured"
  },
  "reasoningMode": {
    "state": "not-measured"
  },
  "reasoningBudget": {
    "state": "not-measured"
  }
});
workloads.push({
  "id": "workload:audit-partai-tooka-sbert-v2-small",
  "name": "Tooka-SBERT-V2-Small · بازیابی متن",
  "applicationId": "enterprise-rag",
  "language": "fa",
  "evidenceIds": [
    "evidence:audit-20260916-partai-tooka-sbert-v2-small",
    "evidence:audit-20260916-partai-tooka-sbert-v2-small-config",
    "evidence:audit-20260916-partai-tooka-sbert-v2-small-files"
  ],
  "inputLength": {
    "state": "not-measured"
  },
  "outputLength": {
    "state": "not-measured"
  },
  "contextLength": {
    "state": "not-measured"
  },
  "batchSize": {
    "state": "not-measured"
  },
  "concurrency": {
    "state": "not-measured"
  },
  "arrivalRate": {
    "state": "not-measured"
  },
  "reasoningMode": {
    "state": "not-measured"
  },
  "reasoningBudget": {
    "state": "not-measured"
  }
});
workloads.push({
  "id": "workload:audit-partai-tooka-sbert-v2-large",
  "name": "Tooka-SBERT-V2-Large · بازیابی متن",
  "applicationId": "enterprise-rag",
  "language": "fa",
  "evidenceIds": [
    "evidence:audit-20260916-partai-tooka-sbert-v2-large",
    "evidence:audit-20260916-partai-tooka-sbert-v2-large-config",
    "evidence:audit-20260916-partai-tooka-sbert-v2-large-files"
  ],
  "inputLength": {
    "state": "not-measured"
  },
  "outputLength": {
    "state": "not-measured"
  },
  "contextLength": {
    "state": "not-measured"
  },
  "batchSize": {
    "state": "not-measured"
  },
  "concurrency": {
    "state": "not-measured"
  },
  "arrivalRate": {
    "state": "not-measured"
  },
  "reasoningMode": {
    "state": "not-measured"
  },
  "reasoningBudget": {
    "state": "not-measured"
  }
});
workloads.push({
  "id": "workload:audit-hooshvarelab-bert-base-parsbert-uncased",
  "name": "bert-base-parsbert-uncased · آموزش دسته‌بندی و تشخیص موجودیت",
  "applicationId": "structured-extraction",
  "language": "fa",
  "evidenceIds": [
    "evidence:audit-20260916-hooshvarelab-bert-base-parsbert-uncased",
    "evidence:audit-20260916-hooshvarelab-bert-base-parsbert-uncased-config",
    "evidence:audit-20260916-hooshvarelab-bert-base-parsbert-uncased-files"
  ],
  "inputLength": {
    "state": "not-measured"
  },
  "outputLength": {
    "state": "not-measured"
  },
  "contextLength": {
    "state": "not-measured"
  },
  "batchSize": {
    "state": "not-measured"
  },
  "concurrency": {
    "state": "not-measured"
  },
  "arrivalRate": {
    "state": "not-measured"
  },
  "reasoningMode": {
    "state": "not-measured"
  },
  "reasoningBudget": {
    "state": "not-measured"
  }
});
