import { allArticleMetadata } from './content';
import groups from './translation-groups.json';
import { translationIndex, articlePath } from './translations.mjs';
import { guideCollections } from './guides';
import { getLocalizedGuideCollections } from './localized-guide-collections';
import { presentations } from './presentations';

export type Locale = 'fa' | 'en' | 'es';
export const locales: Locale[] = ['fa', 'en', 'es'];
export const nativeNames = { fa: 'فارسی', en: 'English', es: 'Español' };
const translations = translationIndex(allArticleMetadata, groups);
export const localeBase = (locale: Locale) => locale === 'fa' ? '' : `/${locale}`;
const sections = ['articles', 'guides', 'slides', 'media', 'resume', 'thought'];

export function equivalentPages(pathname: string): Array<{ locale: Locale; href: string }> {
  const path = pathname.replace(/^\/(en|es)(?=\/)/, '');
  if (path === '/' || sections.some(section => path === `/${section}/`)) {
    return locales.map(locale => ({ locale, href: `${localeBase(locale)}${path}` }));
  }
  if (path.startsWith('/articles/')) {
    for (const editions of translations.values()) {
      if (editions.length > 1 && editions.some(article => articlePath(article) === pathname)) {
        return editions.map(article => ({ locale: article.lang as Locale, href: articlePath(article) }));
      }
    }
  }
  if (path.startsWith('/guides/')) {
    const slug = path.split('/')[2];
    const editions = locales.filter(locale => (locale === 'fa' ? guideCollections : getLocalizedGuideCollections(locale)).some(guide => guide.slug === slug && guide.status === 'published'));
    const links = editions.map(locale => ({ locale, href: `${localeBase(locale)}${path}` }));
    return links.length > 1 && links.some(link => link.href === pathname) ? links : [];
  }
  if (path.startsWith('/slides/') && presentations.some(item => path === `/slides/${item.slug}/`)) {
    return locales.map(locale => ({ locale, href: `${localeBase(locale)}${path}` }));
  }
  return [];
}

export function otherLanguageSections(pathname: string, current: Locale) {
  const section = pathname.replace(/^\/(en|es)(?=\/)/, '').split('/')[1];
  const target = sections.includes(section) ? `/${section}/` : '/';
  const labels: Record<Locale, Record<string, string>> = {
    fa: { articles: 'نوشته‌های', guides: 'راهنماهای فنی', slides: 'اسلایدهای', media: 'بازتاب‌های', resume: 'رزومهٔ', thought: 'اندیشه به', home: 'صفحهٔ اصلی' },
    en: { articles: 'Articles in', guides: 'Technical guides in', slides: 'Presentations in', media: 'Media in', resume: 'Résumé in', thought: 'Thought in', home: 'Home in' },
    es: { articles: 'Artículos en', guides: 'Guías técnicas en', slides: 'Presentaciones en', media: 'Medios en', resume: 'Currículum en', thought: 'Pensamiento en', home: 'Inicio en' }
  };
  return locales.filter(locale => locale !== current).map(locale => ({ locale, href: `${localeBase(locale)}${target}`, label: `${labels[current][target === '/' ? 'home' : section]} ${nativeNames[locale]}` }));
}
