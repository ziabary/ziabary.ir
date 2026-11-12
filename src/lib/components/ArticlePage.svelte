<script lang="ts">
  import '$lib/math.css';
  import '$lib/lesson.css';
  import { imageAttributes } from '$lib/images';
  import type { Component } from 'svelte';
  import { browser } from '$app/environment';
  import { page } from '$app/stores';
  import { hasDraftPreview, withDraftPreview } from '$lib/draft-preview.mjs';
  import type { ArticleMeta } from '$lib/content';
  import ReadingShare from './ReadingShare.svelte';
  import ArticleSeo from './ArticleSeo.svelte';
  import ArticleToc from './ArticleToc.svelte';
  import RelatedStream from './RelatedStream.svelte';
  import { formatDate, isPublished } from '$lib/publication.mjs';
  import { getGuideCollection } from '$lib/guides';
  import { headingSections, readingPosition } from '$lib/contents-navigation';
  export let article: ArticleMeta;
  export let seo = true;
  export let Content: Component<{ headingPrefix?: string }>;
  let activeHeading = '';
  const followHeading = (id: string) => activeHeading = id;
  $: locale = article.lang;
  $: headings = article.headings ?? [];
  $: headingIds = headings.map(heading => heading.id);
  $: hasToc = article.toc !== false && (article.toc === true || headingSections(headings).length >= 3);
  $: base = locale === 'fa' ? '' : `/${locale}`;
  $: preview = browser && hasDraftPreview($page.url.searchParams);
  $: series = article.series ? getGuideCollection(article.series) : undefined;
  $: courseReadingHref = series?.slug === 'enterprise-ai-governance'
    ? `${base}/guides/${series.slug}/?view=continuous#${article.slug}`
    : undefined;
  // Conflicting editorial dates are retained pending source verification (CONTENT-REVIEW.md).
  $: displayedDate = locale === 'fa' && article.faDate ? article.faDate : formatDate(article.date, locale);
</script>

{#if seo}<ArticleSeo {article} />{/if}
<main class="article-page" class:intl-article={locale !== 'fa'} dir={locale === 'fa' ? 'rtl' : 'ltr'}>
  <article>
    <header class="article-header wrap">
      <a class="archive-back" href={preview ? withDraftPreview(`${base}/articles/`) : `${base}/articles/`}>{locale === 'fa' ? 'همهٔ نوشته‌ها' : locale === 'en' ? 'All articles' : 'Todos los artículos'}</a>
      <div class="article-meta"><span>{article.category}</span><time datetime={article.date}>{displayedDate}</time>{#if article.updated}<time datetime={article.updated}>{locale === 'fa' ? 'بازبینی: ' : ''}{formatDate(article.updated, locale)}</time>{/if}<span>{article.readTime}</span></div>
      <h1>{article.title}</h1><p>{article.excerpt}</p>
      {#if series}
        <div class="article-series-navigation">
          {#if series.tag}<a class="article-series" href={preview ? withDraftPreview(`${base}/guides/${series.slug}/`) : `${base}/guides/${series.slug}/`}>#{series.tag.replace(/\s+/g, '_')}</a>{/if}
          {#if courseReadingHref}<a class="button ghost series-reading-link" href={preview ? withDraftPreview(courseReadingHref) : courseReadingHref}>{locale === 'fa' ? 'مطالعهٔ پیوستهٔ همهٔ درس‌ها' : locale === 'en' ? 'Read all lessons together' : 'Leer todas las lecciones seguidas'} <span aria-hidden="true">{locale === 'fa' ? '←' : '→'}</span></a>{/if}
        </div>
      {/if}
    </header>
    {#if article.cover}<figure class="article-cover has-image"><img {...imageAttributes(article.cover, '(min-width: 1200px) 740px, calc(100vw - 32px)')} style:object-position={article.coverPosition ?? 'center'} alt={article.title} fetchpriority="high" />{#if article.coverCredit}<figcaption>{article.coverCredit}</figcaption>{/if}</figure>{/if}
    <div class="article-reading-layout" class:with-toc={hasToc} use:readingPosition={{ ids: headingIds, onChange: followHeading }}>
      {#if hasToc}<ArticleToc {headings} {locale} bind:active={activeHeading} />{/if}
      <div class="prose article-body" class:course-lesson={article.series === 'enterprise-ai-governance'}>
        {#key article.slug}<Content />{/key}
        {#if article.external}<a class="original-link" href={article.external} target="_blank" rel="noreferrer">{locale === 'fa' ? 'مطالعه نسخه کامل در' : locale === 'en' ? 'Published at' : 'Publicado en'} {article.source ?? 'Source'} ↗</a>{/if}
        <ReadingShare cover={article.cover} title={article.title} excerpt={article.excerpt} {locale} href={`${base}/articles/${article.slug}/`} />
      </div>
    </div>
    {#if isPublished(article)}<div data-community-slot data-post={`${base}/articles/${article.slug}/`} hidden></div>{/if}
  </article>
  <RelatedStream related={article.related ?? []} currentSlug={article.slug} {locale} includeDrafts={preview} />
</main>

<style>
  .article-series-navigation { display: flex; align-items: center; flex-wrap: wrap; gap: 12px 20px; margin-top: 16px; }
  .article-series { display: inline-block; color: var(--link-ink); font-size: 13px; line-height: 1.9; }
  .series-reading-link { display: inline-flex; align-items: center; gap: 8px; font-size: 13px; line-height: 1.9; }
  .archive-back { color: var(--link-ink); font-size: 13px; display: inline-block; margin-bottom: 16px; }
  .article-reading-layout { width: min(740px, calc(100% - 32px)); margin-inline: auto; }
  .article-body { width: 100%; max-width: 740px; padding: 0; margin: 0; min-width: 0; }
  .article-reading-layout :global(.article-toc) { margin-bottom: 24px; }
  .article-body :global(.editorial-update) { margin-block: 28px; padding: clamp(18px, 3vw, 26px); border: 1px solid var(--line); border-inline-start: 5px solid var(--teal); border-radius: 12px; background: var(--soft); color: var(--ink); scroll-margin-top: 100px; }
  .article-body :global(.editorial-update-heading) { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 16px; margin-bottom: 14px; font-size: 12px; }
  .article-body :global(.editorial-update-heading > span) { padding: 3px 10px; border: 1px solid var(--teal); border-radius: 6px; font-weight: 700; }
  .article-body :global(.editorial-update-heading time) { color: var(--muted); }
  .article-body :global(.editorial-update-title) { display: block; font-size: 19px; line-height: 1.9; }
  .article-body :global(.editorial-update p) { margin-block: 14px 0; font-size: 16px; text-align: start; overflow-wrap: anywhere; }
  .article-body :global(.editorial-update a) { color: var(--ink); font-weight: 600; text-decoration-color: var(--teal); }

  @media (min-width: 1200px) {
    .article-reading-layout.with-toc { width: min(1020px, calc(100% - 64px)); display: grid; grid-template-columns: minmax(0,740px) 248px; gap: 32px; align-items: start; }
    .with-toc .article-body { grid-column: 1; grid-row: 1; }
    .article-reading-layout :global(.article-toc) { grid-column: 2; grid-row: 1; position: sticky; top: 102px; margin: 0; }
  }
</style>
