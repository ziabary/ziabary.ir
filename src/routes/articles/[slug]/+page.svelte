<script lang="ts">
  import RelatedStream from '$lib/components/RelatedStream.svelte';
  import ArticleActions from '$lib/components/ArticleActions.svelte';
  import { getArticleModule } from '$lib/content';
  export let data;
  const module = getArticleModule(data.article.slug);
  const Content = module?.default;
</script>

<svelte:head><title>{data.article.title} | مهران ضیابری</title><meta name="description" content={data.article.excerpt} /></svelte:head>
<main class="article-page">
  <article>
    <header class="article-header wrap"><div class="article-meta"><span>{data.article.category}</span><span class="fa-num">{data.article.faDate}</span><span class="fa-num">{data.article.readTime}</span></div><h1>{data.article.title}</h1><p>{data.article.excerpt}</p><ArticleActions title={data.article.title} /></header>
    {#if data.article.cover}
      <figure class="article-cover has-image"><img src={data.article.cover} alt={data.article.title} /></figure>
    {:else}
      <div class="article-cover"><div><span>{data.article.category}</span><b>{data.article.slug.includes('secure') ? 'ZTAI' : 'AI / SYSTEMS'}</b></div></div>
    {/if}
    <div class="prose">
      {#if Content}<svelte:component this={Content} />{/if}
      {#if data.article.external}<a class="original-link" href={data.article.external} target="_blank" rel="noreferrer">مطالعه نسخه کامل در {data.article.source ?? 'ویرگول'} ↗</a>{/if}
      <ArticleActions title={data.article.title} />
    </div>
  </article>
  <RelatedStream related={data.article.related} />
</main>
