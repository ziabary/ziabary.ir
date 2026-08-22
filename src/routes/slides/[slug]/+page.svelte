<script lang="ts">
  import PageSeo from '$lib/components/PageSeo.svelte';
  export let data;
  $: item = data.presentation;
  const faNumber = (value: number) => value.toLocaleString('fa-IR');

  const copy = {
    fa: { share: 'اشتراک‌گذاری', copy: 'کپی لینک', copied: 'لینک کپی شد' },
    en: { share: 'Share', copy: 'Copy link', copied: 'Link copied' },
    es: { share: 'Compartir', copy: 'Copiar enlace', copied: 'Enlace copiado' }
  } as const;

  let copied = false;
  let resetTimer: ReturnType<typeof setTimeout>;

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
  title={`${item.title} | مهران ضیابری`}
  description={item.summary}
  path={`/slides/${item.slug}/`}
  image={item.cover ?? '/slides/enterprise-ai-governance-dba/cover.jpg'}
  imageAlt={`اسلاید نخست ارائه ${item.title}`}
  imageWidth={1600}
  imageHeight={900}
/>

<main>
  <section class="course-hero">
    <div class="wrap">
      <p class="eyebrow">اسلایدها / {item.kind}</p>
      <h1>{item.title}</h1>
      <p>{item.summary}</p>
    </div>
  </section>

  <section class="wrap presentation-layout">
    <div>
      <div class:empty={!item.cover} class="presentation-cover">
        {#if item.cover}
          <img src={item.cover} alt="اسلاید نخست ارائه «{item.title}»" />
        {:else}
          <span>{faNumber(item.slideCount)}</span>
          <small>اسلاید · cover.webp را اضافه کنید</small>
        {/if}
      </div>
      <p class="description">{item.description}</p>
      <p class="eyebrow">سرفصل‌ها</p>
      <ol>{#each item.topics as topic, index}<li><span>{faNumber(index + 1)}</span><b>{topic}</b></li>{/each}</ol>
    </div>

    <aside>
      <h2>شناسنامه ارائه</h2>
      <dl>
        <div><dt>نوع</dt><dd>{item.kind}</dd></div>
        <div><dt>تاریخ</dt><dd>{item.presentedAt}</dd></div>
        <div><dt>محل</dt><dd>{item.venue}</dd></div>
        {#if item.event}<div><dt>رویداد</dt><dd>{item.event}</dd></div>{/if}
        {#if item.organizer}<div><dt>برگزارکننده</dt><dd>{item.organizer}</dd></div>{/if}
        {#if item.audience}<div><dt>مخاطب</dt><dd>{item.audience}</dd></div>{/if}
        {#if item.duration}<div><dt>مدت</dt><dd>{item.duration}</dd></div>{/if}
        <div><dt>تعداد</dt><dd>{faNumber(item.slideCount)} اسلاید</dd></div>
        {#if item.version}<div><dt>نسخه</dt><dd>{item.version}</dd></div>{/if}
      </dl>
      <div class="share-actions" aria-label="اشتراک‌گذاری ارائه">
        <button type="button" class="share-button" onclick={sharePresentation}>
          <i class="fa-solid fa-share-nodes" aria-hidden="true"></i>
          <span>{copy.fa.share}</span>
        </button>
        <button type="button" class="share-button" class:copied={copied} onclick={copyLink}>
          <i class={copied ? 'fa-solid fa-check' : 'fa-solid fa-link'} aria-hidden="true"></i>
          <span>{copied ? copy.fa.copied : copy.fa.copy}</span>
        </button>
      </div>
      {#if item.pdf}
        <a class="button primary" href={item.pdf} target="_blank" rel="noreferrer">دریافت فایل PDF</a>
      {:else}
        <p class="file-note">فایل PDF هنوز برای این ارائه افزوده نشده است.</p>
      {/if}
    </aside>
  </section>
</main>

<style>
  .presentation-layout{display:grid;grid-template-columns:minmax(0,1fr) 330px;gap:50px;padding:55px 0 90px}.presentation-cover{aspect-ratio:16/9;overflow:hidden;border-radius:18px;border:1px solid var(--line);background:var(--surface)}.presentation-cover img{width:100%;height:100%;object-fit:cover}.presentation-cover.empty{display:flex;flex-direction:column;align-items:center;justify-content:center}.presentation-cover span{font-size:54px;font-weight:800}.presentation-cover small,.description,.file-note,dt{color:var(--muted)}.description{line-height:2;margin:28px 0 42px}.presentation-layout ol{list-style:none;padding:0}.presentation-layout li{display:flex;gap:15px;padding:14px 0;border-top:1px solid var(--line)}.presentation-layout li span{color:var(--teal);min-width:28px}.presentation-layout aside{border:1px solid var(--line);border-radius:18px;padding:25px;height:max-content}.presentation-layout aside h2{margin-top:0}.presentation-layout dl{margin:0 0 24px}.presentation-layout dl div{padding:12px 0;border-top:1px solid var(--line)}.presentation-layout dt{font-size:11px}.presentation-layout dd{margin:4px 0 0}.presentation-layout .button{display:block;text-align:center}.presentation-layout .share-actions{display:flex;flex-wrap:wrap;gap:10px;margin:0 0 18px}.presentation-layout .share-button{display:inline-flex;align-items:center;justify-content:center;gap:8px;width:100%;padding:11px 14px;border-radius:12px;border:1px solid var(--line);background:var(--surface);color:inherit;cursor:pointer}.presentation-layout .share-button.copied{border-color:var(--teal);color:var(--teal)}.file-note{font-size:12px;line-height:1.8}@media(max-width:820px){.presentation-layout{grid-template-columns:1fr}.presentation-layout aside{order:-1}}
</style>
