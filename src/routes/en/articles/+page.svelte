<script lang="ts">
  import VirtualArchive from '$lib/components/VirtualArchive.svelte';
  import { articles } from '$lib/content';

  const englishArticles = articles.filter((article) => article.lang === 'en');
  const categories = ['All', ...new Set(englishArticles.map((article) => article.category))];
  let query = '';
  let category = 'All';

  $: filtered = englishArticles.filter((article) =>
    (category === 'All' || article.category === category) &&
    `${article.title} ${article.excerpt}`.toLowerCase().includes(query.trim().toLowerCase())
  );
</script>

<svelte:head>
  <title>Writing | Mehran Ziabary</title>
  <meta name="description" content="English technical writing from Mehran Ziabary, including restored articles from the Soft'nHard ware archive." />
</svelte:head>

<main class="intl-archive" dir="ltr">
  <header class="wrap intl-archive-hero">
    <p class="eyebrow">WRITING ARCHIVE</p>
    <h1>Writing</h1>
    <p>Original essays and technical field notes. The first collection restores useful articles from my former English blog, preserved by the Internet Archive.</p>
  </header>

  <section class="wrap archive-tools">
    <label>⌕<input bind:value={query} placeholder="Search titles and summaries…" /></label>
    <div>
      {#each categories as item}
        <button class:active={category === item} onclick={() => (category = item)}>{item}</button>
      {/each}
    </div>
  </section>

  <section class="wrap">
    <VirtualArchive
      items={filtered}
      pageClass="archive-list"
      resetKey={`${category}:${query}`}
      estimatedPageHeight={1750}
      emptyLabel="No articles match this selection."
      statusLabel={(first, last, total) => `Showing items ${first} to ${last} of ${total}`}
    >
      {#snippet item(article)}
        <article class="article-card intl-card">
          <div class="card-art"><span>{article.category}</span><i>ARCHIVE</i></div>
          <div class="card-body">
            <p>{article.faDate} · {article.readTime}</p>
            <h3>{article.title}</h3>
            <span>{article.excerpt}</span>
            <a class="text-link" href={`/en/articles/${article.slug}/`}>Read article →</a>
          </div>
        </article>
      {/snippet}
    </VirtualArchive>
  </section>
</main>
