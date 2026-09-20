<script lang="ts">
  import { browser } from '$app/environment';
  import { tick, type Component } from 'svelte';
  import { page } from '$app/stores';
  import { replaceState } from '$app/navigation';
  import { loadChapter } from '$lib/chapter-loading';
  import { allArticleMetadata, type ArticleMeta } from '$lib/content';
  import { draftReadingHref, hasLlmPreview } from '$lib/draft-preview.mjs';
  import { imageAttributes } from '$lib/images';
  import ReadingShare from './ReadingShare.svelte';
  import '$lib/math.css';
  export let article: ArticleMeta;
  export let locale: 'fa' | 'en' | 'es' = 'fa';
  export let open = false;
  export let repeatTitle = false;
  export let href: string;
  export let standaloneHref: string;
  let root: HTMLElement;
  let Content: Component<{ headingPrefix?: string }> | undefined;
  let loading = false;
  let failed = false;
  let request: Promise<boolean> | undefined;
  const copies = {
    fa: { loading: 'در حال بارگذاری متن یادداشت…', error: 'متن یادداشت بارگذاری نشد. اتصال اینترنت را بررسی کنید و دوباره تلاش کنید.', retry: 'تلاش مجدد', retryNote: 'صفحه دوباره بارگذاری می‌شود و همین یادداشت باز می‌ماند.', standalone: 'مطالعهٔ صفحهٔ مستقل مقاله' },
    en: { loading: 'Loading the article…', error: 'The article could not be loaded. Check your connection and try again.', retry: 'Try again', retryNote: 'The page will reload with this article open.', standalone: 'Read the standalone article' },
    es: { loading: 'Cargando el artículo…', error: 'No se pudo cargar el artículo. Compruebe la conexión e inténtelo de nuevo.', retry: 'Reintentar', retryNote: 'La página se recargará con este artículo abierto.', standalone: 'Leer el artículo independiente' }
  };
  $: copy = copies[locale];
  $: if (browser && open && !Content && !loading && !failed) void load();
  function retry() {
    // Browsers cache a rejected module import for the life of the document.
    // A fresh document retries the same hashed article and its CSS/dependencies.
    const url = new URL(window.location.href);
    let fragment = '';
    try { fragment = decodeURIComponent(url.hash.slice(1)); } catch { /* Retry at the article if the fragment is malformed. */ }
    if (fragment !== article.slug && !fragment.startsWith(`${article.slug}--`)) url.hash = article.slug;
    replaceState(url, $page.state);
    window.location.reload();
  }
  export function load(): Promise<boolean> {
    if (Content) return Promise.resolve(true);
    if (request) return request;
    loading = true; failed = false;
    request = (async () => {
      try {
        Content = (await loadChapter(article.slug, locale))!.default;
        await tick();
        const drafts = allArticleMetadata.filter(a => a.lang === locale && a.draft).map(a => a.slug);
        for (const link of root.querySelectorAll<HTMLAnchorElement>('a[href]')) {
          link.setAttribute('href', draftReadingHref(link.getAttribute('href') ?? '', drafts, hasLlmPreview($page.url.searchParams)));
        }
        root.dispatchEvent(new CustomEvent('guide-chapter-loaded', { bubbles: true }));
        return true;
      } catch { failed = true; return false; }
      finally { loading = false; request = undefined; }
    })();
    return request;
  }
</script>
<div class="lazy-article" bind:this={root} aria-busy={loading} data-loaded={!!Content}>
  {#if loading}<p role="status" aria-live="polite">{copy.loading}</p>{/if}
  {#if failed}<div class="load-error"><p role="alert">{copy.error}</p><p class="retry-note">{copy.retryNote}</p><button type="button" onclick={retry}>{copy.retry}</button> <a href={standaloneHref}>{copy.standalone}</a></div>{/if}
  {#if Content}
    {#if article.cover}<img class="chapter-cover" {...imageAttributes(article.cover, '(min-width: 1200px) 740px, calc(100vw - 64px)')} alt="" loading="lazy" />{/if}
    {#if repeatTitle}<h3 class="chapter-title">{article.title}</h3>{/if}
    <div class="prose guide-prose"><Content headingPrefix={`${article.slug}--`} /><ReadingShare cover={article.cover} title={article.title} excerpt={article.excerpt} {href} {standaloneHref} {locale} /></div>
  {/if}
</div>
<style>
  .lazy-article{min-width:0}.chapter-cover{display:block;width:100%;height:auto;border-radius:8px;margin:0 0 22px}.chapter-title{margin:0 0 22px;font-size:clamp(21px,2.4vw,30px);line-height:1.8;text-wrap:pretty}.guide-prose{width:100%;max-width:740px;margin:0 auto;padding:0}.guide-prose :global([id]){scroll-margin-top:110px}.load-error{padding-block:12px}.retry-note{font-size:13px;color:var(--muted)}.load-error button{font:inherit;padding:8px 14px;color:var(--link-ink);background:var(--paper);border:1px solid var(--line);border-radius:6px;cursor:pointer}.load-error a{color:var(--link-ink);margin-inline:12px;font-size:14px}button:focus-visible{outline:2px solid var(--teal);outline-offset:3px}
</style>
