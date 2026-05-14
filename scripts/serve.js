import { createServer } from 'node:http';
import { createReadStream, existsSync } from 'node:fs';
import { stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const mode = process.argv.includes('--dist') ? 'dist' : '.';
const baseDir = path.join(root, mode);
const portArg = process.argv.find((arg) => arg.startsWith('--port='));
const port = Number(portArg?.split('=')[1] || process.env.PORT || 4173);

const contentTypes = new Map([
  ['.html', 'text/html; charset=utf-8'],
  ['.css', 'text/css; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.svg', 'image/svg+xml; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
]);

const safePath = (urlPath) => {
  const decoded = decodeURIComponent(urlPath.split('?')[0]);
  const normalized = path.normalize(decoded).replace(/^[/\\]+/, '');
  return path.join(baseDir, normalized);
};

const resolveFile = async (requestUrl) => {
  const requested = safePath(requestUrl === '/' ? '/index.html' : requestUrl);
  if (!requested.startsWith(baseDir)) return null;

  if (existsSync(requested) && (await stat(requested)).isFile()) return requested;

  const indexFile = path.join(requested, 'index.html');
  if (existsSync(indexFile) && (await stat(indexFile)).isFile()) return indexFile;

  const cleanUrlIndex = path.join(baseDir, requestUrl.replace(/^\//, ''), 'index.html');
  if (existsSync(cleanUrlIndex) && (await stat(cleanUrlIndex)).isFile()) return cleanUrlIndex;

  return null;
};

createServer(async (req, res) => {
  const filePath = await resolveFile(req.url || '/');
  if (!filePath) {
    res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
    res.end('Not found');
    return;
  }

  const ext = path.extname(filePath);
  res.writeHead(200, { 'content-type': contentTypes.get(ext) || 'application/octet-stream' });
  createReadStream(filePath).pipe(res);
}).listen(port, '0.0.0.0', () => {
  console.log(`Serving ${mode === 'dist' ? 'built frontend' : 'source frontend'} at http://127.0.0.1:${port}`);
});
