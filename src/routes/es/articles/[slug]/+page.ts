import { dev } from '$app/environment';
import { isGpuReviewArticle } from '$lib/gpu-review';
import { error } from '@sveltejs/kit';
import { allArticleMetadata, articles, getArticle, getArticleModule } from '$lib/content';

export function entries() {
  return [...articles, ...allArticleMetadata.filter(article => article.draft === true)].filter((article) => article.lang === 'es').map((article) => ({ slug: article.slug }));
}

export async function load({ params }) {
  const article = getArticle(params.slug, 'es') ?? allArticleMetadata.find(article => article.lang === 'es' && article.slug === params.slug && article.draft === true) ??
    (dev && isGpuReviewArticle(params.slug, 'es') ? (await getArticleModule(params.slug, 'es'))?.metadata : undefined);
  if (!article || article.lang !== 'es') error(404, 'Artículo no encontrado');
  return { article, Content: article.draft ? undefined : (await getArticleModule(params.slug, 'es'))!.default };
}
