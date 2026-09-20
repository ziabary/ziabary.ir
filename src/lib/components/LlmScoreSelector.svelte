<script lang="ts">
 import { browser } from '$app/environment';
 $: routeParams = browser ? $page.url.searchParams : new URLSearchParams();
 import { evaluationMetricLabel } from '$lib/llm/evaluation-display';
 import { page } from '$app/stores';import { goto } from '$app/navigation';
 import { getLlmI18n } from '$lib/llm/i18n/context';import { createLlmGuide } from '$lib/llm/guide';
 import { benchmarkScope, metricCutoff, readScoreScope } from '$lib/llm/score-scope';
 import type { PublishedEvaluation } from '$lib/llm/schema';
 export let results:PublishedEvaluation[];
 const i18n=getLlmI18n();const {locale}=i18n;const {applications}=createLlmGuide(i18n);
 const c={fa:{title:'آزمونِ ستون نتیجه',task:'کاربرد',test:'آزمون و نسخه',language:'زبان نتیجه',metric:'معیار',cutoff:'تعداد نتیجهٔ اول',all:'همه',grouped:'دیدن نتایج به تفکیک آزمون',note:'این انتخاب برای ستون نتیجهٔ همهٔ جدول‌هاست. شرایط اجرا در جزئیات هر مدل آمده است.'},en:{title:'Test shown in the result column',task:'Task',test:'Test and version',language:'Result language',metric:'Metric',cutoff:'Top results',all:'All',grouped:'Results grouped by test',note:'This selection applies to result columns across tables. Execution conditions are available in each model’s details.'},es:{title:'Prueba de la columna de resultados',task:'Tarea',test:'Prueba y versión',language:'Idioma del resultado',metric:'Métrica',cutoff:'Primeros resultados',all:'Todos',grouped:'Resultados agrupados por prueba',note:'Esta selección se aplica a las columnas de resultados. Las condiciones figuran en los detalles de cada modelo.'}}[locale];
 $: scope=readScoreScope(routeParams.get('score'),locale);
 $: eligible=results.filter(r=>!scope.task||r.applicationIds.some(id=>id===scope.task));
 $: tests=[...new Set(eligible.map(benchmarkScope))].sort();
 $: metrics=[...new Set(eligible.filter(r=>!scope.benchmark||benchmarkScope(r)===scope.benchmark).map(r=>r.metric))].sort();
 async function set(key:keyof typeof scope,value:string){const next={...scope,[key]:value};if(key==='task'){next.benchmark='';next.metric='';next.cutoff='';}if(key==='benchmark'){next.metric='';next.cutoff='';}if(key==='metric')next.cutoff=metricCutoff(value);const url=new URL($page.url);url.searchParams.set('score',JSON.stringify(next));await goto(url,{noScroll:true,keepFocus:true});}
 $: qualityLink=(()=>{const u=new URL($page.url);u.searchParams.set('quality',JSON.stringify({task:scope.task,benchmark:scope.benchmark,language:scope.language,metric:scope.metric,ids:[]}));u.searchParams.set('benchmark-view','quality');u.searchParams.delete('research-model');u.hash='quality-title';return u.pathname+u.search+u.hash;})();
</script>
<details class="score-scope"><summary>{c.title}: <bdi>{scope.benchmark||c.all} · {scope.metric?evaluationMetricLabel(scope.metric,locale):c.all} · {scope.language||c.all}</bdi></summary>
 <div class="scope-filters">
 <label>{c.task}<select value={scope.task} on:change={e=>set('task',e.currentTarget.value)}><option value="">{c.all}</option>{#each applications as a}<option value={a.id}>{a.label}</option>{/each}</select></label>
 <label>{c.test}<select value={scope.benchmark} on:change={e=>set('benchmark',e.currentTarget.value)}><option value="">{c.all}</option>{#each tests as name}<option value={name}>{name}</option>{/each}</select></label>
 <label>{c.language}<select value={scope.language} on:change={e=>set('language',e.currentTarget.value)}><option value="">{c.all}</option>{#each [...new Set(results.flatMap(r=>r.languageScope?.kind==='single'?[r.languageScope.language]:[]))].sort() as language}<option value={language}>{new Intl.DisplayNames([locale],{type:'language'}).of(language)??language}</option>{/each}</select></label>
 <label>{c.metric}<select value={scope.metric} on:change={e=>set('metric',e.currentTarget.value)}><option value="">{c.all}</option>{#each metrics as metric}<option value={metric}>{evaluationMetricLabel(metric,locale)}</option>{/each}</select></label>
 <label>{c.cutoff}<select value={scope.cutoff} on:change={e=>set('cutoff',e.currentTarget.value)}><option value="">{c.all}</option>{#each [...new Set(metrics.map(metricCutoff).filter(Boolean))] as cutoff}<option value={cutoff}>{cutoff}</option>{/each}</select></label>
 </div><p>{c.note}</p><a href={qualityLink}>{c.grouped} ←</a>
</details>
<style>.score-scope{margin-block:14px;padding:12px;border:1px solid var(--line);border-radius:7px;font-size:13px;line-height:1.8}summary{cursor:pointer;color:var(--link-ink)}.scope-filters{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:10px;margin-block:14px}label{display:grid;gap:6px}select{font:inherit;min-width:0;max-width:100%;padding:7px;background:var(--paper);color:var(--ink);border:1px solid var(--line);border-radius:5px}p{color:var(--muted)}a{color:var(--link-ink)}</style>
