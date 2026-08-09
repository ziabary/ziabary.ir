# Working instructions

## Product

This repository is Mehran Ziabary's multilingual professional portal. Persian
is the primary edition. English and Spanish are independent editorial streams;
do not assume every article has a translation.

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

- Articles live in src/lib/content/articles as Markdown.
- Images live under static/images/articles/<slug>/.
- Slide PDFs live under static/slides/<course-slug>/.
- Draft content must set draft: true.

## Required checks

Before committing:

    npm run check
    npm run build

Both commands must pass with zero errors.
