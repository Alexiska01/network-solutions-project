// Dev helper server adding Cache-Control for .glb files
// Usage: node scripts/serve-with-headers.js
import { createServer } from 'http';
import { readFile, stat } from 'fs/promises';
import { existsSync, createReadStream } from 'fs';
import path from 'path';
import mime from 'mime';

const root = path.resolve(process.cwd(), 'public');
const PORT = process.env.PORT || 5173;

const ONE_YEAR = 31536000; // seconds

createServer(async (req, res) => {
  try {
    const urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
    let filePath = path.join(root, urlPath);
    if (filePath.endsWith('/')) filePath += 'index.html';
    if (!existsSync(filePath)) {
      // fallback to index.html for SPA routes
      filePath = path.join(root, 'index.html');
    }
    const ext = path.extname(filePath).toLowerCase();
    const type = mime.getType(ext) || 'application/octet-stream';
    res.setHeader('Content-Type', type);
    if (ext === '.glb') {
      res.setHeader('Cache-Control', `public, max-age=${ONE_YEAR}, immutable`);
    } else if (/\.(js|css|woff2|png|jpg|jpeg|svg|webp)$/i.test(ext)) {
      res.setHeader('Cache-Control', 'public, max-age=604800, immutable'); // 7 days for other static assets
    } else if (ext === '.html') {
      res.setHeader('Cache-Control', 'no-cache');
    }
    const s = createReadStream(filePath);
    s.on('error', (e) => {
      res.statusCode = 500; res.end('Internal error');
    });
    s.pipe(res);
  } catch (e) {
    res.statusCode = 500;
    res.end('Internal server error');
  }
}).listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Dev server with headers on http://localhost:${PORT}`);
});
