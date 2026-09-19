# گزارش ادغام پژوهش LLM — ۲۸ شهریور ۱۴۰۵

اصلاحات روی همین مخزن و محیط محلی انجام شد. تغییرات قبلی حفظ شدند؛ commit، push و deploy انجام نشد. منبع اصلی همچنان `data/llm/v0.3.0/repository.json` است؛ پوشهٔ بستهٔ مرجع فقط ورودی بایگانی‌شدهٔ importer است. fingerprintهای قدیمی برای بازگرداندن داده استفاده نشدند.

## حاصل ادغام

| موجودیت | افزوده / تکمیل / ادغام | کنارگذاشته‌شده | وضعیت نهایی |
|---|---|---:|---|
| خانواده | ۳ افزوده؛ Granite با خانوادهٔ موجود | ۰ | ۳۰ خانواده |
| مدل | ۵ افزوده با شناسه، پروفایل، راهنمای کاربرد و شاهد فیلدها | ۰ | ۱۰۰ مدل |
| نرم‌افزار | MLX LM و snapshot نسخهٔ v0.31.3؛ چهار قابلیت مستند مشروط | ۰ | ۱۷ محصول و ۱۷ انتشار |
| نتیجهٔ منتشرشده | ۱۳۲ مشاهده: ۱۱۷ آزمایش تازه، ۹ ادغام در canonical موجود و ۶ تکمیل نتیجهٔ مکمل قبلی | ۰ | ۱۱۹۳ نتیجهٔ canonical؛ ۱۲۵۱ پس از ادغام مکمل |
| شاهد | ۳۲ ثبت سند + ۱۷۰ شاهد موضعی برای فیلدها، نتایج و مطالعه | ۰ | ۲۵۲۲ شاهد canonical |
| پروفایل و راهنمای کاربرد | ۵ پروفایل و ۵ راهنمای کاربرد افزوده | ۰ | ۱۰۰ پروفایل؛ ۴۰۰ راهنمای کاربرد |
| مسیر دریافت | ۵ پیوند به مخزن رسمی در revision ثبت‌شده | ۰ | ۴۸۸ مدخل؛ موجودی فایل و حجم این پنج مدخل نامشخص است |
| مقایسه | ۸ گروه متصل به پنل انتخاب زبان/سنجه، منبع و پروندهٔ مدل | ۰ | ۸ |
| راهنمای انتخاب مرکزی | ۸ راهنما؛ استفادهٔ مشترک در صفحه و مقاله | ۰ | ۸ |
| بخش مقاله | ۸ بخش منطقی در ۲۲ جایگاه زبانی، داخل ۱۹ مقالهٔ موجود | ۰ | نثر و منابع درون‌متنی؛ بدون جایگزینی کل مقاله |
| مقالهٔ کامل EN/ES | ۴ متن با نسخه‌های مفصل‌تر موجود ادغام شدند | ۰ | ۴ مسیر واقعی موجود، با محتوای کامل و تاریخ اصلی |
| ParetoQ | ۱۲ مشاهدهٔ کیفیت برای ۶ گونهٔ آموزش‌دیده، در سه نسخهٔ مقالهٔ کوانتیزه‌سازی | ۰ | هیچ مدل عمومی یا اندازه‌گیری سرعت/حافظه اضافه نشد |

۶ نتیجهٔ قدیمی reranker از مکمل به canonical منتقل شدند و همان شناسهٔ قبلی را نگه داشتند. بنابراین رشد خالص نتایج سایت ۱۱۷ است؛ شمار ۱۳۲، تعداد مشاهدات ورودی است، نه تعداد آزمایش‌های مستقل تازه.

## نگاشت و موارد هم‌هویت

[نگاشت کامل شناسه‌ها](../../../data/llm/v0.3.0/research/reference-import-mapping.json) شامل مدل‌های مبنا و تازه، ۳۲ سند، ۱۳۲ مشاهده و تصمیم‌های ادغام است. تطبیق مدل با مخزن ناشر، نام دقیق و alias انجام شد؛ شناسهٔ معتبر جاری تغییر نکرد.

