import gpuWorkloadsContent from '../../data/gpu/workloads.json';
import computeSpecsContent from '../../data/gpu/compute-specs.json';
import rowsContent from '../../data/gpu/records.json';
import gpuLastReviewedContent from '../../data/gpu/reviewed.json';
export type GpuVendor = 'NVIDIA' | 'AMD' | 'Intel' | 'Huawei' | 'Google' | 'AWS' | 'Tenstorrent' | 'Qualcomm' | 'Cerebras' | 'Groq' | 'Microsoft';
export type GpuStatus = 'current' | 'system-only' | 'announced' | 'legacy' | 'unofficial' | 'unverified';
export type GpuClass = 'frontier' | 'datacenter' | 'server-pcie' | 'workstation' | 'consumer';
export type GpuWorkload = 'آموزش مدل‌های بزرگ' | 'استنتاج سازمانی' | 'هوش مصنوعی محلی' | 'HPC' | 'گرافیک و رندر' | 'چندمستاجری';

export type GpuComputeRate = {
  dense: number | null;
  sparse?: number | null;
};

export type GpuComputeSpec = {
  generalCoreCount: number | null;
  generalCoreLabel: string;
  matrixCoreCount: number | null;
  matrixCoreLabel: string;
  fp8: GpuComputeRate;
  fp16: GpuComputeRate;
  fp32: number | null;
  fp64: number | null;
  fp4?: GpuComputeRate;
  bf16?: GpuComputeRate;
  int8?: GpuComputeRate;
  int4?: GpuComputeRate;
  computeFootnote?: string;
  matrixSourceUrl?: string;
  matrixSourceLabel?: string;
  disclosure?: Partial<Record<'generalCoreCount' | 'matrixCoreCount' | 'fp4' | 'fp8' | 'bf16' | 'fp16' | 'fp32' | 'fp64' | 'int8' | 'int4', 'published' | 'derived' | 'not-published' | 'not-supported' | 'not-applicable'>>;
};

export type GpuExtraSpec = {
  group: 'تراشه' | 'محاسبات' | 'حافظه' | 'ارتباط و شبکه' | 'توان و مکانیک' | 'نرم‌افزار و مجازی‌سازی' | 'رسانه' | 'عرضه و منبع';
  label: string;
  value: string;
  basis?: 'رسمی' | 'استخراج‌شده از سامانه' | 'اعلام‌نشده توسط سازنده';
};

export type GpuBaseRecord = {
  id: string;
  vendor: GpuVendor;
  model: string;
  status: GpuStatus;
  gpuClass: GpuClass;
  architecture: string;
  year: number;
  memoryGB: number;
  memoryDisplay?: string;
  memoryType: string;
  bandwidthTBs: number;
  powerW: number | null;
  formFactor: string;
  hostInterface: string;
  cooling: string;
  compute: string;
  interconnect: string;
  partitioning: string;
  sharedService?: string;
  software: string;
  workloads: GpuWorkload[];
  bestFit: string;
  caution: string;
  serverReady: boolean;
  sourceUrl: string;
  sourceLabel: string;
  productKind?: 'کارت' | 'ماژول' | 'پردازنده' | 'سامانه' | 'ابر';
  sourceTier?: 'سازنده' | 'مستندات فنی سازنده' | 'پژوهش مستقل' | 'فروشندهٔ برد اصلاح‌شده';
  extraSpecs?: GpuExtraSpec[];
  dataDisclosure?: Partial<Record<'memoryGB' | 'bandwidthTBs' | 'powerW', 'published' | 'derived' | 'supplier-claimed' | 'not-published' | 'not-supported' | 'not-applicable'>>;
};

export type GpuRecord = GpuBaseRecord & GpuComputeSpec;

export const gpuLastReviewed = gpuLastReviewedContent;

const rows: GpuBaseRecord[] = rowsContent as GpuBaseRecord[];

const computeSpecs: Record<string, GpuComputeSpec> = computeSpecsContent as Record<string, GpuComputeSpec>;

const emptyCompute: GpuComputeSpec = {
  generalCoreCount: null, generalCoreLabel: 'هستهٔ عمومی', matrixCoreCount: null, matrixCoreLabel: 'هستهٔ ماتریسی',
  fp4: { dense: null }, fp8: { dense: null }, bf16: { dense: null }, fp16: { dense: null }, fp32: null, fp64: null, int8: { dense: null }, int4: { dense: null }
};

const damavandSharedService = 'قابل ارائه به‌صورت خدمت اشتراکی روی سکوی دماوند؛ مستقل از پشتیبانی رسمی vGPU یا MIG در خود کارت.';

export const gpuRecords: GpuRecord[] = rows.map((row) => ({
  ...row,
  ...emptyCompute,
  ...computeSpecs[row.id],
  ...(row.vendor === 'NVIDIA' && row.productKind !== 'سامانه' ? { sharedService: damavandSharedService } : {})
}));
export const gpuWorkloads: GpuWorkload[] = gpuWorkloadsContent as GpuWorkload[];
