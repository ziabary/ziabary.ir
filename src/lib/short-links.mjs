const origin = 'https://ziabary.ir';

// Restrict destinations to canonical, same-site paths and optional fragments.
/** @param {string} value */
export function shortLinkTarget(value) {
  if (typeof value !== 'string' || !value.startsWith('/') || value.startsWith('//') || /[\\\s]/u.test(value)) throw new Error(`Invalid short-link target: ${value}`);
  const url = new URL(value, origin);
  if (url.origin !== origin || url.search || url.pathname === '/' || !url.pathname.endsWith('/')) throw new Error(`Invalid short-link target: ${value}`);
  if (url.pathname + url.hash !== value) throw new Error(`Noncanonical short-link target: ${value}`);
  return value;
}

/** @param {string} target */
export function shortLinkInitials(target) {
  shortLinkTarget(target);
  const words = target.toLowerCase().match(/[a-z0-9]+/g);
  if (!words?.length) throw new Error(`No Latin words in short-link target: ${target}`);
  return words.map(word => word[0]).join('');
}

// Reservations include retired destinations: a shared code is never reassigned.
/** @param {string[]} targets @param {Record<string, string>} [reservations] */
export function allocateShortLinks(targets, reservations = {}) {
  const reserved = { ...reservations };
  const byTarget = new Map();
  for (const [code, target] of Object.entries(reserved)) {
    if (!/^[a-z0-9]+$/.test(code) || byTarget.has(target)) throw new Error(`Invalid or duplicate short-link reservation: ${code}`);
    shortLinkTarget(target);
    byTarget.set(target, code);
  }
  /** @type {Record<string, string>} */
  const active = {};
  for (const target of [...new Set(targets)].sort()) {
    shortLinkTarget(target);
    let code = byTarget.get(target);
    if (!code) {
      const initials = shortLinkInitials(target);
      code = initials;
      let suffix = 2;
      while (Object.hasOwn(reserved, code)) code = `${initials}${suffix++}`;
      reserved[code] = target;
      byTarget.set(target, code);
    }
    active[code] = target;
  }
  return { reservations: reserved, active };
}

/** @param {string} search @param {Record<string, string>} registry */
export function resolveShortLink(search, registry) {
  const params = new URLSearchParams(search);
  const codes = params.getAll('t');
  if (codes.length !== 1 || !/^[a-z0-9]+$/.test(codes[0])) return undefined;
  return Object.hasOwn(registry, codes[0]) ? registry[codes[0]] : undefined;
}

/** @param {string} value @param {Record<string, string>} registry */
export function shortLinkFor(value, registry) {
  const url = new URL(value, origin);
  const target = url.pathname + url.hash;
  const entry = Object.entries(registry).find(([, destination]) => destination === target);
  return entry ? `${url.origin}/?t=${entry[0]}` : url.href;
}
