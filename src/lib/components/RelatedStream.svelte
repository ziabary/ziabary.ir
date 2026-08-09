<script lang="ts">
  import { onMount } from 'svelte';
  import { articles } from '$lib/content';
  export let related: string[] = [];

  let shown = 0;
  let sentinel: HTMLDivElement;
  $: items = related
    .slice(0, shown)
    .map((slug) => articles.find((article) => article.slug === slug))
    .filter(Boolean);
  $: next = articles.find((article) => article.slug === related[2]);

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && shown < Math.min(2, related.length)) {
          shown += 1;
        }
      },
      { rootMargin: '240px' }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  });
</script>

<section class="related-stream">
  <div class="stream-label">
    <span>مسیر پیشنهادی مطالعه</span>
    <small>ارتباط‌ها به‌صورت دستی انتخاب شده‌اند</small>
  </div>
  {#each items as article, index}
    {#if article}
      <article class="stream-item">
        <small>پیشنهاد {index + 1}</small>
        <h2>{article.title}</h2>
        <p>{article.excerpt}</p>
        <a class="button ghost" href="/articles/{article.slug}/">خواندن این نوشته</a>
      </article>
    {/if}
  {/each}
  <div bind:this={sentinel}></div>
  {#if shown >= 2 && next}
    <a class="stream-more" href="/articles/{next.slug}/">ادامه مسیر با «{next.title}» ←</a>
  {/if}
</section>
