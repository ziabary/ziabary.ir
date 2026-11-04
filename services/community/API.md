# API v1

پاسخ‌ها JSON و `Cache-Control: no-store` دارند. خطا شکل `{ "error": "code", "requestId": "…" }` دارد. زمان‌ها epoch milliseconds هستند؛ کلید `post` مسیر canonical با slash پایانی است. دامنه، query و hash بخشی از کلید نیستند.

| روش و مسیر | کارکرد |
|---|---|
| `GET /live` | زنده‌بودن پردازه |
| `GET /health` | آمادگی و public sitekey؛ در نبود پیکربندی کپچا 503 |
| `GET /api/public/comments?post=…&cursor=…` | پنج رشتهٔ تأییدشده با فرزندان؛ `comments,total,nextCursor,views,visitors` |
| `POST /api/public/comments` | `post,parent,author,body,captchaToken,requestId,website`؛ موفقیت 202 و `status: pending` |
| `POST /api/public/visit-ticket` | بدنه `{post}`؛ بلیت امضاشدهٔ دو‌دقیقه‌ای |
| `POST /api/public/visits` | `post,fingerprint,ticket,language,timezone,screen,referrer`؛ پاسخ `{counted}` |
| `POST /api/admin/login` | `username,password,code`؛ کوکی نشست و `{csrf,username}` |
| `GET /api/admin/session` | بازیابی اطلاعات نشست و CSRF پس از reload |
| `POST /api/admin/logout` | لغو نشست |
| `GET /api/admin/comments?status=…&post=…&cursor=…` | صف ادمین، حداکثر ۴۰ نظر |
| `POST /api/admin/comments/:id/moderate` | `{status}` از approved/rejected/spam/deleted |
| `POST /api/admin/comments/:id/reply` | `{body}`؛ انتشار صریح پاسخ مدیر |
| `POST /api/admin/comments/:id/block` | `{reason,days}`؛ محدودیت شبکه بین ۱ و ۹۰ روز |
| `GET /api/admin/blocks` | محدودیت‌های فعال |
| `POST /api/admin/unblock` | `{ipHash}` |
| `GET /api/admin/stats?days=30&post=…` | آمار بازه، کل، هر صفحه و breakdownها؛ بازه به retention محدود می‌شود |
| `GET /api/admin/visits?post=…&cursor=…` | ۴۰ ریز بازدید با IP رمزگشایی‌شده؛ دسترسی audit می‌شود |
| `GET /api/admin/audit` | صد رویداد مدیریتی اخیر |

POST عمومی به `Origin` دقیق یکی از `SITE_ORIGINS`، JSON و بدنهٔ حداکثر ۱۶ KiB نیاز دارد. POST ادمین به Origin خود سرویس، کوکی نشست و هدر `X-CSRF-Token` نیاز دارد؛ login به CSRF نشست نیاز ندارد و با Origin/JSON/محدودیت تلاش/TOTP محافظت می‌شود. API ادمین CORS عمومی ندارد. کوکی ادمین به سایت استاتیک فرستاده نمی‌شود.

نظر: نام ۲ تا ۸۰ نویسه، متن ۳ تا ۵۰۰۰، parent عدد صحیح در همان نوشته و در رشتهٔ منتشرشده؛ requestId تصادفی ۱۶ تا ۸۰ نویسه و ثابت در retry همان ارسال است. `website` باید خالی باشد. فیلد اضافی رد می‌شود. درخواست تکراری با همان id و payload ذخیرهٔ جدید ایجاد نمی‌کند.

fingerprint رشتهٔ hex با طول ۶۴ است. بلیت بازدید به صفحه، IP و زمان وابسته و یک‌بارمصرف است؛ فاصلهٔ صدور تا ارسال باید ۱٫۵ تا ۱۲۰ ثانیه باشد. تغییر fingerprint در یک بلیت، بازدید دوباره ایجاد نمی‌کند. شمارش دوباره در پنجرهٔ نیم‌ساعته رد می‌شود.

کدهای متداول: 400 ورودی/کپچا/parent نامعتبر، 401 نشست یا ورود نامعتبر، 403 origin/CSRF/محدودیت شبکه، 404 صفحهٔ خارج از فهرست، 409 idempotency متعارض، 413 بدنهٔ بزرگ، 415 قالب غیر JSON، 429 محدودیت تعداد با `Retry-After`، 503 سرویس آماده نیست/صف پر/ظرفیت اعتبارسنجی پر. خطاهای داخلی جزئیات، SQL، IP یا secret را به کاربر برنمی‌گردانند.
