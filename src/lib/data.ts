export type MediaItem = {
  title: string;
  source: string;
  kind: string;
  summary: string;
  url: string;
  date: string;
  faDate: string;
};

export const mediaSources: Record<string, { logo: string }> = {
  'پیوست': { logo: 'https://peivast.com/wp-content/uploads/logo-1.png' },
  'تسنیم': { logo: 'https://upload.wikimedia.org/wikipedia/commons/3/35/Tasnim_News_Agency_logo_2color_rounded_square.png' },
  'دیجیاتو': { logo: 'https://digiato.com/wp-content/themes/digiato/assets/img/svg/mini-logo.svg' },
  'همشهری': { logo: 'https://www.hamshahrionline.ir/resources/theme/hamshahri/img/nastooh-logo.png' },
  'خبرگزاری فارس': { logo: 'https://farsnews.ir/asset/logo-default.4c94f33.png' }
};

// Reports, interviews and other coverage about or quoting Mehran. Authored
// pieces live in article frontmatter and are merged into the media page there.
export const mediaItems: MediaItem[] = [
  { title: 'هوش مصنوعی ایران برای اولین بار طلایی شد', source: 'همشهری', kind: 'ویدئو', summary: 'گفت‌وگو با مهران ضیابری درباره نخستین مدال طلای ایران در المپیاد جهانی هوش مصنوعی و دستاورد یک طلا، دو نقره و یک برنز در سومین دوره این رقابت‌ها.', url: 'https://www.hamshahrionline.ir/news/1059157/', date: '2026-08-08', faDate: '۱۷ مرداد ۱۴۰۵' },
  { title: 'انتقاد نصر تهران از رویکرد انحصاری معاونت علمی در هوش مصنوعی', source: 'تسنیم', kind: 'گفت‌وگو', summary: 'گفت‌وگویی درباره پروانه اپراتور هوش مصنوعی، سکوی ملی، نقش بخش خصوصی و فاصله میان تولید علم و تجاری‌سازی هوش مصنوعی در ایران.', url: 'https://www.tasnimnews.ir/fa/news/1405/05/06/3657874/', date: '2026-07-28', faDate: '۶ مرداد ۱۴۰۵' },
  { title: 'هوش مصنوعی‌های ایرانی باز هم در آزمون اینترنت ملی مردود شدند', source: 'پیوست', kind: 'گزارش', summary: 'گزارشی از وابستگی سرویس‌های هوش مصنوعی ایرانی به زیرساخت‌های خارجی، همراه با تحلیل مهران ضیابری از وضعیت بازار.', url: 'https://peivast.com/p/253197', date: '2026-01-28', faDate: '۸ بهمن ۱۴۰۴' },
  { title: 'هوش مصنوعی تا ۳۰ درصد هزینه حفاری معدن را کاهش می‌دهد', source: 'پیوست', kind: 'گزارش', summary: 'گزارشی از کاربرد هوش مصنوعی در حفاری و اکتشاف معدن و نقش هکاتون‌های تخصصی در پیوند فناوری با مسئله‌های واقعی صنعت.', url: 'https://peivast.com/p/251486', date: '2025-12-29', faDate: '۸ دی ۱۴۰۴' },
  { title: 'هوش مصنوعی؛ فرصت یک دهه آینده ایران یا تهدید عقب‌ماندگی استراتژیک', source: 'پیوست', kind: 'گزارش', summary: 'بررسی فاصله ایران با کشورهای پیشرو، نقش نهاد ملی پاسخگو و لزوم تغییر نگاه سیاست‌گذاران به هوش مصنوعی.', url: 'https://peivast.com/p/248326', date: '2025-11-19', faDate: '۲۸ آبان ۱۴۰۴' },
  { title: 'همکاری نصر تهران و معاونت علمی برای اتصال هوش مصنوعی به مسائل واقعی کشور', source: 'پیوست', kind: 'خبر', summary: 'خبر همکاری نصر تهران و معاونت علمی برای شناسایی پروژه‌های مسئله‌محور در آب، انرژی و امداد و نجات.', url: 'https://peivast.com/p/245743', date: '2025-10-20', faDate: '۲۸ مهر ۱۴۰۴' },
  { title: 'نقش بخش خصوصی در سیاست‌های هوش مصنوعی معاونت علمی چیست؟', source: 'پیوست', kind: 'گزارش', summary: 'گزارشی از مشارکت بخش خصوصی در سیاست‌های هوش مصنوعی، محدودیت زیرساخت‌ها و الزام بازنگری مستمر سند ملی.', url: 'https://peivast.com/p/241584', date: '2025-10-01', faDate: '۹ مهر ۱۴۰۴' },
  { title: 'آیا سکوی ملی هوش مصنوعی فقط یک نمایش دولتی است؟', source: 'پیوست', kind: 'گزارش', summary: 'بررسی نقاط ابهام سکوی ملی، از کمبود GPU و معماری زیرساخت تا ظرفیت تولید داخلی و حکمرانی داده.', url: 'https://peivast.com/p/243321', date: '2025-09-29', faDate: '۷ مهر ۱۴۰۴' },
  { title: 'تأمین زیرساخت از مهم‌ترین اولویت‌های توسعه هوش مصنوعی است', source: 'پیوست', kind: 'خبر', summary: 'گزارشی از تفاهم نصر و سازمان ملی هوش مصنوعی و اولویت تأمین زیرساخت برای توسعه کاربردی این فناوری.', url: 'https://peivast.com/p/215394', date: '2024-11-26', faDate: '۶ آذر ۱۴۰۳' },
  { title: 'کار و زندگی مهران ضیابری، موسس ترگمان؛ هوش مصنوعی در برابر هوش تجاری', source: 'پیوست', kind: 'پرونده', summary: 'روایتی بلند از زندگی و مسیر حرفه‌ای؛ از الکترونیک و شبکه تا شکل‌گیری ترگمان و فعالیت در هوش مصنوعی.', url: 'https://peivast.com/p/209982', date: '2024-09-30', faDate: '۹ مهر ۱۴۰۳' },
  { title: 'نسخه صوتی مروری بر ماهنامه پیوست شماره ۱۲۷', source: 'پیوست', kind: 'صوت', summary: 'مرور صوتی ماهنامه‌ای که پرونده «کار و زندگی مهران ضیابری» نیز در آن منتشر شده است.', url: 'https://peivast.com/p/213184', date: '2024-09-26', faDate: '۵ مهر ۱۴۰۳' },
  { title: 'آیا سند ملی هوش مصنوعی منطبق با شرایط ایران است؟', source: 'پیوست', kind: 'گزارش', summary: 'گزارشی از نقدهای فعالان و کارشناسان، از جمله مهران ضیابری، به اجرایی‌بودن، هدف‌گذاری و متولی سند ملی هوش مصنوعی.', url: 'https://peivast.com/p/205334', date: '2024-08-12', faDate: '۲۲ مرداد ۱۴۰۳' },
  { title: 'دسترسی نداشتن به داده فارسی، چالش اصلی توسعه هوش مصنوعی در ایران', source: 'پیوست', kind: 'گزارش', summary: 'بررسی محدودیت دسترسی به داده‌های فارسی، زیرساخت، چارچوب حقوقی و نگهداشت نیروی انسانی برای توسعه هوش مصنوعی مولد.', url: 'https://peivast.com/p/203368', date: '2024-07-23', faDate: '۲ مرداد ۱۴۰۳' },
  { title: 'سکوی هوش مصنوعی؛ صنعتی و نه دانشگاهی', source: 'خبرگزاری فارس', kind: 'گزارش', summary: 'بازتاب دیدگاه مهران ضیابری درباره ماهیت مهندسی سکوی هوش مصنوعی و ضرورت سپردن توسعه و بهره‌برداری آن به بخش خصوصی.', url: 'https://farsnews.ir/Razieh_Belali/1742305002984869277', date: '2025-03-18', faDate: '۲۸ اسفند ۱۴۰۳' },
  { title: 'ابرانسان‌ها در انتظار دستورالعمل برای ظاهر شدن!', source: 'پیوست', kind: 'پرونده', summary: 'پرونده‌ای درباره سندها و سیاست‌های توسعه هوش مصنوعی با دیدگاه چند فعال و متخصص این حوزه.', url: 'https://peivast.com/p/195810', date: '2024-04-28', faDate: '۹ اردیبهشت ۱۴۰۳' },
  { title: 'کاهش فروش ۷۰ درصدی سرویس ترجمیار پس از اختلال در اینترنت', source: 'پیوست', kind: 'گفت‌وگو', summary: 'گفت‌وگویی درباره اثر اختلال‌های اینترنت بر فروش ترجمیار، کیفیت سرویس ترگمان و دسترسی به زیرساخت‌های مورد نیاز.', url: 'https://peivast.com/p/145981', date: '2022-11-05', faDate: '۱۴ آبان ۱۴۰۱' },
  { title: 'بخش خصوصی برای پیشبرد پروژه شبکه ملی اطلاعات تعامل جدیدی را با حاکمیت شکل دهد', source: 'پیوست', kind: 'نشست', summary: 'گزارش نشستی از فعالان بخش خصوصی درباره مسیر شبکه ملی اطلاعات، نقش حاکمیت و نحوه مشارکت صنف.', url: 'https://peivast.com/p/114170', date: '2021-10-21', faDate: '۲۹ مهر ۱۴۰۰' },
  { title: 'آیا مترجم گوگل از مترجم ترگمان استفاده می‌کند؟', source: 'پیوست', kind: 'گفت‌وگو', summary: 'روایت تیم ترگمان و توضیح مهران ضیابری درباره تکرار خطاهای اختصاصی ترگمان در خروجی مترجم گوگل.', url: 'https://peivast.com/p/113320', date: '2021-10-09', faDate: '۱۷ مهر ۱۴۰۰' },
  { title: 'نباید طرح صیانت از حقوق کاربران مشمول اصل ۸۵ شود', source: 'پیوست', kind: 'نشست', summary: 'گزارش نشست فعالان فناوری درباره طرح صیانت، رسیدگی غیرعلنی ذیل اصل ۸۵ و پیامدهای آن برای کسب‌وکارها و کاربران.', url: 'https://peivast.com/p/105349', date: '2021-07-01', faDate: '۱۰ تیر ۱۴۰۰' },
  { title: 'واژه به واژه تا ملاقات ترجمه', source: 'پیوست', kind: 'کسب‌وکار', summary: 'روایتی از شرکت ترگمان، مسیر شکل‌گیری آن و تلاش تیم برای ساخت موتور ترجمه ماشینی فارسی.', url: 'https://peivast.com/p/59954', date: '2019-12-18', faDate: '۲۷ آذر ۱۳۹۸' }
];

