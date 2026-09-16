# اشتراک‌گذاری یادداشت با خلاصه و لینک کوتاه

- دکمهٔ کپی، لینک کوتاه صفحهٔ مستقل یادداشت در دامنهٔ عمومی را برمی‌دارد؛ موقعیت اسکرول، زیربخش، پارامتر پیش‌نمایش و میزبان localhost در آن دخالت ندارند.
- برای مقالهٔ ثبت‌نشده در رجیستری (مثلاً پیش‌نویس)، کد کوتاه ساختگی تولید نمی‌شود و آدرس عمومی مقاله استفاده می‌شود.
- خلاصه از متادیتای همان زبان در تمام مقاله‌ها و فصل‌های GPU، ZTAI و LLM منتقل می‌شود.
- تلگرام: عنوان و خلاصه در `text` و لینک کوتاه در `url`؛ واتس‌اپ: متن و لینک یکجا؛ ایمیل: عنوان در subject و خلاصه و لینک در body.
- X: عنوان و خلاصهٔ کوتاه‌شده با حفظ نویسه‌های ترکیبی و بودجهٔ لینک؛ شمارش emojiهای چندبخشی محافظه‌کارانه است.
- سایر برنامه‌ها از Web Share API استفاده می‌کنند؛ شیوهٔ نمایش نهایی متن و لینک در اختیار برنامهٔ مقصد است. گزینهٔ کپی متن کامل نیز وجود دارد.
- پنجرهٔ dialog در موبایل و RTL/LTR بررسی شد. تداخل CSS عمومی nav با دکمه‌های اشتراک حذف شد.
- تغییر آدرس زیربخش‌ها هنگام خواندن همچنان برقرار است؛ اشتراک یادداشت مستقل از آن عمل می‌کند.

## بررسی‌ها

- `node --test tests/article-sharing.test.mjs tests/short-links.test.mjs`
- `npm run check`
- `npm run build`
- `node tests/reading-share.review.mjs`: ۹ مسیر مقاله/راهنما، سه زبان، جای‌گیری کنار متن و دور از فهرست، نسخهٔ موبایل و لینک کوتاه.
- `node tests/article-sharing.review.mjs`: محتوای مقصدها، خلاصه و لینک کوتاه، کپی متن، خطا و fallback کلیپ‌بورد، لغو و خطای اشتراک بومی، بازگشت فوکوس و عدم تداخل اجزای پنجره.

آزمون‌ها پیام نمی‌فرستند و مقصدهای انتشار را باز نمی‌کنند؛ دادهٔ آماده‌شده و فراخوانی مرورگر به‌صورت محلی بررسی می‌شود.

## مستندات مقصدها

- [Telegram sharing](https://core.telegram.org/widgets/share)
- [X Web Intents](https://docs.x.com/x-for-websites/web-intents/overview)
- [X character counting](https://docs.x.com/fundamentals/counting-characters)
- [WhatsApp click to chat](https://faq.whatsapp.com/5913398998672934)
- [Web Share API](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share)

بررسی محلی: http://localhost:4189/articles/true-llm-cost-buy-rent-or-api/

فرمان اجرا: `PORT=4189 npm run preview:local`

دیپلوی انجام نشده است.
