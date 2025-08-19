import { useEffect, useRef, useCallback, useState, FormEvent } from 'react';
import { createPortal } from 'react-dom';

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
}

// Utility: trap focus inside node
function useFocusTrap(active: boolean, containerRef: React.RefObject<HTMLElement>, onClose: () => void) {
  useEffect(() => {
    if (!active) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab' && containerRef.current) {
        const focusables = containerRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [active, containerRef, onClose]);
}

interface FormState {
  name: string;
  email: string;
  phone: string;
  role: string;
  interest: string;
  budget: string;
  message: string;
  consent: boolean;
}

const initialState: FormState = {
  name: '',
  email: '',
  phone: '',
  role: '',
  interest: '',
  budget: '',
  message: '',
  consent: false,
};

const MAX_MESSAGE = 1200;

// fastTopics removed — subject field is not used

export const ContactModal = ({ open, onClose }: ContactModalProps) => {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const firstFieldRef = useRef<HTMLInputElement | null>(null);
  const [form, setForm] = useState<FormState>(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Autofocus
  useEffect(() => {
    if (open && firstFieldRef.current) {
      requestAnimationFrame(() => firstFieldRef.current?.focus());
    }
  }, [open]);

  useFocusTrap(open, dialogRef, onClose);

  const close = useCallback(() => {
    setForm(initialState);
    setSubmitted(false);
    setError(null);
    onClose();
  }, [onClose]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, type } = e.target;
    const value = type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    setForm(f => ({ ...f, [name]: value }));
  };

  // fast topic setter removed

  const formatPhone = (raw: string) => {
    // Simple +7 (XXX) XXX-XX-XX formatting
    let digits = raw.replace(/\D/g, '').replace(/^8/, '7');
    if (!digits.startsWith('7')) digits = '7' + digits;
    digits = digits.slice(0, 11);
    const parts: string[] = [];
    if (digits.length > 1) parts.push('+7');
    if (digits.length > 1) parts.push(' (' + digits.slice(1, 4));
    if (digits.length >= 4) parts[parts.length - 1] += ')';
    if (digits.length >= 5) parts.push(' ' + digits.slice(4, 7));
    if (digits.length >= 8) parts.push('-' + digits.slice(7, 9));
    if (digits.length >= 10) parts.push('-' + digits.slice(9, 11));
    return parts.join('');
  };

  const onPhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setForm(f => ({ ...f, phone: formatted }));
  };

  const validate = (): string | null => {
    if (!form.name.trim()) return 'Введите имя';
    if (!form.email.trim()) return 'Введите email';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) return 'Email выглядит некорректно';
    if (!form.consent) return 'Нужно согласие на обработку данных';
    return null;
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    const v = validate();
    if (v) { setError(v); return; }
    setSubmitting(true);
    try {
      const dataToSend: any = { ...form };
      // Remove internal fastTopic if present
      delete dataToSend.fastTopic;
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend)
      });
      const data = await res.json().catch(()=>({ ok:false, error:'Bad JSON'}));
      if (!data.ok) throw new Error(data.error || 'Ошибка отправки');
      setSubmitted(true);
    } catch (err:any) {
      console.error('send error', err);
      setError(err.message || 'Не удалось отправить');
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (open) {
      // Parse UTM only once per open
      try {
        const url = new URL(window.location.href);
        const utm: any = {};
        ['utm_source','utm_medium','utm_campaign','utm_content','utm_term'].forEach(k => {
          const v = url.searchParams.get(k);
            if (v) utm[k] = v;
        });
        if (document.referrer) utm.referrer = document.referrer;
        setForm(f => ({ ...f, ...utm }));
      } catch {}
    }
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-start sm:items-center justify-center px-3 py-8 overflow-y-auto" role="dialog" aria-modal="true" aria-labelledby="contact-modal-title">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm opacity-100 animate-fadeIn" onClick={close} />
      <div ref={dialogRef} className="relative w-full max-w-3xl origin-top animate-scaleIn">
        <div className="relative bg-white/95 dark:bg-neutral-900/95 backdrop-blur rounded-2xl shadow-2xl border border-gray-200/70 dark:border-white/10 overflow-hidden text-[15px] sm:text-[16px]">
          {/* Gradient bar */}
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400" />
          <div className="p-6 sm:p-8">
            <div className="flex items-start justify-between gap-6 mb-6">
              <div>
                <h2 id="contact-modal-title" className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white leading-tight">Связаться с нами</h2>
                <p className="mt-3 text-base text-gray-600 dark:text-gray-400 max-w-prose leading-relaxed">Заполните форму — ответим в течение рабочего дня. Чем точнее информация, тем быстрее сможем помочь.</p>
              </div>
              <button onClick={close} aria-label="Закрыть" className="rounded-md p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">✕</button>
            </div>
            {!submitted && (
              <form onSubmit={onSubmit} noValidate className="space-y-7" data-form="contact-modal">
                {/* Fast topics removed */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[0.95rem] sm:text-base font-medium text-gray-800 dark:text-gray-200">Имя *</label>
                    <input ref={firstFieldRef} name="name" value={form.name} onChange={onChange} required className="w-full rounded-md border-gray-300 dark:border-white/15 dark:bg-neutral-800 dark:text-white focus:border-blue-500 focus:ring-blue-500 text-base placeholder-gray-400 px-3 py-2.5" placeholder="Ваше имя" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[0.95rem] sm:text-base font-medium text-gray-800 dark:text-gray-200">Email *</label>
                    <input name="email" type="email" value={form.email} onChange={onChange} required className="w-full rounded-md border-gray-300 dark:border-white/15 dark:bg-neutral-800 dark:text-white focus:border-blue-500 focus:ring-blue-500 text-base placeholder-gray-400 px-3 py-2.5" placeholder="you@example.com" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[0.95rem] sm:text-base font-medium text-gray-800 dark:text-gray-200">Телефон</label>
                    <input name="phone" value={form.phone} onChange={onPhoneInput} inputMode="tel" className="w-full rounded-md border-gray-300 dark:border-white/15 dark:bg-neutral-800 dark:text-white focus:border-blue-500 focus:ring-blue-500 text-base placeholder-gray-400 px-3 py-2.5" placeholder="+7 (___) ___-__-__" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[0.95rem] sm:text-base font-medium text-gray-800 dark:text-gray-200">Интерес</label>
                    <select name="interest" value={form.interest} onChange={onChange} className="w-full rounded-md border-gray-300 dark:border-white/15 dark:bg-neutral-800 dark:text-white focus:border-blue-500 focus:ring-blue-500 text-base px-3 py-2.5">
                      <option value="">—</option>
                      <option>Закупка оборудования</option>
                      <option>Техподдержка</option>
                      <option>Партнерство</option>
                      <option>Консультация</option>
                    </select>
                  </div>
                </div>
                {/* Timeline and Subject removed by request */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-[0.95rem] sm:text-base font-medium text-gray-800 dark:text-gray-200">Сообщение *</label>
                    <span className={`text-xs sm:text-[13px] ${form.message.length > MAX_MESSAGE ? 'text-red-600' : 'text-gray-400'}`}>{form.message.length}/{MAX_MESSAGE}</span>
                  </div>
                  <textarea name="message" value={form.message} onChange={onChange} rows={6} maxLength={MAX_MESSAGE + 50} required className="w-full rounded-md border-gray-300 dark:border-white/15 dark:bg-neutral-800 dark:text-white focus:border-blue-500 focus:ring-blue-500 text-base resize-y placeholder-gray-400 px-3 py-3 leading-relaxed" placeholder="Опишите задачу, инфраструктуру, модели интереса..." />
                </div>
                {/* Consent & submit */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-7">
                  <label className="inline-flex items-start gap-3 text-[12.5px] sm:text-xs text-gray-600 dark:text-gray-400 leading-snug max-w-xl">
                    <input name="consent" type="checkbox" checked={form.consent} onChange={onChange} required className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-5 w-5" />
                    <span>Согласен на обработку персональных данных и получение информационных материалов</span>
                  </label>
                  <div className="flex items-center gap-4 ml-auto">
                    {error && <div className="text-sm text-red-600 font-medium">{error}</div>}
                    <button type="submit" disabled={submitting} className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 enabled:hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed active:bg-blue-600 text-white px-7 py-3.5 text-base font-medium shadow-sm hover:shadow transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                      {submitting && <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />}
                      <span>{submitting ? 'Отправка...' : 'Отправить'}</span>
                    </button>
                  </div>
                </div>
                {/* Honeypot */}
                <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
              </form>
            )}
            {submitted && (
              <div className="py-8 text-center space-y-6" data-state="success">
                <div className="mx-auto h-14 w-14 rounded-full bg-gradient-to-br from-blue-600 to-indigo-500 flex items-center justify-center text-white text-2xl shadow-lg">✓</div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Заявка отправлена</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 max-w-md mx-auto">Мы получили ваше сообщение и свяжемся с вами в ближайшее рабочее время.</p>
                </div>
                {/* Кнопки убраны по запросу */}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Animations */}
      <style>{`
        @keyframes fadeIn {from {opacity:0} to {opacity:1}}
        @keyframes scaleIn {from {opacity:0; transform:translateY(12px) scale(.97)} to {opacity:1; transform:translateY(0) scale(1)}}
        .animate-fadeIn{animation:fadeIn .35s ease forwards}
        .animate-scaleIn{animation:scaleIn .4s cubic-bezier(.32,.72,.33,1) forwards}
        @media (prefers-reduced-motion:reduce){.animate-fadeIn,.animate-scaleIn{animation:none;opacity:1;transform:none}}
      `}</style>
    </div>,
    document.body
  );
};

export default ContactModal;
