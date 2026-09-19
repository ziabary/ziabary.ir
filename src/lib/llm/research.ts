import rawLegacyArtifacts from '../../../data/llm/v0.2.0/data/artifacts.json';
import rawPlanningArtifacts from '../../../data/llm/v0.3.0/planning-artifacts.json';
import rawHardware from '../../../data/llm/v0.2.0/data/hardware.json';
import rawCpuProfiles from '../../../data/llm/v0.2.0/data/cpu-profiles.json';
import rawMemoryPolicy from '../../../data/llm/v0.2.0/data/memory-policy.json';
import rawPerformanceJson from '../../../data/llm/v0.2.0/data/published-performance.json';
import rawQuality from '../../../data/llm/v0.2.0/data/published-quality.json';
import rawLegacySources from '../../../data/llm/v0.2.0/data/sources.json';
import rawPlanningSources from '../../../data/llm/v0.3.0/planning-sources.json';
import rawCompatibility from '../../../data/llm/v0.2.0/data/compatibility.json';
import rawKernels from '../../../data/llm/v0.2.0/data/quantization-hardware-support.json';
import rawAliases from '../../../data/llm/v0.2.0/data/model-aliases.json';
import rawSlmCpu from '../../../data/llm/v0.2.0/data/slm-cpu-planning.json';
import rawAirllm from '../../../data/llm/v0.2.0/data/airllm-observations.json';
import rawMemoryClaims from '../../../data/llm/v0.2.0/data/published-memory-claims.json';
import rawSpecialized from '../../../data/llm/v0.2.0/data/specialized-models.json';
import rawSoftware from '../../../data/llm/v0.2.0/data/software-guidance.json';
import rawStartingPoints from '../../../data/llm/v0.2.0/data/task-starting-points.json';
import { evaluationLanguage, samePublishedResult } from './evaluation';
import type { LlmGuideRepository, Evidence, PublishedEvaluation, ArtifactListing } from './schema';
export interface ReportedPerformance {
  id: string; publicationGroup: string; modelRepository?: string; modelLabel?: string;
  artifactName?: string; hardwareLabel: string; gpuCount: number; engine: string;
  engineVersion?: string; engineRevision?: string; engineRevisionUrl?: string;
  reporter?: string; weightFormat: string; metrics: Record<string, number>;
  protocol: Record<string, string | number | boolean>; sourceIds: string[];
  flashAttention?: boolean; gpuLayers?: number; comparisonScope?: string;
  sourceLocator?: string; servingCommandAsPublished?: string;
  weightInitialization?: string; publishedOn?: string;
}
export type MemoryArtifact = (typeof rawLegacyArtifacts | typeof rawPlanningArtifacts)[number];
export interface MemoryPlan { weightGiB: number; kvGiB: number; budgetGiB: number; reserveGiB: number; }
import type { LlmI18n } from './i18n/runtime';

