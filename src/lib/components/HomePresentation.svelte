<script lang="ts">
  import { localizePresentation, presentations } from '$lib/presentations';
  export let locale: 'fa' | 'en' | 'es' = 'fa';
  // Every language features the same newest upload and its translated introduction.
  const item = presentations.find((presentation) => presentation.pdf);
  const copies = {
    fa: { eyebrow: 'تازه‌ترین اسلایدها و ارائه‌ها', fallbackTitle: 'تازه‌ترین ارائه', fallbackSummary: '', slides: 'تعداد اسلاید', duration: 'مدت ارائه', version: 'نسخه', view: 'مشاهده و دریافت اسلایدها', all: 'همهٔ ارائه‌ها ←', language: '', cover: 'اسلاید نخست ارائهٔ' },
    en: { eyebrow: 'Latest slides & presentations', fallbackTitle: 'Latest presentation', fallbackSummary: 'The latest presentation in the archive is available in Persian.', slides: 'Slides', duration: 'Duration', version: 'Version', view: 'View presentation and PDF', all: 'Course archive →', language: 'The slides are mainly visual, with much of the content understandable regardless of language, but the decks as a whole are in Persian.', cover: 'First slide of' },
    es: { eyebrow: 'Últimas diapositivas y presentaciones', fallbackTitle: 'Última presentación', fallbackSummary: 'La presentación más reciente del archivo está disponible en persa.', slides: 'Diapositivas', duration: 'Duración', version: 'Versión', view: 'Ver la presentación y el PDF', all: 'Archivo de cursos →', language: 'Las diapositivas son principalmente visuales y gran parte del contenido se puede comprender independientemente del idioma, pero en conjunto están en persa.', cover: 'Primera diapositiva de' }
  };
  $: copy = copies[locale];
  $: translated = item ? localizePresentation(item, locale) : undefined;
  $: title = translated?.title ?? copy.fallbackTitle;
  $: summary = translated?.summary ?? copy.fallbackSummary;
  $: number = new Intl.NumberFormat(locale === 'fa' ? 'fa-IR' : locale);
  $: base = locale === 'fa' ? '' : `/${locale}`;
</script>

{#if item}
  <section class="wrap section teaching-preview latest-presentation" dir={locale === 'fa' ? 'rtl' : 'ltr'}>
    <a class="presentation-preview-cover" href={`${base}/slides/${item.slug}/`} aria-label={`${copy.view}: ${title}`} hreflang={locale}>
      {#if item.cover}
        <img src={item.cover} alt={`${copy.cover} «${title}»`} loading="lazy" width="1600" height="900" />
      {:else}
        <i class="fa-regular fa-file-pdf" aria-hidden="true"></i><span>{title}</span>
      {/if}
    </a>
    <div class="presentation-preview-copy">
      <p class="eyebrow">{copy.eyebrow}</p>
      <h2>{title}</h2>
      <p>{summary}</p>
      {#if locale === 'fa'}
        <div class="presentation-context">{item.kind} · {item.venue} · {item.presentedAt}</div>
      {:else if translated?.venue}
        <div class="presentation-context">{translated.venue}</div>
      {/if}
      <dl class="presentation-facts">
        <div><dt>{copy.slides}</dt><dd>{number.format(item.slideCount)}</dd></div>
        {#if translated?.duration}<div><dt>{copy.duration}</dt><dd>{translated.duration}</dd></div>{/if}
        {#if translated?.version}<div><dt>{copy.version}</dt><dd>{translated.version}</dd></div>{/if}
      </dl>
      {#if copy.language}<p class="presentation-language">{copy.language}</p>{/if}
      <div class="presentation-actions">
        <a class="button primary" href={`${base}/slides/${item.slug}/`} hreflang={locale}>{copy.view}</a>
        <a class="text-link" href={`${base}/slides/`}>{copy.all}</a>
      </div>
    </div>
  </section>
{/if}

<style>
  .presentation-language { font-size: 12px; }
</style>
