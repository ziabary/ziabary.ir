<script lang="ts">
  import { benchmarkLabel } from '$lib/llm/score-scope';
  import { hasReportedValue, evaluationMetricLabel, evaluationSettingLabel, reportedSettings, hasNumericResult } from '$lib/llm/evaluation-display';
  import { getLlmI18n } from '$lib/llm/i18n/context';
  const i18n = getLlmI18n();
  const { t, locale, direction, numberFormat } = i18n;
  const { sourceDateValue } = createLlmPresentation(i18n);
  import type { PublishedEvaluation, Evidence } from '$lib/llm/schema';
  import { createLlmPresentation } from '$lib/llm/presentation';
  import LlmValue from './LlmValue.svelte';
  import LlmEvidence from './LlmEvidence.svelte';
  const modes: Record<string, string> = { reasoning: t('LlmPublishedEvaluations.1140'), thinking: t('LlmPublishedEvaluations.1141'), instruct: t('LlmPublishedEvaluations.1142'), 'non-thinking': t('LlmPublishedEvaluations.1143'), 'extended-thinking': t('LlmPublishedEvaluations.1141'), low: t('LlmPublishedEvaluations.1144'), medium: t('LlmPublishedEvaluations.1145'), high: t('LlmPublishedEvaluations.1146'), max: t('LlmPublishedEvaluations.1147') };
  export let results: PublishedEvaluation[] = [];
  export let compact = false;
  export let evidence: Evidence[] = [];
  const numbers = new Intl.NumberFormat(numberFormat, { maximumFractionDigits: 3 });
  const settingNames: Record<string, string> = { generationMaxTokens: t('LlmPublishedEvaluations.1148'), maxOutputTokens: t('LlmPublishedEvaluations.1149'), temperature: t('LlmPublishedEvaluations.1150'), topP: 'top-p', topK: 'top-k', sampleCountPerQuery: t('LlmPublishedEvaluations.1151'), candidateCount: t('LlmPublishedEvaluations.1152'), retrievalModel: t('LlmPublishedEvaluations.1153'), embeddingDimensions: t('LlmPublishedEvaluations.1154'), prompt: t('LlmPublishedEvaluations.1155'), taskAggregation: t('LlmPublishedEvaluations.1156'), representation: t('LlmPublishedEvaluations.1157'), datasetSplit: t('LlmPublishedEvaluations.1158'), metricScale: t('LlmPublishedEvaluations.1159'), sourceScale: t('LlmPublishedEvaluations.1160'), reasoningEffort: t('LlmPublishedEvaluations.1161'), tools: t('LlmPublishedEvaluations.1162'), shots: t('LlmPublishedEvaluations.1163'), scope: t('LlmPublishedEvaluations.1164'), aggregation: t('LlmPublishedEvaluations.1165'), languageCount: t('LlmPublishedEvaluations.1166'), standardDeviation: t('LlmPublishedEvaluations.1167'), context: t('LlmPublishedEvaluations.1168'), harness: t('LlmPublishedEvaluations.1169'), maxTurns: t('LlmPublishedEvaluations.1170'), maxPairTokens: t('LlmPublishedEvaluations.1171'), checkpointStage: t('LlmPublishedEvaluations.1172') };
  const metrics: Record<string, string> = { 'published score': t('LlmPublishedEvaluations.1173'), 'published retrieval score': t('LlmPublishedEvaluations.1174'), accuracy: t('LlmPublishedEvaluations.1175'), 'answer accuracy': t('LlmPublishedEvaluations.1175'), sentence_performance: t('LlmPublishedEvaluations.1176'), semantic_search: t('LlmPublishedEvaluations.1177') };
  const representations: Record<string, string> = { Dense: t('LlmPublishedEvaluations.1178'), Sparse: t('LlmPublishedEvaluations.1179'), 'Multi-vec': t('LlmPublishedEvaluations.1180'), 'Dense+Sparse': t('LlmPublishedEvaluations.1181'), All: t('LlmPublishedEvaluations.1182') };
  function qualifiers(result: PublishedEvaluation): string[] {
    const labels: string[] = [];
    if (result.mode) labels.push(modes[result.mode] ?? result.mode);
    if (result.language) labels.push(result.language === 'fa' ? t('LlmPublishedEvaluations.1183') : result.language === 'multilingual' ? t('LlmPublishedEvaluations.1184') : result.language);
    if (result.settings.representation) labels.push(representations[String(result.settings.representation)] ?? String(result.settings.representation));
    if (result.settings.embeddingDimensions) labels.push(t('LlmPublishedEvaluations.1185', numbers.format(Number(result.settings.embeddingDimensions))));
    if (result.settings.maxTurns) labels.push(t('LlmPublishedEvaluations.1186', numbers.format(Number(result.settings.maxTurns))));
    return labels;
  }
  function usefulLimitation(value:string) {
    return hasReportedValue(value) && !/^(?:امتیاز ناشر؛ برای رتبه‌بندی میان منابع متفاوت یا نتیجه‌گیری هزینه\/کارایی مستقیم قابل استفاده نیست\.|commit وزن آزموده‌شده و precision گزارش نشده؛ نتیجه فقط به گونهٔ نام‌گذاری‌شده تعلق دارد\.|precision و commit وزن آزموده‌شده(?: در جدول)? گزارش نشده‌اند\.|precision و commit وزن آزموده‌شده گزارش نشده‌اند\.)$/.test(value);
  }
