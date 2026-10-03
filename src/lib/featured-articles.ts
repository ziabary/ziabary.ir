import type { ArticleMeta } from './content';

export type FeaturedArticle = ArticleMeta & {
  featured: true;
  featuredImage: string;
  featuredSubtitle: string;
};

const MAX_FEATURED_ARTICLES = 5;

/** Editors choose featured articles; the archive shows the five newest selections. */
export function featuredArticles(records: ArticleMeta[]): FeaturedArticle[] {
  const selected = records.filter((article) => article.featured === true);
  for (const article of selected) {
    if (!article.featuredImage || !article.featuredSubtitle || article.featuredImage === article.cover) {
      throw new Error(`Featured article needs a distinct image and subtitle: ${article.slug}`);
    }
  }
  return (selected as FeaturedArticle[])
    .sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug))
    .slice(0, MAX_FEATURED_ARTICLES);
}
