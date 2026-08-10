<script lang="ts">
  import { onMount } from 'svelte';
  import PageHero from '$lib/components/PageHero.svelte';
  import GpuComparison from '$lib/components/GpuComparison.svelte';
  import ServerComparison from '$lib/components/ServerComparison.svelte';
  import { getArticleModule } from '$lib/content';
  import { articleCount, guideKindLabels, nonArticleCount } from '$lib/guides';

  export let data;

  const collection = data.collection;
  const persianNumber = new Intl.NumberFormat('fa-IR');
  const isGpuCollection = collection.slug === 'gpu-selection';
  let activeSection = collection.items[0]?.id ?? 'overview';
  const articleContent = (slug: string) => getArticleModule(slug)?.default;

  onMount(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('.guide-entry[id]'));
    if (!sections.length) return;
    let ticking = false;

    const update = () => {
      const readingLine = window.innerHeight * 0.34;
      let current = sections[0].id;
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= readingLine) current = section.id;
        else break;
      }
      activeSection = current;
      ticking = false;
    };

    const scroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', scroll, { passive: true });
    window.addEventListener('resize', scroll);
    return () => {
      window.removeEventListener('scroll', scroll);
      window.removeEventListener('resize', scroll);
    };
  });
</script>

<svelte:head>
  <title>{collection.title} | فنی‌جات مهران ضیابری</title>
  <meta name="description" content={collection.intro} />
</svelte:head>

