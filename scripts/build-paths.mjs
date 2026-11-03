import { fileURLToPath } from 'node:url';

export const publicAssetsDirectory = fileURLToPath(new URL('../.build/public/', import.meta.url));
export const generatedDirectory = fileURLToPath(new URL('../.build/generated/', import.meta.url));
