<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { getLlmI18n } from '$lib/llm/i18n/context';
  import { hasReportedValue, evaluationMetricLabel, evaluationSettingLabel, reportedSettings } from '$lib/llm/evaluation-display';
  import { referenceRows, referencePartition, referenceDifference } from '$lib/llm/reference';
  import type { LlmGuideRepository } from '$lib/llm/schema';
  export let repository: LlmGuideRepository;
  export let targetLanguage: string;
  export let onOpenModel: (id: string,panel?: string)=>void;
  const {locale,numberFormat,t}=getLlmI18n();
  const n=new Intl.NumberFormat(numberFormat,{maximumFractionDigits:3});
  const copy={fa:{title:'مقایسهٔ مدل‌ها در آزمون‌های مشترک',group:'مقایسه',language:'زبان نتیجه',all:'همه',unknown:'بدون تفکیک زبان',aggregate:'میانگین چندزبانه',metric:'معیار آزمون',model:'مدل',score:'امتیاز',difference:'اختلاف با ردیف نخست',source:'جزئیات آزمون',empty:'برای این زبان در این گزارش نتیجه‌ای ثبت نشده است.',scope:'اعداد گزارش ناشر؛ اختلاف امتیاز در همین آزمون، نه درصد بهبود کیفیت یا رتبه‌بندی عمومی.',settings:'تنظیمات آزمون',missing:'گزارش نشده',revision:'نسخهٔ سند',weights:'نسخهٔ وزن آزموده‌شده'},en:{title:'Evidence for model selection',group:'Comparison',language:'Result language',all:'All',unknown:'Language not reported',aggregate:'Multilingual aggregate',metric:'Metric',model:'Model',score:'Score',difference:'Difference from first row',source:'Source and settings',empty:'No result for this language in this report.',scope:'Publisher-reported scores. Differences apply to this test, not percentage quality gains or a universal ranking.',settings:'Reported settings',missing:'Not reported',revision:'Document revision',weights:'Evaluated weight revision'},es:{title:'Evidencias para elegir un modelo',group:'Comparación',language:'Idioma del resultado',all:'Todos',unknown:'Idioma no informado',aggregate:'Agregado multilingüe',metric:'Métrica',model:'Modelo',score:'Puntuación',difference:'Diferencia respecto a la primera fila',source:'Fuente y configuración',empty:'No hay resultados de este idioma en el informe.',scope:'Puntuaciones publicadas por el editor. Las diferencias se limitan a esta prueba; no son porcentajes de mejora ni una clasificación general.',settings:'Configuración publicada',missing:'No informado',revision:'Revisión del documento',weights:'Revisión de pesos evaluados'}}[locale];
  function unitLabel(unit:string) {
    if (unit==='score-points-0-100') return {fa:'امتیاز از ۱۰۰',en:'points / 100',es:'puntos / 100'}[locale];
    if (unit==='score-points') return {fa:'امتیاز',en:'points',es:'puntos'}[locale];
    return unit;
  }
  $: groups=repository.referenceComparisons ?? [];
  $: requested=$page.url.searchParams.get('reference-group');
  $: group=groups.find(g=>g.id===requested) ?? groups.find(g=>g.id==='comparison:e5-miracl-by-language') ?? groups[0];
  $: language=$page.url.searchParams.get('reference-language') ?? (requested ? 'all' : targetLanguage);
  $: metric=$page.url.searchParams.get('reference-metric') ?? '';
  $: rows=group ? referenceRows(repository,group).filter(({report})=>Number.isFinite(report.value)) : [];
  const languageName=(value:string)=>value==='all'?copy.all:value==='unspecified'?copy.unknown:value==='multilingual'?copy.aggregate:new Intl.DisplayNames([locale],{type:'language'}).of(value) ?? value;
  $: filtered=rows.filter(({report})=>(language==='all' || (report.language ?? 'unspecified')===language) && (!metric || report.metric===metric));
  $: partitions=[...new Set(filtered.map(({report})=>referencePartition(report)))].map(key=>filtered.filter(({report})=>referencePartition(report)===key));
  async function choose(key:string,value:string) {const url=new URL($page.url);url.searchParams.set(key,value);if(key==='reference-group'){url.searchParams.delete('reference-metric');url.searchParams.set('reference-language','all');}await goto(url,{noScroll:true,keepFocus:true});}
