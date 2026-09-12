import { createServer } from 'vite';
import { readFile, readdir, mkdir, writeFile } from 'node:fs/promises';
import { compile } from 'mdsvex';

const server = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' });
try {
  const { articles } = await server.ssrLoadModule('/src/lib/content.ts');
  const { guideCollections } = await server.ssrLoadModule('/src/lib/guides.ts');
  const { getLocalizedGuideCollections } = await server.ssrLoadModule('/src/lib/localized-guide-collections.ts');
  const { presentations, localizePresentation } = await server.ssrLoadModule('/src/lib/presentations.ts');
  const bodies = new Map();
  for (const name of await readdir('src/lib/content/articles')) {
    if (!name.endsWith('.md')) continue;
    const source = await readFile(`src/lib/content/articles/${name}`, 'utf8');
    const { data: { fm } } = await compile(source);
    bodies.set(fm.slug, source.replace(/^---[\s\S]*?---/, '').replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, '').replace(/<[^>]*>/g, ' ').replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/\s+/g, ' ').trim());
  }
  await mkdir('static/search', { recursive: true });
  for (const locale of ['fa','en','es']) {
    const base = locale === 'fa' ? '' : `/${locale}`;
    const types = locale === 'fa' ? ['مقاله','راهنمای فنی','اسلاید'] : locale === 'en' ? ['Article','Technical guide','Slides'] : ['Artículo','Guía técnica','Diapositivas'];
    const records = [
      ...articles.filter(article => article.lang === locale).map(article => ({ title: article.title, excerpt: article.excerpt, body: bodies.get(article.slug), tags: article.category, href: `${base}/articles/${article.slug}/`, type: types[0], lang: locale })),
      ...(locale === 'fa' ? guideCollections : getLocalizedGuideCollections(locale)).filter(guide => guide.status === 'published').map(guide => ({ title: guide.title, excerpt: guide.subtitle, body: guide.intro, href: `${base}/guides/${guide.slug}/`, type: types[1], lang: locale })),
      ...presentations.map(presentation => { const item = localizePresentation(presentation, locale); return { title: item.title, excerpt: item.summary, body: `${item.description} ${item.topics.join(' ')}`, href: `${base}/slides/${item.slug}/`, type: types[2], lang: locale }; })
    ];
    await writeFile(`static/search/${locale}.json`, JSON.stringify(records));
    console.log(`Search ${locale}: ${records.length} published entries.`);
  }
} finally { await server.close(); }
