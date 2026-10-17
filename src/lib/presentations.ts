export type PresentationLocale = 'fa' | 'en' | 'es';

export type PresentationPerson = { name: string; honorificPrefix?: string };

export type PresentationTranslation = {
  title: string;
  subtitle?: string;
  presenter?: PresentationPerson;
  preparedBy?: string[];
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
  subtitle?: string;
  englishTitle?: string;
  presenter?: PresentationPerson;
  preparedBy?: string[];
  date?: string;
  language?: string;
  kind: 'دوره' | 'کارگاه' | 'سخنرانی' | 'ارائه تخصصی';
  summary: string;
  description: string;
  presentedAt: string;
  venue: string;
  event?: string;
  eventUrl?: string;
  organizer?: string;
  audience?: string;
  duration?: string;
  slideCount: number;
  version?: string;
  cover?: string;
  coverWidth?: number;
  coverHeight?: number;
  pdf?: string;
  instructorProfileUrl?: string;
  topics: string[];
  // Only the description and presentation details are translated; assets stay shared.
  translations: Record<'en' | 'es', PresentationTranslation>;
};

const dbaInstructorProfileUrl = 'https://postmba.org/professors/سید-محمد-محمدزاده-ضیابری/';

// Keep the newest upload first. The home page features the first entry with a PDF.
export const presentations: Presentation[] = [
  {
    slug: 'the-firm-trapped-by-good-decisions',
    title: 'بنگاه در دام تصمیم‌های خوب',
    subtitle: 'منطق تصمیم، حافظه تحلیلی و چابکی سازمانی',
    englishTitle: 'The Firm Trapped by Good Decisions',
    kind: 'سخنرانی',
    summary: 'از نویز و سوگیری تا وابستگی به مسیر؛ نقش حافظهٔ تحلیلی و هوش مصنوعی در بازسازی و ارزیابی منطق تصمیم بنگاه.',
    description: "آیا ممکن است بنگاهی با مجموعه‌ای از تصمیم‌های درست و موفق، به‌تدریج توان تصمیم‌گیری مؤثر خود را از دست بدهد؟ آیا آنچه امروز نشانه تجربه، تخصص و ثبات مدیریتی تلقی می‌شود، می‌تواند فردا به مانعی در برابر تغییر و سازگاری تبدیل شود؟\n\nبنگاه‌ها معمولاً موفقیت‌های گذشته را نشانه درستی تصمیم‌های خود می‌دانند. با تکرار این تصمیم‌ها، منابع، مهارت‌ها، قراردادها و ساختارهای سازمانی نیز پیرامون آن‌ها شکل می‌گیرند. به‌تدریج انتخاب مسیرهای متفاوت دشوارتر می‌شود؛ حتی زمانی که شرایط محیطی تغییر کرده و دیگر نمی‌توان با همان منطق گذشته تصمیم گرفت. در چنین وضعیتی، مشکل الزاماً تصمیم اشتباه نیست؛ گاهی **دقیقاً تصمیم‌های درست گذشته هستند که بنگاه را گرفتار می‌کنند.**\n\n### از کیفیت تصمیم تا شناخت منطق تصمیم‌گیری\n\nاین ارائه با مرور مفاهیم نویز و سوگیری در قضاوت و تصمیم‌گیری آغاز می‌شود و نشان می‌دهد چرا دسترسی به داده‌های بیشتر، استفاده از الگوریتم‌ها یا حتی کاهش اختلاف میان قضاوت‌های مدیران، لزوماً به تصمیم‌های بهتر منجر نمی‌شود. ممکن است تصمیم‌های یک سازمان سازگارتر شوند، اما همچنان از سوگیری مشترکی پیروی کنند.\n\nاز این نقطه، بحث به مسئله‌ای بنیادی‌تر می‌رسد: سازمان‌ها معمولاً تصمیم‌های خود و گاهی نتایج آن‌ها را ثبت می‌کنند، اما کمتر به ثبت و بررسی **منطق شکل‌گیری تصمیم** توجه دارند. چه گزینه‌هایی بررسی شدند؟ کدام فرض‌ها و معیارها تعیین‌کننده بودند؟ چرا برخی شواهد پذیرفته و برخی کنار گذاشته شدند؟ و آیا با تغییر شرایط، هنوز همان انتخاب قابل دفاع است؟\n\nبدون پاسخ به این پرسش‌ها، انباشت تجربه الزاماً به افزایش توان تصمیم‌گیری منجر نمی‌شود. سازمان ممکن است تاریخچه‌ای طولانی از تصمیم‌ها داشته باشد، اما نداند چرا آن تصمیم‌ها گرفته شده‌اند و چگونه می‌توان از آن‌ها برای انتخاب‌های آینده آموخت.\n\n### حافظه تحلیلی؛ از ثبت تصمیم تا یادگیری سازمانی\n\nبخش دوم ارائه به مفهوم **حافظه تحلیلی سازمان** می‌پردازد؛ قابلیتی که فراتر از بایگانی اسناد، صورت‌جلسات و گزارش‌هاست و می‌کوشد رابطه میان مسئله، شواهد، فرض‌ها، گزینه‌ها، انتخاب نهایی و پیامدهای آن را حفظ و بازسازی کند.\n\nدر این چارچوب، هوش مصنوعی می‌تواند به یافتن شواهد پراکنده، پیشنهاد پیوندهای تحلیلی و مقایسه تصمیم‌های مشابه کمک کند. اما هدف، جایگزین‌کردن قضاوت انسانی با پاسخ‌های ظاهراً قطعی ماشین نیست. هر ادعا باید به شواهد قابل پیگیری متصل باشد، استنباط از واقعیت مستند تفکیک شود و در نبود شواهد کافی، «هنوز نمی‌دانیم» پاسخی معتبر باقی بماند.\n\nاهمیت این قابلیت تنها در بررسی تصمیم‌های گذشته نیست. **بنگاهی که بتواند الگوی تصمیم‌گیری خود را بشناسد، بهتر می‌تواند تشخیص دهد چه چیزی را باید حفظ کند و چه زمانی لازم است در انتخاب‌های موفق گذشته بازنگری کند.** از این منظر، حافظه تحلیلی می‌تواند به یکی از ظرفیت‌های مهم یادگیری سازمانی، چابکی و حکمرانی تصمیم تبدیل شود.\n\n### درباره ارائه\n\nایده اولیه این بحث از مسئله شناسایی و تحلیل الگوهای تکرارشونده در گفت‌وگوهای نخبگانی شکل گرفت و در جریان همکاری علمی مهران ضیابری با دکتر فرهاد نیلی، با هدایت ایشان به حوزه تصمیم‌گیری و یادگیری در بنگاه‌ها گسترش یافت.\n\nحاصل این همکاری، ارائه «بنگاه در دام تصمیم‌های خوب؛ منطق تصمیم، حافظه تحلیلی و چابکی سازمانی» است که در **۱۹ مهر ۱۴۰۵ (۱۱ اکتبر ۲۰۲۶)** توسط **دکتر فرهاد نیلی** در **بیستمین کنفرانس بین‌المللی مدیریت پروژه** ارائه شد.\n\nاین مجموعه ۲۳ اسلایدی، تلاشی برای پیوند مباحث اقتصاد و نظریه تصمیم‌گیری با ظرفیت‌های نوین هوش مصنوعی در شناخت رفتار سازمانی است. هدف آن ارائه یک محصول نرم‌افزاری یا راهکار فنی آماده نیست، بلکه طرح یک مسئله بنیادی در مدیریت و حکمرانی بنگاه‌هاست:\n\n**چگونه می‌توان تجربه تصمیم‌گیری را به توان تصمیم‌گیری تبدیل کرد، بی‌آنکه سازمان اسیر موفقیت‌های گذشته خود شود؟**",
    presenter: { name: 'فرهاد نیلی', honorificPrefix: 'دکتر' },
    preparedBy: ['فرهاد نیلی', 'مهران ضیابری'],
    date: '2026-10-11',
    presentedAt: '۱۹ مهر ۱۴۰۵',
    venue: 'مرکز همایش‌های بین‌المللی رازی، تهران',
    event: 'بیستمین کنفرانس بین‌المللی مدیریت پروژه',
    eventUrl: 'https://iipmc.aryanagroup.com/',
    slideCount: 23,
    language: 'fa',
    cover: '/slides/the-firm-trapped-by-good-decisions/cover.webp',
    coverWidth: 1600,
    coverHeight: 901,
    pdf: '/slides/the-firm-trapped-by-good-decisions/the-firm-trapped-by-good-decisions-v2.pdf',
    topics: ['تصمیم‌گیری سازمانی', 'نویز و سوگیری در قضاوت', 'وابستگی به مسیر', 'حافظه تحلیلی', 'هوش مصنوعی', 'چابکی سازمانی'],
    translations: {
      en: {
        title: 'The Firm Trapped by Good Decisions',
        subtitle: 'Decision logic, analytical memory and organizational agility',
        summary: 'From noise and bias to path dependence: how analytical memory and AI help reconstruct and evaluate the logic behind a firm’s decisions.',
        description: "Can a firm gradually lose its ability to make effective decisions through a series of sound and successful choices? Could what is seen today as experience, expertise and managerial stability become an obstacle to change and adaptation tomorrow?\n\nFirms generally take past successes as evidence that their decisions were right. As these decisions are repeated, resources, skills, contracts and organizational structures take shape around them. Choosing a different path gradually becomes harder, even when circumstances have changed and the reasoning that guided earlier decisions no longer holds. In this situation, the problem is not necessarily a bad decision; sometimes **the very decisions that were right in the past are what trap the firm.**\n\n### From decision quality to understanding decision logic\n\nThis presentation begins with noise and bias in judgment and decision-making. It explores why more data, algorithms or even less disagreement among managers do not necessarily lead to better decisions. An organization’s decisions may become more consistent while still reflecting a shared bias.\n\nThe discussion then turns to a more fundamental issue: organizations usually record their decisions and sometimes their outcomes, but pay less attention to documenting and examining **the reasoning behind a decision**. Which options were considered? Which assumptions and criteria were decisive? Why was some evidence accepted and other evidence set aside? And when conditions change, is the same choice still defensible?\n\nWithout answers to these questions, accumulated experience does not necessarily improve the ability to decide. An organization may have a long history of decisions yet lack an understanding of why they were made or how to learn from them when making future choices.\n\n### Analytical memory: from recording decisions to organizational learning\n\nThe second part introduces **organizational analytical memory**: a capability that goes beyond archiving documents, meeting minutes and reports. It seeks to preserve and reconstruct the relationships between a problem, the evidence, assumptions, options, the final choice and its consequences.\n\nIn this framework, AI can help find scattered evidence, suggest analytical connections and compare similar decisions. The aim, however, is not to replace human judgment with seemingly certain machine answers. Every claim must be linked to traceable evidence, inference must be distinguished from documented fact, and when evidence is insufficient, “we do not yet know” must remain a valid answer.\n\nThe value of this capability extends beyond reviewing past decisions. **A firm that understands its own patterns of decision-making is better placed to identify what it should preserve and when it needs to revisit choices that once proved successful.** Analytical memory can therefore become an important capacity for organizational learning, agility and decision governance.\n\n### About the presentation\n\nThe initial idea emerged from the challenge of identifying and analyzing recurring patterns in discussions among experts. Through Mehran Ziabary’s scientific collaboration with Dr. Farhad Nili, and under Dr. Nili’s guidance, it developed into an inquiry into decision-making and learning within firms.\n\nThe result was “The Firm Trapped by Good Decisions: Decision Logic, Analytical Memory and Organizational Agility,” presented by **Dr. Farhad Nili** at the **20th International Project Management Conference** on **19 Mehr 1405 (11 October 2026)**.\n\nThese 23 slides seek to connect economics and decision theory with new AI capabilities for understanding organizational behavior. Their purpose is to raise a fundamental question in the management and governance of firms, rather than to introduce a software product or a ready-made technical solution:\n\n**How can the experience of making decisions become the capacity to make decisions, without an organization becoming trapped by its past successes?**",
        presenter: { name: 'Farhad Nili', honorificPrefix: 'Dr.' },
        preparedBy: ['Farhad Nili', 'Mehran Ziabary'],
        presentedAt: '11 October 2026',
        venue: 'Razi International Conference Center, Tehran',
        event: '20th International Project Management Conference',
        topics: ['Organizational decision-making', 'Noise and bias in judgment', 'Path dependence', 'Analytical memory', 'Artificial intelligence', 'Organizational agility']
      },
      es: {
        title: 'La empresa atrapada por las buenas decisiones',
        subtitle: 'Lógica de decisión, memoria analítica y agilidad organizativa',
        summary: 'Del ruido y los sesgos a la dependencia de la trayectoria: el papel de la memoria analítica y la IA en la reconstrucción y evaluación de la lógica de las decisiones empresariales.',
        description: "¿Puede una empresa perder gradualmente su capacidad de tomar decisiones eficaces a través de una serie de decisiones acertadas y exitosas? ¿Puede aquello que hoy se considera experiencia, conocimiento especializado y estabilidad directiva convertirse mañana en un obstáculo para el cambio y la adaptación?\n\nLas empresas suelen interpretar los éxitos del pasado como prueba de que sus decisiones fueron acertadas. Al repetirse estas decisiones, los recursos, las competencias, los contratos y las estructuras organizativas también se configuran en torno a ellas. Elegir caminos distintos se vuelve cada vez más difícil, incluso cuando las condiciones han cambiado y el razonamiento de antes ya no sirve para decidir. En esta situación, el problema no es necesariamente una decisión equivocada; a veces **son precisamente las decisiones acertadas del pasado las que atrapan a la empresa.**\n\n### De la calidad de las decisiones a comprender su lógica\n\nLa presentación comienza con los conceptos de ruido y sesgo en el juicio y la toma de decisiones. Examina por qué disponer de más datos, utilizar algoritmos o incluso reducir las diferencias entre los juicios de los directivos no conduce necesariamente a mejores decisiones. Las decisiones de una organización pueden volverse más consistentes y, aun así, seguir respondiendo a un sesgo compartido.\n\nA partir de ahí, el debate aborda una cuestión más fundamental: las organizaciones suelen registrar sus decisiones y, a veces, sus resultados, pero prestan menos atención a documentar y examinar **el razonamiento que dio lugar a la decisión**. ¿Qué opciones se consideraron? ¿Qué supuestos y criterios fueron determinantes? ¿Por qué se aceptaron unas evidencias y se descartaron otras? Y, cuando cambian las condiciones, ¿sigue siendo defendible la misma elección?\n\nSin respuestas a estas preguntas, acumular experiencia no aumenta necesariamente la capacidad de decidir. Una organización puede contar con una larga historia de decisiones sin comprender por qué se tomaron ni cómo aprender de ellas para elegir en el futuro.\n\n### Memoria analítica: del registro de decisiones al aprendizaje organizativo\n\nLa segunda parte presenta la **memoria analítica de la organización**: una capacidad que va más allá del archivo de documentos, actas y informes. Busca preservar y reconstruir las relaciones entre el problema, las evidencias, los supuestos, las opciones, la elección final y sus consecuencias.\n\nEn este marco, la inteligencia artificial puede ayudar a encontrar evidencias dispersas, proponer conexiones analíticas y comparar decisiones similares. El objetivo, sin embargo, no es sustituir el juicio humano por respuestas de la máquina que parecen definitivas. Toda afirmación debe vincularse a evidencias rastreables, las inferencias deben distinguirse de los hechos documentados y, cuando no haya evidencia suficiente, «todavía no lo sabemos» debe seguir siendo una respuesta válida.\n\nEl valor de esta capacidad va más allá de revisar decisiones pasadas. **Una empresa que comprende sus propios patrones de decisión está en mejores condiciones de reconocer qué debe conservar y cuándo necesita revisar elecciones que antes tuvieron éxito.** Desde esta perspectiva, la memoria analítica puede convertirse en una capacidad importante para el aprendizaje organizativo, la agilidad y la gobernanza de las decisiones.\n\n### Acerca de la presentación\n\nLa idea inicial surgió del problema de identificar y analizar patrones recurrentes en conversaciones entre expertos. En el curso de la colaboración científica de Mehran Ziabary con el Dr. Farhad Nili, y bajo la orientación de este último, se amplió al ámbito de la toma de decisiones y el aprendizaje en las empresas.\n\nEl resultado fue «La empresa atrapada por las buenas decisiones: lógica de decisión, memoria analítica y agilidad organizativa», presentada por el **Dr. Farhad Nili** en la **20.ª Conferencia Internacional de Gestión de Proyectos** el **19 de Mehr de 1405 (11 de octubre de 2026)**.\n\nEstas 23 diapositivas buscan conectar la economía y la teoría de la decisión con las nuevas capacidades de la inteligencia artificial para comprender el comportamiento organizativo. Su propósito es plantear una cuestión fundamental sobre la gestión y la gobernanza de las empresas, en lugar de presentar un producto de software o una solución técnica lista para usar:\n\n**¿Cómo transformar la experiencia de tomar decisiones en la capacidad de decidir, sin que la organización quede atrapada por sus éxitos pasados?**",
        presenter: { name: 'Farhad Nili', honorificPrefix: 'Dr.' },
        preparedBy: ['Farhad Nili', 'Mehran Ziabary'],
        presentedAt: '11 de octubre de 2026',
        venue: 'Centro Internacional de Conferencias Razi, Teherán',
        event: '20.ª Conferencia Internacional de Gestión de Proyectos',
        topics: ['Toma de decisiones organizativas', 'Ruido y sesgos en el juicio', 'Dependencia de la trayectoria', 'Memoria analítica', 'Inteligencia artificial', 'Agilidad organizativa']
      }
    }
  },
    {
    slug: 'behind-ai-dba',
    instructorProfileUrl: dbaInstructorProfileUrl,
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
    instructorProfileUrl: dbaInstructorProfileUrl,
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
  date?: string;
  language?: string;
  englishTitle?: string;
  eventUrl?: string;
  slideCount: number;
  cover?: string;
  coverWidth?: number;
  coverHeight?: number;
  pdf?: string;
  instructorProfileUrl?: string;
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
    date: item.date,
    language: item.language,
    englishTitle: item.englishTitle,
    eventUrl: item.eventUrl,
    cover: item.cover,
    coverWidth: item.coverWidth,
    coverHeight: item.coverHeight,
    pdf: item.pdf,
    instructorProfileUrl: item.instructorProfileUrl
  };
}

