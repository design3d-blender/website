import { makeDraggable } from './draggable';
import { sendToDock, removeFromDock } from './dock';

interface PerformanceMemory {
  usedJSHeapSize: number;
}

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function formatUptime(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;
}

/** A "system monitor" widget — every number on it is a real browser signal, not a fake gauge. */
export function initMonitorWidget(): void {
  if (window.matchMedia('(max-width: 700px)').matches) return;

  const widget = document.getElementById('widget') as HTMLElement;
  const bar = document.getElementById('widgetBar') as HTMLElement;
  const closeBtn = document.getElementById('widgetClose') as HTMLButtonElement;
  const desktop = document.querySelector('.desktop') as HTMLElement;
  const uptimeEl = document.getElementById('wUptime') as HTMLElement;
  const viewportEl = document.getElementById('wViewport') as HTMLElement;
  const fpsEl = document.getElementById('wFps') as HTMLElement;
  const memRow = document.getElementById('wMemRow') as HTMLElement;
  const memEl = document.getElementById('wMem') as HTMLElement;
  const canvas = document.getElementById('wSparkline') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d');

  widget.hidden = false;

  makeDraggable(widget, bar, {
    bounds: desktop,
    onDragStart: () => {
      widget.style.zIndex = '4';
    },
  });

  const restore = (): void => {
    widget.hidden = false;
    removeFromDock('widget');
  };

  closeBtn.addEventListener('click', () => {
    widget.hidden = true;
    sendToDock('widget', 'session.monitor', restore);
  });

  const start = performance.now();

  const updateViewport = (): void => {
    viewportEl.textContent = `${window.innerWidth} × ${window.innerHeight}`;
  };
  updateViewport();
  window.addEventListener('resize', updateViewport);

  const memory = (performance as Performance & { memory?: PerformanceMemory }).memory;

  setInterval(() => {
    uptimeEl.textContent = formatUptime(performance.now() - start);
    if (memory) {
      memRow.hidden = false;
      memEl.textContent = `${(memory.usedJSHeapSize / 1_048_576).toFixed(1)} MB`;
    }
  }, 1000);

  if (prefersReducedMotion() || !ctx) {
    fpsEl.textContent = 'n/a';
    return;
  }

  const fpsHistory: number[] = [];
  let frameCount = 0;
  let lastSample = performance.now();

  const drawSparkline = (): void => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const max = Math.max(...fpsHistory, 60);
    ctx.beginPath();
    fpsHistory.forEach((value, i) => {
      const x = (i / (fpsHistory.length - 1 || 1)) * canvas.width;
      const y = canvas.height - (value / max) * canvas.height;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.strokeStyle = '#7aa2f7';
    ctx.lineWidth = 1.5;
    ctx.stroke();
  };

  const loop = (now: number): void => {
    frameCount++;
    if (now - lastSample >= 500) {
      const fps = Math.round((frameCount * 1000) / (now - lastSample));
      fpsEl.textContent = `${fps}`;
      fpsHistory.push(fps);
      if (fpsHistory.length > 40) fpsHistory.shift();
      drawSparkline();
      frameCount = 0;
      lastSample = now;
    }
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
}
