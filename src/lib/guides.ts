import editorialGuideCollectionsContent from '../../content/guides/fa/collections.json';
import { getArticle } from '$lib/content';
import { collectionState } from './publication.mjs';
import { llmGuideCollection } from './llm/collection';

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
  status: 'draft' | 'planned' | 'published';
  featured?: boolean;
  articleCount?: number;
  title: string;
  subtitle: string;
  eyebrow: string;
  image: string;
  imageAlt: string;
  intro: string;
  items: GuideItem[];
  translations?: Partial<Record<'en' | 'es', {
    title: string;
    subtitle: string;
    eyebrow: string;
  }>>;
};

/**
 * The order of both collections and their items is editorial. Add new entries
 * exactly where they should appear; dates never reorder this list.
 *
 * `kind` deliberately supports non-article material such as a live comparison
 * table, checklist or tool. Those entries belong here without being published
 * in the general articles archive.
 */
const editorialGuideCollections: GuideCollection[] = editorialGuideCollectionsContent.map(collection => 'reference' in collection ? llmGuideCollection : collection as GuideCollection);

// Keep the editorial position of drafts without exposing their content, links or
// counts in public guides. Publishing the article makes this entry visible too.
export const guideCollections: GuideCollection[] = editorialGuideCollections.map((collection) => ({
  ...collection,
  ...collectionState(collection, getArticle) as Pick<GuideCollection, 'status' | 'items'>,
  ...(collection.status === 'draft' ? { status: 'draft' as const } : {})
}));

export function getGuideCollection(slug: string) {
  return guideCollections.find((collection) => collection.slug === slug);
}

export function articleCount(collection: GuideCollection) {
  return collection.articleCount ?? collection.items.filter((item) => item.kind === 'article').length;
}

export function nonArticleCount(collection: GuideCollection) {
  return collection.items.filter((item) => item.kind !== 'article').length;
}

export const guideKindLabels: Record<GuideItemKind, string> = {
  article: 'مقاله',
  interactive: 'محتوای تعاملی',
  checklist: 'چک‌لیست',
  tool: 'ابزار'
};
