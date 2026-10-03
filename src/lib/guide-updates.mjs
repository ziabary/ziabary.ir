/** @typedef {'fa'|'en'|'es'} UpdateLocale */
/** @typedef {'llm'|'gpu-selection'} UpdateGuide */
/** @typedef {{title:string, summary:string}} UpdateCopy */
/** @typedef {{id:string, guide:UpdateGuide, date:string, kind:'model'|'software'|'gpu'|'server', target:string, copy:Record<UpdateLocale,UpdateCopy>}} GuideUpdate */

// IDs identify editorial announcements, not builds or translations. Never reuse an ID.
// Dates record additions/changes to our dataset, not the product's release date.
/** @type {GuideUpdate[]} */
export const guideUpdates = [
  { id:'spark64', guide:'gpu-selection', date:'2026-10-03', kind:'gpu', target:'nvidia-dgx-spark-64gb', copy:{
    fa:{title:'DGX Spark 64GB به جدول اضافه شد',summary:'سامانهٔ GB10 با حافظهٔ یکپارچه؛ عرضهٔ برنامه‌ریزی‌شده از ۲۳ اکتبر و نیازمند بررسی SKU.'},
    en:{title:'DGX Spark 64GB added to the table',summary:'GB10 system with unified memory; scheduled from 23 October, with OEM SKU details to verify.'},
    es:{title:'DGX Spark 64GB añadido a la tabla',summary:'Sistema GB10 con memoria unificada; previsto desde el 23 de octubre, con SKU OEM por verificar.'}
  }},
  {"id": "embed5pair", "guide": "llm", "date": "2026-10-01", "kind": "model", "target": "model:cohere-embed-v5-pro", "copy": {"fa": {"title": "Embed 5؛ نمایه‌سازی Pro و جست‌وجوی Fast", "summary": "دو مدل چندوجهی با فضای مشترک؛ دسترسی تجاری، فارسی اعلامی و بدون وزن عمومی اعلام‌شده."}, "en": {"title": "Embed 5: Pro indexing and Fast queries", "summary": "Two multimodal models with a shared space; commercial access, declared Persian support and no announced public weights."}, "es": {"title": "Embed 5: indexación Pro y consultas Fast", "summary": "Dos modelos multimodales con espacio común; acceso comercial, persa declarado y sin pesos públicos anunciados."}}},
  {"id": "iq4nl310", "guide": "llm", "date": "2026-10-01", "kind": "software", "target": "llama.cpp", "copy": {"fa": {"title": "پیش‌انتشار؛ اصلاح ایمنی حافظه و صحت اجرای IQ4_NL", "summary": "b11310 · CUDA/HIP/MUSA؛ ردیف IQ4_NL با طول نامضرب QK_K"}, "en": {"title": "Prerelease; IQ4_NL memory safety and execution correctness", "summary": "b11310 · CUDA/HIP/MUSA; IQ4_NL rows not divisible by QK_K"}, "es": {"title": "Prelanzamiento; seguridad de memoria y ejecución de IQ4_NL", "summary": "b11310 · CUDA/HIP/MUSA; filas IQ4_NL no divisibles por QK_K"}}},
  {"id": "dflash307", "guide": "llm", "date": "2026-10-01", "kind": "software", "target": "llama.cpp", "copy": {"fa": {"title": "پیش‌انتشار؛ DFlash/DFlash2 در اجرای هم‌زمان", "summary": "b11307 · ترتیب layer input؛ KV streamهای جدا و tensor split"}, "en": {"title": "Prerelease; concurrent DFlash/DFlash2 execution", "summary": "b11307 · Layer-input order; separate KV streams and tensor split"}, "es": {"title": "Prelanzamiento; ejecución simultánea de DFlash/DFlash2", "summary": "b11307 · Orden de layer input; flujos KV separados y tensor split"}}},

  {"id": "glmflash79", "guide": "llm", "date": "2026-09-30", "kind": "software", "target": "llama.cpp", "copy": {"fa": {"title": "پشتیبانی آزمایشی GLM-5.3-Flash در llama.cpp", "summary": "یادداشت b11279 و اصلاح بعدی هم‌زمانی #29745؛ بدون تغییر GLM-5.3-BF16 یا پیشنهاد پیش‌فرض ویزارد."}, "en": {"title": "Experimental GLM-5.3-Flash support in llama.cpp", "summary": "b11279 note and subsequent race fix #29745; no change to GLM-5.3-BF16 or wizard defaults."}, "es": {"title": "Soporte experimental de GLM-5.3-Flash en llama.cpp", "summary": "Nota de b11279 y corrección posterior #29745; sin cambios en GLM-5.3-BF16 ni en las opciones predeterminadas."}}},
  {"id": "cpuf16fix", "guide": "llm", "date": "2026-09-30", "kind": "software", "target": "llama.cpp", "copy": {"fa": {"title": "اصلاح صحت محاسبهٔ CPU در llama.cpp", "summary": "b11262 پیش‌انتشار: انباشت FP32 در مسیر AVX512-FP16؛ خروجی buildهای قدیمی این مسیر نیازمند بازآزمایی است."}, "en": {"title": "llama.cpp CPU correctness fix", "summary": "Prerelease b11262 uses FP32 accumulation on AVX512-FP16; retest older-build output on this path."}, "es": {"title": "Corrección del cálculo CPU en llama.cpp", "summary": "b11262 preliminar acumula en FP32 en AVX512-FP16; repita las pruebas de versiones anteriores."}}},
  {"id": "sysone351", "guide": "llm", "date": "2026-09-30", "kind": "software", "target": "Ollama", "copy": {"fa": {"title": "شرط‌های SystemOne در Ollama روشن شد", "summary": "پیش‌انتشار v0.35.1-rc0 به قابلیت decision و artifact سازگار GGUF نیاز دارد؛ Safetensors به‌تنهایی کافی نیست."}, "en": {"title": "Ollama SystemOne conditions clarified", "summary": "Prerelease v0.35.1-rc0 requires decision capability and a supported GGUF artifact; Safetensors alone is insufficient."}, "es": {"title": "Condiciones de SystemOne en Ollama", "summary": "v0.35.1-rc0 preliminar requiere capacidad decision y un artefacto GGUF compatible; Safetensors no basta."}}},

  {"id": "glm53cyber", "guide": "llm", "date": "2026-09-30", "kind": "model", "target": "model:zai-org-glm-5-3-bf16", "copy": {"fa": {"title": "هشدار امنیتی GLM-5.3", "summary": "ملاحظات امنیتی شناسنامه و هشدار مشروط ویزارد بر پایهٔ ارزیابی‌های NIST و Anthropic اضافه شد."}, "en": {"title": "GLM-5.3 security advisory", "summary": "Added profile security guidance and a conditional wizard warning based on NIST and Anthropic evaluations."}, "es": {"title": "Aviso de seguridad de GLM-5.3", "summary": "Añadidas recomendaciones de seguridad y un aviso condicional basados en evaluaciones de NIST y Anthropic."}}},
  {"id": "llemb40", "guide": "llm", "date": "2026-09-29", "kind": "software", "target": "llama.cpp", "copy": {"fa": {"title": "embedding چندوجهی آزمایشی در llama.cpp", "summary": "مسیر b11240+ برای Qwen3-VL-Embedding-2B/8B و شرایط API ثبت شد؛ سرعت، حافظه و کیفیت فارسی تأیید نشده‌اند."}, "en": {"title": "Experimental multimodal embeddings in llama.cpp", "summary": "Added the b11240+ route for Qwen3-VL-Embedding-2B/8B and API conditions; speed, memory and Persian quality remain unverified."}, "es": {"title": "Embeddings multimodales experimentales en llama.cpp", "summary": "Ruta b11240+ para Qwen3-VL-Embedding-2B/8B y condiciones de API; velocidad, memoria y calidad en persa sin verificar."}}},
  {"id": "vkfix24", "guide": "llm", "date": "2026-09-28", "kind": "software", "target": "llama.cpp", "copy": {"fa": {"title": "هشدار صحت خروجی Vulkan در llama.cpp", "summary": "اصلاح آزمایشی b11224 برای viewهای strided؛ نتایج b11160 پیش از اتکا نیازمند بازآزمایی‌اند."}, "en": {"title": "Vulkan output correctness warning in llama.cpp", "summary": "Experimental b11224 fixes strided views; retest b11160 results before relying on them."}, "es": {"title": "Aviso de resultados incorrectos en Vulkan de llama.cpp", "summary": "b11224 experimental corrige vistas con stride; repita las pruebas de b11160 antes de confiar en sus resultados."}}},
  {"id": "llrank23", "guide": "llm", "date": "2026-09-28", "kind": "software", "target": "llama.cpp", "copy": {"fa": {"title": "رفع محدودیت batch بازرتبه‌بندهای علّی در llama.cpp", "summary": "یادداشت آزمایشی b11223 برای Qwen3 و Qwen3-VL؛ پشتیبانی کامل چندوجهی هنوز تأیید نشده است."}, "en": {"title": "Causal reranker batch limit lifted in llama.cpp", "summary": "Experimental b11223 note for Qwen3 and Qwen3-VL; full multimodal support remains unconfirmed."}, "es": {"title": "llama.cpp elimina el límite de lote en rerankers causales", "summary": "Nota experimental b11223 para Qwen3 y Qwen3-VL; soporte multimodal completo aún sin confirmar."}}},
  {"id": "dsparkvl", "guide": "llm", "date": "2026-09-26", "kind": "model", "target": "model:liquidai-lfm2-5-vl-3b-dspark", "copy": {"fa": {"title": "مدل بینایی LFM2.5 و مکمل وابستهٔ DSpark", "summary": "مکمل فقط با LFM2.5-VL-3B؛ مجوز مشروط و شتاب نسبی ناشر با شرایط آزمون ثبت شد."}, "en": {"title": "LFM2.5 vision model and dependent DSpark drafter", "summary": "Requires LFM2.5-VL-3B; conditional license and publisher relative speedup recorded with test conditions."}, "es": {"title": "Modelo visual LFM2.5 y complemento dependiente DSpark", "summary": "Requiere LFM2.5-VL-3B; licencia condicionada y aceleración relativa del editor con condiciones del ensayo."}}},
  {"id": "fp4b1182", "guide": "llm", "date": "2026-09-26", "kind": "software", "target": "llama.cpp", "copy": {"fa": {"title": "یادداشت پیش‌انتشار b11182 و دقت فعال‌سازی", "summary": "وزن FP4 الزاماً فعال‌سازی چهاربیتی نیست؛ شرایط CUDA/Blackwell جدا از نسخهٔ پایدار آمده است."}, "en": {"title": "b11182 prerelease activation-precision note", "summary": "FP4 weights do not imply four-bit activations; CUDA/Blackwell conditions are separate from stable capabilities."}, "es": {"title": "Nota de precisión de activaciones en b11182", "summary": "Pesos FP4 no implican activaciones de cuatro bits; condiciones CUDA/Blackwell separadas de las capacidades estables."}}},

  {"id": "runtime925", "guide": "llm", "date": "2026-09-25", "kind": "software", "target": "vLLM", "copy": {"fa": {"title": "یادداشت‌های امنیتی vLLM به‌روز شد", "summary": "نسخهٔ 0.30.0 و شرایط ارتقا؛ هشدارهای نسخهٔ تاریخی جدا ثبت شدند."}, "en": {"title": "vLLM security notes updated", "summary": "Version 0.30.0 and upgrade conditions; historical-release advisories remain separate."}, "es": {"title": "Actualizados los avisos de vLLM", "summary": "Versión 0.30.0 y condiciones de actualización; avisos históricos separados."}}},
  {"id": "rpc7vk", "guide": "llm", "date": "2026-09-25", "kind": "software", "target": "llama.cpp", "copy": {"fa": {"title": "llama.cpp 0.5.0 و سازگاری RPC", "summary": "پروتکل major 7؛ یادداشت Vulkan برای build آزمایشی b11160 جدا آمده است."}, "en": {"title": "llama.cpp 0.5.0 and RPC compatibility", "summary": "Protocol major 7; a separate note covers experimental Vulkan build b11160."}, "es": {"title": "llama.cpp 0.5.0 y compatibilidad RPC", "summary": "Protocolo major 7; nota separada para Vulkan experimental b11160."}}},
  {"id": "ollmlxrc", "guide": "llm", "date": "2026-09-25", "kind": "software", "target": "Ollama", "copy": {"fa": {"title": "یادداشت پیش‌انتشار Ollama با MLX", "summary": "v0.40.0-rc0 برای معماری‌های پشتیبانی‌شده روی Apple Silicon؛ انتخاب پایدار تغییر نکرده است."}, "en": {"title": "Ollama MLX prerelease note", "summary": "v0.40.0-rc0 for supported architectures on Apple Silicon; stable selection unchanged."}, "es": {"title": "Nota del prelanzamiento Ollama con MLX", "summary": "v0.40.0-rc0 para arquitecturas admitidas en Apple Silicon; selección estable sin cambios."}}},
  {"id": "smrubin72", "guide": "gpu-selection", "date": "2026-09-25", "kind": "server", "target": "supermicro-vera-rubin-nvl72", "copy": {"fa": {"title": "رک Supermicro Vera Rubin NVL72 اضافه شد", "summary": "آغاز ارسال سازنده؛ ۷۲ GPU یکپارچه با حافظه‌های GPU و CPU جداگانه."}, "en": {"title": "Supermicro Vera Rubin NVL72 rack added", "summary": "Manufacturer shipping; 72 integrated GPUs with GPU and CPU memory listed separately."}, "es": {"title": "Añadido el rack Supermicro Vera Rubin NVL72", "summary": "Envíos del fabricante; 72 GPU integradas y memorias GPU y CPU separadas."}}},

  { id:'mimo26p', guide:'llm', date:'2026-09-22', kind:'model', target:'model:mimo-v2-6-pro-rl', copy:{
    fa:{title:'MiMo-V2.6-Pro به جدول مدل‌ها اضافه شد',summary:'نسخهٔ RL با وزن‌های قابل دریافت، نتایج ارزیابی و راه‌های اجرا.'},
    en:{title:'MiMo-V2.6-Pro added to the model catalog',summary:'The RL checkpoint, downloadable weights, evaluation results and deployment options.'},
    es:{title:'MiMo-V2.6-Pro añadido al catálogo de modelos',summary:'La versión RL, pesos descargables, resultados de evaluación y opciones de ejecución.'}
  }},
  { id:'qimg21', guide:'llm', date:'2026-09-22', kind:'model', target:'model:qwen-image-2-1', copy:{
    fa:{title:'Qwen-Image-2.1 به جدول مدل‌ها اضافه شد',summary:'تولید و ویرایش تصویر؛ مولد ۷ میلیاردی در کنار رمزگذار ۸ میلیاردی.'},
    en:{title:'Qwen-Image-2.1 added to the model catalog',summary:'Image generation and editing: a 7B generator alongside an 8B encoder.'},
    es:{title:'Qwen-Image-2.1 añadido al catálogo de modelos',summary:'Generación y edición de imágenes: generador de 7B y codificador de 8B.'}
  }},
  { id:'sgl0520', guide:'llm', date:'2026-09-22', kind:'software', target:'SGLang', copy:{
    fa:{title:'شرایط نصب SGLang 0.5.20 به‌روز شد',summary:'توقف انتشار بسته‌های CUDA 12 و تغییر شرایط ذخیرهٔ پاسخ‌های API.'},
    en:{title:'SGLang 0.5.20 deployment notes updated',summary:'CUDA 12 packages discontinued; Responses API storage is now opt-in.'},
    es:{title:'Actualizadas las condiciones de SGLang 0.5.20',summary:'Fin de los paquetes CUDA 12 y almacenamiento de Responses API mediante activación explícita.'}
  }},
  { id:'crescent', guide:'gpu-selection', date:'2026-09-08', kind:'gpu', target:'intel-crescent-island', copy:{
    fa:{title:'Crescent Island اینتل به جدول اضافه شد',summary:'مشخصات اولیهٔ شتاب‌دهنده ثبت شده؛ هنوز در ردهٔ محصولات اعلام‌شده است.'},
    en:{title:'Intel Crescent Island added to the table',summary:'Preliminary specifications recorded; listed as an announced product.'},
    es:{title:'Intel Crescent Island añadido a la tabla',summary:'Especificaciones preliminares registradas; figura como producto anunciado.'}
  }},
  { id:'qctd75t', guide:'gpu-selection', date:'2026-09-08', kind:'server', target:'qct-d75t-7u', copy:{
    fa:{title:'مشخصات سرور QCT D75T-7U در جدول ثبت شد',summary:'سامانهٔ یکپارچه با هشت MI325X یا H200؛ همراه با شرایط برق و خنک‌کاری.'},
    en:{title:'QCT D75T-7U specifications added to the table',summary:'An integrated eight-MI325X or H200 system, including power and cooling requirements.'},
    es:{title:'Especificaciones del QCT D75T-7U añadidas a la tabla',summary:'Sistema integrado con ocho MI325X o H200, con requisitos de alimentación y refrigeración.'}
  }}
];

