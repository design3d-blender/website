import { commands } from '../terminal/commands/index';

// commands already reachable by clicking a nav tab — no need to list them twice
const NAV_COVERED = new Set([
  'welcome',
  'skills',
  'projects',
  'portfolio',
  'showcase',
  'resume',
  'contact',
]);

// commands that need an argument to do anything useful: prefill instead of running blind
const NEEDS_ARGS = new Set(['cat', 'cd', 'theme']);

function shellInput(): HTMLInputElement | null {
  return document.querySelector('.shell-input');
}

function runNow(name: string): void {
  const input = shellInput();
  if (!input) return;
  input.value = name;
  input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
}

function prefill(name: string): void {
  const input = shellInput();
  if (!input) return;
  input.value = `${name} `;
  input.focus({ preventScroll: true });
}

export function initHelpPanel(): void {
  const button = document.getElementById('helpButton') as HTMLButtonElement;
  const backdrop = document.getElementById('helpBackdrop') as HTMLElement;
  const panel = document.getElementById('helpPanel') as HTMLElement;
  const closeBtn = document.getElementById('helpClose') as HTMLButtonElement;
  const list = document.getElementById('helpCommandList') as HTMLElement;

  const runnable = commands
    .filter((c) => !c.hidden && !NAV_COVERED.has(c.name))
    .sort((a, b) => a.name.localeCompare(b.name));

  list.replaceChildren(
    ...runnable.map((command) => {
      const row = document.createElement('div');
      row.className = 'help-command-row';
      row.tabIndex = 0;
      row.setAttribute('role', 'button');

      const name = document.createElement('span');
      name.className = 'name';
      name.textContent = command.name;

      const summary = document.createElement('span');
      summary.className = 'summary';
      summary.textContent = command.summary;

      row.append(name, summary);

      const activate = (): void => {
        close();
        if (NEEDS_ARGS.has(command.name)) {
          prefill(command.name);
        } else {
          runNow(command.name);
        }
      };
      row.addEventListener('click', activate);
      row.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          activate();
        }
      });

      return row;
    }),
  );

  const open = (): void => {
    backdrop.hidden = false;
    panel.hidden = false;
  };
  const close = (): void => {
    backdrop.hidden = true;
    panel.hidden = true;
  };

  button.addEventListener('click', () => (panel.hidden ? open() : close()));
  closeBtn.addEventListener('click', close);
  backdrop.addEventListener('click', close);
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !panel.hidden) close();
  });
}
