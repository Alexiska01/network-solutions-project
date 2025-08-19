import fetch from 'node-fetch';

// Значение берётся из переменной окружения, не храните секреты в коде! (TG_BOT_TOKEN_PLACEHOLDER)
const BOT_TOKEN = process.env.TG_BOT_TOKEN;
// Значение берётся из переменной окружения, не храните chat_id в коде! (TG_CHAT_ID_PLACEHOLDER)
const CHAT_ID = process.env.TG_CHAT_ID; // single chat id or channel id

export async function sendTelegramLead(lead) {
  if (!BOT_TOKEN || !CHAT_ID) {
    console.warn('[telegram] BOT_TOKEN or CHAT_ID not set; skipping send');
    return { skipped: true };
  }
  const forcePlain = process.env.TELEGRAM_FORCE_PLAIN === '1';
  const useMarkdown = !forcePlain && process.env.TELEGRAM_MARKDOWN === '1';
  const m = (s) => useMarkdown ? escapeMarkdown(s) : s; // условное экранирование
  const lines = [
    useMarkdown ? '📨 *Новая заявка с сайта*' : 'Новая заявка с сайта',
    `${useMarkdown ? '*Имя:*' : 'Имя:'} ${m(lead.name)}`,
    `${useMarkdown ? '*Email:*' : 'Email:'} ${m(lead.email)}`,
    lead.phone ? `${useMarkdown ? '*Телефон:*' : 'Телефон:'} ${m(lead.phone)}` : null,
    lead.role ? `${useMarkdown ? '*Роль:*' : 'Роль:'} ${m(lead.role)}` : null,
    lead.interest ? `${useMarkdown ? '*Интерес:*' : 'Интерес:'} ${m(lead.interest)}` : null,
    lead.budget ? `${useMarkdown ? '*Бюджет:*' : 'Бюджет:'} ${m(lead.budget)}` : null,
    lead.timeline ? `${useMarkdown ? '*Срок:*' : 'Срок:'} ${m(lead.timeline)}` : null,
    lead.subject ? `${useMarkdown ? '*Тема:*' : 'Тема:'} ${m(lead.subject)}` : null,
    useMarkdown ? '*Сообщение:*' : 'Сообщение:',
    m(truncate(lead.message, 1500)),
    '',
    (lead.utm_source || lead.utm_medium || lead.utm_campaign) ? (useMarkdown ? '*UTM:*' : 'UTM:') : null,
    lead.utm_source ? `source=${m(lead.utm_source)}` : null,
    lead.utm_medium ? `medium=${m(lead.utm_medium)}` : null,
    lead.utm_campaign ? `campaign=${m(lead.utm_campaign)}` : null,
    lead.utm_content ? `content=${m(lead.utm_content)}` : null,
    lead.utm_term ? `term=${m(lead.utm_term)}` : null,
    // referrer больше не выводим
    '',
  // строка UA полностью убрана
  ].filter(Boolean).join('\n');
  // Первая попытка: MarkdownV2
  const sendOnce = async (params) => {
    const body = new URLSearchParams(params);
    return fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body
    });
  };

  let params = { chat_id: CHAT_ID, text: lines };
  if (useMarkdown) params.parse_mode = 'MarkdownV2';
  console.log('[telegram] debug useMarkdown=%s forcePlain=%s textLen=%d', useMarkdown, forcePlain, lines.length);
  let res = await sendOnce(params);
  if (!res.ok) {
    const text = await res.text();
    // Если ошибка парсинга MarkdownV2 – повторяем без форматирования
    if (/can't parse entities/i.test(text)) {
      const plain = stripMarkdownMarkup(lines);
      console.warn('[telegram] markdown parse failed, retrying plain text');
      res = await sendOnce({ chat_id: CHAT_ID, text: plain });
      if (!res.ok) {
        const text2 = await res.text();
        throw new Error('Telegram send failed after fallback: ' + res.status + ' ' + text2);
      }
      return res.json();
    }
    throw new Error('Telegram send failed: ' + res.status + ' ' + text);
  }
  return res.json();
}

function truncate(str, max) { return str.length > max ? str.slice(0, max - 1) + '…' : str; }

// Escape for MarkdownV2
function escapeMarkdown(text='') {
  return text.replace(/[\\_*\[\]()~`>#+\-=|{}.!]/g, r => '\\' + r);
}

// Удалить служебные символы Markdown для plain fallback
function stripMarkdownMarkup(text='') {
  return text
    .replace(/[\\]/g, '') // убрать экранирующие обратные слеши
    .replace(/[*_`~]/g, '') // удалить маркеры форматирования
    .replace(/^[#>]+\s?/gm, '') // заголовки/цитаты
    ;
}
