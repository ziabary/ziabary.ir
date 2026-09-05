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
  }, {
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
  }, {
    id: 'data-mashhad-1404',
    title: 'نشست تخصصی',
    caption: 'هم‌اندیشی حکمرانی داده برای حکمرانی داده‌محور',
    date: '2025-10-08',
    faDate: 'آبان ۱۴۰۴',
    images: [
      {
        src: '/images/gallery/mashhad-hokmrani-1.jpg',
        alt: 'هم‌اندیشی حکمرانی داده برای حکمرانی داده‌محور',
      }, {
        src: '/images/gallery/mashhad-hokmrani-2.jpg',
        alt: 'هم‌اندیشی حکمرانی داده برای حکمرانی داده‌محور',
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
  }, {
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
  
 {
    id: 'elecomp-1405-ai-ds-commision',
    title: 'رویداد نمایشگاه الکامپ ۱۴۰۵',
    caption: 'غرفه مشترک سه کمیسیون هوش مصنوعی و علم‌داده، اینترنت اشیا و شهر هوشمند در نمایشگاه الکامپ ۱۴۰۵',
    date: '2026-09-03',
    faDate: ' شهریور ۱۴۰۵',
    images: [
      {src: '/images/gallery/elecomp-1405/ai-ds/1.jpg', alt: 'حضور اعضای کمیسیون در غرفه مشترک کمیسیون‌های مرتبط با هوش مصنوعی و علم داده در نمایشگاه الکامپ ۱۴۰۵'},
      {src: '/images/gallery/elecomp-1405/ai-ds/2.jpg', alt: 'پنل تخصصی پنج کمیسیون هوش مصنوعی و علم داده، اینترنت اشیا، شهر هوشمند، پایش تصویری و اتوماسیون صنعتی در نمایشگاه الکامپ ۱۴۰۵'},
      {src: '/images/gallery/elecomp-1405/ai-ds/3.jpg', alt: 'حضور اعضای کمیسیون در غرفه مشترک کمیسیون‌های مرتبط با هوش مصنوعی و علم داده در نمایشگاه الکامپ ۱۴۰۵'},
      {src: '/images/gallery/elecomp-1405/ai-ds/4.jpg', alt: 'حضور اعضای کمیسیون در غرفه مشترک کمیسیون‌های مرتبط با هوش مصنوعی و علم داده در نمایشگاه الکامپ ۱۴۰۵'},
      {src: '/images/gallery/elecomp-1405/ai-ds/5.jpg', alt: 'حضور دکتر آقامحمدی، عضو محترم مجمع تشخیص مصلحت نظام در غرفه مشترک کمیسیون‌های مرتبط با هوش مصنوعی و علم داده در نمایشگاه الکامپ ۱۴۰۵'},
      {src: '/images/gallery/elecomp-1405/ai-ds/6.jpg', alt: 'حضور دکتر آقامحمدی، عضو محترم مجمع تشخیص مصلحت نظام در غرفه مشترک کمیسیون‌های مرتبط با هوش مصنوعی و علم داده در نمایشگاه الکامپ ۱۴۰۵'},
      {src: '/images/gallery/elecomp-1405/ai-ds/7.jpg', alt: 'حضور دکتر تقی‌پور، نماینده محترم مجلس شورای اسلامی در غرفه مشترک کمیسیون‌های مرتبط با هوش مصنوعی و علم داده در نمایشگاه الکامپ ۱۴۰۵'},
      {src: '/images/gallery/elecomp-1405/ai-ds/9.jpg', alt: 'حضور دکتر تقی‌پور، نماینده محترم مجلس شورای اسلامی در غرفه مشترک کمیسیون‌های مرتبط با هوش مصنوعی و علم داده در نمایشگاه الکامپ ۱۴۰۵'},
      {src: '/images/gallery/elecomp-1405/ai-ds/10.jpg', alt: 'حضور دکتر تقی‌پور، نماینده محترم مجلس شورای اسلامی در غرفه مشترک کمیسیون‌های مرتبط با هوش مصنوعی و علم داده در نمایشگاه الکامپ ۱۴۰۵'},
      {src: '/images/gallery/elecomp-1405/ai-ds/11.jpg', alt: 'حضور دکتر تقی‌پور، نماینده محترم مجلس شورای اسلامی در غرفه مشترک کمیسیون‌های مرتبط با هوش مصنوعی و علم داده در نمایشگاه الکامپ ۱۴۰۵'},
      {src: '/images/gallery/elecomp-1405/ai-ds/12.jpg', alt: 'حضور دکتر طاهری، نماینده محترم مجلس شورای اسلامی در غرفه مشترک کمیسیون‌های مرتبط با هوش مصنوعی و علم داده در نمایشگاه الکامپ ۱۴۰۵'},
      {src: '/images/gallery/elecomp-1405/ai-ds/13.jpg', alt: 'حضور دکتر طاهری، نماینده محترم مجلس شورای اسلامی در غرفه مشترک کمیسیون‌های مرتبط با هوش مصنوعی و علم داده در نمایشگاه الکامپ ۱۴۰۵'},
    ]
  },  
  {
    id: 'elecomp-1405-ai-saba',
    title: 'عقد تفاهمنامه همکاری',
    caption: 'عقد تفاهم‌نامه همکاری بین انجمن علمی هوش مصنوعی و دانشگاه توسعه کسب‌و‌کار سبا در غرفه هومص',
    date: '2026-09-03',
    faDate: ' شهریور ۱۴۰۵',
    images: [
      {
        src: '/images/gallery/elecomp-1405/anjoman/1.jpeg',
        alt: 'عقد تفاهم‌نامه همکاری بین انجمن علمی هوش مصنوعی و دانشگاه توسعه کسب‌و‌کار سبا در غرفه هومص',
      }
    ]
  },    {
    id: 'elecomp-1405-ai-blockchain',
    title: 'عقد تفاهمنامه همکاری',
    caption: 'عقد تفاهم‌نامه همکاری بین انجمن علمی هوش مصنوعی و انجمن بلاکچین در غرفه هومص',
    date: '2026-09-03',
    faDate: ' شهریور ۱۴۰۵',
    images: [
      {
        src: '/images/gallery/elecomp-1405/anjoman/2.jpeg',
        alt: 'عقد تفاهم‌نامه همکاری بین انجمن علمی هوش مصنوعی و انجمن بلاکچین در غرفه هومص',
      }
    ]
  },     {
    id: 'inotex-1405',
    title: 'رویداد اینوتکس ۱۴۰۵',
    caption: 'حضور در پنل تخصصی و میز تسهیل‌گری در مرکز نوآوری قوه مقننه در رویداد اینوتکس ۱۴۰۵',
    date: '2026-09-04',
    faDate: ' شهریور ۱۴۰۵',
    images: [
      {
        src: '/images/gallery/elecomp-1405/inotex/1.jpg',
        alt: 'پنل تخصصی در حوزه قانون جهش دانش‌بنیان',
      },
            {
        src: '/images/gallery/elecomp-1405/inotex/2.jpg',
        alt: 'پنل تخصصی در حوزه حکمرانی',
      },
            {
        src: '/images/gallery/elecomp-1405/inotex/3.jpg',
        alt: 'میز تسهیل‌گری در مرکز نوآوری قوه مقننه',
      },
            {
        src: '/images/gallery/elecomp-1405/inotex/4.jpg',
        alt: 'میز تسهیل‌گری در مرکز نوآوری قوه مقننه',
      }

    ]
  },  

   {
    id: 'elecomp-1405-ai-commision-national',
    title: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور ',
    caption: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده سازمان نظام صنفی رایانه‌ای کشور به میزبانی کمیسیون هوش مصنوعی و علم داده نصر تهران در نمایشگاه الکامپ ۱۴۰۵ در غرفه هومص',
    date: '2026-09-01',
    faDate: '۱۰ شهریور ۱۴۰۵',
    images: [
      {src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-1.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵'},
      {src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-2.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵'},
      {src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-3.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵'},
      {src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-4.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵'},
      {src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-5.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵'},
      {src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-6.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵'},
      {src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-7.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵'},
      {src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-8.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵'},
      {src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-9.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵'},
      {src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-10.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵'},
      {src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-11.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵'},
      {src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-12.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵'},
      {src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-13.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵'},
      {src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-14.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵'},
      {src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-15.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵'},
      {src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-16.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵'},
      {src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-17.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵'},
      {src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-18.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵'},
      {src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-19.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵'},
      {src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-20.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵'},
      {src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-21.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵'},
      {src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-22.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵'},
      {src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-23.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵'},
      {src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-24.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵'},
      {src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-25.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵'},
      {src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-26.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵'},
      {src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-27.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵'},
      {src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-28.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵'},
      {src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-29.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵'},
      {src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-30.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵'},
      {src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-31.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵'},
      {src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-32.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵'},
      {src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-33.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵'},
      {src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-34.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵'},
      {src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-35.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵'},
      {src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-36.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵'},
      {src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-37.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵'},
      {src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-38.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵'},
      {src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-39.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵'},
      {src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-40.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵'},
      {src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-41.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵'},
      {src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-42.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵'},
      {src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-43.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵'},
      {src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-44.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵'},
      {src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-45.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵'},
      {src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-46.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵'},
      {src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-47.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵'},
      {src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-48.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵'},
      {src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-49.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵'},
      {src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-50.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵'},
      {src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-51.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵'},
      {src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-52.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵'},
      {src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-53.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵'},
      {src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-54.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵'},
      {src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-55.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵'},
      {src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-56.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵'}
    ]
  },
];

// Gallery chronology is data-driven so new entries never need to be inserted
// at a particular array position. ISO dates make the ordering deterministic.
export const galleryItems = [...galleryEntries].sort((a, b) => b.date.localeCompare(a.date));
