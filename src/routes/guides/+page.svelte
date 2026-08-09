<script lang="ts">
  import PageHero from '$lib/components/PageHero.svelte';
  import ArticleCard from '$lib/components/ArticleCard.svelte';
  import { articles } from '$lib/content';
  const guides = articles.filter((article) => article.category === 'راهنمای فنی');
</script>
<svelte:head><title>راهنماهای فنی | مهران ضیابری</title></svelte:head>
<main><PageHero eyebrow="از تجربه تا اجرا" title="راهنماهای فنی" lead="یادداشت‌هایی برای کسانی که می‌خواهند پشت واژه‌های مدیریتی، معماری و محدودیت واقعی سامانه را ببینند."/><section class="wrap guide-intro"><b>راهنمای خوب باید امکان تصمیم بدهد.</b><p>این بخش برای راهنماهای قابل استفاده درباره معماری هوش مصنوعی، امنیت، زیرساخت و پیاده‌سازی است. میراث وبلاگ فنی قدیمی نیز به‌تدریج اینجا بازسازی خواهد شد.</p></section><section class="wrap archive-list">{#each guides as article}<ArticleCard {article}/>{/each}</section><section class="wrap coming-grid"><div><small>به‌زودی</small><b>نصب و راه‌اندازی GPU روی سرورهای سازمانی</b><span>بازسازی و به‌روزرسانی راهنماهای فنی قدیمی</span></div><div><small>به‌زودی</small><b>معماری چنداینستنسی با SQLite؛ کجا و تا کجا؟</b><span>مرز میان سادگی استقرار و محدودیت هم‌زمانی</span></div></section></main>
