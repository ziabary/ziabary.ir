import type { LlmFilterConfig, LlmViewRow, ViewValue } from './views';
export type RangeSelection = { min: string; max: string };
export type FilterSelection = string | string[] | RangeSelection;
export type FilterSelections = Record<string, FilterSelection>;
export type SortDirection = 'asc' | 'desc';
import type { LlmI18n } from './i18n/runtime';

/** Text and formatting are edition-scoped; no mutable global locale. */
export function createLlmFiltering(i18n: LlmI18n) {
const { t, locale, numberFormat } = i18n;

const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
const arabicDigits = "٠١٢٣٤٥٦٧٨٩";
function normalizeLlmSearch(value: unknown) {
  return String(value ?? '')
    .normalize('NFKC').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[يى]/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/[۰-۹]/g, (digit) => String(persianDigits.indexOf(digit)))
    .replace(/[٠-٩]/g, (digit) => String(arabicDigits.indexOf(digit)))
    .toLocaleLowerCase(locale)
    .trim();
}
function isMissing(value: ViewValue | undefined): boolean {
  return !value || value.state !== 'known';
}
function missingLabel(value: ViewValue | undefined) {
  if (value?.state === 'known') return value.display;
  const label = !value || value.state === 'unknown'
    ? t('filtering.0907')
    : value.state === 'not-measured'
      ? t('filtering.0908')
      : t('filtering.0909');
  return value?.note ? `${label} · ${value.note}` : label;
}
function selected(selection: FilterSelection | undefined) {
  if (Array.isArray(selection)) return selection.length > 0;
  if (selection && typeof selection === 'object') return selection.min !== '' || selection.max !== '';
  return selection !== undefined && selection !== '';
}
function activeFilterCount(selections: FilterSelections) {
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
    const aliases: Record<string, string> = { 'فارسی': 'fa', 'persian': 'fa', 'farsi': 'fa', 'انگلیسی': 'en', 'english': 'en', 'عربی': 'ar', 'arabic': 'ar', 'چینی': 'zh', 'chinese': 'zh', 'چندزبانه': 'multilingual', 'spanish': 'es', 'espanol': 'es', 'اسپانیایی': 'es' };
    const entered = normalizeLlmSearch(selection as string);
    const needle = config.id === 'language' ? aliases[entered] ?? entered : entered;
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
      if (value.dateRange) {
        const min = range.min ? Date.parse(range.min + 'T00:00:00Z') : -Infinity;
        const max = range.max ? Date.parse(range.max + 'T23:59:59.999Z') : Infinity;
        // A month/year intersects the selected period; it is not a made-up day.
        return value.dateRange.end >= min && value.dateRange.start <= max;
      }
      const date = String(value.raw ?? value.sortValue ?? '');
      return (!range.min || date >= range.min) && (!range.max || date <= range.max);
    });
  }

  return true;
}
function filterLlmRows(
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
function sortLlmRows(rows: LlmViewRow[], key: string, direction: SortDirection) {
  if (!key) return [...rows];
  return [...rows].sort((left, right) => {
    if (left.sortGroup !== right.sortGroup && (left.sortGroup || right.sortGroup)) return (left.sortGroup ?? '').localeCompare(right.sortGroup ?? '', 'fa');
    const leftValue = left.cells[key], rightValue = right.cells[key];
    if (leftValue?.state === 'known' && rightValue?.state === 'known' && leftValue.dateRange && rightValue.dateRange) {
      const a = leftValue.dateRange, b = rightValue.dateRange;
      // Order by the beginning, then the known end of the interval. No inferred day.
      const order = a.start - b.start || a.end - b.end;
      return (direction === 'asc' ? order : -order) || left.id.localeCompare(right.id, 'en');
    }
    const a = comparable(left.cells[key]);
    const b = comparable(right.cells[key]);
    if (a === undefined && b === undefined) return left.id.localeCompare(right.id, 'en');
    if (a === undefined) return 1;
    if (b === undefined) return -1;
    const order = typeof a === 'number' && typeof b === 'number'
      ? a - b
      : String(a).localeCompare(String(b), locale, { numeric: true, sensitivity: 'base' });
    return (direction === 'asc' ? order : -order) || left.id.localeCompare(right.id, 'en');
  });
}
function updateComparison(
  selectedIds: string[],
  row: LlmViewRow,
  _allRows: LlmViewRow[],
  limit: number
): { ids: string[]; error: string } {
  if (selectedIds.includes(row.id)) return { ids: selectedIds.filter((id) => id !== row.id), error: '' };
  if (selectedIds.length >= limit) return { ids: selectedIds, error: t('filtering.0910', limit) };
  return { ids: [...selectedIds, row.id], error: '' };
}
function populateLlmFilterOptions(rows: LlmViewRow[], configs: LlmFilterConfig[], selections: FilterSelections, query: string): LlmFilterConfig[] {
  return configs.map(config => {
    const versions = ['model-version', 'software-version'].includes(config.id);
    if (!versions && !['multi', 'select'].includes(config.control)) return config;
    const available = new Map((config.options ?? []).map(option => [option.value, option]));
    for (const row of rows) for (const value of knownValues(row.facets[config.id])) {
      const key = String(value.raw ?? value.display);
      if (!available.has(key)) available.set(key, { value: key, label: value.display });
    }
    const otherSelections = { ...selections, [config.id]: '' };
    const eligible = filterLlmRows(rows, configs, otherSelections, query);
    const counts = new Map<string, number>();
    for (const row of eligible) for (const key of new Set(knownValues(row.facets[config.id]).map(value => String(value.raw ?? value.display)))) counts.set(key, (counts.get(key) ?? 0) + 1);
    return { ...config, control: versions ? 'select' : config.control, options: [...available.values()].map(option => ({ ...option, count: option.value === 'missing' ? eligible.filter(row => { const v = row.facets[config.id]; return !(Array.isArray(v) ? v : v ? [v] : []).length || (Array.isArray(v) ? v : v ? [v] : []).some(item => item.state !== 'known'); }).length : counts.get(option.value) ?? 0 })) };
  });
}
return { normalizeLlmSearch, isMissing, missingLabel, activeFilterCount, filterLlmRows, sortLlmRows, updateComparison, populateLlmFilterOptions };
}
