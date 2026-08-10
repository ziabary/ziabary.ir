<script lang="ts">
  import serverDataJson from '$lib/server-data';

  type Compatibility = {
    categoryId: string;
    categoryLabel: string;
    maxGpuCount: number | null;
    maxGpuCountRaw?: string | null;
    pcieGeneration: number | null;
    compatibilityFlagRaw: string | null;
    documentPriceRaw: string | null;
    documentPriceUsd: number | null;
  };

  type ServerRecord = {
    id: string;
    maker: string;
    model: string;
    cpu: string | null;
    memorySlotsOrCapacity: string | null;
    network: string | null;
    powerSupplies: string | null;
    height: string | null;
    heightU: number | null;
    otherFeatures: string | null;
    sourceUrl: string | null;
    sourceBasis: string;
    compatibility: Compatibility[];
  };

  type ColumnKey = 'categories' | 'cpu' | 'memory' | 'network' | 'power' | 'height' | 'gpuCount' | 'pcie' | 'price' | 'source';
  type SortKey = 'model' | 'maker' | 'height' | 'gpuCount' | 'pcie' | 'price';

  const serverData = serverDataJson as {
    meta: { recordCount: number; sourceLastReviewedFa: string; warning: string };
    categories: { id: string; label: string }[];
    records: ServerRecord[];
  };

  const columns: { key: ColumnKey; label: string; sortable?: SortKey; width: string }[] = [
    { key: 'categories', label: 'سازگاری GPU', width: '210px' },
    { key: 'cpu', label: 'پردازنده', width: '155px' },
    { key: 'memory', label: 'حافظه/اسلات', width: '120px' },
    { key: 'network', label: 'شبکه', width: '190px' },
    { key: 'power', label: 'پاور', width: '135px' },
    { key: 'height', label: 'ارتفاع', sortable: 'height', width: '90px' },
    { key: 'gpuCount', label: 'بیشینه GPU', sortable: 'gpuCount', width: '105px' },
    { key: 'pcie', label: 'نسل PCIe', sortable: 'pcie', width: '95px' },
    { key: 'price', label: 'قیمت سند', sortable: 'price', width: '120px' },
    { key: 'source', label: 'منبع', width: '100px' }
  ];

  const fa = new Intl.NumberFormat('fa-IR');
  let query = '';
  let category = 'all';
  let maker = 'all';
  let sortKey: SortKey = 'gpuCount';
  let sortDirection: 'asc' | 'desc' = 'desc';
  let hiddenColumns: ColumnKey[] = [];
  let compared: string[] = [];
  let expanded: string[] = [];

  const makers = Array.from(new Set(serverData.records.map((record) => record.maker))).sort((a, b) => a.localeCompare(b));

  function maxGpu(record: ServerRecord) {
    const values = record.compatibility.map((profile) => profile.maxGpuCount).filter((value): value is number => value !== null);
    return values.length ? Math.max(...values) : null;
  }

  function maxPcie(record: ServerRecord) {
    const values = record.compatibility.map((profile) => profile.pcieGeneration).filter((value): value is number => value !== null);
    return values.length ? Math.max(...values) : null;
  }

  function minPrice(record: ServerRecord) {
    const values = record.compatibility.map((profile) => profile.documentPriceUsd).filter((value): value is number => value !== null);
    return values.length ? Math.min(...values) : null;
  }

  function sortValue(record: ServerRecord, key: SortKey): string | number {
    if (key === 'model') return record.model;
    if (key === 'maker') return record.maker;
    if (key === 'height') return record.heightU ?? -1;
    if (key === 'gpuCount') return maxGpu(record) ?? -1;
    if (key === 'pcie') return maxPcie(record) ?? -1;
    return minPrice(record) ?? -1;
  }

  function changeSort(key: SortKey) {
    if (sortKey === key) sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    else {
      sortKey = key;
      sortDirection = key === 'model' || key === 'maker' ? 'asc' : 'desc';
    }
  }

  function sortMark(key?: SortKey) {
    if (!key || sortKey !== key) return '—';
    return sortDirection === 'asc' ? '↑' : '↓';
  }

  function hideColumn(key: ColumnKey) {
    hiddenColumns = [...hiddenColumns, key];
  }

  function restoreColumn(key: ColumnKey) {
    hiddenColumns = hiddenColumns.filter((item) => item !== key);
  }

  function toggleCompare(id: string) {
    if (compared.includes(id)) compared = compared.filter((item) => item !== id);
    else if (compared.length < 4) compared = [...compared, id];
  }

  function toggleDetails(id: string) {
    expanded = expanded.includes(id) ? expanded.filter((item) => item !== id) : [...expanded, id];
  }

  function categories(record: ServerRecord) {
    return record.compatibility.map((profile) => profile.categoryLabel).join('، ');
  }

  function formatProfile(profile: Compatibility) {
    const parts = [
      profile.maxGpuCountRaw ? `تا ${profile.maxGpuCountRaw} GPU` : profile.maxGpuCount ? `تا ${fa.format(profile.maxGpuCount)} GPU` : null,
      profile.pcieGeneration ? `PCIe ${fa.format(profile.pcieGeneration)}` : null,
      profile.compatibilityFlagRaw ? `پرچم خام سند: ${profile.compatibilityFlagRaw}` : null,
      profile.documentPriceRaw ? `قیمت سند: ${profile.documentPriceRaw}` : null
    ].filter(Boolean);
    return parts.length ? parts.join(' · ') : 'در سند ذکر شده؛ جزئیات عددی درج نشده است';
  }

  function cellValue(record: ServerRecord, key: ColumnKey) {
    if (key === 'categories') return categories(record);
    if (key === 'cpu') return record.cpu ?? 'اعلام‌نشده';
    if (key === 'memory') return record.memorySlotsOrCapacity ?? 'اعلام‌نشده';
    if (key === 'network') return record.network ?? 'اعلام‌نشده';
    if (key === 'power') return record.powerSupplies ?? 'اعلام‌نشده';
    if (key === 'height') return record.height ?? 'اعلام‌نشده';
    if (key === 'gpuCount') return maxGpu(record) === null ? 'اعلام‌نشده' : fa.format(maxGpu(record)!);
    if (key === 'pcie') return maxPcie(record) === null ? 'وابسته به پلتفرم' : `Gen ${fa.format(maxPcie(record)!)}`;
    if (key === 'price') return minPrice(record) === null ? 'نامعلوم' : `$${fa.format(minPrice(record)!)}`;
    return record.sourceUrl ? 'پیوند سازنده' : 'پیوند ندارد';
  }

  $: visibleColumns = columns.filter((column) => !hiddenColumns.includes(column.key));
  $: filtered = serverData.records
    .filter((record) => {
      const needle = query.trim().toLocaleLowerCase('fa');
      const text = `${record.maker} ${record.model} ${record.cpu ?? ''} ${categories(record)}`.toLocaleLowerCase('fa');
      return (!needle || text.includes(needle))
        && (maker === 'all' || record.maker === maker)
        && (category === 'all' || record.compatibility.some((profile) => profile.categoryId === category));
    })
    .sort((a, b) => {
      const av = sortValue(a, sortKey);
      const bv = sortValue(b, sortKey);
      const result = typeof av === 'number' && typeof bv === 'number' ? av - bv : String(av).localeCompare(String(bv), 'fa');
      return sortDirection === 'asc' ? result : -result;
    });
  $: comparison = compared.map((id) => serverData.records.find((record) => record.id === id)).filter(Boolean) as ServerRecord[];
  $: comparisonRows = [
    { group: 'هویت', label: 'سازنده', values: comparison.map((record) => record.maker) },
    { group: 'هویت', label: 'مدل', values: comparison.map((record) => record.model) },
    { group: 'پلتفرم', label: 'پردازنده', values: comparison.map((record) => record.cpu ?? 'اعلام‌نشده') },
    { group: 'پلتفرم', label: 'حافظه/اسلات', values: comparison.map((record) => record.memorySlotsOrCapacity ?? 'اعلام‌نشده') },
    { group: 'پلتفرم', label: 'شبکه', values: comparison.map((record) => record.network ?? 'اعلام‌نشده') },
    { group: 'پلتفرم', label: 'پاور', values: comparison.map((record) => record.powerSupplies ?? 'اعلام‌نشده') },
    { group: 'پلتفرم', label: 'ارتفاع', values: comparison.map((record) => record.height ?? 'اعلام‌نشده') },
    { group: 'پلتفرم', label: 'سایر ویژگی‌ها', values: comparison.map((record) => record.otherFeatures ?? 'اعلام‌نشده') },
    { group: 'سازگاری', label: 'همهٔ خانواده‌ها', values: comparison.map((record) => categories(record)) },
    { group: 'سازگاری', label: 'بیشینهٔ GPU', values: comparison.map((record) => maxGpu(record) === null ? 'اعلام‌نشده' : fa.format(maxGpu(record)!)) },
    { group: 'سازگاری', label: 'بالاترین نسل PCIe', values: comparison.map((record) => maxPcie(record) === null ? 'وابسته به پلتفرم' : `Gen ${fa.format(maxPcie(record)!)}`) },
    ...serverData.categories.map((item) => ({
      group: 'پروفایل‌های سند',
      label: item.label,
      values: comparison.map((record) => {
        const profile = record.compatibility.find((candidate) => candidate.categoryId === item.id);
        return profile ? formatProfile(profile) : 'در این گروه سند نیامده است';
      })
    })),
    { group: 'منبع', label: 'مبنای داده', values: comparison.map((record) => record.sourceBasis) },
    { group: 'منبع', label: 'پیوند محصول', values: comparison.map((record) => record.sourceUrl ?? 'پیوند ندارد') }
  ];
