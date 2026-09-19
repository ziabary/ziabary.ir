# LLM data: current source of truth

Edit `v0.3.0/repository.json`. `src/lib/llm/data/*.v1.ts` are generated;
`v1` is a stable import name, not the dataset version. The guide also consumes
`v0.2.0/data/*.json` plus `v0.3.0/planning-{artifacts,sources}.json`.

```sh
npm run generate:llm
npm run verify:llm
npm run check
npm test
npm run build
```

`repository.updatedOn` and `manifest.asOf` describe the last reviewed technical
snapshot, not build time or the day a translation was written. Source access,
source publication, model release and evaluation dates remain separate.

The validator checks generated modules, types, reference resolution, evidence,
claims, artifact bytes and reviewed supplement hashes. It validates the merged
repository too. Its JSON report contains live counts; historical counts in
import reports are snapshots, not quotas.

## Merge contract

Models and technical IDs are shared across editions. Supplement artifacts merge
only by model, distribution URL and exact file set. Quality results merge only
when identity is established: model, benchmark/version, metric/unit/value,
language scope, mode, reporter, source revision and relevant protocol must agree.
Missing language or source revision cannot prove identity. Similar-looking scores
are retained separately with provenance rather than silently removed. Source
commits never stand in for evaluated-weight commits.

The old `v0.2.0/manifest.json`, `checksums.json` and `validate.py` describe the
original import plus its recorded initial removals; they are archival. They do
not validate the edited supplement. `v0.3.0/research/required-existing-data.json`
is the current reviewed dependency manifest checked by `npm run verify:llm`.
The upstream package's original checksums are retained as historical evidence.

Interactive rental/cost data remains removed at the owner's request. The cost
article is editorial content, not a reason to restore those tables.

Archive provenance and prior review reports remain under each version's
`research/` and `docs/content-reviews/`. Preview is not access control. Draft
routes remain noindex and absent from the public sitemap.

## Reference integration reviewed 2026-09-19

The 2026-09-16 reference pack is archived, unchanged, under
`v0.3.0/research/reference-pack-2026-09-16/`. It is an import input, not a second
runtime repository. The canonical `v0.3.0/repository.json` owns model facts,
published results and their original report observations, comparison policies,
selection guidance, article inserts and the ParetoQ quality study. The archived
baseline fingerprints are not restoration targets.

Reproduce the integration in this order:

```sh
python3 data/llm/v0.3.0/research/reference-pack-2026-09-16/validate.py
python3 scripts/import-llm-reference-pack.py
npm run generate:llm
python3 scripts/integrate-llm-reference-articles.py
node scripts/validate-llm-dataset.mjs --update-manifest --report data/llm/v0.3.0/research/reference-import-validation.json
python3 scripts/check-llm-reference-idempotency.py
npm run check
npm test
npm run build
```

`reference-import-mapping.json` records preserved identities and reviewed
same-experiment merges. `reference-editorial.json` contains the inline-linked
versions of the eight article inserts; `reference-complete-article-merges.json`
records the semantic integration of the four supplied localized articles into
longer existing editions. The article integration script updates only explicitly
marked sections at reviewed headings, and retains publication dates and manual
related lists. `LlmReferenceGuidance` reads the same generated central guidance in
articles and in the guide.

A captured source revision/hash does not identify evaluated weights. Comparison
partitions include language, metric, benchmark/version, unit and settings. Only a
documented common report or shared retrieval protocol permits a within-report
score difference; the imported groups never authorize a universal ranking or
quality ratio. `inventoryStatus: not-recorded` identifies the five official
repository links whose file inventories/byte sizes are not in this pack; it
cannot carry measured file sizes or populate memory experiments.

Local browser review: `LLM_REVIEW_ORIGIN=http://127.0.0.1:5195 node scripts/review-llm-reference.mjs`
uses the dedicated CDP browser on port 9334 and stores review artifacts under
`docs/content-reviews/llm-reference-2026-09-19/`. The collection and translated draft
articles retain the `show-drafts=true` gate and noindex policy. This workflow does
not deploy.
