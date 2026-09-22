# Navigation across deployments

The 2026-09-22 investigation reproduced a client-side `500 Internal Error` when
an open tab navigated to Articles after its route module became unavailable.
Refreshing the same URL succeeded. This is an application error screen caused by
a failed JavaScript import, even though the static HTML itself remains available.

Two production settings combined to cause this:

- Deployment deleted every object absent from the new build, including hashed
  modules still referenced by open tabs.
- `kit.version.name` defaulted to the unchanged package version `0.1.0`. SvelteKit
  checks the version after a navigation failure, but could not detect a release.

A read-only production check also confirmed an earlier build's
`/_app/immutable/nodes/39.dPb2iXiC.js` returned 404 while `/_app/version.json`
continued to advertise `0.1.0`.

## Publication policy

- `scripts/build-version.mjs` hashes local source, content, static assets, build
  scripts and configuration. It includes uncommitted changes and new files.
  Identical inputs produce identical IDs; build output and Git state are excluded.
- Upload assets first, then pages and data, then the version marker. A failed
  phase prevents subsequent phases from starting.
- Preserve all previous `_app/immutable/` files, including compressed variants.
  Their storage grows across releases; they are intentionally not part of routine
  stale-object deletion. Removed pages and other obsolete files are still deleted.
- HTML and JSON require revalidation; the version marker uses `no-store`.
  Existing objects are uploaded again if cache policy changed, even when their
  bytes match. Existing CDN entries may retain their prior TTL until it expires.
- No global error suppression or unconditional reload handler is added. The
  framework's existing version-aware recovery performs the native navigation.

Already-deleted historical chunks are not restored by this change. Publishing a
new version lets affected old clients detect the update and recover. These
changes take effect on production only when `npm run deploy` publishes the build.

## Verification

- `node --test tests/deployment.test.mjs`: version identity, old-module retention,
  publication ordering, failure isolation and cache-metadata migration.
- `node tests/navigation-release.review.mjs`: with a completed build and the local
  CDP browser at port 9334, simulate one missing route module. Confirm the old
  fixed-version behavior shows 500 and a refresh recovers; a changed version must
  recover automatically with exactly one document navigation to Articles.
- `npm run check` and `npm run build:verify-stable`: check diagnostics, build and
  validate sitemap twice, then compare all immutable assets for reproducibility.

Verification result (2026-09-22): all 235 tests passed; `npm run check` reported
zero errors/warnings; the final production build and sitemap validation passed.
Two consecutive builds produced identical immutable assets. The browser scenario
passed again against build version `9c0bd5004cf18098cb459722`.
No production deployment was performed as part of this investigation.
