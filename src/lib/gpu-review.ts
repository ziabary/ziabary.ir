import englishCollection from '../../content/guides/en/gpu-selection.json';
import spanishCollection from '../../content/guides/es/gpu-selection.json';

export type GpuReviewLocale = 'en' | 'es';
export type GpuReviewCollection = typeof englishCollection;
// The localized guide registry uses each manifest's editorial publication state.
export const gpuReviews = { en: englishCollection, es: spanishCollection };
export const isGpuReviewArticle = (slug: string, locale: GpuReviewLocale) =>
  gpuReviews[locale].items.some((item) => item.kind === 'article' && item.id === slug);
