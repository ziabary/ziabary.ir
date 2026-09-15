"""Validate the research supplement offline with Python 3 (stdlib only).

Checks integrity and independently recomputes derived memory values.
It does not claim to reproduce the external model benchmarks.
"""
import hashlib
import json
import math
from pathlib import Path

ROOT = Path(__file__).resolve().parent
DATA = {p.stem: json.loads(p.read_text()) for p in (ROOT / 'data').glob('*.json')}
manifest = json.loads((ROOT / 'manifest.json').read_text())
checks = 0

def check(ok, message):
    global checks
    if not ok:
        raise AssertionError(message)
    checks += 1

def close(a, b, message):
    check(math.isclose(a, b, rel_tol=1e-10, abs_tol=1e-8), message)

ids = {}
for name, data in DATA.items():
    if not isinstance(data, list):
        continue
    local = [r['id'] for r in data if 'id' in r]
    check(len(local) == len(set(local)), f'duplicate ID in {name}')
    ids[name] = {r['id']: r for r in data if 'id' in r}
    if name in manifest['counts']:
        check(len(data) == manifest['counts'][name], f'count mismatch in {name}')

sources = ids['sources']
check(len(sources) == manifest['sourceCount'], 'source count')
def visit(value):
    if isinstance(value, dict):
        for key in value.get('sourceIds', []):
            check(key in sources, 'unresolved source: ' + key)
        for child in value.values():
            visit(child)
    elif isinstance(value, list):
        for child in value:
            visit(child)
    elif isinstance(value, float):
        check(math.isfinite(value), 'non-finite number')
visit(DATA)
for source in sources.values():
    check(source['url'].startswith('https://'), 'non-HTTPS source')
    if 'headerSha256' in source:
        check('documentSha256' not in source, 'parsed header hash mislabeled as raw document')

for a in DATA['artifacts']:
    check(a['weightFileBytes'] == sum(f['bytes'] for f in a['files']), 'artifact byte total')
    check(len(a['repositoryRevision']) == 40, 'artifact revision shape')
    for f in a['files']:
        check(f['bytes'] > 0 and len(f['sha256']) == 64, 'artifact file metadata')
    check(a['modelRepository'] not in {x['asPublished'] for x in DATA['model-aliases']}, 'unnormalized alias')

for m in DATA['memory-scenarios']:
    a = ids['artifacts'][m['artifactId']]
    w = ids['workloads'][m['workloadId']]
    check(w['contextTokens'] <= a['artifactContextLimitTokens'], 'artifact context exceeded')
    kv_bytes = (2 * a['layers'] * a['kvHeads'] * a['headDim']
                * w['contextTokens'] * w['activeSequences'] * 2)
    close(m['weightGiB'], a['weightFileBytes'] / 2**30, 'weight GiB')
    close(m['kvGiB'], kv_bytes / 2**30, 'KV GiB')
    close(m['singleGpuBudgetGiB'], (a['weightFileBytes'] + kv_bytes) / 2**30 + 2, 'GPU budget')
    close(m['cpuRamBudgetGiB'], m['singleGpuBudgetGiB'] + 2, 'CPU budget')

for cell in DATA['hardware-fit-matrix']:
    m = ids['memory-scenarios'][cell['memoryScenarioId']]
    h = ids['hardware'][cell['hardwareId']]
    required = m['weightGiB'] + m['kvGiB'] + 2 * h['gpuCount']
    close(cell['plannedGiB'], required, 'multi-GPU reserve')
    close(cell['remainingGiB'], h['nominalVramGBPerGpu'] * h['gpuCount'] - required, 'GPU margin')
    check(not (h['gpuCount'] > 1 and cell['status'] == 'within-planning-budget'), 'aggregate fit stated as per-device fit')

for cell in DATA['cpu-fit-matrix']:
    m = ids['memory-scenarios'][cell['memoryScenarioId']]
    h = ids['cpu-profiles'][cell['cpuProfileId']]
    close(cell['plannedRamGiB'], m['cpuRamBudgetGiB'], 'CPU matrix budget')
    close(cell['remainingGiB'], h['installedRamGiB'] - m['cpuRamBudgetGiB'], 'CPU margin')

for b in DATA['published-performance']:
    if b['id'].startswith('performance:gpustack'):
        m = b['metrics']
        check(abs(m['totalOutputTokens'] / m['durationSeconds'] / m['outputTokensPerSecond'] - 1) < .002, 'benchmark duration/throughput')
    if b['id'].startswith('performance:synthetic'):
        check(b['weightInitialization'].startswith('random'), 'synthetic result scope lost')

for s in DATA['specialized-models']:
    if s['task'] == 'embedding':
        close(s['denseFloat32VectorGiBPerMillionDocuments'], 1e6 * s['defaultEmbeddingDimensions'] * 4 / 2**30, 'vector memory')

for c in DATA['compatibility']:
    for field, collection in [('artifactId', 'artifacts'), ('performanceId', 'published-performance')]:
        if field in c:
            check(c[field] in ids[collection], 'compatibility reference')

for link in DATA['internal-links']:
    check(link['showAsLiveLink'] == (link['liveVerification'].get('httpStatus') == 200), 'dead link shown as live')

if (ROOT / 'checksums.json').exists():
    for name, digest in json.loads((ROOT / 'checksums.json').read_text()).items():
        check(hashlib.sha256((ROOT / name).read_bytes()).hexdigest() == digest, 'file checksum: ' + name)

print(json.dumps({'status': 'passed', 'checks': checks,
                  'scope': 'references, units, arithmetic, scope guards and file integrity; external benchmarks are attributed, not rerun'}, indent=2))
