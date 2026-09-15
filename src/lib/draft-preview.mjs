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
