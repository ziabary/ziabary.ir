import artifacts from '../../../data/llm/v0.2.0/data/artifacts.json';
import planningArtifacts from '../../../data/llm/v0.3.0/planning-artifacts.json';
import policy from '../../../data/llm/v0.2.0/data/memory-policy.json';
import { gpuRecords, type GpuRecord } from '../gpu-data';
import { kvCacheGiB } from './memory-planning';

export type CapacityModel = {
  id: string; label: string; weightGiB: number; layers: number; kvHeads: number;
  headDim: number; maxTokens: number; sourceUrl?: string; revision?: string;
  architecture: string; basis: 'example' | 'gguf-file'; multiGpu: boolean;
};
const supported = ['llama', 'qwen2', 'qwen3', 'qwen3_moe', 'qwen3moe', 'command-r', 'phi3', 'granite', 'k2_horizon'];
export const capacityModels: CapacityModel[] = [
  { id: 'example-8b-bf16', label: 'مدل آموزشی ۸B / BF16', weightGiB: 8e9 * 2 / 2 ** 30,
    layers: 32, kvHeads: 8, headDim: 128, maxTokens: 131072, architecture: 'example', basis: 'example', multiGpu: true },
  ...[...artifacts, ...planningArtifacts].filter(a => supported.includes(a.architecture)
    && [a.layers, a.kvHeads, a.headDim, a.weightFileBytes, a.artifactContextLimitTokens].every(n => Number.isFinite(n) && n > 0))
    .map(a => ({ id: a.id, label: `${a.modelRepository} / ${a.quantization}`,
      weightGiB: a.weightFileBytes / 2 ** 30, layers: a.layers, kvHeads: a.kvHeads, headDim: a.headDim,
      maxTokens: a.artifactContextLimitTokens, architecture: a.architecture, basis: 'gguf-file' as const,
      multiGpu: a.architecture !== 'k2_horizon', revision: a.repositoryRevision,
      sourceUrl: `https://huggingface.co/${a.repository}/tree/${a.repositoryRevision}` }))
];

/** Dedicated, per-device memory only. Whole systems and multi-die pooled figures are not GPU budgets. */
export const capacityGpus = gpuRecords.filter(g => ['NVIDIA', 'AMD', 'Intel'].includes(g.vendor)
  && ['current', 'legacy'].includes(g.status) && g.memoryGB > 0 && Number.isFinite(g.memoryGB)
  && /GDDR|HBM/.test(g.memoryType) && !/مشترک|یکپارچه/.test(g.memoryType)
  && (!g.productKind || ['کارت', 'ماژول'].includes(g.productKind))
  && !['amd-mi250', 'amd-mi250x', 'amd-mi300a'].includes(g.id)
  && (g.vendor !== 'Intel' || /GDDR/.test(g.memoryType))
  && !['frontier'].includes(g.gpuClass));

