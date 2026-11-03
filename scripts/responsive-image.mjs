import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const run = promisify(execFile);

export async function writeResponsiveImage(source, output, width) {
  const limits = ['-limit', 'thread', '1'];
  const transform = [source + '[0]', '-auto-orient', '-resize', `${width}x>`, '-strip', '-quality', '84', output];
  try {
    await run('convert', [...limits, '-define', `jpeg:size=${width}x${width}`, ...transform]);
  } catch (error) {
    // Some JPEG decoders enlarge a wide image for the square decode hint. A
    // normal decode keeps the original within policy limits; never raise them.
    if (!String(error.stderr).includes('width or height exceeds limit')) throw error;
    await run('convert', [...limits, ...transform]);
  }
}
