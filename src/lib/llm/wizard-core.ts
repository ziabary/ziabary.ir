import type { createLlmResearch } from './research';
import questions from '../../../data/llm/wizard-questions.json';
import type { ApplicationId, LlmGuideRepository, ModelVersion } from './schema';
import type { LlmLocale } from './i18n/runtime';
import { modelLanguageEvidence } from './evaluation';
import { llmSelectionHref } from './selection';
export const WIZARD_VERSION='2026-09-20.1';
export const wizardQuestions=questions;
export type WizardAnswers=Record<string,string>;
export type AnswerStatus='declared'|'estimate'|'measured'|'unknown';
export const blankWizard=():WizardAnswers=>({});
export const localized=(text:readonly string[],locale:LlmLocale)=>text[{fa:0,en:1,es:2}[locale]]??text[1];
export const hasSource=(a:WizardAnswers,source:string)=>(a.sources??'').split('|').includes(source);
export const positive=(value:string|undefined)=>value&&/^\d+(\.\d+)?$/.test(value)&&Number(value)>0?Number(value):undefined;
const countFields=new Set(['archiveSize','inputTokens','maxTokens','outputTokens','users','concurrency','requests','batchCount','gpuCount','months','workdays','averageInputTokens','averageOutputTokens']);
export function numericRules(id:string){return {integer:countFields.has(id),zero:['capex','monthly'].includes(id),max:id==='hours'?24:id==='workdays'?31:99999999999999};}
export function normalizeWizardNumber(value:string){return value.trim().replace(/[۰-۹]/g,d=>String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d))).replace(/[٠-٩]/g,d=>String('٠١٢٣٤٥٦٧٨٩'.indexOf(d))).replace(/٫/g,'.');}
export function wizardNumberError(id:string,value:string,locale:LlmLocale):string {
 if(!value||value==='unknown')return '';
 const v=normalizeWizardNumber(value),rules=numericRules(id),L=(fa:string,en:string,es:string)=>localized([fa,en,es],locale);
 if(!/^-?\d+(\.\d+)?$/.test(v))return L('فقط عدد وارد کنید؛ بدون حروف یا جداکنندهٔ هزارگان.','Enter a number without letters or thousands separators.','Introduzca un número sin letras ni separadores de miles.');
 const number=Number(v);
 if(number<0||!rules.zero&&number===0)return rules.zero?L('این مبلغ نمی‌تواند منفی باشد.','The amount cannot be negative.','El importe no puede ser negativo.'):L('عدد باید بیشتر از صفر باشد.','Enter a number greater than zero.','Introduzca un número mayor que cero.');
 if(!Number.isFinite(number)||number>rules.max)return id==='hours'?L('ساعت استفاده در روز نمی‌تواند بیشتر از ۲۴ باشد.','Daily usage cannot exceed 24 hours.','El uso diario no puede superar las 24 horas.'):L('عدد بیش از حد بزرگ است؛ عددی با حداکثر ۱۴ رقم وارد کنید.','The number is too large; enter at most 14 digits.','El número es demasiado grande; introduzca como máximo 14 dígitos.');
 if(rules.integer&&!Number.isInteger(number))return L('تعداد را با عدد صحیح وارد کنید.','Enter a whole number for this count.','Introduzca un número entero para esta cantidad.');
 if((v.split('.')[1]?.length??0)>3)return L('حداکثر سه رقم اعشار وارد کنید.','Use at most three decimal places.','Use como máximo tres decimales.');
 return '';
}
export function wizardAnswerErrors(a:WizardAnswers,locale:LlmLocale):Record<string,string>{
 const errors:Record<string,string>={};
 for(const q of questions)if(q.kind==='number'&&visibleQuestion(q,a,locale)){const error=wizardNumberError(q.id,a[q.id]??'',locale);if(error)errors[q.id]=error;}
 if(positive(a.maxTokens)&&positive(a.inputTokens)&&Number(a.maxTokens)<Number(a.inputTokens))errors.maxTokens=localized(['بیشترین ورودی نمی‌تواند از ورودی معمول کمتر باشد.','Maximum input cannot be smaller than typical input.','La entrada máxima no puede ser menor que la habitual.'],locale);
 if(positive(a.fullResponse)&&positive(a.firstResponse)&&Number(a.fullResponse)<Number(a.firstResponse))errors.fullResponse=localized(['زمان پاسخ کامل نمی‌تواند از زمان اولین بخش پاسخ کمتر باشد.','The full answer cannot arrive before its first part.','La respuesta completa no puede llegar antes de su primera parte.'],locale);
 return errors;
}
export function wizardOptions(q:typeof questions[number],locale:LlmLocale){return q.options.filter(o=>q.id!=='currency'||locale==='fa'||['usd','eur'].includes(o.value));}
export const isLocal=(a:WizardAnswers)=>['self','managed','compare'].includes(a.deployment);
export const usesTools=(a:WizardAnswers)=>a.task==='operations'||hasSource(a,'live')||a.task==='coding'&&a.codingMode==='agent';
export function visibleQuestion(q:typeof questions[number],a:WizardAnswers,locale:LlmLocale) {
 if(q.id==='apiCostExample'&&locale==='fa')return false;
 const archive=hasSource(a,'archive'),interactive=['interactive','both'].includes(a.mode);
 switch(q.when){
  case 'files':return hasSource(a,'provided')||archive;
  case 'archive':return archive;
  case 'existing':return archive&&a.existing==='yes';
  case 'coding':return a.task==='coding';
  case 'writing':return a.task==='writing';
  case 'loadDefinition':return interactive&&!!positive(a.concurrency);
  case 'multilingual':return ['mixed','multi','other'].includes(a.sourceLanguage)||['mixed','multi','other'].includes(a.outputLanguage);
  case 'usageCost':return !!positive(a.requests);
  case 'acquisition':return isLocal(a)&&a.hardware==='none';
  case 'tools':return usesTools(a);
  case 'noTools':return !usesTools(a);
  case 'humans':return a.audience!=='system';
  case 'interactive':return interactive;
  case 'unknownConcurrency':return interactive&&a.concurrency==='unknown';
  case 'batch':return ['batch','both'].includes(a.mode);
  case 'local':return isLocal(a);
  case 'equipment':return isLocal(a)&&['cpu','gpu'].includes(a.hardware);
  case 'gpu':return isLocal(a)&&a.hardware==='gpu';
  case 'external':return a.deployment==='api'||a.deployment==='compare'&&a.policy==='public';
  case 'license':return locale!=='fa';
  case 'toman':return locale==='fa'&&a.currency==='million-toman';
  case 'production':return a.phase==='production';
  default:return true;
 }
}
export function cleanWizard(raw:unknown,locale:LlmLocale):WizardAnswers {
 if(!raw||typeof raw!=='object'||Array.isArray(raw))return {};
 const input={...raw} as Record<string,unknown>, a:WizardAnswers={};
 // Old saved amounts were in individual toman. Never reinterpret them as millions.
 if(input.currency==='toman'){
  input.currency='million-toman';
  for(const id of ['capex','monthly'])if(typeof input[id]==='string'&&input[id]!=='unknown'){
   const v=normalizeWizardNumber(input[id] as string);
   input[id]=!wizardNumberError(id,v,locale)?String(Number(v)/1e6):'';
  }
 }
 if(locale!=='fa'&&input.currency==='million-toman')for(const id of ['currency','capex','monthly','usdRate'])delete input[id];
 for(const q of questions){
  const v=input[q.id];if(typeof v!=='string')continue;
  if(v==='unknown'){a[q.id]=v;continue;}
  if(q.kind==='number'){
   const normal=normalizeWizardNumber(v);
   if(normal&&!wizardNumberError(q.id,v,locale))a[q.id]=String(Number(normal));
  } else if(q.kind==='text'){if(v.trim())a[q.id]=v.trim().slice(0,160);}
  else {const selected=[...new Set(v.split('|').filter(x=>wizardOptions(q,locale).some(o=>o.value===x)))].slice(0,q.kind==='multi'?(q.id==='success'?3:5):1);if(selected.length)a[q.id]=selected.join('|');}
 }
 if(a.policy!=='public'&&a.deployment==='api')delete a.deployment;
 // Iterate because removing a parent can also hide a grandchild.
 for(let i=0;i<3;i++)for(const q of questions)if(!visibleQuestion(q,a,locale))delete a[q.id];
 for(const id of Object.keys(wizardAnswerErrors(a,locale)))delete a[id];
 return a;
}
export function changeWizard(a:WizardAnswers,field:string,value:string,locale:LlmLocale='fa') {
 const next={...a,[field]:value};
 if(field==='currency'&&value!==a.currency)for(const id of ['capex','monthly','usdRate'])delete next[id];
 // Conditional visibility removes only answers that no longer apply. Valid shared answers survive task changes.
 return cleanWizard(next,locale);
}
export const wizardComplete=(raw:WizardAnswers,locale:LlmLocale='fa')=>{const a=cleanWizard(raw,locale);return !!a.task&&Object.keys(wizardAnswerErrors(raw,locale)).length===0;};
export function wizardLicense(model:ModelVersion,locale:LlmLocale){
 if(locale==='fa')return 'ignored';const use=model.license.commercialUse;
 return use.state==='known'&&use.value==='prohibited'?'noncommercial':use.state!=='known'||use.value==='restricted'?'conditions':'permissive';
}
export function wizardApplication(a:WizardAnswers):ApplicationId {
 if(a.task==='coding')return a.codingMode==='agent'?'agents-tools':'coding-assistant';
 if(a.task==='operations')return 'agents-tools';
 if(['media'].includes(a.format))return 'document-vision';
 if(a.task==='extraction')return 'structured-extraction';
 if(a.task==='documents'||hasSource(a,'archive'))return 'enterprise-rag';
 return 'text-work';
}
export const articleTopics:Record<string,string>={size:'right-model-size-for-the-task',evaluation:'evaluating-language-models-for-persian',rag:'enterprise-rag-model-embedding-reranker',adaptation:'rag-cag-kag-fine-tuning-instruction-tuning',coding:'code-completion-assistant-and-agent',serving:'single-user-to-enterprise-llm-serving',cost:'true-llm-cost-buy-rent-or-api',latency:'gpu-inference-latency-throughput',privacy:'data-confidentiality-public-apis',software:'ollama-vllm-sglang-or-llama-cpp'};
export function wizardArticles(a:WizardAnswers){return [...new Set([a.task==='coding'?'coding':hasSource(a,'archive')?'rag':'size','evaluation',isLocal(a)?'software':'cost',a.mode==='batch'?'cost':'serving'])].map(x=>articleTopics[x]);}
export function wizardTableHref(current:URL,models:readonly string[]){
 const url=new URL(current);for(const key of [...url.searchParams.keys()])if(key.startsWith('s_')||key.startsWith('r_')||key.startsWith('w-')||['model','panel','preset','research-model','usage','task'].includes(key))url.searchParams.delete(key);
 return llmSelectionHref(url,{view:'model-catalog','s_model-catalog':JSON.stringify({ids:models,onlySelected:true})},'model-catalog');
}
export interface MemoryEstimate {budgetGiB:number;weightGiB:number;kvGiB:number;reserveGiB:number;artifactId:string;quantization:string;context:number;active:number;}
type ResearchApi=ReturnType<typeof createLlmResearch>;
export function wizardMemory(model:ModelVersion,a:WizardAnswers,artifacts:ResearchApi['research']['artifacts'],calculate:ResearchApi['calculateMemory']):MemoryEstimate|undefined {
 const input=Math.max(positive(a.maxTokens)??0,positive(a.inputTokens)??0)||undefined,output=positive(a.outputTokens),active=a.loadDefinition==='queued'?undefined:positive(a.concurrency);
 if(active&&active>1&&!['active','machines'].includes(a.loadDefinition))return;
 if(!input||!output||!active||!['interactive','both'].includes(a.mode)||!['cpu','gpu'].includes(a.hardware))return;
 const context=input+output;
 if(active>128||context>2**21)return;
 for(const artifact of artifacts.filter(x=>model.aliases?.includes(x.modelRepository)&&/Q4/i.test(x.quantization))){
  const plan=calculate(artifact,context,active,1,a.hardware==='cpu');
  if(plan)return {...plan,artifactId:artifact.id,quantization:artifact.quantization,context,active};
 }
}
export type MemoryEstimator=(model:ModelVersion,a:WizardAnswers)=>MemoryEstimate|undefined;
