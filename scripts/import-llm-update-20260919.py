"""Adapt the reviewed update into the canonical repository; input stays outside public assets.
Usage: python3 scripts/import-llm-update-20260919.py /path/to/extracted-pack
The sources/ subdirectory contains verified Hugging Face metadata snapshots.
"""
from pathlib import Path
import json,sys,re,hashlib
root=Path(__file__).resolve().parents[1];pack=Path(sys.argv[1]);bundle=root/'data/llm/v0.3.0'
def read(p):return json.loads(p.read_text())
def write(p,d):p.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n')
r=read(bundle/'repository.json');bindings=read(root/'data/llm/locales/record-bindings.json')
texts={lang:read(root/f'data/llm/locales/records.{lang}.json') for lang in ['fa','en','es']}
def upsert(key,item):
 rows=r[key];old=next((i for i,x in enumerate(rows) if x['id']==item['id']),None)
 if old is None:rows.append(item)
 else:rows[old]=item
 return item
def trans(key,obj,path,fa,en,es):
 parts=path.split('/');v=obj
 for part in parts[:-1]:v=v[int(part)] if isinstance(v,list) else v[part]
 if isinstance(v,list):v[int(parts[-1])]=fa
 else:v[parts[-1]]=fa
 entity='repository.'+key+'/'+obj['id'];entry=bindings.setdefault(entity,{});k=entry.get(path) or 'update0919.'+hashlib.sha256((entity+'/'+path).encode()).hexdigest()[:18];entry[path]=k
 for lang,val in zip(['fa','en','es'],[fa,en,es]):texts[lang][k]=val
 return fa
