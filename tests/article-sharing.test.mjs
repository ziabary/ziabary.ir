import test from 'node:test';
import assert from 'node:assert/strict';
import { articleShareUrl, articleShareContent, shareTextWeight } from '../src/lib/article-sharing.mjs';
const registry={atest:'/articles/test/',eat:'/en/articles/test-en/',sat:'/es/articles/test-es/'};
test('copy uses a public article short link despite subsection, localhost, or preview parameters',()=>{
 for(const href of ['/articles/test/','http://localhost:5173/articles/test/?show-drafts=true#subsection','https://ziabary.ir/articles/test/?utm_source=a#بخش']){
  assert.equal(articleShareUrl(href,registry),'https://ziabary.ir/?t=atest');
 }
 assert.equal(articleShareUrl('/en/articles/test-en/#section',registry),'https://ziabary.ir/?t=eat');
 assert.equal(articleShareUrl('/es/articles/test-es/',registry),'https://ziabary.ir/?t=sat');
});
test('unpublished destinations never get invented or reassigned short codes',()=>{
 assert.equal(articleShareUrl('/articles/unpublished/#section',registry),'https://ziabary.ir/articles/unpublished/');
});
const data={title:'عنوان فارسی & عنوان',excerpt:'خلاصهٔ یادداشت با نیم‌فاصله و café.',url:'https://ziabary.ir/?t=atest'};
test('native, Telegram, Bale, Eitaa, WhatsApp and email receive summary and one short URL',()=>{
 const c=articleShareContent(data);
 assert.equal(c.native.text,'✍️ '+data.title+'\n\n'+data.excerpt);
 assert.equal(c.native.url,data.url);
 for(const id of ['telegram','bale','eitaa']){
  const params=new URL(c[id]).searchParams;
  assert.equal(params.get('url'),data.url);assert.equal(params.get('text'),c.text);
 }
 assert.equal(new URL(c.bale).origin,'https://ble.ir');
 assert.equal(new URL(c.eitaa).origin,'https://eitaa.com');
 assert.equal(new URL(c.whatsapp).searchParams.get('text'),'✍️ *'+data.title+'*\n\n'+data.excerpt+'\n\n'+data.url);
 assert.equal(new URL(c.linkedin).origin,'https://www.linkedin.com');
 assert.equal(new URL(c.linkedin).pathname,'/sharing/share-offsite/');
 assert.equal(new URL(c.linkedin).searchParams.get('url'),data.url);
 const mail=new URL(c.email).searchParams;
 assert.equal(mail.get('subject'),data.title);assert.equal(mail.get('body'),data.excerpt+'\n\n'+data.url);
 assert.equal(c.fullText.split(data.url).length,2);
});
test('X keeps space for a summary and its short link in long multilingual posts',()=>{
 for(const excerpt of ['متن فارسی '.repeat(100),'English text '.repeat(100),'Texto español '.repeat(100),'漢字 👩🏽‍💻 '.repeat(100),'llama.cpp https://example.org/path '.repeat(100)]){
  const c=articleShareContent({...data,title:'عنوان طولانی '.repeat(60),excerpt});
  const params=new URL(c.x).searchParams;
  assert.equal(params.get('url'),data.url);
  assert.ok(params.get('text').includes('\n\n'));
  assert.ok(shareTextWeight(params.get('text'))+1+23<=280);
  assert.ok(!params.get('text').includes('\uFFFD'));
 }
});
test('editorial markup and line breaks do not leak into share subject or text',()=>{
 const c=articleShareContent({...data,title:'عنوان\nدو سطر',excerpt:'<b>سلام</b> [دنیا](/articles/test/)'});
 assert.equal(c.title,'عنوان دو سطر');assert.ok(c.text.endsWith('سلام دنیا'));
});

test('rich clipboard escapes article text, keeps a bold heading, and plain destinations get no markup',()=>{
 const c=articleShareContent({...data,title:'عنوان *ویژه* & "نمونه"',excerpt:'<script>bad</script> مقایسه 2 < 3 & 4 > 1'});
 assert.ok(c.html.includes('<strong>✍️ عنوان *ویژه* &amp; &quot;نمونه&quot;</strong>'));
 assert.ok(!c.html.includes('<script>'));
 assert.ok(c.html.includes('<a href="https://ziabary.ir/?t=atest">'));
 assert.ok(new URL(c.whatsapp).searchParams.get('text').startsWith('✍️ *عنوان ویژه & "نمونه"*'));
 assert.equal(new URL(c.telegram).searchParams.get('text'),c.text);
 assert.ok(!new URL(c.telegram).searchParams.has('parse_mode'));
 assert.equal(c.native.title,c.title);
});
