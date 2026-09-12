/** Calendar dates are not instants in the reader's timezone. */
/** @param {string | Date} value */
export function dateOnly(value) {
  const date = value instanceof Date ? value.toISOString().slice(0, 10) : String(value).slice(0, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || new Date(`${date}T12:00:00Z`).toISOString().slice(0, 10) !== date) {
    throw new Error(`Invalid calendar date: ${value}`);
  }
  return date;
}

/** @param {string | Date} value @param {'fa'|'en'|'es'} [locale] */
export function formatDate(value, locale = 'fa') {
  return new Intl.DateTimeFormat(locale === 'fa' ? 'fa-IR' : locale === 'en' ? 'en-GB' : 'es-ES', {
    day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC'
  }).format(new Date(`${dateOnly(value)}T12:00:00Z`));
}

export function publicationDay() {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Tehran', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
}

/** @param {{draft?: boolean, status?: string, date: string | Date}} item @param {string} [today] */
export function isPublished(item, today = publicationDay()) {
  return !item.draft && item.status !== 'planned' && dateOnly(item.date) <= today;
}

/** @param {{date:string, updated?:string, slug:string}} a @param {{date:string, updated?:string, slug:string}} b */
export function compareArticles(a, b) {
  return (b.updated ?? b.date).localeCompare(a.updated ?? a.date) || b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug, 'en');
}

/** Publication requires an explicit editorial decision and usable, published material. */
/** @param {{status?:string, items:Array<{kind:string, id:string, href?:string}>}} collection @param {(id:string)=>unknown} getArticle */
export function collectionState(collection, getArticle) {
  const items = collection.items.filter(item => item.kind === 'article' ? Boolean(getArticle(item.id)) : Boolean(item.href));
  return { items, status: collection.status === 'published' && items.length ? 'published' : 'planned' };
}
