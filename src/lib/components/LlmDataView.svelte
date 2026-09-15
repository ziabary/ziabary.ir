<script lang="ts">
  import {
    activeFilterCount,
    filterLlmRows,
    missingLabel,
    sortLlmRows,
    updateComparison,
    type FilterSelections,
    type RangeSelection,
    type SortDirection
  } from '$lib/llm/filtering';
  import { evaluateComparison } from '$lib/llm/comparison';
  import type {
    ComparisonMode,
    LlmFilterConfig,
    LlmMatrixCell,
    LlmViewConfig,
    LlmViewRow,
    ViewValue
  } from '$lib/llm/views';

  export let config: LlmViewConfig;
  export let rows: LlmViewRow[] = [];
  export let presetId = '';

  const numbers = new Intl.NumberFormat('fa-IR');
  let query = '';
  let selections: FilterSelections = {};
  let sortKey = '';
  let sortDirection: SortDirection = 'asc';
  let expanded: string[] = [];
  let selectedIds: string[] = [];
  let compareError = '';
  let comparisonMode: ComparisonMode = 'side-by-side';
  let comparisonAxis = '';
  let appliedRouteState = '';

  $: mainFilters = config.filters.filter((filter) => filter.level === 'main');
  $: advancedFilters = config.filters.filter((filter) => filter.level === 'advanced');
  $: activeCount = activeFilterCount(selections) + (query.trim() ? 1 : 0);
  $: filteredRows = filterLlmRows(rows, config.filters, selections, query);
  $: visibleRows = sortLlmRows(filteredRows, sortKey, sortDirection);
  $: comparedRows = rows.filter((row) => selectedIds.includes(row.id));
  $: activePreset = config.presets?.find((item) => item.id === presetId);
  $: routeState = `${config.id}:${presetId}`;
  $: if (routeState !== appliedRouteState) {
    const nextPreset = config.presets?.find((item) => item.id === presetId);
    selections = nextPreset ? structuredClone(nextPreset.selections) : {};
    query = '';
    sortKey = '';
    sortDirection = 'asc';
    expanded = [];
    selectedIds = [];
    compareError = '';
    comparisonMode = 'side-by-side';
    comparisonAxis = '';
    appliedRouteState = routeState;
  }
  $: comparisonResult = evaluateComparison(comparedRows, config.comparison, comparisonMode, comparisonAxis || undefined);
  $: totalColumns = config.defaultColumns.length + 2;

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
    expanded = expanded.includes(id) ? expanded.filter((item) => item !== id) : [...expanded, id];
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

