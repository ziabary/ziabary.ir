<script lang="ts">
  import { getLlmI18n } from '$lib/llm/i18n/context';
  const i18n = getLlmI18n();
  const { t, locale, direction, numberFormat } = i18n;
  const { missingLabel } = createLlmFiltering(i18n);
  import { createLlmFiltering } from '$lib/llm/filtering';
  import type { ViewValue } from '$lib/llm/views';
  import { llmBrand } from '$lib/llm/brands';
  export let value: ViewValue | undefined;
  export let compact = false;
  let copyStatus = '';
  async function copy() {
    if (value?.state !== 'known' || !value.copyText) return;
    try { await navigator.clipboard.writeText(value.copyText); copyStatus = t('LlmValue.1259'); }
    catch { copyStatus = t('LlmValue.1260'); }
  }
</script>

{#if value?.state === 'known' && value.brandId && llmBrand(value.brandId)}<img class="value-logo" src={llmBrand(value.brandId)} alt="" width="24" height="24" loading="lazy" />{/if}
{#if value?.state === 'known' && value.href}
  <a href={value.href} target="_blank" rel="noopener noreferrer"><bdi dir="auto">{value.display}</bdi> ↗</a>
{:else}
  <bdi dir="auto" class:value-text={value?.state === 'known'} class:token-value={value?.state === 'known' && value.canonicalUnit === 'token'} class:missing={value?.state !== 'known'} aria-label={compact && value?.state !== 'known' ? missingLabel(value) : undefined}>{compact && value?.state !== 'known' ? '—' : missingLabel(value && { ...value, note: undefined })}</bdi>
{/if}
{#if value?.state === 'known' && value.badge}<small class="value-badge">{value.badge}</small>{/if}
{#if value?.state === 'known' && value.caveat}<small class="value-caveat">{value.caveat}</small>{/if}
{#if !compact && value?.note}<small class="value-note">{value.note}</small>{/if}
{#if !compact && value?.state === 'known' && value.copyText}<button type="button" class="copy-value" on:click={copy} aria-label={t('LlmValue.1261')}>{t('LlmValue.1262')}</button><small aria-live="polite">{copyStatus}</small>{/if}

<style>
  .token-value{white-space:nowrap}
  .value-logo{width:24px;height:24px;object-fit:contain;background:#fff;border-radius:5px;padding:3px;box-sizing:border-box;vertical-align:middle;margin-inline-end:6px}
  a{color:var(--link-ink);overflow-wrap:anywhere;text-decoration:underline;text-underline-offset:3px}
  .value-note{display:block;margin-top:6px;color:var(--muted);font-size:12px;line-height:1.9;white-space:normal}
  .value-badge,.value-caveat{display:block;font-size:11px;line-height:1.8;margin-top:5px;white-space:normal}.value-badge{color:var(--teal)}.value-caveat{color:var(--ink);font-weight:500}.missing{color:var(--muted)}
  .copy-value{margin-inline-start:8px;padding:2px 8px;background:var(--soft);color:var(--ink);border:1px solid var(--line);border-radius:5px;font:inherit;cursor:pointer}
</style>
