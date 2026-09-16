/** The draft preview is URL state, not authentication or persistent consent. */
/** @param {URLSearchParams} searchParams */
export function hasDraftPreview(searchParams) {
  return searchParams.get('show-drafts') === 'true';
}

/** @param {string} path */
export function withDraftPreview(path) {
  const [pathname, hash = ''] = path.split('#', 2);
  const separator = pathname.includes('?') ? '&' : '?';
  return `${pathname}${separator}show-drafts=true${hash ? `#${hash}` : ''}`;
}

/** Keep preview navigation local and opt in only for drafts that actually exist. */
/** @param {string} href @param {string[]} draftSlugs */
export function draftReadingHref(href, draftSlugs) {
  if (!href || href.startsWith('#')) return href;
  let url;
  try { url = new URL(href, 'https://ziabary.ir'); } catch { return href; }
  if (url.origin !== 'https://ziabary.ir') return href;
  const article = /^\/articles\/([^/]+)\/?$/.exec(url.pathname);
  if (!/^\/guides\/llm\/?$/.test(url.pathname) && !(article && draftSlugs.includes(article[1]))) return href;
  url.searchParams.set(/^\/guides\/llm\/?$/.test(url.pathname) ? 'show-drafts' : 'show-drafts', 'true');
  return `${url.pathname}${url.search}${url.hash}`;
}

/** @param {URLSearchParams} searchParams */
export function hasLlmPreview(searchParams) {
  return searchParams.get('show-drafts') === 'true';
}
