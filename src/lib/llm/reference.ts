import type { LlmGuideRepository } from './schema';
import type { ReferenceComparison, ReferenceObservation } from './reference-types';
export function referenceRows(repository: LlmGuideRepository, group: ReferenceComparison) {
  const wanted = new Set(group.evaluationIds);
  return repository.publishedEvaluations.flatMap(result => (result.referenceObservations ?? [])
    .filter(report => wanted.has(report.id)).map(report => ({result, report})));
}
function stable(value: unknown): string {
  if (Array.isArray(value)) return JSON.stringify(value.map(stable));
  if (value && typeof value === 'object') return JSON.stringify(Object.fromEntries(Object.entries(value).sort(([a],[b])=>a.localeCompare(b)).map(([k,v])=>[k,stable(v)])));
  return JSON.stringify(value);
}
/** A partition is a display grouping; unknown values alone do not establish protocol identity. */
export function referencePartition(report: ReferenceObservation) {
  const {pipelineRole, ...settings} = report.settings;
  return stable([report.benchmark,report.benchmarkVersion,report.metric,report.unit,report.language,settings]);
}
export function referenceDifference(group: ReferenceComparison, a: ReferenceObservation, b: ReferenceObservation): number | null {
  if (!group.allowed.withinReportNumericDifference || !group.evaluationIds.includes(a.id) || !group.evaluationIds.includes(b.id)) return null;
  if (referencePartition(a) !== referencePartition(b)) return null;
  const commonTable = group.comparisonBasis === 'publisher-table' && a.sourceId === b.sourceId && ((!!a.sourceDocumentRevision && a.sourceDocumentRevision === b.sourceDocumentRevision) || (!!a.sourceCaptureSha256 && a.sourceCaptureSha256 === b.sourceCaptureSha256));
  const sharedPool = group.comparisonBasis === 'documented-shared-candidate-pool' && !!a.settings.protocolSourceId
    && a.settings.protocolSourceId === b.settings.protocolSourceId && a.settings.initialRetriever === b.settings.initialRetriever && a.settings.candidateCount === b.settings.candidateCount;
  if (!commonTable && !sharedPool) return null;
  return Math.round((b.value-a.value)*1e8)/1e8;
}
