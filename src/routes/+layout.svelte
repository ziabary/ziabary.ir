<script lang="ts">
  import '../app.css';
  import '../refinement.css';
  import SiteShell from '$lib/components/SiteShell.svelte';
</script>

<svelte:head>
  <title>مهران ضیابری | Mehran Ziabary</title>
  <meta name="description" content="وب‌سایت شخصی مهران ضیابری؛ درباره هوش مصنوعی، حکمرانی، فناوری و تجربه‌های فنی." />
</svelte:head>

<SiteShell>
  <slot />
</SiteShell>
