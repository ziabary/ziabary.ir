import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync,existsSync} from 'node:fs';
import {compile} from 'mdsvex';
import {collectionState,isPublished} from '../src/lib/publication.mjs';

const collections=JSON.parse(readFileSync('content/guides/fa/collections.json','utf8'));
const series=collections.find(collection=>collection.slug==='enterprise-ai-governance');

test('articles archive reverses course order while the collection retains reading order',{
 skip:!existsSync('build/articles/index.html')
},async()=>{
 const published=[];
 for(const item of series.items){
  const metadata=(await compile(readFileSync(`content/articles/fa/${item.id}/index.md`,'utf8'))).data.fm;
  if(isPublished(metadata))published.push(item);
 }
 const expected=published.map(item=>item.id).reverse();
 const pageRoot='build/articles/page';
 const pages=['build/articles/index.html',...(existsSync(pageRoot)
  ? readdirSync(pageRoot).filter(name=>/^\d+$/.test(name)).sort((a,b)=>Number(a)-Number(b)).map(page=>`${pageRoot}/${page}/index.html`)
  : [])];
 const actual=[];
 for(const page of pages){
  const html=readFileSync(page,'utf8');
  const archive=html.slice(html.indexOf('id="archive-items"'));
  for(const [,slug] of archive.matchAll(/href="\/articles\/([^/]+)\/"/g)){
   if(expected.includes(slug)&&!actual.includes(slug))actual.push(slug);
  }
 }
 assert.deepEqual(actual,expected);
 const course=readFileSync('build/guides/enterprise-ai-governance/index.html','utf8');
 const positions=published.map(item=>course.indexOf(`<article id="${item.id}"`));
 assert(positions.every(position=>position>=0));
 assert.deepEqual(positions,[...positions].sort((a,b)=>a-b));
 const dates=[];
 for(const item of series.items){
  const metadata=(await compile(readFileSync(`content/articles/fa/${item.id}/index.md`,'utf8'))).data.fm;
  dates.push(metadata.date);
  assert.equal(metadata.faDate,'۱۸ آبان ۱۴۰۵');
 }
 assert.deepEqual([...new Set(dates)],['2026-11-09']);
});

test('closing supplement is separate from the sixteen lessons in navigation and course counts',{
 skip:!existsSync('build/guides/enterprise-ai-governance/index.html')
},async()=>{
 const supplement=series.items.find(item=>item.role==='supplement');
 assert.equal(supplement?.id,'enterprise-ai-governance-from-decision-to-practice');
 assert.equal(series.items.at(-1),supplement);
 assert.equal(series.items.filter(item=>item.role!=='supplement').length,16);
 const course=readFileSync('build/guides/enterprise-ai-governance/index.html','utf8');
 const metadata=(await compile(readFileSync(`content/articles/fa/${supplement.id}/index.md`,'utf8'))).data.fm;
 if(!isPublished(metadata)){
  assert(!course.includes(`<article id="${supplement.id}"`));
  return;
 }
 const entry=course.slice(course.indexOf(`<article id="${supplement.id}"`));
 const header=entry.match(/<header\b[^>]*>[\s\S]*?<\/header>/)?.[0];
 assert.match(header,/<small\b[^>]*>مکمل<\/small>/);
 assert(!header.includes('۱۷'));
 const summary=entry.match(/<summary\b[^>]*>[\s\S]*?<\/summary>/)?.[0];
 assert(summary.includes('مطالعهٔ مکمل'));
 assert(course.includes('مکمل و پایان‌بندی:'));
 const catalog=readFileSync('build/guides/index.html','utf8').replace(/<[^>]*>/g,'').replace(/\s+/g,' ');
 assert(catalog.includes('۱۶ درس و ۱ مکمل'));
 assert(!catalog.includes('۱۷ درس'));
});

test('DBA course membership and its dedicated tag agree without mixing broader governance articles',async()=>{
 const members=[];
 for(const directory of readdirSync('content/articles/fa')){
  const file=`content/articles/fa/${directory}/index.md`;if(!existsSync(file))continue;
  const frontmatter=readFileSync(file,'utf8').split('---')[1];
  if(!frontmatter.includes(series.tag))continue;
  const metadata=(await compile(`---${frontmatter}---\n`)).data.fm;
  if(metadata.tags?.includes(series.tag)||metadata.series===series.slug){
   assert.equal(metadata.series,series.slug);assert(metadata.tags.includes(series.tag));members.push(metadata);
  }
 }
 assert(members.length>0);
 assert.equal(new Set(series.items.map(item=>item.id)).size,series.items.length);
 assert.deepEqual(new Set(series.items.map(item=>item.id)),new Set(members.map(article=>article.slug)));
 const publicState=collectionState(series,id=>members.find(article=>article.slug===id&&isPublished(article)));
 assert(publicState.items.every(item=>isPublished(members.find(article=>article.slug===item.id))));
 assert.equal(collections[collections.indexOf(series)-1].slug,'zero-trust-ai');
 assert.equal(collections[collections.indexOf(series)+1].slug,'secure-operating-system');
});

test('public course collection keeps unpublished chapters out of HTML and sitemap',{
 skip:!existsSync('build/guides/enterprise-ai-governance/index.html')
},async()=>{
 const html=readFileSync('build/guides/enterprise-ai-governance/index.html','utf8');
 for(const item of series.items){
  const metadata=(await compile(readFileSync(`content/articles/fa/${item.id}/index.md`,'utf8'))).data.fm;
  if(!isPublished(metadata))assert(!html.includes(`id="${item.id}"`));
  else assert(html.includes(`id="${item.id}"`));
 }
 if(/name="robots"[^>]*noindex/.test(html))assert(!readFileSync('build/sitemap.xml','utf8').includes('/guides/enterprise-ai-governance/'));
});

test('course titles stay in the reader and standalone lessons link to continuous reading',{
 skip:!existsSync('build/guides/enterprise-ai-governance/index.html')
},async()=>{
 const courseHtml=readFileSync('build/guides/enterprise-ai-governance/index.html','utf8');
 for(const item of series.items){
  const metadata=(await compile(readFileSync(`content/articles/fa/${item.id}/index.md`,'utf8'))).data.fm;
  if(!isPublished(metadata))continue;
  const entry=courseHtml.indexOf(`<article id="${item.id}"`);
  assert(entry>=0,`Missing lesson ${item.id}`);
  const header=courseHtml.slice(entry).match(/<header\b[^>]*>[\s\S]*?<\/header>/)?.[0];
  assert(header?.includes(`href="#${item.id}"`),`Title leaves the course: ${item.id}`);
  const articleHtml=readFileSync(`build/articles/${item.id}/index.html`,'utf8');
  const link=[...articleHtml.matchAll(/<a\b[^>]*>/g)].map(match=>match[0])
   .find(tag=>/class="[^"]*\bseries-reading-link\b/.test(tag));
  assert(link,`Missing continuous-reading link: ${item.id}`);
  const href=link.match(/href="([^"]+)"/)?.[1].replaceAll('&amp;','&');
  const url=new URL(href,'https://ziabary.ir');
  assert.equal(url.pathname,`/guides/${series.slug}/`);
  assert.equal(url.searchParams.get('view'),'continuous');
  assert.equal(url.hash,`#${item.id}`);
  assert(!url.searchParams.has('show-drafts'));
 }
 const ordinary='build/articles/zero-trust-ai-maturity-model/index.html';
 if(existsSync(ordinary))assert(!/<a\b[^>]*class="[^"]*\bseries-reading-link\b/.test(readFileSync(ordinary,'utf8')));
});
