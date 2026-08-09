import adapter from '@sveltejs/adapter-static';
import { mdsvex } from 'mdsvex';

export default {
  extensions: ['.svelte', '.svx', '.md'],
  preprocess: [mdsvex({ extensions: ['.svx', '.md'] })],
  kit: {
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
