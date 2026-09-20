<script lang="ts">
  import LlmPreview from '$lib/components/LlmPreview.svelte';
  export let data;
</script>
{#key data.locale}<LlmPreview locale={data.locale} messages={data.messages} records={data.records} />{/key}
