import type { ReferenceObservation, ReferenceComparison, ReferenceGuidance, ReferenceArticleSection, QuantizationObservation } from './reference-types';
/**
 * Canonical, evidence-first data contract for the LLM selection guide.
 *
 * Comparative content stays outside UI components. A missing value is never
 * encoded as zero, and no capability is inherited from a family, base model,
 * backend, or differently quantized artifact without an explicit scoped claim.
 */

export type EntityId<Kind extends string> = `${Kind}:${string}`;
export type ModelFamilyId = EntityId<'family'>;
export type ModelVersionId = EntityId<'model'>;
export type ArtifactId = EntityId<'artifact'>;
export type SoftwareProductId = EntityId<'software-product'>;
export type SoftwareReleaseId = EntityId<'software-release'>;
export type EngineId = EntityId<'engine'>;
export type ServingStackId = EntityId<'serving-stack'>;
export type DeploymentConfigId = EntityId<'deployment'>;
/** Kept as an alias for migration from the first draft contract. */
export type ExecutionConfigId = DeploymentConfigId;
export type HardwareConfigId = EntityId<'hardware'>;
export type WorkloadId = EntityId<'workload'>;
export type QualityEvaluationId = EntityId<'quality'>;
export type PublishedEvaluationId = EntityId<'published-evaluation'>;
export type BenchmarkRunId = EntityId<'benchmark'>;
export type EvidenceId = EntityId<'evidence'>;
export type ClaimId = EntityId<'claim'>;
export type SoftwareCapabilityClaimId = EntityId<'software-capability'>;
export type ApiCompatibilityClaimId = EntityId<'api-compatibility'>;
export type PlannedArticleId = EntityId<'planned-article'>;

export type MissingReason = 'unknown' | 'not-measured' | 'not-applicable';
export type Datum<T, Unit extends string = never> =
  | {
      state: 'known';
      value: T;
      unit?: Unit;
      evidenceIds?: EvidenceId[];
      note?: string;
    }
  | {
      state: MissingReason;
      note?: string;
      evidenceIds?: EvidenceId[];
    };

export type MemoryUnit = 'MB' | 'MiB' | 'GB' | 'GiB' | 'TB' | 'TiB';
export type StorageUnit = MemoryUnit;
export type DurationUnit = 'ms' | 's' | 'min' | 'h';
export type EnergyUnit = 'J' | 'Wh' | 'kWh';
export type PowerUnit = 'W' | 'kW';
export type ThroughputUnit =
  | 'output-token/s/request'
  | 'output-token/s/aggregate'
  | 'request/s'
  | 'document/s'
  | 'query/s';
export type ParameterUnit = 'billion-parameters';
export type TokenUnit = 'token';

export type EvidenceKind =
  | 'direct-measurement'
  | 'publisher-report'
  | 'third-party-report'
  | 'documented-specification'
  | 'calculated-from-specifications'
  | 'editorial-analysis'
  | 'unknown-needs-review';
export type EvidenceSourceKind = 'primary' | 'secondary';

export interface DerivationInput {
  field: string;
  value: string | number | boolean;
  unit?: string;
  evidenceId: EvidenceId;
  /** Exact table, section, line, file, or JSON path for this input. */
  locator: string;
}

export interface DerivationRecord {
  method: string;
  inputs: DerivationInput[];
  formulaOrProcedure: string;
  assumptions: string[];
  rounding: string;
}

export interface Evidence {
  sourceCapture?: { sourceId: string; capturedAt: string; contentSha256: string; revisionMeaning: string };
  /** Editorial display selection, reviewed independently of raw provenance. */
  presentationNotes?: string[];
  id: EvidenceId;
  url: string;
  title: string;
  authors?: string[];
  /** Publisher identity; independent of evidence/claim nature. */
  organization?: string;
  publishedOn?: string;
  accessedOn: string;
  versionRevisionOrCommit?: string;
  /** Exact table, section, line, file, endpoint, or output record. */
  locator: string;
  kind: EvidenceKind;
  sourceKind: EvidenceSourceKind;
  scope: string;
  limitations?: string[];
  commercialInterest?: string;
  derivation?: DerivationRecord;
}

