import { getContext, setContext } from 'svelte';
import type { LlmI18n } from './runtime';
const key = Symbol('llm-edition');
export function setLlmI18n(i18n: LlmI18n) { setContext(key, i18n); }
export function getLlmI18n(): LlmI18n {
  const i18n = getContext<LlmI18n>(key);
  if (!i18n) throw new Error('LLM components require an explicit edition context');
  return i18n;
}
