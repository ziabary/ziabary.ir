import { dev } from '$app/environment';
import { llmEditionSlugs } from '$lib/llm/edition-manifest';
import { isGpuReviewArticle } from '$lib/gpu-review';
import { error } from '@sveltejs/kit';
import { allArticleMetadata, articles, getArticle, getArticleModule } from '$lib/content';

export function entries() {
  return [...articles, ...allArticleMetadata.filter(article => article.draft && llmEditionSlugs('es').some(slug => slug === article.slug))].filter((article) => article.lang === 'es').map((article) => ({ slug: article.slug }));
}

export async function load({ params }) {
  const article = getArticle(params.slug) ?? allArticleMetadata.find(article => article.lang === 'es' && article.slug === params.slug && article.draft && llmEditionSlugs('es').some(slug => slug === article.slug)) ??
    (dev && isGpuReviewArticle(params.slug, 'es') ? (await getArticleModule(params.slug))?.metadata : undefined);
  if (!article || article.lang !== 'es') error(404, 'Artículo no encontrado');
  return { article, Content: article.draft ? undefined : (await getArticleModule(params.slug, 'es'))!.default };
}