پنج مدل افزوده:

- `BSC-LT/salamandra-2b-instruct` → `model:bsc-lt-salamandra-2b-instruct`
- `BSC-LT/salamandra-7b-instruct` → `model:bsc-lt-salamandra-7b-instruct`
- `openbmb/MiniCPM5-2B` → `model:openbmb-minicpm5-2b`
- `LiquidAI/LFM2.5-1.2B-Instruct` → `model:liquidai-lfm2-5-1-2b-instruct`
- `ibm-granite/granite-4.2-3b` → `model:ibm-granite-granite-4-2-3b`

نتایج زیر بازنشر یک آزمایش‌اند؛ شاهد تازه به همان نتیجه پیوست:

| مشاهدهٔ بسته | شناسهٔ حفظ‌شده | مبنای ادغام |
|---|---|---|
| `evaluation:supplement-5e30d2472fc2b2bc` | `published-evaluation:v03-e1137b2dba1b68234cff` | امتیاز مدل قبلی در حالت non-thinking؛ گزارش Qwen و بازنشر در جدول کارت Instruct-2507 |
| `evaluation:supplement-c20455489da56598` | `published-evaluation:v03-18054503cef42b07d991` | امتیاز مدل قبلی در حالت non-thinking؛ گزارش Qwen و بازنشر در جدول کارت Instruct-2507 |
| `evaluation:supplement-17f954ccb5ba1468` | `published-evaluation:v03-4a65e5ee5f31c05bcae4` | امتیاز مدل قبلی در حالت non-thinking؛ گزارش Qwen و بازنشر در جدول کارت Instruct-2507 |
| `evaluation:supplement-60b6e4fd15d347aa` | `published-evaluation:v03-c41be34d5ecfd544ca0b` | امتیاز مدل قبلی در حالت non-thinking؛ گزارش Qwen و بازنشر در جدول کارت Instruct-2507 |
| `evaluation:supplement-d2402048f1f183e4` | `published-evaluation:v03-d259ae3684f4b7c2fd76` | امتیاز مدل قبلی در حالت non-thinking؛ گزارش Qwen و بازنشر در جدول کارت Instruct-2507 |
| `evaluation:supplement-530967d2b894a578` | `published-evaluation:v03-7240f08f87bab278e5ea` | امتیاز مدل قبلی در حالت non-thinking؛ گزارش Qwen و بازنشر در جدول کارت Instruct-2507 |
| `evaluation:supplement-9d1d464e23b2b9f7` | `published-evaluation:qwen-qwen3-embedding-0-6b-mteb` | میانگین MTEB همان ارزیابی ناشر، در کارت مجموعه و کارت مدل منفرد |
| `evaluation:supplement-0f624f4cb95961eb` | `published-evaluation:qwen-qwen3-embedding-4b-mteb` | میانگین MTEB همان ارزیابی ناشر، در کارت مجموعه و کارت مدل منفرد |
| `evaluation:supplement-1672818662cf7840` | `published-evaluation:qwen-qwen3-embedding-8b-mteb` | میانگین MTEB همان ارزیابی ناشر، در کارت مجموعه و کارت مدل منفرد |
| `evaluation:supplement-4f9b1b67bcb6d55b` | `published-evaluation:v02-quality:qwen-reranker-qwen-qwen3-reranker-0-6b-mteb-r-main-score-published-aggregate-none` | همان مطالعهٔ reranker با بازیاب اولیه و top-100 مشترک؛ حفظ شناسهٔ مکمل |
| `evaluation:supplement-fe980ae85dfb9969` | `published-evaluation:v02-quality:qwen-reranker-qwen-qwen3-reranker-0-6b-mmteb-r-main-score-published-aggregate-none` | همان مطالعهٔ reranker با بازیاب اولیه و top-100 مشترک؛ حفظ شناسهٔ مکمل |
| `evaluation:supplement-e4b7f36a2e5be102` | `published-evaluation:v02-quality:qwen-reranker-qwen-qwen3-reranker-4b-mteb-r-main-score-published-aggregate-none` | همان مطالعهٔ reranker با بازیاب اولیه و top-100 مشترک؛ حفظ شناسهٔ مکمل |
| `evaluation:supplement-a370f21efa13ad75` | `published-evaluation:v02-quality:qwen-reranker-qwen-qwen3-reranker-4b-mmteb-r-main-score-published-aggregate-none` | همان مطالعهٔ reranker با بازیاب اولیه و top-100 مشترک؛ حفظ شناسهٔ مکمل |
| `evaluation:supplement-0533f0062c9fe297` | `published-evaluation:v02-quality:qwen-reranker-qwen-qwen3-reranker-8b-mteb-r-main-score-published-aggregate-none` | همان مطالعهٔ reranker با بازیاب اولیه و top-100 مشترک؛ حفظ شناسهٔ مکمل |
| `evaluation:supplement-8473dd5579792f09` | `published-evaluation:v02-quality:qwen-reranker-qwen-qwen3-reranker-8b-mmteb-r-main-score-published-aggregate-none` | همان مطالعهٔ reranker با بازیاب اولیه و top-100 مشترک؛ حفظ شناسهٔ مکمل |

