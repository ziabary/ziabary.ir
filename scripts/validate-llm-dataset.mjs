#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import crypto from 'node:crypto';
const args=process.argv.slice(2);
const arg=(name)=>{const i=args.indexOf(name);return i<0?undefined:args[i+1];};
const project=path.resolve(arg('--project')??process.cwd());
const bundle = path.join(project, 'data/llm/v0.3.0');
const legacyBundle = path.join(project, 'data/llm/v0.1.0');
const manifest = JSON.parse(fs.readFileSync(path.join(bundle, 'manifest.json'), 'utf8'));
const tsPath=arg('--typescript');
const require=createRequire(import.meta.url);
let ts;
try { ts=tsPath?require(path.resolve(tsPath)):createRequire(path.join(project,'package.json'))('typescript'); }
catch { throw new Error('TypeScript is required. Use the project dev dependency or --typescript /absolute/path/to/typescript.'); }
const dataPath=path.join(bundle,manifest.repository);
const data=Object.fromEntries(Object.entries(JSON.parse(fs.readFileSync(dataPath,'utf8'))).filter(([,value])=>Array.isArray(value)));
const schemaPath=path.join(project,'src/lib/llm/schema.ts');
const schemaHash=crypto.createHash('sha256').update(fs.readFileSync(schemaPath)).digest('hex');
const virtual=path.join(project,'src/lib/llm/data/__dataset_check__.ts');
const declarations=Object.entries(data).map(([key,items])=>`const ${key}: LlmGuideRepository['${key}'] = [];\n`+items.map(item=>`${key}.push(${JSON.stringify(item)});`).join('\n')).join('\n');
const code="import type { LlmGuideRepository } from '../schema';\n"+declarations+"\nexport const dataset: LlmGuideRepository = {"+Object.keys(data).join(',')+"};\n";
const options={noEmit:true,strict:true,target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ESNext,moduleResolution:ts.ModuleResolutionKind.Bundler,skipLibCheck:true};
const host=ts.createCompilerHost(options);
const prevRead=host.readFile.bind(host),prevExists=host.fileExists.bind(host),prevSource=host.getSourceFile.bind(host);
host.readFile=(f)=>path.resolve(f)===virtual?code:prevRead(f);
host.fileExists=(f)=>path.resolve(f)===virtual||prevExists(f);
host.getSourceFile=(f,languageVersion,onError,shouldCreateNew)=>path.resolve(f)===virtual?ts.createSourceFile(f,code,languageVersion,true):prevSource(f,languageVersion,onError,shouldCreateNew);
const entry=path.join(project,'src/lib/llm/data/repository.v1.ts');
const hasInstalledEntry=fs.existsSync(entry);
const program=ts.createProgram([virtual,...(hasInstalledEntry?[entry]:[])],options,host);
const diagnostics=ts.getPreEmitDiagnostics(program);
if(diagnostics.length) throw new Error(diagnostics.map(d=>`TS${d.code}: ${ts.flattenDiagnosticMessageText(d.messageText, '\n')}`).join('\n'));
// Execute only the supplied adapter and its local TypeScript imports. No application build is implied.
const cache=new Map();
function loadTs(file){
 file=path.resolve(file);if(cache.has(file))return cache.get(file).exports;
 const module={exports:{}};cache.set(file,module);
 const raw=fs.readFileSync(file,'utf8');
 if(file.endsWith('.json')) { module.exports=JSON.parse(raw); return module.exports; }
 const js=ts.transpileModule(raw,{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.CommonJS,esModuleInterop:true}}).outputText;
 const localRequire=(specifier)=>{
  if(!specifier.startsWith('.')&&!specifier.startsWith('$lib/'))throw new Error('Unexpected runtime dependency '+specifier);
  let dest=specifier.startsWith('$lib/')?path.join(project,'src/lib',specifier.slice(5)):path.resolve(path.dirname(file),specifier);
  if(!fs.existsSync(dest)&&fs.existsSync(dest+'.ts'))dest+='.ts';
  return loadTs(dest);
 };
 new Function('require','module','exports',js)(localRequire,module,module.exports);return module.exports;
}
if(hasInstalledEntry&&JSON.stringify(loadTs(entry).llmDataset)!==JSON.stringify(data))throw new Error('Installed TypeScript data differs from canonical JSON');
const adapters=loadTs(path.join(project,'src/lib/llm/adapters.ts'));
function supplemental(repository){
 const errors=[];const ids=new Map(Object.values(repository).flat().map(x=>[x.id,x]));
 for(const c of repository.claims){
  let v=ids.get(c.subjectId);for(const p of c.fieldPath.split('.'))v=v?.[p];
  if(!Object.is(v,c.value))errors.push(c.id+' claim value does not equal the field it cites');
 }
 function walk(o,p='repository'){
  if(!o||typeof o!=='object')return;
  if(o.state==='known'){
   if(o.value===undefined||o.value===null)errors.push(p+' known datum has no value');
   if(typeof o.value==='number'&&!Number.isFinite(o.value))errors.push(p+' nonfinite number');
   if(!o.evidenceIds?.length)errors.push(p+' known datum has no evidence');
  }
  if(['unknown','not-measured','not-applicable'].includes(o.state)&&'value'in o)errors.push(p+' missing datum carries value');
  for(const [k,v]of Object.entries(o))if(v&&typeof v==='object')walk(v,p+'.'+k);
 }
 walk(repository);
 for(const a of repository.artifacts){
  const m=ids.get(a.modelVersionId);
  if(!/^[a-f0-9]{40}$/.test(a.repositoryRevision))errors.push(a.id+' nonexact repository revision');
  if(a.baseRevision!==m?.version)errors.push(a.id+' base revision differs from model snapshot');
 }
 for(const e of repository.evidence){
  if(!/^https:\/\//.test(e.url))errors.push(e.id+' non-HTTPS source URL');
  if(!e.locator?.trim())errors.push(e.id+' missing locator');
  if(e.accessedOn>manifest.asOf)errors.push(e.id+' future evidence date');
 }
 return errors;
}
const adapterErrors=adapters.validateLlmRepository(data);
const semanticErrors=supplemental(data);
if(adapterErrors.length||semanticErrors.length)throw new Error(JSON.stringify({adapterErrors,semanticErrors},null,2));
const artifactFiles=JSON.parse(fs.readFileSync(path.join(legacyBundle,'research/artifact-files.json'),'utf8'));
for(const f of artifactFiles){
 const a=data.artifacts.find(x=>x.id===f.artifactId);
 if(f.weightBytes!==null){
  if(f.weightBytes!==f.selectedFiles.reduce((n,v)=>n+v.bytes,0))throw new Error('Wrong byte sum '+f.artifactId);
  if(Math.abs(a.size.value-f.weightBytes/2**30)>0.000000501)throw new Error('Wrong GiB conversion '+f.artifactId);
 }
}
for(const listing of data.artifactListings){
 if(listing.totalBytes!==undefined&&listing.files.every(file=>file.bytes!==undefined)&&listing.totalBytes!==listing.files.reduce((sum,file)=>sum+file.bytes,0))throw new Error('Wrong download byte sum '+listing.id);
 for(const file of listing.files)if(!file.url.startsWith('https://'))throw new Error('Invalid download URL '+listing.id);
}
for(const dependency of JSON.parse(fs.readFileSync(path.join(bundle,'research/required-existing-data.json'),'utf8'))){
 const actual=crypto.createHash('sha256').update(fs.readFileSync(path.join(project,dependency.path))).digest('hex');
 if(actual!==dependency.sha256)throw new Error('Research dependency changed; review and update the dependency manifest: '+dependency.path);
}
const research=loadTs(path.join(project,'src/lib/llm/research.ts'));
const merged=research.enrichResearchRepository(data);
const mergedErrors=adapters.validateLlmRepository(merged);
if(mergedErrors.length)throw new Error(JSON.stringify({mergedErrors},null,2));
const brokenRef=structuredClone(data);brokenRef.models[0].familyId='family:missing';
if(!adapters.validateLlmRepository(brokenRef).length)throw new Error('Negative reference control did not fail');
const brokenClaim=structuredClone(data);brokenClaim.claims[0].value='invalid-negative-control';
if(!supplemental(brokenClaim).length)throw new Error('Negative claim control did not fail');
const rows=adapters.buildLlmViewRows(data);
for(const [key,list]of Object.entries(rows)){
 if(new Set(list.map(x=>x.id)).size!==list.length)throw new Error('Duplicate rendered row ID in '+key);
 for(const row of list)if(!row.sourceIds?.length)throw new Error('Rendered row lacks evidence: '+row.id);
}
const staged=JSON.parse(fs.readFileSync(path.join(legacyBundle,'research/official-quantized-candidates.json'),'utf8'));
if(staged.some(x=>x.baseRevision!==null))throw new Error('Unexpected staged base revision');
const report={testedOn:manifest.asOf,datasetVersion:manifest.version,typescriptVersion:ts.version,schemaSha256:schemaHash,scope:'Strict dataset types + repository validator + adapter row generation + semantic integrity, including the preserved v0.2 supplement. No GPU run, browser test or full SvelteKit build.',checks:{strictSchema:true,installedTypedModulesEqualJson:hasInstalledEntry,strictInstalledTypedModules:hasInstalledEntry,originalValidator:true,mergedValidator:true,dependencyHashes:true,claimValuesMatchFields:true,knownDatumsHaveEvidence:true,artifactByteSums:true,downloadByteSums:true,exactArtifactRevision:true,negativeReferenceControl:true,negativeClaimControl:true,adapterRows:true,stagingSeparated:true},counts:Object.fromEntries(Object.entries(data).map(([k,v])=>[k,v.length])),mergedCounts:Object.fromEntries(Object.entries(merged).map(([k,v])=>[k,v.length])),viewRows:Object.fromEntries(Object.entries(rows).map(([k,v])=>[k,v.length]))};
const output=arg('--report');if(output)fs.writeFileSync(path.resolve(output),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify(report,null,2));
