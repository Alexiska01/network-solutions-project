import { describe, it, expect } from 'vitest';
import http from 'node:http';
import { createServer } from '../index.js';

function start(app: any): Promise<any> { return new Promise(r=>{ const s=http.createServer(app); s.listen(0,()=>r(s)); }); }

describe('export endpoint', () => {
  it('rejects without token', async () => {
    process.env.DB_FILE=':memory:';
    const app = createServer();
    const srv: any = await start(app); const { port } = srv.address();
    const res = await fetch(`http://localhost:${port}/api/admin/export`);
    expect(res.status).toBe(401);
    srv.close();
  });
  it('returns CSV with correct token', async () => {
    process.env.DB_FILE=':memory:';
    process.env.EXPORT_TOKEN='TESTTOKEN';
    const app = createServer();
    const srv: any = await start(app); const { port } = srv.address();
    await fetch(`http://localhost:${port}/api/contact`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ name:'User', email:'u@example.com', message:'Hi'}) });
    const res = await fetch(`http://localhost:${port}/api/admin/export`, { headers: { Authorization: 'Bearer TESTTOKEN' } });
    expect(res.status).toBe(200);
    const text = await res.text();
    expect(text.split('\n')[0]).toMatch(/email/);
    expect(text).toMatch(/u@example.com/);
    srv.close();
  });
});
