<script lang="ts">
  import { gpuLastReviewed, gpuRecords, gpuWorkloads, type GpuRecord, type GpuStatus, type GpuVendor, type GpuClass, type GpuWorkload } from '$lib/gpu-data';

  type GpuSegment = 'مصرفی' | 'حرفه‌ای' | 'مرکز داده' | 'مقیاس رک';
  type SortKey = 'model' | 'segment' | 'status' | 'year' | 'architecture' | 'memoryGB' | 'memoryType' | 'bandwidthTBs' | 'powerW' | 'software' | 'formFactor' | 'interconnect';
  type SortRule = { key: SortKey; direction: 'asc' | 'desc' };
  const fa = new Intl.NumberFormat('fa-IR', { maximumFractionDigits: 1 });
  const vendors: GpuVendor[] = ['NVIDIA', 'AMD', 'Intel'];
  const segments: GpuSegment[] = ['مصرفی', 'حرفه‌ای', 'مرکز داده', 'مقیاس رک'];
  const statuses: GpuStatus[] = ['current', 'system-only', 'announced', 'legacy'];
  const statusLabel: Record<GpuStatus, string> = {
    current: 'نسل جاری',
    'system-only': 'فقط سیستم',
    announced: 'مشخصات اولیه',
    legacy: 'نسل قبل'
  };
  const segmentLabel: Record<GpuClass, GpuSegment> = {
    consumer: 'مصرفی',
    workstation: 'حرفه‌ای',
    datacenter: 'مرکز داده',
    'server-pcie': 'مقیاس رک',
    frontier: 'مقیاس رک'
  };

  let query = '';
  let selectedVendors: GpuVendor[] = [];
  let selectedSegments: GpuSegment[] = [];
  let selectedStatuses: GpuStatus[] = [];
  let useCase: GpuWorkload | '' = '';
  let minMemory = 0;
  let maxPower = 0;
  let preset = 'all';
  let advanced = false;
  let sorts: SortRule[] = [{ key: 'memoryGB', direction: 'desc' }];
  let compared: string[] = [];

  const toggle = <T,>(items: T[], value: T) => items.includes(value) ? items.filter((item) => item !== value) : [...items, value];
  const format = (value: number | null, suffix = '') => value == null ? '—' : `${fa.format(value)}${suffix}`;

  function reset() {
    query = ''; selectedVendors = []; selectedSegments = []; selectedStatuses = [];
    useCase = ''; minMemory = 0; maxPower = 0; preset = 'all';
  }

  function usePreset(value: string) {
    reset(); preset = value;
    if (value === 'current') selectedStatuses = ['current'];
    if (value === 'local') { selectedSegments = ['مصرفی', 'حرفه‌ای']; useCase = 'هوش مصنوعی محلی'; minMemory = 24; }
    if (value === 'efficient') { useCase = 'استنتاج سازمانی'; maxPower = 200; }
    if (value === 'enterprise') useCase = 'استنتاج سازمانی';
    if (value === 'frontier') selectedSegments = ['مقیاس رک'];
  }

  function toggleSort(key: SortKey) {
    const rule = sorts.find((item) => item.key === key);
    if (!rule) {
      const newRule: SortRule = { key, direction: 'desc' };
      sorts = [...sorts, newRule].slice(-3);
      return;
    }
    if (rule.direction === 'desc') sorts = sorts.map((item) => item.key === key ? { ...item, direction: 'asc' } : item);
    else sorts = sorts.filter((item) => item.key !== key);
  }

  function sortMark(key: SortKey) {
    const index = sorts.findIndex((item) => item.key === key);
    return index < 0 ? '' : `${fa.format(index + 1)} ${sorts[index].direction === 'desc' ? '↓' : '↑'}`;
  }

  function compareRows(a: GpuRecord, b: GpuRecord, rule: SortRule) {
    const getValue = (record: GpuRecord) => {
      if (rule.key === 'segment') return segmentLabel[record.gpuClass];
      return record[rule.key as keyof GpuRecord];
    };

    const av = getValue(a);
    const bv = getValue(b);
    if (av == null && bv == null) return 0;
    if (av == null) return 1;
    if (bv == null) return -1;
    const result = typeof av === 'number' && typeof bv === 'number'
      ? av - bv
      : String(av).localeCompare(String(bv), 'fa');
    return rule.direction === 'asc' ? result : -result;
  }

  function toggleCompare(id: string) {
    if (compared.includes(id)) compared = compared.filter((item) => item !== id);
    else if (compared.length < 4) compared = [...compared, id];
  }

  function csvCell(value: string | number | null) { return `"${String(value ?? '').replaceAll('"', '""')}"`; }
  function exportCsv() {
    const head = ['سازنده','مدل','رده','وضعیت','سال','معماری','حافظه GB','نوع حافظه','پهنای‌باند TB/s','توان W','فرم‌فکتور','رابط','ارتباط','نرم‌افزار','تقسیم‌پذیری','کاربردها','منبع'];
    const body = visible.map((g) => [
      g.vendor,
      g.model,
      segmentLabel[g.gpuClass],
      statusLabel[g.status],
      g.year,
      g.architecture,
      g.memoryGB,
      g.memoryType,
      g.bandwidthTBs,
      g.powerW,
      g.formFactor,
      g.hostInterface,
      g.interconnect,
      g.software,
      g.partitioning,
      g.workloads.join(' | '),
      g.sourceUrl
    ]);
    const content = '\ufeff' + [head, ...body].map((row) => row.map(csvCell).join(',')).join('\n');
    const url = URL.createObjectURL(new Blob([content], { type: 'text/csv;charset=utf-8' }));
    const link = document.createElement('a'); link.href = url; link.download = `gpu-comparison-${gpuLastReviewed.iso}.csv`; link.click(); URL.revokeObjectURL(url);
  }

  $: needle = query.trim().toLocaleLowerCase('fa');
  $: filtered = gpuRecords.filter((g) => {
    const text = `${g.vendor} ${g.model} ${g.architecture} ${g.memoryType} ${g.software} ${g.formFactor}`.toLocaleLowerCase('fa');
    return (!needle || text.includes(needle))
      && (!selectedVendors.length || selectedVendors.includes(g.vendor))
      && (!selectedSegments.length || selectedSegments.includes(segmentLabel[g.gpuClass]))
      && (!selectedStatuses.length || selectedStatuses.includes(g.status))
      && (!useCase || g.workloads.includes(useCase))
      && g.memoryGB >= minMemory
      && (!maxPower || (g.powerW != null && g.powerW <= maxPower));
  });
  $: visible = [...filtered].sort((a, b) => {
    for (const rule of sorts) { const result = compareRows(a, b, rule); if (result) return result; }
    return a.model.localeCompare(b.model, 'en');
  });
  $: comparison = compared.map((id) => gpuRecords.find((g) => g.id === id)).filter(Boolean) as GpuRecord[];
  $: maxMemory = visible.length ? Math.max(...visible.map((g) => g.memoryGB)) : 0;
  $: maxBandwidth = visible.length ? Math.max(...visible.map((g) => g.bandwidthTBs)) : 0;
  $: lowestPower = visible.filter((g) => g.powerW != null).sort((a,b) => (a.powerW ?? Infinity) - (b.powerW ?? Infinity))[0];
