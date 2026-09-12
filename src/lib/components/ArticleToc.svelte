<script lang="ts">
  import { onMount } from 'svelte';
  export let headings: Array<{ id: string; title: string; depth: number }> = [];
  export let locale: 'fa' | 'en' | 'es' = 'fa';
  export let prefix = '';
  let active = headings.find(item => item.depth === 2)?.id ?? '';
  $: title = locale === 'fa' ? 'در این نوشته' : locale === 'en' ? 'In this article' : 'En este artículo';
  $: sections = headings.filter(item => item.depth === 2).map(item => {
    const start = headings.indexOf(item) + 1;
    const next = headings.slice(start).findIndex(heading => heading.depth === 2);
    return { ...item, children: headings.slice(start, next < 0 ? undefined : start + next) };
  });
  $: activeParent = sections.find(item => item.id === active || item.children.some(child => child.id === active))?.id;

  onMount(() => {
    const nodes = headings.map(item => document.getElementById(prefix + item.id)).filter((node): node is HTMLElement => Boolean(node));
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]) active = visible[0].target.id.slice(prefix.length);
      else for (const entry of entries) {
        if (entry.boundingClientRect.top < 100) active = entry.target.id.slice(prefix.length);
      }
    }, { rootMargin: '-100px 0px -55% 0px', threshold: 0 });
    nodes.forEach(node => observer.observe(node));
    const fromHash = () => {
      const id = decodeURIComponent(location.hash.slice(1));
      if (nodes.some(node => node.id === id)) active = id.slice(prefix.length);
    };
    fromHash(); window.addEventListener('hashchange', fromHash);
    return () => { observer.disconnect(); window.removeEventListener('hashchange', fromHash); };
  });
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
  <details class="desktop-toc" open><summary>{title}</summary><nav aria-label={title}>{@render links()}</nav></details>
  <details class="mobile-toc"><summary>{title}</summary><nav aria-label={title}>{@render links()}</nav></details>
</aside>

<style>
  .article-toc { min-width: 0; font-size: 13px; line-height: 1.85; }
  summary { cursor: pointer; font-weight: 700; padding-block: 10px; color: var(--ink); }
  nav { display: block; position: static; inset: auto; margin: 0; padding: 0; background: transparent; border: 0; max-height: calc(100dvh - 170px); overflow: auto; overscroll-behavior: contain; }
  ol { list-style: none; padding: 0; margin: 0; }
  a { display: block; border-inline-start: 2px solid var(--line); padding: 7px 12px; color: var(--muted); white-space: normal; overflow-wrap: anywhere; font-size: inherit; }
  a.active, a[aria-current] { border-color: var(--link-ink); color: var(--link-ink); font-weight: 700; }
  ol ol { margin-inline-start: 12px; font-size: 12px; }
  .mobile-toc { display: none; }
  @media (max-width: 1199px) { .desktop-toc { display: none; } .mobile-toc { display: block; border-block: 1px solid var(--line); } nav { max-height: 50vh; } }
</style>
