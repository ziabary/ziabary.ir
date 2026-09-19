<script lang="ts">
  import { getLlmI18n } from '$lib/llm/i18n/context';
  const i18n = getLlmI18n();
  const { t, locale, direction, numberFormat } = i18n;

  import { evidenceNotes } from '$lib/llm/evidence-copy';
  import type { Evidence, EvidenceKind } from '$lib/llm/schema';
  export let ids: string[] = [];
  export let evidence: Evidence[] = [];
  $: byId = new Map(evidence.map((source) => [source.id, source]));
  $: sources = [...new Set(ids)].map((id) => ({ id, source: byId.get(id as Evidence['id']) }));
  const kinds: Record<EvidenceKind, string> = {
    'publisher-report': t('LlmEvidence.0981'), 'third-party-report': t('LlmEvidence.0982'), 'documented-specification': t('LlmEvidence.0983'), 'direct-measurement': t('LlmEvidence.0984'),
    'calculated-from-specifications': t('LlmEvidence.0985'), 'editorial-analysis': t('LlmEvidence.0986'),
    'unknown-needs-review': t('LlmEvidence.0987')
  };
</script>

<div class="evidence-list" aria-label={t('LlmEvidence.0988')}>
  {#each sources as item (item.id)}
    {#if item.source}
      {@const source = item.source}
      {@const notes = evidenceNotes(source)}
      <details class="evidence-item" data-evidence-id={source.id}>
        <summary>{source.title} <span>· {kinds[source.kind]}</span></summary>
        <a class="source-url" href={source.url} target="_blank" rel="noopener noreferrer">{source.url} ↗</a>
        <dl>
          {#if source.organization || source.authors?.length}<div><dt>{t('LlmEvidence.0989')}</dt><dd>{[source.organization, ...(source.authors ?? [])].filter(Boolean).join(t('LlmEvidence.0990'))}</dd></div>{/if}
          <div><dt>{t('LlmEvidence.0991')}</dt><dd>{source.accessedOn}</dd></div>
          {#if source.publishedOn}<div><dt>{t('LlmEvidence.0992')}</dt><dd>{source.publishedOn}</dd></div>{/if}
          {#if source.versionRevisionOrCommit}<div><dt>{t('LlmEvidence.0993')}</dt><dd dir="auto">{source.versionRevisionOrCommit}</dd></div>{/if}
          {#if source.locator && source.locator !== t('LlmEvidence.0994')}<div><dt>{t('LlmEvidence.0995')}</dt><dd dir="auto">{source.locator}</dd></div>{/if}
          {#if source.sourceCapture}<div><dt>SHA-256</dt><dd><code dir="ltr">{source.sourceCapture.contentSha256}</code></dd></div><div><dt>{ {fa:'زمان ثبت سند',en:'Document capture',es:'Captura del documento'}[locale]}</dt><dd><bdi>{source.sourceCapture.capturedAt}</bdi></dd></div>{/if}
        </dl>
        {#if notes.length}<ul class="source-notes">{#each notes as note}<li>{note}</li>{/each}</ul>{/if}
        {#if source.derivation}
          <div class="derivation">
            <b>{t('LlmEvidence.0996')} {source.derivation.method}</b>
            <pre dir="ltr">{source.derivation.formulaOrProcedure}</pre>
            <ul>{#each source.derivation.inputs as input}
              {@const inputSource = byId.get(input.evidenceId)}
              <li><code dir="auto">{input.field}</code>: {input.value} {input.unit ?? ''} — <span dir="auto">{input.locator}</span>
                {#if inputSource}<a href={inputSource.url} target="_blank" rel="noopener noreferrer">{t('LlmEvidence.0997')}{input.evidenceId}) ↗</a>{:else}<span>{t('LlmEvidence.0998')} {input.evidenceId}</span>{/if}
              </li>
            {/each}</ul>
            {#if source.derivation.assumptions.length}<b>{t('LlmEvidence.0999')}</b><ul>{#each source.derivation.assumptions as assumption}<li>{assumption}</li>{/each}</ul>{/if}
            <p>{t('LlmEvidence.1000')} {source.derivation.rounding}</p>
          </div>
        {/if}
      </details>
    {:else}
      <p>{t('LlmEvidence.1001')} <code>{item.id}</code></p>
    {/if}
  {:else}<p>{t('LlmEvidence.1002')}</p>{/each}
</div>

<style>
  .evidence-list{min-width:0;white-space:normal;overflow-wrap:anywhere;font-size:13px;line-height:1.9}
  .evidence-item{padding:10px 0;border-top:1px solid var(--line)}summary{cursor:pointer;font-weight:600}summary span{color:var(--muted);font-weight:400}
  a{color:var(--link-ink);text-decoration:underline;text-underline-offset:3px}.source-url{display:block;direction:ltr;text-align:start;margin-block:10px}
  dl{display:grid;gap:6px}dl>div{display:grid;grid-template-columns:minmax(90px,130px) minmax(0,1fr);gap:12px}dt{color:var(--muted)}dd{margin:0;min-width:0}
  ul{padding-inline-start:20px}li{margin-block:5px}.derivation{padding:12px;border:1px solid var(--line);border-radius:8px;margin-top:12px}pre{white-space:pre-wrap;overflow-wrap:anywhere;font-size:12px}
  @media(max-width:680px){dl>div{grid-template-columns:1fr;gap:0}}
</style>
