export type GalleryLocale = 'fa' | 'en' | 'es';
export type GalleryImage = {
  src: string;
  alt: string;
  caption?: string;
  /** A non-empty caption enables this individual photo in the target language. */
  translations?: Partial<Record<Exclude<GalleryLocale, 'fa'>, {
    caption: string;
    alt?: string;
  }>>;
};
export type GalleryItem = {
  id: string;
  title: string;
  caption: string;
  date: string;
  faDate: string;
  images: GalleryImage[];
  translations?: Partial<Record<Exclude<GalleryLocale, 'fa'>, {
    title?: string;
    caption?: string;
  }>>;
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
        alt: 'بازدید رئیس جمهوری از مرکز تحقیقات فناوری اطلاعات و ارتباطات',
        translations: {
          en: {
            caption: "The President visits the ICT Research Institute."
          },
          es: {
            caption: "Visita del presidente al Instituto de Investigación de TIC."
          }
        }
      }
    ],
    translations: {
      en: {
        title: "Briefing the President",
        caption: "The President visits the ICT Research Institute for a briefing on AI projects and the National Information Network."
      },
      es: {
        title: "Presentación al presidente",
        caption: "Visita del presidente al Instituto de Investigación de TIC para conocer los proyectos de IA y los avances de la Red Nacional de Información."
      }
    }
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
        caption: 'معرفی ویژگی‌های سکوی هوش مصنوعی امن دماوند در جریان بازدید دکتر حسین دهقان.',
        translations: {
          en: {
            caption: "Presenting the Damavand secure AI platform during Dr Hossein Dehghan’s visit.",
            alt: "Dr Dehghan visits Targoman’s stand at the Mostazafan Foundation’s AI exhibition."
          },
          es: {
            caption: "Presentación de la plataforma de IA segura Damavand durante la visita del doctor Hossein Dehghan.",
            alt: "El doctor Dehghan visita el estand de Targoman en la exposición de IA de la Fundación Mostazafan."
          }
        }
      },
      {
        src: '/images/gallery/bonyad-1.jpeg',
        alt: 'سخنرانی درباره هوش مصنوعی در بنیاد مستضعفان',
        caption: 'سخنرانی تخصصی درباره هوش مصنوعی و کاربردهای آن در صنعت.',
        translations: {
          en: {
            caption: "An expert talk on AI and its industrial applications.",
            alt: "A talk on AI at the Mostazafan Foundation."
          },
          es: {
            caption: "Conferencia sobre IA y sus aplicaciones industriales.",
            alt: "Conferencia sobre IA en la Fundación Mostazafan."
          }
        }
      }
    ],
    translations: {
      en: {
        title: "Exhibition presentation",
        caption: "Presenting the Damavand secure AI platform and industrial AI applications at the Mostazafan Foundation’s industry event."
      },
      es: {
        title: "Presentación en una exposición",
        caption: "Presentación de la plataforma de IA segura Damavand y de aplicaciones industriales de IA en un encuentro de la Fundación Mostazafan."
      }
    }
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
        alt: 'سخنرانی در حوزه حکمرانی هوش مصنوعی در جهاد دانشگاهی',
        translations: {
          en: {
            caption: "A talk on AI governance at ACECR."
          },
          es: {
            caption: "Conferencia sobre gobernanza de la IA en ACECR."
          }
        }
      }
    ],
    translations: {
      en: {
        title: "Talks and presentations",
        caption: "An expert talk on AI at the Academic Center for Education, Culture and Research (ACECR)."
      },
      es: {
        title: "Conferencias y presentaciones",
        caption: "Conferencia sobre IA en el Centro Académico de Educación, Cultura e Investigación (ACECR)."
      }
    }
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
        alt: 'ارایه سکوی دماوند در همایش تحول دیجیتال معادن و صنایع معدنی',
        translations: {
          en: {
            caption: "Presenting the Damavand platform at a conference on digital transformation in mining and mineral industries."
          },
          es: {
            caption: "Presentación de la plataforma Damavand en un congreso sobre transformación digital de la minería y las industrias minerales."
          }
        }
      }
    ],
    translations: {
      en: {
        title: "Talks and presentations",
        caption: "Presenting the Damavand secure AI platform at a conference on digital transformation in mining and mineral industries."
      },
      es: {
        title: "Conferencias y presentaciones",
        caption: "Presentación de la plataforma de IA segura Damavand en un congreso sobre transformación digital de la minería y las industrias minerales."
      }
    }
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
        alt: 'پنل حکمرانی هوش مصنوعی در دانشگاه تهران',
        translations: {
          en: {
            caption: "AI governance panel at the University of Tehran."
          },
          es: {
            caption: "Mesa sobre gobernanza de la IA en la Universidad de Teherán."
          }
        }
      }, {
        src: '/images/gallery/filoger-2.jpg',
        alt: 'پنل حکمرانی هوش مصنوعی در دانشگاه تهران',
        translations: {
          en: {
            caption: "AI governance panel at the University of Tehran."
          },
          es: {
            caption: "Mesa sobre gobernanza de la IA en la Universidad de Teherán."
          }
        }
      }
    ],
    translations: {
      en: {
        title: "Talks and presentations",
        caption: "A panel on Iran’s strategy in the AI era, from the perspective of decision-makers, at AI Summit 2025, University of Tehran."
      },
      es: {
        title: "Conferencias y presentaciones",
        caption: "Mesa sobre la estrategia de Irán en la era de la IA desde la perspectiva de los responsables de decisiones, en AI Summit 2025, Universidad de Teherán."
      }
    }
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
        alt: 'بازدید صنعتی کارخانه ورق گالوانیزه کاشان',
        translations: {
          en: {
            caption: "Industrial visit to the Kashan galvanized steel sheet factory."
          },
          es: {
            caption: "Visita industrial a la fábrica de chapa de acero galvanizado de Kashan."
          }
        }
      }, {
        src: '/images/gallery/foolad-kashan-2.jpeg',
        alt: 'بازدید صنعتی کارخانه ورق گالوانیزه کاشان',
        translations: {
          en: {
            caption: "Industrial visit to the Kashan galvanized steel sheet factory."
          },
          es: {
            caption: "Visita industrial a la fábrica de chapa de acero galvanizado de Kashan."
          }
        }
      }
    ],
    translations: {
      en: {
        title: "Industrial visit",
        caption: "Visit to the Kashan galvanized steel sheet factory."
      },
      es: {
        title: "Visita industrial",
        caption: "Visita a la fábrica de chapa de acero galvanizado de Kashan."
      }
    }
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
        alt: 'بازدید صنعتی بندر عسلویه',
        translations: {
          en: {
            caption: "Industrial visit to Asaluyeh port."
          },
          es: {
            caption: "Visita industrial al puerto de Asaluyeh."
          }
        }
      }, {
        src: '/images/gallery/asalooyeh-2.jpg',
        alt: 'بازدید صنعتی بندر عسلویه',
        translations: {
          en: {
            caption: "Industrial visit to Asaluyeh port."
          },
          es: {
            caption: "Visita industrial al puerto de Asaluyeh."
          }
        }
      }, {
        src: '/images/gallery/asalooyeh-1.jpg',
        alt: 'بازدید صنعتی بندر عسلویه',
        translations: {
          en: {
            caption: "Industrial visit to Asaluyeh port."
          },
          es: {
            caption: "Visita industrial al puerto de Asaluyeh."
          }
        }
      }, {
        src: '/images/gallery/asalooyeh-4.jpg',
        alt: 'بازدید صنعتی بندر عسلویه',
        translations: {
          en: {
            caption: "Industrial visit to Asaluyeh port."
          },
          es: {
            caption: "Visita industrial al puerto de Asaluyeh."
          }
        }
      }, {
        src: '/images/gallery/asalooyeh-5.jpg',
        alt: 'بازدید صنعتی بندر عسلویه',
        translations: {
          en: {
            caption: "Industrial visit to Asaluyeh port."
          },
          es: {
            caption: "Visita industrial al puerto de Asaluyeh."
          }
        }
      }
    ],
    translations: {
      en: {
        title: "Industrial visit",
        caption: "Visit to Asaluyeh port to discuss smart port development."
      },
      es: {
        title: "Visita industrial",
        caption: "Visita al puerto de Asaluyeh para estudiar su transformación en un puerto inteligente."
      }
    }
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
        alt: 'ماکت گنداله‌سازی صبانور',
        translations: {
          en: {
            caption: "Scale model of the Sabanour pelletizing plant."
          },
          es: {
            caption: "Maqueta de la planta de peletización Sabanour."
          }
        }
      }, {
        src: '/images/gallery/sabanoor-2.jpg',
        alt: 'کوره واحد گنداله‌سازی',
        translations: {
          en: {
            caption: "Furnace at the pelletizing plant."
          },
          es: {
            caption: "Horno de la planta de peletización."
          }
        }
      }, {
        src: '/images/gallery/sabanoor-3.jpg',
        alt: 'ورودی به کوره گنداله‌سازی',
        translations: {
          en: {
            caption: "Inlet to the pelletizing furnace."
          },
          es: {
            caption: "Entrada al horno de peletización."
          }
        }
      }, {
        src: '/images/gallery/sabanoor-4.jpg',
        alt: 'واحد پوکه‌سازی',
        translations: {
          en: {
            caption: "Aggregate production unit."
          },
          es: {
            caption: "Unidad de producción de áridos."
          }
        }
      }, {
        src: '/images/gallery/sabanoor-5.jpg',
        alt: 'ماکت گنداله‌سازی صبانور',
        translations: {
          en: {
            caption: "Scale model of the Sabanour pelletizing plant."
          },
          es: {
            caption: "Maqueta de la planta de peletización Sabanour."
          }
        }
      }
    ],
    translations: {
      en: {
        title: "Industrial visit",
        caption: "Visit to the Sabanour pelletizing plant in Hamedan."
      },
      es: {
        title: "Visita industrial",
        caption: "Visita a la planta de peletización Sabanour en Hamedán."
      }
    }
  }, {
    id: 'elecomp-1404',
    title: 'نمایشگاه الکامپ',
    caption: 'کمیسیون هوش مصنوعی و علکم داده در نمایشگاه الکامپ ۱۴۰۴',
    date: '2025-09-28',
    faDate: '۰۶ آبان ۱۴۰۴',
    images: [
      {
        src: '/images/gallery/elecomp-1404-1.jpeg',
        alt: 'پنل تخصصی در نمایشگاه الکامپ ۱۴۰۴',
        translations: {
          en: {
            caption: "Expert panel at Elecomp 2025."
          },
          es: {
            caption: "Mesa de expertos en Elecomp 2025."
          }
        }
      }, {
        src: '/images/gallery/elecomp-1404-2.jpeg',
        alt: 'بازدید مدیرکل سازمان فاوا از غرفه کمیسیون در نمایشگاه الکامپ ۱۴۰۴',
        translations: {
          en: {
            caption: "An ICT Organization director-general visits the commission’s stand at Elecomp 2025."
          },
          es: {
            caption: "Visita de un director general de la Organización de TIC al estand de la comisión en Elecomp 2025."
          }
        }
      }
    ],
    translations: {
      en: {
        title: "Elecomp exhibition",
        caption: "The AI and Data Science Commission at Elecomp 2025."
      },
      es: {
        title: "Exposición Elecomp",
        caption: "La Comisión de IA y Ciencia de Datos en Elecomp 2025."
      }
    }
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
        translations: {
          en: {
            caption: "A discussion on data governance as a foundation for data-driven governance."
          },
          es: {
            caption: "Encuentro sobre la gobernanza de datos como base de una gestión pública guiada por datos."
          }
        }
      }, {
        src: '/images/gallery/mashhad-hokmrani-2.jpg',
        alt: 'هم‌اندیشی حکمرانی داده برای حکمرانی داده‌محور',
        translations: {
          en: {
            caption: "A discussion on data governance as a foundation for data-driven governance."
          },
          es: {
            caption: "Encuentro sobre la gobernanza de datos como base de una gestión pública guiada por datos."
          }
        }
      }
    ],
    translations: {
      en: {
        title: "Expert discussion",
        caption: "A discussion on data governance as a foundation for data-driven governance."
      },
      es: {
        title: "Encuentro de especialistas",
        caption: "Encuentro sobre la gobernanza de datos como base de una gestión pública guiada por datos."
      }
    }
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
        translations: {
          en: {
            caption: "The Secretary of the Supreme Council of the Cultural Revolution signs the Targoman corpus release document."
          },
          es: {
            caption: "El secretario del Consejo Supremo de la Revolución Cultural firma el documento de apertura del corpus de Targoman."
          }
        }
      }
    ],
    translations: {
      en: {
        title: "Launch event",
        caption: "The Secretary of the Supreme Council of the Cultural Revolution signs the document granting commercial-use rights for the Targoman corpus."
      },
      es: {
        title: "Acto de presentación",
        caption: "El secretario del Consejo Supremo de la Revolución Cultural firma el documento que concede derechos de uso comercial del corpus de Targoman."
      }
    }
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
        translations: {
          en: {
            caption: "A meeting of AI and industrial companies at the Vice Presidency for Science, Technology and the Knowledge-Based Economy."
          },
          es: {
            caption: "Encuentro de empresas de IA e industriales en la Vicepresidencia de Ciencia, Tecnología y Economía del Conocimiento."
          }
        }
      }
    ],
    translations: {
      en: {
        title: "Talks and presentations",
        caption: "A meeting of AI and industrial companies at the Vice Presidency for Science, Technology and the Knowledge-Based Economy."
      },
      es: {
        title: "Conferencias y presentaciones",
        caption: "Encuentro de empresas de IA e industriales en la Vicepresidencia de Ciencia, Tecnología y Economía del Conocimiento."
      }
    }
  },
  {
    id: 'elecomp-1405-ai-ds-commision',
    title: 'رویداد نمایشگاه الکامپ ۱۴۰۵',
    caption: 'غرفه مشترک سه کمیسیون هوش مصنوعی و علم‌داده، اینترنت اشیا و شهر هوشمند در نمایشگاه الکامپ ۱۴۰۵',
    date: '2026-09-03',
    faDate: ' شهریور ۱۴۰۵',
    images: [
      { src: '/images/gallery/elecomp-1405/ai-ds/1.jpg', alt: 'حضور اعضای کمیسیون در غرفه مشترک کمیسیون‌های مرتبط با هوش مصنوعی و علم داده در نمایشگاه الکامپ ۱۴۰۵',
        translations: {
          en: {
            caption: "Commission members at the shared AI and Data Science commissions’ stand at Elecomp 2026."
          },
          es: {
            caption: "Miembros de las comisiones en el estand conjunto de IA y Ciencia de Datos en Elecomp 2026."
          }
        }
      },
      { src: '/images/gallery/elecomp-1405/ai-ds/2.jpg', alt: 'پنل تخصصی پنج کمیسیون هوش مصنوعی و علم داده، اینترنت اشیا، شهر هوشمند، پایش تصویری و اتوماسیون صنعتی در نمایشگاه الکامپ ۱۴۰۵',
        translations: {
          en: {
            caption: "Joint panel of the AI and Data Science, Internet of Things, Smart City, Video Monitoring, and Industrial Automation commissions at Elecomp 2026."
          },
          es: {
            caption: "Mesa conjunta de las comisiones de IA y Ciencia de Datos, Internet de las Cosas, Ciudad Inteligente, Videovigilancia y Automatización Industrial en Elecomp 2026."
          }
        }
      },
      { src: '/images/gallery/elecomp-1405/ai-ds/3.jpg', alt: 'حضور اعضای کمیسیون در غرفه مشترک کمیسیون‌های مرتبط با هوش مصنوعی و علم داده در نمایشگاه الکامپ ۱۴۰۵',
        translations: {
          en: {
            caption: "Commission members at the shared AI and Data Science commissions’ stand at Elecomp 2026."
          },
          es: {
            caption: "Miembros de las comisiones en el estand conjunto de IA y Ciencia de Datos en Elecomp 2026."
          }
        }
      },
      { src: '/images/gallery/elecomp-1405/ai-ds/4.jpg', alt: 'حضور اعضای کمیسیون در غرفه مشترک کمیسیون‌های مرتبط با هوش مصنوعی و علم داده در نمایشگاه الکامپ ۱۴۰۵',
        translations: {
          en: {
            caption: "Commission members at the shared AI and Data Science commissions’ stand at Elecomp 2026."
          },
          es: {
            caption: "Miembros de las comisiones en el estand conjunto de IA y Ciencia de Datos en Elecomp 2026."
          }
        }
      },
      { src: '/images/gallery/elecomp-1405/ai-ds/5.jpg', alt: 'حضور دکتر آقامحمدی، عضو محترم مجمع تشخیص مصلحت نظام در غرفه مشترک کمیسیون‌های مرتبط با هوش مصنوعی و علم داده در نمایشگاه الکامپ ۱۴۰۵',
        translations: {
          en: {
            caption: "Dr Aghamohammadi, a member of the Expediency Council, visits the shared commissions’ stand at Elecomp 2026."
          },
          es: {
            caption: "El doctor Aghamohammadi, miembro del Consejo de Discernimiento, visita el estand conjunto de las comisiones en Elecomp 2026."
          }
        }
      },
      { src: '/images/gallery/elecomp-1405/ai-ds/6.jpg', alt: 'حضور دکتر آقامحمدی، عضو محترم مجمع تشخیص مصلحت نظام در غرفه مشترک کمیسیون‌های مرتبط با هوش مصنوعی و علم داده در نمایشگاه الکامپ ۱۴۰۵',
        translations: {
          en: {
            caption: "Dr Aghamohammadi, a member of the Expediency Council, visits the shared commissions’ stand at Elecomp 2026."
          },
          es: {
            caption: "El doctor Aghamohammadi, miembro del Consejo de Discernimiento, visita el estand conjunto de las comisiones en Elecomp 2026."
          }
        }
      },
      { src: '/images/gallery/elecomp-1405/ai-ds/7.jpg', alt: 'حضور دکتر تقی‌پور، نماینده محترم مجلس شورای اسلامی در غرفه مشترک کمیسیون‌های مرتبط با هوش مصنوعی و علم داده در نمایشگاه الکامپ ۱۴۰۵',
        translations: {
          en: {
            caption: "Dr Taghipour, a member of parliament, visits the shared commissions’ stand at Elecomp 2026."
          },
          es: {
            caption: "El doctor Taghipour, diputado, visita el estand conjunto de las comisiones en Elecomp 2026."
          }
        }
      },
      { src: '/images/gallery/elecomp-1405/ai-ds/9.jpg', alt: 'حضور دکتر تقی‌پور، نماینده محترم مجلس شورای اسلامی در غرفه مشترک کمیسیون‌های مرتبط با هوش مصنوعی و علم داده در نمایشگاه الکامپ ۱۴۰۵',
        translations: {
          en: {
            caption: "Dr Taghipour, a member of parliament, visits the shared commissions’ stand at Elecomp 2026."
          },
          es: {
            caption: "El doctor Taghipour, diputado, visita el estand conjunto de las comisiones en Elecomp 2026."
          }
        }
      },
      { src: '/images/gallery/elecomp-1405/ai-ds/10.jpg', alt: 'حضور دکتر تقی‌پور، نماینده محترم مجلس شورای اسلامی در غرفه مشترک کمیسیون‌های مرتبط با هوش مصنوعی و علم داده در نمایشگاه الکامپ ۱۴۰۵',
        translations: {
          en: {
            caption: "Dr Taghipour, a member of parliament, visits the shared commissions’ stand at Elecomp 2026."
          },
          es: {
            caption: "El doctor Taghipour, diputado, visita el estand conjunto de las comisiones en Elecomp 2026."
          }
        }
      },
      { src: '/images/gallery/elecomp-1405/ai-ds/11.jpg', alt: 'حضور دکتر تقی‌پور، نماینده محترم مجلس شورای اسلامی در غرفه مشترک کمیسیون‌های مرتبط با هوش مصنوعی و علم داده در نمایشگاه الکامپ ۱۴۰۵',
        translations: {
          en: {
            caption: "Dr Taghipour, a member of parliament, visits the shared commissions’ stand at Elecomp 2026."
          },
          es: {
            caption: "El doctor Taghipour, diputado, visita el estand conjunto de las comisiones en Elecomp 2026."
          }
        }
      },
      { src: '/images/gallery/elecomp-1405/ai-ds/12.jpg', alt: 'حضور دکتر طاهری، نماینده محترم مجلس شورای اسلامی در غرفه مشترک کمیسیون‌های مرتبط با هوش مصنوعی و علم داده در نمایشگاه الکامپ ۱۴۰۵',
        translations: {
          en: {
            caption: "Dr Taheri, a member of parliament, visits the shared commissions’ stand at Elecomp 2026."
          },
          es: {
            caption: "El doctor Taheri, diputado, visita el estand conjunto de las comisiones en Elecomp 2026."
          }
        }
      },
      { src: '/images/gallery/elecomp-1405/ai-ds/13.jpg', alt: 'حضور دکتر طاهری، نماینده محترم مجلس شورای اسلامی در غرفه مشترک کمیسیون‌های مرتبط با هوش مصنوعی و علم داده در نمایشگاه الکامپ ۱۴۰۵',
        translations: {
          en: {
            caption: "Dr Taheri, a member of parliament, visits the shared commissions’ stand at Elecomp 2026."
          },
          es: {
            caption: "El doctor Taheri, diputado, visita el estand conjunto de las comisiones en Elecomp 2026."
          }
        }
      },
      { src: '/images/gallery/elecomp-1405/ai-ds/14.jpg', alt: 'حضور دکتر طاهری، نماینده محترم مجلس شورای اسلامی در غرفه مشترک کمیسیون‌های مرتبط با هوش مصنوعی و علم داده در نمایشگاه الکامپ ۱۴۰۵',
        translations: {
          en: {
            caption: "Dr Taheri, a member of parliament, visits the shared commissions’ stand at Elecomp 2026."
          },
          es: {
            caption: "El doctor Taheri, diputado, visita el estand conjunto de las comisiones en Elecomp 2026."
          }
        }
      },
      { src: '/images/gallery/elecomp-1405/ai-ds/15.jpg', alt: 'حضور دکتر طاهری، نماینده محترم مجلس شورای اسلامی در غرفه مشترک کمیسیون‌های مرتبط با هوش مصنوعی و علم داده در نمایشگاه الکامپ ۱۴۰۵',
        translations: {
          en: {
            caption: "Dr Taheri, a member of parliament, visits the shared commissions’ stand at Elecomp 2026."
          },
          es: {
            caption: "El doctor Taheri, diputado, visita el estand conjunto de las comisiones en Elecomp 2026."
          }
        }
      },
      { src: '/images/gallery/elecomp-1405/ai-ds/16.jpg', alt: 'حضور دکتر طاهری، نماینده محترم مجلس شورای اسلامی در غرفه مشترک کمیسیون‌های مرتبط با هوش مصنوعی و علم داده در نمایشگاه الکامپ ۱۴۰۵',
        translations: {
          en: {
            caption: "Dr Taheri, a member of parliament, visits the shared commissions’ stand at Elecomp 2026."
          },
          es: {
            caption: "El doctor Taheri, diputado, visita el estand conjunto de las comisiones en Elecomp 2026."
          }
        }
      },
      { src: '/images/gallery/elecomp-1405/ai-ds/17.jpg', alt: 'حضور دکتر طاهری، نماینده محترم مجلس شورای اسلامی در غرفه مشترک کمیسیون‌های مرتبط با هوش مصنوعی و علم داده در نمایشگاه الکامپ ۱۴۰۵',
        translations: {
          en: {
            caption: "Dr Taheri, a member of parliament, visits the shared commissions’ stand at Elecomp 2026."
          },
          es: {
            caption: "El doctor Taheri, diputado, visita el estand conjunto de las comisiones en Elecomp 2026."
          }
        }
      },
      { src: '/images/gallery/elecomp-1405/ai-ds/18.jpg', alt: 'حضور دکتر طاهری، نماینده محترم مجلس شورای اسلامی در غرفه مشترک کمیسیون‌های مرتبط با هوش مصنوعی و علم داده در نمایشگاه الکامپ ۱۴۰۵',
        translations: {
          en: {
            caption: "Dr Taheri, a member of parliament, visits the shared commissions’ stand at Elecomp 2026."
          },
          es: {
            caption: "El doctor Taheri, diputado, visita el estand conjunto de las comisiones en Elecomp 2026."
          }
        }
      },
      { src: '/images/gallery/elecomp-1405/ai-ds/19.jpg', alt: 'حضور دکتر طاهری، نماینده محترم مجلس شورای اسلامی در غرفه مشترک کمیسیون‌های مرتبط با هوش مصنوعی و علم داده در نمایشگاه الکامپ ۱۴۰۵',
        translations: {
          en: {
            caption: "Dr Taheri, a member of parliament, visits the shared commissions’ stand at Elecomp 2026."
          },
          es: {
            caption: "El doctor Taheri, diputado, visita el estand conjunto de las comisiones en Elecomp 2026."
          }
        }
      },
      { src: '/images/gallery/elecomp-1405/ai-ds/20.jpg', alt: 'حضور دکتر تقی‌پور، نماینده محترم مجلس شورای اسلامی در غرفه مشترک کمیسیون‌های مرتبط با هوش مصنوعی و علم داده در نمایشگاه الکامپ ۱۴۰۵',
        translations: {
          en: {
            caption: "Dr Taghipour, a member of parliament, visits the shared commissions’ stand at Elecomp 2026."
          },
          es: {
            caption: "El doctor Taghipour, diputado, visita el estand conjunto de las comisiones en Elecomp 2026."
          }
        }
      },
      { src: '/images/gallery/elecomp-1405/ai-ds/21.jpg', alt: 'حضور دکتر تقی‌پور، نماینده محترم مجلس شورای اسلامی در غرفه مشترک کمیسیون‌های مرتبط با هوش مصنوعی و علم داده در نمایشگاه الکامپ ۱۴۰۵',
        translations: {
          en: {
            caption: "Dr Taghipour, a member of parliament, visits the shared commissions’ stand at Elecomp 2026."
          },
          es: {
            caption: "El doctor Taghipour, diputado, visita el estand conjunto de las comisiones en Elecomp 2026."
          }
        }
      },
      { src: '/images/gallery/elecomp-1405/ai-ds/22.jpg', alt: 'حضور دکتر طاهری، نماینده محترم مجلس شورای اسلامی در غرفه مشترک کمیسیون‌های مرتبط با هوش مصنوعی و علم داده در نمایشگاه الکامپ ۱۴۰۵',
        translations: {
          en: {
            caption: "Dr Taheri, a member of parliament, visits the shared commissions’ stand at Elecomp 2026."
          },
          es: {
            caption: "El doctor Taheri, diputado, visita el estand conjunto de las comisiones en Elecomp 2026."
          }
        }
      },
      { src: '/images/gallery/elecomp-1405/ai-ds/23.jpg', alt: 'حضور دکتر طاهری، نماینده محترم مجلس شورای اسلامی در غرفه مشترک کمیسیون‌های مرتبط با هوش مصنوعی و علم داده در نمایشگاه الکامپ ۱۴۰۵',
        translations: {
          en: {
            caption: "Dr Taheri, a member of parliament, visits the shared commissions’ stand at Elecomp 2026."
          },
          es: {
            caption: "El doctor Taheri, diputado, visita el estand conjunto de las comisiones en Elecomp 2026."
          }
        }
      },
      { src: '/images/gallery/elecomp-1405/ai-ds/24.jpg', alt: 'حضور دکتر طاهری، نماینده محترم مجلس شورای اسلامی در غرفه مشترک کمیسیون‌های مرتبط با هوش مصنوعی و علم داده در نمایشگاه الکامپ ۱۴۰۵',
        translations: {
          en: {
            caption: "Dr Taheri, a member of parliament, visits the shared commissions’ stand at Elecomp 2026."
          },
          es: {
            caption: "El doctor Taheri, diputado, visita el estand conjunto de las comisiones en Elecomp 2026."
          }
        }
      },
      { src: '/images/gallery/elecomp-1405/ai-ds/25.jpg', alt: 'حضور دکتر طاهری، نماینده محترم مجلس شورای اسلامی در غرفه مشترک کمیسیون‌های مرتبط با هوش مصنوعی و علم داده در نمایشگاه الکامپ ۱۴۰۵',
        translations: {
          en: {
            caption: "Dr Taheri, a member of parliament, visits the shared commissions’ stand at Elecomp 2026."
          },
          es: {
            caption: "El doctor Taheri, diputado, visita el estand conjunto de las comisiones en Elecomp 2026."
          }
        }
      },
      { src: '/images/gallery/elecomp-1405/ai-ds/26.jpg', alt: 'حضور دکتر طاهری، نماینده محترم مجلس شورای اسلامی در غرفه مشترک کمیسیون‌های مرتبط با هوش مصنوعی و علم داده در نمایشگاه الکامپ ۱۴۰۵',
        translations: {
          en: {
            caption: "Dr Taheri, a member of parliament, visits the shared commissions’ stand at Elecomp 2026."
          },
          es: {
            caption: "El doctor Taheri, diputado, visita el estand conjunto de las comisiones en Elecomp 2026."
          }
        }
      },
      { src: '/images/gallery/elecomp-1405/ai-ds/27.jpg', alt: 'حضور دکتر طاهری، نماینده محترم مجلس شورای اسلامی در غرفه مشترک کمیسیون‌های مرتبط با هوش مصنوعی و علم داده در نمایشگاه الکامپ ۱۴۰۵',
        translations: {
          en: {
            caption: "Dr Taheri, a member of parliament, visits the shared commissions’ stand at Elecomp 2026."
          },
          es: {
            caption: "El doctor Taheri, diputado, visita el estand conjunto de las comisiones en Elecomp 2026."
          }
        }
      },
      { src: '/images/gallery/elecomp-1405/ai-ds/28.jpg', alt: 'حضور دکتر طاهری، نماینده محترم مجلس شورای اسلامی در غرفه مشترک کمیسیون‌های مرتبط با هوش مصنوعی و علم داده در نمایشگاه الکامپ ۱۴۰۵',
        translations: {
          en: {
            caption: "Dr Taheri, a member of parliament, visits the shared commissions’ stand at Elecomp 2026."
          },
          es: {
            caption: "El doctor Taheri, diputado, visita el estand conjunto de las comisiones en Elecomp 2026."
          }
        }
      },
      { src: '/images/gallery/elecomp-1405/ai-ds/29.jpg', alt: 'حضور دکتر طاهری، نماینده محترم مجلس شورای اسلامی در غرفه مشترک کمیسیون‌های مرتبط با هوش مصنوعی و علم داده در نمایشگاه الکامپ ۱۴۰۵',
        translations: {
          en: {
            caption: "Dr Taheri, a member of parliament, visits the shared commissions’ stand at Elecomp 2026."
          },
          es: {
            caption: "El doctor Taheri, diputado, visita el estand conjunto de las comisiones en Elecomp 2026."
          }
        }
      },
      { src: '/images/gallery/elecomp-1405/ai-ds/30.jpg', alt: 'حضور دکتر تقی‌پور، نماینده محترم مجلس شورای اسلامی در غرفه مشترک کمیسیون‌های مرتبط با هوش مصنوعی و علم داده در نمایشگاه الکامپ ۱۴۰۵',
        translations: {
          en: {
            caption: "Dr Taghipour, a member of parliament, visits the shared commissions’ stand at Elecomp 2026."
          },
          es: {
            caption: "El doctor Taghipour, diputado, visita el estand conjunto de las comisiones en Elecomp 2026."
          }
        }
      },
      { src: '/images/gallery/elecomp-1405/ai-ds/31.jpg', alt: 'حضور دکتر تقی‌پور، نماینده محترم مجلس شورای اسلامی در غرفه مشترک کمیسیون‌های مرتبط با هوش مصنوعی و علم داده در نمایشگاه الکامپ ۱۴۰۵',
        translations: {
          en: {
            caption: "Dr Taghipour, a member of parliament, visits the shared commissions’ stand at Elecomp 2026."
          },
          es: {
            caption: "El doctor Taghipour, diputado, visita el estand conjunto de las comisiones en Elecomp 2026."
          }
        }
      },
      { src: '/images/gallery/elecomp-1405/ai-ds/32.jpg', alt: 'حضور دکتر طاهری، نماینده محترم مجلس شورای اسلامی در غرفه مشترک کمیسیون‌های مرتبط با هوش مصنوعی و علم داده در نمایشگاه الکامپ ۱۴۰۵',
        translations: {
          en: {
            caption: "Dr Taheri, a member of parliament, visits the shared commissions’ stand at Elecomp 2026."
          },
          es: {
            caption: "El doctor Taheri, diputado, visita el estand conjunto de las comisiones en Elecomp 2026."
          }
        }
      },
      { src: '/images/gallery/elecomp-1405/ai-ds/33.jpg', alt: 'حضور دکتر طاهری، نماینده محترم مجلس شورای اسلامی در غرفه مشترک کمیسیون‌های مرتبط با هوش مصنوعی و علم داده در نمایشگاه الکامپ ۱۴۰۵',
        translations: {
          en: {
            caption: "Dr Taheri, a member of parliament, visits the shared commissions’ stand at Elecomp 2026."
          },
          es: {
            caption: "El doctor Taheri, diputado, visita el estand conjunto de las comisiones en Elecomp 2026."
          }
        }
      },
      { src: '/images/gallery/elecomp-1405/ai-ds/34.jpg', alt: 'حضور دکتر طاهری، نماینده محترم مجلس شورای اسلامی در غرفه مشترک کمیسیون‌های مرتبط با هوش مصنوعی و علم داده در نمایشگاه الکامپ ۱۴۰۵',
        translations: {
          en: {
            caption: "Dr Taheri, a member of parliament, visits the shared commissions’ stand at Elecomp 2026."
          },
          es: {
            caption: "El doctor Taheri, diputado, visita el estand conjunto de las comisiones en Elecomp 2026."
          }
        }
      },
      { src: '/images/gallery/elecomp-1405/ai-ds/35.jpg', alt: 'حضور دکتر طاهری، نماینده محترم مجلس شورای اسلامی در غرفه مشترک کمیسیون‌های مرتبط با هوش مصنوعی و علم داده در نمایشگاه الکامپ ۱۴۰۵',
        translations: {
          en: {
            caption: "Dr Taheri, a member of parliament, visits the shared commissions’ stand at Elecomp 2026."
          },
          es: {
            caption: "El doctor Taheri, diputado, visita el estand conjunto de las comisiones en Elecomp 2026."
          }
        }
      },
      { src: '/images/gallery/elecomp-1405/ai-ds/36.jpg', alt: 'حضور دکتر طاهری، نماینده محترم مجلس شورای اسلامی در غرفه مشترک کمیسیون‌های مرتبط با هوش مصنوعی و علم داده در نمایشگاه الکامپ ۱۴۰۵',
        translations: {
          en: {
            caption: "Dr Taheri, a member of parliament, visits the shared commissions’ stand at Elecomp 2026."
          },
          es: {
            caption: "El doctor Taheri, diputado, visita el estand conjunto de las comisiones en Elecomp 2026."
          }
        }
      },
      { src: '/images/gallery/elecomp-1405/ai-ds/37.jpg', alt: 'حضور دکتر طاهری، نماینده محترم مجلس شورای اسلامی در غرفه مشترک کمیسیون‌های مرتبط با هوش مصنوعی و علم داده در نمایشگاه الکامپ ۱۴۰۵',
        translations: {
          en: {
            caption: "Dr Taheri, a member of parliament, visits the shared commissions’ stand at Elecomp 2026."
          },
          es: {
            caption: "El doctor Taheri, diputado, visita el estand conjunto de las comisiones en Elecomp 2026."
          }
        }
      },
      { src: '/images/gallery/elecomp-1405/ai-ds/38.jpg', alt: 'حضور دکتر طاهری، نماینده محترم مجلس شورای اسلامی در غرفه مشترک کمیسیون‌های مرتبط با هوش مصنوعی و علم داده در نمایشگاه الکامپ ۱۴۰۵',
        translations: {
          en: {
            caption: "Dr Taheri, a member of parliament, visits the shared commissions’ stand at Elecomp 2026."
          },
          es: {
            caption: "El doctor Taheri, diputado, visita el estand conjunto de las comisiones en Elecomp 2026."
          }
        }
      },
      { src: '/images/gallery/elecomp-1405/ai-ds/39.jpg', alt: 'حضور دکتر طاهری، نماینده محترم مجلس شورای اسلامی در غرفه مشترک کمیسیون‌های مرتبط با هوش مصنوعی و علم داده در نمایشگاه الکامپ ۱۴۰۵',
        translations: {
          en: {
            caption: "Dr Taheri, a member of parliament, visits the shared commissions’ stand at Elecomp 2026."
          },
          es: {
            caption: "El doctor Taheri, diputado, visita el estand conjunto de las comisiones en Elecomp 2026."
          }
        }
      },
      { src: '/images/gallery/elecomp-1405/ai-ds/40.jpg', alt: 'حضور دکتر تقی‌پور، نماینده محترم مجلس شورای اسلامی در غرفه مشترک کمیسیون‌های مرتبط با هوش مصنوعی و علم داده در نمایشگاه الکامپ ۱۴۰۵',
        translations: {
          en: {
            caption: "Dr Taghipour, a member of parliament, visits the shared commissions’ stand at Elecomp 2026."
          },
          es: {
            caption: "El doctor Taghipour, diputado, visita el estand conjunto de las comisiones en Elecomp 2026."
          }
        }
      },
      { src: '/images/gallery/elecomp-1405/ai-ds/41.jpg', alt: 'حضور دکتر تقی‌پور، نماینده محترم مجلس شورای اسلامی در غرفه مشترک کمیسیون‌های مرتبط با هوش مصنوعی و علم داده در نمایشگاه الکامپ ۱۴۰۵',
        translations: {
          en: {
            caption: "Dr Taghipour, a member of parliament, visits the shared commissions’ stand at Elecomp 2026."
          },
          es: {
            caption: "El doctor Taghipour, diputado, visita el estand conjunto de las comisiones en Elecomp 2026."
          }
        }
      },
    ],
    translations: {
      en: {
        title: "Elecomp 2026",
        caption: "The shared stand of the AI and Data Science, Internet of Things, and Smart City commissions at Elecomp 2026."
      },
      es: {
        title: "Elecomp 2026",
        caption: "Estand conjunto de las comisiones de IA y Ciencia de Datos, Internet de las Cosas y Ciudad Inteligente en Elecomp 2026."
      }
    }
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
        translations: {
          en: {
            caption: "Signing a cooperation agreement between the AI Scientific Association and Saba Business Development University at the Hoomas stand."
          },
          es: {
            caption: "Firma de un acuerdo de colaboración entre la Asociación Científica de IA y la Universidad de Desarrollo Empresarial Saba en el estand de Hoomas."
          }
        }
      }
    ],
    translations: {
      en: {
        title: "Signing a cooperation agreement",
        caption: "Signing a cooperation agreement between the AI Scientific Association and Saba Business Development University at the Hoomas stand."
      },
      es: {
        title: "Firma de un acuerdo de colaboración",
        caption: "Firma de un acuerdo de colaboración entre la Asociación Científica de IA y la Universidad de Desarrollo Empresarial Saba en el estand de Hoomas."
      }
    }
  }, {
    id: 'elecomp-1405-ai-blockchain',
    title: 'عقد تفاهمنامه همکاری',
    caption: 'عقد تفاهم‌نامه همکاری بین انجمن علمی هوش مصنوعی و انجمن بلاکچین در غرفه هومص',
    date: '2026-09-03',
    faDate: ' شهریور ۱۴۰۵',
    images: [
      {
        src: '/images/gallery/elecomp-1405/anjoman/2.jpeg',
        alt: 'عقد تفاهم‌نامه همکاری بین انجمن علمی هوش مصنوعی و انجمن بلاکچین در غرفه هومص',
        translations: {
          en: {
            caption: "Signing a cooperation agreement between the AI Scientific Association and the Blockchain Association at the Hoomas stand."
          },
          es: {
            caption: "Firma de un acuerdo de colaboración entre la Asociación Científica de IA y la Asociación de Blockchain en el estand de Hoomas."
          }
        }
      }
    ],
    translations: {
      en: {
        title: "Signing a cooperation agreement",
        caption: "Signing a cooperation agreement between the AI Scientific Association and the Blockchain Association at the Hoomas stand."
      },
      es: {
        title: "Firma de un acuerdo de colaboración",
        caption: "Firma de un acuerdo de colaboración entre la Asociación Científica de IA y la Asociación de Blockchain en el estand de Hoomas."
      }
    }
  }, {
    id: 'inotex-1405',
    title: 'رویداد اینوتکس ۱۴۰۵',
    caption: 'حضور در پنل تخصصی و میز تسهیل‌گری در مرکز نوآوری قوه مقننه در رویداد اینوتکس ۱۴۰۵',
    date: '2026-09-04',
    faDate: ' شهریور ۱۴۰۵',
    images: [
      {
        src: '/images/gallery/elecomp-1405/inotex/1.jpg',
        alt: 'پنل تخصصی در حوزه قانون جهش دانش‌بنیان',
        translations: {
          en: {
            caption: "Expert panel on the Knowledge-Based Production Leap Law."
          },
          es: {
            caption: "Mesa de expertos sobre la ley de impulso a la producción basada en el conocimiento."
          }
        }
      },
      {
        src: '/images/gallery/elecomp-1405/inotex/2.jpg',
        alt: 'پنل تخصصی در حوزه حکمرانی',
        translations: {
          en: {
            caption: "Expert panel on governance."
          },
          es: {
            caption: "Mesa de expertos sobre gobernanza."
          }
        }
      },
      {
        src: '/images/gallery/elecomp-1405/inotex/3.jpg',
        alt: 'میز تسهیل‌گری در مرکز نوآوری قوه مقننه',
        translations: {
          en: {
            caption: "Business support desk at the Legislative Innovation Center."
          },
          es: {
            caption: "Espacio de apoyo empresarial en el Centro de Innovación Legislativa."
          }
        }
      },
      {
        src: '/images/gallery/elecomp-1405/inotex/4.jpg',
        alt: 'میز تسهیل‌گری در مرکز نوآوری قوه مقننه',
        translations: {
          en: {
            caption: "Business support desk at the Legislative Innovation Center."
          },
          es: {
            caption: "Espacio de apoyo empresarial en el Centro de Innovación Legislativa."
          }
        }
      }
    ],
    translations: {
      en: {
        title: "Inotex 2026",
        caption: "Taking part in an expert panel and a business support desk at the Legislative Innovation Center during Inotex 2026."
      },
      es: {
        title: "Inotex 2026",
        caption: "Participación en una mesa de expertos y un espacio de apoyo empresarial del Centro de Innovación Legislativa durante Inotex 2026."
      }
    }
  },
  {
    id: 'elecomp-1405-ai-commision-national',
    title: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور ',
    caption: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده سازمان نظام صنفی رایانه‌ای کشور به میزبانی کمیسیون هوش مصنوعی و علم داده نصر تهران در نمایشگاه الکامپ ۱۴۰۵ در غرفه هومص',
    date: '2026-09-01',
    faDate: '۱۰ شهریور ۱۴۰۵',
    images: [
      { src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-1.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵',
        translations: {
          en: {
            caption: "First in-person meeting of the national ICT Guild’s AI and Data Science Commission at Elecomp 2026."
          },
          es: {
            caption: "Primera reunión presencial de la Comisión de IA y Ciencia de Datos del gremio nacional de TIC en Elecomp 2026."
          }
        }
      },
      { src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-2.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵',
        translations: {
          en: {
            caption: "First in-person meeting of the national ICT Guild’s AI and Data Science Commission at Elecomp 2026."
          },
          es: {
            caption: "Primera reunión presencial de la Comisión de IA y Ciencia de Datos del gremio nacional de TIC en Elecomp 2026."
          }
        }
      },
      { src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-3.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵',
        translations: {
          en: {
            caption: "First in-person meeting of the national ICT Guild’s AI and Data Science Commission at Elecomp 2026."
          },
          es: {
            caption: "Primera reunión presencial de la Comisión de IA y Ciencia de Datos del gremio nacional de TIC en Elecomp 2026."
          }
        }
      },
      { src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-4.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵',
        translations: {
          en: {
            caption: "First in-person meeting of the national ICT Guild’s AI and Data Science Commission at Elecomp 2026."
          },
          es: {
            caption: "Primera reunión presencial de la Comisión de IA y Ciencia de Datos del gremio nacional de TIC en Elecomp 2026."
          }
        }
      },
      { src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-5.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵',
        translations: {
          en: {
            caption: "First in-person meeting of the national ICT Guild’s AI and Data Science Commission at Elecomp 2026."
          },
          es: {
            caption: "Primera reunión presencial de la Comisión de IA y Ciencia de Datos del gremio nacional de TIC en Elecomp 2026."
          }
        }
      },
      { src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-6.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵',
        translations: {
          en: {
            caption: "First in-person meeting of the national ICT Guild’s AI and Data Science Commission at Elecomp 2026."
          },
          es: {
            caption: "Primera reunión presencial de la Comisión de IA y Ciencia de Datos del gremio nacional de TIC en Elecomp 2026."
          }
        }
      },
      { src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-7.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵',
        translations: {
          en: {
            caption: "First in-person meeting of the national ICT Guild’s AI and Data Science Commission at Elecomp 2026."
          },
          es: {
            caption: "Primera reunión presencial de la Comisión de IA y Ciencia de Datos del gremio nacional de TIC en Elecomp 2026."
          }
        }
      },
      { src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-8.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵',
        translations: {
          en: {
            caption: "First in-person meeting of the national ICT Guild’s AI and Data Science Commission at Elecomp 2026."
          },
          es: {
            caption: "Primera reunión presencial de la Comisión de IA y Ciencia de Datos del gremio nacional de TIC en Elecomp 2026."
          }
        }
      },
      { src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-9.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵',
        translations: {
          en: {
            caption: "First in-person meeting of the national ICT Guild’s AI and Data Science Commission at Elecomp 2026."
          },
          es: {
            caption: "Primera reunión presencial de la Comisión de IA y Ciencia de Datos del gremio nacional de TIC en Elecomp 2026."
          }
        }
      },
      { src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-10.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵',
        translations: {
          en: {
            caption: "First in-person meeting of the national ICT Guild’s AI and Data Science Commission at Elecomp 2026."
          },
          es: {
            caption: "Primera reunión presencial de la Comisión de IA y Ciencia de Datos del gremio nacional de TIC en Elecomp 2026."
          }
        }
      },
      { src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-11.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵',
        translations: {
          en: {
            caption: "First in-person meeting of the national ICT Guild’s AI and Data Science Commission at Elecomp 2026."
          },
          es: {
            caption: "Primera reunión presencial de la Comisión de IA y Ciencia de Datos del gremio nacional de TIC en Elecomp 2026."
          }
        }
      },
      { src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-12.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵',
        translations: {
          en: {
            caption: "First in-person meeting of the national ICT Guild’s AI and Data Science Commission at Elecomp 2026."
          },
          es: {
            caption: "Primera reunión presencial de la Comisión de IA y Ciencia de Datos del gremio nacional de TIC en Elecomp 2026."
          }
        }
      },
      { src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-13.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵',
        translations: {
          en: {
            caption: "First in-person meeting of the national ICT Guild’s AI and Data Science Commission at Elecomp 2026."
          },
          es: {
            caption: "Primera reunión presencial de la Comisión de IA y Ciencia de Datos del gremio nacional de TIC en Elecomp 2026."
          }
        }
      },
      { src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-14.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵',
        translations: {
          en: {
            caption: "First in-person meeting of the national ICT Guild’s AI and Data Science Commission at Elecomp 2026."
          },
          es: {
            caption: "Primera reunión presencial de la Comisión de IA y Ciencia de Datos del gremio nacional de TIC en Elecomp 2026."
          }
        }
      },
      { src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-15.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵',
        translations: {
          en: {
            caption: "First in-person meeting of the national ICT Guild’s AI and Data Science Commission at Elecomp 2026."
          },
          es: {
            caption: "Primera reunión presencial de la Comisión de IA y Ciencia de Datos del gremio nacional de TIC en Elecomp 2026."
          }
        }
      },
      { src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-16.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵',
        translations: {
          en: {
            caption: "First in-person meeting of the national ICT Guild’s AI and Data Science Commission at Elecomp 2026."
          },
          es: {
            caption: "Primera reunión presencial de la Comisión de IA y Ciencia de Datos del gremio nacional de TIC en Elecomp 2026."
          }
        }
      },
      { src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-17.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵',
        translations: {
          en: {
            caption: "First in-person meeting of the national ICT Guild’s AI and Data Science Commission at Elecomp 2026."
          },
          es: {
            caption: "Primera reunión presencial de la Comisión de IA y Ciencia de Datos del gremio nacional de TIC en Elecomp 2026."
          }
        }
      },
      { src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-18.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵',
        translations: {
          en: {
            caption: "First in-person meeting of the national ICT Guild’s AI and Data Science Commission at Elecomp 2026."
          },
          es: {
            caption: "Primera reunión presencial de la Comisión de IA y Ciencia de Datos del gremio nacional de TIC en Elecomp 2026."
          }
        }
      },
      { src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-19.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵',
        translations: {
          en: {
            caption: "First in-person meeting of the national ICT Guild’s AI and Data Science Commission at Elecomp 2026."
          },
          es: {
            caption: "Primera reunión presencial de la Comisión de IA y Ciencia de Datos del gremio nacional de TIC en Elecomp 2026."
          }
        }
      },
      { src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-20.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵',
        translations: {
          en: {
            caption: "First in-person meeting of the national ICT Guild’s AI and Data Science Commission at Elecomp 2026."
          },
          es: {
            caption: "Primera reunión presencial de la Comisión de IA y Ciencia de Datos del gremio nacional de TIC en Elecomp 2026."
          }
        }
      },
      { src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-21.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵',
        translations: {
          en: {
            caption: "First in-person meeting of the national ICT Guild’s AI and Data Science Commission at Elecomp 2026."
          },
          es: {
            caption: "Primera reunión presencial de la Comisión de IA y Ciencia de Datos del gremio nacional de TIC en Elecomp 2026."
          }
        }
      },
      { src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-22.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵',
        translations: {
          en: {
            caption: "First in-person meeting of the national ICT Guild’s AI and Data Science Commission at Elecomp 2026."
          },
          es: {
            caption: "Primera reunión presencial de la Comisión de IA y Ciencia de Datos del gremio nacional de TIC en Elecomp 2026."
          }
        }
      },
      { src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-23.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵',
        translations: {
          en: {
            caption: "First in-person meeting of the national ICT Guild’s AI and Data Science Commission at Elecomp 2026."
          },
          es: {
            caption: "Primera reunión presencial de la Comisión de IA y Ciencia de Datos del gremio nacional de TIC en Elecomp 2026."
          }
        }
      },
      { src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-24.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵',
        translations: {
          en: {
            caption: "First in-person meeting of the national ICT Guild’s AI and Data Science Commission at Elecomp 2026."
          },
          es: {
            caption: "Primera reunión presencial de la Comisión de IA y Ciencia de Datos del gremio nacional de TIC en Elecomp 2026."
          }
        }
      },
      { src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-25.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵',
        translations: {
          en: {
            caption: "First in-person meeting of the national ICT Guild’s AI and Data Science Commission at Elecomp 2026."
          },
          es: {
            caption: "Primera reunión presencial de la Comisión de IA y Ciencia de Datos del gremio nacional de TIC en Elecomp 2026."
          }
        }
      },
      { src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-26.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵',
        translations: {
          en: {
            caption: "First in-person meeting of the national ICT Guild’s AI and Data Science Commission at Elecomp 2026."
          },
          es: {
            caption: "Primera reunión presencial de la Comisión de IA y Ciencia de Datos del gremio nacional de TIC en Elecomp 2026."
          }
        }
      },
      { src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-27.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵',
        translations: {
          en: {
            caption: "First in-person meeting of the national ICT Guild’s AI and Data Science Commission at Elecomp 2026."
          },
          es: {
            caption: "Primera reunión presencial de la Comisión de IA y Ciencia de Datos del gremio nacional de TIC en Elecomp 2026."
          }
        }
      },
      { src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-28.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵',
        translations: {
          en: {
            caption: "First in-person meeting of the national ICT Guild’s AI and Data Science Commission at Elecomp 2026."
          },
          es: {
            caption: "Primera reunión presencial de la Comisión de IA y Ciencia de Datos del gremio nacional de TIC en Elecomp 2026."
          }
        }
      },
      { src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-29.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵',
        translations: {
          en: {
            caption: "First in-person meeting of the national ICT Guild’s AI and Data Science Commission at Elecomp 2026."
          },
          es: {
            caption: "Primera reunión presencial de la Comisión de IA y Ciencia de Datos del gremio nacional de TIC en Elecomp 2026."
          }
        }
      },
      { src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-30.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵',
        translations: {
          en: {
            caption: "First in-person meeting of the national ICT Guild’s AI and Data Science Commission at Elecomp 2026."
          },
          es: {
            caption: "Primera reunión presencial de la Comisión de IA y Ciencia de Datos del gremio nacional de TIC en Elecomp 2026."
          }
        }
      },
      { src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-31.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵',
        translations: {
          en: {
            caption: "First in-person meeting of the national ICT Guild’s AI and Data Science Commission at Elecomp 2026."
          },
          es: {
            caption: "Primera reunión presencial de la Comisión de IA y Ciencia de Datos del gremio nacional de TIC en Elecomp 2026."
          }
        }
      },
      { src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-32.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵',
        translations: {
          en: {
            caption: "First in-person meeting of the national ICT Guild’s AI and Data Science Commission at Elecomp 2026."
          },
          es: {
            caption: "Primera reunión presencial de la Comisión de IA y Ciencia de Datos del gremio nacional de TIC en Elecomp 2026."
          }
        }
      },
      { src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-33.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵',
        translations: {
          en: {
            caption: "First in-person meeting of the national ICT Guild’s AI and Data Science Commission at Elecomp 2026."
          },
          es: {
            caption: "Primera reunión presencial de la Comisión de IA y Ciencia de Datos del gremio nacional de TIC en Elecomp 2026."
          }
        }
      },
      { src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-34.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵',
        translations: {
          en: {
            caption: "First in-person meeting of the national ICT Guild’s AI and Data Science Commission at Elecomp 2026."
          },
          es: {
            caption: "Primera reunión presencial de la Comisión de IA y Ciencia de Datos del gremio nacional de TIC en Elecomp 2026."
          }
        }
      },
      { src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-35.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵',
        translations: {
          en: {
            caption: "First in-person meeting of the national ICT Guild’s AI and Data Science Commission at Elecomp 2026."
          },
          es: {
            caption: "Primera reunión presencial de la Comisión de IA y Ciencia de Datos del gremio nacional de TIC en Elecomp 2026."
          }
        }
      },
      { src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-36.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵',
        translations: {
          en: {
            caption: "First in-person meeting of the national ICT Guild’s AI and Data Science Commission at Elecomp 2026."
          },
          es: {
            caption: "Primera reunión presencial de la Comisión de IA y Ciencia de Datos del gremio nacional de TIC en Elecomp 2026."
          }
        }
      },
      { src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-37.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵',
        translations: {
          en: {
            caption: "First in-person meeting of the national ICT Guild’s AI and Data Science Commission at Elecomp 2026."
          },
          es: {
            caption: "Primera reunión presencial de la Comisión de IA y Ciencia de Datos del gremio nacional de TIC en Elecomp 2026."
          }
        }
      },
      { src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-38.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵',
        translations: {
          en: {
            caption: "First in-person meeting of the national ICT Guild’s AI and Data Science Commission at Elecomp 2026."
          },
          es: {
            caption: "Primera reunión presencial de la Comisión de IA y Ciencia de Datos del gremio nacional de TIC en Elecomp 2026."
          }
        }
      },
      { src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-39.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵',
        translations: {
          en: {
            caption: "First in-person meeting of the national ICT Guild’s AI and Data Science Commission at Elecomp 2026."
          },
          es: {
            caption: "Primera reunión presencial de la Comisión de IA y Ciencia de Datos del gremio nacional de TIC en Elecomp 2026."
          }
        }
      },
      { src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-40.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵',
        translations: {
          en: {
            caption: "First in-person meeting of the national ICT Guild’s AI and Data Science Commission at Elecomp 2026."
          },
          es: {
            caption: "Primera reunión presencial de la Comisión de IA y Ciencia de Datos del gremio nacional de TIC en Elecomp 2026."
          }
        }
      },
      { src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-41.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵',
        translations: {
          en: {
            caption: "First in-person meeting of the national ICT Guild’s AI and Data Science Commission at Elecomp 2026."
          },
          es: {
            caption: "Primera reunión presencial de la Comisión de IA y Ciencia de Datos del gremio nacional de TIC en Elecomp 2026."
          }
        }
      },
      { src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-42.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵',
        translations: {
          en: {
            caption: "First in-person meeting of the national ICT Guild’s AI and Data Science Commission at Elecomp 2026."
          },
          es: {
            caption: "Primera reunión presencial de la Comisión de IA y Ciencia de Datos del gremio nacional de TIC en Elecomp 2026."
          }
        }
      },
      { src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-43.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵',
        translations: {
          en: {
            caption: "First in-person meeting of the national ICT Guild’s AI and Data Science Commission at Elecomp 2026."
          },
          es: {
            caption: "Primera reunión presencial de la Comisión de IA y Ciencia de Datos del gremio nacional de TIC en Elecomp 2026."
          }
        }
      },
      { src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-44.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵',
        translations: {
          en: {
            caption: "First in-person meeting of the national ICT Guild’s AI and Data Science Commission at Elecomp 2026."
          },
          es: {
            caption: "Primera reunión presencial de la Comisión de IA y Ciencia de Datos del gremio nacional de TIC en Elecomp 2026."
          }
        }
      },
      { src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-45.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵',
        translations: {
          en: {
            caption: "First in-person meeting of the national ICT Guild’s AI and Data Science Commission at Elecomp 2026."
          },
          es: {
            caption: "Primera reunión presencial de la Comisión de IA y Ciencia de Datos del gremio nacional de TIC en Elecomp 2026."
          }
        }
      },
      { src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-46.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵',
        translations: {
          en: {
            caption: "First in-person meeting of the national ICT Guild’s AI and Data Science Commission at Elecomp 2026."
          },
          es: {
            caption: "Primera reunión presencial de la Comisión de IA y Ciencia de Datos del gremio nacional de TIC en Elecomp 2026."
          }
        }
      },
      { src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-47.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵',
        translations: {
          en: {
            caption: "First in-person meeting of the national ICT Guild’s AI and Data Science Commission at Elecomp 2026."
          },
          es: {
            caption: "Primera reunión presencial de la Comisión de IA y Ciencia de Datos del gremio nacional de TIC en Elecomp 2026."
          }
        }
      },
      { src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-48.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵',
        translations: {
          en: {
            caption: "First in-person meeting of the national ICT Guild’s AI and Data Science Commission at Elecomp 2026."
          },
          es: {
            caption: "Primera reunión presencial de la Comisión de IA y Ciencia de Datos del gremio nacional de TIC en Elecomp 2026."
          }
        }
      },
      { src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-49.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵',
        translations: {
          en: {
            caption: "First in-person meeting of the national ICT Guild’s AI and Data Science Commission at Elecomp 2026."
          },
          es: {
            caption: "Primera reunión presencial de la Comisión de IA y Ciencia de Datos del gremio nacional de TIC en Elecomp 2026."
          }
        }
      },
      { src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-50.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵',
        translations: {
          en: {
            caption: "First in-person meeting of the national ICT Guild’s AI and Data Science Commission at Elecomp 2026."
          },
          es: {
            caption: "Primera reunión presencial de la Comisión de IA y Ciencia de Datos del gremio nacional de TIC en Elecomp 2026."
          }
        }
      },
      { src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-51.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵',
        translations: {
          en: {
            caption: "First in-person meeting of the national ICT Guild’s AI and Data Science Commission at Elecomp 2026."
          },
          es: {
            caption: "Primera reunión presencial de la Comisión de IA y Ciencia de Datos del gremio nacional de TIC en Elecomp 2026."
          }
        }
      },
      { src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-52.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵',
        translations: {
          en: {
            caption: "First in-person meeting of the national ICT Guild’s AI and Data Science Commission at Elecomp 2026."
          },
          es: {
            caption: "Primera reunión presencial de la Comisión de IA y Ciencia de Datos del gremio nacional de TIC en Elecomp 2026."
          }
        }
      },
      { src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-53.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵',
        translations: {
          en: {
            caption: "First in-person meeting of the national ICT Guild’s AI and Data Science Commission at Elecomp 2026."
          },
          es: {
            caption: "Primera reunión presencial de la Comisión de IA y Ciencia de Datos del gremio nacional de TIC en Elecomp 2026."
          }
        }
      },
      { src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-54.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵',
        translations: {
          en: {
            caption: "First in-person meeting of the national ICT Guild’s AI and Data Science Commission at Elecomp 2026."
          },
          es: {
            caption: "Primera reunión presencial de la Comisión de IA y Ciencia de Datos del gremio nacional de TIC en Elecomp 2026."
          }
        }
      },
      { src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-55.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵',
        translations: {
          en: {
            caption: "First in-person meeting of the national ICT Guild’s AI and Data Science Commission at Elecomp 2026."
          },
          es: {
            caption: "Primera reunión presencial de la Comisión de IA y Ciencia de Datos del gremio nacional de TIC en Elecomp 2026."
          }
        }
      },
      { src: '/images/gallery/elecomp-1405/nsr/elecomp-1405-56.jpg', alt: 'اولین نشست حضوری کمیسیون هوش مصنوعی و علم داده نصر کشور در نمایشگاه الکامپ ۱۴۰۵',
        translations: {
          en: {
            caption: "First in-person meeting of the national ICT Guild’s AI and Data Science Commission at Elecomp 2026."
          },
          es: {
            caption: "Primera reunión presencial de la Comisión de IA y Ciencia de Datos del gremio nacional de TIC en Elecomp 2026."
          }
        }
      }
    ],
    translations: {
      en: {
        title: "First in-person meeting of the national AI and Data Science Commission",
        caption: "The first in-person meeting of the national ICT Guild’s AI and Data Science Commission, hosted by its Tehran counterpart at the Hoomas stand during Elecomp 2026."
      },
      es: {
        title: "Primera reunión presencial de la Comisión Nacional de IA y Ciencia de Datos",
        caption: "Primera reunión presencial de la Comisión de IA y Ciencia de Datos del gremio nacional de TIC, organizada por la comisión de Teherán en el estand de Hoomas durante Elecomp 2026."
      }
    }
  },
  {
    id: 'ai-governance-1405',
    title: 'پنل تخصصی',
    caption: 'بررسی ساختار حکمرانی هوش مصنوعی در کشور',
    date: '2026-09-06',
    faDate: ' شهریور ۱۴۰۵',
    images: [
      { src: '/images/gallery/1405/06/andishe/خانه اندیشه‌ورزان-3.jpg', alt: 'پوستر پنل تخصصی بررسی ساختار حکمرانی هوش مصنوعی در کشور',
        translations: {
          en: {
            caption: "Poster for the panel on the structure of AI governance in Iran."
          },
          es: {
            caption: "Cartel de la mesa sobre la estructura de gobernanza de la IA en Irán."
          }
        }
      },
      { src: '/images/gallery/1405/06/andishe/4.jpg', alt: 'حضار پنل تخصصی بررسی ساختار حکمرانی هوش مصنوعی در کشور',
        translations: {
          en: {
            caption: "Participants at the panel on the structure of AI governance in Iran."
          },
          es: {
            caption: "Asistentes a la mesa sobre la estructura de gobernanza de la IA en Irán."
          }
        }
      },
      { src: '/images/gallery/1405/06/andishe/5.jpg', alt: 'حضار پنل تخصصی بررسی ساختار حکمرانی هوش مصنوعی در کشور',
        translations: {
          en: {
            caption: "Participants at the panel on the structure of AI governance in Iran."
          },
          es: {
            caption: "Asistentes a la mesa sobre la estructura de gobernanza de la IA en Irán."
          }
        }
      },
      { src: '/images/gallery/1405/06/andishe/خانه اندیشه‌ورزان-2.png', alt: 'حضار پنل تخصصی بررسی ساختار حکمرانی هوش مصنوعی در کشور',
        translations: {
          en: {
            caption: "Participants at the panel on the structure of AI governance in Iran."
          },
          es: {
            caption: "Asistentes a la mesa sobre la estructura de gobernanza de la IA en Irán."
          }
        }
      },
      { src: '/images/gallery/1405/06/andishe/خانه اندیشه‌ورزان-1.png', alt: 'حضار پنل تخصصی بررسی ساختار حکمرانی هوش مصنوعی در کشور',
        translations: {
          en: {
            caption: "Participants at the panel on the structure of AI governance in Iran."
          },
          es: {
            caption: "Asistentes a la mesa sobre la estructura de gobernanza de la IA en Irán."
          }
        }
      },
      { src: '/images/gallery/1405/06/andishe/6.jpg', alt: 'حضار پنل تخصصی بررسی ساختار حکمرانی هوش مصنوعی در کشور',
        translations: {
          en: {
            caption: "Participants at the panel on the structure of AI governance in Iran."
          },
          es: {
            caption: "Asistentes a la mesa sobre la estructura de gobernanza de la IA en Irán."
          }
        }
      },
      { src: '/images/gallery/1405/06/andishe/7.jpg', alt: 'حضار پنل تخصصی بررسی ساختار حکمرانی هوش مصنوعی در کشور',
        translations: {
          en: {
            caption: "Participants at the panel on the structure of AI governance in Iran."
          },
          es: {
            caption: "Asistentes a la mesa sobre la estructura de gobernanza de la IA en Irán."
          }
        }
      },
    ],
    translations: {
      en: {
        title: "Expert panel",
        caption: "A discussion of the structure of AI governance in Iran."
      },
      es: {
        title: "Mesa de expertos",
        caption: "Debate sobre la estructura de gobernanza de la IA en Irán."
      }
    }
  },
];
// Gallery chronology is data-driven so new entries never need to be inserted
// at a particular array position. ISO dates make the ordering deterministic.
export const galleryItems = [...galleryEntries].sort((a, b) => b.date.localeCompare(a.date));
/** Translate and filter before choosing a cover or opening the lightbox.
* Album translations never grant publication to untranslated photos.
*/
export function localizeGallery(items: GalleryItem[], locale: GalleryLocale): GalleryItem[] {
  if (locale === 'fa') return items;

  return items.flatMap((item) => {
    const images = item.images.flatMap((image) => {
      const translation = image.translations?.[locale];
      const caption = translation?.caption?.trim();
      if (!caption) return [];
      return [{ src: image.src, caption, alt: translation?.alt?.trim() || caption }];
    });
    if (!images.length) return [];

    const translation = item.translations?.[locale];
    return [{
      id: item.id,
      date: item.date,
      faDate: item.faDate,
      title: translation?.title?.trim() || images[0].caption,
      caption: translation?.caption?.trim() || images[0].caption,
      images
    }];
  });
}
