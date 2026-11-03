import assert from 'node:assert/strict';
import { test } from 'node:test';
import { execFileSync } from 'node:child_process';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { writeResponsiveImage } from '../scripts/responsive-image.mjs';

test('a wide JPEG produces a responsive WebP without changing resource policies', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'ziabary-responsive-image-'));
  try {
    const source = join(directory, 'wide.jpg'), output = join(directory, 'wide.webp');
    execFileSync('convert', ['-limit', 'thread', '1', '-size', '4080x1840', 'xc:white', source]);
    await writeResponsiveImage(source, output, 1920);
    assert.equal(execFileSync('identify', ['-format', '%w %h', output], { encoding: 'utf8' }), '1920 866');
    assert.equal(execFileSync('identify', ['-format', '%w %h', source], { encoding: 'utf8' }), '4080 1840');
  } finally { await rm(directory, { recursive: true, force: true }); }
});
