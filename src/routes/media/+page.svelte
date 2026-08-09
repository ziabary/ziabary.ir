<script lang="ts">
  import PageHero from '$lib/components/PageHero.svelte';
  import { articles } from '$lib/content';
  import { galleryItems, mediaItems, mediaSources } from '$lib/data';

  let kind = 'همه';

  const authoredMedia = articles
    .filter((article) => article.showInMedia && article.external)
    .map((article) => ({
      title: article.title,
      source: article.source ?? 'منبع اصلی',
      kind: article.mediaKind ?? 'یادداشت',
      summary: article.excerpt,
      url: article.external!,
      date: article.date,
      faDate: article.faDate
    }));

  const publishedItems = [...authoredMedia, ...mediaItems].sort((a, b) => b.date.localeCompare(a.date));
  const kinds = ['همه', ...new Set(publishedItems.map((item) => item.kind))];
  $: filtered = kind === 'همه' ? publishedItems : publishedItems.filter((item) => item.kind === kind);
</script>
<svelte:head><title>بازتاب‌ها | مهران ضیابری</title></svelte:head>
<main>
  <PageHero eyebrow="نوشته، گفت‌وگو و تصویر" title="بازتاب‌ها" lead="ردپای فعالیت‌های حرفه‌ای در رسانه‌ها و رویدادها؛ از نوشته‌ها و گفت‌وگوهای منتشرشده تا ویدئوها و تصاویر منتخب."/>

  <section class="wrap media-hub-section" aria-labelledby="published-heading">
    <div class="media-hub-heading"><div><p class="eyebrow">۰۱</p><h2 id="published-heading">نوشته‌ها و گفت‌وگوها</h2></div><p>خلاصه‌ای از مطالب منتشرشده، همراه با ارجاع مستقیم به منبع اصلی.</p></div>
    <div class="filter-row">{#each kinds as item}<button class:active={item === kind} onclick={() => (kind = item)}>{item}</button>{/each}</div>
    <div class="media-list">{#each filtered as item, index}<a href={item.url} target="_blank" rel="noreferrer"><span class="media-index fa-num">{String(index + 1).padStart(2, '0')}</span><div class="media-entry"><div class="media-source">{#if mediaSources[item.source]}<span class="media-source-logo"><img src={mediaSources[item.source].logo} alt="" loading="lazy" /></span>{/if}<span><strong>{item.source}</strong><small><span>{item.kind}</span><span class="fa-num">{item.faDate}</span></small></span></div><h2>{item.title}</h2><p>{item.summary}</p></div><i>↗</i></a>{/each}</div>
  </section>

  <section class="media-video-band" aria-labelledby="video-heading"><div class="wrap media-video-grid"><div><p class="eyebrow">۰۲</p><h2 id="video-heading">ویدئوها</h2><p>گفت‌وگوها، کلاس‌ها و ارائه‌های ضبط‌شده پس از بازبینی و دسته‌بندی در این بخش قرار می‌گیرند.</p></div><div class="video-placeholder"><i class="fa-solid fa-play" aria-hidden="true"></i><span>آرشیو ویدئویی در حال آماده‌سازی است</span></div></div></section>

  <section class="wrap media-hub-section" aria-labelledby="photos-heading">
    <div class="media-hub-heading"><div><p class="eyebrow">۰۳</p><h2 id="photos-heading">تصاویر منتخب</h2></div><a class="text-link" href="/gallery/">مشاهده آرشیو تصاویر ←</a></div>
    <div class="media-gallery">{#each galleryItems.slice(0, 3) as photo}<figure><img src={photo.src} alt={photo.alt}/><figcaption>{photo.title}</figcaption></figure>{/each}</div>
  </section>
</main>