export const UPDATE_STORAGE_PREFIX = 'ziabary:guide-update:';
export const UPDATE_VISIBLE_MS = 2000;
export const UPDATE_WINDOW_DAYS = 7;
const sessionSeen = new Set();

/** One key per announcement avoids overwriting another tab's acknowledgements.
 * @param {() => Pick<Storage,'getItem'|'setItem'>} getStorage
 * @param {Set<string>} [memory]
 */
export function createUpdateHistory(getStorage, memory = sessionSeen) {
  return {
    /** @param {string} id */
    has(id) {
      if (memory.has(id)) return true;
      try { return getStorage().getItem(UPDATE_STORAGE_PREFIX + id) === '1'; }
      catch { return false; }
    },
    /** @param {string} id */
    mark(id) {
      memory.add(id);
      try { getStorage().setItem(UPDATE_STORAGE_PREFIX + id, '1'); }
      catch { /* Still remember within this visit when storage is blocked. */ }
    }
  };
}

/** @param {UpdateGuide} guide @param {string} today @param {(id:string)=>boolean} seen @param {GuideUpdate[]} [updates] */
export function unreadGuideUpdates(guide, today, seen, updates = guideUpdates) {
  const cutoff = new Date(`${today}T12:00:00Z`);
  cutoff.setUTCDate(cutoff.getUTCDate() - (UPDATE_WINDOW_DAYS - 1));
  return updates.filter(item => item.guide === guide && item.date <= today && item.date >= cutoff.toISOString().slice(0,10) && !seen(item.id))
    .sort((a,b) => b.date.localeCompare(a.date));
}