/** Text and formatting are edition-scoped; no mutable global locale. */
export function createLlmResearch(i18n: LlmI18n) {
const { t, locale, numberFormat } = i18n;
const legacyArtifacts = i18n.records('research.artifacts', rawLegacyArtifacts);
const planningArtifacts = i18n.records('research.planning-artifacts', rawPlanningArtifacts);
const hardware = i18n.records('research.hardware', rawHardware);
const cpuProfiles = i18n.records('research.cpu-profiles', rawCpuProfiles);
const memoryPolicy = i18n.records('research.memory-policy', rawMemoryPolicy);
const performanceJson = i18n.records('research.published-performance', rawPerformanceJson);
const quality = i18n.records('research.published-quality', rawQuality);
const legacySources = i18n.records('research.sources', rawLegacySources);
const planningSources = i18n.records('research.planning-sources', rawPlanningSources);
const compatibility = i18n.records('research.compatibility', rawCompatibility);
const kernels = i18n.records('research.quantization-hardware-support', rawKernels);
const aliases = i18n.records('research.model-aliases', rawAliases);
const slmCpu = i18n.records('research.slm-cpu-planning', rawSlmCpu);
const airllm = i18n.records('research.airllm-observations', rawAirllm);
const memoryClaims = i18n.records('research.published-memory-claims', rawMemoryClaims);
const specialized = i18n.records('research.specialized-models', rawSpecialized);
const software = i18n.records('research.software-guidance', rawSoftware);
const startingPoints = i18n.records('research.task-starting-points', rawStartingPoints);

const artifacts = [...legacyArtifacts, ...planningArtifacts];
const sources: typeof legacySources = [...legacySources, ...planningSources];
const research = {
  artifacts, hardware, cpuProfiles, memoryPolicy, performance: performanceJson as unknown as ReportedPerformance[],
  quality, sources, compatibility, kernels, aliases, slmCpu, airllm, memoryClaims,
  specialized, software, startingPoints
};
const researchAsOf = '2026-09-16';
const faNumber = (value: number, decimals = 2) => new Intl.NumberFormat(numberFormat, { maximumFractionDigits: decimals }).format(value);
const researchEvidenceId = (id: string): Evidence['id'] => `evidence:research-v02-${id}`;
function canonicalModelRepository(name: string): string {
  const alias = aliases.find(item => item.asPublished.toLowerCase() === name.toLowerCase());
  return (alias?.canonical ?? name).toLowerCase();
}
function researchModel(repository: LlmGuideRepository, name?: string) {
  if (!name) return undefined;
  const normalized = canonicalModelRepository(name);
  return repository.models.find(model => model.aliases?.some(alias => canonicalModelRepository(alias) === normalized));
}
const researchEvidence: Evidence[] = sources.map(source => ({
  id: researchEvidenceId(source.id), url: source.url, title: source.title,
  organization: source.publisher ?? undefined, accessedOn: source.accessedOn,
  ...(source.publishedOn && /^\d{4}-\d{2}-\d{2}$/.test(source.publishedOn) ? { publishedOn: source.publishedOn } : {}),
  locator: source.locator ?? source.title, sourceKind: 'primary',
  kind: source.kind.startsWith('first-hand-') ? 'third-party-report' : source.kind.startsWith('primary-') ? 'documented-specification' : 'publisher-report',
  versionRevisionOrCommit: source.documentRevision ?? source.revisionUrl,
  scope: source.kind === 'first-hand-synthetic-benchmark' ? t('research.0647')
    : source.kind.includes('benchmark') ? t('research.0648')
    : source.title,
  limitations: [],
  presentationNotes: [
    ...(source.kind === 'first-hand-synthetic-benchmark' ? [t('research.0647')] : []),
    ...(source.kind === 'first-hand-hosting-provider-benchmark' ? [t('research.0649')] : [])
  ],
  ...(source.kind === 'first-hand-hosting-provider-benchmark'
    ? { commercialInterest: t('research.0649') } : {})
}));
const reasoningModeLabels: Record<string, string> = {
  'reasoning': t('research.0650'), 'instruct': t('research.0651'), 'non-thinking': t('research.0652'),
  'extended-thinking': t('research.0653')
};
function enrichResearchRepository(base: LlmGuideRepository): LlmGuideRepository {
  const publishedEvaluations = base.publishedEvaluations.map(item => ({ ...item, evidenceIds: [...item.evidenceIds] }));
  for (const score of quality) {
    const model = researchModel(base, score.modelRepository);
    if (!model) throw new Error(`Unresolved quality model: ${score.modelRepository}`);
    const coding = /Code|code|HumanEval/.test(score.dataset);
    const retrieval = /MTEB|MMTEB|MIRACL|MLDR/.test(score.dataset);
    const settings: Record<string, string | number | boolean> = {};
    for (const [key, value] of Object.entries(score.protocol ?? {})) if (value !== undefined) settings[key] = value;
    const evaluation: PublishedEvaluation = {
      id: `published-evaluation:v02-${score.id}`, modelVersionId: model.id,
      reportedModelName: score.modelRepository, reporter: score.reporter,
      reportingRelationship: canonicalModelRepository(score.modelRepository).startsWith('qwen/') && score.reporter === 'HuggingFaceTB' ? 'third-party' : 'publisher',
      benchmark: score.dataset, metric: score.metric, value: score.value,
      unit: score.metric === 'rating' ? 'rating' : 'score', settings,
      mode: score.mode ?? undefined, comparisonGroup: score.comparisonGroup,
      applicationIds: retrieval ? ['enterprise-rag'] : coding ? ['coding-assistant'] : /IFEval|Rewrite/.test(score.dataset) ? ['text-work'] : ['reasoning-analysis'],
      accessedOn: researchAsOf, language: score.dataset === 'MTEB-R' ? 'en' : undefined,
      languageScope: evaluationLanguage(score.dataset === 'MTEB-R' ? 'en' : undefined),
      limitations: [t('research.0654'), t('research.0655')],
      evidenceIds: score.sourceIds.map(researchEvidenceId)
    };
    const previous = publishedEvaluations.find(item => samePublishedResult(item, evaluation));
    if (previous) previous.evidenceIds = [...new Set([...previous.evidenceIds, ...evaluation.evidenceIds])];
    else publishedEvaluations.push(evaluation);
  }
  const artifactListings = base.artifactListings.map(item => ({ ...item }));
  for (const artifact of artifacts) {
    const model = researchModel(base, artifact.modelRepository);
    if (!model) throw new Error(`Unresolved artifact model: ${artifact.modelRepository}`);
    const repositoryUrl = `https://huggingface.co/${artifact.repository}`;
    const previous = artifactListings.find(item => item.modelVersionId === model.id
      && item.repositoryUrl.toLowerCase() === repositoryUrl.toLowerCase()
      && item.files.length === artifact.files.length && item.files.every(file => artifact.files.some(candidate => candidate.name === file.path)));
    const listing: ArtifactListing = {
      id: previous?.id ?? `artifact-listing:v02-${artifact.id}`, modelVersionId: model.id,
      baseModelRepository: artifact.modelRepository, publisher: artifact.repository.split('/')[0],
      authority: artifact.authority === 'model-publisher' ? 'official' : 'third-party',
      format: 'gguf', variant: artifact.quantization, quantizationMethod: artifact.quantization,
      repositoryUrl, repositoryRevision: artifact.repositoryRevision,
      filesUrl: `${repositoryUrl}/tree/${artifact.repositoryRevision}`,
      files: artifact.files.map(file => ({ path: file.name, bytes: file.bytes, url: `${repositoryUrl}/resolve/${artifact.repositoryRevision}/${file.name}` })),
      totalBytes: artifact.weightFileBytes, verifiedOn: researchAsOf,
      scopeNote: t('research.0656', faNumber(artifact.artifactContextLimitTokens, 0)),
      evidenceIds: [...new Set([...(previous?.evidenceIds ?? []), ...artifact.sourceIds.map(researchEvidenceId)])]
    };
    if (previous) Object.assign(previous, listing); else artifactListings.push(listing);
  }
  return { ...base, evidence: [...base.evidence, ...researchEvidence], publishedEvaluations, artifactListings };
}
function calculateMemory(artifact: MemoryArtifact, context: number, active: number, gpuCount = 1, cpu = false): MemoryPlan | undefined {
  if (!['llama', 'qwen2', 'qwen3', 'qwen3_moe', 'qwen3moe', 'command-r', 'phi3', 'granite'].includes(artifact.architecture)) return undefined;
  if (!Number.isInteger(context) || context < 1 || context > artifact.artifactContextLimitTokens || !Number.isInteger(active) || active < 1 || !Number.isInteger(gpuCount) || gpuCount < 1) return undefined;
  if (![artifact.layers, artifact.kvHeads, artifact.headDim, artifact.weightFileBytes].every(value => Number.isFinite(value) && value > 0)) return undefined;
  const weightGiB = artifact.weightFileBytes / 2 ** 30;
  const kvGiB = 2 * artifact.layers * artifact.kvHeads * artifact.headDim * context * active * memoryPolicy.kvBytesPerElement / 2 ** 30;
  const reserveGiB = cpu ? memoryPolicy.cpuReserveGiB : memoryPolicy.gpuReserveGiBPerDevice * gpuCount;
  return { weightGiB, kvGiB, reserveGiB, budgetGiB: weightGiB + kvGiB + reserveGiB };
}
function memoryStatus(required: number, capacity: number, devices = 1) {
  if (required > capacity) return { id: 'over-budget', label: t('research.0657'), note: t('research.0658') };
  if (devices > 1) {
    const oneDeviceRequired = required - memoryPolicy.gpuReserveGiBPerDevice * (devices - 1);
    if (oneDeviceRequired <= capacity / devices) return { id: 'single-device-sufficient', label: t('research.0659'), note: t('research.0660') };
    return { id: 'requires-sharding', label: t('research.0661'), note: t('research.0662') };
  }
  if (capacity - required < Math.max(2, capacity * .1)) return { id: 'tight', label: t('research.0663'), note: t('research.0664') };
  return { id: 'within-budget', label: t('research.0665'), note: '' };
}
return { research, researchAsOf, faNumber, researchEvidenceId, canonicalModelRepository, researchModel, researchEvidence, reasoningModeLabels, enrichResearchRepository, calculateMemory, memoryStatus };
}
