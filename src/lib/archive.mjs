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
