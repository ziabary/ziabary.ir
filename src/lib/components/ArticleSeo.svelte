<script lang="ts">
  import type { ArticleMeta } from '$lib/content';

  export let article: ArticleMeta;

  const siteUrl = 'https://ziabary.ir';
  $: localePath = article.lang === 'fa' ? '' : `/${article.lang}`;
  $: canonicalUrl = `${siteUrl}${localePath}/articles/${article.slug}/`;
  $: imageUrl = article.cover ? new URL(article.cover, siteUrl).href : `${siteUrl}/android-chrome-512x512.png`;
  $: authorName = article.lang === 'fa' ? 'مهران ضیابری' : 'Mehran Ziabary';
  $: pageTitle = `${article.title} | ${authorName}`;
  $: ogLocale = article.lang === 'fa' ? 'fa_IR' : article.lang === 'es' ? 'es_ES' : 'en_US';
</script>

<svelte:head>
  <title>{pageTitle}</title>
  <meta name="description" content={article.excerpt} />
  <link rel="canonical" href={canonicalUrl} />

  <meta property="og:type" content="article" />
  <meta property="og:site_name" content={authorName} />
  <meta property="og:locale" content={ogLocale} />
  <meta property="og:title" content={article.title} />
  <meta property="og:description" content={article.excerpt} />
  <meta property="og:url" content={canonicalUrl} />
  <meta property="og:image" content={imageUrl} />
  <meta property="og:image:alt" content={article.title} />
  <meta property="article:published_time" content={article.date} />
  {#if article.updated}<meta property="article:modified_time" content={article.updated} />{/if}
  <meta property="article:section" content={article.category} />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={article.title} />
  <meta name="twitter:description" content={article.excerpt} />
  <meta name="twitter:image" content={imageUrl} />
  <meta name="twitter:image:alt" content={article.title} />
</svelte:head>
