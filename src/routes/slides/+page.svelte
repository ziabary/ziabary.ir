<script lang="ts">
  import PageHero from "$lib/components/PageHero.svelte";
  import { courses } from "$lib/data";
</script>

<svelte:head><title>اسلایدها و دوره‌ها | مهران ضیابری</title></svelte:head>
<main>
  <PageHero
    eyebrow="ارائه، کلاس و کارگاه"
    title="اسلایدها و دوره‌ها"
    lead="آرشیو ارائه‌ها و دوره‌هایی که برگزار کرده‌ام؛ همه اسلایدها و محتواهای این بخش با مجوز CC-BY-NC-SA 4.0 منتشر شده‌اند و می‌توانید آزادانه از آن‌ها استفاده کنید."
  />
  <section class="wrap teaching-list">
    {#each courses as course, index}<a href="/slides/{course.slug}/"
        ><div class="deck-thumb">
          <span>{index === 0 ? "۱۱۴" : "۰" + (index + 3)}</span><small
            >SLIDES</small
          >
        </div>
        <div>
          <small>{course.meta}</small>
          <h2>{course.title}</h2>
          <p>{course.summary}</p>
          <b>{course.slides} · مشاهده صفحه و دریافت فایل ←</b>
        </div></a
      >{/each}
  </section>

</main>
