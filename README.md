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