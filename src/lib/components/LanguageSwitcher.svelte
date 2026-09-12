<script lang="ts">
  import { equivalentPages, otherLanguageSections, nativeNames, type Locale } from '$lib/editions';
  export let locale: Locale;
  export let pathname: string;
  let control: HTMLDetailsElement;
  $: equivalents = equivalentPages(pathname).filter(item => item.locale !== locale);
  $: destinations = otherLanguageSections(pathname, locale);
  $: currentHeading = locale === 'fa' ? 'همین مطلب به زبان دیگر' : locale === 'en' ? 'This page in another language' : 'Esta página en otro idioma';
  $: sectionHeading = locale === 'fa' ? 'مطالب به زبان‌های دیگر' : locale === 'en' ? 'Explore other languages' : 'Explorar otros idiomas';
  function escape(event: KeyboardEvent) { if (event.key === 'Escape' && control.open) { control.open = false; control.querySelector('summary')?.focus(); } }
  function closeOutside(event: MouseEvent) { if (control.open && !control.contains(event.target as Node)) control.open = false; }
  $: if (pathname && control) control.open = false;
</script>
<svelte:window onkeydown={escape} onclick={closeOutside} />
<details class="language-control" bind:this={control}>
  <summary aria-label={locale === 'fa' ? 'انتخاب زبان' : locale === 'en' ? 'Select language' : 'Seleccionar idioma'}><span lang={locale}>{nativeNames[locale]}</span><span aria-hidden="true">⌄</span></summary>
  <div class="language-menu">
    {#if equivalents.length}<section><h2>{currentHeading}</h2>{#each equivalents as item}<a href={item.href} hreflang={item.locale} lang={item.locale} onclick={() => control.open = false}>{nativeNames[item.locale]}</a>{/each}</section>{/if}
    <section><h2>{sectionHeading}</h2>{#each destinations as item}<a href={item.href} hreflang={item.locale} onclick={() => control.open = false}>{item.label}</a>{/each}</section>
  </div>
</details>
<style>
  .language-control { position: relative; font-size: 12px; }
  summary { list-style: none; cursor: pointer; display: flex; align-items: center; gap: 8px; min-height: 44px; padding: 0 10px; border: 1px solid var(--line); border-radius: 9px; background: var(--paper); color: var(--ink); }
  summary::-webkit-details-marker { display: none; }
  .language-menu { position: absolute; inset-inline-end: 0; top: calc(100% + 8px); width: min(300px, calc(100vw - 30px)); padding: 10px 16px; background: var(--paper); color: var(--ink); border: 1px solid var(--line); border-radius: 10px; box-shadow: var(--shadow); }
  section + section { border-top: 1px solid var(--line); margin-top: 8px; padding-top: 8px; }
  h2 { font-size: 12px; color: var(--muted); margin: 8px 0; line-height: 1.8; }
  a { display: block; padding: 9px 4px; min-height: 44px; border-radius: 4px; } a:hover { background: var(--soft); color: var(--teal); }
</style>
