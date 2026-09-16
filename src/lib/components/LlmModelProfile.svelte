<script lang="ts">
  import { tick } from 'svelte';
  import type { LlmGuideRepository } from '$lib/llm/schema';
  import { adaptModelCatalog, modelUseRoleLabels } from '$lib/llm/adapters';
  import { llmBrand } from '$lib/llm/brands';
  import { profileUseCards, profileRunCards } from '$lib/llm/presentation';
  import LlmValue from './LlmValue.svelte';
  import LlmEvidence from './LlmEvidence.svelte';
  import LlmPublishedEvaluations from './LlmPublishedEvaluations.svelte';
  import LlmModelResearch from './LlmModelResearch.svelte';
  export let repository: LlmGuideRepository;
  export let modelId = '';
  export let panel = 'overview';
  export let onClose: () => void;
  export let onPanel: (panel: string) => void;
  let dialog: HTMLDialogElement;
  let loaded = '';
  let copyStatus = '';
  let previousPanel = '';
  $: if (dialog && previousPanel !== selectedPanel) { dialog.scrollTop = 0; previousPanel = selectedPanel; }
  const numbers = new Intl.NumberFormat('fa-IR', { maximumFractionDigits: 2 });
  const sections = [{id:'overview',label:'معرفی و کاربرد'}, {id:'downloads',label:'دریافت مدل'}, {id:'run',label:'راه‌اندازی'}, {id:'infrastructure',label:'حافظه و اجرا'}, {id:'quality',label:'نتایج آزمون‌ها'}, {id:'sources',label:'منابع و مجوز'}];
  $: profile = repository.modelProfiles.find(item => item.modelVersionId === modelId);
  $: model = repository.models.find(item => item.id === modelId);
  $: row = model ? adaptModelCatalog(repository).find(item => item.id === modelId) : undefined;
  $: uses = profile ? profileUseCards(profile, repository.modelUseGuidance.filter(item => item.modelVersionId === modelId)) : [];
  $: runs = profile ? profileRunCards(profile) : { guides: [], shared: [] };
  $: downloads = repository.artifactListings.filter(item => item.modelVersionId === modelId);
  $: results = repository.publishedEvaluations.filter(item => item.modelVersionId === modelId);
  $: selectedPanel = sections.some(section => section.id === panel) ? panel : 'overview';
  $: if (dialog && profile && loaded !== modelId) openProfile(modelId);
  $: if (dialog && !profile) { dialog.close(); loaded = ''; }
  async function openProfile(id: string) {
    loaded = id; copyStatus = '';
    await tick();
    if (profile && dialog && !dialog.open) dialog.showModal();
    dialog?.querySelector<HTMLElement>('.profile-title')?.focus();
  }
  async function copy(value: string, label: string) {
    try { await navigator.clipboard.writeText(value); copyStatus = `${label} کپی شد`; }
    catch { copyStatus = 'کپی خودکار ممکن نشد؛ متن را انتخاب کنید.'; }
  }
</script>

