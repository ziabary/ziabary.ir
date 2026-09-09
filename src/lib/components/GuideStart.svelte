<script lang="ts">
  import { articleCount, type GuideCollection } from '$lib/guides';

  export let collection: GuideCollection;

  const numbers = new Intl.NumberFormat('fa-IR');
  const paths = [
    {
      id: 'gpu-comparison-table',
      title: 'هنوز GPU را انتخاب نکرده‌ام',
      description: 'مقایسهٔ حافظه، توان محاسباتی و محدودیت‌های استقرار',
      label: 'مقایسهٔ GPUها'
    },
    {
      id: 'pcie-gpu-server-selection',
      title: 'GPU مشخص است؛ سرور مناسب می‌خواهم',
      description: 'انتخاب شاسی، توپولوژی، برق و خنک‌کاری متناسب با کارت',
      label: 'انتخاب سرور مناسب'
    },
    {
      id: 'int8-or-fp8-real-gpu-support',
      title: 'پیش از خرید، سازگاری را بررسی می‌کنم',
      description: 'نسخهٔ مدل، قالب عددی و پشتیبانی واقعی کرنل',
      label: 'بررسی پشتیبانی نرم‌افزاری'
    }
  ];
  $: availablePaths = paths.filter((path) => collection.items.some((item) => item.id === path.id));
  $: tableCount = collection.items.filter((item) => item.kind === 'interactive').length;
</script>

{#snippet readingPaths()}
  <ol class="start-paths">
    {#each availablePaths as path, index}
      <li>
        <span class="path-number" aria-hidden="true">{numbers.format(index + 1).padStart(2, '۰')}</span>
        <div>
          <h3>{path.title}</h3>
          <p>{path.description}</p>
          <a href={`#${path.id}`}>{path.label} <span aria-hidden="true">←</span></a>
        </div>
      </li>
    {/each}
  </ol>
{/snippet}

<section class="guide-start" aria-labelledby="guide-start-title">
  <header>
    <small>راهنمای استفاده از مجموعه</small>
    <h2 id="guide-start-title">از کجا شروع کنیم؟</h2>
    <p>انتخاب را از بار کاری آغاز کنید؛ جدول‌ها برای مقایسه‌اند و راهنماها برای فهم تفاوت‌ها. مسیر متناسب با نیازتان را دنبال کنید.</p>
  </header>

  <nav class="desktop-paths" aria-label="مسیرهای پیشنهادی مطالعه">
    {@render readingPaths()}
  </nav>
  <details class="mobile-paths">
    <summary>مسیر مناسب من کدام است؟</summary>
    <nav aria-label="مسیرهای پیشنهادی مطالعه">
      {@render readingPaths()}
    </nav>
  </details>

  <footer aria-label="اطلاعات مجموعه">
    <span>{numbers.format(articleCount(collection))} مقالهٔ راهنما</span>
    <span>{numbers.format(tableCount)} جدول تعاملی</span>
    <span>به‌روزرسانی پیوسته</span>
  </footer>
</section>

<style>
  .guide-start { min-width: 0; align-self: start; padding: 28px; border: 1px solid var(--line); background: var(--soft); }
  header small { color: var(--teal); font-size: 11px; }
  h2 { margin: 12px 0 16px; font-size: 26px; line-height: 1.6; }
  header p { margin: 0; color: var(--muted); font-size: 14px; line-height: 2.1; }
  nav { display: block; position: static; inset: auto; width: 100%; margin: 0; padding: 0; border: 0; background: transparent; }
  .start-paths { list-style: none; margin: 24px 0 0; padding: 0; }
  .start-paths li { display: grid; grid-template-columns: 25px minmax(0, 1fr); gap: 12px; padding: 20px 0; border-top: 1px solid var(--line); }
  .path-number { padding-top: 3px; color: var(--teal); font-size: 12px; }
  h3 { margin: 0; font-size: 15px; line-height: 1.9; }
  li p { margin: 8px 0; color: var(--muted); font-size: 12px; line-height: 2; }
  li a { display: inline-block; white-space: normal; padding-block: 6px; color: var(--teal); font-size: 12px; font-weight: 700; }
  a:hover { text-decoration: underline; text-underline-offset: 4px; }
  a:focus-visible, summary:focus-visible { outline: 2px solid var(--teal); outline-offset: 5px; border-radius: 2px; }
  footer { display: flex; flex-wrap: wrap; gap: 12px 20px; margin: 4px 0 0; padding: 20px 0 0; background: transparent; border-top: 1px solid var(--line); color: var(--muted); font-size: 11px; line-height: 1.9; }
  .mobile-paths { display: none; }
  @media (max-width: 700px) {
    .guide-start { padding: 22px; }
    h2 { font-size: 23px; }
    .desktop-paths { display: none; }
    .mobile-paths { display: block; margin-top: 22px; border-top: 1px solid var(--line); }
    summary { padding-block: 15px; color: var(--teal); cursor: pointer; font-size: 13px; font-weight: 700; }
    .mobile-paths .start-paths { margin-top: 0; }
    footer { justify-content: space-between; margin-top: 18px; border-top: 0; padding-top: 0; }
  }
</style>
