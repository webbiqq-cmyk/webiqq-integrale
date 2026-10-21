// Local preview of dist/ with the same clean URLs as Vercel. `npm run serve`
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';

const root = new URL('../dist/', import.meta.url).pathname;
const port = Number(process.env.PORT) || 4173;
const types = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript',
  '.svg': 'image/svg+xml', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.woff2': 'font/woff2', '.json': 'application/json',
};

async function file(p) {
  try { return (await stat(p)).isFile() ? p : null; } catch { return null; }
}

createServer(async (req, res) => {
  const url = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  const safe = normalize(url).replace(/^(\.\.[/\\])+/, '');
  const target =
    (await file(join(root, safe))) ||
    (await file(join(root, safe.replace(/\/$/, '') + '.html'))) ||
    (await file(join(root, safe, 'index.html')));
  const path = target || join(root, '404.html');
  res.writeHead(target ? 200 : 404, { 'content-type': types[extname(path)] || 'application/octet-stream' });
  res.end(await readFile(path));
}).listen(port, () => console.log(`http://localhost:${port}`));
