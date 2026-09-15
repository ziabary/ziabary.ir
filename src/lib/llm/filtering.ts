import type { LlmFilterConfig, LlmViewRow, ViewValue } from './views';

export type RangeSelection = { min: string; max: string };
export type FilterSelection = string | string[] | RangeSelection;
export type FilterSelections = Record<string, FilterSelection>;
export type SortDirection = 'asc' | 'desc';

const persianDigits = '۰۱۲۳۴۵۶۷۸۹';
const arabicDigits = '٠١٢٣٤٥٦٧٨٩';

export function normalizeLlmSearch(value: unknown) {
  return String(value ?? '')
    .normalize('NFKC')
    .replace(/[يى]/g, 'ی')
    .replace(/ك/g, 'ک')
    .replace(/[۰-۹]/g, (digit) => String(persianDigits.indexOf(digit)))
    .replace(/[٠-٩]/g, (digit) => String(arabicDigits.indexOf(digit)))
    .toLocaleLowerCase('fa')
    .trim();
}

export function isMissing(value: ViewValue | undefined): boolean {
  return !value || value.state !== 'known';
}

export function missingLabel(value: ViewValue | undefined) {
  if (value?.state === 'known') return value.display;
  const label = !value || value.state === 'unknown'
    ? 'نامعلوم'
    : value.state === 'not-measured'
      ? 'اندازه‌گیری نشده'
      : 'قابل‌اعمال نیست';
  return value?.note ? `${label} · ${value.note}` : label;
}

function selected(selection: FilterSelection | undefined) {
  if (Array.isArray(selection)) return selection.length > 0;
  if (selection && typeof selection === 'object') return selection.min !== '' || selection.max !== '';
  return selection !== undefined && selection !== '';
}

export function activeFilterCount(selections: FilterSelections) {
  return Object.values(selections).filter(selected).length;
}

function knownValues(value: ViewValue | ViewValue[] | undefined) {
  const values = Array.isArray(value) ? value : value ? [value] : [];
  return values.filter((item): item is Extract<ViewValue, { state: 'known' }> => item.state === 'known');
}

function facetMatches(row: LlmViewRow, config: LlmFilterConfig, selection: FilterSelection | undefined) {
  if (!selected(selection)) return true;
  const facet = row.facets[config.id];
  const rawValues = Array.isArray(facet) ? facet : facet ? [facet] : [];
  const values = knownValues(facet);
  const hasMissing = !rawValues.length || rawValues.some((value) => value.state !== 'known');

  if (config.control === 'text') {
    // An active factual filter never silently includes unknown/not-measured/N/A.
    if (!values.length) return false;
    const needle = normalizeLlmSearch(selection as string);
    return values.some((value) => normalizeLlmSearch(value.raw ?? value.display).includes(needle));
  }

  if (config.control === 'select' || config.control === 'boolean') {
    const expected = String(selection);
    if (expected === 'missing' && hasMissing) return true;
    return values.some((value) => String(value.raw ?? value.display) === expected);
  }

  if (config.control === 'multi') {
    const expected = selection as string[];
    return (expected.includes('missing') && hasMissing)
      || values.some((value) => expected.includes(String(value.raw ?? value.display)));
  }

  if (config.control === 'number-range') {
    if (!values.length) return false;
    const range = selection as RangeSelection;
    const min = range.min === '' ? -Infinity : Number(normalizeLlmSearch(range.min));
    const max = range.max === '' ? Infinity : Number(normalizeLlmSearch(range.max));
    if (Number.isNaN(min) || Number.isNaN(max)) return false;
    return values.some((value) => {
      if (value.canonicalNumber === undefined) return false;
      if (config.canonicalUnit && value.canonicalUnit !== config.canonicalUnit) return false;
      return value.canonicalNumber >= min && value.canonicalNumber <= max;
    });
  }

  if (config.control === 'date-range') {
    if (!values.length) return false;
    const range = selection as RangeSelection;
    return values.some((value) => {
      const date = String(value.raw ?? value.sortValue ?? '');
      return (!range.min || date >= range.min) && (!range.max || date <= range.max);
    });
  }

  return true;
}

export function filterLlmRows(
  rows: LlmViewRow[],
  filters: LlmFilterConfig[],
  selections: FilterSelections,
  query: string
) {
  const needle = normalizeLlmSearch(query);
  return rows.filter((row) => {
    if (needle && !normalizeLlmSearch(`${row.label} ${row.id} ${row.searchText}`).includes(needle)) return false;
    return filters.every((config) => facetMatches(row, config, selections[config.id]));
  });
}

function comparable(value: ViewValue | undefined): string | number | undefined {
  if (!value || value.state !== 'known') return undefined;
  return value.sortValue ?? value.canonicalNumber ?? (typeof value.raw === 'boolean' ? Number(value.raw) : value.raw) ?? value.display;
}

/** Missing values stay at the end in both directions; known zero sorts normally. */
export function sortLlmRows(rows: LlmViewRow[], key: string, direction: SortDirection) {
  if (!key) return [...rows];
  return [...rows].sort((left, right) => {
    const a = comparable(left.cells[key]);
    const b = comparable(right.cells[key]);
    if (a === undefined && b === undefined) return left.id.localeCompare(right.id, 'en');
    if (a === undefined) return 1;
    if (b === undefined) return -1;
    const order = typeof a === 'number' && typeof b === 'number'
      ? a - b
      : String(a).localeCompare(String(b), 'fa', { numeric: true, sensitivity: 'base' });
    return (direction === 'asc' ? order : -order) || left.id.localeCompare(right.id, 'en');
  });
}

export function updateComparison(
  selectedIds: string[],
  row: LlmViewRow,
  _allRows: LlmViewRow[],
  limit: number
): { ids: string[]; error: string } {
  if (selectedIds.includes(row.id)) return { ids: selectedIds.filter((id) => id !== row.id), error: '' };
  if (selectedIds.length >= limit) return { ids: selectedIds, error: `حداکثر ${limit} ردیف را می‌توان هم‌زمان مقایسه کرد.` };
  return { ids: [...selectedIds, row.id], error: '' };
}
