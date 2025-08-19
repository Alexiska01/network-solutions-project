import { describe, it, expect } from 'vitest';
import { createServer } from '../index.js';
import http from 'node:http';

// helper to start server on ephemeral port
function start(app: any): Promise<any> {
  return new Promise(resolve => {
    const srv = http.createServer(app);
    srv.listen(0, () => resolve(srv));
  });
}

describe('contact endpoint', () => {
  it('rejects invalid email', async () => {
    process.env.DB_FILE = ':memory:';
    const app = createServer();
    const srv: any = await start(app);
    const { port } = srv.address();
    const res = await fetchJson(port, '/api/contact', { name: 'A', email: 'bad', message: 'Hi' });
    expect(res.ok).toBe(false);
    srv.close();
  });

  it('accepts valid lead', async () => {
    process.env.DB_FILE = ':memory:';
    const app = createServer();
    const srv: any = await start(app);
    const { port } = srv.address();
    const res = await fetchJson(port, '/api/contact', { name: 'User', email: 'u@example.com', message: 'Hello' });
    expect(res.ok).toBe(true);
    expect(res.id).toBeGreaterThan(0);
    srv.close();
  });
});

async function fetchJson(port: number, path: string, body: any) {
  const r = await fetch(`http://localhost:${port}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  return r.json();
}
