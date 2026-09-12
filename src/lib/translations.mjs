import { isPublished } from './publication.mjs';

/** @typedef {{slug:string, lang:string, date:string, draft?:boolean, translationGroup?:string}} Edition */
/** @param {Edition[]} records @param {Record<string,Record<string,string>>} groups @param {string} [today] */
export function translationIndex(records, groups, today) {
  for (const [group, members] of Object.entries(groups)) {
    for (const [lang, slug] of Object.entries(members)) {
      if (!['fa', 'en', 'es'].includes(lang) || !records.some(record => record.lang === lang && record.slug === slug)) {
        throw new Error(`Unknown translation member: ${group}/${lang}/${slug}`);
      }
    }
  }
  /** @type {Map<string, Edition[]>} */
  const index = new Map();
  const seen = new Set();
  for (const record of records) {
    const key = `${record.lang}:${record.slug}`;
    if (seen.has(key)) throw new Error(`Duplicate article URL: ${key}`);
    seen.add(key);
    const assignments = Object.entries(groups).filter(([, members]) => members[record.lang] === record.slug).map(([name]) => name);
    if (record.translationGroup) assignments.push(record.translationGroup);
    const memberships = [...new Set(assignments)];
    if (memberships.length > 1) throw new Error(`Conflicting translation groups: ${key}`);
    if (!memberships.length || !isPublished(record, today)) continue;
    const group = memberships[0];
    const editions = index.get(group) ?? [];
    if (editions.some(item => item.lang === record.lang)) throw new Error(`Duplicate published language in translation group: ${group}/${record.lang}`);
    editions.push(record); index.set(group, editions);
  }
  return index;
}

/** @param {{lang:string,slug:string}} article */
export const articlePath = article => `${article.lang === 'fa' ? '' : `/${article.lang}`}/articles/${article.slug}/`;