def known(v,e,unit=None):return {'state':'known','value':v,'evidenceIds':[e],**({'unit':unit} if unit else {})}
unknown={'state':'unknown'}
added=[]
for source in read(pack/'data/model-additions.json')['models']:
 repo=source['repoId'];slug=re.sub('[^a-z0-9]+','-',repo.lower()).strip('-');mid='model:'+slug;eid='evidence:update0919-'+slug
 old=next((m for m in r['models'] if repo in m.get('aliases',[])),None)
 if old and old['id']!=mid:raise ValueError('Existing model requires explicit mapping: '+repo)
 meta=read(pack/'sources'/(repo.replace('/','--')+'-metadata.json'));rev=meta['sha'];assert re.fullmatch('[a-f0-9]{40}',rev)
 card='https://huggingface.co/'+repo+'/blob/'+rev+'/README.md';licenseurl=source['sourceUrls'].get('license',card).replace('/main/','/'+rev+'/')
 e=upsert('evidence',dict(id=eid,url=card,title=source['displayName']+' — model card',organization=source['publisher'],accessedOn=source['accessedOn'],locator='Model description, context, runtime examples and license',kind='publisher-report',sourceKind='primary',scope=repo,versionRevisionOrCommit=rev,limitations=[]))
 total=source['declaredTotalParametersBillion'];active=source['declaredActiveParametersBillion'];qwen=repo.startswith('Qwen/');kind='embedding' if 'Embedding' in repo else 'reranker' if 'Reranker' in repo else 'vision-language' if 'image' in source['inputModalities'] else 'generative'
 m=dict(id=mid,familyId='family:qwen' if qwen else 'family:glm' if repo.startswith('zai-org') else 'family:kimi',exactName=source['displayName'],publisher=source['publisher'],version=rev,aliases=[repo],stage='other' if qwen else 'instruct',architecture='dense' if qwen else 'moe',attentionArchitecture='other',totalParametersB=known(total,eid,'billion-parameters') if total is not None else unknown.copy(),activeParametersB=known(active,eid,'billion-parameters') if active is not None else {'state':'not-applicable'} if qwen else unknown.copy(),kind=kind,inputModalities=source['inputModalities'],outputModalities=['embedding'] if kind=='embedding' else ['structured-data'] if kind=='reranker' else ['text'],applications=['enterprise-rag','document-vision'] if qwen else ['coding-assistant','agents-tools','reasoning-analysis'],languages=[{'language':lang,'declared':known(True,eid)} for lang in (meta.get('cardData') or {}).get('language',[])],persianEvidenceStatus='not-evaluated',declaredContext=known(source['documentedContextTokens'],eid,'token'),evaluatedContext={'state':'not-measured'},releaseStatus='available',lastReviewedOn=source['accessedOn'],license={'name':known(source['license']['name'],eid),'url':known(licenseurl,eid),'commercialUse':known('allowed' if source['license']['category']=='permissive' else 'restricted',eid),'restrictions':[],'evidenceIds':[eid]},evidenceIds=[eid])
 if qwen:m['configurationContext']=known(source['configMaxPositionEmbeddings'],eid,'token')
 stored=source.get('storedTensorParameterMetadata')
 if stored:
  m['parameterCounts']=[{'scope':'stored','label':'','value':known(stored['count']/1e9,eid,'billion-parameters'),'approximate':False}]
  trans('models',m,'parameterCounts/0/label','پارامترهای ذخیره‌شده در مخزن','Stored repository parameters','Parámetros almacenados en el repositorio')
 if source['license']['category']=='custom':
  en=source['license']['conditionsSummaryEn']
  if 'GLM' in repo:
   fa='حفظ اعلان مجوز لازم است. ارائه‌دهندهٔ Model as a Service با درآمد مجموع خود و شرکت‌های وابسته بیش از ۱۰ میلیارد دلار در هر ۱۲ ماه متوالی، پیش از استفادهٔ تجاری به بررسی امنیتی Z.ai نیاز دارد. محصولات با قابلیت تعبیه‌شده و انتقال صرف درخواست استثناهای تعریف‌شده دارند.'
   es='Debe conservarse el aviso. Si un operador de Model as a Service y sus filiales superan en conjunto 10.000 millones de USD de ingresos en 12 meses consecutivos, se requiere una revisión de seguridad de Z.ai antes del uso comercial. La licencia define excepciones para funciones integradas y el mero reenvío de solicitudes.'
  elif 'K3' in repo:
   fa='حفظ اعلان مجوز لازم است. برای ارائهٔ Model as a Service، درآمد مجموع شرکت و وابستگان بیش از ۲۰ میلیون دلار در هر ۱۲ ماه متوالی، توافق جداگانه می‌خواهد. نمایش نام مدل برای محصول با بیش از ۱۰۰ میلیون کاربر فعال ماهانه یا ۲۰ میلیون دلار درآمد ماهانه لازم است. بندهای ۲ و ۳ برای استفادهٔ داخلیِ تعریف‌شده و دسترسی رسمی یا شریک تأییدشده استثنا دارند.'
   es='Debe conservarse el aviso. Un operador de Model as a Service con ingresos conjuntos del titular y sus filiales superiores a 20 millones de USD en 12 meses consecutivos necesita un acuerdo. La marca debe mostrarse si el producto supera 100 millones de usuarios activos mensuales o 20 millones de USD de ingresos mensuales. Las secciones 2 y 3 eximen el uso interno definido y el acceso oficial o mediante socios certificados.'
  else:
   fa='حفظ اعلان مجوز لازم است. محصول یا خدمت تجاری با بیش از ۱۰۰ میلیون کاربر فعال ماهانه یا ۲۰ میلیون دلار درآمد ماهانه باید نام تعیین‌شدهٔ مدل را به‌وضوح نمایش دهد.'
   es='Debe conservarse el aviso. El producto o servicio comercial debe mostrar de forma destacada el nombre indicado del modelo si supera 100 millones de usuarios activos mensuales o 20 millones de USD de ingresos mensuales.'
  m['license']['restrictions']=[''];trans('models',m,'license/restrictions/0',fa,en,es)
 upsert('models',m)
 p=dict(id='model-profile:'+slug,modelVersionId=mid,introduction='',roleSummary='',distinguishingFeatures=[],officialUrl='https://huggingface.co/'+repo,runGuides=[],evidenceIds=[eid])
 if kind=='embedding':desc=('بازیابی متن، تصویر و ویدئو با بردارهایی در ابعاد ۶۴ تا '+str(source['embeddingDimensionMax'])+'؛ ورودی وظیفه تا ۳۲ هزار توکن.',f'Text, image and video retrieval with 64–{source["embeddingDimensionMax"]} dimensional vectors and a task context of 32K tokens.',f'Recuperación de texto, imágenes y vídeo con vectores de 64–{source["embeddingDimensionMax"]} dimensiones y un contexto de tarea de 32K tokens.');role=('بازیابی چندوجهی','Multimodal retrieval','Recuperación multimodal')
 elif kind=='reranker':desc=('امتیازدهی به ارتباط پرسش با متن، تصویر یا ویدئو؛ بازرتبه‌بندی نتایج بازیابی با ورودی تا ۳۲ هزار توکن.','Scores query relevance for text, images and video; reranks retrieved candidates with up to 32K task tokens.','Puntúa la relevancia de texto, imágenes y vídeo respecto a la consulta; reordena candidatos con hasta 32K tokens.');role=('بازرتبه‌بندی چندوجهی','Multimodal reranking','Reordenación multimodal')
 else:
  desc=('مدل بزرگ برای کدنویسی و اجرای کارهای چندمرحله‌ای'+(' با ورودی متن، تصویر و ویدئو.' if kind=='vision-language' else ' با ورودی متن.'),source['declaredUse'],'Modelo grande para programación y tareas de varios pasos'+(' con entradas de texto, imagen y vídeo.' if kind=='vision-language' else ' con entrada de texto.'));role=('کدنویسی و استفاده از ابزار','Coding and tool use','Programación y uso de herramientas')
 trans('modelProfiles',p,'introduction',*desc);trans('modelProfiles',p,'roleSummary',*role)
 routes=source.get('documentedRuntimeRoutes',[])
 if qwen:routes=[{'engine':'Transformers','sourceUrl':card,'minimumVersionStatedInModelCard':'4.57.0'}]
 for route in routes:
  g=dict(label=route['engine'],engine=route['engine'],href=route['sourceUrl'].replace('https://huggingface.co/'+repo,card) if route['sourceUrl']=='https://huggingface.co/'+repo else route['sourceUrl'],conditions=[],evidenceIds=[eid])
  if route.get('minimumVersionStatedInModelCard'):g['conditions']=[route['engine']+' ≥ '+route['minimumVersionStatedInModelCard']]
  if qwen:g['instructions']='';p['runGuides'].append(g);trans('modelProfiles',p,f'runGuides/{len(p["runGuides"])-1}/instructions','پردازش متن، تصویر و ویدئو با کد نمونهٔ همین مدل.','Process text, images and video with this model’s example code.','Procesa texto, imágenes y vídeo con el código de ejemplo de este modelo.')
  else:p['runGuides'].append(g)
 upsert('modelProfiles',p)
 filesmeta=read(pack/'sources'/(repo.replace('/','--')+'-files.json'))
 files=[{'path':f['rfilename'],'url':'https://huggingface.co/'+repo+'/resolve/'+rev+'/'+f['rfilename'],'bytes':f['size']} for f in filesmeta['siblings'] if f['rfilename'].endswith('.safetensors') and isinstance(f.get('size'),int)]
 listing=dict(id='artifact-listing:update0919-'+slug,modelVersionId=mid,baseModelRepository=repo,baseRevision=rev,publisher=source['publisher'],authority='official',format='safetensors',variant=source.get('availableArtifactPrecision','checkpoint'),repositoryUrl='https://huggingface.co/'+repo,filesUrl='https://huggingface.co/'+repo+'/tree/'+rev,repositoryRevision=rev,files=files,verifiedOn=source['accessedOn'],evidenceIds=[eid])
 if files:listing['totalBytes']=sum(f['bytes'] for f in files)
 else:listing['inventoryStatus']='not-recorded'
 if source.get('availableArtifactPrecision'):listing['precision']=source['availableArtifactPrecision'].lower()
 upsert('artifactListings',listing)
 # No universal KV estimator is created for DSA/MLA/KDA or visual inputs.
 added.append(mid)
