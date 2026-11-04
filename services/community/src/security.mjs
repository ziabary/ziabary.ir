import { randomBytes, createHash, createHmac, createCipheriv, createDecipheriv, timingSafeEqual, scrypt } from 'node:crypto';
import { promisify } from 'node:util';
import { BlockList, isIP } from 'node:net';

export const random = () => randomBytes(32).toString('base64url');
export const digest = value => createHash('sha256').update(value).digest('hex');
export const mac = (key, value) => createHmac('sha256', key).update(value).digest('hex');
export function equal(a, b) {
  const x = Buffer.from(String(a)), y = Buffer.from(String(b));
  return x.length === y.length && timingSafeEqual(x, y);
}
export async function passwordHash(password, salt = randomBytes(16).toString('hex')) {
  const value = await promisify(scrypt)(password, salt, 64, { N: 32768, r: 8, p: 1, maxmem: 64 * 1024 * 1024 });
  return `scrypt$${salt}$${value.toString('hex')}`;
}
export async function checkPassword(password, stored) {
  return equal(await passwordHash(password, stored.split('$')[1]), stored);
}
export function base32(bytes) {
  let bits = 0, value = 0, result = '';
  for (const byte of bytes) { value = (value << 8) | byte; bits += 8; while (bits >= 5) { result += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'[(value >>> (bits - 5)) & 31]; bits -= 5; } }
  if (bits) result += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'[(value << (5 - bits)) & 31];
  return result;
}
export function totp(secret, counter = Math.floor(Date.now() / 30000), digits = 6) {
  let bits = 0, value = 0; const bytes = [];
  for (const char of secret) { const n = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'.indexOf(char); if (n < 0) throw Error('Invalid TOTP secret'); value = (value << 5) | n; bits += 5; if (bits >= 8) { bytes.push((value >>> (bits - 8)) & 255); bits -= 8; } }
  const buffer = Buffer.alloc(8); buffer.writeBigUInt64BE(BigInt(counter));
  const hash = createHmac('sha1', Buffer.from(bytes)).update(buffer).digest(), offset = hash[hash.length - 1] & 15;
  return String((hash.readUInt32BE(offset) & 0x7fffffff) % 10 ** digits).padStart(digits, '0');
}
export function verifyTotp(secret, code, now, previous = -1) {
  if (!/^\d{6}$/.test(code)) return null;
  const current = Math.floor(now / 30000);
  for (const counter of [current - 1, current, current + 1]) if (counter > previous && equal(totp(secret, counter), code)) return counter;
  return null;
}
export function encrypt(key, text) {
  const iv = randomBytes(12), cipher = createCipheriv('aes-256-gcm', key, iv);
  const bytes = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
  return Buffer.concat([iv, cipher.getAuthTag(), bytes]).toString('base64');
}
export function decrypt(key, text) {
  if (!text) return null;
  const bytes = Buffer.from(text, 'base64'), decipher = createDecipheriv('aes-256-gcm', key, bytes.subarray(0, 12));
  decipher.setAuthTag(bytes.subarray(12, 28));
  return Buffer.concat([decipher.update(bytes.subarray(28)), decipher.final()]).toString('utf8');
}
export function trustedNetworks(cidrs) {
  const list = new BlockList();
  for (const cidr of cidrs) {
    const [ip, prefix] = cidr.split('/'), version = isIP(ip);
    if (!version || Number(prefix) < 1 || Number(prefix) > (version === 4 ? 32 : 128)) throw Error('Use explicit, narrow TRUSTED_PROXY_CIDRS');
    list.addSubnet(ip, Number(prefix), version === 4 ? 'ipv4' : 'ipv6');
  }
  return ip => list.check(ip, isIP(ip) === 4 ? 'ipv4' : 'ipv6');
}
export function clientIp(request, trusted) {
  const normalize = value => value?.startsWith('::ffff:') ? value.slice(7) : value;
  const peer = normalize(request.socket.remoteAddress);
  if (!peer || !isIP(peer)) throw Error('Invalid peer');
  if (!trusted(peer)) return peer;
  const chain = String(request.headers['x-forwarded-for'] ?? '').split(',').map(x => normalize(x.trim())).filter(Boolean);
  if (chain.length > 10 || chain.some(ip => !isIP(ip))) throw Error('Invalid proxy chain');
  let current = peer;
  for (let i = chain.length - 1; i >= 0 && trusted(current); i--) current = chain[i];
  return current;
}
export function ticket(key, payload) { const body = Buffer.from(JSON.stringify(payload)).toString('base64url'); return `${body}.${mac(key, body)}`; }
export function readTicket(key, token) {
  if (typeof token !== 'string' || token.length > 2048) return null;
  const [body, signature, extra] = token.split('.');
  if (extra || !equal(mac(key, body ?? ''), signature)) return null;
  try { return JSON.parse(Buffer.from(body, 'base64url')); } catch { return null; }
}
