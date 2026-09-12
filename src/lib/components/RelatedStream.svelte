<script lang="ts">
  import { articles } from '$lib/content';
  export let related: string[] = [];
  export let currentSlug = '';
  export let locale: 'fa' | 'en' | 'es' = 'fa';

  $: resolved = related
    .filter((slug) => slug !== currentSlug)
    .map((slug) => articles.find((article) => article.slug === slug))
    .filter(article => article?.lang === locale);
  $: items = resolved.slice(0, 2);
  $: next = resolved[2];
</script>

<section class="related-stream">
  <div class="stream-label">
    <span>{locale === 'fa' ? 'مسیر پیشنهادی مطالعه' : locale === 'en' ? 'Related reading' : 'Lecturas relacionadas'}</span>
  </div>
  {#each items as article, index}
    {#if article}
      <article class="stream-item">
        <small>{locale === 'fa' ? 'مطالعهٔ مرتبط' : locale === 'en' ? 'Related reading' : 'Lectura relacionada'}</small>
        <h2>{article.title}</h2>
        <p>{article.excerpt}</p>
        <a class="button ghost" href={`${locale === 'fa' ? '' : `/${locale}`}/articles/${article.slug}/`}>{locale === 'fa' ? 'خواندن این نوشته' : locale === 'en' ? 'Read article' : 'Leer artículo'}</a>
      </article>
    {/if}
  {/each}
  {#if next}
    <a class="stream-more" href={`${locale === 'fa' ? '' : `/${locale}`}/articles/${next.slug}/`}>{next.title} {locale === 'fa' ? '←' : '→'}</a>
  {/if}
</section>
