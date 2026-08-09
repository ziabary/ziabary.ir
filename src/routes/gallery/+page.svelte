<script lang="ts">
  import PageHero from '$lib/components/PageHero.svelte';

  const photos = [
    {
      src: '/images/gallery/mehran-ziabary-media-office.jpeg',
      alt: 'مهران ضیابری در یک گفت‌وگوی رسانه‌ای',
      title: 'گفت‌وگوی رسانه‌ای',
      caption: 'تصویری از حضور در دفتر یک رسانه؛ تاریخ و شرح دقیق‌تر در حال تکمیل است.'
    },
    {
      src: '/images/gallery/mehran-ziabary-speaking.png',
      alt: 'مهران ضیابری هنگام ارائه و سخنرانی',
      title: 'ارائه و سخنرانی تخصصی',
      caption: 'در حال ارائه درباره فناوری و هوش مصنوعی.'
    },
    {
      src: '/images/profile/mehran-ziabary-formal.png',
      alt: 'پرتره رسمی مهران ضیابری',
      title: 'پرتره رسمی',
      caption: 'تصویر مناسب معرفی حرفه‌ای و رسانه‌ای.'
    },
    {
      src: '/images/gallery/mehran-ziabary-headshot.jpg',
      alt: 'تصویر چهره مهران ضیابری',
      title: 'پرتره',
      caption: 'تصویر آرشیوی؛ تاریخ تصویر در حال تکمیل است.'
    }
  ];
</script>

<svelte:head><title>گالری | مهران ضیابری</title></svelte:head>

<main>
  <PageHero eyebrow="رویدادها و کلاس‌ها" title="گالری" lead="تصاویر منتخب از گفت‌وگوها، کلاس‌ها، ارائه‌ها و حضورهای حرفه‌ای." />
  <section class="wrap gallery-grid">
    {#each photos as photo}
      <figure>
        <img src={photo.src} alt={photo.alt} />
        <figcaption><b>{photo.title}</b><span>{photo.caption}</span></figcaption>
      </figure>
    {/each}
  </section>
</main>
