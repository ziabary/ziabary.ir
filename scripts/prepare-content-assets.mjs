import { copyFile, mkdir, readFile, readdir, writeFile, unlink } from 'node:fs/promises';
import { dirname, extname, relative, resolve, sep } from 'node:path';
import { articleFiles, projectRoot } from './content-files.mjs';
import { articleAssetBase } from './article-assets.mjs';

const mapping = JSON.parse(await readFile(new URL('../content/relationships/asset-paths.json', import.meta.url), 'utf8'));
const aliases = JSON.parse(await readFile(new URL('../content/relationships/asset-aliases.json', import.meta.url), 'utf8'));
for (const file of articleFiles()) {
  const directory = relative(projectRoot, dirname(file)).split(sep).join('/');
  mapping[`${directory}/images`] ??= articleAssetBase(`${directory}/images`);
  mapping[`${directory}/files`] ??= articleAssetBase(`${directory}/files`);
}
const allowed = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif', '.avif', '.svg', '.pdf', '.zip', '.mp3', '.ogg', '.wav', '.mp4', '.webm', '.mmd', '.csv']);
const generated = new URL('../.build/generated/content-assets.json', import.meta.url);
const previous = await readFile(generated, 'utf8').then(JSON.parse).catch(error => {
  if (error.code === 'ENOENT') return [];
  throw error;
});
const staticOutputs = new Set(JSON.parse(await readFile(new URL('../.build/generated/static-assets.json', import.meta.url), 'utf8')));
const outputs = [];
for (const [source, destination] of Object.entries(mapping)) {
  if (!source.startsWith('content/') || !/^\/(images|slides|downloads)\//.test(destination) || destination.includes('..')) throw new Error(`Invalid asset mapping: ${source}`);
  const sourceRoot = resolve(projectRoot, source);
  async function copy(directory) {
    const entries = await readdir(directory, { withFileTypes: true }).catch(error => {
      if (error.code === 'ENOENT' && directory === sourceRoot) return [];
      throw error;
    });
    for (const entry of entries) {
      const input = resolve(directory, entry.name);
      if (entry.isSymbolicLink()) throw new Error(`Asset symlinks are not supported: ${input}`);
      if (entry.isDirectory()) { await copy(input); continue; }
      if (!allowed.has(extname(entry.name).toLowerCase())) continue;
      const url = destination + relative(sourceRoot, input).split(sep).join('/');
      if (outputs.includes(url) || staticOutputs.has(url)) throw new Error(`Duplicate public asset: ${url}`);
      const output = resolve(projectRoot, '.build/public', url.slice(1));
      outputs.push(url);
      await mkdir(dirname(output), { recursive: true });
      const original = await readFile(input);
      const current = await readFile(output).catch(error => { if (error.code === 'ENOENT') return undefined; throw error; });
      if (!current?.equals(original)) await copyFile(input, output);
    }
  }
  await copy(sourceRoot);
}
// Old, distinct URLs keep working even when their identical originals share a source.
for (const [alias, original] of Object.entries(aliases)) {
  if (!/^\/(images|slides|downloads)\//.test(alias) || alias.includes('..') || !outputs.includes(original) || outputs.includes(alias) || staticOutputs.has(alias)) {
    throw new Error(`Invalid asset alias: ${alias}`);
  }
  const output = resolve(projectRoot, '.build/public', alias.slice(1));
  await mkdir(dirname(output), { recursive: true });
  await copyFile(resolve(projectRoot, '.build/public', original.slice(1)), output);
  outputs.push(alias);
}
for (const url of previous.filter(url => !outputs.includes(url) && !staticOutputs.has(url))) {
  if (!/^\/(images|slides|downloads)\//.test(url) || url.includes('..')) throw new Error(`Unsafe stale asset: ${url}`);
  await unlink(resolve(projectRoot, '.build/public', url.slice(1))).catch(error => { if (error.code !== 'ENOENT') throw error; });
}
await mkdir(new URL('../.build/generated/', import.meta.url), { recursive: true });
await writeFile(generated, JSON.stringify(outputs.sort(), null, 2) + '\n');
console.log(`Prepared ${outputs.length} content assets at their preserved public URLs.`);
