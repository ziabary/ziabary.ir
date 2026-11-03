import assert from 'node:assert/strict';
import { test } from 'node:test';
import { copyFileSync, existsSync, mkdtempSync, mkdirSync, readFileSync, rmSync, unlinkSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { buildVersion } from '../scripts/build-version.mjs';

test('generated public files and metadata stay outside the static and source directories', () => {
  for (const path of ['static/images/articles', 'static/images/gallery', 'static/images/guides',
    'static/images/media-covers', 'static/images/news', 'static/images/responsive', 'static/slides',
    'static/search', 'static/short-links.json', 'static/short-link-core.js', 'src/lib/generated']) {
    assert.equal(existsSync(path), false, path);
  }
  for (const path of ['.build/public/search/fa.json', '.build/public/short-links.json',
    '.build/public/images/articles/kazan-travelogue', '.build/public/slides',
    '.build/generated/image-variants.json', '.build/generated/pdf-sizes.json', '.build/generated/icons.css']) {
    assert.ok(existsSync(path), path);
  }
});

test('declared static inputs and generated compatibility assets reach the same public URLs', () => {
  const paths = JSON.parse(readFileSync('.build/generated/static-assets.json', 'utf8'));
  for (const path of paths) assert.deepEqual(readFileSync('.build/public' + path), readFileSync('static' + path), path);
  assert.deepEqual(JSON.parse(readFileSync('.build/public/short-links.json', 'utf8')), JSON.parse(readFileSync('.build/generated/short-links.json', 'utf8')));
  assert.deepEqual(readFileSync('.build/public/short-link-core.js'), readFileSync('src/lib/short-links.mjs'));
});

test('generated staging files never feed back into the source version hash', () => {
  const root = mkdtempSync(join(tmpdir(), 'ziabary-build-inputs-'));
  try {
    mkdirSync(join(root, 'static'));
    mkdirSync(join(root, '.build/public'), { recursive: true });
    writeFileSync(join(root, 'static/source.txt'), 'declared input');
    const before = buildVersion(root);
    writeFileSync(join(root, '.build/public/generated.txt'), 'generated output');
    assert.equal(buildVersion(root), before);
    writeFileSync(join(root, 'static/source.txt'), 'changed input');
    assert.notEqual(buildVersion(root), before);
  } finally { rmSync(root, { recursive: true, force: true }); }
});

test('the build guard rejects a generator writing into static', () => {
  const root = mkdtempSync(join(tmpdir(), 'ziabary-static-guard-'));
  try {
    mkdirSync(join(root, 'static'));
    mkdirSync(join(root, 'scripts'));
    for (const file of ['build-paths.mjs', 'verify-static-sources.mjs']) copyFileSync('scripts/' + file, join(root, 'scripts', file));
    writeFileSync(join(root, 'static/source.txt'), 'declared input');
    const verify = (...args) => execFileSync(process.execPath, [join(root, 'scripts/verify-static-sources.mjs'), ...args], { stdio: 'pipe' });
    verify('--record');
    verify();
    writeFileSync(join(root, 'static/unexpected-output.txt'), 'generated output');
    assert.throws(() => verify(), error => error.status === 1 && error.stderr.toString().includes('The build modified static source files'));
    unlinkSync(join(root, 'static/unexpected-output.txt'));
    verify();
  } finally { rmSync(root, { recursive: true, force: true }); }
});
