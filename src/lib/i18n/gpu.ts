import dataText from './gpu-data.en.json';
import uiText from './gpu-ui.en.json';
import spanishDataText from './gpu-data.es.json';
import spanishUiText from './gpu-ui.es.json';
import { gpuRecords, type GpuRecord } from '$lib/gpu-data';
import { serverGpuProfiles, serverRecords, type ServerRecord } from '$lib/server-data';

export type HardwareLocale = 'fa' | 'en' | 'es';
const translations: Record<'en' | 'es', Record<string, string>> = {
  en: { ...dataText, ...uiText },
  es: { ...spanishDataText, ...spanishUiText }
};

/** Exact editorial translations: a changed source string needs a new review. */
export function hardwareText(value: unknown, locale: HardwareLocale): string {
  const source = value == null ? '' : String(value);
  if (locale === 'fa') return source;
  const dictionary = translations[locale];
  if (Object.hasOwn(dictionary, source)) return dictionary[source];
  const normalized = source
    .replace(/[۰-۹]/g, (digit) => String(digit.charCodeAt(0) - 0x06f0))
    .replace(/٫/g, '.').replace(/٬/g, ',');
  if (/[\u0600-\u06ef]/u.test(normalized)) {
    throw new Error(`Missing ${locale === 'es' ? 'Spanish' : 'English'} hardware translation: ${source}`);
  }
  return normalized;
}

function translateFields<T extends object, K extends keyof T>(record: T, fields: readonly K[], locale: HardwareLocale): T {
  const translated = { ...record };
  for (const key of fields) {
    const value = record[key];
    if (typeof value === 'string') translated[key] = hardwareText(value, locale) as T[K];
  }
  return translated;
}

// Numerical specifications, source URLs and internal filter keys stay shared.
// Workload/group/product-type enums are translated at the display boundary.
const gpuTextFields = [
  'model', 'architecture', 'memoryDisplay', 'memoryType', 'formFactor', 'hostInterface',
  'cooling', 'compute', 'interconnect', 'partitioning', 'sharedService', 'software',
  'bestFit', 'caution', 'sourceLabel', 'generalCoreLabel', 'matrixCoreLabel',
  'computeFootnote', 'matrixSourceLabel'
] as const satisfies readonly (keyof GpuRecord)[];
const serverTextFields = [
  'model', 'cpu', 'memory', 'storage', 'expansion', 'power', 'acceleratorSummary',
  'bestFor', 'caution', 'sourceLabel'
] as const satisfies readonly (keyof ServerRecord)[];

const localizedGpus: Partial<Record<'en' | 'es', GpuRecord[]>> = {};
const localizedServers: Partial<Record<'en' | 'es', ServerRecord[]>> = {};
const localizedProfiles: Partial<Record<'en' | 'es', typeof serverGpuProfiles>> = {};

export function hardwareGpus(locale: HardwareLocale): GpuRecord[] {
  if (locale === 'fa') return gpuRecords;
  return localizedGpus[locale] ??= gpuRecords.map((record) => ({
    ...translateFields(record, gpuTextFields, locale),
    extraSpecs: record.extraSpecs?.map((spec) => translateFields(spec, ['label', 'value'], locale))
  }));
}

export function hardwareServers(locale: HardwareLocale): ServerRecord[] {
  if (locale === 'fa') return serverRecords;
  return localizedServers[locale] ??= serverRecords.map((record) => translateFields(record, serverTextFields, locale));
}

export function hardwareGpuProfiles(locale: HardwareLocale): typeof serverGpuProfiles {
  if (locale === 'fa') return serverGpuProfiles;
  return localizedProfiles[locale] ??= serverGpuProfiles.map((profile) => translateFields(profile, ['label', 'note'], locale));
}
