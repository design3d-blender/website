import { makeDraggable } from './draggable';
import { sendToDock, removeFromDock } from './dock';

export function initWindowChrome(): void {
  const win = document.getElementById('window') as HTMLElement;
  const consolebar = document.getElementById('consolebar') as HTMLElement;
  const desktop = document.querySelector('.desktop') as HTMLElement;

  const bringToFront = (): void => {
    win.style.zIndex = '2';
  };

  makeDraggable(win, consolebar, { bounds: desktop, onDragStart: bringToFront });

  const restore = (): void => {
    win.hidden = false;
    removeFromDock('terminal');
    bringToFront();
  };

  let preMaximizePosition: { left: string; top: string } | null = null;

  document.getElementById('windowButtons')?.addEventListener('click', (e) => {
    const target = (e.target as HTMLElement).closest('[data-window]') as HTMLElement | null;
    if (!target) return;
    const action = target.dataset.window;

    if (action === 'zoom') {
      const maximizing = !win.classList.contains('maximized');
      if (maximizing) {
        // dragged left/top are inline styles, which win over `.maximized`'s
        // stylesheet `inset: 0` regardless of specificity — clear them.
        preMaximizePosition = { left: win.style.left, top: win.style.top };
        win.style.left = '';
        win.style.top = '';
      } else if (preMaximizePosition) {
        win.style.left = preMaximizePosition.left;
        win.style.top = preMaximizePosition.top;
        preMaximizePosition = null;
      }
      win.classList.toggle('maximized');
    } else if (action === 'minimize') {
      win.hidden = true;
      sendToDock('terminal', 'juan@staff-eng — terminal', restore);
    } else if (action === 'close') {
      win.hidden = true;
      sendToDock('terminal', 'juan@staff-eng — terminal (closed)', restore);
    }
  });

  win.addEventListener('pointerdown', bringToFront);
}
