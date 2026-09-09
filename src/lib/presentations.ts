export type PresentationLocale = 'fa' | 'en' | 'es';

export type PresentationTranslation = {
  title: string;
  summary: string;
  description: string;
  presentedAt: string;
  venue: string;
  event?: string;
  organizer?: string;
  audience?: string;
  duration?: string;
  version?: string;
  topics: string[];
};

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
  // Only the description and presentation details are translated; assets stay shared.
  translations: Record<'en' | 'es', PresentationTranslation>;
};

// Keep the newest upload first. The home page features the first entry with a PDF.
export const presentations: Presentation[] = [
    {
    slug: 'behind-ai-dba',
    translations: {
      "en": {
        "title": "Behind the Scenes of Intelligence",
        "summary": "Exploring what lies behind intelligence and AI, from philosophy and biology to classical AI and the singularity.",
        "description": "Public and even academic discussions of AI often show only the tip of the iceberg. Understanding the nature of intelligence also calls for philosophy, biology and a closer look at how intelligent systems work. This eight-hour class, taught to DBA students studying AI in business, explores those deeper layers rather than focusing only on applications. The original presentation contains videos that cannot be played in the PDF edition.",
        "presentedAt": "1405 (Solar Hijri)",
        "venue": "Faculty of Management, University of Tehran",
        "event": "DBA course",
        "organizer": "University of Tehran",
        "audience": "Executives and DBA students",
        "duration": "1 day · 8 hours",
        "version": "Version 1",
        "topics": [
          "Where should we look for intelligence?",
          "The brain: a living computer",
          "The brain through the lens of models",
          "How do humans make sense of the world?",
          "When machines learned language from language itself",
          "When intelligence is not designed",
          "When the model enters the world",
          "When the question turns from the machine back to us"
        ]
      },
      "es": {
        "title": "Entre bastidores de la inteligencia",
        "summary": "Una exploración de lo que hay detrás de la inteligencia y la IA, desde la filosofía y la biología hasta la IA clásica y la singularidad.",
        "description": "El debate público, e incluso el académico, sobre la IA suele mostrar solo la punta del iceberg. Comprender la naturaleza de la inteligencia también exige recurrir a la filosofía, la biología y el funcionamiento de los sistemas inteligentes. Esta clase de ocho horas, impartida a estudiantes de DBA sobre IA aplicada a los negocios, explora esas capas más profundas, más allá de sus aplicaciones. La presentación original incluye vídeos que no se pueden reproducir en la versión PDF.",
        "presentedAt": "1405 (calendario persa)",
        "venue": "Facultad de Administración, Universidad de Teherán",
        "event": "Curso DBA",
        "organizer": "Universidad de Teherán",
        "audience": "Directivos y estudiantes de DBA",
        "duration": "1 día · 8 horas",
        "version": "Versión 1",
        "topics": [
          "¿Dónde debemos buscar la inteligencia?",
          "El cerebro: un ordenador vivo",
          "El cerebro a través de los modelos",
          "¿Cómo damos sentido al mundo?",
          "Cuando las máquinas aprendieron el lenguaje del propio lenguaje",
          "Cuando la inteligencia no se diseña",
          "Cuando el modelo entra en el mundo",
          "Cuando la pregunta deja de centrarse en la máquina y vuelve a nosotros"
        ]
      }
    },
    title: 'پشت پرده هوش',
    kind: 'دوره',
    summary: 'همه آنچیز که در پشت پرده هوش و هوش مصنوعی می‌گذرد و از فلسفه تا بیولوژی، از هوش کلاسیک تا تکینگی',
    description: 'آنچه در خصوص هوش مصنوعی در جامعه و حتی مجامع دانشگاهی مطرح می‌شود تنها نوک قله کوه یخی است که بخش عمده آن دیده نمی‌شود. در حالی که شرکت‌های بزرگ توسعه‌دهنده هوش مصنوعی در حال استخدام فلاسفه برای شناخت ماهیت واقعی هوش هستند غافل شدن از این بحث و پرداختن صرف به کاربست‌های هوش عملا ما را از لایه‌های عمیق هوش دور  می‌کند. در این دوره که در قالب یک کلاس ۸ ساعته برای دانشجویان DBA هوش مصنوعی در کسب‌وکار برگزار شد تمام پرده‌ها حول موضوع هوش و هوش مصنوعی را کنار زده و پشت پرده آن را دقیق بررسی می‌کنیم. لازم به ذکر است که اسلایدهای اصلی دارای چند ویدیو هستند که در نسخه PDF امکان ارایه آن‌ها وجود ندارد',
    presentedAt: '۱۴۰۵',
    venue: 'دانشکدگان مدیریت دانشگاه تهران',
    event: 'دوره DBA',
    organizer: 'دانشگاه تهران',
    audience: 'مدیران و دانشجویان DBA',
    duration: 'یک روز · ۸ ساعت',
    slideCount: 144,
    version: 'نسخه ۱',
    cover: '/slides/behind-ai-dba/cover.jpg',
    pdf: '/slides/behind-ai-dba/Behind-AI.pdf',
    topics: [
      'هوش را کجا باید جست‌وجو کرد؟',
      'مغز؛ رایانه‌ای که زنده است',
      'مغز در آینهٔ مدل‌ها',
      'انسان چگونه از جهان، معنا می‌سازد؟',
      'وقتی ماشین زبان را از خود زبان آموخت',
      'وقتی هوش طراحی نمی‌شود',
      'وقتی مدل وارد جهان می‌شود',
      'وقتی پرسش از ماشین به خود ما بازمی‌گردد'
    ]
  },
  {
    slug: 'enterprise-ai-governance-dba',
    translations: {
      "en": {
        "title": "Enterprise AI Governance",
        "summary": "Turning an AI project into an organizational capability: decision rights, problem framing, architecture, security, contracts and acceptance.",
        "description": "The course follows a case: a CEO asks the organization to build an intelligent assistant within three months. Each section examines one of the decisions hidden behind that apparently simple instruction.",
        "presentedAt": "1405 (Solar Hijri)",
        "venue": "Faculty of Management, University of Tehran",
        "event": "DBA course",
        "organizer": "University of Tehran",
        "audience": "Executives and DBA students",
        "duration": "2 days · 16 hours",
        "version": "Version 1",
        "topics": [
          "The governance operating model and decision rights",
          "The scope of governance and AI washing",
          "Problem governance and the investment portfolio",
          "Architecture, data and suppliers",
          "Security, accountability and human oversight",
          "Contracts, acceptance and project evaluation"
        ]
      },
      "es": {
        "title": "Gobernanza de la IA en las organizaciones",
        "summary": "Convertir un proyecto de IA en una capacidad organizativa: derechos de decisión, formulación del problema, arquitectura, seguridad, contratos y aceptación.",
        "description": "El curso sigue un caso: un director general pide a su organización que construya un asistente inteligente en tres meses. Cada sección examina una de las decisiones que se esconden tras esa instrucción aparentemente sencilla.",
        "presentedAt": "1405 (calendario persa)",
        "venue": "Facultad de Administración, Universidad de Teherán",
        "event": "Curso DBA",
        "organizer": "Universidad de Teherán",
        "audience": "Directivos y estudiantes de DBA",
        "duration": "2 días · 16 horas",
        "version": "Versión 1",
        "topics": [
          "Modelo operativo de gobernanza y derechos de decisión",
          "Alcance de la gobernanza y uso superficial de la etiqueta IA",
          "Gobernanza del problema y cartera de inversiones",
          "Arquitectura, datos y proveedores",
          "Seguridad, responsabilidad y supervisión humana",
          "Contratos, aceptación y evaluación del proyecto"
        ]
      }
    },
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
    slug: 'iran-ai-gpu-dba',
    translations: {
      "en": {
        "title": "Choosing an AI Compute Infrastructure Strategy for Iran",
        "summary": "A review of AI compute infrastructure options and the approaches suited to Iran's needs and constraints.",
        "description": "Choosing GPUs for AI applications involves complexities that are often overlooked. Presented at the annual FaceCup gathering, this talk examines accelerator types, performance per cost, availability and the server and service choices involved.",
        "presentedAt": "1404 (Solar Hijri)",
        "venue": "Omidino Smart Technology and Innovation Factory",
        "event": "6th FaceCup AI event",
        "organizer": "FaceCup competitions",
        "audience": "Executives and students",
        "duration": "40 minutes",
        "version": "Version 1",
        "topics": [
          "Types of AI compute infrastructure",
          "Performance per cost",
          "GPU supply and availability",
          "Choosing a GPU card",
          "Choosing interconnects",
          "Choosing servers",
          "Types of compute services"
        ]
      },
      "es": {
        "title": "Una estrategia de infraestructura de cómputo para la IA en Irán",
        "summary": "Un repaso de las opciones de infraestructura de cómputo para IA y de los enfoques adecuados a las necesidades y limitaciones de Irán.",
        "description": "Elegir GPU para aplicaciones de IA implica dificultades que a menudo se pasan por alto. Esta conferencia, presentada en el encuentro anual de FaceCup, examina los tipos de aceleradores, el rendimiento por coste, la disponibilidad y las decisiones sobre servidores y servicios.",
        "presentedAt": "1404 (calendario persa)",
        "venue": "Fábrica de Tecnología Inteligente e Innovación Omidino",
        "event": "6.º evento de IA FaceCup",
        "organizer": "Competiciones FaceCup",
        "audience": "Directivos y estudiantes",
        "duration": "40 minutos",
        "version": "Versión 1",
        "topics": [
          "Tipos de infraestructura de cómputo para IA",
          "Rendimiento por coste",
          "Oferta y disponibilidad de GPU",
          "Elección de la tarjeta GPU",
          "Elección de las interconexiones",
          "Elección de los servidores",
          "Tipos de servicios de cómputo"
        ]
      }
    },
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
    translations: {
      "en": {
        "title": "AI for Managers — Part 4: Solving Problems with AI",
        "summary": "Principles and methods for solving problems with AI: from framing the problem to evaluating the project and accepting the solution.",
        "description": "This part looks behind AI applications to examine different approaches to problem solving and ways to evaluate a proposed solution.",
        "presentedAt": "1403–1405 (Solar Hijri)",
        "venue": "Various organizations",
        "event": "Management training course",
        "organizer": "Hooshran",
        "audience": "Industrial and organizational managers",
        "duration": "8 hours",
        "version": "Version 1",
        "topics": []
      },
      "es": {
        "title": "IA para directivos — Parte 4: Resolver problemas con IA",
        "summary": "Principios y métodos para resolver problemas con IA: desde la formulación del problema hasta la evaluación del proyecto y la aceptación de la solución.",
        "description": "Esta parte examina lo que hay detrás de las aplicaciones de IA, los distintos enfoques para resolver problemas y las formas de evaluar una solución propuesta.",
        "presentedAt": "1403–1405 (calendario persa)",
        "venue": "Diversas organizaciones",
        "event": "Curso de formación para directivos",
        "organizer": "Hooshran",
        "audience": "Directivos de empresas industriales y otras organizaciones",
        "duration": "8 horas",
        "version": "Versión 1",
        "topics": []
      }
    },
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
    translations: {
      "en": {
        "title": "AI for Managers — Part 3: What AI Is Not and What Not to Expect",
        "summary": "Clarifying common misconceptions about AI, its capabilities, its limitations and unrealistic expectations.",
        "description": "This part introduces managers to the boundaries of AI's capabilities and helps them recognize expectations that the technology cannot reasonably meet.",
        "presentedAt": "1403–1405 (Solar Hijri)",
        "venue": "Various organizations",
        "event": "Management training course",
        "organizer": "Hooshran",
        "audience": "Industrial and organizational managers",
        "duration": "4 hours",
        "version": "Version 1",
        "topics": []
      },
      "es": {
        "title": "IA para directivos — Parte 3: Qué no es la IA y qué no debemos esperar de ella",
        "summary": "Aclarar ideas equivocadas sobre la IA, sus capacidades, sus limitaciones y las expectativas poco realistas.",
        "description": "Esta parte presenta a los directivos los límites de la IA y les ayuda a reconocer las expectativas que esta tecnología no puede satisfacer de forma razonable.",
        "presentedAt": "1403–1405 (calendario persa)",
        "venue": "Diversas organizaciones",
        "event": "Curso de formación para directivos",
        "organizer": "Hooshran",
        "audience": "Directivos de empresas industriales y otras organizaciones",
        "duration": "4 horas",
        "version": "Versión 1",
        "topics": []
      }
    },
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
    translations: {
      "en": {
        "title": "AI for Managers — Parts 1 and 2: Introduction and Applications",
        "summary": "Core AI concepts and their practical use in organizations, from definitions to project evaluation.",
        "description": "These opening sections introduce managers to the foundations of AI and its practical applications in an organizational setting.",
        "presentedAt": "1403–1405 (Solar Hijri)",
        "venue": "Various organizations",
        "event": "Management training course",
        "organizer": "Hooshran",
        "audience": "Industrial and organizational managers",
        "duration": "4 hours",
        "version": "Version 1",
        "topics": []
      },
      "es": {
        "title": "IA para directivos — Partes 1 y 2: Introducción y aplicaciones",
        "summary": "Conceptos fundamentales de IA y su uso práctico en las organizaciones, desde las definiciones hasta la evaluación de proyectos.",
        "description": "Estas secciones iniciales presentan a los directivos los fundamentos de la IA y sus aplicaciones prácticas en el entorno organizativo.",
        "presentedAt": "1403–1405 (calendario persa)",
        "venue": "Diversas organizaciones",
        "event": "Curso de formación para directivos",
        "organizer": "Hooshran",
        "audience": "Directivos de empresas industriales y otras organizaciones",
        "duration": "4 horas",
        "version": "Versión 1",
        "topics": []
      }
    },
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
    translations: {
      "en": {
        "title": "AI and Persian Language Processing in Enterprise Software",
        "summary": "Practical applications of AI and Persian natural language processing in enterprise software, from defining a use case to evaluating a project.",
        "description": "Prepared for developers and managers of enterprise software, this presentation examines practical uses of AI and Persian language processing in their products.",
        "presentedAt": "1403 (Solar Hijri)",
        "venue": "ICT Research Institute (Iran Telecommunication Research Center)",
        "event": "Management training course",
        "organizer": "TASNA",
        "audience": "Software company managers and enterprise developers",
        "duration": "2 hours",
        "version": "Version 1",
        "topics": []
      },
      "es": {
        "title": "IA y procesamiento del persa en el software empresarial",
        "summary": "Aplicaciones prácticas de la IA y del procesamiento del lenguaje natural en persa en el software empresarial, desde la definición del caso de uso hasta la evaluación del proyecto.",
        "description": "Esta presentación, preparada para desarrolladores y responsables de software empresarial, examina los usos prácticos de la IA y del procesamiento del persa en sus productos.",
        "presentedAt": "1403 (calendario persa)",
        "venue": "Instituto de Investigación en TIC (Centro de Investigación de Telecomunicaciones de Irán)",
        "event": "Curso de formación para directivos",
        "organizer": "TASNA",
        "audience": "Directivos de empresas de software y desarrolladores de aplicaciones empresariales",
        "duration": "2 horas",
        "version": "Versión 1",
        "topics": []
      }
    },
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
    translations: {
      "en": {
        "title": "Data Governance in the Age of AI",
        "summary": "A short presentation on data governance and its contribution to successful AI projects.",
        "description": "Presented at the first National Conference on Artificial Intelligence and the Internet of Things, alongside INOTEX 1403, this talk examines the role of data governance in successful AI projects.",
        "presentedAt": "1403 (Solar Hijri)",
        "venue": "Islamic Azad University, Pardis Science and Technology Branch",
        "event": "1st National Conference on Artificial Intelligence and the Internet of Things",
        "organizer": "National Conference on Artificial Intelligence and the Internet of Things",
        "audience": "Students and academics",
        "duration": "1 hour",
        "version": "Version 1",
        "topics": []
      },
      "es": {
        "title": "Gobernanza de los datos en la era de la IA",
        "summary": "Una breve presentación sobre la gobernanza de los datos y su contribución al éxito de los proyectos de IA.",
        "description": "Esta conferencia, presentada en el primer Congreso Nacional de Inteligencia Artificial e Internet de las Cosas, junto a INOTEX 1403, examina el papel de la gobernanza de los datos en el éxito de los proyectos de IA.",
        "presentedAt": "1403 (calendario persa)",
        "venue": "Universidad Islámica Azad, sede de Ciencia y Tecnología de Pardis",
        "event": "1.er Congreso Nacional de Inteligencia Artificial e Internet de las Cosas",
        "organizer": "Congreso Nacional de Inteligencia Artificial e Internet de las Cosas",
        "audience": "Estudiantes y docentes universitarios",
        "duration": "1 hora",
        "version": "Versión 1",
        "topics": []
      }
    },
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
    translations: {
      "en": {
        "title": "A Review of International AI Policies and Frameworks",
        "summary": "An overview of prominent policy documents and approaches to artificial intelligence around the world.",
        "description": "Prepared and presented at the request of the National AI Organization, these slides review major AI policy documents and frameworks across more than 20 countries.",
        "presentedAt": "Winter 1403 (Solar Hijri)",
        "venue": "National AI Organization",
        "event": "Specialist session on international AI policies and frameworks",
        "organizer": "National AI Organization",
        "audience": "Students and academics",
        "duration": "1 hour",
        "version": "Version 1",
        "topics": [
          "Countries with an AI policy document",
          "Major international documents",
          "Iran's national AI document",
          "Classifying international policy documents"
        ]
      },
      "es": {
        "title": "Políticas y marcos internacionales de inteligencia artificial",
        "summary": "Un repaso de los principales documentos y enfoques de política pública sobre inteligencia artificial en el mundo.",
        "description": "Estas diapositivas, preparadas y presentadas a petición de la Organización Nacional de IA, examinan documentos y marcos destacados de política de IA en más de 20 países.",
        "presentedAt": "Invierno de 1403 (calendario persa)",
        "venue": "Organización Nacional de IA",
        "event": "Sesión especializada sobre políticas y marcos internacionales de IA",
        "organizer": "Organización Nacional de IA",
        "audience": "Estudiantes y docentes universitarios",
        "duration": "1 hora",
        "version": "Versión 1",
        "topics": [
          "Países con un documento de política de IA",
          "Principales documentos internacionales",
          "Documento nacional de IA de Irán",
          "Clasificación de los documentos internacionales"
        ]
      }
    },
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
    translations: {
      "en": {
        "title": "Data Governance in the Age of AI",
        "summary": "A short presentation on data governance and its role in the businesses affiliated with the Mostazafan Foundation.",
        "description": "Delivered to managers and specialists at the Mostazafan Foundation, this presentation examines how data governance contributes to the success of AI projects.",
        "presentedAt": "1402 (Solar Hijri)",
        "venue": "Mostazafan Foundation",
        "event": "1st practice-based event on AI in industry",
        "organizer": "Mostazafan Foundation",
        "audience": "Students and academics",
        "duration": "1 hour",
        "version": "Version 1",
        "topics": []
      },
      "es": {
        "title": "Gobernanza de los datos en la era de la IA",
        "summary": "Una breve presentación sobre la gobernanza de los datos y su papel en las empresas vinculadas a la Fundación Mostazafan.",
        "description": "Esta presentación, dirigida a responsables y especialistas de la Fundación Mostazafan, examina cómo la gobernanza de los datos contribuye al éxito de los proyectos de IA.",
        "presentedAt": "1402 (calendario persa)",
        "venue": "Fundación Mostazafan",
        "event": "1.er encuentro sobre experiencias de IA en la industria",
        "organizer": "Fundación Mostazafan",
        "audience": "Estudiantes y docentes universitarios",
        "duration": "1 hora",
        "version": "Versión 1",
        "topics": []
      }
    },
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
    translations: {
      "en": {
        "title": "AI and Persian Culture, Script and Language: Tensions and Possibilities",
        "summary": "The rise of large language models brought growing concerns for Persian. This talk was an early warning about those risks.",
        "description": "AI is having a substantial impact on Persian, and the emergence of large language models has intensified concerns about its future. This talk examines both the risks and the opportunities AI presents for Persian language, writing and culture.",
        "presentedAt": "1402 (Solar Hijri)",
        "venue": "Hozeh Honari (Art Bureau)",
        "event": "Specialist talk on AI and Persian culture, script and language",
        "organizer": "Targoman",
        "audience": "Students and academics",
        "duration": "2 hours",
        "version": "Version 1",
        "topics": []
      },
      "es": {
        "title": "IA y cultura, escritura y lengua persas: tensiones y posibilidades",
        "summary": "La llegada de los grandes modelos de lenguaje trajo consigo una preocupación creciente por el persa. Esta conferencia fue una advertencia temprana sobre esos riesgos.",
        "description": "La IA está teniendo un impacto considerable en el persa, y la aparición de los grandes modelos de lenguaje ha intensificado la preocupación por su futuro. Esta conferencia examina tanto los riesgos como las oportunidades de la IA para la lengua, la escritura y la cultura persas.",
        "presentedAt": "1402 (calendario persa)",
        "venue": "Hozeh Honari (Oficina de Arte)",
        "event": "Conferencia especializada sobre IA y cultura, escritura y lengua persas",
        "organizer": "Targoman",
        "audience": "Estudiantes y docentes universitarios",
        "duration": "2 horas",
        "version": "Versión 1",
        "topics": []
      }
    },
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
    pdf: '/slides/llm-persian-culture/LLM-PersianCulture.pdf',
    topics: [  ]
  }
];

export const findPresentation = (slug: string) =>
  presentations.find((presentation) => presentation.slug === slug);

export type LocalizedPresentation = PresentationTranslation & {
  slug: string;
  kind: string;
  slideCount: number;
  cover?: string;
  pdf?: string;
};

const presentationKinds = {
  en: { 'دوره': 'Course', 'کارگاه': 'Workshop', 'سخنرانی': 'Talk', 'ارائه تخصصی': 'Specialist presentation' },
  es: { 'دوره': 'Curso', 'کارگاه': 'Taller', 'سخنرانی': 'Conferencia', 'ارائه تخصصی': 'Presentación especializada' }
};

export function localizePresentation(item: Presentation, locale: PresentationLocale): LocalizedPresentation {
  if (locale === 'fa') return item;
  return {
    ...item.translations[locale],
    slug: item.slug,
    kind: presentationKinds[locale][item.kind],
    slideCount: item.slideCount,
    cover: item.cover,
    pdf: item.pdf
  };
}
