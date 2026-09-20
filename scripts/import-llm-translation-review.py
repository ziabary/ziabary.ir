"""Import reviewed translation revisions and exact execution packages from saved publisher sources."""
from pathlib import Path
import json,re,hashlib
root=Path(__file__).resolve().parents[1];data=root/'data/llm';src=data/'sources/translation-review-2026-09-20'
def read(p):return json.loads(p.read_text())
def write(p,x):p.write_text(json.dumps(x,ensure_ascii=False,indent=2)+'\n')
r=read(data/'v0.3.0/repository.json');bindings=read(data/'locales/record-bindings.json');texts={l:read(data/('locales/records.'+l+'.json')) for l in ['fa','en','es']}
def upsert(k,x):
 old=next((i for i,v in enumerate(r[k]) if v['id']==x['id']),None)
 if old is None:r[k].append(x)
 else:r[k][old]=x
 return x
def trans(k,x,path,*values):
 obj=x;parts=path.split('/')
 for p in parts[:-1]:obj=obj[int(p)] if isinstance(obj,list) else obj[p]
 if isinstance(obj,list):obj[int(parts[-1])]=values[0]
 else:obj[parts[-1]]=values[0]
 entity='repository.'+k+'/'+x['id'];key=bindings.get(entity,{}).get(path) or 'translation0920.'+hashlib.sha256((entity+'/'+path).encode()).hexdigest()[:18]
 bindings.setdefault(entity,{})[path]=key
 for l,v in zip(['fa','en','es'],values):texts[l][key]=v

def sid(repo):return re.sub('[^a-z0-9]+','-',repo.lower())
def source(repo):
 a=read(src/(repo.replace('/','--')+'--api.json'));url='https://huggingface.co/'+repo;eid='evidence:translation0920-'+sid(repo)
 upsert('evidence',dict(id=eid,url=url+'/blob/'+a['sha']+'/README.md',title=repo+' — model card and file inventory',organization=repo.split('/')[0],accessedOn='2026-09-20',versionRevisionOrCommit=a['sha'],locator='Model card; language support; runtime examples; file sizes from pinned API inventory',kind='publisher-report',sourceKind='primary',scope=repo,limitations=[],presentationNotes=[]))
 return a,url,eid

def package(repo,model,precision,engines,gguf=False):
 a,url,eid=source(repo);files=[f for f in a['siblings'] if f['rfilename'].endswith('.gguf' if gguf else '.safetensors')]
 if not files and not gguf:files=[f for f in a['siblings'] if re.match(r'(pytorch_model|model).*\.bin$',f['rfilename'])]
 groups=[[f] for f in files] if gguf else [files]
 for group in groups:
  if not group:continue
  variant=re.search(r'Q\d[^.]*',group[0]['rfilename'],re.I).group() if gguf and re.search(r'Q\d[^.]*',group[0]['rfilename'],re.I) else precision
  fs=[dict(path=f['rfilename'],url=url+'/resolve/'+a['sha']+'/'+f['rfilename'],bytes=f['size']) for f in group]
  upsert('artifactListings',dict(id='artifact-listing:translation0920-'+sid(repo)+'-'+sid(variant),modelVersionId=model['id'],baseModelRepository=model['aliases'][0],baseRevision=model['version'],publisher=a.get('author',repo.split('/')[0]),authority='official',format='gguf' if gguf else 'safetensors' if group[0]['rfilename'].endswith('.safetensors') else 'pytorch',variant=variant,precision=variant.lower() if gguf else precision.lower(),repositoryUrl=url,filesUrl=url+'/tree/'+a['sha'],repositoryRevision=a['sha'],files=fs,totalBytes=sum(f['bytes'] for f in fs),verifiedOn='2026-09-20',evidenceIds=[eid],runtimeEngines=engines))
 return url+'/blob/'+a['sha']+'/README.md',eid

