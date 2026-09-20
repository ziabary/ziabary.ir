<script lang="ts">
  import { hasReportedValue, evaluationMetricLabel, evaluationUnitLabel, hasNumericResult } from '$lib/llm/evaluation-display';
  import { benchmarkScope } from '$lib/llm/score-scope';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { browser } from '$app/environment';
  import { getLlmI18n } from '$lib/llm/i18n/context';
  import { evaluationLanguage, languageScopeKey, qualityComparison, resultMatchesLanguage, metricSemantics } from '$lib/llm/evaluation';
  import { createLlmGuide } from '$lib/llm/guide';
  import type { LlmGuideRepository, PublishedEvaluation } from '$lib/llm/schema';
  import LlmPublishedEvaluations from './LlmPublishedEvaluations.svelte';
  export let repository: LlmGuideRepository;
  export let targetLanguage: string;
  export let onOpenModel: (id: string, panel?: string) => void;
  const i18n = getLlmI18n();
  const { locale, numberFormat, t } = i18n;
  const { applications } = createLlmGuide(i18n);
  const n = new Intl.NumberFormat(numberFormat, { maximumFractionDigits: 3 });
  const copy = {
    fa: { title:'نتایج کیفیت مدل‌ها', intro:'آزمون، زبان و سنجه را انتخاب کنید؛ شرایط متفاوت در جزئیات هر نتیجه دیده می‌شوند.', task:'کاربرد', test:'آزمون', language:'زبان یا جهت زبان‌ها', metric:'معیار آزمون', all:'همه', model:'مدل', score:'امتیاز', mode:'حالت آزمون', reporter:'گزارش‌دهنده', select:'انتخاب برای مقایسه', comparable:'نتایج انتخاب‌شده مربوط به یک آزمون با شرایط مشترک‌اند.', display:'شرایط این آزمون‌ها یکسان نیست یا کامل مشخص نشده؛ امتیازها را رتبه‌بندی نمی‌کنیم.', empty:'نتیجه‌ای با این فیلترها ثبت نشده است.', detail:'جزئیات آزمون', higher:'بیشتر بهتر است', lower:'کمتر بهتر است', unknown:'جهت سنجه مشخص نیست', comparison:'مقایسهٔ انتخاب‌شده‌ها', reset:'پاک‌کردن انتخاب', unspecified:'بدون تفکیک زبان', aggregate:'میانگین چندزبانه', difference:'تفاوت یا کمبود شرایط', source:'منبع' },
    en: { title:'Quality in published evaluations', intro:'Choose a task, benchmark, language and metric. Each result retains its own reported conditions.', task:'Task', test:'Benchmark and version', language:'Language or language direction', metric:'Metric', all:'All', model:'Model', score:'Score and scale', mode:'Mode / subset', reporter:'Reporter', select:'Select for comparison', comparable:'These results can be ordered within this evaluation. Numerical order is not statistical superiority.', display:'Side by side only: relevant conditions differ or are not established.', empty:'No recorded result matches these filters.', detail:'Conditions and source', higher:'Higher is better', lower:'Lower is better', unknown:'Metric direction is unspecified', comparison:'Selected results', reset:'Clear selection', unspecified:'Language unspecified', aggregate:'Multilingual aggregate', difference:'Different or missing conditions', source:'Source' },
    es: { title:'Calidad en evaluaciones publicadas', intro:'Elige una tarea, prueba, idioma y métrica. Cada resultado conserva las condiciones de su informe.', task:'Tarea', test:'Prueba y versión', language:'Idioma o dirección lingüística', metric:'Métrica', all:'Todos', model:'Modelo', score:'Puntuación y escala', mode:'Modo / subconjunto', reporter:'Autor del informe', select:'Seleccionar para comparar', comparable:'Estos resultados se pueden ordenar dentro de esta evaluación. El orden numérico no demuestra superioridad estadística.', display:'Solo comparación visual: faltan condiciones pertinentes o estas difieren.', empty:'No hay resultados registrados con estos filtros.', detail:'Condiciones y fuente', higher:'Mayor es mejor', lower:'Menor es mejor', unknown:'No se especifica la dirección de la métrica', comparison:'Resultados seleccionados', reset:'Borrar selección', unspecified:'Idioma no especificado', aggregate:'Promedio multilingüe', difference:'Condiciones distintas o desconocidas', source:'Fuente' }
  }[locale];
  $: availableResults = repository.publishedEvaluations.filter(hasNumericResult);
  const languageName=(value:string)=>value==='unspecified'?copy.unspecified:value==='aggregate'?copy.aggregate:value.split('>').map(code=>new Intl.DisplayNames([locale],{type:'language'}).of(code) ?? code).join(' → ');
  let task = '', benchmark = '', language = '', metric = '', subset = '', ids: string[] = [];
  const subsetKey = (r: PublishedEvaluation) => [r.settings.datasetConfig, r.settings.datasetSplit].filter(Boolean).join(' / ') || 'unspecified';
  const modeLabel = (mode: string) => ({reasoning:t('LlmPublishedEvaluations.1140'),thinking:t('LlmPublishedEvaluations.1141'),'non-thinking':t('LlmPublishedEvaluations.1143'),instruct:t('LlmPublishedEvaluations.1142')}[mode] ?? mode);
  const relationshipLabel = (value: string) => value === 'publisher' ? t('LlmPublishedEvaluations.1190') : value === 'independent' ? t('LlmPublishedEvaluations.1191') : t('LlmPublishedEvaluations.1192');
  const directionLabel = (r: PublishedEvaluation) => { const direction=metricSemantics(r.metric,r.unit).direction; return direction==='higher'?copy.higher:direction==='lower'?copy.lower:copy.unknown; };
  let applied: string | null = null;
  const benchmarkKey = benchmarkScope;
  const languageKey = (r: PublishedEvaluation) => languageScopeKey(r.languageScope ?? evaluationLanguage(r.language));
  $: value = browser ? $page.url.searchParams.get('quality') ?? '' : '';
  $: selectionKey = value || `default:${targetLanguage}`;
  $: initialResult = ['MATH-500','MIRACL','MMTEB'].flatMap(test => availableResults.filter(item => item.benchmark === test && resultMatchesLanguage(item,targetLanguage)))[0];
  $: if (selectionKey !== applied) {
    let saved: any = {}; try { saved = JSON.parse(value.length <= 12000 ? value || '{}' : '{}'); } catch {}
    const allowed = (key: string, options: string[], fallback = '') => typeof saved?.[key] === 'string' && options.includes(saved[key]) ? saved[key] : fallback;
    task = allowed('task',availableResults.flatMap(item => item.applicationIds));
    benchmark = allowed('benchmark',['',...availableResults.map(benchmarkKey)], initialResult ? benchmarkKey(initialResult) : '');
    language = allowed('language',['',...availableResults.map(languageKey)], targetLanguage === 'all' ? '' : targetLanguage);
    subset = allowed('subset',['',...availableResults.map(subsetKey)]);
    metric = allowed('metric',['',...availableResults.map(item => item.metric)], initialResult?.metric ?? '');
    ids = Array.isArray(saved?.ids) ? [...new Set<string>(saved.ids.filter((id: string) => availableResults.some(item => item.id === id)))].slice(0,6) : [];
    applied = selectionKey;
  }
  $: candidates = availableResults.filter(item => (!task || item.applicationIds.some(id => id === task)) && (!benchmark || benchmarkKey(item) === benchmark));
  $: results = candidates.filter(item => (!language || languageKey(item) === language) && (!metric || item.metric === metric) && (!subset || subsetKey(item) === subset));
  $: groups = [...results.reduce((map, result) => {const key=[benchmarkKey(result),evaluationMetricLabel(result.metric,locale),languageName(languageKey(result)),evaluationUnitLabel(result.unit,locale)].join(' · ');map.set(key,[...(map.get(key)??[]),result]);return map;},new Map<string,PublishedEvaluation[]>())];
  $: hasMode = results.some(result=>hasReportedValue(result.mode) || hasReportedValue(result.settings.datasetSplit) || hasReportedValue(result.settings.datasetConfig));
  $: subsets = [...new Set(candidates.map(subsetKey))].filter(value=>value!=='unspecified').sort();
  $: selected = availableResults.filter(item => ids.includes(item.id));
  $: comparison = qualityComparison(selected);
  $: ordered = comparison.rank ? [...selected].sort((a,b) => comparison.direction === 'lower' ? a.value-b.value : b.value-a.value) : selected;
  async function save() {
    const url = new URL($page.url); const next = JSON.stringify({task,benchmark,language,metric,subset,ids});
    applied = next; url.searchParams.set('quality',next);
    await goto(url,{ noScroll:true,keepFocus:true });
  }
  function select(id: string) { ids = ids.includes(id) ? ids.filter(value => value !== id) : [...ids,id].slice(-6); save(); }
  function download() {
    const output = { kind:'published-quality-selection', generatedAt:new Date().toISOString(), comparison, results:selected.map(result => ({...result, sources:result.evidenceIds.map(id=>repository.evidence.find(source=>source.id===id)).filter(Boolean)})) };
    const url=URL.createObjectURL(new Blob([JSON.stringify(output,null,2)],{type:'application/json'}));
    const a=document.createElement('a');a.href=url;a.download='llm-quality-selection.json';a.click();URL.revokeObjectURL(url);
  }
