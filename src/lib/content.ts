export type ArticleMeta = {
  title: string;
  slug: string;
  lang: 'fa' | 'en' | 'es';
  date: string;
  faDate: string;
  category: string;
  excerpt: string;
  readTime: string;
  related: string[];
  cover?: string;
  external?: string;
  source?: string;
  showInMedia?: boolean;
  mediaKind?: string;
  draft?: boolean;
};

type MarkdownModule = {
  default: Component;
  metadata: ArticleMeta;
};

const modules = import.meta.glob<MarkdownModule>('/src/lib/content/articles/*.md', {
  eager: true
});

export const articleModules = modules;

export const articles = Object.values(modules)
  .map((module) => module.metadata)
  .filter((article) => !article.draft)
  .sort((a, b) => b.date.localeCompare(a.date));

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export function getArticleModule(slug: string) {
  const entry = Object.entries(modules).find(([, module]) => module.metadata.slug === slug);
  return entry?.[1];
}
import type { Component } from 'svelte';
