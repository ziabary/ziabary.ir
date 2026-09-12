<script lang="ts">
  import { imageAttributes } from '$lib/images';
  import { onMount, tick } from 'svelte';
  import type { Component } from 'svelte';
  import type { GuideCollection } from '$lib/guides';
  import { getArticle } from '$lib/content';
  import PageHero from './PageHero.svelte';
  import PageSeo from './PageSeo.svelte';
  import GuideStart from './GuideStart.svelte';
  import GpuComparison from './GpuComparison.svelte';
  import ServerComparison from './ServerComparison.svelte';
  export let collection: GuideCollection;
  export let chapters: Record<string, Component<{ headingPrefix?: string }>> = {};
  export let locale: 'fa' | 'en' | 'es' = 'fa';
  let main: HTMLElement;
  let continuous = false;
  let active = '';
  const copies = {
    fa: { contents: 'در این مجموعه', back: 'دیدن دیگر راهنماهای فنی', planned: 'در برنامهٔ نگارش', empty: 'هنوز یادداشتی در این مجموعه منتشر نشده است.', read: 'مطالعهٔ فصل', standalone: 'بازکردن نسخهٔ مستقل مقاله', continuous: 'مطالعهٔ پیوستهٔ فصل‌ها', collapse: 'جمع‌کردن متن فصل‌ها', about: 'دربارهٔ این مجموعه' },
    en: { contents: 'In this collection', back: 'Explore other technical guides', planned: 'Planned', empty: 'No articles have been published in this collection yet.', read: 'Read chapter', standalone: 'Open the standalone article', continuous: 'Read chapters continuously', collapse: 'Collapse chapter texts', about: 'About this collection' },
    es: { contents: 'En esta colección', back: 'Ver otras guías técnicas', planned: 'En planificación', empty: 'Todavía no se han publicado artículos en esta colección.', read: 'Leer capítulo', standalone: 'Abrir el artículo independiente', continuous: 'Leer los capítulos de forma continua', collapse: 'Contraer los capítulos', about: 'Acerca de esta colección' }
  };
  $: copy = copies[locale];
  $: base = locale === 'fa' ? '' : `/${locale}`;
  $: planned = collection.status === 'planned';
  $: hasTools = collection.items.some(item => item.kind !== 'article');
  $: legacyOwners = new Map(collection.items.flatMap(item => (getArticle(item.id)?.legacyAnchors ?? []).map(anchor => [anchor, item.id] as const)).reverse());

  function toggleContinuous() {
    continuous = !continuous;
    main.querySelectorAll<HTMLDetailsElement>('.chapter-details').forEach(details => details.open = continuous);
  }
  onMount(() => {
    const revealFragment = async () => {
      const id = decodeURIComponent(location.hash.slice(1));
      if (!id) return;
      const legacyOwner = legacyOwners.get(id);
      const target = document.getElementById(legacyOwner ? `${legacyOwner}--${id}` : id) ?? document.getElementById(id);
      const entry = target?.closest('.guide-entry');
      const details = entry?.querySelector<HTMLDetailsElement>('.chapter-details');
      if (details) details.open = true;
      await tick();
      if (target) { active = entry?.id ?? id; requestAnimationFrame(() => target.scrollIntoView()); }
    };
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) active = entry.target.id;
    }, { rootMargin: '-100px 0px -65% 0px' });
    main.querySelectorAll('.guide-entry').forEach(entry => observer.observe(entry));
    revealFragment(); window.addEventListener('hashchange', revealFragment);
    return () => { observer.disconnect(); window.removeEventListener('hashchange', revealFragment); };
  });
</script>

<PageSeo title={`${collection.title} | ${locale === 'fa' ? 'مهران ضیابری' : 'Mehran Ziabary'}`} description={collection.subtitle}
  path={`${base}/guides/${collection.slug}/`} image={collection.image} imageAlt={collection.imageAlt} {locale} noindex={planned} />