<main>
  <div class:gpu-page-hero={isGpuCollection}>
    <PageHero eyebrow={`فنی‌جات / ${collection.eyebrow}`} title={collection.title} lead={collection.subtitle} />
  </div>

  <section class="wrap guide-series-layout" class:gpu-collection={isGpuCollection}>
    <aside class="guide-series-navigation" aria-label="فهرست مجموعه">
      <a class="back-link" href="/guides/">همهٔ فنی‌جات ←</a>
      <span>در این مجموعه</span>
      {#if collection.items.length}
        {#each collection.items as item, index}
          <a href={`#${item.id}`} class:active={activeSection === item.id}>
            <small>{persianNumber.format(index + 1)}</small>{item.title}
          </a>
        {/each}
      {:else}
        <p>فهرست با انتشار نخستین محتوا فعال می‌شود.</p>
      {/if}
    </aside>

    <div class="guide-series-body">
      <div class="guide-series-overview">
        <figure class="guide-series-cover">
          <img src={collection.image} alt={collection.imageAlt} width="1600" height="900" />
        </figure>

        <div class="guide-series-intro">
          <div>
            <small>دربارهٔ این مجموعه</small>
            <p>{collection.intro}</p>
          </div>
          <dl>
            <div><dt>مقاله‌ها</dt><dd>{persianNumber.format(articleCount(collection))}</dd></div>
            <div><dt>محتوای زنده</dt><dd>{persianNumber.format(nonArticleCount(collection))}</dd></div>
            <div><dt>ترتیب</dt><dd>دستی</dd></div>
            <div><dt>به‌روزرسانی</dt><dd>پیوسته</dd></div>
          </dl>
        </div>
      </div>

      {#if collection.items.length}
        <div class="guide-entry-list">
          {#each collection.items as item, index}
            {#if item.id === 'gpu-comparison-table'}
              <div id={item.id} class="guide-entry gpu-table-entry">
                <GpuComparison />
              </div>
            {:else if item.id === 'server-comparison-table'}
              <div id={item.id} class="guide-entry gpu-table-entry">
                <ServerComparison />
              </div>
            {:else}
              <article id={item.id} class="guide-entry guide-article">
                <header>
                  <small>{persianNumber.format(index + 1).padStart(2, '۰')}</small>
                  <div><span>{guideKindLabels[item.kind]}</span><h2>{item.title}</h2></div>
                </header>
                <p>{item.subtitle}</p>
                {#if item.kind === 'article' && articleContent(item.id)}
                  <div class="guide-article-prose"><svelte:component this={articleContent(item.id)} /></div>
                {/if}
                {#if item.href}<a class="standalone-link" href={item.href}>بازکردن نسخهٔ مستقل مقاله ←</a>{/if}
              </article>
            {/if}
          {/each}
        </div>
      {:else}
        <section class="guide-empty" aria-label="مجموعه در انتظار محتوا">
          <span>۰۰</span>
          <div><b>ساختار این مجموعه آماده است.</b><p>محتواها پس از آماده‌شدن، با ترتیب مطالعهٔ مشخص در همین صفحه قرار می‌گیرند.</p></div>
        </section>
      {/if}
    </div>
  </section>
</main>

<style>
  .guide-series-layout {
    padding-block: 22px 80px;
    display: grid;
    grid-template-columns: 230px minmax(0, 820px);
    gap: 70px;
    align-items: start;
  }

  .guide-series-layout.gpu-collection {
    width: calc(100% - 200px);
    max-width: none;
    margin-right: 12px;
    margin-left: 188px;
    grid-template-columns: 188px minmax(0, 1fr);
    gap: 24px;
  }

  .gpu-page-hero {
    width: calc(100% - 412px);
    margin-right: 224px;
    margin-left: 188px;
  }
  .gpu-page-hero :global(.page-hero) {
    width: 100%;
    padding-block: 42px 34px;
    text-align: right;
  }
  .gpu-page-hero :global(.page-hero h1) {
    max-width: 920px;
    margin-bottom: 12px;
    font-size: clamp(36px, 4.2vw, 58px);
    line-height: 1.25;
  }
  .gpu-page-hero :global(.page-hero > p:last-child) { max-width: 900px; font-size: 15px; }

  .guide-series-navigation {
    position: sticky;
    top: 105px;
    display: grid;
    border-inline-end: 1px solid var(--line);
    padding-inline-end: 22px;
  }

  .guide-series-navigation > span {
    margin: 26px 0 13px;
    color: var(--muted);
    font-size: 9px;
  }

  .guide-series-navigation > a:not(.back-link) {
    position: relative;
    display: grid;
    grid-template-columns: 18px 1fr;
    gap: 7px;
    padding: 9px 0;
    color: var(--muted);
    font-size: 11px;
    line-height: 1.7;
  }

  .guide-series-navigation > a:not(.back-link)::after {
    content: '';
    position: absolute;
    inset-inline-end: -23px;
    top: 50%;
    width: 2px;
    height: 0;
    background: var(--teal);
    transition: height 0.2s;
    transform: translateY(-50%);
  }

  .guide-series-navigation > a.active { color: var(--teal); font-weight: 700; }
  .guide-series-navigation > a.active::after { height: 25px; }
  .guide-series-navigation a small { color: var(--teal); font-size: 8px; }
  .guide-series-navigation p { margin: 0; color: var(--muted); font-size: 10px; line-height: 1.9; }
  .back-link { color: var(--teal); font-size: 10px; font-weight: 700; }

  .guide-series-body { min-width: 0; }
  .guide-series-overview { display: contents; }
  .guide-series-cover { margin: 0; aspect-ratio: 16 / 8.5; overflow: hidden; border-radius: 15px; background: var(--navy); }
  .guide-series-cover img { width: 100%; height: 100%; display: block; object-fit: cover; }
  .gpu-collection .guide-series-overview {
    display: grid;
    grid-template-columns: minmax(420px, 1.2fr) minmax(330px, .8fr);
    gap: 28px;
    align-items: stretch;
    padding: 30px 0 38px;
  }
  .gpu-collection .guide-series-cover { max-width: none; min-height: 300px; margin: 0; aspect-ratio: auto; }

  .guide-series-intro {
    display: grid;
    grid-template-columns: 1fr 250px;
    gap: 42px;
    align-items: end;
    padding: 38px 0 48px;
    border-bottom: 1px solid var(--line);
  }
  .gpu-collection .guide-series-intro {
    max-width: none;
    margin: 0;
    padding: 26px;
    grid-template-columns: 1fr;
    gap: 24px;
    align-content: end;
    border: 1px solid var(--line);
  }
  .gpu-collection .guide-series-intro dl { max-width: none; }

  .guide-series-intro small { color: var(--teal); font-size: 9px; }
  .guide-series-intro p { margin: 11px 0 0; color: color-mix(in srgb, var(--ink) 80%, var(--muted)); font-size: 14px; line-height: 2.1; }
  .guide-series-intro dl { margin: 0; display: grid; grid-template-columns: repeat(4, 1fr); border: 1px solid var(--line); }
  .guide-series-intro dl > div { padding: 12px 10px; display: grid; gap: 4px; }
  .guide-series-intro dl > div + div { border-inline-start: 1px solid var(--line); }
  .guide-series-intro dt { color: var(--muted); font-size: 8px; }
  .guide-series-intro dd { margin: 0; color: var(--ink); font-size: 11px; font-weight: 800; }

  .guide-entry { scroll-margin-top: 105px; padding: 58px 0; border-bottom: 1px solid var(--line); }
  .guide-entry header { display: grid; grid-template-columns: 64px 1fr; gap: 10px; }
  .guide-entry header > small { color: color-mix(in srgb, var(--teal) 50%, var(--line)); font-size: 36px; }
  .guide-entry header span { color: var(--teal); font-size: 8px; }
  .guide-entry h2 { margin: 5px 0 0; font-size: 28px; line-height: 1.6; }
  .guide-entry > p { margin: 14px 74px 0 0; color: var(--muted); font-size: 13px; line-height: 2; }
  .guide-entry > a { display: inline-block; margin: 20px 74px 0 0; color: var(--teal); font-size: 10px; font-weight: 700; }
  .gpu-table-entry { padding-top: 0; border-bottom: 0; }
  .guide-article { padding-block: 64px; }
  .guide-article-prose { max-width: 820px; margin: 34px 74px 0 0; padding-top: 12px; border-top: 1px solid var(--line); }
  .guide-article-prose :global(h2), .guide-article-prose :global(h3), .guide-article-prose :global(h4), .guide-article-prose :global(h5) { scroll-margin-top: 110px; line-height: 1.7; }
  .guide-article-prose :global(h2) { margin: 42px 0 12px; font-size: 27px; }
  .guide-article-prose :global(h3) { margin: 38px 0 10px; font-size: 22px; }
  .guide-article-prose :global(h4), .guide-article-prose :global(h5) { margin: 32px 0 8px; font-size: 18px; }
  .guide-article-prose :global(p), .guide-article-prose :global(li) { color: color-mix(in srgb, var(--ink) 86%, var(--muted)); font-size: 15px; line-height: 2.2; }
  .guide-article-prose :global(ul), .guide-article-prose :global(ol) { padding-inline-start: 24px; }
  .guide-article-prose :global(a) { color: var(--teal); text-decoration: underline; text-underline-offset: 4px; }
  .guide-article-prose :global(img) { display: block; max-width: 100%; height: auto; margin: 30px auto; border-radius: 10px; }
  .guide-article-prose :global(blockquote) { margin: 32px 0; padding: 8px 20px; border-inline-start: 3px solid var(--teal); background: var(--soft); }
  .guide-article-prose :global(table) { display: block; width: 100%; overflow-x: auto; border-collapse: collapse; margin: 28px 0; font-size: 12px; line-height: 1.9; }
  .guide-article-prose :global(th), .guide-article-prose :global(td) { min-width: 150px; padding: 11px 13px; border: 1px solid var(--line); text-align: right; vertical-align: top; }
  .guide-article-prose :global(th) { background: var(--soft); color: var(--ink); font-weight: 700; }
  .standalone-link { margin-top: 32px !important; padding: 9px 13px; border: 1px solid var(--line); border-radius: 99px; }

  .guide-empty {
    min-height: 230px;
    display: grid;
    grid-template-columns: 110px 1fr;
    gap: 30px;
    align-items: center;
    border-bottom: 1px solid var(--line);
  }

  .guide-empty > span { color: var(--line); font-size: 58px; }
  .guide-empty b { display: block; margin-bottom: 7px; font-size: 18px; }
  .guide-empty p { margin: 0; color: var(--muted); font-size: 11px; line-height: 1.9; }

  @media (max-width: 980px) {
    .guide-series-layout { grid-template-columns: 190px minmax(0, 1fr); gap: 38px; }
    .guide-series-layout.gpu-collection { width: calc(100% - 180px); margin-right: 10px; margin-left: 170px; grid-template-columns: 170px minmax(0, 1fr); gap: 28px; }
    .gpu-page-hero { width: calc(100% - 378px); margin-right: 208px; margin-left: 170px; }
    .gpu-collection .guide-series-overview { grid-template-columns: 1fr; }
    .gpu-collection .guide-series-cover { min-height: 0; aspect-ratio: 16 / 8.5; }
    .guide-series-intro { grid-template-columns: 1fr; gap: 24px; }
    .guide-series-intro dl { max-width: 360px; }
  }

  @media (max-width: 700px) {
    .guide-series-layout { grid-template-columns: 1fr; gap: 24px; }
    .guide-series-layout.gpu-collection { width: min(100% - 28px, 1500px); margin-inline: auto; grid-template-columns: 1fr; }
    .gpu-page-hero { width: min(100% - 28px, 1500px); margin-inline: auto; }
    .gpu-page-hero :global(.page-hero) { padding-block: 34px 28px; }
    .gpu-page-hero :global(.page-hero h1) { font-size: 36px; }
    .guide-series-navigation {
      position: static;
      overflow-x: auto;
      grid-auto-flow: column;
      grid-auto-columns: max-content;
      align-items: center;
      gap: 18px;
      border: 0;
      border-bottom: 1px solid var(--line);
      padding: 0 0 15px;
    }
    .guide-series-navigation > span { display: none; }
    .guide-series-navigation > p { white-space: nowrap; }
    .guide-series-navigation > a:not(.back-link) { display: inline-flex; white-space: nowrap; }
    .guide-series-navigation > a:not(.back-link)::after { display: none; }
    .guide-series-cover { aspect-ratio: 16 / 10; }
    .guide-series-intro { padding-top: 26px; }
    .guide-entry header { grid-template-columns: 48px 1fr; }
    .guide-entry > p, .guide-entry > a, .guide-article-prose { margin-inline: 0; }
    .guide-empty { grid-template-columns: 70px 1fr; gap: 15px; }
    .guide-empty > span { font-size: 42px; }
  }
</style>
