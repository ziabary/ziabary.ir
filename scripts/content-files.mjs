import { existsSync, readdirSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

export const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const locales = ['fa', 'en', 'es'];

export function articleFiles(root = projectRoot) {
  return locales.flatMap(locale => {
    const directory = join(root, 'content/articles', locale);
    if (!existsSync(directory)) return [];
    return readdirSync(directory, { withFileTypes: true })
      .filter(entry => entry.isDirectory() && existsSync(join(directory, entry.name, 'index.md')))
      .map(entry => join(directory, entry.name, 'index.md'));
  }).sort();
}

/** Find an existing edition without inferring translations from its filename. */
export function articleFile(slug, locale, root = projectRoot) {
  if (!/^[\w-]+$/.test(slug)) throw new Error(`Invalid article slug: ${slug}`);
  const matches = (locale ? [locale] : locales)
    .map(language => join(root, 'content/articles', language, slug, 'index.md'))
    .filter(file => existsSync(file));
  if (matches.length !== 1) throw new Error(`Expected one article for ${locale ?? '*'}:${slug}; found ${matches.length}`);
  return matches[0];
}

export const articleSourceKey = (slug, locale) => relative(projectRoot, articleFile(slug, locale)).replaceAll('\\', '/');
