<script lang="ts">
  import {
    gpuLastReviewed,
    gpuRecords,
    gpuWorkloads,
    type GpuClass,
    type GpuComputeRate,
    type GpuRecord,
    type GpuStatus,
    type GpuVendor,
    type GpuWorkload
  } from '$lib/gpu-data';

  type GpuSegment = 'مصرفی' | 'حرفه‌ای' | 'مرکز داده' | 'مقیاس رک';
  type Precision = 'fp4' | 'fp8' | 'bf16' | 'fp16' | 'fp32' | 'fp64' | 'int8' | 'int4';
  type SortKey = 'model' | 'segment' | 'status' | 'year' | 'architecture' | 'memoryGB' | 'memoryType' | 'bandwidthTBs' | 'powerW' | 'software' | 'formFactor' | 'interconnect' | 'generalCoreCount' | 'matrixCoreCount' | Precision;
  type SortRule = { key: SortKey; direction: 'asc' | 'desc' };

  const fa = new Intl.NumberFormat('fa-IR', { maximumFractionDigits: 1 });
  const vendors: GpuVendor[] = ['NVIDIA', 'AMD', 'Intel', 'Huawei', 'Google', 'AWS', 'Tenstorrent', 'Qualcomm', 'Cerebras', 'Groq'];
  const segments: GpuSegment[] = ['مصرفی', 'حرفه‌ای', 'مرکز داده', 'مقیاس رک'];
  const statuses: GpuStatus[] = ['current', 'system-only', 'announced', 'legacy'];
  const statusLabel: Record<GpuStatus, string> = { current: 'نسل جاری', 'system-only': 'فقط سیستم', announced: 'مشخصات اولیه', legacy: 'نسل قبل' };
  const segmentLabel: Record<GpuClass, GpuSegment> = { consumer: 'مصرفی', workstation: 'حرفه‌ای', datacenter: 'مرکز داده', 'server-pcie': 'مقیاس رک', frontier: 'مقیاس رک' };

  let query = '';
  let selectedVendors: GpuVendor[] = [];
  let selectedSegments: GpuSegment[] = [];
  let selectedStatuses: GpuStatus[] = [];
  let useCase: GpuWorkload | '' = '';
  let precision: Precision | '' = '';
  let minMemory = 0;
  let maxPower = 0;
  let preset = 'all';
  let showCompute = true;
  let showExtendedCompute = true;
  let showInfra = true;
  let sorts: SortRule[] = [{ key: 'memoryGB', direction: 'desc' }];
  let compared: string[] = [];
  let expanded: string[] = [];

  const toggle = <T,>(items: T[], value: T) => items.includes(value) ? items.filter((item) => item !== value) : [...items, value];
  const format = (value: number | null, suffix = '') => value == null ? '—' : `${fa.format(value)}${suffix}`;
  const brandLogo = (gpu: GpuRecord) => `/images/brands/${gpu.vendor.toLowerCase()}.svg`;
  const brandName = (gpu: GpuRecord) => gpu.vendor === 'AMD' && gpu.model.includes('Instinct') ? 'INSTINCT' : gpu.vendor;
  const disclosureLabel = {
    published: 'رسمی', derived: 'استخراج از سامانه', 'not-published': 'سازنده منتشر نکرده',
    'not-supported': 'پشتیبانی نمی‌شود', 'not-applicable': 'قابل‌اعمال نیست'
  } as const;

  const productKind = (gpu: GpuRecord) => gpu.productKind ?? (gpu.formFactor.includes('PCIe') ? 'کارت' : gpu.gpuClass === 'frontier' ? 'ماژول' : 'پردازنده');
  const disclosureText = (gpu: GpuRecord, key: keyof NonNullable<GpuRecord['disclosure']>) => disclosureLabel[gpu.disclosure?.[key] ?? 'not-published'];
  const baseDisclosureText = (gpu: GpuRecord, key: keyof NonNullable<GpuRecord['dataDisclosure']>) => disclosureLabel[gpu.dataDisclosure?.[key] ?? 'published'];
  const scalarText = (gpu: GpuRecord, key: 'generalCoreCount' | 'matrixCoreCount' | 'fp32' | 'fp64') => {
    const value = gpu[key];
    return value == null ? disclosureText(gpu, key) : format(value);
  };
  const rateText = (gpu: GpuRecord, key: 'fp4' | 'fp8' | 'bf16' | 'fp16' | 'int8' | 'int4') => {
    const rate = gpu[key];
    return rate?.dense == null ? disclosureText(gpu, key) : format(rate.dense);
  };
  const measuredText = (gpu: GpuRecord, key: 'memoryGB' | 'bandwidthTBs' | 'powerW') => {
    const value = gpu[key];
    if (gpu.dataDisclosure?.[key] && gpu.dataDisclosure[key] !== 'published') return baseDisclosureText(gpu, key);
    return value == null ? disclosureLabel['not-published'] : format(value);
  };
  const measuredWithUnit = (gpu: GpuRecord, key: 'memoryGB' | 'bandwidthTBs' | 'powerW', unit: string) => {
    const text = measuredText(gpu, key);
    const state = gpu.dataDisclosure?.[key] ?? 'published';
    return typeof gpu[key] === 'number' && (state === 'published' || state === 'derived') ? `${text} ${unit}` : text;
  };

  const specGroups = ['تراشه', 'محاسبات', 'حافظه', 'ارتباط و شبکه', 'توان و مکانیک', 'نرم‌افزار و مجازی‌سازی', 'رسانه', 'عرضه و منبع'] as const;
  function fullSpecs(gpu: GpuRecord) {
    return [
      { group: 'تراشه', label: 'سازنده', value: gpu.vendor },
      { group: 'تراشه', label: 'مدل', value: gpu.model },
      { group: 'تراشه', label: 'نوع محصول', value: productKind(gpu) },
      { group: 'تراشه', label: 'معماری', value: gpu.architecture },
      { group: 'تراشه', label: 'سال معرفی', value: String(gpu.year) },
      { group: 'تراشه', label: gpu.generalCoreLabel, value: scalarText(gpu, 'generalCoreCount') },
      { group: 'تراشه', label: gpu.matrixCoreLabel, value: scalarText(gpu, 'matrixCoreCount') },
      { group: 'محاسبات', label: 'FP4 / MXFP4', value: rateText(gpu, 'fp4') },
      { group: 'محاسبات', label: 'FP8', value: rateText(gpu, 'fp8') },
      { group: 'محاسبات', label: 'BF16', value: rateText(gpu, 'bf16') },
      { group: 'محاسبات', label: 'FP16', value: rateText(gpu, 'fp16') },
      { group: 'محاسبات', label: 'FP32 برداری', value: scalarText(gpu, 'fp32') },
      { group: 'محاسبات', label: 'FP64 برداری', value: scalarText(gpu, 'fp64') },
      { group: 'محاسبات', label: 'INT8', value: rateText(gpu, 'int8') },
      { group: 'محاسبات', label: 'INT4', value: rateText(gpu, 'int4') },
      { group: 'حافظه', label: 'ظرفیت', value: gpu.memoryDisplay ? `${gpu.memoryDisplay} GB` : measuredWithUnit(gpu, 'memoryGB', 'GB') },
      { group: 'حافظه', label: 'نوع / ECC', value: gpu.memoryType },
      { group: 'حافظه', label: 'پهنای‌باند', value: measuredWithUnit(gpu, 'bandwidthTBs', 'TB/s') },
      { group: 'ارتباط و شبکه', label: 'رابط میزبان', value: gpu.hostInterface },
      { group: 'ارتباط و شبکه', label: 'اتصال شتاب‌دهنده‌ها', value: gpu.interconnect },
      { group: 'توان و مکانیک', label: 'توان', value: measuredWithUnit(gpu, 'powerW', 'W') },
      { group: 'توان و مکانیک', label: 'فرم‌فکتور', value: gpu.formFactor },
      { group: 'توان و مکانیک', label: 'خنک‌کاری', value: gpu.cooling },
      { group: 'نرم‌افزار و مجازی‌سازی', label: 'پشته', value: gpu.software },
      { group: 'نرم‌افزار و مجازی‌سازی', label: 'تقسیم‌پذیری / مجازی‌سازی', value: gpu.partitioning },
      { group: 'عرضه و منبع', label: 'وضعیت', value: statusLabel[gpu.status] },
      { group: 'عرضه و منبع', label: 'سطح منبع', value: gpu.sourceTier ?? 'سازنده' },
      { group: 'عرضه و منبع', label: 'منبع', value: gpu.sourceLabel },
      ...(gpu.extraSpecs ?? [])
    ];
  }
  const specsFor = (gpu: GpuRecord, group: typeof specGroups[number]) => fullSpecs(gpu).filter((item) => item.group === group);

  function reset() {
    query = ''; selectedVendors = []; selectedSegments = []; selectedStatuses = [];
    useCase = ''; precision = ''; minMemory = 0; maxPower = 0; preset = 'all';
  }

  function usePreset(value: string) {
    reset(); preset = value;
    if (value === 'current') selectedStatuses = ['current', 'system-only'];
    if (value === 'local') { selectedSegments = ['مصرفی', 'حرفه‌ای']; useCase = 'هوش مصنوعی محلی'; minMemory = 24; }
    if (value === 'efficient') { useCase = 'استنتاج سازمانی'; maxPower = 200; }
    if (value === 'enterprise') useCase = 'استنتاج سازمانی';
    if (value === 'frontier') selectedSegments = ['مقیاس رک'];
  }

  function toggleSort(key: SortKey) {
    const rule = sorts.find((item) => item.key === key);
    if (!rule) { sorts = [...sorts, { key, direction: 'desc' }].slice(-3) as SortRule[]; return; }
    if (rule.direction === 'desc') sorts = sorts.map((item): SortRule => item.key === key ? { ...item, direction: 'asc' } : item);
    else sorts = sorts.filter((item) => item.key !== key);
  }

  function sortMark(key: SortKey) {
    const index = sorts.findIndex((item) => item.key === key);
    return index < 0 ? '' : `${fa.format(index + 1)} ${sorts[index].direction === 'desc' ? '↓' : '↑'}`;
  }

  function sortValue(record: GpuRecord, key: SortKey): string | number | null {
    if (key === 'segment') return segmentLabel[record.gpuClass];
    if (['fp4', 'fp8', 'bf16', 'fp16', 'int8', 'int4'].includes(key)) return record[key as 'fp4' | 'fp8' | 'bf16' | 'fp16' | 'int8' | 'int4']?.dense ?? null;
    return record[key as keyof GpuRecord] as string | number | null;
  }

  function compareRows(a: GpuRecord, b: GpuRecord, rule: SortRule) {
    const av = sortValue(a, rule.key);
    const bv = sortValue(b, rule.key);
    if (av == null && bv == null) return 0;
    if (av == null) return 1;
    if (bv == null) return -1;
    const result = typeof av === 'number' && typeof bv === 'number' ? av - bv : String(av).localeCompare(String(bv), 'fa');
    return rule.direction === 'asc' ? result : -result;
  }

  function supportsPrecision(gpu: GpuRecord, value: Precision | '') {
    if (!value) return true;
    if (['fp4', 'fp8', 'bf16', 'fp16', 'int8', 'int4'].includes(value)) return gpu[value as 'fp4' | 'fp8' | 'bf16' | 'fp16' | 'int8' | 'int4']?.dense != null;
    return gpu[value as 'fp32' | 'fp64'] != null;
  }

  function toggleCompare(id: string) {
    if (compared.includes(id)) compared = compared.filter((item) => item !== id);
    else if (compared.length < 4) compared = [...compared, id];
  }

  function toggleExpanded(id: string) { expanded = toggle(expanded, id); }
  function csvCell(value: string | number | null | undefined) { return `"${String(value ?? '').replaceAll('"', '""')}"`; }
  function rateCsv(rate?: GpuComputeRate) { return rate?.dense == null ? '' : `${rate.dense}${rate.sparse != null ? ` / ${rate.sparse}` : ''}`; }

  function exportCsv() {
    const head = ['سازنده','مدل','نوع محصول','رده','وضعیت','سال','معماری','حافظه GB','وضعیت حافظه','نوع حافظه','پهنای‌باند TB/s','وضعیت پهنای‌باند','توان W','وضعیت توان','هسته عمومی','نوع هسته عمومی','هسته ماتریسی','نوع هسته ماتریسی','FP4','FP8','BF16','FP16','FP32','FP64','INT8','INT4','فرم‌فکتور','رابط','خنک‌کاری','ارتباط','نرم‌افزار','تقسیم‌پذیری','کاربردها','مناسب برای','ملاحظه','سطح منبع','منبع','تمام مشخصات تکمیلی'];
    const body = visible.map((g) => [g.vendor,g.model,productKind(g),segmentLabel[g.gpuClass],statusLabel[g.status],g.year,g.architecture,g.memoryGB,baseDisclosureText(g,'memoryGB'),g.memoryType,g.bandwidthTBs,baseDisclosureText(g,'bandwidthTBs'),g.powerW,baseDisclosureText(g,'powerW'),g.generalCoreCount,g.generalCoreLabel,g.matrixCoreCount,g.matrixCoreLabel,rateCsv(g.fp4),rateCsv(g.fp8),rateCsv(g.bf16),rateCsv(g.fp16),g.fp32,g.fp64,rateCsv(g.int8),rateCsv(g.int4),g.formFactor,g.hostInterface,g.cooling,g.interconnect,g.software,g.partitioning,g.workloads.join(' | '),g.bestFit,g.caution,g.sourceTier ?? 'سازنده',g.sourceUrl,(g.extraSpecs ?? []).map((s) => `${s.group} / ${s.label}: ${s.value}${s.basis ? ` [${s.basis}]` : ''}`).join(' | ')]);
    const content = '\ufeff' + [head, ...body].map((row) => row.map(csvCell).join(',')).join('\n');
    const url = URL.createObjectURL(new Blob([content], { type: 'text/csv;charset=utf-8' }));
    const link = document.createElement('a'); link.href = url; link.download = `gpu-comparison-${gpuLastReviewed.iso}.csv`; link.click(); URL.revokeObjectURL(url);
  }

  $: needle = query.trim().toLocaleLowerCase('fa');
  $: filtered = gpuRecords.filter((g) => {
    const text = `${g.vendor} ${g.model} ${g.architecture} ${g.memoryType} ${g.software} ${g.formFactor} ${g.compute} ${(g.extraSpecs ?? []).map((s) => `${s.label} ${s.value}`).join(' ')}`.toLocaleLowerCase('fa');
    return (!needle || text.includes(needle))
      && (!selectedVendors.length || selectedVendors.includes(g.vendor))
      && (!selectedSegments.length || selectedSegments.includes(segmentLabel[g.gpuClass]))
      && (!selectedStatuses.length || selectedStatuses.includes(g.status))
      && (!useCase || g.workloads.includes(useCase))
      && supportsPrecision(g, precision)
      && g.memoryGB >= minMemory
      && (!maxPower || (g.powerW != null && g.powerW <= maxPower));
  });
  $: visible = [...filtered].sort((a, b) => {
    for (const rule of sorts) { const result = compareRows(a, b, rule); if (result) return result; }
    return a.model.localeCompare(b.model, 'en');
  });
  $: comparison = compared.map((id) => gpuRecords.find((g) => g.id === id)).filter(Boolean) as GpuRecord[];
  $: maxMemory = visible.length ? Math.max(...visible.filter((g) => g.dataDisclosure?.memoryGB !== 'not-published').map((g) => g.memoryGB)) : 0;
  $: maxBandwidth = visible.length ? Math.max(...visible.filter((g) => g.dataDisclosure?.bandwidthTBs !== 'not-published').map((g) => g.bandwidthTBs)) : 0;
  $: lowestPower = visible.filter((g) => g.powerW != null).sort((a,b) => (a.powerW ?? Infinity) - (b.powerW ?? Infinity))[0];
  $: totalColumns = 10 + (showCompute ? 6 : 0) + (showExtendedCompute ? 4 : 0) + (showInfra ? 7 : 0);
