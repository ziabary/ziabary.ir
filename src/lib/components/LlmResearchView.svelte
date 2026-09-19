<script lang="ts">
  import { getLlmI18n } from '$lib/llm/i18n/context';
  const i18n = getLlmI18n();
  const { t, locale, direction, numberFormat } = i18n;
  const { research, faNumber, researchModel } = createLlmResearch(i18n);
  const { defaultResearchControls, researchView, performanceGroups, performanceMetrics } = createLlmResearchViews(i18n);
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { tick } from 'svelte';
  import { readResearchSelection } from '$lib/llm/selection';
  import { browser } from '$app/environment';
  import LlmDataView from './LlmDataView.svelte';
  import type { LlmGuideRepository } from '$lib/llm/schema';
  import type { LlmViewId } from '$lib/llm/views';
  import { createLlmResearch } from '$lib/llm/research';
  import type { ResearchControls } from '$lib/llm/research-views';
import { createLlmResearchViews } from '$lib/llm/research-views';
  export let repository: LlmGuideRepository;
  export let id: LlmViewId;
  export let anchorId: string | undefined = undefined;
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
  let appliedResearchUrl = '';
  $: researchUrl = routeParams.get(`r_${id}`) ?? '';
  $: if (researchUrl !== appliedResearchUrl) {
    const saved = readResearchSelection(researchUrl, defaultResearchControls, { hardware: research.hardware.map(item => item.id), ram: research.cpuProfiles.map(item => item.installedRamGiB), groups: Object.keys(performanceGroups), metrics: Object.keys(performanceMetrics), models: repository.models.map(item => item.id) });
    ({ context, active, method, hardwareIds, ram, group, metric, deploymentMode, model } = saved);
    cardCount = ''; appliedResearchUrl = researchUrl;
  }
  function trackControls(node: HTMLElement) {
    const save = async () => {
      await tick();
      const url = new URL($page.url); const value = JSON.stringify(controls);
      if (value === url.searchParams.get(`r_${id}`)) return;
      url.searchParams.set(`r_${id}`, value); appliedResearchUrl = value;
      await goto(url, { noScroll: true, keepFocus: true });
    };
    node.addEventListener('change', save);
    return { destroy() { node.removeEventListener('change', save); } };
  }
  function toggleHardware(id: string) { hardwareIds = hardwareIds.includes(id) ? hardwareIds.filter(key => key !== id) : [...hardwareIds, id]; }
  function toggleRam(value: number) { ram = ram.includes(value) ? ram.filter(size => size !== value) : [...ram, value]; }
  function changeGroup(value: string) { group = value; model = ''; }
</script>