/** A field-level factual claim; publisher identity remains on Evidence. */
export interface ClaimRecord {
  id: ClaimId;
  subjectId: string;
  fieldPath: string;
  value: string | number | boolean;
  nature: EvidenceKind;
  scope: string;
  limitations?: string[];
  evidenceIds: EvidenceId[];
}

export interface ModelFamily {
  id: ModelFamilyId;
  name: string;
  publisher: string;
  aliases?: string[];
  evidenceIds?: EvidenceId[];
}

export type ModelStage = 'base' | 'instruct' | 'reasoning' | 'distilled' | 'other';
export type ModelArchitecture = 'dense' | 'moe' | 'hybrid' | 'other';
export type ModelKind =
  | 'generative'
  | 'embedding'
  | 'reranker'
  | 'encoder-classifier'
  | 'vision-language'
  | 'image-generation'
  | 'other';
export type Modality = 'text' | 'image' | 'audio' | 'video' | 'embedding' | 'structured-data';
export type ReviewStatus = 'announced' | 'available' | 'deprecated' | 'withdrawn' | 'needs-review';
export type PersianEvidenceStatus = 'independently-evaluated' | 'publisher-claimed' | 'not-evaluated' | 'unknown';

export interface LanguageSupport {
  language: string;
  declared: Datum<boolean>;
  independentEvaluationIds?: QualityEvaluationId[];
}

export interface LicenseRecord {
  name: Datum<string>;
  url: Datum<string>;
  commercialUse: Datum<'allowed' | 'restricted' | 'prohibited'>;
  restrictions?: string[];
  evidenceIds?: EvidenceId[];
}

export type ModelTaskSpecialization = 'translation' | 'code-completion' | 'coding-assistant' | 'coding-agent';
export interface ModelVersion {
  /** Runtime dependency, distinct from training lineage. Never a standalone candidate. */
  dependency?: { kind: 'speculative-drafter'; targetModelId: ModelVersionId; evidenceIds: EvidenceId[] };
  /** Reviewed specialization, not merely a task a general-purpose model can perform. */
  researchOnly?: boolean;
  inputTokenLimit?: Datum<number, 'token'>;
  taskSpecializations?: Array<{ task: ModelTaskSpecialization; languages?: string[]; languagePairs?: Array<[string, string]>; evidenceIds: EvidenceId[] }>;

  configurationContext?: Datum<number, 'token'>;
  id: ModelVersionId;
  familyId: ModelFamilyId;
  exactName: string;
  publisher: string;
  version: string;
  aliases?: string[];
  stage: ModelStage;
  baseModelId?: ModelVersionId;
  distilledFromModelId?: ModelVersionId;
  architecture: ModelArchitecture;
  /** Attention/state layout is independent of dense or mixture-of-experts FFN. */
  attentionArchitecture?: 'hybrid' | 'full-attention' | 'sliding-window' | 'other';
  thinkingMode?: 'non-thinking-only' | 'thinking-only' | 'switchable';
  totalParametersB: Datum<number, ParameterUnit>;
  activeParametersB: Datum<number, ParameterUnit>;
  /** Additional declared counts never substitute for the whole-model total in filters. */
  parameterCounts?: Array<{
    scope: 'nominal' | 'total' | 'active' | 'effective' | 'language-component' | 'vision-component' | 'stored' | 'other';
    label: string;
    value: Datum<number, ParameterUnit>;
    approximate: boolean;
  }>;
  kind: ModelKind;
  inputModalities: Modality[];
  outputModalities: Modality[];
  applications: ApplicationId[];
  languages: LanguageSupport[];
  persianEvidenceStatus: PersianEvidenceStatus;
  declaredContext: Datum<number, TokenUnit>;
  evaluatedContext: Datum<number, TokenUnit>;
  contextExtension?: { capacity: Datum<number, TokenUnit>; condition: string };
  /** Short condition affecting selection; methodological notes belong in evidence. */
  contextCondition?: string;
  specializedSpecs?: {
    task: Datum<string>;
    output: Datum<string>;
    embeddingDimensions?: Datum<number>;
    adjustableDimensions?: Datum<string>;
    poolingOrScoring: Datum<string>;
    features: Datum<string>;
    languages: Datum<string>;
  };
  releaseStatus: ReviewStatus;
  announcedOn?: string;
  /** Source date, preserving precision: YYYY, YYYY-MM or YYYY-MM-DD. Never review day. */
  releasedOn?: string;
  lastReviewedOn: string;
  license: LicenseRecord;
  evidenceIds: EvidenceId[];
}

