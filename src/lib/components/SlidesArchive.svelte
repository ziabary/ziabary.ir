<script lang="ts">
  import PageHero from '$lib/components/PageHero.svelte';
  import { localizePresentation, presentations, type PresentationLocale } from '$lib/presentations';
  import { presentationCopy } from '$lib/presentation-copy';

  export let locale: PresentationLocale = 'fa';
  $: copy = presentationCopy[locale];
  $: items = presentations.map((item) => localizePresentation(item, locale));
  $: numbers = new Intl.NumberFormat(locale === 'fa' ? 'fa-IR' : locale);
  $: base = locale === 'fa' ? '' : `/${locale}`;
</script>

<svelte:head><title>{copy.seoTitle} | {copy.name}</title></svelte:head>

<main dir={locale === 'fa' ? 'rtl' : 'ltr'}>
  <PageHero eyebrow={copy.eyebrow} title={copy.title} lead={copy.lead} />
  {#if copy.languageNote}
    <section class="wrap slide-language-note" aria-labelledby="slide-language-title">
      <h2 id="slide-language-title">{copy.languageTitle}</h2>
      <p>{copy.languageNote}</p>
    </section>
  {/if}
  <section class="wrap deck-list">
    {#each items as item (item.slug)}
      <a class="deck-card" href={`${base}/slides/${item.slug}/`}>
        <div class="deck-cover" class:empty={!item.cover}>
          {#if item.cover}
            <img src={item.cover} alt={`${copy.cover} «${item.title}»`} loading="lazy" width="1600" height="900" />
          {:else}
            <span>{numbers.format(item.slideCount)}</span><small>{copy.slides}</small>
          {/if}
        </div>
        <div class="deck-copy">
          <div class="deck-kicker">{item.kind} · {item.presentedAt}</div>
          <h2>{item.title}</h2>
          <p>{item.summary}</p>
          <dl>
            <div><dt>{copy.venue}</dt><dd>{item.venue}</dd></div>
            {#if item.event}<div><dt>{copy.event}</dt><dd>{item.event}</dd></div>{/if}
            <div><dt>{copy.count}</dt><dd>{numbers.format(item.slideCount)} {copy.slides}</dd></div>
          </dl>
          {#if copy.languageBadge}<span class="language-badge">{copy.languageBadge}</span>{/if}
          <b class="deck-link">{copy.details} <span aria-hidden="true">{copy.arrow}</span></b>
        </div>
      </a>
    {/each}
  </section>
</main>

<style>
  .slide-language-note { padding: 24px; border: 1px solid var(--line); border-radius: 14px; background: var(--paper); }
  .slide-language-note h2 { margin: 0 0 10px; font-size: 18px; color: var(--teal); }
  .slide-language-note p { margin: 0; max-width: 960px; font-size: 14px; line-height: 1.9; color: var(--muted); }
  .deck-list { padding-top: 35px; padding-bottom: 90px; display: grid; gap: 28px; }
  .deck-card { display: grid; grid-template-columns: minmax(280px, 42%) minmax(0, 1fr); gap: 34px; align-items: center; padding: 28px; border: 1px solid var(--line); border-radius: 20px; background: var(--paper); color: inherit; text-decoration: none; }
  .deck-card:hover { border-color: var(--teal); }
  .deck-card:focus-visible { outline: 2px solid var(--teal); outline-offset: 4px; }
  .deck-cover { aspect-ratio: 16/9; border-radius: 16px; overflow: hidden; background: var(--bg); border: 1px solid var(--line); }
  .deck-cover img { width: 100%; height: 100%; object-fit: contain; display: block; }
  .deck-cover.empty { display: flex; flex-direction: column; align-items: center; justify-content: center; }
  .deck-cover span { font-size: 64px; font-weight: 800; }
  .deck-cover small, .deck-kicker, .deck-copy dt { color: var(--teal); }
  .deck-kicker { font-size: 12px; }
  .deck-copy h2 { font-size: clamp(24px, 2.5vw, 36px); line-height: 1.5; margin: 14px 0; }
  .deck-copy p { color: var(--muted); line-height: 1.9; margin: 0 0 22px; }
  .deck-copy dl { display: flex; flex-wrap: wrap; gap: 18px 28px; margin: 0 0 24px; }
  .deck-copy dt { font-size: 11px; }
  .deck-copy dd { margin: 5px 0 0; font-size: 13px; }
  .language-badge { display: inline-block; color: var(--muted); border: 1px solid var(--line); border-radius: 20px; font-size: 11px; padding: 4px 10px; margin-bottom: 14px; }
  .deck-link { display: block; font-size: 13px; color: var(--teal); }
  @media (max-width: 760px) { .deck-card { grid-template-columns: 1fr; padding: 20px; gap: 22px; } }
</style>
