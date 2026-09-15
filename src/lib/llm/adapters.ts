import { applications, guideParameterBands } from './guide';
import type {
  Datum,
  DeploymentConfiguration,
  EvidenceId,
  LlmGuideRepository,
  MemoryUnit,
  ModelVersion,
  SoftwareCapability
} from './schema';
import type { LlmMatrixCell, LlmMatrixCellResult, LlmViewId, LlmViewRow, ViewValue } from './views';

const numbers = new Intl.NumberFormat('fa-IR', { maximumFractionDigits: 3 });
const unknown = (reason: 'unknown' | 'not-measured' | 'not-applicable' = 'unknown', note?: string): ViewValue => ({
  state: reason,
  ...(note ? { note } : {})
});
const known = (
  display: string,
  raw?: string | number | boolean,
  canonicalNumber?: number,
  canonicalUnit?: string,
  evidenceIds?: readonly string[]
): ViewValue => ({
  state: 'known', display,
  ...(raw !== undefined ? { raw } : {}),
  ...(canonicalNumber !== undefined ? { canonicalNumber } : {}),
  ...(canonicalUnit ? { canonicalUnit } : {}),
  ...(evidenceIds?.length ? { evidenceIds: [...evidenceIds] } : {})
});
const viewText = (value: ViewValue) => value.state === 'known'
  ? value.display
  : value.state === 'not-measured'
    ? 'اندازه‌گیری نشده'
    : value.state === 'not-applicable'
      ? 'قابل‌اعمال نیست'
      : 'نامعلوم';

function datum<T, Unit extends string>(
  value: Datum<T, Unit> | undefined,
  format: (item: T, unit?: Unit) => string = (item, unit) => `${String(item)}${unit ? ` ${unit}` : ''}`,
  canonical?: (item: T, unit?: Unit) => { number: number; unit: string } | undefined
): ViewValue {
  if (!value || value.state !== 'known') return unknown(value?.state ?? 'unknown', value?.note);
  const converted = canonical?.(value.value, value.unit);
  const raw = typeof value.value === 'string' || typeof value.value === 'number' || typeof value.value === 'boolean'
    ? value.value
    : format(value.value, value.unit);
  return known(format(value.value, value.unit), raw, converted?.number, converted?.unit, value.evidenceIds);
}

function list(items: Array<string | undefined>, evidenceIds?: readonly string[]) {
  const values = items.filter((item): item is string => Boolean(item));
  return values.length ? known(values.join('، '), values.join('|'), undefined, undefined, evidenceIds) : unknown();
}

function idList(ids: readonly string[]) {
  return ids.length ? known(ids.join('، '), ids.join('|'), undefined, undefined, ids) : unknown();
}

function memoryToGiB(value: number, unit?: MemoryUnit) {
  const factors: Partial<Record<MemoryUnit, number>> = {
    MB: 1e6 / 2 ** 30, MiB: 1 / 1024, GB: 1e9 / 2 ** 30, GiB: 1, TB: 1e12 / 2 ** 30, TiB: 1024
  };
  const factor = unit ? factors[unit] : undefined;
  return factor === undefined ? undefined : { number: value * factor, unit: 'GiB' };
}

function modelSizeBand(model: ModelVersion) {
  if (model.totalParametersB.state !== 'known') return unknown(model.totalParametersB.state);
  const value = model.totalParametersB.value;
  const band = guideParameterBands.find((item) => value >= item.minInclusive && (item.maxExclusive === null || value < item.maxExclusive));
  return band ? known(band.label, band.id) : unknown();
}

function evidenceKinds(repository: LlmGuideRepository, evidenceIds: readonly EvidenceId[]) {
  const values = evidenceIds.map((id) => repository.evidence.find((item) => item.id === id)?.kind).filter((item): item is NonNullable<typeof item> => Boolean(item));
  return values.length ? values.map((value) => known(value, value)) : [unknown()];
}

function baseComparison(dimensions: Record<string, ViewValue>, limitations: string[] = [], complete = true) {
  return {
    dimensions,
    calculation: complete
      ? { status: 'ready' as const }
      : { status: 'needs-more-data' as const, reason: 'یک یا چند ورودی مقایسه ثبت نشده است.' },
    limitations
  };
}

function formatParameter(value: Datum<number, 'billion-parameters'>) {
  return datum(value, (number) => `${numbers.format(number)}B`, (number) => ({ number, unit: 'B' }));
}

function formatToken(value: Datum<number, 'token'>) {
  return datum(value, (number) => `${numbers.format(number)} توکن`, (number) => ({ number, unit: 'token' }));
}

function formatMemory(value: Datum<number, MemoryUnit>) {
  return datum(value, (number, unit) => `${numbers.format(number)} ${unit ?? ''}`, memoryToGiB);
}

function formatGenericNumber<Unit extends string>(value: Datum<number, Unit>, fallbackUnit?: string) {
  return datum(value, (number, unit) => `${numbers.format(number)}${unit || fallbackUnit ? ` ${unit ?? fallbackUnit}` : ''}`,
    (number, unit) => ({ number, unit: unit ?? fallbackUnit ?? 'number' }));
}

function formatMoneyValue(value: Datum<{ amount: number; currency: string; market: string; observedOn: string; evidenceIds: EvidenceId[] }>) {
  return datum(value, (money) => `${numbers.format(money.amount)} ${money.currency}`,
    (money) => ({ number: money.amount, unit: money.currency }));
}

function applicationLabel(id: string) {
  return applications.find((item) => item.id === id)?.label ?? id;
}

export function adaptModelCatalog(repository: LlmGuideRepository): LlmViewRow[] {
  return repository.models.map((model) => {
    const family = repository.families.find((item) => item.id === model.familyId);
    const total = formatParameter(model.totalParametersB);
    const active = formatParameter(model.activeParametersB);
    const evidenceIds = [...new Set([...(family?.evidenceIds ?? []), ...model.evidenceIds])];
    return {
      id: model.id,
      label: model.exactName,
      searchText: [model.id, model.exactName, model.version, model.publisher, family?.name, ...(model.aliases ?? [])].join(' '),
      cells: {
        model: known(`${model.exactName} · ${model.id}`, model.id, undefined, undefined, model.evidenceIds),
        'family-publisher': known(`${family?.name ?? 'نامعلوم'} · ${model.publisher}`, family?.name ?? model.publisher, undefined, undefined, evidenceIds),
        'kind-stage': known(`${model.kind} · ${model.stage}`, `${model.kind}|${model.stage}`, undefined, undefined, model.evidenceIds),
        parameters: known(`کل: ${total.state === 'known' ? total.display : 'نامعلوم'} · فعال: ${active.state === 'known' ? active.display : 'نامعلوم'}`, undefined,
          total.state === 'known' ? total.canonicalNumber : undefined, 'B', model.evidenceIds),
        architecture: known(model.architecture, model.architecture, undefined, undefined, model.evidenceIds),
        context: known(`اعلام: ${viewText(formatToken(model.declaredContext))} · ارزیابی: ${viewText(formatToken(model.evaluatedContext))}`, undefined,
          model.evaluatedContext.state === 'known' ? model.evaluatedContext.value : model.declaredContext.state === 'known' ? model.declaredContext.value : undefined,
          'token', model.evidenceIds),
        review: known(`${model.releaseStatus} · ${model.lastReviewedOn}`, model.lastReviewedOn, undefined, undefined, model.evidenceIds)
      },
      facets: {
        family: known(family?.name ?? model.familyId, family?.name ?? model.familyId),
        publisher: known(model.publisher, model.publisher), 'model-kind': known(model.kind, model.kind),
        'model-stage': known(model.stage, model.stage), 'total-parameters': total, 'active-parameters': active,
        'size-band': modelSizeBand(model), architecture: known(model.architecture, model.architecture),
        'input-modality': model.inputModalities.map((value) => known(value, value)),
        'output-modality': model.outputModalities.map((value) => known(value, value)),
        application: model.applications.map((value) => known(applicationLabel(value), value)),
        language: model.languages.map((value) => known(value.language, value.language)),
        'persian-evidence': known(model.persianEvidenceStatus, model.persianEvidenceStatus),
        'context-length': model.evaluatedContext.state === 'known' ? formatToken(model.evaluatedContext) : formatToken(model.declaredContext),
        license: datum(model.license.name), 'review-status': known(model.releaseStatus, model.releaseStatus),
        'last-reviewed': known(model.lastReviewedOn, model.lastReviewedOn)
      },
      details: {
        lineage: list([model.baseModelId ? `پایه: ${model.baseModelId}` : undefined, model.distilledFromModelId ? `distilled از: ${model.distilledFromModelId}` : undefined]),
        modalities: known(`ورودی: ${model.inputModalities.join('، ')} · خروجی: ${model.outputModalities.join('، ')}`),
        applications: list(model.applications.map(applicationLabel)),
        languages: list(model.languages.map((language) => `${language.language}: ${language.declared.state}`)),
        license: datum(model.license.name), dates: list([model.announcedOn, model.releasedOn, model.lastReviewedOn]),
        sources: idList(evidenceIds)
      },
      sourceIds: evidenceIds,
      comparison: baseComparison({
        model: known(model.id, model.id), 'model-kind': known(model.kind, model.kind), stage: known(model.stage, model.stage),
        metric: known('total-parameters', 'total-parameters'), unit: known('B', 'B'),
        need: unknown(), workload: unknown(), 'quality-floor': unknown(), 'latency-target': unknown()
      }, [], total.state === 'known')
    };
  });
}

