<script lang="ts">
  import ArticlePage from '$lib/components/ArticlePage.svelte';
  export let data;
</script>
<ArticlePage article={data.article} Content={data.Content} />
