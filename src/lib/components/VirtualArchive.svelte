<script lang="ts" generics="T">
  import { onMount, tick } from 'svelte';
  import type { Snippet } from 'svelte';

  type Props = {
    items: T[];
    item: Snippet<[T, number]>;
    pageClass: string;
    resetKey?: string;
    pageSize?: number;
    estimatedPageHeight?: number;
    emptyLabel?: string;
    statusLabel?: (first: number, last: number, total: number) => string;
  };

  let {
    items,
    item,
    pageClass,
    resetKey = '',
    pageSize = 10,
    estimatedPageHeight = 1800,
    emptyLabel = 'موردی با این انتخاب پیدا نشد.',
    statusLabel = (first, last, total) => `نمایش موارد ${first} تا ${last} از ${total}`
  }: Props = $props();

  let page = $state(0);
  let pageElement = $state<HTMLElement>();
  let topSentinel = $state<HTMLElement>();
  let bottomSentinel = $state<HTMLElement>();
  let measuredHeights = $state<Record<number, number>>({});
  let moving = false;

  const pageCount = $derived(Math.max(1, Math.ceil(items.length / pageSize)));
  const start = $derived(page * pageSize);
  const visibleItems = $derived(items.slice(start, start + pageSize));
  const firstVisible = $derived(items.length ? start + 1 : 0);
  const lastVisible = $derived(Math.min(start + pageSize, items.length));

  const topSpace = $derived.by(() => {
    let height = 0;
    for (let index = 0; index < page; index += 1) {
      height += measuredHeights[index] ?? estimatedPageHeight;
    }
    return height;
  });

  const bottomSpace = $derived.by(() => {
    let height = 0;
    for (let index = page + 1; index < pageCount; index += 1) {
      height += measuredHeights[index] ?? estimatedPageHeight;
    }
    return height;
  });

  $effect(() => {
    resetKey;
    items.length;
    page = 0;
    measuredHeights = {};
  });

  function rememberCurrentHeight() {
    const height = pageElement?.getBoundingClientRect().height ?? 0;
    if (height > 0 && measuredHeights[page] !== height) {
      measuredHeights = { ...measuredHeights, [page]: height };
    }
  }

  async function moveTo(nextPage: number) {
    if (moving || nextPage < 0 || nextPage >= pageCount || nextPage === page) return;

    moving = true;
    rememberCurrentHeight();
    page = nextPage;
    await tick();
    requestAnimationFrame(() => {
      moving = false;
    });
  }

  onMount(() => {
    const resizeObserver = new ResizeObserver(rememberCurrentHeight);
    if (pageElement) resizeObserver.observe(pageElement);

    const topObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && page > 0) void moveTo(page - 1);
      },
      { threshold: 0.01 }
    );

    const bottomObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && page < pageCount - 1) void moveTo(page + 1);
      },
      { rootMargin: '0px 0px 120px', threshold: 0.01 }
    );

    if (topSentinel) topObserver.observe(topSentinel);
    if (bottomSentinel) bottomObserver.observe(bottomSentinel);

    return () => {
      resizeObserver.disconnect();
      topObserver.disconnect();
      bottomObserver.disconnect();
    };
  });
</script>

<div class="virtual-archive">
  <div class="virtual-spacer" style:height="{topSpace}px" aria-hidden="true"></div>
  <span class="virtual-sentinel" bind:this={topSentinel} aria-hidden="true"></span>

  <div class={pageClass} bind:this={pageElement}>
    {#if items.length === 0}
      <p class="virtual-empty">{emptyLabel}</p>
    {:else}
      {#each visibleItems as current, index (`${resetKey}:${start + index}`)}
        {@render item(current, start + index)}
      {/each}
    {/if}
  </div>

  <span class="virtual-sentinel" bind:this={bottomSentinel} aria-hidden="true"></span>
  <div class="virtual-spacer" style:height="{bottomSpace}px" aria-hidden="true"></div>

  <span class="screen-reader-only" aria-live="polite">
    {statusLabel(firstVisible, lastVisible, items.length)}
  </span>
</div>
