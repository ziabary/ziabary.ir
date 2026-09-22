import { llmTopics } from './llm/edition-manifest';
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

/** Preview equivalents stay out of public hreflang and the published translation index. */
export function previewEquivalentPages(pathname: string, params: URLSearchParams, hash = ''): Array<{locale: Locale; href: string}> {
  if (params.get('show-drafts') !== 'true') return [];
  const bare = pathname.replace(/^\/(en|es)(?=\/)/, '');
  const sourceLocale: Locale = pathname.startsWith('/en/') ? 'en' : pathname.startsWith('/es/') ? 'es' : 'fa';
  if (/^\/articles\/(?:page\/\d+\/)?$/.test(bare)) {
    const archiveParams = new URLSearchParams(params);
    archiveParams.delete('p');
    archiveParams.delete('page');
    archiveParams.delete('category');
    return locales.map(locale => ({ locale, href: `${localeBase(locale)}/articles/?${archiveParams}` }));
  }
  if (/^\/guides\/llm\/?$/.test(bare)) return locales.map(locale => {
    let fragment = hash;
    const chapter = llmTopics.find(topic => hash.slice(1) === topic[sourceLocale] || hash.slice(1).startsWith(topic[sourceLocale] + '--'));
    if (chapter) fragment = locale === sourceLocale ? hash : chapter.id === 'evaluation' && (sourceLocale === 'fa' || locale === 'fa') ? '#benchmarks' : '#' + chapter[locale];
    else if (hash && !['start','llm-notes','model-catalog','model-suitability','hardware-feasibility','serving-software','software-products','deployment-compatibility','benchmarks','specialized-models'].includes(hash.slice(1))) fragment = '';
    return {locale,href:`${localeBase(locale)}/guides/llm/?${params}${fragment}`};
  });
  const slug = bare.match(/^\/articles\/([^/]+)\/?$/)?.[1];
  const topic = llmTopics.find(topic => topic[sourceLocale] === slug);
  if (!topic) return [];
  const editionLocales = topic.id === 'evaluation' ? sourceLocale === 'fa' ? ['fa'] as Locale[] : ['en','es'] as Locale[] : locales;
  return editionLocales.flatMap(locale => {
    const article = allArticleMetadata.find(article => article.lang === locale && article.slug === topic[locale]);
    if (!article) return [];
    return [{locale,href:`${localeBase(locale)}/articles/${article.slug}/${article.draft ? '?show-drafts=true' : ''}${locale === sourceLocale ? hash : ''}`}];
  });
}
