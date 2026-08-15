<script lang="ts">
  export let data;
  $: item = data.presentation;
  const faNumber = (value: number) => value.toLocaleString('fa-IR');
</script>

<svelte:head><title>{item.title} | مهران ضیابری</title></svelte:head>

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
      {#if item.pdf}
        <a class="button primary" href={item.pdf} target="_blank" rel="noreferrer">دریافت فایل PDF</a>
      {:else}
        <p class="file-note">فایل PDF هنوز برای این ارائه افزوده نشده است.</p>
      {/if}
    </aside>
  </section>
</main>

<style>
  .presentation-layout{display:grid;grid-template-columns:minmax(0,1fr) 330px;gap:50px;padding:55px 0 90px}.presentation-cover{aspect-ratio:16/9;overflow:hidden;border-radius:18px;border:1px solid var(--line);background:var(--surface)}.presentation-cover img{width:100%;height:100%;object-fit:cover}.presentation-cover.empty{display:flex;flex-direction:column;align-items:center;justify-content:center}.presentation-cover span{font-size:54px;font-weight:800}.presentation-cover small,.description,.file-note,dt{color:var(--muted)}.description{line-height:2;margin:28px 0 42px}.presentation-layout ol{list-style:none;padding:0}.presentation-layout li{display:flex;gap:15px;padding:14px 0;border-top:1px solid var(--line)}.presentation-layout li span{color:var(--teal);min-width:28px}.presentation-layout aside{border:1px solid var(--line);border-radius:18px;padding:25px;height:max-content}.presentation-layout aside h2{margin-top:0}.presentation-layout dl{margin:0 0 24px}.presentation-layout dl div{padding:12px 0;border-top:1px solid var(--line)}.presentation-layout dt{font-size:11px}.presentation-layout dd{margin:4px 0 0}.presentation-layout .button{display:block;text-align:center}.file-note{font-size:12px;line-height:1.8}@media(max-width:820px){.presentation-layout{grid-template-columns:1fr}.presentation-layout aside{order:-1}}
</style>
