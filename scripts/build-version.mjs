import { createHash } from 'node:crypto';
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

// Include local/uncommitted content as well as code. Identical inputs retain the
// same version; build output and Git metadata must never feed back into it.
const inputs = [
  'src', 'static', 'data', 'scripts', 'package.json', 'package-lock.json',
  'svelte.config.js', 'vite.config.ts', 'tsconfig.json'
];

export function buildVersion(root) {
  const hash = createHash('sha256');
  function visit(key) {
    const path = join(root, key);
    if (!existsSync(path)) return;
    if (statSync(path).isDirectory()) {
      for (const name of readdirSync(path).sort()) visit(`${key}/${name}`);
    } else {
      const contents = readFileSync(path);
      hash.update(`${key}\0${contents.length}\0`).update(contents);
    }
  }
  for (const key of inputs) visit(key);
  return hash.digest('hex').slice(0, 24);
}
