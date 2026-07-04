import { setTheme } from './theme';

const THEME_CYCLE = ['dark', 'light', 'matrix'];

export function initOsbar(): void {
  const clock = document.getElementById('osClock');
  const viewport = document.getElementById('osViewport');
  const onlineDot = document.getElementById('osOnlineDot');
  const onlineLabel = document.getElementById('osOnlineLabel');
  const themeToggle = document.getElementById('osThemeToggle');

  const tickClock = (): void => {
    if (!clock) return;
    clock.textContent = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  };

  const updateViewport = (): void => {
    if (!viewport) return;
    viewport.textContent = `${window.innerWidth} × ${window.innerHeight}`;
  };

  const updateOnline = (): void => {
    const online = navigator.onLine;
    if (onlineLabel) onlineLabel.textContent = online ? 'online' : 'offline';
    onlineDot?.classList.toggle('offline', !online);
  };

  const updateThemeLabel = (): void => {
    if (themeToggle) themeToggle.textContent = document.documentElement.dataset.theme ?? 'dark';
  };

  const cycleTheme = (): void => {
    const current = document.documentElement.dataset.theme ?? 'dark';
    const next = THEME_CYCLE[(THEME_CYCLE.indexOf(current) + 1) % THEME_CYCLE.length];
    setTheme(next);
    updateThemeLabel();
  };

  tickClock();
  updateViewport();
  updateOnline();
  updateThemeLabel();

  setInterval(tickClock, 1000);
  window.addEventListener('resize', updateViewport);
  window.addEventListener('online', updateOnline);
  window.addEventListener('offline', updateOnline);
  themeToggle?.addEventListener('click', cycleTheme);
}

export function setOsbarDirectory(dir: string): void {
  const el = document.getElementById('osDirectory');
  if (el) el.textContent = dir;
}

export function setOsbarCommandCount(count: number): void {
  const el = document.getElementById('osCmdCount');
  if (el) el.textContent = `${count} cmd${count === 1 ? '' : 's'}`;
}
