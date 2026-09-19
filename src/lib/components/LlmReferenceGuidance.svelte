<script lang="ts">
  import { referenceComparisons } from '$lib/llm/data/referenceComparisons.v1';
  import { selectionGuidance } from '$lib/llm/data/selectionGuidance.v1';
  import type { LlmLocale } from '$lib/llm/i18n/runtime';
  export let locale: LlmLocale = 'fa';
  export let ids: string[] = [];
  export let onOpenModel: ((id: string, panel?: string) => void) | undefined = undefined;
  export let modelNames: Record<string,string> = {};
  const base = locale === 'fa' ? '' : `/${locale}`;
  $: guides = (selectionGuidance ?? []).filter(g => g.locales.includes(locale) && (!ids.length || ids.includes(g.id)));
  const copy={fa:{models:'مدل‌ها',comparisons:'مقایسهٔ نتایج'},en:{models:'Models',comparisons:'Compare results'},es:{models:'Modelos',comparisons:'Comparar resultados'}}[locale];
</script>
<div class="reference-guidance" dir={locale === 'fa' ? 'rtl' : 'ltr'}>
{#each guides as guide (guide.id)}
<details><summary>{guide.title[locale]}</summary>
<p>{guide.decision[locale]}</p><p>{guide.chooseWhen[locale]}</p><p class="limit">{guide.doNotInfer[locale]}</p>
<nav aria-label={copy.models}>{#each guide.candidateModelRefs as id}<a href={`${base}/guides/llm/?show-drafts=true&model=${encodeURIComponent(id)}&panel=quality`} on:click={event=>{if(onOpenModel){event.preventDefault();onOpenModel(id,'quality');}}}><bdi>{modelNames[id] ?? guide.candidateNames?.[id] ?? id.replace('model:','')}</bdi></a>{/each}</nav>
<nav aria-label={copy.comparisons}>{#each guide.comparisonGroupIds as id}<a href={`${base}/guides/llm/?show-drafts=true&reference-group=${encodeURIComponent(id)}#reference-comparisons`}>{referenceComparisons?.find(g=>g.id===id)?.title[locale] ?? copy.comparisons}</a>{/each}</nav>
</details>{/each}
</div>
<style>
.reference-guidance{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-block:18px}details{min-width:0;border:1px solid var(--line);border-radius:8px;padding:14px;background:var(--paper);font-size:14px;line-height:1.9;scroll-margin-top:90px}summary{cursor:pointer;font-weight:650;color:var(--ink)}p{margin-block:10px}.limit{color:var(--muted)}nav{display:flex;flex-wrap:wrap;gap:8px;margin-top:10px}a{color:var(--link-ink);overflow-wrap:anywhere;font-size:13px}nav:first-of-type a{border:1px solid var(--line);padding:4px 8px;border-radius:5px}@media(max-width:700px){.reference-guidance{grid-template-columns:1fr}}
</style>
