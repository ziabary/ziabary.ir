# بازبینی پیوندهای داخلی مقاله‌ها — ۱۷ شهریور ۱۴۰۵

هر ۶۶ فایل موجود در `src/lib/content/articles` بررسی شد. ۴۸ مقاله در این کار تغییر کرد؛ ۴۵ مقاله پیش از بازبینی پیوندی به مقاله‌های دیگر در بدنه نداشتند و اکنون همهٔ مقاله‌ها دست‌کم یک پیوند متنی دارند. تعداد پیوندهای متنی از ۴۴ به ۱۲۶ رسید (۸۲ پیوند افزوده‌شده؛ شامل پیش‌نویس‌ها).

پیوندها بر پایهٔ موضوع هر متن انتخاب شدند: راهنمای سخت‌افزار، امنیت و اعتماد صفر، مجموعهٔ پنج‌قسمتی حکمرانی داده، سیاست‌گذاری و سرمایه‌گذاری، گزارش‌های نمایشگاهی، تاریخ ترگمان و مطالب آرشیوی فنی. پیوندهای بین زبان‌ها با عنوان زبان یا اشاره به متن اصلی مشخص شده‌اند. چند لینک قدیمی که نشانی بلند وبلاگ قبلی را نمایش می‌دادند، اکنون عنوان مقاله را نشان می‌دهند؛ مقصدشان حفظ شده است.

## اصلاح‌های فهرست مطالب مرتبط

- در «عیار هومص»، دو شناسهٔ ناموجود `startup-investment-readiness` و `industrial-ai` به‌ترتیب با `noafarin-plan` و `ai-cosmetic-surgery-or-chemotherapy` جایگزین شدند.
- در مقالهٔ انگلیسی رمز یک‌بارمصرف، شناسهٔ اشتباه `apache-mod-jk-lock-errors` به `apache-mod-jk-log-lock` اصلاح شد.
- در گزارش جیتکس، ارجاع به پیش‌نویس `architecture-is-governance` با مقالهٔ منتشرشدنی `from-zero-trust-to-zero-trust-ai` جایگزین شد.
- برای گزارش الکامپ، فهرست دستی سه‌تایی عیار هومص، گزارش جیتکس و «از جیتکس تا مجلس» اضافه شد.

بقیهٔ فهرست‌ها و ترتیب دستی آن‌ها حفظ شدند. تاریخ‌ها، وضعیت پیش‌نویس، تصاویر و محتوای فنی در این کار تغییر نکردند. ویرایش هم‌زمان کاور مقالهٔ INT8/FP8 نیز دست‌نخورده باقی ماند.

## اعتبارسنجی

- Markdown هر ۶۶ مقاله با mdsvex و Svelte به HTML تبدیل و پیوندهای واقعی بدنه استخراج شد؛ همهٔ مقصدها موجود و مسیر زبان آن‌ها درست است.
- فهرست‌های `related` مقصد ناموجود ندارند؛ هیچ مقالهٔ عمومی به پیش‌نویس ارجاع نمی‌دهد.
- ۶۴ صفحهٔ مقاله در build بررسی شد؛ پیوندهای متنی در HTML نهایی وجود دارند و هر مقالهٔ عمومی از دست‌کم یک مقالهٔ دیگر پیوند ورودیِ واقعاً نمایش‌داده‌شده دارد. برای این سنجش، فهرست‌های نمایش‌داده‌نشدهٔ نسخه‌های بین‌المللی شمرده نشدند.
- دو پیش‌نویس `architecture-is-governance` و `secure-rag-agent` صفحهٔ عمومی ندارند.
- `npm run check`: صفر خطا، دو هشدار CSS قبلی در GpuComparison.
- `npm run build`: موفق؛ اعتبارسنجی ۱۰۲ بلوک JSON-LD نیز موفق بود.

این تغییرات به سایت زنده ارسال نشده‌اند.

## پوشش بازبینی

تعدادها مربوط به پیوندهای بدنه‌اند، نه کارت‌های «مطالب مرتبط».

