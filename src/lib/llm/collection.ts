import { llmEditionSlugs } from './edition-manifest';
import type { GuideCollection } from '$lib/guides';

export const llmGuideCollection: GuideCollection = {
  slug: 'llm',
  status: 'published',
  featured: true,
  articleCount: llmEditionSlugs('fa').length,
  title: 'راهنمای انتخاب مدل زبانی بزرگ و کوچک',
  subtitle: 'مدل زبانی مناسب ترجمه، دستیار اسناد و Agent را بر اساس زبان، حافظه، سخت‌افزار و هزینه انتخاب کنید؛ مقایسه مدل‌ها و راهنمای اجرای سازمانی.',
  eyebrow: 'مدل و استنتاج',
  image: '/images/guides/llm.png',
  imageAlt: 'مدل‌های زبانی در اندازه‌های مختلف، متصل به کاربردهای گفت‌وگو، کدنویسی و کار با اسناد',
  intro: 'این راهنما از مستندات سازندگان، نتایج منتشرشده و جمع‌بندی فنی استفاده می‌کند؛ شرایط و منابع هر مورد در جزئیات آمده است.',
  items: [
    { id: 'model-catalog', title: 'شناسنامهٔ مدل‌ها', subtitle: '', kind: 'interactive', href: '#model-catalog' },
    { id: 'model-suitability', title: 'تناسب مدل با کاربرد', subtitle: '', kind: 'interactive', href: '#model-suitability' },
    { id: 'hardware-feasibility', title: 'امکان اجرا روی سخت‌افزار', subtitle: '', kind: 'interactive', href: '#hardware-feasibility' },
    { id: 'serving-software', title: 'نرم‌افزارهای اجرا و سرویس‌دهی', subtitle: '', kind: 'interactive', href: '#serving-software' },
    { id: 'benchmarks', title: 'نتایج آزمون‌ها', subtitle: '', kind: 'interactive', href: '#benchmarks' },
    { id: 'specialized-models', title: 'مدل‌های کوچک و تخصصی مکمل', subtitle: '', kind: 'interactive', href: '#specialized-models' }
  ]
};

