<script lang="ts">
  import { articles } from '$lib/content';
  export let related: string[] = [];
  export let currentSlug = '';

  $: resolved = related
    .filter((slug) => slug !== currentSlug)
    .map((slug) => articles.find((article) => article.slug === slug))
    .filter(Boolean);
  $: items = resolved.slice(0, 2);
  $: next = resolved[2];
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
        <a class="button ghost" href={`/articles/${article.slug}/`}>خواندن این نوشته</a>
      </article>
    {/if}
  {/each}
  {#if next}
    <a class="stream-more" href={`/articles/${next.slug}/`}>ادامه مسیر با «{next.title}» ←</a>
  {/if}
</section>
