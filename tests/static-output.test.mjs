import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { compile } from 'mdsvex';
import { isPublished } from '../src/lib/publication.mjs';
import { gunzipSync } from 'node:zlib';
const baseline = JSON.parse(readFileSync('docs/reviews/local-2026-09-09/baseline.json','utf8'));
const html = path => readFileSync(`build${path}index.html`, 'utf8');
const publishedPaths = [];
for(const file of readdirSync('src/lib/content/articles').filter(file=>file.endsWith('.md'))) {
  const {data:{fm}} = await compile(readFileSync('src/lib/content/articles/'+file,'utf8'));
  if(isPublished(fm))publishedPaths.push(`${fm.lang==='fa'?'':'/'+fm.lang}/articles/${fm.slug}/`);
}


test('every previously published article URL still has real static HTML', () => {
  for(const path of baseline.publishedUrls) assert.ok(existsSync(`build${path}index.html`),path);
});

test('archive pages contain each language’s published articles exactly once', () => {
  for(const locale of ['fa','en','es']) {
    const base=locale==='fa'?'':`/${locale}`;
    const expected=publishedPaths.filter(path=>locale==='fa'?path.startsWith('/articles/'):path.startsWith(`${base}/articles/`)).sort();
    const actual=[];
    for(let page=1;page<=Math.ceil(expected.length/12);page++) {
      const path=`${base}/articles/${page>1?`page/${page}/`:''}`;
      const source=html(path);
      assert.ok(source.includes(`rel="canonical" href="https://ziabary.ir${path}"`));
      const links=[...source.matchAll(/<h2[^>]*><a href="([^"]+)"/g)].map(m=>m[1]);
      assert.ok(links.length && links.length<=12); actual.push(...links);
      if(page>1)assert.doesNotMatch(source,/<link[^>]+hreflang=/);
    }
    assert.deepEqual(actual.sort(),expected,locale);
  }
});

test('real translated slugs survive the complete build pipeline; independent/draft editions have none', () => {
  for(const path of ['/articles/targoman-without-rent/','/en/articles/building-targoman-without-patronage/','/es/articles/construir-targoman-sin-padrinos/']) {
    const source=html(path);
    assert.equal([...source.matchAll(/<link[^>]+hreflang=/g)].length,3);
    assert.ok(source.includes('href="https://ziabary.ir/en/articles/building-targoman-without-patronage/"'));
    assert.doesNotMatch(source,/hreflang="x-default"/);
    assert.equal(gunzipSync(readFileSync(`build${path}index.html.gz`)).toString(),source);
  }
  for(const path of ['/articles/dynamic-password-fraud/','/en/articles/apache-mod-jk-log-lock/']) assert.doesNotMatch(html(path),/<link[^>]+hreflang=/);
  for(const path of ['/en/articles/sms-otp-security-design/','/es/articles/cuando-un-otp-por-sms-reduce-la-seguridad/']) assert.ok(!existsSync(`build${path}index.html`));
});

test('planned collections are useful and excluded from sitemap and search in each edition', () => {
  const sitemap=readFileSync('build/sitemap.xml','utf8');
  for(const locale of ['fa','en','es'])for(const slug of ['ai-operator','ai-platform']) {
    const path=`${locale==='fa'?'':`/${locale}`}/guides/${slug}/`;
    const source=html(path);
    assert.match(source,/<meta name="robots" content="noindex,follow"/);
    assert.doesNotMatch(source,/<link[^>]+hreflang=/);
    assert.ok(!sitemap.includes(`https://ziabary.ir${path}</loc>`));
    assert.ok(!JSON.parse(readFileSync(`build/search/${locale}.json`)).some(item=>item.href===path));
  }
});

test('published GPU editions include their chapters, tables, discovery links and language alternates', () => {
  const sitemap = readFileSync('build/sitemap.xml', 'utf8');
  for (const locale of ['en', 'es']) {
    const path = `/${locale}/guides/gpu-selection/`;
    const source = html(path);
    const collection = JSON.parse(readFileSync(`docs/drafts/gpu-selection-${locale}/collection.json`, 'utf8'));
    assert.doesNotMatch(source, /<meta name="robots" content="noindex/);
    assert.doesNotMatch(source, /English draft|Borrador en español|Local preview|Vista previa local/);
    assert.ok(source.includes(`rel="canonical" href="https://ziabary.ir${path}"`));
    for (const edition of ['', '/en', '/es']) {
      assert.ok(source.includes(`href="https://ziabary.ir${edition}/guides/gpu-selection/"`));
    }
    assert.equal([...source.matchAll(/<link[^>]+hreflang=/g)].length, 3);
    for (const item of collection.items) {
      assert.ok(source.includes(`id="${item.id}"`), item.id);
      if (item.kind === 'article') {
        assert.ok(source.includes(`href="/${locale}/articles/${item.id}/"`));
        assert.ok(existsSync(`build/${locale}/articles/${item.id}/index.html`));
      }
    }
    assert.ok(sitemap.includes(`https://ziabary.ir${path}</loc>`));
    assert.ok(JSON.parse(readFileSync(`build/search/${locale}.json`)).some(item => item.href === path));
    const archive = html(`/${locale}/guides/`);
    assert.ok(archive.includes(`href="${path}"`));
    assert.doesNotMatch(archive, /Preview English draft|Ver borrador en español/);
  }
});

test('slide PDF sizes reflect the actual retained files', () => {
  const sizes=JSON.parse(readFileSync('src/lib/generated/pdf-sizes.json'));
  assert.ok(Object.keys(sizes).length);
  for(const [path,size] of Object.entries(sizes))assert.equal(statSync('static'+path).size,size);
  for(const locale of ['en','es']) {
    const source=html(`/${locale}/slides/enterprise-ai-governance-dba/`);
    assert.ok(source.includes(locale==='en'?'PDF in Persian':'PDF en persa'));
    assert.ok(source.includes('MiB'));
  }
});