export type ArtifactFormat = 'safetensors' | 'gguf' | 'onnx' | 'pytorch' | 'other';
export type ArtifactAuthority = 'official' | 'third-party';
export type NumericPrecision =
  | 'fp32'
  | 'tf32'
  | 'bf16'
  | 'fp16'
  | 'fp8'
  | 'int8'
  | 'int6'
  | 'int5'
  | 'int4'
  | 'int3'
  | 'int2'
  | 'mixed'
  | 'other';

export interface QuantizationSpec {
  method: string;
  implementation?: string;
  weightPrecision: NumericPrecision;
  activationPrecision: Datum<NumericPrecision>;
  groupSize?: Datum<number>;
  calibrationDataset?: string;
  evidenceIds?: EvidenceId[];
}

export interface ModelArtifact {
  id: ArtifactId;
  modelVersionId: ModelVersionId;
  /** Exact revision of the model from which this artifact was produced. */
  baseRevision: string;
  publisher: string;
  repositoryUrl: string;
  repositoryRevision: string;
  format: ArtifactFormat;
  quantization: Datum<QuantizationSpec>;
  weightPrecision: NumericPrecision;
  activationPrecision: Datum<NumericPrecision>;
  size: Datum<number, StorageUnit>;
  authority: ArtifactAuthority;
  /** Evaluations must target this exact artifact; no BF16 inheritance. */
  artifactQualityEvaluationIds?: QualityEvaluationId[];
  evidenceIds: EvidenceId[];
}

/** A verified distribution listing is not an exact execution artifact. */
export interface ArtifactListing {
  /** Repository link only; no file manifest or measured byte size was captured. */
  runtimeEngines?: string[];
  inventoryStatus?: 'not-recorded';
  id: EntityId<'artifact-listing'>;
  modelVersionId: ModelVersionId;
  baseModelRepository: string;
  baseRevision?: string;
  publisher: string;
  authority: ArtifactAuthority;
  format: ArtifactFormat | 'ollama';
  variant: string;
  quantizationMethod?: string;
  precision?: string;
  repositoryUrl: string;
  filesUrl: string;
  repositoryRevision?: string;
  files: Array<{ path: string; url: string; bytes?: number }>;
  totalBytes?: number;
  sizeDescription?: string;
  scopeNote?: string;
  verifiedOn: string;
  evidenceIds: EvidenceId[];
}

export interface ModelRunGuide {
  label: string;
  engine: string;
  engineLabel?: string;
  href: string;
  instructions?: string;
  conditions: string[];
  code?: string;
  codeLanguage?: 'python' | 'bash';
  evidenceIds: EvidenceId[];
}

/** Editorial introduction and task-correct starting instructions for one exact model. */
export interface ModelProfile {
  id: EntityId<'model-profile'>;
  modelVersionId: ModelVersionId;
  introduction: string;
  roleSummary: string;
  distinguishingFeatures: string[];
  languageSummary?: string;
  officialUrl: string;
  runGuides: ModelRunGuide[];
  downloadSearchNote?: string;
  evidenceIds: EvidenceId[];
}

export type ModelUseRole = 'retrieval' | 'reranking' | 'grounded-generation' | 'text-generation' | 'code-completion' | 'coding' | 'tool-use' | 'reasoning' | 'vision' | 'structured-output';
/** A sourced use explanation; it never implies a successful quality/SLA test. */
export interface ModelUseGuidance {
  id: EntityId<'model-use'>;
  modelVersionId: ModelVersionId;
  applicationId: ApplicationId;
  role: ModelUseRole;
  summary: string;
  description: string;
  distinguishingFeature: string;
  conditions: string[];
  basis: 'publisher-summary' | 'editorial-analysis';
  evidenceIds: EvidenceId[];
}

