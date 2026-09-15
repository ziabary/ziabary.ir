/**
 * Clearly synthetic, test-only repository. This module is never imported by
 * src/ and therefore cannot become content or a public route.
 */
import type { Datum, LlmGuideRepository, Money } from '../../src/lib/llm/schema';

const evidenceId = 'evidence:synthetic-direct' as const;
const derivedEvidenceId = 'evidence:synthetic-derived' as const;
const longArtifactRevision = 'synthetic-revision-with-an-intentionally-long-latin-identifier-for-responsive-interface-testing';
function k<T>(value: T): Datum<T>;
function k<T, Unit extends string>(value: T, unit: Unit): Datum<T, Unit>;
function k<T, Unit extends string>(value: T, unit?: Unit): Datum<T, Unit> {
  return { state: 'known', value, ...(unit ? { unit } : {}), evidenceIds: [evidenceId] };
}
const missing = <T, Unit extends string = never>(state: 'unknown' | 'not-measured' | 'not-applicable'): Datum<T, Unit> => ({ state });
const money = (amount: number, observedOn: string): Money => ({
  amount, currency: 'SYN', market: 'synthetic-market', observedOn, evidenceIds: [evidenceId]
});

export const syntheticLlmRepository: LlmGuideRepository = {
  evidence: [
    {
      id: evidenceId, url: 'https://example.invalid/synthetic/direct', title: 'شاهد کاملاً مصنوعی آزمون',
      organization: 'Synthetic Test Lab', accessedOn: '2026-09-15', versionRevisionOrCommit: 'test-only',
      locator: 'fixture.case.direct', kind: 'direct-measurement', sourceKind: 'primary',
      scope: 'فقط آزمون واحد؛ فاقد هرگونه ادعای واقعی'
    },
    {
      id: derivedEvidenceId, url: 'https://example.invalid/synthetic/derived', title: 'محاسبهٔ کاملاً مصنوعی آزمون',
      organization: 'Synthetic Test Lab', accessedOn: '2026-09-15', locator: 'fixture.case.derived',
      kind: 'calculated-from-specifications', sourceKind: 'primary', scope: 'فقط آزمون adapter',
      derivation: {
        method: 'synthetic multiplication',
        inputs: [{ field: 'fixtureInput', value: 2, unit: 'synthetic-unit', evidenceId, locator: 'fixture.case.direct.value' }],
        formulaOrProcedure: 'fixtureInput × 2', assumptions: ['ورودی فقط برای تست است'], rounding: 'بدون گردکردن'
      }
    }
  ],
  claims: [{
    id: 'claim:synthetic-total-parameters', subjectId: 'model:synthetic-generator', fieldPath: 'totalParametersB',
    value: 8, nature: 'publisher-report', scope: 'fixture test only', evidenceIds: [evidenceId]
  }],
  families: [{ id: 'family:synthetic', name: 'خانوادهٔ مصنوعی', publisher: 'ناشر مصنوعی', aliases: ['Synthetic'], evidenceIds: [evidenceId] }],
  models: [
    {
      id: 'model:synthetic-generator', familyId: 'family:synthetic', exactName: 'مدل مولد مصنوعی ۸B با عنوان فارسی بسیار بلند برای آزمون شکست سطر و خوانایی رابط در اندازه‌های مختلف',
      publisher: 'ناشر مصنوعی', version: 'test-1', aliases: ['SyntheticGen'], stage: 'instruct',
      architecture: 'dense', totalParametersB: k(8, 'billion-parameters'), activeParametersB: k(8, 'billion-parameters'),
      kind: 'generative', inputModalities: ['text'], outputModalities: ['text', 'structured-data'],
      applications: ['text-work', 'enterprise-rag'], languages: [{ language: 'fa-test', declared: k(true) }],
      persianEvidenceStatus: 'independently-evaluated', declaredContext: k(8192, 'token'), evaluatedContext: k(4096, 'token'),
      releaseStatus: 'available', releasedOn: '2026-01-01', lastReviewedOn: '2026-09-15',
      license: { name: k('Synthetic License'), url: k('https://example.invalid/license'), commercialUse: k('allowed'), evidenceIds: [evidenceId] },
      evidenceIds: [evidenceId]
    },
    {
      id: 'model:synthetic-embedder', familyId: 'family:synthetic', exactName: 'مدل embedding مصنوعی ۰٫۲B',
      publisher: 'ناشر مصنوعی', version: 'test-1', stage: 'base', architecture: 'dense',
      totalParametersB: k(0.2, 'billion-parameters'), activeParametersB: k(0.2, 'billion-parameters'),
      kind: 'embedding', inputModalities: ['text'], outputModalities: ['embedding'], applications: ['enterprise-rag'],
      languages: [{ language: 'fa-test', declared: k(true) }], persianEvidenceStatus: 'independently-evaluated',
      declaredContext: k(1024, 'token'), evaluatedContext: k(512, 'token'), releaseStatus: 'available',
      releasedOn: '2026-01-01', lastReviewedOn: '2026-09-15',
      license: { name: k('Synthetic License'), url: k('https://example.invalid/license'), commercialUse: k('allowed'), evidenceIds: [evidenceId] },
      evidenceIds: [evidenceId]
    }
  ],
  artifacts: [{
    id: 'artifact:synthetic-generator-q4', modelVersionId: 'model:synthetic-generator', baseRevision: 'model-rev-test',
    publisher: 'سازندهٔ artifact مصنوعی', repositoryUrl: 'https://example.invalid/model', repositoryRevision: longArtifactRevision,
    format: 'gguf', quantization: k({ method: 'synthetic-q4', weightPrecision: 'int4', activationPrecision: k('fp16') }),
    weightPrecision: 'int4', activationPrecision: k('fp16'), size: k(4, 'GiB'), authority: 'third-party',
    artifactQualityEvaluationIds: ['quality:synthetic-artifact'], evidenceIds: [evidenceId]
  }],
  qualityEvaluations: [{
    id: 'quality:synthetic-artifact', modelVersionId: 'model:synthetic-generator', modelRevision: 'model-rev-test',
    artifactId: 'artifact:synthetic-generator-q4', artifactRevision: longArtifactRevision, dataset: 'Synthetic Persian Set',
    datasetVersion: 'test-1', language: 'fa-test', applicationId: 'text-work', metric: 'synthetic-score', result: k(0.75),
    testedContext: k(512, 'token'), publishedOn: '2026-09-15', limitations: ['فقط fixture مصنوعی'], evidenceIds: [evidenceId]
  }],
  applicationAssessments: [{
    id: 'application-assessment:synthetic-text', modelVersionId: 'model:synthetic-generator', modelRevision: 'model-rev-test',
    artifactId: 'artifact:synthetic-generator-q4', applicationId: 'text-work', subapplicationId: 'summarization',
    basis: 'measured-success', outcome: k('meets'), language: 'fa-test', testedVersion: 'test-1',
    limitations: ['فقط دادهٔ مصنوعی'], qualityEvaluationId: 'quality:synthetic-artifact', evidenceIds: [evidenceId]
  }],
  softwareProducts: [
    { id: 'software-product:synthetic-engine-a', name: 'موتور مصنوعی A', officialUrl: 'https://example.invalid/a', taxonomyRoleHints: ['inference-engine-library', 'api-server'], evidenceIds: [evidenceId] },
    { id: 'software-product:synthetic-engine-b', name: 'موتور مصنوعی B', officialUrl: 'https://example.invalid/b', taxonomyRoleHints: ['inference-engine-library', 'api-server'], evidenceIds: [evidenceId] },
    { id: 'software-product:synthetic-gateway', name: 'Gateway مصنوعی', officialUrl: 'https://example.invalid/gateway', taxonomyRoleHints: ['gateway'], evidenceIds: [evidenceId] }
  ],
  softwareReleases: [
    {
      id: 'software-release:synthetic-engine-a-v1', productId: 'software-product:synthetic-engine-a', version: '1.0-test',
      lastReviewedOn: '2026-09-15', roles: ['inference-engine-library', 'api-server'], environments: ['server', 'container'],
      operatingSystems: ['Synthetic Linux'], hardwareKinds: ['Synthetic GPU'], localOrCloud: ['local'], offlineOperation: k(true),
      license: { name: k('Synthetic OSS'), url: k('https://example.invalid/a/license'), commercialUse: k('allowed'), evidenceIds: [evidenceId] },
      maintenanceStatus: 'active', evidenceIds: [evidenceId]
    },
    {
      id: 'software-release:synthetic-engine-b-v1', productId: 'software-product:synthetic-engine-b', version: '1.0-test',
      lastReviewedOn: '2026-09-15', roles: ['inference-engine-library', 'api-server'], environments: ['server', 'container'],
      operatingSystems: ['Synthetic Linux'], hardwareKinds: ['Synthetic GPU'], localOrCloud: ['local'], offlineOperation: k(true),
      license: { name: k('Synthetic OSS'), url: k('https://example.invalid/b/license'), commercialUse: k('allowed'), evidenceIds: [evidenceId] },
      maintenanceStatus: 'active', evidenceIds: [evidenceId]
    },
    {
      id: 'software-release:synthetic-gateway-v1', productId: 'software-product:synthetic-gateway', version: '1.0-test',
      lastReviewedOn: '2026-09-15', roles: ['gateway'], environments: ['server', 'container'],
      operatingSystems: ['Synthetic Linux'], hardwareKinds: ['CPU'], localOrCloud: ['local'], offlineOperation: k(true),
      license: { name: k('Synthetic OSS'), url: k('https://example.invalid/g/license'), commercialUse: k('allowed'), evidenceIds: [evidenceId] },
      maintenanceStatus: 'active', evidenceIds: [evidenceId]
    }
  ],
  engines: [
    { id: 'engine:synthetic-a-v1', name: 'Backend مصنوعی A', version: '1.0-test', url: 'https://example.invalid/backend-a', evidenceIds: [evidenceId] },
    { id: 'engine:synthetic-b-v1', name: 'Backend مصنوعی B', version: '1.0-test', url: 'https://example.invalid/backend-b', evidenceIds: [evidenceId] }
  ],
  servingStacks: [
    {
      id: 'serving-stack:synthetic-a', name: 'Stack مصنوعی Gateway + A', environment: { operatingSystem: 'Synthetic Linux' },
      effectiveSettings: { timeoutMs: 1000 }, evidenceIds: [evidenceId], components: [
        { id: 'gateway', softwareReleaseId: 'software-release:synthetic-gateway-v1', roles: ['gateway'], connectsToComponentIds: ['server'], effectiveSettings: { rateLimit: 10 }, evidenceIds: [evidenceId] },
        { id: 'server', softwareReleaseId: 'software-release:synthetic-engine-a-v1', roles: ['inference-engine-library', 'api-server'], backendEngineId: 'engine:synthetic-a-v1', effectiveSettings: { batch: 2 }, evidenceIds: [evidenceId] }
      ]
    },
    {
      id: 'serving-stack:synthetic-b', name: 'Stack مصنوعی Gateway + B', environment: { operatingSystem: 'Synthetic Linux' },
      effectiveSettings: { timeoutMs: 1000 }, evidenceIds: [evidenceId], components: [
        { id: 'gateway', softwareReleaseId: 'software-release:synthetic-gateway-v1', roles: ['gateway'], connectsToComponentIds: ['server'], effectiveSettings: { rateLimit: 10 }, evidenceIds: [evidenceId] },
        { id: 'server', softwareReleaseId: 'software-release:synthetic-engine-b-v1', roles: ['inference-engine-library', 'api-server'], backendEngineId: 'engine:synthetic-b-v1', effectiveSettings: { batch: 2 }, evidenceIds: [evidenceId] }
      ]
    }
  ],
  softwareCapabilities: [
    {
      id: 'software-capability:synthetic-a-batching', capability: 'continuous-batching', status: 'supported', provision: 'native',
      scope: { softwareReleaseId: 'software-release:synthetic-engine-a-v1', backendEngineId: 'engine:synthetic-a-v1', modelVersionIds: ['model:synthetic-generator'], artifactIds: ['artifact:synthetic-generator-q4'], conditions: ['test batch=2'] },
      limitations: ['fixture only'], evidenceIds: [evidenceId]
    },
    {
      id: 'software-capability:synthetic-b-batching', capability: 'continuous-batching', status: 'conditional', provision: 'plugin',
      scope: { softwareReleaseId: 'software-release:synthetic-engine-b-v1', backendEngineId: 'engine:synthetic-b-v1', modelVersionIds: ['model:synthetic-generator'], conditions: ['synthetic plugin enabled'] },
      limitations: ['fixture only'], evidenceIds: [evidenceId]
    },
    {
      id: 'software-capability:synthetic-gateway-auth', capability: 'authentication', status: 'supported', provision: 'native',
      scope: { softwareReleaseId: 'software-release:synthetic-gateway-v1', endpoints: ['/synthetic/chat'], conditions: [] },
      evidenceIds: [evidenceId]
    },
    {
      id: 'software-capability:synthetic-b-tool-use-unreviewed', capability: 'tool-use', status: 'not-reviewed', provision: 'not-applicable',
      scope: { softwareReleaseId: 'software-release:synthetic-engine-b-v1', backendEngineId: 'engine:synthetic-b-v1', conditions: [] },
      evidenceIds: []
    },
    {
      id: 'software-capability:synthetic-gateway-speculative-na', capability: 'speculative-decoding', status: 'not-applicable', provision: 'not-applicable',
      scope: { softwareReleaseId: 'software-release:synthetic-gateway-v1', conditions: [] },
      statusReason: 'این gateway مصنوعی عملیات decoding را انجام نمی‌دهد.', evidenceIds: []
    }
  ],
  apiCompatibility: [
    {
      id: 'api-compatibility:synthetic-a-chat', protocol: 'SyntheticAI', endpoint: '/synthetic/chat', capability: 'chat-streaming',
      status: 'conditional', provision: 'native',
      scope: { softwareReleaseId: 'software-release:synthetic-engine-a-v1', backendEngineId: 'engine:synthetic-a-v1', modelVersionIds: ['model:synthetic-generator'], endpoints: ['/synthetic/chat'], messageFormat: 'synthetic-message-v1', parser: 'synthetic-parser-v1', conditions: ['stream=true'] },
      limitations: ['fixture only'], evidenceIds: [evidenceId]
    },
    {
      id: 'api-compatibility:synthetic-b-chat-unreviewed', protocol: 'SyntheticAI', endpoint: '/synthetic/chat', capability: 'chat-streaming',
      status: 'not-reviewed', provision: 'not-applicable',
      scope: { softwareReleaseId: 'software-release:synthetic-engine-b-v1', backendEngineId: 'engine:synthetic-b-v1', endpoints: ['/synthetic/chat'], conditions: [] },
      evidenceIds: []
    }
  ],
  hardwareConfigurations: [
    {
      id: 'hardware:synthetic-gpu-a', name: 'GPU مصنوعی A', gpuRecordId: 'nvidia-rtx3090', gpuSku: 'test-a', deploymentForm: 'test', gpuCount: 1,
      vramPerGpu: k(24, 'GiB'), aggregateVram: k(24, 'GiB'), topology: k('single'), cpu: k('Synthetic CPU'), ram: k(64, 'GiB'),
      storageCapacity: k(100, 'GiB'), storageType: k('Synthetic SSD'), storageReadSpeed: k(5, 'GB/s'),
      systemPower: k(500, 'W'), gpuTdpPerCard: k(350, 'W'), evidenceIds: [evidenceId]
    },
    {
      id: 'hardware:synthetic-gpu-b', name: 'GPU مصنوعی B', gpuRecordId: 'nvidia-rtx4090', gpuSku: 'test-b', deploymentForm: 'test', gpuCount: 1,
      vramPerGpu: k(24, 'GiB'), aggregateVram: k(24, 'GiB'), topology: k('single'), cpu: k('Synthetic CPU'), ram: k(64, 'GiB'),
      storageCapacity: k(100, 'GiB'), storageType: k('Synthetic SSD'), storageReadSpeed: k(5, 'GB/s'),
      systemPower: k(550, 'W'), gpuTdpPerCard: k(400, 'W'), evidenceIds: [evidenceId]
    }
  ],
  workloads: [{
    id: 'workload:synthetic-chat', name: 'بار کاری گفت‌وگوی مصنوعی', applicationId: 'text-work', subapplicationId: 'summarization', language: 'fa-test',
    inputLength: k({ mean: 256, p95: 512 }, 'token'), outputLength: k({ mean: 64, p95: 128 }, 'token'),
    contextLength: k(1024, 'token'), batchSize: k(2), concurrency: k(4), registeredUsers: k(1000), arrivalRate: k(2, 'request/s'),
    reasoningMode: k('off'), reasoningBudget: missing('not-applicable'), qualityFloor: { metric: 'synthetic-score', minimum: 0.7, unit: 'score', evaluationId: 'quality:synthetic-artifact' },
    serviceLevel: { ttft: k(500, 'ms') }, evidenceIds: [evidenceId]
  }],
  deploymentConfigurations: [
    {
      id: 'deployment:synthetic-a-hardware-a', modelVersionId: 'model:synthetic-generator', modelRevision: 'model-rev-test',
      artifactId: 'artifact:synthetic-generator-q4', servingStackId: 'serving-stack:synthetic-a', backendEngineId: 'engine:synthetic-a-v1',
      method: 'full-gpu', weightQuantization: k('synthetic-q4'), parallelism: 'none', kvCachePrecision: k('fp16'),
      contextLength: k(1024, 'token'), batchSize: k(2), concurrency: k(4), offloadAllowed: false,
      hardwareConfigId: 'hardware:synthetic-gpu-a', workloadId: 'workload:synthetic-chat', effectiveSettings: { temperature: 0 }, evidenceIds: [evidenceId]
    },
    {
      id: 'deployment:synthetic-b-hardware-a', modelVersionId: 'model:synthetic-generator', modelRevision: 'model-rev-test',
      artifactId: 'artifact:synthetic-generator-q4', servingStackId: 'serving-stack:synthetic-b', backendEngineId: 'engine:synthetic-b-v1',
      method: 'full-gpu', weightQuantization: k('synthetic-q4'), parallelism: 'none', kvCachePrecision: k('fp16'),
      contextLength: k(1024, 'token'), batchSize: k(2), concurrency: k(4), offloadAllowed: false,
      hardwareConfigId: 'hardware:synthetic-gpu-a', workloadId: 'workload:synthetic-chat', effectiveSettings: { temperature: 0 }, evidenceIds: [evidenceId]
    },
    {
      id: 'deployment:synthetic-a-hardware-b', modelVersionId: 'model:synthetic-generator', modelRevision: 'model-rev-test',
      artifactId: 'artifact:synthetic-generator-q4', servingStackId: 'serving-stack:synthetic-a', backendEngineId: 'engine:synthetic-a-v1',
      method: 'full-gpu', weightQuantization: k('synthetic-q4'), parallelism: 'none', kvCachePrecision: k('fp16'),
      contextLength: k(1024, 'token'), batchSize: k(2), concurrency: k(4), offloadAllowed: false,
      hardwareConfigId: 'hardware:synthetic-gpu-b', workloadId: 'workload:synthetic-chat', effectiveSettings: { temperature: 0 }, evidenceIds: [evidenceId]
    },
    {
      id: 'deployment:synthetic-a-hardware-b-offload', modelVersionId: 'model:synthetic-generator', modelRevision: 'model-rev-test',
      artifactId: 'artifact:synthetic-generator-q4', servingStackId: 'serving-stack:synthetic-a', backendEngineId: 'engine:synthetic-a-v1',
      method: 'cpu-gpu-offload', weightQuantization: k('synthetic-q4'), parallelism: 'none', kvCachePrecision: k('fp16'),
      contextLength: k(1024, 'token'), batchSize: k(2), concurrency: k(4), offloadAllowed: true,
      hardwareConfigId: 'hardware:synthetic-gpu-b', workloadId: 'workload:synthetic-chat', effectiveSettings: { temperature: 0 }, evidenceIds: [evidenceId]
    }
  ],
  executionFeasibility: [
    { id: 'feasibility:synthetic-a-ha', deploymentConfigId: 'deployment:synthetic-a-hardware-a', status: 'full-gpu', peakVram: k(7, 'GiB'), peakRam: k(4, 'GiB'), checkpointStorage: k(4, 'GiB'), additionalStorage: k(0, 'GiB'), peakTemporaryStorage: k(0, 'GiB'), evidenceIds: [evidenceId] },
    { id: 'feasibility:synthetic-a-ha-repeat', deploymentConfigId: 'deployment:synthetic-a-hardware-a', status: 'hybrid', peakVram: k(6.5, 'GiB'), peakRam: k(5, 'GiB'), checkpointStorage: k(4, 'GiB'), additionalStorage: k(0, 'GiB'), peakTemporaryStorage: k(0, 'GiB'), limitation: 'نتیجهٔ تکراری مستقل برای آزمون عدم overwrite', evidenceIds: [evidenceId] },
    { id: 'feasibility:synthetic-b-ha', deploymentConfigId: 'deployment:synthetic-b-hardware-a', status: 'full-gpu', peakVram: k(7, 'GiB'), peakRam: k(4, 'GiB'), checkpointStorage: k(4, 'GiB'), additionalStorage: missing('not-applicable'), peakTemporaryStorage: missing('not-measured'), evidenceIds: [evidenceId] },
    { id: 'feasibility:synthetic-a-hb', deploymentConfigId: 'deployment:synthetic-a-hardware-b', status: 'full-gpu', peakVram: k(7, 'GiB'), peakRam: k(4, 'GiB'), checkpointStorage: k(4, 'GiB'), additionalStorage: missing('unknown'), peakTemporaryStorage: k(0, 'GiB'), evidenceIds: [evidenceId] },
    { id: 'feasibility:synthetic-a-hb-offload', deploymentConfigId: 'deployment:synthetic-a-hardware-b-offload', status: 'hybrid', peakVram: k(5, 'GiB'), peakRam: k(12, 'GiB'), checkpointStorage: k(4, 'GiB'), additionalStorage: missing('not-applicable'), peakTemporaryStorage: k(0, 'GiB'), limitation: 'روش اجرای متفاوت؛ باید ردیف جدا باشد', evidenceIds: [evidenceId] }
  ],
  deploymentCompatibility: [
    { id: 'deployment-compatibility:synthetic-a-ha', deploymentConfigId: 'deployment:synthetic-a-hardware-a', status: 'supported', provision: 'native', conditions: ['fixture only'], evidenceIds: [evidenceId] },
    { id: 'deployment-compatibility:synthetic-b-ha', deploymentConfigId: 'deployment:synthetic-b-hardware-a', status: 'conditional', provision: 'plugin', conditions: ['fixture plugin'], limitations: ['not production'], evidenceIds: [evidenceId] },
    { id: 'deployment-compatibility:synthetic-a-hb', deploymentConfigId: 'deployment:synthetic-a-hardware-b', status: 'supported', provision: 'native', conditions: ['fixture only'], evidenceIds: [evidenceId] }
  ],
  benchmarkRuns: [
    ...(['a-hardware-a', 'b-hardware-a', 'a-hardware-b'] as const).map((suffix, index) => ({
      id: `benchmark:synthetic-${suffix}` as const,
      deploymentConfigId: `deployment:synthetic-${suffix}` as const,
      softwareEnvironment: { operatingSystem: 'Synthetic Linux' }, dataset: 'Synthetic Load', language: 'fa-test',
      inputLength: k({ mean: 256 }, 'token'), outputLength: k({ mean: 64 }, 'token'), contextLength: k(1024, 'token'),
      batchSize: k(2), concurrency: k(4), arrivalRate: k(2, 'request/s'), reasoningMode: k('off' as const), reasoningBudget: missing<number, 'token'>('not-applicable'),
      prefixCaching: k(false), speculativeDecoding: k(false), effectiveSettings: { temperature: 0 },
      ttft: [{ value: k(100 + index * 20, 'ms'), statistic: 'median' as const, sampleCount: 10, evidenceIds: [evidenceId] }],
      tpotOrItl: [{ value: k(10 + index, 'ms/token'), statistic: 'median' as const, sampleCount: 10, evidenceIds: [evidenceId] }],
      totalLatency: [{ value: k(1 + index / 10, 's'), statistic: 'median' as const, sampleCount: 10, evidenceIds: [evidenceId] }],
      perRequestThroughput: [{ value: k(50 - index, 'output-token/s/request'), statistic: 'median' as const, sampleCount: 10, evidenceIds: [evidenceId] }],
      aggregateThroughput: [{ value: k(100 - index, 'output-token/s/aggregate'), statistic: 'median' as const, sampleCount: 10, evidenceIds: [evidenceId] }],
      goodput: k(1.9, 'request/s'), serviceLevelObjective: { ttft: k(500, 'ms') }, errors: 0, timeouts: 0, successfulRequests: 10,
      peakVram: k(7, 'GiB'), peakRam: k(4, 'GiB'), energy: missing<number, 'J'>('not-measured'), warmup: k('1 request'),
      coldStart: k(2, 's'), steadyStateDuration: k(60, 's'), repetitions: k(3), qualityEvaluationId: 'quality:synthetic-artifact' as const,
      testedOn: '2026-09-15', publisher: 'Synthetic Test Lab', rawOutputUrl: k(`https://example.invalid/raw/${suffix}`), evidenceIds: [evidenceId]
    }))
  ],
  costScenarios: [
    ...(['a-hardware-a', 'b-hardware-a'] as const).map((suffix, index) => ({
      id: `cost:synthetic-${suffix}` as const, name: `سناریوی هزینهٔ مصنوعی ${index + 1}`, deploymentConfigId: `deployment:synthetic-${suffix}` as const,
      acquisitionMode: index ? 'rent' as const : 'purchase' as const,
      qualityFloor: { metric: 'synthetic-score', minimum: 0.7, unit: 'score', evaluationId: 'quality:synthetic-artifact' as const },
      latencyTargets: { ttft: k(500, 'ms') }, traffic: k(1000, 'request/month'), operatingHours: k(160, 'h/month'),
      calculationBasisDate: '2026-09-01', priceInputs: [money(100 + index * 10, index ? '2026-08-20' : '2026-08-10')],
      softwareLifecycleCosts: { initialSetup: k(money(10, '2026-08-10')), modelPreparation: k(money(2, '2026-08-10')), modelLoadOperations: k(money(1, '2026-08-10')), ongoingMaintenance: k(money(5, '2026-08-10')), supportingResources: k(money(3, '2026-08-10')) },
      totalSystemCost: k(money(121 + index * 10, '2026-08-10')), operatingCost: k(money(8, '2026-08-10')),
      utilization: k(50, 'percent'), redundancy: k('none'), calculationPeriod: k(1, 'month'),
      licenseCost: { state: 'excluded-not-free' as const, note: 'fixture assumption', evidenceIds: [evidenceId] },
      acceptedRequestCost: k(money(0.1 + index * 0.01, '2026-08-10')), tokenCost: missing<Money>('not-measured'), tokenCostDefinition: 'synthetic accepted output token',
      tco: k(money(129 + index * 10, '2026-08-10')), breakEvenPoint: missing<number, 'request'>('not-measured'), evidenceIds: [evidenceId, derivedEvidenceId]
    }))
  ],
  specializedAssessments: [{
    id: 'specialized-assessment:synthetic-embedding', modelVersionId: 'model:synthetic-embedder', modelRevision: 'embed-rev-test',
    kind: 'embedding', applicationId: 'enterprise-rag', metricName: 'synthetic-retrieval-score', metricValue: k(0.8),
    metricUnit: 'synthetic-score', workloadId: 'workload:synthetic-chat', limitations: ['fixture only'], evidenceIds: [evidenceId]
  }]
};
