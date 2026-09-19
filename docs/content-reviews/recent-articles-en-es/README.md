# English and Spanish editions of the two recent articles

Editorial review: 19 September 2026. Local publication only.

## Editions

- `gpu-confidential-computing-overhead-en` and `gpu-confidential-computing-overhead-es`: retain 19 September 2026.
- `ztai-autonomous-agents-bounded-authority-en` and `ztai-autonomous-agents-bounded-authority-es`: retain 18 September 2026.
- All four have `draft: false`, language-specific metadata and an explicit translation group. The Persian ZTAI original now declares the same group.

## Editorial decisions

- Complete article structure retained, including subheadings, quantitative tables, limitations and external source URLs. No publication dates were reset to translation day.
- GPU editions retain the corrected NCCL reductions and the 24.1% FP8 step-time increase. They distinguish throughput loss from duration increase and uncontrolled comparisons between different models from before/after measurements.
- SM read bandwidth reduction is 18.1% rounded to one decimal from 7693/9388; the Persian row is aligned. A duplicated Persian diacritic was also corrected.
- Cover assets remain local and shared. The chart has separate English and Spanish SVGs with localized labels and number formatting, rendered with Matplotlib from unchanged measurements. The five-repeat qualification remains beside it in each article. See `../gpu-confidential-computing-overhead/plot-translations.py`.
- The ZTAI maintenance scenario remains hypothetical. Architectural proposals are distinguished from capabilities or guarantees supplied by standards, MCP and preview APIs.
- Links prefer published editions in the reader's language. The kernel/GPU security and data/model engineering articles have no translations. Translations of the runtime comparison, coding-agent and enterprise RAG articles are still drafts. Links to these subjects explicitly identify the published Persian destination; their drafts remain unchanged.
- Related lists are manual and contain published, older articles in the target language. Existing older article bodies were not given references to newer articles.
- GPU chapters follow latency/throughput in each localized collection. The new ZTAI chapter follows indirect data access. Collection introductions now include agent authority rather than calling indirect access the final chapter.

## Source and metadata validation

All four editions passed a direct check of dates, draft flags, translation groups, external URL parity, heading counts, local assets, related-article languages and target publication chronology. The existing ZTAI locale checks and `npm run check` passed.

## Build and browser verification

- The first unrestricted-heap build was terminated with exit 137 under low system memory. `NODE_OPTIONS=--max-old-space-size=1536 npm run build` then completed successfully, including all normal preparation and production validators.
- Sitemap: 193 indexable pages. Structured data: 225 blocks across 225 pages. Short links: 234 destinations and fragments validated.
- Browser review passed for all four articles at 1440 and 390 pixels: correct language and original publication date, no horizontal page overflow or broken visible images, all body links returning HTTP 200, and Persian/English/Spanish hreflang members present.
- Both GPU editions render the equation and their localized chart. All four localized collection anchors exist and fit the mobile viewport.
- No commit, push or remote deployment was performed.
