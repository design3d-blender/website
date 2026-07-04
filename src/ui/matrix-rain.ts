const CHARS = 'アイウエオカキクケコサシスセソタチツテト0123456789'.split('');
const FONT_SIZE = 16;

/** Fullscreen digital-rain takeover, dismissible by any key/click, auto-ends after `durationMs`. */
export function runMatrixRain(durationMs = 5000): void {
  if (document.getElementById('matrixRain')) return;

  const canvas = document.createElement('canvas');
  canvas.id = 'matrixRain';
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);

  const drawCtx = canvas.getContext('2d');
  if (!drawCtx) {
    canvas.remove();
    return;
  }

  const fadeAndRemove = (): void => {
    canvas.classList.add('fade-out');
    setTimeout(() => canvas.remove(), 300);
  };

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let done = false;
    const dismiss = (): void => {
      if (done) return;
      done = true;
      window.removeEventListener('keydown', dismiss);
      window.removeEventListener('pointerdown', dismiss);
      fadeAndRemove();
    };
    window.addEventListener('keydown', dismiss);
    window.addEventListener('pointerdown', dismiss);

    drawCtx.fillStyle = '#000';
    drawCtx.fillRect(0, 0, canvas.width, canvas.height);
    drawCtx.fillStyle = '#33ff33';
    drawCtx.font = `${FONT_SIZE * 1.5}px var(--font-mono, monospace)`;
    drawCtx.textAlign = 'center';
    drawCtx.fillText('wake up, neo.', canvas.width / 2, canvas.height / 2);
    setTimeout(dismiss, 1500);
    return;
  }

  const columns = Math.ceil(canvas.width / FONT_SIZE);
  const drops = new Array(columns).fill(0);

  const draw = (): void => {
    drawCtx.fillStyle = 'rgba(0, 0, 0, 0.08)';
    drawCtx.fillRect(0, 0, canvas.width, canvas.height);
    drawCtx.fillStyle = '#33ff33';
    drawCtx.font = `${FONT_SIZE}px monospace`;
    drops.forEach((y, i) => {
      const char = CHARS[Math.floor(Math.random() * CHARS.length)];
      drawCtx.fillText(char, i * FONT_SIZE, y * FONT_SIZE);
      drops[i] = y * FONT_SIZE > canvas.height && Math.random() > 0.975 ? 0 : y + 1;
    });
  };

  let done = false;
  const interval = window.setInterval(draw, 40);
  const dismiss = (): void => {
    if (done) return;
    done = true;
    window.removeEventListener('keydown', dismiss);
    window.removeEventListener('pointerdown', dismiss);
    window.clearInterval(interval);
    fadeAndRemove();
  };
  window.addEventListener('keydown', dismiss);
  window.addEventListener('pointerdown', dismiss);
  setTimeout(dismiss, durationMs);
}
