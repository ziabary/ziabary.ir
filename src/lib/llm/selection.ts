import type { LlmViewConfig, LlmViewRow } from './views';
import type { FilterSelections, SortDirection } from './filtering';
import type { ResearchControls } from './research-views';
export interface TableSelection {
  q: string; filters: FilterSelections; ids: string[]; onlySelected?: boolean; columns: string[] | null;
  sort: string; direction: SortDirection; mode: 'side-by-side' | 'controlled-experiment' | 'solution-selection'; axis: string;
}
const uniqueStrings = (value: unknown, allowed: Set<string>, limit = 100) => Array.isArray(value)
  ? [...new Set(value.filter((id): id is string => typeof id === 'string' && allowed.has(id)))].slice(0, limit) : [];
function parse(value: string | null): any { if (!value || value.length > 12000) return {}; try { const parsed = JSON.parse(value); return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {}; } catch { return {}; } }
export function readTableSelection(value: string | null, config: LlmViewConfig, rows: LlmViewRow[]): TableSelection {
  const data = parse(value), filters: FilterSelections = {};
  for (const filter of config.filters) {
    const selected = data.filters?.[filter.id];
    const allowed = new Set([...(filter.options ?? []).map(option => option.value), ...rows.flatMap(row => {
      const facet = row.facets[filter.id]; return (Array.isArray(facet) ? facet : facet ? [facet] : []).flatMap(item => item.state === 'known' ? [String(item.raw ?? item.display)] : ['missing']);
    })]);
    if (filter.control === 'multi') filters[filter.id] = uniqueStrings(selected, allowed);
    else if (filter.control.endsWith('range') && selected && typeof selected === 'object' && !Array.isArray(selected)) {
      const part = (key: string) => {
        if (typeof selected[key] !== 'string' || selected[key].length >= 40) return '';
        const text = selected[key].trim().replace(/[۰-۹]/g, (digit: string) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(digit))).replace(/[٠-٩]/g, (digit: string) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(digit)));
        if (!text) return '';
        if (filter.control === 'number-range') return /^\d+(\.\d+)?$/.test(text) && Number.isFinite(Number(text)) ? text : '';
        const date = new Date(text + 'T00:00:00Z');
        return /^\d{4}-\d{2}-\d{2}$/.test(text) && Number.isFinite(date.getTime()) && date.toISOString().slice(0,10) === text ? text : '';
      };
      filters[filter.id] = { min: part('min'), max: part('max') };
    } else if (typeof selected === 'string' && selected.length <= 200 && (filter.control === 'text' || allowed.has(selected))) filters[filter.id] = selected;
  }
  const columns = new Set([...config.defaultColumns, ...(config.optionalColumns ?? [])].map(column => column.key).concat(config.matrixColumns?.map(column => column.id) ?? []));
  const axis = config.comparison.controlledAxes.find(axis => axis.id === data.axis)?.id ?? '';
  return { q: typeof data.q === 'string' ? data.q.slice(0, 200) : '', filters,
    ids: uniqueStrings(data.ids, new Set(rows.map(row => row.id)), config.comparisonLimit), onlySelected: data.onlySelected === true,
    columns: Array.isArray(data.columns) ? uniqueStrings(data.columns, columns) : null,
    sort: columns.has(data.sort) ? data.sort : '', direction: data.direction === 'desc' ? 'desc' : 'asc',
    mode: data.mode === 'controlled-experiment' && axis ? data.mode : data.mode === 'solution-selection' && config.comparison.solutionSharedDimensions.length ? data.mode : 'side-by-side', axis };
}

/** Keep the current edition and shared selection while navigating guide sections. */
export function llmSelectionHref(current: URL, changes: Record<string, string | null>, hash: string) {
  const url = new URL(current);
  for (const [key, value] of Object.entries(changes)) {
    if (value === null) url.searchParams.delete(key); else url.searchParams.set(key, value);
  }
  url.hash = hash;
  return url.pathname + url.search + url.hash;
}
export function encodeTableSelection(state: TableSelection) {
  const value: Record<string, unknown> = {};
  if (state.q) value.q = state.q;
  const filters = Object.fromEntries(Object.entries(state.filters).filter(([, value]) => Array.isArray(value) ? value.length : typeof value === 'string' ? !!value : !!value.min || !!value.max));
  if (Object.keys(filters).length) value.filters = filters;
  if (state.ids.length) value.ids = state.ids;
  if (state.onlySelected) value.onlySelected = true;
  if (state.columns !== null) value.columns = state.columns;
  if (state.sort) { value.sort = state.sort; value.direction = state.direction; }
  if (state.mode !== 'side-by-side') { value.mode = state.mode; if (state.axis) value.axis = state.axis; }
  return Object.keys(value).length ? JSON.stringify(value) : '';
}
export function readResearchSelection(value: string | null, defaults: ResearchControls, allowed: { hardware: string[]; ram: number[]; groups: string[]; metrics: string[]; models: string[] }): ResearchControls {
  const data = parse(value); const positive = (value: unknown, fallback: number, max: number) => typeof value === 'number' && Number.isInteger(value) && value > 0 && value <= max ? value : fallback;
  return { context: positive(data.context, defaults.context, 2 ** 21), active: positive(data.active, defaults.active, 128),
    method: ['gpu','cpu','layerwise','publisher','weights'].includes(data.method) ? data.method : defaults.method,
    hardwareIds: Array.isArray(data.hardwareIds) ? uniqueStrings(data.hardwareIds, new Set(allowed.hardware)) : defaults.hardwareIds,
    ram: Array.isArray(data.ram) ? [...new Set<number>(data.ram.filter((value: number) => allowed.ram.includes(value)))] : defaults.ram,
    group: allowed.groups.includes(data.group) ? data.group : defaults.group, metric: allowed.metrics.includes(data.metric) ? data.metric : defaults.metric,
    deploymentMode: data.deploymentMode === 'kernels' ? 'kernels' : 'routes', model: allowed.models.includes(data.model) ? data.model : '' };
}
