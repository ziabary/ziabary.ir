import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
import {loadLlmModules} from './helpers/llm-modules.mjs';
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const canonical=read('data/llm/v0.3.0/repository.json'),m=await loadLlmModules();
const v30='software-release:vllm-v0-30-0',v29='software-release:vllm-v0-29-0';
const l05='software-release:llama-cpp-v0-5-0',l04='software-release:llama-cpp-v0-4-1';
test('version-scoped security, RPC and prerelease notes render in all editions',()=>{
 for(const locale of ['fa','en','es']){
  const i=m['i18n/runtime'].createLlmI18n(locale,read(`data/llm/locales/messages.${locale}.json`),m['i18n/runtime'].resolveRecordTranslations(read(`data/llm/locales/records.${locale}.json`)));
  const repo=m['i18n/runtime'].localizeLlmRepository(canonical,i),research=m.research.createLlmResearch(i),r=research.enrichResearchRepository(repo);
  const rows=m['research-views'].createLlmResearchViews(i).enrichExistingRows(r,m.adapters.createLlmAdapters(i).buildLlmViewRows(r),'all')['software-products'];
  const row=id=>rows.find(x=>x.id===id);
  for(const id of [v29,v30,l04,l05,'software-release:ollama-v0-34-0'])assert.ok(row(id));
  const old=row(v29).cells['research-condition'].display,newer=row(v30).cells['research-condition'].display;
  assert.match(old,/GHSA-x6mc-67gf-chw4/);assert.match(old,/0\.25\.1/);assert.match(old,/\/tokenize/);
  assert.match(newer,/g_idx/);assert.match(newer,/--enable-scale-out/);assert.match(newer,/CUDA 12\.9/);
  assert.match(row(l05).cells['research-condition'].display,/b11160/);assert.match(row(l05).cells['research-condition'].display,/MUL_MAT_ID/);
  assert.match(row('software-release:ollama-v0-34-0').cells['research-condition'].display,/OLLAMA_NO_CLOUD=1/);
  assert.match(row('software-release:ollama-v0-34-0').cells['research-condition'].display,/v0\.40\.0-rc0/);
  assert.ok(!rows.some(x=>/rc0/.test(x.id)),'RC stays a note, not a sortable release candidate');
  if(locale!=='fa')for(const id of [v29,v30,l05,'software-release:ollama-v0-34-0'])assert.doesNotMatch(JSON.stringify([row(id).cells,row(id).details]),/[\u0600-\u06ff]/);
 }
});
test('release dates differ from review dates; no old benchmark or capability is relabelled',()=>{
 const get=id=>canonical.softwareReleases.find(x=>x.id===id);
 assert.equal(get(v30).releasedOn,'2026-09-22');assert.equal(get(l05).releasedOn,'2026-09-23');
 assert.equal(get(v30).lastReviewedOn,'2026-09-25');
 for(const field of ['benchmarkRuns','softwareCapabilities','apiCompatibility','servingStacks']){
  assert.ok(!canonical[field].some(x=>JSON.stringify(x).includes(v30)||JSON.stringify(x).includes(l05)),field);
 }
 for(const rows of Object.values(canonical))if(Array.isArray(rows))assert.equal(new Set(rows.map(x=>x.id)).size,rows.length);
});
const base={task:'writing',writingTask:'summary',sources:'provided',sourceLanguage:'en',outputLanguage:'en',inputSize:'short',mode:'interactive',policy:'internal',deployment:'self',hardware:'gpu',gpuName:'NVIDIA H100',vram:'80',ram:'128',owner:'experienced',audience:'team',users:'5'};
test('security warning follows selected vLLM, never diagnoses uncollected version/frontend',()=>{
 const repo=m.research.enrichResearchRepository(m.guide.llmRepository);
 for(const locale of ['fa','en','es']){
  const served=m.wizard.buildWizardResult(repo,base,locale);
  assert.ok(served.candidates.some(x=>x.runtime==='vLLM'));
  const warning=served.decisions.find(x=>x.id==='vllm-security-review');assert.equal(warning.status,'conditional');assert.match(warning.conclusion,/frontend/);
  const cpu=m.wizard.buildWizardResult(repo,{...base,hardware:'cpu',owner:'none',audience:'personal',users:'1'},locale);
  assert.ok(!cpu.candidates.some(x=>x.runtime==='vLLM'));assert.ok(!cpu.decisions.some(x=>x.id==='vllm-security-review'));
  const api=m.wizard.buildWizardResult(repo,{...base,deployment:'api',policy:'public'},locale);assert.ok(!api.decisions.some(x=>x.id==='vllm-security-review'));
  const reversed=structuredClone(repo);reversed.softwareReleases.reverse();
  assert.deepEqual(m.wizard.buildWizardResult(reversed,base,locale).candidates.map(x=>[x.model.id,x.runtime]),served.candidates.map(x=>[x.model.id,x.runtime]));
  assert.ok(cpu.decisions.some(x=>x.id==='llama-rpc-version-review'));
 }
});
const serverSource=fs.readFileSync('src/lib/server-data.ts','utf8');
const transpile=s=>ts.transpileModule(s,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;
const server=await import('data:text/javascript;base64,'+Buffer.from(transpile(serverSource)).toString('base64'));
const component=fs.readFileSync('src/lib/components/ServerComparison.svelte','utf8');
const capacityCode=component.slice(component.indexOf('  function capacity('),component.indexOf('  function compatibility('));
const {capacity}=await import('data:text/javascript;base64,'+Buffer.from(transpile('export '+capacityCode.trim())).toString('base64'));
test('rack GPU count is not a PCIe slot count and unverified dimensions/power stay unknown',()=>{
 const rack=server.serverRecords.find(x=>x.id==='supermicro-vera-rubin-nvl72');
 assert.equal(rack.acceleratorForm,'integrated');assert.equal(capacity(rack,'any'),72);
 for(const width of ['single','double','wide',1,2,3,4])assert.equal(capacity(rack,width),0);
 assert.equal(rack.heightU,null);assert.equal(rack.depthMm,null);assert.equal(rack.maxGpuPowerW,null);assert.deepEqual(rack.validatedGpuIds,[]);
 assert.equal(rack.status,'current');assert.match(rack.memory,/۲۰٫۷/);assert.match(rack.memory,/۵۴/);
});
