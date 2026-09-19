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
  for (const name of ['research','research-views','adapters','filtering','guide','views','comparison','presentation','brands','evaluation','selection','i18n/runtime','performance-policy','reference','evaluation-display']) modules[name] = await import(pathToFileURL(await compile(path.join(root,'src/lib/llm',name+'.ts'))));
  // Existing Persian behavioral tests use the same explicit factory API as the browser.
  const messages = JSON.parse(await fs.readFile(path.join(root,'data/llm/locales/messages.fa.json'),'utf8'));
  const i18n = modules['i18n/runtime'].createLlmI18n('fa', messages);
  modules['research'] = { ...modules['research'], ...modules['research'].createLlmResearch(i18n) };
  modules['research-views'] = { ...modules['research-views'], ...modules['research-views'].createLlmResearchViews(i18n) };
  modules['adapters'] = { ...modules['adapters'], ...modules['adapters'].createLlmAdapters(i18n) };
  modules['filtering'] = { ...modules['filtering'], ...modules['filtering'].createLlmFiltering(i18n) };
  modules['guide'] = { ...modules['guide'], ...modules['guide'].createLlmGuide(i18n) };
  modules['views'] = { ...modules['views'], ...modules['views'].createLlmViews(i18n) };
  modules['comparison'] = { ...modules['comparison'], ...modules['comparison'].createLlmComparison(i18n) };
  modules['presentation'] = { ...modules['presentation'], ...modules['presentation'].createLlmPresentation(i18n) };
  await fs.rm(directory,{recursive:true,force:true});
  return modules;
}
