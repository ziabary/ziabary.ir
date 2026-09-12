import englishCollection from '../../docs/drafts/gpu-selection-en/collection.json';
import spanishCollection from '../../docs/drafts/gpu-selection-es/collection.json';

export type GpuReviewLocale = 'en' | 'es';
export type GpuReviewCollection = typeof englishCollection;
// The localized guide registry uses each manifest's editorial publication state.
export const gpuReviews = { en: englishCollection, es: spanishCollection };
export const isGpuReviewArticle = (slug: string, locale: GpuReviewLocale) =>
  gpuReviews[locale].items.some((item) => item.kind === 'article' && item.id === slug);
