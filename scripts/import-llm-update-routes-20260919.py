from pathlib import Path
import json,hashlib,sys
root=Path(__file__).resolve().parents[1];rp=root/'data/llm/v0.3.0/repository.json';r=json.loads(rp.read_text());bd=root/'data/llm/locales/record-bindings.json';b=json.loads(bd.read_text());texts={l:json.loads((root/f'data/llm/locales/records.{l}.json').read_text()) for l in ['fa','en','es']};pack=Path(sys.argv[1]);copy=json.loads((pack/'data/localized-copy.json').read_text())
def write(p,d):p.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n')
def trans(collection,obj,path,values):
 v=obj;parts=path.split('/')
 for part in parts[:-1]:v=v[int(part)] if isinstance(v,list) else v[part]
 v[int(parts[-1]) if isinstance(v,list) else parts[-1]]=values[0]
 entity='repository.'+collection+'/'+obj['id'];entry=b.setdefault(entity,{});key=entry.get(path) or 'update0919.'+hashlib.sha256((entity+'/'+path).encode()).hexdigest()[:18];entry[path]=key
 for lang,value in zip(texts,values):texts[lang][key]=value
for key,slug in [('sentenceTransformers','sentence-transformers'),('kTransformers','ktransformers')]:
 s=next(s for s in r['softwareReleases'] if s['productId']=='software-product:'+slug)
 for path,field in [('targetScenario/value','chooseWhen'),('backendSummary/value','purpose'),('selectionCaveat','limit')]:trans('softwareReleases',s,path,[copy[l][key][field] for l in texts])
# Four new specialists need rows in the same existing specialized view, not a second catalog.
for m in r['models']:
 if not m['id'].startswith(('model:qwen-qwen3-vl-embedding-', 'model:qwen-qwen3-vl-reranker-')):continue
 eid=m['evidenceIds'][0];stem=m['id'][6:];p=next(p for p in r['modelProfiles'] if p['modelVersionId']==m['id'])
 wid='workload:update0919-'+stem
 if not any(w['id']==wid for w in r['workloads']):r['workloads'].append({'id':wid,'applicationId':'enterprise-rag','name':m['exactName'],**{key:{'state':'not-measured'} for key in ['inputLength','outputLength','contextLength','batchSize','concurrency','arrivalRate']},'reasoningMode':{'state':'not-applicable'},'reasoningBudget':{'state':'not-applicable'},'evidenceIds':[eid]})
 aid='specialized-assessment:update0919-'+stem
 if not any(x['id']==aid for x in r['specializedAssessments']):r['specializedAssessments'].append({'id':aid,'modelVersionId':m['id'],'modelRevision':m['version'],'kind':m['kind'],'applicationId':'enterprise-rag','metricName':'','metricValue':{'state':'not-measured'},'metricUnit':'score','workloadId':wid,'limitations':[],'evidenceIds':[eid]})
 gid='model-use:update0919-'+stem
 if not any(g['id']==gid for g in r['modelUseGuidance']):
  g={'id':gid,'modelVersionId':m['id'],'applicationId':'enterprise-rag','role':'retrieval' if m['kind']=='embedding' else 'reranking','summary':'','description':'','distinguishingFeature':'','conditions':[],'basis':'editorial-analysis','evidenceIds':[eid]};r['modelUseGuidance'].append(g)
  for dest,src in [('summary','roleSummary'),('description','introduction'),('distinguishingFeature','introduction')]:
   key=b['repository.modelProfiles/'+p['id']][src];trans('modelUseGuidance',g,dest,[texts[l][key] for l in texts])
 if m['kind']=='embedding':
  dim=2048 if m['totalParametersB']['value']==2 else 4096
  m['specializedSpecs']={'task':{'state':'known','value':'','evidenceIds':[eid]},'output':{'state':'known','value':'','evidenceIds':[eid]},'features':{'state':'known','value':'','evidenceIds':[eid]},'poolingOrScoring':{'state':'unknown'},'languages':{'state':'unknown'},'embeddingDimensions':{'state':'known','value':dim,'evidenceIds':[eid]}}
  for path,values in [('task/value',['بازیابی متن، تصویر و ویدئو','Text, image and video retrieval','Recuperación de texto, imágenes y vídeo']),('output/value',[f'بردار با حداکثر {dim} بُعد',f'Vector with up to {dim} dimensions',f'Vector de hasta {dim} dimensiones']),('features/value',['کاهش بُعد و کم‌دقت‌سازی بردار خروجی؛ نه کوانتیزیشن وزن مدل','Dimension reduction and output-vector quantization; not weight quantization','Reducción de dimensiones y cuantización del vector de salida; no de los pesos'])]:trans('models',m,'specializedSpecs/'+path,values)
