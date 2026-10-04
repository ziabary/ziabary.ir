import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { loadLlmModules } from './helpers/llm-modules.mjs';

const read = file => JSON.parse(fs.readFileSync(file, 'utf8'));
const source = read('data/llm/v0.3.0/repository.json');
const modules = await loadLlmModules();
const ids = ['model:cloudflare-clef', 'model:cloudflare-clef-flash'];
const answers = { task: 'extraction', decisionTask: 'classify', output: 'fields', sourceLanguage: 'en', outputLanguage: 'en', sources: 'provided', format: 'text', deployment: 'self', hardware: 'gpu', gpuName: 'RTX 4090', vram: '24', inputTokens: '512', outputTokens: '16', concurrency: '1' };

test('stable Ollama supports image decisions while the llama.cpp prerelease remains text only', () => {
  const ollama = source.softwareReleases.find(item => item.id === 'software-release:ollama-v0-35-1');
  const llama = source.softwareReleases.find(item => item.id === 'software-release:llama-cpp-b11371');
  assert.equal(ollama.version, 'v0.35.1');
  assert.equal(ollama.releaseChannel, 'stable');
  assert.equal(ollama.releasedOn, '2026-09-29');
  assert.match(ollama.backendSummary.value, /متن و تصویر.*choice.*noul.*score/);
  assert.equal(llama.releaseChannel, 'prerelease');
  assert.match(llama.backendSummary.value, /تصویر هنوز پشتیبانی نمی‌شود/);
});

test('Clef is localized and the wizard only offers it for typed decision tasks', () => {
  for (const locale of ['fa', 'en', 'es']) {
    const i18n = modules['i18n/runtime'].createLlmI18n(locale, read(`data/llm/locales/messages.${locale}.json`), modules['i18n/runtime'].resolveRecordTranslations(read(`data/llm/locales/records.${locale}.json`)));
    const repo = modules['i18n/runtime'].localizeLlmRepository(source, i18n);
    const rows = modules.adapters.createLlmAdapters(i18n).buildLlmViewRows(repo)['model-catalog'];
    for (const id of ids) {
      const model = repo.models.find(item => item.id === id);
      const profile = repo.modelProfiles.find(item => item.modelVersionId === id);
      assert.deepEqual(model.inputModalities, ['text', 'image']);
      assert.equal(model.kind, 'decision');
      assert.ok(profile.runGuides.some(guide => guide.engine === 'Ollama' && /v0\.35\.1\+/.test(guide.label)));
      assert.ok(rows.some(row => row.id === id));
      if (locale !== 'fa') assert.doesNotMatch(JSON.stringify([model.specializedSpecs, profile]), /[\u0600-\u06ff]/);
      const review = input => modules.wizard.assessWizardCatalog(repo, input, locale).find(item => item.model.id === id);
      assert.notEqual(review(answers).status, 'excluded');
      assert.equal(review(answers).runtime, 'Ollama');
      assert.equal(review(answers).memoryStatus, 'unsupported');
      for (const input of [
        { ...answers, task: 'general' },
        { ...answers, task: 'writing' },
        { ...answers, decisionTask: 'other' },
        { ...answers, output: 'short' },
        { ...answers, deployment: 'api' },
        { ...answers, task: 'operations', decisionTask: 'route' }
      ]) assert.equal(review(input).status, 'excluded');
      assert.notEqual(review({ ...answers, task: 'operations', decisionTask: 'agent-control' }).status, 'excluded');
    }
  }
});
