import { readdir, readFile, writeFile } from 'node:fs/promises';
// SVGs rendered through <img> cannot load external font files. Embed the
// project's existing WOFF2 faces so downloaded diagrams also keep their font.
const directory = new URL('../static/images/articles/', import.meta.url);
const fontRoot = new URL('../static/fonts/IranSansX/fonts/woff2/', import.meta.url);
const faces = await Promise.all([['Regular', 400], ['Bold', 700]].map(async ([name, weight]) => {
  const data = await readFile(new URL(`IRANSansX-${name}.woff2`, fontRoot));
  return `@font-face{font-family:DiagramIranSansX;src:url(data:font/woff2;base64,${data.toString('base64')}) format('woff2');font-weight:${weight};font-style:normal;}`;
}));
const style = `<style id="diagram-embedded-font">${faces.join('')}text,tspan,foreignObject *{font-family:DiagramIranSansX,sans-serif!important;}</style>`;
async function prepare(root) {
  let count = 0;
  for (const entry of await readdir(root, { withFileTypes: true })) {
    const url = new URL(entry.name + (entry.isDirectory() ? '/' : ''), root);
    if (entry.isDirectory()) { count += await prepare(url); continue; }
    if (!entry.name.endsWith('.svg')) continue;
    const original = await readFile(url, 'utf8');
    if (!/<(?:text|foreignObject)\b/.test(original)) continue;
    const clean = original.replace(/<style id="diagram-embedded-font">[\s\S]*?<\/style>\s*/g, '');
    const updated = clean.replace(/<\/svg>\s*$/, `${style}\n</svg>\n`);
    if (updated !== original) await writeFile(url, updated);
    count++;
  }
  return count;
}
console.log(`Prepared embedded IranSansX fonts in ${await prepare(directory)} SVG diagrams.`);
