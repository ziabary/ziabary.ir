<script lang="ts">
  import GpuReview from '$lib/components/GpuReview.svelte';
  import LocalizedArticleCollection from '$lib/components/LocalizedArticleCollection.svelte';
  import type { PageData } from './$types';
  export let data: PageData;
</script>

{#if data.kind === 'published'}
  <LocalizedArticleCollection collection={data.collection} chapters={data.chapters} locale="es" />
{:else}
  <GpuReview collection={data.collection} chapters={data.chapters} locale="es" />
{/if}
