"""Regenerate typed data modules after editing canonical JSON. Python 3; no third-party packages."""
from pathlib import Path
import json
project=Path(__file__).resolve().parents[1]
bundle=project/'data/llm/v0.3.0'
manifest=json.loads((bundle/'manifest.json').read_text())
updated=manifest['asOf']
source=json.loads((bundle/manifest['repository']).read_text())
data={key:items for key,items in source.items() if isinstance(items,list)}
out=project/'src/lib/llm/data';out.mkdir(parents=True,exist_ok=True)
imports=[]
for key,items in data.items():
 s="// Generated from data/llm/v0.3.0/repository.json by scripts/generate-llm-dataset.py.\nimport type { LlmGuideRepository } from '../schema';\n\n"
 s+=f"export const {key}: LlmGuideRepository['{key}'] = [];\n"
 s+=''.join(key+'.push('+json.dumps(item,ensure_ascii=False,indent=2)+');\n' for item in items)
 (out/(key+'.v1.ts')).write_text(s)
 imports.append(f"import {{ {key} }} from './{key}.v1';")
s=f"// Dataset 0.3.0; catalog reviewed {updated}.\nimport type {{ LlmGuideRepository }} from '../schema';\n"+'\n'.join(imports)+"\n\nexport const llmDataset: LlmGuideRepository = {\n  "+', '.join(data)+"\n};\n"
s+=f'\nexport const llmDatasetUpdatedOn = {json.dumps(updated)};\n'
(out/'repository.v1.ts').write_text(s)
print('Generated',len(data)+1,'typed modules; run npm run verify:llm next.')
