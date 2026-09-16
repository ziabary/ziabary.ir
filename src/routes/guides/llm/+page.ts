import { getArticleModule } from '$lib/content';
import { llmArticleSlugs } from '$lib/llm/guide';

export async function load() {
  const chapters = Object.fromEntries(await Promise.all(llmArticleSlugs.map(async slug => {
    const article = await getArticleModule(slug, 'fa');
    return [slug, article!.default];
  })));
  return { chapters };
}
