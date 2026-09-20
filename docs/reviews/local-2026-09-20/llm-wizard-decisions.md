# بازبینی موتور راهنمای انتخاب مدل — ۲۰ سپتامبر ۲۰۲۶

این اصلاح فقط روی نسخهٔ محلی انجام شده است. دستور استقرار، ارسال پیام یا انتشار بیرونی اجرا نشده است.

## تغییر رفتار

| پیش از اصلاح | پس از اصلاح |
| --- | --- |
| انتخاب از چند فهرست ثابت و امتیاز وابسته به ترتیب نام‌ها | بررسی تمام ۱۱۳ رکورد کاتالوگ؛ کاربرد، شواهد زبانی/وظیفه، فایل وزن، موتور، زمینه، مجوز و حافظه در بررسی دخالت دارند. شناسهٔ مدل در قواعد انتخاب ثابت نشده است. |
| اطلاعات کاربر بیشتر در متن نتیجه تکرار می‌شد | تصمیم‌ها ساختار مستقل دارند: نتیجه، پاسخ‌های مؤثر، منابع، شرط، فرض و وضعیت. نامزدها، جدول فیلترشده و تحویل فنی/پیمانکار از یک نتیجه ساخته می‌شوند. |
| عبور از همهٔ سؤال‌های مسیر برای نتیجه لازم بود | مسیر اولیه حداکثر ۱۰ تعریف مرتبط در سه گام دارد؛ پس از انتخاب کار، نتیجهٔ اولیه ممکن است. مشخصات عددی و اجرایی در ادامهٔ اختیاری قرار دارند. |
| گروه نوشتن یک کار واحد بود | ترجمه، خلاصه، نگارش و بازنویسی شاخه و معیار پذیرش جدا دارند. شواهد ترجمه و بلندمتن جدا در انتخاب بررسی می‌شوند. |
| پرسش کوتاه، بازیابی آرشیو را حذف می‌کرد | آرشیو مستقل از طول سؤال، مسیر بازیابی دارد؛ reranker فقط برای مسئلهٔ رتبه‌بندی پیشنهاد می‌شود. |
| سند بلند و آرشیو نتیجهٔ مشابه داشتند | پوشش بخش‌های سند کامل با پیدا کردن سند در آرشیو جدا شده؛ اسکن نیز دو مسیر OCR+متن و بینایی دارد. |
| «دستگاه ندارم» و «مشخصات نامعلوم» یک نتیجه داشتند | اولی مسیر تأمین پایلوت می‌خواهد؛ دومی بررسی وجود دستگاه و حافظه. بدون دستگاه و بودجهٔ خرید/مصرف، وضعیت ناسازگار صریح است. |
| تغییر هم‌زمانی عمدتاً بازتاب عدد بود | سرویس مرکزی، پذیرش بار، صف و آزمون ظرفیت تغییر می‌کنند. ۵ کاربر/۱۰۰ درخواست مسدود یا به ۵ محدود نمی‌شود؛ تعریف بار پرسیده می‌شود. |
| مهلت batch فقط بازگو می‌شد | نرخ لازم از تعداد/مهلت محاسبه می‌شود؛ ۱۰۰۰ مورد در ۴ ساعت = ۲۵۰ مورد/ساعت، یا تکمیل تجمعی هر ۱۴٫۴ ثانیه. |
| مالک نگهداری، ریسک و اتصال عامل اثر کمی داشتند | تحویل تیم داخلی، خدمت مدیریت‌شده، آموزش، تأیید تغییر، اتصال UI/API و آزمون پذیرش مسیرهای جدا دارند. |
| بودجه بیشتر تکرار می‌شد | بودجه با نمونهٔ خرید منبع‌دار مقایسه می‌شود؛ میانگین مصرف توکن، پلهٔ تعرفه و مقایسه با سقف ماهانه محاسبات جدا دارند. |
| بیشترین تاریخ ویرایش مدل به‌جای بازبینی پوشش استفاده می‌شد | بررسی چهار عرضهٔ Qwen و گزارش موجودی ناشران ۳۰ خانواده جدا ثبت شده‌اند. |

## انتخاب نامزدها

امتیاز، میزان پوشش مستند نیاز است؛ رتبه‌بندی کیفیت مدل‌ها بر اساس جمع‌زدن benchmarkهای ناهم‌سنخ نیست. گزینهٔ شروع از مدل‌های نزدیک به بهترین پوشش مستند انتخاب می‌شود و سپس حجم بسته مقایسه می‌شود. گزینه‌های بعدی باید تفاوتی در زمینه، زبان، معماری، خانواده یا موتور داشته باشند؛ کارت سوم اجباری نیست.