برابری عدد به‌تنهایی مبنای ادغام نبود: مشاهدهٔ `evaluation:supplement-fe05fda998c96b79` با امتیاز 69.1 به BFCL با همین عدد متصل نشد؛ بنچمارک آن MMLU-Pro است. همچنین `evaluation:supplement-e89c333a6090ad34` با عدد 43.6، بازتولید OpenBMB است و با نتیجهٔ منتشرشدهٔ خود Qwen یکی نشد. امتیازهای † از Artificial Analysis وارد نشدند؛ در استخراج بسته نیز وجود نداشتند.

## قواعد حفظ‌شده در داده و نمایش

- revision و hash سند، زمان ثبت و محل دقیق هر شاهد حفظ شد. revision وزن آزموده‌شده و تاریخ اجرای آزمون از آن‌ها استخراج نشد.
- LFM: زمینهٔ اعلام‌شده 32,768؛ مقدار فایل تنظیمات 128,000؛ زمینهٔ ارزیابی‌شده نامشخص؛ مجوز تجاری مشروط و متن بندهای مرتبط قابل مشاهده است.
- Granite: شمار ثبت‌شده 3,659,737,600 پارامتر؛ زمینهٔ بومی 131,072؛ ادعای «512K» جداست و به ظرفیت آزموده‌شده تبدیل نشده است. MiniCPM5 شمار 2,516,756,480 را حفظ می‌کند.
- موجودی و حجم فایل‌های پنج مدل تازه در بسته نیست. `inventoryStatus: not-recorded` صریح است؛ مسیر مخزن، حجم فایل یا اجرای اثبات‌شده محسوب نمی‌شود.
- MIRACL روی مقیاس اصلی ۰ تا ۱۰۰ نمایش داده می‌شود؛ 53.7 به 5370% تبدیل نمی‌شود. Recall@100 و nDCG@10، زبان‌ها، نسخه‌ها، حالت‌ها و تنظیمات جدا هستند.
- تفاضل فقط در گزارش مشترکِ مشخص یا پروتکل مستند top-100 مجاز است. یکسان‌بودن دو مقدار نامشخص، مدرک پروتکل مشترک نیست؛ snapshot مشترکِ hashدار سند، صرفاً تفاضل درون همان گزارش را پشتیبانی می‌کند.
- طبقه‌بندی E5، کارت‌های Salamandra و مجموعهٔ embedding Qwen تفاضل یا رتبه‌بندی خودکار ندارند. هیچ‌یک از هشت گروه مجوز رتبه‌بندی عمومی، نسبت کیفیت یا معنی‌داری آماری نمی‌دهد.
- PTEB aggregate و زیرکارهای Retrieval/Reranking/Cross-Tasks حفظ شدند. نتایج نقل‌شدهٔ leaderboard با مطالعهٔ مشترک reranker یکی نشدند. نقش خط پایه، بازیاب اولیه و تعداد ۱۰۰ نامزد قابل مشاهده است.
- StarCoder2 همچنان مدل پایهٔ تکمیل کد است. MLX LM محصول مستقل از MLX است؛ شرط macOS 15 به memory wiring مدل‌های بزرگ محدود مانده است.
- فارسی RTL و انگلیسی/اسپانیایی LTR هستند. پیش‌فرض زبان نتیجه fa/en/es است؛ Tooka و PTEB راهنمای پیش‌فرض بین‌المللی نشده‌اند. نتیجهٔ بدون زبان، نامشخص می‌ماند.
- برچسب فارسیِ پیش‌نویس در کارت‌های مرتبط EN/ES و بیرون‌زدگی انتخاب‌گر مقایسه در موبایل اسپانیایی اصلاح شدند.
- داده‌های عددی معتبر قبلی AirLLM و سروینگ حفظ شدند. جدول و محاسبه‌گر تعاملی هزینه بازنگشت.

