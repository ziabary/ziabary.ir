import { readFileSync, mkdirSync, chmodSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { trustedNetworks, bootstrapPasswordHash } from './security.mjs';
import { readBootstrap } from './bootstrap.mjs';

export function loadConfig(env = process.env) {
  const production = env.NODE_ENV !== 'development';
  if (production && env.NODE_TLS_REJECT_UNAUTHORIZED === '0') throw Error('TLS certificate verification must remain enabled in production');
  const origin = new URL(env.PUBLIC_URL || 'http://localhost:8787').origin;
  const origins = (env.SITE_ORIGINS || 'http://localhost:5173').split(',').map(x => new URL(x.trim()).origin);
  if (production && [origin, ...origins].some(x => !x.startsWith('https://'))) throw Error('Production origins require HTTPS');
  const keys = JSON.parse(readFileSync(env.SECRETS_FILE || 'config/secrets.json', 'utf8'));
  for (const name of ['encryptionKey', 'identityKey']) if (Buffer.from(keys[name] ?? '', 'base64').length !== 32) throw Error(`Invalid ${name}`);
  const bootstrap=readBootstrap(env.BOOTSTRAP_FILE || 'config/bootstrap.txt');
  const identityKey=Buffer.from(keys.identityKey,'base64');
  const secrets={encryptionKey:keys.encryptionKey,identityKey:keys.identityKey,username:bootstrap.Username,passwordHash:bootstrapPasswordHash(bootstrap.Password,identityKey)};
  const siteKey=bootstrap.ARCAPTCHA_SITE_KEY || '',captchaSecret=bootstrap.ARCAPTCHA_SECRET_KEY || '';
  const testKeys=siteKey==='0000000000' || captchaSecret==='00000000000000000000';
  if(production&&testKeys)throw Error('ARCaptcha test keys are forbidden in production');
  const site = new URL(env.SITE_URL || origins[0]);
  if (!origins.includes(site.origin) || site.username || site.password || site.pathname !== '/' || site.search || site.hash) throw Error('SITE_URL must be one of the SITE_ORIGINS, without a path or credentials');
  const database = resolve(env.DATABASE_FILE || 'data/community.sqlite'); mkdirSync(dirname(database), { recursive: true }); chmodSync(dirname(database), 0o700);
  const number = (key, fallback, max) => { const n = Number(env[key] || fallback); if (!Number.isInteger(n) || n < 1 || n > max) throw Error(`Invalid ${key}`); return n; };
  return { production, origin, origins, siteOrigin:site.origin, secrets, siteKey, captchaSecret, database,
    port: number('PORT',8787,65535), host: env.HOST || '0.0.0.0',
    encryptionKey: Buffer.from(secrets.encryptionKey,'base64'), identityKey: Buffer.from(secrets.identityKey,'base64'),
    trusted: trustedNetworks((env.TRUSTED_PROXY_CIDRS || '').split(',').filter(Boolean)),
    commentsPerSecond: number('COMMENTS_PER_SECOND',5,100), retentionDays: number('VISIT_RETENTION_DAYS',90,365), maxDatabaseMiB: number('MAX_DATABASE_MIB',512,16384),
    analyticsRetentionDays: number('ANALYTICS_RETENTION_DAYS',1095,3650),
    adminName: env.ADMIN_DISPLAY_NAME || 'مهران ضیابری', sessionAge: 8 * 3600000, sessionIdle: 30 * 60000,
    allowTestCaptcha: !production && siteKey==='0000000000' && captchaSecret==='00000000000000000000' && origins.every(x => ['localhost','127.0.0.1'].includes(new URL(x).hostname))
  };
}
