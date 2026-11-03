import mediaSourcesContent from '../../content/media/sources.json';
import mediaItemsContent from '../../content/media/coverage.json';
export type MediaItem = {
  title: string;
  source: string;
  kind: string;
  summary: string;
  url: string;
  date: string;
  faDate: string;
  coverImage: string | null;
  coverImageAlt: string | null;
  coverImagePosition?: string;
  editorialNote: string | null;
};

export const mediaSources: Record<string, { logo: string }> = mediaSourcesContent as Record<string, { logo: string }>;

// Reports, interviews and other coverage about or quoting Mehran. Authored
// pieces live in article frontmatter and are merged into the media page there.
export const mediaItems: MediaItem[] = mediaItemsContent as MediaItem[]