<dialog bind:this={dialog} class="model-profile" dir="rtl" aria-labelledby="profile-title" on:cancel={(event) => { event.preventDefault(); onClose(); }}>
  {#if profile && model && row}
    <header class="profile-header">
      {#if llmBrand(modelId)}<img class="profile-logo" src={llmBrand(modelId)} alt="" width="48" height="48" />{/if}
      <div><small>پروندهٔ مدل · {model.publisher}</small><h2 id="profile-title" class="profile-title" tabindex="-1"><bdi>{model.exactName}</bdi></h2></div>
      <button class="close-profile" type="button" on:click={onClose} aria-label="بستن پروندهٔ مدل"><svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false"><path d="m6 6 12 12M18 6 6 18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" /></svg></button>
    </header>
    <nav class="profile-tabs" aria-label="بخش‌های پروندهٔ مدل">
      {#each sections as section}<button type="button" class:active={selectedPanel === section.id} aria-current={selectedPanel === section.id ? 'page' : undefined} on:click={() => onPanel(section.id)}>{section.label}</button>{/each}
    </nav>
    <div class="profile-body">
      {#if selectedPanel === 'overview'}
        <h3>{profile.roleSummary}</h3>{#if profile.introduction.replace(/[.؛،\s]+$/u, '') !== profile.roleSummary.replace(/[.؛،\s]+$/u, '')}<p class="introduction">{profile.introduction}</p>{/if}
        <div class="specs">
          {#each [{key:'kind-stage',label:'نوع مدل'}, {key:'size-architecture',label:'اندازه و معماری'}, {key:'modalities',label:'ورودی و خروجی'}, {key:'context',label:'حداکثر طول متن (اعلام ناشر)'}] as item}<div><small>{item.label}</small><LlmValue value={row.cells[item.key]} /></div>{/each}
        </div>
        {#if model.specializedSpecs}<div class="specialized-specs">{#each Object.entries(model.specializedSpecs).filter(([key, value]) => key === 'poolingOrScoring' && !(value.state === 'known' && uses.some(use => use.conditions.includes(String(value.value))))) as [key,value]}<p><LlmValue value={value.state === 'known' ? {state: 'known', display: String(value.value)} : value} /></p>{/each}</div>{/if}
        {#if profile.languageSummary}<p class="muted">{profile.languageSummary}</p>{/if}
        <h3>راهنمای کاربرد این نسخه</h3>
        {#each uses as use}<article class="use-card"><small>{modelUseRoleLabels[use.role]}</small><h4>{use.summary}</h4>{#if use.description}<p>{use.description}</p>{/if}{#if use.conditions.length}<ul>{#each use.conditions as condition}<li>{condition}</li>{/each}</ul>{/if}<small class="muted">{use.basis === 'publisher-summary' ? 'خلاصهٔ مستندات ناشر' : 'جمع‌بندی فنی بر پایهٔ مستندات'}</small><LlmEvidence ids={use.evidenceIds} evidence={repository.evidence} /></article>{/each}
        <div class="start-actions"><button type="button" on:click={() => onPanel('downloads')}>دریافت نسخه‌های مدل ←</button><button type="button" on:click={() => onPanel('run')}>راهنمای شروع ←</button></div>
      {:else if selectedPanel === 'downloads'}
        <h3>نسخه‌های قابل دریافت</h3>{#if profile.downloadSearchNote}<p class="muted">{profile.downloadSearchNote}</p>{/if}
        <p class="weight-note">حجم فایل روی دیسک با حافظهٔ لازم برای اجرا برابر نیست؛ KV cache و حافظهٔ موقت جدا هستند.</p>
        <div class="download-list">
          {#each downloads as item}
            <article class="download-card" data-format={item.format}>
              <header><strong><bdi>{item.format.toUpperCase()} · {item.variant}</bdi></strong><span class:third={item.authority === 'third-party'} class="authority">{item.authority === 'official' ? 'سازندهٔ مدل' : 'شخص ثالث'} · <bdi>{item.publisher}</bdi></span></header>
              <p class="download-meta">{#if item.totalBytes !== undefined}<bdi>{numbers.format(item.totalBytes / 2 ** 30)} GiB</bdi> · {numbers.format(item.files.length)} فایل وزن{:else}{item.sizeDescription}{/if}{#if item.precision} · دقت: <bdi>{item.precision}</bdi>{/if}{#if item.quantizationMethod} · روش کوانت: <bdi>{item.quantizationMethod}</bdi>{/if}</p>
              {#if item.scopeNote}<p>{item.scopeNote}</p>{/if}
              <div class="download-actions"><a href={item.repositoryUrl} target="_blank" rel="noopener noreferrer">صفحهٔ نسخه ↗</a><a href={item.filesUrl} target="_blank" rel="noopener noreferrer">{item.format === 'ollama' ? 'مشاهدهٔ بسته' : 'فهرست فایل‌ها'} ↗</a></div>
              <details><summary>فایل‌ها و نسخهٔ مدل</summary>
                <p>مدل مبنا: <bdi>{item.baseModelRepository}</bdi></p>
                {#if item.baseRevision}<p>نسخهٔ مدل مبنا: <bdi>{item.baseRevision}</bdi></p>{/if}
                {#if item.repositoryRevision}<p>نسخهٔ مخزن فایل: <code>{item.repositoryRevision}</code></p>{/if}
                {#if item.files.length}<ul class="file-list">{#each item.files as file}<li><a href={file.url} target="_blank" rel="noopener noreferrer" dir="ltr">{file.path} ↗</a>{#if file.bytes !== undefined}<small>{numbers.format(file.bytes)} بایت</small>{/if}</li>{/each}</ul>{/if}
                <p class="muted">بررسی فهرست فایل‌ها: <time datetime={item.verifiedOn}>{item.verifiedOn}</time></p>
                <LlmEvidence ids={item.evidenceIds} evidence={repository.evidence} />
              </details>
            </article>
          {/each}
        </div>
      {:else if selectedPanel === 'run'}
        <h3>مسیرهای راه‌اندازی</h3>
        {#each runs.guides as run}
          <article class="run-card"><header>{#if llmBrand(run.engine)}<img class="profile-logo" src={llmBrand(run.engine)} alt="" width="32" height="32" />{/if}<h4>{run.label}</h4></header>
            {#if run.instructions}<p>{run.instructions}</p>{/if}{#if run.conditions.length}<ul>{#each run.conditions as condition}<li>{condition}</li>{/each}</ul>{/if}
            {#if run.code}<div class="code-block"><button type="button" on:click={() => copy(run.code!, 'فرمان')}>کپی فرمان</button><pre dir="ltr"><code>{run.code}</code></pre></div>{/if}
            <a href={run.href} target="_blank" rel="noopener noreferrer">راهنمای {run.engine === 'مسیر اجرای ناشر' ? 'ناشر' : run.engine} ↗</a><LlmEvidence ids={run.evidenceIds} evidence={repository.evidence} />
          </article>
        {/each}
        {#if runs.shared.length}<aside class="run-notes" aria-label="شرط‌های مشترک اجرا">{#each runs.shared as note}<p><small><bdi>{note.engines.join('، ')}</bdi></small>{note.text}</p>{/each}</aside>{/if}
      {:else if selectedPanel === 'infrastructure'}
        <LlmModelResearch {repository} {modelId} />
      {:else if selectedPanel === 'quality'}
        <h3>کیفیت مدل</h3>
        {#if results.length}<LlmPublishedEvaluations {results} evidence={repository.evidence} />{:else}<p>نتیجهٔ عددی برای این مدل در راهنما ثبت نشده است.</p><a href={profile.officialUrl} target="_blank" rel="noopener noreferrer">کارت مدل ↗</a>{/if}
      {:else}
        <h3>منابع، مجوز و تاریخ‌ها</h3>
        <dl class="source-facts">{#each [{key:'license-url',label:'مجوز'}, {key:'license-restrictions',label:'شروط مجوز'}, {key:'released-on',label:'انتشار مدل'}, {key:'last-reviewed',label:'آخرین بررسی'}, {key:'revision',label:'نسخهٔ ثبت‌شده'}].filter(item => row.details[item.key]?.state === 'known') as item}<div><dt>{item.label}</dt><dd><LlmValue value={row.details[item.key]} /></dd></div>{/each}</dl>
        <a href={profile.officialUrl} target="_blank" rel="noopener noreferrer">صفحهٔ رسمی مدل ↗</a><LlmEvidence ids={profile.evidenceIds} evidence={repository.evidence} />
      {/if}
    </div>
    <footer><button type="button" on:click={onClose}>بستن پرونده</button><a href={profile.officialUrl} target="_blank" rel="noopener noreferrer">صفحهٔ رسمی ↗</a><button type="button" on:click={() => copy(window.location.href, 'لینک پرونده')}>کپی لینک این بخش</button><small role="status">{copyStatus}</small></footer>
  {/if}
</dialog>

<style>
  .model-profile{width:min(1040px,calc(100vw - 32px));max-height:90dvh;max-width:none;padding:0;border:1px solid var(--line);border-radius:16px;background:var(--paper);color:var(--ink);box-shadow:0 20px 80px #0007;overflow:auto;font:inherit}.model-profile::backdrop{background:#061317b8;backdrop-filter:blur(4px)}
  .profile-header{display:flex;align-items:center;gap:14px;padding:24px}.profile-header h2{margin:3px 0 0;font-size:24px}.profile-header small,.muted{color:var(--muted)}.profile-logo{width:48px;height:48px;object-fit:contain;padding:5px;background:white;border:1px solid #ddd;border-radius:9px;box-sizing:border-box;flex-shrink:0}.close-profile{margin-inline-start:auto;display:grid;place-items:center;flex:0 0 40px;width:40px;height:40px;padding:0;line-height:1}.close-profile svg{display:block}.profile-tabs{display:flex;flex-direction:row;align-items:stretch;justify-content:flex-start;margin:0;position:sticky;top:0;inset-inline:auto;z-index:1;background:var(--paper);border-block:1px solid var(--line);padding:0 16px;overflow:auto;gap:8px}.profile-tabs button{white-space:nowrap;border:0;border-bottom:3px solid transparent;border-radius:0;padding:14px 10px}.profile-tabs button.active{border-bottom-color:var(--teal);color:var(--link-ink);background:var(--soft)}button{cursor:pointer;font:inherit;color:var(--ink);background:var(--paper);border:1px solid var(--line);border-radius:7px;padding:7px 12px}button:hover{background:var(--soft)}button:focus-visible,a:focus-visible{outline:2px solid var(--teal);outline-offset:3px}a{color:var(--link-ink)}
  .profile-body{padding:24px;line-height:2;font-size:14px}.profile-body h3{font-size:20px;margin:0 0 12px}.profile-body h4{font-size:16px;margin:4px 0 10px}.introduction{font-size:16px}.specs{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));border:1px solid var(--line);border-radius:10px;overflow:hidden;margin:20px 0}.specs>div{padding:12px 16px;border-bottom:1px solid var(--line)}.specs small{display:block;color:var(--muted)}.use-card,.run-card,.download-card{border:1px solid var(--line);border-radius:10px;padding:18px;margin:16px 0;background:color-mix(in srgb,var(--soft) 35%,var(--paper))}.use-card>small{color:var(--teal)}.profile-body ul{padding-inline-start:24px}.profile-body p{margin:10px 0}.start-actions,.download-actions{display:flex;gap:20px;flex-wrap:wrap}.download-card>header{display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap}.authority{font-size:11px;color:var(--link-ink);border:1px solid var(--line);border-radius:20px;padding:1px 10px}.authority.third{color:var(--muted)}.download-meta,.weight-note{font-size:12px;color:var(--muted)}.download-card details{border-top:1px solid var(--line);margin-top:14px;padding-top:10px}.download-card summary{cursor:pointer;color:var(--link-ink)}.file-list{list-style:none;padding:0!important}.file-list li{display:flex;justify-content:space-between;gap:15px;flex-wrap:wrap;margin:8px 0}.file-list a{overflow-wrap:anywhere}.file-list small{color:var(--muted)}code{font-family:monospace;font-size:12px;direction:ltr;unicode-bidi:isolate;overflow-wrap:anywhere}.run-card .profile-logo{width:32px;height:32px}.run-card>header{display:flex;align-items:center;gap:12px}.run-card h4{margin:0}.code-block{position:relative;border:1px solid var(--line);background:#081317;color:#e5eeee;border-radius:9px;margin:18px 0;overflow:hidden}.code-block button{display:block;margin:8px 8px 0 auto;font-size:11px}.code-block pre{overflow-x:auto;padding:10px 16px 18px;line-height:1.7;margin:0;text-align:left;white-space:pre}.code-block code{font-size:13px}.source-facts>div{margin-bottom:14px}.source-facts dt{color:var(--muted)}.source-facts dd{margin:0;overflow-wrap:anywhere}footer{display:flex;align-items:center;flex-wrap:wrap;gap:20px;border-top:1px solid var(--line);padding:16px 24px;font-size:12px}footer small{color:var(--teal)}
  .run-notes{border-top:1px solid var(--line);margin-top:20px;padding-top:8px;font-size:13px}.run-notes small{display:block;color:var(--muted)}
  @media(max-width:650px){.model-profile{width:calc(100vw - 16px);max-height:94dvh;border-radius:12px}.profile-header,.profile-body{padding:16px}.profile-header h2{font-size:18px;overflow-wrap:anywhere}.profile-header{gap:10px}.profile-tabs{padding:0 8px;font-size:12px}.specs{grid-template-columns:1fr}.profile-body{font-size:13px}.profile-body h3{font-size:18px}.use-card,.run-card,.download-card{padding:14px}.specs>div{padding:10px 14px}footer{padding:14px}.profile-logo{width:38px;height:38px}.close-profile{flex-shrink:0}}
</style>
