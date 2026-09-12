<script lang="ts">
  import { imageAttributes } from '$lib/images';
  import { headingSections, readingPosition, keepCurrentVisible } from '$lib/contents-navigation';
  import PageHero from '$lib/components/PageHero.svelte';
  import PageSeo from '$lib/components/PageSeo.svelte';
  import GpuComparison from '$lib/components/GpuComparison.svelte';
  import ServerComparison from '$lib/components/ServerComparison.svelte';
  import { getArticle, allArticleMetadata } from '$lib/content';
  import type { Component } from 'svelte';
  import type { GpuReviewCollection, GpuReviewLocale } from '$lib/gpu-review';

  export let chapters: Record<string, Component<{headingPrefix?: string}>> = {};
  export let collection: GpuReviewCollection;
  export let locale: GpuReviewLocale = 'en';
  const copies = {
    en: { draft: 'English draft', preview: 'English draft · Local preview', back: '← All technical notes', contents: 'Contents', inCollection: 'IN THIS COLLECTION', using: 'Using this collection', paths: 'Suggested reading paths', choosePath: 'Which path fits my needs?', articles: 'articles', tables: 'interactive tables', cover: 'cover illustration', imageNeeded: 'English image needed.', related: 'Related articles', continue: 'Continue reading', standalone: 'Open the standalone draft →', article: 'Read article →' },
    es: { draft: 'Borrador en español', preview: 'Borrador en español · Vista previa local', back: '← Todas las notas técnicas', contents: 'Índice', inCollection: 'EN ESTA COLECCIÓN', using: 'Cómo utilizar esta colección', paths: 'Recorridos de lectura sugeridos', choosePath: '¿Qué recorrido se ajusta a mis necesidades?', articles: 'artículos', tables: 'tablas interactivas', cover: 'ilustración de portada', imageNeeded: 'Se necesita una imagen traducida.', related: 'Artículos relacionados', continue: 'Seguir leyendo', standalone: 'Abrir el borrador del artículo →', article: 'Leer artículo →' }
  };
  $: copy = copies[locale];
  let activeTarget = '';
  const followHeading = (id: string) => activeTarget = id;
  $: navigationItems = collection.items.map(item => ({ ...item, headings: allArticleMetadata.find(article => article.slug === item.id)?.headings ?? [] }));
  $: targetIds = navigationItems.flatMap(item => [item.id, ...item.headings.map(heading => `${item.id}--${heading.id}`)]);
  $: activeSection = collection.items.find(item => activeTarget === item.id || activeTarget.startsWith(`${item.id}--`))?.id ?? '';
</script>

<PageSeo title={`${collection.title} | ${collection.draft ? copy.draft : 'Mehran Ziabary'}`}
  description={collection.subtitle} path={`/${locale}/guides/${collection.slug}/`}
  image={collection.image} imageAlt={collection.imageAlt} {locale} noindex={collection.draft} />

