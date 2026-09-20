<script lang="ts">
  import { getLlmI18n } from '$lib/llm/i18n/context';
  const i18n = getLlmI18n();
  const { t, locale, direction, numberFormat } = i18n;
  const { enrichResearchRepository } = createLlmResearch(i18n);
  const { enrichExistingRows, enrichExistingConfig } = createLlmResearchViews(i18n);
  const { viewRelatedContent, llmDatasetUpdatedOn, llmRepository: baseRepository, viewReadingArticles } = createLlmGuide(i18n);
  const { buildLlmViewRows, adaptModelUseMatrix } = createLlmAdapters(i18n);
  const { llmGuideSections, modelUseViewConfig } = createLlmViews(i18n);
  import { page } from '$app/stores';
  import { browser } from '$app/environment';
  import { goto } from '$app/navigation';
  import { onMount, tick, type Component } from 'svelte';
  import LlmQualityComparison from './LlmQualityComparison.svelte';
  import LlmReferenceComparisons from './LlmReferenceComparisons.svelte';
  import LlmGuideChapters from './LlmGuideChapters.svelte';
  import { headingSections, readingPosition, keepCurrentVisible } from '$lib/contents-navigation';
  import LlmModelProfile from './LlmModelProfile.svelte';
  import GuideOpening from './GuideOpening.svelte';
  import LlmDataView from './LlmDataView.svelte';
  import LlmResearchView from './LlmResearchView.svelte';
  import LlmScoreSelector from './LlmScoreSelector.svelte';
  import { readScoreScope } from '$lib/llm/score-scope';
  import LlmOrganizationWizard from './LlmOrganizationWizard.svelte';
  import LlmTaskStartingPoints from './LlmTaskStartingPoints.svelte';
  import { createLlmResearch } from '$lib/llm/research';
  import { createLlmResearchViews } from '$lib/llm/research-views';
  import { imageAttributes } from '$lib/images';
  import { allArticleMetadata as articles, getArticle } from '$lib/content';
  import groups from '$lib/translation-groups.json';
  import { llmCollection, llmEditionSlugs, llmTopicSlug, llmBase, llmEditionPolicy } from '$lib/llm/editions';
  import { localizeLlmRepository } from '$lib/llm/i18n/runtime';
  import { llmSelectionHref } from '$lib/llm/selection';
  const llmGuideCollection = llmCollection(locale);
  const llmArticleSlugs = llmEditionSlugs(locale);
  const base = llmBase(locale);
  const sectionHref = (view: string, hash: string, preset: string | null = null) => llmSelectionHref($page.url, {view, preset, 'research-model':null}, hash);
  function readingSlug(slug: string) {
    return llmTopicSlug(slug, locale) ?? (locale === 'fa' ? slug : Object.values(groups).find(group => (group as Record<string,string>).fa === slug)?.[locale]);
  }
  import { formatDate } from '$lib/publication.mjs';
  import { createLlmGuide } from '$lib/llm/guide';
  import { createLlmAdapters } from '$lib/llm/adapters';
  import { createLlmViews } from '$lib/llm/views';

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
  const numbers = new Intl.NumberFormat(numberFormat);
  $: publishedArticles = new Map(articles.filter(article => article.lang === locale && (getArticle(article.slug, locale) || chapters[article.slug])).map(article => [article.slug, article]));
  $: readingArticles = new Map(articles.filter(article => article.lang === locale && chapters[article.slug] && llmArticleSlugs.some(slug => slug === article.slug)).map(article => [article.slug, article]));
  $: chapterArticles = llmArticleSlugs.flatMap(slug => chapters[slug] ? readingArticles.get(slug) ?? [] : []);
  $: targetIds = ['start', 'llm-starting-plan', ...llmGuideSections.map(section => section.id), 'llm-notes', ...chapterArticles.flatMap(article => [article.slug, ...(article.headings ?? []).map(h => `${article.slug}--${h.id}`)])];
  $: activeChapter = chapterArticles.find(article => activeTarget === article.slug || activeTarget.startsWith(`${article.slug}--`));
  const llmRepository = enrichResearchRepository(localizeLlmRepository(baseRepository, i18n));
  $: targetLanguage = ['all','fa','en','es','ar','de','fr','zh'].includes(routeParams.get('target-language') ?? '') ? routeParams.get('target-language')! : llmEditionPolicy[locale].targetLanguage;
  $: llmViewRows = enrichExistingRows(llmRepository, buildLlmViewRows(llmRepository), targetLanguage, readScoreScope(routeParams.get('score'), locale), $page.url);
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
      title: t('LlmGuidePage.1008'),
      view: 'model-suitability', preset: 'task-first',
      description: t('start.choice.description'), label: t('start.choice.table'),
      articles: [
        { slug: 'right-model-size-for-the-task', label: t('start.choice.size') },
        { slug: 'evaluating-language-models-for-persian', label: t('start.choice.evaluation') }
      ]
    },
    {
      title: t('start.knowledge.title'),
      view: 'specialized-models', preset: null,
      description: t('start.knowledge.description'), label: t('start.knowledge.table'),
      articles: [
        { slug: 'rag-cag-kag-fine-tuning-instruction-tuning', label: t('start.knowledge.methods') },
        { slug: 'enterprise-rag-model-embedding-reranker', label: t('start.knowledge.rag') }
      ]
    },
    {
      title: t('LlmGuidePage.1011'),
      view: 'hardware-feasibility', preset: 'existing-hardware',
      description: t('start.hardware.description'), label: t('LlmGuidePage.1013'),
      articles: [
        { slug: 'llms-on-rtx-4090-24gb-vs-48gb', label: t('start.hardware.memory') },
        { slug: 'four-bit-model-quantization', label: t('start.hardware.quantization') }
      ]
    },
    {
      title: t('LlmGuidePage.1017'),
      view: 'software-products', section: 'serving-software', preset: 'software-choice',
      description: t('LlmGuidePage.1018'), label: t('LlmGuidePage.1019'),
      articles: [
        { slug: 'ollama-vllm-sglang-or-llama-cpp', label: t('start.software.engine') },
        { slug: 'single-user-to-enterprise-llm-serving', label: t('start.software.serving') }
      ]
    }
  ];
  $: activeView = routeParams.get('view') ?? '';
  $: activePreset = routeParams.get('preset') ?? '';
  $: activeSoftwareView = activeView === 'deployment-compatibility' ? activeView : 'software-products';
  $: qualityView = routeParams.get('benchmark-view') !== 'performance' && !routeParams.get('research-model');
  async function setBenchmarkView(view: string) {
    const url = new URL($page.url); url.searchParams.set('benchmark-view',view); url.searchParams.delete('research-model');
    await goto(url,{noScroll:true,keepFocus:true});
  }
  let copyStatus = '';
  async function copySelection() {
    try { await navigator.clipboard.writeText(location.href); copyStatus = t('selection.copied'); }
    catch { copyStatus = t('selection.failed'); }
  }


