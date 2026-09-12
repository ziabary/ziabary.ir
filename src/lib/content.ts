import { compareArticles, dateOnly, isPublished } from './publication.mjs';
export type ArticleMeta = {
  id?: string;
  translationGroup?: string;
  toc?: 'auto' | boolean;
  headings?: Array<{ id: string; title: string; depth: number }>;
  legacyAnchors?: string[];
  title: string;
  slug: string;
  lang: 'fa' | 'en' | 'es';
  date: string;
  faDate: string;
  updated?: string;
  faUpdated?: string;
  category: string;
  topic?: string;
  format?: string;
  project?: string;
  excerpt: string;
  readTime: string;
  related: string[];
  cover?: string;
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

const metadata = import.meta.glob<ArticleMeta>('/src/lib/content/articles/*.md', {
  eager: true, import: 'metadata'
});

export const allArticleMetadata = Object.values(metadata).map(article => ({
  ...article, id: article.id ?? `${article.lang}:${article.slug}`, date: dateOnly(article.date),
  ...(article.updated ? { updated: dateOnly(article.updated) } : {})
}));
export const articles = allArticleMetadata.filter(article => isPublished(article)).sort(compareArticles);

export function getArticle(slug: string, locale?: string) {
  return articles.find((article) => article.slug === slug && (!locale || article.lang === locale));
}

const modules = import.meta.glob<MarkdownModule>('/src/lib/content/articles/*.md');
export const articleModules = modules;
export async function getArticleModule(slug: string, locale?: string) {
  const path = Object.keys(metadata).find(path => metadata[path].slug === slug && (!locale || metadata[path].lang === locale));
  return path ? modules[path]() : undefined;
}
import type { Component } from 'svelte';
