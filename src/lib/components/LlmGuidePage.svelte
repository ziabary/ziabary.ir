<script lang="ts">
  import { page } from '$app/stores';
  import { browser } from '$app/environment';
  import { goto } from '$app/navigation';
  import { onMount, tick, type Component } from 'svelte';
  import LlmGuideChapters from './LlmGuideChapters.svelte';
  import { headingSections, readingPosition, keepCurrentVisible } from '$lib/contents-navigation';
  import LlmModelProfile from './LlmModelProfile.svelte';
  import PageHero from './PageHero.svelte';
  import LlmDataView from './LlmDataView.svelte';
  import LlmResearchView from './LlmResearchView.svelte';
  import LlmTaskStartingPoints from './LlmTaskStartingPoints.svelte';
  import { enrichResearchRepository } from '$lib/llm/research';
  import { enrichExistingRows, enrichExistingConfig } from '$lib/llm/research-views';
  import { imageAttributes } from '$lib/images';
  import { articles } from '$lib/content';
  import { formatDate } from '$lib/publication.mjs';
  import {
    viewRelatedContent,
    llmGuideCollection,
    llmDatasetUpdatedOn,
    llmRepository as baseRepository,
    llmArticleSlugs,
    viewReadingArticles
  } from '$lib/llm/guide';
  import { buildLlmViewRows, adaptModelUseMatrix } from '$lib/llm/adapters';
  import { llmGuideSections, modelUseViewConfig } from '$lib/llm/views';

  export let chapters: Record<string, Component<{ headingPrefix?: string }>> = {};
  let activeTarget = '';
  const followHeading = (id: string) => activeTarget = id;
  async function revealChapter(id: string) {
    const target = document.getElementById(id);
    const details = target?.closest('.llm-chapter')?.querySelector<HTMLDetailsElement>('details');
    if (details) {
      details.open = true;
      await tick();
      await document.fonts.ready;
      requestAnimationFrame(() => target?.scrollIntoView({ block: 'start', behavior: 'instant' }));
    }
  }
  onMount(() => {
    const fromHash = () => { try { revealChapter(decodeURIComponent(location.hash.slice(1))); } catch {} };
    fromHash(); window.addEventListener('hashchange', fromHash);
    return () => window.removeEventListener('hashchange', fromHash);
  });
  const numbers = new Intl.NumberFormat('fa-IR');
  const publishedArticles = new Map(articles.filter(article => article.lang === 'fa' && !article.draft).map(article => [article.slug, article]));
  const readingArticles = new Map(articles.filter(article => article.lang === 'fa' && llmArticleSlugs.includes(article.slug)).map(article => [article.slug, article]));
  const chapterArticles = llmArticleSlugs.flatMap(slug => readingArticles.get(slug) ?? []);
  const targetIds = ['start', ...llmGuideSections.map(section => section.id), 'llm-notes', ...chapterArticles.flatMap(article => [article.slug, ...(article.headings ?? []).map(h => `${article.slug}--${h.id}`)])];
  $: activeChapter = chapterArticles.find(article => activeTarget === article.slug || activeTarget.startsWith(`${article.slug}--`));
  const llmRepository = enrichResearchRepository(baseRepository);
  const llmViewRows = enrichExistingRows(llmRepository, buildLlmViewRows(llmRepository));
  const matrixRows = adaptModelUseMatrix(llmRepository);
  const tableCount = llmGuideSections.reduce((count, section) => count + section.views.length, 0);
  $: routeParams = browser ? $page.url.searchParams : new URLSearchParams();
  $: matrixMode = routeParams.get('usage') === 'matrix';
  async function setMatrixMode(matrix: boolean) {
    const url = new URL($page.url);
    if (matrix) url.searchParams.set('usage', 'matrix'); else url.searchParams.delete('usage');
    await goto(url, { noScroll: true, keepFocus: true });
  }
  let returnFocus: HTMLElement | null = null;
  $: modelId = routeParams.get('model') ?? '';
  $: modelPanel = routeParams.get('panel') ?? 'overview';
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
      label: 'جدول مدل‌ها', article: 'right-model-size-for-the-task'
    },
    {
      title: 'با سخت‌افزار موجود چه می‌توانم اجرا کنم؟',
      view: 'hardware-feasibility', preset: 'existing-hardware',
      description: 'بررسی مدل و پیکربندی اجرا روی CPU یا GPU',
      label: 'جدول حافظه', article: 'llms-on-rtx-4090-24gb-vs-48gb'
    },
    {
      title: 'چگونه با حافظهٔ کمتر اجرا کنم؟',
      view: 'deployment-compatibility', section: 'serving-software', preset: 'memory-constrained',
      description: 'کوانت و offload، همراه با نیاز به RAM و دیسک',
      label: 'جدول اجرا', article: 'four-bit-model-quantization'
    },
    {
      title: 'با چه نرم‌افزاری مدل را اجرا کنم؟',
      view: 'software-products', section: 'serving-software', preset: 'software-choice',
      description: 'انتخاب ابزار اجرا و سرویس‌دهی متناسب با نیاز',
      label: 'جدول نرم‌افزار', article: 'ollama-vllm-sglang-or-llama-cpp'
    }
  ];
  $: activeView = routeParams.get('view') ?? '';
  $: activePreset = routeParams.get('preset') ?? '';
  $: activeSoftwareView = activeView === 'deployment-compatibility' ? activeView : 'software-products';


