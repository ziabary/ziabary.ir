<script lang="ts">
  import PageHero from '$lib/components/PageHero.svelte';
  import { mediaItems } from '$lib/data';
  let kind = 'همه';
  const kinds = ['همه', ...new Set(mediaItems.map((item) => item.kind))];
  $: filtered = kind === 'همه' ? mediaItems : mediaItems.filter((item) => item.kind === kind);
</script>
<svelte:head><title>رسانه | مهران ضیابری</title></svelte:head>
<main><PageHero eyebrow="در رسانه‌ها" title="رسانه" lead="خلاصه‌ای از یادداشت‌ها، گفت‌وگوها و مطالبی که در رسانه‌های دیگر منتشر شده‌اند؛ همراه با ارجاع به منبع اصلی."/><section class="wrap filter-row">{#each kinds as item}<button class:active={item === kind} onclick={() => (kind = item)}>{item}</button>{/each}</section><section class="wrap media-list">{#each filtered as item, index}<a href={item.url} target="_blank" rel="noreferrer"><span class="media-index">{String(index + 1).padStart(2, '0')}</span><div><small>{item.source} · {item.kind}</small><h2>{item.title}</h2><p>{item.summary}</p></div><i>↗</i></a>{/each}</section></main>
