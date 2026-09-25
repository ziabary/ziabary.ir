/** @typedef {'fa'|'en'|'es'} UpdateLocale */
/** @typedef {'llm'|'gpu-selection'} UpdateGuide */
/** @typedef {{title:string, summary:string}} UpdateCopy */
/** @typedef {{id:string, guide:UpdateGuide, date:string, kind:'model'|'software'|'gpu'|'server', target:string, copy:Record<UpdateLocale,UpdateCopy>}} GuideUpdate */

// IDs identify editorial announcements, not builds or translations. Never reuse an ID.
// Dates record additions/changes to our dataset, not the product's release date.
/** @type {GuideUpdate[]} */
export const guideUpdates = [
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
  cutoff.setUTCDate(cutoff.getUTCDate() - 45);
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
