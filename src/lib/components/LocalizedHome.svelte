<script lang="ts">
  import ArticleCard from '$lib/components/ArticleCard.svelte';
  import { articles } from '$lib/content';
  import HomeTopics from '$lib/components/HomeTopics.svelte';
  import HomePresentation from '$lib/components/HomePresentation.svelte';
  import GalleryCollection from '$lib/components/GalleryCollection.svelte';
  import { galleryItems, localizeGallery } from '$lib/gallery';
  import '$lib/components/home-previews.css';
  export let locale: 'en' | 'es';

  const copies = {
    en: {
      title: 'Mehran Ziabary | Technology, AI and governance',
      description: 'Mehran Ziabary—technology executive, entrepreneur and AI researcher working across systems architecture, organisational decisions and technology governance.',
      eyebrow: 'Technology · Governance · Building',
      lead: 'Technology executive and AI researcher focused on systems architecture, organisational decision-making and technology governance.',
      official: 'Full legal name: Seyed Mohammad Mohammadzadeh Ziabary',
      commissionRole: 'Chair, AI & Data Science Commission', commissionOrg: 'Tehran ICT Guild Organization',
      targomanRole: 'Co-founder and CEO', targomanOrg: 'Targoman Intelligent Processing',
      writingButton: 'Read my articles', resumeButton: 'Résumé',
      experience: 'More than 28 years of experience', experienceLine: 'From electronics and robotics to network security, AI and technology governance',
      thoughtNo: '01 / Thought',
      statement: 'Every technology springs from a philosophy: a way of seeing the problem, the human being, agency and responsibility. Using technology without understanding these deeper layers, however complex or expensive it may be, ultimately amounts to little more than playing with new tools.',
      thoughtLink: 'How I look at technology →',
      latest: 'Latest articles', analysis: 'Essays & field notes', allWriting: 'Browse all articles →',
      hoomasRole: 'Vice President of Technology', hoomasOrg: 'AI Export Facilitators (Hoomas)',
      mediaEyebrow: 'Media', mediaTitle: 'Selected images', mediaAll: 'Browse the gallery →',
      mediaNote: 'English-language interviews and media contributions have not been published yet.',
      mediaEmpty: 'No images are available in English yet.'
    },
    es: {
      title: 'Mehran Ziabary | Tecnología, IA y gobernanza',
      description: 'Mehran Ziabary—directivo tecnológico, emprendedor e investigador de IA dedicado a arquitectura de sistemas, decisiones organizativas y gobernanza tecnológica.',
      eyebrow: 'Tecnología · Gobernanza · Construir',
      lead: 'Directivo tecnológico e investigador de inteligencia artificial centrado en arquitectura de sistemas, toma de decisiones organizativa y gobernanza tecnológica.',
      official: 'Nombre legal completo: Seyed Mohammad Mohammadzadeh Ziabary',
      commissionRole: 'Presidente de la Comisión de IA y Ciencia de Datos', commissionOrg: 'Organización del Gremio TIC de Teherán',
      targomanRole: 'Cofundador y director ejecutivo', targomanOrg: 'Targoman Intelligent Processing',
      writingButton: 'Leer artículos', resumeButton: 'Currículum',
      experience: 'Más de 28 años de experiencia', experienceLine: 'De la electrónica y la robótica a la seguridad de redes, la IA y la gobernanza tecnológica',
      thoughtNo: '01 / Pensamiento',
      statement: 'Toda tecnología nace de una filosofía: de una forma de mirar el problema, al ser humano, la capacidad de elegir y la responsabilidad. Emplear tecnología sin comprender estas capas profundas, por compleja o costosa que sea, termina siendo poco más que jugar con herramientas nuevas.',
      thoughtLink: 'Cómo entiendo la tecnología →',
      latest: 'Últimos artículos', analysis: 'Ensayos y experiencias', allWriting: 'Ver todos los artículos →',
      hoomasRole: 'Vicepresidente de Tecnología', hoomasOrg: 'Facilitadores de Exportación de IA (Hoomas)',
      mediaEyebrow: 'Medios', mediaTitle: 'Imágenes seleccionadas', mediaAll: 'Ver la galería →',
      mediaNote: 'Todavía no se han publicado entrevistas ni colaboraciones en medios en español.',
      mediaEmpty: 'Todavía no hay imágenes disponibles en español.'
    }
  } as const;

  $: copy = copies[locale];
  $: localizedArticles = articles.filter((article) => article.lang === locale);
  $: featured = localizedArticles.slice(0, 3);
  $: photos = localizeGallery(galleryItems, locale).slice(0, 3);
  $: base = `/${locale}`;
