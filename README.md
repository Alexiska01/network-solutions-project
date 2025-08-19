# network-solutions-project

Initial repository setup for pr-poehali-dev/network-solutions-project

## Service Worker (GLB Caching)

Production build регистрирует `sw.js`:
- Кэш `.glb` (stale-while-revalidate) в кэше `models-<build>`
- Навигации: network-first, оффлайн fallback `offline.html`
- Очистка старых версий на `activate`

Dev режим: SW не регистрируется.

Ручная очистка модели кэша:
```js
navigator.serviceWorker.controller?.postMessage('trim-model-cache')
```

Оффлайн страницу можно изменить в `public/offline.html`.

## Backend API Overview

### Endpoints

| Method | Path | Description |
| ------ | ---- | ----------- |
| POST | `/api/contact` | Create lead (validated via Zod, rate limited) |
| GET  | `/api/admin/export` | CSV export (Bearer token auth) |
| GET  | `/api/health` | Liveness probe |
| GET  | `/api/ready` | Readiness (DB check) |
| GET  | `/metrics` | Prometheus metrics (default + `app_leads_total`) |

### Lead Payload (simplified)
```
{
	name: string,
	email: string,
	message: string,
	phone?: string, role?: string, interest?: string,
	budget?: string, timeline?: string, subject?: string,
	consent?: boolean,
	utm_source?: string, utm_medium?: string, utm_campaign?: string,
	utm_content?: string, utm_term?: string,
	referrer?: string,
	website?: string // honeypot: must stay empty
}
```

### Validation
Central Zod schema at `server/schema.js`. Types generated to `src/types/lead-input.d.ts` via `npm run types:gen`.

### Security & Hardening
* `helmet` base headers (+ CSP configurable)  
* Rate limiting: contact (20 / 10m IP), export (30 / 15m)  
* Honeypot field `website` returns `{ ok:true, spam:true }` silently  
* Token auth for export endpoint (`EXPORT_TOKEN`)  
* Redacted logs (email, phone, auth header) with `pino`  
* No secrets committed (.env ignored)

### Metrics
`/metrics` exposes process metrics and counter `app_leads_total`.  
Add scrape job (Prometheus):
```
- job_name: leads_api
	static_configs:
		- targets: ['localhost:3001']
```

### Environment Variables
| Name | Purpose |
| ---- | ------- |
| `PORT` | API port (default 3001) |
| `DB_FILE` | SQLite path (use `:memory:` for tests) |
| `EXPORT_TOKEN` | Bearer token for CSV export |
| `TELEGRAM_BOT_TOKEN` | Bot token (optional) |
| `TELEGRAM_CHAT_ID` | Chat / channel id (optional) |
| `TELEGRAM_DISABLE` | Set `1` to skip Telegram send |
| `LOG_LEVEL` | pino log level (info, debug, warn…) |

### Development Scripts
| Script | Description |
| ------ | ----------- |
| `npm run dev` | Frontend Vite dev server |
| `npm run server` | API server only |
| `npm run dev:full` | Front + API concurrently |
| `npm run types:gen` | Generate TS interfaces from Zod |
| `npm run test:api` | Contact endpoint tests |
| `npm run test:export` | Export endpoint tests |

### Testing
Vitest integration tests use `DB_FILE=:memory:`.

### Export CSV
`GET /api/admin/export` with header `Authorization: Bearer <EXPORT_TOKEN>`.

## Roadmap / Next Steps
* Optional: Redis + BullMQ queue for Telegram (retry + buffering)
* DB migrations + indices (email, created_at)
* Extended CSP / Permissions-Policy
* CI workflow (lint + tests + build)
* Rate limit metrics & alerting
* UI: success / error toast improvements
