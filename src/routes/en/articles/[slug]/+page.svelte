<script lang="ts">
  import DraftArticlePreview from '$lib/components/DraftArticlePreview.svelte';
  export let data;
</script>
{#key data.article.slug}<DraftArticlePreview article={data.article} Content={data.Content} />{/key}
