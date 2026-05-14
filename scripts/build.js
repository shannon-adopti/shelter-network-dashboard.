import { cp, mkdir, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');

const copyTargets = ['index.html', 'workflow', 'src'];

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });

for (const target of copyTargets) {
  await cp(path.join(root, target), path.join(dist, target), { recursive: true });
}

console.log(`Built static frontend into ${path.relative(root, dist)}/`);
