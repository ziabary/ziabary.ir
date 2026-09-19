import type { Plugin } from 'vite';
import type { ArticleMeta } from '../src/lib/content';
/** Build-time Node plugin; metadata uses the same mdsvex heading transform as the article. */
export function readArticleMetadata(source: string): Promise<ArticleMeta>;
export default function articleMetadata(): Plugin;
