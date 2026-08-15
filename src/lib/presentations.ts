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
    venue: 'محل برگزاری را وارد کنید',
    event: 'دوره DBA',
    organizer: 'نام برگزارکننده را وارد کنید',
    audience: 'مدیران و دانشجویان DBA',
    duration: 'دو روز · ۱۶ ساعت',
    slideCount: 114,
    version: 'نسخه ۱',
    // cover: '/slides/enterprise-ai-governance-dba/cover.webp',
    // pdf: '/slides/enterprise-ai-governance-dba/enterprise-ai-governance-dba-v1.pdf',
    topics: [
      'مدل عملیاتی حکمرانی و حق تصمیم',
      'مرز قلمرو حکمرانی و AI-washing',
      'حکمرانی مسئله و سبد سرمایه‌گذاری',
      'معماری، داده و تأمین‌کننده',
      'امنیت، مسئولیت و نظارت انسانی',
      'قرارداد، پذیرش و ارزیابی پروژه'
    ]
  }
];

export const findPresentation = (slug: string) =>
  presentations.find((presentation) => presentation.slug === slug);
