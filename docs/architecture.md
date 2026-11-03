# Architecture

## Build pipeline

Markdown and Svelte source are compiled by SvelteKit. adapter-static prerenders
every route and writes the deployable site to build/. GitHub Actions performs
the same check and build on every pull request and push to main.

## Routes

- / — Persian portal
- /articles/ and /articles/<slug>/ — chronological archive and article pages
- /guides/ — technical subset of articles
- /thought/ — stable intellectual statement
- /media/ — summaries and original-source links
- /slides/ and /slides/<slug>/ — course and deck archive
- /resume/ — factual professional profile
- /gallery/ — selected images
- /en/ and /es/ — independent international landing pages

## Content loading

src/lib/content/index.ts imports Markdown modules from content/articles/<lang>/<slug>/index.md with import.meta.glob and exposes
serializable metadata for indexes and prerender entries. The dynamic article
route resolves the matching mdsvex component at build time.

## Deployment

The build directory contains only static assets. It can be synced to S3,
ArvanCloud Object Storage, Cloudflare R2 or another compatible service. CDN
configuration should:

- serve index.html for directory requests;
- use a short cache lifetime for HTML;
- use a long immutable cache lifetime for hashed _app assets;
- return the generated 404.html for unknown paths.

Editorial records live in `content/`, technical catalogs in `data/`, and types,
loaders and UI in `src/`. Shared article images have one source in
`content/articles/shared/<image-set>/images/`; explicit membership and stable
public asset paths live in `content/relationships/`. See `content/README.md`.

`static/` is a read-only source directory. Preparation assembles public inputs
and generated content assets under `.build/public/`; `kit.files.assets` points
there. Generated view metadata lives in `.build/generated/`. The adapter emits
`build/` without changing existing public paths.
