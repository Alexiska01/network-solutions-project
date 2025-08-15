/**
 * Регистрирует отложенный запуск авто-ротации 3D моделей (<model-viewer>).
 * Запуск:
 *  - При первом пользовательском взаимодействии (pointermove / touchstart / scroll / keydown / click)
 *  - Либо по истечении idle (requestIdleCallback / setTimeout)
 * Возвращает функцию очистки слушателей.
 */
export function registerDeferredAutoRotate(onStart: () => void, idleTimeoutMs = 5000) {
  let started = false;
  const start = () => {
    if (started) return;
    started = true;
    cleanup();
    onStart();
  };

  const events: Array<[keyof WindowEventMap, EventListenerOrEventListenerObject]> = [
    ['pointermove', start],
    ['touchstart', start],
    ['scroll', start],
    ['keydown', start],
    ['click', start],
  ];

  const add = () => events.forEach(([e, h]) => window.addEventListener(e, h, { once: true, passive: true }));
  const remove = () => events.forEach(([e, h]) => window.removeEventListener(e, h, h as any));

  const cleanup = () => { remove(); };

  add();

  const idleFallback = () => { if (!started) start(); };
  if (typeof (window as any).requestIdleCallback === 'function') {
    (window as any).requestIdleCallback(idleFallback, { timeout: idleTimeoutMs });
  } else {
    setTimeout(idleFallback, idleTimeoutMs);
  }
  return cleanup;
}
