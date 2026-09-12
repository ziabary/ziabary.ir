import { error, redirect } from '@sveltejs/kit';
import { articles } from './content';
import { archivePath, pageCount, validPage } from './archive.mjs';
import type { Locale } from './editions';

export function archiveEntries(locale: Locale) {
  const count = articles.filter(article => article.lang === locale).length;
  return Array.from({ length: pageCount(count) - 1 }, (_, index) => ({ page: String(index + 2) }));
}
export function loadArchive(locale: Locale, page = '1', numbered = false) {
  const records = articles.filter(article => article.lang === locale);
  if (!validPage(page, records.length)) error(404, 'Archive page not found');
  if (numbered && page === '1') redirect(308, archivePath(locale));
  return { locale, page: Number(page), records };
}
