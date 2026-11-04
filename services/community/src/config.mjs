import { readFileSync, mkdirSync, chmodSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { trustedNetworks } from './security.mjs';

export function loadConfig(env = process.env) {
  const production = env.NODE_ENV !== 'development';
  if (production && env.NODE_TLS_REJECT_UNAUTHORIZED === '0') throw Error('TLS certificate verification must remain enabled in production');
  const origin = new URL(env.PUBLIC_URL || 'http://localhost:8787').origin;
  const origins = (env.SITE_ORIGINS || 'http://localhost:5173').split(',').map(x => new URL(x.trim()).origin);
  if (production && [origin, ...origins].some(x => !x.startsWith('https://'))) throw Error('Production origins require HTTPS');
  const secrets = JSON.parse(readFileSync(env.SECRETS_FILE || 'config/secrets.json', 'utf8'));
  for (const name of ['encryptionKey', 'identityKey']) if (Buffer.from(secrets[name] ?? '', 'base64').length !== 32) throw Error(`Invalid ${name}`);
  if (!/^scrypt\$[a-f0-9]{32}\$[a-f0-9]{128}$/.test(secrets.passwordHash) || !/^[A-Z2-7]{32}$/.test(secrets.totpSecret) || !/^[\w.-]{3,60}$/.test(secrets.username)) throw Error('Run npm run setup to create administrator credentials');
  const siteKey = env.TURNSTILE_SITE_KEY || '', captchaSecret = secrets.turnstileSecret || '';
  if (production && (/^[123]x0/.test(siteKey) || /^[123]x0/.test(captchaSecret))) throw Error('Turnstile test keys are forbidden in production');
  const posts = JSON.parse(readFileSync(env.POSTS_FILE || 'config/posts.json', 'utf8'));
  if (!Array.isArray(posts) || !posts.length || posts.length > 10000) throw Error('Generate a published post catalogue first');
  for (const post of posts) if (!/^\/(?:[a-z0-9_-]+\/)*$/.test(post.path) || typeof post.title !== 'string' || post.title.length > 500 || !['fa','en','es'].includes(post.locale) || typeof post.commentable !== 'boolean') throw Error('Invalid post catalogue');
  if (new Set(posts.map(p => p.path)).size !== posts.length) throw Error('Duplicate post path');
  if (posts.some(p => p.path.includes('/articles/kazan-investment-reality/'))) throw Error('Permanently private article cannot enter the public catalogue');
  const database = resolve(env.DATABASE_FILE || 'data/community.sqlite'); mkdirSync(dirname(database), { recursive: true }); chmodSync(dirname(database), 0o700);
  const number = (key, fallback, max) => { const n = Number(env[key] || fallback); if (!Number.isInteger(n) || n < 1 || n > max) throw Error(`Invalid ${key}`); return n; };
  return { production, origin, origins, secrets, siteKey, captchaSecret, posts, database,
    port: number('PORT',8787,65535), host: env.HOST || '0.0.0.0',
    encryptionKey: Buffer.from(secrets.encryptionKey,'base64'), identityKey: Buffer.from(secrets.identityKey,'base64'),
    trusted: trustedNetworks((env.TRUSTED_PROXY_CIDRS || '').split(',').filter(Boolean)),
    commentsPerSecond: number('COMMENTS_PER_SECOND',5,100), retentionDays: number('VISIT_RETENTION_DAYS',90,365), maxDatabaseMiB: number('MAX_DATABASE_MIB',512,16384),
    adminName: env.ADMIN_DISPLAY_NAME || 'مهران ضیابری', sessionAge: 8 * 3600000, sessionIdle: 30 * 60000,
    captchaHosts: origins.map(x => new URL(x).hostname),
    allowTestCaptcha: !production && /^[123]x0/.test(siteKey) && origins.every(x => ['localhost','127.0.0.1'].includes(new URL(x).hostname))
  };
}
