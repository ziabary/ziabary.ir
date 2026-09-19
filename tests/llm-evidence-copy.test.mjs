import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import ts from 'typescript';
const code = ts.transpileModule(readFileSync('src/lib/llm/evidence-copy.ts', 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 }
}).outputText;
const { evidenceNotes } = await import('data:text/javascript;base64,' + Buffer.from(code).toString('base64'));

test('source presentation removes stock prose without changing the evidence record', () => {
  const source = {
    scope: 'Example/model؛ شناسنامه و کاربرد اعلام‌شده، بدون تأیید مستقل.',
    commercialInterest: 'ناشر مدل یا نرم‌افزار؛ ارزیابی مستقل محسوب نمی‌شود.',
    limitations: ['هیچ فایل وزن دانلود یا روی سخت‌افزار اجرا نشده است.'],
    presentationNotes: []
  };
  const before = structuredClone(source);
  assert.deepEqual(evidenceNotes(source), []);
  assert.deepEqual(source, before);
});
test('source-specific constraints and commercial disclosures survive, without duplicates', () => {
  const scope = 'آزمون روی H100 با ۳۲ درخواست هم‌زمان انجام شده است.';
  const limitation = 'نسخهٔ دقیق وزن‌های آزموده‌شده مشخص نیست.';
  const notes = evidenceNotes({ scope, commercialInterest: 'عرضه‌کنندهٔ خدمات میزبانی', limitations: [scope, limitation], presentationNotes: [scope, 'این آزمون را ارائه‌دهندهٔ خدمات میزبانی منتشر کرده است.', limitation, scope] });
  assert.deepEqual(notes, [scope, 'این آزمون را ارائه‌دهندهٔ خدمات میزبانی منتشر کرده است.', limitation]);
});
test('editorial notes are explicit; changing source wording cannot invent or hide constraints', () => {
  assert.deepEqual(evidenceNotes({
    scope: 'نتیجهٔ گزارش‌شده در همین منبع و پروتکل؛ نسخهٔ فایل دریافت‌شده، نسخهٔ وزن آزموده‌شده محسوب نمی‌شود.',
    limitations: [], presentationNotes: []
  }), []);
  const constraint = 'Exact weight revision was not disclosed.';
  for (const scope of ['Original wording', 'Edited wording', '']) assert.deepEqual(evidenceNotes({scope, presentationNotes: [constraint]}), [constraint]);
});