<LlmDataView {anchorId} config={view.config} rows={view.rows} evidence={repository.evidence} {presetId} {onOpenModel} resetKey={`${routeModel}:${id === 'benchmarks' ? group : id === 'hardware-feasibility' ? method : id === 'deployment-compatibility' ? deploymentMode : ''}`}>
  {#snippet controlsContent()}
  <div use:trackControls class="scenario-controls" data-controls-for={id}>
    <div class="control-row">
      {#if id === 'hardware-feasibility'}
        <label>{t('LlmResearchView.1206')}<select bind:value={method} on:change={() => model = ''}><option value="gpu">{t('LlmResearchView.1207')}</option><option value="weights">{t('LlmResearchView.1208')}</option><option value="cpu">{t('LlmResearchView.1209')}</option><option value="layerwise">{t('LlmResearchView.1210')}</option><option value="publisher">{t('LlmResearchView.1211')}</option></select></label>
        {#if method === 'gpu' || method === 'cpu'}
          <label>{t('LlmResearchView.1212')}<select bind:value={context}>{#if ![4096,8192,32768].includes(context)}<option value={context}>{faNumber(context)} tokens</option>{/if}<option value={4096}>{t('LlmResearchView.1213')}</option><option value={8192}>{t('LlmResearchView.1214')}</option><option value={32768}>{t('LlmResearchView.1215')}</option></select></label>
          <label>{t('LlmResearchView.1216')}<input aria-label={t('LlmResearchView.1216')} type="number" min="1" max="128" step="1" bind:value={active} /></label>
        {/if}
      {:else if id === 'benchmarks'}
        <label class="wide">{t('LlmResearchView.1217')}<select value={group} on:change={event => changeGroup(event.currentTarget.value)}>{#each Object.entries(performanceGroups) as [key, value]}<option value={key}>{value.label}</option>{/each}</select></label>
        <label>{t('LlmResearchView.1218')}<select bind:value={metric}>{#each metrics as [key, value]}<option value={key}>{value.label}</option>{/each}</select></label>
      {:else if id === 'deployment-compatibility'}
        <label>{t('LlmResearchView.1219')}<select bind:value={deploymentMode} on:change={() => model = ''}><option value="routes">{t('LlmResearchView.1220')}</option><option value="kernels">{t('LlmResearchView.1221')}</option></select></label>
      {/if}
      {#if (id !== 'deployment-compatibility' || deploymentMode === 'routes') && availableModels.length}
        <label>{t('LlmResearchView.1222')}<select bind:value={model}><option value="">{t('LlmResearchView.1223')}</option>{#each availableModels as [key, name]}<option value={key}>{name}</option>{/each}</select></label>
      {/if}
    </div>
    {#if id === 'hardware-feasibility' && (method === 'gpu' || method === 'cpu' || method === 'weights')}
      {#if method === 'weights'}<p class="basis">{t('LlmResearchView.1224')}</p>{:else}<p class="basis">{t('LlmResearchView.1225')}</p>{/if}
      {#if method === 'gpu' || method === 'weights'}
        <details class="hardware-picker"><summary>{t('LlmResearchView.1226')} {faNumber(controls.hardwareIds.length)} {t('LlmResearchView.1227')}</summary>
          <label class="count-filter">{t('LlmResearchView.1228')}<select bind:value={cardCount}><option value="">{t('LlmResearchView.1229')}</option><option value="1">{t('LlmResearchView.1230')}</option><option value="2">{t('LlmResearchView.1231')}</option><option value="8">{t('LlmResearchView.1232')}</option></select></label>
          <div class="hardware-options">{#each research.hardware.filter(item => !cardCount || item.gpuCount === Number(cardCount)) as device}<label><input type="checkbox" checked={hardwareIds.includes(device.id)} on:change={() => toggleHardware(device.id)} /><img src="/images/brands/nvidia.svg" alt="" width="24" height="24" /><bdi>{device.name}</bdi></label>{/each}</div>
          <a href={`${locale === 'fa' ? '' : '/' + locale}/guides/gpu-selection/#gpu-comparison-table`}>{t('LlmResearchView.1233')}</a>
        </details>
        {#if !controls.hardwareIds.length}<p class="basis">{t('LlmResearchView.1234')}</p>{/if}
      {:else}
        <fieldset class="ram-picker"><legend>{t('LlmResearchView.1235')}</legend>{#each research.cpuProfiles as profile}<label><input type="checkbox" checked={ram.includes(profile.installedRamGiB)} on:change={() => toggleRam(profile.installedRamGiB)} /><bdi>{faNumber(profile.installedRamGiB)} GiB</bdi></label>{/each}</fieldset>
      {/if}
      <details class="method-note"><summary>{t('LlmResearchView.1236')}</summary><p>{t('LlmResearchView.1237')}</p><p>{t('LlmResearchView.1238')}</p><p>{t('LlmResearchView.1239')}</p></details>
    {:else if id === 'benchmarks'}<p class="basis">{t('LlmResearchView.1240')}</p>
    {/if}
  </div>
  {/snippet}
</LlmDataView>

<style>
  .scenario-controls{border:1px solid var(--line);border-radius:10px;padding:18px;background:color-mix(in srgb,var(--soft) 35%,var(--paper));margin:18px 0;font-size:13px;line-height:1.9;min-width:0}.control-row{display:flex;gap:16px;align-items:end;flex-wrap:wrap}.control-row>label{flex:1 1 170px;min-width:0}.control-row>.wide{flex:2 1 280px}label{display:flex;flex-direction:column;gap:6px;color:var(--muted)}select,input[type=number]{font:inherit;color:var(--ink);background:var(--paper);border:1px solid var(--line);border-radius:7px;box-sizing:border-box;width:100%;min-width:0;padding:9px}input[type=number]{direction:ltr;text-align:start}.basis{color:var(--muted);font-size:12px;margin:14px 0 0}summary{cursor:pointer;color:var(--link-ink)}.hardware-picker,.method-note{margin-top:14px;padding-top:12px;border-top:1px solid var(--line)}.hardware-options{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin:14px 0}.hardware-options label{flex-direction:row;align-items:center;color:var(--ink);font-size:12px;border:1px solid var(--line);border-radius:6px;padding:9px}.hardware-options img{padding:3px;background:white;border-radius:4px;object-fit:contain;box-sizing:border-box}.count-filter{max-width:210px;margin-top:12px}.ram-picker{display:flex;gap:15px;flex-wrap:wrap;border:0;padding:0;margin-top:16px}.ram-picker label{flex-direction:row;align-items:center;color:var(--ink)}.ram-picker legend{padding:0;margin-bottom:8px;color:var(--muted)}a{color:var(--link-ink)}input,select{accent-color:var(--teal)}:is(input,select,summary):focus-visible{outline:2px solid var(--teal);outline-offset:3px}
  @media(max-width:850px){.hardware-options{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:550px){.scenario-controls{padding:13px}.control-row{gap:12px}.control-row>label,.control-row>.wide{flex-basis:100%}.hardware-options{grid-template-columns:1fr}.hardware-options bdi{overflow-wrap:anywhere}}
</style>
