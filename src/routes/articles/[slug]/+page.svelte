<script lang="ts">
  import RelatedStream from '$lib/components/RelatedStream.svelte';
  import ArticleActions from '$lib/components/ArticleActions.svelte';
  import { getArticleModule } from '$lib/content';

  export let data;

  let currentSlug = data.article.slug;
  $: currentSlug = data.article.slug;
  $: module = getArticleModule(currentSlug);
  $: Content = module?.default;
</script>

<svelte:head><title>{data.article.title} | مهران ضیابری</title><meta name="description" content={data.article.excerpt} /></svelte:head>
<main class="article-page">
  <article>
    <header class="article-header wrap"><div class="article-meta"><span>{data.article.category}</span><span class="fa-num">انتشار: {data.article.faDate}</span>{#if data.article.updated && data.article.faUpdated}<span class="fa-num">آخرین بازبینی: {data.article.faUpdated}</span>{/if}<span class="fa-num">{data.article.readTime}</span></div><h1>{data.article.title}</h1><p>{data.article.excerpt}</p><ArticleActions title={data.article.title} /></header>
    {#if data.article.cover}
      <figure class="article-cover has-image"><img src={data.article.cover} alt={data.article.title} />{#if data.article.coverCredit}<figcaption>{data.article.coverCredit}</figcaption>{/if}</figure>
    {:else}
      <div class="article-cover"><div><span>{data.article.category}</span><b>{data.article.slug.includes('secure') ? 'ZTAI' : 'AI / SYSTEMS'}</b></div></div>
    {/if}
    <div class="prose">
      {#if Content}
        {#key currentSlug}
          <svelte:component this={Content} />
        {/key}
      {/if}
      {#if data.article.external}<a class="original-link" href={data.article.external} target="_blank" rel="noreferrer">مطالعه نسخه کامل در {data.article.source ?? 'ویرگول'} ↗</a>{/if}
      <ArticleActions title={data.article.title} />
    </div>
  </article>
  <RelatedStream related={data.article.related} currentSlug={data.article.slug} />
</main>
