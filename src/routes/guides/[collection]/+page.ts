import { getArticleModule } from '$lib/content';
import { error } from '@sveltejs/kit';
import { getGuideCollection, guideCollections } from '$lib/guides';

export function entries() {
  return guideCollections.map((collection) => ({ collection: collection.slug }));
}

export async function load({ params }) {
  const collection = getGuideCollection(params.collection);
  if (!collection) error(404, 'مجموعهٔ فنی پیدا نشد.');
  return { collection, chapters: await loadChapters(collection) };
}

async function loadChapters(collection: { items: Array<{kind: string, id: string}> }) {
  return Object.fromEntries(await Promise.all(collection.items.filter(item => item.kind === 'article').map(async item => [item.id, (await getArticleModule(item.id))!.default])));
}
