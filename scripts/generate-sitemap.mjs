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
const paths = files
  .map((file) => relative(buildDir, file).split(sep).join('/'))
  .map((file) => file === 'index.html' ? '/' : `/${file.replace(/\/index\.html$/, '')}/`)
  .filter((path) => !excluded.some((pattern) => pattern.test(path.replace(/^\//, ''))))
  .sort();

const urls = paths.map((path) => `  <url><loc>${siteUrl}${path}</loc></url>`).join('\n');
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

await writeFile(join(buildDir, 'sitemap.xml'), sitemap, 'utf8');
console.log(`Generated sitemap.xml with ${paths.length} URLs.`);
