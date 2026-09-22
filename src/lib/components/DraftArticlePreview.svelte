<script lang="ts">
  import { page } from '$app/stores';
  import { browser } from '$app/environment';
  import { tick, type Component } from 'svelte';
  import { allArticleMetadata, getArticleModule, type ArticleMeta } from '$lib/content';
  import { draftReadingHref, hasDraftPreview } from '$lib/draft-preview.mjs';
  import ArticlePage from './ArticlePage.svelte';
  import PageSeo from './PageSeo.svelte';
  import type { LlmLocale } from '$lib/llm/i18n/runtime';
  export let article: ArticleMeta;
  export let Content: Component<{headingPrefix?: string}> | undefined = undefined;
  $: locale = article.lang as LlmLocale;
  $: base = locale === 'fa' ? '' : `/${locale}`;
  $: enabled = browser && hasDraftPreview($page.url.searchParams);
  $: draftModule = article.draft && enabled ? getArticleModule(article.slug, locale) : undefined;
  const text = { fa: { hidden:'این یادداشت هنوز منتشر نشده است.', label:'پیش‌نویس · در حال بازبینی', back:'بازگشت به نوشته‌ها و پیش‌نویس‌ها', loading:'در حال بارگذاری…', error:'پیش‌نمایش بارگذاری نشد.' }, en: { hidden:'This article has not been published yet.', label:'Draft · under review', back:'Back to articles and drafts', loading:'Loading…', error:'The preview could not be loaded.' }, es: { hidden:'Este artículo aún no se ha publicado.', label:'Borrador · en revisión', back:'Volver a artículos y borradores', loading:'Cargando…', error:'No se ha podido cargar la vista previa.' } };
  function previewLinks(node: HTMLElement) {
    const update = () => tick().then(() => {
      const drafts = allArticleMetadata.filter(item => item.draft && item.lang === locale).map(item => item.slug);
      for (const anchor of node.querySelectorAll<HTMLAnchorElement>('a[href]')) anchor.setAttribute('href', draftReadingHref(anchor.getAttribute('href') ?? '', drafts, enabled));
    }); update(); return {update};
  }
</script>
{#if !article.draft && Content}<ArticlePage {article} {Content} />
{:else}
  <PageSeo title={`${article.title} | Mehran Ziabary`} description={article.excerpt} path={`${base}/articles/${article.slug}/`} image={article.cover ?? '/images/guides/llm.png'} {locale} noindex={true} type="article" publishedDate={article.date} />
  {#if enabled}
    {#await draftModule}<main class="wrap draft-gate" aria-live="polite">{text[locale].loading}</main>
    {:then module}{#if module}<div use:previewLinks><aside class="wrap draft-notice"><strong>{text[locale].label}</strong><a href={`${base}/articles/?show-drafts=true`}>{text[locale].back}</a></aside><ArticlePage {article} Content={module.default} seo={false} /></div>{/if}
    {:catch}<main class="wrap draft-gate">{text[locale].error}</main>{/await}
  {:else}<main class="wrap draft-gate"><h1>{text[locale].hidden}</h1></main>{/if}
{/if}
<style>.draft-gate{padding-block:70px;min-height:45vh}.draft-notice{display:flex;gap:14px 24px;flex-wrap:wrap;padding-block:16px;border-bottom:1px solid var(--line);font-size:13px}.draft-notice a{color:var(--link-ink)}</style>
