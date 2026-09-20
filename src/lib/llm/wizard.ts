import type { LlmGuideRepository } from './schema';
import type { LlmLocale } from './i18n/runtime';
import { cleanWizard,isLocal,localized,wizardArticles,WIZARD_VERSION,positive,type WizardAnswers,type MemoryEstimator,type AnswerStatus } from './wizard-core';
import { assessWizardCatalog,selectWizardCandidates,professionalServing,requestedSpecialty } from './wizard-candidates';
import { decideWizard,type WizardDecision } from './wizard-decisions';
export * from './wizard-core';
export { assessWizardCatalog,workloadLanguages } from './wizard-candidates';
export { decideWizard } from './wizard-decisions';
export const QUICK_QUESTIONS=['task','writingTask','sourceLanguage','outputLanguage','sources','inputSize','mode','policy','deployment','hardware'];
export function wizardCandidates(repository:LlmGuideRepository,raw:WizardAnswers,locale:LlmLocale,estimate?:MemoryEstimator){return raw.task&&raw.task!=='unknown'?selectWizardCandidates(assessWizardCatalog(repository,raw,locale,estimate),locale):[];}
export function buildWizardResult(repository:LlmGuideRepository,raw:WizardAnswers,locale:LlmLocale,estimate?:MemoryEstimator,statuses:Record<string,AnswerStatus>={}){
 const a=cleanWizard(raw,locale),L=(fa:string,en:string,es:string)=>localized([fa,en,es],locale);
 const plan=decideWizard(a,locale,statuses),reviews=assessWizardCatalog(repository,a,locale,estimate);
 const discovery=!a.task||a.task==='unknown',candidates=discovery?[]:selectWizardCandidates(reviews,locale);
 const specialists=discovery||!plan.retrieval?[]:(['embedding',...(a.failure==='ranking'?['reranker']:[])] as ('embedding'|'reranker')[]).flatMap(kind=>selectWizardCandidates(assessWizardCatalog(repository,a,locale,undefined,kind),locale).slice(0,1));
 const decisions:WizardDecision[]=[...plan.decisions,...candidates.map(c=>({id:c.model.id,area:'model' as const,conclusion:c.reason,because:[c.difference??'',c.runtimeReason??'',...c.reasons].filter(Boolean),answerIds:c.answerIds,evidenceIds:c.evidenceIds,status:c.status==='conditional'?'conditional' as const:'supported' as const,assumptions:[]}))];
 if(professionalServing(a)&&candidates.some(c=>c.runtime==='vLLM'))decisions.push({
  id:'serving-runtime',area:'deployment',status:'conditional',
  conclusion:L('برای سرویس‌دهی روی GPU، پیشنهاد اول vLLM است. این نرم‌افزار درخواست‌ها را به‌صورت گروهی و پیوسته پردازش می‌کند و برای پاسخ‌گویی به چند کاربر مناسب است. فایل مدل و راهنمای اجرای هر گزینه در بخش تیم فنی آمده است.','For GPU serving, prefer vLLM: continuous batching suits shared workloads. The technical section links each candidate’s selected weight package and runtime guide.','Para servir en GPU, priorice vLLM: los lotes continuos se adaptan al uso compartido. La sección técnica enlaza los pesos y la guía de ejecución elegidos para cada modelo.'),
  because:[],assumptions:[],answerIds:['phase','audience','users','concurrency','hardware','deployment','owner'],evidenceIds:['https://docs.vllm.ai/en/stable/']
 });
 const target=requestedSpecialty(a);
 if(target&&!candidates.some(c=>c.specialty)){
  const translationNeedsPair=target==='translation'&&(!['fa','en','es'].includes(a.sourceLanguage)||!['fa','en','es'].includes(a.outputLanguage)||a.sourceLanguage===a.outputLanguage);
  decisions.push({id:'specialist-fallback',area:'solution',status:translationNeedsPair?'needs-input':'conditional',answerIds:['writingTask','codingMode','sourceLanguage','outputLanguage','hardware','vram','ram','maxTokens'],evidenceIds:[],because:[],assumptions:[],
   conclusion:translationNeedsPair?L('زبان مبدأ و مقصد ترجمه را مشخص کنید. اگر هر دو یک زبان‌اند و منظورتان بازنویسی است، گزینهٔ بازنویسی را انتخاب کنید.','Specify distinct translation source and target languages. If you mean rewriting in the same language, select rewriting.','Indique los idiomas de origen y destino. Si quiere reformular en el mismo idioma, elija reescritura.')
    :L('با محدودیت‌هایی که وارد کرده‌اید، از میان مدل‌های تخصصی بررسی‌شده گزینهٔ مناسبی پیدا نشد. مدل‌های عمومی زیر را برای مقایسه آورده‌ایم؛ محدودیت حافظه، طول متن و شرایط استفاده را در مشخصاتشان ببینید.','No reviewed specialist meets the supplied constraints. The general-purpose models below are comparison candidates; check memory, context and use conditions.','Ningún especialista revisado cumple las restricciones. Los modelos generales son candidatos de comparación; revise memoria, contexto y condiciones de uso.')
  });
 }
 const byArea=(area:WizardDecision['area'])=>decisions.filter(d=>d.area===area).map(d=>[d.conclusion,...d.assumptions].join(' '));
 // Hypothetical comparisons are separate from the user's input and never certify fit.
 const memoryScenarios=estimate&&isLocal(a)&&(!a.inputTokens||a.inputTokens==='unknown')&&(!a.maxTokens||a.maxTokens==='unknown')&&['cpu','gpu'].includes(a.hardware)&&(!positive(a.concurrency)||Number(a.concurrency)<=128)?candidates.filter(c=>['llama.cpp','Ollama'].includes(c.runtime??'')).flatMap(c=>[4096,16384].flatMap(context=>{
  const assumed={...a,inputTokens:String(context),maxTokens:String(context),outputTokens:'512',concurrency:['active','machines'].includes(a.loadDefinition)&&a.concurrency&&a.concurrency!=='unknown'?a.concurrency:'1',loadDefinition:'active',mode:'interactive'};
  const memory=estimate(c.model,assumed);return memory?[{modelId:c.model.id,memory,basis:'estimate' as const,assumptions:L(`برای مقایسه، ورودی ${new Intl.NumberFormat('fa-IR').format(context)} و پاسخ ۵۱۲ توکنی را با ${new Intl.NumberFormat('fa-IR').format(Number(assumed.concurrency))} درخواست هم‌زمان فرض کرده‌ایم.`,`Comparison assumption: ${context} input, 512 output tokens, ${assumed.concurrency} active requests; not user answers.`,`Supuesto: ${context} tokens de entrada, 512 de salida, ${assumed.concurrency} solicitudes activas; no son respuestas del usuario.`)}]:[];
 })):[];
 const catalogReviews=reviews.map(c=>({...c,selected:candidates.some(s=>s.model.id===c.model.id),selectionReason:c.status==='excluded'?c.reasons.join(' '):candidates.some(s=>s.model.id===c.model.id)?candidates.find(s=>s.model.id===c.model.id)!.difference??c.reason:L('سه گزینهٔ بالا با توجه به کاربرد، زبان، حافظه و نرم‌افزار اجرا برای شروع انتخاب شده‌اند. این مدل هم قابل بررسی است؛ انتخاب‌نشدن آن به معنی کیفیت پایین‌تر نیست.','Not shortlisted after comparing task/language evidence coverage, package size and runtime diversity; this is not a quality verdict.','Fuera de la lista tras comparar pruebas de tarea/idioma, tamaño y diversidad de ejecución; no es un juicio de calidad.')}));
 return {...plan,decisions,reviews:catalogReviews,memoryScenarios,version:WIZARD_VERSION,catalogReviewed:'2026-09-20 — Qwen3.6 / Qwen3.7',answers:a,candidates,specialists,unknowns:plan.followups.map(d=>d.conclusion),local:isLocal(a),deployment:byArea('deployment').join(' '),production:byArea('operations').join(' '),costPlan:byArea('cost').join(' '),testPlan:byArea('acceptance'),rationale:byArea('solution').join(' '),articles:wizardArticles(a),discovery};
}
