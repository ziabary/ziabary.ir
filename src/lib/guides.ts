export type GuideItemKind = 'article' | 'interactive' | 'checklist' | 'tool';

export type GuideItem = {
  id: string;
  title: string;
  subtitle: string;
  kind: GuideItemKind;
  href?: string;
};

export type GuideCollection = {
  slug: string;
  title: string;
  subtitle: string;
  eyebrow: string;
  image: string;
  imageAlt: string;
  intro: string;
  items: GuideItem[];
};

/**
 * The order of both collections and their items is editorial. Add new entries
 * exactly where they should appear; dates never reorder this list.
 *
 * `kind` deliberately supports non-article material such as a live comparison
 * table, checklist or tool. Those entries belong here without being published
 * in the general articles archive.
 */
export const guideCollections: GuideCollection[] = [
  {
    slug: 'gpu-selection',
    title: 'راهنمای انتخاب GPU برای کاربست‌های هوش مصنوعی',
    subtitle: 'از حافظه و پهنای‌باند تا توان مصرفی، مقیاس و هزینه',
    eyebrow: 'زیرساخت محاسباتی',
    image: '/images/guides/gpu-selection.webp',
    imageAlt: 'چند شتاب‌دهندهٔ محاسباتی با اندازه و ظرفیت متفاوت در یک معماری هوش مصنوعی',
    intro: 'انتخاب GPU از مقایسهٔ نام مدل‌ها آغاز نمی‌شود؛ بار کاری، حافظه، دقت محاسبات، توپولوژی و محدودیت‌های استقرار تعیین می‌کنند کدام گزینه واقعاً مناسب است.',
    items: []
  },
  {
    slug: 'zero-trust-ai',
    title: 'هوش مصنوعی امن (ZTAI)',
    subtitle: 'اعتماد صفر برای داده، مدل، بازیابی، عامل و عمل',
    eyebrow: 'امنیت هوش مصنوعی',
    image: '/images/guides/zero-trust-ai.webp',
    imageAlt: 'هستهٔ هوش مصنوعی در میان چند مرز امنیتی و دروازهٔ کنترل دسترسی',
    intro: 'امنیت هوش مصنوعی فقط حفاظت از سرور و شبکه نیست؛ رفتار مدل، مسیر داده، زمینهٔ کاربر و مجوز اجرای هر عمل باید در لحظه کنترل شود.',
    items: []
  },
  {
    slug: 'secure-operating-system',
    title: 'سیستم‌عامل امن',
    subtitle: 'از کاهش سطح حمله تا تفکیک، کنترل دسترسی و سخت‌سازی',
    eyebrow: 'امنیت زیرساخت',
    image: '/images/guides/secure-operating-system.webp',
    imageAlt: 'هستهٔ محاسباتی محافظت‌شده در لایه‌های جدا و کنترل‌شده',
    intro: 'سیستم‌عامل امن محصول یک تنظیم جادویی نیست؛ حاصل مجموعه‌ای از تصمیم‌ها دربارهٔ کمینه‌سازی، تفکیک، سطح دسترسی، زنجیرهٔ تأمین و امکان مشاهده و پاسخ است.',
    items: []
  },
  {
    slug: 'ai-operator',
    title: 'اپراتور هوش مصنوعی',
    subtitle: 'مدل کسب‌وکار، معماری، تنظیم‌گری و مرزهای مسئولیت',
    eyebrow: 'زیرساخت و سیاست‌گذاری',
    image: '/images/guides/ai-operator.webp',
    imageAlt: 'چند سازمان مستقل متصل به یک لایهٔ هماهنگ‌کنندهٔ توزیع‌شده',
    intro: 'اپراتور هوش مصنوعی پیش از آنکه یک عنوان یا مجوز باشد، مدلی برای توزیع قابلیت، مسئولیت، زیرساخت و قدرت تصمیم میان بازیگران مختلف است.',
    items: []
  },
  {
    slug: 'ai-platform',
    title: 'سکوی هوش مصنوعی',
    subtitle: 'از داده و مدل تا استقرار، پایش، امنیت و عملیات',
    eyebrow: 'معماری سازمانی',
    image: '/images/guides/ai-platform.webp',
    imageAlt: 'ماژول‌های داده، مدل، استقرار و امنیت روی یک سکوی معماری مشترک',
    intro: 'سکوی هوش مصنوعی یک مدل زبانی یا خوشهٔ GPU نیست؛ مجموعه‌ای از قابلیت‌های هم‌بسته است که مسیر ساخت، ارزیابی، استقرار و ادارهٔ سامانه‌های هوشمند را تکرارپذیر می‌کند.',
    items: []
  }
];

export function getGuideCollection(slug: string) {
  return guideCollections.find((collection) => collection.slug === slug);
}

export function articleCount(collection: GuideCollection) {
  return collection.items.filter((item) => item.kind === 'article').length;
}

export const guideKindLabels: Record<GuideItemKind, string> = {
  article: 'مقاله',
  interactive: 'محتوای تعاملی',
  checklist: 'چک‌لیست',
  tool: 'ابزار'
};
