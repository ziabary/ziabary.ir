import adapter from '@sveltejs/adapter-static';
import { mdsvex } from 'mdsvex';
import packageJson from './package.json' with { type: 'json' };

export default {
  extensions: ['.svelte', '.svx', '.md'],
  preprocess: [mdsvex({ extensions: ['.svx', '.md'] })],
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
