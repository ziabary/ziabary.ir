import { error } from '@sveltejs/kit';
import { dev } from '$app/environment';
import { articles, getArticle, getArticleModule } from '$lib/content';
import { isGpuReviewArticle } from '$lib/gpu-review';

export function entries() {
  return articles.filter((article) => article.lang === 'en').map((article) => ({ slug: article.slug }));
}

export async function load({ params }) {
  const article = getArticle(params.slug) ??
    (dev && isGpuReviewArticle(params.slug, 'en') ? (await getArticleModule(params.slug))?.metadata : undefined);
  if (!article || article.lang !== 'en') error(404, 'Article not found');
  return { article, Content: (await getArticleModule(params.slug, 'en'))!.default };
}
