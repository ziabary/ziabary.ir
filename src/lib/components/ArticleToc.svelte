<script lang="ts">
  import { headingSections, keepCurrentVisible } from '$lib/contents-navigation';
  export let headings: Array<{ id: string; title: string; depth: number }> = [];
  export let locale: 'fa' | 'en' | 'es' = 'fa';
  export let prefix = '';
  export let active = '';
  $: title = locale === 'fa' ? 'در این نوشته' : locale === 'en' ? 'In this article' : 'En este artículo';
  $: sections = headingSections(headings);
  $: activeParent = sections.find(item => item.id === active || item.children.some(child => child.id === active))?.id;
</script>

{#snippet links()}
  <ol>
    {#each sections as item}
      <li>
        <a href={`#${prefix}${item.id}`} class:active={activeParent === item.id} aria-current={active === item.id ? 'location' : undefined} onclick={() => active = item.id}>{item.title}</a>
        {#if activeParent === item.id && item.children.length}
          <ol>{#each item.children as child}<li><a href={`#${prefix}${child.id}`} aria-current={active === child.id ? 'location' : undefined} onclick={() => active = child.id}>{child.title}</a></li>{/each}</ol>
        {/if}
      </li>
    {/each}
  </ol>
{/snippet}

<aside class="article-toc" aria-label={title}>
  <details class="desktop-toc" open><summary>{title}</summary><nav aria-label={title} use:keepCurrentVisible={active}>{@render links()}</nav></details>
  <details class="mobile-toc"><summary>{title}</summary><nav aria-label={title} use:keepCurrentVisible={active}>{@render links()}</nav></details>
</aside>

<style>
  .article-toc { min-width: 0; font-size: 13px; line-height: 1.85; }
  summary { cursor: pointer; font-weight: 700; padding-block: 10px; color: var(--ink); }
  nav { display: block; position: static; inset: auto; margin: 0; padding: 0; background: transparent; border: 0; max-height: calc(100dvh - 170px); overflow: auto; overscroll-behavior: contain; }
  ol { list-style: none; padding: 0; margin: 0; }
  a { display: block; border-inline-start: 2px solid var(--line); padding: 7px 12px; color: var(--muted); white-space: normal; overflow-wrap: anywhere; font-size: inherit; }
  a.active, a[aria-current] { border-color: var(--link-ink); color: var(--link-ink); font-weight: 700; }
  a[aria-current] { background: var(--soft); }
  ol ol { margin-inline-start: 12px; font-size: 12px; }
  .mobile-toc { display: none; }
  @media (max-width: 1199px) { .desktop-toc { display: none; } .mobile-toc { display: block; border-block: 1px solid var(--line); } nav { max-height: 50vh; } }
</style>
