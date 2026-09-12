<script lang="ts">
  import { imageAttributes } from '$lib/images';
  import { onMount, onDestroy } from 'svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import PageHero from './PageHero.svelte';
  import PageSeo from './PageSeo.svelte';
  import ArticleCard from './ArticleCard.svelte';
  import type { ArticleMeta } from '$lib/content';
  import type { Locale } from '$lib/editions';
  import { availableTopics, classification, topics } from '$lib/topics';
  import { PAGE_SIZE, archivePath, pageCount } from '$lib/archive.mjs';
  import { searchItems } from '$lib/search.mjs';
  import { loadSearchIndex } from '$lib/search-index.mjs';
  import { formatDate } from '$lib/publication.mjs';
  export let locale: Locale;
  export let records: ArticleMeta[];
  export let currentPage = 1;
  let mounted = false;
  let query = '';
  let indexBodies = new Map<string, string>();
  let indexLocale: string | undefined;
  let indexReady = false;
  let indexFailed = false;
  let indexController: AbortController | undefined;
  async function loadIndex(language: Locale) {
    indexController?.abort();
    const controller = new AbortController();
    indexController = controller;
    indexLocale = language;
    indexReady = false;
    indexFailed = false;
    indexBodies = new Map();
    try {
      const entries = await loadSearchIndex(language, controller.signal);
      if (!controller.signal.aborted) {
        indexBodies = new Map(entries.map(item => [item.href, item.body ?? '']));
        indexReady = true;
      }
    } catch {
      if (!controller.signal.aborted) indexFailed = true;
    }
  }
  onDestroy(() => indexController?.abort());
  $: if (mounted && indexLocale !== locale) loadIndex(locale);
  $: waitingForSearch = Boolean(query.trim()) && !indexReady;

  let category = '';
  let view: 'grid' | 'list' = 'grid';
  const viewStorageKey = 'ziabary-archive-view';
  const copies = {
    fa: { title: 'نوشته‌ها و یادداشت‌ها', lead: 'تحلیل‌های فنی و مدیریتی؛ گاهی هم سفرنامه و دلنوشته.', archive: 'آرشیو', search: 'جستجو در عنوان، متن و دسته‌بندی', loading: 'در حال آماده‌سازی جستجو…', failed: 'دریافت متن مقالات برای جستجو ممکن نشد.', retry: 'تلاش دوباره', all: 'همهٔ موضوع‌ها و دسته‌ها', previous: 'قبلی', next: 'بعدی', pages: 'صفحه‌های آرشیو', empty: 'نوشته‌ای با این انتخاب پیدا نشد.', page: 'صفحه', read: 'خواندن نوشته', view: 'نمایش آرشیو', grid: 'نمایش شبکه‌ای', list: 'نمایش فهرستی' },
    en: { title: 'Articles', lead: 'Technical articles, essays and historical notes, selected for English readers.', archive: 'Archive', search: 'Search titles, full text and categories', loading: 'Preparing search…', failed: 'Could not load articles for search.', retry: 'Try again', all: 'All topics and categories', previous: 'Previous', next: 'Next', pages: 'Archive pages', empty: 'No articles match this selection.', page: 'Page', read: 'Read article', view: 'Archive layout', grid: 'Grid view', list: 'List view' },
    es: { title: 'Artículos', lead: 'Artículos técnicos y ensayos seleccionados para lectores en español.', archive: 'Archivo', search: 'Buscar títulos, texto completo y categorías', loading: 'Preparando la búsqueda…', failed: 'No se pudieron cargar los artículos para buscar.', retry: 'Reintentar', all: 'Todos los temas y categorías', previous: 'Anterior', next: 'Siguiente', pages: 'Páginas del archivo', empty: 'No hay artículos que coincidan.', page: 'Página', read: 'Leer artículo', view: 'Vista del archivo', grid: 'Vista de cuadrícula', list: 'Vista de lista' }
  };
  $: copy = copies[locale];
  $: numbers = new Intl.NumberFormat(locale);
  $: categories = [...new Set(records.map(article => article.category))];
  $: if (mounted) { query = $page.url.searchParams.get('q') ?? ''; category = $page.url.searchParams.get('category') ?? ''; }
  $: selected = records.filter(article => !category || (category.startsWith('topic:') ? classification(article).topic === category.slice(6) : article.category === category)).map(article => {
    const href = `${locale === 'fa' ? '' : `/${locale}`}/articles/${article.slug}/`;
    const topic = topics.find(item => item.locale === locale && item.slug === classification(article).topic);
    return { ...article, href, body: indexBodies.get(href), tags: topic?.title ?? '' };
  });
  $: filtered = searchItems(selected, query);
  $: filtering = Boolean(query || category);
  $: totalPages = pageCount(filtered.length);
  $: resultPage = mounted && filtering ? Math.max(1, Math.min(totalPages, Math.trunc(Number($page.url.searchParams.get('p'))) || 1)) : Math.min(currentPage, totalPages);
  $: visible = filtered.slice((resultPage - 1) * PAGE_SIZE, resultPage * PAGE_SIZE);
  $: canonical = archivePath(locale, filtering ? 1 : currentPage);
  function destination(number: number) {
    if (!filtering) return archivePath(locale, number);
    const params = new URLSearchParams();
    if (query) params.set('q', query); if (category) params.set('category', category); if (number > 1) params.set('p', String(number));
    return `${archivePath(locale)}?${params}`;
  }
  function updateFilters() {
    const params = new URLSearchParams();
    if (query) params.set('q', query); if (category) params.set('category', category);
    goto(`${archivePath(locale)}${params.size ? '?' + params : ''}`, { replaceState: true, keepFocus: true, noScroll: true });
  }
  function updateView(value: string) {
    view = value === 'list' ? 'list' : 'grid';
    try { localStorage.setItem(viewStorageKey, view); } catch { /* Keep the view buttons usable when storage is unavailable. */ }
  }
  onMount(() => {
    try { view = localStorage.getItem(viewStorageKey) === 'list' ? 'list' : 'grid'; } catch { /* Use the default layout. */ }
    mounted = true;
    const legacyPage = $page.url.searchParams.get('page');
    if (legacyPage && !query && !category) {
      const number = Number(legacyPage);
      if (Number.isInteger(number) && number > 0 && number <= pageCount(records.length)) goto(archivePath(locale, number), { replaceState: true });
    }
  });
