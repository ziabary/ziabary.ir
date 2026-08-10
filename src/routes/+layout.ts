export const prerender = true;
export const trailingSlash = 'always';

export function load({ url }) {
  const pathname = url.pathname;
  const hostname = url.hostname.toLowerCase();
  const locale = pathname.startsWith('/es')
    ? 'es'
    : pathname.startsWith('/en') || hostname === 'ziabary.info' || hostname === 'www.ziabary.info'
      ? 'en'
      : 'fa';

  return { locale, pathname } as const;
}
