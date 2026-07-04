interface DockEntry {
  label: string;
  restore: () => void;
}

const entries = new Map<string, DockEntry>();
let dockEl: HTMLElement | null = null;

function render(): void {
  if (!dockEl) return;
  dockEl.replaceChildren();
  dockEl.hidden = entries.size === 0;
  for (const [id, entry] of entries) {
    const button = document.createElement('button');
    button.textContent = entry.label;
    button.dataset.dockId = id;
    button.addEventListener('click', () => {
      entries.delete(id);
      render();
      entry.restore();
    });
    dockEl.appendChild(button);
  }
}

export function initDock(): void {
  dockEl = document.getElementById('dock');
}

export function sendToDock(id: string, label: string, restore: () => void): void {
  entries.set(id, { label, restore });
  render();
}

export function removeFromDock(id: string): void {
  if (!entries.delete(id)) return;
  render();
}
