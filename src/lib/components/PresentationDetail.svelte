<script lang="ts">
  import PageSeo from '$lib/components/PageSeo.svelte';
  import { onDestroy } from 'svelte';
  import { localizePresentation, type Presentation, type PresentationLocale } from '$lib/presentations';
  import { presentationCopy } from '$lib/presentation-copy';

  export let presentation: Presentation;
  export let locale: PresentationLocale = 'fa';
  $: item = localizePresentation(presentation, locale);
  $: copy = presentationCopy[locale];
  $: numbers = new Intl.NumberFormat(locale === 'fa' ? 'fa-IR' : locale);
  $: base = locale === 'fa' ? '' : `/${locale}`;

  let copied = false;
  let resetTimer: ReturnType<typeof setTimeout>;

  onDestroy(() => clearTimeout(resetTimer));

  async function copyLink() {
    const url = window.location.href;

    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const input = document.createElement('textarea');
      input.value = url;
      input.setAttribute('readonly', '');
      input.style.position = 'fixed';
      input.style.opacity = '0';
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      input.remove();
    }

    copied = true;
    clearTimeout(resetTimer);
    resetTimer = setTimeout(() => (copied = false), 2200);
  }

  async function sharePresentation() {
    if (navigator.share) {
      try {
        await navigator.share({ title: item.title, text: item.summary, url: window.location.href });
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') return;
      }
    }

    await copyLink();
  }
</script>

<PageSeo
  {locale}
  title={`${item.title} | ${copy.name}`}
  description={item.summary}
  path={`${base}/slides/${item.slug}/`}
  image={item.cover ?? '/slides/enterprise-ai-governance-dba/cover.jpg'}
  imageAlt={`${copy.cover} «${item.title}»`}
  imageWidth={1600}
  imageHeight={900}
/>

<main dir={locale === 'fa' ? 'rtl' : 'ltr'}>
  <section class="course-hero">
    <div class="wrap">
      <p class="eyebrow"><a href={`${base}/slides/`}>{copy.title}</a> / {item.kind}</p>
      <h1>{item.title}</h1>
      <p>{item.summary}</p>
    </div>
  </section>

  <section class="wrap presentation-layout">
    <div>
      <div class:empty={!item.cover} class="presentation-cover">
        {#if item.cover}
          <img src={item.cover} alt={`${copy.cover} «${item.title}»`} width="1600" height="900" />
        {:else}
          <span>{numbers.format(item.slideCount)}</span>
          <small>{copy.slides}</small>
        {/if}
      </div>
      <p class="description">{item.description}</p>
      {#if item.topics.length}
        <h2 class="eyebrow">{copy.topics}</h2>
        <ol>{#each item.topics as topic, index}<li><span>{numbers.format(index + 1)}</span><b>{topic}</b></li>{/each}</ol>
      {/if}
    </div>

    <aside>
      <h2>{copy.facts}</h2>
      <dl>
        <div><dt>{copy.kind}</dt><dd>{item.kind}</dd></div>
        <div><dt>{copy.date}</dt><dd>{item.presentedAt}</dd></div>
        <div><dt>{copy.venue}</dt><dd>{item.venue}</dd></div>
        {#if item.event}<div><dt>{copy.event}</dt><dd>{item.event}</dd></div>{/if}
        {#if item.organizer}<div><dt>{copy.organizer}</dt><dd>{item.organizer}</dd></div>{/if}
        {#if item.audience}<div><dt>{copy.audience}</dt><dd>{item.audience}</dd></div>{/if}
        {#if item.duration}<div><dt>{copy.duration}</dt><dd>{item.duration}</dd></div>{/if}
        <div><dt>{copy.count}</dt><dd>{numbers.format(item.slideCount)} {copy.slides}</dd></div>
        {#if item.version}<div><dt>{copy.version}</dt><dd>{item.version}</dd></div>{/if}
      </dl>
      <div class="share-actions" aria-label={copy.shareLabel}>
        <button type="button" class="share-button" onclick={sharePresentation}>
          <i class="fa-solid fa-share-nodes" aria-hidden="true"></i>
          <span>{copy.share}</span>
        </button>
        <button type="button" class="share-button" class:copied={copied} onclick={copyLink}>
          <i class={copied ? 'fa-solid fa-check' : 'fa-solid fa-link'} aria-hidden="true"></i>
          <span>{copied ? copy.copied : copy.copy}</span>
        </button>
      </div>
      {#if copy.languageNote}
        <section class="slide-language-note" aria-labelledby="slide-language-title">
          <h3 id="slide-language-title">{copy.languageTitle}</h3>
          <p>{copy.languageNote}</p>
        </section>
      {/if}
      {#if item.pdf}
        <a class="button primary" href={item.pdf} hreflang="fa" type="application/pdf" target="_blank" rel="noreferrer">{copy.download}</a>
      {:else}
        <p class="file-note">{copy.noFile}</p>
      {/if}
    </aside>
  </section>
</main>

<style>
  .slide-language-note { border-top: 1px solid var(--line); padding-top: 18px; margin-bottom: 20px; }
  .slide-language-note h3 { color: var(--teal); font-size: 14px; margin: 0 0 8px; }
  .slide-language-note p { color: var(--muted); font-size: 12px; line-height: 1.8; margin: 0; }
  .course-hero .eyebrow a { color: inherit; }
  .share-button:focus-visible { outline: 2px solid var(--teal); outline-offset: 3px; }

  .presentation-layout{display:grid;grid-template-columns:minmax(0,1fr) 330px;gap:50px;padding:55px 0 90px}.presentation-cover{aspect-ratio:16/9;overflow:hidden;border-radius:18px;border:1px solid var(--line);background:var(--paper)}.presentation-cover img{width:100%;height:100%;object-fit:contain;display:block}.presentation-cover.empty{display:flex;flex-direction:column;align-items:center;justify-content:center}.presentation-cover span{font-size:54px;font-weight:800}.presentation-cover small,.description,.file-note,dt{color:var(--muted)}.description{line-height:2;margin:28px 0 42px}.presentation-layout ol{list-style:none;padding:0}.presentation-layout li{display:flex;gap:15px;padding:14px 0;border-top:1px solid var(--line)}.presentation-layout li span{color:var(--teal);min-width:28px}.presentation-layout aside{border:1px solid var(--line);border-radius:18px;padding:25px;height:max-content}.presentation-layout aside h2{margin-top:0}.presentation-layout dl{margin:0 0 24px}.presentation-layout dl div{padding:12px 0;border-top:1px solid var(--line)}.presentation-layout dt{font-size:11px}.presentation-layout dd{margin:4px 0 0}.presentation-layout .button{display:block;text-align:center}.presentation-layout .share-actions{display:flex;flex-wrap:wrap;gap:10px;margin:0 0 18px}.presentation-layout .share-button{display:inline-flex;align-items:center;justify-content:center;gap:8px;width:100%;padding:11px 14px;border-radius:12px;border:1px solid var(--line);background:var(--paper);color:inherit;cursor:pointer}.presentation-layout .share-button.copied{border-color:var(--teal);color:var(--teal)}.file-note{font-size:12px;line-height:1.8}@media(max-width:820px){.presentation-layout{grid-template-columns:1fr}.presentation-layout aside{order:-1}}
</style>
