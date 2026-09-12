<script lang="ts">
  import { onMount } from 'svelte';
  import { socialLinks } from '$lib/data';
  import LanguageSwitcher from './LanguageSwitcher.svelte';
  import SearchDialog from './SearchDialog.svelte';

  type Locale = 'fa' | 'en' | 'es';
  export let locale: Locale;
  export let pathname: string;

  let searchOpen = false;
  let dark = false;
  let menu = false;

  $: isLandingHome = pathname === '/' || pathname === `/${locale}/`;

  const copies = {
    fa: {
      home: 'صفحه اصلی', thought: 'اندیشه', writings: 'نوشته‌ها', guides: 'فنی‌جات',
      media: 'بازتاب‌ها', slides: 'اسلایدها', resume: 'رزومه',
      admin: 'مدیریت محتوا',
      search: 'جستجو', placeholder: 'جستجو در نوشته‌ها، راهنماها و اسلایدها…',
      noResult: 'نتیجه‌ای پیدا نشد.', copyright: '© ۱۴۰۵ مهران ضیابری'
    },
    en: {
      home: 'Home', thought: 'Thought', writings: 'Articles', guides: 'Technical notes',
      media: 'Media', slides: 'Slides', resume: 'Résumé',
      admin: 'Content editor',
      search: 'Search', placeholder: 'Search articles, technical notes and slides…',
      noResult: 'No results found.', copyright: '© 2026 Mehran Ziabary'
    },
    es: {
      home: 'Inicio', thought: 'Pensamiento', writings: 'Artículos', guides: 'Notas técnicas',
      media: 'Medios', slides: 'Diapositivas', resume: 'Currículum',
      admin: 'Editor de contenido',
      search: 'Buscar', placeholder: 'Buscar artículos, notas y diapositivas…',
      noResult: 'No se encontraron resultados.', copyright: '© 2026 Mehran Ziabary'
    }
  } as const;

  $: t = copies[locale];
  $: navigation = [
    { label: t.thought, href: locale === 'fa' ? '/thought/' : `/${locale}/thought/` },
    { label: t.writings, href: locale === 'fa' ? '/articles/' : `/${locale}/articles/` },
    { label: t.guides, href: locale === 'fa' ? '/guides/' : `/${locale}/guides/` },
    { label: t.slides, href: locale === 'fa' ? '/slides/' : `/${locale}/slides/` },
    { label: t.media, href: locale === 'fa' ? '/media/' : `/${locale}/media/` },
    { label: t.resume, href: locale === 'fa' ? '/resume/' : `/${locale}/resume/` }
  ];
  $: visibleSocialLinks = locale === 'fa' ? socialLinks : socialLinks.filter((social) => social.label !== 'Virgool');
  function toggleTheme() {
    dark = !dark;
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    localStorage.setItem('ziabary-theme', dark ? 'dark' : 'light');
  }

  function closeMenu() {
    menu = false;
  }

  onMount(() => {
    dark = localStorage.getItem('ziabary-theme') === 'dark';
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    const keyHandler = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        searchOpen = true;
      }
      if (event.key === 'Escape' && menu) { menu = false; document.querySelector<HTMLButtonElement>('.menu-button')?.focus(); }
    };
    window.addEventListener('keydown', keyHandler);
    return () => window.removeEventListener('keydown', keyHandler);
  });

  $: if (typeof document !== 'undefined') {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'fa' ? 'rtl' : 'ltr';
  }
</script>

<header class="site-header">
  <div class="wrap nav-wrap" class:landing-nav={isLandingHome}>
    {#if isLandingHome}
      <span class="brand-spacer" aria-hidden="true"></span>
    {:else}
      <a href={locale === 'fa' ? '/' : `/${locale}/`} class="brand" aria-label={t.home}>
        <b>{locale === 'fa' ? 'مهران ضیابری' : 'Mehran Ziabary'}</b>
        {#if locale !== 'fa'}<span>MEHRAN ZIABARY</span>{/if}
      </a>
    {/if}
    <button class="menu-button" onclick={() => (menu = !menu)} aria-label={locale === 'fa' ? 'منوی اصلی' : 'Menu'} aria-expanded={menu} aria-controls="main-navigation">☰</button>
    <nav id="main-navigation" class:open={menu}>
      {#each navigation as item}<a href={item.href} onclick={closeMenu}>{item.label}</a>{/each}
    </nav>
    <div class="nav-tools">
      <button onclick={() => (searchOpen = true)} aria-label={t.search}>⌕ <kbd>⌘K</kbd></button>
      <button onclick={toggleTheme} aria-label={locale === 'fa' ? 'تغییر حالت روشن و تیره' : 'Toggle light and dark theme'}>{dark ? '☀' : '◐'}</button>
      <LanguageSwitcher {locale} {pathname} />
    </div>
  </div>
</header>

<slot />

<footer class="site-footer">
  <div class="wrap footer-main">
    <div class="footer-identity">
      <b>{locale === 'fa' ? 'مهران ضیابری' : 'Mehran Ziabary'}</b>
      <a href="mailto:ziabary@targoman.com">ziabary@targoman.com</a>
    </div>
    <nav class="footer-nav" aria-label={locale === 'fa' ? 'پیوندهای پایین صفحه' : 'Footer navigation'}>
      {#each navigation as item}<a href={item.href}>{item.label}</a>{/each}
    </nav>
    <div class="footer-socials">
      {#each visibleSocialLinks as social}
        <a href={social.url} target="_blank" rel="noreferrer" aria-label={social.label} title={social.label}>
          <i class={social.icon} aria-hidden="true"></i>
        </a>
      {/each}
    </div>
  </div>
  <div class="wrap footer-meta"><span>{t.copyright}</span></div>
</footer>

{#if searchOpen}<SearchDialog {locale} onclose={() => searchOpen = false} />{/if}
