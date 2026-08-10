<script lang="ts">
  import type { ArticleMeta } from '$lib/content';
  export let article: ArticleMeta;
  export let featured = false;
  export let locale: 'fa' | 'en' | 'es' = 'fa';

  $: base = locale === 'fa' ? '/articles' : `/${locale}/articles`;
  $: readMore = locale === 'fa' ? 'ادامه مطلب ←' : locale === 'es' ? 'Leer artículo →' : 'Read article →';
</script>

<article class:featured class="article-card">
  <div class:has-image={Boolean(article.cover)} class="card-art">
    {#if article.cover}
      <img src={article.cover} alt="" loading="lazy" />
    {/if}
    <span>{article.category}</span>
    {#if !article.cover}<i>{article.slug.includes('ai') ? 'AI' : '⌁'}</i>{/if}
  </div>
  <div class="card-body">
    <p>{article.faDate} · {article.readTime}</p>
    <h3><a href="{base}/{article.slug}/">{article.title}</a></h3>
    <span>{article.excerpt}</span>
    <a class="text-link" href="{base}/{article.slug}/">{readMore}</a>
  </div>
</article>
