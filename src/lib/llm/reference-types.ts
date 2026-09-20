/** Original publisher observations retained within the canonical result, not a second catalog. */
export type LocalizedCopy = Record<'fa' | 'en' | 'es', string>;
export interface ReferenceObservation {
  id: string; modelRef: string; benchmark: string; benchmarkVersion: string | null;
  metric: string; rawMetricLabel: string; value: number; reportedValueText: string;
  unit: string; direction: string; language: string | null; reporter: string;
  reportingRelationship: string; sourceId: string; sourceLocator: string;
  sourceCaptureSha256?: string; sourceDocumentRevision: string | null; evaluatedWeightRevision: string | null;
  evaluatedOn: string | null; accessedOn: string;
  settings: Record<string, string | number | boolean | null>;
  comparisonGroup?: string | null; missingProtocolFields: string[];
  baselineSameModelAndValueCandidates?: string[]; mergeNote?: string;
}
export interface ReferenceComparison {
  id: string; title: LocalizedCopy; interpretation: LocalizedCopy; sourceIds: string[];
  comparisonBasis: string; allowed: {reportedSideBySide: boolean; withinReportNumericDifference: boolean;
  universalRanking: boolean; statisticalSignificanceClaim: boolean; qualityRatioClaim: boolean; causalClaim: boolean};
  qualifications: string[]; evaluationIds: string[]; numericComparisonPartitionKeys: string[]; groupMeaning: string;
}
export interface ReferenceGuidance {
  id: string; locales: string[]; title: LocalizedCopy; candidateModelRefs: string[]; candidateNames?: Record<string,string>;
  decision: LocalizedCopy; chooseWhen: LocalizedCopy; doNotInfer: LocalizedCopy;
  comparisonGroupIds: string[]; editorialStatus?: string;
}
export interface ReferenceArticleSection {
  id: string; articleKey: string; operation?: string; placement?: string; locales: string[];
  title: LocalizedCopy; bodyMarkdown: LocalizedCopy; sourceUrls: string[];
  comparisonGroupIds: string[]; mergePolicy?: string;
}
export interface QuantizationObservation {
  id: string; reportedModelName: string; metric: string; value: number; reportedValueText: string;
  direction: string; sourceId: string; sourceLocator: string; scope: string;
  measuredDeploymentMemoryBytes: null; measuredTokensPerSecond: null;
}
