// Twelve rows keep the archive scannable on mobile; never more than thirty.
export const PAGE_SIZE = 12;
/** @param {number} count */
export const pageCount = count => Math.max(1, Math.ceil(count / PAGE_SIZE));
/** @param {string} locale @param {number} page */
export const archivePath = (locale, page = 1) => `${locale === 'fa' ? '' : `/${locale}`}/articles/${page > 1 ? `page/${page}/` : ''}`;
/** @param {string} value @param {number} count */
export function validPage(value, count) {
  return /^[1-9]\d*$/.test(value) && Number(value) <= pageCount(count);
}

/** Preview pagination uses the existing archive route, including pages beyond the public archive.
 * @param {string} locale
 * @param {number} number
 * @param {{query?: string, category?: string, preview?: boolean}} [options]
 */
export function archiveDestination(locale, number = 1, { query = '', category = '', preview = false } = {}) {
  if (!query && !category && !preview) return archivePath(locale, number);
  const params = new URLSearchParams();
  if (preview) params.set('show-drafts', 'true');
  if (query) params.set('q', query);
  if (category) params.set('category', category);
  if (number > 1) params.set('p', String(number));
  return `${archivePath(locale)}?${params}`;
}
