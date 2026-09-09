<script lang="ts">
  import PaginatedArchive from '$lib/components/PaginatedArchive.svelte';
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
  <title>Articles | Mehran Ziabary</title>
  <meta name="description" content="English articles by Mehran Ziabary on AI infrastructure, GPU and server selection, software architecture and security." />
</svelte:head>

<main class="intl-archive" dir="ltr">
  <header class="wrap intl-archive-hero">
    <p class="eyebrow">ARTICLE ARCHIVE</p>
    <h1>Articles</h1>
    <p>Articles on AI infrastructure, GPU and server selection, software architecture and security, alongside selected essays and historical technical notes.</p>
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
    <PaginatedArchive
      items={filtered}
      pageClass="archive-list"
      resetKey={`${category}:${query}`}
      locale="en"
      emptyLabel="No articles match this selection."
      previousLabel="Previous"
      nextLabel="Next"
      navigationLabel="Article pages"
      statusLabel={(first, last, total) => `Showing items ${first} to ${last} of ${total}`}
    >
      {#snippet item(article)}
        <article class="article-card intl-card">
          <div class="card-art" class:has-image={Boolean(article.cover)}>
            {#if article.cover}<img src={article.cover} alt="" />{/if}
            <span>{article.category}</span>
            {#if !article.cover}<i>{article.source ? 'EDITION' : 'ARCHIVE'}</i>{/if}
          </div>
          <div class="card-body">
            <p>{article.faDate} · {article.readTime}</p>
            <h3>{article.title}</h3>
            <span>{article.excerpt}</span>
            <a class="text-link" href={`/en/articles/${article.slug}/`}>Read article →</a>
          </div>
        </article>
      {/snippet}
    </PaginatedArchive>
  </section>
</main>
