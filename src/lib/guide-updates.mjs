import guideUpdatesContent from '../../content/guides/updates.json' with { type: 'json' };
/** @typedef {'fa'|'en'|'es'} UpdateLocale */
/** @typedef {'llm'|'gpu-selection'} UpdateGuide */
/** @typedef {{title:string, summary:string}} UpdateCopy */
/** @typedef {{id:string, guide:UpdateGuide, date:string, kind:'model'|'api'|'software'|'gpu'|'server', target:string, copy:Record<UpdateLocale,UpdateCopy>}} GuideUpdate */

// IDs identify editorial announcements, not builds or translations. Never reuse an ID.
// Dates record additions/changes to our dataset, not the product's release date.
/** @type {GuideUpdate[]} */
export const guideUpdates = /** @type {GuideUpdate[]} */ (guideUpdatesContent);

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
  if (item.kind === 'api') {
    params.set('view','model-catalog');
    params.set('s_model-catalog',JSON.stringify({q:item.target}));
    return `${path}?${params}#model-catalog`;
  }
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
