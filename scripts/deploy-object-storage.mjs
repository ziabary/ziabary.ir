import { createHash } from 'node:crypto';
import { createReadStream, readFileSync } from 'node:fs';
import { readdir, stat } from 'node:fs/promises';
import { extname, join, relative, resolve } from 'node:path';
import {
  DeleteObjectsCommand,
  HeadObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client
} from '@aws-sdk/client-s3';

const projectRoot = resolve(import.meta.dirname, '..');
const buildRoot = join(projectRoot, 'build');
const envPath = process.env.DEPLOY_ENV_FILE || join(projectRoot, '.env.deploy');

loadEnvFile(envPath);

const bucket = required('S3_BUCKET');
const region = process.env.S3_REGION || 'ir-thr-at1';
const endpoint = normalizeEndpoint(required('S3_ENDPOINT'), bucket);
const accessKeyId = required('AWS_ACCESS_KEY_ID');
const secretAccessKey = required('AWS_SECRET_ACCESS_KEY');

const s3 = new S3Client({
  endpoint,
  region,
  forcePathStyle: true,
  requestChecksumCalculation: 'WHEN_REQUIRED',
  responseChecksumValidation: 'WHEN_REQUIRED',
  credentials: { accessKeyId, secretAccessKey }
});

const localFiles = await collectFiles(buildRoot);
const localKeys = new Set(localFiles.map(({ key }) => key));
const remoteKeys = await listRemoteKeys();

let uploaded = 0;
let skipped = 0;

await concurrently(localFiles, 8, async ({ path, key }) => {
  const fileStat = await stat(path);
  const checksum = await sha256(path);
  const remote = await headObject(key);

  if (remote?.Metadata?.sha256 === checksum && remote.ContentLength === fileStat.size) {
    skipped += 1;
    return;
  }

  const { contentType, contentEncoding } = objectHeaders(key);
  await s3.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: createReadStream(path),
      ContentLength: fileStat.size,
      ContentType: contentType,
      ContentEncoding: contentEncoding,
      CacheControl: cacheControl(key),
      Metadata: { sha256: checksum }
    })
  );
  uploaded += 1;
  console.log(`uploaded  ${key}`);
});

const staleKeys = [...remoteKeys].filter((key) => !localKeys.has(key));
for (let offset = 0; offset < staleKeys.length; offset += 1000) {
  const batch = staleKeys.slice(offset, offset + 1000);
  await s3.send(
    new DeleteObjectsCommand({
      Bucket: bucket,
      Delete: { Objects: batch.map((Key) => ({ Key })), Quiet: true }
    })
  );
}

console.log(`Deployment complete: ${uploaded} uploaded, ${skipped} unchanged, ${staleKeys.length} deleted.`);

function loadEnvFile(path) {
  let source;
  try {
    source = readFileSync(path, 'utf8');
  } catch (error) {
    if (error.code === 'ENOENT') return;
    throw error;
  }

  for (const rawLine of source.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;
    const separator = line.indexOf('=');
    if (separator < 1) continue;
    const key = line.slice(0, separator).trim();
    let value = line.slice(separator + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = value;
  }
}

function required(name) {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is missing. Add it to .env.deploy.`);
  return value;
}

function normalizeEndpoint(value, bucketName) {
  const endpointUrl = new URL(value);
  const bucketPrefix = `${bucketName}.`;
  if (endpointUrl.hostname.startsWith(bucketPrefix)) {
    endpointUrl.hostname = endpointUrl.hostname.slice(bucketPrefix.length);
  }
  return endpointUrl.href.replace(/\/$/, '');
}

async function collectFiles(directory) {
  const files = [];
  async function visit(current) {
    for (const entry of await readdir(current, { withFileTypes: true })) {
      const path = join(current, entry.name);
      if (entry.isDirectory()) await visit(path);
      else if (entry.isFile()) files.push({ path, key: relative(directory, path).replaceAll('\\', '/') });
    }
  }
  await visit(directory);
  return files;
}

async function sha256(path) {
  const hash = createHash('sha256');
  for await (const chunk of createReadStream(path)) hash.update(chunk);
  return hash.digest('hex');
}

async function headObject(key) {
  try {
    return await s3.send(new HeadObjectCommand({ Bucket: bucket, Key: key }));
  } catch (error) {
    if (error.name === 'NotFound' || error.$metadata?.httpStatusCode === 404) return null;
    throw error;
  }
}

async function listRemoteKeys() {
  const keys = new Set();
  let ContinuationToken;
  do {
    const page = await s3.send(new ListObjectsV2Command({ Bucket: bucket, ContinuationToken }));
    for (const object of page.Contents || []) if (object.Key) keys.add(object.Key);
    ContinuationToken = page.IsTruncated ? page.NextContinuationToken : undefined;
  } while (ContinuationToken);
  return keys;
}

async function concurrently(items, limit, worker) {
  let cursor = 0;
  async function run() {
    while (cursor < items.length) {
      const item = items[cursor++];
      await worker(item);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, run));
}

function cacheControl(key) {
  if (key.startsWith('_app/immutable/')) return 'public,max-age=31536000,immutable';
  if (/\.html(?:\.(?:br|gz))?$/.test(key)) return 'public,max-age=300';
  return 'public,max-age=3600';
}

function objectHeaders(key) {
  let sourceKey = key;
  let contentEncoding;
  if (key.endsWith('.br')) {
    sourceKey = key.slice(0, -3);
    contentEncoding = 'br';
  } else if (key.endsWith('.gz')) {
    sourceKey = key.slice(0, -3);
    contentEncoding = 'gzip';
  }

  const types = {
    '.avif': 'image/avif', '.css': 'text/css; charset=utf-8', '.csv': 'text/csv; charset=utf-8',
    '.gif': 'image/gif', '.html': 'text/html; charset=utf-8', '.ico': 'image/x-icon',
    '.jpeg': 'image/jpeg', '.jpg': 'image/jpeg', '.js': 'text/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8', '.md': 'text/markdown; charset=utf-8',
    '.pdf': 'application/pdf', '.png': 'image/png', '.svg': 'image/svg+xml',
    '.ttf': 'font/ttf', '.txt': 'text/plain; charset=utf-8', '.webmanifest': 'application/manifest+json',
    '.webp': 'image/webp', '.woff': 'font/woff', '.woff2': 'font/woff2', '.xml': 'application/xml'
  };

  return { contentType: types[extname(sourceKey).toLowerCase()] || 'application/octet-stream', contentEncoding };
}
