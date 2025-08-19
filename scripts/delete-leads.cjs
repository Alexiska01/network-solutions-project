// Удаляет лиды по email или id из data/leads.sqlite (CommonJS)
// Запуск: node scripts/delete-leads.cjs [email] [id]
const path = require('path');
const Database = require('better-sqlite3');

const dbPath = path.join(__dirname, '..', 'data', 'leads.sqlite');
const emailArg = process.argv[2] || 'test+automation@example.com';
const idArg = process.argv[3] || '62234f9c0d3';

console.log('DB:', dbPath);
console.log('Deleting by email:', emailArg, 'or id:', idArg);

const db = new Database(dbPath, { readonly: false });
try {
  const del = db.prepare('DELETE FROM contact_leads WHERE email = ? OR id = ?');
  const info = del.run(emailArg, idArg);
  console.log('deleted rows:', info.changes);
  try { db.prepare('VACUUM').run(); } catch (e) { /* ignore vacuum errors */ }
} catch (err) {
  console.error('ERROR:', err && err.message ? err.message : err);
  process.exit(2);
} finally {
  try { db.close(); } catch (e) {}
}

console.log('Done.');
