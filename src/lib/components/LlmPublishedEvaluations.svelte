<script lang="ts">
  import type { PublishedEvaluation, Evidence } from '$lib/llm/schema';
  import { sourceDateValue } from '$lib/llm/presentation';
  import LlmValue from './LlmValue.svelte';
  import LlmEvidence from './LlmEvidence.svelte';
  const modes: Record<string, string> = { reasoning: 'استدلالی', thinking: 'با تفکر افزوده', instruct: 'دستورپذیر', 'non-thinking': 'بدون تفکر افزوده', 'extended-thinking': 'با تفکر افزوده', low: 'تلاش استدلالی کم', medium: 'تلاش استدلالی متوسط', high: 'تلاش استدلالی زیاد', max: 'تلاش استدلالی حداکثر' };
  export let results: PublishedEvaluation[] = [];
  export let evidence: Evidence[] = [];
  const numbers = new Intl.NumberFormat('fa-IR', { maximumFractionDigits: 3 });
  const settingNames: Record<string, string> = { generationMaxTokens: 'حداکثر توکن تولید', maxOutputTokens: 'حداکثر توکن خروجی', temperature: 'دما', topP: 'top-p', topK: 'top-k', sampleCountPerQuery: 'نمونه به‌ازای پرسش', candidateCount: 'تعداد نامزدهای بازیابی', retrievalModel: 'مدل بازیابی اولیه', embeddingDimensions: 'ابعاد embedding', prompt: 'دستور ورودی', taskAggregation: 'روش تجمیع وظیفه‌ها', representation: 'روش بازنمایی', datasetSplit: 'بخش دادهٔ آزمون', metricScale: 'مقیاس امتیاز', sourceScale: 'مقیاس منبع', reasoningEffort: 'تلاش استدلالی', tools: 'دسترسی به ابزار', shots: 'نمونه‌های داخل دستور', scope: 'دامنهٔ نتیجه', aggregation: 'روش تجمیع', languageCount: 'تعداد زبان‌ها', standardDeviation: 'انحراف معیار میان زبان‌ها', context: 'زمینهٔ آزمون', harness: 'محیط اجرای آزمون', maxTurns: 'حداکثر نوبت', maxPairTokens: 'حد ورودی جفت پرسش و متن', checkpointStage: 'مرحلهٔ مدل' };
  const metrics: Record<string, string> = { 'published score': 'امتیاز', 'published retrieval score': 'امتیاز بازیابی گزارش‌شده', accuracy: 'درستی پاسخ', 'answer accuracy': 'درستی پاسخ', sentence_performance: 'میانگین کیفیت بردار جمله', semantic_search: 'میانگین کیفیت جست‌وجو' };
  const representations: Record<string, string> = { Dense: 'بردار متراکم', Sparse: 'بازنمایی تنک', 'Multi-vec': 'چندبرداری', 'Dense+Sparse': 'ترکیب متراکم و تنک', All: 'ترکیب سه روش' };
  function qualifiers(result: PublishedEvaluation): string[] {
    const labels: string[] = [];
    if (result.mode) labels.push(modes[result.mode] ?? result.mode);
    if (result.language) labels.push(result.language === 'fa' ? 'فارسی' : result.language === 'multilingual' ? 'چندزبانه' : result.language);
    if (result.settings.representation) labels.push(representations[String(result.settings.representation)] ?? String(result.settings.representation));
    if (result.settings.embeddingDimensions) labels.push(`${numbers.format(Number(result.settings.embeddingDimensions))} بُعد`);
    if (result.settings.maxTurns) labels.push(`${numbers.format(Number(result.settings.maxTurns))} نوبت`);
    return labels;
  }
</script>