export type ApplicationId =
  | 'text-work'
  | 'enterprise-rag'
  | 'structured-extraction'
  | 'coding-assistant'
  | 'agents-tools'
  | 'reasoning-analysis'
  | 'document-vision';

export interface ApplicationTaxon {
  id: ApplicationId;
  label: string;
  subapplications: Array<{ id: string; label: string }>;
}

export interface Distribution {
  mean?: number;
  median?: number;
  p50?: number;
  p90?: number;
  p95?: number;
  p99?: number;
  min?: number;
  max?: number;
}

export interface QualityTarget {
  metric: string;
  minimum: number;
  unit?: string;
  evaluationId?: QualityEvaluationId;
}

export interface ServiceLevelObjective {
  ttft?: Datum<number, 'ms'>;
  tpot?: Datum<number, 'ms/token'>;
  totalLatency?: Datum<number, DurationUnit>;
  goodput?: Datum<number, 'request/s'>;
  successRate?: Datum<number, 'percent'>;
}

export interface WorkloadScenario {
  id: WorkloadId;
  name: string;
  applicationId: ApplicationId;
  subapplicationId?: string;
  language?: string;
  inputLength: Datum<Distribution, TokenUnit>;
  outputLength: Datum<Distribution, TokenUnit>;
  contextLength: Datum<number, TokenUnit>;
  batchSize: Datum<number>;
  /** Simultaneous active requests, not registered users. */
  concurrency: Datum<number>;
  /** Account population; intentionally independent from concurrency. */
  registeredUsers?: Datum<number>;
  arrivalRate: Datum<number, 'request/s'>;
  reasoningMode: Datum<'off' | 'on' | 'adaptive'>;
  reasoningBudget: Datum<number, TokenUnit>;
  qualityFloor?: QualityTarget;
  serviceLevel?: ServiceLevelObjective;
  evidenceIds?: EvidenceId[];
}

export type SoftwareRole =
  | 'inference-engine-library'
  | 'api-server'
  | 'model-manager'
  | 'gateway'
  | 'user-interface'
  | 'deployment-manager';
export type SoftwareMaintenanceStatus = 'active' | 'maintenance' | 'archived' | 'deprecated' | 'unknown';
export type ExecutionEnvironmentKind =
  | 'desktop'
  | 'workstation'
  | 'server'
  | 'container'
  | 'kubernetes'
  | 'cloud-service'
  | 'offline-air-gapped'
  | 'other';

/** Taxonomy entry. Its presence is not a verified/versioned capability row. */
export interface SoftwareProduct {
  id: SoftwareProductId;
  name: string;
  aliases?: string[];
  officialUrl: string;
  taxonomyRoleHints: SoftwareRole[];
  evidenceIds?: EvidenceId[];
}

/** A software-comparison row is always one exact product release. */
export interface SoftwareRelease {
  id: SoftwareReleaseId;
  productId: SoftwareProductId;
  version: string;
  releasedOn?: string;
  lastReviewedOn: string;
  roles: SoftwareRole[];
  environments: ExecutionEnvironmentKind[];
  operatingSystems: string[];
  hardwareKinds: string[];
  localOrCloud: Array<'local' | 'cloud' | 'hybrid'>;
  offlineOperation: Datum<boolean>;
  license: LicenseRecord;
  maintenanceStatus: SoftwareMaintenanceStatus;
  targetScenario?: Datum<string>;
  /** Explicitly documented target needs; queue/batching alone do not establish throughput. */
  documentedNeeds?: string[];
  backendSummary?: Datum<string>;
  /** Documented compute libraries or upstream APIs; not an experimental stack. */
  documentedBackends?: string[];
  selectionCaveat?: string;
  evidenceIds: EvidenceId[];
}