paper=(src/'translategemma-language-tables.txt').read_text();codes=lambda text:re.findall(r'\(([a-z]{2,3}(?:-[A-Za-z]+)?)\)',text)
pairs=[]
for code in codes(paper.split('Table 5 |')[1].split('Table 6 |')[0]):pairs.extend([['en',code],[code,'en']])
for code in codes(paper.split('Table 6 |')[1]):pairs.append(['en',code])
# The publisher's training appendix records direction. Do not generalize all pairs.
translation_languages=sorted(set(x for p in pairs for x in p))
pe='evidence:translation0920-translategemma-paper'
upsert('evidence',dict(id=pe,url='https://arxiv.org/pdf/2601.09012',title='TranslateGemma technical report — training language directions',organization='Google',accessedOn='2026-09-20',locator='Appendix Tables 5–6: bidirectional English pairs versus directions from English',kind='publisher-report',sourceKind='primary',scope='TranslateGemma training language pairs',limitations=[],presentationNotes=[]))
models=[('tencent/Hy-MT2-1.8B',1.8),('tencent/Hy-MT2-7B',7),('tencent/Hy-MT2-30B-A3B',30),('google/translategemma-4b-it',4),('google/translategemma-12b-it',12),('google/translategemma-27b-it',27),('google/madlad400-3b-mt',3),('facebook/nllb-200-distilled-600M',.6)]
for repo,count in models:
 a,url,eid=source(repo);name=repo.split('/')[1];hy=repo.startswith('tencent/');gem='translategemma' in repo;nllb='nllb' in repo;mad='madlad' in repo
 known=lambda value,unit=None:dict(state='known',value=value,evidenceIds=[eid],**({'unit':unit} if unit else {}))
 langs=translation_languages if gem else [x for x in a.get('cardData',{}).get('language',[]) if x not in ['multilingual']]
 family='family:hy-mt' if hy else 'family:gemma' if gem else 'family:nllb' if nllb else 'family:madlad';publisher='Tencent' if hy else 'Meta' if nllb else 'Google'
 if not any(f['id']==family for f in r['families']):upsert('families',dict(id=family,name='NLLB' if nllb else 'MADLAD',publisher=publisher,evidenceIds=[eid]))
 spec=dict(task='translation',languages=langs,evidenceIds=[eid,pe] if gem else [eid])
 if gem:spec['languagePairs']=pairs
 m=upsert('models',dict(id='model:'+sid(repo),familyId=family,exactName=name,publisher=publisher,version=a['sha'],aliases=[repo],stage='instruct',architecture='moe' if count==30 else 'dense',attentionArchitecture='other' if mad or nllb else 'full-attention',totalParametersB=known(count,'billion-parameters'),activeParametersB=known(3,'billion-parameters') if count==30 else {'state':'not-applicable'},kind='vision-language' if gem else 'generative',inputModalities=['text','image'] if gem else ['text'],outputModalities=['text'],applications=['text-work'],languages=[dict(language=l,declared=known(True)) for l in langs],persianEvidenceStatus='publisher-claimed' if 'fa' in langs else 'not-evaluated',declaredContext={'state':'unknown'},evaluatedContext={'state':'not-measured'},releaseStatus='available',lastReviewedOn='2026-09-20',taskSpecializations=[spec],license=dict(name=known('Gemma terms' if gem else 'CC-BY-NC-4.0' if nllb else 'Apache-2.0'),url=known(url+'/blob/'+a['sha']+'/README.md'),commercialUse=known('prohibited' if nllb else 'restricted' if gem else 'allowed'),restrictions=[],evidenceIds=[eid]),evidenceIds=[eid,pe] if gem else [eid]))
 if nllb:m['researchOnly']=True
 if gem:m['inputTokenLimit']=known(2048,'token')
 cfg=src/(repo.replace('/','--')+'--config.json')
 if cfg.exists() and read(cfg).get('max_position_embeddings'):m['configurationContext']=known(read(cfg)['max_position_embeddings'],'token')
 intro= ['نسل دوم مترجم Hy-MT با دستورهای ترجمه و حفظ اصطلاحات.', 'Second-generation Hy-MT translator with translation instructions and terminology control.', 'Traductor Hy-MT de segunda generación con instrucciones y control terminológico.'] if hy else ['مترجم متن و نوشته‌های تصویر با ورودی حداکثر ۲هزار توکن؛ قالب ویژهٔ ترجمه دارد.', 'Text and image-text translator with a documented 2K input limit and a translation-specific template.', 'Traductor de texto e imágenes con límite de entrada de 2K y plantilla específica.'] if gem else ['مدل مرجع پژوهشی ترجمه؛ مجوز غیرتجاری و ورودی آموزشی تا ۵۱۲ توکن دارد.', 'Research translation baseline, noncommercial license and training inputs up to 512 tokens.', 'Referencia de traducción para investigación, licencia no comercial y entradas de entrenamiento hasta 512 tokens.'] if nllb else ['مترجم مبتنی بر T5 با دامنهٔ زبانی گسترده؛ پیشوند زبان مقصد بخشی از ورودی است.', 'T5 translator with broad language coverage; the target-language prefix is part of its input.', 'Traductor T5 con amplia cobertura; el prefijo de idioma destino forma parte de la entrada.']
 condition= ['نصب Transformers ≥ 5.6.0 و قالب ترجمهٔ همین نسخه؛ عدد پیکربندی زمینه، نتیجهٔ آزمون طول متن نیست.', 'Transformers ≥ 5.6.0 with this revision’s translation template; configured context is not a tested input limit.', 'Transformers ≥ 5.6.0 con la plantilla de esta versión; contexto configurado no es límite probado.'] if hy else ['قالب شامل source_lang_code و target_lang_code است؛ دریافت وزن‌ها نیازمند پذیرش شرایط Google است. از ظرفیت Gemma عمومی استفاده نکنید.', 'Use source_lang_code and target_lang_code in the template; weights require acceptance of Google terms. Do not inherit general Gemma context.', 'Use source_lang_code y target_lang_code; los pesos requieren aceptar términos de Google. No herede contexto de Gemma general.'] if gem else ['AutoModelForSeq2SeqLM؛ زبان مبدأ و forced_bos_token_id مقصد را تعیین کنید. برای استقرار تجاری پیشنهاد نمی‌شود.', 'AutoModelForSeq2SeqLM with source language and target forced_bos_token_id; not proposed for commercial deployment.', 'AutoModelForSeq2SeqLM con origen y forced_bos_token_id de destino; no se propone para despliegue comercial.'] if nllb else ['T5ForConditionalGeneration و T5Tokenizer؛ ورودی با <2xx> زبان مقصد شروع می‌شود.', 'T5ForConditionalGeneration and T5Tokenizer; prefix input with target <2xx>.', 'T5ForConditionalGeneration y T5Tokenizer; prefije con <2xx> del destino.']
 p=upsert('modelProfiles',dict(id='model-profile:'+sid(repo),modelVersionId=m['id'],introduction='',roleSummary='',distinguishingFeatures=[],officialUrl=url+'/blob/'+a['sha']+'/README.md',runGuides=[dict(label='Transformers',engine='Transformers',href=url+'/blob/'+a['sha']+'/README.md',conditions=[''],evidenceIds=[eid])],evidenceIds=m['evidenceIds']))
 trans('modelProfiles',p,'introduction',*intro);trans('modelProfiles',p,'roleSummary','ترجمهٔ تخصصی','Specialized translation','Traducción especializada');trans('modelProfiles',p,'runGuides/0/conditions/0',*condition)
 if hy:
  p['runGuides'].append(dict(label='vLLM',engine='vLLM',href=p['officialUrl']+'#vllm',conditions=[''],evidenceIds=[eid]));trans('modelProfiles',p,'runGuides/1/conditions/0','نصب از سورس طبق راهنمای ناشر؛ پیش از استقرار، شناسهٔ commit و نسخهٔ وابستگی‌ها را ثبت کنید.','Install from source as documented; record the tested commit and dependency versions.','Instale desde código según la guía; registre commit y dependencias probadas.')
 use=upsert('modelUseGuidance',dict(id='model-use:'+sid(repo)+':translation',modelVersionId=m['id'],applicationId='text-work',role='text-generation',summary='',description='',distinguishingFeature='',conditions=[],basis='editorial-analysis',evidenceIds=m['evidenceIds']))
 trans('modelUseGuidance',use,'summary','ترجمهٔ تخصصی','Specialized translation','Traducción especializada');trans('modelUseGuidance',use,'description',*intro);trans('modelUseGuidance',use,'distinguishingFeature',*condition)
 package(repo,m,'FP32' if mad or nllb else 'BF16',['Transformers','vLLM'] if hy else ['Transformers'])
 if mad:
  href,e=package(repo,m,'Q4_K_M',['Candle'],True);p['runGuides'].append(dict(label='Candle',engine='Candle',href=href+'#running-the-model-with-candle',conditions=[],evidenceIds=[e]))