/** @param {GuideUpdate} item @param {UpdateLocale} locale */
export function guideUpdateHref(item, locale) {
  const path = `${locale === 'fa' ? '' : '/' + locale}/guides/${item.guide}/`;
  if (item.kind === 'gpu' || item.kind === 'server') return `${path}#${item.kind}-${item.target}`;
  const params = new URLSearchParams();
  if (item.kind === 'model') {
    params.set('view','model-catalog');
    params.set('s_model-catalog',JSON.stringify({ids:[item.target],onlySelected:true}));
    params.set('model',item.target);
    return `${path}?${params}#model-catalog`;
  }
  params.set('view','software-products');
  params.set('s_software-products',JSON.stringify({q:item.target}));
  return `${path}?${params}#serving-software`;
}

/** Mark only after continuous exposure in a foreground tab. Keep the row visible.
 * @param {HTMLElement} node @param {()=>void} mark
 */
export function observeUpdateRead(node, mark) {
  if (typeof IntersectionObserver === 'undefined') return {};
  let visible = false;
  /** @type {ReturnType<typeof setTimeout> | undefined} */
  let timer;
  const stopTimer = () => { clearTimeout(timer); timer = undefined; };
  const schedule = () => {
    stopTimer();
    if (visible && document.visibilityState === 'visible') timer = setTimeout(() => {
      mark(); cleanup();
    }, UPDATE_VISIBLE_MS);
  };
  const observer = new IntersectionObserver(entries => {
    visible = entries.some(entry => entry.isIntersecting && entry.intersectionRatio >= 0.6);
    schedule();
  }, {threshold:[0,0.6],rootMargin:'-88px 0px 0px 0px'});
  function cleanup() { stopTimer(); observer.disconnect(); document.removeEventListener('visibilitychange',schedule); }
  observer.observe(node);
  document.addEventListener('visibilitychange',schedule);
  return {destroy:cleanup};
}