/** Actual compute backend/library and exact version, independent of wrappers. */
export interface ExecutionEngine {
  id: EngineId;
  name: string;
  version: string;
  url: string;
  evidenceIds: EvidenceId[];
}

export interface SoftwareEnvironment {
  operatingSystem?: string;
  kernel?: string;
  driver?: string;
  acceleratorRuntime?: string;
  framework?: string;
  containerImage?: string;
  dependencies?: Record<string, string>;
}

export interface ServingStackComponent {
  id: string;
  softwareReleaseId: SoftwareReleaseId;
  roles: SoftwareRole[];
  /** Actual compute backend used by this component, where applicable. */
  backendEngineId?: EngineId;
  connectsToComponentIds?: string[];
  effectiveSettings: Record<string, string | number | boolean>;
  evidenceIds: EvidenceId[];
}

export interface ServingStack {
  id: ServingStackId;
  name: string;
  components: ServingStackComponent[];
  environment: SoftwareEnvironment;
  effectiveSettings: Record<string, string | number | boolean>;
  evidenceIds: EvidenceId[];
}

export type SoftwareCapability =
  | 'task-generation'
  | 'task-embedding'
  | 'task-reranking'
  | 'task-classification'
  | 'queueing'
  | 'concurrency'
  | 'continuous-batching'
  | 'admission-control'
  | 'model-load-unload'
  | 'multi-model'
  | 'cold-start-control'
  | 'prefix-caching'
  | 'speculative-decoding'
  | 'cpu-gpu-offload'
  | 'kv-cache-offload'
  | 'layer-wise-loading'
  | 'multi-gpu-sharding'
  | 'independent-replicas'
  | 'streaming'
  | 'structured-output'
  | 'tool-use'
  | 'reasoning-control'
  | 'model-template-selection'
  | 'parser-selection'
  | 'monitoring'
  | 'metrics'
  | 'health-check'
  | 'authentication'
  | 'rate-limiting';
export type CapabilitySupportStatus =
  | 'supported'
  | 'conditional'
  | 'not-supported'
  | 'not-reviewed'
  | 'not-applicable';
export type CapabilityProvision = 'native' | 'plugin' | 'external-component' | 'not-applicable';

export interface CapabilityScope {
  softwareReleaseId: SoftwareReleaseId;
  backendEngineId?: EngineId;
  modelVersionIds?: ModelVersionId[];
  artifactIds?: ArtifactId[];
  hardwareConfigIds?: HardwareConfigId[];
  operatingSystems?: string[];
  endpoints?: string[];
  messageFormat?: string;
  modelTemplate?: string;
  parser?: string;
  conditions: string[];
}

export interface SoftwareCapabilityClaim {
  id: SoftwareCapabilityClaimId;
  capability: SoftwareCapability;
  status: CapabilitySupportStatus;
  provision: CapabilityProvision;
  scope: CapabilityScope;
  /** Required when status is not-applicable; explains why the capability is outside scope. */
  statusReason?: string;
  limitations?: string[];
  evidenceIds: EvidenceId[];
}

/** API compatibility is endpoint/capability scoped, never a blanket boolean. */
export interface ApiCompatibilityClaim {
  id: ApiCompatibilityClaimId;
  protocol: string;
  endpoint: string;
  capability: string;
  status: CapabilitySupportStatus;
  provision: CapabilityProvision;
  scope: CapabilityScope;
  /** Required when status is not-applicable; explains why this endpoint/capability is outside scope. */
  statusReason?: string;
  limitations?: string[];
  evidenceIds: EvidenceId[];
}

export type ExecutionMethod =
  | 'full-gpu'
  | 'cpu'
  | 'cpu-gpu-offload'
  | 'kv-cache-offload'
  | 'layer-wise-loading';
export type ParallelismStrategy =
  | 'none'
  | 'tensor-parallel'
  | 'pipeline-parallel'
  | 'expert-parallel'
  | 'model-sharding'
  | 'independent-replicas'
  | 'hybrid';

