import { createLlmGuide } from './guide';
import { createLlmPresentation } from './presentation';
import type {
  Datum,
  DeploymentConfiguration,
  EvidenceId,
  LlmGuideRepository,
  MemoryUnit,
  ModelVersion,
  ModelApplicationAssessment,
  PublishedEvaluation,
  SoftwareCapability
} from './schema';
import type { LlmMatrixCell, LlmMatrixCellResult, LlmViewId, LlmViewRow, ViewValue } from './views';
import type { LlmI18n } from './i18n/runtime';

/** Text and formatting are edition-scoped; no mutable global locale. */
export function createLlmAdapters(i18n: LlmI18n) {
const { t, locale, numberFormat } = i18n;
const { applications, guideParameterBands } = createLlmGuide(i18n);
const { llmLabel, sourceDateValue, sourceDateRange } = createLlmPresentation(i18n);
const numbers = new Intl.NumberFormat(numberFormat, { maximumFractionDigits: 3 });
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
): Extract<ViewValue, { state: 'known' }> => ({
  state: 'known', display,
  ...(raw !== undefined ? { raw } : {}),
  ...(canonicalNumber !== undefined ? { canonicalNumber } : {}),
  ...(canonicalUnit ? { canonicalUnit } : {}),
  ...(evidenceIds?.length ? { evidenceIds: [...evidenceIds] } : {})
});
const viewText = (value: ViewValue) => value.state === 'known'
  ? value.display
  : value.state === 'not-measured'
    ? t('adapters.0177')
    : value.state === 'not-applicable'
      ? t('adapters.0178')
      : t('adapters.0179');
