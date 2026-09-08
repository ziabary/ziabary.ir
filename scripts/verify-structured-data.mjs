import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const buildRoot = fileURLToPath(new URL('../build/', import.meta.url));
let checked = 0;
const covered = new Set();

async function verifyDirectory(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = join(directory, entry.name);
    if (entry.isDirectory()) {
      await verifyDirectory(file);
    } else if (entry.name.endsWith('.html')) {
      const html = await readFile(file, 'utf8');
      const page = relative(buildRoot, file);
      for (const [, attributes, content] of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi)) {
        if (!/\btype\s*=\s*['"]application\/ld\+json['"]/i.test(attributes)) continue;
        let data;
        try {
          data = JSON.parse(content);
        } catch (error) {
          throw new Error(`${page}: invalid JSON-LD: ${error.message}`);
        }
        assert(data && !Array.isArray(data) && typeof data === 'object', `${page}: expected a JSON-LD object`);
        assert.equal(data['@context'], 'https://schema.org', `${page}: missing schema.org context`);
        assert(data['@type'] || Array.isArray(data['@graph']), `${page}: missing type or graph`);
        checked += 1;
        covered.add(page);
      }
    }
  }
}

await verifyDirectory(buildRoot);
for (const page of ['index.html', 'guides/gpu-selection/index.html', 'articles/choosing-gpu-for-ai/index.html']) {
  assert(covered.has(page), `${page}: JSON-LD is missing`);
}
console.log(`Validated ${checked} JSON-LD blocks across ${covered.size} HTML pages.`);
