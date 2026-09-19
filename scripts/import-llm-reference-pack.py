"""Idempotent adapter from the reviewed 2026-09-16 pack into the current canonical repository.
Never restores baseline fingerprints. Run generate:llm and verify:llm after importing.
"""
from pathlib import Path
import json, hashlib, copy
ROOT=Path(__file__).resolve().parents[1]
BUNDLE=ROOT/'data/llm/v0.3.0'; PACK=BUNDLE/'research/reference-pack-2026-09-16'
def read(p): return json.loads(p.read_text())
def write(p,x): p.write_text(json.dumps(x,ensure_ascii=False,indent=2)+'\n')
r=read(BUNDLE/'repository.json'); before=copy.deepcopy(r)
pack=lambda name:read(PACK/'data'/f'{name}.json')
logs=[]
def upsert(key,item):
 rows=r.setdefault(key,[]); old=next((x for x in rows if x['id']==item['id']),None)
 if old is None: rows.append(item); action='added'
 elif old==item: action='unchanged'
 else: rows[rows.index(old)]=item; action='updated'
 logs.append(dict(entity=key,id=item['id'],action=action)); return item
bindings=read(ROOT/'data/llm/locales/record-bindings.json')
texts={lang:read(ROOT/f'data/llm/locales/records.{lang}.json') for lang in ['fa','en','es']}
def localized(key,item,path,values):
 k='reference.'+hashlib.sha256((key+'/'+item['id']+'/'+path).encode()).hexdigest()[:16]
 bindings.setdefault('repository.'+key+'/'+item['id'],{})[path]=k
 for lang in texts: texts[lang][k]=values[lang]
 target=item
 bits=path.split('/')
 for bit in bits[:-1]: target=target[int(bit)] if isinstance(target,list) else target[bit]
 if isinstance(target,list):target[int(bits[-1])]=values['fa']
 else:target[bits[-1]]=values['fa']
def known(value,eids,unit=None):
 return dict(state='known',value=value,evidenceIds=eids,**({'unit':unit} if unit else {}))
sources={s['id']:s for s in pack('source-register')}; source_map={sid:'evidence:reference-'+sid[len('source:'):] for sid in sources}
def evidence(sid,locator=None):
 s=sources[sid];eid=source_map[sid]
 if locator:eid+='-'+hashlib.sha256(locator.encode()).hexdigest()[:10]
 e=dict(id=eid,url=s['url'],title=s['title'],accessedOn=s['accessedOn'],locator=locator or 'Captured source document',kind='publisher-report',sourceKind='primary',scope=s['revisionMeaning'],presentationNotes=[],sourceCapture={k:s[k] for k in ['capturedAt','contentSha256','revisionMeaning']})
 e['sourceCapture']['sourceId']=sid
 if s['documentRevision']:e['versionRevisionOrCommit']=s['documentRevision']
 upsert('evidence',e);return eid
for sid in sources:evidence(sid)
# Publisher repository and exact/alias identity take precedence over the historical pack IDs.
model_map={}; baseline=pack('baseline-model-index')
for m in baseline+pack('model-additions'):
 aliases={str(m.get(k,'')).lower() for k in ['repository','name','exactName']}-{''}
 matches=[x for x in r['models'] if aliases.intersection({x['exactName'].lower(),*[a.lower() for a in x.get('aliases',[])]})]
 if len(matches)>1:raise ValueError(('Ambiguous model identity',m['id'],[x['id'] for x in matches]))
 model_map[m['id']]=matches[0]['id'] if matches else m['id']
