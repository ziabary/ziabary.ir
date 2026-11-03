import { readdir, readFile, writeFile, mkdir, stat } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { createHash } from 'node:crypto';
import { writeResponsiveImage } from './responsive-image.mjs';
const run = promisify(execFile);
async function files(dir) {
  return (await Promise.all((await readdir(dir, { withFileTypes: true })).map(entry => entry.isDirectory() ? files(`${dir}/${entry.name}`) : `${dir}/${entry.name}`))).flat();
}
await mkdir('.build/public/images/responsive', { recursive: true });
await mkdir('.build/generated', { recursive: true });
const manifest = {}, pdfs = {};
const images = (await files('.build/public')).filter(file => /\.(png|jpe?g|webp)$/i.test(file) && !file.includes('/responsive/') && (file.startsWith('.build/public/images/') || file.startsWith('.build/public/slides/')));
let done = 0;
const queue = [...images];
await Promise.all(Array.from({ length: 4 }, async () => {
  while (queue.length) {
    const path = queue.shift();
    const original = await readFile(path);
    if (original.length < 20000) continue;
    const { stdout } = await run('identify', ['-format', '%w %h', path + '[0]']);
    const [width, height] = stdout.split(' ').map(Number);
    if (width < 320) continue;
    const hash = createHash('sha256').update(original).update('webp-quality-84-v1').digest('hex').slice(0,16);
    const variants = [];
    for (const size of [...new Set([320, 640, 960, 1440, Math.min(width, 1920)].filter(size => size <= width))].sort((a,b) => a-b)) {
      const url = `/images/responsive/${hash}-${size}.webp`;
      try { if ((await stat(`.build/public${url}`)).size < 100) throw new Error('Incomplete image'); }
      catch { await writeResponsiveImage(path, `.build/public${url}`, size); }
      variants.push({ width: size, src: url, bytes: (await stat(`.build/public${url}`)).size });
    }
    manifest[path.slice(13)] = { width, height, originalBytes: original.length, variants };
    done++;
  }
}));
// Slide originals are managed outside Git and may be absent in a source checkout.
const slides = await files('.build/public/slides').catch(error => {
  if (error.code === 'ENOENT') return [];
  throw error;
});
for (const path of slides.filter(path => path.endsWith('.pdf'))) pdfs[path.slice(13)] = (await stat(path)).size;
await writeFile('.build/generated/image-variants.json', JSON.stringify(Object.fromEntries(Object.entries(manifest).sort()), null, 2) + '\n');
const browserImages = Object.fromEntries(Object.entries(manifest).sort().map(([src, item]) => [src, {
  width: item.width, height: item.height,
  base: item.variants[0].src.replace(/-\d+\.webp$/, ''),
  widths: item.variants.map(variant => variant.width)
}]));
await writeFile('.build/generated/image-sources.json', JSON.stringify(browserImages) + '\n');
await writeFile('.build/generated/pdf-sizes.json', JSON.stringify(Object.fromEntries(Object.entries(pdfs).sort()), null, 2) + '\n');
console.log(`Prepared ${done} raster originals; ${Object.keys(pdfs).length} PDF sizes. Originals retained.`);
