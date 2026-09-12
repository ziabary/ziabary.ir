<script lang="ts">
  import { imageAttributes } from '$lib/images';
  import { onMount } from 'svelte';
  import type { GalleryItem, GalleryLocale } from '$lib/gallery';

  export let items: GalleryItem[];
  export let compact = false;
  export let locale: GalleryLocale = 'fa';

  const copies = {
    fa: { zoom: 'بزرگ‌نمایی', zoomOut: 'کوچک‌نمایی', close: 'بستن', closeView: 'بستن نمایش تصویر', images: 'تصویر', previous: 'تصویر قبلی', next: 'تصویر بعدی', original: 'ابعاد اصلی:', pixels: 'پیکسل', image: 'تصویر' },
    en: { zoom: 'Zoom in', zoomOut: 'Zoom out', close: 'Close', closeView: 'Close image viewer', images: 'images', previous: 'Previous image', next: 'Next image', original: 'Original dimensions:', pixels: 'pixels', image: 'Image' },
    es: { zoom: 'Ampliar', zoomOut: 'Reducir', close: 'Cerrar', closeView: 'Cerrar visor de imágenes', images: 'imágenes', previous: 'Imagen anterior', next: 'Imagen siguiente', original: 'Dimensiones originales:', pixels: 'píxeles', image: 'Imagen' }
  };
  $: copy = copies[locale];
  $: numberFormat = new Intl.NumberFormat(locale === 'fa' ? 'fa-IR' : locale);
  $: percentFormat = new Intl.NumberFormat(locale === 'fa' ? 'fa-IR' : locale, { style: 'percent' });
  $: dateFormat = new Intl.DateTimeFormat(locale === 'es' ? 'es-ES' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
  const dateLabel = (item: GalleryItem) => locale === 'fa' ? item.faDate : dateFormat.format(new Date(`${item.date}T00:00:00Z`));

  function previewAttributes(src: string, thumbnail = false) {
    const attributes = imageAttributes(src);
    const ratio = attributes.width && attributes.height ? attributes.width / attributes.height : 4 / 3;
    if (thumbnail) return { ...attributes, sizes: `${Math.ceil(Math.max(58, 41 * ratio))}px` };

    // Cover cropping can scale a wide photo beyond the element's visible width.
    // Match the two-column gallery inside .wrap, and its single-column mobile layout.
    const scale = Math.max(1, ratio / (4 / 3));
    const desktop = compact ? `${Math.ceil(579 * scale)}px` : `max(579px, ${Math.ceil(390 * ratio)}px)`;
    const tablet = compact ? `calc((50vw - 35px) * ${scale})` : `max(calc(50vw - 35px), ${Math.ceil(390 * ratio)}px)`;
    const mobile = compact ? `calc((100vw - 30px) * ${scale})` : `max(calc(100vw - 30px), ${Math.ceil(280 * ratio)}px)`;
    return { ...attributes, sizes: `(min-width: 1228px) ${desktop}, (min-width: 681px) ${tablet}, ${mobile}` };
  }

  let activeItem: GalleryItem | null = null;
  let activeIndex = 0;
  let zoom = 1;
  let imageDimensions: { width: number; height: number } | null = null;

  $: activeImage = activeItem?.images[activeIndex];
  $: if (activeImage) imageDimensions = null;

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

  function readImageDimensions(event: Event) {
    const image = event.currentTarget as HTMLImageElement;
    imageDimensions = { width: image.naturalWidth, height: image.naturalHeight };
  }

  onMount(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (!activeItem) return;
      if (event.key === 'Escape') close();
      if (event.key === 'ArrowLeft') move(locale === 'fa' ? 1 : -1);
      if (event.key === 'ArrowRight') move(locale === 'fa' ? -1 : 1);
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

<div class:compact class="gallery-collection" dir={locale === 'fa' ? 'rtl' : 'ltr'}>
  {#each items as item}
    <figure>
      <button class="gallery-cover" type="button" on:click={() => open(item)} aria-label={`${copy.zoom}: ${item.title}`}>
        <img {...previewAttributes(item.images[0].src)} alt={item.images[0].alt} loading="lazy" />
        <span class="zoom-hint"><i class="fa-solid fa-magnifying-glass-plus" aria-hidden="true"></i> {copy.zoom}</span>
        {#if item.images.length > 1}
          <span class="image-count"><i class="fa-regular fa-images" aria-hidden="true"></i> {numberFormat.format(item.images.length)} {copy.images}</span>
        {/if}
      </button>
      <figcaption>
        <div><b>{item.title}</b><time class:fa-num={locale === 'fa'} datetime={item.date}>{dateLabel(item)}</time></div>
        <p>{item.caption} <span class="caption-date" class:fa-num={locale === 'fa'}>— {dateLabel(item)}</span></p>
      </figcaption>
    </figure>
  {/each}
</div>

{#if activeItem && activeImage}
  <div class="lightbox" dir={locale === 'fa' ? 'rtl' : 'ltr'} role="dialog" aria-modal="true" aria-label={activeItem.title}>
    <button class="lightbox-backdrop" type="button" on:click={close} aria-label={copy.closeView}></button>
    <div class="lightbox-panel">
      <header>
        <div><b>{activeItem.title}</b><span class:fa-num={locale === 'fa'}>{dateLabel(activeItem)}</span></div>
        <div class="lightbox-tools">
          <button type="button" on:click={() => changeZoom(-0.25)} disabled={zoom <= 1} aria-label={copy.zoomOut}><i class="fa-solid fa-minus"></i></button>
          <span class:fa-num={locale === 'fa'}>{percentFormat.format(zoom)}</span>
          <button type="button" on:click={() => changeZoom(0.25)} disabled={zoom >= 3} aria-label={copy.zoom}><i class="fa-solid fa-plus"></i></button>
          <button type="button" on:click={close} aria-label={copy.close}><i class="fa-solid fa-xmark"></i></button>
        </div>
      </header>
      <div class:single-image={activeItem.images.length === 1} class="lightbox-stage">
        {#if activeItem.images.length > 1}
          <button class="nav previous" type="button" on:click={() => move(-1)} aria-label={copy.previous}><i class={locale === 'fa' ? 'fa-solid fa-chevron-right' : 'fa-solid fa-chevron-left'}></i></button>
        {/if}
        <div class="image-viewport">
          <img src={activeImage.src} alt={activeImage.alt} style={`transform: scale(${zoom})`} on:load={readImageDimensions} />
        </div>
        {#if activeItem.images.length > 1}
          <button class="nav next" type="button" on:click={() => move(1)} aria-label={copy.next}><i class={locale === 'fa' ? 'fa-solid fa-chevron-left' : 'fa-solid fa-chevron-right'}></i></button>
        {/if}
      </div>
      <footer>
        <div class="image-details">
          <p>{activeImage.caption ?? activeItem.caption} <span class:fa-num={locale === 'fa'}>— {dateLabel(activeItem)}</span></p>
          {#if imageDimensions}
            <span class="image-dimensions" class:fa-num={locale === 'fa'}>
              {copy.original}
              <b dir="ltr">{numberFormat.format(imageDimensions.width)} × {numberFormat.format(imageDimensions.height)}</b>
              {copy.pixels}
            </span>
          {/if}
        </div>
        {#if activeItem.images.length > 1}
          <div class="lightbox-thumbs">
            {#each activeItem.images as image, index}
              <button class:active={index === activeIndex} type="button" on:click={() => { activeIndex = index; zoom = 1; }} aria-label={`${copy.image} ${numberFormat.format(index + 1)}`}>
                <img {...previewAttributes(image.src, true)} alt="" />
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
  .lightbox-stage.single-image{grid-template-columns:minmax(0,1fr)}
  .image-viewport{position:relative;width:100%;height:100%;min-width:0;min-height:0;overflow:auto}
  .image-viewport img{position:absolute;inset:0;width:100%;height:100%;object-fit:contain;transition:transform .18s;transform-origin:center}
  .nav{width:42px;height:60px;border-radius:10px;z-index:2}.previous{justify-self:start}.next{justify-self:end}
  .lightbox-panel footer{min-width:0;margin:0;background:transparent;padding:12px 18px 15px;border-top:1px solid rgba(255,255,255,.12);display:grid;gap:12px}
  .image-details{display:flex;gap:12px 24px;justify-content:space-between;align-items:baseline;min-width:0}
  .image-details p{margin:0;font-size:10px;color:#c8d8d7;line-height:1.8}
  .image-dimensions{flex:0 0 auto;color:#9fc4c2;font-size:9px;white-space:nowrap}.image-dimensions b{font-weight:500;color:#c8d8d7}
  .lightbox-thumbs{display:flex;gap:7px;max-width:100%;overflow-x:auto;padding-block-end:2px}.lightbox-thumbs button{flex:0 0 auto;width:62px;height:45px;padding:0;border:2px solid transparent;border-radius:7px;overflow:hidden;opacity:.55;background:transparent;cursor:pointer}.lightbox-thumbs button.active{border-color:#4cc0ba;opacity:1}.lightbox-thumbs img{width:100%;height:100%;object-fit:cover}
  @media(max-width:680px){.gallery-collection{grid-template-columns:1fr;padding:35px 0}.gallery-cover>img{height:280px}.lightbox{padding:0}.lightbox-panel{width:100%;height:100%;border:0;border-radius:0}.lightbox-panel header{align-items:start}.lightbox-panel header>div:first-child span{display:block}.lightbox-stage{grid-template-columns:38px minmax(0,1fr) 38px;padding:6px}.nav{width:34px;height:50px}.image-details{display:grid;gap:4px}.zoom-hint{display:none}}
</style>
