import type { Command } from '../context';

export const clear: Command = {
  name: 'clear',
  summary: 'clear the terminal',
  run(ctx) {
    ctx.clear();
  },
};