export interface HardwareConfiguration {
  id: HardwareConfigId;
  name: string;
  /** Canonical gpu-data.ts ID; omitted only for CPU-only/custom systems. */
  gpuRecordId?: string;
  gpuSku?: string;
  deploymentForm?: string;
  gpuCount: number;
  vramPerGpu: Datum<number, MemoryUnit>;
  aggregateVram: Datum<number, MemoryUnit>;
  topology: Datum<string>;
  cpu: Datum<string>;
  ram: Datum<number, MemoryUnit>;
  storageCapacity: Datum<number, StorageUnit>;
  storageType: Datum<string>;
  storageReadSpeed: Datum<number, 'MB/s' | 'GB/s'>;
  systemPower: Datum<number, PowerUnit>;
  gpuTdpPerCard: Datum<number, 'W'>;
  evidenceIds: EvidenceId[];
}

/** Exact deployable combination; all benchmark/compatibility rows bind here. */
export interface DeploymentConfiguration {
  id: DeploymentConfigId;
  modelVersionId: ModelVersionId;
  modelRevision: string;
  artifactId: ArtifactId;
  servingStackId: ServingStackId;
  backendEngineId: EngineId;
  method: ExecutionMethod;
  weightQuantization: Datum<string>;
  parallelism: ParallelismStrategy;
  kvCachePrecision: Datum<NumericPrecision>;
  contextLength: Datum<number, TokenUnit>;
  batchSize: Datum<number>;
  concurrency: Datum<number>;
  offloadAllowed: boolean;
  hardwareConfigId: HardwareConfigId;
  workloadId: WorkloadId;
  effectiveSettings: Record<string, string | number | boolean>;
  evidenceIds: EvidenceId[];
}
export type ExecutionConfiguration = DeploymentConfiguration;

export type AssessmentBasis =
  | 'declared-capability'
  | 'measured-success'
  | 'editorial-recommendation'
  | 'insufficient-evidence';

export interface ModelApplicationAssessment {
  id: EntityId<'application-assessment'>;
  modelVersionId: ModelVersionId;
  modelRevision: string;
  artifactId?: ArtifactId;
  applicationId: ApplicationId;
  subapplicationId?: string;
  basis: AssessmentBasis;
  /** Documented use or editorial rationale, independent of test outcome. */
  summary?: string;
  rationale?: string;
  primaryPurpose?: boolean;
  importantConditions?: string[];
  outcome: Datum<'meets' | 'partially-meets' | 'does-not-meet'>;
  language?: string;
  testedVersion?: string;
  limitations?: string[];
  qualityEvaluationId?: QualityEvaluationId;
  evidenceIds: EvidenceId[];
}

export interface QualityEvaluation {
  id: QualityEvaluationId;
  modelVersionId: ModelVersionId;
  modelRevision: string;
  artifactId?: ArtifactId;
  artifactRevision?: string;
  deploymentConfigId?: DeploymentConfigId;
  dataset: string;
  datasetVersion?: string;
  language?: string;
  applicationId: ApplicationId;
  metric: string;
  result: Datum<number>;
  comparatorIds?: ModelVersionId[];
  testedContext?: Datum<number, TokenUnit>;
  publishedOn?: string;
  limitations?: string[];
  evidenceIds: EvidenceId[];
}

/**
 * A result reported for an explicitly named model. Source-document revision and
 * evaluated-weight revision are independent. This is never a deployment run;
 * absent tested commits do not prevent faithful publication of the report.
 */
export interface PublishedEvaluation {
  referenceObservations?: ReferenceObservation[];
  /** Report-defined comparison group and reasoning mode; neither is an artifact revision. */
  comparisonGroup?: string;
  /** Explicitly reviewed common published protocol, distinct from model or weight revisions. */
  protocolEvidenceId?: EvidenceId;
  mode?: string;
  id: PublishedEvaluationId;
  modelVersionId: ModelVersionId;
  reportedModelName: string;
  evaluatedRevision?: string;
  sourceDocumentRevision?: string;
  reporter: string;
  reportingRelationship: 'publisher' | 'independent' | 'third-party';
  benchmark: string;
  benchmarkVersion?: string;
  metric: string;
  value: number;
  unit: string;
  settings: Record<string, string | number | boolean>;
  /** Editorial explanation; never participates in result identity or comparison. */
  settingNotes?: Record<string, string>;
  reportedPrecision?: string;
  language?: string;
  /** Language of the result, never inferred from the interface or `default`. */
  languageScope?: EvaluationLanguageScope;
  /** Original source notation, retained for reviewing the explicit migration. */
  sourceLanguageLabel?: string;
  sourceSettingLabels?: Record<string, string>;
  applicationIds: ApplicationId[];
  evaluatedOn?: string;
  publishedOn?: string;
  accessedOn: string;
  limitations: string[];
  evidenceIds: EvidenceId[];
}

