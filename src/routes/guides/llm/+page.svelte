<script lang="ts">
  import { browser } from '$app/environment';
  import { page } from '$app/stores';
  import type { Component } from 'svelte';
  import { hasDraftPreview } from '$lib/draft-preview.mjs';

  let DraftPage: Component | undefined;
  let loading = false;
  $: enabled = browser && hasDraftPreview($page.url.searchParams);
  $: if (enabled && !DraftPage && !loading) loadDraftPage();

  async function loadDraftPage() {
    loading = true;
    const module = await import('$lib/components/LlmGuidePage.svelte');
    DraftPage = module.default;
    loading = false;
  }
</script>

<svelte:head>
  <title>صفحه پیدا نشد | مهران ضیابری</title>
  <meta name="robots" content="noindex,follow" />
  <link rel="canonical" href="https://ziabary.ir/guides/llm/" />
</svelte:head>

{#if enabled && DraftPage}
  <svelte:component this={DraftPage} />
{:else if enabled && loading}
  <main class="draft-loading wrap" aria-live="polite"><p>در حال آماده‌سازی پیش‌نمایش…</p></main>
{:else}
  <main class="not-found wrap">
    <p class="eyebrow">خطای ۴۰۴</p>
    <h1>صفحه پیدا نشد</h1>
    <p>نشانی را بررسی کنید یا به فهرست راهنماهای فنی برگردید.</p>
    <a class="button ghost" href="/guides/">دیدن راهنماهای فنی</a>
  </main>
{/if}

<style>
  .not-found,.draft-loading{min-height:55vh;padding-block:90px}.not-found{max-width:760px}.not-found .eyebrow{color:var(--teal);font-size:11px}.not-found h1{margin:10px 0;font-size:clamp(38px,7vw,72px)}.not-found>p:not(.eyebrow),.draft-loading p{color:var(--muted);line-height:2}.not-found a{display:inline-block;margin-top:20px}.draft-loading{display:grid;place-items:center}
</style>
