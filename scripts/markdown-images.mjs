import { readFileSync } from 'node:fs';
let manifest;
const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('{', '&#123;');
export default function markdownImages() {
  manifest ??= JSON.parse(readFileSync(new URL('../src/lib/generated/image-variants.json', import.meta.url), 'utf8'));
  const attributes = src => {
    const image = manifest[src];
    if (!image) return '';
    return ` srcset="${image.variants.map(v => `${v.src} ${v.width}w`).join(', ')}" sizes="(min-width: 1200px) 740px, calc(100vw - 32px)" width="${image.width}" height="${image.height}"`;
  };
  return tree => {
    const visit = node => {
      if (node.type === 'image') { node.type = 'html'; node.value = `<img src="${escape(node.url)}" alt="${escape(node.alt ?? '')}"${attributes(node.url)} loading="lazy" decoding="async" />`; }
      else if (node.type === 'html') node.value = node.value.replace(/<img\b[^>]*>/g, tag => {
        const src = /\bsrc=["']([^"']+)["']/.exec(tag)?.[1];
        if (!src || !manifest[src] || tag.includes('srcset=')) return tag;
        tag = tag.replace(/\s(?:width|height)=["'][^"']*["']/g, '');
        return tag.replace(/\s*\/?>$/, `${attributes(src)}${tag.includes('loading=') ? '' : ' loading="lazy"'} decoding="async" />`);
      });
      for (const child of node.children ?? []) visit(child);
    };
    visit(tree);
  };
}
