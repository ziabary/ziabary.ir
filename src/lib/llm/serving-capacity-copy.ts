import fa from './serving-capacity-copy.fa.json';
import en from './serving-capacity-copy.en.json';
import es from './serving-capacity-copy.es.json';
export type CapacityLocale = 'fa' | 'en' | 'es';
export const servingCapacityCopy: Record<CapacityLocale, typeof fa> = { fa, en, es };
