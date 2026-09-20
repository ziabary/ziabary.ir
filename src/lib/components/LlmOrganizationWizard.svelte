<script lang="ts">
  import { browser } from '$app/environment';
  import { page } from '$app/stores';
  import { replaceState } from '$app/navigation';
  import { imageAttributes } from '$lib/images';
  import { onMount, onDestroy, tick } from 'svelte';
  import { getLlmI18n } from '$lib/llm/i18n/context';
  import contactCopy from '../../../data/llm/wizard-copy.json';
  import { allArticleMetadata } from '$lib/content';
  import { llmTopicSlug, llmBase } from '$lib/llm/editions';
  import { hasLlmPreview } from '$lib/draft-preview.mjs';
  import { createLlmResearch } from '$lib/llm/research';
  import { llmSelectionHref } from '$lib/llm/selection';
  import type { LlmGuideRepository, ModelVersion } from '$lib/llm/schema';
  import { QUICK_QUESTIONS, wizardAnswerErrors, wizardOptions, numericRules, wizardComplete, buildWizardResult, wizardMemory, wizardQuestions, visibleQuestion, changeWizard, cleanWizard, positive, localized, articleTopics, wizardTableHref, WIZARD_VERSION, type WizardAnswers, type AnswerStatus, type MemoryEstimate } from '$lib/llm/wizard';
  export let repository: LlmGuideRepository;
  export let onOpenModel: (id:string,panel?:string)=>void;
  const i18n=getLlmI18n(),{locale,numberFormat}=i18n,c=contactCopy[locale];
  const L=(fa:string,en:string,es:string)=>localized([fa,en,es],locale);
  const n=new Intl.NumberFormat(numberFormat,{maximumFractionDigits:2});
  const {research,calculateMemory}=createLlmResearch(i18n);
  const stages=L('کار شما|ورودی و خروجی|حجم استفاده|محل اجرا|بودجه و نگهداری|معیار موفقیت','Your task|Inputs and outputs|Usage|Deployment|Budget and maintenance|Success criteria','Su tarea|Entradas y salidas|Uso|Despliegue|Presupuesto y mantenimiento|Criterios de éxito').split('|');
  let detailed=false;
  let answers:WizardAnswers={},statuses:Record<string,AnswerStatus>={},step=0,ready=false,finished=false,opened=false;
  let dialog:HTMLDialogElement,heading:HTMLHeadingElement,resultHeading:HTMLHeadingElement,reopenButton:HTMLButtonElement;
  let briefArea:HTMLTextAreaElement,emailInput:HTMLInputElement;
  let email='',contactStatus='',copyStatus='',previousOverflow='';
  let helpOpen:Record<string,boolean>={};
  let numericDrafts:Record<string,string>={};
  $: inputErrors=wizardAnswerErrors({...answers,...numericDrafts},locale);
  const storageKey='llm-wizard-state-v2';
  const legacySessionKey='llm-wizard-session-v2';
  let storageUnavailable=false;
  let startElement:HTMLElement;
  $: displayedStages=detailed?stages:[stages[0],stages[1],stages[3]];
  const quickStep=(id:string)=>['task','writingTask','sourceLanguage','outputLanguage'].includes(id)?0:['sources','inputSize','mode'].includes(id)?1:2;
  $: currentQuestions=wizardQuestions.filter(q=>(detailed?q.step===step:QUICK_QUESTIONS.includes(q.id)&&quickStep(q.id)===step)&&visibleQuestion(q,answers,locale)&&(answers.task||q.id==='task'));
  $: canContinue=!!answers.task&&Object.keys(inputErrors).length===0;
  $: result=buildWizardResult(repository,answers,locale,modelMemory,statuses);
  $: articleLinks=result.articles.map(articleLink).filter((x):x is NonNullable<typeof x>=>!!x);
  $: tableHref=wizardTableHref($page.url,result.candidates.map(c=>c.model.id));
  $: retrievalHref=wizardTableHref($page.url,result.specialists.map(c=>c.model.id));
  $: answerRows=wizardQuestions.filter(q=>visibleQuestion(q,answers,locale)&&answers[q.id]).map(q=>({id:q.id,title:localized(q.title,locale),value:answerLabel(q),unit:q.unit==='currency'?unit('currency'):q.unit,status:answers[q.id]==='unknown'?'unknown':statuses[q.id]??(q.kind==='number'?'estimate':'declared'),scope:answers.phase==='production'?'production':answers.phase==='pilot'?'pilot':'unknown'}));
  const unknownLabel=L('هنوز مشخص نیست','Not known yet','Aún no se sabe');
  function value(id:string){const q=wizardQuestions.find(q=>q.id===id);return q?answerLabel(q):unknownLabel;}
  $: summaryRows=[
    [L('کاربرد','Task','Tarea'),value('task')],
    [L('محل اجرا','Deployment','Despliegue'),value('deployment')],
    [answers.mode==='batch'?L('حجم هر نوبت','Batch size','Tamaño del lote'):L('کاربران','Users','Usuarios'),value(answers.mode==='batch'?'batchCount':'users')],
    [answers.mode==='batch'?L('مهلت هر نوبت','Batch deadline','Plazo del lote'):L('درخواست هم‌زمان','Concurrent requests','Solicitudes simultáneas'),value(answers.mode==='batch'?'deadline':'concurrency')],
    [L('ورودی هر درخواست','Input per request','Entrada por solicitud'),positive(answers.maxTokens)?value('maxTokens'):positive(answers.inputTokens)?value('inputTokens'):value('inputSize')],
    [answers.deployment==='api'?L('محل مجاز پردازش اطلاعات','Data boundary','Límite de datos'):L('تجهیزات','Equipment','Equipo'),answers.deployment==='api'?value('policy'):answers.hardware==='gpu'?[answers.gpuName&&answers.gpuName!=='unknown'?answers.gpuName:'GPU',positive(answers.vram)?n.format(Number(answers.vram))+' GiB VRAM':'',positive(answers.ram)?n.format(Number(answers.ram))+' GiB RAM':''].filter(Boolean).join(' · '):value('hardware')],
    [L('بودجهٔ اولیه','Initial budget','Presupuesto inicial'),value('capex')],
    [answers.mode==='batch'?L('شکل خروجی','Output format','Formato de salida'):L('زمان پاسخ کامل','Full answer target','Objetivo de respuesta completa'),value(answers.mode==='batch'?'output':'fullResponse')]
  ];
  $: brief=[L('طرح شروع بر اساس پاسخ‌های شما','Starting plan based on your answers','Plan inicial según sus respuestas'),...answerRows.map(x=>`${x.title}: ${x.value} [${statusLabel(x.status)}]`),...result.candidates.map(x=>`${x.model.exactName} (${x.model.id}; ${x.model.version}) — ${x.reason} ${x.runtimeReason??''}\n${x.runtimeUrl??''}\n${x.source}`),...result.specialists.map(x=>`${x.model.exactName} — ${x.reason}`),result.deployment,result.costPlan,...result.testPlan,...result.decisions.map(d=>[d.conclusion,...d.because,...d.assumptions].join(' ')),...result.memoryScenarios.map(s=>s.assumptions+' '+s.memory.budgetGiB+' GiB'),...result.unknowns,`${L('نسخهٔ قواعد','Decision rules','Reglas')}: ${result.version}; ${L('بازبینی عرضه‌های جدید','New-release review','Revisión de nuevas versiones')}: ${result.catalogReviewed}`].join('\n\n');
  $: if(ready) saveProgress(answers,statuses,step,finished,detailed);
  function saveProgress(currentAnswers:WizardAnswers,currentStatuses:Record<string,AnswerStatus>,currentStep:number,currentFinished:boolean,currentDetailed=false){
    try {
      if(Object.keys(currentAnswers).length) localStorage.setItem(storageKey,JSON.stringify({version:WIZARD_VERSION,answers:currentAnswers,statuses:currentStatuses,step:currentStep,finished:currentFinished,detailed:currentDetailed}));
      else localStorage.removeItem(storageKey);
      storageUnavailable=false;
      // Retire the old session copy only after the persistent write/removal succeeds.
      try { sessionStorage.removeItem(legacySessionKey); } catch {}
    } catch { storageUnavailable=Object.keys(currentAnswers).length>0; }
  }
  onMount(()=>{
    let saved;
    try { saved=JSON.parse(localStorage.getItem(storageKey)??'null'); } catch {}
    if(![WIZARD_VERSION,'2026-09-19.2'].includes(saved?.version)){try { saved=JSON.parse(sessionStorage.getItem(legacySessionKey)??'null'); } catch {}}
    if([WIZARD_VERSION,'2026-09-19.2'].includes(saved?.version)){
      detailed=saved.detailed===true||saved.version==='2026-09-19.2';
      answers=cleanWizard(saved.answers,locale);
      statuses=Object.fromEntries(Object.entries(saved.statuses??{}).filter(([key,v])=>wizardQuestions.some(q=>q.id===key)&&['declared','estimate','measured','unknown'].includes(String(v)))) as Record<string,AnswerStatus>;
      step=Math.max(0,Math.min(detailed?5:2,Number(saved.step)||0));
      finished=saved.finished===true&&(answers.task==='unknown'||wizardComplete(answers,locale));
      if(saved.finished&&!finished&&answers.task!=='unknown')step=wizardQuestions.find(q=>visibleQuestion(q,answers,locale)&&!answers[q.id])?.step??0;
    } else {
      // Old wizard URLs are imported once, then removed from the address bar.
      const legacyAnswers=Object.fromEntries(wizardQuestions.flatMap(q=>{
        const value=$page.url.searchParams.get('w-'+q.id);
        return value===null?[]:[[q.id,value]];
      }));
      answers=cleanWizard(legacyAnswers,locale);
    }
    const url=new URL($page.url);
    const legacyKeys=[...url.searchParams.keys()].filter(key=>key.startsWith('w-'));
    if(legacyKeys.length){for(const key of legacyKeys)url.searchParams.delete(key);replaceState(url,$page.state);}
    ready=true;
  });
  onDestroy(()=>{if(opened&&typeof document!=='undefined')document.body.style.overflow=previousOverflow;});
  function articleLink(slug:string){
    const localizedSlug=llmTopicSlug(slug,locale)??(locale==='fa'?slug:`${slug}-${locale}`);
    const article=allArticleMetadata.find(a=>a.slug===localizedSlug&&a.lang===locale);
    return article&&(!article.draft||browser&&hasLlmPreview($page.url.searchParams))?{title:article.title,cover:article.cover,excerpt:article.excerpt,href:`${llmBase(locale)}/articles/${article.slug}/${article.draft?'?show-drafts=true':''}`} :undefined;
  }
  function helpArticles(question:typeof wizardQuestions[number]){
    const extra:Record<string,string[]>={
      task:[answers.task==='coding'?'coding':'evaluation'],
      sources:['rag'], format:['adaptation'], inputSize:['rag'], inputTokens:['latency'], maxTokens:['latency'],
      concurrency:['latency'], mode:['latency'], hardware:['cost'], deployment:['cost'],
      success:[answers.task==='coding'?'coding':'size']
    };
    return [...new Set([question.article,...(extra[question.id]??[])])]
      .map(topic=>articleLink(articleTopics[topic])).filter((article):article is NonNullable<typeof article>=>!!article).slice(0,2);
  }
  function unit(id:string|null){const units:Record<string,string>={files:L('فایل','files','archivos'),tokens:L('توکن','tokens','tokens'),people:L('نفر','people','personas'),requests:L('درخواست','requests','solicitudes'),'requests/day':L('درخواست در روز','requests/day','solicitudes/día'),'hours/day':L('ساعت در روز','hours/day','horas/día'),seconds:L('ثانیه','seconds','segundos'),items:L('مورد','items','elementos'),hours:L('ساعت','hours','horas'),months:L('ماه','months','meses'),GPUs:'GPU',GiB:'GiB','GiB/GPU':L('GiB در هر کارت','GiB per GPU','GiB por GPU'),'toman/USD':L('تومان برای هر دلار','toman per USD','toman por USD'),currency:answers.currency==='million-toman'?L('میلیون تومان','million toman','millones de toman'):answers.currency==='usd'?'USD':answers.currency==='eur'?'EUR':L('واحد هنوز مشخص نیست','currency undecided','moneda pendiente')};return id?units[id]??id:'';}
  function statusLabel(s:string){return s==='measured'?L('اندازه‌گیری‌شده','Measured','Medido'):s==='estimate'?L('تخمین شما','Your estimate','Su estimación'):s==='unknown'?L('هنوز مشخص نیست','Not known yet','Aún no se sabe'):L('اعلام‌شده','Declared','Declarado');}
  function answerLabel(q:typeof wizardQuestions[number]){const v=answers[q.id];if(!v||v==='unknown')return L('هنوز مشخص نیست','Not known yet','Aún no se sabe');if(q.kind==='number')return `${n.format(Number(v))} ${unit(q.unit)}`;if(q.kind==='text')return v;return v.split('|').map(v=>localized(q.options.find(o=>o.value===v)?.label??[v,v,v],locale)).join(L('، ', ', ', ', '));}
  function choose(id:string,value:string){delete numericDrafts[id];if(id==='currency')for(const key of ['capex','monthly','usdRate'])delete numericDrafts[key];numericDrafts={...numericDrafts};answers=changeWizard(answers,id,value,locale);finished=false;email='';contactStatus='';copyStatus='';statuses={...statuses,[id]:value==='unknown'?'unknown':wizardQuestions.find(q=>q.id===id)?.kind==='number'?'estimate':'declared'};numericDrafts=Object.fromEntries(Object.entries(numericDrafts).filter(([key])=>{const q=wizardQuestions.find(q=>q.id===key);return q&&visibleQuestion(q,answers,locale);}));}
  function enterNumber(id:string,raw:string){
    numericDrafts={...Object.fromEntries(wizardQuestions.filter(q=>q.kind==='number'&&answers[q.id]&&answers[q.id]!=='unknown').map(q=>[q.id,answers[q.id]])),...numericDrafts,[id]:raw};
    answers=cleanWizard({...answers,...numericDrafts},locale);finished=false;email='';contactStatus='';copyStatus='';statuses={...statuses,[id]:'estimate'};
  }
  function multi(id:string,value:string){const old=(answers[id]??'').split('|').filter(v=>v&&v!=='unknown');const next=old.includes(value)?old.filter(v=>v!==value):[...old,value];if(id==='success'&&next.length>3)return;choose(id,next.join('|'));}
  async function move(next:number){step=next;await tick();heading?.focus();heading?.scrollIntoView({block:'start',behavior:'smooth'});}
  async function showResult(){
    const missing=wizardQuestions.find(q=>visibleQuestion(q,answers,locale)&&inputErrors[q.id]);
    if(!answers.task)return;
    if(answers.task!=='unknown'&&missing){finished=false;detailed=true;await move(missing.step);return;}
    finished=true;await tick();previousOverflow=document.body.style.overflow;document.body.style.overflow='hidden';opened=true;dialog.showModal();await tick();resultHeading?.focus();
  }
  function closeResult(){dialog?.close();if(opened)document.body.style.overflow=previousOverflow;opened=false;reopenButton?.focus();}
  async function reset(){closeResult();detailed=false;answers={};numericDrafts={};statuses={};finished=false;helpOpen={};email='';copyStatus='';contactStatus='';saveProgress({}, {}, 0, false);await move(0);startElement?.scrollIntoView({block:'start',behavior:'smooth'});}
  function modelMemory(model:ModelVersion,a:WizardAnswers):MemoryEstimate|undefined {return wizardMemory(model,a,research.artifacts,calculateMemory);}

  function memoryHref(model:ModelVersion){const mem=modelMemory(model,answers);return llmSelectionHref($page.url,{view:'hardware-feasibility','research-model':model.id,preset:null,'r_hardware-feasibility':JSON.stringify({method:answers.hardware==='cpu'?'cpu':'gpu',...(mem?{context:mem.context,active:mem.active}:{}),model:model.id})},'hardware-feasibility');}
  function gpuHref(){const estimates=result.candidates.flatMap(c=>c.memory?[c.memory.budgetGiB]:[]);return `${llmBase(locale)}/guides/gpu-selection/${estimates.length?'?gpu-min-memory='+Math.ceil(Math.max(...estimates)):''}#gpu-comparison-table`;}
  function runtimeLicense(engine:string|undefined){
    const product=repository.softwareProducts.find(p=>p.name.toLowerCase()===engine?.toLowerCase());
    const release=repository.softwareReleases.find(r=>r.productId===product?.id);
    return release?.license.name.state==='known'&&release.license.url.state==='known'?{name:release.license.name.value,url:release.license.url.value}:undefined;
  }
  function revealContact(event:MouseEvent){if(!event.isTrusted)return;email=new TextDecoder().decode(Uint8Array.from([115,97,108,101,115,64,116,97,114,103,111,109,97,110,46,99,111,109]));}
  async function copyEmail(){try{await navigator.clipboard.writeText(email);contactStatus=c.emailCopied;}catch{emailInput.focus();emailInput.select();contactStatus=c.manualCopy;}}
  async function copyBrief(){try{await navigator.clipboard.writeText(brief);copyStatus=c.copied;}catch{briefArea.focus();briefArea.select();copyStatus=c.manualCopy;}}
