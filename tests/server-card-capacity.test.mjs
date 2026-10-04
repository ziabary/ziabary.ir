import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import ts from 'typescript';

const source = readFileSync(new URL('../src/lib/server-data.ts', import.meta.url), 'utf8');
const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
const { serverRecords, serverGpuProfiles, serverCardCapacity } = await import(`data:text/javascript;base64,${Buffer.from(code).toString('base64')}`);
const server = (id) => serverRecords.find((item) => item.id === id);
const card = (id) => serverGpuProfiles.find((item) => item.id === id);

test('OEM card limits override physical GPU slot capacity', () => {
  assert.equal(server('hpe-dl380a-gen12').maxDoubleWidthGpus, 10);
  assert.equal(serverCardCapacity(server('hpe-dl380a-gen12'), card('rtx-pro-6000-bse')), 8);
  assert.equal(serverCardCapacity(server('supermicro-as-4125gs-tnrt2'), card('l40s')), 10);
  assert.equal(serverCardCapacity(server('supermicro-as-4125gs-tnrt2'), card('l4')), 8);
  assert.equal(serverCardCapacity(server('supermicro-sys-422ga-nrt'), card('rtx-pro-4500-bse')), 8);
  assert.equal(serverCardCapacity(server('hpe-dl345-gen12'), card('rtx-pro-6000-bse')), 0);
});