</script>

<section class="explorer" aria-labelledby="gpu-table-title">
  <header class="heading">
    <div><small>مرجع زندهٔ انتخاب شتاب‌دهنده</small><h2 id="gpu-table-title">عدد بزرگ‌تر همیشه GPU بهتر نیست</h2><p>این جدول مشخصات مهم شتاب‌دهنده‌های هوش مصنوعی را از کارت مدل محلی تا ماژول مقیاس‌رک کنار هم می‌گذارد. ابتدا <strong>حافظه، پهنای‌باند، توان و فرم‌فکتور</strong> را با بار کاری تطبیق دهید؛ بعد سراغ توان محاسباتی بروید. اوج نظری جای benchmark همان مدل و همان نرم‌افزار را نمی‌گیرد.</p></div>
    <div class="stamp"><span>آخرین بازبینی داده‌ها</span><b>{gpuLastReviewed.fa}</b><small>{gpuLastReviewed.gregorian}</small></div>
  </header>

  <div class="rules"><article><span>۰۱</span><b>حافظه تعیین می‌کند مدل جا می‌شود یا نه</b></article><article><span>۰۲</span><b>پهنای‌باند برای LLM اغلب حیاتی است</b></article><article><span>۰۳</span><b>سامانه و نرم‌افزار هزینهٔ واقعی را می‌سازند</b></article></div>
  <div class="scope"><b>قاعدهٔ خواندن:</b><span>اعداد برای یک GPU یا ماژول‌اند، نه مجموع سرور. «AI متراکم» تا جای ممکن FP16/BF16 بدون sparsity است؛ «اوج اعلامی» معیار برجستهٔ خود سازنده است و لزوماً میان ردیف‌ها هم‌سنخ نیست.</span></div>

  <nav class="presets" aria-label="فیلترهای سریع">
    <button class:active={preset === 'all'} on:click={() => usePreset('all')}>همه</button><button class:active={preset === 'current'} on:click={() => usePreset('current')}>نسل جاری</button><button class:active={preset === 'local'} on:click={() => usePreset('local')}>مدل محلی ۲۴GB+</button><button class:active={preset === 'efficient'} on:click={() => usePreset('efficient')}>استنتاج تا ۲۰۰ وات</button><button class:active={preset === 'enterprise'} on:click={() => usePreset('enterprise')}>استقرار سازمانی</button><button class:active={preset === 'frontier'} on:click={() => usePreset('frontier')}>مدل‌های مرزی</button>
  </nav>

  <details class="filters" open>
    <summary>فیلتر دقیق <span>{fa.format(visible.length)} نتیجه</span></summary>
    <div class="filter-grid">
      <label class="search"><span>مدل، معماری یا پشته</span><input bind:value={query} type="search" placeholder="مثلاً H200، Blackwell یا ROCm" /></label>
      <fieldset><legend>سازنده</legend><div class="checks">{#each vendors as item}<label><input type="checkbox" checked={selectedVendors.includes(item)} on:change={() => { selectedVendors = toggle(selectedVendors, item); preset = 'custom'; }} /><span dir="ltr">{item}</span></label>{/each}</div></fieldset>
      <fieldset><legend>ردهٔ استقرار</legend><div class="checks">{#each segments as item}<label><input type="checkbox" checked={selectedSegments.includes(item)} on:change={() => { selectedSegments = toggle(selectedSegments, item); preset = 'custom'; }} /><span>{item}</span></label>{/each}</div></fieldset>
      <fieldset><legend>وضعیت</legend><div class="checks">{#each statuses as item}<label><input type="checkbox" checked={selectedStatuses.includes(item)} on:change={() => { selectedStatuses = toggle(selectedStatuses, item); preset = 'custom'; }} /><span>{statusLabel[item]}</span></label>{/each}</div></fieldset>
      <label><span>کاربرد غالب</span><select bind:value={useCase} on:change={() => preset = 'custom'}><option value="">همهٔ کاربردها</option>{#each gpuWorkloads as item}<option value={item}>{item}</option>{/each}</select></label>
      <label><span>حداقل حافظه</span><select bind:value={minMemory} on:change={() => preset = 'custom'}><option value={0}>بدون محدودیت</option><option value={16}>۱۶ GB</option><option value={24}>۲۴ GB</option><option value={48}>۴۸ GB</option><option value={80}>۸۰ GB</option><option value={128}>۱۲۸ GB</option><option value={192}>۱۹۲ GB</option><option value={256}>۲۵۶ GB</option></select></label>
      <label><span>حداکثر توان</span><select bind:value={maxPower} on:change={() => preset = 'custom'}><option value={0}>بدون محدودیت</option><option value={100}>۱۰۰ W</option><option value={200}>۲۰۰ W</option><option value={350}>۳۵۰ W</option><option value={600}>۶۰۰ W</option><option value={1000}>۱۰۰۰ W</option></select></label>
    </div>
    <footer><button on:click={reset}>پاک‌کردن فیلترها</button><label><input type="checkbox" bind:checked={advanced} /> نمایش ستون‌های تخصصی</label></footer>
  </details>

  <div class="summary" aria-live="polite"><div><small>نتیجه</small><b>{fa.format(visible.length)}</b><span>از {fa.format(gpuRecords.length)} مدل</span></div><div><small>بیشترین حافظه</small><b>{format(maxMemory)}</b><span>GB</span></div><div><small>بیشترین پهنای‌باند</small><b>{format(maxBandwidth)}</b><span>TB/s</span></div><div><small>کم‌مصرف‌ترین</small><b>{lowestPower ? format(lowestPower.powerW) : '—'}</b><span>{lowestPower?.model ?? 'نامشخص'}</span></div></div>

  {#if comparison.length}
    <section class="compare"><header><div><small>مقایسهٔ رو در رو</small><b>{fa.format(comparison.length)} از ۴ مدل</b></div><button on:click={() => compared = []}>حذف همه</button></header><div>{#each comparison as gpu}<article><button class="remove" aria-label={`حذف ${gpu.model}`} on:click={() => toggleCompare(gpu.id)}>×</button><i class={`vendor ${gpu.vendor.toLowerCase()}`}>{gpu.vendor}</i><h3 dir="ltr">{gpu.model}</h3><dl><div><dt>حافظه</dt><dd>{format(gpu.memoryGB,' GB')}</dd></div><div><dt>پهنای‌باند</dt><dd>{format(gpu.bandwidthTBs,' TB/s')}</dd></div><div><dt>توان</dt><dd>{format(gpu.powerW,' W')}</dd></div><div><dt>پشته</dt><dd>{gpu.software}</dd></div></dl></article>{/each}</div></section>
  {/if}

  <div class="toolbar"><p>عنوان هر ستون را بزنید؛ کلیک اول نزولی، دوم صعودی و سوم خاموش است. تا سه معیار هم‌زمان حفظ می‌شود و عدد کنار عنوان اولویت آن را نشان می‌دهد.</p><div><button on:click={() => sorts = []}>حذف مرتب‌سازی</button><button class="export" on:click={exportCsv}>دریافت CSV</button></div></div>

  <section class="table-shell" aria-label="جدول مقایسه GPU؛ افقی پیمایش کنید">
    <table><thead><tr>
      <th class="pick">مقایسه</th><th class="model"><button on:click={() => toggleSort('model')}>مدل <i>{sortMark('model')}</i></button></th><th><button on:click={() => toggleSort('segment')}>رده <i>{sortMark('segment')}</i></button></th><th><button on:click={() => toggleSort('memoryGB')}>حافظه <small>GB</small> <i>{sortMark('memoryGB')}</i></button></th><th><button on:click={() => toggleSort('bandwidthTBs')}>پهنای‌باند <small>TB/s</small> <i>{sortMark('bandwidthTBs')}</i></button></th><th><button on:click={() => toggleSort('powerW')}>توان <small>W</small> <i>{sortMark('powerW')}</i></button></th><th><button on:click={() => toggleSort('formFactor')}>فرم‌فکتور <i>{sortMark('formFactor')}</i></button></th><th>مناسب برای</th>
      {#if advanced}<th><button on:click={() => toggleSort('architecture')}>معماری / سال <i>{sortMark('architecture')}</i></button></th><th><button on:click={() => toggleSort('memoryType')}>نوع حافظه <i>{sortMark('memoryType')}</i></button></th><th><button on:click={() => toggleSort('interconnect')}>ارتباط <i>{sortMark('interconnect')}</i></button></th><th><button on:click={() => toggleSort('software')}>پشته <i>{sortMark('software')}</i></button></th><th>تقسیم‌پذیری</th>{/if}
    </tr></thead><tbody>
      {#each visible as gpu}
        <tr class:roadmap={gpu.status === 'announced'} class:selected={compared.includes(gpu.id)}>
          <td class="pick"><input type="checkbox" checked={compared.includes(gpu.id)} disabled={!compared.includes(gpu.id) && compared.length >= 4} on:change={() => toggleCompare(gpu.id)} aria-label={`مقایسه ${gpu.model}`} /></td>
          <td class="model"><div class="model-cell"><i class={`vendor ${gpu.vendor.toLowerCase()}`}>{gpu.vendor}</i><b dir="ltr">{gpu.model}</b><small class:preliminary={gpu.status === 'announced'}>{statusLabel[gpu.status]}</small><a href={gpu.sourceUrl} target="_blank" rel="noreferrer">منبع رسمی ↗</a></div></td>
          <td><span class="segment">{segmentLabel[gpu.gpuClass]}</span></td><td class="num"><b>{format(gpu.memoryGB)}</b><small>{gpu.memoryType.replace(' ECC','')}</small></td><td class="num"><b>{format(gpu.bandwidthTBs)}</b><small>TB/s</small></td><td class="num"><b>{format(gpu.powerW)}</b>{#if gpu.powerW == null}<small>اعلام نشده</small>{/if}</td><td class="text">{gpu.formFactor}</td><td class="uses">{#each gpu.workloads.slice(0,3) as item}<span>{item}</span>{/each}</td>
          {#if advanced}<td class="text"><b>{gpu.architecture}</b><small>{fa.format(gpu.year)}</small></td><td class="text">{gpu.memoryType}</td><td class="text">{gpu.interconnect}</td><td class="text" dir="ltr">{gpu.software}</td><td class="text">{gpu.partitioning}</td>{/if}
        </tr>
        {#if gpu.compute}<tr class="note"><td></td><td colspan={advanced ? 13 : 8}><b>یادداشت</b> {gpu.compute}</td></tr>{/if}
      {:else}<tr class="empty"><td colspan={advanced ? 13 : 8}>با این ترکیب فیلتر، مدلی پیدا نشد. محدودیت حافظه، توان یا کاربرد را تغییر دهید.</td></tr>{/each}
    </tbody></table>
  </section>

  <footer class="method"><article><h3>چرا CUDA Core ستون اصلی نیست؟</h3><p>تعداد هسته فقط داخل یک خانواده و با احتیاط معنا دارد. معماری، فرکانس، Tensor/Matrix Engine، حافظه و نرم‌افزار نتیجه را عوض می‌کنند و نام هسته‌های سه سازنده معادل هم نیست.</p></article><article><h3>چرا قیمت فعلاً نیست؟</h3><p>قیمت واقعی به SKU، خنک‌کاری، پارت‌نامبر OEM، قرارداد پشتیبانی و بازار ایران وابسته است. قیمت و موجودی در راهنمای خرید و ترکیب سرور جداگانه بررسی می‌شود.</p></article><article><h3>روال بازبینی ماهانه</h3><p>صفحات رسمی، وضعیت عرضه، حافظه، پهنای‌باند، توان و پشتیبانی نرم‌افزاری کنترل می‌شوند. نتایج آزمایشگاه‌ها بعداً لایهٔ مستقلی خواهند بود تا مشخصات نظری با کارایی واقعی مخلوط نشود.</p></article></footer>
</section>

<style>
  .explorer{margin-top:42px;border-top:1px solid var(--line);padding-top:52px}.heading{display:grid;grid-template-columns:minmax(0,1fr) 180px;gap:52px}.heading>div>small{color:var(--teal);font-size:10px;font-weight:800}.heading h2{margin:8px 0 15px;font-size:clamp(31px,4.5vw,52px);line-height:1.35;letter-spacing:-1.7px}.heading p{max-width:800px;margin:0;color:var(--muted);font-size:14px;line-height:2.15}.heading strong{color:var(--ink)}.stamp{border:1px solid var(--line);border-top:3px solid var(--teal);padding:17px;display:grid;gap:5px}.stamp span,.stamp small{color:var(--muted);font-size:9px}.stamp b{font-size:15px}.rules{margin:30px 0 0;display:grid;grid-template-columns:repeat(3,1fr);border:1px solid var(--line)}.rules article{min-height:74px;padding:15px;display:grid;grid-template-columns:25px 1fr;gap:5px;align-items:center}.rules article+article{border-inline-start:1px solid var(--line)}.rules span{color:var(--teal);font-size:10px}.rules b{font-size:9px;line-height:1.7}.scope{padding:14px 18px;display:grid;grid-template-columns:100px 1fr;gap:15px;background:color-mix(in srgb,var(--teal) 5%,var(--paper));border:1px solid color-mix(in srgb,var(--teal) 35%,var(--line));border-top:0}.scope b{color:var(--teal);font-size:9px}.scope span{color:var(--muted);font-size:9px;line-height:1.9}.presets{display:flex;gap:7px;overflow-x:auto;padding:22px 0 10px}.presets button,.filters footer button,.toolbar button,.compare button{border:1px solid var(--line);background:var(--paper);color:var(--muted);font:inherit;cursor:pointer}.presets button{flex:0 0 auto;border-radius:99px;padding:8px 13px;font-size:9px}.presets button:hover,.presets button.active{border-color:var(--teal);color:var(--teal);background:color-mix(in srgb,var(--teal) 7%,var(--paper))}.filters{border:1px solid var(--line);background:color-mix(in srgb,var(--paper) 94%,var(--soft))}.filters summary{display:flex;justify-content:space-between;padding:15px 18px;font-size:11px;font-weight:800;cursor:pointer}.filters summary span{color:var(--teal);font-weight:500}.filter-grid{padding:18px;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:18px;border-top:1px solid var(--line)}.filter-grid label,.filter-grid fieldset{min-width:0;margin:0;padding:0;border:0}.filter-grid label>span,.filter-grid legend{display:block;margin-bottom:7px;color:var(--muted);font-size:8px}.filter-grid input[type=search],.filter-grid select{box-sizing:border-box;width:100%;height:38px;border:1px solid var(--line);border-radius:5px;background:var(--bg);color:var(--ink);padding:0 10px;font:inherit;font-size:10px}.search{grid-column:span 2}.checks{display:flex;flex-wrap:wrap;gap:6px}.checks label{position:relative}.checks input{position:absolute;opacity:0}.checks label span{display:block;margin:0;border:1px solid var(--line);border-radius:5px;padding:7px 9px;color:var(--muted);font-size:8px;cursor:pointer}.checks input:checked+span{border-color:var(--teal);color:var(--teal);background:color-mix(in srgb,var(--teal) 8%,var(--paper))}.filters footer{display:flex;justify-content:space-between;align-items:center;padding:12px 18px;border-top:1px solid var(--line)}.filters footer button{border:0;color:var(--teal);font-size:9px}.filters footer label{display:flex;align-items:center;gap:7px;color:var(--muted);font-size:9px}.summary{margin:22px 0;display:grid;grid-template-columns:repeat(4,1fr);border:1px solid var(--line)}.summary>div{padding:14px 16px;display:grid;grid-template-columns:auto 1fr;gap:2px 9px;align-items:baseline}.summary>div+div{border-inline-start:1px solid var(--line)}.summary small{color:var(--muted);font-size:8px}.summary b{justify-self:end;color:var(--teal);font-size:19px}.summary span{grid-column:1/-1;color:var(--muted);font-size:7px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.compare{margin:22px 0;border:1px solid color-mix(in srgb,var(--teal) 45%,var(--line));background:color-mix(in srgb,var(--teal) 4%,var(--paper))}.compare>header{padding:12px 15px;display:flex;justify-content:space-between;border-bottom:1px solid var(--line)}.compare header div{display:flex;gap:8px}.compare header small{color:var(--teal);font-size:8px}.compare header b{font-size:10px}.compare header button{border:0;font-size:8px}.compare>div{display:grid;grid-template-columns:repeat(4,1fr)}.compare article{position:relative;min-width:0;padding:16px}.compare article+article{border-inline-start:1px solid var(--line)}.compare h3{min-height:42px;margin:8px 0 14px;font-size:12px;line-height:1.6;text-align:right}.compare dl{margin:0;display:grid;gap:7px}.compare dl div{display:flex;justify-content:space-between;gap:8px;font-size:8px}.compare dt{color:var(--muted)}.compare dd{margin:0;text-align:left}.remove{position:absolute;inset-inline-end:9px;top:9px;width:22px;height:22px;border-radius:50%}.toolbar{display:flex;justify-content:space-between;gap:20px;margin:18px 0 9px}.toolbar p{max-width:650px;margin:0;color:var(--muted);font-size:8px;line-height:1.8}.toolbar>div{display:flex;gap:6px}.toolbar button{padding:7px 9px;font-size:8px}.toolbar .export{border-color:var(--teal);color:var(--teal)}.table-shell{max-height:72vh;overflow:auto;border:1px solid var(--line);background:var(--paper);scrollbar-width:thin}table{width:max-content;min-width:100%;border-collapse:separate;border-spacing:0;font-size:9px}th,td{box-sizing:border-box;min-width:94px;max-width:165px;border-inline-end:1px solid var(--line);border-bottom:1px solid var(--line);padding:10px;text-align:right;vertical-align:middle}th{position:sticky;top:0;z-index:4;height:48px;background:var(--navy);color:#d7e7e5;font-size:8px;white-space:nowrap}th button{display:flex;gap:4px;width:100%;border:0;background:transparent;color:inherit;padding:0;font:inherit;cursor:pointer}th i{color:#78d6cd;font-style:normal;font-size:7px}th small{color:#91aaa7;font-size:6px}td{height:65px;background:var(--paper)}tr:hover td{background:color-mix(in srgb,var(--teal) 5%,var(--paper))}tr.selected td{background:color-mix(in srgb,var(--teal) 9%,var(--paper))}tr.roadmap td{background-image:linear-gradient(135deg,transparent 0 48%,color-mix(in srgb,var(--teal) 4%,transparent) 48% 52%,transparent 52%);background-size:9px 9px}.pick{min-width:58px;width:58px;max-width:58px;text-align:center}.pick input{accent-color:var(--teal)}.model{position:sticky;right:0;z-index:2;min-width:208px;max-width:208px;box-shadow:-8px 0 14px rgba(0,0,0,.045)}th.model{z-index:6;background:var(--navy)}.model-cell{display:grid;grid-template-columns:auto 1fr;gap:3px 7px;align-items:center}.model-cell b{grid-column:1/-1;font-size:10px;text-align:left}.model-cell>small{font-size:7px;color:var(--muted)}.model-cell>small.preliminary{color:#b77718}.model-cell a{justify-self:end;color:var(--teal);font-size:7px}.vendor{display:inline-flex;width:max-content;border-radius:99px;padding:3px 6px;font:700 6px/1.2 ui-monospace,monospace;direction:ltr;font-style:normal}.vendor.nvidia{background:#76b90022;color:#578b00}.vendor.amd{background:#e3221920;color:#c03b34}.vendor.intel{background:#0071c520;color:#1678b9}.segment{color:var(--muted);font-size:8px}.num{text-align:center;direction:ltr}.num b{display:block;font-size:11px}.num small,.text small{display:block;margin-top:3px;color:var(--muted);font-size:7px}.text,.claim{color:var(--muted);font-size:8px;line-height:1.7}.text b{color:var(--ink)}.uses{min-width:180px}.uses span{display:inline-block;margin:2px;border:1px solid var(--line);border-radius:99px;padding:3px 6px;color:var(--muted);font-size:6px;white-space:nowrap}.claim{min-width:145px;text-align:left}.note td{height:auto;padding-block:7px;background:color-mix(in srgb,var(--soft) 70%,var(--paper));color:var(--muted);font-size:7px;line-height:1.8}.note td:nth-child(2){position:static;box-shadow:none}.note b{margin-inline-end:7px;color:var(--teal)}.empty td{padding:42px;text-align:center;color:var(--muted)}.method{margin-top:24px;display:grid;grid-template-columns:repeat(3,1fr);border-block:1px solid var(--line)}.method article{padding:22px}.method article+article{border-inline-start:1px solid var(--line)}.method h3{margin:0 0 9px;font-size:11px}.method p{margin:0;color:var(--muted);font-size:9px;line-height:2}
  @media(max-width:920px){.filter-grid{grid-template-columns:repeat(2,1fr)}.compare>div{grid-template-columns:repeat(2,1fr)}.method{grid-template-columns:1fr}.method article+article{border-inline-start:0;border-top:1px solid var(--line)}}
  @media(max-width:650px){.explorer{padding-top:34px}.heading{grid-template-columns:1fr;gap:22px}.stamp{max-width:230px}.rules{grid-template-columns:1fr}.rules article+article{border-inline-start:0;border-top:1px solid var(--line)}.scope{grid-template-columns:1fr}.filter-grid{grid-template-columns:1fr}.search{grid-column:auto}.summary{grid-template-columns:repeat(2,1fr)}.summary>div:nth-child(3){border-inline-start:0;border-top:1px solid var(--line)}.summary>div:nth-child(4){border-top:1px solid var(--line)}.compare>div{grid-template-columns:1fr}.compare article+article{border-inline-start:0;border-top:1px solid var(--line)}.toolbar{align-items:flex-start;flex-direction:column}.model{min-width:176px;max-width:176px}.table-shell{max-height:68vh}}
</style>
