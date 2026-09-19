import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';

const read = file => JSON.parse(fs.readFileSync(file, 'utf8'));
const folder = 'data/llm/locales';
const bindings = read(`${folder}/record-bindings.json`);
const repository = read('data/llm/v0.3.0/repository.json');
const messages = read(`${folder}/messages.fa.json`);
const records = read(`${folder}/records.fa.json`);
const placeholders = value => (value.match(/\{\d+\}/g) ?? []).sort();
const usedRecords = new Set();
const sources = new Map();
let fields = 0;

for (const [entity, paths] of Object.entries(bindings)) {
  const [namespace, id] = entity.split('/');
  assert.ok(id && id !== 'undefined', `Translation binding without a stable identity: ${entity}`);
  if (!sources.has(namespace)) {
    const name = namespace.split('.')[1];
    sources.set(namespace, namespace.startsWith('repository.') ? repository[name]
      : read(`data/llm/v0.2.0/data/${name}.json`));
  }
  const data = sources.get(namespace);
  const record = id === 'root' ? data : data?.find(item => item.id === id);
  assert.ok(record, `Missing translation entity: ${entity}`);
  for (const [field, key] of Object.entries(paths)) {
    let value = record;
    for (const segment of field.split('/')) value = value?.[segment];
    assert.equal(typeof value, 'string', `Stale translation field: ${entity}/${field}`);
    assert.equal(value, records[key], `Source copy changed; review all editions: ${entity}/${field}`);
    usedRecords.add(key); fields++;
  }
}
assert.deepEqual([...usedRecords].sort(), Object.keys(records).sort(), 'Unused editorial translations');
for (const locale of ['en', 'es']) for (const kind of ['messages', 'records']) {
  const source = kind === 'messages' ? messages : records;
  const translated = read(`${folder}/${kind}.${locale}.json`);
  assert.deepEqual(Object.keys(translated).sort(), Object.keys(source).sort(), `${locale}/${kind}: incomplete catalog`);
  for (const [key, value] of Object.entries(translated)) {
    assert.equal(typeof value, 'string');
    assert.ok(value.trim(), `Empty translation: ${locale}/${key}`);
    assert.doesNotMatch(value, /[\u0600-\u06ff]/, `Persian fallback: ${locale}/${key}`);
    assert.deepEqual(placeholders(value), placeholders(source[key]), `Placeholder mismatch: ${locale}/${key}`);
  }
}
function walk(directory) {
  return fs.readdirSync(directory, {withFileTypes:true}).flatMap(entry => entry.isDirectory()
    ? walk(path.join(directory,entry.name)) : [path.join(directory,entry.name)]);
}
for (const file of [...walk('src/lib/llm'), ...walk('src/lib/components').filter(file => /\/Llm[^/]*\.svelte$/.test(file))]) {
  if (!/\.(ts|svelte)$/.test(file)) continue;
  for (const match of fs.readFileSync(file,'utf8').matchAll(/\bt\(['"]([^'"]+)['"]/g)) {
    if (match[1].endsWith('.')) continue; // Dynamic families are checked by behavioural tests.
    assert.ok(messages[match[1]], `Missing message ${match[1]} in ${file}`);
  }
}
console.log(`LLM locales verified: ${Object.keys(messages).length} messages, ${usedRecords.size} editorial texts, ${fields} entity fields, 3 editions.`);