export const courses = [
  {
    slug: 'enterprise-ai-governance-dba',
    title: 'حکمرانی هوش مصنوعی سازمانی',
    meta: 'دوره DBA · ۱۶ ساعت · ۱۴۰۵',
    summary: 'تبدیل پروژه هوش مصنوعی به قابلیت سازمانی؛ از حق تصمیم و صورت‌بندی مسئله تا معماری، امنیت، قرارداد و پذیرش.',
    slides: '۱۱۴ اسلاید',
    modules: [
      'مدل عملیاتی حکمرانی و حق تصمیم',
      'مرز قلمرو حکمرانی و AI-washing',
      'حکمرانی مسئله و سبد سرمایه‌گذاری',
      'معماری، داده و تأمین‌کننده',
      'امنیت، مسئولیت و نظارت انسانی',
      'قرارداد، پذیرش و ارزیابی پروژه'
    ]
  },
  {
    slug: 'behind-ai',
    title: 'پشت صحنه هوش مصنوعی برای مدیران',
    meta: 'کارگاه یک‌روزه · محتوای موقت',
    summary: 'مروری فشرده بر داده، مدل، زیرساخت، عملیات و محدودیت‌هایی که در یک دموی ساده دیده نمی‌شوند.',
    slides: 'در حال آماده‌سازی',
    modules: ['داده و کیفیت', 'مدل و بازیابی', 'زیرساخت و مقیاس', 'MLOps و پایش']
  },
  {
    slug: 'secure-organizational-assistant',
    title: 'طراحی دستیار هوشمند امن',
    meta: 'ارائه تخصصی · محتوای موقت',
    summary: 'از معماری RAG تا کنترل دسترسی در زمان اجرا و مدیریت رخدادهای امنیتی.',
    slides: 'نسخه اولیه',
    modules: ['سطح حمله', 'کنترل بازیابی', 'کنترل اجرا', 'شواهد و پاسخ‌گویی']
  }
];

