<script lang="ts">
  import { onMount } from 'svelte';
  import { imageAttributes } from '$lib/images';
  import { featuredArticles } from '$lib/featured-articles';
  import { formatDate } from '$lib/publication.mjs';
  import type { ArticleMeta } from '$lib/content';
  import type { Locale } from '$lib/editions';

  export let locale: Locale;
  export let records: ArticleMeta[];

  let activeIndex = 0;
  let paused = false;
  let hovered = false;
  let focused = false;
  let reduceMotion = false;

  $: pinned = featuredArticles(records);
  $: if (pinned.length && activeIndex >= pinned.length) activeIndex = 0;
  $: labels = {
    fa: { heading: 'پروندهٔ ویژه', read: 'خواندن یادداشت ←', previous: 'پروندهٔ قبلی', next: 'پروندهٔ بعدی', pause: 'توقف نمایش خودکار', play: 'ادامهٔ نمایش خودکار', show: 'نمایش پروندهٔ' },
    en: { heading: 'Featured stories', read: 'Read article →', previous: 'Previous story', next: 'Next story', pause: 'Pause automatic rotation', play: 'Resume automatic rotation', show: 'Show story' },
    es: { heading: 'Artículos destacados', read: 'Leer artículo →', previous: 'Artículo anterior', next: 'Artículo siguiente', pause: 'Pausar avance automático', play: 'Reanudar avance automático', show: 'Mostrar artículo' }
  }[locale];

  onMount(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncMotion = () => { reduceMotion = motion.matches; };
    syncMotion();
    motion.addEventListener('change', syncMotion);
    const timer = window.setInterval(() => {
      if (pinned.length > 1 && !paused && !hovered && !focused && !reduceMotion && !document.hidden) {
        activeIndex = (activeIndex + 1) % pinned.length;
      }
    }, 5000);
    return () => {
      window.clearInterval(timer);
      motion.removeEventListener('change', syncMotion);
    };
  });

  function select(index: number) {
    activeIndex = (index + pinned.length) % pinned.length;
    paused = true;
  }

  function number(value: number) {
    return new Intl.NumberFormat(locale === 'fa' ? 'fa-IR' : locale).format(value);
  }
</script>

