<script lang="ts">
  import LlmDataView from '../../src/lib/components/LlmDataView.svelte';
  import { buildLlmViewRows } from '../../src/lib/llm/adapters';
  import { llmViewConfigs } from '../../src/lib/llm/views';
  import { syntheticLlmRepository } from './llm-synthetic';

  const rows = buildLlmViewRows(syntheticLlmRepository);
</script>

<main id="llm-fixture-harness" class="wrap" dir="rtl">
  <p class="fixture-warning">Fixture مصنوعی ویژهٔ آزمون رابط؛ دادهٔ محتوایی نیست.</p>
  {#each llmViewConfigs as config (config.id)}
    <LlmDataView {config} rows={rows[config.id]} />
  {/each}
</main>

<style>
  #llm-fixture-harness{box-sizing:border-box;max-width:1440px;margin-inline:auto;padding-block:24px;min-width:0}.fixture-warning{padding:10px;border:1px solid var(--line);color:var(--muted);font-size:11px}
</style>
