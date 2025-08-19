import fetch from 'node-fetch';

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID; // single chat id or channel id

export async function sendTelegramLead(lead) {
  if (!BOT_TOKEN || !CHAT_ID) {
    console.warn('[telegram] BOT_TOKEN or CHAT_ID not set; skipping send');
    return { skipped: true };
  }
  const lines = [
    '📨 *Новая заявка с сайта*',
    `*Имя:* ${escapeMarkdown(lead.name)}`,
    `*Email:* ${escapeMarkdown(lead.email)}`,
    lead.phone ? `*Телефон:* ${escapeMarkdown(lead.phone)}` : null,
    lead.role ? `*Роль:* ${escapeMarkdown(lead.role)}` : null,
    lead.interest ? `*Интерес:* ${escapeMarkdown(lead.interest)}` : null,
    lead.budget ? `*Бюджет:* ${escapeMarkdown(lead.budget)}` : null,
    lead.timeline ? `*Срок:* ${escapeMarkdown(lead.timeline)}` : null,
    lead.subject ? `*Тема:* ${escapeMarkdown(lead.subject)}` : null,
    '*Сообщение:*',
    escapeMarkdown(truncate(lead.message, 1500)),
  '',
  (lead.utm_source || lead.utm_medium || lead.utm_campaign) ? '*UTM:*' : null,
  lead.utm_source ? `source=${escapeMarkdown(lead.utm_source)}` : null,
  lead.utm_medium ? `medium=${escapeMarkdown(lead.utm_medium)}` : null,
  lead.utm_campaign ? `campaign=${escapeMarkdown(lead.utm_campaign)}` : null,
  lead.utm_content ? `content=${escapeMarkdown(lead.utm_content)}` : null,
  lead.utm_term ? `term=${escapeMarkdown(lead.utm_term)}` : null,
  lead.referrer ? `ref=${escapeMarkdown(truncate(lead.referrer,100))}` : null,
  '',
  `_IP:_ ${escapeMarkdown(lead.ip || '—')}  _UA:_ ${escapeMarkdown(truncate(lead.user_agent || '',120))}`
  ].filter(Boolean).join('\n');

  const body = new URLSearchParams({
    chat_id: CHAT_ID,
    parse_mode: 'MarkdownV2',
    text: lines
  });
  const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error('Telegram send failed: ' + res.status + ' ' + text);
  }
  return res.json();
}

function truncate(str, max) { return str.length > max ? str.slice(0, max - 1) + '…' : str; }

// Escape for MarkdownV2
function escapeMarkdown(text='') {
  return text.replace(/[\\_*\[\]()~`>#+\-=|{}.!]/g, r => '\\' + r);
}
