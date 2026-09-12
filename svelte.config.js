import adapter from '@sveltejs/adapter-static';
import { mdsvex } from 'mdsvex';
import markdownImages from './scripts/markdown-images.mjs';
import markdownHeadings from './scripts/markdown-headings.mjs';
import markdownLinks from './scripts/markdown-links.mjs';
import remarkMath from 'remark-math';
import markdownMath from './scripts/markdown-math.mjs';
import packageJson from './package.json' with { type: 'json' };

const markdownOptions = { extensions: ['.svx', '.md'], remarkPlugins: [markdownHeadings, markdownImages], rehypePlugins: [markdownLinks] };
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
    // SvelteKit otherwise uses Date.now() as the version name. That timestamp is
    // embedded in the client runtime and gives unchanged JS files a new hash on
    // every build, needlessly invalidating long-lived CDN caches.
    //
    // Keep the runtime version stable by default. Vite/Rollup still content-hash
    // every CSS and JS asset, so files get a new URL whenever their actual
    // contents change. APP_VERSION can be set explicitly for a forced rollout.
    version: {
      name: process.env.APP_VERSION || packageJson.version
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
