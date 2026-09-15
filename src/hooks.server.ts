import type { Handle } from '@sveltejs/kit';
import shortLinks from '$lib/generated/short-links.json';
import { renderShortLinkBootstrap } from '$lib/server/short-link-bootstrap.mjs';

const shortLinkBootstrap = renderShortLinkBootstrap(shortLinks);

// Runs during prerendering; production remains a directory of static files.
export const handle: Handle = ({ event, resolve }) => {
  const locale = /^\/(en|es)(\/|$)/.exec(event.url.pathname)?.[1] ?? 'fa';
  return resolve(event, { transformPageChunk: ({ html }) => html
    .replace('<html lang="fa" dir="rtl">', `<html lang="${locale}" dir="${locale === 'fa' ? 'rtl' : 'ltr'}">`)
    .replace('<!-- short-link-bootstrap -->', event.url.pathname === '/' ? shortLinkBootstrap : '')
  });
};