</script>

<PageSeo title={`${copy.title}${currentPage > 1 ? ` — ${copy.page} ${numbers.format(currentPage)}` : ''} | ${locale === 'fa' ? 'مهران ضیابری' : 'Mehran Ziabary'}`}
  description={copy.lead} path={canonical} image="/images/profile/mehran-ziabary-formal.png" {locale} noindex={filtering} />
<main class="article-archive" dir={locale === 'fa' ? 'rtl' : 'ltr'}>
  <PageHero eyebrow={copy.archive} title={copy.title} lead={copy.lead} />
  <section class="wrap archive-controls" aria-label={copy.search}>
    <label><span>{copy.search}</span><input type="search" bind:value={query} oninput={event => { query = event.currentTarget.value; updateFilters(); }} /></label>
    <label><span>{copy.all}</span><select bind:value={category} onchange={event => { category = event.currentTarget.value; updateFilters(); }}><option value="">{copy.all}</option>{#each availableTopics(locale) as topic}<option value={`topic:${topic.slug}`}>{topic.title}</option>{/each}{#each categories as item}<option value={item}>{item}</option>{/each}</select></label>
    <div class="archive-view">
      <span id="archive-view-label">{copy.view}</span>
      <div class="archive-view-buttons" role="group" aria-labelledby="archive-view-label">
        <button type="button" value="grid" aria-label={copy.grid} title={copy.grid} aria-pressed={view === 'grid'} aria-controls="archive-items" disabled={!mounted} onclick={() => updateView('grid')}><i class="fa-solid fa-table-cells" aria-hidden="true"></i></button>
        <button type="button" value="list" aria-label={copy.list} title={copy.list} aria-pressed={view === 'list'} aria-controls="archive-items" disabled={!mounted} onclick={() => updateView('list')}><i class="fa-solid fa-list-ul" aria-hidden="true"></i></button>
      </div>
    </div>
  </section>
  <section class="wrap archive-results" class:archive-rows={view === 'list'} aria-label={copy.title}>
    {#if waitingForSearch}
      <p class="archive-status" role="status" aria-busy={!indexFailed}>{indexFailed ? copy.failed : copy.loading}
        {#if indexFailed}<button type="button" onclick={() => loadIndex(locale)}>{copy.retry}</button>{/if}
      </p>
    {:else}
    <p class="archive-status" aria-live="polite">{copy.page} {numbers.format(resultPage)} / {numbers.format(totalPages)} · {numbers.format(filtered.length)} {locale === 'fa' ? 'نوشته' : locale === 'en' ? 'articles' : 'artículos'}</p>
    <div id="archive-items" class="archive-items" class:archive-grid={view === 'grid'}>
    {#each visible as article}
      {#if view === 'grid'}
        <ArticleCard {article} {locale} headingTag="h2" />
      {:else}
      <article class="archive-row">
        {#if article.cover}<a class="archive-thumbnail" href={article.href} tabindex="-1" aria-hidden="true"><img {...imageAttributes(article.cover, '(max-width: 680px) 88px, 180px')} alt="" loading="lazy" width="180" height="120" /></a>{/if}
        <div><div class="row-meta"><span>{article.category}</span><time datetime={article.date}>{locale === 'fa' && article.faDate ? article.faDate : formatDate(article.date, locale)}</time></div>
          <h2><a href={article.href}>{article.title}</a></h2><p>{article.excerpt}</p><a class="text-link" href={article.href}>{copy.read} {locale === 'fa' ? '←' : '→'}</a></div>
      </article>
      {/if}
    {:else}<p class="archive-empty">{copy.empty}</p>{/each}
    </div>
    {#if totalPages > 1}<nav class="archive-pagination" aria-label={copy.pages}>
      {#if resultPage > 1}<a href={destination(resultPage - 1)} rel="prev">{copy.previous}</a>{/if}
      {#each Array(totalPages) as _, index}<a href={destination(index + 1)} aria-current={resultPage === index + 1 ? 'page' : undefined} aria-label={`${copy.page} ${numbers.format(index + 1)}`}>{numbers.format(index + 1)}</a>{/each}
      {#if resultPage < totalPages}<a href={destination(resultPage + 1)} rel="next">{copy.next}</a>{/if}
    </nav>{/if}
    {/if}
  </section>
</main>

<style>
  .archive-controls { display: flex; flex-wrap: wrap; gap: 20px; align-items: end; margin-bottom: 26px; }
  label { display: grid; gap: 6px; font-size: 12px; color: var(--muted); flex: 1; min-width: 220px; }
  .archive-view { display: grid; gap: 6px; flex: 0 0 auto; font-size: 12px; color: var(--muted); }
  .archive-view-buttons { display: flex; gap: 6px; }
  .archive-view button { display: inline-flex; align-items: center; justify-content: center; width: 44px; min-height: 44px; padding: 0; border: 1px solid var(--line); border-radius: 7px; background: var(--paper); color: var(--muted); cursor: pointer; }
  .archive-view button:hover:not(:disabled) { border-color: var(--teal-deep); color: var(--ink); }
  .archive-view button[aria-pressed="true"] { border-color: var(--teal-deep); background: var(--teal-deep); color: white; }
  .archive-view button[aria-pressed="true"]:hover:not(:disabled) { color: white; }
  .archive-view button:disabled { cursor: default; opacity: .55; }
  .archive-view i { font-size: 18px; }
  input, select { min-height: 44px; border: 1px solid var(--line); border-radius: 7px; padding: 8px 12px; color: var(--ink); background: var(--paper); font: inherit; width: 100%; }
  .archive-rows { max-width: 1000px; } .archive-status { color: var(--muted); font-size: 13px; }
  .archive-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 22px; }
  .archive-grid :global(.article-card:first-child) { grid-column: auto; }
  .archive-grid :global(.card-body h2) { font-size: 19px; line-height: 1.7; margin: 10px 0; }
  .archive-empty { grid-column: 1 / -1; }
  .archive-row { display: flex; gap: 24px; border-top: 1px solid var(--line); padding-block: 26px; }
  .archive-thumbnail { flex: 0 0 180px; align-self: start; } img { width: 180px; height: 120px; object-fit: cover; border-radius: 8px; }
  .archive-row > div { flex: 1; min-width: 0; } .row-meta { display: flex; flex-wrap: wrap; gap: 14px; color: var(--link-ink); font-size: 11px; }
  h2 { font-size: 23px; line-height: 1.6; margin: 8px 0; } .archive-row p { color: var(--muted); font-size: 14px; line-height: 1.9; margin: 8px 0 12px; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 3; line-clamp: 3; overflow: hidden; }
  .archive-pagination { display: flex; position: static; inset: auto; justify-content: center; flex-wrap: wrap; gap: 8px; padding: 24px 0; margin: 0; background: transparent; }
  .archive-pagination a { display: inline-flex; justify-content: center; align-items: center; min-width: 44px; min-height: 44px; padding: 6px 12px; border: 1px solid var(--line); border-radius: 6px; }
  a[aria-current] { background: var(--teal-deep); color: white; }
  @media (max-width: 980px) { .archive-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
  @media (max-width: 680px) { .archive-grid { grid-template-columns: minmax(0, 1fr); } .archive-row { gap: 14px; } .archive-thumbnail { flex-basis: 88px; } img { width: 88px; height: 88px; } h2 { font-size: 18px; } .archive-row p { font-size: 13px; } }
</style>
