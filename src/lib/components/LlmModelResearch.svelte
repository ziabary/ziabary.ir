<script lang="ts">
  import type { LlmGuideRepository } from '$lib/llm/schema';
  import { research, researchModel, calculateMemory, faNumber, researchEvidenceId } from '$lib/llm/research';
  import { llmBrand } from '$lib/llm/brands';
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
  const link = (view: string) => `/guides/llm/?show-drafts=true&view=${view}&research-model=${encodeURIComponent(modelId)}#${view === 'deployment-compatibility' ? 'serving-software' : view}`;
</script>
<section class="research-profile">
  <h3>حافظهٔ مورد نیاز</h3>
  {#if !artifacts.length && downloads.length}
    <p>برای اجرای مولد، حافظهٔ cache/state و runtime به وزن اضافه می‌شود؛ در مدل‌های تخصصی، طول ورودی و اندازهٔ batch بر حافظهٔ موقت اثر دارند.</p>
    <div class="artifact-budgets">{#each downloads.filter(item => item.format !== 'gguf' || ['Q4_K_M','Q8_0','MXFP4'].includes(item.variant.toUpperCase())).slice(0,6) as item}<article><header><bdi>{item.format.toUpperCase()} · {item.variant}</bdi><small>{item.publisher}</small></header><strong>{faNumber(item.totalBytes! / 2 ** 30)} GiB</strong><a href={item.filesUrl} target="_blank" rel="noopener noreferrer">فایل‌ها و نسخهٔ بسته ↗</a></article>{/each}</div>
  {/if}
  {#if artifacts.length}
    <div class="scenario"><label>طول کل متن<select bind:value={context}><option value={4096}>۴٬۰۹۶ توکن</option><option value={8192}>۸٬۱۹۲ توکن</option><option value={32768}>۳۲٬۷۶۸ توکن</option></select></label><label>درخواست فعال<input type="number" min="1" max="128" step="1" bind:value={active} /></label></div>
    <p>برآورد برای یک GPU، حافظهٔ KV با دقت FP16 و دو GiB حافظهٔ رزرو است.</p>
    <div class="artifact-budgets">{#each artifacts as artifact}{@const plan = calculateMemory(artifact,context,active)}<article><header><bdi>{artifact.quantization}</bdi><small>{artifact.repository.split('/')[0]}</small></header>{#if plan}<strong>{faNumber(plan.budgetGiB)} GiB</strong><p>وزن: {faNumber(plan.weightGiB)} · KV: {faNumber(plan.kvGiB)} GiB</p>{:else}<p>طول متن از حد این فایل بیشتر است؛ حداکثر {faNumber(artifact.artifactContextLimitTokens,0)} توکن.</p>{/if}</article>{/each}</div>
  {/if}
  {#if claims.length || publisherMemory.length}
    {#each claims as item}<article class="route"><h4>AirLLM · بارگذاری لایه‌ای</h4><p>{faNumber(item.reportedVramGB)} GB حافظهٔ GPU، طبق گزارش ناشر برای {item.modelRepository}. {item.userSummaryFa}</p><p>وابستگی: <bdi>{item.dependenciesAsReported}</bdi></p><LlmEvidence ids={item.sourceIds.map(researchEvidenceId)} evidence={repository.evidence} /></article>{/each}
    {#each publisherMemory as item}<article class="route"><h4>حافظهٔ اعلامی ناشر</h4><p>{faNumber(item.reportedMemoryGB)} GB برای وزن بومی MXFP4 / مختلط. این عدد نتیجهٔ سناریوی GGUF نیست.</p><LlmEvidence ids={item.sourceIds.map(researchEvidenceId)} evidence={repository.evidence} /></article>{/each}
  {/if}
  {#if vector?.denseFloat32VectorGiBPerMillionDocuments !== undefined}<p>حافظهٔ یک میلیون بردار خام FP32 با ابعاد پیش‌فرض: <bdi>{faNumber(vector.denseFloat32VectorGiBPerMillionDocuments)} GiB</bdi>. ساختار جست‌وجو، فراداده و وزن مدل جدا هستند.</p>{/if}
  {#if routes.length}<h4>روش‌های اجرا</h4>{#each routes as route}<article class="route"><header>{#if llmBrand(route.engine)}<img src={llmBrand(route.engine)} alt="" width="28" height="28" />{/if}<bdi>{route.engine} {route.engineVersion ?? ''}</bdi><small>{route.status === 'published-run' ? 'اجرای گزارش‌شده' : 'مسیر مستند'}</small></header><p>{route.userSummaryFa}</p><LlmEvidence ids={route.sourceIds.map(researchEvidenceId)} evidence={repository.evidence} /></article>{/each}{/if}
  {#if runs.length}<p>{faNumber(runs.length)} اجرای گزارش‌شده برای این مدل در جدول کارایی موجود است. گروه آزمون را انتخاب کنید؛ نرخ تجمیعی خروجی با سرعت هر کاربر تفاوت دارد.</p>{/if}
  {#if !routes.length && profile?.runGuides.length}<h4>مسیرهای راه‌اندازی همین نسخه</h4>{#each profile.runGuides as guide}<p><a href={guide.href} target="_blank" rel="noopener noreferrer">{guide.engine} ↗</a>{#if guide.instructions} · {guide.instructions}{/if}</p>{/each}{/if}
  <div class="links"><a href={link('hardware-feasibility')}>بررسی در جدول حافظه ←</a>{#if routes.length || profile?.runGuides.length}<a href={link('deployment-compatibility')}>جدول مسیرهای اجرا ←</a>{/if}{#if runs.length}<a href={link('benchmarks')}>آزمون‌های کارایی ←</a>{/if}</div>
</section>
<style>
  .scenario{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}.scenario label{display:flex;flex-direction:column;gap:7px;color:var(--muted)}input,select{font:inherit;background:var(--paper);color:var(--ink);border:1px solid var(--line);border-radius:7px;padding:8px;min-width:0;box-sizing:border-box;width:100%}input{direction:ltr;text-align:right}.artifact-budgets{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.artifact-budgets article,.route{border:1px solid var(--line);border-radius:9px;padding:14px;margin:12px 0;background:var(--soft)}header{display:flex;align-items:center;gap:12px;flex-wrap:wrap}header small{color:var(--muted)}header img{object-fit:contain;background:white;border-radius:5px;padding:3px;box-sizing:border-box}.artifact-budgets strong{display:block;font-size:24px;margin-top:10px}.artifact-budgets p{font-size:12px;margin-bottom:0}.links{display:flex;gap:18px;flex-wrap:wrap;margin-top:18px}a{color:var(--link-ink)}@media(max-width:550px){.scenario,.artifact-budgets{grid-template-columns:1fr}}
</style>