{#if pinned.length}
  <section class="featured-articles wrap" aria-labelledby="featured-articles-heading" aria-roledescription="carousel" onmouseenter={() => hovered = true} onmouseleave={() => hovered = false} onfocusin={() => focused = true} onfocusout={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) focused = false; }}>
    <div class="featured-heading"><span aria-hidden="true"></span><h2 id="featured-articles-heading">{labels.heading}</h2></div>
    <div class="featured-stage">
      {#each pinned as article, index (article.slug)}
        <article class="featured-card" class:active={index === activeIndex} aria-hidden={index !== activeIndex} aria-roledescription="slide" aria-label={`${number(index + 1)} / ${number(pinned.length)}`}>
          <a href={`${locale === 'fa' ? '' : `/${locale}`}/articles/${article.slug}/`} aria-label={article.title} tabindex={index === activeIndex ? 0 : -1}>
            <img class="featured-image" {...imageAttributes(article.featuredImage, '(min-width: 1200px) 1180px, 100vw')} alt="" loading={index === 0 ? 'eager' : 'lazy'} fetchpriority={index === 0 ? 'high' : 'auto'} />
            <div class="featured-copy">
              <p class="featured-meta"><span>{article.category}</span><span aria-hidden="true">·</span><time datetime={article.date}>{locale === 'fa' ? article.faDate : formatDate(article.date, locale)}</time></p>
              <h3>{article.title}</h3>
              <p class="featured-subtitle">{article.featuredSubtitle}</p>
              <span class="featured-read">{labels.read}</span>
            </div>
          </a>
        </article>
      {/each}
    </div>
    {#if pinned.length > 1}
      <div class="featured-controls" aria-label={labels.heading}>
        <button type="button" class="featured-arrow" aria-label={labels.previous} onclick={() => select(activeIndex - 1)}>‹</button>
        <div class="featured-dots">
          {#each pinned as article, index (article.slug)}
            <button type="button" class:active={index === activeIndex} aria-label={`${labels.show} ${number(index + 1)}`} aria-current={index === activeIndex ? 'true' : undefined} onclick={() => select(index)}></button>
          {/each}
        </div>
        <span class="featured-count" aria-hidden="true">{number(activeIndex + 1)} / {number(pinned.length)}</span>
        {#if !reduceMotion}<button type="button" class="featured-pause" aria-label={paused ? labels.play : labels.pause} onclick={() => paused = !paused}>{paused ? '▶' : 'Ⅱ'}</button>{/if}
        <button type="button" class="featured-arrow" aria-label={labels.next} onclick={() => select(activeIndex + 1)}>›</button>
      </div>
    {/if}
  </section>
{/if}

<style>
  .featured-articles { margin-bottom: 48px; }
  .featured-heading { display: flex; align-items: center; gap: 12px; margin-bottom: 18px; }
  .featured-heading span { width: 27px; height: 3px; border-radius: 4px; background: var(--teal); }
  .featured-heading h2 { margin: 0; color: var(--ink); font-size: clamp(22px, 2.7vw, 30px); line-height: 1.4; }
  .featured-stage { position: relative; height: clamp(410px, 43vw, 485px); overflow: hidden; border: 1px solid var(--line); border-radius: 17px; background: var(--paper); box-shadow: var(--shadow); }
  .featured-card { position: absolute; inset: 0; min-width: 0; overflow: hidden; opacity: 0; visibility: hidden; pointer-events: none; transition: opacity .4s ease, visibility 0s linear .4s; }
  .featured-card.active { z-index: 1; opacity: 1; visibility: visible; pointer-events: auto; transition: opacity .4s ease; }
  .featured-card a { position: relative; display: block; width: 100%; height: 100%; overflow: hidden; }
  .featured-card a::after { content: ''; position: absolute; inset: 0; background: linear-gradient(to right, transparent 25%, color-mix(in srgb, var(--paper) 78%, transparent) 55%, var(--paper) 78%); pointer-events: none; }
  .featured-card a:focus-visible { outline: 3px solid var(--teal); outline-offset: -4px; }
  .featured-image { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center 42%; transition: transform .35s ease; }
  .featured-card a:hover .featured-image { transform: scale(1.025); }
  .featured-copy { position: absolute; z-index: 1; inset-block: 0; right: 0; display: flex; flex-direction: column; justify-content: center; width: 49%; padding: 30px 40px; color: var(--ink); }
  .featured-meta { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; margin: 0 0 14px; color: var(--teal-deep); font-size: 12px; font-weight: 700; }
  .featured-copy h3 { margin: 0; font-size: clamp(28px, 3vw, 38px); line-height: 1.5; text-wrap: balance; }
  .featured-subtitle { max-width: 36ch; margin: 12px 0 0; color: var(--muted); font-size: 14px; line-height: 1.9; }
  .featured-read { width: fit-content; margin-top: 22px; border-bottom: 1px solid var(--teal); color: var(--teal-deep); font-size: 13px; font-weight: 700; }
  .featured-controls { display: flex; align-items: center; justify-content: center; gap: 11px; margin-top: 13px; color: var(--muted); }
  .featured-controls button { display: grid; place-items: center; flex: none; border: 1px solid var(--line); background: var(--paper); color: var(--ink); cursor: pointer; }
  .featured-controls button:hover, .featured-controls button:focus-visible { border-color: var(--teal); color: var(--teal-deep); }
  .featured-controls button:focus-visible { outline: 2px solid var(--teal); outline-offset: 2px; }
  .featured-arrow, .featured-pause { width: 30px; height: 30px; border-radius: 50%; font-size: 22px; line-height: 1; }
  .featured-pause { font-size: 12px; }
  .featured-dots { display: flex; align-items: center; gap: 7px; }
  .featured-dots button { width: 11px; height: 11px; padding: 0; border-radius: 50%; background: var(--line); }
  .featured-dots button.active { border-color: var(--teal); background: var(--teal); }
  .featured-count { min-width: 46px; text-align: center; font-size: 12px; }
  :global([dir='ltr']) .featured-card a::after { background: linear-gradient(to left, transparent 25%, color-mix(in srgb, var(--paper) 78%, transparent) 55%, var(--paper) 78%); }
  :global([dir='ltr']) .featured-copy { right: auto; left: 0; }
  @media (max-width: 680px) {
    .featured-articles { margin-bottom: 34px; }
    .featured-stage { height: 535px; }
    .featured-image { height: 70%; object-position: 18% center; }
    .featured-card a::after, :global([dir='ltr']) .featured-card a::after { background: linear-gradient(to bottom, transparent 30%, color-mix(in srgb, var(--paper) 68%, transparent) 55%, var(--paper) 70%); }
    .featured-copy, :global([dir='ltr']) .featured-copy { inset: auto 0 0; width: 100%; padding: 22px 24px 25px; }
    .featured-copy h3 { font-size: clamp(24px, 6.7vw, 31px); }
    .featured-subtitle { font-size: 13px; line-height: 1.85; }
    .featured-read { margin-top: 18px; }
  }
  @media (prefers-reduced-motion: reduce) { .featured-image, .featured-card { transition: none; } }
</style>
