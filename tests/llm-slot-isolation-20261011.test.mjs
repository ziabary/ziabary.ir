import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { loadLlmModules } from './helpers/llm-modules.mjs';

const read = path => JSON.parse(fs.readFileSync(path, 'utf8'));
const canonical = read('data/llm/v0.3.0/repository.json');
const modules = await loadLlmModules();

test('b11552 is selectable as a scoped prerelease in every edition without a Persian fallback', () => {
  const release = canonical.softwareReleases.find(item => item.version === 'b11552');
  assert.equal(release.releaseChannel, 'prerelease');
  assert.equal(release.releasedOn, '2026-10-10');
  assert.equal(release.lastReviewedOn, '2026-10-11');
  for (const locale of ['fa', 'en', 'es']) {
    const i = modules['i18n/runtime'].createLlmI18n(locale, read(`data/llm/locales/messages.${locale}.json`),
      modules['i18n/runtime'].resolveRecordTranslations(read(`data/llm/locales/records.${locale}.json`)));
    const repo = modules['i18n/runtime'].localizeLlmRepository(canonical, i);
    const research = modules.research.createLlmResearch(i);
    const researchViews = modules['research-views'].createLlmResearchViews(i);
    const adapters = modules.adapters.createLlmAdapters(i);
    const views = modules.views.createLlmViews(i);
    const filtering = modules.filtering.createLlmFiltering(i);
    const enriched = research.enrichResearchRepository(repo);
    const rows = researchViews.enrichExistingRows(enriched, adapters.buildLlmViewRows(enriched), 'all')['software-products'];
    const filters = views.llmViewConfigs.find(view => view.id === 'software-products').filters;
    const selected = filtering.filterLlmRows(rows, filters, { 'software-version': 'b11552' }, '');
    assert.equal(selected.length, 1, locale);
    assert.match(selected[0].cells['software-version'].display, /Pre|pre|پیش/);
    const display = JSON.stringify(selected[0]);
    assert.match(display, /id_slot/);
    assert.match(display, /RAM/);
    assert.match(display, /b11552\+/);
    assert.match(display, /canary/);
    assert.match(display, /CVE/);
    if (locale !== 'fa') assert.doesNotMatch(display, /[\u0600-\u06ff]/);
  }
});

test('upstream regression evidence keeps PR measurements and the client timeout separate from release validation', () => {
  const archive = 'data/llm/sources/llama-server-slot-isolation-2026-10-11/';
  const result = read(archive + 'regression-report.json');
  const comments = read(archive + 'pr-30295-comments.json');
  const source = comments.find(item => item.html_url === result.upstreamReportUrl);
  assert.ok(source);
  assert.match(source.body, /build 11146, no fix \| 30 \| 1 \| 9/);
  assert.match(source.body, /\*\*60\*\* \| \*\*0\*\* \| \*\*0\*\*/);
  assert.equal(result.fixed.build, '11550');
  assert.equal(result.releaseContainingFix, 'b11552');
  assert.equal(result.clientTimeoutSeconds, 60);
  assert.match(source.body, /60 s client timeout/);
  assert.equal(result.siteRuntimeTested, false);
  assert.equal(result.idSlot, 7);
  assert.ok(result.flags.includes('--no-cache-idle-slots'));
});
