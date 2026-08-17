<script lang="ts">
  import type { ArticleMeta } from '$lib/content';
  import PageSeo from '$lib/components/PageSeo.svelte';

  export let article: ArticleMeta;

  $: localePath = article.lang === 'fa' ? '' : `/${article.lang}`;
  $: authorName = article.lang === 'fa' ? 'مهران ضیابری' : 'Mehran Ziabary';
  $: pageTitle = `${article.title} | ${authorName}`;
</script>

<PageSeo
  title={pageTitle}
  description={article.excerpt}
  path={`${localePath}/articles/${article.slug}/`}
  image={article.cover ?? '/images/profile/mehran-ziabary-formal.png'}
  imageAlt={article.title}
  locale={article.lang}
  type="article"
  publishedDate={article.date}
  updatedDate={article.updated}
  articleSection={article.category}
/>

<svelte:head>
  <meta property="article:published_time" content={article.date} />
  {#if article.updated}<meta property="article:modified_time" content={article.updated} />{/if}
  <meta property="article:section" content={article.category} />
</svelte:head>