</script>



<main class="llm-guide" dir={direction} use:readingPosition={{ ids: targetIds, onChange: followHeading }}>
  <nav class="breadcrumbs wrap" aria-label={t('LlmGuidePage.1021')}>
    <a href={`${base}/guides/`}>{t('LlmGuidePage.1022')}</a><span aria-hidden="true">/</span><span aria-current="page">{t('LlmGuidePage.1023')}</span>
  </nav>

  <div class="guide-shell">
    <aside class="guide-navigation" data-reading-navigation>
      <details class="desktop-toc" open>
        <summary>{t('LlmGuidePage.1036')}</summary>
        <nav aria-label={t('LlmGuidePage.1037')} use:keepCurrentVisible={activeTarget}>{@render guideContents()}</nav>
      </details>
      <a class="back-link" href={`${base}/guides/`}>{t('LlmGuidePage.1038')}</a>
    </aside>
  <div class="guide-content">
      <div class="guide-navigation mobile-navigation">
      <details class="mobile-toc">
        <summary>{t('LlmGuidePage.1036')}</summary>
        <nav aria-label={t('LlmGuidePage.1039')} use:keepCurrentVisible={activeTarget}>{@render guideContents()}</nav>
      </details>
      </div>
  <div class="llm-opening" id="technical-guide">
    <GuideOpening headingTag="h1" title={llmGuideCollection.title} lead={llmGuideCollection.subtitle} eyebrow="LLM & SLM" image={llmGuideCollection.image} imageAlt={llmGuideCollection.imageAlt}>
        <p>{t('LlmGuidePage.1024')}
