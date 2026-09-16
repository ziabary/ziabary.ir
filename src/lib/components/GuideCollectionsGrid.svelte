<script lang="ts">
  import { dev } from '$app/environment';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { hasLlmPreview } from '$lib/draft-preview.mjs';
  import GuideCollectionCard from '$lib/components/GuideCollectionCard.svelte';
  import type { GuideCollection } from '$lib/guides';
  import { getLocalizedGuideCollection } from '$lib/localized-guide-collections';
  import { gpuReviews } from '$lib/gpu-review';

  export let collections: GuideCollection[];
  export let locale: 'fa' | 'en' | 'es' = 'fa';
  export let label: string;
  let mounted = false;
  onMount(() => { mounted = true; });
  $: visibleCollections = collections.filter(collection => collection.slug !== 'llm' || (locale === 'fa' && mounted && hasLlmPreview($page.url.searchParams)));
</script>

<section class="wrap guide-collections" aria-label={label} dir={locale === 'fa' ? 'rtl' : 'ltr'}>
  {#each visibleCollections as collection (collection.slug)}
    {@const preview = dev && locale !== 'fa' && collection.slug === 'gpu-selection' && gpuReviews[locale].draft}
    <GuideCollectionCard {collection} {locale} {preview}
      href={collection.slug === 'llm' ? '/guides/llm/?show-drafts=true' : collection.status === 'draft' && locale === 'fa'
        ? `/guides/${collection.slug}/?show-drafts=true`
        : locale === 'fa'
          ? `/guides/${collection.slug}/`
          : preview || getLocalizedGuideCollection(locale, collection.slug)
            ? `/${locale}/guides/${collection.slug}/`
            : null} />
  {/each}
</section>

<style>
  .guide-collections {
    padding-block: 24px 80px;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 18px;
  }

  .guide-collections :global(.guide-collection-card:first-child),
  .guide-collections :global(.guide-collection-card.featured) {
    grid-column: 1 / -1;
    aspect-ratio: 21 / 9;
  }

  @media (max-width: 780px) {
    .guide-collections { grid-template-columns: 1fr; }
    .guide-collections :global(.guide-collection-card:first-child),
    .guide-collections :global(.guide-collection-card.featured) {
      grid-column: auto;
      aspect-ratio: auto;
    }
  }
</style>
