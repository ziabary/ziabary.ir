"""Read official author inventories; report coverage gaps for editorial review, never auto-add/reorder models."""
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
import json,urllib.request,urllib.parse
root=Path(__file__).resolve().parents[1];data=root/'data/llm';r=json.loads((data/'v0.3.0/repository.json').read_text())
# Publisher accounts (not community quantizers); aliases identify the family within shared accounts.
authors={'bge':'BAAI','aya-cohere':'CohereLabs','smollm':'HuggingFaceTB','qwen':'Qwen','olmo':'allenai','deepseek':'deepseek-ai','gemma':'google','granite':'ibm-granite','e5':'intfloat','llama':'meta-llama','phi':'microsoft','mistral':'mistralai','nemotron':'nvidia','gpt-oss':'openai','glm':'zai-org','kimi':'moonshotai','minimax':'MiniMaxAI','smolvlm':'HuggingFaceTB','minilm':'microsoft','embeddinggemma':'google','jina':'jinaai','mixedbread':'mixedbread-ai','nomic':'nomic-ai','modernbert':'answerdotai','starcoder2':'bigcode','tooka':'PartAI','parsbert':'HooshvareLab','salamandra':'BSC-LT','minicpm':'openbmb','lfm':'LiquidAI'}
tokens={'aya-cohere':['aya','command'],'minilm':['minilm'],'tooka':['tooka'],'parsbert':['bert-base-pars'],'lfm':['lfm'],'gpt-oss':['gpt-oss'],'starcoder2':['starcoder2'],'glm':['glm'],'mixedbread':['mxbai'],'modernbert':['modernbert']}
def fetch(author):
 url='https://huggingface.co/api/models?author='+urllib.parse.quote(author)+'&limit=1000&sort=lastModified&direction=-1'
 try:
  with urllib.request.urlopen(urllib.request.Request(url,headers={'User-Agent':'ziabary-editorial-coverage-audit'}),timeout=30) as f:rows=json.load(f)
  return author,dict(sourceUrl=url,models=[dict(id=x['id'],revision=x.get('sha'),lastModified=x.get('lastModified'),pipeline=x.get('pipeline_tag')) for x in rows],truncated=len(rows)==1000)
 except Exception as e:return author,dict(sourceUrl=url,error=str(e))
with ThreadPoolExecutor(max_workers=4) as pool:inventories=dict(pool.map(fetch,sorted(set(authors.values()))))
output=[]
for family in r['families']:
 fid=family['id'].split(':')[1];author=authors[fid];inventory=inventories[author];models=[m for m in r['models'] if m['familyId']==family['id']];known={a.lower() for m in models for a in m.get('aliases',[]) if '/' in a}
 terms=tokens.get(fid,[fid]);release=[m for m in inventory.get('models',[]) if any(t in m['id'].split('/')[-1].lower() for t in terms) and not any(t in m['id'].lower() for t in ['gguf','mlx','awq','gptq','fp8','int4','int8','fp4','nvfp4','adapter'])]
 gaps=[m for m in release if m['id'].lower() not in known]
 output.append(dict(familyId=family['id'],publisherAccount=author,sourceUrl=inventory['sourceUrl'],reviewedOn='2026-09-20',catalogModels=len(models),matchedInventoryModels=len(release),candidateGaps=gaps,status='source-unavailable' if 'error'in inventory else 'inventory-truncated' if inventory['truncated'] else 'reviewed-inventory',limitation='Name/publisher inventory matching only; gaps require individual relevance, release, artifact and license review. Not every publisher repository is a recommended model.',**({'error':inventory['error']} if 'error'in inventory else {})))
(data/'sources/wizard-2026-09-20/family-inventories.json').write_text(json.dumps(inventories,indent=2)+'\n')
(data/'family-coverage-2026-09-20.json').write_text(json.dumps(dict(reviewedOn='2026-09-20',scope='Official Hugging Face publisher inventories, 30 catalog families; excludes API-only releases and unlisted accounts. No automatic catalog expansion.',families=output),indent=2)+'\n')
print(json.dumps(dict(families=len(output),sourceFailures=sum('error'in x for x in output),candidateGaps=sum(len(x['candidateGaps']) for x in output))))
