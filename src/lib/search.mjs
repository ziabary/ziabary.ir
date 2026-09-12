/** Normalize the search view only; keep C++, C# and technical punctuation. */
/** @param {string} text */
export function normalizeSearch(text) {
  return text.normalize('NFKC').toLowerCase()
    .replace(/[يى]/g, 'ی').replace(/ك/g, 'ک')
    .replace(/[\u064b-\u065f\u0670\u06d6-\u06ed\u0640]/g, '')
    .replace(/[۰-۹]/g, digit => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(digit)))
    .replace(/[٠-٩]/g, digit => String('٠١٢٣٤٥٦٧٨٩'.indexOf(digit)))
    .replace(/[\s\u200c\u200d\u200e\u200f]+/g, ' ').trim();
}

/** @typedef {{title:string, excerpt?:string, body?:string, tags?:string, href:string, type?:string, lang?:string}} SearchItem */
/** @template {SearchItem} T @param {T[]} items @param {string} query @returns {T[]} */
export function searchItems(items, query) {
  const phrase = normalizeSearch(query);
  if (!phrase) return items;
  const compact = (/** @type {string} */ text) => normalizeSearch(text).replaceAll(' ', '');
  const tokens = phrase.split(' ');
  return items.map((item, index) => {
    const title = normalizeSearch(item.title), excerpt = normalizeSearch(item.excerpt ?? '');
    const body = normalizeSearch(item.body ?? ''), tags = normalizeSearch(item.tags ?? '');
    const all = `${title} ${excerpt} ${body} ${tags}`;
    if (!tokens.every(token => all.includes(token) || compact(all).includes(compact(token)))) return { item, score: 0, index };
    const score = 1 + (title === phrase ? 120 : 0) + (compact(title).includes(compact(phrase)) ? 60 : 0)
      + (compact(excerpt).includes(compact(phrase)) ? 20 : 0) + (body.includes(phrase) ? 5 : 0)
      + tokens.reduce((total, token) => total + (title.includes(token) ? 10 : 0) + (tags.includes(token) ? 2 : 0), 0);
    return { item, score, index };
  }).filter(result => result.score > 0).sort((a, b) => b.score - a.score || a.index - b.index).map(result => result.item);
}
