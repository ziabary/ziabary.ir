<script lang="ts">
  import { onMount } from 'svelte';
  import PageHero from '$lib/components/PageHero.svelte';
  import PageSeo from '$lib/components/PageSeo.svelte';
  import { getArticle, getArticleModule } from '$lib/content';
  import type { GuideCollection } from '$lib/guides';

  export let collection: GuideCollection;
  export let locale: 'en' | 'es' = 'en';
  const copies = {
    en: { back: '← All technical notes', contents: 'Collection contents', inCollection: 'IN THIS COLLECTION', about: 'About this collection', sequence: 'articles · Read in sequence or choose a topic from the contents.', related: 'Related articles', standalone: 'Open the standalone article →' },
    es: { back: '← Todas las notas técnicas', contents: 'Índice de la colección', inCollection: 'EN ESTA COLECCIÓN', about: 'Acerca de esta colección', sequence: 'artículos · Lea en orden o elija un tema del índice.', related: 'Artículos relacionados', standalone: 'Abrir el artículo independiente →' }
  };
  $: copy = copies[locale];
  let activeSection = collection.items[0]?.id ?? '';
  let main: HTMLElement;

  onMount(() => {
    const sections = Array.from(main.querySelectorAll<HTMLElement>('.guide-entry[id]'));
    let frame = 0;
    const update = () => {
      let current = sections[0]?.id ?? '';
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= window.innerHeight * 0.34) current = section.id;
        else break;
      }
      activeSection = current;
      frame = 0;
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      cancelAnimationFrame(frame);
    };
  });
</script>

<PageSeo title={`${collection.title} | Mehran Ziabary`} description={collection.subtitle}
  path={`/${locale}/guides/${collection.slug}/`} image={collection.image} imageAlt={collection.imageAlt} {locale} />

<main class="article-collection" dir="ltr" bind:this={main}>
  <div class="wrap back"><a href={`/${locale}/guides/`}>{copy.back}</a></div>
  <PageHero eyebrow={collection.eyebrow} title={collection.title} lead={collection.subtitle} />
  <div class="collection-layout">
    <nav class="collection-nav" aria-label={copy.contents}>
      <small>{copy.inCollection}</small>
      {#each collection.items as item, index}
        <a href={`#${item.id}`} class:active={activeSection === item.id}
          aria-current={activeSection === item.id ? 'location' : undefined}>
          <span>{String(index + 1).padStart(2, '0')}</span>{item.title}
        </a>
      {/each}
    </nav>
    <div class="collection-main">
      <section class="overview" aria-label={copy.about}>
        <img src={collection.image} alt={collection.imageAlt} width="1600" height="900" />
        <p>{collection.intro}</p>
        <small>{collection.items.length} {copy.sequence}</small>
      </section>
      {#each collection.items as item}
        {@const article = getArticle(item.id)}
        {@const module = article && getArticleModule(item.id)}
        {#if article && module}
          <article id={item.id} class="guide-entry">
            {#if article.cover}<img class="article-image" src={article.cover} alt="" loading="lazy" />{/if}
            <header><small>{article.category} · {article.readTime}</small><h2>{article.title}</h2><p>{article.excerpt}</p></header>
            <div class="prose collection-prose"><svelte:component this={module.default} /></div>
            <nav class="related" aria-label={`${copy.related}: ${article.title}`}>
              <strong>{copy.related}</strong>
              <ul>
                {#each article.related as slug}
                  {@const related = getArticle(slug)}
                  {#if related?.lang === locale}<li><a href={`/${locale}/articles/${slug}/`}>{related.title}</a></li>{/if}
                {/each}
              </ul>
            </nav>
            <a class="standalone" href={item.href}>{copy.standalone}</a>
          </article>
        {/if}
      {/each}
    </div>
  </div>
</main>

<style>
  nav { display: block; position: static; inset: auto; width: auto; min-width: 0; margin: 0; padding: 0; gap: 0; border: 0; background: transparent; }
  nav a { white-space: normal; }
  a, header small { color: var(--teal); }
  .back { padding-block: 20px 0; font-size: 13px; }
  .article-collection :global(.page-hero) { padding-block: 40px; text-align: left; }
  .collection-layout { display: grid; grid-template-columns: 224px minmax(0, 1fr); gap: 32px; padding: 0 28px 80px; }
  .collection-nav { position: sticky; top: 105px; align-self: start; max-height: calc(100dvh - 125px); overflow-y: auto; border-inline-start: 1px solid var(--line); font-size: 13px; }
  .collection-nav > small { display: block; padding: 0 14px 16px; color: var(--muted); }
  .collection-nav a { display: flex; gap: 10px; padding: 11px 14px; border-inline-start: 2px solid transparent; color: var(--muted); line-height: 1.6; }
  .collection-nav a.active { border-color: var(--teal); color: var(--teal); font-weight: 700; }
  .collection-nav a span { color: var(--teal); }
  .collection-main { min-width: 0; }
  .overview, .guide-entry { max-width: 820px; }
  .overview img, .article-image { display: block; width: 100%; height: auto; max-height: 460px; object-fit: contain; border-radius: 14px; }
  .overview p, header p { color: var(--muted); line-height: 1.9; }
  .overview small { color: var(--muted); }
  .guide-entry { scroll-margin-top: 105px; margin: 72px 0; padding-top: 32px; border-top: 1px solid var(--line); }
  header { margin: 22px 0; }
  header h2 { font-size: clamp(26px, 3vw, 34px); line-height: 1.4; margin: 10px 0 18px; }
  .collection-prose { width: 100%; max-width: 100%; margin: 0; padding: 20px 0 0; border-top: 1px solid var(--line); }
  .collection-prose :global(figure) { margin-inline: 0; }
  .collection-prose :global(img) { max-width: 100%; height: auto; }
  .collection-prose :global(table) { display: block; overflow-x: auto; max-width: 100%; }
  .related { border-top: 1px solid var(--line); margin-top: 32px; padding-top: 18px; font-size: 14px; }
  .related ul { padding-inline-start: 20px; }
  .related li { margin-block: 10px; }
  .standalone { display: inline-block; margin-top: 20px; }
  a:focus-visible { outline: 2px solid var(--teal); outline-offset: 4px; }
  @media (max-width: 760px) {
    .collection-layout { grid-template-columns: minmax(0, 1fr); padding: 0 16px 40px; gap: 24px; }
    .collection-nav { position: static; max-height: none; overflow: visible; }
    .collection-nav a { padding: 8px 12px; }
    .guide-entry { margin: 48px 0; }
  }
</style>
