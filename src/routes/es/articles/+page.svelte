<script lang="ts">
  import ArticleArchive from '$lib/components/ArticleArchive.svelte';
  export let data;
</script>
<ArticleArchive locale={data.locale} records={data.records} currentPage={data.page} />
