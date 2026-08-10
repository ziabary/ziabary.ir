import { error } from '@sveltejs/kit';
import { getGuideCollection, guideCollections } from '$lib/guides';

export function entries() {
  return guideCollections.map((collection) => ({ collection: collection.slug }));
}

export function load({ params }) {
  const collection = getGuideCollection(params.collection);
  if (!collection) error(404, 'مجموعهٔ فنی پیدا نشد.');
  return { collection };
}
