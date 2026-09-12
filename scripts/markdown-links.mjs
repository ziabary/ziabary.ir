import { externalLinkAttributes, externalLinksHtml } from '../src/lib/external-links.mjs';

/** Runs after Markdown reference links and autolinks have been resolved. */
export default function markdownLinks() {
  return tree => {
    const visit = node => {
      if (node.type === 'element' && node.tagName === 'a') {
        Object.assign(node.properties, externalLinkAttributes(node.properties.href, node.properties.rel));
      } else if (node.type === 'raw') {
        node.value = externalLinksHtml(node.value);
      }
      for (const child of node.children ?? []) visit(child);
    };
    visit(tree);
  };
}
