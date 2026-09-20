import { tick } from 'svelte';
import { getArticleModule, type ArticleMeta } from './content';

const pending = new Map<string, ReturnType<typeof getArticleModule>>();
/** One compiled Markdown module per article. Failed requests may be retried. */
export function loadChapter(slug: string, locale: string) {
  const key = `${locale}:${slug}`;
  let request = pending.get(key);
  if (!request) {
    request = getArticleModule(slug, locale).then(module => {
      if (!module) throw new Error('Article unavailable');
      return module;
    }).catch(error => { pending.delete(key); throw error; });
    pending.set(key, request);
  }
  return request;
}
export type ChapterHandle = { load: () => Promise<boolean> };
export function chapterFragment(id: string, articles: ArticleMeta[]) {
  const article = articles.find(a => id === a.slug || id.startsWith(`${a.slug}--`))
    ?? articles.find(a => a.legacyAnchors?.includes(id));
  if (!article) return;
  return { slug: article.slug, target: article.legacyAnchors?.includes(id) ? `${article.slug}--${id}` : id };
}
const navigation = new WeakMap<HTMLElement, number>();
export async function revealChapterFragment(id: string, articles: ArticleMeta[], handles: Record<string, ChapterHandle>) {
  const match = chapterFragment(id, articles);
  if (!match) return;
  const entry = document.getElementById(match.slug);
  const root = entry?.closest('main');
  const details = entry?.querySelector<HTMLDetailsElement>('.chapter-details');
  if (!root || !details || !handles[match.slug]) return;
  const serial = (navigation.get(root) ?? 0) + 1;
  navigation.set(root, serial);
  root.dataset.readingPending = id;
  details.open = true;
  try {
    const loaded = await handles[match.slug].load();
    await tick();
    await document.fonts.ready;
    if (navigation.get(root) !== serial || !details.open) return;
    const target = (loaded && document.getElementById(match.target)) || entry;
    if (target) {
      for (let ancestor = target.parentElement; ancestor && ancestor !== root; ancestor = ancestor.parentElement) {
        if (ancestor instanceof HTMLDetailsElement) ancestor.open = true;
      }
      target.scrollIntoView({ block: 'start', behavior: 'instant' });
    }
  } finally {
    if (navigation.get(root) === serial) delete root.dataset.readingPending;
  }
}
