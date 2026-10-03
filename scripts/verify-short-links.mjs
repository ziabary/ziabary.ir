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
    const preview = await readFile(join(directory, 's', code, 'index.html'), 'utf8');
    if (!preview.includes('<meta name="robots" content="noindex,follow">')) throw new Error(`Short-link preview must be noindex: ${code}`);
    if (pages.has(`/s/${code}/`)) throw new Error(`Short-link preview entered the sitemap: ${code}`);
    for (const property of ['og:title', 'og:description', 'og:url', 'og:image', 'twitter:image']) {
      const tag = [...html.matchAll(/<meta\b[^>]*>/gi)].map(([value]) => value)
        .find(value => value.includes(`${property.startsWith('og:') ? 'property' : 'name'}="${property}"`));
      if (!tag || !preview.includes(tag)) throw new Error(`Short-link preview differs from its destination ${property}: ${code}`);
    }
    const previewScript = /<script>(location\.replace\([\s\S]*?\))<\/script>/.exec(preview)?.[1];
    let previewDestination;
    if (previewScript) runInNewContext(previewScript, { location: { replace: value => { previewDestination = value; } } }, { timeout: 1000 });
    if (previewDestination !== target) throw new Error(`Short-link preview does not open its destination: ${code}`);
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
  console.log(`Validated ${seen.size} short-link destinations, fragments, preview metadata and redirects against published pages.`);
}
if (process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url) await verifyShortLinks();
