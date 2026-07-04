import type { Command } from '../context';
import { text } from '../segments';
import { runSnake } from '../../games/snake';

export const snake: Command = {
  name: 'snake',
  summary: 'a hidden game (you found it)',
  hidden: true,
  async run(ctx) {
    await ctx.print([
      text('launching snake — arrow keys / wasd / swipe to move, q or Escape to quit\n'),
    ]);

    const wrapper = document.createElement('div');
    wrapper.className = 'game-wrapper';

    const hud = document.createElement('div');
    hud.className = 'game-hud';
    hud.textContent = 'score: 0';

    const quit = document.createElement('button');
    quit.className = 'game-quit';
    quit.textContent = 'quit';
    quit.addEventListener('click', () => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'q' }));
    });

    const hudRow = document.createElement('div');
    hudRow.className = 'game-hud-row';
    hudRow.append(hud, quit);

    const canvas = document.createElement('canvas');
    canvas.className = 'game-canvas';
    canvas.width = 320;
    canvas.height = 320;

    wrapper.append(hudRow, canvas);
    ctx.mountElement(wrapper);

    const { score } = await runSnake(canvas, hud);
    await ctx.print([text(`game over — score: ${score}\n`)]);
  },
};