{#snippet readingPaths()}
  <ol>
    {#each collection.paths as path}
      <li><h3>{path.title}</h3><p>{path.description}</p><a href={`#${path.id}`}>{path.label} →</a></li>
    {/each}
  </ol>
{/snippet}

<main class="gpu-review" dir="ltr">
  <div class="wrap review-note">{#if collection.draft}<strong>{copy.preview}</strong>{/if}<a href={`/${locale}/guides/`}>{copy.back}</a></div>
  <PageHero eyebrow={collection.eyebrow} title={collection.title} lead={collection.subtitle} />
  <div class="collection-layout">
    <nav class="collection-nav" aria-label={copy.contents} use:keepCurrentVisible={activeTarget}>
      <small>{copy.inCollection}</small>
      {#each navigationItems as item, index}
        <div class="collection-nav-item">
          <a href={`#${item.id}`} class:active={activeSection === item.id} aria-current={activeTarget === item.id ? 'location' : undefined}><span>{String(index + 1).padStart(2, '0')}</span>{item.title}</a>
          {#if activeSection === item.id}<ul class="subsections">{#each headingSections(item.headings) as heading}
            {@const id = `${item.id}--${heading.id}`}
            {@const inSection = activeTarget === id || heading.children.some(child => activeTarget === `${item.id}--${child.id}`)}
            <li><a href={`#${id}`} class:active={inSection} aria-current={activeTarget === id ? 'location' : undefined}>{heading.title}</a>
              {#if inSection && heading.children.length}<ul class="subsections">{#each heading.children as child}
                {@const childId = `${item.id}--${child.id}`}
                <li><a href={`#${childId}`} aria-current={activeTarget === childId ? 'location' : undefined}>{child.title}</a></li>
              {/each}</ul>{/if}
            </li>
          {/each}</ul>{/if}
        </div>
      {/each}
    </nav>
    <div class="collection-main" use:readingPosition={{ ids: targetIds, onChange: followHeading }}>
      <div class="collection-overview">
        <img class="collection-cover" {...imageAttributes(collection.image, '(min-width: 1200px) 740px, calc(100vw - 32px)')} alt={collection.imageAlt} width="1600" height="900" />
        <section class="start" aria-labelledby="start-title">
          <small>{copy.using}</small>
          <h2 id="start-title">{collection.startTitle}</h2><p>{collection.startIntro}</p>
          <nav class="desktop-paths" aria-label={copy.paths}>{@render readingPaths()}</nav>
          <details class="mobile-paths"><summary>{copy.choosePath}</summary><nav aria-label={copy.paths}>{@render readingPaths()}</nav></details>
          <footer><span>{collection.items.filter(item => item.kind === 'article').length} {copy.articles}</span><span>2 {copy.tables}</span></footer>
        </section>
      </div>
      <p class="collection-intro">{collection.intro}</p>
      {#each collection.items as item}
        {#if item.id === 'gpu-comparison-table'}
          <section id={item.id} class="guide-entry"><GpuComparison {locale} /></section>
        {:else if item.id === 'server-comparison-table'}
          <section id={item.id} class="guide-entry"><ServerComparison {locale} /></section>
        {:else if item.kind === 'article'}
          {@const Content = chapters[item.id]}
          {@const article = allArticleMetadata.find(article => article.slug === item.id)}
          {@const imageNote = collection.imageReview.find(note => note.article === item.id)}
          {#if Content && article}
            <article id={item.id} class="guide-entry article-entry">
              {#if article.cover}<img class="article-image" {...imageAttributes(article.cover, '(min-width: 1200px) 740px, calc(100vw - 32px)')} alt={`${article.title} — ${copy.cover}`} loading="lazy" />{/if}
              {#if imageNote && false}<aside class="image-note"><strong>{copy.imageNeeded}</strong> {imageNote?.note}</aside>{/if}
              <header><small>{article.category} · {article.readTime}</small><h2>{article.title}</h2><p>{article.excerpt}</p></header>
              <div class="prose review-prose"><Content headingPrefix={`${item.id}--`} /></div>
              <nav class="related" aria-label={copy.related}>
                <strong>{copy.continue}</strong>
                <ul>{#each article.related as slug}<li><a href={`/${locale}/articles/${slug}/`}>{getArticle(slug)?.title}</a></li>{/each}</ul>
              </nav>
              <a class="standalone-link" href={`/${locale}/articles/${item.id}/`}>{article.draft ? copy.standalone : copy.article}</a>
            </article>
          {/if}
        {/if}
      {/each}
    </div>
  </div>
</main>

<style>
  .gpu-review { --hardware-content-width: calc(100vw - 316px); }
  nav { display: block; position: static; inset: auto; width: auto; min-width: 0; margin: 0; padding: 0; gap: 0; border: 0; background: transparent; }
  nav a { white-space: normal; }
  .review-note { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 12px; padding-block: 18px; color: var(--teal); font-size: 13px; }
  .gpu-review :global(.page-hero) { padding-block: 40px; }
  .gpu-review :global(.page-hero h1) { font-size: clamp(32px, 4vw, 52px); }
  .collection-layout { display: grid; grid-template-columns: 224px minmax(0,1fr); gap: 32px; padding: 0 28px 80px; }
  .collection-nav { position: sticky; top: 105px; align-self: start; max-height: calc(100dvh - 125px); overflow-y: auto; border-inline-start: 1px solid var(--line); font-size: 13px; }
  .collection-nav > small { display: block; padding: 0 14px 16px; color: var(--muted); }
  .collection-nav a { display: flex; gap: 10px; padding: 11px 14px; border-inline-start: 2px solid transparent; color: var(--muted); line-height: 1.6; }
  .collection-nav a.active { border-color: var(--teal); color: var(--teal); font-weight: 700; }
  .collection-nav a[aria-current] { border-color: var(--link-ink); color: var(--link-ink); background: var(--soft); font-weight: 700; }
  .subsections { list-style: none; margin: 0; padding: 0; padding-inline-start: 12px; }
  .collection-nav .subsections a { display: block; padding: 7px 12px; font-size: 12px; }
  .collection-nav a span, a, header small, .start small { color: var(--teal); }
  .collection-main { min-width: 0; }
  .collection-overview { display: grid; grid-template-columns: minmax(0,1.2fr) minmax(300px,1fr); align-items: start; gap: 24px; }
  .collection-cover { width: 100%; height: auto; border-radius: 14px; }
  .start { padding: 24px; border: 1px solid var(--line); background: var(--soft); }
  .start h2 { margin: 8px 0 14px; font-size: 26px; line-height: 1.4; }
  .start p { margin: 0; color: var(--muted); font-size: 14px; line-height: 1.9; }
  .start ol { margin: 22px 0 0; padding: 0; list-style: none; }
  .start li { padding: 18px 0; border-top: 1px solid var(--line); }
  .start h3 { margin: 0 0 6px; font-size: 15px; line-height: 1.6; }
  .start li p { font-size: 12px; }
  .start li a { display: inline-block; margin-top: 8px; font-size: 13px; }
  .start footer { display: flex; flex-wrap: wrap; gap: 12px; border-top: 1px solid var(--line); padding-top: 16px; color: var(--muted); font-size: 11px; }
  .mobile-paths { display: none; }
  .collection-intro { max-width: 820px; margin: 32px 0; color: var(--muted); line-height: 1.9; }
  .guide-entry { scroll-margin-top: 105px; margin: 72px 0; }
  .article-entry { max-width: 820px; border-top: 1px solid var(--line); padding-top: 32px; }
  .article-image { width: 100%; height: auto; max-height: 460px; object-fit: contain; border-radius: 14px; }
  .article-entry header { margin: 22px 0; }
  .article-entry h2 { font-size: 32px; line-height: 1.35; margin: 10px 0 18px; }
  .article-entry header p { color: var(--muted); line-height: 1.9; }
  .review-prose { width: 100%; max-width: 100%; margin: 0; padding: 20px 0 0; border-top: 1px solid var(--line); }
  .review-prose :global(figure) { margin-inline: 0; }
  .review-prose :global(table) { display: block; overflow-x: auto; max-width: 100%; }
  .related { border-top: 1px solid var(--line); margin-top: 32px; padding-top: 18px; font-size: 14px; }
  .related ul { padding-inline-start: 20px; }
  .related li { margin-block: 10px; }
  .standalone-link { display: inline-block; margin-top: 20px; }
  .image-note { margin: 14px 0; border-inline-start: 3px solid var(--teal); background: var(--soft); padding: 12px 16px; font-size: 13px; color: var(--muted); line-height: 1.8; }
  a:focus-visible, summary:focus-visible { outline: 2px solid var(--teal); outline-offset: 4px; }
  @media(max-width: 1100px) { .collection-overview { grid-template-columns: minmax(0,1fr); } }
  @media(max-width: 760px) {
    .gpu-review { --hardware-content-width: calc(100vw - 32px); }
    .collection-layout { grid-template-columns: minmax(0,1fr); padding: 0 16px 40px; gap: 24px; }
    .collection-nav { position: static; display: grid; grid-template-columns: 1fr 1fr; max-height: none; overflow: visible; font-size: 12px; }
    .collection-nav > small { grid-column: 1 / -1; }
    .collection-nav a { padding: 8px 12px; }
    .desktop-paths { display: none; }
    .mobile-paths { display: block; margin: 20px 0; border-top: 1px solid var(--line); }
    .mobile-paths summary { cursor: pointer; padding-top: 14px; color: var(--teal); font-size: 14px; }
    .guide-entry { margin: 48px 0; }
    .article-entry h2 { font-size: 27px; }
  }
</style>
