/** @type {Map<string, import('./search.mjs').SearchItem[]>} */
const cache = new Map();

/** @param {string} locale @param {AbortSignal} signal */
export async function loadSearchIndex(locale, signal) {
  if (!['fa', 'en', 'es'].includes(locale)) throw new Error('Unsupported search locale');
  if (!cache.has(locale)) {
    const response = await fetch(`/search/${locale}.json`, { signal, cache: 'no-cache' });
    if (!response.ok) throw new Error('Search index unavailable');
    const records = await response.json();
    if (!Array.isArray(records)) throw new Error('Invalid search index');
    cache.set(locale, records.filter(item => item.lang === locale));
  }
  return cache.get(locale) ?? [];
}
