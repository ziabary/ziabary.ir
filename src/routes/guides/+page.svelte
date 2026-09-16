<script lang="ts">
  import PageHero from '$lib/components/PageHero.svelte';
  import GuideCollectionsGrid from '$lib/components/GuideCollectionsGrid.svelte';
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

  <GuideCollectionsGrid collections={guideCollections} label="مجموعه‌های فنی" />
</main>
