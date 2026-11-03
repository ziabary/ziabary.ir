import assert from 'node:assert/strict';
import { test } from 'node:test';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, rmSync, truncateSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { articleFiles, projectRoot } from '../scripts/content-files.mjs';

function ignored(paths) {
  try {
    return execFileSync('git', ['check-ignore', '--no-index', '--stdin'], { cwd: projectRoot, input: paths.join('\n') + '\n', encoding: 'utf8' }).trim().split('\n');
  } catch (error) {
    if (error.status === 1) return [];
    throw error;
  }
}

test('Git includes article sources and excludes media and generated catalogs', () => {
  assert.deepEqual(ignored(articleFiles()), []);
  const excluded = ['content/articles/shared/example/images/photo.webp', 'content/articles/en/example/images/photo.png',
    'content/presentations/decks/files/example/slides.pdf', 'data/llm/generated/models.v1.ts', 'data/llm/v0.3.0/repository.json'];
  assert.deepEqual(ignored(excluded), excluded);
  assert.deepEqual(ignored(['content/articles/shared/example/images/chart.svg', 'content/articles/shared/example/images/chart.csv',
    'content/relationships/image-sets.json', 'data/llm/v0.3.0/records/models.json']), []);
});

test('repository check rejects a real oversized untracked file without adding it to Git', () => {
  const directory = mkdtempSync(join(projectRoot, '.size-policy-test-'));
  const file = join(directory, 'oversized.dat');
  try {
    writeFileSync(file, '');
    truncateSync(file, 5 * 1024 * 1024);
    assert.throws(() => execFileSync(process.execPath, ['scripts/verify-repository-files.mjs'], { cwd: projectRoot, stdio: 'pipe' }), error =>
      error.status === 1 && error.stderr.toString().includes('oversized.dat'));
  } finally { rmSync(directory, { recursive: true, force: true }); }
});
