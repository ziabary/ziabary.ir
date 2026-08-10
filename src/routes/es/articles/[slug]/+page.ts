import { error } from '@sveltejs/kit';
import { articles, getArticle } from '$lib/content';

export function entries() {
  return articles.filter((article) => article.lang === 'es').map((article) => ({ slug: article.slug }));
}

export function load({ params }) {
  const article = getArticle(params.slug);
  if (!article || article.lang !== 'es') error(404, 'Artículo no encontrado');
  return { article };
}
