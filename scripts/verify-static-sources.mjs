import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdir, readFile, readdir, readlink, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { generatedDirectory } from './build-paths.mjs';

const root = fileURLToPath(new URL('../static/', import.meta.url));
const snapshot = join(generatedDirectory, 'static-source-snapshot.json');
const entries = {};
async function inventory(directory, prefix = '') {
  for (const entry of (await readdir(directory, { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name, 'en'))) {
    const file = join(directory, entry.name);
    const key = prefix + entry.name;
    if (entry.isSymbolicLink()) entries[key] = 'symlink:' + await readlink(file);
    else if (entry.isDirectory()) await inventory(file, key + '/');
    else entries[key] = createHash('sha256').update(await readFile(file)).digest('hex');
  }
}
await inventory(root);
if (process.argv.includes('--record')) {
  await mkdir(generatedDirectory, { recursive: true });
  await writeFile(snapshot, JSON.stringify(entries, null, 2) + '\n');
  console.log(`Recorded ${Object.keys(entries).length} declared static source entries.`);
} else {
  assert.deepEqual(entries, JSON.parse(await readFile(snapshot, 'utf8')), 'The build modified static source files; generated files must stay in .build/.');
  console.log(`Verified ${Object.keys(entries).length} static source entries: no build-time changes.`);
}
