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

function valueKey(value: ViewValue | undefined) {
  if (!value || value.state === 'unknown' || value.state === 'not-measured') return undefined;
  if (value.state !== 'known') return `state:${value.state}`;
  const raw = value.canonicalNumber ?? value.raw ?? value.sortValue ?? value.display;
  return `${typeof raw}:${String(raw)}:${value.canonicalUnit ?? ''}`;
}

function unique(values: Array<string | undefined>) {
  return [...new Set(values.filter((value): value is string => value !== undefined))];
}

export function evaluateComparison(
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
  let calculationReason = 'این حالت فقط مشخصات را کنار هم نشان می‌دهد و محاسبه، رتبه‌بندی یا ادعای برتری نمی‌سازد.';
  if (mode === 'controlled-experiment' && !axis) {
    calculationStatus = 'needs-more-data';
    calculationReason = 'برای آزمایش کنترل‌شده باید محور مقایسه انتخاب شود.';
  } else if (mode !== 'side-by-side') {
    if (rowInvalid || mismatchedSharedDimensions.length) {
      calculationStatus = 'invalid';
      calculationReason = rowInvalid
        ? 'دست‌کم یک ردیف برای محاسبه نامعتبر علامت خورده است.'
        : 'شرایطی که باید مشترک باشند یکسان نیستند؛ نمایش ممکن است اما محاسبه معتبر نیست.';
    } else if (rowNeedsData || missingSharedDimensions.length || missingCalculationDimensions.length) {
      calculationStatus = 'needs-more-data';
      calculationReason = 'برای محاسبهٔ معتبر، داده یا شرایط مشترک بیشتری لازم است.';
    } else {
      calculationStatus = 'valid';
      calculationReason = 'شرایط ساختاری لازم ثبت شده‌اند؛ هر فرمول همچنان باید واحد، ورودی و شاهد خود را داشته باشد.';
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
    ratioAllowed: calculationAllowed,
    rankingAllowed: calculationAllowed,
    superiorityClaimAllowed: calculationAllowed
  };
}