## مقاله‌ها و مسیرهای واقعی

تاریخ `date` و فهرست‌های دستی `related` حفظ شدند. زمان بازبینی مقاله‌های تغییرکرده 2026-09-19 است. نسخه‌های EN/ES در حالت پیش‌نویس موجود باقی ماندند و با `?show-drafts=true` قابل مشاهده‌اند. راهنما در هر سه زبان نیز همین gate و noindex را حفظ می‌کند. draftها از sitemap و hreflang ایندکسی کنار گذاشته می‌شوند؛ مسیرهای تغییر زبان مطابق نقشهٔ تحریریه موجود باقی‌اند.

| موضوع | فارسی | انگلیسی | اسپانیایی |
|---|---|---|---|
| model-size | `/articles/right-model-size-for-the-task/` | `/en/articles/right-model-size-for-the-task-en/` | `/es/articles/right-model-size-for-the-task-es/` |
| gpu-memory | `/articles/llms-on-rtx-4090-24gb-vs-48gb/` | `/en/articles/llms-on-rtx-4090-24gb-vs-48gb-en/` | `/es/articles/llms-on-rtx-4090-24gb-vs-48gb-es/` |
| quantization | `/articles/four-bit-model-quantization/` | `/en/articles/four-bit-model-quantization-en/` | `/es/articles/four-bit-model-quantization-es/` |
| layerwise | `/articles/airllm-layer-wise-inference/` | `/en/articles/airllm-layer-wise-inference-en/` | `/es/articles/airllm-layer-wise-inference-es/` |
| rag | `/articles/enterprise-rag-model-embedding-reranker/` | `/en/articles/enterprise-rag-model-embedding-reranker-en/` | `/es/articles/enterprise-rag-model-embedding-reranker-es/` |
| coding | `/articles/code-completion-assistant-and-agent/` | `/en/articles/code-completion-assistant-and-agent-en/` | `/es/articles/code-completion-assistant-and-agent-es/` |
| evaluation | `/articles/evaluating-language-models-for-persian/` | `/en/articles/evaluating-llms-for-your-language-and-workload/` | `/es/articles/evaluar-llm-idioma-y-tarea/` |
| serving | `/articles/single-user-to-enterprise-llm-serving/` | `/en/articles/single-user-to-enterprise-llm-serving-en/` | `/es/articles/single-user-to-enterprise-llm-serving-es/` |
| software | `/articles/ollama-vllm-sglang-or-llama-cpp/` | `/en/articles/ollama-vllm-sglang-or-llama-cpp-en/` | `/es/articles/ollama-vllm-sglang-or-llama-cpp-es/` |
| cost | `/articles/true-llm-cost-buy-rent-or-api/` | `/en/articles/true-llm-cost-buy-rent-or-api-en/` | `/es/articles/true-llm-cost-buy-rent-or-api-es/` |

