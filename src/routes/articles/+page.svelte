<script lang="ts">
  import ArticleCard from '$lib/components/ArticleCard.svelte';
  import PageHero from '$lib/components/PageHero.svelte';
  import PaginatedArchive from '$lib/components/PaginatedArchive.svelte';
  import { articles } from '$lib/content';
  const faArticles = articles.filter((article) => article.lang === 'fa');
  let query = '';
  let category = 'همه';
  const categories = ['همه', ...new Set(faArticles.map((article) => article.category))];
  $: filtered = faArticles.filter((article) =>
    (category === 'همه' || article.category === category) &&
    `${article.title} ${article.excerpt}`.includes(query)
  );
</script>

<svelte:head><title>نوشته‌ها | مهران ضیابری</title></svelte:head>
<main>
  <PageHero eyebrow="آرشیو" title="نوشته‌ها و یادداشت‌ها" lead="تحلیل‌های فنی و مدیریتی؛ مرتب‌شده بر اساس آخرین انتشار یا بازبینی و قابل جستجو بر اساس موضوع." />
  <section class="wrap archive-tools"><label>⌕<input bind:value={query} placeholder="جستجو در عنوان و خلاصه…" /></label><div>{#each categories as item}<button class:active={category === item} onclick={() => (category = item)}>{item}</button>{/each}</div></section>
  <section class="wrap">
    <PaginatedArchive items={filtered} pageClass="archive-list" resetKey={`${category}:${query}`}>
      {#snippet item(article)}
        <ArticleCard {article} />
      {/snippet}
    </PaginatedArchive>
  </section>
</main>
