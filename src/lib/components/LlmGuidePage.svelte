<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { tick } from 'svelte';
  import LlmModelProfile from './LlmModelProfile.svelte';
  import PageHero from './PageHero.svelte';
  import LlmDataView from './LlmDataView.svelte';
  import LlmResearchView from './LlmResearchView.svelte';
  import LlmTaskStartingPoints from './LlmTaskStartingPoints.svelte';
  import { enrichResearchRepository } from '$lib/llm/research';
  import { enrichExistingRows, enrichExistingConfig } from '$lib/llm/research-views';
  import { imageAttributes } from '$lib/images';
  import { allArticleMetadata } from '$lib/content';
  import { withDraftPreview } from '$lib/draft-preview.mjs';
  import { formatDate } from '$lib/publication.mjs';
  import {
    existingContentLinks,
    llmGuideCollection,
    llmDatasetUpdatedOn,
    llmRepository as baseRepository,
    plannedArticles,
    viewRelatedContent,
    viewPlannedArticles
  } from '$lib/llm/guide';
  import { buildLlmViewRows, adaptModelUseMatrix } from '$lib/llm/adapters';
  import { llmGuideSections, modelUseViewConfig } from '$lib/llm/views';

  const numbers = new Intl.NumberFormat('fa-IR');
  const draftArticles = new Map(allArticleMetadata.filter(article => article.lang === 'fa' && article.draft === true).map(article => [article.slug, article]));
  function plannedArticleHref(slug: string) {
    return draftArticles.has(slug) ? withDraftPreview(`/articles/${slug}/`) : `#planned-${slug}`;
  }
  const llmRepository = enrichResearchRepository(baseRepository);
  const llmViewRows = enrichExistingRows(llmRepository, buildLlmViewRows(llmRepository));
  const matrixRows = adaptModelUseMatrix(llmRepository);
  const tableCount = llmGuideSections.reduce((count, section) => count + section.views.length, 0);
  $: matrixMode = $page.url.searchParams.get('usage') === 'matrix';
  async function setMatrixMode(matrix: boolean) {
    const url = new URL($page.url);
    if (matrix) url.searchParams.set('usage', 'matrix'); else url.searchParams.delete('usage');
    await goto(url, { noScroll: true, keepFocus: true });
  }
  let returnFocus: HTMLElement | null = null;
  $: modelId = $page.url.searchParams.get('model') ?? '';
  $: modelPanel = $page.url.searchParams.get('panel') ?? 'overview';
  async function openModel(id: string, panel = 'overview') {
    returnFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const url = new URL($page.url); url.searchParams.set('model', id); url.searchParams.set('panel', panel);
    await goto(url, { noScroll: true, keepFocus: true });
  }
  async function closeModel() {
    const url = new URL($page.url); url.searchParams.delete('model'); url.searchParams.delete('panel');
    await goto(url, { noScroll: true, keepFocus: true }); await tick(); returnFocus?.focus({ preventScroll: true });
  }
  async function changePanel(panel: string) {
    const url = new URL($page.url); url.searchParams.set('panel', panel);
    await goto(url, { noScroll: true, keepFocus: true, replaceState: true });
  }
  const startPaths = [
    {
      title: 'برای کارم چه مدلی کافی است؟',
      view: 'model-suitability', preset: 'task-first',
      description: 'مقایسهٔ مدل‌های کوچک و بزرگ بر اساس کاربرد',
      label: 'مقایسهٔ مدل‌ها'
    },
    {
      title: 'با سخت‌افزار موجود چه می‌توانم اجرا کنم؟',
      view: 'hardware-feasibility', preset: 'existing-hardware',
      description: 'بررسی مدل و پیکربندی اجرا روی CPU یا GPU',
      label: 'بررسی حافظه'
    },
    {
      title: 'چگونه با حافظهٔ کمتر اجرا کنم؟',
      view: 'deployment-compatibility', section: 'serving-software', preset: 'memory-constrained',
      description: 'کوانت و offload، همراه با نیاز به RAM و دیسک',
      label: 'روش‌های اجرا'
    },
    {
      title: 'با چه نرم‌افزاری مدل را اجرا کنم؟',
      view: 'software-products', section: 'serving-software', preset: 'software-choice',
      description: 'انتخاب ابزار اجرا و سرویس‌دهی متناسب با نیاز',
      label: 'انتخاب نرم‌افزار'
    }
  ];
  $: activeView = $page.url.searchParams.get('view') ?? '';
  $: activePreset = $page.url.searchParams.get('preset') ?? '';
  $: activeSoftwareView = activeView === 'deployment-compatibility' ? activeView : 'software-products';

  function contentLink(contentId: string, anchorId?: string) {
    const item = existingContentLinks.find((candidate) => candidate.id === contentId);
    return item ? { ...item, href: `${item.href}${anchorId ? `#${anchorId}` : ''}` } : undefined;
  }
</script>

<svelte:head>
  <title>{llmGuideCollection.title} | مهران ضیابری</title>
  <meta name="description" content={llmGuideCollection.subtitle} />
</svelte:head>

<main class="llm-guide" dir="rtl">
  <nav class="breadcrumbs wrap" aria-label="مسیر راهنما">
    <a href="/guides/?show-drafts=true">فنی‌جات</a><span aria-hidden="true">/</span><span aria-current="page">راهنمای مدل‌های زبانی</span>
  </nav>

  <PageHero eyebrow="پیش‌نویس · مدل و استنتاج" title={llmGuideCollection.title} lead={llmGuideCollection.subtitle} />

  <div class="wrap guide-layout">
    <aside class="guide-navigation">
      <details class="desktop-toc" open>
        <summary>در این مجموعه</summary>
        <nav aria-label="فهرست نماهای داده‌ای">
          <ol>
            <li><a href="#start">از کجا شروع کنیم؟</a></li>
            {#each llmGuideSections as section}
              <li>
                <a class:active={activeView === section.id || section.views.some((view) => view.id === activeView)} href={`?show-drafts=true&view=${section.views[0].id}#${section.id}`}>{numbers.format(section.number)}. {section.title}</a>
                {#if section.views.length > 1}<ul>{#each section.views as view}<li><a class:active={activeSoftwareView === view.id} href={`?show-drafts=true&view=${view.id}#${section.id}`}>{view.shortTitle}</a></li>{/each}</ul>{/if}
              </li>
            {/each}
            <li><a href="#planned-articles">مقاله‌های برنامه‌ریزی‌شده</a></li>
            <li><a href="#related-content">مطالب مرتبط موجود</a></li>
          </ol>
        </nav>
      </details>
      <details class="mobile-toc">
        <summary>در این مجموعه</summary>
        <nav aria-label="فهرست موبایل نماهای داده‌ای">
          <ol>
            <li><a href="#start">از کجا شروع کنیم؟</a></li>
            {#each llmGuideSections as section}<li><a href={`?show-drafts=true&view=${section.views[0].id}#${section.id}`}>{numbers.format(section.number)}. {section.title}</a></li>{/each}
            <li><a href="#planned-articles">مقاله‌های آینده</a></li>
          </ol>
        </nav>
      </details>
      <a class="back-link" href="/guides/?show-drafts=true">دیدن فهرست پیش‌نویس‌ها</a>
    </aside>

    <div class="guide-main">
      <div class="guide-overview">
        <img class="collection-cover" {...imageAttributes(llmGuideCollection.image, '(min-width: 1200px) 740px, calc(100vw - 32px)')} alt={llmGuideCollection.imageAlt} width="1672" height="941" fetchpriority="high" />
        <section class="start" id="start" aria-labelledby="start-title">
          <header>
            <small>راهنمای استفاده از مجموعه</small>
            <h2 id="start-title">از کجا شروع کنیم؟</h2>
            <p>از کاربرد و امکانات خود آغاز کنید؛ جدول‌ها برای مقایسهٔ مدل، حافظه، نرم‌افزار و کارایی‌اند. مسیر متناسب با نیازتان را دنبال کنید.</p>
          </header>
          <nav class="desktop-paths" aria-label="مسیرهای پیشنهادی شروع">
            {@render readingPaths()}
          </nav>
          <details class="mobile-paths">
            <summary>مسیر مناسب من کدام است؟</summary>
            <nav aria-label="مسیرهای پیشنهادی شروع">
              {@render readingPaths()}
            </nav>
          </details>
          <footer aria-label="اطلاعات مجموعه">
            <a href="?show-drafts=true&view=model-catalog#model-catalog">{numbers.format(llmRepository.models.length)} مدل</a>
            <a href="?show-drafts=true&view=software-products#serving-software">{numbers.format(llmRepository.softwareProducts.length)} نرم‌افزار</a>
            <span>{numbers.format(tableCount)} جدول تعاملی</span>
            <span class="data-updated">
              <span>آخرین به‌روزرسانی داده‌ها:</span>
              <time datetime={llmDatasetUpdatedOn}>{formatDate(llmDatasetUpdatedOn)}</time>
            </span>
          </footer>
        </section>
      </div>

      {#each llmGuideSections as section}
        {#if section.views.length === 1}
          {@const config = enrichExistingConfig(section.views[0])}
          {#if config.id === 'model-suitability'}
            <div class="use-mode" role="group" aria-label="شیوهٔ نمایش کاربرد مدل‌ها">
              <button type="button" class:active={!matrixMode} aria-pressed={!matrixMode} on:click={() => setMatrixMode(false)}>راهنمای کاربرد</button>
              <button type="button" class:active={matrixMode} aria-pressed={matrixMode} on:click={() => setMatrixMode(true)}>ماتریس مقایسه</button>
              <span>{matrixMode ? 'فقط مدل‌های مولد و چندوجهی؛ کاربردهای دلخواه را از ستون‌ها انتخاب کنید.' : 'برای RAG، نقش بازیابی، بازرتبه‌بندی و تولید پاسخ را جدا بررسی کنید.'}</span>
            </div>
            <LlmDataView config={enrichExistingConfig(modelUseViewConfig(matrixMode))} evidence={llmRepository.evidence} rows={matrixMode ? matrixRows : llmViewRows[config.id]} presetId={activeView === config.id ? activePreset : ''} onOpenModel={openModel}>{#snippet controlsContent()}<LlmTaskStartingPoints repository={llmRepository} onOpenModel={openModel} />{/snippet}</LlmDataView>
          {:else if ['hardware-feasibility', 'benchmarks'].includes(config.id)}
            <LlmResearchView repository={llmRepository} id={config.id} presetId={activeView === config.id ? activePreset : ''} onOpenModel={openModel} />
          {:else}
            <LlmDataView onOpenModel={openModel} {config} evidence={llmRepository.evidence} rows={llmViewRows[config.id]} presetId={activeView === config.id ? activePreset : ''} />
          {/if}
          {@render viewReading(config.id, config.title)}
        {:else}
          <section class="serving-section" id={section.id} aria-labelledby="serving-section-title">
            <header><small>بخش چهارم · دو نمای مستقل</small><h2 id="serving-section-title">{section.title}</h2></header>
            <nav class="subview-tabs" aria-label="نماهای نرم‌افزار اجرا و سرویس‌دهی">
              {#each section.views as view}<a aria-current={activeSoftwareView === view.id ? 'page' : undefined} class:active={activeSoftwareView === view.id} href={`?show-drafts=true&view=${view.id}#${section.id}`}>{view.subviewNumber ? `${numbers.format(view.subviewNumber)}. ` : ''}{view.title}</a>{/each}
            </nav>
            {#each section.views.filter((view) => view.id === activeSoftwareView) as config (config.id)}
              {#if config.id === 'deployment-compatibility'}<LlmResearchView repository={llmRepository} id={config.id} presetId={activeView === config.id ? activePreset : ''} onOpenModel={openModel} />{:else}<LlmDataView onOpenModel={openModel} config={enrichExistingConfig(config)} evidence={llmRepository.evidence} rows={llmViewRows[config.id]} presetId={activeView === config.id ? activePreset : ''} />{/if}
              {@render viewReading(config.id, config.title)}
            {/each}
          </section>
        {/if}
      {/each}

      <section class="planned" id="planned-articles" aria-labelledby="planned-title">
        <header><small>نقشهٔ نگارش</small><h2 id="planned-title">یادداشت‌های در حال آماده‌سازی</h2></header>
        <ol>
          {#each plannedArticles as article}
            <li id={`planned-${article.slug}`}><span>{numbers.format(article.order).padStart(2, '۰')}</span><h3>{#if draftArticles.has(article.slug)}<a href={plannedArticleHref(article.slug)}>{article.title}</a>{:else}{article.title}{/if}</h3><small>{draftArticles.has(article.slug) ? 'پیش‌نویس · قابل بازبینی' : 'برنامه‌ریزی‌شده'}</small></li>
          {/each}
        </ol>
      </section>

      <section class="related" id="related-content" aria-labelledby="related-title">
        <header><small>مطالعهٔ موجود</small><h2 id="related-title">مطالب مرتبط در ziabary.ir</h2></header>
        <div>
          {#each existingContentLinks.filter((item) => item.roles.includes('guide-overview')) as item}
            <a href={item.href}><span>{item.title}</span><i aria-hidden="true">←</i></a>
          {/each}
        </div>
      </section>
    </div>
  </div>
</main>
<LlmModelProfile repository={llmRepository} {modelId} panel={modelPanel} onClose={closeModel} onPanel={changePanel} />

{#snippet readingPaths()}
  <ol class="start-paths">
    {#each startPaths as path, index}
      <li>
        <span class="path-number" aria-hidden="true">{numbers.format(index + 1).padStart(2, '۰')}</span>
        <div>
          <h3>{path.title}</h3>
          <div class="path-summary">
            <p>{path.description}</p>
            <a class="path-button" href={`?show-drafts=true&view=${path.view}&preset=${path.preset}#${path.section ?? path.view}`}>
              {path.label} <span aria-hidden="true">←</span>
            </a>
          </div>
        </div>
      </li>
    {/each}
  </ol>
{/snippet}

{#snippet viewReading(viewId: string, title: string)}
  <nav class="view-reading" aria-label={`مطالعهٔ مرتبط با ${title}`} data-reading-for={viewId}>
    <b>مقاله‌های مرتبط با این جدول</b>
    <div class="planned-reading">
      {#each viewPlannedArticles[viewId] ?? [] as slug}
        {@const article = plannedArticles.find(item => item.slug === slug)}
        {#if article}<a href={plannedArticleHref(article.slug)}><span>{article.title}</span><small>{draftArticles.has(article.slug) ? 'پیش‌نویس' : 'در برنامهٔ نگارش'}</small></a>{/if}
      {/each}
    </div>
    {#if viewRelatedContent[viewId]?.length}
      <div class="published-reading"><span>مطالعهٔ منتشرشده:</span>
        {#each viewRelatedContent[viewId] as relation}
          {@const link = contentLink(relation.contentId, relation.anchorId)}
          {#if link}<a href={link.href}>{relation.anchorId ? link.anchors?.find(anchor => anchor.id === relation.anchorId)?.label ?? link.title : link.title} ←</a>{/if}
        {/each}
      </div>
    {/if}
  </nav>
{/snippet}

<style>
  .view-reading{white-space:normal}
  .view-reading a{min-width:0;white-space:normal;overflow-wrap:anywhere}
  .llm-guide{min-width:0}.breadcrumbs{display:flex;position:static;inset:auto;flex-direction:row;gap:8px;align-items:center;margin-inline:auto;padding:26px 0 0;border:0;background:transparent;color:var(--muted);font-size:11px}.breadcrumbs a{color:var(--link-ink)}.guide-layout{display:grid;grid-template-columns:188px minmax(0,1fr);gap:24px;width:calc(100% - 200px);max-width:none;margin-inline-start:12px;margin-inline-end:188px;padding-block:18px 80px;align-items:start}.guide-navigation{position:sticky;top:100px;min-width:0}.guide-navigation details{border-bottom:1px solid var(--line)}.guide-navigation summary{padding:11px 0;cursor:pointer;font-size:12px;font-weight:800}.guide-navigation nav{display:block;position:static;inset:auto;margin:0;padding:0;border:0;background:transparent;max-height:calc(100dvh - 210px);overflow:auto}.guide-navigation ol{list-style:none;margin:0;padding:0}.guide-navigation a{display:block;padding:8px 10px;border-inline-start:2px solid var(--line);color:var(--muted);font-size:10px;line-height:1.7;white-space:normal}.guide-navigation a:hover,.guide-navigation a.active{border-color:var(--teal);color:var(--link-ink)}.guide-navigation .back-link{margin-top:13px;border:0;color:var(--link-ink)}.mobile-toc{display:none}.guide-main{min-width:0}.llm-guide>:global(.page-hero){width:calc(100% - 412px);margin-inline-start:224px;margin-inline-end:188px;padding-block:35px 25px;text-align:start}.llm-guide>:global(.page-hero h1){max-width:920px;font-size:clamp(34px,4vw,56px);line-height:1.35}.llm-guide>:global(.page-hero>p:last-child){max-width:850px;font-size:14px}
  .planned h2,.related h2{margin:12px 0 10px;font-size:clamp(24px,2.8vw,34px);line-height:1.6}
  .start{min-width:0;scroll-margin-top:100px;align-self:start;padding:24px;border:1px solid var(--line);background:var(--soft)}
  .start header small,.planned header small,.related header small,.serving-section>header small{color:var(--teal);font-size:11px}
  .start h2{margin:10px 0 12px;font-size:26px;line-height:1.6}
  .start header p{margin:0;color:var(--muted);font-size:14px;line-height:2.1}
  .start nav{display:block;position:static;inset:auto;width:100%;margin:0;padding:0;border:0;background:transparent}
  .start-paths{list-style:none;margin:18px 0 0;padding:0}
  .start-paths li{display:grid;grid-template-columns:25px minmax(0,1fr);gap:12px;padding:12px 0;border-top:1px solid var(--line)}
  .path-number{color:var(--teal);font-size:12px;padding-top:3px}
  .start-paths h3{margin:0;font-size:15px;line-height:1.9}
  .path-summary{display:flex;flex-wrap:wrap;align-items:center;gap:8px 12px;margin-top:6px}
  .path-summary p{flex:1 1 180px;min-width:0;margin:0;color:var(--muted);font-size:12px;line-height:2}
  .start-paths .path-button{display:inline-flex;flex-shrink:0;align-items:center;justify-content:center;gap:8px;min-height:36px;padding:6px 10px;border:1px solid var(--teal);border-radius:6px;background:var(--paper);color:var(--link-ink);font-size:11px;font-weight:700;line-height:1.8;white-space:nowrap}
  .path-button:hover{background:var(--teal);color:var(--paper)}
  .start footer a:hover{text-decoration:underline;text-underline-offset:4px}
  .start a:focus-visible,.mobile-paths summary:focus-visible{outline:2px solid var(--teal);outline-offset:5px;border-radius:2px}
  .start footer{display:flex;flex-wrap:wrap;gap:8px 16px;margin:4px 0 0;padding:14px 0 0;background:transparent;border-top:1px solid var(--line);color:var(--muted);font-size:11px;line-height:1.9}
  .start footer a{color:inherit}
  .data-updated{flex-basis:100%;display:flex;flex-wrap:wrap;align-items:baseline;gap:4px 8px}
  .data-updated time{color:var(--ink);font-weight:600;white-space:nowrap}
  .mobile-paths{display:none}
  @media(max-width:700px){.start{padding:22px}.start h2{font-size:23px}.start .desktop-paths{display:none}.mobile-paths{display:block;margin-top:22px;border-top:1px solid var(--line)}.mobile-paths summary{padding:15px 0;cursor:pointer;font-size:13px;font-weight:700;color:var(--link-ink)}.mobile-paths .start-paths{margin-top:0}.start footer{justify-content:space-between;margin-top:18px;border-top:0;padding-top:0}}
  .guide-navigation ul{list-style:none;margin:0;padding-inline-start:9px}.guide-navigation ul a{font-size:9px}.serving-section{scroll-margin-top:90px;padding-top:42px;border-top:1px solid var(--line)}.serving-section>header h2{margin:5px 0 14px;font-size:clamp(24px,2.8vw,36px)}.subview-tabs{display:flex;position:static;inset:auto;gap:0;margin:0;border:1px solid var(--line);background:var(--paper)}.subview-tabs a{flex:1;padding:12px;color:var(--muted);font-size:11px;text-align:center}.subview-tabs a+a{border-inline-start:1px solid var(--line)}.subview-tabs a.active{background:color-mix(in srgb,var(--teal) 9%,var(--paper));color:var(--link-ink);font-weight:800}.serving-section :global(.llm-view){border-top:0}.view-reading{display:block;position:static;inset:auto;margin:-20px 0 36px;padding:20px;border:1px solid var(--line);border-radius:8px;background:var(--paper)}.view-reading>b{font-size:13px}.planned-reading{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px 24px;margin-top:12px}.planned-reading a{display:flex;align-items:start;justify-content:space-between;gap:10px;padding:10px 0;border-top:1px solid var(--line);color:var(--link-ink);font-size:12px;line-height:1.9}.planned-reading small{flex-shrink:0;margin-top:2px;border:1px solid var(--line);border-radius:4px;padding:2px 6px;color:var(--muted);font-size:9px}.published-reading{display:flex;flex-wrap:wrap;gap:6px 18px;margin-top:14px;padding-top:12px;border-top:1px solid var(--line);color:var(--muted);font-size:11px;line-height:1.9}.published-reading a{color:var(--link-ink)}
  .guide-overview{display:grid;grid-template-columns:minmax(0,1.2fr) minmax(0,.8fr);gap:28px;align-items:start;padding-bottom:28px}.use-mode{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-top:28px}.use-mode button{font:inherit;font-size:13px;padding:10px 16px;border:1px solid var(--line);border-radius:8px;background:var(--paper);color:var(--ink);cursor:pointer}.use-mode button.active{color:var(--link-ink);background:var(--soft);border-color:var(--teal)}.use-mode span{font-size:12px;color:var(--muted);margin-inline-start:10px}.collection-cover{display:block;width:100%;height:auto;aspect-ratio:1672/941;object-fit:cover;border-radius:14px;margin-bottom:28px}.planned li{scroll-margin-top:120px}.planned li:target{background:var(--soft);border-inline-start:3px solid var(--teal);padding-inline:12px}
  @media(max-width:850px){.planned-reading{grid-template-columns:1fr}.planned-reading a{flex-wrap:wrap}.view-reading{padding:16px}}

  .planned,.related{scroll-margin-top:100px;padding-block:46px;border-top:1px solid var(--line)}.planned ol{list-style:none;margin:20px 0 0;padding:0;border-top:1px solid var(--line)}.planned li{display:grid;grid-template-columns:42px minmax(0,1fr) auto;gap:12px;align-items:center;padding:12px 4px;border-bottom:1px solid var(--line)}.planned li>span{color:var(--teal);font:700 11px/1 Arial,sans-serif}.planned h3{margin:0;font-size:13px;line-height:1.8}.planned li small{padding:4px 7px;border:1px solid var(--line);border-radius:99px;color:var(--muted);font-size:8px}.related>div{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));border-top:1px solid var(--line)}.related a{display:flex;justify-content:space-between;gap:15px;padding:14px 10px;border-bottom:1px solid var(--line);color:var(--ink);font-size:11px;line-height:1.8}.related a:nth-child(even){border-inline-start:1px solid var(--line)}.related i{color:var(--teal);font-style:normal}
  @media(max-width:1199px){.guide-overview{grid-template-columns:1fr}.collection-cover{margin-bottom:0}.llm-guide>:global(.page-hero){width:calc(100% - 32px);margin-inline:auto}.guide-layout{display:block;width:calc(100% - 32px);margin-inline:auto}.guide-navigation{position:static;margin-bottom:20px}.desktop-toc{display:none}.mobile-toc{display:block}.guide-navigation nav{max-height:46vh}.guide-navigation .back-link{padding-inline:0}.view-reading{margin-top:-22px}}
  @media(max-width:700px){.breadcrumbs{padding-top:18px}.related>div{grid-template-columns:1fr}.subview-tabs{display:grid}.subview-tabs a+a{border-inline-start:0;border-top:1px solid var(--line)}.planned li{grid-template-columns:32px minmax(0,1fr)}.planned li small{grid-column:2;justify-self:start}.related a:nth-child(even){border-inline-start:0}}
</style>
