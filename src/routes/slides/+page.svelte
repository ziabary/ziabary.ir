<script lang="ts">
  import PageHero from '$lib/components/PageHero.svelte';
  import { presentations } from '$lib/presentations';

  const faNumber = (value: number) => value.toLocaleString('fa-IR');
</script>

<svelte:head><title>اسلایدها و ارائه‌ها | مهران ضیابری</title></svelte:head>

<main>
  <PageHero
    eyebrow="سخنرانی، دوره و کارگاه"
    title="اسلایدها و ارائه‌ها"
    lead="شناسنامه و فایل ارائه‌ها؛ شامل موضوع، زمان و محل برگزاری، مخاطب، تعداد اسلاید و نسخه قابل دریافت."
  />

  <section class="wrap deck-list">
    {#each presentations as item}
      <a class="deck-card" href="/slides/{item.slug}/">
        <div class:empty={!item.cover} class="deck-cover">
          {#if item.cover}
            <img src={item.cover} alt="اسلاید نخست ارائه «{item.title}»" />
          {:else}
            <span>{faNumber(item.slideCount)}</span>
            <small>اسلاید · تصویر جلد را اضافه کنید</small>
          {/if}
        </div>
        <div class="deck-copy">
          <div class="deck-kicker">{item.kind} · {item.presentedAt}</div>
          <h2>{item.title}</h2>
          <p>{item.summary}</p>
          <dl>
            <div><dt>محل ارائه</dt><dd>{item.venue}</dd></div>
            {#if item.event}<div><dt>رویداد</dt><dd>{item.event}</dd></div>{/if}
            <div><dt>تعداد</dt><dd>{faNumber(item.slideCount)} اسلاید</dd></div>
          </dl>
          <b>مشاهده شناسنامه و فایل ارائه ←</b>
        </div>
      </a>
    {/each}
  </section>
</main>

<style>
  .deck-list{padding:52px 0 80px}.deck-card{display:grid;grid-template-columns:minmax(280px,42%) 1fr;gap:34px;padding:28px 0;border-top:1px solid var(--line);color:inherit;text-decoration:none}.deck-cover{aspect-ratio:16/9;overflow:hidden;border-radius:16px;background:var(--surface);border:1px solid var(--line)}.deck-cover img{width:100%;height:100%;object-fit:cover}.deck-cover.empty{display:flex;flex-direction:column;align-items:center;justify-content:center}.deck-cover span{font-size:48px;font-weight:800}.deck-cover small,.deck-kicker,dt{color:var(--muted)}.deck-copy h2{margin:7px 0 10px;font-size:clamp(24px,3vw,36px)}.deck-copy p{color:var(--muted);line-height:1.9}.deck-copy dl{display:flex;flex-wrap:wrap;gap:18px 30px;margin:18px 0}.deck-copy dl div{display:grid;gap:3px}.deck-copy dt{font-size:11px}.deck-copy dd{margin:0;font-size:13px}.deck-copy b{color:var(--teal);font-size:12px}@media(max-width:760px){.deck-card{grid-template-columns:1fr;gap:20px}}
</style>
