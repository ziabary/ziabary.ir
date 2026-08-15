<script lang="ts">
  import { onMount } from 'svelte';
  import type { GalleryItem } from '$lib/data';

  export let items: GalleryItem[];
  export let compact = false;

  let activeItem: GalleryItem | null = null;
  let activeIndex = 0;
  let zoom = 1;

  $: activeImage = activeItem?.images[activeIndex];

  function open(item: GalleryItem, index = 0) {
    activeItem = item;
    activeIndex = index;
    zoom = 1;
    document.body.style.overflow = 'hidden';
  }

  function close() {
    activeItem = null;
    zoom = 1;
    document.body.style.overflow = '';
  }

  function move(direction: number) {
    if (!activeItem) return;
    activeIndex = (activeIndex + direction + activeItem.images.length) % activeItem.images.length;
    zoom = 1;
  }

  function changeZoom(delta: number) {
    zoom = Math.min(3, Math.max(1, Number((zoom + delta).toFixed(1))));
  }

  onMount(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (!activeItem) return;
      if (event.key === 'Escape') close();
      if (event.key === 'ArrowLeft') move(1);
      if (event.key === 'ArrowRight') move(-1);
      if (event.key === '+' || event.key === '=') changeZoom(0.25);
      if (event.key === '-') changeZoom(-0.25);
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  });
</script>

