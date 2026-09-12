<script context="module" lang="ts">
  import type { SearchItem } from '$lib/search.mjs';
</script>
<script lang="ts">
  import { onMount } from 'svelte';
  import { searchItems } from '$lib/search.mjs';
  import { loadSearchIndex } from '$lib/search-index.mjs';
  export let locale: 'fa' | 'en' | 'es';
  export let onclose: () => void;
  let dialog: HTMLDialogElement;
  let input: HTMLInputElement;
  let query = '';
  let items: SearchItem[] = [];
  let loading = true;
  let failed = false;
  $: title = locale === 'fa' ? 'جستجو در محتوای فارسی' : locale === 'en' ? 'Search English content' : 'Buscar contenido en español';
  $: results = searchItems(items, query).slice(0, 12);
  onMount(() => {
    dialog.showModal(); input.focus();
    const controller = new AbortController();
    const load = async () => {
      try {
        items = await loadSearchIndex(locale, controller.signal);
      } catch (error) { if (!controller.signal.aborted) failed = true; }
      finally { loading = false; }
    };
    load(); return () => controller.abort();
  });
</script>
<dialog bind:this={dialog} aria-labelledby="search-title" onclose={onclose} onkeydown={event => { if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); dialog.close(); } }} onclick={event => { if (event.target === dialog) dialog.close(); }}>
  <div class="search-panel">
    <form method="dialog"><h2 id="search-title">{title}</h2><button aria-label={locale === 'fa' ? 'بستن جستجو' : 'Close search'}>×</button></form>
    <label><span class="sr-only">{title}</span><input bind:this={input} bind:value={query} type="search" placeholder={title} /></label>
    <div class="search-results" aria-live="polite" aria-busy={loading}>
      {#if loading}<p>{locale === 'fa' ? 'در حال دریافت نمایه…' : locale === 'en' ? 'Loading…' : 'Cargando…'}</p>
      {:else if failed}<p>{locale === 'fa' ? 'دریافت نمایه ممکن نشد؛ دوباره تلاش کنید.' : locale === 'en' ? 'Could not load search. Please try again.' : 'No se pudo cargar la búsqueda. Inténtelo de nuevo.'}</p>
      {:else if !results.length}<p>{locale === 'fa' ? 'نتیجه‌ای پیدا نشد.' : locale === 'en' ? 'No results found.' : 'No se encontraron resultados.'}</p>
      {:else}{#each results as item}<a href={item.href} onclick={() => dialog.close()}><small>{item.type}</small><b>{item.title}</b><span>{item.excerpt}</span></a>{/each}{/if}
    </div>
  </div>
</dialog>
<style>
  dialog { width: min(740px,calc(100% - 24px)); max-height: 80dvh; padding: 0; margin: 8dvh auto auto; border: 1px solid var(--line); border-radius: 12px; color: var(--ink); background: var(--paper); }
  dialog::backdrop { background: rgba(1,18,22,.72); }
  form { display: flex; justify-content: space-between; align-items: center; padding: 12px 18px; gap: 14px; }
  h2 { margin: 0; font-size: 18px; } button { min-width: 44px; min-height: 44px; background: var(--soft); border: 1px solid var(--line); border-radius: 6px; color: var(--ink); cursor: pointer; }
  label { display: block; padding: 0 18px 12px; } input { box-sizing: border-box; width: 100%; padding: 12px; color: var(--ink); background: var(--bg); border: 1px solid var(--line); border-radius: 6px; }
  .search-results small { font-size: 12px; color: var(--link-ink); }
  .search-results b { font-size: 16px; }
  .search-results a span { font-size: 14px; }
  .search-results { max-height: 58dvh; overflow: auto; } .search-results a span { display: -webkit-box; -webkit-line-clamp: 2; line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
</style>
