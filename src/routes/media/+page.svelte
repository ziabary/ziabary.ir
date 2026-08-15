<script lang="ts">
  import { onMount } from 'svelte';
  import PageHero from '$lib/components/PageHero.svelte';
  import PaginatedArchive from '$lib/components/PaginatedArchive.svelte';
  import { articles } from '$lib/content';
  import { galleryItems, mediaItems, mediaSources, videoItems } from '$lib/data';

  type MediaTab = 'published' | 'videos' | 'photos';

  const tabs: Array<{ id: MediaTab; label: string; count: number }> = [
    { id: 'published', label: 'نوشته‌ها و گفت‌وگوها', count: 0 },
    { id: 'videos', label: 'ویدئوها', count: videoItems.length },
    { id: 'photos', label: 'تصاویر منتخب', count: galleryItems.length }
  ];

  let kind = 'همه';
  let activeTab: MediaTab = 'published';

  const authoredMedia = articles
    .filter((article) => article.showInMedia && article.external)
    .map((article) => ({
      title: article.title,
      source: article.source ?? 'منبع اصلی',
      kind: article.mediaKind ?? 'یادداشت',
      summary: article.excerpt,
      url: article.external!,
      date: article.date,
      faDate: article.faDate
    }));

  const publishedItems = [...authoredMedia, ...mediaItems].sort((a, b) => b.date.localeCompare(a.date));
  tabs[0].count = publishedItems.length;
  const kinds = ['همه', ...new Set(publishedItems.map((item) => item.kind))];
  const persianNumber = new Intl.NumberFormat('fa-IR');
  $: filtered = kind === 'همه' ? publishedItems : publishedItems.filter((item) => item.kind === kind);

  function isMediaTab(value: string): value is MediaTab {
    return value === 'published' || value === 'videos' || value === 'photos';
  }

  function selectTab(tab: MediaTab, updateUrl = true) {
    activeTab = tab;
    if (updateUrl && typeof window !== 'undefined') {
      history.replaceState(null, '', `${window.location.pathname}${window.location.search}#${tab}`);
    }
  }

  function handleTabKey(event: KeyboardEvent) {
    if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();

    const current = tabs.findIndex((tab) => tab.id === activeTab);
    let next = current;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (event.key === 'ArrowRight') next = (current - 1 + tabs.length) % tabs.length;
    if (event.key === 'ArrowLeft') next = (current + 1) % tabs.length;

    selectTab(tabs[next].id);
    document.getElementById(`media-tab-${tabs[next].id}`)?.focus();
  }

  onMount(() => {
    const syncFromHash = () => {
      const hash = window.location.hash.slice(1);
      if (isMediaTab(hash)) selectTab(hash, false);
    };

    syncFromHash();
    window.addEventListener('hashchange', syncFromHash);
    return () => window.removeEventListener('hashchange', syncFromHash);
  });
</script>

<svelte:head><title>بازتاب‌ها | مهران ضیابری</title></svelte:head>

<main>
  <PageHero eyebrow="نوشته، گفت‌وگو و تصویر" title="بازتاب‌ها" lead=""/>

  <div class="media-tabs-shell">
    <div class="wrap media-tabs" role="tablist" aria-label="بخش‌های صفحه بازتاب‌ها" tabindex="-1" onkeydown={handleTabKey}>
      {#each tabs as tab}
        <button
          id={`media-tab-${tab.id}`}
          type="button"
          role="tab"
          aria-selected={activeTab === tab.id}
          aria-controls={`media-panel-${tab.id}`}
          tabindex={activeTab === tab.id ? 0 : -1}
          class:active={activeTab === tab.id}
          onclick={() => selectTab(tab.id)}
        >
          <span>{tab.label}</span>
          <small class="fa-num">{persianNumber.format(tab.count)}</small>
        </button>
      {/each}
    </div>
  </div>

  {#if activeTab === 'published'}
    <div id="media-panel-published" role="tabpanel" aria-labelledby="media-tab-published" class="wrap media-hub-section">
      <div class="media-hub-heading">
        <div><p class="eyebrow">۰۱</p><h2>نوشته‌ها و گفت‌وگوها</h2></div>
      </div>
      <div class="filter-row">
        {#each kinds as item}<button class:active={item === kind} onclick={() => (kind = item)}>{item}</button>{/each}
      </div>
      <PaginatedArchive items={filtered} pageClass="media-list" resetKey={kind}>
        {#snippet item(item, index)}
          <a href={item.url} target="_blank" rel="noreferrer">
            <span class="media-index fa-num">{String(index + 1).padStart(2, '0')}</span>
            <div class="media-entry">
              <div class="media-source">
                {#if mediaSources[item.source]}<span class="media-source-logo"><img src={mediaSources[item.source].logo} alt="" loading="lazy" /></span>{/if}
                <span><strong>{item.source}</strong><small><span>{item.kind}</span><span class="fa-num">{item.faDate}</span></small></span>
              </div>
              <h2>{item.title}</h2>
              <p>{item.summary}</p>
            </div>
            <i>↗</i>
          </a>
        {/snippet}
      </PaginatedArchive>
    </div>
  {:else if activeTab === 'videos'}
    <div id="media-panel-videos" role="tabpanel" aria-labelledby="media-tab-videos" class="wrap media-hub-section media-video-panel">
      <div class="media-hub-heading">
        <div><p class="eyebrow">۰۲</p><h2>ویدئوها</h2></div>
      </div>
      <div class="video-archive">
        {#each videoItems as item}
          <a class="video-card" href={item.url} target="_blank" rel="noreferrer">
            <div class="video-card-visual" class:has-thumbnail={Boolean(item.thumbnail)}>
              {#if item.thumbnail}
                <img src={item.thumbnail} alt="" loading="lazy" />
              {:else}
                <i class={item.icon} aria-hidden="true"></i>
              {/if}
              <span>{item.kind}</span>
            </div>
            <div class="video-card-body">
              <p><strong>{item.source}</strong><span class="fa-num">{item.faDate}</span></p>
              <h2>{item.title}</h2>
              <div>{item.summary}</div>
              <b>مشاهده در منبع اصلی <i>↗</i></b>
            </div>
          </a>
        {/each}
      </div>
    </div>
  {:else}
    <div id="media-panel-photos" role="tabpanel" aria-labelledby="media-tab-photos" class="wrap media-hub-section">
      <div class="media-hub-heading">
        <div><p class="eyebrow">۰۳</p><h2>تصاویر منتخب</h2></div>
      </div>
      <div class="media-gallery media-gallery--all">
        {#each galleryItems as photo}
          <figure><img src={photo.src} alt={photo.alt}/><figcaption><b>{photo.title}</b><span>{photo.caption}</span></figcaption></figure>
        {/each}
      </div>
    </div>
  {/if}
</main>
