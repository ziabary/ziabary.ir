<script lang="ts">
  import ArticleActions from '$lib/components/ArticleActions.svelte';
  import { getArticleModule } from '$lib/content';

  export let data;

  let currentSlug = data.article.slug;
  $: currentSlug = data.article.slug;
  $: module = getArticleModule(currentSlug);
  $: Content = module?.default;
</script>

<svelte:head>
  <title>{data.article.title} | Mehran Ziabary</title>
  <meta name="description" content={data.article.excerpt} />
</svelte:head>

<main class="article-page intl-article" dir="ltr">
  <article>
    <header class="article-header wrap">
      <div class="article-meta"><span>{data.article.category}</span><span>{data.article.faDate}</span><span>{data.article.readTime}</span></div>
      <h1>{data.article.title}</h1>
      <p>{data.article.excerpt}</p>
      <ArticleActions title={data.article.title} locale="es" />
    </header>

    {#if data.article.cover}
      <figure class="article-cover has-image">
        <img src={data.article.cover} alt="" />
        {#if data.article.coverCredit}<figcaption>{data.article.coverCredit}</figcaption>{/if}
      </figure>
    {:else}
      <div class="article-cover"><div><span>EDICIÓN INTERNACIONAL</span><b>{data.article.category.toUpperCase()}</b></div></div>
    {/if}

    <div class="prose">
      {#if Content}
        {#key currentSlug}
          <svelte:component this={Content} />
        {/key}
      {/if}
      {#if data.article.external}
        <a class="original-link" href={data.article.external} target="_blank" rel="noreferrer">Ver el original en {data.article.source ?? 'el archivo de origen'} ↗</a>
      {/if}
      <ArticleActions title={data.article.title} locale="es" />
    </div>
  </article>
</main>