</script>

<section class="server-comparison" dir="rtl" aria-labelledby="server-table-title">
  <header class="intro">
    <div>
      <small>جدول تعاملی سرورهای GPU</small>
      <h2 id="server-table-title">سرور را با کارت، شاسی، توان و مسیر هوا انتخاب کنید</h2>
      <p>داده‌های این جدول مستقیماً از شش جدول سند استخراج شده‌اند. هر مدل یک‌بار نمایش داده می‌شود و سازگاری‌های چندگانهٔ آن در شناسنامه و مقایسه حفظ می‌شوند.</p>
    </div>
    <div class="source-warning"><b>مرز اعتبار داده</b><span>بازبینی سند: {serverData.meta.sourceLastReviewedFa}</span><p>{serverData.meta.warning}</p></div>
  </header>

  <div class="filters" aria-label="فیلتر سرورها">
    <label><span>جست‌وجو</span><input bind:value={query} placeholder="سازنده، مدل یا پردازنده" /></label>
    <label><span>خانوادهٔ GPU</span><select bind:value={category}><option value="all">همهٔ خانواده‌ها</option>{#each serverData.categories as item}<option value={item.id}>{item.label}</option>{/each}</select></label>
    <label><span>سازنده</span><select bind:value={maker}><option value="all">همهٔ سازندگان</option>{#each makers as item}<option value={item}>{item}</option>{/each}</select></label>
  </div>

  <div class="summary" aria-live="polite">
    <div><small>نتیجه</small><b>{fa.format(filtered.length)}</b><span>از {fa.format(serverData.records.length)} مدل</span></div>
    <div><small>انتخاب برای مقایسه</small><b>{fa.format(compared.length)}</b><span>حداکثر ۴ سرور</span></div>
    <div><small>ستون‌های پنهان</small><b>{fa.format(hiddenColumns.length)}</b><span>قابل بازگردانی</span></div>
  </div>

  {#if hiddenColumns.length}
    <div class="restore" aria-label="بازگردانی ستون‌ها"><span>ستون‌های پنهان:</span>{#each hiddenColumns as key}<button type="button" on:click={() => restoreColumn(key)}>+ {columns.find((column) => column.key === key)?.label}</button>{/each}</div>
  {/if}

  {#if comparison.length}
    <div class="compare-shell" role="region" aria-label="مقایسهٔ کامل سرورها">
      <div class="compare-head"><div><small>مقایسهٔ کامل</small><h3>{fa.format(comparison.length)} سرور کنار هم</h3></div><button type="button" on:click={() => compared = []}>پاک‌کردن انتخاب‌ها</button></div>
      <div class="compare-scroll">
        <table class="compare-table">
          <thead><tr><th>مشخصه</th>{#each comparison as record}<th>{record.maker}<strong>{record.model}</strong></th>{/each}</tr></thead>
          <tbody>
            {#each comparisonRows as row, index}
              {#if index === 0 || comparisonRows[index - 1].group !== row.group}<tr class="group-row"><th colspan={comparison.length + 1}>{row.group}</th></tr>{/if}
              <tr><th>{row.label}</th>{#each row.values as value}<td>{value}</td>{/each}</tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  {/if}

  <div class="table-scroll" role="region" aria-label="جدول سرورها">
    <table class="server-table">
      <thead>
        <tr>
          <th class="sticky compare-column">مقایسه</th>
          <th class="sticky details-column">جزئیات</th>
          <th class="sticky model-column"><button class="sort-button" type="button" on:click={() => changeSort('model')}>مدل <span>{sortMark('model')}</span></button></th>
          {#each visibleColumns as column}
            <th style={`min-width:${column.width}`}>
              <div class="column-head">
                {#if column.sortable}<button class="sort-button" type="button" on:click={() => changeSort(column.sortable!)}>{column.label} <span>{sortMark(column.sortable)}</span></button>{:else}<span>{column.label} <i>—</i></span>{/if}
                <button class="hide-button" type="button" aria-label={`پنهان‌کردن ستون ${column.label}`} title={`پنهان‌کردن ${column.label}`} on:click={() => hideColumn(column.key)}>×</button>
              </div>
            </th>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each filtered as record}
          <tr class:selected={compared.includes(record.id)}>
            <td class="sticky compare-column"><input type="checkbox" aria-label={`افزودن ${record.model} به مقایسه`} checked={compared.includes(record.id)} disabled={!compared.includes(record.id) && compared.length >= 4} on:change={() => toggleCompare(record.id)} /></td>
            <td class="sticky details-column"><button type="button" class="details-button" aria-expanded={expanded.includes(record.id)} on:click={() => toggleDetails(record.id)}>{expanded.includes(record.id) ? 'بستن' : 'بازکردن'}</button></td>
            <th class="sticky model-column" scope="row"><small>{record.maker}</small><strong>{record.model}</strong></th>
            {#each visibleColumns as column}
              <td>
                {#if column.key === 'source' && record.sourceUrl}<a href={record.sourceUrl} target="_blank" rel="noreferrer">پیوند محصول ↗</a>{:else}{cellValue(record, column.key)}{/if}
              </td>
            {/each}
          </tr>
          {#if expanded.includes(record.id)}
            <tr class="detail-row"><td colspan={visibleColumns.length + 3}>
              <div class="detail-grid">
                <section><small>پلتفرم</small><dl><div><dt>پردازنده</dt><dd>{record.cpu ?? 'اعلام‌نشده'}</dd></div><div><dt>حافظه/اسلات</dt><dd>{record.memorySlotsOrCapacity ?? 'اعلام‌نشده'}</dd></div><div><dt>شبکه</dt><dd>{record.network ?? 'اعلام‌نشده'}</dd></div><div><dt>پاور</dt><dd>{record.powerSupplies ?? 'اعلام‌نشده'}</dd></div><div><dt>ارتفاع</dt><dd>{record.height ?? 'اعلام‌نشده'}</dd></div><div><dt>ویژگی‌ها</dt><dd>{record.otherFeatures ?? 'اعلام‌نشده'}</dd></div></dl></section>
                <section><small>پروفایل‌های سازگاری سند</small>{#each record.compatibility as profile}<article><b>{profile.categoryLabel}</b><p>{formatProfile(profile)}</p></article>{/each}</section>
                <section><small>منبع و محدودیت</small><p>{record.sourceBasis}</p>{#if record.sourceUrl}<a href={record.sourceUrl} target="_blank" rel="noreferrer">مشاهدهٔ مرجع محصول ↗</a>{/if}</section>
              </div>
            </td></tr>
          {/if}
        {/each}
      </tbody>
    </table>
  </div>
</section>

<style>
  .server-comparison { color: var(--ink, #191919); font-family: inherit; }
  .intro { display: grid; grid-template-columns: minmax(0, 1fr) 320px; gap: 28px; align-items: end; margin-bottom: 24px; }
  .intro small, .filters span, .summary small, .detail-grid small, .compare-head small { color: var(--muted, #777); font-size: 10px; }
  .intro h2 { margin: 7px 0 10px; font-size: clamp(24px, 3vw, 40px); line-height: 1.35; }
  .intro p { margin: 0; color: var(--muted, #666); line-height: 1.9; }
  .source-warning { padding: 18px; border: 1px solid var(--line, #ddd); background: var(--surface, #fafafa); }
  .source-warning span { display: block; margin: 5px 0; color: var(--muted, #777); font-size: 11px; }
  .source-warning p { font-size: 12px; line-height: 1.75; }
  .filters { display: grid; grid-template-columns: 1.4fr 1fr 1fr; gap: 12px; margin-block: 18px; }
  .filters label { display: grid; gap: 7px; }
  input, select, button { font: inherit; }
  .filters input, .filters select { width: 100%; box-sizing: border-box; min-height: 44px; border: 1px solid var(--line, #ddd); padding: 8px 11px; color: inherit; background: var(--surface, #fff); }
  .summary { display: grid; grid-template-columns: repeat(3, 1fr); border: 1px solid var(--line, #ddd); margin-bottom: 12px; }
  .summary > div { display: grid; gap: 2px; padding: 13px 16px; border-inline-end: 1px solid var(--line, #ddd); }
  .summary > div:last-child { border-inline-end: 0; }
  .summary b { font-size: 22px; }
  .summary span { color: var(--muted, #777); font-size: 11px; }
  .restore { display: flex; flex-wrap: wrap; gap: 7px; align-items: center; margin: 10px 0; color: var(--muted, #777); font-size: 11px; }
  .restore button, .compare-head button { border: 1px solid var(--line, #ddd); background: var(--surface, #fff); color: inherit; padding: 6px 10px; cursor: pointer; }
  .table-scroll, .compare-scroll { max-width: 100%; overflow: auto; border: 1px solid var(--line, #ddd); scrollbar-gutter: stable; }
  table { border-collapse: separate; border-spacing: 0; }
  .server-table { min-width: 1500px; width: 100%; font-size: 12px; }
  th, td { padding: 11px 10px; border-block-end: 1px solid var(--line, #e1e1e1); border-inline-end: 1px solid var(--line, #e1e1e1); text-align: right; vertical-align: top; background: var(--surface, #fff); line-height: 1.65; }
  thead th { position: sticky; top: 0; z-index: 5; background: var(--surface-strong, #f2f2f2); white-space: nowrap; }
  tbody tr:hover > :not(.detail-row td) { background: var(--surface-hover, #f8f8f8); }
  tbody tr.selected > td, tbody tr.selected > th { background: var(--accent-soft, #eef4f2); }
  .sticky { position: sticky; z-index: 4; }
  thead .sticky { z-index: 8; }
  .compare-column { right: 0; width: 54px; min-width: 54px; text-align: center; }
  .details-column { right: 74px; width: 72px; min-width: 72px; text-align: center; }
  .model-column { right: 166px; width: 220px; min-width: 220px; box-shadow: -7px 0 10px -11px #000; }
  .model-column small { display: block; color: var(--muted, #777); font-weight: 400; }
  .model-column strong { display: block; margin-top: 3px; font-size: 13px; }
  .column-head { display: flex; justify-content: space-between; align-items: center; gap: 8px; }
  .sort-button, .hide-button, .details-button { border: 0; padding: 0; color: inherit; background: transparent; cursor: pointer; }
  .sort-button span, .column-head i { color: var(--accent, #45786c); font-style: normal; }
  .hide-button { display: inline-grid; place-items: center; width: 20px; height: 20px; border: 1px solid var(--line, #ccc); color: var(--muted, #777); }
  .details-button { color: var(--accent, #45786c); font-size: 11px; }
  td a, .detail-grid a { color: var(--accent, #45786c); }
  .detail-row td { padding: 22px; background: var(--surface-strong, #f7f7f7); }
  .detail-grid { display: grid; grid-template-columns: 1.2fr 1.5fr 1fr; gap: 26px; }
  dl { margin: 8px 0 0; }
  dl div { display: grid; grid-template-columns: 100px 1fr; gap: 12px; padding: 6px 0; border-bottom: 1px solid var(--line, #ddd); }
  dt { color: var(--muted, #777); }
  dd { margin: 0; }
  .detail-grid article { margin-top: 8px; padding: 10px; border: 1px solid var(--line, #ddd); background: var(--surface, #fff); }
  .detail-grid article p { margin: 4px 0 0; color: var(--muted, #666); }
  .compare-shell { margin: 18px 0; border: 1px solid var(--line, #ddd); }
  .compare-head { display: flex; justify-content: space-between; align-items: center; padding: 14px 16px; }
  .compare-head h3 { margin: 3px 0 0; }
  .compare-table { min-width: 850px; width: 100%; font-size: 12px; }
  .compare-table thead th:first-child, .compare-table tbody th { position: sticky; right: 0; z-index: 3; min-width: 160px; }
  .compare-table thead th { min-width: 220px; }
  .compare-table thead strong { display: block; margin-top: 4px; }
  .group-row th { background: var(--accent-soft, #eef4f2); color: var(--accent, #45786c); }
  @media (max-width: 800px) {
    .intro { grid-template-columns: 1fr; }
    .filters, .summary, .detail-grid { grid-template-columns: 1fr; }
    .summary > div { border-inline-end: 0; border-bottom: 1px solid var(--line, #ddd); }
    .summary > div:last-child { border-bottom: 0; }
    .server-table { min-width: 1320px; }
  }
</style>
