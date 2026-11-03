import spanishCollectionsContent from '../../content/guides/es/collections.json';
import englishCollectionsContent from '../../content/guides/en/collections.json';
import { getArticle } from '$lib/content';
import { guideCollections, type GuideCollection } from '$lib/guides';
import { gpuReviews } from '$lib/gpu-review';
import { llmCollection, llmEditionSlugs } from '$lib/llm/editions';

// Each edition has its own editorial selection and order. An introduction alone
// does not make a translated collection publishable.
const englishCollections: GuideCollection[] = englishCollectionsContent as GuideCollection[];

const spanishCollections: GuideCollection[] = spanishCollectionsContent as GuideCollection[];

export function getLocalizedGuideCollections(locale: 'en' | 'es'): GuideCollection[] {
  const gpu = gpuReviews[locale];
  const gpuCollections: GuideCollection[] = gpu.draft ? [] : [{
    ...gpu,
    status: 'published',
    items: gpu.items.map(item => ({
      ...item,
      kind: item.kind === 'article' ? 'article' : 'interactive',
      subtitle: getArticle(item.id)?.excerpt ?? '',
      href: item.kind === 'article' ? `/${locale}/articles/${item.id}/` : `#${item.id}`
    }))
  }];
  const llm = { ...llmCollection(locale), articleCount: llmEditionSlugs(locale).filter(slug => getArticle(slug, locale)).length };
  const published = [...gpuCollections, ...(llm.status === 'published' ? [llm] : []), ...(locale === 'en' ? englishCollections : spanishCollections)].map(collection => ({
    ...collection,
    items: collection.items.filter(item => item.kind !== 'article' || getArticle(item.id)?.lang === locale)
  })).filter(collection => collection.items.length > 0);
  const planned = guideCollections.filter(collection => collection.slug !== 'gpu-selection' && !published.some(item => item.slug === collection.slug)).flatMap(collection => {
    const translation = collection.translations?.[locale];
    return translation ? [{ ...collection, ...translation, intro: translation.subtitle, items: [], status: 'planned' as const }] : [];
  });
  return [...published, ...planned];
}

export function getLocalizedGuideCollection(locale: 'en' | 'es', slug: string) {
  return getLocalizedGuideCollections(locale).find(collection => collection.slug === slug);
}
