import { createServer } from 'vite';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { allocateShortLinks } from '../src/lib/short-links.mjs';

const server = await createServer({ server: { middlewareMode: true, hmr: false }, appType: 'custom', logLevel: 'error' });
try {
  const { articles } = await server.ssrLoadModule('/src/lib/content.ts');
  const { guideCollections } = await server.ssrLoadModule('/src/lib/guides.ts');
  const { getLocalizedGuideCollections } = await server.ssrLoadModule('/src/lib/localized-guide-collections.ts');
  const { presentations } = await server.ssrLoadModule('/src/lib/presentations.ts');
  const targets = [];
  for (const locale of ['fa', 'en', 'es']) {
    const base = locale === 'fa' ? '' : `/${locale}`;
    targets.push(...['articles', 'guides', 'slides', 'media', 'resume', 'thought'].map(section => `${base}/${section}/`));
    for (const article of articles.filter(article => article.lang === locale)) targets.push(`${base}/articles/${article.slug}/`);
    for (const collection of (locale === 'fa' ? guideCollections : getLocalizedGuideCollections(locale)).filter(item => item.status === 'published')) {
      const path = `${base}/guides/${collection.slug}/`;
      targets.push(path, ...collection.items.map(item => `${path}#${item.id}`));
    }
    for (const presentation of presentations) targets.push(`${base}/slides/${presentation.slug}/`);
  }
  const previous = JSON.parse(await readFile('config/short-links.json', 'utf8'));
  const { reservations, active } = allocateShortLinks(targets, previous);
  await mkdir('src/lib/generated', { recursive: true });
  await writeFile('config/short-links.json', JSON.stringify(reservations, null, 2) + '\n');
  await writeFile('src/lib/generated/short-links.json', JSON.stringify(active, null, 2) + '\n');
  await writeFile('static/short-links.json', JSON.stringify(active) + '\n');
  // The browser module and local preview share the same exact resolver.
  await writeFile('static/short-link-core.js', await readFile('src/lib/short-links.mjs', 'utf8'));
  await mkdir('docs/deployment', { recursive: true });
  const rules = Object.entries(active).map(([code, target]) => ({
    source: `https://ziabary.ir/?t=${code}`,
    destination: `https://ziabary.ir${target}`,
    status: 301,
    preserveQueryString: false
  }));
  await writeFile('docs/deployment/short-link-redirects.json', JSON.stringify(rules, null, 2) + '\n');
  console.log(`Short links: ${Object.keys(active).length} published destinations; ${Object.keys(reservations).length} reserved codes.`);
} finally { await server.close(); }
