export type Presentation = {
  slug: string;
  title: string;
  kind: 'دوره' | 'کارگاه' | 'سخنرانی' | 'ارائه تخصصی';
  summary: string;
  description: string;
  presentedAt: string;
  venue: string;
  event?: string;
  organizer?: string;
  audience?: string;
  duration?: string;
  slideCount: number;
  version?: string;
  cover?: string;
  pdf?: string;
  topics: string[];
};

export const presentations: Presentation[] = [
  {
    slug: 'enterprise-ai-governance-dba',
    title: 'حکمرانی هوش مصنوعی سازمانی',
    kind: 'دوره',
    summary: 'تبدیل پروژه هوش مصنوعی به قابلیت سازمانی؛ از حق تصمیم و صورت‌بندی مسئله تا معماری، امنیت، قرارداد و پذیرش.',
    description: 'این دوره با یک پرونده روایی پیش می‌رود: مدیرعامل از سازمان می‌خواهد ظرف سه ماه یک دستیار هوشمند بسازد. هر بخش یکی از تصمیم‌های پنهان پشت این دستور ساده را آشکار می‌کند.',
    presentedAt: '۱۴۰۵',
    venue: 'دانشکدگان مدیریت دانشگاه تهران',
    event: 'دوره DBA',
    organizer: 'دانشگاه تهران',
    audience: 'مدیران و دانشجویان DBA',
    duration: 'دو روز · ۱۶ ساعت',
    slideCount: 114,
    version: 'نسخه ۱',
    cover: '/slides/enterprise-ai-governance-dba/cover.jpg',
    pdf: '/slides/enterprise-ai-governance-dba/AIGov-DBA.pdf',
    topics: [
      'مدل عملیاتی حکمرانی و حق تصمیم',
      'مرز قلمرو حکمرانی و AI-washing',
      'حکمرانی مسئله و سبد سرمایه‌گذاری',
      'معماری، داده و تأمین‌کننده',
      'امنیت، مسئولیت و نظارت انسانی',
      'قرارداد، پذیرش و ارزیابی پروژه'
    ]
  },
    {
    slug: 'enterprise-ai-governance-dba',
    title: 'رویکرد مناسب ایران در زیرساخت‌های پردازشی هوش مصنوعی',
    kind: 'سخنرانی',
    summary: 'این اسلایدها انواع زیرساخت‌های پردازشی هوش مصنوعی و رویکرد مناسب ایران در این زمینه را بررسی می‌کنند.',
    description: 'پیچیدگی‌های موجود در انتخاب GPU برای کاربست‌های هوش مصنوعی موضوعی است که کمتر به آن پرداخته شده است. در این سخنرانی که در جریان نشست سالانه FaceCup برگزار شد، ابعاد مختلف موضوع بررسی و ارایه شد. ',
    presentedAt: '۱۴۰۴',
    venue: 'کارخانه هوشمندسازی و نوآوری امیدینو',
    event: 'ششمین رویداد هوش مصنوعی فیس‌کاپ',
    organizer: 'مسابقات فیس‌کاپ',
    audience: 'مدیران و دانشجویان',
    duration: '۴۰ دقیقه',
    slideCount: 20,
    version: 'نسخه ۱',
    cover: '/slides/facecup/cover.png',
    pdf: '/slides/facecup/IranGPUFarm.pdf',
    topics: [
      'انواع زیرساخت‌های پردازشی هوش مصنوعی',
      'کارایی به قیمت',
      'بازار و دسترسی به GPU',
      'انتخاب کارت GPU',
      'انتخاب رابط‌ها',
      'انتخاب سرورها',
      'انواع خدمات پردازشی'
    ]
  },
    {
    slug: 'ai-4-managers-part-4',
    title: 'هوش مصنوعی برای مدیران - بخش چهارم؛ تفکر حل مساله با هوش مصنوعی',
    kind: 'دوره',
    summary: 'آشنایی با اصول و روش‌های حل مسئله با هوش مصنوعی برای مدیران؛ از صورت‌بندی مسئله تا ارزیابی پروژه و پذیرش راهکار.',
    description: 'در این بخش تلاش می‌شود تا پشت پرده هوش منصوعی و انواع روش‌های حل مساله و ارزیابی راهکار بررسی شود ',
    presentedAt: 'از ۱۴۰۳ تا ۱۴۰۵',
    venue: 'ارگان‌های مختلف',
    event: 'دوره آموزشی مدیران',
    organizer: 'هوشران',
    audience: 'مدیران صنعتی و سازمانی',
    duration: '۸ ساعت',
    slideCount: 58,
    version: 'نسخه ۱',
    cover: '/slides/ai-4-managers/cover-4.jpg',
    pdf: '/slides/ai-4-managers/AI4Managers-P4.pdf',
    topics: [   ]
  },
    {
    slug: 'ai-4-managers-part-3',
    title: 'هوش مصنوعی برای مدیران - بخش سوم؛ هوش مصنوعی چه نیست و چه انتظاری نداشته باشیم',
    kind: 'دوره',
    summary: 'رفع ابهام و سوءتفاهم درباره هوش مصنوعی برای مدیران؛ از مرزهای توانایی تا محدودیت‌ها و انتظارات غیرواقعی.',
    description: 'در  این بخش  مدیران با مرزهای توانایی هوش مصنوعی و محدودیت‌های آن آشنا می‌شوند و می‌آموزند که چه انتظاراتی از هوش مصنوعی نداشته باشند.',
    presentedAt: 'از ۱۴۰۳ تا ۱۴۰۵',
    venue: 'ارگان‌های مختلف',
    event: 'دوره آموزشی مدیران',
    organizer: 'هوشران',
    audience: 'مدیران صنعتی و سازمانی',
    duration: '۴ ساعت',
    slideCount: 27,
    version: 'نسخه ۱',
    cover: '/slides/ai-4-managers/cover-3.jpg',
    pdf: '/slides/ai-4-managers/AI4Managers-P3.pdf',
    topics: [    ]
  },
    {
    slug: 'ai-4-managers-part-1-2',
    title: 'هوش مصنوعی برای مدیران - بخش اول و دوم؛ مقدمه‌ای بر هوش مصنوعی و کاربردهای آن',
    kind: 'دوره',
    summary: 'آشنایی با مفاهیم بنیادین هوش مصنوعی و کاربردهای عملی آن در محیط سازمانی؛ از تعریف تا ارزیابی پروژه.',
    description: 'در  این بخش  مدیران با مفاهیم بنیادین هوش مصنوعی و کاربردهای عملی آن در محیط سازمانی آشنا می‌شوند.',
    presentedAt: 'از ۱۴۰۳ تا ۱۴۰۵',
    venue: 'ارگان‌های مختلف',
    event: 'دوره آموزشی مدیران',
    organizer: 'هوشران',
    audience: 'مدیران صنعتی و سازمانی',
    duration: '۴ ساعت',
    slideCount: 22,
    version: 'نسخه ۱',
    cover: '/slides/ai-4-managers/cover-1.jpg',
    pdf: '/slides/ai-4-managers/AI4Managers-P1-P2.pdf',
    topics: [    ]
  },
    {
    slug: 'nlp4eas',
    title: 'کاربرد هوش مصنوعی و پردازش زبان فارسی در نرم‌افزارهای سازمانی',
    kind: 'سخنرانی',
    summary: 'آشنایی با کاربردهای عملی هوش مصنوعی و پردازش زبان فارسی در نرم‌افزارهای سازمانی؛ از تعریف تا ارزیابی پروژه.',
    description: 'این ارایه برای توسعه‌دهندگان و مدیران نرم‌افزارهای پیشرفته سازمانی طراحی شده است و به بررسی کاربردهای عملی هوش مصنوعی و پردازش زبان فارسی در این نرم‌افزارها می‌پردازد.',
    presentedAt: '۱۴۰۳',
    venue: 'پژوهشگاه ارتباطات و فناوری اطلاعات (مرکز تحقیقات مخابرات ایران)',
    event: 'دوره آموزشی مدیران',
    organizer: 'تصنا',
    audience: 'مدیران شرکت‌های نرم‌افزاری و توسعه‌دهندگان سازمانی',
    duration: '۲ ساعت',
    slideCount: 27,
    version: 'نسخه ۱',
    cover: '/slides/nlp4eas/cover.jpg',
    pdf: '/slides/nlp4eas/NLP4EAS.pdf',
    topics: [  ]
  },
    {
    slug: 'data-governance-ai-pardis',
    title: 'حکمرانی داده‌ها در عصر هوش مصنوعی',
    kind: 'سخنرانی',
    summary: 'ارایه‌ای کوتاه در زمینه حکمرانی داده‌ها و نقش آن در موفقیت پروژه‌های هوش مصنوعی؛ از تعریف تا ارزیابی پروژه.',
    description: 'این ارایه در جریان اولین کنفرانس ملی هوش مصنوعی و اینترنت اشیا د و همزمن ا با اینوتکس ۱۴۰۳ برگزار شد و به بررسی نقش حکمرانی داده‌ها در موفقیت پروژه‌های هوش مصنوعی می‌پردازد.',
    presentedAt: '۱۴۰۳',
    venue: 'دانشگاه آزاد اسلامی واحد علوم و فناوری پردیس',
    event: 'اولین کنفرانس ملی هوش مصنوعی و اینترنت اشیا',
    organizer: 'کنفرانس ملی هوش مصنوعی و اینترنت اشیا',
    audience: 'دانشجویان و اساتید',
    duration: '۱ ساعت',
    slideCount: 18,
    version: 'نسخه ۱',
    cover: '/slides/data-governance/cover-pardis.jpg',
    pdf: '/slides/data-governance/DataGovernance-Pardis.pdf',
    topics: [  ]
  },
      {
    slug: 'international-ai-acts',
    title: 'بررسی اسناد و الگوهای جهانی هوش مصنوعی',
    kind: 'سخنرانی',
    summary: 'خلاصه‌ای از بررسی اسناد و الگوهای مطرح جهانی در زمینه هوش مصنوعی',
    description: 'این اسلاید‌ها به درخواست سازمان ملی هوش مصنوعی تهیه و ارائه شد و به بررسی اسناد و الگوهای مطرح جهانی در زمینه هوش مصنوعی در میان بیش زا ۲۰ کشور می‌پردازد.',
    presentedAt: 'زمستان ۱۴۰۳',
    venue: 'سازمان ملی هوش مصنوعی',
    event: 'نشست تخصصی بررسی اسناد و الگوهای جهانی هوش مصنوعی',
    organizer: 'سازمان ملی هوش مصنوعی',
    audience: 'دانشجویان و اساتید',
    duration: '۱ ساعت',
    slideCount: 18,
    version: 'نسخه ۱',
    cover: '/slides/ai-act/cover.png',
    pdf: '/slides/ai-act/IntlAIAct-v2.pdf',
    topics: [
      'تعداد کشورهای دارای سند',
      'اسناد مهم جهانی',
      'سند جمهوری اسلامی ایران',
      'دسته‌بندی اسناد جهانی'
    ]
  },
    {
    slug: 'data-governance-ai-bonyad',
    title: 'حکمرانی داده‌ها در عصر هوش مصنوعی',
    kind: 'سخنرانی',
    summary: 'ارایه‌ای کوتاه در زمینه حکمرانی داده‌ها و نقش آن در کسب‌وکارهای زیرمجموعه بنیاد مستضعفان انقلاب اسلامی.',
    description: 'در این ارایه که در حضور مدیران و کارشناسان بنیاد مستضعفان انقلاب اسلامی برگزار شد، نقش حکمرانی داده‌ها در موفقیت پروژه‌های هوش مصنوعی بررسی شد.',
    presentedAt: '۱۴۰۲',
    venue: 'بنیاد مستضعفان انقلاب اسلامی',
    event: 'اولین رویداد تجربه‌محور هوش مصنوعی در صنعت',
    organizer: 'بنیاد مستضعفان انقلاب اسلامی',
    audience: 'دانشجویان و اساتید',
    duration: '۱ ساعت',
    slideCount: 18,
    version: 'نسخه ۱',
    cover: '/slides/data-governance/cover-bonyad.jpg',
    pdf: '/slides/data-governance/DataGovernance-Bonyad.pdf',
    topics: [  ]
  },
    {
    slug: 'llm-persian-culture',
    title: 'تقابل و تعامل هوش مصنوعی با فرهنگ و خط و زبان فارسی',
    kind: 'سخنرانی',
    summary: 'زبان فارسی با آمدن LLM ها با یک تهدید فزاینده روبرو شد. این سخنرانی یکی از اولین هشدارها در این زمینه بود',
    description: 'زبان فارسی از هوش مصنوعی به شدت تاثیر گرفته و آمدن LLM‌ها تهدیدات علیه این زبان را افزایش داده است. این سخنرانی یکی از اولین هشدارها در این زمینه بود و به بررسی تهدیدات و فرصت‌های هوش مصنوعی برای زبان فارسی پرداخت.',
    presentedAt: '۱۴۰۲',
    venue: 'حوزه هنری',
    event: 'سخنرانی تخصصی در زمینه هوش مصنوعی و فرهنگ و خط و زبان فارسی',
    organizer: 'ترگمان',
    audience: 'دانشجویان و اساتید',
    duration: '۲ ساعت',
    slideCount: 22,
    version: 'نسخه ۱',
    cover: '/slides/llm-persian-culture/cover.png',
    pdf: '/slides/llm-persian-culture/LLMPersianCulture.pdf',
    topics: [  ]
  }
];

export const findPresentation = (slug: string) =>
  presentations.find((presentation) => presentation.slug === slug);
