import generated from './generated/image-sources.json';
type ImageVariants = { width: number; height: number; base: string; widths: number[] };
const images: Record<string, ImageVariants> = generated;
export function imageAttributes(src: string | undefined | null, sizes = '(min-width: 1200px) 740px, calc(100vw - 32px)') {
  const item = src ? images[src] : undefined;
  if (!item) return { src: src ?? undefined };
  return {
    'data-original-src': src!,
    src: `${item.base}-${item.widths.find(width => width >= 960) ?? item.widths.at(-1)}.webp`,
    srcset: item.widths.map(width => `${item.base}-${width}.webp ${width}w`).join(', '), sizes,
    width: item.width, height: item.height, decoding: 'async' as const
  };
}
