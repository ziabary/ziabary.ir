# بازبینی تغییرهای گزارش‌شده در ۲۴ و ۲۵ سپتامبر ۲۰۲۶

تاریخ اصلاح دادهٔ سایت: ۲۰۲۶-۰۹-۲۵. تاریخ انتشار منابع جدا ثبت شده است. این تغییر انتشار، deploy یا merge ندارد. بنچمارک یا اجرای واقعی نرم‌افزار روی سخت‌افزار انجام نشده است.

## منبع داده و دامنهٔ تغییر

- منبع اصلی LLM: `data/llm/v0.3.0/repository.json`؛ خروجی `src/lib/llm/data/` فقط با `npm run generate:llm` تولید شد. تاریخ مجموعه در `manifest.json` از ۲۲ به ۲۵ سپتامبر تغییر کرد.
- یادداشت‌های جدول: `data/llm/v0.2.0/data/software-guidance.json`، با ترجمه‌های `data/llm/locales/` و bindingهای صریح. هش وابستگی همین فایل در `required-existing-data.json` به‌روز شد.
- جدول Server و ماتریس سازگاری: `src/lib/server-data.ts` و `src/lib/components/ServerComparison.svelte`؛ ترجمه در `src/lib/i18n/gpu-{data,ui}.{en,es}.json`.
- صفحات راهنما از `LlmPreview` و `GuidePage` استفاده می‌کنند؛ جدول نرم‌افزار رکورد نسخهٔ دقیق را نشان می‌دهد. محصول، سابقهٔ نسخه، stack و بنچمارک هویت‌های جدا دارند. دو نسخهٔ پایدار جدید اضافه شدند؛ قابلیت‌ها و نتایج قدیمی تکثیر یا منتقل نشدند.
- سه نسخهٔ مقالهٔ `ollama-vllm-sglang-or-llama-cpp` یادداشت تاریخ‌دار MLX گرفتند؛ تاریخ انتشار مقاله و relatedها تغییر نکردند.
- چهار اعلان با شناسه‌های ثابت `runtime925`، `rpc7vk`، `ollmlxrc` و `smrubin72` در `src/lib/guide-updates.mjs` ثبت شد.

## قبل و بعد

| ردیف/فیلد | قبل | بعد |
| --- | --- | --- |
| `software-release:vllm-v0-30-0` | نبود | نسخهٔ پایدار، انتشار ۲۲ سپتامبر؛ رفع چهار GHSA و شرایط ارتقا |
| `software-release:vllm-v0-29-0` | بدون هشدارهای جدید | تاریخی؛ هشدارهای مشروط، محدودهٔ نسخه‌ها و مسیر ارتقا؛ سابقهٔ ارجاعات محفوظ |
| `software-release:llama-cpp-v0-5-0` | نبود | پایدار، انتشار ۲۳ سپتامبر؛ RPC major 7 و شروط handshake |
| `software-release:llama-cpp-v0-4-1` | سابقهٔ قبلی | محفوظ و با توضیح تاریخی؛ major 6 با major 7 قابل اختلاط نیست |
| Ollama `v0.34.0` | نسخهٔ جدول، توضیح local/cloud | محفوظ؛ یادداشت جداگانهٔ RC، بدون ردیف RC قابل مرتب‌سازی |
| Vulkan | بدون یادداشت b11160 | یادداشت آزمایشیِ نسخه‌مند b11160؛ مستقل از قابلیت‌های پایدار 0.5.0 |
| `supermicro-vera-rubin-nvl72` | نبود | `current` و `integrated`؛ خبر آغاز ارسال ۲۳ سپتامبر |
| شمار GPU رک | نبود | `integratedGpuCount: 72`؛ ظرفیت اسلات دو/سه‌عرض صفر، تأیید PCIe مستقل ندارد |
| حافظهٔ رک | نبود | GPU: ۲۰٫۷ TB HBM4؛ CPU: تا ۵۴ TB LPDDR5X؛ جمع به‌عنوان VRAM ثبت نشده |
| ابعاد/توان رک | نبود | `heightU`, `depthMm`, `maxGpuPowerW`: null؛ ظرفیت CDU به مصرف رک تبدیل نشده |

ویزارد نسخهٔ نصب‌شده، frontend و جزئیات ورودی سرویس را نمی‌گیرد؛ فقط هنگام پیشنهاد vLLM یادآوری مشروط می‌دهد و مدعی تشخیص آسیب‌پذیری نیست. مسیر مستقلی برای RPC یا انتخاب نرم‌افزار آزمایشی وجود نداشت؛ یادداشت RPC در پیشنهاد llama.cpp مشروط به استفادهٔ واقعی از RPC است. مرتب‌سازی نسخه‌ها در انتخاب موتور ویزارد نقشی ندارد؛ RC ردیف انتشار نیست و نمی‌تواند از این مسیر انتخاب پیش‌فرض شود.

## منابع و حدود تأیید

