# ارجاع به تجربهٔ عملی ترگمان در یادداشت‌های LLM

تاریخ بازبینی: ۱۶ سپتامبر ۲۰۲۶. تغییرات محلی‌اند و انتشار عمومی انجام نشده است.

در ۹ یادداشت فارسی و ۴ نسخهٔ انگلیسی و اسپانیایی، یک بند متناسب با بحث همان بخش افزوده شد. هر بند لینک درون متن به بخش مشخصی از گزارش ترگمان دارد. در ترجمه‌ها فارسی‌بودن گزارش صریحاً مشخص است.

## یادداشت‌های اصلاح‌شده

| یادداشت | تاریخ | محل ارجاع |
| --- | --- | --- |
| [right-model-size-for-the-task](http://localhost:4189/articles/right-model-size-for-the-task/) | 2026-06-18 | چت ساده، پاسخ مستند و تحلیل پیچیده چه تفاوتی دارند؟ |
| [llms-on-rtx-4090-24gb-vs-48gb](http://localhost:4189/articles/llms-on-rtx-4090-24gb-vs-48gb/) | 2026-07-02 | اجرای مدل با ارائهٔ سرویس تفاوت دارد |
| [enterprise-rag-model-embedding-reranker](http://localhost:4189/articles/enterprise-rag-model-embedding-reranker/) | 2026-08-12 | چرا دستیار اسناد اغلب به مدل پاسخ‌گوی بزرگ نیاز ندارد؟ |
| [single-user-to-enterprise-llm-serving](http://localhost:4189/articles/single-user-to-enterprise-llm-serving/) | 2026-09-08 | دسترس‌پذیری بالا از ظرفیت باقی‌مانده شروع می‌شود |
| [ollama-vllm-sglang-or-llama-cpp](http://localhost:4189/articles/ollama-vllm-sglang-or-llama-cpp/) | 2026-09-15 | vLLM؛ وقتی ظرفیت سرویس باید تنظیم و توضیح داده شود |
| [true-llm-cost-buy-rent-or-api](http://localhost:4189/articles/true-llm-cost-buy-rent-or-api/) | 2026-09-16 | پیش از خرید GPU گران‌تر، اندازهٔ مسئله را کوچک کنیم |
| [evaluating-language-models-for-persian](http://localhost:4189/articles/evaluating-language-models-for-persian/) | 2026-09-02 | مدل را می‌سنجیم یا سامانهٔ کامل را؟ |
| [gpu-inference-latency-throughput](http://localhost:4189/articles/gpu-inference-latency-throughput/) | 2026-09-12 | چه ظرفیتی واقعاً قابل فروش یا استفاده است؟ |
| [rag-cag-kag-fine-tuning-instruction-tuning](http://localhost:4189/articles/rag-cag-kag-fine-tuning-instruction-tuning/) | 2026-06-15 | RAG؛ هر بار فیش‌های مرتبط را از کتابخانه پیدا کن |
| [rag-cag-kag-fine-tuning-instruction-tuning-en](http://localhost:4189/en/articles/rag-cag-kag-fine-tuning-instruction-tuning-en/) | 2026-06-15 | RAG: find the relevant index cards in the library each time |
| [rag-cag-kag-fine-tuning-instruction-tuning-es](http://localhost:4189/es/articles/rag-cag-kag-fine-tuning-instruction-tuning-es/) | 2026-06-15 | RAG: buscar en la biblioteca las fichas pertinentes para cada pregunta |
| [gpu-inference-latency-throughput-en](http://localhost:4189/en/articles/gpu-inference-latency-throughput-en/) | 2026-09-12 | What capacity can actually be sold or used? |
| [gpu-inference-latency-throughput-es](http://localhost:4189/es/articles/gpu-inference-latency-throughput-es/) | 2026-09-12 | ¿Qué capacidad se puede vender o utilizar realmente? |

## مواردی که ارجاع نگرفتند

- نوشته‌های قدیمی‌تر از ۱۸ خرداد ۱۴۰۵، از جمله مجموعهٔ قدیمی GPU و نوشته‌های اولیهٔ ZTAI: حفظ ترتیب زمانی؛ متن قدیمی به گزارش آینده ارجاع نمی‌دهد.
- کوانتیزه‌سازی چهار بیتی و INT8/FP8: گزارش، قالب دقیق کوانتیزه‌سازی یا مقایسهٔ کرنل‌ها را مشخص نمی‌کند.
- AirLLM: تجربهٔ گزارش‌شده با vLLM است و شاهدی برای اجرای لایه‌به‌لایه نیست.
- دستیار و عامل برنامه‌نویسی: میزبانی مستندات برنامه‌نویسی، سنجش عملکرد عامل تولید کد محسوب نمی‌شود.
- محرمانگی داده، امنیت و کنترل دسترسی: اجرای داخلی به‌تنهایی شاهد تضمین امنیت یا پیاده‌سازی این کنترل‌ها نیست.
- مطالب عمومی و سیاست‌گذاری که این نمونه به استدلال مشخص آن‌ها کمک نمی‌کرد.

## حدود استفاده از گزارش

- ۳۰۰ درخواست هم‌زمان به ۳۰۰ پاسخ موفق یا ظرفیت تضمین‌شده تعبیر نشده است؛ افت سرعت و لغو پس از ۲۰ ثانیه همراه آن آمده‌اند.
- مقایسهٔ سرعت موتورهای مختلف، برتری کیفی مدل یا برآورد عددی صرفه‌جویی از این گزارش استخراج نشده است.
- سهم ۳۰درصدی دیکشنری، سهمی از ترجمه است، نه از کل درخواست‌های سرویس.
- عدد کاربران در دقیقه بازنشر نشده و متن گزارش اصلی بدون تغییر حفظ شده است.
- تاریخ‌ها، وضعیت انتشار، فهرست‌های دستی `related` و سایر frontmatter دست‌نخورده‌اند.

## اعتبارسنجی

- کنترل تغییرات در برابر snapshot پیش از ویرایش: دقیقاً یک بند جدید در هر ۱۳ فایل، بدون حذف یا تغییر متن قبلی.
- تاریخ هر ۱۳ یادداشت پس از تاریخ گزارش است؛ SHA-256 گزارش اصلی بدون تغییر ماند.
- `npm run check`: صفر خطا و صفر هشدار.
- `npm run build`: موفق؛ اعتبارسنجی ۱۸۶ صفحهٔ قابل ایندکس، ۱۹۶ بلوک JSON-LD و ۲۲۱ مقصد لینک کوتاه.
- جزئیات بررسی مرورگر در `review.json`؛ تصاویر در `rag-desktop.png` و `model-size-mobile.png`.

فرمان اجرای نسخهٔ ساخته‌شده: `PORT=4189 npm run preview:local`
