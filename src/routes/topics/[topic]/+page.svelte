<script lang="ts">
 import TopicPage from '$lib/components/TopicPage.svelte';
 import type { PageData } from './$types';
 export let data: PageData;
</script>
<TopicPage topic={data.topic} />
