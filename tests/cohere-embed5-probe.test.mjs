import test from 'node:test';
import assert from 'node:assert/strict';
import { runProbe, requestPlan, validateVectors } from '../scripts/probe-cohere-embed5.mjs';

test('offline probe sends no request and makes no runtime claim', async()=>{
  const report=await runProbe({fetchImpl:()=>{throw new Error('Unexpected network');}});
  assert.equal(report.runtimeTested,false);
  const plan=requestPlan();
  assert.deepEqual(plan.map(x=>x.payload.model),['embed-v5.0-pro','embed-v5.0-pro','embed-v5.0-fast']);
  assert.equal(plan[0].payload.input_type,'search_document');
  assert.ok(plan.slice(1).every(x=>x.payload.input_type==='search_query'));
  assert.ok(plan.every(x=>x.payload.output_dimension===256&&x.payload.embedding_types[0]==='float'));
});
test('probe validates shape and reuses the single Pro index for both query variants',async()=>{
  const calls=[];
  const fetchImpl=async(url,options)=>{
    const p=JSON.parse(options.body);calls.push(p);
    return {ok:true,json:async()=>({embeddings:{float:p.texts.map((_,i)=>Array.from({length:256},(_,j)=>i===j?1:0))}})};
  };
  const report=await runProbe({live:true,apiKey:'test-only',fetchImpl});
  assert.equal(calls.filter(x=>x.input_type==='search_document').length,1);
  assert.equal(report.queries.length,2);
  assert.deepEqual(report.queries.map(x=>x.rankings.map(r=>r[0].id)),[[0,1],[0,1]]);
  assert.throws(()=>validateVectors({embeddings:{float:[[1,2]]}},1));
  assert.throws(()=>validateVectors({embeddings:{float:[Array(256).fill(NaN)]}},1));
  await assert.rejects(()=>runProbe({live:true,apiKey:'',fetchImpl}),/requires/);
  await assert.rejects(()=>runProbe({live:true,apiKey:'test-only',fetchImpl:async()=>({ok:false,status:429})}),/HTTP 429/);
});
