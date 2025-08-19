import 'dotenv/config';
import express from 'express';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import { initDb, insertLead, getAllLeads } from './db.js';
import { sendTelegramLead } from './telegram.js';

initDb();

const app = express();
app.use(express.json());

// Rate limit: 20 POST /api/contact per 10 minutes per IP
const contactLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => req.headers['x-forwarded-for']?.toString().split(',')[0].trim() || req.ip,
  message: { ok: false, error: 'Слишком много запросов, попробуйте позже' }
});
app.use(cors({ origin: [/localhost/, /127\.0\.0\.1/], methods: ['POST','OPTIONS'] }));

// Basic health check
app.get('/api/health', (req,res)=>res.json({ ok: true }));

// CSV export (simple token auth): set EXPORT_TOKEN in env
app.get('/api/admin/export', (req,res) => {
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

function escapeCsv(v) {
  if (v == null) return '';
  const s = String(v).replace(/"/g,'""');
  return /[",\n]/.test(s) ? `"${s}"` : s;
}

app.post('/api/contact', contactLimiter, async (req, res) => {
  try {
    const data = req.body || {};
    // Honeypot check (if front adds 'website')
    if (data.website) return res.json({ ok: true, spam: true });
    const required = ['name','email','message'];
    for (const f of required) {
      if (!data[f] || String(data[f]).trim() === '') {
        return res.status(400).json({ ok: false, error: `Поле ${f} обязательно` });
      }
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email)) {
      return res.status(400).json({ ok: false, error: 'Некорректный email' });
    }
    const lead = {
      name: data.name.trim(),
      email: data.email.trim(),
      phone: data.phone?.trim() || '',
      role: data.role || '',
      interest: data.interest || '',
      budget: data.budget || '',
      timeline: data.timeline || '',
      subject: data.subject || '',
      message: String(data.message || '').trim().slice(0, 5000),
      consent: data.consent ? 1 : 0,
      ip: req.headers['x-forwarded-for']?.toString().split(',')[0].trim() || req.socket.remoteAddress || '',
      user_agent: req.headers['user-agent'] || '',
      utm_source: data.utm_source || '',
      utm_medium: data.utm_medium || '',
      utm_campaign: data.utm_campaign || '',
      utm_content: data.utm_content || '',
      utm_term: data.utm_term || '',
      referrer: data.referrer || ''
    };
    const inserted = insertLead(lead);
    let telegramResult = null;
    try {
      telegramResult = await sendTelegramLead({ ...lead, ...inserted });
    } catch (err) {
      console.error('[telegram] error', err.message);
    }
    res.json({ ok: true, id: inserted.id, telegram: telegramResult && !telegramResult.skipped });
  } catch (err) {
    console.error('[contact] unexpected', err);
    res.status(500).json({ ok: false, error: 'Server error' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log('API server listening on :' + PORT);
});
