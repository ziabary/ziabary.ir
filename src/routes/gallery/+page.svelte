<script lang="ts">
  import PageHero from '$lib/components/PageHero.svelte';
  import GalleryCollection from '$lib/components/GalleryCollection.svelte';
  import { galleryItems } from '$lib/data';
</script>

<svelte:head><title>گالری | مهران ضیابری</title></svelte:head>

<main>
  <PageHero eyebrow="رویدادها و کلاس‌ها" title="گالری" lead="تصاویر منتخب از گفت‌وگوها، کلاس‌ها، ارائه‌ها و حضورهای حرفه‌ای." />
  <section class="wrap"><GalleryCollection items={galleryItems} /></section>
</main>
