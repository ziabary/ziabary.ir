// Generated from data/llm/v0.3.0/repository.json by scripts/generate-llm-dataset.py.
import type { LlmGuideRepository } from '../schema';

export const modelUseGuidance: LlmGuideRepository['modelUseGuidance'] = [];
modelUseGuidance.push({
  "id": "model-use:baai-bge-m3:enterprise-rag",
  "modelVersionId": "model:baai-bge-m3",
  "applicationId": "enterprise-rag",
  "role": "retrieval",
  "summary": "بازیابی ترکیبی سند در RAG",
  "description": "سه خروجی متراکم، تنک و چندبرداری در یک مدل؛ بیش از ۱۰۰ زبان، ورودی ۸٬۱۹۲ توکن و بردار متراکم ۱٬۰۲۴بُعدی.",
  "distinguishingFeature": "سه خروجی متراکم، تنک و چندبرداری در یک مدل؛ بیش از ۱۰۰ زبان، ورودی ۸٬۱۹۲ توکن و بردار متراکم ۱٬۰۲۴بُعدی.",
  "conditions": [
    "برای استفادهٔ هم‌زمان از هر سه خروجی، مسیر FlagEmbedding را انتخاب کنید؛ خروجی بستهٔ GGUF یا Ollama به backend بستگی دارد."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:baai-bge-m3-card",
    "evidence:baai-bge-m3-metadata",
    "evidence:baai-bge-m3-parameters",
    "evidence:baai-bge-m3-license",
    "evidence:baai-bge-m3-context",
    "evidence:baai-bge-m3-config",
    "evidence:four-tables-release-bge-m3-release",
    "evidence:four-tables-baai-bge-m3-size"
  ]
});
modelUseGuidance.push({
  "id": "model-use:baai-bge-reranker-v2-m3:enterprise-rag",
  "modelVersionId": "model:baai-bge-reranker-v2-m3",
  "applicationId": "enterprise-rag",
  "role": "reranking",
  "summary": "مرتب‌کردن دوبارهٔ اسناد بازیابی‌شده",
  "description": "پرسش و سند را با هم می‌خواند و امتیاز ارتباط می‌دهد؛ مکمل مرحلهٔ بازیابی BGE-M3 است.",
  "distinguishingFeature": "پرسش و سند را با هم می‌خواند و امتیاز ارتباط می‌دهد؛ مکمل مرحلهٔ بازیابی BGE-M3 است.",
  "conditions": [
    "ابتدا تعداد محدودی سند بازیابی کنید؛ امتیاز sigmoid احتمال درستی پاسخ نیست و خروجی مدل، embedding نیست."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:baai-bge-reranker-v2-m3-card",
    "evidence:baai-bge-reranker-v2-m3-metadata",
    "evidence:baai-bge-reranker-v2-m3-parameters",
    "evidence:baai-bge-reranker-v2-m3-license",
    "evidence:baai-bge-reranker-v2-m3-context",
    "evidence:baai-bge-reranker-v2-m3-config",
    "evidence:four-tables-release-bge-reranker-v2-release",
    "evidence:four-tables-baai-bge-reranker-v2-m3-size"
  ]
});
modelUseGuidance.push({
  "id": "model-use:coherelabs-aya-expanse-32b:text-work",
  "modelVersionId": "model:coherelabs-aya-expanse-32b",
  "applicationId": "text-work",
  "role": "text-generation",
  "summary": "نگارش و گفت‌وگوی چندزبانه با اسناد بلند",
  "description": "نسخهٔ ۳۲میلیاردی Aya Expanse با زمینهٔ ۱۳۱٬۰۷۲ توکن؛ فارسی در فهرست ۲۳ زبان ناشر آمده است.",
  "distinguishingFeature": "نسخهٔ ۳۲میلیاردی Aya Expanse با زمینهٔ ۱۳۱٬۰۷۲ توکن؛ فارسی در فهرست ۲۳ زبان ناشر آمده است.",
  "conditions": [
    "نسخهٔ پژوهشی با مجوز غیرتجاری است؛ طول زمینه به معنی دقت یکسان در سراسر سند نیست."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:coherelabs-aya-expanse-32b-card",
    "evidence:coherelabs-aya-expanse-32b-metadata",
    "evidence:coherelabs-aya-expanse-32b-parameters",
    "evidence:coherelabs-aya-expanse-32b-license",
    "evidence:coherelabs-aya-expanse-32b-context",
    "evidence:four-tables-release-aya-expanse-release"
  ]
});
modelUseGuidance.push({
  "id": "model-use:coherelabs-aya-expanse-8b:text-work",
  "modelVersionId": "model:coherelabs-aya-expanse-8b",
  "applicationId": "text-work",
  "role": "text-generation",
  "summary": "دستیار نوشتن و بازنویسی چندزبانه",
  "description": "نسخهٔ ۸میلیاردی Aya Expanse، با زمینهٔ ۸٬۱۹۲ توکن و آموزش ترجیحات چندزبانه، برای آزمایش نگارش فارسی نیز قابل بررسی است.",
  "distinguishingFeature": "نسخهٔ ۸میلیاردی Aya Expanse، با زمینهٔ ۸٬۱۹۲ توکن و آموزش ترجیحات چندزبانه، برای آزمایش نگارش فارسی نیز قابل بررسی است.",
  "conditions": [
    "مجوز غیرتجاری و سقف زمینهٔ همین نسخه را رعایت کنید؛ نتایج نسخهٔ ۳۲میلیاردی به آن منتقل نمی‌شود."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:coherelabs-aya-expanse-8b-card",
    "evidence:coherelabs-aya-expanse-8b-metadata",
    "evidence:coherelabs-aya-expanse-8b-parameters",
    "evidence:coherelabs-aya-expanse-8b-license",
    "evidence:coherelabs-aya-expanse-8b-context",
    "evidence:four-tables-release-aya-expanse-release"
  ]
});
modelUseGuidance.push({
  "id": "model-use:coherelabs-tiny-aya-global:text-work",
  "modelVersionId": "model:coherelabs-tiny-aya-global",
  "applicationId": "text-work",
  "role": "text-generation",
  "summary": "گفت‌وگوی محلی در زبان‌های گوناگون",
  "description": "شاخهٔ Global از Tiny Aya برای پوشش عمومی زبان‌ها عرضه شده؛ با نسخه‌های منطقه‌ای Earth،Fire و Water یکی نیست.",
  "distinguishingFeature": "شاخهٔ Global از Tiny Aya برای پوشش عمومی زبان‌ها عرضه شده؛ با نسخه‌های منطقه‌ای Earth،Fire و Water یکی نیست.",
  "conditions": [
    "برای کاربرد فارسی نمونه‌های خود را ارزیابی کنید؛ نسخهٔ منطقه‌ای یا مدل پایه را جایگزین بی‌بررسی این checkpoint نکنید."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:coherelabs-tiny-aya-global-card",
    "evidence:coherelabs-tiny-aya-global-metadata",
    "evidence:coherelabs-tiny-aya-global-parameters",
    "evidence:coherelabs-tiny-aya-global-license",
    "evidence:coherelabs-tiny-aya-global-context",
    "evidence:four-tables-release-tiny-aya-release",
    "evidence:four-tables-coherelabs-tiny-aya-global-declared-context"
  ]
});
modelUseGuidance.push({
  "id": "model-use:huggingfacetb-smollm2-1-7b-instruct:agents-tools",
  "modelVersionId": "model:huggingfacetb-smollm2-1-7b-instruct",
  "applicationId": "agents-tools",
  "role": "tool-use",
  "summary": "نمونه‌سازی دستیار کوچک با فراخوانی تابع",
  "description": "بزرگ‌ترین نسخهٔ SmolLM2 در این فهرست، علاوه بر پیروی از دستور، قالب فراخوانی تابع دارد؛ این ویژگی به دو نسخهٔ کوچک‌تر تعمیم ندارد.",
  "distinguishingFeature": "بزرگ‌ترین نسخهٔ SmolLM2 در این فهرست، علاوه بر پیروی از دستور، قالب فراخوانی تابع دارد؛ این ویژگی به دو نسخهٔ کوچک‌تر تعمیم ندارد.",
  "conditions": [
    "مدل عمدتاً انگلیسی است؛ اجرای تابع را برنامهٔ میزبان انجام می‌دهد و باید آرگومان‌ها را اعتبارسنجی کند."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:huggingfacetb-smollm2-1-7b-instruct-card",
    "evidence:huggingfacetb-smollm2-1-7b-instruct-metadata",
    "evidence:huggingfacetb-smollm2-1-7b-instruct-parameters",
    "evidence:huggingfacetb-smollm2-1-7b-instruct-license",
    "evidence:huggingfacetb-smollm2-1-7b-instruct-config"
  ]
});
modelUseGuidance.push({
  "id": "model-use:huggingfacetb-smollm2-135m-instruct:text-work",
  "modelVersionId": "model:huggingfacetb-smollm2-135m-instruct",
  "applicationId": "text-work",
  "role": "text-generation",
  "summary": "آزمایش پیروی از دستور با مدل بسیار کوچک",
  "description": "نسخهٔ ۱۳۵میلیون‌پارامتری SmolLM2 برای نمونه‌سازی سادهٔ تولید متن و بررسی محدودیت مدل‌های کم‌حجم مناسب است.",
  "distinguishingFeature": "نسخهٔ ۱۳۵میلیون‌پارامتری SmolLM2 برای نمونه‌سازی سادهٔ تولید متن و بررسی محدودیت مدل‌های کم‌حجم مناسب است.",
  "conditions": [
    "دامنهٔ کار را به متن کوتاه و وظیفهٔ محدود ببندید؛ از آن انتظار دانش گسترده یا ابزارخوانی نسخهٔ ۱٫۷میلیاردی نداشته باشید."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:huggingfacetb-smollm2-135m-instruct-card",
    "evidence:huggingfacetb-smollm2-135m-instruct-metadata",
    "evidence:huggingfacetb-smollm2-135m-instruct-parameters",
    "evidence:huggingfacetb-smollm2-135m-instruct-license",
    "evidence:huggingfacetb-smollm2-135m-instruct-config"
  ]
});
modelUseGuidance.push({
  "id": "model-use:huggingfacetb-smollm2-360m-instruct:text-work",
  "modelVersionId": "model:huggingfacetb-smollm2-360m-instruct",
  "applicationId": "text-work",
  "role": "text-generation",
  "summary": "بازنویسی و خلاصه‌سازی متن کوتاه",
  "description": "نسخهٔ ۳۶۰میلیون‌پارامتری SmolLM2 با SFT و DPO برای دستورپذیری تنظیم شده و نمونهٔ اجرای CPU در کارت مدل دارد.",
  "distinguishingFeature": "نسخهٔ ۳۶۰میلیون‌پارامتری SmolLM2 با SFT و DPO برای دستورپذیری تنظیم شده و نمونهٔ اجرای CPU در کارت مدل دارد.",
  "conditions": [
    "تمرکز زبانی انگلیسی است؛ سرعت یا کیفیت فارسی از کوچک‌بودن مدل نتیجه نمی‌شود."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:huggingfacetb-smollm2-360m-instruct-card",
    "evidence:huggingfacetb-smollm2-360m-instruct-metadata",
    "evidence:huggingfacetb-smollm2-360m-instruct-parameters",
    "evidence:huggingfacetb-smollm2-360m-instruct-license",
    "evidence:huggingfacetb-smollm2-360m-instruct-config"
  ]
});
modelUseGuidance.push({
  "id": "model-use:huggingfacetb-smollm3-3b:text-work",
  "modelVersionId": "model:huggingfacetb-smollm3-3b",
  "applicationId": "text-work",
  "role": "text-generation",
  "summary": "دستیار کوچک با انتخاب حالت فکرکردن",
  "description": "SmolLM3 سه‌میلیاردی دو حالت پاسخ مستقیم و استدلال دارد؛ زمینهٔ آموزش ۶۵٬۵۳۶ توکن است و جزئیات آموزش منتشر شده‌اند.",
  "distinguishingFeature": "SmolLM3 سه‌میلیاردی دو حالت پاسخ مستقیم و استدلال دارد؛ زمینهٔ آموزش ۶۵٬۵۳۶ توکن است و جزئیات آموزش منتشر شده‌اند.",
  "conditions": [
    "برای زمینهٔ بلندتر تنظیم YaRN لازم است. متن کارت شش زبان بومی از جمله آلمانی را نام می‌برد، اما برچسب‌های مخزن هشت زبان متفاوت دارند؛ فارسی در هیچ‌یک نیست. Transformers نسخهٔ ۴٫۵۳ یا بالاتر لازم است."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:huggingfacetb-smollm3-3b-card",
    "evidence:huggingfacetb-smollm3-3b-metadata",
    "evidence:huggingfacetb-smollm3-3b-parameters",
    "evidence:huggingfacetb-smollm3-3b-license",
    "evidence:huggingfacetb-smollm3-3b-config",
    "evidence:four-tables-release-smollm3-release",
    "evidence:four-tables-huggingfacetb-smollm3-3b-declared-context"
  ]
});
modelUseGuidance.push({
  "id": "model-use:qwen-qwen3-0-6b:text-work",
  "modelVersionId": "model:qwen-qwen3-0-6b",
  "applicationId": "text-work",
  "role": "text-generation",
  "summary": "نمونه‌سازی گفت‌وگو با کوچک‌ترین Qwen3",
  "description": "نسخهٔ متراکم ۰٫۶میلیاردی Qwen3 هر دو حالت thinking و non-thinking را دارد؛ فایل رسمی Q8_0 نیز موجود است.",
  "distinguishingFeature": "نسخهٔ متراکم ۰٫۶میلیاردی Qwen3 هر دو حالت thinking و non-thinking را دارد؛ فایل رسمی Q8_0 نیز موجود است.",
  "conditions": [
    "بودجهٔ خروجی را محدود کنید؛ توانایی حل مسئلهٔ نسخه‌های بزرگ‌تر از نام مشترک خانواده استنتاج نمی‌شود."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:qwen-qwen3-0-6b-card",
    "evidence:qwen-qwen3-0-6b-metadata",
    "evidence:qwen-qwen3-0-6b-parameters",
    "evidence:qwen-qwen3-0-6b-license",
    "evidence:qwen-qwen3-0-6b-context",
    "evidence:qwen-qwen3-0-6b-config",
    "evidence:four-tables-release-qwen3-launch"
  ]
});
modelUseGuidance.push({
  "id": "model-use:qwen-qwen3-1-7b:text-work",
  "modelVersionId": "model:qwen-qwen3-1-7b",
  "applicationId": "text-work",
  "role": "text-generation",
  "summary": "دستیار متنی کوچک با کنترل استدلال",
  "description": "Qwen3-1.7B میان گزینه‌های زیر دو میلیارد پارامتر این فهرست قرار می‌گیرد؛ حالت پاسخ مستقیم را می‌توان از قالب پیام انتخاب کرد.",
  "distinguishingFeature": "Qwen3-1.7B میان گزینه‌های زیر دو میلیارد پارامتر این فهرست قرار می‌گیرد؛ حالت پاسخ مستقیم را می‌توان از قالب پیام انتخاب کرد.",
  "conditions": [
    "در حالت thinking، توکن‌های استدلال نیز جزو هزینه و طول خروجی‌اند؛ GGUF رسمی این رکورد Q8_0 است."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:qwen-qwen3-1-7b-card",
    "evidence:qwen-qwen3-1-7b-metadata",
    "evidence:qwen-qwen3-1-7b-parameters",
    "evidence:qwen-qwen3-1-7b-license",
    "evidence:qwen-qwen3-1-7b-context",
    "evidence:qwen-qwen3-1-7b-config",
    "evidence:four-tables-release-qwen3-launch"
  ]
});
modelUseGuidance.push({
  "id": "model-use:qwen-qwen3-14b:text-work",
  "modelVersionId": "model:qwen-qwen3-14b",
  "applicationId": "text-work",
  "role": "text-generation",
  "summary": "تولید و تحلیل متن با Qwen3 متراکم",
  "description": "Qwen3-14B یک مدل متراکم با دو حالت پاسخ است؛ نسخه‌های رسمی GGUF برای انتخاب دقت وزن در دسترس‌اند.",
  "distinguishingFeature": "Qwen3-14B یک مدل متراکم با دو حالت پاسخ است؛ نسخه‌های رسمی GGUF برای انتخاب دقت وزن در دسترس‌اند.",
  "conditions": [
    "بسته‌های Q4_K_M و Q8_0 در دسترس‌اند؛ سرعت و کیفیت آن‌ها در این راهنما آزموده نشده است."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:qwen-qwen3-14b-card",
    "evidence:qwen-qwen3-14b-metadata",
    "evidence:qwen-qwen3-14b-parameters",
    "evidence:qwen-qwen3-14b-license",
    "evidence:qwen-qwen3-14b-context",
    "evidence:qwen-qwen3-14b-config",
    "evidence:four-tables-release-qwen3-launch"
  ]
});
modelUseGuidance.push({
  "id": "model-use:qwen-qwen3-30b-a3b:agents-tools",
  "modelVersionId": "model:qwen-qwen3-30b-a3b",
  "applicationId": "agents-tools",
  "role": "tool-use",
  "summary": "دستیار ابزارمحور با معماری MoE",
  "description": "Qwen3-30B-A3B از خبرگان انتخابی استفاده می‌کند و از الگوی Qwen-Agent برای اتصال ابزارها بهره می‌برد.",
  "distinguishingFeature": "Qwen3-30B-A3B از خبرگان انتخابی استفاده می‌کند و از الگوی Qwen-Agent برای اتصال ابزارها بهره می‌برد.",
  "conditions": [
    "شمار پارامتر فعال، جای حجم کل وزن را در برآورد حافظه نمی‌گیرد؛ مدل باید با قالب پیام و parser سازگار اجرا شود."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:qwen-qwen3-30b-a3b-card",
    "evidence:qwen-qwen3-30b-a3b-metadata",
    "evidence:qwen-qwen3-30b-a3b-parameters",
    "evidence:qwen-qwen3-30b-a3b-license",
    "evidence:qwen-qwen3-30b-a3b-context",
    "evidence:qwen-qwen3-30b-a3b-config",
    "evidence:four-tables-release-qwen3-launch"
  ]
});
modelUseGuidance.push({
  "id": "model-use:qwen-qwen3-32b:reasoning-analysis",
  "modelVersionId": "model:qwen-qwen3-32b",
  "applicationId": "reasoning-analysis",
  "role": "reasoning",
  "summary": "تحلیل چندمرحله‌ای با نسخهٔ متراکم بزرگ Qwen3",
  "description": "Qwen3-32B برخلاف نسخهٔ 30B-A3B معماری متراکم دارد؛ حالت استدلال را می‌توان متناسب با پیچیدگی پرسش تنظیم کرد.",
  "distinguishingFeature": "Qwen3-32B برخلاف نسخهٔ 30B-A3B معماری متراکم دارد؛ حالت استدلال را می‌توان متناسب با پیچیدگی پرسش تنظیم کرد.",
  "conditions": [
    "برای مقایسهٔ پاسخ مستقیم و thinking، طول خروجی و شرایط یکسان نگه داشته شود؛ این معرفی رتبهٔ کیفیت نیست."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:qwen-qwen3-32b-card",
    "evidence:qwen-qwen3-32b-metadata",
    "evidence:qwen-qwen3-32b-parameters",
    "evidence:qwen-qwen3-32b-license",
    "evidence:qwen-qwen3-32b-context",
    "evidence:qwen-qwen3-32b-config",
    "evidence:four-tables-release-qwen3-launch"
  ]
});
modelUseGuidance.push({
  "id": "model-use:qwen-qwen3-4b:text-work",
  "modelVersionId": "model:qwen-qwen3-4b",
  "applicationId": "text-work",
  "role": "text-generation",
  "summary": "دستیار عمومی در اندازهٔ چهار میلیارد",
  "description": "Qwen3-4B امکان تغییر حالت thinking را در یک checkpoint ارائه می‌کند؛ GGUF رسمی با چند روش کوانت دارد.",
  "distinguishingFeature": "Qwen3-4B امکان تغییر حالت thinking را در یک checkpoint ارائه می‌کند؛ GGUF رسمی با چند روش کوانت دارد.",
  "conditions": [
    "زمینهٔ بومی ۳۲٬۷۶۸ توکن است؛ افزایش آن به تنظیمات توسعهٔ زمینه وابسته است."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:qwen-qwen3-4b-card",
    "evidence:qwen-qwen3-4b-metadata",
    "evidence:qwen-qwen3-4b-parameters",
    "evidence:qwen-qwen3-4b-license",
    "evidence:qwen-qwen3-4b-context",
    "evidence:qwen-qwen3-4b-config",
    "evidence:four-tables-release-qwen3-launch"
  ]
});
modelUseGuidance.push({
  "id": "model-use:qwen-qwen3-8b:text-work",
  "modelVersionId": "model:qwen-qwen3-8b",
  "applicationId": "text-work",
  "role": "text-generation",
  "summary": "گفت‌وگو و کار با متن با کنترل فکرکردن",
  "description": "Qwen3-8B مدل عمومی متراکم با ۸٫۲میلیارد پارامتر اعلام‌شده است؛ پاسخ مستقیم و reasoning را در قالب پیام انتخاب می‌کنید.",
  "distinguishingFeature": "Qwen3-8B مدل عمومی متراکم با ۸٫۲میلیارد پارامتر اعلام‌شده است؛ پاسخ مستقیم و reasoning را در قالب پیام انتخاب می‌کنید.",
  "conditions": [
    "برای شروع محلی، فایل‌های رسمی Q4_K_M و Q8_0 موجودند؛ کیفیت یا حافظهٔ اجرای آن‌ها در این راهنما اندازه‌گیری نشده است."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:qwen-qwen3-8b-card",
    "evidence:qwen-qwen3-8b-metadata",
    "evidence:qwen-qwen3-8b-parameters",
    "evidence:qwen-qwen3-8b-license",
    "evidence:qwen-qwen3-8b-context",
    "evidence:qwen-qwen3-8b-config",
    "evidence:four-tables-release-qwen3-launch"
  ]
});
modelUseGuidance.push({
  "id": "model-use:qwen-qwen3-coder-30b-a3b-instruct:coding-assistant",
  "modelVersionId": "model:qwen-qwen3-coder-30b-a3b-instruct",
  "applicationId": "coding-assistant",
  "role": "coding",
  "summary": "اصلاح مخزن کد با دستیار ابزارمحور",
  "description": "Qwen3-Coder-30B-A3B-Instruct برای تولید کد، ویرایش مخزن و گردش‌کار عامل برنامه‌نویسی تنظیم شده؛ زمینهٔ بومی ۲۶۲٬۱۴۴ توکن دارد.",
  "distinguishingFeature": "Qwen3-Coder-30B-A3B-Instruct برای تولید کد، ویرایش مخزن و گردش‌کار عامل برنامه‌نویسی تنظیم شده؛ زمینهٔ بومی ۲۶۲٬۱۴۴ توکن دارد.",
  "conditions": [
    "این نسخه non-thinking است؛ قالب فراخوانی ابزار مخصوص Coder را رعایت کنید و آن را با Qwen3-30B-A3B عمومی یکی نگیرید."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:qwen-qwen3-coder-30b-a3b-instruct-card",
    "evidence:qwen-qwen3-coder-30b-a3b-instruct-metadata",
    "evidence:qwen-qwen3-coder-30b-a3b-instruct-parameters",
    "evidence:qwen-qwen3-coder-30b-a3b-instruct-license",
    "evidence:qwen-qwen3-coder-30b-a3b-instruct-context",
    "evidence:qwen-qwen3-coder-30b-a3b-instruct-config"
  ]
});
modelUseGuidance.push({
  "id": "model-use:qwen-qwen3-embedding-0-6b:enterprise-rag",
  "modelVersionId": "model:qwen-qwen3-embedding-0-6b",
  "applicationId": "enterprise-rag",
  "role": "retrieval",
  "summary": "بازیابی برداری با کوچک‌ترین Qwen3 Embedding",
  "description": "نسخهٔ ۰٫۶میلیاردی، embedding دستورپذیر با حداکثر ۱٬۰۲۴ بُعد و ورودی ۳۲٬۷۶۸ توکن تولید می‌کند.",
  "distinguishingFeature": "نسخهٔ ۰٫۶میلیاردی، embedding دستورپذیر با حداکثر ۱٬۰۲۴ بُعد و ورودی ۳۲٬۷۶۸ توکن تولید می‌کند.",
  "conditions": [
    "دستور وظیفه را به query اضافه کنید؛ سندها باید با همان مدل و تنظیم ابعاد نمایه‌سازی شوند."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:qwen-qwen3-embedding-0-6b-card",
    "evidence:qwen-qwen3-embedding-0-6b-metadata",
    "evidence:qwen-qwen3-embedding-0-6b-parameters",
    "evidence:qwen-qwen3-embedding-0-6b-license",
    "evidence:qwen-qwen3-embedding-0-6b-context",
    "evidence:qwen-qwen3-embedding-0-6b-config",
    "evidence:four-tables-release-qwen3-embedding-launch"
  ]
});
modelUseGuidance.push({
  "id": "model-use:qwen-qwen3-embedding-4b:enterprise-rag",
  "modelVersionId": "model:qwen-qwen3-embedding-4b",
  "applicationId": "enterprise-rag",
  "role": "retrieval",
  "summary": "نمایه‌سازی چندزبانه با بردار قابل تنظیم",
  "description": "Qwen3-Embedding-4B خروجی تا ۲٬۵۶۰ بُعد دارد و برای تطبیق بردار با وظیفه از دستور query استفاده می‌کند.",
  "distinguishingFeature": "Qwen3-Embedding-4B خروجی تا ۲٬۵۶۰ بُعد دارد و برای تطبیق بردار با وظیفه از دستور query استفاده می‌کند.",
  "conditions": [
    "کاهش بُعد نیازمند آزمون کیفیت بازیابی روی مجموعهٔ واقعی شماست؛ عدد MTEB جانشین این آزمون نیست."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:qwen-qwen3-embedding-4b-card",
    "evidence:qwen-qwen3-embedding-4b-metadata",
    "evidence:qwen-qwen3-embedding-4b-parameters",
    "evidence:qwen-qwen3-embedding-4b-license",
    "evidence:qwen-qwen3-embedding-4b-context",
    "evidence:qwen-qwen3-embedding-4b-config",
    "evidence:four-tables-release-qwen3-embedding-launch"
  ]
});
modelUseGuidance.push({
  "id": "model-use:qwen-qwen3-embedding-8b:enterprise-rag",
  "modelVersionId": "model:qwen-qwen3-embedding-8b",
  "applicationId": "enterprise-rag",
  "role": "retrieval",
  "summary": "بازیابی سند با بزرگ‌ترین Qwen3 Embedding فهرست",
  "description": "Qwen3-Embedding-8B تا ۴٬۰۹۶ بُعد و زمینهٔ ۳۲٬۷۶۸ توکن دارد؛ ورودی آن متن و خروجی آن بردار است.",
  "distinguishingFeature": "Qwen3-Embedding-8B تا ۴٬۰۹۶ بُعد و زمینهٔ ۳۲٬۷۶۸ توکن دارد؛ ورودی آن متن و خروجی آن بردار است.",
  "conditions": [
    "هزینهٔ نمایه‌سازی و ذخیرهٔ بردار را جدا از هزینهٔ پاسخ مدل مولد حساب کنید؛ این مدل پاسخ نهایی نمی‌نویسد."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:qwen-qwen3-embedding-8b-card",
    "evidence:qwen-qwen3-embedding-8b-metadata",
    "evidence:qwen-qwen3-embedding-8b-parameters",
    "evidence:qwen-qwen3-embedding-8b-license",
    "evidence:qwen-qwen3-embedding-8b-context",
    "evidence:qwen-qwen3-embedding-8b-config",
    "evidence:four-tables-release-qwen3-embedding-launch"
  ]
});
modelUseGuidance.push({
  "id": "model-use:qwen-qwen3-reranker-0-6b:enterprise-rag",
  "modelVersionId": "model:qwen-qwen3-reranker-0-6b",
  "applicationId": "enterprise-rag",
  "role": "reranking",
  "summary": "بازرتبه‌بندی سبک‌تر در خانوادهٔ Qwen3",
  "description": "نسخهٔ ۰٫۶میلیاردی Qwen3-Reranker برای امتیازدادن به ارتباط query و document با دستور وظیفه تنظیم شده است.",
  "distinguishingFeature": "نسخهٔ ۰٫۶میلیاردی Qwen3-Reranker برای امتیازدادن به ارتباط query و document با دستور وظیفه تنظیم شده است.",
  "conditions": [
    "قالب مخصوص reranker و امتیاز yes/no لازم است؛ از مسیر chat یا تولید embedding استفاده نکنید."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:qwen-qwen3-reranker-0-6b-card",
    "evidence:qwen-qwen3-reranker-0-6b-metadata",
    "evidence:qwen-qwen3-reranker-0-6b-parameters",
    "evidence:qwen-qwen3-reranker-0-6b-license",
    "evidence:qwen-qwen3-reranker-0-6b-context",
    "evidence:qwen-qwen3-reranker-0-6b-config",
    "evidence:four-tables-release-qwen3-embedding-launch"
  ]
});
modelUseGuidance.push({
  "id": "model-use:qwen-qwen3-reranker-4b:enterprise-rag",
  "modelVersionId": "model:qwen-qwen3-reranker-4b",
  "applicationId": "enterprise-rag",
  "role": "reranking",
  "summary": "بازرتبه‌بندی دستورپذیر اسناد نامزد",
  "description": "Qwen3-Reranker-4B گزینهٔ میانی این خانواده است؛ پرسش، دستور بازیابی و متن سند در محاسبهٔ ارتباط شرکت دارند.",
  "distinguishingFeature": "Qwen3-Reranker-4B گزینهٔ میانی این خانواده است؛ پرسش، دستور بازیابی و متن سند در محاسبهٔ ارتباط شرکت دارند.",
  "conditions": [
    "فقط اسناد نامزد را به این مرحله بدهید؛ افزایش تعداد جفت‌های پرسش–سند هزینهٔ مرحلهٔ دوم را بالا می‌برد."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:qwen-qwen3-reranker-4b-card",
    "evidence:qwen-qwen3-reranker-4b-metadata",
    "evidence:qwen-qwen3-reranker-4b-parameters",
    "evidence:qwen-qwen3-reranker-4b-license",
    "evidence:qwen-qwen3-reranker-4b-context",
    "evidence:qwen-qwen3-reranker-4b-config",
    "evidence:four-tables-release-qwen3-embedding-launch"
  ]
});
modelUseGuidance.push({
  "id": "model-use:qwen-qwen3-reranker-8b:enterprise-rag",
  "modelVersionId": "model:qwen-qwen3-reranker-8b",
  "applicationId": "enterprise-rag",
  "role": "reranking",
  "summary": "بازرتبه‌بندی با نسخهٔ هشت‌میلیاردی Qwen3",
  "description": "Qwen3-Reranker-8B بزرگ‌ترین بازرتبه‌بند این مجموعه است؛ به جفت پرسش و سند امتیاز ارتباط می‌دهد.",
  "distinguishingFeature": "Qwen3-Reranker-8B بزرگ‌ترین بازرتبه‌بند این مجموعه است؛ به جفت پرسش و سند امتیاز ارتباط می‌دهد.",
  "conditions": [
    "برای انتخاب در برابر نسخهٔ ۴میلیاردی، کیفیت جست‌وجو و زمان روی اسناد خودتان را بسنجید؛ از اندازه رتبه نسازید."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:qwen-qwen3-reranker-8b-card",
    "evidence:qwen-qwen3-reranker-8b-metadata",
    "evidence:qwen-qwen3-reranker-8b-parameters",
    "evidence:qwen-qwen3-reranker-8b-license",
    "evidence:qwen-qwen3-reranker-8b-context",
    "evidence:qwen-qwen3-reranker-8b-config",
    "evidence:four-tables-release-qwen3-embedding-launch"
  ]
});
modelUseGuidance.push({
  "id": "model-use:qwen-qwen3-vl-8b-instruct:document-vision",
  "modelVersionId": "model:qwen-qwen3-vl-8b-instruct",
  "applicationId": "document-vision",
  "role": "vision",
  "summary": "خواندن تصویر و سند با Qwen3-VL",
  "description": "نسخهٔ Instruct هشت‌میلیاردی Qwen3-VL ورودی متن، تصویر و ویدئو را برای درک بصری و کار با سند ترکیب می‌کند.",
  "distinguishingFeature": "نسخهٔ Instruct هشت‌میلیاردی Qwen3-VL ورودی متن، تصویر و ویدئو را برای درک بصری و کار با سند ترکیب می‌کند.",
  "conditions": [
    "از processor و قالب پیام چندوجهی استفاده کنید؛ checkpointهای Thinking و Instruct رفتار یکسان ندارند."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:qwen-qwen3-vl-8b-instruct-card",
    "evidence:qwen-qwen3-vl-8b-instruct-metadata",
    "evidence:qwen-qwen3-vl-8b-instruct-parameters",
    "evidence:qwen-qwen3-vl-8b-instruct-license",
    "evidence:qwen-qwen3-vl-8b-instruct-context",
    "evidence:qwen-qwen3-vl-8b-instruct-config",
    "evidence:four-tables-release-qwen3-vl-4b-and-8b-release"
  ]
});
modelUseGuidance.push({
  "id": "model-use:qwen-qwen3-5-2b:document-vision",
  "modelVersionId": "model:qwen-qwen3-5-2b",
  "applicationId": "document-vision",
  "role": "vision",
  "summary": "نمونه‌سازی چندوجهی با Qwen3.5 کوچک",
  "description": "Qwen3.5-2B کوچک برای نمونه‌سازی و تنظیم دقیق وظیفه‌محور معرفی شده؛ ورودی بصری را همراه متن می‌پذیرد.",
  "distinguishingFeature": "Qwen3.5-2B کوچک برای نمونه‌سازی و تنظیم دقیق وظیفه‌محور معرفی شده؛ ورودی بصری را همراه متن می‌پذیرد.",
  "conditions": [
    "کیفیت نسخه‌های بزرگ‌تر خانواده به این مدل دوملیاردی تعمیم داده نمی‌شود."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:qwen-qwen3-5-2b-card",
    "evidence:qwen-qwen3-5-2b-metadata",
    "evidence:qwen-qwen3-5-2b-parameters",
    "evidence:qwen-qwen3-5-2b-license",
    "evidence:qwen-qwen3-5-2b-context",
    "evidence:qwen-qwen3-5-2b-config",
    "evidence:four-tables-release-qwen3-5-small-models-release"
  ]
});
modelUseGuidance.push({
  "id": "model-use:qwen-qwen3-5-35b-a3b:agents-tools",
  "modelVersionId": "model:qwen-qwen3-5-35b-a3b",
  "applicationId": "agents-tools",
  "role": "tool-use",
  "summary": "عامل چندوجهی با Qwen3.5 از نوع MoE",
  "description": "نسخهٔ 35B-A3B از پایهٔ یکپارچهٔ متن و تصویر و معماری ترکیبی بهره می‌برد و برای گردش‌کار چندمرحله‌ای قابل بررسی است.",
  "distinguishingFeature": "نسخهٔ 35B-A3B از پایهٔ یکپارچهٔ متن و تصویر و معماری ترکیبی بهره می‌برد و برای گردش‌کار چندمرحله‌ای قابل بررسی است.",
  "conditions": [
    "سرویس میزبانی‌شدهٔ Qwen3.5-Flash با ابزارها و زمینهٔ پیش‌فرض متفاوت عرضه می‌شود؛ مشخصات API را به وزن محلی تعمیم ندهید."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:qwen-qwen3-5-35b-a3b-card",
    "evidence:qwen-qwen3-5-35b-a3b-metadata",
    "evidence:qwen-qwen3-5-35b-a3b-parameters",
    "evidence:qwen-qwen3-5-35b-a3b-license",
    "evidence:qwen-qwen3-5-35b-a3b-context",
    "evidence:qwen-qwen3-5-35b-a3b-config",
    "evidence:four-tables-release-qwen3-5-medium-models-release"
  ]
});
modelUseGuidance.push({
  "id": "model-use:qwen-qwen3-5-4b:document-vision",
  "modelVersionId": "model:qwen-qwen3-5-4b",
  "applicationId": "document-vision",
  "role": "vision",
  "summary": "پردازش متن و تصویر در اندازهٔ چهار میلیارد",
  "description": "Qwen3.5-4B از نسل متن–تصویر یکپارچه است؛ برای آزمودن استخراج اطلاعات از سند در اندازه‌ای کوچک‌تر از 9B قابل بررسی است.",
  "distinguishingFeature": "Qwen3.5-4B از نسل متن–تصویر یکپارچه است؛ برای آزمودن استخراج اطلاعات از سند در اندازه‌ای کوچک‌تر از 9B قابل بررسی است.",
  "conditions": [
    "برای سند اسکن‌شده به مسیر چندوجهی نیاز دارید؛ سقف زمینهٔ متنی، تعداد تصاویر قابل پردازش را تعیین نمی‌کند."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:qwen-qwen3-5-4b-card",
    "evidence:qwen-qwen3-5-4b-metadata",
    "evidence:qwen-qwen3-5-4b-parameters",
    "evidence:qwen-qwen3-5-4b-license",
    "evidence:qwen-qwen3-5-4b-context",
    "evidence:qwen-qwen3-5-4b-config",
    "evidence:four-tables-release-qwen3-5-small-models-release"
  ]
});
modelUseGuidance.push({
  "id": "model-use:qwen-qwen3-5-9b:document-vision",
  "modelVersionId": "model:qwen-qwen3-5-9b",
  "applicationId": "document-vision",
  "role": "vision",
  "summary": "دستیار اسناد و تصویر با Qwen3.5 متراکم",
  "description": "نسخهٔ 9B از Qwen3.5 ترکیب متن و تصویر را در معماری متراکم این خانواده عرضه می‌کند.",
  "distinguishingFeature": "نسخهٔ 9B از Qwen3.5 ترکیب متن و تصویر را در معماری متراکم این خانواده عرضه می‌کند.",
  "conditions": [
    "مقایسه با 4B باید بر دادهٔ سند یکسان و تنظیم تصویر یکسان باشد؛ شمار پارامترهای بخش زبان و بینایی را جدا بخوانید."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:qwen-qwen3-5-9b-card",
    "evidence:qwen-qwen3-5-9b-metadata",
    "evidence:qwen-qwen3-5-9b-parameters",
    "evidence:qwen-qwen3-5-9b-license",
    "evidence:qwen-qwen3-5-9b-context",
    "evidence:qwen-qwen3-5-9b-config",
    "evidence:four-tables-release-qwen3-5-small-models-release"
  ]
});
modelUseGuidance.push({
  "id": "model-use:qwen-qwen3-8-27b:agents-tools",
  "modelVersionId": "model:qwen-qwen3-8-27b",
  "applicationId": "agents-tools",
  "role": "tool-use",
  "summary": "گردش‌کار طولانی با عامل متن–تصویر",
  "description": "Qwen3.8-27B مدل متراکم متن–تصویر با کنترل thinking است؛ تمرکز معرفی آن بر کدنویسی، پژوهش و کارهای چندمرحله‌ای است.",
  "distinguishingFeature": "Qwen3.8-27B مدل متراکم متن–تصویر با کنترل thinking است؛ تمرکز معرفی آن بر کدنویسی، پژوهش و کارهای چندمرحله‌ای است.",
  "conditions": [
    "قابلیت‌های وعده‌داده‌شدهٔ سرویس ابری، مانند ابزارهای داخلی و زمینهٔ پیش‌فرض، جزء تضمین وزن محلی نیستند."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:qwen-qwen3-8-27b-card",
    "evidence:qwen-qwen3-8-27b-metadata",
    "evidence:qwen-qwen3-8-27b-parameters",
    "evidence:qwen-qwen3-8-27b-license",
    "evidence:qwen-qwen3-8-27b-context",
    "evidence:qwen-qwen3-8-27b-config",
    "evidence:four-tables-release-qwen3-8-27b-release"
  ]
});
modelUseGuidance.push({
  "id": "model-use:allenai-olmo-3-7b-instruct:text-work",
  "modelVersionId": "model:allenai-olmo-3-7b-instruct",
  "applicationId": "text-work",
  "role": "text-generation",
  "summary": "پژوهش دستورپذیری با مسیر آموزش قابل بررسی",
  "description": "Olmo 3 7B Instruct با داده‌های Dolma 3 و Dolci عرضه شده و انتشار جزئیات آموزش، آن را برای پژوهش بازتولیدپذیر متمایز می‌کند.",
  "distinguishingFeature": "Olmo 3 7B Instruct با داده‌های Dolma 3 و Dolci عرضه شده و انتشار جزئیات آموزش، آن را برای پژوهش بازتولیدپذیر متمایز می‌کند.",
  "conditions": [
    "این checkpoint از نوع Instruct است؛ نتایج Olmo Think را به آن نسبت ندهید. Transformers نسخهٔ ۴٫۵۷ یا بالاتر لازم است."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:allenai-olmo-3-7b-instruct-card",
    "evidence:allenai-olmo-3-7b-instruct-metadata",
    "evidence:allenai-olmo-3-7b-instruct-parameters",
    "evidence:allenai-olmo-3-7b-instruct-license",
    "evidence:allenai-olmo-3-7b-instruct-config",
    "evidence:four-tables-release-olmo-3-7b-instruct-release"
  ]
});
modelUseGuidance.push({
  "id": "model-use:deepseek-ai-deepseek-r1-0528-qwen3-8b:reasoning-analysis",
  "modelVersionId": "model:deepseek-ai-deepseek-r1-0528-qwen3-8b",
  "applicationId": "reasoning-analysis",
  "role": "reasoning",
  "summary": "آزمایش استدلال تقطیرشده از R1-0528",
  "description": "این مدل از پس‌آموزش Qwen3-8B-Base با زنجیره‌های استدلال DeepSeek-R1-0528 به دست آمده؛ با Qwen3-8B معمولی متفاوت است.",
  "distinguishingFeature": "این مدل از پس‌آموزش Qwen3-8B-Base با زنجیره‌های استدلال DeepSeek-R1-0528 به دست آمده؛ با Qwen3-8B معمولی متفاوت است.",
  "conditions": [
    "بنچمارک‌های مدل کامل R1-0528 متعلق به این نسخهٔ هشت‌میلیاردی نیستند."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:deepseek-ai-deepseek-r1-0528-qwen3-8b-card",
    "evidence:deepseek-ai-deepseek-r1-0528-qwen3-8b-metadata",
    "evidence:deepseek-ai-deepseek-r1-0528-qwen3-8b-parameters",
    "evidence:deepseek-ai-deepseek-r1-0528-qwen3-8b-license",
    "evidence:deepseek-ai-deepseek-r1-0528-qwen3-8b-config",
    "evidence:four-tables-release-deepseek-r1-0528-qwen3-8b-release"
  ]
});
modelUseGuidance.push({
  "id": "model-use:deepseek-ai-deepseek-r1-distill-llama-70b:reasoning-analysis",
  "modelVersionId": "model:deepseek-ai-deepseek-r1-distill-llama-70b",
  "applicationId": "reasoning-analysis",
  "role": "reasoning",
  "summary": "استدلال تقطیرشده روی پایهٔ Llama 70B",
  "description": "این checkpoint مسیر تقطیر R1 را روی پایهٔ Llama اجرا می‌کند و بزرگ‌ترین نسخهٔ تقطیری این فهرست است.",
  "distinguishingFeature": "این checkpoint مسیر تقطیر R1 را روی پایهٔ Llama اجرا می‌کند و بزرگ‌ترین نسخهٔ تقطیری این فهرست است.",
  "conditions": [
    "مجوز پایهٔ Llama و شروط ناشر تقطیر هر دو مهم‌اند؛ حجم وزن و طول زنجیرهٔ فکر را جداگانه برآورد کنید."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:deepseek-ai-deepseek-r1-distill-llama-70b-card",
    "evidence:deepseek-ai-deepseek-r1-distill-llama-70b-metadata",
    "evidence:deepseek-ai-deepseek-r1-distill-llama-70b-parameters",
    "evidence:deepseek-ai-deepseek-r1-distill-llama-70b-license",
    "evidence:deepseek-ai-deepseek-r1-distill-llama-70b-config",
    "evidence:four-tables-release-deepseek-r1-distilled-release"
  ]
});
modelUseGuidance.push({
  "id": "model-use:deepseek-ai-deepseek-r1-distill-qwen-1-5b:reasoning-analysis",
  "modelVersionId": "model:deepseek-ai-deepseek-r1-distill-qwen-1-5b",
  "applicationId": "reasoning-analysis",
  "role": "reasoning",
  "summary": "آزمایش مرز استدلال در مدل تقطیری بسیار کوچک",
  "description": "نسخهٔ ۱٫۵میلیاردی از تقطیر R1 روی Qwen2.5-Math ساخته شده و برای بررسی انتقال رفتار استدلال به مدل کوچک جالب است.",
  "distinguishingFeature": "نسخهٔ ۱٫۵میلیاردی از تقطیر R1 روی Qwen2.5-Math ساخته شده و برای بررسی انتقال رفتار استدلال به مدل کوچک جالب است.",
  "conditions": [
    "پاسخ‌های طولانی ممکن است وارد تکرار شوند."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:deepseek-ai-deepseek-r1-distill-qwen-1-5b-card",
    "evidence:deepseek-ai-deepseek-r1-distill-qwen-1-5b-metadata",
    "evidence:deepseek-ai-deepseek-r1-distill-qwen-1-5b-parameters",
    "evidence:deepseek-ai-deepseek-r1-distill-qwen-1-5b-license",
    "evidence:deepseek-ai-deepseek-r1-distill-qwen-1-5b-config",
    "evidence:four-tables-release-deepseek-r1-distilled-release"
  ]
});
modelUseGuidance.push({
  "id": "model-use:deepseek-ai-deepseek-r1-distill-qwen-14b:reasoning-analysis",
  "modelVersionId": "model:deepseek-ai-deepseek-r1-distill-qwen-14b",
  "applicationId": "reasoning-analysis",
  "role": "reasoning",
  "summary": "حل مسئله با تقطیر R1 در اندازهٔ میانی",
  "description": "DeepSeek-R1-Distill-Qwen-14B از Qwen2.5-14B و دادهٔ تولیدی R1 استفاده می‌کند؛ وزن آن متعلق به مدل کامل R1 نیست.",
  "distinguishingFeature": "DeepSeek-R1-Distill-Qwen-14B از Qwen2.5-14B و دادهٔ تولیدی R1 استفاده می‌کند؛ وزن آن متعلق به مدل کامل R1 نیست.",
  "conditions": [
    "اعداد گزارش‌شده فقط برای همین نسخه و تنظیمات آزمون معتبرند؛ از مقایسهٔ نامتجانس با پاسخ مستقیم پرهیز کنید."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:deepseek-ai-deepseek-r1-distill-qwen-14b-card",
    "evidence:deepseek-ai-deepseek-r1-distill-qwen-14b-metadata",
    "evidence:deepseek-ai-deepseek-r1-distill-qwen-14b-parameters",
    "evidence:deepseek-ai-deepseek-r1-distill-qwen-14b-license",
    "evidence:deepseek-ai-deepseek-r1-distill-qwen-14b-config",
    "evidence:four-tables-release-deepseek-r1-distilled-release"
  ]
});
modelUseGuidance.push({
  "id": "model-use:deepseek-ai-deepseek-r1-distill-qwen-32b:reasoning-analysis",
  "modelVersionId": "model:deepseek-ai-deepseek-r1-distill-qwen-32b",
  "applicationId": "reasoning-analysis",
  "role": "reasoning",
  "summary": "تحلیل و کدنویسی با تقطیر متراکم ۳۲میلیاردی",
  "description": "نسخهٔ Qwen-32B مسیر تقطیر R1 را روی پایهٔ Qwen2.5 دنبال می‌کند.",
  "distinguishingFeature": "نسخهٔ Qwen-32B مسیر تقطیر R1 را روی پایهٔ Qwen2.5 دنبال می‌کند.",
  "conditions": [
    "توان استدلال اعلام‌شده، ابزارخوانی یا اجرای کد خودکار نیست؛ ابزار و اعتبارسنجی جواب باید در برنامه فراهم شود."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:deepseek-ai-deepseek-r1-distill-qwen-32b-card",
    "evidence:deepseek-ai-deepseek-r1-distill-qwen-32b-metadata",
    "evidence:deepseek-ai-deepseek-r1-distill-qwen-32b-parameters",
    "evidence:deepseek-ai-deepseek-r1-distill-qwen-32b-license",
    "evidence:deepseek-ai-deepseek-r1-distill-qwen-32b-config",
    "evidence:four-tables-release-deepseek-r1-distilled-release"
  ]
});
modelUseGuidance.push({
  "id": "model-use:deepseek-ai-deepseek-r1-distill-qwen-7b:reasoning-analysis",
  "modelVersionId": "model:deepseek-ai-deepseek-r1-distill-qwen-7b",
  "applicationId": "reasoning-analysis",
  "role": "reasoning",
  "summary": "حل مسئله با نسخهٔ هفت‌میلیاردی تقطیر R1",
  "description": "این مدل از Qwen2.5-Math-7B به‌عنوان پایه استفاده می‌کند؛ با تقطیر جدیدتر R1-0528 روی Qwen3 یکی نیست.",
  "distinguishingFeature": "این مدل از Qwen2.5-Math-7B به‌عنوان پایه استفاده می‌کند؛ با تقطیر جدیدتر R1-0528 روی Qwen3 یکی نیست.",
  "conditions": [
    "قالب و tokenizer همین مخزن را نگه دارید؛ مقایسه با نسخهٔ هشت‌میلیاردی نیازمند آزمون مشترک است."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:deepseek-ai-deepseek-r1-distill-qwen-7b-card",
    "evidence:deepseek-ai-deepseek-r1-distill-qwen-7b-metadata",
    "evidence:deepseek-ai-deepseek-r1-distill-qwen-7b-parameters",
    "evidence:deepseek-ai-deepseek-r1-distill-qwen-7b-license",
    "evidence:deepseek-ai-deepseek-r1-distill-qwen-7b-config",
    "evidence:four-tables-release-deepseek-r1-distilled-release"
  ]
});
modelUseGuidance.push({
  "id": "model-use:deepseek-ai-deepseek-v3-2:agents-tools",
  "modelVersionId": "model:deepseek-ai-deepseek-v3-2",
  "applicationId": "agents-tools",
  "role": "tool-use",
  "summary": "پیوند استدلال و ابزار در گردش‌کار عامل",
  "description": "DeepSeek-V3.2 توجه تنک DSA و پس‌آموزش عامل‌محور را ترکیب می‌کند؛ قالب چت آن نسبت به نسخه‌های پیشین تغییر کرده است.",
  "distinguishingFeature": "DeepSeek-V3.2 توجه تنک DSA و پس‌آموزش عامل‌محور را ترکیب می‌کند؛ قالب چت آن نسبت به نسخه‌های پیشین تغییر کرده است.",
  "conditions": [
    "از قالب و مسیر اجرای مخصوص V3.2 استفاده کنید؛ نتایج نسخهٔ Speciale در پروندهٔ این مدل قابل انتقال نیستند."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:deepseek-ai-deepseek-v3-2-card",
    "evidence:deepseek-ai-deepseek-v3-2-metadata",
    "evidence:deepseek-ai-deepseek-v3-2-parameters",
    "evidence:deepseek-ai-deepseek-v3-2-license",
    "evidence:deepseek-ai-deepseek-v3-2-config",
    "evidence:four-tables-release-deepseek-v3-2-release"
  ]
});
modelUseGuidance.push({
  "id": "model-use:deepseek-ai-deepseek-v4-1-flash:agents-tools",
  "modelVersionId": "model:deepseek-ai-deepseek-v4-1-flash",
  "applicationId": "agents-tools",
  "role": "tool-use",
  "summary": "عامل چندوجهی برای ورودی‌های بسیار بلند",
  "description": "DeepSeek-V4.1-Flash متن و تصویر را در معماری CED پردازش می‌کند؛ شمار پارامتر فعال در prefill و decode متفاوت است.",
  "distinguishingFeature": "DeepSeek-V4.1-Flash متن و تصویر را در معماری CED پردازش می‌کند؛ شمار پارامتر فعال در prefill و decode متفاوت است.",
  "conditions": [
    "پارامتر فعال را یک عدد ثابت فرض نکنید؛ فشرده‌سازی KV و مسیر اجرای ویژه، بخشی از معماری این نسخه‌اند."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:deepseek-ai-deepseek-v4-1-flash-card",
    "evidence:deepseek-ai-deepseek-v4-1-flash-metadata",
    "evidence:deepseek-ai-deepseek-v4-1-flash-parameters",
    "evidence:deepseek-ai-deepseek-v4-1-flash-license",
    "evidence:deepseek-ai-deepseek-v4-1-flash-config",
    "evidence:four-tables-release-deepseek-v4-1-flash-release",
    "evidence:four-tables-deepseek-ai-deepseek-v4-1-flash-declared-context"
  ]
});
modelUseGuidance.push({
  "id": "model-use:google-gemma-3-12b-it:document-vision",
  "modelVersionId": "model:google-gemma-3-12b-it",
  "applicationId": "document-vision",
  "role": "vision",
  "summary": "پرسش از تصویر و متن با Gemma 3 میانی",
  "description": "Gemma 3 12B IT نسخهٔ دستورپذیر چندوجهی با زمینهٔ ۱۳۱٬۰۷۲ توکن است؛ ورودی تصویر را به پاسخ متنی پیوند می‌دهد.",
  "distinguishingFeature": "Gemma 3 12B IT نسخهٔ دستورپذیر چندوجهی با زمینهٔ ۱۳۱٬۰۷۲ توکن است؛ ورودی تصویر را به پاسخ متنی پیوند می‌دهد.",
  "conditions": [
    "Processor بینایی و قالب Gemma 3 لازم است؛ حداکثر زمینه به معنی کیفیت ثابت فهم سند بلند نیست."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:google-gemma-3-12b-it-card",
    "evidence:google-gemma-3-12b-it-metadata",
    "evidence:google-gemma-3-12b-it-parameters",
    "evidence:google-gemma-3-12b-it-license",
    "evidence:google-gemma-3-12b-it-context",
    "evidence:four-tables-release-gemma-3-release-log"
  ]
});
modelUseGuidance.push({
  "id": "model-use:google-gemma-3-1b-it:text-work",
  "modelVersionId": "model:google-gemma-3-1b-it",
  "applicationId": "text-work",
  "role": "text-generation",
  "summary": "دستیار متنی کوچک از خانوادهٔ Gemma 3",
  "description": "Gemma 3 1B IT برخلاف نسخه‌های بزرگ‌تر این نسل فقط متن می‌گیرد و زمینهٔ ۳۲٬۷۶۸ توکن دارد.",
  "distinguishingFeature": "Gemma 3 1B IT برخلاف نسخه‌های بزرگ‌تر این نسل فقط متن می‌گیرد و زمینهٔ ۳۲٬۷۶۸ توکن دارد.",
  "conditions": [
    "برای تصویر اسکن‌شده ابتدا OCR بیرونی لازم است؛ ویژگی چندوجهی 4B و بالاتر را به این نسخه تعمیم ندهید."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:google-gemma-3-1b-it-card",
    "evidence:google-gemma-3-1b-it-metadata",
    "evidence:google-gemma-3-1b-it-parameters",
    "evidence:google-gemma-3-1b-it-license",
    "evidence:google-gemma-3-1b-it-context",
    "evidence:four-tables-release-gemma-3-release-log"
  ]
});
modelUseGuidance.push({
  "id": "model-use:google-gemma-3-27b-it:document-vision",
  "modelVersionId": "model:google-gemma-3-27b-it",
  "applicationId": "document-vision",
  "role": "vision",
  "summary": "درک متن و تصویر با بزرگ‌ترین Gemma 3 فهرست",
  "description": "Gemma 3 27B IT نسخهٔ متراکم بزرگ این نسل با ورودی بصری و پوشش چندزبانه است.",
  "distinguishingFeature": "Gemma 3 27B IT نسخهٔ متراکم بزرگ این نسل با ورودی بصری و پوشش چندزبانه است.",
  "conditions": [
    "دریافت وزن‌ها نیازمند پذیرش مجوز Gemma است."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:google-gemma-3-27b-it-card",
    "evidence:google-gemma-3-27b-it-metadata",
    "evidence:google-gemma-3-27b-it-parameters",
    "evidence:google-gemma-3-27b-it-license",
    "evidence:google-gemma-3-27b-it-context",
    "evidence:four-tables-release-gemma-3-release-log"
  ]
});
modelUseGuidance.push({
  "id": "model-use:google-gemma-3-4b-it:document-vision",
  "modelVersionId": "model:google-gemma-3-4b-it",
  "applicationId": "document-vision",
  "role": "vision",
  "summary": "ورود به پردازش تصویر در خانوادهٔ Gemma 3",
  "description": "Gemma 3 4B IT کوچک‌ترین مدل چندوجهی این نسل در فهرست است؛ برخلاف 1B می‌تواند تصویر را همراه متن بخواند.",
  "distinguishingFeature": "Gemma 3 4B IT کوچک‌ترین مدل چندوجهی این نسل در فهرست است؛ برخلاف 1B می‌تواند تصویر را همراه متن بخواند.",
  "conditions": [
    "وزن و processor نسخهٔ 4B را با هم دریافت کنید؛ متن خروجی را برای استخراج دقیق اعداد سند اعتبارسنجی کنید."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:google-gemma-3-4b-it-card",
    "evidence:google-gemma-3-4b-it-metadata",
    "evidence:google-gemma-3-4b-it-parameters",
    "evidence:google-gemma-3-4b-it-license",
    "evidence:google-gemma-3-4b-it-context",
    "evidence:four-tables-release-gemma-3-release-log"
  ]
});
modelUseGuidance.push({
  "id": "model-use:google-gemma-4-26b-a4b-it:reasoning-analysis",
  "modelVersionId": "model:google-gemma-4-26b-a4b-it",
  "applicationId": "reasoning-analysis",
  "role": "reasoning",
  "summary": "استدلال چندوجهی با Gemma 4 از نوع MoE",
  "description": "Gemma 4 26B-A4B مدل خبرگانی با کنترل thinking و زمینهٔ ۲۶۲٬۱۴۴ توکن است؛ با نسخهٔ کوچک E2B معماری یکسانی ندارد.",
  "distinguishingFeature": "Gemma 4 26B-A4B مدل خبرگانی با کنترل thinking و زمینهٔ ۲۶۲٬۱۴۴ توکن است؛ با نسخهٔ کوچک E2B معماری یکسانی ندارد.",
  "conditions": [
    "این نسخه ورودی صوت ندارد؛ شمار پارامتر فعال با کل وزن‌های مدل متفاوت است."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:google-gemma-4-26b-a4b-it-card",
    "evidence:google-gemma-4-26b-a4b-it-metadata",
    "evidence:google-gemma-4-26b-a4b-it-parameters",
    "evidence:google-gemma-4-26b-a4b-it-license",
    "evidence:google-gemma-4-26b-a4b-it-context",
    "evidence:google-gemma-4-26b-a4b-it-config",
    "evidence:four-tables-release-gemma-4-release-log"
  ]
});
modelUseGuidance.push({
  "id": "model-use:google-gemma-4-e2b-it:document-vision",
  "modelVersionId": "model:google-gemma-4-e2b-it",
  "applicationId": "document-vision",
  "role": "vision",
  "summary": "پردازش محلی متن، تصویر و صوت با Gemma 4 کوچک",
  "description": "Gemma 4 E2B برای اجرای روی دستگاه معرفی شده و ورودی صوت را نیز پشتیبانی می‌کند؛ E2B شمار مؤثر است، نه کل وزن‌ها.",
  "distinguishingFeature": "Gemma 4 E2B برای اجرای روی دستگاه معرفی شده و ورودی صوت را نیز پشتیبانی می‌کند؛ E2B شمار مؤثر است، نه کل وزن‌ها.",
  "conditions": [
    "در محاسبهٔ حافظه از شمار کل و فایل واقعی استفاده کنید؛ مسیر صوت و تصویر به processor متناظر نیاز دارد."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:google-gemma-4-e2b-it-card",
    "evidence:google-gemma-4-e2b-it-metadata",
    "evidence:google-gemma-4-e2b-it-parameters",
    "evidence:google-gemma-4-e2b-it-license",
    "evidence:google-gemma-4-e2b-it-context",
    "evidence:google-gemma-4-e2b-it-config",
    "evidence:four-tables-release-gemma-4-release-log"
  ]
});
modelUseGuidance.push({
  "id": "model-use:ibm-granite-granite-3-3-2b-instruct:enterprise-rag",
  "modelVersionId": "model:ibm-granite-granite-3-3-2b-instruct",
  "applicationId": "enterprise-rag",
  "role": "grounded-generation",
  "summary": "تولید پاسخ از اسناد بازیابی‌شده",
  "description": "Granite 3.3 2B Instruct مدل کوچک کسب‌وکارمحور با RAG، خلاصه‌سازی، استخراج متن و حالت تفکر است.",
  "distinguishingFeature": "Granite 3.3 2B Instruct مدل کوچک کسب‌وکارمحور با RAG، خلاصه‌سازی، استخراج متن و حالت تفکر است.",
  "conditions": [
    "سند باید توسط سامانه بازیابی و در پیام درج شود؛ خود مدل جای موتور جست‌وجو نیست و فارسی جزو ۱۲ زبان اعلام‌شده نیست."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:ibm-granite-granite-3-3-2b-instruct-card",
    "evidence:ibm-granite-granite-3-3-2b-instruct-metadata",
    "evidence:ibm-granite-granite-3-3-2b-instruct-parameters",
    "evidence:ibm-granite-granite-3-3-2b-instruct-license",
    "evidence:ibm-granite-granite-3-3-2b-instruct-context",
    "evidence:ibm-granite-granite-3-3-2b-instruct-config",
    "evidence:four-tables-release-ibm-granite-3-3-release"
  ]
});
modelUseGuidance.push({
  "id": "model-use:intfloat-multilingual-e5-small:enterprise-rag",
  "modelVersionId": "model:intfloat-multilingual-e5-small",
  "applicationId": "enterprise-rag",
  "role": "retrieval",
  "summary": "بازیابی چندزبانه با بردار کم‌بُعد",
  "description": "Multilingual E5 Small متن را به بردار ۳۸۴بُعدی تبدیل می‌کند و سقف ورودی آن ۵۱۲ توکن است؛ برای تکه‌های کوتاه سند قابل بررسی است.",
  "distinguishingFeature": "Multilingual E5 Small متن را به بردار ۳۸۴بُعدی تبدیل می‌کند و سقف ورودی آن ۵۱۲ توکن است؛ برای تکه‌های کوتاه سند قابل بررسی است.",
  "conditions": [
    "پیشوندهای query: و passage: حتی برای زبان‌های غیرانگلیسی لازم‌اند؛ متن بلند را پیش از نمایه‌سازی قطعه‌بندی کنید."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:intfloat-multilingual-e5-small-card",
    "evidence:intfloat-multilingual-e5-small-metadata",
    "evidence:intfloat-multilingual-e5-small-parameters",
    "evidence:intfloat-multilingual-e5-small-license",
    "evidence:intfloat-multilingual-e5-small-context",
    "evidence:intfloat-multilingual-e5-small-config",
    "evidence:four-tables-release-multilingual-e5-release-year"
  ]
});
modelUseGuidance.push({
  "id": "model-use:meta-llama-llama-3-1-70b-instruct:text-work",
  "modelVersionId": "model:meta-llama-llama-3-1-70b-instruct",
  "applicationId": "text-work",
  "role": "text-generation",
  "summary": "دستیار عمومی با Llama 3.1 بزرگ",
  "description": "Llama 3.1 70B Instruct برای گفت‌وگوی چندزبانه و کار با متن با زمینهٔ ۱۳۱٬۰۷۲ توکن عرضه شده است.",
  "distinguishingFeature": "Llama 3.1 70B Instruct برای گفت‌وگوی چندزبانه و کار با متن با زمینهٔ ۱۳۱٬۰۷۲ توکن عرضه شده است.",
  "conditions": [
    "ورودی این نسخه متن است و استفاده از وزن‌ها تابع مجوز Llama است."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:meta-llama-llama-3-1-70b-instruct-card",
    "evidence:meta-llama-llama-3-1-70b-instruct-metadata",
    "evidence:meta-llama-llama-3-1-70b-instruct-parameters",
    "evidence:meta-llama-llama-3-1-70b-instruct-license",
    "evidence:meta-llama-llama-3-1-70b-instruct-context",
    "evidence:four-tables-release-llama-3-1-release"
  ]
});
modelUseGuidance.push({
  "id": "model-use:meta-llama-llama-3-1-8b-instruct:text-work",
  "modelVersionId": "model:meta-llama-llama-3-1-8b-instruct",
  "applicationId": "text-work",
  "role": "text-generation",
  "summary": "گفت‌وگو و کار با متن با Llama 3.1 هشت‌میلیاردی",
  "description": "نسخهٔ 8B از Llama 3.1 برای دستیار عمومی و پیروی از دستور تنظیم شده و با مدل پایهٔ همان اندازه فرق دارد.",
  "distinguishingFeature": "نسخهٔ 8B از Llama 3.1 برای دستیار عمومی و پیروی از دستور تنظیم شده و با مدل پایهٔ همان اندازه فرق دارد.",
  "conditions": [
    "قالب پیام و tokenizer نسخهٔ Instruct را حفظ کنید؛ زمینهٔ بلند، کیفیت جواب از سند را تضمین نمی‌کند."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:meta-llama-llama-3-1-8b-instruct-card",
    "evidence:meta-llama-llama-3-1-8b-instruct-metadata",
    "evidence:meta-llama-llama-3-1-8b-instruct-parameters",
    "evidence:meta-llama-llama-3-1-8b-instruct-license",
    "evidence:meta-llama-llama-3-1-8b-instruct-context",
    "evidence:four-tables-release-llama-3-1-release"
  ]
});
modelUseGuidance.push({
  "id": "model-use:meta-llama-llama-3-2-1b-instruct:text-work",
  "modelVersionId": "model:meta-llama-llama-3-2-1b-instruct",
  "applicationId": "text-work",
  "role": "text-generation",
  "summary": "بازنویسی و خلاصه‌سازی محلی با Llama کوچک",
  "description": "Llama 3.2 1B Instruct مدل متنی کوچک این نسل است؛ برای کارهای محدود روی متن در دستگاه‌های محلی معرفی شده است.",
  "distinguishingFeature": "Llama 3.2 1B Instruct مدل متنی کوچک این نسل است؛ برای کارهای محدود روی متن در دستگاه‌های محلی معرفی شده است.",
  "conditions": [
    "تصویر را مستقیماً نمی‌گیرد؛ مدل‌های Vision خانوادهٔ Llama 3.2 محصول جداگانه‌اند."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:meta-llama-llama-3-2-1b-instruct-card",
    "evidence:meta-llama-llama-3-2-1b-instruct-metadata",
    "evidence:meta-llama-llama-3-2-1b-instruct-parameters",
    "evidence:meta-llama-llama-3-2-1b-instruct-license",
    "evidence:meta-llama-llama-3-2-1b-instruct-context",
    "evidence:four-tables-release-llama-3-2-release"
  ]
});
modelUseGuidance.push({
  "id": "model-use:meta-llama-llama-3-2-3b-instruct:text-work",
  "modelVersionId": "model:meta-llama-llama-3-2-3b-instruct",
  "applicationId": "text-work",
  "role": "text-generation",
  "summary": "دستیار متنی روی دستگاه با Llama سه‌میلیاردی",
  "description": "Llama 3.2 3B Instruct برای گفت‌وگو، بازنویسی و خلاصه‌سازی تنظیم شده و از نسخهٔ 1B ظرفیت پارامتری بیشتری دارد.",
  "distinguishingFeature": "Llama 3.2 3B Instruct برای گفت‌وگو، بازنویسی و خلاصه‌سازی تنظیم شده و از نسخهٔ 1B ظرفیت پارامتری بیشتری دارد.",
  "conditions": [
    "تفاوت کیفیت و زمان را روی کار خود بسنجید؛ هیچ‌یک از دو مدل متنی 1B و 3B ورودی تصویر ندارند."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:meta-llama-llama-3-2-3b-instruct-card",
    "evidence:meta-llama-llama-3-2-3b-instruct-metadata",
    "evidence:meta-llama-llama-3-2-3b-instruct-parameters",
    "evidence:meta-llama-llama-3-2-3b-instruct-license",
    "evidence:meta-llama-llama-3-2-3b-instruct-context",
    "evidence:four-tables-release-llama-3-2-release"
  ]
});
modelUseGuidance.push({
  "id": "model-use:microsoft-phi-4-mini-instruct:reasoning-analysis",
  "modelVersionId": "model:microsoft-phi-4-mini-instruct",
  "applicationId": "reasoning-analysis",
  "role": "reasoning",
  "summary": "تحلیل و منطق در محیط محدودتر",
  "description": "Phi-4-mini-instruct با تمرکز بر داده‌های استدلالی و پیروی از دستور ساخته شده و زمینهٔ ۱۳۱٬۰۷۲ توکن دارد.",
  "distinguishingFeature": "Phi-4-mini-instruct با تمرکز بر داده‌های استدلالی و پیروی از دستور ساخته شده و زمینهٔ ۱۳۱٬۰۷۲ توکن دارد.",
  "conditions": [
    "این نسخه با mini-reasoning و multimodal-instruct متفاوت است؛ نمونه‌های ریاضی یا منطق را با نام دقیق همین نسخه مقایسه کنید."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:microsoft-phi-4-mini-instruct-card",
    "evidence:microsoft-phi-4-mini-instruct-metadata",
    "evidence:microsoft-phi-4-mini-instruct-parameters",
    "evidence:microsoft-phi-4-mini-instruct-license",
    "evidence:microsoft-phi-4-mini-instruct-context",
    "evidence:microsoft-phi-4-mini-instruct-config",
    "evidence:four-tables-release-phi-4-mini-instruct-release"
  ]
});
modelUseGuidance.push({
  "id": "model-use:mistralai-devstral-small-2-24b-instruct-2512:coding-assistant",
  "modelVersionId": "model:mistralai-devstral-small-2-24b-instruct-2512",
  "applicationId": "coding-assistant",
  "role": "coding",
  "summary": "عامل ویرایش چندفایلی و جست‌وجوی مخزن",
  "description": "Devstral Small 2 برای مهندسی نرم‌افزار و استفاده از ابزار برای بررسی و اصلاح کد ساخته شده؛ این نسل ورودی تصویر نیز دارد.",
  "distinguishingFeature": "Devstral Small 2 برای مهندسی نرم‌افزار و استفاده از ابزار برای بررسی و اصلاح کد ساخته شده؛ این نسل ورودی تصویر نیز دارد.",
  "conditions": [
    "وزن Instruct این مخزن FP8 است؛ قالب Mistral و وابستگی‌های اجرای همین نسخه را رعایت کنید، نه تنظیمات عمومی یک مدل چت."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:mistralai-devstral-small-2-24b-instruct-2512-card",
    "evidence:mistralai-devstral-small-2-24b-instruct-2512-metadata",
    "evidence:mistralai-devstral-small-2-24b-instruct-2512-parameters",
    "evidence:mistralai-devstral-small-2-24b-instruct-2512-license",
    "evidence:mistralai-devstral-small-2-24b-instruct-2512-context",
    "evidence:mistralai-devstral-small-2-24b-instruct-2512-config",
    "evidence:four-tables-release-devstral-small-2-release"
  ]
});
modelUseGuidance.push({
  "id": "model-use:mistralai-ministral-3-3b-instruct-2512:document-vision",
  "modelVersionId": "model:mistralai-ministral-3-3b-instruct-2512",
  "applicationId": "document-vision",
  "role": "vision",
  "summary": "دستیار چندوجهی برای استقرار لبه",
  "description": "Ministral 3 3B Instruct مدل کوچک متن–تصویر این خانواده است؛ بخش زبان ۳٫۴ و رمزگذار تصویر ۰٫۴میلیارد پارامتر دارند.",
  "distinguishingFeature": "Ministral 3 3B Instruct مدل کوچک متن–تصویر این خانواده است؛ بخش زبان ۳٫۴ و رمزگذار تصویر ۰٫۴میلیارد پارامتر دارند.",
  "conditions": [
    "وزن رسمی FP8 است؛ عدد 3B در نام مدل، همهٔ پارامترهای بخش زبان و بینایی را نمی‌شمارد."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:mistralai-ministral-3-3b-instruct-2512-card",
    "evidence:mistralai-ministral-3-3b-instruct-2512-metadata",
    "evidence:mistralai-ministral-3-3b-instruct-2512-parameters",
    "evidence:mistralai-ministral-3-3b-instruct-2512-license",
    "evidence:mistralai-ministral-3-3b-instruct-2512-context",
    "evidence:mistralai-ministral-3-3b-instruct-2512-config",
    "evidence:four-tables-release-ministral-3-release"
  ]
});
modelUseGuidance.push({
  "id": "model-use:mistralai-mistral-7b-instruct-v0-3:agents-tools",
  "modelVersionId": "model:mistralai-mistral-7b-instruct-v0-3",
  "applicationId": "agents-tools",
  "role": "tool-use",
  "summary": "دستیار متنی با قالب فراخوانی تابع Mistral",
  "description": "Mistral 7B Instruct v0.3 tokenizer نسخهٔ سوم و قابلیت فراخوانی تابع را به این مدل متنی اضافه کرده است.",
  "distinguishingFeature": "Mistral 7B Instruct v0.3 tokenizer نسخهٔ سوم و قابلیت فراخوانی تابع را به این مدل متنی اضافه کرده است.",
  "conditions": [
    "قالب ابزار و tokenizer v3 باید همراه checkpoint باشند؛ ورودی تصویر در این نسخه وجود ندارد."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:mistralai-mistral-7b-instruct-v0-3-card",
    "evidence:mistralai-mistral-7b-instruct-v0-3-metadata",
    "evidence:mistralai-mistral-7b-instruct-v0-3-parameters",
    "evidence:mistralai-mistral-7b-instruct-v0-3-license",
    "evidence:mistralai-mistral-7b-instruct-v0-3-config",
    "evidence:four-tables-release-mistral-7b-v0-3-release",
    "evidence:four-tables-mistralai-mistral-7b-instruct-v0-3-declared-context"
  ]
});
modelUseGuidance.push({
  "id": "model-use:mistralai-mistral-small-3-1-24b-instruct-2503:document-vision",
  "modelVersionId": "model:mistralai-mistral-small-3-1-24b-instruct-2503",
  "applicationId": "document-vision",
  "role": "vision",
  "summary": "دستیار چندزبانهٔ متن و تصویر",
  "description": "Mistral Small 3.1 24B Instruct پردازش تصویر و زمینهٔ بلند را به نسل Small افزوده؛ فارسی در فهرست زبان‌های ناشر آمده است.",
  "distinguishingFeature": "Mistral Small 3.1 24B Instruct پردازش تصویر و زمینهٔ بلند را به نسل Small افزوده؛ فارسی در فهرست زبان‌های ناشر آمده است.",
  "conditions": [
    "برای ابزار و خروجی JSON، قالب و parser متناظر لازم است؛ اعداد مدل Base را با Instruct ترکیب نکنید."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:mistralai-mistral-small-3-1-24b-instruct-2503-card",
    "evidence:mistralai-mistral-small-3-1-24b-instruct-2503-metadata",
    "evidence:mistralai-mistral-small-3-1-24b-instruct-2503-parameters",
    "evidence:mistralai-mistral-small-3-1-24b-instruct-2503-license",
    "evidence:mistralai-mistral-small-3-1-24b-instruct-2503-context",
    "evidence:mistralai-mistral-small-3-1-24b-instruct-2503-config",
    "evidence:four-tables-release-mistral-small-3-1-release"
  ]
});
modelUseGuidance.push({
  "id": "model-use:nvidia-nvidia-nemotron-nano-9b-v2:enterprise-rag",
  "modelVersionId": "model:nvidia-nvidia-nemotron-nano-9b-v2",
  "applicationId": "enterprise-rag",
  "role": "grounded-generation",
  "summary": "پاسخ از سند با کنترل بودجهٔ استدلال",
  "description": "Nemotron Nano 9B v2 ترکیبی از Mamba-2 و attention است؛ حالت reasoning و بودجهٔ فکرکردن را می‌توان کنترل کرد.",
  "distinguishingFeature": "Nemotron Nano 9B v2 ترکیبی از Mamba-2 و attention است؛ حالت reasoning و بودجهٔ فکرکردن را می‌توان کنترل کرد.",
  "conditions": [
    "سندهای بازیابی‌شده باید از بیرون وارد شوند؛ شش زبان اعلام‌شده شامل فارسی نیستند و backend باید معماری ترکیبی را پشتیبانی کند."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:nvidia-nvidia-nemotron-nano-9b-v2-card",
    "evidence:nvidia-nvidia-nemotron-nano-9b-v2-metadata",
    "evidence:nvidia-nvidia-nemotron-nano-9b-v2-parameters",
    "evidence:nvidia-nvidia-nemotron-nano-9b-v2-license",
    "evidence:nvidia-nvidia-nemotron-nano-9b-v2-context",
    "evidence:nvidia-nvidia-nemotron-nano-9b-v2-config",
    "evidence:four-tables-release-nvidia-nemotron-nano-9b-v2-release"
  ]
});
modelUseGuidance.push({
  "id": "model-use:openai-gpt-oss-120b:agents-tools",
  "modelVersionId": "model:openai-gpt-oss-120b",
  "applicationId": "agents-tools",
  "role": "tool-use",
  "summary": "عامل با استدلال قابل تنظیم در نسخهٔ بزرگ gpt-oss",
  "description": "gpt-oss-120b مدل MoE با ۱۱۷میلیارد پارامتر کل و ۵٫۱میلیارد فعال است؛ وزن‌های خبرگان با MXFP4 عرضه شده‌اند.",
  "distinguishingFeature": "gpt-oss-120b مدل MoE با ۱۱۷میلیارد پارامتر کل و ۵٫۱میلیارد فعال است؛ وزن‌های خبرگان با MXFP4 عرضه شده‌اند.",
  "conditions": [
    "قالب harmony برای اجرای درست لازم است؛ ابزار مرورگر یا Python را برنامهٔ میزبان فراهم می‌کند و حافظهٔ ادعایی ناشر آزمون این سایت نیست."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:openai-gpt-oss-120b-card",
    "evidence:openai-gpt-oss-120b-metadata",
    "evidence:openai-gpt-oss-120b-parameters",
    "evidence:openai-gpt-oss-120b-license",
    "evidence:openai-gpt-oss-120b-config",
    "evidence:four-tables-release-gpt-oss-release",
    "evidence:four-tables-openai-gpt-oss-120b-declared-context"
  ]
});
modelUseGuidance.push({
  "id": "model-use:openai-gpt-oss-20b:reasoning-analysis",
  "modelVersionId": "model:openai-gpt-oss-20b",
  "applicationId": "reasoning-analysis",
  "role": "reasoning",
  "summary": "استدلال محلی با نسخهٔ کوچک‌تر gpt-oss",
  "description": "gpt-oss-20b با ۲۱میلیارد پارامتر کل و ۳٫۶میلیارد فعال برای کاربرد محلی یا تخصصی معرفی شده؛ سه سطح reasoning دارد.",
  "distinguishingFeature": "gpt-oss-20b با ۲۱میلیارد پارامتر کل و ۳٫۶میلیارد فعال برای کاربرد محلی یا تخصصی معرفی شده؛ سه سطح reasoning دارد.",
  "conditions": [
    "قالب harmony و backend سازگار با MXFP4 لازم‌اند؛ نام 20B را جای شمار واقعی وزن‌ها در محاسبات نگذارید."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:openai-gpt-oss-20b-card",
    "evidence:openai-gpt-oss-20b-metadata",
    "evidence:openai-gpt-oss-20b-parameters",
    "evidence:openai-gpt-oss-20b-license",
    "evidence:openai-gpt-oss-20b-config",
    "evidence:four-tables-release-gpt-oss-release",
    "evidence:four-tables-openai-gpt-oss-20b-declared-context"
  ]
});
modelUseGuidance.push({
  "id": "model-use:zai-org-glm-4-7-flash:agents-tools",
  "modelVersionId": "model:zai-org-glm-4-7-flash",
  "applicationId": "agents-tools",
  "role": "tool-use",
  "summary": "عامل برنامه‌نویسی با استدلال حفظ‌شونده",
  "description": "GLM-4.7-Flash مدل MoE از ردهٔ 30B-A3B است؛ کارت مدل برای کارهای عامل چندمرحله‌ای به حفظ thinking بین نوبت‌ها اشاره می‌کند.",
  "distinguishingFeature": "GLM-4.7-Flash مدل MoE از ردهٔ 30B-A3B است؛ کارت مدل برای کارهای عامل چندمرحله‌ای به حفظ thinking بین نوبت‌ها اشاره می‌کند.",
  "conditions": [
    "مسیرهای vLLM و SGLang به نسخه‌های توسعه‌ای مشخص وابسته‌اند."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:zai-org-glm-4-7-flash-card",
    "evidence:zai-org-glm-4-7-flash-metadata",
    "evidence:zai-org-glm-4-7-flash-parameters",
    "evidence:zai-org-glm-4-7-flash-license",
    "evidence:zai-org-glm-4-7-flash-config",
    "evidence:four-tables-release-glm-4-7-flash-release"
  ]
});
modelUseGuidance.push({
  "id": "model-use:qwen-qwen3-8b:enterprise-rag",
  "modelVersionId": "model:qwen-qwen3-8b",
  "applicationId": "enterprise-rag",
  "role": "grounded-generation",
  "summary": "تولید پاسخ متنی از قطعات بازیابی‌شده",
  "description": "جمع‌بندی تحلیلی: زمینهٔ متنی و دستورپذیری این مدل امکان آزمودن پاسخ مبتنی بر قطعات سند را می‌دهد.",
  "distinguishingFeature": "جمع‌بندی تحلیلی: زمینهٔ متنی و دستورپذیری این مدل امکان آزمودن پاسخ مبتنی بر قطعات سند را می‌دهد.",
  "conditions": [
    "بازیابی، درج سند و بررسی استنادها بر عهدهٔ سامانه است؛ این رابطه بنچمارک RAG یا فارسی نیست."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:qwen-qwen3-8b-card",
    "evidence:qwen-qwen3-8b-metadata",
    "evidence:qwen-qwen3-8b-parameters",
    "evidence:qwen-qwen3-8b-license",
    "evidence:qwen-qwen3-8b-context",
    "evidence:qwen-qwen3-8b-config",
    "evidence:four-tables-release-qwen3-launch"
  ]
});
modelUseGuidance.push({
  "id": "model-use:ibm-granite-granite-3-3-2b-instruct:structured-extraction",
  "modelVersionId": "model:ibm-granite-granite-3-3-2b-instruct",
  "applicationId": "structured-extraction",
  "role": "structured-output",
  "summary": "استخراج فیلد و طبقه‌بندی متن",
  "description": "کارت Granite 3.3، استخراج متن و طبقه‌بندی را در کاربردهای مدل فهرست می‌کند.",
  "distinguishingFeature": "کارت Granite 3.3، استخراج متن و طبقه‌بندی را در کاربردهای مدل فهرست می‌کند.",
  "conditions": [
    "خروجی را با schema برنامه اعتبارسنجی کنید؛ قالب دلخواه به‌تنهایی تضمین JSON معتبر نیست."
  ],
  "basis": "publisher-summary",
  "evidenceIds": [
    "evidence:ibm-granite-granite-3-3-2b-instruct-card",
    "evidence:ibm-granite-granite-3-3-2b-instruct-metadata",
    "evidence:ibm-granite-granite-3-3-2b-instruct-parameters",
    "evidence:ibm-granite-granite-3-3-2b-instruct-license",
    "evidence:ibm-granite-granite-3-3-2b-instruct-context",
    "evidence:ibm-granite-granite-3-3-2b-instruct-config",
    "evidence:four-tables-release-ibm-granite-3-3-release"
  ]
});
modelUseGuidance.push({
  "id": "model-use:qwen-qwen3-coder-30b-a3b-instruct:agents-tools",
  "modelVersionId": "model:qwen-qwen3-coder-30b-a3b-instruct",
  "applicationId": "agents-tools",
  "role": "tool-use",
  "summary": "گردش‌کار عامل اصلاح کد",
  "description": "مدل Coder از قالب ویژهٔ فراخوانی ابزار برای کار در مخزن کد استفاده می‌کند.",
  "distinguishingFeature": "مدل Coder از قالب ویژهٔ فراخوانی ابزار برای کار در مخزن کد استفاده می‌کند.",
  "conditions": [
    "ابزارهای فایل، آزمون و اجرا در برنامهٔ میزبان فراهم می‌شوند."
  ],
  "basis": "publisher-summary",
  "evidenceIds": [
    "evidence:qwen-qwen3-coder-30b-a3b-instruct-card",
    "evidence:qwen-qwen3-coder-30b-a3b-instruct-metadata",
    "evidence:qwen-qwen3-coder-30b-a3b-instruct-parameters",
    "evidence:qwen-qwen3-coder-30b-a3b-instruct-license",
    "evidence:qwen-qwen3-coder-30b-a3b-instruct-context",
    "evidence:qwen-qwen3-coder-30b-a3b-instruct-config"
  ]
});
modelUseGuidance.push({
  "id": "model-use:mistralai-devstral-small-2-24b-instruct-2512:agents-tools",
  "modelVersionId": "model:mistralai-devstral-small-2-24b-instruct-2512",
  "applicationId": "agents-tools",
  "role": "tool-use",
  "summary": "کاوش کد و اصلاح چندفایلی",
  "description": "Devstral Small 2 برای بررسی کد با ابزار و ویرایش چند فایل طراحی شده است.",
  "distinguishingFeature": "Devstral Small 2 برای بررسی کد با ابزار و ویرایش چند فایل طراحی شده است.",
  "conditions": [
    "ابزارهای عامل و قالب Mistral باید با نسخهٔ مدل سازگار باشند."
  ],
  "basis": "publisher-summary",
  "evidenceIds": [
    "evidence:mistralai-devstral-small-2-24b-instruct-2512-card",
    "evidence:mistralai-devstral-small-2-24b-instruct-2512-metadata",
    "evidence:mistralai-devstral-small-2-24b-instruct-2512-parameters",
    "evidence:mistralai-devstral-small-2-24b-instruct-2512-license",
    "evidence:mistralai-devstral-small-2-24b-instruct-2512-context",
    "evidence:mistralai-devstral-small-2-24b-instruct-2512-config",
    "evidence:four-tables-release-devstral-small-2-release"
  ]
});
modelUseGuidance.push({
  "id": "model-use:google-gemma-4-26b-a4b-it:document-vision",
  "modelVersionId": "model:google-gemma-4-26b-a4b-it",
  "applicationId": "document-vision",
  "role": "vision",
  "summary": "پرسش و پاسخ از متن و تصویر",
  "description": "نسخهٔ 26B-A4B از Gemma 4 ورودی تصویر را همراه متن پردازش می‌کند.",
  "distinguishingFeature": "نسخهٔ 26B-A4B از Gemma 4 ورودی تصویر را همراه متن پردازش می‌کند.",
  "conditions": [
    "مسیر processor تصویر لازم است؛ قابلیت صوت E2B به این مدل تعمیم داده نشده است."
  ],
  "basis": "publisher-summary",
  "evidenceIds": [
    "evidence:google-gemma-4-26b-a4b-it-card",
    "evidence:google-gemma-4-26b-a4b-it-metadata",
    "evidence:google-gemma-4-26b-a4b-it-parameters",
    "evidence:google-gemma-4-26b-a4b-it-license",
    "evidence:google-gemma-4-26b-a4b-it-context",
    "evidence:google-gemma-4-26b-a4b-it-config",
    "evidence:four-tables-release-gemma-4-release-log"
  ]
});
modelUseGuidance.push({
  "id": "model-use:qwen-qwen3-5-35b-a3b:document-vision",
  "modelVersionId": "model:qwen-qwen3-5-35b-a3b",
  "applicationId": "document-vision",
  "role": "vision",
  "summary": "تحلیل تصویر همراه متن",
  "description": "مدل 35B-A3B از Qwen3.5 پایهٔ یکپارچهٔ زبان و تصویر دارد.",
  "distinguishingFeature": "مدل 35B-A3B از Qwen3.5 پایهٔ یکپارچهٔ زبان و تصویر دارد.",
  "conditions": [
    "تنظیمات چندوجهی و محدودیت تصویر را از راهنمای همین وزن بخوانید."
  ],
  "basis": "publisher-summary",
  "evidenceIds": [
    "evidence:qwen-qwen3-5-35b-a3b-card",
    "evidence:qwen-qwen3-5-35b-a3b-metadata",
    "evidence:qwen-qwen3-5-35b-a3b-parameters",
    "evidence:qwen-qwen3-5-35b-a3b-license",
    "evidence:qwen-qwen3-5-35b-a3b-context",
    "evidence:qwen-qwen3-5-35b-a3b-config",
    "evidence:four-tables-release-qwen3-5-medium-models-release"
  ]
});
modelUseGuidance.push({
  "id": "model-use:qwen-qwen3-8-27b:document-vision",
  "modelVersionId": "model:qwen-qwen3-8-27b",
  "applicationId": "document-vision",
  "role": "vision",
  "summary": "فهم تصویر و ویدئو",
  "description": "Qwen3.8-27B در کارت رسمی، مدل بومی متن–تصویر با ورودی ویدئو معرفی شده است.",
  "distinguishingFeature": "Qwen3.8-27B در کارت رسمی، مدل بومی متن–تصویر با ورودی ویدئو معرفی شده است.",
  "conditions": [
    "اندازهٔ تصویر و شیوهٔ نمونه‌برداری فریم‌ها بخشی از شرایط استفاده‌اند."
  ],
  "basis": "publisher-summary",
  "evidenceIds": [
    "evidence:qwen-qwen3-8-27b-card",
    "evidence:qwen-qwen3-8-27b-metadata",
    "evidence:qwen-qwen3-8-27b-parameters",
    "evidence:qwen-qwen3-8-27b-license",
    "evidence:qwen-qwen3-8-27b-context",
    "evidence:qwen-qwen3-8-27b-config",
    "evidence:four-tables-release-qwen3-8-27b-release"
  ]
});
modelUseGuidance.push({
  "id": "model-use:deepseek-ai-deepseek-v4-1-flash:document-vision",
  "modelVersionId": "model:deepseek-ai-deepseek-v4-1-flash",
  "applicationId": "document-vision",
  "role": "vision",
  "summary": "خواندن تصویر در ورودی بلند",
  "description": "V4.1-Flash به‌صورت بومی متن و تصویر را پردازش و متن تولید می‌کند.",
  "distinguishingFeature": "V4.1-Flash به‌صورت بومی متن و تصویر را پردازش و متن تولید می‌کند.",
  "conditions": [
    "مسیر اجرای ویژهٔ CED را رعایت کنید؛ این رابطه، نتیجهٔ ارزیابی OCR نیست."
  ],
  "basis": "publisher-summary",
  "evidenceIds": [
    "evidence:deepseek-ai-deepseek-v4-1-flash-card",
    "evidence:deepseek-ai-deepseek-v4-1-flash-metadata",
    "evidence:deepseek-ai-deepseek-v4-1-flash-parameters",
    "evidence:deepseek-ai-deepseek-v4-1-flash-license",
    "evidence:deepseek-ai-deepseek-v4-1-flash-config",
    "evidence:four-tables-release-deepseek-v4-1-flash-release",
    "evidence:four-tables-deepseek-ai-deepseek-v4-1-flash-declared-context"
  ]
});
modelUseGuidance.push({
  "id": "model-use:qwen-qwen3-32b:coding-assistant",
  "modelVersionId": "model:qwen-qwen3-32b",
  "applicationId": "coding-assistant",
  "role": "coding",
  "summary": "تولید و توضیح کد با مدل عمومی",
  "description": "کدنویسی در کارت Qwen3-32B در کنار استدلال و گفت‌وگو معرفی شده است.",
  "distinguishingFeature": "کدنویسی در کارت Qwen3-32B در کنار استدلال و گفت‌وگو معرفی شده است.",
  "conditions": [
    "این مدل عمومی است؛ مدل اختصاصی Coder قالب ابزار و آموزش متفاوت دارد."
  ],
  "basis": "publisher-summary",
  "evidenceIds": [
    "evidence:qwen-qwen3-32b-card",
    "evidence:qwen-qwen3-32b-metadata",
    "evidence:qwen-qwen3-32b-parameters",
    "evidence:qwen-qwen3-32b-license",
    "evidence:qwen-qwen3-32b-context",
    "evidence:qwen-qwen3-32b-config",
    "evidence:four-tables-release-qwen3-launch"
  ]
});
modelUseGuidance.push({
  "id": "model-use:mistralai-mistral-small-3-1-24b-instruct-2503:structured-extraction",
  "modelVersionId": "model:mistralai-mistral-small-3-1-24b-instruct-2503",
  "applicationId": "structured-extraction",
  "role": "structured-output",
  "summary": "استخراج با خروجی JSON",
  "description": "کارت Mistral Small 3.1 خروجی JSON و فراخوانی تابع را در کاربردهای نسخهٔ Instruct ذکر می‌کند.",
  "distinguishingFeature": "کارت Mistral Small 3.1 خروجی JSON و فراخوانی تابع را در کاربردهای نسخهٔ Instruct ذکر می‌کند.",
  "conditions": [
    "parser و اعتبارسنجی schema را در لایهٔ برنامه تنظیم کنید."
  ],
  "basis": "publisher-summary",
  "evidenceIds": [
    "evidence:mistralai-mistral-small-3-1-24b-instruct-2503-card",
    "evidence:mistralai-mistral-small-3-1-24b-instruct-2503-metadata",
    "evidence:mistralai-mistral-small-3-1-24b-instruct-2503-parameters",
    "evidence:mistralai-mistral-small-3-1-24b-instruct-2503-license",
    "evidence:mistralai-mistral-small-3-1-24b-instruct-2503-context",
    "evidence:mistralai-mistral-small-3-1-24b-instruct-2503-config",
    "evidence:four-tables-release-mistral-small-3-1-release"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-coherelabs-aya-expanse-32b-enterprise-rag",
  "modelVersionId": "model:coherelabs-aya-expanse-32b",
  "applicationId": "enterprise-rag",
  "role": "grounded-generation",
  "summary": "تولید پاسخ مستند در RAG",
  "description": "این مدل نویسندهٔ پاسخ است؛ بازیابی و بازرتبه‌بندی را اجزای جدا انجام می‌دهند.",
  "distinguishingFeature": "نگارش و گفت‌وگوی چندزبانه با اسناد بلند",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-50519b37f3fc26b4a5"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-coherelabs-aya-expanse-32b-structured-extraction",
  "modelVersionId": "model:coherelabs-aya-expanse-32b",
  "applicationId": "structured-extraction",
  "role": "structured-output",
  "summary": "استخراج فیلد و JSON با schema",
  "description": "استخراج فیلد از متن؛ تولید خروجی مقید به schema به پشتیبانی موتور وابسته است.",
  "distinguishingFeature": "نگارش و گفت‌وگوی چندزبانه با اسناد بلند",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-50519b37f3fc26b4a5"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-coherelabs-aya-expanse-8b-enterprise-rag",
  "modelVersionId": "model:coherelabs-aya-expanse-8b",
  "applicationId": "enterprise-rag",
  "role": "grounded-generation",
  "summary": "تولید پاسخ مستند در RAG",
  "description": "این مدل نویسندهٔ پاسخ است؛ بازیابی و بازرتبه‌بندی را اجزای جدا انجام می‌دهند.",
  "distinguishingFeature": "دستیار نوشتن و بازنویسی چندزبانه",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-7fd37ca79c736c18bd"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-coherelabs-aya-expanse-8b-structured-extraction",
  "modelVersionId": "model:coherelabs-aya-expanse-8b",
  "applicationId": "structured-extraction",
  "role": "structured-output",
  "summary": "استخراج فیلد و JSON با schema",
  "description": "استخراج فیلد از متن؛ تولید خروجی مقید به schema به پشتیبانی موتور وابسته است.",
  "distinguishingFeature": "دستیار نوشتن و بازنویسی چندزبانه",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-7fd37ca79c736c18bd"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-coherelabs-tiny-aya-global-enterprise-rag",
  "modelVersionId": "model:coherelabs-tiny-aya-global",
  "applicationId": "enterprise-rag",
  "role": "grounded-generation",
  "summary": "تولید پاسخ مستند در RAG",
  "description": "این مدل نویسندهٔ پاسخ است؛ بازیابی و بازرتبه‌بندی را اجزای جدا انجام می‌دهند.",
  "distinguishingFeature": "گفت‌وگوی محلی در زبان‌های گوناگون",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-690f5a70697f256add"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-coherelabs-tiny-aya-global-structured-extraction",
  "modelVersionId": "model:coherelabs-tiny-aya-global",
  "applicationId": "structured-extraction",
  "role": "structured-output",
  "summary": "استخراج فیلد و JSON با schema",
  "description": "استخراج فیلد از متن؛ تولید خروجی مقید به schema به پشتیبانی موتور وابسته است.",
  "distinguishingFeature": "گفت‌وگوی محلی در زبان‌های گوناگون",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-690f5a70697f256add"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-coherelabs-tiny-aya-global-coding-assistant",
  "modelVersionId": "model:coherelabs-tiny-aya-global",
  "applicationId": "coding-assistant",
  "role": "coding",
  "summary": "قطعه‌کد، توضیح و اصلاح محلی",
  "description": "شاخهٔ Global از Tiny Aya برای پوشش عمومی زبان‌ها عرضه شده؛ با نسخه‌های منطقه‌ای Earth،Fire و Water یکی نیست.",
  "distinguishingFeature": "گفت‌وگوی محلی در زبان‌های گوناگون",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-690f5a70697f256add"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-huggingfacetb-smollm2-1-7b-instruct-text-work",
  "modelVersionId": "model:huggingfacetb-smollm2-1-7b-instruct",
  "applicationId": "text-work",
  "role": "text-generation",
  "summary": "چت و بازنویسی کوتاه",
  "description": "بزرگ‌ترین نسخهٔ SmolLM2 در این فهرست، علاوه بر پیروی از دستور، قالب فراخوانی تابع دارد؛ این ویژگی به دو نسخهٔ کوچک‌تر تعمیم ندارد.",
  "distinguishingFeature": "نمونه‌سازی دستیار کوچک با فراخوانی تابع",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-9c5cd7741b6bd7013a"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-huggingfacetb-smollm2-1-7b-instruct-enterprise-rag",
  "modelVersionId": "model:huggingfacetb-smollm2-1-7b-instruct",
  "applicationId": "enterprise-rag",
  "role": "grounded-generation",
  "summary": "پاسخ از چند قطعهٔ کوتاه سند",
  "description": "این مدل نویسندهٔ پاسخ است؛ بازیابی و بازرتبه‌بندی را اجزای جدا انجام می‌دهند.",
  "distinguishingFeature": "نمونه‌سازی دستیار کوچک با فراخوانی تابع",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-9c5cd7741b6bd7013a"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-huggingfacetb-smollm2-1-7b-instruct-structured-extraction",
  "modelVersionId": "model:huggingfacetb-smollm2-1-7b-instruct",
  "applicationId": "structured-extraction",
  "role": "structured-output",
  "summary": "استخراج فیلدهای ساده با قالب ثابت",
  "description": "استخراج فیلد از متن؛ تولید خروجی مقید به schema به پشتیبانی موتور وابسته است.",
  "distinguishingFeature": "نمونه‌سازی دستیار کوچک با فراخوانی تابع",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-9c5cd7741b6bd7013a"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-huggingfacetb-smollm2-1-7b-instruct-coding-assistant",
  "modelVersionId": "model:huggingfacetb-smollm2-1-7b-instruct",
  "applicationId": "coding-assistant",
  "role": "coding",
  "summary": "قطعه‌کد، توضیح و اصلاح محلی",
  "description": "بزرگ‌ترین نسخهٔ SmolLM2 در این فهرست، علاوه بر پیروی از دستور، قالب فراخوانی تابع دارد؛ این ویژگی به دو نسخهٔ کوچک‌تر تعمیم ندارد.",
  "distinguishingFeature": "نمونه‌سازی دستیار کوچک با فراخوانی تابع",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-9c5cd7741b6bd7013a"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-huggingfacetb-smollm2-135m-instruct-enterprise-rag",
  "modelVersionId": "model:huggingfacetb-smollm2-135m-instruct",
  "applicationId": "enterprise-rag",
  "role": "grounded-generation",
  "summary": "پاسخ از چند قطعهٔ کوتاه سند",
  "description": "این مدل نویسندهٔ پاسخ است؛ بازیابی و بازرتبه‌بندی را اجزای جدا انجام می‌دهند.",
  "distinguishingFeature": "آزمایش پیروی از دستور با مدل بسیار کوچک",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-fa4d5f78d993271304"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-huggingfacetb-smollm2-135m-instruct-structured-extraction",
  "modelVersionId": "model:huggingfacetb-smollm2-135m-instruct",
  "applicationId": "structured-extraction",
  "role": "structured-output",
  "summary": "استخراج فیلدهای ساده با قالب ثابت",
  "description": "استخراج فیلد از متن؛ تولید خروجی مقید به schema به پشتیبانی موتور وابسته است.",
  "distinguishingFeature": "آزمایش پیروی از دستور با مدل بسیار کوچک",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-fa4d5f78d993271304"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-huggingfacetb-smollm2-360m-instruct-enterprise-rag",
  "modelVersionId": "model:huggingfacetb-smollm2-360m-instruct",
  "applicationId": "enterprise-rag",
  "role": "grounded-generation",
  "summary": "پاسخ از چند قطعهٔ کوتاه سند",
  "description": "این مدل نویسندهٔ پاسخ است؛ بازیابی و بازرتبه‌بندی را اجزای جدا انجام می‌دهند.",
  "distinguishingFeature": "بازنویسی و خلاصه‌سازی متن کوتاه",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-c4f522374a6511e10d"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-huggingfacetb-smollm2-360m-instruct-structured-extraction",
  "modelVersionId": "model:huggingfacetb-smollm2-360m-instruct",
  "applicationId": "structured-extraction",
  "role": "structured-output",
  "summary": "استخراج فیلدهای ساده با قالب ثابت",
  "description": "استخراج فیلد از متن؛ تولید خروجی مقید به schema به پشتیبانی موتور وابسته است.",
  "distinguishingFeature": "بازنویسی و خلاصه‌سازی متن کوتاه",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-c4f522374a6511e10d"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-huggingfacetb-smollm3-3b-enterprise-rag",
  "modelVersionId": "model:huggingfacetb-smollm3-3b",
  "applicationId": "enterprise-rag",
  "role": "grounded-generation",
  "summary": "تولید پاسخ مستند در RAG",
  "description": "این مدل نویسندهٔ پاسخ است؛ بازیابی و بازرتبه‌بندی را اجزای جدا انجام می‌دهند.",
  "distinguishingFeature": "دستیار کوچک با انتخاب حالت فکرکردن",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-1cb00d19b57837ab69"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-huggingfacetb-smollm3-3b-structured-extraction",
  "modelVersionId": "model:huggingfacetb-smollm3-3b",
  "applicationId": "structured-extraction",
  "role": "structured-output",
  "summary": "استخراج فیلد و JSON با schema",
  "description": "استخراج فیلد از متن؛ تولید خروجی مقید به schema به پشتیبانی موتور وابسته است.",
  "distinguishingFeature": "دستیار کوچک با انتخاب حالت فکرکردن",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-1cb00d19b57837ab69"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-huggingfacetb-smollm3-3b-reasoning-analysis",
  "modelVersionId": "model:huggingfacetb-smollm3-3b",
  "applicationId": "reasoning-analysis",
  "role": "reasoning",
  "summary": "استدلال با بودجهٔ تفکر مشخص",
  "description": "SmolLM3 سه‌میلیاردی دو حالت پاسخ مستقیم و استدلال دارد؛ زمینهٔ آموزش ۶۵٬۵۳۶ توکن است و جزئیات آموزش منتشر شده‌اند.",
  "distinguishingFeature": "دستیار کوچک با انتخاب حالت فکرکردن",
  "conditions": [
    "توکن‌های تفکر در زمان پاسخ و زمینه حساب شوند."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-1cb00d19b57837ab69"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-huggingfacetb-smollm3-3b-coding-assistant",
  "modelVersionId": "model:huggingfacetb-smollm3-3b",
  "applicationId": "coding-assistant",
  "role": "coding",
  "summary": "قطعه‌کد، توضیح و اصلاح محلی",
  "description": "SmolLM3 سه‌میلیاردی دو حالت پاسخ مستقیم و استدلال دارد؛ زمینهٔ آموزش ۶۵٬۵۳۶ توکن است و جزئیات آموزش منتشر شده‌اند.",
  "distinguishingFeature": "دستیار کوچک با انتخاب حالت فکرکردن",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-1cb00d19b57837ab69"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-huggingfacetb-smollm3-3b-agents-tools",
  "modelVersionId": "model:huggingfacetb-smollm3-3b",
  "applicationId": "agents-tools",
  "role": "tool-use",
  "summary": "ابزارخوانی با parser سازگار",
  "description": "SmolLM3 سه‌میلیاردی دو حالت پاسخ مستقیم و استدلال دارد؛ زمینهٔ آموزش ۶۵٬۵۳۶ توکن است و جزئیات آموزش منتشر شده‌اند.",
  "distinguishingFeature": "دستیار کوچک با انتخاب حالت فکرکردن",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-1cb00d19b57837ab69"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-0-6b-enterprise-rag",
  "modelVersionId": "model:qwen-qwen3-0-6b",
  "applicationId": "enterprise-rag",
  "role": "grounded-generation",
  "summary": "پاسخ از چند قطعهٔ کوتاه سند",
  "description": "این مدل نویسندهٔ پاسخ است؛ بازیابی و بازرتبه‌بندی را اجزای جدا انجام می‌دهند.",
  "distinguishingFeature": "نمونه‌سازی گفت‌وگو با کوچک‌ترین Qwen3",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-21af22da05ddae881c"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-0-6b-structured-extraction",
  "modelVersionId": "model:qwen-qwen3-0-6b",
  "applicationId": "structured-extraction",
  "role": "structured-output",
  "summary": "استخراج فیلدهای ساده با قالب ثابت",
  "description": "استخراج فیلد از متن؛ تولید خروجی مقید به schema به پشتیبانی موتور وابسته است.",
  "distinguishingFeature": "نمونه‌سازی گفت‌وگو با کوچک‌ترین Qwen3",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-21af22da05ddae881c"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-0-6b-reasoning-analysis",
  "modelVersionId": "model:qwen-qwen3-0-6b",
  "applicationId": "reasoning-analysis",
  "role": "reasoning",
  "summary": "استدلال محدود؛ مناسب مقایسهٔ اولیه",
  "description": "نسخهٔ متراکم ۰٫۶میلیاردی Qwen3 هر دو حالت thinking و non-thinking را دارد؛ فایل رسمی Q8_0 نیز موجود است.",
  "distinguishingFeature": "نمونه‌سازی گفت‌وگو با کوچک‌ترین Qwen3",
  "conditions": [
    "توکن‌های تفکر در زمان پاسخ و زمینه حساب شوند."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-21af22da05ddae881c"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-0-6b-coding-assistant",
  "modelVersionId": "model:qwen-qwen3-0-6b",
  "applicationId": "coding-assistant",
  "role": "coding",
  "summary": "قطعه‌کد، توضیح و اصلاح محلی",
  "description": "نسخهٔ متراکم ۰٫۶میلیاردی Qwen3 هر دو حالت thinking و non-thinking را دارد؛ فایل رسمی Q8_0 نیز موجود است.",
  "distinguishingFeature": "نمونه‌سازی گفت‌وگو با کوچک‌ترین Qwen3",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-21af22da05ddae881c"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-0-6b-agents-tools",
  "modelVersionId": "model:qwen-qwen3-0-6b",
  "applicationId": "agents-tools",
  "role": "tool-use",
  "summary": "ابزارخوانی با parser سازگار",
  "description": "نسخهٔ متراکم ۰٫۶میلیاردی Qwen3 هر دو حالت thinking و non-thinking را دارد؛ فایل رسمی Q8_0 نیز موجود است.",
  "distinguishingFeature": "نمونه‌سازی گفت‌وگو با کوچک‌ترین Qwen3",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-21af22da05ddae881c"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-1-7b-enterprise-rag",
  "modelVersionId": "model:qwen-qwen3-1-7b",
  "applicationId": "enterprise-rag",
  "role": "grounded-generation",
  "summary": "پاسخ از چند قطعهٔ کوتاه سند",
  "description": "این مدل نویسندهٔ پاسخ است؛ بازیابی و بازرتبه‌بندی را اجزای جدا انجام می‌دهند.",
  "distinguishingFeature": "دستیار متنی کوچک با کنترل استدلال",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-49f96d4bca8be6d031"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-1-7b-structured-extraction",
  "modelVersionId": "model:qwen-qwen3-1-7b",
  "applicationId": "structured-extraction",
  "role": "structured-output",
  "summary": "استخراج فیلدهای ساده با قالب ثابت",
  "description": "استخراج فیلد از متن؛ تولید خروجی مقید به schema به پشتیبانی موتور وابسته است.",
  "distinguishingFeature": "دستیار متنی کوچک با کنترل استدلال",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-49f96d4bca8be6d031"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-1-7b-reasoning-analysis",
  "modelVersionId": "model:qwen-qwen3-1-7b",
  "applicationId": "reasoning-analysis",
  "role": "reasoning",
  "summary": "استدلال محدود؛ مناسب مقایسهٔ اولیه",
  "description": "Qwen3-1.7B میان گزینه‌های زیر دو میلیارد پارامتر این فهرست قرار می‌گیرد؛ حالت پاسخ مستقیم را می‌توان از قالب پیام انتخاب کرد.",
  "distinguishingFeature": "دستیار متنی کوچک با کنترل استدلال",
  "conditions": [
    "توکن‌های تفکر در زمان پاسخ و زمینه حساب شوند."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-49f96d4bca8be6d031"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-1-7b-coding-assistant",
  "modelVersionId": "model:qwen-qwen3-1-7b",
  "applicationId": "coding-assistant",
  "role": "coding",
  "summary": "قطعه‌کد، توضیح و اصلاح محلی",
  "description": "Qwen3-1.7B میان گزینه‌های زیر دو میلیارد پارامتر این فهرست قرار می‌گیرد؛ حالت پاسخ مستقیم را می‌توان از قالب پیام انتخاب کرد.",
  "distinguishingFeature": "دستیار متنی کوچک با کنترل استدلال",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-49f96d4bca8be6d031"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-1-7b-agents-tools",
  "modelVersionId": "model:qwen-qwen3-1-7b",
  "applicationId": "agents-tools",
  "role": "tool-use",
  "summary": "ابزارخوانی با parser سازگار",
  "description": "Qwen3-1.7B میان گزینه‌های زیر دو میلیارد پارامتر این فهرست قرار می‌گیرد؛ حالت پاسخ مستقیم را می‌توان از قالب پیام انتخاب کرد.",
  "distinguishingFeature": "دستیار متنی کوچک با کنترل استدلال",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-49f96d4bca8be6d031"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-14b-enterprise-rag",
  "modelVersionId": "model:qwen-qwen3-14b",
  "applicationId": "enterprise-rag",
  "role": "grounded-generation",
  "summary": "تولید پاسخ مستند در RAG",
  "description": "این مدل نویسندهٔ پاسخ است؛ بازیابی و بازرتبه‌بندی را اجزای جدا انجام می‌دهند.",
  "distinguishingFeature": "تولید و تحلیل متن با Qwen3 متراکم",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-02c6053d6bac907d15"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-14b-structured-extraction",
  "modelVersionId": "model:qwen-qwen3-14b",
  "applicationId": "structured-extraction",
  "role": "structured-output",
  "summary": "استخراج فیلد و JSON با schema",
  "description": "استخراج فیلد از متن؛ تولید خروجی مقید به schema به پشتیبانی موتور وابسته است.",
  "distinguishingFeature": "تولید و تحلیل متن با Qwen3 متراکم",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-02c6053d6bac907d15"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-14b-reasoning-analysis",
  "modelVersionId": "model:qwen-qwen3-14b",
  "applicationId": "reasoning-analysis",
  "role": "reasoning",
  "summary": "استدلال با بودجهٔ تفکر مشخص",
  "description": "Qwen3-14B یک مدل متراکم با دو حالت پاسخ است؛ نسخه‌های رسمی GGUF برای انتخاب دقت وزن در دسترس‌اند.",
  "distinguishingFeature": "تولید و تحلیل متن با Qwen3 متراکم",
  "conditions": [
    "توکن‌های تفکر در زمان پاسخ و زمینه حساب شوند."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-02c6053d6bac907d15"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-14b-coding-assistant",
  "modelVersionId": "model:qwen-qwen3-14b",
  "applicationId": "coding-assistant",
  "role": "coding",
  "summary": "تولید و اصلاح کد با آزمون",
  "description": "Qwen3-14B یک مدل متراکم با دو حالت پاسخ است؛ نسخه‌های رسمی GGUF برای انتخاب دقت وزن در دسترس‌اند.",
  "distinguishingFeature": "تولید و تحلیل متن با Qwen3 متراکم",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-02c6053d6bac907d15"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-14b-agents-tools",
  "modelVersionId": "model:qwen-qwen3-14b",
  "applicationId": "agents-tools",
  "role": "tool-use",
  "summary": "ابزارخوانی با parser سازگار",
  "description": "Qwen3-14B یک مدل متراکم با دو حالت پاسخ است؛ نسخه‌های رسمی GGUF برای انتخاب دقت وزن در دسترس‌اند.",
  "distinguishingFeature": "تولید و تحلیل متن با Qwen3 متراکم",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-02c6053d6bac907d15"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-30b-a3b-text-work",
  "modelVersionId": "model:qwen-qwen3-30b-a3b",
  "applicationId": "text-work",
  "role": "text-generation",
  "summary": "چت، خلاصه‌سازی و بازنویسی",
  "description": "Qwen3-30B-A3B از خبرگان انتخابی استفاده می‌کند و از الگوی Qwen-Agent برای اتصال ابزارها بهره می‌برد.",
  "distinguishingFeature": "دستیار ابزارمحور با معماری MoE",
  "conditions": [
    "برای پاسخ ساده، حالت تفکر را در صورت پشتیبانی خاموش یا بودجهٔ خروجی را محدود کنید."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-3fbdfa840af9cf314f"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-30b-a3b-enterprise-rag",
  "modelVersionId": "model:qwen-qwen3-30b-a3b",
  "applicationId": "enterprise-rag",
  "role": "grounded-generation",
  "summary": "تولید پاسخ مستند در RAG",
  "description": "این مدل نویسندهٔ پاسخ است؛ بازیابی و بازرتبه‌بندی را اجزای جدا انجام می‌دهند.",
  "distinguishingFeature": "دستیار ابزارمحور با معماری MoE",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-3fbdfa840af9cf314f"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-30b-a3b-structured-extraction",
  "modelVersionId": "model:qwen-qwen3-30b-a3b",
  "applicationId": "structured-extraction",
  "role": "structured-output",
  "summary": "استخراج فیلد و JSON با schema",
  "description": "استخراج فیلد از متن؛ تولید خروجی مقید به schema به پشتیبانی موتور وابسته است.",
  "distinguishingFeature": "دستیار ابزارمحور با معماری MoE",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-3fbdfa840af9cf314f"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-30b-a3b-reasoning-analysis",
  "modelVersionId": "model:qwen-qwen3-30b-a3b",
  "applicationId": "reasoning-analysis",
  "role": "reasoning",
  "summary": "استدلال با بودجهٔ تفکر مشخص",
  "description": "Qwen3-30B-A3B از خبرگان انتخابی استفاده می‌کند و از الگوی Qwen-Agent برای اتصال ابزارها بهره می‌برد.",
  "distinguishingFeature": "دستیار ابزارمحور با معماری MoE",
  "conditions": [
    "توکن‌های تفکر در زمان پاسخ و زمینه حساب شوند."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-3fbdfa840af9cf314f"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-30b-a3b-coding-assistant",
  "modelVersionId": "model:qwen-qwen3-30b-a3b",
  "applicationId": "coding-assistant",
  "role": "coding",
  "summary": "تولید و اصلاح کد با آزمون",
  "description": "Qwen3-30B-A3B از خبرگان انتخابی استفاده می‌کند و از الگوی Qwen-Agent برای اتصال ابزارها بهره می‌برد.",
  "distinguishingFeature": "دستیار ابزارمحور با معماری MoE",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-3fbdfa840af9cf314f"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-32b-text-work",
  "modelVersionId": "model:qwen-qwen3-32b",
  "applicationId": "text-work",
  "role": "text-generation",
  "summary": "چت، خلاصه‌سازی و بازنویسی",
  "description": "Qwen3-32B برخلاف نسخهٔ 30B-A3B معماری متراکم دارد؛ حالت استدلال را می‌توان متناسب با پیچیدگی پرسش تنظیم کرد.",
  "distinguishingFeature": "تحلیل چندمرحله‌ای با نسخهٔ متراکم بزرگ Qwen3",
  "conditions": [
    "برای پاسخ ساده، حالت تفکر را در صورت پشتیبانی خاموش یا بودجهٔ خروجی را محدود کنید."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-eee862b4eceaa376da"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-32b-enterprise-rag",
  "modelVersionId": "model:qwen-qwen3-32b",
  "applicationId": "enterprise-rag",
  "role": "grounded-generation",
  "summary": "تولید پاسخ مستند در RAG",
  "description": "این مدل نویسندهٔ پاسخ است؛ بازیابی و بازرتبه‌بندی را اجزای جدا انجام می‌دهند.",
  "distinguishingFeature": "تحلیل چندمرحله‌ای با نسخهٔ متراکم بزرگ Qwen3",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-eee862b4eceaa376da"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-32b-structured-extraction",
  "modelVersionId": "model:qwen-qwen3-32b",
  "applicationId": "structured-extraction",
  "role": "structured-output",
  "summary": "استخراج فیلد و JSON با schema",
  "description": "استخراج فیلد از متن؛ تولید خروجی مقید به schema به پشتیبانی موتور وابسته است.",
  "distinguishingFeature": "تحلیل چندمرحله‌ای با نسخهٔ متراکم بزرگ Qwen3",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-eee862b4eceaa376da"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-32b-agents-tools",
  "modelVersionId": "model:qwen-qwen3-32b",
  "applicationId": "agents-tools",
  "role": "tool-use",
  "summary": "ابزارخوانی با parser سازگار",
  "description": "Qwen3-32B برخلاف نسخهٔ 30B-A3B معماری متراکم دارد؛ حالت استدلال را می‌توان متناسب با پیچیدگی پرسش تنظیم کرد.",
  "distinguishingFeature": "تحلیل چندمرحله‌ای با نسخهٔ متراکم بزرگ Qwen3",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-eee862b4eceaa376da"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-4b-enterprise-rag",
  "modelVersionId": "model:qwen-qwen3-4b",
  "applicationId": "enterprise-rag",
  "role": "grounded-generation",
  "summary": "تولید پاسخ مستند در RAG",
  "description": "این مدل نویسندهٔ پاسخ است؛ بازیابی و بازرتبه‌بندی را اجزای جدا انجام می‌دهند.",
  "distinguishingFeature": "دستیار عمومی در اندازهٔ چهار میلیارد",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-5438c7e36f3bb1bdd2"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-4b-structured-extraction",
  "modelVersionId": "model:qwen-qwen3-4b",
  "applicationId": "structured-extraction",
  "role": "structured-output",
  "summary": "استخراج فیلد و JSON با schema",
  "description": "استخراج فیلد از متن؛ تولید خروجی مقید به schema به پشتیبانی موتور وابسته است.",
  "distinguishingFeature": "دستیار عمومی در اندازهٔ چهار میلیارد",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-5438c7e36f3bb1bdd2"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-4b-reasoning-analysis",
  "modelVersionId": "model:qwen-qwen3-4b",
  "applicationId": "reasoning-analysis",
  "role": "reasoning",
  "summary": "استدلال با بودجهٔ تفکر مشخص",
  "description": "Qwen3-4B امکان تغییر حالت thinking را در یک checkpoint ارائه می‌کند؛ GGUF رسمی با چند روش کوانت دارد.",
  "distinguishingFeature": "دستیار عمومی در اندازهٔ چهار میلیارد",
  "conditions": [
    "توکن‌های تفکر در زمان پاسخ و زمینه حساب شوند."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-5438c7e36f3bb1bdd2"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-4b-coding-assistant",
  "modelVersionId": "model:qwen-qwen3-4b",
  "applicationId": "coding-assistant",
  "role": "coding",
  "summary": "قطعه‌کد، توضیح و اصلاح محلی",
  "description": "Qwen3-4B امکان تغییر حالت thinking را در یک checkpoint ارائه می‌کند؛ GGUF رسمی با چند روش کوانت دارد.",
  "distinguishingFeature": "دستیار عمومی در اندازهٔ چهار میلیارد",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-5438c7e36f3bb1bdd2"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-4b-agents-tools",
  "modelVersionId": "model:qwen-qwen3-4b",
  "applicationId": "agents-tools",
  "role": "tool-use",
  "summary": "ابزارخوانی با parser سازگار",
  "description": "Qwen3-4B امکان تغییر حالت thinking را در یک checkpoint ارائه می‌کند؛ GGUF رسمی با چند روش کوانت دارد.",
  "distinguishingFeature": "دستیار عمومی در اندازهٔ چهار میلیارد",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-5438c7e36f3bb1bdd2"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-8b-structured-extraction",
  "modelVersionId": "model:qwen-qwen3-8b",
  "applicationId": "structured-extraction",
  "role": "structured-output",
  "summary": "استخراج فیلد و JSON با schema",
  "description": "استخراج فیلد از متن؛ تولید خروجی مقید به schema به پشتیبانی موتور وابسته است.",
  "distinguishingFeature": "گفت‌وگو و کار با متن با کنترل فکرکردن",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-83f599b0dc739c8491"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-8b-reasoning-analysis",
  "modelVersionId": "model:qwen-qwen3-8b",
  "applicationId": "reasoning-analysis",
  "role": "reasoning",
  "summary": "استدلال با بودجهٔ تفکر مشخص",
  "description": "Qwen3-8B مدل عمومی متراکم با ۸٫۲میلیارد پارامتر اعلام‌شده است؛ پاسخ مستقیم و reasoning را در قالب پیام انتخاب می‌کنید.",
  "distinguishingFeature": "گفت‌وگو و کار با متن با کنترل فکرکردن",
  "conditions": [
    "توکن‌های تفکر در زمان پاسخ و زمینه حساب شوند."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-83f599b0dc739c8491"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-8b-coding-assistant",
  "modelVersionId": "model:qwen-qwen3-8b",
  "applicationId": "coding-assistant",
  "role": "coding",
  "summary": "قطعه‌کد، توضیح و اصلاح محلی",
  "description": "Qwen3-8B مدل عمومی متراکم با ۸٫۲میلیارد پارامتر اعلام‌شده است؛ پاسخ مستقیم و reasoning را در قالب پیام انتخاب می‌کنید.",
  "distinguishingFeature": "گفت‌وگو و کار با متن با کنترل فکرکردن",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-83f599b0dc739c8491"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-8b-agents-tools",
  "modelVersionId": "model:qwen-qwen3-8b",
  "applicationId": "agents-tools",
  "role": "tool-use",
  "summary": "ابزارخوانی با parser سازگار",
  "description": "Qwen3-8B مدل عمومی متراکم با ۸٫۲میلیارد پارامتر اعلام‌شده است؛ پاسخ مستقیم و reasoning را در قالب پیام انتخاب می‌کنید.",
  "distinguishingFeature": "گفت‌وگو و کار با متن با کنترل فکرکردن",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-83f599b0dc739c8491"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-coder-30b-a3b-instruct-text-work",
  "modelVersionId": "model:qwen-qwen3-coder-30b-a3b-instruct",
  "applicationId": "text-work",
  "role": "text-generation",
  "summary": "چت، خلاصه‌سازی و بازنویسی",
  "description": "Qwen3-Coder-30B-A3B-Instruct برای تولید کد، ویرایش مخزن و گردش‌کار عامل برنامه‌نویسی تنظیم شده؛ زمینهٔ بومی ۲۶۲٬۱۴۴ توکن دارد.",
  "distinguishingFeature": "اصلاح مخزن کد با دستیار ابزارمحور",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-504a98b0928e421cf9"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-coder-30b-a3b-instruct-enterprise-rag",
  "modelVersionId": "model:qwen-qwen3-coder-30b-a3b-instruct",
  "applicationId": "enterprise-rag",
  "role": "grounded-generation",
  "summary": "تولید پاسخ مستند در RAG",
  "description": "این مدل نویسندهٔ پاسخ است؛ بازیابی و بازرتبه‌بندی را اجزای جدا انجام می‌دهند.",
  "distinguishingFeature": "اصلاح مخزن کد با دستیار ابزارمحور",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-504a98b0928e421cf9"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-coder-30b-a3b-instruct-structured-extraction",
  "modelVersionId": "model:qwen-qwen3-coder-30b-a3b-instruct",
  "applicationId": "structured-extraction",
  "role": "structured-output",
  "summary": "استخراج فیلد و JSON با schema",
  "description": "استخراج فیلد از متن؛ تولید خروجی مقید به schema به پشتیبانی موتور وابسته است.",
  "distinguishingFeature": "اصلاح مخزن کد با دستیار ابزارمحور",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-504a98b0928e421cf9"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-coder-30b-a3b-instruct-reasoning-analysis",
  "modelVersionId": "model:qwen-qwen3-coder-30b-a3b-instruct",
  "applicationId": "reasoning-analysis",
  "role": "reasoning",
  "summary": "استدلال با بودجهٔ تفکر مشخص",
  "description": "Qwen3-Coder-30B-A3B-Instruct برای تولید کد، ویرایش مخزن و گردش‌کار عامل برنامه‌نویسی تنظیم شده؛ زمینهٔ بومی ۲۶۲٬۱۴۴ توکن دارد.",
  "distinguishingFeature": "اصلاح مخزن کد با دستیار ابزارمحور",
  "conditions": [
    "این checkpoint فقط پاسخ مستقیم تولید می‌کند؛ حالت thinking جداگانه ندارد."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-504a98b0928e421cf9"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-vl-8b-instruct-text-work",
  "modelVersionId": "model:qwen-qwen3-vl-8b-instruct",
  "applicationId": "text-work",
  "role": "text-generation",
  "summary": "چت، خلاصه‌سازی و بازنویسی",
  "description": "نسخهٔ Instruct هشت‌میلیاردی Qwen3-VL ورودی متن، تصویر و ویدئو را برای درک بصری و کار با سند ترکیب می‌کند.",
  "distinguishingFeature": "خواندن تصویر و سند با Qwen3-VL",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-d1601e1a4e651a447e"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-vl-8b-instruct-enterprise-rag",
  "modelVersionId": "model:qwen-qwen3-vl-8b-instruct",
  "applicationId": "enterprise-rag",
  "role": "grounded-generation",
  "summary": "تولید پاسخ مستند در RAG",
  "description": "این مدل نویسندهٔ پاسخ است؛ بازیابی و بازرتبه‌بندی را اجزای جدا انجام می‌دهند.",
  "distinguishingFeature": "خواندن تصویر و سند با Qwen3-VL",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-d1601e1a4e651a447e"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-vl-8b-instruct-structured-extraction",
  "modelVersionId": "model:qwen-qwen3-vl-8b-instruct",
  "applicationId": "structured-extraction",
  "role": "structured-output",
  "summary": "استخراج فیلد و JSON با schema",
  "description": "استخراج فیلد از متن؛ تولید خروجی مقید به schema به پشتیبانی موتور وابسته است.",
  "distinguishingFeature": "خواندن تصویر و سند با Qwen3-VL",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-d1601e1a4e651a447e"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-vl-8b-instruct-coding-assistant",
  "modelVersionId": "model:qwen-qwen3-vl-8b-instruct",
  "applicationId": "coding-assistant",
  "role": "coding",
  "summary": "قطعه‌کد، توضیح و اصلاح محلی",
  "description": "نسخهٔ Instruct هشت‌میلیاردی Qwen3-VL ورودی متن، تصویر و ویدئو را برای درک بصری و کار با سند ترکیب می‌کند.",
  "distinguishingFeature": "خواندن تصویر و سند با Qwen3-VL",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-d1601e1a4e651a447e"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-5-2b-text-work",
  "modelVersionId": "model:qwen-qwen3-5-2b",
  "applicationId": "text-work",
  "role": "text-generation",
  "summary": "چت و بازنویسی کوتاه",
  "description": "Qwen3.5-2B کوچک برای نمونه‌سازی و تنظیم دقیق وظیفه‌محور معرفی شده؛ ورودی بصری را همراه متن می‌پذیرد.",
  "distinguishingFeature": "نمونه‌سازی چندوجهی با Qwen3.5 کوچک",
  "conditions": [
    "برای پاسخ ساده، حالت تفکر را در صورت پشتیبانی خاموش یا بودجهٔ خروجی را محدود کنید."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-1fb0e66ad27f4a35c4"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-5-2b-enterprise-rag",
  "modelVersionId": "model:qwen-qwen3-5-2b",
  "applicationId": "enterprise-rag",
  "role": "grounded-generation",
  "summary": "پاسخ از چند قطعهٔ کوتاه سند",
  "description": "این مدل نویسندهٔ پاسخ است؛ بازیابی و بازرتبه‌بندی را اجزای جدا انجام می‌دهند.",
  "distinguishingFeature": "نمونه‌سازی چندوجهی با Qwen3.5 کوچک",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-1fb0e66ad27f4a35c4"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-5-2b-structured-extraction",
  "modelVersionId": "model:qwen-qwen3-5-2b",
  "applicationId": "structured-extraction",
  "role": "structured-output",
  "summary": "استخراج فیلدهای ساده با قالب ثابت",
  "description": "استخراج فیلد از متن؛ تولید خروجی مقید به schema به پشتیبانی موتور وابسته است.",
  "distinguishingFeature": "نمونه‌سازی چندوجهی با Qwen3.5 کوچک",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-1fb0e66ad27f4a35c4"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-5-2b-reasoning-analysis",
  "modelVersionId": "model:qwen-qwen3-5-2b",
  "applicationId": "reasoning-analysis",
  "role": "reasoning",
  "summary": "استدلال محدود؛ مناسب مقایسهٔ اولیه",
  "description": "Qwen3.5-2B کوچک برای نمونه‌سازی و تنظیم دقیق وظیفه‌محور معرفی شده؛ ورودی بصری را همراه متن می‌پذیرد.",
  "distinguishingFeature": "نمونه‌سازی چندوجهی با Qwen3.5 کوچک",
  "conditions": [
    "توکن‌های تفکر در زمان پاسخ و زمینه حساب شوند."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-1fb0e66ad27f4a35c4"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-5-2b-coding-assistant",
  "modelVersionId": "model:qwen-qwen3-5-2b",
  "applicationId": "coding-assistant",
  "role": "coding",
  "summary": "قطعه‌کد، توضیح و اصلاح محلی",
  "description": "Qwen3.5-2B کوچک برای نمونه‌سازی و تنظیم دقیق وظیفه‌محور معرفی شده؛ ورودی بصری را همراه متن می‌پذیرد.",
  "distinguishingFeature": "نمونه‌سازی چندوجهی با Qwen3.5 کوچک",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-1fb0e66ad27f4a35c4"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-5-2b-agents-tools",
  "modelVersionId": "model:qwen-qwen3-5-2b",
  "applicationId": "agents-tools",
  "role": "tool-use",
  "summary": "ابزارخوانی با parser سازگار",
  "description": "Qwen3.5-2B کوچک برای نمونه‌سازی و تنظیم دقیق وظیفه‌محور معرفی شده؛ ورودی بصری را همراه متن می‌پذیرد.",
  "distinguishingFeature": "نمونه‌سازی چندوجهی با Qwen3.5 کوچک",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-1fb0e66ad27f4a35c4"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-5-35b-a3b-text-work",
  "modelVersionId": "model:qwen-qwen3-5-35b-a3b",
  "applicationId": "text-work",
  "role": "text-generation",
  "summary": "چت، خلاصه‌سازی و بازنویسی",
  "description": "نسخهٔ 35B-A3B از پایهٔ یکپارچهٔ متن و تصویر و معماری ترکیبی بهره می‌برد و برای گردش‌کار چندمرحله‌ای قابل بررسی است.",
  "distinguishingFeature": "عامل چندوجهی با Qwen3.5 از نوع MoE",
  "conditions": [
    "برای پاسخ ساده، حالت تفکر را در صورت پشتیبانی خاموش یا بودجهٔ خروجی را محدود کنید."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-02a81d4ca4dfa9b099"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-5-35b-a3b-enterprise-rag",
  "modelVersionId": "model:qwen-qwen3-5-35b-a3b",
  "applicationId": "enterprise-rag",
  "role": "grounded-generation",
  "summary": "تولید پاسخ مستند در RAG",
  "description": "این مدل نویسندهٔ پاسخ است؛ بازیابی و بازرتبه‌بندی را اجزای جدا انجام می‌دهند.",
  "distinguishingFeature": "عامل چندوجهی با Qwen3.5 از نوع MoE",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-02a81d4ca4dfa9b099"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-5-35b-a3b-structured-extraction",
  "modelVersionId": "model:qwen-qwen3-5-35b-a3b",
  "applicationId": "structured-extraction",
  "role": "structured-output",
  "summary": "استخراج فیلد و JSON با schema",
  "description": "استخراج فیلد از متن؛ تولید خروجی مقید به schema به پشتیبانی موتور وابسته است.",
  "distinguishingFeature": "عامل چندوجهی با Qwen3.5 از نوع MoE",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-02a81d4ca4dfa9b099"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-5-35b-a3b-reasoning-analysis",
  "modelVersionId": "model:qwen-qwen3-5-35b-a3b",
  "applicationId": "reasoning-analysis",
  "role": "reasoning",
  "summary": "استدلال با بودجهٔ تفکر مشخص",
  "description": "نسخهٔ 35B-A3B از پایهٔ یکپارچهٔ متن و تصویر و معماری ترکیبی بهره می‌برد و برای گردش‌کار چندمرحله‌ای قابل بررسی است.",
  "distinguishingFeature": "عامل چندوجهی با Qwen3.5 از نوع MoE",
  "conditions": [
    "توکن‌های تفکر در زمان پاسخ و زمینه حساب شوند."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-02a81d4ca4dfa9b099"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-5-35b-a3b-coding-assistant",
  "modelVersionId": "model:qwen-qwen3-5-35b-a3b",
  "applicationId": "coding-assistant",
  "role": "coding",
  "summary": "تولید و اصلاح کد با آزمون",
  "description": "نسخهٔ 35B-A3B از پایهٔ یکپارچهٔ متن و تصویر و معماری ترکیبی بهره می‌برد و برای گردش‌کار چندمرحله‌ای قابل بررسی است.",
  "distinguishingFeature": "عامل چندوجهی با Qwen3.5 از نوع MoE",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-02a81d4ca4dfa9b099"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-5-4b-text-work",
  "modelVersionId": "model:qwen-qwen3-5-4b",
  "applicationId": "text-work",
  "role": "text-generation",
  "summary": "چت، خلاصه‌سازی و بازنویسی",
  "description": "Qwen3.5-4B از نسل متن–تصویر یکپارچه است؛ برای آزمودن استخراج اطلاعات از سند در اندازه‌ای کوچک‌تر از 9B قابل بررسی است.",
  "distinguishingFeature": "پردازش متن و تصویر در اندازهٔ چهار میلیارد",
  "conditions": [
    "برای پاسخ ساده، حالت تفکر را در صورت پشتیبانی خاموش یا بودجهٔ خروجی را محدود کنید."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-a70fca6b263839d3e5"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-5-4b-enterprise-rag",
  "modelVersionId": "model:qwen-qwen3-5-4b",
  "applicationId": "enterprise-rag",
  "role": "grounded-generation",
  "summary": "تولید پاسخ مستند در RAG",
  "description": "این مدل نویسندهٔ پاسخ است؛ بازیابی و بازرتبه‌بندی را اجزای جدا انجام می‌دهند.",
  "distinguishingFeature": "پردازش متن و تصویر در اندازهٔ چهار میلیارد",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-a70fca6b263839d3e5"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-5-4b-structured-extraction",
  "modelVersionId": "model:qwen-qwen3-5-4b",
  "applicationId": "structured-extraction",
  "role": "structured-output",
  "summary": "استخراج فیلد و JSON با schema",
  "description": "استخراج فیلد از متن؛ تولید خروجی مقید به schema به پشتیبانی موتور وابسته است.",
  "distinguishingFeature": "پردازش متن و تصویر در اندازهٔ چهار میلیارد",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-a70fca6b263839d3e5"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-5-4b-reasoning-analysis",
  "modelVersionId": "model:qwen-qwen3-5-4b",
  "applicationId": "reasoning-analysis",
  "role": "reasoning",
  "summary": "استدلال با بودجهٔ تفکر مشخص",
  "description": "Qwen3.5-4B از نسل متن–تصویر یکپارچه است؛ برای آزمودن استخراج اطلاعات از سند در اندازه‌ای کوچک‌تر از 9B قابل بررسی است.",
  "distinguishingFeature": "پردازش متن و تصویر در اندازهٔ چهار میلیارد",
  "conditions": [
    "توکن‌های تفکر در زمان پاسخ و زمینه حساب شوند."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-a70fca6b263839d3e5"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-5-4b-coding-assistant",
  "modelVersionId": "model:qwen-qwen3-5-4b",
  "applicationId": "coding-assistant",
  "role": "coding",
  "summary": "قطعه‌کد، توضیح و اصلاح محلی",
  "description": "Qwen3.5-4B از نسل متن–تصویر یکپارچه است؛ برای آزمودن استخراج اطلاعات از سند در اندازه‌ای کوچک‌تر از 9B قابل بررسی است.",
  "distinguishingFeature": "پردازش متن و تصویر در اندازهٔ چهار میلیارد",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-a70fca6b263839d3e5"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-5-4b-agents-tools",
  "modelVersionId": "model:qwen-qwen3-5-4b",
  "applicationId": "agents-tools",
  "role": "tool-use",
  "summary": "ابزارخوانی با parser سازگار",
  "description": "Qwen3.5-4B از نسل متن–تصویر یکپارچه است؛ برای آزمودن استخراج اطلاعات از سند در اندازه‌ای کوچک‌تر از 9B قابل بررسی است.",
  "distinguishingFeature": "پردازش متن و تصویر در اندازهٔ چهار میلیارد",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-a70fca6b263839d3e5"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-5-9b-text-work",
  "modelVersionId": "model:qwen-qwen3-5-9b",
  "applicationId": "text-work",
  "role": "text-generation",
  "summary": "چت، خلاصه‌سازی و بازنویسی",
  "description": "نسخهٔ 9B از Qwen3.5 ترکیب متن و تصویر را در معماری متراکم این خانواده عرضه می‌کند.",
  "distinguishingFeature": "دستیار اسناد و تصویر با Qwen3.5 متراکم",
  "conditions": [
    "برای پاسخ ساده، حالت تفکر را در صورت پشتیبانی خاموش یا بودجهٔ خروجی را محدود کنید."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-de0f4e149976e25127"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-5-9b-enterprise-rag",
  "modelVersionId": "model:qwen-qwen3-5-9b",
  "applicationId": "enterprise-rag",
  "role": "grounded-generation",
  "summary": "تولید پاسخ مستند در RAG",
  "description": "این مدل نویسندهٔ پاسخ است؛ بازیابی و بازرتبه‌بندی را اجزای جدا انجام می‌دهند.",
  "distinguishingFeature": "دستیار اسناد و تصویر با Qwen3.5 متراکم",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-de0f4e149976e25127"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-5-9b-structured-extraction",
  "modelVersionId": "model:qwen-qwen3-5-9b",
  "applicationId": "structured-extraction",
  "role": "structured-output",
  "summary": "استخراج فیلد و JSON با schema",
  "description": "استخراج فیلد از متن؛ تولید خروجی مقید به schema به پشتیبانی موتور وابسته است.",
  "distinguishingFeature": "دستیار اسناد و تصویر با Qwen3.5 متراکم",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-de0f4e149976e25127"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-5-9b-reasoning-analysis",
  "modelVersionId": "model:qwen-qwen3-5-9b",
  "applicationId": "reasoning-analysis",
  "role": "reasoning",
  "summary": "استدلال با بودجهٔ تفکر مشخص",
  "description": "نسخهٔ 9B از Qwen3.5 ترکیب متن و تصویر را در معماری متراکم این خانواده عرضه می‌کند.",
  "distinguishingFeature": "دستیار اسناد و تصویر با Qwen3.5 متراکم",
  "conditions": [
    "توکن‌های تفکر در زمان پاسخ و زمینه حساب شوند."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-de0f4e149976e25127"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-5-9b-coding-assistant",
  "modelVersionId": "model:qwen-qwen3-5-9b",
  "applicationId": "coding-assistant",
  "role": "coding",
  "summary": "تولید و اصلاح کد با آزمون",
  "description": "نسخهٔ 9B از Qwen3.5 ترکیب متن و تصویر را در معماری متراکم این خانواده عرضه می‌کند.",
  "distinguishingFeature": "دستیار اسناد و تصویر با Qwen3.5 متراکم",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-de0f4e149976e25127"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-5-9b-agents-tools",
  "modelVersionId": "model:qwen-qwen3-5-9b",
  "applicationId": "agents-tools",
  "role": "tool-use",
  "summary": "ابزارخوانی با parser سازگار",
  "description": "نسخهٔ 9B از Qwen3.5 ترکیب متن و تصویر را در معماری متراکم این خانواده عرضه می‌کند.",
  "distinguishingFeature": "دستیار اسناد و تصویر با Qwen3.5 متراکم",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-de0f4e149976e25127"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-8-27b-text-work",
  "modelVersionId": "model:qwen-qwen3-8-27b",
  "applicationId": "text-work",
  "role": "text-generation",
  "summary": "چت، خلاصه‌سازی و بازنویسی",
  "description": "Qwen3.8-27B مدل متراکم متن–تصویر با کنترل thinking است؛ تمرکز معرفی آن بر کدنویسی، پژوهش و کارهای چندمرحله‌ای است.",
  "distinguishingFeature": "گردش‌کار طولانی با عامل متن–تصویر",
  "conditions": [
    "برای پاسخ ساده، حالت تفکر را در صورت پشتیبانی خاموش یا بودجهٔ خروجی را محدود کنید."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-6ef1dc4cde68af6f92"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-8-27b-enterprise-rag",
  "modelVersionId": "model:qwen-qwen3-8-27b",
  "applicationId": "enterprise-rag",
  "role": "grounded-generation",
  "summary": "تولید پاسخ مستند در RAG",
  "description": "این مدل نویسندهٔ پاسخ است؛ بازیابی و بازرتبه‌بندی را اجزای جدا انجام می‌دهند.",
  "distinguishingFeature": "گردش‌کار طولانی با عامل متن–تصویر",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-6ef1dc4cde68af6f92"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-8-27b-structured-extraction",
  "modelVersionId": "model:qwen-qwen3-8-27b",
  "applicationId": "structured-extraction",
  "role": "structured-output",
  "summary": "استخراج فیلد و JSON با schema",
  "description": "استخراج فیلد از متن؛ تولید خروجی مقید به schema به پشتیبانی موتور وابسته است.",
  "distinguishingFeature": "گردش‌کار طولانی با عامل متن–تصویر",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-6ef1dc4cde68af6f92"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-8-27b-reasoning-analysis",
  "modelVersionId": "model:qwen-qwen3-8-27b",
  "applicationId": "reasoning-analysis",
  "role": "reasoning",
  "summary": "استدلال با بودجهٔ تفکر مشخص",
  "description": "Qwen3.8-27B مدل متراکم متن–تصویر با کنترل thinking است؛ تمرکز معرفی آن بر کدنویسی، پژوهش و کارهای چندمرحله‌ای است.",
  "distinguishingFeature": "گردش‌کار طولانی با عامل متن–تصویر",
  "conditions": [
    "توکن‌های تفکر در زمان پاسخ و زمینه حساب شوند."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-6ef1dc4cde68af6f92"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-8-27b-coding-assistant",
  "modelVersionId": "model:qwen-qwen3-8-27b",
  "applicationId": "coding-assistant",
  "role": "coding",
  "summary": "تولید و اصلاح کد با آزمون",
  "description": "Qwen3.8-27B مدل متراکم متن–تصویر با کنترل thinking است؛ تمرکز معرفی آن بر کدنویسی، پژوهش و کارهای چندمرحله‌ای است.",
  "distinguishingFeature": "گردش‌کار طولانی با عامل متن–تصویر",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-6ef1dc4cde68af6f92"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-allenai-olmo-3-7b-instruct-enterprise-rag",
  "modelVersionId": "model:allenai-olmo-3-7b-instruct",
  "applicationId": "enterprise-rag",
  "role": "grounded-generation",
  "summary": "تولید پاسخ مستند در RAG",
  "description": "این مدل نویسندهٔ پاسخ است؛ بازیابی و بازرتبه‌بندی را اجزای جدا انجام می‌دهند.",
  "distinguishingFeature": "پژوهش دستورپذیری با مسیر آموزش قابل بررسی",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-7367d81634c9c1999e"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-allenai-olmo-3-7b-instruct-structured-extraction",
  "modelVersionId": "model:allenai-olmo-3-7b-instruct",
  "applicationId": "structured-extraction",
  "role": "structured-output",
  "summary": "استخراج فیلد و JSON با schema",
  "description": "استخراج فیلد از متن؛ تولید خروجی مقید به schema به پشتیبانی موتور وابسته است.",
  "distinguishingFeature": "پژوهش دستورپذیری با مسیر آموزش قابل بررسی",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-7367d81634c9c1999e"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-allenai-olmo-3-7b-instruct-coding-assistant",
  "modelVersionId": "model:allenai-olmo-3-7b-instruct",
  "applicationId": "coding-assistant",
  "role": "coding",
  "summary": "قطعه‌کد، توضیح و اصلاح محلی",
  "description": "Olmo 3 7B Instruct با داده‌های Dolma 3 و Dolci عرضه شده و انتشار جزئیات آموزش، آن را برای پژوهش بازتولیدپذیر متمایز می‌کند.",
  "distinguishingFeature": "پژوهش دستورپذیری با مسیر آموزش قابل بررسی",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-7367d81634c9c1999e"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-allenai-olmo-3-7b-instruct-agents-tools",
  "modelVersionId": "model:allenai-olmo-3-7b-instruct",
  "applicationId": "agents-tools",
  "role": "tool-use",
  "summary": "ابزارخوانی با parser سازگار",
  "description": "Olmo 3 7B Instruct با داده‌های Dolma 3 و Dolci عرضه شده و انتشار جزئیات آموزش، آن را برای پژوهش بازتولیدپذیر متمایز می‌کند.",
  "distinguishingFeature": "پژوهش دستورپذیری با مسیر آموزش قابل بررسی",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-7367d81634c9c1999e"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-deepseek-ai-deepseek-r1-0528-qwen3-8b-text-work",
  "modelVersionId": "model:deepseek-ai-deepseek-r1-0528-qwen3-8b",
  "applicationId": "text-work",
  "role": "text-generation",
  "summary": "چت، خلاصه‌سازی و بازنویسی",
  "description": "این مدل از پس‌آموزش Qwen3-8B-Base با زنجیره‌های استدلال DeepSeek-R1-0528 به دست آمده؛ با Qwen3-8B معمولی متفاوت است.",
  "distinguishingFeature": "آزمایش استدلال تقطیرشده از R1-0528",
  "conditions": [
    "برای پاسخ ساده، حالت تفکر را در صورت پشتیبانی خاموش یا بودجهٔ خروجی را محدود کنید."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-85cc9f3b5064833673"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-deepseek-ai-deepseek-r1-0528-qwen3-8b-enterprise-rag",
  "modelVersionId": "model:deepseek-ai-deepseek-r1-0528-qwen3-8b",
  "applicationId": "enterprise-rag",
  "role": "grounded-generation",
  "summary": "تولید پاسخ مستند در RAG",
  "description": "این مدل نویسندهٔ پاسخ است؛ بازیابی و بازرتبه‌بندی را اجزای جدا انجام می‌دهند.",
  "distinguishingFeature": "آزمایش استدلال تقطیرشده از R1-0528",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-85cc9f3b5064833673"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-deepseek-ai-deepseek-r1-0528-qwen3-8b-structured-extraction",
  "modelVersionId": "model:deepseek-ai-deepseek-r1-0528-qwen3-8b",
  "applicationId": "structured-extraction",
  "role": "structured-output",
  "summary": "استخراج فیلد و JSON با schema",
  "description": "استخراج فیلد از متن؛ تولید خروجی مقید به schema به پشتیبانی موتور وابسته است.",
  "distinguishingFeature": "آزمایش استدلال تقطیرشده از R1-0528",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-85cc9f3b5064833673"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-deepseek-ai-deepseek-r1-0528-qwen3-8b-coding-assistant",
  "modelVersionId": "model:deepseek-ai-deepseek-r1-0528-qwen3-8b",
  "applicationId": "coding-assistant",
  "role": "coding",
  "summary": "قطعه‌کد، توضیح و اصلاح محلی",
  "description": "این مدل از پس‌آموزش Qwen3-8B-Base با زنجیره‌های استدلال DeepSeek-R1-0528 به دست آمده؛ با Qwen3-8B معمولی متفاوت است.",
  "distinguishingFeature": "آزمایش استدلال تقطیرشده از R1-0528",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-85cc9f3b5064833673"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-deepseek-ai-deepseek-r1-0528-qwen3-8b-agents-tools",
  "modelVersionId": "model:deepseek-ai-deepseek-r1-0528-qwen3-8b",
  "applicationId": "agents-tools",
  "role": "tool-use",
  "summary": "ابزارخوانی با parser سازگار",
  "description": "این مدل از پس‌آموزش Qwen3-8B-Base با زنجیره‌های استدلال DeepSeek-R1-0528 به دست آمده؛ با Qwen3-8B معمولی متفاوت است.",
  "distinguishingFeature": "آزمایش استدلال تقطیرشده از R1-0528",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-85cc9f3b5064833673"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-deepseek-ai-deepseek-r1-distill-llama-70b-text-work",
  "modelVersionId": "model:deepseek-ai-deepseek-r1-distill-llama-70b",
  "applicationId": "text-work",
  "role": "text-generation",
  "summary": "چت، خلاصه‌سازی و بازنویسی",
  "description": "این checkpoint مسیر تقطیر R1 را روی پایهٔ Llama اجرا می‌کند و بزرگ‌ترین نسخهٔ تقطیری این فهرست است.",
  "distinguishingFeature": "استدلال تقطیرشده روی پایهٔ Llama 70B",
  "conditions": [
    "برای پاسخ ساده، حالت تفکر را در صورت پشتیبانی خاموش یا بودجهٔ خروجی را محدود کنید."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-6f0d230842d2e501bf"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-deepseek-ai-deepseek-r1-distill-llama-70b-enterprise-rag",
  "modelVersionId": "model:deepseek-ai-deepseek-r1-distill-llama-70b",
  "applicationId": "enterprise-rag",
  "role": "grounded-generation",
  "summary": "تولید پاسخ مستند در RAG",
  "description": "این مدل نویسندهٔ پاسخ است؛ بازیابی و بازرتبه‌بندی را اجزای جدا انجام می‌دهند.",
  "distinguishingFeature": "استدلال تقطیرشده روی پایهٔ Llama 70B",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-6f0d230842d2e501bf"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-deepseek-ai-deepseek-r1-distill-llama-70b-structured-extraction",
  "modelVersionId": "model:deepseek-ai-deepseek-r1-distill-llama-70b",
  "applicationId": "structured-extraction",
  "role": "structured-output",
  "summary": "استخراج فیلد و JSON با schema",
  "description": "استخراج فیلد از متن؛ تولید خروجی مقید به schema به پشتیبانی موتور وابسته است.",
  "distinguishingFeature": "استدلال تقطیرشده روی پایهٔ Llama 70B",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-6f0d230842d2e501bf"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-deepseek-ai-deepseek-r1-distill-llama-70b-coding-assistant",
  "modelVersionId": "model:deepseek-ai-deepseek-r1-distill-llama-70b",
  "applicationId": "coding-assistant",
  "role": "coding",
  "summary": "تولید و اصلاح کد با آزمون",
  "description": "این checkpoint مسیر تقطیر R1 را روی پایهٔ Llama اجرا می‌کند و بزرگ‌ترین نسخهٔ تقطیری این فهرست است.",
  "distinguishingFeature": "استدلال تقطیرشده روی پایهٔ Llama 70B",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-6f0d230842d2e501bf"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-deepseek-ai-deepseek-r1-distill-qwen-1-5b-text-work",
  "modelVersionId": "model:deepseek-ai-deepseek-r1-distill-qwen-1-5b",
  "applicationId": "text-work",
  "role": "text-generation",
  "summary": "چت و بازنویسی کوتاه",
  "description": "نسخهٔ ۱٫۵میلیاردی از تقطیر R1 روی Qwen2.5-Math ساخته شده و برای بررسی انتقال رفتار استدلال به مدل کوچک جالب است.",
  "distinguishingFeature": "آزمایش مرز استدلال در مدل تقطیری بسیار کوچک",
  "conditions": [
    "برای پاسخ ساده، حالت تفکر را در صورت پشتیبانی خاموش یا بودجهٔ خروجی را محدود کنید."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-d1dcd8b370f21f76e7"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-deepseek-ai-deepseek-r1-distill-qwen-1-5b-enterprise-rag",
  "modelVersionId": "model:deepseek-ai-deepseek-r1-distill-qwen-1-5b",
  "applicationId": "enterprise-rag",
  "role": "grounded-generation",
  "summary": "پاسخ از چند قطعهٔ کوتاه سند",
  "description": "این مدل نویسندهٔ پاسخ است؛ بازیابی و بازرتبه‌بندی را اجزای جدا انجام می‌دهند.",
  "distinguishingFeature": "آزمایش مرز استدلال در مدل تقطیری بسیار کوچک",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-d1dcd8b370f21f76e7"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-deepseek-ai-deepseek-r1-distill-qwen-1-5b-structured-extraction",
  "modelVersionId": "model:deepseek-ai-deepseek-r1-distill-qwen-1-5b",
  "applicationId": "structured-extraction",
  "role": "structured-output",
  "summary": "استخراج فیلدهای ساده با قالب ثابت",
  "description": "استخراج فیلد از متن؛ تولید خروجی مقید به schema به پشتیبانی موتور وابسته است.",
  "distinguishingFeature": "آزمایش مرز استدلال در مدل تقطیری بسیار کوچک",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-d1dcd8b370f21f76e7"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-deepseek-ai-deepseek-r1-distill-qwen-1-5b-coding-assistant",
  "modelVersionId": "model:deepseek-ai-deepseek-r1-distill-qwen-1-5b",
  "applicationId": "coding-assistant",
  "role": "coding",
  "summary": "قطعه‌کد، توضیح و اصلاح محلی",
  "description": "نسخهٔ ۱٫۵میلیاردی از تقطیر R1 روی Qwen2.5-Math ساخته شده و برای بررسی انتقال رفتار استدلال به مدل کوچک جالب است.",
  "distinguishingFeature": "آزمایش مرز استدلال در مدل تقطیری بسیار کوچک",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-d1dcd8b370f21f76e7"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-deepseek-ai-deepseek-r1-distill-qwen-14b-text-work",
  "modelVersionId": "model:deepseek-ai-deepseek-r1-distill-qwen-14b",
  "applicationId": "text-work",
  "role": "text-generation",
  "summary": "چت، خلاصه‌سازی و بازنویسی",
  "description": "DeepSeek-R1-Distill-Qwen-14B از Qwen2.5-14B و دادهٔ تولیدی R1 استفاده می‌کند؛ وزن آن متعلق به مدل کامل R1 نیست.",
  "distinguishingFeature": "حل مسئله با تقطیر R1 در اندازهٔ میانی",
  "conditions": [
    "برای پاسخ ساده، حالت تفکر را در صورت پشتیبانی خاموش یا بودجهٔ خروجی را محدود کنید."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-f7b9b749f262729f2d"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-deepseek-ai-deepseek-r1-distill-qwen-14b-enterprise-rag",
  "modelVersionId": "model:deepseek-ai-deepseek-r1-distill-qwen-14b",
  "applicationId": "enterprise-rag",
  "role": "grounded-generation",
  "summary": "تولید پاسخ مستند در RAG",
  "description": "این مدل نویسندهٔ پاسخ است؛ بازیابی و بازرتبه‌بندی را اجزای جدا انجام می‌دهند.",
  "distinguishingFeature": "حل مسئله با تقطیر R1 در اندازهٔ میانی",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-f7b9b749f262729f2d"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-deepseek-ai-deepseek-r1-distill-qwen-14b-structured-extraction",
  "modelVersionId": "model:deepseek-ai-deepseek-r1-distill-qwen-14b",
  "applicationId": "structured-extraction",
  "role": "structured-output",
  "summary": "استخراج فیلد و JSON با schema",
  "description": "استخراج فیلد از متن؛ تولید خروجی مقید به schema به پشتیبانی موتور وابسته است.",
  "distinguishingFeature": "حل مسئله با تقطیر R1 در اندازهٔ میانی",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-f7b9b749f262729f2d"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-deepseek-ai-deepseek-r1-distill-qwen-14b-coding-assistant",
  "modelVersionId": "model:deepseek-ai-deepseek-r1-distill-qwen-14b",
  "applicationId": "coding-assistant",
  "role": "coding",
  "summary": "تولید و اصلاح کد با آزمون",
  "description": "DeepSeek-R1-Distill-Qwen-14B از Qwen2.5-14B و دادهٔ تولیدی R1 استفاده می‌کند؛ وزن آن متعلق به مدل کامل R1 نیست.",
  "distinguishingFeature": "حل مسئله با تقطیر R1 در اندازهٔ میانی",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-f7b9b749f262729f2d"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-deepseek-ai-deepseek-r1-distill-qwen-32b-text-work",
  "modelVersionId": "model:deepseek-ai-deepseek-r1-distill-qwen-32b",
  "applicationId": "text-work",
  "role": "text-generation",
  "summary": "چت، خلاصه‌سازی و بازنویسی",
  "description": "نسخهٔ Qwen-32B مسیر تقطیر R1 را روی پایهٔ Qwen2.5 دنبال می‌کند.",
  "distinguishingFeature": "تحلیل و کدنویسی با تقطیر متراکم ۳۲میلیاردی",
  "conditions": [
    "برای پاسخ ساده، حالت تفکر را در صورت پشتیبانی خاموش یا بودجهٔ خروجی را محدود کنید."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-653e71cc77765cd433"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-deepseek-ai-deepseek-r1-distill-qwen-32b-enterprise-rag",
  "modelVersionId": "model:deepseek-ai-deepseek-r1-distill-qwen-32b",
  "applicationId": "enterprise-rag",
  "role": "grounded-generation",
  "summary": "تولید پاسخ مستند در RAG",
  "description": "این مدل نویسندهٔ پاسخ است؛ بازیابی و بازرتبه‌بندی را اجزای جدا انجام می‌دهند.",
  "distinguishingFeature": "تحلیل و کدنویسی با تقطیر متراکم ۳۲میلیاردی",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-653e71cc77765cd433"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-deepseek-ai-deepseek-r1-distill-qwen-32b-structured-extraction",
  "modelVersionId": "model:deepseek-ai-deepseek-r1-distill-qwen-32b",
  "applicationId": "structured-extraction",
  "role": "structured-output",
  "summary": "استخراج فیلد و JSON با schema",
  "description": "استخراج فیلد از متن؛ تولید خروجی مقید به schema به پشتیبانی موتور وابسته است.",
  "distinguishingFeature": "تحلیل و کدنویسی با تقطیر متراکم ۳۲میلیاردی",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-653e71cc77765cd433"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-deepseek-ai-deepseek-r1-distill-qwen-32b-coding-assistant",
  "modelVersionId": "model:deepseek-ai-deepseek-r1-distill-qwen-32b",
  "applicationId": "coding-assistant",
  "role": "coding",
  "summary": "تولید و اصلاح کد با آزمون",
  "description": "نسخهٔ Qwen-32B مسیر تقطیر R1 را روی پایهٔ Qwen2.5 دنبال می‌کند.",
  "distinguishingFeature": "تحلیل و کدنویسی با تقطیر متراکم ۳۲میلیاردی",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-653e71cc77765cd433"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-deepseek-ai-deepseek-r1-distill-qwen-7b-text-work",
  "modelVersionId": "model:deepseek-ai-deepseek-r1-distill-qwen-7b",
  "applicationId": "text-work",
  "role": "text-generation",
  "summary": "چت، خلاصه‌سازی و بازنویسی",
  "description": "این مدل از Qwen2.5-Math-7B به‌عنوان پایه استفاده می‌کند؛ با تقطیر جدیدتر R1-0528 روی Qwen3 یکی نیست.",
  "distinguishingFeature": "حل مسئله با نسخهٔ هفت‌میلیاردی تقطیر R1",
  "conditions": [
    "برای پاسخ ساده، حالت تفکر را در صورت پشتیبانی خاموش یا بودجهٔ خروجی را محدود کنید."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-6094f3fa17206810f9"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-deepseek-ai-deepseek-r1-distill-qwen-7b-enterprise-rag",
  "modelVersionId": "model:deepseek-ai-deepseek-r1-distill-qwen-7b",
  "applicationId": "enterprise-rag",
  "role": "grounded-generation",
  "summary": "تولید پاسخ مستند در RAG",
  "description": "این مدل نویسندهٔ پاسخ است؛ بازیابی و بازرتبه‌بندی را اجزای جدا انجام می‌دهند.",
  "distinguishingFeature": "حل مسئله با نسخهٔ هفت‌میلیاردی تقطیر R1",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-6094f3fa17206810f9"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-deepseek-ai-deepseek-r1-distill-qwen-7b-structured-extraction",
  "modelVersionId": "model:deepseek-ai-deepseek-r1-distill-qwen-7b",
  "applicationId": "structured-extraction",
  "role": "structured-output",
  "summary": "استخراج فیلد و JSON با schema",
  "description": "استخراج فیلد از متن؛ تولید خروجی مقید به schema به پشتیبانی موتور وابسته است.",
  "distinguishingFeature": "حل مسئله با نسخهٔ هفت‌میلیاردی تقطیر R1",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-6094f3fa17206810f9"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-deepseek-ai-deepseek-r1-distill-qwen-7b-coding-assistant",
  "modelVersionId": "model:deepseek-ai-deepseek-r1-distill-qwen-7b",
  "applicationId": "coding-assistant",
  "role": "coding",
  "summary": "قطعه‌کد، توضیح و اصلاح محلی",
  "description": "این مدل از Qwen2.5-Math-7B به‌عنوان پایه استفاده می‌کند؛ با تقطیر جدیدتر R1-0528 روی Qwen3 یکی نیست.",
  "distinguishingFeature": "حل مسئله با نسخهٔ هفت‌میلیاردی تقطیر R1",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-6094f3fa17206810f9"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-deepseek-ai-deepseek-v3-2-text-work",
  "modelVersionId": "model:deepseek-ai-deepseek-v3-2",
  "applicationId": "text-work",
  "role": "text-generation",
  "summary": "چت، خلاصه‌سازی و بازنویسی",
  "description": "DeepSeek-V3.2 توجه تنک DSA و پس‌آموزش عامل‌محور را ترکیب می‌کند؛ قالب چت آن نسبت به نسخه‌های پیشین تغییر کرده است.",
  "distinguishingFeature": "پیوند استدلال و ابزار در گردش‌کار عامل",
  "conditions": [
    "برای پاسخ ساده، حالت تفکر را در صورت پشتیبانی خاموش یا بودجهٔ خروجی را محدود کنید."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-d2be656087cfb13604"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-deepseek-ai-deepseek-v3-2-enterprise-rag",
  "modelVersionId": "model:deepseek-ai-deepseek-v3-2",
  "applicationId": "enterprise-rag",
  "role": "grounded-generation",
  "summary": "تولید پاسخ مستند در RAG",
  "description": "این مدل نویسندهٔ پاسخ است؛ بازیابی و بازرتبه‌بندی را اجزای جدا انجام می‌دهند.",
  "distinguishingFeature": "پیوند استدلال و ابزار در گردش‌کار عامل",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-d2be656087cfb13604"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-deepseek-ai-deepseek-v3-2-structured-extraction",
  "modelVersionId": "model:deepseek-ai-deepseek-v3-2",
  "applicationId": "structured-extraction",
  "role": "structured-output",
  "summary": "استخراج فیلد و JSON با schema",
  "description": "استخراج فیلد از متن؛ تولید خروجی مقید به schema به پشتیبانی موتور وابسته است.",
  "distinguishingFeature": "پیوند استدلال و ابزار در گردش‌کار عامل",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-d2be656087cfb13604"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-deepseek-ai-deepseek-v3-2-reasoning-analysis",
  "modelVersionId": "model:deepseek-ai-deepseek-v3-2",
  "applicationId": "reasoning-analysis",
  "role": "reasoning",
  "summary": "استدلال با بودجهٔ تفکر مشخص",
  "description": "DeepSeek-V3.2 توجه تنک DSA و پس‌آموزش عامل‌محور را ترکیب می‌کند؛ قالب چت آن نسبت به نسخه‌های پیشین تغییر کرده است.",
  "distinguishingFeature": "پیوند استدلال و ابزار در گردش‌کار عامل",
  "conditions": [
    "توکن‌های تفکر در زمان پاسخ و زمینه حساب شوند."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-d2be656087cfb13604"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-deepseek-ai-deepseek-v3-2-coding-assistant",
  "modelVersionId": "model:deepseek-ai-deepseek-v3-2",
  "applicationId": "coding-assistant",
  "role": "coding",
  "summary": "تولید و اصلاح کد با آزمون",
  "description": "DeepSeek-V3.2 توجه تنک DSA و پس‌آموزش عامل‌محور را ترکیب می‌کند؛ قالب چت آن نسبت به نسخه‌های پیشین تغییر کرده است.",
  "distinguishingFeature": "پیوند استدلال و ابزار در گردش‌کار عامل",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-d2be656087cfb13604"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-deepseek-ai-deepseek-v4-1-flash-text-work",
  "modelVersionId": "model:deepseek-ai-deepseek-v4-1-flash",
  "applicationId": "text-work",
  "role": "text-generation",
  "summary": "چت، خلاصه‌سازی و بازنویسی",
  "description": "DeepSeek-V4.1-Flash متن و تصویر را در معماری CED پردازش می‌کند؛ شمار پارامتر فعال در prefill و decode متفاوت است.",
  "distinguishingFeature": "عامل چندوجهی برای ورودی‌های بسیار بلند",
  "conditions": [
    "برای پاسخ ساده، حالت تفکر را در صورت پشتیبانی خاموش یا بودجهٔ خروجی را محدود کنید."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-96e933b164bfc6658d"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-deepseek-ai-deepseek-v4-1-flash-enterprise-rag",
  "modelVersionId": "model:deepseek-ai-deepseek-v4-1-flash",
  "applicationId": "enterprise-rag",
  "role": "grounded-generation",
  "summary": "تولید پاسخ مستند در RAG",
  "description": "این مدل نویسندهٔ پاسخ است؛ بازیابی و بازرتبه‌بندی را اجزای جدا انجام می‌دهند.",
  "distinguishingFeature": "عامل چندوجهی برای ورودی‌های بسیار بلند",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-96e933b164bfc6658d"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-deepseek-ai-deepseek-v4-1-flash-structured-extraction",
  "modelVersionId": "model:deepseek-ai-deepseek-v4-1-flash",
  "applicationId": "structured-extraction",
  "role": "structured-output",
  "summary": "استخراج فیلد و JSON با schema",
  "description": "استخراج فیلد از متن؛ تولید خروجی مقید به schema به پشتیبانی موتور وابسته است.",
  "distinguishingFeature": "عامل چندوجهی برای ورودی‌های بسیار بلند",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-96e933b164bfc6658d"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-deepseek-ai-deepseek-v4-1-flash-reasoning-analysis",
  "modelVersionId": "model:deepseek-ai-deepseek-v4-1-flash",
  "applicationId": "reasoning-analysis",
  "role": "reasoning",
  "summary": "استدلال با بودجهٔ تفکر مشخص",
  "description": "DeepSeek-V4.1-Flash متن و تصویر را در معماری CED پردازش می‌کند؛ شمار پارامتر فعال در prefill و decode متفاوت است.",
  "distinguishingFeature": "عامل چندوجهی برای ورودی‌های بسیار بلند",
  "conditions": [
    "توکن‌های تفکر در زمان پاسخ و زمینه حساب شوند."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-96e933b164bfc6658d"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-deepseek-ai-deepseek-v4-1-flash-coding-assistant",
  "modelVersionId": "model:deepseek-ai-deepseek-v4-1-flash",
  "applicationId": "coding-assistant",
  "role": "coding",
  "summary": "تولید و اصلاح کد با آزمون",
  "description": "DeepSeek-V4.1-Flash متن و تصویر را در معماری CED پردازش می‌کند؛ شمار پارامتر فعال در prefill و decode متفاوت است.",
  "distinguishingFeature": "عامل چندوجهی برای ورودی‌های بسیار بلند",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-96e933b164bfc6658d"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-google-gemma-3-12b-it-text-work",
  "modelVersionId": "model:google-gemma-3-12b-it",
  "applicationId": "text-work",
  "role": "text-generation",
  "summary": "چت، خلاصه‌سازی و بازنویسی",
  "description": "Gemma 3 12B IT نسخهٔ دستورپذیر چندوجهی با زمینهٔ ۱۳۱٬۰۷۲ توکن است؛ ورودی تصویر را به پاسخ متنی پیوند می‌دهد.",
  "distinguishingFeature": "پرسش از تصویر و متن با Gemma 3 میانی",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-a585b339d8df0103fa"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-google-gemma-3-12b-it-enterprise-rag",
  "modelVersionId": "model:google-gemma-3-12b-it",
  "applicationId": "enterprise-rag",
  "role": "grounded-generation",
  "summary": "تولید پاسخ مستند در RAG",
  "description": "این مدل نویسندهٔ پاسخ است؛ بازیابی و بازرتبه‌بندی را اجزای جدا انجام می‌دهند.",
  "distinguishingFeature": "پرسش از تصویر و متن با Gemma 3 میانی",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-a585b339d8df0103fa"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-google-gemma-3-12b-it-structured-extraction",
  "modelVersionId": "model:google-gemma-3-12b-it",
  "applicationId": "structured-extraction",
  "role": "structured-output",
  "summary": "استخراج فیلد و JSON با schema",
  "description": "استخراج فیلد از متن؛ تولید خروجی مقید به schema به پشتیبانی موتور وابسته است.",
  "distinguishingFeature": "پرسش از تصویر و متن با Gemma 3 میانی",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-a585b339d8df0103fa"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-google-gemma-3-12b-it-coding-assistant",
  "modelVersionId": "model:google-gemma-3-12b-it",
  "applicationId": "coding-assistant",
  "role": "coding",
  "summary": "تولید و اصلاح کد با آزمون",
  "description": "Gemma 3 12B IT نسخهٔ دستورپذیر چندوجهی با زمینهٔ ۱۳۱٬۰۷۲ توکن است؛ ورودی تصویر را به پاسخ متنی پیوند می‌دهد.",
  "distinguishingFeature": "پرسش از تصویر و متن با Gemma 3 میانی",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-a585b339d8df0103fa"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-google-gemma-3-1b-it-enterprise-rag",
  "modelVersionId": "model:google-gemma-3-1b-it",
  "applicationId": "enterprise-rag",
  "role": "grounded-generation",
  "summary": "پاسخ از چند قطعهٔ کوتاه سند",
  "description": "این مدل نویسندهٔ پاسخ است؛ بازیابی و بازرتبه‌بندی را اجزای جدا انجام می‌دهند.",
  "distinguishingFeature": "دستیار متنی کوچک از خانوادهٔ Gemma 3",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-1a289320089618d611"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-google-gemma-3-1b-it-structured-extraction",
  "modelVersionId": "model:google-gemma-3-1b-it",
  "applicationId": "structured-extraction",
  "role": "structured-output",
  "summary": "استخراج فیلدهای ساده با قالب ثابت",
  "description": "استخراج فیلد از متن؛ تولید خروجی مقید به schema به پشتیبانی موتور وابسته است.",
  "distinguishingFeature": "دستیار متنی کوچک از خانوادهٔ Gemma 3",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-1a289320089618d611"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-google-gemma-3-1b-it-coding-assistant",
  "modelVersionId": "model:google-gemma-3-1b-it",
  "applicationId": "coding-assistant",
  "role": "coding",
  "summary": "قطعه‌کد، توضیح و اصلاح محلی",
  "description": "Gemma 3 1B IT برخلاف نسخه‌های بزرگ‌تر این نسل فقط متن می‌گیرد و زمینهٔ ۳۲٬۷۶۸ توکن دارد.",
  "distinguishingFeature": "دستیار متنی کوچک از خانوادهٔ Gemma 3",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-1a289320089618d611"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-google-gemma-3-27b-it-text-work",
  "modelVersionId": "model:google-gemma-3-27b-it",
  "applicationId": "text-work",
  "role": "text-generation",
  "summary": "چت، خلاصه‌سازی و بازنویسی",
  "description": "Gemma 3 27B IT نسخهٔ متراکم بزرگ این نسل با ورودی بصری و پوشش چندزبانه است.",
  "distinguishingFeature": "درک متن و تصویر با بزرگ‌ترین Gemma 3 فهرست",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-967dd5737b7fe6620a"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-google-gemma-3-27b-it-enterprise-rag",
  "modelVersionId": "model:google-gemma-3-27b-it",
  "applicationId": "enterprise-rag",
  "role": "grounded-generation",
  "summary": "تولید پاسخ مستند در RAG",
  "description": "این مدل نویسندهٔ پاسخ است؛ بازیابی و بازرتبه‌بندی را اجزای جدا انجام می‌دهند.",
  "distinguishingFeature": "درک متن و تصویر با بزرگ‌ترین Gemma 3 فهرست",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-967dd5737b7fe6620a"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-google-gemma-3-27b-it-structured-extraction",
  "modelVersionId": "model:google-gemma-3-27b-it",
  "applicationId": "structured-extraction",
  "role": "structured-output",
  "summary": "استخراج فیلد و JSON با schema",
  "description": "استخراج فیلد از متن؛ تولید خروجی مقید به schema به پشتیبانی موتور وابسته است.",
  "distinguishingFeature": "درک متن و تصویر با بزرگ‌ترین Gemma 3 فهرست",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-967dd5737b7fe6620a"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-google-gemma-3-27b-it-coding-assistant",
  "modelVersionId": "model:google-gemma-3-27b-it",
  "applicationId": "coding-assistant",
  "role": "coding",
  "summary": "تولید و اصلاح کد با آزمون",
  "description": "Gemma 3 27B IT نسخهٔ متراکم بزرگ این نسل با ورودی بصری و پوشش چندزبانه است.",
  "distinguishingFeature": "درک متن و تصویر با بزرگ‌ترین Gemma 3 فهرست",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-967dd5737b7fe6620a"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-google-gemma-3-4b-it-text-work",
  "modelVersionId": "model:google-gemma-3-4b-it",
  "applicationId": "text-work",
  "role": "text-generation",
  "summary": "چت، خلاصه‌سازی و بازنویسی",
  "description": "Gemma 3 4B IT کوچک‌ترین مدل چندوجهی این نسل در فهرست است؛ برخلاف 1B می‌تواند تصویر را همراه متن بخواند.",
  "distinguishingFeature": "ورود به پردازش تصویر در خانوادهٔ Gemma 3",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-4fef75ec5619801c0c"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-google-gemma-3-4b-it-enterprise-rag",
  "modelVersionId": "model:google-gemma-3-4b-it",
  "applicationId": "enterprise-rag",
  "role": "grounded-generation",
  "summary": "تولید پاسخ مستند در RAG",
  "description": "این مدل نویسندهٔ پاسخ است؛ بازیابی و بازرتبه‌بندی را اجزای جدا انجام می‌دهند.",
  "distinguishingFeature": "ورود به پردازش تصویر در خانوادهٔ Gemma 3",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-4fef75ec5619801c0c"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-google-gemma-3-4b-it-structured-extraction",
  "modelVersionId": "model:google-gemma-3-4b-it",
  "applicationId": "structured-extraction",
  "role": "structured-output",
  "summary": "استخراج فیلد و JSON با schema",
  "description": "استخراج فیلد از متن؛ تولید خروجی مقید به schema به پشتیبانی موتور وابسته است.",
  "distinguishingFeature": "ورود به پردازش تصویر در خانوادهٔ Gemma 3",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-4fef75ec5619801c0c"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-google-gemma-3-4b-it-coding-assistant",
  "modelVersionId": "model:google-gemma-3-4b-it",
  "applicationId": "coding-assistant",
  "role": "coding",
  "summary": "قطعه‌کد، توضیح و اصلاح محلی",
  "description": "Gemma 3 4B IT کوچک‌ترین مدل چندوجهی این نسل در فهرست است؛ برخلاف 1B می‌تواند تصویر را همراه متن بخواند.",
  "distinguishingFeature": "ورود به پردازش تصویر در خانوادهٔ Gemma 3",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-4fef75ec5619801c0c"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-google-gemma-4-26b-a4b-it-text-work",
  "modelVersionId": "model:google-gemma-4-26b-a4b-it",
  "applicationId": "text-work",
  "role": "text-generation",
  "summary": "چت، خلاصه‌سازی و بازنویسی",
  "description": "Gemma 4 26B-A4B مدل خبرگانی با کنترل thinking و زمینهٔ ۲۶۲٬۱۴۴ توکن است؛ با نسخهٔ کوچک E2B معماری یکسانی ندارد.",
  "distinguishingFeature": "استدلال چندوجهی با Gemma 4 از نوع MoE",
  "conditions": [
    "برای پاسخ ساده، حالت تفکر را در صورت پشتیبانی خاموش یا بودجهٔ خروجی را محدود کنید."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-8c073f7e3729dadf20"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-google-gemma-4-26b-a4b-it-enterprise-rag",
  "modelVersionId": "model:google-gemma-4-26b-a4b-it",
  "applicationId": "enterprise-rag",
  "role": "grounded-generation",
  "summary": "تولید پاسخ مستند در RAG",
  "description": "این مدل نویسندهٔ پاسخ است؛ بازیابی و بازرتبه‌بندی را اجزای جدا انجام می‌دهند.",
  "distinguishingFeature": "استدلال چندوجهی با Gemma 4 از نوع MoE",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-8c073f7e3729dadf20"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-google-gemma-4-26b-a4b-it-structured-extraction",
  "modelVersionId": "model:google-gemma-4-26b-a4b-it",
  "applicationId": "structured-extraction",
  "role": "structured-output",
  "summary": "استخراج فیلد و JSON با schema",
  "description": "استخراج فیلد از متن؛ تولید خروجی مقید به schema به پشتیبانی موتور وابسته است.",
  "distinguishingFeature": "استدلال چندوجهی با Gemma 4 از نوع MoE",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-8c073f7e3729dadf20"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-google-gemma-4-26b-a4b-it-coding-assistant",
  "modelVersionId": "model:google-gemma-4-26b-a4b-it",
  "applicationId": "coding-assistant",
  "role": "coding",
  "summary": "تولید و اصلاح کد با آزمون",
  "description": "Gemma 4 26B-A4B مدل خبرگانی با کنترل thinking و زمینهٔ ۲۶۲٬۱۴۴ توکن است؛ با نسخهٔ کوچک E2B معماری یکسانی ندارد.",
  "distinguishingFeature": "استدلال چندوجهی با Gemma 4 از نوع MoE",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-8c073f7e3729dadf20"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-google-gemma-4-26b-a4b-it-agents-tools",
  "modelVersionId": "model:google-gemma-4-26b-a4b-it",
  "applicationId": "agents-tools",
  "role": "tool-use",
  "summary": "ابزارخوانی با parser سازگار",
  "description": "Gemma 4 26B-A4B مدل خبرگانی با کنترل thinking و زمینهٔ ۲۶۲٬۱۴۴ توکن است؛ با نسخهٔ کوچک E2B معماری یکسانی ندارد.",
  "distinguishingFeature": "استدلال چندوجهی با Gemma 4 از نوع MoE",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-8c073f7e3729dadf20"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-google-gemma-4-e2b-it-text-work",
  "modelVersionId": "model:google-gemma-4-e2b-it",
  "applicationId": "text-work",
  "role": "text-generation",
  "summary": "چت، خلاصه‌سازی و بازنویسی",
  "description": "Gemma 4 E2B برای اجرای روی دستگاه معرفی شده و ورودی صوت را نیز پشتیبانی می‌کند؛ E2B شمار مؤثر است، نه کل وزن‌ها.",
  "distinguishingFeature": "پردازش محلی متن، تصویر و صوت با Gemma 4 کوچک",
  "conditions": [
    "برای پاسخ ساده، حالت تفکر را در صورت پشتیبانی خاموش یا بودجهٔ خروجی را محدود کنید."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-a557e664812e64393e"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-google-gemma-4-e2b-it-enterprise-rag",
  "modelVersionId": "model:google-gemma-4-e2b-it",
  "applicationId": "enterprise-rag",
  "role": "grounded-generation",
  "summary": "تولید پاسخ مستند در RAG",
  "description": "این مدل نویسندهٔ پاسخ است؛ بازیابی و بازرتبه‌بندی را اجزای جدا انجام می‌دهند.",
  "distinguishingFeature": "پردازش محلی متن، تصویر و صوت با Gemma 4 کوچک",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-a557e664812e64393e"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-google-gemma-4-e2b-it-structured-extraction",
  "modelVersionId": "model:google-gemma-4-e2b-it",
  "applicationId": "structured-extraction",
  "role": "structured-output",
  "summary": "استخراج فیلد و JSON با schema",
  "description": "استخراج فیلد از متن؛ تولید خروجی مقید به schema به پشتیبانی موتور وابسته است.",
  "distinguishingFeature": "پردازش محلی متن، تصویر و صوت با Gemma 4 کوچک",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-a557e664812e64393e"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-google-gemma-4-e2b-it-reasoning-analysis",
  "modelVersionId": "model:google-gemma-4-e2b-it",
  "applicationId": "reasoning-analysis",
  "role": "reasoning",
  "summary": "استدلال با بودجهٔ تفکر مشخص",
  "description": "Gemma 4 E2B برای اجرای روی دستگاه معرفی شده و ورودی صوت را نیز پشتیبانی می‌کند؛ E2B شمار مؤثر است، نه کل وزن‌ها.",
  "distinguishingFeature": "پردازش محلی متن، تصویر و صوت با Gemma 4 کوچک",
  "conditions": [
    "توکن‌های تفکر در زمان پاسخ و زمینه حساب شوند."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-a557e664812e64393e"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-google-gemma-4-e2b-it-coding-assistant",
  "modelVersionId": "model:google-gemma-4-e2b-it",
  "applicationId": "coding-assistant",
  "role": "coding",
  "summary": "تولید و اصلاح کد با آزمون",
  "description": "Gemma 4 E2B برای اجرای روی دستگاه معرفی شده و ورودی صوت را نیز پشتیبانی می‌کند؛ E2B شمار مؤثر است، نه کل وزن‌ها.",
  "distinguishingFeature": "پردازش محلی متن، تصویر و صوت با Gemma 4 کوچک",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-a557e664812e64393e"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-google-gemma-4-e2b-it-agents-tools",
  "modelVersionId": "model:google-gemma-4-e2b-it",
  "applicationId": "agents-tools",
  "role": "tool-use",
  "summary": "ابزارخوانی با parser سازگار",
  "description": "Gemma 4 E2B برای اجرای روی دستگاه معرفی شده و ورودی صوت را نیز پشتیبانی می‌کند؛ E2B شمار مؤثر است، نه کل وزن‌ها.",
  "distinguishingFeature": "پردازش محلی متن، تصویر و صوت با Gemma 4 کوچک",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-a557e664812e64393e"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-ibm-granite-granite-3-3-2b-instruct-text-work",
  "modelVersionId": "model:ibm-granite-granite-3-3-2b-instruct",
  "applicationId": "text-work",
  "role": "text-generation",
  "summary": "چت و بازنویسی کوتاه",
  "description": "Granite 3.3 2B Instruct مدل کوچک کسب‌وکارمحور با RAG، خلاصه‌سازی، استخراج متن و حالت تفکر است.",
  "distinguishingFeature": "تولید پاسخ از اسناد بازیابی‌شده",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-0734c7ad0dd63a75da"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-ibm-granite-granite-3-3-2b-instruct-coding-assistant",
  "modelVersionId": "model:ibm-granite-granite-3-3-2b-instruct",
  "applicationId": "coding-assistant",
  "role": "coding",
  "summary": "قطعه‌کد، توضیح و اصلاح محلی",
  "description": "Granite 3.3 2B Instruct مدل کوچک کسب‌وکارمحور با RAG، خلاصه‌سازی، استخراج متن و حالت تفکر است.",
  "distinguishingFeature": "تولید پاسخ از اسناد بازیابی‌شده",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-0734c7ad0dd63a75da"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-ibm-granite-granite-3-3-2b-instruct-agents-tools",
  "modelVersionId": "model:ibm-granite-granite-3-3-2b-instruct",
  "applicationId": "agents-tools",
  "role": "tool-use",
  "summary": "ابزارخوانی با parser سازگار",
  "description": "Granite 3.3 2B Instruct مدل کوچک کسب‌وکارمحور با RAG، خلاصه‌سازی، استخراج متن و حالت تفکر است.",
  "distinguishingFeature": "تولید پاسخ از اسناد بازیابی‌شده",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-0734c7ad0dd63a75da"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-meta-llama-llama-3-1-70b-instruct-enterprise-rag",
  "modelVersionId": "model:meta-llama-llama-3-1-70b-instruct",
  "applicationId": "enterprise-rag",
  "role": "grounded-generation",
  "summary": "تولید پاسخ مستند در RAG",
  "description": "این مدل نویسندهٔ پاسخ است؛ بازیابی و بازرتبه‌بندی را اجزای جدا انجام می‌دهند.",
  "distinguishingFeature": "دستیار عمومی با Llama 3.1 بزرگ",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-026934816cbcae04b5"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-meta-llama-llama-3-1-70b-instruct-structured-extraction",
  "modelVersionId": "model:meta-llama-llama-3-1-70b-instruct",
  "applicationId": "structured-extraction",
  "role": "structured-output",
  "summary": "استخراج فیلد و JSON با schema",
  "description": "استخراج فیلد از متن؛ تولید خروجی مقید به schema به پشتیبانی موتور وابسته است.",
  "distinguishingFeature": "دستیار عمومی با Llama 3.1 بزرگ",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-026934816cbcae04b5"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-meta-llama-llama-3-1-70b-instruct-coding-assistant",
  "modelVersionId": "model:meta-llama-llama-3-1-70b-instruct",
  "applicationId": "coding-assistant",
  "role": "coding",
  "summary": "تولید و اصلاح کد با آزمون",
  "description": "Llama 3.1 70B Instruct برای گفت‌وگوی چندزبانه و کار با متن با زمینهٔ ۱۳۱٬۰۷۲ توکن عرضه شده است.",
  "distinguishingFeature": "دستیار عمومی با Llama 3.1 بزرگ",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-026934816cbcae04b5"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-meta-llama-llama-3-1-70b-instruct-agents-tools",
  "modelVersionId": "model:meta-llama-llama-3-1-70b-instruct",
  "applicationId": "agents-tools",
  "role": "tool-use",
  "summary": "ابزارخوانی با parser سازگار",
  "description": "Llama 3.1 70B Instruct برای گفت‌وگوی چندزبانه و کار با متن با زمینهٔ ۱۳۱٬۰۷۲ توکن عرضه شده است.",
  "distinguishingFeature": "دستیار عمومی با Llama 3.1 بزرگ",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-026934816cbcae04b5"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-meta-llama-llama-3-1-8b-instruct-enterprise-rag",
  "modelVersionId": "model:meta-llama-llama-3-1-8b-instruct",
  "applicationId": "enterprise-rag",
  "role": "grounded-generation",
  "summary": "تولید پاسخ مستند در RAG",
  "description": "این مدل نویسندهٔ پاسخ است؛ بازیابی و بازرتبه‌بندی را اجزای جدا انجام می‌دهند.",
  "distinguishingFeature": "گفت‌وگو و کار با متن با Llama 3.1 هشت‌میلیاردی",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-5a3e61cbfee9a9dd77"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-meta-llama-llama-3-1-8b-instruct-structured-extraction",
  "modelVersionId": "model:meta-llama-llama-3-1-8b-instruct",
  "applicationId": "structured-extraction",
  "role": "structured-output",
  "summary": "استخراج فیلد و JSON با schema",
  "description": "استخراج فیلد از متن؛ تولید خروجی مقید به schema به پشتیبانی موتور وابسته است.",
  "distinguishingFeature": "گفت‌وگو و کار با متن با Llama 3.1 هشت‌میلیاردی",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-5a3e61cbfee9a9dd77"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-meta-llama-llama-3-1-8b-instruct-coding-assistant",
  "modelVersionId": "model:meta-llama-llama-3-1-8b-instruct",
  "applicationId": "coding-assistant",
  "role": "coding",
  "summary": "قطعه‌کد، توضیح و اصلاح محلی",
  "description": "نسخهٔ 8B از Llama 3.1 برای دستیار عمومی و پیروی از دستور تنظیم شده و با مدل پایهٔ همان اندازه فرق دارد.",
  "distinguishingFeature": "گفت‌وگو و کار با متن با Llama 3.1 هشت‌میلیاردی",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-5a3e61cbfee9a9dd77"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-meta-llama-llama-3-1-8b-instruct-agents-tools",
  "modelVersionId": "model:meta-llama-llama-3-1-8b-instruct",
  "applicationId": "agents-tools",
  "role": "tool-use",
  "summary": "ابزارخوانی با parser سازگار",
  "description": "نسخهٔ 8B از Llama 3.1 برای دستیار عمومی و پیروی از دستور تنظیم شده و با مدل پایهٔ همان اندازه فرق دارد.",
  "distinguishingFeature": "گفت‌وگو و کار با متن با Llama 3.1 هشت‌میلیاردی",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-5a3e61cbfee9a9dd77"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-meta-llama-llama-3-2-1b-instruct-enterprise-rag",
  "modelVersionId": "model:meta-llama-llama-3-2-1b-instruct",
  "applicationId": "enterprise-rag",
  "role": "grounded-generation",
  "summary": "پاسخ از چند قطعهٔ کوتاه سند",
  "description": "این مدل نویسندهٔ پاسخ است؛ بازیابی و بازرتبه‌بندی را اجزای جدا انجام می‌دهند.",
  "distinguishingFeature": "بازنویسی و خلاصه‌سازی محلی با Llama کوچک",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-04665e2c2232e334fc"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-meta-llama-llama-3-2-1b-instruct-structured-extraction",
  "modelVersionId": "model:meta-llama-llama-3-2-1b-instruct",
  "applicationId": "structured-extraction",
  "role": "structured-output",
  "summary": "استخراج فیلدهای ساده با قالب ثابت",
  "description": "استخراج فیلد از متن؛ تولید خروجی مقید به schema به پشتیبانی موتور وابسته است.",
  "distinguishingFeature": "بازنویسی و خلاصه‌سازی محلی با Llama کوچک",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-04665e2c2232e334fc"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-meta-llama-llama-3-2-1b-instruct-coding-assistant",
  "modelVersionId": "model:meta-llama-llama-3-2-1b-instruct",
  "applicationId": "coding-assistant",
  "role": "coding",
  "summary": "قطعه‌کد، توضیح و اصلاح محلی",
  "description": "Llama 3.2 1B Instruct مدل متنی کوچک این نسل است؛ برای کارهای محدود روی متن در دستگاه‌های محلی معرفی شده است.",
  "distinguishingFeature": "بازنویسی و خلاصه‌سازی محلی با Llama کوچک",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-04665e2c2232e334fc"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-meta-llama-llama-3-2-1b-instruct-agents-tools",
  "modelVersionId": "model:meta-llama-llama-3-2-1b-instruct",
  "applicationId": "agents-tools",
  "role": "tool-use",
  "summary": "ابزارخوانی با parser سازگار",
  "description": "Llama 3.2 1B Instruct مدل متنی کوچک این نسل است؛ برای کارهای محدود روی متن در دستگاه‌های محلی معرفی شده است.",
  "distinguishingFeature": "بازنویسی و خلاصه‌سازی محلی با Llama کوچک",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-04665e2c2232e334fc"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-meta-llama-llama-3-2-3b-instruct-enterprise-rag",
  "modelVersionId": "model:meta-llama-llama-3-2-3b-instruct",
  "applicationId": "enterprise-rag",
  "role": "grounded-generation",
  "summary": "تولید پاسخ مستند در RAG",
  "description": "این مدل نویسندهٔ پاسخ است؛ بازیابی و بازرتبه‌بندی را اجزای جدا انجام می‌دهند.",
  "distinguishingFeature": "دستیار متنی روی دستگاه با Llama سه‌میلیاردی",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-40a0310c45dda9cde0"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-meta-llama-llama-3-2-3b-instruct-structured-extraction",
  "modelVersionId": "model:meta-llama-llama-3-2-3b-instruct",
  "applicationId": "structured-extraction",
  "role": "structured-output",
  "summary": "استخراج فیلد و JSON با schema",
  "description": "استخراج فیلد از متن؛ تولید خروجی مقید به schema به پشتیبانی موتور وابسته است.",
  "distinguishingFeature": "دستیار متنی روی دستگاه با Llama سه‌میلیاردی",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-40a0310c45dda9cde0"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-meta-llama-llama-3-2-3b-instruct-coding-assistant",
  "modelVersionId": "model:meta-llama-llama-3-2-3b-instruct",
  "applicationId": "coding-assistant",
  "role": "coding",
  "summary": "قطعه‌کد، توضیح و اصلاح محلی",
  "description": "Llama 3.2 3B Instruct برای گفت‌وگو، بازنویسی و خلاصه‌سازی تنظیم شده و از نسخهٔ 1B ظرفیت پارامتری بیشتری دارد.",
  "distinguishingFeature": "دستیار متنی روی دستگاه با Llama سه‌میلیاردی",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-40a0310c45dda9cde0"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-meta-llama-llama-3-2-3b-instruct-agents-tools",
  "modelVersionId": "model:meta-llama-llama-3-2-3b-instruct",
  "applicationId": "agents-tools",
  "role": "tool-use",
  "summary": "ابزارخوانی با parser سازگار",
  "description": "Llama 3.2 3B Instruct برای گفت‌وگو، بازنویسی و خلاصه‌سازی تنظیم شده و از نسخهٔ 1B ظرفیت پارامتری بیشتری دارد.",
  "distinguishingFeature": "دستیار متنی روی دستگاه با Llama سه‌میلیاردی",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-40a0310c45dda9cde0"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-microsoft-phi-4-mini-instruct-text-work",
  "modelVersionId": "model:microsoft-phi-4-mini-instruct",
  "applicationId": "text-work",
  "role": "text-generation",
  "summary": "چت، خلاصه‌سازی و بازنویسی",
  "description": "Phi-4-mini-instruct با تمرکز بر داده‌های استدلالی و پیروی از دستور ساخته شده و زمینهٔ ۱۳۱٬۰۷۲ توکن دارد.",
  "distinguishingFeature": "تحلیل و منطق در محیط محدودتر",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-ba9cd843c0a35040af"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-microsoft-phi-4-mini-instruct-enterprise-rag",
  "modelVersionId": "model:microsoft-phi-4-mini-instruct",
  "applicationId": "enterprise-rag",
  "role": "grounded-generation",
  "summary": "تولید پاسخ مستند در RAG",
  "description": "این مدل نویسندهٔ پاسخ است؛ بازیابی و بازرتبه‌بندی را اجزای جدا انجام می‌دهند.",
  "distinguishingFeature": "تحلیل و منطق در محیط محدودتر",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-ba9cd843c0a35040af"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-microsoft-phi-4-mini-instruct-structured-extraction",
  "modelVersionId": "model:microsoft-phi-4-mini-instruct",
  "applicationId": "structured-extraction",
  "role": "structured-output",
  "summary": "استخراج فیلد و JSON با schema",
  "description": "استخراج فیلد از متن؛ تولید خروجی مقید به schema به پشتیبانی موتور وابسته است.",
  "distinguishingFeature": "تحلیل و منطق در محیط محدودتر",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-ba9cd843c0a35040af"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-microsoft-phi-4-mini-instruct-coding-assistant",
  "modelVersionId": "model:microsoft-phi-4-mini-instruct",
  "applicationId": "coding-assistant",
  "role": "coding",
  "summary": "قطعه‌کد، توضیح و اصلاح محلی",
  "description": "Phi-4-mini-instruct با تمرکز بر داده‌های استدلالی و پیروی از دستور ساخته شده و زمینهٔ ۱۳۱٬۰۷۲ توکن دارد.",
  "distinguishingFeature": "تحلیل و منطق در محیط محدودتر",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-ba9cd843c0a35040af"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-microsoft-phi-4-mini-instruct-agents-tools",
  "modelVersionId": "model:microsoft-phi-4-mini-instruct",
  "applicationId": "agents-tools",
  "role": "tool-use",
  "summary": "ابزارخوانی با parser سازگار",
  "description": "Phi-4-mini-instruct با تمرکز بر داده‌های استدلالی و پیروی از دستور ساخته شده و زمینهٔ ۱۳۱٬۰۷۲ توکن دارد.",
  "distinguishingFeature": "تحلیل و منطق در محیط محدودتر",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-ba9cd843c0a35040af"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-mistralai-devstral-small-2-24b-instruct-2512-text-work",
  "modelVersionId": "model:mistralai-devstral-small-2-24b-instruct-2512",
  "applicationId": "text-work",
  "role": "text-generation",
  "summary": "چت، خلاصه‌سازی و بازنویسی",
  "description": "Devstral Small 2 برای مهندسی نرم‌افزار و استفاده از ابزار برای بررسی و اصلاح کد ساخته شده؛ این نسل ورودی تصویر نیز دارد.",
  "distinguishingFeature": "عامل ویرایش چندفایلی و جست‌وجوی مخزن",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-143cf593115d83d150"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-mistralai-devstral-small-2-24b-instruct-2512-enterprise-rag",
  "modelVersionId": "model:mistralai-devstral-small-2-24b-instruct-2512",
  "applicationId": "enterprise-rag",
  "role": "grounded-generation",
  "summary": "تولید پاسخ مستند در RAG",
  "description": "این مدل نویسندهٔ پاسخ است؛ بازیابی و بازرتبه‌بندی را اجزای جدا انجام می‌دهند.",
  "distinguishingFeature": "عامل ویرایش چندفایلی و جست‌وجوی مخزن",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-143cf593115d83d150"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-mistralai-devstral-small-2-24b-instruct-2512-structured-extraction",
  "modelVersionId": "model:mistralai-devstral-small-2-24b-instruct-2512",
  "applicationId": "structured-extraction",
  "role": "structured-output",
  "summary": "استخراج فیلد و JSON با schema",
  "description": "استخراج فیلد از متن؛ تولید خروجی مقید به schema به پشتیبانی موتور وابسته است.",
  "distinguishingFeature": "عامل ویرایش چندفایلی و جست‌وجوی مخزن",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-143cf593115d83d150"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-mistralai-devstral-small-2-24b-instruct-2512-document-vision",
  "modelVersionId": "model:mistralai-devstral-small-2-24b-instruct-2512",
  "applicationId": "document-vision",
  "role": "vision",
  "summary": "فهم تصویر و سند اسکن‌شده",
  "description": "Devstral Small 2 برای مهندسی نرم‌افزار و استفاده از ابزار برای بررسی و اصلاح کد ساخته شده؛ این نسل ورودی تصویر نیز دارد.",
  "distinguishingFeature": "عامل ویرایش چندفایلی و جست‌وجوی مخزن",
  "conditions": [
    "پردازشگر تصویر و اجزای بینایی همین نسخه لازم‌اند؛ تعداد تصویر، وضوح و فریم‌ها مصرف حافظه را تغییر می‌دهد."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-143cf593115d83d150"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-mistralai-ministral-3-3b-instruct-2512-text-work",
  "modelVersionId": "model:mistralai-ministral-3-3b-instruct-2512",
  "applicationId": "text-work",
  "role": "text-generation",
  "summary": "چت، خلاصه‌سازی و بازنویسی",
  "description": "Ministral 3 3B Instruct مدل کوچک متن–تصویر این خانواده است؛ بخش زبان ۳٫۴ و رمزگذار تصویر ۰٫۴میلیارد پارامتر دارند.",
  "distinguishingFeature": "دستیار چندوجهی برای استقرار لبه",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-422e53fb9ef68804c9"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-mistralai-ministral-3-3b-instruct-2512-enterprise-rag",
  "modelVersionId": "model:mistralai-ministral-3-3b-instruct-2512",
  "applicationId": "enterprise-rag",
  "role": "grounded-generation",
  "summary": "تولید پاسخ مستند در RAG",
  "description": "این مدل نویسندهٔ پاسخ است؛ بازیابی و بازرتبه‌بندی را اجزای جدا انجام می‌دهند.",
  "distinguishingFeature": "دستیار چندوجهی برای استقرار لبه",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-422e53fb9ef68804c9"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-mistralai-ministral-3-3b-instruct-2512-structured-extraction",
  "modelVersionId": "model:mistralai-ministral-3-3b-instruct-2512",
  "applicationId": "structured-extraction",
  "role": "structured-output",
  "summary": "استخراج فیلد و JSON با schema",
  "description": "استخراج فیلد از متن؛ تولید خروجی مقید به schema به پشتیبانی موتور وابسته است.",
  "distinguishingFeature": "دستیار چندوجهی برای استقرار لبه",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-422e53fb9ef68804c9"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-mistralai-ministral-3-3b-instruct-2512-coding-assistant",
  "modelVersionId": "model:mistralai-ministral-3-3b-instruct-2512",
  "applicationId": "coding-assistant",
  "role": "coding",
  "summary": "تولید و اصلاح کد با آزمون",
  "description": "Ministral 3 3B Instruct مدل کوچک متن–تصویر این خانواده است؛ بخش زبان ۳٫۴ و رمزگذار تصویر ۰٫۴میلیارد پارامتر دارند.",
  "distinguishingFeature": "دستیار چندوجهی برای استقرار لبه",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-422e53fb9ef68804c9"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-mistralai-ministral-3-3b-instruct-2512-agents-tools",
  "modelVersionId": "model:mistralai-ministral-3-3b-instruct-2512",
  "applicationId": "agents-tools",
  "role": "tool-use",
  "summary": "ابزارخوانی با parser سازگار",
  "description": "Ministral 3 3B Instruct مدل کوچک متن–تصویر این خانواده است؛ بخش زبان ۳٫۴ و رمزگذار تصویر ۰٫۴میلیارد پارامتر دارند.",
  "distinguishingFeature": "دستیار چندوجهی برای استقرار لبه",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-422e53fb9ef68804c9"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-mistralai-mistral-7b-instruct-v0-3-text-work",
  "modelVersionId": "model:mistralai-mistral-7b-instruct-v0-3",
  "applicationId": "text-work",
  "role": "text-generation",
  "summary": "چت، خلاصه‌سازی و بازنویسی",
  "description": "Mistral 7B Instruct v0.3 tokenizer نسخهٔ سوم و قابلیت فراخوانی تابع را به این مدل متنی اضافه کرده است.",
  "distinguishingFeature": "دستیار متنی با قالب فراخوانی تابع Mistral",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-d38ebbe65582b41c27"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-mistralai-mistral-7b-instruct-v0-3-enterprise-rag",
  "modelVersionId": "model:mistralai-mistral-7b-instruct-v0-3",
  "applicationId": "enterprise-rag",
  "role": "grounded-generation",
  "summary": "تولید پاسخ مستند در RAG",
  "description": "این مدل نویسندهٔ پاسخ است؛ بازیابی و بازرتبه‌بندی را اجزای جدا انجام می‌دهند.",
  "distinguishingFeature": "دستیار متنی با قالب فراخوانی تابع Mistral",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-d38ebbe65582b41c27"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-mistralai-mistral-7b-instruct-v0-3-structured-extraction",
  "modelVersionId": "model:mistralai-mistral-7b-instruct-v0-3",
  "applicationId": "structured-extraction",
  "role": "structured-output",
  "summary": "استخراج فیلد و JSON با schema",
  "description": "استخراج فیلد از متن؛ تولید خروجی مقید به schema به پشتیبانی موتور وابسته است.",
  "distinguishingFeature": "دستیار متنی با قالب فراخوانی تابع Mistral",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-d38ebbe65582b41c27"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-mistralai-mistral-small-3-1-24b-instruct-2503-text-work",
  "modelVersionId": "model:mistralai-mistral-small-3-1-24b-instruct-2503",
  "applicationId": "text-work",
  "role": "text-generation",
  "summary": "چت، خلاصه‌سازی و بازنویسی",
  "description": "Mistral Small 3.1 24B Instruct پردازش تصویر و زمینهٔ بلند را به نسل Small افزوده؛ فارسی در فهرست زبان‌های ناشر آمده است.",
  "distinguishingFeature": "دستیار چندزبانهٔ متن و تصویر",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-87c60f49d69f5b94bc"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-mistralai-mistral-small-3-1-24b-instruct-2503-enterprise-rag",
  "modelVersionId": "model:mistralai-mistral-small-3-1-24b-instruct-2503",
  "applicationId": "enterprise-rag",
  "role": "grounded-generation",
  "summary": "تولید پاسخ مستند در RAG",
  "description": "این مدل نویسندهٔ پاسخ است؛ بازیابی و بازرتبه‌بندی را اجزای جدا انجام می‌دهند.",
  "distinguishingFeature": "دستیار چندزبانهٔ متن و تصویر",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-87c60f49d69f5b94bc"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-mistralai-mistral-small-3-1-24b-instruct-2503-coding-assistant",
  "modelVersionId": "model:mistralai-mistral-small-3-1-24b-instruct-2503",
  "applicationId": "coding-assistant",
  "role": "coding",
  "summary": "تولید و اصلاح کد با آزمون",
  "description": "Mistral Small 3.1 24B Instruct پردازش تصویر و زمینهٔ بلند را به نسل Small افزوده؛ فارسی در فهرست زبان‌های ناشر آمده است.",
  "distinguishingFeature": "دستیار چندزبانهٔ متن و تصویر",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-87c60f49d69f5b94bc"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-mistralai-mistral-small-3-1-24b-instruct-2503-agents-tools",
  "modelVersionId": "model:mistralai-mistral-small-3-1-24b-instruct-2503",
  "applicationId": "agents-tools",
  "role": "tool-use",
  "summary": "ابزارخوانی با parser سازگار",
  "description": "Mistral Small 3.1 24B Instruct پردازش تصویر و زمینهٔ بلند را به نسل Small افزوده؛ فارسی در فهرست زبان‌های ناشر آمده است.",
  "distinguishingFeature": "دستیار چندزبانهٔ متن و تصویر",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-87c60f49d69f5b94bc"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-nvidia-nvidia-nemotron-nano-9b-v2-text-work",
  "modelVersionId": "model:nvidia-nvidia-nemotron-nano-9b-v2",
  "applicationId": "text-work",
  "role": "text-generation",
  "summary": "چت، خلاصه‌سازی و بازنویسی",
  "description": "Nemotron Nano 9B v2 ترکیبی از Mamba-2 و attention است؛ حالت reasoning و بودجهٔ فکرکردن را می‌توان کنترل کرد.",
  "distinguishingFeature": "پاسخ از سند با کنترل بودجهٔ استدلال",
  "conditions": [
    "برای پاسخ ساده، حالت تفکر را در صورت پشتیبانی خاموش یا بودجهٔ خروجی را محدود کنید."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-01e476ff57f8263d52"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-nvidia-nvidia-nemotron-nano-9b-v2-structured-extraction",
  "modelVersionId": "model:nvidia-nvidia-nemotron-nano-9b-v2",
  "applicationId": "structured-extraction",
  "role": "structured-output",
  "summary": "استخراج فیلد و JSON با schema",
  "description": "استخراج فیلد از متن؛ تولید خروجی مقید به schema به پشتیبانی موتور وابسته است.",
  "distinguishingFeature": "پاسخ از سند با کنترل بودجهٔ استدلال",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-01e476ff57f8263d52"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-nvidia-nvidia-nemotron-nano-9b-v2-reasoning-analysis",
  "modelVersionId": "model:nvidia-nvidia-nemotron-nano-9b-v2",
  "applicationId": "reasoning-analysis",
  "role": "reasoning",
  "summary": "استدلال با بودجهٔ تفکر مشخص",
  "description": "Nemotron Nano 9B v2 ترکیبی از Mamba-2 و attention است؛ حالت reasoning و بودجهٔ فکرکردن را می‌توان کنترل کرد.",
  "distinguishingFeature": "پاسخ از سند با کنترل بودجهٔ استدلال",
  "conditions": [
    "توکن‌های تفکر در زمان پاسخ و زمینه حساب شوند."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-01e476ff57f8263d52"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-nvidia-nvidia-nemotron-nano-9b-v2-coding-assistant",
  "modelVersionId": "model:nvidia-nvidia-nemotron-nano-9b-v2",
  "applicationId": "coding-assistant",
  "role": "coding",
  "summary": "تولید و اصلاح کد با آزمون",
  "description": "Nemotron Nano 9B v2 ترکیبی از Mamba-2 و attention است؛ حالت reasoning و بودجهٔ فکرکردن را می‌توان کنترل کرد.",
  "distinguishingFeature": "پاسخ از سند با کنترل بودجهٔ استدلال",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-01e476ff57f8263d52"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-nvidia-nvidia-nemotron-nano-9b-v2-agents-tools",
  "modelVersionId": "model:nvidia-nvidia-nemotron-nano-9b-v2",
  "applicationId": "agents-tools",
  "role": "tool-use",
  "summary": "ابزارخوانی با parser سازگار",
  "description": "Nemotron Nano 9B v2 ترکیبی از Mamba-2 و attention است؛ حالت reasoning و بودجهٔ فکرکردن را می‌توان کنترل کرد.",
  "distinguishingFeature": "پاسخ از سند با کنترل بودجهٔ استدلال",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-01e476ff57f8263d52"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-openai-gpt-oss-120b-text-work",
  "modelVersionId": "model:openai-gpt-oss-120b",
  "applicationId": "text-work",
  "role": "text-generation",
  "summary": "چت، خلاصه‌سازی و بازنویسی",
  "description": "gpt-oss-120b مدل MoE با ۱۱۷میلیارد پارامتر کل و ۵٫۱میلیارد فعال است؛ وزن‌های خبرگان با MXFP4 عرضه شده‌اند.",
  "distinguishingFeature": "عامل با استدلال قابل تنظیم در نسخهٔ بزرگ gpt-oss",
  "conditions": [
    "برای پاسخ ساده، حالت تفکر را در صورت پشتیبانی خاموش یا بودجهٔ خروجی را محدود کنید."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-576214d889218d9022"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-openai-gpt-oss-120b-enterprise-rag",
  "modelVersionId": "model:openai-gpt-oss-120b",
  "applicationId": "enterprise-rag",
  "role": "grounded-generation",
  "summary": "تولید پاسخ مستند در RAG",
  "description": "این مدل نویسندهٔ پاسخ است؛ بازیابی و بازرتبه‌بندی را اجزای جدا انجام می‌دهند.",
  "distinguishingFeature": "عامل با استدلال قابل تنظیم در نسخهٔ بزرگ gpt-oss",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-576214d889218d9022"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-openai-gpt-oss-120b-structured-extraction",
  "modelVersionId": "model:openai-gpt-oss-120b",
  "applicationId": "structured-extraction",
  "role": "structured-output",
  "summary": "استخراج فیلد و JSON با schema",
  "description": "استخراج فیلد از متن؛ تولید خروجی مقید به schema به پشتیبانی موتور وابسته است.",
  "distinguishingFeature": "عامل با استدلال قابل تنظیم در نسخهٔ بزرگ gpt-oss",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-576214d889218d9022"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-openai-gpt-oss-120b-reasoning-analysis",
  "modelVersionId": "model:openai-gpt-oss-120b",
  "applicationId": "reasoning-analysis",
  "role": "reasoning",
  "summary": "استدلال با بودجهٔ تفکر مشخص",
  "description": "gpt-oss-120b مدل MoE با ۱۱۷میلیارد پارامتر کل و ۵٫۱میلیارد فعال است؛ وزن‌های خبرگان با MXFP4 عرضه شده‌اند.",
  "distinguishingFeature": "عامل با استدلال قابل تنظیم در نسخهٔ بزرگ gpt-oss",
  "conditions": [
    "توکن‌های تفکر در زمان پاسخ و زمینه حساب شوند."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-576214d889218d9022"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-openai-gpt-oss-20b-text-work",
  "modelVersionId": "model:openai-gpt-oss-20b",
  "applicationId": "text-work",
  "role": "text-generation",
  "summary": "چت، خلاصه‌سازی و بازنویسی",
  "description": "gpt-oss-20b با ۲۱میلیارد پارامتر کل و ۳٫۶میلیارد فعال برای کاربرد محلی یا تخصصی معرفی شده؛ سه سطح reasoning دارد.",
  "distinguishingFeature": "استدلال محلی با نسخهٔ کوچک‌تر gpt-oss",
  "conditions": [
    "برای پاسخ ساده، حالت تفکر را در صورت پشتیبانی خاموش یا بودجهٔ خروجی را محدود کنید."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-fd7d1b23f44c3bb39c"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-openai-gpt-oss-20b-enterprise-rag",
  "modelVersionId": "model:openai-gpt-oss-20b",
  "applicationId": "enterprise-rag",
  "role": "grounded-generation",
  "summary": "تولید پاسخ مستند در RAG",
  "description": "این مدل نویسندهٔ پاسخ است؛ بازیابی و بازرتبه‌بندی را اجزای جدا انجام می‌دهند.",
  "distinguishingFeature": "استدلال محلی با نسخهٔ کوچک‌تر gpt-oss",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-fd7d1b23f44c3bb39c"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-openai-gpt-oss-20b-structured-extraction",
  "modelVersionId": "model:openai-gpt-oss-20b",
  "applicationId": "structured-extraction",
  "role": "structured-output",
  "summary": "استخراج فیلد و JSON با schema",
  "description": "استخراج فیلد از متن؛ تولید خروجی مقید به schema به پشتیبانی موتور وابسته است.",
  "distinguishingFeature": "استدلال محلی با نسخهٔ کوچک‌تر gpt-oss",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-fd7d1b23f44c3bb39c"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-openai-gpt-oss-20b-agents-tools",
  "modelVersionId": "model:openai-gpt-oss-20b",
  "applicationId": "agents-tools",
  "role": "tool-use",
  "summary": "ابزارخوانی با parser سازگار",
  "description": "gpt-oss-20b با ۲۱میلیارد پارامتر کل و ۳٫۶میلیارد فعال برای کاربرد محلی یا تخصصی معرفی شده؛ سه سطح reasoning دارد.",
  "distinguishingFeature": "استدلال محلی با نسخهٔ کوچک‌تر gpt-oss",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-fd7d1b23f44c3bb39c"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-zai-org-glm-4-7-flash-text-work",
  "modelVersionId": "model:zai-org-glm-4-7-flash",
  "applicationId": "text-work",
  "role": "text-generation",
  "summary": "چت، خلاصه‌سازی و بازنویسی",
  "description": "GLM-4.7-Flash مدل MoE از ردهٔ 30B-A3B است؛ کارت مدل برای کارهای عامل چندمرحله‌ای به حفظ thinking بین نوبت‌ها اشاره می‌کند.",
  "distinguishingFeature": "عامل برنامه‌نویسی با استدلال حفظ‌شونده",
  "conditions": [
    "برای پاسخ ساده، حالت تفکر را در صورت پشتیبانی خاموش یا بودجهٔ خروجی را محدود کنید."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-49f871c97c4c5f3728"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-zai-org-glm-4-7-flash-enterprise-rag",
  "modelVersionId": "model:zai-org-glm-4-7-flash",
  "applicationId": "enterprise-rag",
  "role": "grounded-generation",
  "summary": "تولید پاسخ مستند در RAG",
  "description": "این مدل نویسندهٔ پاسخ است؛ بازیابی و بازرتبه‌بندی را اجزای جدا انجام می‌دهند.",
  "distinguishingFeature": "عامل برنامه‌نویسی با استدلال حفظ‌شونده",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-49f871c97c4c5f3728"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-zai-org-glm-4-7-flash-structured-extraction",
  "modelVersionId": "model:zai-org-glm-4-7-flash",
  "applicationId": "structured-extraction",
  "role": "structured-output",
  "summary": "استخراج فیلد و JSON با schema",
  "description": "استخراج فیلد از متن؛ تولید خروجی مقید به schema به پشتیبانی موتور وابسته است.",
  "distinguishingFeature": "عامل برنامه‌نویسی با استدلال حفظ‌شونده",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-49f871c97c4c5f3728"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-zai-org-glm-4-7-flash-reasoning-analysis",
  "modelVersionId": "model:zai-org-glm-4-7-flash",
  "applicationId": "reasoning-analysis",
  "role": "reasoning",
  "summary": "استدلال با بودجهٔ تفکر مشخص",
  "description": "GLM-4.7-Flash مدل MoE از ردهٔ 30B-A3B است؛ کارت مدل برای کارهای عامل چندمرحله‌ای به حفظ thinking بین نوبت‌ها اشاره می‌کند.",
  "distinguishingFeature": "عامل برنامه‌نویسی با استدلال حفظ‌شونده",
  "conditions": [
    "توکن‌های تفکر در زمان پاسخ و زمینه حساب شوند."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-49f871c97c4c5f3728"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-zai-org-glm-4-7-flash-coding-assistant",
  "modelVersionId": "model:zai-org-glm-4-7-flash",
  "applicationId": "coding-assistant",
  "role": "coding",
  "summary": "تولید و اصلاح کد با آزمون",
  "description": "GLM-4.7-Flash مدل MoE از ردهٔ 30B-A3B است؛ کارت مدل برای کارهای عامل چندمرحله‌ای به حفظ thinking بین نوبت‌ها اشاره می‌کند.",
  "distinguishingFeature": "عامل برنامه‌نویسی با استدلال حفظ‌شونده",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-49f871c97c4c5f3728"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-moonshotai-kimi-k2-instruct-text-work",
  "modelVersionId": "model:moonshotai-kimi-k2-instruct",
  "applicationId": "text-work",
  "role": "text-generation",
  "summary": "چت، خلاصه‌سازی و بازنویسی",
  "description": "عامل متنی برای برنامه‌نویسی و گردش‌کارهای ابزارمحور.",
  "distinguishingFeature": "عامل متنی برای برنامه‌نویسی و گردش‌کارهای ابزارمحور",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-640c88f0733f107c4f"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-moonshotai-kimi-k2-instruct-enterprise-rag",
  "modelVersionId": "model:moonshotai-kimi-k2-instruct",
  "applicationId": "enterprise-rag",
  "role": "grounded-generation",
  "summary": "تولید پاسخ مستند در RAG",
  "description": "این مدل نویسندهٔ پاسخ است؛ بازیابی و بازرتبه‌بندی را اجزای جدا انجام می‌دهند.",
  "distinguishingFeature": "عامل متنی برای برنامه‌نویسی و گردش‌کارهای ابزارمحور",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-640c88f0733f107c4f"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-moonshotai-kimi-k2-instruct-structured-extraction",
  "modelVersionId": "model:moonshotai-kimi-k2-instruct",
  "applicationId": "structured-extraction",
  "role": "structured-output",
  "summary": "استخراج فیلد و JSON با schema",
  "description": "استخراج فیلد از متن؛ تولید خروجی مقید به schema به پشتیبانی موتور وابسته است.",
  "distinguishingFeature": "عامل متنی برای برنامه‌نویسی و گردش‌کارهای ابزارمحور",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-640c88f0733f107c4f"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-moonshotai-kimi-k2-instruct-coding-assistant",
  "modelVersionId": "model:moonshotai-kimi-k2-instruct",
  "applicationId": "coding-assistant",
  "role": "coding",
  "summary": "دستیار تخصصی کد و اصلاح پروژه",
  "description": "عامل متنی برای برنامه‌نویسی و گردش‌کارهای ابزارمحور.",
  "distinguishingFeature": "عامل متنی برای برنامه‌نویسی و گردش‌کارهای ابزارمحور",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-640c88f0733f107c4f"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-moonshotai-kimi-k2-instruct-agents-tools",
  "modelVersionId": "model:moonshotai-kimi-k2-instruct",
  "applicationId": "agents-tools",
  "role": "tool-use",
  "summary": "ابزارخوانی با parser سازگار",
  "description": "عامل متنی برای برنامه‌نویسی و گردش‌کارهای ابزارمحور.",
  "distinguishingFeature": "عامل متنی برای برنامه‌نویسی و گردش‌کارهای ابزارمحور",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-640c88f0733f107c4f"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-moonshotai-kimi-k2-thinking-text-work",
  "modelVersionId": "model:moonshotai-kimi-k2-thinking",
  "applicationId": "text-work",
  "role": "text-generation",
  "summary": "چت، خلاصه‌سازی و بازنویسی",
  "description": "عامل استدلالی برای زنجیره‌های طولانی ابزار و تحلیل.",
  "distinguishingFeature": "عامل استدلالی برای زنجیره‌های طولانی ابزار و تحلیل",
  "conditions": [
    "برای پاسخ ساده، حالت تفکر را در صورت پشتیبانی خاموش یا بودجهٔ خروجی را محدود کنید."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-e39860c72daa7bc47e"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-moonshotai-kimi-k2-thinking-enterprise-rag",
  "modelVersionId": "model:moonshotai-kimi-k2-thinking",
  "applicationId": "enterprise-rag",
  "role": "grounded-generation",
  "summary": "تولید پاسخ مستند در RAG",
  "description": "این مدل نویسندهٔ پاسخ است؛ بازیابی و بازرتبه‌بندی را اجزای جدا انجام می‌دهند.",
  "distinguishingFeature": "عامل استدلالی برای زنجیره‌های طولانی ابزار و تحلیل",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-e39860c72daa7bc47e"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-moonshotai-kimi-k2-thinking-structured-extraction",
  "modelVersionId": "model:moonshotai-kimi-k2-thinking",
  "applicationId": "structured-extraction",
  "role": "structured-output",
  "summary": "استخراج فیلد و JSON با schema",
  "description": "استخراج فیلد از متن؛ تولید خروجی مقید به schema به پشتیبانی موتور وابسته است.",
  "distinguishingFeature": "عامل استدلالی برای زنجیره‌های طولانی ابزار و تحلیل",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-e39860c72daa7bc47e"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-moonshotai-kimi-k2-thinking-reasoning-analysis",
  "modelVersionId": "model:moonshotai-kimi-k2-thinking",
  "applicationId": "reasoning-analysis",
  "role": "reasoning",
  "summary": "استدلال با بودجهٔ تفکر مشخص",
  "description": "عامل استدلالی برای زنجیره‌های طولانی ابزار و تحلیل.",
  "distinguishingFeature": "عامل استدلالی برای زنجیره‌های طولانی ابزار و تحلیل",
  "conditions": [
    "توکن‌های تفکر در زمان پاسخ و زمینه حساب شوند."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-e39860c72daa7bc47e"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-moonshotai-kimi-k2-thinking-coding-assistant",
  "modelVersionId": "model:moonshotai-kimi-k2-thinking",
  "applicationId": "coding-assistant",
  "role": "coding",
  "summary": "دستیار تخصصی کد و اصلاح پروژه",
  "description": "عامل استدلالی برای زنجیره‌های طولانی ابزار و تحلیل.",
  "distinguishingFeature": "عامل استدلالی برای زنجیره‌های طولانی ابزار و تحلیل",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-e39860c72daa7bc47e"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-moonshotai-kimi-k2-thinking-agents-tools",
  "modelVersionId": "model:moonshotai-kimi-k2-thinking",
  "applicationId": "agents-tools",
  "role": "tool-use",
  "summary": "ابزارخوانی با parser سازگار",
  "description": "عامل استدلالی برای زنجیره‌های طولانی ابزار و تحلیل.",
  "distinguishingFeature": "عامل استدلالی برای زنجیره‌های طولانی ابزار و تحلیل",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-e39860c72daa7bc47e"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-moonshotai-kimi-k2-5-text-work",
  "modelVersionId": "model:moonshotai-kimi-k2-5",
  "applicationId": "text-work",
  "role": "text-generation",
  "summary": "چت، خلاصه‌سازی و بازنویسی",
  "description": "عامل چندوجهی برای کدنویسی از طرح تصویری و تحلیل سند.",
  "distinguishingFeature": "عامل چندوجهی برای کدنویسی از طرح تصویری و تحلیل سند",
  "conditions": [
    "برای پاسخ ساده، حالت تفکر را در صورت پشتیبانی خاموش یا بودجهٔ خروجی را محدود کنید."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-c0e496ce377d981915"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-moonshotai-kimi-k2-5-enterprise-rag",
  "modelVersionId": "model:moonshotai-kimi-k2-5",
  "applicationId": "enterprise-rag",
  "role": "grounded-generation",
  "summary": "تولید پاسخ مستند در RAG",
  "description": "این مدل نویسندهٔ پاسخ است؛ بازیابی و بازرتبه‌بندی را اجزای جدا انجام می‌دهند.",
  "distinguishingFeature": "عامل چندوجهی برای کدنویسی از طرح تصویری و تحلیل سند",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-c0e496ce377d981915"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-moonshotai-kimi-k2-5-structured-extraction",
  "modelVersionId": "model:moonshotai-kimi-k2-5",
  "applicationId": "structured-extraction",
  "role": "structured-output",
  "summary": "استخراج فیلد و JSON با schema",
  "description": "استخراج فیلد از متن؛ تولید خروجی مقید به schema به پشتیبانی موتور وابسته است.",
  "distinguishingFeature": "عامل چندوجهی برای کدنویسی از طرح تصویری و تحلیل سند",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-c0e496ce377d981915"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-moonshotai-kimi-k2-5-reasoning-analysis",
  "modelVersionId": "model:moonshotai-kimi-k2-5",
  "applicationId": "reasoning-analysis",
  "role": "reasoning",
  "summary": "استدلال با بودجهٔ تفکر مشخص",
  "description": "عامل چندوجهی برای کدنویسی از طرح تصویری و تحلیل سند.",
  "distinguishingFeature": "عامل چندوجهی برای کدنویسی از طرح تصویری و تحلیل سند",
  "conditions": [
    "توکن‌های تفکر در زمان پاسخ و زمینه حساب شوند."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-c0e496ce377d981915"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-moonshotai-kimi-k2-5-coding-assistant",
  "modelVersionId": "model:moonshotai-kimi-k2-5",
  "applicationId": "coding-assistant",
  "role": "coding",
  "summary": "دستیار تخصصی کد و اصلاح پروژه",
  "description": "عامل چندوجهی برای کدنویسی از طرح تصویری و تحلیل سند.",
  "distinguishingFeature": "عامل چندوجهی برای کدنویسی از طرح تصویری و تحلیل سند",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-c0e496ce377d981915"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-moonshotai-kimi-k2-5-agents-tools",
  "modelVersionId": "model:moonshotai-kimi-k2-5",
  "applicationId": "agents-tools",
  "role": "tool-use",
  "summary": "ابزارخوانی با parser سازگار",
  "description": "عامل چندوجهی برای کدنویسی از طرح تصویری و تحلیل سند.",
  "distinguishingFeature": "عامل چندوجهی برای کدنویسی از طرح تصویری و تحلیل سند",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-c0e496ce377d981915"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-moonshotai-kimi-k2-5-document-vision",
  "modelVersionId": "model:moonshotai-kimi-k2-5",
  "applicationId": "document-vision",
  "role": "vision",
  "summary": "فهم تصویر و فریم‌های ویدئو",
  "description": "عامل چندوجهی برای کدنویسی از طرح تصویری و تحلیل سند.",
  "distinguishingFeature": "عامل چندوجهی برای کدنویسی از طرح تصویری و تحلیل سند",
  "conditions": [
    "پردازشگر تصویر و اجزای بینایی همین نسخه لازم‌اند؛ تعداد تصویر، وضوح و فریم‌ها مصرف حافظه را تغییر می‌دهد."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-c0e496ce377d981915"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-minimaxai-minimax-m2-5-text-work",
  "modelVersionId": "model:minimaxai-minimax-m2-5",
  "applicationId": "text-work",
  "role": "text-generation",
  "summary": "چت، خلاصه‌سازی و بازنویسی",
  "description": "دستیار توسعه نرم‌افزار و گردش‌کارهای ابزارمحور.",
  "distinguishingFeature": "دستیار توسعه نرم‌افزار و گردش‌کارهای ابزارمحور",
  "conditions": [
    "برای پاسخ ساده، حالت تفکر را در صورت پشتیبانی خاموش یا بودجهٔ خروجی را محدود کنید."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-7640341105ebedc8e6"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-minimaxai-minimax-m2-5-enterprise-rag",
  "modelVersionId": "model:minimaxai-minimax-m2-5",
  "applicationId": "enterprise-rag",
  "role": "grounded-generation",
  "summary": "تولید پاسخ مستند در RAG",
  "description": "این مدل نویسندهٔ پاسخ است؛ بازیابی و بازرتبه‌بندی را اجزای جدا انجام می‌دهند.",
  "distinguishingFeature": "دستیار توسعه نرم‌افزار و گردش‌کارهای ابزارمحور",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-7640341105ebedc8e6"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-minimaxai-minimax-m2-5-structured-extraction",
  "modelVersionId": "model:minimaxai-minimax-m2-5",
  "applicationId": "structured-extraction",
  "role": "structured-output",
  "summary": "استخراج فیلد و JSON با schema",
  "description": "استخراج فیلد از متن؛ تولید خروجی مقید به schema به پشتیبانی موتور وابسته است.",
  "distinguishingFeature": "دستیار توسعه نرم‌افزار و گردش‌کارهای ابزارمحور",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-7640341105ebedc8e6"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-minimaxai-minimax-m2-5-reasoning-analysis",
  "modelVersionId": "model:minimaxai-minimax-m2-5",
  "applicationId": "reasoning-analysis",
  "role": "reasoning",
  "summary": "استدلال با بودجهٔ تفکر مشخص",
  "description": "دستیار توسعه نرم‌افزار و گردش‌کارهای ابزارمحور.",
  "distinguishingFeature": "دستیار توسعه نرم‌افزار و گردش‌کارهای ابزارمحور",
  "conditions": [
    "توکن‌های تفکر در زمان پاسخ و زمینه حساب شوند."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-7640341105ebedc8e6"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-minimaxai-minimax-m2-5-coding-assistant",
  "modelVersionId": "model:minimaxai-minimax-m2-5",
  "applicationId": "coding-assistant",
  "role": "coding",
  "summary": "دستیار تخصصی کد و اصلاح پروژه",
  "description": "دستیار توسعه نرم‌افزار و گردش‌کارهای ابزارمحور.",
  "distinguishingFeature": "دستیار توسعه نرم‌افزار و گردش‌کارهای ابزارمحور",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-7640341105ebedc8e6"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-minimaxai-minimax-m2-5-agents-tools",
  "modelVersionId": "model:minimaxai-minimax-m2-5",
  "applicationId": "agents-tools",
  "role": "tool-use",
  "summary": "ابزارخوانی با parser سازگار",
  "description": "دستیار توسعه نرم‌افزار و گردش‌کارهای ابزارمحور.",
  "distinguishingFeature": "دستیار توسعه نرم‌افزار و گردش‌کارهای ابزارمحور",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-7640341105ebedc8e6"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-minimaxai-minimax-m2-1-text-work",
  "modelVersionId": "model:minimaxai-minimax-m2-1",
  "applicationId": "text-work",
  "role": "text-generation",
  "summary": "چت، خلاصه‌سازی و بازنویسی",
  "description": "مدل ابزارمحور برای کدنویسی و برنامه‌ریزی چندمرحله‌ای.",
  "distinguishingFeature": "مدل ابزارمحور برای کدنویسی و برنامه‌ریزی چندمرحله‌ای",
  "conditions": [
    "برای پاسخ ساده، حالت تفکر را در صورت پشتیبانی خاموش یا بودجهٔ خروجی را محدود کنید."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-3f3c5c51b03688076f"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-minimaxai-minimax-m2-1-enterprise-rag",
  "modelVersionId": "model:minimaxai-minimax-m2-1",
  "applicationId": "enterprise-rag",
  "role": "grounded-generation",
  "summary": "تولید پاسخ مستند در RAG",
  "description": "این مدل نویسندهٔ پاسخ است؛ بازیابی و بازرتبه‌بندی را اجزای جدا انجام می‌دهند.",
  "distinguishingFeature": "مدل ابزارمحور برای کدنویسی و برنامه‌ریزی چندمرحله‌ای",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-3f3c5c51b03688076f"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-minimaxai-minimax-m2-1-structured-extraction",
  "modelVersionId": "model:minimaxai-minimax-m2-1",
  "applicationId": "structured-extraction",
  "role": "structured-output",
  "summary": "استخراج فیلد و JSON با schema",
  "description": "استخراج فیلد از متن؛ تولید خروجی مقید به schema به پشتیبانی موتور وابسته است.",
  "distinguishingFeature": "مدل ابزارمحور برای کدنویسی و برنامه‌ریزی چندمرحله‌ای",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-3f3c5c51b03688076f"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-minimaxai-minimax-m2-1-reasoning-analysis",
  "modelVersionId": "model:minimaxai-minimax-m2-1",
  "applicationId": "reasoning-analysis",
  "role": "reasoning",
  "summary": "استدلال با بودجهٔ تفکر مشخص",
  "description": "مدل ابزارمحور برای کدنویسی و برنامه‌ریزی چندمرحله‌ای.",
  "distinguishingFeature": "مدل ابزارمحور برای کدنویسی و برنامه‌ریزی چندمرحله‌ای",
  "conditions": [
    "توکن‌های تفکر در زمان پاسخ و زمینه حساب شوند."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-3f3c5c51b03688076f"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-minimaxai-minimax-m2-1-coding-assistant",
  "modelVersionId": "model:minimaxai-minimax-m2-1",
  "applicationId": "coding-assistant",
  "role": "coding",
  "summary": "دستیار تخصصی کد و اصلاح پروژه",
  "description": "مدل ابزارمحور برای کدنویسی و برنامه‌ریزی چندمرحله‌ای.",
  "distinguishingFeature": "مدل ابزارمحور برای کدنویسی و برنامه‌ریزی چندمرحله‌ای",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-3f3c5c51b03688076f"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-minimaxai-minimax-m2-1-agents-tools",
  "modelVersionId": "model:minimaxai-minimax-m2-1",
  "applicationId": "agents-tools",
  "role": "tool-use",
  "summary": "ابزارخوانی با parser سازگار",
  "description": "مدل ابزارمحور برای کدنویسی و برنامه‌ریزی چندمرحله‌ای.",
  "distinguishingFeature": "مدل ابزارمحور برای کدنویسی و برنامه‌ریزی چندمرحله‌ای",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-3f3c5c51b03688076f"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-235b-a22b-instruct-2507-text-work",
  "modelVersionId": "model:qwen-qwen3-235b-a22b-instruct-2507",
  "applicationId": "text-work",
  "role": "text-generation",
  "summary": "چت، خلاصه‌سازی و بازنویسی",
  "description": "دستیار بزرگ با پاسخ مستقیم و زمینهٔ بلند.",
  "distinguishingFeature": "دستیار بزرگ با پاسخ مستقیم و زمینهٔ بلند",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-e72fa22f5d039b4315"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-235b-a22b-instruct-2507-enterprise-rag",
  "modelVersionId": "model:qwen-qwen3-235b-a22b-instruct-2507",
  "applicationId": "enterprise-rag",
  "role": "grounded-generation",
  "summary": "تولید پاسخ مستند در RAG",
  "description": "این مدل نویسندهٔ پاسخ است؛ بازیابی و بازرتبه‌بندی را اجزای جدا انجام می‌دهند.",
  "distinguishingFeature": "دستیار بزرگ با پاسخ مستقیم و زمینهٔ بلند",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-e72fa22f5d039b4315"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-235b-a22b-instruct-2507-structured-extraction",
  "modelVersionId": "model:qwen-qwen3-235b-a22b-instruct-2507",
  "applicationId": "structured-extraction",
  "role": "structured-output",
  "summary": "استخراج فیلد و JSON با schema",
  "description": "استخراج فیلد از متن؛ تولید خروجی مقید به schema به پشتیبانی موتور وابسته است.",
  "distinguishingFeature": "دستیار بزرگ با پاسخ مستقیم و زمینهٔ بلند",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-e72fa22f5d039b4315"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-235b-a22b-instruct-2507-reasoning-analysis",
  "modelVersionId": "model:qwen-qwen3-235b-a22b-instruct-2507",
  "applicationId": "reasoning-analysis",
  "role": "reasoning",
  "summary": "استدلال با بودجهٔ تفکر مشخص",
  "description": "دستیار بزرگ با پاسخ مستقیم و زمینهٔ بلند.",
  "distinguishingFeature": "دستیار بزرگ با پاسخ مستقیم و زمینهٔ بلند",
  "conditions": [
    "این checkpoint فقط پاسخ مستقیم تولید می‌کند؛ حالت thinking جداگانه ندارد."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-e72fa22f5d039b4315"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-235b-a22b-instruct-2507-coding-assistant",
  "modelVersionId": "model:qwen-qwen3-235b-a22b-instruct-2507",
  "applicationId": "coding-assistant",
  "role": "coding",
  "summary": "تولید و اصلاح کد با آزمون",
  "description": "دستیار بزرگ با پاسخ مستقیم و زمینهٔ بلند.",
  "distinguishingFeature": "دستیار بزرگ با پاسخ مستقیم و زمینهٔ بلند",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-e72fa22f5d039b4315"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-235b-a22b-instruct-2507-agents-tools",
  "modelVersionId": "model:qwen-qwen3-235b-a22b-instruct-2507",
  "applicationId": "agents-tools",
  "role": "tool-use",
  "summary": "ابزارخوانی با parser سازگار",
  "description": "دستیار بزرگ با پاسخ مستقیم و زمینهٔ بلند.",
  "distinguishingFeature": "دستیار بزرگ با پاسخ مستقیم و زمینهٔ بلند",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-e72fa22f5d039b4315"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-coder-480b-a35b-instruct-text-work",
  "modelVersionId": "model:qwen-qwen3-coder-480b-a35b-instruct",
  "applicationId": "text-work",
  "role": "text-generation",
  "summary": "چت، خلاصه‌سازی و بازنویسی",
  "description": "عامل کدنویسی برای مخزنهای بزرگ و چندفایلی.",
  "distinguishingFeature": "عامل کدنویسی برای مخزنهای بزرگ و چندفایلی",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-f647db3a19c9a0deea"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-coder-480b-a35b-instruct-enterprise-rag",
  "modelVersionId": "model:qwen-qwen3-coder-480b-a35b-instruct",
  "applicationId": "enterprise-rag",
  "role": "grounded-generation",
  "summary": "تولید پاسخ مستند در RAG",
  "description": "این مدل نویسندهٔ پاسخ است؛ بازیابی و بازرتبه‌بندی را اجزای جدا انجام می‌دهند.",
  "distinguishingFeature": "عامل کدنویسی برای مخزنهای بزرگ و چندفایلی",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-f647db3a19c9a0deea"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-coder-480b-a35b-instruct-structured-extraction",
  "modelVersionId": "model:qwen-qwen3-coder-480b-a35b-instruct",
  "applicationId": "structured-extraction",
  "role": "structured-output",
  "summary": "استخراج فیلد و JSON با schema",
  "description": "استخراج فیلد از متن؛ تولید خروجی مقید به schema به پشتیبانی موتور وابسته است.",
  "distinguishingFeature": "عامل کدنویسی برای مخزنهای بزرگ و چندفایلی",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-f647db3a19c9a0deea"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-coder-480b-a35b-instruct-reasoning-analysis",
  "modelVersionId": "model:qwen-qwen3-coder-480b-a35b-instruct",
  "applicationId": "reasoning-analysis",
  "role": "reasoning",
  "summary": "استدلال با بودجهٔ تفکر مشخص",
  "description": "عامل کدنویسی برای مخزنهای بزرگ و چندفایلی.",
  "distinguishingFeature": "عامل کدنویسی برای مخزنهای بزرگ و چندفایلی",
  "conditions": [
    "این checkpoint فقط پاسخ مستقیم تولید می‌کند؛ حالت thinking جداگانه ندارد."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-f647db3a19c9a0deea"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-coder-480b-a35b-instruct-coding-assistant",
  "modelVersionId": "model:qwen-qwen3-coder-480b-a35b-instruct",
  "applicationId": "coding-assistant",
  "role": "coding",
  "summary": "دستیار تخصصی کد و اصلاح پروژه",
  "description": "عامل کدنویسی برای مخزنهای بزرگ و چندفایلی.",
  "distinguishingFeature": "عامل کدنویسی برای مخزنهای بزرگ و چندفایلی",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-f647db3a19c9a0deea"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-coder-480b-a35b-instruct-agents-tools",
  "modelVersionId": "model:qwen-qwen3-coder-480b-a35b-instruct",
  "applicationId": "agents-tools",
  "role": "tool-use",
  "summary": "ابزارخوانی با parser سازگار",
  "description": "عامل کدنویسی برای مخزنهای بزرگ و چندفایلی.",
  "distinguishingFeature": "عامل کدنویسی برای مخزنهای بزرگ و چندفایلی",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-f647db3a19c9a0deea"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-5-27b-text-work",
  "modelVersionId": "model:qwen-qwen3-5-27b",
  "applicationId": "text-work",
  "role": "text-generation",
  "summary": "چت، خلاصه‌سازی و بازنویسی",
  "description": "دستیار چندوجهی برای تحلیل، کد و سند.",
  "distinguishingFeature": "دستیار چندوجهی برای تحلیل، کد و سند",
  "conditions": [
    "برای پاسخ ساده، حالت تفکر را در صورت پشتیبانی خاموش یا بودجهٔ خروجی را محدود کنید."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-bd8ff876ae3abe060f"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-5-27b-enterprise-rag",
  "modelVersionId": "model:qwen-qwen3-5-27b",
  "applicationId": "enterprise-rag",
  "role": "grounded-generation",
  "summary": "تولید پاسخ مستند در RAG",
  "description": "این مدل نویسندهٔ پاسخ است؛ بازیابی و بازرتبه‌بندی را اجزای جدا انجام می‌دهند.",
  "distinguishingFeature": "دستیار چندوجهی برای تحلیل، کد و سند",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-bd8ff876ae3abe060f"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-5-27b-structured-extraction",
  "modelVersionId": "model:qwen-qwen3-5-27b",
  "applicationId": "structured-extraction",
  "role": "structured-output",
  "summary": "استخراج فیلد و JSON با schema",
  "description": "استخراج فیلد از متن؛ تولید خروجی مقید به schema به پشتیبانی موتور وابسته است.",
  "distinguishingFeature": "دستیار چندوجهی برای تحلیل، کد و سند",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-bd8ff876ae3abe060f"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-5-27b-reasoning-analysis",
  "modelVersionId": "model:qwen-qwen3-5-27b",
  "applicationId": "reasoning-analysis",
  "role": "reasoning",
  "summary": "استدلال با بودجهٔ تفکر مشخص",
  "description": "دستیار چندوجهی برای تحلیل، کد و سند.",
  "distinguishingFeature": "دستیار چندوجهی برای تحلیل، کد و سند",
  "conditions": [
    "توکن‌های تفکر در زمان پاسخ و زمینه حساب شوند."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-bd8ff876ae3abe060f"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-5-27b-coding-assistant",
  "modelVersionId": "model:qwen-qwen3-5-27b",
  "applicationId": "coding-assistant",
  "role": "coding",
  "summary": "تولید و اصلاح کد با آزمون",
  "description": "دستیار چندوجهی برای تحلیل، کد و سند.",
  "distinguishingFeature": "دستیار چندوجهی برای تحلیل، کد و سند",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-bd8ff876ae3abe060f"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-5-27b-agents-tools",
  "modelVersionId": "model:qwen-qwen3-5-27b",
  "applicationId": "agents-tools",
  "role": "tool-use",
  "summary": "ابزارخوانی با parser سازگار",
  "description": "دستیار چندوجهی برای تحلیل، کد و سند.",
  "distinguishingFeature": "دستیار چندوجهی برای تحلیل، کد و سند",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-bd8ff876ae3abe060f"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-5-27b-document-vision",
  "modelVersionId": "model:qwen-qwen3-5-27b",
  "applicationId": "document-vision",
  "role": "vision",
  "summary": "فهم تصویر و فریم‌های ویدئو",
  "description": "دستیار چندوجهی برای تحلیل، کد و سند.",
  "distinguishingFeature": "دستیار چندوجهی برای تحلیل، کد و سند",
  "conditions": [
    "پردازشگر تصویر و اجزای بینایی همین نسخه لازم‌اند؛ تعداد تصویر، وضوح و فریم‌ها مصرف حافظه را تغییر می‌دهد."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-bd8ff876ae3abe060f"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-5-0-8b-text-work",
  "modelVersionId": "model:qwen-qwen3-5-0-8b",
  "applicationId": "text-work",
  "role": "text-generation",
  "summary": "چت و بازنویسی کوتاه",
  "description": "مدل کوچک برای نمونه‌سازی و تخصصی‌سازی وظیفه.",
  "distinguishingFeature": "مدل کوچک برای نمونه‌سازی و تخصصی‌سازی وظیفه",
  "conditions": [
    "برای پاسخ ساده، حالت تفکر را در صورت پشتیبانی خاموش یا بودجهٔ خروجی را محدود کنید."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-2f179b658d60e4483f"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-5-0-8b-enterprise-rag",
  "modelVersionId": "model:qwen-qwen3-5-0-8b",
  "applicationId": "enterprise-rag",
  "role": "grounded-generation",
  "summary": "پاسخ از چند قطعهٔ کوتاه سند",
  "description": "این مدل نویسندهٔ پاسخ است؛ بازیابی و بازرتبه‌بندی را اجزای جدا انجام می‌دهند.",
  "distinguishingFeature": "مدل کوچک برای نمونه‌سازی و تخصصی‌سازی وظیفه",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-2f179b658d60e4483f"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-5-0-8b-structured-extraction",
  "modelVersionId": "model:qwen-qwen3-5-0-8b",
  "applicationId": "structured-extraction",
  "role": "structured-output",
  "summary": "استخراج فیلدهای ساده با قالب ثابت",
  "description": "استخراج فیلد از متن؛ تولید خروجی مقید به schema به پشتیبانی موتور وابسته است.",
  "distinguishingFeature": "مدل کوچک برای نمونه‌سازی و تخصصی‌سازی وظیفه",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-2f179b658d60e4483f"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-5-0-8b-reasoning-analysis",
  "modelVersionId": "model:qwen-qwen3-5-0-8b",
  "applicationId": "reasoning-analysis",
  "role": "reasoning",
  "summary": "استدلال محدود؛ مناسب مقایسهٔ اولیه",
  "description": "مدل کوچک برای نمونه‌سازی و تخصصی‌سازی وظیفه.",
  "distinguishingFeature": "مدل کوچک برای نمونه‌سازی و تخصصی‌سازی وظیفه",
  "conditions": [
    "توکن‌های تفکر در زمان پاسخ و زمینه حساب شوند."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-2f179b658d60e4483f"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-5-0-8b-coding-assistant",
  "modelVersionId": "model:qwen-qwen3-5-0-8b",
  "applicationId": "coding-assistant",
  "role": "coding",
  "summary": "قطعه‌کد، توضیح و اصلاح محلی",
  "description": "مدل کوچک برای نمونه‌سازی و تخصصی‌سازی وظیفه.",
  "distinguishingFeature": "مدل کوچک برای نمونه‌سازی و تخصصی‌سازی وظیفه",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-2f179b658d60e4483f"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-5-0-8b-agents-tools",
  "modelVersionId": "model:qwen-qwen3-5-0-8b",
  "applicationId": "agents-tools",
  "role": "tool-use",
  "summary": "ابزارخوانی با parser سازگار",
  "description": "مدل کوچک برای نمونه‌سازی و تخصصی‌سازی وظیفه.",
  "distinguishingFeature": "مدل کوچک برای نمونه‌سازی و تخصصی‌سازی وظیفه",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-2f179b658d60e4483f"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-5-0-8b-document-vision",
  "modelVersionId": "model:qwen-qwen3-5-0-8b",
  "applicationId": "document-vision",
  "role": "vision",
  "summary": "فهم تصویر و فریم‌های ویدئو",
  "description": "مدل کوچک برای نمونه‌سازی و تخصصی‌سازی وظیفه.",
  "distinguishingFeature": "مدل کوچک برای نمونه‌سازی و تخصصی‌سازی وظیفه",
  "conditions": [
    "پردازشگر تصویر و اجزای بینایی همین نسخه لازم‌اند؛ تعداد تصویر، وضوح و فریم‌ها مصرف حافظه را تغییر می‌دهد."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-2f179b658d60e4483f"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-5-122b-a10b-text-work",
  "modelVersionId": "model:qwen-qwen3-5-122b-a10b",
  "applicationId": "text-work",
  "role": "text-generation",
  "summary": "چت، خلاصه‌سازی و بازنویسی",
  "description": "مدل چندوجهی MoE برای تحلیل و کار با ابزار.",
  "distinguishingFeature": "مدل چندوجهی MoE برای تحلیل و کار با ابزار",
  "conditions": [
    "برای پاسخ ساده، حالت تفکر را در صورت پشتیبانی خاموش یا بودجهٔ خروجی را محدود کنید."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-077b49671bb5ca41ae"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-5-122b-a10b-enterprise-rag",
  "modelVersionId": "model:qwen-qwen3-5-122b-a10b",
  "applicationId": "enterprise-rag",
  "role": "grounded-generation",
  "summary": "تولید پاسخ مستند در RAG",
  "description": "این مدل نویسندهٔ پاسخ است؛ بازیابی و بازرتبه‌بندی را اجزای جدا انجام می‌دهند.",
  "distinguishingFeature": "مدل چندوجهی MoE برای تحلیل و کار با ابزار",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-077b49671bb5ca41ae"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-5-122b-a10b-structured-extraction",
  "modelVersionId": "model:qwen-qwen3-5-122b-a10b",
  "applicationId": "structured-extraction",
  "role": "structured-output",
  "summary": "استخراج فیلد و JSON با schema",
  "description": "استخراج فیلد از متن؛ تولید خروجی مقید به schema به پشتیبانی موتور وابسته است.",
  "distinguishingFeature": "مدل چندوجهی MoE برای تحلیل و کار با ابزار",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-077b49671bb5ca41ae"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-5-122b-a10b-reasoning-analysis",
  "modelVersionId": "model:qwen-qwen3-5-122b-a10b",
  "applicationId": "reasoning-analysis",
  "role": "reasoning",
  "summary": "استدلال با بودجهٔ تفکر مشخص",
  "description": "مدل چندوجهی MoE برای تحلیل و کار با ابزار.",
  "distinguishingFeature": "مدل چندوجهی MoE برای تحلیل و کار با ابزار",
  "conditions": [
    "توکن‌های تفکر در زمان پاسخ و زمینه حساب شوند."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-077b49671bb5ca41ae"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-5-122b-a10b-coding-assistant",
  "modelVersionId": "model:qwen-qwen3-5-122b-a10b",
  "applicationId": "coding-assistant",
  "role": "coding",
  "summary": "تولید و اصلاح کد با آزمون",
  "description": "مدل چندوجهی MoE برای تحلیل و کار با ابزار.",
  "distinguishingFeature": "مدل چندوجهی MoE برای تحلیل و کار با ابزار",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-077b49671bb5ca41ae"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-5-122b-a10b-agents-tools",
  "modelVersionId": "model:qwen-qwen3-5-122b-a10b",
  "applicationId": "agents-tools",
  "role": "tool-use",
  "summary": "ابزارخوانی با parser سازگار",
  "description": "مدل چندوجهی MoE برای تحلیل و کار با ابزار.",
  "distinguishingFeature": "مدل چندوجهی MoE برای تحلیل و کار با ابزار",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-077b49671bb5ca41ae"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-5-122b-a10b-document-vision",
  "modelVersionId": "model:qwen-qwen3-5-122b-a10b",
  "applicationId": "document-vision",
  "role": "vision",
  "summary": "فهم تصویر و فریم‌های ویدئو",
  "description": "مدل چندوجهی MoE برای تحلیل و کار با ابزار.",
  "distinguishingFeature": "مدل چندوجهی MoE برای تحلیل و کار با ابزار",
  "conditions": [
    "پردازشگر تصویر و اجزای بینایی همین نسخه لازم‌اند؛ تعداد تصویر، وضوح و فریم‌ها مصرف حافظه را تغییر می‌دهد."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-077b49671bb5ca41ae"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-5-397b-a17b-text-work",
  "modelVersionId": "model:qwen-qwen3-5-397b-a17b",
  "applicationId": "text-work",
  "role": "text-generation",
  "summary": "چت، خلاصه‌سازی و بازنویسی",
  "description": "دستیار چندوجهی بزرگ برای مسائل پیچیده.",
  "distinguishingFeature": "دستیار چندوجهی بزرگ برای مسائل پیچیده",
  "conditions": [
    "برای پاسخ ساده، حالت تفکر را در صورت پشتیبانی خاموش یا بودجهٔ خروجی را محدود کنید."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-2ee03fb807e16d7989"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-5-397b-a17b-enterprise-rag",
  "modelVersionId": "model:qwen-qwen3-5-397b-a17b",
  "applicationId": "enterprise-rag",
  "role": "grounded-generation",
  "summary": "تولید پاسخ مستند در RAG",
  "description": "این مدل نویسندهٔ پاسخ است؛ بازیابی و بازرتبه‌بندی را اجزای جدا انجام می‌دهند.",
  "distinguishingFeature": "دستیار چندوجهی بزرگ برای مسائل پیچیده",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-2ee03fb807e16d7989"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-5-397b-a17b-structured-extraction",
  "modelVersionId": "model:qwen-qwen3-5-397b-a17b",
  "applicationId": "structured-extraction",
  "role": "structured-output",
  "summary": "استخراج فیلد و JSON با schema",
  "description": "استخراج فیلد از متن؛ تولید خروجی مقید به schema به پشتیبانی موتور وابسته است.",
  "distinguishingFeature": "دستیار چندوجهی بزرگ برای مسائل پیچیده",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-2ee03fb807e16d7989"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-5-397b-a17b-reasoning-analysis",
  "modelVersionId": "model:qwen-qwen3-5-397b-a17b",
  "applicationId": "reasoning-analysis",
  "role": "reasoning",
  "summary": "استدلال با بودجهٔ تفکر مشخص",
  "description": "دستیار چندوجهی بزرگ برای مسائل پیچیده.",
  "distinguishingFeature": "دستیار چندوجهی بزرگ برای مسائل پیچیده",
  "conditions": [
    "توکن‌های تفکر در زمان پاسخ و زمینه حساب شوند."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-2ee03fb807e16d7989"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-5-397b-a17b-coding-assistant",
  "modelVersionId": "model:qwen-qwen3-5-397b-a17b",
  "applicationId": "coding-assistant",
  "role": "coding",
  "summary": "تولید و اصلاح کد با آزمون",
  "description": "دستیار چندوجهی بزرگ برای مسائل پیچیده.",
  "distinguishingFeature": "دستیار چندوجهی بزرگ برای مسائل پیچیده",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-2ee03fb807e16d7989"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-5-397b-a17b-agents-tools",
  "modelVersionId": "model:qwen-qwen3-5-397b-a17b",
  "applicationId": "agents-tools",
  "role": "tool-use",
  "summary": "ابزارخوانی با parser سازگار",
  "description": "دستیار چندوجهی بزرگ برای مسائل پیچیده.",
  "distinguishingFeature": "دستیار چندوجهی بزرگ برای مسائل پیچیده",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-2ee03fb807e16d7989"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen3-5-397b-a17b-document-vision",
  "modelVersionId": "model:qwen-qwen3-5-397b-a17b",
  "applicationId": "document-vision",
  "role": "vision",
  "summary": "فهم تصویر و فریم‌های ویدئو",
  "description": "دستیار چندوجهی بزرگ برای مسائل پیچیده.",
  "distinguishingFeature": "دستیار چندوجهی بزرگ برای مسائل پیچیده",
  "conditions": [
    "پردازشگر تصویر و اجزای بینایی همین نسخه لازم‌اند؛ تعداد تصویر، وضوح و فریم‌ها مصرف حافظه را تغییر می‌دهد."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-2ee03fb807e16d7989"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-meta-llama-llama-3-3-70b-instruct-text-work",
  "modelVersionId": "model:meta-llama-llama-3-3-70b-instruct",
  "applicationId": "text-work",
  "role": "text-generation",
  "summary": "چت، خلاصه‌سازی و بازنویسی",
  "description": "دستیار متنی چندزبانه برای پاسخ‌گویی و کار سازمانی.",
  "distinguishingFeature": "دستیار متنی چندزبانه برای پاسخ‌گویی و کار سازمانی",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-9b1a731a0f6782ae65"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-meta-llama-llama-3-3-70b-instruct-enterprise-rag",
  "modelVersionId": "model:meta-llama-llama-3-3-70b-instruct",
  "applicationId": "enterprise-rag",
  "role": "grounded-generation",
  "summary": "تولید پاسخ مستند در RAG",
  "description": "این مدل نویسندهٔ پاسخ است؛ بازیابی و بازرتبه‌بندی را اجزای جدا انجام می‌دهند.",
  "distinguishingFeature": "دستیار متنی چندزبانه برای پاسخ‌گویی و کار سازمانی",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-9b1a731a0f6782ae65"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-meta-llama-llama-3-3-70b-instruct-structured-extraction",
  "modelVersionId": "model:meta-llama-llama-3-3-70b-instruct",
  "applicationId": "structured-extraction",
  "role": "structured-output",
  "summary": "استخراج فیلد و JSON با schema",
  "description": "استخراج فیلد از متن؛ تولید خروجی مقید به schema به پشتیبانی موتور وابسته است.",
  "distinguishingFeature": "دستیار متنی چندزبانه برای پاسخ‌گویی و کار سازمانی",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-9b1a731a0f6782ae65"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-meta-llama-llama-3-3-70b-instruct-coding-assistant",
  "modelVersionId": "model:meta-llama-llama-3-3-70b-instruct",
  "applicationId": "coding-assistant",
  "role": "coding",
  "summary": "تولید و اصلاح کد با آزمون",
  "description": "دستیار متنی چندزبانه برای پاسخ‌گویی و کار سازمانی.",
  "distinguishingFeature": "دستیار متنی چندزبانه برای پاسخ‌گویی و کار سازمانی",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-9b1a731a0f6782ae65"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-meta-llama-llama-3-3-70b-instruct-agents-tools",
  "modelVersionId": "model:meta-llama-llama-3-3-70b-instruct",
  "applicationId": "agents-tools",
  "role": "tool-use",
  "summary": "ابزارخوانی با parser سازگار",
  "description": "دستیار متنی چندزبانه برای پاسخ‌گویی و کار سازمانی.",
  "distinguishingFeature": "دستیار متنی چندزبانه برای پاسخ‌گویی و کار سازمانی",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-9b1a731a0f6782ae65"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-microsoft-phi-4-text-work",
  "modelVersionId": "model:microsoft-phi-4",
  "applicationId": "text-work",
  "role": "text-generation",
  "summary": "چت، خلاصه‌سازی و بازنویسی",
  "description": "مدل انگلیسی برای ریاضی، منطق و تولید متن.",
  "distinguishingFeature": "مدل انگلیسی برای ریاضی، منطق و تولید متن",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-606b11c691a36f7f48"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-microsoft-phi-4-enterprise-rag",
  "modelVersionId": "model:microsoft-phi-4",
  "applicationId": "enterprise-rag",
  "role": "grounded-generation",
  "summary": "تولید پاسخ مستند در RAG",
  "description": "این مدل نویسندهٔ پاسخ است؛ بازیابی و بازرتبه‌بندی را اجزای جدا انجام می‌دهند.",
  "distinguishingFeature": "مدل انگلیسی برای ریاضی، منطق و تولید متن",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-606b11c691a36f7f48"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-microsoft-phi-4-structured-extraction",
  "modelVersionId": "model:microsoft-phi-4",
  "applicationId": "structured-extraction",
  "role": "structured-output",
  "summary": "استخراج فیلد و JSON با schema",
  "description": "استخراج فیلد از متن؛ تولید خروجی مقید به schema به پشتیبانی موتور وابسته است.",
  "distinguishingFeature": "مدل انگلیسی برای ریاضی، منطق و تولید متن",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-606b11c691a36f7f48"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-microsoft-phi-4-coding-assistant",
  "modelVersionId": "model:microsoft-phi-4",
  "applicationId": "coding-assistant",
  "role": "coding",
  "summary": "تولید و اصلاح کد با آزمون",
  "description": "مدل انگلیسی برای ریاضی، منطق و تولید متن.",
  "distinguishingFeature": "مدل انگلیسی برای ریاضی، منطق و تولید متن",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-606b11c691a36f7f48"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-huggingfacetb-smolvlm2-2-2b-instruct-text-work",
  "modelVersionId": "model:huggingfacetb-smolvlm2-2-2b-instruct",
  "applicationId": "text-work",
  "role": "text-generation",
  "summary": "چت و بازنویسی کوتاه",
  "description": "مدل کوچک برای پرسش از تصویر و ویدئو.",
  "distinguishingFeature": "مدل کوچک برای پرسش از تصویر و ویدئو",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-80457b3bd01c20cffe"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-huggingfacetb-smolvlm2-2-2b-instruct-enterprise-rag",
  "modelVersionId": "model:huggingfacetb-smolvlm2-2-2b-instruct",
  "applicationId": "enterprise-rag",
  "role": "grounded-generation",
  "summary": "پاسخ از چند قطعهٔ کوتاه سند",
  "description": "این مدل نویسندهٔ پاسخ است؛ بازیابی و بازرتبه‌بندی را اجزای جدا انجام می‌دهند.",
  "distinguishingFeature": "مدل کوچک برای پرسش از تصویر و ویدئو",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-80457b3bd01c20cffe"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-huggingfacetb-smolvlm2-2-2b-instruct-structured-extraction",
  "modelVersionId": "model:huggingfacetb-smolvlm2-2-2b-instruct",
  "applicationId": "structured-extraction",
  "role": "structured-output",
  "summary": "استخراج فیلدهای ساده با قالب ثابت",
  "description": "استخراج فیلد از متن؛ تولید خروجی مقید به schema به پشتیبانی موتور وابسته است.",
  "distinguishingFeature": "مدل کوچک برای پرسش از تصویر و ویدئو",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-80457b3bd01c20cffe"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-huggingfacetb-smolvlm2-2-2b-instruct-document-vision",
  "modelVersionId": "model:huggingfacetb-smolvlm2-2-2b-instruct",
  "applicationId": "document-vision",
  "role": "vision",
  "summary": "فهم تصویر و فریم‌های ویدئو",
  "description": "مدل کوچک برای پرسش از تصویر و ویدئو.",
  "distinguishingFeature": "مدل کوچک برای پرسش از تصویر و ویدئو",
  "conditions": [
    "پردازشگر تصویر و اجزای بینایی همین نسخه لازم‌اند؛ تعداد تصویر، وضوح و فریم‌ها مصرف حافظه را تغییر می‌دهد."
  ],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-80457b3bd01c20cffe"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen2-5-coder-7b-instruct-text-work",
  "modelVersionId": "model:qwen-qwen2-5-coder-7b-instruct",
  "applicationId": "text-work",
  "role": "text-generation",
  "summary": "چت، خلاصه‌سازی و بازنویسی",
  "description": "دستیار کدنویسی کوچک برای توضیح و اصلاح کد.",
  "distinguishingFeature": "دستیار کدنویسی کوچک برای توضیح و اصلاح کد",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-6cacb45b6a53ee5b07"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen2-5-coder-7b-instruct-enterprise-rag",
  "modelVersionId": "model:qwen-qwen2-5-coder-7b-instruct",
  "applicationId": "enterprise-rag",
  "role": "grounded-generation",
  "summary": "تولید پاسخ مستند در RAG",
  "description": "این مدل نویسندهٔ پاسخ است؛ بازیابی و بازرتبه‌بندی را اجزای جدا انجام می‌دهند.",
  "distinguishingFeature": "دستیار کدنویسی کوچک برای توضیح و اصلاح کد",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-6cacb45b6a53ee5b07"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen2-5-coder-7b-instruct-structured-extraction",
  "modelVersionId": "model:qwen-qwen2-5-coder-7b-instruct",
  "applicationId": "structured-extraction",
  "role": "structured-output",
  "summary": "استخراج فیلد و JSON با schema",
  "description": "استخراج فیلد از متن؛ تولید خروجی مقید به schema به پشتیبانی موتور وابسته است.",
  "distinguishingFeature": "دستیار کدنویسی کوچک برای توضیح و اصلاح کد",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-6cacb45b6a53ee5b07"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen2-5-coder-7b-instruct-coding-assistant",
  "modelVersionId": "model:qwen-qwen2-5-coder-7b-instruct",
  "applicationId": "coding-assistant",
  "role": "coding",
  "summary": "دستیار تخصصی کد و اصلاح پروژه",
  "description": "دستیار کدنویسی کوچک برای توضیح و اصلاح کد.",
  "distinguishingFeature": "دستیار کدنویسی کوچک برای توضیح و اصلاح کد",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-6cacb45b6a53ee5b07"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen2-5-coder-14b-instruct-text-work",
  "modelVersionId": "model:qwen-qwen2-5-coder-14b-instruct",
  "applicationId": "text-work",
  "role": "text-generation",
  "summary": "چت، خلاصه‌سازی و بازنویسی",
  "description": "دستیار کدنویسی برای تولید، توضیح و رفع خطا.",
  "distinguishingFeature": "دستیار کدنویسی برای تولید، توضیح و رفع خطا",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-372fbdddb400aa9652"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen2-5-coder-14b-instruct-enterprise-rag",
  "modelVersionId": "model:qwen-qwen2-5-coder-14b-instruct",
  "applicationId": "enterprise-rag",
  "role": "grounded-generation",
  "summary": "تولید پاسخ مستند در RAG",
  "description": "این مدل نویسندهٔ پاسخ است؛ بازیابی و بازرتبه‌بندی را اجزای جدا انجام می‌دهند.",
  "distinguishingFeature": "دستیار کدنویسی برای تولید، توضیح و رفع خطا",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-372fbdddb400aa9652"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen2-5-coder-14b-instruct-structured-extraction",
  "modelVersionId": "model:qwen-qwen2-5-coder-14b-instruct",
  "applicationId": "structured-extraction",
  "role": "structured-output",
  "summary": "استخراج فیلد و JSON با schema",
  "description": "استخراج فیلد از متن؛ تولید خروجی مقید به schema به پشتیبانی موتور وابسته است.",
  "distinguishingFeature": "دستیار کدنویسی برای تولید، توضیح و رفع خطا",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-372fbdddb400aa9652"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen2-5-coder-14b-instruct-coding-assistant",
  "modelVersionId": "model:qwen-qwen2-5-coder-14b-instruct",
  "applicationId": "coding-assistant",
  "role": "coding",
  "summary": "دستیار تخصصی کد و اصلاح پروژه",
  "description": "دستیار کدنویسی برای تولید، توضیح و رفع خطا.",
  "distinguishingFeature": "دستیار کدنویسی برای تولید، توضیح و رفع خطا",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-372fbdddb400aa9652"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen2-5-coder-32b-instruct-text-work",
  "modelVersionId": "model:qwen-qwen2-5-coder-32b-instruct",
  "applicationId": "text-work",
  "role": "text-generation",
  "summary": "چت، خلاصه‌سازی و بازنویسی",
  "description": "دستیار کدنویسی با ظرفیت بیشتر برای مسائل دشوار.",
  "distinguishingFeature": "دستیار کدنویسی با ظرفیت بیشتر برای مسائل دشوار",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-8dc6a67f1d3ac055f4"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen2-5-coder-32b-instruct-enterprise-rag",
  "modelVersionId": "model:qwen-qwen2-5-coder-32b-instruct",
  "applicationId": "enterprise-rag",
  "role": "grounded-generation",
  "summary": "تولید پاسخ مستند در RAG",
  "description": "این مدل نویسندهٔ پاسخ است؛ بازیابی و بازرتبه‌بندی را اجزای جدا انجام می‌دهند.",
  "distinguishingFeature": "دستیار کدنویسی با ظرفیت بیشتر برای مسائل دشوار",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-8dc6a67f1d3ac055f4"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen2-5-coder-32b-instruct-structured-extraction",
  "modelVersionId": "model:qwen-qwen2-5-coder-32b-instruct",
  "applicationId": "structured-extraction",
  "role": "structured-output",
  "summary": "استخراج فیلد و JSON با schema",
  "description": "استخراج فیلد از متن؛ تولید خروجی مقید به schema به پشتیبانی موتور وابسته است.",
  "distinguishingFeature": "دستیار کدنویسی با ظرفیت بیشتر برای مسائل دشوار",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-8dc6a67f1d3ac055f4"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-qwen-qwen2-5-coder-32b-instruct-coding-assistant",
  "modelVersionId": "model:qwen-qwen2-5-coder-32b-instruct",
  "applicationId": "coding-assistant",
  "role": "coding",
  "summary": "دستیار تخصصی کد و اصلاح پروژه",
  "description": "دستیار کدنویسی با ظرفیت بیشتر برای مسائل دشوار.",
  "distinguishingFeature": "دستیار کدنویسی با ظرفیت بیشتر برای مسائل دشوار",
  "conditions": [],
  "basis": "editorial-analysis",
  "evidenceIds": [
    "evidence:v03-8dc6a67f1d3ac055f4"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-sentence-transformers-all-minilm-l6-v2-enterprise-rag",
  "modelVersionId": "model:sentence-transformers-all-minilm-l6-v2",
  "applicationId": "enterprise-rag",
  "role": "retrieval",
  "summary": "بردارساز سبک انگلیسی برای جست‌وجو و خوشه‌بندی",
  "description": "جست‌وجو، مشابهت و خوشه‌بندی متن انگلیسی؛ ورودی کوتاه",
  "distinguishingFeature": "میانگین توکن‌ها با attention mask و نرمال‌سازی L2",
  "conditions": [
    "میانگین توکن‌ها با attention mask و نرمال‌سازی L2"
  ],
  "basis": "publisher-summary",
  "evidenceIds": [
    "evidence:v03-9c825c8b7ff67b8e2e"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-intfloat-multilingual-e5-base-enterprise-rag",
  "modelVersionId": "model:intfloat-multilingual-e5-base",
  "applicationId": "enterprise-rag",
  "role": "retrieval",
  "summary": "بردارساز چندزبانه با پیشوند مجزای پرسش و سند",
  "description": "بازیابی چندزبانه؛ پیشوند پرسش و سند حتی در زبان غیرانگلیسی لازم است",
  "distinguishingFeature": "میانگین با mask و L2؛ query: برای پرسش و passage: برای سند",
  "conditions": [
    "میانگین با mask و L2؛ query: برای پرسش و passage: برای سند"
  ],
  "basis": "publisher-summary",
  "evidenceIds": [
    "evidence:v03-647a6dc4d6b4cce867"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-intfloat-multilingual-e5-large-enterprise-rag",
  "modelVersionId": "model:intfloat-multilingual-e5-large",
  "applicationId": "enterprise-rag",
  "role": "retrieval",
  "summary": "بردارساز چندزبانه برای جست‌وجوی معنایی",
  "description": "بازیابی چندزبانه با پنجرهٔ ورودی ۵۱۲ توکن",
  "distinguishingFeature": "میانگین با mask و L2؛ query: برای پرسش و passage: برای سند",
  "conditions": [
    "میانگین با mask و L2؛ query: برای پرسش و passage: برای سند"
  ],
  "basis": "publisher-summary",
  "evidenceIds": [
    "evidence:v03-c8765fd75612ce9bda"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-baai-bge-small-en-v1-5-enterprise-rag",
  "modelVersionId": "model:baai-bge-small-en-v1-5",
  "applicationId": "enterprise-rag",
  "role": "retrieval",
  "summary": "بردارساز کوچک انگلیسی برای بازیابی اسناد",
  "description": "بردارساز انگلیسی کوچک برای جست‌وجوی کوتاه",
  "distinguishingFeature": "CLS و نرمال‌سازی؛ دستور retrieval فقط روی پرسش",
  "conditions": [
    "CLS و نرمال‌سازی؛ دستور retrieval فقط روی پرسش"
  ],
  "basis": "publisher-summary",
  "evidenceIds": [
    "evidence:v03-f20cf032d0b3ba91f5"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-baai-bge-reranker-base-enterprise-rag",
  "modelVersionId": "model:baai-bge-reranker-base",
  "applicationId": "enterprise-rag",
  "role": "reranking",
  "summary": "بازرتبه‌بند انگلیسی و چینی برای نتایج جست‌وجو",
  "description": "بازرتبه‌بندی انگلیسی و چینی؛ تعداد سندهای ورودی را پس از بازیابی محدود کنید",
  "distinguishingFeature": "Cross-encoder روی زوج پرسش و سند؛ امتیاز ارتباط",
  "conditions": [
    "Cross-encoder روی زوج پرسش و سند؛ امتیاز ارتباط"
  ],
  "basis": "publisher-summary",
  "evidenceIds": [
    "evidence:v03-59ea9a6b606782ac4a"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-google-embeddinggemma-300m-enterprise-rag",
  "modelVersionId": "model:google-embeddinggemma-300m",
  "applicationId": "enterprise-rag",
  "role": "retrieval",
  "summary": "بردارساز چندزبانه کوچک برای اجرا روی دستگاه",
  "description": "بیش از ۱۰۰ زبان؛ کاهش بعد با Matryoshka تا ۱۲۸ بعد",
  "distinguishingFeature": "مسیر Sentence Transformers با قالب پرسش و سند",
  "conditions": [
    "بیش از ۱۰۰ زبان؛ کاهش بعد با Matryoshka تا ۱۲۸ بعد"
  ],
  "basis": "publisher-summary",
  "evidenceIds": [
    "evidence:v03-4fc4be5e247f489a27"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-jinaai-jina-embeddings-v3-enterprise-rag",
  "modelVersionId": "model:jinaai-jina-embeddings-v3",
  "applicationId": "enterprise-rag",
  "role": "retrieval",
  "summary": "بردارساز چندزبانه با آداپترهای وابسته به وظیفه",
  "description": "آداپتر وظیفه و بعد خروجی قابل انتخاب؛ مجوز غیرتجاری",
  "distinguishingFeature": "آداپتر retrieval.query / retrieval.passage؛ میانگین توکن‌ها و L2",
  "conditions": [
    "آداپتر retrieval.query / retrieval.passage؛ میانگین توکن‌ها و L2"
  ],
  "basis": "publisher-summary",
  "evidenceIds": [
    "evidence:v03-133e75dac7f5e254f9"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-jinaai-jina-reranker-v2-base-multilingual-enterprise-rag",
  "modelVersionId": "model:jinaai-jina-reranker-v2-base-multilingual",
  "applicationId": "enterprise-rag",
  "role": "reranking",
  "summary": "بازرتبه‌بند چندزبانه برای اسناد بلندتر",
  "description": "بازرتبه‌بندی چندزبانه با ورودی تا ۱۰۲۴ توکن؛ مجوز غیرتجاری",
  "distinguishingFeature": "CrossEncoder؛ امتیاز ارتباط جفت پرسش و سند",
  "conditions": [
    "بازرتبه‌بندی چندزبانه با ورودی تا ۱۰۲۴ توکن؛ مجوز غیرتجاری"
  ],
  "basis": "publisher-summary",
  "evidenceIds": [
    "evidence:v03-d6e73357bf96ab362e"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-mixedbread-ai-mxbai-embed-large-v1-enterprise-rag",
  "modelVersionId": "model:mixedbread-ai-mxbai-embed-large-v1",
  "applicationId": "enterprise-rag",
  "role": "retrieval",
  "summary": "بردارساز انگلیسی برای بازیابی با دستور پرسش",
  "description": "بردارساز انگلیسی؛ بردار سند بدون دستور پرسش ساخته شود",
  "distinguishingFeature": "دستور Represent this sentence for searching relevant passages: روی پرسش",
  "conditions": [
    "دستور Represent this sentence for searching relevant passages: روی پرسش"
  ],
  "basis": "publisher-summary",
  "evidenceIds": [
    "evidence:v03-4128a3077638e7a164"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-nomic-ai-nomic-embed-text-v1-5-enterprise-rag",
  "modelVersionId": "model:nomic-ai-nomic-embed-text-v1-5",
  "applicationId": "enterprise-rag",
  "role": "retrieval",
  "summary": "بردارساز انگلیسی با زمینهٔ بلند و ابعاد قابل کاهش",
  "description": "Matryoshka برای کاهش ابعاد؛ زمینهٔ بلند با تنظیمات مدل",
  "distinguishingFeature": "پیشوند search_query: برای پرسش و search_document: برای سند؛ نرمال‌سازی و کاهش بُعد",
  "conditions": [
    "پیشوند search_query: برای پرسش و search_document: برای سند؛ نرمال‌سازی و کاهش بُعد"
  ],
  "basis": "publisher-summary",
  "evidenceIds": [
    "evidence:v03-934bd541e054349d80"
  ]
});
modelUseGuidance.push({
  "id": "model-use:v03-answerdotai-modernbert-base-structured-extraction",
  "modelVersionId": "model:answerdotai-modernbert-base",
  "applicationId": "structured-extraction",
  "role": "structured-output",
  "summary": "رمزگذار پایه برای آموزش دسته‌بندی و استخراج موجودیت",
  "description": "مدل پایه برای fine-tuning دسته‌بندی/NER؛ چت‌بات یا دسته‌بند آماده نیست",
  "distinguishingFeature": "رمزگذار دوسویه؛ خروجی توکن یا هد آموزش‌دیدهٔ وظیفه",
  "conditions": [
    "رمزگذار دوسویه؛ خروجی توکن یا هد آموزش‌دیدهٔ وظیفه"
  ],
  "basis": "publisher-summary",
  "evidenceIds": [
    "evidence:v03-9f4a255f17cc556d99"
  ]
});
modelUseGuidance.push({
  "id": "model-use:audit-qwen-qwen2-5-coder-1-5b",
  "modelVersionId": "model:qwen-qwen2-5-coder-1-5b",
  "applicationId": "coding-assistant",
  "role": "code-completion",
  "summary": "تکمیل کد و پرکردن جای خالی",
  "description": "مدل پایهٔ کدنویسی با حدود ۱٫۵۴ میلیارد پارامتر؛ برای FIM و ادامهٔ کد، نه گفت‌وگوی دستورپذیر.",
  "distinguishingFeature": "مدل پایهٔ کدنویسی با حدود ۱٫۵۴ میلیارد پارامتر؛ برای FIM و ادامهٔ کد، نه گفت‌وگوی دستورپذیر.",
  "conditions": [
    "از قالب تکمیل کد / FIM همین مدل استفاده کنید؛ chat template مدل دستورپذیر را جایگزین نکنید."
  ],
  "basis": "publisher-summary",
  "evidenceIds": [
    "evidence:audit-20260916-qwen-qwen2-5-coder-1-5b"
  ]
});
modelUseGuidance.push({
  "id": "model-use:audit-bigcode-starcoder2-3b",
  "modelVersionId": "model:bigcode-starcoder2-3b",
  "applicationId": "coding-assistant",
  "role": "code-completion",
  "summary": "تکمیل کد با پنجرهٔ لغزان",
  "description": "مدل پایهٔ کدنویسی؛ ورودی ۱۶٬۳۸۴ توکنی با پنجرهٔ توجه ۴٬۰۹۶ توکنی. برای تکمیل کد، نه دستیار گفت‌وگو.",
  "distinguishingFeature": "مدل پایهٔ کدنویسی؛ ورودی ۱۶٬۳۸۴ توکنی با پنجرهٔ توجه ۴٬۰۹۶ توکنی. برای تکمیل کد، نه دستیار گفت‌وگو.",
  "conditions": [
    "از قالب تکمیل کد / FIM همین مدل استفاده کنید؛ chat template مدل دستورپذیر را جایگزین نکنید."
  ],
  "basis": "publisher-summary",
  "evidenceIds": [
    "evidence:audit-20260916-bigcode-starcoder2-3b"
  ]
});
modelUseGuidance.push({
  "id": "model-use:audit-qwen-qwen3-coder-next",
  "modelVersionId": "model:qwen-qwen3-coder-next",
  "applicationId": "coding-assistant",
  "role": "coding",
  "summary": "عامل برنامه‌نویسی",
  "description": "مدل MoE با ۸۰ میلیارد پارامتر و ۳ میلیارد پارامتر فعال، توجه ترکیبی و پاسخ مستقیم؛ حافظهٔ وزن از کل مدل می‌آید.",
  "distinguishingFeature": "مدل MoE با ۸۰ میلیارد پارامتر و ۳ میلیارد پارامتر فعال، توجه ترکیبی و پاسخ مستقیم؛ حافظهٔ وزن از کل مدل می‌آید.",
  "conditions": [],
  "basis": "publisher-summary",
  "evidenceIds": [
    "evidence:audit-20260916-qwen-qwen3-coder-next"
  ]
});
modelUseGuidance.push({
  "id": "model-use:audit-intfloat-multilingual-e5-large-instruct",
  "modelVersionId": "model:intfloat-multilingual-e5-large-instruct",
  "applicationId": "enterprise-rag",
  "role": "retrieval",
  "summary": "بازیابی چندزبانه با دستور وظیفه",
  "description": "بردارساز ۱۰۲۴بعدی؛ دستور یک‌جمله‌ای به پرسش اضافه می‌شود و سند بدون دستور وارد می‌شود.",
  "distinguishingFeature": "بردارساز ۱۰۲۴بعدی؛ دستور یک‌جمله‌ای به پرسش اضافه می‌شود و سند بدون دستور وارد می‌شود.",
  "conditions": [
    "قالب پرسش Instruct: …\nQuery: …؛ سند بدون دستور. masked mean pooling و نرمال‌سازی L2؛ حداکثر ۵۱۲ توکن."
  ],
  "basis": "publisher-summary",
  "evidenceIds": [
    "evidence:audit-20260916-intfloat-multilingual-e5-large-instruct"
  ]
});
modelUseGuidance.push({
  "id": "model-use:audit-qwen-qwen3-4b-instruct-2507",
  "modelVersionId": "model:qwen-qwen3-4b-instruct-2507",
  "applicationId": "text-work",
  "role": "text-generation",
  "summary": "دستیار کوچک با پاسخ مستقیم",
  "description": "نسخهٔ دستورپذیر چهارمیلیاردی با سقف متن ۲۶۲٬۱۴۴ توکن؛ این checkpoint حالت thinking ندارد.",
  "distinguishingFeature": "نسخهٔ دستورپذیر چهارمیلیاردی با سقف متن ۲۶۲٬۱۴۴ توکن؛ این checkpoint حالت thinking ندارد.",
  "conditions": [],
  "basis": "publisher-summary",
  "evidenceIds": [
    "evidence:audit-20260916-qwen-qwen3-4b-instruct-2507"
  ]
});
modelUseGuidance.push({
  "id": "model-use:audit-partai-tooka-sbert-v2-small",
  "modelVersionId": "model:partai-tooka-sbert-v2-small",
  "applicationId": "enterprise-rag",
  "role": "retrieval",
  "summary": "بردارسازی متن فارسی",
  "description": "نسخهٔ کوچک Tooka-SBERT-V2 با بردار ۷۶۸بعدی؛ نامزد بومی برای بازیابی و شباهت متن فارسی.",
  "distinguishingFeature": "نسخهٔ کوچک Tooka-SBERT-V2 با بردار ۷۶۸بعدی؛ نامزد بومی برای بازیابی و شباهت متن فارسی.",
  "conditions": [
    "مجوز استفاده در شناسنامهٔ دریافت‌شده مشخص نشده است."
  ],
  "basis": "publisher-summary",
  "evidenceIds": [
    "evidence:audit-20260916-partai-tooka-sbert-v2-small"
  ]
});
modelUseGuidance.push({
  "id": "model-use:audit-partai-tooka-sbert-v2-large",
  "modelVersionId": "model:partai-tooka-sbert-v2-large",
  "applicationId": "enterprise-rag",
  "role": "retrieval",
  "summary": "بردارسازی متن فارسی",
  "description": "نسخهٔ بزرگ Tooka-SBERT-V2 با بردار ۱۰۲۴بعدی؛ نتیجهٔ PTEB با آزمون‌های دیگر قابل رتبه‌بندی مستقیم نیست.",
  "distinguishingFeature": "نسخهٔ بزرگ Tooka-SBERT-V2 با بردار ۱۰۲۴بعدی؛ نتیجهٔ PTEB با آزمون‌های دیگر قابل رتبه‌بندی مستقیم نیست.",
  "conditions": [
    "مجوز استفاده در شناسنامهٔ دریافت‌شده مشخص نشده است."
  ],
  "basis": "publisher-summary",
  "evidenceIds": [
    "evidence:audit-20260916-partai-tooka-sbert-v2-large"
  ]
});
modelUseGuidance.push({
  "id": "model-use:audit-hooshvarelab-bert-base-parsbert-uncased",
  "modelVersionId": "model:hooshvarelab-bert-base-parsbert-uncased",
  "applicationId": "structured-extraction",
  "role": "structured-output",
  "summary": "پایهٔ آموزش وظایف فارسی",
  "description": "ParsBERT پایه برای درک متن فارسی؛ دسته‌بندی و تشخیص موجودیت به سر وظیفه و آموزش نیاز دارند. بردارساز آمادهٔ بازیابی نیست.",
  "distinguishingFeature": "ParsBERT پایه برای درک متن فارسی؛ دسته‌بندی و تشخیص موجودیت به سر وظیفه و آموزش نیاز دارند. بردارساز آمادهٔ بازیابی نیست.",
  "conditions": [
    "وزن پایه به‌تنهایی دسته‌بند یا NER آماده نیست.",
    "مجوز استفاده در شناسنامهٔ دریافت‌شده مشخص نشده است."
  ],
  "basis": "publisher-summary",
  "evidenceIds": [
    "evidence:audit-20260916-hooshvarelab-bert-base-parsbert-uncased"
  ]
});
modelUseGuidance.push({
  "id": "model-use:bsc-lt-salamandra-2b-instruct:text-work",
  "modelVersionId": "model:bsc-lt-salamandra-2b-instruct",
  "applicationId": "text-work",
  "role": "text-generation",
  "summary": "تولید متن به زبان‌های ایبری",
  "description": "گزینهٔ تخصصی‌تر برای زبان اسپانیایی و زبان‌های ایبری؛ گونهٔ 2B دستورپذیر با نتایج منتشرشدهٔ اسپانیایی. نقطهٔ مرجع زبانی است، نه برندهٔ عمومی یا گزینهٔ اثبات‌شده برای فارسی.",
  "distinguishingFeature": "گزینهٔ تخصصی‌تر برای زبان اسپانیایی و زبان‌های ایبری؛ گونهٔ 2B دستورپذیر با نتایج منتشرشدهٔ اسپانیایی. نقطهٔ مرجع زبانی است، نه برندهٔ عمومی یا گزینهٔ اثبات‌شده برای فارسی.",
  "conditions": [],
  "basis": "publisher-summary",
  "evidenceIds": [
    "evidence:reference-bsc-lt-salamandra-2b-instruct-json-ec00591718",
    "evidence:reference-bsc-lt-salamandra-2b-instruct-readme-md-22881108b0",
    "evidence:reference-bsc-lt-salamandra-2b-instruct-config-json-47e785ca3a",
    "evidence:reference-bsc-lt-salamandra-2b-instruct-readme-md-2365657aeb",
    "evidence:reference-bsc-lt-salamandra-2b-instruct-readme-md-456890d7cc"
  ]
});
modelUseGuidance.push({
  "id": "model-use:bsc-lt-salamandra-7b-instruct:text-work",
  "modelVersionId": "model:bsc-lt-salamandra-7b-instruct",
  "applicationId": "text-work",
  "role": "text-generation",
  "summary": "تولید متن به زبان‌های ایبری",
  "description": "گزینهٔ تخصصی‌تر برای زبان اسپانیایی و زبان‌های ایبری؛ گونهٔ 7B دستورپذیر با نتایج منتشرشدهٔ اسپانیایی. نقطهٔ مرجع زبانی است، نه برندهٔ عمومی یا گزینهٔ اثبات‌شده برای فارسی.",
  "distinguishingFeature": "گزینهٔ تخصصی‌تر برای زبان اسپانیایی و زبان‌های ایبری؛ گونهٔ 7B دستورپذیر با نتایج منتشرشدهٔ اسپانیایی. نقطهٔ مرجع زبانی است، نه برندهٔ عمومی یا گزینهٔ اثبات‌شده برای فارسی.",
  "conditions": [],
  "basis": "publisher-summary",
  "evidenceIds": [
    "evidence:reference-bsc-lt-salamandra-7b-instruct-json-ec00591718",
    "evidence:reference-bsc-lt-salamandra-7b-instruct-readme-md-22881108b0",
    "evidence:reference-bsc-lt-salamandra-7b-instruct-config-json-47e785ca3a",
    "evidence:reference-bsc-lt-salamandra-7b-instruct-readme-md-2365657aeb",
    "evidence:reference-bsc-lt-salamandra-7b-instruct-readme-md-456890d7cc"
  ]
});
modelUseGuidance.push({
  "id": "model-use:liquidai-lfm2-5-1-2b-instruct:structured-extraction",
  "modelVersionId": "model:liquidai-lfm2-5-1-2b-instruct",
  "applicationId": "structured-extraction",
  "role": "structured-output",
  "summary": "استخراج اطلاعات روی دستگاه",
  "description": "گزینهٔ کوچک برای استخراج اطلاعات و کارهای محدود روی دستگاه؛ ناشر آن را برای برنامه‌نویسی و کارهای دانش‌محور توصیه نمی‌کند. اسپانیایی در زبان‌های اعلام‌شده هست؛ نتیجهٔ اختصاصی فارسی در این بسته نداریم. مجوز اختصاصی دارد.",
  "distinguishingFeature": "گزینهٔ کوچک برای استخراج اطلاعات و کارهای محدود روی دستگاه؛ ناشر آن را برای برنامه‌نویسی و کارهای دانش‌محور توصیه نمی‌کند. اسپانیایی در زبان‌های اعلام‌شده هست؛ نتیجهٔ اختصاصی فارسی در این بسته نداریم. مجوز اختصاصی دارد.",
  "conditions": [],
  "basis": "publisher-summary",
  "evidenceIds": [
    "evidence:reference-liquidai-lfm2-5-1-2b-instruct-json-ec00591718",
    "evidence:reference-liquidai-lfm2-5-1-2b-instruct-readme-md-22881108b0",
    "evidence:reference-liquidai-lfm2-5-1-2b-instruct-config-json-47e785ca3a",
    "evidence:reference-liquidai-lfm2-5-1-2b-instruct-readme-md-2365657aeb",
    "evidence:reference-liquidai-lfm2-5-1-2b-instruct-readme-md-456890d7cc",
    "evidence:reference-lfm-license-txt-e8003a05ee"
  ]
});
modelUseGuidance.push({
  "id": "model-use:openbmb-minicpm5-2b:reasoning-analysis",
  "modelVersionId": "model:openbmb-minicpm5-2b",
  "applicationId": "reasoning-analysis",
  "role": "reasoning",
  "summary": "استدلال با مدل کوچک",
  "description": "مدل کوچکِ دستورپذیر برای بررسی در کارهای استدلال و ابزار؛ اندازهٔ واقعی ثبت‌شده حدود ۲٫۵۲ میلیارد پارامتر است. امتیازهای ناشر را از امتیازهای نقل‌شده از Artificial Analysis جدا کنید؛ شاهد فارسی یا اسپانیایی در این بسته ندارد.",
  "distinguishingFeature": "مدل کوچکِ دستورپذیر برای بررسی در کارهای استدلال و ابزار؛ اندازهٔ واقعی ثبت‌شده حدود ۲٫۵۲ میلیارد پارامتر است. امتیازهای ناشر را از امتیازهای نقل‌شده از Artificial Analysis جدا کنید؛ شاهد فارسی یا اسپانیایی در این بسته ندارد.",
  "conditions": [],
  "basis": "publisher-summary",
  "evidenceIds": [
    "evidence:reference-openbmb-minicpm5-2b-json-ec00591718",
    "evidence:reference-openbmb-minicpm5-2b-readme-md-22881108b0",
    "evidence:reference-openbmb-minicpm5-2b-config-json-47e785ca3a",
    "evidence:reference-openbmb-minicpm5-2b-readme-md-2365657aeb",
    "evidence:reference-openbmb-minicpm5-2b-readme-md-456890d7cc"
  ]
});
modelUseGuidance.push({
  "id": "model-use:ibm-granite-granite-4-2-3b:reasoning-analysis",
  "modelVersionId": "model:ibm-granite-granite-4-2-3b",
  "applicationId": "reasoning-analysis",
  "role": "reasoning",
  "summary": "استدلال با مدل کوچک",
  "description": "گونهٔ استدلالی Granite با حالت‌های thinking و non-thinking؛ برچسب 3B نام اندازه است و شمار ثبت‌شدهٔ پارامترها حدود ۳٫۶۶ میلیارد است. حد بومی ۱۲۸K را از ادعای گسترش تا ۵۱۲K جدا نگه دارید.",
  "distinguishingFeature": "گونهٔ استدلالی Granite با حالت‌های thinking و non-thinking؛ برچسب 3B نام اندازه است و شمار ثبت‌شدهٔ پارامترها حدود ۳٫۶۶ میلیارد است. حد بومی ۱۲۸K را از ادعای گسترش تا ۵۱۲K جدا نگه دارید.",
  "conditions": [],
  "basis": "publisher-summary",
  "evidenceIds": [
    "evidence:reference-ibm-granite-granite-4-2-3b-json-ec00591718",
    "evidence:reference-ibm-granite-granite-4-2-3b-readme-md-22881108b0",
    "evidence:reference-ibm-granite-granite-4-2-3b-config-json-47e785ca3a",
    "evidence:reference-ibm-granite-granite-4-2-3b-readme-md-2365657aeb",
    "evidence:reference-ibm-granite-granite-4-2-3b-readme-md-456890d7cc"
  ]
});
