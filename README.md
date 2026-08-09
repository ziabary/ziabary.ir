# Mehran Ziabary — Personal Portal

A multilingual, Git-first personal portal built with SvelteKit, mdsvex and
adapter-static. Production output is plain static HTML, CSS and JavaScript and
can be hosted on any object storage or CDN.

## Development

    npm install
    npm run dev

The dev command runs `svelte-kit sync` first, so a fresh checkout creates
`.svelte-kit/tsconfig.json` before Vite starts.

## Validation and build

    npm run check
    npm run build
    npm run preview

The deployable output is written to the build directory.

## Writing an article

Create a Markdown file under src/lib/content/articles. Frontmatter controls the
URL, language, metadata and the manually curated related-reading path:

    ---
    title: معماری یک انتخاب فنی صرف نیست
    slug: architecture-is-governance
    lang: fa
    date: 2026-02-08
    category: راهنمای فنی
    excerpt: خلاصه مقاله
    readTime: ۱۲ دقیقه
    related:
      - secure-rag-agent
      - investment-in-ai
    draft: false
    ---

Images belonging to a post should be placed under:

    static/images/articles/<slug>/

Then reference them with an absolute site path:

    ![توضیح تصویر](/images/articles/<slug>/diagram.webp)

## Local content editor

Open `/admin/` while the development server is running. The editor is entirely
browser-side: it has no account, database or server API and it never stores a
GitHub token.

It supports:

- creating or opening Markdown articles and previewing them live;
- adding images with a file picker, drag-and-drop or clipboard paste;
- writing the Markdown file and images directly into a selected local clone;
- downloading the Markdown file when direct folder access is unavailable.

Direct folder writing uses the File System Access API and works best in current
Chromium-based browsers on localhost or HTTPS. Select the repository root—the
directory that contains `package.json`. The editor writes to:

    src/lib/content/articles/<slug>.md
    static/images/articles/<slug>/<image-name>

The editor changes local files only. Review the diff, then commit and push with
Git as usual. Firefox and Safari users can use the Markdown download fallback
and save images from the image list manually.

## GitHub workflow

Every push and pull request runs type checking and creates a production build.
The static-site workflow artifact contains the exact files that can be uploaded
to object storage.

## Generic object-storage deployment

Install the AWS CLI, configure S3-compatible credentials, set S3_BUCKET,
S3_ENDPOINT and S3_REGION, then run:

    npm run deploy:s3

See docs/content-model.md for the editorial structure.