export type Deployment = 'replicas' | 'shard';
export type CapacityInput = {
  active: number; tokens: number; gpuCount: number; deployment: Deployment;
  kvBytes: number; reserveGiB: number; extraGiB: number; freeGiB?: number;
};
export type MemoryAssessment = {
  status: 'fits' | 'tight' | 'over' | 'conditional' | 'unsupported' | 'invalid';
  weightGiB: number; kvGiB: number; perDeviceGiB: number; totalGiB: number;
  capacityGiB: number; remainingGiB: number; reserveGiB: number; extraGiB: number;
  activePerDevice: number; maxActive: number; capacityBasis: 'nominal-class' | 'free-memory';
};
export const defaultCapacityInput: CapacityInput = {
  active: 8, tokens: 8192, gpuCount: 1, deployment: 'replicas', kvBytes: 2,
  reserveGiB: policy.gpuReserveGiBPerDevice, extraGiB: 0
};
export function assessMemory(model: CapacityModel, gpu: GpuRecord, input: CapacityInput): MemoryAssessment {
  const valid = [input.active, input.tokens, input.gpuCount].every(n => Number.isSafeInteger(n) && n > 0)
    && input.gpuCount <= 8 && input.active <= 512 && input.tokens <= model.maxTokens
    && [1, 2, 4].includes(input.kvBytes) && ['replicas', 'shard'].includes(input.deployment)
    && [input.reserveGiB, input.extraGiB].every(n => Number.isFinite(n) && n >= 0)
    && (input.freeGiB === undefined || Number.isFinite(input.freeGiB) && input.freeGiB > 0 && input.freeGiB <= gpu.memoryGB);
  const capacityGiB = input.freeGiB ?? gpu.memoryGB;
  const activePerDevice = input.deployment === 'replicas' ? Math.ceil(input.active / input.gpuCount) : input.active;
  const shardCount = input.deployment === 'shard' ? input.gpuCount : 1;
  const weightGiB = model.weightGiB / shardCount;
  const kvGiB = kvCacheGiB(model.layers, model.kvHeads, model.headDim, input.tokens, activePerDevice, input.kvBytes) / shardCount;
  const perDeviceGiB = weightGiB + kvGiB + input.reserveGiB + input.extraGiB;
  const remainingGiB = capacityGiB - perDeviceGiB;
  const oneRequestKv = kvCacheGiB(model.layers, model.kvHeads, model.headDim, input.tokens, 1, input.kvBytes) / shardCount;
  const perDeviceSlots = Math.max(0, Math.floor((capacityGiB - weightGiB - input.reserveGiB - input.extraGiB) / oneRequestKv));
  const unsupported = !model.multiGpu && input.gpuCount > 1 && input.deployment === 'shard';
  const status = !valid || !Number.isFinite(perDeviceGiB) ? 'invalid' : unsupported ? 'unsupported'
    : remainingGiB < 0 ? 'over' : input.deployment === 'shard' && input.gpuCount > 1 ? 'conditional'
    : remainingGiB < Math.max(2, capacityGiB * .1) ? 'tight' : 'fits';
  return { status, weightGiB, kvGiB, perDeviceGiB, totalGiB: perDeviceGiB * input.gpuCount,
    capacityGiB, remainingGiB, reserveGiB: input.reserveGiB, extraGiB: input.extraGiB, activePerDevice,
    maxActive: valid && !unsupported ? perDeviceSlots * (input.deployment === 'replicas' ? input.gpuCount : 1) : 0,
    capacityBasis: input.freeGiB === undefined ? 'nominal-class' : 'free-memory' };
}

export type HardwareScope = 'desktop' | 'server' | 'all';
export function recommendGpus(model: CapacityModel, input: CapacityInput, vendor = 'NVIDIA', scope: HardwareScope = 'desktop') {
  if (!Number.isSafeInteger(input.gpuCount) || input.gpuCount < 1 || input.gpuCount > 8) return [];
  // Free-memory readings describe the user's selected device, never a different candidate.
  const nominalInput = { ...input, freeGiB: undefined };
  const eligible = capacityGpus.filter(g => g.status === 'current' && (vendor === 'all' || g.vendor === vendor)
    && (scope === 'all' || scope === 'desktop' && ['consumer', 'workstation'].includes(g.gpuClass)
      || scope === 'server' && ['server-pcie', 'datacenter'].includes(g.gpuClass)));
  const candidates = [input.gpuCount, ...[2, 4, 8].filter(n => n > input.gpuCount)].flatMap(count => eligible.map(gpu => {
    const assessment = assessMemory(model, gpu, { ...nominalInput, gpuCount: count });
    return { gpu, count, assessment };
  })).filter(c => ['fits', 'conditional'].includes(c.assessment.status))
    .sort((a, b) => a.count - b.count || a.gpu.memoryGB - b.gpu.memoryGB || a.gpu.model.localeCompare(b.gpu.model));
  const seen = new Set<string>();
  return candidates.filter(c => !seen.has(c.gpu.id) && !!seen.add(c.gpu.id)).slice(0, 3);
}

export type DemandInput = { users: number; requestsPerMinute: number; calls: number; inputTokens: number; outputTokens: number; responseSeconds: number };
export function calculateDemand(d: DemandInput) {
  if (![d.users, d.requestsPerMinute, d.calls, d.inputTokens, d.outputTokens, d.responseSeconds].every(n => Number.isFinite(n) && n >= 0)
    || d.calls < 1 || !Number.isInteger(d.users)) return undefined;
  const userRequestsPerSecond = d.users * d.requestsPerMinute / 60;
  const callsPerSecond = userRequestsPerSecond * d.calls;
  return { userRequestsPerSecond, callsPerSecond, inputTokensPerSecond: callsPerSecond * d.inputTokens,
    outputTokensPerSecond: callsPerSecond * d.outputTokens, inFlight: userRequestsPerSecond * d.responseSeconds };
}
export function measuredPressure(demand: number, measuredCapacity: number) {
  return Number.isFinite(demand) && demand >= 0 && Number.isFinite(measuredCapacity) && measuredCapacity > 0 ? demand / measuredCapacity : undefined;
}
