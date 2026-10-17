<script lang="ts">
  import { capacityModels, capacityGpus, defaultCapacityInput, assessMemory, recommendGpus, calculateDemand, measuredPressure,
    type Deployment, type HardwareScope } from '$lib/llm/serving-capacity';
  import { servingCapacityCopy, type CapacityLocale } from '$lib/llm/serving-capacity-copy';
  import { hardwareText } from '$lib/i18n/gpu';
  export let locale: CapacityLocale = 'fa';
  $: copy = servingCapacityCopy[locale];
  $: base = locale === 'fa' ? '' : `/${locale}`;
  const percent = (value: number) => new Intl.NumberFormat(locale, { style: 'percent', maximumFractionDigits: 2 }).format(value);
  export let id = 'serving-capacity-planner';
  export let modelId = 'example-8b-bf16';
  export let gpuId = '';
  let gpuCount = 1;
  let deployment: Deployment = 'replicas';
  let active = defaultCapacityInput.active;
  let tokens = defaultCapacityInput.tokens;
  let kvBytes = 2;
  let reserveGiB = defaultCapacityInput.reserveGiB;
  let extraGiB = 0;
  let freeGiB: number | undefined = undefined;
  let vendor = 'NVIDIA';
  let scope: HardwareScope = 'desktop';
  let users = 100, requestsPerMinute = .5, calls = 1, inputTokens = 4300, outputTokens = 330, responseSeconds = 8;
  let measuredPrefill: number | undefined, measuredDecode: number | undefined;
  const n = (value: number | undefined, digits = 2) => value === undefined || !Number.isFinite(value) ? '—' : new Intl.NumberFormat(locale, { maximumFractionDigits: digits }).format(value);
  $: model = capacityModels.find(m => m.id === modelId) ?? capacityModels[0];
  $: input = { active, tokens, gpuCount, deployment, kvBytes, reserveGiB, extraGiB, freeGiB };
  $: suggestions = recommendGpus(model, input, vendor, scope);
  $: selectedGpu = capacityGpus.find(g => g.id === gpuId);
  $: comparison = selectedGpu ? { gpu: selectedGpu, count: gpuCount } : suggestions[0];
  $: assessment = comparison ? assessMemory(model, comparison.gpu, { ...input, gpuCount: comparison.count, freeGiB: selectedGpu ? freeGiB : undefined }) : undefined;
  $: demand = calculateDemand({ users, requestsPerMinute, calls, inputTokens, outputTokens, responseSeconds });
  $: prefillPressure = demand ? measuredPressure(demand.inputTokensPerSecond, measuredPrefill ?? 0) : undefined;
  $: decodePressure = demand ? measuredPressure(demand.outputTokensPerSecond, measuredDecode ?? 0) : undefined;
  $: barScale = assessment ? Math.max(assessment.capacityGiB, assessment.perDeviceGiB) : 1;
  function changeModel(event: Event) {
    modelId = (event.currentTarget as HTMLSelectElement).value;
    tokens = Math.min(tokens, (capacityModels.find(m => m.id === modelId) ?? capacityModels[0]).maxTokens);
  }
  function chooseGpu() { freeGiB = undefined; measuredPrefill = undefined; measuredDecode = undefined; }
  function adopt(gpu: string, count: number) { gpuId = gpu; gpuCount = count; chooseGpu(); }
  let previousBenchmarkSignature = '';
  $: benchmarkSignature = JSON.stringify({ modelId, gpuId, gpuCount, deployment, active, tokens, kvBytes, reserveGiB, extraGiB, inputTokens, outputTokens });
  $: {
    if (previousBenchmarkSignature && previousBenchmarkSignature !== benchmarkSignature) { measuredPrefill = undefined; measuredDecode = undefined; }
    previousBenchmarkSignature = benchmarkSignature;
  }
</script>

