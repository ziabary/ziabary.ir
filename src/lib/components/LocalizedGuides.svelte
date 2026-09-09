<script lang="ts">
  import PageHero from '$lib/components/PageHero.svelte';
  import GuideCollectionsGrid from '$lib/components/GuideCollectionsGrid.svelte';
  import { guideCollections } from '$lib/guides';
  import { getLocalizedGuideCollection } from '$lib/localized-guide-collections';

  export let locale: 'en' | 'es';

  const copies = {
    en: {
      eyebrow: 'Technical knowledge for better decisions',
      title: 'Technical notes',
      lead: 'Connected collections of articles, guides, interactive tables and tools.',
      label: 'Technical collections',
      description: 'Technical collections by Mehran Ziabary on AI infrastructure, security, enterprise Linux, AI operators and AI platforms.'
    },
    es: {
      eyebrow: 'Conocimiento técnico para decidir mejor',
      title: 'Notas técnicas',
      lead: 'Colecciones de artículos, guías, tablas interactivas y herramientas.',
      label: 'Colecciones técnicas',
      description: 'Colecciones técnicas de Mehran Ziabary sobre infraestructura de IA, seguridad, Linux empresarial, operadores y plataformas de IA.'
    }
  } as const;

  $: copy = copies[locale];
  // Prefer an edition's published collection; retain introductions for the rest.
  $: collections = guideCollections.flatMap((collection) => {
    const published = getLocalizedGuideCollection(locale, collection.slug);
    if (published) return [published];
    const translation = collection.translations?.[locale];
    return translation ? [{ ...collection, ...translation, items: [] }] : [];
  });
</script>

<svelte:head>
  <title>{copy.title} | Mehran Ziabary</title>
  <meta name="description" content={copy.description} />
</svelte:head>

<main class="localized-guides" dir="ltr">
  <PageHero eyebrow={copy.eyebrow} title={copy.title} lead={copy.lead} />
  <GuideCollectionsGrid {collections} {locale} label={copy.label} />
</main>

<style>
  .localized-guides :global(.page-hero) { text-align: left; }
</style>
