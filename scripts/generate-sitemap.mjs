import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { buildDir, siteUrl, sitemapPages, sitemapXml } from './sitemap.mjs';

const pages = await sitemapPages();
const pathSet = new Set(pages.map(({ path }) => path));

function localizedAlternates(path) {
  const base = path === '/' ? '/' : path.replace(/^\/(?:en|es)(?=\/|$)/, '') || '/';
  const candidates = [
    ['fa', base],
    ['en', base === '/' ? '/en/' : `/en${base}`],
    ['es', base === '/' ? '/es/' : `/es${base}`]
  ];
  const existing = candidates.filter(([, candidate]) => pathSet.has(candidate));
  if (existing.length < 2) return '';
  const links = existing.map(([lang, candidate]) => `<link rel="alternate" hreflang="${lang}" href="${siteUrl}${candidate}" />`).join('');
  const fallback = existing.some(([lang]) => lang === 'fa') ? `<link rel="alternate" hreflang="x-default" href="${siteUrl}${base}" />` : '';
  return `${links}${fallback}`;
}

for (const { file, path, html: source } of pages) {
  let html = source;
  const locale = path.startsWith('/en/') || path === '/en/' ? 'en' : path.startsWith('/es/') || path === '/es/' ? 'es' : 'fa';
  const dir = locale === 'fa' ? 'rtl' : 'ltr';
  html = html.replace(/<html\s+lang="[^"]*"\s+dir="[^"]*">/, `<html lang="${locale}" dir="${dir}">`);
  html = html.replace(/<link rel="alternate" hreflang="[^"]+"[^>]*>/g, '');
  const alternates = localizedAlternates(path);
  if (alternates) html = html.replace('</head>', `${alternates}</head>`);
  await writeFile(file, html, 'utf8');
}

await writeFile(join(buildDir, 'sitemap.xml'), sitemapXml(pages), 'utf8');
console.log(`Generated sitemap.xml with ${pages.length} URLs.`);
