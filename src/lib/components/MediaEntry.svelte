<script lang="ts">
  import { imageAttributes } from '$lib/images';
  import { mediaSources } from '$lib/news';
  export let item: { title: string; source: string; kind: string; summary: string; url: string; faDate?: string; coverImage?: string | null; coverImageAlt?: string | null; internalUrl?: string };
  export let index: number;
  let expanded = false;
</script>

<article class="media-row">
  <span class="media-index">{new Intl.NumberFormat('fa-IR', { minimumIntegerDigits: 2 }).format(index + 1)}</span>
  <div class="media-entry">
    <div class="media-source">
      {#if mediaSources[item.source]}<span class="media-source-logo"><img {...imageAttributes(mediaSources[item.source].logo, '180px')} alt="" loading="lazy" width="44" height="44" /></span>{/if}
      <span><strong>{item.source}</strong><small>{item.kind} · {item.faDate ?? ''}</small></span>
    </div>
    <div class="media-entry-content">
      {#if item.coverImage}<img class="media-cover" {...imageAttributes(item.coverImage, '180px')} alt={item.coverImageAlt ?? ''} loading="lazy" width="160" height="120" />{/if}
      <h2><a href={item.internalUrl ?? item.url}>{item.title}</a></h2>
      <p class:expanded>{item.summary}</p>
    </div>
    <div class="entry-actions">
      <button type="button" aria-expanded={expanded} onclick={() => expanded = !expanded}>{expanded ? 'خلاصه‌تر' : 'ادامهٔ خلاصه'}</button>
      {#if item.internalUrl}<a href={item.internalUrl}>خواندن در سایت ←</a>{/if}
      <a href={item.url} target="_blank" rel="noreferrer">انتشار در رسانه ↗</a>
    </div>
  </div>
</article>

<style>
  .media-entry-content { display: flow-root; }
  .media-cover { float: inline-end; width: 160px; height: 120px; margin: 14px 20px 12px 0; object-fit: cover; border: 1px solid var(--line); border-radius: 8px; background: var(--soft); }
  a { display: inline; padding: 0; border: 0; background: transparent; }
  @media(max-width:680px) { .media-cover { width: 96px; height: 72px; margin-inline-start: 12px; } }

  .media-row { display: flex; gap: 24px; padding-block: 28px; border-top: 1px solid var(--line); }
  .media-index { color: var(--link-ink); font-size: 13px; } .media-entry { flex: 1; min-width: 0; }
  h2 { font-size: 22px; line-height: 1.7; margin-block: 12px; }
  p { font-size: 15px; margin: 0; color: var(--muted); line-height: 1.95; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 3; line-clamp: 3; overflow: hidden; }
  p.expanded { display: block; }
  .entry-actions { clear: both; display: flex; flex-wrap: wrap; gap: 12px 24px; padding-top: 16px; font-size: 13px; color: var(--link-ink); }
  button { font: inherit; color: inherit; border: 0; background: none; cursor: pointer; padding: 0; min-height: 44px; }
  .entry-actions a { display: inline-flex; align-items: center; min-height: 44px; }
  @media(max-width:680px) { .media-row { gap: 12px; } h2 { font-size: 19px; } }
</style>
