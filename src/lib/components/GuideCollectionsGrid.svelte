<script lang="ts">
  import { dev } from '$app/environment';
  import GuideCollectionCard from '$lib/components/GuideCollectionCard.svelte';
  import type { GuideCollection } from '$lib/guides';
  import { getLocalizedGuideCollection } from '$lib/localized-guide-collections';
  import { gpuReviews } from '$lib/gpu-review';

  export let collections: GuideCollection[];
  export let locale: 'fa' | 'en' | 'es' = 'fa';
  export let label: string;
</script>

<section class="wrap guide-collections" aria-label={label} dir={locale === 'fa' ? 'rtl' : 'ltr'}>
  {#each collections as collection (collection.slug)}
    {@const preview = dev && locale !== 'fa' && collection.slug === 'gpu-selection' && gpuReviews[locale].draft}
    <GuideCollectionCard {collection} {locale} {preview}
      href={locale === 'fa' ? `/guides/${collection.slug}/` : preview || getLocalizedGuideCollection(locale, collection.slug) ? `/${locale}/guides/${collection.slug}/` : null} />
  {/each}
</section>

<style>
  .guide-collections {
    padding-block: 24px 80px;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 18px;
  }

  .guide-collections :global(.guide-collection-card:first-child) {
    grid-column: 1 / -1;
    aspect-ratio: 21 / 9;
  }

  @media (max-width: 780px) {
    .guide-collections { grid-template-columns: 1fr; }
    .guide-collections :global(.guide-collection-card:first-child) {
      grid-column: auto;
      aspect-ratio: auto;
    }
  }
</style>