<section class="published-results" aria-label="نتایج آزمون‌های منتشرشده">
  <h4>نتایج آزمون‌های منتشرشده</h4><p class="comparison-note">مقایسهٔ امتیازها به آزمون، سنجه و تنظیمات یکسان نیاز دارد.</p>
  {#each results as result (result.id)}
    <details class="published-result" data-published-evaluation={result.id}>
      <summary><b dir="auto">{result.benchmark} · {metrics[result.metric] ?? result.metric}: {numbers.format(result.value)}{result.unit === 'percent' ? '٪' : ''}</b><span>{result.reportingRelationship === 'publisher' ? 'گزارش ناشر' : result.reportingRelationship === 'independent' ? 'ارزیابی مستقل' : 'گزارش منتشرشده'} · {result.reporter}{#each qualifiers(result) as label} · {label}{/each}</span></summary>
      <dl>
        {#if result.mode}<div><dt>حالت ارزیابی</dt><dd>{modes[result.mode] ?? result.mode}</dd></div>{/if}
        {#if result.comparisonGroup}<div><dt>گروه مقایسه در منبع</dt><dd><bdi>{result.comparisonGroup}</bdi></dd></div>{/if}
        <div><dt>مدل نام‌گذاری‌شده در گزارش</dt><dd dir="auto">{result.reportedModelName}</dd></div>
        <div><dt>Benchmark / نسخه</dt><dd dir="auto">{result.benchmark}{#if result.benchmarkVersion} · {result.benchmarkVersion}{/if}</dd></div>
        <div><dt>سنجه و واحد</dt><dd dir="auto">{result.metric} · {result.unit === 'percent' ? 'درصد' : result.unit === 'score' ? 'امتیاز' : result.unit}</dd></div>
        {#if result.reportedPrecision}<div><dt>دقت عددی</dt><dd dir="auto">{result.reportedPrecision}</dd></div>{/if}
        {#if result.evaluatedRevision}<div><dt>commit وزن آزموده‌شده</dt><dd dir="auto">{result.evaluatedRevision}</dd></div>{/if}
        {#if result.sourceDocumentRevision}<div><dt>commit سند منبع</dt><dd dir="auto">{result.sourceDocumentRevision}</dd></div>{/if}
        {#if result.language}<div><dt>زبان</dt><dd>{result.language === 'fa' ? 'فارسی' : result.language === 'multilingual' ? 'چندزبانه' : result.language}</dd></div>{/if}
        {#each Object.entries(result.settings) as [key, value]}<div><dt>{settingNames[key] ?? key}</dt><dd dir="auto">{typeof value === 'number' ? numbers.format(value) : String(value)}</dd></div>{/each}
        {#if result.evaluatedOn}<div><dt>تاریخ اجرای آزمون</dt><dd><LlmValue value={sourceDateValue(result.evaluatedOn)} /></dd></div>{/if}
        {#if result.publishedOn}<div><dt>تاریخ انتشار گزارش</dt><dd><LlmValue value={sourceDateValue(result.publishedOn)} /></dd></div>{/if}
        <div><dt>تاریخ دسترسی</dt><dd><LlmValue value={sourceDateValue(result.accessedOn)} /></dd></div>
      </dl>
      {#if result.limitations.length}<ul>{#each result.limitations as limitation}<li>{limitation}</li>{/each}</ul>{/if}
      <LlmEvidence ids={result.evidenceIds} {evidence} />
    </details>
  {/each}
</section>

<style>
  .comparison-note{font-size:12px;color:var(--muted)}
  h4{font-size:14px;margin:0 0 12px}.published-result{border-top:1px solid var(--line);padding:10px 0}summary{cursor:pointer}summary>span{display:block;color:var(--muted);font-size:12px;margin-top:4px}dl{display:grid;gap:9px;font-size:13px}dl>div{display:grid;grid-template-columns:minmax(150px,1fr) 2fr;gap:15px}dt{color:var(--muted)}dd{margin:0;overflow-wrap:anywhere}ul{font-size:13px;padding-inline-start:20px}li{margin-block:5px}@media(max-width:680px){dl>div{grid-template-columns:1fr;gap:2px}}
</style>
