"""Import pinned translation packages and editorial task specializations; no generated benchmark scores."""
from pathlib import Path
import json,re,hashlib
root=Path(__file__).resolve().parents[1];data=root/'data/llm';src=data/'sources/task-specialists-2026-09-20'
def read(p):return json.loads(p.read_text())
def write(p,x):p.write_text(json.dumps(x,ensure_ascii=False,indent=2)+'\n')
r=read(data/'v0.3.0/repository.json');bindings=read(data/'locales/record-bindings.json');texts={l:read(data/('locales/records.'+l+'.json')) for l in ['fa','en','es']}
def upsert(k,x):
 r[k]=[v for v in r[k] if v['id']!=x['id']]+[x];return x
def trans(k,x,path,*values):
 obj=x;parts=path.split('/')
 for p in parts[:-1]:obj=obj[int(p)] if isinstance(obj,list) else obj[p]
 if isinstance(obj,list):obj[int(parts[-1])]=values[0]
 else:obj[parts[-1]]=values[0]
 entity='repository.'+k+'/'+x['id'];key='tasks0920.'+hashlib.sha256((entity+'/'+path).encode()).hexdigest()[:18]
 bindings.setdefault(entity,{})[path]=key
 for l,v in zip(['fa','en','es'],values):texts[l][key]=v
for name,count in [('HY-MT1.5-1.8B',1.8),('HY-MT1.5-7B',7)]:
 meta=read(src/(name+'-api.json'));config=read(src/(name+'-config.json'));repo='tencent/'+name;sha=meta['sha'];slug=re.sub('[^a-z0-9]+','-',repo.lower());mid='model:'+slug;eid='evidence:tasks0920-'+slug;url='https://huggingface.co/'+repo;card=url+'/blob/'+sha+'/README.md'
 def known(v,unit=None):return dict(state='known',value=v,evidenceIds=[eid],**({'unit':unit} if unit else {}))
 upsert('evidence',dict(id=eid,url=card,title=name+' — translation, languages, config, files and license',organization='Tencent',accessedOn='2026-09-20',versionRevisionOrCommit=sha,locator='Model Introduction; Supported languages; Use with transformers; config.json; License.txt; pinned HF file inventory',kind='publisher-report',sourceKind='primary',scope=repo,limitations=[],presentationNotes=[]))
 langs=['en','es','fa']
 m=upsert('models',dict(id=mid,familyId='family:hy-mt',exactName=name,publisher='Tencent',version=sha,aliases=[repo],stage='instruct',architecture='dense',attentionArchitecture='full-attention',thinkingMode='non-thinking-only',totalParametersB=known(count,'billion-parameters'),activeParametersB={'state':'not-applicable'},kind='generative',inputModalities=['text'],outputModalities=['text'],applications=['text-work'],languages=[dict(language=l,declared=known(True)) for l in langs],persianEvidenceStatus='publisher-claimed',declaredContext={'state':'unknown'},configurationContext=known(config['max_position_embeddings'],'token'),evaluatedContext={'state':'not-measured'},releaseStatus='available',releasedOn='2025-12-30',lastReviewedOn='2026-09-20',taskSpecializations=[dict(task='translation',languages=langs,evidenceIds=[eid])],license=dict(name=known('Tencent HY Community License'),url=known(url+'/blob/'+sha+'/License.txt'),commercialUse=known('restricted'),restrictions=[''],evidenceIds=[eid]),evidenceIds=[eid]))
 trans('models',m,'license/restrictions/0','مجوز شامل اتحادیهٔ اروپا، بریتانیا و کرهٔ جنوبی نمی‌شود؛ برای بیش از ۱۰۰ میلیون کاربر فعال ماهانه، مجوز جدا لازم است.','The license excludes the EU, UK and South Korea; more than 100 million monthly active users require a separate license.','La licencia excluye la UE, Reino Unido y Corea del Sur; más de 100 millones de usuarios activos mensuales requieren otra licencia.')
 files=[dict(path=f['rfilename'],url=url+'/resolve/'+sha+'/'+f['rfilename'],bytes=f['size']) for f in meta['siblings'] if f['rfilename'].endswith('.safetensors')];total=sum(f['bytes'] for f in files)
 upsert('artifacts',dict(id='artifact:'+slug+'-official',modelVersionId=mid,baseRevision=sha,publisher='Tencent',repositoryUrl=url,repositoryRevision=sha,format='safetensors',quantization={'state':'not-applicable'},weightPrecision='bf16',activationPrecision={'state':'unknown'},size=known(total/2**30,'GiB'),authority='official',evidenceIds=[eid]))
 upsert('artifactListings',dict(id='artifact-listing:'+slug+'-official',modelVersionId=mid,baseModelRepository=repo,baseRevision=sha,publisher='Tencent',authority='official',format='safetensors',variant='BF16',precision='bf16',repositoryUrl=url,filesUrl=url+'/tree/'+sha,repositoryRevision=sha,files=files,totalBytes=total,verifiedOn='2026-09-20',evidenceIds=[eid]))
 # The publisher's vLLM example is for the older Hunyuan-7B-MT, not these exact revisions.
 p=upsert('modelProfiles',dict(id='model-profile:'+slug,modelVersionId=mid,introduction='',roleSummary='',distinguishingFeatures=[''],languageSummary='',officialUrl=card,runGuides=[dict(label='Transformers',engine='Transformers',href=card+'#use-with-transformers',conditions=[''],evidenceIds=[eid])],evidenceIds=[eid]))
 trans('modelProfiles',p,'introduction','مدل تخصصی ترجمه با امکان تعیین معادل اصطلاحات و دادن متن زمینه؛ برای گفت‌وگوی عمومی یا پاسخ‌گویی از اسناد انتخاب نشده است.','Dedicated translation model with terminology and contextual prompts; not selected for general chat or document Q&A.','Modelo dedicado a traducción con terminología y contexto; no se elige para chat general ni preguntas sobre documentos.')
 trans('modelProfiles',p,'roleSummary','ترجمهٔ تخصصی متن','Dedicated text translation','Traducción especializada de texto')
 trans('modelProfiles',p,'distinguishingFeatures/0','قالب‌های جدا برای ترجمه، واژه‌نامهٔ اصطلاحات و حفظ قالب متن دارد.','Separate prompts for translation, terminology and formatted text.','Plantillas para traducción, terminología y texto con formato.')
 trans('modelProfiles',p,'languageSummary','فارسی، انگلیسی و اسپانیایی در فهرست زبان‌های ناشر هستند.','Persian, English and Spanish appear in the publisher’s supported language list.','Persa, inglés y español figuran en los idiomas admitidos por el editor.')
 trans('modelProfiles',p,'runGuides/0/conditions/0','مثال ناشر با Transformers 4.56.0 و قالب مخصوص ترجمه است؛ مدل system prompt پیش‌فرض ندارد.','Publisher example uses Transformers 4.56.0 and a translation prompt; there is no default system prompt.','El ejemplo del editor usa Transformers 4.56.0 y una plantilla de traducción; no hay instrucción de sistema predeterminada.')
 u=upsert('modelUseGuidance',dict(id='model-use:'+slug+':translation',modelVersionId=mid,applicationId='text-work',role='text-generation',summary='',description='',distinguishingFeature='',conditions=[],basis='editorial-analysis',evidenceIds=[eid]))
 for field,pfield in [('summary','roleSummary'),('description','introduction'),('distinguishingFeature','distinguishingFeatures/0')]:
  key=bindings['repository.modelProfiles/'+p['id']][pfield];trans('modelUseGuidance',u,field,*[texts[l][key] for l in ['fa','en','es']])
