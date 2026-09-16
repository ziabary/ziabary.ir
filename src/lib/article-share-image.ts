// Loaded only after opening a share dialog. Reuse the JPEG across the footer and
// floating controls without downloading or decoding every article in a guide.
const prepared = new Map<string, Promise<File>>();

export function prepareArticleShareImage(cover: string): Promise<File> {
  const source = new URL(cover, window.location.origin);
  if (source.origin !== window.location.origin) return Promise.reject(new Error('Expected a local article cover'));
  const key = source.href;
  const cached = prepared.get(key);
  if (cached) return cached;
  const task = (async () => {
    const response = await fetch(source.href, { signal: AbortSignal.timeout(15000) });
    if (!response.ok) throw new Error('Cover unavailable');
    const blob = await response.blob();
    if (!blob.type.startsWith('image/')) throw new Error('Expected an image');
    const objectUrl = URL.createObjectURL(blob);
    try {
      const image = new Image();
      image.src = objectUrl;
      await image.decode();
      const scale = Math.min(1, 1600 / Math.max(image.naturalWidth, image.naturalHeight));
      const canvas = document.createElement('canvas');
      canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
      canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
      const context = canvas.getContext('2d');
      if (!context) throw new Error('Image preparation unavailable');
      context.fillStyle = '#ffffff';
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      const jpeg = await new Promise<Blob>((resolve, reject) => canvas.toBlob(
        value => value ? resolve(value) : reject(new Error('Image encoding failed')), 'image/jpeg', 0.9
      ));
      const slug = source.pathname.split('/').at(-2)?.replace(/[^a-z0-9-]/gi, '') || 'article';
      return new File([jpeg], `ziabary-${slug}.jpg`, { type: 'image/jpeg' });
    } finally { URL.revokeObjectURL(objectUrl); }
  })();
  prepared.set(key, task);
  while (prepared.size > 4) prepared.delete(prepared.keys().next().value!);
  task.catch(() => { if (prepared.get(key) === task) prepared.delete(key); });
  return task;
}
