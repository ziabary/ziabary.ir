import { shortLinkFor } from './short-links.mjs';

/** Use the article's permanent public address, independent of reading position.
 * @param {string} href @param {Record<string,string>} registry */
export function articleShareUrl(href, registry) {
  const url = new URL(href, 'https://ziabary.ir');
  url.search = '';
  url.hash = '';
  return shortLinkFor('https://ziabary.ir' + url.pathname, registry);
}

/** @param {string} value */
export function sharePlainText(value) {
  return value.replace(/<[^>]*>/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\s+/g, ' ').trim().normalize('NFC');
}

// X's single-weight Unicode ranges; counting emoji components separately is
// conservative. Reserve 23 for the link. Keep entire graphemes when shortening.
/** @param {string} text */
export function shareTextWeight(text) {
  // Treat possible embedded links conservatively too (including bare domains).
  text = text.replace(/https?:\/\/\S+|(?:[\p{L}\p{N}-]+\.)+[a-z]{2,}(?:\/\S*)?/giu,
    match => ' '.repeat(Math.max(23, Array.from(match).length * 2)));
  return Array.from(text).reduce((total, char) => {
    const code = char.codePointAt(0) ?? 0;
    return total + (code <= 0x10ff || (code >= 0x2000 && code <= 0x200d)
      || (code >= 0x2010 && code <= 0x201f) || (code >= 0x2032 && code <= 0x2037) ? 1 : 2);
  }, 0);
}
/** @param {string} text @param {number} budget */
function fitText(text, budget) {
  if (shareTextWeight(text) <= budget) return text;
  let result = '';
  for (const { segment } of new Intl.Segmenter(undefined, { granularity: 'grapheme' }).segment(text)) {
    if (shareTextWeight(result + segment + '…') > budget) break;
    result += segment;
  }
  const boundary = result.lastIndexOf(' ');
  if (boundary > result.length / 2) result = result.slice(0, boundary);
  return result.trimEnd() + '…';
}
/** @param {{title:string,excerpt:string,url:string}} article */
export function articleShareContent({ title, excerpt, url }) {
  title = sharePlainText(title);
  excerpt = sharePlainText(excerpt);
  const heading = '✍️ ' + title;
  const text = [heading, excerpt].filter(Boolean).join('\n\n');
  const fullText = text + '\n\n' + url;
  const xTitle = fitText(heading, excerpt ? 100 : 250);
  const xText = excerpt ? xTitle + '\n\n' + fitText(excerpt, 254 - shareTextWeight(xTitle)) : xTitle;
  const whatsappText = ['✍️ *' + title.replace(/\*/g, '') + '*', excerpt, url].filter(Boolean).join('\n\n');
  /** @param {string} value */
  const escape = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');
  const html = '<div dir="auto"><p><strong>' + escape(heading) + '</strong></p>'
    + (excerpt ? '<p>' + escape(excerpt) + '</p>' : '')
    + '<p><a href="' + escape(url) + '">' + escape(url) + '</a></p></div>';
  return {
    title, text, fullText, html, whatsappText,
    native: { title, text, url },
    telegram: 'https://t.me/share/url?' + new URLSearchParams({ url, text }),
    bale: 'https://ble.ir/share/url?' + new URLSearchParams({ url, text }),
    eitaa: 'https://eitaa.com/share/url?' + new URLSearchParams({ url, text }),
    whatsapp: 'https://wa.me/?' + new URLSearchParams({ text: whatsappText }),
    linkedin: 'https://www.linkedin.com/sharing/share-offsite/?' + new URLSearchParams({ url }),
    x: 'https://x.com/intent/tweet?' + new URLSearchParams({ text: xText, url }),
    email: 'mailto:?subject=' + encodeURIComponent(title) + '&body=' + encodeURIComponent([excerpt, url].filter(Boolean).join('\n\n'))
  };
}