<div class:compact class="gallery-collection">
  {#each items as item}
    <figure>
      <button class="gallery-cover" type="button" on:click={() => open(item)} aria-label={`بزرگ‌نمایی ${item.title}`}>
        <img src={item.images[0].src} alt={item.images[0].alt} loading="lazy" />
        <span class="zoom-hint"><i class="fa-solid fa-magnifying-glass-plus" aria-hidden="true"></i> بزرگ‌نمایی</span>
        {#if item.images.length > 1}
          <span class="image-count"><i class="fa-regular fa-images" aria-hidden="true"></i> {item.images.length.toLocaleString('fa-IR')} تصویر</span>
        {/if}
      </button>
      <figcaption>
        <div><b>{item.title}</b><time class="fa-num" datetime={item.date}>{item.faDate}</time></div>
        <p>{item.caption} <span class="caption-date fa-num">— {item.faDate}</span></p>
      </figcaption>
    </figure>
  {/each}
</div>

{#if activeItem && activeImage}
  <div class="lightbox" role="dialog" aria-modal="true" aria-label={activeItem.title}>
    <button class="lightbox-backdrop" type="button" on:click={close} aria-label="بستن نمایش تصویر"></button>
    <div class="lightbox-panel">
      <header>
        <div><b>{activeItem.title}</b><span class="fa-num">{activeItem.faDate}</span></div>
        <div class="lightbox-tools">
          <button type="button" on:click={() => changeZoom(-0.25)} disabled={zoom <= 1} aria-label="کوچک‌نمایی"><i class="fa-solid fa-minus"></i></button>
          <span class="fa-num">{Math.round(zoom * 100).toLocaleString('fa-IR')}٪</span>
          <button type="button" on:click={() => changeZoom(0.25)} disabled={zoom >= 3} aria-label="بزرگ‌نمایی"><i class="fa-solid fa-plus"></i></button>
          <button type="button" on:click={close} aria-label="بستن"><i class="fa-solid fa-xmark"></i></button>
        </div>
      </header>
      <div class="lightbox-stage">
        {#if activeItem.images.length > 1}
          <button class="nav previous" type="button" on:click={() => move(-1)} aria-label="تصویر قبلی"><i class="fa-solid fa-chevron-right"></i></button>
        {/if}
        <div class="image-viewport">
          <img src={activeImage.src} alt={activeImage.alt} style={`transform: scale(${zoom})`} />
        </div>
        {#if activeItem.images.length > 1}
          <button class="nav next" type="button" on:click={() => move(1)} aria-label="تصویر بعدی"><i class="fa-solid fa-chevron-left"></i></button>
        {/if}
      </div>
      <footer>
        <p>{activeImage.caption ?? activeItem.caption} <span class="fa-num">— {activeItem.faDate}</span></p>
        {#if activeItem.images.length > 1}
          <div class="lightbox-thumbs">
            {#each activeItem.images as image, index}
              <button class:active={index === activeIndex} type="button" on:click={() => { activeIndex = index; zoom = 1; }} aria-label={`تصویر ${index + 1}`}>
                <img src={image.src} alt="" />
              </button>
            {/each}
          </div>
        {/if}
      </footer>
    </div>
  </div>
{/if}

<style>
  .gallery-collection{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px;padding:60px 0}
  figure{margin:0;background:var(--paper);border:1px solid var(--line);border-radius:12px;overflow:hidden}
  .gallery-cover{position:relative;width:100%;padding:0;border:0;background:var(--soft);cursor:zoom-in;overflow:hidden;display:block}
  .gallery-cover>img{width:100%;height:390px;object-fit:cover;display:block;transition:transform .35s,filter .35s}
  .gallery-cover:hover>img{transform:scale(1.025);filter:brightness(.82)}
  .zoom-hint,.image-count{position:absolute;padding:7px 10px;border-radius:999px;background:rgba(7,28,33,.8);color:#fff;font-size:9px;backdrop-filter:blur(8px)}
  .zoom-hint{inset-inline-start:14px;bottom:14px;opacity:0;transform:translateY(5px);transition:opacity .2s,transform .2s}
  .gallery-cover:hover .zoom-hint,.gallery-cover:focus-visible .zoom-hint{opacity:1;transform:none}
  .image-count{inset-inline-end:14px;top:14px}
  figcaption{padding:16px 18px 18px;display:grid;gap:8px}
  figcaption>div{display:flex;justify-content:space-between;gap:18px;align-items:start}
  figcaption b{font-size:13px}
  figcaption time{white-space:nowrap;color:var(--teal);font-size:9px}
  figcaption p{margin:0;color:var(--muted);font-size:10px;line-height:1.95}
  .caption-date{white-space:nowrap;color:var(--teal)}
  .compact{padding:30px 0 0}
  .compact .gallery-cover>img{height:auto;aspect-ratio:4/3}
  .lightbox{position:fixed;inset:0;z-index:1000;display:grid;place-items:center;padding:24px}
  .lightbox-backdrop{position:absolute;inset:0;width:100%;height:100%;border:0;background:rgba(2,12,15,.9);backdrop-filter:blur(12px);cursor:zoom-out}
  .lightbox-panel{position:relative;width:min(1180px,100%);height:min(90vh,900px);display:grid;grid-template-rows:auto minmax(0,1fr) auto;background:#071c21;color:#fff;border:1px solid rgba(255,255,255,.15);border-radius:15px;overflow:hidden;box-shadow:0 30px 80px rgba(0,0,0,.45)}
  .lightbox-panel header{display:flex;justify-content:space-between;gap:20px;align-items:center;padding:13px 17px;border-bottom:1px solid rgba(255,255,255,.12)}
  .lightbox-panel header>div:first-child{display:grid;gap:2px}.lightbox-panel header span{font-size:9px;color:#9fc4c2}
  .lightbox-tools{display:flex;align-items:center;gap:6px}.lightbox-tools button,.nav{border:1px solid rgba(255,255,255,.16);background:rgba(255,255,255,.08);color:#fff;cursor:pointer}
  .lightbox-tools button{width:35px;height:35px;border-radius:8px}.lightbox-tools button:disabled{opacity:.35;cursor:not-allowed}.lightbox-tools>span{min-width:47px;text-align:center}
  .lightbox-stage{position:relative;min-height:0;display:grid;grid-template-columns:52px minmax(0,1fr) 52px;align-items:center;padding:12px}
  .image-viewport{height:100%;min-height:0;overflow:auto;display:grid;place-items:center}
  .image-viewport img{max-width:100%;max-height:100%;object-fit:contain;transition:transform .18s;transform-origin:center}
  .nav{width:42px;height:60px;border-radius:10px;z-index:2}.previous{justify-self:start}.next{justify-self:end}
  .lightbox-panel footer{padding:12px 18px 15px;border-top:1px solid rgba(255,255,255,.12);display:flex;gap:18px;justify-content:space-between;align-items:center}
  .lightbox-panel footer p{margin:0;font-size:10px;color:#c8d8d7;line-height:1.8}
  .lightbox-thumbs{display:flex;gap:7px;flex:0 0 auto}.lightbox-thumbs button{width:62px;height:45px;padding:0;border:2px solid transparent;border-radius:7px;overflow:hidden;opacity:.55;background:transparent;cursor:pointer}.lightbox-thumbs button.active{border-color:#4cc0ba;opacity:1}.lightbox-thumbs img{width:100%;height:100%;object-fit:cover}
  @media(max-width:680px){.gallery-collection{grid-template-columns:1fr;padding:35px 0}.gallery-cover>img{height:280px}.lightbox{padding:0}.lightbox-panel{width:100%;height:100%;border:0;border-radius:0}.lightbox-panel header{align-items:start}.lightbox-panel header>div:first-child span{display:block}.lightbox-stage{grid-template-columns:38px minmax(0,1fr) 38px;padding:6px}.nav{width:34px;height:50px}.lightbox-panel footer{display:grid}.lightbox-thumbs{overflow-x:auto;max-width:100%}.zoom-hint{display:none}}
</style>
