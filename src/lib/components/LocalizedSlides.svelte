<script lang="ts">
  import PageHero from '$lib/components/PageHero.svelte';
  export let locale: 'en' | 'es';
  const copies = {
    en: {
      eyebrow: 'Presentations, classes and workshops', title: 'Slides & courses',
      lead: 'An index of the courses and presentations I teach, with a clear indication of which materials are actually available in this language.',
      noteTitle: 'Why are there no download buttons yet?',
      note: 'The existing decks were written for Persian-speaking classes. A translated title is not a translated course, so English downloads will appear only after the slides themselves have been reviewed and localised.',
      status: 'English edition in preparation',
      items: [
        ['114', 'Enterprise AI Governance', 'DBA course · 16 hours · 2026', 'Turning an AI project into an organisational capability—from decision rights and problem framing to architecture, security, contracts and acceptance.'],
        ['04', 'Behind AI for Executives', 'One-day workshop', 'A compact view of data, models, infrastructure, operations and the constraints hidden by a simple demo.'],
        ['05', 'Designing a Secure Organisational Assistant', 'Specialist presentation', 'From RAG architecture to runtime access control and AI incident handling.']
      ]
    },
    es: {
      eyebrow: 'Presentaciones, clases y talleres', title: 'Diapositivas y cursos',
      lead: 'Un índice de los cursos y presentaciones que imparto, indicando con claridad qué materiales están disponibles realmente en este idioma.',
      noteTitle: '¿Por qué todavía no hay botones de descarga?',
      note: 'Las presentaciones actuales fueron preparadas para clases en persa. Traducir un título no equivale a traducir un curso; los archivos en español aparecerán cuando las propias diapositivas hayan sido revisadas y adaptadas.',
      status: 'Edición en español en preparación',
      items: [
        ['114', 'Gobernanza empresarial de la inteligencia artificial', 'Curso DBA · 16 horas · 2026', 'Convertir un proyecto de IA en una capacidad organizativa: derechos de decisión, formulación del problema, arquitectura, seguridad, contratos y aceptación.'],
        ['04', 'Qué hay detrás de la IA para directivos', 'Taller de un día', 'Una visión compacta de datos, modelos, infraestructura, operaciones y límites que una demostración sencilla no muestra.'],
        ['05', 'Diseño de un asistente organizativo seguro', 'Presentación especializada', 'Desde la arquitectura RAG hasta el control de acceso en ejecución y la gestión de incidentes de IA.']
      ]
    }
  } as const;
  $: copy = copies[locale];
</script>

<svelte:head><title>{copy.title} | Mehran Ziabary</title></svelte:head>
<main class="localized-slides" dir="ltr">
  <PageHero eyebrow={copy.eyebrow} title={copy.title} lead={copy.lead} />
  <section class="wrap localized-decks">
    {#each copy.items as item}
      <article><div class="deck-thumb"><span>{item[0]}</span><small>SLIDES</small></div><div><small>{item[2]}</small><h2>{item[1]}</h2><p>{item[3]}</p><b>{copy.status}</b></div></article>
    {/each}
  </section>
  <section class="wrap teaching-note"><b>{copy.noteTitle}</b><p>{copy.note}</p></section>
</main>

<style>
  .localized-slides :global(.page-hero){text-align:left}.localized-decks{padding:60px 0}
  .localized-decks article{display:grid;grid-template-columns:240px 1fr;gap:40px;padding:25px 0;border-top:1px solid var(--line);align-items:center}
  .localized-decks h2{font-size:27px;margin:4px 0}.localized-decks p{color:var(--muted);font-size:13px}.localized-decks b{font-size:11px;color:var(--teal)}
  @media(max-width:680px){.localized-decks article{grid-template-columns:1fr;gap:15px}}
</style>
