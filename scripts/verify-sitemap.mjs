import { readFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDir, siteUrl, sitemapPages, sitemapXml } from './sitemap.mjs';

export async function verifySitemap(directory = buildDir) {
  const pages = await sitemapPages(directory);
  const actual = await readFile(join(directory, 'sitemap.xml'), 'utf8');
  if (actual !== sitemapXml(pages)) {
    throw new Error('Sitemap is stale or invalid: it must exactly match the indexable build pages. Run npm run build before publishing.');
  }
  const robots = await readFile(join(directory, 'robots.txt'), 'utf8');
  if (!robots.split(/\r?\n/).some(line => line.trim() === `Sitemap: ${siteUrl}/sitemap.xml`)) {
    throw new Error('Built robots.txt must advertise the canonical sitemap URL.');
  }
  console.log(`Validated sitemap.xml against ${pages.length} indexable pages and robots.txt.`);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await verifySitemap();