for source in read(pack/'data/published-results.json')['results']:
 m=next(m for m in r['models'] if source['modelRepoId'] in m.get('aliases',[]));eid='evidence:update0919-result-'+source['id']
 upsert('evidence',dict(id=eid,url=source['sourceUrl'],title=source['benchmark']+' — '+source['reporter'],organization=source['reporter'],accessedOn=source['accessedOn'],locator=source['sourceLocator'],kind='publisher-report',sourceKind='primary',scope=m['exactName'],limitations=[]))
 item=dict(id='published-evaluation:update0919-'+source['id'],modelVersionId=m['id'],reportedModelName=m['exactName'],reporter=source['reporter'],reportingRelationship='publisher',benchmark=source['benchmark'],metric=source['metric'],value=source['value'],unit=source['unit'],settings={k:v for k,v in source['settings'].items() if v is not None},applicationIds=['enterprise-rag','document-vision'] if 'Qwen/' in source['modelRepoId'] else ['coding-assistant','agents-tools'],accessedOn=source['accessedOn'],limitations=[],languageScope={'kind':'single','language':source['language']} if source['language'] else {'kind':'unspecified'},evidenceIds=[eid])
 # Source-specific group hints are NOT automatically promoted to a comparable protocol.
 upsert('publishedEvaluations',item)
 for i,lim in enumerate(source['limitations']):
  item['limitations'].append(lim)
  translations={
   'Other models in the publisher table use their best scores across different harnesses. No controlled cross-vendor comparison is asserted.':('ستون‌های سایر مدل‌ها از ابزارهای اجرای متفاوت استفاده می‌کنند؛ مقایسهٔ کنترل‌شدهٔ میان ناشران نیست.','Las columnas de otros modelos usan distintas herramientas de evaluación; no es una comparación controlada entre proveedores.'),
   'The separate 60.7 score uses the publisher-corrected verified variant and is not imported as the same experiment.':('امتیاز ۶۰٫۷ مربوط به نسخهٔ اصلاح‌شدهٔ ناشر است؛ آزمون اصلی امتیاز ۵۶٫۲ دارد.','La puntuación 60,7 corresponde a la variante corregida por el editor; el ensayo original obtiene 56,2.'),
   'Full run conditions are not present beside this model-card table; do not inherit GLM-5 conditions.':('شرایط کامل اجرای GLM-5.1 در این گزارش مشخص نیست.','El informe no especifica todas las condiciones de ejecución de GLM-5.1.'),
   'Results name GLM-5.3; evaluation precision is not established merely by the BF16 repository name.':('نتیجه با نام GLM-5.3 گزارش شده؛ دقت وزن آزموده‌شده مشخص نیست.','El resultado se atribuye a GLM-5.3; no se especifica la precisión de los pesos evaluados.'),
   'Only this pair is grouped. GPT/Claude columns in the same table use different harnesses. Exact evaluated weight revisions are not specified.':('این دو مدل با Kimi Code CLI آزموده شده‌اند؛ ستون‌های GPT و Claude ابزار اجرای متفاوت دارند. نسخهٔ دقیق وزن‌ها مشخص نیست.','Estos dos modelos usan Kimi Code CLI; las columnas de GPT y Claude emplean otras herramientas. No se especifica la revisión exacta de los pesos.'),
   'Aggregate benchmark score, not a Persian retrieval score.':('امتیاز تجمیعی مجموعه‌آزمون است؛ نتیجهٔ جداگانهٔ فارسی نیست.','Es una puntuación agregada, sin resultado separado para persa.'),
   'All and VisDoc Overall are different aggregates.':('All و VisDoc Overall دو تجمیع متفاوت از داده‌های آزمون‌اند.','All y VisDoc Overall agregan conjuntos diferentes.'),
   'Candidate-pool and exact metric protocol need the technical report before this group can become a strict sortable comparison. Values remain attributable published observations.':('تعداد نامزدها و تعریف دقیق معیار در جدول مشخص نیست؛ اعداد برای مقایسهٔ هم‌شرط کافی نیستند.','La tabla no especifica el conjunto de candidatos ni la definición exacta de la métrica; no permite una comparación controlada.')}
  fa,es=translations.get(lim,('شرایط این نتیجه در منبع آمده است.','Las condiciones del resultado se describen en la fuente.'))
  if lim not in translations:raise ValueError('Translate limitation explicitly: '+lim)
  trans('publishedEvaluations',item,'limitations/'+str(i),fa,lim,es)
# E5 is already present: match original observation identity without importing it again.
for old in read(pack/'data/existing-e5-aligned-evidence.json')['results']:
 matches=[x for x in r['publishedEvaluations'] if x['id']==old['id'] or any(o['id']==old['id'] for o in x.get('referenceObservations',[]))]
 assert len(matches)==1,old['id']
 assert matches[0]['value']==old['value']
for e in r['evidence']:
 if e['id'].startswith('evidence:update0919-'):e['presentationNotes']=[]
write(bundle/'repository.json',r);write(root/'data/llm/locales/record-bindings.json',bindings)
for lang,d in texts.items():write(root/f'data/llm/locales/records.{lang}.json',d)
manifest=read(bundle/'manifest.json');manifest['asOf']='2026-09-19';manifest['baseModels']=len(r['models']);manifest['basePublishedEvaluations']=len(r['publishedEvaluations']);manifest['update20260919']={'models':len(added),'publishedResults':16,'e5ObservationsReused':12};write(bundle/'manifest.json',manifest)
print('Adapted models:',len(added),'catalog:',len(r['models']),'evaluations:',len(r['publishedEvaluations']))
