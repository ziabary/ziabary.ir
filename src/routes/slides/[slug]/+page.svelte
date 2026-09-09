<script lang="ts">
  import PresentationDetail from '$lib/components/PresentationDetail.svelte';
  import type { PageData } from './$types';
  export let data: PageData;
</script>

<PresentationDetail presentation={data.presentation} locale="fa" />
