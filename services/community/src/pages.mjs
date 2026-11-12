import { HttpError } from './errors.mjs';

const MAX_HTML_BYTES = 4 * 1024 * 1024;
const positiveTtl = 60000, negativeTtl = 10000, unavailableTtl = 3000;
const missing = () => new HttpError(404, 'post_not_found');
const unavailable = cause => new HttpError(503, 'page_verification_unavailable', cause ? {cause} : undefined);
const decode = text => text.replace(/&#(x[\da-f]+|\d+);|&(amp|quot|apos|lt|gt|nbsp);/gi, (match, number, name) => {
  if (!number) return {amp:'&', quot:'"', apos:"'", lt:'<', gt:'>', nbsp:' '}[name.toLowerCase()];
  const code = number[0].toLowerCase() === 'x' ? parseInt(number.slice(1), 16) : Number(number);
  return code > 0 && code <= 0x10ffff && !(code >= 0xd800 && code <= 0xdfff) ? String.fromCodePoint(code) : '';
});
const attrs = tag => Object.fromEntries([...tag.matchAll(/([^\s"'<>/=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g)]
  .map(([, name, double, single, bare]) => [name.toLowerCase(), decode(double ?? single ?? bare ?? '')]));
const noindex = text => /(?:^|[\s,:;])(?:noindex|none)(?:$|[\s,;])/i.test(text || '');

export function validatePagePath(path) {
  if (typeof path !== 'string' || path.length > 250 || !/^\/(?:[a-z0-9_-]+\/)*$/.test(path)) throw new HttpError(400, 'invalid_post');
  if (path.split('/').includes('kazan-investment-reality')) throw missing();
  return path;
}

/** Read publication metadata from the actual public HTML, never from browser claims. */
export function pageMetadata(html, path, headers = new Headers()) {
  if (noindex(headers.get('x-robots-tag'))) throw missing();
  const clean = html.replace(/<!--[\s\S]*?-->/g, '').replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1\s*>/gi, '');
  const head = /<head\b[^>]*>([\s\S]*?)<\/head\s*>/i.exec(clean)?.[1];
  if (!head || head.length > 65536) throw missing();
  const tags = [...head.matchAll(/<(meta|link)\b([^<>]*)>/gi)].map(([, tag, values]) => ({...attrs(values), tag:tag.toLowerCase()}));
  if (tags.some(tag => tag.tag === 'meta' && ['robots','googlebot','bingbot'].includes((tag.name || '').toLowerCase()) && noindex(tag.content))) throw missing();
  const canonicals = tags.filter(tag => tag.tag === 'link' && (tag.rel || '').toLowerCase().split(/\s+/).includes('canonical'));
  if (canonicals.length !== 1) throw missing();
  let canonical;
  try { canonical = new URL(canonicals[0].href); } catch { throw missing(); }
  if (!['https:', 'http:'].includes(canonical.protocol) || canonical.pathname !== path || canonical.search || canonical.hash) throw missing();
  const title = decode(/<title\b[^>]*>([\s\S]*?)<\/title\s*>/i.exec(head)?.[1] || '').replace(/\s+/g, ' ').trim();
  if (!title || title.length > 500 || /[\u0000-\u001f\u007f]/u.test(title)) throw missing();
  const commentable = /^\/(?:en\/|es\/)?articles\/[^/]+\/$/.test(path) && [...clean.matchAll(/<div\b([^<>]*)>/gi)]
    .some(([, values]) => { const a = attrs(values); return Object.hasOwn(a, 'data-community-slot') && a['data-post'] === path; });
  return {path, title, locale:path.startsWith('/en/') ? 'en' : path.startsWith('/es/') ? 'es' : 'fa', commentable};
}

export function createPageRegistry({siteOrigin, fetchPage = fetch, now = Date.now, onVerified, onMissing, timeoutMs = 3000, unavailableCacheMs = unavailableTtl}) {
  const cache = new Map(), pending = new Map(), controllers = new Set();
  function remember(path, value) {
    cache.delete(path);
    if (cache.size >= 1000) cache.delete(cache.keys().next().value);
    cache.set(path, value);
  }
  async function verify(path) {
    const controller = new AbortController(); controllers.add(controller);
    const timeout = setTimeout(() => controller.abort(), timeoutMs);
    let response;
    try {
      response = await fetchPage(new URL(path, siteOrigin), {
        redirect:'manual', credentials:'omit', signal:controller.signal,
        headers:{Accept:'text/html', 'User-Agent':'Ziabary-Community/1.0 (publication verification)'}
      });
      if (response.status === 404 || response.status === 410) throw missing();
      if (response.status !== 200) throw unavailable(Object.assign(new Error(`Website returned HTTP ${response.status}${response.headers.get('location')?' with a redirect':''}`),{status:response.status}));
      if (!/^text\/html(?:;|$)/i.test(response.headers.get('content-type') || '') || Number(response.headers.get('content-length') || 0) > MAX_HTML_BYTES) throw missing();
      const reader = response.body?.getReader();
      if (!reader) throw unavailable();
      let size = 0; const chunks = [];
      try {
        for (;;) {
          const {value, done} = await reader.read();
          if (done) break;
          size += value.byteLength;
          if (size > MAX_HTML_BYTES) { await reader.cancel(); throw missing(); }
          chunks.push(value);
        }
      } finally { reader.releaseLock(); }
      const post = pageMetadata(Buffer.concat(chunks).toString('utf8'), path, response.headers);
      onVerified(post);
      remember(path, {post, expires:now() + positiveTtl});
      return post;
    } catch (cause) {
      const error = cause instanceof HttpError ? cause : unavailable(cause);
      if (error.status === 404) onMissing(path);
      remember(path, {error, expires:now() + (error.status === 404 ? negativeTtl : unavailableCacheMs)});
      throw error;
    } finally { clearTimeout(timeout); controllers.delete(controller); await response?.body?.cancel().catch(() => {}); }
  }
  return {
    async resolve(path, consumeBudget = () => {}) {
      validatePagePath(path);
      const entry = cache.get(path);
      if (entry?.expires > now()) { if (entry.error) throw entry.error; return entry.post; }
      if (pending.has(path)) return pending.get(path);
      if (pending.size >= 4) throw unavailable();
      consumeBudget();
      const task = verify(path).finally(() => pending.delete(path));
      pending.set(path, task);
      return task;
    },
    close() { for (const controller of controllers) controller.abort(); }
  };
}
