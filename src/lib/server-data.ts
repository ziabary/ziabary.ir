import serverRecordsContent from '../../data/servers/records.json';
import serverGpuProfilesContent from '../../data/servers/gpu-profiles.json';
import serverLastReviewedContent from '../../data/servers/reviewed.json';
export type ServerVendor = 'Dell' | 'HPE' | 'Lenovo' | 'Supermicro' | 'GIGABYTE' | 'ASUS' | 'ASRock Rack' | 'Fujitsu' | 'QCT' | 'NVIDIA' | 'Microsoft' | 'HP' | 'MSI' | 'Huawei' | 'GMKtec' | 'Minisforum' | 'AMD';
export type ServerStatus = 'current' | 'legacy' | 'announced';
export type AcceleratorForm = 'pcie-card' | 'integrated';
export type CardCooling = 'passive' | 'active' | 'liquid';
export type SystemCooling = 'air' | 'dlc' | 'liquid-air';
export type GpuTopology = 'direct' | 'switched' | 'baseboard';

export type ServerGpuProfile = {
  id: string;
  label: string;
  pcieGeneration: 4 | 5;
  widthSlots: 1 | 2 | 3 | 4;
  powerW: number;
  cooling: CardCooling;
  note: string;
};

export type ServerRecord = {
  id: string;
  vendor: ServerVendor;
  model: string;
  status: ServerStatus;
  acceleratorForm: AcceleratorForm;
  /** Complete systems include desktops and laptops as well as rack servers. */
  systemType?: string;
  dimensions?: string;
  topologyNote?: string;
  availabilityNote?: string;
  additionalSources?: { label: string; url: string }[];
  heightU: number | null;
  /** Accelerator count in an integrated system; never PCIe card slots. */
  integratedGpuCount?: number;
  depthMm: number | null;
  pcieGeneration: 4 | 5 | 6 | null;
  gpuTopology: GpuTopology;
  maxDoubleWidthGpus: number;
  maxSingleWidthGpus: number | null;
  maxTripleWidthGpus: number;
  maxGpuPowerW: number | null;
  cardCooling: CardCooling[];
  systemCooling: SystemCooling[];
  cpu: string;
  memory: string;
  storage: string;
  expansion: string;
  power: string;
  validatedGpuIds: string[];
  /** OEM QPL maximum for a specific card, which can be lower than physical slot count. */
  validatedGpuLimits?: Record<string, number>;
  acceleratorSummary: string;
  bestFor: string;
  caution: string;
  sourceLabel: string;
  sourceUrl: string;
  sourceTier: 'سازنده' | 'راهنمای فنی سازنده';
};

export function serverCardCapacity(record: ServerRecord, profile: ServerGpuProfile): number {
  if (record.acceleratorForm !== 'pcie-card') return 0;
  const physical = profile.widthSlots === 1 ? record.maxSingleWidthGpus ?? record.maxDoubleWidthGpus
    : profile.widthSlots === 2 ? record.maxDoubleWidthGpus : record.maxTripleWidthGpus;
  return Math.min(physical, record.validatedGpuLimits?.[profile.id] ?? Infinity);
}

export const serverLastReviewed = serverLastReviewedContent;

export const serverGpuProfiles: ServerGpuProfile[] = serverGpuProfilesContent as ServerGpuProfile[];

export const serverRecords: ServerRecord[] = serverRecordsContent as ServerRecord[];

export default {
  meta: { ...serverLastReviewed, recordCount: serverRecords.length },
  gpuProfiles: serverGpuProfiles,
  records: serverRecords
};
