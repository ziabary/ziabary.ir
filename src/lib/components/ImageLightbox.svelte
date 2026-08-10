<script lang="ts">
  import { onMount } from 'svelte';

  const zoomableSelector = [
    '.article-page .article-cover img',
    '.article-page .prose img',
    '.guide-article-prose img',
    '.guide-series-cover img'
  ].join(', ');

  let activeSrc = '';
  let activeAlt = '';
  let previousOverflow = '';

  function open(image: HTMLImageElement) {
    activeSrc = image.currentSrc || image.src;
    activeAlt = image.alt || 'نمایش بزرگ تصویر';
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  }

  function close() {
    activeSrc = '';
    activeAlt = '';
    document.body.style.overflow = previousOverflow;
  }

  function enhanceImages() {
    document.querySelectorAll<HTMLImageElement>(zoomableSelector).forEach((image) => {
      image.classList.add('zoomable-article-image');
      image.setAttribute('role', 'button');
      image.setAttribute('tabindex', '0');
      image.setAttribute('aria-label', `${image.alt || 'تصویر مقاله'}؛ برای نمایش تمام‌صفحه کلیک کنید`);
    });
  }

  onMount(() => {
    enhanceImages();
    const observer = new MutationObserver(enhanceImages);
    observer.observe(document.body, { childList: true, subtree: true });

    const click = (event: MouseEvent) => {
      const target = event.target;
      if (target instanceof HTMLImageElement && target.matches(zoomableSelector)) {
        event.preventDefault();
        open(target);
      }
    };

    const keydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && activeSrc) {
        close();
        return;
      }
      const target = event.target;
      if ((event.key === 'Enter' || event.key === ' ') && target instanceof HTMLImageElement && target.matches(zoomableSelector)) {
        event.preventDefault();
        open(target);
      }
    };

    document.addEventListener('click', click);
    document.addEventListener('keydown', keydown);
    return () => {
      observer.disconnect();
      document.removeEventListener('click', click);
      document.removeEventListener('keydown', keydown);
      document.body.style.overflow = previousOverflow;
    };
  });
</script>

{#if activeSrc}
  <div class="lightbox" role="dialog" aria-modal="true" aria-label={activeAlt} tabindex="-1" on:click|self={close} on:keydown={(event) => event.key === 'Escape' && close()}>
    <button class="close" type="button" aria-label="بستن تصویر" on:click={close}>×</button>
    <figure>
      <img src={activeSrc} alt={activeAlt} />
      {#if activeAlt}<figcaption>{activeAlt}</figcaption>{/if}
    </figure>
  </div>
{/if}

<style>
  :global(.zoomable-article-image) {
    cursor: zoom-in;
    transition: transform .18s ease, opacity .18s ease, box-shadow .18s ease;
  }

  :global(.zoomable-article-image:hover),
  :global(.zoomable-article-image:focus-visible) {
    opacity: .93;
    transform: translateY(-2px);
    box-shadow: 0 14px 34px color-mix(in srgb, var(--navy) 20%, transparent);
    outline: 2px solid color-mix(in srgb, var(--teal) 70%, transparent);
    outline-offset: 4px;
  }

  .lightbox {
    position: fixed;
    z-index: 10000;
    inset: 0;
    display: grid;
    place-items: center;
    padding: 30px;
    background: rgba(3, 11, 23, .94);
    backdrop-filter: blur(8px);
  }

  .lightbox figure {
    width: min(96vw, 1800px);
    height: min(90vh, 1100px);
    margin: 0;
    display: grid;
    grid-template-rows: minmax(0, 1fr) auto;
    gap: 12px;
    place-items: center;
  }

  .lightbox img {
    display: block;
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
    object-fit: contain;
    border-radius: 8px;
    box-shadow: 0 28px 80px rgba(0, 0, 0, .5);
  }

  .lightbox figcaption {
    max-width: 900px;
    color: rgba(255, 255, 255, .8);
    font-size: 12px;
    line-height: 1.8;
    text-align: center;
  }

  .close {
    position: fixed;
    inset-block-start: 18px;
    inset-inline-end: 22px;
    width: 44px;
    height: 44px;
    border: 1px solid rgba(255, 255, 255, .35);
    border-radius: 50%;
    background: rgba(0, 0, 0, .35);
    color: white;
    font-size: 30px;
    line-height: 1;
    cursor: pointer;
  }

  .close:hover,
  .close:focus-visible { background: rgba(255, 255, 255, .18); }

  @media (max-width: 700px) {
    .lightbox { padding: 64px 12px 18px; }
    .lightbox figure { width: 100%; height: calc(100vh - 82px); }
  }
</style>
