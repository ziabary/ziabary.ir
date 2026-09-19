<script lang="ts">
  import { allArticleMetadata, articles } from '$lib/content';
  import { withDraftPreview } from '$lib/draft-preview.mjs';
  export let related: string[] = [];
  export let currentSlug = '';
  export let locale: 'fa' | 'en' | 'es' = 'fa';
  export let includeDrafts = false;

  $: candidates = includeDrafts ? [...articles, ...allArticleMetadata.filter(article => article.draft === true)] : articles;

  $: resolved = related
    .filter((slug) => slug !== currentSlug)
    .map((slug) => candidates.find((article) => article.slug === slug))
    .filter(article => article?.lang === locale);
  $: items = resolved.slice(0, 2);
  $: next = resolved[2];

  function articleHref(article: { slug: string; draft?: boolean }) {
    const path = `${locale === 'fa' ? '' : `/${locale}`}/articles/${article.slug}/`;
    return article.draft ? withDraftPreview(path) : path;
  }
</script>

<section class="related-stream">
  <div class="stream-label">
    <span>{locale === 'fa' ? 'مسیر پیشنهادی مطالعه' : locale === 'en' ? 'Related reading' : 'Lecturas relacionadas'}</span>
  </div>
  {#each items as article, index}
    {#if article}
      <article class="stream-item">
        <small>{article.draft ? {fa:'پیش‌نویس · در حال بازبینی',en:'Draft · under review',es:'Borrador · en revisión'}[locale] : locale === 'fa' ? 'مطالعهٔ مرتبط' : locale === 'en' ? 'Related reading' : 'Lectura relacionada'}</small>
        <h2>{article.title}</h2>
        <p>{article.excerpt}</p>
        <a class="button ghost" href={articleHref(article)}>{locale === 'fa' ? 'خواندن این نوشته' : locale === 'en' ? 'Read article' : 'Leer artículo'}</a>
      </article>
    {/if}
  {/each}
  {#if next}
    <a class="stream-more" href={articleHref(next)}>{next.title} {locale === 'fa' ? '←' : '→'}</a>
  {/if}
</section>
