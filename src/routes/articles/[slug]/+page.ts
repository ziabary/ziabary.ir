import { error } from '@sveltejs/kit';
import { allArticleMetadata, articles, getArticle, getArticleModule } from '$lib/content';

export function entries() {
  return [...articles, ...allArticleMetadata.filter(article => article.draft === true)]
    .filter((article) => article.lang === 'fa').map((article) => ({ slug: article.slug }));
}

export async function load({ params }) {
  const article = getArticle(params.slug, 'fa') ?? allArticleMetadata.find(article => article.slug === params.slug && article.lang === 'fa' && article.draft === true);
  if (!article || article.lang !== 'fa') error(404, 'Article not found');
  return { article, Content: article.draft ? undefined : (await getArticleModule(params.slug, 'fa'))!.default };
}
