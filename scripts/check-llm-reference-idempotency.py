"""Check the complete local import/generation/editorial pipeline, without committing or deploying."""
from pathlib import Path
import json,hashlib,subprocess,sys
root=Path(__file__).resolve().parents[1]
def snapshot():
 paths=[root/'data/llm/v0.3.0/repository.json',root/'data/llm/v0.3.0/manifest.json',root/'data/llm/v0.3.0/research/reference-import-mapping.json']
 paths+=list((root/'data/llm/locales').glob('*.json'))+list((root/'src/lib/llm/data').glob('*.ts'))+list((root/'src/lib/content/articles').glob('*.md'))
 return {str(p.relative_to(root)):hashlib.sha256(p.read_bytes()).hexdigest() for p in paths}
before=snapshot()
for script in ['import-llm-reference-pack.py','generate-llm-dataset.py','integrate-llm-reference-articles.py']:
 subprocess.run([sys.executable,str(root/'scripts'/script)],cwd=root,check=True)
after=snapshot();changed=[p for p in sorted(set(before)|set(after)) if before.get(p)!=after.get(p)]
report={'filesCompared':len(before),'changedFiles':changed,'passed':not changed}
(root/'data/llm/v0.3.0/research/reference-idempotency.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps(report));sys.exit(bool(changed))
