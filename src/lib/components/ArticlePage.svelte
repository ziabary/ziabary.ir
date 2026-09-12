<script lang="ts">
  import '$lib/math.css';
  import { imageAttributes } from '$lib/images';
  import type { Component } from 'svelte';
  import type { ArticleMeta } from '$lib/content';
  import ArticleActions from './ArticleActions.svelte';
  import ArticleSeo from './ArticleSeo.svelte';
  import ArticleToc from './ArticleToc.svelte';
  import RelatedStream from './RelatedStream.svelte';
  import { formatDate } from '$lib/publication.mjs';
  import { headingSections, readingPosition } from '$lib/contents-navigation';
  export let article: ArticleMeta;
  export let Content: Component<{ headingPrefix?: string }>;
  let activeHeading = '';
  const followHeading = (id: string) => activeHeading = id;
  $: locale = article.lang;
  $: headings = article.headings ?? [];
  $: headingIds = headings.map(heading => heading.id);
  $: hasToc = article.toc !== false && (article.toc === true || headingSections(headings).length >= 3);
  $: base = locale === 'fa' ? '' : `/${locale}`;
  // Conflicting editorial dates are retained pending source verification (CONTENT-REVIEW.md).
  $: displayedDate = locale === 'fa' && article.faDate ? article.faDate : formatDate(article.date, locale);
</script>

<ArticleSeo {article} />
<svelte:head>{#if article.draft}<meta name="robots" content="noindex,follow" />{/if}</svelte:head>
<main class="article-page" class:intl-article={locale !== 'fa'} dir={locale === 'fa' ? 'rtl' : 'ltr'}>
  <article>
    <header class="article-header wrap">
      <a class="archive-back" href={`${base}/articles/`}>{locale === 'fa' ? 'همهٔ نوشته‌ها' : locale === 'en' ? 'All articles' : 'Todos los artículos'}</a>
      <div class="article-meta"><span>{article.category}</span><time datetime={article.date}>{displayedDate}</time>{#if article.updated}<time datetime={article.updated}>{locale === 'fa' ? 'بازبینی: ' : ''}{formatDate(article.updated, locale)}</time>{/if}<span>{article.readTime}</span></div>
      <h1>{article.title}</h1><p>{article.excerpt}</p><ArticleActions title={article.title} {locale} href={`${base}/articles/${article.slug}/`} />
    </header>
    {#if article.cover}<figure class="article-cover has-image"><img {...imageAttributes(article.cover, '(min-width: 1200px) 740px, calc(100vw - 32px)')} alt={article.title} fetchpriority="high" />{#if article.coverCredit}<figcaption>{article.coverCredit}</figcaption>{/if}</figure>{/if}
    <div class="article-reading-layout" class:with-toc={hasToc} use:readingPosition={{ ids: headingIds, onChange: followHeading }}>
      {#if hasToc}<ArticleToc {headings} {locale} bind:active={activeHeading} />{/if}
      <div class="prose article-body">
        {#key article.slug}<Content />{/key}
        {#if article.external}<a class="original-link" href={article.external} target="_blank" rel="noreferrer">{locale === 'fa' ? 'مطالعه نسخه کامل در' : locale === 'en' ? 'Published at' : 'Publicado en'} {article.source ?? 'Source'} ↗</a>{/if}
        <ArticleActions title={article.title} {locale} href={`${base}/articles/${article.slug}/`} />
      </div>
    </div>
  </article>
  <RelatedStream related={article.related ?? []} currentSlug={article.slug} {locale} />
</main>

<style>
  .archive-back { color: var(--link-ink); font-size: 13px; display: inline-block; margin-bottom: 16px; }
  .article-reading-layout { width: min(740px, calc(100% - 32px)); margin-inline: auto; }
  .article-body { width: 100%; max-width: 740px; padding: 0; margin: 0; min-width: 0; }
  .article-reading-layout :global(.article-toc) { margin-bottom: 24px; }
  @media (min-width: 1200px) {
    .article-reading-layout.with-toc { width: min(1020px, calc(100% - 64px)); display: grid; grid-template-columns: minmax(0,740px) 248px; gap: 32px; align-items: start; }
    .with-toc .article-body { grid-column: 1; grid-row: 1; }
    .article-reading-layout :global(.article-toc) { grid-column: 2; grid-row: 1; position: sticky; top: 102px; margin: 0; }
  }
</style>
