import { dev } from '$app/environment';
import { error } from '@sveltejs/kit';
import { gpuReviews } from '$lib/gpu-review';
import { getLocalizedGuideCollection, getLocalizedGuideCollections } from '$lib/localized-guide-collections';

export const entries = () => getLocalizedGuideCollections('es').map(({ slug }) => ({ collection: slug }));
export function load({ params }: { params: { collection: string } }) {
  const published = getLocalizedGuideCollection('es', params.collection);
  if (published) return { kind: 'published' as const, collection: published };
  const collection = gpuReviews.es;
  if (!dev || params.collection !== collection.slug) error(404, 'Guide not found');
  return { kind: 'preview' as const, collection };
}