export type EvaluationLanguageScope =
  | { kind: 'unspecified' }
  | { kind: 'single'; language: string }
  | { kind: 'pair'; source: string; target: string }
  | { kind: 'aggregate'; languages?: string[] };

export type FeasibilityStatus =
  | 'full-gpu'
  | 'hybrid'
  | 'layer-wise'
  | 'insufficient-for-scenario'
  | 'not-reviewed';

export interface ExecutionFeasibility {
  id: EntityId<'feasibility'>;
  deploymentConfigId: DeploymentConfigId;
  status: FeasibilityStatus;
  peakVram: Datum<number, MemoryUnit>;
  peakRam: Datum<number, MemoryUnit>;
  checkpointStorage: Datum<number, StorageUnit>;
  additionalStorage: Datum<number, StorageUnit>;
  peakTemporaryStorage: Datum<number, StorageUnit>;
  limitation?: string;
  evidenceIds: EvidenceId[];
}

export interface AirLlmExecutionEvidence {
  airLlmSoftwareReleaseId: SoftwareReleaseId;
  supportedModelArchitecture: string;
  modelVersionId: ModelVersionId;
  modelRevision: string;
  artifactId: ArtifactId;
  servingStackId: ServingStackId;
  effectiveDependencies: Record<string, string>;
  layerLoadingMethod: string;
  peakVram: Datum<number, MemoryUnit>;
  peakRam: Datum<number, MemoryUnit>;
  originalCheckpointStorage: Datum<number, StorageUnit>;
  convertedLayerStorage: Datum<number, StorageUnit>;
  peakTemporaryStorage: Datum<number, StorageUnit>;
  storageType: Datum<string>;
  storageReadSpeed: Datum<number, 'MB/s' | 'GB/s'>;
  preparationTime: Datum<number, DurationUnit>;
  startupTime: Datum<number, DurationUnit>;
  ttft: Datum<number, 'ms'>;
  generationThroughput: Datum<number, 'output-token/s/request'>;
  totalTime: Datum<number, DurationUnit>;
  batchSize: Datum<number>;
  concurrency: Datum<number>;
  compressionOrQuantization: Datum<string>;
  workloadId: WorkloadId;
  evidenceKind: EvidenceKind;
  limitations: string[];
  evidenceIds: EvidenceId[];
}

/** One compatibility row for an exact deployment, not a family/product claim. */
export interface DeploymentCompatibility {
  id: EntityId<'deployment-compatibility'>;
  deploymentConfigId: DeploymentConfigId;
  status: CapabilitySupportStatus;
  provision: CapabilityProvision;
  conditions: string[];
  limitations?: string[];
  airLlm?: AirLlmExecutionEvidence;
  evidenceIds: EvidenceId[];
}
export type EngineCompatibility = DeploymentCompatibility;

export interface MetricObservation<Unit extends string = string> {
  value: Datum<number, Unit>;
  statistic: 'single' | 'mean' | 'median' | 'p50' | 'p90' | 'p95' | 'p99';
  sampleCount?: number;
  dispersion?: Datum<number, Unit>;
  evidenceIds: EvidenceId[];
}

