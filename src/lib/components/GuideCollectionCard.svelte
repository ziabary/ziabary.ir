<script lang="ts">
  import type { GuideCollection } from '$lib/guides';
  import { articleCount, nonArticleCount } from '$lib/guides';

  export let collection: GuideCollection;

  const persianNumber = new Intl.NumberFormat('fa-IR');
  $: count = articleCount(collection);
  $: extraCount = nonArticleCount(collection);
</script>

<a class="guide-collection-card" href={`/guides/${collection.slug}/`} aria-label={collection.title}>
  <img src={collection.image} alt="" loading="lazy" width="1600" height="900" />
  <span class="guide-card-shade" aria-hidden="true"></span>
  <div class="guide-card-copy">
    <small>{collection.eyebrow}</small>
    <h2>{collection.title}</h2>
    <p>{collection.subtitle}</p>
    <div class="guide-card-meta">
      <span>
        {persianNumber.format(count)} مقاله
        {#if extraCount} · {persianNumber.format(extraCount)} محتوای تعاملی{/if}
      </span>
      <i aria-hidden="true">←</i>
    </div>
  </div>
</a>

<style>
  .guide-collection-card {
    position: relative;
    isolation: isolate;
    display: block;
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
    text-align: right;
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

  .guide-collection-card:hover img {
    transform: scale(1.035);
    filter: saturate(1.08) brightness(1.05);
  }

  .guide-collection-card:hover .guide-card-meta i {
    transform: translateX(-6px);
  }

  .guide-collection-card:focus-visible {
    outline: 3px solid var(--teal);
    outline-offset: 4px;
  }

  @media (max-width: 680px) {
    .guide-collection-card {
      min-height: 390px;
      aspect-ratio: auto;
    }

    .guide-card-copy { width: 100%; }
    h2 { font-size: 26px; }
  }
</style>
