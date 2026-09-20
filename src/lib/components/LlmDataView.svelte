<script lang="ts">
  import apiModels from '../../../data/llm/api-models.json';
  import { localized } from '$lib/llm/wizard-core';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { browser } from '$app/environment';
  import { tick } from 'svelte';
  import { readTableSelection, encodeTableSelection } from '$lib/llm/selection';
  import { getLlmI18n } from '$lib/llm/i18n/context';
  const i18n = getLlmI18n();
  const { t, locale, direction, numberFormat } = i18n;
  const { populateLlmFilterOptions } = createLlmFiltering(i18n);
  const { defaultLlmColumns } = createLlmViews(i18n);
  const { activeFilterCount, filterLlmRows, missingLabel, sortLlmRows, updateComparison } = createLlmFiltering(i18n);
  const { evaluateComparison } = createLlmComparison(i18n);
  import { createLlmFiltering } from '$lib/llm/filtering';
  import type { Snippet } from 'svelte';
  import LlmEvidence from './LlmEvidence.svelte';
  import LlmValue from './LlmValue.svelte';
  import LlmPublishedEvaluations from './LlmPublishedEvaluations.svelte';
  import { llmBrand } from '$lib/llm/brands';
  import { createLlmViews } from '$lib/llm/views';
  import type { Evidence } from '$lib/llm/schema';
  import type { FilterSelections, RangeSelection, SortDirection } from '$lib/llm/filtering';

  import { createLlmComparison } from '$lib/llm/comparison';
  import type {
    ComparisonMode,
    LlmFilterConfig,
    LlmMatrixCell,
    LlmViewConfig,
    LlmViewRow,
    ViewValue
  } from '$lib/llm/views';

  export let config: LlmViewConfig;
  export let anchorId: string | undefined = undefined;
  export let controlsContent: Snippet | undefined = undefined;
  export let rows: LlmViewRow[] = [];
  export let presetId = '';
  export let resetKey = '';
  export let evidence: Evidence[] = [];
  export let onOpenModel: ((id: string, panel?: string) => void) | undefined = undefined;

  const numbers = new Intl.NumberFormat(numberFormat);
  let query = '';
  let selections: FilterSelections = {};
  let sortKey = '';
  let sortDirection: SortDirection = 'asc';
  let expanded: string[] = [];
  let selectedIds: string[] = [];
  let onlySelected = false;
  let compareError = '';
  let comparisonMode: ComparisonMode = 'side-by-side';
  let comparisonAxis = '';
  let appliedRouteState = '';
  let selectedColumns: string[] | null = null;
  let activeMatrix: Record<string, string> = {};
  let appliedPresentation = '';
  $: if (appliedPresentation !== (config.layoutKey ?? config.presentation ?? '')) {
    selectedColumns = null; expanded = []; activeMatrix = {};
    appliedPresentation = config.layoutKey ?? config.presentation ?? '';
  }
  $: automaticColumns = defaultLlmColumns(config, rows);
  $: availableColumns = [...config.defaultColumns, ...(config.optionalColumns ?? []), ...(config.matrixColumns ?? []).map(column => ({ key: column.id, label: column.label }))];
  $: activeColumnKeys = selectedColumns ?? [...automaticColumns.map(column => column.key), ...(config.matrixColumns ?? []).map(column => column.id)];
  $: displayedColumns = [...config.defaultColumns, ...(config.optionalColumns ?? [])].filter(column => activeColumnKeys.includes(column.key));
  $: displayedMatrixColumns = (config.matrixColumns ?? []).filter(column => activeColumnKeys.includes(column.id));
  $: hiddenColumns = availableColumns.filter(column => !activeColumnKeys.includes(column.key));

  $: effectiveFilters = populateLlmFilterOptions(rows, config.filters, selections, query);
  $: mainFilters = effectiveFilters.filter((filter) => filter.level === 'main');
  $: advancedFilters = effectiveFilters.filter((filter) => filter.level === 'advanced');
  $: activeCount = activeFilterCount(selections) + (query.trim() ? 1 : 0);
  $: filteredRows = filterLlmRows(rows, effectiveFilters, selections, query).filter(row => !onlySelected || selectedIds.includes(row.id));
  $: apiMatches = config.id==='model-catalog' ? apiModels.filter(m=>!query.trim()||`${m.name} ${m.id} ${m.provider} ${m.snapshot}`.toLowerCase().includes(query.trim().toLowerCase())):[];
  $: visibleRows = sortLlmRows(filteredRows, sortKey, sortDirection);
  $: comparedRows = rows.filter((row) => selectedIds.includes(row.id));
  $: activePreset = config.presets?.find((item) => item.id === presetId);
  $: routeState = `${config.id}:${presetId}:${resetKey}`;
  $: if (routeState !== appliedRouteState) {
    const nextPreset = config.presets?.find((item) => item.id === presetId);
    selections = nextPreset ? structuredClone(nextPreset.selections) : {};
    query = '';
    sortKey = '';
    sortDirection = 'asc';
    expanded = [];
    activeMatrix = {};
    selectedColumns = null;
    selectedIds = []; onlySelected = false;
    compareError = '';
    comparisonMode = 'side-by-side';
    comparisonAxis = '';
    appliedSelectionUrl = null;
    appliedRouteState = routeState;
  }
  let appliedSelectionUrl: string | null = null;
  $: selectionUrl = browser ? $page.url.searchParams.get(`s_${config.id}`) ?? '' : '';
  $: if (selectionUrl !== appliedSelectionUrl) {
    if (selectionUrl || appliedSelectionUrl !== null) {
    const state = readTableSelection(selectionUrl, config, rows);
    query = state.q; selections = state.filters; selectedIds = state.ids; onlySelected = !!state.onlySelected; selectedColumns = state.columns;
    sortKey = state.sort; sortDirection = state.direction; comparisonMode = state.mode; comparisonAxis = state.axis;
    }
    appliedSelectionUrl = selectionUrl;
  }
  async function saveSelection() {
    await tick();
    const value = encodeTableSelection({ q: query, filters: selections, ids: selectedIds, onlySelected, columns: selectedColumns, sort: sortKey, direction: sortDirection, mode: comparisonMode, axis: comparisonAxis });
    const url = new URL($page.url); const key = `s_${config.id}`;
    if (value) url.searchParams.set(key, value); else url.searchParams.delete(key);
    if (url.href !== $page.url.href) { appliedSelectionUrl = value; await goto(url, { noScroll: true, keepFocus: true }); }
  }
  function trackSelection(node: HTMLElement) {
    let timer: ReturnType<typeof setTimeout>;
    const schedule = () => { clearTimeout(timer); timer = setTimeout(saveSelection, 200); };
    node.addEventListener('change', schedule); node.addEventListener('input', schedule); node.addEventListener('click', schedule);
    return { destroy() { clearTimeout(timer); node.removeEventListener('change', schedule); node.removeEventListener('input', schedule); node.removeEventListener('click', schedule); } };
  }
  $: comparisonResult = evaluateComparison(comparedRows, config.comparison, comparisonMode, comparisonAxis || undefined);
  $: orderedComparison = comparisonResult.rankingAllowed ? sortLlmRows(comparedRows, 'value', config.comparison.numericMetric?.direction === 'lower' ? 'asc' : 'desc') : comparedRows;
  $: totalColumns = displayedColumns.length + 2;

  function stringSelection(id: string) {
    const value = selections[id];
    return typeof value === 'string' ? value : '';
  }

  function multiSelection(id: string) {
    const value = selections[id];
    return Array.isArray(value) ? value : [];
  }

  function rangeSelection(id: string): RangeSelection {
    const value = selections[id];
    return value && !Array.isArray(value) && typeof value === 'object' ? value : { min: '', max: '' };
  }

  function setString(id: string, value: string) {
    selections = { ...selections, [id]: value };
  }

  function setRange(id: string, side: 'min' | 'max', value: string) {
    selections = { ...selections, [id]: { ...rangeSelection(id), [side]: value } };
  }

  function toggleMulti(id: string, value: string) {
    const current = multiSelection(id);
    selections = {
      ...selections,
      [id]: current.includes(value) ? current.filter((item) => item !== value) : [...current, value]
    };
  }

  function resetFilters() {
    query = '';
    selections = {};
  }

  function toggleSort(key: string) {
    if (sortKey === key) sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    else { sortKey = key; sortDirection = 'asc'; }
  }

  function toggleExpanded(id: string) {
    const { [id]: _previous, ...rest } = activeMatrix;
    activeMatrix = rest;
    expanded = expanded.includes(id) ? expanded.filter((item) => item !== id) : [...expanded, id];
  }

  function toggleColumn(key: string) {
    const current = activeColumnKeys;
    selectedColumns = current.includes(key) ? current.filter(item => item !== key) : [...current, key];
  }

  function toggleMatrix(id: string, column: string) {
    if (expanded.includes(id) && activeMatrix[id] === column) { toggleExpanded(id); return; }
    activeMatrix = { ...activeMatrix, [id]: column };
    if (!expanded.includes(id)) expanded = [...expanded, id];
  }

  function toggleCompare(row: LlmViewRow) {
    const result = updateComparison(selectedIds, row, rows, config.comparisonLimit);
    selectedIds = result.ids;
    compareError = result.error;
  }

  function cell(row: LlmViewRow, key: string): ViewValue | undefined {
    return row.cells[key];
  }

  function isRichMatrixCell(value: ViewValue | LlmMatrixCell | undefined): value is LlmMatrixCell {
    return Boolean(value && 'value' in value);
  }

  function matrixCell(row: LlmViewRow, key: string): ViewValue | LlmMatrixCell | undefined {
    return row.matrixCells?.[key];
  }

  function matrixValue(value: ViewValue | LlmMatrixCell | undefined): ViewValue | undefined {
    return isRichMatrixCell(value) ? value.value : value;
  }