export function adaptModelSuitability(repository: LlmGuideRepository): LlmViewRow[] {
  const groups = new Map<string, typeof repository.applicationAssessments>();
  for (const assessment of repository.applicationAssessments) {
    const key = `${assessment.modelVersionId}|${assessment.modelRevision}|${assessment.artifactId ?? ''}`;
    groups.set(key, [...(groups.get(key) ?? []), assessment]);
  }
  return [...groups.entries()].map(([key, assessments]) => {
    const first = assessments[0];
    const model = repository.models.find((item) => item.id === first.modelVersionId);
    const artifact = first.artifactId ? repository.artifacts.find((item) => item.id === first.artifactId) : undefined;
    const allEvidence = [...new Set(assessments.flatMap((item) => item.evidenceIds))];
    const matrixCells: Record<string, LlmMatrixCell> = {};
    for (const application of applications) {
      const matches = assessments.filter((item) => item.applicationId === application.id);
      if (!matches.length) {
        matrixCells[application.id] = { value: unknown('not-measured') };
        continue;
      }
      const item = matches[0];
      matrixCells[application.id] = {
        value: datum(item.outcome, (value) => `${item.basis} · ${value}`),
        details: [
          { label: 'نوع ارزیابی', value: known(item.basis, item.basis, undefined, undefined, item.evidenceIds) },
          { label: 'زبان', value: item.language ? known(item.language, item.language) : unknown() },
          { label: 'نسخهٔ آزمون', value: item.testedVersion ? known(item.testedVersion, item.testedVersion) : unknown() },
          { label: 'محدودیت', value: list(item.limitations ?? []) }
        ],
        sourceIds: item.evidenceIds
      };
    }
    const total = model ? formatParameter(model.totalParametersB) : unknown();
    return {
      id: `suitability:${key}`, label: `${model?.exactName ?? first.modelVersionId}${artifact ? ` · ${artifact.id}` : ''}`,
      searchText: `${key} ${model?.exactName ?? ''} ${artifact?.repositoryRevision ?? ''}`,
      cells: {
        'model-artifact': known(`${model?.exactName ?? first.modelVersionId}${artifact ? ` · ${artifact.id}` : ''}`),
        'evaluation-version': known(first.modelRevision, first.modelRevision)
      },
      matrixCells,
      facets: {
        application: assessments.map((item) => known(applicationLabel(item.applicationId), item.applicationId)),
        'assessment-basis': assessments.map((item) => known(item.basis, item.basis)),
        'total-parameters': total, 'model-kind': model ? known(model.kind, model.kind) : unknown(),
        subapplication: assessments.map((item) => item.subapplicationId ? known(item.subapplicationId, item.subapplicationId) : unknown()),
        language: assessments.map((item) => item.language ? known(item.language, item.language) : unknown()),
        'tested-version': assessments.map((item) => item.testedVersion ? known(item.testedVersion, item.testedVersion) : unknown()),
        'evidence-kind': evidenceKinds(repository, allEvidence)
      },
      details: {
        'assessment-basis': list(assessments.map((item) => item.basis)),
        subapplication: list(assessments.map((item) => item.subapplicationId)),
        language: list(assessments.map((item) => item.language)),
        'quality-evaluation': list(assessments.map((item) => item.qualityEvaluationId)),
        limitations: list(assessments.flatMap((item) => item.limitations ?? [])), sources: idList(allEvidence)
      },
      sourceIds: allEvidence,
      comparison: baseComparison({
        model: known(key, key), application: assessments.length === 1 ? known(first.applicationId, first.applicationId) : unknown(),
        language: first.language ? known(first.language, first.language) : unknown(), dataset: first.qualityEvaluationId ? known(first.qualityEvaluationId, first.qualityEvaluationId) : unknown(),
        'test-version': first.testedVersion ? known(first.testedVersion, first.testedVersion) : unknown(),
        metric: first.qualityEvaluationId ? known('quality-evaluation', 'quality-evaluation') : unknown(), unit: unknown(),
        need: known(first.applicationId, first.applicationId), workload: unknown(), 'quality-floor': unknown(), 'latency-target': unknown()
      }, assessments.flatMap((item) => item.limitations ?? []), Boolean(first.testedVersion && first.qualityEvaluationId))
    };
  });
}

function deploymentContext(repository: LlmGuideRepository, deploymentId: string) {
  const deployment = repository.deploymentConfigurations.find((item) => item.id === deploymentId);
  if (!deployment) return undefined;
  return {
    deployment,
    model: repository.models.find((item) => item.id === deployment.modelVersionId),
    artifact: repository.artifacts.find((item) => item.id === deployment.artifactId),
    stack: repository.servingStacks.find((item) => item.id === deployment.servingStackId),
    engine: repository.engines.find((item) => item.id === deployment.backendEngineId),
    hardware: repository.hardwareConfigurations.find((item) => item.id === deployment.hardwareConfigId),
    workload: repository.workloads.find((item) => item.id === deployment.workloadId)
  };
}

function hardwareTargetId(gpuRecordId: string | undefined, gpuCount: number) {
  if (gpuCount > 1) return 'multi-gpu';
  return gpuRecordId ?? 'cpu-ram';
}

