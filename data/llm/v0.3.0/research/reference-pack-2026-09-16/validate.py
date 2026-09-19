#!/usr/bin/env python3
"""Validate the handoff's structure, provenance links and selected factual invariants.

Standard library only. No network, model execution, site mutation or dependencies.
This validates the handoff, not the website build or the truth of every source.
"""
from pathlib import Path
import hashlib, json, math, sys

ROOT=Path(__file__).resolve().parent
errors=[]; checks=0
def require(condition,message):
    global checks
    checks+=1
    if not condition: errors.append(message)
def read(name):return json.loads((ROOT/'data'/name).read_text())
sources=read('source-register.json');sourceids={x['id'] for x in sources}
newmodels=read('model-additions.json');baseline=read('baseline-model-index.json')
modelids={x['id'] for x in newmodels+baseline}
ev=read('published-evaluations.json');emap={x['id']:x for x in ev}
groups=read('comparison-groups.json');gmap={x['id']:x for x in groups}
guides=read('selection-guidance.json');blocks=read('article-inserts.json')
software=read('software-additions.json');study=read('quantization-study.json')

for name,rows in [('sources',sources),('models',newmodels+baseline),('evaluations',ev),('groups',groups),('guidance',guides),('sections',blocks),('software',software),('study',study)]:
    require(len({x['id'] for x in rows})==len(rows),'Duplicate ID in '+name)
for s in sources:
    require(s['url'].startswith('https://'),'Non-HTTPS source '+s['id'])
    require(len(s['contentSha256'])==64,'Missing capture hash '+s['id'])
    require(s['accessedOn']=='2026-09-16','Wrong snapshot date '+s['id'])
for e in ev:
    require(e['modelRef'] in modelids,'Unknown model '+e['id'])
    require(e['sourceId'] in sourceids,'Unknown source '+e['id'])
    require(bool(e['sourceLocator']),'Missing table locator '+e['id'])
    require(isinstance(e['value'],(int,float)) and math.isfinite(e['value']),'Invalid score '+e['id'])
    require(e['language'] in [None,'fa','en','es','multilingual'],'Invalid language '+e['id'])
    require(e['evaluatedWeightRevision'] is None,'Unverified evaluated revision '+e['id'])
    require(e['reportingRelationship'] in ['publisher','third-party'],'Unsupported reporting relationship '+e['id'])
    if e['unit'] in ['percent','score-points-0-100']:
        require(0<=e['value']<=100,'Out-of-range score '+e['id'])
    require(e['comparisonGroup'] is None or e['comparisonGroup'] in gmap,'Unresolved comparison '+e['id'])
    if e['comparisonGroup']:
        require(e['id'] in gmap[e['comparisonGroup']]['evaluationIds'],'Missing group membership '+e['id'])
for g in groups:
    for eid in g['evaluationIds']:
        require(eid in emap and emap[eid]['comparisonGroup']==g['id'],'Asymmetric comparison group '+g['id'])
    require(all(s in sourceids for s in g['sourceIds']),'Missing group sources '+g['id'])
    for k in ['universalRanking','statisticalSignificanceClaim','qualityRatioClaim','causalClaim']:
        require(g['allowed'][k] is False,'Unsupported claim enabled '+g['id']+' '+k)
    require(g['numericComparisonPartitionKeys']==['benchmark','benchmarkVersion','metric','unit','language'],'Missing metric/language partition '+g['id'])
for obj in newmodels:
    for f in obj['facts']:require(f['sourceId'] in sourceids,'Unknown fact source '+obj['id'])
    require(obj['siteMeasuredTokensPerSecond'] is None and obj['siteMeasuredMemoryBytes'] is None,'Invented local measurements '+obj['id'])
for obj in guides:
    require(all(x in modelids for x in obj['candidateModelRefs']),'Unknown shortlist model '+obj['id'])
    require(all(x in gmap for x in obj['comparisonGroupIds']),'Unknown shortlist comparison '+obj['id'])
for obj in blocks:
    require(all(x in gmap for x in obj['comparisonGroupIds']),'Unknown section comparison '+obj['id'])
    require(obj['operation']=='semantic-upsert-section','Unsafe section mutation '+obj['id'])

# Localized prose is a complete triad wherever a localized field exists.
def walk(o):
    if isinstance(o,dict):
        if set(o)&{'fa','en','es'} and set(o)<={'fa','en','es'}:
            require(set(o)=={'fa','en','es'},'Incomplete locale triad')
            require(all(isinstance(v,str) and len(v)>2 for v in o.values()),'Empty localized prose')
        for v in o.values():walk(v)
    elif isinstance(o,list):
        for v in o:walk(v)
