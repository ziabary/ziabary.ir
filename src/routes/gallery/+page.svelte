<script lang="ts">
  import PageHero from '$lib/components/PageHero.svelte';
  const photos = [
    'https://peivast.com/wp-content/uploads/DSC01627.jpg',
    'https://peivast.com/wp-content/uploads/%D8%B6%DB%8C%D8%A7%D8%A8%D8%B1%DB%8C-e1732539846612-1-e1742572947983.jpg',
    'https://peivast.com/wp-content/uploads/1727542437214-e1727543258489.png'
  ];
</script>
<svelte:head><title>گالری | مهران ضیابری</title></svelte:head>
<main><PageHero eyebrow="رویدادها و کلاس‌ها" title="گالری" lead="تصاویر منتخب از گفت‌وگوها، کلاس‌ها و حضورهای حرفه‌ای. عکس‌های اصلی و توضیحات دقیق در مرحله بعد جایگزین می‌شوند."/><section class="wrap gallery-grid">{#each [...photos, ...photos] as photo, index}<figure><img src={photo} alt="تصویر موقت گالری {index + 1}"/><figcaption><b>{index % 2 ? 'کلاس و گفت‌وگوی تخصصی' : 'نشست و مصاحبه'}</b><span>اطلاعات و تاریخ تصویر در حال تکمیل است</span></figcaption></figure>{/each}</section></main>
