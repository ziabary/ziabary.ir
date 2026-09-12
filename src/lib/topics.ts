import { articles, type ArticleMeta } from './content';
import type { Locale } from './editions';

// Editorial destinations: selection and order are manual, independent of translation groups.
export const topics = [
  { slug: 'governance', locale: 'fa', title: 'حکمرانی و سیاست‌گذاری', intro: 'از مسئولیت نهادها تا قواعد دسترسی به داده.', image: '/images/guides/ai-operator.webp', slugs: ['national-ai-organization-from-law-to-impact', 'ai-data-confidentiality-safe-processing', 'ai-operator-model-private-sector'] },
  { slug: 'infrastructure', locale: 'fa', title: 'زیرساخت و امنیت', intro: 'انتخاب سخت‌افزار، معماری سامانه و مرزهای اعتماد.', image: '/images/guides/zero-trust-ai.webp', slugs: ['choosing-gpu-for-ai', 'ztai-indirect-data-access', 'linux-distribution-as-security-governance'] },
  { slug: 'product', locale: 'fa', title: 'محصول و کسب‌وکار', intro: 'تجربهٔ ساخت محصول و سنجش ظرفیت اجرا.', image: '/images/guides/ai-platform.webp', slugs: ['ayar-hoomas-assistant-for-startups-and-investors', 'targoman-without-rent', 'investment-in-ai'] },
  { slug: 'society', locale: 'fa', title: 'فناوری و جامعه', intro: 'فناوری در نسبت با منابع، جامعه و انتخاب‌های ما.', image: '/images/articles/ai-cosmetic-surgery-or-chemotherapy/cover.webp', slugs: ['ai-cosmetic-surgery-or-chemotherapy', 'third-revolution-in-warfare', 'dynamic-password-fraud'] },
  { slug: 'infrastructure', locale: 'en', title: 'Infrastructure & security', intro: 'Hardware choices, operational boundaries and security architecture.', image: '/images/guides/zero-trust-ai.webp', slugs: ['choosing-gpu-for-ai-en', 'ztai-indirect-data-access-en', 'apache-mod-jk-log-lock'] },
  { slug: 'product', locale: 'en', title: 'Building products', intro: 'Research, public funding and the choices behind Targoman.', image: '/images/guides/ai-platform.webp', slugs: ['building-targoman-without-patronage'] },
  { slug: 'infrastructure', locale: 'es', title: 'Infraestructura y seguridad', intro: 'Elección de hardware, límites operativos y arquitectura de seguridad.', image: '/images/guides/zero-trust-ai.webp', slugs: ['choosing-gpu-for-ai-es', 'ztai-indirect-data-access-es', 'cuando-un-otp-por-sms-reduce-la-seguridad'] },
  { slug: 'product', locale: 'es', title: 'Construir productos', intro: 'Investigación, financiación pública y las decisiones detrás de Targoman.', image: '/images/guides/ai-platform.webp', slugs: ['construir-targoman-sin-padrinos'] }
] as const;

export const topicArticles = (topic: typeof topics[number]) => topic.slugs.flatMap(slug => articles.filter(a => a.lang === topic.locale && a.slug === slug));
export const topicPath = (topic: { slug: string; locale: string }) => `${topic.locale === 'fa' ? '' : '/' + topic.locale}/topics/${topic.slug}/`;
export const availableTopics = (locale: Locale) => topics.filter(topic => topic.locale === locale && topicArticles(topic).length);

// Preserve the original category; these aliases identify its topic only when unambiguous.
const categoryTopics: Record<string, string> = {
  'سیاست‌گذاری هوش مصنوعی': 'governance', 'تنظیم‌گری داده': 'governance', 'حکمرانی داده': 'governance', 'سیاست‌گذاری': 'governance',
  'امنیت': 'infrastructure', 'راهنمای فنی': 'infrastructure', 'زیرساخت هوش مصنوعی': 'infrastructure', 'حاکمیت زیرساخت': 'infrastructure',
  'Linux & Servers': 'infrastructure', 'Linux & Hardware': 'infrastructure', 'Artificial Intelligence': 'infrastructure', 'NLP': 'infrastructure', 'AI infrastructure': 'infrastructure', 'Security': 'infrastructure', 'Security · Architecture': 'infrastructure', 'Infraestructura de IA': 'infrastructure', 'Seguridad': 'infrastructure', 'Seguridad · Arquitectura': 'infrastructure',
  'محصول و فناوری': 'product', 'کسب‌وکار': 'product', 'ترگمان': 'product', 'AI · Field notes': 'product', 'IA · Experiencia': 'product',
  'اقتصاد و فناوری': 'society', 'فناوری و امنیت': 'society'
};
const overrides: Record<string, string> = {
  'ai-cosmetic-surgery-or-chemotherapy': 'society', 'investment-in-ai': 'product',
  'china-travelogue-part-1': 'society', 'china-travelogue-part-2': 'society', 'longest-bachelors-degree': 'society',
  'gitex-2025-analytical-travelogue': 'governance', 'elecomp-29-from-technology-to-synergy': 'product',
  'targoman-transformer-update': 'product', 'why-shamsa': 'product', 'dynamic-password-fraud': 'society'
};
const targoman = new Set(['targoman-without-rent', 'building-targoman-without-patronage', 'construir-targoman-sin-padrinos', 'google-used-targoman', 'seventy-million-words-a-day', 'targoman-transformer-update']);
export function classification(article: ArticleMeta) {
  return {
    topic: article.topic ?? overrides[article.slug] ?? categoryTopics[article.category],
    format: article.format ?? (article.category === 'سفرنامه' ? 'travelogue' : article.category === 'تجربه‌نگاری' ? 'narrative' : undefined),
    project: article.project ?? (targoman.has(article.slug) ? 'targoman' : undefined),
    legacyCategory: article.category
  };
}