</script>
<section bind:this={startElement} class="organization-start" id="llm-starting-plan" aria-labelledby="wizard-title">
  <header><h3 id="wizard-title">{L('راهنمای تعامل','Interactive guide','Guía interactiva')}</h3><p>{L('با چند پرسش اصلی شروع کنید؛ برای نتیجهٔ دقیق‌تر، مشخصات اجرا را بعداً اضافه کنید.','Start with the key questions; add deployment details later to refine the plan.','Empiece con las preguntas principales; añada después detalles para afinar el plan.')}</p></header>
  <noscript><p>{c.noScript}</p></noscript>
  {#if storageUnavailable}<p role="status">{L('ذخیره‌سازی در این مرورگر ممکن نیست؛ با بستن صفحه، پاسخ‌ها حفظ نمی‌شوند.','This browser cannot save your answers; they will not persist after closing the page.','Este navegador no puede guardar las respuestas; se perderán al cerrar la página.')}</p>{/if}
  {#if finished}<div class="finished"><p>{L('پاسخ‌ها و نتیجه در این مرورگر ذخیره شده‌اند؛ با «شروع مجدد» می‌توانید آن‌ها را پاک کنید.','Answers and results are saved in this browser. Choose “Start again” to delete them.','Las respuestas y el resultado se guardan en este navegador. Elija «Empezar de nuevo» para borrarlos.')}</p><button class="primary" bind:this={reopenButton} on:click={showResult}>{L('مشاهده نتیجه','View results','Ver resultado')}</button><button on:click={()=>{finished=false;move(0);}}>{c.edit}</button><button on:click={reset}>{c.reset}</button></div>
  {:else}
    {#if answers.task}<ol class="progress" aria-label={L('مراحل راهنما','Guide stages','Etapas')} >{#each displayedStages as title,i}<li class:active={i===step}><button aria-current={i===step?'step':undefined} on:click={()=>move(i)}>{n.format(i+1)}. {title}</button></li>{/each}</ol>{/if}
    <h4 class="stage-heading" tabindex="-1" bind:this={heading}>{answers.task?displayedStages[step]:''}</h4>
    <div class="question-list">
    {#each currentQuestions as q (q.id)}
      {@const article=articleLink(articleTopics[q.article])}
      <fieldset class="question" data-question={q.id}><legend>{localized(q.title,locale)}</legend><p class="why">{localized(q.why,locale)}</p>
        {#if q.kind==='number'||q.kind==='text'}<label class="entry"><span class="sr-only">{localized(q.title,locale)}</span><input class="fa-num" type="text" inputmode={q.kind==='number'?(numericRules(q.id).integer?'numeric':'decimal'):'text'} maxlength={q.kind==='number'?18:160} value={numericDrafts[q.id]??(answers[q.id]==='unknown'?'':answers[q.id]??'')} on:input={e=>q.kind==='number'?enterNumber(q.id,e.currentTarget.value):choose(q.id,e.currentTarget.value)} aria-invalid={!!inputErrors[q.id]} aria-describedby={`help-${q.id}${inputErrors[q.id]?' error-'+q.id:''}`} /><span>{unit(q.unit)}</span></label>
          {#if q.kind==='number'&&answers[q.id]&&answers[q.id]!=='unknown'}<label class="provenance">{L('مبنای عدد','Number source','Origen del dato')} <select value={statuses[q.id]??'estimate'} on:change={e=>statuses={...statuses,[q.id]:e.currentTarget.value as AnswerStatus}}><option value="estimate">{statusLabel('estimate')}</option><option value="measured">{statusLabel('measured')}</option><option value="declared">{statusLabel('declared')}</option></select></label>{/if}
        {:else}<div class="choices">{#each wizardOptions(q,locale) as option}{@const blocked=q.id==='deployment'&&option.value==='api'&&answers.policy!=='public'}<label class:chosen={(answers[q.id]??'').split('|').includes(option.value)} class:blocked><input class="fa-num" type={q.kind==='multi'?'checkbox':'radio'} name={'wizard-'+q.id} value={option.value} checked={(answers[q.id]??'').split('|').includes(option.value)} disabled={blocked} on:change={()=>q.kind==='multi'?multi(q.id,option.value):choose(q.id,option.value)} /><span>{localized(option.label,locale)}{#if blocked}<small>{L('نیازمند اجازهٔ پردازش بیرون سازمان','Requires permission for external processing','Requiere permiso de procesamiento externo')}</small>{/if}</span></label>{/each}</div>{/if}
        {#if inputErrors[q.id]}<p class="input-error" id={`error-${q.id}`} role="alert">{inputErrors[q.id]}</p>{/if}<div class="question-help"><button type="button" class:chosen={answers[q.id]==='unknown'} on:click={()=>choose(q.id,'unknown')}>{L('فعلاً مشخص نیست','Not known yet','Aún no lo sé')}</button><button type="button" aria-expanded={!!helpOpen[q.id]} aria-controls={`help-${q.id}`} on:click={()=>helpOpen={...helpOpen,[q.id]:!helpOpen[q.id]}}>{L('نمی‌دانم؛ کمکم کن','Help me answer','Ayúdeme a responder')}</button>{#if article}<a href={article.href} target="_blank" rel="noopener">{L('مقاله مرتبط','Related article','Artículo relacionado')} ↗</a>{/if}</div>
        <div id={`help-${q.id}`} hidden={!helpOpen[q.id]}>
          <p class="help-text">{localized(q.help,locale)}</p>
          {#if helpOpen[q.id]}
            <div class="help-reading">
              {#each helpArticles(q) as related}
                <a class="help-article" href={related.href} target="_blank" rel="noopener">
                  {#if related.cover}<img {...imageAttributes(related.cover,'(max-width: 700px) 76px, 112px')} alt="" loading="lazy" />{/if}
                  <div><h5>{related.title}</h5><p>{related.excerpt}</p></div>
                </a>
              {/each}
            </div>
          {/if}
        </div>
        {#if q.id==='sources'&&(answers.sources??'').includes('archive')}<p class="feedback">{L('برای پاسخ از این منابع، معمولاً چند بخش مرتبط را پیدا می‌کنیم و به مدل می‌دهیم؛ لازم نیست هر بار همهٔ آرشیو را بخواند.','We will assess archive size separately from input per request.','Evaluaremos el archivo por separado de la entrada de cada solicitud.')}</p>{/if}
      </fieldset>
    {/each}
    </div>
    <nav class="step-actions" aria-label={L('حرکت بین مراحل','Move between stages','Cambiar de etapa')}>
      {#if step>0}<button on:click={()=>move(step-1)}>{c.back}</button>{/if}
      <button class="primary" disabled={!canContinue} on:click={showResult}>{L('مشاهدهٔ پیشنهاد اولیه','View initial plan','Ver propuesta inicial')}</button>
      {#if step<(detailed?5:2)}<button disabled={!canContinue} on:click={()=>move(step+1)}>{c.next}</button>{/if}
      {#if !detailed&&answers.task}<button on:click={()=>{detailed=true;move(0);}}>{L('دقیق‌ترکردن پیشنهاد','Refine the plan','Afinar la propuesta')}</button>{/if}
      {#if answers.task}<button class="text-button" on:click={reset}>{c.reset}</button>{/if}
    </nav>
  {/if}
  <dialog bind:this={dialog} on:cancel={closeResult} on:close={closeResult} aria-labelledby="wizard-result-title" dir={locale==='fa'?'rtl':'ltr'}>
    <header class="dialog-bar">
      <div><small>{L('راهنمای انتخاب مدل سازمانی','Organizational model guide','Guía de modelos para organizaciones')}</small>
      <h2 tabindex="-1" bind:this={resultHeading} id="wizard-result-title">{result.discovery?L('اول یک کار مشخص را برای آزمایش انتخاب کنید','Choose one task for a first trial','Elija una tarea para una primera prueba'):result.candidates.length?L('بر اساس پاسخ‌ها، این مدل‌ها را برای شروع مقایسه کنید','Based on your answers, compare these models first','Según sus respuestas, compare primero estos modelos'):L('با این شرایط، هنوز مدلی برای شروع پیدا نکردیم','No verified shortlist for these constraints yet','Aún no hay candidatos verificables con estas restricciones')}</h2>
      </div>
      <button class="close" aria-label={L('بستن نتیجه','Close results','Cerrar resultado')} on:click={closeResult}>×</button>
    </header>
    <div class="result-dialog themed-scroll">
    {#if result.discovery}<p>{L('خلاصه‌کردن نامه، استخراج مبلغ فاکتور یا یافتن بند آیین‌نامه را انتخاب کنید. خروجی درست را با کسی مشخص کنید که همان کار را انجام می‌دهد؛ سپس به پرسش اول برگردید.','Choose a letter summary, invoice amount extraction or policy lookup. Define a correct output with the person doing the work, then return to the first question.','Elija resumir cartas, extraer importes o consultar normas. Defina la respuesta correcta con quien realiza la tarea y vuelva a la primera pregunta.')}</p>{/if}
    {#if !result.discovery}<section class="explanation"><h3>{L('پیشنهاد شروع','Where to start','Por dónde empezar')}</h3><p>{result.rationale}</p>{#each result.decisions.filter(d=>d.status==='not-feasible') as blocker}<p class="feedback">{blocker.conclusion}</p>{/each}</section>{/if}
    <details class="basis"><summary>{L('اطلاعاتی که وارد کرده‌اید','Your supplied information','Información que ha proporcionado')}</summary><dl>{#each answerRows as item}<div><dt>{item.title}</dt><dd>{item.value} · {statusLabel(item.status)}</dd></div>{/each}</dl><button on:click={()=>{closeResult();finished=false;move(0);}}>{c.edit}</button></details>
    {#if result.candidates.length}<section class="result-row"><header><span class="row-number">{n.format(1)}</span><h3>{answers.task==='coding'?L('مدل کدنویسی','Coding model','Modelo de código'):answers.writingTask==='translation'?L('مدل ترجمه','Translation model','Modelo de traducción'):L('مدل پاسخ‌گو','Answer model','Modelo de respuesta')}</h3><p>{L('گزینه‌های آزمون','Candidates to test','Candidatos para probar')}</p></header><div class="row-content"><div class="candidate-grid">{#each result.candidates as candidate,i}<article class="candidate" data-model={candidate.model.id}><small>{i===0?L('شروع مقایسه','Start here','Punto de partida'):L('گزینهٔ مقایسه','Compare with','Compare con')}</small><h4><bdi>{candidate.model.exactName}</bdi></h4><p>{candidate.reason}</p>{#if candidate.difference}<p>{candidate.difference}</p>{/if}{#if candidate.runtimeReason}<p class="limitation">{candidate.runtimeReason}</p>{/if}{#if candidate.limit}<p class="limitation">{candidate.limit}</p>{/if}<a href={candidate.source} target="_blank" rel="noopener">{L('منبع و نسخهٔ مدل','Model source and revision','Fuente y versión del modelo')} ↗</a>{#if locale!=='fa'&&candidate.license!=='permissive'}<p class="limitation">{candidate.license==='noncommercial'?L('','Research candidate; the recorded terms prohibit commercial use.','Candidato de investigación; los términos registrados prohíben el uso comercial.'):L('','Check model terms for your chosen use before deployment.','Revise los términos para el uso elegido antes de desplegar.')}{#if candidate.model.license.url.state==='known'} <a href={candidate.model.license.url.value}>{candidate.model.license.name.state==='known'?candidate.model.license.name.value:L('','Model terms','Términos del modelo')}</a>{/if}</p>{/if}</article>{/each}</div><p class="small">{L('حجم فایل وزن، حافظهٔ کامل اجرا نیست؛ حافظهٔ بار و زمان پاسخ در مرحلهٔ پایلوت سنجیده می‌شوند.','Weight files do not represent total runtime memory; workload memory and latency are measured in the pilot.','Los pesos no son toda la memoria de ejecución; memoria de carga y latencia se miden en el piloto.')}</p><a class="table-result" href={tableHref} on:click={closeResult}>{L('مقایسهٔ همین مدل‌ها در جدول','Compare these exact models in the table','Comparar estos modelos en la tabla')} ←</a></div></section>{:else if !result.discovery}<p>{L('طول متن و حافظهٔ آزاد را بررسی کنید. اگر این مشخصات درست‌اند، کوتاه‌کردن ورودی یا فراهم‌کردن حافظهٔ بیشتر می‌تواند گزینه‌های دیگری در اختیار شما بگذارد.','Review input, memory and task constraints. With fixed existing hardware, candidates exceeding the memory estimate are omitted; a third model is not forced.','Revise entrada, memoria y tarea. Con hardware fijo se omiten candidatos que superan la estimación; no se fuerza un tercer modelo.')}</p>{/if}
    {#if result.specialists.length}<section class="result-row"><header><span class="row-number">{n.format(2)}</span><h3>{L('پیدا کردن سند','Finding documents','Encontrar documentos')}</h3></header><div class="row-content"><div class="candidate-grid specialists">{#each result.specialists as item}<article class="candidate"><small>{item.model.kind==='reranker'?L('بازچینش نتایج','Reranking','Reordenación'):'Embedding'}</small><h4><bdi>{item.model.exactName}</bdi></h4><p>{item.reason}</p></article>{/each}</div><a href={retrievalHref} on:click={closeResult}>{L('مقایسهٔ همین ابزارهای جست‌وجو در جدول','Compare these retrieval models in the table','Comparar estos modelos de búsqueda en la tabla')} ←</a></div></section>{/if}
    {#if !result.discovery}
      <section class="explanation"><h3>{L('اجرای آزمایشی','Pilot deployment','Despliegue piloto')}</h3><p>{result.deployment}</p>
      {#if result.local}<a href={gpuHref()} on:click={closeResult}>{L('بررسی GPU و حافظه در جدول','Review GPUs and memory','Ver GPU y memoria')} ←</a>{/if}
      <h3>{L('بهره‌برداری و نگهداری','Production and maintenance','Producción y mantenimiento')}</h3><p>{result.production}</p>
      {#each result.decisions.filter(d=>d.area==='capacity') as decision}<p>{decision.conclusion}</p>{/each}
      <details><summary>{L('هزینه و فرض‌های محاسبه','Costs and calculation assumptions','Costes y supuestos')}</summary>
        {#each result.decisions.filter(d=>d.area==='cost') as decision}<p>{decision.conclusion}</p>{#each decision.assumptions as assumption}<p class="small">{assumption}</p>{/each}{/each}
        {#if result.apiCost}<p><a href={result.apiCost.tariff.sourceUrl} target="_blank" rel="noopener">{L('تعرفهٔ رسمی این محاسبه','Official tariff for this calculation','Tarifa oficial del cálculo')} ↗</a></p>{/if}
        {#if result.costComparison}<a href={articleLink(articleTopics.cost)?.href} target="_blank" rel="noopener">{L('اقلام و منابع نمونهٔ قیمت‌گذاری','Priced example and sources','Ejemplo de precios y fuentes')} ↗</a>{/if}
        {#each result.memoryScenarios as scenario}<p>{scenario.assumptions} <bdi>{scenario.modelId}: {n.format(scenario.memory.budgetGiB)} GiB</bdi></p>{/each}
      </details></section>
      <section class="explanation"><h3>{L('چرا این پیشنهاد را دادیم؟','Which answers changed the plan?','¿Qué respuestas cambiaron el plan?')}</h3>
      {#each result.decisions.filter(d=>d.area!=='model'&&d.answerIds.some(id=>answers[id]&&answers[id]!=='unknown')).slice(0,5) as decision}
        <div class="decision-link"><strong>{decision.answerIds.filter(id=>answers[id]&&answers[id]!=='unknown').map(value).join(' · ')}</strong><p>{decision.conclusion}</p></div>
      {/each}
      <details><summary>{L('جزئیات اجرا و ارزیابی نتیجه','All decisions and acceptance criteria','Decisiones y criterios de aceptación')}</summary>{#each result.decisions.filter(d=>d.area!=='model') as decision}<p>{decision.conclusion}</p>{/each}</details>
      </section>
      <section class="explanation"><h3>{L('برای دقیق‌ترشدن پیشنهاد','To refine the plan','Para afinar la propuesta')}</h3>{#if result.unknowns.length}<ul>{#each result.unknowns as text}<li>{text}</li>{/each}</ul>{/if}<button on:click={()=>{closeResult();finished=false;detailed=true;move(0);}}>{L('دقیق‌ترکردن پیشنهاد','Refine the plan','Afinar la propuesta')}</button></section>
    {/if}
    <section class="further-reading"><h3>{L('برای تصمیم بعدی، این‌ها را بخوانید','Read next','Para la siguiente decisión')}</h3><div>{#each articleLinks as link}<a href={link.href} target="_blank" rel="noopener">{link.title} ↗</a>{/each}</div></section>
    <div class="handoffs"><details class="technical-plan"><summary>{c.technical}</summary><p>{L('برای مقایسهٔ مدل‌های بالا، نسخهٔ فایل‌ها و تنظیمات هر اجرا را ثبت کنید.','Test the same candidates above with recorded versions and settings.','Pruebe los mismos candidatos con versiones y ajustes registrados.')}</p>{#each result.candidates as candidate}{@const run=repository.modelProfiles.find(p=>p.modelVersionId===candidate.model.id)?.runGuides.find(g=>g.engine===candidate.runtime)}<article><h4><bdi>{candidate.model.exactName}</bdi></h4><button on:click={()=>{closeResult();onOpenModel(candidate.model.id,'quality');}}>{c.profile}</button>{#if run}<a href={run.href} target="_blank" rel="noopener">{c.run}: <bdi>{run.engine}</bdi></a>{/if}{#if candidate.artifactUrl}<a href={candidate.artifactUrl} target="_blank" rel="noopener">{L('فایل‌های نسخهٔ پیشنهادی','Suggested weight files','Archivos de pesos propuestos')} ↗</a>{/if}{#if locale!=='fa'&&runtimeLicense(candidate.runtime)}{@const runtime=runtimeLicense(candidate.runtime)!}<p>{c.runtimeLicense}: <a href={runtime.url}>{runtime.name}</a></p>{/if}{#if candidate.memory}<p>{L('سناریوی حافظه:','Memory scenario:','Escenario de memoria:')} <bdi>{n.format(candidate.memory.context)} tokens × {n.format(candidate.memory.active)}</bdi> · {L('این برآورد برای پردازش هم‌زمان درخواست‌ها روی یک دستگاه است.','All requests active on one device; this does not predict speed or queues.','Todas las solicitudes activas en un equipo; no predice velocidad ni colas.')}</p><a href={memoryHref(candidate.model)} on:click={closeResult}>{c.memory}: <bdi>{n.format(candidate.memory.budgetGiB)} GiB</bdi></a>{/if}</article>{/each}{#if locale!=='fa'}<p>{c.licenseScope}</p>{#if answers.deployment==='api'}<p>{c.serviceTerms}</p>{/if}{/if}<ul>{#each result.testPlan as text}<li>{text}</li>{/each}</ul><details><summary>{L('تمام پاسخ‌ها و مبنای آن‌ها','All answers and their provenance','Todas las respuestas y su origen')}</summary><dl>{#each answerRows as item}<dt>{item.title}</dt><dd>{item.value} · {statusLabel(item.status)}</dd>{/each}</dl></details><p class="small">{result.version} · {result.catalogReviewed}</p></details>
    <details class="brief"><summary>{L('برای پیمانکار','For the contractor','Para el proveedor')}</summary><p>{L('از پیمانکار بخواهید هزینهٔ آزمایش مدل‌های بالا را با همین بودجه و انتظار شما پیشنهاد بدهد. هزینهٔ راه‌اندازی و پشتیبانی ماهانه، مسئول نگهداری و نتیجهٔ آزمون با تعداد درخواست موردنظر، جدا مشخص شوند.','Quote a pilot using these same models, budgets and criteria. Separate setup, operations and support, and specify maintenance ownership and load-test acceptance.','Presupueste un piloto con estos modelos, presupuestos y criterios. Separe instalación, operación y soporte; indique mantenimiento y aceptación de carga.')}</p><textarea readonly rows="10" bind:this={briefArea} value={brief} aria-label={c.brief}></textarea><button on:click={copyBrief}>{c.copy}</button><span role="status">{copyStatus}</span></details></div>
    <aside class="consultation"><p>{c.cta}</p>{#if !email}<button class="primary" on:click={revealContact}>{c.revealContact}</button>{:else}<div class="contact-actions"><input class="fa-num" readonly dir="ltr" bind:this={emailInput} value={email} aria-label={c.revealContact} /><button on:click={copyEmail}>{c.copyEmail}</button><a href={'mailto:'+email}>{c.composeEmail}</a></div>{/if}<span role="status">{contactStatus}</span></aside>
    </div>
  </dialog>
</section>
<style>
.basis>summary{padding:16px}.basis>button{margin:12px}.decision-link{border-bottom:1px solid var(--line);padding-block:12px}.decision-link strong{font-size:14px;color:var(--muted)}
  .input-error{color:var(--text);border-inline-start:3px solid #d48b35;padding-inline-start:.75rem;}
  input[aria-invalid="true"]{border-color:#d48b35;}
.help-reading{display:grid;gap:12px;margin-top:12px}.help-article{display:flex;gap:16px;align-items:flex-start;padding:14px;border:1px solid var(--line);border-radius:9px;background:var(--paper);text-decoration:none;min-width:0}.help-article:hover{border-color:var(--teal)}.help-article img{flex:0 0 112px;width:112px;height:auto;aspect-ratio:16/10;object-fit:cover;border-radius:6px}.help-article>div{min-width:0}.help-article h5{margin:0 0 6px;font-size:16px;line-height:1.7;color:var(--ink)}.help-article p{margin:0;font-size:13px;line-height:1.9;color:var(--muted)}
@media(max-width:700px){.help-article{gap:12px;padding:12px}.help-article img{flex-basis:76px;width:76px}.help-article h5{font-size:14px}.help-article p{font-size:12px}}

.organization-start{grid-column:1/-1;border:1px solid var(--line);border-radius:12px;padding:24px;background:color-mix(in srgb,var(--paper) 94%,var(--teal));margin-block:20px 24px;line-height:1.9;scroll-margin-top:100px;min-width:0}.organization-start nav{position:static;inset:auto;background:transparent;padding:0;border:0;margin-inline:0;flex-direction:row;display:flex}header h3{font-size:21px;margin:0}header p{margin:6px 0 14px;color:var(--muted)}.progress{display:flex;flex-wrap:wrap;gap:8px;list-style:none;padding:0;border-bottom:1px solid var(--line);padding-bottom:12px}.progress button{border:0;font-size:12px;background:none}.progress .active button{color:var(--link-ink);font-weight:800}.stage-heading{font-size:19px;scroll-margin-top:110px;margin:16px 0}.stage-heading:empty{display:none}.question-list{display:grid;gap:26px}.question{border:0;padding:0;margin:0;min-width:0}.question+.question{border-top:1px solid var(--line);padding-top:18px}.question legend{font-weight:750;font-size:17px;padding:0;float:inline-start;width:100%}.why{clear:both;font-size:14px;margin:7px 0 12px;color:var(--muted)}.choices{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.choices label{display:flex;align-items:center;gap:9px;padding:12px;border:1px solid var(--line);border-radius:8px;background:var(--paper);cursor:pointer;font-size:15px}.choices label.chosen,.question-help button.chosen{border-color:var(--teal);background:var(--soft)}.choices small{display:block;font-size:12px}.blocked{opacity:.55}.choices input{accent-color:var(--teal);width:17px;height:17px;flex-shrink:0}.question-help{display:flex;gap:14px;align-items:center;flex-wrap:wrap;margin-top:12px;font-size:13px}.question-help button{font-size:13px}.question-help button:not(.chosen){background:transparent}.help-text,.feedback{font-size:14px;border-inline-start:3px solid var(--teal);padding:10px 14px;background:var(--soft)}.entry{display:flex;gap:12px;align-items:center}.entry input{width:230px;max-width:60%}.provenance{display:flex;gap:10px;align-items:center;font-size:12px;margin-top:8px}.provenance select{font-size:12px}.step-actions,.finished{display:flex;flex-wrap:wrap;gap:12px;align-items:center;margin-top:24px}.finished p{flex-basis:100%;margin:0}button,input,textarea,select{font:inherit;color:var(--ink);background:var(--paper);border:1px solid var(--line);border-radius:7px;padding:8px 12px;box-sizing:border-box;min-width:0}button{cursor:pointer}button:disabled{opacity:.45;cursor:default}.primary{background:var(--soft);color:var(--link-ink);border-color:var(--teal)}.text-button{border:none}a{color:var(--link-ink)}:is(button,input,textarea,select,a):focus-visible{outline:2px solid var(--teal);outline-offset:3px}.sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%)}
dialog{box-sizing:border-box;width:min(1100px,calc(100vw - 40px));max-width:none;max-height:calc(100dvh - 40px);border:1px solid var(--line);border-radius:16px;padding:0;background:var(--bg);color:var(--ink);overflow:hidden}dialog[open]{display:flex;flex-direction:column}dialog::backdrop{background:rgb(0 0 0/.65);backdrop-filter:blur(3px)}.result-dialog{padding:10px 26px 26px;min-height:0;overflow-y:auto;overscroll-behavior:contain;scrollbar-gutter:stable}.dialog-bar{display:flex;justify-content:space-between;align-items:flex-start;gap:18px;padding:18px 26px;flex-shrink:0;background:var(--paper);border-bottom:1px solid var(--line)}.dialog-bar>div{min-width:0}.dialog-bar small{font-size:12px;color:var(--muted)}.close{font:24px/1 sans-serif;min-width:44px;min-height:44px;flex-shrink:0}.dialog-bar h2{font-size:clamp(18px,2vw,24px);line-height:1.6;margin:4px 0 0;overflow-wrap:anywhere}.result-dialog h3{font-size:19px;margin:0 0 10px}.result-dialog h4{font-size:19px;line-height:1.5;margin:10px 0;overflow-wrap:anywhere}.result-dialog p{margin:10px 0}.basis,.result-row,.explanation,.handoffs>details{border:1px solid var(--line);border-radius:9px;margin:16px 0;background:var(--paper)}.basis dl{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));margin:0;padding:14px;gap:16px}.basis dt{font-size:12px;color:var(--muted)}.basis dd{margin:4px 0 0;font-size:14px}.open-questions{font-size:14px;background:var(--soft);padding:12px 30px;border-radius:8px}.result-row{display:grid;grid-template-columns:170px minmax(0,1fr)}.result-row>header{padding:22px 18px;border-inline-end:1px solid var(--line)}.result-row>header p{font-size:13px;color:var(--muted)}.row-number{display:inline-grid;place-items:center;border-radius:50%;background:var(--soft);width:38px;height:38px;font-size:20px;margin-bottom:10px}.row-content{padding:18px;min-width:0}.candidate-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}.candidate{border:1px solid var(--line);border-radius:8px;padding:15px;min-width:0}.candidate:first-child{border-color:var(--teal)}.candidate small{color:var(--link-ink)}.candidate p{font-size:14px}.candidate a{font-size:12px}.candidate .limitation{font-size:12px;color:var(--muted)}.specialists{grid-template-columns:repeat(auto-fit,minmax(200px,1fr))}.row-content>a{display:inline-block;margin-top:14px}.deployment-title{font-size:19px;font-weight:700}.explanation{padding:20px}.further-reading{margin:24px 0}.further-reading>div{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.further-reading a{padding:14px;border:1px solid var(--line);border-radius:8px;line-height:1.7;font-size:14px}.handoffs{display:grid;grid-template-columns:1fr 1fr;gap:16px;align-items:start}.handoffs>details{padding:18px;margin:0;min-width:0}summary{cursor:pointer;font-weight:700;color:var(--link-ink)}.technical-plan article{padding:12px 0;border-bottom:1px solid var(--line)}.technical-plan article a{display:inline-block;margin:8px}.technical-plan p,.technical-plan li,.technical-plan dl,.brief p{font-size:14px}.technical-plan dd{margin-bottom:12px}.brief textarea{width:100%;resize:vertical;margin:14px 0;line-height:1.8;font-size:13px}.consultation{padding:20px;border:1px solid var(--teal);border-radius:9px;margin-top:22px}.contact-actions{display:flex;align-items:center;gap:10px;flex-wrap:wrap}.contact-actions a{display:inline-flex;align-items:center;min-height:44px}.contact-actions input{max-width:100%}.small{font-size:12px;color:var(--muted)}
@media(max-width:700px){.organization-start{padding:16px}.choices{grid-template-columns:1fr}.progress{gap:4px}.progress button{padding:6px;font-size:11px}.question legend{font-size:16px}.entry{flex-wrap:wrap}.entry input{max-width:100%;width:100%}dialog{width:calc(100vw - 16px);max-height:calc(100dvh - 16px);border-radius:10px}.result-dialog{padding:0 14px 14px}.dialog-bar{padding:12px 14px;gap:12px}.basis dl{grid-template-columns:1fr 1fr}.result-row{display:block}.result-row>header{border-inline-end:0;border-bottom:1px solid var(--line);padding:12px;display:flex;align-items:center;gap:12px}.result-row>header h3,.row-number{margin:0}.result-row>header p{display:none}.row-content{padding:12px}.candidate-grid,.specialists,.handoffs,.further-reading>div{grid-template-columns:1fr}.candidate{padding:16px}.handoffs{gap:12px}.question-help{gap:10px}.question-help button{font-size:12px}}
</style>
