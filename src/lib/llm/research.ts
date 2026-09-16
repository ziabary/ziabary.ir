/** Supplementary observations. Never coerce these into exact local experiment records. */
import legacyArtifacts from '../../../data/llm/v0.2.0/data/artifacts.json';
import planningArtifacts from '../../../data/llm/v0.3.0/planning-artifacts.json';
const artifacts = [...legacyArtifacts, ...planningArtifacts];
import hardware from '../../../data/llm/v0.2.0/data/hardware.json';
import cpuProfiles from '../../../data/llm/v0.2.0/data/cpu-profiles.json';
import memoryPolicy from '../../../data/llm/v0.2.0/data/memory-policy.json';
import performanceJson from '../../../data/llm/v0.2.0/data/published-performance.json';
import quality from '../../../data/llm/v0.2.0/data/published-quality.json';
import legacySources from '../../../data/llm/v0.2.0/data/sources.json';
import planningSources from '../../../data/llm/v0.3.0/planning-sources.json';
const sources: typeof legacySources = [...legacySources, ...planningSources];
import compatibility from '../../../data/llm/v0.2.0/data/compatibility.json';
import kernels from '../../../data/llm/v0.2.0/data/quantization-hardware-support.json';
import aliases from '../../../data/llm/v0.2.0/data/model-aliases.json';
import slmCpu from '../../../data/llm/v0.2.0/data/slm-cpu-planning.json';
import airllm from '../../../data/llm/v0.2.0/data/airllm-observations.json';
import memoryClaims from '../../../data/llm/v0.2.0/data/published-memory-claims.json';
import specialized from '../../../data/llm/v0.2.0/data/specialized-models.json';
import software from '../../../data/llm/v0.2.0/data/software-guidance.json';
import startingPoints from '../../../data/llm/v0.2.0/data/task-starting-points.json';
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
export const research = {
  artifacts, hardware, cpuProfiles, memoryPolicy, performance: performanceJson as unknown as ReportedPerformance[],
  quality, sources, compatibility, kernels, aliases, slmCpu, airllm, memoryClaims,
  specialized, software, startingPoints
};
export const researchAsOf = '2026-09-16';
export const faNumber = (value: number, decimals = 2) => new Intl.NumberFormat('fa-IR', { maximumFractionDigits: decimals }).format(value);
export const researchEvidenceId = (id: string): Evidence['id'] => `evidence:research-v02-${id}`;
export function canonicalModelRepository(name: string): string {
  const alias = aliases.find(item => item.asPublished.toLowerCase() === name.toLowerCase());
  return (alias?.canonical ?? name).toLowerCase();
}
export function researchModel(repository: LlmGuideRepository, name?: string) {
  if (!name) return undefined;
  const normalized = canonicalModelRepository(name);
  return repository.models.find(model => model.aliases?.some(alias => canonicalModelRepository(alias) === normalized));
}
export const researchEvidence: Evidence[] = sources.map(source => ({
  id: researchEvidenceId(source.id), url: source.url, title: source.title,
  organization: source.publisher ?? undefined, accessedOn: source.accessedOn,
  ...(source.publishedOn && /^\d{4}-\d{2}-\d{2}$/.test(source.publishedOn) ? { publishedOn: source.publishedOn } : {}),
  locator: source.locator ?? source.title, sourceKind: 'primary',
  kind: source.kind.startsWith('first-hand-') ? 'third-party-report' : source.kind.startsWith('primary-') ? 'documented-specification' : 'publisher-report',
  versionRevisionOrCommit: source.documentRevision ?? source.revisionUrl,
  scope: source.kind === 'first-hand-synthetic-benchmark' ? 'آزمون فنی معماری با وزن تصادفی؛ به مدل آموزش‌دیده نسبت داده نمی‌شود.'
    : source.kind.includes('benchmark') ? 'نتیجهٔ گزارش‌شده در همین منبع و پروتکل؛ نسخهٔ فایل دریافت‌شده، نسخهٔ وزن آزموده‌شده محسوب نمی‌شود.'
    : source.title,
  limitations: [],
  ...(source.kind === 'first-hand-hosting-provider-benchmark'
    ? { commercialInterest: 'عرضه‌کنندهٔ خدمات میزبانی' } : {})
}));