for m in pack('model-additions'):
 mid=model_map[m['id']];facts={f['field']:f for f in m['facts']}; fe={key:evidence(f['sourceId'],f['locator']) for key,f in facts.items()};eids=list(dict.fromkeys(fe.values()))
 family_name='Salamandra' if 'salamandra' in mid else 'MiniCPM' if 'minicpm' in mid else 'LFM' if 'lfm' in mid else 'Granite'
 existing=next((f for f in r['families'] if f['name'].lower()==family_name.lower()),None)
 family=existing or upsert('families',dict(id='family:'+family_name.lower(),name=family_name,publisher=m['publisher'],evidenceIds=eids))
 license_eid=fe['license.name'];restr=[]
 if m.get('commercialUse'):
  license_eid=evidence(m['commercialUse']['sourceId'],m['commercialUse']['locator']);eids.append(license_eid);restr=['']
 license=dict(name=known(facts['license.name']['value'],[fe['license.name']]),url=known(sources[m.get('licenseSourceId',facts['license.name']['sourceId'])]['url'],[license_eid]),commercialUse=known('restricted' if restr else 'allowed',[license_eid]),restrictions=restr,evidenceIds=[license_eid])
 primary=('structured-extraction','structured-output') if 'lfm' in mid else ('reasoning-analysis','reasoning') if ('granite' in mid or 'minicpm' in mid) else ('text-work','text-generation')
 obj=dict(id=mid,familyId=family['id'],exactName=m['name'],publisher=m['publisher'],version=m['repositoryRevision'],aliases=[m['repository']],stage='instruct',architecture='hybrid' if 'hybrid' in m['architecture'] else 'dense',totalParametersB=known(facts['totalParameters']['value']/1e9,[fe['totalParameters']],'billion-parameters'),activeParametersB={'state':'not-applicable'},kind='generative',inputModalities=['text'],outputModalities=['text'],applications=[primary[0]],languages=[dict(language=lang,declared=known(True,[fe['declaredLanguages']])) for lang in facts['declaredLanguages']['value']],persianEvidenceStatus='not-evaluated',declaredContext=known(facts['declaredContext']['value'],[fe['declaredContext']],'token'),configurationContext=known(facts['config.max_position_embeddings']['value'],[fe['config.max_position_embeddings']],'token'),evaluatedContext={'state':'not-measured'},releaseStatus='available',lastReviewedOn='2026-09-16',license=license,evidenceIds=eids)
 if restr:localized('models',obj,'license/restrictions/0',dict(fa='مجوز LFM Open License 1.0 استفادهٔ تجاری را به شرایط درآمدی بندهای ۱ و ۵ وابسته می‌کند.',en='LFM Open License 1.0 makes commercial use subject to the revenue conditions in Sections 1 and 5.',es='LFM Open License 1.0 condiciona el uso comercial a los requisitos de ingresos de las secciones 1 y 5.'))
 if 'granite' in mid:
  obj['thinkingMode']='switchable';obj['contextExtension']=dict(capacity={'state':'unknown','evidenceIds':[fe['declaredContext']]},condition='')
  localized('models',obj,'contextExtension/condition',dict(fa='ادعای گسترش 512K ناشر؛ ظرفیت بومی ۱۳۱٬۰۷۲ توکن است و آزمون کیفیت زمینهٔ گسترش‌یافته ثبت نشده است.',en='Publisher 512K extension claim; native context is 131,072 tokens. Extended-context quality is not evaluated here.',es='Ampliación a 512K declarada por el editor; el contexto nativo es de 131.072 tokens. No hay aquí evaluación de calidad del contexto ampliado.'))
 old=next((x for x in r['models'] if x['id']==mid),None)
 # New fields enrich an existing exact identity; never replace previously reviewed catalog facts.
 if old and not any(x.get('sourceCapture') for x in before['evidence'] if x['id'] in old.get('evidenceIds',[])):
  obj={**obj,**old,'configurationContext':obj['configurationContext'],'evidenceIds':list(dict.fromkeys(old['evidenceIds']+eids))}
 upsert('models',obj)
 role_copy=dict(fa='تولید متن به زبان‌های ایبری',en='Iberian-language text generation',es='Generación de texto en lenguas ibéricas') if 'salamandra' in mid else dict(fa='استخراج اطلاعات روی دستگاه',en='On-device information extraction',es='Extracción de información en el dispositivo') if 'lfm' in mid else dict(fa='استدلال با مدل کوچک',en='Reasoning with a compact model',es='Razonamiento con un modelo compacto')
 profile=dict(id=mid.replace('model:','model-profile:'),modelVersionId=mid,introduction='',roleSummary='',distinguishingFeatures=[],officialUrl='https://huggingface.co/'+m['repository'],runGuides=[],evidenceIds=eids)
 profile['runGuides']=[dict(label='',engine='Publisher documentation',href='https://huggingface.co/'+m['repository'],conditions=[],evidenceIds=[fe['declaredContext']])]
 localized('modelProfiles',profile,'runGuides/0/label',dict(fa='دستور اجرای ناشر',en='Publisher execution instructions',es='Instrucciones de ejecución del editor'))
 localized('modelProfiles',profile,'introduction',m['profile']);localized('modelProfiles',profile,'roleSummary',role_copy)
 upsert('modelProfiles',profile)
 listing=dict(id=mid.replace('model:','artifact-listing:reference-'),modelVersionId=mid,baseModelRepository=m['repository'],baseRevision=m['repositoryRevision'],publisher=m['publisher'],authority='official',format='safetensors',variant=m['name'],repositoryUrl=profile['officialUrl'],filesUrl=profile['officialUrl']+'/tree/'+m['repositoryRevision'],repositoryRevision=m['repositoryRevision'],inventoryStatus='not-recorded',files=[],sizeDescription='',verifiedOn='2026-09-16',evidenceIds=[fe['totalParameters']])
 localized('artifactListings',listing,'sizeDescription',dict(fa='حجم فایل‌ها در این بررسی ثبت نشده است.',en='File sizes were not recorded in this review.',es='Esta revisión no registró el tamaño de los archivos.'))
 upsert('artifactListings',listing)
 primary=('structured-extraction','structured-output') if 'lfm' in mid else ('reasoning-analysis','reasoning') if ('granite' in mid or 'minicpm' in mid) else ('text-work','text-generation')
 obj['applications']=[primary[0]]
 # Remove only obsolete guidance authored by this importer, retaining all pre-existing records.
 obsolete={mid.replace('model:','model-use:')+':'+app for app in ['text-work','structured-extraction'] if app!=primary[0]}
 r['modelUseGuidance']=[g for g in r['modelUseGuidance'] if g['id'] not in obsolete]
 for gid in obsolete:
  binding=bindings.pop('repository.modelUseGuidance/'+gid,{})
  for tid in binding.values():
   for lang in texts:texts[lang].pop(tid,None)
 for app,role in [primary]:
  g=dict(id=mid.replace('model:','model-use:')+':'+app,modelVersionId=mid,applicationId=app,role=role,summary='',description='',distinguishingFeature='',conditions=[],basis='publisher-summary',evidenceIds=eids)
  localized('modelUseGuidance',g,'summary',role_copy)
  for field in ['description','distinguishingFeature']:localized('modelUseGuidance',g,field,m['profile'])
  upsert('modelUseGuidance',g)
