import { resolveShortLink, shortLinkTarget } from '../short-links.mjs';

// This function runs as a classic inline script, before CSS and SvelteKit.
// Keep it self-contained: it is serialized into the prerendered home page.
/** @param {Record<string, string>} registry @param {typeof resolveShortLink} resolve */
function redirectBeforePage(registry, resolve) {
  if (location.pathname !== '/' || !new URLSearchParams(location.search).has('t')) return;

  const target = resolve(location.search, registry);
  document.documentElement.setAttribute('data-short-link', target ? 'redirecting' : 'invalid');
  const style = document.createElement('style');
  style.textContent = `
    html[data-short-link] { color-scheme: light dark; background: var(--bg, #f7f6f2); color: var(--ink, #172f32); }
    html[data-short-link] body { margin: 0; min-height: 100vh; background: transparent; color: inherit; }
    html[data-short-link] body > :not(#short-link-notice) { display: none !important; }
    #short-link-notice { max-width: 36rem; margin: 15vh auto; padding: 1.5rem; background: transparent; color: inherit; font: 1rem/2 IranSansX, system-ui, sans-serif; }
    #short-link-notice a { color: inherit; text-decoration: underline; text-underline-offset: .25em; }
    @media (prefers-color-scheme: dark) { html[data-short-link] { background: var(--bg, #0b191d); color: var(--ink, #edf6f5); } }
  `;
  document.head.appendChild(style);

  const showNotice = () => {
    const notice = document.createElement('main');
    notice.id = 'short-link-notice';
    notice.setAttribute('role', target ? 'status' : 'alert');
    const message = document.createElement('p');
    message.textContent = target ? 'در حال انتقال به مطلب…' : 'لینک کوتاه پیدا نشد. کد لینک را بررسی کنید.';
    const link = document.createElement('a');
    link.href = target || '/';
    link.textContent = target ? 'رفتن به مطلب ↗' : 'صفحهٔ اصلی';
    notice.append(message, link);
    document.body.prepend(notice);
    document.title = target ? 'در حال انتقال به مطلب' : 'لینک کوتاه پیدا نشد';
    if (target) {
      for (const canonical of document.querySelectorAll('link[rel="canonical"]')) {
        canonical.setAttribute('href', new URL(target.split('#')[0], location.origin).href);
      }
    }
  };

  if (!target) {
    const robots = document.createElement('meta');
    robots.name = 'robots';
    robots.content = 'noindex, follow';
    document.head.appendChild(robots);
  }
  document.addEventListener('DOMContentLoaded', showNotice, { once: true });
  if (target) location.replace(target);
}

/** @param {Record<string, string>} registry */
export function renderShortLinkBootstrap(registry) {
  for (const [code, target] of Object.entries(registry)) {
    if (!/^[a-z0-9]+$/.test(code)) throw new Error(`Invalid short-link code: ${code}`);
    shortLinkTarget(target);
  }
  // Defense in depth: keep JSON inert inside HTML if target validation evolves.
  const json = JSON.stringify(registry).replace(/</g, '\\u003c').replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');
  return `<script id="short-link-bootstrap">(${redirectBeforePage.toString()})(${json}, ${resolveShortLink.toString()});</script>`;
}
