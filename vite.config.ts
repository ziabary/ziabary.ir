import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import articleMetadata from './scripts/article-metadata-plugin.mjs';

export default defineConfig({
  // The LLM source data and lazy edition catalogs are shared with the static generator.
  server: { fs: { allow: ['./data/llm'] } },
  plugins: [articleMetadata(), sveltekit()]
});