</script>

<section class="published-results" aria-label={t('LlmPublishedEvaluations.1187')}>
  {#if !compact}<h4>{t('LlmPublishedEvaluations.1187')}</h4>{/if}
  {#each results.filter(hasNumericResult) as result (result.id)}
    <details class="published-result" open={compact} data-published-evaluation={result.id}>
      <summary><b dir="auto">{benchmarkLabel(result.benchmark)} · {metrics[result.metric] ?? evaluationMetricLabel(result.metric,locale)}: {numbers.format(result.value)}{result.unit === 'percent' ? t('LlmPublishedEvaluations.1189') : ''}</b><span>{result.reportingRelationship === 'publisher' ? t('LlmPublishedEvaluations.1190') : result.reportingRelationship === 'independent' ? t('LlmPublishedEvaluations.1191') : t('LlmPublishedEvaluations.1192')} · {result.reporter}{#each qualifiers(result) as label} · {label}{/each}</span></summary>
      <dl>
        {#if result.mode}<div><dt>{t('LlmPublishedEvaluations.1193')}</dt><dd>{modes[result.mode] ?? result.mode}</dd></div>{/if}
        <div><dt>{t('LlmPublishedEvaluations.1195')}</dt><dd dir="auto">{result.reportedModelName}</dd></div>
        <div><dt>{t('LlmPublishedEvaluations.1196')}</dt><dd dir="auto">{benchmarkLabel(result.benchmark)}{#if result.benchmarkVersion} · {result.benchmarkVersion}{/if}</dd></div>
        <div><dt>{t('LlmPublishedEvaluations.1197')}</dt><dd dir="auto">{metrics[result.metric] ?? evaluationMetricLabel(result.metric,locale)} · {result.unit === 'percent' ? t('LlmPublishedEvaluations.1198') : result.unit === 'score' ? t('LlmPublishedEvaluations.1173') : result.unit}</dd></div>
        {#if hasReportedValue(result.reportedPrecision)}<div><dt>{t('LlmPublishedEvaluations.1199')}</dt><dd dir="auto">{result.reportedPrecision}</dd></div>{/if}
        {#if hasReportedValue(result.evaluatedRevision)}<div><dt>{t('LlmPublishedEvaluations.1200')}</dt><dd dir="auto">{result.evaluatedRevision}</dd></div>{/if}
        {#if hasReportedValue(result.sourceDocumentRevision)}<div><dt>{t('LlmPublishedEvaluations.1201')}</dt><dd dir="auto">{result.sourceDocumentRevision}</dd></div>{/if}
        {#if result.language}<div><dt>{t('LlmPublishedEvaluations.1202')}</dt><dd>{result.language === 'fa' ? t('LlmPublishedEvaluations.1183') : result.language === 'multilingual' ? t('LlmPublishedEvaluations.1184') : result.language}</dd></div>{/if}
        {#each reportedSettings(result.settings) as [key, value]}<div><dt>{evaluationSettingLabel(key,locale,settingNames[key])}</dt><dd dir="auto">{result.settingNotes?.[key] ?? (typeof value === 'number' ? numbers.format(value) : String(value))}</dd></div>{/each}
        {#if result.evaluatedOn}<div><dt>{t('LlmPublishedEvaluations.1203')}</dt><dd><LlmValue value={sourceDateValue(result.evaluatedOn)} /></dd></div>{/if}
        {#if result.publishedOn}<div><dt>{t('LlmPublishedEvaluations.1204')}</dt><dd><LlmValue value={sourceDateValue(result.publishedOn)} /></dd></div>{/if}
        <div><dt>{t('LlmPublishedEvaluations.1205')}</dt><dd><LlmValue value={sourceDateValue(result.accessedOn)} /></dd></div>
      </dl>
      {#if result.limitations.filter(usefulLimitation).length}<ul>{#each result.limitations.filter(usefulLimitation) as limitation}<li>{limitation}</li>{/each}</ul>{/if}
      <LlmEvidence ids={result.evidenceIds} {evidence} />
    </details>
  {/each}
</section>

<style>
  h4{font-size:14px;margin:0 0 12px}.published-result{border-top:1px solid var(--line);padding:10px 0}summary{cursor:pointer}summary>span{display:block;color:var(--muted);font-size:12px;margin-top:4px}dl{display:grid;gap:9px;font-size:13px}dl>div{display:grid;grid-template-columns:minmax(150px,1fr) 2fr;gap:15px}dt{color:var(--muted)}dd{margin:0;overflow-wrap:anywhere}ul{font-size:13px;padding-inline-start:20px}li{margin-block:5px}@media(max-width:680px){dl>div{grid-template-columns:1fr;gap:2px}}
</style>
