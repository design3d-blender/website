// keep in sync with responsive.css's mobile-layout breakpoint and monitor-widget.ts
const isMobile = () => window.matchMedia('(max-width: 700px), (max-height: 500px)').matches;

export interface DraggableOptions {
  bounds: HTMLElement;
  onDragStart?: () => void;
}

/** Lets `handle` drag `panel` by absolute left/top, clamped inside `bounds`. No-ops on mobile. */
export function makeDraggable(
  panel: HTMLElement,
  handle: HTMLElement,
  options: DraggableOptions,
): void {
  let startX = 0;
  let startY = 0;
  let originLeft = 0;
  let originTop = 0;
  let dragging = false;

  const onPointerMove = (e: PointerEvent): void => {
    if (!dragging) return;
    const bounds = options.bounds.getBoundingClientRect();
    const panelRect = panel.getBoundingClientRect();
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    const maxLeft = bounds.width - panelRect.width;
    const maxTop = bounds.height - panelRect.height;
    panel.style.left = `${Math.min(Math.max(0, originLeft + dx), Math.max(0, maxLeft))}px`;
    panel.style.top = `${Math.min(Math.max(0, originTop + dy), Math.max(0, maxTop))}px`;
  };

  const onPointerUp = (): void => {
    dragging = false;
    handle.classList.remove('is-dragging');
    document.body.classList.remove('is-dragging-any');
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('pointerup', onPointerUp);
  };

  handle.classList.add('drag-handle');

  handle.addEventListener('pointerdown', (e) => {
    if (isMobile() || panel.classList.contains('maximized')) return;
    if ((e.target as HTMLElement).closest('button')) return;

    const panelRect = panel.getBoundingClientRect();
    const boundsRect = options.bounds.getBoundingClientRect();
    startX = e.clientX;
    startY = e.clientY;
    originLeft = panelRect.left - boundsRect.left;
    originTop = panelRect.top - boundsRect.top;

    // some panels are positioned by right/bottom in CSS (e.g. the widget's default
    // corner). Once we start driving position via left/top, a leftover right/bottom
    // over-constrains the box and the browser resizes it to fit between them instead
    // of respecting its natural size. Pin the current visual spot via left/top and
    // disown right/bottom so only we control position from here on.
    panel.style.left = `${originLeft}px`;
    panel.style.top = `${originTop}px`;
    panel.style.right = 'auto';
    panel.style.bottom = 'auto';

    dragging = true;
    handle.classList.add('is-dragging');
    document.body.classList.add('is-dragging-any');
    options.onDragStart?.();
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  });
}
