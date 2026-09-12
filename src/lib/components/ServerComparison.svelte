<script lang="ts">
  import { imageAttributes } from '$lib/images';
  import { hardwareText, hardwareServers, hardwareGpuProfiles, type HardwareLocale } from '$lib/i18n/gpu';


  export let locale: HardwareLocale = 'fa';
  $: t = (value: unknown) => hardwareText(value, locale);
  $: serverRecords = hardwareServers(locale);
  $: serverGpuProfiles = hardwareGpuProfiles(locale);
  import {
    serverLastReviewed,
    serverRecords as sourceServerRecords,
    type AcceleratorForm,
    type CardCooling,
    type GpuTopology,
    type ServerGpuProfile,
    type ServerRecord,
    type ServerStatus,
    type ServerVendor,
    type SystemCooling
  } from '$lib/server-data';

  type SortKey = 'model' | 'vendor' | 'status' | 'heightU' | 'depthMm' | 'pcieGeneration' | 'gpuCount' | 'gpuPower';
  type SortRule = { key: SortKey; direction: 'asc' | 'desc' };
  type ColumnKey = 'type' | 'status' | 'interface' | 'topology' | 'capacity' | 'cardCooling' | 'gpuPower' | 'dimensions' | 'systemCooling' | 'cpu' | 'memory' | 'storage' | 'expansion' | 'power' | 'validated' | 'source';
  type CompatibilityState = 'validated' | 'review' | 'incompatible';

  $: numbers = new Intl.NumberFormat(locale === 'fa' ? 'fa-IR' : locale === 'es' ? 'es-ES' : 'en-US', { maximumFractionDigits: 1 });
  const vendors = Array.from(new Set(sourceServerRecords.map((record) => record.vendor))).sort((a, b) => a.localeCompare(b, 'en'));
  const statusLabel: Record<ServerStatus, string> = { current: 'نسل جاری', legacy: 'نسل قبل', announced: 'اعلام‌شده' };
  const formLabel: Record<AcceleratorForm, string> = { 'pcie-card': 'کارت PCIe قابل‌نصب', integrated: 'شتاب‌دهندهٔ یکپارچه' };
  const topologyLabel: Record<GpuTopology, string> = { direct: 'مستقیم به CPU', switched: 'از طریق PCIe Switch', baseboard: 'Baseboard / NVLink' };
  const cardCoolingLabel: Record<CardCooling, string> = { passive: 'Passive', active: 'Active', liquid: 'Liquid' };
  const systemCoolingLabel: Record<SystemCooling, string> = { air: 'هوا', dlc: 'مایع مستقیم' };
  const compatibilityLabel: Record<CompatibilityState, string> = {
    validated: 'تأیید صریح سازنده', review: 'نیازمند تأیید BOM', incompatible: 'نامناسب برای انتخاب فعلی'
  };
  const columnLabel: Record<ColumnKey, string> = {
    type: 'نوع سامانه', status: 'وضعیت', interface: 'رابط GPU', topology: 'توپولوژی', capacity: 'ظرفیت کارت', cardCooling: 'نوع کارت', gpuPower: 'توان هر GPU', dimensions: 'ابعاد رک', systemCooling: 'خنک‌کاری سامانه', cpu: 'پردازنده', memory: 'حافظه', storage: 'ذخیره‌سازی', expansion: 'توسعه', power: 'برق و PSU', validated: 'GPUهای تأییدشده', source: 'منبع رسمی'
  };
  const baseColumns: ColumnKey[] = ['type', 'status', 'interface', 'capacity', 'dimensions'];
  const compatibilityColumns: ColumnKey[] = ['topology', 'cardCooling', 'gpuPower', 'validated'];
  const platformColumns: ColumnKey[] = ['systemCooling', 'cpu', 'memory', 'storage', 'expansion', 'power', 'source'];
  const sortableColumn: Partial<Record<ColumnKey, SortKey>> = {
    status: 'status', interface: 'pcieGeneration', capacity: 'gpuCount', gpuPower: 'gpuPower', dimensions: 'heightU'
  };

  let query = '';
  let selectedVendors: ServerVendor[] = [];
  let selectedStatuses: ServerStatus[] = [];
  let acceleratorForm: AcceleratorForm | 'all' = 'pcie-card';
  let selectedProfileId = '';
  let requiredPcieGeneration = 0;
  let requiredGpuCount = 0;
  let cardWidth: 'any' | 'single' | 'double' | 'wide' = 'any';
  let cardCooling: CardCooling | 'any' = 'any';
  let requiredGpuPower = 0;
  let maxHeightU = 0;
  let maxDepthMm = 0;
  let systemCooling: SystemCooling | 'any' = 'any';
  let topology: GpuTopology | 'any' = 'any';
  let onlyValidated = false;
  let allowDownshift = false;
  let showCompatibility = true;
  let showPlatform = false;
  let preset = 'all';
  let hiddenColumns: ColumnKey[] = [];
  let sorts: SortRule[] = [{ key: 'gpuCount', direction: 'desc' }, { key: 'heightU', direction: 'asc' }];
  let compared: string[] = [];
  let expanded: string[] = [];

  const toggle = <T,>(items: T[], value: T) => items.includes(value) ? items.filter((item) => item !== value) : [...items, value];
  const brandLogo = (vendor: ServerVendor) => `/images/server-brands/${vendor.toLowerCase().replaceAll(' ', '-').replace('asrock-rack', 'asrock')}.svg`;
  const format = (value: number | null, suffix = '') => value == null ? 'اعلام‌نشده' : `${numbers.format(value)}${suffix}`;
  const hideColumn = (key: ColumnKey) => { if (!hiddenColumns.includes(key)) hiddenColumns = [...hiddenColumns, key]; };
  const restoreColumn = (key: ColumnKey) => { hiddenColumns = hiddenColumns.filter((item) => item !== key); };
  const showAllColumns = () => { hiddenColumns = []; showCompatibility = true; showPlatform = true; };
  const selectedProfile = () => serverGpuProfiles.find((profile) => profile.id === selectedProfileId);

  function capacity(record: ServerRecord, width: typeof cardWidth | ServerGpuProfile['widthSlots']) {
    if (width === 'single' || width === 1) return record.maxSingleWidthGpus ?? record.maxDoubleWidthGpus;
    if (width === 'wide' || width === 3 || width === 4) return record.maxTripleWidthGpus;
    if (width === 'double' || width === 2) return record.maxDoubleWidthGpus;
    return Math.max(record.maxDoubleWidthGpus, record.maxSingleWidthGpus ?? 0, record.maxTripleWidthGpus);
  }

  function compatibility(record: ServerRecord): CompatibilityState | null {
    const profile = selectedProfile();
    if (!profile) return null;
    if (record.acceleratorForm !== 'pcie-card' || record.pcieGeneration == null) return 'incompatible';
    if (record.pcieGeneration < profile.pcieGeneration && !allowDownshift) return 'incompatible';
    if (capacity(record, profile.widthSlots) < Math.max(requiredGpuCount, 1)) return 'incompatible';
    if (!record.cardCooling.includes(profile.cooling)) return 'incompatible';
    if (record.maxGpuPowerW != null && record.maxGpuPowerW < profile.powerW) return 'incompatible';
    if (record.validatedGpuIds.includes(profile.id)) return 'validated';
    return 'review';
  }

  function reset() {
    query = ''; selectedVendors = []; selectedStatuses = []; acceleratorForm = 'pcie-card'; selectedProfileId = '';
    requiredPcieGeneration = 0; requiredGpuCount = 0; cardWidth = 'any'; cardCooling = 'any'; requiredGpuPower = 0;
    maxHeightU = 0; maxDepthMm = 0; systemCooling = 'any'; topology = 'any'; onlyValidated = false; allowDownshift = false;
    preset = 'all'; showCompatibility = true; showPlatform = false; hiddenColumns = [];
    sorts = [{ key: 'gpuCount', direction: 'desc' }, { key: 'heightU', direction: 'asc' }]; compared = []; expanded = [];
  }

  function applyProfile(profileId: string) {
    selectedProfileId = profileId;
    const profile = serverGpuProfiles.find((item) => item.id === profileId);
    if (!profile) { requiredPcieGeneration = 0; cardWidth = 'any'; cardCooling = 'any'; requiredGpuPower = 0; onlyValidated = false; return; }
    acceleratorForm = 'pcie-card'; requiredPcieGeneration = profile.pcieGeneration;
    cardWidth = profile.widthSlots === 1 ? 'single' : profile.widthSlots === 2 ? 'double' : 'wide';
    cardCooling = profile.cooling; requiredGpuPower = profile.powerW; onlyValidated = false; allowDownshift = false;
  }

  function usePreset(value: string) {
    reset(); preset = value;
    if (value === 'pcie4-8') { requiredPcieGeneration = 4; requiredGpuCount = 8; cardWidth = 'double'; }
    if (value === 'pcie5-8') { requiredPcieGeneration = 5; requiredGpuCount = 8; cardWidth = 'double'; requiredGpuPower = 600; }
    if (value === 'compact') { maxHeightU = 2; requiredGpuCount = 1; }
    if (value === 'rtx5090') { applyProfile('rtx-5090'); requiredGpuCount = 1; }
    if (value === 'rtx4090') { applyProfile('rtx-4090'); requiredGpuCount = 1; }
    if (value === 'integrated') { acceleratorForm = 'integrated'; selectedProfileId = ''; }
    if (value === 'legacy') { selectedStatuses = ['legacy']; acceleratorForm = 'pcie-card'; requiredPcieGeneration = 4; }
  }

  function toggleSort(key: SortKey) {
    const rule = sorts.find((item) => item.key === key);
    if (!rule) {
      sorts = [{ key, direction: key === 'model' || key === 'vendor' ? 'asc' : 'desc' }, ...sorts].slice(0, 3) as SortRule[];
      return;
    }

    const direction = rule.direction === 'desc' ? 'asc' : 'desc';
    sorts = [{ ...rule, direction }, ...sorts.filter((item) => item.key !== key)].slice(0, 3) as SortRule[];
  }

  $: sortMarks = new Map(sorts.map((rule, index) => [rule.key, `${numbers.format(index + 1)} ${rule.direction === 'desc' ? '↓' : '↑'}`]));

  function sortMark(key: SortKey, currentSorts: SortRule[]) {
    const index = currentSorts.findIndex((rule) => rule.key === key);
    if (index < 0) return '—';
    return `${numbers.format(index + 1)} ${currentSorts[index].direction === 'desc' ? '↓' : '↑'}`;
  }

  function sortValue(record: ServerRecord, key: SortKey): string | number | null {
    if (key === 'model') return record.model;
    if (key === 'vendor') return record.vendor;
    if (key === 'status') return ['legacy', 'announced', 'current'].indexOf(record.status);
    if (key === 'heightU') return record.heightU;
    if (key === 'depthMm') return record.depthMm;
    if (key === 'pcieGeneration') return record.pcieGeneration;
    if (key === 'gpuPower') return record.maxGpuPowerW;
    return capacity(record, cardWidth);
  }

  function compareRows(a: ServerRecord, b: ServerRecord, rule: SortRule) {
    const av = sortValue(a, rule.key); const bv = sortValue(b, rule.key);
    if (av == null && bv == null) return 0; if (av == null) return 1; if (bv == null) return -1;
    const result = typeof av === 'number' && typeof bv === 'number' ? av - bv : String(av).localeCompare(String(bv), locale);
    return rule.direction === 'asc' ? result : -result;
  }

  function toggleCompare(id: string) {
    if (compared.includes(id)) compared = compared.filter((item) => item !== id);
    else if (compared.length < 4) compared = [...compared, id];
  }

  function cardCapacityText(record: ServerRecord) {
    if (record.acceleratorForm === 'integrated') return record.acceleratorSummary;
    const parts = [`${numbers.format(record.maxDoubleWidthGpus)} ${t("دو اسلات")}`];
    if (record.maxSingleWidthGpus != null) parts.push(`${numbers.format(record.maxSingleWidthGpus)} ${t("تک‌اسلات")}`);
    if (record.maxTripleWidthGpus) parts.push(`${numbers.format(record.maxTripleWidthGpus)} ${t("سه‌اسلات")}`);
    return parts.join(' · ');
  }

  function validatedText(record: ServerRecord) {
    if (!record.validatedGpuIds.length) return 'مدل دقیق را در configurator/QPL کنترل کنید';
    return record.validatedGpuIds.map((id) => serverGpuProfiles.find((profile) => profile.id === id)?.label ?? id).map(t).join(locale === 'fa' ? '، ' : ', ');
  }

  function specs(record: ServerRecord) {
    return [
      { group: 'هویت و وضعیت', label: 'سازنده', value: record.vendor },
      { group: 'هویت و وضعیت', label: 'مدل', value: record.model },
      { group: 'هویت و وضعیت', label: 'وضعیت عرضه', value: statusLabel[record.status] },
      { group: 'هویت و وضعیت', label: 'نوع سامانه', value: formLabel[record.acceleratorForm] },
      { group: 'سازگاری کارت', label: 'نتیجه برای کارت انتخابی', value: compatibility(record) ? compatibilityLabel[compatibility(record)!] : 'کارتی انتخاب نشده است' },
      { group: 'سازگاری کارت', label: 'رابط میزبان', value: record.pcieGeneration ? `PCIe Gen${record.pcieGeneration}` : 'درون‌سامانه‌ای' },
      { group: 'سازگاری کارت', label: 'توپولوژی GPU', value: topologyLabel[record.gpuTopology] },
      { group: 'سازگاری کارت', label: 'ظرفیت', value: cardCapacityText(record) },
      { group: 'سازگاری کارت', label: 'سقف توان هر GPU', value: record.maxGpuPowerW == null ? 'اعلام‌نشده؛ BOM لازم است' : `${numbers.format(record.maxGpuPowerW)} ${t("وات")}` },
      { group: 'سازگاری کارت', label: 'خنک‌کاری کارت', value: record.cardCooling.length ? record.cardCooling.map((item) => cardCoolingLabel[item]).map(t).join(locale === 'fa' ? '، ' : ', ') : 'کارت مستقل قابل نصب نیست' },
      { group: 'سازگاری کارت', label: 'GPUهای نام‌برده در منبع رسمی', value: validatedText(record) },
      { group: 'مکانیک و مرکز داده', label: 'ارتفاع', value: `${numbers.format(record.heightU)}U` },
      { group: 'مکانیک و مرکز داده', label: 'عمق بدنه', value: record.depthMm == null ? 'در صفحهٔ مرجع ثبت نشده' : `${numbers.format(record.depthMm)} ${t("میلی‌متر")}` },
      { group: 'مکانیک و مرکز داده', label: 'خنک‌کاری سامانه', value: record.systemCooling.map((item) => systemCoolingLabel[item]).map(t).join(locale === 'fa' ? '، ' : ', ') },
      { group: 'پلتفرم', label: 'پردازنده', value: record.cpu },
      { group: 'پلتفرم', label: 'حافظه', value: record.memory },
      { group: 'پلتفرم', label: 'ذخیره‌سازی', value: record.storage },
      { group: 'پلتفرم', label: 'توسعه و شبکه', value: record.expansion },
      { group: 'پلتفرم', label: 'برق و PSU', value: record.power },
      { group: 'تصمیم خرید', label: 'مناسب برای', value: record.bestFor },
      { group: 'تصمیم خرید', label: 'هشدار', value: record.caution },
      { group: 'منبع', label: 'سطح منبع', value: record.sourceTier },
      { group: 'منبع', label: 'مرجع', value: record.sourceLabel }
    ];
  }

  function cellText(record: ServerRecord, key: ColumnKey) {
    if (key === 'type') return formLabel[record.acceleratorForm];
    if (key === 'status') return statusLabel[record.status];
    if (key === 'interface') return record.pcieGeneration ? `PCIe Gen${record.pcieGeneration}` : 'یکپارچه';
    if (key === 'topology') return topologyLabel[record.gpuTopology];
    if (key === 'capacity') return cardCapacityText(record);
    if (key === 'cardCooling') return record.cardCooling.length ? record.cardCooling.map((item) => cardCoolingLabel[item]).join(' / ') : 'کارت مستقل ندارد';
    if (key === 'gpuPower') return record.maxGpuPowerW == null ? 'نیازمند BOM' : `${numbers.format(record.maxGpuPowerW)} W`;
    if (key === 'dimensions') return `${numbers.format(record.heightU)}U${record.depthMm == null ? '' : ` · ${numbers.format(record.depthMm)} mm`}`;
    if (key === 'systemCooling') return record.systemCooling.map((item) => t(systemCoolingLabel[item])).join(' / ');
    if (key === 'cpu') return record.cpu;
    if (key === 'memory') return record.memory;
    if (key === 'storage') return record.storage;
    if (key === 'expansion') return record.expansion;
    if (key === 'power') return record.power;
    if (key === 'validated') return validatedText(record);
    return record.sourceLabel;
  }

  function csvCell(value: string | number | null | undefined) { return `"${t(value).replaceAll('"', '""')}"`; }
  function exportCsv() {
    const head = ['سازنده','مدل','وضعیت','نوع','PCIe','توپولوژی','GPU دو اسلات','GPU تک اسلات','GPU سه اسلات','سقف توان هر GPU','خنک‌کاری کارت','ارتفاع U','عمق mm','خنک‌کاری سامانه','CPU','حافظه','ذخیره‌سازی','توسعه','برق','GPUهای تأییدشده','مناسب برای','هشدار','منبع'];
    const body = visible.map((r) => [r.vendor,r.model,statusLabel[r.status],formLabel[r.acceleratorForm],r.pcieGeneration,topologyLabel[r.gpuTopology],r.maxDoubleWidthGpus,r.maxSingleWidthGpus,r.maxTripleWidthGpus,r.maxGpuPowerW,r.cardCooling.join('|'),r.heightU,r.depthMm,r.systemCooling.join('|'),r.cpu,r.memory,r.storage,r.expansion,r.power,validatedText(r),r.bestFor,r.caution,r.sourceUrl]);
    const content = '\ufeff' + [head, ...body].map((row) => row.map(csvCell).join(',')).join('\n');
    const url = URL.createObjectURL(new Blob([content], { type: 'text/csv;charset=utf-8' }));
    const link = document.createElement('a'); link.href = url; link.download = `gpu-server-reference-${serverLastReviewed.iso}.csv`; link.click(); URL.revokeObjectURL(url);
  }

  $: needle = query.trim().toLocaleLowerCase(locale);
  $: filtered = serverRecords.filter((record) => {
    const text = `${record.vendor} ${record.model} ${record.cpu} ${record.memory} ${record.acceleratorSummary} ${validatedText(record)}`.toLocaleLowerCase(locale);
    const selectedCompatibility = compatibility(record);
    const generationOkay = !requiredPcieGeneration || (record.pcieGeneration != null && (record.pcieGeneration >= requiredPcieGeneration || allowDownshift));
    const powerOkay = !requiredGpuPower || record.maxGpuPowerW == null || record.maxGpuPowerW >= requiredGpuPower;
    return (!needle || text.includes(needle))
      && (!selectedVendors.length || selectedVendors.includes(record.vendor))
      && (!selectedStatuses.length || selectedStatuses.includes(record.status))
      && (acceleratorForm === 'all' || record.acceleratorForm === acceleratorForm)
      && generationOkay
      && (!requiredGpuCount || capacity(record, cardWidth) >= requiredGpuCount)
      && (cardCooling === 'any' || record.cardCooling.includes(cardCooling))
      && powerOkay
      && (!maxHeightU || record.heightU <= maxHeightU)
      && (!maxDepthMm || (record.depthMm != null && record.depthMm <= maxDepthMm))
      && (systemCooling === 'any' || record.systemCooling.includes(systemCooling))
      && (topology === 'any' || record.gpuTopology === topology)
      && (!selectedProfileId || selectedCompatibility !== 'incompatible')
      && (!onlyValidated || selectedCompatibility === 'validated');
  });
  $: visible = [...filtered].sort((a, b) => {
    for (const rule of sorts) { const result = compareRows(a, b, rule); if (result) return result; }
    return a.model.localeCompare(b.model, 'en');
  });
  $: comparison = compared.map((id) => serverRecords.find((record) => record.id === id)).filter(Boolean) as ServerRecord[];
  $: specGroups = ['هویت و وضعیت', 'سازگاری کارت', 'مکانیک و مرکز داده', 'پلتفرم', 'تصمیم خرید', 'منبع'];
  $: comparisonGroups = specGroups.map((group) => ({
    group,
    rows: Array.from(new Set(comparison.flatMap((record) => specs(record).filter((item) => item.group === group).map((item) => item.label)))).map((label) => ({
      label, values: comparison.map((record) => specs(record).find((item) => item.group === group && item.label === label)?.value ?? '—')
    }))
  })).filter((group) => group.rows.length);
  $: activeColumns = [
    ...baseColumns,
    ...(showCompatibility ? compatibilityColumns : []),
    ...(showPlatform ? platformColumns : [])
  ].filter((column) => !hiddenColumns.includes(column));
  $: totalColumns = 3 + activeColumns.length;
  $: selectedProfileRecord = serverGpuProfiles.find((profile) => profile.id === selectedProfileId);
  $: validatedMatches = visible.filter((record) => compatibility(record) === 'validated').length;
  $: pcieMatches = visible.filter((record) => record.acceleratorForm === 'pcie-card').length;
