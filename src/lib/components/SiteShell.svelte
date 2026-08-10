<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { articles } from '$lib/content';
  import { courses, socialLinks } from '$lib/data';

  let searchOpen = false;
  let query = '';
  let dark = false;
  let menu = false;

  type Locale = 'fa' | 'en' | 'es';
  let locale: Locale = 'fa';
  $: locale = $page.url.pathname.startsWith('/en')
    ? 'en'
    : $page.url.pathname.startsWith('/es')
      ? 'es'
      : 'fa';
  $: isPersianHome = locale === 'fa' && $page.url.pathname === '/';

  const copies = {
    fa: {
      home: 'صفحه اصلی', thought: 'اندیشه', writings: 'نوشته‌ها', guides: 'فنی‌جات',
      media: 'بازتاب‌ها', slides: 'اسلایدها', resume: 'رزومه',
      admin: 'مدیریت محتوا',
      search: 'جستجو', placeholder: 'جستجو در نوشته‌ها، راهنماها و اسلایدها…',
      noResult: 'نتیجه‌ای پیدا نشد.', copyright: '© ۱۴۰۵ مهران ضیابری'
    },
    en: {
      home: 'Home', thought: 'About', writings: 'Writing', guides: 'Technical notes',
      media: 'Media', slides: 'Slides', resume: 'Résumé',
      admin: 'Content editor',
      search: 'Search', placeholder: 'Search writing, technical notes and slides…',
      noResult: 'No results found.', copyright: '© 2026 Mehran Ziabary'
    },
    es: {
      home: 'Inicio', thought: 'Acerca de', writings: 'Artículos', guides: 'Notas técnicas',
      media: 'Medios', slides: 'Diapositivas', resume: 'Currículum',
      admin: 'Editor de contenido',
      search: 'Buscar', placeholder: 'Buscar artículos, notas y diapositivas…',
      noResult: 'No se encontraron resultados.', copyright: '© 2026 Mehran Ziabary'
    }
  } as const;

  $: t = copies[locale];
  $: searchItems = [
    ...articles
      .filter((article) => article.lang === locale)
      .map((article) => ({
        title: article.title,
        excerpt: article.excerpt,
        href: locale === 'en' ? `/en/articles/${article.slug}/` : `/articles/${article.slug}/`,
        type: article.category
      })),
    ...(locale === 'fa' ? courses.map((course) => ({ title: course.title, excerpt: course.summary, href: `/slides/${course.slug}/`, type: 'اسلاید و دوره' })) : [])
  ];
  $: results = query.trim()
    ? searchItems
        .filter((item) => `${item.title} ${item.excerpt} ${item.type}`.toLowerCase().includes(query.trim().toLowerCase()))
        .slice(0, 8)
    : searchItems.slice(0, 5);

  function localHref(fa: string, anchor: string) {
    if (locale === 'en' && fa === '/articles/') return '/en/articles/';
    return locale === 'fa' ? fa : `/${locale}/#${anchor}`;
  }

  function toggleTheme() {
    dark = !dark;
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    localStorage.setItem('ziabary-theme', dark ? 'dark' : 'light');
  }

  onMount(() => {
    dark = localStorage.getItem('ziabary-theme') === 'dark';
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    const keyHandler = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        searchOpen = true;
      }
      if (event.key === 'Escape') searchOpen = false;
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
  <div class="wrap nav-wrap" class:landing-nav={isPersianHome}>
    {#if isPersianHome}
      <span class="brand-spacer" aria-hidden="true"></span>
    {:else}
      <a href={locale === 'fa' ? '/' : `/${locale}/`} class="brand" aria-label={t.home}>
        <b>{locale === 'fa' ? 'مهران ضیابری' : 'Mehran Ziabary'}</b>
        {#if locale !== 'fa'}<span>MEHRAN ZIABARY</span>{/if}
      </a>
    {/if}
    <button class="menu-button" onclick={() => (menu = !menu)} aria-label="Menu">☰</button>
    <nav class:open={menu}>
      <a href={localHref('/thought/', 'about')}>{t.thought}</a>
      <a href={localHref('/articles/', 'writing')}>{t.writings}</a>
      <a href={localHref('/guides/', 'writing')}>{t.guides}</a>
      <a href={localHref('/slides/', 'slides')}>{t.slides}</a>
      <a href={localHref('/media/', 'media')}>{t.media}</a>
      <a href={localHref('/resume/', 'resume')}>{t.resume}</a>
    </nav>
    <div class="nav-tools">
      <button onclick={() => (searchOpen = true)} aria-label={t.search}>⌕ <kbd>⌘K</kbd></button>
      <button onclick={toggleTheme} aria-label="Theme">{dark ? '☀' : '◐'}</button>
      <div class="lang"><span>{locale.toUpperCase()}⌄</span><div><a href="/">فارسی</a><a href="/en/">English</a><a href="/es/">Español</a></div></div>
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
      <a href={localHref('/thought/', 'about')}>{t.thought}</a>
      <a href={localHref('/articles/', 'writing')}>{t.writings}</a>
      <a href={localHref('/guides/', 'writing')}>{t.guides}</a>
      <a href={localHref('/slides/', 'slides')}>{t.slides}</a>
      <a href={localHref('/media/', 'media')}>{t.media}</a>
      <a href={localHref('/resume/', 'resume')}>{t.resume}</a>
    </nav>
    <div class="footer-socials">
      {#each socialLinks as social}
        <a href={social.url} target="_blank" rel="noreferrer" aria-label={social.label} title={social.label}>
          <i class={social.icon} aria-hidden="true"></i>
        </a>
      {/each}
    </div>
  </div>
  <div class="wrap footer-meta"><span>{t.copyright}</span><span><a href="/">FA</a> · <a href="/en/">EN</a> · <a href="/es/">ES</a></span></div>
</footer>

{#if searchOpen}
  <div class="search-layer" role="presentation" onclick={(event) => { if (event.target === event.currentTarget) searchOpen = false; }}>
    <section class="search-box">
      <div class="search-input"><span>⌕</span><input bind:value={query} placeholder={t.placeholder} /><button onclick={() => (searchOpen = false)}>ESC</button></div>
      <div class="search-results">
        {#each results as item}<a href={item.href}><small>{item.type}</small><b>{item.title}</b><span>{item.excerpt}</span></a>{/each}
        {#if !results.length}<p>{t.noResult}</p>{/if}
      </div>
    </section>
  </div>
{/if}
