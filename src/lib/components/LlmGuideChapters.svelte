<script lang="ts">
  import { getLlmI18n } from '$lib/llm/i18n/context';
  const i18n = getLlmI18n();
  const { t, locale, direction, numberFormat } = i18n;

  import type { Component } from 'svelte';
  import type { ArticleMeta } from '$lib/content';
  import { imageAttributes } from '$lib/images';
  import { formatDate } from '$lib/publication.mjs';
  import { llmBase, llmPath, llmCollection } from '$lib/llm/editions';
  import { page } from '$app/stores';
  import { draftReadingHref, hasLlmPreview } from '$lib/draft-preview.mjs';
  import { allArticleMetadata } from '$lib/content';
  import ReadingShare from './ReadingShare.svelte';
  import '$lib/math.css';
  export let articles: ArticleMeta[];
  export let chapters: Record<string, Component<{ headingPrefix?: string }>>;
  const numbers = new Intl.NumberFormat(numberFormat);
  const draftSlugs = allArticleMetadata.filter(article => article.lang === locale && article.draft).map(article => article.slug);
  function previewLinks(node: HTMLElement) {
    for (const link of node.querySelectorAll<HTMLAnchorElement>('a[href]')) {
      link.setAttribute('href', draftReadingHref(link.getAttribute('href') ?? '', draftSlugs, hasLlmPreview($page.url.searchParams)));
    }
  }
</script>

<section class="llm-chapters" id="llm-notes" aria-labelledby="llm-notes-title">
  <header class="notes-header">
    <div><h2 id="llm-notes-title">{t('LlmGuideChapters.1003')}</h2><p>{t('LlmGuideChapters.1004')}</p></div>
    <a class="button ghost" href="#model-catalog">{t('LlmGuideChapters.1005')}</a>
  </header>
  {#each articles as article, index}
    {@const Content = chapters[article.slug]}
    <article class="llm-chapter" id={article.slug}>
      <details class="chapter-details">
        <summary>
          <span class="chapter-number" aria-hidden="true">{numbers.format(index + 1).padStart(2, t('LlmGuideChapters.1006'))}</span>
          {#if article.cover}<img class="chapter-thumb" {...imageAttributes(article.cover, '120px')} alt="" loading="lazy" width="120" height="80" />{/if}
          <div class="chapter-summary">
            <span class="chapter-meta"><time datetime={article.date}>{formatDate(article.date, locale)}</time><span>{article.readTime}</span></span>
            <h3>{article.title}</h3><p>{article.excerpt}</p>
          </div>
          <span class="chapter-chevron" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M6 12h12M12 6v12" /></svg></span>
        </summary>
        <div class="chapter-content" use:previewLinks>
          <header class="chapter-intro">
            {#if article.cover}<img class="chapter-cover" {...imageAttributes(article.cover, '(min-width: 1200px) 740px, calc(100vw - 64px)')} alt="" loading="lazy" />{/if}
            <h3 class="chapter-title">{article.title}</h3>
          </header>
          {#if Content}<div class="prose guide-prose"><Content headingPrefix={`${article.slug}--`} /><ReadingShare cover={article.cover} title={article.title} excerpt={article.excerpt} href={`${llmPath(locale)}${llmCollection(locale).status !== 'published' ? '?show-drafts=true' : ''}#${article.slug}`} standaloneHref={`${llmBase(locale)}/articles/${article.slug}/${article.draft ? '?show-drafts=true' : ''}`} {locale} /></div>{/if}
          <a class="back-to-tables" href="#model-catalog">{t('LlmGuideChapters.1007')}</a>
        </div>
      </details>
    </article>
  {/each}
</section>

<style>
  .chapter-cover{display:block;width:100%;height:auto;border-radius:8px;margin:0 0 22px}
  .chapter-title{margin:0 0 22px;font-size:clamp(21px,2.4vw,30px);line-height:1.8;text-wrap:pretty}

  .llm-chapters{padding-block:48px;scroll-margin-top:100px;border-top:1px solid var(--line)}.notes-header{display:flex;justify-content:space-between;align-items:center;gap:24px;margin-bottom:28px}.notes-header h2{font-size:clamp(26px,3vw,38px);margin:8px 0}.notes-header p{color:var(--muted);font-size:13px;line-height:1.9}.notes-header a{flex-shrink:0;font-size:12px}
  .llm-chapter{scroll-margin-top:100px;border:1px solid var(--line);border-radius:12px;margin-block:12px;background:var(--paper);overflow:hidden}.chapter-details>summary{display:grid;grid-template-columns:24px 120px minmax(0,1fr) 36px;align-items:center;gap:20px;padding:24px;cursor:pointer;list-style:none}.chapter-details>summary::-webkit-details-marker{display:none}.chapter-details>summary:hover{background:color-mix(in srgb,var(--teal) 5%,var(--paper))}.chapter-details>summary:focus-visible{outline:2px solid var(--teal);outline-offset:-3px}.chapter-number{color:var(--teal);font-size:12px}.chapter-thumb{width:120px;height:80px;object-fit:cover;border-radius:7px}.chapter-meta{display:flex;flex-wrap:wrap;gap:12px;color:var(--muted);font-size:10px}.chapter-summary{min-width:0}.chapter-summary h3{font-size:18px;line-height:1.85;margin:6px 0}.chapter-summary p{color:var(--muted);font-size:12px;line-height:1.9;margin:0;display:-webkit-box;-webkit-line-clamp:2;line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}.chapter-chevron{display:flex;align-items:center;justify-content:center;box-sizing:border-box;width:36px;height:36px;padding:7px;border:1px solid var(--line);border-radius:50%;color:var(--link-ink);line-height:1;flex-shrink:0}.chapter-chevron svg{display:block;width:100%;height:100%;transform-origin:center;transition:transform .15s}.chapter-details[open] .chapter-chevron svg{transform:rotate(45deg)}.chapter-details[open]>summary{border-bottom:1px solid var(--line)}.chapter-content{max-width:804px;margin-inline:auto;padding:24px 32px 36px;min-width:0}.back-to-tables{color:var(--link-ink);font-size:12px}.guide-prose{width:100%;max-width:740px;margin:0;padding:0}.guide-prose :global([id]){scroll-margin-top:110px}.back-to-tables{display:inline-block;margin-top:24px}
  @media(max-width:700px){.notes-header{align-items:start;flex-direction:column;gap:6px}.chapter-details>summary{grid-template-columns:76px minmax(0,1fr) 32px;gap:12px;padding:16px}.chapter-number{display:none}.chapter-thumb{width:76px;height:57px;align-self:start;margin-top:25px}.chapter-summary h3{font-size:15px}.chapter-summary p{font-size:11px}.chapter-meta{font-size:9px;gap:5px 10px}.chapter-chevron{width:32px;height:32px;padding:5px}.chapter-content{padding:20px 16px 28px}}
  @media(max-width:360px){.chapter-details>summary{grid-template-columns:60px minmax(0,1fr) 32px;gap:8px 12px}.chapter-summary{display:contents}.chapter-thumb{grid-column:1;grid-row:1;width:60px;height:45px;margin:0}.chapter-meta{grid-column:2;grid-row:1}.chapter-summary h3{grid-column:1 / -1;grid-row:2}.chapter-summary p{grid-column:1 / -1;grid-row:3}.chapter-chevron{grid-column:3;grid-row:1}}
</style>