</script>

<svelte:head><title>{copy.title}</title><meta name="description" content={copy.description} /></svelte:head>

<main class="localized-home" dir="ltr">
  <section class="hero wrap">
    <div class="hero-copy">
      <p class="eyebrow">{copy.eyebrow}</p>
      <h1>Mehran Ziabary</h1>
      <small class="official-name">{copy.official}</small>
      <p class="hero-lead">{copy.lead}</p>
      <div class="hero-roles">
        <div class="hero-role-card commission-role"><img src="/images/organizations/nezamsenfi-ai.png" alt="" /><div><b>{copy.commissionRole}</b><span>{copy.commissionOrg}</span></div></div>
        <div class="hero-role-card targoman-role"><img src="/images/organizations/targoman-logo.png" alt="" /><div><b>{copy.targomanRole}</b><span>{copy.targomanOrg}</span></div></div>
        <div class="hero-role-card hoomas-role"><img src="/images/organizations/hoomas-logo.png" alt="" /><div><b>{copy.hoomasRole}</b><span>{copy.hoomasOrg}</span></div></div>
      </div>
      <div class="actions"><a class="button primary" href="{base}/articles/">{copy.writingButton}</a><a class="button ghost" href="{base}/resume/">{copy.resumeButton}</a></div>
    </div>
    <figure class="portrait-card"><img src="/images/profile/mehran-ziabary-formal.png" alt="Mehran Ziabary" /><figcaption><b>{copy.experience}</b><span>{copy.experienceLine}</span></figcaption></figure>
  </section>

  <section class="statement-section"><div class="wrap statement-grid"><p class="section-no">{copy.thoughtNo}</p><div><blockquote>{copy.statement}</blockquote><a class="text-link" href="{base}/thought/">{copy.thoughtLink}</a></div></div></section>

  <section class="wrap section">
    <div class="section-head"><div><p class="eyebrow">{copy.latest}</p><h2>{copy.analysis}</h2></div><a class="text-link" href="{base}/articles/">{copy.allWriting}</a></div>
    <div class="article-grid" class:two-items={featured.length === 2}>{#each featured as article,index}<ArticleCard {article} {locale} featured={index === 0} />{/each}</div>
  </section>

  <HomeTopics {locale} />
  <HomePresentation {locale} />

  <section class="media-strip">
    <div class="wrap">
      <div class="section-head"><div><p class="eyebrow">{copy.mediaEyebrow}</p><h2>{copy.mediaTitle}</h2></div><a class="text-link" href={`${base}/media/#photos`}>{copy.mediaAll}</a></div>
      <p class="home-media-note">{copy.mediaNote}</p>
      {#if photos.length}
        <div class="home-gallery"><GalleryCollection items={photos} {locale} compact /></div>
      {:else}
        <p class="home-media-note">{copy.mediaEmpty}</p>
      {/if}
    </div>
  </section>
</main>

<style>
  .localized-home{text-align:left}.localized-home .official-name{display:block;color:var(--teal);font-size:10px;margin:-12px 0 18px}
  .localized-home .hero-lead{max-width:720px}.localized-home .hero-role-card{text-align:left}
  .localized-home .portrait-card figcaption{inset-inline:24px}
  .localized-home .statement-grid blockquote{line-height:1.55}
  .localized-home .article-grid.two-items{grid-template-columns:1.25fr 1fr}
  @media(max-width:680px){.localized-home .statement-grid blockquote{line-height:1.6}.localized-home .article-grid.two-items{grid-template-columns:1fr}}
  .localized-home .article-grid.two-items :global(.article-card:first-child) { grid-column: auto; }
  .home-media-note { color: var(--muted); font-size: 13px; }
  .home-gallery :global(.gallery-collection) { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .home-gallery :global(.gallery-cover > img) { aspect-ratio: 16 / 9; }
  @media (max-width: 980px) { .home-gallery :global(figcaption > div) { flex-direction: column; gap: 6px; } }
  @media (max-width: 680px) { .home-gallery :global(.gallery-collection) { grid-template-columns: 1fr; } }
</style>
