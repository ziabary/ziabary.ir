import { resolveShortLink } from '/short-link-core.js';

if (location.pathname === '/' && new URLSearchParams(location.search).has('t')) {
  try {
    const response = await fetch('/short-links.json', { cache: 'no-cache' });
    if (!response.ok) throw new Error('Short-link registry unavailable');
    const target = resolveShortLink(location.search, await response.json());
    if (!target) throw new Error('Unknown short link');
    location.replace(target);
  } catch {
    const showError = () => {
      const notice = document.createElement('aside');
      notice.className = 'short-link-notice';
      notice.setAttribute('role', 'alert');
      notice.textContent = 'لینک کوتاه پیدا نشد یا دریافت آن ممکن نیست. کد لینک را بررسی کنید یا دوباره تلاش کنید. ';
      const home = document.createElement('a');
      home.href = '/';
      home.textContent = 'صفحهٔ اصلی';
      notice.append(home);
      document.body.prepend(notice);
    };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', showError, { once: true });
    else showError();
  }
}
