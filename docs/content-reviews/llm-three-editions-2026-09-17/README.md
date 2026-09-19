# تکمیل محلی راهنمای LLM در سه زبان — ۱۷ سپتامبر ۲۰۲۶

درخواست اصلی در [request.md](request.md) حفظ شده است. تغییرات فقط محلی‌اند؛ commit، push یا deploy انجام نشده است. وضعیت draft راهنما و وضعیت انتشار مقاله‌های فارسی عوض نشده؛ ۲۰ مقالهٔ تازهٔ EN/ES همگی پیش‌نویس‌اند. تاریخ انتشار ترجمه‌ها همان تاریخ مقالهٔ مبدأ است.

## نتیجه و مسیرهای بازبینی

- [فارسی](http://localhost:5193/guides/llm/?show-drafts=true)
- [English](http://localhost:5193/en/guides/llm/?show-drafts=true)
- [Español](http://localhost:5193/es/guides/llm/?show-drafts=true)

سرور محلی، خروجی ایستای `build/` را بدون SPA fallback ارائه می‌کند. برای اجرای دوباره: `PORT=5193 npm run preview:local`. همین مسیرها روی سرور توسعه نیز کار می‌کنند. query پیش‌نمایش سازوکار احراز هویت نیست.

## تغییرهای مؤثر

- زبان نتیجه اکنون نوع مشخص دارد: تک‌زبان، جهت ترجمه، تجمیع چندزبانه و نامشخص. `default` انگلیسی فرض نمی‌شود. زبان رابط، هدف کاربرد و شاهد نتیجه از هم جدا شدند. کلیدهای تنظیمات ثابت شدند و عنوان اصلی منبع برای بازبینی حفظ شده است.
- مشابه‌بودن نام آزمون و امتیاز دیگر دو مشاهده را یکی نمی‌کند. مدل، نسخه/زیرمجموعه، metric، زبان، mode، پروتکل و منشأ باید همسانی را اثبات کنند. نتیجهٔ یکپارچه ۱۱۳۴ مشاهده است؛ افزایش نسبت به ۱۱۰۱ حاصل حفظ ۳۳ مشاهده با هویت اثبات‌نشده است، نه تولید امتیاز تازه.
- زیرنمای کیفیت، مقایسهٔ چند مدل را بدون بازکردن پرونده‌های متعدد فراهم می‌کند. نمایش کنار هم، ترتیب عددی، نسبت و ادعای برتری علمی مجوزهای جدا دارند. جدول مشترک DeepSeek/MATH-500 نمونهٔ ترتیب مجاز است؛ تفاوت یا ابهام شرایط آن را متوقف می‌کند. هیچ برتری آماری ساخته نشده است.
- مقایسهٔ کارایی برای سه مسیر BF16 گزارش GPUStack/Qwen3-14B روی H100 با پروتکل مشترک فعال است؛ افزودن FP8 به همان مقایسه مجاز تلقی نمی‌شود. latency و throughput جهت یکسان ندارند.
- KV متعارف فقط برای معماری‌های پشتیبانی‌شده محاسبه می‌شود. MLA، hybrid و معماری نامعلوم با همان فرمول تخمین زده نمی‌شوند؛ محدودیت artifact، درخواست فعال و ذخیرهٔ هر دستگاه حفظ شده است.
- انتخاب مدل‌ها، فیلترها، ستون‌ها، شیوهٔ مقایسه، زبان هدف، سناریوی حافظه و گروه آزمون در URL بازسازی می‌شوند. مسیر task نیز شناسهٔ پایدار دارد. تغییر زبان معادل واقعی مقاله را پیدا می‌کند.
- یک repository فنی مشترک و کارخانه‌های صریح locale داریم. متن مؤلفه‌ها fallback فارسی ندارد؛ ترجمه‌ها با شناسهٔ رکورد و مسیر فیلد پیوند می‌خورند. یادداشت‌های منابع در `presentationNotes` انتخاب شده‌اند؛ تغییر جملهٔ فارسی دیگر سیاست حذف یا حفظ قید را عوض نمی‌کند.
- منبع اصلی همچنان `data/llm/v0.3.0/repository.json` است. ۲۵ ماژول با generator بازتولید شدند. مکمل ۰٫۲ حذف نشده؛ manifest جاریِ وابستگی‌ها جدا از checksum آرشیوی اعتبارسنجی می‌شود.
- هر سه مسیر راهنما و ۲۰ مسیر مقاله، preview ایستای کامل دارند. عنوان/description یکتا، canonical بدون query، `lang`/`dir` صحیح و `noindex` بررسی شد. نقشهٔ سایت و hreflang عمومی شامل پیش‌نویس‌های تازه نیستند.
- روش گردآوری، پوشش NVIDIA و محدودیت دادهٔ هم‌شرط برای CPU/Apple/AMD در هر edition آمده است. مسیر گزارش اصلاح به راه‌های ارتباطی موجود در رزومه وصل است. جدول تعاملی هزینه برنگشته است.

## موجودی واقعی

۹۵ مدل و پرونده، ۲۷ خانواده، ۱۶ محصول نرم‌افزاری، ۳۹۵ راهنمای کاربرد، ۴۸۳ بستهٔ دریافت در پایه، ۱۰۷۰ نتیجهٔ کیفیت در پایه و ۱۱۳۴ مشاهده پس از ادغام؛ ۲۳۲۰ شاهد پایه و ۱۲۷ منبع مکمل. مدل‌ها شامل ۵۰ مولد، ۲۱ مدل تصویر/زبان، ۱۶ embedding، شش reranker و دو encoder/classifier هستند. هفت نمای جدولی و زیرنمای کیفیت حفظ شده‌اند؛ تعداد ردیفِ هر نما به فیلتر و سناریو وابسته است.

کنترل ترجمه: **۱۳۳۰ پیام، ۹۴۹ متن تحریری یکتا و ۴۹۱۴ اتصال فیلد به متن** در سه زبان. خطای کلید، placeholder، متن خالی، نشت فارسی و تغییر متن مبدأ بدون بازبینی ترجمه، اعتبارسنجی را متوقف می‌کند. شمار مقاله‌ها از manifest گرفته می‌شود؛ هر edition ده موضوع دارد.

## نگاشت مقاله‌ها

ستون پایانی، شمار واژهٔ متن EN/ES است؛ معیار تقریبی حجم، نه ادعای سنجش کیفیت. فهرست ماشینی و تصاویر در [article-inventory.json](article-inventory.json) آمده است.

| موضوع | مقالهٔ فارسی | انگلیسی | اسپانیایی | تاریخ انتشار | واژه EN / ES |
|---|---|---|---|---|---|
| اندازهٔ مدل | `right-model-size-for-the-task` | [EN](http://localhost:5193/en/articles/right-model-size-for-the-task-en/?show-drafts=true) | [ES](http://localhost:5193/es/articles/right-model-size-for-the-task-es/?show-drafts=true) | 2026-06-18 | 2330 / 2535 |
| ۲۴ و ۴۸ گیگابایت | `llms-on-rtx-4090-24gb-vs-48gb` | [EN](http://localhost:5193/en/articles/llms-on-rtx-4090-24gb-vs-48gb-en/?show-drafts=true) | [ES](http://localhost:5193/es/articles/llms-on-rtx-4090-24gb-vs-48gb-es/?show-drafts=true) | 2026-07-02 | 2157 / 2335 |
| کوانتیزه‌سازی چهاربیتی | `four-bit-model-quantization` | [EN](http://localhost:5193/en/articles/four-bit-model-quantization-en/?show-drafts=true) | [ES](http://localhost:5193/es/articles/four-bit-model-quantization-es/?show-drafts=true) | 2026-07-13 | 1920 / 2108 |
| AirLLM | `airllm-layer-wise-inference` | [EN](http://localhost:5193/en/articles/airllm-layer-wise-inference-en/?show-drafts=true) | [ES](http://localhost:5193/es/articles/airllm-layer-wise-inference-es/?show-drafts=true) | 2026-07-29 | 2141 / 2322 |
| زنجیرهٔ RAG | `enterprise-rag-model-embedding-reranker` | [EN](http://localhost:5193/en/articles/enterprise-rag-model-embedding-reranker-en/?show-drafts=true) | [ES](http://localhost:5193/es/articles/enterprise-rag-model-embedding-reranker-es/?show-drafts=true) | 2026-08-12 | 2232 / 2381 |
| تکمیل کد، دستیار و عامل | `code-completion-assistant-and-agent` | [EN](http://localhost:5193/en/articles/code-completion-assistant-and-agent-en/?show-drafts=true) | [ES](http://localhost:5193/es/articles/code-completion-assistant-and-agent-es/?show-drafts=true) | 2026-08-24 | 2110 / 2190 |
| ارزیابی زبان و کاربرد | `evaluating-language-models-for-persian` | [EN](http://localhost:5193/en/articles/evaluating-llms-for-your-language-and-workload/?show-drafts=true) | [ES](http://localhost:5193/es/articles/evaluar-llm-idioma-y-tarea/?show-drafts=true) | 2026-09-02 | 2273 / 2498 |
| سرویس‌دهی سازمانی | `single-user-to-enterprise-llm-serving` | [EN](http://localhost:5193/en/articles/single-user-to-enterprise-llm-serving-en/?show-drafts=true) | [ES](http://localhost:5193/es/articles/single-user-to-enterprise-llm-serving-es/?show-drafts=true) | 2026-09-08 | 2482 / 2566 |
| نرم‌افزار اجرا | `ollama-vllm-sglang-or-llama-cpp` | [EN](http://localhost:5193/en/articles/ollama-vllm-sglang-or-llama-cpp-en/?show-drafts=true) | [ES](http://localhost:5193/es/articles/ollama-vllm-sglang-or-llama-cpp-es/?show-drafts=true) | 2026-09-15 | 2307 / 2506 |
| هزینهٔ خرید، اجاره و API | `true-llm-cost-buy-rent-or-api` | [EN](http://localhost:5193/en/articles/true-llm-cost-buy-rent-or-api-en/?show-drafts=true) | [ES](http://localhost:5193/es/articles/true-llm-cost-buy-rent-or-api-es/?show-drafts=true) | 2026-09-16 | 2377 / 2473 |

مقالهٔ تخصصی ارزیابی فارسی ترجمهٔ لفظی نشده است: EN/ES یک مقالهٔ عمومی دربارهٔ زبان و کاربرد با گروه ترجمهٔ مستقل دارند. برای اسپانیایی، IberoBench، taskهای SpanishBench و تفاوت نتیجهٔ بومی، ترجمه‌شده و میانگین چندزبانه توضیح داده شده است. کاور آن‌ها نسخهٔ محلیِ بی‌نوشتهٔ فارسی است؛ اصل فارسی تغییر نکرده است.

هزینهٔ EN/ES بازنویسی مستقل با فرض آموزشی USD است؛ [بازحساب اعداد](cost-arithmetic.json) ثبت شده است. همهٔ ورودی‌ها و حساب خرید/اجاره/API آشکارند؛ نرخ‌ها قیمت بازار معرفی نشده‌اند. حساب‌های فارسی با snapshot قیمت ۱۶ سپتامبر و اسکریپت قبلی قیمت‌ها دوباره کنترل شدند. کارت GPT-OSS در مقالهٔ فارسی 4090 اصلاح شد: ادعای ۱۶GB ناشر به هر GGUF، زمینه و موتور تعمیم ندارد. سایر اصلاح‌های درست ممیزی قبلی حفظ شدند. [منابع و بازبینی موضوعی](sources-and-coverage.md) جزئیات را ثبت می‌کند.

## کنترل‌ها

- `npm run generate:llm`: موفق؛ اجرای دوباره هر ۲۵ ماژول را بدون تفاوت تولید کرد؛ [هش‌ها](generation-check.json).
- `npm run verify:llm`: موفق؛ schema، ارجاع‌ها، ادعاها، حجم فایل‌ها، manifest مکمل، مخزن ادغام‌شده و ترجمه‌ها.
- `npm run check`: صفر خطا و صفر هشدار.
- `npm test`: **۱۷۲ از ۱۷۲ موفق**. baseline سه شکست داشت: کنترل پیوندِ فارسیِ صریحاً برچسب‌خورده در متن بین‌المللی و دو کنترل GPU که fragment فارسی URL را با نثر ترجمه‌نشده اشتباه می‌گرفتند. اصلاح محدود شد به متن قابل‌مشاهده و استثنای دقیق منبع؛ کنترل تاریخ، مقصد و وضعیت انتشار باقی است. دو آزمون تازه نیز جداسازی metadata از متن مقاله، شناسه‌های heading و به‌روزرسانی توسعه را کنترل می‌کنند.
- `npm run build`: موفق؛ ۲۱۸ صفحه، ۲۱۸ بلوک JSON-LD، ۱۸۶ URL قابل نمایه‌سازی و ۲۲۱ مقصد لینک کوتاه اعتبارسنجی شدند. هشدارهای موجود mdsvex دربارهٔ محفظهٔ جدول و هشدار حجم chunk باقی‌اند؛ build بدون خطاست، نه بدون هشدار.
- بررسی قیمت فارسی: تعرفه‌ها، هشت قطعه، جمع سبد، ارز، محاسبهٔ دوساله و ترتیب زمانی لینک‌ها موفق.
- مرورگر واقعی روی build: هفت نما و کیفیت در FA/EN/ES؛ پروندهٔ مولد، BGE-M3 و مدل فاقد نتیجهٔ کیفیت، شش پنل و منابع/راه‌اندازی؛ focus، Escape و بازگشت focus؛ کیفیت و کارایی معتبر/نامعتبر؛ reload/back/forward/تغییر زبان؛ سناریوی حافظه، ورودی نامعتبر و نتیجهٔ خالی؛ هر ۲۰ مقالهٔ مستقل؛ noindex/canonical و لینک‌ها. در نماهای بررسی‌شده، نشت فارسی EN/ES، تصویر خراب، خطای JS و اسکرول افقی صفحه دیده نشد.
- عرض‌های ۱۴۴۰ و ۳۹۰، تم روشن و تیره بررسی شدند. [گزارش مرورگر](browser/review.json) و [مقاله‌ها، سناریو و بارگذاری](browser/static-review.json). تصاویر کامل آغاز صفحه: [FA دسکتاپ](browser/fa-opening-1440.png)، [FA موبایل](browser/fa-opening-390.png)، [EN دسکتاپ](browser/en-opening-1440.png)، [EN موبایل](browser/en-opening-390.png)، [ES دسکتاپ](browser/es-opening-1440.png)، [ES موبایل](browser/es-opening-390.png).

## اندازه‌گیری بارگذاری

نسخهٔ قبل از `HEAD` در پوشهٔ جدا با همان وابستگی‌ها و دارایی‌های محلی slides/gallery ساخته شد؛ هر دو build کامل موفق‌اند. اندازه‌ها برای preview کامل راهنما با ده فصل، cache خاموش و بدون scroll اولیه هستند. gzip با Node از فایل‌های واقعاً درخواست‌شده محاسبه شده؛ سرور محلی فایل‌ها را فشرده ارسال نمی‌کند. Google Analytics در مرورگر آزمون مسدود است و درخواست صفر‌بایتی آن در تعداد کل دیده می‌شود. برای جدول‌ها هیچ API خارجی درخواست نشد.

| مرحله | زبان | درخواست JS | بایت JS بازشده | بایت gzip محاسباتی | همهٔ درخواست‌ها |
|---|---|---:|---:|---:|---:|
| قبل | fa | 31 | 8641718 | 1235396 | 82 |
| بعد | fa | 44 | 7769877 | 884603 | 91 |
| بعد | en | 45 | 7597314 | 854318 | 88 |
| بعد | es | 45 | 7625949 | 859234 | 87 |

پس از جداسازی metadata از بدنهٔ Markdown، JS بازشدهٔ فارسی حدود ۱۰٪ و مجموع gzip آن حدود ۲۸٪ از baseline کمتر است. تعداد درخواست‌های JS به‌دلیل فایل‌های مستقل مقاله بیشتر شده است؛ این اندازه‌گیری حجم است، نه ادعای بهبود زمان پاسخ یا Core Web Vitals. دادهٔ فنی مشترک در یک مسیر bundle مصرف می‌شود؛ سه کپی repository ساخته نشده است. بررسی manifest و درخواست‌ها تأیید کرد پیام‌ها و متن رکوردِ editionهای دیگر بار نمی‌شوند. فصل‌های همان edition بارگذاری می‌شوند؛ مقاله‌های کامل زبان‌های دیگر وارد بار اولیهٔ راهنما نمی‌شوند. راهنما با وجود کاهش حجم، همچنان دادهٔ زیادی بار می‌کند؛ gzip حدود ۰٫۸۵ تا ۰٫۸۹ مگابایت است و بارگیری/ساخت نماها در دستگاه‌های ضعیف همچنان محدودیت قابل بررسی دارد.

## فایل‌ها و محدودیت‌های باقی‌مانده

فایل‌های اصلی: `data/llm/v0.3.0/repository.json`، `data/llm/locales/`، `starting-tasks.json`، `src/lib/llm/{evaluation,performance-policy,selection,editions,edition-manifest}.ts`، کارخانه‌های نما، مؤلفه‌های `Llm*`، routeهای سه راهنما و مقاله‌های EN/ES، `translation-groups.json`، validator و تست‌ها. `scripts/article-metadata-plugin.mjs` نیز واردات فراداده را از بدنهٔ مقاله جدا می‌کند؛ الگوریتم heading و تاریخ‌های قبلی حفظ شده‌اند.

نبود revision وزن آزموده‌شده یا زبان مشخص همچنان «نامشخص» است؛ commit سند جای آن ننشسته است. شواهد تک‌زبان برای همهٔ مدل‌ها موجود نیست و توصیهٔ آغاز رتبه‌بندی جهانی نیست. سرعت، هم‌زمانی و کیفیت از عدد حافظه استنتاج نشده‌اند. پوشش آزمایش هم‌شرط CPU/Apple/AMD کامل نیست. همهٔ ادعاهای ۹۵ مدل از نو آزمایش نشده‌اند؛ این کار مرور منابع و اصلاح معناست. قیمت‌های فارسی snapshot تاریخ‌دارند؛ مثال بین‌المللی آموزشی است. انتشار عمومی نیازمند تصمیم تحریری بعدی است.
