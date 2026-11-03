# Working instructions

## Product

This repository is Mehran Ziabary's multilingual professional portal. Persian
is the primary edition. English and Spanish are independent editorial streams;
do not assume every article has a translation.
Keep political and Iran-specific articles in the Persian edition unless the
user explicitly requests their translation. For English and Spanish technical
articles, use a general technical setting for illustrations rather than Iranian
maps, political scenes or local symbols.

## Architecture constraints

- Keep SvelteKit, mdsvex and adapter-static.
- The production result must remain deployable as static files from build/.
- Do not add a database, server endpoints or runtime-only rendering without an
  explicit architecture decision.
- Do not introduce Tailwind. Keep the current plain CSS structure.
- Preserve RTL behavior, Persian digits and light/dark themes.
- Article relationships are editorial and manual; never reorder or generate
  frontmatter related lists automatically.
- Media entries contain a summary and link to the original publisher. Do not
  copy full third-party articles.
- Courses, deliveries and slide-deck versions are distinct concepts.

## Content

- Articles live in `content/articles/<lang>/<slug>/index.md` as Markdown.
- Article images live beside the article in `images/`; `./images/file.webp`
  works in Markdown and HTML. Existing public image URLs remain stable through
  `content/relationships/asset-paths.json`. Never change URLs during file moves.
- Shared article images live once in `content/articles/shared/<image-set>/images/`;
  explicit edition membership lives in `content/relationships/image-sets.json`.
  Relative images resolve to an existing local override, then the shared set.
  Do not duplicate common images across language directories.
- `content/` owns editorial records; `data/gpu`, `data/servers` and `data/llm`
  own technical datasets. `src/` contains types, loaders, calculations and UI.
- `static/` contains declared public source files and is read-only during builds.
  Stage public sources and generated media/search/compatibility files under
  `.build/public/`; generated view manifests and icon CSS belong in
  `.build/generated/`. SvelteKit reads assets there and emits the final `build/`.
  Build commands must never generate files in `static/` or `src/lib/generated/`.
- Slide PDFs live in `content/presentations/decks/files/<course-slug>/` and
  remain served at `/slides/<course-slug>/`. Courses, deliveries and decks have
  separate catalogs under `content/presentations/`.
- Media, PDFs, archives, screenshots and generated catalogs stay outside Git.
  Do not force-add ignored files. `npm run verify:repo-files` rejects source
  files of 5 MiB or more. A media backup is required separately from Git.
- Edit LLM records in `data/llm/v0.3.0/records/*.json`; `repository.json` and
  `data/llm/generated/` are rebuilt caches. Import tools use `llm_repository.py`.
- Draft content must set draft: true.
- `kazan-investment-reality` is permanently a draft by explicit user instruction.
  Keep its restriction in `src/lib/publication.mjs`; server previews are allowed,
  promotion to publication is prohibited.
- For significant LLM, GPU or server dataset additions/changes, add a concise
  announcement in `content/guides/updates.json` with a unique, stable short ID,
  the dataset-change date and fa/en/es copy. Preserve IDs across wording fixes;
  do not generate announcements or new IDs on every build. See
  `docs/guide-updates.md` for visibility and browser-storage behavior.
- Translations retain the original article's publication `date`; format the
  displayed date for the target language. Do not replace it with translation day.
- The personal phone number must appear only inside downloadable CV files,
  never in page content, client data, contact links or structured data.
- Résumé editions are editorially independent. English and Spanish content in
  `content/resumes/en.json` and `es.json` follows each language's CV PDF in
  `static/downloads/`; do not synchronize their roles or dates with Persian.

## Required checks

Before committing:

    npm run check
    npm run build

Both commands must pass with zero errors.

Every production update must use `npm run build`: it generates the sitemap
from the newly prerendered pages and validates it before the build succeeds.
Do not maintain a manual `static/sitemap.xml` or skip sitemap validation.
Draft/noindex pages must remain excluded. `npm run deploy` rebuilds first;
the deployment script also validates the sitemap before any remote operation.
