import records from '../../../data/llm/api-models.json';

export type ApiModelRecord = {
  id: string;
  name: string;
  provider: string;
  snapshot: string;
  input: string[];
  output: string[];
  contextTokens: number | null;
  inputLimitTokens?: number;
  outputLimitTokens?: number;
  availability: string;
  selfHosting: string;
  catalogOnly?: boolean;
  reviewedOn: string;
  sourceUrl: string;
  platformUrl: string;
  tasks: string[];
  languages: string[];
  regions: string[];
  contract: string;
  endpoint: string;
  tools?: string[];
  fineTuning?: boolean;
  persianEvidence?: string;
  pricing?: {
    currency: string;
    perTokens: number;
    longContextThresholdInputTokens: number;
    short: { input: number; cachedInput: number; cacheWrite: number; output: number };
    long: { input: number; cachedInput: number; cacheWrite: number; output: number };
  };
};

export const apiModels: ApiModelRecord[] = records;
