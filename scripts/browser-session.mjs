import net from 'node:net';
import crypto from 'node:crypto';
import fs from 'node:fs/promises';

const target = await fetch('http://127.0.0.1:9334/json/new?about:blank', { method: 'PUT' }).then((response) => response.json());
const endpoint = new URL(target.webSocketDebuggerUrl);
const socket = net.createConnection({ host: endpoint.hostname, port: Number(endpoint.port) });
let buffer = Buffer.alloc(0);
let upgraded = false;
let id = 0;
const pending = new Map();
const events = [];

function frame(message) {
  const payload = Buffer.from(message);
  const mask = crypto.randomBytes(4);
  let header;
  if (payload.length < 126) {
    header = Buffer.from([0x81, 0x80 | payload.length]);
  } else if (payload.length < 65536) {
    header = Buffer.alloc(4);
    header[0] = 0x81;
    header[1] = 0x80 | 126;
    header.writeUInt16BE(payload.length, 2);
  } else {
    header = Buffer.alloc(10);
    header[0] = 0x81;
    header[1] = 0x80 | 127;
    header.writeBigUInt64BE(BigInt(payload.length), 2);
  }
  const masked = Buffer.alloc(payload.length);
  for (let i = 0; i < payload.length; i += 1) masked[i] = payload[i] ^ mask[i % 4];
  return Buffer.concat([header, mask, masked]);
}

function parseFrames() {
  while (buffer.length >= 2) {
    const opcode = buffer[0] & 0x0f;
    const second = buffer[1];
    let length = second & 0x7f;
    let offset = 2;
    if (length === 126) {
      if (buffer.length < 4) return;
      length = buffer.readUInt16BE(2);
      offset = 4;
    } else if (length === 127) {
      if (buffer.length < 10) return;
      length = Number(buffer.readBigUInt64BE(2));
      offset = 10;
    }
    const masked = Boolean(second & 0x80);
    const maskLength = masked ? 4 : 0;
    if (buffer.length < offset + maskLength + length) return;
    const mask = masked ? buffer.subarray(offset, offset + 4) : null;
    const payload = Buffer.from(buffer.subarray(offset + maskLength, offset + maskLength + length));
    if (mask) for (let i = 0; i < payload.length; i += 1) payload[i] ^= mask[i % 4];
    buffer = buffer.subarray(offset + maskLength + length);
    if (opcode === 0x8) return;
    const message = JSON.parse(payload.toString());
    if (message.method && ['Runtime.exceptionThrown','Log.entryAdded','Network.responseReceived','Network.loadingFailed'].includes(message.method)) events.push(message);
    if (message.id && pending.has(message.id)) {
      const { resolve, reject } = pending.get(message.id);
      pending.delete(message.id);
      if (message.error) reject(new Error(JSON.stringify(message.error)));
      else resolve(message.result);
    }
  }
}

socket.on('data', (chunk) => {
  buffer = Buffer.concat([buffer, chunk]);
  if (!upgraded) {
    const end = buffer.indexOf('\r\n\r\n');
    if (end < 0) return;
    buffer = buffer.subarray(end + 4);
    upgraded = true;
  }
  parseFrames();
});

await new Promise((resolve) => socket.once('connect', resolve));
const key = crypto.randomBytes(16).toString('base64');
socket.write([
  `GET ${endpoint.pathname} HTTP/1.1`,
  `Host: ${endpoint.host}`,
  'Upgrade: websocket',
  'Connection: Upgrade',
  `Sec-WebSocket-Key: ${key}`,
  'Sec-WebSocket-Version: 13',
  '',
  ''
].join('\r\n'));
while (!upgraded) await new Promise((resolve) => setTimeout(resolve, 10));

function call(method, params = {}) {
  id += 1;
  const requestId = id;
  socket.write(frame(JSON.stringify({ id: requestId, method, params })));
  return new Promise((resolve, reject) => pending.set(requestId, { resolve, reject }));
}


const pause = (duration) => new Promise((resolve) => setTimeout(resolve, duration));
await call('Page.enable'); await call('Runtime.enable');
await call('Network.enable'); await call('Log.enable');
await call('Network.setBlockedURLs',{urls:['*googletagmanager.com*','*google-analytics.com*']});

export { call, pause, events, socket };