# MLX LM is a product separate from the MLX framework; only documented capabilities.
s=pack('software-additions')[0];pid='software-product:mlx-lm';rid='software-release:mlx-lm-v0-31-3';se=[source_map[x] for x in s['sourceIds']]+[source_map[s['releaseSourceId']],source_map[s['licenseSourceId']]]
upsert('softwareProducts',dict(id=pid,name=s['name'],officialUrl=s['projectUrl'],taxonomyRoleHints=['inference-engine-library'],evidenceIds=se))
sw=dict(id=rid,productId=pid,version=s['snapshotRelease'],lastReviewedOn='2026-09-16',roles=['inference-engine-library'],environments=['desktop','workstation'],operatingSystems=['macOS'],hardwareKinds=['Apple silicon'],localOrCloud=['local'],offlineOperation={'state':'unknown'},license=dict(name=known('MIT',[se[-1]]),url=known(sources[s['licenseSourceId']]['url'],[se[-1]]),commercialUse=known('allowed',[se[-1]]),restrictions=[],evidenceIds=[se[-1]]),maintenanceStatus='active',selectionCaveat='',documentedNeeds=s['documentedCapabilities'],evidenceIds=se)
sw['targetScenario']=known('',se);sw['backendSummary']=known('MLX',se);sw['documentedBackends']=['MLX']
localized('softwareReleases',sw,'targetScenario/value',dict(fa='اجرای محلی و کم‌دقت‌سازی مدل‌های سازگار روی Apple silicon',en='Local generation and quantization of compatible models on Apple silicon',es='Generación local y cuantización de modelos compatibles en Apple silicon'))
localized('softwareReleases',sw,'selectionCaveat',s['profile']);upsert('softwareReleases',sw)
for capability in ['task-generation','streaming','prefix-caching','multi-gpu-sharding']:
 upsert('softwareCapabilities',dict(id='software-capability:mlx-lm-'+capability,capability=capability,status='conditional',provision='native',scope=dict(softwareReleaseId=rid,conditions=['Compatible MLX LM model and release']),limitations=[],evidenceIds=se))