function stableJson(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(stableJson).join(',')}]`;
  if (value && typeof value === 'object') {
    return `{${Object.entries(value).sort(([left], [right]) => left.localeCompare(right, 'en')).map(([key, item]) => `${JSON.stringify(key)}:${stableJson(item)}`).join(',')}}`;
  }
  return JSON.stringify(value) ?? 'undefined';
}

/**
 * Hardware is deliberately absent from this key. Every remaining effective
 * deployment condition is present, so only like-for-like hardware variants
 * share a matrix row.
 */
export function hardwareFeasibilityGroupKey(deployment: DeploymentConfiguration) {
  return stableJson({
    modelVersionId: deployment.modelVersionId,
    modelRevision: deployment.modelRevision,
    artifactId: deployment.artifactId,
    servingStackId: deployment.servingStackId,
    backendEngineId: deployment.backendEngineId,
    method: deployment.method,
    weightQuantization: deployment.weightQuantization,
    kvCachePrecision: deployment.kvCachePrecision,
    parallelism: deployment.parallelism,
    contextLength: deployment.contextLength,
    batchSize: deployment.batchSize,
    concurrency: deployment.concurrency,
    offloadAllowed: deployment.offloadAllowed,
    workloadId: deployment.workloadId,
    effectiveSettings: deployment.effectiveSettings
  });
}

function shortStableKey(value: string) {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(36);
}

export function adaptHardwareFeasibility(repository: LlmGuideRepository): LlmViewRow[] {
  const groups = new Map<string, Array<{
    result: LlmGuideRepository['executionFeasibility'][number];
    context: NonNullable<ReturnType<typeof deploymentContext>>;
    target: string;
    evidenceIds: EvidenceId[];
  }>>();
  for (const result of repository.executionFeasibility) {
    const context = deploymentContext(repository, result.deploymentConfigId);
    if (!context) continue;
    const hardware = context.hardware;
    const target = hardwareTargetId(hardware?.gpuRecordId, hardware?.gpuCount ?? 0);
    const evidenceIds = [...new Set([...context.deployment.evidenceIds, ...result.evidenceIds])];
    const key = hardwareFeasibilityGroupKey(context.deployment);
    groups.set(key, [...(groups.get(key) ?? []), { result, context, target, evidenceIds }]);
  }

  return [...groups.entries()].map(([groupKey, entries]): LlmViewRow => {
    const first = entries[0];
    const { deployment, model, artifact, stack, engine, workload } = first.context;
    const rowEvidenceIds = [...new Set(entries.flatMap((entry) => entry.evidenceIds))];
    const byTarget = new Map<string, typeof entries>();
    for (const entry of entries) byTarget.set(entry.target, [...(byTarget.get(entry.target) ?? []), entry]);

    const matrixCells: Record<string, LlmMatrixCell> = {};
    for (const [target, targetEntries] of byTarget) {
      const results: LlmMatrixCellResult[] = targetEntries.map((entry) => {
        const { result, context, evidenceIds } = entry;
        const hardware = context.hardware;
        return {
          id: result.id,
          deploymentConfigId: context.deployment.id,
          value: known(result.status, result.status, undefined, undefined, result.evidenceIds),
          details: [
            { label: 'Deployment', value: known(context.deployment.id, context.deployment.id, undefined, undefined, context.deployment.evidenceIds) },
            { label: 'سخت‌افزار', value: known(hardware?.name ?? context.deployment.hardwareConfigId, context.deployment.hardwareConfigId, undefined, undefined, hardware?.evidenceIds) },
            { label: 'تنظیمات مؤثر', value: known(stableJson(context.deployment.effectiveSettings)) },
            { label: 'VRAM اوج', value: formatMemory(result.peakVram) },
            { label: 'RAM اوج', value: formatMemory(result.peakRam) },
            { label: 'فضای checkpoint / اضافه / موقت', value: known(`${viewText(formatMemory(result.checkpointStorage))} / ${viewText(formatMemory(result.additionalStorage))} / ${viewText(formatMemory(result.peakTemporaryStorage))}`) },
            { label: 'محدودیت', value: result.limitation ? known(result.limitation) : unknown('not-applicable') }
          ],
          sourceIds: evidenceIds
        };
      });
      const statuses = results.map((item) => item.value.state === 'known' ? item.value.display : viewText(item.value));
      matrixCells[target] = {
        value: results.length === 1
          ? results[0].value
          : known(`${numbers.format(results.length)} نتیجه: ${statuses.join('، ')}`, statuses.join('|')),
        details: results.length === 1
          ? results[0].details
          : [{ label: 'نتایج مستقل ثبت‌شده', value: known(results.map((item) => `${item.id} ← ${item.deploymentConfigId}`).join('، ')) }],
        sourceIds: [...new Set(results.flatMap((item) => item.sourceIds ?? []))],
        results
      };
    }

    const hardwareValues = entries.map((entry) => entry.context.hardware);
    const targetIds = [...new Set(entries.map((entry) => entry.target))].sort();
    const limitations = entries.flatMap((entry) => entry.result.limitation ? [`${entry.context.hardware?.name ?? entry.target}: ${entry.result.limitation}`] : []);
    return {
      id: `hardware-feasibility:${shortStableKey(groupKey)}`,
      label: `${model?.exactName ?? deployment.modelVersionId} · ${artifact?.id ?? deployment.artifactId} · ${stack?.name ?? deployment.servingStackId}`,
      searchText: entries.flatMap((entry) => [entry.result.id, entry.context.deployment.id, model?.exactName, artifact?.id, stack?.name, engine?.name, entry.context.hardware?.name, workload?.name]).join(' '),
      cells: {
        'artifact-execution': known(`${artifact?.id ?? deployment.artifactId} · ${stack?.name ?? deployment.servingStackId} · ${deployment.method} · ${viewText(datum(deployment.weightQuantization))}`),
        workload: known(workload?.name ?? deployment.workloadId, deployment.workloadId)
      },
      matrixCells,
      facets: {
        hardware: entries.map((entry) => known(entry.context.hardware?.name ?? entry.context.deployment.hardwareConfigId, entry.target)),
        'gpu-count': hardwareValues.map((hardware) => known(numbers.format(hardware?.gpuCount ?? 0), hardware?.gpuCount ?? 0, hardware?.gpuCount ?? 0, 'card')),
        feasibility: entries.map((entry) => known(entry.result.status, entry.result.status)),
        'vram-per-gpu': hardwareValues.map((hardware) => hardware ? formatMemory(hardware.vramPerGpu) : unknown()),
        ram: hardwareValues.map((hardware) => hardware ? formatMemory(hardware.ram) : unknown()),
        storage: hardwareValues.map((hardware) => hardware ? datum(hardware.storageCapacity, (number, unit) => `${numbers.format(number)} ${unit ?? ''}`, memoryToGiB) : unknown()),
        'execution-method': known(deployment.method, deployment.method),
        engine: known(engine?.name ?? deployment.backendEngineId, engine?.name ?? deployment.backendEngineId),
        quantization: datum(deployment.weightQuantization),
        'context-length': formatToken(deployment.contextLength),
        concurrency: formatGenericNumber(deployment.concurrency),
        'offload-allowed': known(deployment.offloadAllowed ? 'بله' : 'خیر', deployment.offloadAllowed),
        'evidence-kind': evidenceKinds(repository, rowEvidenceIds)
      },
      details: {
        'gpu-memory': list(entries.map((entry) => `${entry.context.hardware?.name ?? entry.target}: هر کارت ${entry.context.hardware ? viewText(formatMemory(entry.context.hardware.vramPerGpu)) : 'نامعلوم'} / مجموع ${entry.context.hardware ? viewText(formatMemory(entry.context.hardware.aggregateVram)) : 'نامعلوم'}`)),
        'system-memory': list(entries.map((entry) => `${entry.context.hardware?.name ?? entry.target}: ${entry.context.hardware ? viewText(formatMemory(entry.context.hardware.ram)) : 'نامعلوم'}`)),
        storage: list(entries.map((entry) => `${entry.context.hardware?.name ?? entry.target}: checkpoint ${viewText(formatMemory(entry.result.checkpointStorage))} / اضافه ${viewText(formatMemory(entry.result.additionalStorage))} / موقت ${viewText(formatMemory(entry.result.peakTemporaryStorage))}`)),
        'context-concurrency': known(`زمینه: ${viewText(formatToken(deployment.contextLength))} · batch: ${deployment.batchSize.state === 'known' ? deployment.batchSize.value : 'نامعلوم'} · هم‌زمانی: ${deployment.concurrency.state === 'known' ? deployment.concurrency.value : 'نامعلوم'}`),
        offload: known(`${deployment.method} · ${deployment.offloadAllowed ? 'مجاز' : 'غیرمجاز'}`),
        limitations: list(limitations),
        sources: idList(rowEvidenceIds)
      },
      sourceIds: rowEvidenceIds,
      comparison: baseComparison({
        hardware: known(targetIds.join('|'), targetIds.join('|')),
        artifact: known(deployment.artifactId, deployment.artifactId),
        stack: known(deployment.servingStackId, deployment.servingStackId),
        backend: known(deployment.backendEngineId, deployment.backendEngineId),
        method: known(deployment.method, deployment.method),
        quantization: datum(deployment.weightQuantization),
        'kv-cache': datum(deployment.kvCachePrecision),
        parallelism: known(deployment.parallelism, deployment.parallelism),
        settings: known(stableJson(deployment.effectiveSettings), stableJson(deployment.effectiveSettings)),
        workload: known(deployment.workloadId, deployment.workloadId),
        context: formatToken(deployment.contextLength),
        batch: formatGenericNumber(deployment.batchSize),
        concurrency: formatGenericNumber(deployment.concurrency),
        unit: known('feasibility-status', 'feasibility-status'),
        need: workload ? known(workload.applicationId, workload.applicationId) : unknown(),
        'quality-floor': workload?.qualityFloor ? known(`${workload.qualityFloor.metric}:${workload.qualityFloor.minimum}`) : unknown(),
        'latency-target': workload?.serviceLevel ? known(JSON.stringify(workload.serviceLevel)) : unknown()
      }, limitations, entries.every((entry) => entry.result.status !== 'not-reviewed'))
    };
  });
}

const capabilityFacetMap: Record<string, SoftwareCapability[]> = {
  tasks: ['task-generation', 'task-embedding', 'task-reranking', 'task-classification'],
  queueing: ['queueing'], concurrency: ['concurrency'], batching: ['continuous-batching'],
  'admission-control': ['admission-control'], 'model-load-unload': ['model-load-unload'],
  'multi-model': ['multi-model'], 'cold-start': ['cold-start-control'], 'prefix-caching': ['prefix-caching'],
  'speculative-decoding': ['speculative-decoding'], offload: ['cpu-gpu-offload', 'kv-cache-offload'],
  'multi-gpu-sharding': ['multi-gpu-sharding'], 'independent-replicas': ['independent-replicas'],
  streaming: ['streaming'], 'structured-output': ['structured-output'], 'tool-use': ['tool-use'],
  'reasoning-control': ['reasoning-control'], 'model-template': ['model-template-selection'], parser: ['parser-selection'],
  monitoring: ['monitoring'], metrics: ['metrics'], 'health-check': ['health-check'],
  authentication: ['authentication'], 'rate-limiting': ['rate-limiting']
};

function releasesUsingProduct(repository: LlmGuideRepository, productId: string) {
  return repository.softwareReleases.filter((item) => item.productId === productId);
}

function capabilitySummary(repository: LlmGuideRepository, releaseId: string, capabilities?: SoftwareCapability[]) {
  return repository.softwareCapabilities.filter((claim) =>
    claim.scope.softwareReleaseId === releaseId && (!capabilities || capabilities.includes(claim.capability))
  );
}

function noReviewRecord() {
  return unknown('unknown', 'رکورد بررسی ثبت نشده؛ نتیجهٔ مثبت یا منفی ندارد');
}

export function adaptSoftwareProducts(repository: LlmGuideRepository): LlmViewRow[] {
  return repository.softwareReleases.flatMap((release): LlmViewRow[] => {
    const product = repository.softwareProducts.find((item) => item.id === release.productId);
    if (!product) return [];
    const claims = capabilitySummary(repository, release.id);
    const apiClaims = repository.apiCompatibility.filter((item) => item.scope.softwareReleaseId === release.id);
    const stacks = repository.servingStacks.filter((stack) => stack.components.some((component) => component.softwareReleaseId === release.id));
    const backends = stacks.flatMap((stack) => stack.components.filter((component) => component.softwareReleaseId === release.id).map((component) => repository.engines.find((engine) => engine.id === component.backendEngineId)));
    const sourceIds = [...new Set([...release.evidenceIds, ...claims.flatMap((item) => item.evidenceIds), ...apiClaims.flatMap((item) => item.evidenceIds)])];
    const supported = (capabilities: SoftwareCapability[]) => claims.filter((item) => capabilities.includes(item.capability));
    const summary = (items: typeof claims) => items.length
      ? list(items.map((item) => `${item.capability}: ${item.status} (${item.provision})${item.statusReason ? `؛ ${item.statusReason}` : ''}`))
      : noReviewRecord();
    const needTypes = [
      ...(release.roles.includes('user-interface') || release.roles.includes('model-manager') ? ['local-interactive'] : []),
      ...(release.roles.includes('api-server') || release.roles.includes('gateway') ? ['team-api'] : []),
      ...(claims.some((item) => ['continuous-batching', 'admission-control', 'queueing'].includes(item.capability)) ? ['high-throughput'] : []),
      ...(claims.some((item) => ['task-embedding', 'task-reranking', 'task-classification'].includes(item.capability)) ? ['specialized-task'] : []),
      ...(release.roles.some((role) => ['gateway', 'user-interface', 'deployment-manager'].includes(role)) ? ['composite-service'] : [])
    ];
    return [{
      id: release.id, label: `${product.name} ${release.version}`,
      searchText: [release.id, product.name, release.version, ...(product.aliases ?? []), ...release.roles, ...backends.map((item) => item?.name)].join(' '),
      cells: {
        'software-version': known(`${product.name} · ${release.version}`, release.id, undefined, undefined, release.evidenceIds),
        roles: list(release.roles, release.evidenceIds),
        'environment-backend': list([...release.environments, ...backends.map((item) => item ? `${item.name} ${item.version}` : undefined)], sourceIds),
        interfaces: apiClaims.length
          ? list(apiClaims.map((item) => `${item.protocol} ${item.endpoint}: ${item.capability} (${item.status})${item.statusReason ? `؛ ${item.statusReason}` : ''}`), apiClaims.flatMap((item) => item.evidenceIds))
          : noReviewRecord(),
        'service-features': summary(claims),
        'maintenance-review': known(`${release.maintenanceStatus} · ${release.lastReviewedOn}`, release.lastReviewedOn, undefined, undefined, release.evidenceIds),
        'evidence-limitations': known(`${sourceIds.length} شاهد · ${claims.flatMap((item) => item.limitations ?? []).length} محدودیت`)
      },
      facets: {
        'need-type': needTypes.map((value) => known(value, value)), environment: release.environments.map((value) => known(value, value)),
        'software-role': release.roles.map((value) => known(value, value)), 'software-product': known(product.name, product.id.replace('software-product:', '')),
        'software-version': known(release.version, release.version), backend: backends.length ? backends.filter(Boolean).map((item) => known(`${item!.name} ${item!.version}`)) : unknown(),
        'operating-system': release.operatingSystems.length ? release.operatingSystems.map((value) => known(value, value)) : unknown(),
        'hardware-family': release.hardwareKinds.length ? release.hardwareKinds.map((value) => known(value, value)) : unknown(),
        'local-cloud': release.localOrCloud.map((value) => known(value, value)), offline: datum(release.offlineOperation, (value) => value ? 'بله' : 'خیر'),
        ...Object.fromEntries(Object.entries(capabilityFacetMap).map(([id, capabilities]) => {
          const items = supported(capabilities);
          return [id, items.length ? items.map((item) => known(item.status, item.status)) : unknown()];
        })),
        provision: claims.length ? claims.map((item) => known(item.provision, item.provision)) : unknown(),
        'software-license': datum(release.license.name), maintenance: known(release.maintenanceStatus, release.maintenanceStatus),
        'last-reviewed': known(release.lastReviewedOn, release.lastReviewedOn)
      },
      details: {
        'os-hardware': list([...release.operatingSystems, ...release.hardwareKinds]),
        'local-cloud-offline': known(`${release.localOrCloud.join('، ')} · offline: ${release.offlineOperation.state === 'known' ? release.offlineOperation.value : release.offlineOperation.state}`),
        tasks: summary(supported(capabilityFacetMap.tasks)),
        'request-control': summary(supported(['queueing', 'concurrency', 'continuous-batching', 'admission-control'])),
        'model-lifecycle': summary(supported(['model-load-unload', 'multi-model', 'cold-start-control'])),
        'inference-optimizations': summary(supported(['prefix-caching', 'speculative-decoding', 'cpu-gpu-offload', 'kv-cache-offload', 'layer-wise-loading'])),
        'multi-gpu': summary(supported(['multi-gpu-sharding', 'independent-replicas'])),
        'output-tools': summary(supported(['streaming', 'structured-output', 'tool-use', 'reasoning-control'])),
        'model-scopes': list(claims.flatMap((item) => [item.scope.modelTemplate, item.scope.parser, ...item.scope.conditions])),
        'operations-security': summary(supported(['monitoring', 'metrics', 'health-check', 'authentication', 'rate-limiting'])),
        'api-compatibility': apiClaims.length
          ? list(apiClaims.map((item) => `${item.protocol} ${item.endpoint} / ${item.capability}: ${item.status} (${item.provision})${item.statusReason ? `؛ ${item.statusReason}` : ''}`))
          : noReviewRecord(),
        license: datum(release.license.name), sources: idList(sourceIds)
      },
      sourceIds,
      comparison: baseComparison({
        software: known(release.id, release.id), need: needTypes.length === 1 ? known(needTypes[0], needTypes[0]) : unknown(),
        environment: release.environments.length === 1 ? known(release.environments[0], release.environments[0]) : unknown(),
        role: release.roles.length === 1 ? known(release.roles[0], release.roles[0]) : unknown(),
        backend: backends.length === 1 && backends[0] ? known(backends[0].id, backends[0].id) : unknown(),
        workload: unknown('not-applicable'), model: unknown('not-applicable'), metric: unknown('not-measured'), unit: unknown('not-measured'),
        'quality-floor': unknown('not-applicable'), 'latency-target': unknown('not-applicable')
      }, claims.flatMap((item) => item.limitations ?? []), false)
    }];
  });
}

export function adaptDeploymentCompatibility(repository: LlmGuideRepository): LlmViewRow[] {
  return repository.deploymentCompatibility.flatMap((result): LlmViewRow[] => {
    const context = deploymentContext(repository, result.deploymentConfigId);
    if (!context) return [];
    const { deployment, model, artifact, stack, engine, hardware, workload } = context;
    const feasibility = repository.executionFeasibility.find((item) => item.deploymentConfigId === deployment.id);
    const sourceIds = [...new Set([...deployment.evidenceIds, ...result.evidenceIds, ...(feasibility?.evidenceIds ?? [])])];
    const components = stack?.components.map((component) => {
      const release = repository.softwareReleases.find((item) => item.id === component.softwareReleaseId);
      const product = release ? repository.softwareProducts.find((item) => item.id === release.productId) : undefined;
      return `${product?.name ?? component.softwareReleaseId} ${release?.version ?? ''}`.trim();
    }) ?? [];
    const air = result.airLlm;
    return [{
      id: result.id, label: `${model?.exactName ?? deployment.modelVersionId} · ${stack?.name ?? deployment.servingStackId}`,
      searchText: [result.id, model?.exactName, deployment.modelRevision, artifact?.id, ...components, hardware?.name, workload?.name].join(' '),
      cells: {
        'model-revision': known(`${model?.exactName ?? deployment.modelVersionId} · ${deployment.modelRevision}`),
        artifact: known(`${artifact?.id ?? deployment.artifactId} · ${artifact?.repositoryRevision ?? ''}`),
        'serving-stack': known(`${stack?.name ?? deployment.servingStackId} · ${components.join(' + ')}`),
        'hardware-workload': known(`${hardware?.name ?? deployment.hardwareConfigId} · ${workload?.name ?? deployment.workloadId}`),
        'execution-method': known(`${deployment.method} · ${deployment.weightQuantization.state === 'known' ? deployment.weightQuantization.value : deployment.weightQuantization.state} · ${deployment.parallelism}`),
        compatibility: known(`${result.status} · ${result.provision}`, result.status, undefined, undefined, result.evidenceIds)
      },
      facets: {
        model: known(`${model?.exactName ?? deployment.modelVersionId} ${artifact?.id ?? ''}`),
        'software-product': stack ? stack.components.map((component) => {
          const release = repository.softwareReleases.find((item) => item.id === component.softwareReleaseId);
          return known(component.softwareReleaseId, release?.productId.replace('software-product:', '') ?? component.softwareReleaseId);
        }) : unknown(),
        compatibility: known(result.status, result.status), hardware: known(hardware?.name ?? deployment.hardwareConfigId, hardwareTargetId(hardware?.gpuRecordId, hardware?.gpuCount ?? 0)),
        workload: known(workload?.name ?? deployment.workloadId), backend: known(`${engine?.name ?? deployment.backendEngineId} ${engine?.version ?? ''}`),
        'execution-method': known(deployment.method, deployment.method), quantization: datum(deployment.weightQuantization),
        'kv-cache': datum(deployment.kvCachePrecision), parallelism: known(deployment.parallelism, deployment.parallelism),
        'context-length': formatToken(deployment.contextLength), concurrency: formatGenericNumber(deployment.concurrency),
        'peak-vram': feasibility ? formatMemory(feasibility.peakVram) : unknown('not-measured'),
        'peak-ram': feasibility ? formatMemory(feasibility.peakRam) : unknown('not-measured'),
        'peak-storage': feasibility ? datum(feasibility.peakTemporaryStorage, (value, unit) => `${numbers.format(value)} ${unit ?? ''}`, memoryToGiB) : unknown('not-measured'),
        provision: known(result.provision, result.provision), 'evidence-kind': evidenceKinds(repository, sourceIds)
      },
      details: {
        'backend-settings': known(`${engine?.name ?? deployment.backendEngineId} ${engine?.version ?? ''} · ${JSON.stringify(deployment.effectiveSettings)}`),
        'kv-cache': datum(deployment.kvCachePrecision),
        memory: feasibility ? known(`VRAM: ${viewText(formatMemory(feasibility.peakVram))} · RAM: ${viewText(formatMemory(feasibility.peakRam))}`) : unknown('not-measured'),
        storage: feasibility ? known(`checkpoint: ${viewText(formatMemory(feasibility.checkpointStorage))} · اضافه: ${viewText(formatMemory(feasibility.additionalStorage))} · موقت: ${viewText(formatMemory(feasibility.peakTemporaryStorage))}`) : unknown('not-measured'),
        'airllm-scope': air ? known(`${air.airLlmSoftwareReleaseId} · ${air.supportedModelArchitecture} · ${air.modelRevision}`) : unknown('not-applicable'),
        preparation: air ? known(`آماده‌سازی: ${air.preparationTime.state === 'known' ? air.preparationTime.value : air.preparationTime.state} · راه‌اندازی: ${air.startupTime.state === 'known' ? air.startupTime.value : air.startupTime.state}`) : unknown('not-applicable'),
        'latency-throughput': air ? known(`TTFT: ${air.ttft.state === 'known' ? air.ttft.value : air.ttft.state} · سرعت: ${air.generationThroughput.state === 'known' ? air.generationThroughput.value : air.generationThroughput.state} · کل: ${air.totalTime.state === 'known' ? air.totalTime.value : air.totalTime.state}`) : unknown('not-applicable'),
        'workload-settings': known(`${workload?.name ?? deployment.workloadId} · batch ${deployment.batchSize.state === 'known' ? deployment.batchSize.value : deployment.batchSize.state} · concurrency ${deployment.concurrency.state === 'known' ? deployment.concurrency.value : deployment.concurrency.state}`),
        limitations: list([...(result.conditions ?? []), ...(result.limitations ?? []), ...(air?.limitations ?? [])]), sources: idList(sourceIds)
      },
      sourceIds,
      comparison: baseComparison({
        model: known(`${deployment.modelVersionId}@${deployment.modelRevision}`), artifact: known(deployment.artifactId, deployment.artifactId),
        stack: known(deployment.servingStackId, deployment.servingStackId), backend: known(deployment.backendEngineId, deployment.backendEngineId),
        hardware: known(deployment.hardwareConfigId, deployment.hardwareConfigId), workload: known(deployment.workloadId, deployment.workloadId),
        method: known(deployment.method, deployment.method), quantization: datum(deployment.weightQuantization),
        'kv-cache': datum(deployment.kvCachePrecision), parallelism: known(deployment.parallelism, deployment.parallelism),
        context: formatToken(deployment.contextLength), batch: formatGenericNumber(deployment.batchSize), concurrency: formatGenericNumber(deployment.concurrency),
        settings: known(stableJson(deployment.effectiveSettings), stableJson(deployment.effectiveSettings)), unit: known('compatibility-status', 'compatibility-status'),
        need: workload ? known(workload.applicationId, workload.applicationId) : unknown(),
        'quality-floor': workload?.qualityFloor ? known(`${workload.qualityFloor.metric}:${workload.qualityFloor.minimum}`) : unknown(),
        'latency-target': workload?.serviceLevel ? known(JSON.stringify(workload.serviceLevel)) : unknown()
      }, [...result.conditions, ...(result.limitations ?? [])], result.status !== 'not-reviewed')
    }];
  });
}

function firstMetric<Unit extends string>(items: Array<{ value: Datum<number, Unit>; statistic: string }>) {
  const metric = items[0];
  return metric ? formatGenericNumber(metric.value) : unknown('not-measured');
}

export function adaptBenchmarks(repository: LlmGuideRepository): LlmViewRow[] {
  return repository.benchmarkRuns.flatMap((run): LlmViewRow[] => {
    const context = deploymentContext(repository, run.deploymentConfigId);
    if (!context) return [];
    const { deployment, model, artifact, stack, engine, hardware, workload } = context;
    const sourceIds = [...new Set([...deployment.evidenceIds, ...run.evidenceIds])];
    const ttft = firstMetric(run.ttft);
    const tpot = firstMetric(run.tpotOrItl);
    const perRequest = firstMetric(run.perRequestThroughput);
    const aggregate = firstMetric(run.aggregateThroughput);
    const components = stack?.components.map((item) => item.softwareReleaseId) ?? [];
    return [{
      id: run.id, label: `${run.id} · ${model?.exactName ?? deployment.modelVersionId}`,
      searchText: [run.id, model?.exactName, artifact?.id, stack?.name, engine?.name, hardware?.name, workload?.name, run.dataset, run.language].join(' '),
      cells: {
        'run-model': known(`${run.id} · ${model?.exactName ?? deployment.modelVersionId} · ${artifact?.id ?? deployment.artifactId}`),
        'stack-hardware': known(`${stack?.name ?? deployment.servingStackId} · ${hardware?.name ?? deployment.hardwareConfigId}`),
        workload: known(`${run.dataset ?? 'بدون دادهٔ نام‌گذاری‌شده'} · ${run.language ?? 'زبان نامعلوم'} · ${workload?.name ?? deployment.workloadId}`),
        ttft, tpot,
        throughput: known(`درخواست: ${perRequest.state === 'known' ? perRequest.display : perRequest.state} · کل: ${aggregate.state === 'known' ? aggregate.display : aggregate.state}`, undefined,
          aggregate.state === 'known' ? aggregate.canonicalNumber : undefined, aggregate.state === 'known' ? aggregate.canonicalUnit : undefined),
        goodput: formatGenericNumber(run.goodput)
      },
      facets: {
        model: known(`${model?.exactName ?? deployment.modelVersionId} ${artifact?.id ?? ''}`),
        hardware: known(hardware?.name ?? deployment.hardwareConfigId, hardwareTargetId(hardware?.gpuRecordId, hardware?.gpuCount ?? 0)),
        workload: known(workload?.name ?? deployment.workloadId),
        'software-product': components.map((releaseId) => {
          const release = repository.softwareReleases.find((item) => item.id === releaseId);
          return known(releaseId, release?.productId.replace('software-product:', '') ?? releaseId);
        }),
        backend: known(`${engine?.name ?? deployment.backendEngineId} ${engine?.version ?? ''}`),
        quantization: datum(deployment.weightQuantization), language: run.language ? known(run.language, run.language) : unknown(),
        'context-length': formatToken(run.contextLength), 'batch-size': formatGenericNumber(run.batchSize),
        concurrency: formatGenericNumber(run.concurrency), 'arrival-rate': formatGenericNumber(run.arrivalRate),
        'reasoning-mode': datum(run.reasoningMode), 'prefix-caching': datum(run.prefixCaching),
        'speculative-decoding': datum(run.speculativeDecoding),
        statistic: [...run.ttft, ...run.tpotOrItl, ...run.perRequestThroughput, ...run.aggregateThroughput].map((metric) => known(metric.statistic, metric.statistic)),
        'tested-on': known(run.testedOn, run.testedOn), 'evidence-kind': evidenceKinds(repository, sourceIds)
      },
      details: {
        revisions: known(`${deployment.modelRevision} · ${artifact?.repositoryRevision ?? deployment.artifactId} · ${stack?.name ?? deployment.servingStackId} · ${engine?.version ?? ''}`),
        hardware: hardware ? known(`${hardware.name} · ${hardware.gpuCount} GPU · ${hardware.cpu.state === 'known' ? hardware.cpu.value : hardware.cpu.state}`) : unknown(),
        'length-distributions': known(`ورودی: ${run.inputLength.state} · خروجی: ${run.outputLength.state}`),
        load: known(`زمینه: ${run.contextLength.state === 'known' ? run.contextLength.value : run.contextLength.state} · batch: ${run.batchSize.state === 'known' ? run.batchSize.value : run.batchSize.state} · concurrency: ${run.concurrency.state === 'known' ? run.concurrency.value : run.concurrency.state} · arrival: ${run.arrivalRate.state === 'known' ? run.arrivalRate.value : run.arrivalRate.state}`),
        reasoning: known(`${run.reasoningMode.state === 'known' ? run.reasoningMode.value : run.reasoningMode.state} · بودجه: ${run.reasoningBudget.state === 'known' ? run.reasoningBudget.value : run.reasoningBudget.state}`),
        optimizations: known(`prefix: ${run.prefixCaching.state === 'known' ? run.prefixCaching.value : run.prefixCaching.state} · speculative: ${run.speculativeDecoding.state === 'known' ? run.speculativeDecoding.value : run.speculativeDecoding.state} · ${JSON.stringify(run.effectiveSettings)}`),
        statistics: list([...run.ttft, ...run.tpotOrItl, ...run.totalLatency, ...run.perRequestThroughput, ...run.aggregateThroughput].map((item) => item.statistic)),
        outcomes: known(`خطا: ${run.errors} · timeout: ${run.timeouts} · موفق: ${run.successfulRequests}`),
        resources: known(`VRAM: ${run.peakVram.state} · RAM: ${run.peakRam.state} · انرژی: ${run.energy.state}`),
        'run-state': known(`warm-up: ${run.warmup.state} · cold start: ${run.coldStart.state} · پایدار: ${run.steadyStateDuration.state}`),
        quality: run.qualityEvaluationId ? known(run.qualityEvaluationId, run.qualityEvaluationId) : unknown('not-measured'),
        provenance: known(`${run.testedOn} · ${run.publisher} · ${run.rawOutputUrl.state}`),
      },
      sourceIds,
      comparison: baseComparison({
        model: known(`${deployment.modelVersionId}|${deployment.artifactId}`), stack: known(deployment.servingStackId, deployment.servingStackId),
        backend: known(deployment.backendEngineId, deployment.backendEngineId),
        hardware: known(deployment.hardwareConfigId, deployment.hardwareConfigId), workload: known(deployment.workloadId, deployment.workloadId),
        method: known(deployment.method, deployment.method), quantization: datum(deployment.weightQuantization), 'kv-cache': datum(deployment.kvCachePrecision),
        context: formatToken(run.contextLength), batch: formatGenericNumber(run.batchSize), concurrency: formatGenericNumber(run.concurrency),
        'arrival-rate': formatGenericNumber(run.arrivalRate), 'reasoning-mode': datum(run.reasoningMode), 'reasoning-budget': formatGenericNumber(run.reasoningBudget),
        'prefix-caching': datum(run.prefixCaching), 'speculative-decoding': datum(run.speculativeDecoding),
        settings: known(stableJson({ deployment: deployment.effectiveSettings, benchmark: run.effectiveSettings })), metric: known('ttft', 'ttft'),
        statistic: run.ttft[0] ? known(run.ttft[0].statistic, run.ttft[0].statistic) : unknown('not-measured'), unit: known('ms', 'ms'),
        need: workload ? known(workload.applicationId, workload.applicationId) : unknown(),
        'quality-floor': workload?.qualityFloor ? known(`${workload.qualityFloor.metric}:${workload.qualityFloor.minimum}`) : unknown(),
        'latency-target': workload?.serviceLevel ? known(JSON.stringify(workload.serviceLevel)) : unknown()
      }, [], ttft.state === 'known' && Boolean(run.ttft[0]))
    }];
  });
}

export function adaptEconomics(repository: LlmGuideRepository): LlmViewRow[] {
  return repository.costScenarios.flatMap((cost): LlmViewRow[] => {
    const context = deploymentContext(repository, cost.deploymentConfigId);
    if (!context) return [];
    const { deployment, model, stack, hardware, workload } = context;
    const sourceIds = [...new Set([...deployment.evidenceIds, ...cost.evidenceIds, ...cost.priceInputs.flatMap((item) => item.evidenceIds)])];
    const currencies = [...new Set(cost.priceInputs.map((item) => item.currency))];
    const markets = [...new Set(cost.priceInputs.map((item) => item.market))];
    const observations = [...new Set(cost.priceInputs.map((item) => item.observedOn))];
    const period = cost.calculationPeriod.state === 'known' ? cost.calculationPeriod.unit ?? 'period' : undefined;
    return [{
      id: cost.id, label: cost.name,
      searchText: [cost.id, cost.name, model?.exactName, stack?.name, hardware?.name, workload?.name, cost.acquisitionMode].join(' '),
      cells: {
        'scenario-deployment': known(`${cost.name} · ${deployment.id}`),
        'need-slo': known(`${workload?.name ?? deployment.workloadId} · ${cost.qualityFloor.metric} ≥ ${cost.qualityFloor.minimum}`),
        acquisition: known(cost.acquisitionMode, cost.acquisitionMode),
        basis: known(`${currencies.join('، ') || 'ارز نامعلوم'} · ${cost.calculationBasisDate}`, cost.calculationBasisDate),
        tco: formatMoneyValue(cost.tco), 'accepted-request-cost': formatMoneyValue(cost.acceptedRequestCost),
        'break-even': formatGenericNumber(cost.breakEvenPoint)
      },
      facets: {
        application: workload ? known(applicationLabel(workload.applicationId), workload.applicationId) : unknown(),
        acquisition: known(cost.acquisitionMode, cost.acquisitionMode),
        'calculation-period': cost.calculationPeriod.state === 'known' ? known(String(cost.calculationPeriod.unit ?? ''), cost.calculationPeriod.unit ?? '') : unknown(cost.calculationPeriod.state),
        model: known(`${model?.exactName ?? deployment.modelVersionId} ${deployment.id}`),
        'software-product': stack ? stack.components.map((component) => {
          const release = repository.softwareReleases.find((item) => item.id === component.softwareReleaseId);
          return known(component.softwareReleaseId, release?.productId.replace('software-product:', '') ?? component.softwareReleaseId);
        }) : unknown(),
        hardware: known(hardware?.name ?? deployment.hardwareConfigId, hardwareTargetId(hardware?.gpuRecordId, hardware?.gpuCount ?? 0)),
        currency: currencies.length ? currencies.map((value) => known(value, value)) : unknown(),
        market: markets.length ? markets.map((value) => known(value, value)) : unknown(),
        'price-observed': observations.length ? observations.map((value) => known(value, value)) : unknown(),
        'calculation-basis-date': known(cost.calculationBasisDate, cost.calculationBasisDate),
        traffic: formatGenericNumber(cost.traffic), 'operating-hours': formatGenericNumber(cost.operatingHours),
        'license-cost-state': known(cost.licenseCost.state, cost.licenseCost.state),
        'evidence-kind': evidenceKinds(repository, sourceIds)
      },
      details: {
        'traffic-hours': known(`ترافیک: ${cost.traffic.state} · ساعات: ${cost.operatingHours.state} · کاربران ثبت‌نام‌شده: ${workload?.registeredUsers?.state ?? 'ثبت نشده'}`),
        'price-observations': list(cost.priceInputs.map((item) => `${numbers.format(item.amount)} ${item.currency} · ${item.market} · مشاهده ${item.observedOn}`)),
        'software-costs': known(`راه‌اندازی: ${cost.softwareLifecycleCosts.initialSetup.state} · آماده‌سازی: ${cost.softwareLifecycleCosts.modelPreparation.state} · بارگذاری: ${cost.softwareLifecycleCosts.modelLoadOperations.state} · نگه‌داری: ${cost.softwareLifecycleCosts.ongoingMaintenance.state} · منابع: ${cost.softwareLifecycleCosts.supportingResources.state}`),
        'system-operations': known(`سامانه: ${cost.totalSystemCost.state} · عملیات: ${cost.operatingCost.state}`),
        'utilization-redundancy': known(`استفاده: ${cost.utilization.state} · افزونگی: ${cost.redundancy.state}`),
        period: datum(cost.calculationPeriod), 'license-cost': known(cost.licenseCost.state, cost.licenseCost.state),
        'token-cost': known(`${cost.tokenCost.state} · ${cost.tokenCostDefinition ?? 'تعریف نشده'}`),
        roi: cost.roi ? known(`${cost.roi.state} · ارزش: ${cost.economicValueAssumption?.state ?? 'تعریف نشده'}`) : unknown('not-applicable'),
        derivation: list(sourceIds.map((id) => repository.evidence.find((item) => item.id === id)?.derivation?.method)), sources: idList(sourceIds)
      },
      sourceIds,
      comparison: baseComparison({
        deployment: known(deployment.id, deployment.id), acquisition: known(cost.acquisitionMode, cost.acquisitionMode),
        need: workload ? known(workload.applicationId, workload.applicationId) : unknown(), workload: known(deployment.workloadId, deployment.workloadId),
        'quality-floor': known(`${cost.qualityFloor.metric}:${cost.qualityFloor.minimum}`),
        'latency-target': known(JSON.stringify(cost.latencyTargets)), currency: currencies.length === 1 ? known(currencies[0], currencies[0]) : unknown(),
        market: markets.length === 1 ? known(markets[0], markets[0]) : unknown(), 'basis-date': known(cost.calculationBasisDate, cost.calculationBasisDate),
        period: period ? known(period, period) : unknown(), unit: currencies.length === 1 ? known(currencies[0], currencies[0]) : unknown()
      }, [], currencies.length === 1 && Boolean(period))
    }];
  });
}

export function adaptSpecializedModels(repository: LlmGuideRepository): LlmViewRow[] {
  return repository.specializedAssessments.map((assessment) => {
    const model = repository.models.find((item) => item.id === assessment.modelVersionId);
    const workload = repository.workloads.find((item) => item.id === assessment.workloadId);
    const total = model ? formatParameter(model.totalParametersB) : unknown();
    const evidenceIds = assessment.evidenceIds;
    return {
      id: assessment.id, label: `${model?.exactName ?? assessment.modelVersionId} · ${assessment.kind}`,
      searchText: [assessment.id, model?.exactName, assessment.kind, assessment.applicationId, assessment.metricName, assessment.metricUnit].join(' '),
      cells: {
        'model-kind': known(`${model?.exactName ?? assessment.modelVersionId} · ${assessment.kind}`),
        task: known(`${applicationLabel(assessment.applicationId)} · ${workload?.subapplicationId ?? ''}`),
        parameters: total,
        'quality-metric': datum(assessment.metricValue, (value) => `${numbers.format(value)} ${assessment.metricUnit}`,
          (value) => ({ number: value, unit: assessment.metricUnit })),
        'work-rate': unknown('not-measured'), evidence: known(`${evidenceIds.length} شاهد`)
      },
      facets: {
        kind: known(assessment.kind, assessment.kind), application: known(applicationLabel(assessment.applicationId), assessment.applicationId),
        'total-parameters': total, 'size-band': model ? modelSizeBand(model) : unknown(),
        subapplication: workload?.subapplicationId ? known(workload.subapplicationId, workload.subapplicationId) : unknown(),
        metric: known(assessment.metricName, assessment.metricName), 'metric-unit': known(assessment.metricUnit, assessment.metricUnit),
        language: workload?.language ? known(workload.language, workload.language) : unknown(),
        'evidence-kind': evidenceKinds(repository, evidenceIds)
      },
      details: {
        'language-dataset': workload?.language ? known(workload.language) : unknown(),
        'artifact-execution': assessment.artifactId ? known(`${assessment.artifactId} · ${assessment.modelRevision}`) : known(assessment.modelRevision),
        workload: known(`${workload?.name ?? assessment.workloadId} · ${assessment.metricUnit}`),
        'generative-alternative': assessment.alternativeToGenerativeModelId ? known(assessment.alternativeToGenerativeModelId) : unknown('not-applicable'),
        limitations: list(assessment.limitations ?? []), sources: idList(evidenceIds)
      },
      sourceIds: evidenceIds,
      comparison: baseComparison({
        model: known(`${assessment.modelVersionId}|${assessment.artifactId ?? ''}`), task: known(assessment.applicationId, assessment.applicationId),
        dataset: unknown(), language: workload?.language ? known(workload.language, workload.language) : unknown(),
        metric: known(assessment.metricName, assessment.metricName), unit: known(assessment.metricUnit, assessment.metricUnit),
        workload: known(assessment.workloadId, assessment.workloadId), need: known(assessment.applicationId, assessment.applicationId),
        'quality-floor': workload?.qualityFloor ? known(`${workload.qualityFloor.metric}:${workload.qualityFloor.minimum}`) : unknown(),
        'latency-target': workload?.serviceLevel ? known(JSON.stringify(workload.serviceLevel)) : unknown()
      }, assessment.limitations ?? [], assessment.metricValue.state === 'known')
    };
  });
}

export function buildLlmViewRows(repository: LlmGuideRepository): Record<LlmViewId, LlmViewRow[]> {
  return {
    'model-catalog': adaptModelCatalog(repository),
    'model-suitability': adaptModelSuitability(repository),
    'hardware-feasibility': adaptHardwareFeasibility(repository),
    'software-products': adaptSoftwareProducts(repository),
    'deployment-compatibility': adaptDeploymentCompatibility(repository),
    benchmarks: adaptBenchmarks(repository),
    economics: adaptEconomics(repository),
    'specialized-models': adaptSpecializedModels(repository)
  };
}

function validateIds(repository: LlmGuideRepository, errors: string[]) {
  const collections: Array<[string, Array<{ id: string }>]> = [
    ['families', repository.families], ['models', repository.models], ['artifacts', repository.artifacts],
    ['softwareProducts', repository.softwareProducts], ['softwareReleases', repository.softwareReleases],
    ['engines', repository.engines], ['servingStacks', repository.servingStacks],
    ['deploymentConfigurations', repository.deploymentConfigurations], ['softwareCapabilities', repository.softwareCapabilities],
    ['apiCompatibility', repository.apiCompatibility], ['hardwareConfigurations', repository.hardwareConfigurations],
    ['workloads', repository.workloads], ['qualityEvaluations', repository.qualityEvaluations],
    ['applicationAssessments', repository.applicationAssessments], ['executionFeasibility', repository.executionFeasibility],
    ['deploymentCompatibility', repository.deploymentCompatibility], ['benchmarkRuns', repository.benchmarkRuns],
    ['costScenarios', repository.costScenarios], ['specializedAssessments', repository.specializedAssessments],
    ['claims', repository.claims], ['evidence', repository.evidence]
  ];
  const all = new Set<string>();
  for (const [name, items] of collections) for (const item of items) {
    if (all.has(item.id)) errors.push(`duplicate id ${item.id} in ${name}`);
    all.add(item.id);
  }
}

function requireRef(errors: string[], owner: string, field: string, id: string | undefined, valid: Set<string>) {
  if (!id || !valid.has(id)) errors.push(`${owner}.${field} references missing ${id ?? '(empty)'}`);
}

export function validateLlmRepository(repository: LlmGuideRepository) {
  const errors: string[] = [];
  validateIds(repository, errors);
  const sets = {
    families: new Set(repository.families.map((item) => item.id)), models: new Set(repository.models.map((item) => item.id)),
    artifacts: new Set(repository.artifacts.map((item) => item.id)), products: new Set(repository.softwareProducts.map((item) => item.id)),
    releases: new Set(repository.softwareReleases.map((item) => item.id)), engines: new Set(repository.engines.map((item) => item.id)),
    stacks: new Set(repository.servingStacks.map((item) => item.id)), deployments: new Set(repository.deploymentConfigurations.map((item) => item.id)),
    hardware: new Set(repository.hardwareConfigurations.map((item) => item.id)), workloads: new Set(repository.workloads.map((item) => item.id)),
    quality: new Set(repository.qualityEvaluations.map((item) => item.id)), evidence: new Set(repository.evidence.map((item) => item.id))
  };

  for (const model of repository.models) {
    requireRef(errors, model.id, 'familyId', model.familyId, sets.families);
    if (model.baseModelId) requireRef(errors, model.id, 'baseModelId', model.baseModelId, sets.models);
    if (model.distilledFromModelId) requireRef(errors, model.id, 'distilledFromModelId', model.distilledFromModelId, sets.models);
  }
  for (const artifact of repository.artifacts) {
    requireRef(errors, artifact.id, 'modelVersionId', artifact.modelVersionId, sets.models);
    for (const evaluationId of artifact.artifactQualityEvaluationIds ?? []) {
      requireRef(errors, artifact.id, 'artifactQualityEvaluationIds', evaluationId, sets.quality);
      const evaluation = repository.qualityEvaluations.find((item) => item.id === evaluationId);
      if (evaluation?.artifactId !== artifact.id || evaluation.modelVersionId !== artifact.modelVersionId || evaluation.artifactRevision !== artifact.repositoryRevision) {
        errors.push(`${artifact.id} cannot inherit ${evaluationId}; evaluation must target the exact artifact revision`);
      }
    }
  }
  for (const evaluation of repository.qualityEvaluations) {
    requireRef(errors, evaluation.id, 'modelVersionId', evaluation.modelVersionId, sets.models);
    if (evaluation.artifactId) {
      requireRef(errors, evaluation.id, 'artifactId', evaluation.artifactId, sets.artifacts);
      const artifact = repository.artifacts.find((item) => item.id === evaluation.artifactId);
      if (artifact && (artifact.modelVersionId !== evaluation.modelVersionId || artifact.repositoryRevision !== evaluation.artifactRevision)) {
        errors.push(`${evaluation.id} attribution does not match its exact artifact/model revision`);
      }
    }
    if (evaluation.deploymentConfigId) requireRef(errors, evaluation.id, 'deploymentConfigId', evaluation.deploymentConfigId, sets.deployments);
  }
  for (const assessment of repository.applicationAssessments) {
    requireRef(errors, assessment.id, 'modelVersionId', assessment.modelVersionId, sets.models);
    if (assessment.artifactId) {
      requireRef(errors, assessment.id, 'artifactId', assessment.artifactId, sets.artifacts);
      const artifact = repository.artifacts.find((item) => item.id === assessment.artifactId);
      if (artifact?.modelVersionId !== assessment.modelVersionId) errors.push(`${assessment.id} artifact/model attribution mismatch`);
    }
    if (assessment.qualityEvaluationId) requireRef(errors, assessment.id, 'qualityEvaluationId', assessment.qualityEvaluationId, sets.quality);
  }
  for (const release of repository.softwareReleases) requireRef(errors, release.id, 'productId', release.productId, sets.products);
  for (const stack of repository.servingStacks) {
    const componentIds = new Set(stack.components.map((item) => item.id));
    if (componentIds.size !== stack.components.length) errors.push(`${stack.id} has duplicate component ids`);
    for (const component of stack.components) {
      requireRef(errors, `${stack.id}.${component.id}`, 'softwareReleaseId', component.softwareReleaseId, sets.releases);
      if (component.backendEngineId) requireRef(errors, `${stack.id}.${component.id}`, 'backendEngineId', component.backendEngineId, sets.engines);
      for (const target of component.connectsToComponentIds ?? []) if (!componentIds.has(target)) errors.push(`${stack.id}.${component.id} connects to missing ${target}`);
      const release = repository.softwareReleases.find((item) => item.id === component.softwareReleaseId);
      for (const role of component.roles) if (release && !release.roles.includes(role)) errors.push(`${stack.id}.${component.id} role ${role} is absent from release scope`);
    }
  }
  for (const claim of [...repository.softwareCapabilities, ...repository.apiCompatibility]) {
    requireRef(errors, claim.id, 'scope.softwareReleaseId', claim.scope.softwareReleaseId, sets.releases);
    if (claim.scope.backendEngineId) requireRef(errors, claim.id, 'scope.backendEngineId', claim.scope.backendEngineId, sets.engines);
    for (const id of claim.scope.modelVersionIds ?? []) requireRef(errors, claim.id, 'scope.modelVersionIds', id, sets.models);
    for (const id of claim.scope.artifactIds ?? []) requireRef(errors, claim.id, 'scope.artifactIds', id, sets.artifacts);
    if (['supported', 'conditional', 'not-supported'].includes(claim.status) && !claim.evidenceIds.length) {
      errors.push(`${claim.id} factual capability/API claim has no evidence`);
    }
    if (claim.status === 'not-applicable' && !claim.statusReason?.trim()) {
      errors.push(`${claim.id} not-applicable status has no reason`);
    }
  }
  for (const deployment of repository.deploymentConfigurations) {
    requireRef(errors, deployment.id, 'modelVersionId', deployment.modelVersionId, sets.models);
    requireRef(errors, deployment.id, 'artifactId', deployment.artifactId, sets.artifacts);
    requireRef(errors, deployment.id, 'servingStackId', deployment.servingStackId, sets.stacks);
    requireRef(errors, deployment.id, 'backendEngineId', deployment.backendEngineId, sets.engines);
    requireRef(errors, deployment.id, 'hardwareConfigId', deployment.hardwareConfigId, sets.hardware);
    requireRef(errors, deployment.id, 'workloadId', deployment.workloadId, sets.workloads);
    const artifact = repository.artifacts.find((item) => item.id === deployment.artifactId);
    if (artifact?.modelVersionId !== deployment.modelVersionId || artifact.baseRevision !== deployment.modelRevision) {
      errors.push(`${deployment.id} does not bind the exact artifact/model revision`);
    }
    const stack = repository.servingStacks.find((item) => item.id === deployment.servingStackId);
    if (stack && !stack.components.some((item) => item.backendEngineId === deployment.backendEngineId)) {
      errors.push(`${deployment.id} backend is not a component of its ServingStack`);
    }
  }
  for (const result of repository.executionFeasibility) requireRef(errors, result.id, 'deploymentConfigId', result.deploymentConfigId, sets.deployments);
  for (const result of repository.deploymentCompatibility) {
    requireRef(errors, result.id, 'deploymentConfigId', result.deploymentConfigId, sets.deployments);
    if (result.airLlm) {
      requireRef(errors, result.id, 'airLlm.softwareReleaseId', result.airLlm.airLlmSoftwareReleaseId, sets.releases);
      if (result.airLlm.servingStackId !== repository.deploymentConfigurations.find((item) => item.id === result.deploymentConfigId)?.servingStackId) {
        errors.push(`${result.id} AirLLM evidence targets another ServingStack`);
      }
    }
  }
  for (const run of repository.benchmarkRuns) requireRef(errors, run.id, 'deploymentConfigId', run.deploymentConfigId, sets.deployments);
  for (const cost of repository.costScenarios) requireRef(errors, cost.id, 'deploymentConfigId', cost.deploymentConfigId, sets.deployments);
  for (const assessment of repository.specializedAssessments) {
    requireRef(errors, assessment.id, 'modelVersionId', assessment.modelVersionId, sets.models);
    requireRef(errors, assessment.id, 'workloadId', assessment.workloadId, sets.workloads);
    if (assessment.artifactId) requireRef(errors, assessment.id, 'artifactId', assessment.artifactId, sets.artifacts);
  }
  for (const evidence of repository.evidence) {
    if (!evidence.locator.trim()) errors.push(`${evidence.id}.locator is empty`);
    if (evidence.derivation) {
      if (!evidence.derivation.inputs.length || !evidence.derivation.formulaOrProcedure || !evidence.derivation.rounding) errors.push(`${evidence.id}.derivation is incomplete`);
      for (const input of evidence.derivation.inputs) {
        requireRef(errors, evidence.id, 'derivation.inputs.evidenceId', input.evidenceId, sets.evidence);
        if (!input.locator.trim()) errors.push(`${evidence.id}.derivation input locator is empty`);
      }
    }
  }
  const allWithEvidence: unknown[] = [repository, ...repository.claims];
  const seen = new Set<unknown>();
  const checkEvidenceIds = (value: unknown, path: string) => {
    if (!value || typeof value !== 'object' || seen.has(value)) return;
    seen.add(value);
    if (Array.isArray(value)) return value.forEach((item, index) => checkEvidenceIds(item, `${path}[${index}]`));
    for (const [key, item] of Object.entries(value)) {
      if (key === 'evidenceIds' && Array.isArray(item)) for (const id of item) requireRef(errors, path, key, String(id), sets.evidence);
      else checkEvidenceIds(item, `${path}.${key}`);
    }
  };
  allWithEvidence.forEach((item, index) => checkEvidenceIds(item, `repository[${index}]`));
  return errors;
}

export function assertValidLlmRepository(repository: LlmGuideRepository) {
  const errors = validateLlmRepository(repository);
  if (errors.length) throw new Error(`Invalid LLM repository:\n${errors.join('\n')}`);
}
