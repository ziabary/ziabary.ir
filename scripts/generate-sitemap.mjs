import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';

const buildDir = new URL('../build/', import.meta.url).pathname;
const siteUrl = 'https://ziabary.ir';
const excluded = [/^admin(?:\/|$)/, /^404\.html$/];

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await walk(fullPath));
    else if (entry.isFile() && entry.name === 'index.html') files.push(fullPath);
  }
  return files;
}

const files = await walk(buildDir);
const pathByFile = new Map(files.map((file) => [file, file === join(buildDir, 'index.html') ? '/' : `/${relative(buildDir, file).split(sep).join('/').replace(/\/index\.html$/, '')}/`]));
const paths = [...pathByFile.values()]
  .filter((path) => !excluded.some((pattern) => pattern.test(path.replace(/^\//, ''))))
  .sort();
const pathSet = new Set(paths);

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

for (const [file, path] of pathByFile) {
  if (excluded.some((pattern) => pattern.test(path.replace(/^\//, '')))) continue;
  let html = await readFile(file, 'utf8');
  const locale = path.startsWith('/en/') || path === '/en/' ? 'en' : path.startsWith('/es/') || path === '/es/' ? 'es' : 'fa';
  const dir = locale === 'fa' ? 'rtl' : 'ltr';
  html = html.replace(/<html\s+lang="[^"]*"\s+dir="[^"]*">/, `<html lang="${locale}" dir="${dir}">`);
  html = html.replace(/<link rel="alternate" hreflang="[^"]+"[^>]*>/g, '');
  const alternates = localizedAlternates(path);
  if (alternates) html = html.replace('</head>', `${alternates}</head>`);
  await writeFile(file, html, 'utf8');
}

const urls = paths.map((path) => `  <url><loc>${siteUrl}${path}</loc></url>`).join('\n');
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

await writeFile(join(buildDir, 'sitemap.xml'), sitemap, 'utf8');
console.log(`Generated sitemap.xml with ${paths.length} URLs.`);
