<script lang="ts">
  import ArticleActions from '$lib/components/ArticleActions.svelte';
  import ArticleSeo from '$lib/components/ArticleSeo.svelte';
  import { getArticleModule } from '$lib/content';

  export let data;

  let currentSlug = data.article.slug;
  $: currentSlug = data.article.slug;
  $: module = getArticleModule(currentSlug);
  $: Content = module?.default;
</script>

<ArticleSeo article={data.article} />

<main class="article-page intl-article" dir="ltr">
  <article>
    <header class="article-header wrap">
      <div class="article-meta"><span>{data.article.category}</span><span>{data.article.faDate}</span><span>{data.article.readTime}</span></div>
      <h1>{data.article.title}</h1>
      <p>{data.article.excerpt}</p>
      <ArticleActions title={data.article.title} locale="en" />
    </header>

    {#if data.article.cover}
      <figure class="article-cover has-image">
        <img src={data.article.cover} alt="" />
        {#if data.article.coverCredit}<figcaption>{data.article.coverCredit}</figcaption>{/if}
      </figure>
    {:else}
      <div class="article-cover"><div><span>SOFT'N HARD WARE · RESTORED</span><b>{data.article.category.toUpperCase()}</b></div></div>
    {/if}

    <div class="prose">
      {#if Content}
        {#key currentSlug}
          <svelte:component this={Content} />
        {/key}
      {/if}
      {#if data.article.external}
        <a class="original-link" href={data.article.external} target="_blank" rel="noreferrer">View the original at {data.article.source ?? 'the source archive'} ↗</a>
      {/if}
      <ArticleActions title={data.article.title} locale="en" />
    </div>
  </article>
</main>
