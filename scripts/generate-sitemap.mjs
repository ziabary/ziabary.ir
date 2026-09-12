import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { buildDir, sitemapPages, sitemapXml } from './sitemap.mjs';

// PageSeo and the prerender hook own HTML metadata. Never infer translations
// from matching paths or rewrite already precompressed HTML after the build.
const pages = await sitemapPages();
await writeFile(join(buildDir, 'sitemap.xml'), sitemapXml(pages), 'utf8');
console.log(`Generated sitemap.xml with ${pages.length} URLs.`);
