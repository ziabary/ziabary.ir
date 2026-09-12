import { getArticleModule } from '$lib/content';
import { dev } from '$app/environment';
import { error } from '@sveltejs/kit';
import { gpuReviews } from '$lib/gpu-review';
import { getLocalizedGuideCollection, getLocalizedGuideCollections } from '$lib/localized-guide-collections';

export const entries = () => getLocalizedGuideCollections('en').map(({ slug }) => ({ collection: slug }));
export async function load({ params }: { params: { collection: string } }) {
  const collection = gpuReviews.en;
  if (params.collection === collection.slug && (dev || !collection.draft)) {
    return { kind: 'gpu' as const, collection, chapters: await loadChapters(collection) };
  }
  const published = getLocalizedGuideCollection('en', params.collection);
  if (published) return { kind: 'published' as const, collection: published, chapters: await loadChapters(published) };
  error(404, 'Guide not found');
}

async function loadChapters(collection: { items: Array<{kind: string, id: string}> }) {
  return Object.fromEntries(await Promise.all(collection.items.filter(item => item.kind === 'article').map(async item => [item.id, (await getArticleModule(item.id))!.default])));
}