const normalizedBenchmark = (name: string) => name.replace(/\s+/g, '').toLowerCase().replace('mteb-r(code)', 'mtebcode');
export const reasoningModeLabels: Record<string, string> = {
  'reasoning': 'استدلالی', 'instruct': 'دستورپذیر', 'non-thinking': 'بدون تفکر افزوده',
  'extended-thinking': 'با تفکر افزوده'
};
/** Merge repeated scores by their actual published table; preserve the earlier, more precise units/protocol. */
export function enrichResearchRepository(base: LlmGuideRepository): LlmGuideRepository {
  const publishedEvaluations = base.publishedEvaluations.map(item => ({ ...item, evidenceIds: [...item.evidenceIds] }));
  for (const score of quality) {
    const model = researchModel(base, score.modelRepository);
    if (!model) throw new Error(`Unresolved quality model: ${score.modelRepository}`);
    const previous = publishedEvaluations.find(item => item.modelVersionId === model.id
      && normalizedBenchmark(item.benchmark) === normalizedBenchmark(score.dataset)
      && item.value === score.value && (item.reporter === score.reporter)
      && (!item.mode || item.mode === score.mode)
      && (item.metric.replace(/\s/g, '') === score.metric.replace(/\s/g, '')
        || (score.dataset === 'MTEB-R (Code)' && item.metric === 'nDCG@10')));
    if (previous) {
      previous.mode = score.mode ?? undefined; previous.comparisonGroup = score.comparisonGroup;
      previous.evidenceIds = [...new Set([...previous.evidenceIds, ...score.sourceIds.map(researchEvidenceId)])];
      continue;
    }
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
      accessedOn: researchAsOf, language: score.dataset === 'MTEB-R' ? 'انگلیسی؛ زیرمجموعهٔ بازیابی MTEB v2' : retrieval ? 'multilingual' : undefined,
      limitations: ['امتیاز مدل نام‌گذاری‌شده در گزارش؛ کیفیت نسخهٔ کوانت‌شده از آن نتیجه نمی‌شود.', 'گروه گزارش و حالت تفکر باید در مقایسه یکسان یا صریحاً تفکیک شوند.'],
      evidenceIds: score.sourceIds.map(researchEvidenceId)
    };
    publishedEvaluations.push(evaluation);
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
      scopeNote: `حداکثر طول ورودی و خروجی فایل منتخب: ${faNumber(artifact.artifactContextLimitTokens, 0)} توکن.`,
      evidenceIds: [...new Set([...(previous?.evidenceIds ?? []), ...artifact.sourceIds.map(researchEvidenceId)])]
    };
    if (previous) Object.assign(previous, listing); else artifactListings.push(listing);
  }
  return { ...base, evidence: [...base.evidence, ...researchEvidence], publishedEvaluations, artifactListings };
}

export type MemoryArtifact = typeof artifacts[number];
export interface MemoryPlan { weightGiB: number; kvGiB: number; budgetGiB: number; reserveGiB: number; }
export function calculateMemory(artifact: MemoryArtifact, context: number, active: number, gpuCount = 1, cpu = false): MemoryPlan | undefined {
  if (!Number.isInteger(context) || context < 1 || context > artifact.artifactContextLimitTokens || !Number.isInteger(active) || active < 1 || !Number.isInteger(gpuCount) || gpuCount < 1) return undefined;
  const weightGiB = artifact.weightFileBytes / 2 ** 30;
  const kvGiB = 2 * artifact.layers * artifact.kvHeads * artifact.headDim * context * active * memoryPolicy.kvBytesPerElement / 2 ** 30;
  const reserveGiB = cpu ? memoryPolicy.cpuReserveGiB : memoryPolicy.gpuReserveGiBPerDevice * gpuCount;
  return { weightGiB, kvGiB, reserveGiB, budgetGiB: weightGiB + kvGiB + reserveGiB };
}
export function memoryStatus(required: number, capacity: number, devices = 1) {
  if (required > capacity) return { id: 'over-budget', label: 'حافظه ناکافی', note: 'کاهش زمینه، کوانت کم‌حجم‌تر یا انتقال بخشی از مدل به RAM را بررسی کنید.' };
  if (devices > 1) {
    const oneDeviceRequired = required - memoryPolicy.gpuReserveGiBPerDevice * (devices - 1);
    if (oneDeviceRequired <= capacity / devices) return { id: 'single-device-sufficient', label: 'یک کارت کافی است', note: 'در این برآورد، وزن و KV و ذخیرهٔ اجرایی روی یک کارت جا می‌شوند؛ کارت‌های دیگر می‌توانند نمونه‌های مستقل مدل را اجرا کنند.' };
    return { id: 'requires-sharding', label: 'نیازمند تقسیم مدل', note: 'جمع ظرفیت کافی است؛ سهم هر کارت و پشتیبانی موتور جدا کنترل شود.' };
  }
  if (capacity - required < Math.max(2, capacity * .1)) return { id: 'tight', label: 'حاشیهٔ کم', note: 'حافظهٔ آزاد واقعی و سربار موتور تعیین‌کننده‌اند.' };
  return { id: 'within-budget', label: 'حافظه کافی است', note: '' };
}
