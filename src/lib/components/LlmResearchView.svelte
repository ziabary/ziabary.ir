<script lang="ts">
  import { page } from '$app/stores';
  import { browser } from '$app/environment';
  import LlmDataView from './LlmDataView.svelte';
  import type { LlmGuideRepository } from '$lib/llm/schema';
  import type { LlmViewId } from '$lib/llm/views';
  import { research, faNumber, researchModel } from '$lib/llm/research';
  import { defaultResearchControls, researchView, performanceGroups, performanceMetrics, type ResearchControls } from '$lib/llm/research-views';
  export let repository: LlmGuideRepository;
  export let id: LlmViewId;
  export let presetId = '';
  export let onOpenModel: (id: string, panel?: string) => void;
  let context = 8192, active = 1;
  let method: ResearchControls['method'] = 'gpu';
  let hardwareIds = [...defaultResearchControls.hardwareIds];
  let ram = [...defaultResearchControls.ram];
  let group = defaultResearchControls.group, metric = defaultResearchControls.metric;
  let deploymentMode: ResearchControls['deploymentMode'] = 'routes';
  let model = '', cardCount = '';
  let previousRouteModel = '';
  $: routeParams = browser ? $page.url.searchParams : new URLSearchParams();
  $: routeModel = (routeParams.get('view') ?? 'hardware-feasibility') === id ? routeParams.get('research-model') ?? '' : '';
  $: if (routeModel !== previousRouteModel) {
    model = routeModel; previousRouteModel = routeModel;
    if (id === 'benchmarks' && routeModel) {
      const run = research.performance.find(item => researchModel(repository, item.modelRepository)?.id === routeModel);
      if (run) group = run.publicationGroup;
    }
    if (id === 'hardware-feasibility' && routeModel && !research.artifacts.some(item => researchModel(repository, item.modelRepository)?.id === routeModel)) {
      if (research.slmCpu.some(item => researchModel(repository, item.modelRepository)?.id === routeModel)) method = 'cpu';
      else if (research.airllm.some(item => researchModel(repository, item.modelRepository)?.id === routeModel)) method = 'layerwise';
      else if (research.memoryClaims.some(item => researchModel(repository, item.modelRepository)?.id === routeModel)) method = 'publisher';
      else method = 'weights';
    }
  }
  $: metrics = Object.entries(performanceMetrics).filter(([key]) => research.performance.some(item => item.publicationGroup === group && item.metrics[key] !== undefined));
  $: if (!metrics.some(([key]) => key === metric)) metric = metrics[0]?.[0] ?? 'outputTokensPerSecond';
  $: controls = { context, active, method, hardwareIds: hardwareIds.filter(id => !cardCount || research.hardware.find(h => h.id === id)?.gpuCount === Number(cardCount)), ram, group, metric, deploymentMode, model };
  $: view = researchView(repository, id, controls);
  $: availableModels = (() => {
    const names = id === 'hardware-feasibility' ? (method === 'weights' ? repository.models.filter(model => repository.artifactListings.some(item => item.modelVersionId === model.id && item.totalBytes !== undefined)).map(model => model.aliases?.[0] ?? model.exactName) : method === 'layerwise' ? research.airllm.map(item => item.modelRepository) : method === 'publisher' ? research.memoryClaims.map(item => item.modelRepository) : [...research.artifacts.map(item => item.modelRepository), ...(method === 'cpu' ? research.slmCpu.map(item => item.modelRepository) : [])])
      : id === 'benchmarks' ? research.performance.filter(item => item.publicationGroup === group).flatMap(item => item.modelRepository ? [item.modelRepository] : []) : repository.modelProfiles.filter(profile => profile.runGuides.length).flatMap(profile => repository.models.find(model => model.id === profile.modelVersionId)?.aliases?.slice(0,1) ?? []);
    return [...new Map(names.flatMap(name => { const model = researchModel(repository, name); return model ? [[model.id, model.exactName] as const] : []; }))];
  })();
  function toggleHardware(id: string) { hardwareIds = hardwareIds.includes(id) ? hardwareIds.filter(key => key !== id) : [...hardwareIds, id]; }
  function toggleRam(value: number) { ram = ram.includes(value) ? ram.filter(size => size !== value) : [...ram, value]; }
  function changeGroup(value: string) { group = value; model = ''; }
