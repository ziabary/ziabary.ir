# Content workspace

This is the editorial source. Application code remains in `src/`; hardware and
model datasets live in `data/`. File locations do not define public URLs.

## Articles

```text
articles/<fa|en|es>/<slug>/
  index.md
  images/                 # Local media, ignored by Git
  files/                  # Optional downloads, ignored by Git
```

Each edition has its own directory. Preserve its frontmatter `slug`, `lang`,
`date`, optional `updated`, manual `related` order, and translation relationship.
Folder locale and slug must match the frontmatter. Editions are optional.
Drafts stay in the same location with `draft: true`. The permanent draft
restriction on `kazan-investment-reality` must remain in force.

Use ordinary HTML or Markdown:

```html
<figure>
  <img src="./images/airport.webp" alt="فرودگاه کازان" loading="lazy" />
  <figcaption>فرودگاه کازان</figcaption>
</figure>
```

Relative image paths, download links and frontmatter cover paths are resolved
at build time. The asset manifest in `relationships/asset-paths.json` preserves
legacy paths, including articles that share an illustration. Existing absolute
URLs still work. New article images default to `/images/articles/<slug>/`.
Only allowed media files are copied; Markdown, JSON and working notes are not
copied to the public directory.

### Images shared across editions

Keep a shared image once in `articles/shared/<image-set>/images/`. The manual
`relationships/image-sets.json` map connects edition IDs (`fa:slug`, `en:slug`,
`es:slug`) to their shared set; it does not create or infer translations.
All editions can use `./images/cover.webp`. Resolution uses an existing local
image first, then the shared set. This permits a translated diagram or a
language-specific cover without copying common images into every edition.
Only the source folder changes: legacy public URLs remain those in the asset
map. To add a shared photo, edit the shared folder; to override it in one
edition, add the corresponding file to that edition's `images/` folder.
When historical URLs pointed to identical copies, `relationships/asset-aliases.json`
retains both public files while only one original is maintained in the source.

## Other editorial records

- `guides/`: ordered collections and announcements with stable IDs.
- `media/`: coverage summaries, publisher references and videos.
- `resumes/`: independent language editions; original CV PDFs remain in downloads.
- `gallery/`: albums, captions and local images.
- `presentations/courses/`: course definitions.
- `presentations/deliveries/`: dated delivery metadata and translations.
- `presentations/decks/`: versioned deck metadata and local PDF/image files.
- `relationships/`: explicit translations, LLM reading order and public asset mapping.
- `profile/`: shared social links.

Supporting research and review notes remain in `docs/`. Local-only writing stays
in ignored `local-drafts/`; server drafts belong with normal articles.

## Git and builds

Text and structured source records are versioned. Raster images, PDFs, video, archives
and review screenshots are kept locally and backed up separately. Ignored
files still participate in builds and deployment; `.gitignore` does not control
what gets uploaded. Public copies and responsive variants are generated in
`.build/public/`. `static/` holds only declared public inputs; builds do not write
there. View manifests and bundled icon CSS are generated in `.build/generated/`.
The final deployable site remains in `build/`, with the same public URLs.
Editable SVG/Mermaid diagrams and CSV chart sources remain versioned.
Restore the media workspace from backup before building a complete new checkout.

`npm run check` prepares sources and checks types. `npm run build` prepares
sources, copies media to the preserved URLs, produces static pages and validates
the sitemap, structured data and short links. `npm test` runs the test suite
against the built output. `npm run verify:repo-files` enforces a 5 MiB source-file
limit; generated large datasets are rebuilt from smaller versioned collections.
