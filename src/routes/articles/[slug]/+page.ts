import { error } from '@sveltejs/kit';
import { articles, getArticle, getArticleModule } from '$lib/content';

export function entries() {
  return articles.filter((article) => article.lang === 'fa').map((article) => ({ slug: article.slug }));
}

export async function load({ params }) {
  const article = getArticle(params.slug);
  if (!article || article.lang !== 'fa') error(404, 'Article not found');
  return { article, Content: (await getArticleModule(params.slug, 'fa'))!.default };
}
