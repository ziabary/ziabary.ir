import type { PublishedEvaluation } from './schema';
import { resultMatchesLanguage } from './evaluation';
/** Explicit display aliases only. Versions, split and harness stay independent. */
export function benchmarkLabel(name:string) {
  const aliases:Record<string,string>={'AIME2025':'AIME 2025','AIME 2025':'AIME 2025','AIME 2024':'AIME 2024','AIME2024':'AIME 2024','Terminal Bench 2.0':'Terminal-Bench 2.0','Terminal Bench 2.1':'Terminal-Bench 2.1','Terminal Bench 3.0':'Terminal-Bench 3.0'};
  return aliases[name]??name;
}
export function benchmarkScope(result:PublishedEvaluation){return [benchmarkLabel(result.benchmark),result.benchmarkVersion].filter(Boolean).join(' · ');}
export interface ScoreScope {task:string;benchmark:string;language:string;metric:string;cutoff:string;}
export function metricCutoff(metric:string){return /@(\d+)\b/.exec(metric)?.[1]??'';}
export function readScoreScope(raw:string|null,locale:string):ScoreScope {
  const initial={task:'enterprise-rag',benchmark:'MIRACL',language:locale,metric:'nDCG@10',cutoff:'10'};
  if(!raw)return initial;
  try{const obj=JSON.parse(raw);if(!obj||typeof obj!=='object')return initial;return Object.fromEntries(Object.keys(initial).map(key=>[key,typeof obj[key]==='string'&&obj[key].length<200?obj[key]:initial[key as keyof ScoreScope]])) as unknown as ScoreScope;}catch{return initial;}
}
export function matchesScoreScope(result:PublishedEvaluation,scope:ScoreScope){return (!scope.task||result.applicationIds.some(id=>id===scope.task))&&(!scope.benchmark||benchmarkScope(result)===scope.benchmark)&&(!scope.language||resultMatchesLanguage(result,scope.language))&&(!scope.metric||result.metric===scope.metric)&&(!scope.cutoff||metricCutoff(result.metric)===scope.cutoff);}
export function scopedModelResults(results:PublishedEvaluation[],modelId:string,scope:ScoreScope){return results.filter(r=>r.modelVersionId===modelId&&matchesScoreScope(r,scope));}
