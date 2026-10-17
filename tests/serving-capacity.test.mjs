import test, { after } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { createServer } from 'vite';
import { loadLlmModules } from './helpers/llm-modules.mjs';
const server = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' });
after(() => server.close());
const c = await server.ssrLoadModule('/src/lib/llm/serving-capacity.ts');
const { kvCacheGiB } = await server.ssrLoadModule('/src/lib/llm/memory-planning.ts');
const model = c.capacityModels[0];
const gpu = c.capacityGpus.find(g => g.id === 'nvidia-rtx4090');
const baseline = c.defaultCapacityInput;

test('the article’s 30 × 19456 example is exactly 71.25 GiB of KV, independent of weights', () => {
  assert.equal(kvCacheGiB(32, 8, 128, 19456, 30, 2), 71.25);
  assert.equal(kvCacheGiB(32, 8, 128, 19456, 30, 1), 35.625);
  const result = c.assessMemory(model, gpu, { ...baseline, active: 30, tokens: 19456 });
  assert.equal(result.kvGiB, 71.25);
  assert.ok(result.perDeviceGiB > 71.25);
  assert.equal(result.status, 'over');
});
test('replicas duplicate weights and budget the busiest device, not a pooled 48 GB', () => {
  const large = { ...model, weightGiB: 25 };
  const result = c.assessMemory(large, gpu, { ...baseline, gpuCount: 2, active: 3, tokens: 1024 });
  assert.equal(result.status, 'over');
  assert.equal(result.weightGiB, 25);
  assert.equal(result.activePerDevice, 2);
  const smaller = c.assessMemory(model, gpu, { ...baseline, gpuCount: 2, active: 3, tokens: 1024 });
  assert.equal(smaller.kvGiB, .25);
  assert.equal(smaller.totalGiB, smaller.perDeviceGiB * 2);
});
test('sharded positive memory is conditional and cannot certify deployment; unsupported routes stay unknown', () => {
  const result = c.assessMemory({ ...model, weightGiB: 25 }, gpu, { ...baseline, gpuCount: 2, deployment: 'shard', tokens: 1024, active: 2 });
  assert.equal(result.status, 'conditional');
  assert.equal(result.weightGiB, 12.5);
  assert.equal(c.assessMemory({ ...model, multiGpu: false }, gpu, { ...baseline, gpuCount: 2, deployment: 'shard' }).status, 'unsupported');
});
test('actual free memory, co-resident models and per-device reserve control fit', () => {
  const initial = c.assessMemory(model, gpu, { ...baseline, active: 1, tokens: 1024 });
  assert.equal(initial.capacityBasis, 'nominal-class');
  const free = c.assessMemory(model, gpu, { ...baseline, active: 1, tokens: 1024, freeGiB: 16 });
  assert.equal(free.capacityBasis, 'free-memory');
  assert.equal(free.status, 'over');
  assert.equal(c.assessMemory(model, gpu, { ...baseline, active: 1, tokens: 1024, extraGiB: 8 }).status, 'over');
  assert.equal(c.assessMemory(model, gpu, { ...baseline, freeGiB: 25 }).status, 'invalid');
});
test('empty, non-finite, fractional and out-of-context inputs cannot yield a fit', () => {
  for (const patch of [{ active: 0 }, { active: 1.5 }, { tokens: Infinity }, { tokens: model.maxTokens + 1 }, { reserveGiB: undefined }, { extraGiB: -1 }, { gpuCount: 0 }, { kvBytes: 3 }]) {
    assert.equal(c.assessMemory(model, gpu, { ...baseline, ...patch }).status, 'invalid', JSON.stringify(patch));
  }
  assert.deepEqual(c.recommendGpus(model, { ...baseline, gpuCount: 0 }), []);
});
test('recommendations are current devices from the shared table, avoid shared/multi-die memory and never assert speed', () => {
  assert.ok(!c.capacityGpus.some(g => /spark|mi250|gaudi/i.test(g.id)));
  const suggestions = c.recommendGpus(model, baseline);
  assert.ok(suggestions.length > 0);
  assert.ok(suggestions.every(s => s.gpu.status === 'current' && s.gpu.vendor === 'NVIDIA'));
  assert.ok(suggestions.every(s => c.capacityGpus.includes(s.gpu) && s.assessment.remainingGiB >= 0));
  assert.ok(suggestions.every(s => ['fits', 'conditional'].includes(s.assessment.status)));
  assert.equal(new Set(suggestions.map(s => s.gpu.id)).size, suggestions.length);
  assert.ok(suggestions.every(s => !('tokensPerSecond' in s)));
  assert.deepEqual(c.recommendGpus(model, { ...baseline, freeGiB: .5 }), suggestions);
});
test('agent call rate and user in-flight count remain different dimensions', () => {
  const d = c.calculateDemand({ users: 100, requestsPerMinute: .6, calls: 4, inputTokens: 4300, outputTokens: 330, responseSeconds: 8 });
  assert.equal(d.userRequestsPerSecond, 1);
  assert.equal(d.callsPerSecond, 4);
  assert.equal(d.inputTokensPerSecond, 17200);
  assert.equal(d.outputTokensPerSecond, 1320);
  assert.equal(d.inFlight, 8);
  assert.equal(c.calculateDemand({ users: -1, requestsPerMinute: 1, calls: 1, inputTokens: 1, outputTokens: 1, responseSeconds: 1 }), undefined);
});
test('performance ratios require measured capacity and handle zero traffic without infinities', () => {
  assert.equal(c.measuredPressure(330, 0), undefined);
  assert.equal(c.measuredPressure(330, NaN), undefined);
  assert.equal(c.measuredPressure(330, 660), .5);
  assert.equal(c.measuredPressure(0, 660), 0);
});
test('shared KV kernel preserves every existing supported single-GPU estimate', async () => {
  const modules = await loadLlmModules();
  const artifacts = [...JSON.parse(await fs.readFile('data/llm/v0.2.0/data/artifacts.json')), ...JSON.parse(await fs.readFile('data/llm/v0.3.0/planning-artifacts.json'))];
  for (const m of c.capacityModels.filter(m => m.basis === 'gguf-file')) {
    const artifact = artifacts.find(a => a.id === m.id);
    const tokens = Math.min(m.maxTokens, 8192);
    const previous = modules.research.calculateMemory(artifact, tokens, 7);
    assert.ok(previous, m.id);
    const result = c.assessMemory(m, gpu, { ...baseline, tokens, active: 7 });
    assert.equal(result.weightGiB, previous.weightGiB, m.id);
    assert.equal(result.kvGiB, previous.kvGiB, m.id);
    assert.equal(result.perDeviceGiB, previous.budgetGiB, m.id);
  }
});
