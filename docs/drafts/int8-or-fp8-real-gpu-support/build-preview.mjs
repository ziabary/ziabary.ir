import { readFile, writeFile, mkdtemp, rm } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { resolve, join } from 'node:path';
import { compile as markdown } from 'mdsvex';
import { compile } from 'svelte/compiler';
import { render } from 'svelte/server';

const here = fileURLToPath(new URL('.', import.meta.url));
const root = resolve(here, '../../..');
const slug = 'int8-or-fp8-real-gpu-support';
const source = await readFile(join(root, `src/lib/content/articles/${slug}.md`), 'utf8');
const processed = await markdown(source);
const scratch = await mkdtemp(join(root, '.svelte-kit/int8-preview-'));
try {
  const file = join(scratch, 'article.mjs');
  await writeFile(file, compile(processed.code, { generate: 'server' }).js.code);
  const article = await import(pathToFileURL(file).href);
  let body = render(article.default).body;
  for (const match of [...body.matchAll(/(?:src|href)="(\/images\/[^" ]+)"/g)]) {
    const path = match[1];
    const mime = path.endsWith('.svg') ? 'image/svg+xml' : 'text/csv';
    const bytes = await readFile(join(root, 'static', path));
    body = body.replaceAll(path, `data:${mime};base64,${bytes.toString('base64')}`);
  }
  body = body.replaceAll('href="/articles/', 'href="https://ziabary.ir/articles/');
  const cover = await readFile(join(root, `static${article.metadata.cover}`));
  const font = await readFile(join(root, 'static/fonts/IranSansX/fonts/woff2/IRANSansX-Regular.woff2'));
  await writeFile(join(here, 'preview.html'), `<!doctype html><html lang="fa" dir="rtl"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>${article.metadata.title} — پیش‌نویس</title><style>
  @font-face{font-family:Article;src:url(data:font/woff2;base64,${font.toString('base64')})}*{box-sizing:border-box}body{margin:0;background:#f8faf8;color:#192e37;font:16px/2.2 Article,Tahoma,sans-serif}main{max-width:868px;margin:40px auto;padding:0 24px 60px}h1{font-size:30px;line-height:1.8}h3{font-size:23px;margin-top:48px}a{color:#087d79;text-underline-offset:5px}img{display:block;width:100%;height:auto;border-radius:14px}figure{margin:30px 0}figcaption{font-size:13px;color:#536a70;margin-top:12px}table{display:block;overflow:auto;border-collapse:collapse;font-size:14px;margin:26px 0}th,td{min-width:140px;border:1px solid #cbd8d8;padding:12px;text-align:right;vertical-align:top}th{background:#e8f1ef}code{direction:ltr;unicode-bidi:isolate;display:inline-block;font-size:.85em}.draft{color:#8c501f;border-bottom:1px solid #cbd8d8;padding-bottom:12px}@media(max-width:600px){main{margin:20px auto;padding:0 18px 40px}h1{font-size:24px}h3{font-size:20px}}
  </style><main><p class="draft">پیش‌نویس برای بازبینی — منتشر نشده</p><img src="data:image/svg+xml;base64,${cover.toString('base64')}" alt="قالب مدل، کرنل و معماری GPU در مسیر اجرای محاسبات هشت‌بیتی"><h1>${article.metadata.title}</h1><p>${article.metadata.faDate} · ${article.metadata.readTime}</p>${body}</main></html>`);
  console.log('Created self-contained draft preview.');
} finally {
  await rm(scratch, { recursive: true, force: true });
}
