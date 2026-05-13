import { readFileSync, existsSync } from 'node:fs';

const requiredFiles = [
  'workflow/index.html',
  'workflow/styles.css',
  'workflow/workflow.js',
  'assets/img-5006-architecture-reference.svg',
  'assets/img-5007-transaction-reference.svg',
];

for (const file of requiredFiles) {
  if (!existsSync(file)) {
    throw new Error(`Missing required file: ${file}`);
  }
}

const html = readFileSync('workflow/index.html', 'utf8');
const js = readFileSync('workflow/workflow.js', 'utf8');
const imageText = readFileSync('assets/img-5006-architecture-reference.svg', 'utf8') + readFileSync('assets/img-5007-transaction-reference.svg', 'utf8');

const checks = [
  ['Workflow header', /<h1[^>]*>Workflow<\/h1>/.test(html)],
  ['Run history cards', (js.match(/subject:/g) ?? []).length === 5],
  ['Card 2 high-value reroute', js.includes('ADOPTI-ID 3B81D9') && js.includes('PEX Claim 25 (exception state)')],
  ['Patent center footer', html.includes('patentcenter.uspto.gov/applications/64045063')],
  ['Prior art names', html.includes('UiPath') && html.includes('Shelterluv / PetPoint / Chameleon')],
  ['No USPTO labels in figures', !imageText.includes('USPTO Patent Application')],
];

for (const [name, passed] of checks) {
  if (!passed) throw new Error(`Failed check: ${name}`);
}

console.log('Workflow page static checks passed.');
