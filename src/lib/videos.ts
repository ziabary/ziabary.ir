import videoItemsContent from '../../content/media/videos.json';
import type { MediaItem } from './news';

export type VideoItem = Omit<MediaItem, 'coverImage' | 'coverImageAlt' | 'editorialNote'> & {
  thumbnail?: string;
  clip?: string;
  clipDuration?: string;
  icon: string;
};

// Long-form recordings and selected clips. Duplicate mirrors and social
// reposts are deliberately omitted in favour of the most complete source.
export const videoItems: VideoItem[] = videoItemsContent as VideoItem[];
