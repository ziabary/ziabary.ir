// Generated from data/llm/v0.3.0/repository.json by scripts/generate-llm-dataset.py.
import type { LlmGuideRepository } from '../schema';

export const models: LlmGuideRepository['models'] = [];
models.push({
  "id": "model:baai-bge-m3",
  "familyId": "family:bge",
  "exactName": "bge-m3",
  "publisher": "BAAI",
  "version": "5617a9f61b028005a4858fdac845db406aefb181",
  "aliases": [
    "BAAI/bge-m3"
  ],
  "stage": "other",
  "architecture": "dense",
  "totalParametersB": {
    "state": "known",
    "value": 0.569,
    "evidenceIds": [
      "evidence:four-tables-baai-bge-m3-size"
    ],
    "unit": "billion-parameters",
    "note": "≈ شمار کل اعلام‌شده و گرد‌شدهٔ ناشر؛ دقت میلیون پارامتر."
  },
  "activeParametersB": {
    "state": "not-applicable"
  },
  "kind": "embedding",
  "inputModalities": [
    "text"
  ],
  "outputModalities": [
    "embedding"
  ],
  "applications": [
    "enterprise-rag"
  ],
  "languages": [
    {
      "language": "multilingual",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-777ef26411272524f0"
        ]
      }
    }
  ],
  "persianEvidenceStatus": "not-evaluated",
  "declaredContext": {
    "state": "known",
    "value": 8192,
    "evidenceIds": [
      "evidence:baai-bge-m3-context"
    ],
    "unit": "token",
    "note": "ظرفیت اعلام‌شدهٔ ناشر؛ ارزیابی کیفیت بلندمتن در این بسته ثبت نشده است."
  },
  "evaluatedContext": {
    "state": "not-measured"
  },
  "releaseStatus": "available",
  "lastReviewedOn": "2026-09-15",
  "license": {
    "name": {
      "state": "known",
      "value": "MIT",
      "evidenceIds": [
        "evidence:baai-bge-m3-license"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://huggingface.co/BAAI/bge-m3/blob/5617a9f61b028005a4858fdac845db406aefb181/README.md",
      "evidenceIds": [
        "evidence:baai-bge-m3-license"
      ]
    },
    "commercialUse": {
      "state": "known",
      "value": "allowed",
      "evidenceIds": [
        "evidence:baai-bge-m3-license"
      ]
    },
    "restrictions": [],
    "evidenceIds": [
      "evidence:baai-bge-m3-license"
    ]
  },
  "evidenceIds": [
    "evidence:baai-bge-m3-card",
    "evidence:baai-bge-m3-metadata",
    "evidence:baai-bge-m3-parameters",
    "evidence:baai-bge-m3-license",
    "evidence:baai-bge-m3-context",
    "evidence:baai-bge-m3-config",
    "evidence:four-tables-release-bge-m3-release",
    "evidence:four-tables-baai-bge-m3-size",
    "evidence:v03-777ef26411272524f0"
  ],
  "releasedOn": "2024-01-30",
  "specializedSpecs": {
    "task": {
      "state": "known",
      "value": "بازیابی متراکم، تنک و چندبرداری",
      "evidenceIds": [
        "evidence:baai-bge-m3-card"
      ]
    },
    "output": {
      "state": "known",
      "value": "بردار متراکم ۱۰۲۴بُعدی + وزن توکن + چندبرداری",
      "evidenceIds": [
        "evidence:baai-bge-m3-card"
      ]
    },
    "embeddingDimensions": {
      "state": "known",
      "value": 1024,
      "evidenceIds": [
        "evidence:baai-bge-m3-card"
      ]
    },
    "poolingOrScoring": {
      "state": "known",
      "value": "dense_vecs، lexical_weights و colbert_vecs؛ ترکیب امتیاز روش‌ها با وزن انتخابی.",
      "evidenceIds": [
        "evidence:baai-bge-m3-card"
      ]
    },
    "features": {
      "state": "known",
      "value": "بازیابی ترکیبی؛ بدون پیشوند دستور روی query",
      "evidenceIds": [
        "evidence:baai-bge-m3-card"
      ]
    },
    "languages": {
      "state": "known",
      "value": "چندزبانه",
      "evidenceIds": [
        "evidence:baai-bge-m3-card"
      ]
    }
  },
  "parameterCounts": [
    {
      "scope": "total",
      "label": "شمار کل گرد‌شدهٔ جدول ناشر",
      "value": {
        "state": "known",
        "value": 0.569,
        "evidenceIds": [
          "evidence:four-tables-baai-bge-m3-size"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    }
  ]
});
models.push({
  "id": "model:baai-bge-reranker-v2-m3",
  "familyId": "family:bge",
  "exactName": "bge-reranker-v2-m3",
  "publisher": "BAAI",
  "version": "953dc6f6f85a1b2dbfca4c34a2796e7dde08d41e",
  "aliases": [
    "BAAI/bge-reranker-v2-m3"
  ],
  "stage": "other",
  "architecture": "dense",
  "totalParametersB": {
    "state": "known",
    "value": 0.568,
    "evidenceIds": [
      "evidence:four-tables-baai-bge-reranker-v2-m3-size"
    ],
    "unit": "billion-parameters",
    "note": "≈ شمار کل اعلام‌شده و گرد‌شدهٔ ناشر؛ دقت میلیون پارامتر."
  },
  "activeParametersB": {
    "state": "not-applicable"
  },
  "kind": "reranker",
  "inputModalities": [
    "text"
  ],
  "outputModalities": [
    "structured-data"
  ],
  "applications": [
    "enterprise-rag"
  ],
  "languages": [
    {
      "language": "multilingual",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-9252ab55786d951482"
        ]
      }
    }
  ],
  "persianEvidenceStatus": "not-evaluated",
  "declaredContext": {
    "state": "known",
    "value": 8192,
    "evidenceIds": [
      "evidence:v03-2555708e88edefa3f9"
    ],
    "unit": "token",
    "note": "حد پیکربندی منتشرشده؛ ورودی و خروجی و نشانه‌های ویژه از همین بودجه استفاده می‌کنند."
  },
  "evaluatedContext": {
    "state": "not-measured"
  },
  "releaseStatus": "available",
  "lastReviewedOn": "2026-09-15",
  "license": {
    "name": {
      "state": "known",
      "value": "Apache-2.0",
      "evidenceIds": [
        "evidence:baai-bge-reranker-v2-m3-license"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://huggingface.co/BAAI/bge-reranker-v2-m3/blob/953dc6f6f85a1b2dbfca4c34a2796e7dde08d41e/README.md",
      "evidenceIds": [
        "evidence:baai-bge-reranker-v2-m3-license"
      ]
    },
    "commercialUse": {
      "state": "known",
      "value": "allowed",
      "evidenceIds": [
        "evidence:baai-bge-reranker-v2-m3-license"
      ]
    },
    "restrictions": [],
    "evidenceIds": [
      "evidence:baai-bge-reranker-v2-m3-license"
    ]
  },
  "evidenceIds": [
    "evidence:baai-bge-reranker-v2-m3-card",
    "evidence:baai-bge-reranker-v2-m3-metadata",
    "evidence:baai-bge-reranker-v2-m3-parameters",
    "evidence:baai-bge-reranker-v2-m3-license",
    "evidence:baai-bge-reranker-v2-m3-context",
    "evidence:baai-bge-reranker-v2-m3-config",
    "evidence:four-tables-release-bge-reranker-v2-release",
    "evidence:four-tables-baai-bge-reranker-v2-m3-size",
    "evidence:v03-2555708e88edefa3f9",
    "evidence:v03-9252ab55786d951482"
  ],
  "releasedOn": "2024-03-18",
  "specializedSpecs": {
    "task": {
      "state": "known",
      "value": "بازرتبه‌بندی زوج پرسش و سند",
      "evidenceIds": [
        "evidence:baai-bge-reranker-v2-m3-card"
      ]
    },
    "output": {
      "state": "known",
      "value": "امتیاز ارتباط؛ sigmoid اختیاری در بازهٔ ۰ تا ۱",
      "evidenceIds": [
        "evidence:baai-bge-reranker-v2-m3-card"
      ]
    },
    "poolingOrScoring": {
      "state": "known",
      "value": "Cross-encoder؛ normalize=True تابع sigmoid را اعمال می‌کند؛ خروجی embedding نیست.",
      "evidenceIds": [
        "evidence:baai-bge-reranker-v2-m3-card"
      ]
    },
    "features": {
      "state": "known",
      "value": "چندزبانه؛ امتیازدهی مستقیم به زوج متن",
      "evidenceIds": [
        "evidence:baai-bge-reranker-v2-m3-card"
      ]
    },
    "languages": {
      "state": "known",
      "value": "چندزبانه",
      "evidenceIds": [
        "evidence:baai-bge-reranker-v2-m3-card"
      ]
    }
  },
  "parameterCounts": [
    {
      "scope": "total",
      "label": "شمار کل گرد‌شدهٔ جدول ناشر",
      "value": {
        "state": "known",
        "value": 0.568,
        "evidenceIds": [
          "evidence:four-tables-baai-bge-reranker-v2-m3-size"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "stored",
      "label": "تعداد عناصر پارامتری نمایهٔ Safetensors",
      "value": {
        "state": "known",
        "value": 0.567755777,
        "evidenceIds": [
          "evidence:v03-9252ab55786d951482"
        ],
        "unit": "billion-parameters",
        "note": "نمایهٔ فایل وزن؛ برای وزن کوانت‌شده یا اشتراک وزن، الزاماً شمار پارامتر مستقل نیست."
      },
      "approximate": false
    }
  ]
});
models.push({
  "id": "model:coherelabs-aya-expanse-32b",
  "familyId": "family:aya-cohere",
  "exactName": "aya-expanse-32b",
  "publisher": "Cohere Labs",
  "version": "b306ea27e360683b50c005d7fcbad6a242317910",
  "aliases": [
    "CohereLabs/aya-expanse-32b"
  ],
  "stage": "instruct",
  "architecture": "dense",
  "totalParametersB": {
    "state": "known",
    "value": 32,
    "evidenceIds": [
      "evidence:coherelabs-aya-expanse-32b-parameters"
    ],
    "unit": "billion-parameters",
    "note": "اعداد پارامتر معرفی مدل، گرد‌شده‌اند؛ safetensors.total شمار عناصر ذخیره‌شده است و الزاماً پارامتر یکتا نیست."
  },
  "activeParametersB": {
    "state": "not-applicable"
  },
  "kind": "generative",
  "inputModalities": [
    "text"
  ],
  "outputModalities": [
    "text"
  ],
  "applications": [
    "text-work",
    "enterprise-rag",
    "structured-extraction"
  ],
  "languages": [
    {
      "language": "en",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-5d1109f7e91f534197"
        ]
      }
    },
    {
      "language": "fr",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-5d1109f7e91f534197"
        ]
      }
    },
    {
      "language": "de",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-5d1109f7e91f534197"
        ]
      }
    },
    {
      "language": "es",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-5d1109f7e91f534197"
        ]
      }
    },
    {
      "language": "it",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-5d1109f7e91f534197"
        ]
      }
    },
    {
      "language": "pt",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-5d1109f7e91f534197"
        ]
      }
    },
    {
      "language": "ja",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-5d1109f7e91f534197"
        ]
      }
    },
    {
      "language": "ko",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-5d1109f7e91f534197"
        ]
      }
    },
    {
      "language": "zh",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-5d1109f7e91f534197"
        ]
      }
    },
    {
      "language": "ar",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-5d1109f7e91f534197"
        ]
      }
    },
    {
      "language": "el",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-5d1109f7e91f534197"
        ]
      }
    },
    {
      "language": "fa",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-5d1109f7e91f534197"
        ]
      }
    },
    {
      "language": "pl",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-5d1109f7e91f534197"
        ]
      }
    },
    {
      "language": "id",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-5d1109f7e91f534197"
        ]
      }
    },
    {
      "language": "cs",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-5d1109f7e91f534197"
        ]
      }
    },
    {
      "language": "he",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-5d1109f7e91f534197"
        ]
      }
    },
    {
      "language": "hi",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-5d1109f7e91f534197"
        ]
      }
    },
    {
      "language": "nl",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-5d1109f7e91f534197"
        ]
      }
    },
    {
      "language": "ro",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-5d1109f7e91f534197"
        ]
      }
    },
    {
      "language": "ru",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-5d1109f7e91f534197"
        ]
      }
    },
    {
      "language": "tr",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-5d1109f7e91f534197"
        ]
      }
    },
    {
      "language": "uk",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-5d1109f7e91f534197"
        ]
      }
    },
    {
      "language": "vi",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-5d1109f7e91f534197"
        ]
      }
    }
  ],
  "persianEvidenceStatus": "publisher-claimed",
  "declaredContext": {
    "state": "known",
    "value": 131072,
    "evidenceIds": [
      "evidence:coherelabs-aya-expanse-32b-context"
    ],
    "unit": "token",
    "note": "ظرفیت اعلام‌شدهٔ ناشر؛ ارزیابی کیفیت بلندمتن در این بسته ثبت نشده است."
  },
  "evaluatedContext": {
    "state": "not-measured"
  },
  "releaseStatus": "available",
  "lastReviewedOn": "2026-09-15",
  "license": {
    "name": {
      "state": "known",
      "value": "CC-BY-NC-4.0 + Cohere Acceptable Use Policy",
      "evidenceIds": [
        "evidence:coherelabs-aya-expanse-32b-license"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://huggingface.co/CohereLabs/aya-expanse-32b",
      "evidenceIds": [
        "evidence:coherelabs-aya-expanse-32b-license"
      ]
    },
    "commercialUse": {
      "state": "known",
      "value": "prohibited",
      "evidenceIds": [
        "evidence:coherelabs-aya-expanse-32b-license"
      ],
      "note": "مجوز منتشرشده غیرتجاری است؛ توافق تجاری جداگانه ممکن است."
    },
    "restrictions": [
      "شرط غیرتجاری و سیاست استفادهٔ قابل قبول Cohere؛ مجوز تجاری جداگانه در این بسته بررسی نشده است."
    ],
    "evidenceIds": [
      "evidence:coherelabs-aya-expanse-32b-license"
    ]
  },
  "evidenceIds": [
    "evidence:coherelabs-aya-expanse-32b-card",
    "evidence:coherelabs-aya-expanse-32b-metadata",
    "evidence:coherelabs-aya-expanse-32b-parameters",
    "evidence:coherelabs-aya-expanse-32b-license",
    "evidence:coherelabs-aya-expanse-32b-context",
    "evidence:four-tables-release-aya-expanse-release",
    "evidence:v03-5d1109f7e91f534197",
    "evidence:v03-50519b37f3fc26b4a5"
  ],
  "releasedOn": "2024-10-24",
  "parameterCounts": [
    {
      "scope": "total",
      "label": "شمار کل اعلام‌شده",
      "value": {
        "state": "known",
        "value": 32,
        "evidenceIds": [
          "evidence:coherelabs-aya-expanse-32b-parameters"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "stored",
      "label": "تعداد عناصر پارامتری نمایهٔ Safetensors",
      "value": {
        "state": "known",
        "value": 32.296476672,
        "evidenceIds": [
          "evidence:v03-5d1109f7e91f534197"
        ],
        "unit": "billion-parameters",
        "note": "نمایهٔ فایل وزن؛ برای وزن کوانت‌شده یا اشتراک وزن، الزاماً شمار پارامتر مستقل نیست."
      },
      "approximate": false
    }
  ]
});
models.push({
  "id": "model:coherelabs-aya-expanse-8b",
  "familyId": "family:aya-cohere",
  "exactName": "aya-expanse-8b",
  "publisher": "Cohere Labs",
  "version": "5062468bf9bc0c6035fd64e06274333ec127d980",
  "aliases": [
    "CohereLabs/aya-expanse-8b"
  ],
  "stage": "instruct",
  "architecture": "dense",
  "totalParametersB": {
    "state": "known",
    "value": 8,
    "evidenceIds": [
      "evidence:coherelabs-aya-expanse-8b-parameters"
    ],
    "unit": "billion-parameters",
    "note": "اعداد پارامتر معرفی مدل، گرد‌شده‌اند؛ safetensors.total شمار عناصر ذخیره‌شده است و الزاماً پارامتر یکتا نیست."
  },
  "activeParametersB": {
    "state": "not-applicable"
  },
  "kind": "generative",
  "inputModalities": [
    "text"
  ],
  "outputModalities": [
    "text"
  ],
  "applications": [
    "text-work",
    "enterprise-rag",
    "structured-extraction"
  ],
  "languages": [
    {
      "language": "en",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-4ddbabd95f6220b3d9"
        ]
      }
    },
    {
      "language": "fr",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-4ddbabd95f6220b3d9"
        ]
      }
    },
    {
      "language": "de",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-4ddbabd95f6220b3d9"
        ]
      }
    },
    {
      "language": "es",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-4ddbabd95f6220b3d9"
        ]
      }
    },
    {
      "language": "it",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-4ddbabd95f6220b3d9"
        ]
      }
    },
    {
      "language": "pt",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-4ddbabd95f6220b3d9"
        ]
      }
    },
    {
      "language": "ja",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-4ddbabd95f6220b3d9"
        ]
      }
    },
    {
      "language": "ko",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-4ddbabd95f6220b3d9"
        ]
      }
    },
    {
      "language": "zh",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-4ddbabd95f6220b3d9"
        ]
      }
    },
    {
      "language": "ar",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-4ddbabd95f6220b3d9"
        ]
      }
    },
    {
      "language": "el",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-4ddbabd95f6220b3d9"
        ]
      }
    },
    {
      "language": "fa",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-4ddbabd95f6220b3d9"
        ]
      }
    },
    {
      "language": "pl",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-4ddbabd95f6220b3d9"
        ]
      }
    },
    {
      "language": "id",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-4ddbabd95f6220b3d9"
        ]
      }
    },
    {
      "language": "cs",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-4ddbabd95f6220b3d9"
        ]
      }
    },
    {
      "language": "he",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-4ddbabd95f6220b3d9"
        ]
      }
    },
    {
      "language": "hi",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-4ddbabd95f6220b3d9"
        ]
      }
    },
    {
      "language": "nl",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-4ddbabd95f6220b3d9"
        ]
      }
    },
    {
      "language": "ro",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-4ddbabd95f6220b3d9"
        ]
      }
    },
    {
      "language": "ru",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-4ddbabd95f6220b3d9"
        ]
      }
    },
    {
      "language": "tr",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-4ddbabd95f6220b3d9"
        ]
      }
    },
    {
      "language": "uk",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-4ddbabd95f6220b3d9"
        ]
      }
    },
    {
      "language": "vi",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-4ddbabd95f6220b3d9"
        ]
      }
    }
  ],
  "persianEvidenceStatus": "publisher-claimed",
  "declaredContext": {
    "state": "known",
    "value": 8192,
    "evidenceIds": [
      "evidence:coherelabs-aya-expanse-8b-context"
    ],
    "unit": "token",
    "note": "ظرفیت اعلام‌شدهٔ ناشر؛ ارزیابی کیفیت بلندمتن در این بسته ثبت نشده است."
  },
  "evaluatedContext": {
    "state": "not-measured"
  },
  "releaseStatus": "available",
  "lastReviewedOn": "2026-09-15",
  "license": {
    "name": {
      "state": "known",
      "value": "CC-BY-NC-4.0 + Cohere Acceptable Use Policy",
      "evidenceIds": [
        "evidence:coherelabs-aya-expanse-8b-license"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://huggingface.co/CohereLabs/aya-expanse-8b",
      "evidenceIds": [
        "evidence:coherelabs-aya-expanse-8b-license"
      ]
    },
    "commercialUse": {
      "state": "known",
      "value": "prohibited",
      "evidenceIds": [
        "evidence:coherelabs-aya-expanse-8b-license"
      ],
      "note": "مجوز منتشرشده غیرتجاری است؛ توافق تجاری جداگانه ممکن است."
    },
    "restrictions": [
      "شرط غیرتجاری و سیاست استفادهٔ قابل قبول Cohere؛ مجوز تجاری جداگانه در این بسته بررسی نشده است."
    ],
    "evidenceIds": [
      "evidence:coherelabs-aya-expanse-8b-license"
    ]
  },
  "evidenceIds": [
    "evidence:coherelabs-aya-expanse-8b-card",
    "evidence:coherelabs-aya-expanse-8b-metadata",
    "evidence:coherelabs-aya-expanse-8b-parameters",
    "evidence:coherelabs-aya-expanse-8b-license",
    "evidence:coherelabs-aya-expanse-8b-context",
    "evidence:four-tables-release-aya-expanse-release",
    "evidence:v03-4ddbabd95f6220b3d9",
    "evidence:v03-7fd37ca79c736c18bd"
  ],
  "releasedOn": "2024-10-24",
  "parameterCounts": [
    {
      "scope": "total",
      "label": "شمار کل اعلام‌شده",
      "value": {
        "state": "known",
        "value": 8,
        "evidenceIds": [
          "evidence:coherelabs-aya-expanse-8b-parameters"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "stored",
      "label": "تعداد عناصر پارامتری نمایهٔ Safetensors",
      "value": {
        "state": "known",
        "value": 8.028033024,
        "evidenceIds": [
          "evidence:v03-4ddbabd95f6220b3d9"
        ],
        "unit": "billion-parameters",
        "note": "نمایهٔ فایل وزن؛ برای وزن کوانت‌شده یا اشتراک وزن، الزاماً شمار پارامتر مستقل نیست."
      },
      "approximate": false
    }
  ]
});
models.push({
  "id": "model:coherelabs-tiny-aya-global",
  "familyId": "family:aya-cohere",
  "exactName": "tiny-aya-global",
  "publisher": "Cohere Labs",
  "version": "00590ff258ccd84a805f13efcd1c34c2a542654f",
  "aliases": [
    "CohereLabs/tiny-aya-global"
  ],
  "stage": "instruct",
  "architecture": "dense",
  "totalParametersB": {
    "state": "known",
    "value": 3.35,
    "evidenceIds": [
      "evidence:coherelabs-tiny-aya-global-parameters"
    ],
    "unit": "billion-parameters",
    "note": "اعداد پارامتر معرفی مدل، گرد‌شده‌اند؛ safetensors.total شمار عناصر ذخیره‌شده است و الزاماً پارامتر یکتا نیست."
  },
  "activeParametersB": {
    "state": "not-applicable"
  },
  "kind": "generative",
  "inputModalities": [
    "text"
  ],
  "outputModalities": [
    "text"
  ],
  "applications": [
    "text-work",
    "enterprise-rag",
    "structured-extraction",
    "coding-assistant"
  ],
  "languages": [
    {
      "language": "en",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-7deda675978f347e4c"
        ]
      }
    },
    {
      "language": "nl",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-7deda675978f347e4c"
        ]
      }
    },
    {
      "language": "fr",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-7deda675978f347e4c"
        ]
      }
    },
    {
      "language": "it",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-7deda675978f347e4c"
        ]
      }
    },
    {
      "language": "pt",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-7deda675978f347e4c"
        ]
      }
    },
    {
      "language": "ro",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-7deda675978f347e4c"
        ]
      }
    },
    {
      "language": "es",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-7deda675978f347e4c"
        ]
      }
    },
    {
      "language": "cs",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-7deda675978f347e4c"
        ]
      }
    },
    {
      "language": "pl",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-7deda675978f347e4c"
        ]
      }
    },
    {
      "language": "uk",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-7deda675978f347e4c"
        ]
      }
    },
    {
      "language": "ru",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-7deda675978f347e4c"
        ]
      }
    },
    {
      "language": "el",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-7deda675978f347e4c"
        ]
      }
    },
    {
      "language": "de",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-7deda675978f347e4c"
        ]
      }
    },
    {
      "language": "da",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-7deda675978f347e4c"
        ]
      }
    },
    {
      "language": "sv",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-7deda675978f347e4c"
        ]
      }
    },
    {
      "language": "no",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-7deda675978f347e4c"
        ]
      }
    },
    {
      "language": "ca",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-7deda675978f347e4c"
        ]
      }
    },
    {
      "language": "gl",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-7deda675978f347e4c"
        ]
      }
    },
    {
      "language": "cy",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-7deda675978f347e4c"
        ]
      }
    },
    {
      "language": "ga",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-7deda675978f347e4c"
        ]
      }
    },
    {
      "language": "eu",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-7deda675978f347e4c"
        ]
      }
    },
    {
      "language": "hr",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-7deda675978f347e4c"
        ]
      }
    },
    {
      "language": "lv",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-7deda675978f347e4c"
        ]
      }
    },
    {
      "language": "lt",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-7deda675978f347e4c"
        ]
      }
    },
    {
      "language": "sk",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-7deda675978f347e4c"
        ]
      }
    },
    {
      "language": "sl",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-7deda675978f347e4c"
        ]
      }
    },
    {
      "language": "et",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-7deda675978f347e4c"
        ]
      }
    },
    {
      "language": "fi",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-7deda675978f347e4c"
        ]
      }
    },
    {
      "language": "hu",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-7deda675978f347e4c"
        ]
      }
    },
    {
      "language": "sr",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-7deda675978f347e4c"
        ]
      }
    },
    {
      "language": "bg",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-7deda675978f347e4c"
        ]
      }
    },
    {
      "language": "ar",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-7deda675978f347e4c"
        ]
      }
    },
    {
      "language": "fa",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-7deda675978f347e4c"
        ]
      }
    },
    {
      "language": "ur",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-7deda675978f347e4c"
        ]
      }
    },
    {
      "language": "tr",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-7deda675978f347e4c"
        ]
      }
    },
    {
      "language": "mt",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-7deda675978f347e4c"
        ]
      }
    },
    {
      "language": "he",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-7deda675978f347e4c"
        ]
      }
    },
    {
      "language": "hi",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-7deda675978f347e4c"
        ]
      }
    },
    {
      "language": "mr",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-7deda675978f347e4c"
        ]
      }
    },
    {
      "language": "bn",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-7deda675978f347e4c"
        ]
      }
    },
    {
      "language": "gu",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-7deda675978f347e4c"
        ]
      }
    },
    {
      "language": "pa",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-7deda675978f347e4c"
        ]
      }
    },
    {
      "language": "ta",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-7deda675978f347e4c"
        ]
      }
    },
    {
      "language": "te",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-7deda675978f347e4c"
        ]
      }
    },
    {
      "language": "ne",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-7deda675978f347e4c"
        ]
      }
    },
    {
      "language": "tl",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-7deda675978f347e4c"
        ]
      }
    },
    {
      "language": "ms",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-7deda675978f347e4c"
        ]
      }
    },
    {
      "language": "id",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-7deda675978f347e4c"
        ]
      }
    },
    {
      "language": "vi",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-7deda675978f347e4c"
        ]
      }
    },
    {
      "language": "jv",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-7deda675978f347e4c"
        ]
      }
    },
    {
      "language": "km",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-7deda675978f347e4c"
        ]
      }
    },
    {
      "language": "th",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-7deda675978f347e4c"
        ]
      }
    },
    {
      "language": "lo",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-7deda675978f347e4c"
        ]
      }
    },
    {
      "language": "zh",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-7deda675978f347e4c"
        ]
      }
    },
    {
      "language": "my",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-7deda675978f347e4c"
        ]
      }
    },
    {
      "language": "ja",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-7deda675978f347e4c"
        ]
      }
    },
    {
      "language": "ko",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-7deda675978f347e4c"
        ]
      }
    },
    {
      "language": "am",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-7deda675978f347e4c"
        ]
      }
    },
    {
      "language": "ha",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-7deda675978f347e4c"
        ]
      }
    },
    {
      "language": "ig",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-7deda675978f347e4c"
        ]
      }
    },
    {
      "language": "mg",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-7deda675978f347e4c"
        ]
      }
    },
    {
      "language": "sn",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-7deda675978f347e4c"
        ]
      }
    },
    {
      "language": "sw",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-7deda675978f347e4c"
        ]
      }
    },
    {
      "language": "wo",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-7deda675978f347e4c"
        ]
      }
    },
    {
      "language": "xh",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-7deda675978f347e4c"
        ]
      }
    },
    {
      "language": "yo",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-7deda675978f347e4c"
        ]
      }
    },
    {
      "language": "zu",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-7deda675978f347e4c"
        ]
      }
    }
  ],
  "persianEvidenceStatus": "publisher-claimed",
  "declaredContext": {
    "state": "known",
    "value": 8192,
    "evidenceIds": [
      "evidence:four-tables-coherelabs-tiny-aya-global-declared-context"
    ],
    "unit": "token",
    "note": "ظرفیت اعلام‌شدهٔ ناشر؛ حداقل حافظه یا تضمین کیفیت بلندمتن نیست."
  },
  "evaluatedContext": {
    "state": "not-measured"
  },
  "releaseStatus": "available",
  "lastReviewedOn": "2026-09-15",
  "license": {
    "name": {
      "state": "known",
      "value": "CC-BY-NC-4.0 + Cohere Acceptable Use Policy",
      "evidenceIds": [
        "evidence:coherelabs-tiny-aya-global-license"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://huggingface.co/CohereLabs/tiny-aya-global",
      "evidenceIds": [
        "evidence:coherelabs-tiny-aya-global-license"
      ]
    },
    "commercialUse": {
      "state": "known",
      "value": "prohibited",
      "evidenceIds": [
        "evidence:coherelabs-tiny-aya-global-license"
      ],
      "note": "مجوز منتشرشده غیرتجاری است؛ توافق تجاری جداگانه ممکن است."
    },
    "restrictions": [
      "شرط غیرتجاری و سیاست استفادهٔ قابل قبول Cohere؛ مجوز تجاری جداگانه در این بسته بررسی نشده است."
    ],
    "evidenceIds": [
      "evidence:coherelabs-tiny-aya-global-license"
    ]
  },
  "evidenceIds": [
    "evidence:coherelabs-tiny-aya-global-card",
    "evidence:coherelabs-tiny-aya-global-metadata",
    "evidence:coherelabs-tiny-aya-global-parameters",
    "evidence:coherelabs-tiny-aya-global-license",
    "evidence:coherelabs-tiny-aya-global-context",
    "evidence:four-tables-release-tiny-aya-release",
    "evidence:four-tables-coherelabs-tiny-aya-global-declared-context",
    "evidence:v03-7deda675978f347e4c",
    "evidence:v03-690f5a70697f256add"
  ],
  "releasedOn": "2026-02-17",
  "parameterCounts": [
    {
      "scope": "total",
      "label": "شمار کل اعلام‌شده",
      "value": {
        "state": "known",
        "value": 3.35,
        "evidenceIds": [
          "evidence:coherelabs-tiny-aya-global-parameters"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "stored",
      "label": "تعداد عناصر پارامتری نمایهٔ Safetensors",
      "value": {
        "state": "known",
        "value": 3.34922752,
        "evidenceIds": [
          "evidence:v03-7deda675978f347e4c"
        ],
        "unit": "billion-parameters",
        "note": "نمایهٔ فایل وزن؛ برای وزن کوانت‌شده یا اشتراک وزن، الزاماً شمار پارامتر مستقل نیست."
      },
      "approximate": false
    }
  ]
});
models.push({
  "id": "model:huggingfacetb-smollm2-1-7b-instruct",
  "familyId": "family:smollm",
  "exactName": "SmolLM2-1.7B-Instruct",
  "publisher": "Hugging Face",
  "version": "31b70e2e869a7173562077fd711b654946d38674",
  "aliases": [
    "HuggingFaceTB/SmolLM2-1.7B-Instruct"
  ],
  "stage": "instruct",
  "architecture": "dense",
  "totalParametersB": {
    "state": "known",
    "value": 1.7,
    "evidenceIds": [
      "evidence:huggingfacetb-smollm2-1-7b-instruct-parameters"
    ],
    "unit": "billion-parameters",
    "note": "اعداد پارامتر معرفی مدل، گرد‌شده‌اند؛ safetensors.total شمار عناصر ذخیره‌شده است و الزاماً پارامتر یکتا نیست."
  },
  "activeParametersB": {
    "state": "not-applicable"
  },
  "kind": "generative",
  "inputModalities": [
    "text"
  ],
  "outputModalities": [
    "text"
  ],
  "applications": [
    "text-work",
    "enterprise-rag",
    "structured-extraction",
    "coding-assistant",
    "agents-tools"
  ],
  "languages": [
    {
      "language": "en",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-ed596e606436e6adbc"
        ]
      }
    }
  ],
  "persianEvidenceStatus": "not-evaluated",
  "declaredContext": {
    "state": "known",
    "value": 8192,
    "evidenceIds": [
      "evidence:v03-806f66e19765c6d7d0"
    ],
    "unit": "token",
    "note": "حد پیکربندی منتشرشده؛ ورودی و خروجی و نشانه‌های ویژه از همین بودجه استفاده می‌کنند."
  },
  "evaluatedContext": {
    "state": "not-measured"
  },
  "releaseStatus": "available",
  "lastReviewedOn": "2026-09-15",
  "license": {
    "name": {
      "state": "known",
      "value": "Apache-2.0",
      "evidenceIds": [
        "evidence:huggingfacetb-smollm2-1-7b-instruct-license"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://huggingface.co/HuggingFaceTB/SmolLM2-1.7B-Instruct/blob/31b70e2e869a7173562077fd711b654946d38674/README.md",
      "evidenceIds": [
        "evidence:huggingfacetb-smollm2-1-7b-instruct-license"
      ]
    },
    "commercialUse": {
      "state": "known",
      "value": "allowed",
      "evidenceIds": [
        "evidence:huggingfacetb-smollm2-1-7b-instruct-license"
      ]
    },
    "restrictions": [],
    "evidenceIds": [
      "evidence:huggingfacetb-smollm2-1-7b-instruct-license"
    ]
  },
  "evidenceIds": [
    "evidence:huggingfacetb-smollm2-1-7b-instruct-card",
    "evidence:huggingfacetb-smollm2-1-7b-instruct-metadata",
    "evidence:huggingfacetb-smollm2-1-7b-instruct-parameters",
    "evidence:huggingfacetb-smollm2-1-7b-instruct-license",
    "evidence:huggingfacetb-smollm2-1-7b-instruct-config",
    "evidence:v03-806f66e19765c6d7d0",
    "evidence:v03-ed596e606436e6adbc",
    "evidence:v03-9c5cd7741b6bd7013a"
  ],
  "parameterCounts": [
    {
      "scope": "total",
      "label": "شمار کل اعلام‌شده",
      "value": {
        "state": "known",
        "value": 1.7,
        "evidenceIds": [
          "evidence:huggingfacetb-smollm2-1-7b-instruct-parameters"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "stored",
      "label": "تعداد عناصر پارامتری نمایهٔ Safetensors",
      "value": {
        "state": "known",
        "value": 1.711376384,
        "evidenceIds": [
          "evidence:v03-ed596e606436e6adbc"
        ],
        "unit": "billion-parameters",
        "note": "نمایهٔ فایل وزن؛ برای وزن کوانت‌شده یا اشتراک وزن، الزاماً شمار پارامتر مستقل نیست."
      },
      "approximate": false
    }
  ]
});
models.push({
  "id": "model:huggingfacetb-smollm2-135m-instruct",
  "familyId": "family:smollm",
  "exactName": "SmolLM2-135M-Instruct",
  "publisher": "Hugging Face",
  "version": "12fd25f77366fa6b3b4b768ec3050bf629380bac",
  "aliases": [
    "HuggingFaceTB/SmolLM2-135M-Instruct"
  ],
  "stage": "instruct",
  "architecture": "dense",
  "totalParametersB": {
    "state": "known",
    "value": 0.135,
    "evidenceIds": [
      "evidence:huggingfacetb-smollm2-135m-instruct-parameters"
    ],
    "unit": "billion-parameters",
    "note": "اعداد پارامتر معرفی مدل، گرد‌شده‌اند؛ safetensors.total شمار عناصر ذخیره‌شده است و الزاماً پارامتر یکتا نیست."
  },
  "activeParametersB": {
    "state": "not-applicable"
  },
  "kind": "generative",
  "inputModalities": [
    "text"
  ],
  "outputModalities": [
    "text"
  ],
  "applications": [
    "text-work",
    "enterprise-rag",
    "structured-extraction",
    "agents-tools"
  ],
  "languages": [
    {
      "language": "en",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-d02395a33c4e1cbd3d"
        ]
      }
    }
  ],
  "persianEvidenceStatus": "not-evaluated",
  "declaredContext": {
    "state": "known",
    "value": 8192,
    "evidenceIds": [
      "evidence:v03-93650f7a6e6d1893f2"
    ],
    "unit": "token",
    "note": "حد پیکربندی منتشرشده؛ ورودی و خروجی و نشانه‌های ویژه از همین بودجه استفاده می‌کنند."
  },
  "evaluatedContext": {
    "state": "not-measured"
  },
  "releaseStatus": "available",
  "lastReviewedOn": "2026-09-15",
  "license": {
    "name": {
      "state": "known",
      "value": "Apache-2.0",
      "evidenceIds": [
        "evidence:huggingfacetb-smollm2-135m-instruct-license"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://huggingface.co/HuggingFaceTB/SmolLM2-135M-Instruct/blob/12fd25f77366fa6b3b4b768ec3050bf629380bac/README.md",
      "evidenceIds": [
        "evidence:huggingfacetb-smollm2-135m-instruct-license"
      ]
    },
    "commercialUse": {
      "state": "known",
      "value": "allowed",
      "evidenceIds": [
        "evidence:huggingfacetb-smollm2-135m-instruct-license"
      ]
    },
    "restrictions": [],
    "evidenceIds": [
      "evidence:huggingfacetb-smollm2-135m-instruct-license"
    ]
  },
  "evidenceIds": [
    "evidence:huggingfacetb-smollm2-135m-instruct-card",
    "evidence:huggingfacetb-smollm2-135m-instruct-metadata",
    "evidence:huggingfacetb-smollm2-135m-instruct-parameters",
    "evidence:huggingfacetb-smollm2-135m-instruct-license",
    "evidence:huggingfacetb-smollm2-135m-instruct-config",
    "evidence:v03-93650f7a6e6d1893f2",
    "evidence:v03-d02395a33c4e1cbd3d",
    "evidence:v03-fa4d5f78d993271304"
  ],
  "parameterCounts": [
    {
      "scope": "total",
      "label": "شمار کل اعلام‌شده",
      "value": {
        "state": "known",
        "value": 0.135,
        "evidenceIds": [
          "evidence:huggingfacetb-smollm2-135m-instruct-parameters"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "stored",
      "label": "تعداد عناصر پارامتری نمایهٔ Safetensors",
      "value": {
        "state": "known",
        "value": 0.134515008,
        "evidenceIds": [
          "evidence:v03-d02395a33c4e1cbd3d"
        ],
        "unit": "billion-parameters",
        "note": "نمایهٔ فایل وزن؛ برای وزن کوانت‌شده یا اشتراک وزن، الزاماً شمار پارامتر مستقل نیست."
      },
      "approximate": false
    }
  ]
});
models.push({
  "id": "model:huggingfacetb-smollm2-360m-instruct",
  "familyId": "family:smollm",
  "exactName": "SmolLM2-360M-Instruct",
  "publisher": "Hugging Face",
  "version": "a10cc1512eabd3dde888204e902eca88bddb4951",
  "aliases": [
    "HuggingFaceTB/SmolLM2-360M-Instruct"
  ],
  "stage": "instruct",
  "architecture": "dense",
  "totalParametersB": {
    "state": "known",
    "value": 0.36,
    "evidenceIds": [
      "evidence:huggingfacetb-smollm2-360m-instruct-parameters"
    ],
    "unit": "billion-parameters",
    "note": "اعداد پارامتر معرفی مدل، گرد‌شده‌اند؛ safetensors.total شمار عناصر ذخیره‌شده است و الزاماً پارامتر یکتا نیست."
  },
  "activeParametersB": {
    "state": "not-applicable"
  },
  "kind": "generative",
  "inputModalities": [
    "text"
  ],
  "outputModalities": [
    "text"
  ],
  "applications": [
    "text-work",
    "enterprise-rag",
    "structured-extraction",
    "agents-tools"
  ],
  "languages": [
    {
      "language": "en",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-f53a4a5fef8c2c2ce1"
        ]
      }
    }
  ],
  "persianEvidenceStatus": "not-evaluated",
  "declaredContext": {
    "state": "known",
    "value": 8192,
    "evidenceIds": [
      "evidence:v03-a7adadf74e25d42a29"
    ],
    "unit": "token",
    "note": "حد پیکربندی منتشرشده؛ ورودی و خروجی و نشانه‌های ویژه از همین بودجه استفاده می‌کنند."
  },
  "evaluatedContext": {
    "state": "not-measured"
  },
  "releaseStatus": "available",
  "lastReviewedOn": "2026-09-15",
  "license": {
    "name": {
      "state": "known",
      "value": "Apache-2.0",
      "evidenceIds": [
        "evidence:huggingfacetb-smollm2-360m-instruct-license"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://huggingface.co/HuggingFaceTB/SmolLM2-360M-Instruct/blob/a10cc1512eabd3dde888204e902eca88bddb4951/README.md",
      "evidenceIds": [
        "evidence:huggingfacetb-smollm2-360m-instruct-license"
      ]
    },
    "commercialUse": {
      "state": "known",
      "value": "allowed",
      "evidenceIds": [
        "evidence:huggingfacetb-smollm2-360m-instruct-license"
      ]
    },
    "restrictions": [],
    "evidenceIds": [
      "evidence:huggingfacetb-smollm2-360m-instruct-license"
    ]
  },
  "evidenceIds": [
    "evidence:huggingfacetb-smollm2-360m-instruct-card",
    "evidence:huggingfacetb-smollm2-360m-instruct-metadata",
    "evidence:huggingfacetb-smollm2-360m-instruct-parameters",
    "evidence:huggingfacetb-smollm2-360m-instruct-license",
    "evidence:huggingfacetb-smollm2-360m-instruct-config",
    "evidence:v03-a7adadf74e25d42a29",
    "evidence:v03-f53a4a5fef8c2c2ce1",
    "evidence:v03-c4f522374a6511e10d"
  ],
  "parameterCounts": [
    {
      "scope": "total",
      "label": "شمار کل اعلام‌شده",
      "value": {
        "state": "known",
        "value": 0.36,
        "evidenceIds": [
          "evidence:huggingfacetb-smollm2-360m-instruct-parameters"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "stored",
      "label": "تعداد عناصر پارامتری نمایهٔ Safetensors",
      "value": {
        "state": "known",
        "value": 0.36182112,
        "evidenceIds": [
          "evidence:v03-f53a4a5fef8c2c2ce1"
        ],
        "unit": "billion-parameters",
        "note": "نمایهٔ فایل وزن؛ برای وزن کوانت‌شده یا اشتراک وزن، الزاماً شمار پارامتر مستقل نیست."
      },
      "approximate": false
    }
  ]
});
models.push({
  "id": "model:huggingfacetb-smollm3-3b",
  "familyId": "family:smollm",
  "exactName": "SmolLM3-3B",
  "publisher": "Hugging Face",
  "version": "a07cc9a04f16550a088caea529712d1d335b0ac1",
  "aliases": [
    "HuggingFaceTB/SmolLM3-3B"
  ],
  "stage": "instruct",
  "architecture": "dense",
  "totalParametersB": {
    "state": "known",
    "value": 3,
    "evidenceIds": [
      "evidence:huggingfacetb-smollm3-3b-parameters"
    ],
    "unit": "billion-parameters",
    "note": "اعداد پارامتر معرفی مدل، گرد‌شده‌اند؛ safetensors.total شمار عناصر ذخیره‌شده است و الزاماً پارامتر یکتا نیست."
  },
  "activeParametersB": {
    "state": "not-applicable"
  },
  "kind": "generative",
  "inputModalities": [
    "text"
  ],
  "outputModalities": [
    "text"
  ],
  "applications": [
    "text-work",
    "reasoning-analysis",
    "agents-tools",
    "enterprise-rag",
    "structured-extraction",
    "coding-assistant"
  ],
  "languages": [
    {
      "language": "en",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-9f2eadd707ffa13313"
        ]
      }
    },
    {
      "language": "fr",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-9f2eadd707ffa13313"
        ]
      }
    },
    {
      "language": "es",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-9f2eadd707ffa13313"
        ]
      }
    },
    {
      "language": "it",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-9f2eadd707ffa13313"
        ]
      }
    },
    {
      "language": "pt",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-9f2eadd707ffa13313"
        ]
      }
    },
    {
      "language": "zh",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-9f2eadd707ffa13313"
        ]
      }
    },
    {
      "language": "ar",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-9f2eadd707ffa13313"
        ]
      }
    },
    {
      "language": "ru",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-9f2eadd707ffa13313"
        ]
      }
    }
  ],
  "persianEvidenceStatus": "not-evaluated",
  "declaredContext": {
    "state": "known",
    "value": 65536,
    "evidenceIds": [
      "evidence:four-tables-huggingfacetb-smollm3-3b-declared-context"
    ],
    "unit": "token",
    "note": "ظرفیت اعلام‌شدهٔ ناشر؛ حداقل حافظه یا تضمین کیفیت بلندمتن نیست."
  },
  "evaluatedContext": {
    "state": "not-measured"
  },
  "releaseStatus": "available",
  "lastReviewedOn": "2026-09-15",
  "license": {
    "name": {
      "state": "known",
      "value": "Apache-2.0",
      "evidenceIds": [
        "evidence:huggingfacetb-smollm3-3b-license"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://huggingface.co/HuggingFaceTB/SmolLM3-3B/blob/a07cc9a04f16550a088caea529712d1d335b0ac1/README.md",
      "evidenceIds": [
        "evidence:huggingfacetb-smollm3-3b-license"
      ]
    },
    "commercialUse": {
      "state": "known",
      "value": "allowed",
      "evidenceIds": [
        "evidence:huggingfacetb-smollm3-3b-license"
      ]
    },
    "restrictions": [],
    "evidenceIds": [
      "evidence:huggingfacetb-smollm3-3b-license"
    ]
  },
  "evidenceIds": [
    "evidence:huggingfacetb-smollm3-3b-card",
    "evidence:huggingfacetb-smollm3-3b-metadata",
    "evidence:huggingfacetb-smollm3-3b-parameters",
    "evidence:huggingfacetb-smollm3-3b-license",
    "evidence:huggingfacetb-smollm3-3b-config",
    "evidence:four-tables-release-smollm3-release",
    "evidence:four-tables-huggingfacetb-smollm3-3b-declared-context",
    "evidence:v03-9f2eadd707ffa13313",
    "evidence:v03-1cb00d19b57837ab69"
  ],
  "releasedOn": "2025-07-08",
  "parameterCounts": [
    {
      "scope": "total",
      "label": "شمار کل اعلام‌شده",
      "value": {
        "state": "known",
        "value": 3,
        "evidenceIds": [
          "evidence:huggingfacetb-smollm3-3b-parameters"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "stored",
      "label": "تعداد عناصر پارامتری نمایهٔ Safetensors",
      "value": {
        "state": "known",
        "value": 3.075098624,
        "evidenceIds": [
          "evidence:v03-9f2eadd707ffa13313"
        ],
        "unit": "billion-parameters",
        "note": "نمایهٔ فایل وزن؛ برای وزن کوانت‌شده یا اشتراک وزن، الزاماً شمار پارامتر مستقل نیست."
      },
      "approximate": false
    }
  ],
  "contextExtension": {
    "capacity": {
      "state": "known",
      "value": 131072,
      "evidenceIds": [
        "evidence:four-tables-huggingfacetb-smollm3-3b-declared-context"
      ],
      "unit": "token"
    },
    "condition": "تنظیم YaRN و افزایش max_position_embeddings"
  }
});
models.push({
  "id": "model:qwen-qwen3-0-6b",
  "familyId": "family:qwen",
  "exactName": "Qwen3-0.6B",
  "publisher": "Qwen / Alibaba Cloud",
  "version": "c1899de289a04d12100db370d81485cdf75e47ca",
  "aliases": [
    "Qwen/Qwen3-0.6B"
  ],
  "stage": "reasoning",
  "architecture": "dense",
  "totalParametersB": {
    "state": "known",
    "value": 0.6,
    "evidenceIds": [
      "evidence:qwen-qwen3-0-6b-parameters"
    ],
    "unit": "billion-parameters",
    "note": "اعداد پارامتر معرفی مدل، گرد‌شده‌اند؛ safetensors.total شمار عناصر ذخیره‌شده است و الزاماً پارامتر یکتا نیست."
  },
  "activeParametersB": {
    "state": "not-applicable"
  },
  "kind": "generative",
  "inputModalities": [
    "text"
  ],
  "outputModalities": [
    "text"
  ],
  "applications": [
    "text-work",
    "coding-assistant",
    "reasoning-analysis",
    "agents-tools",
    "enterprise-rag",
    "structured-extraction"
  ],
  "languages": [
    {
      "language": "multilingual",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-c1bd7018f0456ddde8"
        ]
      }
    },
    {
      "language": "en",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-c1bd7018f0456ddde8"
        ]
      }
    },
    {
      "language": "fa",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-c1bd7018f0456ddde8"
        ]
      }
    },
    {
      "language": "zh",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-c1bd7018f0456ddde8"
        ]
      }
    },
    {
      "language": "ar",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-c1bd7018f0456ddde8"
        ]
      }
    },
    {
      "language": "fr",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-c1bd7018f0456ddde8"
        ]
      }
    },
    {
      "language": "de",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-c1bd7018f0456ddde8"
        ]
      }
    },
    {
      "language": "es",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-c1bd7018f0456ddde8"
        ]
      }
    },
    {
      "language": "it",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-c1bd7018f0456ddde8"
        ]
      }
    },
    {
      "language": "pt",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-c1bd7018f0456ddde8"
        ]
      }
    },
    {
      "language": "ja",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-c1bd7018f0456ddde8"
        ]
      }
    },
    {
      "language": "ko",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-c1bd7018f0456ddde8"
        ]
      }
    },
    {
      "language": "hi",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-c1bd7018f0456ddde8"
        ]
      }
    },
    {
      "language": "ru",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-c1bd7018f0456ddde8"
        ]
      }
    }
  ],
  "persianEvidenceStatus": "publisher-claimed",
  "declaredContext": {
    "state": "known",
    "value": 32768,
    "evidenceIds": [
      "evidence:v03-21af22da05ddae881c"
    ],
    "unit": "token",
    "note": "زمینهٔ بومی اعلام‌شده در کارت مدل؛ توسعهٔ YaRN برای نسخه‌های پشتیبانی‌شده جداست."
  },
  "evaluatedContext": {
    "state": "not-measured"
  },
  "releaseStatus": "available",
  "lastReviewedOn": "2026-09-15",
  "license": {
    "name": {
      "state": "known",
      "value": "Apache-2.0",
      "evidenceIds": [
        "evidence:qwen-qwen3-0-6b-license"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://huggingface.co/Qwen/Qwen3-0.6B/blob/main/LICENSE",
      "evidenceIds": [
        "evidence:qwen-qwen3-0-6b-license"
      ]
    },
    "commercialUse": {
      "state": "known",
      "value": "allowed",
      "evidenceIds": [
        "evidence:qwen-qwen3-0-6b-license"
      ]
    },
    "restrictions": [],
    "evidenceIds": [
      "evidence:qwen-qwen3-0-6b-license"
    ]
  },
  "evidenceIds": [
    "evidence:qwen-qwen3-0-6b-card",
    "evidence:qwen-qwen3-0-6b-metadata",
    "evidence:qwen-qwen3-0-6b-parameters",
    "evidence:qwen-qwen3-0-6b-license",
    "evidence:qwen-qwen3-0-6b-context",
    "evidence:qwen-qwen3-0-6b-config",
    "evidence:four-tables-release-qwen3-launch",
    "evidence:v03-c1bd7018f0456ddde8",
    "evidence:v03-21af22da05ddae881c"
  ],
  "releasedOn": "2025-04-29",
  "parameterCounts": [
    {
      "scope": "total",
      "label": "شمار کل اعلام‌شده",
      "value": {
        "state": "known",
        "value": 0.6,
        "evidenceIds": [
          "evidence:qwen-qwen3-0-6b-parameters"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "stored",
      "label": "تعداد عناصر پارامتری نمایهٔ Safetensors",
      "value": {
        "state": "known",
        "value": 0.751632384,
        "evidenceIds": [
          "evidence:v03-e6280795e7725ad4ac"
        ],
        "unit": "billion-parameters",
        "note": "نمایهٔ فایل وزن؛ برای وزن کوانت‌شده یا اشتراک وزن، الزاماً شمار پارامتر مستقل نیست."
      },
      "approximate": false
    }
  ]
});
models.push({
  "id": "model:qwen-qwen3-1-7b",
  "familyId": "family:qwen",
  "exactName": "Qwen3-1.7B",
  "publisher": "Qwen / Alibaba Cloud",
  "version": "70d244cc86ccca08cf5af4e1e306ecf908b1ad5e",
  "aliases": [
    "Qwen/Qwen3-1.7B"
  ],
  "stage": "reasoning",
  "architecture": "dense",
  "totalParametersB": {
    "state": "known",
    "value": 1.7,
    "evidenceIds": [
      "evidence:qwen-qwen3-1-7b-parameters"
    ],
    "unit": "billion-parameters",
    "note": "اعداد پارامتر معرفی مدل، گرد‌شده‌اند؛ safetensors.total شمار عناصر ذخیره‌شده است و الزاماً پارامتر یکتا نیست."
  },
  "activeParametersB": {
    "state": "not-applicable"
  },
  "kind": "generative",
  "inputModalities": [
    "text"
  ],
  "outputModalities": [
    "text"
  ],
  "applications": [
    "text-work",
    "coding-assistant",
    "reasoning-analysis",
    "agents-tools",
    "enterprise-rag",
    "structured-extraction"
  ],
  "languages": [
    {
      "language": "multilingual",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-c1bd7018f0456ddde8"
        ]
      }
    },
    {
      "language": "en",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-c1bd7018f0456ddde8"
        ]
      }
    },
    {
      "language": "fa",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-c1bd7018f0456ddde8"
        ]
      }
    },
    {
      "language": "zh",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-c1bd7018f0456ddde8"
        ]
      }
    },
    {
      "language": "ar",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-c1bd7018f0456ddde8"
        ]
      }
    },
    {
      "language": "fr",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-c1bd7018f0456ddde8"
        ]
      }
    },
    {
      "language": "de",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-c1bd7018f0456ddde8"
        ]
      }
    },
    {
      "language": "es",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-c1bd7018f0456ddde8"
        ]
      }
    },
    {
      "language": "it",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-c1bd7018f0456ddde8"
        ]
      }
    },
    {
      "language": "pt",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-c1bd7018f0456ddde8"
        ]
      }
    },
    {
      "language": "ja",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-c1bd7018f0456ddde8"
        ]
      }
    },
    {
      "language": "ko",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-c1bd7018f0456ddde8"
        ]
      }
    },
    {
      "language": "hi",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-c1bd7018f0456ddde8"
        ]
      }
    },
    {
      "language": "ru",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-c1bd7018f0456ddde8"
        ]
      }
    }
  ],
  "persianEvidenceStatus": "publisher-claimed",
  "declaredContext": {
    "state": "known",
    "value": 32768,
    "evidenceIds": [
      "evidence:v03-49f96d4bca8be6d031"
    ],
    "unit": "token",
    "note": "زمینهٔ بومی اعلام‌شده در کارت مدل؛ توسعهٔ YaRN برای نسخه‌های پشتیبانی‌شده جداست."
  },
  "evaluatedContext": {
    "state": "not-measured"
  },
  "releaseStatus": "available",
  "lastReviewedOn": "2026-09-15",
  "license": {
    "name": {
      "state": "known",
      "value": "Apache-2.0",
      "evidenceIds": [
        "evidence:qwen-qwen3-1-7b-license"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://huggingface.co/Qwen/Qwen3-1.7B/blob/main/LICENSE",
      "evidenceIds": [
        "evidence:qwen-qwen3-1-7b-license"
      ]
    },
    "commercialUse": {
      "state": "known",
      "value": "allowed",
      "evidenceIds": [
        "evidence:qwen-qwen3-1-7b-license"
      ]
    },
    "restrictions": [],
    "evidenceIds": [
      "evidence:qwen-qwen3-1-7b-license"
    ]
  },
  "evidenceIds": [
    "evidence:qwen-qwen3-1-7b-card",
    "evidence:qwen-qwen3-1-7b-metadata",
    "evidence:qwen-qwen3-1-7b-parameters",
    "evidence:qwen-qwen3-1-7b-license",
    "evidence:qwen-qwen3-1-7b-context",
    "evidence:qwen-qwen3-1-7b-config",
    "evidence:four-tables-release-qwen3-launch",
    "evidence:v03-c1bd7018f0456ddde8",
    "evidence:v03-49f96d4bca8be6d031"
  ],
  "releasedOn": "2025-04-29",
  "parameterCounts": [
    {
      "scope": "total",
      "label": "شمار کل اعلام‌شده",
      "value": {
        "state": "known",
        "value": 1.7,
        "evidenceIds": [
          "evidence:qwen-qwen3-1-7b-parameters"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "stored",
      "label": "تعداد عناصر پارامتری نمایهٔ Safetensors",
      "value": {
        "state": "known",
        "value": 2.031739904,
        "evidenceIds": [
          "evidence:v03-f4af1bdd23931614a8"
        ],
        "unit": "billion-parameters",
        "note": "نمایهٔ فایل وزن؛ برای وزن کوانت‌شده یا اشتراک وزن، الزاماً شمار پارامتر مستقل نیست."
      },
      "approximate": false
    }
  ]
});
models.push({
  "id": "model:qwen-qwen3-14b",
  "familyId": "family:qwen",
  "exactName": "Qwen3-14B",
  "publisher": "Qwen / Alibaba Cloud",
  "version": "40c069824f4251a91eefaf281ebe4c544efd3e18",
  "aliases": [
    "Qwen/Qwen3-14B"
  ],
  "stage": "reasoning",
  "architecture": "dense",
  "totalParametersB": {
    "state": "known",
    "value": 14.8,
    "evidenceIds": [
      "evidence:qwen-qwen3-14b-parameters"
    ],
    "unit": "billion-parameters",
    "note": "اعداد پارامتر معرفی مدل، گرد‌شده‌اند؛ safetensors.total شمار عناصر ذخیره‌شده است و الزاماً پارامتر یکتا نیست."
  },
  "activeParametersB": {
    "state": "not-applicable"
  },
  "kind": "generative",
  "inputModalities": [
    "text"
  ],
  "outputModalities": [
    "text"
  ],
  "applications": [
    "text-work",
    "coding-assistant",
    "reasoning-analysis",
    "agents-tools",
    "enterprise-rag",
    "structured-extraction"
  ],
  "languages": [
    {
      "language": "multilingual",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-c1bd7018f0456ddde8"
        ]
      }
    },
    {
      "language": "en",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-c1bd7018f0456ddde8"
        ]
      }
    },
    {
      "language": "fa",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-c1bd7018f0456ddde8"
        ]
      }
    },
    {
      "language": "zh",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-c1bd7018f0456ddde8"
        ]
      }
    },
    {
      "language": "ar",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-c1bd7018f0456ddde8"
        ]
      }
    },
    {
      "language": "fr",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-c1bd7018f0456ddde8"
        ]
      }
    },
    {
      "language": "de",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-c1bd7018f0456ddde8"
        ]
      }
    },
    {
      "language": "es",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-c1bd7018f0456ddde8"
        ]
      }
    },
    {
      "language": "it",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-c1bd7018f0456ddde8"
        ]
      }
    },
    {
      "language": "pt",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-c1bd7018f0456ddde8"
        ]
      }
    },
    {
      "language": "ja",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-c1bd7018f0456ddde8"
        ]
      }
    },
    {
      "language": "ko",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-c1bd7018f0456ddde8"
        ]
      }
    },
    {
      "language": "hi",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-c1bd7018f0456ddde8"
        ]
      }
    },
    {
      "language": "ru",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-c1bd7018f0456ddde8"
        ]
      }
    }
  ],
  "persianEvidenceStatus": "publisher-claimed",
  "declaredContext": {
    "state": "known",
    "value": 32768,
    "evidenceIds": [
      "evidence:v03-02c6053d6bac907d15"
    ],
    "unit": "token",
    "note": "زمینهٔ بومی اعلام‌شده در کارت مدل؛ توسعهٔ YaRN برای نسخه‌های پشتیبانی‌شده جداست."
  },
  "evaluatedContext": {
    "state": "not-measured"
  },
  "releaseStatus": "available",
  "lastReviewedOn": "2026-09-15",
  "license": {
    "name": {
      "state": "known",
      "value": "Apache-2.0",
      "evidenceIds": [
        "evidence:qwen-qwen3-14b-license"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://huggingface.co/Qwen/Qwen3-14B/blob/main/LICENSE",
      "evidenceIds": [
        "evidence:qwen-qwen3-14b-license"
      ]
    },
    "commercialUse": {
      "state": "known",
      "value": "allowed",
      "evidenceIds": [
        "evidence:qwen-qwen3-14b-license"
      ]
    },
    "restrictions": [],
    "evidenceIds": [
      "evidence:qwen-qwen3-14b-license"
    ]
  },
  "evidenceIds": [
    "evidence:qwen-qwen3-14b-card",
    "evidence:qwen-qwen3-14b-metadata",
    "evidence:qwen-qwen3-14b-parameters",
    "evidence:qwen-qwen3-14b-license",
    "evidence:qwen-qwen3-14b-context",
    "evidence:qwen-qwen3-14b-config",
    "evidence:four-tables-release-qwen3-launch",
    "evidence:v03-c1bd7018f0456ddde8",
    "evidence:v03-02c6053d6bac907d15"
  ],
  "releasedOn": "2025-04-29",
  "parameterCounts": [
    {
      "scope": "total",
      "label": "شمار کل اعلام‌شده",
      "value": {
        "state": "known",
        "value": 14.8,
        "evidenceIds": [
          "evidence:qwen-qwen3-14b-parameters"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "stored",
      "label": "تعداد عناصر پارامتری نمایهٔ Safetensors",
      "value": {
        "state": "known",
        "value": 14.7683072,
        "evidenceIds": [
          "evidence:v03-b09711a16e1512597f"
        ],
        "unit": "billion-parameters",
        "note": "نمایهٔ فایل وزن؛ برای وزن کوانت‌شده یا اشتراک وزن، الزاماً شمار پارامتر مستقل نیست."
      },
      "approximate": false
    }
  ],
  "contextExtension": {
    "capacity": {
      "state": "known",
      "value": 131072,
      "evidenceIds": [
        "evidence:qwen-qwen3-14b-card"
      ],
      "unit": "token"
    },
    "condition": "تنظیم YaRN"
  }
});
models.push({
  "id": "model:qwen-qwen3-30b-a3b",
  "familyId": "family:qwen",
  "exactName": "Qwen3-30B-A3B",
  "publisher": "Qwen / Alibaba Cloud",
  "version": "ad44e777bcd18fa416d9da3bd8f70d33ebb85d39",
  "aliases": [
    "Qwen/Qwen3-30B-A3B"
  ],
  "stage": "reasoning",
  "architecture": "moe",
  "totalParametersB": {
    "state": "known",
    "value": 30.5,
    "evidenceIds": [
      "evidence:qwen-qwen3-30b-a3b-parameters"
    ],
    "unit": "billion-parameters",
    "note": "اعداد پارامتر معرفی مدل، گرد‌شده‌اند؛ safetensors.total شمار عناصر ذخیره‌شده است و الزاماً پارامتر یکتا نیست."
  },
  "activeParametersB": {
    "state": "known",
    "value": 3.3,
    "evidenceIds": [
      "evidence:qwen-qwen3-30b-a3b-parameters"
    ],
    "unit": "billion-parameters",
    "note": "شمار فعال اعلام‌شده برای هر توکن؛ معیار حافظهٔ کل وزن‌ها نیست."
  },
  "kind": "generative",
  "inputModalities": [
    "text"
  ],
  "outputModalities": [
    "text"
  ],
  "applications": [
    "text-work",
    "coding-assistant",
    "reasoning-analysis",
    "agents-tools",
    "enterprise-rag",
    "structured-extraction"
  ],
  "languages": [
    {
      "language": "multilingual",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-c1bd7018f0456ddde8"
        ]
      }
    },
    {
      "language": "en",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-c1bd7018f0456ddde8"
        ]
      }
    },
    {
      "language": "fa",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-c1bd7018f0456ddde8"
        ]
      }
    },
    {
      "language": "zh",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-c1bd7018f0456ddde8"
        ]
      }
    },
    {
      "language": "ar",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-c1bd7018f0456ddde8"
        ]
      }
    },
    {
      "language": "fr",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-c1bd7018f0456ddde8"
        ]
      }
    },
    {
      "language": "de",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-c1bd7018f0456ddde8"
        ]
      }
    },
    {
      "language": "es",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-c1bd7018f0456ddde8"
        ]
      }
    },
    {
      "language": "it",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-c1bd7018f0456ddde8"
        ]
      }
    },
    {
      "language": "pt",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-c1bd7018f0456ddde8"
        ]
      }
    },
    {
      "language": "ja",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-c1bd7018f0456ddde8"
        ]
      }
    },
    {
      "language": "ko",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-c1bd7018f0456ddde8"
        ]
      }
    },
    {
      "language": "hi",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-c1bd7018f0456ddde8"
        ]
      }
    },
    {
      "language": "ru",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-c1bd7018f0456ddde8"
        ]
      }
    }
  ],
  "persianEvidenceStatus": "publisher-claimed",
  "declaredContext": {
    "state": "known",
    "value": 32768,
    "evidenceIds": [
      "evidence:v03-3fbdfa840af9cf314f"
    ],
    "unit": "token",
    "note": "زمینهٔ بومی اعلام‌شده در کارت مدل؛ توسعهٔ YaRN برای نسخه‌های پشتیبانی‌شده جداست."
  },
  "evaluatedContext": {
    "state": "not-measured"
  },
  "releaseStatus": "available",
  "lastReviewedOn": "2026-09-15",
  "license": {
    "name": {
      "state": "known",
      "value": "Apache-2.0",
      "evidenceIds": [
        "evidence:qwen-qwen3-30b-a3b-license"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://huggingface.co/Qwen/Qwen3-30B-A3B/blob/main/LICENSE",
      "evidenceIds": [
        "evidence:qwen-qwen3-30b-a3b-license"
      ]
    },
    "commercialUse": {
      "state": "known",
      "value": "allowed",
      "evidenceIds": [
        "evidence:qwen-qwen3-30b-a3b-license"
      ]
    },
    "restrictions": [],
    "evidenceIds": [
      "evidence:qwen-qwen3-30b-a3b-license"
    ]
  },
  "evidenceIds": [
    "evidence:qwen-qwen3-30b-a3b-card",
    "evidence:qwen-qwen3-30b-a3b-metadata",
    "evidence:qwen-qwen3-30b-a3b-parameters",
    "evidence:qwen-qwen3-30b-a3b-license",
    "evidence:qwen-qwen3-30b-a3b-context",
    "evidence:qwen-qwen3-30b-a3b-config",
    "evidence:four-tables-release-qwen3-launch",
    "evidence:v03-c1bd7018f0456ddde8",
    "evidence:v03-3fbdfa840af9cf314f"
  ],
  "releasedOn": "2025-04-29",
  "parameterCounts": [
    {
      "scope": "total",
      "label": "شمار کل اعلام‌شده",
      "value": {
        "state": "known",
        "value": 30.5,
        "evidenceIds": [
          "evidence:qwen-qwen3-30b-a3b-parameters"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "stored",
      "label": "تعداد عناصر پارامتری نمایهٔ Safetensors",
      "value": {
        "state": "known",
        "value": 30.532122624,
        "evidenceIds": [
          "evidence:v03-07e08c793e53cc334e"
        ],
        "unit": "billion-parameters",
        "note": "نمایهٔ فایل وزن؛ برای وزن کوانت‌شده یا اشتراک وزن، الزاماً شمار پارامتر مستقل نیست."
      },
      "approximate": false
    }
  ],
  "contextExtension": {
    "capacity": {
      "state": "known",
      "value": 131072,
      "evidenceIds": [
        "evidence:qwen-qwen3-30b-a3b-card"
      ],
      "unit": "token"
    },
    "condition": "تنظیم YaRN"
  }
});
models.push({
  "id": "model:qwen-qwen3-32b",
  "familyId": "family:qwen",
  "exactName": "Qwen3-32B",
  "publisher": "Qwen / Alibaba Cloud",
  "version": "9216db5781bf21249d130ec9da846c4624c16137",
  "aliases": [
    "Qwen/Qwen3-32B"
  ],
  "stage": "reasoning",
  "architecture": "dense",
  "totalParametersB": {
    "state": "known",
    "value": 32.8,
    "evidenceIds": [
      "evidence:qwen-qwen3-32b-parameters"
    ],
    "unit": "billion-parameters",
    "note": "اعداد پارامتر معرفی مدل، گرد‌شده‌اند؛ safetensors.total شمار عناصر ذخیره‌شده است و الزاماً پارامتر یکتا نیست."
  },
  "activeParametersB": {
    "state": "not-applicable"
  },
  "kind": "generative",
  "inputModalities": [
    "text"
  ],
  "outputModalities": [
    "text"
  ],
  "applications": [
    "text-work",
    "coding-assistant",
    "reasoning-analysis",
    "agents-tools",
    "enterprise-rag",
    "structured-extraction"
  ],
  "languages": [
    {
      "language": "multilingual",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-c1bd7018f0456ddde8"
        ]
      }
    },
    {
      "language": "en",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-c1bd7018f0456ddde8"
        ]
      }
    },
    {
      "language": "fa",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-c1bd7018f0456ddde8"
        ]
      }
    },
    {
      "language": "zh",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-c1bd7018f0456ddde8"
        ]
      }
    },
    {
      "language": "ar",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-c1bd7018f0456ddde8"
        ]
      }
    },
    {
      "language": "fr",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-c1bd7018f0456ddde8"
        ]
      }
    },
    {
      "language": "de",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-c1bd7018f0456ddde8"
        ]
      }
    },
    {
      "language": "es",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-c1bd7018f0456ddde8"
        ]
      }
    },
    {
      "language": "it",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-c1bd7018f0456ddde8"
        ]
      }
    },
    {
      "language": "pt",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-c1bd7018f0456ddde8"
        ]
      }
    },
    {
      "language": "ja",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-c1bd7018f0456ddde8"
        ]
      }
    },
    {
      "language": "ko",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-c1bd7018f0456ddde8"
        ]
      }
    },
    {
      "language": "hi",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-c1bd7018f0456ddde8"
        ]
      }
    },
    {
      "language": "ru",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-c1bd7018f0456ddde8"
        ]
      }
    }
  ],
  "persianEvidenceStatus": "publisher-claimed",
  "declaredContext": {
    "state": "known",
    "value": 32768,
    "evidenceIds": [
      "evidence:v03-eee862b4eceaa376da"
    ],
    "unit": "token",
    "note": "زمینهٔ بومی اعلام‌شده در کارت مدل؛ توسعهٔ YaRN برای نسخه‌های پشتیبانی‌شده جداست."
  },
  "evaluatedContext": {
    "state": "not-measured"
  },
  "releaseStatus": "available",
  "lastReviewedOn": "2026-09-15",
  "license": {
    "name": {
      "state": "known",
      "value": "Apache-2.0",
      "evidenceIds": [
        "evidence:qwen-qwen3-32b-license"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://huggingface.co/Qwen/Qwen3-32B/blob/main/LICENSE",
      "evidenceIds": [
        "evidence:qwen-qwen3-32b-license"
      ]
    },
    "commercialUse": {
      "state": "known",
      "value": "allowed",
      "evidenceIds": [
        "evidence:qwen-qwen3-32b-license"
      ]
    },
    "restrictions": [],
    "evidenceIds": [
      "evidence:qwen-qwen3-32b-license"
    ]
  },
  "evidenceIds": [
    "evidence:qwen-qwen3-32b-card",
    "evidence:qwen-qwen3-32b-metadata",
    "evidence:qwen-qwen3-32b-parameters",
    "evidence:qwen-qwen3-32b-license",
    "evidence:qwen-qwen3-32b-context",
    "evidence:qwen-qwen3-32b-config",
    "evidence:four-tables-release-qwen3-launch",
    "evidence:v03-c1bd7018f0456ddde8",
    "evidence:v03-eee862b4eceaa376da"
  ],
  "releasedOn": "2025-04-29",
  "parameterCounts": [
    {
      "scope": "total",
      "label": "شمار کل اعلام‌شده",
      "value": {
        "state": "known",
        "value": 32.8,
        "evidenceIds": [
          "evidence:qwen-qwen3-32b-parameters"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "stored",
      "label": "تعداد عناصر پارامتری نمایهٔ Safetensors",
      "value": {
        "state": "known",
        "value": 32.762123264,
        "evidenceIds": [
          "evidence:v03-b053ad2e41f49215c0"
        ],
        "unit": "billion-parameters",
        "note": "نمایهٔ فایل وزن؛ برای وزن کوانت‌شده یا اشتراک وزن، الزاماً شمار پارامتر مستقل نیست."
      },
      "approximate": false
    }
  ],
  "contextExtension": {
    "capacity": {
      "state": "known",
      "value": 131072,
      "evidenceIds": [
        "evidence:qwen-qwen3-32b-card"
      ],
      "unit": "token"
    },
    "condition": "تنظیم YaRN"
  }
});
models.push({
  "id": "model:qwen-qwen3-4b",
  "familyId": "family:qwen",
  "exactName": "Qwen3-4B",
  "publisher": "Qwen / Alibaba Cloud",
  "version": "1cfa9a7208912126459214e8b04321603b3df60c",
  "aliases": [
    "Qwen/Qwen3-4B"
  ],
  "stage": "reasoning",
  "architecture": "dense",
  "totalParametersB": {
    "state": "known",
    "value": 4,
    "evidenceIds": [
      "evidence:qwen-qwen3-4b-parameters"
    ],
    "unit": "billion-parameters",
    "note": "اعداد پارامتر معرفی مدل، گرد‌شده‌اند؛ safetensors.total شمار عناصر ذخیره‌شده است و الزاماً پارامتر یکتا نیست."
  },
  "activeParametersB": {
    "state": "not-applicable"
  },
  "kind": "generative",
  "inputModalities": [
    "text"
  ],
  "outputModalities": [
    "text"
  ],
  "applications": [
    "text-work",
    "coding-assistant",
    "reasoning-analysis",
    "agents-tools",
    "enterprise-rag",
    "structured-extraction"
  ],
  "languages": [
    {
      "language": "multilingual",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-c1bd7018f0456ddde8"
        ]
      }
    },
    {
      "language": "en",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-c1bd7018f0456ddde8"
        ]
      }
    },
    {
      "language": "fa",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-c1bd7018f0456ddde8"
        ]
      }
    },
    {
      "language": "zh",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-c1bd7018f0456ddde8"
        ]
      }
    },
    {
      "language": "ar",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-c1bd7018f0456ddde8"
        ]
      }
    },
    {
      "language": "fr",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-c1bd7018f0456ddde8"
        ]
      }
    },
    {
      "language": "de",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-c1bd7018f0456ddde8"
        ]
      }
    },
    {
      "language": "es",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-c1bd7018f0456ddde8"
        ]
      }
    },
    {
      "language": "it",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-c1bd7018f0456ddde8"
        ]
      }
    },
    {
      "language": "pt",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-c1bd7018f0456ddde8"
        ]
      }
    },
    {
      "language": "ja",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-c1bd7018f0456ddde8"
        ]
      }
    },
    {
      "language": "ko",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-c1bd7018f0456ddde8"
        ]
      }
    },
    {
      "language": "hi",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-c1bd7018f0456ddde8"
        ]
      }
    },
    {
      "language": "ru",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-c1bd7018f0456ddde8"
        ]
      }
    }
  ],
  "persianEvidenceStatus": "publisher-claimed",
  "declaredContext": {
    "state": "known",
    "value": 32768,
    "evidenceIds": [
      "evidence:v03-5438c7e36f3bb1bdd2"
    ],
    "unit": "token",
    "note": "زمینهٔ بومی اعلام‌شده در کارت مدل؛ توسعهٔ YaRN برای نسخه‌های پشتیبانی‌شده جداست."
  },
  "evaluatedContext": {
    "state": "not-measured"
  },
  "releaseStatus": "available",
  "lastReviewedOn": "2026-09-15",
  "license": {
    "name": {
      "state": "known",
      "value": "Apache-2.0",
      "evidenceIds": [
        "evidence:qwen-qwen3-4b-license"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://huggingface.co/Qwen/Qwen3-4B/blob/main/LICENSE",
      "evidenceIds": [
        "evidence:qwen-qwen3-4b-license"
      ]
    },
    "commercialUse": {
      "state": "known",
      "value": "allowed",
      "evidenceIds": [
        "evidence:qwen-qwen3-4b-license"
      ]
    },
    "restrictions": [],
    "evidenceIds": [
      "evidence:qwen-qwen3-4b-license"
    ]
  },
  "evidenceIds": [
    "evidence:qwen-qwen3-4b-card",
    "evidence:qwen-qwen3-4b-metadata",
    "evidence:qwen-qwen3-4b-parameters",
    "evidence:qwen-qwen3-4b-license",
    "evidence:qwen-qwen3-4b-context",
    "evidence:qwen-qwen3-4b-config",
    "evidence:four-tables-release-qwen3-launch",
    "evidence:v03-c1bd7018f0456ddde8",
    "evidence:v03-5438c7e36f3bb1bdd2"
  ],
  "releasedOn": "2025-04-29",
  "parameterCounts": [
    {
      "scope": "total",
      "label": "شمار کل اعلام‌شده",
      "value": {
        "state": "known",
        "value": 4,
        "evidenceIds": [
          "evidence:qwen-qwen3-4b-parameters"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "stored",
      "label": "تعداد عناصر پارامتری نمایهٔ Safetensors",
      "value": {
        "state": "known",
        "value": 4.022468096,
        "evidenceIds": [
          "evidence:v03-2b0f967a1c3c10cc9f"
        ],
        "unit": "billion-parameters",
        "note": "نمایهٔ فایل وزن؛ برای وزن کوانت‌شده یا اشتراک وزن، الزاماً شمار پارامتر مستقل نیست."
      },
      "approximate": false
    }
  ],
  "contextExtension": {
    "capacity": {
      "state": "known",
      "value": 131072,
      "evidenceIds": [
        "evidence:qwen-qwen3-4b-card"
      ],
      "unit": "token"
    },
    "condition": "تنظیم YaRN"
  }
});
models.push({
  "id": "model:qwen-qwen3-8b",
  "familyId": "family:qwen",
  "exactName": "Qwen3-8B",
  "publisher": "Qwen / Alibaba Cloud",
  "version": "b968826d9c46dd6066d109eabc6255188de91218",
  "aliases": [
    "Qwen/Qwen3-8B"
  ],
  "stage": "reasoning",
  "architecture": "dense",
  "totalParametersB": {
    "state": "known",
    "value": 8.2,
    "evidenceIds": [
      "evidence:qwen-qwen3-8b-parameters"
    ],
    "unit": "billion-parameters",
    "note": "اعداد پارامتر معرفی مدل، گرد‌شده‌اند؛ safetensors.total شمار عناصر ذخیره‌شده است و الزاماً پارامتر یکتا نیست."
  },
  "activeParametersB": {
    "state": "not-applicable"
  },
  "kind": "generative",
  "inputModalities": [
    "text"
  ],
  "outputModalities": [
    "text"
  ],
  "applications": [
    "text-work",
    "coding-assistant",
    "reasoning-analysis",
    "agents-tools",
    "enterprise-rag",
    "structured-extraction"
  ],
  "languages": [
    {
      "language": "multilingual",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-c1bd7018f0456ddde8"
        ]
      }
    },
    {
      "language": "en",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-c1bd7018f0456ddde8"
        ]
      }
    },
    {
      "language": "fa",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-c1bd7018f0456ddde8"
        ]
      }
    },
    {
      "language": "zh",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-c1bd7018f0456ddde8"
        ]
      }
    },
    {
      "language": "ar",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-c1bd7018f0456ddde8"
        ]
      }
    },
    {
      "language": "fr",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-c1bd7018f0456ddde8"
        ]
      }
    },
    {
      "language": "de",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-c1bd7018f0456ddde8"
        ]
      }
    },
    {
      "language": "es",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-c1bd7018f0456ddde8"
        ]
      }
    },
    {
      "language": "it",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-c1bd7018f0456ddde8"
        ]
      }
    },
    {
      "language": "pt",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-c1bd7018f0456ddde8"
        ]
      }
    },
    {
      "language": "ja",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-c1bd7018f0456ddde8"
        ]
      }
    },
    {
      "language": "ko",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-c1bd7018f0456ddde8"
        ]
      }
    },
    {
      "language": "hi",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-c1bd7018f0456ddde8"
        ]
      }
    },
    {
      "language": "ru",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-c1bd7018f0456ddde8"
        ]
      }
    }
  ],
  "persianEvidenceStatus": "publisher-claimed",
  "declaredContext": {
    "state": "known",
    "value": 32768,
    "evidenceIds": [
      "evidence:v03-83f599b0dc739c8491"
    ],
    "unit": "token",
    "note": "زمینهٔ بومی اعلام‌شده در کارت مدل؛ توسعهٔ YaRN برای نسخه‌های پشتیبانی‌شده جداست."
  },
  "evaluatedContext": {
    "state": "not-measured"
  },
  "releaseStatus": "available",
  "lastReviewedOn": "2026-09-15",
  "license": {
    "name": {
      "state": "known",
      "value": "Apache-2.0",
      "evidenceIds": [
        "evidence:qwen-qwen3-8b-license"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://huggingface.co/Qwen/Qwen3-8B/blob/main/LICENSE",
      "evidenceIds": [
        "evidence:qwen-qwen3-8b-license"
      ]
    },
    "commercialUse": {
      "state": "known",
      "value": "allowed",
      "evidenceIds": [
        "evidence:qwen-qwen3-8b-license"
      ]
    },
    "restrictions": [],
    "evidenceIds": [
      "evidence:qwen-qwen3-8b-license"
    ]
  },
  "evidenceIds": [
    "evidence:qwen-qwen3-8b-card",
    "evidence:qwen-qwen3-8b-metadata",
    "evidence:qwen-qwen3-8b-parameters",
    "evidence:qwen-qwen3-8b-license",
    "evidence:qwen-qwen3-8b-context",
    "evidence:qwen-qwen3-8b-config",
    "evidence:four-tables-release-qwen3-launch",
    "evidence:v03-c1bd7018f0456ddde8",
    "evidence:v03-83f599b0dc739c8491"
  ],
  "releasedOn": "2025-04-29",
  "parameterCounts": [
    {
      "scope": "total",
      "label": "شمار کل اعلام‌شده",
      "value": {
        "state": "known",
        "value": 8.2,
        "evidenceIds": [
          "evidence:qwen-qwen3-8b-parameters"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "stored",
      "label": "تعداد عناصر پارامتری نمایهٔ Safetensors",
      "value": {
        "state": "known",
        "value": 8.19073536,
        "evidenceIds": [
          "evidence:v03-67d48db1f25765c0ea"
        ],
        "unit": "billion-parameters",
        "note": "نمایهٔ فایل وزن؛ برای وزن کوانت‌شده یا اشتراک وزن، الزاماً شمار پارامتر مستقل نیست."
      },
      "approximate": false
    }
  ],
  "contextExtension": {
    "capacity": {
      "state": "known",
      "value": 131072,
      "evidenceIds": [
        "evidence:qwen-qwen3-8b-card"
      ],
      "unit": "token"
    },
    "condition": "تنظیم YaRN"
  }
});
models.push({
  "id": "model:qwen-qwen3-coder-30b-a3b-instruct",
  "familyId": "family:qwen",
  "exactName": "Qwen3-Coder-30B-A3B-Instruct",
  "publisher": "Qwen / Alibaba Cloud",
  "version": "b2cff646eb4bb1d68355c01b18ae02e7cf42d120",
  "aliases": [
    "Qwen/Qwen3-Coder-30B-A3B-Instruct"
  ],
  "stage": "instruct",
  "architecture": "moe",
  "totalParametersB": {
    "state": "known",
    "value": 30.5,
    "evidenceIds": [
      "evidence:qwen-qwen3-coder-30b-a3b-instruct-parameters"
    ],
    "unit": "billion-parameters",
    "note": "اعداد پارامتر معرفی مدل، گرد‌شده‌اند؛ safetensors.total شمار عناصر ذخیره‌شده است و الزاماً پارامتر یکتا نیست."
  },
  "activeParametersB": {
    "state": "known",
    "value": 3.3,
    "evidenceIds": [
      "evidence:qwen-qwen3-coder-30b-a3b-instruct-parameters"
    ],
    "unit": "billion-parameters",
    "note": "شمار فعال اعلام‌شده برای هر توکن؛ معیار حافظهٔ کل وزن‌ها نیست."
  },
  "kind": "generative",
  "inputModalities": [
    "text"
  ],
  "outputModalities": [
    "text"
  ],
  "applications": [
    "coding-assistant",
    "agents-tools",
    "text-work",
    "enterprise-rag",
    "structured-extraction",
    "reasoning-analysis"
  ],
  "languages": [],
  "persianEvidenceStatus": "not-evaluated",
  "declaredContext": {
    "state": "known",
    "value": 262144,
    "evidenceIds": [
      "evidence:qwen-qwen3-coder-30b-a3b-instruct-context"
    ],
    "unit": "token",
    "note": "ظرفیت اعلام‌شدهٔ ناشر؛ ارزیابی کیفیت بلندمتن در این بسته ثبت نشده است."
  },
  "evaluatedContext": {
    "state": "not-measured"
  },
  "releaseStatus": "available",
  "lastReviewedOn": "2026-09-15",
  "license": {
    "name": {
      "state": "known",
      "value": "Apache-2.0",
      "evidenceIds": [
        "evidence:qwen-qwen3-coder-30b-a3b-instruct-license"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://huggingface.co/Qwen/Qwen3-Coder-30B-A3B-Instruct/blob/main/LICENSE",
      "evidenceIds": [
        "evidence:qwen-qwen3-coder-30b-a3b-instruct-license"
      ]
    },
    "commercialUse": {
      "state": "known",
      "value": "allowed",
      "evidenceIds": [
        "evidence:qwen-qwen3-coder-30b-a3b-instruct-license"
      ]
    },
    "restrictions": [],
    "evidenceIds": [
      "evidence:qwen-qwen3-coder-30b-a3b-instruct-license"
    ]
  },
  "evidenceIds": [
    "evidence:qwen-qwen3-coder-30b-a3b-instruct-card",
    "evidence:qwen-qwen3-coder-30b-a3b-instruct-metadata",
    "evidence:qwen-qwen3-coder-30b-a3b-instruct-parameters",
    "evidence:qwen-qwen3-coder-30b-a3b-instruct-license",
    "evidence:qwen-qwen3-coder-30b-a3b-instruct-context",
    "evidence:qwen-qwen3-coder-30b-a3b-instruct-config",
    "evidence:v03-504a98b0928e421cf9"
  ],
  "parameterCounts": [
    {
      "scope": "total",
      "label": "شمار کل اعلام‌شده",
      "value": {
        "state": "known",
        "value": 30.5,
        "evidenceIds": [
          "evidence:qwen-qwen3-coder-30b-a3b-instruct-parameters"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "stored",
      "label": "تعداد عناصر پارامتری نمایهٔ Safetensors",
      "value": {
        "state": "known",
        "value": 30.532122624,
        "evidenceIds": [
          "evidence:v03-e598f90a8959674b74"
        ],
        "unit": "billion-parameters",
        "note": "نمایهٔ فایل وزن؛ برای وزن کوانت‌شده یا اشتراک وزن، الزاماً شمار پارامتر مستقل نیست."
      },
      "approximate": false
    }
  ],
  "contextExtension": {
    "capacity": {
      "state": "known",
      "value": 1048576,
      "evidenceIds": [
        "evidence:qwen-qwen3-coder-30b-a3b-instruct-card"
      ],
      "unit": "token"
    },
    "condition": "تنظیم YaRN"
  }
});
models.push({
  "id": "model:qwen-qwen3-embedding-0-6b",
  "familyId": "family:qwen",
  "exactName": "Qwen3-Embedding-0.6B",
  "publisher": "Qwen / Alibaba Cloud",
  "version": "97b0c614be4d77ee51c0cef4e5f07c00f9eb65b3",
  "aliases": [
    "Qwen/Qwen3-Embedding-0.6B"
  ],
  "stage": "other",
  "architecture": "dense",
  "totalParametersB": {
    "state": "known",
    "value": 0.6,
    "evidenceIds": [
      "evidence:qwen-qwen3-embedding-0-6b-parameters"
    ],
    "unit": "billion-parameters",
    "note": "اعداد پارامتر معرفی مدل، گرد‌شده‌اند؛ safetensors.total شمار عناصر ذخیره‌شده است و الزاماً پارامتر یکتا نیست."
  },
  "activeParametersB": {
    "state": "not-applicable"
  },
  "kind": "embedding",
  "inputModalities": [
    "text"
  ],
  "outputModalities": [
    "embedding"
  ],
  "applications": [
    "enterprise-rag"
  ],
  "languages": [
    {
      "language": "multilingual",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-9c2800b7ad736cfb03"
        ]
      }
    }
  ],
  "persianEvidenceStatus": "not-evaluated",
  "declaredContext": {
    "state": "known",
    "value": 32768,
    "evidenceIds": [
      "evidence:qwen-qwen3-embedding-0-6b-context"
    ],
    "unit": "token",
    "note": "ظرفیت اعلام‌شدهٔ ناشر؛ ارزیابی کیفیت بلندمتن در این بسته ثبت نشده است. مقدار native یا جدول مشخصات استفاده شده؛ config ممکن است 40960 باشد."
  },
  "evaluatedContext": {
    "state": "not-measured"
  },
  "releaseStatus": "available",
  "lastReviewedOn": "2026-09-15",
  "license": {
    "name": {
      "state": "known",
      "value": "Apache-2.0",
      "evidenceIds": [
        "evidence:qwen-qwen3-embedding-0-6b-license"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://huggingface.co/Qwen/Qwen3-Embedding-0.6B/blob/97b0c614be4d77ee51c0cef4e5f07c00f9eb65b3/README.md",
      "evidenceIds": [
        "evidence:qwen-qwen3-embedding-0-6b-license"
      ]
    },
    "commercialUse": {
      "state": "known",
      "value": "allowed",
      "evidenceIds": [
        "evidence:qwen-qwen3-embedding-0-6b-license"
      ]
    },
    "restrictions": [],
    "evidenceIds": [
      "evidence:qwen-qwen3-embedding-0-6b-license"
    ]
  },
  "evidenceIds": [
    "evidence:qwen-qwen3-embedding-0-6b-card",
    "evidence:qwen-qwen3-embedding-0-6b-metadata",
    "evidence:qwen-qwen3-embedding-0-6b-parameters",
    "evidence:qwen-qwen3-embedding-0-6b-license",
    "evidence:qwen-qwen3-embedding-0-6b-context",
    "evidence:qwen-qwen3-embedding-0-6b-config",
    "evidence:four-tables-release-qwen3-embedding-launch",
    "evidence:v03-9c2800b7ad736cfb03"
  ],
  "releasedOn": "2025-06-05",
  "parameterCounts": [
    {
      "scope": "total",
      "label": "شمار کل اعلام‌شده",
      "value": {
        "state": "known",
        "value": 0.6,
        "evidenceIds": [
          "evidence:qwen-qwen3-embedding-0-6b-parameters"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "stored",
      "label": "تعداد عناصر پارامتری نمایهٔ Safetensors",
      "value": {
        "state": "known",
        "value": 0.595776512,
        "evidenceIds": [
          "evidence:v03-988cbb1f7406a866c0"
        ],
        "unit": "billion-parameters",
        "note": "نمایهٔ فایل وزن؛ برای وزن کوانت‌شده یا اشتراک وزن، الزاماً شمار پارامتر مستقل نیست."
      },
      "approximate": false
    }
  ],
  "specializedSpecs": {
    "task": {
      "state": "known",
      "value": "بازیابی معنایی و ساخت بردار متن",
      "evidenceIds": [
        "evidence:qwen-qwen3-embedding-0-6b-card"
      ]
    },
    "output": {
      "state": "known",
      "value": "بردار متراکم؛ ۱۰۲۴ بُعد پیش‌فرض / حداکثر",
      "evidenceIds": [
        "evidence:qwen-qwen3-embedding-0-6b-card"
      ]
    },
    "embeddingDimensions": {
      "state": "known",
      "value": 1024,
      "evidenceIds": [
        "evidence:qwen-qwen3-embedding-0-6b-card"
      ]
    },
    "adjustableDimensions": {
      "state": "known",
      "value": "۳۲ تا ۱۰۲۴ بُعد با MRL؛ حافظهٔ ایندکس بر اساس بُعد انتخاب‌شده محاسبه شود.",
      "evidenceIds": [
        "evidence:qwen-qwen3-embedding-0-6b-card"
      ]
    },
    "poolingOrScoring": {
      "state": "known",
      "value": "last-token pooling، نرمال‌سازی L2 و شباهت کسینوسی؛ دستور وظیفه روی query، بدون دستور روی document.",
      "evidenceIds": [
        "evidence:qwen-qwen3-embedding-0-6b-card"
      ]
    },
    "features": {
      "state": "known",
      "value": "ابعاد قابل تنظیم؛ دستورپذیر؛ بازیابی متن و کد",
      "evidenceIds": [
        "evidence:qwen-qwen3-embedding-0-6b-card"
      ]
    },
    "languages": {
      "state": "known",
      "value": "بیش از ۱۰۰ زبان طبق ناشر؛ کیفیت فارسی از این عدد استنتاج نمی‌شود.",
      "evidenceIds": [
        "evidence:qwen-qwen3-embedding-0-6b-card"
      ]
    }
  }
});
models.push({
  "id": "model:qwen-qwen3-embedding-4b",
  "familyId": "family:qwen",
  "exactName": "Qwen3-Embedding-4B",
  "publisher": "Qwen / Alibaba Cloud",
  "version": "5cf2132abc99cad020ac570b19d031efec650f2b",
  "aliases": [
    "Qwen/Qwen3-Embedding-4B"
  ],
  "stage": "other",
  "architecture": "dense",
  "totalParametersB": {
    "state": "known",
    "value": 4,
    "evidenceIds": [
      "evidence:qwen-qwen3-embedding-4b-parameters"
    ],
    "unit": "billion-parameters",
    "note": "اعداد پارامتر معرفی مدل، گرد‌شده‌اند؛ safetensors.total شمار عناصر ذخیره‌شده است و الزاماً پارامتر یکتا نیست."
  },
  "activeParametersB": {
    "state": "not-applicable"
  },
  "kind": "embedding",
  "inputModalities": [
    "text"
  ],
  "outputModalities": [
    "embedding"
  ],
  "applications": [
    "enterprise-rag"
  ],
  "languages": [
    {
      "language": "multilingual",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-4fef68d668f81bf206"
        ]
      }
    }
  ],
  "persianEvidenceStatus": "not-evaluated",
  "declaredContext": {
    "state": "known",
    "value": 32768,
    "evidenceIds": [
      "evidence:qwen-qwen3-embedding-4b-context"
    ],
    "unit": "token",
    "note": "ظرفیت اعلام‌شدهٔ ناشر؛ ارزیابی کیفیت بلندمتن در این بسته ثبت نشده است. مقدار native یا جدول مشخصات استفاده شده؛ config ممکن است 40960 باشد."
  },
  "evaluatedContext": {
    "state": "not-measured"
  },
  "releaseStatus": "available",
  "lastReviewedOn": "2026-09-15",
  "license": {
    "name": {
      "state": "known",
      "value": "Apache-2.0",
      "evidenceIds": [
        "evidence:qwen-qwen3-embedding-4b-license"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://huggingface.co/Qwen/Qwen3-Embedding-4B/blob/5cf2132abc99cad020ac570b19d031efec650f2b/README.md",
      "evidenceIds": [
        "evidence:qwen-qwen3-embedding-4b-license"
      ]
    },
    "commercialUse": {
      "state": "known",
      "value": "allowed",
      "evidenceIds": [
        "evidence:qwen-qwen3-embedding-4b-license"
      ]
    },
    "restrictions": [],
    "evidenceIds": [
      "evidence:qwen-qwen3-embedding-4b-license"
    ]
  },
  "evidenceIds": [
    "evidence:qwen-qwen3-embedding-4b-card",
    "evidence:qwen-qwen3-embedding-4b-metadata",
    "evidence:qwen-qwen3-embedding-4b-parameters",
    "evidence:qwen-qwen3-embedding-4b-license",
    "evidence:qwen-qwen3-embedding-4b-context",
    "evidence:qwen-qwen3-embedding-4b-config",
    "evidence:four-tables-release-qwen3-embedding-launch",
    "evidence:v03-4fef68d668f81bf206"
  ],
  "releasedOn": "2025-06-05",
  "parameterCounts": [
    {
      "scope": "total",
      "label": "شمار کل اعلام‌شده",
      "value": {
        "state": "known",
        "value": 4,
        "evidenceIds": [
          "evidence:qwen-qwen3-embedding-4b-parameters"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "stored",
      "label": "تعداد عناصر پارامتری نمایهٔ Safetensors",
      "value": {
        "state": "known",
        "value": 4.021774336,
        "evidenceIds": [
          "evidence:v03-321667e8b3fb819a52"
        ],
        "unit": "billion-parameters",
        "note": "نمایهٔ فایل وزن؛ برای وزن کوانت‌شده یا اشتراک وزن، الزاماً شمار پارامتر مستقل نیست."
      },
      "approximate": false
    }
  ],
  "specializedSpecs": {
    "task": {
      "state": "known",
      "value": "بازیابی معنایی و ساخت بردار متن",
      "evidenceIds": [
        "evidence:qwen-qwen3-embedding-4b-card"
      ]
    },
    "output": {
      "state": "known",
      "value": "بردار متراکم؛ ۲۵۶۰ بُعد پیش‌فرض / حداکثر",
      "evidenceIds": [
        "evidence:qwen-qwen3-embedding-4b-card"
      ]
    },
    "embeddingDimensions": {
      "state": "known",
      "value": 2560,
      "evidenceIds": [
        "evidence:qwen-qwen3-embedding-4b-card"
      ]
    },
    "adjustableDimensions": {
      "state": "known",
      "value": "۳۲ تا ۲۵۶۰ بُعد با MRL؛ حافظهٔ ایندکس بر اساس بُعد انتخاب‌شده محاسبه شود.",
      "evidenceIds": [
        "evidence:qwen-qwen3-embedding-4b-card"
      ]
    },
    "poolingOrScoring": {
      "state": "known",
      "value": "last-token pooling، نرمال‌سازی L2 و شباهت کسینوسی؛ دستور وظیفه روی query، بدون دستور روی document.",
      "evidenceIds": [
        "evidence:qwen-qwen3-embedding-4b-card"
      ]
    },
    "features": {
      "state": "known",
      "value": "ابعاد قابل تنظیم؛ دستورپذیر؛ بازیابی متن و کد",
      "evidenceIds": [
        "evidence:qwen-qwen3-embedding-4b-card"
      ]
    },
    "languages": {
      "state": "known",
      "value": "بیش از ۱۰۰ زبان طبق ناشر؛ کیفیت فارسی از این عدد استنتاج نمی‌شود.",
      "evidenceIds": [
        "evidence:qwen-qwen3-embedding-4b-card"
      ]
    }
  }
});
models.push({
  "id": "model:qwen-qwen3-embedding-8b",
  "familyId": "family:qwen",
  "exactName": "Qwen3-Embedding-8B",
  "publisher": "Qwen / Alibaba Cloud",
  "version": "1d8ad4ca9b3dd8059ad90a75d4983776a23d44af",
  "aliases": [
    "Qwen/Qwen3-Embedding-8B"
  ],
  "stage": "other",
  "architecture": "dense",
  "totalParametersB": {
    "state": "known",
    "value": 8,
    "evidenceIds": [
      "evidence:qwen-qwen3-embedding-8b-parameters"
    ],
    "unit": "billion-parameters",
    "note": "اعداد پارامتر معرفی مدل، گرد‌شده‌اند؛ safetensors.total شمار عناصر ذخیره‌شده است و الزاماً پارامتر یکتا نیست."
  },
  "activeParametersB": {
    "state": "not-applicable"
  },
  "kind": "embedding",
  "inputModalities": [
    "text"
  ],
  "outputModalities": [
    "embedding"
  ],
  "applications": [
    "enterprise-rag"
  ],
  "languages": [
    {
      "language": "multilingual",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-756c11eab5cc54fff1"
        ]
      }
    }
  ],
  "persianEvidenceStatus": "not-evaluated",
  "declaredContext": {
    "state": "known",
    "value": 32768,
    "evidenceIds": [
      "evidence:qwen-qwen3-embedding-8b-context"
    ],
    "unit": "token",
    "note": "ظرفیت اعلام‌شدهٔ ناشر؛ ارزیابی کیفیت بلندمتن در این بسته ثبت نشده است. مقدار native یا جدول مشخصات استفاده شده؛ config ممکن است 40960 باشد."
  },
  "evaluatedContext": {
    "state": "not-measured"
  },
  "releaseStatus": "available",
  "lastReviewedOn": "2026-09-15",
  "license": {
    "name": {
      "state": "known",
      "value": "Apache-2.0",
      "evidenceIds": [
        "evidence:qwen-qwen3-embedding-8b-license"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://huggingface.co/Qwen/Qwen3-Embedding-8B/blob/1d8ad4ca9b3dd8059ad90a75d4983776a23d44af/README.md",
      "evidenceIds": [
        "evidence:qwen-qwen3-embedding-8b-license"
      ]
    },
    "commercialUse": {
      "state": "known",
      "value": "allowed",
      "evidenceIds": [
        "evidence:qwen-qwen3-embedding-8b-license"
      ]
    },
    "restrictions": [],
    "evidenceIds": [
      "evidence:qwen-qwen3-embedding-8b-license"
    ]
  },
  "evidenceIds": [
    "evidence:qwen-qwen3-embedding-8b-card",
    "evidence:qwen-qwen3-embedding-8b-metadata",
    "evidence:qwen-qwen3-embedding-8b-parameters",
    "evidence:qwen-qwen3-embedding-8b-license",
    "evidence:qwen-qwen3-embedding-8b-context",
    "evidence:qwen-qwen3-embedding-8b-config",
    "evidence:four-tables-release-qwen3-embedding-launch",
    "evidence:v03-756c11eab5cc54fff1"
  ],
  "releasedOn": "2025-06-05",
  "parameterCounts": [
    {
      "scope": "total",
      "label": "شمار کل اعلام‌شده",
      "value": {
        "state": "known",
        "value": 8,
        "evidenceIds": [
          "evidence:qwen-qwen3-embedding-8b-parameters"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "stored",
      "label": "تعداد عناصر پارامتری نمایهٔ Safetensors",
      "value": {
        "state": "known",
        "value": 7.567295488,
        "evidenceIds": [
          "evidence:v03-08fd4729fddda6c191"
        ],
        "unit": "billion-parameters",
        "note": "نمایهٔ فایل وزن؛ برای وزن کوانت‌شده یا اشتراک وزن، الزاماً شمار پارامتر مستقل نیست."
      },
      "approximate": false
    }
  ],
  "specializedSpecs": {
    "task": {
      "state": "known",
      "value": "بازیابی معنایی و ساخت بردار متن",
      "evidenceIds": [
        "evidence:qwen-qwen3-embedding-8b-card"
      ]
    },
    "output": {
      "state": "known",
      "value": "بردار متراکم؛ ۴۰۹۶ بُعد پیش‌فرض / حداکثر",
      "evidenceIds": [
        "evidence:qwen-qwen3-embedding-8b-card"
      ]
    },
    "embeddingDimensions": {
      "state": "known",
      "value": 4096,
      "evidenceIds": [
        "evidence:qwen-qwen3-embedding-8b-card"
      ]
    },
    "adjustableDimensions": {
      "state": "known",
      "value": "۳۲ تا ۴۰۹۶ بُعد با MRL؛ حافظهٔ ایندکس بر اساس بُعد انتخاب‌شده محاسبه شود.",
      "evidenceIds": [
        "evidence:qwen-qwen3-embedding-8b-card"
      ]
    },
    "poolingOrScoring": {
      "state": "known",
      "value": "last-token pooling، نرمال‌سازی L2 و شباهت کسینوسی؛ دستور وظیفه روی query، بدون دستور روی document.",
      "evidenceIds": [
        "evidence:qwen-qwen3-embedding-8b-card"
      ]
    },
    "features": {
      "state": "known",
      "value": "ابعاد قابل تنظیم؛ دستورپذیر؛ بازیابی متن و کد",
      "evidenceIds": [
        "evidence:qwen-qwen3-embedding-8b-card"
      ]
    },
    "languages": {
      "state": "known",
      "value": "بیش از ۱۰۰ زبان طبق ناشر؛ کیفیت فارسی از این عدد استنتاج نمی‌شود.",
      "evidenceIds": [
        "evidence:qwen-qwen3-embedding-8b-card"
      ]
    }
  }
});
models.push({
  "id": "model:qwen-qwen3-reranker-0-6b",
  "familyId": "family:qwen",
  "exactName": "Qwen3-Reranker-0.6B",
  "publisher": "Qwen / Alibaba Cloud",
  "version": "e61197ed45024b0ed8a2d74b80b4d909f1255473",
  "aliases": [
    "Qwen/Qwen3-Reranker-0.6B"
  ],
  "stage": "other",
  "architecture": "dense",
  "totalParametersB": {
    "state": "known",
    "value": 0.6,
    "evidenceIds": [
      "evidence:qwen-qwen3-reranker-0-6b-parameters"
    ],
    "unit": "billion-parameters",
    "note": "اعداد پارامتر معرفی مدل، گرد‌شده‌اند؛ safetensors.total شمار عناصر ذخیره‌شده است و الزاماً پارامتر یکتا نیست."
  },
  "activeParametersB": {
    "state": "not-applicable"
  },
  "kind": "reranker",
  "inputModalities": [
    "text"
  ],
  "outputModalities": [
    "structured-data"
  ],
  "applications": [
    "enterprise-rag"
  ],
  "languages": [
    {
      "language": "multilingual",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-e46def74508c916e78"
        ]
      }
    }
  ],
  "persianEvidenceStatus": "not-evaluated",
  "declaredContext": {
    "state": "known",
    "value": 32768,
    "evidenceIds": [
      "evidence:qwen-qwen3-reranker-0-6b-context"
    ],
    "unit": "token",
    "note": "ظرفیت اعلام‌شدهٔ ناشر؛ ارزیابی کیفیت بلندمتن در این بسته ثبت نشده است. مقدار native یا جدول مشخصات استفاده شده؛ config ممکن است 40960 باشد."
  },
  "evaluatedContext": {
    "state": "not-measured"
  },
  "releaseStatus": "available",
  "lastReviewedOn": "2026-09-15",
  "license": {
    "name": {
      "state": "known",
      "value": "Apache-2.0",
      "evidenceIds": [
        "evidence:qwen-qwen3-reranker-0-6b-license"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://huggingface.co/Qwen/Qwen3-Reranker-0.6B/blob/e61197ed45024b0ed8a2d74b80b4d909f1255473/README.md",
      "evidenceIds": [
        "evidence:qwen-qwen3-reranker-0-6b-license"
      ]
    },
    "commercialUse": {
      "state": "known",
      "value": "allowed",
      "evidenceIds": [
        "evidence:qwen-qwen3-reranker-0-6b-license"
      ]
    },
    "restrictions": [],
    "evidenceIds": [
      "evidence:qwen-qwen3-reranker-0-6b-license"
    ]
  },
  "evidenceIds": [
    "evidence:qwen-qwen3-reranker-0-6b-card",
    "evidence:qwen-qwen3-reranker-0-6b-metadata",
    "evidence:qwen-qwen3-reranker-0-6b-parameters",
    "evidence:qwen-qwen3-reranker-0-6b-license",
    "evidence:qwen-qwen3-reranker-0-6b-context",
    "evidence:qwen-qwen3-reranker-0-6b-config",
    "evidence:four-tables-release-qwen3-embedding-launch",
    "evidence:v03-e46def74508c916e78"
  ],
  "releasedOn": "2025-06-05",
  "parameterCounts": [
    {
      "scope": "total",
      "label": "شمار کل اعلام‌شده",
      "value": {
        "state": "known",
        "value": 0.6,
        "evidenceIds": [
          "evidence:qwen-qwen3-reranker-0-6b-parameters"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "stored",
      "label": "تعداد عناصر پارامتری نمایهٔ Safetensors",
      "value": {
        "state": "known",
        "value": 0.595776512,
        "evidenceIds": [
          "evidence:v03-bca463116b39be8c49"
        ],
        "unit": "billion-parameters",
        "note": "نمایهٔ فایل وزن؛ برای وزن کوانت‌شده یا اشتراک وزن، الزاماً شمار پارامتر مستقل نیست."
      },
      "approximate": false
    }
  ],
  "specializedSpecs": {
    "task": {
      "state": "known",
      "value": "بازرتبه‌بندی زوج پرسش و سند",
      "evidenceIds": [
        "evidence:qwen-qwen3-reranker-0-6b-card"
      ]
    },
    "output": {
      "state": "known",
      "value": "امتیاز ارتباط زوج متن؛ بدون embedding",
      "evidenceIds": [
        "evidence:qwen-qwen3-reranker-0-6b-card"
      ]
    },
    "poolingOrScoring": {
      "state": "known",
      "value": "احتمال yes در برابر no از logits دو توکن؛ دستور، query و document با قالب کارت مدل.",
      "evidenceIds": [
        "evidence:qwen-qwen3-reranker-0-6b-card"
      ]
    },
    "features": {
      "state": "known",
      "value": "دستورپذیر؛ بازیابی چندزبانه و کد",
      "evidenceIds": [
        "evidence:qwen-qwen3-reranker-0-6b-card"
      ]
    },
    "languages": {
      "state": "known",
      "value": "بیش از ۱۰۰ زبان طبق ناشر؛ نتیجهٔ تجمیعی جای آزمون فارسی نیست.",
      "evidenceIds": [
        "evidence:qwen-qwen3-reranker-0-6b-card"
      ]
    }
  }
});
models.push({
  "id": "model:qwen-qwen3-reranker-4b",
  "familyId": "family:qwen",
  "exactName": "Qwen3-Reranker-4B",
  "publisher": "Qwen / Alibaba Cloud",
  "version": "22e683669bc0f0bd69640a1354a6d0aebcfeede5",
  "aliases": [
    "Qwen/Qwen3-Reranker-4B"
  ],
  "stage": "other",
  "architecture": "dense",
  "totalParametersB": {
    "state": "known",
    "value": 4,
    "evidenceIds": [
      "evidence:qwen-qwen3-reranker-4b-parameters"
    ],
    "unit": "billion-parameters",
    "note": "اعداد پارامتر معرفی مدل، گرد‌شده‌اند؛ safetensors.total شمار عناصر ذخیره‌شده است و الزاماً پارامتر یکتا نیست."
  },
  "activeParametersB": {
    "state": "not-applicable"
  },
  "kind": "reranker",
  "inputModalities": [
    "text"
  ],
  "outputModalities": [
    "structured-data"
  ],
  "applications": [
    "enterprise-rag"
  ],
  "languages": [
    {
      "language": "multilingual",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-d16eb55121e3e71474"
        ]
      }
    }
  ],
  "persianEvidenceStatus": "not-evaluated",
  "declaredContext": {
    "state": "known",
    "value": 32768,
    "evidenceIds": [
      "evidence:qwen-qwen3-reranker-4b-context"
    ],
    "unit": "token",
    "note": "ظرفیت اعلام‌شدهٔ ناشر؛ ارزیابی کیفیت بلندمتن در این بسته ثبت نشده است. مقدار native یا جدول مشخصات استفاده شده؛ config ممکن است 40960 باشد."
  },
  "evaluatedContext": {
    "state": "not-measured"
  },
  "releaseStatus": "available",
  "lastReviewedOn": "2026-09-15",
  "license": {
    "name": {
      "state": "known",
      "value": "Apache-2.0",
      "evidenceIds": [
        "evidence:qwen-qwen3-reranker-4b-license"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://huggingface.co/Qwen/Qwen3-Reranker-4B/blob/22e683669bc0f0bd69640a1354a6d0aebcfeede5/README.md",
      "evidenceIds": [
        "evidence:qwen-qwen3-reranker-4b-license"
      ]
    },
    "commercialUse": {
      "state": "known",
      "value": "allowed",
      "evidenceIds": [
        "evidence:qwen-qwen3-reranker-4b-license"
      ]
    },
    "restrictions": [],
    "evidenceIds": [
      "evidence:qwen-qwen3-reranker-4b-license"
    ]
  },
  "evidenceIds": [
    "evidence:qwen-qwen3-reranker-4b-card",
    "evidence:qwen-qwen3-reranker-4b-metadata",
    "evidence:qwen-qwen3-reranker-4b-parameters",
    "evidence:qwen-qwen3-reranker-4b-license",
    "evidence:qwen-qwen3-reranker-4b-context",
    "evidence:qwen-qwen3-reranker-4b-config",
    "evidence:four-tables-release-qwen3-embedding-launch",
    "evidence:v03-d16eb55121e3e71474"
  ],
  "releasedOn": "2025-06-05",
  "parameterCounts": [
    {
      "scope": "total",
      "label": "شمار کل اعلام‌شده",
      "value": {
        "state": "known",
        "value": 4,
        "evidenceIds": [
          "evidence:qwen-qwen3-reranker-4b-parameters"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "stored",
      "label": "تعداد عناصر پارامتری نمایهٔ Safetensors",
      "value": {
        "state": "known",
        "value": 4.021784576,
        "evidenceIds": [
          "evidence:v03-2b3a475183117ce695"
        ],
        "unit": "billion-parameters",
        "note": "نمایهٔ فایل وزن؛ برای وزن کوانت‌شده یا اشتراک وزن، الزاماً شمار پارامتر مستقل نیست."
      },
      "approximate": false
    }
  ],
  "specializedSpecs": {
    "task": {
      "state": "known",
      "value": "بازرتبه‌بندی زوج پرسش و سند",
      "evidenceIds": [
        "evidence:qwen-qwen3-reranker-4b-card"
      ]
    },
    "output": {
      "state": "known",
      "value": "امتیاز ارتباط زوج متن؛ بدون embedding",
      "evidenceIds": [
        "evidence:qwen-qwen3-reranker-4b-card"
      ]
    },
    "poolingOrScoring": {
      "state": "known",
      "value": "احتمال yes در برابر no از logits دو توکن؛ دستور، query و document با قالب کارت مدل.",
      "evidenceIds": [
        "evidence:qwen-qwen3-reranker-4b-card"
      ]
    },
    "features": {
      "state": "known",
      "value": "دستورپذیر؛ بازیابی چندزبانه و کد",
      "evidenceIds": [
        "evidence:qwen-qwen3-reranker-4b-card"
      ]
    },
    "languages": {
      "state": "known",
      "value": "بیش از ۱۰۰ زبان طبق ناشر؛ نتیجهٔ تجمیعی جای آزمون فارسی نیست.",
      "evidenceIds": [
        "evidence:qwen-qwen3-reranker-4b-card"
      ]
    }
  }
});
models.push({
  "id": "model:qwen-qwen3-reranker-8b",
  "familyId": "family:qwen",
  "exactName": "Qwen3-Reranker-8B",
  "publisher": "Qwen / Alibaba Cloud",
  "version": "77d193c791ed757ca307ee72715aa132723da912",
  "aliases": [
    "Qwen/Qwen3-Reranker-8B"
  ],
  "stage": "other",
  "architecture": "dense",
  "totalParametersB": {
    "state": "known",
    "value": 8,
    "evidenceIds": [
      "evidence:qwen-qwen3-reranker-8b-parameters"
    ],
    "unit": "billion-parameters",
    "note": "اعداد پارامتر معرفی مدل، گرد‌شده‌اند؛ safetensors.total شمار عناصر ذخیره‌شده است و الزاماً پارامتر یکتا نیست."
  },
  "activeParametersB": {
    "state": "not-applicable"
  },
  "kind": "reranker",
  "inputModalities": [
    "text"
  ],
  "outputModalities": [
    "structured-data"
  ],
  "applications": [
    "enterprise-rag"
  ],
  "languages": [
    {
      "language": "multilingual",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-c09f8e74cbe4033e43"
        ]
      }
    }
  ],
  "persianEvidenceStatus": "not-evaluated",
  "declaredContext": {
    "state": "known",
    "value": 32768,
    "evidenceIds": [
      "evidence:qwen-qwen3-reranker-8b-context"
    ],
    "unit": "token",
    "note": "ظرفیت اعلام‌شدهٔ ناشر؛ ارزیابی کیفیت بلندمتن در این بسته ثبت نشده است. مقدار native یا جدول مشخصات استفاده شده؛ config ممکن است 40960 باشد."
  },
  "evaluatedContext": {
    "state": "not-measured"
  },
  "releaseStatus": "available",
  "lastReviewedOn": "2026-09-15",
  "license": {
    "name": {
      "state": "known",
      "value": "Apache-2.0",
      "evidenceIds": [
        "evidence:qwen-qwen3-reranker-8b-license"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://huggingface.co/Qwen/Qwen3-Reranker-8B/blob/77d193c791ed757ca307ee72715aa132723da912/README.md",
      "evidenceIds": [
        "evidence:qwen-qwen3-reranker-8b-license"
      ]
    },
    "commercialUse": {
      "state": "known",
      "value": "allowed",
      "evidenceIds": [
        "evidence:qwen-qwen3-reranker-8b-license"
      ]
    },
    "restrictions": [],
    "evidenceIds": [
      "evidence:qwen-qwen3-reranker-8b-license"
    ]
  },
  "evidenceIds": [
    "evidence:qwen-qwen3-reranker-8b-card",
    "evidence:qwen-qwen3-reranker-8b-metadata",
    "evidence:qwen-qwen3-reranker-8b-parameters",
    "evidence:qwen-qwen3-reranker-8b-license",
    "evidence:qwen-qwen3-reranker-8b-context",
    "evidence:qwen-qwen3-reranker-8b-config",
    "evidence:four-tables-release-qwen3-embedding-launch",
    "evidence:v03-c09f8e74cbe4033e43"
  ],
  "releasedOn": "2025-06-05",
  "parameterCounts": [
    {
      "scope": "total",
      "label": "شمار کل اعلام‌شده",
      "value": {
        "state": "known",
        "value": 8,
        "evidenceIds": [
          "evidence:qwen-qwen3-reranker-8b-parameters"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "stored",
      "label": "تعداد عناصر پارامتری نمایهٔ Safetensors",
      "value": {
        "state": "known",
        "value": 8.188548096,
        "evidenceIds": [
          "evidence:v03-62cb8753fb8c580a11"
        ],
        "unit": "billion-parameters",
        "note": "نمایهٔ فایل وزن؛ برای وزن کوانت‌شده یا اشتراک وزن، الزاماً شمار پارامتر مستقل نیست."
      },
      "approximate": false
    }
  ],
  "specializedSpecs": {
    "task": {
      "state": "known",
      "value": "بازرتبه‌بندی زوج پرسش و سند",
      "evidenceIds": [
        "evidence:qwen-qwen3-reranker-8b-card"
      ]
    },
    "output": {
      "state": "known",
      "value": "امتیاز ارتباط زوج متن؛ بدون embedding",
      "evidenceIds": [
        "evidence:qwen-qwen3-reranker-8b-card"
      ]
    },
    "poolingOrScoring": {
      "state": "known",
      "value": "احتمال yes در برابر no از logits دو توکن؛ دستور، query و document با قالب کارت مدل.",
      "evidenceIds": [
        "evidence:qwen-qwen3-reranker-8b-card"
      ]
    },
    "features": {
      "state": "known",
      "value": "دستورپذیر؛ بازیابی چندزبانه و کد",
      "evidenceIds": [
        "evidence:qwen-qwen3-reranker-8b-card"
      ]
    },
    "languages": {
      "state": "known",
      "value": "بیش از ۱۰۰ زبان طبق ناشر؛ نتیجهٔ تجمیعی جای آزمون فارسی نیست.",
      "evidenceIds": [
        "evidence:qwen-qwen3-reranker-8b-card"
      ]
    }
  }
});
models.push({
  "id": "model:qwen-qwen3-vl-8b-instruct",
  "familyId": "family:qwen",
  "exactName": "Qwen3-VL-8B-Instruct",
  "publisher": "Qwen / Alibaba Cloud",
  "version": "0c351dd01ed87e9c1b53cbc748cba10e6187ff3b",
  "aliases": [
    "Qwen/Qwen3-VL-8B-Instruct"
  ],
  "stage": "instruct",
  "architecture": "dense",
  "totalParametersB": {
    "state": "unknown",
    "note": "شمار کل با دامنهٔ یکنواخت تأیید نشده؛ شمار جزء زبانی، فعال یا ذخیره‌شده جای آن ننشسته است.",
    "evidenceIds": [
      "evidence:qwen-qwen3-vl-8b-instruct-parameters",
      "evidence:qwen-qwen3-vl-8b-instruct-metadata"
    ]
  },
  "activeParametersB": {
    "state": "not-applicable"
  },
  "kind": "vision-language",
  "inputModalities": [
    "text",
    "image",
    "video"
  ],
  "outputModalities": [
    "text"
  ],
  "applications": [
    "text-work",
    "document-vision",
    "enterprise-rag",
    "structured-extraction",
    "coding-assistant"
  ],
  "languages": [],
  "persianEvidenceStatus": "not-evaluated",
  "declaredContext": {
    "state": "known",
    "value": 262144,
    "evidenceIds": [
      "evidence:qwen-qwen3-vl-8b-instruct-context"
    ],
    "unit": "token",
    "note": "ظرفیت اعلام‌شدهٔ ناشر؛ ارزیابی کیفیت بلندمتن در این بسته ثبت نشده است."
  },
  "evaluatedContext": {
    "state": "not-measured"
  },
  "releaseStatus": "available",
  "lastReviewedOn": "2026-09-15",
  "license": {
    "name": {
      "state": "known",
      "value": "Apache-2.0",
      "evidenceIds": [
        "evidence:qwen-qwen3-vl-8b-instruct-license"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://huggingface.co/Qwen/Qwen3-VL-8B-Instruct/blob/0c351dd01ed87e9c1b53cbc748cba10e6187ff3b/README.md",
      "evidenceIds": [
        "evidence:qwen-qwen3-vl-8b-instruct-license"
      ]
    },
    "commercialUse": {
      "state": "known",
      "value": "allowed",
      "evidenceIds": [
        "evidence:qwen-qwen3-vl-8b-instruct-license"
      ]
    },
    "restrictions": [],
    "evidenceIds": [
      "evidence:qwen-qwen3-vl-8b-instruct-license"
    ]
  },
  "evidenceIds": [
    "evidence:qwen-qwen3-vl-8b-instruct-card",
    "evidence:qwen-qwen3-vl-8b-instruct-metadata",
    "evidence:qwen-qwen3-vl-8b-instruct-parameters",
    "evidence:qwen-qwen3-vl-8b-instruct-license",
    "evidence:qwen-qwen3-vl-8b-instruct-context",
    "evidence:qwen-qwen3-vl-8b-instruct-config",
    "evidence:four-tables-release-qwen3-vl-4b-and-8b-release",
    "evidence:v03-d1601e1a4e651a447e"
  ],
  "releasedOn": "2025-10-15",
  "parameterCounts": [
    {
      "scope": "nominal",
      "label": "اندازهٔ اسمی گونهٔ 8B",
      "value": {
        "state": "known",
        "value": 8,
        "evidenceIds": [
          "evidence:qwen-qwen3-vl-8b-instruct-card"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "stored",
      "label": "تعداد عناصر پارامتری نمایهٔ Safetensors",
      "value": {
        "state": "known",
        "value": 8.767123696,
        "evidenceIds": [
          "evidence:v03-9ebf35788ef07e2236"
        ],
        "unit": "billion-parameters",
        "note": "نمایهٔ فایل وزن؛ برای وزن کوانت‌شده یا اشتراک وزن، الزاماً شمار پارامتر مستقل نیست."
      },
      "approximate": false
    }
  ]
});
models.push({
  "id": "model:qwen-qwen3-5-2b",
  "familyId": "family:qwen",
  "exactName": "Qwen3.5-2B",
  "publisher": "Qwen / Alibaba Cloud",
  "version": "15852e8c16360a2fea060d615a32b45270f8a8fc",
  "aliases": [
    "Qwen/Qwen3.5-2B"
  ],
  "stage": "instruct",
  "architecture": "hybrid",
  "totalParametersB": {
    "state": "known",
    "value": 2.0,
    "evidenceIds": [
      "evidence:v03-1fb0e66ad27f4a35c4"
    ],
    "unit": "billion-parameters",
    "note": "شمار گرد‌شدهٔ اعلامی ناشر."
  },
  "activeParametersB": {
    "state": "unknown",
    "note": "شمار فعال دقیق این گونه و فاز اجرا تأیید نشده است.",
    "evidenceIds": [
      "evidence:qwen-qwen3-5-2b-parameters"
    ]
  },
  "kind": "vision-language",
  "inputModalities": [
    "text",
    "image",
    "video"
  ],
  "outputModalities": [
    "text"
  ],
  "applications": [
    "text-work",
    "document-vision",
    "enterprise-rag",
    "structured-extraction",
    "reasoning-analysis",
    "coding-assistant",
    "agents-tools"
  ],
  "languages": [
    {
      "language": "multilingual",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-1fb0e66ad27f4a35c4"
        ]
      }
    }
  ],
  "persianEvidenceStatus": "not-evaluated",
  "declaredContext": {
    "state": "known",
    "value": 262144,
    "evidenceIds": [
      "evidence:qwen-qwen3-5-2b-context"
    ],
    "unit": "token",
    "note": "ظرفیت اعلام‌شدهٔ ناشر؛ ارزیابی کیفیت بلندمتن در این بسته ثبت نشده است."
  },
  "evaluatedContext": {
    "state": "not-measured"
  },
  "releaseStatus": "available",
  "lastReviewedOn": "2026-09-15",
  "license": {
    "name": {
      "state": "known",
      "value": "Apache-2.0",
      "evidenceIds": [
        "evidence:qwen-qwen3-5-2b-license"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://huggingface.co/Qwen/Qwen3.5-2B/blob/main/LICENSE",
      "evidenceIds": [
        "evidence:qwen-qwen3-5-2b-license"
      ]
    },
    "commercialUse": {
      "state": "known",
      "value": "allowed",
      "evidenceIds": [
        "evidence:qwen-qwen3-5-2b-license"
      ]
    },
    "restrictions": [],
    "evidenceIds": [
      "evidence:qwen-qwen3-5-2b-license"
    ]
  },
  "evidenceIds": [
    "evidence:qwen-qwen3-5-2b-card",
    "evidence:qwen-qwen3-5-2b-metadata",
    "evidence:qwen-qwen3-5-2b-parameters",
    "evidence:qwen-qwen3-5-2b-license",
    "evidence:qwen-qwen3-5-2b-context",
    "evidence:qwen-qwen3-5-2b-config",
    "evidence:four-tables-release-qwen3-5-small-models-release",
    "evidence:v03-1fb0e66ad27f4a35c4"
  ],
  "releasedOn": "2026-03-02",
  "parameterCounts": [
    {
      "scope": "language-component",
      "label": "جزء زبانی",
      "value": {
        "state": "known",
        "value": 2,
        "evidenceIds": [
          "evidence:qwen-qwen3-5-2b-card"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "total",
      "label": "شمار گرد‌شدهٔ اعلامی ناشر",
      "value": {
        "state": "known",
        "value": 2.0,
        "evidenceIds": [
          "evidence:v03-1fb0e66ad27f4a35c4"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "stored",
      "label": "تعداد عناصر پارامتری نمایهٔ Safetensors",
      "value": {
        "state": "known",
        "value": 2.274069824,
        "evidenceIds": [
          "evidence:v03-f6437c3de485b00992"
        ],
        "unit": "billion-parameters",
        "note": "نمایهٔ فایل وزن؛ برای وزن کوانت‌شده یا اشتراک وزن، الزاماً شمار پارامتر مستقل نیست."
      },
      "approximate": false
    }
  ]
});
models.push({
  "id": "model:qwen-qwen3-5-35b-a3b",
  "familyId": "family:qwen",
  "exactName": "Qwen3.5-35B-A3B",
  "publisher": "Qwen / Alibaba Cloud",
  "version": "59d61f3ce65a6d9863b86d2e96597125219dc754",
  "aliases": [
    "Qwen/Qwen3.5-35B-A3B"
  ],
  "stage": "instruct",
  "architecture": "hybrid",
  "totalParametersB": {
    "state": "known",
    "value": 35.0,
    "evidenceIds": [
      "evidence:v03-02a81d4ca4dfa9b099"
    ],
    "unit": "billion-parameters",
    "note": "شمار گرد‌شدهٔ اعلامی ناشر."
  },
  "activeParametersB": {
    "state": "unknown",
    "note": "شمار فعال دقیق این گونه و فاز اجرا تأیید نشده است.",
    "evidenceIds": [
      "evidence:qwen-qwen3-5-35b-a3b-parameters"
    ]
  },
  "kind": "vision-language",
  "inputModalities": [
    "text",
    "image",
    "video"
  ],
  "outputModalities": [
    "text"
  ],
  "applications": [
    "text-work",
    "document-vision",
    "enterprise-rag",
    "structured-extraction",
    "reasoning-analysis",
    "coding-assistant",
    "agents-tools"
  ],
  "languages": [
    {
      "language": "multilingual",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-02a81d4ca4dfa9b099"
        ]
      }
    }
  ],
  "persianEvidenceStatus": "not-evaluated",
  "declaredContext": {
    "state": "known",
    "value": 262144,
    "evidenceIds": [
      "evidence:qwen-qwen3-5-35b-a3b-context"
    ],
    "unit": "token",
    "note": "ظرفیت اعلام‌شدهٔ ناشر؛ ارزیابی کیفیت بلندمتن در این بسته ثبت نشده است."
  },
  "evaluatedContext": {
    "state": "not-measured"
  },
  "releaseStatus": "available",
  "lastReviewedOn": "2026-09-15",
  "license": {
    "name": {
      "state": "known",
      "value": "Apache-2.0",
      "evidenceIds": [
        "evidence:qwen-qwen3-5-35b-a3b-license"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://huggingface.co/Qwen/Qwen3.5-35B-A3B/blob/main/LICENSE",
      "evidenceIds": [
        "evidence:qwen-qwen3-5-35b-a3b-license"
      ]
    },
    "commercialUse": {
      "state": "known",
      "value": "allowed",
      "evidenceIds": [
        "evidence:qwen-qwen3-5-35b-a3b-license"
      ]
    },
    "restrictions": [],
    "evidenceIds": [
      "evidence:qwen-qwen3-5-35b-a3b-license"
    ]
  },
  "evidenceIds": [
    "evidence:qwen-qwen3-5-35b-a3b-card",
    "evidence:qwen-qwen3-5-35b-a3b-metadata",
    "evidence:qwen-qwen3-5-35b-a3b-parameters",
    "evidence:qwen-qwen3-5-35b-a3b-license",
    "evidence:qwen-qwen3-5-35b-a3b-context",
    "evidence:qwen-qwen3-5-35b-a3b-config",
    "evidence:four-tables-release-qwen3-5-medium-models-release",
    "evidence:v03-02a81d4ca4dfa9b099"
  ],
  "releasedOn": "2026-02-24",
  "parameterCounts": [
    {
      "scope": "language-component",
      "label": "جزء زبانی",
      "value": {
        "state": "known",
        "value": 35,
        "evidenceIds": [
          "evidence:qwen-qwen3-5-35b-a3b-card"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "total",
      "label": "شمار گرد‌شدهٔ اعلامی ناشر",
      "value": {
        "state": "known",
        "value": 35.0,
        "evidenceIds": [
          "evidence:v03-02a81d4ca4dfa9b099"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "stored",
      "label": "تعداد عناصر پارامتری نمایهٔ Safetensors",
      "value": {
        "state": "known",
        "value": 35.951822704,
        "evidenceIds": [
          "evidence:v03-dd831b60bd47fa08c8"
        ],
        "unit": "billion-parameters",
        "note": "نمایهٔ فایل وزن؛ برای وزن کوانت‌شده یا اشتراک وزن، الزاماً شمار پارامتر مستقل نیست."
      },
      "approximate": false
    }
  ],
  "contextExtension": {
    "capacity": {
      "state": "known",
      "value": 1010000,
      "evidenceIds": [
        "evidence:qwen-qwen3-5-35b-a3b-card"
      ],
      "unit": "token"
    },
    "condition": "افزایش زمینه با YaRN"
  }
});
models.push({
  "id": "model:qwen-qwen3-5-4b",
  "familyId": "family:qwen",
  "exactName": "Qwen3.5-4B",
  "publisher": "Qwen / Alibaba Cloud",
  "version": "851bf6e806efd8d0a36b00ddf55e13ccb7b8cd0a",
  "aliases": [
    "Qwen/Qwen3.5-4B"
  ],
  "stage": "instruct",
  "architecture": "hybrid",
  "totalParametersB": {
    "state": "known",
    "value": 4.0,
    "evidenceIds": [
      "evidence:v03-a70fca6b263839d3e5"
    ],
    "unit": "billion-parameters",
    "note": "شمار گرد‌شدهٔ اعلامی ناشر."
  },
  "activeParametersB": {
    "state": "unknown",
    "note": "شمار فعال دقیق این گونه و فاز اجرا تأیید نشده است.",
    "evidenceIds": [
      "evidence:qwen-qwen3-5-4b-parameters"
    ]
  },
  "kind": "vision-language",
  "inputModalities": [
    "text",
    "image",
    "video"
  ],
  "outputModalities": [
    "text"
  ],
  "applications": [
    "text-work",
    "document-vision",
    "enterprise-rag",
    "structured-extraction",
    "reasoning-analysis",
    "coding-assistant",
    "agents-tools"
  ],
  "languages": [
    {
      "language": "multilingual",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-a70fca6b263839d3e5"
        ]
      }
    }
  ],
  "persianEvidenceStatus": "not-evaluated",
  "declaredContext": {
    "state": "known",
    "value": 262144,
    "evidenceIds": [
      "evidence:qwen-qwen3-5-4b-context"
    ],
    "unit": "token",
    "note": "ظرفیت اعلام‌شدهٔ ناشر؛ ارزیابی کیفیت بلندمتن در این بسته ثبت نشده است."
  },
  "evaluatedContext": {
    "state": "not-measured"
  },
  "releaseStatus": "available",
  "lastReviewedOn": "2026-09-15",
  "license": {
    "name": {
      "state": "known",
      "value": "Apache-2.0",
      "evidenceIds": [
        "evidence:qwen-qwen3-5-4b-license"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://huggingface.co/Qwen/Qwen3.5-4B/blob/main/LICENSE",
      "evidenceIds": [
        "evidence:qwen-qwen3-5-4b-license"
      ]
    },
    "commercialUse": {
      "state": "known",
      "value": "allowed",
      "evidenceIds": [
        "evidence:qwen-qwen3-5-4b-license"
      ]
    },
    "restrictions": [],
    "evidenceIds": [
      "evidence:qwen-qwen3-5-4b-license"
    ]
  },
  "evidenceIds": [
    "evidence:qwen-qwen3-5-4b-card",
    "evidence:qwen-qwen3-5-4b-metadata",
    "evidence:qwen-qwen3-5-4b-parameters",
    "evidence:qwen-qwen3-5-4b-license",
    "evidence:qwen-qwen3-5-4b-context",
    "evidence:qwen-qwen3-5-4b-config",
    "evidence:four-tables-release-qwen3-5-small-models-release",
    "evidence:v03-a70fca6b263839d3e5"
  ],
  "releasedOn": "2026-03-02",
  "parameterCounts": [
    {
      "scope": "language-component",
      "label": "جزء زبانی",
      "value": {
        "state": "known",
        "value": 4,
        "evidenceIds": [
          "evidence:qwen-qwen3-5-4b-card"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "total",
      "label": "شمار گرد‌شدهٔ اعلامی ناشر",
      "value": {
        "state": "known",
        "value": 4.0,
        "evidenceIds": [
          "evidence:v03-a70fca6b263839d3e5"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "stored",
      "label": "تعداد عناصر پارامتری نمایهٔ Safetensors",
      "value": {
        "state": "known",
        "value": 4.659865088,
        "evidenceIds": [
          "evidence:v03-794bfb947531f5882c"
        ],
        "unit": "billion-parameters",
        "note": "نمایهٔ فایل وزن؛ برای وزن کوانت‌شده یا اشتراک وزن، الزاماً شمار پارامتر مستقل نیست."
      },
      "approximate": false
    }
  ],
  "contextExtension": {
    "capacity": {
      "state": "known",
      "value": 1010000,
      "evidenceIds": [
        "evidence:qwen-qwen3-5-4b-card"
      ],
      "unit": "token"
    },
    "condition": "افزایش زمینه با YaRN"
  }
});
models.push({
  "id": "model:qwen-qwen3-5-9b",
  "familyId": "family:qwen",
  "exactName": "Qwen3.5-9B",
  "publisher": "Qwen / Alibaba Cloud",
  "version": "c202236235762e1c871ad0ccb60c8ee5ba337b9a",
  "aliases": [
    "Qwen/Qwen3.5-9B"
  ],
  "stage": "instruct",
  "architecture": "hybrid",
  "totalParametersB": {
    "state": "known",
    "value": 9.0,
    "evidenceIds": [
      "evidence:v03-de0f4e149976e25127"
    ],
    "unit": "billion-parameters",
    "note": "شمار گرد‌شدهٔ اعلامی ناشر."
  },
  "activeParametersB": {
    "state": "unknown",
    "note": "شمار فعال دقیق این گونه و فاز اجرا تأیید نشده است.",
    "evidenceIds": [
      "evidence:qwen-qwen3-5-9b-parameters"
    ]
  },
  "kind": "vision-language",
  "inputModalities": [
    "text",
    "image",
    "video"
  ],
  "outputModalities": [
    "text"
  ],
  "applications": [
    "text-work",
    "document-vision",
    "enterprise-rag",
    "structured-extraction",
    "reasoning-analysis",
    "coding-assistant",
    "agents-tools"
  ],
  "languages": [
    {
      "language": "multilingual",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-de0f4e149976e25127"
        ]
      }
    }
  ],
  "persianEvidenceStatus": "not-evaluated",
  "declaredContext": {
    "state": "known",
    "value": 262144,
    "evidenceIds": [
      "evidence:qwen-qwen3-5-9b-context"
    ],
    "unit": "token",
    "note": "ظرفیت اعلام‌شدهٔ ناشر؛ ارزیابی کیفیت بلندمتن در این بسته ثبت نشده است."
  },
  "evaluatedContext": {
    "state": "not-measured"
  },
  "releaseStatus": "available",
  "lastReviewedOn": "2026-09-15",
  "license": {
    "name": {
      "state": "known",
      "value": "Apache-2.0",
      "evidenceIds": [
        "evidence:qwen-qwen3-5-9b-license"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://huggingface.co/Qwen/Qwen3.5-9B/blob/main/LICENSE",
      "evidenceIds": [
        "evidence:qwen-qwen3-5-9b-license"
      ]
    },
    "commercialUse": {
      "state": "known",
      "value": "allowed",
      "evidenceIds": [
        "evidence:qwen-qwen3-5-9b-license"
      ]
    },
    "restrictions": [],
    "evidenceIds": [
      "evidence:qwen-qwen3-5-9b-license"
    ]
  },
  "evidenceIds": [
    "evidence:qwen-qwen3-5-9b-card",
    "evidence:qwen-qwen3-5-9b-metadata",
    "evidence:qwen-qwen3-5-9b-parameters",
    "evidence:qwen-qwen3-5-9b-license",
    "evidence:qwen-qwen3-5-9b-context",
    "evidence:qwen-qwen3-5-9b-config",
    "evidence:four-tables-release-qwen3-5-small-models-release",
    "evidence:v03-de0f4e149976e25127"
  ],
  "releasedOn": "2026-03-02",
  "parameterCounts": [
    {
      "scope": "language-component",
      "label": "جزء زبانی",
      "value": {
        "state": "known",
        "value": 9,
        "evidenceIds": [
          "evidence:qwen-qwen3-5-9b-card"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "total",
      "label": "شمار گرد‌شدهٔ اعلامی ناشر",
      "value": {
        "state": "known",
        "value": 9.0,
        "evidenceIds": [
          "evidence:v03-de0f4e149976e25127"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "stored",
      "label": "تعداد عناصر پارامتری نمایهٔ Safetensors",
      "value": {
        "state": "known",
        "value": 9.653104368,
        "evidenceIds": [
          "evidence:v03-c353dc5ca170848d47"
        ],
        "unit": "billion-parameters",
        "note": "نمایهٔ فایل وزن؛ برای وزن کوانت‌شده یا اشتراک وزن، الزاماً شمار پارامتر مستقل نیست."
      },
      "approximate": false
    }
  ],
  "contextExtension": {
    "capacity": {
      "state": "known",
      "value": 1010000,
      "evidenceIds": [
        "evidence:qwen-qwen3-5-9b-card"
      ],
      "unit": "token"
    },
    "condition": "افزایش زمینه با YaRN"
  }
});
models.push({
  "id": "model:qwen-qwen3-8-27b",
  "familyId": "family:qwen",
  "exactName": "Qwen3.8-27B",
  "publisher": "Qwen / Alibaba Cloud",
  "version": "1d4bf0f2ff6012fd82039f2fa52739d0dd7c60c0",
  "aliases": [
    "Qwen/Qwen3.8-27B"
  ],
  "stage": "instruct",
  "architecture": "hybrid",
  "totalParametersB": {
    "state": "known",
    "value": 27.0,
    "evidenceIds": [
      "evidence:v03-6ef1dc4cde68af6f92"
    ],
    "unit": "billion-parameters",
    "note": "شمار گرد‌شدهٔ اعلامی ناشر."
  },
  "activeParametersB": {
    "state": "unknown",
    "note": "شمار فعال دقیق این گونه و فاز اجرا تأیید نشده است.",
    "evidenceIds": [
      "evidence:qwen-qwen3-8-27b-parameters"
    ]
  },
  "kind": "vision-language",
  "inputModalities": [
    "text",
    "image",
    "video"
  ],
  "outputModalities": [
    "text"
  ],
  "applications": [
    "text-work",
    "document-vision",
    "enterprise-rag",
    "structured-extraction",
    "reasoning-analysis",
    "coding-assistant",
    "agents-tools"
  ],
  "languages": [],
  "persianEvidenceStatus": "not-evaluated",
  "declaredContext": {
    "state": "known",
    "value": 262144,
    "evidenceIds": [
      "evidence:qwen-qwen3-8-27b-context"
    ],
    "unit": "token",
    "note": "ظرفیت اعلام‌شدهٔ ناشر؛ ارزیابی کیفیت بلندمتن در این بسته ثبت نشده است."
  },
  "evaluatedContext": {
    "state": "not-measured"
  },
  "releaseStatus": "available",
  "lastReviewedOn": "2026-09-15",
  "license": {
    "name": {
      "state": "known",
      "value": "Apache-2.0",
      "evidenceIds": [
        "evidence:qwen-qwen3-8-27b-license"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://huggingface.co/Qwen/Qwen3.8-27B/blob/1d4bf0f2ff6012fd82039f2fa52739d0dd7c60c0/README.md",
      "evidenceIds": [
        "evidence:qwen-qwen3-8-27b-license"
      ]
    },
    "commercialUse": {
      "state": "known",
      "value": "allowed",
      "evidenceIds": [
        "evidence:qwen-qwen3-8-27b-license"
      ]
    },
    "restrictions": [],
    "evidenceIds": [
      "evidence:qwen-qwen3-8-27b-license"
    ]
  },
  "evidenceIds": [
    "evidence:qwen-qwen3-8-27b-card",
    "evidence:qwen-qwen3-8-27b-metadata",
    "evidence:qwen-qwen3-8-27b-parameters",
    "evidence:qwen-qwen3-8-27b-license",
    "evidence:qwen-qwen3-8-27b-context",
    "evidence:qwen-qwen3-8-27b-config",
    "evidence:four-tables-release-qwen3-8-27b-release",
    "evidence:v03-6ef1dc4cde68af6f92"
  ],
  "releasedOn": "2026-08-14",
  "parameterCounts": [
    {
      "scope": "language-component",
      "label": "جزء زبانی",
      "value": {
        "state": "known",
        "value": 27,
        "evidenceIds": [
          "evidence:qwen-qwen3-8-27b-card"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "total",
      "label": "شمار گرد‌شدهٔ اعلامی ناشر",
      "value": {
        "state": "known",
        "value": 27.0,
        "evidenceIds": [
          "evidence:v03-6ef1dc4cde68af6f92"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "stored",
      "label": "تعداد عناصر پارامتری نمایهٔ Safetensors",
      "value": {
        "state": "known",
        "value": 27.781427952,
        "evidenceIds": [
          "evidence:v03-7f8be85de2b32906d5"
        ],
        "unit": "billion-parameters",
        "note": "نمایهٔ فایل وزن؛ برای وزن کوانت‌شده یا اشتراک وزن، الزاماً شمار پارامتر مستقل نیست."
      },
      "approximate": false
    }
  ],
  "contextExtension": {
    "capacity": {
      "state": "known",
      "value": 1000000,
      "evidenceIds": [
        "evidence:qwen-qwen3-8-27b-card"
      ],
      "unit": "token"
    },
    "condition": "افزایش زمینه با YaRN"
  }
});
models.push({
  "id": "model:allenai-olmo-3-7b-instruct",
  "familyId": "family:olmo",
  "exactName": "Olmo-3-7B-Instruct",
  "publisher": "Allen Institute for AI",
  "version": "6e5971d9eba42665f5bd5a0fcf047f299ce1dccc",
  "aliases": [
    "allenai/Olmo-3-7B-Instruct"
  ],
  "stage": "instruct",
  "architecture": "dense",
  "totalParametersB": {
    "state": "known",
    "value": 7,
    "evidenceIds": [
      "evidence:allenai-olmo-3-7b-instruct-parameters"
    ],
    "unit": "billion-parameters",
    "note": "اعداد پارامتر معرفی مدل، گرد‌شده‌اند؛ safetensors.total شمار عناصر ذخیره‌شده است و الزاماً پارامتر یکتا نیست."
  },
  "activeParametersB": {
    "state": "not-applicable"
  },
  "kind": "generative",
  "inputModalities": [
    "text"
  ],
  "outputModalities": [
    "text"
  ],
  "applications": [
    "text-work",
    "enterprise-rag",
    "structured-extraction",
    "coding-assistant",
    "agents-tools"
  ],
  "languages": [
    {
      "language": "en",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-ae5d503e77194daf65"
        ]
      }
    }
  ],
  "persianEvidenceStatus": "not-evaluated",
  "declaredContext": {
    "state": "known",
    "value": 65536,
    "evidenceIds": [
      "evidence:v03-596db5f769e587d893"
    ],
    "unit": "token",
    "note": "حد پیکربندی منتشرشده؛ ورودی و خروجی و نشانه‌های ویژه از همین بودجه استفاده می‌کنند."
  },
  "evaluatedContext": {
    "state": "not-measured"
  },
  "releaseStatus": "available",
  "lastReviewedOn": "2026-09-15",
  "license": {
    "name": {
      "state": "known",
      "value": "Apache-2.0",
      "evidenceIds": [
        "evidence:allenai-olmo-3-7b-instruct-license"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://huggingface.co/allenai/Olmo-3-7B-Instruct/blob/6e5971d9eba42665f5bd5a0fcf047f299ce1dccc/README.md",
      "evidenceIds": [
        "evidence:allenai-olmo-3-7b-instruct-license"
      ]
    },
    "commercialUse": {
      "state": "known",
      "value": "allowed",
      "evidenceIds": [
        "evidence:allenai-olmo-3-7b-instruct-license"
      ]
    },
    "restrictions": [],
    "evidenceIds": [
      "evidence:allenai-olmo-3-7b-instruct-license"
    ]
  },
  "evidenceIds": [
    "evidence:allenai-olmo-3-7b-instruct-card",
    "evidence:allenai-olmo-3-7b-instruct-metadata",
    "evidence:allenai-olmo-3-7b-instruct-parameters",
    "evidence:allenai-olmo-3-7b-instruct-license",
    "evidence:allenai-olmo-3-7b-instruct-config",
    "evidence:four-tables-release-olmo-3-7b-instruct-release",
    "evidence:v03-596db5f769e587d893",
    "evidence:v03-ae5d503e77194daf65",
    "evidence:v03-7367d81634c9c1999e"
  ],
  "releasedOn": "2025-11-20",
  "parameterCounts": [
    {
      "scope": "total",
      "label": "شمار کل اعلام‌شده",
      "value": {
        "state": "known",
        "value": 7,
        "evidenceIds": [
          "evidence:allenai-olmo-3-7b-instruct-parameters"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "stored",
      "label": "تعداد عناصر پارامتری نمایهٔ Safetensors",
      "value": {
        "state": "known",
        "value": 7.298011136,
        "evidenceIds": [
          "evidence:v03-ae5d503e77194daf65"
        ],
        "unit": "billion-parameters",
        "note": "نمایهٔ فایل وزن؛ برای وزن کوانت‌شده یا اشتراک وزن، الزاماً شمار پارامتر مستقل نیست."
      },
      "approximate": false
    }
  ]
});
models.push({
  "id": "model:deepseek-ai-deepseek-r1-0528-qwen3-8b",
  "familyId": "family:deepseek",
  "exactName": "DeepSeek-R1-0528-Qwen3-8B",
  "publisher": "DeepSeek",
  "version": "6e8885a6ff5c1dc5201574c8fd700323f23c25fa",
  "aliases": [
    "deepseek-ai/DeepSeek-R1-0528-Qwen3-8B"
  ],
  "stage": "distilled",
  "architecture": "dense",
  "totalParametersB": {
    "state": "known",
    "value": 8,
    "evidenceIds": [
      "evidence:deepseek-ai-deepseek-r1-0528-qwen3-8b-parameters"
    ],
    "unit": "billion-parameters",
    "note": "اعداد پارامتر معرفی مدل، گرد‌شده‌اند؛ safetensors.total شمار عناصر ذخیره‌شده است و الزاماً پارامتر یکتا نیست."
  },
  "activeParametersB": {
    "state": "not-applicable"
  },
  "kind": "generative",
  "inputModalities": [
    "text"
  ],
  "outputModalities": [
    "text"
  ],
  "applications": [
    "text-work",
    "coding-assistant",
    "reasoning-analysis",
    "enterprise-rag",
    "structured-extraction",
    "agents-tools"
  ],
  "languages": [],
  "persianEvidenceStatus": "not-evaluated",
  "declaredContext": {
    "state": "known",
    "value": 131072,
    "evidenceIds": [
      "evidence:v03-35c60bc073f975a1e0"
    ],
    "unit": "token",
    "note": "حد پیکربندی منتشرشده؛ ورودی و خروجی و نشانه‌های ویژه از همین بودجه استفاده می‌کنند."
  },
  "evaluatedContext": {
    "state": "not-measured"
  },
  "releaseStatus": "available",
  "lastReviewedOn": "2026-09-15",
  "license": {
    "name": {
      "state": "known",
      "value": "MIT",
      "evidenceIds": [
        "evidence:deepseek-ai-deepseek-r1-0528-qwen3-8b-license"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://huggingface.co/deepseek-ai/DeepSeek-R1-0528-Qwen3-8B/blob/6e8885a6ff5c1dc5201574c8fd700323f23c25fa/README.md",
      "evidenceIds": [
        "evidence:deepseek-ai-deepseek-r1-0528-qwen3-8b-license"
      ]
    },
    "commercialUse": {
      "state": "known",
      "value": "allowed",
      "evidenceIds": [
        "evidence:deepseek-ai-deepseek-r1-0528-qwen3-8b-license"
      ]
    },
    "restrictions": [],
    "evidenceIds": [
      "evidence:deepseek-ai-deepseek-r1-0528-qwen3-8b-license"
    ]
  },
  "evidenceIds": [
    "evidence:deepseek-ai-deepseek-r1-0528-qwen3-8b-card",
    "evidence:deepseek-ai-deepseek-r1-0528-qwen3-8b-metadata",
    "evidence:deepseek-ai-deepseek-r1-0528-qwen3-8b-parameters",
    "evidence:deepseek-ai-deepseek-r1-0528-qwen3-8b-license",
    "evidence:deepseek-ai-deepseek-r1-0528-qwen3-8b-config",
    "evidence:four-tables-release-deepseek-r1-0528-qwen3-8b-release",
    "evidence:v03-35c60bc073f975a1e0",
    "evidence:v03-85cc9f3b5064833673"
  ],
  "releasedOn": "2025-05-28",
  "parameterCounts": [
    {
      "scope": "total",
      "label": "شمار کل اعلام‌شده",
      "value": {
        "state": "known",
        "value": 8,
        "evidenceIds": [
          "evidence:deepseek-ai-deepseek-r1-0528-qwen3-8b-parameters"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "stored",
      "label": "تعداد عناصر پارامتری نمایهٔ Safetensors",
      "value": {
        "state": "known",
        "value": 8.19073536,
        "evidenceIds": [
          "evidence:v03-9e630b4d9f4d397348"
        ],
        "unit": "billion-parameters",
        "note": "نمایهٔ فایل وزن؛ برای وزن کوانت‌شده یا اشتراک وزن، الزاماً شمار پارامتر مستقل نیست."
      },
      "approximate": false
    }
  ]
});
models.push({
  "id": "model:deepseek-ai-deepseek-r1-distill-llama-70b",
  "familyId": "family:deepseek",
  "exactName": "DeepSeek-R1-Distill-Llama-70B",
  "publisher": "DeepSeek",
  "version": "b1c0b44b4369b597ad119a196caf79a9c40e141e",
  "aliases": [
    "deepseek-ai/DeepSeek-R1-Distill-Llama-70B"
  ],
  "stage": "distilled",
  "architecture": "dense",
  "totalParametersB": {
    "state": "known",
    "value": 70,
    "evidenceIds": [
      "evidence:deepseek-ai-deepseek-r1-distill-llama-70b-parameters"
    ],
    "unit": "billion-parameters",
    "note": "اعداد پارامتر معرفی مدل، گرد‌شده‌اند؛ safetensors.total شمار عناصر ذخیره‌شده است و الزاماً پارامتر یکتا نیست."
  },
  "activeParametersB": {
    "state": "not-applicable"
  },
  "kind": "generative",
  "inputModalities": [
    "text"
  ],
  "outputModalities": [
    "text"
  ],
  "applications": [
    "text-work",
    "coding-assistant",
    "reasoning-analysis",
    "enterprise-rag",
    "structured-extraction"
  ],
  "languages": [],
  "persianEvidenceStatus": "not-evaluated",
  "declaredContext": {
    "state": "known",
    "value": 131072,
    "evidenceIds": [
      "evidence:v03-32f5f285749646ae0a"
    ],
    "unit": "token",
    "note": "حد پیکربندی منتشرشده؛ ورودی و خروجی و نشانه‌های ویژه از همین بودجه استفاده می‌کنند."
  },
  "evaluatedContext": {
    "state": "not-measured"
  },
  "releaseStatus": "available",
  "lastReviewedOn": "2026-09-15",
  "license": {
    "name": {
      "state": "known",
      "value": "MIT + underlying Llama 3.3 terms",
      "evidenceIds": [
        "evidence:deepseek-ai-deepseek-r1-distill-llama-70b-license"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Llama-70B/blob/b1c0b44b4369b597ad119a196caf79a9c40e141e/README.md",
      "evidenceIds": [
        "evidence:deepseek-ai-deepseek-r1-distill-llama-70b-license"
      ]
    },
    "commercialUse": {
      "state": "unknown",
      "note": "مجوز MIT ناشر همراه با شروط مدل پایهٔ Llama 3.3 اعمال می‌شود."
    },
    "restrictions": [
      "مدل پایه Llama 3.3 است؛ مجوز مدل پایه با MIT جایگزین نمی‌شود."
    ],
    "evidenceIds": [
      "evidence:deepseek-ai-deepseek-r1-distill-llama-70b-license"
    ]
  },
  "evidenceIds": [
    "evidence:deepseek-ai-deepseek-r1-distill-llama-70b-card",
    "evidence:deepseek-ai-deepseek-r1-distill-llama-70b-metadata",
    "evidence:deepseek-ai-deepseek-r1-distill-llama-70b-parameters",
    "evidence:deepseek-ai-deepseek-r1-distill-llama-70b-license",
    "evidence:deepseek-ai-deepseek-r1-distill-llama-70b-config",
    "evidence:four-tables-release-deepseek-r1-distilled-release",
    "evidence:v03-32f5f285749646ae0a",
    "evidence:v03-6f0d230842d2e501bf"
  ],
  "releasedOn": "2025-01-20",
  "parameterCounts": [
    {
      "scope": "total",
      "label": "شمار کل اعلام‌شده",
      "value": {
        "state": "known",
        "value": 70,
        "evidenceIds": [
          "evidence:deepseek-ai-deepseek-r1-distill-llama-70b-parameters"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "stored",
      "label": "تعداد عناصر پارامتری نمایهٔ Safetensors",
      "value": {
        "state": "known",
        "value": 70.553706496,
        "evidenceIds": [
          "evidence:v03-82cff004001765bc44"
        ],
        "unit": "billion-parameters",
        "note": "نمایهٔ فایل وزن؛ برای وزن کوانت‌شده یا اشتراک وزن، الزاماً شمار پارامتر مستقل نیست."
      },
      "approximate": false
    }
  ]
});
models.push({
  "id": "model:deepseek-ai-deepseek-r1-distill-qwen-1-5b",
  "familyId": "family:deepseek",
  "exactName": "DeepSeek-R1-Distill-Qwen-1.5B",
  "publisher": "DeepSeek",
  "version": "ad9f0ae0864d7fbcd1cd905e3c6c5b069cc8b562",
  "aliases": [
    "deepseek-ai/DeepSeek-R1-Distill-Qwen-1.5B"
  ],
  "stage": "distilled",
  "architecture": "dense",
  "totalParametersB": {
    "state": "known",
    "value": 1.5,
    "evidenceIds": [
      "evidence:deepseek-ai-deepseek-r1-distill-qwen-1-5b-parameters"
    ],
    "unit": "billion-parameters",
    "note": "اعداد پارامتر معرفی مدل، گرد‌شده‌اند؛ safetensors.total شمار عناصر ذخیره‌شده است و الزاماً پارامتر یکتا نیست."
  },
  "activeParametersB": {
    "state": "not-applicable"
  },
  "kind": "generative",
  "inputModalities": [
    "text"
  ],
  "outputModalities": [
    "text"
  ],
  "applications": [
    "text-work",
    "coding-assistant",
    "reasoning-analysis",
    "enterprise-rag",
    "structured-extraction"
  ],
  "languages": [],
  "persianEvidenceStatus": "not-evaluated",
  "declaredContext": {
    "state": "known",
    "value": 131072,
    "evidenceIds": [
      "evidence:v03-a4a53b81a12c832e9a"
    ],
    "unit": "token",
    "note": "حد پیکربندی منتشرشده؛ ورودی و خروجی و نشانه‌های ویژه از همین بودجه استفاده می‌کنند."
  },
  "evaluatedContext": {
    "state": "not-measured"
  },
  "releaseStatus": "available",
  "lastReviewedOn": "2026-09-15",
  "license": {
    "name": {
      "state": "known",
      "value": "MIT",
      "evidenceIds": [
        "evidence:deepseek-ai-deepseek-r1-distill-qwen-1-5b-license"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Qwen-1.5B/blob/ad9f0ae0864d7fbcd1cd905e3c6c5b069cc8b562/README.md",
      "evidenceIds": [
        "evidence:deepseek-ai-deepseek-r1-distill-qwen-1-5b-license"
      ]
    },
    "commercialUse": {
      "state": "known",
      "value": "allowed",
      "evidenceIds": [
        "evidence:deepseek-ai-deepseek-r1-distill-qwen-1-5b-license"
      ]
    },
    "restrictions": [],
    "evidenceIds": [
      "evidence:deepseek-ai-deepseek-r1-distill-qwen-1-5b-license"
    ]
  },
  "evidenceIds": [
    "evidence:deepseek-ai-deepseek-r1-distill-qwen-1-5b-card",
    "evidence:deepseek-ai-deepseek-r1-distill-qwen-1-5b-metadata",
    "evidence:deepseek-ai-deepseek-r1-distill-qwen-1-5b-parameters",
    "evidence:deepseek-ai-deepseek-r1-distill-qwen-1-5b-license",
    "evidence:deepseek-ai-deepseek-r1-distill-qwen-1-5b-config",
    "evidence:four-tables-release-deepseek-r1-distilled-release",
    "evidence:v03-a4a53b81a12c832e9a",
    "evidence:v03-d1dcd8b370f21f76e7"
  ],
  "releasedOn": "2025-01-20",
  "parameterCounts": [
    {
      "scope": "total",
      "label": "شمار کل اعلام‌شده",
      "value": {
        "state": "known",
        "value": 1.5,
        "evidenceIds": [
          "evidence:deepseek-ai-deepseek-r1-distill-qwen-1-5b-parameters"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "stored",
      "label": "تعداد عناصر پارامتری نمایهٔ Safetensors",
      "value": {
        "state": "known",
        "value": 1.777088,
        "evidenceIds": [
          "evidence:v03-1daa709bcb6d3d6061"
        ],
        "unit": "billion-parameters",
        "note": "نمایهٔ فایل وزن؛ برای وزن کوانت‌شده یا اشتراک وزن، الزاماً شمار پارامتر مستقل نیست."
      },
      "approximate": false
    }
  ]
});
models.push({
  "id": "model:deepseek-ai-deepseek-r1-distill-qwen-14b",
  "familyId": "family:deepseek",
  "exactName": "DeepSeek-R1-Distill-Qwen-14B",
  "publisher": "DeepSeek",
  "version": "1df8507178afcc1bef68cd8c393f61a886323761",
  "aliases": [
    "deepseek-ai/DeepSeek-R1-Distill-Qwen-14B"
  ],
  "stage": "distilled",
  "architecture": "dense",
  "totalParametersB": {
    "state": "known",
    "value": 14,
    "evidenceIds": [
      "evidence:deepseek-ai-deepseek-r1-distill-qwen-14b-parameters"
    ],
    "unit": "billion-parameters",
    "note": "اعداد پارامتر معرفی مدل، گرد‌شده‌اند؛ safetensors.total شمار عناصر ذخیره‌شده است و الزاماً پارامتر یکتا نیست."
  },
  "activeParametersB": {
    "state": "not-applicable"
  },
  "kind": "generative",
  "inputModalities": [
    "text"
  ],
  "outputModalities": [
    "text"
  ],
  "applications": [
    "text-work",
    "coding-assistant",
    "reasoning-analysis",
    "enterprise-rag",
    "structured-extraction"
  ],
  "languages": [],
  "persianEvidenceStatus": "not-evaluated",
  "declaredContext": {
    "state": "known",
    "value": 131072,
    "evidenceIds": [
      "evidence:v03-14d4b72d5aed0079c0"
    ],
    "unit": "token",
    "note": "حد پیکربندی منتشرشده؛ ورودی و خروجی و نشانه‌های ویژه از همین بودجه استفاده می‌کنند."
  },
  "evaluatedContext": {
    "state": "not-measured"
  },
  "releaseStatus": "available",
  "lastReviewedOn": "2026-09-15",
  "license": {
    "name": {
      "state": "known",
      "value": "MIT",
      "evidenceIds": [
        "evidence:deepseek-ai-deepseek-r1-distill-qwen-14b-license"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Qwen-14B/blob/1df8507178afcc1bef68cd8c393f61a886323761/README.md",
      "evidenceIds": [
        "evidence:deepseek-ai-deepseek-r1-distill-qwen-14b-license"
      ]
    },
    "commercialUse": {
      "state": "known",
      "value": "allowed",
      "evidenceIds": [
        "evidence:deepseek-ai-deepseek-r1-distill-qwen-14b-license"
      ]
    },
    "restrictions": [],
    "evidenceIds": [
      "evidence:deepseek-ai-deepseek-r1-distill-qwen-14b-license"
    ]
  },
  "evidenceIds": [
    "evidence:deepseek-ai-deepseek-r1-distill-qwen-14b-card",
    "evidence:deepseek-ai-deepseek-r1-distill-qwen-14b-metadata",
    "evidence:deepseek-ai-deepseek-r1-distill-qwen-14b-parameters",
    "evidence:deepseek-ai-deepseek-r1-distill-qwen-14b-license",
    "evidence:deepseek-ai-deepseek-r1-distill-qwen-14b-config",
    "evidence:four-tables-release-deepseek-r1-distilled-release",
    "evidence:v03-14d4b72d5aed0079c0",
    "evidence:v03-f7b9b749f262729f2d"
  ],
  "releasedOn": "2025-01-20",
  "parameterCounts": [
    {
      "scope": "total",
      "label": "شمار کل اعلام‌شده",
      "value": {
        "state": "known",
        "value": 14,
        "evidenceIds": [
          "evidence:deepseek-ai-deepseek-r1-distill-qwen-14b-parameters"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "stored",
      "label": "تعداد عناصر پارامتری نمایهٔ Safetensors",
      "value": {
        "state": "known",
        "value": 14.770033664,
        "evidenceIds": [
          "evidence:v03-497fb15a5fa2e0e5de"
        ],
        "unit": "billion-parameters",
        "note": "نمایهٔ فایل وزن؛ برای وزن کوانت‌شده یا اشتراک وزن، الزاماً شمار پارامتر مستقل نیست."
      },
      "approximate": false
    }
  ]
});
models.push({
  "id": "model:deepseek-ai-deepseek-r1-distill-qwen-32b",
  "familyId": "family:deepseek",
  "exactName": "DeepSeek-R1-Distill-Qwen-32B",
  "publisher": "DeepSeek",
  "version": "711ad2ea6aa40cfca18895e8aca02ab92df1a746",
  "aliases": [
    "deepseek-ai/DeepSeek-R1-Distill-Qwen-32B"
  ],
  "stage": "distilled",
  "architecture": "dense",
  "totalParametersB": {
    "state": "known",
    "value": 32,
    "evidenceIds": [
      "evidence:deepseek-ai-deepseek-r1-distill-qwen-32b-parameters"
    ],
    "unit": "billion-parameters",
    "note": "اعداد پارامتر معرفی مدل، گرد‌شده‌اند؛ safetensors.total شمار عناصر ذخیره‌شده است و الزاماً پارامتر یکتا نیست."
  },
  "activeParametersB": {
    "state": "not-applicable"
  },
  "kind": "generative",
  "inputModalities": [
    "text"
  ],
  "outputModalities": [
    "text"
  ],
  "applications": [
    "text-work",
    "coding-assistant",
    "reasoning-analysis",
    "enterprise-rag",
    "structured-extraction"
  ],
  "languages": [],
  "persianEvidenceStatus": "not-evaluated",
  "declaredContext": {
    "state": "known",
    "value": 131072,
    "evidenceIds": [
      "evidence:v03-4c1b389bda36dcd44f"
    ],
    "unit": "token",
    "note": "حد پیکربندی منتشرشده؛ ورودی و خروجی و نشانه‌های ویژه از همین بودجه استفاده می‌کنند."
  },
  "evaluatedContext": {
    "state": "not-measured"
  },
  "releaseStatus": "available",
  "lastReviewedOn": "2026-09-15",
  "license": {
    "name": {
      "state": "known",
      "value": "MIT",
      "evidenceIds": [
        "evidence:deepseek-ai-deepseek-r1-distill-qwen-32b-license"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Qwen-32B/blob/711ad2ea6aa40cfca18895e8aca02ab92df1a746/README.md",
      "evidenceIds": [
        "evidence:deepseek-ai-deepseek-r1-distill-qwen-32b-license"
      ]
    },
    "commercialUse": {
      "state": "known",
      "value": "allowed",
      "evidenceIds": [
        "evidence:deepseek-ai-deepseek-r1-distill-qwen-32b-license"
      ]
    },
    "restrictions": [],
    "evidenceIds": [
      "evidence:deepseek-ai-deepseek-r1-distill-qwen-32b-license"
    ]
  },
  "evidenceIds": [
    "evidence:deepseek-ai-deepseek-r1-distill-qwen-32b-card",
    "evidence:deepseek-ai-deepseek-r1-distill-qwen-32b-metadata",
    "evidence:deepseek-ai-deepseek-r1-distill-qwen-32b-parameters",
    "evidence:deepseek-ai-deepseek-r1-distill-qwen-32b-license",
    "evidence:deepseek-ai-deepseek-r1-distill-qwen-32b-config",
    "evidence:four-tables-release-deepseek-r1-distilled-release",
    "evidence:v03-4c1b389bda36dcd44f",
    "evidence:v03-653e71cc77765cd433"
  ],
  "releasedOn": "2025-01-20",
  "parameterCounts": [
    {
      "scope": "total",
      "label": "شمار کل اعلام‌شده",
      "value": {
        "state": "known",
        "value": 32,
        "evidenceIds": [
          "evidence:deepseek-ai-deepseek-r1-distill-qwen-32b-parameters"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "stored",
      "label": "تعداد عناصر پارامتری نمایهٔ Safetensors",
      "value": {
        "state": "known",
        "value": 32.763876352,
        "evidenceIds": [
          "evidence:v03-6bdfd6be002fb9578f"
        ],
        "unit": "billion-parameters",
        "note": "نمایهٔ فایل وزن؛ برای وزن کوانت‌شده یا اشتراک وزن، الزاماً شمار پارامتر مستقل نیست."
      },
      "approximate": false
    }
  ]
});
models.push({
  "id": "model:deepseek-ai-deepseek-r1-distill-qwen-7b",
  "familyId": "family:deepseek",
  "exactName": "DeepSeek-R1-Distill-Qwen-7B",
  "publisher": "DeepSeek",
  "version": "916b56a44061fd5cd7d6a8fb632557ed4f724f60",
  "aliases": [
    "deepseek-ai/DeepSeek-R1-Distill-Qwen-7B"
  ],
  "stage": "distilled",
  "architecture": "dense",
  "totalParametersB": {
    "state": "known",
    "value": 7,
    "evidenceIds": [
      "evidence:deepseek-ai-deepseek-r1-distill-qwen-7b-parameters"
    ],
    "unit": "billion-parameters",
    "note": "اعداد پارامتر معرفی مدل، گرد‌شده‌اند؛ safetensors.total شمار عناصر ذخیره‌شده است و الزاماً پارامتر یکتا نیست."
  },
  "activeParametersB": {
    "state": "not-applicable"
  },
  "kind": "generative",
  "inputModalities": [
    "text"
  ],
  "outputModalities": [
    "text"
  ],
  "applications": [
    "text-work",
    "coding-assistant",
    "reasoning-analysis",
    "enterprise-rag",
    "structured-extraction"
  ],
  "languages": [],
  "persianEvidenceStatus": "not-evaluated",
  "declaredContext": {
    "state": "known",
    "value": 131072,
    "evidenceIds": [
      "evidence:v03-e335aade06b5f1bf43"
    ],
    "unit": "token",
    "note": "حد پیکربندی منتشرشده؛ ورودی و خروجی و نشانه‌های ویژه از همین بودجه استفاده می‌کنند."
  },
  "evaluatedContext": {
    "state": "not-measured"
  },
  "releaseStatus": "available",
  "lastReviewedOn": "2026-09-15",
  "license": {
    "name": {
      "state": "known",
      "value": "MIT",
      "evidenceIds": [
        "evidence:deepseek-ai-deepseek-r1-distill-qwen-7b-license"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Qwen-7B/blob/916b56a44061fd5cd7d6a8fb632557ed4f724f60/README.md",
      "evidenceIds": [
        "evidence:deepseek-ai-deepseek-r1-distill-qwen-7b-license"
      ]
    },
    "commercialUse": {
      "state": "known",
      "value": "allowed",
      "evidenceIds": [
        "evidence:deepseek-ai-deepseek-r1-distill-qwen-7b-license"
      ]
    },
    "restrictions": [],
    "evidenceIds": [
      "evidence:deepseek-ai-deepseek-r1-distill-qwen-7b-license"
    ]
  },
  "evidenceIds": [
    "evidence:deepseek-ai-deepseek-r1-distill-qwen-7b-card",
    "evidence:deepseek-ai-deepseek-r1-distill-qwen-7b-metadata",
    "evidence:deepseek-ai-deepseek-r1-distill-qwen-7b-parameters",
    "evidence:deepseek-ai-deepseek-r1-distill-qwen-7b-license",
    "evidence:deepseek-ai-deepseek-r1-distill-qwen-7b-config",
    "evidence:four-tables-release-deepseek-r1-distilled-release",
    "evidence:v03-e335aade06b5f1bf43",
    "evidence:v03-6094f3fa17206810f9"
  ],
  "releasedOn": "2025-01-20",
  "parameterCounts": [
    {
      "scope": "total",
      "label": "شمار کل اعلام‌شده",
      "value": {
        "state": "known",
        "value": 7,
        "evidenceIds": [
          "evidence:deepseek-ai-deepseek-r1-distill-qwen-7b-parameters"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "stored",
      "label": "تعداد عناصر پارامتری نمایهٔ Safetensors",
      "value": {
        "state": "known",
        "value": 7.615616512,
        "evidenceIds": [
          "evidence:v03-06dc9aef5d9e0da145"
        ],
        "unit": "billion-parameters",
        "note": "نمایهٔ فایل وزن؛ برای وزن کوانت‌شده یا اشتراک وزن، الزاماً شمار پارامتر مستقل نیست."
      },
      "approximate": false
    }
  ]
});
models.push({
  "id": "model:deepseek-ai-deepseek-v3-2",
  "familyId": "family:deepseek",
  "exactName": "DeepSeek-V3.2",
  "publisher": "DeepSeek",
  "version": "a7e62ac04ecb2c0a54d736dc46601c5606cf10a6",
  "aliases": [
    "deepseek-ai/DeepSeek-V3.2"
  ],
  "stage": "reasoning",
  "architecture": "moe",
  "totalParametersB": {
    "state": "unknown",
    "note": "شمار کل با دامنهٔ یکنواخت تأیید نشده؛ شمار جزء زبانی، فعال یا ذخیره‌شده جای آن ننشسته است.",
    "evidenceIds": [
      "evidence:deepseek-ai-deepseek-v3-2-parameters",
      "evidence:deepseek-ai-deepseek-v3-2-metadata"
    ]
  },
  "activeParametersB": {
    "state": "unknown",
    "note": "شمار فعال دقیق این گونه و فاز اجرا تأیید نشده است.",
    "evidenceIds": [
      "evidence:deepseek-ai-deepseek-v3-2-parameters"
    ]
  },
  "kind": "generative",
  "inputModalities": [
    "text"
  ],
  "outputModalities": [
    "text"
  ],
  "applications": [
    "text-work",
    "coding-assistant",
    "reasoning-analysis",
    "enterprise-rag",
    "structured-extraction",
    "agents-tools"
  ],
  "languages": [],
  "persianEvidenceStatus": "not-evaluated",
  "declaredContext": {
    "state": "known",
    "value": 163840,
    "evidenceIds": [
      "evidence:v03-80fe24ad1bb48d5554"
    ],
    "unit": "token",
    "note": "حد پیکربندی منتشرشده؛ ورودی و خروجی و نشانه‌های ویژه از همین بودجه استفاده می‌کنند."
  },
  "evaluatedContext": {
    "state": "not-measured"
  },
  "releaseStatus": "available",
  "lastReviewedOn": "2026-09-15",
  "license": {
    "name": {
      "state": "known",
      "value": "MIT",
      "evidenceIds": [
        "evidence:deepseek-ai-deepseek-v3-2-license"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://huggingface.co/deepseek-ai/DeepSeek-V3.2/blob/a7e62ac04ecb2c0a54d736dc46601c5606cf10a6/README.md",
      "evidenceIds": [
        "evidence:deepseek-ai-deepseek-v3-2-license"
      ]
    },
    "commercialUse": {
      "state": "known",
      "value": "allowed",
      "evidenceIds": [
        "evidence:deepseek-ai-deepseek-v3-2-license"
      ]
    },
    "restrictions": [],
    "evidenceIds": [
      "evidence:deepseek-ai-deepseek-v3-2-license"
    ]
  },
  "evidenceIds": [
    "evidence:deepseek-ai-deepseek-v3-2-card",
    "evidence:deepseek-ai-deepseek-v3-2-metadata",
    "evidence:deepseek-ai-deepseek-v3-2-parameters",
    "evidence:deepseek-ai-deepseek-v3-2-license",
    "evidence:deepseek-ai-deepseek-v3-2-config",
    "evidence:four-tables-release-deepseek-v3-2-release",
    "evidence:v03-80fe24ad1bb48d5554",
    "evidence:v03-d2be656087cfb13604"
  ],
  "releasedOn": "2025-12-01",
  "parameterCounts": [
    {
      "scope": "stored",
      "label": "تعداد عناصر پارامتری نمایهٔ Safetensors",
      "value": {
        "state": "known",
        "value": 685.396921376,
        "evidenceIds": [
          "evidence:v03-65584e0b8b4b847353"
        ],
        "unit": "billion-parameters",
        "note": "نمایهٔ فایل وزن؛ برای وزن کوانت‌شده یا اشتراک وزن، الزاماً شمار پارامتر مستقل نیست."
      },
      "approximate": false
    }
  ]
});
models.push({
  "id": "model:deepseek-ai-deepseek-v4-1-flash",
  "familyId": "family:deepseek",
  "exactName": "DeepSeek-V4.1-Flash",
  "publisher": "DeepSeek",
  "version": "dba1be0a40aa45a94ad051997016db3960a90277",
  "aliases": [
    "deepseek-ai/DeepSeek-V4.1-Flash"
  ],
  "stage": "instruct",
  "architecture": "hybrid",
  "totalParametersB": {
    "state": "unknown",
    "note": "شمار کل با دامنهٔ یکنواخت تأیید نشده؛ شمار جزء زبانی، فعال یا ذخیره‌شده جای آن ننشسته است.",
    "evidenceIds": [
      "evidence:deepseek-ai-deepseek-v4-1-flash-parameters",
      "evidence:deepseek-ai-deepseek-v4-1-flash-metadata"
    ]
  },
  "activeParametersB": {
    "state": "unknown",
    "note": "شمار فعال دقیق این گونه و فاز اجرا تأیید نشده است.",
    "evidenceIds": [
      "evidence:deepseek-ai-deepseek-v4-1-flash-parameters"
    ]
  },
  "kind": "vision-language",
  "inputModalities": [
    "text",
    "image"
  ],
  "outputModalities": [
    "text"
  ],
  "applications": [
    "text-work",
    "coding-assistant",
    "reasoning-analysis",
    "document-vision",
    "enterprise-rag",
    "structured-extraction",
    "agents-tools"
  ],
  "languages": [],
  "persianEvidenceStatus": "not-evaluated",
  "declaredContext": {
    "state": "known",
    "value": 1000000,
    "evidenceIds": [
      "evidence:four-tables-deepseek-ai-deepseek-v4-1-flash-declared-context"
    ],
    "unit": "token",
    "note": "ظرفیت اعلام‌شدهٔ ناشر؛ حداقل حافظه یا تضمین کیفیت بلندمتن نیست."
  },
  "evaluatedContext": {
    "state": "not-measured"
  },
  "releaseStatus": "available",
  "lastReviewedOn": "2026-09-15",
  "license": {
    "name": {
      "state": "known",
      "value": "MIT",
      "evidenceIds": [
        "evidence:deepseek-ai-deepseek-v4-1-flash-license"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash/blob/dba1be0a40aa45a94ad051997016db3960a90277/README.md",
      "evidenceIds": [
        "evidence:deepseek-ai-deepseek-v4-1-flash-license"
      ]
    },
    "commercialUse": {
      "state": "known",
      "value": "allowed",
      "evidenceIds": [
        "evidence:deepseek-ai-deepseek-v4-1-flash-license"
      ]
    },
    "restrictions": [],
    "evidenceIds": [
      "evidence:deepseek-ai-deepseek-v4-1-flash-license"
    ]
  },
  "evidenceIds": [
    "evidence:deepseek-ai-deepseek-v4-1-flash-card",
    "evidence:deepseek-ai-deepseek-v4-1-flash-metadata",
    "evidence:deepseek-ai-deepseek-v4-1-flash-parameters",
    "evidence:deepseek-ai-deepseek-v4-1-flash-license",
    "evidence:deepseek-ai-deepseek-v4-1-flash-config",
    "evidence:four-tables-release-deepseek-v4-1-flash-release",
    "evidence:four-tables-deepseek-ai-deepseek-v4-1-flash-declared-context",
    "evidence:v03-96e933b164bfc6658d"
  ],
  "releasedOn": "2026-09-10",
  "parameterCounts": [
    {
      "scope": "other",
      "label": "بدنهٔ اصلی",
      "value": {
        "state": "known",
        "value": 552,
        "evidenceIds": [
          "evidence:deepseek-ai-deepseek-v4-1-flash-card"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "other",
      "label": "حافظهٔ شرطی Engram",
      "value": {
        "state": "known",
        "value": 196,
        "evidenceIds": [
          "evidence:deepseek-ai-deepseek-v4-1-flash-card"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "active",
      "label": "فعال هنگام prefill",
      "value": {
        "state": "known",
        "value": 8,
        "evidenceIds": [
          "evidence:deepseek-ai-deepseek-v4-1-flash-card"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "active",
      "label": "فعال هنگام decode",
      "value": {
        "state": "known",
        "value": 16,
        "evidenceIds": [
          "evidence:deepseek-ai-deepseek-v4-1-flash-card"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "stored",
      "label": "تعداد عناصر پارامتری نمایهٔ Safetensors",
      "value": {
        "state": "known",
        "value": 763.205315794,
        "evidenceIds": [
          "evidence:v03-8819dbc2bfd569f326"
        ],
        "unit": "billion-parameters",
        "note": "نمایهٔ فایل وزن؛ برای وزن کوانت‌شده یا اشتراک وزن، الزاماً شمار پارامتر مستقل نیست."
      },
      "approximate": false
    }
  ]
});
models.push({
  "id": "model:google-gemma-3-12b-it",
  "familyId": "family:gemma",
  "exactName": "gemma-3-12b-it",
  "publisher": "Google DeepMind",
  "version": "96b6f1eccf38110c56df3a15bffe176da04bfd80",
  "aliases": [
    "google/gemma-3-12b-it"
  ],
  "stage": "instruct",
  "architecture": "dense",
  "totalParametersB": {
    "state": "known",
    "value": 12,
    "evidenceIds": [
      "evidence:google-gemma-3-12b-it-parameters"
    ],
    "unit": "billion-parameters",
    "note": "اعداد پارامتر معرفی مدل، گرد‌شده‌اند؛ safetensors.total شمار عناصر ذخیره‌شده است و الزاماً پارامتر یکتا نیست. اندازهٔ اسمی گونهٔ چندوجهی است؛ اجزای تصویر جداگانه اندازه‌گیری نشده‌اند."
  },
  "activeParametersB": {
    "state": "not-applicable"
  },
  "kind": "vision-language",
  "inputModalities": [
    "text",
    "image"
  ],
  "outputModalities": [
    "text"
  ],
  "applications": [
    "text-work",
    "document-vision",
    "enterprise-rag",
    "structured-extraction",
    "coding-assistant"
  ],
  "languages": [
    {
      "language": "multilingual",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-a585b339d8df0103fa"
        ]
      }
    }
  ],
  "persianEvidenceStatus": "not-evaluated",
  "declaredContext": {
    "state": "known",
    "value": 131072,
    "evidenceIds": [
      "evidence:google-gemma-3-12b-it-context"
    ],
    "unit": "token",
    "note": "ظرفیت اعلام‌شدهٔ ناشر؛ ارزیابی کیفیت بلندمتن در این بسته ثبت نشده است. کارت طول ورودی و سقف خروجی را جدا گزارش می‌کند؛ سقف خروجی را به پنجره اضافه نکنید."
  },
  "evaluatedContext": {
    "state": "not-measured"
  },
  "releaseStatus": "available",
  "lastReviewedOn": "2026-09-15",
  "license": {
    "name": {
      "state": "known",
      "value": "gemma",
      "evidenceIds": [
        "evidence:google-gemma-3-12b-it-license"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://huggingface.co/google/gemma-3-12b-it",
      "evidenceIds": [
        "evidence:google-gemma-3-12b-it-license"
      ]
    },
    "commercialUse": {
      "state": "unknown",
      "note": "وضعیت استفادهٔ تجاری احراز نشده است."
    },
    "restrictions": [
      "مجوز اختصاصی مدل؛ شروط نام‌گذاری، توزیع و استفاده باید از متن همان نسخه خوانده شود."
    ],
    "evidenceIds": [
      "evidence:google-gemma-3-12b-it-license"
    ]
  },
  "evidenceIds": [
    "evidence:google-gemma-3-12b-it-card",
    "evidence:google-gemma-3-12b-it-metadata",
    "evidence:google-gemma-3-12b-it-parameters",
    "evidence:google-gemma-3-12b-it-license",
    "evidence:google-gemma-3-12b-it-context",
    "evidence:four-tables-release-gemma-3-release-log",
    "evidence:v03-a585b339d8df0103fa"
  ],
  "releasedOn": "2025-03-10",
  "parameterCounts": [
    {
      "scope": "total",
      "label": "شمار کل اعلام‌شده",
      "value": {
        "state": "known",
        "value": 12,
        "evidenceIds": [
          "evidence:google-gemma-3-12b-it-parameters"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "stored",
      "label": "تعداد عناصر پارامتری نمایهٔ Safetensors",
      "value": {
        "state": "known",
        "value": 12.18732504,
        "evidenceIds": [
          "evidence:v03-aa33d6d2a6e87d221f"
        ],
        "unit": "billion-parameters",
        "note": "نمایهٔ فایل وزن؛ برای وزن کوانت‌شده یا اشتراک وزن، الزاماً شمار پارامتر مستقل نیست."
      },
      "approximate": false
    }
  ]
});
models.push({
  "id": "model:google-gemma-3-1b-it",
  "familyId": "family:gemma",
  "exactName": "gemma-3-1b-it",
  "publisher": "Google DeepMind",
  "version": "dcc83ea841ab6100d6b47a070329e1ba4cf78752",
  "aliases": [
    "google/gemma-3-1b-it"
  ],
  "stage": "instruct",
  "architecture": "dense",
  "totalParametersB": {
    "state": "known",
    "value": 1,
    "evidenceIds": [
      "evidence:google-gemma-3-1b-it-parameters"
    ],
    "unit": "billion-parameters",
    "note": "اعداد پارامتر معرفی مدل، گرد‌شده‌اند؛ safetensors.total شمار عناصر ذخیره‌شده است و الزاماً پارامتر یکتا نیست."
  },
  "activeParametersB": {
    "state": "not-applicable"
  },
  "kind": "generative",
  "inputModalities": [
    "text"
  ],
  "outputModalities": [
    "text"
  ],
  "applications": [
    "text-work",
    "enterprise-rag",
    "structured-extraction",
    "coding-assistant"
  ],
  "languages": [
    {
      "language": "multilingual",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-1a289320089618d611"
        ]
      }
    }
  ],
  "persianEvidenceStatus": "not-evaluated",
  "declaredContext": {
    "state": "known",
    "value": 32768,
    "evidenceIds": [
      "evidence:google-gemma-3-1b-it-context"
    ],
    "unit": "token",
    "note": "ظرفیت اعلام‌شدهٔ ناشر؛ ارزیابی کیفیت بلندمتن در این بسته ثبت نشده است. کارت طول ورودی و سقف خروجی را جدا گزارش می‌کند؛ سقف خروجی را به پنجره اضافه نکنید."
  },
  "evaluatedContext": {
    "state": "not-measured"
  },
  "releaseStatus": "available",
  "lastReviewedOn": "2026-09-15",
  "license": {
    "name": {
      "state": "known",
      "value": "gemma",
      "evidenceIds": [
        "evidence:google-gemma-3-1b-it-license"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://huggingface.co/google/gemma-3-1b-it",
      "evidenceIds": [
        "evidence:google-gemma-3-1b-it-license"
      ]
    },
    "commercialUse": {
      "state": "unknown",
      "note": "وضعیت استفادهٔ تجاری احراز نشده است."
    },
    "restrictions": [
      "مجوز اختصاصی مدل؛ شروط نام‌گذاری، توزیع و استفاده باید از متن همان نسخه خوانده شود."
    ],
    "evidenceIds": [
      "evidence:google-gemma-3-1b-it-license"
    ]
  },
  "evidenceIds": [
    "evidence:google-gemma-3-1b-it-card",
    "evidence:google-gemma-3-1b-it-metadata",
    "evidence:google-gemma-3-1b-it-parameters",
    "evidence:google-gemma-3-1b-it-license",
    "evidence:google-gemma-3-1b-it-context",
    "evidence:four-tables-release-gemma-3-release-log",
    "evidence:v03-1a289320089618d611"
  ],
  "releasedOn": "2025-03-10",
  "parameterCounts": [
    {
      "scope": "total",
      "label": "شمار کل اعلام‌شده",
      "value": {
        "state": "known",
        "value": 1,
        "evidenceIds": [
          "evidence:google-gemma-3-1b-it-parameters"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "stored",
      "label": "تعداد عناصر پارامتری نمایهٔ Safetensors",
      "value": {
        "state": "known",
        "value": 0.999885952,
        "evidenceIds": [
          "evidence:v03-b481689a19e439eed5"
        ],
        "unit": "billion-parameters",
        "note": "نمایهٔ فایل وزن؛ برای وزن کوانت‌شده یا اشتراک وزن، الزاماً شمار پارامتر مستقل نیست."
      },
      "approximate": false
    }
  ]
});
models.push({
  "id": "model:google-gemma-3-27b-it",
  "familyId": "family:gemma",
  "exactName": "gemma-3-27b-it",
  "publisher": "Google DeepMind",
  "version": "005ad3404e59d6023443cb575daa05336842228a",
  "aliases": [
    "google/gemma-3-27b-it"
  ],
  "stage": "instruct",
  "architecture": "dense",
  "totalParametersB": {
    "state": "known",
    "value": 27,
    "evidenceIds": [
      "evidence:google-gemma-3-27b-it-parameters"
    ],
    "unit": "billion-parameters",
    "note": "اعداد پارامتر معرفی مدل، گرد‌شده‌اند؛ safetensors.total شمار عناصر ذخیره‌شده است و الزاماً پارامتر یکتا نیست. اندازهٔ اسمی گونهٔ چندوجهی است؛ اجزای تصویر جداگانه اندازه‌گیری نشده‌اند."
  },
  "activeParametersB": {
    "state": "not-applicable"
  },
  "kind": "vision-language",
  "inputModalities": [
    "text",
    "image"
  ],
  "outputModalities": [
    "text"
  ],
  "applications": [
    "text-work",
    "document-vision",
    "enterprise-rag",
    "structured-extraction",
    "coding-assistant"
  ],
  "languages": [
    {
      "language": "multilingual",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-967dd5737b7fe6620a"
        ]
      }
    }
  ],
  "persianEvidenceStatus": "not-evaluated",
  "declaredContext": {
    "state": "known",
    "value": 131072,
    "evidenceIds": [
      "evidence:google-gemma-3-27b-it-context"
    ],
    "unit": "token",
    "note": "ظرفیت اعلام‌شدهٔ ناشر؛ ارزیابی کیفیت بلندمتن در این بسته ثبت نشده است. کارت طول ورودی و سقف خروجی را جدا گزارش می‌کند؛ سقف خروجی را به پنجره اضافه نکنید."
  },
  "evaluatedContext": {
    "state": "not-measured"
  },
  "releaseStatus": "available",
  "lastReviewedOn": "2026-09-15",
  "license": {
    "name": {
      "state": "known",
      "value": "gemma",
      "evidenceIds": [
        "evidence:google-gemma-3-27b-it-license"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://huggingface.co/google/gemma-3-27b-it",
      "evidenceIds": [
        "evidence:google-gemma-3-27b-it-license"
      ]
    },
    "commercialUse": {
      "state": "unknown",
      "note": "وضعیت استفادهٔ تجاری احراز نشده است."
    },
    "restrictions": [
      "مجوز اختصاصی مدل؛ شروط نام‌گذاری، توزیع و استفاده باید از متن همان نسخه خوانده شود."
    ],
    "evidenceIds": [
      "evidence:google-gemma-3-27b-it-license"
    ]
  },
  "evidenceIds": [
    "evidence:google-gemma-3-27b-it-card",
    "evidence:google-gemma-3-27b-it-metadata",
    "evidence:google-gemma-3-27b-it-parameters",
    "evidence:google-gemma-3-27b-it-license",
    "evidence:google-gemma-3-27b-it-context",
    "evidence:four-tables-release-gemma-3-release-log",
    "evidence:v03-967dd5737b7fe6620a"
  ],
  "releasedOn": "2025-03-10",
  "parameterCounts": [
    {
      "scope": "total",
      "label": "شمار کل اعلام‌شده",
      "value": {
        "state": "known",
        "value": 27,
        "evidenceIds": [
          "evidence:google-gemma-3-27b-it-parameters"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "stored",
      "label": "تعداد عناصر پارامتری نمایهٔ Safetensors",
      "value": {
        "state": "known",
        "value": 27.43240664,
        "evidenceIds": [
          "evidence:v03-9d2982a2e1f67b8ace"
        ],
        "unit": "billion-parameters",
        "note": "نمایهٔ فایل وزن؛ برای وزن کوانت‌شده یا اشتراک وزن، الزاماً شمار پارامتر مستقل نیست."
      },
      "approximate": false
    }
  ]
});
models.push({
  "id": "model:google-gemma-3-4b-it",
  "familyId": "family:gemma",
  "exactName": "gemma-3-4b-it",
  "publisher": "Google DeepMind",
  "version": "093f9f388b31de276ce2de164bdc2081324b9767",
  "aliases": [
    "google/gemma-3-4b-it"
  ],
  "stage": "instruct",
  "architecture": "dense",
  "totalParametersB": {
    "state": "known",
    "value": 4,
    "evidenceIds": [
      "evidence:google-gemma-3-4b-it-parameters"
    ],
    "unit": "billion-parameters",
    "note": "اعداد پارامتر معرفی مدل، گرد‌شده‌اند؛ safetensors.total شمار عناصر ذخیره‌شده است و الزاماً پارامتر یکتا نیست. اندازهٔ اسمی گونهٔ چندوجهی است؛ اجزای تصویر جداگانه اندازه‌گیری نشده‌اند."
  },
  "activeParametersB": {
    "state": "not-applicable"
  },
  "kind": "vision-language",
  "inputModalities": [
    "text",
    "image"
  ],
  "outputModalities": [
    "text"
  ],
  "applications": [
    "text-work",
    "document-vision",
    "enterprise-rag",
    "structured-extraction",
    "coding-assistant"
  ],
  "languages": [
    {
      "language": "multilingual",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-4fef75ec5619801c0c"
        ]
      }
    }
  ],
  "persianEvidenceStatus": "not-evaluated",
  "declaredContext": {
    "state": "known",
    "value": 131072,
    "evidenceIds": [
      "evidence:google-gemma-3-4b-it-context"
    ],
    "unit": "token",
    "note": "ظرفیت اعلام‌شدهٔ ناشر؛ ارزیابی کیفیت بلندمتن در این بسته ثبت نشده است. کارت طول ورودی و سقف خروجی را جدا گزارش می‌کند؛ سقف خروجی را به پنجره اضافه نکنید."
  },
  "evaluatedContext": {
    "state": "not-measured"
  },
  "releaseStatus": "available",
  "lastReviewedOn": "2026-09-15",
  "license": {
    "name": {
      "state": "known",
      "value": "gemma",
      "evidenceIds": [
        "evidence:google-gemma-3-4b-it-license"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://huggingface.co/google/gemma-3-4b-it",
      "evidenceIds": [
        "evidence:google-gemma-3-4b-it-license"
      ]
    },
    "commercialUse": {
      "state": "unknown",
      "note": "وضعیت استفادهٔ تجاری احراز نشده است."
    },
    "restrictions": [
      "مجوز اختصاصی مدل؛ شروط نام‌گذاری، توزیع و استفاده باید از متن همان نسخه خوانده شود."
    ],
    "evidenceIds": [
      "evidence:google-gemma-3-4b-it-license"
    ]
  },
  "evidenceIds": [
    "evidence:google-gemma-3-4b-it-card",
    "evidence:google-gemma-3-4b-it-metadata",
    "evidence:google-gemma-3-4b-it-parameters",
    "evidence:google-gemma-3-4b-it-license",
    "evidence:google-gemma-3-4b-it-context",
    "evidence:four-tables-release-gemma-3-release-log",
    "evidence:v03-4fef75ec5619801c0c"
  ],
  "releasedOn": "2025-03-10",
  "parameterCounts": [
    {
      "scope": "total",
      "label": "شمار کل اعلام‌شده",
      "value": {
        "state": "known",
        "value": 4,
        "evidenceIds": [
          "evidence:google-gemma-3-4b-it-parameters"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "stored",
      "label": "تعداد عناصر پارامتری نمایهٔ Safetensors",
      "value": {
        "state": "known",
        "value": 4.300079472,
        "evidenceIds": [
          "evidence:v03-2c393ee03a23020606"
        ],
        "unit": "billion-parameters",
        "note": "نمایهٔ فایل وزن؛ برای وزن کوانت‌شده یا اشتراک وزن، الزاماً شمار پارامتر مستقل نیست."
      },
      "approximate": false
    }
  ]
});
models.push({
  "id": "model:google-gemma-4-26b-a4b-it",
  "familyId": "family:gemma",
  "exactName": "gemma-4-26B-A4B-it",
  "publisher": "Google DeepMind",
  "version": "4d7ae4984b7db7de8f8457170b3f1a419ee76d52",
  "aliases": [
    "google/gemma-4-26B-A4B-it"
  ],
  "stage": "instruct",
  "architecture": "moe",
  "totalParametersB": {
    "state": "unknown",
    "note": "شمار کل با دامنهٔ یکنواخت تأیید نشده؛ شمار جزء زبانی، فعال یا ذخیره‌شده جای آن ننشسته است.",
    "evidenceIds": [
      "evidence:google-gemma-4-26b-a4b-it-parameters",
      "evidence:google-gemma-4-26b-a4b-it-metadata"
    ]
  },
  "activeParametersB": {
    "state": "unknown",
    "note": "شمار فعال دقیق این گونه و فاز اجرا تأیید نشده است.",
    "evidenceIds": [
      "evidence:google-gemma-4-26b-a4b-it-parameters"
    ]
  },
  "kind": "vision-language",
  "inputModalities": [
    "text",
    "image",
    "video"
  ],
  "outputModalities": [
    "text"
  ],
  "applications": [
    "text-work",
    "document-vision",
    "enterprise-rag",
    "structured-extraction",
    "reasoning-analysis",
    "coding-assistant",
    "agents-tools"
  ],
  "languages": [
    {
      "language": "multilingual",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-8c073f7e3729dadf20"
        ]
      }
    }
  ],
  "persianEvidenceStatus": "not-evaluated",
  "declaredContext": {
    "state": "known",
    "value": 262144,
    "evidenceIds": [
      "evidence:google-gemma-4-26b-a4b-it-context"
    ],
    "unit": "token",
    "note": "ظرفیت اعلام‌شدهٔ ناشر؛ ارزیابی کیفیت بلندمتن در این بسته ثبت نشده است."
  },
  "evaluatedContext": {
    "state": "not-measured"
  },
  "releaseStatus": "available",
  "lastReviewedOn": "2026-09-15",
  "license": {
    "name": {
      "state": "known",
      "value": "Apache-2.0",
      "evidenceIds": [
        "evidence:google-gemma-4-26b-a4b-it-license"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://ai.google.dev/gemma/docs/gemma_4_license",
      "evidenceIds": [
        "evidence:google-gemma-4-26b-a4b-it-license"
      ]
    },
    "commercialUse": {
      "state": "known",
      "value": "allowed",
      "evidenceIds": [
        "evidence:google-gemma-4-26b-a4b-it-license"
      ]
    },
    "restrictions": [],
    "evidenceIds": [
      "evidence:google-gemma-4-26b-a4b-it-license"
    ]
  },
  "evidenceIds": [
    "evidence:google-gemma-4-26b-a4b-it-card",
    "evidence:google-gemma-4-26b-a4b-it-metadata",
    "evidence:google-gemma-4-26b-a4b-it-parameters",
    "evidence:google-gemma-4-26b-a4b-it-license",
    "evidence:google-gemma-4-26b-a4b-it-context",
    "evidence:google-gemma-4-26b-a4b-it-config",
    "evidence:four-tables-release-gemma-4-release-log",
    "evidence:v03-8c073f7e3729dadf20"
  ],
  "releasedOn": "2026-03-31",
  "parameterCounts": [
    {
      "scope": "nominal",
      "label": "اندازهٔ اسمی گونهٔ 26B",
      "value": {
        "state": "known",
        "value": 26,
        "evidenceIds": [
          "evidence:google-gemma-4-26b-a4b-it-card"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "language-component",
      "label": "جزء زبانیِ جدول ناشر",
      "value": {
        "state": "known",
        "value": 25.2,
        "evidenceIds": [
          "evidence:google-gemma-4-26b-a4b-it-card"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "vision-component",
      "label": "رمزگذار تصویر",
      "value": {
        "state": "known",
        "value": 0.55,
        "evidenceIds": [
          "evidence:google-gemma-4-26b-a4b-it-card"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "stored",
      "label": "تعداد عناصر پارامتری نمایهٔ Safetensors",
      "value": {
        "state": "known",
        "value": 25.805936206,
        "evidenceIds": [
          "evidence:v03-c533281710e351567d"
        ],
        "unit": "billion-parameters",
        "note": "نمایهٔ فایل وزن؛ برای وزن کوانت‌شده یا اشتراک وزن، الزاماً شمار پارامتر مستقل نیست."
      },
      "approximate": false
    }
  ]
});
models.push({
  "id": "model:google-gemma-4-e2b-it",
  "familyId": "family:gemma",
  "exactName": "gemma-4-E2B-it",
  "publisher": "Google DeepMind",
  "version": "3e22461f65e89153144f8adb70e3b8c2cc9845a7",
  "aliases": [
    "google/gemma-4-E2B-it"
  ],
  "stage": "instruct",
  "architecture": "dense",
  "totalParametersB": {
    "state": "unknown",
    "note": "شمار کل با دامنهٔ یکنواخت تأیید نشده؛ شمار جزء زبانی، فعال یا ذخیره‌شده جای آن ننشسته است.",
    "evidenceIds": [
      "evidence:google-gemma-4-e2b-it-parameters",
      "evidence:google-gemma-4-e2b-it-metadata"
    ]
  },
  "activeParametersB": {
    "state": "not-applicable"
  },
  "kind": "vision-language",
  "inputModalities": [
    "text",
    "image",
    "audio",
    "video"
  ],
  "outputModalities": [
    "text"
  ],
  "applications": [
    "text-work",
    "document-vision",
    "enterprise-rag",
    "structured-extraction",
    "reasoning-analysis",
    "coding-assistant",
    "agents-tools"
  ],
  "languages": [
    {
      "language": "multilingual",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-a557e664812e64393e"
        ]
      }
    }
  ],
  "persianEvidenceStatus": "not-evaluated",
  "declaredContext": {
    "state": "known",
    "value": 131072,
    "evidenceIds": [
      "evidence:google-gemma-4-e2b-it-context"
    ],
    "unit": "token",
    "note": "ظرفیت اعلام‌شدهٔ ناشر؛ ارزیابی کیفیت بلندمتن در این بسته ثبت نشده است."
  },
  "evaluatedContext": {
    "state": "not-measured"
  },
  "releaseStatus": "available",
  "lastReviewedOn": "2026-09-15",
  "license": {
    "name": {
      "state": "known",
      "value": "Apache-2.0",
      "evidenceIds": [
        "evidence:google-gemma-4-e2b-it-license"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://ai.google.dev/gemma/docs/gemma_4_license",
      "evidenceIds": [
        "evidence:google-gemma-4-e2b-it-license"
      ]
    },
    "commercialUse": {
      "state": "known",
      "value": "allowed",
      "evidenceIds": [
        "evidence:google-gemma-4-e2b-it-license"
      ]
    },
    "restrictions": [],
    "evidenceIds": [
      "evidence:google-gemma-4-e2b-it-license"
    ]
  },
  "evidenceIds": [
    "evidence:google-gemma-4-e2b-it-card",
    "evidence:google-gemma-4-e2b-it-metadata",
    "evidence:google-gemma-4-e2b-it-parameters",
    "evidence:google-gemma-4-e2b-it-license",
    "evidence:google-gemma-4-e2b-it-context",
    "evidence:google-gemma-4-e2b-it-config",
    "evidence:four-tables-release-gemma-4-release-log",
    "evidence:v03-a557e664812e64393e"
  ],
  "releasedOn": "2026-03-31",
  "parameterCounts": [
    {
      "scope": "effective",
      "label": "مؤثر بدون جدول embedding",
      "value": {
        "state": "known",
        "value": 2.3,
        "evidenceIds": [
          "evidence:google-gemma-4-e2b-it-card"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "language-component",
      "label": "جزء زبانی با embedding",
      "value": {
        "state": "known",
        "value": 5.1,
        "evidenceIds": [
          "evidence:google-gemma-4-e2b-it-card"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "vision-component",
      "label": "رمزگذار تصویر",
      "value": {
        "state": "known",
        "value": 0.15,
        "evidenceIds": [
          "evidence:google-gemma-4-e2b-it-card"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "other",
      "label": "رمزگذار صوت",
      "value": {
        "state": "known",
        "value": 0.3,
        "evidenceIds": [
          "evidence:google-gemma-4-e2b-it-card"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "stored",
      "label": "تعداد عناصر پارامتری نمایهٔ Safetensors",
      "value": {
        "state": "known",
        "value": 5.123178051,
        "evidenceIds": [
          "evidence:v03-217e706ae1f430c21e"
        ],
        "unit": "billion-parameters",
        "note": "نمایهٔ فایل وزن؛ برای وزن کوانت‌شده یا اشتراک وزن، الزاماً شمار پارامتر مستقل نیست."
      },
      "approximate": false
    }
  ]
});
models.push({
  "id": "model:ibm-granite-granite-3-3-2b-instruct",
  "familyId": "family:granite",
  "exactName": "granite-3.3-2b-instruct",
  "publisher": "IBM",
  "version": "707f574c62054322f6b5b04b6d075f0a8f05e0f0",
  "aliases": [
    "ibm-granite/granite-3.3-2b-instruct"
  ],
  "stage": "instruct",
  "architecture": "dense",
  "totalParametersB": {
    "state": "known",
    "value": 2,
    "evidenceIds": [
      "evidence:ibm-granite-granite-3-3-2b-instruct-parameters"
    ],
    "unit": "billion-parameters",
    "note": "اعداد پارامتر معرفی مدل، گرد‌شده‌اند؛ safetensors.total شمار عناصر ذخیره‌شده است و الزاماً پارامتر یکتا نیست."
  },
  "activeParametersB": {
    "state": "not-applicable"
  },
  "kind": "generative",
  "inputModalities": [
    "text"
  ],
  "outputModalities": [
    "text"
  ],
  "applications": [
    "text-work",
    "enterprise-rag",
    "structured-extraction",
    "coding-assistant",
    "agents-tools",
    "reasoning-analysis"
  ],
  "languages": [
    {
      "language": "multilingual",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-0734c7ad0dd63a75da"
        ]
      }
    }
  ],
  "persianEvidenceStatus": "not-evaluated",
  "declaredContext": {
    "state": "known",
    "value": 131072,
    "evidenceIds": [
      "evidence:ibm-granite-granite-3-3-2b-instruct-context"
    ],
    "unit": "token",
    "note": "ظرفیت اعلام‌شدهٔ ناشر؛ ارزیابی کیفیت بلندمتن در این بسته ثبت نشده است."
  },
  "evaluatedContext": {
    "state": "not-measured"
  },
  "releaseStatus": "available",
  "lastReviewedOn": "2026-09-15",
  "license": {
    "name": {
      "state": "known",
      "value": "Apache-2.0",
      "evidenceIds": [
        "evidence:ibm-granite-granite-3-3-2b-instruct-license"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://huggingface.co/ibm-granite/granite-3.3-2b-instruct/blob/707f574c62054322f6b5b04b6d075f0a8f05e0f0/README.md",
      "evidenceIds": [
        "evidence:ibm-granite-granite-3-3-2b-instruct-license"
      ]
    },
    "commercialUse": {
      "state": "known",
      "value": "allowed",
      "evidenceIds": [
        "evidence:ibm-granite-granite-3-3-2b-instruct-license"
      ]
    },
    "restrictions": [],
    "evidenceIds": [
      "evidence:ibm-granite-granite-3-3-2b-instruct-license"
    ]
  },
  "evidenceIds": [
    "evidence:ibm-granite-granite-3-3-2b-instruct-card",
    "evidence:ibm-granite-granite-3-3-2b-instruct-metadata",
    "evidence:ibm-granite-granite-3-3-2b-instruct-parameters",
    "evidence:ibm-granite-granite-3-3-2b-instruct-license",
    "evidence:ibm-granite-granite-3-3-2b-instruct-context",
    "evidence:ibm-granite-granite-3-3-2b-instruct-config",
    "evidence:four-tables-release-ibm-granite-3-3-release",
    "evidence:v03-0734c7ad0dd63a75da"
  ],
  "parameterCounts": [
    {
      "scope": "total",
      "label": "شمار کل اعلام‌شده",
      "value": {
        "state": "known",
        "value": 2,
        "evidenceIds": [
          "evidence:ibm-granite-granite-3-3-2b-instruct-parameters"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "stored",
      "label": "تعداد عناصر پارامتری نمایهٔ Safetensors",
      "value": {
        "state": "known",
        "value": 2.53353984,
        "evidenceIds": [
          "evidence:v03-ae9866cb7ade8f6bef"
        ],
        "unit": "billion-parameters",
        "note": "نمایهٔ فایل وزن؛ برای وزن کوانت‌شده یا اشتراک وزن، الزاماً شمار پارامتر مستقل نیست."
      },
      "approximate": false
    }
  ],
  "releasedOn": "2025-04-16"
});
models.push({
  "id": "model:intfloat-multilingual-e5-small",
  "familyId": "family:e5",
  "exactName": "multilingual-e5-small",
  "publisher": "intfloat / multilingual E5 authors",
  "version": "614241f622f53c4eeff9890bdc4f31cfecc418b3",
  "aliases": [
    "intfloat/multilingual-e5-small"
  ],
  "stage": "other",
  "architecture": "dense",
  "totalParametersB": {
    "state": "known",
    "value": 0.117654272,
    "evidenceIds": [
      "evidence:v03-8f611b782637f1552d"
    ],
    "unit": "billion-parameters",
    "note": "تعداد عناصر وزن در checkpoint غیرکوانت‌شدهٔ نمایهٔ ناشر؛ گردکردن فقط در نمایش."
  },
  "activeParametersB": {
    "state": "not-applicable"
  },
  "kind": "embedding",
  "inputModalities": [
    "text"
  ],
  "outputModalities": [
    "embedding"
  ],
  "applications": [
    "enterprise-rag"
  ],
  "languages": [
    {
      "language": "multilingual",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-e3947a7dba128dc7e3"
        ]
      }
    },
    {
      "language": "af",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-e3947a7dba128dc7e3"
        ]
      }
    },
    {
      "language": "am",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-e3947a7dba128dc7e3"
        ]
      }
    },
    {
      "language": "ar",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-e3947a7dba128dc7e3"
        ]
      }
    },
    {
      "language": "as",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-e3947a7dba128dc7e3"
        ]
      }
    },
    {
      "language": "az",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-e3947a7dba128dc7e3"
        ]
      }
    },
    {
      "language": "be",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-e3947a7dba128dc7e3"
        ]
      }
    },
    {
      "language": "bg",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-e3947a7dba128dc7e3"
        ]
      }
    },
    {
      "language": "bn",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-e3947a7dba128dc7e3"
        ]
      }
    },
    {
      "language": "br",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-e3947a7dba128dc7e3"
        ]
      }
    },
    {
      "language": "bs",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-e3947a7dba128dc7e3"
        ]
      }
    },
    {
      "language": "ca",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-e3947a7dba128dc7e3"
        ]
      }
    },
    {
      "language": "cs",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-e3947a7dba128dc7e3"
        ]
      }
    },
    {
      "language": "cy",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-e3947a7dba128dc7e3"
        ]
      }
    },
    {
      "language": "da",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-e3947a7dba128dc7e3"
        ]
      }
    },
    {
      "language": "de",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-e3947a7dba128dc7e3"
        ]
      }
    },
    {
      "language": "el",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-e3947a7dba128dc7e3"
        ]
      }
    },
    {
      "language": "en",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-e3947a7dba128dc7e3"
        ]
      }
    },
    {
      "language": "eo",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-e3947a7dba128dc7e3"
        ]
      }
    },
    {
      "language": "es",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-e3947a7dba128dc7e3"
        ]
      }
    },
    {
      "language": "et",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-e3947a7dba128dc7e3"
        ]
      }
    },
    {
      "language": "eu",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-e3947a7dba128dc7e3"
        ]
      }
    },
    {
      "language": "fa",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-e3947a7dba128dc7e3"
        ]
      }
    },
    {
      "language": "fi",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-e3947a7dba128dc7e3"
        ]
      }
    },
    {
      "language": "fr",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-e3947a7dba128dc7e3"
        ]
      }
    },
    {
      "language": "fy",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-e3947a7dba128dc7e3"
        ]
      }
    },
    {
      "language": "ga",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-e3947a7dba128dc7e3"
        ]
      }
    },
    {
      "language": "gd",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-e3947a7dba128dc7e3"
        ]
      }
    },
    {
      "language": "gl",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-e3947a7dba128dc7e3"
        ]
      }
    },
    {
      "language": "gu",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-e3947a7dba128dc7e3"
        ]
      }
    },
    {
      "language": "ha",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-e3947a7dba128dc7e3"
        ]
      }
    },
    {
      "language": "he",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-e3947a7dba128dc7e3"
        ]
      }
    },
    {
      "language": "hi",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-e3947a7dba128dc7e3"
        ]
      }
    },
    {
      "language": "hr",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-e3947a7dba128dc7e3"
        ]
      }
    },
    {
      "language": "hu",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-e3947a7dba128dc7e3"
        ]
      }
    },
    {
      "language": "hy",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-e3947a7dba128dc7e3"
        ]
      }
    },
    {
      "language": "id",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-e3947a7dba128dc7e3"
        ]
      }
    },
    {
      "language": "is",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-e3947a7dba128dc7e3"
        ]
      }
    },
    {
      "language": "it",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-e3947a7dba128dc7e3"
        ]
      }
    },
    {
      "language": "ja",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-e3947a7dba128dc7e3"
        ]
      }
    },
    {
      "language": "jv",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-e3947a7dba128dc7e3"
        ]
      }
    },
    {
      "language": "ka",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-e3947a7dba128dc7e3"
        ]
      }
    },
    {
      "language": "kk",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-e3947a7dba128dc7e3"
        ]
      }
    },
    {
      "language": "km",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-e3947a7dba128dc7e3"
        ]
      }
    },
    {
      "language": "kn",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-e3947a7dba128dc7e3"
        ]
      }
    },
    {
      "language": "ko",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-e3947a7dba128dc7e3"
        ]
      }
    },
    {
      "language": "ku",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-e3947a7dba128dc7e3"
        ]
      }
    },
    {
      "language": "ky",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-e3947a7dba128dc7e3"
        ]
      }
    },
    {
      "language": "la",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-e3947a7dba128dc7e3"
        ]
      }
    },
    {
      "language": "lo",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-e3947a7dba128dc7e3"
        ]
      }
    },
    {
      "language": "lt",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-e3947a7dba128dc7e3"
        ]
      }
    },
    {
      "language": "lv",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-e3947a7dba128dc7e3"
        ]
      }
    },
    {
      "language": "mg",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-e3947a7dba128dc7e3"
        ]
      }
    },
    {
      "language": "mk",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-e3947a7dba128dc7e3"
        ]
      }
    },
    {
      "language": "ml",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-e3947a7dba128dc7e3"
        ]
      }
    },
    {
      "language": "mn",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-e3947a7dba128dc7e3"
        ]
      }
    },
    {
      "language": "mr",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-e3947a7dba128dc7e3"
        ]
      }
    },
    {
      "language": "ms",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-e3947a7dba128dc7e3"
        ]
      }
    },
    {
      "language": "my",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-e3947a7dba128dc7e3"
        ]
      }
    },
    {
      "language": "ne",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-e3947a7dba128dc7e3"
        ]
      }
    },
    {
      "language": "nl",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-e3947a7dba128dc7e3"
        ]
      }
    },
    {
      "language": "no",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-e3947a7dba128dc7e3"
        ]
      }
    },
    {
      "language": "om",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-e3947a7dba128dc7e3"
        ]
      }
    },
    {
      "language": "or",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-e3947a7dba128dc7e3"
        ]
      }
    },
    {
      "language": "pa",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-e3947a7dba128dc7e3"
        ]
      }
    },
    {
      "language": "pl",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-e3947a7dba128dc7e3"
        ]
      }
    },
    {
      "language": "ps",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-e3947a7dba128dc7e3"
        ]
      }
    },
    {
      "language": "pt",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-e3947a7dba128dc7e3"
        ]
      }
    },
    {
      "language": "ro",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-e3947a7dba128dc7e3"
        ]
      }
    },
    {
      "language": "ru",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-e3947a7dba128dc7e3"
        ]
      }
    },
    {
      "language": "sa",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-e3947a7dba128dc7e3"
        ]
      }
    },
    {
      "language": "sd",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-e3947a7dba128dc7e3"
        ]
      }
    },
    {
      "language": "si",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-e3947a7dba128dc7e3"
        ]
      }
    },
    {
      "language": "sk",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-e3947a7dba128dc7e3"
        ]
      }
    },
    {
      "language": "sl",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-e3947a7dba128dc7e3"
        ]
      }
    },
    {
      "language": "so",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-e3947a7dba128dc7e3"
        ]
      }
    },
    {
      "language": "sq",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-e3947a7dba128dc7e3"
        ]
      }
    },
    {
      "language": "sr",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-e3947a7dba128dc7e3"
        ]
      }
    },
    {
      "language": "su",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-e3947a7dba128dc7e3"
        ]
      }
    },
    {
      "language": "sv",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-e3947a7dba128dc7e3"
        ]
      }
    },
    {
      "language": "sw",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-e3947a7dba128dc7e3"
        ]
      }
    },
    {
      "language": "ta",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-e3947a7dba128dc7e3"
        ]
      }
    },
    {
      "language": "te",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-e3947a7dba128dc7e3"
        ]
      }
    },
    {
      "language": "th",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-e3947a7dba128dc7e3"
        ]
      }
    },
    {
      "language": "tl",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-e3947a7dba128dc7e3"
        ]
      }
    },
    {
      "language": "tr",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-e3947a7dba128dc7e3"
        ]
      }
    },
    {
      "language": "ug",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-e3947a7dba128dc7e3"
        ]
      }
    },
    {
      "language": "uk",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-e3947a7dba128dc7e3"
        ]
      }
    },
    {
      "language": "ur",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-e3947a7dba128dc7e3"
        ]
      }
    },
    {
      "language": "uz",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-e3947a7dba128dc7e3"
        ]
      }
    },
    {
      "language": "vi",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-e3947a7dba128dc7e3"
        ]
      }
    },
    {
      "language": "xh",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-e3947a7dba128dc7e3"
        ]
      }
    },
    {
      "language": "yi",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-e3947a7dba128dc7e3"
        ]
      }
    },
    {
      "language": "zh",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-e3947a7dba128dc7e3"
        ]
      }
    }
  ],
  "persianEvidenceStatus": "publisher-claimed",
  "declaredContext": {
    "state": "known",
    "value": 512,
    "evidenceIds": [
      "evidence:intfloat-multilingual-e5-small-context"
    ],
    "unit": "token",
    "note": "ظرفیت اعلام‌شدهٔ ناشر؛ ارزیابی کیفیت بلندمتن در این بسته ثبت نشده است."
  },
  "evaluatedContext": {
    "state": "not-measured"
  },
  "releaseStatus": "available",
  "lastReviewedOn": "2026-09-15",
  "license": {
    "name": {
      "state": "known",
      "value": "MIT",
      "evidenceIds": [
        "evidence:intfloat-multilingual-e5-small-license"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://huggingface.co/intfloat/multilingual-e5-small/blob/614241f622f53c4eeff9890bdc4f31cfecc418b3/README.md",
      "evidenceIds": [
        "evidence:intfloat-multilingual-e5-small-license"
      ]
    },
    "commercialUse": {
      "state": "known",
      "value": "allowed",
      "evidenceIds": [
        "evidence:intfloat-multilingual-e5-small-license"
      ]
    },
    "restrictions": [],
    "evidenceIds": [
      "evidence:intfloat-multilingual-e5-small-license"
    ]
  },
  "evidenceIds": [
    "evidence:intfloat-multilingual-e5-small-card",
    "evidence:intfloat-multilingual-e5-small-metadata",
    "evidence:intfloat-multilingual-e5-small-parameters",
    "evidence:intfloat-multilingual-e5-small-license",
    "evidence:intfloat-multilingual-e5-small-context",
    "evidence:intfloat-multilingual-e5-small-config",
    "evidence:four-tables-release-multilingual-e5-release-year",
    "evidence:v03-e3947a7dba128dc7e3",
    "evidence:v03-bcba4bc8dac5de20c7",
    "evidence:v03-8f611b782637f1552d"
  ],
  "releasedOn": "2023",
  "specializedSpecs": {
    "task": {
      "state": "known",
      "value": "بازیابی و مشابهت متن",
      "evidenceIds": [
        "evidence:v03-bcba4bc8dac5de20c7"
      ]
    },
    "output": {
      "state": "known",
      "value": "بردار 384بعدی",
      "evidenceIds": [
        "evidence:v03-bcba4bc8dac5de20c7"
      ]
    },
    "poolingOrScoring": {
      "state": "known",
      "value": "میانگین با mask و L2؛ query: برای پرسش و passage: برای سند",
      "evidenceIds": [
        "evidence:v03-bcba4bc8dac5de20c7"
      ]
    },
    "features": {
      "state": "known",
      "value": "بردارساز کوچک چندزبانه برای جست‌وجو و RAG",
      "evidenceIds": [
        "evidence:v03-bcba4bc8dac5de20c7"
      ]
    },
    "languages": {
      "state": "known",
      "value": "زبان‌های اعلام‌شده: آفریکانس، امهری، عربی، آسامی، آذربایجانی، بلاروسی، بلغاری، بنگالی، برتانیایی، بوسنیایی، کاتالان، چکی، ولزی، دانمارکی و زبان‌های دیگر.",
      "evidenceIds": [
        "evidence:v03-bcba4bc8dac5de20c7"
      ]
    },
    "embeddingDimensions": {
      "state": "known",
      "value": 384,
      "evidenceIds": [
        "evidence:v03-bcba4bc8dac5de20c7"
      ]
    }
  },
  "parameterCounts": [
    {
      "scope": "stored",
      "label": "عناصر ذخیره‌شده در safetensors",
      "value": {
        "state": "known",
        "value": 0.117654272,
        "evidenceIds": [
          "evidence:intfloat-multilingual-e5-small-metadata"
        ],
        "unit": "billion-parameters",
        "note": "شامل عناصر ذخیره‌شده؛ جای شمار کل منطقی یا فیلتر کل نیست."
      },
      "approximate": true
    }
  ]
});
models.push({
  "id": "model:meta-llama-llama-3-1-70b-instruct",
  "familyId": "family:llama",
  "exactName": "Llama-3.1-70B-Instruct",
  "publisher": "Meta",
  "version": "1605565b47bb9346c5515c34102e054115b4f98b",
  "aliases": [
    "meta-llama/Llama-3.1-70B-Instruct"
  ],
  "stage": "instruct",
  "architecture": "dense",
  "totalParametersB": {
    "state": "known",
    "value": 70,
    "evidenceIds": [
      "evidence:meta-llama-llama-3-1-70b-instruct-parameters"
    ],
    "unit": "billion-parameters",
    "note": "اعداد پارامتر معرفی مدل، گرد‌شده‌اند؛ safetensors.total شمار عناصر ذخیره‌شده است و الزاماً پارامتر یکتا نیست."
  },
  "activeParametersB": {
    "state": "not-applicable"
  },
  "kind": "generative",
  "inputModalities": [
    "text"
  ],
  "outputModalities": [
    "text"
  ],
  "applications": [
    "text-work",
    "enterprise-rag",
    "structured-extraction",
    "coding-assistant",
    "agents-tools"
  ],
  "languages": [
    {
      "language": "en",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-ae7757c4609601f006"
        ]
      }
    },
    {
      "language": "de",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-ae7757c4609601f006"
        ]
      }
    },
    {
      "language": "fr",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-ae7757c4609601f006"
        ]
      }
    },
    {
      "language": "it",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-ae7757c4609601f006"
        ]
      }
    },
    {
      "language": "pt",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-ae7757c4609601f006"
        ]
      }
    },
    {
      "language": "hi",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-ae7757c4609601f006"
        ]
      }
    },
    {
      "language": "es",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-ae7757c4609601f006"
        ]
      }
    },
    {
      "language": "th",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-ae7757c4609601f006"
        ]
      }
    }
  ],
  "persianEvidenceStatus": "not-evaluated",
  "declaredContext": {
    "state": "known",
    "value": 131072,
    "evidenceIds": [
      "evidence:meta-llama-llama-3-1-70b-instruct-context"
    ],
    "unit": "token",
    "note": "ظرفیت اعلام‌شدهٔ ناشر؛ ارزیابی کیفیت بلندمتن در این بسته ثبت نشده است."
  },
  "evaluatedContext": {
    "state": "not-measured"
  },
  "releaseStatus": "available",
  "lastReviewedOn": "2026-09-15",
  "license": {
    "name": {
      "state": "known",
      "value": "llama3.1",
      "evidenceIds": [
        "evidence:meta-llama-llama-3-1-70b-instruct-license"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://huggingface.co/meta-llama/Llama-3.1-70B-Instruct",
      "evidenceIds": [
        "evidence:meta-llama-llama-3-1-70b-instruct-license"
      ]
    },
    "commercialUse": {
      "state": "unknown",
      "note": "وضعیت استفادهٔ تجاری احراز نشده است."
    },
    "restrictions": [
      "مجوز اختصاصی مدل؛ شروط نام‌گذاری، توزیع و استفاده باید از متن همان نسخه خوانده شود."
    ],
    "evidenceIds": [
      "evidence:meta-llama-llama-3-1-70b-instruct-license"
    ]
  },
  "evidenceIds": [
    "evidence:meta-llama-llama-3-1-70b-instruct-card",
    "evidence:meta-llama-llama-3-1-70b-instruct-metadata",
    "evidence:meta-llama-llama-3-1-70b-instruct-parameters",
    "evidence:meta-llama-llama-3-1-70b-instruct-license",
    "evidence:meta-llama-llama-3-1-70b-instruct-context",
    "evidence:four-tables-release-llama-3-1-release",
    "evidence:v03-ae7757c4609601f006",
    "evidence:v03-026934816cbcae04b5"
  ],
  "releasedOn": "2024-07-23",
  "parameterCounts": [
    {
      "scope": "total",
      "label": "شمار کل اعلام‌شده",
      "value": {
        "state": "known",
        "value": 70,
        "evidenceIds": [
          "evidence:meta-llama-llama-3-1-70b-instruct-parameters"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "stored",
      "label": "تعداد عناصر پارامتری نمایهٔ Safetensors",
      "value": {
        "state": "known",
        "value": 70.553706496,
        "evidenceIds": [
          "evidence:v03-ae7757c4609601f006"
        ],
        "unit": "billion-parameters",
        "note": "نمایهٔ فایل وزن؛ برای وزن کوانت‌شده یا اشتراک وزن، الزاماً شمار پارامتر مستقل نیست."
      },
      "approximate": false
    }
  ]
});
models.push({
  "id": "model:meta-llama-llama-3-1-8b-instruct",
  "familyId": "family:llama",
  "exactName": "Llama-3.1-8B-Instruct",
  "publisher": "Meta",
  "version": "0e9e39f249a16976918f6564b8830bc894c89659",
  "aliases": [
    "meta-llama/Llama-3.1-8B-Instruct"
  ],
  "stage": "instruct",
  "architecture": "dense",
  "totalParametersB": {
    "state": "known",
    "value": 8,
    "evidenceIds": [
      "evidence:meta-llama-llama-3-1-8b-instruct-parameters"
    ],
    "unit": "billion-parameters",
    "note": "اعداد پارامتر معرفی مدل، گرد‌شده‌اند؛ safetensors.total شمار عناصر ذخیره‌شده است و الزاماً پارامتر یکتا نیست."
  },
  "activeParametersB": {
    "state": "not-applicable"
  },
  "kind": "generative",
  "inputModalities": [
    "text"
  ],
  "outputModalities": [
    "text"
  ],
  "applications": [
    "text-work",
    "enterprise-rag",
    "structured-extraction",
    "coding-assistant",
    "agents-tools"
  ],
  "languages": [
    {
      "language": "en",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-932946f38a51b6d443"
        ]
      }
    },
    {
      "language": "de",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-932946f38a51b6d443"
        ]
      }
    },
    {
      "language": "fr",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-932946f38a51b6d443"
        ]
      }
    },
    {
      "language": "it",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-932946f38a51b6d443"
        ]
      }
    },
    {
      "language": "pt",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-932946f38a51b6d443"
        ]
      }
    },
    {
      "language": "hi",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-932946f38a51b6d443"
        ]
      }
    },
    {
      "language": "es",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-932946f38a51b6d443"
        ]
      }
    },
    {
      "language": "th",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-932946f38a51b6d443"
        ]
      }
    }
  ],
  "persianEvidenceStatus": "not-evaluated",
  "declaredContext": {
    "state": "known",
    "value": 131072,
    "evidenceIds": [
      "evidence:meta-llama-llama-3-1-8b-instruct-context"
    ],
    "unit": "token",
    "note": "ظرفیت اعلام‌شدهٔ ناشر؛ ارزیابی کیفیت بلندمتن در این بسته ثبت نشده است."
  },
  "evaluatedContext": {
    "state": "not-measured"
  },
  "releaseStatus": "available",
  "lastReviewedOn": "2026-09-15",
  "license": {
    "name": {
      "state": "known",
      "value": "llama3.1",
      "evidenceIds": [
        "evidence:meta-llama-llama-3-1-8b-instruct-license"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://huggingface.co/meta-llama/Llama-3.1-8B-Instruct",
      "evidenceIds": [
        "evidence:meta-llama-llama-3-1-8b-instruct-license"
      ]
    },
    "commercialUse": {
      "state": "unknown",
      "note": "وضعیت استفادهٔ تجاری احراز نشده است."
    },
    "restrictions": [
      "مجوز اختصاصی مدل؛ شروط نام‌گذاری، توزیع و استفاده باید از متن همان نسخه خوانده شود."
    ],
    "evidenceIds": [
      "evidence:meta-llama-llama-3-1-8b-instruct-license"
    ]
  },
  "evidenceIds": [
    "evidence:meta-llama-llama-3-1-8b-instruct-card",
    "evidence:meta-llama-llama-3-1-8b-instruct-metadata",
    "evidence:meta-llama-llama-3-1-8b-instruct-parameters",
    "evidence:meta-llama-llama-3-1-8b-instruct-license",
    "evidence:meta-llama-llama-3-1-8b-instruct-context",
    "evidence:four-tables-release-llama-3-1-release",
    "evidence:v03-932946f38a51b6d443",
    "evidence:v03-5a3e61cbfee9a9dd77"
  ],
  "releasedOn": "2024-07-23",
  "parameterCounts": [
    {
      "scope": "total",
      "label": "شمار کل اعلام‌شده",
      "value": {
        "state": "known",
        "value": 8,
        "evidenceIds": [
          "evidence:meta-llama-llama-3-1-8b-instruct-parameters"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "stored",
      "label": "تعداد عناصر پارامتری نمایهٔ Safetensors",
      "value": {
        "state": "known",
        "value": 8.030261248,
        "evidenceIds": [
          "evidence:v03-932946f38a51b6d443"
        ],
        "unit": "billion-parameters",
        "note": "نمایهٔ فایل وزن؛ برای وزن کوانت‌شده یا اشتراک وزن، الزاماً شمار پارامتر مستقل نیست."
      },
      "approximate": false
    }
  ]
});
models.push({
  "id": "model:meta-llama-llama-3-2-1b-instruct",
  "familyId": "family:llama",
  "exactName": "Llama-3.2-1B-Instruct",
  "publisher": "Meta",
  "version": "9213176726f574b556790deb65791e0c5aa438b6",
  "aliases": [
    "meta-llama/Llama-3.2-1B-Instruct"
  ],
  "stage": "instruct",
  "architecture": "dense",
  "totalParametersB": {
    "state": "known",
    "value": 1,
    "evidenceIds": [
      "evidence:meta-llama-llama-3-2-1b-instruct-parameters"
    ],
    "unit": "billion-parameters",
    "note": "اعداد پارامتر معرفی مدل، گرد‌شده‌اند؛ safetensors.total شمار عناصر ذخیره‌شده است و الزاماً پارامتر یکتا نیست."
  },
  "activeParametersB": {
    "state": "not-applicable"
  },
  "kind": "generative",
  "inputModalities": [
    "text"
  ],
  "outputModalities": [
    "text"
  ],
  "applications": [
    "text-work",
    "enterprise-rag",
    "structured-extraction",
    "coding-assistant",
    "agents-tools"
  ],
  "languages": [
    {
      "language": "en",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-5e731158bdffec8a4b"
        ]
      }
    },
    {
      "language": "de",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-5e731158bdffec8a4b"
        ]
      }
    },
    {
      "language": "fr",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-5e731158bdffec8a4b"
        ]
      }
    },
    {
      "language": "it",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-5e731158bdffec8a4b"
        ]
      }
    },
    {
      "language": "pt",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-5e731158bdffec8a4b"
        ]
      }
    },
    {
      "language": "hi",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-5e731158bdffec8a4b"
        ]
      }
    },
    {
      "language": "es",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-5e731158bdffec8a4b"
        ]
      }
    },
    {
      "language": "th",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-5e731158bdffec8a4b"
        ]
      }
    }
  ],
  "persianEvidenceStatus": "not-evaluated",
  "declaredContext": {
    "state": "known",
    "value": 131072,
    "evidenceIds": [
      "evidence:meta-llama-llama-3-2-1b-instruct-context"
    ],
    "unit": "token",
    "note": "ظرفیت اعلام‌شدهٔ ناشر؛ ارزیابی کیفیت بلندمتن در این بسته ثبت نشده است."
  },
  "evaluatedContext": {
    "state": "not-measured"
  },
  "releaseStatus": "available",
  "lastReviewedOn": "2026-09-15",
  "license": {
    "name": {
      "state": "known",
      "value": "llama3.2",
      "evidenceIds": [
        "evidence:meta-llama-llama-3-2-1b-instruct-license"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://huggingface.co/meta-llama/Llama-3.2-1B-Instruct",
      "evidenceIds": [
        "evidence:meta-llama-llama-3-2-1b-instruct-license"
      ]
    },
    "commercialUse": {
      "state": "unknown",
      "note": "وضعیت استفادهٔ تجاری احراز نشده است."
    },
    "restrictions": [
      "مجوز اختصاصی مدل؛ شروط نام‌گذاری، توزیع و استفاده باید از متن همان نسخه خوانده شود."
    ],
    "evidenceIds": [
      "evidence:meta-llama-llama-3-2-1b-instruct-license"
    ]
  },
  "evidenceIds": [
    "evidence:meta-llama-llama-3-2-1b-instruct-card",
    "evidence:meta-llama-llama-3-2-1b-instruct-metadata",
    "evidence:meta-llama-llama-3-2-1b-instruct-parameters",
    "evidence:meta-llama-llama-3-2-1b-instruct-license",
    "evidence:meta-llama-llama-3-2-1b-instruct-context",
    "evidence:four-tables-release-llama-3-2-release",
    "evidence:v03-5e731158bdffec8a4b",
    "evidence:v03-04665e2c2232e334fc"
  ],
  "releasedOn": "2024-09-25",
  "parameterCounts": [
    {
      "scope": "total",
      "label": "شمار کل اعلام‌شده",
      "value": {
        "state": "known",
        "value": 1,
        "evidenceIds": [
          "evidence:meta-llama-llama-3-2-1b-instruct-parameters"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "stored",
      "label": "تعداد عناصر پارامتری نمایهٔ Safetensors",
      "value": {
        "state": "known",
        "value": 1.2358144,
        "evidenceIds": [
          "evidence:v03-5e731158bdffec8a4b"
        ],
        "unit": "billion-parameters",
        "note": "نمایهٔ فایل وزن؛ برای وزن کوانت‌شده یا اشتراک وزن، الزاماً شمار پارامتر مستقل نیست."
      },
      "approximate": false
    }
  ]
});
models.push({
  "id": "model:meta-llama-llama-3-2-3b-instruct",
  "familyId": "family:llama",
  "exactName": "Llama-3.2-3B-Instruct",
  "publisher": "Meta",
  "version": "0cb88a4f764b7a12671c53f0838cd831a0843b95",
  "aliases": [
    "meta-llama/Llama-3.2-3B-Instruct"
  ],
  "stage": "instruct",
  "architecture": "dense",
  "totalParametersB": {
    "state": "known",
    "value": 3,
    "evidenceIds": [
      "evidence:meta-llama-llama-3-2-3b-instruct-parameters"
    ],
    "unit": "billion-parameters",
    "note": "اعداد پارامتر معرفی مدل، گرد‌شده‌اند؛ safetensors.total شمار عناصر ذخیره‌شده است و الزاماً پارامتر یکتا نیست."
  },
  "activeParametersB": {
    "state": "not-applicable"
  },
  "kind": "generative",
  "inputModalities": [
    "text"
  ],
  "outputModalities": [
    "text"
  ],
  "applications": [
    "text-work",
    "enterprise-rag",
    "structured-extraction",
    "coding-assistant",
    "agents-tools"
  ],
  "languages": [
    {
      "language": "en",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-1e81b2916ff2e09f66"
        ]
      }
    },
    {
      "language": "de",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-1e81b2916ff2e09f66"
        ]
      }
    },
    {
      "language": "fr",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-1e81b2916ff2e09f66"
        ]
      }
    },
    {
      "language": "it",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-1e81b2916ff2e09f66"
        ]
      }
    },
    {
      "language": "pt",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-1e81b2916ff2e09f66"
        ]
      }
    },
    {
      "language": "hi",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-1e81b2916ff2e09f66"
        ]
      }
    },
    {
      "language": "es",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-1e81b2916ff2e09f66"
        ]
      }
    },
    {
      "language": "th",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-1e81b2916ff2e09f66"
        ]
      }
    }
  ],
  "persianEvidenceStatus": "not-evaluated",
  "declaredContext": {
    "state": "known",
    "value": 131072,
    "evidenceIds": [
      "evidence:meta-llama-llama-3-2-3b-instruct-context"
    ],
    "unit": "token",
    "note": "ظرفیت اعلام‌شدهٔ ناشر؛ ارزیابی کیفیت بلندمتن در این بسته ثبت نشده است."
  },
  "evaluatedContext": {
    "state": "not-measured"
  },
  "releaseStatus": "available",
  "lastReviewedOn": "2026-09-15",
  "license": {
    "name": {
      "state": "known",
      "value": "llama3.2",
      "evidenceIds": [
        "evidence:meta-llama-llama-3-2-3b-instruct-license"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://huggingface.co/meta-llama/Llama-3.2-3B-Instruct",
      "evidenceIds": [
        "evidence:meta-llama-llama-3-2-3b-instruct-license"
      ]
    },
    "commercialUse": {
      "state": "unknown",
      "note": "وضعیت استفادهٔ تجاری احراز نشده است."
    },
    "restrictions": [
      "مجوز اختصاصی مدل؛ شروط نام‌گذاری، توزیع و استفاده باید از متن همان نسخه خوانده شود."
    ],
    "evidenceIds": [
      "evidence:meta-llama-llama-3-2-3b-instruct-license"
    ]
  },
  "evidenceIds": [
    "evidence:meta-llama-llama-3-2-3b-instruct-card",
    "evidence:meta-llama-llama-3-2-3b-instruct-metadata",
    "evidence:meta-llama-llama-3-2-3b-instruct-parameters",
    "evidence:meta-llama-llama-3-2-3b-instruct-license",
    "evidence:meta-llama-llama-3-2-3b-instruct-context",
    "evidence:four-tables-release-llama-3-2-release",
    "evidence:v03-1e81b2916ff2e09f66",
    "evidence:v03-40a0310c45dda9cde0"
  ],
  "releasedOn": "2024-09-25",
  "parameterCounts": [
    {
      "scope": "total",
      "label": "شمار کل اعلام‌شده",
      "value": {
        "state": "known",
        "value": 3,
        "evidenceIds": [
          "evidence:meta-llama-llama-3-2-3b-instruct-parameters"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "stored",
      "label": "تعداد عناصر پارامتری نمایهٔ Safetensors",
      "value": {
        "state": "known",
        "value": 3.212749824,
        "evidenceIds": [
          "evidence:v03-1e81b2916ff2e09f66"
        ],
        "unit": "billion-parameters",
        "note": "نمایهٔ فایل وزن؛ برای وزن کوانت‌شده یا اشتراک وزن، الزاماً شمار پارامتر مستقل نیست."
      },
      "approximate": false
    }
  ]
});
models.push({
  "id": "model:microsoft-phi-4-mini-instruct",
  "familyId": "family:phi",
  "exactName": "Phi-4-mini-instruct",
  "publisher": "Microsoft",
  "version": "cfbefacb99257ffa30c83adab238a50856ac3083",
  "aliases": [
    "microsoft/Phi-4-mini-instruct"
  ],
  "stage": "instruct",
  "architecture": "dense",
  "totalParametersB": {
    "state": "known",
    "value": 3.8,
    "evidenceIds": [
      "evidence:microsoft-phi-4-mini-instruct-parameters"
    ],
    "unit": "billion-parameters",
    "note": "اعداد پارامتر معرفی مدل، گرد‌شده‌اند؛ safetensors.total شمار عناصر ذخیره‌شده است و الزاماً پارامتر یکتا نیست."
  },
  "activeParametersB": {
    "state": "not-applicable"
  },
  "kind": "generative",
  "inputModalities": [
    "text"
  ],
  "outputModalities": [
    "text"
  ],
  "applications": [
    "text-work",
    "reasoning-analysis",
    "coding-assistant",
    "enterprise-rag",
    "structured-extraction",
    "agents-tools"
  ],
  "languages": [
    {
      "language": "multilingual",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-a381f87e0595d66bb4"
        ]
      }
    },
    {
      "language": "ar",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-a381f87e0595d66bb4"
        ]
      }
    },
    {
      "language": "zh",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-a381f87e0595d66bb4"
        ]
      }
    },
    {
      "language": "cs",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-a381f87e0595d66bb4"
        ]
      }
    },
    {
      "language": "da",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-a381f87e0595d66bb4"
        ]
      }
    },
    {
      "language": "nl",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-a381f87e0595d66bb4"
        ]
      }
    },
    {
      "language": "en",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-a381f87e0595d66bb4"
        ]
      }
    },
    {
      "language": "fi",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-a381f87e0595d66bb4"
        ]
      }
    },
    {
      "language": "fr",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-a381f87e0595d66bb4"
        ]
      }
    },
    {
      "language": "de",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-a381f87e0595d66bb4"
        ]
      }
    },
    {
      "language": "he",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-a381f87e0595d66bb4"
        ]
      }
    },
    {
      "language": "hu",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-a381f87e0595d66bb4"
        ]
      }
    },
    {
      "language": "it",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-a381f87e0595d66bb4"
        ]
      }
    },
    {
      "language": "ja",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-a381f87e0595d66bb4"
        ]
      }
    },
    {
      "language": "ko",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-a381f87e0595d66bb4"
        ]
      }
    },
    {
      "language": "no",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-a381f87e0595d66bb4"
        ]
      }
    },
    {
      "language": "pl",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-a381f87e0595d66bb4"
        ]
      }
    },
    {
      "language": "pt",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-a381f87e0595d66bb4"
        ]
      }
    },
    {
      "language": "ru",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-a381f87e0595d66bb4"
        ]
      }
    },
    {
      "language": "es",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-a381f87e0595d66bb4"
        ]
      }
    },
    {
      "language": "sv",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-a381f87e0595d66bb4"
        ]
      }
    },
    {
      "language": "th",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-a381f87e0595d66bb4"
        ]
      }
    },
    {
      "language": "tr",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-a381f87e0595d66bb4"
        ]
      }
    },
    {
      "language": "uk",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-a381f87e0595d66bb4"
        ]
      }
    }
  ],
  "persianEvidenceStatus": "not-evaluated",
  "declaredContext": {
    "state": "known",
    "value": 131072,
    "evidenceIds": [
      "evidence:microsoft-phi-4-mini-instruct-context"
    ],
    "unit": "token",
    "note": "ظرفیت اعلام‌شدهٔ ناشر؛ ارزیابی کیفیت بلندمتن در این بسته ثبت نشده است."
  },
  "evaluatedContext": {
    "state": "not-measured"
  },
  "releaseStatus": "available",
  "lastReviewedOn": "2026-09-15",
  "license": {
    "name": {
      "state": "known",
      "value": "MIT",
      "evidenceIds": [
        "evidence:microsoft-phi-4-mini-instruct-license"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://huggingface.co/microsoft/Phi-4-mini-instruct/resolve/main/LICENSE",
      "evidenceIds": [
        "evidence:microsoft-phi-4-mini-instruct-license"
      ]
    },
    "commercialUse": {
      "state": "known",
      "value": "allowed",
      "evidenceIds": [
        "evidence:microsoft-phi-4-mini-instruct-license"
      ]
    },
    "restrictions": [],
    "evidenceIds": [
      "evidence:microsoft-phi-4-mini-instruct-license"
    ]
  },
  "evidenceIds": [
    "evidence:microsoft-phi-4-mini-instruct-card",
    "evidence:microsoft-phi-4-mini-instruct-metadata",
    "evidence:microsoft-phi-4-mini-instruct-parameters",
    "evidence:microsoft-phi-4-mini-instruct-license",
    "evidence:microsoft-phi-4-mini-instruct-context",
    "evidence:microsoft-phi-4-mini-instruct-config",
    "evidence:four-tables-release-phi-4-mini-instruct-release",
    "evidence:v03-a381f87e0595d66bb4",
    "evidence:v03-ba9cd843c0a35040af"
  ],
  "releasedOn": "2025-02",
  "parameterCounts": [
    {
      "scope": "total",
      "label": "شمار کل اعلام‌شده",
      "value": {
        "state": "known",
        "value": 3.8,
        "evidenceIds": [
          "evidence:microsoft-phi-4-mini-instruct-parameters"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "stored",
      "label": "تعداد عناصر پارامتری نمایهٔ Safetensors",
      "value": {
        "state": "known",
        "value": 3.83602176,
        "evidenceIds": [
          "evidence:v03-a381f87e0595d66bb4"
        ],
        "unit": "billion-parameters",
        "note": "نمایهٔ فایل وزن؛ برای وزن کوانت‌شده یا اشتراک وزن، الزاماً شمار پارامتر مستقل نیست."
      },
      "approximate": false
    }
  ]
});
models.push({
  "id": "model:mistralai-devstral-small-2-24b-instruct-2512",
  "familyId": "family:mistral",
  "exactName": "Devstral-Small-2-24B-Instruct-2512",
  "publisher": "Mistral AI",
  "version": "55c5b41e98c2dbd21b0c8afffc540dcfc9eb5128",
  "aliases": [
    "mistralai/Devstral-Small-2-24B-Instruct-2512"
  ],
  "stage": "instruct",
  "architecture": "dense",
  "totalParametersB": {
    "state": "known",
    "value": 24,
    "evidenceIds": [
      "evidence:mistralai-devstral-small-2-24b-instruct-2512-parameters"
    ],
    "unit": "billion-parameters",
    "note": "اعداد پارامتر معرفی مدل، گرد‌شده‌اند؛ safetensors.total شمار عناصر ذخیره‌شده است و الزاماً پارامتر یکتا نیست."
  },
  "activeParametersB": {
    "state": "not-applicable"
  },
  "kind": "vision-language",
  "inputModalities": [
    "text",
    "image"
  ],
  "outputModalities": [
    "text"
  ],
  "applications": [
    "coding-assistant",
    "agents-tools",
    "document-vision",
    "text-work",
    "enterprise-rag",
    "structured-extraction"
  ],
  "languages": [
    {
      "language": "multilingual",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-143cf593115d83d150"
        ]
      }
    }
  ],
  "persianEvidenceStatus": "not-evaluated",
  "declaredContext": {
    "state": "known",
    "value": 262144,
    "evidenceIds": [
      "evidence:mistralai-devstral-small-2-24b-instruct-2512-context"
    ],
    "unit": "token",
    "note": "ظرفیت اعلام‌شدهٔ ناشر؛ ارزیابی کیفیت بلندمتن در این بسته ثبت نشده است."
  },
  "evaluatedContext": {
    "state": "not-measured"
  },
  "releaseStatus": "available",
  "lastReviewedOn": "2026-09-15",
  "license": {
    "name": {
      "state": "known",
      "value": "Apache-2.0",
      "evidenceIds": [
        "evidence:mistralai-devstral-small-2-24b-instruct-2512-license"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://huggingface.co/mistralai/Devstral-Small-2-24B-Instruct-2512/blob/55c5b41e98c2dbd21b0c8afffc540dcfc9eb5128/README.md",
      "evidenceIds": [
        "evidence:mistralai-devstral-small-2-24b-instruct-2512-license"
      ]
    },
    "commercialUse": {
      "state": "known",
      "value": "allowed",
      "evidenceIds": [
        "evidence:mistralai-devstral-small-2-24b-instruct-2512-license"
      ]
    },
    "restrictions": [],
    "evidenceIds": [
      "evidence:mistralai-devstral-small-2-24b-instruct-2512-license"
    ]
  },
  "evidenceIds": [
    "evidence:mistralai-devstral-small-2-24b-instruct-2512-card",
    "evidence:mistralai-devstral-small-2-24b-instruct-2512-metadata",
    "evidence:mistralai-devstral-small-2-24b-instruct-2512-parameters",
    "evidence:mistralai-devstral-small-2-24b-instruct-2512-license",
    "evidence:mistralai-devstral-small-2-24b-instruct-2512-context",
    "evidence:mistralai-devstral-small-2-24b-instruct-2512-config",
    "evidence:four-tables-release-devstral-small-2-release",
    "evidence:v03-143cf593115d83d150"
  ],
  "releasedOn": "2025-12-09",
  "parameterCounts": [
    {
      "scope": "total",
      "label": "شمار کل اعلام‌شده",
      "value": {
        "state": "known",
        "value": 24,
        "evidenceIds": [
          "evidence:mistralai-devstral-small-2-24b-instruct-2512-parameters"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "stored",
      "label": "تعداد عناصر پارامتری نمایهٔ Safetensors",
      "value": {
        "state": "known",
        "value": 24.01136184,
        "evidenceIds": [
          "evidence:v03-19c6925f3bfe6955b2"
        ],
        "unit": "billion-parameters",
        "note": "نمایهٔ فایل وزن؛ برای وزن کوانت‌شده یا اشتراک وزن، الزاماً شمار پارامتر مستقل نیست."
      },
      "approximate": false
    }
  ]
});
models.push({
  "id": "model:mistralai-ministral-3-3b-instruct-2512",
  "familyId": "family:mistral",
  "exactName": "Ministral-3-3B-Instruct-2512",
  "publisher": "Mistral AI",
  "version": "b35d4dfe56c142746f54dbd64f579faab2744308",
  "aliases": [
    "mistralai/Ministral-3-3B-Instruct-2512"
  ],
  "stage": "instruct",
  "architecture": "dense",
  "totalParametersB": {
    "state": "unknown",
    "note": "شمار کل با دامنهٔ یکنواخت تأیید نشده؛ شمار جزء زبانی، فعال یا ذخیره‌شده جای آن ننشسته است.",
    "evidenceIds": [
      "evidence:mistralai-ministral-3-3b-instruct-2512-parameters",
      "evidence:mistralai-ministral-3-3b-instruct-2512-metadata"
    ]
  },
  "activeParametersB": {
    "state": "not-applicable"
  },
  "kind": "vision-language",
  "inputModalities": [
    "text",
    "image"
  ],
  "outputModalities": [
    "text"
  ],
  "applications": [
    "text-work",
    "document-vision",
    "enterprise-rag",
    "structured-extraction",
    "coding-assistant",
    "agents-tools"
  ],
  "languages": [
    {
      "language": "en",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-6d2fb461f9bd72440b"
        ]
      }
    },
    {
      "language": "fr",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-6d2fb461f9bd72440b"
        ]
      }
    },
    {
      "language": "es",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-6d2fb461f9bd72440b"
        ]
      }
    },
    {
      "language": "de",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-6d2fb461f9bd72440b"
        ]
      }
    },
    {
      "language": "it",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-6d2fb461f9bd72440b"
        ]
      }
    },
    {
      "language": "pt",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-6d2fb461f9bd72440b"
        ]
      }
    },
    {
      "language": "nl",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-6d2fb461f9bd72440b"
        ]
      }
    },
    {
      "language": "zh",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-6d2fb461f9bd72440b"
        ]
      }
    },
    {
      "language": "ja",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-6d2fb461f9bd72440b"
        ]
      }
    },
    {
      "language": "ko",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-6d2fb461f9bd72440b"
        ]
      }
    },
    {
      "language": "ar",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-6d2fb461f9bd72440b"
        ]
      }
    }
  ],
  "persianEvidenceStatus": "not-evaluated",
  "declaredContext": {
    "state": "known",
    "value": 262144,
    "evidenceIds": [
      "evidence:mistralai-ministral-3-3b-instruct-2512-context"
    ],
    "unit": "token",
    "note": "ظرفیت اعلام‌شدهٔ ناشر؛ ارزیابی کیفیت بلندمتن در این بسته ثبت نشده است."
  },
  "evaluatedContext": {
    "state": "not-measured"
  },
  "releaseStatus": "available",
  "lastReviewedOn": "2026-09-15",
  "license": {
    "name": {
      "state": "known",
      "value": "Apache-2.0",
      "evidenceIds": [
        "evidence:mistralai-ministral-3-3b-instruct-2512-license"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://huggingface.co/mistralai/Ministral-3-3B-Instruct-2512/blob/b35d4dfe56c142746f54dbd64f579faab2744308/README.md",
      "evidenceIds": [
        "evidence:mistralai-ministral-3-3b-instruct-2512-license"
      ]
    },
    "commercialUse": {
      "state": "known",
      "value": "allowed",
      "evidenceIds": [
        "evidence:mistralai-ministral-3-3b-instruct-2512-license"
      ]
    },
    "restrictions": [],
    "evidenceIds": [
      "evidence:mistralai-ministral-3-3b-instruct-2512-license"
    ]
  },
  "evidenceIds": [
    "evidence:mistralai-ministral-3-3b-instruct-2512-card",
    "evidence:mistralai-ministral-3-3b-instruct-2512-metadata",
    "evidence:mistralai-ministral-3-3b-instruct-2512-parameters",
    "evidence:mistralai-ministral-3-3b-instruct-2512-license",
    "evidence:mistralai-ministral-3-3b-instruct-2512-context",
    "evidence:mistralai-ministral-3-3b-instruct-2512-config",
    "evidence:four-tables-release-ministral-3-release",
    "evidence:v03-6d2fb461f9bd72440b",
    "evidence:v03-422e53fb9ef68804c9"
  ],
  "releasedOn": "2025-12-02",
  "parameterCounts": [
    {
      "scope": "language-component",
      "label": "جزء زبانی",
      "value": {
        "state": "known",
        "value": 3.4,
        "evidenceIds": [
          "evidence:mistralai-ministral-3-3b-instruct-2512-card"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "vision-component",
      "label": "رمزگذار تصویر",
      "value": {
        "state": "known",
        "value": 0.4,
        "evidenceIds": [
          "evidence:mistralai-ministral-3-3b-instruct-2512-card"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "stored",
      "label": "تعداد عناصر پارامتری نمایهٔ Safetensors",
      "value": {
        "state": "known",
        "value": 3.849090048,
        "evidenceIds": [
          "evidence:v03-6d2fb461f9bd72440b"
        ],
        "unit": "billion-parameters",
        "note": "نمایهٔ فایل وزن؛ برای وزن کوانت‌شده یا اشتراک وزن، الزاماً شمار پارامتر مستقل نیست."
      },
      "approximate": false
    }
  ],
  "contextCondition": "وزن منتشرشده FP8؛ ظرفیت اجرا به precision و حافظهٔ زمینه وابسته است."
});
models.push({
  "id": "model:mistralai-mistral-7b-instruct-v0-3",
  "familyId": "family:mistral",
  "exactName": "Mistral-7B-Instruct-v0.3",
  "publisher": "Mistral AI",
  "version": "c170c708c41dac9275d15a8fff4eca08d52bab71",
  "aliases": [
    "mistralai/Mistral-7B-Instruct-v0.3"
  ],
  "stage": "instruct",
  "architecture": "dense",
  "totalParametersB": {
    "state": "known",
    "value": 7,
    "evidenceIds": [
      "evidence:mistralai-mistral-7b-instruct-v0-3-parameters"
    ],
    "unit": "billion-parameters",
    "note": "اعداد پارامتر معرفی مدل، گرد‌شده‌اند؛ safetensors.total شمار عناصر ذخیره‌شده است و الزاماً پارامتر یکتا نیست."
  },
  "activeParametersB": {
    "state": "not-applicable"
  },
  "kind": "generative",
  "inputModalities": [
    "text"
  ],
  "outputModalities": [
    "text"
  ],
  "applications": [
    "text-work",
    "agents-tools",
    "enterprise-rag",
    "structured-extraction"
  ],
  "languages": [],
  "persianEvidenceStatus": "not-evaluated",
  "declaredContext": {
    "state": "known",
    "value": 32768,
    "evidenceIds": [
      "evidence:four-tables-mistralai-mistral-7b-instruct-v0-3-declared-context"
    ],
    "unit": "token",
    "note": "ظرفیت اعلام‌شدهٔ ناشر؛ حداقل حافظه یا تضمین کیفیت بلندمتن نیست."
  },
  "evaluatedContext": {
    "state": "not-measured"
  },
  "releaseStatus": "available",
  "lastReviewedOn": "2026-09-15",
  "license": {
    "name": {
      "state": "known",
      "value": "Apache-2.0",
      "evidenceIds": [
        "evidence:mistralai-mistral-7b-instruct-v0-3-license"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://huggingface.co/mistralai/Mistral-7B-Instruct-v0.3/blob/c170c708c41dac9275d15a8fff4eca08d52bab71/README.md",
      "evidenceIds": [
        "evidence:mistralai-mistral-7b-instruct-v0-3-license"
      ]
    },
    "commercialUse": {
      "state": "known",
      "value": "allowed",
      "evidenceIds": [
        "evidence:mistralai-mistral-7b-instruct-v0-3-license"
      ]
    },
    "restrictions": [],
    "evidenceIds": [
      "evidence:mistralai-mistral-7b-instruct-v0-3-license"
    ]
  },
  "evidenceIds": [
    "evidence:mistralai-mistral-7b-instruct-v0-3-card",
    "evidence:mistralai-mistral-7b-instruct-v0-3-metadata",
    "evidence:mistralai-mistral-7b-instruct-v0-3-parameters",
    "evidence:mistralai-mistral-7b-instruct-v0-3-license",
    "evidence:mistralai-mistral-7b-instruct-v0-3-config",
    "evidence:four-tables-release-mistral-7b-v0-3-release",
    "evidence:four-tables-mistralai-mistral-7b-instruct-v0-3-declared-context",
    "evidence:v03-d38ebbe65582b41c27"
  ],
  "parameterCounts": [
    {
      "scope": "total",
      "label": "شمار کل اعلام‌شده",
      "value": {
        "state": "known",
        "value": 7,
        "evidenceIds": [
          "evidence:mistralai-mistral-7b-instruct-v0-3-parameters"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "stored",
      "label": "تعداد عناصر پارامتری نمایهٔ Safetensors",
      "value": {
        "state": "known",
        "value": 7.248023552,
        "evidenceIds": [
          "evidence:v03-da4832a5e1de205edf"
        ],
        "unit": "billion-parameters",
        "note": "نمایهٔ فایل وزن؛ برای وزن کوانت‌شده یا اشتراک وزن، الزاماً شمار پارامتر مستقل نیست."
      },
      "approximate": false
    }
  ],
  "releasedOn": "2024-05-22"
});
models.push({
  "id": "model:mistralai-mistral-small-3-1-24b-instruct-2503",
  "familyId": "family:mistral",
  "exactName": "Mistral-Small-3.1-24B-Instruct-2503",
  "publisher": "Mistral AI",
  "version": "68faf511d618ef198fef186659617cfd2eb8e33a",
  "aliases": [
    "mistralai/Mistral-Small-3.1-24B-Instruct-2503"
  ],
  "stage": "instruct",
  "architecture": "dense",
  "totalParametersB": {
    "state": "known",
    "value": 24,
    "evidenceIds": [
      "evidence:mistralai-mistral-small-3-1-24b-instruct-2503-parameters"
    ],
    "unit": "billion-parameters",
    "note": "اعداد پارامتر معرفی مدل، گرد‌شده‌اند؛ safetensors.total شمار عناصر ذخیره‌شده است و الزاماً پارامتر یکتا نیست."
  },
  "activeParametersB": {
    "state": "not-applicable"
  },
  "kind": "vision-language",
  "inputModalities": [
    "text",
    "image"
  ],
  "outputModalities": [
    "text"
  ],
  "applications": [
    "text-work",
    "document-vision",
    "enterprise-rag",
    "structured-extraction",
    "coding-assistant",
    "agents-tools"
  ],
  "languages": [
    {
      "language": "en",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b2ab60760fa738c0cc"
        ]
      }
    },
    {
      "language": "fr",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b2ab60760fa738c0cc"
        ]
      }
    },
    {
      "language": "de",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b2ab60760fa738c0cc"
        ]
      }
    },
    {
      "language": "es",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b2ab60760fa738c0cc"
        ]
      }
    },
    {
      "language": "pt",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b2ab60760fa738c0cc"
        ]
      }
    },
    {
      "language": "it",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b2ab60760fa738c0cc"
        ]
      }
    },
    {
      "language": "ja",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b2ab60760fa738c0cc"
        ]
      }
    },
    {
      "language": "ko",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b2ab60760fa738c0cc"
        ]
      }
    },
    {
      "language": "ru",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b2ab60760fa738c0cc"
        ]
      }
    },
    {
      "language": "zh",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b2ab60760fa738c0cc"
        ]
      }
    },
    {
      "language": "ar",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b2ab60760fa738c0cc"
        ]
      }
    },
    {
      "language": "fa",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b2ab60760fa738c0cc"
        ]
      }
    },
    {
      "language": "id",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b2ab60760fa738c0cc"
        ]
      }
    },
    {
      "language": "ms",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b2ab60760fa738c0cc"
        ]
      }
    },
    {
      "language": "ne",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b2ab60760fa738c0cc"
        ]
      }
    },
    {
      "language": "pl",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b2ab60760fa738c0cc"
        ]
      }
    },
    {
      "language": "ro",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b2ab60760fa738c0cc"
        ]
      }
    },
    {
      "language": "sr",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b2ab60760fa738c0cc"
        ]
      }
    },
    {
      "language": "sv",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b2ab60760fa738c0cc"
        ]
      }
    },
    {
      "language": "tr",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b2ab60760fa738c0cc"
        ]
      }
    },
    {
      "language": "uk",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b2ab60760fa738c0cc"
        ]
      }
    },
    {
      "language": "vi",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b2ab60760fa738c0cc"
        ]
      }
    },
    {
      "language": "hi",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b2ab60760fa738c0cc"
        ]
      }
    },
    {
      "language": "bn",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b2ab60760fa738c0cc"
        ]
      }
    }
  ],
  "persianEvidenceStatus": "publisher-claimed",
  "declaredContext": {
    "state": "known",
    "value": 131072,
    "evidenceIds": [
      "evidence:mistralai-mistral-small-3-1-24b-instruct-2503-context"
    ],
    "unit": "token",
    "note": "ظرفیت اعلام‌شدهٔ ناشر؛ ارزیابی کیفیت بلندمتن در این بسته ثبت نشده است."
  },
  "evaluatedContext": {
    "state": "not-measured"
  },
  "releaseStatus": "available",
  "lastReviewedOn": "2026-09-15",
  "license": {
    "name": {
      "state": "known",
      "value": "Apache-2.0",
      "evidenceIds": [
        "evidence:mistralai-mistral-small-3-1-24b-instruct-2503-license"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://huggingface.co/mistralai/Mistral-Small-3.1-24B-Instruct-2503/blob/68faf511d618ef198fef186659617cfd2eb8e33a/README.md",
      "evidenceIds": [
        "evidence:mistralai-mistral-small-3-1-24b-instruct-2503-license"
      ]
    },
    "commercialUse": {
      "state": "known",
      "value": "allowed",
      "evidenceIds": [
        "evidence:mistralai-mistral-small-3-1-24b-instruct-2503-license"
      ]
    },
    "restrictions": [],
    "evidenceIds": [
      "evidence:mistralai-mistral-small-3-1-24b-instruct-2503-license"
    ]
  },
  "evidenceIds": [
    "evidence:mistralai-mistral-small-3-1-24b-instruct-2503-card",
    "evidence:mistralai-mistral-small-3-1-24b-instruct-2503-metadata",
    "evidence:mistralai-mistral-small-3-1-24b-instruct-2503-parameters",
    "evidence:mistralai-mistral-small-3-1-24b-instruct-2503-license",
    "evidence:mistralai-mistral-small-3-1-24b-instruct-2503-context",
    "evidence:mistralai-mistral-small-3-1-24b-instruct-2503-config",
    "evidence:four-tables-release-mistral-small-3-1-release",
    "evidence:v03-b2ab60760fa738c0cc",
    "evidence:v03-87c60f49d69f5b94bc"
  ],
  "releasedOn": "2025-03-17",
  "parameterCounts": [
    {
      "scope": "total",
      "label": "شمار کل اعلام‌شده",
      "value": {
        "state": "known",
        "value": 24,
        "evidenceIds": [
          "evidence:mistralai-mistral-small-3-1-24b-instruct-2503-parameters"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "stored",
      "label": "تعداد عناصر پارامتری نمایهٔ Safetensors",
      "value": {
        "state": "known",
        "value": 24.01136128,
        "evidenceIds": [
          "evidence:v03-b2ab60760fa738c0cc"
        ],
        "unit": "billion-parameters",
        "note": "نمایهٔ فایل وزن؛ برای وزن کوانت‌شده یا اشتراک وزن، الزاماً شمار پارامتر مستقل نیست."
      },
      "approximate": false
    }
  ]
});
models.push({
  "id": "model:nvidia-nvidia-nemotron-nano-9b-v2",
  "familyId": "family:nemotron",
  "exactName": "NVIDIA-Nemotron-Nano-9B-v2",
  "publisher": "NVIDIA",
  "version": "6533e8de2c68e4536bf7c411d7a3ce5734111476",
  "aliases": [
    "nvidia/NVIDIA-Nemotron-Nano-9B-v2"
  ],
  "stage": "instruct",
  "architecture": "hybrid",
  "totalParametersB": {
    "state": "known",
    "value": 9,
    "evidenceIds": [
      "evidence:nvidia-nvidia-nemotron-nano-9b-v2-parameters"
    ],
    "unit": "billion-parameters",
    "note": "اعداد پارامتر معرفی مدل، گرد‌شده‌اند؛ safetensors.total شمار عناصر ذخیره‌شده است و الزاماً پارامتر یکتا نیست."
  },
  "activeParametersB": {
    "state": "unknown",
    "note": "شمار فعال دقیق این گونه و فاز اجرا تأیید نشده است.",
    "evidenceIds": [
      "evidence:nvidia-nvidia-nemotron-nano-9b-v2-parameters"
    ]
  },
  "kind": "generative",
  "inputModalities": [
    "text"
  ],
  "outputModalities": [
    "text"
  ],
  "applications": [
    "text-work",
    "enterprise-rag",
    "coding-assistant",
    "agents-tools",
    "reasoning-analysis",
    "structured-extraction"
  ],
  "languages": [
    {
      "language": "en",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-8e3fd4ba50887ab622"
        ]
      }
    },
    {
      "language": "es",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-8e3fd4ba50887ab622"
        ]
      }
    },
    {
      "language": "fr",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-8e3fd4ba50887ab622"
        ]
      }
    },
    {
      "language": "de",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-8e3fd4ba50887ab622"
        ]
      }
    },
    {
      "language": "it",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-8e3fd4ba50887ab622"
        ]
      }
    },
    {
      "language": "ja",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-8e3fd4ba50887ab622"
        ]
      }
    }
  ],
  "persianEvidenceStatus": "not-evaluated",
  "declaredContext": {
    "state": "known",
    "value": 131072,
    "evidenceIds": [
      "evidence:nvidia-nvidia-nemotron-nano-9b-v2-context"
    ],
    "unit": "token",
    "note": "ظرفیت اعلام‌شدهٔ ناشر؛ ارزیابی کیفیت بلندمتن در این بسته ثبت نشده است."
  },
  "evaluatedContext": {
    "state": "not-measured"
  },
  "releaseStatus": "available",
  "lastReviewedOn": "2026-09-15",
  "license": {
    "name": {
      "state": "known",
      "value": "nvidia-open-model-license",
      "evidenceIds": [
        "evidence:nvidia-nvidia-nemotron-nano-9b-v2-license"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://www.nvidia.com/en-us/agreements/enterprise-software/nvidia-open-model-license/",
      "evidenceIds": [
        "evidence:nvidia-nvidia-nemotron-nano-9b-v2-license"
      ]
    },
    "commercialUse": {
      "state": "unknown",
      "note": "وضعیت استفادهٔ تجاری احراز نشده است."
    },
    "restrictions": [],
    "evidenceIds": [
      "evidence:nvidia-nvidia-nemotron-nano-9b-v2-license"
    ]
  },
  "evidenceIds": [
    "evidence:nvidia-nvidia-nemotron-nano-9b-v2-card",
    "evidence:nvidia-nvidia-nemotron-nano-9b-v2-metadata",
    "evidence:nvidia-nvidia-nemotron-nano-9b-v2-parameters",
    "evidence:nvidia-nvidia-nemotron-nano-9b-v2-license",
    "evidence:nvidia-nvidia-nemotron-nano-9b-v2-context",
    "evidence:nvidia-nvidia-nemotron-nano-9b-v2-config",
    "evidence:four-tables-release-nvidia-nemotron-nano-9b-v2-release",
    "evidence:v03-8e3fd4ba50887ab622",
    "evidence:v03-01e476ff57f8263d52"
  ],
  "releasedOn": "2025-08-18",
  "parameterCounts": [
    {
      "scope": "total",
      "label": "شمار کل اعلام‌شده",
      "value": {
        "state": "known",
        "value": 9,
        "evidenceIds": [
          "evidence:nvidia-nvidia-nemotron-nano-9b-v2-parameters"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "stored",
      "label": "تعداد عناصر پارامتری نمایهٔ Safetensors",
      "value": {
        "state": "known",
        "value": 8.888227328,
        "evidenceIds": [
          "evidence:v03-8e3fd4ba50887ab622"
        ],
        "unit": "billion-parameters",
        "note": "نمایهٔ فایل وزن؛ برای وزن کوانت‌شده یا اشتراک وزن، الزاماً شمار پارامتر مستقل نیست."
      },
      "approximate": false
    }
  ]
});
models.push({
  "id": "model:openai-gpt-oss-120b",
  "familyId": "family:gpt-oss",
  "exactName": "gpt-oss-120b",
  "publisher": "OpenAI",
  "version": "b5c939de8f754692c1647ca79fbf85e8c1e70f8a",
  "aliases": [
    "openai/gpt-oss-120b"
  ],
  "stage": "reasoning",
  "architecture": "moe",
  "totalParametersB": {
    "state": "known",
    "value": 117,
    "evidenceIds": [
      "evidence:openai-gpt-oss-120b-parameters"
    ],
    "unit": "billion-parameters",
    "note": "اعداد پارامتر معرفی مدل، گرد‌شده‌اند؛ safetensors.total شمار عناصر ذخیره‌شده است و الزاماً پارامتر یکتا نیست."
  },
  "activeParametersB": {
    "state": "known",
    "value": 5.1,
    "evidenceIds": [
      "evidence:openai-gpt-oss-120b-parameters"
    ],
    "unit": "billion-parameters",
    "note": "شمار فعال اعلام‌شده برای هر توکن؛ معیار حافظهٔ کل وزن‌ها نیست."
  },
  "kind": "generative",
  "inputModalities": [
    "text"
  ],
  "outputModalities": [
    "text"
  ],
  "applications": [
    "text-work",
    "reasoning-analysis",
    "agents-tools",
    "structured-extraction",
    "enterprise-rag"
  ],
  "languages": [],
  "persianEvidenceStatus": "not-evaluated",
  "declaredContext": {
    "state": "known",
    "value": 131072,
    "evidenceIds": [
      "evidence:four-tables-openai-gpt-oss-120b-declared-context"
    ],
    "unit": "token",
    "note": "ظرفیت اعلام‌شدهٔ ناشر؛ حداقل حافظه یا تضمین کیفیت بلندمتن نیست."
  },
  "evaluatedContext": {
    "state": "not-measured"
  },
  "releaseStatus": "available",
  "lastReviewedOn": "2026-09-15",
  "license": {
    "name": {
      "state": "known",
      "value": "Apache-2.0",
      "evidenceIds": [
        "evidence:openai-gpt-oss-120b-license"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://huggingface.co/openai/gpt-oss-120b/blob/b5c939de8f754692c1647ca79fbf85e8c1e70f8a/README.md",
      "evidenceIds": [
        "evidence:openai-gpt-oss-120b-license"
      ]
    },
    "commercialUse": {
      "state": "known",
      "value": "allowed",
      "evidenceIds": [
        "evidence:openai-gpt-oss-120b-license"
      ]
    },
    "restrictions": [],
    "evidenceIds": [
      "evidence:openai-gpt-oss-120b-license"
    ]
  },
  "evidenceIds": [
    "evidence:openai-gpt-oss-120b-card",
    "evidence:openai-gpt-oss-120b-metadata",
    "evidence:openai-gpt-oss-120b-parameters",
    "evidence:openai-gpt-oss-120b-license",
    "evidence:openai-gpt-oss-120b-config",
    "evidence:four-tables-release-gpt-oss-release",
    "evidence:four-tables-openai-gpt-oss-120b-declared-context",
    "evidence:v03-576214d889218d9022"
  ],
  "releasedOn": "2025-08-05",
  "parameterCounts": [
    {
      "scope": "total",
      "label": "شمار کل اعلام‌شده",
      "value": {
        "state": "known",
        "value": 117,
        "evidenceIds": [
          "evidence:openai-gpt-oss-120b-parameters"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "stored",
      "label": "تعداد عناصر پارامتری نمایهٔ Safetensors",
      "value": {
        "state": "known",
        "value": 116.829156672,
        "evidenceIds": [
          "evidence:v03-9bfd86a616186c31d9"
        ],
        "unit": "billion-parameters",
        "note": "نمایهٔ فایل وزن؛ برای وزن کوانت‌شده یا اشتراک وزن، الزاماً شمار پارامتر مستقل نیست."
      },
      "approximate": false
    }
  ],
  "contextCondition": "با تنظیمات YaRN همراه مدل منتشرشده"
});
models.push({
  "id": "model:openai-gpt-oss-20b",
  "familyId": "family:gpt-oss",
  "exactName": "gpt-oss-20b",
  "publisher": "OpenAI",
  "version": "6cee5e81ee83917806bbde320786a8fb61efebee",
  "aliases": [
    "openai/gpt-oss-20b"
  ],
  "stage": "reasoning",
  "architecture": "moe",
  "totalParametersB": {
    "state": "known",
    "value": 21,
    "evidenceIds": [
      "evidence:openai-gpt-oss-20b-parameters"
    ],
    "unit": "billion-parameters",
    "note": "اعداد پارامتر معرفی مدل، گرد‌شده‌اند؛ safetensors.total شمار عناصر ذخیره‌شده است و الزاماً پارامتر یکتا نیست."
  },
  "activeParametersB": {
    "state": "known",
    "value": 3.6,
    "evidenceIds": [
      "evidence:openai-gpt-oss-20b-parameters"
    ],
    "unit": "billion-parameters",
    "note": "شمار فعال اعلام‌شده برای هر توکن؛ معیار حافظهٔ کل وزن‌ها نیست."
  },
  "kind": "generative",
  "inputModalities": [
    "text"
  ],
  "outputModalities": [
    "text"
  ],
  "applications": [
    "text-work",
    "reasoning-analysis",
    "agents-tools",
    "structured-extraction",
    "enterprise-rag"
  ],
  "languages": [],
  "persianEvidenceStatus": "not-evaluated",
  "declaredContext": {
    "state": "known",
    "value": 131072,
    "evidenceIds": [
      "evidence:four-tables-openai-gpt-oss-20b-declared-context"
    ],
    "unit": "token",
    "note": "ظرفیت اعلام‌شدهٔ ناشر؛ حداقل حافظه یا تضمین کیفیت بلندمتن نیست."
  },
  "evaluatedContext": {
    "state": "not-measured"
  },
  "releaseStatus": "available",
  "lastReviewedOn": "2026-09-15",
  "license": {
    "name": {
      "state": "known",
      "value": "Apache-2.0",
      "evidenceIds": [
        "evidence:openai-gpt-oss-20b-license"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://huggingface.co/openai/gpt-oss-20b/blob/6cee5e81ee83917806bbde320786a8fb61efebee/README.md",
      "evidenceIds": [
        "evidence:openai-gpt-oss-20b-license"
      ]
    },
    "commercialUse": {
      "state": "known",
      "value": "allowed",
      "evidenceIds": [
        "evidence:openai-gpt-oss-20b-license"
      ]
    },
    "restrictions": [],
    "evidenceIds": [
      "evidence:openai-gpt-oss-20b-license"
    ]
  },
  "evidenceIds": [
    "evidence:openai-gpt-oss-20b-card",
    "evidence:openai-gpt-oss-20b-metadata",
    "evidence:openai-gpt-oss-20b-parameters",
    "evidence:openai-gpt-oss-20b-license",
    "evidence:openai-gpt-oss-20b-config",
    "evidence:four-tables-release-gpt-oss-release",
    "evidence:four-tables-openai-gpt-oss-20b-declared-context",
    "evidence:v03-fd7d1b23f44c3bb39c"
  ],
  "releasedOn": "2025-08-05",
  "parameterCounts": [
    {
      "scope": "total",
      "label": "شمار کل اعلام‌شده",
      "value": {
        "state": "known",
        "value": 21,
        "evidenceIds": [
          "evidence:openai-gpt-oss-20b-parameters"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "stored",
      "label": "تعداد عناصر پارامتری نمایهٔ Safetensors",
      "value": {
        "state": "known",
        "value": 20.914757184,
        "evidenceIds": [
          "evidence:v03-74a45e972c4b57d11b"
        ],
        "unit": "billion-parameters",
        "note": "نمایهٔ فایل وزن؛ برای وزن کوانت‌شده یا اشتراک وزن، الزاماً شمار پارامتر مستقل نیست."
      },
      "approximate": false
    }
  ],
  "contextCondition": "با تنظیمات YaRN همراه مدل منتشرشده"
});
models.push({
  "id": "model:zai-org-glm-4-7-flash",
  "familyId": "family:glm",
  "exactName": "GLM-4.7-Flash",
  "publisher": "Z.ai",
  "version": "7dd20894a642a0aa287e9827cb1a1f7f91386b67",
  "aliases": [
    "zai-org/GLM-4.7-Flash"
  ],
  "stage": "reasoning",
  "architecture": "moe",
  "totalParametersB": {
    "state": "known",
    "value": 30,
    "evidenceIds": [
      "evidence:zai-org-glm-4-7-flash-parameters"
    ],
    "unit": "billion-parameters",
    "note": "اعداد پارامتر معرفی مدل، گرد‌شده‌اند؛ safetensors.total شمار عناصر ذخیره‌شده است و الزاماً پارامتر یکتا نیست."
  },
  "activeParametersB": {
    "state": "known",
    "value": 3,
    "evidenceIds": [
      "evidence:zai-org-glm-4-7-flash-parameters"
    ],
    "unit": "billion-parameters",
    "note": "شمار فعال اعلام‌شده برای هر توکن؛ معیار حافظهٔ کل وزن‌ها نیست."
  },
  "kind": "generative",
  "inputModalities": [
    "text"
  ],
  "outputModalities": [
    "text"
  ],
  "applications": [
    "text-work",
    "coding-assistant",
    "agents-tools",
    "reasoning-analysis",
    "enterprise-rag",
    "structured-extraction"
  ],
  "languages": [
    {
      "language": "en",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-82d7615468fe0b242b"
        ]
      }
    },
    {
      "language": "zh",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-82d7615468fe0b242b"
        ]
      }
    }
  ],
  "persianEvidenceStatus": "not-evaluated",
  "declaredContext": {
    "state": "known",
    "value": 202752,
    "evidenceIds": [
      "evidence:v03-0bbf3663567eef8181"
    ],
    "unit": "token",
    "note": "حد پیکربندی منتشرشده؛ ورودی و خروجی و نشانه‌های ویژه از همین بودجه استفاده می‌کنند."
  },
  "evaluatedContext": {
    "state": "not-measured"
  },
  "releaseStatus": "available",
  "lastReviewedOn": "2026-09-15",
  "license": {
    "name": {
      "state": "known",
      "value": "MIT",
      "evidenceIds": [
        "evidence:zai-org-glm-4-7-flash-license"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://huggingface.co/zai-org/GLM-4.7-Flash/blob/7dd20894a642a0aa287e9827cb1a1f7f91386b67/README.md",
      "evidenceIds": [
        "evidence:zai-org-glm-4-7-flash-license"
      ]
    },
    "commercialUse": {
      "state": "known",
      "value": "allowed",
      "evidenceIds": [
        "evidence:zai-org-glm-4-7-flash-license"
      ]
    },
    "restrictions": [],
    "evidenceIds": [
      "evidence:zai-org-glm-4-7-flash-license"
    ]
  },
  "evidenceIds": [
    "evidence:zai-org-glm-4-7-flash-card",
    "evidence:zai-org-glm-4-7-flash-metadata",
    "evidence:zai-org-glm-4-7-flash-parameters",
    "evidence:zai-org-glm-4-7-flash-license",
    "evidence:zai-org-glm-4-7-flash-config",
    "evidence:four-tables-release-glm-4-7-flash-release",
    "evidence:v03-0bbf3663567eef8181",
    "evidence:v03-82d7615468fe0b242b",
    "evidence:v03-49f871c97c4c5f3728"
  ],
  "releasedOn": "2026-01-19",
  "parameterCounts": [
    {
      "scope": "total",
      "label": "شمار کل اعلام‌شده",
      "value": {
        "state": "known",
        "value": 30,
        "evidenceIds": [
          "evidence:zai-org-glm-4-7-flash-parameters"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "stored",
      "label": "تعداد عناصر پارامتری نمایهٔ Safetensors",
      "value": {
        "state": "known",
        "value": 31.221488576,
        "evidenceIds": [
          "evidence:v03-82d7615468fe0b242b"
        ],
        "unit": "billion-parameters",
        "note": "نمایهٔ فایل وزن؛ برای وزن کوانت‌شده یا اشتراک وزن، الزاماً شمار پارامتر مستقل نیست."
      },
      "approximate": false
    }
  ]
});
models.push({
  "id": "model:moonshotai-kimi-k2-instruct",
  "familyId": "family:kimi",
  "exactName": "Kimi-K2-Instruct",
  "publisher": "Moonshot AI",
  "version": "fd1984e2b7a3350dbf7305fe73a4ede25c14de50",
  "aliases": [
    "moonshotai/Kimi-K2-Instruct"
  ],
  "stage": "instruct",
  "architecture": "moe",
  "totalParametersB": {
    "state": "unknown"
  },
  "activeParametersB": {
    "state": "known",
    "value": 32,
    "evidenceIds": [
      "evidence:v03-b58847ef9a4755e4e2"
    ],
    "unit": "billion-parameters"
  },
  "kind": "generative",
  "inputModalities": [
    "text"
  ],
  "outputModalities": [
    "text"
  ],
  "applications": [
    "text-work",
    "enterprise-rag",
    "structured-extraction",
    "coding-assistant",
    "agents-tools"
  ],
  "languages": [
    {
      "language": "multilingual",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-640c88f0733f107c4f"
        ]
      }
    }
  ],
  "persianEvidenceStatus": "not-evaluated",
  "declaredContext": {
    "state": "known",
    "value": 131072,
    "evidenceIds": [
      "evidence:v03-6b61574487978b2b41"
    ],
    "unit": "token",
    "note": "حد پیکربندی منتشرشده؛ ورودی و خروجی و نشانه‌های ویژه از همین بودجه استفاده می‌کنند."
  },
  "evaluatedContext": {
    "state": "not-measured"
  },
  "releaseStatus": "available",
  "lastReviewedOn": "2026-09-15",
  "license": {
    "name": {
      "state": "known",
      "value": "Modified MIT",
      "evidenceIds": [
        "evidence:v03-640c88f0733f107c4f"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://huggingface.co/moonshotai/Kimi-K2-Instruct/blob/fd1984e2b7a3350dbf7305fe73a4ede25c14de50/LICENSE",
      "evidenceIds": [
        "evidence:v03-640c88f0733f107c4f"
      ]
    },
    "commercialUse": {
      "state": "known",
      "value": "restricted",
      "evidenceIds": [
        "evidence:v03-640c88f0733f107c4f"
      ]
    },
    "restrictions": [],
    "evidenceIds": [
      "evidence:v03-640c88f0733f107c4f"
    ]
  },
  "evidenceIds": [
    "evidence:v03-f3eb23e52e2e39d7cc",
    "evidence:v03-b58847ef9a4755e4e2",
    "evidence:v03-6b61574487978b2b41",
    "evidence:v03-640c88f0733f107c4f"
  ],
  "parameterCounts": [
    {
      "scope": "nominal",
      "label": "اندازهٔ اعلامی نسخه",
      "value": {
        "state": "known",
        "value": 1000,
        "evidenceIds": [
          "evidence:v03-b58847ef9a4755e4e2"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "stored",
      "label": "تعداد عناصر پارامتری نمایهٔ Safetensors",
      "value": {
        "state": "known",
        "value": 1026.408235864,
        "evidenceIds": [
          "evidence:v03-8b2dbb13a9608b460a"
        ],
        "unit": "billion-parameters",
        "note": "نمایهٔ فایل وزن؛ برای وزن کوانت‌شده یا اشتراک وزن، الزاماً شمار پارامتر مستقل نیست."
      },
      "approximate": false
    }
  ]
});
models.push({
  "id": "model:moonshotai-kimi-k2-thinking",
  "familyId": "family:kimi",
  "exactName": "Kimi-K2-Thinking",
  "publisher": "Moonshot AI",
  "version": "a51ccc050d73dab088bf7b0e2dd9b30ae85a4e55",
  "aliases": [
    "moonshotai/Kimi-K2-Thinking"
  ],
  "stage": "reasoning",
  "architecture": "moe",
  "totalParametersB": {
    "state": "unknown"
  },
  "activeParametersB": {
    "state": "known",
    "value": 32,
    "evidenceIds": [
      "evidence:v03-ec182872a6715f6a95"
    ],
    "unit": "billion-parameters"
  },
  "kind": "generative",
  "inputModalities": [
    "text"
  ],
  "outputModalities": [
    "text"
  ],
  "applications": [
    "text-work",
    "enterprise-rag",
    "structured-extraction",
    "reasoning-analysis",
    "coding-assistant",
    "agents-tools"
  ],
  "languages": [
    {
      "language": "multilingual",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-e39860c72daa7bc47e"
        ]
      }
    }
  ],
  "persianEvidenceStatus": "not-evaluated",
  "declaredContext": {
    "state": "known",
    "value": 262144,
    "evidenceIds": [
      "evidence:v03-33306709d07487cf05"
    ],
    "unit": "token",
    "note": "حد پیکربندی منتشرشده؛ ورودی و خروجی و نشانه‌های ویژه از همین بودجه استفاده می‌کنند."
  },
  "evaluatedContext": {
    "state": "not-measured"
  },
  "releaseStatus": "available",
  "lastReviewedOn": "2026-09-15",
  "license": {
    "name": {
      "state": "known",
      "value": "Modified MIT",
      "evidenceIds": [
        "evidence:v03-e39860c72daa7bc47e"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://huggingface.co/moonshotai/Kimi-K2-Thinking/blob/a51ccc050d73dab088bf7b0e2dd9b30ae85a4e55/LICENSE",
      "evidenceIds": [
        "evidence:v03-e39860c72daa7bc47e"
      ]
    },
    "commercialUse": {
      "state": "known",
      "value": "restricted",
      "evidenceIds": [
        "evidence:v03-e39860c72daa7bc47e"
      ]
    },
    "restrictions": [],
    "evidenceIds": [
      "evidence:v03-e39860c72daa7bc47e"
    ]
  },
  "evidenceIds": [
    "evidence:v03-2f089fe45e10f02c00",
    "evidence:v03-ec182872a6715f6a95",
    "evidence:v03-33306709d07487cf05",
    "evidence:v03-e39860c72daa7bc47e"
  ],
  "parameterCounts": [
    {
      "scope": "nominal",
      "label": "اندازهٔ اعلامی نسخه",
      "value": {
        "state": "known",
        "value": 1000,
        "evidenceIds": [
          "evidence:v03-ec182872a6715f6a95"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "stored",
      "label": "تعداد عناصر پارامتری نمایهٔ Safetensors",
      "value": {
        "state": "known",
        "value": 1026.408240256,
        "evidenceIds": [
          "evidence:v03-0a031cd7fe4a4c536a"
        ],
        "unit": "billion-parameters",
        "note": "نمایهٔ فایل وزن؛ برای وزن کوانت‌شده یا اشتراک وزن، الزاماً شمار پارامتر مستقل نیست."
      },
      "approximate": false
    }
  ]
});
models.push({
  "id": "model:moonshotai-kimi-k2-5",
  "familyId": "family:kimi",
  "exactName": "Kimi-K2.5",
  "publisher": "Moonshot AI",
  "version": "4d01dfe0332d63057c186e0b262165819efb6611",
  "aliases": [
    "moonshotai/Kimi-K2.5"
  ],
  "stage": "reasoning",
  "architecture": "moe",
  "totalParametersB": {
    "state": "unknown"
  },
  "activeParametersB": {
    "state": "known",
    "value": 32,
    "evidenceIds": [
      "evidence:v03-4c47c52e044e915300"
    ],
    "unit": "billion-parameters"
  },
  "kind": "vision-language",
  "inputModalities": [
    "text",
    "image",
    "video"
  ],
  "outputModalities": [
    "text"
  ],
  "applications": [
    "text-work",
    "enterprise-rag",
    "structured-extraction",
    "reasoning-analysis",
    "coding-assistant",
    "agents-tools",
    "document-vision"
  ],
  "languages": [
    {
      "language": "multilingual",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-c0e496ce377d981915"
        ]
      }
    }
  ],
  "persianEvidenceStatus": "not-evaluated",
  "declaredContext": {
    "state": "known",
    "value": 262144,
    "evidenceIds": [
      "evidence:v03-011dd23d3b85f4b2b1"
    ],
    "unit": "token",
    "note": "حد پیکربندی منتشرشده؛ ورودی و خروجی و نشانه‌های ویژه از همین بودجه استفاده می‌کنند."
  },
  "evaluatedContext": {
    "state": "not-measured"
  },
  "releaseStatus": "available",
  "lastReviewedOn": "2026-09-15",
  "license": {
    "name": {
      "state": "known",
      "value": "Modified MIT",
      "evidenceIds": [
        "evidence:v03-c0e496ce377d981915"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://huggingface.co/moonshotai/Kimi-K2.5/blob/4d01dfe0332d63057c186e0b262165819efb6611/LICENSE",
      "evidenceIds": [
        "evidence:v03-c0e496ce377d981915"
      ]
    },
    "commercialUse": {
      "state": "known",
      "value": "restricted",
      "evidenceIds": [
        "evidence:v03-c0e496ce377d981915"
      ]
    },
    "restrictions": [],
    "evidenceIds": [
      "evidence:v03-c0e496ce377d981915"
    ]
  },
  "evidenceIds": [
    "evidence:v03-0c0e5f271111a1cfdd",
    "evidence:v03-4c47c52e044e915300",
    "evidence:v03-011dd23d3b85f4b2b1",
    "evidence:v03-c0e496ce377d981915"
  ],
  "parameterCounts": [
    {
      "scope": "nominal",
      "label": "اندازهٔ اعلامی نسخه",
      "value": {
        "state": "known",
        "value": 1000,
        "evidenceIds": [
          "evidence:v03-4c47c52e044e915300"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "stored",
      "label": "تعداد عناصر پارامتری نمایهٔ Safetensors",
      "value": {
        "state": "known",
        "value": 1026.879376368,
        "evidenceIds": [
          "evidence:v03-b1336058265745176e"
        ],
        "unit": "billion-parameters",
        "note": "نمایهٔ فایل وزن؛ برای وزن کوانت‌شده یا اشتراک وزن، الزاماً شمار پارامتر مستقل نیست."
      },
      "approximate": false
    }
  ]
});
models.push({
  "id": "model:minimaxai-minimax-m2-5",
  "familyId": "family:minimax",
  "exactName": "MiniMax-M2.5",
  "publisher": "MiniMax",
  "version": "f710177d938eff80b684d42c5aa84b382612f21f",
  "aliases": [
    "MiniMaxAI/MiniMax-M2.5"
  ],
  "stage": "reasoning",
  "architecture": "moe",
  "totalParametersB": {
    "state": "unknown"
  },
  "activeParametersB": {
    "state": "known",
    "value": 10,
    "evidenceIds": [
      "evidence:v03-8dd8e6ce93c6ef4b5f"
    ],
    "unit": "billion-parameters",
    "note": "عدد گرد‌شدهٔ گزارش منبع؛ حافظهٔ وزن بر اساس کل مدل محاسبه می‌شود."
  },
  "kind": "generative",
  "inputModalities": [
    "text"
  ],
  "outputModalities": [
    "text"
  ],
  "applications": [
    "text-work",
    "enterprise-rag",
    "structured-extraction",
    "reasoning-analysis",
    "coding-assistant",
    "agents-tools"
  ],
  "languages": [
    {
      "language": "multilingual",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-7640341105ebedc8e6"
        ]
      }
    }
  ],
  "persianEvidenceStatus": "not-evaluated",
  "declaredContext": {
    "state": "known",
    "value": 196608,
    "evidenceIds": [
      "evidence:v03-960e54deccd59e431f"
    ],
    "unit": "token",
    "note": "حد پیکربندی منتشرشده؛ ورودی و خروجی و نشانه‌های ویژه از همین بودجه استفاده می‌کنند."
  },
  "evaluatedContext": {
    "state": "not-measured"
  },
  "releaseStatus": "available",
  "lastReviewedOn": "2026-09-15",
  "license": {
    "name": {
      "state": "known",
      "value": "Modified MIT",
      "evidenceIds": [
        "evidence:v03-7640341105ebedc8e6"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://github.com/MiniMax-AI/MiniMax-M2.5/blob/main/LICENSE",
      "evidenceIds": [
        "evidence:v03-7640341105ebedc8e6"
      ]
    },
    "commercialUse": {
      "state": "known",
      "value": "restricted",
      "evidenceIds": [
        "evidence:v03-7640341105ebedc8e6"
      ]
    },
    "restrictions": [],
    "evidenceIds": [
      "evidence:v03-7640341105ebedc8e6"
    ]
  },
  "evidenceIds": [
    "evidence:v03-f8de01b175289d53a6",
    "evidence:v03-4d0f4731066c607db4",
    "evidence:v03-960e54deccd59e431f",
    "evidence:v03-7640341105ebedc8e6",
    "evidence:v03-8dd8e6ce93c6ef4b5f"
  ],
  "parameterCounts": [
    {
      "scope": "nominal",
      "label": "اندازهٔ اعلامی نسخه",
      "value": {
        "state": "known",
        "value": 230,
        "evidenceIds": [
          "evidence:v03-8dd8e6ce93c6ef4b5f"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "stored",
      "label": "تعداد عناصر پارامتری نمایهٔ Safetensors",
      "value": {
        "state": "known",
        "value": 228.703644928,
        "evidenceIds": [
          "evidence:v03-eee503b0e4bf8c3f8e"
        ],
        "unit": "billion-parameters",
        "note": "نمایهٔ فایل وزن؛ برای وزن کوانت‌شده یا اشتراک وزن، الزاماً شمار پارامتر مستقل نیست."
      },
      "approximate": false
    }
  ]
});
models.push({
  "id": "model:minimaxai-minimax-m2-1",
  "familyId": "family:minimax",
  "exactName": "MiniMax-M2.1",
  "publisher": "MiniMax",
  "version": "cd97f59135f37b2a6bf09356e485d5e4aeb7dc9c",
  "aliases": [
    "MiniMaxAI/MiniMax-M2.1"
  ],
  "stage": "reasoning",
  "architecture": "moe",
  "totalParametersB": {
    "state": "unknown"
  },
  "activeParametersB": {
    "state": "known",
    "value": 10,
    "evidenceIds": [
      "evidence:v03-f1d6f9a93a33a28aa8"
    ],
    "unit": "billion-parameters",
    "note": "عدد گرد‌شدهٔ گزارش منبع؛ حافظهٔ وزن بر اساس کل مدل محاسبه می‌شود."
  },
  "kind": "generative",
  "inputModalities": [
    "text"
  ],
  "outputModalities": [
    "text"
  ],
  "applications": [
    "text-work",
    "enterprise-rag",
    "structured-extraction",
    "reasoning-analysis",
    "coding-assistant",
    "agents-tools"
  ],
  "languages": [
    {
      "language": "multilingual",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-3f3c5c51b03688076f"
        ]
      }
    }
  ],
  "persianEvidenceStatus": "not-evaluated",
  "declaredContext": {
    "state": "known",
    "value": 196608,
    "evidenceIds": [
      "evidence:v03-64282628aee5992e6f"
    ],
    "unit": "token",
    "note": "حد پیکربندی منتشرشده؛ ورودی و خروجی و نشانه‌های ویژه از همین بودجه استفاده می‌کنند."
  },
  "evaluatedContext": {
    "state": "not-measured"
  },
  "releaseStatus": "available",
  "lastReviewedOn": "2026-09-15",
  "license": {
    "name": {
      "state": "known",
      "value": "Modified MIT",
      "evidenceIds": [
        "evidence:v03-3f3c5c51b03688076f"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://github.com/MiniMax-AI/MiniMax-M2.1/blob/main/LICENSE",
      "evidenceIds": [
        "evidence:v03-3f3c5c51b03688076f"
      ]
    },
    "commercialUse": {
      "state": "known",
      "value": "restricted",
      "evidenceIds": [
        "evidence:v03-3f3c5c51b03688076f"
      ]
    },
    "restrictions": [],
    "evidenceIds": [
      "evidence:v03-3f3c5c51b03688076f"
    ]
  },
  "evidenceIds": [
    "evidence:v03-b2eea93b10fdf84161",
    "evidence:v03-8d2280d20b2a8ebd76",
    "evidence:v03-64282628aee5992e6f",
    "evidence:v03-3f3c5c51b03688076f",
    "evidence:v03-f1d6f9a93a33a28aa8"
  ],
  "parameterCounts": [
    {
      "scope": "nominal",
      "label": "اندازهٔ اعلامی نسخه",
      "value": {
        "state": "known",
        "value": 230,
        "evidenceIds": [
          "evidence:v03-f1d6f9a93a33a28aa8"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "stored",
      "label": "تعداد عناصر پارامتری نمایهٔ Safetensors",
      "value": {
        "state": "known",
        "value": 228.689764864,
        "evidenceIds": [
          "evidence:v03-53b2f9cf9aabff678c"
        ],
        "unit": "billion-parameters",
        "note": "نمایهٔ فایل وزن؛ برای وزن کوانت‌شده یا اشتراک وزن، الزاماً شمار پارامتر مستقل نیست."
      },
      "approximate": false
    }
  ]
});
models.push({
  "id": "model:qwen-qwen3-235b-a22b-instruct-2507",
  "familyId": "family:qwen",
  "exactName": "Qwen3-235B-A22B-Instruct-2507",
  "publisher": "Qwen / Alibaba Cloud",
  "version": "ac9c66cc9b46af7306746a9250f23d47083d689e",
  "aliases": [
    "Qwen/Qwen3-235B-A22B-Instruct-2507"
  ],
  "stage": "instruct",
  "architecture": "moe",
  "totalParametersB": {
    "state": "known",
    "value": 235.0,
    "evidenceIds": [
      "evidence:v03-e72fa22f5d039b4315"
    ],
    "unit": "billion-parameters",
    "note": "شمار گرد‌شدهٔ اعلامی ناشر."
  },
  "activeParametersB": {
    "state": "known",
    "value": 22,
    "evidenceIds": [
      "evidence:v03-3b23de800db367d448"
    ],
    "unit": "billion-parameters"
  },
  "kind": "generative",
  "inputModalities": [
    "text"
  ],
  "outputModalities": [
    "text"
  ],
  "applications": [
    "text-work",
    "enterprise-rag",
    "structured-extraction",
    "reasoning-analysis",
    "coding-assistant",
    "agents-tools"
  ],
  "languages": [
    {
      "language": "multilingual",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-e72fa22f5d039b4315"
        ]
      }
    }
  ],
  "persianEvidenceStatus": "not-evaluated",
  "declaredContext": {
    "state": "known",
    "value": 262144,
    "evidenceIds": [
      "evidence:v03-8a176f35d0294f856d"
    ],
    "unit": "token",
    "note": "حد پیکربندی منتشرشده؛ ورودی و خروجی و نشانه‌های ویژه از همین بودجه استفاده می‌کنند."
  },
  "evaluatedContext": {
    "state": "not-measured"
  },
  "releaseStatus": "available",
  "lastReviewedOn": "2026-09-15",
  "license": {
    "name": {
      "state": "known",
      "value": "Apache-2.0",
      "evidenceIds": [
        "evidence:v03-e72fa22f5d039b4315"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://huggingface.co/Qwen/Qwen3-235B-A22B-Instruct-2507/blob/main/LICENSE",
      "evidenceIds": [
        "evidence:v03-e72fa22f5d039b4315"
      ]
    },
    "commercialUse": {
      "state": "known",
      "value": "allowed",
      "evidenceIds": [
        "evidence:v03-e72fa22f5d039b4315"
      ]
    },
    "restrictions": [],
    "evidenceIds": [
      "evidence:v03-e72fa22f5d039b4315"
    ]
  },
  "evidenceIds": [
    "evidence:v03-7ca38e2c74126feb92",
    "evidence:v03-3b23de800db367d448",
    "evidence:v03-8a176f35d0294f856d",
    "evidence:v03-e72fa22f5d039b4315"
  ],
  "parameterCounts": [
    {
      "scope": "nominal",
      "label": "اندازهٔ اعلامی نسخه",
      "value": {
        "state": "known",
        "value": 235,
        "evidenceIds": [
          "evidence:v03-3b23de800db367d448"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "total",
      "label": "شمار گرد‌شدهٔ اعلامی ناشر",
      "value": {
        "state": "known",
        "value": 235.0,
        "evidenceIds": [
          "evidence:v03-e72fa22f5d039b4315"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "stored",
      "label": "تعداد عناصر پارامتری نمایهٔ Safetensors",
      "value": {
        "state": "known",
        "value": 235.09363456,
        "evidenceIds": [
          "evidence:v03-381417148de0dd495b"
        ],
        "unit": "billion-parameters",
        "note": "نمایهٔ فایل وزن؛ برای وزن کوانت‌شده یا اشتراک وزن، الزاماً شمار پارامتر مستقل نیست."
      },
      "approximate": false
    }
  ]
});
models.push({
  "id": "model:qwen-qwen3-coder-480b-a35b-instruct",
  "familyId": "family:qwen",
  "exactName": "Qwen3-Coder-480B-A35B-Instruct",
  "publisher": "Qwen / Alibaba Cloud",
  "version": "9d90cf8fca1bf7b7acca42d3fc9ae694a2194069",
  "aliases": [
    "Qwen/Qwen3-Coder-480B-A35B-Instruct"
  ],
  "stage": "instruct",
  "architecture": "moe",
  "totalParametersB": {
    "state": "known",
    "value": 480.0,
    "evidenceIds": [
      "evidence:v03-f647db3a19c9a0deea"
    ],
    "unit": "billion-parameters",
    "note": "شمار گرد‌شدهٔ اعلامی ناشر."
  },
  "activeParametersB": {
    "state": "known",
    "value": 35,
    "evidenceIds": [
      "evidence:v03-d7295ef5c2d7198f1e"
    ],
    "unit": "billion-parameters"
  },
  "kind": "generative",
  "inputModalities": [
    "text"
  ],
  "outputModalities": [
    "text"
  ],
  "applications": [
    "text-work",
    "enterprise-rag",
    "structured-extraction",
    "reasoning-analysis",
    "coding-assistant",
    "agents-tools"
  ],
  "languages": [],
  "persianEvidenceStatus": "not-evaluated",
  "declaredContext": {
    "state": "known",
    "value": 262144,
    "evidenceIds": [
      "evidence:v03-bd633398ca16ed3834"
    ],
    "unit": "token",
    "note": "حد پیکربندی منتشرشده؛ ورودی و خروجی و نشانه‌های ویژه از همین بودجه استفاده می‌کنند."
  },
  "evaluatedContext": {
    "state": "not-measured"
  },
  "releaseStatus": "available",
  "lastReviewedOn": "2026-09-15",
  "license": {
    "name": {
      "state": "known",
      "value": "Apache-2.0",
      "evidenceIds": [
        "evidence:v03-f647db3a19c9a0deea"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://huggingface.co/Qwen/Qwen3-Coder-480B-A35B-Instruct/blob/main/LICENSE",
      "evidenceIds": [
        "evidence:v03-f647db3a19c9a0deea"
      ]
    },
    "commercialUse": {
      "state": "known",
      "value": "allowed",
      "evidenceIds": [
        "evidence:v03-f647db3a19c9a0deea"
      ]
    },
    "restrictions": [],
    "evidenceIds": [
      "evidence:v03-f647db3a19c9a0deea"
    ]
  },
  "evidenceIds": [
    "evidence:v03-ce258ef838123c6796",
    "evidence:v03-d7295ef5c2d7198f1e",
    "evidence:v03-bd633398ca16ed3834",
    "evidence:v03-f647db3a19c9a0deea"
  ],
  "parameterCounts": [
    {
      "scope": "nominal",
      "label": "اندازهٔ اعلامی نسخه",
      "value": {
        "state": "known",
        "value": 480,
        "evidenceIds": [
          "evidence:v03-d7295ef5c2d7198f1e"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "total",
      "label": "شمار گرد‌شدهٔ اعلامی ناشر",
      "value": {
        "state": "known",
        "value": 480.0,
        "evidenceIds": [
          "evidence:v03-f647db3a19c9a0deea"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "stored",
      "label": "تعداد عناصر پارامتری نمایهٔ Safetensors",
      "value": {
        "state": "known",
        "value": 480.154875392,
        "evidenceIds": [
          "evidence:v03-9ed4e6900578054d84"
        ],
        "unit": "billion-parameters",
        "note": "نمایهٔ فایل وزن؛ برای وزن کوانت‌شده یا اشتراک وزن، الزاماً شمار پارامتر مستقل نیست."
      },
      "approximate": false
    }
  ]
});
models.push({
  "id": "model:qwen-qwen3-5-27b",
  "familyId": "family:qwen",
  "exactName": "Qwen3.5-27B",
  "publisher": "Qwen / Alibaba Cloud",
  "version": "fc05daec18b0a78c049392ed2e771dde82bdf654",
  "aliases": [
    "Qwen/Qwen3.5-27B"
  ],
  "stage": "reasoning",
  "architecture": "hybrid",
  "totalParametersB": {
    "state": "known",
    "value": 27.0,
    "evidenceIds": [
      "evidence:v03-bd8ff876ae3abe060f"
    ],
    "unit": "billion-parameters",
    "note": "شمار گرد‌شدهٔ اعلامی ناشر."
  },
  "activeParametersB": {
    "state": "not-applicable"
  },
  "kind": "vision-language",
  "inputModalities": [
    "text",
    "image",
    "video"
  ],
  "outputModalities": [
    "text"
  ],
  "applications": [
    "text-work",
    "enterprise-rag",
    "structured-extraction",
    "reasoning-analysis",
    "coding-assistant",
    "agents-tools",
    "document-vision"
  ],
  "languages": [
    {
      "language": "multilingual",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-bd8ff876ae3abe060f"
        ]
      }
    }
  ],
  "persianEvidenceStatus": "not-evaluated",
  "declaredContext": {
    "state": "known",
    "value": 262144,
    "evidenceIds": [
      "evidence:v03-8ca7d24315d613ae78"
    ],
    "unit": "token",
    "note": "حد پیکربندی منتشرشده؛ ورودی و خروجی و نشانه‌های ویژه از همین بودجه استفاده می‌کنند."
  },
  "evaluatedContext": {
    "state": "not-measured"
  },
  "releaseStatus": "available",
  "lastReviewedOn": "2026-09-15",
  "license": {
    "name": {
      "state": "known",
      "value": "Apache-2.0",
      "evidenceIds": [
        "evidence:v03-bd8ff876ae3abe060f"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://huggingface.co/Qwen/Qwen3.5-27B/blob/main/LICENSE",
      "evidenceIds": [
        "evidence:v03-bd8ff876ae3abe060f"
      ]
    },
    "commercialUse": {
      "state": "known",
      "value": "allowed",
      "evidenceIds": [
        "evidence:v03-bd8ff876ae3abe060f"
      ]
    },
    "restrictions": [],
    "evidenceIds": [
      "evidence:v03-bd8ff876ae3abe060f"
    ]
  },
  "evidenceIds": [
    "evidence:v03-518ba71c47b5d11a84",
    "evidence:v03-c41b4e1caa6e69ea81",
    "evidence:v03-8ca7d24315d613ae78",
    "evidence:v03-bd8ff876ae3abe060f"
  ],
  "parameterCounts": [
    {
      "scope": "nominal",
      "label": "اندازهٔ اعلامی نسخه",
      "value": {
        "state": "known",
        "value": 27,
        "evidenceIds": [
          "evidence:v03-c41b4e1caa6e69ea81"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "total",
      "label": "شمار گرد‌شدهٔ اعلامی ناشر",
      "value": {
        "state": "known",
        "value": 27.0,
        "evidenceIds": [
          "evidence:v03-bd8ff876ae3abe060f"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "stored",
      "label": "تعداد عناصر پارامتری نمایهٔ Safetensors",
      "value": {
        "state": "known",
        "value": 27.781427952,
        "evidenceIds": [
          "evidence:v03-a18cd47c2a8148b452"
        ],
        "unit": "billion-parameters",
        "note": "نمایهٔ فایل وزن؛ برای وزن کوانت‌شده یا اشتراک وزن، الزاماً شمار پارامتر مستقل نیست."
      },
      "approximate": false
    }
  ]
});
models.push({
  "id": "model:qwen-qwen3-5-0-8b",
  "familyId": "family:qwen",
  "exactName": "Qwen3.5-0.8B",
  "publisher": "Qwen / Alibaba Cloud",
  "version": "2fc06364715b967f1860aea9cf38778875588b17",
  "aliases": [
    "Qwen/Qwen3.5-0.8B"
  ],
  "stage": "instruct",
  "architecture": "hybrid",
  "totalParametersB": {
    "state": "known",
    "value": 0.8,
    "evidenceIds": [
      "evidence:v03-2f179b658d60e4483f"
    ],
    "unit": "billion-parameters",
    "note": "شمار گرد‌شدهٔ اعلامی ناشر."
  },
  "activeParametersB": {
    "state": "not-applicable"
  },
  "kind": "vision-language",
  "inputModalities": [
    "text",
    "image",
    "video"
  ],
  "outputModalities": [
    "text"
  ],
  "applications": [
    "text-work",
    "enterprise-rag",
    "structured-extraction",
    "reasoning-analysis",
    "coding-assistant",
    "agents-tools",
    "document-vision"
  ],
  "languages": [
    {
      "language": "multilingual",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-2f179b658d60e4483f"
        ]
      }
    }
  ],
  "persianEvidenceStatus": "not-evaluated",
  "declaredContext": {
    "state": "known",
    "value": 262144,
    "evidenceIds": [
      "evidence:v03-cef9145834ef281226"
    ],
    "unit": "token",
    "note": "حد پیکربندی منتشرشده؛ ورودی و خروجی و نشانه‌های ویژه از همین بودجه استفاده می‌کنند."
  },
  "evaluatedContext": {
    "state": "not-measured"
  },
  "releaseStatus": "available",
  "lastReviewedOn": "2026-09-15",
  "license": {
    "name": {
      "state": "known",
      "value": "Apache-2.0",
      "evidenceIds": [
        "evidence:v03-2f179b658d60e4483f"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://huggingface.co/Qwen/Qwen3.5-0.8B/blob/main/LICENSE",
      "evidenceIds": [
        "evidence:v03-2f179b658d60e4483f"
      ]
    },
    "commercialUse": {
      "state": "known",
      "value": "allowed",
      "evidenceIds": [
        "evidence:v03-2f179b658d60e4483f"
      ]
    },
    "restrictions": [],
    "evidenceIds": [
      "evidence:v03-2f179b658d60e4483f"
    ]
  },
  "evidenceIds": [
    "evidence:v03-c96c19dff3641bdd33",
    "evidence:v03-55c6f0500b4f56dbfc",
    "evidence:v03-cef9145834ef281226",
    "evidence:v03-2f179b658d60e4483f"
  ],
  "parameterCounts": [
    {
      "scope": "nominal",
      "label": "اندازهٔ اعلامی نسخه",
      "value": {
        "state": "known",
        "value": 0.8,
        "evidenceIds": [
          "evidence:v03-55c6f0500b4f56dbfc"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "total",
      "label": "شمار گرد‌شدهٔ اعلامی ناشر",
      "value": {
        "state": "known",
        "value": 0.8,
        "evidenceIds": [
          "evidence:v03-2f179b658d60e4483f"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "stored",
      "label": "تعداد عناصر پارامتری نمایهٔ Safetensors",
      "value": {
        "state": "known",
        "value": 0.873438784,
        "evidenceIds": [
          "evidence:v03-444ae591d1df96c579"
        ],
        "unit": "billion-parameters",
        "note": "نمایهٔ فایل وزن؛ برای وزن کوانت‌شده یا اشتراک وزن، الزاماً شمار پارامتر مستقل نیست."
      },
      "approximate": false
    }
  ]
});
models.push({
  "id": "model:qwen-qwen3-5-122b-a10b",
  "familyId": "family:qwen",
  "exactName": "Qwen3.5-122B-A10B",
  "publisher": "Qwen / Alibaba Cloud",
  "version": "dc4d348443bc740c68e2d77492492c11606384d5",
  "aliases": [
    "Qwen/Qwen3.5-122B-A10B"
  ],
  "stage": "reasoning",
  "architecture": "moe",
  "totalParametersB": {
    "state": "known",
    "value": 122.0,
    "evidenceIds": [
      "evidence:v03-077b49671bb5ca41ae"
    ],
    "unit": "billion-parameters",
    "note": "شمار گرد‌شدهٔ اعلامی ناشر."
  },
  "activeParametersB": {
    "state": "known",
    "value": 10,
    "evidenceIds": [
      "evidence:v03-97cad1067fd38e851d"
    ],
    "unit": "billion-parameters"
  },
  "kind": "vision-language",
  "inputModalities": [
    "text",
    "image",
    "video"
  ],
  "outputModalities": [
    "text"
  ],
  "applications": [
    "text-work",
    "enterprise-rag",
    "structured-extraction",
    "reasoning-analysis",
    "coding-assistant",
    "agents-tools",
    "document-vision"
  ],
  "languages": [
    {
      "language": "multilingual",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-077b49671bb5ca41ae"
        ]
      }
    }
  ],
  "persianEvidenceStatus": "not-evaluated",
  "declaredContext": {
    "state": "known",
    "value": 262144,
    "evidenceIds": [
      "evidence:v03-d8701486670aa7e8f4"
    ],
    "unit": "token",
    "note": "حد پیکربندی منتشرشده؛ ورودی و خروجی و نشانه‌های ویژه از همین بودجه استفاده می‌کنند."
  },
  "evaluatedContext": {
    "state": "not-measured"
  },
  "releaseStatus": "available",
  "lastReviewedOn": "2026-09-15",
  "license": {
    "name": {
      "state": "known",
      "value": "Apache-2.0",
      "evidenceIds": [
        "evidence:v03-077b49671bb5ca41ae"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://huggingface.co/Qwen/Qwen3.5-122B-A10B/blob/main/LICENSE",
      "evidenceIds": [
        "evidence:v03-077b49671bb5ca41ae"
      ]
    },
    "commercialUse": {
      "state": "known",
      "value": "allowed",
      "evidenceIds": [
        "evidence:v03-077b49671bb5ca41ae"
      ]
    },
    "restrictions": [],
    "evidenceIds": [
      "evidence:v03-077b49671bb5ca41ae"
    ]
  },
  "evidenceIds": [
    "evidence:v03-a03eb2799c3310f6d5",
    "evidence:v03-97cad1067fd38e851d",
    "evidence:v03-d8701486670aa7e8f4",
    "evidence:v03-077b49671bb5ca41ae"
  ],
  "parameterCounts": [
    {
      "scope": "nominal",
      "label": "اندازهٔ اعلامی نسخه",
      "value": {
        "state": "known",
        "value": 122,
        "evidenceIds": [
          "evidence:v03-97cad1067fd38e851d"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "total",
      "label": "شمار گرد‌شدهٔ اعلامی ناشر",
      "value": {
        "state": "known",
        "value": 122.0,
        "evidenceIds": [
          "evidence:v03-077b49671bb5ca41ae"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "stored",
      "label": "تعداد عناصر پارامتری نمایهٔ Safetensors",
      "value": {
        "state": "known",
        "value": 125.086497008,
        "evidenceIds": [
          "evidence:v03-57983cea3403d384e7"
        ],
        "unit": "billion-parameters",
        "note": "نمایهٔ فایل وزن؛ برای وزن کوانت‌شده یا اشتراک وزن، الزاماً شمار پارامتر مستقل نیست."
      },
      "approximate": false
    }
  ]
});
models.push({
  "id": "model:qwen-qwen3-5-397b-a17b",
  "familyId": "family:qwen",
  "exactName": "Qwen3.5-397B-A17B",
  "publisher": "Qwen / Alibaba Cloud",
  "version": "8472618112abcbd45acbcdc58436aff4233c23f7",
  "aliases": [
    "Qwen/Qwen3.5-397B-A17B"
  ],
  "stage": "reasoning",
  "architecture": "moe",
  "totalParametersB": {
    "state": "known",
    "value": 397.0,
    "evidenceIds": [
      "evidence:v03-2ee03fb807e16d7989"
    ],
    "unit": "billion-parameters",
    "note": "شمار گرد‌شدهٔ اعلامی ناشر."
  },
  "activeParametersB": {
    "state": "known",
    "value": 17,
    "evidenceIds": [
      "evidence:v03-0f7a00c925a4c9be93"
    ],
    "unit": "billion-parameters"
  },
  "kind": "vision-language",
  "inputModalities": [
    "text",
    "image",
    "video"
  ],
  "outputModalities": [
    "text"
  ],
  "applications": [
    "text-work",
    "enterprise-rag",
    "structured-extraction",
    "reasoning-analysis",
    "coding-assistant",
    "agents-tools",
    "document-vision"
  ],
  "languages": [
    {
      "language": "multilingual",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-2ee03fb807e16d7989"
        ]
      }
    }
  ],
  "persianEvidenceStatus": "not-evaluated",
  "declaredContext": {
    "state": "known",
    "value": 262144,
    "evidenceIds": [
      "evidence:v03-6e98077ed8bd491ca5"
    ],
    "unit": "token",
    "note": "حد پیکربندی منتشرشده؛ ورودی و خروجی و نشانه‌های ویژه از همین بودجه استفاده می‌کنند."
  },
  "evaluatedContext": {
    "state": "not-measured"
  },
  "releaseStatus": "available",
  "lastReviewedOn": "2026-09-15",
  "license": {
    "name": {
      "state": "known",
      "value": "Apache-2.0",
      "evidenceIds": [
        "evidence:v03-2ee03fb807e16d7989"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://huggingface.co/Qwen/Qwen3.5-397B-A17B/blob/main/LICENSE",
      "evidenceIds": [
        "evidence:v03-2ee03fb807e16d7989"
      ]
    },
    "commercialUse": {
      "state": "known",
      "value": "allowed",
      "evidenceIds": [
        "evidence:v03-2ee03fb807e16d7989"
      ]
    },
    "restrictions": [],
    "evidenceIds": [
      "evidence:v03-2ee03fb807e16d7989"
    ]
  },
  "evidenceIds": [
    "evidence:v03-c52157de04e37be3d7",
    "evidence:v03-0f7a00c925a4c9be93",
    "evidence:v03-6e98077ed8bd491ca5",
    "evidence:v03-2ee03fb807e16d7989"
  ],
  "parameterCounts": [
    {
      "scope": "nominal",
      "label": "اندازهٔ اعلامی نسخه",
      "value": {
        "state": "known",
        "value": 397,
        "evidenceIds": [
          "evidence:v03-0f7a00c925a4c9be93"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "total",
      "label": "شمار گرد‌شدهٔ اعلامی ناشر",
      "value": {
        "state": "known",
        "value": 397.0,
        "evidenceIds": [
          "evidence:v03-2ee03fb807e16d7989"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "stored",
      "label": "تعداد عناصر پارامتری نمایهٔ Safetensors",
      "value": {
        "state": "known",
        "value": 403.397928944,
        "evidenceIds": [
          "evidence:v03-1d91b02cc4cb97b07e"
        ],
        "unit": "billion-parameters",
        "note": "نمایهٔ فایل وزن؛ برای وزن کوانت‌شده یا اشتراک وزن، الزاماً شمار پارامتر مستقل نیست."
      },
      "approximate": false
    }
  ]
});
models.push({
  "id": "model:meta-llama-llama-3-3-70b-instruct",
  "familyId": "family:llama",
  "exactName": "Llama-3.3-70B-Instruct",
  "publisher": "Meta",
  "version": "6f6073b423013f6a7d4d9f39144961bfbfbc386b",
  "aliases": [
    "meta-llama/Llama-3.3-70B-Instruct"
  ],
  "stage": "instruct",
  "architecture": "dense",
  "totalParametersB": {
    "state": "unknown"
  },
  "activeParametersB": {
    "state": "not-applicable"
  },
  "kind": "generative",
  "inputModalities": [
    "text"
  ],
  "outputModalities": [
    "text"
  ],
  "applications": [
    "text-work",
    "enterprise-rag",
    "structured-extraction",
    "coding-assistant",
    "agents-tools"
  ],
  "languages": [
    {
      "language": "en",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-86a881a107bc2da46e"
        ]
      }
    },
    {
      "language": "fr",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-86a881a107bc2da46e"
        ]
      }
    },
    {
      "language": "it",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-86a881a107bc2da46e"
        ]
      }
    },
    {
      "language": "pt",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-86a881a107bc2da46e"
        ]
      }
    },
    {
      "language": "hi",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-86a881a107bc2da46e"
        ]
      }
    },
    {
      "language": "es",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-86a881a107bc2da46e"
        ]
      }
    },
    {
      "language": "th",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-86a881a107bc2da46e"
        ]
      }
    },
    {
      "language": "de",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-86a881a107bc2da46e"
        ]
      }
    }
  ],
  "persianEvidenceStatus": "not-evaluated",
  "declaredContext": {
    "state": "known",
    "value": 131072,
    "evidenceIds": [
      "evidence:v03-9b1a731a0f6782ae65"
    ],
    "unit": "token",
    "note": "حد ورودی مسیر مصرف مدل در کارت رسمی؛ برای مدل‌های زوجی، طول پرسش و سند با هم محاسبه می‌شود."
  },
  "evaluatedContext": {
    "state": "not-measured"
  },
  "releaseStatus": "available",
  "lastReviewedOn": "2026-09-15",
  "license": {
    "name": {
      "state": "known",
      "value": "llama3.3",
      "evidenceIds": [
        "evidence:v03-9b1a731a0f6782ae65"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://huggingface.co/meta-llama/Llama-3.3-70B-Instruct/blob/6f6073b423013f6a7d4d9f39144961bfbfbc386b/LICENSE",
      "evidenceIds": [
        "evidence:v03-9b1a731a0f6782ae65"
      ]
    },
    "commercialUse": {
      "state": "known",
      "value": "restricted",
      "evidenceIds": [
        "evidence:v03-9b1a731a0f6782ae65"
      ]
    },
    "restrictions": [],
    "evidenceIds": [
      "evidence:v03-9b1a731a0f6782ae65"
    ]
  },
  "evidenceIds": [
    "evidence:v03-d001483976ddb664cc",
    "evidence:v03-ebf42b3384ad80bb49",
    "evidence:v03-9b1a731a0f6782ae65",
    "evidence:v03-86a881a107bc2da46e"
  ],
  "parameterCounts": [
    {
      "scope": "nominal",
      "label": "اندازهٔ اعلامی نسخه",
      "value": {
        "state": "known",
        "value": 70,
        "evidenceIds": [
          "evidence:v03-ebf42b3384ad80bb49"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "stored",
      "label": "تعداد عناصر پارامتری نمایهٔ Safetensors",
      "value": {
        "state": "known",
        "value": 70.553706496,
        "evidenceIds": [
          "evidence:v03-86a881a107bc2da46e"
        ],
        "unit": "billion-parameters",
        "note": "نمایهٔ فایل وزن؛ برای وزن کوانت‌شده یا اشتراک وزن، الزاماً شمار پارامتر مستقل نیست."
      },
      "approximate": false
    }
  ]
});
models.push({
  "id": "model:microsoft-phi-4",
  "familyId": "family:phi",
  "exactName": "phi-4",
  "publisher": "Microsoft",
  "version": "2db69c1c3e91a05d2c64a3185acfbaf36f744e25",
  "aliases": [
    "microsoft/phi-4"
  ],
  "stage": "instruct",
  "architecture": "dense",
  "totalParametersB": {
    "state": "unknown"
  },
  "activeParametersB": {
    "state": "not-applicable"
  },
  "kind": "generative",
  "inputModalities": [
    "text"
  ],
  "outputModalities": [
    "text"
  ],
  "applications": [
    "text-work",
    "enterprise-rag",
    "structured-extraction",
    "coding-assistant"
  ],
  "languages": [
    {
      "language": "en",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-6fe507bb1b7985be07"
        ]
      }
    }
  ],
  "persianEvidenceStatus": "not-evaluated",
  "declaredContext": {
    "state": "known",
    "value": 16384,
    "evidenceIds": [
      "evidence:v03-bd107337d4f42eb85c"
    ],
    "unit": "token",
    "note": "حد پیکربندی منتشرشده؛ ورودی و خروجی و نشانه‌های ویژه از همین بودجه استفاده می‌کنند."
  },
  "evaluatedContext": {
    "state": "not-measured"
  },
  "releaseStatus": "available",
  "lastReviewedOn": "2026-09-15",
  "license": {
    "name": {
      "state": "known",
      "value": "MIT",
      "evidenceIds": [
        "evidence:v03-606b11c691a36f7f48"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://huggingface.co/microsoft/phi-4/resolve/main/LICENSE",
      "evidenceIds": [
        "evidence:v03-606b11c691a36f7f48"
      ]
    },
    "commercialUse": {
      "state": "known",
      "value": "allowed",
      "evidenceIds": [
        "evidence:v03-606b11c691a36f7f48"
      ]
    },
    "restrictions": [],
    "evidenceIds": [
      "evidence:v03-606b11c691a36f7f48"
    ]
  },
  "evidenceIds": [
    "evidence:v03-c703b8abd17c62f0d4",
    "evidence:v03-b4c3ee39936e6647af",
    "evidence:v03-bd107337d4f42eb85c",
    "evidence:v03-6fe507bb1b7985be07",
    "evidence:v03-606b11c691a36f7f48"
  ],
  "parameterCounts": [
    {
      "scope": "nominal",
      "label": "اندازهٔ اعلامی نسخه",
      "value": {
        "state": "known",
        "value": 14,
        "evidenceIds": [
          "evidence:v03-b4c3ee39936e6647af"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "stored",
      "label": "تعداد عناصر پارامتری نمایهٔ Safetensors",
      "value": {
        "state": "known",
        "value": 14.6595072,
        "evidenceIds": [
          "evidence:v03-6fe507bb1b7985be07"
        ],
        "unit": "billion-parameters",
        "note": "نمایهٔ فایل وزن؛ برای وزن کوانت‌شده یا اشتراک وزن، الزاماً شمار پارامتر مستقل نیست."
      },
      "approximate": false
    }
  ],
  "releasedOn": "2024-12-12"
});
models.push({
  "id": "model:huggingfacetb-smolvlm2-2-2b-instruct",
  "familyId": "family:smolvlm",
  "exactName": "SmolVLM2-2.2B-Instruct",
  "publisher": "Hugging Face",
  "version": "482adb537c021c86670beed01cd58990d01e72e4",
  "aliases": [
    "HuggingFaceTB/SmolVLM2-2.2B-Instruct"
  ],
  "stage": "instruct",
  "architecture": "dense",
  "totalParametersB": {
    "state": "unknown"
  },
  "activeParametersB": {
    "state": "not-applicable"
  },
  "kind": "vision-language",
  "inputModalities": [
    "text",
    "image",
    "video"
  ],
  "outputModalities": [
    "text"
  ],
  "applications": [
    "text-work",
    "enterprise-rag",
    "structured-extraction",
    "document-vision"
  ],
  "languages": [
    {
      "language": "en",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-f15c37d324f87ab3f0"
        ]
      }
    }
  ],
  "persianEvidenceStatus": "not-evaluated",
  "declaredContext": {
    "state": "known",
    "value": 8192,
    "evidenceIds": [
      "evidence:v03-7302a7f1910c42827f"
    ],
    "unit": "token",
    "note": "حد پیکربندی منتشرشده؛ ورودی و خروجی و نشانه‌های ویژه از همین بودجه استفاده می‌کنند."
  },
  "evaluatedContext": {
    "state": "not-measured"
  },
  "releaseStatus": "available",
  "lastReviewedOn": "2026-09-15",
  "license": {
    "name": {
      "state": "known",
      "value": "Apache-2.0",
      "evidenceIds": [
        "evidence:v03-80457b3bd01c20cffe"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://huggingface.co/HuggingFaceTB/SmolVLM2-2.2B-Instruct/raw/482adb537c021c86670beed01cd58990d01e72e4/README.md",
      "evidenceIds": [
        "evidence:v03-80457b3bd01c20cffe"
      ]
    },
    "commercialUse": {
      "state": "known",
      "value": "allowed",
      "evidenceIds": [
        "evidence:v03-80457b3bd01c20cffe"
      ]
    },
    "restrictions": [],
    "evidenceIds": [
      "evidence:v03-80457b3bd01c20cffe"
    ]
  },
  "evidenceIds": [
    "evidence:v03-d61db496b3bf934ff5",
    "evidence:v03-631fe5c88740f064ce",
    "evidence:v03-7302a7f1910c42827f",
    "evidence:v03-f15c37d324f87ab3f0",
    "evidence:v03-80457b3bd01c20cffe"
  ],
  "parameterCounts": [
    {
      "scope": "nominal",
      "label": "اندازهٔ اعلامی نسخه",
      "value": {
        "state": "known",
        "value": 2.2,
        "evidenceIds": [
          "evidence:v03-631fe5c88740f064ce"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "stored",
      "label": "تعداد عناصر پارامتری نمایهٔ Safetensors",
      "value": {
        "state": "known",
        "value": 2.24678488,
        "evidenceIds": [
          "evidence:v03-f15c37d324f87ab3f0"
        ],
        "unit": "billion-parameters",
        "note": "نمایهٔ فایل وزن؛ برای وزن کوانت‌شده یا اشتراک وزن، الزاماً شمار پارامتر مستقل نیست."
      },
      "approximate": false
    }
  ]
});
models.push({
  "id": "model:sentence-transformers-all-minilm-l6-v2",
  "familyId": "family:minilm",
  "exactName": "all-MiniLM-L6-v2",
  "publisher": "Sentence Transformers",
  "version": "1110a243fdf4706b3f48f1d95db1a4f5529b4d41",
  "aliases": [
    "sentence-transformers/all-MiniLM-L6-v2"
  ],
  "stage": "other",
  "architecture": "dense",
  "totalParametersB": {
    "state": "known",
    "value": 0.022713728,
    "evidenceIds": [
      "evidence:v03-456efad200ee3c21c1"
    ],
    "unit": "billion-parameters",
    "note": "تعداد عناصر وزن در checkpoint غیرکوانت‌شدهٔ نمایهٔ ناشر؛ گردکردن فقط در نمایش."
  },
  "activeParametersB": {
    "state": "not-applicable"
  },
  "kind": "embedding",
  "inputModalities": [
    "text"
  ],
  "outputModalities": [
    "embedding"
  ],
  "applications": [
    "enterprise-rag"
  ],
  "languages": [
    {
      "language": "en",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-519d0a1e8a26326849"
        ]
      }
    }
  ],
  "persianEvidenceStatus": "not-evaluated",
  "declaredContext": {
    "state": "known",
    "value": 256,
    "evidenceIds": [
      "evidence:v03-9c825c8b7ff67b8e2e"
    ],
    "unit": "token",
    "note": "حد ورودی مسیر مصرف مدل در کارت رسمی؛ برای مدل‌های زوجی، طول پرسش و سند با هم محاسبه می‌شود."
  },
  "evaluatedContext": {
    "state": "not-measured"
  },
  "releaseStatus": "available",
  "lastReviewedOn": "2026-09-15",
  "license": {
    "name": {
      "state": "known",
      "value": "Apache-2.0",
      "evidenceIds": [
        "evidence:v03-9c825c8b7ff67b8e2e"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2/raw/1110a243fdf4706b3f48f1d95db1a4f5529b4d41/README.md",
      "evidenceIds": [
        "evidence:v03-9c825c8b7ff67b8e2e"
      ]
    },
    "commercialUse": {
      "state": "known",
      "value": "allowed",
      "evidenceIds": [
        "evidence:v03-9c825c8b7ff67b8e2e"
      ]
    },
    "restrictions": [],
    "evidenceIds": [
      "evidence:v03-9c825c8b7ff67b8e2e"
    ]
  },
  "evidenceIds": [
    "evidence:v03-3fec5ca622325bf058",
    "evidence:v03-2cb4687f989ac09455",
    "evidence:v03-9ba50eabd3bbf869af",
    "evidence:v03-9c825c8b7ff67b8e2e",
    "evidence:v03-519d0a1e8a26326849",
    "evidence:v03-456efad200ee3c21c1"
  ],
  "parameterCounts": [
    {
      "scope": "nominal",
      "label": "اندازهٔ اعلامی نسخه",
      "value": {
        "state": "known",
        "value": 0.0227,
        "evidenceIds": [
          "evidence:v03-2cb4687f989ac09455"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "stored",
      "label": "تعداد عناصر پارامتری نمایهٔ Safetensors",
      "value": {
        "state": "known",
        "value": 0.022713728,
        "evidenceIds": [
          "evidence:v03-519d0a1e8a26326849"
        ],
        "unit": "billion-parameters",
        "note": "نمایهٔ فایل وزن؛ برای وزن کوانت‌شده یا اشتراک وزن، الزاماً شمار پارامتر مستقل نیست."
      },
      "approximate": false
    }
  ],
  "specializedSpecs": {
    "task": {
      "state": "known",
      "value": "بازیابی و مشابهت متن",
      "evidenceIds": [
        "evidence:v03-9c825c8b7ff67b8e2e"
      ]
    },
    "output": {
      "state": "known",
      "value": "بردار 384بعدی",
      "evidenceIds": [
        "evidence:v03-9c825c8b7ff67b8e2e"
      ]
    },
    "poolingOrScoring": {
      "state": "known",
      "value": "میانگین توکن‌ها با attention mask و نرمال‌سازی L2",
      "evidenceIds": [
        "evidence:v03-9c825c8b7ff67b8e2e"
      ]
    },
    "features": {
      "state": "known",
      "value": "جست‌وجو، مشابهت و خوشه‌بندی متن انگلیسی؛ ورودی کوتاه",
      "evidenceIds": [
        "evidence:v03-9c825c8b7ff67b8e2e"
      ]
    },
    "languages": {
      "state": "known",
      "value": "زبان‌های اعلام‌شده: انگلیسی.",
      "evidenceIds": [
        "evidence:v03-9c825c8b7ff67b8e2e"
      ]
    },
    "embeddingDimensions": {
      "state": "known",
      "value": 384,
      "evidenceIds": [
        "evidence:v03-9c825c8b7ff67b8e2e"
      ]
    }
  }
});
models.push({
  "id": "model:intfloat-multilingual-e5-base",
  "familyId": "family:e5",
  "exactName": "multilingual-e5-base",
  "publisher": "intfloat / multilingual E5 authors",
  "version": "d128750597153bb5987e10b1c3493a34e5a4502a",
  "aliases": [
    "intfloat/multilingual-e5-base"
  ],
  "stage": "other",
  "architecture": "dense",
  "totalParametersB": {
    "state": "known",
    "value": 0.278044162,
    "evidenceIds": [
      "evidence:v03-3401ea97ad2840fa28"
    ],
    "unit": "billion-parameters",
    "note": "تعداد عناصر وزن در checkpoint غیرکوانت‌شدهٔ نمایهٔ ناشر؛ گردکردن فقط در نمایش."
  },
  "activeParametersB": {
    "state": "not-applicable"
  },
  "kind": "embedding",
  "inputModalities": [
    "text"
  ],
  "outputModalities": [
    "embedding"
  ],
  "applications": [
    "enterprise-rag"
  ],
  "languages": [
    {
      "language": "multilingual",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-8b681e95e2afb5e767"
        ]
      }
    },
    {
      "language": "af",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-8b681e95e2afb5e767"
        ]
      }
    },
    {
      "language": "am",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-8b681e95e2afb5e767"
        ]
      }
    },
    {
      "language": "ar",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-8b681e95e2afb5e767"
        ]
      }
    },
    {
      "language": "as",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-8b681e95e2afb5e767"
        ]
      }
    },
    {
      "language": "az",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-8b681e95e2afb5e767"
        ]
      }
    },
    {
      "language": "be",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-8b681e95e2afb5e767"
        ]
      }
    },
    {
      "language": "bg",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-8b681e95e2afb5e767"
        ]
      }
    },
    {
      "language": "bn",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-8b681e95e2afb5e767"
        ]
      }
    },
    {
      "language": "br",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-8b681e95e2afb5e767"
        ]
      }
    },
    {
      "language": "bs",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-8b681e95e2afb5e767"
        ]
      }
    },
    {
      "language": "ca",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-8b681e95e2afb5e767"
        ]
      }
    },
    {
      "language": "cs",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-8b681e95e2afb5e767"
        ]
      }
    },
    {
      "language": "cy",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-8b681e95e2afb5e767"
        ]
      }
    },
    {
      "language": "da",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-8b681e95e2afb5e767"
        ]
      }
    },
    {
      "language": "de",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-8b681e95e2afb5e767"
        ]
      }
    },
    {
      "language": "el",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-8b681e95e2afb5e767"
        ]
      }
    },
    {
      "language": "en",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-8b681e95e2afb5e767"
        ]
      }
    },
    {
      "language": "eo",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-8b681e95e2afb5e767"
        ]
      }
    },
    {
      "language": "es",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-8b681e95e2afb5e767"
        ]
      }
    },
    {
      "language": "et",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-8b681e95e2afb5e767"
        ]
      }
    },
    {
      "language": "eu",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-8b681e95e2afb5e767"
        ]
      }
    },
    {
      "language": "fa",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-8b681e95e2afb5e767"
        ]
      }
    },
    {
      "language": "fi",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-8b681e95e2afb5e767"
        ]
      }
    },
    {
      "language": "fr",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-8b681e95e2afb5e767"
        ]
      }
    },
    {
      "language": "fy",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-8b681e95e2afb5e767"
        ]
      }
    },
    {
      "language": "ga",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-8b681e95e2afb5e767"
        ]
      }
    },
    {
      "language": "gd",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-8b681e95e2afb5e767"
        ]
      }
    },
    {
      "language": "gl",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-8b681e95e2afb5e767"
        ]
      }
    },
    {
      "language": "gu",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-8b681e95e2afb5e767"
        ]
      }
    },
    {
      "language": "ha",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-8b681e95e2afb5e767"
        ]
      }
    },
    {
      "language": "he",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-8b681e95e2afb5e767"
        ]
      }
    },
    {
      "language": "hi",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-8b681e95e2afb5e767"
        ]
      }
    },
    {
      "language": "hr",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-8b681e95e2afb5e767"
        ]
      }
    },
    {
      "language": "hu",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-8b681e95e2afb5e767"
        ]
      }
    },
    {
      "language": "hy",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-8b681e95e2afb5e767"
        ]
      }
    },
    {
      "language": "id",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-8b681e95e2afb5e767"
        ]
      }
    },
    {
      "language": "is",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-8b681e95e2afb5e767"
        ]
      }
    },
    {
      "language": "it",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-8b681e95e2afb5e767"
        ]
      }
    },
    {
      "language": "ja",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-8b681e95e2afb5e767"
        ]
      }
    },
    {
      "language": "jv",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-8b681e95e2afb5e767"
        ]
      }
    },
    {
      "language": "ka",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-8b681e95e2afb5e767"
        ]
      }
    },
    {
      "language": "kk",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-8b681e95e2afb5e767"
        ]
      }
    },
    {
      "language": "km",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-8b681e95e2afb5e767"
        ]
      }
    },
    {
      "language": "kn",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-8b681e95e2afb5e767"
        ]
      }
    },
    {
      "language": "ko",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-8b681e95e2afb5e767"
        ]
      }
    },
    {
      "language": "ku",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-8b681e95e2afb5e767"
        ]
      }
    },
    {
      "language": "ky",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-8b681e95e2afb5e767"
        ]
      }
    },
    {
      "language": "la",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-8b681e95e2afb5e767"
        ]
      }
    },
    {
      "language": "lo",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-8b681e95e2afb5e767"
        ]
      }
    },
    {
      "language": "lt",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-8b681e95e2afb5e767"
        ]
      }
    },
    {
      "language": "lv",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-8b681e95e2afb5e767"
        ]
      }
    },
    {
      "language": "mg",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-8b681e95e2afb5e767"
        ]
      }
    },
    {
      "language": "mk",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-8b681e95e2afb5e767"
        ]
      }
    },
    {
      "language": "ml",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-8b681e95e2afb5e767"
        ]
      }
    },
    {
      "language": "mn",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-8b681e95e2afb5e767"
        ]
      }
    },
    {
      "language": "mr",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-8b681e95e2afb5e767"
        ]
      }
    },
    {
      "language": "ms",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-8b681e95e2afb5e767"
        ]
      }
    },
    {
      "language": "my",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-8b681e95e2afb5e767"
        ]
      }
    },
    {
      "language": "ne",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-8b681e95e2afb5e767"
        ]
      }
    },
    {
      "language": "nl",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-8b681e95e2afb5e767"
        ]
      }
    },
    {
      "language": "no",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-8b681e95e2afb5e767"
        ]
      }
    },
    {
      "language": "om",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-8b681e95e2afb5e767"
        ]
      }
    },
    {
      "language": "or",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-8b681e95e2afb5e767"
        ]
      }
    },
    {
      "language": "pa",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-8b681e95e2afb5e767"
        ]
      }
    },
    {
      "language": "pl",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-8b681e95e2afb5e767"
        ]
      }
    },
    {
      "language": "ps",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-8b681e95e2afb5e767"
        ]
      }
    },
    {
      "language": "pt",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-8b681e95e2afb5e767"
        ]
      }
    },
    {
      "language": "ro",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-8b681e95e2afb5e767"
        ]
      }
    },
    {
      "language": "ru",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-8b681e95e2afb5e767"
        ]
      }
    },
    {
      "language": "sa",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-8b681e95e2afb5e767"
        ]
      }
    },
    {
      "language": "sd",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-8b681e95e2afb5e767"
        ]
      }
    },
    {
      "language": "si",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-8b681e95e2afb5e767"
        ]
      }
    },
    {
      "language": "sk",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-8b681e95e2afb5e767"
        ]
      }
    },
    {
      "language": "sl",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-8b681e95e2afb5e767"
        ]
      }
    },
    {
      "language": "so",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-8b681e95e2afb5e767"
        ]
      }
    },
    {
      "language": "sq",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-8b681e95e2afb5e767"
        ]
      }
    },
    {
      "language": "sr",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-8b681e95e2afb5e767"
        ]
      }
    },
    {
      "language": "su",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-8b681e95e2afb5e767"
        ]
      }
    },
    {
      "language": "sv",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-8b681e95e2afb5e767"
        ]
      }
    },
    {
      "language": "sw",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-8b681e95e2afb5e767"
        ]
      }
    },
    {
      "language": "ta",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-8b681e95e2afb5e767"
        ]
      }
    },
    {
      "language": "te",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-8b681e95e2afb5e767"
        ]
      }
    },
    {
      "language": "th",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-8b681e95e2afb5e767"
        ]
      }
    },
    {
      "language": "tl",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-8b681e95e2afb5e767"
        ]
      }
    },
    {
      "language": "tr",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-8b681e95e2afb5e767"
        ]
      }
    },
    {
      "language": "ug",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-8b681e95e2afb5e767"
        ]
      }
    },
    {
      "language": "uk",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-8b681e95e2afb5e767"
        ]
      }
    },
    {
      "language": "ur",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-8b681e95e2afb5e767"
        ]
      }
    },
    {
      "language": "uz",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-8b681e95e2afb5e767"
        ]
      }
    },
    {
      "language": "vi",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-8b681e95e2afb5e767"
        ]
      }
    },
    {
      "language": "xh",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-8b681e95e2afb5e767"
        ]
      }
    },
    {
      "language": "yi",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-8b681e95e2afb5e767"
        ]
      }
    },
    {
      "language": "zh",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-8b681e95e2afb5e767"
        ]
      }
    }
  ],
  "persianEvidenceStatus": "publisher-claimed",
  "declaredContext": {
    "state": "known",
    "value": 512,
    "evidenceIds": [
      "evidence:v03-647a6dc4d6b4cce867"
    ],
    "unit": "token",
    "note": "حد ورودی مسیر مصرف مدل در کارت رسمی؛ برای مدل‌های زوجی، طول پرسش و سند با هم محاسبه می‌شود."
  },
  "evaluatedContext": {
    "state": "not-measured"
  },
  "releaseStatus": "available",
  "lastReviewedOn": "2026-09-15",
  "license": {
    "name": {
      "state": "known",
      "value": "MIT",
      "evidenceIds": [
        "evidence:v03-647a6dc4d6b4cce867"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://huggingface.co/intfloat/multilingual-e5-base/raw/d128750597153bb5987e10b1c3493a34e5a4502a/README.md",
      "evidenceIds": [
        "evidence:v03-647a6dc4d6b4cce867"
      ]
    },
    "commercialUse": {
      "state": "known",
      "value": "allowed",
      "evidenceIds": [
        "evidence:v03-647a6dc4d6b4cce867"
      ]
    },
    "restrictions": [],
    "evidenceIds": [
      "evidence:v03-647a6dc4d6b4cce867"
    ]
  },
  "evidenceIds": [
    "evidence:v03-0693360b6b8a68f2e9",
    "evidence:v03-17655ad5c9b76e7791",
    "evidence:v03-c126963f9b55f45083",
    "evidence:v03-647a6dc4d6b4cce867",
    "evidence:v03-8b681e95e2afb5e767",
    "evidence:v03-3401ea97ad2840fa28"
  ],
  "parameterCounts": [
    {
      "scope": "nominal",
      "label": "اندازهٔ اعلامی نسخه",
      "value": {
        "state": "known",
        "value": 0.278,
        "evidenceIds": [
          "evidence:v03-17655ad5c9b76e7791"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "stored",
      "label": "تعداد عناصر پارامتری نمایهٔ Safetensors",
      "value": {
        "state": "known",
        "value": 0.278044162,
        "evidenceIds": [
          "evidence:v03-8b681e95e2afb5e767"
        ],
        "unit": "billion-parameters",
        "note": "نمایهٔ فایل وزن؛ برای وزن کوانت‌شده یا اشتراک وزن، الزاماً شمار پارامتر مستقل نیست."
      },
      "approximate": false
    }
  ],
  "specializedSpecs": {
    "task": {
      "state": "known",
      "value": "بازیابی و مشابهت متن",
      "evidenceIds": [
        "evidence:v03-647a6dc4d6b4cce867"
      ]
    },
    "output": {
      "state": "known",
      "value": "بردار 768بعدی",
      "evidenceIds": [
        "evidence:v03-647a6dc4d6b4cce867"
      ]
    },
    "poolingOrScoring": {
      "state": "known",
      "value": "میانگین با mask و L2؛ query: برای پرسش و passage: برای سند",
      "evidenceIds": [
        "evidence:v03-647a6dc4d6b4cce867"
      ]
    },
    "features": {
      "state": "known",
      "value": "بازیابی چندزبانه؛ پیشوند پرسش و سند حتی در زبان غیرانگلیسی لازم است",
      "evidenceIds": [
        "evidence:v03-647a6dc4d6b4cce867"
      ]
    },
    "languages": {
      "state": "known",
      "value": "زبان‌های اعلام‌شده: آفریکانس، امهری، عربی، آسامی، آذربایجانی، بلاروسی، بلغاری، بنگالی، برتانیایی، بوسنیایی، کاتالان، چکی، ولزی، دانمارکی و زبان‌های دیگر.",
      "evidenceIds": [
        "evidence:v03-647a6dc4d6b4cce867"
      ]
    },
    "embeddingDimensions": {
      "state": "known",
      "value": 768,
      "evidenceIds": [
        "evidence:v03-647a6dc4d6b4cce867"
      ]
    }
  }
});
models.push({
  "id": "model:intfloat-multilingual-e5-large",
  "familyId": "family:e5",
  "exactName": "multilingual-e5-large",
  "publisher": "intfloat / multilingual E5 authors",
  "version": "3d7cfbdacd47fdda877c5cd8a79fbcc4f2a574f3",
  "aliases": [
    "intfloat/multilingual-e5-large"
  ],
  "stage": "other",
  "architecture": "dense",
  "totalParametersB": {
    "state": "known",
    "value": 0.559890946,
    "evidenceIds": [
      "evidence:v03-1eaad3b14634e7298f"
    ],
    "unit": "billion-parameters",
    "note": "تعداد عناصر وزن در checkpoint غیرکوانت‌شدهٔ نمایهٔ ناشر؛ گردکردن فقط در نمایش."
  },
  "activeParametersB": {
    "state": "not-applicable"
  },
  "kind": "embedding",
  "inputModalities": [
    "text"
  ],
  "outputModalities": [
    "embedding"
  ],
  "applications": [
    "enterprise-rag"
  ],
  "languages": [
    {
      "language": "multilingual",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b29a32109be89df2b8"
        ]
      }
    },
    {
      "language": "af",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b29a32109be89df2b8"
        ]
      }
    },
    {
      "language": "am",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b29a32109be89df2b8"
        ]
      }
    },
    {
      "language": "ar",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b29a32109be89df2b8"
        ]
      }
    },
    {
      "language": "as",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b29a32109be89df2b8"
        ]
      }
    },
    {
      "language": "az",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b29a32109be89df2b8"
        ]
      }
    },
    {
      "language": "be",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b29a32109be89df2b8"
        ]
      }
    },
    {
      "language": "bg",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b29a32109be89df2b8"
        ]
      }
    },
    {
      "language": "bn",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b29a32109be89df2b8"
        ]
      }
    },
    {
      "language": "br",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b29a32109be89df2b8"
        ]
      }
    },
    {
      "language": "bs",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b29a32109be89df2b8"
        ]
      }
    },
    {
      "language": "ca",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b29a32109be89df2b8"
        ]
      }
    },
    {
      "language": "cs",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b29a32109be89df2b8"
        ]
      }
    },
    {
      "language": "cy",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b29a32109be89df2b8"
        ]
      }
    },
    {
      "language": "da",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b29a32109be89df2b8"
        ]
      }
    },
    {
      "language": "de",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b29a32109be89df2b8"
        ]
      }
    },
    {
      "language": "el",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b29a32109be89df2b8"
        ]
      }
    },
    {
      "language": "en",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b29a32109be89df2b8"
        ]
      }
    },
    {
      "language": "eo",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b29a32109be89df2b8"
        ]
      }
    },
    {
      "language": "es",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b29a32109be89df2b8"
        ]
      }
    },
    {
      "language": "et",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b29a32109be89df2b8"
        ]
      }
    },
    {
      "language": "eu",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b29a32109be89df2b8"
        ]
      }
    },
    {
      "language": "fa",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b29a32109be89df2b8"
        ]
      }
    },
    {
      "language": "fi",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b29a32109be89df2b8"
        ]
      }
    },
    {
      "language": "fr",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b29a32109be89df2b8"
        ]
      }
    },
    {
      "language": "fy",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b29a32109be89df2b8"
        ]
      }
    },
    {
      "language": "ga",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b29a32109be89df2b8"
        ]
      }
    },
    {
      "language": "gd",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b29a32109be89df2b8"
        ]
      }
    },
    {
      "language": "gl",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b29a32109be89df2b8"
        ]
      }
    },
    {
      "language": "gu",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b29a32109be89df2b8"
        ]
      }
    },
    {
      "language": "ha",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b29a32109be89df2b8"
        ]
      }
    },
    {
      "language": "he",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b29a32109be89df2b8"
        ]
      }
    },
    {
      "language": "hi",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b29a32109be89df2b8"
        ]
      }
    },
    {
      "language": "hr",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b29a32109be89df2b8"
        ]
      }
    },
    {
      "language": "hu",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b29a32109be89df2b8"
        ]
      }
    },
    {
      "language": "hy",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b29a32109be89df2b8"
        ]
      }
    },
    {
      "language": "id",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b29a32109be89df2b8"
        ]
      }
    },
    {
      "language": "is",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b29a32109be89df2b8"
        ]
      }
    },
    {
      "language": "it",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b29a32109be89df2b8"
        ]
      }
    },
    {
      "language": "ja",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b29a32109be89df2b8"
        ]
      }
    },
    {
      "language": "jv",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b29a32109be89df2b8"
        ]
      }
    },
    {
      "language": "ka",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b29a32109be89df2b8"
        ]
      }
    },
    {
      "language": "kk",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b29a32109be89df2b8"
        ]
      }
    },
    {
      "language": "km",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b29a32109be89df2b8"
        ]
      }
    },
    {
      "language": "kn",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b29a32109be89df2b8"
        ]
      }
    },
    {
      "language": "ko",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b29a32109be89df2b8"
        ]
      }
    },
    {
      "language": "ku",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b29a32109be89df2b8"
        ]
      }
    },
    {
      "language": "ky",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b29a32109be89df2b8"
        ]
      }
    },
    {
      "language": "la",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b29a32109be89df2b8"
        ]
      }
    },
    {
      "language": "lo",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b29a32109be89df2b8"
        ]
      }
    },
    {
      "language": "lt",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b29a32109be89df2b8"
        ]
      }
    },
    {
      "language": "lv",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b29a32109be89df2b8"
        ]
      }
    },
    {
      "language": "mg",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b29a32109be89df2b8"
        ]
      }
    },
    {
      "language": "mk",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b29a32109be89df2b8"
        ]
      }
    },
    {
      "language": "ml",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b29a32109be89df2b8"
        ]
      }
    },
    {
      "language": "mn",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b29a32109be89df2b8"
        ]
      }
    },
    {
      "language": "mr",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b29a32109be89df2b8"
        ]
      }
    },
    {
      "language": "ms",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b29a32109be89df2b8"
        ]
      }
    },
    {
      "language": "my",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b29a32109be89df2b8"
        ]
      }
    },
    {
      "language": "ne",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b29a32109be89df2b8"
        ]
      }
    },
    {
      "language": "nl",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b29a32109be89df2b8"
        ]
      }
    },
    {
      "language": "no",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b29a32109be89df2b8"
        ]
      }
    },
    {
      "language": "om",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b29a32109be89df2b8"
        ]
      }
    },
    {
      "language": "or",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b29a32109be89df2b8"
        ]
      }
    },
    {
      "language": "pa",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b29a32109be89df2b8"
        ]
      }
    },
    {
      "language": "pl",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b29a32109be89df2b8"
        ]
      }
    },
    {
      "language": "ps",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b29a32109be89df2b8"
        ]
      }
    },
    {
      "language": "pt",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b29a32109be89df2b8"
        ]
      }
    },
    {
      "language": "ro",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b29a32109be89df2b8"
        ]
      }
    },
    {
      "language": "ru",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b29a32109be89df2b8"
        ]
      }
    },
    {
      "language": "sa",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b29a32109be89df2b8"
        ]
      }
    },
    {
      "language": "sd",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b29a32109be89df2b8"
        ]
      }
    },
    {
      "language": "si",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b29a32109be89df2b8"
        ]
      }
    },
    {
      "language": "sk",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b29a32109be89df2b8"
        ]
      }
    },
    {
      "language": "sl",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b29a32109be89df2b8"
        ]
      }
    },
    {
      "language": "so",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b29a32109be89df2b8"
        ]
      }
    },
    {
      "language": "sq",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b29a32109be89df2b8"
        ]
      }
    },
    {
      "language": "sr",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b29a32109be89df2b8"
        ]
      }
    },
    {
      "language": "su",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b29a32109be89df2b8"
        ]
      }
    },
    {
      "language": "sv",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b29a32109be89df2b8"
        ]
      }
    },
    {
      "language": "sw",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b29a32109be89df2b8"
        ]
      }
    },
    {
      "language": "ta",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b29a32109be89df2b8"
        ]
      }
    },
    {
      "language": "te",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b29a32109be89df2b8"
        ]
      }
    },
    {
      "language": "th",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b29a32109be89df2b8"
        ]
      }
    },
    {
      "language": "tl",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b29a32109be89df2b8"
        ]
      }
    },
    {
      "language": "tr",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b29a32109be89df2b8"
        ]
      }
    },
    {
      "language": "ug",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b29a32109be89df2b8"
        ]
      }
    },
    {
      "language": "uk",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b29a32109be89df2b8"
        ]
      }
    },
    {
      "language": "ur",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b29a32109be89df2b8"
        ]
      }
    },
    {
      "language": "uz",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b29a32109be89df2b8"
        ]
      }
    },
    {
      "language": "vi",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b29a32109be89df2b8"
        ]
      }
    },
    {
      "language": "xh",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b29a32109be89df2b8"
        ]
      }
    },
    {
      "language": "yi",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b29a32109be89df2b8"
        ]
      }
    },
    {
      "language": "zh",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-b29a32109be89df2b8"
        ]
      }
    }
  ],
  "persianEvidenceStatus": "publisher-claimed",
  "declaredContext": {
    "state": "known",
    "value": 512,
    "evidenceIds": [
      "evidence:v03-c8765fd75612ce9bda"
    ],
    "unit": "token",
    "note": "حد ورودی مسیر مصرف مدل در کارت رسمی؛ برای مدل‌های زوجی، طول پرسش و سند با هم محاسبه می‌شود."
  },
  "evaluatedContext": {
    "state": "not-measured"
  },
  "releaseStatus": "available",
  "lastReviewedOn": "2026-09-15",
  "license": {
    "name": {
      "state": "known",
      "value": "MIT",
      "evidenceIds": [
        "evidence:v03-c8765fd75612ce9bda"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://huggingface.co/intfloat/multilingual-e5-large/raw/3d7cfbdacd47fdda877c5cd8a79fbcc4f2a574f3/README.md",
      "evidenceIds": [
        "evidence:v03-c8765fd75612ce9bda"
      ]
    },
    "commercialUse": {
      "state": "known",
      "value": "allowed",
      "evidenceIds": [
        "evidence:v03-c8765fd75612ce9bda"
      ]
    },
    "restrictions": [],
    "evidenceIds": [
      "evidence:v03-c8765fd75612ce9bda"
    ]
  },
  "evidenceIds": [
    "evidence:v03-0af2545260225ec299",
    "evidence:v03-37aeb13b8bee55645c",
    "evidence:v03-e25345a786fe8d3214",
    "evidence:v03-c8765fd75612ce9bda",
    "evidence:v03-b29a32109be89df2b8",
    "evidence:v03-1eaad3b14634e7298f"
  ],
  "parameterCounts": [
    {
      "scope": "nominal",
      "label": "اندازهٔ اعلامی نسخه",
      "value": {
        "state": "known",
        "value": 0.56,
        "evidenceIds": [
          "evidence:v03-37aeb13b8bee55645c"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "stored",
      "label": "تعداد عناصر پارامتری نمایهٔ Safetensors",
      "value": {
        "state": "known",
        "value": 0.559890946,
        "evidenceIds": [
          "evidence:v03-b29a32109be89df2b8"
        ],
        "unit": "billion-parameters",
        "note": "نمایهٔ فایل وزن؛ برای وزن کوانت‌شده یا اشتراک وزن، الزاماً شمار پارامتر مستقل نیست."
      },
      "approximate": false
    }
  ],
  "specializedSpecs": {
    "task": {
      "state": "known",
      "value": "بازیابی و مشابهت متن",
      "evidenceIds": [
        "evidence:v03-c8765fd75612ce9bda"
      ]
    },
    "output": {
      "state": "known",
      "value": "بردار 1024بعدی",
      "evidenceIds": [
        "evidence:v03-c8765fd75612ce9bda"
      ]
    },
    "poolingOrScoring": {
      "state": "known",
      "value": "میانگین با mask و L2؛ query: برای پرسش و passage: برای سند",
      "evidenceIds": [
        "evidence:v03-c8765fd75612ce9bda"
      ]
    },
    "features": {
      "state": "known",
      "value": "بازیابی چندزبانه با پنجرهٔ ورودی ۵۱۲ توکن",
      "evidenceIds": [
        "evidence:v03-c8765fd75612ce9bda"
      ]
    },
    "languages": {
      "state": "known",
      "value": "زبان‌های اعلام‌شده: آفریکانس، امهری، عربی، آسامی، آذربایجانی، بلاروسی، بلغاری، بنگالی، برتانیایی، بوسنیایی، کاتالان، چکی، ولزی، دانمارکی و زبان‌های دیگر.",
      "evidenceIds": [
        "evidence:v03-c8765fd75612ce9bda"
      ]
    },
    "embeddingDimensions": {
      "state": "known",
      "value": 1024,
      "evidenceIds": [
        "evidence:v03-c8765fd75612ce9bda"
      ]
    }
  }
});
models.push({
  "id": "model:baai-bge-small-en-v1-5",
  "familyId": "family:bge",
  "exactName": "bge-small-en-v1.5",
  "publisher": "BAAI",
  "version": "5c38ec7c405ec4b44b94cc5a9bb96e735b38267a",
  "aliases": [
    "BAAI/bge-small-en-v1.5"
  ],
  "stage": "other",
  "architecture": "dense",
  "totalParametersB": {
    "state": "known",
    "value": 0.033360512,
    "evidenceIds": [
      "evidence:v03-3abcba14cf9b7a8227"
    ],
    "unit": "billion-parameters",
    "note": "تعداد عناصر وزن در checkpoint غیرکوانت‌شدهٔ نمایهٔ ناشر؛ گردکردن فقط در نمایش."
  },
  "activeParametersB": {
    "state": "not-applicable"
  },
  "kind": "embedding",
  "inputModalities": [
    "text"
  ],
  "outputModalities": [
    "embedding"
  ],
  "applications": [
    "enterprise-rag"
  ],
  "languages": [
    {
      "language": "en",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-70d82cf5e0139480c4"
        ]
      }
    }
  ],
  "persianEvidenceStatus": "not-evaluated",
  "declaredContext": {
    "state": "known",
    "value": 512,
    "evidenceIds": [
      "evidence:v03-f20cf032d0b3ba91f5"
    ],
    "unit": "token",
    "note": "حد ورودی مسیر مصرف مدل در کارت رسمی؛ برای مدل‌های زوجی، طول پرسش و سند با هم محاسبه می‌شود."
  },
  "evaluatedContext": {
    "state": "not-measured"
  },
  "releaseStatus": "available",
  "lastReviewedOn": "2026-09-15",
  "license": {
    "name": {
      "state": "known",
      "value": "MIT",
      "evidenceIds": [
        "evidence:v03-f20cf032d0b3ba91f5"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://huggingface.co/BAAI/bge-small-en-v1.5/raw/5c38ec7c405ec4b44b94cc5a9bb96e735b38267a/README.md",
      "evidenceIds": [
        "evidence:v03-f20cf032d0b3ba91f5"
      ]
    },
    "commercialUse": {
      "state": "known",
      "value": "allowed",
      "evidenceIds": [
        "evidence:v03-f20cf032d0b3ba91f5"
      ]
    },
    "restrictions": [],
    "evidenceIds": [
      "evidence:v03-f20cf032d0b3ba91f5"
    ]
  },
  "evidenceIds": [
    "evidence:v03-b1a5d8f1fca5485991",
    "evidence:v03-20543469523a77e0ff",
    "evidence:v03-8d8572aff34ce3c7e4",
    "evidence:v03-f20cf032d0b3ba91f5",
    "evidence:v03-70d82cf5e0139480c4",
    "evidence:v03-3abcba14cf9b7a8227"
  ],
  "parameterCounts": [
    {
      "scope": "nominal",
      "label": "اندازهٔ اعلامی نسخه",
      "value": {
        "state": "known",
        "value": 0.0334,
        "evidenceIds": [
          "evidence:v03-20543469523a77e0ff"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "stored",
      "label": "تعداد عناصر پارامتری نمایهٔ Safetensors",
      "value": {
        "state": "known",
        "value": 0.033360512,
        "evidenceIds": [
          "evidence:v03-70d82cf5e0139480c4"
        ],
        "unit": "billion-parameters",
        "note": "نمایهٔ فایل وزن؛ برای وزن کوانت‌شده یا اشتراک وزن، الزاماً شمار پارامتر مستقل نیست."
      },
      "approximate": false
    }
  ],
  "specializedSpecs": {
    "task": {
      "state": "known",
      "value": "بازیابی و مشابهت متن",
      "evidenceIds": [
        "evidence:v03-f20cf032d0b3ba91f5"
      ]
    },
    "output": {
      "state": "known",
      "value": "بردار 384بعدی",
      "evidenceIds": [
        "evidence:v03-f20cf032d0b3ba91f5"
      ]
    },
    "poolingOrScoring": {
      "state": "known",
      "value": "CLS و نرمال‌سازی؛ دستور retrieval فقط روی پرسش",
      "evidenceIds": [
        "evidence:v03-f20cf032d0b3ba91f5"
      ]
    },
    "features": {
      "state": "known",
      "value": "بردارساز انگلیسی کوچک برای جست‌وجوی کوتاه",
      "evidenceIds": [
        "evidence:v03-f20cf032d0b3ba91f5"
      ]
    },
    "languages": {
      "state": "known",
      "value": "زبان‌های اعلام‌شده: انگلیسی.",
      "evidenceIds": [
        "evidence:v03-f20cf032d0b3ba91f5"
      ]
    },
    "embeddingDimensions": {
      "state": "known",
      "value": 384,
      "evidenceIds": [
        "evidence:v03-f20cf032d0b3ba91f5"
      ]
    }
  }
});
models.push({
  "id": "model:baai-bge-reranker-base",
  "familyId": "family:bge",
  "exactName": "bge-reranker-base",
  "publisher": "BAAI",
  "version": "2cfc18c9415c912f9d8155881c133215df768a70",
  "aliases": [
    "BAAI/bge-reranker-base"
  ],
  "stage": "other",
  "architecture": "dense",
  "totalParametersB": {
    "state": "known",
    "value": 0.278044931,
    "evidenceIds": [
      "evidence:v03-1f0c018ac032d7d858"
    ],
    "unit": "billion-parameters",
    "note": "تعداد عناصر وزن در checkpoint غیرکوانت‌شدهٔ نمایهٔ ناشر؛ گردکردن فقط در نمایش."
  },
  "activeParametersB": {
    "state": "not-applicable"
  },
  "kind": "reranker",
  "inputModalities": [
    "text"
  ],
  "outputModalities": [
    "structured-data"
  ],
  "applications": [
    "enterprise-rag"
  ],
  "languages": [
    {
      "language": "en",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-384e89e117316b0e89"
        ]
      }
    },
    {
      "language": "zh",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-384e89e117316b0e89"
        ]
      }
    }
  ],
  "persianEvidenceStatus": "not-evaluated",
  "declaredContext": {
    "state": "known",
    "value": 512,
    "evidenceIds": [
      "evidence:v03-59ea9a6b606782ac4a"
    ],
    "unit": "token",
    "note": "حد ورودی مسیر مصرف مدل در کارت رسمی؛ برای مدل‌های زوجی، طول پرسش و سند با هم محاسبه می‌شود."
  },
  "evaluatedContext": {
    "state": "not-measured"
  },
  "releaseStatus": "available",
  "lastReviewedOn": "2026-09-15",
  "license": {
    "name": {
      "state": "known",
      "value": "MIT",
      "evidenceIds": [
        "evidence:v03-59ea9a6b606782ac4a"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://huggingface.co/BAAI/bge-reranker-base/raw/2cfc18c9415c912f9d8155881c133215df768a70/README.md",
      "evidenceIds": [
        "evidence:v03-59ea9a6b606782ac4a"
      ]
    },
    "commercialUse": {
      "state": "known",
      "value": "allowed",
      "evidenceIds": [
        "evidence:v03-59ea9a6b606782ac4a"
      ]
    },
    "restrictions": [],
    "evidenceIds": [
      "evidence:v03-59ea9a6b606782ac4a"
    ]
  },
  "evidenceIds": [
    "evidence:v03-8cc5caa3a99a885139",
    "evidence:v03-4f5b7c37e93be58934",
    "evidence:v03-00a5ea8ca06d7da2b3",
    "evidence:v03-59ea9a6b606782ac4a",
    "evidence:v03-384e89e117316b0e89",
    "evidence:v03-1f0c018ac032d7d858"
  ],
  "parameterCounts": [
    {
      "scope": "nominal",
      "label": "اندازهٔ اعلامی نسخه",
      "value": {
        "state": "known",
        "value": 0.278,
        "evidenceIds": [
          "evidence:v03-4f5b7c37e93be58934"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "stored",
      "label": "تعداد عناصر پارامتری نمایهٔ Safetensors",
      "value": {
        "state": "known",
        "value": 0.278044931,
        "evidenceIds": [
          "evidence:v03-384e89e117316b0e89"
        ],
        "unit": "billion-parameters",
        "note": "نمایهٔ فایل وزن؛ برای وزن کوانت‌شده یا اشتراک وزن، الزاماً شمار پارامتر مستقل نیست."
      },
      "approximate": false
    }
  ],
  "specializedSpecs": {
    "task": {
      "state": "known",
      "value": "بازرتبه‌بندی نتایج جست‌وجو",
      "evidenceIds": [
        "evidence:v03-59ea9a6b606782ac4a"
      ]
    },
    "output": {
      "state": "known",
      "value": "امتیاز ارتباط پرسش و سند",
      "evidenceIds": [
        "evidence:v03-59ea9a6b606782ac4a"
      ]
    },
    "poolingOrScoring": {
      "state": "known",
      "value": "Cross-encoder روی زوج پرسش و سند؛ امتیاز ارتباط",
      "evidenceIds": [
        "evidence:v03-59ea9a6b606782ac4a"
      ]
    },
    "features": {
      "state": "known",
      "value": "بازرتبه‌بندی انگلیسی و چینی؛ تعداد سندهای ورودی را پس از بازیابی محدود کنید",
      "evidenceIds": [
        "evidence:v03-59ea9a6b606782ac4a"
      ]
    },
    "languages": {
      "state": "known",
      "value": "زبان‌های اعلام‌شده: انگلیسی، چینی.",
      "evidenceIds": [
        "evidence:v03-59ea9a6b606782ac4a"
      ]
    }
  }
});
models.push({
  "id": "model:qwen-qwen2-5-coder-7b-instruct",
  "familyId": "family:qwen",
  "exactName": "Qwen2.5-Coder-7B-Instruct",
  "publisher": "Qwen / Alibaba Cloud",
  "version": "c03e6d358207e414f1eca0bb1891e29f1db0e242",
  "aliases": [
    "Qwen/Qwen2.5-Coder-7B-Instruct"
  ],
  "stage": "instruct",
  "architecture": "dense",
  "totalParametersB": {
    "state": "known",
    "value": 7.61,
    "evidenceIds": [
      "evidence:v03-6cacb45b6a53ee5b07"
    ],
    "unit": "billion-parameters",
    "note": "شمار گرد‌شدهٔ اعلامی ناشر."
  },
  "activeParametersB": {
    "state": "not-applicable"
  },
  "kind": "generative",
  "inputModalities": [
    "text"
  ],
  "outputModalities": [
    "text"
  ],
  "applications": [
    "text-work",
    "enterprise-rag",
    "structured-extraction",
    "coding-assistant"
  ],
  "languages": [
    {
      "language": "en",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-843697a18e617d59c0"
        ]
      }
    }
  ],
  "persianEvidenceStatus": "not-evaluated",
  "declaredContext": {
    "state": "known",
    "value": 32768,
    "evidenceIds": [
      "evidence:v03-c11a55dd2f29a47589"
    ],
    "unit": "token",
    "note": "حد پیکربندی منتشرشده؛ ورودی و خروجی و نشانه‌های ویژه از همین بودجه استفاده می‌کنند."
  },
  "evaluatedContext": {
    "state": "not-measured"
  },
  "releaseStatus": "available",
  "lastReviewedOn": "2026-09-15",
  "license": {
    "name": {
      "state": "known",
      "value": "Apache-2.0",
      "evidenceIds": [
        "evidence:v03-6cacb45b6a53ee5b07"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://huggingface.co/Qwen/Qwen2.5-Coder-7B-Instruct/blob/main/LICENSE",
      "evidenceIds": [
        "evidence:v03-6cacb45b6a53ee5b07"
      ]
    },
    "commercialUse": {
      "state": "known",
      "value": "allowed",
      "evidenceIds": [
        "evidence:v03-6cacb45b6a53ee5b07"
      ]
    },
    "restrictions": [],
    "evidenceIds": [
      "evidence:v03-6cacb45b6a53ee5b07"
    ]
  },
  "evidenceIds": [
    "evidence:v03-409211188b03baa742",
    "evidence:v03-b2e0d889b1cceb9038",
    "evidence:v03-c11a55dd2f29a47589",
    "evidence:v03-6cacb45b6a53ee5b07",
    "evidence:v03-843697a18e617d59c0"
  ],
  "parameterCounts": [
    {
      "scope": "nominal",
      "label": "اندازهٔ اعلامی نسخه",
      "value": {
        "state": "known",
        "value": 7,
        "evidenceIds": [
          "evidence:v03-b2e0d889b1cceb9038"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "total",
      "label": "شمار گرد‌شدهٔ اعلامی ناشر",
      "value": {
        "state": "known",
        "value": 7.61,
        "evidenceIds": [
          "evidence:v03-6cacb45b6a53ee5b07"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "stored",
      "label": "تعداد عناصر پارامتری نمایهٔ Safetensors",
      "value": {
        "state": "known",
        "value": 7.615616512,
        "evidenceIds": [
          "evidence:v03-843697a18e617d59c0"
        ],
        "unit": "billion-parameters",
        "note": "نمایهٔ فایل وزن؛ برای وزن کوانت‌شده یا اشتراک وزن، الزاماً شمار پارامتر مستقل نیست."
      },
      "approximate": false
    }
  ]
});
models.push({
  "id": "model:qwen-qwen2-5-coder-14b-instruct",
  "familyId": "family:qwen",
  "exactName": "Qwen2.5-Coder-14B-Instruct",
  "publisher": "Qwen / Alibaba Cloud",
  "version": "aedcc2d42b622764e023cf882b6652e646b95671",
  "aliases": [
    "Qwen/Qwen2.5-Coder-14B-Instruct"
  ],
  "stage": "instruct",
  "architecture": "dense",
  "totalParametersB": {
    "state": "known",
    "value": 14.7,
    "evidenceIds": [
      "evidence:v03-372fbdddb400aa9652"
    ],
    "unit": "billion-parameters",
    "note": "شمار گرد‌شدهٔ اعلامی ناشر."
  },
  "activeParametersB": {
    "state": "not-applicable"
  },
  "kind": "generative",
  "inputModalities": [
    "text"
  ],
  "outputModalities": [
    "text"
  ],
  "applications": [
    "text-work",
    "enterprise-rag",
    "structured-extraction",
    "coding-assistant"
  ],
  "languages": [
    {
      "language": "en",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-24b3b6f0d5d25dc5c4"
        ]
      }
    }
  ],
  "persianEvidenceStatus": "not-evaluated",
  "declaredContext": {
    "state": "known",
    "value": 32768,
    "evidenceIds": [
      "evidence:v03-fcf9837f1d497065f7"
    ],
    "unit": "token",
    "note": "حد پیکربندی منتشرشده؛ ورودی و خروجی و نشانه‌های ویژه از همین بودجه استفاده می‌کنند."
  },
  "evaluatedContext": {
    "state": "not-measured"
  },
  "releaseStatus": "available",
  "lastReviewedOn": "2026-09-15",
  "license": {
    "name": {
      "state": "known",
      "value": "Apache-2.0",
      "evidenceIds": [
        "evidence:v03-372fbdddb400aa9652"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://huggingface.co/Qwen/Qwen2.5-Coder-14B-Instruct/blob/main/LICENSE",
      "evidenceIds": [
        "evidence:v03-372fbdddb400aa9652"
      ]
    },
    "commercialUse": {
      "state": "known",
      "value": "allowed",
      "evidenceIds": [
        "evidence:v03-372fbdddb400aa9652"
      ]
    },
    "restrictions": [],
    "evidenceIds": [
      "evidence:v03-372fbdddb400aa9652"
    ]
  },
  "evidenceIds": [
    "evidence:v03-f48bf2d137d0fb4870",
    "evidence:v03-43083354e4092cf35d",
    "evidence:v03-fcf9837f1d497065f7",
    "evidence:v03-372fbdddb400aa9652",
    "evidence:v03-24b3b6f0d5d25dc5c4"
  ],
  "parameterCounts": [
    {
      "scope": "nominal",
      "label": "اندازهٔ اعلامی نسخه",
      "value": {
        "state": "known",
        "value": 14,
        "evidenceIds": [
          "evidence:v03-43083354e4092cf35d"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "total",
      "label": "شمار گرد‌شدهٔ اعلامی ناشر",
      "value": {
        "state": "known",
        "value": 14.7,
        "evidenceIds": [
          "evidence:v03-372fbdddb400aa9652"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "stored",
      "label": "تعداد عناصر پارامتری نمایهٔ Safetensors",
      "value": {
        "state": "known",
        "value": 14.770033664,
        "evidenceIds": [
          "evidence:v03-24b3b6f0d5d25dc5c4"
        ],
        "unit": "billion-parameters",
        "note": "نمایهٔ فایل وزن؛ برای وزن کوانت‌شده یا اشتراک وزن، الزاماً شمار پارامتر مستقل نیست."
      },
      "approximate": false
    }
  ]
});
models.push({
  "id": "model:qwen-qwen2-5-coder-32b-instruct",
  "familyId": "family:qwen",
  "exactName": "Qwen2.5-Coder-32B-Instruct",
  "publisher": "Qwen / Alibaba Cloud",
  "version": "381fc969f78efac66bc87ff7ddeadb7e73c218a7",
  "aliases": [
    "Qwen/Qwen2.5-Coder-32B-Instruct"
  ],
  "stage": "instruct",
  "architecture": "dense",
  "totalParametersB": {
    "state": "known",
    "value": 32.5,
    "evidenceIds": [
      "evidence:v03-8dc6a67f1d3ac055f4"
    ],
    "unit": "billion-parameters",
    "note": "شمار گرد‌شدهٔ اعلامی ناشر."
  },
  "activeParametersB": {
    "state": "not-applicable"
  },
  "kind": "generative",
  "inputModalities": [
    "text"
  ],
  "outputModalities": [
    "text"
  ],
  "applications": [
    "text-work",
    "enterprise-rag",
    "structured-extraction",
    "coding-assistant"
  ],
  "languages": [
    {
      "language": "en",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-6569e767d0be12a19a"
        ]
      }
    }
  ],
  "persianEvidenceStatus": "not-evaluated",
  "declaredContext": {
    "state": "known",
    "value": 32768,
    "evidenceIds": [
      "evidence:v03-874eb46a550d42d1c6"
    ],
    "unit": "token",
    "note": "حد پیکربندی منتشرشده؛ ورودی و خروجی و نشانه‌های ویژه از همین بودجه استفاده می‌کنند."
  },
  "evaluatedContext": {
    "state": "not-measured"
  },
  "releaseStatus": "available",
  "lastReviewedOn": "2026-09-15",
  "license": {
    "name": {
      "state": "known",
      "value": "Apache-2.0",
      "evidenceIds": [
        "evidence:v03-8dc6a67f1d3ac055f4"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://huggingface.co/Qwen/Qwen2.5-Coder-32B-Instruct/blob/main/LICENSE",
      "evidenceIds": [
        "evidence:v03-8dc6a67f1d3ac055f4"
      ]
    },
    "commercialUse": {
      "state": "known",
      "value": "allowed",
      "evidenceIds": [
        "evidence:v03-8dc6a67f1d3ac055f4"
      ]
    },
    "restrictions": [],
    "evidenceIds": [
      "evidence:v03-8dc6a67f1d3ac055f4"
    ]
  },
  "evidenceIds": [
    "evidence:v03-12a8034a3f8b975a18",
    "evidence:v03-6a32c6eb377351a96e",
    "evidence:v03-874eb46a550d42d1c6",
    "evidence:v03-8dc6a67f1d3ac055f4",
    "evidence:v03-6569e767d0be12a19a"
  ],
  "parameterCounts": [
    {
      "scope": "nominal",
      "label": "اندازهٔ اعلامی نسخه",
      "value": {
        "state": "known",
        "value": 32,
        "evidenceIds": [
          "evidence:v03-6a32c6eb377351a96e"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "total",
      "label": "شمار گرد‌شدهٔ اعلامی ناشر",
      "value": {
        "state": "known",
        "value": 32.5,
        "evidenceIds": [
          "evidence:v03-8dc6a67f1d3ac055f4"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "stored",
      "label": "تعداد عناصر پارامتری نمایهٔ Safetensors",
      "value": {
        "state": "known",
        "value": 32.763876352,
        "evidenceIds": [
          "evidence:v03-6569e767d0be12a19a"
        ],
        "unit": "billion-parameters",
        "note": "نمایهٔ فایل وزن؛ برای وزن کوانت‌شده یا اشتراک وزن، الزاماً شمار پارامتر مستقل نیست."
      },
      "approximate": false
    }
  ]
});
models.push({
  "id": "model:google-embeddinggemma-300m",
  "familyId": "family:embeddinggemma",
  "exactName": "embeddinggemma-300m",
  "publisher": "Google DeepMind",
  "version": "57c266a740f537b4dc058e1b0cda161fd15afa75",
  "aliases": [
    "google/embeddinggemma-300m"
  ],
  "stage": "other",
  "architecture": "dense",
  "totalParametersB": {
    "state": "unknown"
  },
  "activeParametersB": {
    "state": "not-applicable"
  },
  "kind": "embedding",
  "inputModalities": [
    "text"
  ],
  "outputModalities": [
    "embedding"
  ],
  "applications": [
    "enterprise-rag"
  ],
  "languages": [
    {
      "language": "multilingual",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-4fc4be5e247f489a27"
        ]
      }
    }
  ],
  "persianEvidenceStatus": "not-evaluated",
  "declaredContext": {
    "state": "known",
    "value": 2048,
    "evidenceIds": [
      "evidence:v03-4fc4be5e247f489a27"
    ],
    "unit": "token",
    "note": "حد ورودی مسیر مصرف مدل در کارت رسمی؛ برای مدل‌های زوجی، طول پرسش و سند با هم محاسبه می‌شود."
  },
  "evaluatedContext": {
    "state": "not-measured"
  },
  "releaseStatus": "available",
  "lastReviewedOn": "2026-09-15",
  "license": {
    "name": {
      "state": "known",
      "value": "gemma",
      "evidenceIds": [
        "evidence:v03-4fc4be5e247f489a27"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://huggingface.co/google/embeddinggemma-300m",
      "evidenceIds": [
        "evidence:v03-4fc4be5e247f489a27"
      ]
    },
    "commercialUse": {
      "state": "known",
      "value": "restricted",
      "evidenceIds": [
        "evidence:v03-4fc4be5e247f489a27"
      ]
    },
    "restrictions": [],
    "evidenceIds": [
      "evidence:v03-4fc4be5e247f489a27"
    ]
  },
  "evidenceIds": [
    "evidence:v03-8c37117f47e7566c57",
    "evidence:v03-a6278cb6f93e17dd71",
    "evidence:v03-4fc4be5e247f489a27"
  ],
  "parameterCounts": [
    {
      "scope": "nominal",
      "label": "اندازهٔ اعلامی نسخه",
      "value": {
        "state": "known",
        "value": 0.3,
        "evidenceIds": [
          "evidence:v03-a6278cb6f93e17dd71"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "stored",
      "label": "تعداد عناصر پارامتری نمایهٔ Safetensors",
      "value": {
        "state": "known",
        "value": 0.302863104,
        "evidenceIds": [
          "evidence:v03-1a5876078e1906373a"
        ],
        "unit": "billion-parameters",
        "note": "نمایهٔ فایل وزن؛ برای وزن کوانت‌شده یا اشتراک وزن، الزاماً شمار پارامتر مستقل نیست."
      },
      "approximate": false
    }
  ],
  "specializedSpecs": {
    "task": {
      "state": "known",
      "value": "بازیابی و مشابهت متن",
      "evidenceIds": [
        "evidence:v03-4fc4be5e247f489a27"
      ]
    },
    "output": {
      "state": "known",
      "value": "بردار 768بعدی",
      "evidenceIds": [
        "evidence:v03-4fc4be5e247f489a27"
      ]
    },
    "poolingOrScoring": {
      "state": "known",
      "value": "مسیر Sentence Transformers با قالب پرسش و سند",
      "evidenceIds": [
        "evidence:v03-4fc4be5e247f489a27"
      ]
    },
    "features": {
      "state": "known",
      "value": "بیش از ۱۰۰ زبان؛ کاهش بعد با Matryoshka تا ۱۲۸ بعد",
      "evidenceIds": [
        "evidence:v03-4fc4be5e247f489a27"
      ]
    },
    "languages": {
      "state": "known",
      "value": "چندزبانه",
      "evidenceIds": [
        "evidence:v03-4fc4be5e247f489a27"
      ]
    },
    "embeddingDimensions": {
      "state": "known",
      "value": 768,
      "evidenceIds": [
        "evidence:v03-4fc4be5e247f489a27"
      ]
    }
  }
});
models.push({
  "id": "model:jinaai-jina-embeddings-v3",
  "familyId": "family:jina",
  "exactName": "jina-embeddings-v3",
  "publisher": "Jina AI",
  "version": "ab036b023d30b4d1138c4c3bfa9f0c445ab455d6",
  "aliases": [
    "jinaai/jina-embeddings-v3"
  ],
  "stage": "other",
  "architecture": "dense",
  "totalParametersB": {
    "state": "unknown"
  },
  "activeParametersB": {
    "state": "not-applicable"
  },
  "kind": "embedding",
  "inputModalities": [
    "text"
  ],
  "outputModalities": [
    "embedding"
  ],
  "applications": [
    "enterprise-rag"
  ],
  "languages": [
    {
      "language": "multilingual",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-07965f2a55c8c5ab96"
        ]
      }
    },
    {
      "language": "af",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-07965f2a55c8c5ab96"
        ]
      }
    },
    {
      "language": "am",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-07965f2a55c8c5ab96"
        ]
      }
    },
    {
      "language": "ar",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-07965f2a55c8c5ab96"
        ]
      }
    },
    {
      "language": "as",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-07965f2a55c8c5ab96"
        ]
      }
    },
    {
      "language": "az",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-07965f2a55c8c5ab96"
        ]
      }
    },
    {
      "language": "be",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-07965f2a55c8c5ab96"
        ]
      }
    },
    {
      "language": "bg",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-07965f2a55c8c5ab96"
        ]
      }
    },
    {
      "language": "bn",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-07965f2a55c8c5ab96"
        ]
      }
    },
    {
      "language": "br",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-07965f2a55c8c5ab96"
        ]
      }
    },
    {
      "language": "bs",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-07965f2a55c8c5ab96"
        ]
      }
    },
    {
      "language": "ca",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-07965f2a55c8c5ab96"
        ]
      }
    },
    {
      "language": "cs",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-07965f2a55c8c5ab96"
        ]
      }
    },
    {
      "language": "cy",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-07965f2a55c8c5ab96"
        ]
      }
    },
    {
      "language": "da",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-07965f2a55c8c5ab96"
        ]
      }
    },
    {
      "language": "de",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-07965f2a55c8c5ab96"
        ]
      }
    },
    {
      "language": "el",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-07965f2a55c8c5ab96"
        ]
      }
    },
    {
      "language": "en",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-07965f2a55c8c5ab96"
        ]
      }
    },
    {
      "language": "eo",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-07965f2a55c8c5ab96"
        ]
      }
    },
    {
      "language": "es",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-07965f2a55c8c5ab96"
        ]
      }
    },
    {
      "language": "et",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-07965f2a55c8c5ab96"
        ]
      }
    },
    {
      "language": "eu",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-07965f2a55c8c5ab96"
        ]
      }
    },
    {
      "language": "fa",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-07965f2a55c8c5ab96"
        ]
      }
    },
    {
      "language": "fi",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-07965f2a55c8c5ab96"
        ]
      }
    },
    {
      "language": "fr",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-07965f2a55c8c5ab96"
        ]
      }
    },
    {
      "language": "fy",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-07965f2a55c8c5ab96"
        ]
      }
    },
    {
      "language": "ga",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-07965f2a55c8c5ab96"
        ]
      }
    },
    {
      "language": "gd",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-07965f2a55c8c5ab96"
        ]
      }
    },
    {
      "language": "gl",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-07965f2a55c8c5ab96"
        ]
      }
    },
    {
      "language": "gu",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-07965f2a55c8c5ab96"
        ]
      }
    },
    {
      "language": "ha",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-07965f2a55c8c5ab96"
        ]
      }
    },
    {
      "language": "he",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-07965f2a55c8c5ab96"
        ]
      }
    },
    {
      "language": "hi",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-07965f2a55c8c5ab96"
        ]
      }
    },
    {
      "language": "hr",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-07965f2a55c8c5ab96"
        ]
      }
    },
    {
      "language": "hu",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-07965f2a55c8c5ab96"
        ]
      }
    },
    {
      "language": "hy",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-07965f2a55c8c5ab96"
        ]
      }
    },
    {
      "language": "id",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-07965f2a55c8c5ab96"
        ]
      }
    },
    {
      "language": "is",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-07965f2a55c8c5ab96"
        ]
      }
    },
    {
      "language": "it",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-07965f2a55c8c5ab96"
        ]
      }
    },
    {
      "language": "ja",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-07965f2a55c8c5ab96"
        ]
      }
    },
    {
      "language": "jv",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-07965f2a55c8c5ab96"
        ]
      }
    },
    {
      "language": "ka",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-07965f2a55c8c5ab96"
        ]
      }
    },
    {
      "language": "kk",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-07965f2a55c8c5ab96"
        ]
      }
    },
    {
      "language": "km",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-07965f2a55c8c5ab96"
        ]
      }
    },
    {
      "language": "kn",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-07965f2a55c8c5ab96"
        ]
      }
    },
    {
      "language": "ko",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-07965f2a55c8c5ab96"
        ]
      }
    },
    {
      "language": "ku",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-07965f2a55c8c5ab96"
        ]
      }
    },
    {
      "language": "ky",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-07965f2a55c8c5ab96"
        ]
      }
    },
    {
      "language": "la",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-07965f2a55c8c5ab96"
        ]
      }
    },
    {
      "language": "lo",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-07965f2a55c8c5ab96"
        ]
      }
    },
    {
      "language": "lt",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-07965f2a55c8c5ab96"
        ]
      }
    },
    {
      "language": "lv",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-07965f2a55c8c5ab96"
        ]
      }
    },
    {
      "language": "mg",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-07965f2a55c8c5ab96"
        ]
      }
    },
    {
      "language": "mk",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-07965f2a55c8c5ab96"
        ]
      }
    },
    {
      "language": "ml",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-07965f2a55c8c5ab96"
        ]
      }
    },
    {
      "language": "mn",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-07965f2a55c8c5ab96"
        ]
      }
    },
    {
      "language": "mr",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-07965f2a55c8c5ab96"
        ]
      }
    },
    {
      "language": "ms",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-07965f2a55c8c5ab96"
        ]
      }
    },
    {
      "language": "my",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-07965f2a55c8c5ab96"
        ]
      }
    },
    {
      "language": "ne",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-07965f2a55c8c5ab96"
        ]
      }
    },
    {
      "language": "nl",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-07965f2a55c8c5ab96"
        ]
      }
    },
    {
      "language": "no",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-07965f2a55c8c5ab96"
        ]
      }
    },
    {
      "language": "om",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-07965f2a55c8c5ab96"
        ]
      }
    },
    {
      "language": "or",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-07965f2a55c8c5ab96"
        ]
      }
    },
    {
      "language": "pa",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-07965f2a55c8c5ab96"
        ]
      }
    },
    {
      "language": "pl",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-07965f2a55c8c5ab96"
        ]
      }
    },
    {
      "language": "ps",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-07965f2a55c8c5ab96"
        ]
      }
    },
    {
      "language": "pt",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-07965f2a55c8c5ab96"
        ]
      }
    },
    {
      "language": "ro",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-07965f2a55c8c5ab96"
        ]
      }
    },
    {
      "language": "ru",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-07965f2a55c8c5ab96"
        ]
      }
    },
    {
      "language": "sa",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-07965f2a55c8c5ab96"
        ]
      }
    },
    {
      "language": "sd",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-07965f2a55c8c5ab96"
        ]
      }
    },
    {
      "language": "si",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-07965f2a55c8c5ab96"
        ]
      }
    },
    {
      "language": "sk",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-07965f2a55c8c5ab96"
        ]
      }
    },
    {
      "language": "sl",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-07965f2a55c8c5ab96"
        ]
      }
    },
    {
      "language": "so",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-07965f2a55c8c5ab96"
        ]
      }
    },
    {
      "language": "sq",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-07965f2a55c8c5ab96"
        ]
      }
    },
    {
      "language": "sr",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-07965f2a55c8c5ab96"
        ]
      }
    },
    {
      "language": "su",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-07965f2a55c8c5ab96"
        ]
      }
    },
    {
      "language": "sv",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-07965f2a55c8c5ab96"
        ]
      }
    },
    {
      "language": "sw",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-07965f2a55c8c5ab96"
        ]
      }
    },
    {
      "language": "ta",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-07965f2a55c8c5ab96"
        ]
      }
    },
    {
      "language": "te",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-07965f2a55c8c5ab96"
        ]
      }
    },
    {
      "language": "th",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-07965f2a55c8c5ab96"
        ]
      }
    },
    {
      "language": "tl",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-07965f2a55c8c5ab96"
        ]
      }
    },
    {
      "language": "tr",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-07965f2a55c8c5ab96"
        ]
      }
    },
    {
      "language": "ug",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-07965f2a55c8c5ab96"
        ]
      }
    },
    {
      "language": "uk",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-07965f2a55c8c5ab96"
        ]
      }
    },
    {
      "language": "ur",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-07965f2a55c8c5ab96"
        ]
      }
    },
    {
      "language": "uz",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-07965f2a55c8c5ab96"
        ]
      }
    },
    {
      "language": "vi",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-07965f2a55c8c5ab96"
        ]
      }
    },
    {
      "language": "xh",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-07965f2a55c8c5ab96"
        ]
      }
    },
    {
      "language": "yi",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-07965f2a55c8c5ab96"
        ]
      }
    },
    {
      "language": "zh",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-07965f2a55c8c5ab96"
        ]
      }
    }
  ],
  "persianEvidenceStatus": "publisher-claimed",
  "declaredContext": {
    "state": "known",
    "value": 8192,
    "evidenceIds": [
      "evidence:v03-133e75dac7f5e254f9"
    ],
    "unit": "token",
    "note": "حد ورودی مسیر مصرف مدل در کارت رسمی؛ برای مدل‌های زوجی، طول پرسش و سند با هم محاسبه می‌شود."
  },
  "evaluatedContext": {
    "state": "not-measured"
  },
  "releaseStatus": "available",
  "lastReviewedOn": "2026-09-15",
  "license": {
    "name": {
      "state": "known",
      "value": "CC-BY-NC-4.0",
      "evidenceIds": [
        "evidence:v03-133e75dac7f5e254f9"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://huggingface.co/jinaai/jina-embeddings-v3/raw/ab036b023d30b4d1138c4c3bfa9f0c445ab455d6/README.md",
      "evidenceIds": [
        "evidence:v03-133e75dac7f5e254f9"
      ]
    },
    "commercialUse": {
      "state": "known",
      "value": "restricted",
      "evidenceIds": [
        "evidence:v03-133e75dac7f5e254f9"
      ]
    },
    "restrictions": [],
    "evidenceIds": [
      "evidence:v03-133e75dac7f5e254f9"
    ]
  },
  "evidenceIds": [
    "evidence:v03-06dee93b45df15d867",
    "evidence:v03-0a2c5c51e55cdf20f4",
    "evidence:v03-f74183aae8547b4382",
    "evidence:v03-133e75dac7f5e254f9",
    "evidence:v03-07965f2a55c8c5ab96"
  ],
  "parameterCounts": [
    {
      "scope": "nominal",
      "label": "اندازهٔ اعلامی نسخه",
      "value": {
        "state": "known",
        "value": 0.57,
        "evidenceIds": [
          "evidence:v03-0a2c5c51e55cdf20f4"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "stored",
      "label": "تعداد عناصر پارامتری نمایهٔ Safetensors",
      "value": {
        "state": "known",
        "value": 0.572310396,
        "evidenceIds": [
          "evidence:v03-07965f2a55c8c5ab96"
        ],
        "unit": "billion-parameters",
        "note": "نمایهٔ فایل وزن؛ برای وزن کوانت‌شده یا اشتراک وزن، الزاماً شمار پارامتر مستقل نیست."
      },
      "approximate": false
    }
  ],
  "specializedSpecs": {
    "task": {
      "state": "known",
      "value": "بازیابی و مشابهت متن",
      "evidenceIds": [
        "evidence:v03-133e75dac7f5e254f9"
      ]
    },
    "output": {
      "state": "known",
      "value": "بردار 1024بعدی",
      "evidenceIds": [
        "evidence:v03-133e75dac7f5e254f9"
      ]
    },
    "poolingOrScoring": {
      "state": "known",
      "value": "آداپتر retrieval.query / retrieval.passage؛ میانگین توکن‌ها و L2",
      "evidenceIds": [
        "evidence:v03-133e75dac7f5e254f9"
      ]
    },
    "features": {
      "state": "known",
      "value": "آداپتر وظیفه و بعد خروجی قابل انتخاب؛ مجوز غیرتجاری",
      "evidenceIds": [
        "evidence:v03-133e75dac7f5e254f9"
      ]
    },
    "languages": {
      "state": "known",
      "value": "زبان‌های اعلام‌شده: آفریکانس، امهری، عربی، آسامی، آذربایجانی، بلاروسی، بلغاری، بنگالی، برتانیایی، بوسنیایی، کاتالان، چکی، ولزی، دانمارکی و زبان‌های دیگر.",
      "evidenceIds": [
        "evidence:v03-133e75dac7f5e254f9"
      ]
    },
    "embeddingDimensions": {
      "state": "known",
      "value": 1024,
      "evidenceIds": [
        "evidence:v03-133e75dac7f5e254f9"
      ]
    }
  }
});
models.push({
  "id": "model:jinaai-jina-reranker-v2-base-multilingual",
  "familyId": "family:jina",
  "exactName": "jina-reranker-v2-base-multilingual",
  "publisher": "Jina AI",
  "version": "9cfeff2df7d40d1b78e75e5e9cebec92a99813c9",
  "aliases": [
    "jinaai/jina-reranker-v2-base-multilingual"
  ],
  "stage": "other",
  "architecture": "dense",
  "totalParametersB": {
    "state": "known",
    "value": 0.278437633,
    "evidenceIds": [
      "evidence:v03-fa8663b0ee84e0dd39"
    ],
    "unit": "billion-parameters",
    "note": "تعداد عناصر وزن در checkpoint غیرکوانت‌شدهٔ نمایهٔ ناشر؛ گردکردن فقط در نمایش."
  },
  "activeParametersB": {
    "state": "not-applicable"
  },
  "kind": "reranker",
  "inputModalities": [
    "text"
  ],
  "outputModalities": [
    "structured-data"
  ],
  "applications": [
    "enterprise-rag"
  ],
  "languages": [
    {
      "language": "multilingual",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-5f1fcca05da5622885"
        ]
      }
    }
  ],
  "persianEvidenceStatus": "not-evaluated",
  "declaredContext": {
    "state": "known",
    "value": 1024,
    "evidenceIds": [
      "evidence:v03-d6e73357bf96ab362e"
    ],
    "unit": "token",
    "note": "حد ورودی مسیر مصرف مدل در کارت رسمی؛ برای مدل‌های زوجی، طول پرسش و سند با هم محاسبه می‌شود."
  },
  "evaluatedContext": {
    "state": "not-measured"
  },
  "releaseStatus": "available",
  "lastReviewedOn": "2026-09-15",
  "license": {
    "name": {
      "state": "known",
      "value": "CC-BY-NC-4.0",
      "evidenceIds": [
        "evidence:v03-d6e73357bf96ab362e"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://huggingface.co/jinaai/jina-reranker-v2-base-multilingual/raw/9cfeff2df7d40d1b78e75e5e9cebec92a99813c9/README.md",
      "evidenceIds": [
        "evidence:v03-d6e73357bf96ab362e"
      ]
    },
    "commercialUse": {
      "state": "known",
      "value": "restricted",
      "evidenceIds": [
        "evidence:v03-d6e73357bf96ab362e"
      ]
    },
    "restrictions": [],
    "evidenceIds": [
      "evidence:v03-d6e73357bf96ab362e"
    ]
  },
  "evidenceIds": [
    "evidence:v03-656580d41b93bedb51",
    "evidence:v03-47602574cb1e03679b",
    "evidence:v03-e2162f258e45e75119",
    "evidence:v03-d6e73357bf96ab362e",
    "evidence:v03-5f1fcca05da5622885",
    "evidence:v03-fa8663b0ee84e0dd39"
  ],
  "parameterCounts": [
    {
      "scope": "nominal",
      "label": "اندازهٔ اعلامی نسخه",
      "value": {
        "state": "known",
        "value": 0.278,
        "evidenceIds": [
          "evidence:v03-47602574cb1e03679b"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "stored",
      "label": "تعداد عناصر پارامتری نمایهٔ Safetensors",
      "value": {
        "state": "known",
        "value": 0.278437633,
        "evidenceIds": [
          "evidence:v03-5f1fcca05da5622885"
        ],
        "unit": "billion-parameters",
        "note": "نمایهٔ فایل وزن؛ برای وزن کوانت‌شده یا اشتراک وزن، الزاماً شمار پارامتر مستقل نیست."
      },
      "approximate": false
    }
  ],
  "specializedSpecs": {
    "task": {
      "state": "known",
      "value": "بازرتبه‌بندی نتایج جست‌وجو",
      "evidenceIds": [
        "evidence:v03-d6e73357bf96ab362e"
      ]
    },
    "output": {
      "state": "known",
      "value": "امتیاز ارتباط پرسش و سند",
      "evidenceIds": [
        "evidence:v03-d6e73357bf96ab362e"
      ]
    },
    "poolingOrScoring": {
      "state": "known",
      "value": "CrossEncoder؛ امتیاز ارتباط جفت پرسش و سند",
      "evidenceIds": [
        "evidence:v03-d6e73357bf96ab362e"
      ]
    },
    "features": {
      "state": "known",
      "value": "بازرتبه‌بندی چندزبانه با ورودی تا ۱۰۲۴ توکن؛ مجوز غیرتجاری",
      "evidenceIds": [
        "evidence:v03-d6e73357bf96ab362e"
      ]
    },
    "languages": {
      "state": "known",
      "value": "چندزبانه",
      "evidenceIds": [
        "evidence:v03-d6e73357bf96ab362e"
      ]
    }
  }
});
models.push({
  "id": "model:mixedbread-ai-mxbai-embed-large-v1",
  "familyId": "family:mixedbread",
  "exactName": "mxbai-embed-large-v1",
  "publisher": "Mixedbread",
  "version": "b33106f585b9ce46904ad7443a3b52b7a63e231c",
  "aliases": [
    "mixedbread-ai/mxbai-embed-large-v1"
  ],
  "stage": "other",
  "architecture": "dense",
  "totalParametersB": {
    "state": "known",
    "value": 0.335141888,
    "evidenceIds": [
      "evidence:v03-7381ca82c8618eac3d"
    ],
    "unit": "billion-parameters",
    "note": "تعداد عناصر وزن در checkpoint غیرکوانت‌شدهٔ نمایهٔ ناشر؛ گردکردن فقط در نمایش."
  },
  "activeParametersB": {
    "state": "not-applicable"
  },
  "kind": "embedding",
  "inputModalities": [
    "text"
  ],
  "outputModalities": [
    "embedding"
  ],
  "applications": [
    "enterprise-rag"
  ],
  "languages": [
    {
      "language": "en",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-c5e9c7e422d09855be"
        ]
      }
    }
  ],
  "persianEvidenceStatus": "not-evaluated",
  "declaredContext": {
    "state": "known",
    "value": 512,
    "evidenceIds": [
      "evidence:v03-27b58c9e3c734925b5"
    ],
    "unit": "token",
    "note": "حد پیکربندی منتشرشده؛ ورودی و خروجی و نشانه‌های ویژه از همین بودجه استفاده می‌کنند."
  },
  "evaluatedContext": {
    "state": "not-measured"
  },
  "releaseStatus": "available",
  "lastReviewedOn": "2026-09-15",
  "license": {
    "name": {
      "state": "known",
      "value": "Apache-2.0",
      "evidenceIds": [
        "evidence:v03-4128a3077638e7a164"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://huggingface.co/mixedbread-ai/mxbai-embed-large-v1/blob/b33106f585b9ce46904ad7443a3b52b7a63e231c/LICENSE",
      "evidenceIds": [
        "evidence:v03-4128a3077638e7a164"
      ]
    },
    "commercialUse": {
      "state": "known",
      "value": "allowed",
      "evidenceIds": [
        "evidence:v03-4128a3077638e7a164"
      ]
    },
    "restrictions": [],
    "evidenceIds": [
      "evidence:v03-4128a3077638e7a164"
    ]
  },
  "evidenceIds": [
    "evidence:v03-35e4bd58aab43e5fb7",
    "evidence:v03-1c5cc19762f87061e9",
    "evidence:v03-27b58c9e3c734925b5",
    "evidence:v03-c5e9c7e422d09855be",
    "evidence:v03-4128a3077638e7a164",
    "evidence:v03-7381ca82c8618eac3d"
  ],
  "parameterCounts": [
    {
      "scope": "nominal",
      "label": "اندازهٔ اعلامی نسخه",
      "value": {
        "state": "known",
        "value": 0.335,
        "evidenceIds": [
          "evidence:v03-1c5cc19762f87061e9"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "stored",
      "label": "تعداد عناصر پارامتری نمایهٔ Safetensors",
      "value": {
        "state": "known",
        "value": 0.335141888,
        "evidenceIds": [
          "evidence:v03-c5e9c7e422d09855be"
        ],
        "unit": "billion-parameters",
        "note": "نمایهٔ فایل وزن؛ برای وزن کوانت‌شده یا اشتراک وزن، الزاماً شمار پارامتر مستقل نیست."
      },
      "approximate": false
    }
  ],
  "specializedSpecs": {
    "task": {
      "state": "known",
      "value": "بازیابی و مشابهت متن",
      "evidenceIds": [
        "evidence:v03-4128a3077638e7a164"
      ]
    },
    "output": {
      "state": "known",
      "value": "بردار 1024بعدی",
      "evidenceIds": [
        "evidence:v03-4128a3077638e7a164"
      ]
    },
    "poolingOrScoring": {
      "state": "known",
      "value": "دستور Represent this sentence for searching relevant passages: روی پرسش",
      "evidenceIds": [
        "evidence:v03-4128a3077638e7a164"
      ]
    },
    "features": {
      "state": "known",
      "value": "بردارساز انگلیسی؛ بردار سند بدون دستور پرسش ساخته شود",
      "evidenceIds": [
        "evidence:v03-4128a3077638e7a164"
      ]
    },
    "languages": {
      "state": "known",
      "value": "زبان‌های اعلام‌شده: انگلیسی.",
      "evidenceIds": [
        "evidence:v03-4128a3077638e7a164"
      ]
    },
    "embeddingDimensions": {
      "state": "known",
      "value": 1024,
      "evidenceIds": [
        "evidence:v03-4128a3077638e7a164"
      ]
    }
  }
});
models.push({
  "id": "model:nomic-ai-nomic-embed-text-v1-5",
  "familyId": "family:nomic",
  "exactName": "nomic-embed-text-v1.5",
  "publisher": "Nomic AI",
  "version": "e9b6763023c676ca8431644204f50c2b100d9aab",
  "aliases": [
    "nomic-ai/nomic-embed-text-v1.5"
  ],
  "stage": "other",
  "architecture": "dense",
  "totalParametersB": {
    "state": "known",
    "value": 0.136731648,
    "evidenceIds": [
      "evidence:v03-8b38fe3a719854e2f7"
    ],
    "unit": "billion-parameters",
    "note": "تعداد عناصر وزن در checkpoint غیرکوانت‌شدهٔ نمایهٔ ناشر؛ گردکردن فقط در نمایش."
  },
  "activeParametersB": {
    "state": "not-applicable"
  },
  "kind": "embedding",
  "inputModalities": [
    "text"
  ],
  "outputModalities": [
    "embedding"
  ],
  "applications": [
    "enterprise-rag"
  ],
  "languages": [
    {
      "language": "en",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-74362c98c19e268849"
        ]
      }
    }
  ],
  "persianEvidenceStatus": "not-evaluated",
  "declaredContext": {
    "state": "known",
    "value": 8192,
    "evidenceIds": [
      "evidence:v03-934bd541e054349d80"
    ],
    "unit": "token",
    "note": "حد ورودی مسیر مصرف مدل در کارت رسمی؛ برای مدل‌های زوجی، طول پرسش و سند با هم محاسبه می‌شود."
  },
  "evaluatedContext": {
    "state": "not-measured"
  },
  "releaseStatus": "available",
  "lastReviewedOn": "2026-09-15",
  "license": {
    "name": {
      "state": "known",
      "value": "Apache-2.0",
      "evidenceIds": [
        "evidence:v03-934bd541e054349d80"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://huggingface.co/nomic-ai/nomic-embed-text-v1.5/raw/e9b6763023c676ca8431644204f50c2b100d9aab/README.md",
      "evidenceIds": [
        "evidence:v03-934bd541e054349d80"
      ]
    },
    "commercialUse": {
      "state": "known",
      "value": "allowed",
      "evidenceIds": [
        "evidence:v03-934bd541e054349d80"
      ]
    },
    "restrictions": [],
    "evidenceIds": [
      "evidence:v03-934bd541e054349d80"
    ]
  },
  "evidenceIds": [
    "evidence:v03-0d47d6a7d730b605ad",
    "evidence:v03-971d83f6e7effed7c9",
    "evidence:v03-614ccfb86f8deff8d0",
    "evidence:v03-934bd541e054349d80",
    "evidence:v03-74362c98c19e268849",
    "evidence:v03-8b38fe3a719854e2f7"
  ],
  "parameterCounts": [
    {
      "scope": "nominal",
      "label": "اندازهٔ اعلامی نسخه",
      "value": {
        "state": "known",
        "value": 0.137,
        "evidenceIds": [
          "evidence:v03-971d83f6e7effed7c9"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "stored",
      "label": "تعداد عناصر پارامتری نمایهٔ Safetensors",
      "value": {
        "state": "known",
        "value": 0.136731648,
        "evidenceIds": [
          "evidence:v03-74362c98c19e268849"
        ],
        "unit": "billion-parameters",
        "note": "نمایهٔ فایل وزن؛ برای وزن کوانت‌شده یا اشتراک وزن، الزاماً شمار پارامتر مستقل نیست."
      },
      "approximate": false
    }
  ],
  "specializedSpecs": {
    "task": {
      "state": "known",
      "value": "بازیابی و مشابهت متن",
      "evidenceIds": [
        "evidence:v03-934bd541e054349d80"
      ]
    },
    "output": {
      "state": "known",
      "value": "بردار 768بعدی",
      "evidenceIds": [
        "evidence:v03-934bd541e054349d80"
      ]
    },
    "poolingOrScoring": {
      "state": "known",
      "value": "پیشوند search_query: برای پرسش و search_document: برای سند؛ نرمال‌سازی و کاهش بُعد",
      "evidenceIds": [
        "evidence:v03-934bd541e054349d80"
      ]
    },
    "features": {
      "state": "known",
      "value": "Matryoshka برای کاهش ابعاد؛ زمینهٔ بلند با تنظیمات مدل",
      "evidenceIds": [
        "evidence:v03-934bd541e054349d80"
      ]
    },
    "languages": {
      "state": "known",
      "value": "زبان‌های اعلام‌شده: انگلیسی.",
      "evidenceIds": [
        "evidence:v03-934bd541e054349d80"
      ]
    },
    "embeddingDimensions": {
      "state": "known",
      "value": 768,
      "evidenceIds": [
        "evidence:v03-934bd541e054349d80"
      ]
    }
  }
});
models.push({
  "id": "model:answerdotai-modernbert-base",
  "familyId": "family:modernbert",
  "exactName": "ModernBERT-base",
  "publisher": "Answer.AI / LightOn",
  "version": "8949b909ec900327062f0ebf497f51aef5e6f0c8",
  "aliases": [
    "answerdotai/ModernBERT-base"
  ],
  "stage": "base",
  "architecture": "dense",
  "totalParametersB": {
    "state": "known",
    "value": 0.149655232,
    "evidenceIds": [
      "evidence:v03-425c45f7e8500e2e23"
    ],
    "unit": "billion-parameters",
    "note": "تعداد عناصر وزن در checkpoint غیرکوانت‌شدهٔ نمایهٔ ناشر؛ گردکردن فقط در نمایش."
  },
  "activeParametersB": {
    "state": "not-applicable"
  },
  "kind": "encoder-classifier",
  "inputModalities": [
    "text"
  ],
  "outputModalities": [
    "structured-data"
  ],
  "applications": [
    "structured-extraction"
  ],
  "languages": [
    {
      "language": "en",
      "declared": {
        "state": "known",
        "value": true,
        "evidenceIds": [
          "evidence:v03-d96c8f2f2ddacfb9bb"
        ]
      }
    }
  ],
  "persianEvidenceStatus": "not-evaluated",
  "declaredContext": {
    "state": "known",
    "value": 8192,
    "evidenceIds": [
      "evidence:v03-d718589d95531a0aef"
    ],
    "unit": "token",
    "note": "حد پیکربندی منتشرشده؛ ورودی و خروجی و نشانه‌های ویژه از همین بودجه استفاده می‌کنند."
  },
  "evaluatedContext": {
    "state": "not-measured"
  },
  "releaseStatus": "available",
  "lastReviewedOn": "2026-09-15",
  "license": {
    "name": {
      "state": "known",
      "value": "Apache-2.0",
      "evidenceIds": [
        "evidence:v03-9f4a255f17cc556d99"
      ]
    },
    "url": {
      "state": "known",
      "value": "https://huggingface.co/answerdotai/ModernBERT-base/raw/8949b909ec900327062f0ebf497f51aef5e6f0c8/README.md",
      "evidenceIds": [
        "evidence:v03-9f4a255f17cc556d99"
      ]
    },
    "commercialUse": {
      "state": "known",
      "value": "allowed",
      "evidenceIds": [
        "evidence:v03-9f4a255f17cc556d99"
      ]
    },
    "restrictions": [],
    "evidenceIds": [
      "evidence:v03-9f4a255f17cc556d99"
    ]
  },
  "evidenceIds": [
    "evidence:v03-37cbb761dd4de61b70",
    "evidence:v03-56d00ad79917f10658",
    "evidence:v03-d718589d95531a0aef",
    "evidence:v03-d96c8f2f2ddacfb9bb",
    "evidence:v03-9f4a255f17cc556d99",
    "evidence:v03-425c45f7e8500e2e23"
  ],
  "parameterCounts": [
    {
      "scope": "nominal",
      "label": "اندازهٔ اعلامی نسخه",
      "value": {
        "state": "known",
        "value": 0.149,
        "evidenceIds": [
          "evidence:v03-56d00ad79917f10658"
        ],
        "unit": "billion-parameters"
      },
      "approximate": true
    },
    {
      "scope": "stored",
      "label": "تعداد عناصر پارامتری نمایهٔ Safetensors",
      "value": {
        "state": "known",
        "value": 0.149655232,
        "evidenceIds": [
          "evidence:v03-d96c8f2f2ddacfb9bb"
        ],
        "unit": "billion-parameters",
        "note": "نمایهٔ فایل وزن؛ برای وزن کوانت‌شده یا اشتراک وزن، الزاماً شمار پارامتر مستقل نیست."
      },
      "approximate": false
    }
  ],
  "specializedSpecs": {
    "task": {
      "state": "known",
      "value": "تخصصی‌سازی دسته‌بندی و استخراج موجودیت",
      "evidenceIds": [
        "evidence:v03-9f4a255f17cc556d99"
      ]
    },
    "output": {
      "state": "known",
      "value": "بازنمایی توکن؛ هد وظیفه پس از آموزش",
      "evidenceIds": [
        "evidence:v03-9f4a255f17cc556d99"
      ]
    },
    "poolingOrScoring": {
      "state": "known",
      "value": "رمزگذار دوسویه؛ خروجی توکن یا هد آموزش‌دیدهٔ وظیفه",
      "evidenceIds": [
        "evidence:v03-9f4a255f17cc556d99"
      ]
    },
    "features": {
      "state": "known",
      "value": "مدل پایه برای fine-tuning دسته‌بندی/NER؛ چت‌بات یا دسته‌بند آماده نیست",
      "evidenceIds": [
        "evidence:v03-9f4a255f17cc556d99"
      ]
    },
    "languages": {
      "state": "known",
      "value": "زبان‌های اعلام‌شده: انگلیسی.",
      "evidenceIds": [
        "evidence:v03-9f4a255f17cc556d99"
      ]
    }
  }
});
