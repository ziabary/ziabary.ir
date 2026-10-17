import { isPublished } from './publication.mjs';

/**
 * Shared publication feed for the Persian home page and media archive.
 * @param {import('./content').ArticleMeta[]} articles
 * @param {import('./news').MediaItem[]} coverage
 * @param {string} [today]
 */
export function mediaPublications(articles, coverage, today) {
  const authored = articles
    .filter(article => article.lang === 'fa' && article.showInMedia && article.external && isPublished(article, today))
    .map(article => ({
      title: article.title,
      source: article.source ?? 'منبع اصلی',
      kind: article.mediaKind ?? 'یادداشت',
      summary: article.excerpt,
      url: article.external ?? '',
      internalUrl: `/articles/${article.slug}/`,
      date: article.date,
      faDate: article.faDate,
      coverImage: article.mediaCover ?? article.cover ?? null,
      coverImageAlt: article.mediaCoverAlt ?? article.title,
      ...(article.coverPosition ? { coverImagePosition: article.coverPosition } : {}),
      editorialNote: null
    }));

  return [...authored, ...coverage.filter(item => isPublished(item, today))]
    .sort((a, b) => b.date.localeCompare(a.date));
}
