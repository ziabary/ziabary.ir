# افزودن ارائه تازه

اطلاعات برگزاری و ترجمه‌ها در `content/presentations/deliveries/index.json`، مشخصات فایل‌ها و نسخه‌ها در `content/presentations/decks/index.json` و تعریف دوره‌ها در `content/presentations/courses/index.json` نگهداری می‌شود. `src/lib/presentations.ts` فقط نوع‌ها و منطق نمایش را دارد. برای افزودن ارائه:

1. یکی از رکوردهای فایل `deliveries/index.json` را کپی کنید، `slug` یکتا بسازید و ارائهٔ تازه را در ابتدای آرایه قرار دهید. ترتیب آرشیو از تازه‌ترین بارگذاری است؛ صفحهٔ اصلی اولین رکورد دارای PDF را همراه با کاور و اطلاعات همین فایل نمایش می‌دهد.
2. تصویر اسلاید اول را با نسبت ۱۶:۹ در مسیر زیر بگذارید:
   `content/presentations/decks/files/<slug>/cover.webp`
3. PDF را ترجیحاً نسخه‌دار ذخیره کنید:
   `content/presentations/decks/files/<slug>/<slug>-v1.pdf`
4. در `decks/index.json` یک رکورد با شناسهٔ نسخه بسازید و `cover` و `pdf` را با آدرس عمومی `/slides/<slug>/...` وارد کنید؛ `version` و `slideCount` هم متعلق به همین رکوردند. فیلد `deck` در رکورد برگزاری به این شناسه اشاره می‌کند.
5. عنوان، خلاصه، شرح، نوع، تاریخ، محل، رویداد، برگزارکننده، مخاطب، مدت، تعداد اسلاید، نسخه و سرفصل‌ها را پر کنید.
6. ترجمهٔ عنوان، خلاصه، شرح، تاریخ، محل، سرفصل‌ها و مشخصات تکمیلی را در همان رکورد زیر `translations.en` و `translations.es` وارد کنید. هر سه آرشیو از همین فهرست استفاده می‌کنند؛ فایل PDF، کاور، تعداد اسلاید و ترتیب رکوردها مشترک‌اند.
7. پیش از انتشار، `npm run check` و `npm run build` را اجرا کنید.

برای ارائه‌های مشترک، `presenter` را با `name` و در صورت نیاز
`honorificPrefix`، و `preparedBy` را با نام تهیه‌کنندگان علمی مشخص کنید.
این دو نقش جداگانه در شناسنامه و دادهٔ ساختاریافته نمایش داده می‌شوند؛
نام صاحب سایت به‌صورت خودکار به ارائه‌دهنده یا نویسنده تبدیل نمی‌شود.
نام‌ها و `subtitle` را در ترجمه‌ها هم درج کنید. فیلدهای مشترک `date`
(تاریخ دقیق میلادی)، `eventUrl`، `language`، `englishTitle` و ابعاد
`coverWidth` / `coverHeight` اختیاری‌اند. تاریخ دقیق را فقط با شاهد ثبت کنید.
شرح می‌تواند چند پاراگراف داشته باشد؛ پاراگراف‌ها را با یک خط خالی جدا کنید.
برای میان‌تیتر در شرح از `### ` و برای تأکید از `**متن**` استفاده کنید؛
عنوان و زیرعنوان ارائه در بالای صفحه نمایش داده می‌شوند و نباید در شرح تکرار شوند.
شرح HTML یا سایر قالب‌های Markdown را تفسیر نمی‌کند.
برای موضوعات از فهرست موجود `topics` استفاده کنید؛ سامانهٔ تگ جداگانه‌ای وجود ندارد.

## نمونه حداقلی

```ts
{
  slug: 'sample-talk',
  title: 'عنوان ارائه',
  kind: 'سخنرانی',
  summary: 'خلاصه‌ای کوتاه برای کارت آرشیو.',
  description: 'شرح کامل‌تر موضوع و زمینه ارائه.',
  presentedAt: '۲۴ مهر ۱۴۰۵',
  venue: 'نمایشگاه بین‌المللی تهران، سالن ...',
  event: 'نام رویداد',
  organizer: 'نام برگزارکننده',
  audience: 'مدیران فناوری',
  duration: '۴۵ دقیقه',
  slideCount: 32,
  version: 'نسخه ۱',
  cover: '/slides/sample-talk/cover.webp',
  pdf: '/slides/sample-talk/sample-talk-v1.pdf',
  topics: ['سرفصل نخست', 'سرفصل دوم'],
  translations: {
    en: {
      title: 'Presentation title',
      summary: 'A short summary for the archive card.',
      description: 'A fuller description of the topic and context.',
      presentedAt: '24 Mehr 1405 (Solar Hijri)',
      venue: 'Tehran International Exhibition Center, Hall ...',
      event: 'Event name',
      organizer: 'Organizer name',
      audience: 'Technology managers',
      duration: '45 minutes',
      version: 'Version 1',
      topics: ['First topic', 'Second topic']
    },
    es: {
      title: 'Título de la presentación',
      summary: 'Un breve resumen para la tarjeta del archivo.',
      description: 'Una descripción más completa del tema y su contexto.',
      presentedAt: '24 de Mehr de 1405 (calendario persa)',
      venue: 'Centro Internacional de Exposiciones de Teherán, pabellón ...',
      event: 'Nombre del evento',
      organizer: 'Nombre del organizador',
      audience: 'Responsables de tecnología',
      duration: '45 minutos',
      version: 'Versión 1',
      topics: ['Primer tema', 'Segundo tema']
    }
  }
}
```

اگر کاور یا PDF هنوز آماده نیست، فیلد مربوط را حذف کنید؛ رابط کاربری به‌جای تصویر شکسته یا لینک نامعتبر، حالت آماده‌سازی را نمایش می‌دهد.

صفحهٔ اصلی، آرشیو و صفحهٔ جزئیات هر زبان از ترجمه‌های همین رکورد استفاده
می‌کنند. هر سه صفحهٔ اصلی تازه‌ترین رکورد دارای PDF را انتخاب می‌کنند و به
صفحهٔ جزئیات همان زبان لینک می‌دهند. مسیر فایل‌ها فقط در بخش مشترک رکورد
تعریف می‌شود؛ برای نسخهٔ انگلیسی و اسپانیایی PDF یا کاور جدا نسازید.

توضیح ثابت زبان اسلایدها در `src/lib/presentation-copy.ts` نگهداری می‌شود:
اسلایدها عمدتاً تصویری‌اند و بخش زیادی از آن‌ها مستقل از زبان قابل‌فهم است،
اما زبان کلی فایل‌ها فارسی است. این توضیح در آرشیو و کنار دریافت PDF نمایش
داده می‌شود؛ ترجمهٔ معرفی به معنی ترجمهٔ خود اسلایدها نیست.

اگر تاریخ فارسی فقط سال یا فصل دارد، همان دقت را همراه نام تقویم در ترجمه
حفظ کنید؛ روز یا تاریخ میلادی حدسی اضافه نکنید. فایل‌های `content/presentations/decks/files/`
همچنان خارج از Git هستند و باید همراه سایر دارایی‌های سایت منتشر شوند.

فایل‌های کاتالوگ JSON هستند؛ کلیدها و رشته‌ها را با کوتیشن دوتایی بنویسید. فایل‌های PDF و تصاویر در Git ذخیره نمی‌شوند و باید جداگانه پشتیبان داشته باشند. `prepare:content` آن‌ها را با همان URLهای قبلی به `.build/public/slides/` کپی می‌کند؛ این پوشه خروجی است، نه محل ویرایش نسخهٔ اصلی.
