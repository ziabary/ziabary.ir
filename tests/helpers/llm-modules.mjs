import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { pathToFileURL } from 'node:url';
import ts from 'typescript';

/** Compile the same pure modules used in the browser; no hand-written adapter mocks. */
export async function loadLlmModules() {
  const root = path.resolve('.');
  const directory = await fs.mkdtemp(path.join(os.tmpdir(), 'llm-modules-test-'));
  const pending = new Map();
  async function compile(file) {
    if (pending.has(file)) return pending.get(file);
    const target = path.join(directory, path.relative(root, file).replace(/\.(ts|json)$/, '.mjs'));
    pending.set(file, target);
    let source;
    if (file.endsWith('.json')) source = `export default ${await fs.readFile(file,'utf8')};`;
    else source = ts.transpileModule(await fs.readFile(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
    // Read import syntax, not examples such as `from ollama import embed` in data strings.
    const parsed = ts.createSourceFile(file, source, ts.ScriptTarget.ES2022, true, ts.ScriptKind.JS);
    const imports = parsed.statements.filter(ts.isImportDeclaration).map(statement => statement.moduleSpecifier).reverse();
    for (const specifier of imports) {
      const name = specifier.text;
      let dependency = name.startsWith('$lib/') ? path.join(root,'src/lib',name.slice(5)) : path.resolve(path.dirname(file),name);
      if (!/\.(ts|json|js|mjs)$/.test(dependency)) dependency += '.ts';
      const destination = await compile(dependency);
      source = source.slice(0, specifier.getStart(parsed)) + JSON.stringify(pathToFileURL(destination).href) + source.slice(specifier.end);
    }
    await fs.mkdir(path.dirname(target), { recursive:true }); await fs.writeFile(target,source);return target;
  }
  const modules = {};
  for (const name of ['research','research-views','adapters','filtering','guide','views','comparison','presentation','brands']) modules[name] = await import(pathToFileURL(await compile(path.join(root,'src/lib/llm',name+'.ts'))));
  await fs.rm(directory,{recursive:true,force:true});
  return modules;
}
