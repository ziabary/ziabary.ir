import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const read=path=>fs.readFileSync('build'+path+'index.html','utf8');
const base=locale=>locale==='fa'?'':'/'+locale;
const published=(slug,locale)=>!/^draft: true$/m.test(fs.readFileSync('src/lib/content/articles/'+slug+(locale==='fa'?'':'-'+locale)+'.md','utf8').split('---')[1]);
const slugs=['llms-on-rtx-4090-24gb-vs-48gb','enterprise-rag-model-embedding-reranker','ollama-vllm-sglang-or-llama-cpp','gpu-inference-latency-throughput'];
test('LLM editions deliver summaries and crawlable article links, not collapsed full bodies',()=>{
 for(const locale of ['fa','en','es']){
  const html=read(base(locale)+'/guides/llm/');
  assert.ok(Buffer.byteLength(html)<2_000_000,locale+' initial HTML budget');
  assert.doesNotMatch(html,/class="prose guide-prose/);
  assert.doesNotMatch(html,/data-loaded="true"/);
  assert.match(html,/id="model-catalog"/);assert.match(html,/id="hardware-feasibility"/);
  for(const slug of slugs){if(!published(slug,locale))continue;const localized=slug+(locale==='fa'?'':'-'+locale);assert.ok(html.includes(`href="${base(locale)}/articles/${localized}/"`));assert.ok(html.includes(`id="${localized}"`));assert.ok(!html.includes(`id="${localized}--`));}
 }
});
test('GPU closed chapters are lazy; standalone articles retain headings, math, tables and canonical',()=>{
 const gpu=read('/guides/gpu-selection/');assert.doesNotMatch(gpu,/data-loaded="true"/);
 for(const locale of ['fa','en','es'])for(const slug of slugs){
  if(!published(slug,locale))continue;
  const path=base(locale)+'/articles/'+slug+(locale==='fa'?'':'-'+locale)+'/';const html=read(path);
  assert.match(html,/<h2[^>]+id=/);assert.match(html,/<table/);assert.ok(html.includes(`rel="canonical" href="https://ziabary.ir${path}"`));
 }
 const math=read('/articles/llms-on-rtx-4090-24gb-vs-48gb/');assert.match(math,/katex/);
});
test('guide meta, reciprocal paths and independent contact controls survive prerendering',()=>{
 const description='مدل زبانی مناسب ترجمه، دستیار اسناد و Agent را بر اساس زبان، حافظه، سخت‌افزار و هزینه انتخاب کنید؛ مقایسه مدل‌ها و راهنمای اجرای سازمانی.';
 const fa=read('/guides/llm/');
 for(const name of ['name="description"','property="og:description"','name="twitter:description"'])assert.ok(fa.includes(`${name} content="${description}"`));
 for(const locale of ['fa','en','es'])for(const guide of ['llm','gpu-selection']){
  const path=base(locale)+'/guides/'+guide+'/';const html=read(path);
  assert.ok(html.includes(`rel="canonical" href="https://ziabary.ir${path}"`));
  for(const lang of ['fa','en','es'])assert.ok(html.includes(`hreflang="${lang}"`));
  assert.ok(html.includes(`data-contact-placement="${guide==='llm'?'llm':'gpu'}-guide"`));
  assert.ok(html.includes(`${base(locale)}/guides/${guide==='llm'?'gpu-selection':'llm'}/`));
  assert.doesNotMatch(html,/mailto:sales@targoman/);
 }
});
