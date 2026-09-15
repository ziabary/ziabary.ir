// Exercises the real static HTML, including a streamed/unfinished home response.
// Requires npm run build and the review browser on localhost:9334.
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { call, pause, events, socket } from '../scripts/browser-session.mjs';

const root = resolve('build');
const home = await readFile(`${root}/index.html`, 'utf8');
const scriptEnd = home.indexOf('</script>', home.indexOf('id="short-link-bootstrap"')) + 9;
assert.ok(scriptEnd > 9, 'Build the inline bootstrap first');
const destination = '/guides/gpu-selection/#int8-or-fp8-real-gpu-support';
const requests = [];
let mode = 'ordinary';
let homeBodySent = false;
let targetBeforeHomeBody = false;
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.json': 'application/json', '.css': 'text/css', '.woff2': 'font/woff2', '.svg': 'image/svg+xml', '.webp': 'image/webp' };
const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://localhost');
    requests.push(url.pathname + url.search);
    if (url.pathname === '/' && url.searchParams.has('t') && mode === 'streamed') {
      res.writeHead(200, { 'Content-Type': types['.html'], 'Cache-Control': 'no-store' });
      res.write(home.slice(0, scriptEnd));
      await pause(3500);
      if (!res.destroyed) { homeBodySent = true; res.end(home.slice(scriptEnd)); }
      return;
    }
    if (url.pathname === '/guides/gpu-selection/' && mode !== 'ordinary') {
      targetBeforeHomeBody = !homeBodySent;
      await pause(1200);
    }
    let filename = resolve(root, '.' + decodeURIComponent(url.pathname));
    assert.ok(filename === root || filename.startsWith(root + sep));
    if (url.pathname.endsWith('/')) filename += '/index.html';
    const data = await readFile(filename);
    res.writeHead(200, { 'Content-Type': types[extname(filename)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    res.end(data);
  } catch { res.writeHead(404).end(); }
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const origin = `http://127.0.0.1:${server.address().port}`;
const report = {};
const evaluate = async expression => {
  const result = await call('Runtime.evaluate', { expression, returnByValue: true });
  assert.ok(!result.exceptionDetails, JSON.stringify(result.exceptionDetails));
  return result.result.value;
};
const waitFor = async expression => {
  for (let i = 0; i < 100; i++) { if (await evaluate(expression)) return; await pause(100); }
  throw new Error(`Browser condition timed out: ${expression}`);
};
const directory = 'docs/reviews/local-2026-09-15';
await mkdir(directory, { recursive: true });
try {
  await call('Network.setCacheDisabled', { cacheDisabled: true });
  await call('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });
  await call('Page.navigate', { url: origin + '/?utm_source=review' });
  await waitFor("document.readyState === 'complete' && Boolean(document.querySelector('h1'))");
  report.home = await evaluate("({hidden: document.documentElement.hasAttribute('data-short-link'), h1: document.querySelector('h1').innerText, display: getComputedStyle(document.querySelector('body > div')).display})");
  assert.equal(report.home.hidden, false);
  assert.notEqual(report.home.display, 'none');

  mode = 'streamed';
  const before = requests.length;
  await call('Page.navigate', { url: origin + '/?t=ggsiofrgs' });
  await pause(200);
  report.early = await evaluate("({url:location.href,state:document.readyState, bodyExists:!!document.body, status:document.documentElement?.getAttribute('data-short-link') ?? null})");
  assert.equal(report.early.bodyExists, false);
  await waitFor(`location.href === ${JSON.stringify(origin + destination)} && document.readyState === 'complete'`);
  assert.equal(targetBeforeHomeBody, true);
  report.streamed = { targetBeforeHomeBody, homeBodySent, requests: requests.slice(before) };
  assert.equal(report.streamed.homeBodySent, false);
  assert.equal(requests.slice(before).some(path => /^\/short-link/.test(path)), false);
  report.destination = await evaluate("({path:location.pathname,hash:location.hash,fragmentExists:!!document.getElementById(location.hash.slice(1)),canonical:document.querySelector('link[rel=canonical]').href})");
  assert.equal(report.destination.fragmentExists, true);
  assert.equal(report.destination.canonical, 'https://ziabary.ir/guides/gpu-selection/');
  const history = await call('Page.getNavigationHistory');
  assert.equal(history.entries.some(entry => entry.url === origin + '/?t=ggsiofrgs'), false);

  // Even when the full home HTML arrives immediately and the target is slow,
  // the home content must never become visible.
  mode = 'slow-target';
  await call('Page.navigate', { url: origin + '/?t=ggsiofrgs' });
  await pause(150);
  report.slowTarget = await evaluate("({status:document.documentElement?.getAttribute('data-short-link') ?? null,visibleHome:!!document.querySelector('body > div') && getComputedStyle(document.querySelector('body > div')).display !== 'none'})");
  assert.equal(report.slowTarget.visibleHome, false);
  await waitFor(`location.href === ${JSON.stringify(origin + destination)} && document.readyState === 'complete'`);

  mode = 'ordinary';
  report.invalid = [];
  for (const query of ['?t=missing', '?t=ggsiofrgs&t=ggsiofrgs', '?t=https://evil.example']) {
    await call('Page.navigate', { url: origin + '/' + query });
    await waitFor("document.readyState === 'complete' && !!document.querySelector('#short-link-notice')");
    const value = await evaluate("({status:document.documentElement.getAttribute('data-short-link'),notice:document.querySelector('#short-link-notice').innerText,display:getComputedStyle(document.querySelector('body > div')).display,noindex:[...document.querySelectorAll('meta[name=robots]')].some(node=>node.content.includes('noindex'))})");
    assert.equal(value.status, 'invalid');
    assert.equal(value.display, 'none');
    assert.equal(value.noindex, true);
    report.invalid.push(value);
  }
  await call('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  await call('Page.navigate', { url: origin + '/?t=missing' });
  await waitFor("document.readyState === 'complete' && !!document.querySelector('#short-link-notice')");
  assert.equal(await evaluate('document.documentElement.scrollWidth > innerWidth'), false);
  report.themes = {};
  for (const theme of ['light', 'dark']) {
    await evaluate(`document.documentElement.dataset.theme = ${JSON.stringify(theme)}`);
    const colors = await evaluate("({background:getComputedStyle(document.documentElement).backgroundColor,text:getComputedStyle(document.querySelector('#short-link-notice')).color,bodyBackground:getComputedStyle(document.body).backgroundColor})");
    assert.equal(colors.bodyBackground, 'rgba(0, 0, 0, 0)');
    assert.notEqual(colors.background, colors.text);
    report.themes[theme] = colors;
    const screenshot = await call('Page.captureScreenshot', { format: 'png' });
    await writeFile(`${directory}/short-link-invalid-mobile-${theme}.png`, Buffer.from(screenshot.data, 'base64'));
  }

  await call('Page.navigate', { url: origin + '/en/' });
  await waitFor("document.readyState === 'complete' && document.documentElement.lang === 'en'");
  assert.equal(await evaluate("!!document.getElementById('short-link-bootstrap')"), false);

  await call('Emulation.setScriptExecutionDisabled', { value: true });
  await call('Page.navigate', { url: origin + '/?t=ggsiofrgs' });
  await pause(700);
  await call('Emulation.setScriptExecutionDisabled', { value: false });
  report.noJavaScript = await evaluate("({hidden:document.documentElement.hasAttribute('data-short-link'),h1:!!document.querySelector('h1')})");
  assert.equal(report.noJavaScript.hidden, false);
  assert.equal(report.noJavaScript.h1, true);
  report.exceptions = events.filter(event => event.method === 'Runtime.exceptionThrown');
  assert.equal(report.exceptions.length, 0);
  await writeFile(`${directory}/short-link-browser-review.json`, JSON.stringify(report, null, 2) + '\n');
  console.log('Early redirect, slow network, exact fragment, history, invalid codes, mobile, normal home, locale and JavaScript-disabled checks passed.');
} finally {
  await call('Emulation.setScriptExecutionDisabled', { value: false }).catch(() => {});
  await call('Page.close').catch(() => {});
  socket.end();
  server.closeAllConnections();
  await new Promise(resolve => server.close(resolve));
}