</script>

<section use:trackSelection class="llm-view" class:compact={config.compact} id={anchorId ?? config.id} data-view-id={config.id} aria-labelledby={`${config.id}-title`}>
  <header class="view-heading">
    <div class="view-number" aria-hidden="true">{numbers.format(config.sectionNumber).padStart(2, t('LlmDataView.0918'))}{#if config.subviewNumber}<small>.{numbers.format(config.subviewNumber)}</small>{/if}</div>
    <div>
      <small>{t('LlmDataView.0919')}</small>
      <h2 id={`${config.id}-title`}>{config.title}</h2>
      <p>{config.description}</p>
      {#if config.referenceLinks?.length}
        <div class="reference-links">
          {#each config.referenceLinks as link}<a href={link.href} target="_blank" rel="noopener noreferrer">{link.label} ↗</a>{/each}
        </div>
      {/if}
    </div>
  </header>
  {@render controlsContent?.()}

  {#if activePreset}
    <p class="preset-note"><b>{t('LlmDataView.0920')}</b> {activePreset.label}</p>
  {/if}

  {#if onlySelected}<p class="wizard-shortlist">{locale === "fa" ? "فقط نامزدهای این پیشنهاد" : locale === "es" ? "Solo candidatos de esta propuesta" : "Only this plan’s candidates"} · <button type="button" on:click={() => { onlySelected = false; saveSelection(); }}>{locale === "fa" ? "نمایش همهٔ مدل‌ها" : locale === "es" ? "Mostrar todos los modelos" : "Show all models"}</button></p>{/if}
  <div class="filter-panel">
    <div class="search-row">
      <label>
        <span>{t('LlmDataView.0921')}</span>
        <input type="search" value={query} on:input={(event) => query = event.currentTarget.value} placeholder={t('LlmDataView.0922')} />
      </label>
      <div class="result-count" aria-live="polite">
        <b>{numbers.format(visibleRows.length)}</b>
        <span>{t('LlmDataView.0923')} {numbers.format(rows.length)} {t('LlmDataView.0924')}</span>
      </div>
    </div>

    <div class="filter-grid main-filters">
      {#each mainFilters as filter (filter.id)}
        {@render filterControl(filter)}
      {/each}
    </div>

    {#if advancedFilters.length}
      <details class="advanced-filters">
        <summary>{t('LlmDataView.0925')} <span>{numbers.format(advancedFilters.length)} {t('LlmDataView.0926')}</span></summary>
        <div class="filter-grid">
          {#each advancedFilters as filter (filter.id)}
            {@render filterControl(filter)}
          {/each}
        </div>
      </details>
    {/if}

    <div class="filter-actions">
      <span>{activeCount ? t('LlmDataView.0927', numbers.format(activeCount)) : t('LlmDataView.0928')}</span>
      <button type="button" on:click={resetFilters} disabled={!activeCount}>{t('LlmDataView.0929')}</button>
    </div>
  </div>

  <details class="comparison-rule" open={!config.compact || comparedRows.length > 0}>
    <summary>{t('LlmDataView.0930')}</summary>
    <p><b>{t('LlmDataView.0931')}</b> {config.comparison.summary}</p>
    <div class="comparison-modes" role="group" aria-label={t('LlmDataView.0932')}>
      <label><input type="radio" bind:group={comparisonMode} value="side-by-side" /> {t('LlmDataView.0933')}</label>
      {#if config.comparison.controlledAxes.length}<label><input type="radio" bind:group={comparisonMode} value="controlled-experiment" /> {t('LlmDataView.0934')}</label>{/if}
      {#if config.comparison.solutionSharedDimensions.length && rows.some(row => row.comparison.calculation.status === 'ready')}<label><input type="radio" bind:group={comparisonMode} value="solution-selection" /> {t('LlmDataView.0935')}</label>{/if}
    </div>
    {#if comparisonMode === 'controlled-experiment'}
      <label class="axis-picker">
        <span>{t('LlmDataView.0936')}</span>
        <select bind:value={comparisonAxis}>
          <option value="">{t('LlmDataView.0937')}</option>
          {#each config.comparison.controlledAxes as axis}<option value={axis.id}>{axis.label}</option>{/each}
        </select>
      </label>
    {/if}
  </details>
  {#if compareError}<p class="compare-error" role="alert">{compareError}</p>{/if}

  {#if comparedRows.length}
    <section class="compare-panel" aria-label={t('LlmDataView.0938', config.title)}>
      <header><b>{t('LlmDataView.0939')}</b><button type="button" on:click={() => { selectedIds = []; compareError = ''; }}>{t('LlmDataView.0940')}</button></header>
      <div class:valid={comparisonResult.calculationStatus === 'valid'} class:invalid={comparisonResult.calculationStatus === 'invalid'} class="comparison-audit" aria-live="polite">
        <b>{comparisonResult.calculationStatus === 'valid' ? t('LlmDataView.0941') : comparisonResult.calculationStatus === 'invalid' ? t('LlmDataView.0942') : comparisonResult.calculationStatus === 'needs-more-data' ? t('LlmDataView.0943') : t('LlmDataView.0944')}</b>
        <p>{comparisonResult.calculationReason}</p>

        {#if comparisonResult.differences.length}
          <details><summary>{numbers.format(comparisonResult.differences.length)} {t('LlmDataView.0945')}</summary><ul>{#each comparisonResult.differences as difference}<li>{difference.label}</li>{/each}</ul></details>
        {/if}
        {#if comparisonResult.mismatchedSharedDimensions.length}<p>{t('LlmDataView.0946')} {comparisonResult.mismatchedSharedDimensions.map((id) => config.comparison.dimensionLabels[id] ?? id).join(t('LlmDataView.0947'))}</p>{/if}
        {#if comparisonResult.missingSharedDimensions.length}<p>{t('LlmDataView.0948')} {comparisonResult.missingSharedDimensions.map((id) => config.comparison.dimensionLabels[id] ?? id).join(t('LlmDataView.0947'))}</p>{/if}
        {#if comparisonResult.limitations.length}<p>{t('LlmDataView.0949')} {comparisonResult.limitations.join(t('LlmDataView.0950'))}</p>{/if}
      </div>
      <!-- svelte-ignore a11y_no_noninteractive_tabindex (Keyboard users need to scroll the comparison region.) -->
      <div class="compare-shell" role="region" tabindex="0" aria-label={t('LlmDataView.0951')}>
        <table>
          <thead><tr><th>{t('LlmDataView.0952')}</th>{#each orderedComparison as row}<th>{row.label}</th>{/each}</tr></thead>
          <tbody>
            {#each [...config.defaultColumns, ...config.detailColumns] as column}
              <tr><th>{column.label}</th>{#each orderedComparison as row}<td><LlmValue value={cell(row, column.key) ?? row.details[column.key]} /></td>{/each}</tr>
            {/each}
            {#each config.matrixColumns ?? [] as column}
              <tr><th>{column.label}</th>{#each orderedComparison as row}<td>{missingLabel(matrixValue(matrixCell(row, column.id)))}</td>{/each}</tr>
            {/each}
          </tbody>
        </table>
      </div>
    </section>
  {/if}

  {#if config.compact}
    <div class="column-toolbar">
      <div>
        <p>{t('LlmDataView.0953')}</p>
        {#if hiddenColumns.length}
          <div class="hidden-columns"><span>{t('LlmDataView.0954')}</span>{#each hiddenColumns as column}<button class="restore-column" data-column={column.key} type="button" on:click={() => toggleColumn(column.key)}>+ {column.label}</button>{/each}</div>
        {/if}
      </div>
      <button class="reset-columns" type="button" on:click={() => selectedColumns = null}>{t('LlmDataView.0955')}</button>
    </div>
  {/if}
  {#if apiMatches.length}
    <details class="api-models" open={!!query.trim()}><summary>{localized(['مدل‌های عرضه‌شده از طریق API','Models available through APIs','Modelos disponibles por API'],locale)} · {numbers.format(apiMatches.length)}</summary>
      <p>{localized(['برای این نسخه‌ها وزن قابل نصب در این بررسی تأیید نشده است؛ آن‌ها در پیشنهاد اجرای محلی وارد نمی‌شوند.','Self-hostable weights were not verified in this review; these releases are excluded from local deployment suggestions.','No se verificaron pesos instalables en esta revisión; estas versiones no se recomiendan para instalación local.'],locale)}</p>
      {#each apiMatches as model}<article><strong><bdi>{model.name}</bdi></strong> · <bdi>{model.snapshot}</bdi><p>{model.provider} · API · <bdi>{numbers.format(model.contextTokens??model.inputLimitTokens??0)}</bdi> {model.contextTokens?localized(['توکن زمینه','context tokens','tokens de contexto'],locale):localized(['توکن ورودی','input tokens','tokens de entrada'],locale)} · <bdi>{model.reviewedOn}</bdi></p><a href={model.sourceUrl} target="_blank" rel="noopener">{localized(['منبع رسمی و وضعیت عرضه','Official source and availability','Fuente oficial y disponibilidad'],locale)} ↗</a></article>{/each}
    </details>
  {/if}
  <!-- svelte-ignore a11y_no_noninteractive_tabindex (Keyboard users need to scroll wide data regions.) -->
  <div class="table-shell" role="region" tabindex="0" aria-label={config.tableLabel}>
    <table style:min-width={config.compact ? `${304 + (displayedColumns.length + displayedMatrixColumns.length - 1) * (config.id === 'model-suitability' ? 160 : 145)}px` : undefined}>
      <caption>{config.tableLabel}</caption>
      <thead>
        <tr>
          <th class="pick">{t('LlmDataView.0956')}</th>
          <th class="detail">{t('LlmDataView.0957')}</th>
          {#each displayedColumns as column}
            <th class:num={column.numeric} data-column={column.key} style:width={config.compact && displayedColumns.length + displayedMatrixColumns.length === 1 ? 'auto' : undefined}>
              <div class="th-inner">
              {#if column.sortable}
                <button class="sort-column" type="button" class:active={sortKey === column.key} on:click={() => toggleSort(column.key)}>
                  <span class="column-label">{column.label}</span><span class="sort-indicator" aria-hidden="true">{sortKey === column.key ? (sortDirection === 'asc' ? '↑' : '↓') : '↕'}</span>
                </button>
              {:else}<span>{column.label}</span>{/if}
              {#if config.compact && column.key !== config.defaultColumns[0].key}<button class="hide-column" type="button" aria-label={t('LlmDataView.0958', column.label)} title={t('LlmDataView.0959', column.label)} on:click={() => toggleColumn(column.key)}><svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" focusable="false"><path d="m6 6 12 12M18 6 6 18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" /></svg></button>{/if}
              </div>
            </th>
          {/each}
          {#each displayedMatrixColumns as column}
            <th class="matrix-head" data-column={column.id}><div class="th-inner"><span>{column.label}</span>{#if config.compact}<button class="hide-column" type="button" aria-label={t('LlmDataView.0958', column.label)} on:click={() => toggleColumn(column.id)}><svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" focusable="false"><path d="m6 6 12 12M18 6 6 18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" /></svg></button>{/if}</div>{#if column.note}<small>{column.note}</small>{/if}</th>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each visibleRows as row (row.id)}
          <tr class:selected={selectedIds.includes(row.id)} data-row-id={row.id}>
            <td class="pick"><input type="checkbox" checked={selectedIds.includes(row.id)} aria-label={t('LlmDataView.0960', row.label)} on:change={() => toggleCompare(row)} /></td>
            <td class="detail"><button type="button" class:open={expanded.includes(row.id)} aria-expanded={row.modelId && !row.inlineDetails ? undefined : expanded.includes(row.id)} aria-haspopup={row.modelId && !row.inlineDetails ? 'dialog' : undefined} aria-label={t('LlmDataView.0961', row.label)} title={t('LlmDataView.0962')} on:click={() => row.modelId && onOpenModel && !row.inlineDetails ? onOpenModel(row.modelId) : toggleExpanded(row.id)}><svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="m6 9 6 6 6-6" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" /></svg></button></td>
            {#each displayedColumns as column, columnIndex}<td class:num={column.numeric} data-column={column.key}>
              {#if columnIndex === 0}
                <div class="branded-name">
                  {#if llmBrand(row.brandId ?? row.modelId ?? row.label)}<img src={llmBrand(row.brandId ?? row.modelId ?? row.label)} alt="" width="34" height="34" loading="lazy" />{/if}
                  {#if row.modelId && onOpenModel}<button class="profile-link" type="button" aria-haspopup="dialog" on:click={() => onOpenModel?.(row.modelId!)}><bdi>{row.label}</bdi><small>{t('LlmDataView.0963')}</small></button>{:else}<LlmValue value={cell(row, column.key) ?? row.details[column.key]} compact={config.compact} />{/if}
                </div>
                {#if row.modelUrl}<a class="official-model" href={row.modelUrl} target="_blank" rel="noopener noreferrer">{t('LlmDataView.0964')}</a>{/if}
              {:else if column.key === 'published-quality' && row.modelId && onOpenModel && row.cells[column.key]?.state === 'known'}
                <button type="button" class="profile-link" on:click={() => onOpenModel?.(row.modelId!, 'quality')}><LlmValue value={row.cells[column.key]} compact />←</button>
              {:else if column.key === 'downloads' && row.modelId && onOpenModel}
                <div class="model-start">{#each row.downloadLinks ?? [] as link}<a href={link.href} target="_blank" rel="noopener noreferrer">{link.label} ↗</a>{/each}<button type="button" on:click={() => onOpenModel?.(row.modelId!, 'downloads')}>{t('LlmDataView.0965')}</button><button type="button" on:click={() => onOpenModel?.(row.modelId!, 'run')}>{t('LlmDataView.0966')}</button></div>
              {:else}<LlmValue value={cell(row, column.key) ?? row.details[column.key]} compact={config.compact} />{/if}
            </td>{/each}
            {#each displayedMatrixColumns as column}
              {@const matrix = matrixCell(row, column.id)}
              <td class="matrix-cell" data-matrix-column={column.id}>
                {#if config.compact && isRichMatrixCell(matrix) && (matrix.details?.length || matrix.sourceIds?.length)}
                  <button type="button" class="matrix-trigger" class:open={expanded.includes(row.id) && activeMatrix[row.id] === column.id} aria-expanded={expanded.includes(row.id) && activeMatrix[row.id] === column.id} aria-label={t('LlmDataView.0967', column.label, row.label)} on:click={() => toggleMatrix(row.id, column.id)}>
                    <span><LlmValue value={matrixValue(matrix)} compact /></span><svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path d="m6 9 6 6 6-6" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" /></svg>
                  </button>
                {:else}<LlmValue value={matrixValue(matrix)} compact={config.compact} />{/if}
                {#if !config.compact && isRichMatrixCell(matrix) && (matrix.details?.length || matrix.sourceIds?.length)}
                  <details>
                    <summary>{t('LlmDataView.0957')}</summary>
                    {#if matrix.results && matrix.results.length > 1}
                      <ol class="matrix-results">
                        {#each matrix.results as result}
                          <li>
                            <b>{result.id}</b>
                            <span><LlmValue value={result.value} /></span>
                            {#if result.details?.length}
                              <dl>{#each result.details as detail}<div><dt>{detail.label}</dt><dd><LlmValue value={detail.value} /></dd></div>{/each}</dl>
                            {/if}
                            {#if result.sourceIds?.length}<LlmEvidence ids={result.sourceIds} {evidence} />{/if}
                          </li>
                        {/each}
                      </ol>
                    {:else if matrix.details?.length}
                      <dl>{#each matrix.details as detail}<div><dt>{detail.label}</dt><dd><LlmValue value={detail.value} /></dd></div>{/each}</dl>
                    {/if}
                    {#if matrix.sourceIds?.length}<LlmEvidence ids={matrix.sourceIds} {evidence} />{/if}
                  </details>
                {/if}
              </td>
            {/each}
          </tr>
          {#if expanded.includes(row.id)}
            <tr class="detail-row"><td colspan={totalColumns + displayedMatrixColumns.length}>
              {#if activeMatrix[row.id]}
                {@const focused = matrixCell(row, activeMatrix[row.id])}
                {#if isRichMatrixCell(focused)}
                  <section class="application-detail">
                    <header><h3>{config.matrixColumns?.find(column => column.id === activeMatrix[row.id])?.label} <bdi>{row.label}</bdi></h3><button type="button" on:click={() => toggleExpanded(row.id)}>{t('LlmDataView.0968')}</button></header>
                    <LlmValue value={focused.value} compact />
                    {@render matrixDetails(focused)}
                    {#if row.publishedResults?.some(result => result.applicationIds.some(id => id === activeMatrix[row.id]))}<LlmPublishedEvaluations results={row.publishedResults.filter(result => result.applicationIds.some(id => id === activeMatrix[row.id]))} {evidence} />{/if}
                  </section>
                {/if}
              {:else}
              <dl class="detail-grid">
                {#each config.detailColumns.filter((column) => column.key !== 'sources' && ((!config.compact && config.id !== 'benchmarks') || (row.details[column.key] ?? row.cells[column.key])?.state === 'known')) as column}<div><dt>{column.label}</dt><dd><LlmValue value={row.details[column.key] ?? row.cells[column.key]} /></dd></div>{/each}
                {#if row.publishedResults?.length}<div class="row-evidence"><dt>{t('LlmDataView.0969')}</dt><dd><LlmPublishedEvaluations results={row.publishedResults} {evidence} /></dd></div>{/if}
                <div class="row-evidence"><dt>{t('LlmDataView.0970')}</dt><dd><LlmEvidence ids={row.sourceIds} {evidence} /></dd></div>
                {#if config.compact && config.matrixColumns?.length}<div class="row-evidence"><dt>{t('LlmDataView.0971')}</dt><dd>{#each config.matrixColumns as column}{@const matrix = matrixCell(row, column.id)}{#if isRichMatrixCell(matrix) && matrix.sourceIds?.length}<details class="application-entry"><summary>{column.label}</summary>{@render matrixDetails(matrix)}</details>{/if}{/each}</dd></div>{/if}
              </dl>
              {/if}
            </td></tr>
          {/if}
        {:else}
          <tr class="empty-row"><td colspan={totalColumns + displayedMatrixColumns.length}>
            {rows.length ? t('LlmDataView.0972') : config.noDataMessage}
          </td></tr>
        {/each}
      </tbody>
    </table>
  </div>
  {#if config.compact}<p class="missing-key">{t('LlmDataView.0973')}</p>{/if}
</section>

{#snippet matrixDetails(matrix: LlmMatrixCell)}
  {#each matrix.results?.length ? matrix.results : [{ value: matrix.value, details: matrix.details, sourceIds: matrix.sourceIds }] as result}
    <dl class="application-facts">{#each result.details?.filter(detail => detail.value.state === 'known' || detail.label === t('LlmDataView.0974')) ?? [] as detail}<div><dt>{detail.label}</dt><dd><LlmValue value={detail.value} /></dd></div>{/each}</dl>
    {#if result.sourceIds?.length}<LlmEvidence ids={result.sourceIds} {evidence} />{/if}
  {/each}
{/snippet}

{#snippet filterControl(filter: LlmFilterConfig)}
  {#if filter.control === 'multi'}
    <fieldset class="filter-control chips" data-filter-id={filter.id}>
      <legend>{filter.label}</legend>
      <div>
        {#each filter.options ?? [] as item}
          <label title={item.note ?? undefined}>
            <input type="checkbox" disabled={item.count === 0 && !multiSelection(filter.id).includes(item.value)} checked={multiSelection(filter.id).includes(item.value)} on:change={() => toggleMulti(filter.id, item.value)} />
            <span>{#if ['family', 'software-product', 'run-engine'].includes(filter.id) && llmBrand(item.label)}<img class="filter-logo" src={llmBrand(item.label)} alt="" width="20" height="20" loading="lazy" />{/if}{item.label}{#if item.count !== undefined} <small>({numbers.format(item.count)})</small>{/if}</span>
          </label>
        {/each}
      </div>
    </fieldset>
  {:else if filter.control === 'number-range' || filter.control === 'date-range'}
    <fieldset class="filter-control range-control" data-filter-id={filter.id}>
      <legend>{filter.label}{#if filter.canonicalUnit} <small>({filter.canonicalUnit === 'B' ? t('LlmDataView.0975') : filter.canonicalUnit})</small>{/if}</legend>
      <div>
        <label><span>{t('LlmDataView.0976')}</span><input type={filter.control === 'date-range' ? 'date' : 'number'} inputmode={filter.control === 'number-range' ? 'decimal' : undefined} value={rangeSelection(filter.id).min} on:input={(event) => setRange(filter.id, 'min', event.currentTarget.value)} /></label>
        <label><span>{t('LlmDataView.0977')}</span><input type={filter.control === 'date-range' ? 'date' : 'number'} inputmode={filter.control === 'number-range' ? 'decimal' : undefined} value={rangeSelection(filter.id).max} on:input={(event) => setRange(filter.id, 'max', event.currentTarget.value)} /></label>
      </div>
    </fieldset>
  {:else if filter.control === 'select' || filter.control === 'boolean'}
    <label class="filter-control" data-filter-id={filter.id}>
      <span>{filter.label}</span>
      <select value={stringSelection(filter.id)} on:change={(event) => setString(filter.id, event.currentTarget.value)}>
        <option value="">{t('LlmDataView.0978')}</option>
        {#if filter.control === 'boolean'}
          <option value="true">{t('LlmDataView.0979')}</option><option value="false">{t('LlmDataView.0980')}</option>
        {:else}
          {#each filter.options ?? [] as item}<option value={item.value} disabled={item.count === 0 && stringSelection(filter.id) !== item.value}>{item.label}{item.count !== undefined ? ` (${numbers.format(item.count)})` : ''}</option>{/each}
        {/if}
      </select>
    </label>
  {:else}
    <label class="filter-control" data-filter-id={filter.id}>
      <span>{filter.label}</span>
      <input type="text" value={stringSelection(filter.id)} placeholder={filter.placeholder ?? ''} on:input={(event) => setString(filter.id, event.currentTarget.value)} />
    </label>
  {/if}
{/snippet}

<style>
.api-models{margin-block:16px;padding:16px;border:1px solid var(--line);border-radius:8px}.api-models article{padding-block:12px;border-top:1px solid var(--line)}.api-models p{font-size:14px;line-height:1.8}.api-models summary{cursor:pointer;font-weight:700}
  .wizard-shortlist{padding:12px 14px;border:1px solid var(--line);border-radius:7px;background:var(--soft);font-size:13px}.wizard-shortlist button{border:0;background:transparent;color:var(--link-ink);font:inherit;cursor:pointer;text-decoration:underline;text-underline-offset:3px}
  .filter-logo{width:20px;height:20px;min-width:20px;object-fit:contain;padding:2px;background:white;border-radius:4px;vertical-align:middle;margin-inline-end:6px}
  .official-model{display:block;margin-top:8px;font-size:10px;color:var(--link-ink)}.model-start a{font-size:11px;color:var(--link-ink)}
  .branded-name{display:flex;align-items:center;gap:10px;min-width:170px}.branded-name img{width:34px;height:34px;object-fit:contain;flex-shrink:0;padding:4px;background:white;border:1px solid #ddd;border-radius:7px;box-sizing:border-box}.profile-link,.model-start button{color:var(--link-ink);background:none;border:0;padding:0;cursor:pointer;font:inherit;text-align:start;line-height:1.9}.profile-link bdi{overflow-wrap:normal;word-break:normal}.profile-link small{display:block;font-size:10px;color:var(--muted);margin-top:5px}.model-start{display:grid;gap:6px;min-width:130px}

  .llm-view{scroll-margin-top:100px;padding-block:42px;border-top:1px solid var(--line);min-width:0}.view-heading{display:grid;grid-template-columns:58px minmax(0,1fr);gap:18px;align-items:start}.view-number{font:700 26px/1.2 Arial,sans-serif;color:color-mix(in srgb,var(--teal) 55%,var(--line))}.view-heading small{color:var(--teal);font-size:10px}.view-heading h2{margin:5px 0 8px;font-size:clamp(24px,2.8vw,36px);line-height:1.55}.view-heading p{max-width:900px;margin:0;color:var(--muted);font-size:13px;line-height:2}.reference-links{display:flex;flex-wrap:wrap;gap:8px;margin-top:8px}.reference-links a{color:var(--link-ink);font-size:10px}.preset-note{margin:18px 0 0;padding:10px 13px;border-inline-start:3px solid var(--teal);background:color-mix(in srgb,var(--teal) 6%,var(--paper));color:var(--muted);font-size:11px}.preset-note b{color:var(--ink)}
  .filter-panel{margin-top:20px;border:1px solid var(--line);background:color-mix(in srgb,var(--paper) 95%,var(--soft))}.search-row{display:grid;grid-template-columns:minmax(240px,1fr) auto;gap:18px;align-items:end;padding:14px}.search-row label,.filter-control{min-width:0}.search-row label>span,.filter-control>span,.filter-control legend{display:block;margin-bottom:6px;color:var(--muted);font-size:11px}.search-row input,.filter-control>input,.filter-control select,.range-control input{box-sizing:border-box;width:100%;min-height:39px;border:1px solid var(--line);border-radius:6px;background:var(--bg);color:var(--ink);padding:7px 10px;font:inherit;font-size:12px}.result-count{display:grid;grid-template-columns:auto auto;gap:1px 8px;align-items:baseline}.result-count b{grid-row:1/3;color:var(--teal);font-size:23px}.result-count span{color:var(--muted);font-size:10px}.filter-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;padding:14px;border-top:1px solid var(--line)}.filter-control{margin:0;padding:0;border:0}.filter-control legend small{font:inherit}.chips>div{display:flex;flex-wrap:wrap;gap:5px;max-height:112px;overflow:auto}.chips label{position:relative}.chips input{position:absolute;opacity:0}.chips label span{display:block;margin:0;padding:6px 8px;border:1px solid var(--line);border-radius:5px;color:var(--muted);font-size:10px;cursor:pointer}.chips input:checked+span{border-color:var(--teal);background:color-mix(in srgb,var(--teal) 8%,var(--paper));color:var(--link-ink)}.range-control>div{display:grid;grid-template-columns:1fr 1fr;gap:6px}.range-control label{display:grid;grid-template-columns:auto 1fr;align-items:center;gap:5px}.range-control label span{font-size:10px;color:var(--muted)}.advanced-filters{border-top:1px solid var(--line)}.advanced-filters summary{display:flex;justify-content:space-between;padding:11px 14px;cursor:pointer;color:var(--ink);font-size:12px;font-weight:700}.advanced-filters summary span{color:var(--teal);font-weight:500}.filter-actions{display:flex;justify-content:space-between;align-items:center;padding:10px 14px;border-top:1px solid var(--line);color:var(--muted);font-size:10px}.filter-actions button,.compare-panel button{border:0;background:transparent;color:var(--link-ink);font:inherit;cursor:pointer}.filter-actions button:disabled{opacity:.45;cursor:default}
  .comparison-rule{margin:12px 0;padding:11px 13px;border:1px solid var(--line);color:var(--muted);font-size:11px;line-height:1.9}.comparison-rule p{margin:0}.comparison-rule b{color:var(--ink)}.comparison-modes{display:flex;flex-wrap:wrap;gap:8px 18px;margin-top:8px}.comparison-modes label{cursor:pointer}.comparison-modes input{accent-color:var(--teal)}.axis-picker{display:flex;align-items:center;gap:8px;margin-top:9px}.axis-picker select{min-height:34px;border:1px solid var(--line);border-radius:5px;background:var(--bg);color:var(--ink);padding:4px 8px}.compare-error{padding:9px 12px;border:1px solid color-mix(in srgb,#b76f5d 50%,var(--line));color:#a55043;font-size:11px}.compare-panel{margin:14px 0;border:1px solid color-mix(in srgb,var(--teal) 45%,var(--line))}.compare-panel>header{display:flex;justify-content:space-between;padding:10px 12px;border-bottom:1px solid var(--line);font-size:11px}.comparison-audit{padding:10px 12px;border-bottom:1px solid var(--line);background:var(--soft);font-size:10px}.comparison-audit b{color:var(--muted)}.comparison-audit.valid b{color:var(--teal)}.comparison-audit.invalid b{color:#a55043}.comparison-audit p{margin:4px 0;line-height:1.7}.comparison-audit details{margin-top:5px}.comparison-audit ul{margin:4px 0;padding-inline-start:18px}.compare-shell{overflow:auto;max-height:55vh}.compare-shell table{min-width:max-content}.compare-shell th,.compare-shell td{min-width:190px;white-space:normal}.compare-shell th:first-child{position:sticky;inset-inline-start:0;z-index:4}
  td{overflow-wrap:anywhere}
  .table-shell{container-type:inline-size;max-width:100%;max-height:72vh;overflow:auto;border:1px solid var(--line);background:var(--paper)}table{width:max-content;min-width:100%;border-collapse:separate;border-spacing:0;font-size:12px}caption{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}th,td{box-sizing:border-box;min-width:145px;max-width:270px;padding:9px 10px;border-inline-end:1px solid var(--line);border-bottom:1px solid var(--line);text-align:start;vertical-align:middle}thead th{position:sticky;top:0;z-index:4;height:54px;background:var(--navy);color:#d7e7e5;white-space:nowrap}thead th .sort-column{display:flex;flex:1 1 0;min-width:0;align-items:center;justify-content:space-between;gap:6px;padding:0;border:0;background:transparent;color:inherit;font:inherit;text-align:inherit;cursor:pointer}thead th .sort-column.active,thead th .sort-indicator{color:#78d6cd}.pick{position:sticky;inset-inline-start:0;z-index:6;min-width:66px;width:66px;max-width:66px;text-align:center;background:var(--paper)}thead .pick{z-index:8;background:var(--navy)}.detail{position:sticky;inset-inline-start:66px;z-index:6;min-width:68px;width:68px;max-width:68px;text-align:center;background:var(--paper);box-shadow:-8px 0 14px rgba(0,0,0,.05)}thead .detail{z-index:8;background:var(--navy)}.detail button{width:30px;height:30px;border:1px solid var(--line);border-radius:50%;background:transparent;color:var(--teal);cursor:pointer}.num{text-align:center}.matrix-head{min-width:190px;white-space:normal}.matrix-head span,.matrix-head small{display:block}.matrix-head small{margin-top:4px;color:#9eb8b5;font-size:8px;font-weight:400;line-height:1.6}.matrix-cell details{margin-top:6px;padding-top:5px;border-top:1px solid var(--line)}.matrix-cell summary{cursor:pointer;color:var(--link-ink);font-size:9px}.matrix-cell dl{margin:5px 0 0}.matrix-cell dl>div{display:grid;grid-template-columns:.8fr 1.2fr;gap:6px;padding:4px 0}.matrix-cell dt{font-size:8px}.matrix-cell dd{margin:0;font-size:9px;line-height:1.6}.matrix-results{margin:6px 0 0;padding-inline-start:17px}.matrix-results li{padding:7px 0;border-bottom:1px solid var(--line)}.matrix-results li:last-child{border-bottom:0}.matrix-results b,.matrix-results span{display:block;overflow-wrap:anywhere;font-size:9px}.matrix-results b{direction:ltr;text-align:start;color:var(--ink)}tbody td{height:58px;background:var(--paper);color:var(--muted)}tbody tr.selected td{background:color-mix(in srgb,var(--teal) 8%,var(--paper))}.detail-row td{height:auto;padding:0}.detail-grid{position:sticky;inset-inline-start:0;box-sizing:border-box;width:calc(100cqw - 2px);max-width:1100px;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:0;padding:16px}.detail-grid>div{display:grid;grid-template-columns:minmax(100px,.7fr) 1.3fr;gap:8px;padding:9px;border-bottom:1px solid var(--line)}.detail-grid>.row-evidence{grid-column:1/-1;grid-template-columns:1fr;min-width:0}.detail-grid dt{color:var(--muted);font-size:10px}.detail-grid dd{margin:0;color:var(--ink);font-size:11px;line-height:1.75;overflow-wrap:anywhere}.empty-row td{padding:38px;text-align:center;color:var(--muted);white-space:normal}
  .comparison-rule>summary{cursor:pointer;color:var(--link-ink)}
  .column-toolbar{display:flex;justify-content:space-between;align-items:flex-start;gap:16px;margin:16px 0 10px;font-size:12px;line-height:1.9}
  .column-toolbar p{margin:0;color:var(--muted)}
  .column-toolbar button{border:1px solid var(--line);background:var(--paper);color:var(--link-ink);font:inherit;cursor:pointer}
  .reset-columns{flex-shrink:0;border-radius:6px;padding:6px 10px}
  .hidden-columns{display:flex;flex-wrap:wrap;align-items:center;gap:6px;margin-top:8px;color:var(--muted)}
  .hidden-columns button{border-radius:99px;padding:3px 10px;font-size:11px}
  .table-shell th[data-column="context"],.table-shell td[data-column="context"]{text-align:start}
  .th-inner{display:flex;direction:rtl;align-items:center;justify-content:space-between;gap:8px;min-width:0}
  .th-inner>span,.column-label{flex:1 1 0;min-width:0;white-space:normal;line-height:1.65}
  .sort-indicator{flex:0 0 auto}
  .th-inner svg{display:block;flex-shrink:0}
  thead th .hide-column{display:grid;place-items:center;box-sizing:border-box;flex:0 0 24px;width:24px;height:24px;padding:0;border:1px solid #597371;border-radius:50%;background:transparent;color:#b9d6d2;line-height:1;cursor:pointer}
  thead th .hide-column:hover,thead th .hide-column:focus-visible{color:#78d6cd;border-color:#78d6cd}
  .detail button{display:inline-grid;place-items:center;padding:0;transition:background .2s}
  .detail button svg,.matrix-trigger svg{transition:transform .2s;flex-shrink:0}
  .detail button.open svg,.matrix-trigger.open svg{transform:rotate(180deg)}
  .detail button.open{background:var(--soft)}
  .matrix-trigger{display:flex;align-items:center;justify-content:space-between;gap:8px;width:100%;padding:4px 0;border:0;background:transparent;color:var(--muted);text-align:start;font:inherit;line-height:1.9;cursor:pointer}
  .matrix-trigger svg{color:var(--link-ink)}
  .matrix-trigger:hover,.matrix-trigger.open{color:var(--ink)}
  .matrix-trigger:focus-visible,.column-toolbar button:focus-visible,.detail button:focus-visible{outline:2px solid var(--teal);outline-offset:3px}
  .missing-key{font-size:11px;color:var(--muted);line-height:1.8;margin:10px 0 0}
  .compact .comparison-rule{padding:8px 12px}
  .compact .table-shell>table{width:100%;min-width:1000px;table-layout:fixed}
  .compact .table-shell th,.compact .table-shell td{min-width:0;max-width:none;line-height:1.9;white-space:normal}
  .compact .table-shell th:nth-child(3){width:190px}
  .compact .table-shell .pick{width:54px;min-width:54px;max-width:54px;padding:8px 4px}
  .compact .table-shell .detail{inset-inline-start:54px;width:60px;min-width:60px;max-width:60px;padding:8px 4px;overflow-wrap:normal}
  .compact .detail button{width:32px;height:32px;border-radius:50%;font:inherit;color:var(--link-ink)}
  .compact tbody tr:nth-child(4n+3)>td{background:var(--soft)}
  .compact .detail-row>td{background:var(--soft)}
  .compact .table-shell td[data-column="model"],.compact .table-shell td[data-column="model-artifact"],.compact .table-shell td[data-column="software-version"],.compact .table-shell td[data-column="model-kind"]{font-weight:700;color:var(--ink);direction:ltr;text-align:start}
  .compact[data-view-id="model-suitability"] .table-shell>table{min-width:1420px}
  .compact[data-view-id="software-products"] .table-shell>table{min-width:1080px}
  .compact[data-view-id="specialized-models"] .table-shell>table{min-width:1220px}
  .compact .matrix-head small{display:none}
  .compact .detail-grid{max-width:none}
  .application-detail{position:sticky;inset-inline-start:0;box-sizing:border-box;width:calc(100cqw - 2px);padding:22px;white-space:normal;overflow-wrap:anywhere}
  .application-detail header{display:flex;align-items:start;justify-content:space-between;gap:20px;margin-bottom:12px}
  .application-detail h3{margin:0;color:var(--ink);font-size:15px;line-height:1.8}
  .application-detail h3 bdi{display:block;color:var(--muted);font-size:13px;font-weight:500}
  .application-detail header button{flex-shrink:0;padding:6px 10px;border:1px solid var(--line);border-radius:5px;background:var(--paper);color:var(--link-ink);font:inherit;font-size:11px;cursor:pointer}
  .application-facts{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px 24px;margin:18px 0;color:var(--ink)}
  .application-facts>div{padding:10px 0;border-top:1px solid var(--line)}
  .application-facts dt{font-size:11px;color:var(--muted);margin-bottom:5px}
  .application-facts dd{margin:0;font-size:13px;line-height:1.9}
  .application-entry{padding:10px 0;border-top:1px solid var(--line)}
  .application-entry>summary{cursor:pointer;color:var(--link-ink);font-size:12px}
  @media(max-width:650px){.column-toolbar{flex-direction:column;gap:8px}.application-detail{padding:16px}.application-detail header{gap:10px}.application-facts{grid-template-columns:1fr}.application-detail h3{font-size:13px}}
  @media(max-width:980px){.filter-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.detail-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
  @media(max-width:650px){.llm-view{padding-block:34px}.view-heading{grid-template-columns:38px minmax(0,1fr);gap:10px}.view-number{font-size:18px}.search-row{grid-template-columns:1fr}.result-count{justify-content:start}.filter-grid{grid-template-columns:1fr}.detail-grid{grid-template-columns:1fr}.comparison-rule{font-size:10px}.matrix-head{min-width:170px}}
</style>