</script>

<svelte:head>
  <title>{llmGuideCollection.title} | مهران ضیابری</title>
  <meta name="description" content={llmGuideCollection.subtitle} />
</svelte:head>

<main class="llm-guide" dir="rtl">
  <nav class="breadcrumbs wrap" aria-label="مسیر راهنما">
    <a href="/guides/">فنی‌جات</a><span aria-hidden="true">/</span><span aria-current="page">راهنمای مدل‌های زبانی</span>
  </nav>

  <PageHero eyebrow={llmGuideCollection.eyebrow} title={llmGuideCollection.title} lead={llmGuideCollection.subtitle} />

  <div class="wrap guide-layout">
    <aside class="guide-navigation" data-reading-navigation>
      <details class="desktop-toc" open>
        <summary>در این مجموعه</summary>
        <nav aria-label="فهرست راهنما" use:keepCurrentVisible={activeTarget}>{@render guideContents()}</nav>
      </details>
      <a class="back-link" href="/guides/">دیدن مجموعه‌های فنی</a>
    </aside>

    <div class="guide-main" use:readingPosition={{ ids: targetIds, onChange: followHeading }}>
      <div class="guide-overview">
        <img class="collection-cover" {...imageAttributes(llmGuideCollection.image, '(min-width: 1200px) 740px, calc(100vw - 32px)')} alt={llmGuideCollection.imageAlt} width="1672" height="941" fetchpriority="high" />
        <section class="start" id="start" aria-labelledby="start-title">
          <header>
            <small>راهنمای استفاده از مجموعه</small>
            <h2 id="start-title">از کجا شروع کنیم؟</h2>
            <p>برای مقایسه، جدول را باز کنید؛ برای شناخت گزینه‌ها و دلیل انتخاب، مقالهٔ همان مسیر را بخوانید.</p>
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
            <a href="#llm-notes">{numbers.format(readingArticles.size)} مقالهٔ راهنما</a>
            <span class="data-updated">
              <span>آخرین به‌روزرسانی داده‌ها:</span>
              <time datetime={llmDatasetUpdatedOn}>{formatDate(llmDatasetUpdatedOn)}</time>
            </span>
          </footer>
        </section>
      </div>

      <div class="guide-navigation mobile-navigation">
      <details class="mobile-toc">
        <summary>در این مجموعه</summary>
        <nav aria-label="فهرست موبایل راهنما" use:keepCurrentVisible={activeTarget}>{@render guideContents()}</nav>
      </details>
      </div>

      {#each llmGuideSections as section}
        {#if section.views.length === 1}
          {@const config = enrichExistingConfig(section.views[0])}
          {#if config.id === 'model-suitability'}
            <div class="use-mode" role="group" aria-label="شیوهٔ نمایش کاربرد مدل‌ها">
              <button type="button" class:active={!matrixMode} aria-pressed={!matrixMode} onclick={() => setMatrixMode(false)}>راهنمای کاربرد</button>
              <button type="button" class:active={matrixMode} aria-pressed={matrixMode} onclick={() => setMatrixMode(true)}>ماتریس مقایسه</button>
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

      <LlmGuideChapters articles={chapterArticles} {chapters} />


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
            <div class="path-actions">
            <a class="path-button" href={`?show-drafts=true&view=${path.view}&preset=${path.preset}#${path.section ?? path.view}`}>
              {path.label} <span aria-hidden="true">←</span>
            </a>
              <a class="path-button article-path" href={`#${path.article}`} onclick={() => revealChapter(path.article)} aria-label={`خواندن مقاله: ${readingArticles.get(path.article)?.title}`} title={readingArticles.get(path.article)?.title}>
                مقالهٔ راهنما <span aria-hidden="true">←</span>
              </a>
            </div>
          </div>
        </div>
      </li>
    {/each}
  </ol>
{/snippet}

{#snippet viewReading(viewId: string, title: string)}
  <nav class="view-reading" aria-label={`راهنمای مرتبط با ${title}`} data-reading-for={viewId}>
    <h3 class="reading-heading">یادداشت‌های مرتبط با این جدول</h3>
    <div class="reading-cards">
      {#each [...(viewReadingArticles[viewId] ?? []).map(contentId => ({ contentId, anchorId: undefined })), ...(viewRelatedContent[viewId] ?? [])] as item}
        {@const slug = item.contentId}
        {@const article = publishedArticles.get(slug)}
        {@const embedded = readingArticles.has(slug)}
        {#if article}
          <a class="reading-card" href={embedded ? `#${slug}` : `/articles/${slug}/${item.anchorId ? `#${item.anchorId}` : ''}`} onclick={() => { if (embedded) revealChapter(slug); }}>
            {#if article.cover}
              <img {...imageAttributes(article.cover, '112px')} alt="" loading="lazy" width="640" height="360" />
            {/if}
            <div class="reading-card-body">
              <h4>{article.title}</h4>
              <p>{article.excerpt}</p>
              <div class="reading-card-footer"><span>{embedded ? 'خواندن در همین صفحه' : 'خواندن مقاله'} <span aria-hidden="true">←</span></span><small>{article.readTime}</small></div>
            </div>
          </a>
        {/if}
      {/each}
    </div>
    <a class="all-notes" href="#llm-notes">همهٔ یادداشت‌های راهنما ←</a>
  </nav>
{/snippet}

{#snippet guideContents()}
  <a href="#start" aria-current={activeTarget === 'start' ? 'location' : undefined}>از کجا شروع کنیم؟</a>
  <details class="toc-group" open>
    <summary>جدول‌ها</summary>
    <ol>{#each llmGuideSections as section}
      <li><a class:active={activeTarget === section.id} aria-current={activeTarget === section.id ? 'location' : undefined} href={`?show-drafts=true&view=${section.views[0].id}#${section.id}`}>{numbers.format(section.number)}. {section.title}</a>
      {#if section.views.length > 1}<ul>{#each section.views as view}<li><a class:active={activeTarget === section.id && activeSoftwareView === view.id} href={`?show-drafts=true&view=${view.id}#${section.id}`}>{view.shortTitle}</a></li>{/each}</ul>{/if}</li>
    {/each}</ol>
  </details>
  <details class="toc-group" open>
    <summary>یادداشت‌ها <span>{numbers.format(chapterArticles.length)}</span></summary>
    <ol>{#each chapterArticles as article, index}
      <li><a class:active={activeChapter?.slug === article.slug} aria-current={activeTarget === article.slug ? 'location' : undefined} href={`#${article.slug}`} onclick={() => revealChapter(article.slug)}>{numbers.format(index + 1)}. {article.title}</a>
        {#if activeChapter?.slug === article.slug}<ul>{#each headingSections(article.headings ?? []) as heading}
          {@const id = `${article.slug}--${heading.id}`}
          <li><a class:active={activeTarget === id} aria-current={activeTarget === id ? 'location' : undefined} href={`#${id}`} onclick={() => revealChapter(id)}>{heading.title}</a>
            {#if activeTarget === id || heading.children.some(child => activeTarget === `${article.slug}--${child.id}`)}<ul>{#each heading.children as child}
              {@const childId = `${article.slug}--${child.id}`}
              <li><a class:active={activeTarget === childId} aria-current={activeTarget === childId ? 'location' : undefined} href={`#${childId}`} onclick={() => revealChapter(childId)}>{child.title}</a></li>
            {/each}</ul>{/if}
          </li>
        {/each}</ul>{/if}
      </li>
    {/each}</ol>
  </details>
{/snippet}

<style>
  .llm-guide{min-width:0}.breadcrumbs{display:flex;position:static;inset:auto;flex-direction:row;gap:8px;align-items:center;margin-inline:auto;padding:26px 0 0;border:0;background:transparent;color:var(--muted);font-size:11px}.breadcrumbs a{color:var(--link-ink)}.guide-layout{display:grid;grid-template-columns:188px minmax(0,1fr);gap:24px;width:calc(100% - 200px);max-width:none;margin-inline-start:12px;margin-inline-end:188px;padding-block:18px 80px;align-items:start}.guide-navigation{position:sticky;top:100px;min-width:0}.guide-navigation details{border-bottom:1px solid var(--line)}.guide-navigation summary{padding:11px 0;cursor:pointer;font-size:12px;font-weight:800}.guide-navigation nav{display:block;position:static;inset:auto;margin:0;padding:0;border:0;background:transparent;max-height:calc(100dvh - 210px);overflow:auto}.guide-navigation ol{list-style:none;margin:0;padding:0}.guide-navigation a{display:block;padding:8px 10px;border-inline-start:2px solid var(--line);color:var(--muted);font-size:10px;line-height:1.7;white-space:normal}.guide-navigation a:hover,.guide-navigation a.active{border-color:var(--teal);color:var(--link-ink)}.guide-navigation .back-link{margin-top:13px;border:0;color:var(--link-ink)}.mobile-toc{display:none}.guide-main{min-width:0}.llm-guide>:global(.page-hero){width:calc(100% - 412px);margin-inline-start:224px;margin-inline-end:188px;padding-block:35px 25px;text-align:start}.llm-guide>:global(.page-hero h1){max-width:920px;font-size:clamp(34px,4vw,56px);line-height:1.35}.llm-guide>:global(.page-hero>p:last-child){max-width:850px;font-size:14px}
  .start{min-width:0;scroll-margin-top:100px;align-self:start;padding:24px;border:1px solid var(--line);background:var(--soft)}
  .start header small,.serving-section>header small{color:var(--teal);font-size:11px}
  .start h2{margin:10px 0 12px;font-size:26px;line-height:1.6}
  .start header p{margin:0;color:var(--muted);font-size:14px;line-height:2.1}
  .start nav{display:block;position:static;inset:auto;width:100%;margin:0;padding:0;border:0;background:transparent}
  .start-paths{list-style:none;margin:18px 0 0;padding:0}
  .start-paths li{display:grid;grid-template-columns:25px minmax(0,1fr);gap:12px;padding:12px 0;border-top:1px solid var(--line)}
  .path-number{color:var(--teal);font-size:12px;padding-top:3px}
  .start-paths h3{margin:0;font-size:15px;line-height:1.9}
  .path-summary{display:flex;flex-wrap:wrap;align-items:center;gap:8px 12px;margin-top:6px}
  .path-summary p{flex:1 1 140px;min-width:0;margin:0;color:var(--muted);font-size:12px;line-height:2}
  .path-actions{display:flex;flex-wrap:wrap;justify-content:flex-end;gap:6px}
  .start-paths .path-button{display:inline-flex;flex-shrink:0;align-items:center;justify-content:center;gap:8px;min-height:36px;padding:6px 10px;border:1px solid var(--teal);border-radius:6px;background:var(--paper);color:var(--link-ink);font-size:11px;font-weight:700;line-height:1.8;white-space:nowrap}
  .start-paths .article-path{border-color:var(--line);background:transparent}
  .path-button:hover{background:var(--teal);color:var(--paper)}
  .start footer a:hover{text-decoration:underline;text-underline-offset:4px}
  .start a:focus-visible,.mobile-paths summary:focus-visible{outline:2px solid var(--teal);outline-offset:5px;border-radius:2px}
  .start footer{display:flex;flex-wrap:wrap;gap:8px 16px;margin:4px 0 0;padding:14px 0 0;background:transparent;border-top:1px solid var(--line);color:var(--muted);font-size:11px;line-height:1.9}
  .start footer a{color:inherit}
  .data-updated{flex-basis:100%;display:flex;flex-wrap:wrap;align-items:baseline;gap:4px 8px}
  .data-updated time{color:var(--ink);font-weight:600;white-space:nowrap}
  .mobile-paths{display:none}
  @media(max-width:700px){.start{padding:22px}.start h2{font-size:23px}.start .desktop-paths{display:none}.mobile-paths{display:block;margin-top:22px;border-top:1px solid var(--line)}.mobile-paths summary{padding:15px 0;cursor:pointer;font-size:13px;font-weight:700;color:var(--link-ink)}.mobile-paths .start-paths{margin-top:0}.start footer{justify-content:space-between;margin-top:18px;border-top:0;padding-top:0}}
  .guide-navigation ul{list-style:none;margin:0;padding-inline-start:9px}.guide-navigation ul a{font-size:9px}.serving-section{scroll-margin-top:90px;padding-top:42px;border-top:1px solid var(--line)}.serving-section>header h2{margin:5px 0 14px;font-size:clamp(24px,2.8vw,36px)}.subview-tabs{display:flex;position:static;inset:auto;gap:0;margin:0;border:1px solid var(--line);background:var(--paper)}.subview-tabs a{flex:1;padding:12px;color:var(--muted);font-size:11px;text-align:center}.subview-tabs a+a{border-inline-start:1px solid var(--line)}.subview-tabs a.active{background:color-mix(in srgb,var(--teal) 9%,var(--paper));color:var(--link-ink);font-weight:800}.serving-section :global(.llm-view){border-top:0}
  
  .view-reading{display:block;position:static;inset:auto;margin:-20px 0 36px;padding:20px;border:1px solid var(--line);border-radius:8px;background:var(--paper)}
  .reading-heading{margin:0 0 16px;font-size:15px;line-height:1.9}
  .reading-cards{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
  .reading-card{display:flex;flex-direction:row;align-items:start;gap:14px;padding:14px;min-width:0;overflow:hidden;border:1px solid var(--line);border-radius:9px;background:var(--soft);color:var(--ink);text-decoration:none;white-space:normal;text-align:start}
  .reading-card:hover{border-color:var(--teal)}
  .reading-card:focus-visible{outline:2px solid var(--teal);outline-offset:4px}
  .reading-card img{display:block;flex:0 0 96px;width:96px;height:72px;object-fit:cover;border-radius:6px}
  .reading-card-body{display:flex;min-width:0;flex:1;flex-direction:column}
  .reading-card h4{margin:0 0 5px;font-size:13px;line-height:1.85}
  .reading-card p{display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;line-clamp:2;overflow:hidden;margin:0 0 10px;color:var(--muted);font-size:11px;line-height:1.9}
  .reading-card-footer{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:6px;margin-top:auto;color:var(--link-ink);font-size:10px;font-weight:700}
  .reading-card-footer small{color:var(--muted);font-size:9px;font-weight:400}
  .all-notes{display:inline-block;margin-top:16px;font-size:12px;color:var(--link-ink)}
  @media(min-width:1800px){.reading-cards{grid-template-columns:repeat(3,minmax(0,1fr))}}
  @media(max-width:850px){.reading-cards{grid-template-columns:minmax(0,1fr)}}
  @media(max-width:450px){.reading-card{gap:10px;padding:10px}.reading-card img{flex-basis:64px;width:64px;height:52px}.reading-card h4{font-size:12px}.reading-card p{font-size:10px}}
  .toc-group>summary{display:flex;justify-content:space-between;color:var(--ink)}.toc-group>summary span{color:var(--teal);font-size:10px}.guide-navigation a[aria-current="location"]{border-color:var(--teal);color:var(--link-ink)}
  .guide-overview{display:grid;grid-template-columns:minmax(0,1.2fr) minmax(0,.8fr);gap:28px;align-items:start;padding-bottom:28px}.use-mode{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-top:28px}.use-mode button{font:inherit;font-size:13px;padding:10px 16px;border:1px solid var(--line);border-radius:8px;background:var(--paper);color:var(--ink);cursor:pointer}.use-mode button.active{color:var(--link-ink);background:var(--soft);border-color:var(--teal)}.use-mode span{font-size:12px;color:var(--muted);margin-inline-start:10px}.collection-cover{display:block;width:100%;height:auto;aspect-ratio:1672/941;object-fit:cover;border-radius:14px;margin-bottom:28px}
  @media(max-width:850px){.view-reading{padding:16px}}

  
  @media(max-width:1199px){.guide-overview{grid-template-columns:1fr}.collection-cover{margin-bottom:0}.llm-guide>:global(.page-hero){width:calc(100% - 32px);margin-inline:auto}.guide-layout{display:block;width:calc(100% - 32px);margin-inline:auto}.guide-navigation{position:static;margin-bottom:20px}.desktop-toc{display:none}.mobile-toc{display:block}.guide-navigation nav{max-height:46vh}.guide-navigation .back-link{padding-inline:0}.view-reading{margin-top:-22px}}
  @media(max-width:700px){.breadcrumbs{padding-top:18px}.subview-tabs{display:grid}.subview-tabs a+a{border-inline-start:0;border-top:1px solid var(--line)}}
  .mobile-navigation{display:none}
  @media(max-width:1199px){aside.guide-navigation{display:none}.mobile-navigation{display:block}}
  .guide-navigation nav{scrollbar-width:thin;scrollbar-color:var(--line) transparent}.guide-navigation nav::-webkit-scrollbar{width:6px}.guide-navigation nav::-webkit-scrollbar-track{background:transparent}.guide-navigation nav::-webkit-scrollbar-thumb{background:var(--line);border-radius:8px}.guide-navigation nav::-webkit-scrollbar-button{display:none}
</style>
