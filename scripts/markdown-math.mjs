import katex from 'katex';

/** Render at build time, with MathML for assistive technology and no browser JS. */
export default function markdownMath() {
  return tree => {
    const visit = node => {
      if (node.type === 'math' || node.type === 'inlineMath') {
        const displayMode = node.type === 'math';
        const html = katex.renderToString(node.value, {
          displayMode, output: 'htmlAndMathml', throwOnError: true, trust: false
        }).replaceAll('{', '&#123;').replaceAll('}', '&#125;');
        const tag = displayMode ? 'div' : 'span';
        node.type = 'html';
        node.value = `<${tag} class="math-${displayMode ? 'display' : 'inline'}" dir="ltr">${html}</${tag}>`;
        delete node.data;
      }
      for (const child of node.children ?? []) visit(child);
    };
    visit(tree);
  };
}