for base in ['tencent/HY-MT1.5-1.8B','tencent/HY-MT1.5-7B','tencent/Hy-MT2-1.8B','tencent/Hy-MT2-7B','tencent/Hy-MT2-30B-A3B']:
 m=next(x for x in r['models'] if x['aliases'][0]==base);p=next(x for x in r['modelProfiles'] if x['modelVersionId']==m['id'])
 for suffix,precision,engines in [('-GGUF','Q4_K_M',['llama.cpp']),('-FP8','FP8',['vLLM','Transformers'] if 'Hy-MT2' in base else ['Transformers']),('-GPTQ-Int4','GPTQ-Int4',['Transformers'])]:
  repo=base+suffix
  if not (src/(repo.replace('/','--')+'--api.json')).exists():continue
  href,eid=package(repo,m,precision,engines,suffix=='-GGUF')
  for engine in engines:
   if any(g['engine']==engine for g in p['runGuides']):continue
   p['runGuides'].append(dict(label=engine,engine=engine,href=href,conditions=[''],evidenceIds=[eid]));idx=len(p['runGuides'])-1
   trans('modelProfiles',p,f'runGuides/{idx}/conditions/0','بستهٔ رسمی همین نسخه؛ برای GGUF نسخهٔ سازگار llama.cpp و در بسته‌های STQ پشتیبانی kernel لازم است.','Official package for this revision; GGUF needs a compatible llama.cpp build and STQ packages require kernel support.','Paquete oficial de esta versión; GGUF requiere llama.cpp compatible y STQ, soporte de kernel.')
for profile in r['modelProfiles']:
 if profile['modelVersionId'].startswith('model:tencent-hy-mt1-5'):
  trans('modelProfiles',profile,'languageSummary','پشتیبانی اعلامی از ۳۸ زبان و گونهٔ زبانی، از فارسی و عربی تا چینی.','Publisher-declared support for 38 languages and varieties, including Persian, Arabic and Chinese.','Soporte declarado para 38 idiomas y variantes, incluidos persa, árabe y chino.')
for k,v in [('repository.json',r)]:write(data/'v0.3.0'/k,v)
write(data/'locales/record-bindings.json',bindings)
for l,t in texts.items():write(data/('locales/records.'+l+'.json'),t)
manifest=read(data/'v0.3.0/manifest.json');manifest['baseModels']=len(r['models']);write(data/'v0.3.0/manifest.json',manifest)
print('Imported translation review:',len(r['models']),'models,',len(r['artifactListings']),'packages')