| مقاله | زبان | قبل | بعد | وضعیت |
|---|---|---:|---:|---|
| `accessing-legacy-numenta-content` | en | 0 | 2 | اصلاح شد |
| `ai-cosmetic-surgery-or-chemotherapy` | fa | 0 | 2 | اصلاح شد |
| `ai-data-confidentiality-safe-processing` | fa | 0 | 2 | اصلاح شد |
| `ai-from-gitex-to-parliament` | fa | 0 | 3 | اصلاح شد |
| `ai-infrastructure-security-starts-with-kernel-and-gpu` | fa | 3 | 3 | پیوندهای موجود کافی بود |
| `ai-operator-model-private-sector` | fa | 0 | 2 | اصلاح شد |
| `air-gap-moves-trust-boundary` | fa | 1 | 1 | پیوندهای موجود کافی بود |
| `apache-mod-jk-log-lock` | en | 0 | 1 | اصلاح شد |
| `architecture-is-governance` | fa | 0 | 1 | اصلاح شد؛ پیش‌نویس |
| `ayar-hoomas-assistant-for-startups-and-investors` | fa | 0 | 2 | اصلاح شد |
| `building-targoman-without-patronage` | en | 0 | 2 | اصلاح شد |
| `china-travelogue-part-1` | fa | 1 | 1 | پیوندهای موجود کافی بود |
| `china-travelogue-part-2` | fa | 1 | 1 | پیوندهای موجود کافی بود |
| `choosing-gpu-for-ai` | fa | 0 | 3 | اصلاح شد |
| `configuration-drift-attestation-and-rollback` | fa | 2 | 2 | پیوندهای موجود کافی بود |
| `construir-targoman-sin-padrinos` | es | 0 | 1 | اصلاح شد |
| `containers-are-not-security-boundaries` | fa | 2 | 2 | پیوندهای موجود کافی بود |
| `crypto-shared-portfolio-profit` | fa | 0 | 1 | اصلاح شد |
| `cuando-un-otp-por-sms-reduce-la-seguridad` | es | 0 | 1 | اصلاح شد |
| `data-ecosystem-regulation-players` | fa | 0 | 2 | اصلاح شد |
| `data-regulation-balance` | fa | 0 | 2 | اصلاح شد |
| `data-regulation-intergroup-conflicts` | fa | 0 | 2 | اصلاح شد |
| `data-regulation-intragroup-conflicts` | fa | 0 | 2 | اصلاح شد |
| `dgx-and-standard-gpu-servers` | fa | 0 | 2 | اصلاح شد |
| `dynamic-password-fraud` | fa | 0 | 2 | اصلاح شد |
| `elecomp-29-from-technology-to-synergy` | fa | 0 | 2 | اصلاح شد |
| `from-stig-cis-to-rbac` | fa | 3 | 3 | پیوندهای موجود کافی بود |
| `from-zero-trust-to-zero-trust-ai` | fa | 1 | 1 | پیوندهای موجود کافی بود |
| `gitex-2025-analytical-travelogue` | fa | 0 | 2 | اصلاح شد |
| `global-data-regulation-experiences` | fa | 0 | 2 | اصلاح شد |
| `google-used-targoman` | fa | 1 | 1 | اصلاح شد |
| `gpu-server-platform-components` | fa | 0 | 2 | اصلاح شد |
| `gpu-types-for-ai` | fa | 0 | 2 | اصلاح شد |
| `htm-papers-and-books` | en | 0 | 3 | اصلاح شد |
| `install-dgtechnics-smart-hdtv-linux` | en | 0 | 1 | اصلاح شد |
| `install-nupic-opensuse` | en | 0 | 2 | اصلاح شد |
| `install-tbs6980-tbs6981-linux` | en | 0 | 1 | اصلاح شد |
| `int8-or-fp8-real-gpu-support` | fa | 5 | 5 | پیوندهای موجود کافی بود |
| `investment-in-ai` | fa | 0 | 3 | اصلاح شد |
| `iran-ai-ranking-analysis` | fa | 0 | 2 | اصلاح شد |
| `iran-ai-top-ten-roadmap` | fa | 0 | 2 | اصلاح شد |
| `iran-israel-war-ai` | fa | 0 | 1 | اصلاح شد |
| `iran-third-generation-warfare` | fa | 0 | 2 | اصلاح شد |
| `language-identification-reading-list` | en | 0 | 2 | اصلاح شد |
| `legacy-migration-does-not-remove-risk` | fa | 2 | 2 | پیوندهای موجود کافی بود |
| `linux-distribution-as-security-governance` | fa | 1 | 1 | پیوندهای موجود کافی بود |
| `longest-bachelors-degree` | fa | 1 | 1 | پیوندهای موجود کافی بود |
| `mlops-foundation-of-zero-trust-ai` | fa | 2 | 2 | پیوندهای موجود کافی بود |
| `national-ai-organization-not-headquarters` | fa | 0 | 1 | اصلاح شد |
| `national-ai-platform` | fa | 0 | 2 | اصلاح شد |
| `noafarin-plan` | fa | 0 | 2 | اصلاح شد |
| `one-linux-hardening-policy-does-not-fit-all` | fa | 3 | 3 | پیوندهای موجود کافی بود |
| `pcie-gpu-server-selection` | fa | 0 | 2 | اصلاح شد |
| `pcie-vs-sxm-for-ai` | fa | 0 | 2 | اصلاح شد |
| `secure-rag-agent` | fa | 0 | 1 | اصلاح شد؛ پیش‌نویس |
| `seventy-million-words-a-day` | fa | 1 | 1 | اصلاح شد |
| `slow-ai-in-iran` | fa | 0 | 2 | اصلاح شد |
| `sms-otp-security-design` | en | 0 | 1 | اصلاح شد |
| `software-raid-opensuse` | en | 0 | 1 | اصلاح شد |
| `targoman-transformer-update` | fa | 3 | 3 | اصلاح شد |
| `targoman-without-rent` | fa | 4 | 4 | پیوندهای موجود کافی بود |
| `third-revolution-in-warfare` | fa | 0 | 2 | اصلاح شد |
| `why-shamsa` | fa | 0 | 2 | اصلاح شد |
| `xaas-tax-laws` | fa | 1 | 1 | پیوندهای موجود کافی بود |
| `zero-trust-ai-maturity-model` | fa | 2 | 2 | پیوندهای موجود کافی بود |
| `zero-trust-ai-principles-and-controls` | fa | 4 | 4 | پیوندهای موجود کافی بود |
