<script lang="ts">
  import { getLlmI18n } from '$lib/llm/i18n/context';
  import { wizardLicense } from '$lib/llm/wizard';
  import { page } from '$app/stores';
  import { browser } from '$app/environment';
  import { goto } from '$app/navigation';
  import tasks from '../../../data/llm/starting-tasks.json';
  import { modelLanguageEvidence } from '$lib/llm/evaluation';
  import { llmBrand } from '$lib/llm/brands';
  import type { LlmGuideRepository } from '$lib/llm/schema';
  import LlmEvidence from './LlmEvidence.svelte';
  import LlmReferenceGuidance from './LlmReferenceGuidance.svelte';
  export let repository: LlmGuideRepository;
  export let targetLanguage = 'fa';
  export let onOpenModel: (id: string, panel?: string) => void;
  const {t,locale} = getLlmI18n();
  $: requestedTask = browser ? $page.url.searchParams.get('task') : null;
  $: selected = tasks.some(item => item.id === requestedTask) ? requestedTask! : 'chat';
  async function selectTask(value: string) {
    const url = new URL($page.url); url.searchParams.set('task', value);
    await goto(url, { noScroll: true, keepFocus: true });
  }
  $: task = tasks.find(task => task.id === selected)!;
  $: choices = task.candidates.filter(item => (item.languages.includes('all') || targetLanguage === 'all' || item.languages.includes(targetLanguage)) && (locale==='fa'||repository.models.some(model=>model.id===item.modelVersionId&&wizardLicense(model,locale)!=='noncommercial')));
  const copy = {
    fa: {title:'کدام مدل برای کار من مناسب است؟', task:'کار مورد نظر', basis:'نقطهٔ شروع بر پایهٔ مستندات؛ رتبه‌بندی کیفیت نیست.', profile:'پرونده و نتایج', download:'دریافت مدل', run:'مسیر اجرا', empty:'نامزد بررسی‌شده برای این زبان و وظیفه ثبت نشده است؛ کاتالوگ را با فیلتر نقش و زبان بررسی کنید.'},
    en: {title:'Which model should I consider?', task:'Your task', basis:'Documented starting points, not a quality ranking.', profile:'Profile and results', download:'Download', run:'Run guide', empty:'No reviewed candidate is recorded for this language and task. Use the catalog’s role and language filters.'},
    es: {title:'¿Qué modelo conviene considerar?', task:'Tu tarea', basis:'Puntos de partida documentados, no una clasificación de calidad.', profile:'Perfil y resultados', download:'Descargar', run:'Guía de ejecución', empty:'No hay candidatos revisados para este idioma y tarea. Consulta los filtros de función e idioma del catálogo.'}
  }[locale];
</script>
<details class="task-start"><summary>{copy.title}</summary>
  <label>{copy.task}<select value={selected} on:change={event => selectTask(event.currentTarget.value)}>{#each tasks as item}<option value={item.id}>{t(item.titleKey)}</option>{/each}</select></label>
  <p>{copy.basis}</p><LlmReferenceGuidance {locale} {onOpenModel} modelNames={Object.fromEntries(repository.models.map(m=>[m.id,m.exactName]))} />
  <div class="candidates">{#each choices as candidate (candidate.modelVersionId)}
    {@const model = repository.models.find(model => model.id === candidate.modelVersionId)}
    {@const profile = repository.modelProfiles.find(profile => profile.modelVersionId === candidate.modelVersionId)}
    {#if model && profile}<article>
      <header>{#if llmBrand(model.id)}<img src={llmBrand(model.id)} alt="" width="32" height="32" />{/if}<bdi>{model.exactName}</bdi></header>
      <p>{t(candidate.explanationKey)}</p>
      {#if targetLanguage !== 'all'}<small>{targetLanguage}: {t('language.evidence.'+modelLanguageEvidence(repository,model,targetLanguage,task.applicationId as never))}</small>{/if}
      <nav><button on:click={()=>onOpenModel(model.id)}>{copy.profile}</button><button on:click={()=>onOpenModel(model.id,'downloads')}>{copy.download}</button><button on:click={()=>onOpenModel(model.id,'run')}>{copy.run}</button></nav>
      {#if locale!=='fa'&&wizardLicense(model,locale)==='conditions'}<details><summary>{model.license.name.state==='known'?model.license.name.value:'License'}</summary>{#each model.license.restrictions??[] as condition}<p>{condition}</p>{/each}{#if model.license.url.state==='known'}<a href={model.license.url.value}>{locale==='es'?'Condiciones de los pesos':'Weight license conditions'}</a>{/if}</details>{/if}
      <LlmEvidence ids={profile.evidenceIds} evidence={repository.evidence} />
    </article>{/if}
  {/each}</div>
  {#if !choices.length}<p>{copy.empty}</p>{/if}
</details>
<style>
.task-start{padding:16px;margin-block:18px;border:1px solid var(--line);border-radius:9px;background:var(--paper);font-size:14px;line-height:1.9}summary{color:var(--link-ink);font-weight:600;cursor:pointer}label{display:grid;gap:8px;max-width:450px;margin-block:15px}select,button{font:inherit;background:var(--paper);color:var(--ink);border:1px solid var(--line);border-radius:6px;padding:7px;min-width:0}button{color:var(--link-ink);cursor:pointer}.candidates{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}article{border:1px solid var(--line);padding:16px;border-radius:8px;min-width:0}header{display:flex;align-items:center;gap:10px}header img{object-fit:contain;padding:3px;background:white;border-radius:5px}nav{display:flex;gap:9px;flex-wrap:wrap;margin-block:14px}small{color:var(--muted)}@media(max-width:750px){.candidates{grid-template-columns:1fr}}
</style>
