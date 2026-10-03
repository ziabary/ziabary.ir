import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { brotliCompressSync, constants, gzipSync } from 'node:zlib';
import { pathToFileURL } from 'node:url';
import { buildDir, siteUrl } from './sitemap.mjs';
import { shortLinkTarget } from '../src/lib/short-links.mjs';

const requiredProperties = ['og:type', 'og:locale', 'og:title', 'og:description', 'og:url', 'og:image'];
const labels = {
  fa: ['در حال انتقال به مطلب…', 'رفتن به مطلب'],
  en: ['Opening the page…', 'Open the page'],
  es: ['Abriendo la página…', 'Abrir la página']
};

function attribute(tag, name) {
  const match = new RegExp(`(?:^|\\s)${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)')`, 'i').exec(tag);
  return match?.[1] ?? match?.[2];
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
}

function destinationMetadata(html, target) {
  const head = /<head\b[^>]*>([\s\S]*?)<\/head>/i.exec(html)?.[1];
  if (!head) throw new Error(`Short-link destination has no head: ${target}`);
  const tags = [...head.matchAll(/<meta\b[^>]*>/gi)].map(([tag]) => tag);
  const selected = tags.filter(tag => {
    const property = attribute(tag, 'property');
    const name = attribute(tag, 'name');
    return property?.startsWith('og:') || name?.startsWith('twitter:') || name === 'description';
  });
  for (const property of requiredProperties) {
    if (!selected.some(tag => attribute(tag, 'property') === property)) {
      throw new Error(`Short-link destination lacks ${property}: ${target}`);
    }
  }
  const title = /<title\b[^>]*>[\s\S]*?<\/title>/i.exec(head)?.[0];
  if (!title) throw new Error(`Short-link destination lacks a title: ${target}`);
  return [title, ...selected].join('\n  ');
}

export async function generateShortLinkPages(directory = buildDir) {
  const registry = JSON.parse(await readFile(join(directory, 'short-links.json'), 'utf8'));
  for (const [code, target] of Object.entries(registry)) {
    if (!/^[a-z0-9]+$/.test(code)) throw new Error(`Invalid short-link code: ${code}`);
    shortLinkTarget(target);
    const path = target.split('#')[0];
    const destination = await readFile(join(directory, path.slice(1), 'index.html'), 'utf8');
    const metadata = destinationMetadata(destination, target);
    const locale = path.startsWith('/en/') ? 'en' : path.startsWith('/es/') ? 'es' : 'fa';
    const [message, linkLabel] = labels[locale];
    const targetUrl = new URL(target, siteUrl).href;
    const canonicalUrl = new URL(path, siteUrl).href;
    const safeTarget = escapeHtml(targetUrl);
    const scriptTarget = JSON.stringify(target).replace(/</g, '\\u003c').replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');
    const html = `<!doctype html>
<html lang="${locale}" dir="${locale === 'fa' ? 'rtl' : 'ltr'}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex,follow">
  <link rel="canonical" href="${escapeHtml(canonicalUrl)}">
  ${metadata}
  <meta http-equiv="refresh" content="0;url=${safeTarget}">
  <script>location.replace(${scriptTarget})</script>
</head>
<body>
  <p>${message} <a href="${safeTarget}">${linkLabel}</a></p>
</body>
</html>
`;
    const pageDir = join(directory, 's', code);
    await mkdir(pageDir, { recursive: true });
    const content = Buffer.from(html);
    await Promise.all([
      writeFile(join(pageDir, 'index.html'), content),
      writeFile(join(pageDir, 'index.html.gz'), gzipSync(content, { level: 9 })),
      writeFile(join(pageDir, 'index.html.br'), brotliCompressSync(content, { params: { [constants.BROTLI_PARAM_QUALITY]: 7 } }))
    ]);
  }
  console.log(`Generated ${Object.keys(registry).length} short-link preview pages.`);
}

if (process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url) await generateShortLinkPages();