export interface BenchmarkRun {
  id: BenchmarkRunId;
  deploymentConfigId: DeploymentConfigId;
  softwareEnvironment: SoftwareEnvironment;
  dataset?: string;
  language?: string;
  inputLength: Datum<Distribution, TokenUnit>;
  outputLength: Datum<Distribution, TokenUnit>;
  contextLength: Datum<number, TokenUnit>;
  batchSize: Datum<number>;
  concurrency: Datum<number>;
  arrivalRate: Datum<number, 'request/s'>;
  reasoningMode: Datum<'off' | 'on' | 'adaptive'>;
  reasoningBudget: Datum<number, TokenUnit>;
  prefixCaching: Datum<boolean>;
  speculativeDecoding: Datum<boolean>;
  effectiveSettings: Record<string, string | number | boolean>;
  ttft: MetricObservation<'ms'>[];
  tpotOrItl: MetricObservation<'ms/token'>[];
  totalLatency: MetricObservation<DurationUnit>[];
  perRequestThroughput: MetricObservation<'output-token/s/request'>[];
  aggregateThroughput: MetricObservation<'output-token/s/aggregate'>[];
  goodput: Datum<number, 'request/s'>;
  serviceLevelObjective?: ServiceLevelObjective;
  errors: number;
  timeouts: number;
  successfulRequests: number;
  peakVram: Datum<number, MemoryUnit>;
  peakRam: Datum<number, MemoryUnit>;
  energy: Datum<number, EnergyUnit>;
  warmup: Datum<string>;
  coldStart: Datum<number, DurationUnit>;
  steadyStateDuration: Datum<number, DurationUnit>;
  repetitions: Datum<number>;
  qualityEvaluationId?: QualityEvaluationId;
  testedOn: string;
  publisher: string;
  rawOutputUrl: Datum<string>;
  evidenceIds: EvidenceId[];
}

export interface SpecializedModelAssessment {
  id: EntityId<'specialized-assessment'>;
  modelVersionId: ModelVersionId;
  modelRevision: string;
  artifactId?: ArtifactId;
  kind: Extract<ModelKind, 'embedding' | 'reranker' | 'encoder-classifier' | 'other'>;
  applicationId: ApplicationId;
  metricName: string;
  metricValue: Datum<number>;
  metricUnit: string;
  workloadId: WorkloadId;
  alternativeToGenerativeModelId?: ModelVersionId;
  limitations?: string[];
  evidenceIds: EvidenceId[];
}

export interface ExistingContentLink {
  id: string;
  title: string;
  href: `/articles/${string}/`;
  anchors?: Array<{ id: string; label: string }>;
  roles: Array<'planned-article' | 'view-concept' | 'guide-overview'>;
}

export interface PlannedArticle {
  id: PlannedArticleId;
  slug: string;
  order: number;
  status: 'planned';
  title: string;
  relatedContentIds: string[];
  conceptLinks?: Array<{ contentId: string; anchorId?: string }>;
}

export interface LlmGuideRepository {
  referenceComparisons?: ReferenceComparison[];
  selectionGuidance?: ReferenceGuidance[];
  articleSections?: ReferenceArticleSection[];
  quantizationStudies?: QuantizationObservation[];
  families: ModelFamily[];
  models: ModelVersion[];
  artifacts: ModelArtifact[];
  artifactListings: ArtifactListing[];
  modelProfiles: ModelProfile[];
  modelUseGuidance: ModelUseGuidance[];
  softwareProducts: SoftwareProduct[];
  softwareReleases: SoftwareRelease[];
  engines: ExecutionEngine[];
  servingStacks: ServingStack[];
  deploymentConfigurations: DeploymentConfiguration[];
  softwareCapabilities: SoftwareCapabilityClaim[];
  apiCompatibility: ApiCompatibilityClaim[];
  hardwareConfigurations: HardwareConfiguration[];
  workloads: WorkloadScenario[];
  qualityEvaluations: QualityEvaluation[];
  publishedEvaluations: PublishedEvaluation[];
  applicationAssessments: ModelApplicationAssessment[];
  executionFeasibility: ExecutionFeasibility[];
  deploymentCompatibility: DeploymentCompatibility[];
  benchmarkRuns: BenchmarkRun[];
  specializedAssessments: SpecializedModelAssessment[];
  claims: ClaimRecord[];
  evidence: Evidence[];
}
