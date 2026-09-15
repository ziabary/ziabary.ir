import { readFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { runInNewContext } from 'node:vm';
import { sitemapPages, buildDir } from './sitemap.mjs';
import { shortLinkTarget } from '../src/lib/short-links.mjs';

export async function verifyShortLinks(directory = buildDir) {
  const links = JSON.parse(await readFile(join(directory, 'short-links.json'), 'utf8'));
  const pages = new Map((await sitemapPages(directory)).map(page => [page.path, page.html]));
  const home = pages.get('/') ?? '';
  const bootstrap = /<script id="short-link-bootstrap">([\s\S]*?)<\/script>/.exec(home);
  if (!bootstrap || bootstrap.index > home.search(/<link\b/)) throw new Error('The home page must embed short-link navigation before styles and other resources');
  for (const [path, html] of pages) {
    if (path !== '/' && html.includes('id="short-link-bootstrap"')) throw new Error(`Short-link registry unnecessarily embedded in ${path}`);
  }
  const seen = new Set();
  for (const [code, target] of Object.entries(links)) {
    if (!/^[a-z0-9]+$/.test(code) || seen.has(target)) throw new Error(`Duplicate or invalid short link: ${code}`);
    seen.add(target);
    shortLinkTarget(target);
    const [path, fragment] = target.split('#');
    const html = pages.get(path);
    if (!html) throw new Error(`Short link must target an indexable page: ${code} → ${target}`);
    if (fragment && !html.includes(`id="${fragment}"`)) throw new Error(`Missing short-link fragment: ${target}`);
    // Exercise the actual serialized build artifact, with no body or network.
    let destination;
    runInNewContext(bootstrap[1], {
      URLSearchParams,
      location: { pathname: '/', search: `?t=${code}`, replace: value => { destination = value; } },
      document: {
        documentElement: { setAttribute() {} }, head: { appendChild() {} },
        createElement: () => ({}), addEventListener() {}
      }
    }, { timeout: 1000 });
    if (destination !== target) throw new Error(`Early redirect does not match the published registry: ${code}`);
  }
  console.log(`Validated ${seen.size} short-link destinations, fragments and early browser redirects against published pages.`);
}
if (process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url) await verifyShortLinks();