for objs in [groups,guides,blocks,newmodels,software,read('editorial-methodology.json')]:walk(objs)

# Regression fixtures for high-risk transcription and interpretation errors.
def score(model,bench,group=None,metric=None,language=None):
    rows=[e for e in ev if e['modelRef']==model and e['benchmark']==bench
          and (group is None or e['comparisonGroup']==group)
          and (metric is None or e['metric']==metric)
          and (language is None or e['language']==language)]
    require(len(rows)==1,'Ambiguous/missing fixture '+model+' '+bench)
    return rows[0]['value'] if len(rows)==1 else float('nan')
require(score('model:intfloat-multilingual-e5-large-instruct','MIRACL',metric='nDCG@10',language='es')==53.7,'Spanish MIRACL transcription')
require(score('model:intfloat-multilingual-e5-large-instruct','MIRACL',metric='Recall@100',language='fa')==92.9,'Persian recall transcription')
require(score('model:partai-tooka-sbert-v2-small','PTEB Retrieval aggregate')==61.24,'Tooka retrieval column')
require(score('model:partai-tooka-sbert-v2-large','PTEB Cross-Tasks aggregate')==72.05,'Tooka aggregate column')
require(round(score('model:qwen-qwen3-reranker-0-6b','MTEB-R')-score('model:qwen-qwen3-embedding-0-6b','MTEB-R'),2)==3.98,'Reranker delta')
require(score('model:bsc-lt-salamandra-7b-instruct','xnli_es')==46.95,'Salamandra task alignment')
require(score('model:openbmb-minicpm5-2b','LiveCodeBench v6')==69.1,'MiniCPM table alignment')
require(score('model:qwen-qwen3-5-4b','MATH-500')==99.0,'MiniCPM comparison column alignment')
require(len(ev)==132 and len(groups)==8 and len(newmodels)==5 and len(study)==12,'Unexpected extraction count')
for e in ev:
    if e['comparisonGroup']=='comparison:qwen-reranking-top100':
        require(e['settings']['candidateCount']==100,'Lost reranking candidate count')
    if e['comparisonGroup']=='comparison:minicpm-small-model-tasks':
        require('†' not in e['reportedValueText'],'Relayed AA score included as own evaluation')
    if e['comparisonGroup']=='comparison:pteb-task-vs-overall':
        require(e['metric']=='publisher aggregate score','Invented PTEB metric')
    if e['comparisonGroup']=='comparison:qwen-embedding-task-scope' and not e['modelRef'].startswith('model:qwen-'):
        require('relayed' in e['settings']['scoreOrigin'],'Relayed leaderboard baseline mislabeled')
lfm=next(x for x in newmodels if x['repository']=='LiquidAI/LFM2.5-1.2B-Instruct')
require(lfm['conflicts'][0]['publisherCard']==32768 and lfm['conflicts'][0]['configMaxPositionEmbeddings']==128000,'LFM source conflict erased')
require(lfm['commercialUse']['state']=='conditional','Custom license flattened')
granite=next(x for x in newmodels if x['repository']=='ibm-granite/granite-4.2-3b')
require(granite['facts'][0]['value']==3659737600,'Nominal 3B mistaken for exact parameter count')
require(20*1+5*4==40 and 720*0.5==360 and 40/0.5==80,'Cost illustration arithmetic')
for locale in ['en','es']:
    for name in ['language-evidence','cost-choice']:
        p=ROOT/'content'/f'{name}.{locale}.md'
        require(p.exists() and len(p.read_text().split())>400,'Missing or truncated article '+str(p))

manifestpath=ROOT/'manifest.json'
if manifestpath.exists():
    manifest=json.loads(manifestpath.read_text())
    for item in manifest['files']:
        p=ROOT/item['path']
        require(p.is_file(),'Missing manifest file '+item['path'])
        if p.is_file():require(hashlib.sha256(p.read_bytes()).hexdigest()==item['sha256'],'Checksum mismatch '+item['path'])
else:
    errors.append('manifest.json missing')
result={'status':'pass' if not errors else 'fail','checks':checks,'errors':errors,
        'scope':'Internal structure, references, selected source-transcription invariants, arithmetic and file integrity. Not a site build or a model benchmark.',
        'counts':{'publishedEvaluations':len(ev),'comparisonGroups':len(groups),'modelAdditions':len(newmodels),'softwareAdditions':len(software),'selectionGuides':len(guides),'articleSections':len(blocks),'standaloneArticles':4,'quantizationObservations':len(study),'sourceDocuments':len(sources)}}
print(json.dumps(result,ensure_ascii=False,indent=2))
sys.exit(bool(errors))
