import llmGuideCollectionContent from '../../../content/guides/fa/llm.json';
import { llmEditionSlugs } from './edition-manifest';
import type { GuideCollection } from '$lib/guides';

export const llmGuideCollection: GuideCollection = { ...llmGuideCollectionContent, articleCount: llmEditionSlugs('fa').length } as GuideCollection;