export const socialLinks = [
  { label: 'X / Twitter', value: '@ziabary', url: 'https://x.com/ziabary', icon: 'fa-brands fa-twitter' },
  { label: 'LinkedIn', value: 'Mehran Ziabary', url: 'https://ir.linkedin.com/in/mehranziabary', icon: 'fa-brands fa-linkedin-in' },
  { label: 'GitHub', value: '@ziabary', url: 'https://github.com/ziabary', icon: 'fa-brands fa-github' },
  { label: 'Virgool', value: '@mehran.ziabary', url: 'https://virgool.io/@mehran.ziabary', icon: 'fa-solid fa-pen-nib' }
];

export const galleryItems = [
  {
    src: '/images/gallery/mehran-ziabary-media-office.jpeg',
    alt: 'مهران ضیابری در یک گفت‌وگوی رسانه‌ای',
    title: 'گفت‌وگوی رسانه‌ای',
    caption: 'تصویری از حضور در دفتر یک رسانه؛ تاریخ و شرح دقیق‌تر در حال تکمیل است.'
  },
  {
    src: '/images/gallery/mehran-ziabary-speaking.png',
    alt: 'مهران ضیابری هنگام ارائه و سخنرانی',
    title: 'ارائه و سخنرانی تخصصی',
    caption: 'در حال ارائه درباره فناوری و هوش مصنوعی.'
  },
  {
    src: '/images/profile/mehran-ziabary-formal.png',
    alt: 'پرتره رسمی مهران ضیابری',
    title: 'پرتره رسمی',
    caption: 'تصویر مناسب معرفی حرفه‌ای و رسانه‌ای.'
  },
  {
    src: '/images/gallery/mehran-ziabary-headshot.jpg',
    alt: 'تصویر چهره مهران ضیابری',
    title: 'پرتره',
    caption: 'تصویر آرشیوی؛ تاریخ تصویر در حال تکمیل است.'
  }
];
