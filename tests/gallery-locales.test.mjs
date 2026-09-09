import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';

const source = await readFile(new URL('../src/lib/gallery.ts', import.meta.url), 'utf8');
const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } }).outputText;
const { localizeGallery, galleryItems } = await import(`data:text/javascript;base64,${Buffer.from(code).toString('base64')}`);
const album = (images, translations) => ({ id: 'sample', title: 'عنوان فارسی', caption: 'شرح فارسی', date: '2026-09-09', faDate: '۱۸ شهریور ۱۴۰۵', images, translations });
const photo = (src, translations) => ({ src, alt: 'متن جایگزین فارسی', translations });

test('Persian gallery retains all images and existing content', () => {
  assert.equal(localizeGallery(galleryItems, 'fa'), galleryItems);
});

test('album translation cannot publish an image without its own caption', () => {
  const items = [album([photo('/hidden.jpg')], { en: { title: 'Translated album', caption: 'Translated description' } })];
  assert.deepEqual(localizeGallery(items, 'en'), []);
});

test('only eligible photos are returned; first eligible photo becomes the cover', () => {
  const items = [album([photo('/hidden.jpg'), photo('/visible.jpg', { en: { caption: 'English caption' } }), photo('/blank.jpg', { en: { caption: '  \n ' } })])];
  const before = JSON.stringify(items);
  const result = localizeGallery(items, 'en');
  assert.deepEqual(result[0].images, [{ src: '/visible.jpg', caption: 'English caption', alt: 'English caption' }]);
  assert.equal(result[0].title, 'English caption');
  assert.equal(result[0].caption, 'English caption');
  assert.equal(JSON.stringify(items), before);
});

test('English and Spanish publication are independent, with no fallback', () => {
  const items = [album([photo('/en.jpg', { en: { caption: 'English only' } }), photo('/es.jpg', { es: { caption: 'Solo español', alt: 'Descripción accesible' } })])];
  assert.deepEqual(localizeGallery(items, 'en')[0].images.map(i => i.src), ['/en.jpg']);
  const spanish = localizeGallery(items, 'es')[0].images;
  assert.equal(spanish[0].src, '/es.jpg');
  assert.equal(spanish[0].alt, 'Descripción accesible');
});

test('removing the last caption removes an album from that language only', () => {
  const items = [album([photo('/image.jpg', { en: { caption: 'English' }, es: { caption: 'Español' } })])];
  delete items[0].images[0].translations.es;
  assert.equal(localizeGallery(items, 'es').length, 0);
  assert.equal(localizeGallery(items, 'en').length, 1);
  assert.equal(localizeGallery(items, 'fa')[0].images.length, 1);
});

test('existing localized gallery preserves order and contains no Persian copy', () => {
  for (const locale of ['en', 'es']) {
    const result = localizeGallery(galleryItems, locale);
    assert.deepEqual(result.map(i => i.id), galleryItems.map(i => i.id));
    for (const item of result) {
      const copy = [item.title, item.caption, ...item.images.flatMap(i => [i.caption, i.alt])].join(' ');
      assert.ok(!/[\u0600-\u06ff]/u.test(copy));
      assert.ok(item.images.every(i => i.caption.trim()));
    }
  }
});
