import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { compile } from 'svelte/compiler';
import config from '../svelte.config.js';

const preprocess = content => config.preprocess[0].markup({content, filename:'table-review.md'});
for(const [lang,label] of Object.entries({fa:'جدول با پیمایش افقی',en:'Horizontally scrollable table',es:'Tabla con desplazamiento horizontal'})){
 test(`scrollable Markdown tables keep keyboard access and a localized accessible name (${lang})`,async()=>{
  const {code}=await preprocess(`---\nlang: ${lang}\n---\n\n| A | B |\n| --- | --- |\n| One | Two |\n\n| C | D |\n| --- | --- |\n| Three | Four |`);
  assert.equal((code.match(/class="prose-table-scroll"/g)??[]).length,2);
  assert.equal((code.match(/role="region"/g)??[]).length,2);
  assert.equal((code.match(/tabindex="0"/g)??[]).length,2);
  assert.ok(code.includes(`aria-label="${label}"`));
  assert.equal((code.match(/<table>/g)??[]).length,2);
  assert.deepEqual(compile(code,{generate:'server'}).warnings.filter(w=>w.code.startsWith('a11y_')),[]);
 });
}
test('the reported article compiles without the table warning',async()=>{
 const {code}=await preprocess(readFileSync('src/lib/content/articles/ztai-autonomous-agents-bounded-authority.md','utf8'));
 assert.ok(code.includes('prose-table-scroll'));
 assert.deepEqual(compile(code,{generate:'server'}).warnings.filter(w=>w.code==='a11y_no_noninteractive_tabindex'),[]);
});
test('the exception never suppresses warnings on unrelated content',async()=>{
 const {code}=await preprocess('| A | B |\n| --- | --- |\n| One | Two |\n\n<div tabindex="0">Unrelated content</div>');
 const warnings=compile(code,{generate:'server'}).warnings.filter(w=>w.code==='a11y_no_noninteractive_tabindex');
 assert.equal(warnings.length,1);
 assert.match(warnings[0].frame,/Unrelated content/);
});
