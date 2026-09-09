import { dev } from '$app/environment';
import { isGpuReviewArticle } from '$lib/gpu-review';
import { error } from '@sveltejs/kit';
import { articles, getArticle, getArticleModule } from '$lib/content';

export function entries() {
  return articles.filter((article) => article.lang === 'es').map((article) => ({ slug: article.slug }));
}

export function load({ params }) {
  const article = getArticle(params.slug) ??
    (dev && isGpuReviewArticle(params.slug, 'es') ? getArticleModule(params.slug)?.metadata : undefined);
  if (!article || article.lang !== 'es') error(404, 'Artículo no encontrado');
  return { article };
}
