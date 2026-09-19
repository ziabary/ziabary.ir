import { error } from '@sveltejs/kit';
import { dev } from '$app/environment';
import { allArticleMetadata, articles, getArticle, getArticleModule } from '$lib/content';
import { llmEditionSlugs } from '$lib/llm/edition-manifest';
import { isGpuReviewArticle } from '$lib/gpu-review';

export function entries() {
  return [...articles, ...allArticleMetadata.filter(article => article.draft && llmEditionSlugs('en').some(slug => slug === article.slug))].filter((article) => article.lang === 'en').map((article) => ({ slug: article.slug }));
}

export async function load({ params }) {
  const article = getArticle(params.slug) ?? allArticleMetadata.find(article => article.lang === 'en' && article.slug === params.slug && article.draft && llmEditionSlugs('en').some(slug => slug === article.slug)) ??
    (dev && isGpuReviewArticle(params.slug, 'en') ? (await getArticleModule(params.slug))?.metadata : undefined);
  if (!article || article.lang !== 'en') error(404, 'Article not found');
  return { article, Content: article.draft ? undefined : (await getArticleModule(params.slug, 'en'))!.default };
}
