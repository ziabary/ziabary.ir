<script lang="ts">
  import PageHero from '$lib/components/PageHero.svelte';
  import ArticleCard from '$lib/components/ArticleCard.svelte';
  import { articles } from '$lib/content';
  export let locale: 'en' | 'es';

  const excluded = new Set(['building-targoman-without-patronage', 'sms-otp-security-design', 'construir-targoman-sin-padrinos', 'cuando-un-otp-por-sms-reduce-la-seguridad']);
  $: guides = articles.filter((article) => article.lang === locale && !excluded.has(article.slug));
  const copies = {
    en: {
      eyebrow: 'From field work to implementation', title: 'Technical notes',
      lead: 'Practical notes for readers who want to see the architecture, constraints and historical context behind a technical instruction.',
      principle: 'A useful guide should improve a decision.',
      intro: 'This archive restores the durable parts of my former English technical blog. Historical commands are clearly marked as historical instead of being presented as current instructions.',
      empty: 'No additional technical notes have been prepared in English yet.'
    },
    es: {
      eyebrow: 'De la experiencia a la implementación', title: 'Notas técnicas',
      lead: 'Notas prácticas para quienes quieren ver la arquitectura, las limitaciones y el contexto que hay detrás de una instrucción técnica.',
      principle: 'Una buena guía debe ayudar a tomar una decisión.',
      intro: 'Solo publicaré aquí notas técnicas completas y revisadas en español. No enviaré al lector a una página persa para rellenar un archivo todavía vacío.',
      empty: 'Todavía no hay notas técnicas completas en español.'
    }
  } as const;
  $: copy = copies[locale];
</script>

<svelte:head><title>{copy.title} | Mehran Ziabary</title></svelte:head>
<main class="localized-page" dir="ltr">
  <PageHero eyebrow={copy.eyebrow} title={copy.title} lead={copy.lead} />
  <section class="wrap guide-intro"><b>{copy.principle}</b><p>{copy.intro}</p></section>
  {#if guides.length}
    <section class="wrap archive-list">{#each guides as article}<ArticleCard {article} {locale} />{/each}</section>
  {:else}
    <section class="wrap localized-empty"><span>00</span><p>{copy.empty}</p></section>
  {/if}
</main>

<style>
  .localized-page :global(.page-hero),.localized-page :global(.guide-intro){text-align:left}
  .localized-empty{min-height:260px;border-block:1px solid var(--line);display:grid;grid-template-columns:100px 1fr;align-items:center;margin-block:35px 90px}
  .localized-empty span{font-size:50px;color:var(--line)}.localized-empty p{font-size:19px;color:var(--muted)}
</style>
