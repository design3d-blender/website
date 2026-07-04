export function initWindowChrome(): void {
  const win = document.getElementById('window') as HTMLElement;
  const restoreDock = document.getElementById('restore-dock') as HTMLElement;
  const restoreButton = document.getElementById('restore-button') as HTMLButtonElement;
  const page = document.querySelector('.page') as HTMLElement;

  let overlay: HTMLElement | null = null;

  const restore = (): void => {
    win.hidden = false;
    win.style.display = '';
    restoreDock.hidden = true;
    overlay?.remove();
    overlay = null;
  };

  restoreButton.addEventListener('click', restore);

  document.getElementById('windowButtons')?.addEventListener('click', (e) => {
    const target = (e.target as HTMLElement).closest('[data-window]') as HTMLElement | null;
    if (!target) return;
    const action = target.dataset.window;

    if (action === 'zoom') {
      win.classList.toggle('maximized');
    } else if (action === 'minimize') {
      win.style.display = 'none';
      restoreDock.hidden = false;
    } else if (action === 'close') {
      win.style.display = 'none';
      overlay = document.createElement('div');
      overlay.className = 'close-overlay';
      const message = document.createElement('p');
      message.textContent = 'Come back soon!';
      const button = document.createElement('button');
      button.textContent = 'reopen terminal';
      button.addEventListener('click', restore);
      overlay.append(message, button);
      page.appendChild(overlay);
    }
  });
}
