<script lang="ts">
  import { browser } from '$app/environment';
  import { page } from '$app/stores';
  import { getGuidePreviewCollection } from '$lib/guides';
  import { getArticleModule } from '$lib/content';
  import { hasDraftPreview } from '$lib/draft-preview.mjs';
  import GuidePage from '$lib/components/GuidePage.svelte';
  export let data;
  const previewRequests = new Map<string, ReturnType<typeof loadPreview>>();
  $: preview = browser && hasDraftPreview($page.url.searchParams);
  // Reading-position URL updates must not recreate the preview and close its lessons.
  $: previewData = preview ? previewRequest(data.collection.slug) : undefined;
  function previewRequest(slug: string) {
    let request = previewRequests.get(slug);
    if (!request) {
      request = loadPreview(slug);
      previewRequests.set(slug, request);
    }
    return request;
  }
  async function loadPreview(slug: string) {
    const collection = getGuidePreviewCollection(slug);
    if (!collection) throw new Error('Collection not found');
    const chapters = Object.fromEntries(await Promise.all(collection.items.filter(item => item.kind === 'article').map(async item => [item.id, (await getArticleModule(item.id, 'fa'))!.default])));
    return { collection, chapters };
  }
</script>
{#if preview}
  {#await previewData}
    <main class="wrap preview-message" aria-live="polite">در حال آماده‌سازی پیش‌نمایش…</main>
  {:then result}
    {#if result}
      <aside class="wrap preview-notice"><strong>پیش‌نمایش مجموعه · شامل پیش‌نویس‌ها</strong><a href="/guides/?show-drafts=true">بازگشت به فنی‌جات ←</a></aside>
      <GuidePage collection={result.collection} chapters={result.chapters} preview />
    {/if}
  {:catch}
    <main class="wrap preview-message">پیش‌نمایش بارگذاری نشد. صفحه را دوباره بارگذاری کنید.</main>
  {/await}
{:else}
  <GuidePage collection={data.collection} chapters={data.chapters} />
{/if}

<style>
  .preview-message { min-height: 45vh; padding-block: 70px; }
  .preview-notice { display: flex; flex-wrap: wrap; gap: 12px 24px; padding-block: 16px; border-bottom: 1px solid var(--line); font-size: 13px; }
  .preview-notice strong { color: var(--muted); }
  .preview-notice a { color: var(--link-ink); }
</style>
