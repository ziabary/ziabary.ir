# English GPU collection — editorial review

Prepared on 9 September 2026. Publication status corrected on 12 September 2026 following the site owner’s confirmation: **the English and Spanish collections are published.** See [the Spanish review notes](../gpu-selection-es/README.md).

The seven standalone English articles now have `draft: false` and appear in
`/en/articles/`, the static build and sitemap. The same applies to the seven
Spanish articles in `/es/articles/`. This correction updates the local build; it does not deploy other pending changes.

For local collection review, run `npm run build` and `npm run preview:local`, then open
`http://127.0.0.1:4186/en/guides/gpu-selection/`. The collection includes both interactive
tables and all seven articles. It is registered in the technical guides, search index
and sitemap, with canonical and language alternate links and no draft label. Other
unpublished articles remain excluded from the public archives.

Open [the collection preview](review/index.html). It includes seven articles, two working comparison tables, and links to seven standalone article previews. Images, charts, logos, CSS and JavaScript are local; reading and using the tables does not require the original publishers to be online. Source links still open the original websites.

Rebuild the review from the repository root:

```sh
node docs/drafts/gpu-selection-en/build-preview.mjs
```

The generated `review/` directory is ignored by Git and is outside both `static/` and the production `build/`. It can be copied as a folder for review. Open `index.html` in a browser.

## Editorial decisions

- Seven English Markdown files are in `src/lib/content/articles`, with unique `-en` slugs, `lang: en` and `draft: false`. This avoids collisions with Persian slugs in the existing content loader. They have standalone article routes and sitemap entries in the production build.
- `collection.json` records the English introduction, reading paths and manual collection order. It has `draft: false` and supplies the published guide registration; its existing path is retained for the editorial review tools.
- Iran-specific recommendations have been reframed around budget constraints, open-weight model deployments, incremental expansion, support eligibility, activation, returns and service coverage. The articles do not generalize one market's circumstances to all organizations.
- The INT8/FP8 quality discussion now covers multilingual and domain-specific documents, including extraction, negation, conditions and structured output.
- Editorial notes about correcting earlier versions have been replaced with direct explanations. Historical benchmark screenshots retain their context and are explicitly separated from current purchasing advice.
- Related lists and in-text links were selected manually. The security article has an explicit “Persian” label because no English translation is part of this review.
- The GPU/server tables use the shared records and preserve numeric specifications, sources and internal filter keys. English text lives in `src/lib/i18n/gpu-data.en.json` and `gpu-ui.en.json`; `gpu.ts` localizes display fields without copying numerical data. A changed Persian source string needs an English editorial update; the localization test catches missing translations.
- Application-level GPU sharing is described separately from native vGPU/MIG and hardware isolation. The English text does not claim universal qualification for an unnamed service platform.

## Image review

**One replacement is needed:**

| Article | Existing image | Required replacement |
|---|---|---|
| Selecting a PCIe GPU server | [`cover.png`](../../../static/images/articles/pcie-gpu-server-selection/cover.png) | The checklist labels are Persian. Supply an English cover, preferably with the same landscape proportions. |

The original is retained in the draft; the replacement is recorded here and in the collection manifest. No replacement has been generated and no supplied image has been edited.

The other 14 collection/article images and charts were checked:

- Collection cover and the covers for GPU types, PCIe/SXM, GPU selection, INT8/FP8, server components and DGX/HGX: no Persian text requiring replacement.
- Two diagrams in PCIe/SXM: English labels; historical comparisons are identified in captions.
- Four benchmark charts in GPU selection: English labels; historical pricing and workload limitations are stated. The training chart is identified as latency, with lower values preferred.
- The INT8/FP8 ratio chart: already in English, including its source and specification-versus-benchmark qualification.

Existing image files are reused. The generated preview copies them locally for portability; it does not add a second tracked image collection.

## Technical points checked during adaptation

1. H100 PCIe 80 GB uses **HBM2e**, while H100 SXM 80 GB uses HBM3. The English article, the shared H100 PCIe record and the corresponding Persian sentence were corrected against the [official H100 PCIe product brief](https://www.nvidia.com/content/dam/en-zz/Solutions/gtcs22/data-center/h100/PB-11133-001_v01.pdf).
2. NVIDIA AI Enterprise subscription wording was checked against the [licensing guide](https://docs.nvidia.com/ai-enterprise/planning-resource/licensing-guide/latest/licensing.html). The article retains the exact qualifying products and the need to confirm activation and support conditions.
3. B300 INT8 values differ across NVIDIA sources. The [technical brief](https://dam-cdn.nvd.orangelogic.com/AssetLink/gl2l4l4812s5fw0p614s6i8bv6mi3vx5.pdf#page=25) supplies the chart's 150 dense TOPS; the [Ultra datasheet](https://dam-cdn.nvd.orangelogic.com/AssetLink/1k0p832eq8r5ca0u5383ie5o4tp3bst1.pdf#page=5) gives 153.5 after removing sparsity; the [live HGX table](https://www.nvidia.com/en-us/data-center/hgx/) implies 187.5 per GPU from 3 sparse POPS across eight GPUs. The English article explicitly explains why the interactive table and fixed chart differ. The chart's data has not been silently changed. This explanation is also a useful follow-up for the Persian INT8/FP8 article.

This is an adaptation of the existing collection, not a new audit of every hardware specification or an independent GPU benchmark.

## Validation and publication boundary

```sh
node --test tests/gpu-locales.test.mjs
npm run check
npm run build
```

The localization tests cover numerical/source preservation, no mutation of Persian data, translation completeness, draft metadata, internal article links and image paths. Browser checks cover hydration, row details, comparisons, filtering, GPU profiles, CSV output, local images, mobile width and the two themes.

After English editorial approval and the replacement cover, register the collection at `/en/guides/gpu-selection/`, enable its English guide-index card. The standalone articles are already publishable. Remove the development guard and the targeted `handleUnseenRoutes` exception in `svelte.config.js` when adding published entries for the English collection route. The Spanish draft follows the reviewed English adaptation and remains independently subject to editorial approval. Keep the targeted exception for any collection route that still has only development entries.