export function presenterName(person?: PresentationPerson): string {
  return person ? [person.honorificPrefix, person.name].filter(Boolean).join(' ') : '';
}

export function preparationNames(names: string[], locale: PresentationLocale): string {
  return new Intl.ListFormat(locale, { style: 'long', type: 'conjunction' }).format(names);
}

// Explicit credits are required: do not infer authorship from the website owner.
export function presentationStructuredData(
  item: LocalizedPresentation,
  locale: PresentationLocale,
  labels: { presenter: string; preparedBy: string }
): Record<string, unknown> | undefined {
  if (!item.preparedBy?.length) return undefined;
  const siteUrl = 'https://ziabary.ir';
  const path = `${locale === 'fa' ? '' : `/${locale}`}/slides/${item.slug}/`;
  const url = new URL(path, siteUrl).href;
  return {
    '@type': 'PresentationDigitalDocument',
    '@id': `${url}#presentation`,
    name: item.title,
    ...(item.subtitle ? { alternativeHeadline: item.subtitle } : {}),
    description: item.summary,
    abstract: item.description.replace(/^### /gm, '').replace(/\*\*/g, ''),
    url,
    inLanguage: item.language ?? 'fa',
    ...(item.date ? { datePublished: item.date } : {}),
    ...(item.cover ? { image: new URL(item.cover, siteUrl).href } : {}),
    author: item.preparedBy.map(name => ({ '@type': 'Person', name })),
    creditText: `${labels.preparedBy}: ${preparationNames(item.preparedBy, locale)}`,
    ...(item.presenter ? {
      contributor: {
        '@type': 'Role',
        roleName: labels.presenter,
        contributor: { '@type': 'Person', ...item.presenter }
      }
    } : {}),
    keywords: item.topics,
    ...(item.pdf ? {
      encoding: {
        '@type': 'MediaObject',
        contentUrl: new URL(item.pdf, siteUrl).href,
        encodingFormat: 'application/pdf',
        inLanguage: item.language ?? 'fa'
      }
    } : {})
  };
}