upsert('families',dict(id='family:hy-mt',name='HY-MT',publisher='Tencent',evidenceIds=[x['id'] for x in r['evidence'] if x['id'].startswith('evidence:tasks0920-')]))
# Manual, source-backed specialization metadata. Selection itself does not match names.
roles={
 'model:qwen-qwen2-5-coder-1-5b':['code-completion'], 'model:bigcode-starcoder2-3b':['code-completion'],
 'model:qwen-qwen2-5-coder-7b-instruct':['coding-assistant'], 'model:qwen-qwen2-5-coder-14b-instruct':['coding-assistant'], 'model:qwen-qwen2-5-coder-32b-instruct':['coding-assistant'],
 'model:qwen-qwen3-coder-30b-a3b-instruct':['coding-assistant','coding-agent'], 'model:qwen-qwen3-coder-480b-a35b-instruct':['coding-assistant','coding-agent'],
 'model:mistralai-devstral-small-2-24b-instruct-2512':['coding-assistant','coding-agent'], 'model:qwen-qwen3-coder-next':['coding-assistant','coding-agent']}
for m in r['models']:
 if m['id'] in roles:m['taskSpecializations']=[dict(task=task,evidenceIds=m['evidenceIds']) for task in roles[m['id']]]
# Its official card explicitly documents coding agents; preserve other editorial entries.
next_model=next(m for m in r['models'] if m['id']=='model:qwen-qwen3-coder-next')
if 'agents-tools' not in next_model['applications']:next_model['applications'].append('agents-tools')
write(data/'v0.3.0/repository.json',r);write(data/'locales/record-bindings.json',bindings)
for l,t in texts.items():write(data/('locales/records.'+l+'.json'),t)
manifest=read(data/'v0.3.0/manifest.json');manifest['baseModels']=len(r['models']);manifest['asOf']='2026-09-20';write(data/'v0.3.0/manifest.json',manifest)
print('Imported 2 translation models and source-backed task specializations for 9 code models.')
