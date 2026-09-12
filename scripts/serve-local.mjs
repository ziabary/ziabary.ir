import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
const root = resolve(process.env.LOCAL_BUILD_DIR ?? 'build');
const port = Number(process.env.PORT ?? 4186);
const redirects = JSON.parse(await readFile(new URL('../config/redirects.json', import.meta.url), 'utf8'));
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.xml': 'application/xml', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.pdf': 'application/pdf', '.woff2': 'font/woff2', '.woff': 'font/woff', '.txt': 'text/plain; charset=utf-8' };
await stat(`${root}/index.html`);
createServer(async (req, res) => {
  try {
    if (!['GET', 'HEAD'].includes(req.method)) { res.writeHead(405).end(); return; }
    const url = new URL(req.url, `http://127.0.0.1:${port}`);
    let pathname;
    try { pathname = decodeURIComponent(url.pathname); } catch { res.writeHead(400).end(); return; }
    const redirect = redirects.find(rule => pathname === rule.from || pathname + '/' === rule.from);
    if (redirect) { res.writeHead(redirect.status, { Location: redirect.to }).end(); return; }
    // Compatibility for old page queries; filter combinations stay client-side and noindex.
    if (/^\/(?:en\/|es\/)?articles\/$/.test(pathname) && url.searchParams.has('page') && !url.searchParams.has('q') && !url.searchParams.has('category')) {
      const page = url.searchParams.get('page');
      const target = page === '1' ? pathname : `${pathname}page/${page}/`;
      if (!/^[1-9]\d*$/.test(page)) { res.writeHead(404).end('Not found'); return; }
      try { await stat(resolve(root, '.' + target, 'index.html')); } catch { res.writeHead(404).end('Not found'); return; }
      res.writeHead(308, { Location: target }).end(); return;
    }
    let path = resolve(root, '.' + pathname);
    if (path !== root && !path.startsWith(root + sep)) { res.writeHead(403).end(); return; }
    let info = await stat(path);
    if (info.isDirectory()) {
      if (!pathname.endsWith('/')) { res.writeHead(308, { Location: pathname + '/' + url.search }).end(); return; }
      path = resolve(path, 'index.html'); info = await stat(path);
    }
    const headers = { 'Content-Type': types[extname(path)] ?? 'application/octet-stream', 'Content-Length': info.size, 'Cache-Control': 'no-cache' };
    if (url.searchParams.has('q') || url.searchParams.has('category')) headers['X-Robots-Tag'] = 'noindex, follow';
    res.writeHead(200, headers);
    res.end(req.method === 'HEAD' ? undefined : await readFile(path));
  } catch { res.writeHead(404, { 'Content-Type': 'text/plain' }).end('Not found'); }
}).listen(port, '127.0.0.1', () => console.log(`Local static build: http://127.0.0.1:${port}/ (${root}); no SPA fallback.`));