# Manually reviewed repeated experiments: original publisher results subsequently reproduced in
# its updated model card. Different OpenBMB reproduction or coincidental equal scores stay separate.
merge={
 'evaluation:supplement-5e30d2472fc2b2bc':'published-evaluation:v03-e1137b2dba1b68234cff',
 'evaluation:supplement-c20455489da56598':'published-evaluation:v03-18054503cef42b07d991',
 'evaluation:supplement-17f954ccb5ba1468':'published-evaluation:v03-4a65e5ee5f31c05bcae4',
 'evaluation:supplement-60b6e4fd15d347aa':'published-evaluation:v03-c41be34d5ecfd544ca0b',
 'evaluation:supplement-d2402048f1f183e4':'published-evaluation:v03-d259ae3684f4b7c2fd76',
 'evaluation:supplement-530967d2b894a578':'published-evaluation:v03-7240f08f87bab278e5ea',
 'evaluation:supplement-9d1d464e23b2b9f7':'published-evaluation:qwen-qwen3-embedding-0-6b-mteb',
 'evaluation:supplement-0f624f4cb95961eb':'published-evaluation:qwen-qwen3-embedding-4b-mteb',
 'evaluation:supplement-1672818662cf7840':'published-evaluation:qwen-qwen3-embedding-8b-mteb'}
promotions={
 'evaluation:supplement-4f9b1b67bcb6d55b':'published-evaluation:v02-quality:qwen-reranker-qwen-qwen3-reranker-0-6b-mteb-r-main-score-published-aggregate-none',
 'evaluation:supplement-fe980ae85dfb9969':'published-evaluation:v02-quality:qwen-reranker-qwen-qwen3-reranker-0-6b-mmteb-r-main-score-published-aggregate-none',
 'evaluation:supplement-e4b7f36a2e5be102':'published-evaluation:v02-quality:qwen-reranker-qwen-qwen3-reranker-4b-mteb-r-main-score-published-aggregate-none',
 'evaluation:supplement-a370f21efa13ad75':'published-evaluation:v02-quality:qwen-reranker-qwen-qwen3-reranker-4b-mmteb-r-main-score-published-aggregate-none',
 'evaluation:supplement-0533f0062c9fe297':'published-evaluation:v02-quality:qwen-reranker-qwen-qwen3-reranker-8b-mteb-r-main-score-published-aggregate-none',
 'evaluation:supplement-8473dd5579792f09':'published-evaluation:v02-quality:qwen-reranker-qwen-qwen3-reranker-8b-mmteb-r-main-score-published-aggregate-none'}
# Promote existing runtime supplement IDs, so its enrichment merges evidence by identity.
for original,target in promotions.items():
 temporary=original.replace('evaluation:','published-evaluation:reference-')
 for item in r['publishedEvaluations']:
  if item['id']==temporary:item['id']=target
