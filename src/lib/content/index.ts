import { applyPermanentDraftPolicy, compareArticles, dateOnly, isPublished } from '../publication.mjs';
import editorialCollections from '../../../content/guides/fa/collections.json';
export type ArticleMeta = {
  id?: string;
  translationGroup?: string;
  toc?: 'auto' | boolean;
  headings?: Array<{ id: string; title: string; depth: number }>;
  legacyAnchors?: string[];
  title: string;
  author?: string;
  slug: string;
  lang: 'fa' | 'en' | 'es';
  date: string;
  faDate: string;
  updated?: string;
  faUpdated?: string;
  category: string;
  series?: string;
  seriesOrder?: number;
  topic?: string;
  format?: string;
  project?: string;
  excerpt: string;
  readTime: string;
  related: string[];
  cover?: string;
  coverPosition?: string;
  mediaCover?: string;
  mediaCoverAlt?: string;
  featured?: boolean;
  featuredImage?: string;
  featuredSubtitle?: string;
  coverCredit?: string;
  external?: string;
  source?: string;
  showInMedia?: boolean;
  mediaKind?: string;
  draft?: boolean;
  status?: 'planned' | 'published';
};

type MarkdownModule = {
  default: Component<{ headingPrefix?: string }>;
  metadata: ArticleMeta;
};

const metadata = import.meta.glob<ArticleMeta>('/content/articles/{fa,en,es}/*/index.md', {
  eager: true, import: 'default', query: '?article-metadata'
});

// Reuse the manually curated course order; dates stay calendar dates.
const seriesPositions = new Map(editorialCollections.flatMap(collection => {
  if (!collection.slug || !collection.items) return [];
  return collection.items.map((item, index) => [`${collection.slug}:${item.id}`, index] as const);
}));

export const allArticleMetadata = Object.values(metadata).map(article => ({
  ...applyPermanentDraftPolicy(article), id: article.id ?? `${article.lang}:${article.slug}`, date: dateOnly(article.date),
  ...(article.series && seriesPositions.has(`${article.series}:${article.slug}`)
    ? { seriesOrder: seriesPositions.get(`${article.series}:${article.slug}`) } : {}),
  ...(article.updated ? { updated: dateOnly(article.updated) } : {})
}));
export const articles = allArticleMetadata.filter(article => isPublished(article)).sort(compareArticles);

export function getArticle(slug: string, locale?: string) {
  return articles.find((article) => article.slug === slug && (!locale || article.lang === locale));
}

const modules = import.meta.glob<MarkdownModule>('/content/articles/{fa,en,es}/*/index.md');
export const articleModules = modules;
export async function getArticleModule(slug: string, locale?: string) {
  const path = Object.keys(metadata).find(path => metadata[path].slug === slug && (!locale || metadata[path].lang === locale));
  return path ? modules[path]() : undefined;
}
import type { Component } from 'svelte';
