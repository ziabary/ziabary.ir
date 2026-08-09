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

  const copies = {
    fa: {
      home: 'صفحه اصلی', thought: 'اندیشه', writings: 'نوشته‌ها', guides: 'راهنماهای فنی',
      media: 'رسانه', slides: 'اسلایدها', gallery: 'گالری', resume: 'رزومه',
      search: 'جستجو', placeholder: 'جستجو در نوشته‌ها، راهنماها و اسلایدها…',
      noResult: 'نتیجه‌ای پیدا نشد.', explore: 'مرور سایت', follow: 'دنبال کردن',
      footer: 'این سایت، فقط معرفی من نیست؛ آرشیوی از چیزهایی است که ساخته‌ام، نوشته‌ام و آموزش داده‌ام.',
      note: 'محتوا در حال تکمیل و بازبینی است.', copyright: '© ۱۴۰۵ مهران ضیابری'
    },
    en: {
      home: 'Home', thought: 'About', writings: 'Writing', guides: 'Technical notes',
      media: 'Media', slides: 'Slides', gallery: 'Gallery', resume: 'Résumé',
      search: 'Search', placeholder: 'Search writing, technical notes and slides…',
      noResult: 'No results found.', explore: 'Explore', follow: 'Follow',
      footer: 'Not just a profile: an archive of what I have built, written and taught.',
      note: 'Selected English content is in progress.', copyright: '© 2026 Mehran Ziabary'
    },
    es: {
      home: 'Inicio', thought: 'Acerca de', writings: 'Artículos', guides: 'Notas técnicas',
      media: 'Medios', slides: 'Diapositivas', gallery: 'Galería', resume: 'Currículum',
      search: 'Buscar', placeholder: 'Buscar artículos, notas y diapositivas…',
      noResult: 'No se encontraron resultados.', explore: 'Explorar', follow: 'Seguir',
      footer: 'No es solo un perfil: es un archivo de lo que he creado, escrito y enseñado.',
      note: 'El contenido en español está en preparación.', copyright: '© 2026 Mehran Ziabary'
    }
  } as const;

  $: t = copies[locale];
  $: searchItems = [
    ...articles.map((article) => ({ title: article.title, excerpt: article.excerpt, href: `/articles/${article.slug}/`, type: article.category })),
    ...courses.map((course) => ({ title: course.title, excerpt: course.summary, href: `/slides/${course.slug}/`, type: 'اسلاید و دوره' }))
  ];
  $: results = query.trim()
    ? searchItems
        .filter((item) => `${item.title} ${item.excerpt} ${item.type}`.toLowerCase().includes(query.trim().toLowerCase()))
        .slice(0, 8)
    : searchItems.slice(0, 5);

  function localHref(fa: string, anchor: string) {
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
  <div class="wrap nav-wrap">
    <a href={locale === 'fa' ? '/' : `/${locale}/`} class="brand" aria-label={t.home}>
      <b>{locale === 'fa' ? 'مهران ضیابری' : 'Mehran Ziabary'}</b><span>MEHRAN ZIABARY</span>
    </a>
    <button class="menu-button" onclick={() => (menu = !menu)} aria-label="Menu">☰</button>
    <nav class:open={menu}>
      <a href={localHref('/thought/', 'about')}>{t.thought}</a>
      <a href={localHref('/articles/', 'writing')}>{t.writings}</a>
      <a href={localHref('/guides/', 'writing')}>{t.guides}</a>
      <a href={localHref('/media/', 'media')}>{t.media}</a>
      <a href={localHref('/slides/', 'slides')}>{t.slides}</a>
      <a href={localHref('/gallery/', 'gallery')}>{t.gallery}</a>
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

<footer>
  <div class="wrap footer-lead">
    <div><p>{t.footer}</p><a href={localHref('/articles/', 'writing')}>{t.explore} ←</a></div>
    <div class="social-row">
      {#each socialLinks.slice(0, 3) as social}
        <a href={social.url} target="_blank" rel="noreferrer"><small>{social.label}</small><b>{social.value}</b><span>↗</span></a>
      {/each}
    </div>
  </div>
  <div class="wrap footer-bottom">
    <div><b>{t.explore}</b><a href={localHref('/articles/', 'writing')}>{t.writings}</a><a href={localHref('/slides/', 'slides')}>{t.slides}</a><a href={localHref('/gallery/', 'gallery')}>{t.gallery}</a><a href={localHref('/resume/', 'resume')}>{t.resume}</a></div>
    <div><b>{t.follow}</b>{#each socialLinks as social}<a href={social.url} target="_blank" rel="noreferrer">{social.label} ↗</a>{/each}</div>
    <div class="footer-sign"><a href={locale === 'fa' ? '/' : `/${locale}/`} class="brand light"><b>{locale === 'fa' ? 'مهران ضیابری' : 'Mehran Ziabary'}</b><span>MEHRAN ZIABARY</span></a><p>{t.note}</p></div>
  </div>
  <div class="wrap footnote"><span>{t.copyright}</span><span>FA · EN · ES</span></div>
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