mapping={**merge,**promotions}
evaluation_map={}
for original in pack('published-evaluations'):
 x=copy.deepcopy(original);x['modelRef']=model_map.get(x['modelRef'],x['modelRef']);x['sourceCaptureSha256']=sources[x['sourceId']]['contentSha256'];x['sourceId']=source_map[x['sourceId']]
 if x['settings'].get('protocolSourceId'):x['settings']['protocolSourceId']=source_map[x['settings']['protocolSourceId']]
 eid=evidence(original['sourceId'],x['sourceLocator']);id=mapping.get(x['id'],x['id'].replace('evaluation:','published-evaluation:reference-'));evaluation_map[x['id']]=id
 old=next((z for z in r['publishedEvaluations'] if z['id']==id),None)
 model=next(m for m in r['models'] if m['id']==x['modelRef'])
 if id in merge.values():
  assert old is not None and old['value']==x['value'] and old['modelVersionId']==x['modelRef']
  obj=copy.deepcopy(old);obj['evidenceIds']=list(dict.fromkeys(old['evidenceIds']+[eid]))
 else:
  language=x['language'];scope={'kind':'unspecified'} if language is None else {'kind':'aggregate'} if language=='multilingual' else {'kind':'single','language':language}
  obj=dict(id=id,modelVersionId=x['modelRef'],reportedModelName=model['exactName'],reporter=x['reporter'],reportingRelationship=x['reportingRelationship'],benchmark=x['benchmark'],metric=x['metric'],value=x['value'],unit=x['unit'],settings={k:v for k,v in x['settings'].items() if v is not None},applicationIds=model['applications'],accessedOn=x['accessedOn'],limitations=[],evidenceIds=[eid],languageScope=scope)
  for key in ['language','benchmarkVersion','sourceDocumentRevision','evaluatedOn','comparisonGroup']:
   if x.get(key) is not None:obj[key]=x[key]
  if x['evaluatedWeightRevision']:obj['evaluatedRevision']=x['evaluatedWeightRevision']
  if x['settings'].get('mode'):obj['mode']=x['settings']['mode']
 observations={z['id']:z for z in obj.get('referenceObservations',[])};observations[x['id']]=x;obj['referenceObservations']=list(observations.values());upsert('publishedEvaluations',obj)
for group in pack('comparison-groups'):
 group['sourceIds']=[source_map[x] for x in group['sourceIds']]
 # evaluationIds intentionally refer to report observations inside canonical evaluations.
 upsert('referenceComparisons',group)
for g in pack('selection-guidance'):
 g['candidateModelRefs']=[model_map.get(x,x) for x in g['candidateModelRefs']];g['candidateNames']={mid:next(m['exactName'] for m in r['models'] if m['id']==mid) for mid in g['candidateModelRefs']};upsert('selectionGuidance',g)
for a in read(BUNDLE/'research/reference-editorial.json'):upsert('articleSections',a)
for q in pack('quantization-study'):
 q['sourceId']=evidence(q['sourceId'],q['sourceLocator']);upsert('quantizationStudies',q)
write(BUNDLE/'repository.json',r)
write(ROOT/'data/llm/locales/record-bindings.json',bindings)
for lang,x in texts.items():write(ROOT/f'data/llm/locales/records.{lang}.json',x)
manifest=read(BUNDLE/'manifest.json');manifest['baseModels']=len(r['models']);manifest['basePublishedEvaluations']=len(r['publishedEvaluations']);manifest['referencePack']={'asOf':'2026-09-16','models':len(pack('model-additions')),'softwareProducts':len(pack('software-additions')),'observations':len(pack('published-evaluations')),'mergedObservations':len(merge)+len(promotions),'promotedSupplementResults':len(promotions),'comparisons':len(r['referenceComparisons']),'selectionGuides':len(r['selectionGuidance']),'articleSections':len(r['articleSections']),'quantizationObservations':len(r['quantizationStudies']),'sourceDocuments':len(sources)};write(BUNDLE/'manifest.json',manifest)
report={'modelMapping':model_map,'sourceMapping':source_map,'evaluationMapping':evaluation_map,'mergedExperiments':merge,'promotedSupplementResults':promotions,'normalization':{'scale':'Original score-points retained; no percentage multiplication','language':'Null retained as unspecified','revision':'Document revision never becomes tested weight revision','SalamandraLanguageLiteral':'Publisher literal \\no retained, not guessed'},'counts':{k:len(v) for k,v in r.items() if isinstance(v,list)}}
write(BUNDLE/'research/reference-import-mapping.json',report)
print(json.dumps({key:sum(x['action']==key for x in logs) for key in ['added','updated','unchanged']}));print('Semantic repository change:',r!=before)

method=pack('editorial-methodology')
for lang in texts:
 path=ROOT/f'data/llm/locales/messages.{lang}.json';messages=read(path)
 for field in ['title','intro','comparisonNotice']:messages['reference.methodology.'+field]=method[field][lang]
 for label,values in method['evidenceLabels'].items():messages['reference.evidence.'+label]=values[lang]
 write(path,messages)
