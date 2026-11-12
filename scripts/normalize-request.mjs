/**
 * Collapse literal slashes in an origin-form request target before URL parsing.
 * `new URL('//guides/...', base)` would otherwise interpret `guides` as a host.
 * Query strings, fragments and percent-encoded path characters stay untouched.
 * @param {string} target
 * @returns {string | null} A same-origin Location, or null when no redirect is needed.
 */
export function normalizedRequestTarget(target) {
  if (!target.startsWith('/') || /[\u0000-\u0020\u007f]/.test(target)) return null;
  const boundary = target.search(/[?#]/);
  const path = boundary < 0 ? target : target.slice(0, boundary);
  // Backslashes have special authority semantics in browser URL parsing.
  if (path.includes('\\')) return null;
  const normalized = path.replace(/\/{2,}/g, '/');
  return normalized === path ? null : normalized + (boundary < 0 ? '' : target.slice(boundary));
}

/** @type {import('vite').Connect.NextHandleFunction} */
export function normalizeRequest(req, res, next) {
  if (!('url' in req) || typeof req.url !== 'string') return next();
  const location = normalizedRequestTarget(req.url);
  if (!location) return next();
  res.writeHead(308, { Location: location }).end();
}

/** @returns {import('vite').Plugin} */
export default function requestNormalization() {
  return {
    name: 'ziabary-request-normalization',
    configureServer(server) { server.middlewares.use(normalizeRequest); },
    configurePreviewServer(server) { server.middlewares.use(normalizeRequest); }
  };
}
