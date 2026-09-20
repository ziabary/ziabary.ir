import type { LlmGuideRepository, ModelVersion, ApplicationId, ModelTaskSpecialization } from './schema';
import type { LlmLocale } from './i18n/runtime';
import { modelLanguageEvidence } from './evaluation';
import { cleanWizard, isLocal, localized, positive, wizardApplication, wizardLicense, type WizardAnswers, type MemoryEstimator } from './wizard-core';

export interface CandidateReview {
 model:ModelVersion; status:'eligible'|'conditional'|'excluded'; reasons:string[]; answerIds:string[]; evidenceIds:string[];
 score:number; language:string; license:ReturnType<typeof wizardLicense>; memory:ReturnType<MemoryEstimator>;
 memoryStatus:'estimated'|'outside-calculator'|'needs-input'|'unsupported'; source:string; role:string; reason:string; limit:string;
 weightGiB?:number; format?:string; runtime?:string; rankRole?:'start'|'quality'|'alternative'; difference?:string;
 specialty?:ModelTaskSpecialization; specialtyReason?:string; startingPreference?:string; runtimeReason?:string; runtimeUrl?:string; artifactUrl?:string;
}
const known=(v:{state:string;value?:number})=>v.state==='known'?v.value:undefined;
// Editorial starting preference, still subject to context, hardware and license filters.
// An initial document-Q&A result may precede the detailed length questions; in
// that case Aya is provisional, not a claim that an unknown document fits.
function persianStartingWork(a:WizardAnswers){
 const context=Math.max(positive(a.inputTokens)??0,positive(a.maxTokens)??0)+(positive(a.outputTokens)??0);
 const documents=a.task==='documents';
 const task=documents||['writing','extraction','general'].includes(a.task);
 const length=documents?(!a.inputSize||['unknown','short','retrieved'].includes(a.inputSize)):a.inputSize==='short';
 const allowedSources=documents?['provided','archive','general']:['provided','general'];
 return a.sourceLanguage==='fa'&&a.outputLanguage==='fa'&&task&&length&&context<=4096
  &&(!a.format||a.format==='text')&&(!a.sources||a.sources.split('|').every(s=>allowedSources.includes(s)))
  &&!['long','code','mixed'].includes(a.output)&&a.risk!=='decision';
}
export function workloadLanguages(a:WizardAnswers){
 const named=[a.sourceLanguage,a.outputLanguage].filter(x=>x&& !['unknown','mixed','multi','other'].includes(x));
 // Multilingual is not a synonym for Persian. Only explicit ISO language choices affect evidence.
 return [...new Set(named)];
}
// Prefer serving engines for shared/production deployments, while keeping CPU
// and fixed-memory exceptions tied to actual, reviewed weight packages.
export function professionalServing(a:WizardAnswers){
 return isLocal(a)&&(a.phase==='production'||a.deployment==='managed'||a.owner==='experienced'
  ||['team','organization','public','system'].includes(a.audience)||(positive(a.concurrency)??0)>1
  ||(positive(a.users)??0)>1||a.hardware==='gpu'&&a.audience!=='personal');
}
function chooseExecution(repository:LlmGuideRepository,model:ModelVersion,a:WizardAnswers){
 const guides=repository.modelProfiles.find(p=>p.modelVersionId===model.id)?.runGuides??[];
 const packages=(repository.artifactListings??[]).filter(x=>x.modelVersionId===model.id&&x.totalBytes&&x.files?.length)
  .sort((x,y)=>(x.totalBytes??Infinity)-(y.totalBytes??Infinity));
 const professional=professionalServing(a),cpu=a.hardware==='cpu',apple=/apple|metal|\bm[1-9]\b/i.test(a.gpuName??'');
 const capacity=positive(cpu?a.ram:a.vram),fixed=a.upgrade==='existing'||a.capex==='0'&&a.upgrade!=='possible';
 const orders=cpu||apple?['llama.cpp','Ollama','Transformers']:professional?['vLLM','SGLang','llama.cpp','Ollama','Transformers']:['llama.cpp','Ollama','vLLM','SGLang','Transformers'];
 // MLX also uses safetensors. Only reviewed native 16-bit packages can be
 // paired with general GPU engines here; quantized conversions need their own support evidence.
 const native=(p:typeof packages[number])=>['safetensors','pytorch'].includes(p.format.toLowerCase())&&/^(bf16|fp16|bfloat16|float16|f16)$/i.test(p.precision??'')&&!/mlx/i.test(p.repositoryUrl+' '+p.variant);
 const pairs=orders.flatMap(engine=>{
  const runtime=guides.find(g=>g.engine.toLowerCase()===engine.toLowerCase());
  if(!runtime)return [];
  return packages.filter(p=>['llama.cpp','Ollama'].includes(engine)?p.format.toLowerCase()==='gguf':native(p)).map(artifact=>({runtime,artifact}));
 });
 // A native package that already fills the device cannot be the proposed pilot.
 // Choosing a smaller GGUF package does not certify that its full workload fits.
 const pair=(isLocal(a)&&fixed&&capacity?pairs.find(p=>p.artifact.totalBytes!/2**30<capacity):pairs[0])??pairs[0];
 const nativeTooLarge=!!(fixed&&capacity&&pairs.some(p=>p.runtime.engine==='vLLM'&&p.artifact.totalBytes!/2**30>=capacity));
 return {artifact:pair?.artifact??packages[0],runtime:pair?.runtime,professional,cpu,apple,nativeTooLarge};
}
export function requestedSpecialty(a:WizardAnswers):ModelTaskSpecialization|undefined{
 if(a.task==='writing'&&a.writingTask==='translation')return 'translation';
 if(a.task==='coding')return a.codingMode==='completion'?'code-completion':a.codingMode==='agent'?'coding-agent':'coding-assistant';
}
export function assessWizardCatalog(repository:LlmGuideRepository,raw:WizardAnswers,locale:LlmLocale,estimate?:MemoryEstimator,kind?:'embedding'|'reranker'):CandidateReview[]{
 const a=cleanWizard(raw,locale),L=(fa:string,en:string,es:string)=>localized([fa,en,es],locale),n=new Intl.NumberFormat(locale==='fa'?'fa-IR':locale,{maximumFractionDigits:2});
 const application:ApplicationId=kind?'enterprise-rag':wizardApplication(a),languages=workloadLanguages(a);
 const input=Math.max(positive(a.inputTokens)??0,positive(a.maxTokens)??0),output=positive(a.outputTokens)??0;
 const capacity=isLocal(a)?positive(a.hardware==='gpu'?a.vram:a.hardware==='cpu'?a.ram:undefined):undefined;
 const fixed=isLocal(a)&&(a.upgrade==='existing'||a.capex==='0'&&a.upgrade!=='possible');
 const roles=repository.modelUseGuidance;
 return repository.models.map(model=>{
  const profile=repository.modelProfiles.find(p=>p.modelVersionId===model.id);
  const target=requestedSpecialty(a),translationOnly=model.taskSpecializations?.some(s=>s.task==='translation');
  const specialization=!kind?model.taskSpecializations?.find(s=>s.task===target):undefined;
  const translationPair=target==='translation'&&['fa','en','es'].includes(a.sourceLanguage)&&['fa','en','es'].includes(a.outputLanguage)&&a.sourceLanguage!==a.outputLanguage;
  const specialty=specialization&&(target!=='translation'||translationPair&&[a.sourceLanguage,a.outputLanguage].every(l=>specialization.languages?.includes(l)))?specialization.task:undefined;
  const specialtyReason=specialty==='translation'?L('این مدل برای ترجمه آموزش دیده و هر دو زبان انتخابی شما را پشتیبانی می‌کند؛ حفظ معنی، نام‌ها و اصطلاحات را با متن‌های خودتان مقایسه کنید.','Trained for translation and supporting both selected languages; compare meaning, names and terminology on your own texts.','Entrenado para traducción y compatible con ambos idiomas; compare significado, nombres y terminología con sus textos.')
   :specialty==='code-completion'?L('برای کامل‌کردن کد هنگام تایپ ساخته شده است؛ سرعت پیشنهاد و درستی ادامهٔ کد را در ویرایشگر خودتان بسنجید.','Designed for inline code completion; test suggestion latency and correctness in your editor.','Diseñado para completar código al escribir; pruebe latencia y corrección en su editor.')
   :specialty==='coding-agent'?L('برای تغییر پروژه و کار با ابزارهای برنامه‌نویسی آموزش دیده است؛ اصلاح چند فایل و اجرای آزمون‌ها را با یک کار واقعی امتحان کنید.','Trained for project edits and coding tools; test multi-file changes and test execution on a real task.','Entrenado para modificar proyectos y usar herramientas; pruebe cambios en varios archivos y ejecución de pruebas.')
   :specialty==='coding-assistant'?L('مدل تخصصی کدنویسی است؛ توضیح خطا، نوشتن تابع و اصلاح کد را با نمونه‌های پروژهٔ خودتان مقایسه کنید.','A code-specialized model; compare debugging, function generation and edits on your own project.','Modelo especializado en código; compare depuración, funciones y cambios en su proyecto.'):undefined;
  const execution=chooseExecution(repository,model,a),{artifact,runtime}=execution;
  const artifactSpec=repository.artifacts.filter(x=>x.modelVersionId===model.id&&x.size.state==='known').sort((x,y)=>(known(x.size)??Infinity)-(known(y.size)??Infinity))[0];
  const weightGiB=artifact?.totalBytes?artifact.totalBytes/2**30:artifactSpec?.size.state==='known'&&artifactSpec.size.unit==='GiB'?artifactSpec.size.value:undefined;
  const uses=roles.filter(x=>x.modelVersionId===model.id&&x.applicationId===application);
  const taskEvidence=repository.publishedEvaluations.filter(e=>e.modelVersionId===model.id&&e.applicationIds.includes(application)&&Number.isFinite(e.value));
  const languageEvidence=languages.map(lang=>modelLanguageEvidence(repository,model,lang as LlmLocale,application));
  const language=languageEvidence.length?languageEvidence.join(' / '):'not-recorded';
  const license=wizardLicense(model,locale),estimated=kind?undefined:estimate?.(model,a);
  // The calculator's Q4 GGUF estimate must never be presented as a native vLLM estimate.
  const memory=artifact?.format.toLowerCase()==='gguf'&&estimated&&weightGiB&&Math.abs(estimated.weightGiB-weightGiB)/weightGiB<0.01?estimated:undefined;
  const runtimeReason=!isLocal(a)||!execution.professional||!runtime?'':execution.cpu
   ?L('برای آزمایش روی CPU فعلی، این نسخهٔ کم‌حجم را پیشنهاد می‌کنیم. اگر بعداً سرویس را به GPU منتقل کردید، vLLM را بررسی کنید.','Use this compact package for the existing CPU pilot; reassess vLLM if moving the service to a GPU.','Use este paquete compacto para el piloto en CPU; reevalúe vLLM si migra a GPU.')
   :execution.apple?L('برای آزمایش روی Apple Silicon، این نسخه را با نرم‌افزار پیشنهادی همین کارت اجرا کنید؛ تنظیمات سرویس GPU را نمی‌توان عیناً به این دستگاه منتقل کرد.','For this Apple Silicon pilot, use the package’s selected runtime; the GPU-serving configuration does not transfer unchanged.','Para este piloto en Apple Silicon, use el motor elegido para este paquete; la configuración de servicio GPU no se traslada sin cambios.')
   :runtime?.engine==='vLLM'?''
   :execution.nativeTooLarge?L('وزن‌های نسخهٔ بررسی‌شده برای vLLM در حافظهٔ کارت فعلی جا نمی‌گیرند؛ برای شروع با همین کارت، نسخهٔ کم‌حجم GGUF را انتخاب کرده‌ایم.','The reviewed native vLLM weights exceed this GPU’s memory; this pilot uses a smaller GGUF package.','Los pesos nativos revisados para vLLM superan la memoria de esta GPU; el piloto usa un paquete GGUF menor.')
   :L('برای این مدل، اجرای نسخهٔ بررسی‌شده با vLLM در منابع ما ثبت نشده است؛ نرم‌افزار پیشنهادی بر اساس راهنمای همین مدل انتخاب شده است.','The reviewed sources do not document vLLM for this package; this runtime follows the model’s recorded guide.','Las fuentes revisadas no documentan vLLM para este paquete; el motor sigue la guía registrada del modelo.');
  const outside=!!positive(a.concurrency)&&Number(a.concurrency)>128||input+output>2**21;
  const memoryStatus=memory?'estimated':outside?'outside-calculator':!input||!output||!positive(a.concurrency)||a.loadDefinition==='queued'?'needs-input':'unsupported';
  const reasons:string[]=[],conditions:string[]=[],ids:string[]=['task','sourceLanguage','outputLanguage'];
  const exclude=(why:string,...fields:string[])=>{reasons.push(why);ids.push(...fields);};
  if(translationOnly){
   if(target!=='translation'||a.sourceLanguage===a.outputLanguage&&['fa','en','es'].includes(a.sourceLanguage))exclude(L('این مدل مخصوص ترجمه بین دو زبان است؛ برای بازنویسی، گفت‌وگو یا پاسخ به پرسش‌های اسناد انتخاب نمی‌شود.','This model translates between languages; it is not selected for rewriting, chat or document Q&A.','Este modelo traduce entre idiomas; no se elige para reescritura, chat ni preguntas sobre documentos.'),'writingTask','sourceLanguage','outputLanguage');
   else if(!translationPair)conditions.push(L('برای بررسی این گزینه، زبان مبدأ و مقصد را دقیق انتخاب کنید.','Select exact source and target languages to assess this option.','Elija los idiomas de origen y destino para evaluar esta opción.'));
   else if(!specialty)exclude(L('این جفت زبان در اطلاعات ترجمهٔ این مدل ثبت نشده است.','This translation pair is not documented for this model.','Este par de idiomas no está documentado para el modelo.'),'sourceLanguage','outputLanguage');
   if(locale!=='fa')conditions.push(...(model.license.restrictions??[]));
   if(a.inputSize==='long'||input>4096)conditions.push(L('برای متن بلند، ترجمهٔ بخش‌به‌بخش را هم امتحان کنید و واژه‌نامهٔ اصطلاحات را در همهٔ بخش‌ها ثابت نگه دارید.','For long texts, also test section-by-section translation with a consistent glossary.','Para textos largos, pruebe traducción por secciones con un glosario consistente.'));
  }
  if(kind?model.kind!==kind:!['generative','vision-language'].includes(model.kind))exclude(L('این مدل برای بخش دیگری از کار ساخته شده است؛ مثلاً جست‌وجو به‌جای نوشتن پاسخ.','This model has a different component role.','Este modelo tiene otro papel en el sistema.'));
  if(!kind&&!model.applications.includes(application))exclude(L('کاربرد انتخابی در اطلاعات این نسخه ثبت نشده است.','The chosen task is not documented for this revision.','La tarea elegida no está documentada para esta versión.'));
  if(!['available','announced'].includes(model.releaseStatus))exclude(L('این نسخه هنوز در دسترس نیست یا دیگر برای اجرای تازه پشتیبانی نمی‌شود.','This release is not verified for a new deployment.','Esta versión no está verificada para un despliegue nuevo.'));
  if(!kind&&model.stage==='base'&&!(a.task==='coding'&&a.codingMode==='completion'))exclude(L('وزن پایه برای گفت‌وگو و پیروی از دستور آماده نشده است.','Base weights are not an instruction-following assistant.','Los pesos base no son un asistente de instrucciones.'));
  if(a.task==='coding'&&a.codingMode==='completion'&&!kind&&!uses.some(u=>u.role==='code-completion'))exclude(L('تکمیل کد حین تایپ برای این نسخه مستند نشده است.','Inline completion is not documented for this revision.','La compleción en línea no está documentada para esta versión.'),'codingMode');
  if(license==='noncommercial'&&a.licenseUse!=='research')exclude(L('شرایط مجوز با استفادهٔ اعلام‌شده سازگار نیست.','Recorded license terms do not permit the selected use.','La licencia registrada no permite el uso elegido.'),'licenseUse');
  if(!kind&&input&&model.declaredContext.state==='known'&&model.declaredContext.value<input+output)exclude(L('متن ورودی و پاسخ در ظرفیت معمول این مدل جا نمی‌گیرند. اجرای متن بلندتر به تنظیمات و بررسی جداگانه نیاز دارد.','Input plus output exceeds native context; extensions require separate validation.','Entrada más salida supera el contexto nativo; la ampliación requiere validación.'),'inputTokens','maxTokens','outputTokens');
  if(!kind&&a.format==='media'&&!model.inputModalities.some(m=>m==='audio'||m==='video'||m==='image'))exclude(L('ورودی رسانه‌ای به جزء تبدیل یا مدل چندوجهی نیاز دارد.','Media input requires a conversion component or multimodal model.','La entrada multimedia requiere conversión o un modelo multimodal.'),'format');
  if(isLocal(a)&&!artifact&&!artifactSpec)conditions.push(L('بستهٔ وزن قابل نصب در فهرست فایل‌های بررسی‌شده نیست.','No installable weight package is in the reviewed file inventory.','No hay un paquete instalable en el inventario revisado.'));
  if(isLocal(a)&&!runtime)conditions.push(L('هنوز نرم‌افزار سازگار با فایل این نسخه را مشخص نکرده‌ایم.','The runtime for this revision still needs compatibility verification.','Falta verificar la compatibilidad del motor para esta versión.'));
  if(!kind&&fixed&&capacity){
   if(memory&&memory.budgetGiB>capacity)exclude(L('برآورد حافظه از ظرفیت آزاد دستگاه موجود بیشتر است.','Estimated memory exceeds the available device capacity.','La memoria estimada supera la capacidad libre del equipo.'),'hardware','vram','ram','upgrade','capex','concurrency');
   else if(weightGiB&&weightGiB>capacity)exclude(L('حتی فایل وزنِ بررسی‌شده در حافظهٔ آزاد یک دستگاه جا نمی‌گیرد.','Even the reviewed weight file exceeds one device’s free memory.','Incluso los pesos revisados superan la memoria libre de un equipo.'),'hardware','vram','ram','upgrade');
   else if(!memory)conditions.push(memoryStatus==='outside-calculator'?L('طول متن یا تعداد درخواست‌ها بیش از محدودهٔ این محاسبه‌گر است؛ حافظهٔ لازم را باید جدا بررسی کرد.','Load is outside the memory calculator; fit is unverified.','La carga supera el calculador; no se ha verificado que quepa.'):L('حجم فایل مدل مشخص است؛ حافظهٔ لازم برای پاسخ‌دادن به درخواست‌های شما هنوز محاسبه نشده است.','Full execution memory for this load has not been calculated.','No se ha calculado toda la memoria de esta carga.'));
  }
  if(a.format==='scan'&&!model.inputModalities.includes('image')&&!kind)conditions.push(L('این نامزد متن خروجی OCR را می‌خواند؛ خود تصویر به آن داده نمی‌شود.','This candidate consumes OCR text, not the scanned image.','Este candidato recibe texto de OCR, no la imagen escaneada.'));
  if(model.releaseStatus==='announced')conditions.push(L('دسترسی واقعی به نسخهٔ اعلام‌شده باید تأیید شود.','Availability of this announced revision needs confirmation.','Debe confirmarse la disponibilidad de esta versión anunciada.'));
  // Score evidence coverage and documented suitability, never compare unrelated benchmark numbers.
  let score=(model.applications.includes(application)?20:0)+Math.min(uses.length,2)*3+(uses.some(u=>kind||u.role===(a.task==='operations'?'tool-use':a.task==='coding'?'coding':a.task==='extraction'?'structured-output':'text-generation')||u.role==='grounded-generation')?8:0);
  score+=taskEvidence.length?8:0;
  const specializedEvidence=repository.publishedEvaluations.filter(e=>e.modelVersionId===model.id&&(a.writingTask==='translation'?/flores|translation/i.test(e.benchmark):a.writingTask==='summary'&&a.inputSize==='long'?/longbench|ruler/i.test(e.benchmark):['writing','rewriting'].includes(a.writingTask)?/ifeval/i.test(e.benchmark):false));
  if(specializedEvidence.length)score+=8;
  score+=repository.applicationAssessments.some(x=>x.modelVersionId===model.id&&x.applicationId===application&&x.primaryPurpose)?5:0;
  score+=languageEvidence.reduce((sum,v)=>sum+(v==='independently-evaluated'?8:v==='published-result'?5:v==='publisher-claimed'?2:0),0);
  score+=artifact?5:artifactSpec?3:0;score+=runtime?4:0;score+=memory||execution.professional&&runtime?.engine==='vLLM'?6:0;
  if(a.fullResponse&&Number(a.fullResponse)<=10&&model.thinkingMode==='thinking-only')score-=8;
  if(a.inputSize==='long'&&model.declaredContext.state==='known')score+=model.declaredContext.value>=65536?4:0;
  if(a.format==='scan'&&model.inputModalities.includes('image'))score+=2;
  if(!execution.professional&&(a.owner==='none'||a.owner==='new'))score+=profile?.runGuides.some(g=>['Ollama','llama.cpp','LM Studio'].includes(g.engine))?3:0;
  score-=Math.min(conditions.length,3)*2;
  const evidenceIds=[...new Set([...model.evidenceIds,...uses.flatMap(u=>u.evidenceIds),...taskEvidence.slice(0,2).flatMap(e=>e.evidenceIds),...specializedEvidence.flatMap(e=>e.evidenceIds),...(artifact?.evidenceIds??[]),...(runtime?.evidenceIds??[]),...(specialization?.evidenceIds??[])])];
  const context=model.declaredContext.state==='known'?n.format(model.declaredContext.value):'';
  const details=[weightGiB?L(`فایل مدل: ⁦${n.format(weightGiB)} GiB ${artifact?.format??artifactSpec?.format??''}⁩`,`${n.format(weightGiB)} GiB ${artifact?.format??artifactSpec?.format??''} weights`,`${n.format(weightGiB)} GiB de pesos ${artifact?.format??artifactSpec?.format??''}`):'',context?L(`ظرفیت ورودی و پاسخ، در مجموع ${context} توکن`,`native context ${context} tokens`,`contexto nativo de ${context} tokens`):'',isLocal(a)&&runtime?.engine?L(`اجرا با ⁦${runtime.engine}⁩`,`Run with ${runtime.engine}`,`Ejecutar con ${runtime.engine}`):''].filter(Boolean);

  const reason=details.join(locale==='fa'?'؛ ':'; ')+'.';
  const limit=conditions[0]??(kind?L('با چند سؤال واقعی بررسی کنید که سند درست در کجای فهرست نتایج قرار می‌گیرد.','Compare correct-document ranking against lexical search on reference queries.','Compare la posición del documento correcto con búsqueda léxica en consultas de referencia.'):memory?L(`با طول متن و تعداد درخواست شما، حدود ${n.format(memory.budgetGiB)} GiB حافظه لازم است.`,`Estimated memory ${n.format(memory.budgetGiB)} GiB; this is not a speed estimate.`,`Memoria estimada ${n.format(memory.budgetGiB)} GiB; no estima velocidad.`):'');
  const preferred=!kind&&model.id==='model:coherelabs-aya-expanse-8b'&&persianStartingWork(a);
  const startingPreference=preferred?(a.task==='documents'
   ?L('برای پاسخ‌گویی فارسی از روی اسناد، مقایسه را با Aya Expanse 8B شروع کنید. در هر پرسش، بخش‌های مرتبط سند را همراه سؤال به مدل بدهید.','For Persian document Q&A, start with Aya Expanse 8B. Supply the relevant passages with each question.','Para responder en persa sobre documentos, empiece con Aya Expanse 8B. Incluya los fragmentos pertinentes con cada pregunta.')
   :L('برای این کار ساده با متن کوتاه و ورودی و خروجی فارسی، مقایسه را با Aya Expanse 8B شروع کنید.','For this simple task with short Persian input and output, start the comparison with Aya Expanse 8B.','Para esta tarea sencilla con entrada y salida breves en persa, empiece la comparación con Aya Expanse 8B.')):undefined;
  const provisionalDocumentContext=preferred&&a.task==='documents'&&(!input||!output);
  const contextCondition=provisionalDocumentContext?L('طول متن هنوز مشخص نیست؛ مجموع سؤال، بخش‌های سند و پاسخ باید در ظرفیت ۸٬۱۹۲ توکنی این نسخه جا بگیرد.','Text length is not fully specified; the question, document passages and answer together must fit this revision’s 8,192-token context.','La longitud no está totalmente definida; pregunta, fragmentos y respuesta deben caber juntos en los 8.192 tokens de esta versión.') :'';
  if(contextCondition)conditions.push(contextCondition);
  if(specialty)ids.push('writingTask','codingMode','codeScope','codeLanguages');
  if(startingPreference)ids.push('writingTask','inputSize','inputTokens','maxTokens','outputTokens','format','sources','output','risk');
  return {model,specialty,specialtyReason,startingPreference,runtimeReason,runtimeUrl:runtime?.href,artifactUrl:artifact?.filesUrl,status:reasons.length?'excluded':conditions.length?'conditional':'eligible',reasons:reasons.length?reasons:conditions,answerIds:[...new Set(ids)],evidenceIds,score,language,license,memory,memoryStatus,source:model.aliases?.some(x=>/^[^/]+\/[^/]+$/.test(x))&&/^[a-f0-9]{40}$/.test(model.version)?`https://huggingface.co/${model.aliases.find(x=>/^[^/]+\/[^/]+$/.test(x))}/blob/${model.version}/README.md`:profile?.officialUrl??repository.evidence.find(e=>model.evidenceIds.includes(e.id))?.url??'',role:kind??application,reason,limit:[limit,contextCondition].filter(Boolean).join(' '),weightGiB,format:artifact?.precision??artifactSpec?.weightPrecision,runtime:runtime?.engine} satisfies CandidateReview;
 });
}
export function selectWizardCandidates(reviews:CandidateReview[],locale:LlmLocale):CandidateReview[]{
 const L=(fa:string,en:string,es:string)=>localized([fa,en,es],locale),n=new Intl.NumberFormat(locale==='fa'?'fa-IR':locale,{maximumFractionDigits:1});
 const eligible=reviews.filter(c=>c.status!=='excluded').sort((a,b)=>b.score-a.score||a.model.id.localeCompare(b.model.id));
 if(!eligible.length)return [];
 const specialists=eligible.filter(c=>c.specialty);
 const pool=specialists.length?specialists:eligible;
 const best=pool[0].score;
 // Cost is a tie-break among reasonably supported candidates, not a claim that the smallest model is best.
 const supported=pool.filter(c=>c.score>=best-3);
 const start=(!specialists.length?eligible.find(c=>c.startingPreference):undefined)??[...supported].sort((a,b)=>(a.memory?.budgetGiB??a.weightGiB??Infinity)-(b.memory?.budgetGiB??b.weightGiB??Infinity)||b.score-a.score||a.model.id.localeCompare(b.model.id))[0];
 const selected:CandidateReview[]=[{...start,rankRole:'start',difference:start.specialtyReason??start.startingPreference??L('در میان مدل‌هایی که برای این کار بررسی کرده‌ایم و اطلاعات مشابهی از آن‌ها داریم، این گزینه حافظهٔ کمتری می‌خواهد. مقایسه را از آن شروع کنید.','Lowest reviewed memory among similarly supported candidates; a deployment-cost baseline.','Menor memoria revisada entre candidatos con respaldo similar; base del coste de ejecución.')}];
 const quality=specialists.find(c=>c.model.id!==start.model.id)??eligible.find(c=>c.model.id!==start.model.id&&(c.score>start.score||c.language!==start.language||c.model.declaredContext.state==='known'&&start.model.declaredContext.state==='known'&&c.model.declaredContext.value>start.model.declaredContext.value));
 if(quality)selected.push({...quality,rankRole:'quality',difference:L('این مدل را با همان نمونه‌ها امتحان کنید و ببینید نسبت به گزینهٔ اول، خطای کمتری دارد یا متن‌های بلندتری را بهتر پاسخ می‌دهد.','Different evidence, language or context coverage; compare errors on the same task against the baseline.','Distinta cobertura de pruebas, idioma o contexto; compare los errores de la misma tarea con la base.')});
 const alternative=(specialists.length?eligible.find(c=>!c.specialty&&!selected.some(s=>s.model.id===c.model.id)):undefined)??eligible.find(c=>!selected.some(s=>s.model.id===c.model.id)&&c.score>=best-10&&(c.runtime!==start.runtime||c.model.familyId!==start.model.familyId||c.model.architecture!==start.model.architecture));
 if(alternative)selected.push({...alternative,rankRole:'alternative',difference:L('این گزینه از خانواده یا نرم‌افزار دیگری استفاده می‌کند؛ آن را با همان نمونه‌ها کنار گزینهٔ اول بسنجید.','A different family, architecture or runtime; compare dependence on a single execution path.','Otra familia, arquitectura o motor; compare la dependencia de una sola vía de ejecución.')});
 return selected.map((c,i)=>({...c,difference:i===0?c.difference:c.specialtyReason??(specialists.length&&!c.specialty?L('مدل عمومی برای مقایسه؛ با همان نمونه‌ها ببینید مدل تخصصی چه تفاوتی در نتیجه ایجاد می‌کند.','General-purpose baseline: compare the same examples against the specialist.','Modelo general de referencia: compare los mismos ejemplos con el especializado.'):[c.model.familyId!==start.model.familyId?L(`مدلی از ⁦${c.model.publisher}⁩ برای مقایسه با گزینهٔ اول`,`${c.model.publisher} family versus ${start.model.publisher}`,`Familia ${c.model.publisher} frente a ${start.model.publisher}`):'',c.weightGiB&&start.weightGiB?L(`حجم فایل ${n.format(c.weightGiB)} GiB است؛ گزینهٔ اول ${n.format(start.weightGiB)} GiB`,`${n.format(c.weightGiB)} versus ${n.format(start.weightGiB)} GiB of weights`,`${n.format(c.weightGiB)} frente a ${n.format(start.weightGiB)} GiB de pesos`):'',c.runtime!==start.runtime&&c.runtime?c.runtime:''].filter(Boolean).join(' · ')||c.difference)}));
}