`language-evidence.en/es` به دو مقالهٔ عمومی ارزیابی زبان و وظیفه نگاشت شد، نه ترجمهٔ صوری مقالهٔ ویژهٔ فارسی. جدول E5، طبقه‌بندی، مطالعهٔ reranker و شواهد Salamandra به روش‌شناسی مفصل‌تر موجود افزوده شدند.

`cost-choice.en/es` به دو نسخهٔ موجود هزینه نگاشت شد. محاسبات آموزشی مفصل‌تر شامل تلاش مجدد، پاسخ پذیرفته‌شده، مالکیت و نقطهٔ سربه‌سر حفظ شدند؛ مثال تکراری ۴۰/۳۶۰ دلار به آن‌ها اضافه نشد. شواهد یکتای محدودیت زمینه و هزینهٔ مرحلهٔ reranker ادغام شدند. قیمت‌ها صریحاً فرضی هستند و تعرفهٔ واقعی یا تبدیل قیمت ایران معرفی نشده‌اند.

[تصمیم‌های ادغام چهار مقاله](../../../data/llm/v0.3.0/research/reference-complete-article-merges.json) و [متن مرکزی هشت بخش](../../../data/llm/v0.3.0/research/reference-editorial.json) قابل بازبینی‌اند. بخش‌ها در محل بحث مربوط قرار دارند؛ مؤلفهٔ مشترک انتخاب از همان دادهٔ مرکزی در مقاله و صفحه استفاده می‌کند.

## موارد باز و محدودیت شواهد

| شناسه | وضعیت باقی‌مانده |
|---|---|
| `coverage:quantization` | ParetoQ فقط کیفیت گونه‌های آموزش‌دیده را می‌دهد؛ شاهد قابل انتقال سرعت یا VRAM نیست. |
| `coverage:coder-next` | مدل `model:qwen-qwen3-coder-next` حفظ شد؛ از PDF بررسی‌نشده عدد تازه رونویسی نشد. |
| `coverage:gated-cards` | README/config برای `CohereLabs/tiny-aya-earth` و `google/embeddinggemma-300m` در بسته 401 داشته‌اند؛ ادعای تازه از کارت محدودشده اضافه نشد. tiny-aya-global موجود با earth یکی نشد. |
| `coverage:modernbert` | ModernBERT و ParsBERT در نقش encoder باقی‌اند؛ نمرهٔ چت اختراع نشده است. |
| `coverage:latam` | بنچمارک منطقه‌ای تأییدشده برای همهٔ گونه‌های آمریکای لاتین در بسته وجود ندارد. |
| `coverage:execution-performance` | گروه تازهٔ آزمون با سخت‌افزار یکسان وجود ندارد؛ سرعت، تأخیر و peak VRAM تازه ساخته نشد. |
| `coverage:article-airllm` | شاهد کارایی تازه ندارد؛ تفکیک حافظهٔ مقیم، انتقال و تأخیر قبلی حفظ شد. |
| `coverage:article-serving` | آزمون ظرفیت تازه ندارد؛ تفکیک درخواست، هم‌زمانی و توان عملیاتی حفظ شد. |
| زبان Salamandra | برچسب غیرمعمول `\no` عین منبع حفظ شد و خودسرانه به یک زبان استاندارد نگاشت نشد. |

هیچ‌یک از ۱۳۲ مشاهده یا ۱۲ رکورد مطالعه دور ریخته نشد. موارد بالا خلأ منبع‌اند، نه کار اجرایی نیمه‌تمام. صورت کامل پوشش در [coverage-review](../../../data/llm/v0.3.0/research/reference-pack-2026-09-16/data/coverage-review.json) موجود است.

## کنترل‌های نهایی

