import { readFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { sitemapPages, buildDir } from './sitemap.mjs';
import { shortLinkTarget } from '../src/lib/short-links.mjs';

export async function verifyShortLinks(directory = buildDir) {
  const links = JSON.parse(await readFile(join(directory, 'short-links.json'), 'utf8'));
  const pages = new Map((await sitemapPages(directory)).map(page => [page.path, page.html]));
  const seen = new Set();
  for (const [code, target] of Object.entries(links)) {
    if (!/^[a-z0-9]+$/.test(code) || seen.has(target)) throw new Error(`Duplicate or invalid short link: ${code}`);
    seen.add(target);
    shortLinkTarget(target);
    const [path, fragment] = target.split('#');
    const html = pages.get(path);
    if (!html) throw new Error(`Short link must target an indexable page: ${code} → ${target}`);
    if (fragment && !html.includes(`id="${fragment}"`)) throw new Error(`Missing short-link fragment: ${target}`);
  }
  console.log(`Validated ${seen.size} short-link destinations and fragments against published pages.`);
}
if (process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url) await verifyShortLinks();
