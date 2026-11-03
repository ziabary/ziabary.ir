import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import ts from 'typescript';

/** Keep pure-module tests using the real JSON sources when compiling to data URLs. */
export function inlineJsonImports(source, filename) {
  const tree = ts.createSourceFile(filename, source, ts.ScriptTarget.Latest, true);
  const imports = tree.statements.filter(node => ts.isImportDeclaration(node) && node.moduleSpecifier.text.endsWith('.json')).reverse();
  for (const node of imports) {
    const value = JSON.parse(readFileSync(resolve(dirname(filename), node.moduleSpecifier.text), 'utf8'));
    source = source.slice(0, node.getStart(tree)) + `const ${node.importClause.name.text} = ${JSON.stringify(value)};` + source.slice(node.end);
  }
  return source;
}
