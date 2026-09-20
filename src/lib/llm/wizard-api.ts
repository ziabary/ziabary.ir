import apiModels from '../../../data/llm/api-models.json';
import type { LlmLocale } from './i18n/runtime';
import {hasTranslationPair,localized,positive,wizardLanguages,type WizardAnswers} from './wizard-core';
export function wizardApiCandidates(a:WizardAnswers,locale:LlmLocale){
 if(!['api','compare'].includes(a.deployment)||a.policy!=='public'||a.serviceAccess==='limited'||a.apiService==='other')return [];
 const translation=a.task==='writing'&&a.writingTask==='translation',languages=[...wizardLanguages(a,'source'),...wizardLanguages(a,'output')];
 const L=(fa:string,en:string,es:string)=>localized([fa,en,es],locale);
 return apiModels.filter(model=>{
  if(translation!==model.tasks.includes('translation'))return false;
  if(a.task==='coding'&&!model.tasks.includes('coding')||a.task==='operations'&&!model.tasks.includes('tools'))return false;
  if(a.format==='media'&&a.mediaType==='image'&&!model.input.includes('image'))return false;
  if(translation&&languages.some(l=>!(model.languages as string[]).includes(l)))return false;
  if(a.apiRegion&&a.apiRegion!=='unknown'&&!model.regions.includes(a.apiRegion))return false;
  if(model.contextTokens&&(Math.max(positive(a.maxTokens)??0,positive(a.inputTokens)??0)+(positive(a.outputTokens)??0))>model.contextTokens)return false;
  if(model.inputLimitTokens&&Math.max(positive(a.maxTokens)??0,positive(a.inputTokens)??0)>model.inputLimitTokens)return false;
  return true;
 }).slice(0,3).map(model=>{
  const accessConfirmed=a.serviceAccess==='confirmed'&&a.apiService==='qwen'&&!!a.apiRegion&&model.regions.includes(a.apiRegion);
  const languageKnown=translation?hasTranslationPair(a):languages.length>0&&languages.every(l=>(model.languages as string[]).includes(l));
  return {...model,status:accessConfirmed&&languageKnown?'supported' as const:'conditional' as const,accessConfirmed,
   reason:translation?L('خدمت مخصوص ترجمه؛ زبان مبدأ و مقصد در translation_options فرستاده می‌شوند. هر درخواست یک پیام متنی دارد.','Translation service: send source and target in translation_options and one user message per request.','Servicio de traducción: envíe origen y destino en translation_options y un mensaje de usuario por solicitud.'):L('خدمت مدل عمومی برای مقایسه روی نمونه‌های همین کار؛ نسخهٔ سرویس و نتیجهٔ فراخوانی را ثبت کنید.','General model service: compare on the same task examples and record the service revision and responses.','Servicio general: compare con los mismos ejemplos y registre versión y respuestas.'),
   limit:!accessConfirmed?L('دسترسی به همین سرویس در منطقهٔ انتخابی هنوز تأیید نشده است؛ این گزینه فعلاً برای بررسی است.','Access to this exact service and region is unconfirmed; this is a provisional candidate.','El acceso a este servicio y región no está confirmado; es un candidato provisional.'):!languageKnown?L('دسترسی سرویس مشخص است؛ پشتیبانی و کیفیت زبان‌های انتخابی هنوز باید بررسی شود.','Service access is identified; selected-language support and quality still need verification.','El acceso está identificado; falta verificar soporte y calidad de los idiomas.'):translation?L('کیفیت این جفت زبان را با متن خودتان بسنجید؛ سقف ورودی هر درخواست ۸٬۱۹۲ توکن است.','Test this language pair on your texts; the input limit is 8,192 tokens per request.','Pruebe el par con sus textos; el límite de entrada es 8.192 tokens por solicitud.'):L('سقف مصرف حساب و زمان پاسخ زیر بار را در آزمایش بررسی کنید.','Check account quotas and response latency under load.','Compruebe cuotas y latencia bajo carga.')};
 });
}