- [vLLM 0.30.0](https://github.com/vllm-project/vllm/releases/tag/v0.30.0): انتشار ۲۲ سپتامبر؛ `g_idx` حذف/نادیده گرفته می‌شود؛ scale-out در `vllm serve` معمولی opt-in است؛ CUDA 13.0 پیش‌فرض و بسته‌های 12.9 جدا موجودند. حداقل نسخهٔ درایور تأییدنشده‌ای افزوده نشد.
- [Qwen video DoS](https://github.com/vllm-project/vllm/security/advisories/GHSA-x6mc-67gf-chw4): انتشار هشدار ۲۳ سپتامبر؛ دامنهٔ متأثر از 0.24.0 با اصلاح از 0.30.0؛ frontend، ورودی، محدودیت شمار اقلام و وضعیت دو endpoint مطابق گزارش توضیح داده شدند.
- [Structured output](https://github.com/vllm-project/vllm/security/advisories/GHSA-85xf-c7hm-whqw): دامنهٔ اعلامی `<0.30.0` از آزمون تأییدشدهٔ گزارش روی 0.25.1 و حد پایین نامشخص جداست.
- [Rust metrics](https://github.com/vllm-project/vllm/security/advisories/GHSA-5fj9-pfhr-6j48) و [GLMGA](https://github.com/vllm-project/vllm/security/advisories/GHSA-58v5-2m8f-94pr): شروط مستقل و نسخهٔ رفع ثبت شد؛ مصونیت Rust از مورد Qwen به امنیت کلی آن تعمیم نیافت.
- [llama.cpp 0.5.0](https://github.com/ggml-org/llama.cpp/releases/tag/v0.5.0)، [header قدیمی](https://github.com/ggml-org/llama.cpp/blob/v0.4.1/ggml/include/ggml-rpc.h)، [header جدید](https://github.com/ggml-org/llama.cpp/blob/v0.5.0/ggml/include/ggml-rpc.h) و [handshake جدید](https://github.com/ggml-org/llama.cpp/blob/v0.5.0/ggml/src/ggml-rpc/ggml-rpc.cpp): major برابر، minor سرور حداکثر برابر کلاینت؛ هماهنگی buildها توصیهٔ استقرار است.
- [b11160](https://github.com/ggml-org/llama.cpp/releases/tag/b11160)، [PR 27952](https://github.com/ggml-org/llama.cpp/pull/27952) و [کد همان build](https://github.com/ggml-org/llama.cpp/blob/b11160/ggml/src/ggml-vulkan/ggml-vulkan.cpp): انتشار آزمایشی ۲۴ سپتامبر؛ RDNA3/4، آزمون ناشر روی RDNA3.5، شروط cooperative matrix و استثناهای قالب/عملیات ثبت شدند؛ اعداد سرعت وارد دیتاست نشدند.
- [Ollama v0.40.0-rc0](https://github.com/ollama/ollama/releases/tag/v0.40.0-rc0): API رسمی `tag_name=v0.40.0-rc0`، `prerelease=true`، `published_at=2026-09-25T03:31:52Z` را برگرداند؛ عنوان v0.40.0 نشانهٔ پایداری تلقی نشد. صرفاً معماری‌های پشتیبانی‌شده؛ هیچ ادعای تازه‌ای دربارهٔ سازگاری مدل/کوانتیزه یا سرعت وارد نشده است.
- [اطلاعیهٔ رسمی سرمایه‌گذاران Supermicro](https://ir.supermicro.com/news/news-details/2026/Supermicro-Now-Shipping-NVIDIA-Vera-Rubin-NVL72-Racks/default.aspx): متن اصلیِ درخواست با ابزار مرور باز نشد؛ نسخهٔ رسمی همان اطلاعیه در دامنهٔ سرمایه‌گذاران سازنده مبنا قرار گرفت. ۱۸ سینی محاسباتی ۱U، ۹ سینی NVLink و ظرفیت CDU ثبت شد؛ ارتفاع سینی به ارتفاع کل رک تعمیم نیافت.

از قبل صحیح: تفکیک اجرای محلی/ابری و `OLLAMA_NO_CLOUD=1`، دادهٔ نسخه‌های تاریخی، هویت جداگانهٔ بنچمارک‌ها و دسته‌بندی سامانهٔ یکپارچه. ماتریس تأیید OEM کارت‌های PCIe و مشخصات GPUها تغییر نکردند.

تأییدنشده و عمداً ثبت‌نشده: قیمت و موجودی ایران، ابعاد کامل و مصرف برق رک، حافظهٔ قابل‌استفادهٔ یک پردازه، پشتیبانی همگانی مدل‌ها در Ollama RC، افزایش سرعت همگانی Vulkan و حد پایین آزموده‌نشدهٔ هشدار structured-output.

## بررسی‌ها

نتیجهٔ نهایی بررسی‌ها پس از تکمیل build در همین بخش ثبت می‌شود. نخستین build به 404 فایل اصلی ازپیش‌غایب `/slides/behind-ai-dba/cover.jpg` رسید؛ فایل‌های اسلاید و گالری خارج از Git هستند. اصل فایل‌های غایب از سایت دریافت می‌شود؛ هیچ placeholder یا استثنای sitemap اضافه نشده است.
