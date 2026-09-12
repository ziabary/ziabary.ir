import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { compile } from 'svelte/compiler';
import config from '../svelte.config.js';

const preprocess = content => config.preprocess[0].markup({ content, filename: 'math-review.md' });

test('math renders statically with MathML and survives Svelte compilation', async () => {
  const { code } = await preprocess('---\nmath: true\n---\n\nInline $t_0$ and $N>1$.\n\n$$\nTPOT=\\frac{t_N-t_1}{N-1}\n$$');
  assert.equal((code.match(/class="katex"/g) ?? []).length, 3);
  assert.equal((code.match(/<math /g) ?? []).length, 3);
  assert.match(code, /class="math-display" dir="ltr"/);
  assert.match(code, /class="math-inline" dir="ltr"/);
  assert.doesNotThrow(() => compile(code, { generate: 'server' }));
});

test('existing dollar amounts and fenced code remain literal', async () => {
  const normal = await preprocess('Prices are $5 and $10.');
  assert.doesNotMatch(normal.code, /class="katex"/);
  assert.match(normal.code, /\$5 and \$10/);
  const code = await preprocess('---\nmath: true\n---\n\n```sh\necho "$HOME"\n```\n\n`$not_math$`');
  assert.doesNotMatch(code.code, /class="katex"/);
});

test('invalid formulas fail the build instead of publishing broken notation', async () => {
  await assert.rejects(() => preprocess('---\nmath: true\n---\n\n$\\undefinedCommand{x}$'), /Undefined control sequence/);
});

for (const suffix of ['', '-en', '-es']) {
  test(`the GPU latency article${suffix} includes all 19 formulas and a rendered diagram`, async () => {
    const source = readFileSync(`src/lib/content/articles/gpu-inference-latency-throughput${suffix}.md`, 'utf8');
    const { code } = await preprocess(source);
    assert.equal((code.match(/class="katex"/g) ?? []).length, 19);
    assert.equal((code.match(/class="math-display"/g) ?? []).length, 8);
    assert.doesNotThrow(() => compile(code, { generate: 'server' }));
    assert.ok(code.includes(`lpx-sequence${suffix}.svg`));
    assert.doesNotMatch(code, /language-mermaid/);
  });
}
