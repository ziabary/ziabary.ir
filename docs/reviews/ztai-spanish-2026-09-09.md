# Spanish ZTAI edition — 9 September 2026

The five articles from the English ZTAI edition are translated into Spanish and
available locally at `/es/guides/zero-trust-ai/` and `/es/articles/`. No deployment
is part of this update. The collection shares the English layout, with Spanish
navigation, metadata, related-reading labels and links.

## Editorial scope

- Preserve all five articles' arguments, examples, tables and external references.
- Preserve the manual reading order and related-article relationships, pointing
  to their Spanish counterparts.
- Use the Persian original's canonical publication `date`, with Spanish display
  dates; do not date an article by its translation day.
- Keep the distinction between this collection's proposed ZTAI architecture and
  official standards or certification. Preserve the qualifications on indirect
  access, output disclosure, administrator privileges and attestation.
- Discuss isolated and sensitive workloads by their technical constraints rather
  than tying recommendations to a country.
- Link to Spanish GPU articles where available. Links to the four supporting
  Persian-only articles are explicitly labeled «en persa».

## Images

All images are local. The two editable diagrams in the indirect-access article
have Spanish versions in the existing article asset directory:

- `static/images/articles/ztai-indirect-data-access/indirect-access-path-es.svg`
- `static/images/articles/ztai-indirect-data-access/controlled-processing-boundaries-es.svg`

Covers require no text translation. The eleven existing raster diagrams retain
English labels; their alt text and captions are Spanish, and captions identify
that the labels remain in English. No Persian-labeled diagram is used in the
Spanish articles. English and Persian source assets remain unchanged.

## Checks

`tests/ztai-locales.test.mjs` now covers both editions, checking manual order,
publication and language guards, matching original dates, valid internal links,
local image assets and retention of the English references and relationships.

The build also found a link in the Persian SMS article to its Spanish translation,
which is currently a draft. That unavailable translation link was removed; the
Spanish SMS article remains a draft.

Validation completed with zero check errors (two existing unused CSS warnings),
seven passing localization tests, and a successful static build. Browser checks
cover all five standalone and embedded articles, archive links, loaded images,
sticky navigation and active-section tracking, and no horizontal overflow at
1440px and 390px. English navigation was also checked after sharing the viewer.
The generated sitemap and JSON-LD validation cover 149 pages: six Spanish ZTAI
routes added and the previously published Spanish SMS route excluded as a draft.
