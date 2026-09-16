<script lang="ts">
  import { onMount } from 'svelte';
  import ArticleActions from './ArticleActions.svelte';
  export let title: string;
  export let cover: string | undefined = undefined;
  export let excerpt: string;
  export let href: string;
  export let standaloneHref: string | undefined = undefined;
  export let locale: 'fa' | 'en' | 'es' = 'fa';
  let footer: HTMLDivElement;
  let visible = false;
  let expanded = false;
  let docked = false;
  let railLeft = 0;
  let railTop = 0;
  let dockLeft = 12;
  $: label = standaloneHref
    ? (locale === 'fa' ? 'گزینه‌های مقاله' : locale === 'en' ? 'Article actions' : 'Opciones del artículo')
    : (locale === 'fa' ? 'اشتراک‌گذاری نوشته' : locale === 'en' ? 'Share article' : 'Compartir artículo');

  onMount(() => {
    const body = footer.parentElement!;
    const details = body.closest('details');
    const navigation = Array.from(body.closest('main')?.querySelectorAll<HTMLElement>('[data-reading-navigation]') ?? []);
    let frame = 0;
    const update = () => {
      frame = 0;
      if (details && !details.open) {
        visible = false;
        expanded = false;
        return;
      }
      const rect = body.getBoundingClientRect();
      const end = footer.getBoundingClientRect();
      // Follow the actual layout, not the language: article and guide menus
      // can sit on different sides. Keep the rail opposite a side menu.
      const sidebars = navigation.map(element => element.getBoundingClientRect())
        .filter(menu => menu.width > 0 && menu.height > 0
          && (menu.right <= rect.left + 1 || menu.left >= rect.right - 1));
      const left = rect.left - 70;
      const right = rect.right + 16;
      const available = (x: number) => x >= 12 && x + 54 <= innerWidth - 12
        && sidebars.every(menu => x + 54 + 8 <= menu.left || x >= menu.right + 8);
      const preferRight = sidebars.some(menu => menu.right <= rect.left + 1);
      const candidates = preferRight ? [right, left] : [left, right];
      const position = candidates.find(available);
      docked = innerWidth <= 850 || position === undefined;
      railLeft = position ?? left;
      // On a narrow desktop layout, keep the compact fallback inside the
      // article column too, so it cannot cover the table of contents.
      dockLeft = innerWidth <= 850 ? 12 : Math.max(12, Math.min(rect.left + 12, innerWidth - (standaloneHref ? 210 : 164)));
      railTop = Math.max(innerHeight * 0.5, rect.top + 50);
      // Available as soon as the text enters view; footer controls take over
      // at the end, and closed/offscreen chapters never show a floating rail.
      visible = rect.height > 0 && rect.top < innerHeight - 120
        && end.top > innerHeight - 24;
      if (!visible) expanded = false;
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && expanded) {
        expanded = false;
        body.querySelector<HTMLButtonElement>('.share-toggle')?.focus();
      }
    };
    const observer = new ResizeObserver(schedule);
    observer.observe(body);
    navigation.forEach(element => observer.observe(element));
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    window.addEventListener('keydown', onKeyDown);
    details?.addEventListener('toggle', schedule);
    schedule();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      window.removeEventListener('keydown', onKeyDown);
      details?.removeEventListener('toggle', schedule);
    };
  });
</script>

<div class="reading-share-end" bind:this={footer} data-share-href={href}>
  <ArticleActions {cover} {title} {excerpt} {href} {locale} {standaloneHref} />
</div>
{#if visible}
  <aside class="reading-share-float" class:expanded class:docked style:--share-left={`${railLeft}px`} style:--share-top={`${railTop}px`} style:--share-dock-left={`${dockLeft}px`} aria-label={label} data-share-href={href}>
    <button class="share-toggle" type="button" aria-label={label} aria-expanded={expanded} onclick={() => expanded = !expanded}>
      <svg viewBox="0 0 24 24" width="19" height="19" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 10.5 6.8-4M8.6 13.5l6.8 4"/></svg>
    </button>
    <div class="floating-actions" role="group" aria-label={label}>
      <ArticleActions {cover} {title} {excerpt} {href} {locale} {standaloneHref} compact />
    </div>
  </aside>
{/if}

<style>
  .reading-share-end{clear:both;margin-top:32px;padding-top:22px;border-top:1px solid var(--line)}
  .reading-share-end :global(.article-actions){margin:0}
  .reading-share-float{position:fixed;left:var(--share-left);top:var(--share-top);transform:translateY(-50%);z-index:35;padding:6px;border:1px solid var(--line);border-radius:14px;background:var(--paper);box-shadow:0 4px 20px #0002;line-height:1;direction:ltr}
  .floating-actions :global(.article-actions){display:flex;flex-direction:column;gap:6px;margin:0}
  .share-toggle{display:none;align-items:center;justify-content:center;width:40px;height:40px;border:0;border-radius:50%;padding:0;background:var(--teal);color:white;cursor:pointer}
  .share-toggle:focus-visible{outline:2px solid var(--link-ink);outline-offset:3px}
  .reading-share-float.docked{left:max(var(--share-dock-left),env(safe-area-inset-left));top:auto;bottom:calc(16px + env(safe-area-inset-bottom));transform:none;border-radius:24px;padding:4px;display:flex;align-items:center;gap:0}
  .docked .share-toggle{display:flex}
  .docked .floating-actions{display:none}
  .docked.expanded .floating-actions{display:block;margin-left:6px}
  .docked .floating-actions :global(.article-actions){flex-direction:row}
  @media(hover:hover){.docked:hover .floating-actions{display:block;margin-left:6px}}
  @media print{.reading-share-float{display:none}}
</style>
