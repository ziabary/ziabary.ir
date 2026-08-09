# Mehran Ziabary — Personal Portal

A multilingual, Git-first personal portal built with SvelteKit, mdsvex and
adapter-static. Production output is plain static HTML, CSS and JavaScript and
can be hosted on any object storage or CDN.

## Development

    npm install
    npm run dev

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

## GitHub workflow

Every push and pull request runs type checking and creates a production build.
The static-site workflow artifact contains the exact files that can be uploaded
to object storage.

## Generic object-storage deployment

Install the AWS CLI, configure S3-compatible credentials, set S3_BUCKET,
S3_ENDPOINT and S3_REGION, then run:

    npm run deploy:s3

See docs/content-model.md for the editorial structure.
