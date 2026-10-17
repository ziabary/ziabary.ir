/** Full-attention K/V storage. No weights, paging savings, prefix reuse or runtime buffers. */
export function kvCacheGiB(layers: number, kvHeads: number, headDim: number, tokens: number, active: number, bytesPerElement = 2): number {
  if (![layers, kvHeads, headDim, tokens, active].every(n => Number.isSafeInteger(n) && n > 0)
      || ![1, 2, 4].includes(bytesPerElement)) return NaN;
  return 2 * layers * kvHeads * headDim * tokens * active * bytesPerElement / 2 ** 30;
}
