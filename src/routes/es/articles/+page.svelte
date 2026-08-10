<script lang="ts">
  import PaginatedArchive from '$lib/components/PaginatedArchive.svelte';
  import { articles } from '$lib/content';

  const spanishArticles = articles.filter((article) => article.lang === 'es');
  const categories = ['Todos', ...new Set(spanishArticles.map((article) => article.category))];
  let query = '';
  let category = 'Todos';

  $: filtered = spanishArticles.filter((article) =>
    (category === 'Todos' || article.category === category) &&
    `${article.title} ${article.excerpt}`.toLowerCase().includes(query.trim().toLowerCase())
  );
</script>

<svelte:head>
  <title>Artículos | Mehran Ziabary</title>
  <meta name="description" content="Ensayos y notas técnicas de Mehran Ziabary en español." />
</svelte:head>

<main class="intl-archive" dir="ltr">
  <header class="wrap intl-archive-hero">
    <p class="eyebrow">ARCHIVO EN ESPAÑOL</p>
    <h1>Artículos</h1>
    <p>Ediciones internacionales de experiencias y ensayos cuyo argumento conserva valor fuera de su contexto iraní.</p>
  </header>

  <section class="wrap archive-tools">
    <label>⌕<input bind:value={query} placeholder="Buscar títulos y resúmenes…" /></label>
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
      locale="es"
      emptyLabel="No hay artículos para esta selección."
      previousLabel="Anterior"
      nextLabel="Siguiente"
      navigationLabel="Páginas de artículos"
      statusLabel={(first, last, total) => `Mostrando del ${first} al ${last} de ${total}`}
    >
      {#snippet item(article)}
        <article class="article-card intl-card">
          <div class="card-art" class:has-image={Boolean(article.cover)}>
            {#if article.cover}<img src={article.cover} alt="" />{/if}
            <span>{article.category}</span><i>EDICIÓN</i>
          </div>
          <div class="card-body">
            <p>{article.faDate} · {article.readTime}</p>
            <h3>{article.title}</h3>
            <span>{article.excerpt}</span>
            <a class="text-link" href={`/es/articles/${article.slug}/`}>Leer artículo →</a>
          </div>
        </article>
      {/snippet}
    </PaginatedArchive>
  </section>
</main>
