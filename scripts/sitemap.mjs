import { readdir, readFile } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

export const buildDir = fileURLToPath(new URL('../build/', import.meta.url));
export const siteUrl = 'https://ziabary.ir';

function isNoindex(html) {
  return [...html.matchAll(/<meta\b[^>]*>/gi)].some(([tag]) => {
    const attributes = Object.fromEntries([...tag.matchAll(/([\w-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g)]
      .map(([, key, double, single, bare]) => [key.toLowerCase(), (double ?? single ?? bare).toLowerCase()]));
    return ['robots', 'googlebot'].includes(attributes.name) && /\b(?:noindex|none)\b/.test(attributes.content ?? '');
  });
}

export async function sitemapPages(directory = buildDir) {
  const pages = [];
  async function visit(dir) {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      const file = join(dir, entry.name);
      if (entry.isDirectory()) await visit(file);
      else if (entry.isFile() && entry.name === 'index.html') {
        const relativePath = relative(directory, file).split(sep).join('/');
        const path = relativePath === 'index.html' ? '/' : `/${relativePath.replace(/\/index\.html$/, '')}/`;
        if (/^\/(?:admin|404)(?:\/|$)/.test(path)) continue;
        const html = await readFile(file, 'utf8');
        if (!isNoindex(html)) pages.push({ file, path, html });
      }
    }
  }
  await visit(directory);
  if (!pages.some(({ path }) => path === '/')) throw new Error('Sitemap requires a built, indexable home page. Run npm run build first.');
  return pages.sort((a, b) => a.path < b.path ? -1 : a.path > b.path ? 1 : 0);
}

export function sitemapXml(pages) {
  const escapeXml = (value) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&apos;');
  const urls = pages.map(({ path }) => `  <url><loc>${escapeXml(new URL(path, siteUrl).href)}</loc></url>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}
