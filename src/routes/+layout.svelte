<script lang="ts">
  import '../app.css';
  import '../refinement.css';
  import SiteShell from '$lib/components/SiteShell.svelte';
  import ImageLightbox from '$lib/components/ImageLightbox.svelte';
  export let data;
</script>

<svelte:head>
  <title>مهران ضیابری | سید محمد محمدزاده ضیابری</title>
  <meta name="description" content="وب‌سایت شخصی سید محمد محمدزاده ضیابری، شناخته‌شده با نام مهران ضیابری؛ درباره هوش مصنوعی، حکمرانی، فناوری و تجربه‌های فنی." />
</svelte:head>

<SiteShell locale={data.locale} pathname={data.pathname}>
  <slot />
</SiteShell>
<ImageLightbox />
