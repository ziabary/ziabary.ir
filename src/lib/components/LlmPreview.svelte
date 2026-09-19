<script lang="ts">
  import { onMount, type Component } from 'svelte';
  import { page } from '$app/stores';
  import { hasLlmPreview } from '$lib/draft-preview.mjs';
  import { getArticleModule, getArticle } from '$lib/content';
  import { llmCollection, llmEditionSlugs, llmPath, llmBase } from '$lib/llm/editions';
  import { createLlmI18n, type LlmLocale, type RecordTranslations } from '$lib/llm/i18n/runtime';
  import { setLlmI18n } from '$lib/llm/i18n/context';
  import { createLlmViews } from '$lib/llm/views';
  import LlmGuidePage from './LlmGuidePage.svelte';
  import PageSeo from './PageSeo.svelte';
  export let locale: LlmLocale;
  export let messages: Record<string, string>;
  export let records: RecordTranslations;
  export let initialChapters: Record<string, Component<{headingPrefix?: string}>> | undefined = undefined;
  const i18n = createLlmI18n(locale, messages, records);
  setLlmI18n(i18n);
  const sectionAnchors = [...new Set(['start', 'llm-notes', 'benchmark-performance', 'reference-comparisons', ...createLlmViews(i18n).llmGuideSections.flatMap(section => [section.id, ...section.views.map(view => view.id)])])];
  const collection = llmCollection(locale);
  let mounted = false;
  let chapters = initialChapters;
  let failed = false;
  let loading = false;
  let previewChaptersLoaded = false;
  onMount(() => { mounted = true; });
  $: preview = mounted && hasLlmPreview($page.url.searchParams);
  $: enabled = collection.status === 'published' || preview;
  $: if (enabled && (!chapters || (preview && !previewChaptersLoaded)) && !failed && !loading) loadChapters(preview);
  async function loadChapters(includeDrafts: boolean) {
    loading = true;
    try {
      chapters = Object.fromEntries(await Promise.all(llmEditionSlugs(locale).filter(slug => includeDrafts || getArticle(slug, locale)).map(async slug => {
        const article = await getArticleModule(slug, locale);
        if (!article) throw new Error(`Missing ${locale} LLM chapter: ${slug}`);
        return [slug, article.default];
      })));
      previewChaptersLoaded = includeDrafts;
    } catch (error) { failed = true; console.error(error); }
    finally { loading = false; }
  }
  const copy = {
    fa: { owner: 'مهران ضیابری', hidden: 'این راهنما هنوز منتشر نشده است.', back: 'بازگشت به فنی‌جات', loading: 'در حال آماده‌سازی پیش‌نمایش…', error: 'پیش‌نمایش بارگذاری نشد.' },
    en: { owner: 'Mehran Ziabary', hidden: 'This guide has not been published yet.', back: 'Back to technical guides', loading: 'Loading preview…', error: 'The preview could not be loaded.' },
    es: { owner: 'Mehran Ziabary', hidden: 'Esta guía aún no se ha publicado.', back: 'Volver a las guías técnicas', loading: 'Cargando vista previa…', error: 'No se ha podido cargar la vista previa.' }
  }[locale];
</script>
<PageSeo title={`${collection.title} | ${copy.owner}`} description={collection.subtitle} path={llmPath(locale)} image={collection.image} imageAlt={collection.imageAlt} {locale} noindex={collection.status !== 'published'} />
{#if enabled && chapters}
  <LlmGuidePage {chapters} />
{:else}
  <main class="wrap preview-gate">{#each sectionAnchors as id}<span {id} hidden></span>{/each}<p role="status">{enabled ? failed ? copy.error : copy.loading : copy.hidden}</p><a href={`${llmBase(locale)}/guides/`}>{copy.back}</a></main>
{/if}
<style>.preview-gate{padding-block:70px;min-height:45vh}</style>
