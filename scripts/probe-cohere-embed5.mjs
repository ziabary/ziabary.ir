/** Text-only shared-index smoke test. Default: offline contract check.
 * Live: COHERE_API_KEY=... node scripts/probe-cohere-embed5.mjs --live
 * Sends only the synthetic samples below. Never a Persian quality benchmark.
 * Sources: https://docs.cohere.com/docs/embeddings
 *          https://docs.cohere.com/changelog/embed-v5
 */
import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';

export const DIMENSIONS = 256;
const documents = [
  'ساعت کار کتابخانه از هشت صبح تا شش عصر است.',
  'برای بازیابی رمز عبور، پیوند ارسال‌شده به ایمیل خود را باز کنید.',
  'بسته‌های پستی این فروشگاه در روزهای کاری ارسال می‌شوند.'
];
const queries = ['کتابخانه چه ساعتی بسته می‌شود؟', 'چطور رمز عبورم را عوض کنم؟'];
export function requestPlan() {
  const payload = (model, input_type, texts) => ({ model, input_type, texts, output_dimension: DIMENSIONS, embedding_types: ['float'], truncate: 'NONE' });
  return [
    { role: 'index', payload: payload('embed-v5.0-pro', 'search_document', documents) },
    { role: 'pro-query', payload: payload('embed-v5.0-pro', 'search_query', queries) },
    { role: 'fast-query', payload: payload('embed-v5.0-fast', 'search_query', queries) }
  ];
}
export function validateVectors(data, count, dimensions = DIMENSIONS) {
  const vectors = data?.embeddings?.float;
  assert.equal(vectors?.length, count, 'Unexpected embedding count');
  for (const vector of vectors) {
    assert.equal(vector.length, dimensions, 'Unexpected output dimension');
    assert.ok(vector.every(x => typeof x === 'number' && Number.isFinite(x)), 'Invalid embedding values');
    assert.ok(vector.some(x => x !== 0), 'Zero embedding');
  }
  return vectors;
}
export function rank(index, query) {
  const norm = a => Math.sqrt(a.reduce((s,x) => s+x*x,0));
  return index.map((v,id) => ({id,score:v.reduce((s,x,j)=>s+x*query[j],0)/(norm(v)*norm(query))})).sort((a,b)=>b.score-a.score);
}
export async function runProbe({live = false, fetchImpl = globalThis.fetch, apiKey = process.env.COHERE_API_KEY ?? process.env.CO_API_KEY} = {}) {
  const plan = requestPlan();
  if (!live) return { mode:'offline-contract-only', runtimeTested:false, requests:plan, limitation:'No API execution, multimodal test, latency comparison or Persian quality measurement.' };
  if (!apiKey) throw new Error('Live probe requires COHERE_API_KEY or CO_API_KEY. No request was sent.');
  const results=[];
  for (const step of plan) {
    const started=performance.now();
    const response=await fetchImpl('https://api.cohere.com/v2/embed', {method:'POST',headers:{Authorization:`Bearer ${apiKey}`,'Content-Type':'application/json'},body:JSON.stringify(step.payload),signal:AbortSignal.timeout(60000)});
    if(!response.ok) throw new Error(`Cohere ${step.role} returned HTTP ${response.status}; response body omitted.`);
    const data=await response.json();
    results.push({role:step.role,vectors:validateVectors(data,step.payload.texts.length),elapsedMs:performance.now()-started});
  }
  const index=results[0].vectors;
  return {mode:'live-synthetic-text-smoke',runtimeTested:true,checkedOn:new Date().toISOString(),dimensions:DIMENSIONS,indexModel:plan[0].payload.model,indexCreatedOnce:true,queries:results.slice(1).map(step=>({role:step.role,elapsedMs:step.elapsedMs,rankings:step.vectors.map(query=>rank(index,query))})),limitation:'Tiny synthetic Persian sample; not an independent quality score, multimodal evaluation or reliable speed/cost benchmark.'};
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try { console.log(JSON.stringify(await runProbe({live:process.argv.includes('--live')}),null,2)); }
  catch(error) { console.error(error.message); process.exitCode=1; }
}