| کنترل | نتیجه |
|---|---|
| validator بسته | PASS؛ ۱۸۴۶ کنترل |
| validator canonical و مکمل | انواع، روابط، شاهد، شناسه، واحد، hash وابستگی، خروجی تولیدشده و ردیف‌های نمایش موفق |
| `npm run check` | ۰ خطا و ۰ هشدار |
| `npm test` | ۱۷۸ موفق، ۰ شکست |
| `npm run build` | موفق؛ sitemap از خروجی تازه ساخته شد |
| sitemap / دادهٔ ساخت‌یافته / لینک کوتاه | ۱۹۳ صفحهٔ indexable، ۲۲۵ بلوک JSON-LD، ۲۳۴ مقصد لینک کوتاه تأیید شدند |
| مرورگر هر سه زبان | مدل‌های تازه در فیلتر واقعی، MLX LM، دو سنجهٔ MIRACL، زبان نامشخص، منبع، لینک مدل/مقایسه، مجوز و زمینه، gate پیش‌نویس موفق |
| چهار مقالهٔ واقعی | متن کامل، canonical صحیح، noindex و نبود نشت فارسی در EN/ES تأیید شد |
| موبایل | عرض viewport و سند در هر سه زبان دقیقاً ۳۹۰ پیکسل؛ جدول داخل محفظهٔ خودش پیمایش می‌شود |
| تکرارپذیری | اجرای دوباره روی ۱۷۹ فایل، بدون حتی یک تغییر بایتی |
| `git diff --check` | موفق |

در جریان کار، آزمون‌های دارای شمار ثابت با دادهٔ جدید تطبیق داده شدند. آزمون GPU نیز فرض قدیمی «همهٔ روابط فقط داخل همان مجموعه‌اند» را با بررسی واقعی وجود، زبان و وضعیت انتشار مقصد جایگزین کرد؛ مقالهٔ تازهٔ قبلی GPU به نوشته‌های معتبر ZTAI مرتبط است. محدودیت ساخت پردازش فرزند در sandbox برای اجرای آزمون‌ها رفع شد. هشدارهای موجودِ tabindex جداول و اندازهٔ bundle در build مانع ساخت نیستند؛ typecheck بدون هشدار است.

- [خروجی validator](../../../data/llm/v0.3.0/research/reference-import-validation.json)
- [نتیجهٔ تکرارپذیری](../../../data/llm/v0.3.0/research/reference-idempotency.json)
- [بررسی مرورگر](browser-review.json)
- تصاویر دسکتاپ: [فارسی](fa-miracl.png)، [English](en-miracl.png)، [Español](es-miracl.png)
- تصاویر موبایل: [فارسی](fa-miracl-mobile.png)، [English](en-miracl-mobile.png)، [Español](es-miracl-mobile.png)

## فایل‌های اصلی تغییر

- canonical، manifest، نگاشت و ورودی پژوهش در `data/llm/v0.3.0/`؛ متن‌های ترجمه در `data/llm/locales/`.
- importer، ادغام مقاله، کنترل تکرارپذیری و validator در `scripts/`؛ ماژول‌های typed با generator معمول پروژه تولید شدند.
- `schema.ts`، `reference-types.ts`، `reference.ts` و `evaluation.ts`: حفظ مشاهدات، نوع شواهد و مجوز مقایسه.
- `LlmReferenceComparisons`، `LlmReferenceGuidance` و اتصال آن‌ها به انتخاب، پرونده و صفحه؛ `RelatedStream` برای برچسب‌های زبان.
- ۲۳ فایل مقاله؛ متن و تاریخ انتشار اصلی حفظ و بخش‌های مرتبط تکمیل شد.
- `markdown-headings.mjs`: ادغام متغیر headingPrefix در script موجود مقاله، برای مصرف مؤلفهٔ مشترک بدون script تکراری.
- سه لوگوی رسمی محلی و [ثبت منشأ آن‌ها](../../../data/llm/v0.3.0/research/reference-brand-assets.json).

برای بازتولید، دستورهای [README داده](../../../data/llm/README.md#reference-integration-reviewed-2026-09-19) را به‌ترتیب اجرا کنید. پیش‌نمایش جاری: `http://127.0.0.1:5195/guides/llm/?show-drafts=true`.
