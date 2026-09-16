/** Validate one selected download package without counting alternative GGUF layouts twice. */
export function validateArtifactManifest(files, label = 'artifact') {
  const names = files.map(file => file.path ?? file.name);
  if (new Set(names).size !== names.length) throw new Error(`${label}: duplicate file path`);
  const groups = new Map();
  for (const name of names) {
    const match = /^(.*)-(\d{5})-of-(\d{5})\.gguf$/i.exec(name);
    if (!match) continue;
    const [, stem, index, count] = match;
    if (names.includes(`${stem}.gguf`)) throw new Error(`${label}: complete GGUF and equivalent shards selected together`);
    const group = groups.get(stem) ?? {count: Number(count), indices: new Set()};
    if (group.count !== Number(count) || Number(index) < 1 || Number(index) > group.count) throw new Error(`${label}: inconsistent GGUF shard numbering`);
    group.indices.add(Number(index)); groups.set(stem, group);
  }
  for (const group of groups.values()) if (group.indices.size !== group.count) throw new Error(`${label}: incomplete GGUF shard set`);
}
