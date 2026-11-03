import galleryEntriesContent from '../../content/gallery/albums.json';
export type GalleryLocale = 'fa' | 'en' | 'es';
export type GalleryImage = {
  src: string;
  alt: string;
  caption?: string;
  /** A non-empty caption enables this individual photo in the target language. */
  translations?: Partial<Record<Exclude<GalleryLocale, 'fa'>, {
    caption: string;
    alt?: string;
  }>>;
};
export type GalleryItem = {
  id: string;
  title: string;
  caption: string;
  date: string;
  faDate: string;
  sourceUrl?: string;
  images: GalleryImage[];
  translations?: Partial<Record<Exclude<GalleryLocale, 'fa'>, {
    title?: string;
    caption?: string;
  }>>;
};
const galleryEntries: GalleryItem[] = galleryEntriesContent as GalleryItem[];
// Gallery chronology is data-driven so new entries never need to be inserted
// at a particular array position. ISO dates make the ordering deterministic.
export const galleryItems = [...galleryEntries].sort((a, b) => b.date.localeCompare(a.date));
/** Translate and filter before choosing a cover or opening the lightbox.
* Album translations never grant publication to untranslated photos.
*/
export function localizeGallery(items: GalleryItem[], locale: GalleryLocale): GalleryItem[] {
  if (locale === 'fa') return items;

  return items.flatMap((item) => {
    const images = item.images.flatMap((image) => {
      const translation = image.translations?.[locale];
      const caption = translation?.caption?.trim();
      if (!caption) return [];
      return [{ src: image.src, caption, alt: translation?.alt?.trim() || caption }];
    });
    if (!images.length) return [];

    const translation = item.translations?.[locale];
    return [{
      id: item.id,
      date: item.date,
      faDate: item.faDate,
      ...(item.sourceUrl ? { sourceUrl: item.sourceUrl } : {}),
      title: translation?.title?.trim() || images[0].caption,
      caption: translation?.caption?.trim() || images[0].caption,
      images
    }];
  });
}
