<script lang="ts">
  import PageHero from '$lib/components/PageHero.svelte';
  import ArticleCard from '$lib/components/ArticleCard.svelte';
  import { articles } from '$lib/content';
  import { galleryItems } from '$lib/data';
  export let locale: 'en' | 'es';
  $: writing = articles.filter((article) => article.lang === locale && ['building-targoman-without-patronage','sms-otp-security-design','construir-targoman-sin-padrinos','cuando-un-otp-por-sms-reduce-la-seguridad'].includes(article.slug));
  const copies = {
    en: {
      eyebrow: 'Writing, conversations and images', title: 'Media',
      lead: 'A language-specific record of published work and selected professional images. Items appear here only when their context is accessible in English.',
      writing: 'Published writing', writingNote: 'International editions available in full on this site.',
      video: 'Video', videoNote: 'English-captioned or English-language recordings will be added after review.',
      videoEmpty: 'No reviewed English video is available yet', photos: 'Selected images',
      captions: ['In conversation at Peivast Media', 'Speaking at a professional event', 'Official portrait']
    },
    es: {
      eyebrow: 'Textos, conversaciones e imágenes', title: 'Medios',
      lead: 'Un registro específico para este idioma de trabajos publicados e imágenes profesionales. Solo aparece contenido cuyo contexto puede entenderse en español.',
      writing: 'Textos publicados', writingNote: 'Ediciones internacionales disponibles íntegramente en este sitio.',
      video: 'Vídeo', videoNote: 'Las grabaciones en español o con subtítulos revisados se añadirán después de su preparación.',
      videoEmpty: 'Todavía no hay vídeos revisados en español', photos: 'Imágenes seleccionadas',
      captions: ['Conversación en Peivast Media', 'Presentación en un evento profesional', 'Retrato oficial']
    }
  } as const;
  $: copy = copies[locale];
</script>

<svelte:head><title>{copy.title} | Mehran Ziabary</title></svelte:head>
<main class="localized-media" dir="ltr">
  <PageHero eyebrow={copy.eyebrow} title={copy.title} lead={copy.lead} />
  <div class="media-local-nav"><div class="wrap"><a href="#published">{copy.writing}</a><a href="#videos">{copy.video}</a><a href="#photos">{copy.photos}</a></div></div>
  <section id="published" class="wrap media-hub-section"><div class="media-hub-heading"><div><p class="eyebrow">01</p><h2>{copy.writing}</h2></div><p>{copy.writingNote}</p></div><div class="archive-list">{#each writing as article}<ArticleCard {article} {locale} />{/each}</div></section>
  <section id="videos" class="media-video-band"><div class="wrap media-video-grid"><div><p class="eyebrow">02</p><h2>{copy.video}</h2><p>{copy.videoNote}</p></div><div class="video-placeholder"><i class="fa-solid fa-play" aria-hidden="true"></i><span>{copy.videoEmpty}</span></div></div></section>
  <section id="photos" class="wrap media-hub-section"><div class="media-hub-heading"><div><p class="eyebrow">03</p><h2>{copy.photos}</h2></div></div><div class="media-gallery">{#each galleryItems.slice(0,3) as photo,index}<figure><img src={photo.src} alt={copy.captions[index]} /><figcaption>{copy.captions[index]}</figcaption></figure>{/each}</div></section>
</main>

<style>.localized-media :global(.page-hero),.localized-media :global(.media-hub-section),.localized-media :global(.media-video-band){text-align:left}</style>
