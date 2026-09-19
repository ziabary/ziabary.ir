import type { EvaluationLanguageScope, LlmGuideRepository, ModelVersion, PublishedEvaluation, ApplicationId } from './schema';

const aliases: Record<string, string> = {
  eng: 'en', english: 'en', spa: 'es', spanish: 'es', espanol: 'es',
  fas: 'fa', per: 'fa', persian: 'fa', farsi: 'fa', deu: 'de', ger: 'de',
  rus: 'ru', russian: 'ru', fra: 'fr', fre: 'fr', pol: 'pl', cmn: 'zh', ara: 'ar'
};
export function languageCode(value: string) {
  const key = value.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase().split('_')[0];
  return aliases[key] ?? key;
}
/** Legacy source notation is interpreted explicitly; unrecognised prose stays unknown. */
export function evaluationLanguage(value?: string): EvaluationLanguageScope {
  if (!value || value === 'default') return { kind: 'unspecified' };
  if (value === 'multilingual') return { kind: 'aggregate' };
  const pair = /^([a-z]{2,3}(?:_[A-Za-z]+)?)-([a-z]{2,3}(?:_[A-Za-z]+)?)$/.exec(value);
  if (pair) return { kind: 'pair', source: languageCode(pair[1]), target: languageCode(pair[2]) };
  const code = languageCode(value);
  return /^[a-z]{2}$/.test(code) ? { kind: 'single', language: code } : { kind: 'unspecified' };
}
export function languageScopeKey(scope: EvaluationLanguageScope) {
  return scope.kind === 'single' ? scope.language : scope.kind === 'pair' ? `${scope.source}>${scope.target}` : scope.kind;
}
export function resultMatchesLanguage(result: PublishedEvaluation, language: string) {
  if (!language || language === 'all') return true;
  const scope = result.languageScope ?? evaluationLanguage(result.language);
  // Cross-language retrieval is not a monolingual result in either participating language.
  return scope.kind === 'single' ? scope.language === languageCode(language)
    : scope.kind === 'pair' && scope.source === languageCode(language) && scope.target === languageCode(language);
}
export function modelLanguageEvidence(repository: LlmGuideRepository, model: ModelVersion, language: string, applicationId?: ApplicationId) {
  const results = repository.publishedEvaluations.filter(result => result.modelVersionId === model.id
    && resultMatchesLanguage(result, language) && (!applicationId || result.applicationIds.includes(applicationId)));
  if (results.some(result => result.reportingRelationship === 'independent')) return 'independently-evaluated';
  if (results.length) return 'published-result';
  if (model.languages.some(item => languageCode(item.language) === languageCode(language) && item.declared.state === 'known' && item.declared.value)) return 'publisher-claimed';
  return 'not-recorded';
}

const identitySettings = ['datasetRepository','datasetRevision','datasetConfig','datasetSplit','task','metricScale','sourceScale','aggregation','representation','embeddingDimensions','harness','maxOutputTokens','temperature','topP','topK','sampleCountPerQuery','reasoningEffort','tools','shots','retrievalModel','candidateCount','maxPairTokens','mode'];
const stable = (value: unknown): string => value && typeof value === 'object' && !Array.isArray(value)
  ? JSON.stringify(Object.fromEntries(Object.entries(value).sort(([a],[b]) => a.localeCompare(b)))) : JSON.stringify(value);
/** Identity is deliberately conservative. Similar scores/names alone never prove duplication. */
export function samePublishedResult(a: PublishedEvaluation, b: PublishedEvaluation) {
  if (a.id === b.id) return true;
  const fields = ['modelVersionId','benchmark','benchmarkVersion','metric','value','unit','mode','reporter','reportedPrecision','evaluatedRevision'] as const;
  if (fields.some(key => a[key] !== b[key])) return false;
  const aScope = a.languageScope ?? evaluationLanguage(a.language), bScope = b.languageScope ?? evaluationLanguage(b.language);
  if (aScope.kind === 'unspecified' || bScope.kind === 'unspecified' || stable(aScope) !== stable(bScope)) return false;
  if (!a.sourceDocumentRevision || a.sourceDocumentRevision !== b.sourceDocumentRevision) return false;
  return identitySettings.every(key => a.settings[key] === b.settings[key]);
}

export function metricSemantics(metric: string, unit: string) {
  const lower = /^(latency|ttft|tpot|perplexity|wer|cer|error|loss)/i.test(metric);
  const rating = /rating|elo/i.test(metric + ' ' + unit);
  const recognized = lower || rating || /accuracy|pass@|cons@|ndcg|recall|precision|f1|mrr|map|throughput|tokens.*second/i.test(metric);
  return { direction: recognized ? lower ? 'lower' : 'higher' : 'unknown', ratioScale: recognized && !rating } as const;
}

/** Conditions are compared in canonical fields, independently from translated labels. */
export function qualityComparison(results: PublishedEvaluation[]) {
  const reasons: string[] = [];
  if (results.length < 2) reasons.push('need-two-results');
  // Reference report collections permit only explicitly scoped within-report differences.
  if (results.some(result => result.referenceObservations?.length)) reasons.push('reference-policy');
  const first = results[0];
  if (!first) return { rank: false, ratio: false, superiority: false, direction: 'unknown', reasons } as const;
  const fields = ['benchmark','benchmarkVersion','metric','unit','mode','reportedPrecision'] as const;
  for (const field of fields) if (results.some(item => item[field] !== first[field])) reasons.push(field);
  const scopes = results.map(item => item.languageScope ?? evaluationLanguage(item.language));
  if (scopes.some(scope => scope.kind === 'unspecified') || scopes.some(scope => stable(scope) !== stable(scopes[0]))) reasons.push('language');
  // A documented common table is necessary when the benchmark's full version is not reported.
  const sameTable = !!first.comparisonGroup && !!first.protocolEvidenceId && results.every(item => item.comparisonGroup === first.comparisonGroup
    && item.reporter === first.reporter && item.protocolEvidenceId === first.protocolEvidenceId);
  if (!sameTable && (!first.benchmarkVersion || !first.settings.datasetRevision || !first.settings.harness
    || !first.reportedPrecision || !first.mode || first.settings.temperature === undefined || first.settings.maxOutputTokens === undefined)) reasons.push('protocol-not-established');
  for (const key of identitySettings) if (results.some(item => item.settings[key] !== first.settings[key])) reasons.push(key);
  const semantics = metricSemantics(first.metric, first.unit);
  if (semantics.direction === 'unknown') reasons.push('metric-direction');
  const rank = reasons.length === 0;
  return { rank, ratio: rank && semantics.ratioScale && results.every(item => item.value > 0), superiority: false, direction: semantics.direction, reasons };
}
