export const prerender = true;
export const trailingSlash = 'always';

export function load({ url }) {
  const pathname = url.pathname;
  const locale = /^\/es(?:\/|$)/.test(pathname)
    ? 'es'
    : /^\/en(?:\/|$)/.test(pathname)
      ? 'en'
      : 'fa';

  return { locale, pathname } as const;
}
