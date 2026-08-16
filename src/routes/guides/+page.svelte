<script lang="ts">
  import PageHero from '$lib/components/PageHero.svelte';
  import GuideCollectionCard from '$lib/components/GuideCollectionCard.svelte';
  import { guideCollections } from '$lib/guides';
</script>

<svelte:head>
  <title>فنی‌جات | مهران ضیابری</title>
  <meta name="description" content="مجموعه‌های فنی مهران ضیابری درباره زیرساخت هوش مصنوعی، امنیت، سیستم‌عامل، اپراتور و سکوی هوش مصنوعی." />
</svelte:head>

<main>
  <PageHero
    eyebrow="دانش فنی، در مسیر تصمیم"
    title="فنی‌جات"
    lead="مجموعه‌هایی پیوسته از مقاله، راهنما، جدول تعاملی و ابزار."
  />

  <section class="wrap guide-collections" aria-label="مجموعه‌های فنی">
    {#each guideCollections as collection}
      <GuideCollectionCard {collection} />
    {/each}
  </section>
</main>

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
