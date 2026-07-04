interface Point {
  x: number;
  y: number;
}

const GRID = 20;
const CELL = 16;
const TICK_MS = 130;

function cssVar(name: string, fallback: string): string {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value || fallback;
}

function randomPoint(): Point {
  return { x: Math.floor(Math.random() * GRID), y: Math.floor(Math.random() * GRID) };
}

function spawnFood(body: Point[]): Point {
  let point = randomPoint();
  while (body.some((segment) => segment.x === point.x && segment.y === point.y)) {
    point = randomPoint();
  }
  return point;
}

const DIRECTIONS: Record<string, Point> = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
  w: { x: 0, y: -1 },
  s: { x: 0, y: 1 },
  a: { x: -1, y: 0 },
  d: { x: 1, y: 0 },
};

export interface SnakeResult {
  score: number;
}

/** Runs a game of Snake on `canvas`, taking over arrow-key/wasd input until it ends (collision or quit). */
export function runSnake(canvas: HTMLCanvasElement, hud: HTMLElement): Promise<SnakeResult> {
  return new Promise((resolve) => {
    const drawCtx = canvas.getContext('2d');
    if (!drawCtx) {
      resolve({ score: 0 });
      return;
    }

    const snake: Point[] = [
      { x: 10, y: 10 },
      { x: 9, y: 10 },
      { x: 8, y: 10 },
    ];
    let dir: Point = { x: 1, y: 0 };
    let nextDir = dir;
    let food = spawnFood(snake);
    let score = 0;
    let over = false;

    const draw = (): void => {
      const accent = cssVar('--accent', '#7aa2f7');
      const warning = cssVar('--warning', '#e0af68');

      drawCtx.clearRect(0, 0, canvas.width, canvas.height);

      drawCtx.fillStyle = warning;
      drawCtx.fillRect(food.x * CELL, food.y * CELL, CELL - 1, CELL - 1);

      snake.forEach((segment, i) => {
        drawCtx.globalAlpha = i === 0 ? 1 : 0.82;
        drawCtx.fillStyle = accent;
        drawCtx.fillRect(segment.x * CELL, segment.y * CELL, CELL - 1, CELL - 1);
      });
      drawCtx.globalAlpha = 1;

      hud.textContent = `score: ${score}`;
    };

    const finish = (): void => {
      if (over) return;
      over = true;
      window.clearInterval(timer);
      window.removeEventListener('keydown', onKey);
      canvas.removeEventListener('touchstart', onTouchStart);
      canvas.removeEventListener('touchend', onTouchEnd);
      hud.textContent = `game over — score: ${score}`;
      resolve({ score });
    };

    const tick = (): void => {
      if (over) return;
      dir = nextDir;
      const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };

      const hitWall = head.x < 0 || head.y < 0 || head.x >= GRID || head.y >= GRID;
      // exclude the tail: it vacates this cell unless growing, and food never spawns on the body
      const hitSelf = snake.slice(0, -1).some((s) => s.x === head.x && s.y === head.y);
      if (hitWall || hitSelf) {
        finish();
        return;
      }

      snake.unshift(head);
      if (head.x === food.x && head.y === food.y) {
        score++;
        food = spawnFood(snake);
      } else {
        snake.pop();
      }
      draw();
    };

    const setDirection = (next: Point): void => {
      // ignore direct reversal into the snake's own neck
      if (snake.length > 1 && next.x === -dir.x && next.y === -dir.y) return;
      nextDir = next;
    };

    const onKey = (e: KeyboardEvent): void => {
      if (e.key === 'q' || e.key === 'Escape') {
        e.preventDefault();
        finish();
        return;
      }
      const next = DIRECTIONS[e.key];
      if (!next) return;
      e.preventDefault();
      setDirection(next);
    };

    let touchStart: Point | null = null;
    const onTouchStart = (e: TouchEvent): void => {
      const t = e.touches[0];
      touchStart = { x: t.clientX, y: t.clientY };
    };
    const onTouchEnd = (e: TouchEvent): void => {
      if (!touchStart) return;
      const t = e.changedTouches[0];
      const dx = t.clientX - touchStart.x;
      const dy = t.clientY - touchStart.y;
      touchStart = null;
      if (Math.abs(dx) < 20 && Math.abs(dy) < 20) return;
      if (Math.abs(dx) > Math.abs(dy)) {
        setDirection(dx > 0 ? DIRECTIONS.ArrowRight : DIRECTIONS.ArrowLeft);
      } else {
        setDirection(dy > 0 ? DIRECTIONS.ArrowDown : DIRECTIONS.ArrowUp);
      }
    };

    window.addEventListener('keydown', onKey);
    canvas.addEventListener('touchstart', onTouchStart, { passive: true });
    canvas.addEventListener('touchend', onTouchEnd);

    draw();
    const timer = window.setInterval(tick, TICK_MS);
  });
}
