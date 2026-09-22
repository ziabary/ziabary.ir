import adapter from '@sveltejs/adapter-static';
import { mdsvex } from 'mdsvex';
import markdownImages from './scripts/markdown-images.mjs';
import markdownHeadings from './scripts/markdown-headings.mjs';
import markdownLinks from './scripts/markdown-links.mjs';
import markdownTables from './scripts/markdown-tables.mjs';
import remarkMath from 'remark-math';
import markdownMath from './scripts/markdown-math.mjs';
import { buildVersion } from './scripts/build-version.mjs';

const markdownOptions = { extensions: ['.svx', '.md'], remarkPlugins: [markdownHeadings, markdownImages], rehypePlugins: [markdownLinks, markdownTables] };
const markdown = mdsvex(markdownOptions);
const mathMarkdown = mdsvex({ ...markdownOptions, remarkPlugins: [remarkMath, markdownHeadings, markdownMath, markdownImages] });

export default {
  extensions: ['.svelte', '.svx', '.md'],
  preprocess: [{ markup(options) {
    // Opt in explicitly so dollar amounts and shell examples in older articles stay literal.
    const frontmatter = /^---\r?\n([\s\S]*?)\r?\n---/.exec(options.content)?.[1] ?? '';
    return (/^math:\s*true\s*$/m.test(frontmatter) ? mathMarkdown : markdown).markup(options);
  } }],
  kit: {
    // Stable for identical inputs, different for each changed release. SvelteKit
    // uses this ID to recover navigation when a tab still runs an older build.
    version: {
      name: process.env.APP_VERSION || buildVersion(import.meta.dirname)
    },
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: undefined,
      precompress: true,
      strict: true
    }),
    prerender: {
      handleHttpError: 'fail'
    }
  }
};
