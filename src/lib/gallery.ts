export type GalleryImage = {
  src: string;
  alt: string;
  caption?: string;
};

export type GalleryItem = {
  id: string;
  title: string;
  caption: string;
  date: string;
  faDate: string;
  images: GalleryImage[];
};

const galleryEntries: GalleryItem[] = [
  {
    id: 'itrc-president-visit',
    title: 'ارایه گزارش به رئیس جمهوری',
    caption: 'بازدید رئیس جمهوری از مرکز تحقیقات فناوری اطلاعات و ارتباطات و ارائه گزارش درباره پروژه‌های هوش مصنوعی و دست‌آوردهای شبکه ملی اطلاعات.',
    date: '2023-05-17',
    faDate: '۲۷ اردیبهشت ۱۴۰۲',
    images: [
      {
        src: '/images/gallery/itrc-president.jpg',
        alt: 'بازدید رئیس جمهوری از مرکز تحقیقات فناوری اطلاعات و ارتباطات'
      }
    ]
  },
  {
    id: 'bonyad-ai-event',
    title: 'ارایه در نمایشگاه',
    caption: 'نمایشگاه و رویداد تجربه‌محور هوش مصنوعی در صنعت بنیاد مستضعفان؛ معرفی سکوی هوش مصنوعی امن دماوند و سخنرانی درباره کاربردهای صنعتی هوش مصنوعی.',
    date: '2024-01-30',
    faDate: '۱۰ بهمن ۱۴۰۲',
    images: [
      {
        src: '/images/gallery/bonyad-dehghan.jpeg',
        alt: 'بازدید سردار دکتر دهقان از غرفه ترگمان در نمایشگاه هوش مصنوعی بنیاد مستضعفان',
        caption: 'معرفی ویژگی‌های سکوی هوش مصنوعی امن دماوند در جریان بازدید دکتر حسین دهقان.'
      },
      {
        src: '/images/gallery/bonyad-1.jpeg',
        alt: 'سخنرانی درباره هوش مصنوعی در بنیاد مستضعفان',
        caption: 'سخنرانی تخصصی درباره هوش مصنوعی و کاربردهای آن در صنعت.'
      }
    ]
  },
  {
    id: 'jahad-daneshgahi-ai-governance',
    title: 'ارائه و سخنرانی تخصصی',
    caption: 'سخنرانی تخصصی درباره هوش مصنوعی در جهاد دانشگاهی.',
    date: '2025-01-08',
    faDate: '۱۹ دی ۱۴۰۳',
    images: [
      {
        src: '/images/gallery/jahad-daneshgahi.jpg',
        alt: 'سخنرانی در حوزه حکمرانی هوش مصنوعی در جهاد دانشگاهی'
      }
    ]
  },
  {
    id: 'imidro-digital-transformation',
    title: 'ارائه و سخنرانی تخصصی',
    caption: 'ارایه سکوی هوش مصنوعی امن دماوند در همایش تحول دیجیتال معادن و صنایع معدنی.',
    date: '2025-02-26',
    faDate: '۸ اسفند ۱۴۰۳',
    images: [
      {
        src: '/images/gallery/imidro.jpg',
        alt: 'ارایه سکوی دماوند در همایش تحول دیجیتال معادن و صنایع معدنی'
      }
    ]
  },
  {
    id: 'filoger-ai-governance-panel',
    title: 'ارائه و سخنرانی تخصصی',
    caption: 'پنل «راهبرد ایران در عصر هوش مصنوعی از نگاه تصمیم‌گیران» در رویداد AI Summit 2025 دانشگاه تهران.',
    date: '2025-11-18',
    faDate: '۲۷ آبان ۱۴۰۴',
    images: [
      {
        src: '/images/gallery/filoger.jpeg',
        alt: 'پنل حکمرانی هوش مصنوعی در دانشگاه تهران'
      }, {
        src: '/images/gallery/filoger-2.jpg',
        alt: 'پنل حکمرانی هوش مصنوعی در دانشگاه تهران'
      }

    ]
  },
  {
    id: 'kashan-1404',
    title: 'بازدید صنعتی',
    caption: 'بازدید از کارخانه ورق گالوانیزه کاشان',
    date: '2025-12-04',
    faDate: '۰۶ آبان ۱۴۰۴',
    images: [
      {
        src: '/images/gallery/foolad-kashan-1.jpg',
        alt: 'بازدید صنعتی کارخانه ورق گالوانیزه کاشان'
      }, {
        src: '/images/gallery/foolad-kashan-2.jpeg',
        alt: 'بازدید صنعتی کارخانه ورق گالوانیزه کاشان'
      }
    ]
  },
  {
    id: 'asalooyeh-1404',
    title: 'بازدید صنعتی',
    caption: 'بازدید از بندر عسلویه برای هوشمند سازی بندر',
    date: '2025-09-28',
    faDate: '۰۶ آبان ۱۴۰۴',
    images: [
      {
        src: '/images/gallery/asalooyeh-3.jpg',
        alt: 'بازدید صنعتی بندر عسلویه'
      }, {
        src: '/images/gallery/asalooyeh-2.jpg',
        alt: 'بازدید صنعتی بندر عسلویه'
      }, {
        src: '/images/gallery/asalooyeh-1.jpg',
        alt: 'بازدید صنعتی بندر عسلویه'
      }, {
        src: '/images/gallery/asalooyeh-4.jpg',
        alt: 'بازدید صنعتی بندر عسلویه'
      }, {
        src: '/images/gallery/asalooyeh-5.jpg',
        alt: 'بازدید صنعتی بندر عسلویه'
      }
    ]
  },
  {
    id: 'sabanoor-1404',
    title: 'بازدید صنعتی',
    caption: 'بازدید از کارخانه گنداله‌سازی صبانور همدان',
    date: '2026-02-15',
    faDate: 'بهمن ۱۴۰۴',
    images: [
      {
        src: '/images/gallery/sabanoor-1.jpg',
        alt: 'ماکت گنداله‌سازی صبانور'
      }, {
        src: '/images/gallery/sabanoor-2.jpg',
        alt: 'کوره واحد گنداله‌سازی'
      }, {
        src: '/images/gallery/sabanoor-3.jpg',
        alt: 'ورودی به کوره گنداله‌سازی'
      }, {
        src: '/images/gallery/sabanoor-4.jpg',
        alt: 'واحد پوکه‌سازی'
      }, {
        src: '/images/gallery/sabanoor-5.jpg',
        alt: 'ماکت گنداله‌سازی صبانور'
      }
    ]
  },  {
    id: 'elecomp-1404',
    title: 'نمایشگاه الکامپ',
    caption: 'کمیسیون هوش مصنوعی و علکم داده در نمایشگاه الکامپ ۱۴۰۴',
    date: '2025-09-28',
    faDate: '۰۶ آبان ۱۴۰۴',
    images: [
      {
        src: '/images/gallery/elecomp-1404-1.jpeg',
        alt: 'پنل تخصصی در نمایشگاه الکامپ ۱۴۰۴'
      }, {
        src: '/images/gallery/elecomp-1404-2.jpeg',
        alt: 'بازدید مدیرکل سازمان فاوا از غرفه کمیسیون در نمایشگاه الکامپ ۱۴۰۴'
      }
    ],
  },  {
    id: 'data-mashhad-1404',
    title: 'نشست تخصصی',
    caption: 'هم‌اندیشی حکمرانی داده برای حکمرانی داده‌محور',
    date: '2025-10-08',
    faDate: 'آبان ۱۴۰۴',
    images: [
      {
        src: '/images/gallery/mashhad-hokmrani-1.jpg',
        alt:  'هم‌اندیشی حکمرانی داده برای حکمرانی داده‌محور',
      }, {
        src: '/images/gallery/mashhad-hokmrani-2.jpg',
        alt:  'هم‌اندیشی حکمرانی داده برای حکمرانی داده‌محور',
      }
    ],    
  }, {
    id: 'tlpc-1402',
    title: 'رونمایی',
    caption: 'امضای سند اعطای گواهی‌نامه حق بهره‌برداری تجاری کلان‌پیکره ترگمان توسط دبیر شورای عالی انقلاب فرهنگی',
    date: '2024-03-02',
    faDate: 'اسفند ۱۴۰۲',
    images: [
      {
        src: '/images/gallery/1402-12.jpeg',
        alt: 'امضای سند آزادرسانی کلان‌پیکره ترگمان توسط دبیر شورای عالی انقلاب فرهنگی',
      }
    ]
  },  {
    id: 'imidro-digital-transformation',
    title: 'ارائه و سخنرانی تخصصی',
    caption: 'نشست هم‌افزایی شرکت‌های هوش مصنوعی و صنعتی در معاونت علمی، فناوری و اقتصاد دانش‌بنیان ریاست‌جمهوری',
    date: '2026-01-26',
    faDate: 'دی ۱۴۰۴',
    images: [
      {
        src: '/images/gallery/isti-1404.jpeg',
        alt: 'نشست هم‌افزایی شرکت‌های هوش مصنوعی و صنعتی در معاونت علمی، فناوری و اقتصاد دانش‌بنیان ریاست‌جمهوری',
      }
    ]
  },
];

// Gallery chronology is data-driven so new entries never need to be inserted
// at a particular array position. ISO dates make the ordering deterministic.
export const galleryItems = [...galleryEntries].sort((a, b) => b.date.localeCompare(a.date));
