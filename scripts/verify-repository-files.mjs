import { execFileSync } from 'node:child_process';
import { statSync } from 'node:fs';

const limit = 5 * 1024 * 1024;
const files = new Set(execFileSync('git', ['ls-files', '-z', '--cached', '--others', '--exclude-standard'], { encoding: 'utf8' }).split('\0').filter(Boolean));
const oversized = [];
for (const file of files) {
  let stats;
  try { stats = statSync(file); } catch (error) { if (error.code === 'ENOENT') continue; throw error; }
  if (stats.isFile() && stats.size >= limit) oversized.push(`${file} (${(stats.size / 1024 / 1024).toFixed(2)} MiB)`);
}
if (oversized.length) throw new Error(`Files at least 5 MiB must remain outside Git or be split into source collections:\n${oversized.join('\n')}`);
console.log(`Repository file sizes verified: ${files.size} source paths; files at least 5 MiB are excluded.`);
