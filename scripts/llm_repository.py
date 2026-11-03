"""Canonical LLM records are small JSON collections; repository.json is a cache."""
from pathlib import Path
import json


def is_current_repository(path):
    path = Path(path)
    return path.name == 'repository.json' and path.parent.name == 'v0.3.0'


def load_repository(path):
    path = Path(path)
    directory = path.parent / 'records'
    if not is_current_repository(path) or not directory.is_dir():
        return json.loads(path.read_text())
    order = json.loads((directory / '_order.json').read_text())
    metadata = json.loads((directory / '_metadata.json').read_text())
    return {key: metadata[key] if key in metadata else json.loads((directory / (key + '.json')).read_text()) for key in order}


def write_repository(path, value):
    path = Path(path)
    if is_current_repository(path):
        directory = path.parent / 'records'
        directory.mkdir(parents=True, exist_ok=True)
        def save(name, data):
            (directory / name).write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n')
        save('_order.json', list(value))
        save('_metadata.json', {key: data for key, data in value.items() if not isinstance(data, list)})
        for key, data in value.items():
            if isinstance(data, list):
                save(key + '.json', data)
        expected = {key + '.json' for key, data in value.items() if isinstance(data, list)}
        for stale in directory.glob('*.json'):
            if not stale.name.startswith('_') and stale.name not in expected:
                stale.unlink()
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + '\n')