function datum<T, Unit extends string>(
  value: Datum<T, Unit> | undefined,
  format: (item: T, unit?: Unit) => string = (item, unit) => `${String(item)}${unit ? ` ${unit}` : ''}`,
  canonical?: (item: T, unit?: Unit) => { number: number; unit: string } | undefined
): ViewValue {
  if (!value || value.state !== 'known') return { ...unknown(value?.state ?? 'unknown', value?.note), ...(value?.evidenceIds?.length ? { evidenceIds: [...value.evidenceIds] } : {}) };
  const converted = canonical?.(value.value, value.unit);
  const raw = typeof value.value === 'string' || typeof value.value === 'number' || typeof value.value === 'boolean'
    ? value.value
    : format(value.value, value.unit);
  return { ...known(format(value.value, value.unit), raw, converted?.number, converted?.unit, value.evidenceIds), ...(value.note ? { note: value.note } : {}) };
}
function licenseDetails(license: ModelVersion['license']): Record<string, ViewValue> {
  const url = datum(license.url);
  return {
    license: datum(license.name),
    'license-url': url.state === 'known' && /^https?:\/\//.test(String(url.raw)) ? { ...url, href: String(url.raw) } : url,
    'commercial-use': datum(license.commercialUse, (value) => ({ allowed: t('adapters.0180'), restricted: t('adapters.0181'), prohibited: t('adapters.0182'), unknown: t('adapters.0179') }[value] ?? value)),
    'license-restrictions': license.restrictions?.length ? list(license.restrictions, license.evidenceIds) : unknown('unknown', t('adapters.0183'))
  };
}
function list(items: Array<string | undefined>, evidenceIds?: readonly string[]) {
  const values = items.filter((item): item is string => Boolean(item));
  return values.length ? known(values.join(t('adapters.0184')), values.join('|'), undefined, undefined, evidenceIds) : unknown();
}
function idList(ids: readonly string[]) {
  return ids.length ? known(ids.join(t('adapters.0184')), ids.join('|'), undefined, undefined, ids) : unknown();
}
function memoryToGiB(value: number, unit?: MemoryUnit) {
  const factors: Partial<Record<MemoryUnit, number>> = {
    MB: 1e6 / 2 ** 30, MiB: 1 / 1024, GB: 1e9 / 2 ** 30, GiB: 1, TB: 1e12 / 2 ** 30, TiB: 1024
  };
  const factor = unit ? factors[unit] : undefined;
  return factor === undefined ? undefined : { number: value * factor, unit: 'GiB' };
}
function modelSizeBand(model: ModelVersion) {
  const declared = model.totalParametersB.state === 'known' ? model.totalParametersB : model.parameterCounts?.find(item => item.scope === 'nominal')?.value;
  if (declared?.state !== 'known') return unknown();
  const value = declared.value;
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
      : { status: 'needs-more-data' as const, reason: t('adapters.0185') },
    limitations
  };
}
function formatParameter(value: Datum<number, 'billion-parameters'>) {
  return datum(value, (number) => t('adapters.0186', numbers.format(number)), (number) => ({ number, unit: 'B' }));
}
function formatToken(value: Datum<number, 'token'>) {
  return datum(value, (number) => t('adapters.0187', numbers.format(number)), (number) => ({ number, unit: 'token' }));
}
function formatMemory(value: Datum<number, MemoryUnit>) {
  return datum(value, (number, unit) => `${numbers.format(number)} ${unit ?? ''}`, memoryToGiB);
}
function formatGenericNumber<Unit extends string>(value: Datum<number, Unit>, fallbackUnit?: string) {
  return datum(value, (number, unit) => `${numbers.format(number)}${unit || fallbackUnit ? ` ${unit ?? fallbackUnit}` : ''}`,
    (number, unit) => ({ number, unit: unit ?? fallbackUnit ?? 'number' }));
}
function applicationLabel(id: string) {
  return applications.find((item) => item.id === id)?.label ?? id;
}
const compactToken = (value: Datum<number, 'token'>) => datum(value, number => t('adapters.0187', numbers.format(number)), number => ({ number, unit: 'token' }));
const copyValue = (text: string): ViewValue => ({ ...known(text, text), copyText: text });
function modelParameterSummary(model: ModelVersion): ViewValue {
  const total = formatParameter(model.totalParametersB);
  const nominal = model.parameterCounts?.find(item => item.scope === 'nominal' && item.value.state === 'known');
  const parts = total.state === 'known' ? [`${model.parameterCounts?.some(item => item.scope === 'total' && item.approximate) ? t('adapters.0188') : ''}${total.display}`] : nominal?.value.state === 'known' ? [t('adapters.0189', nominal.approximate ? t('adapters.0188') : '', numbers.format(nominal.value.value))] : [];
  if (model.activeParametersB.state === 'known') parts.push(t('adapters.0190', viewText(formatParameter(model.activeParametersB))));
  else for (const count of model.parameterCounts ?? []) if (count.scope === 'active' && count.value.state === 'known') {
    parts.push(t('adapters.0191', numbers.format(count.value.value), count.label));
  }
  for (const count of model.parameterCounts ?? []) if (['effective', 'language-component', 'other'].includes(count.scope) && count.value.state === 'known') {
    parts.push(t('adapters.0192', count.approximate ? t('adapters.0188') : '', numbers.format(count.value.value), count.label));
  }
  if (!parts.length) {
    const stored = model.parameterCounts?.find(count => count.scope === 'stored' && count.value.state === 'known');
    if (stored?.value.state === 'known') return {
      ...known(t('adapters.0193', numbers.format(stored.value.value)), undefined, undefined, undefined, stored.value.evidenceIds),
      caveat: t('adapters.0194')
    };
    return total;
  }
  return { ...known(parts.join(' · '), total.state === 'known' ? total.raw : undefined,
    total.state === 'known' ? total.canonicalNumber : undefined, 'B', model.evidenceIds),
    caveat: total.state !== 'known' ? t('adapters.0195') : undefined };
}
function modelContextSummary(model: ModelVersion): ViewValue {
  const context = compactToken(model.declaredContext);
  if (context.state !== 'known') return context;
  return { ...context, note: undefined,
    caveat: [model.contextCondition, model.contextExtension?.capacity.state === 'known'
      ? t('adapters.0196', viewText(compactToken(model.contextExtension.capacity)), model.contextExtension.condition) : undefined].filter(Boolean).join(t('adapters.0197')) || undefined };
}
function reportedResults(repository: LlmGuideRepository, modelId: string, applicationId?: string) {
  return (repository.publishedEvaluations ?? []).filter(result => result.modelVersionId === modelId &&
    (!applicationId || result.applicationIds.includes(applicationId as ModelApplicationAssessment['applicationId'])) &&
    result.evidenceIds.some(id => repository.evidence.some(source => source.id === id)));
}
function publishedSummary(result: PublishedEvaluation): ViewValue {
  return { ...known(`${result.benchmark} · ${result.metric}: ${numbers.format(result.value)}${result.unit === 'percent' ? t('adapters.0198') : ''}`, result.value,
    result.value, `${result.benchmark}|${result.metric}|${result.unit}`, result.evidenceIds),
    badge: `${result.reportingRelationship === 'publisher' ? t('adapters.0199') : result.reportingRelationship === 'independent' ? t('adapters.0200') : t('adapters.0201')}: ${result.reporter}`,
    caveat: [result.language === 'multilingual' ? t('adapters.0202') : result.language,
      result.settings.retrievalModel ? t('adapters.0203', result.settings.candidateCount ?? '—', result.settings.retrievalModel) : undefined].filter(Boolean).join(t('adapters.0197')) };
}
function documentedAssessmentValue(item: ModelApplicationAssessment, repository: LlmGuideRepository): ViewValue {
  const hasSource = item.evidenceIds.some(id => repository.evidence.some(source => source.id === id));
  if (!hasSource || item.basis === 'insufficient-evidence') return unknown('unknown', t('adapters.0204'));
  if (item.basis === 'declared-capability') return {
    ...known(item.summary || t('adapters.0205'), item.basis, undefined, undefined, item.evidenceIds),
    badge: item.primaryPurpose && item.rationale ? t('adapters.0206') : item.summary ? t('adapters.0207') : undefined,
    caveat: item.importantConditions?.join(t('adapters.0197'))
  };
  if (item.basis === 'editorial-recommendation') return item.rationale?.trim()
    ? { ...known(item.summary || t('adapters.0208'), item.basis, undefined, undefined, item.evidenceIds), badge: t('adapters.0208'), caveat: item.importantConditions?.join(t('adapters.0197')) }
    : unknown('unknown', t('adapters.0209'));
  return datum(item.outcome, llmLabel);
}
function adaptModelCatalog(repository: LlmGuideRepository): LlmViewRow[] {
  return repository.models.map((model) => {
    const family = repository.families.find((item) => item.id === model.familyId);
    const total = formatParameter(model.totalParametersB);
    const active = formatParameter(model.activeParametersB);
    const size = modelParameterSummary(model);
    const evaluations = reportedResults(repository, model.id);
    const evidenceIds = [...new Set([...(family?.evidenceIds ?? []), ...model.evidenceIds, ...evaluations.flatMap(item => item.evidenceIds), ...repository.artifacts.filter((artifact) => artifact.modelVersionId === model.id).flatMap((artifact) => artifact.evidenceIds)])];
    const uses = repository.applicationAssessments.filter(item => item.modelVersionId === model.id && !item.artifactId && documentedAssessmentValue(item, repository).state === 'known');
    const modalities = known(`${model.inputModalities.map(llmLabel).join(t('adapters.0184'))} ← ${model.outputModalities.map(value => value === 'embedding' ? t('adapters.0210') : llmLabel(value)).join(t('adapters.0184'))}`, undefined, undefined, undefined, model.evidenceIds);
    return {
      id: model.id, label: model.exactName,
      searchText: [model.id, model.exactName, model.version, model.publisher, family?.name, ...(model.aliases ?? []), ...uses.map(item => item.summary)].join(' '),
      cells: {
        model: known(model.exactName, model.exactName, undefined, undefined, model.evidenceIds),
        'family-publisher': known(`${family?.name ?? t('adapters.0179')} · ${model.publisher}`, family?.name ?? model.publisher, undefined, undefined, evidenceIds),
        'kind-stage': known(`${llmLabel(model.kind)}${model.stage !== 'other' ? ' · ' + llmLabel(model.stage) : ''}`, `${model.kind}|${model.stage}`),
        parameters: size,
        'size-architecture': { ...known(`${size.state === 'known' ? size.display + ' · ' : ''}${llmLabel(model.architecture)}${model.attentionArchitecture === 'hybrid' ? t('adapters.0211') : ''}`, total.state === 'known' ? total.raw : undefined, total.state === 'known' ? total.canonicalNumber : undefined, 'B', model.evidenceIds), caveat: size.state === 'known' ? size.caveat : t('adapters.0212') },
        architecture: known(llmLabel(model.architecture), model.architecture),
        modalities, context: modelContextSummary(model),
        applications: list([...new Set(uses.map(item => item.summary || applicationLabel(item.applicationId)))], uses.flatMap(item => item.evidenceIds)),
        license: { ...datum(model.license.name), ...(model.license.url.state === 'known' ? { href: model.license.url.value } : {}), ...(i18n.locale !== 'fa' && model.license.commercialUse.state === 'known' && model.license.commercialUse.value !== 'allowed' ? { caveat: model.license.commercialUse.value === 'prohibited' ? t('adapters.0213') : t('adapters.0214') } : {}) },
        'released-on': sourceDateValue(model.releasedOn, model.evidenceIds),
        review: known(llmLabel(model.releaseStatus), model.releaseStatus)
      },
      facets: {
        family: known(family?.name ?? model.familyId, family?.name ?? model.familyId),
        'model-version': known(`${model.exactName} · ${model.version.slice(0, 12)}`, model.version),
        publisher: known(model.publisher, model.publisher), 'model-kind': known(llmLabel(model.kind), model.kind),
        'model-stage': known(llmLabel(model.stage), model.stage), 'total-parameters': total, 'active-parameters': active,
        'commercial-use': datum(model.license.commercialUse, llmLabel), 'attention-architecture': model.attentionArchitecture ? known(model.attentionArchitecture === 'hybrid' ? t('adapters.0215') : model.attentionArchitecture, model.attentionArchitecture) : unknown(),
        'size-band': modelSizeBand(model), architecture: known(llmLabel(model.architecture), model.architecture),
        'input-modality': model.inputModalities.map((value) => known(llmLabel(value), value)),
        'output-modality': model.outputModalities.map((value) => known(llmLabel(value), value)),
        application: uses.map((value) => known(applicationLabel(value.applicationId), value.applicationId)),
        language: model.languages.filter((value) => (value.declared.state === 'known' && value.declared.value) || (value.independentEvaluationIds?.some((id) => repository.qualityEvaluations.some((evaluation) => evaluation.id === id)) ?? false)).map((value) => known(value.language, value.language)),
        'persian-evidence': known(llmLabel(model.persianEvidenceStatus), model.persianEvidenceStatus),
        'context-length': formatToken(model.declaredContext),
        license: datum(model.license.name), 'review-status': known(llmLabel(model.releaseStatus), model.releaseStatus),
        'last-reviewed': sourceDateValue(model.lastReviewedOn), 'released-on': sourceDateValue(model.releasedOn, model.evidenceIds)
      },
      details: {
        'model-id': copyValue(model.id), revision: copyValue(model.version),
        'kind-stage': known(`${llmLabel(model.kind)}${model.stage !== 'other' ? ' · ' + llmLabel(model.stage) : ''}`),
        lineage: list([model.baseModelId ? t('adapters.0216', model.baseModelId) : undefined, model.distilledFromModelId ? t('adapters.0217', model.distilledFromModelId) : undefined]),
        modalities, applications: list(uses.map(item => item.summary || applicationLabel(item.applicationId))),
        languages: model.languages.length ? list(model.languages.map((language) => `${language.language}${language.declared.state === 'known' && language.declared.value ? '' : t('adapters.0218')}`)) : unknown('unknown', t('adapters.0219')),
        ...licenseDetails(model.license),
        'total-parameters': total, 'active-parameters': active,
        'parameter-scope': list((model.parameterCounts ?? []).map(item => `${item.label}: ${item.approximate ? t('adapters.0188') : ''}${viewText(formatParameter(item.value))}${item.value.note ? t('adapters.0197') + item.value.note : ''}`)),
        'declared-context': formatToken(model.declaredContext), 'evaluated-context': formatToken(model.evaluatedContext),
        'context-extension': model.contextExtension ? { ...compactToken(model.contextExtension.capacity), note: model.contextExtension.condition } : unknown('unknown', t('adapters.0220')),
        'weight-files': list(repository.artifacts.filter((artifact) => artifact.modelVersionId === model.id).map((artifact) => t('adapters.0221', artifact.weightPrecision.toUpperCase(), viewText(formatMemory(artifact.size))))),
        'weight-caveat': known(t('adapters.0222')),
        'released-on': sourceDateValue(model.releasedOn, model.evidenceIds),
        'last-reviewed': sourceDateValue(model.lastReviewedOn), sources: idList(evidenceIds)
      },
      publishedResults: evaluations, sourceIds: evidenceIds,
      comparison: baseComparison({
        model: known(model.id, model.id), 'model-kind': known(model.kind, model.kind), stage: known(model.stage, model.stage),
        metric: known('total-parameters', 'total-parameters'), unit: known('B', 'B'),
        need: unknown(), workload: unknown(), 'quality-floor': unknown(), 'latency-target': unknown()
      }, [], total.state === 'known')
    };
  });
}
function adaptModelSuitability(repository: LlmGuideRepository): LlmViewRow[] {
  const groups = new Map<string, typeof repository.applicationAssessments>();
  for (const assessment of repository.applicationAssessments) {
    const key = `${assessment.modelVersionId}|${assessment.modelRevision}|${assessment.artifactId ?? ''}`;
    groups.set(key, [...(groups.get(key) ?? []), assessment]);
  }
  return [...groups.entries()].map(([key, assessments]) => {
    const first = assessments[0];
    const model = repository.models.find((item) => item.id === first.modelVersionId);
    const artifact = first.artifactId ? repository.artifacts.find((item) => item.id === first.artifactId) : undefined;
    // Named-model publisher results are never inherited by a quantized artifact.
    const evaluations = first.artifactId ? [] : reportedResults(repository, first.modelVersionId);
    const allEvidence = [...new Set([...assessments.flatMap(item => item.evidenceIds), ...evaluations.flatMap(item => item.evidenceIds)])];
    const matrixCells: Record<string, LlmMatrixCell> = {};
    for (const application of applications) {
      const matches = assessments.filter(item => item.applicationId === application.id);
      if (!matches.length) { matrixCells[application.id] = { value: unknown('unknown', t('adapters.0223')) }; continue; }
      const results = matches.map(item => ({
        id: item.id, value: documentedAssessmentValue(item, repository),
        details: [
          { label: t('adapters.0224'), value: known(llmLabel(item.basis), item.basis) },
          { label: t('adapters.0225'), value: item.rationale ? known(item.rationale) : unknown() },
          { label: t('adapters.0226'), value: datum(item.outcome, llmLabel) },
          { label: t('adapters.0227'), value: item.language ? known(item.language, item.language) : unknown() },
          { label: t('adapters.0228'), value: item.testedVersion ? copyValue(item.testedVersion) : unknown() },
          { label: t('adapters.0229'), value: list(evaluations.filter(result => result.applicationIds.includes(application.id)).map(result => viewText(publishedSummary(result)))) },
          { label: t('adapters.0230'), value: list(item.importantConditions ?? []) },
          { label: t('adapters.0231'), value: list(item.limitations ?? []) }
        ], sourceIds: item.evidenceIds
      }));
      const informative = results.filter(item => item.value.state === 'known');
      matrixCells[application.id] = { value: results.length === 1 ? results[0].value : informative.length ? list(informative.map(item => viewText(item.value))) : unknown(),
        details: results.length === 1 ? results[0].details : undefined, sourceIds: [...new Set(matches.flatMap(item => item.evidenceIds))], results };
    }
    const total = model ? formatParameter(model.totalParametersB) : unknown();
    const usable = assessments.filter(item => documentedAssessmentValue(item, repository).state === 'known');
    return {
      id: `suitability:${key}`, label: `${model?.exactName ?? first.modelVersionId}${artifact ? ` · ${artifact.weightPrecision.toUpperCase()}` : ''}`,
      searchText: `${key} ${model?.exactName ?? ''} ${assessments.map(item => item.summary ?? '').join(' ')}`,
      cells: { 'model-artifact': known(`${model?.exactName ?? first.modelVersionId}${artifact ? ` · ${artifact.weightPrecision.toUpperCase()}` : ''}`) },
      matrixCells,
      facets: {
        application: usable.map(item => known(applicationLabel(item.applicationId), item.applicationId)),
        'assessment-basis': assessments.map(item => known(llmLabel(item.basis), item.basis)),
        'total-parameters': total, 'model-kind': model ? known(llmLabel(model.kind), model.kind) : unknown(),
        subapplication: assessments.map(item => item.subapplicationId ? known(item.subapplicationId, item.subapplicationId) : unknown()),
        language: assessments.map(item => item.language ? known(item.language, item.language) : unknown()),
        'tested-version': assessments.map(item => item.testedVersion ? known(item.testedVersion, item.testedVersion) : unknown()),
        'evidence-kind': evidenceKinds(repository, allEvidence)
      },
      details: {
        revision: copyValue(first.modelRevision), 'assessment-basis': list(assessments.map(item => llmLabel(item.basis))),
        subapplication: list(assessments.map(item => item.subapplicationId)), language: list(assessments.map(item => item.language)),
        'quality-evaluation': list(assessments.map(item => item.qualityEvaluationId)),
        limitations: list(assessments.flatMap(item => item.limitations ?? [])), sources: idList(allEvidence)
      },
      publishedResults: evaluations, sourceIds: allEvidence,
      comparison: baseComparison({
        model: known(key, key), application: assessments.length === 1 ? known(first.applicationId, first.applicationId) : unknown(),
        language: first.language ? known(first.language, first.language) : unknown(), dataset: first.qualityEvaluationId ? known(first.qualityEvaluationId, first.qualityEvaluationId) : unknown(),
        'test-version': first.testedVersion ? known(first.testedVersion, first.testedVersion) : unknown(),
        metric: first.qualityEvaluationId ? known('quality-evaluation', 'quality-evaluation') : unknown(), unit: unknown(),
        need: known(first.applicationId, first.applicationId), workload: unknown(), 'quality-floor': unknown(), 'latency-target': unknown()
      }, assessments.flatMap(item => item.limitations ?? []), Boolean(first.testedVersion && first.qualityEvaluationId))
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
function hardwareFeasibilityGroupKey(deployment: DeploymentConfiguration) {
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
function adaptHardwareFeasibility(repository: LlmGuideRepository): LlmViewRow[] {
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
            { label: t('adapters.0232'), value: known(hardware?.name ?? context.deployment.hardwareConfigId, context.deployment.hardwareConfigId, undefined, undefined, hardware?.evidenceIds) },
            { label: t('adapters.0233'), value: known(stableJson(context.deployment.effectiveSettings)) },
            { label: t('adapters.0234'), value: formatMemory(result.peakVram) },
            { label: t('adapters.0235'), value: formatMemory(result.peakRam) },
            { label: t('adapters.0236'), value: known(`${viewText(formatMemory(result.checkpointStorage))} / ${viewText(formatMemory(result.additionalStorage))} / ${viewText(formatMemory(result.peakTemporaryStorage))}`) },
            { label: t('adapters.0231'), value: result.limitation ? known(result.limitation) : unknown('not-applicable') }
          ],
          sourceIds: evidenceIds
        };
      });
      const statuses = results.map((item) => item.value.state === 'known' ? item.value.display : viewText(item.value));
      matrixCells[target] = {
        value: results.length === 1
          ? results[0].value
          : known(t('adapters.0237', numbers.format(results.length), statuses.join(t('adapters.0184'))), statuses.join('|')),
        details: results.length === 1
          ? results[0].details
          : [{ label: t('adapters.0238'), value: known(results.map((item) => `${item.id} ← ${item.deploymentConfigId}`).join(t('adapters.0184'))) }],
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
        'offload-allowed': known(deployment.offloadAllowed ? t('adapters.0239') : t('adapters.0240'), deployment.offloadAllowed),
        'evidence-kind': evidenceKinds(repository, rowEvidenceIds)
      },
      details: {
        'gpu-memory': list(entries.map((entry) => t('adapters.0241', entry.context.hardware?.name ?? entry.target, entry.context.hardware ? viewText(formatMemory(entry.context.hardware.vramPerGpu)) : t('adapters.0179'), entry.context.hardware ? viewText(formatMemory(entry.context.hardware.aggregateVram)) : t('adapters.0179')))),
        'system-memory': list(entries.map((entry) => `${entry.context.hardware?.name ?? entry.target}: ${entry.context.hardware ? viewText(formatMemory(entry.context.hardware.ram)) : t('adapters.0179')}`)),
        storage: list(entries.map((entry) => t('adapters.0242', entry.context.hardware?.name ?? entry.target, viewText(formatMemory(entry.result.checkpointStorage)), viewText(formatMemory(entry.result.additionalStorage)), viewText(formatMemory(entry.result.peakTemporaryStorage))))),
        'context-concurrency': known(t('adapters.0243', viewText(formatToken(deployment.contextLength)), deployment.batchSize.state === 'known' ? deployment.batchSize.value : t('adapters.0179'), deployment.concurrency.state === 'known' ? deployment.concurrency.value : t('adapters.0179'))),
        offload: known(`${deployment.method} · ${deployment.offloadAllowed ? t('adapters.0244') : t('adapters.0245')}`),
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
  return unknown('unknown', t('adapters.0246'));
}
function adaptSoftwareProducts(repository: LlmGuideRepository): LlmViewRow[] {
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
      ? list(items.map((item) => `${llmLabel(item.capability)}: ${llmLabel(item.status)} (${llmLabel(item.provision)})${item.statusReason ? t('adapters.0247', item.statusReason) : ''}`), items.flatMap(item => item.evidenceIds))
      : noReviewRecord();
    const needTypes = [
      ...(release.roles.includes('user-interface') || release.roles.includes('model-manager') ? ['local-interactive'] : []),
      ...(release.roles.includes('api-server') || release.roles.includes('gateway') ? ['team-api'] : []),
      ...(release.targetScenario?.state === 'known' && release.documentedNeeds?.includes('high-throughput') ? ['high-throughput'] : []),
      ...(claims.some((item) => ['supported', 'conditional'].includes(item.status) && ['task-embedding', 'task-reranking', 'task-classification'].includes(item.capability)) ? ['specialized-task'] : []),
      ...(release.roles.some((role) => ['gateway', 'user-interface', 'deployment-manager'].includes(role)) ? ['composite-service'] : [])
    ];
    const documented = claims.filter(item => ['supported', 'conditional'].includes(item.status) && item.evidenceIds.some(id => repository.evidence.some(source => source.id === id)));
    const important = documented.slice(0, 4);
    const highlights = list(important.map(item => `${llmLabel(item.capability)}${item.provision !== 'native' ? ` (${llmLabel(item.provision)})` : item.status === 'conditional' ? t('adapters.0248') : ''}`), important.flatMap(item => item.evidenceIds));
    return [{
      id: release.id, label: `${product.name} ${release.version}`,
      searchText: [release.id, product.name, release.version, ...(product.aliases ?? []), ...release.roles, ...backends.map((item) => item?.name)].join(' '),
      cells: {
        'software-version': known(`${product.name} · ${release.version}`, release.id, undefined, undefined, release.evidenceIds),
        roles: list(release.roles.map(llmLabel), release.evidenceIds),
        scenario: datum(release.targetScenario),
        'start-docs': { ...known(t('adapters.0249'), product.officialUrl), href: product.officialUrl },
        'backend-summary': datum(release.backendSummary),
        platform: list(release.operatingSystems.length || release.hardwareKinds.length ? [...release.operatingSystems, ...release.hardwareKinds] : release.environments.map(llmLabel), release.evidenceIds),
        'environment-backend': list([...release.environments.map(llmLabel), ...backends.map(item => item ? `${item.name} ${item.version}` : undefined)], sourceIds),
        interfaces: apiClaims.length ? list(apiClaims.map(item => `${item.protocol} ${item.endpoint}: ${llmLabel(item.capability)} (${llmLabel(item.status)})`), apiClaims.flatMap(item => item.evidenceIds)) : noReviewRecord(),
        'service-features': highlights.state === 'known' ? { ...highlights, caveat: release.selectionCaveat } : highlights,
        maintenance: release.maintenanceStatus === 'unknown' ? unknown() : known(llmLabel(release.maintenanceStatus), release.maintenanceStatus, undefined, undefined, release.evidenceIds),
        'released-on': sourceDateValue(release.releasedOn, release.evidenceIds)
      },
      facets: {
        'need-type': needTypes.map((value) => known(value, value)), environment: release.environments.map((value) => known(value, value)),
        'software-role': release.roles.map((value) => known(value, value)), 'software-product': known(product.name, product.id.replace('software-product:', '')),
        'software-version': known(release.version, release.version), backend: (release.documentedBackends?.length ? release.documentedBackends.map(name => known(name, name)) : backends.length ? backends.filter(Boolean).map((item) => known(`${item!.name} ${item!.version}`)) : release.backendSummary?.state === 'known' ? [datum(release.backendSummary)] : unknown()),
        'operating-system': release.operatingSystems.length ? release.operatingSystems.map((value) => known(value, value)) : unknown(),
        'hardware-family': release.hardwareKinds.length ? release.hardwareKinds.map((value) => known(value, value)) : unknown(),
        'local-cloud': release.localOrCloud.map((value) => known(value, value)), offline: datum(release.offlineOperation, (value) => value ? t('adapters.0239') : t('adapters.0240')),
        ...Object.fromEntries(Object.entries(capabilityFacetMap).map(([id, capabilities]) => {
          const items = supported(capabilities);
          return [id, items.length ? items.map((item) => known(item.status, item.status)) : unknown()];
        })),
        provision: claims.length ? claims.map((item) => known(item.provision, item.provision)) : unknown(),
        'software-license': datum(release.license.name), maintenance: known(release.maintenanceStatus, release.maintenanceStatus),
        'last-reviewed': sourceDateValue(release.lastReviewedOn), 'released-on': sourceDateValue(release.releasedOn, release.evidenceIds)
      },
      details: {
        'os-hardware': list([...release.operatingSystems, ...release.hardwareKinds]),
        'local-cloud-offline': known(t('adapters.0250', release.localOrCloud.map(llmLabel).join(t('adapters.0184')), viewText(datum(release.offlineOperation, value => value ? t('adapters.0239') : t('adapters.0240'))))),
        backends: datum(release.backendSummary), 'released-on': sourceDateValue(release.releasedOn, release.evidenceIds),
        'last-reviewed': sourceDateValue(release.lastReviewedOn), 'all-capabilities': summary(claims),
        tasks: summary(supported(capabilityFacetMap.tasks)),
        'request-control': summary(supported(['queueing', 'concurrency', 'continuous-batching', 'admission-control'])),
        'model-lifecycle': summary(supported(['model-load-unload', 'multi-model', 'cold-start-control'])),
        'inference-optimizations': summary(supported(['prefix-caching', 'speculative-decoding', 'cpu-gpu-offload', 'kv-cache-offload', 'layer-wise-loading'])),
        'multi-gpu': summary(supported(['multi-gpu-sharding', 'independent-replicas'])),
        'output-tools': summary(supported(['streaming', 'structured-output', 'tool-use', 'reasoning-control'])),
        'model-scopes': list([...new Set(claims.flatMap((item) => [item.scope.modelTemplate, item.scope.parser, ...item.scope.conditions]))]),
        'operations-security': summary(supported(['monitoring', 'metrics', 'health-check', 'authentication', 'rate-limiting'])),
        'api-compatibility': apiClaims.length
          ? list(apiClaims.map((item) => `${item.protocol} ${item.endpoint} / ${llmLabel(item.capability)}: ${llmLabel(item.status)} (${llmLabel(item.provision)})${item.statusReason ? t('adapters.0247', item.statusReason) : ''}`))
          : noReviewRecord(),
        ...licenseDetails(release.license), sources: idList(sourceIds)
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
function adaptDeploymentCompatibility(repository: LlmGuideRepository): LlmViewRow[] {
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
        storage: feasibility ? known(t('adapters.0251', viewText(formatMemory(feasibility.checkpointStorage)), viewText(formatMemory(feasibility.additionalStorage)), viewText(formatMemory(feasibility.peakTemporaryStorage)))) : unknown('not-measured'),
        'airllm-scope': air ? known(`${air.airLlmSoftwareReleaseId} · ${air.supportedModelArchitecture} · ${air.modelRevision}`) : unknown('not-applicable'),
        preparation: air ? known(t('adapters.0252', air.preparationTime.state === 'known' ? air.preparationTime.value : air.preparationTime.state, air.startupTime.state === 'known' ? air.startupTime.value : air.startupTime.state)) : unknown('not-applicable'),
        'latency-throughput': air ? known(t('adapters.0253', air.ttft.state === 'known' ? air.ttft.value : air.ttft.state, air.generationThroughput.state === 'known' ? air.generationThroughput.value : air.generationThroughput.state, air.totalTime.state === 'known' ? air.totalTime.value : air.totalTime.state)) : unknown('not-applicable'),
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
function adaptBenchmarks(repository: LlmGuideRepository): LlmViewRow[] {
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
        workload: known(`${run.dataset ?? t('adapters.0254')} · ${run.language ?? t('adapters.0255')} · ${workload?.name ?? deployment.workloadId}`),
        ttft, tpot,
        throughput: known(t('adapters.0256', perRequest.state === 'known' ? perRequest.display : perRequest.state, aggregate.state === 'known' ? aggregate.display : aggregate.state), undefined,
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
        'length-distributions': known(t('adapters.0257', run.inputLength.state, run.outputLength.state)),
        load: known(t('adapters.0258', run.contextLength.state === 'known' ? run.contextLength.value : run.contextLength.state, run.batchSize.state === 'known' ? run.batchSize.value : run.batchSize.state, run.concurrency.state === 'known' ? run.concurrency.value : run.concurrency.state, run.arrivalRate.state === 'known' ? run.arrivalRate.value : run.arrivalRate.state)),
        reasoning: known(t('adapters.0259', run.reasoningMode.state === 'known' ? run.reasoningMode.value : run.reasoningMode.state, run.reasoningBudget.state === 'known' ? run.reasoningBudget.value : run.reasoningBudget.state)),
        optimizations: known(`prefix: ${run.prefixCaching.state === 'known' ? run.prefixCaching.value : run.prefixCaching.state} · speculative: ${run.speculativeDecoding.state === 'known' ? run.speculativeDecoding.value : run.speculativeDecoding.state} · ${JSON.stringify(run.effectiveSettings)}`),
        statistics: list([...run.ttft, ...run.tpotOrItl, ...run.totalLatency, ...run.perRequestThroughput, ...run.aggregateThroughput].map((item) => item.statistic)),
        outcomes: known(t('adapters.0260', run.errors, run.timeouts, run.successfulRequests)),
        resources: known(t('adapters.0261', run.peakVram.state, run.peakRam.state, run.energy.state)),
        'run-state': known(t('adapters.0262', run.warmup.state, run.coldStart.state, run.steadyStateDuration.state)),
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
function adaptSpecializedModels(repository: LlmGuideRepository): LlmViewRow[] {
  return repository.specializedAssessments.map((assessment) => {
    const model = repository.models.find(item => item.id === assessment.modelVersionId);
    const workload = repository.workloads.find(item => item.id === assessment.workloadId);
    const total = model ? formatParameter(model.totalParametersB) : unknown();
    const specs = model?.specializedSpecs;
    const evaluations = assessment.artifactId ? [] : reportedResults(repository, assessment.modelVersionId);
    const evidenceIds = [...new Set([...assessment.evidenceIds, ...(model?.evidenceIds ?? []), ...evaluations.flatMap(item => item.evidenceIds)])];
    return {
      id: assessment.id, label: model?.exactName ?? assessment.modelVersionId,
      searchText: [assessment.id, model?.exactName, assessment.kind, assessment.applicationId, ...evaluations.map(item => item.benchmark)].join(' '),
      cells: {
        'model-kind': known(model?.exactName ?? assessment.modelVersionId),
        task: specs ? datum(specs.task) : known(llmLabel(assessment.kind)),
        parameters: model ? modelParameterSummary(model) : unknown(),
        'input-limit': model ? modelContextSummary(model) : unknown(),
        output: specs ? datum(specs.output) : unknown(),
        features: specs ? datum(specs.features) : unknown(),
        'quality-metric': datum(assessment.metricValue, value => `${numbers.format(value)} ${assessment.metricUnit}`, value => ({ number: value, unit: assessment.metricUnit })),
        'work-rate': unknown('not-measured'),
        'released-on': sourceDateValue(model?.releasedOn, evidenceIds)
      },
      facets: {
        kind: known(llmLabel(assessment.kind), assessment.kind), application: known(applicationLabel(assessment.applicationId), assessment.applicationId),
        'total-parameters': total, 'size-band': model ? modelSizeBand(model) : unknown(),
        subapplication: workload?.subapplicationId ? known(workload.subapplicationId, workload.subapplicationId) : unknown(),
        metric: evaluations.length ? evaluations.map(item => known(`${item.benchmark} · ${item.metric}`, item.metric)) : assessment.metricValue.state === 'known' ? known(assessment.metricName, assessment.metricName) : unknown('not-measured'),
        'metric-unit': evaluations.length ? evaluations.map(item => known(item.unit, item.unit)) : assessment.metricValue.state === 'known' ? known(assessment.metricUnit, assessment.metricUnit) : unknown('not-measured'),
        language: model?.languages.length ? model.languages.filter(item => item.declared.state === 'known' && item.declared.value).map(item => known(item.language, item.language)) : workload?.language ? known(workload.language, workload.language) : specs ? datum(specs.languages) : unknown(),
        'evidence-kind': evidenceKinds(repository, evidenceIds)
      },
      details: {
        pooling: specs ? datum(specs.poolingOrScoring) : unknown(), dimensions: specs ? datum(specs.embeddingDimensions, value => numbers.format(value), value => ({ number: value, unit: 'dimension' })) : unknown(),
        'adjustable-dimensions': specs ? datum(specs.adjustableDimensions) : unknown('not-applicable'),
        languages: specs ? datum(specs.languages) : unknown(),
        'language-dataset': workload?.language ? known(workload.language) : unknown(),
        'artifact-execution': assessment.artifactId ? copyValue(`${assessment.artifactId} · ${assessment.modelRevision}`) : copyValue(assessment.modelRevision),
        'parameter-scope': model ? list((model.parameterCounts ?? []).map(item => `${item.label}: ${viewText(formatParameter(item.value))}`)) : unknown(),
        'released-on': sourceDateValue(model?.releasedOn, evidenceIds),
        workload: known(`${workload?.name ?? assessment.workloadId} · ${assessment.metricUnit}`),
        'generative-alternative': assessment.alternativeToGenerativeModelId ? known(assessment.alternativeToGenerativeModelId) : unknown('not-applicable'),
        limitations: list(assessment.limitations ?? []), sources: idList(evidenceIds)
      },
      publishedResults: evaluations, sourceIds: evidenceIds,
      comparison: baseComparison({
        model: known(`${assessment.modelVersionId}|${assessment.artifactId ?? ''}`), task: known(assessment.applicationId, assessment.applicationId),
        dataset: unknown(), language: workload?.language ? known(workload.language, workload.language) : unknown(),
        metric: assessment.metricValue.state === 'known' ? known(assessment.metricName, assessment.metricName) : unknown(),
        unit: assessment.metricValue.state === 'known' ? known(assessment.metricUnit, assessment.metricUnit) : unknown(),
        workload: known(assessment.workloadId, assessment.workloadId), need: known(assessment.applicationId, assessment.applicationId),
        'quality-floor': workload?.qualityFloor ? known(`${workload.qualityFloor.metric}:${workload.qualityFloor.minimum}`) : unknown(),
        'latency-target': workload?.serviceLevel ? known(JSON.stringify(workload.serviceLevel)) : unknown()
      }, assessment.limitations ?? [], assessment.metricValue.state === 'known')
    };
  });
}
const modelUseRoleLabels: Record<string, string> = {
  retrieval: t('adapters.0263'), reranking: t('adapters.0264'), 'grounded-generation': t('adapters.0265'),
  'text-generation': t('adapters.0266'), 'code-completion': t('adapters.0267'), coding: t('adapters.0268'), 'tool-use': t('adapters.0269'),
  reasoning: t('adapters.0270'), vision: t('adapters.0271'), 'structured-output': t('adapters.0272')
};
function profileRow(repository: LlmGuideRepository, row: LlmViewRow, modelId: string): LlmViewRow {
  const profile = repository.modelProfiles.find(item => item.modelVersionId === modelId);
  if (!profile) return row;
  const uses = repository.modelUseGuidance.filter(item => item.modelVersionId === modelId);
  const downloads = repository.artifactListings.filter(item => item.modelVersionId === modelId);
  const model = repository.models.find(item => item.id === modelId)!;
  return { ...row, modelId, modelUrl: profile.officialUrl,
    downloadLinks: [...new Map(downloads.map(item => [`${item.format}:${item.repositoryUrl}`, {
      label: `${item.format.toUpperCase()} · ${item.authority === 'official' ? t('adapters.0273') : t('adapters.0274')}`, href: item.repositoryUrl
    }])).values()],
    searchText: `${row.searchText} ${profile.introduction} ${uses.map(item => item.summary).join(' ')} ${profile.runGuides.map(item => item.engine).join(' ')} ${downloads.map(item => `${item.format} ${item.variant} ${item.publisher}`).join(' ')}`,
    cells: { ...row.cells, 'primary-use': known(profile.roleSummary), applications: known(profile.roleSummary),
      downloads: known([...new Set(downloads.map(item => item.format.toUpperCase()))].join(' · ')),
      introduction: profile.introduction.replace(/[.؛،\s]+$/u, '') === profile.roleSummary.replace(/[.؛،\s]+$/u, '') ? unknown('not-applicable') : known(profile.introduction), role: list([...new Set(uses.map(item => modelUseRoleLabels[item.role]))]),
      'use-condition': list([...new Set(uses.flatMap(item => item.conditions))]),
      'use-basis': list([...new Set(uses.map(item => item.basis === 'publisher-summary' ? t('adapters.0275') : t('adapters.0276')))]),
      model: known(model.exactName), 'model-artifact': known(model.exactName) },
    facets: { ...row.facets, 'model-size': formatParameter(model.totalParametersB.state === 'known' ? model.totalParametersB : model.parameterCounts?.find(item => item.scope === 'nominal')?.value ?? { state: 'unknown' }), application: uses.map(item => known(applicationLabel(item.applicationId), item.applicationId)),
      'run-engine': [...new Set(profile.runGuides.map(item => item.engine).filter(engine => !engine.includes(t('adapters.0277'))))].map(engine => known(engine, engine)),
      'download-format': [...new Set(downloads.map(item => item.format))].map(format => known(format, format)),
      'download-authority': [...new Set(downloads.map(item => item.authority))].map(authority => known(authority, authority)),
      'use-basis': [...new Set(uses.map(item => item.basis))].map(value => known(value, value)),
      'use-role': uses.map(item => known(modelUseRoleLabels[item.role], item.role)) },
    sourceIds: [...new Set([...row.sourceIds, ...profile.evidenceIds, ...uses.flatMap(item => item.evidenceIds)])]
  };
}
function adaptModelUseGuidance(repository: LlmGuideRepository): LlmViewRow[] {
  return adaptModelCatalog(repository)
    .filter(row => repository.modelUseGuidance.some(item => item.modelVersionId === row.id))
    .map(row => profileRow(repository, { ...row, id: `use:${row.id}` }, row.id));
}
function adaptModelUseMatrix(repository: LlmGuideRepository): LlmViewRow[] {
  return adaptModelUseGuidance(repository).filter(row => {
    const kind = repository.models.find(model => model.id === row.modelId)?.kind;
    return kind === 'generative' || kind === 'vision-language';
  }).map(row => {
    const model = repository.models.find(model => model.id === row.modelId)!;
    const guidance = repository.modelUseGuidance.filter(item => item.modelVersionId === row.modelId);
    const matrixCells: Record<string, LlmMatrixCell> = {};
    for (const item of guidance) matrixCells[item.applicationId] = {
      value: { ...known(item.summary, item.applicationId), badge: modelUseRoleLabels[item.role] },
      details: [
        { label: t('adapters.0278'), value: known(item.description) },
        ...(item.conditions.length ? [{ label: t('adapters.0279'), value: known(item.conditions.join(t('adapters.0197'))) }] : []),
        { label: t('adapters.0280'), value: known(item.basis === 'publisher-summary' ? t('adapters.0281') : t('adapters.0282')) }
      ], sourceIds: item.evidenceIds
    };
    if (model.inputModalities.length === 1 && model.inputModalities[0] === 'text') matrixCells['document-vision'] = {
      value: known(t('adapters.0283')),
      details: [{ label: t('adapters.0284'), value: known(t('adapters.0285')) }],
      sourceIds: model.evidenceIds
    };
    return { ...row, matrixCells };
  });
}
function buildLlmViewRows(repository: LlmGuideRepository): Record<LlmViewId, LlmViewRow[]> {
  return {
    'model-catalog': adaptModelCatalog(repository).map(row => profileRow(repository, row, row.id)),
    'model-suitability': repository.modelUseGuidance.length ? adaptModelUseGuidance(repository) : adaptModelSuitability(repository),
    'hardware-feasibility': adaptHardwareFeasibility(repository),
    'software-products': adaptSoftwareProducts(repository),
    'deployment-compatibility': adaptDeploymentCompatibility(repository),
    benchmarks: adaptBenchmarks(repository),
    'specialized-models': adaptSpecializedModels(repository).map(row => {
      const assessment = repository.specializedAssessments.find(item => item.id === row.id);
      return assessment ? profileRow(repository, row, assessment.modelVersionId) : row;
    })
  };
}
function validateIds(repository: LlmGuideRepository, errors: string[]) {
  const collections: Array<[string, Array<{ id: string }>]> = [
    ['artifactListings', repository.artifactListings], ['modelProfiles', repository.modelProfiles], ['modelUseGuidance', repository.modelUseGuidance],
    ['families', repository.families], ['models', repository.models], ['artifacts', repository.artifacts],
    ['softwareProducts', repository.softwareProducts], ['softwareReleases', repository.softwareReleases],
    ['engines', repository.engines], ['servingStacks', repository.servingStacks],
    ['deploymentConfigurations', repository.deploymentConfigurations], ['softwareCapabilities', repository.softwareCapabilities],
    ['apiCompatibility', repository.apiCompatibility], ['hardwareConfigurations', repository.hardwareConfigurations],
    ['workloads', repository.workloads], ['qualityEvaluations', repository.qualityEvaluations], ['publishedEvaluations', repository.publishedEvaluations],
    ['applicationAssessments', repository.applicationAssessments], ['executionFeasibility', repository.executionFeasibility],
    ['deploymentCompatibility', repository.deploymentCompatibility], ['benchmarkRuns', repository.benchmarkRuns],
    ['specializedAssessments', repository.specializedAssessments],
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
function validateLlmRepository(repository: LlmGuideRepository) {
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

  for (const collection of [repository.artifactListings, repository.modelProfiles, repository.modelUseGuidance]) for (const item of collection) {
    requireRef(errors, item.id, 'modelVersionId', item.modelVersionId, sets.models);
    if (!item.evidenceIds.length) errors.push(`${item.id} needs evidence`);
    for (const evidenceId of item.evidenceIds) requireRef(errors, item.id, 'evidenceIds', evidenceId, sets.evidence);
  }
  for (const item of repository.modelUseGuidance) {
    if (!applications.some(app => app.id === item.applicationId)) errors.push(`${item.id} invalid application`);
    if (!item.summary.trim() || !item.description.trim()) errors.push(`${item.id} incomplete guidance`);
    if ('outcome' in item) errors.push(`${item.id} guidance must not carry an experimental outcome`);
  }
  for (const item of repository.artifactListings) {
    const model = repository.models.find(model => model.id === item.modelVersionId);
    if (!model?.aliases?.includes(item.baseModelRepository)) errors.push(`${item.id} base model identity does not match`);
    if (!item.repositoryUrl.startsWith('https://') || !item.filesUrl.startsWith('https://')) errors.push(`${item.id} invalid download URL`);
    if (item.format !== 'ollama' && !item.files.length && item.inventoryStatus !== 'not-recorded') errors.push(`${item.id} missing verified files`);
    if (item.inventoryStatus === 'not-recorded' && (item.files.length || item.totalBytes !== undefined || !item.sizeDescription?.trim())) errors.push(`${item.id} unrecorded inventory carries file measurements`);
    if (item.totalBytes !== undefined && item.files.every(file => file.bytes !== undefined) && item.totalBytes !== item.files.reduce((sum, file) => sum + file.bytes!, 0)) errors.push(`${item.id} inconsistent file sizes`);
  }
  for (const profile of repository.modelProfiles) {
    if (!profile.introduction.trim() || !profile.roleSummary.trim() || !profile.runGuides.length) errors.push(`${profile.id} incomplete profile`);
    for (const run of profile.runGuides) {
      if (!run.href.startsWith('https://') || !run.engine.trim() || !run.label.trim() || !run.evidenceIds.length ||
        (run.instructions !== undefined && !run.instructions.trim()) || run.conditions.some(condition => !condition.trim())) errors.push(`${profile.id} incomplete run path`);
      for (const id of run.evidenceIds) requireRef(errors, profile.id, 'runGuide.evidence', id, sets.evidence);
    }
  }
  for (const model of repository.models) {
    if (model.releasedOn && !sourceDateRange(model.releasedOn)) errors.push(`${model.id}.releasedOn is not a valid source date`);
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
  for (const result of repository.publishedEvaluations) {
    requireRef(errors, result.id, 'modelVersionId', result.modelVersionId, sets.models);
    const model = repository.models.find(item => item.id === result.modelVersionId);
    if (model && ![model.exactName, ...(model.aliases ?? [])].includes(result.reportedModelName)) errors.push(`${result.id} reportedModelName does not identify the named model`);
    if (!result.evidenceIds.length || !result.reporter.trim() || !result.benchmark.trim() || !result.metric.trim() || !result.unit.trim() || !Number.isFinite(result.value)) errors.push(`${result.id} published result lacks a source or a meaningful metric`);
    for (const field of ['artifactId', 'artifactRevision', 'deploymentConfigId', 'hardwareConfigId']) {
      if (field in result) errors.push(`${result.id} cannot bind a PublishedEvaluation to ${field}; use the exact-execution contract`);
    }
    for (const [field, value] of Object.entries({ evaluatedOn: result.evaluatedOn, publishedOn: result.publishedOn, accessedOn: result.accessedOn })) {
      if (value && !sourceDateRange(value)) errors.push(`${result.id}.${field} is not a valid source date`);
    }
  }
  for (const release of repository.softwareReleases) {
    requireRef(errors, release.id, 'productId', release.productId, sets.products);
    if (release.releasedOn && !sourceDateRange(release.releasedOn)) errors.push(`${release.id}.releasedOn is not a valid source date`);
  }
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
function assertValidLlmRepository(repository: LlmGuideRepository) {
  const errors = validateLlmRepository(repository);
  if (errors.length) throw new Error(`Invalid LLM repository:\n${errors.join('\n')}`);
}
return { documentedAssessmentValue, adaptModelCatalog, adaptModelSuitability, hardwareFeasibilityGroupKey, adaptHardwareFeasibility, adaptSoftwareProducts, adaptDeploymentCompatibility, adaptBenchmarks, adaptSpecializedModels, modelUseRoleLabels, adaptModelUseGuidance, adaptModelUseMatrix, buildLlmViewRows, validateLlmRepository, assertValidLlmRepository };
}
