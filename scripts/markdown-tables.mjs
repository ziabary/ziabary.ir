/** Keep native table layout inside a separate horizontal scroll container. */
export default function markdownTables() {
  return (tree, file) => {
    const labels = { fa: 'جدول با پیمایش افقی', en: 'Horizontally scrollable table', es: 'Tabla con desplazamiento horizontal' };
    const label = labels[file?.data?.fm?.lang] ?? labels.fa;
    const visit = node => {
      if (!node.children) return;
      node.children = node.children.flatMap(child => {
        visit(child);
        if (child.type !== 'element' || child.tagName !== 'table') return child;
        // Native keyboard scrolling needs a focusable, named region. Svelte's
        // static rule cannot infer overflow-x:auto from our shared stylesheet.
        // https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/overflow#accessibility
        return [{
          type: 'raw',
          value: '<!-- svelte-ignore a11y_no_noninteractive_tabindex (Focusable region enables native keyboard scrolling of wide tables.) -->'
        }, {
          type: 'element',
          tagName: 'div',
          properties: { className: ['prose-table-scroll'], role: 'region', ariaLabel: label, tabIndex: 0 },
          children: [child]
        }];
      });
    };
    visit(tree);
  };
}
