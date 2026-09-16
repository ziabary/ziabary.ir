<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { hasLlmPreview } from '$lib/draft-preview.mjs';
  import LlmGuidePage from '$lib/components/LlmGuidePage.svelte';
  import PageSeo from '$lib/components/PageSeo.svelte';
  import { llmGuideSections } from '$lib/llm/views';
  import { llmGuideCollection } from '$lib/llm/collection';
  export let data;
  const sectionAnchors = [...new Set(['start', 'llm-notes', ...llmGuideSections.flatMap(section => [section.id, ...section.views.map(view => view.id)])])];
  let mounted = false;
  onMount(() => { mounted = true; });
  $: preview = mounted && hasLlmPreview($page.url.searchParams);
</script>

<PageSeo
  title={`${llmGuideCollection.title} | مهران ضیابری`}
  description={llmGuideCollection.subtitle}
  path="/guides/llm/"
  image={llmGuideCollection.image}
  imageAlt={llmGuideCollection.imageAlt}
  noindex={true}
/>
{#if preview}
  <LlmGuidePage chapters={data.chapters} />
{:else}
  <!-- Keep existing inbound section fragments valid without rendering preview content. -->
  <main class="wrap">{#each sectionAnchors as id}<span {id} hidden></span>{/each}<p>این راهنما هنوز منتشر نشده است.</p><a href="/guides/">بازگشت به فنی‌جات</a></main>
{/if}