<section class="capacity-tool" {id} lang={locale} dir={locale === 'fa' ? 'rtl' : 'ltr'} aria-labelledby={`${id}-title`}>
  <header>
    <p class="eyebrow">{copy.eyebrow}</p>
    <h3 id={`${id}-title`}>{copy.title}</h3>
    <p>{copy.intro}</p>
  </header>

  <div class="controls">
    <label for={`${id}-model`}>{copy.model}
      <select id={`${id}-model`} bind:value={modelId} on:change={changeModel}>
        {#each capacityModels as m}<option value={m.id}>{m.basis === 'example' ? copy.exampleLabel : m.label}</option>{/each}
      </select>
    </label>
    <label for={`${id}-gpu`}>{copy.gpu}
      <select id={`${id}-gpu`} bind:value={gpuId} on:change={chooseGpu}>
        <option value="">{copy.auto}</option>
        {#each capacityGpus as g}<option value={g.id}>{hardwareText(g.model, locale)} · {n(g.memoryGB, 0)} GB{g.status === 'legacy' ? ` · ${copy.legacy}` : ''}</option>{/each}
      </select>
    </label>
    <label for={`${id}-count`}>{copy.count}
      <select id={`${id}-count`} bind:value={gpuCount} on:change={chooseGpu}>{#each [1, 2, 4, 8] as c}<option value={c}>{n(c, 0)}</option>{/each}</select>
    </label>
    <label for={`${id}-deployment`}>{copy.deployment}
      <select id={`${id}-deployment`} bind:value={deployment}>
        <option value="replicas">{copy.replicas}</option>
        <option value="shard">{copy.shard}</option>
      </select>
    </label>
  </div>

  <div class="sliders">
    <label for={`${id}-active`}><span>{copy.active} <output>{n(active, 0)}</output></span>
      <input id={`${id}-active`} type="range" min="1" max="512" step="1" aria-valuetext={`${n(active, 0)} ${copy.activeAria}`} bind:value={active} />
      <small>{copy.activeNote}</small>
    </label>
    <label for={`${id}-tokens`}><span>{copy.tokens} <output>{n(tokens, 0)}</output></span>
      <input id={`${id}-tokens`} type="range" min="256" max={model.maxTokens} step="256" aria-valuetext={`${n(tokens, 0)} ${copy.tokensAria}`} bind:value={tokens} />
      <small>{copy.tokenNote} {n(model.maxTokens, 0)} {copy.tokenUnit}</small>
    </label>
  </div>

  <details class="settings">
    <summary>{copy.settings}</summary>
    <p>{model.basis === 'example' ? copy.example : copy.fileBasis} {copy.geometry} {n(model.layers, 0)} {copy.layers} {n(model.kvHeads, 0)} {copy.heads} {n(model.headDim, 0)}.</p>
    {#if model.sourceUrl}<a href={model.sourceUrl} target="_blank" rel="noreferrer">{copy.weightSource}</a>{/if}
    <div class="controls">
      <label for={`${id}-kv`}>{copy.kvPrecision}<select id={`${id}-kv`} bind:value={kvBytes}><option value={2}>{copy.kv2}</option><option value={1}>{copy.kv1}</option><option value={4}>{copy.kv4}</option></select></label>
      <label for={`${id}-reserve`}>{copy.reserve}<input id={`${id}-reserve`} type="number" min="0" max="64" step=".5" bind:value={reserveGiB} /></label>
      <label for={`${id}-extra`}>{copy.extra}<input id={`${id}-extra`} type="number" min="0" max="256" step=".5" bind:value={extraGiB} /></label>
      {#if selectedGpu}<label for={`${id}-free`}>{copy.free}<input id={`${id}-free`} type="number" min=".1" max={selectedGpu.memoryGB} step=".1" placeholder={copy.freePlaceholder} bind:value={freeGiB} /></label>{/if}
    </div>
    <p class="note">{copy.assumptions}</p>
  </details>

  {#if assessment && comparison}
    <div class="memory-result" class:over={assessment.status === 'over'}>
      <p class="result-context">{selectedGpu ? copy.selected : copy.first}: <b dir="ltr">{n(comparison.count, 0)} × {hardwareText(comparison.gpu.model, locale)}</b></p>
      <h4 data-capacity-status={assessment.status} aria-live="polite" aria-atomic="true">{copy.status[assessment.status]}</h4>
      {#if assessment.status !== 'invalid' && assessment.status !== 'unsupported'}
        <div class="metrics">
          <div><small>{copy.budget}</small><strong>{n(assessment.perDeviceGiB)} <span>GiB</span></strong></div>
          <div><small>{assessment.capacityBasis === 'free-memory' ? copy.freeBasis : copy.nominalBasis}</small><strong>{n(assessment.capacityGiB)} <span>GiB</span></strong></div>
          <div><small>{assessment.remainingGiB < 0 ? copy.deficit : copy.headroom}</small><strong>{n(Math.abs(assessment.remainingGiB))} <span>GiB</span></strong></div>
          <div><small>{copy.ceiling}</small><strong>{n(assessment.maxActive, 0)}</strong></div>
        </div>
        <div class="memory-bar" role="img" aria-label={`${copy.barAria}: ${copy.weights} ${n(assessment.weightGiB)}, KV ${n(assessment.kvGiB)}, ${copy.other} ${n(assessment.reserveGiB + assessment.extraGiB)}`}>
          <span class="weights" style:width={`${100 * assessment.weightGiB / barScale}%`}></span><span class="kv" style:width={`${100 * assessment.kvGiB / barScale}%`}></span><span class="reserve" style:width={`${100 * (assessment.reserveGiB + assessment.extraGiB) / barScale}%`}></span>
        </div>
        <ul class="legend"><li><i class="weights"></i>{copy.weights} {n(assessment.weightGiB)} GiB</li><li><i class="kv"></i>KV {n(assessment.kvGiB)} GiB</li><li><i class="reserve"></i>{copy.other} {n(assessment.reserveGiB + assessment.extraGiB)} GiB</li></ul>
        <p class="note">{deployment === 'replicas' ? copy.replicaNote.replace('{active}', n(assessment.activePerDevice, 0)) : copy.shardNote}</p>
        <p class="note">{assessment.capacityBasis === 'nominal-class' ? copy.nominalNote : copy.freeNote} {copy.ceilingNote}</p>
      {/if}
      <p class="hardware-detail">{hardwareText(comparison.gpu.formFactor, locale)} · {hardwareText(comparison.gpu.cooling, locale)} · {hardwareText(comparison.gpu.hostInterface, locale)}</p>
      <a href={comparison.gpu.sourceUrl} target="_blank" rel="noreferrer">{copy.manufacturer}</a>
    </div>
  {:else}<p class="empty-result" role="status">{copy.empty}</p>{/if}

  <details class="recommendations" open={!selectedGpu}>
    <summary>{copy.recommendations}</summary>
    <div class="controls">
      <label for={`${id}-vendor`}>{copy.vendor}<select id={`${id}-vendor`} bind:value={vendor}><option value="NVIDIA">NVIDIA</option><option value="AMD">AMD</option><option value="Intel">Intel</option><option value="all">{copy.all}</option></select></label>
      <label for={`${id}-scope`}>{copy.scope}<select id={`${id}-scope`} bind:value={scope}><option value="desktop">{copy.desktop}</option><option value="server">{copy.server}</option><option value="all">{copy.all}</option></select></label>
    </div>
    <p>{copy.recommendationNote}</p>
    <ul class="candidate-list">
      {#each suggestions as s}
        <li><div><b dir="ltr">{n(s.count, 0)} × {hardwareText(s.gpu.model, locale)}</b><small>{n(s.gpu.memoryGB, 0)} {copy.perGpu} {n(s.assessment.remainingGiB)} GiB{deployment === 'shard' && s.count > 1 ? ` · ${copy.conditionalSuffix}` : ''}</small></div><button type="button" on:click={() => adopt(s.gpu.id, s.count)}>{copy.choose}</button></li>
      {:else}<li>{copy.noCandidates}</li>{/each}
    </ul>
    <p class="note">{copy.excluded}</p>
  </details>

  <details class="workload">
    <summary>{copy.workload}</summary>
    <div class="controls">
      <label for={`${id}-users`}>{copy.users}<input id={`${id}-users`} type="number" min="0" max="100000" step="1" bind:value={users} /></label>
      <label for={`${id}-rate`}>{copy.rate}<input id={`${id}-rate`} type="number" min="0" max="60" step=".1" bind:value={requestsPerMinute} /></label>
      <label for={`${id}-calls`}>{copy.calls}<input id={`${id}-calls`} type="number" min="1" max="100" step=".5" bind:value={calls} /></label>
      <label for={`${id}-input`}>{copy.input}<input id={`${id}-input`} type="number" min="0" step="100" bind:value={inputTokens} /></label>
      <label for={`${id}-output`}>{copy.output}<input id={`${id}-output`} type="number" min="0" step="10" bind:value={outputTokens} /></label>
      <label for={`${id}-response`}>{copy.response}<input id={`${id}-response`} type="number" min="0" step="1" bind:value={responseSeconds} /></label>
    </div>
    {#if demand}
      <dl class="demand"><div><dt>{copy.userRate}</dt><dd>{n(demand.userRequestsPerSecond, 3)}</dd></div><div><dt>{copy.callRate}</dt><dd>{n(demand.callsPerSecond, 3)}</dd></div><div><dt>{copy.inputDemand}</dt><dd>{n(demand.inputTokensPerSecond)}</dd></div><div><dt>{copy.outputDemand}</dt><dd>{n(demand.outputTokensPerSecond)}</dd></div><div><dt>{copy.inFlight}</dt><dd>{n(demand.inFlight)}</dd></div></dl>
      <p class="note">{copy.littleNote}</p>
    {:else}<p role="status">{copy.invalidDemand}</p>{/if}
    <div class="controls">
      <label for={`${id}-prefill`}>{copy.prefill}<input id={`${id}-prefill`} type="number" min="1" placeholder={copy.benchmarkPlaceholder} bind:value={measuredPrefill} /></label>
      <label for={`${id}-decode`}>{copy.decode}<input id={`${id}-decode`} type="number" min="1" placeholder={copy.benchmarkPlaceholder} bind:value={measuredDecode} /></label>
    </div>
    <p>{copy.pressure} Prefill <b>{prefillPressure === undefined ? copy.needsTest : percent(prefillPressure)}</b>; Decode <b>{decodePressure === undefined ? copy.needsTest : percent(decodePressure)}</b>.</p>
    <p class="note">{copy.pressureNote}</p>
  </details>
  <nav class="tool-links" aria-label={copy.navAria}><a href={`${base}/guides/gpu-selection/#gpu-comparison-table`}>{copy.gpuLink}</a><a href={`${base}/guides/llm/?view=hardware-feasibility#hardware-feasibility`}>{copy.llmLink}</a></nav>
</section>

<style>
  .capacity-tool{margin:36px 0;padding:clamp(16px,3vw,26px);border:1px solid var(--line);border-radius:16px;background:var(--paper);color:var(--ink);font-size:14px;line-height:1.9;min-width:0;scroll-margin-top:100px}
  .capacity-tool header h3{margin:0 0 12px;font-size:clamp(22px,3vw,29px);line-height:1.6}.eyebrow{color:var(--teal);font-size:12px;margin:0 0 4px}.capacity-tool p{font-size:14px;margin:12px 0}
  .controls{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px;margin:18px 0}.controls label,.sliders label{display:grid;gap:8px;min-width:0;font-weight:600;font-size:13px}
  select,input[type=number]{min-width:0;width:100%;box-sizing:border-box;font:inherit;color:var(--ink);background:var(--bg);border:1px solid var(--line);border-radius:8px;padding:10px;min-height:44px}select{max-width:100%}input[type=range]{width:100%;accent-color:var(--teal);min-height:30px;direction:ltr;margin:0}
  .sliders{display:grid;gap:20px;margin:24px 0}.sliders span{display:flex;justify-content:space-between;gap:12px}.sliders output{font-variant-numeric:tabular-nums;color:var(--teal);font-size:18px}.sliders small{font-weight:400;color:var(--muted);font-size:12px}
  details{border-top:1px solid var(--line);padding:16px 0;margin:0}summary{font-weight:700;cursor:pointer;list-style-position:inside}summary:focus-visible,button:focus-visible,input:focus-visible,select:focus-visible,a:focus-visible{outline:2px solid var(--teal);outline-offset:3px}
  .memory-result{background:var(--soft);padding:18px;border-radius:12px;margin:22px 0}.memory-result.over{border-inline-start:4px solid #bc6048}.result-context{font-size:12px!important}.memory-result h4{margin:6px 0 18px;font-size:21px}.metrics{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px}.metrics small{display:block;font-size:11px;color:var(--muted)}.metrics strong{font-size:24px;display:block}.metrics strong span{font-size:12px}
  .memory-bar{height:18px;display:flex;border-radius:6px;overflow:hidden;background:var(--line);direction:ltr;margin-top:20px}.weights{background:#147e87}.kv{background:#c08537}.reserve{background:#6d708a}.legend{display:flex;flex-wrap:wrap;gap:8px 14px;list-style:none;padding:0!important;font-size:11px}.legend li{font-size:12px!important;display:flex;align-items:center;gap:6px;line-height:1.6!important}.legend i{width:9px;height:9px;border-radius:2px;display:inline-block;flex-shrink:0}
  .note{font-size:12px!important;color:var(--muted);line-height:1.9}.hardware-detail{overflow-wrap:anywhere;font-size:12px!important}.candidate-list{list-style:none;padding:0!important;margin:12px 0}.candidate-list li{display:flex;justify-content:space-between;align-items:center;gap:12px;border-top:1px solid var(--line);padding:12px 0;font-size:13px!important}.candidate-list div{min-width:0}.candidate-list b{display:block;overflow-wrap:anywhere}.candidate-list small{display:block;color:var(--muted);font-size:11px}.candidate-list button{font:inherit;border:1px solid var(--teal);border-radius:8px;background:var(--soft);color:var(--ink);padding:8px 14px;cursor:pointer;flex-shrink:0;min-height:44px}
  .demand{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.demand div{padding:10px;border:1px solid var(--line);border-radius:8px}.demand dt{font-size:11px;color:var(--muted)}.demand dd{margin:4px 0 0;font-weight:700;font-size:19px}.tool-links{display:flex;flex-wrap:wrap;gap:12px 24px;padding-top:14px}.tool-links a{font-size:12px}.empty-result{border:1px dashed var(--line);border-radius:10px;padding:18px}
  @media(max-width:580px){.controls{grid-template-columns:1fr}.metrics{gap:12px}.metrics strong{font-size:21px}.candidate-list li{align-items:flex-start}.capacity-tool{font-size:13px;padding:16px}.memory-result{padding:14px}}
  @media(prefers-reduced-motion:reduce){*{scroll-behavior:auto}}
</style>