هر رکورد در نتیجهٔ محاسبات بررسی می‌شود و وضعیت ورود/کنارگذاری، پاسخ‌های مؤثر، منابع، امتیاز و علت قرارگرفتن یا نگرفتن در فهرست کوتاه را نگه می‌دارد. نبود برآورد حافظه، به معنی تأیید جاگرفتن مدل نیست. نامزد تازه با metadata کافی بدون تغییر فهرست شناسه‌ها قابل انتخاب است؛ این رفتار آزمون شده است.

## داده‌های رسمی افزوده‌شده

- [Qwen3.6-27B](https://huggingface.co/Qwen/Qwen3.6-27B): نسخهٔ `6a9e13bd6fc8f0983b9b99948120bc37f49c13e9`؛ جزء زبانی ۲۷B، شمار عناصر ذخیره‌شده جدا؛ وزن BF16 رسمی، توجه ترکیبی، زمینهٔ بومی ۲۶۲٬۱۴۴ و توسعه با YaRN تا ۱٬۰۱۰٬۰۰۰.
- [Qwen3.6-35B-A3B](https://huggingface.co/Qwen/Qwen3.6-35B-A3B): نسخهٔ `995ad96eacd98c81ed38be0c5b274b04031597b0`؛ ۳۵B در جزء زبانی و ۳B فعال؛ محاسبهٔ حجم وزن از همهٔ فایل‌های واقعی انجام می‌شود.
- [Qwen3.7-Plus](https://www.alibabacloud.com/help/en/model-studio/qwen3-7-plus) و [Qwen3.7-Max](https://www.alibabacloud.com/help/en/model-studio/qwen3-7-max): رکورد API با snapshot، منطقه/ارائه‌دهنده و تاریخ بررسی. نصب محلی تأیید نشده؛ جست‌وجوی Qwen3.7 توضیح وضعیت را نمایش می‌دهد.
- مثال تعرفهٔ Model Studio سنگاپور: Plus در پلهٔ ورودی تا ۲۵۶هزار، ۰٫۴ دلار ورودی و ۱٫۶ دلار خروجی به‌ازای میلیون توکن؛ پلهٔ بعد ۱٫۲ و ۴٫۸ دلار. Max: ۲٫۵ و ۷٫۵ دلار. منابع همان صفحات رسمی بالا، بررسی ۲۰ سپتامبر. انتخاب تعرفه، دسترسی حساب یا مجازبودن ارسال داده را اثبات نمی‌کند.

فایل `family-coverage-2026-09-20.json` مقایسهٔ موجودی ناشران رسمی برای ۳۰ خانواده را ثبت می‌کند. فهرست اختلاف‌ها شامل مدل‌های پایه، نسخه‌های قدیمی و نسخه‌های نیازمند بررسی است؛ تعداد اختلاف‌ها به معنی تعداد مدل‌های لازم برای اضافه‌شدن نیست. این بررسی موجودی، ادعای ارزیابی کیفیت همهٔ عرضه‌ها یا پوشش تمام APIهای بازار نیست.

## فایل‌های اصلی

- `src/lib/llm/wizard-core.ts`: پاک‌سازی پاسخ، اعتبارسنجی، شرط سؤال‌ها و برآورد واقعی حافظه.
- `src/lib/llm/wizard-candidates.ts`: بررسی کاتالوگ و انتخاب نامزدها.
- `src/lib/llm/wizard-decisions.ts`: مسیر راهکار، ظرفیت، هزینه، عملیات و پذیرش با منشأ مشخص.
- `src/lib/llm/wizard.ts`: نتیجهٔ مشترک و سناریوهای فرضی جدا از پاسخ کاربر.
- `src/lib/components/LlmOrganizationWizard.svelte`: مسیر کوتاه/تکمیلی، نتیجه، مهاجرت ذخیرهٔ قبلی و تحویل مشترک.
- `src/lib/components/LlmDataView.svelte`: جست‌وجو و وضعیت مدل‌های API.
- `data/llm/wizard-questions.json`، `api-models.json`، `api-tariffs.json`، فایل‌های بازبینی پوشش و snapshotهای منابع.
- کاتالوگ اصلی، رکوردهای ترجمه، bindings و ماژول‌های تولیدشده برای دو مدل جدید به‌روزرسانی شده‌اند.
- `scripts/import-llm-wizard-20260920.py` و `scripts/audit-llm-family-coverage.py`: ورود تکرارپذیر داده و گزارش موجودی.
- `tests/llm-wizard-decisions.test.mjs`، `tests/llm-wizard-decisions.review.mjs`؛ آزمون‌های قبلی نیز با حفظ هدف اعتبارسنجی، برای رفتار جدید تنظیم شدند.

## محاسبات و محدودیت‌های عملی

- نمونهٔ خرید سیستم کامل 4090 با ۲۴GB برابر ۱٬۱۱۶٫۱ میلیون تومان از اقلام موجود با تاریخ ۱۶ تا ۱۹ سپتامبر است. قیمت روز ۲۰ سپتامبر یا پیکربندی تأییدشدهٔ کاربر معرفی نمی‌شود. برق، عملیات و پشتیبانی جدا هستند.
- برآورد API فقط با میانگین ورودی/خروجی، تعداد درخواست و سقف ورودی لازم برای انتخاب پله ساخته می‌شود. روزهای کارِ اعلام‌نشده در سناریو ۲۲ فرض می‌شود و این فرض جدا از پاسخ کاربر نمایش داده می‌شود. cache، ابزار پولی و تفاوت تعرفهٔ مناطق وارد این مثال نشده‌اند؛ خروجی متوسط باید توکن تفکرِ قابل‌صورتحساب را شامل شود.
- عبور از ۱۲۸ درخواست فعال وضعیت خارج از محاسبه‌گر دارد. برای معماری ترکیبی Qwen3.6، KV ترنسفورمر کامل جعل نمی‌شود. حافظهٔ کارت‌ها هم بدون تأیید تقسیم مدل جمع نمی‌شود.
- ورودی، تعداد درخواست و زمان پاسخ مجهول، به جواب قطعی کاربر تبدیل نمی‌شوند. برآوردهای سناریویی از پاسخ‌ها جدا هستند. رسیدن به سرعت و کیفیت مطلوب همچنان نیازمند آزمون بار واقعی است؛ در این کار benchmark سخت‌افزاری اجرا نشده است.
- مرجع تعرفهٔ نمونه فعلاً Model Studio سنگاپور است؛ برای سرویس دیگر یا قرارداد داخلی، همان جزء هزینه باید قیمت‌گذاری شود. تبدیل خودکار دلار به یورو انجام نمی‌شود.

## بررسی نهایی

- `npm run check`: صفر خطا و صفر هشدار.
- `npm run build`: موفق؛ نقشهٔ سایت با ۲۰۰ صفحهٔ قابل نمایه‌سازی، ۲۲۷ بلوک دادهٔ ساختاریافته و ۲۵۹ مقصد لینک کوتاه معتبر است.
- `npm run verify:llm`: اعتبارسنجی داده و ترجمه‌ها موفق.
- `node tests/llm-wizard-decisions.test.mjs`: هر ۱۷ آزمون رفتاری موفق؛ سناریوهای پذیرش در آزمون‌های ترکیبی پوشش داده شده‌اند.
- `node tests/llm-update-20260919.test.mjs`: هر ۱۰ آزمون بازگشتی موفق.
- بررسی مرورگر: فارسی، انگلیسی و اسپانیایی؛ مسیر اولیه بدون تکمیل جزئیات، تطابق نامزدها در نتیجه/تحویل/جدول، جست‌وجوی Qwen3.7، مهاجرت ذخیرهٔ قبلی، ویرایش و پاک‌کردن پاسخ‌ها، Escape و بازگشایی پنجره، هدر ثابت، عرض‌های ۱۴۴۰ و ۳۹۰.
- آزمون عددی مرورگر: بازهٔ ساعت، عدد صحیح، اعشار فارسی، خطای میان فیلدها، ذخیره‌نشدن مقدار نامعتبر، میلیون تومان و نرخ ارز، پاک‌شدن مبالغ پس از تغییر واحد و محدودبودن واحدها به دلار/یورو در انگلیسی و اسپانیایی.
- تم روشن و تیره بررسی شدند؛ تصاویر نهایی در پوشهٔ `wizard-decisions/` کنار این گزارش هستند.
- `git diff --check`: موفق.

[نمای فارسی دسکتاپ](wizard-decisions/fa-result-1440.png) · [نمای فارسی موبایل](wizard-decisions/fa-result-390.png) · [تم روشن](wizard-decisions/fa-result-light-1440.png)


## اصلاح ترجیح شروع برای فارسی

طبق درخواست بعدی صاحب سایت، برای نگارش/بازنویسی/خلاصه، استخراج ساده یا گفت‌وگوی عمومی، با مبدأ و مقصد فارسی و انتخاب ورودی کوتاه، Aya Expanse 8B گزینهٔ شروع ترجیحی است. این یک اولویت تحریری صریح است و امتیاز شواهد یا ادعای برتری benchmark را تغییر نمی‌دهد.

اگر مجموع طول ورودی و خروجیِ اعلام‌شده بیش از ۴۰۹۶ توکن باشد، یا کار به آرشیو، ابزار، کد، تصویر یا خروجی بلند نیاز داشته باشد، این اولویت فعال نمی‌شود. مرز ۴۰۹۶ فقط دامنهٔ این ترجیح است، نه سقف زمینهٔ مدل. حذف نامزد به‌دلیل حافظه، طول ورودی یا مجوز همچنان پیش از اعمال ترجیح انجام می‌شود. دلیل اولویت و پاسخ‌های مؤثر در نتیجهٔ مشترک ثبت می‌شوند.

آزمون این رفتار در سه زبان رابط، همراه با حالت‌های ورودی بلند، زبان متفاوت، کار پیچیده و حافظهٔ ناکافی، به مجموعه اضافه شد؛ هر ۱۸ آزمون موتور موفق‌اند.

## Professional runtime preference and Persian copy — 2026-09-20

- Professional/shared GPU deployments now prefer a documented vLLM guide and compatible reviewed native weight files; SGLang is next when documented. CPU, Apple Silicon, fixed memory and missing model support retain explicit alternatives. MLX safetensors are not treated as generic vLLM weights.
- The selected runtime and files also drive the technical handoff and runtime license. Q4 GGUF memory calculations are no longer presented as estimates for native vLLM files. Fixed-memory exclusions and the short Persian Aya preference remain enforced.
- Rewrote Persian guidance across questions, explanations, candidate cards and handoffs. Distinct examples replace repeated help for concurrency, workdays and average token counts. Runtime instructions remain localized in all three editions.
- Validation: 20 decision tests and 10 regression tests passed; Svelte check reported zero errors/warnings; static build, sitemap and short-link checks passed. Browser checks confirmed vLLM and file links in the technical handoff, CPU and low-memory explanations, and desktop/mobile layouts. Screenshots: `wizard-runtime/fa-vllm-1440.png`, `wizard-runtime/fa-vllm-390.png`.
- Reference: <https://docs.vllm.ai/en/stable/>; GGUF support limitations: <https://docs.vllm.ai/en/latest/features/quantization/gguf/>. No deployment performed.

## Persian document Q&A — Aya preference correction

Reproduced the exact initial selection (`documents`, Persian source, Persian output): the old rule omitted document Q&A and required an explicitly short input, producing Gemma first. Aya Expanse 8B now starts this comparison, including the early result before detailed length questions. Unknown length is explicitly conditional against the model's 8,192-token context; no input size is invented. Confirmed long contexts, media, sensitive decisions, incompatible hardware and edition-specific license restrictions still prevent automatic preference or exclude the model. Archive retrieval and embedding recommendations remain intact.

Validation: 21 decision tests, 10 regression tests, zero Svelte check errors/warnings, successful static build and sitemap validation. Browser reproduced the three selections, verified Aya first, exact filtered table links, unchanged stored answers and the reopened result. Screenshot: `wizard-runtime/fa-aya-document-quick.png`.

## Task-specialized translation and coding

Added reviewed `taskSpecializations` metadata to canonical model records, rather than detecting names or treating every documented application as a specialization. The selector prioritizes eligible specialists for translation, inline completion, coding assistance and coding agents; a general-purpose comparison is retained where available. Existing memory/context/license exclusions, vLLM selection and Persian document-Q&A Aya preference remain intact. Dedicated translators are excluded from summaries, rewriting and RAG; an exact supported source/target pair is required for translation priority. Missing pairs and cases with no feasible specialist get explicit follow-up explanations.

Imported HY-MT1.5-1.8B and HY-MT1.5-7B from pinned publisher cards, configs, weight inventories and licenses. Persian/English/Spanish support is publisher-declared. Configuration context is recorded separately from unknown declared/evaluated context. No quality scores or workload-memory measurements were invented. The model-specific Transformers guide is used; the publisher repository's vLLM example names an older model, so it was not silently relabeled for these revisions. Nine existing code models now have reviewed completion/assistant/agent roles; Qwen3-Coder-Next's documented agent application was added.

Validation: dataset and locale validators passed, 23 decision tests and 10 regression tests passed, Svelte check reported zero errors/warnings, build/sitemap/short-link checks passed. Browser checks confirmed translation specialist ordering, links to exact table rows and mobile layouts in all three locales, plus distinct coding paths. Screenshots: `wizard-runtime/{fa,en,es}-translation-1440.png`, `wizard-runtime/fa-translation-390.png`. Local preview refreshed; no deployment.

Sources: <https://huggingface.co/tencent/HY-MT1.5-1.8B>, <https://huggingface.co/tencent/HY-MT1.5-7B>, <https://huggingface.co/Qwen/Qwen2.5-Coder-1.5B>, <https://huggingface.co/Qwen/Qwen2.5-Coder-7B-Instruct>, <https://huggingface.co/Qwen/Qwen3-Coder-30B-A3B-Instruct>, <https://huggingface.co/Qwen/Qwen3-Coder-Next>, <https://huggingface.co/bigcode/starcoder2-3b>, <https://huggingface.co/mistralai/Devstral-Small-2-24B-Instruct-2512>.
