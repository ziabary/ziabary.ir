<script lang="ts">
  import { imageAttributes } from '$lib/images';
  import { mediaSources } from '$lib/news';
  import { externalLinkAttributes } from '$lib/external-links.mjs';
  export let item: { title: string; source: string; kind: string; summary: string; url: string; faDate?: string; coverImage?: string | null; coverImageAlt?: string | null; internalUrl?: string };
  export let index: number;
  let expanded = false;
  const previewWordLimit = 45;
  $: summaryWords = item.summary.trim().split(/\s+/);
  $: canExpand = summaryWords.length > previewWordLimit;
  $: visibleWords = expanded || !canExpand ? summaryWords : summaryWords.slice(0, previewWordLimit);
  $: summaryStart = visibleWords.slice(0, -1).join(' ');
  $: summaryEnd = visibleWords.at(-1) ?? '';
  $: sourceName = item.source.replace(/^خبرگزاری\s+/, '');
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
      <h2><a href={item.internalUrl ?? item.url} {...externalLinkAttributes(item.internalUrl ?? item.url)}>{item.title}</a></h2>
      <p id={`media-summary-${index}`} class="media-summary">{summaryStart}{' '}<span class="summary-tail">{summaryEnd}{canExpand && !expanded ? '…' : ''}{#if canExpand}{' '}<button class="summary-toggle" type="button" aria-expanded={expanded} aria-controls={`media-summary-${index}`} onclick={() => expanded = !expanded}>{expanded ? 'خلاصه‌تر' : 'ادامهٔ خلاصه'}</button>{/if}</span></p>
    </div>
    <div class="entry-actions">
      <a href={item.url} target="_blank" rel="noreferrer">مشاهده در {sourceName} ↗</a>
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
  .media-summary { font-size: 15px; margin: 0; color: var(--muted); line-height: 1.95; }
  .summary-tail { white-space: nowrap; }
  .summary-toggle { display: inline; font: inherit; color: var(--link-ink); border: 0; background: none; cursor: pointer; padding: 0; text-underline-offset: 4px; }
  .summary-toggle:hover { text-decoration: underline; }
  .summary-toggle:focus-visible { outline: 2px solid var(--link-ink); outline-offset: 3px; border-radius: 2px; }
  .entry-actions { clear: both; display: flex; flex-direction: column; align-items: flex-start; padding-top: 12px; font-size: 13px; color: var(--link-ink); }
  .entry-actions a { display: inline-flex; align-items: center; min-height: 44px; padding: 0; }
  @media(max-width:680px) { .media-row { gap: 12px; } h2 { font-size: 19px; } }
</style>
