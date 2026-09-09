import { readFile, writeFile, mkdir, mkdtemp, rm, copyFile, readdir } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { resolve, join, dirname } from 'node:path';
import { compile as markdown } from 'mdsvex';
import { compile } from 'svelte/compiler';
import { render } from 'svelte/server';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { build } from 'vite';

const here = fileURLToPath(new URL('.', import.meta.url));
const root = resolve(here, '../../..');
const output = join(here, 'review');
const collection = JSON.parse(await readFile(join(here, 'collection.json'), 'utf8'));
if (!collection.draft || collection.lang !== 'en') throw new Error('This generator only builds the English editorial draft.');
await mkdir(join(root, '.svelte-kit'), { recursive: true });
const scratch = await mkdtemp(join(root, '.svelte-kit/gpu-en-review-'));
const escape = (text) => String(text).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const common = {
  configFile: false,
  root,
  logLevel: 'error',
  resolve: { alias: { $lib: join(root, 'src/lib') } },
  plugins: [svelte({ configFile: false, onwarn(warning, handler) { if (warning.code !== 'css_unused_selector') handler(warning); } })]
};

try {
  const articles = new Map();
  for (const item of collection.items.filter((item) => item.kind === 'article')) {
    const source = await readFile(join(root, 'src/lib/content/articles', `${item.id}.md`), 'utf8');
    const processed = await markdown(source);
    const moduleFile = join(scratch, `${item.id}.mjs`);
    await writeFile(moduleFile, compile(processed.code, { generate: 'server' }).js.code);
    const module = await import(pathToFileURL(moduleFile).href);
    if (module.metadata.lang !== 'en' || module.metadata.draft !== true || module.metadata.slug !== item.id) {
      throw new Error(`Expected English draft metadata for ${item.id}`);
    }
    articles.set(item.id, { ...module.metadata, body: render(module.default).body });
  }

  const entry = join(scratch, 'tables.js');
  await writeFile(entry, `export { default as GpuComparison } from '$lib/components/GpuComparison.svelte';\nexport { default as ServerComparison } from '$lib/components/ServerComparison.svelte';`);
  const serverBundle = await build({ ...common, build: { ssr: entry, write: false, minify: false, rollupOptions: { output: { format: 'es', inlineDynamicImports: true } } } });
  const serverCode = serverBundle.output.find((item) => item.type === 'chunk').code;
  const serverFile = join(scratch, 'tables.mjs');
  await writeFile(serverFile, serverCode);
  const tables = await import(pathToFileURL(serverFile).href);
  const tableHtml = {
    'gpu-comparison-table': render(tables.GpuComparison, { props: { locale: 'en' } }).body,
    'server-comparison-table': render(tables.ServerComparison, { props: { locale: 'en' } }).body
  };

  const clientBundle = await build({ ...common, build: {
    write: false, minify: true, cssCodeSplit: false,
    lib: { entry: join(here, 'client.js'), name: 'GpuEnglishReview', formats: ['iife'] }
  } });
  const emitted = (Array.isArray(clientBundle) ? clientBundle : [clientBundle]).flatMap((bundle) => bundle.output);
  const clientCode = emitted.filter((item) => item.type === 'chunk').map((item) => item.code).join('\n');
  const componentCss = emitted.filter((item) => item.type === 'asset' && item.fileName.endsWith('.css')).map((item) => item.source).join('\n');
  const css = `${await readFile(join(here, 'preview.css'), 'utf8')}\n${componentCss}`;

  function links(html, standalone = false) {
    return html.replace(/href="\/en\/articles\/([^"/]+)\/"/g, (_, slug) => {
      if (!articles.has(slug)) throw new Error(`Unresolved English draft link: ${slug}`);
      return `href="${standalone ? `${slug}.html` : `#${slug}`}"`;
    }).replaceAll('href="/articles/', 'href="https://ziabary.ir/articles/');
  }

  function articleHtml(id, standalone = false) {
    const article = articles.get(id);
    const note = collection.imageReview.find((item) => item.article === id);
    const related = article.related.map((slug) => {
      if (!articles.has(slug)) throw new Error(`Unresolved related article: ${slug}`);
      return `<li><a href="${standalone ? `${slug}.html` : `#${slug}`}">${escape(articles.get(slug).title)}</a></li>`;
    }).join('');
    return `<article id="${id}" class="guide-entry article-entry">
      <img src="${article.cover}" alt="${escape(article.title)} — cover illustration" width="1600" height="900" loading="lazy">
      ${note ? `<aside class="image-note"><strong>English image needed.</strong> ${escape(note.note)}</aside>` : ''}
      <header><small>AI infrastructure · ${escape(article.readTime)}</small><${standalone ? 'h1' : 'h2'}>${escape(article.title)}</${standalone ? 'h1' : 'h2'}><p>${escape(article.excerpt)}</p></header>
      <div class="prose">${links(article.body, standalone)}</div>
      <nav class="related" aria-label="Related articles"><strong>Continue reading</strong><ul>${related}</ul></nav>
      <div class="article-actions"><a href="${standalone ? `index.html#${id}` : `${id}.html`}">${standalone ? 'Read in the collection' : 'Open the standalone draft'} →</a><a href="#top">Back to top ↑</a></div>
    </article>`;
  }

  const paths = `<ol>${collection.paths.map((path) => `<li><h3>${escape(path.title)}</h3><p>${escape(path.description)}</p><a href="#${path.id}">${escape(path.label)} →</a></li>`).join('')}</ol>`;
  const count = articles.size;
  const nav = `<nav class="collection-nav" aria-label="Contents"><small>IN THIS COLLECTION</small>${collection.items.map((item, i) => `<a href="#${item.id}"><span>${String(i + 1).padStart(2, '0')}</span>${escape(item.title)}</a>`).join('')}</nav>`;
  const overview = `<div class="collection-overview"><figure><img src="${collection.image}" alt="${escape(collection.imageAlt)}" width="1600" height="900"></figure><section class="start"><small>Using this collection</small><h2>${escape(collection.startTitle)}</h2><p>${escape(collection.startIntro)}</p><nav class="desktop-paths" aria-label="Suggested reading paths">${paths}</nav><details class="mobile-paths"><summary>Which path fits my needs?</summary><nav aria-label="Suggested reading paths">${paths}</nav></details><footer><span>${count} articles</span><span>2 interactive tables</span><span>Updated as the platform evolves</span></footer></section></div><p class="collection-intro">${escape(collection.intro)}</p>`;
  const body = collection.items.map((item) => item.kind === 'article' ? articleHtml(item.id) : `<section id="${item.id}" class="guide-entry">${tableHtml[item.id]}</section>`).join('\n');
  const banner = `<div class="review-banner"><span><strong class="review-label">English editorial draft</strong> · Prepared 9 September 2026 · Not published</span><button id="theme-toggle" type="button">Dark theme</button></div>`;

  function document(title, body, script = '') {
    return `<!doctype html><html id="top" lang="en" dir="ltr" data-theme="light"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>${escape(title)} — English draft</title><style>${css}</style></head><body>${banner}${body}${script ? `<script>${script.replaceAll('</script', '<\\/script')}</script>` : ''}</body></html>`;
  }

  const pages = new Map([
    ['index.html', document(collection.title, `<header class="page-hero"><small>${escape(collection.eyebrow)}</small><h1>${escape(collection.title)}</h1><p>${escape(collection.subtitle)}</p></header><div class="collection-layout">${nav}<main class="collection-main">${overview}${body}</main></div>`, clientCode)]
  ]);
  const themeScript = `document.getElementById('theme-toggle').addEventListener('click',function(){const dark=document.documentElement.dataset.theme!=='dark';document.documentElement.dataset.theme=dark?'dark':'light';this.textContent=dark?'Light theme':'Dark theme';});`;
  for (const [id, article] of articles) pages.set(`${id}.html`, document(article.title, `<main class="standalone"><a href="index.html#${id}">← GPU collection</a>${articleHtml(id, true)}</main>`, themeScript));

  // This directory is generated, ignored by Git and outside SvelteKit's public roots.
  await rm(output, { recursive: true, force: true });
  await mkdir(output, { recursive: true });
  const assets = new Set();
  for (const html of pages.values()) {
    for (const match of html.matchAll(/(?:src|href)="(\/images\/[^" ]+)"/g)) assets.add(match[1]);
  }
  for (const directory of ['brands', 'server-brands']) {
    for (const file of await readdir(join(root, 'static/images', directory))) assets.add(`/images/${directory}/${file}`);
  }
  for (const asset of assets) {
    const destination = join(output, asset);
    await mkdir(dirname(destination), { recursive: true });
    await copyFile(join(root, 'static', asset), destination);
  }
  for (const [name, html] of pages) await writeFile(join(output, name), html.replaceAll('/images/', './images/'));
  console.log(`Built ${pages.size} draft pages, ${assets.size} local assets and two interactive English tables in ${output}`);
} finally {
  await rm(scratch, { recursive: true, force: true });
}
