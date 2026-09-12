/** Keep native table layout inside a separate horizontal scroll container. */
export default function markdownTables() {
  return tree => {
    const visit = node => {
      if (!node.children) return;
      node.children = node.children.map(child => {
        visit(child);
        if (child.type !== 'element' || child.tagName !== 'table') return child;
        return {
          type: 'element',
          tagName: 'div',
          properties: { className: ['prose-table-scroll'], tabIndex: 0 },
          children: [child]
        };
      });
    };
    visit(tree);
  };
}
