/** Normalize only the search view; published text and technical punctuation stay intact. */
/** @param {string} text */
export function normalizeSearch(text) {
  return text.normalize('NFKC').toLowerCase()
    .replace(/[يى]/g, 'ی').replace(/ك/g, 'ک')
    .replace(/[\u064b-\u065f\u0670\u06d6-\u06ed\u0640]/g, '')
    // Common Persian spellings use different seats for the same hamza.
    .replace(/مس[ئؤو]ول/g, 'مسول').replace(/مس[ئأا]له/g, 'مساله').replace(/هی[ئأا]ت/g, 'هیات')
    .replace(/[أإآٱ]/g, 'ا').replace(/ؤ/g, 'و').replace(/ئ/g, 'ی').replace(/ء/g, '')
    .replace(/[ۀة]/g, 'ه')
    .replace(/[۰-۹]/g, digit => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(digit)))
    .replace(/[٠-٩]/g, digit => String('٠١٢٣٤٥٦٧٨٩'.indexOf(digit)))
    .replace(/[\s\u200b-\u200f\u202a-\u202e\u2060\u2066-\u2069]+/g, ' ').trim();
}

/** @param {string} text */
export const compactSearch = text => normalizeSearch(text).replaceAll(' ', '');

/** @typedef {{title:string, excerpt?:string, body?:string, tags?:string, category?:string, href:string, type?:string, lang?:string}} SearchItem */
/** @template {SearchItem} T @param {T[]} items @param {string} query @returns {T[]} */
export function searchItems(items, query) {
  const phrase = compactSearch(query);
  if (!phrase) return items;
  return items.map((item, index) => {
    const title = compactSearch(item.title), excerpt = compactSearch(item.excerpt ?? '');
    const body = compactSearch(item.body ?? ''), tags = compactSearch(item.tags ?? ''), category = compactSearch(item.category ?? '');
    // Match within fields, never across an artificial title/excerpt boundary.
    const score = (title === phrase ? 120 : 0) + (title.includes(phrase) ? 60 : 0)
      + (category.includes(phrase) || tags.includes(phrase) ? 40 : 0)
      + (excerpt.includes(phrase) ? 20 : 0) + (body.includes(phrase) ? 5 : 0);
    return { item, score, index };
  }).filter(result => result.score > 0).sort((a, b) => b.score - a.score || a.index - b.index).map(result => result.item);
}
