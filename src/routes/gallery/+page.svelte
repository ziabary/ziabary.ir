<script lang="ts">
  import PageHero from '$lib/components/PageHero.svelte';
  import { galleryItems } from '$lib/data';
</script>

<svelte:head><title>گالری | مهران ضیابری</title></svelte:head>

<main>
  <PageHero eyebrow="رویدادها و کلاس‌ها" title="گالری" lead="تصاویر منتخب از گفت‌وگوها، کلاس‌ها، ارائه‌ها و حضورهای حرفه‌ای." />
  <section class="wrap gallery-grid">
    {#each galleryItems as photo}
      <figure>
        <img src={photo.src} alt={photo.alt} />
        <figcaption><b>{photo.title}</b><span>{photo.caption}</span></figcaption>
      </figure>
    {/each}
  </section>
</main>
