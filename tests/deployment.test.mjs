import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { buildVersion } from '../scripts/build-version.mjs';
import { cacheControl, staleDeploymentKeys, unchangedObject, publishPhases } from '../scripts/deployment-policy.mjs';

test('release identity changes for edited, added and removed local inputs, not output or timestamps', () => {
  const root = mkdtempSync(join(tmpdir(), 'site-version-'));
  try {
    mkdirSync(join(root, 'src'));
    writeFileSync(join(root, 'src/page.svelte'), 'first');
    const first = buildVersion(root);
    assert.equal(buildVersion(root), first);
    writeFileSync(join(root, 'src/page.svelte'), 'second');
    assert.notEqual(buildVersion(root), first);
    writeFileSync(join(root, 'src/page.svelte'), 'first');
    assert.equal(buildVersion(root), first);
    writeFileSync(join(root, 'src/new.md'), 'new content');
    assert.notEqual(buildVersion(root), first);
    rmSync(join(root, 'src/new.md'));
    mkdirSync(join(root, 'build'));
    writeFileSync(join(root, 'build/index.html'), 'generated');
    assert.equal(buildVersion(root), first);
  } finally { rmSync(root, { recursive: true, force: true }); }
});

test('an old tab keeps its JS/CSS and compressed dependencies; removed pages are deleted', () => {
  const remote = new Set(['_app/immutable/nodes/old.js', '_app/immutable/chunks/old.js.br', '_app/immutable/assets/old.css.gz', 'removed/index.html', 'removed/index.html.gz', 'current/index.html']);
  assert.deepEqual(staleDeploymentKeys(remote, new Set(['current/index.html'])), ['removed/index.html', 'removed/index.html.gz']);
});

test('HTML/route data publish only after assets, and version after pages; failures stop rollout', async () => {
  const files = ['_app/version.json.gz', 'index.html', '_app/immutable/nodes/new.js', 'articles/__data.json', 'image.webp'].map(key => ({ key }));
  const completed = [];
  await publishPhases(files, async phase => {
    await new Promise(resolve => setTimeout(resolve, 5));
    completed.push(phase.map(file => file.key));
  });
  assert.deepEqual(completed, [['_app/immutable/nodes/new.js', 'image.webp'], ['index.html', 'articles/__data.json'], ['_app/version.json.gz']]);
  let phases = 0;
  await assert.rejects(publishPhases(files, async () => { phases++; throw new Error('upload failed'); }), /upload failed/);
  assert.equal(phases, 1);
});

test('version cannot stay cached; unchanged bytes with old cache metadata are uploaded again', () => {
  for (const key of ['_app/version.json', '_app/version.json.br', '_app/version.json.gz']) assert.equal(cacheControl(key), 'no-store');
  for (const key of ['index.html', 'articles/__data.json.gz']) assert.equal(cacheControl(key), 'public,max-age=0,must-revalidate');
  assert.match(cacheControl('_app/immutable/nodes/new.js'), /immutable/);
  const remote = { Metadata: { sha256: 'abc' }, ContentLength: 42, CacheControl: 'public,max-age=3600' };
  assert.equal(unchangedObject(remote, 'abc', 42, '_app/version.json'), false);
  assert.equal(unchangedObject({ ...remote, CacheControl: 'no-store' }, 'abc', 42, '_app/version.json'), true);
});
