import { existsSync, readFileSync } from 'node:fs';
import { dirname, relative, resolve, sep } from 'node:path';
import { projectRoot } from './content-files.mjs';

const paths = JSON.parse(readFileSync(new URL('../content/relationships/asset-paths.json', import.meta.url), 'utf8'));
const imageSets = JSON.parse(readFileSync(new URL('../content/relationships/image-sets.json', import.meta.url), 'utf8'));

export function articleAssetBase(directory) {
  if (paths[directory]) return paths[directory];
  const match = /^content\/articles\/(fa|en|es)\/([^/]+)\/(images|files)$/.exec(directory);
  if (!match) throw new Error(`Unknown article asset directory: ${directory}`);
  if (match[3] === 'files') return `/downloads/articles/${match[2]}/`;
  return imageSets[`${match[1]}:${match[2]}`]
    ? `/images/articles/${match[1]}/${match[2]}/`
    : `/images/articles/${match[2]}/`;
}

/** Existing absolute URLs stay literal; new articles may use ./images/file.webp. */
export function articleAssetUrl(filename, href) {
  if (!filename || typeof href !== 'string' || !href.startsWith('./')) return href;
  const directory = dirname(resolve(filename));
  const source = relative(projectRoot, directory).split(sep).join('/');
  const match = /^content\/articles\/(fa|en|es)\/([^/]+)$/.exec(source);
  if (!match) return href;
  const parts = /^\.\/(images|files)\/(.+)$/.exec(href);
  if (!parts) return href;
  const resource = parts[2].split(/[?#]/)[0];
  const decoded = decodeURIComponent(resource);
  if (decoded.split('/').some(part => part === '..' || part === '.') || decoded.includes('\\')) {
    throw new Error(`Article asset escapes its directory: ${href}`);
  }
  let assetDirectory = `${source}/${parts[1]}`;
  const imageSet = imageSets[`${match[1]}:${match[2]}`];
  if (parts[1] === 'images' && imageSet && !existsSync(resolve(projectRoot, assetDirectory, decoded))) {
    if (!/^[\w-]+$/.test(imageSet)) throw new Error(`Invalid shared image set: ${imageSet}`);
    assetDirectory = `content/articles/shared/${imageSet}/images`;
  }
  const base = articleAssetBase(assetDirectory);
  return base + parts[2];
}

export default function markdownArticleAssets() {
  return (tree, file) => {
    const visit = node => {
      if (node.type === 'image' || node.type === 'link') node.url = articleAssetUrl(file.filename, node.url);
      if (node.type === 'html') {
        node.value = node.value.replace(/<!--[^]*?-->|\b(src|href)=(['"])(\.\/[^'"]+)\2/g, (text, attribute, quote, href) =>
          attribute ? `${attribute}=${quote}${articleAssetUrl(file.filename, href)}${quote}` : text);
      }
      for (const child of node.children ?? []) visit(child);
    };
    visit(tree);
  };
}
