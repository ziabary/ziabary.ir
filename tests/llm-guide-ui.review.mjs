import assert from 'node:assert/strict';
import { call, pause, events, socket } from '../scripts/browser-session.mjs';

const origin = process.env.LLM_REVIEW_ORIGIN ?? 'http://127.0.0.1:4174';

async function evaluate(expression) {
  const response = await call('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
  if (response.exceptionDetails) throw new Error(response.exceptionDetails.text);
  return response.result.value;
}

async function navigate(path) {
  await call('Page.navigate', { url: `${origin}${path}` });
  await pause(1400);
}

await call('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });
await navigate('/guides/llm/?show-drafts=true&view=model-suitability&preset=task-first#model-suitability');
const taskPreset = await evaluate(`(() => {
  const view = document.querySelector('#model-suitability');
  return {
    preview: location.search.includes('show-drafts=true'),
    note: view?.querySelector('.preset-note')?.textContent ?? '',
    checkedFilters: view?.querySelectorAll('.filter-panel input:checked').length ?? -1,
    state: view?.querySelector('.filter-actions span')?.textContent ?? ''
  };
})()`);
assert.equal(taskPreset.preview, true);
assert.match(taskPreset.note, /بدون حذف نوع‌های مدل/);
assert.equal(taskPreset.checkedFilters, 0);
assert.match(taskPreset.state, /همهٔ ردیف‌ها/);

await navigate('/guides/llm/?show-drafts=true&view=software-products&preset=software-choice#serving-software');
const softwarePreset = await evaluate(`(async () => {
  const view = document.querySelector('#software-products');
  const before = {
    note: view?.querySelector('.preset-note')?.textContent ?? '',
    checkedFilters: view?.querySelectorAll('.filter-panel input:checked').length ?? -1,
    state: view?.querySelector('.filter-actions span')?.textContent ?? ''
  };
  view?.querySelector('.filter-panel input[type="checkbox"]')?.click();
  await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
  return { before, selected: view?.querySelectorAll('.filter-panel input:checked').length ?? -1 };
})()`);
assert.match(softwarePreset.before.note, /نوع نیاز، محیط و نقش/);
assert.equal(softwarePreset.before.checkedFilters, 0);
assert.match(softwarePreset.before.state, /همهٔ ردیف‌ها/);
assert.equal(softwarePreset.selected, 1);

await navigate('/guides/llm/?show-drafts=true&view=deployment-compatibility&preset=memory-constrained#serving-software');
const memoryPreset = await evaluate(`(() => {
  const view = document.querySelector('#deployment-compatibility');
  return {
    preview: location.search.includes('show-drafts=true'),
    note: view?.querySelector('.preset-note')?.textContent ?? '',
    checkedFilters: view?.querySelectorAll('.filter-panel input:checked').length ?? -1,
    state: view?.querySelector('.filter-actions span')?.textContent ?? ''
  };
})()`);
assert.equal(memoryPreset.preview, true);
assert.match(memoryPreset.note, /مدل، کوانت و همهٔ مسیرهای اجرای کم‌حافظه/);
assert.equal(memoryPreset.checkedFilters, 0);
assert.match(memoryPreset.state, /همهٔ ردیف‌ها/);

await navigate('/guides/llm/?show-drafts=true&view=software-products#serving-software');
const routeReset = await evaluate(`(() => {
  const view = document.querySelector('#software-products');
  return {
    preview: location.search.includes('show-drafts=true'),
    presetNote: Boolean(view?.querySelector('.preset-note')),
    checkedFilters: view?.querySelectorAll('.filter-panel input:checked').length ?? -1,
    state: view?.querySelector('.filter-actions span')?.textContent ?? ''
  };
})()`);
assert.equal(routeReset.preview, true);
assert.equal(routeReset.presetNote, false);
assert.equal(routeReset.checkedFilters, 0);
assert.match(routeReset.state, /همهٔ ردیف‌ها/);

await navigate('/guides/llm/?show-drafts=true');
await evaluate(`(async () => {
  const harness = await import('/tests/fixtures/llm-ui-harness.ts');
  await harness.mountLlmFixture(document.body);
  await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
  return true;
})()`);

const initial = await evaluate(`(() => {
  const views = [...document.querySelectorAll('.llm-view')];
  const rowCounts = Object.fromEntries(views.map((view) => [view.id, view.querySelectorAll('tbody tr[data-row-id]').length]));
  const shared = [...document.querySelectorAll('#hardware-feasibility tr[data-row-id]')].find((row) =>
    row.querySelector('[data-matrix-column="nvidia-rtx3090"] details') && row.querySelector('[data-matrix-column="nvidia-rtx4090"] details')
  );
  return {
    dir: document.querySelector('#llm-fixture-harness')?.dir,
    viewCount: views.length,
    rowCounts,
    sharedRowId: shared?.dataset.rowId,
    longPersian: document.body.textContent.includes('عنوان فارسی بسیار بلند'),
    longLatin: document.body.textContent.includes('synthetic-revision-with-an-intentionally-long-latin-identifier'),
    pageOverflow: document.documentElement.scrollWidth > innerWidth + 1,
    tableScroll: [...document.querySelectorAll('.table-shell')].every((shell) => shell.scrollWidth >= shell.clientWidth)
  };
})()`);

assert.equal(initial.viewCount, 8);
assert.equal(initial.dir, 'rtl');
assert.ok(Object.values(initial.rowCounts).every((count) => count > 0), JSON.stringify(initial.rowCounts));
assert.ok(initial.sharedRowId);
assert.equal(initial.longPersian, true);
assert.equal(initial.longLatin, true);
assert.equal(initial.pageOverflow, false);
assert.equal(initial.tableScroll, true);

const hardwareDetails = await evaluate(`(async () => {
  const row = document.querySelector('#hardware-feasibility tr[data-row-id="${initial.sharedRowId}"]');
  const cellA = row.querySelector('[data-matrix-column="nvidia-rtx3090"]');
  const cellB = row.querySelector('[data-matrix-column="nvidia-rtx4090"]');
  cellA.querySelector('summary').click();
  cellB.querySelector('summary').click();
  row.querySelector('.detail button').click();
  await new Promise((resolve) => requestAnimationFrame(resolve));
  return {
    cellA: cellA.textContent,
    cellB: cellB.textContent,
    rowDetail: row.nextElementSibling?.textContent
  };
})()`);
assert.match(hardwareDetails.cellA, /feasibility:synthetic-a-ha/);
assert.match(hardwareDetails.cellA, /feasibility:synthetic-a-ha-repeat/);
assert.match(hardwareDetails.cellB, /deployment:synthetic-a-hardware-b/);
assert.match(hardwareDetails.cellB, /evidence:synthetic-direct/);
assert.match(hardwareDetails.rowDetail, /evidence:synthetic-direct/);

const comparison = await evaluate(`(async () => {
  const view = document.querySelector('#benchmarks');
  const rows = [...view.querySelectorAll('tr[data-row-id]')];
  rows[0].querySelector('.pick input').click();
  rows[1].querySelector('.pick input').click();
  view.querySelector('input[value="controlled-experiment"]').click();
  await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
  const axis = view.querySelector('.axis-picker select');
  if (!axis) throw new Error('محور مقایسه پس از انتخاب حالت آزمایش کنترل‌شده نمایش داده نشد.');
  axis.value = 'software';
  axis.dispatchEvent(new Event('change', { bubbles: true }));
  await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
  return {
    selected: view.querySelectorAll('tr.selected').length,
    audit: view.querySelector('.comparison-audit')?.textContent,
    differences: view.querySelector('.comparison-audit details')?.textContent
  };
})()`);
assert.equal(comparison.selected, 2);
assert.match(comparison.audit, /محاسبهٔ ساختاری مجاز/);
assert.match(comparison.differences, /تفاوت آشکار/);

const filtering = await evaluate(`(async () => {
  const view = document.querySelector('#model-catalog');
  const input = view.querySelector('input[type="search"]');
  const apply = async (value) => {
    input.value = value;
    input.dispatchEvent(new Event('input', { bubbles: true }));
    await new Promise((resolve) => requestAnimationFrame(resolve));
    return { rows: view.querySelectorAll('tr[data-row-id]').length, empty: view.querySelector('.empty-row')?.textContent ?? '' };
  };
  const match = await apply('عنوان فارسی بسیار بلند');
  const none = await apply('fixture-no-such-result-xyz');
  const reset = await apply('');
  return { match, none, reset };
})()`);
assert.equal(filtering.match.rows, 1);
assert.equal(filtering.none.rows, 0);
assert.match(filtering.none.empty, /نتیجه‌ای پیدا نشد/);
assert.equal(filtering.reset.rows, 2);

await call('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
await evaluate(`document.documentElement.dataset.theme = 'dark'`);
await pause(300);
const mobile = await evaluate(`({
  width: innerWidth,
  theme: document.documentElement.dataset.theme,
  dir: document.querySelector('#llm-fixture-harness')?.dir,
  pageOverflow: document.documentElement.scrollWidth > innerWidth + 1,
  tableScroll: [...document.querySelectorAll('.table-shell')].every((shell) => shell.scrollWidth >= shell.clientWidth),
  detailsVisible: Boolean(document.querySelector('#hardware-feasibility .detail-row')),
  comparisonVisible: Boolean(document.querySelector('#benchmarks .compare-panel'))
})`);
assert.deepEqual(mobile, { width: 390, theme: 'dark', dir: 'rtl', pageOverflow: false, tableScroll: true, detailsVisible: true, comparisonVisible: true });

const exceptions = events.filter((event) => event.method === 'Runtime.exceptionThrown');
assert.equal(exceptions.length, 0, JSON.stringify(exceptions));
console.log(JSON.stringify({ taskPreset, softwarePreset, memoryPreset, routeReset, initial, hardwareDetails, comparison, filtering, mobile }, null, 2));
await call('Page.close');
socket.end();
