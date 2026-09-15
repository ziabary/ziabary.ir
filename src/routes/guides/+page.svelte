<script lang="ts">
  import { browser } from '$app/environment';
  import { page } from '$app/stores';
  import PageHero from '$lib/components/PageHero.svelte';
  import GuideCollectionsGrid from '$lib/components/GuideCollectionsGrid.svelte';
  import { guideCollections, type GuideCollection } from '$lib/guides';
  import { hasDraftPreview } from '$lib/draft-preview.mjs';

  let draftCollection: GuideCollection | undefined;
  let loadingDraft = false;
  $: showDrafts = browser && hasDraftPreview($page.url.searchParams);
  $: if (showDrafts && !draftCollection && !loadingDraft) loadDraftCollection();
  $: visibleCollections = showDrafts && draftCollection
    ? [guideCollections[0], draftCollection, ...guideCollections.slice(1)]
    : guideCollections;

  async function loadDraftCollection() {
    loadingDraft = true;
    const module = await import('$lib/llm/guide');
    draftCollection = module.llmGuideCollection;
    loadingDraft = false;
  }
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

  <GuideCollectionsGrid collections={visibleCollections} label="مجموعه‌های فنی" />
</main>
