import { error } from '@sveltejs/kit';
import { articles, getArticle } from '$lib/content';

export function entries() {
  return articles.filter((article) => article.lang === 'en').map((article) => ({ slug: article.slug }));
}

export function load({ params }) {
  const article = getArticle(params.slug);
  if (!article || article.lang !== 'en') error(404, 'Article not found');
  return { article };
}
