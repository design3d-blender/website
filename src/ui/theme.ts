const STORAGE_KEY = 'terminal-theme';

export function applyStoredTheme(): void {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) document.documentElement.dataset.theme = stored;
}

export function setTheme(name: string): void {
  document.documentElement.dataset.theme = name;
  localStorage.setItem(STORAGE_KEY, name);
}