</script>
<section class="reference-comparisons" id="reference-comparisons" aria-labelledby="reference-comparisons-title">
<h3 id="reference-comparisons-title">{copy.title}</h3><details><summary>{t('reference.methodology.title')}</summary>{#if group}<p>{group.interpretation[locale]}</p>{/if}<p>{t('reference.methodology.comparisonNotice')}</p></details>
{#if group}
<div class="filters"><label>{copy.group}<select value={group.id} on:change={e=>choose('reference-group',e.currentTarget.value)}>{#each groups as g}<option value={g.id}>{g.title[locale]}</option>{/each}</select></label>
<label>{copy.language}<select value={language} on:change={e=>choose('reference-language',e.currentTarget.value)}>{#each [...new Set(['all',...rows.map(r=>r.report.language ?? 'unspecified')])] as l}<option value={l}>{languageName(l)}</option>{/each}</select></label>
<label>{copy.metric}<select value={metric} on:change={e=>choose('reference-metric',e.currentTarget.value)}><option value="">{copy.all}</option>{#each [...new Set(rows.map(r=>r.report.metric))] as m}<option value={m}>{evaluationMetricLabel(m,locale)}</option>{/each}</select></label></div>
{#each partitions as partition}
{@const first=partition[0].report}
<h4><bdi>{first.benchmark}{first.benchmarkVersion ? ` · ${first.benchmarkVersion}` : ''} · {evaluationMetricLabel(first.metric,locale)}{#if first.language} · {languageName(first.language)}{/if}</bdi></h4>
<div class="scroll"><table><thead><tr><th>{copy.model}</th><th>{copy.score}</th>{#if group.allowed.withinReportNumericDifference}<th>{copy.difference}</th>{/if}<th>{copy.source}</th></tr></thead><tbody>
{#each partition as {result,report} (report.id)}
{@const source=repository.evidence.find(e=>e.id===report.sourceId)}
{@const delta=referenceDifference(group,first,report)}
<tr data-reference-result={report.id}><td><button on:click={()=>onOpenModel(result.modelVersionId,'quality')}><bdi>{result.reportedModelName}</bdi></button>{#if report.settings.pipelineRole}<small>{report.settings.pipelineRole}</small>{/if}</td><td><bdi>{n.format(report.value)} {unitLabel(report.unit)}</bdi></td>{#if group.allowed.withinReportNumericDifference}<td><bdi>{report.id!==first.id && delta!==null ? n.format(delta) : '—'}</bdi></td>{/if}<td><details><summary>{copy.source}</summary>{#if source}<a href={source.url} target="_blank" rel="noreferrer">{source.title} ↗</a>{/if}<small>{t('reference.evidence.'+(/relay|leaderboard/i.test(String(report.settings.scoreOrigin)) ? 'relayed' : report.reportingRelationship === 'publisher' ? 'publisher' : 'third-party'))}</small><p dir="auto">{report.sourceLocator}</p><dl>{#if hasReportedValue(report.sourceDocumentRevision)}<dt>{copy.revision}</dt><dd><bdi>{report.sourceDocumentRevision}</bdi></dd>{/if}{#if hasReportedValue(report.evaluatedWeightRevision)}<dt>{copy.weights}</dt><dd><bdi>{report.evaluatedWeightRevision}</bdi></dd>{/if}{#each reportedSettings(report.settings).filter(([key])=>key!=='pipelineRole') as [key,value]}<dt>{evaluationSettingLabel(key,locale)}</dt><dd dir="auto">{String(value)}</dd>{/each}</dl></details></td></tr>
{/each}</tbody></table></div>
{/each}
{#if !filtered.length}<p role="status">{copy.empty}</p>{/if}
{/if}
</section>
<style>
.reference-comparisons{margin-block:24px;padding:20px;border:1px solid var(--line);border-radius:9px;scroll-margin-top:90px;line-height:1.8}.filters{display:flex;flex-wrap:wrap;gap:12px}.filters label{display:grid;gap:5px;min-width:0;max-width:100%}select,button{font:inherit;color:var(--ink);background:var(--paper);border:1px solid var(--line);padding:7px;border-radius:5px;max-width:100%;min-width:0;box-sizing:border-box}button,summary{cursor:pointer}button,a{color:var(--link-ink)}h4{font-size:15px;margin-bottom:8px}.scroll{overflow-x:auto}table{border-collapse:collapse;width:100%;min-width:640px;font-size:14px}th,td{padding:10px;text-align:start;border-bottom:1px solid var(--line);vertical-align:top}small{display:block;color:var(--muted)}details{min-width:140px;max-width:460px}dd{margin:0;overflow-wrap:anywhere}a{overflow-wrap:anywhere}@media(max-width:600px){.reference-comparisons{padding:12px}.filters{display:grid;grid-template-columns:minmax(0,1fr)}.filters label{width:100%}.filters select{width:100%;min-width:0}th,td{padding:7px}}
</style>
