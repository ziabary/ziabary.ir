import { error } from '@sveltejs/kit';
import { topics } from './topics';
import type { Locale } from './editions';
export const topicEntries = (locale: Locale) => topics.filter(t => t.locale === locale).map(t => ({ topic: t.slug }));
export function loadTopic(locale: Locale, slug: string) {
  const topic = topics.find(t => t.locale === locale && t.slug === slug);
  if (!topic) error(404, 'Topic not found');
  return { topic };
}