</script>

<section class="explorer" dir={locale === 'fa' ? 'rtl' : 'ltr'} aria-labelledby="server-table-title">
  <header class="heading">
    <div>
      <small>{t("مرجع انتخاب سرور GPU")}</small>
      <h2 id="server-table-title">{t("اول کارت را تعریف کنید؛ بعد سرور را انتخاب کنید")}</h2>
      <p>{t("این جدول میان")} <strong>{t("کارت PCIe قابل‌نصب")}</strong> {t("و سامانه‌های یکپارچهٔ HGX/SXM/OAM تفکیک می‌کند. نسل رابط، تعداد و عرض کارت، توان، نوع خنک‌کاری، ارتفاع و عمق رک هم‌زمان بررسی می‌شوند. هر رکورد به صفحه یا راهنمای رسمی سازنده پیوند دارد.")}</p>
    </div>
    <div class="stamp"><span>{t("آخرین بازبینی داده‌ها")}</span><b>{locale === 'fa' ? serverLastReviewed.fa : serverLastReviewed.gregorian}</b>{#if locale === 'fa'}<small>{serverLastReviewed.gregorian}</small>{/if}</div>
  </header>

  <div class="rules">
    <article><span>{t("۰۱")}</span><b>{t("PCIe 5 روی Gen4 ممکن است کار کند، اما full-speed نیست")}</b></article>
    <article><span>{t("۰۲")}</span><b>{t("دو اسلات با سه یا چهار اسلات قابل‌جایگزینی نیست")}</b></article>
    <article><span>{t("۰۳")}</span><b>{t("شمارهٔ قطعه، کابل، PSU و firmware جزئی از سازگاری‌اند")}</b></article>
  </div>
  <div class="scope"><b>{t("مرز اطمینان")}</b><span>{t("«تأیید سازنده» فقط وقتی نمایش داده می‌شود که همان مدل GPU در صفحه، QuickSpecs یا QPL رسمی آن سرور آمده باشد. تطابق ابعاد و توان بدون نام‌بردن رسمی کارت، «نیازمند تأیید BOM» است.")}</span></div>

  <div class="presets" aria-label={t("سناریوهای سریع")}>
    <button type="button" aria-pressed={preset === 'all'} class:active={preset === 'all'} on:click={() => reset()}>{t("همهٔ PCIe")}</button>
    <button type="button" aria-pressed={preset === 'pcie4-8'} class:active={preset === 'pcie4-8'} on:click={() => usePreset('pcie4-8')}>{t("۸ کارت PCIe 4 دو اسلات")}</button>
    <button type="button" aria-pressed={preset === 'pcie5-8'} class:active={preset === 'pcie5-8'} on:click={() => usePreset('pcie5-8')}>{t("۸ کارت PCIe 5 تا ۶۰۰W")}</button>
    <button type="button" aria-pressed={preset === 'compact'} class:active={preset === 'compact'} on:click={() => usePreset('compact')}>{t("حداکثر ۲U")}</button>
    <button type="button" aria-pressed={preset === 'rtx5090'} class:active={preset === 'rtx5090'} on:click={() => usePreset('rtx5090')}>RTX 5090</button>
    <button type="button" aria-pressed={preset === 'rtx4090'} class:active={preset === 'rtx4090'} on:click={() => usePreset('rtx4090')}>RTX 4090</button>
    <button type="button" aria-pressed={preset === 'legacy'} class:active={preset === 'legacy'} on:click={() => usePreset('legacy')}>{t("سرور PCIe 4 نسل قبل")}</button>
    <button type="button" aria-pressed={preset === 'integrated'} class:active={preset === 'integrated'} on:click={() => usePreset('integrated')}>{t("HGX / SXM / OAM یکپارچه")}</button>
  </div>

  <details class="filters">
    <summary>{t("فیلترهای انتخاب و سازگاری")} <span>{t(numbers.format(visible.length))} {t("نتیجه")}</span></summary>
    <div class="filter-grid">
      <label class="search"><span>{t("جست‌وجو")}</span><input type="search" bind:value={query} placeholder={t("سازنده، مدل، CPU یا GPU")} /></label>
      <label><span>{t("کارت من")}</span><select value={selectedProfileId} on:change={(event) => applyProfile(event.currentTarget.value)}><option value="">{t("انتخاب دستی مشخصات")}</option>{#each serverGpuProfiles as profile}<option value={profile.id}>{t(profile.label)}</option>{/each}</select></label>
      <label><span>{t("نوع سامانه")}</span><select bind:value={acceleratorForm}><option value="all">{t("همه")}</option><option value="pcie-card">{t("کارت PCIe قابل‌نصب")}</option><option value="integrated">{t("HGX/SXM/OAM یکپارچه")}</option></select></label>
      <label><span>{t("حداقل نسل شیار")}</span><select bind:value={requiredPcieGeneration}><option value={0}>{t("مهم نیست")}</option><option value={4}>{t("PCIe 4 یا بالاتر")}</option><option value={5}>{t("PCIe 5 یا بالاتر")}</option><option value={6}>PCIe 6</option></select></label>
      <label><span>{t("حداقل تعداد کارت")}</span><select bind:value={requiredGpuCount}><option value={0}>{t("مهم نیست")}</option>{#each [1,2,3,4,6,8,10,16,20] as count}<option value={count}>{t(numbers.format(count))} {locale === 'en' ? 'cards' : locale === 'es' ? 'tarjetas' : t("کارت")}</option>{/each}</select></label>
      <label><span>{t("عرض کارت")}</span><select bind:value={cardWidth}><option value="any">{t("مهم نیست")}</option><option value="single">{t("تک‌اسلات")}</option><option value="double">{t("دو اسلات")}</option><option value="wide">{t("سه/چهار اسلات")}</option></select></label>
      <label><span>{t("خنک‌کاری خود کارت")}</span><select bind:value={cardCooling}><option value="any">{t("مهم نیست")}</option><option value="passive">{t("Passive")}</option><option value="active">{t("Active")}</option><option value="liquid">{t("Liquid")}</option></select></label>
      <label><span>{t("حداقل توان هر GPU")}</span><select bind:value={requiredGpuPower}><option value={0}>{t("مهم نیست")}</option>{#each [75,150,300,350,400,450,575,600,700,1000] as watts}<option value={watts}>{t(numbers.format(watts))} {t("وات")}</option>{/each}</select></label>
      <label><span>{t("حداکثر ارتفاع")}</span><select bind:value={maxHeightU}><option value={0}>{t("مهم نیست")}</option>{#each [1,2,3,4,5,6,8,10] as units}<option value={units}>{t(numbers.format(units))}U</option>{/each}</select></label>
      <label><span>{t("حداکثر عمق رک")}</span><select bind:value={maxDepthMm}><option value={0}>{t("مهم نیست")}</option><option value={750}>{t("۷۵۰ mm")}</option><option value={850}>{t("۸۵۰ mm")}</option><option value={900}>{t("۹۰۰ mm")}</option><option value={1000}>{t("۱۰۰۰ mm")}</option></select></label>
      <label><span>{t("خنک‌کاری سامانه")}</span><select bind:value={systemCooling}><option value="any">{t("مهم نیست")}</option><option value="air">{t("هوا")}</option><option value="dlc">{t("مایع مستقیم")}</option></select></label>
      <label><span>{t("توپولوژی")}</span><select bind:value={topology}><option value="any">{t("مهم نیست")}</option><option value="direct">{t("مستقیم به CPU")}</option><option value="switched">{t("PCIe Switch")}</option><option value="baseboard">{t("Baseboard / NVLink")}</option></select></label>
      <fieldset><legend>{t("سازنده")}</legend><div class="checks">{#each vendors as vendor}<label><input type="checkbox" checked={selectedVendors.includes(vendor)} on:change={() => selectedVendors = toggle(selectedVendors, vendor)} /><span>{t(vendor)}</span></label>{/each}</div></fieldset>
      <fieldset><legend>{t("وضعیت محصول")}</legend><div class="checks">{#each Object.entries(statusLabel) as [status, label]}<label><input type="checkbox" checked={selectedStatuses.includes(status as ServerStatus)} on:change={() => selectedStatuses = toggle(selectedStatuses, status as ServerStatus)} /><span>{t(label)}</span></label>{/each}</div></fieldset>
    </div>
    <div class="filter-actions">
      <button type="button" on:click={reset}>{locale === 'fa' ? 'بازنشانی کامل' : locale === 'en' ? 'Reset all' : 'Restablecer todo'}</button>
      <div>
        {#if selectedProfileId}<label><input type="checkbox" bind:checked={onlyValidated} /> {t("فقط تأیید صریح سازنده")}</label><label><input type="checkbox" bind:checked={allowDownshift} /> {t("نمایش شیار نسل پایین‌تر با هشدار افت سرعت")}</label>{/if}
        <label><input type="checkbox" bind:checked={showCompatibility} /> {t("ستون‌های سازگاری")}</label>
        <label><input type="checkbox" bind:checked={showPlatform} /> {t("ستون‌های پلتفرم")}</label>
        <button class="show-all" type="button" on:click={showAllColumns}>{t("نمایش همهٔ ستون‌ها")}</button>
      </div>
    </div>
  </details>

  {#if selectedProfileRecord}
    <div class="profile-note"><div><b>{t(selectedProfileRecord.label)}</b><span>PCIe {t(numbers.format(selectedProfileRecord.pcieGeneration))} · {t(numbers.format(selectedProfileRecord.widthSlots))} {t("اسلات ·")} {t(numbers.format(selectedProfileRecord.powerW))} {t("وات ·")} {t(cardCoolingLabel[selectedProfileRecord.cooling])}</span></div><p>{t(selectedProfileRecord.note)}</p></div>
  {/if}

  <div class="summary" aria-live="polite">
    <div><small>{t("نتیجه")}</small><b>{t(numbers.format(visible.length))}</b><span>{t("از")} {t(numbers.format(serverRecords.length))} {t("مدل مرجع")}</span></div>
    <div><small>{t("قابل نصب PCIe")}</small><b>{t(numbers.format(pcieMatches))}</b><span>{t("پس از فیلترهای فعلی")}</span></div>
    <div><small>{t("تأیید صریح کارت")}</small><b>{t(selectedProfileId ? numbers.format(validatedMatches) : '—')}</b><span>{t(selectedProfileId ? 'نام کارت در منبع رسمی آمده' : 'ابتدا «کارت من» را انتخاب کنید')}</span></div>
    <div><small>{t("انتخاب مقایسه")}</small><b>{t(numbers.format(compared.length))}</b><span>{t("حداکثر ۴ سرور")}</span></div>
  </div>

  {#if comparison.length}
    <section class="compare" aria-label={t("مقایسهٔ کامل سرورها")}>
      <header><div><small>{t("مقایسهٔ کامل")}</small><b>{t(numbers.format(comparison.length))} {t("سرور کنار هم")}</b></div><button type="button" on:click={() => compared = []}>{t("پاک‌کردن انتخاب‌ها")}</button></header>
      <div class="compare-shell"><table class="compare-matrix"><thead><tr><th class="compare-label">{t("مشخصه")}</th>{#each comparison as record}<th><button class="remove" type="button" on:click={() => toggleCompare(record.id)}>×</button><span class="brand-mark"><img {...imageAttributes(brandLogo(record.vendor), '(min-width: 1200px) 740px, calc(100vw - 32px)')} alt="" /><small>{t(record.vendor)}</small></span><b>{t(record.model)}</b><a href={record.sourceUrl} target="_blank" rel="noreferrer">{t("منبع رسمی ↗")}</a></th>{/each}</tr></thead><tbody>{#each comparisonGroups as group}<tr class="compare-group"><th colspan={comparison.length + 1}>{t(group.group)}</th></tr>{#each group.rows as row}<tr><th class="compare-label">{t(row.label)}</th>{#each row.values as value}<td>{t(value)}</td>{/each}</tr>{/each}{/each}</tbody></table></div>
    </section>
  {/if}

  <div class="toolbar">
    <div class="toolbar-copy"><p>{t("ستون «منبع رسمی» مستقیماً به صفحهٔ محصول، QuickSpecs یا QPL سازنده می‌رود. برای سفارش نهایی، مدل/SKU و BOM دقیق را با همان منبع تطبیق دهید.")}</p>{#if hiddenColumns.length}<div class="hidden-columns"><span>{t("ستون‌های پنهان:")}</span>{#each hiddenColumns as key}<button type="button" on:click={() => restoreColumn(key)}>+ {t(columnLabel[key])}</button>{/each}<button class="restore-all" type="button" on:click={showAllColumns}>{t("بازگردانی همه")}</button></div>{/if}</div>
    <div><button class="export" type="button" on:click={exportCsv}>{t("خروجی CSV")}</button></div>
  </div>

  <!-- svelte-ignore a11y_no_noninteractive_tabindex (Scrollable data region needs keyboard focus for horizontal navigation.) -->
  <div class="table-shell" role="region" tabindex="0" aria-label={t("جدول سرورهای GPU")}>
    <table><thead><tr>
      <th class="pick">{t("مقایسه")}</th><th class="detail-head">{t("جزئیات")}</th><th class="model"><button class="sort-button" class:active={sortMarks.has('model')} type="button" on:click={() => toggleSort('model')}>{t("مدل")} <i>{t(sortMark('model', sorts))}</i></button></th>
      {#each activeColumns as column}<th class:wide={['cpu','memory','storage','expansion','power','validated'].includes(column)}><div class="th-inner"><button class="sort-button" class:active={sortableColumn[column] && sortMarks.has(sortableColumn[column]!)} type="button" on:click={() => sortableColumn[column] && toggleSort(sortableColumn[column]!)}>{t(columnLabel[column])} <i>{t(sortableColumn[column] ? sortMark(sortableColumn[column]!, sorts) : '—')}</i></button><button class="hide-column" type="button" aria-label={`${t("پنهان‌کردن ستون")} ${t(columnLabel[column])}`} on:click={() => hideColumn(column)}>×</button></div></th>{/each}
    </tr></thead><tbody>
      {#each visible as record}<tr class:selected={compared.includes(record.id)}>
        <td class="pick"><input type="checkbox" checked={compared.includes(record.id)} disabled={!compared.includes(record.id) && compared.length >= 4} aria-label={`افزودن ${record.model} به مقایسه`} on:change={() => toggleCompare(record.id)} /></td>
        <td class="detail-cell"><button class:open={expanded.includes(record.id)} type="button" aria-label={`${t("جزئیات")} ${record.model}`} aria-expanded={expanded.includes(record.id)} on:click={() => expanded = toggle(expanded, record.id)}>⌄</button></td>
        <td class="model"><div class="model-cell"><span class="brand-mark"><img {...imageAttributes(brandLogo(record.vendor), '(min-width: 1200px) 740px, calc(100vw - 32px)')} alt="" /><small>{t(record.vendor)}</small></span><b>{t(record.model)}</b><small class:preliminary={record.status === 'announced'}>{t(statusLabel[record.status])}</small>{#if selectedProfileId && compatibility(record)}<span class:validated={compatibility(record) === 'validated'} class:review={compatibility(record) === 'review'} class:bad={compatibility(record) === 'incompatible'}>{t(compatibilityLabel[compatibility(record)!])}</span>{/if}</div></td>
        {#each activeColumns as column}<td class:num={['interface','capacity','gpuPower','dimensions'].includes(column)} class:text={!['interface','capacity','gpuPower','dimensions'].includes(column)}>{#if column === 'source'}<a href={record.sourceUrl} target="_blank" rel="noreferrer">{t(record.sourceLabel)} ↗</a>{:else}{t(cellText(record, column))}{/if}</td>{/each}
      </tr>
      {#if expanded.includes(record.id)}<tr class="detail-row"><td colspan={totalColumns}><div class="detail-wrap"><div class="detail-summary"><article><small>{t("مناسب برای")}</small><p>{t(record.bestFor)}</p></article><article class="caution"><small>{t("هشدار خرید")}</small><p>{t(record.caution)}</p></article><article><small>{t("ظرفیت شتاب‌دهنده")}</small><p>{t(record.acceleratorSummary)}</p></article><article><small>{t("قاعدهٔ نهایی")}</small><p>{t("خرید باید با model/SKU دقیق، riser، کابل برق، PSU، firmware و فهرست قطعات تأییدشده بسته شود.")}</p></article></div><div class="spec-groups">{#each specGroups as group}<section><h4>{t(group)}</h4><dl>{#each specs(record).filter((item) => item.group === group) as spec}<div><dt>{t(spec.label)}</dt><dd>{t(spec.value)}</dd></div>{/each}</dl></section>{/each}</div><a class="detail-source" href={record.sourceUrl} target="_blank" rel="noreferrer">{t(record.sourceLabel)} {t("— منبع رسمی ↗")}</a></div></td></tr>{/if}
      {:else}<tr class="empty"><td colspan={totalColumns}>{t("با این ترکیب فیلتر، سروری پیدا نشد. عرض کارت، تعداد، توان، ارتفاع یا الزام «تأیید صریح» را بازبینی کنید.")}</td></tr>{/each}
    </tbody></table>
  </div>

  <div class="method"><article>
    <h3>{t("PCIe backward-compatible است، اما برابر نیست")}</h3>
    <p>{t("کارت Gen4 در شیار Gen5 با سرعت Gen4 کار می‌کند. کارت Gen5 ممکن است در Gen4 پایین‌شیفت شود، اما برای جلوگیری از گلوگاه، پیش‌فرض جدول آن را گزینهٔ مناسب نمی‌داند.")}</p></article>
    <article><h3>{t("ظرفیت شاسی، مجوز نصب نیست")}</h3><p>{t("عبارت «۸ کارت دو اسلات» فقط هندسهٔ پایه را می‌گوید. توان کارت، active/passive بودن، دمای محیط، کابل و QPL می‌توانند تعداد واقعی را کاهش دهند.")}</p></article>
    <article><h3>{t("در سرورهای OEM، پارت‌نامبر دقیق اهمیت دارد")}</h3><p>{t("در سرورهای سازمانی، صرفاً یکسان‌بودن مدل GPU کافی نیست؛ ممکن است نسخه عمومی همان کارت با نسخه دارای پارت‌نامبر یا کد FRU سازنده سرور تفاوت داشته باشد.")}</p></article></div>
</section>

<style>
  .explorer{min-width:0;margin-top:0;border-top:1px solid var(--line);padding-top:34px;color:var(--ink)}.heading{display:grid;grid-template-columns:minmax(0,1fr) 190px;gap:38px}.heading>div>small{color:var(--teal);font-size:12px;font-weight:800}.heading h2{margin:7px 0 10px;font-size:clamp(28px,3vw,38px);line-height:1.45;letter-spacing:-1px}.heading p{max-width:1050px;margin:0;color:var(--muted);font-size:14px;line-height:2}.heading strong{color:var(--ink)}.stamp{border:1px solid var(--line);border-top:3px solid var(--teal);padding:15px;display:grid;align-content:center;gap:4px}.stamp span,.stamp small{color:var(--muted);font-size:11px}.stamp b{font-size:16px}.rules{margin:20px 0 0;display:grid;grid-template-columns:repeat(3,1fr);border:1px solid var(--line)}.rules article{min-height:64px;padding:12px 14px;display:grid;grid-template-columns:28px 1fr;gap:7px;align-items:center}.rules article+article{border-inline-start:1px solid var(--line)}.rules span{color:var(--teal);font-size:13px}.rules b{font-size:13px;line-height:1.7}.scope{box-sizing:border-box;padding:12px 16px;display:grid;grid-template-columns:110px 1fr;gap:14px;background:color-mix(in srgb,var(--teal) 5%,var(--paper));border:1px solid color-mix(in srgb,var(--teal) 35%,var(--line));border-top:0}.scope b{color:var(--teal);font-size:12px}.scope span{color:var(--muted);font-size:12px;line-height:1.85}
  .presets{display:flex;gap:7px;overflow-x:auto;padding:17px 0 9px}.presets button,.filter-actions button,.toolbar button,.compare button{border:1px solid var(--line);background:var(--paper);color:var(--muted);font:inherit;cursor:pointer}.presets button{flex:0 0 auto;border-radius:99px;padding:7px 13px;font-size:12px}.presets button:hover,.presets button.active{border-color:var(--teal);color:var(--teal);background:color-mix(in srgb,var(--teal) 7%,var(--paper))}
  .filters{border:1px solid var(--line);background:color-mix(in srgb,var(--paper) 94%,var(--soft))}.filters summary{display:flex;justify-content:space-between;padding:12px 15px;font-size:14px;font-weight:800;cursor:pointer}.filters summary span{color:var(--teal);font-weight:600}.filter-grid{padding:14px 15px;display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:14px;border-top:1px solid var(--line)}.filter-grid label,.filter-grid fieldset{min-width:0;margin:0;padding:0;border:0}.filter-grid label>span,.filter-grid legend{display:block;margin-bottom:5px;color:var(--muted);font-size:12px}.filter-grid input[type=search],.filter-grid select{box-sizing:border-box;width:100%;height:38px;border:1px solid var(--line);border-radius:6px;background:var(--bg);color:var(--ink);padding:0 10px;font:inherit;font-size:13px}.checks{display:flex;flex-wrap:wrap;gap:5px}.checks label{position:relative}.checks input{position:absolute;opacity:0}.checks label span{display:block;margin:0;border:1px solid var(--line);border-radius:5px;padding:6px 9px;color:var(--muted);font-size:11px;cursor:pointer}.checks input:checked+span{border-color:var(--teal);color:var(--teal);background:color-mix(in srgb,var(--teal) 8%,var(--paper))}.filter-actions{display:flex;justify-content:space-between;align-items:center;padding:10px 15px;border-top:1px solid var(--line)}.filter-actions>button{border:0;color:var(--teal);font-size:12px}.filter-actions>div{display:flex;align-items:center;flex-wrap:wrap;gap:14px}.filter-actions label{display:flex;align-items:center;gap:7px;color:var(--muted);font-size:12px}.filter-actions .show-all{border:1px solid var(--teal);border-radius:99px;padding:4px 9px;color:var(--teal);font-size:11px}.profile-note{margin-top:10px;padding:12px 15px;display:grid;grid-template-columns:minmax(220px,.7fr) 1.3fr;gap:18px;border:1px solid color-mix(in srgb,#b77718 45%,var(--line));background:color-mix(in srgb,#b77718 5%,var(--paper))}.profile-note div{display:grid;gap:3px}.profile-note b{font-size:13px}.profile-note span,.profile-note p{margin:0;color:var(--muted);font-size:11px;line-height:1.8}
  .summary{margin:16px 0;display:grid;grid-template-columns:repeat(4,1fr);border:1px solid var(--line)}.summary>div{padding:11px 14px;display:grid;grid-template-columns:auto 1fr;gap:2px 9px;align-items:baseline}.summary>div+div{border-inline-start:1px solid var(--line)}.summary small{color:var(--muted);font-size:12px}.summary b{justify-self:end;color:var(--teal);font-size:21px}.summary span{grid-column:1/-1;color:var(--muted);font-size:11px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .compare{margin:16px 0;border:1px solid color-mix(in srgb,var(--teal) 45%,var(--line));background:color-mix(in srgb,var(--teal) 4%,var(--paper))}.compare>header{padding:10px 14px;display:flex;justify-content:space-between;border-bottom:1px solid var(--line)}.compare header div{display:flex;gap:8px}.compare header small{color:var(--teal);font-size:11px}.compare header b{font-size:13px}.compare header button{border:0;font-size:11px}.compare-shell{display:block;max-height:72vh;overflow:auto}.compare-matrix{width:100%;min-width:max-content;border-collapse:separate;border-spacing:0}.compare-matrix th,.compare-matrix td{box-sizing:border-box;min-width:240px;max-width:360px;padding:10px 12px;border-inline-end:1px solid var(--line);border-bottom:1px solid var(--line);background:var(--paper);text-align:start;vertical-align:top;white-space:normal}.compare-matrix thead th{position:sticky;top:0;z-index:3;height:112px;background:var(--navy);color:#d7e7e5}.compare-matrix thead th>b{display:block;margin-top:8px;font-size:13px;text-align:left}.compare-matrix thead th>a{display:block;margin-top:5px;color:#78d6cd;font-size:9px}.compare-matrix .compare-label{position:sticky;inset-inline-start:0;z-index:2;min-width:180px;width:180px;max-width:180px;color:var(--muted);font-size:11px}.compare-matrix thead .compare-label{z-index:5;color:#d7e7e5}.compare-matrix tbody td{font-size:11px;line-height:1.75}.compare-matrix .compare-group th{position:relative;right:auto;z-index:1;min-width:0;width:auto;max-width:none;padding:7px 12px;background:color-mix(in srgb,var(--teal) 12%,var(--paper));color:var(--teal);font-size:11px}.remove{position:absolute;inset-inline-end:8px;top:8px;width:24px;height:24px;border-radius:50%}
  .brand-mark{display:flex;align-items:center;gap:7px;width:max-content;direction:ltr}.brand-mark img{width:29px;height:24px;object-fit:contain}.brand-mark small{font:800 9px/1.1 Arial,sans-serif;letter-spacing:.4px;color:var(--muted)}.toolbar{display:flex;justify-content:space-between;align-items:flex-start;gap:18px;margin:14px 0 8px}.toolbar-copy{display:grid;gap:7px}.toolbar p{max-width:900px;margin:0;color:var(--muted);font-size:12px;line-height:1.8}.toolbar>div:last-child{display:flex;gap:6px;flex:0 0 auto}.toolbar button{padding:7px 10px;font-size:11px}.toolbar .export{border-color:var(--teal);color:var(--teal)}.hidden-columns{display:flex;flex-wrap:wrap;align-items:center;gap:5px}.hidden-columns span{color:var(--muted);font-size:11px}.hidden-columns button{border-radius:99px;padding:4px 8px;color:var(--teal);font-size:10px}.hidden-columns .restore-all{border-color:var(--teal)}
  .table-shell{max-height:78vh;overflow:auto;border:1px solid var(--line);background:var(--paper);scrollbar-width:thin}table{width:max-content;min-width:100%;border-collapse:separate;border-spacing:0;font-size:13px}th,td{box-sizing:border-box;min-width:108px;max-width:220px;border-inline-end:1px solid var(--line);border-bottom:1px solid var(--line);padding:9px 8px;text-align:start;vertical-align:middle}th{position:sticky;top:0;z-index:4;height:52px;background:var(--navy);color:#d7e7e5;font-size:12px;white-space:nowrap}th.wide{min-width:190px}.th-inner{display:flex;align-items:center;justify-content:space-between;gap:6px}.sort-button{display:flex;align-items:center;gap:5px;min-width:0;flex:1;border:0;background:transparent;color:inherit;padding:0;font:inherit;cursor:pointer}.sort-button.active{color:var(--teal);font-weight:700}.sort-button.active i{color:var(--teal)}.hide-column{display:grid;place-items:center;flex:0 0 auto;width:19px;height:19px;border:1px solid rgba(255,255,255,.2);border-radius:50%;background:transparent;color:#91aaa7;padding:0;font:700 13px/1 Arial,sans-serif;cursor:pointer}.hide-column:hover,.hide-column:focus-visible{border-color:#78d6cd;color:#78d6cd}.sort-button i{min-width:20px;color:#78d6cd;font-style:normal;font-size:10px;text-align:center}td{height:66px;background:var(--paper)}tr:hover td{background:color-mix(in srgb,var(--teal) 5%,var(--paper))}tr.selected td{background:color-mix(in srgb,var(--teal) 9%,var(--paper))}.pick{position:sticky;inset-inline-start:0;z-index:7;min-width:54px;width:54px;max-width:54px;text-align:center;background:var(--paper)}th.pick{z-index:10;background:var(--navy)}.pick input{width:15px;height:15px;accent-color:var(--teal)}.detail-head,.detail-cell{position:sticky;inset-inline-start:54px;z-index:7;min-width:62px;width:62px;max-width:62px;text-align:center;background:var(--paper)}th.detail-head{z-index:10;background:var(--navy)}.model{position:sticky;inset-inline-start:116px;z-index:7;min-width:225px;max-width:225px;background:var(--paper);box-shadow:-8px 0 14px rgba(0,0,0,.06)}th.model{z-index:10;background:var(--navy)}.model-cell{display:grid;grid-template-columns:auto 1fr;gap:4px 8px;align-items:center}.model-cell b{grid-column:1/-1;font-size:13px;text-align:left;direction:ltr}.model-cell>small{font-size:10px;color:var(--muted)}.model-cell>small.preliminary{color:#b77718}.model-cell>span:not(.brand-mark){grid-column:1/-1;font-size:9px}.model-cell .validated{color:#26836f}.model-cell .review{color:#b77718}.model-cell .bad{color:#b75d5d}.num{text-align:center;direction:ltr;font-size:11px}.text{color:var(--muted);font-size:11px;line-height:1.65}.text a{color:var(--teal)}.detail-cell button{width:30px;height:30px;border:1px solid var(--line);border-radius:50%;background:transparent;color:var(--teal);cursor:pointer;transition:transform .2s,background .2s}.detail-cell button.open{transform:rotate(180deg);background:var(--soft)}.detail-row td{height:auto;padding:0;background:color-mix(in srgb,var(--soft) 40%,var(--paper))}.detail-wrap{position:sticky;inset-inline-start:0;box-sizing:border-box;width:var(--hardware-content-width,calc(100vw - 424px));padding:20px}.detail-summary{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}.detail-summary article{min-height:72px;border-top:1px solid var(--line);padding-top:8px}.detail-summary article.caution{border-top-color:#b76f5d}.detail-summary small{color:var(--teal);font-size:11px}.detail-summary .caution small{color:#b76f5d}.detail-summary p{margin:4px 0 0;color:var(--muted);font-size:11px;line-height:1.85}.spec-groups{margin-top:18px;column-count:3;column-gap:12px}.spec-groups section{display:inline-block;width:100%;margin:0 0 12px;border:1px solid var(--line);background:var(--paper);break-inside:avoid}.spec-groups h4{margin:0;padding:9px 11px;border-bottom:1px solid var(--line);color:var(--teal);font-size:12px}.spec-groups dl{margin:0}.spec-groups dl>div{display:grid;grid-template-columns:minmax(92px,.7fr) 1.3fr;gap:8px;padding:7px 10px;border-bottom:1px solid var(--line)}.spec-groups dl>div:last-child{border-bottom:0}.spec-groups dt{color:var(--muted);font-size:10px}.spec-groups dd{margin:0;color:var(--ink);font-size:11px;line-height:1.6}.detail-source{display:inline-flex;margin-top:14px;color:var(--teal);font-size:11px;font-weight:700}.empty td{padding:36px;text-align:center;color:var(--muted)}
  .method{margin:24px 0 0;display:grid;grid-template-columns:repeat(3,1fr);border:1px solid var(--line)}.method article{padding:18px}.method article+article{border-inline-start:1px solid var(--line)}.method h3{margin:0 0 7px;font-size:14px}.method p{margin:0;color:var(--muted);font-size:12px;line-height:1.9}
  @media(max-width:1250px){.filter-grid{grid-template-columns:repeat(4,1fr)}.spec-groups{column-count:2}}
  @media(max-width:980px){.detail-wrap{width:var(--hardware-content-width,calc(100vw - 396px))}}
  @media(max-width:920px){.filter-grid{grid-template-columns:repeat(2,1fr)}.detail-summary{grid-template-columns:repeat(2,1fr)}.method{grid-template-columns:1fr}.method article+article{border-inline-start:0;border-top:1px solid var(--line)}}
  @media(max-width:700px){.detail-wrap{width:var(--hardware-content-width,calc(100vw - 28px))}}
  @media(max-width:650px){.explorer{padding-top:28px}.heading{grid-template-columns:1fr;gap:18px}.stamp{max-width:240px}.rules{grid-template-columns:1fr}.rules article+article{border-inline-start:0;border-top:1px solid var(--line)}.scope{grid-template-columns:1fr;gap:4px}.filter-grid{grid-template-columns:1fr}.filter-actions{align-items:flex-start;gap:10px;flex-direction:column}.filter-actions>div{display:grid;gap:5px}.profile-note{grid-template-columns:1fr}.summary{grid-template-columns:repeat(2,1fr)}.summary>div:nth-child(3){border-inline-start:0;border-top:1px solid var(--line)}.summary>div:nth-child(4){border-top:1px solid var(--line)}.compare>header{align-items:flex-start;gap:8px}.compare header div{display:grid}.compare-matrix th,.compare-matrix td{min-width:220px}.compare-matrix .compare-label{min-width:140px;width:140px;max-width:140px}.detail-summary{grid-template-columns:1fr}.spec-groups{column-count:1}.toolbar{align-items:flex-start;flex-direction:column}.model{min-width:205px;max-width:205px}.table-shell{max-height:70vh}table{font-size:11px}}
</style>