</script>

<LlmDataView config={view.config} rows={view.rows} evidence={repository.evidence} {presetId} {onOpenModel} resetKey={`${routeModel}:${id === 'benchmarks' ? group : id === 'hardware-feasibility' ? method : id === 'deployment-compatibility' ? deploymentMode : ''}`}>
  {#snippet controlsContent()}
  <div class="scenario-controls" data-controls-for={id}>
    <div class="control-row">
      {#if id === 'hardware-feasibility'}
        <label>مسیر حافظه<select bind:value={method} on:change={() => model = ''}><option value="gpu">بودجهٔ وزن و KV در GPU</option><option value="weights">اندازهٔ وزن همهٔ مدل‌ها</option><option value="cpu">CPU و RAM</option><option value="layerwise">اجرای لایه‌ای · AirLLM</option><option value="publisher">حافظهٔ اعلامی ناشر · GPT-OSS</option></select></label>
        {#if method === 'gpu' || method === 'cpu'}
          <label>طول کل متن<select bind:value={context}><option value={4096}>۴٬۰۹۶ توکن</option><option value={8192}>۸٬۱۹۲ توکن</option><option value={32768}>۳۲٬۷۶۸ توکن</option></select></label>
          <label>درخواست فعال هم‌زمان<input aria-label="درخواست فعال هم‌زمان" type="number" min="1" max="128" step="1" bind:value={active} /></label>
        {/if}
      {:else if id === 'benchmarks'}
        <label class="wide">گروه آزمون<select value={group} on:change={event => changeGroup(event.currentTarget.value)}>{#each Object.entries(performanceGroups) as [key, value]}<option value={key}>{value.label}</option>{/each}</select></label>
        <label>معیار نمایش<select bind:value={metric}>{#each metrics as [key, value]}<option value={key}>{value.label}</option>{/each}</select></label>
      {:else if id === 'deployment-compatibility'}
        <label>دامنهٔ بررسی<select bind:value={deploymentMode} on:change={() => model = ''}><option value="routes">مدل و مسیر اجرا</option><option value="kernels">کوانت و معماری GPU</option></select></label>
      {/if}
      {#if (id !== 'deployment-compatibility' || deploymentMode === 'routes') && availableModels.length}
        <label>مدل<select bind:value={model}><option value="">همهٔ مدل‌های این نما</option>{#each availableModels as [key, name]}<option value={key}>{name}</option>{/each}</select></label>
      {/if}
    </div>
    {#if id === 'hardware-feasibility' && (method === 'gpu' || method === 'cpu' || method === 'weights')}
      {#if method === 'weights'}<p class="basis">این نما حجم واقعی فایل‌ها را نشان می‌دهد. برای معماری‌های دارای سناریوی حافظه، مسیر «بودجهٔ وزن و KV» را انتخاب کنید.</p>{:else}<p class="basis">محاسبه از مشخصات · زمینه شامل تاریخچه، ورودی و خروجی است. درخواست فعال با تعداد کاربران روزانه تفاوت دارد.</p>{/if}
      {#if method === 'gpu' || method === 'weights'}
        <details class="hardware-picker"><summary>کارت‌های جدول · {faNumber(controls.hardwareIds.length)} آرایش انتخاب شده</summary>
          <label class="count-filter">تعداد کارت در آرایش<select bind:value={cardCount}><option value="">همه</option><option value="1">یک کارت</option><option value="2">دو کارت</option><option value="8">هشت کارت</option></select></label>
          <div class="hardware-options">{#each research.hardware.filter(item => !cardCount || item.gpuCount === Number(cardCount)) as device}<label><input type="checkbox" checked={hardwareIds.includes(device.id)} on:change={() => toggleHardware(device.id)} /><img src="/images/brands/nvidia.svg" alt="" width="24" height="24" /><bdi>{device.name}</bdi></label>{/each}</div>
          <a href="/guides/gpu-selection/#gpu-comparison-table">مشخصات کارت‌ها در راهنمای GPU ←</a>
        </details>
        {#if !controls.hardwareIds.length}<p class="basis">آرایشی انتخاب نشده؛ از «کارت‌های جدول» کارت مورد نظر را اضافه کنید.</p>{/if}
      {:else}
        <fieldset class="ram-picker"><legend>رده‌های RAM برای بررسی</legend>{#each research.cpuProfiles as profile}<label><input type="checkbox" checked={ram.includes(profile.installedRamGiB)} on:change={() => toggleRam(profile.installedRamGiB)} /><bdi>{faNumber(profile.installedRamGiB)} GiB</bdi></label>{/each}</fieldset>
      {/if}
      <details class="method-note"><summary>روش محاسبه و محدودیت سناریو</summary><p>حجم واقعی فایل وزن + حافظهٔ KV + ذخیرهٔ اجرایی. برای GGUF، مقدار KV با دقت FP16 محاسبه می‌شود. ذخیرهٔ پیش‌فرض GPU دو GiB برای هر کارت و ذخیرهٔ CPU چهار GiB است؛ این ذخیره فرض برنامه‌ریزی است.</p><p>مدل‌های MoE با تمام وزن‌ها محاسبه می‌شوند. ظرفیت اسمی کارت به‌عنوان بودجهٔ GiB استفاده شده؛ برای استقرار دقیق، حافظهٔ آزاد گزارش‌شدهٔ دستگاه ملاک است. مجموع حافظهٔ چند کارت، حافظهٔ یکپارچه نیست.</p><p>در مسیر FP32 مدل‌های SmolLM2، وزن و KV هر دو FP32 هستند. سناریوهای بزرگ‌تر از زمینهٔ فایل منتخب نمایش داده نمی‌شوند؛ از جمله Aya Expanse 32B با فایل GGUF منتخب و زمینهٔ حداکثر ۸٬۱۹۲ توکن.</p></details>
    {:else if id === 'benchmarks'}<p class="basis">گزارش منتشرشده · هر ردیف یک اجرای مشخص در گروه انتخابی است؛ در جزئیات، فرمان، پروتکل و سایر معیارها در دسترس‌اند.</p>
    {/if}
  </div>
  {/snippet}
</LlmDataView>

<style>
  .scenario-controls{border:1px solid var(--line);border-radius:10px;padding:18px;background:color-mix(in srgb,var(--soft) 35%,var(--paper));margin:18px 0;font-size:13px;line-height:1.9;min-width:0}.control-row{display:flex;gap:16px;align-items:end;flex-wrap:wrap}.control-row>label{flex:1 1 170px;min-width:0}.control-row>.wide{flex:2 1 280px}label{display:flex;flex-direction:column;gap:6px;color:var(--muted)}select,input[type=number]{font:inherit;color:var(--ink);background:var(--paper);border:1px solid var(--line);border-radius:7px;box-sizing:border-box;width:100%;min-width:0;padding:9px}input[type=number]{direction:ltr;text-align:right}.basis{color:var(--muted);font-size:12px;margin:14px 0 0}summary{cursor:pointer;color:var(--link-ink)}.hardware-picker,.method-note{margin-top:14px;padding-top:12px;border-top:1px solid var(--line)}.hardware-options{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin:14px 0}.hardware-options label{flex-direction:row;align-items:center;color:var(--ink);font-size:12px;border:1px solid var(--line);border-radius:6px;padding:9px}.hardware-options img{padding:3px;background:white;border-radius:4px;object-fit:contain;box-sizing:border-box}.count-filter{max-width:210px;margin-top:12px}.ram-picker{display:flex;gap:15px;flex-wrap:wrap;border:0;padding:0;margin-top:16px}.ram-picker label{flex-direction:row;align-items:center;color:var(--ink)}.ram-picker legend{padding:0;margin-bottom:8px;color:var(--muted)}a{color:var(--link-ink)}input,select{accent-color:var(--teal)}:is(input,select,summary):focus-visible{outline:2px solid var(--teal);outline-offset:3px}
  @media(max-width:850px){.hardware-options{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:550px){.scenario-controls{padding:13px}.control-row{gap:12px}.control-row>label,.control-row>.wide{flex-basis:100%}.hardware-options{grid-template-columns:1fr}.hardware-options bdi{overflow-wrap:anywhere}}
</style>
