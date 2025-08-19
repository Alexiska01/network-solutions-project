import Database from 'better-sqlite3';
import path from 'node:path';
import fs from 'node:fs';

const DB_DIR = path.resolve(process.cwd(), 'data');
const DB_FILE = path.join(DB_DIR, 'leads.sqlite');

if (!fs.existsSync(DB_DIR)) fs.mkdirSync(DB_DIR, { recursive: true });

export const db = new Database(DB_FILE);

export function initDb() {
  db.prepare(`CREATE TABLE IF NOT EXISTS contact_leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created_at TEXT NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    role TEXT,
    interest TEXT,
    budget TEXT,
    timeline TEXT,
    subject TEXT,
    message TEXT NOT NULL,
    consent INTEGER NOT NULL DEFAULT 0,
    ip TEXT,
    user_agent TEXT,
    utm_source TEXT,
    utm_medium TEXT,
    utm_campaign TEXT,
    utm_content TEXT,
    utm_term TEXT,
    referrer TEXT
  )`).run();
  // Simple additive migration: check columns exist (better-sqlite3 pragma approach skipped for brevity)
}

export function insertLead(lead) {
  const stmt = db.prepare(`INSERT INTO contact_leads
  (created_at,name,email,phone,role,interest,budget,timeline,subject,message,consent,ip,user_agent,utm_source,utm_medium,utm_campaign,utm_content,utm_term,referrer)
  VALUES (@created_at,@name,@email,@phone,@role,@interest,@budget,@timeline,@subject,@message,@consent,@ip,@user_agent,@utm_source,@utm_medium,@utm_campaign,@utm_content,@utm_term,@referrer)`);
  const created_at = new Date().toISOString();
  const info = stmt.run({ ...lead, created_at });
  return { id: info.lastInsertRowid, created_at };
}

export function getAllLeads() {
  return db.prepare('SELECT * FROM contact_leads ORDER BY id DESC').all();
}
