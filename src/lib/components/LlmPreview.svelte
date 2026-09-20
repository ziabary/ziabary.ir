<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { hasLlmPreview } from '$lib/draft-preview.mjs';
  import { llmCollection, llmPath, llmBase } from '$lib/llm/editions';
  import { createLlmI18n, type LlmLocale, type RecordTranslations } from '$lib/llm/i18n/runtime';
  import { setLlmI18n } from '$lib/llm/i18n/context';
  import { createLlmViews } from '$lib/llm/views';
  import LlmGuidePage from './LlmGuidePage.svelte';
  import PageSeo from './PageSeo.svelte';
  export let locale: LlmLocale;
  export let messages: Record<string, string>;
  export let records: RecordTranslations;
  const i18n = createLlmI18n(locale, messages, records);
  setLlmI18n(i18n);
  const sectionAnchors = [...new Set(['start', 'llm-notes', 'benchmark-performance', 'reference-comparisons', ...createLlmViews(i18n).llmGuideSections.flatMap(section => [section.id, ...section.views.map(view => view.id)])])];
  const collection = llmCollection(locale);
  let mounted = false;
  onMount(() => { mounted = true; });
  $: preview = mounted && hasLlmPreview($page.url.searchParams);
  $: enabled = collection.status === 'published' || preview;
  const copy = {
    fa: { owner: 'مهران ضیابری', hidden: 'این راهنما هنوز منتشر نشده است.', back: 'بازگشت به فنی‌جات', loading: 'در حال آماده‌سازی پیش‌نمایش…', error: 'پیش‌نمایش بارگذاری نشد.' },
    en: { owner: 'Mehran Ziabary', hidden: 'This guide has not been published yet.', back: 'Back to technical guides', loading: 'Loading preview…', error: 'The preview could not be loaded.' },
    es: { owner: 'Mehran Ziabary', hidden: 'Esta guía aún no se ha publicado.', back: 'Volver a las guías técnicas', loading: 'Cargando vista previa…', error: 'No se ha podido cargar la vista previa.' }
  }[locale];
</script>
<PageSeo title={`${collection.title} | ${copy.owner}`} description={collection.subtitle} path={llmPath(locale)} image={collection.image} imageAlt={collection.imageAlt} {locale} noindex={collection.status !== 'published' || preview} />
{#if enabled}
  <LlmGuidePage includeDrafts={preview} />
{:else}
  <main class="wrap preview-gate">{#each sectionAnchors as id}<span {id} hidden></span>{/each}<p role="status">{copy.hidden}</p><a href={`${llmBase(locale)}/guides/`}>{copy.back}</a></main>
{/if}
<style>.preview-gate{padding-block:70px;min-height:45vh}</style>