<main class="guide-page" class:gpu-collection={collection.slug === 'gpu-selection'} dir={locale === 'fa' ? 'rtl' : 'ltr'} bind:this={main}>
  <PageHero eyebrow={planned ? copy.planned : collection.eyebrow} title={collection.title} lead={collection.subtitle} />
  {#if planned}
    <section class="wrap planned-intro"><p>{collection.intro}</p><p>{copy.empty}</p><a class="button ghost" href={`${base}/guides/`}>{copy.back} {locale === 'fa' ? '←' : '→'}</a></section>
  {:else}
    <div class="wrap guide-layout" class:has-tools={hasTools}>
      <aside class="guide-navigation">
        <details class="guide-desktop-toc" open><summary>{copy.contents}</summary><nav aria-label={copy.contents}>{@render contents()}</nav></details>
        <details class="guide-mobile-toc"><summary>{copy.contents}</summary><nav aria-label={copy.contents}>{@render contents()}</nav></details>
        <a class="guide-back" href={`${base}/guides/`}>{copy.back}</a>
      </aside>
      <div class="guide-main">
        <div class="guide-overview">
          <img class="guide-cover" {...imageAttributes(collection.image, '(min-width: 1200px) 740px, calc(100vw - 32px)')} alt={collection.imageAlt} width="1600" height="900" />
          {#if collection.slug === 'gpu-selection' && locale === 'fa'}<GuideStart {collection} />{:else}<div><small>{copy.about}</small><p>{collection.intro}</p></div>{/if}
        </div>
        <button class="button ghost continuous-toggle" onclick={toggleContinuous} aria-pressed={continuous}>{continuous ? copy.collapse : copy.continuous}</button>
        {#each collection.items as item, index}
          <article id={item.id} class="guide-entry">
            {#if item.id === 'gpu-comparison-table'}<GpuComparison {locale} />
            {:else if item.id === 'server-comparison-table'}<ServerComparison {locale} />
            {:else}
              {@const article = getArticle(item.id)}
              {@const Content = chapters[item.id]}
              <header><small>{new Intl.NumberFormat(locale).format(index + 1)}</small><h2><a href={item.href}>{item.title}</a></h2></header>
              <p class="chapter-intro">{item.subtitle}</p>
              {#each article?.legacyAnchors ?? [] as anchor}{#if legacyOwners.get(anchor) === item.id}<span id={anchor} class="legacy-anchor"></span>{/if}{/each}
              {#if Content}
                <details class="chapter-details">
                  <summary>{copy.read}: {item.title}</summary>
                  {#if article?.cover}<img class="chapter-cover" {...imageAttributes(article.cover, '(min-width: 1200px) 740px, calc(100vw - 32px)')} alt="" loading="lazy" />{/if}
                  <div class="prose guide-prose"><Content headingPrefix={`${item.id}--`} /></div>
                </details>
              {/if}
              <a class="standalone-link" href={item.href}>{copy.standalone} {locale === 'fa' ? '←' : '→'}</a>
            {/if}
          </article>
        {/each}
      </div>
    </div>
  {/if}
</main>

{#snippet contents()}
  <ol>{#each collection.items as item}
    {@const headings = getArticle(item.id)?.headings ?? []}
    {@const sectionDepth = headings.some(heading => heading.depth === 2) ? 2 : 3}
    <li><a href={`#${item.id}`} aria-current={active === item.id ? 'location' : undefined}>{item.title}</a>
    {#if active === item.id}<ul>{#each headings.filter(heading => heading.depth === sectionDepth) as heading}<li><a href={`#${item.id}--${heading.id}`}>{heading.title}</a></li>{/each}</ul>{/if}
  </li>{/each}</ol>
{/snippet}

<style>
  .planned-intro { max-width: 740px; padding-block: 0 64px; } .planned-intro p { line-height: 2; color: var(--muted); }
  .guide-layout { display: grid; grid-template-columns: minmax(0, 740px) 240px; gap: 32px; max-width: 1012px; align-items: start; padding-bottom: 60px; }
  .guide-layout.has-tools { width: calc(100% - 48px); max-width: 1600px; grid-template-columns: minmax(0, 1fr) 240px; }
  .guide-navigation { grid-column: 2; grid-row: 1; position: sticky; top: 102px; }
  .guide-main { grid-column: 1; grid-row: 1; min-width: 0; }
  nav { display: block; position: static; inset: auto; padding: 0; margin: 0; background: transparent; border: 0; max-height: calc(100dvh - 220px); overflow: auto; }
  nav ol, nav ul { list-style: none; padding: 0; margin: 0; } nav ul { padding-inline-start: 12px; }
  nav a { display: block; font-size: 12px; line-height: 1.8; white-space: normal; padding: 8px 12px; border-inline-start: 2px solid var(--line); color: var(--muted); }
  nav a[aria-current] { color: var(--link-ink); border-color: var(--link-ink); font-weight: 700; }
  summary { padding-block: 12px; cursor: pointer; font-weight: 700; } .guide-mobile-toc { display: none; }
  .guide-back, .standalone-link { display: inline-block; color: var(--link-ink); font-size: 13px; margin-top: 16px; }
  .guide-overview { display: grid; gap: 24px; } .has-tools .guide-overview { grid-template-columns: 1fr 1fr; }
  .guide-cover { width: 100%; height: auto; border-radius: 14px; }
  .guide-overview p { color: var(--muted); line-height: 2; }
  .guide-overview small { color: var(--link-ink); }
  .continuous-toggle { margin-block: 28px; cursor: pointer; color: var(--link-ink); }
  .guide-entry { scroll-margin-top: 110px; padding-block: 28px; border-top: 1px solid var(--line); }
  .guide-entry header { display: flex; align-items: baseline; gap: 14px; }
  header h2 { font-size: 26px; line-height: 1.6; margin: 0; } header small { color: var(--link-ink); }
  .chapter-intro { color: var(--muted); } .chapter-details { border-block: 1px solid var(--line); padding-inline: 8px; }
  .chapter-cover { width: 100%; max-width: 740px; max-height: 400px; height: auto; object-fit: contain; margin: 16px auto; display: block; }
  .guide-prose { width: 100%; max-width: 740px; margin: 0 auto; padding-block: 12px; } .legacy-anchor { scroll-margin-top: 110px; }
  @media (min-width: 1200px) {
    .gpu-collection .guide-layout {
      width: calc(100% - 200px);
      max-width: none;
      margin-inline-start: 12px;
      margin-inline-end: 188px;
      grid-template-columns: 188px minmax(0, 1fr);
      gap: 24px;
      padding-block: 22px 80px;
    }
    .gpu-collection .guide-navigation { grid-column: 1; }
    .gpu-collection .guide-main { grid-column: 2; }
    .gpu-collection > :global(.page-hero) {
      width: calc(100% - 412px);
      margin-inline-start: 224px;
      margin-inline-end: 188px;
      padding-block: 42px 34px;
      text-align: start;
    }
    .gpu-collection > :global(.page-hero h1) {
      max-width: 920px;
      margin-bottom: 12px;
      font-size: clamp(36px, 4.2vw, 58px);
      line-height: 1.25;
    }
    .gpu-collection > :global(.page-hero > p:last-child) { max-width: 900px; font-size: 15px; }
    .gpu-collection .guide-overview {
      grid-template-columns: minmax(0, 1.2fr) minmax(0, .8fr);
      gap: 28px;
      align-items: start;
      padding-block: 30px 38px;
    }
  }
  @media (max-width: 1199px) {
    .guide-layout, .guide-layout.has-tools { display: block; width: calc(100% - 32px); }
    .guide-navigation { position: static; margin-bottom: 24px; } .guide-desktop-toc { display: none; } .guide-mobile-toc { display: block; }
    .guide-navigation nav { max-height: 50vh; } .has-tools .guide-overview { grid-template-columns: 1fr; }
  }
</style>