</script>
<section class="quality-view" aria-labelledby="quality-title">
  <h3 id="quality-title">{copy.title}</h3>
  <div class="quality-filters">
    <label>{copy.task}<select bind:value={task} on:change={save}><option value="">{copy.all}</option>{#each applications as item}<option value={item.id}>{item.label}</option>{/each}</select></label>
    <label>{copy.test}<select bind:value={benchmark} on:change={() => {language='';metric='';subset='';ids=[];save();}}><option value="">{copy.all}</option>{#each [...new Set(availableResults.map(benchmarkKey))].sort() as item}<option value={item}>{item}</option>{/each}</select></label>
    <label>{copy.language}<select bind:value={language} on:change={save}><option value="">{copy.all}</option>{#each [...new Set(candidates.map(languageKey))].sort() as item}<option value={item}>{languageName(item)}</option>{/each}</select></label>
    <label>{copy.metric}<select bind:value={metric} on:change={save}><option value="">{copy.all}</option>{#each [...new Set(candidates.map(item=>item.metric))].sort() as item}<option value={item}>{evaluationMetricLabel(item,locale)}</option>{/each}</select></label>
    {#if subsets.length}<label>{t('quality.datasetConfig')}<select bind:value={subset} on:change={save}><option value="">{copy.all}</option>{#each subsets as item}<option value={item}>{item}</option>{/each}</select></label>{/if}
  </div>
  {#if selected.length}
    <aside class="quality-comparison"><h4>{copy.comparison}</h4><p>{comparison.rank ? copy.comparable : copy.display}</p>
      <p>{comparison.direction==='higher'?copy.higher:comparison.direction==='lower'?copy.lower:copy.unknown}</p>
      {#if comparison.reasons.length}<p>{copy.difference}: {comparison.reasons.map(reason=>t('quality.'+reason)).join(' · ')}</p>{/if}
      <ol>{#each ordered as item}<li><bdi>{item.reportedModelName}</bdi> · {n.format(item.value)} {evaluationUnitLabel(item.unit,locale)}</li>{/each}</ol>
      <button on:click={()=>{ids=[];save();}}>{copy.reset}</button><button on:click={download}>JSON ↓</button>
    </aside>
  {/if}
  {#each groups as [groupTitle, groupResults]}
  <h4>{groupTitle}</h4>
  <!-- svelte-ignore a11y_no_noninteractive_tabindex (keyboard access to horizontally scrolling results) -->
  <div class="quality-scroll" tabindex="0" role="region" aria-label={copy.title}>
    <table><thead><tr><th>{copy.select}</th><th>{copy.model}</th><th>{copy.score}</th>{#if hasMode}<th>{copy.mode}</th>{/if}<th>{copy.reporter}</th><th>{copy.source}</th></tr></thead><tbody>
      {#each groupResults as result (result.id)}<tr><td><input type="checkbox" aria-label={`${copy.select}: ${result.reportedModelName}`} checked={ids.includes(result.id)} on:change={()=>select(result.id)} /></td><td><button on:click={()=>onOpenModel(result.modelVersionId,'quality')}><bdi>{result.reportedModelName}</bdi></button></td><td><bdi>{n.format(result.value)} {evaluationUnitLabel(result.unit,locale)}</bdi>{#if hasReportedValue(result.settings.metricScale ?? result.settings.sourceScale)}<small>{result.settings.metricScale ?? result.settings.sourceScale}</small>{/if}</td>{#if hasMode}<td>{result.mode ? modeLabel(result.mode) : '—'}{#if hasReportedValue(result.settings.datasetSplit) || hasReportedValue(result.settings.datasetConfig)}<small>{[result.settings.datasetSplit,result.settings.datasetConfig].filter(hasReportedValue).join(' · ')}</small>{/if}</td>{/if}<td>{result.reporter}<small>{relationshipLabel(result.reportingRelationship)}</small></td><td><details><summary>{copy.detail}</summary><LlmPublishedEvaluations compact results={[result]} evidence={repository.evidence} /></details></td></tr>{/each}
    </tbody></table>
  </div>
  {/each}
  {#if !results.length}<p role="status">{copy.empty}</p>{/if}
</section>
<style>
.quality-view{margin-block:24px;padding:20px;border:1px solid var(--line);border-radius:10px;background:var(--paper);font-size:14px;line-height:1.8;min-width:0}.quality-view h3{margin:0;font-size:22px}.quality-view p{color:var(--muted)}.quality-filters{display:grid;grid-template-columns:repeat(auto-fit,minmax(175px,1fr));gap:12px;margin-block:20px}label{display:grid;gap:6px}select,button{font:inherit;color:var(--ink);background:var(--paper);border:1px solid var(--line);border-radius:6px;padding:7px;min-width:0;max-width:100%}button{cursor:pointer;color:var(--link-ink)}.quality-scroll{overflow:auto;max-height:620px}table{border-collapse:collapse;width:100%;min-width:780px}th,td{border-bottom:1px solid var(--line);padding:10px;text-align:start;vertical-align:top}th{background:var(--soft);position:sticky;top:0}td:last-child{min-width:240px}small{display:block;color:var(--muted)}summary{cursor:pointer;color:var(--link-ink)}.quality-comparison{border-inline-start:3px solid var(--teal);padding:12px;margin-block:15px}.quality-comparison button{margin-inline-end:10px}@media(max-width:700px){.quality-filters{grid-template-columns:1fr}.quality-view{padding:14px}}
</style>
