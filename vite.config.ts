import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import articleMetadata from './scripts/article-metadata-plugin.mjs';
import requestNormalization from './scripts/normalize-request.mjs';

export default defineConfig({
  // The LLM source data and lazy edition catalogs are shared with the static generator.
  server: { fs: { allow: ['.', './content', './data'] } },
  plugins: [requestNormalization(), articleMetadata(), sveltekit()]
});
