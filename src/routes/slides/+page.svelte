<script lang="ts">
  import PageHero from '$lib/components/PageHero.svelte';
  import { courses } from '$lib/data';
</script>
<svelte:head><title>اسلایدها و دوره‌ها | مهران ضیابری</title></svelte:head>
<main><PageHero eyebrow="ارائه، کلاس و کارگاه" title="اسلایدها و دوره‌ها" lead="آرشیو ارائه‌ها و دوره‌هایی که برگزار کرده‌ام؛ برای کسانی که می‌خواهند اسلایدها، توضیح دوره و نسخه‌های قابل دریافت را سریع پیدا کنند."/><section class="wrap teaching-list">{#each courses as course, index}<a href="/slides/{course.slug}/"><div class="deck-thumb"><span>{index === 0 ? '۱۱۴' : '۰' + (index + 3)}</span><small>SLIDES</small></div><div><small>{course.meta}</small><h2>{course.title}</h2><p>{course.summary}</p><b>{course.slides} · مشاهده صفحه و دریافت فایل ←</b></div></a>{/each}</section><section class="wrap teaching-note"><b>فایل‌ها چگونه منتشر می‌شوند؟</b><p>هر دوره صفحه مستقل خود را دارد و اسلایدها در قالب PDF با شماره نسخه، تاریخ و توضیح برگزاری منتشر می‌شوند.</p></section></main>
