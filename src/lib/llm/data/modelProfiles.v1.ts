// Generated from data/llm/v0.3.0/repository.json by scripts/generate-llm-dataset.py.
import type { LlmGuideRepository } from '../schema';

export const modelProfiles: LlmGuideRepository['modelProfiles'] = [];
modelProfiles.push({
  "id": "model-profile:baai-bge-m3",
  "modelVersionId": "model:baai-bge-m3",
  "introduction": "سه خروجی متراکم، تنک و چندبرداری در یک مدل؛ بیش از ۱۰۰ زبان، ورودی ۸٬۱۹۲ توکن و بردار متراکم ۱٬۰۲۴بُعدی.",
  "roleSummary": "بازیابی ترکیبی سند در RAG",
  "distinguishingFeatures": [
    "سه خروجی متراکم، تنک و چندبرداری در یک مدل؛ بیش از ۱۰۰ زبان، ورودی ۸٬۱۹۲ توکن و بردار متراکم ۱٬۰۲۴بُعدی."
  ],
  "languageSummary": "چندزبانه",
  "officialUrl": "https://huggingface.co/BAAI/bge-m3",
  "runGuides": [
    {
      "label": "هر سه خروجی با FlagEmbedding",
      "engine": "FlagEmbedding",
      "href": "https://huggingface.co/BAAI/bge-m3#usage",
      "instructions": "وابستگی‌ها: torch و FlagEmbedding. خروجی: بردار متراکم، وزن توکن و چندبرداری.",
      "conditions": [
        "دقت وزن در این فرمان FP32 است؛ حداقل حافظه و سرعت اندازه‌گیری نشده‌اند."
      ],
      "evidenceIds": [
        "evidence:baai-bge-m3-card"
      ],
      "code": "from FlagEmbedding import BGEM3FlagModel\nmodel = BGEM3FlagModel(\"BAAI/bge-m3\", use_fp16=False)\nresult = model.encode([\"A document about information retrieval.\"],\n    return_dense=True, return_sparse=True, return_colbert_vecs=True)\nprint(result[\"dense_vecs\"].shape)\nprint(result[\"lexical_weights\"])\nprint(result[\"colbert_vecs\"][0].shape)",
      "codeLanguage": "python"
    },
    {
      "label": "دریافت و اجرای بستهٔ Ollama",
      "engine": "Ollama",
      "href": "https://ollama.com/library/bge-m3:567m",
      "conditions": [
        "API /api/embed فقط بردار dense می‌دهد؛ برای sparse و ColBERT از FlagEmbedding استفاده کنید. truncate پیش‌فرض فعال است؛ false ورودی بیش‌ازحد را به خطا تبدیل می‌کند."
      ],
      "code": "ollama pull bge-m3:567m\ncurl http://localhost:11434/api/embed -d '{\"model\": \"bge-m3:567m\", \"input\": \"متن نمونه\"}'",
      "codeLanguage": "bash",
      "evidenceIds": [
        "evidence:v03-efe7c40b7a73fcae36"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:baai-bge-m3-card",
    "evidence:baai-bge-m3-metadata",
    "evidence:baai-bge-m3-parameters",
    "evidence:baai-bge-m3-license",
    "evidence:baai-bge-m3-context",
    "evidence:baai-bge-m3-config",
    "evidence:four-tables-release-bge-m3-release",
    "evidence:four-tables-baai-bge-m3-size",
    "evidence:v03-777ef26411272524f0",
    "evidence:v03-cbc52e397505f0aff0"
  ]
});
modelProfiles.push({
  "id": "model-profile:baai-bge-reranker-v2-m3",
  "modelVersionId": "model:baai-bge-reranker-v2-m3",
  "introduction": "پرسش و سند را با هم می‌خواند و امتیاز ارتباط می‌دهد؛ مکمل مرحلهٔ بازیابی BGE-M3 است.",
  "roleSummary": "مرتب‌کردن دوبارهٔ اسناد بازیابی‌شده",
  "distinguishingFeatures": [
    "پرسش و سند را با هم می‌خواند و امتیاز ارتباط می‌دهد؛ مکمل مرحلهٔ بازیابی BGE-M3 است."
  ],
  "languageSummary": "چندزبانه",
  "officialUrl": "https://huggingface.co/BAAI/bge-reranker-v2-m3",
  "runGuides": [
    {
      "label": "راهنمای اجرای bge-reranker-v2-m3",
      "engine": "FlagEmbedding",
      "href": "https://huggingface.co/BAAI/bge-reranker-v2-m3",
      "instructions": "وابستگی‌ها: torch و FlagEmbedding. ورودی: جفت پرسش و سند؛ خروجی: امتیاز ارتباط.",
      "conditions": [
        "ابتدا تعداد محدودی سند بازیابی کنید؛ امتیاز sigmoid احتمال درستی پاسخ نیست و خروجی مدل، embedding نیست."
      ],
      "evidenceIds": [
        "evidence:baai-bge-reranker-v2-m3-card"
      ],
      "code": "from FlagEmbedding import FlagReranker\nmodel = FlagReranker(\"BAAI/bge-reranker-v2-m3\", use_fp16=False)\nscores = model.compute_score([\n    [\"What is RAG?\", \"RAG uses retrieved documents to ground an answer.\"]\n], normalize=True)\nprint(scores)",
      "codeLanguage": "python"
    },
    {
      "label": "راه‌اندازی با Transformers",
      "engine": "Transformers",
      "href": "https://huggingface.co/BAAI/bge-reranker-v2-m3/raw/953dc6f6f85a1b2dbfca4c34a2796e7dde08d41e/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-58a5bdf947caf4133d"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:baai-bge-reranker-v2-m3-card",
    "evidence:baai-bge-reranker-v2-m3-metadata",
    "evidence:baai-bge-reranker-v2-m3-parameters",
    "evidence:baai-bge-reranker-v2-m3-license",
    "evidence:baai-bge-reranker-v2-m3-context",
    "evidence:baai-bge-reranker-v2-m3-config",
    "evidence:four-tables-release-bge-reranker-v2-release",
    "evidence:four-tables-baai-bge-reranker-v2-m3-size",
    "evidence:v03-58a5bdf947caf4133d",
    "evidence:v03-9252ab55786d951482"
  ]
});
modelProfiles.push({
  "id": "model-profile:coherelabs-aya-expanse-32b",
  "modelVersionId": "model:coherelabs-aya-expanse-32b",
  "introduction": "نسخهٔ ۳۲میلیاردی Aya Expanse با زمینهٔ ۱۳۱٬۰۷۲ توکن؛ فارسی در فهرست ۲۳ زبان ناشر آمده است.",
  "roleSummary": "نگارش و گفت‌وگوی چندزبانه با اسناد بلند",
  "distinguishingFeatures": [
    "نسخهٔ ۳۲میلیاردی Aya Expanse با زمینهٔ ۱۳۱٬۰۷۲ توکن؛ فارسی در فهرست ۲۳ زبان ناشر آمده است."
  ],
  "languageSummary": "زبان‌های اعلام‌شده: انگلیسی، فرانسوی، آلمانی، اسپانیایی، ایتالیایی، پرتغالی، ژاپنی، کره‌ای، چینی، عربی، یونانی، فارسی، لهستانی، اندونزیایی و زبان‌های دیگر.",
  "officialUrl": "https://huggingface.co/CohereLabs/aya-expanse-32b",
  "runGuides": [
    {
      "label": "راهنمای اجرای aya-expanse-32b",
      "engine": "unknown",
      "href": "https://huggingface.co/CohereLabs/aya-expanse-32b",
      "conditions": [
        "دقت پاسخ در ورودی بلند را با پرسش‌هایی از ابتدا، میانه و انتهای سند بسنجید."
      ],
      "evidenceIds": [
        "evidence:coherelabs-aya-expanse-32b-card"
      ],
      "engineLabel": "مسیر اجرای ناشر"
    },
    {
      "label": "راه‌اندازی با Transformers",
      "engine": "Transformers",
      "href": "https://huggingface.co/CohereLabs/aya-expanse-32b",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-50519b37f3fc26b4a5"
      ]
    },
    {
      "label": "راه‌اندازی با vLLM",
      "engine": "vLLM",
      "href": "https://huggingface.co/CohereLabs/aya-expanse-32b",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-50519b37f3fc26b4a5"
      ]
    },
    {
      "label": "راه‌اندازی با SGLang",
      "engine": "SGLang",
      "href": "https://huggingface.co/CohereLabs/aya-expanse-32b",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-50519b37f3fc26b4a5"
      ]
    },
    {
      "label": "راه‌اندازی با llama.cpp",
      "engine": "llama.cpp",
      "href": "https://huggingface.co/CohereLabs/aya-expanse-32b",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-50519b37f3fc26b4a5"
      ]
    },
    {
      "label": "دریافت و اجرای بستهٔ Ollama",
      "engine": "Ollama",
      "href": "https://ollama.com/library/aya-expanse:32b",
      "conditions": [],
      "code": "ollama pull aya-expanse:32b\nollama run aya-expanse:32b",
      "codeLanguage": "bash",
      "evidenceIds": [
        "evidence:v03-6894a4e3b593d967d8"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:coherelabs-aya-expanse-32b-card",
    "evidence:coherelabs-aya-expanse-32b-metadata",
    "evidence:coherelabs-aya-expanse-32b-parameters",
    "evidence:coherelabs-aya-expanse-32b-license",
    "evidence:coherelabs-aya-expanse-32b-context",
    "evidence:four-tables-release-aya-expanse-release",
    "evidence:v03-50519b37f3fc26b4a5",
    "evidence:v03-5d1109f7e91f534197"
  ]
});
modelProfiles.push({
  "id": "model-profile:coherelabs-aya-expanse-8b",
  "modelVersionId": "model:coherelabs-aya-expanse-8b",
  "introduction": "نسخهٔ ۸میلیاردی Aya Expanse، با زمینهٔ ۸٬۱۹۲ توکن و آموزش ترجیحات چندزبانه، برای آزمایش نگارش فارسی نیز قابل بررسی است.",
  "roleSummary": "دستیار نوشتن و بازنویسی چندزبانه",
  "distinguishingFeatures": [
    "نسخهٔ ۸میلیاردی Aya Expanse، با زمینهٔ ۸٬۱۹۲ توکن و آموزش ترجیحات چندزبانه، برای آزمایش نگارش فارسی نیز قابل بررسی است."
  ],
  "languageSummary": "زبان‌های اعلام‌شده: انگلیسی، فرانسوی، آلمانی، اسپانیایی، ایتالیایی، پرتغالی، ژاپنی، کره‌ای، چینی، عربی، یونانی، فارسی، لهستانی، اندونزیایی و زبان‌های دیگر.",
  "officialUrl": "https://huggingface.co/CohereLabs/aya-expanse-8b",
  "runGuides": [
    {
      "label": "راهنمای اجرای aya-expanse-8b",
      "engine": "unknown",
      "href": "https://huggingface.co/CohereLabs/aya-expanse-8b",
      "conditions": [
        "نتایج نسخهٔ ۸ میلیاردی را جدا از نسخهٔ ۳۲ میلیاردی مقایسه کنید؛ سقف ورودی این دو یکسان نیست."
      ],
      "evidenceIds": [
        "evidence:coherelabs-aya-expanse-8b-card"
      ],
      "engineLabel": "مسیر اجرای ناشر"
    },
    {
      "label": "راه‌اندازی با Transformers",
      "engine": "Transformers",
      "href": "https://huggingface.co/CohereLabs/aya-expanse-8b",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-7fd37ca79c736c18bd"
      ]
    },
    {
      "label": "راه‌اندازی با vLLM",
      "engine": "vLLM",
      "href": "https://huggingface.co/CohereLabs/aya-expanse-8b",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-7fd37ca79c736c18bd"
      ]
    },
    {
      "label": "راه‌اندازی با SGLang",
      "engine": "SGLang",
      "href": "https://huggingface.co/CohereLabs/aya-expanse-8b",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-7fd37ca79c736c18bd"
      ]
    },
    {
      "label": "راه‌اندازی با llama.cpp",
      "engine": "llama.cpp",
      "href": "https://huggingface.co/CohereLabs/aya-expanse-8b",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-7fd37ca79c736c18bd"
      ]
    },
    {
      "label": "دریافت و اجرای بستهٔ Ollama",
      "engine": "Ollama",
      "href": "https://ollama.com/library/aya-expanse:8b",
      "conditions": [],
      "code": "ollama pull aya-expanse:8b\nollama run aya-expanse:8b",
      "codeLanguage": "bash",
      "evidenceIds": [
        "evidence:v03-07c93f8a14c3614250"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:coherelabs-aya-expanse-8b-card",
    "evidence:coherelabs-aya-expanse-8b-metadata",
    "evidence:coherelabs-aya-expanse-8b-parameters",
    "evidence:coherelabs-aya-expanse-8b-license",
    "evidence:coherelabs-aya-expanse-8b-context",
    "evidence:four-tables-release-aya-expanse-release",
    "evidence:v03-7fd37ca79c736c18bd",
    "evidence:v03-4ddbabd95f6220b3d9"
  ]
});
modelProfiles.push({
  "id": "model-profile:coherelabs-tiny-aya-global",
  "modelVersionId": "model:coherelabs-tiny-aya-global",
  "introduction": "شاخهٔ Global از Tiny Aya برای پوشش عمومی زبان‌ها عرضه شده؛ با نسخه‌های منطقه‌ای Earth،Fire و Water یکی نیست.",
  "roleSummary": "گفت‌وگوی محلی در زبان‌های گوناگون",
  "distinguishingFeatures": [
    "شاخهٔ Global از Tiny Aya برای پوشش عمومی زبان‌ها عرضه شده؛ با نسخه‌های منطقه‌ای Earth،Fire و Water یکی نیست."
  ],
  "languageSummary": "زبان‌های اعلام‌شده: انگلیسی، هلندی، فرانسوی، ایتالیایی، پرتغالی، رومانیایی، اسپانیایی، چکی، لهستانی، اوکراینی، روسی، یونانی، آلمانی، دانمارکی و زبان‌های دیگر.",
  "officialUrl": "https://huggingface.co/CohereLabs/tiny-aya-global",
  "runGuides": [
    {
      "label": "راهنمای اجرای tiny-aya-global",
      "engine": "unknown",
      "href": "https://huggingface.co/CohereLabs/tiny-aya-global",
      "conditions": [
        "برای کاربرد فارسی نمونه‌های خود را ارزیابی کنید؛ نسخهٔ منطقه‌ای یا مدل پایه را جایگزین بی‌بررسی این checkpoint نکنید."
      ],
      "evidenceIds": [
        "evidence:coherelabs-tiny-aya-global-card"
      ],
      "engineLabel": "مسیر اجرای ناشر"
    },
    {
      "label": "راه‌اندازی با Transformers",
      "engine": "Transformers",
      "href": "https://huggingface.co/CohereLabs/tiny-aya-global",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-690f5a70697f256add"
      ]
    },
    {
      "label": "راه‌اندازی با vLLM",
      "engine": "vLLM",
      "href": "https://huggingface.co/CohereLabs/tiny-aya-global",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-690f5a70697f256add"
      ]
    },
    {
      "label": "راه‌اندازی با SGLang",
      "engine": "SGLang",
      "href": "https://huggingface.co/CohereLabs/tiny-aya-global",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-690f5a70697f256add"
      ]
    },
    {
      "label": "راه‌اندازی با llama.cpp",
      "engine": "llama.cpp",
      "href": "https://huggingface.co/CohereLabs/tiny-aya-global",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-690f5a70697f256add"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:coherelabs-tiny-aya-global-card",
    "evidence:coherelabs-tiny-aya-global-metadata",
    "evidence:coherelabs-tiny-aya-global-parameters",
    "evidence:coherelabs-tiny-aya-global-license",
    "evidence:coherelabs-tiny-aya-global-context",
    "evidence:four-tables-release-tiny-aya-release",
    "evidence:four-tables-coherelabs-tiny-aya-global-declared-context",
    "evidence:v03-690f5a70697f256add",
    "evidence:v03-7deda675978f347e4c"
  ]
});
modelProfiles.push({
  "id": "model-profile:huggingfacetb-smollm2-1-7b-instruct",
  "modelVersionId": "model:huggingfacetb-smollm2-1-7b-instruct",
  "introduction": "بزرگ‌ترین نسخهٔ SmolLM2 در این فهرست، علاوه بر پیروی از دستور، قالب فراخوانی تابع دارد؛ این ویژگی به دو نسخهٔ کوچک‌تر تعمیم ندارد.",
  "roleSummary": "نمونه‌سازی دستیار کوچک با فراخوانی تابع",
  "distinguishingFeatures": [
    "بزرگ‌ترین نسخهٔ SmolLM2 در این فهرست، علاوه بر پیروی از دستور، قالب فراخوانی تابع دارد؛ این ویژگی به دو نسخهٔ کوچک‌تر تعمیم ندارد."
  ],
  "languageSummary": "زبان‌های اعلام‌شده: انگلیسی.",
  "officialUrl": "https://huggingface.co/HuggingFaceTB/SmolLM2-1.7B-Instruct",
  "runGuides": [
    {
      "label": "راهنمای اجرای SmolLM2-1.7B-Instruct",
      "engine": "unknown",
      "href": "https://huggingface.co/HuggingFaceTB/SmolLM2-1.7B-Instruct",
      "conditions": [
        "مدل عمدتاً انگلیسی است؛ اجرای تابع را برنامهٔ میزبان انجام می‌دهد و باید آرگومان‌ها را اعتبارسنجی کند."
      ],
      "evidenceIds": [
        "evidence:huggingfacetb-smollm2-1-7b-instruct-card"
      ],
      "engineLabel": "مسیر اجرای ناشر"
    },
    {
      "label": "راه‌اندازی با Transformers",
      "engine": "Transformers",
      "href": "https://huggingface.co/HuggingFaceTB/SmolLM2-1.7B-Instruct/raw/31b70e2e869a7173562077fd711b654946d38674/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-9c5cd7741b6bd7013a"
      ]
    },
    {
      "label": "دریافت و اجرای بستهٔ Ollama",
      "engine": "Ollama",
      "href": "https://ollama.com/library/smollm2:1.7b",
      "conditions": [],
      "code": "ollama pull smollm2:1.7b\nollama run smollm2:1.7b",
      "codeLanguage": "bash",
      "evidenceIds": [
        "evidence:v03-777b05f50d93c6b3d3"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:huggingfacetb-smollm2-1-7b-instruct-card",
    "evidence:huggingfacetb-smollm2-1-7b-instruct-metadata",
    "evidence:huggingfacetb-smollm2-1-7b-instruct-parameters",
    "evidence:huggingfacetb-smollm2-1-7b-instruct-license",
    "evidence:huggingfacetb-smollm2-1-7b-instruct-config",
    "evidence:v03-9c5cd7741b6bd7013a",
    "evidence:v03-ed596e606436e6adbc"
  ]
});
modelProfiles.push({
  "id": "model-profile:huggingfacetb-smollm2-135m-instruct",
  "modelVersionId": "model:huggingfacetb-smollm2-135m-instruct",
  "introduction": "نسخهٔ ۱۳۵میلیون‌پارامتری SmolLM2 برای نمونه‌سازی سادهٔ تولید متن و بررسی محدودیت مدل‌های کم‌حجم مناسب است.",
  "roleSummary": "آزمایش پیروی از دستور با مدل بسیار کوچک",
  "distinguishingFeatures": [
    "نسخهٔ ۱۳۵میلیون‌پارامتری SmolLM2 برای نمونه‌سازی سادهٔ تولید متن و بررسی محدودیت مدل‌های کم‌حجم مناسب است."
  ],
  "languageSummary": "زبان‌های اعلام‌شده: انگلیسی.",
  "officialUrl": "https://huggingface.co/HuggingFaceTB/SmolLM2-135M-Instruct",
  "runGuides": [
    {
      "label": "راهنمای اجرای SmolLM2-135M-Instruct",
      "engine": "unknown",
      "href": "https://huggingface.co/HuggingFaceTB/SmolLM2-135M-Instruct",
      "conditions": [
        "دامنهٔ کار را به متن کوتاه و وظیفهٔ محدود ببندید؛ از آن انتظار دانش گسترده یا ابزارخوانی نسخهٔ ۱٫۷میلیاردی نداشته باشید."
      ],
      "evidenceIds": [
        "evidence:huggingfacetb-smollm2-135m-instruct-card"
      ],
      "engineLabel": "مسیر اجرای ناشر"
    },
    {
      "label": "راه‌اندازی با Transformers",
      "engine": "Transformers",
      "href": "https://huggingface.co/HuggingFaceTB/SmolLM2-135M-Instruct/raw/12fd25f77366fa6b3b4b768ec3050bf629380bac/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-fa4d5f78d993271304"
      ]
    },
    {
      "label": "دریافت و اجرای بستهٔ Ollama",
      "engine": "Ollama",
      "href": "https://ollama.com/library/smollm2:135m",
      "conditions": [],
      "code": "ollama pull smollm2:135m\nollama run smollm2:135m",
      "codeLanguage": "bash",
      "evidenceIds": [
        "evidence:v03-465500542769a9a97f"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:huggingfacetb-smollm2-135m-instruct-card",
    "evidence:huggingfacetb-smollm2-135m-instruct-metadata",
    "evidence:huggingfacetb-smollm2-135m-instruct-parameters",
    "evidence:huggingfacetb-smollm2-135m-instruct-license",
    "evidence:huggingfacetb-smollm2-135m-instruct-config",
    "evidence:v03-fa4d5f78d993271304",
    "evidence:v03-d02395a33c4e1cbd3d"
  ]
});
modelProfiles.push({
  "id": "model-profile:huggingfacetb-smollm2-360m-instruct",
  "modelVersionId": "model:huggingfacetb-smollm2-360m-instruct",
  "introduction": "نسخهٔ ۳۶۰میلیون‌پارامتری SmolLM2 با SFT و DPO برای دستورپذیری تنظیم شده و نمونهٔ اجرای CPU در کارت مدل دارد.",
  "roleSummary": "بازنویسی و خلاصه‌سازی متن کوتاه",
  "distinguishingFeatures": [
    "نسخهٔ ۳۶۰میلیون‌پارامتری SmolLM2 با SFT و DPO برای دستورپذیری تنظیم شده و نمونهٔ اجرای CPU در کارت مدل دارد."
  ],
  "languageSummary": "زبان‌های اعلام‌شده: انگلیسی.",
  "officialUrl": "https://huggingface.co/HuggingFaceTB/SmolLM2-360M-Instruct",
  "runGuides": [
    {
      "label": "راهنمای اجرای SmolLM2-360M-Instruct",
      "engine": "Transformers",
      "href": "https://huggingface.co/HuggingFaceTB/SmolLM2-360M-Instruct",
      "instructions": "وابستگی‌ها: torch، accelerate و Transformers.",
      "conditions": [
        "تمرکز زبانی انگلیسی است؛ سرعت یا کیفیت فارسی از کوچک‌بودن مدل نتیجه نمی‌شود."
      ],
      "evidenceIds": [
        "evidence:huggingfacetb-smollm2-360m-instruct-card"
      ],
      "code": "from transformers import AutoTokenizer, AutoModelForCausalLM\nmodel_id = \"HuggingFaceTB/SmolLM2-360M-Instruct\"\ntokenizer = AutoTokenizer.from_pretrained(model_id)\nmodel = AutoModelForCausalLM.from_pretrained(model_id, device_map=\"auto\", torch_dtype=\"auto\")\nmessages = [{\"role\": \"user\", \"content\": \"Explain a Python dictionary in two sentences.\"}]\ntext = tokenizer.apply_chat_template(messages, tokenize=False,\n    add_generation_prompt=True)\ninputs = tokenizer(text, return_tensors=\"pt\").to(model.device)\noutput = model.generate(**inputs, max_new_tokens=128)\nprint(tokenizer.decode(output[0][inputs.input_ids.shape[1]:], skip_special_tokens=True))",
      "codeLanguage": "python"
    },
    {
      "label": "دریافت و اجرای بستهٔ Ollama",
      "engine": "Ollama",
      "href": "https://ollama.com/library/smollm2:360m",
      "conditions": [],
      "code": "ollama pull smollm2:360m\nollama run smollm2:360m",
      "codeLanguage": "bash",
      "evidenceIds": [
        "evidence:v03-c133b518c5925fb746"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:huggingfacetb-smollm2-360m-instruct-card",
    "evidence:huggingfacetb-smollm2-360m-instruct-metadata",
    "evidence:huggingfacetb-smollm2-360m-instruct-parameters",
    "evidence:huggingfacetb-smollm2-360m-instruct-license",
    "evidence:huggingfacetb-smollm2-360m-instruct-config",
    "evidence:v03-c4f522374a6511e10d",
    "evidence:v03-f53a4a5fef8c2c2ce1"
  ]
});
modelProfiles.push({
  "id": "model-profile:huggingfacetb-smollm3-3b",
  "modelVersionId": "model:huggingfacetb-smollm3-3b",
  "introduction": "SmolLM3 سه‌میلیاردی دو حالت پاسخ مستقیم و استدلال دارد؛ زمینهٔ آموزش ۶۵٬۵۳۶ توکن است و جزئیات آموزش منتشر شده‌اند.",
  "roleSummary": "دستیار کوچک با انتخاب حالت فکرکردن",
  "distinguishingFeatures": [
    "SmolLM3 سه‌میلیاردی دو حالت پاسخ مستقیم و استدلال دارد؛ زمینهٔ آموزش ۶۵٬۵۳۶ توکن است و جزئیات آموزش منتشر شده‌اند."
  ],
  "languageSummary": "برچسب‌های زبانی مخزن: انگلیسی، فرانسوی، اسپانیایی، ایتالیایی، پرتغالی، چینی، عربی و روسی.",
  "officialUrl": "https://huggingface.co/HuggingFaceTB/SmolLM3-3B",
  "runGuides": [
    {
      "label": "راهنمای اجرای SmolLM3-3B",
      "engine": "unknown",
      "href": "https://huggingface.co/HuggingFaceTB/SmolLM3-3B",
      "conditions": [
        "برای زمینهٔ بلندتر تنظیم YaRN لازم است. متن کارت شش زبان بومی از جمله آلمانی را نام می‌برد، اما برچسب‌های مخزن هشت زبان متفاوت دارند؛ فارسی در هیچ‌یک نیست. Transformers نسخهٔ ۴٫۵۳ یا بالاتر لازم است."
      ],
      "evidenceIds": [
        "evidence:huggingfacetb-smollm3-3b-card"
      ],
      "engineLabel": "مسیر اجرای ناشر"
    },
    {
      "label": "راه‌اندازی با Transformers",
      "engine": "Transformers",
      "href": "https://huggingface.co/HuggingFaceTB/SmolLM3-3B/raw/a07cc9a04f16550a088caea529712d1d335b0ac1/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-1cb00d19b57837ab69"
      ]
    },
    {
      "label": "راه‌اندازی با vLLM",
      "engine": "vLLM",
      "href": "https://huggingface.co/HuggingFaceTB/SmolLM3-3B/raw/a07cc9a04f16550a088caea529712d1d335b0ac1/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-1cb00d19b57837ab69"
      ]
    },
    {
      "label": "راه‌اندازی با SGLang",
      "engine": "SGLang",
      "href": "https://huggingface.co/HuggingFaceTB/SmolLM3-3B/raw/a07cc9a04f16550a088caea529712d1d335b0ac1/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-1cb00d19b57837ab69"
      ]
    },
    {
      "label": "راه‌اندازی با llama.cpp",
      "engine": "llama.cpp",
      "href": "https://huggingface.co/HuggingFaceTB/SmolLM3-3B/raw/a07cc9a04f16550a088caea529712d1d335b0ac1/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-1cb00d19b57837ab69"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:huggingfacetb-smollm3-3b-card",
    "evidence:huggingfacetb-smollm3-3b-metadata",
    "evidence:huggingfacetb-smollm3-3b-parameters",
    "evidence:huggingfacetb-smollm3-3b-license",
    "evidence:huggingfacetb-smollm3-3b-config",
    "evidence:four-tables-release-smollm3-release",
    "evidence:four-tables-huggingfacetb-smollm3-3b-declared-context",
    "evidence:v03-1cb00d19b57837ab69",
    "evidence:v03-9f2eadd707ffa13313"
  ]
});
modelProfiles.push({
  "id": "model-profile:qwen-qwen3-0-6b",
  "modelVersionId": "model:qwen-qwen3-0-6b",
  "introduction": "نسخهٔ متراکم ۰٫۶میلیاردی Qwen3 هر دو حالت thinking و non-thinking را دارد؛ فایل رسمی Q8_0 نیز موجود است.",
  "roleSummary": "نمونه‌سازی گفت‌وگو با کوچک‌ترین Qwen3",
  "distinguishingFeatures": [
    "نسخهٔ متراکم ۰٫۶میلیاردی Qwen3 هر دو حالت thinking و non-thinking را دارد؛ فایل رسمی Q8_0 نیز موجود است."
  ],
  "languageSummary": "زبان‌های اعلام‌شده: انگلیسی، فارسی، چینی، عربی، فرانسوی، آلمانی، اسپانیایی، ایتالیایی، پرتغالی، ژاپنی، کره‌ای، هندی، روسی.",
  "officialUrl": "https://huggingface.co/Qwen/Qwen3-0.6B",
  "runGuides": [
    {
      "label": "راهنمای اجرای Qwen3-0.6B",
      "engine": "unknown",
      "href": "https://huggingface.co/Qwen/Qwen3-0.6B",
      "conditions": [
        "بودجهٔ خروجی را محدود کنید؛ توانایی حل مسئلهٔ نسخه‌های بزرگ‌تر از نام مشترک خانواده استنتاج نمی‌شود."
      ],
      "evidenceIds": [
        "evidence:qwen-qwen3-0-6b-card"
      ],
      "engineLabel": "مسیر اجرای ناشر"
    },
    {
      "label": "راه‌اندازی با Transformers",
      "engine": "Transformers",
      "href": "https://huggingface.co/Qwen/Qwen3-0.6B/raw/c1899de289a04d12100db370d81485cdf75e47ca/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-21af22da05ddae881c"
      ]
    },
    {
      "label": "راه‌اندازی با vLLM",
      "engine": "vLLM",
      "href": "https://huggingface.co/Qwen/Qwen3-0.6B/raw/c1899de289a04d12100db370d81485cdf75e47ca/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-21af22da05ddae881c"
      ]
    },
    {
      "label": "راه‌اندازی با SGLang",
      "engine": "SGLang",
      "href": "https://huggingface.co/Qwen/Qwen3-0.6B/raw/c1899de289a04d12100db370d81485cdf75e47ca/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-21af22da05ddae881c"
      ]
    },
    {
      "label": "راه‌اندازی با llama.cpp",
      "engine": "llama.cpp",
      "href": "https://huggingface.co/Qwen/Qwen3-0.6B/raw/c1899de289a04d12100db370d81485cdf75e47ca/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-21af22da05ddae881c"
      ]
    },
    {
      "label": "دریافت و اجرای بستهٔ Ollama",
      "engine": "Ollama",
      "href": "https://ollama.com/library/qwen3:0.6b-q4_K_M",
      "conditions": [],
      "code": "ollama pull qwen3:0.6b-q4_K_M\nollama run qwen3:0.6b-q4_K_M",
      "codeLanguage": "bash",
      "evidenceIds": [
        "evidence:v03-6d6dfff4c57d2da798"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:qwen-qwen3-0-6b-card",
    "evidence:qwen-qwen3-0-6b-metadata",
    "evidence:qwen-qwen3-0-6b-parameters",
    "evidence:qwen-qwen3-0-6b-license",
    "evidence:qwen-qwen3-0-6b-context",
    "evidence:qwen-qwen3-0-6b-config",
    "evidence:four-tables-release-qwen3-launch",
    "evidence:v03-21af22da05ddae881c",
    "evidence:v03-e6280795e7725ad4ac"
  ]
});
modelProfiles.push({
  "id": "model-profile:qwen-qwen3-1-7b",
  "modelVersionId": "model:qwen-qwen3-1-7b",
  "introduction": "Qwen3-1.7B میان گزینه‌های زیر دو میلیارد پارامتر این فهرست قرار می‌گیرد؛ حالت پاسخ مستقیم را می‌توان از قالب پیام انتخاب کرد.",
  "roleSummary": "دستیار متنی کوچک با کنترل استدلال",
  "distinguishingFeatures": [
    "Qwen3-1.7B میان گزینه‌های زیر دو میلیارد پارامتر این فهرست قرار می‌گیرد؛ حالت پاسخ مستقیم را می‌توان از قالب پیام انتخاب کرد."
  ],
  "languageSummary": "زبان‌های اعلام‌شده: انگلیسی، فارسی، چینی، عربی، فرانسوی، آلمانی، اسپانیایی، ایتالیایی، پرتغالی، ژاپنی، کره‌ای، هندی، روسی.",
  "officialUrl": "https://huggingface.co/Qwen/Qwen3-1.7B",
  "runGuides": [
    {
      "label": "راهنمای اجرای Qwen3-1.7B",
      "engine": "unknown",
      "href": "https://huggingface.co/Qwen/Qwen3-1.7B",
      "conditions": [
        "در حالت thinking، توکن‌های استدلال نیز جزو هزینه و طول خروجی‌اند؛ GGUF رسمی این رکورد Q8_0 است."
      ],
      "evidenceIds": [
        "evidence:qwen-qwen3-1-7b-card"
      ],
      "engineLabel": "مسیر اجرای ناشر"
    },
    {
      "label": "راه‌اندازی با Transformers",
      "engine": "Transformers",
      "href": "https://huggingface.co/Qwen/Qwen3-1.7B/raw/70d244cc86ccca08cf5af4e1e306ecf908b1ad5e/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-49f96d4bca8be6d031"
      ]
    },
    {
      "label": "راه‌اندازی با vLLM",
      "engine": "vLLM",
      "href": "https://huggingface.co/Qwen/Qwen3-1.7B/raw/70d244cc86ccca08cf5af4e1e306ecf908b1ad5e/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-49f96d4bca8be6d031"
      ]
    },
    {
      "label": "راه‌اندازی با SGLang",
      "engine": "SGLang",
      "href": "https://huggingface.co/Qwen/Qwen3-1.7B/raw/70d244cc86ccca08cf5af4e1e306ecf908b1ad5e/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-49f96d4bca8be6d031"
      ]
    },
    {
      "label": "راه‌اندازی با llama.cpp",
      "engine": "llama.cpp",
      "href": "https://huggingface.co/Qwen/Qwen3-1.7B/raw/70d244cc86ccca08cf5af4e1e306ecf908b1ad5e/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-49f96d4bca8be6d031"
      ]
    },
    {
      "label": "دریافت و اجرای بستهٔ Ollama",
      "engine": "Ollama",
      "href": "https://ollama.com/library/qwen3:1.7b-q4_K_M",
      "conditions": [],
      "code": "ollama pull qwen3:1.7b-q4_K_M\nollama run qwen3:1.7b-q4_K_M",
      "codeLanguage": "bash",
      "evidenceIds": [
        "evidence:v03-3264dd4270fc33dc0d"
      ]
    },
    {
      "engine": "MLX LM",
      "label": "MLX LM · Qwen3-1.7B-4bit",
      "href": "https://huggingface.co/mlx-community/Qwen3-1.7B-4bit/blob/3b1b1768f8f8cf8351c712464f906e86c2b8269e/README.md",
      "conditions": [
        "Apple silicon · MLX 4-bit · mlx-lm 0.24.0"
      ],
      "instructions": "وزن تبدیل‌شدهٔ همین مخزن روی Mac دارای Apple silicon؛ نسخهٔ درج‌شده مربوط به تبدیل و مثال کارت است.",
      "evidenceIds": [
        "evidence:update0919-mlx-qwen3-1.7b-4bit"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:qwen-qwen3-1-7b-card",
    "evidence:qwen-qwen3-1-7b-metadata",
    "evidence:qwen-qwen3-1-7b-parameters",
    "evidence:qwen-qwen3-1-7b-license",
    "evidence:qwen-qwen3-1-7b-context",
    "evidence:qwen-qwen3-1-7b-config",
    "evidence:four-tables-release-qwen3-launch",
    "evidence:v03-49f96d4bca8be6d031",
    "evidence:v03-f4af1bdd23931614a8"
  ]
});
modelProfiles.push({
  "id": "model-profile:qwen-qwen3-14b",
  "modelVersionId": "model:qwen-qwen3-14b",
  "introduction": "Qwen3-14B یک مدل متراکم با دو حالت پاسخ است؛ نسخه‌های رسمی GGUF برای انتخاب دقت وزن در دسترس‌اند.",
  "roleSummary": "تولید و تحلیل متن با Qwen3 متراکم",
  "distinguishingFeatures": [
    "Qwen3-14B یک مدل متراکم با دو حالت پاسخ است؛ نسخه‌های رسمی GGUF برای انتخاب دقت وزن در دسترس‌اند."
  ],
  "languageSummary": "زبان‌های اعلام‌شده: انگلیسی، فارسی، چینی، عربی، فرانسوی، آلمانی، اسپانیایی، ایتالیایی، پرتغالی، ژاپنی، کره‌ای، هندی، روسی.",
  "officialUrl": "https://huggingface.co/Qwen/Qwen3-14B",
  "runGuides": [
    {
      "label": "راهنمای اجرای Qwen3-14B",
      "engine": "unknown",
      "href": "https://huggingface.co/Qwen/Qwen3-14B",
      "conditions": [
        "بسته‌های Q4_K_M و Q8_0 در دسترس‌اند؛ سرعت و کیفیت آن‌ها در این راهنما آزموده نشده است."
      ],
      "evidenceIds": [
        "evidence:qwen-qwen3-14b-card"
      ],
      "engineLabel": "مسیر اجرای ناشر"
    },
    {
      "label": "راه‌اندازی با Transformers",
      "engine": "Transformers",
      "href": "https://huggingface.co/Qwen/Qwen3-14B/raw/40c069824f4251a91eefaf281ebe4c544efd3e18/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-02c6053d6bac907d15"
      ]
    },
    {
      "label": "راه‌اندازی با vLLM",
      "engine": "vLLM",
      "href": "https://huggingface.co/Qwen/Qwen3-14B/raw/40c069824f4251a91eefaf281ebe4c544efd3e18/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-02c6053d6bac907d15"
      ]
    },
    {
      "label": "راه‌اندازی با SGLang",
      "engine": "SGLang",
      "href": "https://huggingface.co/Qwen/Qwen3-14B/raw/40c069824f4251a91eefaf281ebe4c544efd3e18/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-02c6053d6bac907d15"
      ]
    },
    {
      "label": "راه‌اندازی با llama.cpp",
      "engine": "llama.cpp",
      "href": "https://huggingface.co/Qwen/Qwen3-14B/raw/40c069824f4251a91eefaf281ebe4c544efd3e18/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-02c6053d6bac907d15"
      ]
    },
    {
      "label": "دریافت و اجرای بستهٔ Ollama",
      "engine": "Ollama",
      "href": "https://ollama.com/library/qwen3:14b-q4_K_M",
      "conditions": [],
      "code": "ollama pull qwen3:14b-q4_K_M\nollama run qwen3:14b-q4_K_M",
      "codeLanguage": "bash",
      "evidenceIds": [
        "evidence:v03-ded680fa6178108dad"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:qwen-qwen3-14b-card",
    "evidence:qwen-qwen3-14b-metadata",
    "evidence:qwen-qwen3-14b-parameters",
    "evidence:qwen-qwen3-14b-license",
    "evidence:qwen-qwen3-14b-context",
    "evidence:qwen-qwen3-14b-config",
    "evidence:four-tables-release-qwen3-launch",
    "evidence:v03-02c6053d6bac907d15",
    "evidence:v03-b09711a16e1512597f"
  ]
});
modelProfiles.push({
  "id": "model-profile:qwen-qwen3-30b-a3b",
  "modelVersionId": "model:qwen-qwen3-30b-a3b",
  "introduction": "Qwen3-30B-A3B از خبرگان انتخابی استفاده می‌کند و از الگوی Qwen-Agent برای اتصال ابزارها بهره می‌برد.",
  "roleSummary": "دستیار ابزارمحور با معماری MoE",
  "distinguishingFeatures": [
    "Qwen3-30B-A3B از خبرگان انتخابی استفاده می‌کند و از الگوی Qwen-Agent برای اتصال ابزارها بهره می‌برد."
  ],
  "languageSummary": "زبان‌های اعلام‌شده: انگلیسی، فارسی، چینی، عربی، فرانسوی، آلمانی، اسپانیایی، ایتالیایی، پرتغالی، ژاپنی، کره‌ای، هندی، روسی.",
  "officialUrl": "https://huggingface.co/Qwen/Qwen3-30B-A3B",
  "runGuides": [
    {
      "label": "راهنمای اجرای Qwen3-30B-A3B",
      "engine": "unknown",
      "href": "https://huggingface.co/Qwen/Qwen3-30B-A3B",
      "conditions": [
        "شمار پارامتر فعال، جای حجم کل وزن را در برآورد حافظه نمی‌گیرد؛ مدل باید با قالب پیام و parser سازگار اجرا شود."
      ],
      "evidenceIds": [
        "evidence:qwen-qwen3-30b-a3b-card"
      ],
      "engineLabel": "مسیر اجرای ناشر"
    },
    {
      "label": "راه‌اندازی با Transformers",
      "engine": "Transformers",
      "href": "https://huggingface.co/Qwen/Qwen3-30B-A3B/raw/ad44e777bcd18fa416d9da3bd8f70d33ebb85d39/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-3fbdfa840af9cf314f"
      ]
    },
    {
      "label": "راه‌اندازی با vLLM",
      "engine": "vLLM",
      "href": "https://huggingface.co/Qwen/Qwen3-30B-A3B/raw/ad44e777bcd18fa416d9da3bd8f70d33ebb85d39/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-3fbdfa840af9cf314f"
      ]
    },
    {
      "label": "راه‌اندازی با SGLang",
      "engine": "SGLang",
      "href": "https://huggingface.co/Qwen/Qwen3-30B-A3B/raw/ad44e777bcd18fa416d9da3bd8f70d33ebb85d39/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-3fbdfa840af9cf314f"
      ]
    },
    {
      "label": "راه‌اندازی با llama.cpp",
      "engine": "llama.cpp",
      "href": "https://huggingface.co/Qwen/Qwen3-30B-A3B/raw/ad44e777bcd18fa416d9da3bd8f70d33ebb85d39/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-3fbdfa840af9cf314f"
      ]
    },
    {
      "label": "دریافت و اجرای بستهٔ Ollama",
      "engine": "Ollama",
      "href": "https://ollama.com/library/qwen3:30b-a3b-q4_K_M",
      "conditions": [],
      "code": "ollama pull qwen3:30b-a3b-q4_K_M\nollama run qwen3:30b-a3b-q4_K_M",
      "codeLanguage": "bash",
      "evidenceIds": [
        "evidence:v03-1572c0d53a06861cf5"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:qwen-qwen3-30b-a3b-card",
    "evidence:qwen-qwen3-30b-a3b-metadata",
    "evidence:qwen-qwen3-30b-a3b-parameters",
    "evidence:qwen-qwen3-30b-a3b-license",
    "evidence:qwen-qwen3-30b-a3b-context",
    "evidence:qwen-qwen3-30b-a3b-config",
    "evidence:four-tables-release-qwen3-launch",
    "evidence:v03-3fbdfa840af9cf314f",
    "evidence:v03-07e08c793e53cc334e"
  ]
});
modelProfiles.push({
  "id": "model-profile:qwen-qwen3-32b",
  "modelVersionId": "model:qwen-qwen3-32b",
  "introduction": "Qwen3-32B برخلاف نسخهٔ 30B-A3B معماری متراکم دارد؛ حالت استدلال را می‌توان متناسب با پیچیدگی پرسش تنظیم کرد.",
  "roleSummary": "تحلیل چندمرحله‌ای با نسخهٔ متراکم بزرگ Qwen3",
  "distinguishingFeatures": [
    "Qwen3-32B برخلاف نسخهٔ 30B-A3B معماری متراکم دارد؛ حالت استدلال را می‌توان متناسب با پیچیدگی پرسش تنظیم کرد."
  ],
  "languageSummary": "زبان‌های اعلام‌شده: انگلیسی، فارسی، چینی، عربی، فرانسوی، آلمانی، اسپانیایی، ایتالیایی، پرتغالی، ژاپنی، کره‌ای، هندی، روسی.",
  "officialUrl": "https://huggingface.co/Qwen/Qwen3-32B",
  "runGuides": [
    {
      "label": "راهنمای اجرای Qwen3-32B",
      "engine": "unknown",
      "href": "https://huggingface.co/Qwen/Qwen3-32B",
      "conditions": [
        "برای مقایسهٔ پاسخ مستقیم و thinking، طول خروجی و شرایط یکسان نگه داشته شود؛ این معرفی رتبهٔ کیفیت نیست."
      ],
      "evidenceIds": [
        "evidence:qwen-qwen3-32b-card"
      ],
      "engineLabel": "مسیر اجرای ناشر"
    },
    {
      "label": "راه‌اندازی با Transformers",
      "engine": "Transformers",
      "href": "https://huggingface.co/Qwen/Qwen3-32B/raw/9216db5781bf21249d130ec9da846c4624c16137/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-eee862b4eceaa376da"
      ]
    },
    {
      "label": "راه‌اندازی با vLLM",
      "engine": "vLLM",
      "href": "https://huggingface.co/Qwen/Qwen3-32B/raw/9216db5781bf21249d130ec9da846c4624c16137/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-eee862b4eceaa376da"
      ]
    },
    {
      "label": "راه‌اندازی با SGLang",
      "engine": "SGLang",
      "href": "https://huggingface.co/Qwen/Qwen3-32B/raw/9216db5781bf21249d130ec9da846c4624c16137/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-eee862b4eceaa376da"
      ]
    },
    {
      "label": "راه‌اندازی با llama.cpp",
      "engine": "llama.cpp",
      "href": "https://huggingface.co/Qwen/Qwen3-32B/raw/9216db5781bf21249d130ec9da846c4624c16137/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-eee862b4eceaa376da"
      ]
    },
    {
      "label": "دریافت و اجرای بستهٔ Ollama",
      "engine": "Ollama",
      "href": "https://ollama.com/library/qwen3:32b-q4_K_M",
      "conditions": [],
      "code": "ollama pull qwen3:32b-q4_K_M\nollama run qwen3:32b-q4_K_M",
      "codeLanguage": "bash",
      "evidenceIds": [
        "evidence:v03-c27644b29376a31a53"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:qwen-qwen3-32b-card",
    "evidence:qwen-qwen3-32b-metadata",
    "evidence:qwen-qwen3-32b-parameters",
    "evidence:qwen-qwen3-32b-license",
    "evidence:qwen-qwen3-32b-context",
    "evidence:qwen-qwen3-32b-config",
    "evidence:four-tables-release-qwen3-launch",
    "evidence:v03-eee862b4eceaa376da",
    "evidence:v03-b053ad2e41f49215c0"
  ]
});
modelProfiles.push({
  "id": "model-profile:qwen-qwen3-4b",
  "modelVersionId": "model:qwen-qwen3-4b",
  "introduction": "Qwen3-4B امکان تغییر حالت thinking را در یک checkpoint ارائه می‌کند؛ GGUF رسمی با چند روش کوانت دارد.",
  "roleSummary": "دستیار عمومی در اندازهٔ چهار میلیارد",
  "distinguishingFeatures": [
    "Qwen3-4B امکان تغییر حالت thinking را در یک checkpoint ارائه می‌کند؛ GGUF رسمی با چند روش کوانت دارد."
  ],
  "languageSummary": "زبان‌های اعلام‌شده: انگلیسی، فارسی، چینی، عربی، فرانسوی، آلمانی، اسپانیایی، ایتالیایی، پرتغالی، ژاپنی، کره‌ای، هندی، روسی.",
  "officialUrl": "https://huggingface.co/Qwen/Qwen3-4B",
  "runGuides": [
    {
      "label": "راهنمای اجرای Qwen3-4B",
      "engine": "unknown",
      "href": "https://huggingface.co/Qwen/Qwen3-4B",
      "conditions": [
        "زمینهٔ بومی ۳۲٬۷۶۸ توکن است؛ افزایش آن به تنظیمات توسعهٔ زمینه وابسته است."
      ],
      "evidenceIds": [
        "evidence:qwen-qwen3-4b-card"
      ],
      "engineLabel": "مسیر اجرای ناشر"
    },
    {
      "label": "راه‌اندازی با Transformers",
      "engine": "Transformers",
      "href": "https://huggingface.co/Qwen/Qwen3-4B/raw/1cfa9a7208912126459214e8b04321603b3df60c/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-5438c7e36f3bb1bdd2"
      ]
    },
    {
      "label": "راه‌اندازی با vLLM",
      "engine": "vLLM",
      "href": "https://huggingface.co/Qwen/Qwen3-4B/raw/1cfa9a7208912126459214e8b04321603b3df60c/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-5438c7e36f3bb1bdd2"
      ]
    },
    {
      "label": "راه‌اندازی با SGLang",
      "engine": "SGLang",
      "href": "https://huggingface.co/Qwen/Qwen3-4B/raw/1cfa9a7208912126459214e8b04321603b3df60c/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-5438c7e36f3bb1bdd2"
      ]
    },
    {
      "label": "راه‌اندازی با llama.cpp",
      "engine": "llama.cpp",
      "href": "https://huggingface.co/Qwen/Qwen3-4B/raw/1cfa9a7208912126459214e8b04321603b3df60c/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-5438c7e36f3bb1bdd2"
      ]
    },
    {
      "label": "دریافت و اجرای بستهٔ Ollama",
      "engine": "Ollama",
      "href": "https://ollama.com/library/qwen3:4b-q4_K_M",
      "conditions": [],
      "code": "ollama pull qwen3:4b-q4_K_M\nollama run qwen3:4b-q4_K_M",
      "codeLanguage": "bash",
      "evidenceIds": [
        "evidence:v03-a2ac4f3809ce2e79ba"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:qwen-qwen3-4b-card",
    "evidence:qwen-qwen3-4b-metadata",
    "evidence:qwen-qwen3-4b-parameters",
    "evidence:qwen-qwen3-4b-license",
    "evidence:qwen-qwen3-4b-context",
    "evidence:qwen-qwen3-4b-config",
    "evidence:four-tables-release-qwen3-launch",
    "evidence:v03-5438c7e36f3bb1bdd2",
    "evidence:v03-2b0f967a1c3c10cc9f"
  ]
});
modelProfiles.push({
  "id": "model-profile:qwen-qwen3-8b",
  "modelVersionId": "model:qwen-qwen3-8b",
  "introduction": "Qwen3-8B مدل عمومی متراکم با ۸٫۲میلیارد پارامتر اعلام‌شده است؛ پاسخ مستقیم و reasoning را در قالب پیام انتخاب می‌کنید.",
  "roleSummary": "گفت‌وگو و کار با متن با کنترل فکرکردن",
  "distinguishingFeatures": [
    "Qwen3-8B مدل عمومی متراکم با ۸٫۲میلیارد پارامتر اعلام‌شده است؛ پاسخ مستقیم و reasoning را در قالب پیام انتخاب می‌کنید."
  ],
  "languageSummary": "زبان‌های اعلام‌شده: انگلیسی، فارسی، چینی، عربی، فرانسوی، آلمانی، اسپانیایی، ایتالیایی، پرتغالی، ژاپنی، کره‌ای، هندی، روسی.",
  "officialUrl": "https://huggingface.co/Qwen/Qwen3-8B",
  "runGuides": [
    {
      "label": "راهنمای اجرای Qwen3-8B",
      "engine": "Transformers",
      "href": "https://huggingface.co/Qwen/Qwen3-8B",
      "instructions": "وابستگی‌ها: torch، accelerate و Transformers.",
      "conditions": [
        "برای شروع محلی، فایل‌های رسمی Q4_K_M و Q8_0 موجودند؛ کیفیت یا حافظهٔ اجرای آن‌ها در این راهنما اندازه‌گیری نشده است.",
        "Transformers نسخهٔ ۴٫۵۱ یا بالاتر لازم است."
      ],
      "evidenceIds": [
        "evidence:qwen-qwen3-8b-card"
      ],
      "code": "from transformers import AutoTokenizer, AutoModelForCausalLM\nmodel_id = \"Qwen/Qwen3-8B\"\ntokenizer = AutoTokenizer.from_pretrained(model_id)\nmodel = AutoModelForCausalLM.from_pretrained(model_id, device_map=\"auto\", torch_dtype=\"auto\")\nmessages = [{\"role\": \"user\", \"content\": \"Explain a Python dictionary in two sentences.\"}]\ntext = tokenizer.apply_chat_template(messages, tokenize=False,\n    add_generation_prompt=True, enable_thinking=False)\ninputs = tokenizer(text, return_tensors=\"pt\").to(model.device)\noutput = model.generate(**inputs, max_new_tokens=128)\nprint(tokenizer.decode(output[0][inputs.input_ids.shape[1]:], skip_special_tokens=True))",
      "codeLanguage": "python"
    },
    {
      "label": "راه‌اندازی با vLLM",
      "engine": "vLLM",
      "href": "https://huggingface.co/Qwen/Qwen3-8B/raw/b968826d9c46dd6066d109eabc6255188de91218/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-83f599b0dc739c8491"
      ]
    },
    {
      "label": "راه‌اندازی با SGLang",
      "engine": "SGLang",
      "href": "https://huggingface.co/Qwen/Qwen3-8B/raw/b968826d9c46dd6066d109eabc6255188de91218/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-83f599b0dc739c8491"
      ]
    },
    {
      "label": "راه‌اندازی با llama.cpp",
      "engine": "llama.cpp",
      "href": "https://huggingface.co/Qwen/Qwen3-8B/raw/b968826d9c46dd6066d109eabc6255188de91218/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-83f599b0dc739c8491"
      ]
    },
    {
      "label": "دریافت و اجرای بستهٔ Ollama",
      "engine": "Ollama",
      "href": "https://ollama.com/library/qwen3:8b-q4_K_M",
      "conditions": [],
      "code": "ollama pull qwen3:8b-q4_K_M\nollama run qwen3:8b-q4_K_M",
      "codeLanguage": "bash",
      "evidenceIds": [
        "evidence:v03-2b0521c098a4b9d928"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:qwen-qwen3-8b-card",
    "evidence:qwen-qwen3-8b-metadata",
    "evidence:qwen-qwen3-8b-parameters",
    "evidence:qwen-qwen3-8b-license",
    "evidence:qwen-qwen3-8b-context",
    "evidence:qwen-qwen3-8b-config",
    "evidence:four-tables-release-qwen3-launch",
    "evidence:v03-83f599b0dc739c8491",
    "evidence:v03-67d48db1f25765c0ea"
  ]
});
modelProfiles.push({
  "id": "model-profile:qwen-qwen3-coder-30b-a3b-instruct",
  "modelVersionId": "model:qwen-qwen3-coder-30b-a3b-instruct",
  "introduction": "Qwen3-Coder-30B-A3B-Instruct برای تولید کد، ویرایش مخزن و گردش‌کار عامل برنامه‌نویسی تنظیم شده؛ زمینهٔ بومی ۲۶۲٬۱۴۴ توکن دارد.",
  "roleSummary": "اصلاح مخزن کد با دستیار ابزارمحور",
  "distinguishingFeatures": [
    "Qwen3-Coder-30B-A3B-Instruct برای تولید کد، ویرایش مخزن و گردش‌کار عامل برنامه‌نویسی تنظیم شده؛ زمینهٔ بومی ۲۶۲٬۱۴۴ توکن دارد."
  ],
  "officialUrl": "https://huggingface.co/Qwen/Qwen3-Coder-30B-A3B-Instruct",
  "runGuides": [
    {
      "label": "راهنمای اجرای Qwen3-Coder-30B-A3B-Instruct",
      "engine": "Transformers",
      "href": "https://huggingface.co/Qwen/Qwen3-Coder-30B-A3B-Instruct",
      "instructions": "وابستگی‌ها: torch، accelerate و Transformers.",
      "conditions": [
        "این نسخه non-thinking است؛ قالب فراخوانی ابزار مخصوص Coder را رعایت کنید و آن را با Qwen3-30B-A3B عمومی یکی نگیرید.",
        "Transformers نسخهٔ ۴٫۵۱ یا بالاتر لازم است."
      ],
      "evidenceIds": [
        "evidence:qwen-qwen3-coder-30b-a3b-instruct-card"
      ],
      "code": "from transformers import AutoTokenizer, AutoModelForCausalLM\nmodel_id = \"Qwen/Qwen3-Coder-30B-A3B-Instruct\"\ntokenizer = AutoTokenizer.from_pretrained(model_id)\nmodel = AutoModelForCausalLM.from_pretrained(model_id, device_map=\"auto\", torch_dtype=\"auto\")\nmessages = [{\"role\": \"user\", \"content\": \"Explain a Python dictionary in two sentences.\"}]\ntext = tokenizer.apply_chat_template(messages, tokenize=False,\n    add_generation_prompt=True)\ninputs = tokenizer(text, return_tensors=\"pt\").to(model.device)\noutput = model.generate(**inputs, max_new_tokens=128)\nprint(tokenizer.decode(output[0][inputs.input_ids.shape[1]:], skip_special_tokens=True))",
      "codeLanguage": "python"
    },
    {
      "label": "راه‌اندازی با llama.cpp",
      "engine": "llama.cpp",
      "href": "https://huggingface.co/Qwen/Qwen3-Coder-30B-A3B-Instruct/raw/b2cff646eb4bb1d68355c01b18ae02e7cf42d120/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-504a98b0928e421cf9"
      ]
    },
    {
      "label": "دریافت و اجرای بستهٔ Ollama",
      "engine": "Ollama",
      "href": "https://ollama.com/library/qwen3-coder:30b-a3b-q4_K_M",
      "conditions": [],
      "code": "ollama pull qwen3-coder:30b-a3b-q4_K_M\nollama run qwen3-coder:30b-a3b-q4_K_M",
      "codeLanguage": "bash",
      "evidenceIds": [
        "evidence:v03-8053ead9742dcf81b6"
      ]
    },
    {
      "label": "سرویس‌دهی با vLLM",
      "engine": "vLLM",
      "href": "https://huggingface.co/Qwen/Qwen3-Coder-30B-A3B-Instruct",
      "instructions": "مسیر سرویس‌دهی در کارت رسمی همین checkpoint",
      "conditions": [
        "برای ابزارخوانی، parser و chat template معرفی‌شده در راهنمای همین checkpoint لازم است."
      ],
      "evidenceIds": [
        "evidence:qwen-qwen3-coder-30b-a3b-instruct-card"
      ]
    },
    {
      "label": "سرویس‌دهی با SGLang",
      "engine": "SGLang",
      "href": "https://huggingface.co/Qwen/Qwen3-Coder-30B-A3B-Instruct",
      "instructions": "مسیر سرویس‌دهی در کارت رسمی همین checkpoint",
      "conditions": [
        "برای ابزارخوانی، parser و chat template معرفی‌شده در راهنمای همین checkpoint لازم است."
      ],
      "evidenceIds": [
        "evidence:qwen-qwen3-coder-30b-a3b-instruct-card"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:qwen-qwen3-coder-30b-a3b-instruct-card",
    "evidence:qwen-qwen3-coder-30b-a3b-instruct-metadata",
    "evidence:qwen-qwen3-coder-30b-a3b-instruct-parameters",
    "evidence:qwen-qwen3-coder-30b-a3b-instruct-license",
    "evidence:qwen-qwen3-coder-30b-a3b-instruct-context",
    "evidence:qwen-qwen3-coder-30b-a3b-instruct-config",
    "evidence:v03-504a98b0928e421cf9",
    "evidence:v03-e598f90a8959674b74"
  ]
});
modelProfiles.push({
  "id": "model-profile:qwen-qwen3-embedding-0-6b",
  "modelVersionId": "model:qwen-qwen3-embedding-0-6b",
  "introduction": "نسخهٔ ۰٫۶میلیاردی، embedding دستورپذیر با حداکثر ۱٬۰۲۴ بُعد و ورودی ۳۲٬۷۶۸ توکن تولید می‌کند.",
  "roleSummary": "بازیابی برداری با کوچک‌ترین Qwen3 Embedding",
  "distinguishingFeatures": [
    "نسخهٔ ۰٫۶میلیاردی، embedding دستورپذیر با حداکثر ۱٬۰۲۴ بُعد و ورودی ۳۲٬۷۶۸ توکن تولید می‌کند."
  ],
  "languageSummary": "چندزبانه",
  "officialUrl": "https://huggingface.co/Qwen/Qwen3-Embedding-0.6B",
  "runGuides": [
    {
      "label": "راهنمای اجرای Qwen3-Embedding-0.6B",
      "engine": "Sentence Transformers",
      "href": "https://huggingface.co/Qwen/Qwen3-Embedding-0.6B",
      "instructions": "خروجی این مسیر بردار متن است.",
      "conditions": [
        "دستور وظیفه را به query اضافه کنید؛ سندها باید با همان مدل و تنظیم ابعاد نمایه‌سازی شوند."
      ],
      "evidenceIds": [
        "evidence:qwen-qwen3-embedding-0-6b-card"
      ]
    },
    {
      "label": "راه‌اندازی با Transformers",
      "engine": "Transformers",
      "href": "https://huggingface.co/Qwen/Qwen3-Embedding-0.6B/raw/97b0c614be4d77ee51c0cef4e5f07c00f9eb65b3/README.md",
      "conditions": [
        "دستور وظیفه فقط به پرسش اضافه شود؛ بردار آخرین توکن معتبر با attention mask گرفته و با L2 نرمال شود."
      ],
      "evidenceIds": [
        "evidence:v03-9c2800b7ad736cfb03"
      ]
    },
    {
      "label": "دریافت و اجرای بستهٔ Ollama",
      "engine": "Ollama",
      "href": "https://ollama.com/library/qwen3-embedding:0.6b",
      "conditions": [],
      "code": "ollama pull qwen3-embedding:0.6b\ncurl http://localhost:11434/api/embed -d '{\"model\": \"qwen3-embedding:0.6b\", \"input\": \"متن نمونه\"}'",
      "codeLanguage": "bash",
      "evidenceIds": [
        "evidence:v03-e3305375deb56e1547"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:qwen-qwen3-embedding-0-6b-card",
    "evidence:qwen-qwen3-embedding-0-6b-metadata",
    "evidence:qwen-qwen3-embedding-0-6b-parameters",
    "evidence:qwen-qwen3-embedding-0-6b-license",
    "evidence:qwen-qwen3-embedding-0-6b-context",
    "evidence:qwen-qwen3-embedding-0-6b-config",
    "evidence:four-tables-release-qwen3-embedding-launch",
    "evidence:v03-9c2800b7ad736cfb03",
    "evidence:v03-988cbb1f7406a866c0"
  ]
});
modelProfiles.push({
  "id": "model-profile:qwen-qwen3-embedding-4b",
  "modelVersionId": "model:qwen-qwen3-embedding-4b",
  "introduction": "Qwen3-Embedding-4B خروجی تا ۲٬۵۶۰ بُعد دارد و برای تطبیق بردار با وظیفه از دستور query استفاده می‌کند.",
  "roleSummary": "نمایه‌سازی چندزبانه با بردار قابل تنظیم",
  "distinguishingFeatures": [
    "Qwen3-Embedding-4B خروجی تا ۲٬۵۶۰ بُعد دارد و برای تطبیق بردار با وظیفه از دستور query استفاده می‌کند."
  ],
  "languageSummary": "چندزبانه",
  "officialUrl": "https://huggingface.co/Qwen/Qwen3-Embedding-4B",
  "runGuides": [
    {
      "label": "راهنمای اجرای Qwen3-Embedding-4B",
      "engine": "Sentence Transformers",
      "href": "https://huggingface.co/Qwen/Qwen3-Embedding-4B",
      "instructions": "خروجی این مسیر بردار متن است.",
      "conditions": [
        "کاهش بُعد نیازمند آزمون کیفیت بازیابی روی مجموعهٔ واقعی شماست؛ عدد MTEB جانشین این آزمون نیست."
      ],
      "evidenceIds": [
        "evidence:qwen-qwen3-embedding-4b-card"
      ]
    },
    {
      "label": "راه‌اندازی با Transformers",
      "engine": "Transformers",
      "href": "https://huggingface.co/Qwen/Qwen3-Embedding-4B/raw/5cf2132abc99cad020ac570b19d031efec650f2b/README.md",
      "conditions": [
        "دستور وظیفه فقط به پرسش اضافه شود؛ بردار آخرین توکن معتبر با attention mask گرفته و با L2 نرمال شود."
      ],
      "evidenceIds": [
        "evidence:v03-4fef68d668f81bf206"
      ]
    },
    {
      "label": "دریافت و اجرای بستهٔ Ollama",
      "engine": "Ollama",
      "href": "https://ollama.com/library/qwen3-embedding:4b",
      "conditions": [],
      "code": "ollama pull qwen3-embedding:4b\ncurl http://localhost:11434/api/embed -d '{\"model\": \"qwen3-embedding:4b\", \"input\": \"متن نمونه\"}'",
      "codeLanguage": "bash",
      "evidenceIds": [
        "evidence:v03-1fc2740de76b8d522b"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:qwen-qwen3-embedding-4b-card",
    "evidence:qwen-qwen3-embedding-4b-metadata",
    "evidence:qwen-qwen3-embedding-4b-parameters",
    "evidence:qwen-qwen3-embedding-4b-license",
    "evidence:qwen-qwen3-embedding-4b-context",
    "evidence:qwen-qwen3-embedding-4b-config",
    "evidence:four-tables-release-qwen3-embedding-launch",
    "evidence:v03-4fef68d668f81bf206",
    "evidence:v03-321667e8b3fb819a52"
  ]
});
modelProfiles.push({
  "id": "model-profile:qwen-qwen3-embedding-8b",
  "modelVersionId": "model:qwen-qwen3-embedding-8b",
  "introduction": "Qwen3-Embedding-8B تا ۴٬۰۹۶ بُعد و زمینهٔ ۳۲٬۷۶۸ توکن دارد؛ ورودی آن متن و خروجی آن بردار است.",
  "roleSummary": "بازیابی سند با بزرگ‌ترین Qwen3 Embedding فهرست",
  "distinguishingFeatures": [
    "Qwen3-Embedding-8B تا ۴٬۰۹۶ بُعد و زمینهٔ ۳۲٬۷۶۸ توکن دارد؛ ورودی آن متن و خروجی آن بردار است."
  ],
  "languageSummary": "چندزبانه",
  "officialUrl": "https://huggingface.co/Qwen/Qwen3-Embedding-8B",
  "runGuides": [
    {
      "label": "راهنمای اجرای Qwen3-Embedding-8B",
      "engine": "Sentence Transformers",
      "href": "https://huggingface.co/Qwen/Qwen3-Embedding-8B",
      "instructions": "خروجی این مسیر بردار متن است.",
      "conditions": [
        "هزینهٔ نمایه‌سازی و ذخیرهٔ بردار را جدا از هزینهٔ پاسخ مدل مولد حساب کنید؛ این مدل پاسخ نهایی نمی‌نویسد."
      ],
      "evidenceIds": [
        "evidence:qwen-qwen3-embedding-8b-card"
      ]
    },
    {
      "label": "راه‌اندازی با Transformers",
      "engine": "Transformers",
      "href": "https://huggingface.co/Qwen/Qwen3-Embedding-8B/raw/1d8ad4ca9b3dd8059ad90a75d4983776a23d44af/README.md",
      "conditions": [
        "دستور وظیفه فقط به پرسش اضافه شود؛ بردار آخرین توکن معتبر با attention mask گرفته و با L2 نرمال شود."
      ],
      "evidenceIds": [
        "evidence:v03-756c11eab5cc54fff1"
      ]
    },
    {
      "label": "دریافت و اجرای بستهٔ Ollama",
      "engine": "Ollama",
      "href": "https://ollama.com/library/qwen3-embedding:8b",
      "conditions": [],
      "code": "ollama pull qwen3-embedding:8b\ncurl http://localhost:11434/api/embed -d '{\"model\": \"qwen3-embedding:8b\", \"input\": \"متن نمونه\"}'",
      "codeLanguage": "bash",
      "evidenceIds": [
        "evidence:v03-8ed2e0d6d063f3ca12"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:qwen-qwen3-embedding-8b-card",
    "evidence:qwen-qwen3-embedding-8b-metadata",
    "evidence:qwen-qwen3-embedding-8b-parameters",
    "evidence:qwen-qwen3-embedding-8b-license",
    "evidence:qwen-qwen3-embedding-8b-context",
    "evidence:qwen-qwen3-embedding-8b-config",
    "evidence:four-tables-release-qwen3-embedding-launch",
    "evidence:v03-756c11eab5cc54fff1",
    "evidence:v03-08fd4729fddda6c191"
  ]
});
modelProfiles.push({
  "id": "model-profile:qwen-qwen3-reranker-0-6b",
  "modelVersionId": "model:qwen-qwen3-reranker-0-6b",
  "introduction": "نسخهٔ ۰٫۶میلیاردی Qwen3-Reranker برای امتیازدادن به ارتباط query و document با دستور وظیفه تنظیم شده است.",
  "roleSummary": "بازرتبه‌بندی سبک‌تر در خانوادهٔ Qwen3",
  "distinguishingFeatures": [
    "نسخهٔ ۰٫۶میلیاردی Qwen3-Reranker برای امتیازدادن به ارتباط query و document با دستور وظیفه تنظیم شده است."
  ],
  "languageSummary": "چندزبانه",
  "officialUrl": "https://huggingface.co/Qwen/Qwen3-Reranker-0.6B",
  "runGuides": [
    {
      "label": "راهنمای اجرای Qwen3-Reranker-0.6B",
      "engine": "Transformers · scoring",
      "href": "https://huggingface.co/Qwen/Qwen3-Reranker-0.6B",
      "instructions": "ورودی: جفت پرسش و سند؛ خروجی: امتیاز ارتباط.",
      "conditions": [
        "قالب مخصوص reranker و امتیاز yes/no لازم است؛ از مسیر chat یا تولید embedding استفاده نکنید."
      ],
      "evidenceIds": [
        "evidence:qwen-qwen3-reranker-0-6b-card"
      ]
    },
    {
      "label": "راه‌اندازی با Transformers",
      "engine": "Transformers",
      "href": "https://huggingface.co/Qwen/Qwen3-Reranker-0.6B/raw/e61197ed45024b0ed8a2d74b80b4d909f1255473/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-e46def74508c916e78"
      ]
    },
    {
      "label": "راه‌اندازی با Sentence Transformers",
      "engine": "Sentence Transformers",
      "href": "https://huggingface.co/Qwen/Qwen3-Reranker-0.6B/raw/e61197ed45024b0ed8a2d74b80b4d909f1255473/README.md",
      "conditions": [
        "در مسیر Sentence Transformers 5.4 از CrossEncoder استفاده کنید؛ خروجی پیش‌فرض اختلاف logit است، نه احتمال صحت پاسخ."
      ],
      "evidenceIds": [
        "evidence:v03-e46def74508c916e78"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:qwen-qwen3-reranker-0-6b-card",
    "evidence:qwen-qwen3-reranker-0-6b-metadata",
    "evidence:qwen-qwen3-reranker-0-6b-parameters",
    "evidence:qwen-qwen3-reranker-0-6b-license",
    "evidence:qwen-qwen3-reranker-0-6b-context",
    "evidence:qwen-qwen3-reranker-0-6b-config",
    "evidence:four-tables-release-qwen3-embedding-launch",
    "evidence:v03-e46def74508c916e78",
    "evidence:v03-bca463116b39be8c49"
  ]
});
modelProfiles.push({
  "id": "model-profile:qwen-qwen3-reranker-4b",
  "modelVersionId": "model:qwen-qwen3-reranker-4b",
  "introduction": "Qwen3-Reranker-4B گزینهٔ میانی این خانواده است؛ پرسش، دستور بازیابی و متن سند در محاسبهٔ ارتباط شرکت دارند.",
  "roleSummary": "بازرتبه‌بندی دستورپذیر اسناد نامزد",
  "distinguishingFeatures": [
    "Qwen3-Reranker-4B گزینهٔ میانی این خانواده است؛ پرسش، دستور بازیابی و متن سند در محاسبهٔ ارتباط شرکت دارند."
  ],
  "languageSummary": "چندزبانه",
  "officialUrl": "https://huggingface.co/Qwen/Qwen3-Reranker-4B",
  "runGuides": [
    {
      "label": "راهنمای اجرای Qwen3-Reranker-4B",
      "engine": "Transformers · scoring",
      "href": "https://huggingface.co/Qwen/Qwen3-Reranker-4B",
      "instructions": "ورودی: جفت پرسش و سند؛ خروجی: امتیاز ارتباط.",
      "conditions": [
        "فقط اسناد نامزد را به این مرحله بدهید؛ افزایش تعداد جفت‌های پرسش–سند هزینهٔ مرحلهٔ دوم را بالا می‌برد."
      ],
      "evidenceIds": [
        "evidence:qwen-qwen3-reranker-4b-card"
      ]
    },
    {
      "label": "راه‌اندازی با Transformers",
      "engine": "Transformers",
      "href": "https://huggingface.co/Qwen/Qwen3-Reranker-4B/raw/22e683669bc0f0bd69640a1354a6d0aebcfeede5/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-d16eb55121e3e71474"
      ]
    },
    {
      "label": "راه‌اندازی با Sentence Transformers",
      "engine": "Sentence Transformers",
      "href": "https://huggingface.co/Qwen/Qwen3-Reranker-4B/raw/22e683669bc0f0bd69640a1354a6d0aebcfeede5/README.md",
      "conditions": [
        "در مسیر Sentence Transformers 5.4 از CrossEncoder استفاده کنید؛ خروجی پیش‌فرض اختلاف logit است، نه احتمال صحت پاسخ."
      ],
      "evidenceIds": [
        "evidence:v03-d16eb55121e3e71474"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:qwen-qwen3-reranker-4b-card",
    "evidence:qwen-qwen3-reranker-4b-metadata",
    "evidence:qwen-qwen3-reranker-4b-parameters",
    "evidence:qwen-qwen3-reranker-4b-license",
    "evidence:qwen-qwen3-reranker-4b-context",
    "evidence:qwen-qwen3-reranker-4b-config",
    "evidence:four-tables-release-qwen3-embedding-launch",
    "evidence:v03-d16eb55121e3e71474",
    "evidence:v03-2b3a475183117ce695"
  ]
});
modelProfiles.push({
  "id": "model-profile:qwen-qwen3-reranker-8b",
  "modelVersionId": "model:qwen-qwen3-reranker-8b",
  "introduction": "Qwen3-Reranker-8B بزرگ‌ترین بازرتبه‌بند این مجموعه است؛ به جفت پرسش و سند امتیاز ارتباط می‌دهد.",
  "roleSummary": "بازرتبه‌بندی با نسخهٔ هشت‌میلیاردی Qwen3",
  "distinguishingFeatures": [
    "Qwen3-Reranker-8B بزرگ‌ترین بازرتبه‌بند این مجموعه است؛ به جفت پرسش و سند امتیاز ارتباط می‌دهد."
  ],
  "languageSummary": "چندزبانه",
  "officialUrl": "https://huggingface.co/Qwen/Qwen3-Reranker-8B",
  "runGuides": [
    {
      "label": "راهنمای اجرای Qwen3-Reranker-8B",
      "engine": "Transformers · scoring",
      "href": "https://huggingface.co/Qwen/Qwen3-Reranker-8B",
      "instructions": "ورودی: جفت پرسش و سند؛ خروجی: امتیاز ارتباط.",
      "conditions": [
        "برای انتخاب در برابر نسخهٔ ۴میلیاردی، کیفیت جست‌وجو و زمان روی اسناد خودتان را بسنجید؛ از اندازه رتبه نسازید."
      ],
      "evidenceIds": [
        "evidence:qwen-qwen3-reranker-8b-card"
      ]
    },
    {
      "label": "راه‌اندازی با Transformers",
      "engine": "Transformers",
      "href": "https://huggingface.co/Qwen/Qwen3-Reranker-8B/raw/77d193c791ed757ca307ee72715aa132723da912/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-c09f8e74cbe4033e43"
      ]
    },
    {
      "label": "راه‌اندازی با Sentence Transformers",
      "engine": "Sentence Transformers",
      "href": "https://huggingface.co/Qwen/Qwen3-Reranker-8B/raw/77d193c791ed757ca307ee72715aa132723da912/README.md",
      "conditions": [
        "در مسیر Sentence Transformers 5.4 از CrossEncoder استفاده کنید؛ خروجی پیش‌فرض اختلاف logit است، نه احتمال صحت پاسخ."
      ],
      "evidenceIds": [
        "evidence:v03-c09f8e74cbe4033e43"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:qwen-qwen3-reranker-8b-card",
    "evidence:qwen-qwen3-reranker-8b-metadata",
    "evidence:qwen-qwen3-reranker-8b-parameters",
    "evidence:qwen-qwen3-reranker-8b-license",
    "evidence:qwen-qwen3-reranker-8b-context",
    "evidence:qwen-qwen3-reranker-8b-config",
    "evidence:four-tables-release-qwen3-embedding-launch",
    "evidence:v03-c09f8e74cbe4033e43",
    "evidence:v03-62cb8753fb8c580a11"
  ]
});
modelProfiles.push({
  "id": "model-profile:qwen-qwen3-vl-8b-instruct",
  "modelVersionId": "model:qwen-qwen3-vl-8b-instruct",
  "introduction": "نسخهٔ Instruct هشت‌میلیاردی Qwen3-VL ورودی متن، تصویر و ویدئو را برای درک بصری و کار با سند ترکیب می‌کند.",
  "roleSummary": "خواندن تصویر و سند با Qwen3-VL",
  "distinguishingFeatures": [
    "نسخهٔ Instruct هشت‌میلیاردی Qwen3-VL ورودی متن، تصویر و ویدئو را برای درک بصری و کار با سند ترکیب می‌کند."
  ],
  "languageSummary": "OCR برای ۳۲ زبان در معرفی Qwen3-VL؛ دامنهٔ OCR با همهٔ زبان‌های گفت‌وگو یکسان فرض نشده است.",
  "officialUrl": "https://huggingface.co/Qwen/Qwen3-VL-8B-Instruct",
  "runGuides": [
    {
      "label": "راهنمای اجرای Qwen3-VL-8B-Instruct",
      "engine": "unknown",
      "href": "https://huggingface.co/Qwen/Qwen3-VL-8B-Instruct",
      "conditions": [
        "از processor و قالب پیام چندوجهی استفاده کنید؛ checkpointهای Thinking و Instruct رفتار یکسان ندارند."
      ],
      "evidenceIds": [
        "evidence:qwen-qwen3-vl-8b-instruct-card"
      ],
      "engineLabel": "مسیر اجرای ناشر"
    },
    {
      "label": "راه‌اندازی با Transformers",
      "engine": "Transformers",
      "href": "https://huggingface.co/Qwen/Qwen3-VL-8B-Instruct/raw/0c351dd01ed87e9c1b53cbc748cba10e6187ff3b/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-d1601e1a4e651a447e"
      ]
    },
    {
      "label": "دریافت و اجرای بستهٔ Ollama",
      "engine": "Ollama",
      "href": "https://ollama.com/library/qwen3-vl:8b-instruct-q4_K_M",
      "conditions": [],
      "code": "ollama pull qwen3-vl:8b-instruct-q4_K_M\nollama run qwen3-vl:8b-instruct-q4_K_M",
      "codeLanguage": "bash",
      "evidenceIds": [
        "evidence:v03-8814d2717c1df761d6"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:qwen-qwen3-vl-8b-instruct-card",
    "evidence:qwen-qwen3-vl-8b-instruct-metadata",
    "evidence:qwen-qwen3-vl-8b-instruct-parameters",
    "evidence:qwen-qwen3-vl-8b-instruct-license",
    "evidence:qwen-qwen3-vl-8b-instruct-context",
    "evidence:qwen-qwen3-vl-8b-instruct-config",
    "evidence:four-tables-release-qwen3-vl-4b-and-8b-release",
    "evidence:v03-d1601e1a4e651a447e",
    "evidence:v03-9ebf35788ef07e2236"
  ]
});
modelProfiles.push({
  "id": "model-profile:qwen-qwen3-5-2b",
  "modelVersionId": "model:qwen-qwen3-5-2b",
  "introduction": "Qwen3.5-2B کوچک برای نمونه‌سازی و تنظیم دقیق وظیفه‌محور معرفی شده؛ ورودی بصری را همراه متن می‌پذیرد.",
  "roleSummary": "نمونه‌سازی چندوجهی با Qwen3.5 کوچک",
  "distinguishingFeatures": [
    "Qwen3.5-2B کوچک برای نمونه‌سازی و تنظیم دقیق وظیفه‌محور معرفی شده؛ ورودی بصری را همراه متن می‌پذیرد."
  ],
  "languageSummary": "چندزبانه",
  "officialUrl": "https://huggingface.co/Qwen/Qwen3.5-2B",
  "runGuides": [
    {
      "label": "راهنمای اجرای Qwen3.5-2B",
      "engine": "unknown",
      "href": "https://huggingface.co/Qwen/Qwen3.5-2B",
      "conditions": [
        "کیفیت نسخه‌های بزرگ‌تر خانواده به این مدل دوملیاردی تعمیم داده نمی‌شود."
      ],
      "evidenceIds": [
        "evidence:qwen-qwen3-5-2b-card"
      ],
      "engineLabel": "مسیر اجرای ناشر"
    },
    {
      "label": "راه‌اندازی با Transformers",
      "engine": "Transformers",
      "href": "https://huggingface.co/Qwen/Qwen3.5-2B/raw/15852e8c16360a2fea060d615a32b45270f8a8fc/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-1fb0e66ad27f4a35c4"
      ]
    },
    {
      "label": "راه‌اندازی با vLLM",
      "engine": "vLLM",
      "href": "https://huggingface.co/Qwen/Qwen3.5-2B/raw/15852e8c16360a2fea060d615a32b45270f8a8fc/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-1fb0e66ad27f4a35c4"
      ]
    },
    {
      "label": "راه‌اندازی با SGLang",
      "engine": "SGLang",
      "href": "https://huggingface.co/Qwen/Qwen3.5-2B/raw/15852e8c16360a2fea060d615a32b45270f8a8fc/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-1fb0e66ad27f4a35c4"
      ]
    },
    {
      "label": "دریافت و اجرای بستهٔ Ollama",
      "engine": "Ollama",
      "href": "https://ollama.com/library/qwen3.5:2b",
      "conditions": [],
      "code": "ollama pull qwen3.5:2b\nollama run qwen3.5:2b",
      "codeLanguage": "bash",
      "evidenceIds": [
        "evidence:v03-31976af243747d94de"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:qwen-qwen3-5-2b-card",
    "evidence:qwen-qwen3-5-2b-metadata",
    "evidence:qwen-qwen3-5-2b-parameters",
    "evidence:qwen-qwen3-5-2b-license",
    "evidence:qwen-qwen3-5-2b-context",
    "evidence:qwen-qwen3-5-2b-config",
    "evidence:four-tables-release-qwen3-5-small-models-release",
    "evidence:v03-1fb0e66ad27f4a35c4",
    "evidence:v03-f6437c3de485b00992"
  ]
});
modelProfiles.push({
  "id": "model-profile:qwen-qwen3-5-35b-a3b",
  "modelVersionId": "model:qwen-qwen3-5-35b-a3b",
  "introduction": "نسخهٔ 35B-A3B از پایهٔ یکپارچهٔ متن و تصویر و معماری ترکیبی بهره می‌برد و برای گردش‌کار چندمرحله‌ای قابل بررسی است.",
  "roleSummary": "عامل چندوجهی با Qwen3.5 از نوع MoE",
  "distinguishingFeatures": [
    "نسخهٔ 35B-A3B از پایهٔ یکپارچهٔ متن و تصویر و معماری ترکیبی بهره می‌برد و برای گردش‌کار چندمرحله‌ای قابل بررسی است."
  ],
  "languageSummary": "چندزبانه",
  "officialUrl": "https://huggingface.co/Qwen/Qwen3.5-35B-A3B",
  "runGuides": [
    {
      "label": "راهنمای اجرای Qwen3.5-35B-A3B",
      "engine": "unknown",
      "href": "https://huggingface.co/Qwen/Qwen3.5-35B-A3B",
      "conditions": [
        "سرویس میزبانی‌شدهٔ Qwen3.5-Flash با ابزارها و زمینهٔ پیش‌فرض متفاوت عرضه می‌شود؛ مشخصات API را به وزن محلی تعمیم ندهید."
      ],
      "evidenceIds": [
        "evidence:qwen-qwen3-5-35b-a3b-card"
      ],
      "engineLabel": "مسیر اجرای ناشر"
    },
    {
      "label": "راه‌اندازی با Transformers",
      "engine": "Transformers",
      "href": "https://huggingface.co/Qwen/Qwen3.5-35B-A3B/raw/59d61f3ce65a6d9863b86d2e96597125219dc754/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-02a81d4ca4dfa9b099"
      ]
    },
    {
      "label": "راه‌اندازی با vLLM",
      "engine": "vLLM",
      "href": "https://huggingface.co/Qwen/Qwen3.5-35B-A3B/raw/59d61f3ce65a6d9863b86d2e96597125219dc754/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-02a81d4ca4dfa9b099"
      ]
    },
    {
      "label": "راه‌اندازی با SGLang",
      "engine": "SGLang",
      "href": "https://huggingface.co/Qwen/Qwen3.5-35B-A3B/raw/59d61f3ce65a6d9863b86d2e96597125219dc754/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-02a81d4ca4dfa9b099"
      ]
    },
    {
      "label": "دریافت و اجرای بستهٔ Ollama",
      "engine": "Ollama",
      "href": "https://ollama.com/library/qwen3.5:35b",
      "conditions": [],
      "code": "ollama pull qwen3.5:35b\nollama run qwen3.5:35b",
      "codeLanguage": "bash",
      "evidenceIds": [
        "evidence:v03-63f59e0d896cd8443d"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:qwen-qwen3-5-35b-a3b-card",
    "evidence:qwen-qwen3-5-35b-a3b-metadata",
    "evidence:qwen-qwen3-5-35b-a3b-parameters",
    "evidence:qwen-qwen3-5-35b-a3b-license",
    "evidence:qwen-qwen3-5-35b-a3b-context",
    "evidence:qwen-qwen3-5-35b-a3b-config",
    "evidence:four-tables-release-qwen3-5-medium-models-release",
    "evidence:v03-02a81d4ca4dfa9b099",
    "evidence:v03-dd831b60bd47fa08c8"
  ]
});
modelProfiles.push({
  "id": "model-profile:qwen-qwen3-5-4b",
  "modelVersionId": "model:qwen-qwen3-5-4b",
  "introduction": "Qwen3.5-4B از نسل متن–تصویر یکپارچه است؛ برای آزمودن استخراج اطلاعات از سند در اندازه‌ای کوچک‌تر از 9B قابل بررسی است.",
  "roleSummary": "پردازش متن و تصویر در اندازهٔ چهار میلیارد",
  "distinguishingFeatures": [
    "Qwen3.5-4B از نسل متن–تصویر یکپارچه است؛ برای آزمودن استخراج اطلاعات از سند در اندازه‌ای کوچک‌تر از 9B قابل بررسی است."
  ],
  "languageSummary": "چندزبانه",
  "officialUrl": "https://huggingface.co/Qwen/Qwen3.5-4B",
  "runGuides": [
    {
      "label": "راهنمای اجرای Qwen3.5-4B",
      "engine": "unknown",
      "href": "https://huggingface.co/Qwen/Qwen3.5-4B",
      "conditions": [
        "برای سند اسکن‌شده به مسیر چندوجهی نیاز دارید؛ سقف زمینهٔ متنی، تعداد تصاویر قابل پردازش را تعیین نمی‌کند."
      ],
      "evidenceIds": [
        "evidence:qwen-qwen3-5-4b-card"
      ],
      "engineLabel": "مسیر اجرای ناشر"
    },
    {
      "label": "راه‌اندازی با Transformers",
      "engine": "Transformers",
      "href": "https://huggingface.co/Qwen/Qwen3.5-4B/raw/851bf6e806efd8d0a36b00ddf55e13ccb7b8cd0a/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-a70fca6b263839d3e5"
      ]
    },
    {
      "label": "راه‌اندازی با vLLM",
      "engine": "vLLM",
      "href": "https://huggingface.co/Qwen/Qwen3.5-4B/raw/851bf6e806efd8d0a36b00ddf55e13ccb7b8cd0a/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-a70fca6b263839d3e5"
      ]
    },
    {
      "label": "راه‌اندازی با SGLang",
      "engine": "SGLang",
      "href": "https://huggingface.co/Qwen/Qwen3.5-4B/raw/851bf6e806efd8d0a36b00ddf55e13ccb7b8cd0a/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-a70fca6b263839d3e5"
      ]
    },
    {
      "label": "دریافت و اجرای بستهٔ Ollama",
      "engine": "Ollama",
      "href": "https://ollama.com/library/qwen3.5:4b",
      "conditions": [],
      "code": "ollama pull qwen3.5:4b\nollama run qwen3.5:4b",
      "codeLanguage": "bash",
      "evidenceIds": [
        "evidence:v03-9ce3daad5f8d77258d"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:qwen-qwen3-5-4b-card",
    "evidence:qwen-qwen3-5-4b-metadata",
    "evidence:qwen-qwen3-5-4b-parameters",
    "evidence:qwen-qwen3-5-4b-license",
    "evidence:qwen-qwen3-5-4b-context",
    "evidence:qwen-qwen3-5-4b-config",
    "evidence:four-tables-release-qwen3-5-small-models-release",
    "evidence:v03-a70fca6b263839d3e5",
    "evidence:v03-794bfb947531f5882c"
  ]
});
modelProfiles.push({
  "id": "model-profile:qwen-qwen3-5-9b",
  "modelVersionId": "model:qwen-qwen3-5-9b",
  "introduction": "نسخهٔ 9B از Qwen3.5 ترکیب متن و تصویر را در معماری متراکم این خانواده عرضه می‌کند.",
  "roleSummary": "دستیار اسناد و تصویر با Qwen3.5 متراکم",
  "distinguishingFeatures": [
    "نسخهٔ 9B از Qwen3.5 ترکیب متن و تصویر را در معماری متراکم این خانواده عرضه می‌کند."
  ],
  "languageSummary": "چندزبانه",
  "officialUrl": "https://huggingface.co/Qwen/Qwen3.5-9B",
  "runGuides": [
    {
      "label": "راهنمای اجرای Qwen3.5-9B",
      "engine": "unknown",
      "href": "https://huggingface.co/Qwen/Qwen3.5-9B",
      "conditions": [
        "مقایسه با 4B باید بر دادهٔ سند یکسان و تنظیم تصویر یکسان باشد؛ شمار پارامترهای بخش زبان و بینایی را جدا بخوانید."
      ],
      "evidenceIds": [
        "evidence:qwen-qwen3-5-9b-card"
      ],
      "engineLabel": "مسیر اجرای ناشر"
    },
    {
      "label": "راه‌اندازی با Transformers",
      "engine": "Transformers",
      "href": "https://huggingface.co/Qwen/Qwen3.5-9B/raw/c202236235762e1c871ad0ccb60c8ee5ba337b9a/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-de0f4e149976e25127"
      ]
    },
    {
      "label": "راه‌اندازی با vLLM",
      "engine": "vLLM",
      "href": "https://huggingface.co/Qwen/Qwen3.5-9B/raw/c202236235762e1c871ad0ccb60c8ee5ba337b9a/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-de0f4e149976e25127"
      ]
    },
    {
      "label": "راه‌اندازی با SGLang",
      "engine": "SGLang",
      "href": "https://huggingface.co/Qwen/Qwen3.5-9B/raw/c202236235762e1c871ad0ccb60c8ee5ba337b9a/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-de0f4e149976e25127"
      ]
    },
    {
      "label": "دریافت و اجرای بستهٔ Ollama",
      "engine": "Ollama",
      "href": "https://ollama.com/library/qwen3.5:9b",
      "conditions": [],
      "code": "ollama pull qwen3.5:9b\nollama run qwen3.5:9b",
      "codeLanguage": "bash",
      "evidenceIds": [
        "evidence:v03-d4015d85b47081466c"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:qwen-qwen3-5-9b-card",
    "evidence:qwen-qwen3-5-9b-metadata",
    "evidence:qwen-qwen3-5-9b-parameters",
    "evidence:qwen-qwen3-5-9b-license",
    "evidence:qwen-qwen3-5-9b-context",
    "evidence:qwen-qwen3-5-9b-config",
    "evidence:four-tables-release-qwen3-5-small-models-release",
    "evidence:v03-de0f4e149976e25127",
    "evidence:v03-c353dc5ca170848d47"
  ]
});
modelProfiles.push({
  "id": "model-profile:qwen-qwen3-8-27b",
  "modelVersionId": "model:qwen-qwen3-8-27b",
  "introduction": "Qwen3.8-27B مدل متراکم متن–تصویر با کنترل thinking است؛ تمرکز معرفی آن بر کدنویسی، پژوهش و کارهای چندمرحله‌ای است.",
  "roleSummary": "گردش‌کار طولانی با عامل متن–تصویر",
  "distinguishingFeatures": [
    "Qwen3.8-27B مدل متراکم متن–تصویر با کنترل thinking است؛ تمرکز معرفی آن بر کدنویسی، پژوهش و کارهای چندمرحله‌ای است."
  ],
  "officialUrl": "https://huggingface.co/Qwen/Qwen3.8-27B",
  "runGuides": [
    {
      "label": "راهنمای اجرای Qwen3.8-27B",
      "engine": "unknown",
      "href": "https://huggingface.co/Qwen/Qwen3.8-27B",
      "conditions": [
        "قابلیت‌های وعده‌داده‌شدهٔ سرویس ابری، مانند ابزارهای داخلی و زمینهٔ پیش‌فرض، جزء تضمین وزن محلی نیستند."
      ],
      "evidenceIds": [
        "evidence:qwen-qwen3-8-27b-card"
      ],
      "engineLabel": "مسیر اجرای ناشر"
    },
    {
      "label": "راه‌اندازی با Transformers",
      "engine": "Transformers",
      "href": "https://huggingface.co/Qwen/Qwen3.8-27B/raw/1d4bf0f2ff6012fd82039f2fa52739d0dd7c60c0/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-6ef1dc4cde68af6f92"
      ]
    },
    {
      "label": "راه‌اندازی با vLLM",
      "engine": "vLLM",
      "href": "https://huggingface.co/Qwen/Qwen3.8-27B/raw/1d4bf0f2ff6012fd82039f2fa52739d0dd7c60c0/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-6ef1dc4cde68af6f92"
      ]
    },
    {
      "label": "راه‌اندازی با SGLang",
      "engine": "SGLang",
      "href": "https://huggingface.co/Qwen/Qwen3.8-27B/raw/1d4bf0f2ff6012fd82039f2fa52739d0dd7c60c0/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-6ef1dc4cde68af6f92"
      ]
    },
    {
      "label": "دریافت و اجرای بستهٔ Ollama",
      "engine": "Ollama",
      "href": "https://ollama.com/library/qwen3.8:27b",
      "conditions": [],
      "code": "ollama pull qwen3.8:27b\nollama run qwen3.8:27b",
      "codeLanguage": "bash",
      "evidenceIds": [
        "evidence:v03-2926d9998e3e0a0b88"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:qwen-qwen3-8-27b-card",
    "evidence:qwen-qwen3-8-27b-metadata",
    "evidence:qwen-qwen3-8-27b-parameters",
    "evidence:qwen-qwen3-8-27b-license",
    "evidence:qwen-qwen3-8-27b-context",
    "evidence:qwen-qwen3-8-27b-config",
    "evidence:four-tables-release-qwen3-8-27b-release",
    "evidence:v03-6ef1dc4cde68af6f92",
    "evidence:v03-7f8be85de2b32906d5"
  ]
});
modelProfiles.push({
  "id": "model-profile:allenai-olmo-3-7b-instruct",
  "modelVersionId": "model:allenai-olmo-3-7b-instruct",
  "introduction": "Olmo 3 7B Instruct با داده‌های Dolma 3 و Dolci عرضه شده و انتشار جزئیات آموزش، آن را برای پژوهش بازتولیدپذیر متمایز می‌کند.",
  "roleSummary": "پژوهش دستورپذیری با مسیر آموزش قابل بررسی",
  "distinguishingFeatures": [
    "Olmo 3 7B Instruct با داده‌های Dolma 3 و Dolci عرضه شده و انتشار جزئیات آموزش، آن را برای پژوهش بازتولیدپذیر متمایز می‌کند."
  ],
  "languageSummary": "زبان‌های اعلام‌شده: انگلیسی.",
  "officialUrl": "https://huggingface.co/allenai/Olmo-3-7B-Instruct",
  "runGuides": [
    {
      "label": "راهنمای اجرای Olmo-3-7B-Instruct",
      "engine": "unknown",
      "href": "https://huggingface.co/allenai/Olmo-3-7B-Instruct",
      "conditions": [
        "این checkpoint از نوع Instruct است؛ نتایج Olmo Think را به آن نسبت ندهید. Transformers نسخهٔ ۴٫۵۷ یا بالاتر لازم است."
      ],
      "evidenceIds": [
        "evidence:allenai-olmo-3-7b-instruct-card"
      ],
      "engineLabel": "مسیر اجرای ناشر"
    },
    {
      "label": "راه‌اندازی با Transformers",
      "engine": "Transformers",
      "href": "https://huggingface.co/allenai/Olmo-3-7B-Instruct/raw/6e5971d9eba42665f5bd5a0fcf047f299ce1dccc/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-7367d81634c9c1999e"
      ]
    },
    {
      "label": "دریافت و اجرای بستهٔ Ollama",
      "engine": "Ollama",
      "href": "https://ollama.com/library/olmo-3:7b-instruct-q4_K_M",
      "conditions": [],
      "code": "ollama pull olmo-3:7b-instruct-q4_K_M\nollama run olmo-3:7b-instruct-q4_K_M",
      "codeLanguage": "bash",
      "evidenceIds": [
        "evidence:v03-a3e75528ca93b894fb"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:allenai-olmo-3-7b-instruct-card",
    "evidence:allenai-olmo-3-7b-instruct-metadata",
    "evidence:allenai-olmo-3-7b-instruct-parameters",
    "evidence:allenai-olmo-3-7b-instruct-license",
    "evidence:allenai-olmo-3-7b-instruct-config",
    "evidence:four-tables-release-olmo-3-7b-instruct-release",
    "evidence:v03-7367d81634c9c1999e",
    "evidence:v03-ae5d503e77194daf65"
  ]
});
modelProfiles.push({
  "id": "model-profile:deepseek-ai-deepseek-r1-0528-qwen3-8b",
  "modelVersionId": "model:deepseek-ai-deepseek-r1-0528-qwen3-8b",
  "introduction": "این مدل از پس‌آموزش Qwen3-8B-Base با زنجیره‌های استدلال DeepSeek-R1-0528 به دست آمده؛ با Qwen3-8B معمولی متفاوت است.",
  "roleSummary": "آزمایش استدلال تقطیرشده از R1-0528",
  "distinguishingFeatures": [
    "این مدل از پس‌آموزش Qwen3-8B-Base با زنجیره‌های استدلال DeepSeek-R1-0528 به دست آمده؛ با Qwen3-8B معمولی متفاوت است."
  ],
  "officialUrl": "https://huggingface.co/deepseek-ai/DeepSeek-R1-0528-Qwen3-8B",
  "runGuides": [
    {
      "label": "راهنمای اجرای DeepSeek-R1-0528-Qwen3-8B",
      "engine": "unknown",
      "href": "https://huggingface.co/deepseek-ai/DeepSeek-R1-0528-Qwen3-8B",
      "conditions": [
        "بنچمارک‌های مدل کامل R1-0528 متعلق به این نسخهٔ هشت‌میلیاردی نیستند."
      ],
      "evidenceIds": [
        "evidence:deepseek-ai-deepseek-r1-0528-qwen3-8b-card"
      ],
      "engineLabel": "مسیر اجرای ناشر"
    },
    {
      "label": "دریافت و اجرای بستهٔ Ollama",
      "engine": "Ollama",
      "href": "https://ollama.com/library/deepseek-r1:8b-0528-qwen3-q4_K_M",
      "conditions": [],
      "code": "ollama pull deepseek-r1:8b-0528-qwen3-q4_K_M\nollama run deepseek-r1:8b-0528-qwen3-q4_K_M",
      "codeLanguage": "bash",
      "evidenceIds": [
        "evidence:v03-001e52a692aeb7e768"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:deepseek-ai-deepseek-r1-0528-qwen3-8b-card",
    "evidence:deepseek-ai-deepseek-r1-0528-qwen3-8b-metadata",
    "evidence:deepseek-ai-deepseek-r1-0528-qwen3-8b-parameters",
    "evidence:deepseek-ai-deepseek-r1-0528-qwen3-8b-license",
    "evidence:deepseek-ai-deepseek-r1-0528-qwen3-8b-config",
    "evidence:four-tables-release-deepseek-r1-0528-qwen3-8b-release",
    "evidence:v03-85cc9f3b5064833673",
    "evidence:v03-9e630b4d9f4d397348"
  ]
});
modelProfiles.push({
  "id": "model-profile:deepseek-ai-deepseek-r1-distill-llama-70b",
  "modelVersionId": "model:deepseek-ai-deepseek-r1-distill-llama-70b",
  "introduction": "این checkpoint مسیر تقطیر R1 را روی پایهٔ Llama اجرا می‌کند و بزرگ‌ترین نسخهٔ تقطیری این فهرست است.",
  "roleSummary": "استدلال تقطیرشده روی پایهٔ Llama 70B",
  "distinguishingFeatures": [
    "این checkpoint مسیر تقطیر R1 را روی پایهٔ Llama اجرا می‌کند و بزرگ‌ترین نسخهٔ تقطیری این فهرست است."
  ],
  "officialUrl": "https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Llama-70B",
  "runGuides": [
    {
      "label": "راهنمای اجرای DeepSeek-R1-Distill-Llama-70B",
      "engine": "unknown",
      "href": "https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Llama-70B",
      "conditions": [
        "حجم وزن و طول زنجیرهٔ فکر را جداگانه برآورد کنید."
      ],
      "evidenceIds": [
        "evidence:deepseek-ai-deepseek-r1-distill-llama-70b-card"
      ],
      "engineLabel": "مسیر اجرای ناشر"
    },
    {
      "label": "راه‌اندازی با vLLM",
      "engine": "vLLM",
      "href": "https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Llama-70B/raw/b1c0b44b4369b597ad119a196caf79a9c40e141e/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-6f0d230842d2e501bf"
      ]
    },
    {
      "label": "راه‌اندازی با SGLang",
      "engine": "SGLang",
      "href": "https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Llama-70B/raw/b1c0b44b4369b597ad119a196caf79a9c40e141e/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-6f0d230842d2e501bf"
      ]
    },
    {
      "label": "دریافت و اجرای بستهٔ Ollama",
      "engine": "Ollama",
      "href": "https://ollama.com/library/deepseek-r1:70b",
      "conditions": [],
      "code": "ollama pull deepseek-r1:70b\nollama run deepseek-r1:70b",
      "codeLanguage": "bash",
      "evidenceIds": [
        "evidence:v03-03704d42bee3141d86"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:deepseek-ai-deepseek-r1-distill-llama-70b-card",
    "evidence:deepseek-ai-deepseek-r1-distill-llama-70b-metadata",
    "evidence:deepseek-ai-deepseek-r1-distill-llama-70b-parameters",
    "evidence:deepseek-ai-deepseek-r1-distill-llama-70b-license",
    "evidence:deepseek-ai-deepseek-r1-distill-llama-70b-config",
    "evidence:four-tables-release-deepseek-r1-distilled-release",
    "evidence:v03-6f0d230842d2e501bf",
    "evidence:v03-82cff004001765bc44"
  ]
});
modelProfiles.push({
  "id": "model-profile:deepseek-ai-deepseek-r1-distill-qwen-1-5b",
  "modelVersionId": "model:deepseek-ai-deepseek-r1-distill-qwen-1-5b",
  "introduction": "نسخهٔ ۱٫۵میلیاردی از تقطیر R1 روی Qwen2.5-Math ساخته شده و برای بررسی انتقال رفتار استدلال به مدل کوچک جالب است.",
  "roleSummary": "آزمایش مرز استدلال در مدل تقطیری بسیار کوچک",
  "distinguishingFeatures": [
    "نسخهٔ ۱٫۵میلیاردی از تقطیر R1 روی Qwen2.5-Math ساخته شده و برای بررسی انتقال رفتار استدلال به مدل کوچک جالب است."
  ],
  "officialUrl": "https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Qwen-1.5B",
  "runGuides": [
    {
      "label": "راهنمای اجرای DeepSeek-R1-Distill-Qwen-1.5B",
      "engine": "unknown",
      "href": "https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Qwen-1.5B",
      "conditions": [
        "پاسخ‌های طولانی ممکن است وارد تکرار شوند."
      ],
      "evidenceIds": [
        "evidence:deepseek-ai-deepseek-r1-distill-qwen-1-5b-card"
      ],
      "engineLabel": "مسیر اجرای ناشر"
    },
    {
      "label": "راه‌اندازی با vLLM",
      "engine": "vLLM",
      "href": "https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Qwen-1.5B/raw/ad9f0ae0864d7fbcd1cd905e3c6c5b069cc8b562/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-d1dcd8b370f21f76e7"
      ]
    },
    {
      "label": "راه‌اندازی با SGLang",
      "engine": "SGLang",
      "href": "https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Qwen-1.5B/raw/ad9f0ae0864d7fbcd1cd905e3c6c5b069cc8b562/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-d1dcd8b370f21f76e7"
      ]
    },
    {
      "label": "دریافت و اجرای بستهٔ Ollama",
      "engine": "Ollama",
      "href": "https://ollama.com/library/deepseek-r1:1.5b",
      "conditions": [],
      "code": "ollama pull deepseek-r1:1.5b\nollama run deepseek-r1:1.5b",
      "codeLanguage": "bash",
      "evidenceIds": [
        "evidence:v03-a66f8f1e8b9d5baac6"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:deepseek-ai-deepseek-r1-distill-qwen-1-5b-card",
    "evidence:deepseek-ai-deepseek-r1-distill-qwen-1-5b-metadata",
    "evidence:deepseek-ai-deepseek-r1-distill-qwen-1-5b-parameters",
    "evidence:deepseek-ai-deepseek-r1-distill-qwen-1-5b-license",
    "evidence:deepseek-ai-deepseek-r1-distill-qwen-1-5b-config",
    "evidence:four-tables-release-deepseek-r1-distilled-release",
    "evidence:v03-d1dcd8b370f21f76e7",
    "evidence:v03-1daa709bcb6d3d6061"
  ]
});
modelProfiles.push({
  "id": "model-profile:deepseek-ai-deepseek-r1-distill-qwen-14b",
  "modelVersionId": "model:deepseek-ai-deepseek-r1-distill-qwen-14b",
  "introduction": "DeepSeek-R1-Distill-Qwen-14B از Qwen2.5-14B و دادهٔ تولیدی R1 استفاده می‌کند؛ وزن آن متعلق به مدل کامل R1 نیست.",
  "roleSummary": "حل مسئله با تقطیر R1 در اندازهٔ میانی",
  "distinguishingFeatures": [
    "DeepSeek-R1-Distill-Qwen-14B از Qwen2.5-14B و دادهٔ تولیدی R1 استفاده می‌کند؛ وزن آن متعلق به مدل کامل R1 نیست."
  ],
  "officialUrl": "https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Qwen-14B",
  "runGuides": [
    {
      "label": "راهنمای اجرای DeepSeek-R1-Distill-Qwen-14B",
      "engine": "unknown",
      "href": "https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Qwen-14B",
      "conditions": [
        "اعداد گزارش‌شده فقط برای همین نسخه و تنظیمات آزمون معتبرند؛ از مقایسهٔ نامتجانس با پاسخ مستقیم پرهیز کنید."
      ],
      "evidenceIds": [
        "evidence:deepseek-ai-deepseek-r1-distill-qwen-14b-card"
      ],
      "engineLabel": "مسیر اجرای ناشر"
    },
    {
      "label": "راه‌اندازی با vLLM",
      "engine": "vLLM",
      "href": "https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Qwen-14B/raw/1df8507178afcc1bef68cd8c393f61a886323761/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-f7b9b749f262729f2d"
      ]
    },
    {
      "label": "راه‌اندازی با SGLang",
      "engine": "SGLang",
      "href": "https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Qwen-14B/raw/1df8507178afcc1bef68cd8c393f61a886323761/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-f7b9b749f262729f2d"
      ]
    },
    {
      "label": "دریافت و اجرای بستهٔ Ollama",
      "engine": "Ollama",
      "href": "https://ollama.com/library/deepseek-r1:14b",
      "conditions": [],
      "code": "ollama pull deepseek-r1:14b\nollama run deepseek-r1:14b",
      "codeLanguage": "bash",
      "evidenceIds": [
        "evidence:v03-cb19fbcc372bd72ae2"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:deepseek-ai-deepseek-r1-distill-qwen-14b-card",
    "evidence:deepseek-ai-deepseek-r1-distill-qwen-14b-metadata",
    "evidence:deepseek-ai-deepseek-r1-distill-qwen-14b-parameters",
    "evidence:deepseek-ai-deepseek-r1-distill-qwen-14b-license",
    "evidence:deepseek-ai-deepseek-r1-distill-qwen-14b-config",
    "evidence:four-tables-release-deepseek-r1-distilled-release",
    "evidence:v03-f7b9b749f262729f2d",
    "evidence:v03-497fb15a5fa2e0e5de"
  ]
});
modelProfiles.push({
  "id": "model-profile:deepseek-ai-deepseek-r1-distill-qwen-32b",
  "modelVersionId": "model:deepseek-ai-deepseek-r1-distill-qwen-32b",
  "introduction": "نسخهٔ Qwen-32B مسیر تقطیر R1 را روی پایهٔ Qwen2.5 دنبال می‌کند.",
  "roleSummary": "تحلیل و کدنویسی با تقطیر متراکم ۳۲میلیاردی",
  "distinguishingFeatures": [
    "نسخهٔ Qwen-32B مسیر تقطیر R1 را روی پایهٔ Qwen2.5 دنبال می‌کند."
  ],
  "officialUrl": "https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Qwen-32B",
  "runGuides": [
    {
      "label": "راهنمای اجرای DeepSeek-R1-Distill-Qwen-32B",
      "engine": "unknown",
      "href": "https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Qwen-32B",
      "conditions": [
        "توان استدلال اعلام‌شده، ابزارخوانی یا اجرای کد خودکار نیست؛ ابزار و اعتبارسنجی جواب باید در برنامه فراهم شود."
      ],
      "evidenceIds": [
        "evidence:deepseek-ai-deepseek-r1-distill-qwen-32b-card"
      ],
      "engineLabel": "مسیر اجرای ناشر"
    },
    {
      "label": "راه‌اندازی با vLLM",
      "engine": "vLLM",
      "href": "https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Qwen-32B/raw/711ad2ea6aa40cfca18895e8aca02ab92df1a746/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-653e71cc77765cd433"
      ]
    },
    {
      "label": "راه‌اندازی با SGLang",
      "engine": "SGLang",
      "href": "https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Qwen-32B/raw/711ad2ea6aa40cfca18895e8aca02ab92df1a746/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-653e71cc77765cd433"
      ]
    },
    {
      "label": "دریافت و اجرای بستهٔ Ollama",
      "engine": "Ollama",
      "href": "https://ollama.com/library/deepseek-r1:32b",
      "conditions": [],
      "code": "ollama pull deepseek-r1:32b\nollama run deepseek-r1:32b",
      "codeLanguage": "bash",
      "evidenceIds": [
        "evidence:v03-567641452eb09d3450"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:deepseek-ai-deepseek-r1-distill-qwen-32b-card",
    "evidence:deepseek-ai-deepseek-r1-distill-qwen-32b-metadata",
    "evidence:deepseek-ai-deepseek-r1-distill-qwen-32b-parameters",
    "evidence:deepseek-ai-deepseek-r1-distill-qwen-32b-license",
    "evidence:deepseek-ai-deepseek-r1-distill-qwen-32b-config",
    "evidence:four-tables-release-deepseek-r1-distilled-release",
    "evidence:v03-653e71cc77765cd433",
    "evidence:v03-6bdfd6be002fb9578f"
  ]
});
modelProfiles.push({
  "id": "model-profile:deepseek-ai-deepseek-r1-distill-qwen-7b",
  "modelVersionId": "model:deepseek-ai-deepseek-r1-distill-qwen-7b",
  "introduction": "این مدل از Qwen2.5-Math-7B به‌عنوان پایه استفاده می‌کند؛ با تقطیر جدیدتر R1-0528 روی Qwen3 یکی نیست.",
  "roleSummary": "حل مسئله با نسخهٔ هفت‌میلیاردی تقطیر R1",
  "distinguishingFeatures": [
    "این مدل از Qwen2.5-Math-7B به‌عنوان پایه استفاده می‌کند؛ با تقطیر جدیدتر R1-0528 روی Qwen3 یکی نیست."
  ],
  "officialUrl": "https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Qwen-7B",
  "runGuides": [
    {
      "label": "راهنمای اجرای DeepSeek-R1-Distill-Qwen-7B",
      "engine": "unknown",
      "href": "https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Qwen-7B",
      "conditions": [
        "قالب و tokenizer همین مخزن را نگه دارید؛ مقایسه با نسخهٔ هشت‌میلیاردی نیازمند آزمون مشترک است."
      ],
      "evidenceIds": [
        "evidence:deepseek-ai-deepseek-r1-distill-qwen-7b-card"
      ],
      "engineLabel": "مسیر اجرای ناشر"
    },
    {
      "label": "راه‌اندازی با vLLM",
      "engine": "vLLM",
      "href": "https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Qwen-7B/raw/916b56a44061fd5cd7d6a8fb632557ed4f724f60/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-6094f3fa17206810f9"
      ]
    },
    {
      "label": "راه‌اندازی با SGLang",
      "engine": "SGLang",
      "href": "https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Qwen-7B/raw/916b56a44061fd5cd7d6a8fb632557ed4f724f60/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-6094f3fa17206810f9"
      ]
    },
    {
      "label": "دریافت و اجرای بستهٔ Ollama",
      "engine": "Ollama",
      "href": "https://ollama.com/library/deepseek-r1:7b",
      "conditions": [],
      "code": "ollama pull deepseek-r1:7b\nollama run deepseek-r1:7b",
      "codeLanguage": "bash",
      "evidenceIds": [
        "evidence:v03-7ef938a1bf3bbddb1f"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:deepseek-ai-deepseek-r1-distill-qwen-7b-card",
    "evidence:deepseek-ai-deepseek-r1-distill-qwen-7b-metadata",
    "evidence:deepseek-ai-deepseek-r1-distill-qwen-7b-parameters",
    "evidence:deepseek-ai-deepseek-r1-distill-qwen-7b-license",
    "evidence:deepseek-ai-deepseek-r1-distill-qwen-7b-config",
    "evidence:four-tables-release-deepseek-r1-distilled-release",
    "evidence:v03-6094f3fa17206810f9",
    "evidence:v03-06dc9aef5d9e0da145"
  ]
});
modelProfiles.push({
  "id": "model-profile:deepseek-ai-deepseek-v3-2",
  "modelVersionId": "model:deepseek-ai-deepseek-v3-2",
  "introduction": "DeepSeek-V3.2 توجه تنک DSA و پس‌آموزش عامل‌محور را ترکیب می‌کند؛ قالب چت آن نسبت به نسخه‌های پیشین تغییر کرده است.",
  "roleSummary": "پیوند استدلال و ابزار در گردش‌کار عامل",
  "distinguishingFeatures": [
    "DeepSeek-V3.2 توجه تنک DSA و پس‌آموزش عامل‌محور را ترکیب می‌کند؛ قالب چت آن نسبت به نسخه‌های پیشین تغییر کرده است."
  ],
  "officialUrl": "https://huggingface.co/deepseek-ai/DeepSeek-V3.2",
  "runGuides": [
    {
      "label": "راهنمای اجرای DeepSeek-V3.2",
      "engine": "unknown",
      "href": "https://huggingface.co/deepseek-ai/DeepSeek-V3.2",
      "conditions": [
        "از قالب و مسیر اجرای مخصوص V3.2 استفاده کنید؛ نتایج نسخهٔ Speciale در پروندهٔ این مدل قابل انتقال نیستند."
      ],
      "evidenceIds": [
        "evidence:deepseek-ai-deepseek-v3-2-card"
      ],
      "engineLabel": "مسیر اجرای ناشر"
    }
  ],
  "evidenceIds": [
    "evidence:deepseek-ai-deepseek-v3-2-card",
    "evidence:deepseek-ai-deepseek-v3-2-metadata",
    "evidence:deepseek-ai-deepseek-v3-2-parameters",
    "evidence:deepseek-ai-deepseek-v3-2-license",
    "evidence:deepseek-ai-deepseek-v3-2-config",
    "evidence:four-tables-release-deepseek-v3-2-release",
    "evidence:v03-d2be656087cfb13604",
    "evidence:v03-65584e0b8b4b847353"
  ]
});
modelProfiles.push({
  "id": "model-profile:deepseek-ai-deepseek-v4-1-flash",
  "modelVersionId": "model:deepseek-ai-deepseek-v4-1-flash",
  "introduction": "DeepSeek-V4.1-Flash متن و تصویر را در معماری CED پردازش می‌کند؛ شمار پارامتر فعال در prefill و decode متفاوت است.",
  "roleSummary": "عامل چندوجهی برای ورودی‌های بسیار بلند",
  "distinguishingFeatures": [
    "DeepSeek-V4.1-Flash متن و تصویر را در معماری CED پردازش می‌کند؛ شمار پارامتر فعال در prefill و decode متفاوت است."
  ],
  "officialUrl": "https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash",
  "runGuides": [
    {
      "label": "راهنمای اجرای DeepSeek-V4.1-Flash",
      "engine": "unknown",
      "href": "https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash",
      "conditions": [
        "پارامتر فعال را یک عدد ثابت فرض نکنید؛ فشرده‌سازی KV و مسیر اجرای ویژه، بخشی از معماری این نسخه‌اند."
      ],
      "evidenceIds": [
        "evidence:deepseek-ai-deepseek-v4-1-flash-card"
      ],
      "engineLabel": "مسیر اجرای ناشر"
    }
  ],
  "evidenceIds": [
    "evidence:deepseek-ai-deepseek-v4-1-flash-card",
    "evidence:deepseek-ai-deepseek-v4-1-flash-metadata",
    "evidence:deepseek-ai-deepseek-v4-1-flash-parameters",
    "evidence:deepseek-ai-deepseek-v4-1-flash-license",
    "evidence:deepseek-ai-deepseek-v4-1-flash-config",
    "evidence:four-tables-release-deepseek-v4-1-flash-release",
    "evidence:four-tables-deepseek-ai-deepseek-v4-1-flash-declared-context",
    "evidence:v03-96e933b164bfc6658d",
    "evidence:v03-8819dbc2bfd569f326"
  ]
});
modelProfiles.push({
  "id": "model-profile:google-gemma-3-12b-it",
  "modelVersionId": "model:google-gemma-3-12b-it",
  "introduction": "Gemma 3 12B IT نسخهٔ دستورپذیر چندوجهی با زمینهٔ ۱۳۱٬۰۷۲ توکن است؛ ورودی تصویر را به پاسخ متنی پیوند می‌دهد.",
  "roleSummary": "پرسش از تصویر و متن با Gemma 3 میانی",
  "distinguishingFeatures": [
    "Gemma 3 12B IT نسخهٔ دستورپذیر چندوجهی با زمینهٔ ۱۳۱٬۰۷۲ توکن است؛ ورودی تصویر را به پاسخ متنی پیوند می‌دهد."
  ],
  "languageSummary": "چندزبانه",
  "officialUrl": "https://huggingface.co/google/gemma-3-12b-it",
  "runGuides": [
    {
      "label": "راهنمای اجرای gemma-3-12b-it",
      "engine": "unknown",
      "href": "https://huggingface.co/google/gemma-3-12b-it",
      "conditions": [
        "Processor بینایی و قالب Gemma 3 لازم است؛ حداکثر زمینه به معنی کیفیت ثابت فهم سند بلند نیست."
      ],
      "evidenceIds": [
        "evidence:google-gemma-3-12b-it-card"
      ],
      "engineLabel": "مسیر اجرای ناشر"
    },
    {
      "label": "راه‌اندازی با Transformers",
      "engine": "Transformers",
      "href": "https://huggingface.co/google/gemma-3-12b-it",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-a585b339d8df0103fa"
      ]
    },
    {
      "label": "راه‌اندازی با vLLM",
      "engine": "vLLM",
      "href": "https://huggingface.co/google/gemma-3-12b-it",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-a585b339d8df0103fa"
      ]
    },
    {
      "label": "راه‌اندازی با SGLang",
      "engine": "SGLang",
      "href": "https://huggingface.co/google/gemma-3-12b-it",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-a585b339d8df0103fa"
      ]
    },
    {
      "label": "راه‌اندازی با llama.cpp",
      "engine": "llama.cpp",
      "href": "https://huggingface.co/google/gemma-3-12b-it",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-a585b339d8df0103fa"
      ]
    },
    {
      "label": "دریافت و اجرای بستهٔ Ollama",
      "engine": "Ollama",
      "href": "https://ollama.com/library/gemma3:12b",
      "conditions": [],
      "code": "ollama pull gemma3:12b\nollama run gemma3:12b",
      "codeLanguage": "bash",
      "evidenceIds": [
        "evidence:v03-ce1085ecfd7b344a30"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:google-gemma-3-12b-it-card",
    "evidence:google-gemma-3-12b-it-metadata",
    "evidence:google-gemma-3-12b-it-parameters",
    "evidence:google-gemma-3-12b-it-license",
    "evidence:google-gemma-3-12b-it-context",
    "evidence:four-tables-release-gemma-3-release-log",
    "evidence:v03-a585b339d8df0103fa",
    "evidence:v03-aa33d6d2a6e87d221f"
  ]
});
modelProfiles.push({
  "id": "model-profile:google-gemma-3-1b-it",
  "modelVersionId": "model:google-gemma-3-1b-it",
  "introduction": "Gemma 3 1B IT برخلاف نسخه‌های بزرگ‌تر این نسل فقط متن می‌گیرد و زمینهٔ ۳۲٬۷۶۸ توکن دارد.",
  "roleSummary": "دستیار متنی کوچک از خانوادهٔ Gemma 3",
  "distinguishingFeatures": [
    "Gemma 3 1B IT برخلاف نسخه‌های بزرگ‌تر این نسل فقط متن می‌گیرد و زمینهٔ ۳۲٬۷۶۸ توکن دارد."
  ],
  "languageSummary": "چندزبانه",
  "officialUrl": "https://huggingface.co/google/gemma-3-1b-it",
  "runGuides": [
    {
      "label": "راهنمای اجرای gemma-3-1b-it",
      "engine": "unknown",
      "href": "https://huggingface.co/google/gemma-3-1b-it",
      "conditions": [
        "برای تصویر اسکن‌شده ابتدا OCR بیرونی لازم است؛ ویژگی چندوجهی 4B و بالاتر را به این نسخه تعمیم ندهید."
      ],
      "evidenceIds": [
        "evidence:google-gemma-3-1b-it-card"
      ],
      "engineLabel": "مسیر اجرای ناشر"
    },
    {
      "label": "راه‌اندازی با Transformers",
      "engine": "Transformers",
      "href": "https://huggingface.co/google/gemma-3-1b-it",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-1a289320089618d611"
      ]
    },
    {
      "label": "راه‌اندازی با vLLM",
      "engine": "vLLM",
      "href": "https://huggingface.co/google/gemma-3-1b-it",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-1a289320089618d611"
      ]
    },
    {
      "label": "راه‌اندازی با SGLang",
      "engine": "SGLang",
      "href": "https://huggingface.co/google/gemma-3-1b-it",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-1a289320089618d611"
      ]
    },
    {
      "label": "راه‌اندازی با llama.cpp",
      "engine": "llama.cpp",
      "href": "https://huggingface.co/google/gemma-3-1b-it",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-1a289320089618d611"
      ]
    },
    {
      "label": "دریافت و اجرای بستهٔ Ollama",
      "engine": "Ollama",
      "href": "https://ollama.com/library/gemma3:1b",
      "conditions": [],
      "code": "ollama pull gemma3:1b\nollama run gemma3:1b",
      "codeLanguage": "bash",
      "evidenceIds": [
        "evidence:v03-169b3853ee5ce45444"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:google-gemma-3-1b-it-card",
    "evidence:google-gemma-3-1b-it-metadata",
    "evidence:google-gemma-3-1b-it-parameters",
    "evidence:google-gemma-3-1b-it-license",
    "evidence:google-gemma-3-1b-it-context",
    "evidence:four-tables-release-gemma-3-release-log",
    "evidence:v03-1a289320089618d611",
    "evidence:v03-b481689a19e439eed5"
  ]
});
modelProfiles.push({
  "id": "model-profile:google-gemma-3-27b-it",
  "modelVersionId": "model:google-gemma-3-27b-it",
  "introduction": "Gemma 3 27B IT نسخهٔ متراکم بزرگ این نسل با ورودی بصری و پوشش چندزبانه است.",
  "roleSummary": "درک متن و تصویر با بزرگ‌ترین Gemma 3 فهرست",
  "distinguishingFeatures": [
    "Gemma 3 27B IT نسخهٔ متراکم بزرگ این نسل با ورودی بصری و پوشش چندزبانه است."
  ],
  "languageSummary": "چندزبانه",
  "officialUrl": "https://huggingface.co/google/gemma-3-27b-it",
  "runGuides": [
    {
      "label": "راهنمای اجرای gemma-3-27b-it",
      "engine": "unknown",
      "href": "https://huggingface.co/google/gemma-3-27b-it",
      "conditions": [
        "برای ورودی تصویری، قالب پیام و پردازشگر Gemma 3 لازم است."
      ],
      "evidenceIds": [
        "evidence:google-gemma-3-27b-it-card"
      ],
      "engineLabel": "مسیر اجرای ناشر"
    },
    {
      "label": "راه‌اندازی با Transformers",
      "engine": "Transformers",
      "href": "https://huggingface.co/google/gemma-3-27b-it",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-967dd5737b7fe6620a"
      ]
    },
    {
      "label": "راه‌اندازی با vLLM",
      "engine": "vLLM",
      "href": "https://huggingface.co/google/gemma-3-27b-it",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-967dd5737b7fe6620a"
      ]
    },
    {
      "label": "راه‌اندازی با SGLang",
      "engine": "SGLang",
      "href": "https://huggingface.co/google/gemma-3-27b-it",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-967dd5737b7fe6620a"
      ]
    },
    {
      "label": "راه‌اندازی با llama.cpp",
      "engine": "llama.cpp",
      "href": "https://huggingface.co/google/gemma-3-27b-it",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-967dd5737b7fe6620a"
      ]
    },
    {
      "label": "دریافت و اجرای بستهٔ Ollama",
      "engine": "Ollama",
      "href": "https://ollama.com/library/gemma3:27b",
      "conditions": [],
      "code": "ollama pull gemma3:27b\nollama run gemma3:27b",
      "codeLanguage": "bash",
      "evidenceIds": [
        "evidence:v03-ae321d37ea131f333b"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:google-gemma-3-27b-it-card",
    "evidence:google-gemma-3-27b-it-metadata",
    "evidence:google-gemma-3-27b-it-parameters",
    "evidence:google-gemma-3-27b-it-license",
    "evidence:google-gemma-3-27b-it-context",
    "evidence:four-tables-release-gemma-3-release-log",
    "evidence:v03-967dd5737b7fe6620a",
    "evidence:v03-9d2982a2e1f67b8ace"
  ]
});
modelProfiles.push({
  "id": "model-profile:google-gemma-3-4b-it",
  "modelVersionId": "model:google-gemma-3-4b-it",
  "introduction": "Gemma 3 4B IT کوچک‌ترین مدل چندوجهی این نسل در فهرست است؛ برخلاف 1B می‌تواند تصویر را همراه متن بخواند.",
  "roleSummary": "ورود به پردازش تصویر در خانوادهٔ Gemma 3",
  "distinguishingFeatures": [
    "Gemma 3 4B IT کوچک‌ترین مدل چندوجهی این نسل در فهرست است؛ برخلاف 1B می‌تواند تصویر را همراه متن بخواند."
  ],
  "languageSummary": "چندزبانه",
  "officialUrl": "https://huggingface.co/google/gemma-3-4b-it",
  "runGuides": [
    {
      "label": "راهنمای اجرای gemma-3-4b-it",
      "engine": "unknown",
      "href": "https://huggingface.co/google/gemma-3-4b-it",
      "conditions": [
        "وزن و processor نسخهٔ 4B را با هم دریافت کنید؛ متن خروجی را برای استخراج دقیق اعداد سند اعتبارسنجی کنید."
      ],
      "evidenceIds": [
        "evidence:google-gemma-3-4b-it-card"
      ],
      "engineLabel": "مسیر اجرای ناشر"
    },
    {
      "label": "راه‌اندازی با Transformers",
      "engine": "Transformers",
      "href": "https://huggingface.co/google/gemma-3-4b-it",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-4fef75ec5619801c0c"
      ]
    },
    {
      "label": "راه‌اندازی با vLLM",
      "engine": "vLLM",
      "href": "https://huggingface.co/google/gemma-3-4b-it",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-4fef75ec5619801c0c"
      ]
    },
    {
      "label": "راه‌اندازی با SGLang",
      "engine": "SGLang",
      "href": "https://huggingface.co/google/gemma-3-4b-it",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-4fef75ec5619801c0c"
      ]
    },
    {
      "label": "راه‌اندازی با llama.cpp",
      "engine": "llama.cpp",
      "href": "https://huggingface.co/google/gemma-3-4b-it",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-4fef75ec5619801c0c"
      ]
    },
    {
      "label": "دریافت و اجرای بستهٔ Ollama",
      "engine": "Ollama",
      "href": "https://ollama.com/library/gemma3:4b",
      "conditions": [],
      "code": "ollama pull gemma3:4b\nollama run gemma3:4b",
      "codeLanguage": "bash",
      "evidenceIds": [
        "evidence:v03-cf855082d3791b56f1"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:google-gemma-3-4b-it-card",
    "evidence:google-gemma-3-4b-it-metadata",
    "evidence:google-gemma-3-4b-it-parameters",
    "evidence:google-gemma-3-4b-it-license",
    "evidence:google-gemma-3-4b-it-context",
    "evidence:four-tables-release-gemma-3-release-log",
    "evidence:v03-4fef75ec5619801c0c",
    "evidence:v03-2c393ee03a23020606"
  ]
});
modelProfiles.push({
  "id": "model-profile:google-gemma-4-26b-a4b-it",
  "modelVersionId": "model:google-gemma-4-26b-a4b-it",
  "introduction": "Gemma 4 26B-A4B مدل خبرگانی با کنترل thinking و زمینهٔ ۲۶۲٬۱۴۴ توکن است؛ با نسخهٔ کوچک E2B معماری یکسانی ندارد.",
  "roleSummary": "استدلال چندوجهی با Gemma 4 از نوع MoE",
  "distinguishingFeatures": [
    "Gemma 4 26B-A4B مدل خبرگانی با کنترل thinking و زمینهٔ ۲۶۲٬۱۴۴ توکن است؛ با نسخهٔ کوچک E2B معماری یکسانی ندارد."
  ],
  "languageSummary": "چندزبانه",
  "officialUrl": "https://huggingface.co/google/gemma-4-26B-A4B-it",
  "runGuides": [
    {
      "label": "راهنمای اجرای gemma-4-26B-A4B-it",
      "engine": "unknown",
      "href": "https://huggingface.co/google/gemma-4-26B-A4B-it",
      "conditions": [
        "این نسخه ورودی صوت ندارد؛ شمار پارامتر فعال با کل وزن‌های مدل متفاوت است."
      ],
      "evidenceIds": [
        "evidence:google-gemma-4-26b-a4b-it-card"
      ],
      "engineLabel": "مسیر اجرای ناشر"
    },
    {
      "label": "راه‌اندازی با Transformers",
      "engine": "Transformers",
      "href": "https://huggingface.co/google/gemma-4-26B-A4B-it/raw/4d7ae4984b7db7de8f8457170b3f1a419ee76d52/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-8c073f7e3729dadf20"
      ]
    },
    {
      "label": "راه‌اندازی با llama.cpp",
      "engine": "llama.cpp",
      "href": "https://huggingface.co/google/gemma-4-26B-A4B-it/raw/4d7ae4984b7db7de8f8457170b3f1a419ee76d52/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-8c073f7e3729dadf20"
      ]
    },
    {
      "label": "دریافت و اجرای بستهٔ Ollama",
      "engine": "Ollama",
      "href": "https://ollama.com/library/gemma4:26b-a4b-it-q4_K_M",
      "conditions": [],
      "code": "ollama pull gemma4:26b-a4b-it-q4_K_M\nollama run gemma4:26b-a4b-it-q4_K_M",
      "codeLanguage": "bash",
      "evidenceIds": [
        "evidence:v03-0580726731a3824b8c"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:google-gemma-4-26b-a4b-it-card",
    "evidence:google-gemma-4-26b-a4b-it-metadata",
    "evidence:google-gemma-4-26b-a4b-it-parameters",
    "evidence:google-gemma-4-26b-a4b-it-license",
    "evidence:google-gemma-4-26b-a4b-it-context",
    "evidence:google-gemma-4-26b-a4b-it-config",
    "evidence:four-tables-release-gemma-4-release-log",
    "evidence:v03-8c073f7e3729dadf20",
    "evidence:v03-c533281710e351567d"
  ]
});
modelProfiles.push({
  "id": "model-profile:google-gemma-4-e2b-it",
  "modelVersionId": "model:google-gemma-4-e2b-it",
  "introduction": "Gemma 4 E2B برای اجرای روی دستگاه معرفی شده و ورودی صوت را نیز پشتیبانی می‌کند؛ E2B شمار مؤثر است، نه کل وزن‌ها.",
  "roleSummary": "پردازش محلی متن، تصویر و صوت با Gemma 4 کوچک",
  "distinguishingFeatures": [
    "Gemma 4 E2B برای اجرای روی دستگاه معرفی شده و ورودی صوت را نیز پشتیبانی می‌کند؛ E2B شمار مؤثر است، نه کل وزن‌ها."
  ],
  "languageSummary": "چندزبانه",
  "officialUrl": "https://huggingface.co/google/gemma-4-E2B-it",
  "runGuides": [
    {
      "label": "راهنمای اجرای gemma-4-E2B-it",
      "engine": "unknown",
      "href": "https://huggingface.co/google/gemma-4-E2B-it",
      "conditions": [
        "در محاسبهٔ حافظه از شمار کل و فایل واقعی استفاده کنید؛ مسیر صوت و تصویر به processor متناظر نیاز دارد."
      ],
      "evidenceIds": [
        "evidence:google-gemma-4-e2b-it-card"
      ],
      "engineLabel": "مسیر اجرای ناشر"
    },
    {
      "label": "راه‌اندازی با Transformers",
      "engine": "Transformers",
      "href": "https://huggingface.co/google/gemma-4-E2B-it/raw/3e22461f65e89153144f8adb70e3b8c2cc9845a7/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-a557e664812e64393e"
      ]
    },
    {
      "label": "راه‌اندازی با llama.cpp",
      "engine": "llama.cpp",
      "href": "https://huggingface.co/google/gemma-4-E2B-it/raw/3e22461f65e89153144f8adb70e3b8c2cc9845a7/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-a557e664812e64393e"
      ]
    },
    {
      "label": "دریافت و اجرای بستهٔ Ollama",
      "engine": "Ollama",
      "href": "https://ollama.com/library/gemma4:e2b-it-q4_K_M",
      "conditions": [],
      "code": "ollama pull gemma4:e2b-it-q4_K_M\nollama run gemma4:e2b-it-q4_K_M",
      "codeLanguage": "bash",
      "evidenceIds": [
        "evidence:v03-b1f982556d0b8689d7"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:google-gemma-4-e2b-it-card",
    "evidence:google-gemma-4-e2b-it-metadata",
    "evidence:google-gemma-4-e2b-it-parameters",
    "evidence:google-gemma-4-e2b-it-license",
    "evidence:google-gemma-4-e2b-it-context",
    "evidence:google-gemma-4-e2b-it-config",
    "evidence:four-tables-release-gemma-4-release-log",
    "evidence:v03-a557e664812e64393e",
    "evidence:v03-217e706ae1f430c21e"
  ]
});
modelProfiles.push({
  "id": "model-profile:ibm-granite-granite-3-3-2b-instruct",
  "modelVersionId": "model:ibm-granite-granite-3-3-2b-instruct",
  "introduction": "Granite 3.3 2B Instruct مدل کوچک کسب‌وکارمحور با RAG، خلاصه‌سازی، استخراج متن و حالت تفکر است.",
  "roleSummary": "تولید پاسخ از اسناد بازیابی‌شده",
  "distinguishingFeatures": [
    "Granite 3.3 2B Instruct مدل کوچک کسب‌وکارمحور با RAG، خلاصه‌سازی، استخراج متن و حالت تفکر است."
  ],
  "languageSummary": "چندزبانه",
  "officialUrl": "https://huggingface.co/ibm-granite/granite-3.3-2b-instruct",
  "runGuides": [
    {
      "label": "راهنمای اجرای granite-3.3-2b-instruct",
      "engine": "unknown",
      "href": "https://huggingface.co/ibm-granite/granite-3.3-2b-instruct",
      "conditions": [
        "سند باید توسط سامانه بازیابی و در پیام درج شود؛ خود مدل جای موتور جست‌وجو نیست و فارسی جزو ۱۲ زبان اعلام‌شده نیست."
      ],
      "evidenceIds": [
        "evidence:ibm-granite-granite-3-3-2b-instruct-card"
      ],
      "engineLabel": "مسیر اجرای ناشر"
    },
    {
      "label": "راه‌اندازی با Transformers",
      "engine": "Transformers",
      "href": "https://huggingface.co/ibm-granite/granite-3.3-2b-instruct/raw/707f574c62054322f6b5b04b6d075f0a8f05e0f0/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-0734c7ad0dd63a75da"
      ]
    },
    {
      "label": "دریافت و اجرای بستهٔ Ollama",
      "engine": "Ollama",
      "href": "https://ollama.com/library/granite3.3:2b",
      "conditions": [],
      "code": "ollama pull granite3.3:2b\nollama run granite3.3:2b",
      "codeLanguage": "bash",
      "evidenceIds": [
        "evidence:v03-a5fd0a66b3887dc588"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:ibm-granite-granite-3-3-2b-instruct-card",
    "evidence:ibm-granite-granite-3-3-2b-instruct-metadata",
    "evidence:ibm-granite-granite-3-3-2b-instruct-parameters",
    "evidence:ibm-granite-granite-3-3-2b-instruct-license",
    "evidence:ibm-granite-granite-3-3-2b-instruct-context",
    "evidence:ibm-granite-granite-3-3-2b-instruct-config",
    "evidence:four-tables-release-ibm-granite-3-3-release",
    "evidence:v03-0734c7ad0dd63a75da",
    "evidence:v03-ae9866cb7ade8f6bef"
  ]
});
modelProfiles.push({
  "id": "model-profile:intfloat-multilingual-e5-small",
  "modelVersionId": "model:intfloat-multilingual-e5-small",
  "introduction": "Multilingual E5 Small متن را به بردار ۳۸۴بُعدی تبدیل می‌کند و سقف ورودی آن ۵۱۲ توکن است؛ برای تکه‌های کوتاه سند قابل بررسی است.",
  "roleSummary": "بازیابی چندزبانه با بردار کم‌بُعد",
  "distinguishingFeatures": [
    "Multilingual E5 Small متن را به بردار ۳۸۴بُعدی تبدیل می‌کند و سقف ورودی آن ۵۱۲ توکن است؛ برای تکه‌های کوتاه سند قابل بررسی است."
  ],
  "languageSummary": "زبان‌های اعلام‌شده: آفریکانس، امهری، عربی، آسامی، آذربایجانی، بلاروسی، بلغاری، بنگالی، برتانیایی، بوسنیایی، کاتالان، چکی، ولزی، دانمارکی و زبان‌های دیگر.",
  "officialUrl": "https://huggingface.co/intfloat/multilingual-e5-small",
  "runGuides": [
    {
      "label": "راهنمای اجرای multilingual-e5-small",
      "engine": "Sentence Transformers",
      "href": "https://huggingface.co/intfloat/multilingual-e5-small",
      "instructions": "خروجی این مسیر بردار متن است.",
      "conditions": [
        "پیشوندهای query: و passage: حتی برای زبان‌های غیرانگلیسی لازم‌اند؛ متن بلند را پیش از نمایه‌سازی قطعه‌بندی کنید.",
        "برای پرسش query: و برای سند passage: اضافه شود؛ بردارها با L2 نرمال شوند."
      ],
      "evidenceIds": [
        "evidence:intfloat-multilingual-e5-small-card"
      ]
    },
    {
      "label": "راه‌اندازی با Transformers",
      "engine": "Transformers",
      "href": "https://huggingface.co/intfloat/multilingual-e5-small/raw/614241f622f53c4eeff9890bdc4f31cfecc418b3/README.md",
      "conditions": [
        "برای پرسش query: و برای سند passage: اضافه شود؛ بردارها با L2 نرمال شوند.",
        "pooling میانگین با attention mask؛ توکن‌های padding در میانگین وارد نشوند."
      ],
      "evidenceIds": [
        "evidence:v03-bcba4bc8dac5de20c7"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:intfloat-multilingual-e5-small-card",
    "evidence:intfloat-multilingual-e5-small-metadata",
    "evidence:intfloat-multilingual-e5-small-parameters",
    "evidence:intfloat-multilingual-e5-small-license",
    "evidence:intfloat-multilingual-e5-small-context",
    "evidence:intfloat-multilingual-e5-small-config",
    "evidence:four-tables-release-multilingual-e5-release-year",
    "evidence:v03-bcba4bc8dac5de20c7",
    "evidence:v03-e3947a7dba128dc7e3"
  ]
});
modelProfiles.push({
  "id": "model-profile:meta-llama-llama-3-1-70b-instruct",
  "modelVersionId": "model:meta-llama-llama-3-1-70b-instruct",
  "introduction": "Llama 3.1 70B Instruct برای گفت‌وگوی چندزبانه و کار با متن با زمینهٔ ۱۳۱٬۰۷۲ توکن عرضه شده است.",
  "roleSummary": "دستیار عمومی با Llama 3.1 بزرگ",
  "distinguishingFeatures": [
    "Llama 3.1 70B Instruct برای گفت‌وگوی چندزبانه و کار با متن با زمینهٔ ۱۳۱٬۰۷۲ توکن عرضه شده است."
  ],
  "languageSummary": "زبان‌های اعلام‌شده: انگلیسی، آلمانی، فرانسوی، ایتالیایی، پرتغالی، هندی، اسپانیایی، تایلندی.",
  "officialUrl": "https://huggingface.co/meta-llama/Llama-3.1-70B-Instruct",
  "runGuides": [
    {
      "label": "راهنمای اجرای Llama-3.1-70B-Instruct",
      "engine": "unknown",
      "href": "https://huggingface.co/meta-llama/Llama-3.1-70B-Instruct",
      "conditions": [
        "ورودی این نسخه متن است."
      ],
      "evidenceIds": [
        "evidence:meta-llama-llama-3-1-70b-instruct-card"
      ],
      "engineLabel": "مسیر اجرای ناشر"
    },
    {
      "label": "راه‌اندازی با Transformers",
      "engine": "Transformers",
      "href": "https://huggingface.co/meta-llama/Llama-3.1-70B-Instruct",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-026934816cbcae04b5"
      ]
    },
    {
      "label": "راه‌اندازی با vLLM",
      "engine": "vLLM",
      "href": "https://huggingface.co/meta-llama/Llama-3.1-70B-Instruct",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-026934816cbcae04b5"
      ]
    },
    {
      "label": "راه‌اندازی با SGLang",
      "engine": "SGLang",
      "href": "https://huggingface.co/meta-llama/Llama-3.1-70B-Instruct",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-026934816cbcae04b5"
      ]
    },
    {
      "label": "راه‌اندازی با llama.cpp",
      "engine": "llama.cpp",
      "href": "https://huggingface.co/meta-llama/Llama-3.1-70B-Instruct",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-026934816cbcae04b5"
      ]
    },
    {
      "label": "دریافت و اجرای بستهٔ Ollama",
      "engine": "Ollama",
      "href": "https://ollama.com/library/llama3.1:70b",
      "conditions": [],
      "code": "ollama pull llama3.1:70b\nollama run llama3.1:70b",
      "codeLanguage": "bash",
      "evidenceIds": [
        "evidence:v03-d797abbc7fcf4dbbb4"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:meta-llama-llama-3-1-70b-instruct-card",
    "evidence:meta-llama-llama-3-1-70b-instruct-metadata",
    "evidence:meta-llama-llama-3-1-70b-instruct-parameters",
    "evidence:meta-llama-llama-3-1-70b-instruct-license",
    "evidence:meta-llama-llama-3-1-70b-instruct-context",
    "evidence:four-tables-release-llama-3-1-release",
    "evidence:v03-026934816cbcae04b5",
    "evidence:v03-ae7757c4609601f006"
  ]
});
modelProfiles.push({
  "id": "model-profile:meta-llama-llama-3-1-8b-instruct",
  "modelVersionId": "model:meta-llama-llama-3-1-8b-instruct",
  "introduction": "نسخهٔ 8B از Llama 3.1 برای دستیار عمومی و پیروی از دستور تنظیم شده و با مدل پایهٔ همان اندازه فرق دارد.",
  "roleSummary": "گفت‌وگو و کار با متن با Llama 3.1 هشت‌میلیاردی",
  "distinguishingFeatures": [
    "نسخهٔ 8B از Llama 3.1 برای دستیار عمومی و پیروی از دستور تنظیم شده و با مدل پایهٔ همان اندازه فرق دارد."
  ],
  "languageSummary": "زبان‌های اعلام‌شده: انگلیسی، آلمانی، فرانسوی، ایتالیایی، پرتغالی، هندی، اسپانیایی، تایلندی.",
  "officialUrl": "https://huggingface.co/meta-llama/Llama-3.1-8B-Instruct",
  "runGuides": [
    {
      "label": "راهنمای اجرای Llama-3.1-8B-Instruct",
      "engine": "unknown",
      "href": "https://huggingface.co/meta-llama/Llama-3.1-8B-Instruct",
      "conditions": [
        "قالب پیام و tokenizer نسخهٔ Instruct را حفظ کنید؛ زمینهٔ بلند، کیفیت جواب از سند را تضمین نمی‌کند."
      ],
      "evidenceIds": [
        "evidence:meta-llama-llama-3-1-8b-instruct-card"
      ],
      "engineLabel": "مسیر اجرای ناشر"
    },
    {
      "label": "راه‌اندازی با Transformers",
      "engine": "Transformers",
      "href": "https://huggingface.co/meta-llama/Llama-3.1-8B-Instruct",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-5a3e61cbfee9a9dd77"
      ]
    },
    {
      "label": "راه‌اندازی با vLLM",
      "engine": "vLLM",
      "href": "https://huggingface.co/meta-llama/Llama-3.1-8B-Instruct",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-5a3e61cbfee9a9dd77"
      ]
    },
    {
      "label": "راه‌اندازی با SGLang",
      "engine": "SGLang",
      "href": "https://huggingface.co/meta-llama/Llama-3.1-8B-Instruct",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-5a3e61cbfee9a9dd77"
      ]
    },
    {
      "label": "راه‌اندازی با llama.cpp",
      "engine": "llama.cpp",
      "href": "https://huggingface.co/meta-llama/Llama-3.1-8B-Instruct",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-5a3e61cbfee9a9dd77"
      ]
    },
    {
      "label": "دریافت و اجرای بستهٔ Ollama",
      "engine": "Ollama",
      "href": "https://ollama.com/library/llama3.1:8b",
      "conditions": [],
      "code": "ollama pull llama3.1:8b\nollama run llama3.1:8b",
      "codeLanguage": "bash",
      "evidenceIds": [
        "evidence:v03-cd5673727d83247aaa"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:meta-llama-llama-3-1-8b-instruct-card",
    "evidence:meta-llama-llama-3-1-8b-instruct-metadata",
    "evidence:meta-llama-llama-3-1-8b-instruct-parameters",
    "evidence:meta-llama-llama-3-1-8b-instruct-license",
    "evidence:meta-llama-llama-3-1-8b-instruct-context",
    "evidence:four-tables-release-llama-3-1-release",
    "evidence:v03-5a3e61cbfee9a9dd77",
    "evidence:v03-932946f38a51b6d443"
  ]
});
modelProfiles.push({
  "id": "model-profile:meta-llama-llama-3-2-1b-instruct",
  "modelVersionId": "model:meta-llama-llama-3-2-1b-instruct",
  "introduction": "Llama 3.2 1B Instruct مدل متنی کوچک این نسل است؛ برای کارهای محدود روی متن در دستگاه‌های محلی معرفی شده است.",
  "roleSummary": "بازنویسی و خلاصه‌سازی محلی با Llama کوچک",
  "distinguishingFeatures": [
    "Llama 3.2 1B Instruct مدل متنی کوچک این نسل است؛ برای کارهای محدود روی متن در دستگاه‌های محلی معرفی شده است."
  ],
  "languageSummary": "زبان‌های اعلام‌شده: انگلیسی، آلمانی، فرانسوی، ایتالیایی، پرتغالی، هندی، اسپانیایی، تایلندی.",
  "officialUrl": "https://huggingface.co/meta-llama/Llama-3.2-1B-Instruct",
  "runGuides": [
    {
      "label": "راهنمای اجرای Llama-3.2-1B-Instruct",
      "engine": "unknown",
      "href": "https://huggingface.co/meta-llama/Llama-3.2-1B-Instruct",
      "conditions": [
        "تصویر را مستقیماً نمی‌گیرد؛ مدل‌های Vision خانوادهٔ Llama 3.2 محصول جداگانه‌اند."
      ],
      "evidenceIds": [
        "evidence:meta-llama-llama-3-2-1b-instruct-card"
      ],
      "engineLabel": "مسیر اجرای ناشر"
    },
    {
      "label": "راه‌اندازی با Transformers",
      "engine": "Transformers",
      "href": "https://huggingface.co/meta-llama/Llama-3.2-1B-Instruct",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-04665e2c2232e334fc"
      ]
    },
    {
      "label": "راه‌اندازی با vLLM",
      "engine": "vLLM",
      "href": "https://huggingface.co/meta-llama/Llama-3.2-1B-Instruct",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-04665e2c2232e334fc"
      ]
    },
    {
      "label": "راه‌اندازی با SGLang",
      "engine": "SGLang",
      "href": "https://huggingface.co/meta-llama/Llama-3.2-1B-Instruct",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-04665e2c2232e334fc"
      ]
    },
    {
      "label": "راه‌اندازی با llama.cpp",
      "engine": "llama.cpp",
      "href": "https://huggingface.co/meta-llama/Llama-3.2-1B-Instruct",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-04665e2c2232e334fc"
      ]
    },
    {
      "label": "دریافت و اجرای بستهٔ Ollama",
      "engine": "Ollama",
      "href": "https://ollama.com/library/llama3.2:1b",
      "conditions": [],
      "code": "ollama pull llama3.2:1b\nollama run llama3.2:1b",
      "codeLanguage": "bash",
      "evidenceIds": [
        "evidence:v03-e699893147afbfdc0c"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:meta-llama-llama-3-2-1b-instruct-card",
    "evidence:meta-llama-llama-3-2-1b-instruct-metadata",
    "evidence:meta-llama-llama-3-2-1b-instruct-parameters",
    "evidence:meta-llama-llama-3-2-1b-instruct-license",
    "evidence:meta-llama-llama-3-2-1b-instruct-context",
    "evidence:four-tables-release-llama-3-2-release",
    "evidence:v03-04665e2c2232e334fc",
    "evidence:v03-5e731158bdffec8a4b"
  ]
});
modelProfiles.push({
  "id": "model-profile:meta-llama-llama-3-2-3b-instruct",
  "modelVersionId": "model:meta-llama-llama-3-2-3b-instruct",
  "introduction": "Llama 3.2 3B Instruct برای گفت‌وگو، بازنویسی و خلاصه‌سازی تنظیم شده و از نسخهٔ 1B ظرفیت پارامتری بیشتری دارد.",
  "roleSummary": "دستیار متنی روی دستگاه با Llama سه‌میلیاردی",
  "distinguishingFeatures": [
    "Llama 3.2 3B Instruct برای گفت‌وگو، بازنویسی و خلاصه‌سازی تنظیم شده و از نسخهٔ 1B ظرفیت پارامتری بیشتری دارد."
  ],
  "languageSummary": "زبان‌های اعلام‌شده: انگلیسی، آلمانی، فرانسوی، ایتالیایی، پرتغالی، هندی، اسپانیایی، تایلندی.",
  "officialUrl": "https://huggingface.co/meta-llama/Llama-3.2-3B-Instruct",
  "runGuides": [
    {
      "label": "راهنمای اجرای Llama-3.2-3B-Instruct",
      "engine": "unknown",
      "href": "https://huggingface.co/meta-llama/Llama-3.2-3B-Instruct",
      "conditions": [
        "تفاوت کیفیت و زمان را روی کار خود بسنجید؛ هیچ‌یک از دو مدل متنی 1B و 3B ورودی تصویر ندارند."
      ],
      "evidenceIds": [
        "evidence:meta-llama-llama-3-2-3b-instruct-card"
      ],
      "engineLabel": "مسیر اجرای ناشر"
    },
    {
      "label": "راه‌اندازی با Transformers",
      "engine": "Transformers",
      "href": "https://huggingface.co/meta-llama/Llama-3.2-3B-Instruct",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-40a0310c45dda9cde0"
      ]
    },
    {
      "label": "راه‌اندازی با vLLM",
      "engine": "vLLM",
      "href": "https://huggingface.co/meta-llama/Llama-3.2-3B-Instruct",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-40a0310c45dda9cde0"
      ]
    },
    {
      "label": "راه‌اندازی با SGLang",
      "engine": "SGLang",
      "href": "https://huggingface.co/meta-llama/Llama-3.2-3B-Instruct",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-40a0310c45dda9cde0"
      ]
    },
    {
      "label": "راه‌اندازی با llama.cpp",
      "engine": "llama.cpp",
      "href": "https://huggingface.co/meta-llama/Llama-3.2-3B-Instruct",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-40a0310c45dda9cde0"
      ]
    },
    {
      "label": "دریافت و اجرای بستهٔ Ollama",
      "engine": "Ollama",
      "href": "https://ollama.com/library/llama3.2:3b",
      "conditions": [],
      "code": "ollama pull llama3.2:3b\nollama run llama3.2:3b",
      "codeLanguage": "bash",
      "evidenceIds": [
        "evidence:v03-fd17ff174157dde722"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:meta-llama-llama-3-2-3b-instruct-card",
    "evidence:meta-llama-llama-3-2-3b-instruct-metadata",
    "evidence:meta-llama-llama-3-2-3b-instruct-parameters",
    "evidence:meta-llama-llama-3-2-3b-instruct-license",
    "evidence:meta-llama-llama-3-2-3b-instruct-context",
    "evidence:four-tables-release-llama-3-2-release",
    "evidence:v03-40a0310c45dda9cde0",
    "evidence:v03-1e81b2916ff2e09f66"
  ]
});
modelProfiles.push({
  "id": "model-profile:microsoft-phi-4-mini-instruct",
  "modelVersionId": "model:microsoft-phi-4-mini-instruct",
  "introduction": "Phi-4-mini-instruct با تمرکز بر داده‌های استدلالی و پیروی از دستور ساخته شده و زمینهٔ ۱۳۱٬۰۷۲ توکن دارد.",
  "roleSummary": "تحلیل و منطق در محیط محدودتر",
  "distinguishingFeatures": [
    "Phi-4-mini-instruct با تمرکز بر داده‌های استدلالی و پیروی از دستور ساخته شده و زمینهٔ ۱۳۱٬۰۷۲ توکن دارد."
  ],
  "languageSummary": "زبان‌های اعلام‌شده: عربی، چینی، چکی، دانمارکی، هلندی، انگلیسی، فنلاندی، فرانسوی، آلمانی، عبری، مجاری، ایتالیایی، ژاپنی، کره‌ای و زبان‌های دیگر.",
  "officialUrl": "https://huggingface.co/microsoft/Phi-4-mini-instruct",
  "runGuides": [
    {
      "label": "راهنمای اجرای Phi-4-mini-instruct",
      "engine": "unknown",
      "href": "https://huggingface.co/microsoft/Phi-4-mini-instruct",
      "conditions": [
        "این نسخه با mini-reasoning و multimodal-instruct متفاوت است؛ نمونه‌های ریاضی یا منطق را با نام دقیق همین نسخه مقایسه کنید."
      ],
      "evidenceIds": [
        "evidence:microsoft-phi-4-mini-instruct-card"
      ],
      "engineLabel": "مسیر اجرای ناشر"
    },
    {
      "label": "راه‌اندازی با Transformers",
      "engine": "Transformers",
      "href": "https://huggingface.co/microsoft/Phi-4-mini-instruct/raw/cfbefacb99257ffa30c83adab238a50856ac3083/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-ba9cd843c0a35040af"
      ]
    },
    {
      "label": "راه‌اندازی با vLLM",
      "engine": "vLLM",
      "href": "https://huggingface.co/microsoft/Phi-4-mini-instruct/raw/cfbefacb99257ffa30c83adab238a50856ac3083/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-ba9cd843c0a35040af"
      ]
    },
    {
      "label": "دریافت و اجرای بستهٔ Ollama",
      "engine": "Ollama",
      "href": "https://ollama.com/library/phi4-mini:3.8b",
      "conditions": [],
      "code": "ollama pull phi4-mini:3.8b\nollama run phi4-mini:3.8b",
      "codeLanguage": "bash",
      "evidenceIds": [
        "evidence:v03-5d99b6c79e29802fc5"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:microsoft-phi-4-mini-instruct-card",
    "evidence:microsoft-phi-4-mini-instruct-metadata",
    "evidence:microsoft-phi-4-mini-instruct-parameters",
    "evidence:microsoft-phi-4-mini-instruct-license",
    "evidence:microsoft-phi-4-mini-instruct-context",
    "evidence:microsoft-phi-4-mini-instruct-config",
    "evidence:four-tables-release-phi-4-mini-instruct-release",
    "evidence:v03-ba9cd843c0a35040af",
    "evidence:v03-a381f87e0595d66bb4"
  ]
});
modelProfiles.push({
  "id": "model-profile:mistralai-devstral-small-2-24b-instruct-2512",
  "modelVersionId": "model:mistralai-devstral-small-2-24b-instruct-2512",
  "introduction": "Devstral Small 2 برای مهندسی نرم‌افزار و استفاده از ابزار برای بررسی و اصلاح کد ساخته شده؛ این نسل ورودی تصویر نیز دارد.",
  "roleSummary": "عامل ویرایش چندفایلی و جست‌وجوی مخزن",
  "distinguishingFeatures": [
    "Devstral Small 2 برای مهندسی نرم‌افزار و استفاده از ابزار برای بررسی و اصلاح کد ساخته شده؛ این نسل ورودی تصویر نیز دارد."
  ],
  "languageSummary": "چندزبانه",
  "officialUrl": "https://huggingface.co/mistralai/Devstral-Small-2-24B-Instruct-2512",
  "runGuides": [
    {
      "label": "راهنمای اجرای Devstral-Small-2-24B-Instruct-2512",
      "engine": "unknown",
      "href": "https://huggingface.co/mistralai/Devstral-Small-2-24B-Instruct-2512",
      "conditions": [
        "وزن Instruct این مخزن FP8 است؛ قالب Mistral و وابستگی‌های اجرای همین نسخه را رعایت کنید، نه تنظیمات عمومی یک مدل چت."
      ],
      "evidenceIds": [
        "evidence:mistralai-devstral-small-2-24b-instruct-2512-card"
      ],
      "engineLabel": "مسیر اجرای ناشر"
    },
    {
      "label": "راه‌اندازی با Transformers",
      "engine": "Transformers",
      "href": "https://huggingface.co/mistralai/Devstral-Small-2-24B-Instruct-2512/raw/55c5b41e98c2dbd21b0c8afffc540dcfc9eb5128/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-143cf593115d83d150"
      ]
    },
    {
      "label": "راه‌اندازی با vLLM",
      "engine": "vLLM",
      "href": "https://huggingface.co/mistralai/Devstral-Small-2-24B-Instruct-2512/raw/55c5b41e98c2dbd21b0c8afffc540dcfc9eb5128/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-143cf593115d83d150"
      ]
    },
    {
      "label": "راه‌اندازی با SGLang",
      "engine": "SGLang",
      "href": "https://huggingface.co/mistralai/Devstral-Small-2-24B-Instruct-2512/raw/55c5b41e98c2dbd21b0c8afffc540dcfc9eb5128/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-143cf593115d83d150"
      ]
    },
    {
      "label": "راه‌اندازی با llama.cpp",
      "engine": "llama.cpp",
      "href": "https://huggingface.co/mistralai/Devstral-Small-2-24B-Instruct-2512/raw/55c5b41e98c2dbd21b0c8afffc540dcfc9eb5128/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-143cf593115d83d150"
      ]
    },
    {
      "label": "دریافت و اجرای بستهٔ Ollama",
      "engine": "Ollama",
      "href": "https://ollama.com/library/devstral-small-2:24b",
      "conditions": [],
      "code": "ollama pull devstral-small-2:24b\nollama run devstral-small-2:24b",
      "codeLanguage": "bash",
      "evidenceIds": [
        "evidence:v03-114413b828fe8aae34"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:mistralai-devstral-small-2-24b-instruct-2512-card",
    "evidence:mistralai-devstral-small-2-24b-instruct-2512-metadata",
    "evidence:mistralai-devstral-small-2-24b-instruct-2512-parameters",
    "evidence:mistralai-devstral-small-2-24b-instruct-2512-license",
    "evidence:mistralai-devstral-small-2-24b-instruct-2512-context",
    "evidence:mistralai-devstral-small-2-24b-instruct-2512-config",
    "evidence:four-tables-release-devstral-small-2-release",
    "evidence:v03-143cf593115d83d150",
    "evidence:v03-19c6925f3bfe6955b2"
  ]
});
modelProfiles.push({
  "id": "model-profile:mistralai-ministral-3-3b-instruct-2512",
  "modelVersionId": "model:mistralai-ministral-3-3b-instruct-2512",
  "introduction": "Ministral 3 3B Instruct مدل کوچک متن–تصویر این خانواده است؛ بخش زبان ۳٫۴ و رمزگذار تصویر ۰٫۴میلیارد پارامتر دارند.",
  "roleSummary": "دستیار چندوجهی برای استقرار لبه",
  "distinguishingFeatures": [
    "Ministral 3 3B Instruct مدل کوچک متن–تصویر این خانواده است؛ بخش زبان ۳٫۴ و رمزگذار تصویر ۰٫۴میلیارد پارامتر دارند."
  ],
  "languageSummary": "زبان‌های اعلام‌شده: انگلیسی، فرانسوی، اسپانیایی، آلمانی، ایتالیایی، پرتغالی، هلندی، چینی، ژاپنی، کره‌ای، عربی.",
  "officialUrl": "https://huggingface.co/mistralai/Ministral-3-3B-Instruct-2512",
  "runGuides": [
    {
      "label": "راهنمای اجرای Ministral-3-3B-Instruct-2512",
      "engine": "unknown",
      "href": "https://huggingface.co/mistralai/Ministral-3-3B-Instruct-2512",
      "conditions": [
        "وزن رسمی FP8 است؛ عدد 3B در نام مدل، همهٔ پارامترهای بخش زبان و بینایی را نمی‌شمارد."
      ],
      "evidenceIds": [
        "evidence:mistralai-ministral-3-3b-instruct-2512-card"
      ],
      "engineLabel": "مسیر اجرای ناشر"
    },
    {
      "label": "راه‌اندازی با Transformers",
      "engine": "Transformers",
      "href": "https://huggingface.co/mistralai/Ministral-3-3B-Instruct-2512/raw/b35d4dfe56c142746f54dbd64f579faab2744308/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-422e53fb9ef68804c9"
      ]
    },
    {
      "label": "راه‌اندازی با vLLM",
      "engine": "vLLM",
      "href": "https://huggingface.co/mistralai/Ministral-3-3B-Instruct-2512/raw/b35d4dfe56c142746f54dbd64f579faab2744308/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-422e53fb9ef68804c9"
      ]
    },
    {
      "label": "دریافت و اجرای بستهٔ Ollama",
      "engine": "Ollama",
      "href": "https://ollama.com/library/ministral-3:3b",
      "conditions": [],
      "code": "ollama pull ministral-3:3b\nollama run ministral-3:3b",
      "codeLanguage": "bash",
      "evidenceIds": [
        "evidence:v03-121e13ab774c166d8d"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:mistralai-ministral-3-3b-instruct-2512-card",
    "evidence:mistralai-ministral-3-3b-instruct-2512-metadata",
    "evidence:mistralai-ministral-3-3b-instruct-2512-parameters",
    "evidence:mistralai-ministral-3-3b-instruct-2512-license",
    "evidence:mistralai-ministral-3-3b-instruct-2512-context",
    "evidence:mistralai-ministral-3-3b-instruct-2512-config",
    "evidence:four-tables-release-ministral-3-release",
    "evidence:v03-422e53fb9ef68804c9",
    "evidence:v03-6d2fb461f9bd72440b"
  ]
});
modelProfiles.push({
  "id": "model-profile:mistralai-mistral-7b-instruct-v0-3",
  "modelVersionId": "model:mistralai-mistral-7b-instruct-v0-3",
  "introduction": "Mistral 7B Instruct v0.3 tokenizer نسخهٔ سوم و قابلیت فراخوانی تابع را به این مدل متنی اضافه کرده است.",
  "roleSummary": "دستیار متنی با قالب فراخوانی تابع Mistral",
  "distinguishingFeatures": [
    "Mistral 7B Instruct v0.3 tokenizer نسخهٔ سوم و قابلیت فراخوانی تابع را به این مدل متنی اضافه کرده است."
  ],
  "officialUrl": "https://huggingface.co/mistralai/Mistral-7B-Instruct-v0.3",
  "runGuides": [
    {
      "label": "راهنمای اجرای Mistral-7B-Instruct-v0.3",
      "engine": "unknown",
      "href": "https://huggingface.co/mistralai/Mistral-7B-Instruct-v0.3",
      "conditions": [
        "قالب ابزار و tokenizer v3 باید همراه checkpoint باشند؛ ورودی تصویر در این نسخه وجود ندارد."
      ],
      "evidenceIds": [
        "evidence:mistralai-mistral-7b-instruct-v0-3-card"
      ],
      "engineLabel": "مسیر اجرای ناشر"
    },
    {
      "label": "راه‌اندازی با Transformers",
      "engine": "Transformers",
      "href": "https://huggingface.co/mistralai/Mistral-7B-Instruct-v0.3/raw/c170c708c41dac9275d15a8fff4eca08d52bab71/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-d38ebbe65582b41c27"
      ]
    },
    {
      "label": "دریافت و اجرای بستهٔ Ollama",
      "engine": "Ollama",
      "href": "https://ollama.com/library/mistral:7b-instruct-v0.3-q4_K_M",
      "conditions": [],
      "code": "ollama pull mistral:7b-instruct-v0.3-q4_K_M\nollama run mistral:7b-instruct-v0.3-q4_K_M",
      "codeLanguage": "bash",
      "evidenceIds": [
        "evidence:v03-116e78f2cbf77c8bff"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:mistralai-mistral-7b-instruct-v0-3-card",
    "evidence:mistralai-mistral-7b-instruct-v0-3-metadata",
    "evidence:mistralai-mistral-7b-instruct-v0-3-parameters",
    "evidence:mistralai-mistral-7b-instruct-v0-3-license",
    "evidence:mistralai-mistral-7b-instruct-v0-3-config",
    "evidence:four-tables-release-mistral-7b-v0-3-release",
    "evidence:four-tables-mistralai-mistral-7b-instruct-v0-3-declared-context",
    "evidence:v03-d38ebbe65582b41c27",
    "evidence:v03-da4832a5e1de205edf"
  ]
});
modelProfiles.push({
  "id": "model-profile:mistralai-mistral-small-3-1-24b-instruct-2503",
  "modelVersionId": "model:mistralai-mistral-small-3-1-24b-instruct-2503",
  "introduction": "Mistral Small 3.1 24B Instruct پردازش تصویر و زمینهٔ بلند را به نسل Small افزوده؛ فارسی در فهرست زبان‌های ناشر آمده است.",
  "roleSummary": "دستیار چندزبانهٔ متن و تصویر",
  "distinguishingFeatures": [
    "Mistral Small 3.1 24B Instruct پردازش تصویر و زمینهٔ بلند را به نسل Small افزوده؛ فارسی در فهرست زبان‌های ناشر آمده است."
  ],
  "languageSummary": "زبان‌های اعلام‌شده: انگلیسی، فرانسوی، آلمانی، اسپانیایی، پرتغالی، ایتالیایی، ژاپنی، کره‌ای، روسی، چینی، عربی، فارسی، اندونزیایی، مالایی و زبان‌های دیگر.",
  "officialUrl": "https://huggingface.co/mistralai/Mistral-Small-3.1-24B-Instruct-2503",
  "runGuides": [
    {
      "label": "راهنمای اجرای Mistral-Small-3.1-24B-Instruct-2503",
      "engine": "unknown",
      "href": "https://huggingface.co/mistralai/Mistral-Small-3.1-24B-Instruct-2503",
      "conditions": [
        "برای ابزار و خروجی JSON، قالب و parser متناظر لازم است؛ اعداد مدل Base را با Instruct ترکیب نکنید."
      ],
      "evidenceIds": [
        "evidence:mistralai-mistral-small-3-1-24b-instruct-2503-card"
      ],
      "engineLabel": "مسیر اجرای ناشر"
    },
    {
      "label": "راه‌اندازی با vLLM",
      "engine": "vLLM",
      "href": "https://huggingface.co/mistralai/Mistral-Small-3.1-24B-Instruct-2503/raw/68faf511d618ef198fef186659617cfd2eb8e33a/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-87c60f49d69f5b94bc"
      ]
    },
    {
      "label": "دریافت و اجرای بستهٔ Ollama",
      "engine": "Ollama",
      "href": "https://ollama.com/library/mistral-small3.1:24b",
      "conditions": [],
      "code": "ollama pull mistral-small3.1:24b\nollama run mistral-small3.1:24b",
      "codeLanguage": "bash",
      "evidenceIds": [
        "evidence:v03-dca6009f1abb5636ae"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:mistralai-mistral-small-3-1-24b-instruct-2503-card",
    "evidence:mistralai-mistral-small-3-1-24b-instruct-2503-metadata",
    "evidence:mistralai-mistral-small-3-1-24b-instruct-2503-parameters",
    "evidence:mistralai-mistral-small-3-1-24b-instruct-2503-license",
    "evidence:mistralai-mistral-small-3-1-24b-instruct-2503-context",
    "evidence:mistralai-mistral-small-3-1-24b-instruct-2503-config",
    "evidence:four-tables-release-mistral-small-3-1-release",
    "evidence:v03-87c60f49d69f5b94bc",
    "evidence:v03-b2ab60760fa738c0cc"
  ]
});
modelProfiles.push({
  "id": "model-profile:nvidia-nvidia-nemotron-nano-9b-v2",
  "modelVersionId": "model:nvidia-nvidia-nemotron-nano-9b-v2",
  "introduction": "Nemotron Nano 9B v2 ترکیبی از Mamba-2 و attention است؛ حالت reasoning و بودجهٔ فکرکردن را می‌توان کنترل کرد.",
  "roleSummary": "پاسخ از سند با کنترل بودجهٔ استدلال",
  "distinguishingFeatures": [
    "Nemotron Nano 9B v2 ترکیبی از Mamba-2 و attention است؛ حالت reasoning و بودجهٔ فکرکردن را می‌توان کنترل کرد."
  ],
  "languageSummary": "زبان‌های اعلام‌شده: انگلیسی، اسپانیایی، فرانسوی، آلمانی، ایتالیایی، ژاپنی.",
  "officialUrl": "https://huggingface.co/nvidia/NVIDIA-Nemotron-Nano-9B-v2",
  "runGuides": [
    {
      "label": "راهنمای اجرای NVIDIA-Nemotron-Nano-9B-v2",
      "engine": "unknown",
      "href": "https://huggingface.co/nvidia/NVIDIA-Nemotron-Nano-9B-v2",
      "conditions": [
        "سندهای بازیابی‌شده باید از بیرون وارد شوند؛ شش زبان اعلام‌شده شامل فارسی نیستند و backend باید معماری ترکیبی را پشتیبانی کند."
      ],
      "evidenceIds": [
        "evidence:nvidia-nvidia-nemotron-nano-9b-v2-card"
      ],
      "engineLabel": "مسیر اجرای ناشر"
    },
    {
      "label": "راه‌اندازی با Transformers",
      "engine": "Transformers",
      "href": "https://huggingface.co/nvidia/NVIDIA-Nemotron-Nano-9B-v2/raw/6533e8de2c68e4536bf7c411d7a3ce5734111476/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-01e476ff57f8263d52"
      ]
    },
    {
      "label": "راه‌اندازی با vLLM",
      "engine": "vLLM",
      "href": "https://huggingface.co/nvidia/NVIDIA-Nemotron-Nano-9B-v2/raw/6533e8de2c68e4536bf7c411d7a3ce5734111476/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-01e476ff57f8263d52"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:nvidia-nvidia-nemotron-nano-9b-v2-card",
    "evidence:nvidia-nvidia-nemotron-nano-9b-v2-metadata",
    "evidence:nvidia-nvidia-nemotron-nano-9b-v2-parameters",
    "evidence:nvidia-nvidia-nemotron-nano-9b-v2-license",
    "evidence:nvidia-nvidia-nemotron-nano-9b-v2-context",
    "evidence:nvidia-nvidia-nemotron-nano-9b-v2-config",
    "evidence:four-tables-release-nvidia-nemotron-nano-9b-v2-release",
    "evidence:v03-01e476ff57f8263d52",
    "evidence:v03-8e3fd4ba50887ab622"
  ]
});
modelProfiles.push({
  "id": "model-profile:openai-gpt-oss-120b",
  "modelVersionId": "model:openai-gpt-oss-120b",
  "introduction": "gpt-oss-120b مدل MoE با ۱۱۷میلیارد پارامتر کل و ۵٫۱میلیارد فعال است؛ وزن‌های خبرگان با MXFP4 عرضه شده‌اند.",
  "roleSummary": "عامل با استدلال قابل تنظیم در نسخهٔ بزرگ gpt-oss",
  "distinguishingFeatures": [
    "gpt-oss-120b مدل MoE با ۱۱۷میلیارد پارامتر کل و ۵٫۱میلیارد فعال است؛ وزن‌های خبرگان با MXFP4 عرضه شده‌اند."
  ],
  "officialUrl": "https://huggingface.co/openai/gpt-oss-120b",
  "runGuides": [
    {
      "label": "راهنمای اجرای gpt-oss-120b",
      "engine": "unknown",
      "href": "https://huggingface.co/openai/gpt-oss-120b",
      "conditions": [
        "قالب harmony برای اجرای درست لازم است؛ ابزار مرورگر یا Python را برنامهٔ میزبان فراهم می‌کند و حافظهٔ ادعایی ناشر آزمون این سایت نیست."
      ],
      "evidenceIds": [
        "evidence:openai-gpt-oss-120b-card"
      ],
      "engineLabel": "مسیر اجرای ناشر"
    },
    {
      "label": "راه‌اندازی با Transformers",
      "engine": "Transformers",
      "href": "https://huggingface.co/openai/gpt-oss-120b/raw/b5c939de8f754692c1647ca79fbf85e8c1e70f8a/README.md",
      "conditions": [
        "قالب Harmony لازم است؛ در Transformers آن را با chat template اعمال کنید.",
        "مسیر MXFP4 به Accelerate، kernels و Triton ≥ 3.4 و GPU با compute capability ≥ 7.5 نیاز دارد؛ فایل کرنل‌ها برای اجرای آفلاین باید از قبل ذخیره شود."
      ],
      "evidenceIds": [
        "evidence:v03-576214d889218d9022",
        "evidence:audit-20260916-mxfp4"
      ]
    },
    {
      "label": "راه‌اندازی با vLLM",
      "engine": "vLLM",
      "href": "https://huggingface.co/openai/gpt-oss-120b/raw/b5c939de8f754692c1647ca79fbf85e8c1e70f8a/README.md",
      "conditions": [
        "قالب Harmony لازم است؛ در Transformers آن را با chat template اعمال کنید."
      ],
      "evidenceIds": [
        "evidence:v03-576214d889218d9022"
      ]
    },
    {
      "label": "دریافت و اجرای بستهٔ Ollama",
      "engine": "Ollama",
      "href": "https://ollama.com/library/gpt-oss:120b",
      "conditions": [
        "قالب Harmony لازم است؛ در Transformers آن را با chat template اعمال کنید."
      ],
      "code": "ollama pull gpt-oss:120b\nollama run gpt-oss:120b",
      "codeLanguage": "bash",
      "evidenceIds": [
        "evidence:v03-e7e520a1a6b05f9553"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:openai-gpt-oss-120b-card",
    "evidence:openai-gpt-oss-120b-metadata",
    "evidence:openai-gpt-oss-120b-parameters",
    "evidence:openai-gpt-oss-120b-license",
    "evidence:openai-gpt-oss-120b-config",
    "evidence:four-tables-release-gpt-oss-release",
    "evidence:four-tables-openai-gpt-oss-120b-declared-context",
    "evidence:v03-576214d889218d9022",
    "evidence:v03-9bfd86a616186c31d9"
  ]
});
modelProfiles.push({
  "id": "model-profile:openai-gpt-oss-20b",
  "modelVersionId": "model:openai-gpt-oss-20b",
  "introduction": "gpt-oss-20b با ۲۱میلیارد پارامتر کل و ۳٫۶میلیارد فعال برای کاربرد محلی یا تخصصی معرفی شده؛ سه سطح reasoning دارد.",
  "roleSummary": "استدلال محلی با نسخهٔ کوچک‌تر gpt-oss",
  "distinguishingFeatures": [
    "gpt-oss-20b با ۲۱میلیارد پارامتر کل و ۳٫۶میلیارد فعال برای کاربرد محلی یا تخصصی معرفی شده؛ سه سطح reasoning دارد."
  ],
  "officialUrl": "https://huggingface.co/openai/gpt-oss-20b",
  "runGuides": [
    {
      "label": "راهنمای اجرای gpt-oss-20b",
      "engine": "unknown",
      "href": "https://huggingface.co/openai/gpt-oss-20b",
      "conditions": [
        "قالب harmony و backend سازگار با MXFP4 لازم‌اند؛ نام 20B را جای شمار واقعی وزن‌ها در محاسبات نگذارید."
      ],
      "evidenceIds": [
        "evidence:openai-gpt-oss-20b-card"
      ],
      "engineLabel": "مسیر اجرای ناشر"
    },
    {
      "label": "راه‌اندازی با Transformers",
      "engine": "Transformers",
      "href": "https://huggingface.co/openai/gpt-oss-20b/raw/6cee5e81ee83917806bbde320786a8fb61efebee/README.md",
      "conditions": [
        "قالب Harmony لازم است؛ در Transformers آن را با chat template اعمال کنید.",
        "مسیر MXFP4 به Accelerate، kernels و Triton ≥ 3.4 و GPU با compute capability ≥ 7.5 نیاز دارد؛ فایل کرنل‌ها برای اجرای آفلاین باید از قبل ذخیره شود."
      ],
      "evidenceIds": [
        "evidence:v03-fd7d1b23f44c3bb39c",
        "evidence:audit-20260916-mxfp4"
      ]
    },
    {
      "label": "راه‌اندازی با vLLM",
      "engine": "vLLM",
      "href": "https://huggingface.co/openai/gpt-oss-20b/raw/6cee5e81ee83917806bbde320786a8fb61efebee/README.md",
      "conditions": [
        "قالب Harmony لازم است؛ در Transformers آن را با chat template اعمال کنید."
      ],
      "evidenceIds": [
        "evidence:v03-fd7d1b23f44c3bb39c"
      ]
    },
    {
      "label": "دریافت و اجرای بستهٔ Ollama",
      "engine": "Ollama",
      "href": "https://ollama.com/library/gpt-oss:20b",
      "conditions": [
        "قالب Harmony لازم است؛ در Transformers آن را با chat template اعمال کنید."
      ],
      "code": "ollama pull gpt-oss:20b\nollama run gpt-oss:20b",
      "codeLanguage": "bash",
      "evidenceIds": [
        "evidence:v03-cb4be7b38bc438fe74"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:openai-gpt-oss-20b-card",
    "evidence:openai-gpt-oss-20b-metadata",
    "evidence:openai-gpt-oss-20b-parameters",
    "evidence:openai-gpt-oss-20b-license",
    "evidence:openai-gpt-oss-20b-config",
    "evidence:four-tables-release-gpt-oss-release",
    "evidence:four-tables-openai-gpt-oss-20b-declared-context",
    "evidence:v03-fd7d1b23f44c3bb39c",
    "evidence:v03-74a45e972c4b57d11b"
  ]
});
modelProfiles.push({
  "id": "model-profile:zai-org-glm-4-7-flash",
  "modelVersionId": "model:zai-org-glm-4-7-flash",
  "introduction": "GLM-4.7-Flash مدل MoE از ردهٔ 30B-A3B است؛ کارت مدل برای کارهای عامل چندمرحله‌ای به حفظ thinking بین نوبت‌ها اشاره می‌کند.",
  "roleSummary": "عامل برنامه‌نویسی با استدلال حفظ‌شونده",
  "distinguishingFeatures": [
    "GLM-4.7-Flash مدل MoE از ردهٔ 30B-A3B است؛ کارت مدل برای کارهای عامل چندمرحله‌ای به حفظ thinking بین نوبت‌ها اشاره می‌کند."
  ],
  "languageSummary": "زبان‌های اعلام‌شده: انگلیسی، چینی.",
  "officialUrl": "https://huggingface.co/zai-org/GLM-4.7-Flash",
  "runGuides": [
    {
      "label": "راهنمای اجرای GLM-4.7-Flash",
      "engine": "unknown",
      "href": "https://huggingface.co/zai-org/GLM-4.7-Flash",
      "conditions": [
        "مسیرهای vLLM و SGLang به نسخه‌های توسعه‌ای مشخص وابسته‌اند."
      ],
      "evidenceIds": [
        "evidence:zai-org-glm-4-7-flash-card"
      ],
      "engineLabel": "مسیر اجرای ناشر"
    },
    {
      "label": "راه‌اندازی با Transformers",
      "engine": "Transformers",
      "href": "https://huggingface.co/zai-org/GLM-4.7-Flash/raw/7dd20894a642a0aa287e9827cb1a1f7f91386b67/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-49f871c97c4c5f3728"
      ]
    },
    {
      "label": "راه‌اندازی با vLLM",
      "engine": "vLLM",
      "href": "https://huggingface.co/zai-org/GLM-4.7-Flash/raw/7dd20894a642a0aa287e9827cb1a1f7f91386b67/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-49f871c97c4c5f3728"
      ]
    },
    {
      "label": "راه‌اندازی با SGLang",
      "engine": "SGLang",
      "href": "https://huggingface.co/zai-org/GLM-4.7-Flash/raw/7dd20894a642a0aa287e9827cb1a1f7f91386b67/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-49f871c97c4c5f3728"
      ]
    },
    {
      "label": "دریافت و اجرای بستهٔ Ollama",
      "engine": "Ollama",
      "href": "https://ollama.com/library/glm-4.7-flash:q4_K_M",
      "conditions": [],
      "code": "ollama pull glm-4.7-flash:q4_K_M\nollama run glm-4.7-flash:q4_K_M",
      "codeLanguage": "bash",
      "evidenceIds": [
        "evidence:v03-a89253f52b805c994c"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:zai-org-glm-4-7-flash-card",
    "evidence:zai-org-glm-4-7-flash-metadata",
    "evidence:zai-org-glm-4-7-flash-parameters",
    "evidence:zai-org-glm-4-7-flash-license",
    "evidence:zai-org-glm-4-7-flash-config",
    "evidence:four-tables-release-glm-4-7-flash-release",
    "evidence:v03-49f871c97c4c5f3728",
    "evidence:v03-82d7615468fe0b242b"
  ]
});
modelProfiles.push({
  "id": "model-profile:moonshotai-kimi-k2-instruct",
  "modelVersionId": "model:moonshotai-kimi-k2-instruct",
  "introduction": "عامل متنی برای برنامه‌نویسی و گردش‌کارهای ابزارمحور.",
  "roleSummary": "عامل متنی برای برنامه‌نویسی و گردش‌کارهای ابزارمحور",
  "distinguishingFeatures": [
    "عامل متنی برای برنامه‌نویسی و گردش‌کارهای ابزارمحور"
  ],
  "languageSummary": "چندزبانه",
  "officialUrl": "https://huggingface.co/moonshotai/Kimi-K2-Instruct",
  "runGuides": [
    {
      "label": "راه‌اندازی با vLLM",
      "engine": "vLLM",
      "href": "https://huggingface.co/moonshotai/Kimi-K2-Instruct/raw/fd1984e2b7a3350dbf7305fe73a4ede25c14de50/README.md",
      "conditions": [
        "برای MoE، حافظهٔ وزن بر پایهٔ کل مدل محاسبه می‌شود؛ شمار پارامتر فعال جای اندازهٔ وزن را نمی‌گیرد."
      ],
      "evidenceIds": [
        "evidence:v03-640c88f0733f107c4f"
      ]
    },
    {
      "label": "راه‌اندازی با SGLang",
      "engine": "SGLang",
      "href": "https://huggingface.co/moonshotai/Kimi-K2-Instruct/raw/fd1984e2b7a3350dbf7305fe73a4ede25c14de50/README.md",
      "conditions": [
        "برای MoE، حافظهٔ وزن بر پایهٔ کل مدل محاسبه می‌شود؛ شمار پارامتر فعال جای اندازهٔ وزن را نمی‌گیرد."
      ],
      "evidenceIds": [
        "evidence:v03-640c88f0733f107c4f"
      ]
    },
    {
      "label": "راه‌اندازی با KTransformers",
      "engine": "KTransformers",
      "href": "https://huggingface.co/moonshotai/Kimi-K2-Instruct/raw/fd1984e2b7a3350dbf7305fe73a4ede25c14de50/README.md",
      "conditions": [
        "برای MoE، حافظهٔ وزن بر پایهٔ کل مدل محاسبه می‌شود؛ شمار پارامتر فعال جای اندازهٔ وزن را نمی‌گیرد."
      ],
      "evidenceIds": [
        "evidence:v03-640c88f0733f107c4f"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:v03-b58847ef9a4755e4e2",
    "evidence:v03-f3eb23e52e2e39d7cc",
    "evidence:v03-640c88f0733f107c4f",
    "evidence:v03-8b2dbb13a9608b460a"
  ]
});
modelProfiles.push({
  "id": "model-profile:moonshotai-kimi-k2-thinking",
  "modelVersionId": "model:moonshotai-kimi-k2-thinking",
  "introduction": "عامل استدلالی برای زنجیره‌های طولانی ابزار و تحلیل.",
  "roleSummary": "عامل استدلالی برای زنجیره‌های طولانی ابزار و تحلیل",
  "distinguishingFeatures": [
    "عامل استدلالی برای زنجیره‌های طولانی ابزار و تحلیل"
  ],
  "languageSummary": "چندزبانه",
  "officialUrl": "https://huggingface.co/moonshotai/Kimi-K2-Thinking",
  "runGuides": [
    {
      "label": "راه‌اندازی با vLLM",
      "engine": "vLLM",
      "href": "https://huggingface.co/moonshotai/Kimi-K2-Thinking/raw/a51ccc050d73dab088bf7b0e2dd9b30ae85a4e55/README.md",
      "conditions": [
        "برای MoE، حافظهٔ وزن بر پایهٔ کل مدل محاسبه می‌شود؛ شمار پارامتر فعال جای اندازهٔ وزن را نمی‌گیرد."
      ],
      "evidenceIds": [
        "evidence:v03-e39860c72daa7bc47e"
      ]
    },
    {
      "label": "راه‌اندازی با SGLang",
      "engine": "SGLang",
      "href": "https://huggingface.co/moonshotai/Kimi-K2-Thinking/raw/a51ccc050d73dab088bf7b0e2dd9b30ae85a4e55/README.md",
      "conditions": [
        "برای MoE، حافظهٔ وزن بر پایهٔ کل مدل محاسبه می‌شود؛ شمار پارامتر فعال جای اندازهٔ وزن را نمی‌گیرد."
      ],
      "evidenceIds": [
        "evidence:v03-e39860c72daa7bc47e"
      ]
    },
    {
      "label": "راه‌اندازی با KTransformers",
      "engine": "KTransformers",
      "href": "https://huggingface.co/moonshotai/Kimi-K2-Thinking/raw/a51ccc050d73dab088bf7b0e2dd9b30ae85a4e55/README.md",
      "conditions": [
        "برای MoE، حافظهٔ وزن بر پایهٔ کل مدل محاسبه می‌شود؛ شمار پارامتر فعال جای اندازهٔ وزن را نمی‌گیرد."
      ],
      "evidenceIds": [
        "evidence:v03-e39860c72daa7bc47e"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:v03-ec182872a6715f6a95",
    "evidence:v03-2f089fe45e10f02c00",
    "evidence:v03-e39860c72daa7bc47e",
    "evidence:v03-0a031cd7fe4a4c536a"
  ]
});
modelProfiles.push({
  "id": "model-profile:moonshotai-kimi-k2-5",
  "modelVersionId": "model:moonshotai-kimi-k2-5",
  "introduction": "عامل چندوجهی برای کدنویسی از طرح تصویری و تحلیل سند.",
  "roleSummary": "عامل چندوجهی برای کدنویسی از طرح تصویری و تحلیل سند",
  "distinguishingFeatures": [
    "عامل چندوجهی برای کدنویسی از طرح تصویری و تحلیل سند"
  ],
  "languageSummary": "چندزبانه",
  "officialUrl": "https://huggingface.co/moonshotai/Kimi-K2.5",
  "runGuides": [
    {
      "label": "راه‌اندازی با vLLM",
      "engine": "vLLM",
      "href": "https://huggingface.co/moonshotai/Kimi-K2.5/raw/4d01dfe0332d63057c186e0b262165819efb6611/README.md",
      "conditions": [
        "برای MoE، حافظهٔ وزن بر پایهٔ کل مدل محاسبه می‌شود؛ شمار پارامتر فعال جای اندازهٔ وزن را نمی‌گیرد."
      ],
      "evidenceIds": [
        "evidence:v03-c0e496ce377d981915"
      ]
    },
    {
      "label": "راه‌اندازی با SGLang",
      "engine": "SGLang",
      "href": "https://huggingface.co/moonshotai/Kimi-K2.5/raw/4d01dfe0332d63057c186e0b262165819efb6611/README.md",
      "conditions": [
        "برای MoE، حافظهٔ وزن بر پایهٔ کل مدل محاسبه می‌شود؛ شمار پارامتر فعال جای اندازهٔ وزن را نمی‌گیرد."
      ],
      "evidenceIds": [
        "evidence:v03-c0e496ce377d981915"
      ]
    },
    {
      "label": "راه‌اندازی با KTransformers",
      "engine": "KTransformers",
      "href": "https://huggingface.co/moonshotai/Kimi-K2.5/raw/4d01dfe0332d63057c186e0b262165819efb6611/README.md",
      "conditions": [
        "برای MoE، حافظهٔ وزن بر پایهٔ کل مدل محاسبه می‌شود؛ شمار پارامتر فعال جای اندازهٔ وزن را نمی‌گیرد."
      ],
      "evidenceIds": [
        "evidence:v03-c0e496ce377d981915"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:v03-4c47c52e044e915300",
    "evidence:v03-0c0e5f271111a1cfdd",
    "evidence:v03-c0e496ce377d981915",
    "evidence:v03-b1336058265745176e"
  ]
});
modelProfiles.push({
  "id": "model-profile:minimaxai-minimax-m2-5",
  "modelVersionId": "model:minimaxai-minimax-m2-5",
  "introduction": "دستیار توسعه نرم‌افزار و گردش‌کارهای ابزارمحور.",
  "roleSummary": "دستیار توسعه نرم‌افزار و گردش‌کارهای ابزارمحور",
  "distinguishingFeatures": [
    "دستیار توسعه نرم‌افزار و گردش‌کارهای ابزارمحور"
  ],
  "languageSummary": "چندزبانه",
  "officialUrl": "https://huggingface.co/MiniMaxAI/MiniMax-M2.5",
  "runGuides": [
    {
      "label": "راه‌اندازی با vLLM",
      "engine": "vLLM",
      "href": "https://huggingface.co/MiniMaxAI/MiniMax-M2.5/raw/f710177d938eff80b684d42c5aa84b382612f21f/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-7640341105ebedc8e6"
      ]
    },
    {
      "label": "راه‌اندازی با SGLang",
      "engine": "SGLang",
      "href": "https://huggingface.co/MiniMaxAI/MiniMax-M2.5/raw/f710177d938eff80b684d42c5aa84b382612f21f/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-7640341105ebedc8e6"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:v03-4d0f4731066c607db4",
    "evidence:v03-f8de01b175289d53a6",
    "evidence:v03-7640341105ebedc8e6",
    "evidence:v03-eee503b0e4bf8c3f8e"
  ]
});
modelProfiles.push({
  "id": "model-profile:minimaxai-minimax-m2-1",
  "modelVersionId": "model:minimaxai-minimax-m2-1",
  "introduction": "مدل ابزارمحور برای کدنویسی و برنامه‌ریزی چندمرحله‌ای.",
  "roleSummary": "مدل ابزارمحور برای کدنویسی و برنامه‌ریزی چندمرحله‌ای",
  "distinguishingFeatures": [
    "مدل ابزارمحور برای کدنویسی و برنامه‌ریزی چندمرحله‌ای"
  ],
  "languageSummary": "چندزبانه",
  "officialUrl": "https://huggingface.co/MiniMaxAI/MiniMax-M2.1",
  "runGuides": [
    {
      "label": "راه‌اندازی با vLLM",
      "engine": "vLLM",
      "href": "https://huggingface.co/MiniMaxAI/MiniMax-M2.1/raw/cd97f59135f37b2a6bf09356e485d5e4aeb7dc9c/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-3f3c5c51b03688076f"
      ]
    },
    {
      "label": "راه‌اندازی با SGLang",
      "engine": "SGLang",
      "href": "https://huggingface.co/MiniMaxAI/MiniMax-M2.1/raw/cd97f59135f37b2a6bf09356e485d5e4aeb7dc9c/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-3f3c5c51b03688076f"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:v03-8d2280d20b2a8ebd76",
    "evidence:v03-b2eea93b10fdf84161",
    "evidence:v03-3f3c5c51b03688076f",
    "evidence:v03-53b2f9cf9aabff678c"
  ]
});
modelProfiles.push({
  "id": "model-profile:qwen-qwen3-235b-a22b-instruct-2507",
  "modelVersionId": "model:qwen-qwen3-235b-a22b-instruct-2507",
  "introduction": "دستیار بزرگ با پاسخ مستقیم و زمینهٔ بلند.",
  "roleSummary": "دستیار بزرگ با پاسخ مستقیم و زمینهٔ بلند",
  "distinguishingFeatures": [
    "دستیار بزرگ با پاسخ مستقیم و زمینهٔ بلند"
  ],
  "languageSummary": "چندزبانه",
  "officialUrl": "https://huggingface.co/Qwen/Qwen3-235B-A22B-Instruct-2507",
  "runGuides": [
    {
      "label": "راه‌اندازی با Transformers",
      "engine": "Transformers",
      "href": "https://huggingface.co/Qwen/Qwen3-235B-A22B-Instruct-2507/raw/ac9c66cc9b46af7306746a9250f23d47083d689e/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-e72fa22f5d039b4315"
      ]
    },
    {
      "label": "راه‌اندازی با vLLM",
      "engine": "vLLM",
      "href": "https://huggingface.co/Qwen/Qwen3-235B-A22B-Instruct-2507/raw/ac9c66cc9b46af7306746a9250f23d47083d689e/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-e72fa22f5d039b4315"
      ]
    },
    {
      "label": "راه‌اندازی با SGLang",
      "engine": "SGLang",
      "href": "https://huggingface.co/Qwen/Qwen3-235B-A22B-Instruct-2507/raw/ac9c66cc9b46af7306746a9250f23d47083d689e/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-e72fa22f5d039b4315"
      ]
    },
    {
      "label": "راه‌اندازی با llama.cpp",
      "engine": "llama.cpp",
      "href": "https://huggingface.co/Qwen/Qwen3-235B-A22B-Instruct-2507/raw/ac9c66cc9b46af7306746a9250f23d47083d689e/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-e72fa22f5d039b4315"
      ]
    },
    {
      "label": "دریافت و اجرای بستهٔ Ollama",
      "engine": "Ollama",
      "href": "https://ollama.com/library/qwen3:235b-a22b-instruct-2507-q4_K_M",
      "conditions": [],
      "code": "ollama pull qwen3:235b-a22b-instruct-2507-q4_K_M\nollama run qwen3:235b-a22b-instruct-2507-q4_K_M",
      "codeLanguage": "bash",
      "evidenceIds": [
        "evidence:v03-01c14efd304beef6b0"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:v03-3b23de800db367d448",
    "evidence:v03-7ca38e2c74126feb92",
    "evidence:v03-e72fa22f5d039b4315",
    "evidence:v03-381417148de0dd495b"
  ]
});
modelProfiles.push({
  "id": "model-profile:qwen-qwen3-coder-480b-a35b-instruct",
  "modelVersionId": "model:qwen-qwen3-coder-480b-a35b-instruct",
  "introduction": "عامل کدنویسی برای مخزنهای بزرگ و چندفایلی.",
  "roleSummary": "عامل کدنویسی برای مخزنهای بزرگ و چندفایلی",
  "distinguishingFeatures": [
    "عامل کدنویسی برای مخزنهای بزرگ و چندفایلی"
  ],
  "officialUrl": "https://huggingface.co/Qwen/Qwen3-Coder-480B-A35B-Instruct",
  "runGuides": [
    {
      "label": "راه‌اندازی با Transformers",
      "engine": "Transformers",
      "href": "https://huggingface.co/Qwen/Qwen3-Coder-480B-A35B-Instruct/raw/9d90cf8fca1bf7b7acca42d3fc9ae694a2194069/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-f647db3a19c9a0deea"
      ]
    },
    {
      "label": "راه‌اندازی با llama.cpp",
      "engine": "llama.cpp",
      "href": "https://huggingface.co/Qwen/Qwen3-Coder-480B-A35B-Instruct/raw/9d90cf8fca1bf7b7acca42d3fc9ae694a2194069/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-f647db3a19c9a0deea"
      ]
    },
    {
      "label": "دریافت و اجرای بستهٔ Ollama",
      "engine": "Ollama",
      "href": "https://ollama.com/library/qwen3-coder:480b",
      "conditions": [],
      "code": "ollama pull qwen3-coder:480b\nollama run qwen3-coder:480b",
      "codeLanguage": "bash",
      "evidenceIds": [
        "evidence:v03-f678e88301427b7e87"
      ]
    },
    {
      "label": "سرویس‌دهی با vLLM",
      "engine": "vLLM",
      "href": "https://huggingface.co/Qwen/Qwen3-Coder-480B-A35B-Instruct",
      "instructions": "مسیر سرویس‌دهی در کارت رسمی همین checkpoint",
      "conditions": [
        "برای ابزارخوانی، parser و chat template معرفی‌شده در راهنمای همین checkpoint لازم است."
      ],
      "evidenceIds": [
        "evidence:v03-d7295ef5c2d7198f1e"
      ]
    },
    {
      "label": "سرویس‌دهی با SGLang",
      "engine": "SGLang",
      "href": "https://huggingface.co/Qwen/Qwen3-Coder-480B-A35B-Instruct",
      "instructions": "مسیر سرویس‌دهی در کارت رسمی همین checkpoint",
      "conditions": [
        "برای ابزارخوانی، parser و chat template معرفی‌شده در راهنمای همین checkpoint لازم است."
      ],
      "evidenceIds": [
        "evidence:v03-d7295ef5c2d7198f1e"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:v03-d7295ef5c2d7198f1e",
    "evidence:v03-ce258ef838123c6796",
    "evidence:v03-f647db3a19c9a0deea",
    "evidence:v03-9ed4e6900578054d84"
  ]
});
modelProfiles.push({
  "id": "model-profile:qwen-qwen3-5-27b",
  "modelVersionId": "model:qwen-qwen3-5-27b",
  "introduction": "دستیار چندوجهی برای تحلیل، کد و سند.",
  "roleSummary": "دستیار چندوجهی برای تحلیل، کد و سند",
  "distinguishingFeatures": [
    "دستیار چندوجهی برای تحلیل، کد و سند"
  ],
  "languageSummary": "چندزبانه",
  "officialUrl": "https://huggingface.co/Qwen/Qwen3.5-27B",
  "runGuides": [
    {
      "label": "راه‌اندازی با Transformers",
      "engine": "Transformers",
      "href": "https://huggingface.co/Qwen/Qwen3.5-27B/raw/fc05daec18b0a78c049392ed2e771dde82bdf654/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-bd8ff876ae3abe060f"
      ]
    },
    {
      "label": "راه‌اندازی با vLLM",
      "engine": "vLLM",
      "href": "https://huggingface.co/Qwen/Qwen3.5-27B/raw/fc05daec18b0a78c049392ed2e771dde82bdf654/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-bd8ff876ae3abe060f"
      ]
    },
    {
      "label": "راه‌اندازی با SGLang",
      "engine": "SGLang",
      "href": "https://huggingface.co/Qwen/Qwen3.5-27B/raw/fc05daec18b0a78c049392ed2e771dde82bdf654/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-bd8ff876ae3abe060f"
      ]
    },
    {
      "label": "دریافت و اجرای بستهٔ Ollama",
      "engine": "Ollama",
      "href": "https://ollama.com/library/qwen3.5:27b",
      "conditions": [],
      "code": "ollama pull qwen3.5:27b\nollama run qwen3.5:27b",
      "codeLanguage": "bash",
      "evidenceIds": [
        "evidence:v03-89cf7befa4f35196b0"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:v03-c41b4e1caa6e69ea81",
    "evidence:v03-518ba71c47b5d11a84",
    "evidence:v03-bd8ff876ae3abe060f",
    "evidence:v03-a18cd47c2a8148b452"
  ]
});
modelProfiles.push({
  "id": "model-profile:qwen-qwen3-5-0-8b",
  "modelVersionId": "model:qwen-qwen3-5-0-8b",
  "introduction": "مدل کوچک برای نمونه‌سازی و تخصصی‌سازی وظیفه.",
  "roleSummary": "مدل کوچک برای نمونه‌سازی و تخصصی‌سازی وظیفه",
  "distinguishingFeatures": [
    "مدل کوچک برای نمونه‌سازی و تخصصی‌سازی وظیفه"
  ],
  "languageSummary": "چندزبانه",
  "officialUrl": "https://huggingface.co/Qwen/Qwen3.5-0.8B",
  "runGuides": [
    {
      "label": "راه‌اندازی با Transformers",
      "engine": "Transformers",
      "href": "https://huggingface.co/Qwen/Qwen3.5-0.8B/raw/2fc06364715b967f1860aea9cf38778875588b17/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-2f179b658d60e4483f"
      ]
    },
    {
      "label": "راه‌اندازی با vLLM",
      "engine": "vLLM",
      "href": "https://huggingface.co/Qwen/Qwen3.5-0.8B/raw/2fc06364715b967f1860aea9cf38778875588b17/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-2f179b658d60e4483f"
      ]
    },
    {
      "label": "راه‌اندازی با SGLang",
      "engine": "SGLang",
      "href": "https://huggingface.co/Qwen/Qwen3.5-0.8B/raw/2fc06364715b967f1860aea9cf38778875588b17/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-2f179b658d60e4483f"
      ]
    },
    {
      "label": "دریافت و اجرای بستهٔ Ollama",
      "engine": "Ollama",
      "href": "https://ollama.com/library/qwen3.5:0.8b",
      "conditions": [],
      "code": "ollama pull qwen3.5:0.8b\nollama run qwen3.5:0.8b",
      "codeLanguage": "bash",
      "evidenceIds": [
        "evidence:v03-8892dbaf869ddbf991"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:v03-55c6f0500b4f56dbfc",
    "evidence:v03-c96c19dff3641bdd33",
    "evidence:v03-2f179b658d60e4483f",
    "evidence:v03-444ae591d1df96c579"
  ]
});
modelProfiles.push({
  "id": "model-profile:qwen-qwen3-5-122b-a10b",
  "modelVersionId": "model:qwen-qwen3-5-122b-a10b",
  "introduction": "مدل چندوجهی MoE برای تحلیل و کار با ابزار.",
  "roleSummary": "مدل چندوجهی MoE برای تحلیل و کار با ابزار",
  "distinguishingFeatures": [
    "مدل چندوجهی MoE برای تحلیل و کار با ابزار"
  ],
  "languageSummary": "چندزبانه",
  "officialUrl": "https://huggingface.co/Qwen/Qwen3.5-122B-A10B",
  "runGuides": [
    {
      "label": "راه‌اندازی با Transformers",
      "engine": "Transformers",
      "href": "https://huggingface.co/Qwen/Qwen3.5-122B-A10B/raw/dc4d348443bc740c68e2d77492492c11606384d5/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-077b49671bb5ca41ae"
      ]
    },
    {
      "label": "راه‌اندازی با vLLM",
      "engine": "vLLM",
      "href": "https://huggingface.co/Qwen/Qwen3.5-122B-A10B/raw/dc4d348443bc740c68e2d77492492c11606384d5/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-077b49671bb5ca41ae"
      ]
    },
    {
      "label": "راه‌اندازی با SGLang",
      "engine": "SGLang",
      "href": "https://huggingface.co/Qwen/Qwen3.5-122B-A10B/raw/dc4d348443bc740c68e2d77492492c11606384d5/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-077b49671bb5ca41ae"
      ]
    },
    {
      "label": "دریافت و اجرای بستهٔ Ollama",
      "engine": "Ollama",
      "href": "https://ollama.com/library/qwen3.5:122b",
      "conditions": [],
      "code": "ollama pull qwen3.5:122b\nollama run qwen3.5:122b",
      "codeLanguage": "bash",
      "evidenceIds": [
        "evidence:v03-572ceccbd01bff2a23"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:v03-97cad1067fd38e851d",
    "evidence:v03-a03eb2799c3310f6d5",
    "evidence:v03-077b49671bb5ca41ae",
    "evidence:v03-57983cea3403d384e7"
  ]
});
modelProfiles.push({
  "id": "model-profile:qwen-qwen3-5-397b-a17b",
  "modelVersionId": "model:qwen-qwen3-5-397b-a17b",
  "introduction": "دستیار چندوجهی بزرگ برای مسائل پیچیده.",
  "roleSummary": "دستیار چندوجهی بزرگ برای مسائل پیچیده",
  "distinguishingFeatures": [
    "دستیار چندوجهی بزرگ برای مسائل پیچیده"
  ],
  "languageSummary": "چندزبانه",
  "officialUrl": "https://huggingface.co/Qwen/Qwen3.5-397B-A17B",
  "runGuides": [
    {
      "label": "راه‌اندازی با Transformers",
      "engine": "Transformers",
      "href": "https://huggingface.co/Qwen/Qwen3.5-397B-A17B/raw/8472618112abcbd45acbcdc58436aff4233c23f7/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-2ee03fb807e16d7989"
      ]
    },
    {
      "label": "راه‌اندازی با vLLM",
      "engine": "vLLM",
      "href": "https://huggingface.co/Qwen/Qwen3.5-397B-A17B/raw/8472618112abcbd45acbcdc58436aff4233c23f7/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-2ee03fb807e16d7989"
      ]
    },
    {
      "label": "راه‌اندازی با SGLang",
      "engine": "SGLang",
      "href": "https://huggingface.co/Qwen/Qwen3.5-397B-A17B/raw/8472618112abcbd45acbcdc58436aff4233c23f7/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-2ee03fb807e16d7989"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:v03-0f7a00c925a4c9be93",
    "evidence:v03-c52157de04e37be3d7",
    "evidence:v03-2ee03fb807e16d7989",
    "evidence:v03-1d91b02cc4cb97b07e"
  ]
});
modelProfiles.push({
  "id": "model-profile:meta-llama-llama-3-3-70b-instruct",
  "modelVersionId": "model:meta-llama-llama-3-3-70b-instruct",
  "introduction": "دستیار متنی چندزبانه برای پاسخ‌گویی و کار سازمانی.",
  "roleSummary": "دستیار متنی چندزبانه برای پاسخ‌گویی و کار سازمانی",
  "distinguishingFeatures": [
    "دستیار متنی چندزبانه برای پاسخ‌گویی و کار سازمانی"
  ],
  "languageSummary": "زبان‌های اعلام‌شده: انگلیسی، فرانسوی، ایتالیایی، پرتغالی، هندی، اسپانیایی، تایلندی، آلمانی.",
  "officialUrl": "https://huggingface.co/meta-llama/Llama-3.3-70B-Instruct",
  "runGuides": [
    {
      "label": "راه‌اندازی با Transformers",
      "engine": "Transformers",
      "href": "https://huggingface.co/meta-llama/Llama-3.3-70B-Instruct",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-9b1a731a0f6782ae65"
      ]
    },
    {
      "label": "راه‌اندازی با vLLM",
      "engine": "vLLM",
      "href": "https://huggingface.co/meta-llama/Llama-3.3-70B-Instruct",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-9b1a731a0f6782ae65"
      ]
    },
    {
      "label": "راه‌اندازی با SGLang",
      "engine": "SGLang",
      "href": "https://huggingface.co/meta-llama/Llama-3.3-70B-Instruct",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-9b1a731a0f6782ae65"
      ]
    },
    {
      "label": "راه‌اندازی با llama.cpp",
      "engine": "llama.cpp",
      "href": "https://huggingface.co/meta-llama/Llama-3.3-70B-Instruct",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-9b1a731a0f6782ae65"
      ]
    },
    {
      "label": "دریافت و اجرای بستهٔ Ollama",
      "engine": "Ollama",
      "href": "https://ollama.com/library/llama3.3:70b",
      "conditions": [],
      "code": "ollama pull llama3.3:70b\nollama run llama3.3:70b",
      "codeLanguage": "bash",
      "evidenceIds": [
        "evidence:v03-912c73e01115cf08e1"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:v03-ebf42b3384ad80bb49",
    "evidence:v03-d001483976ddb664cc",
    "evidence:v03-9b1a731a0f6782ae65",
    "evidence:v03-86a881a107bc2da46e"
  ]
});
modelProfiles.push({
  "id": "model-profile:microsoft-phi-4",
  "modelVersionId": "model:microsoft-phi-4",
  "introduction": "مدل انگلیسی برای ریاضی، منطق و تولید متن.",
  "roleSummary": "مدل انگلیسی برای ریاضی، منطق و تولید متن",
  "distinguishingFeatures": [
    "مدل انگلیسی برای ریاضی، منطق و تولید متن"
  ],
  "languageSummary": "زبان‌های اعلام‌شده: انگلیسی.",
  "officialUrl": "https://huggingface.co/microsoft/phi-4",
  "runGuides": [
    {
      "label": "دریافت و اجرای بستهٔ Ollama",
      "engine": "Ollama",
      "href": "https://ollama.com/library/phi4:14b",
      "conditions": [],
      "code": "ollama pull phi4:14b\nollama run phi4:14b",
      "codeLanguage": "bash",
      "evidenceIds": [
        "evidence:v03-4b138db2b910372bb9"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:v03-b4c3ee39936e6647af",
    "evidence:v03-c703b8abd17c62f0d4",
    "evidence:v03-606b11c691a36f7f48",
    "evidence:v03-6fe507bb1b7985be07"
  ]
});
modelProfiles.push({
  "id": "model-profile:huggingfacetb-smolvlm2-2-2b-instruct",
  "modelVersionId": "model:huggingfacetb-smolvlm2-2-2b-instruct",
  "introduction": "مدل کوچک برای پرسش از تصویر و ویدئو.",
  "roleSummary": "مدل کوچک برای پرسش از تصویر و ویدئو",
  "distinguishingFeatures": [
    "مدل کوچک برای پرسش از تصویر و ویدئو"
  ],
  "languageSummary": "زبان‌های اعلام‌شده: انگلیسی.",
  "officialUrl": "https://huggingface.co/HuggingFaceTB/SmolVLM2-2.2B-Instruct",
  "runGuides": [
    {
      "label": "راه‌اندازی با Transformers",
      "engine": "Transformers",
      "href": "https://huggingface.co/HuggingFaceTB/SmolVLM2-2.2B-Instruct/raw/482adb537c021c86670beed01cd58990d01e72e4/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-80457b3bd01c20cffe"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:v03-631fe5c88740f064ce",
    "evidence:v03-d61db496b3bf934ff5",
    "evidence:v03-80457b3bd01c20cffe",
    "evidence:v03-f15c37d324f87ab3f0"
  ]
});
modelProfiles.push({
  "id": "model-profile:sentence-transformers-all-minilm-l6-v2",
  "modelVersionId": "model:sentence-transformers-all-minilm-l6-v2",
  "introduction": "بردارساز سبک انگلیسی برای جست‌وجو و خوشه‌بندی.",
  "roleSummary": "بردارساز سبک انگلیسی برای جست‌وجو و خوشه‌بندی",
  "distinguishingFeatures": [
    "بردارساز سبک انگلیسی برای جست‌وجو و خوشه‌بندی"
  ],
  "languageSummary": "زبان‌های اعلام‌شده: انگلیسی.",
  "officialUrl": "https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2",
  "runGuides": [
    {
      "label": "راه‌اندازی با Transformers",
      "engine": "Transformers",
      "href": "https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2/raw/1110a243fdf4706b3f48f1d95db1a4f5529b4d41/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-9c825c8b7ff67b8e2e"
      ]
    },
    {
      "label": "راه‌اندازی با Sentence Transformers",
      "engine": "Sentence Transformers",
      "href": "https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2/raw/1110a243fdf4706b3f48f1d95db1a4f5529b4d41/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-9c825c8b7ff67b8e2e"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:v03-2cb4687f989ac09455",
    "evidence:v03-3fec5ca622325bf058",
    "evidence:v03-9c825c8b7ff67b8e2e",
    "evidence:v03-519d0a1e8a26326849"
  ]
});
modelProfiles.push({
  "id": "model-profile:intfloat-multilingual-e5-base",
  "modelVersionId": "model:intfloat-multilingual-e5-base",
  "introduction": "بردارساز چندزبانه با پیشوند مجزای پرسش و سند.",
  "roleSummary": "بردارساز چندزبانه با پیشوند مجزای پرسش و سند",
  "distinguishingFeatures": [
    "بردارساز چندزبانه با پیشوند مجزای پرسش و سند"
  ],
  "languageSummary": "زبان‌های اعلام‌شده: آفریکانس، امهری، عربی، آسامی، آذربایجانی، بلاروسی، بلغاری، بنگالی، برتانیایی، بوسنیایی، کاتالان، چکی، ولزی، دانمارکی و زبان‌های دیگر.",
  "officialUrl": "https://huggingface.co/intfloat/multilingual-e5-base",
  "runGuides": [
    {
      "label": "راه‌اندازی با Transformers",
      "engine": "Transformers",
      "href": "https://huggingface.co/intfloat/multilingual-e5-base/raw/d128750597153bb5987e10b1c3493a34e5a4502a/README.md",
      "conditions": [
        "برای پرسش query: و برای سند passage: اضافه شود؛ بردارها با L2 نرمال شوند.",
        "pooling میانگین با attention mask؛ توکن‌های padding در میانگین وارد نشوند."
      ],
      "evidenceIds": [
        "evidence:v03-647a6dc4d6b4cce867"
      ]
    },
    {
      "label": "راه‌اندازی با Sentence Transformers",
      "engine": "Sentence Transformers",
      "href": "https://huggingface.co/intfloat/multilingual-e5-base/raw/d128750597153bb5987e10b1c3493a34e5a4502a/README.md",
      "conditions": [
        "برای پرسش query: و برای سند passage: اضافه شود؛ بردارها با L2 نرمال شوند."
      ],
      "evidenceIds": [
        "evidence:v03-647a6dc4d6b4cce867"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:v03-17655ad5c9b76e7791",
    "evidence:v03-0693360b6b8a68f2e9",
    "evidence:v03-647a6dc4d6b4cce867",
    "evidence:v03-8b681e95e2afb5e767"
  ]
});
modelProfiles.push({
  "id": "model-profile:intfloat-multilingual-e5-large",
  "modelVersionId": "model:intfloat-multilingual-e5-large",
  "introduction": "بردارساز چندزبانه برای جست‌وجوی معنایی.",
  "roleSummary": "بردارساز چندزبانه برای جست‌وجوی معنایی",
  "distinguishingFeatures": [
    "بردارساز چندزبانه برای جست‌وجوی معنایی"
  ],
  "languageSummary": "زبان‌های اعلام‌شده: آفریکانس، امهری، عربی، آسامی، آذربایجانی، بلاروسی، بلغاری، بنگالی، برتانیایی، بوسنیایی، کاتالان، چکی، ولزی، دانمارکی و زبان‌های دیگر.",
  "officialUrl": "https://huggingface.co/intfloat/multilingual-e5-large",
  "runGuides": [
    {
      "label": "راه‌اندازی با Transformers",
      "engine": "Transformers",
      "href": "https://huggingface.co/intfloat/multilingual-e5-large/raw/3d7cfbdacd47fdda877c5cd8a79fbcc4f2a574f3/README.md",
      "conditions": [
        "برای پرسش query: و برای سند passage: اضافه شود؛ بردارها با L2 نرمال شوند.",
        "pooling میانگین با attention mask؛ توکن‌های padding در میانگین وارد نشوند."
      ],
      "evidenceIds": [
        "evidence:v03-c8765fd75612ce9bda"
      ]
    },
    {
      "label": "راه‌اندازی با Sentence Transformers",
      "engine": "Sentence Transformers",
      "href": "https://huggingface.co/intfloat/multilingual-e5-large/raw/3d7cfbdacd47fdda877c5cd8a79fbcc4f2a574f3/README.md",
      "conditions": [
        "برای پرسش query: و برای سند passage: اضافه شود؛ بردارها با L2 نرمال شوند."
      ],
      "evidenceIds": [
        "evidence:v03-c8765fd75612ce9bda"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:v03-37aeb13b8bee55645c",
    "evidence:v03-0af2545260225ec299",
    "evidence:v03-c8765fd75612ce9bda",
    "evidence:v03-b29a32109be89df2b8"
  ]
});
modelProfiles.push({
  "id": "model-profile:baai-bge-small-en-v1-5",
  "modelVersionId": "model:baai-bge-small-en-v1-5",
  "introduction": "بردارساز کوچک انگلیسی برای بازیابی اسناد.",
  "roleSummary": "بردارساز کوچک انگلیسی برای بازیابی اسناد",
  "distinguishingFeatures": [
    "بردارساز کوچک انگلیسی برای بازیابی اسناد"
  ],
  "languageSummary": "زبان‌های اعلام‌شده: انگلیسی.",
  "officialUrl": "https://huggingface.co/BAAI/bge-small-en-v1.5",
  "runGuides": [
    {
      "label": "راه‌اندازی با Transformers",
      "engine": "Transformers",
      "href": "https://huggingface.co/BAAI/bge-small-en-v1.5/raw/5c38ec7c405ec4b44b94cc5a9bb96e735b38267a/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-f20cf032d0b3ba91f5"
      ]
    },
    {
      "label": "راه‌اندازی با Sentence Transformers",
      "engine": "Sentence Transformers",
      "href": "https://huggingface.co/BAAI/bge-small-en-v1.5/raw/5c38ec7c405ec4b44b94cc5a9bb96e735b38267a/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-f20cf032d0b3ba91f5"
      ]
    },
    {
      "label": "راه‌اندازی با FlagEmbedding",
      "engine": "FlagEmbedding",
      "href": "https://huggingface.co/BAAI/bge-small-en-v1.5/raw/5c38ec7c405ec4b44b94cc5a9bb96e735b38267a/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-f20cf032d0b3ba91f5"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:v03-20543469523a77e0ff",
    "evidence:v03-b1a5d8f1fca5485991",
    "evidence:v03-f20cf032d0b3ba91f5",
    "evidence:v03-70d82cf5e0139480c4"
  ]
});
modelProfiles.push({
  "id": "model-profile:baai-bge-reranker-base",
  "modelVersionId": "model:baai-bge-reranker-base",
  "introduction": "بازرتبه‌بند انگلیسی و چینی برای نتایج جست‌وجو.",
  "roleSummary": "بازرتبه‌بند انگلیسی و چینی برای نتایج جست‌وجو",
  "distinguishingFeatures": [
    "بازرتبه‌بند انگلیسی و چینی برای نتایج جست‌وجو"
  ],
  "languageSummary": "زبان‌های اعلام‌شده: انگلیسی، چینی.",
  "officialUrl": "https://huggingface.co/BAAI/bge-reranker-base",
  "runGuides": [
    {
      "label": "راه‌اندازی با Transformers",
      "engine": "Transformers",
      "href": "https://huggingface.co/BAAI/bge-reranker-base/raw/2cfc18c9415c912f9d8155881c133215df768a70/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-59ea9a6b606782ac4a"
      ]
    },
    {
      "label": "راه‌اندازی با Sentence Transformers",
      "engine": "Sentence Transformers",
      "href": "https://huggingface.co/BAAI/bge-reranker-base/raw/2cfc18c9415c912f9d8155881c133215df768a70/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-59ea9a6b606782ac4a"
      ]
    },
    {
      "label": "راه‌اندازی با FlagEmbedding",
      "engine": "FlagEmbedding",
      "href": "https://huggingface.co/BAAI/bge-reranker-base/raw/2cfc18c9415c912f9d8155881c133215df768a70/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-59ea9a6b606782ac4a"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:v03-4f5b7c37e93be58934",
    "evidence:v03-8cc5caa3a99a885139",
    "evidence:v03-59ea9a6b606782ac4a",
    "evidence:v03-384e89e117316b0e89"
  ]
});
modelProfiles.push({
  "id": "model-profile:qwen-qwen2-5-coder-7b-instruct",
  "modelVersionId": "model:qwen-qwen2-5-coder-7b-instruct",
  "introduction": "دستیار کدنویسی کوچک برای توضیح و اصلاح کد.",
  "roleSummary": "دستیار کدنویسی کوچک برای توضیح و اصلاح کد",
  "distinguishingFeatures": [
    "دستیار کدنویسی کوچک برای توضیح و اصلاح کد"
  ],
  "languageSummary": "زبان‌های اعلام‌شده: انگلیسی.",
  "officialUrl": "https://huggingface.co/Qwen/Qwen2.5-Coder-7B-Instruct",
  "runGuides": [
    {
      "label": "راه‌اندازی با Transformers",
      "engine": "Transformers",
      "href": "https://huggingface.co/Qwen/Qwen2.5-Coder-7B-Instruct/raw/c03e6d358207e414f1eca0bb1891e29f1db0e242/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-6cacb45b6a53ee5b07"
      ]
    },
    {
      "label": "راه‌اندازی با vLLM",
      "engine": "vLLM",
      "href": "https://huggingface.co/Qwen/Qwen2.5-Coder-7B-Instruct/raw/c03e6d358207e414f1eca0bb1891e29f1db0e242/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-6cacb45b6a53ee5b07"
      ]
    },
    {
      "label": "دریافت و اجرای بستهٔ Ollama",
      "engine": "Ollama",
      "href": "https://ollama.com/library/qwen2.5-coder:7b-instruct-q4_K_M",
      "conditions": [],
      "code": "ollama pull qwen2.5-coder:7b-instruct-q4_K_M\nollama run qwen2.5-coder:7b-instruct-q4_K_M",
      "codeLanguage": "bash",
      "evidenceIds": [
        "evidence:v03-f8fdeaad02bd18cfff"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:v03-b2e0d889b1cceb9038",
    "evidence:v03-409211188b03baa742",
    "evidence:v03-6cacb45b6a53ee5b07",
    "evidence:v03-843697a18e617d59c0"
  ]
});
modelProfiles.push({
  "id": "model-profile:qwen-qwen2-5-coder-14b-instruct",
  "modelVersionId": "model:qwen-qwen2-5-coder-14b-instruct",
  "introduction": "دستیار کدنویسی برای تولید، توضیح و رفع خطا.",
  "roleSummary": "دستیار کدنویسی برای تولید، توضیح و رفع خطا",
  "distinguishingFeatures": [
    "دستیار کدنویسی برای تولید، توضیح و رفع خطا"
  ],
  "languageSummary": "زبان‌های اعلام‌شده: انگلیسی.",
  "officialUrl": "https://huggingface.co/Qwen/Qwen2.5-Coder-14B-Instruct",
  "runGuides": [
    {
      "label": "راه‌اندازی با Transformers",
      "engine": "Transformers",
      "href": "https://huggingface.co/Qwen/Qwen2.5-Coder-14B-Instruct/raw/aedcc2d42b622764e023cf882b6652e646b95671/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-372fbdddb400aa9652"
      ]
    },
    {
      "label": "راه‌اندازی با vLLM",
      "engine": "vLLM",
      "href": "https://huggingface.co/Qwen/Qwen2.5-Coder-14B-Instruct/raw/aedcc2d42b622764e023cf882b6652e646b95671/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-372fbdddb400aa9652"
      ]
    },
    {
      "label": "دریافت و اجرای بستهٔ Ollama",
      "engine": "Ollama",
      "href": "https://ollama.com/library/qwen2.5-coder:14b-instruct-q4_K_M",
      "conditions": [],
      "code": "ollama pull qwen2.5-coder:14b-instruct-q4_K_M\nollama run qwen2.5-coder:14b-instruct-q4_K_M",
      "codeLanguage": "bash",
      "evidenceIds": [
        "evidence:v03-0e899e452efca38cc7"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:v03-43083354e4092cf35d",
    "evidence:v03-f48bf2d137d0fb4870",
    "evidence:v03-372fbdddb400aa9652",
    "evidence:v03-24b3b6f0d5d25dc5c4"
  ]
});
modelProfiles.push({
  "id": "model-profile:qwen-qwen2-5-coder-32b-instruct",
  "modelVersionId": "model:qwen-qwen2-5-coder-32b-instruct",
  "introduction": "دستیار کدنویسی با ظرفیت بیشتر برای مسائل دشوار.",
  "roleSummary": "دستیار کدنویسی با ظرفیت بیشتر برای مسائل دشوار",
  "distinguishingFeatures": [
    "دستیار کدنویسی با ظرفیت بیشتر برای مسائل دشوار"
  ],
  "languageSummary": "زبان‌های اعلام‌شده: انگلیسی.",
  "officialUrl": "https://huggingface.co/Qwen/Qwen2.5-Coder-32B-Instruct",
  "runGuides": [
    {
      "label": "راه‌اندازی با Transformers",
      "engine": "Transformers",
      "href": "https://huggingface.co/Qwen/Qwen2.5-Coder-32B-Instruct/raw/381fc969f78efac66bc87ff7ddeadb7e73c218a7/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-8dc6a67f1d3ac055f4"
      ]
    },
    {
      "label": "راه‌اندازی با vLLM",
      "engine": "vLLM",
      "href": "https://huggingface.co/Qwen/Qwen2.5-Coder-32B-Instruct/raw/381fc969f78efac66bc87ff7ddeadb7e73c218a7/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-8dc6a67f1d3ac055f4"
      ]
    },
    {
      "label": "دریافت و اجرای بستهٔ Ollama",
      "engine": "Ollama",
      "href": "https://ollama.com/library/qwen2.5-coder:32b-instruct-q4_K_M",
      "conditions": [],
      "code": "ollama pull qwen2.5-coder:32b-instruct-q4_K_M\nollama run qwen2.5-coder:32b-instruct-q4_K_M",
      "codeLanguage": "bash",
      "evidenceIds": [
        "evidence:v03-6c926a057023d6f1a1"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:v03-6a32c6eb377351a96e",
    "evidence:v03-12a8034a3f8b975a18",
    "evidence:v03-8dc6a67f1d3ac055f4",
    "evidence:v03-6569e767d0be12a19a"
  ]
});
modelProfiles.push({
  "id": "model-profile:google-embeddinggemma-300m",
  "modelVersionId": "model:google-embeddinggemma-300m",
  "introduction": "بردارساز چندزبانه کوچک برای اجرا روی دستگاه.",
  "roleSummary": "بردارساز چندزبانه کوچک برای اجرا روی دستگاه",
  "distinguishingFeatures": [
    "بردارساز چندزبانه کوچک برای اجرا روی دستگاه"
  ],
  "languageSummary": "چندزبانه",
  "officialUrl": "https://huggingface.co/google/embeddinggemma-300m",
  "runGuides": [
    {
      "label": "راه‌اندازی با Transformers",
      "engine": "Transformers",
      "href": "https://huggingface.co/google/embeddinggemma-300m",
      "conditions": [
        "برای بازیابی، قالب task: search result | query: را برای پرسش و title: … | text: … را برای سند به کار ببرید؛ prompt خودکار کتابخانه را دوباره به متن اضافه نکنید."
      ],
      "evidenceIds": [
        "evidence:v03-4fc4be5e247f489a27"
      ]
    },
    {
      "label": "راه‌اندازی با Sentence Transformers",
      "engine": "Sentence Transformers",
      "href": "https://huggingface.co/google/embeddinggemma-300m",
      "conditions": [
        "برای بازیابی، قالب task: search result | query: را برای پرسش و title: … | text: … را برای سند به کار ببرید؛ prompt خودکار کتابخانه را دوباره به متن اضافه نکنید."
      ],
      "evidenceIds": [
        "evidence:v03-4fc4be5e247f489a27"
      ]
    },
    {
      "label": "دریافت و اجرای بستهٔ Ollama",
      "engine": "Ollama",
      "href": "https://ollama.com/library/embeddinggemma:300m",
      "conditions": [],
      "code": "ollama pull embeddinggemma:300m\ncurl http://localhost:11434/api/embed -d '{\"model\": \"embeddinggemma:300m\", \"input\": \"متن نمونه\"}'",
      "codeLanguage": "bash",
      "evidenceIds": [
        "evidence:v03-fe2e7799dab3a2dfa6"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:v03-a6278cb6f93e17dd71",
    "evidence:v03-8c37117f47e7566c57",
    "evidence:v03-4fc4be5e247f489a27",
    "evidence:v03-1a5876078e1906373a"
  ]
});
modelProfiles.push({
  "id": "model-profile:jinaai-jina-embeddings-v3",
  "modelVersionId": "model:jinaai-jina-embeddings-v3",
  "introduction": "بردارساز چندزبانه با آداپترهای وابسته به وظیفه.",
  "roleSummary": "بردارساز چندزبانه با آداپترهای وابسته به وظیفه",
  "distinguishingFeatures": [
    "بردارساز چندزبانه با آداپترهای وابسته به وظیفه"
  ],
  "languageSummary": "زبان‌های اعلام‌شده: آفریکانس، امهری، عربی، آسامی، آذربایجانی، بلاروسی، بلغاری، بنگالی، برتانیایی، بوسنیایی، کاتالان، چکی، ولزی، دانمارکی و زبان‌های دیگر.",
  "officialUrl": "https://huggingface.co/jinaai/jina-embeddings-v3",
  "runGuides": [
    {
      "label": "راه‌اندازی با Transformers",
      "engine": "Transformers",
      "href": "https://huggingface.co/jinaai/jina-embeddings-v3/raw/ab036b023d30b4d1138c4c3bfa9f0c445ab455d6/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-133e75dac7f5e254f9"
      ]
    },
    {
      "label": "راه‌اندازی با Sentence Transformers",
      "engine": "Sentence Transformers",
      "href": "https://huggingface.co/jinaai/jina-embeddings-v3/raw/ab036b023d30b4d1138c4c3bfa9f0c445ab455d6/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-133e75dac7f5e254f9"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:v03-0a2c5c51e55cdf20f4",
    "evidence:v03-06dee93b45df15d867",
    "evidence:v03-133e75dac7f5e254f9",
    "evidence:v03-07965f2a55c8c5ab96"
  ]
});
modelProfiles.push({
  "id": "model-profile:jinaai-jina-reranker-v2-base-multilingual",
  "modelVersionId": "model:jinaai-jina-reranker-v2-base-multilingual",
  "introduction": "بازرتبه‌بند چندزبانه برای اسناد بلندتر.",
  "roleSummary": "بازرتبه‌بند چندزبانه برای اسناد بلندتر",
  "distinguishingFeatures": [
    "بازرتبه‌بند چندزبانه برای اسناد بلندتر"
  ],
  "languageSummary": "چندزبانه",
  "officialUrl": "https://huggingface.co/jinaai/jina-reranker-v2-base-multilingual",
  "runGuides": [
    {
      "label": "راه‌اندازی با Transformers",
      "engine": "Transformers",
      "href": "https://huggingface.co/jinaai/jina-reranker-v2-base-multilingual/raw/9cfeff2df7d40d1b78e75e5e9cebec92a99813c9/README.md",
      "conditions": [
        "trust_remote_code=True و کد مدل لازم است؛ برای اجرای آفلاین، کد مخزن را هم همراه وزن‌ها دریافت کنید."
      ],
      "evidenceIds": [
        "evidence:v03-d6e73357bf96ab362e"
      ]
    },
    {
      "label": "راه‌اندازی با Sentence Transformers",
      "engine": "Sentence Transformers",
      "href": "https://huggingface.co/jinaai/jina-reranker-v2-base-multilingual/raw/9cfeff2df7d40d1b78e75e5e9cebec92a99813c9/README.md",
      "conditions": [
        "trust_remote_code=True و کد مدل لازم است؛ برای اجرای آفلاین، کد مخزن را هم همراه وزن‌ها دریافت کنید."
      ],
      "evidenceIds": [
        "evidence:v03-d6e73357bf96ab362e"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:v03-47602574cb1e03679b",
    "evidence:v03-656580d41b93bedb51",
    "evidence:v03-d6e73357bf96ab362e",
    "evidence:v03-5f1fcca05da5622885"
  ]
});
modelProfiles.push({
  "id": "model-profile:mixedbread-ai-mxbai-embed-large-v1",
  "modelVersionId": "model:mixedbread-ai-mxbai-embed-large-v1",
  "introduction": "بردارساز انگلیسی برای بازیابی با دستور پرسش.",
  "roleSummary": "بردارساز انگلیسی برای بازیابی با دستور پرسش",
  "distinguishingFeatures": [
    "بردارساز انگلیسی برای بازیابی با دستور پرسش"
  ],
  "languageSummary": "زبان‌های اعلام‌شده: انگلیسی.",
  "officialUrl": "https://huggingface.co/mixedbread-ai/mxbai-embed-large-v1",
  "runGuides": [
    {
      "label": "راه‌اندازی با Transformers",
      "engine": "Transformers",
      "href": "https://huggingface.co/mixedbread-ai/mxbai-embed-large-v1/raw/b33106f585b9ce46904ad7443a3b52b7a63e231c/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-4128a3077638e7a164"
      ]
    },
    {
      "label": "راه‌اندازی با Sentence Transformers",
      "engine": "Sentence Transformers",
      "href": "https://huggingface.co/mixedbread-ai/mxbai-embed-large-v1/raw/b33106f585b9ce46904ad7443a3b52b7a63e231c/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-4128a3077638e7a164"
      ]
    },
    {
      "label": "دریافت و اجرای بستهٔ Ollama",
      "engine": "Ollama",
      "href": "https://ollama.com/library/mxbai-embed-large:335m",
      "conditions": [],
      "code": "ollama pull mxbai-embed-large:335m\ncurl http://localhost:11434/api/embed -d '{\"model\": \"mxbai-embed-large:335m\", \"input\": \"متن نمونه\"}'",
      "codeLanguage": "bash",
      "evidenceIds": [
        "evidence:v03-34cd5b67880fefda35"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:v03-1c5cc19762f87061e9",
    "evidence:v03-35e4bd58aab43e5fb7",
    "evidence:v03-4128a3077638e7a164",
    "evidence:v03-c5e9c7e422d09855be"
  ]
});
modelProfiles.push({
  "id": "model-profile:nomic-ai-nomic-embed-text-v1-5",
  "modelVersionId": "model:nomic-ai-nomic-embed-text-v1-5",
  "introduction": "بردارساز انگلیسی با زمینهٔ بلند و ابعاد قابل کاهش.",
  "roleSummary": "بردارساز انگلیسی با زمینهٔ بلند و ابعاد قابل کاهش",
  "distinguishingFeatures": [
    "بردارساز انگلیسی با زمینهٔ بلند و ابعاد قابل کاهش"
  ],
  "languageSummary": "زبان‌های اعلام‌شده: انگلیسی.",
  "officialUrl": "https://huggingface.co/nomic-ai/nomic-embed-text-v1.5",
  "runGuides": [
    {
      "label": "راه‌اندازی با Transformers",
      "engine": "Transformers",
      "href": "https://huggingface.co/nomic-ai/nomic-embed-text-v1.5/raw/e9b6763023c676ca8431644204f50c2b100d9aab/README.md",
      "conditions": [
        "پیشوند search_query: برای پرسش و search_document: برای سند لازم است؛ کد مدل با trust_remote_code=True بارگذاری می‌شود."
      ],
      "evidenceIds": [
        "evidence:v03-934bd541e054349d80"
      ]
    },
    {
      "label": "راه‌اندازی با Sentence Transformers",
      "engine": "Sentence Transformers",
      "href": "https://huggingface.co/nomic-ai/nomic-embed-text-v1.5/raw/e9b6763023c676ca8431644204f50c2b100d9aab/README.md",
      "conditions": [
        "پیشوند search_query: برای پرسش و search_document: برای سند لازم است؛ کد مدل با trust_remote_code=True بارگذاری می‌شود."
      ],
      "evidenceIds": [
        "evidence:v03-934bd541e054349d80"
      ]
    },
    {
      "label": "دریافت و اجرای بستهٔ Ollama",
      "engine": "Ollama",
      "href": "https://ollama.com/library/nomic-embed-text:v1.5",
      "conditions": [],
      "code": "ollama pull nomic-embed-text:v1.5\ncurl http://localhost:11434/api/embed -d '{\"model\": \"nomic-embed-text:v1.5\", \"input\": \"متن نمونه\"}'",
      "codeLanguage": "bash",
      "evidenceIds": [
        "evidence:v03-e82c1e0a131c7d59d6"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:v03-971d83f6e7effed7c9",
    "evidence:v03-0d47d6a7d730b605ad",
    "evidence:v03-934bd541e054349d80",
    "evidence:v03-74362c98c19e268849"
  ]
});
modelProfiles.push({
  "id": "model-profile:answerdotai-modernbert-base",
  "modelVersionId": "model:answerdotai-modernbert-base",
  "introduction": "رمزگذار پایه برای آموزش دسته‌بندی و استخراج موجودیت.",
  "roleSummary": "رمزگذار پایه برای آموزش دسته‌بندی و استخراج موجودیت",
  "distinguishingFeatures": [
    "رمزگذار پایه برای آموزش دسته‌بندی و استخراج موجودیت"
  ],
  "languageSummary": "زبان‌های اعلام‌شده: انگلیسی.",
  "officialUrl": "https://huggingface.co/answerdotai/ModernBERT-base",
  "runGuides": [
    {
      "label": "راه‌اندازی با Transformers",
      "engine": "Transformers",
      "href": "https://huggingface.co/answerdotai/ModernBERT-base/raw/8949b909ec900327062f0ebf497f51aef5e6f0c8/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:v03-9f4a255f17cc556d99"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:v03-56d00ad79917f10658",
    "evidence:v03-37cbb761dd4de61b70",
    "evidence:v03-9f4a255f17cc556d99",
    "evidence:v03-d96c8f2f2ddacfb9bb"
  ]
});
modelProfiles.push({
  "id": "model-profile:qwen-qwen2-5-coder-1-5b",
  "modelVersionId": "model:qwen-qwen2-5-coder-1-5b",
  "introduction": "مدل پایهٔ کدنویسی با حدود ۱٫۵۴ میلیارد پارامتر؛ برای FIM و ادامهٔ کد، نه گفت‌وگوی دستورپذیر.",
  "roleSummary": "تکمیل کد و پرکردن جای خالی",
  "distinguishingFeatures": [
    "مدل پایهٔ کدنویسی با حدود ۱٫۵۴ میلیارد پارامتر؛ برای FIM و ادامهٔ کد، نه گفت‌وگوی دستورپذیر."
  ],
  "languageSummary": "زبان‌های اعلام‌شده در شناسنامهٔ مدل",
  "officialUrl": "https://huggingface.co/Qwen/Qwen2.5-Coder-1.5B",
  "runGuides": [
    {
      "label": "راه‌اندازی با Transformers",
      "engine": "Transformers",
      "href": "https://huggingface.co/Qwen/Qwen2.5-Coder-1.5B/blob/df3ce67c0e24480f20468b6ef2894622d69eb73b/README.md",
      "instructions": "بارگذاری وزن و tokenizer همین مخزن؛ AutoModelForCausalLM",
      "conditions": [
        "از قالب تکمیل کد / FIM همین مدل استفاده کنید؛ chat template مدل دستورپذیر را جایگزین نکنید."
      ],
      "evidenceIds": [
        "evidence:audit-20260916-qwen-qwen2-5-coder-1-5b"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:audit-20260916-qwen-qwen2-5-coder-1-5b"
  ]
});
modelProfiles.push({
  "id": "model-profile:bigcode-starcoder2-3b",
  "modelVersionId": "model:bigcode-starcoder2-3b",
  "introduction": "مدل پایهٔ کدنویسی؛ ورودی ۱۶٬۳۸۴ توکنی با پنجرهٔ توجه ۴٬۰۹۶ توکنی. برای تکمیل کد، نه دستیار گفت‌وگو.",
  "roleSummary": "تکمیل کد با پنجرهٔ لغزان",
  "distinguishingFeatures": [
    "مدل پایهٔ کدنویسی؛ ورودی ۱۶٬۳۸۴ توکنی با پنجرهٔ توجه ۴٬۰۹۶ توکنی. برای تکمیل کد، نه دستیار گفت‌وگو."
  ],
  "languageSummary": "زبان‌های اعلام‌شده در شناسنامهٔ مدل",
  "officialUrl": "https://huggingface.co/bigcode/starcoder2-3b",
  "runGuides": [
    {
      "label": "راه‌اندازی با Transformers",
      "engine": "Transformers",
      "href": "https://huggingface.co/bigcode/starcoder2-3b/blob/733247c55e3f73af49ce8e9c7949bf14af205928/README.md",
      "instructions": "بارگذاری وزن و tokenizer همین مخزن؛ AutoModelForCausalLM",
      "conditions": [
        "از قالب تکمیل کد / FIM همین مدل استفاده کنید؛ chat template مدل دستورپذیر را جایگزین نکنید."
      ],
      "evidenceIds": [
        "evidence:audit-20260916-bigcode-starcoder2-3b"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:audit-20260916-bigcode-starcoder2-3b"
  ]
});
modelProfiles.push({
  "id": "model-profile:qwen-qwen3-coder-next",
  "modelVersionId": "model:qwen-qwen3-coder-next",
  "introduction": "مدل MoE با ۸۰ میلیارد پارامتر و ۳ میلیارد پارامتر فعال، توجه ترکیبی و پاسخ مستقیم؛ حافظهٔ وزن از کل مدل می‌آید.",
  "roleSummary": "عامل برنامه‌نویسی",
  "distinguishingFeatures": [
    "مدل MoE با ۸۰ میلیارد پارامتر و ۳ میلیارد پارامتر فعال، توجه ترکیبی و پاسخ مستقیم؛ حافظهٔ وزن از کل مدل می‌آید."
  ],
  "languageSummary": "زبان‌های اعلام‌شده در شناسنامهٔ مدل",
  "officialUrl": "https://huggingface.co/Qwen/Qwen3-Coder-Next",
  "runGuides": [
    {
      "label": "راه‌اندازی با Transformers",
      "engine": "Transformers",
      "href": "https://huggingface.co/Qwen/Qwen3-Coder-Next/blob/a7fbcb5c0e12d62a448eaa0e260346bf5dcc0feb/README.md",
      "instructions": "بارگذاری وزن و tokenizer همین مخزن؛ AutoModelForCausalLM",
      "conditions": [],
      "evidenceIds": [
        "evidence:audit-20260916-qwen-qwen3-coder-next"
      ]
    },
    {
      "label": "سرویس‌دهی با vLLM",
      "engine": "vLLM",
      "href": "https://huggingface.co/Qwen/Qwen3-Coder-Next",
      "instructions": "مسیر سرویس‌دهی در کارت رسمی همین checkpoint",
      "conditions": [
        "برای ابزارخوانی، parser و chat template معرفی‌شده در راهنمای همین checkpoint لازم است."
      ],
      "evidenceIds": [
        "evidence:audit-20260916-qwen-qwen3-coder-next"
      ]
    },
    {
      "label": "سرویس‌دهی با SGLang",
      "engine": "SGLang",
      "href": "https://huggingface.co/Qwen/Qwen3-Coder-Next",
      "instructions": "مسیر سرویس‌دهی در کارت رسمی همین checkpoint",
      "conditions": [
        "برای ابزارخوانی، parser و chat template معرفی‌شده در راهنمای همین checkpoint لازم است."
      ],
      "evidenceIds": [
        "evidence:audit-20260916-qwen-qwen3-coder-next"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:audit-20260916-qwen-qwen3-coder-next"
  ]
});
modelProfiles.push({
  "id": "model-profile:intfloat-multilingual-e5-large-instruct",
  "modelVersionId": "model:intfloat-multilingual-e5-large-instruct",
  "introduction": "بردارساز ۱۰۲۴بعدی؛ دستور یک‌جمله‌ای به پرسش اضافه می‌شود و سند بدون دستور وارد می‌شود.",
  "roleSummary": "بازیابی چندزبانه با دستور وظیفه",
  "distinguishingFeatures": [
    "بردارساز ۱۰۲۴بعدی؛ دستور یک‌جمله‌ای به پرسش اضافه می‌شود و سند بدون دستور وارد می‌شود."
  ],
  "languageSummary": "زبان‌های اعلام‌شده در شناسنامهٔ مدل",
  "officialUrl": "https://huggingface.co/intfloat/multilingual-e5-large-instruct",
  "runGuides": [
    {
      "label": "راه‌اندازی با Sentence Transformers",
      "engine": "Sentence Transformers",
      "href": "https://huggingface.co/intfloat/multilingual-e5-large-instruct/blob/274baa43b0e13e37fafa6428dbc7938e62e5c439/README.md",
      "instructions": "بارگذاری وزن و tokenizer همین مخزن؛ pipeline بردارسازی",
      "conditions": [
        "قالب پرسش Instruct: …\nQuery: …؛ سند بدون دستور. masked mean pooling و نرمال‌سازی L2؛ حداکثر ۵۱۲ توکن."
      ],
      "evidenceIds": [
        "evidence:audit-20260916-intfloat-multilingual-e5-large-instruct"
      ],
      "code": "from sentence_transformers import SentenceTransformer\nmodel = SentenceTransformer('intfloat/multilingual-e5-large-instruct', revision='274baa43b0e13e37fafa6428dbc7938e62e5c439')\nquery = 'Instruct: Retrieve passages that answer the question.\\nQuery: شرایط مرخصی چیست؟'\nvectors = model.encode([query, 'متن سند'], normalize_embeddings=True)"
    }
  ],
  "evidenceIds": [
    "evidence:audit-20260916-intfloat-multilingual-e5-large-instruct"
  ]
});
modelProfiles.push({
  "id": "model-profile:qwen-qwen3-4b-instruct-2507",
  "modelVersionId": "model:qwen-qwen3-4b-instruct-2507",
  "introduction": "نسخهٔ دستورپذیر چهارمیلیاردی با سقف متن ۲۶۲٬۱۴۴ توکن؛ این checkpoint حالت thinking ندارد.",
  "roleSummary": "دستیار کوچک با پاسخ مستقیم",
  "distinguishingFeatures": [
    "نسخهٔ دستورپذیر چهارمیلیاردی با سقف متن ۲۶۲٬۱۴۴ توکن؛ این checkpoint حالت thinking ندارد."
  ],
  "languageSummary": "زبان‌های اعلام‌شده در شناسنامهٔ مدل",
  "officialUrl": "https://huggingface.co/Qwen/Qwen3-4B-Instruct-2507",
  "runGuides": [
    {
      "label": "راه‌اندازی با Transformers",
      "engine": "Transformers",
      "href": "https://huggingface.co/Qwen/Qwen3-4B-Instruct-2507/blob/cdbee75f17c01a7cc42f958dc650907174af0554/README.md",
      "instructions": "بارگذاری وزن و tokenizer همین مخزن؛ AutoModelForCausalLM",
      "conditions": [],
      "evidenceIds": [
        "evidence:audit-20260916-qwen-qwen3-4b-instruct-2507"
      ]
    },
    {
      "label": "سرویس‌دهی با vLLM",
      "engine": "vLLM",
      "href": "https://huggingface.co/Qwen/Qwen3-4B-Instruct-2507",
      "instructions": "مسیر سرویس‌دهی در کارت رسمی همین checkpoint",
      "conditions": [
        "برای ابزارخوانی، parser و chat template معرفی‌شده در راهنمای همین checkpoint لازم است."
      ],
      "evidenceIds": [
        "evidence:audit-20260916-qwen-qwen3-4b-instruct-2507"
      ]
    },
    {
      "label": "سرویس‌دهی با SGLang",
      "engine": "SGLang",
      "href": "https://huggingface.co/Qwen/Qwen3-4B-Instruct-2507",
      "instructions": "مسیر سرویس‌دهی در کارت رسمی همین checkpoint",
      "conditions": [
        "برای ابزارخوانی، parser و chat template معرفی‌شده در راهنمای همین checkpoint لازم است."
      ],
      "evidenceIds": [
        "evidence:audit-20260916-qwen-qwen3-4b-instruct-2507"
      ]
    },
    {
      "engine": "MLX LM",
      "label": "MLX LM · Qwen3-4B-Instruct-2507-4bit",
      "href": "https://huggingface.co/mlx-community/Qwen3-4B-Instruct-2507-4bit/blob/50d427756c6b1b2fe0c0a10f67fbda1fc8e82c1b/README.md",
      "conditions": [
        "Apple silicon · MLX 4-bit · mlx-lm 0.26.2"
      ],
      "instructions": "وزن تبدیل‌شدهٔ همین مخزن روی Mac دارای Apple silicon؛ نسخهٔ درج‌شده مربوط به تبدیل و مثال کارت است.",
      "evidenceIds": [
        "evidence:update0919-mlx-qwen3-4b-instruct-2507-4bit"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:audit-20260916-qwen-qwen3-4b-instruct-2507"
  ]
});
modelProfiles.push({
  "id": "model-profile:partai-tooka-sbert-v2-small",
  "modelVersionId": "model:partai-tooka-sbert-v2-small",
  "introduction": "نسخهٔ کوچک Tooka-SBERT-V2 با بردار ۷۶۸بعدی؛ نامزد بومی برای بازیابی و شباهت متن فارسی.",
  "roleSummary": "بردارسازی متن فارسی",
  "distinguishingFeatures": [
    "نسخهٔ کوچک Tooka-SBERT-V2 با بردار ۷۶۸بعدی؛ نامزد بومی برای بازیابی و شباهت متن فارسی."
  ],
  "languageSummary": "فارسی",
  "officialUrl": "https://huggingface.co/PartAI/Tooka-SBERT-V2-Small",
  "runGuides": [
    {
      "label": "راه‌اندازی با Sentence Transformers",
      "engine": "Sentence Transformers",
      "href": "https://huggingface.co/PartAI/Tooka-SBERT-V2-Small/blob/8bbed87e36669387f71437c061430ba56d1b496f/README.md",
      "instructions": "بارگذاری وزن و tokenizer همین مخزن؛ pipeline بردارسازی",
      "conditions": [
        "برای Tooka، پرسش با «سوال: » و سند با «متن: » به مدل داده می‌شود."
      ],
      "evidenceIds": [
        "evidence:audit-20260916-partai-tooka-sbert-v2-small"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:audit-20260916-partai-tooka-sbert-v2-small"
  ]
});
modelProfiles.push({
  "id": "model-profile:partai-tooka-sbert-v2-large",
  "modelVersionId": "model:partai-tooka-sbert-v2-large",
  "introduction": "نسخهٔ بزرگ Tooka-SBERT-V2 با بردار ۱۰۲۴بعدی؛ نتیجهٔ PTEB با آزمون‌های دیگر قابل رتبه‌بندی مستقیم نیست.",
  "roleSummary": "بردارسازی متن فارسی",
  "distinguishingFeatures": [
    "نسخهٔ بزرگ Tooka-SBERT-V2 با بردار ۱۰۲۴بعدی؛ نتیجهٔ PTEB با آزمون‌های دیگر قابل رتبه‌بندی مستقیم نیست."
  ],
  "languageSummary": "فارسی",
  "officialUrl": "https://huggingface.co/PartAI/Tooka-SBERT-V2-Large",
  "runGuides": [
    {
      "label": "راه‌اندازی با Sentence Transformers",
      "engine": "Sentence Transformers",
      "href": "https://huggingface.co/PartAI/Tooka-SBERT-V2-Large/blob/b59682efa961122cc0e4408296d5852870c82eae/README.md",
      "instructions": "بارگذاری وزن و tokenizer همین مخزن؛ pipeline بردارسازی",
      "conditions": [
        "برای Tooka، پرسش با «سوال: » و سند با «متن: » به مدل داده می‌شود."
      ],
      "evidenceIds": [
        "evidence:audit-20260916-partai-tooka-sbert-v2-large"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:audit-20260916-partai-tooka-sbert-v2-large"
  ]
});
modelProfiles.push({
  "id": "model-profile:hooshvarelab-bert-base-parsbert-uncased",
  "modelVersionId": "model:hooshvarelab-bert-base-parsbert-uncased",
  "introduction": "ParsBERT پایه برای درک متن فارسی؛ دسته‌بندی و تشخیص موجودیت به سر وظیفه و آموزش نیاز دارند. بردارساز آمادهٔ بازیابی نیست.",
  "roleSummary": "پایهٔ آموزش وظایف فارسی",
  "distinguishingFeatures": [
    "ParsBERT پایه برای درک متن فارسی؛ دسته‌بندی و تشخیص موجودیت به سر وظیفه و آموزش نیاز دارند. بردارساز آمادهٔ بازیابی نیست."
  ],
  "languageSummary": "فارسی",
  "officialUrl": "https://huggingface.co/HooshvareLab/bert-base-parsbert-uncased",
  "runGuides": [
    {
      "label": "راه‌اندازی با Transformers",
      "engine": "Transformers",
      "href": "https://huggingface.co/HooshvareLab/bert-base-parsbert-uncased/blob/d73a0e2c7492c33bd5819bcdb23eba207404dd19/README.md",
      "instructions": "بارگذاری وزن و tokenizer همین مخزن؛ AutoModel برای بازنمایی متن",
      "conditions": [
        "وزن پایه به‌تنهایی دسته‌بند یا NER آماده نیست.",
        "برای برچسب‌گذاری، سر طبقه‌بندیِ آموزش‌دیده روی encoder لازم است."
      ],
      "evidenceIds": [
        "evidence:audit-20260916-hooshvarelab-bert-base-parsbert-uncased"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:audit-20260916-hooshvarelab-bert-base-parsbert-uncased"
  ]
});
modelProfiles.push({
  "id": "model-profile:bsc-lt-salamandra-2b-instruct",
  "modelVersionId": "model:bsc-lt-salamandra-2b-instruct",
  "introduction": "گزینهٔ تخصصی‌تر برای زبان اسپانیایی و زبان‌های ایبری؛ گونهٔ 2B دستورپذیر با نتایج منتشرشدهٔ اسپانیایی. نقطهٔ مرجع زبانی است، نه برندهٔ عمومی یا گزینهٔ اثبات‌شده برای فارسی.",
  "roleSummary": "تولید متن به زبان‌های ایبری",
  "distinguishingFeatures": [],
  "officialUrl": "https://huggingface.co/BSC-LT/salamandra-2b-instruct",
  "runGuides": [
    {
      "label": "دستور اجرای ناشر",
      "engine": "unknown",
      "href": "https://huggingface.co/BSC-LT/salamandra-2b-instruct",
      "conditions": [],
      "evidenceIds": [
        "evidence:reference-bsc-lt-salamandra-2b-instruct-readme-md-22881108b0"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:reference-bsc-lt-salamandra-2b-instruct-json-ec00591718",
    "evidence:reference-bsc-lt-salamandra-2b-instruct-readme-md-22881108b0",
    "evidence:reference-bsc-lt-salamandra-2b-instruct-config-json-47e785ca3a",
    "evidence:reference-bsc-lt-salamandra-2b-instruct-readme-md-2365657aeb",
    "evidence:reference-bsc-lt-salamandra-2b-instruct-readme-md-456890d7cc"
  ]
});
modelProfiles.push({
  "id": "model-profile:bsc-lt-salamandra-7b-instruct",
  "modelVersionId": "model:bsc-lt-salamandra-7b-instruct",
  "introduction": "گزینهٔ تخصصی‌تر برای زبان اسپانیایی و زبان‌های ایبری؛ گونهٔ 7B دستورپذیر با نتایج منتشرشدهٔ اسپانیایی. نقطهٔ مرجع زبانی است، نه برندهٔ عمومی یا گزینهٔ اثبات‌شده برای فارسی.",
  "roleSummary": "تولید متن به زبان‌های ایبری",
  "distinguishingFeatures": [],
  "officialUrl": "https://huggingface.co/BSC-LT/salamandra-7b-instruct",
  "runGuides": [
    {
      "label": "دستور اجرای ناشر",
      "engine": "unknown",
      "href": "https://huggingface.co/BSC-LT/salamandra-7b-instruct",
      "conditions": [],
      "evidenceIds": [
        "evidence:reference-bsc-lt-salamandra-7b-instruct-readme-md-22881108b0"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:reference-bsc-lt-salamandra-7b-instruct-json-ec00591718",
    "evidence:reference-bsc-lt-salamandra-7b-instruct-readme-md-22881108b0",
    "evidence:reference-bsc-lt-salamandra-7b-instruct-config-json-47e785ca3a",
    "evidence:reference-bsc-lt-salamandra-7b-instruct-readme-md-2365657aeb",
    "evidence:reference-bsc-lt-salamandra-7b-instruct-readme-md-456890d7cc"
  ]
});
modelProfiles.push({
  "id": "model-profile:openbmb-minicpm5-2b",
  "modelVersionId": "model:openbmb-minicpm5-2b",
  "introduction": "مدل کوچکِ دستورپذیر برای بررسی در کارهای استدلال و ابزار؛ اندازهٔ واقعی ثبت‌شده حدود ۲٫۵۲ میلیارد پارامتر است. امتیازهای ناشر را از امتیازهای نقل‌شده از Artificial Analysis جدا کنید؛ شاهد فارسی یا اسپانیایی در این بسته ندارد.",
  "roleSummary": "استدلال با مدل کوچک",
  "distinguishingFeatures": [],
  "officialUrl": "https://huggingface.co/openbmb/MiniCPM5-2B",
  "runGuides": [
    {
      "label": "دستور اجرای ناشر",
      "engine": "unknown",
      "href": "https://huggingface.co/openbmb/MiniCPM5-2B",
      "conditions": [],
      "evidenceIds": [
        "evidence:reference-openbmb-minicpm5-2b-readme-md-22881108b0"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:reference-openbmb-minicpm5-2b-json-ec00591718",
    "evidence:reference-openbmb-minicpm5-2b-readme-md-22881108b0",
    "evidence:reference-openbmb-minicpm5-2b-config-json-47e785ca3a",
    "evidence:reference-openbmb-minicpm5-2b-readme-md-2365657aeb",
    "evidence:reference-openbmb-minicpm5-2b-readme-md-456890d7cc"
  ]
});
modelProfiles.push({
  "id": "model-profile:liquidai-lfm2-5-1-2b-instruct",
  "modelVersionId": "model:liquidai-lfm2-5-1-2b-instruct",
  "introduction": "گزینهٔ کوچک برای استخراج اطلاعات و کارهای محدود روی دستگاه؛ ناشر آن را برای برنامه‌نویسی و کارهای دانش‌محور توصیه نمی‌کند. اسپانیایی در زبان‌های اعلام‌شده هست؛ نتیجهٔ اختصاصی فارسی ثبت نشده است.",
  "roleSummary": "استخراج اطلاعات روی دستگاه",
  "distinguishingFeatures": [],
  "officialUrl": "https://huggingface.co/LiquidAI/LFM2.5-1.2B-Instruct",
  "runGuides": [
    {
      "label": "دستور اجرای ناشر",
      "engine": "unknown",
      "href": "https://huggingface.co/LiquidAI/LFM2.5-1.2B-Instruct",
      "conditions": [],
      "evidenceIds": [
        "evidence:reference-liquidai-lfm2-5-1-2b-instruct-readme-md-22881108b0"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:reference-liquidai-lfm2-5-1-2b-instruct-json-ec00591718",
    "evidence:reference-liquidai-lfm2-5-1-2b-instruct-readme-md-22881108b0",
    "evidence:reference-liquidai-lfm2-5-1-2b-instruct-config-json-47e785ca3a",
    "evidence:reference-liquidai-lfm2-5-1-2b-instruct-readme-md-2365657aeb",
    "evidence:reference-liquidai-lfm2-5-1-2b-instruct-readme-md-456890d7cc",
    "evidence:reference-lfm-license-txt-e8003a05ee"
  ]
});
modelProfiles.push({
  "id": "model-profile:ibm-granite-granite-4-2-3b",
  "modelVersionId": "model:ibm-granite-granite-4-2-3b",
  "introduction": "گونهٔ استدلالی Granite با حالت‌های thinking و non-thinking؛ برچسب 3B نام اندازه است و شمار ثبت‌شدهٔ پارامترها حدود ۳٫۶۶ میلیارد است. حد بومی ۱۲۸K را از ادعای گسترش تا ۵۱۲K جدا نگه دارید.",
  "roleSummary": "استدلال با مدل کوچک",
  "distinguishingFeatures": [],
  "officialUrl": "https://huggingface.co/ibm-granite/granite-4.2-3b",
  "runGuides": [
    {
      "label": "دستور اجرای ناشر",
      "engine": "unknown",
      "href": "https://huggingface.co/ibm-granite/granite-4.2-3b",
      "conditions": [],
      "evidenceIds": [
        "evidence:reference-ibm-granite-granite-4-2-3b-readme-md-22881108b0"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:reference-ibm-granite-granite-4-2-3b-json-ec00591718",
    "evidence:reference-ibm-granite-granite-4-2-3b-readme-md-22881108b0",
    "evidence:reference-ibm-granite-granite-4-2-3b-config-json-47e785ca3a",
    "evidence:reference-ibm-granite-granite-4-2-3b-readme-md-2365657aeb",
    "evidence:reference-ibm-granite-granite-4-2-3b-readme-md-456890d7cc"
  ]
});
modelProfiles.push({
  "id": "model-profile:zai-org-glm-5",
  "modelVersionId": "model:zai-org-glm-5",
  "introduction": "مدل بزرگ برای کدنویسی و اجرای کارهای چندمرحله‌ای با ورودی متن.",
  "roleSummary": "کدنویسی و استفاده از ابزار",
  "distinguishingFeatures": [],
  "officialUrl": "https://huggingface.co/zai-org/GLM-5",
  "runGuides": [
    {
      "label": "SGLang",
      "engine": "SGLang",
      "href": "https://huggingface.co/zai-org/GLM-5/blob/c183ef8c61faee82855eca1ed9bb3a9a7ce3b0b2/README.md",
      "conditions": [
        "SGLang ≥ 0.5.10"
      ],
      "evidenceIds": [
        "evidence:update0919-zai-org-glm-5"
      ]
    },
    {
      "label": "vLLM",
      "engine": "vLLM",
      "href": "https://huggingface.co/zai-org/GLM-5/blob/c183ef8c61faee82855eca1ed9bb3a9a7ce3b0b2/README.md",
      "conditions": [
        "vLLM ≥ 0.19.0"
      ],
      "evidenceIds": [
        "evidence:update0919-zai-org-glm-5"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:update0919-zai-org-glm-5"
  ]
});
modelProfiles.push({
  "id": "model-profile:zai-org-glm-5-1",
  "modelVersionId": "model:zai-org-glm-5-1",
  "introduction": "مدل بزرگ برای کدنویسی و اجرای کارهای چندمرحله‌ای با ورودی متن.",
  "roleSummary": "کدنویسی و استفاده از ابزار",
  "distinguishingFeatures": [],
  "officialUrl": "https://huggingface.co/zai-org/GLM-5.1",
  "runGuides": [
    {
      "label": "SGLang",
      "engine": "SGLang",
      "href": "https://huggingface.co/zai-org/GLM-5.1/blob/26e1bd6e011feb778d25ae34b09b07074139d92d/README.md",
      "conditions": [
        "SGLang ≥ 0.5.10"
      ],
      "evidenceIds": [
        "evidence:update0919-zai-org-glm-5-1"
      ]
    },
    {
      "label": "vLLM",
      "engine": "vLLM",
      "href": "https://huggingface.co/zai-org/GLM-5.1/blob/26e1bd6e011feb778d25ae34b09b07074139d92d/README.md",
      "conditions": [
        "vLLM ≥ 0.19.0"
      ],
      "evidenceIds": [
        "evidence:update0919-zai-org-glm-5-1"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:update0919-zai-org-glm-5-1"
  ]
});
modelProfiles.push({
  "id": "model-profile:zai-org-glm-5-2",
  "modelVersionId": "model:zai-org-glm-5-2",
  "introduction": "مدل بزرگ برای کدنویسی و اجرای کارهای چندمرحله‌ای با ورودی متن.",
  "roleSummary": "کدنویسی و استفاده از ابزار",
  "distinguishingFeatures": [],
  "officialUrl": "https://huggingface.co/zai-org/GLM-5.2",
  "runGuides": [
    {
      "label": "SGLang",
      "engine": "SGLang",
      "href": "https://huggingface.co/zai-org/GLM-5.2/blob/cf457fa734ab149ffef225f80893eb38c6ff5cdc/README.md",
      "conditions": [
        "SGLang ≥ 0.5.13.post1"
      ],
      "evidenceIds": [
        "evidence:update0919-zai-org-glm-5-2"
      ]
    },
    {
      "label": "vLLM",
      "engine": "vLLM",
      "href": "https://huggingface.co/zai-org/GLM-5.2/blob/cf457fa734ab149ffef225f80893eb38c6ff5cdc/README.md",
      "conditions": [
        "vLLM ≥ 0.23.0"
      ],
      "evidenceIds": [
        "evidence:update0919-zai-org-glm-5-2"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:update0919-zai-org-glm-5-2"
  ]
});
modelProfiles.push({
  "id": "model-profile:zai-org-glm-5-3-bf16",
  "modelVersionId": "model:zai-org-glm-5-3-bf16",
  "introduction": "مدل بزرگ برای کدنویسی و اجرای کارهای چندمرحله‌ای با ورودی متن.",
  "roleSummary": "کدنویسی و استفاده از ابزار",
  "distinguishingFeatures": [],
  "officialUrl": "https://huggingface.co/zai-org/GLM-5.3-BF16",
  "runGuides": [
    {
      "label": "SGLang",
      "engine": "SGLang",
      "href": "https://huggingface.co/zai-org/GLM-5.3-BF16/blob/9d2398f478cab2de883137db3a36ad2c96205e24/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:update0919-zai-org-glm-5-3-bf16"
      ]
    },
    {
      "label": "vLLM",
      "engine": "vLLM",
      "href": "https://huggingface.co/zai-org/GLM-5.3-BF16/blob/9d2398f478cab2de883137db3a36ad2c96205e24/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:update0919-zai-org-glm-5-3-bf16"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:update0919-zai-org-glm-5-3-bf16"
  ]
});
modelProfiles.push({
  "id": "model-profile:moonshotai-kimi-k2-6",
  "modelVersionId": "model:moonshotai-kimi-k2-6",
  "introduction": "مدل بزرگ برای کدنویسی و اجرای کارهای چندمرحله‌ای با ورودی متن، تصویر و ویدئو.",
  "roleSummary": "کدنویسی و استفاده از ابزار",
  "distinguishingFeatures": [],
  "officialUrl": "https://huggingface.co/moonshotai/Kimi-K2.6",
  "runGuides": [
    {
      "label": "vLLM",
      "engine": "vLLM",
      "href": "https://huggingface.co/moonshotai/Kimi-K2.6/blob/7eb5002f6aadc958aed6a9177b7ed26bb94011bb/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:update0919-moonshotai-kimi-k2-6"
      ]
    },
    {
      "label": "SGLang",
      "engine": "SGLang",
      "href": "https://huggingface.co/moonshotai/Kimi-K2.6/blob/7eb5002f6aadc958aed6a9177b7ed26bb94011bb/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:update0919-moonshotai-kimi-k2-6"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:update0919-moonshotai-kimi-k2-6"
  ]
});
modelProfiles.push({
  "id": "model-profile:moonshotai-kimi-k2-7-code",
  "modelVersionId": "model:moonshotai-kimi-k2-7-code",
  "introduction": "مدل بزرگ برای کدنویسی و اجرای کارهای چندمرحله‌ای با ورودی متن، تصویر و ویدئو.",
  "roleSummary": "کدنویسی و استفاده از ابزار",
  "distinguishingFeatures": [],
  "officialUrl": "https://huggingface.co/moonshotai/Kimi-K2.7-Code",
  "runGuides": [
    {
      "label": "vLLM",
      "engine": "vLLM",
      "href": "https://huggingface.co/moonshotai/Kimi-K2.7-Code/blob/74797c9c62378b951a1f6fcf5c4631024e9b8bef/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:update0919-moonshotai-kimi-k2-7-code"
      ]
    },
    {
      "label": "SGLang",
      "engine": "SGLang",
      "href": "https://huggingface.co/moonshotai/Kimi-K2.7-Code/blob/74797c9c62378b951a1f6fcf5c4631024e9b8bef/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:update0919-moonshotai-kimi-k2-7-code"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:update0919-moonshotai-kimi-k2-7-code"
  ]
});
modelProfiles.push({
  "id": "model-profile:moonshotai-kimi-k3",
  "modelVersionId": "model:moonshotai-kimi-k3",
  "introduction": "مدل بزرگ برای کدنویسی و اجرای کارهای چندمرحله‌ای با ورودی متن، تصویر و ویدئو.",
  "roleSummary": "کدنویسی و استفاده از ابزار",
  "distinguishingFeatures": [],
  "officialUrl": "https://huggingface.co/moonshotai/Kimi-K3",
  "runGuides": [
    {
      "label": "vLLM",
      "engine": "vLLM",
      "href": "https://huggingface.co/moonshotai/Kimi-K3/blob/f831ab66814297da540d832a5235f8e904f29d06/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:update0919-moonshotai-kimi-k3"
      ]
    },
    {
      "label": "SGLang",
      "engine": "SGLang",
      "href": "https://huggingface.co/moonshotai/Kimi-K3/blob/f831ab66814297da540d832a5235f8e904f29d06/README.md",
      "conditions": [],
      "evidenceIds": [
        "evidence:update0919-moonshotai-kimi-k3"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:update0919-moonshotai-kimi-k3"
  ]
});
modelProfiles.push({
  "id": "model-profile:qwen-qwen3-vl-embedding-2b",
  "modelVersionId": "model:qwen-qwen3-vl-embedding-2b",
  "introduction": "بازیابی متن، تصویر و ویدئو با بردارهایی در ابعاد ۶۴ تا 2048؛ ورودی وظیفه تا ۳۲ هزار توکن.",
  "roleSummary": "بازیابی چندوجهی",
  "distinguishingFeatures": [],
  "officialUrl": "https://huggingface.co/Qwen/Qwen3-VL-Embedding-2B",
  "runGuides": [
    {
      "label": "Transformers",
      "engine": "Transformers",
      "href": "https://huggingface.co/Qwen/Qwen3-VL-Embedding-2B/blob/9f2f7e710d6d81056aa5c0a4f04764fec6bb7bda/README.md",
      "conditions": [
        "Transformers ≥ 4.57.0"
      ],
      "evidenceIds": [
        "evidence:update0919-qwen-qwen3-vl-embedding-2b"
      ],
      "instructions": "پردازش متن، تصویر و ویدئو با کد نمونهٔ همین مدل."
    }
  ],
  "evidenceIds": [
    "evidence:update0919-qwen-qwen3-vl-embedding-2b"
  ]
});
modelProfiles.push({
  "id": "model-profile:qwen-qwen3-vl-embedding-8b",
  "modelVersionId": "model:qwen-qwen3-vl-embedding-8b",
  "introduction": "بازیابی متن، تصویر و ویدئو با بردارهایی در ابعاد ۶۴ تا 4096؛ ورودی وظیفه تا ۳۲ هزار توکن.",
  "roleSummary": "بازیابی چندوجهی",
  "distinguishingFeatures": [],
  "officialUrl": "https://huggingface.co/Qwen/Qwen3-VL-Embedding-8B",
  "runGuides": [
    {
      "label": "Transformers",
      "engine": "Transformers",
      "href": "https://huggingface.co/Qwen/Qwen3-VL-Embedding-8B/blob/2c4565515e0f265c6511776e7193b22c0968ddc7/README.md",
      "conditions": [
        "Transformers ≥ 4.57.0"
      ],
      "evidenceIds": [
        "evidence:update0919-qwen-qwen3-vl-embedding-8b"
      ],
      "instructions": "پردازش متن، تصویر و ویدئو با کد نمونهٔ همین مدل."
    }
  ],
  "evidenceIds": [
    "evidence:update0919-qwen-qwen3-vl-embedding-8b"
  ]
});
modelProfiles.push({
  "id": "model-profile:qwen-qwen3-vl-reranker-2b",
  "modelVersionId": "model:qwen-qwen3-vl-reranker-2b",
  "introduction": "امتیازدهی به ارتباط پرسش با متن، تصویر یا ویدئو؛ بازرتبه‌بندی نتایج بازیابی با ورودی تا ۳۲ هزار توکن.",
  "roleSummary": "بازرتبه‌بندی چندوجهی",
  "distinguishingFeatures": [],
  "officialUrl": "https://huggingface.co/Qwen/Qwen3-VL-Reranker-2B",
  "runGuides": [
    {
      "label": "Transformers",
      "engine": "Transformers",
      "href": "https://huggingface.co/Qwen/Qwen3-VL-Reranker-2B/blob/4bd860ac4f15ad1897a214615cccc700f8f71818/README.md",
      "conditions": [
        "Transformers ≥ 4.57.0"
      ],
      "evidenceIds": [
        "evidence:update0919-qwen-qwen3-vl-reranker-2b"
      ],
      "instructions": "پردازش متن، تصویر و ویدئو با کد نمونهٔ همین مدل."
    }
  ],
  "evidenceIds": [
    "evidence:update0919-qwen-qwen3-vl-reranker-2b"
  ]
});
modelProfiles.push({
  "id": "model-profile:qwen-qwen3-vl-reranker-8b",
  "modelVersionId": "model:qwen-qwen3-vl-reranker-8b",
  "introduction": "امتیازدهی به ارتباط پرسش با متن، تصویر یا ویدئو؛ بازرتبه‌بندی نتایج بازیابی با ورودی تا ۳۲ هزار توکن.",
  "roleSummary": "بازرتبه‌بندی چندوجهی",
  "distinguishingFeatures": [],
  "officialUrl": "https://huggingface.co/Qwen/Qwen3-VL-Reranker-8B",
  "runGuides": [
    {
      "label": "Transformers",
      "engine": "Transformers",
      "href": "https://huggingface.co/Qwen/Qwen3-VL-Reranker-8B/blob/b212dc8c91a8164aef1ea2de9c1a867611e75c04/README.md",
      "conditions": [
        "Transformers ≥ 4.57.0"
      ],
      "evidenceIds": [
        "evidence:update0919-qwen-qwen3-vl-reranker-8b"
      ],
      "instructions": "پردازش متن، تصویر و ویدئو با کد نمونهٔ همین مدل."
    }
  ],
  "evidenceIds": [
    "evidence:update0919-qwen-qwen3-vl-reranker-8b"
  ]
});
modelProfiles.push({
  "id": "model-profile:qwen-qwen3-6-27b",
  "modelVersionId": "model:qwen-qwen3-6-27b",
  "introduction": "Qwen3.6-27B متن، تصویر و ویدئو را می‌خواند. وزن رسمی BF16 ثبت شده؛ حافظهٔ اجرای توجه ترکیبی باید با موتور واقعی سنجیده شود.",
  "roleSummary": "مدل متن و تصویر با توجه ترکیبی",
  "distinguishingFeatures": [
    "جزء زبانی 27 میلیارد؛ ظرفیت بومی ۲۶۲٬۱۴۴ توکن."
  ],
  "languageSummary": "چندزبانه؛ آزمون فارسی هم‌سنخ در این ورود داده افزوده نشده است.",
  "officialUrl": "https://huggingface.co/Qwen/Qwen3.6-27B/blob/6a9e13bd6fc8f0983b9b99948120bc37f49c13e9/README.md",
  "runGuides": [
    {
      "label": "vLLM",
      "engine": "vLLM",
      "href": "https://huggingface.co/Qwen/Qwen3.6-27B/blob/6a9e13bd6fc8f0983b9b99948120bc37f49c13e9/README.md",
      "conditions": [
        "vLLM ≥ 0.19.0؛ برای حالت غیرتفکری، enable_thinking=false در تنظیم درخواست."
      ],
      "evidenceIds": [
        "evidence:wizard0920-qwen-qwen3-6-27b"
      ]
    },
    {
      "label": "SGLang",
      "engine": "SGLang",
      "href": "https://huggingface.co/Qwen/Qwen3.6-27B/blob/6a9e13bd6fc8f0983b9b99948120bc37f49c13e9/README.md",
      "conditions": [
        "SGLang ≥ 0.5.10؛ برای حالت غیرتفکری، enable_thinking=false در تنظیم درخواست."
      ],
      "evidenceIds": [
        "evidence:wizard0920-qwen-qwen3-6-27b"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:wizard0920-qwen-qwen3-6-27b"
  ]
});
modelProfiles.push({
  "id": "model-profile:qwen-qwen3-6-35b-a3b",
  "modelVersionId": "model:qwen-qwen3-6-35b-a3b",
  "introduction": "Qwen3.6-35B-A3B متن، تصویر و ویدئو را می‌خواند. وزن رسمی BF16 ثبت شده؛ حافظهٔ اجرای توجه ترکیبی باید با موتور واقعی سنجیده شود.",
  "roleSummary": "مدل متن و تصویر با توجه ترکیبی",
  "distinguishingFeatures": [
    "جزء زبانی 35 میلیارد با ۳ میلیارد فعال؛ حافظه بر اساس همهٔ وزن‌هاست."
  ],
  "languageSummary": "چندزبانه؛ آزمون فارسی هم‌سنخ در این ورود داده افزوده نشده است.",
  "officialUrl": "https://huggingface.co/Qwen/Qwen3.6-35B-A3B/blob/995ad96eacd98c81ed38be0c5b274b04031597b0/README.md",
  "runGuides": [
    {
      "label": "vLLM",
      "engine": "vLLM",
      "href": "https://huggingface.co/Qwen/Qwen3.6-35B-A3B/blob/995ad96eacd98c81ed38be0c5b274b04031597b0/README.md",
      "conditions": [
        "vLLM ≥ 0.19.0؛ برای حالت غیرتفکری، enable_thinking=false در تنظیم درخواست."
      ],
      "evidenceIds": [
        "evidence:wizard0920-qwen-qwen3-6-35b-a3b"
      ]
    },
    {
      "label": "SGLang",
      "engine": "SGLang",
      "href": "https://huggingface.co/Qwen/Qwen3.6-35B-A3B/blob/995ad96eacd98c81ed38be0c5b274b04031597b0/README.md",
      "conditions": [
        "SGLang ≥ 0.5.10؛ برای حالت غیرتفکری، enable_thinking=false در تنظیم درخواست."
      ],
      "evidenceIds": [
        "evidence:wizard0920-qwen-qwen3-6-35b-a3b"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:wizard0920-qwen-qwen3-6-35b-a3b"
  ]
});
modelProfiles.push({
  "id": "model-profile:tencent-hy-mt1-5-1-8b",
  "modelVersionId": "model:tencent-hy-mt1-5-1-8b",
  "introduction": "مدل تخصصی ترجمه با امکان تعیین معادل اصطلاحات و دادن متن زمینه؛ برای گفت‌وگوی عمومی یا پاسخ‌گویی از اسناد انتخاب نشده است.",
  "roleSummary": "ترجمهٔ تخصصی متن",
  "distinguishingFeatures": [
    "قالب‌های جدا برای ترجمه، واژه‌نامهٔ اصطلاحات و حفظ قالب متن دارد."
  ],
  "languageSummary": "فارسی، انگلیسی و اسپانیایی در فهرست زبان‌های ناشر هستند.",
  "officialUrl": "https://huggingface.co/tencent/HY-MT1.5-1.8B/blob/dbad03788f49709801014c95d481a514c272ca52/README.md",
  "runGuides": [
    {
      "label": "Transformers",
      "engine": "Transformers",
      "href": "https://huggingface.co/tencent/HY-MT1.5-1.8B/blob/dbad03788f49709801014c95d481a514c272ca52/README.md#use-with-transformers",
      "conditions": [
        "مثال ناشر با Transformers 4.56.0 و قالب مخصوص ترجمه است؛ مدل system prompt پیش‌فرض ندارد."
      ],
      "evidenceIds": [
        "evidence:tasks0920-tencent-hy-mt1-5-1-8b"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:tasks0920-tencent-hy-mt1-5-1-8b"
  ]
});
modelProfiles.push({
  "id": "model-profile:tencent-hy-mt1-5-7b",
  "modelVersionId": "model:tencent-hy-mt1-5-7b",
  "introduction": "مدل تخصصی ترجمه با امکان تعیین معادل اصطلاحات و دادن متن زمینه؛ برای گفت‌وگوی عمومی یا پاسخ‌گویی از اسناد انتخاب نشده است.",
  "roleSummary": "ترجمهٔ تخصصی متن",
  "distinguishingFeatures": [
    "قالب‌های جدا برای ترجمه، واژه‌نامهٔ اصطلاحات و حفظ قالب متن دارد."
  ],
  "languageSummary": "فارسی، انگلیسی و اسپانیایی در فهرست زبان‌های ناشر هستند.",
  "officialUrl": "https://huggingface.co/tencent/HY-MT1.5-7B/blob/397085d46158ad0b437ffd74228499e8c2a35c76/README.md",
  "runGuides": [
    {
      "label": "Transformers",
      "engine": "Transformers",
      "href": "https://huggingface.co/tencent/HY-MT1.5-7B/blob/397085d46158ad0b437ffd74228499e8c2a35c76/README.md#use-with-transformers",
      "conditions": [
        "مثال ناشر با Transformers 4.56.0 و قالب مخصوص ترجمه است؛ مدل system prompt پیش‌فرض ندارد."
      ],
      "evidenceIds": [
        "evidence:tasks0920-tencent-hy-mt1-5-7b"
      ]
    }
  ],
  "evidenceIds": [
    "evidence:tasks0920-tencent-hy-mt1-5-7b"
  ]
});
