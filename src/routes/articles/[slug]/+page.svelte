<script lang="ts">
  import { browser } from '$app/environment';
  import { page } from '$app/stores';
  import { tick } from 'svelte';
  import { allArticleMetadata, getArticleModule } from '$lib/content';
  import { draftReadingHref, hasDraftPreview } from '$lib/draft-preview.mjs';
  import ArticlePage from '$lib/components/ArticlePage.svelte';
  export let data;

  const draftSlugs = allArticleMetadata.filter(article => article.draft === true).map(article => article.slug);
  let readyDraftSlug = '';
  $: enabled = browser && hasDraftPreview($page.url.searchParams);
  $: draftModule = data.article.draft && enabled ? loadPreview(data.article.slug) : undefined;

  function loadPreview(slug: string) {
    readyDraftSlug = '';
    return getArticleModule(slug, 'fa').then(module => {
      if (module && data.article.slug === slug && enabled) readyDraftSlug = slug;
      return module;
    });
  }

  function previewLinks(node: HTMLElement, _slug: string) {
    const rewrite = () => {
      tick().then(() => {
        for (const link of node.querySelectorAll<HTMLAnchorElement>('a[href]')) {
          link.setAttribute('href', draftReadingHref(link.getAttribute('href') ?? '', draftSlugs));
        }
      });
    };
    rewrite();
    return { update: rewrite };
  }
</script>

<svelte:head>
  {#if data.article.draft && (!enabled || readyDraftSlug !== data.article.slug)}
    <title>پیش‌نویس یادداشت | مهران ضیابری</title>
    <meta name="robots" content="noindex,follow" />
    <link rel="canonical" href={`https://ziabary.ir/articles/${data.article.slug}/`} />
  {/if}
</svelte:head>

{#if !data.article.draft && data.Content}
  <ArticlePage article={data.article} Content={data.Content} />
{:else}
  {#if enabled}
    {#await draftModule}
      <main class="draft-gate wrap" aria-live="polite"><p>در حال آماده‌سازی پیش‌نمایش…</p></main>
    {:then module}
      {#if module}
        <div use:previewLinks={data.article.slug}>
          <aside class="draft-notice wrap"><strong>پیش‌نویس · در حال بازبینی</strong><a href="/articles/?show-drafts=true">بازگشت به نوشته‌ها و پیش‌نویس‌ها ←</a></aside>
          <ArticlePage article={data.article} Content={module.default} />
        </div>
      {/if}
    {:catch}
      <main class="draft-gate wrap"><h1>پیش‌نمایش بارگذاری نشد</h1><p>صفحه را دوباره بارگذاری کنید.</p></main>
    {/await}
  {:else}
    <main class="draft-gate wrap"><p class="eyebrow">در حال بازبینی</p><h1>این یادداشت هنوز منتشر نشده است</h1><a class="button ghost" href="/articles/">دیدن نوشته‌های منتشرشده</a></main>
  {/if}
{/if}

<style>
  .draft-gate{min-height:55vh;padding-block:80px}.draft-gate h1{font-size:clamp(28px,5vw,48px);line-height:1.7}.draft-notice{display:flex;flex-wrap:wrap;align-items:center;gap:12px 24px;padding-block:16px;border-bottom:1px solid var(--line);font-size:12px}.draft-notice strong{color:var(--muted)}.draft-notice a{color:var(--link-ink)}
</style>
