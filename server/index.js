import 'dotenv/config';
import express from 'express';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import helmet from 'helmet';
import pinoHttp from 'pino-http';
import pino from 'pino';
import client from 'prom-client';
import { z } from 'zod';
import { leadSchema } from './schema.js';
import { initDb, insertLead, getAllLeads } from './db.js';
import { sendTelegramLead } from './telegram.js';

// leadSchema импортируется из schema.js

export function createServer() {
  initDb();
  const app = express();
  app.disable('x-powered-by');
  app.use(express.json({ limit: '64kb' }));
  app.use(helmet({ crossOriginResourcePolicy: false }));
  const logger = pino({ level: process.env.LOG_LEVEL || 'info', redact: { paths:['req.headers.authorization','req.body.email','req.body.phone','req.ip'], remove:true } });
  app.use(pinoHttp({ logger, serializers:{ req:(req)=>({ id:req.id, method:req.method, url:req.url }) } }));
  // metrics (instance-specific registry to allow multiple createServer() in tests without duplicate registration)
  const register = new client.Registry();
  client.collectDefaultMetrics({ register });
  const leadCounter = new client.Counter({ name:'app_leads_total', help:'Total leads stored', registers: [register] });
  app.use(cors({ origin: [/localhost/, /127\.0\.0\.1/], methods: ['GET','POST','OPTIONS'] }));
  // Безопасные заголовки (минимально)
  app.use((req,_res,next)=>{ req.id = Math.random().toString(36).slice(2); next(); });

  const contactLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 20,
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (req) => req.headers['x-forwarded-for']?.toString().split(',')[0].trim() || req.ip,
    message: { ok: false, error: 'Слишком много запросов, попробуйте позже' }
  });

  const exportLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 30,
    standardHeaders: true,
    legacyHeaders: false
  });

  app.get('/api/health', (_req,res)=>res.json({ ok: true }));
  app.get('/api/ready', (_req,res)=>{
    try { getAllLeads(); res.json({ ok:true }); } catch { res.status(500).json({ ok:false }); }
  });
  app.get('/metrics', async (_req,res)=> {
    res.setHeader('Content-Type', register.contentType);
    res.end(await register.metrics());
  });

  app.get('/api/admin/export', exportLimiter, (req,res) => {
  // Значение берётся из переменной окружения, не храните секреты в коде! (EXPORT_SECRET)
  const token = process.env.EXPORT_TOKEN;
    const authHeader = req.headers['authorization'] || '';
    const incomingToken = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;
    if (!token || incomingToken !== token) {
      return res.status(401).json({ ok:false, error:'Unauthorized' });
    }
    const rows = getAllLeads();
    const headers = Object.keys(rows[0] || { id:'', created_at:'', name:'', email:'' });
    const csv = [headers.join(','), ...rows.map(r => headers.map(h => escapeCsv(r[h])).join(','))].join('\n');
    res.setHeader('Content-Type','text/csv; charset=utf-8');
    res.setHeader('Content-Disposition','attachment; filename="leads.csv"');
    res.send(csv);
  });

  app.post('/api/contact', contactLimiter, async (req, res) => {
    try {
  const raw = req.body || {};
  console.log('[debug] incoming body:', JSON.stringify(raw));
      if (raw.website) return res.json({ ok: true, spam: true }); // honeypot
      const parsed = leadSchema.safeParse(raw);
  console.log('[debug] validation result:', parsed);
  if (!parsed.success) {
        return res.status(400).json({ ok:false, error:'Validation failed', issues: parsed.error.issues.map(i=>({ path:i.path.join('.'), message:i.message })) });
      }
      const data = parsed.data;
      const lead = {
        name: data.name.trim(),
        email: data.email.trim(),
        phone: data.phone?.trim() || '',
        role: '',
        interest: data.interest || '',
        budget: '',
        timeline: '',
        subject: '',
        message: data.message.trim(),
        consent: data.consent ? 1 : 0,
        ip: '',
        user_agent: '',
        utm_source: data.utm_source || '',
        utm_medium: data.utm_medium || '',
        utm_campaign: data.utm_campaign || '',
        utm_content: data.utm_content || '',
        utm_term: data.utm_term || '',
        referrer: data.referrer || ''
      };
  let inserted;
  try {
    console.log('[debug] lead to insert:', JSON.stringify(lead));
    inserted = insertLead(lead);
    console.log('[debug] insertLead result:', inserted);
    leadCounter.inc();
  } catch (e) {
    const msg = '[insertLead error] ' + (e && e.stack || e);
    console.error(msg);
    try { require('fs').appendFileSync('insertLead-error.log', msg + '\n'); } catch {}
    res.status(500).json({ ok: false, error: 'DB error', details: String(e && e.message || e) });
    return;
  }
      if (process.env.TELEGRAM_DISABLE !== '1') {
        try {
          // debug вывод укороченного сообщения (только часть) для диагностики markdown проблем
          console.log('[telegram] preparing send. msg snippet:', lead.message.slice(0,80));
          // Передаем только нужные поля (без ip и user_agent)
          const { ip, user_agent, ...leadForTelegram } = { ...lead, ...inserted };
          await sendTelegramLead(leadForTelegram);
        } catch (err) { console.error('[telegram]', err.message); }
      }
      res.json({ ok: true, id: inserted.id });
    } catch (err) {
      console.error('[contact] unexpected', err);
      res.status(500).json({ ok:false, error:'Server error' });
    }
  });

  // Глобальный обработчик ошибок Express
  // (добавлять после всех app.use/app.post)
  app.use((err, req, res, next) => {
    console.error('[global error handler]', err && err.stack || err);
    res.status(500).json({ ok: false, error: 'Server error', details: String(err && err.message || err) });
  });

  return app;
}

function escapeCsv(v) {
  if (v == null) return '';
  const s = String(v).replace(/"/g,'""');
  return /[",\n]/.test(s) ? `"${s}"` : s;
}

// Автозапуск если файл запускается напрямую
if (process.argv[1] && process.argv[1].endsWith('index.js')) {
  const app = createServer();
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => console.log('API server listening on :' + PORT));
}
