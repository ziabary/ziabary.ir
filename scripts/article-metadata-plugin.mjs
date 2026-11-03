import { readFile } from 'node:fs/promises';
import { compile } from 'mdsvex';
import remarkMath from 'remark-math';
import markdownHeadings from './markdown-headings.mjs';
import { articleAssetUrl } from './article-assets.mjs';

const prefix = '\0ziabary:article-metadata:';
const query = '?article-metadata';

/** An eager named import and a lazy import of the same Markdown module causes
 * Rollup to eagerly include the article body too. Give metadata its own module,
 * while retaining mdsvex frontmatter and the exact existing heading algorithm. */
export async function readArticleMetadata(source, filename) {
  const frontmatter = /^---\r?\n([\s\S]*?)\r?\n---/.exec(source)?.[1] ?? '';
  const math = /^math:\s*true\s*$/m.test(frontmatter);
  const result = await compile(source, { remarkPlugins: [...(math ? [remarkMath] : []), markdownHeadings] });
  if (!result?.data?.fm) throw new Error('Article metadata compilation failed');
  const metadata = result.data.fm;
  for (const key of ['cover', 'featuredImage', 'mediaCover']) {
    if (metadata[key]) metadata[key] = articleAssetUrl(filename, metadata[key]);
  }
  return metadata;
}
export default function articleMetadata() {
  return {
    name: 'ziabary-article-metadata', enforce: 'pre',
    async resolveId(id, importer) {
      if (!id.endsWith(query)) return;
      const resolved = await this.resolve(id.slice(0, -query.length), importer, { skipSelf: true });
      if (!resolved) throw new Error(`Cannot resolve article metadata: ${id}`);
      return prefix + resolved.id + '.js';
    },
    async load(id) {
      if (!id.startsWith(prefix)) return;
      const file = id.slice(prefix.length, -3);
      this.addWatchFile(file);
      return 'export default ' + JSON.stringify(await readArticleMetadata(await readFile(file, 'utf8'), file)) + ';';
    },
    handleHotUpdate({ file, server, modules }) {
      const metadata = server.moduleGraph.getModuleById(prefix + file + '.js');
      if (metadata) return [...modules, metadata];
    }
  };
}
