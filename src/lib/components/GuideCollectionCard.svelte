<script lang="ts">
  import { imageAttributes } from '$lib/images';
  import type { GuideCollection } from '$lib/guides';
  import { articleCount, nonArticleCount } from '$lib/guides';

  export let collection: GuideCollection;
  export let locale: 'fa' | 'en' | 'es' = 'fa';
  export let href: string | null | undefined = undefined;
  export let preview = false;

  const persianNumber = new Intl.NumberFormat('fa-IR');
  $: target = href === undefined ? `/guides/${collection.slug}/` : href;
  $: unpublished = locale === 'es' ? 'Contenido aún no publicado en español' : 'Content not yet published in English';
  $: count = articleCount(collection);
  $: extraCount = nonArticleCount(collection);
  $: planned = collection.status === 'planned';
</script>

<svelte:element this={target ? 'a' : 'article'} class="guide-collection-card" class:linked={Boolean(target)}
  href={target ?? undefined} aria-label={collection.title} dir={locale === 'fa' ? 'rtl' : 'ltr'}>
  <img {...imageAttributes(collection.image, '(min-width: 1200px) 740px, calc(100vw - 32px)')} alt="" loading="lazy" width="1600" height="900" />
  <span class="guide-card-shade" aria-hidden="true"></span>
  <div class="guide-card-copy">
    <small>{collection.eyebrow}</small>
    <h2>{collection.title}</h2>
    <p>{collection.subtitle}</p>
    <div class="guide-card-meta">
      {#if target}
      {#if planned}
        <span class="planned-badge">{locale === 'fa' ? 'در برنامهٔ نگارش' : locale === 'en' ? 'Planned' : 'En planificación'}</span>
        <span>{locale === 'fa' ? 'دربارهٔ این مجموعه' : locale === 'en' ? 'About this collection' : 'Acerca de esta colección'}</span>
      {:else if preview}
        <span>{locale === 'es' ? 'Ver borrador en español' : 'Preview English draft'}</span>
      {:else}
      <span>
        {#if locale === 'fa'}
        {persianNumber.format(count)} مقاله
        {#if extraCount} · {persianNumber.format(extraCount)} محتوای تعاملی{/if}
        {:else}
        {count} {locale === 'en' ? (count === 1 ? 'article' : 'articles') : (count === 1 ? 'artículo' : 'artículos')}
        {#if extraCount} · {extraCount} {locale === 'en' ? 'interactive resources' : 'recursos interactivos'}{/if}
        {/if}
      </span>
      {/if}
      <i aria-hidden="true">{locale === 'fa' ? '←' : '→'}</i>
      {:else}
        <span>{unpublished}</span>
      {/if}
    </div>
  </div>
</svelte:element>

<style>
  .planned-badge { display: inline-block; padding: 4px 10px; border: 1px solid #8bb8b3; border-radius: 5px; background: rgba(12, 61, 65, .85); color: #e7f5f3; font-size: 12px; }
  .guide-collection-card {
    position: relative;
    isolation: isolate;
    display: block;
    min-width: 0;
    width: 100%;
    aspect-ratio: 16 / 10;
    min-height: 330px;
    overflow: hidden;
    border-radius: 16px;
    background: var(--navy);
    color: #fff;
  }

  .guide-collection-card img,
  .guide-card-shade {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }

  .guide-collection-card img {
    z-index: -2;
    object-fit: cover;
    transition: transform 0.55s ease, filter 0.55s ease;
  }

  .guide-card-shade {
    z-index: -1;
    background:
      linear-gradient(180deg, rgba(2, 17, 22, 0.08) 10%, rgba(2, 17, 22, 0.88) 92%),
      linear-gradient(90deg, rgba(2, 17, 22, 0.58), transparent 72%);
  }

  .guide-card-copy {
    height: 100%;
    width: min(82%, 690px);
    margin-right: auto;
    box-sizing: border-box;
    padding: clamp(25px, 3.4vw, 42px);
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-end;
    text-align: start;
  }

  small {
    align-self: flex-end;
    margin-bottom: auto;
    border: 1px solid rgba(255, 255, 255, 0.24);
    border-radius: 999px;
    background: rgba(4, 28, 34, 0.46);
    backdrop-filter: blur(7px);
    padding: 6px 10px;
    color: #a9e0db;
    font-size: 9px;
  }

  h2 {
    max-width: 590px;
    margin: 0 0 8px;
    color: #fff;
    font-size: clamp(25px, 3vw, 37px);
    line-height: 1.55;
    text-wrap: balance;
  }

  p {
    max-width: 600px;
    margin: 0;
    color: rgba(235, 247, 245, 0.78);
    font-size: 12px;
    line-height: 1.85;
  }

  .guide-card-meta {
    width: 100%;
    margin-top: 26px;
    padding-top: 15px;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #b9d6d2;
    font-size: 10px;
  }

  .guide-card-meta i {
    font-style: normal;
    color: #7bd2cb;
    font-size: 23px;
    transition: transform 0.2s;
  }

  .guide-collection-card.linked:hover img {
    transform: scale(1.035);
    filter: saturate(1.08) brightness(1.05);
  }

  .guide-collection-card.linked:hover .guide-card-meta i {
    transform: translateX(-6px);
  }

  .guide-collection-card:focus-visible {
    outline: 3px solid var(--teal);
    outline-offset: 4px;
  }

  .guide-collection-card[dir='ltr'] { display: flex; flex-direction: column; }
  .guide-collection-card[dir='ltr'] .guide-card-copy { width: min(100%, 690px); height: auto; flex: 1; }
  .guide-collection-card[dir='ltr'] small { align-self: flex-start; }
  .guide-collection-card[dir='ltr'].linked:hover .guide-card-meta i { transform: translateX(6px); }

  @media (max-width: 680px) {
    .guide-collection-card {
      min-height: 390px;
      aspect-ratio: auto;
    }

    .guide-card-copy { width: 100%; }
    h2 { font-size: 26px; }
  }
</style>
