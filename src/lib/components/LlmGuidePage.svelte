<script lang="ts">
  import { page } from '$app/stores';
  import PageHero from './PageHero.svelte';
  import LlmDataView from './LlmDataView.svelte';
  import {
    existingContentLinks,
    llmGuideCollection,
    llmRepository,
    plannedArticles,
    viewRelatedContent
  } from '$lib/llm/guide';
  import { buildLlmViewRows } from '$lib/llm/adapters';
  import { llmGuideSections, llmViewConfigs } from '$lib/llm/views';

  const numbers = new Intl.NumberFormat('fa-IR');
  const llmViewRows = buildLlmViewRows(llmRepository);
  const startPaths = [
    {
      title: 'برای کارم چه مدلی کافی است؟',
      view: 'model-suitability', preset: 'task-first',
      description: 'مقایسه از کاربرد و تعداد پارامتر آغاز می‌شود؛ مدل‌های کوچک و بزرگ در یک مسیر می‌آیند.'
    },
    {
      title: 'با سخت‌افزار موجود چه می‌توانم اجرا کنم؟',
      view: 'hardware-feasibility', preset: 'existing-hardware',
      description: 'Artifact و پیکربندی اجرا را روی CPU، GPU یا چندکارت بررسی کنید.'
    },
    {
      title: 'چگونه با حافظهٔ کمتر اجرا کنم؟',
      view: 'deployment-compatibility', section: 'serving-software', preset: 'memory-constrained',
      description: 'کوانت، offload و بارگذاری لایه‌به‌لایه را با هزینه‌های RAM و دیسک ببینید.'
    },
    {
      title: 'کدام پیکربندی هزینهٔ مناسب‌تری دارد؟',
      view: 'economics', preset: 'cost-scenario',
      description: 'خرید، اجاره و API را در سناریوی هم‌مبنا کنار هم قرار دهید.'
    },
    {
      title: 'با چه نرم‌افزاری مدل را اجرا و سرویس‌دهی کنم؟',
      view: 'software-products', section: 'serving-software', preset: 'software-choice',
      description: 'از نوع نیاز، محیط و نقش شروع کنید؛ انتخاب مدل از پیش الزامی نیست.'
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
      <section class="overview" aria-labelledby="overview-title">
        <div>
          <span class="draft-badge">پیش‌نویس زیرساخت</span>
          <h2 id="overview-title">انتخاب از سناریو آغاز می‌شود</h2>
          <p>{llmGuideCollection.intro}</p>
        </div>
        <dl>
          <div><dt>دادهٔ مقایسه‌ای</dt><dd>هنوز وارد نشده</dd></div>
          <div><dt>مقاله‌های آینده</dt><dd>{numbers.format(plannedArticles.length)} عنوان برنامه‌ریزی‌شده</dd></div>
          <div><dt>مبنای انتشار</dt><dd>منبع، نسخه و محدودیت شاهد</dd></div>
        </dl>
      </section>

      <section class="start" id="start" aria-labelledby="start-title">
        <header><small>مسیرهای شروع</small><h2 id="start-title">از کجا شروع کنیم؟</h2></header>
        <div class="start-grid">
          {#each startPaths as path, index}
            <a href={`?show-drafts=true&view=${path.view}&preset=${path.preset}#${path.section ?? path.view}`}>
              <span>{numbers.format(index + 1).padStart(2, '۰')}</span>
              <h3>{path.title}</h3>
              <p>{path.description}</p>
              <b>رفتن به نمای مرتبط ←</b>
            </a>
          {/each}
        </div>
      </section>

      <section class="data-intro" aria-label="راهنمای وضعیت داده‌ها">
        <div><b>هنوز داده نداریم</b><span>یعنی مجموعهٔ تأییدشده خالی است.</span></div>
        <div><b>نتیجه‌ای پیدا نشد</b><span>یعنی داده وجود دارد اما فیلترها آن را کنار گذاشته‌اند.</span></div>
        <div><b>نامعلوم</b><span>هرگز به صفر یا «قابل اجرا نیست» تبدیل نمی‌شود.</span></div>
      </section>

      {#each llmGuideSections as section}
        {#if section.views.length === 1}
          {@const config = section.views[0]}
          <LlmDataView {config} rows={llmViewRows[config.id]} presetId={activeView === config.id ? activePreset : ''} />
          <nav class="view-reading" aria-label={`مطالب پایه برای ${config.title}`}>
            <b>برای فهم مفاهیم این نما:</b>
            {#each viewRelatedContent[config.id] ?? [] as relation}
              {@const link = contentLink(relation.contentId, relation.anchorId)}
              {#if link}<a href={link.href}>{relation.anchorId ? link.anchors?.find((anchor) => anchor.id === relation.anchorId)?.label ?? link.title : link.title}</a>{/if}
            {/each}
          </nav>
        {:else}
          <section class="serving-section" id={section.id} aria-labelledby="serving-section-title">
            <header><small>بخش چهارم · دو نمای مستقل</small><h2 id="serving-section-title">{section.title}</h2></header>
            <nav class="subview-tabs" aria-label="نماهای نرم‌افزار اجرا و سرویس‌دهی">
              {#each section.views as view}<a aria-current={activeSoftwareView === view.id ? 'page' : undefined} class:active={activeSoftwareView === view.id} href={`?show-drafts=true&view=${view.id}#${section.id}`}>{view.subviewNumber ? `${numbers.format(view.subviewNumber)}. ` : ''}{view.title}</a>{/each}
            </nav>
            {#each section.views.filter((view) => view.id === activeSoftwareView) as config (config.id)}
              <LlmDataView {config} rows={llmViewRows[config.id]} presetId={activeView === config.id ? activePreset : ''} />
              <nav class="view-reading" aria-label={`مطالب پایه برای ${config.title}`}>
                <b>برای فهم مفاهیم این نما:</b>
                {#each viewRelatedContent[config.id] ?? [] as relation}
                  {@const link = contentLink(relation.contentId, relation.anchorId)}
                  {#if link}<a href={link.href}>{relation.anchorId ? link.anchors?.find((anchor) => anchor.id === relation.anchorId)?.label ?? link.title : link.title}</a>{/if}
                {/each}
              </nav>
            {/each}
          </section>
        {/if}
      {/each}

      <section class="planned" id="planned-articles" aria-labelledby="planned-title">
        <header><small>نقشهٔ نگارش</small><h2 id="planned-title">مقاله‌های برنامه‌ریزی‌شده</h2></header>
        <ol>
          {#each plannedArticles as article}
            <li><span>{numbers.format(article.order).padStart(2, '۰')}</span><h3>{article.title}</h3><small>برنامه‌ریزی‌شده</small></li>
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

<style>
  .llm-guide{min-width:0}.breadcrumbs{display:flex;position:static;inset:auto;flex-direction:row;gap:8px;align-items:center;margin-inline:auto;padding:26px 0 0;border:0;background:transparent;color:var(--muted);font-size:11px}.breadcrumbs a{color:var(--link-ink)}.guide-layout{display:grid;grid-template-columns:188px minmax(0,1fr);gap:24px;width:calc(100% - 200px);max-width:none;margin-inline-start:12px;margin-inline-end:188px;padding-block:18px 80px;align-items:start}.guide-navigation{position:sticky;top:100px;min-width:0}.guide-navigation details{border-bottom:1px solid var(--line)}.guide-navigation summary{padding:11px 0;cursor:pointer;font-size:12px;font-weight:800}.guide-navigation nav{display:block;position:static;inset:auto;margin:0;padding:0;border:0;background:transparent;max-height:calc(100dvh - 210px);overflow:auto}.guide-navigation ol{list-style:none;margin:0;padding:0}.guide-navigation a{display:block;padding:8px 10px;border-inline-start:2px solid var(--line);color:var(--muted);font-size:10px;line-height:1.7;white-space:normal}.guide-navigation a:hover,.guide-navigation a.active{border-color:var(--teal);color:var(--link-ink)}.guide-navigation .back-link{margin-top:13px;border:0;color:var(--link-ink)}.mobile-toc{display:none}.guide-main{min-width:0}.llm-guide>:global(.page-hero){width:calc(100% - 412px);margin-inline-start:224px;margin-inline-end:188px;padding-block:35px 25px;text-align:start}.llm-guide>:global(.page-hero h1){max-width:920px;font-size:clamp(34px,4vw,56px);line-height:1.35}.llm-guide>:global(.page-hero>p:last-child){max-width:850px;font-size:14px}
  .overview{display:grid;grid-template-columns:minmax(0,1.3fr) minmax(260px,.7fr);gap:32px;align-items:start;padding:28px;border:1px solid var(--line);background:var(--soft)}.draft-badge{display:inline-block;padding:5px 10px;border:1px solid color-mix(in srgb,#b77718 55%,var(--line));border-radius:99px;color:#a56713;font-size:10px;font-weight:800}.overview h2,.start h2,.planned h2,.related h2{margin:12px 0 10px;font-size:clamp(24px,2.8vw,34px);line-height:1.6}.overview p{margin:0;color:var(--muted);font-size:13px;line-height:2.1}.overview dl{margin:0;border:1px solid var(--line);background:var(--paper)}.overview dl>div{display:grid;grid-template-columns:1fr 1.2fr;gap:10px;padding:11px 13px;border-bottom:1px solid var(--line)}.overview dl>div:last-child{border-bottom:0}.overview dt{color:var(--muted);font-size:10px}.overview dd{margin:0;font-size:10px;line-height:1.7}
  .start{scroll-margin-top:100px;padding-block:42px}.start header small,.planned header small,.related header small,.serving-section>header small{color:var(--teal);font-size:10px}.start-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));border:1px solid var(--line)}.start-grid a{min-height:155px;padding:20px;display:grid;grid-template-columns:28px 1fr;gap:4px 10px;color:var(--ink)}.start-grid a:nth-child(even){border-inline-start:1px solid var(--line)}.start-grid a:nth-child(n+3){border-top:1px solid var(--line)}.start-grid span{grid-row:1/4;color:var(--teal);font:700 11px/1.8 Arial,sans-serif}.start-grid h3{margin:0;font-size:15px;line-height:1.8}.start-grid p{margin:6px 0;color:var(--muted);font-size:11px;line-height:1.9}.start-grid b{align-self:end;color:var(--link-ink);font-size:10px}.start-grid a:hover{background:color-mix(in srgb,var(--teal) 5%,var(--paper))}.data-intro{display:grid;grid-template-columns:repeat(3,1fr);margin-bottom:12px;border:1px solid var(--line)}.data-intro div{padding:12px}.data-intro div+div{border-inline-start:1px solid var(--line)}.data-intro b,.data-intro span{display:block}.data-intro b{font-size:11px}.data-intro span{margin-top:4px;color:var(--muted);font-size:9px;line-height:1.7}.guide-navigation ul{list-style:none;margin:0;padding-inline-start:9px}.guide-navigation ul a{font-size:9px}.serving-section{scroll-margin-top:90px;padding-top:42px;border-top:1px solid var(--line)}.serving-section>header h2{margin:5px 0 14px;font-size:clamp(24px,2.8vw,36px)}.subview-tabs{display:flex;position:static;inset:auto;gap:0;margin:0;border:1px solid var(--line);background:var(--paper)}.subview-tabs a{flex:1;padding:12px;color:var(--muted);font-size:11px;text-align:center}.subview-tabs a+a{border-inline-start:1px solid var(--line)}.subview-tabs a.active{background:color-mix(in srgb,var(--teal) 9%,var(--paper));color:var(--link-ink);font-weight:800}.serving-section :global(.llm-view){border-top:0}.view-reading{display:flex;position:static;inset:auto;flex-wrap:wrap;align-items:center;gap:8px;margin:-27px 0 36px;padding:10px 12px;border:1px solid var(--line);border-top:0;background:var(--soft)}.view-reading b{font-size:10px}.view-reading a{padding:4px 7px;border-radius:4px;background:var(--paper);color:var(--link-ink);font-size:9px}
  .planned,.related{scroll-margin-top:100px;padding-block:46px;border-top:1px solid var(--line)}.planned ol{list-style:none;margin:20px 0 0;padding:0;border-top:1px solid var(--line)}.planned li{display:grid;grid-template-columns:42px minmax(0,1fr) auto;gap:12px;align-items:center;padding:12px 4px;border-bottom:1px solid var(--line)}.planned li>span{color:var(--teal);font:700 11px/1 Arial,sans-serif}.planned h3{margin:0;font-size:13px;line-height:1.8}.planned li small{padding:4px 7px;border:1px solid var(--line);border-radius:99px;color:var(--muted);font-size:8px}.related>div{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));border-top:1px solid var(--line)}.related a{display:flex;justify-content:space-between;gap:15px;padding:14px 10px;border-bottom:1px solid var(--line);color:var(--ink);font-size:11px;line-height:1.8}.related a:nth-child(even){border-inline-start:1px solid var(--line)}.related i{color:var(--teal);font-style:normal}
  @media(max-width:1199px){.llm-guide>:global(.page-hero){width:calc(100% - 32px);margin-inline:auto}.guide-layout{display:block;width:calc(100% - 32px);margin-inline:auto}.guide-navigation{position:static;margin-bottom:20px}.desktop-toc{display:none}.mobile-toc{display:block}.guide-navigation nav{max-height:46vh}.guide-navigation .back-link{padding-inline:0}.overview{grid-template-columns:1fr}.view-reading{margin-top:-22px}}
  @media(max-width:700px){.breadcrumbs{padding-top:18px}.overview{padding:20px}.start-grid,.data-intro,.related>div{grid-template-columns:1fr}.start-grid a:nth-child(even){border-inline-start:0}.start-grid a:nth-child(n+2){border-top:1px solid var(--line)}.data-intro div+div{border-inline-start:0;border-top:1px solid var(--line)}.subview-tabs{display:grid}.subview-tabs a+a{border-inline-start:0;border-top:1px solid var(--line)}.planned li{grid-template-columns:32px minmax(0,1fr)}.planned li small{grid-column:2;justify-self:start}.related a:nth-child(even){border-inline-start:0}}
</style>
