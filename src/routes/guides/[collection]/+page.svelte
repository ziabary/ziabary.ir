<script lang="ts">
  import GuidePage from '$lib/components/GuidePage.svelte';
  export let data;
</script>
<GuidePage collection={data.collection} chapters={data.chapters} />
