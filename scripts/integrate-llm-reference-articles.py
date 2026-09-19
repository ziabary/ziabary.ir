"""Reviewed semantic placements. Re-runs replace only marked reference sections.
Canonical articleSections supply prose, selectionGuidance supplies the shared UI recommendations.
Existing article frontmatter, dates, body, related lists and ordering are retained.
"""
from pathlib import Path
import json,re
ROOT=Path(__file__).resolve().parents[1];R=json.loads((ROOT/'data/llm/v0.3.0/repository.json').read_text());base=ROOT/'src/lib/content/articles'
placements={
 'task-order':['در RAG، اندازه مدل پاسخ‌گو فقط یکی از تصمیم‌هاست','In RAG, diagnose retrieval before replacing the generator','En RAG, diagnostiquemos la recuperación antes de cambiar el generador'],
 'retrieval-language':['reranker چه چیزی را بهتر می‌کند و چه چیزی را نمی‌تواند جبران کند؟','Reranking improves a candidate set, not a missing document','El reranker mejora candidatos; no recupera lo que falta'],
 'reranker-measured-context':['چند گزینهٔ مشخص برای شروع','Concrete candidates for a small initial comparison','Candidatos concretos para una comparación inicial pequeña'],
 'quant-not-conversion':['برای چهاربیتی‌کردن باید مدل را دوباره آموزش داد؟','PTQ, QAT and QLoRA solve different problems','PTQ, QAT y QLoRA resuelven problemas distintos'],
 'coding-evidence':['تکمیل کد: پیشنهاد باید پیش از ادامهٔ کار برسد','Completion has to arrive before the developer moves on','La sugerencia debe llegar antes de que la persona continúe'],
 'mac-path':['GGUF، Safetensors و «مدل چهاربیتی» را هم‌معنی نگیریم','File format is not precision or execution support','Formato de archivo, precisión y compatibilidad son decisiones distintas'],
 'context-not-fit':['تفاوت اصلی ۲۴ و ۴۸ گیگابایت بعد از بارگذاری مدل دیده می‌شود','The important difference appears after loading the weights','La diferencia decisiva aparece después de cargar los pesos'],
 'persian-evidence-scope':['از درخواست‌های واقعی، یک مجموعهٔ کوچک اما معنادار بسازیم','','']}
guides={'task-order':['guidance:small-model'],'retrieval-language':['guidance:rag-fa','guidance:rag-en','guidance:rag-es'],'reranker-measured-context':['guidance:reranker'],'coding-evidence':['guidance:coding'],'persian-evidence-scope':['guidance:classification']}
def reviewed(text):
 start,metadata,body=text.split('---',2)
 metadata=re.sub(r'^updated:.*$', 'updated: "2026-09-19"',metadata,flags=re.M)
 metadata=re.sub(r'^faUpdated:.*$', 'faUpdated: "۲۸ شهریور ۱۴۰۵"',metadata,flags=re.M)
 return start+'---'+metadata+'---'+body
def replace_block(text,key,body,before):
 pattern=r'<!-- reference:'+re.escape(key)+r':start -->[\s\S]*?<!-- reference:'+re.escape(key)+r':end -->\n*'
 text=re.sub(pattern,'',text)
 assert before in text,('Missing reviewed placement',key,before)
 block=f'<!-- reference:{key}:start -->\n\n{body}\n\n<!-- reference:{key}:end -->\n\n'
 return text.replace(before,block+before,1)
for row in R['articleSections']:
 key=row['id'].split(':')[1]
 for lang in row['locales']:
  slug=row['articleKey']+('' if lang=='fa' else '-'+lang);path=base/(slug+'.md');text=path.read_text()
  body='### '+row['title'][lang]+'\n\n'+row['bodyMarkdown'][lang]
  if key in guides:
   ids=json.dumps(guides[key]);body+='\n\n<LlmReferenceGuidance locale="'+lang+'" ids={'+ids+'} />'
   if "import LlmReferenceGuidance " not in text:
    end=text.index('\n---',4)+4
    text=text[:end]+"\n\n<script>\n  import LlmReferenceGuidance from '$lib/components/LlmReferenceGuidance.svelte';\n</script>"+text[end:]
  if key=='quant-not-conversion':
   labels={'fa':['گونهٔ آموزش‌دیدهٔ ParetoQ','HellaSwag؛ بیشتر بهتر','Wiki perplexity؛ کمتر بهتر'],'en':['Trained ParetoQ variant','HellaSwag (higher is better)','Wiki perplexity (lower is better)'],'es':['Variante entrenada de ParetoQ','HellaSwag (mayor es mejor)','Perplejidad Wiki (menor es mejor)']}[lang]
   body+='\n\n| '+' | '.join(labels)+' |\n|---|---:|---:|\n'
   for model in dict.fromkeys(q['reportedModelName'] for q in R['quantizationStudies']):
    items={q['metric']:q for q in R['quantizationStudies'] if q['reportedModelName']==model}
    body+='| '+model+' | '+str(items['HellaSwag score']['value'])+' | '+str(items['Wiki perplexity']['value'])+' |\n'
  path.write_text(reviewed(replace_block(text,key,body,'## '+placements[key][['fa','en','es'].index(lang)])))
print('Integrated 22 localized sections into 19 existing articles.')
for row in json.loads((ROOT/'data/llm/v0.3.0/research/reference-complete-article-merges.json').read_text()):
 path=base/(row['slug']+'.md');path.write_text(reviewed(replace_block(path.read_text(),row['key'],row['body'],row['before'])))
print('Merged unique evidence into the four complete localized articles; preserved stronger existing worked examples.')
