<script lang="ts">
  import ArticleActions from '$lib/components/ArticleActions.svelte';
  import { getArticleModule } from '$lib/content';

  export let data;
  const module = getArticleModule(data.article.slug);
  const Content = module?.default;
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
      <ArticleActions title={data.article.title} locale="en" />
    </header>

    <div class="article-cover"><div><span>SOFT'N HARD WARE · RESTORED</span><b>{data.article.category.toUpperCase()}</b></div></div>

    <div class="prose">
      {#if Content}<svelte:component this={Content} />{/if}
      {#if data.article.external}
        <a class="original-link" href={data.article.external} target="_blank" rel="noreferrer">View the archived original at {data.article.source ?? 'the Internet Archive'} ↗</a>
      {/if}
      <ArticleActions title={data.article.title} locale="en" />
    </div>
  </article>
</main>