</script>

<section class="explorer" aria-labelledby="gpu-table-title">
  <header class="heading">
    <div><small>دانشنامهٔ زندهٔ شتاب‌دهنده‌های هوش مصنوعی</small><h2 id="gpu-table-title">هیچ مشخصه‌ای حذف نمی‌شود؛ مبنای آن روشن می‌شود</h2><p>این صفحه کارت، ماژول، پردازنده و سامانهٔ شتاب‌دهنده را—even اگر واحدها و معماری‌شان هم‌سنخ نباشد—در یک مرجع نگه می‌دارد. <strong>هر عدد با دقت، dense/sparse بودن، سطح کارت یا سامانه و وضعیت افشای سازنده</strong> خوانده می‌شود. جدول برای مقایسهٔ سریع است و شناسنامهٔ بازشوندهٔ هر ردیف همهٔ داده‌های ثبت‌شده را نشان می‌دهد.</p></div>
    <div class="stamp"><span>آخرین بازبینی داده‌ها</span><b>{gpuLastReviewed.fa}</b><small>{gpuLastReviewed.gregorian}</small></div>
  </header>

  <div class="rules"><article><span>۰۱</span><b>حافظه تعیین می‌کند مدل جا می‌شود یا نه</b></article><article><span>۰۲</span><b>پهنای‌باند برای LLM اغلب حیاتی است</b></article><article><span>۰۳</span><b>هسته و FLOPS فقط روی مبنای هم‌سنخ معنا دارند</b></article></div>
  <div class="scope"><b>قاعدهٔ خواندن</b><span>سطح هر ردیف در ستون «نوع محصول» مشخص است: کارت، ماژول، پردازنده، سامانه یا سرویس ابری. در FP8 و FP16 عدد اول <strong>dense</strong> و عدد دوم—اگر وجود داشته باشد—<strong>sparse</strong> است. FP32 و FP64 نرخ برداری/عمومی‌اند، نه نرخ Tensor/Matrix؛ بنابراین ستون‌ها عمداً به‌جای یک «عدد AI» مبهم از هم جدا شده‌اند.</span></div>

  <div class="presets" role="navigation" aria-label="فیلترهای سریع">
    <button class:active={preset === 'all'} on:click={() => usePreset('all')}>همه</button><button class:active={preset === 'current'} on:click={() => usePreset('current')}>نسل جاری</button><button class:active={preset === 'local'} on:click={() => usePreset('local')}>مدل محلی ۲۴GB+</button><button class:active={preset === 'efficient'} on:click={() => usePreset('efficient')}>استنتاج تا ۲۰۰ وات</button><button class:active={preset === 'enterprise'} on:click={() => usePreset('enterprise')}>استقرار سازمانی</button><button class:active={preset === 'frontier'} on:click={() => usePreset('frontier')}>مدل‌های مرزی</button>
  </div>

  <details class="filters" open>
    <summary>فیلتر دقیق <span>{fa.format(visible.length)} نتیجه</span></summary>
    <div class="filter-grid">
      <label class="search"><span>مدل، معماری یا پشته</span><input bind:value={query} type="search" placeholder="مثلاً H200، Blackwell یا ROCm" /></label>
      <fieldset><legend>سازنده</legend><div class="checks">{#each vendors as item}<label><input type="checkbox" checked={selectedVendors.includes(item)} on:change={() => { selectedVendors = toggle(selectedVendors, item); preset = 'custom'; }} /><span dir="ltr">{item}</span></label>{/each}</div></fieldset>
      <fieldset><legend>ردهٔ استقرار</legend><div class="checks">{#each segments as item}<label><input type="checkbox" checked={selectedSegments.includes(item)} on:change={() => { selectedSegments = toggle(selectedSegments, item); preset = 'custom'; }} /><span>{item}</span></label>{/each}</div></fieldset>
      <fieldset><legend>وضعیت</legend><div class="checks">{#each statuses as item}<label><input type="checkbox" checked={selectedStatuses.includes(item)} on:change={() => { selectedStatuses = toggle(selectedStatuses, item); preset = 'custom'; }} /><span>{statusLabel[item]}</span></label>{/each}</div></fieldset>
      <label><span>کاربرد غالب</span><select bind:value={useCase} on:change={() => preset = 'custom'}><option value="">همهٔ کاربردها</option>{#each gpuWorkloads as item}<option value={item}>{item}</option>{/each}</select></label>
      <label><span>دقت محاسباتی</span><select bind:value={precision} on:change={() => preset = 'custom'}><option value="">همهٔ دقت‌ها</option><option value="fp4">FP4 / MXFP4</option><option value="fp8">FP8</option><option value="bf16">BF16</option><option value="fp16">FP16</option><option value="fp32">FP32</option><option value="fp64">FP64</option><option value="int8">INT8</option><option value="int4">INT4</option></select></label>
      <label><span>حداقل حافظه</span><select bind:value={minMemory} on:change={() => preset = 'custom'}><option value={0}>بدون محدودیت</option><option value={16}>۱۶ GB</option><option value={24}>۲۴ GB</option><option value={48}>۴۸ GB</option><option value={80}>۸۰ GB</option><option value={128}>۱۲۸ GB</option><option value={192}>۱۹۲ GB</option><option value={256}>۲۵۶ GB</option></select></label>
      <label><span>حداکثر توان</span><select bind:value={maxPower} on:change={() => preset = 'custom'}><option value={0}>بدون محدودیت</option><option value={100}>۱۰۰ W</option><option value={200}>۲۰۰ W</option><option value={350}>۳۵۰ W</option><option value={600}>۶۰۰ W</option><option value={1000}>۱۰۰۰ W</option></select></label>
    </div>
    <div class="filter-actions"><button on:click={reset}>پاک‌کردن فیلترها</button><div><span>گروه ستون‌ها:</span><label><input type="checkbox" bind:checked={showCompute} /> محاسبات پایه</label><label><input type="checkbox" bind:checked={showExtendedCompute} /> دقت‌های تکمیلی</label><label><input type="checkbox" bind:checked={showInfra} /> زیرساخت و نرم‌افزار</label><button class="show-all" on:click={() => { showCompute = true; showExtendedCompute = true; showInfra = true; }}>نمایش همه</button></div></div>
  </details>

  <div class="summary" aria-live="polite"><div><small>نتیجه</small><b>{fa.format(visible.length)}</b><span>از {fa.format(gpuRecords.length)} مدل</span></div><div><small>بیشترین حافظه</small><b>{format(maxMemory)}</b><span>GB</span></div><div><small>بیشترین پهنای‌باند</small><b>{format(maxBandwidth)}</b><span>TB/s؛ با حفظ نوع حافظه</span></div><div><small>کم‌مصرف‌ترین</small><b>{lowestPower ? format(lowestPower.powerW) : 'ثبت نشده'}</b><span>{lowestPower?.model ?? 'توان رسمی در این فیلتر وجود ندارد'}</span></div></div>

  {#if comparison.length}
    <section class="compare"><header><div><small>مقایسهٔ رو در رو</small><b>{fa.format(comparison.length)} از ۴ مدل</b></div><button on:click={() => compared = []}>حذف همه</button></header><div>{#each comparison as gpu}<article><button class="remove" aria-label={`حذف ${gpu.model}`} on:click={() => toggleCompare(gpu.id)}>×</button><div class="brand-mark"><img src={brandLogo(gpu)} alt="" /><span>{brandName(gpu)}</span></div><h3 dir="ltr">{gpu.model}</h3><dl><div><dt>حافظه</dt><dd>{measuredWithUnit(gpu,'memoryGB','GB')}</dd></div><div><dt>FP8 dense</dt><dd>{rateText(gpu,'fp8')}</dd></div><div><dt>FP16 dense</dt><dd>{rateText(gpu,'fp16')}</dd></div><div><dt>FP32</dt><dd>{scalarText(gpu,'fp32')}</dd></div></dl></article>{/each}</div></section>
  {/if}

  <div class="toolbar"><p>عنوان هر ستون را بزنید: نزولی، صعودی، خاموش. تا سه معیار هم‌زمان حفظ می‌شود و عدد کنار عنوان اولویت مرتب‌سازی را نشان می‌دهد.</p><div><button on:click={() => sorts = []}>حذف مرتب‌سازی</button><button class="export" on:click={exportCsv}>دریافت CSV کامل</button></div></div>

  <div class="table-shell" role="region" aria-label="جدول مقایسه GPU؛ افقی پیمایش کنید">
    <table><thead><tr>
      <th class="pick">مقایسه</th><th class="model"><button on:click={() => toggleSort('model')}>مدل <i>{sortMark('model')}</i></button></th><th>نوع</th><th><button on:click={() => toggleSort('segment')}>رده <i>{sortMark('segment')}</i></button></th><th><button on:click={() => toggleSort('status')}>وضعیت <i>{sortMark('status')}</i></button></th><th><button on:click={() => toggleSort('memoryGB')}>حافظه <small>GB</small> <i>{sortMark('memoryGB')}</i></button></th><th><button on:click={() => toggleSort('bandwidthTBs')}>پهنای‌باند <small>TB/s</small> <i>{sortMark('bandwidthTBs')}</i></button></th><th><button on:click={() => toggleSort('powerW')}>توان <small>W</small> <i>{sortMark('powerW')}</i></button></th>
      {#if showCompute}<th class="cores"><button on:click={() => toggleSort('generalCoreCount')}>هستهٔ عمومی <i>{sortMark('generalCoreCount')}</i></button></th><th class="cores"><button on:click={() => toggleSort('matrixCoreCount')}>هسته/موتور ماتریسی <i>{sortMark('matrixCoreCount')}</i></button></th><th class="precision"><button on:click={() => toggleSort('fp8')}>FP8 <small>TFLOPS</small> <i>{sortMark('fp8')}</i></button></th><th class="precision"><button on:click={() => toggleSort('fp16')}>FP16 <small>TFLOPS</small> <i>{sortMark('fp16')}</i></button></th><th><button on:click={() => toggleSort('fp32')}>FP32 <small>TFLOPS</small> <i>{sortMark('fp32')}</i></button></th><th><button on:click={() => toggleSort('fp64')}>FP64 <small>TFLOPS</small> <i>{sortMark('fp64')}</i></button></th>{/if}
      {#if showExtendedCompute}<th class="precision"><button on:click={() => toggleSort('fp4')}>FP4 / MXFP4 <small>TFLOPS</small> <i>{sortMark('fp4')}</i></button></th><th class="precision"><button on:click={() => toggleSort('bf16')}>BF16 <small>TFLOPS</small> <i>{sortMark('bf16')}</i></button></th><th class="precision"><button on:click={() => toggleSort('int8')}>INT8 <small>TOPS</small> <i>{sortMark('int8')}</i></button></th><th class="precision"><button on:click={() => toggleSort('int4')}>INT4 <small>TOPS</small> <i>{sortMark('int4')}</i></button></th>{/if}
      <th>کاربردها</th>
      {#if showInfra}<th><button on:click={() => toggleSort('architecture')}>معماری / سال <i>{sortMark('architecture')}</i></button></th><th><button on:click={() => toggleSort('formFactor')}>فرم‌فکتور <i>{sortMark('formFactor')}</i></button></th><th>رابط میزبان</th><th><button on:click={() => toggleSort('interconnect')}>اتصال چندشتاب‌دهنده <i>{sortMark('interconnect')}</i></button></th><th>خنک‌کاری</th><th><button on:click={() => toggleSort('software')}>پشته <i>{sortMark('software')}</i></button></th><th>تقسیم‌پذیری</th>{/if}
      <th class="detail-head">جزئیات</th>
    </tr></thead><tbody>
      {#each visible as gpu}
        <tr class:roadmap={gpu.status === 'announced'} class:selected={compared.includes(gpu.id)}>
          <td class="pick"><input type="checkbox" checked={compared.includes(gpu.id)} disabled={!compared.includes(gpu.id) && compared.length >= 4} on:change={() => toggleCompare(gpu.id)} aria-label={`مقایسه ${gpu.model}`} /></td>
          <td class="model"><div class="model-cell"><div class="brand-mark"><img src={brandLogo(gpu)} alt="" /><span>{brandName(gpu)}</span></div><b dir="ltr">{gpu.model}</b><small class:preliminary={gpu.status === 'announced'}>{statusLabel[gpu.status]}</small><a href={gpu.sourceUrl} target="_blank" rel="noreferrer">منبع رسمی ↗</a></div></td>
          <td><span class="kind">{productKind(gpu)}</span></td><td><span class="segment">{segmentLabel[gpu.gpuClass]}</span></td><td class="text"><b>{statusLabel[gpu.status]}</b><small>{gpu.sourceTier ?? 'سازنده'}</small></td><td class="num"><b>{gpu.memoryDisplay ?? measuredText(gpu, 'memoryGB')}</b><small>{gpu.memoryType.replace(' ECC','')}</small></td><td class="num"><b>{measuredText(gpu, 'bandwidthTBs')}</b><small>{gpu.dataDisclosure?.bandwidthTBs === 'not-published' ? 'مقدار عمومی ندارد' : 'TB/s'}</small></td><td class="num"><b>{measuredText(gpu, 'powerW')}</b><small>{gpu.dataDisclosure?.powerW === 'not-published' || gpu.powerW == null ? 'مقدار مستقل ندارد' : 'W'}</small></td>
          {#if showCompute}<td class="core-cell"><b>{scalarText(gpu, 'generalCoreCount')}</b><small>{gpu.generalCoreLabel}</small></td><td class="core-cell"><b>{scalarText(gpu, 'matrixCoreCount')}</b><small>{gpu.matrixCoreLabel}</small></td><td class="rate"><b>{rateText(gpu, 'fp8')}</b>{#if gpu.fp8.dense != null}<small>dense</small>{/if}{#if gpu.fp8.sparse != null}<span>{format(gpu.fp8.sparse)} sparse</span>{/if}</td><td class="rate"><b>{rateText(gpu, 'fp16')}</b>{#if gpu.fp16.dense != null}<small>dense</small>{/if}{#if gpu.fp16.sparse != null}<span>{format(gpu.fp16.sparse)} sparse</span>{/if}</td><td class="num"><b>{scalarText(gpu, 'fp32')}</b><small>{gpu.fp32 == null ? disclosureText(gpu, 'fp32') : 'vector'}</small></td><td class="num"><b>{scalarText(gpu, 'fp64')}</b><small>{gpu.fp64 == null ? disclosureText(gpu, 'fp64') : 'vector'}</small></td>{/if}
          {#if showExtendedCompute}<td class="rate"><b>{rateText(gpu, 'fp4')}</b>{#if gpu.fp4?.dense != null}<small>dense / قالب سازنده</small>{/if}{#if gpu.fp4?.sparse != null}<span>{format(gpu.fp4.sparse)} sparse</span>{/if}</td><td class="rate"><b>{rateText(gpu, 'bf16')}</b>{#if gpu.bf16?.dense != null}<small>dense</small>{/if}{#if gpu.bf16?.sparse != null}<span>{format(gpu.bf16.sparse)} sparse</span>{/if}</td><td class="rate"><b>{rateText(gpu, 'int8')}</b>{#if gpu.int8?.dense != null}<small>dense</small>{/if}{#if gpu.int8?.sparse != null}<span>{format(gpu.int8.sparse)} sparse</span>{/if}</td><td class="rate"><b>{rateText(gpu, 'int4')}</b>{#if gpu.int4?.dense != null}<small>dense</small>{/if}{#if gpu.int4?.sparse != null}<span>{format(gpu.int4.sparse)} sparse</span>{/if}</td>{/if}
          <td class="uses">{#each gpu.workloads as item}<span>{item}</span>{/each}</td>
          {#if showInfra}<td class="text"><b>{gpu.architecture}</b><small>{fa.format(gpu.year)}</small></td><td class="text">{gpu.formFactor}</td><td class="text">{gpu.hostInterface}</td><td class="text">{gpu.interconnect}</td><td class="text">{gpu.cooling}</td><td class="text" dir="ltr">{gpu.software}</td><td class="text">{gpu.partitioning}</td>{/if}
          <td class="detail-cell"><button class:open={expanded.includes(gpu.id)} on:click={() => toggleExpanded(gpu.id)} aria-label={`جزئیات ${gpu.model}`}>⌄</button></td>
        </tr>
        {#if expanded.includes(gpu.id)}<tr class="detail-row"><td></td><td colspan={totalColumns - 1}><div class="detail-wrap"><div class="detail-summary"><article><small>مناسب برای</small><p>{gpu.bestFit}</p></article><article class="caution"><small>ملاحظهٔ خرید</small><p>{gpu.caution}</p></article><article><small>تعریف محاسبات</small><p>{gpu.computeFootnote ?? gpu.compute}</p></article><article><small>اصل داده</small><p>«اعلام‌نشده» با صفر یا عدم پشتیبانی یکی نیست. اعداد استخراج‌شده از سامانه صریحاً با همین برچسب نمایش داده می‌شوند.</p></article></div><div class="spec-groups">{#each specGroups as group}{#if specsFor(gpu, group).length}<section><h4>{group}</h4><dl>{#each specsFor(gpu, group) as spec}<div><dt>{spec.label}</dt><dd>{spec.value}{#if 'basis' in spec && spec.basis}<small class:derived={spec.basis === 'استخراج‌شده از سامانه'}>{spec.basis}</small>{/if}</dd></div>{/each}</dl></section>{/if}{/each}</div><a class="detail-source" href={gpu.sourceUrl} target="_blank" rel="noreferrer">{gpu.sourceLabel} — مشاهدهٔ منبع ↗</a></div></td></tr>{/if}
      {:else}<tr class="empty"><td colspan={totalColumns}>با این ترکیب فیلتر، مدلی پیدا نشد. محدودیت حافظه، توان، دقت یا کاربرد را تغییر دهید.</td></tr>{/each}
    </tbody></table>
  </div>

  <section class="method"><article><h3>ناهم‌سنخ حذف نمی‌شود</h3><p>CUDA Core، Stream Processor، WGP، TPC، MME و AI Core واحدهای هم‌ارز نیستند؛ اما هرکدام با نام واقعی خود حفظ می‌شوند تا شناسنامهٔ تراشه ناقص نباشد.</p></article><article><h3>نبود داده هم داده است</h3><p>«پشتیبانی نمی‌شود»، «اعلام نشده»، «قابل‌اعمال نیست» و «استخراج از سامانه» چهار وضعیت جدا هستند. صفر فقط وقتی عدد صفر واقعی باشد استفاده می‌شود.</p></article><article><h3>روال بازبینی ماهانه</h3><p>فهرست مدل‌ها، منابع رسمی، وضعیت عرضه، همهٔ دقت‌ها، حافظه، اتصال، توان، مکانیک، مجازی‌سازی، رسانه و نرم‌افزار بازبینی می‌شوند؛ نتایج آزمایشگاه‌ها لایهٔ مستقل بعدی‌اند.</p></article></section>
</section>

<style>
  .explorer{margin-top:34px;border-top:1px solid var(--line);padding-top:38px}.heading{display:grid;grid-template-columns:minmax(0,1fr) 190px;gap:38px}.heading>div>small{color:var(--teal);font-size:13px;font-weight:800}.heading h2{margin:7px 0 12px;font-size:clamp(30px,4vw,48px);line-height:1.35;letter-spacing:-1.4px}.heading p{max-width:850px;margin:0;color:var(--muted);font-size:16px;line-height:2}.heading strong{color:var(--ink)}.stamp{border:1px solid var(--line);border-top:3px solid var(--teal);padding:15px;display:grid;align-content:center;gap:4px}.stamp span,.stamp small{color:var(--muted);font-size:12px}.stamp b{font-size:17px}.rules{margin:24px 0 0;display:grid;grid-template-columns:repeat(3,1fr);border:1px solid var(--line)}.rules article{min-height:64px;padding:12px 14px;display:grid;grid-template-columns:28px 1fr;gap:7px;align-items:center}.rules article+article{border-inline-start:1px solid var(--line)}.rules span{color:var(--teal);font-size:13px}.rules b{font-size:13px;line-height:1.7}.scope{padding:12px 16px;display:grid;grid-template-columns:110px 1fr;gap:14px;background:color-mix(in srgb,var(--teal) 5%,var(--paper));border:1px solid color-mix(in srgb,var(--teal) 35%,var(--line));border-top:0}.scope b{color:var(--teal);font-size:12px}.scope span{color:var(--muted);font-size:12px;line-height:1.85}.scope strong{color:var(--ink)}
  .presets{display:flex;gap:7px;overflow-x:auto;padding:17px 0 9px}.presets button,.filter-actions button,.toolbar button,.compare button{border:1px solid var(--line);background:var(--paper);color:var(--muted);font:inherit;cursor:pointer}.presets button{flex:0 0 auto;border-radius:99px;padding:7px 13px;font-size:12px}.presets button:hover,.presets button.active{border-color:var(--teal);color:var(--teal);background:color-mix(in srgb,var(--teal) 7%,var(--paper))}
  .filters{border:1px solid var(--line);background:color-mix(in srgb,var(--paper) 94%,var(--soft))}.filters summary{display:flex;justify-content:space-between;padding:12px 15px;font-size:14px;font-weight:800;cursor:pointer}.filters summary span{color:var(--teal);font-weight:600}.filter-grid{padding:14px 15px;display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:14px;border-top:1px solid var(--line)}.filter-grid label,.filter-grid fieldset{min-width:0;margin:0;padding:0;border:0}.filter-grid label>span,.filter-grid legend{display:block;margin-bottom:5px;color:var(--muted);font-size:12px}.filter-grid input[type=search],.filter-grid select{box-sizing:border-box;width:100%;height:38px;border:1px solid var(--line);border-radius:6px;background:var(--bg);color:var(--ink);padding:0 10px;font:inherit;font-size:13px}.search{grid-column:auto}.checks{display:flex;flex-wrap:wrap;gap:5px}.checks label{position:relative}.checks input{position:absolute;opacity:0}.checks label span{display:block;margin:0;border:1px solid var(--line);border-radius:5px;padding:6px 9px;color:var(--muted);font-size:11px;cursor:pointer}.checks input:checked+span{border-color:var(--teal);color:var(--teal);background:color-mix(in srgb,var(--teal) 8%,var(--paper))}.filter-actions{display:flex;justify-content:space-between;align-items:center;padding:10px 15px;border-top:1px solid var(--line)}.filter-actions>button{border:0;color:var(--teal);font-size:12px}.filter-actions>div{display:flex;align-items:center;flex-wrap:wrap;gap:14px}.filter-actions>div>span{color:var(--muted);font-size:11px}.filter-actions label{display:flex;align-items:center;gap:7px;color:var(--muted);font-size:12px}.filter-actions .show-all{border:1px solid var(--teal);border-radius:99px;padding:4px 9px;color:var(--teal);font-size:11px}
  .summary{margin:16px 0;display:grid;grid-template-columns:repeat(4,1fr);border:1px solid var(--line)}.summary>div{padding:11px 14px;display:grid;grid-template-columns:auto 1fr;gap:2px 9px;align-items:baseline}.summary>div+div{border-inline-start:1px solid var(--line)}.summary small{color:var(--muted);font-size:12px}.summary b{justify-self:end;color:var(--teal);font-size:21px}.summary span{grid-column:1/-1;color:var(--muted);font-size:11px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .compare{margin:16px 0;border:1px solid color-mix(in srgb,var(--teal) 45%,var(--line));background:color-mix(in srgb,var(--teal) 4%,var(--paper))}.compare>header{padding:10px 14px;display:flex;justify-content:space-between;border-bottom:1px solid var(--line)}.compare header div{display:flex;gap:8px}.compare header small{color:var(--teal);font-size:11px}.compare header b{font-size:13px}.compare header button{border:0;font-size:11px}.compare>div{display:grid;grid-template-columns:repeat(4,1fr)}.compare article{position:relative;min-width:0;padding:14px}.compare article+article{border-inline-start:1px solid var(--line)}.compare h3{min-height:34px;margin:8px 0 10px;font-size:15px;line-height:1.5;text-align:right}.compare dl{margin:0;display:grid;gap:5px}.compare dl div{display:flex;justify-content:space-between;gap:8px;font-size:12px}.compare dt{color:var(--muted)}.compare dd{margin:0;text-align:left}.remove{position:absolute;inset-inline-end:8px;top:8px;width:24px;height:24px;border-radius:50%}
  .brand-mark{display:flex;align-items:center;gap:7px;width:max-content;direction:ltr}.brand-mark img{width:26px;height:26px;object-fit:contain}.brand-mark span{font:800 10px/1.1 Arial,sans-serif;letter-spacing:.7px;color:var(--muted)}.kind{display:inline-flex;border:1px solid var(--line);border-radius:99px;padding:3px 8px;color:var(--ink);font-size:10px;white-space:nowrap}
  .toolbar{display:flex;justify-content:space-between;gap:18px;margin:14px 0 8px}.toolbar p{max-width:700px;margin:0;color:var(--muted);font-size:12px;line-height:1.8}.toolbar>div{display:flex;gap:6px}.toolbar button{padding:7px 10px;font-size:11px}.toolbar .export{border-color:var(--teal);color:var(--teal)}
  .table-shell{max-height:78vh;overflow:auto;border:1px solid var(--line);background:var(--paper);scrollbar-width:thin}table{width:max-content;min-width:100%;border-collapse:separate;border-spacing:0;font-size:13px}th,td{box-sizing:border-box;min-width:94px;max-width:210px;border-inline-end:1px solid var(--line);border-bottom:1px solid var(--line);padding:9px 8px;text-align:right;vertical-align:middle}th{position:sticky;top:0;z-index:4;height:48px;background:var(--navy);color:#d7e7e5;font-size:12px;white-space:nowrap}th button{display:flex;align-items:center;gap:5px;width:100%;border:0;background:transparent;color:inherit;padding:0;font:inherit;cursor:pointer}th i{color:#78d6cd;font-style:normal;font-size:10px}th small{color:#91aaa7;font-size:10px}td{height:66px;background:var(--paper)}tr:hover td{background:color-mix(in srgb,var(--teal) 5%,var(--paper))}tr.selected td{background:color-mix(in srgb,var(--teal) 9%,var(--paper))}tr.roadmap td{background-image:linear-gradient(135deg,transparent 0 48%,color-mix(in srgb,var(--teal) 4%,transparent) 48% 52%,transparent 52%);background-size:9px 9px}.pick{min-width:54px;width:54px;max-width:54px;text-align:center}.pick input{width:15px;height:15px;accent-color:var(--teal)}.model{position:sticky;right:0;z-index:2;min-width:205px;max-width:205px;box-shadow:-8px 0 14px rgba(0,0,0,.045)}th.model{z-index:6;background:var(--navy)}.model-cell{display:grid;grid-template-columns:auto 1fr;gap:4px 8px;align-items:center}.model-cell b{grid-column:1/-1;font-size:14px;text-align:left}.model-cell>small{font-size:10px;color:var(--muted)}.model-cell>small.preliminary{color:#b77718}.model-cell a{justify-self:end;color:var(--teal);font-size:10px}.segment{color:var(--muted);font-size:11px}.num{text-align:center;direction:ltr}.num b,.core-cell b,.rate b{display:block;color:var(--ink);font-size:14px;line-height:1.35}.num b:only-child,.core-cell b:only-child,.rate b:only-child{font-size:11px;color:var(--muted)}.num small,.core-cell small,.rate small,.text small{display:block;margin-top:2px;color:var(--muted);font-size:10px}.text{color:var(--muted);font-size:11px;line-height:1.65}.text b{color:var(--ink)}.uses{min-width:165px}.uses span{display:inline-block;margin:2px;border:1px solid var(--line);border-radius:99px;padding:3px 7px;color:var(--muted);font-size:10px;white-space:nowrap}.cores{min-width:135px}.precision{min-width:125px}.core-cell{min-width:135px;text-align:center;direction:ltr}.core-cell small{white-space:normal}.rate{min-width:125px;text-align:center;direction:ltr}.rate span{display:block;margin-top:3px;color:var(--teal);font-size:10px}.detail-head,.detail-cell{min-width:62px;max-width:62px;text-align:center}.detail-cell button{width:30px;height:30px;border:1px solid var(--line);border-radius:50%;background:transparent;color:var(--teal);cursor:pointer;transition:transform .2s,background .2s}.detail-cell button.open{transform:rotate(180deg);background:var(--soft)}.detail-row td{height:auto;padding:0;background:color-mix(in srgb,var(--soft) 40%,var(--paper))}.detail-row td:nth-child(2){position:static;box-shadow:none}.detail-wrap{position:sticky;right:0;box-sizing:border-box;width:calc(100vw - 238px);padding:20px}.detail-summary{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}.detail-summary article{min-height:72px;border-top:1px solid var(--line);padding-top:8px}.detail-summary article.caution{border-top-color:#b76f5d}.detail-summary small{color:var(--teal);font-size:11px}.detail-summary .caution small{color:#b76f5d}.detail-summary p{margin:4px 0 0;color:var(--muted);font-size:11px;line-height:1.85}.spec-groups{margin-top:18px;column-count:4;column-gap:12px}.spec-groups section{display:inline-block;width:100%;margin:0 0 12px;border:1px solid var(--line);background:var(--paper);break-inside:avoid}.spec-groups h4{margin:0;padding:9px 11px;border-bottom:1px solid var(--line);color:var(--teal);font-size:12px}.spec-groups dl{margin:0}.spec-groups dl>div{display:grid;grid-template-columns:minmax(92px,.7fr) 1.3fr;gap:8px;padding:7px 10px;border-bottom:1px solid var(--line)}.spec-groups dl>div:last-child{border-bottom:0}.spec-groups dt{color:var(--muted);font-size:10px}.spec-groups dd{margin:0;color:var(--ink);font-size:11px;line-height:1.6}.spec-groups dd small{display:block;margin-top:2px;color:var(--muted);font-size:9px}.spec-groups dd small.derived{color:#b77718}.detail-source{display:inline-flex;margin-top:14px;color:var(--teal);font-size:11px;font-weight:700}.empty td{padding:36px;text-align:center;color:var(--muted)}
  .model{min-width:195px;max-width:195px}
  .method{margin-top:20px;display:grid;grid-template-columns:repeat(3,1fr);border-block:1px solid var(--line)}.method article{padding:18px}.method article+article{border-inline-start:1px solid var(--line)}.method h3{margin:0 0 7px;font-size:14px}.method p{margin:0;color:var(--muted);font-size:12px;line-height:1.9}
  @media(max-width:1250px){.filter-grid{grid-template-columns:repeat(4,1fr)}.spec-groups{column-count:3}}
  @media(max-width:980px){.detail-wrap{width:calc(100vw - 222px)}}
  @media(max-width:920px){.filter-grid{grid-template-columns:repeat(2,1fr)}.compare>div{grid-template-columns:repeat(2,1fr)}.detail-summary{grid-template-columns:repeat(2,1fr)}.spec-groups{column-count:2}.method{grid-template-columns:1fr}.method article+article{border-inline-start:0;border-top:1px solid var(--line)}}
  @media(max-width:700px){.detail-wrap{width:calc(100vw - 28px)}}
  @media(max-width:650px){.explorer{padding-top:28px}.heading{grid-template-columns:1fr;gap:18px}.stamp{max-width:240px}.rules{grid-template-columns:1fr}.rules article+article{border-inline-start:0;border-top:1px solid var(--line)}.scope{grid-template-columns:1fr;gap:4px}.filter-grid{grid-template-columns:1fr}.search{grid-column:auto}.filter-actions{align-items:flex-start;gap:10px;flex-direction:column}.filter-actions>div{display:grid;gap:5px}.summary{grid-template-columns:repeat(2,1fr)}.summary>div:nth-child(3){border-inline-start:0;border-top:1px solid var(--line)}.summary>div:nth-child(4){border-top:1px solid var(--line)}.compare>div{grid-template-columns:1fr}.compare article+article{border-inline-start:0;border-top:1px solid var(--line)}.detail-summary{grid-template-columns:1fr}.spec-groups{column-count:1}.toolbar{align-items:flex-start;flex-direction:column}.model{min-width:180px;max-width:180px}.table-shell{max-height:70vh}table{font-size:11px}}
</style>
