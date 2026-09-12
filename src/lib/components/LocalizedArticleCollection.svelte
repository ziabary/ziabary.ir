<script lang="ts">
  import GuidePage from './GuidePage.svelte';
  import type { GuideCollection } from '$lib/guides';
  import type { Component } from 'svelte';
  export let collection: GuideCollection;
  export let locale: 'en' | 'es' = 'en';
  export let chapters: Record<string, Component<{headingPrefix?: string}>> = {};
</script>
<GuidePage {collection} {locale} {chapters} />
