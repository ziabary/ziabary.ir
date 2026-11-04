<script lang="ts">
  import { onMount } from 'svelte';
  import * as publicEnvironment from '$env/static/public';
  import { startCommunity } from './loader.mjs';
  export let path: string;
  export let locale: 'fa' | 'en' | 'es';
  onMount(() => {
    const api = (publicEnvironment as Partial<Record<string, string>>).PUBLIC_COMMUNITY_API_URL ?? 'https://api.ziabary.ir';
    const host = [...document.querySelectorAll<HTMLElement>('[data-community-slot]')].find(node => node.dataset.post === path);
    return startCommunity({ api, post: path, locale, host });
  });
</script>
