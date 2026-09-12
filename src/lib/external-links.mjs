const siteHosts = new Set(['ziabary.ir', 'www.ziabary.ir']);

/** @param {string | null | undefined} href */
export function isExternalLink(href) {
  if (!href) return false;
  try {
    const url = new URL(href, 'https://ziabary.ir');
    return ['http:', 'https:'].includes(url.protocol) && !siteHosts.has(url.hostname);
  } catch { return false; }
}

/**
 * @param {string | null | undefined} href
 * @param {string | string[]} [rel]
 */
export function externalLinkAttributes(href, rel = '') {
  if (!isExternalLink(href)) return {};
  const tokens = (Array.isArray(rel) ? rel : rel.split(/\s+/)).filter(token => token && token.toLowerCase() !== 'opener');
  return { target: '_blank', rel: [...new Set([...tokens, 'noopener', 'noreferrer'])].join(' ') };
}

/** Apply the same policy to literal HTML anchors in Markdown and the editor preview.
 * @param {string} html
 */
export function externalLinksHtml(html) {
  return html.replace(/<a\b(?:[^<>"']|"[^"]*"|'[^']*')*>/gi, tag => {
    const attributes = [...tag.matchAll(/\s+([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g)];
    const value = (/** @type {string} */ name) => {
      const match = attributes.find(attribute => attribute[1].toLowerCase() === name);
      return match ? match[2] ?? match[3] ?? match[4] ?? '' : '';
    };
    const policy = externalLinkAttributes(value('href'), value('rel'));
    if (!policy.target) return tag;
    for (const match of attributes.filter(attribute => ['target', 'rel'].includes(attribute[1].toLowerCase())).reverse()) {
      tag = tag.slice(0, match.index) + tag.slice((match.index ?? 0) + match[0].length);
    }
    const rel = policy.rel.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
    return tag.replace(/\s*\/?>$/, ` target="${policy.target}" rel="${rel}"$&`);
  });
}