# Exact community-converted MLX weights, tied to the model/version named by their cards.
for suffix,mid,version in [('Qwen3-1.7B-4bit','model:qwen-qwen3-1-7b','0.24.0'),('Qwen3-4B-Instruct-2507-4bit','model:qwen-qwen3-4b-instruct-2507','0.26.3')]:
 repo='mlx-community/'+suffix;meta=json.loads((pack/'sources'/(repo.replace('/','--')+'-files.json')).read_text());card=(pack/'sources'/(repo.replace('/','--')+'-card.md')).read_text();import re
 versions=re.findall(r'mlx-lm[^\n]*?(0\.\d+\.\d+)',card);version=versions[0] if versions else version
 rev=meta['sha'];eid='evidence:update0919-mlx-'+suffix.lower();url='https://huggingface.co/'+repo+'/blob/'+rev+'/README.md'
 e={'id':eid,'url':url,'locator':'README conversion version, quantization and usage example; safetensors file inventory','title':repo+' — MLX conversion','organization':'mlx-community','accessedOn':'2026-09-19','kind':'documented-specification','sourceKind':'primary','scope':repo,'versionRevisionOrCommit':rev,'limitations':[],'presentationNotes':[]}
 if not any(x['id']==eid for x in r['evidence']):r['evidence'].append(e)
 p=next(p for p in r['modelProfiles'] if p['modelVersionId']==mid)
 if not any(g['engine']=='MLX LM' for g in p['runGuides']):
  g={'engine':'MLX LM','label':'MLX LM · '+suffix,'href':url,'conditions':['Apple silicon · MLX 4-bit · mlx-lm '+version],'instructions':'','evidenceIds':[eid]};p['runGuides'].append(g)
  trans('modelProfiles',p,'runGuides/'+str(len(p['runGuides'])-1)+'/instructions',['وزن تبدیل‌شدهٔ همین مخزن روی Mac دارای Apple silicon؛ نسخهٔ درج‌شده مربوط به تبدیل و مثال کارت است.','This converted repository on an Apple silicon Mac; the listed version is the card’s conversion/example version.','Pesos de este repositorio convertido en Mac con Apple silicon; la versión indicada corresponde a la conversión y al ejemplo de la ficha.'])
 aid='artifact-listing:update0919-mlx-'+suffix.lower();m=next(m for m in r['models'] if m['id']==mid)
 files=[{'path':f['rfilename'],'bytes':f['size'],'url':'https://huggingface.co/'+repo+'/resolve/'+rev+'/'+f['rfilename']} for f in meta['siblings'] if f['rfilename'].endswith('.safetensors') and isinstance(f.get('size'),int)]
 a={'id':aid,'modelVersionId':mid,'baseModelRepository':m['aliases'][0],'publisher':'mlx-community','authority':'third-party','format':'safetensors','variant':'MLX 4-bit','precision':'4-bit','repositoryUrl':'https://huggingface.co/'+repo,'filesUrl':'https://huggingface.co/'+repo+'/tree/'+rev,'repositoryRevision':rev,'files':files,'totalBytes':sum(f['bytes'] for f in files),'verifiedOn':'2026-09-19','evidenceIds':[eid]}
 if not any(x['id']==aid for x in r['artifactListings']):r['artifactListings'].append(a)
write(rp,r);write(bd,b)
for l,d in texts.items():write(root/f'data/llm/locales/records.{l}.json',d)
