export type ArticleDraft = {
  title: string;
  slug: string;
  lang: 'fa' | 'en' | 'es';
  date: string;
  faDate: string;
  updated: string;
  faUpdated: string;
  category: string;
  excerpt: string;
  readTime: string;
  related: string[];
  external: string;
  draft: boolean;
  body: string;
  retainedFrontmatter: string;
};

const editableKeys = new Set(['title', 'slug', 'lang', 'date', 'faDate', 'updated', 'faUpdated', 'category', 'excerpt', 'readTime', 'related', 'external', 'draft']);

/** Preserve fields without form controls, including their YAML lists and blocks. */
export function retainArticleFrontmatter(frontmatter: string): string {
  const lines: string[] = [];
  let retain = false;
  for (const line of frontmatter.split(/\r?\n/)) {
    const key = /^([\w-]+):/.exec(line)?.[1];
    if (key) retain = !editableKeys.has(key);
    if (retain) lines.push(line);
  }
  return lines.join('\n').trim();
}

export function articleMarkdown(input: ArticleDraft): string {
  const yaml = (value: string) => JSON.stringify(value.trim());
  return [
    '---',
    `title: ${yaml(input.title || 'عنوان مقاله')}`,
    `slug: ${input.slug}`,
    `lang: ${input.lang}`,
    `date: ${input.date}`,
    `faDate: ${yaml(input.faDate || 'تاریخ فارسی')}`,
    ...(input.updated ? [`updated: ${input.updated}`] : []),
    ...(input.updated && input.faUpdated.trim() ? [`faUpdated: ${yaml(input.faUpdated)}`] : []),
    `category: ${yaml(input.category)}`,
    `excerpt: ${yaml(input.excerpt || 'خلاصه مقاله')}`,
    `readTime: ${yaml(input.readTime)}`,
    'related:',
    ...input.related.map(slug => `  - ${slug}`),
    ...(input.external.trim() ? [`external: ${yaml(input.external)}`] : []),
    `draft: ${input.draft}`,
    ...(input.retainedFrontmatter ? [input.retainedFrontmatter] : []),
    '---', '', input.body.trim(), ''
  ].join('\n');
}
