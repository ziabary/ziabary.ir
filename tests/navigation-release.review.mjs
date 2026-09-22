// Run against a completed build with the local CDP browser on port 9334.
// Simulate one route chunk disappearing during deployment, without changing build/.
import assert from 'node:assert/strict';
import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname } from 'node:path';
import { call, pause, events, socket } from '../scripts/browser-session.mjs';

const root = resolve('build');
const originalVersion = JSON.parse(await readFile(`${root}/_app/version.json`, 'utf8')).version;
let advertisedVersion = originalVersion;
let removeNextNode = false;
const failures = [];
const documents = [];
const server = http.createServer(async (req, res) => {
  const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  if (pathname === '/_app/version.json') {
    res.writeHead(200, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' });
    return res.end(JSON.stringify({ version: advertisedVersion }));
  }
  if (removeNextNode && /\/_app\/immutable\/nodes\/\d+\..*\.js$/.test(pathname)) {
    removeNextNode = false;
    failures.push(pathname);
    res.writeHead(404).end('Simulated obsolete chunk');
    return;
  }
  try {
    let file = resolve(root, `.${pathname}`);
    if (!file.startsWith(`${root}/`) && file !== root) throw new Error('outside build');
    if ((await stat(file)).isDirectory()) file += '/index.html';
    const type = { '.js': 'text/javascript', '.css': 'text/css', '.html': 'text/html', '.json': 'application/json', '.svg': 'image/svg+xml', '.webp': 'image/webp' }[extname(file)] || 'application/octet-stream';
    if (extname(file) === '.html') documents.push(pathname);
    res.writeHead(200, { 'Content-Type': type, 'Cache-Control': 'no-store' });
    res.end(await readFile(file));
  } catch { res.writeHead(404).end('Not found'); }
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const origin = `http://127.0.0.1:${server.address().port}`;
const evaluate = async expression => (await call('Runtime.evaluate', { expression, returnByValue: true })).result.value;
async function until(predicate) {
  for (let i = 0; i < 100; i++) { if (await predicate()) return; await pause(100); }
  throw new Error('Timed out');
}
async function home() {
  await call('Page.navigate', { url: `${origin}/` });
  await until(() => evaluate(`Boolean(document.querySelector('header a[href="/articles/"]'))`));
  await pause(1500);
}
async function clickArticles() {
  await evaluate(`document.querySelector('header a[href="/articles/"]').click()`);
}
try {
  await call('Page.bringToFront');
  await call('Network.setCacheDisabled', { cacheDisabled: true });
  await home();
  removeNextNode = true;
  await clickArticles();
  await until(() => evaluate(`document.body.innerText.includes('Internal Error')`));
  assert.equal(failures.length, 1);
  console.log('PASS: missing old chunk + unchanged version reproduces the client 500.');
  await call('Page.reload', { ignoreCache: true });
  await until(() => evaluate(`location.pathname === '/articles/' && !!document.querySelector('h1') && !document.body.innerText.includes('Internal Error')`));
  console.log('PASS: refreshing the same URL recovers the article index.');
  await home();
  advertisedVersion = `${originalVersion}-next-release`;
  removeNextNode = true;
  const before = documents.length;
  await clickArticles();
  await until(() => documents.slice(before).includes('/articles/'));
  await until(() => evaluate(`location.pathname === '/articles/' && !!document.querySelector('h1') && !document.body.innerText.includes('Internal Error')`));
  assert.equal(failures.length, 2);
  assert.equal(documents.slice(before).filter(path => path === '/articles/').length, 1);
  console.log('PASS: a changed version recovers automatically with one full navigation.');
  console.log(JSON.stringify({ failedChunks: failures, documents, version: originalVersion }));
} finally {
  socket.end();
  server.closeAllConnections();
  server.close();
}
