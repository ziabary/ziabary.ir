<script lang="ts">
  export let onNavigate: (id: string) => void = () => {};

  const paths = [
    { question: 'تفاوت کارت‌های عمومی، حرفه‌ای و دیتاسنتری', links: [{ id: 'gpu-types-for-ai', label: 'انواع GPU برای هوش مصنوعی' }] },
    { question: 'معیار انتخاب و مقایسهٔ گزینه‌ها', links: [{ id: 'choosing-gpu-for-ai', label: 'راهنمای انتخاب' }, { id: 'gpu-comparison-table', label: 'جدول GPUها' }] },
    { question: 'اثر دقت عددی و پشتیبانی نرم‌افزاری', links: [{ id: 'int8-or-fp8-real-gpu-support', label: 'INT8 و FP8 در عمل' }] },
    { question: 'سرعت پاسخ و ظرفیت سرویس‌دهی', links: [{ id: 'gpu-inference-latency-throughput', label: 'تأخیر و توان عملیاتی' }] },
    { question: 'تفاوت اتصال‌ها و سکوهای چند GPU', links: [{ id: 'pcie-vs-sxm-for-ai', label: 'PCIe و SXM' }, { id: 'dgx-and-standard-gpu-servers', label: 'DGX و HGX' }] },
    { question: 'سرور و اجزای مناسب برای GPU', links: [{ id: 'pcie-gpu-server-selection', label: 'راهنمای سرور' }, { id: 'server-comparison-table', label: 'جدول سرورها' }] }
  ];
</script>

<section id="gpu-quick-selection" class="reading-guide" aria-labelledby="guide-start-title">
  <h2 id="guide-start-title">راهنمای مطالعه</h2>
  <p>در این راهنما می‌توانید ابتدا معیارهای انتخاب را بشناسید، سپس مشخصات GPUها را مقایسه کنید و در ادامه، سرور متناسب با انتخاب خود را بررسی کنید. جدول‌های تعاملی برای مقایسهٔ جزئیات هستند و مقاله‌ها توضیح می‌دهند هر تفاوت فنی چه اثری بر عملکرد، محدودیت‌ها و هزینه دارد.</p>
  <div class="reading-table">
    <table>
      <thead><tr><th scope="col">چه چیزی را می‌خواهید مشخص کنید؟</th><th scope="col">مسیر پیشنهادی</th></tr></thead>
      <tbody>
        {#each paths as path}
          <tr>
            <th scope="row">{path.question}</th>
            <td><div class="reading-links">{#each path.links as link, index}{#if index}<span class="separator" aria-hidden="true"> · </span>{/if}<a href={`#${link.id}`} onclick={() => onNavigate(link.id)}>{link.label}</a>{/each}</div></td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</section>

<style>
  .reading-guide{width:min(1280px,calc(100% - 48px));margin:32px auto 0;scroll-margin-top:110px}
  h2{margin:0 0 12px;font-size:24px;line-height:1.7}
  p{margin:0 0 20px;color:color-mix(in srgb,var(--ink) 85%,var(--muted));font-size:16px;line-height:1.9}
  .reading-table{min-width:0}
  table{width:100%;table-layout:fixed;border-collapse:collapse;font-size:16px;line-height:1.9}
  th,td{padding:12px 16px;text-align:start;vertical-align:top;border:0;border-bottom:1px solid var(--line)}
  th:first-child{width:55%;padding-inline-start:0}
  td{padding-inline-end:0}
  thead th{font-weight:600;color:var(--muted);font-size:14px;border-top:1px solid var(--line)}
  tbody th{font-weight:400}
  .reading-links{display:flex;flex-wrap:wrap;align-items:baseline;gap:6px 12px}
  a{color:var(--link-ink);text-decoration:underline;text-underline-offset:4px;text-decoration-color:color-mix(in srgb,var(--link-ink) 35%,transparent)}
  a:hover{text-decoration-color:currentColor}
  a:focus-visible{outline:2px solid var(--teal);outline-offset:4px;border-radius:2px}
  .separator{color:var(--muted)}
  @media(max-width:959px){.reading-guide{width:calc(100% - 32px)}}
  @media(max-width:600px){
    table,tbody,tr,th,td{display:block;width:100%;box-sizing:border-box}
    thead{display:none}
    tbody tr{padding:12px 0;border-bottom:1px solid var(--line)}
    tbody tr:first-child{border-top:1px solid var(--line)}
    th:first-child{width:100%;padding:0 0 6px;font-weight:600}
    th,td{padding:0;border:0}
    table{font-size:15px}
    h2{font-size:22px}
  }
</style>