</p><p>
{t('LlmGuidePage.1025')}
</p>
    </GuideOpening>
    <section class="start" id="start" aria-labelledby="start-title">
          <header>
            <small>{t('LlmGuidePage.1026')}</small>
            <h2 id="start-title">{t('LlmGuidePage.1027')}</h2>
            <p>{t('LlmGuidePage.1028')}</p>
          </header>
          <LlmOrganizationWizard repository={llmRepository} onOpenModel={openModel} />
          <nav class="desktop-paths" aria-label={t('LlmGuidePage.1029')}>
            {@render readingPaths()}
          </nav>
    </section>
          <div class="collection-stats" aria-label={t('LlmGuidePage.1030')}>
            <a href={sectionHref('model-catalog', 'model-catalog')}>{numbers.format(llmRepository.models.length)} {t('LlmGuidePage.1031')}</a>
            <a href={sectionHref('software-products', 'serving-software')}>{numbers.format(llmRepository.softwareProducts.length)} {t('LlmGuidePage.1032')}</a>
            <span>{numbers.format(tableCount)} {t('LlmGuidePage.1033')}</span>
            <a href="#llm-notes">{numbers.format(readingArticles.size)} {t('LlmGuidePage.1034')}</a>
            <span class="data-updated">
              <span>{t('LlmGuidePage.1035')}</span>
              <time datetime={llmDatasetUpdatedOn}>{formatDate(llmDatasetUpdatedOn, locale)}</time>
            </span>
          </div>
  </div>

  <details class="guide-method">
    <summary>{t('method.title')}</summary>
    <p>{t('method.sources')}</p><p>{t('method.selection')}</p>
    <p>{t('method.hardware')} <a href={`#${llmTopicSlug('ollama-vllm-sglang-or-llama-cpp', locale)}`} onclick={() => revealChapter(llmTopicSlug('ollama-vllm-sglang-or-llama-cpp', locale)!)}>{t('method.software')}</a></p>
    <p>{t('method.memory')}</p>
    <p>{t('method.reviewed')} <time datetime={llmDatasetUpdatedOn}>{formatDate(llmDatasetUpdatedOn, locale)}</time> · <a href={`${base}/resume/`}>{t('method.correction')}</a></p>
  </details>

  <div class="wrap guide-layout">


    <div class="guide-main">


      {#each llmGuideSections as section}
        {#if section.views.length === 1}
          {@const config = enrichExistingConfig(section.views[0])}
          {#if config.id === 'benchmarks'}
            <section id="benchmarks" class="benchmark-section" aria-labelledby="benchmark-section-title">
              <h2 id="benchmark-section-title">{section.title}</h2>
              <nav class="subview-tabs" aria-label={section.title}>
                <button type="button" class:active={qualityView} aria-pressed={qualityView} onclick={() => setBenchmarkView('quality')}>{t('benchmarks.quality')}</button>
                <button type="button" class:active={!qualityView} aria-pressed={!qualityView} onclick={() => setBenchmarkView('performance')}>{t('benchmarks.performance')}</button>
              </nav>
              <div class="benchmark-actions"><button class="copy-selection" type="button" onclick={copySelection}>{t('selection.copy')}</button><span role="status">{copyStatus}</span></div>
              {#if qualityView}<LlmReferenceComparisons {targetLanguage} repository={llmRepository} onOpenModel={openModel} /><LlmQualityComparison {targetLanguage} repository={llmRepository} onOpenModel={openModel} />{:else}<LlmResearchView repository={llmRepository} id="benchmarks" anchorId="benchmark-performance" onOpenModel={openModel} />{/if}
            </section>
          {:else if config.id === 'model-suitability'}
            <div class="use-mode" role="group" aria-label={t('LlmGuidePage.1040')}>
              <button type="button" class:active={!matrixMode} aria-pressed={!matrixMode} onclick={() => setMatrixMode(false)}>{t('LlmGuidePage.1041')}</button>
              <button type="button" class:active={matrixMode} aria-pressed={matrixMode} onclick={() => setMatrixMode(true)}>{t('LlmGuidePage.1042')}</button>
              <span>{matrixMode ? t('LlmGuidePage.1043') : t('LlmGuidePage.1044')}</span>
            </div>
            <LlmDataView config={enrichExistingConfig(modelUseViewConfig(matrixMode))} evidence={llmRepository.evidence} rows={matrixMode ? matrixRows : llmViewRows[config.id]} presetId={activeView === config.id ? activePreset : ''} onOpenModel={openModel}>{#snippet controlsContent()}<LlmScoreSelector results={llmRepository.publishedEvaluations} /><LlmTaskStartingPoints {targetLanguage} repository={llmRepository} onOpenModel={openModel} />{/snippet}</LlmDataView>
          {:else if ['hardware-feasibility', 'benchmarks'].includes(config.id)}
            <LlmResearchView repository={llmRepository} id={config.id} presetId={activeView === config.id ? activePreset : ''} onOpenModel={openModel} />
          {:else}
            <LlmDataView onOpenModel={openModel} {config} evidence={llmRepository.evidence} rows={llmViewRows[config.id]} presetId={activeView === config.id ? activePreset : ''}>{#snippet controlsContent()}<LlmScoreSelector results={llmRepository.publishedEvaluations} />{/snippet}</LlmDataView>
          {/if}
          {@render viewReading(config.id, config.title)}
        {:else}
          <section class="serving-section" id={section.id} aria-labelledby="serving-section-title">
            <header><small>{t('LlmGuidePage.1045')}</small><h2 id="serving-section-title">{section.title}</h2></header>
            <nav class="subview-tabs" aria-label={t('LlmGuidePage.1046')}>
              {#each section.views as view}<a aria-current={activeSoftwareView === view.id ? 'page' : undefined} class:active={activeSoftwareView === view.id} href={sectionHref(view.id, section.id)}>{view.subviewNumber ? `${numbers.format(view.subviewNumber)}. ` : ''}{view.title}</a>{/each}
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
  </div>
  </div>
</main>
<LlmModelProfile repository={llmRepository} {modelId} panel={modelPanel} onClose={closeModel} onPanel={changePanel} />

{#snippet readingPaths()}
  <ol class="start-paths">
    {#each startPaths as path, index}
      <li>
        <span class="path-number" aria-hidden="true">{numbers.format(index + 1).padStart(2, t('LlmGuidePage.1047'))}</span>
        <div>
          <h3>{path.title}</h3>
          <div class="path-summary">
            <p>{path.description}</p>
            <div class="path-actions">
            <a class="path-button" href={sectionHref(path.view, path.section ?? path.view, path.preset)}>
              {path.label} <span aria-hidden="true">←</span>
            </a>
              {#each path.articles as item}
                {@const slug = readingSlug(item.slug)}
                {@const article = readingArticles.get(slug ?? '')}
                {#if slug && article}
                  <a class="article-path" href={`#${slug}`} onclick={() => revealChapter(slug)} aria-label={t('LlmGuidePage.1048', article.title)} title={article.title}>
                    {item.label} <span aria-hidden="true">←</span>
                  </a>
                {/if}
              {/each}
            </div>
          </div>
        </div>
      </li>
    {/each}
  </ol>
{/snippet}

{#snippet viewReading(viewId: string, title: string)}
  <nav class="view-reading" aria-label={t('LlmGuidePage.1049', title)} data-reading-for={viewId}>
    <h3 class="reading-heading">{t('LlmGuidePage.1050')}</h3>
    <div class="reading-cards">
      {#each [...(viewReadingArticles[viewId] ?? []).map(contentId => ({ contentId, anchorId: undefined })), ...(viewRelatedContent[viewId] ?? [])] as item}
        {@const slug = readingSlug(item.contentId) ?? ''}
        {@const article = publishedArticles.get(slug)}
        {@const embedded = readingArticles.has(slug)}
        {#if article}
          <a class="reading-card" href={embedded ? `#${slug}` : `${base}/articles/${slug}/${locale === 'fa' && item.anchorId ? `#${item.anchorId}` : ''}`} onclick={() => { if (embedded) revealChapter(slug); }}>
            {#if article.cover}
              <img {...imageAttributes(article.cover, '112px')} alt="" loading="lazy" width="640" height="360" />
            {/if}
            <div class="reading-card-body">
              <h4>{article.title}</h4>
              <p>{article.excerpt}</p>
              <div class="reading-card-footer"><span>{embedded ? t('LlmGuidePage.1051') : t('LlmGuidePage.1052')} <span aria-hidden="true">←</span></span><small>{article.readTime}</small></div>
            </div>
          </a>
        {/if}
      {/each}
    </div>
    <a class="all-notes" href="#llm-notes">{t('LlmGuidePage.1053')}</a>
  </nav>
{/snippet}

{#snippet guideContents()}
  <a href="#start" aria-current={activeTarget === 'start' ? 'location' : undefined}>{t('LlmGuidePage.1027')}</a>
  <a href="#llm-starting-plan" aria-current={activeTarget === 'llm-starting-plan' ? 'location' : undefined}>{locale === 'fa' ? 'راهنمای تعامل' : locale === 'es' ? 'Guía interactiva' : 'Interactive guide'}</a>
  <details class="toc-group" open>
    <summary>{t('LlmGuidePage.1054')}</summary>
    <ol>{#each llmGuideSections as section}
      <li><a class:active={activeTarget === section.id} aria-current={activeTarget === section.id ? 'location' : undefined} href={sectionHref(section.views[0].id, section.id)}>{numbers.format(section.number)}. {section.title}</a>
      {#if section.views.length > 1}<ul>{#each section.views as view}<li><a class:active={activeTarget === section.id && activeSoftwareView === view.id} href={sectionHref(view.id, section.id)}>{view.shortTitle}</a></li>{/each}</ul>{/if}</li>
    {/each}</ol>
  </details>
  <details class="toc-group" open>
    <summary>{t('LlmGuidePage.1055')} <span>{numbers.format(chapterArticles.length)}</span></summary>
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
  .benchmark-actions{display:flex;justify-content:flex-end;align-items:center;gap:10px;margin-top:8px;font-size:12px}.copy-selection{font:inherit;border:0;background:transparent;color:var(--link-ink);padding:6px;cursor:pointer;text-decoration:underline;text-underline-offset:4px}.copy-selection:focus-visible{outline:2px solid var(--teal);outline-offset:2px}

  .guide-method{max-width:1280px;width:calc(100% - 32px);margin:20px auto 32px;padding-block:12px;border-block:1px solid var(--line);font-size:14px;line-height:1.9}.guide-method summary{cursor:pointer;color:var(--link-ink);font-weight:600}.guide-method p{max-width:90ch}.guide-method a{color:var(--link-ink);text-decoration:underline;text-underline-offset:3px}

  .benchmark-section{scroll-margin-top:110px;margin-block:40px}.subview-tabs button{font:inherit;padding:10px 16px;border:1px solid var(--line);border-radius:6px;background:var(--paper);color:var(--link-ink);cursor:pointer}.subview-tabs button.active{background:var(--soft);border-color:var(--teal)}
  .llm-guide{min-width:0}.breadcrumbs{display:flex;position:static;inset:auto;flex-direction:row;gap:8px;align-items:center;margin-inline:auto;padding:26px 0 0;border:0;background:transparent;color:var(--muted);font-size:11px}.breadcrumbs a{color:var(--link-ink)}.guide-shell{display:grid;grid-template-columns:188px minmax(0,1fr);gap:24px;margin-inline:12px 188px;align-items:start}.guide-content{min-width:0}.guide-layout{display:block;width:100%;max-width:none;margin:0;padding-block:18px 80px}.guide-navigation{position:sticky;top:100px;min-width:0}.guide-navigation details{border-bottom:1px solid var(--line)}.guide-navigation summary{padding:11px 0;cursor:pointer;font-size:12px;font-weight:800}.guide-navigation nav{display:block;position:static;inset:auto;margin:0;padding:0;border:0;background:transparent;max-height:calc(100dvh - 210px);overflow:auto}.guide-navigation ol{list-style:none;margin:0;padding:0}.guide-navigation a{display:block;padding:8px 10px;border-inline-start:2px solid var(--line);color:var(--muted);font-size:10px;line-height:1.7;white-space:normal}.guide-navigation a:hover,.guide-navigation a.active{border-color:var(--teal);color:var(--link-ink)}.guide-navigation .back-link{margin-top:13px;border:0;color:var(--link-ink)}.mobile-toc{display:none}.guide-main{min-width:0}
  .start{width:min(1280px,calc(100% - 48px));margin:32px auto 0;scroll-margin-top:110px}
  .start header small,.serving-section>header small{color:var(--link-ink);font-size:12px}
  .start h2{margin:8px 0 10px;font-size:26px;line-height:1.6}
  .start header p{margin:0;color:var(--muted);font-size:15px;line-height:1.9}
  .start nav{display:block;position:static;inset:auto;width:100%;margin:0;padding:0;border:0;background:transparent}
  .start-paths{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px;list-style:none;margin:20px 0 0;padding:0}
  .start-paths li{display:grid;grid-template-columns:24px minmax(0,1fr);gap:12px;padding:20px;border:1px solid var(--line);border-radius:10px;background:color-mix(in srgb,var(--soft) 24%,transparent)}
  .path-number{color:var(--link-ink);font-size:13px;padding-top:3px}
  .start-paths h3{margin:0;font-size:17px;line-height:1.8}
  .path-summary p{margin:8px 0 16px;color:var(--muted);font-size:15px;line-height:1.9}
  .path-actions{display:flex;flex-wrap:wrap;align-items:center;gap:12px 20px}
  .path-button{display:inline-flex;align-items:center;gap:8px;padding:7px 14px;min-height:38px;box-sizing:border-box;border:1px solid var(--teal);border-radius:6px;background:color-mix(in srgb,var(--soft) 65%,var(--paper));color:var(--link-ink);font-size:14px;font-weight:700;line-height:1.7}
  .path-button:hover{background:var(--teal);color:var(--paper)}
  .article-path{color:var(--link-ink);font-size:14px;text-underline-offset:4px}
  .article-path:hover{text-decoration:underline}
  .start a:focus-visible,.collection-stats a:focus-visible{outline:2px solid var(--teal);outline-offset:4px}
  .collection-stats{display:flex;flex-wrap:wrap;align-items:baseline;gap:8px 24px;width:min(1280px,calc(100% - 48px));margin:20px auto 28px;padding-block:14px;border-block:1px solid var(--line);color:var(--muted);font-size:14px;line-height:1.9}
  .collection-stats a{color:var(--ink)}
  .collection-stats a:hover{text-decoration:underline;text-underline-offset:4px}
  .data-updated{display:flex;flex-wrap:wrap;gap:4px 8px;margin-inline-start:auto}
  .data-updated time{color:var(--ink);white-space:nowrap}
  @media(max-width:959px){.start,.collection-stats{width:calc(100% - 32px)}}
  @media(max-width:600px){.start-paths{grid-template-columns:minmax(0,1fr)}.start-paths li{padding:16px}.data-updated{margin-inline-start:0}.collection-stats{gap:8px 18px}}
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
  .use-mode{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-top:28px}.use-mode button{font:inherit;font-size:13px;padding:10px 16px;border:1px solid var(--line);border-radius:8px;background:var(--paper);color:var(--ink);cursor:pointer}.use-mode button.active{color:var(--link-ink);background:var(--soft);border-color:var(--teal)}.use-mode span{font-size:12px;color:var(--muted);margin-inline-start:10px}
  @media(max-width:850px){.view-reading{padding:16px}}

  
  @media(max-width:1199px){.guide-shell{display:block;margin-inline:0}.guide-layout{display:block;width:calc(100% - 32px);margin-inline:auto}.guide-navigation{position:static;margin-bottom:20px}.desktop-toc{display:none}.mobile-toc{display:block}.guide-navigation nav{max-height:46vh}.guide-navigation .back-link{padding-inline:0}.view-reading{margin-top:-22px}}
  @media(max-width:700px){.breadcrumbs{padding-top:18px}.subview-tabs{display:grid}.subview-tabs a+a{border-inline-start:0;border-top:1px solid var(--line)}}
  .mobile-navigation{display:none}
  @media(max-width:1199px){aside.guide-navigation{display:none}.mobile-navigation{display:block}}
  .guide-navigation nav{scrollbar-width:thin;scrollbar-color:var(--line) transparent}.guide-navigation nav::-webkit-scrollbar{width:6px}.guide-navigation nav::-webkit-scrollbar-track{background:transparent}.guide-navigation nav::-webkit-scrollbar-thumb{background:var(--line);border-radius:8px}.guide-navigation nav::-webkit-scrollbar-button{display:none}
</style>
