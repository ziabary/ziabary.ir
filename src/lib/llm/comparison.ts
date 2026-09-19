import type {
  ComparisonMode,
  ComparisonPolicy,
  LlmViewRow,
  ViewValue
} from './views';
export interface ComparisonDifference {
  dimension: string;
  label: string;
  values: Array<{ rowId: string; rowLabel: string; value: ViewValue | undefined }>;
}
export interface ComparisonEvaluation {
  mode: ComparisonMode;
  axisId?: string;
  sharedDimensions: string[];
  differences: ComparisonDifference[];
  mismatchedSharedDimensions: string[];
  missingSharedDimensions: string[];
  limitations: string[];
  calculationStatus: 'display-only' | 'valid' | 'needs-more-data' | 'invalid';
  calculationReason: string;
  ratioAllowed: boolean;
  rankingAllowed: boolean;
  superiorityClaimAllowed: boolean;
}
import type { LlmI18n } from './i18n/runtime';

/** Text and formatting are edition-scoped; no mutable global locale. */
export function createLlmComparison(i18n: LlmI18n) {
const { t, locale, numberFormat } = i18n;

function valueKey(value: ViewValue | undefined) {
  if (!value || value.state === 'unknown' || value.state === 'not-measured') return undefined;
  if (value.state !== 'known') return `state:${value.state}`;
  const raw = value.canonicalNumber ?? value.raw ?? value.sortValue ?? value.display;
  return `${typeof raw}:${String(raw)}:${value.canonicalUnit ?? ''}`;
}
function unique(values: Array<string | undefined>) {
  return [...new Set(values.filter((value): value is string => value !== undefined))];
}
function evaluateComparison(
  rows: LlmViewRow[],
  policy: ComparisonPolicy,
  mode: ComparisonMode,
  axisId?: string
): ComparisonEvaluation {
  const dimensions = unique([
    ...Object.keys(policy.dimensionLabels),
    ...rows.flatMap((row) => Object.keys(row.comparison.dimensions))
  ]);
  const differences = dimensions.flatMap((dimension): ComparisonDifference[] => {
    const values = rows.map((row) => ({
      rowId: row.id,
      rowLabel: row.label,
      value: row.comparison.dimensions[dimension]
    }));
    const keys = unique(values.map((item) => valueKey(item.value)));
    const hasMissing = values.some((item) => valueKey(item.value) === undefined);
    return keys.length > 1 || (hasMissing && keys.length > 0)
      ? [{ dimension, label: policy.dimensionLabels[dimension] ?? dimension, values }]
      : [];
  });

  const axis = policy.controlledAxes.find((candidate) => candidate.id === axisId);
  const sharedDimensions = mode === 'controlled-experiment'
    ? axis?.sharedDimensions ?? []
    : mode === 'solution-selection'
      ? policy.solutionSharedDimensions
      : [];
  const missingSharedDimensions = sharedDimensions.filter((dimension) =>
    rows.some((row) => valueKey(row.comparison.dimensions[dimension]) === undefined)
  );
  const mismatchedSharedDimensions = sharedDimensions.filter((dimension) => {
    const values = rows.map((row) => valueKey(row.comparison.dimensions[dimension]));
    return values.every((value) => value !== undefined) && unique(values).length > 1;
  });
  const missingCalculationDimensions = policy.calculationRequiredDimensions.filter((dimension) =>
    rows.some((row) => valueKey(row.comparison.dimensions[dimension]) === undefined)
  );
  const rowInvalid = rows.some((row) => row.comparison.calculation.status === 'invalid');
  const rowNeedsData = rows.some((row) => row.comparison.calculation.status === 'needs-more-data');

  let calculationStatus: ComparisonEvaluation['calculationStatus'] = 'display-only';
  let calculationReason = t('comparison.0911');
  if (rows.length < 2) {
    calculationStatus = 'needs-more-data';
    calculationReason = t('comparison.0912');
  } else if (mode === 'controlled-experiment' && !axis) {
    calculationStatus = 'needs-more-data';
    calculationReason = t('comparison.0913');
  } else if (mode !== 'side-by-side') {
    if (rowInvalid || mismatchedSharedDimensions.length) {
      calculationStatus = 'invalid';
      calculationReason = rowInvalid
        ? t('comparison.0914')
        : t('comparison.0915');
    } else if (rowNeedsData || missingSharedDimensions.length || missingCalculationDimensions.length) {
      calculationStatus = 'needs-more-data';
      calculationReason = t('comparison.0916');
    } else {
      calculationStatus = 'valid';
      calculationReason = t('comparison.0917');
    }
  }

  const calculationAllowed = calculationStatus === 'valid';
  return {
    mode,
    ...(axisId ? { axisId } : {}),
    sharedDimensions,
    differences,
    mismatchedSharedDimensions,
    missingSharedDimensions: unique([...missingSharedDimensions, ...missingCalculationDimensions]),
    limitations: unique(rows.flatMap((row) => row.comparison.limitations)),
    calculationStatus,
    calculationReason,
    ratioAllowed: calculationAllowed && policy.numericMetric?.ratioScale === true,
    rankingAllowed: calculationAllowed && policy.numericMetric !== undefined,
    // No uncertainty estimates or statistical test are stored in this guide.
    superiorityClaimAllowed: false
  };
}
return { evaluateComparison };
}
