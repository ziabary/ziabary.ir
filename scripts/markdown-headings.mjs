/** Stable Unicode heading IDs, available in prerendered HTML and metadata. */
export default function markdownHeadings() {
  return (tree, file) => {
    const headings = [], anchors = [], used = new Set();
    const text = node => node.value ?? (node.children ?? []).map(text).join('');
    const reserve = id => { if (used.has(id)) throw new Error(`Duplicate explicit anchor: ${id} in ${file.filename ?? ''}`); used.add(id); anchors.push(id); };
    const visit = (node, callback) => { callback(node); for (const child of node.children ?? []) visit(child, callback); };
    visit(tree, node => {
      if (node.type === 'html') for (const match of node.value.matchAll(/\bid=["']([^"']+)["']/g)) reserve(match[1]);
    });
    visit(tree, node => {
      if (node.type !== 'heading') return;
      const last = node.children?.at(-1);
      const explicit = last?.type === 'text' && /\s*\{#([^{}\s]+)\}\s*$/.exec(last.value);
      if (explicit) last.value = last.value.slice(0, explicit.index);
      const title = text(node).trim();
      let id = node.data?.hProperties?.id ?? (explicit && explicit[1]);
      if (id) reserve(id);
      else {
        const stem = title.normalize('NFC').toLowerCase().replace(/[\s\u200c]+/g, '-').replace(/[^\p{L}\p{N}_-]/gu, '').replace(/-+/g, '-').replace(/^-|-$/g, '') || 'section';
        id = stem;
        for (let index = 2; used.has(id); index++) id = `${stem}-${index}`;
        used.add(id);
      }
      node.data ??= {}; node.data.hProperties ??= {};
      node.data.hProperties.id = `{headingPrefix}${id}`;
      if (node.depth === 2 || node.depth === 3) headings.push({ id, title, depth: node.depth });
    });
    visit(tree, node => {
      if (node.type === 'link' && node.url.startsWith('#') && used.has(decodeURIComponent(node.url.slice(1)))) node.url = `#{headingPrefix}${node.url.slice(1)}`;
      if (node.type === 'html') node.value = node.value.replace(/\bid=(["'])([^"']+)\1/g, 'id=$1{headingPrefix}$2$1')
        .replace(/\bhref=(["'])#([^"']+)\1/g, (match, quote, id) => used.has(id) ? `href=${quote}#{headingPrefix}${id}${quote}` : match);
    });
    file.data.fm ??= {};
    file.data.fm.headings = headings;
    file.data.fm.legacyAnchors = anchors;
    // Article components can also be rendered inside a collection without ID collisions.
    if (used.size) tree.children.unshift({ type: 'html', value: "<script>export let headingPrefix = '';</script>" });
  };
}
