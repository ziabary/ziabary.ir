import englishCollection from '../../docs/drafts/gpu-selection-en/collection.json';
import spanishCollection from '../../docs/drafts/gpu-selection-es/collection.json';

export type GpuReviewLocale = 'en' | 'es';
export type GpuReviewCollection = typeof englishCollection;
// These manifests remain separate from the published guide registrations.
export const gpuReviews = { en: englishCollection, es: spanishCollection };
export const isGpuReviewArticle = (slug: string, locale: GpuReviewLocale) =>
  gpuReviews[locale].items.some((item) => item.kind === 'article' && item.id === slug);
