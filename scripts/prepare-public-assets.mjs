import { copyFile, mkdir, readFile, readdir, realpath, stat, unlink, writeFile } from 'node:fs/promises';
import { dirname, join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { publicAssetsDirectory, generatedDirectory } from './build-paths.mjs';

const source = fileURLToPath(new URL('../static/', import.meta.url));
const manifest = join(generatedDirectory, 'static-assets.json');
const previous = await readFile(manifest, 'utf8').then(JSON.parse).catch(error => {
  if (error.code === 'ENOENT') return [];
  throw error;
});
const outputs = [];
const sourceRoot = await realpath(source);
async function copy(directory, ancestors = new Set()) {
  const actual = await realpath(directory);
  if ((actual !== sourceRoot && !actual.startsWith(sourceRoot + sep)) || ancestors.has(actual)) throw new Error(`Invalid static asset directory: ${directory}`);
  const parents = new Set([...ancestors, actual]);
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const input = join(directory, entry.name);
    const info = entry.isSymbolicLink() ? await stat(input) : entry;
    if (entry.isSymbolicLink() && !(await realpath(input)).startsWith(sourceRoot + sep)) throw new Error(`Static asset escapes its source: ${input}`);
    if (info.isDirectory()) { await copy(input, parents); continue; }
    const name = relative(source, input);
    const url = '/' + name.split(sep).join('/');
    const output = join(publicAssetsDirectory, name);
    const original = await readFile(input);
    const current = await readFile(output).catch(error => { if (error.code === 'ENOENT') return undefined; throw error; });
    await mkdir(dirname(output), { recursive: true });
    if (!current?.equals(original)) await copyFile(input, output);
    outputs.push(url);
  }
}
await mkdir(publicAssetsDirectory, { recursive: true });
await copy(source);
for (const url of previous.filter(url => !outputs.includes(url))) {
  if (!url.startsWith('/') || url.includes('..')) throw new Error(`Unsafe stale static asset: ${url}`);
  await unlink(join(publicAssetsDirectory, url.slice(1))).catch(error => { if (error.code !== 'ENOENT') throw error; });
}
await mkdir(generatedDirectory, { recursive: true });
await writeFile(manifest, JSON.stringify(outputs.sort(), null, 2) + '\n');
console.log(`Prepared ${outputs.length} declared static assets without changing their sources.`);
