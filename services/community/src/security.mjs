import { randomBytes, createHash, createHmac, createCipheriv, createDecipheriv, timingSafeEqual, scrypt, scryptSync } from 'node:crypto';
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
export function bootstrapPasswordHash(password, identityKey) {
  const salt=mac(identityKey,'community-admin-password-v2').slice(0,32);
  return `scrypt$${salt}$${scryptSync(password,salt,64,{N:32768,r:8,p:1,maxmem:64*1024*1024}).toString('hex')}`;
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
