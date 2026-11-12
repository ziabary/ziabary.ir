<script lang="ts">
  import { onMount } from 'svelte';
  import * as publicEnvironment from '$env/static/public';
  import { startCommunity } from './loader.mjs';
  export let path: string;
  export let locale: 'fa' | 'en' | 'es';
  let counter: HTMLDivElement;
  onMount(() => {
    const api = (publicEnvironment as Partial<Record<string, string>>).PUBLIC_COMMUNITY_API_URL ?? 'https://api.ziabary.ir';
    const host = [...document.querySelectorAll<HTMLElement>('[data-community-slot]')].find(node => node.dataset.post === path);
    return startCommunity({ api, post: path, locale, host: host ?? counter, mode: host ? 'comments' : 'stats' });
  });
</script>

<div bind:this={counter} class="page-visit-count" data-community-counter hidden></div>

<style>
  .page-visit-count { max-width: 1120px; margin: 1.5rem auto 2rem; padding: 0 1.25rem; color: var(--muted); text-align: center; font-size: .78rem; line-height: 1.8; }
  .page-visit-count[hidden] { display: none; }
</style>
