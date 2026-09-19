<script lang="ts">
  import { getLlmI18n } from '$lib/llm/i18n/context';
  const i18n = getLlmI18n();
  const { t, locale, direction, numberFormat } = i18n;
  const { research, researchModel, calculateMemory, faNumber, researchEvidenceId } = createLlmResearch(i18n);
  import type { LlmGuideRepository } from '$lib/llm/schema';
  import { createLlmResearch } from '$lib/llm/research';
  import { llmBrand } from '$lib/llm/brands';
  import { page } from '$app/stores';
  import { llmSelectionHref } from '$lib/llm/selection';
  import LlmEvidence from './LlmEvidence.svelte';
  export let repository: LlmGuideRepository;
  export let modelId: string;
  let context = 8192, active = 1;
  $: artifacts = research.artifacts.filter(item => researchModel(repository, item.modelRepository)?.id === modelId);
  $: downloads = repository.artifactListings.filter(item => item.modelVersionId === modelId && item.totalBytes !== undefined);
  $: profile = repository.modelProfiles.find(item => item.modelVersionId === modelId);
  $: routes = research.compatibility.filter(item => researchModel(repository, item.modelScope)?.id === modelId);
  $: runs = research.performance.filter(item => researchModel(repository, item.modelRepository)?.id === modelId);
  $: claims = research.airllm.filter(item => researchModel(repository, item.modelRepository)?.id === modelId);
  $: publisherMemory = research.memoryClaims.filter(item => researchModel(repository, item.modelRepository)?.id === modelId);
  $: vector = research.specialized.find(item => researchModel(repository, item.modelRepository)?.id === modelId);
  const link = (view: string) => llmSelectionHref($page.url, {view, 'research-model': modelId, model: null, panel: null, ...(view === 'benchmarks' ? {'benchmark-view':'performance'} : {})}, view === 'deployment-compatibility' ? 'serving-software' : view);
</script>
<section class="research-profile">
  <h3>{t('LlmModelResearch.1113')}</h3>
  {#if !artifacts.length && downloads.length}
    <p>{t('LlmModelResearch.1114')}</p>
    <div class="artifact-budgets">{#each downloads.filter(item => item.format !== 'gguf' || ['Q4_K_M','Q8_0','MXFP4'].includes(item.variant.toUpperCase())).slice(0,6) as item}<article><header><bdi>{item.format.toUpperCase()} · {item.variant}</bdi><small>{item.publisher}</small></header><strong>{faNumber(item.totalBytes! / 2 ** 30)} GiB</strong><a href={item.filesUrl} target="_blank" rel="noopener noreferrer">{t('LlmModelResearch.1115')}</a></article>{/each}</div>
  {/if}
  {#if artifacts.length}
    <div class="scenario"><label>{t('LlmModelResearch.1116')}<select bind:value={context}><option value={4096}>{t('LlmModelResearch.1117')}</option><option value={8192}>{t('LlmModelResearch.1118')}</option><option value={32768}>{t('LlmModelResearch.1119')}</option></select></label><label>{t('LlmModelResearch.1120')}<input type="number" min="1" max="128" step="1" bind:value={active} /></label></div>
    <p>{t('LlmModelResearch.1121')}</p>
    <div class="artifact-budgets">{#each artifacts as artifact}{@const plan = calculateMemory(artifact,context,active)}<article><header><bdi>{artifact.quantization}</bdi><small>{artifact.repository.split('/')[0]}</small></header>{#if plan}<strong>{faNumber(plan.budgetGiB)} GiB</strong><p>{t('LlmModelResearch.1122')} {faNumber(plan.weightGiB)} · KV: {faNumber(plan.kvGiB)} GiB</p>{:else}<p>{t('LlmModelResearch.1123')} {faNumber(artifact.artifactContextLimitTokens,0)} {t('LlmModelResearch.1124')}</p>{/if}</article>{/each}</div>
  {/if}
  {#if claims.length || publisherMemory.length}
    {#each claims as item}<article class="route"><h4>{t('LlmModelResearch.1125')}</h4><p>{faNumber(item.reportedVramGB)} {t('LlmModelResearch.1126')} {item.modelRepository}. {item.userSummaryFa}</p><p>{t('LlmModelResearch.1127')} <bdi>{item.dependenciesAsReported}</bdi></p><LlmEvidence ids={item.sourceIds.map(researchEvidenceId)} evidence={repository.evidence} /></article>{/each}
    {#each publisherMemory as item}<article class="route"><h4>{t('LlmModelResearch.1128')}</h4><p>{faNumber(item.reportedMemoryGB)} {t('LlmModelResearch.1129')}</p><LlmEvidence ids={item.sourceIds.map(researchEvidenceId)} evidence={repository.evidence} /></article>{/each}
  {/if}
  {#if vector?.denseFloat32VectorGiBPerMillionDocuments !== undefined}<p>{t('LlmModelResearch.1130')} <bdi>{faNumber(vector.denseFloat32VectorGiBPerMillionDocuments)} GiB</bdi>{t('LlmModelResearch.1131')}</p>{/if}
  {#if routes.length}<h4>{t('LlmModelResearch.1132')}</h4>{#each routes as route}<article class="route"><header>{#if llmBrand(route.engine)}<img src={llmBrand(route.engine)} alt="" width="28" height="28" />{/if}<bdi>{route.engine} {route.engineVersion ?? ''}</bdi><small>{route.status === 'published-run' ? t('LlmModelResearch.1133') : t('LlmModelResearch.1134')}</small></header><p>{route.userSummaryFa}</p><LlmEvidence ids={route.sourceIds.map(researchEvidenceId)} evidence={repository.evidence} /></article>{/each}{/if}
  {#if runs.length}<p>{faNumber(runs.length)} {t('LlmModelResearch.1135')}</p>{/if}
  {#if !routes.length && profile?.runGuides.length}<h4>{t('LlmModelResearch.1136')}</h4>{#each profile.runGuides as guide}<p><a href={guide.href} target="_blank" rel="noopener noreferrer">{guide.engineLabel ?? guide.engine} ↗</a>{#if guide.instructions} · {guide.instructions}{/if}</p>{/each}{/if}
  <div class="links"><a href={link('hardware-feasibility')}>{t('LlmModelResearch.1137')}</a>{#if routes.length || profile?.runGuides.length}<a href={link('deployment-compatibility')}>{t('LlmModelResearch.1138')}</a>{/if}{#if runs.length}<a href={link('benchmarks')}>{t('LlmModelResearch.1139')}</a>{/if}</div>
</section>
<style>
  .scenario{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}.scenario label{display:flex;flex-direction:column;gap:7px;color:var(--muted)}input,select{font:inherit;background:var(--paper);color:var(--ink);border:1px solid var(--line);border-radius:7px;padding:8px;min-width:0;box-sizing:border-box;width:100%}input{direction:ltr;text-align:start}.artifact-budgets{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.artifact-budgets article,.route{border:1px solid var(--line);border-radius:9px;padding:14px;margin:12px 0;background:var(--soft)}header{display:flex;align-items:center;gap:12px;flex-wrap:wrap}header small{color:var(--muted)}header img{object-fit:contain;background:white;border-radius:5px;padding:3px;box-sizing:border-box}.artifact-budgets strong{display:block;font-size:24px;margin-top:10px}.artifact-budgets p{font-size:12px;margin-bottom:0}.links{display:flex;gap:18px;flex-wrap:wrap;margin-top:18px}a{color:var(--link-ink)}@media(max-width:550px){.scenario,.artifact-budgets{grid-template-columns:1fr}}
</style>
