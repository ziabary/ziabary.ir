<script lang="ts" generics="T">
  import { tick } from 'svelte';
  import type { Snippet } from 'svelte';

  type Props = {
    items: T[];
    item: Snippet<[T, number]>;
    pageClass: string;
    resetKey?: string;
    pageSize?: number;
    locale?: 'fa' | 'en' | 'es';
    emptyLabel?: string;
    previousLabel?: string;
    nextLabel?: string;
    navigationLabel?: string;
    statusLabel?: (first: number, last: number, total: number) => string;
  };

  let {
    items,
    item,
    pageClass,
    resetKey = '',
    pageSize = 30,
    locale = 'fa',
    emptyLabel = 'موردی با این انتخاب پیدا نشد.',
    previousLabel = 'قبلی',
    nextLabel = 'بعدی',
    navigationLabel = 'صفحه‌بندی نتایج',
    statusLabel = (first, last, total) => `نمایش موارد ${first} تا ${last} از ${total}`
  }: Props = $props();

  let page = $state(0);
  let archiveElement = $state<HTMLElement>();

  const effectivePageSize = $derived(Math.min(30, Math.max(1, pageSize)));
  const pageCount = $derived(Math.max(1, Math.ceil(items.length / effectivePageSize)));
  const start = $derived(page * effectivePageSize);
  const visibleItems = $derived(items.slice(start, start + effectivePageSize));
  const firstVisible = $derived(items.length ? start + 1 : 0);
  const lastVisible = $derived(Math.min(start + pageSize, items.length));

  const pagination = $derived.by(() => {
    const visiblePages: number[] = [];

    for (let index = 0; index < pageCount; index += 1) {
      if (index === 0 || index === pageCount - 1 || Math.abs(index - page) <= 2) {
        visiblePages.push(index);
      }
    }

    const entries: Array<number | string> = [];
    visiblePages.forEach((value, index) => {
      const previous = visiblePages[index - 1];
      if (index > 0 && value - previous > 1) entries.push(`gap-${previous}-${value}`);
      entries.push(value);
    });
    return entries;
  });

  $effect(() => {
    resetKey;
    items.length;
    page = 0;
  });

  async function goToPage(nextPage: number) {
    if (nextPage < 0 || nextPage >= pageCount || nextPage === page) return;

    page = nextPage;
    await tick();

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    archiveElement?.scrollIntoView({
      behavior: reducedMotion ? 'auto' : 'smooth',
      block: 'start'
    });
  }
</script>

<div class="paginated-archive" bind:this={archiveElement}>
  <div class={pageClass}>
    {#if items.length === 0}
      <p class="pagination-empty">{emptyLabel}</p>
    {:else}
      {#each visibleItems as current, index (`${resetKey}:${start + index}`)}
        {@render item(current, start + index)}
      {/each}
    {/if}
  </div>

  {#if items.length > 0}
    <div class="pagination-footer">
      <p class:fa-num={locale === 'fa'} aria-live="polite">
        {statusLabel(firstVisible, lastVisible, items.length)}
      </p>

      {#if pageCount > 1}
        <nav class="pagination" aria-label={navigationLabel}>
          <button type="button" onclick={() => goToPage(page - 1)} disabled={page === 0}>{previousLabel}</button>

          {#each pagination as entry (entry)}
            {#if typeof entry === 'number'}
              <button
                type="button"
                class:active={entry === page}
                class:fa-num={locale === 'fa'}
                aria-current={entry === page ? 'page' : undefined}
                aria-label={`${locale === 'fa' ? 'صفحه' : locale === 'es' ? 'Página' : 'Page'} ${entry + 1}`}
                onclick={() => goToPage(entry)}
              >{entry + 1}</button>
            {:else}
              <span aria-hidden="true">…</span>
            {/if}
          {/each}

          <button type="button" onclick={() => goToPage(page + 1)} disabled={page === pageCount - 1}>{nextLabel}</button>
        </nav>
      {/if}
    </div>
  {/if}
</div>