<section class="llm-view" id={config.id} data-view-id={config.id} aria-labelledby={`${config.id}-title`}>
  <header class="view-heading">
    <div class="view-number" aria-hidden="true">{numbers.format(config.sectionNumber).padStart(2, '۰')}{#if config.subviewNumber}<small>.{numbers.format(config.subviewNumber)}</small>{/if}</div>
    <div>
      <small>نمای داده‌ای</small>
      <h2 id={`${config.id}-title`}>{config.title}</h2>
      <p>{config.description}</p>
      {#if config.referenceLinks?.length}
        <div class="reference-links">
          {#each config.referenceLinks as link}<a href={link.href} rel="noopener noreferrer">{link.label} ↗</a>{/each}
        </div>
      {/if}
    </div>
  </header>

  {#if activePreset}
    <p class="preset-note"><b>مسیر شروع فعال:</b> {activePreset.label}</p>
  {/if}

  <div class="filter-panel">
    <div class="search-row">
      <label>
        <span>جست‌وجو در نام فارسی و انگلیسی و شناسه</span>
        <input type="search" value={query} on:input={(event) => query = event.currentTarget.value} placeholder="نام، خانواده یا شناسه…" />
      </label>
      <div class="result-count" aria-live="polite">
        <b>{numbers.format(visibleRows.length)}</b>
        <span>نتیجه از {numbers.format(rows.length)} ردیف</span>
      </div>
    </div>

    <div class="filter-grid main-filters">
      {#each mainFilters as filter (filter.id)}
        {@render filterControl(filter)}
      {/each}
    </div>

    {#if advancedFilters.length}
      <details class="advanced-filters">
        <summary>فیلترهای تخصصی <span>{numbers.format(advancedFilters.length)} کنترل</span></summary>
        <div class="filter-grid">
          {#each advancedFilters as filter (filter.id)}
            {@render filterControl(filter)}
          {/each}
        </div>
      </details>
    {/if}

    <div class="filter-actions">
      <span>{activeCount ? `${numbers.format(activeCount)} فیلتر فعال` : 'همهٔ ردیف‌ها'}</span>
      <button type="button" on:click={resetFilters} disabled={!activeCount}>پاک‌کردن همه</button>
    </div>
  </div>

  <div class="comparison-rule">
    <p><b>قاعدهٔ مقایسه:</b> {config.comparison.summary}</p>
    <div class="comparison-modes" role="group" aria-label="حالت مقایسه">
      <label><input type="radio" bind:group={comparisonMode} value="side-by-side" /> مشاهدهٔ مشخصات کنار هم</label>
      <label><input type="radio" bind:group={comparisonMode} value="controlled-experiment" /> آزمایش کنترل‌شده</label>
      <label><input type="radio" bind:group={comparisonMode} value="solution-selection" /> انتخاب راهکار برای یک نیاز</label>
    </div>
    {#if comparisonMode === 'controlled-experiment'}
      <label class="axis-picker">
        <span>محور مقایسه</span>
        <select bind:value={comparisonAxis}>
          <option value="">انتخاب محور…</option>
          {#each config.comparison.controlledAxes as axis}<option value={axis.id}>{axis.label}</option>{/each}
        </select>
      </label>
    {/if}
  </div>
  {#if compareError}<p class="compare-error" role="alert">{compareError}</p>{/if}

  {#if comparedRows.length}
    <section class="compare-panel" aria-label={`مقایسهٔ ${config.title}`}>
      <header><b>مقایسهٔ انتخاب‌شده‌ها</b><button type="button" on:click={() => { selectedIds = []; compareError = ''; }}>پاک‌کردن مقایسه</button></header>
      <div class:valid={comparisonResult.calculationStatus === 'valid'} class:invalid={comparisonResult.calculationStatus === 'invalid'} class="comparison-audit" aria-live="polite">
        <b>{comparisonResult.calculationStatus === 'valid' ? 'محاسبهٔ ساختاری مجاز' : comparisonResult.calculationStatus === 'invalid' ? 'نامعتبر برای محاسبه' : comparisonResult.calculationStatus === 'needs-more-data' ? 'نیازمند اطلاعات بیشتر' : 'فقط نمایش کنار هم'}</b>
        <p>{comparisonResult.calculationReason}</p>
        <span>نسبت: {comparisonResult.ratioAllowed ? 'مجاز' : 'غیرفعال'} · رتبه‌بندی: {comparisonResult.rankingAllowed ? 'مجاز' : 'غیرفعال'} · ادعای برتری: {comparisonResult.superiorityClaimAllowed ? 'مجاز' : 'غیرفعال'}</span>
        {#if comparisonResult.differences.length}
          <details><summary>{numbers.format(comparisonResult.differences.length)} تفاوت آشکار</summary><ul>{#each comparisonResult.differences as difference}<li>{difference.label}</li>{/each}</ul></details>
        {/if}
        {#if comparisonResult.mismatchedSharedDimensions.length}<p>شرایط مشترک ناسازگار: {comparisonResult.mismatchedSharedDimensions.map((id) => config.comparison.dimensionLabels[id] ?? id).join('، ')}</p>{/if}
        {#if comparisonResult.missingSharedDimensions.length}<p>دادهٔ مشترک ناقص: {comparisonResult.missingSharedDimensions.map((id) => config.comparison.dimensionLabels[id] ?? id).join('، ')}</p>{/if}
        {#if comparisonResult.limitations.length}<p>محدودیت‌ها: {comparisonResult.limitations.join('؛ ')}</p>{/if}
      </div>
      <!-- svelte-ignore a11y_no_noninteractive_tabindex (Keyboard users need to scroll the comparison region.) -->
      <div class="compare-shell" role="region" tabindex="0" aria-label="جدول مقایسهٔ ردیف‌های انتخاب‌شده">
        <table>
          <thead><tr><th>فیلد</th>{#each comparedRows as row}<th>{row.label}</th>{/each}</tr></thead>
          <tbody>
            {#each [...config.defaultColumns, ...config.detailColumns] as column}
              <tr><th>{column.label}</th>{#each comparedRows as row}<td>{missingLabel(cell(row, column.key) ?? row.details[column.key])}</td>{/each}</tr>
            {/each}
            {#each config.matrixColumns ?? [] as column}
              <tr><th>{column.label}</th>{#each comparedRows as row}<td>{missingLabel(matrixValue(matrixCell(row, column.id)))}</td>{/each}</tr>
            {/each}
          </tbody>
        </table>
      </div>
    </section>
  {/if}

  <!-- svelte-ignore a11y_no_noninteractive_tabindex (Keyboard users need to scroll wide data regions.) -->
  <div class="table-shell" role="region" tabindex="0" aria-label={config.tableLabel}>
    <table>
      <caption>{config.tableLabel}</caption>
      <thead>
        <tr>
          <th class="pick">مقایسه</th>
          <th class="detail">جزئیات</th>
          {#each config.defaultColumns as column}
            <th class:num={column.numeric}>
              {#if column.sortable}
                <button type="button" class:active={sortKey === column.key} on:click={() => toggleSort(column.key)}>
                  {column.label} <span aria-hidden="true">{sortKey === column.key ? (sortDirection === 'asc' ? '↑' : '↓') : '↕'}</span>
                </button>
              {:else}{column.label}{/if}
            </th>
          {/each}
          {#each config.matrixColumns ?? [] as column}
            <th class="matrix-head"><span>{column.label}</span>{#if column.note}<small>{column.note}</small>{/if}</th>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each visibleRows as row (row.id)}
          <tr class:selected={selectedIds.includes(row.id)} data-row-id={row.id}>
            <td class="pick"><input type="checkbox" checked={selectedIds.includes(row.id)} aria-label={`افزودن ${row.label} به مقایسه`} on:change={() => toggleCompare(row)} /></td>
            <td class="detail"><button type="button" aria-expanded={expanded.includes(row.id)} aria-label={`نمایش جزئیات ${row.label}`} on:click={() => toggleExpanded(row.id)}>⌄</button></td>
            {#each config.defaultColumns as column}<td class:num={column.numeric}>{missingLabel(cell(row, column.key))}</td>{/each}
            {#each config.matrixColumns ?? [] as column}
              {@const matrix = matrixCell(row, column.id)}
              <td class="matrix-cell" data-matrix-column={column.id}>
                <span>{missingLabel(matrixValue(matrix))}</span>
                {#if isRichMatrixCell(matrix) && (matrix.details?.length || matrix.sourceIds?.length)}
                  <details>
                    <summary>شرح این خانه</summary>
                    {#if matrix.results && matrix.results.length > 1}
                      <ol class="matrix-results">
                        {#each matrix.results as result}
                          <li>
                            <b>{result.id}</b>
                            <span>{missingLabel(result.value)}</span>
                            {#if result.details?.length}
                              <dl>{#each result.details as detail}<div><dt>{detail.label}</dt><dd>{missingLabel(detail.value)}</dd></div>{/each}</dl>
                            {/if}
                            {#if result.sourceIds?.length}<p>منابع همین نتیجه: {result.sourceIds.join('، ')}</p>{/if}
                          </li>
                        {/each}
                      </ol>
                    {:else if matrix.details?.length}
                      <dl>{#each matrix.details as detail}<div><dt>{detail.label}</dt><dd>{missingLabel(detail.value)}</dd></div>{/each}</dl>
                    {/if}
                    {#if matrix.sourceIds?.length}<p>منابع: {matrix.sourceIds.join('، ')}</p>{/if}
                  </details>
                {/if}
              </td>
            {/each}
          </tr>
          {#if expanded.includes(row.id)}
            <tr class="detail-row"><td colspan={totalColumns + (config.matrixColumns?.length ?? 0)}>
              <div class="detail-grid">
                {#each config.detailColumns as column}<div><dt>{column.label}</dt><dd>{missingLabel(row.details[column.key])}</dd></div>{/each}
                <div><dt>شناسه‌های منبع</dt><dd>{row.sourceIds.length ? row.sourceIds.join('، ') : 'هنوز منبعی ثبت نشده'}</dd></div>
              </div>
            </td></tr>
          {/if}
        {:else}
          <tr class="empty-row"><td colspan={totalColumns + (config.matrixColumns?.length ?? 0)}>
            {rows.length ? 'با این ترکیب فیلتر نتیجه‌ای پیدا نشد.' : config.noDataMessage}
          </td></tr>
        {/each}
      </tbody>
    </table>
  </div>
</section>

{#snippet filterControl(filter: LlmFilterConfig)}
  {#if filter.control === 'multi'}
    <fieldset class="filter-control chips" data-filter-id={filter.id}>
      <legend>{filter.label}</legend>
      <div>
        {#each filter.options ?? [] as item}
          <label title={item.note ?? undefined}>
            <input type="checkbox" checked={multiSelection(filter.id).includes(item.value)} on:change={() => toggleMulti(filter.id, item.value)} />
            <span>{item.label}</span>
          </label>
        {/each}
      </div>
    </fieldset>
  {:else if filter.control === 'number-range' || filter.control === 'date-range'}
    <fieldset class="filter-control range-control" data-filter-id={filter.id}>
      <legend>{filter.label}{#if filter.canonicalUnit} <small>({filter.canonicalUnit})</small>{/if}</legend>
      <div>
        <label><span>از</span><input type={filter.control === 'date-range' ? 'date' : 'number'} inputmode={filter.control === 'number-range' ? 'decimal' : undefined} value={rangeSelection(filter.id).min} on:input={(event) => setRange(filter.id, 'min', event.currentTarget.value)} /></label>
        <label><span>تا</span><input type={filter.control === 'date-range' ? 'date' : 'number'} inputmode={filter.control === 'number-range' ? 'decimal' : undefined} value={rangeSelection(filter.id).max} on:input={(event) => setRange(filter.id, 'max', event.currentTarget.value)} /></label>
      </div>
    </fieldset>
  {:else if filter.control === 'select' || filter.control === 'boolean'}
    <label class="filter-control" data-filter-id={filter.id}>
      <span>{filter.label}</span>
      <select value={stringSelection(filter.id)} on:change={(event) => setString(filter.id, event.currentTarget.value)}>
        <option value="">همه</option>
        {#if filter.control === 'boolean'}
          <option value="true">بله</option><option value="false">خیر</option>
        {:else}
          {#each filter.options ?? [] as item}<option value={item.value}>{item.label}</option>{/each}
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
  .llm-view{scroll-margin-top:100px;padding-block:42px;border-top:1px solid var(--line);min-width:0}.view-heading{display:grid;grid-template-columns:58px minmax(0,1fr);gap:18px;align-items:start}.view-number{font:700 26px/1.2 Arial,sans-serif;color:color-mix(in srgb,var(--teal) 55%,var(--line))}.view-heading small{color:var(--teal);font-size:10px}.view-heading h2{margin:5px 0 8px;font-size:clamp(24px,2.8vw,36px);line-height:1.55}.view-heading p{max-width:900px;margin:0;color:var(--muted);font-size:13px;line-height:2}.reference-links{display:flex;flex-wrap:wrap;gap:8px;margin-top:8px}.reference-links a{color:var(--link-ink);font-size:10px}.preset-note{margin:18px 0 0;padding:10px 13px;border-inline-start:3px solid var(--teal);background:color-mix(in srgb,var(--teal) 6%,var(--paper));color:var(--muted);font-size:11px}.preset-note b{color:var(--ink)}
  .filter-panel{margin-top:20px;border:1px solid var(--line);background:color-mix(in srgb,var(--paper) 95%,var(--soft))}.search-row{display:grid;grid-template-columns:minmax(240px,1fr) auto;gap:18px;align-items:end;padding:14px}.search-row label,.filter-control{min-width:0}.search-row label>span,.filter-control>span,.filter-control legend{display:block;margin-bottom:6px;color:var(--muted);font-size:11px}.search-row input,.filter-control>input,.filter-control select,.range-control input{box-sizing:border-box;width:100%;min-height:39px;border:1px solid var(--line);border-radius:6px;background:var(--bg);color:var(--ink);padding:7px 10px;font:inherit;font-size:12px}.result-count{display:grid;grid-template-columns:auto auto;gap:1px 8px;align-items:baseline}.result-count b{grid-row:1/3;color:var(--teal);font-size:23px}.result-count span{color:var(--muted);font-size:10px}.filter-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;padding:14px;border-top:1px solid var(--line)}.filter-control{margin:0;padding:0;border:0}.filter-control legend small{font:inherit}.chips>div{display:flex;flex-wrap:wrap;gap:5px;max-height:112px;overflow:auto}.chips label{position:relative}.chips input{position:absolute;opacity:0}.chips label span{display:block;margin:0;padding:6px 8px;border:1px solid var(--line);border-radius:5px;color:var(--muted);font-size:10px;cursor:pointer}.chips input:checked+span{border-color:var(--teal);background:color-mix(in srgb,var(--teal) 8%,var(--paper));color:var(--link-ink)}.range-control>div{display:grid;grid-template-columns:1fr 1fr;gap:6px}.range-control label{display:grid;grid-template-columns:auto 1fr;align-items:center;gap:5px}.range-control label span{font-size:10px;color:var(--muted)}.advanced-filters{border-top:1px solid var(--line)}.advanced-filters summary{display:flex;justify-content:space-between;padding:11px 14px;cursor:pointer;color:var(--ink);font-size:12px;font-weight:700}.advanced-filters summary span{color:var(--teal);font-weight:500}.filter-actions{display:flex;justify-content:space-between;align-items:center;padding:10px 14px;border-top:1px solid var(--line);color:var(--muted);font-size:10px}.filter-actions button,.compare-panel button{border:0;background:transparent;color:var(--link-ink);font:inherit;cursor:pointer}.filter-actions button:disabled{opacity:.45;cursor:default}
  .comparison-rule{margin:12px 0;padding:11px 13px;border:1px solid var(--line);color:var(--muted);font-size:11px;line-height:1.9}.comparison-rule p{margin:0}.comparison-rule b{color:var(--ink)}.comparison-modes{display:flex;flex-wrap:wrap;gap:8px 18px;margin-top:8px}.comparison-modes label{cursor:pointer}.comparison-modes input{accent-color:var(--teal)}.axis-picker{display:flex;align-items:center;gap:8px;margin-top:9px}.axis-picker select{min-height:34px;border:1px solid var(--line);border-radius:5px;background:var(--bg);color:var(--ink);padding:4px 8px}.compare-error{padding:9px 12px;border:1px solid color-mix(in srgb,#b76f5d 50%,var(--line));color:#a55043;font-size:11px}.compare-panel{margin:14px 0;border:1px solid color-mix(in srgb,var(--teal) 45%,var(--line))}.compare-panel>header{display:flex;justify-content:space-between;padding:10px 12px;border-bottom:1px solid var(--line);font-size:11px}.comparison-audit{padding:10px 12px;border-bottom:1px solid var(--line);background:var(--soft);font-size:10px}.comparison-audit b{color:var(--muted)}.comparison-audit.valid b{color:var(--teal)}.comparison-audit.invalid b{color:#a55043}.comparison-audit p{margin:4px 0;line-height:1.7}.comparison-audit span{color:var(--muted)}.comparison-audit details{margin-top:5px}.comparison-audit ul{margin:4px 0;padding-inline-start:18px}.compare-shell{overflow:auto;max-height:55vh}.compare-shell table{min-width:max-content}.compare-shell th,.compare-shell td{min-width:190px;white-space:normal}.compare-shell th:first-child{position:sticky;inset-inline-start:0;z-index:4}
  .table-shell{max-width:100%;max-height:72vh;overflow:auto;border:1px solid var(--line);background:var(--paper);scrollbar-width:thin}table{width:max-content;min-width:100%;border-collapse:separate;border-spacing:0;font-size:12px}caption{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}th,td{box-sizing:border-box;min-width:145px;max-width:270px;padding:9px 10px;border-inline-end:1px solid var(--line);border-bottom:1px solid var(--line);text-align:start;vertical-align:middle}thead th{position:sticky;top:0;z-index:4;height:54px;background:var(--navy);color:#d7e7e5;white-space:nowrap}thead th button{display:flex;width:100%;align-items:center;justify-content:space-between;gap:8px;border:0;background:transparent;color:inherit;font:inherit;cursor:pointer}thead th button.active,thead th button span{color:#78d6cd}.pick{position:sticky;inset-inline-start:0;z-index:6;min-width:66px;width:66px;max-width:66px;text-align:center;background:var(--paper)}thead .pick{z-index:8;background:var(--navy)}.detail{position:sticky;inset-inline-start:66px;z-index:6;min-width:68px;width:68px;max-width:68px;text-align:center;background:var(--paper);box-shadow:-8px 0 14px rgba(0,0,0,.05)}thead .detail{z-index:8;background:var(--navy)}.detail button{width:30px;height:30px;border:1px solid var(--line);border-radius:50%;background:transparent;color:var(--teal);cursor:pointer}.num{direction:ltr;text-align:center}.matrix-head{min-width:190px;white-space:normal}.matrix-head span,.matrix-head small{display:block}.matrix-head small{margin-top:4px;color:#9eb8b5;font-size:8px;font-weight:400;line-height:1.6}.matrix-cell>span{display:block}.matrix-cell details{margin-top:6px;padding-top:5px;border-top:1px solid var(--line)}.matrix-cell summary{cursor:pointer;color:var(--link-ink);font-size:9px}.matrix-cell dl{margin:5px 0 0}.matrix-cell dl>div{display:grid;grid-template-columns:.8fr 1.2fr;gap:6px;padding:4px 0}.matrix-cell dt{font-size:8px}.matrix-cell dd,.matrix-cell p{margin:0;font-size:9px;line-height:1.6}.matrix-results{margin:6px 0 0;padding-inline-start:17px}.matrix-results li{padding:7px 0;border-bottom:1px solid var(--line)}.matrix-results li:last-child{border-bottom:0}.matrix-results b,.matrix-results span{display:block;overflow-wrap:anywhere;font-size:9px}.matrix-results b{direction:ltr;text-align:start;color:var(--ink)}tbody td{height:58px;background:var(--paper);color:var(--muted)}tbody tr.selected td{background:color-mix(in srgb,var(--teal) 8%,var(--paper))}.detail-row td{height:auto;padding:0}.detail-grid{position:sticky;inset-inline-start:0;box-sizing:border-box;width:min(1100px,calc(100vw - 80px));display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:0;padding:16px}.detail-grid>div{display:grid;grid-template-columns:minmax(100px,.7fr) 1.3fr;gap:8px;padding:9px;border-bottom:1px solid var(--line)}.detail-grid dt{color:var(--muted);font-size:10px}.detail-grid dd{margin:0;color:var(--ink);font-size:11px;line-height:1.75;overflow-wrap:anywhere}.empty-row td{padding:38px;text-align:center;color:var(--muted);white-space:normal}
  @media(max-width:980px){.filter-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.detail-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
  @media(max-width:650px){.llm-view{padding-block:34px}.view-heading{grid-template-columns:38px minmax(0,1fr);gap:10px}.view-number{font-size:18px}.search-row{grid-template-columns:1fr}.result-count{justify-content:start}.filter-grid{grid-template-columns:1fr}.detail-grid{width:calc(100vw - 32px);grid-template-columns:1fr}.comparison-rule{font-size:10px}.matrix-head{min-width:170px}}
</style>
