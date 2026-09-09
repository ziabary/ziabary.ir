<script lang="ts">
  import { onMount } from 'svelte';
  import PageHero from '$lib/components/PageHero.svelte';
  import GalleryCollection from '$lib/components/GalleryCollection.svelte';
  import { galleryItems, localizeGallery } from '$lib/gallery';

  export let locale: 'en' | 'es';
  type MediaTab = 'published' | 'videos' | 'photos';
  let activeTab: MediaTab = 'published';
  const copies = {
    en: {
      eyebrow: 'Articles, conversations and images', title: 'Media',
      tabsLabel: 'Media sections', published: 'Articles and interviews',
      videos: 'Audio and video interviews', photos: 'Selected images',
      publishedEmpty: 'No English-language interviews or media contributions yet.',
      videosEmpty: 'No English-language audio or video interviews yet.',
      photosEmpty: 'No images are available in this gallery yet.'
    },
    es: {
      eyebrow: 'Textos, conversaciones e imágenes', title: 'Medios',
      tabsLabel: 'Secciones de medios', published: 'Textos y entrevistas',
      videos: 'Entrevistas en audio y vídeo', photos: 'Imágenes seleccionadas',
      publishedEmpty: 'Todavía no hay entrevistas ni colaboraciones en medios en español.',
      videosEmpty: 'Todavía no hay entrevistas en audio o vídeo en español.',
      photosEmpty: 'Todavía no hay imágenes disponibles en esta galería.'
    }
  } as const;
  $: copy = copies[locale];
  $: photos = localizeGallery(galleryItems, locale);
  $: numbers = new Intl.NumberFormat(locale);
  $: tabs = [
    { id: 'published' as const, label: copy.published, count: 0 },
    { id: 'videos' as const, label: copy.videos, count: 0 },
    { id: 'photos' as const, label: copy.photos, count: photos.length }
  ];

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
    if (event.key === 'ArrowRight') next = (current + 1) % tabs.length;
    if (event.key === 'ArrowLeft') next = (current - 1 + tabs.length) % tabs.length;
    selectTab(tabs[next].id);
    document.getElementById(`media-tab-${tabs[next].id}`)?.focus();
  }

  onMount(() => {
    const syncFromHash = () => {
      const tab = window.location.hash.slice(1);
      if (tab === 'published' || tab === 'videos' || tab === 'photos') selectTab(tab, false);
    };
    syncFromHash();
    window.addEventListener('hashchange', syncFromHash);
    return () => window.removeEventListener('hashchange', syncFromHash);
  });
</script>

<svelte:head><title>{copy.title} | Mehran Ziabary</title></svelte:head>
<main class="localized-media" dir="ltr">
  <PageHero eyebrow={copy.eyebrow} title={copy.title} lead="" />
  <div class="media-tabs-shell">
    <div class="wrap media-tabs" role="tablist" aria-label={copy.tabsLabel} tabindex="-1" onkeydown={handleTabKey}>
      {#each tabs as tab}
        <button id={`media-tab-${tab.id}`} type="button" role="tab"
          aria-selected={activeTab === tab.id} aria-controls={`media-panel-${tab.id}`}
          tabindex={activeTab === tab.id ? 0 : -1} class:active={activeTab === tab.id}
          onclick={() => selectTab(tab.id)}>
          <span id={tab.id}>{tab.label}</span><small>{numbers.format(tab.count)}</small>
        </button>
      {/each}
    </div>
  </div>
  {#each tabs as tab, index}
    <div id={`media-panel-${tab.id}`} role="tabpanel" aria-labelledby={`media-tab-${tab.id}`}
      class="wrap media-hub-section" hidden={activeTab !== tab.id} tabindex="0">
      {#if activeTab === tab.id}
        <div class="media-hub-heading"><div><p class="eyebrow">{String(index + 1).padStart(2, '0')}</p><h2>{tab.label}</h2></div></div>
        {#if tab.id === 'photos' && photos.length}
          <GalleryCollection items={photos} {locale} compact />
        {:else}
          <div class="media-empty">
            <i class={tab.id === 'published' ? 'fa-regular fa-newspaper' : tab.id === 'videos' ? 'fa-solid fa-headphones' : 'fa-regular fa-images'} aria-hidden="true"></i>
            <p>{tab.id === 'published' ? copy.publishedEmpty : tab.id === 'videos' ? copy.videosEmpty : copy.photosEmpty}</p>
          </div>
        {/if}
      {/if}
    </div>
  {/each}
</main>

<style>
  .localized-media :global(.page-hero), .media-hub-section { text-align: left; }
  .media-hub-section[hidden] { display: none; }
  .media-empty { display: grid; justify-items: center; align-content: center; gap: 18px; min-height: 220px; padding: 32px; border: 1px solid var(--line); border-radius: 12px; background: var(--soft); text-align: center; }
  .media-empty i { font-size: 32px; color: var(--teal); }
  .media-empty p { max-width: 520px; margin: 0; color: var(--muted); font-size: 14px; line-height: 1.9; }
  @media (max-width: 680px) {
    .media-tabs { display: grid; overflow: visible; }
    .media-tabs button { min-width: 0; flex-direction: column; padding: 12px 6px; }
    .media-tabs button span { white-space: normal; line-height: 1.5; }
  }
</style>
