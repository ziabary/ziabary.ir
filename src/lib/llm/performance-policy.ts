import type { ReportedPerformance } from './research';

/** Reviewed common protocol, not a claim that all records sharing a group match.
 * GPUStack 2.1, Qwen3-14B/H100, Experiment Results §1, reviewed 2026-09-17.
 * Only the three BF16 engine baselines qualify. FP8 is a separate intervention.
 */
export function reviewedPerformanceProtocol(run: ReportedPerformance) {
  return run.publicationGroup === 'gpustack-qwen14-h100-sharegpt'
    && ['performance:gpustack-qwen14-h100-1','performance:gpustack-qwen14-h100-2','performance:gpustack-qwen14-h100-3'].includes(run.id)
    && run.sourceIds.includes('gpustack-qwen14-h100')
    && run.modelRepository === 'Qwen/Qwen3-14B'
    && run.hardwareLabel === 'H100 SXM 80GB' && run.gpuCount === 1
    && run.weightFormat === 'publisher checkpoint default (BF16)'
    && !!run.engineVersion && !!run.servingCommandAsPublished
    && run.protocol.benchmarkTool === 'vllm bench serve'
    && run.protocol.dataset === 'anon8231489123/ShareGPT_Vicuna_unfiltered / ShareGPT_V3_unfiltered_cleaned_split.json'
    && run.protocol.submittedRequests === 1000 && run.metrics.successfulRequests === 1000
    && run.metrics.totalInputTokens === 217393;
}
