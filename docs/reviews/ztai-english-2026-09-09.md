# English ZTAI edition — 9 September 2026

Five English articles are available locally in `/en/articles/` and together at
`/en/guides/zero-trust-ai/`. Their `draft: false` metadata includes them in the
static build and generated sitemap. No deployment was performed. Spanish ZTAI
remains unavailable; the existing GPU collection review route is unchanged.

## Editorial scope

The manual sequence is: introduction, MLOps, maturity model, principles and
controls, indirect data access. Source articles remain unchanged. English
publication dates match each Persian source's canonical `date` field, with
English-formatted display dates. Translation day is not the publication date.

The English edition preserves the five articles' arguments, examples, tables,
figures and external references, with editorial adaptation for clarity:

- Describe ZTAI as this collection's architectural approach. NIST zero trust
  already covers resources and workflows; do not reduce it to network security.
- Distinguish the proposed ZTAI maturity interpretation from CISA's model and
  Microsoft's operational MLOps levels. Automation is not proof of confidentiality.
- Discuss isolated, sensitive and mission-critical deployments by their technical
  constraints, without tying recommendations to a country.
- Qualify claims about administrator exclusion, synthetic data, model signatures,
  encryption, model conversion, feedback automation and adversarial robustness.
- Preserve related Persian-only reading as clearly labeled Persian links. The
  configuration-drift reference remains in the indirect-access article's prose;
  its related-article list selects available English companions.
- Link the English articles to each other, the collection and relevant English
  GPU server material. Relationships remain editorial, not automatically generated.

The introduction links to NIST SP 800-207; the maturity introduction links to the
CISA and Microsoft source frameworks. These do not imply endorsement of this
collection's proposed maturity stages. This translation is not a new exhaustive
technical audit of every external reference.

## Images

Inspected the collection cover, five article covers and eleven unique inline
raster diagrams. Covers contain no Persian text requiring replacement; the
raster diagrams already use English labels.

The two Persian SVGs in `ztai-indirect-data-access` have separate English
counterparts:

- `indirect-access-path-en.svg`
- `controlled-processing-boundaries-en.svg`

These redraw the same conceptual flows with English text, accessible titles and
descriptions. The original Persian assets remain unchanged. No English image
replacement is outstanding for this collection. All images are local and bounded
by the article text width.

## Validation

- `npm run check`: zero errors; two existing unused CSS warnings in GpuComparison.
- `node --test tests/ztai-locales.test.mjs`: passes. Covers publication state,
  editorial order, draft/language guards, related links, local images and retention
  of original external references.
- `npm run build`: succeeds with 144 sitemap URLs and 144 valid JSON-LD blocks.
- Browser checks: clickable English collection, five embedded and five standalone
  articles, archive links, loaded local images, desktop sticky navigation and
  active section, and no horizontal overflow at 1440px and 390px. Spanish ZTAI
  remains unlinked.
